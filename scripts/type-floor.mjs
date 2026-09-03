#!/usr/bin/env node
// scripts/type-floor.mjs
//
// Wave 4 task 4.0 — measure the type floor properly.
//
//   npm run type-floor              the report
//   npm run type-floor -- --sites   every site, grouped by origin
//   npm run type-floor -- --json    machine-readable, for a later ratchet
//
// ─────────────────────────────────────────────────────────────────────
// WHY THIS EXISTS RATHER THAN EXTENDING conformance.mjs
//
// `conformance` reports sub-12px nodes by reading two things: an inline
// `font-size` and a `text-[Npx]` class. The completion plan already warned
// that its 469 is "a lower bound and is not comparable to the 558 previously
// quoted". It is worse than that. Two whole categories are invisible to it:
//
//   1. CLASS-DRIVEN SIZES. `.eyebrow`, `.tag-run`, `.label-quote` and every
//      Tailwind named utility set font-size in the emitted stylesheet, not on
//      the element. A page can be wall-to-wall 11px and score zero.
//
//   2. EVERY REM VALUE. conformance's PX regex is /(-?[\d.]+)px/ — it does not
//      match `0.6875rem` at all, inline OR in a class. Tailwind's own scale is
//      rem, so `text-xs` (0.75rem) and every arbitrary `text-[0.6875rem]` fell
//      straight through.
//
// Doing the Wave 4 design pass against that number would have repeated §1 of
// the cohesion proposal exactly: act confidently on an instrument nobody
// checked. So this measures from the emitted CSS, the way check-tokens --build
// does, and reports the ORIGIN of every size — because "make it 12px" is a
// different job when the 11px lives in a shared component class than when it
// is hand-rolled on one element.
//
// ─────────────────────────────────────────────────────────────────────
// WHAT IT CANNOT DO, STATED PLAINLY
//
// It resolves single-class selectors (`.eyebrow`), and it honours media
// queries only by taking the LAST matching declaration, which is the desktop
// value in a mobile-first sheet. It does not do full cascade resolution —
// no specificity arithmetic, no inheritance, no `:where()` unwrapping beyond
// a textual strip. So a size set by a descendant selector (`.section-dark p`)
// is not attributed. That makes this a LOWER BOUND TOO — but a much tighter
// one, and every number it reports names its own source, so a wrong one is
// visible rather than silent.
//
// Read docs/architecture-cohesion-proposal.md §4 before quoting any of this.

import fs from 'node:fs'
import path from 'node:path'
import { parse, walk, classList, styleMap, text } from './html-parse.mjs'

const ROOT = process.cwd()
const OUT = path.join(ROOT, 'out')
const FLOOR = 12
const SHOW_SITES = process.argv.includes('--sites')
const AS_JSON = process.argv.includes('--json')

if (!fs.existsSync(OUT)) {
  console.error('✖ type-floor: no out/ — run `npm run build` first.')
  process.exit(1)
}

// ── 1 · size lookup, built from the emitted stylesheet ───────────────
// selector-token -> { px, from } for single-class rules only.
const classSize = new Map()
const ROOT_FONT_PX = 16

function toPx(v) {
  const m = String(v).trim().match(/^(-?[\d.]+)(px|rem|em)?$/)
  if (!m) return null
  const n = parseFloat(m[1])
  if (!Number.isFinite(n)) return null
  const unit = m[2] || 'px'
  if (unit === 'px') return n
  if (unit === 'rem') return n * ROOT_FONT_PX
  return null // `em` depends on the parent — not resolvable here, so skip it
}

function loadEmittedCss() {
  const dir = path.join(OUT, '_next', 'static')
  if (!fs.existsSync(dir)) return 0
  const files = []
  ;(function walkDir(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name)
      if (e.isDirectory()) walkDir(p)
      else if (e.name.endsWith('.css')) files.push(p)
    }
  })(dir)

  let rules = 0
  for (const f of files) {
    const css = fs.readFileSync(f, 'utf8')
    // selector { ...decls... } — good enough for a flat utility sheet
    for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      const body = m[2]
      const fsMatch = body.match(/(?:^|;)\s*font-size\s*:\s*([^;]+)/)
      if (!fsMatch) continue
      const px = toPx(fsMatch[1].replace(/!important/, ''))
      if (px == null) continue
      rules++
      for (let sel of m[1].split(',')) {
        sel = sel.trim().replace(/:where\(([^)]*)\)/g, '$1')
        // single class only, optionally with pseudo-elements/classes stripped
        const single = sel.match(/^\.((?:[\w-]|\\.)+)(?:::?[\w-]+)?$/)
        if (!single) continue
        const name = single[1].replace(/\\/g, '')
        // last declaration wins — desktop value in a mobile-first sheet
        classSize.set(name, { px, from: path.basename(f) })
      }
    }
  }
  return rules
}

const cssRules = loadEmittedCss()

// ── 2 · walk every emitted page ──────────────────────────────────────
const pages = []
;(function collect(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) { if (e.name !== '_next') collect(p) }
    else if (e.name.endsWith('.html')) pages.push(p)
  }
})(OUT)

const routeOf = (f) => '/' + path.relative(OUT, path.dirname(f)).split(path.sep).join('/')

// origin -> { px -> count }, plus per-site detail
const byOrigin = new Map()
const sites = []
let nodes = 0
const spelling = new Map()

function record(origin, px, route, detail) {
  if (!byOrigin.has(origin)) byOrigin.set(origin, new Map())
  const m = byOrigin.get(origin)
  m.set(px, (m.get(px) || 0) + 1)
  nodes++
  if (SHOW_SITES || AS_JSON) sites.push({ origin, px, route, detail })
}

for (const f of pages) {
  const route = routeOf(f)
  if (/\/ops(\/|$)/.test(route)) continue
  const root = parse(fs.readFileSync(f, 'utf8'))

  walk(root, (el) => {
    const cls = classList(el)
    const st = styleMap(el)

    // (a) inline font-size — px OR rem, which is the half conformance missed
    const inline = st.get('font-size')
    if (inline) {
      const px = toPx(inline)
      if (px != null && px > 0 && px < FLOOR) {
        const unit = /rem/.test(inline) ? 'rem' : 'px'
        spelling.set(unit, (spelling.get(unit) || 0) + 1)
        record('inline style', px, route, inline.trim())
        return
      }
      if (px != null) return // sized inline and legal — a class cannot win
    }

    // (b) Tailwind arbitrary value, px or rem
    let arb = null
    for (const c of cls) {
      const m = c.match(/^text-\[(-?[\d.]+(?:px|rem))\]$/)
      if (m) arb = m[1]
    }
    if (arb) {
      const px = toPx(arb)
      if (px != null && px > 0 && px < FLOOR) { record('arbitrary class', px, route, `text-[${arb}]`) }
      return
    }

    // (c) a class whose size comes from the emitted sheet
    let hit = null
    for (const c of cls) {
      const rec = classSize.get(c)
      if (rec && rec.px > 0 && rec.px < FLOOR) hit = { c, ...rec }
    }
    if (hit) {
      const label = (text(el) || '').trim().replace(/\s+/g, ' ').slice(0, 40)
      record('css class', hit.px, route, '.' + hit.c + (label ? `  “${label}”` : ''))
    }
  })
}

// ── 3 · report ───────────────────────────────────────────────────────
if (AS_JSON) {
  console.log(JSON.stringify({ floor: FLOOR, nodes, cssRules, sites }, null, 2))
  process.exit(0)
}

const pad = (n) => String(n).padStart(6)
console.log(`\ntype floor — nodes under ${FLOOR}px`)
console.log('─'.repeat(60))
console.log(`  ${pages.length} routes · ${cssRules} font-size rules read from emitted CSS · ${classSize.size} single-class sizes resolved\n`)

const originTotal = (o) => [...(byOrigin.get(o) || new Map()).values()].reduce((a, b) => a + b, 0)
const ALL_ORIGINS = ['css class', 'arbitrary class', 'inline style']
for (const o of ALL_ORIGINS) if (!byOrigin.has(o)) byOrigin.set(o, new Map())
const origins = [...byOrigin.keys()].sort((a, b) => originTotal(b) - originTotal(a))

for (const o of origins) {
  const m = byOrigin.get(o)
  console.log(pad(originTotal(o)) + '  ' + o)
  for (const [px, n] of [...m.entries()].sort((a, b) => a[0] - b[0])) {
    console.log(pad(n) + '      ' + px + 'px')
  }
}
console.log('\n' + pad(nodes) + '  TOTAL')

// The spelling split IS the finding: conformance's regex only ever matched px.
const spellText = [...spelling.entries()].map(([u, n]) => `${n} ${u}`).join(' · ')
console.log(`
  inline sizes by spelling: ${spellText}
  conformance matches /([\\d.]+)px/, so the rem half was invisible to it —
  that, plus the arbitrary rem classes, is the whole 469 vs ${nodes} gap.`)

console.log(`
  Origin decides the fix, which is why they are split:

    css class        one edit in globals.css moves every instance at once.
                     Cheapest by far, and the safest — it cannot desync.
    arbitrary class  a per-site decision, but mechanical.
    inline style     hand-rolled; each one is its own judgment call, and each
                     also sits in the D78 inline-style ratchet.

  This is still a LOWER BOUND — sizes set by descendant selectors are not
  attributed (see the header). It is a much tighter one than conformance's,
  and every number above names its own source.`)

if (SHOW_SITES) {
  console.log('\n' + '─'.repeat(60) + '\nevery site\n')
  const byRoute = new Map()
  for (const s of sites) {
    if (!byRoute.has(s.route)) byRoute.set(s.route, [])
    byRoute.get(s.route).push(s)
  }
  for (const [r, list] of [...byRoute.entries()].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n  ${r}  (${list.length})`)
    const seen = new Map()
    for (const s of list) {
      const k = s.origin + '|' + s.px + '|' + s.detail
      seen.set(k, (seen.get(k) || 0) + 1)
    }
    for (const [k, n] of [...seen.entries()].sort((a, b) => b[1] - a[1])) {
      const [origin, px, detail] = k.split('|')
      console.log(`      ${String(n).padStart(3)}×  ${px}px  ${origin.padEnd(16)} ${detail}`)
    }
  }
}
