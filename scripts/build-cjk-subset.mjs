#!/usr/bin/env node
// scripts/build-cjk-subset.mjs
//
// Regenerates the frequency-tiered CJK webfont chunks in public/fonts/cjk/.
//
//   npm run fonts:cjk            regenerate from the pinned source font
//   npm run fonts:cjk -- --report   scan + tier report only, writes nothing
//
// RUN THIS DELIBERATELY, NOT ON EVERY BUILD. The output is committed, so
// `next build` needs no network access and does no font work. The guard
// (check-cjk-coverage.mjs) is what tells you when a rerun is due.
//
// ─────────────────────────────────────────────────────────────────────
// WHY TIERS, AND WHY BY FREQUENCY
//
// Google's hosted CJK is split by unicode-range into ~101 chunks per
// weight, each ~60 KB and each dense with glyphs this site never uses.
// A ZH page therefore pulls ~23 chunks / ~1,090 KB (measured cold on
// /zh/faq) to render ~730 distinct characters.
//
// Splitting by FREQUENCY instead of by Unicode block means a page's
// glyphs cluster into the first tier or two rather than scattering
// across many. Splitting by block would reproduce the original bug.
//
// ─────────────────────────────────────────────────────────────────────
// FONT-AGNOSTIC BY DESIGN
//
// The source font is a config entry (SOURCES below), not a hardcoded
// path. Swapping Noto Sans SC for LXGW WenKai GB (design decision D62)
// is a `--source` flag plus a regeneration, not a rewrite.

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import subsetFont from 'subset-font'
import { sourceFiles, buildFiles, scanChars } from './cjk-charset.mjs'

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, 'public/fonts/cjk')
// The full manifest carries every character in every chunk (~17 KB) and is
// build tooling, not a site asset — it lives OUTSIDE public/ so it is never
// served to visitors. The layout gets a separate, tiny preload list.
const MANIFEST_PATH = path.join(ROOT, 'scripts/cjk-manifest.json')
const PRELOAD_PATH = path.join(ROOT, 'lib/cjk-preload.json')
// Tiers a Chinese page is certain to need, so they can be preloaded.
// Anything past t1 depends on the page's vocabulary; let the browser decide.
const PRELOAD_TIERS = ['chrome', 't1']
const CACHE_DIR = path.join(ROOT, '.fontcache')

// ── Source fonts ─────────────────────────────────────────────────────
// `url` must be immutable — pin a tag or a commit SHA, never a branch.
// `sha256` is verified on every run; a mismatch aborts rather than
// silently subsetting a font nobody reviewed.
const SOURCES = {
  'noto-sans-sc': {
    family: 'Noto Sans SC Subset',
    file: 'NotoSansSC-VF.ttf',
    url: 'https://raw.githubusercontent.com/google/fonts/2894aab31764f10f29c421bdfd2340d3b382d384/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf',
    sha256: 'a3041811a78c361b1de50f953c805e0244951c21c5bd412f7232ef0d899af0da',
    // Variable wght axis. Clamped to the range the design system uses so
    // the subset does not carry masters nothing renders.
    axes: { wght: { min: 400, max: 700, default: 400 } },
  },
  // D62 — not built yet. Ships once the pipeline is banked on Noto.
  // ⛔ When enabling: subset CJK ONLY. WenKai inherits Latin from Klee
  // One, and shipping that Latin would re-split the brand's Latin by
  // locale — the exact bug D59 exists to fix.
  // ⚠️ WenKai has Light/Regular/Medium and no true Bold; weight 700
  // synthesises. Accepted under D62.
}

// ── Tier boundaries, by frequency rank ───────────────────────────────
// `chrome` is carved out first: the characters present on EVERY English
// route (the 中文 language switcher). An English page must never pull
// more than this.
// The generated family name and the class that binds it to --font-cjk.
// Kept in sync with lib/fonts.js by CJK_FAMILY/CJK_VAR_CLASS there.
const CJK_FAMILY = 'DODO CJK Subset'
const CJK_VAR_CLASS = 'font-cjk-subset'

const CHROME_CHARS = '切换到中文'
const TIERS = [
  { name: 'chrome', upto: null }, // CHROME_CHARS, ranked separately
  { name: 't1', upto: 150 },
  { name: 't2', upto: 400 },
  { name: 't3', upto: 800 },
  { name: 't4', upto: Infinity },
]

const args = process.argv.slice(2)
const REPORT_ONLY = args.includes('--report')
const sourceKey = (args.find((a) => a.startsWith('--source=')) || '--source=noto-sans-sc').split('=')[1]

const source = SOURCES[sourceKey]
if (!source) {
  console.error(`✖ Unknown --source=${sourceKey}. Known: ${Object.keys(SOURCES).join(', ')}`)
  process.exit(1)
}

// ── 1. Scan ──────────────────────────────────────────────────────────
// Source + build output. The build output is the only place that shows
// glyphs from client-only components and from dependencies.
const scanned = [...sourceFiles(ROOT), ...buildFiles(ROOT)]
const { freq } = scanChars(scanned)
if (freq.size === 0) {
  console.error('✖ No CJK characters found. Wrong working directory?')
  process.exit(1)
}

const ranked = [...freq.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
const totalInstances = ranked.reduce((a, [, n]) => a + n, 0)

const chromeSet = new Set(CHROME_CHARS)
const rest = ranked.filter(([c]) => !chromeSet.has(c))

const buckets = []
let cursor = 0
for (const tier of TIERS) {
  if (tier.name === 'chrome') {
    buckets.push({ name: 'chrome', chars: [...chromeSet] })
    continue
  }
  const end = tier.upto === Infinity ? rest.length : Math.min(tier.upto, rest.length)
  const slice = rest.slice(cursor, end).map(([c]) => c)
  cursor = end
  if (slice.length) buckets.push({ name: tier.name, chars: slice })
}

const cumulative = (n) => ((ranked.slice(0, n).reduce((a, [, c]) => a + c, 0) / totalInstances) * 100).toFixed(1)

console.log(`\nSource font : ${sourceKey} (${source.family})`)
console.log(`Files scanned: ${scanned.length}`)
console.log(`Unique CJK   : ${freq.size}   ·   instances: ${totalInstances.toLocaleString()}`)
console.log(`Coverage     : top 150 = ${cumulative(150)}%  ·  top 400 = ${cumulative(400)}%  ·  top 800 = ${cumulative(800)}%`)
console.log(`\nTiers:`)
for (const b of buckets) console.log(`  ${b.name.padEnd(7)} ${String(b.chars.length).padStart(5)} glyphs`)

if (REPORT_ONLY) {
  console.log('\n--report: nothing written.\n')
  process.exit(0)
}

// ── 2. Source font: fetch on demand, always verify ───────────────────
const srcPath = path.join(CACHE_DIR, source.file)
fs.mkdirSync(CACHE_DIR, { recursive: true })

if (!fs.existsSync(srcPath)) {
  console.log(`\nFetching source font…\n  ${source.url}`)
  const res = await fetch(source.url)
  if (!res.ok) {
    console.error(`✖ Download failed: HTTP ${res.status}`)
    process.exit(1)
  }
  fs.writeFileSync(srcPath, Buffer.from(await res.arrayBuffer()))
}

const raw = fs.readFileSync(srcPath)
const digest = crypto.createHash('sha256').update(raw).digest('hex')
if (digest !== source.sha256) {
  console.error(
    `\n✖ SHA-256 mismatch on ${source.file}\n` +
      `    expected ${source.sha256}\n` +
      `    actual   ${digest}\n\n` +
      `  The cached font is not the pinned release. Delete .fontcache/ and\n` +
      `  rerun to refetch. If it still mismatches, the pinned URL moved —\n` +
      `  review the new file before updating the sha256 in this script.\n`
  )
  process.exit(1)
}
console.log(`\nSource verified: ${(raw.length / 1024 / 1024).toFixed(1)} MB, sha256 ok`)

// ── 3. Subset ────────────────────────────────────────────────────────
fs.rmSync(OUT_DIR, { recursive: true, force: true })
fs.mkdirSync(OUT_DIR, { recursive: true })

const manifest = {
  $comment: 'GENERATED by scripts/build-cjk-subset.mjs — do not hand-edit. Run: npm run fonts:cjk',
  source: { key: sourceKey, family: source.family, url: source.url, sha256: source.sha256 },
  axes: source.axes ?? null,
  generatedFrom: { uniqueChars: freq.size, instances: totalInstances },
  chunks: [],
}

let totalOut = 0
for (const b of buckets) {
  const text = b.chars.join('')
  const buf = await subsetFont(raw, text, {
    targetFormat: 'woff2',
    ...(source.axes ? { variationAxes: source.axes } : {}),
  })
  // Content hash in the filename. Regeneration changes the bytes; without
  // a new URL a returning visitor keeps a cached chunk that is missing the
  // characters the new copy needs, and renders tofu. Cheap insurance.
  const hash = crypto.createHash('sha256').update(buf).digest('hex').slice(0, 8)
  const file = `${sourceKey}.${b.name}.${hash}.woff2`
  fs.writeFileSync(path.join(OUT_DIR, file), buf)
  totalOut += buf.length

  manifest.chunks.push({
    name: b.name,
    file: `/fonts/cjk/${file}`,
    glyphs: b.chars.length,
    bytes: buf.length,
    unicodeRange: toUnicodeRange(b.chars),
    chars: text, // the guard checks membership against this
  })
  console.log(`  ${b.name.padEnd(7)} ${String(b.chars.length).padStart(5)} glyphs \u2192 ${(buf.length / 1024).toFixed(1).padStart(7)} KB  ${file}`)
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n')

// Preload list. app/[locale]/layout.jsx imports this and emits a <link
// rel=preload> per entry on zh routes. It is generated rather than
// hand-written because the previous hand-written preload pointed at
// `/_next/static/media/noto-sans-sc.woff2` — a filename that never
// existed — and 404'd on every Chinese page for as long as it shipped.
// Nobody noticed, because a dead preload fails silently. Generating it
// means the href cannot drift from the file on disk.
fs.writeFileSync(
  PRELOAD_PATH,
  JSON.stringify(
    {
      $comment: 'GENERATED by scripts/build-cjk-subset.mjs — do not hand-edit.',
      chunks: manifest.chunks
        .filter((c) => PRELOAD_TIERS.includes(c.name))
        .map((c) => ({ name: c.name, file: c.file })),
    },
    null,
    2
  ) + '\n'
)

// ── 4. Emit the stylesheet ───────────────────────────────────────────
// next/font/local cannot express a per-chunk unicode-range (its src
// entries take only path/weight/style), and unicode-range is the entire
// mechanism here — so these @font-face rules are generated directly.
// One family, one rule per chunk; the browser fetches only the chunks
// whose range matches glyphs actually on the page.
const css = `/* GENERATED by scripts/build-cjk-subset.mjs — do not hand-edit.
   Regenerate with: npm run fonts:cjk
   Source: ${source.family} (${sourceKey}), sha256 ${source.sha256.slice(0, 16)}…

   Frequency-tiered CJK subset. Chunk selection is the browser's job:
   each @font-face declares the unicode-range it covers, so a page that
   renders only the language switcher fetches the 'chrome' chunk and
   nothing else. Splitting by frequency rather than by Unicode block is
   what keeps a page's glyphs clustered into the first tiers.

   preload is deliberately absent: CJK is below the fold on EN routes and
   font-display:swap covers the ZH first paint. */

${manifest.chunks
  .map(
    (c) => `@font-face {
  font-family: '${CJK_FAMILY}';
  src: url('${c.file}') format('woff2');${
      source.axes?.wght ? `\n  font-weight: ${source.axes.wght.min} ${source.axes.wght.max};` : ''
    }
  font-style: normal;
  font-display: swap;
  /* ${c.name} — ${c.glyphs} glyphs, ${(c.bytes / 1024).toFixed(1)} KB */
  unicode-range: ${c.unicodeRange};
}`
  )
  .join('\n\n')}

/* Applied to <html> via lib/fonts.js → fontCJK.variable, exactly as the
   next/font className used to be. Nothing downstream changes: globals.css
   :lang(zh) and every consumer still read var(--font-cjk).

   The platform CJK faces stay in the stack behind the subset. If a glyph
   ever falls outside the generated ranges the page degrades to PingFang /
   YaHei instead of tofu — the guard exists to stop that happening, this
   is the seatbelt behind the guard. */
.${CJK_VAR_CLASS} {
  --font-cjk: '${CJK_FAMILY}', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
              'WenQuanYi Micro Hei', system-ui, sans-serif;
}
`
fs.writeFileSync(path.join(ROOT, 'styles/cjk-fonts.css'), css)

console.log(`\nTotal subset payload: ${(totalOut / 1024).toFixed(1)} KB across ${buckets.length} chunks`)
console.log(`Wrote ${path.relative(ROOT, OUT_DIR)}/ (${buckets.length} woff2)`)
console.log(`Wrote scripts/cjk-manifest.json · lib/cjk-preload.json · styles/cjk-fonts.css\n`)

// Collapses a character list into compact CSS unicode-range syntax.
// Contiguous codepoints become U+4E00-4E0F rather than 16 entries — this
// matters, the range string ships in the stylesheet on every request.
function toUnicodeRange(chars) {
  const cps = [...new Set(chars.map((c) => c.codePointAt(0)))].sort((a, b) => a - b)
  const parts = []
  let start = cps[0]
  let prev = cps[0]
  for (let i = 1; i <= cps.length; i++) {
    const cp = cps[i]
    if (cp !== prev + 1) {
      const h = (n) => n.toString(16).toUpperCase()
      parts.push(start === prev ? `U+${h(start)}` : `U+${h(start)}-${h(prev)}`)
      start = cp
    }
    prev = cp
  }
  return parts.join(',')
}
