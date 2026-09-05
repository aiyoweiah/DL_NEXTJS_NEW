#!/usr/bin/env node
// scripts/check-cjk-coverage.mjs
//
// Build guard: every CJK character the site can render must be covered by
// a chunk in public/fonts/cjk/manifest.json.
//
// This is what makes the subsetting permanent. Without it, the first new
// hanzi in new copy silently falls through to the platform font — no
// error, no tofu on a Mac (PingFang covers it), just a character quietly
// set in the wrong typeface, for months. That is the exact failure mode
// of the nine private Eyebrow copies (D57), the 33 hand-rolled panels
// (D60) and the D51 font pilot. Same shape, same fix: ratchet it.
//
// Follows the scripts/check-surfaces.mjs pattern — same prebuild wiring,
// same actionable error text.
//
// ─────────────────────────────────────────────────────────────────────
// WHY THIS RUNS ON BOTH `prebuild` AND `postbuild`
//
//   prebuild  — scans source. Fast, catches the common case (someone
//               added Chinese copy), and fails before a long build.
//   postbuild — scans the emitted export. This is the only pass that can
//               see two things source scanning cannot:
//                 • client-only components (the /ops tools render
//                   entirely client-side: 146 characters appear in no
//                   prerendered HTML),
//                 • glyphs shipped by DEPENDENCIES — html2canvas and
//                   jsPDF carry Chinese numerals (壹 貳 參 萬 …) and
//                   katakana, which no scan of our own source can find.
//
// Run directly to see coverage without building:  node scripts/check-cjk-coverage.mjs --source

import fs from 'node:fs'
import path from 'node:path'
import { sourceFiles, buildFiles, scanChars } from './cjk-charset.mjs'

const ROOT = process.cwd()
const MANIFEST = path.join(ROOT, 'scripts/cjk-manifest.json')

const mode = process.argv.includes('--build') ? 'build' : 'source'

if (!fs.existsSync(MANIFEST)) {
  console.error(
    `\n✖ CJK coverage guard: no font manifest.\n\n` +
      `  Expected ${path.relative(ROOT, MANIFEST)}\n\n` +
      `  Generate it with:\n      npm run fonts:cjk\n`
  )
  process.exit(1)
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))
const covered = new Set()
for (const chunk of manifest.chunks) for (const ch of chunk.chars) covered.add(ch)

// ── D97: the SOURCE FONT is part of what this guard reports ──────────
// Coverage alone is font-agnostic — which is exactly how D62's WenKai was
// silently reverted to Noto by a default-source regeneration (`799629f`)
// while every pass stayed green. The guard cannot know which face is
// *intended* (that is the D62 ruling), but it CAN (a) say which face is
// shipping, on every build, and (b) fail on a half-regenerated state
// where the chunks on disk disagree with the manifest's declared source.
const srcKey = manifest.source?.key ?? '(unknown)'
const srcFamily = manifest.source?.family ?? '(unknown)'
const strayChunks = manifest.chunks.filter(
  (c) => !path.basename(c.file).startsWith(`${srcKey}.`)
)
const cssPath = path.join(ROOT, 'styles/cjk-fonts.css')
const cssHasSource =
  fs.existsSync(cssPath) && fs.readFileSync(cssPath, 'utf8').includes(srcKey)
if (strayChunks.length || !cssHasSource) {
  console.error(
    `\n✖ CJK source-consistency (D97): manifest declares source "${srcKey}"` +
      ` but the generated artefacts disagree:\n` +
      (strayChunks.length
        ? strayChunks.map((c) => `    chunk ${c.file} does not carry the "${srcKey}." prefix\n`).join('')
        : '') +
      (!cssHasSource ? `    styles/cjk-fonts.css does not reference "${srcKey}"\n` : '') +
      `\n  This is a half-regenerated state. Regenerate everything together:\n` +
      `      npm run fonts:cjk\n` +
      `  then commit public/fonts/cjk/, scripts/cjk-manifest.json,\n` +
      `  lib/cjk-preload.json and styles/cjk-fonts.css as one change.\n`
  )
  process.exit(1)
}

// Every referenced chunk must exist on disk. A manifest pointing at a
// filename that was never committed fails the same way a missing glyph
// does — silently, at runtime — so check it here.
const missingFiles = manifest.chunks
  .map((c) => c.file)
  .filter((f) => !fs.existsSync(path.join(ROOT, 'public', f.replace(/^\//, ''))))

if (missingFiles.length) {
  console.error(
    `\n✖ CJK coverage guard: manifest references ${missingFiles.length} missing file(s):\n` +
      missingFiles.map((f) => `    ${f}`).join('\n') +
      `\n\n  Regenerate with:\n      npm run fonts:cjk\n`
  )
  process.exit(1)
}

const files = mode === 'build' ? buildFiles(ROOT) : sourceFiles(ROOT)

if (mode === 'build' && files.length === 0) {
  console.log('· CJK coverage: no out/ directory — skipping post-build pass.')
  process.exit(0)
}

const { freq, where } = scanChars(files)
const missing = [...freq.keys()].filter((ch) => !covered.has(ch))

if (missing.length === 0) {
  console.log(
    `✓ CJK coverage (${mode}): ${freq.size} characters, all covered by ` +
      `${manifest.chunks.length} chunks (${(manifest.chunks.reduce((a, c) => a + c.bytes, 0) / 1024).toFixed(0)} KB) ` +
      `— source: ${srcKey} (${srcFamily}).`
  )
  process.exit(0)
}

// Group by the file that introduced each character so the message points
// at the copy to look at, not just the codepoint.
const byFile = new Map()
for (const ch of missing) {
  const f = path.relative(ROOT, where.get(ch))
  if (!byFile.has(f)) byFile.set(f, [])
  byFile.get(f).push(ch)
}

console.error(
  `\n✖ CJK coverage guard (${mode} pass): ${missing.length} character(s) are not in any font chunk.\n\n` +
    `  These would render in a fallback face — or as tofu where no system\n` +
    `  CJK font is installed. They are NOT in scripts/cjk-manifest.json:\n`
)
for (const [f, chars] of [...byFile.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.error(`    ${f}`)
  console.error(`        ${chars.join(' ')}`)
  console.error(
    `        ${chars.map((c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase()).join(' ')}\n`
  )
}
console.error(
  `  Fix — regenerate the subset so the new characters are included:\n\n` +
    `      npm run fonts:cjk\n\n` +
    `  then commit public/fonts/cjk/ and styles/cjk-fonts.css.\n` +
    (mode === 'build'
      ? `  (These were found in the BUILD output. If they came from a\n` +
        `   dependency rather than our copy, the regeneration picks them up\n` +
        `   anyway — it scans out/ as well as source.)\n`
      : '')
)
process.exit(1)
