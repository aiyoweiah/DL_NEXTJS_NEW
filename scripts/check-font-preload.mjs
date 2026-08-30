#!/usr/bin/env node
// scripts/check-font-preload.mjs
//
// Build guard: every Latin font file preloaded on a route must actually be
// needed by that route's content.
//
// WHY THIS EXISTS
//
// `subsets: ['latin', 'latin-ext']` sat in lib/fonts.js for months,
// justified by a comment about diacritics in student and Navigator names.
// The reasoning was wrong — those accents (é ü ñ á) are U+00C0–00FF, which
// lives in `latin`; `latin-ext` is Central/Eastern European and pinyin
// macrons, and the site uses ZERO of them. It cost 116.6 KB of forced
// preload on every route, EN and ZH alike, to render nothing (D64).
//
// Nothing caught it because nothing measured it. Same failure shape as the
// nine private Eyebrow copies (D57), the 33 hand-rolled panels (D60) and
// the CJK subset (D63): dead configuration that no one re-checks. So it
// gets a ratchet, like those did.
//
// WHAT IT CHECKS
//
// For each preloaded woff2 in the built export: resolve its unicode-range
// from the emitted CSS, then confirm at least one character in that range
// appears in the rendered HTML or the client JS. A preloaded file covering
// nothing is a build failure.
//
// Runs on `postbuild` — it needs the emitted CSS and HTML, so there is no
// meaningful prebuild equivalent.

import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const OUT = path.join(ROOT, 'out')

if (!fs.existsSync(OUT)) {
  console.log('· font preload: no out/ directory — skipping.')
  process.exit(0)
}

// ── Known-tolerated exceptions ───────────────────────────────────────
// next/font (16.2.6) preloads ONE spurious file whenever `style` includes
// 'italic': the cyrillic-ext italic face, 10.7 KB, on every route. It is
// not selectable from our side — `preload` is per-call, not per-subset, so
// the only ways to drop it are to give up real italic (faux-oblique on 34
// italic nodes) or to route italic through a second font family with an
// `[style*="italic"]` selector. Both are worse than 10.7 KB.
//
// Listed here rather than silently skipped so that if it ever changes —
// fixed upstream, or a second spurious file appears — the build says so.
const TOLERATED = [
  {
    range: 'U+460-52F',
    reason: 'next/font 16.x preloads cyrillic-ext italic when style includes italic; not suppressible per-subset',
    maxBytes: 12 * 1024,
  },
]

function walk(dir, test, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, test, out)
    else if (test(e.name)) out.push(p)
  }
  return out
}

// unicode-range → predicate
function parseRange(ur) {
  const parts = []
  for (const raw of ur.split(',')) {
    const t = raw.trim().replace(/^U\+/i, '')
    if (t.includes('?')) {
      const lo = parseInt(t.replace(/\?/g, '0'), 16)
      const hi = parseInt(t.replace(/\?/g, 'F'), 16)
      parts.push([lo, hi])
    } else if (t.includes('-')) {
      const [a, b] = t.split('-').map((h) => parseInt(h, 16))
      parts.push([a, b])
    } else {
      const c = parseInt(t, 16)
      parts.push([c, c])
    }
  }
  return parts
}

const cssFiles = walk(path.join(OUT, '_next/static'), (n) => /\.css$/.test(n))
const css = cssFiles.map((f) => fs.readFileSync(f, 'utf8')).join('\n')
const faces = [...css.matchAll(/@font-face\{([^}]*)\}/g)].map((m) => m[1])

// filename → { range, ur }
const fileRange = new Map()
for (const b of faces) {
  const src = (b.match(/src:url\(([^)]+)\)/) || [])[1]
  const ur = (b.match(/unicode-range:([^;]+)/) || [])[1]
  if (!src || !ur) continue
  const key = path.basename(src)
  if (!fileRange.has(key)) fileRange.set(key, { parts: parseRange(ur), ur: ur.trim() })
}

// Characters the site actually renders (HTML) or ships (client JS).
const contentFiles = [
  ...walk(OUT, (n) => /\.html$/.test(n)),
  ...walk(path.join(OUT, '_next/static'), (n) => /\.js$/.test(n)),
]
const used = new Set()
for (const f of contentFiles) {
  for (const ch of fs.readFileSync(f, 'utf8')) used.add(ch.codePointAt(0))
}

// Every distinct preloaded font across all routes.
const preloaded = new Map() // file -> route that preloads it
for (const html of walk(OUT, (n) => /\.html$/.test(n))) {
  const src = fs.readFileSync(html, 'utf8')
  for (const m of src.matchAll(/rel="preload"[^>]*href="([^"]+\.woff2)"/g)) {
    const key = path.basename(m[1])
    if (!preloaded.has(key)) preloaded.set(key, '/' + path.relative(OUT, path.dirname(html)))
  }
}

const sizeOf = (f) => {
  const p = path.join(OUT, '_next/static/media', f)
  try {
    return fs.statSync(p).size
  } catch {
    return 0
  }
}

const dead = []
let tolerated = 0
for (const [file, route] of preloaded) {
  const info = fileRange.get(file)
  if (!info) continue // locally-hosted chunk (CJK) — covered by check-cjk-coverage
  const hit = [...used].some((cp) => info.parts.some(([a, b]) => cp >= a && cp <= b))
  if (hit) continue

  const bytes = sizeOf(file)
  const ok = TOLERATED.find((t) => info.ur.includes(t.range) && bytes <= t.maxBytes)
  if (ok) {
    tolerated += bytes
    continue
  }
  dead.push({ file, route, bytes, ur: info.ur })
}

if (dead.length === 0) {
  const n = preloaded.size
  console.log(
    `✓ font preload: ${n} preloaded face(s), all cover characters in use` +
      (tolerated ? ` (+${(tolerated / 1024).toFixed(1)} KB tolerated, see TOLERATED in this script)` : '') +
      '.'
  )
  process.exit(0)
}

const wasted = dead.reduce((a, d) => a + d.bytes, 0)
console.error(
  `\n✖ font preload guard: ${dead.length} preloaded font file(s) cover NO character\n` +
    `  used anywhere in the build — ${(wasted / 1024).toFixed(1)} KB downloaded on every\n` +
    `  route to render nothing.\n`
)
for (const d of dead) {
  console.error(`    ${d.file}  (${(d.bytes / 1024).toFixed(1)} KB, preloaded on ${d.route})`)
  console.error(`        unicode-range: ${d.ur.slice(0, 120)}\n`)
}
console.error(
  `  Fix — drop the unused subset from the \`subsets\` array in lib/fonts.js.\n` +
    `  That array controls PRELOADING only: every subset stays declared with its\n` +
    `  unicode-range, so removing one can never cause tofu — the browser just\n` +
    `  fetches that chunk on demand if the character ever appears.\n\n` +
    `  If the preload is genuinely wanted despite covering nothing, add it to\n` +
    `  TOLERATED at the top of this script with a reason.\n`
)
process.exit(1)
