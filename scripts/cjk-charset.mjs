// scripts/cjk-charset.mjs
//
// Shared character-set scanner for the CJK subsetting pipeline.
//
// Both the generator (build-cjk-subset.mjs) and the guard
// (check-cjk-coverage.mjs) import from here, so they can never disagree
// about what counts as a CJK character or which files are scanned.
// A guard that scanned a different universe than the generator would
// pass a build that renders tofu — the whole point of the guard.
//
// WHY THE RANGES BELOW ARE WIDER THAN "HANZI":
// The Latin face (Source Sans 3) covers ASCII and Latin-ext. Everything
// else on a Chinese page — the ideographs, but ALSO the punctuation
// （，。、：；！？“”）, the fullwidth forms and the enclosed/compat
// blocks — resolves to the CJK face. Subsetting only U+4E00–9FFF would
// drop every comma and quotation mark in the ZH copy. Measured on this
// repo: ideographs alone = 1,326 chars; with punctuation and fullwidth
// forms = see `npm run fonts:report`.

import fs from 'node:fs'
import path from 'node:path'

// Blocks the CJK face is responsible for. Anything outside these is
// either Latin (Source Sans 3) or not present in the content.
export const CJK_BLOCKS = [
  [0x2e80, 0x2eff], // CJK Radicals Supplement
  [0x2f00, 0x2fdf], // Kangxi Radicals
  [0x3000, 0x303f], // CJK Symbols and Punctuation  ← ，。、：；！？“”（）
  [0x3040, 0x30ff], // Hiragana + Katakana (defensive: book titles, kaomoji)
  [0x3100, 0x312f], // Bopomofo
  [0x3200, 0x33ff], // Enclosed CJK Letters and Months + Compatibility
  [0x3400, 0x4dbf], // CJK Unified Ideographs Extension A
  [0x4e00, 0x9fff], // CJK Unified Ideographs
  [0xf900, 0xfaff], // CJK Compatibility Ideographs
  [0xfe30, 0xfe4f], // CJK Compatibility Forms
  [0xff00, 0xffef], // Halfwidth and Fullwidth Forms
]

export function isCJK(cp) {
  for (const [a, b] of CJK_BLOCKS) if (cp >= a && cp <= b) return true
  return false
}

// Directories that hold renderable content or code. `public` is included
// because llms-full.zh.txt and friends are served verbatim; `translation`
// because briefs there get quoted into copy.
const SOURCE_DIRS = ['content', 'app', 'components', 'lib', 'public', 'translation']

// NOTE: `.mdx` and `.md` are load-bearing — content/zh/blog/*.mdx holds
// real ZH blog copy. An earlier plan scoped this to `content/*.zh.js`,
// which would have missed both ZH blog posts entirely.
const SOURCE_EXT = /\.(js|jsx|ts|tsx|mjs|cjs|json|md|mdx|txt|html)$/
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'out', '.fontcache'])

function walk(dir, test, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, test, out)
    else if (test(e.name)) out.push(p)
  }
  return out
}

export function sourceFiles(root = process.cwd()) {
  return SOURCE_DIRS.flatMap((d) => walk(path.join(root, d), (n) => SOURCE_EXT.test(n)))
}

// The built static export. Scanning this catches two things source
// scanning cannot:
//   1. glyphs baked into client-only components (the /ops tools render
//      entirely client-side — 146 chars appear in no prerendered HTML),
//   2. glyphs shipped by DEPENDENCIES (html2canvas/jsPDF carry Chinese
//      numerals: 壹 貳 參 萬 …), which no scan of our own source can see.
export function buildFiles(root = process.cwd()) {
  const out = path.join(root, 'out')
  if (!fs.existsSync(out)) return []
  return walk(out, (n) => /\.(html|js)$/.test(n))
}

// Returns { freq: Map<char, count>, where: Map<char, file> }
export function scanChars(files) {
  const freq = new Map()
  const where = new Map()
  for (const f of files) {
    let src
    try {
      src = fs.readFileSync(f, 'utf8')
    } catch {
      continue
    }
    for (const ch of src) {
      const cp = ch.codePointAt(0)
      if (!isCJK(cp)) continue
      freq.set(ch, (freq.get(ch) || 0) + 1)
      if (!where.has(ch)) where.set(ch, f)
    }
  }
  return { freq, where }
}
