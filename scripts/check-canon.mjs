// scripts/check-canon.mjs — the canon guard (G-1, ruled 2026-09-09).
//
// Fails the build when a RETIRED term ships on any surface a reader or a crawler can reach.
// The list lives in translation/dodo-glossary.json → retired_terms (EN + ZH), one entry per
// term the decision log retired (D36/D45 tagline, D37 ladder, D40 positioning, D92 LCS/Loop,
// D99 growth canon, D102 founding year, D103 credential wording, D104 LocalBusiness, Flex 3).
// Edit the list in the same commit as the ruling that retires a term.
//
// Scope — the surfaces where every drift found on 2026-09-09 lived, and which content-audit.mjs
// (the anti-dictionary reporter) does not cover: content modules, MDX, all three llms files,
// lib/schema.js, lib/metadata.js, and page/layout files under app/.
//
// Contract: this guard FAILS (exit 1) on any hit; content-audit.mjs keeps REPORTING its 19
// accepted strategic contrasts and never fails. Two contracts, two scripts — by design.
//
//   node scripts/check-canon.mjs            # guard (wired into prebuild)
//   node scripts/check-canon.mjs --report   # list hits, exit 0

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, join, relative, extname } from 'node:path'

const ROOT = resolve(process.cwd())
const glossary = JSON.parse(readFileSync(resolve(ROOT, 'translation/dodo-glossary.json'), 'utf8'))
const retired = glossary.retired_terms
if (!retired || !Array.isArray(retired.en) || !Array.isArray(retired.zh)) {
  console.error('x canon: translation/dodo-glossary.json has no retired_terms { en: [], zh: [] }')
  process.exit(2)
}
const REPORT = process.argv.includes('--report')

const SCOPE = [
  { dir: 'content', ext: ['.js', '.mdx', '.md'] },
  { dir: 'public', match: f => /^llms.*\.txt$/.test(f) },
  { dir: 'lib', ext: ['.js'] },   // schema, metadata, a11y strings — anything that emits text
  { dir: 'app', match: f => /^(page|layout)\.(jsx|tsx)$/.test(f) },
]

// Code comments never reach a reader or a crawler, and the decision logs quote retired terms
// in the negative ("never 'Janet Sui'"). Skip comment-only lines in code files; keep every
// line of .txt/.md/.mdx (there, '#' is a heading, not a comment).
const isCodeFile = f => /\.(js|jsx|tsx|mjs)$/.test(f)
const isCommentLine = line => /^\s*(\/\/|\/\*|\*|\{\/\*)/.test(line)

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) { if (name !== 'node_modules') walk(p, out) } else out.push(p)
  }
  return out
}
const files = []
for (const s of SCOPE) {
  const base = resolve(ROOT, s.dir)
  let list
  try { list = walk(base) } catch { continue }
  for (const f of list) {
    const name = f.split(/[\\/]/).pop()
    if (s.files && !s.files.includes(name)) continue
    if (s.ext && !s.ext.includes(extname(f))) continue
    if (s.match && !s.match(name)) continue
    if (s.dir === 'public' && !/^llms.*\.txt$/.test(name)) continue
    files.push(f)
  }
}

const terms = [...retired.en.map(t => ({ term: t, locale: 'en' })), ...retired.zh.map(t => ({ term: t, locale: 'zh' }))]
  .filter(t => t.term && !t.term.startsWith('_'))
const hits = []
for (const f of files) {
  const lines = readFileSync(f, 'utf8').split('\n')
  const code = isCodeFile(f)
  lines.forEach((line, i) => {
    if (code && isCommentLine(line)) return
    for (const { term } of terms) {
      if (line.includes(term)) hits.push({ file: relative(ROOT, f).replace(/\\/g, '/'), line: i + 1, term, text: line.trim().slice(0, 110) })
    }
  })
}

if (hits.length === 0) {
  console.log(`✓ canon: ${files.length} file(s) scanned, ${terms.length} retired term(s), no survivors.`)
  process.exit(0)
}
console.log(`${REPORT ? '' : 'x '}canon: ${hits.length} retired-term hit(s) across ${new Set(hits.map(h => h.file)).size} file(s)`)
for (const h of hits) console.log(`  [${h.term}] ${h.file}:${h.line}\n      ${h.text}`)
if (!REPORT) {
  console.log('\nA retired term is shipping. Either apply the cascade that retires it, or — if a ruling revived it — remove it from translation/dodo-glossary.json retired_terms in the same commit as that ruling.')
  process.exit(1)
}
