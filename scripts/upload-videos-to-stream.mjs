#!/usr/bin/env node
//
// Upload the DODO source videos to Cloudflare Stream.
//
// Reads credentials from DL_NEXTJS_NEW/.env.local:
//   CF_ACCOUNT_ID=...
//   CF_STREAM_API_TOKEN=...   (Stream:Edit scope; create at dash.cloudflare.com)
//
// For each video in VIDEOS below it prefers Videos/_optimized/<file> (produced
// by scripts/optimize-videos.ps1) and falls back to the original under Videos/.
//
// Result: Videos/video-manifest.json mapping a stable key -> Stream UID.
// The script is idempotent: keys already present in the manifest are skipped,
// so you can re-run it freely after adding new videos.
//
// Run:
//   node scripts/upload-videos-to-stream.mjs

import { readFile, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const VIDEOS_DIR = join(REPO_ROOT, 'Videos');
const OPTIMIZED_DIR = join(VIDEOS_DIR, '_optimized');
const MANIFEST_PATH = join(VIDEOS_DIR, 'video-manifest.json');
const ENV_PATH = join(REPO_ROOT, '.env.local');

// Cloudflare Stream basic upload limit (multipart POST).
const BASIC_UPLOAD_LIMIT = 200 * 1024 * 1024;

// Logical key -> { optimized filename | null, original filename, title }.
// Title is shown in the Cloudflare Stream dashboard for human navigation.
const VIDEOS = [
  {
    key: 'dodo-brand-full',
    optimized: 'DODO-brand-full.mp4',
    original: 'DODO 品牌介绍视频_Full (2).mp4',
    title: 'DODO Brand Intro (Full)',
  },
  {
    key: 'dodo-tutor-selection',
    optimized: 'DODO-tutor-selection.mp4',
    original: 'DODO如何筛选导师.mp4',
    title: 'How DODO Selects Tutors',
  },
  {
    key: 'lcs-detailed',
    optimized: 'LCS-detailed.mp4',
    original: 'LCS详细介绍 New.mp4',
    title: 'LCS Detailed Intro',
  },
  {
    key: 'kimberly-intro',
    optimized: 'kimberly-intro.mp4',
    original: 'Ms.Kimberly Intro (1).mp4',
    title: 'Ms. Kimberly Intro (vertical)',
  },
  {
    key: 'about-page-intro',
    optimized: null,
    original: 'about_page_intro.mp4',
    title: 'About Page Intro',
  },
  {
    key: 'lcs-cut',
    optimized: null,
    original: 'lcs cut.mp4',
    title: 'LCS Cut (Short)',
  },
];

// Minimal .env parser — handles KEY=value and KEY="value" with comments.
async function loadEnv(path) {
  if (!existsSync(path)) {
    throw new Error(
      `Missing ${path}\n\n` +
      `Create it with:\n` +
      `  CF_ACCOUNT_ID=<your account id>\n` +
      `  CF_STREAM_API_TOKEN=<token with Stream:Edit scope>\n\n` +
      `Token: dash.cloudflare.com -> My Profile -> API Tokens -> Create Token -> Custom -> Stream:Edit.`
    );
  }
  const raw = await readFile(path, 'utf8');
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

// Cloudflare Stream customer playback subdomain — discovered from any
// transcoded video's thumbnail URL. Written to manifest as `playbackHost`
// so the StreamVideo component doesn't need to hardcode it.
const PLAYBACK_HOST_FALLBACK = 'customer-me018erhvwsykfhr.cloudflarestream.com';

async function loadManifest() {
  if (!existsSync(MANIFEST_PATH)) return { playbackHost: PLAYBACK_HOST_FALLBACK, videos: {} };
  try {
    const data = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
    data.videos ??= {};
    data.playbackHost ??= PLAYBACK_HOST_FALLBACK;
    return data;
  } catch {
    return { playbackHost: PLAYBACK_HOST_FALLBACK, videos: {} };
  }
}

async function saveManifest(manifest) {
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
}

function pickSourcePath(video) {
  if (video.optimized) {
    const p = join(OPTIMIZED_DIR, video.optimized);
    if (existsSync(p)) return { path: p, optimized: true };
  }
  const orig = join(VIDEOS_DIR, video.original);
  if (existsSync(orig)) return { path: orig, optimized: false };
  return null;
}

async function uploadOne({ accountId, token, video, sourcePath, sizeBytes }) {
  if (sizeBytes > BASIC_UPLOAD_LIMIT) {
    throw new Error(
      `${video.key}: ${(sizeBytes / 1024 / 1024).toFixed(1)} MB exceeds the 200 MB basic-upload limit. ` +
      `Run the optimize-videos.ps1 script first, or implement TUS resumable upload.`
    );
  }
  const buffer = await readFile(sourcePath);
  const blob = new Blob([buffer], { type: 'video/mp4' });

  const form = new FormData();
  form.append('file', blob, video.original);
  // meta[name] -> the label that appears in the Stream dashboard.
  form.append('meta', JSON.stringify({ name: video.title, key: video.key }));

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });

  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    const errMsg = json?.errors?.map((e) => `${e.code}: ${e.message}`).join('; ') || res.statusText;
    throw new Error(`Cloudflare API error (${res.status}): ${errMsg}`);
  }
  return json.result;
}

async function main() {
  const env = await loadEnv(ENV_PATH);
  const accountId = env.CF_ACCOUNT_ID;
  const token = env.CF_STREAM_API_TOKEN;
  if (!accountId || !token) {
    throw new Error('CF_ACCOUNT_ID and CF_STREAM_API_TOKEN must be set in .env.local');
  }

  const manifest = await loadManifest();
  manifest.videos ??= {};

  for (const video of VIDEOS) {
    if (manifest.videos[video.key]?.uid) {
      console.log(`[skip] ${video.key} already uploaded (uid=${manifest.videos[video.key].uid})`);
      continue;
    }

    const src = pickSourcePath(video);
    if (!src) {
      console.warn(`[warn] ${video.key}: no source file found (looked for ${video.optimized ? `_optimized/${video.optimized} and ` : ''}${video.original})`);
      continue;
    }

    const { size } = await stat(src.path);
    const mb = (size / 1024 / 1024).toFixed(1);
    console.log(`[upload] ${video.key} (${mb} MB, ${src.optimized ? 'optimized' : 'original'})`);

    const t0 = Date.now();
    const result = await uploadOne({ accountId, token, video, sourcePath: src.path, sizeBytes: size });
    const secs = ((Date.now() - t0) / 1000).toFixed(1);

    manifest.videos[video.key] = {
      uid: result.uid,
      title: video.title,
      source: src.optimized ? `_optimized/${video.optimized}` : video.original,
      sizeBytes: size,
      durationSec: result.duration ?? null,
      thumbnail: result.thumbnail ?? null,
      uploadedAt: new Date().toISOString(),
    };
    await saveManifest(manifest);
    console.log(`  uid=${result.uid}  (${secs}s)`);
  }

  console.log(`\nDone. Manifest: ${MANIFEST_PATH}`);
  console.log(`Videos uploaded: ${Object.keys(manifest.videos).length}`);
}

main().catch((err) => {
  console.error('\n[error]', err.message);
  process.exit(1);
});
