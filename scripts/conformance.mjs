#!/usr/bin/env node
// scripts/conformance.mjs
//
// The conformance report — architecture-cohesion-proposal.md §3.5.
//
// Prints the CURRENT MEASURED STATE of the things this design system keeps
// claiming things about. It never fails a build; the guards do that. Its job
// is to make the guide quote numbers instead of assertions.
//
//   npm run conformance
//   npm run conformance -- --labels    just the label triage, in full
//
// WHY IT EXISTS
//
// Five times this codebase recorded a completeness claim that was false when
// written — "the last non-btn-do CTA is gone" (twice), gilt "is currently used
// nowhere", "46 pills → 0", and `.btn-do-charter` "used nowhere" in five
// separate places while it shipped a failing label for five months. Every one
// was sincere. Every one was prose about a number nobody had measured.
//
// It reads out/, so it sees what RENDERS rather than what the source says —
// which is the whole lesson of D73. Run `npm run build` first.

import fs from 'node:fs'
import path from 'node:path'
import { parse, walk, classList, styleMap, text, closest } from './html-parse.mjs'

const OUT = path.join(process.cwd(), 'out')
const ONLY_LABELS = process.argv.includes('--labels')

if (!fs.existsSync(OUT)) {
  console.error('conformance: no out/ directory. Run `npm run build` first.')
  process.exit(1)
}

const files = []
;(function w(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) w(p)
    else if (e.name === 'index.html') files.push(p)
  }
})(OUT)

const routeOf = (f) => '/' + path.relative(OUT, path.dirname(f)).split(path.sep).join('/')

// ── Label taxonomy ───────────────────────────────────────────────────
// The six jobs the hand-rolled uppercase labels actually do. D71 triaged 44
// of them by rendered shape and found 9 genuine eyebrows; it could not see
// the ones DECLARED as `eyebrow:` in content/ and hand-wrapped by page code,
// because it read app/ and components/. Those are family 6.
const FAMILY = [
  { id: 'framework',  test: /^(read|think|speak|write|阅读|思考|表达|写作)$/i,
    note: 'Loop strand names — brand canon (D37). Load-bearing.' },
  { id: 'proof-axis', test: /lexile|after \d+ ?wks|16wks|32wks|ssat/i,
    note: 'Axis labels on a sanctioned proof device (D74).' },
  { id: 'state',      test: /you.?re here|当前页面|^·/i,
    note: 'State indicator. Functional, not decoration.' },
  { id: 'step',       test: /^(week|第)\s*\d+|^\d+\s*周/i,
    note: 'Timeline marker.' },
  { id: 'chrome',     test: /^(programs|resources|serving|the dodo family|课程|资源|服务地区|都学家族|coming soon|即将上线)$/i,
    note: 'Footer column header / chrome furniture.' },
  { id: 'stat',       test: /^(children|grade level|teaching hours|by word|个孩子|个年级|口碑)/i,
    note: 'Caption under a proof number.' },
]
const familyOf = (s) => (FAMILY.find((f) => f.test.test(s)) || { id: 'section-label' }).id

// ── Collect ──────────────────────────────────────────────────────────
const labels = new Map()       // text -> {text, family, routes:Set, spellings:Set}
let canonicalEyebrows = 0, tagRuns = 0
const inlineColour = new Map() // literal -> count
let inlineStyleBlocks = 0
const smallType = new Map()    // px -> count
let giltLeads = 0, sectionsWithLead = 0
const pills = new Map()

const PX = /(-?[\d.]+)px/
const HEX = /#[0-9A-Fa-f]{3,8}\b/g

for (const f of files) {
  const route = routeOf(f)
  if (/\/ops(\/|$)/.test(route)) continue
  const root = parse(fs.readFileSync(f, 'utf8'))

  walk(root, (el) => {
    const cls = classList(el)
    const st = styleMap(el)

    if (cls.includes('eyebrow')) canonicalEyebrows++
    if (cls.includes('tag-run')) tagRuns++

    // hand-rolled uppercase labels: uppercase NOT via the canonical component
    const upper = st.get('text-transform') === 'uppercase' || cls.includes('uppercase')
    if (upper && !cls.includes('eyebrow')) {
      const t = (text(el) || '').trim().replace(/\s+/g, ' ')
      if (t && t.length <= 60) {
        if (!labels.has(t)) {
          labels.set(t, { text: t, family: familyOf(t), routes: new Set(), spellings: new Set() })
        }
        const rec = labels.get(t)
        rec.routes.add(route)
        // the spelling is what drifts — tracking + colour, however written
        const track = cls.find((c) => /^tracking-/.test(c)) || st.get('letter-spacing') || '-'
        const colour = st.get('color') || (cls.find((c) => /^text-\[/.test(c))) || '-'
        rec.spellings.add(track + ' / ' + colour)
      }
    }

    // inline style blocks setting colour or typography (the §3.3 baseline)
    if (el.attrs.style) {
      const keys = [...st.keys()]
      if (keys.some((k) => /^(color|background-color|border|font-size|font-weight|letter-spacing)/.test(k))) {
        inlineStyleBlocks++
      }
      for (const m of (el.attrs.style.match(HEX) || [])) {
        inlineColour.set(m.toUpperCase(), (inlineColour.get(m.toUpperCase()) || 0) + 1)
      }
    }

    // sub-12px type
    const fsz = st.get('font-size')
    if (fsz && PX.test(fsz)) {
      const px = parseFloat(fsz.match(PX)[1])
      if (px > 0 && px < 12) smallType.set(px, (smallType.get(px) || 0) + 1)
    }
    for (const c of cls) {
      const m = c.match(/^text-\[(\d+(?:\.\d+)?)px\]$/)
      if (m && parseFloat(m[1]) < 12) {
        const px = parseFloat(m[1])
        smallType.set(px, (smallType.get(px) || 0) + 1)
      }
    }

    // Pills: a rounded capsule carrying a LABEL. D70 retired those.
    //
    // A circle is not a pill. Author-avatar initials ("J", "MT", "陈") and
    // ordinal step markers ("1", "2", "3") are round by design and are a
    // different device — they carry an identity or a position, not a label.
    // Distinguishing them matters: a report that flags 20 legitimate circles
    // every run teaches the reader to ignore it, which is how the last five
    // false claims survived. So: 3+ characters, and not explicitly square.
    const radius = st.get('border-radius') || ''
    if (/9999px|var\(--radius-pill\)/.test(radius) || cls.includes('rounded-full')) {
      const t = (text(el) || '').trim()
      const w = st.get('width'), h = st.get('height')
      const square = (w && h && w === h) || cls.some((c) => {
        const m = c.match(/^w-(\d+)$/); return m && cls.includes('h-' + m[1])
      })
      if (t && t.length >= 3 && t.length <= 40 && !square) {
        pills.set(t, (pills.get(t) || 0) + 1)
      }
    }
  })

  // gilt leads per section (D76)
  const SEC = new Set(['section', 'footer', 'nav', 'header', 'main', 'body'])
  const bySec = new Map()
  walk(root, (el) => {
    if (!(el.tag === 'a' || el.tag === 'button')) return
    const cls = classList(el)
    if (cls.includes('btn-do-fork')) return
    if (!cls.includes('btn-do-primary') && !cls.includes('btn-do-charter')) return
    const s = closest(el, (n) => SEC.has(n.tag)) || root
    bySec.set(s, (bySec.get(s) || 0) + 1)
  })
  for (const n of bySec.values()) { giltLeads += n; sectionsWithLead++ }
}

// ── Report ───────────────────────────────────────────────────────────
const pad = (n) => String(n).padStart(6)
const rule = (t) => '\n' + t + '\n' + '─'.repeat(Math.max(t.length, 52))

const byFamily = new Map()
for (const rec of labels.values()) {
  if (!byFamily.has(rec.family)) byFamily.set(rec.family, [])
  byFamily.get(rec.family).push(rec)
}
const labelInstances = [...labels.values()].reduce((a, r) => a + r.routes.size, 0)

console.log(rule('LABELS — canonical vs hand-rolled'))
console.log(pad(canonicalEyebrows) + '  canonical .eyebrow elements')
console.log(pad(labelInstances) + '  hand-rolled uppercase label instances')
console.log(pad(labels.size) + '  distinct hand-rolled strings (EN + ZH)')
console.log(pad(tagRuns) + '  .tag-run elements (D70 taxonomy runs)')
console.log('\n  by family — the triage D71 could not complete:')
for (const fam of [...byFamily.keys()].sort()) {
  const recs = byFamily.get(fam).sort((a, b) => b.routes.size - a.routes.size)
  const meta = FAMILY.find((f) => f.id === fam)
  const drift = recs.filter((r) => r.spellings.size > 1).length
  console.log(
    '    ' + fam.padEnd(14) + pad(recs.length) + ' strings, ' +
    String(recs.reduce((a, r) => a + r.routes.size, 0)).padStart(5) + ' instances' +
    (drift ? '   ⚠ ' + drift + ' with >1 spelling' : '')
  )
  if (meta) console.log('                   ' + meta.note)
  if (ONLY_LABELS) {
    for (const r of recs) {
      console.log('        ' + String(r.routes.size).padStart(4) + '×  ' +
        JSON.stringify(r.text).slice(0, 44).padEnd(46) + [...r.spellings].join(' | ').slice(0, 60))
    }
  }
}
if (!ONLY_LABELS) console.log('\n  (run with `-- --labels` for the full string list)')

if (!ONLY_LABELS) {
  console.log(rule('PILLS — D70 claimed 0'))
  console.log(pad([...pills.values()].reduce((a, b) => a + b, 0)) + '  capsule elements carrying short text')
  for (const [t, n] of [...pills].sort((a, b) => b[1] - a[1]).slice(0, 6)) {
    console.log('        ' + String(n).padStart(4) + '×  ' + JSON.stringify(t).slice(0, 50))
  }

  console.log(rule('INLINE STYLE — proposal §3.3, the ratchet not yet built'))
  console.log(pad(inlineStyleBlocks) + '  elements with an inline colour/type declaration')
  console.log(pad(inlineColour.size) + '  distinct hex literals written inline')
  console.log('        top:  ' + [...inlineColour].sort((a, b) => b[1] - a[1]).slice(0, 6)
    .map(([h, n]) => h + '×' + n).join('  '))

  console.log(rule('TYPE FLOOR — the open design pass'))
  const totalSmall = [...smallType.values()].reduce((a, b) => a + b, 0)
  console.log(pad(totalSmall) + '  nodes under 12px')
  console.log('        ' + [...smallType].sort((a, b) => a[0] - b[0])
    .map(([px, n]) => px + 'px×' + n).join('  '))

  console.log(rule('GILT — D76'))
  console.log(pad(giltLeads) + '  gilt leads across ' + sectionsWithLead + ' section(s)')
  console.log('        ' + (giltLeads === sectionsWithLead
    ? 'exactly one per section ✓'
    : '⚠ ' + (giltLeads - sectionsWithLead) + ' section(s) hold more than one — check-gilt-escrow will fail'))

  console.log(rule('ROUTES'))
  console.log(pad(files.length) + '  index.html files in out/')
}
console.log()
