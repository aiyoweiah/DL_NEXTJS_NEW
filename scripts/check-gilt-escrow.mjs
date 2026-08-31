#!/usr/bin/env node
// scripts/check-gilt-escrow.mjs
//
// Build guard: gilt (#F5C842) may not appear on an interactive control.
//
// WHY THIS EXISTS
//
// D52 reserved gilt for Charter Enrolment. D53b removed all button fills,
// leaving gilt alive only as the LABEL colour on `.btn-do-charter` — which
// has no call sites, because the site has no enrolment CTA. The guide
// recorded gilt as "currently used nowhere".
//
// It was used in six places. /navigators, /blog, /compare, /faq (x2) and
// /assessment all shipped gilt-FILLED consult CTAs, which is precisely the
// "gilt spent sitewide" contradiction D52 was written to resolve (D65).
//
// They survived v6.8, v6.9 and v6.12 — three sweeps that each declared the
// job finished — because every one of those sweeps swapped CLASS NAMES
// (`btn-secondary`, `btn-solid`, `btn-charter`) and these six carried no
// button class at all: they were `<Link>`s with an inline
// `style={{ backgroundColor: '#F5C842' }}`. A grep for retired class names
// cannot see an inline hex.
//
// That is the same failure shape as the nine private `Eyebrow` copies
// (D57), the 33 hand-rolled panels (D60) and the dead font preload (D64):
// hand-rolled markup escapes a system sweep, every single time. The lesson
// the guide keeps re-learning is that a reservation nobody enforces is a
// reservation that quietly expires. So: a ratchet, like the others.
//
// Scope is CONTROLS ONLY. Decorative gilt (the /about gradient headline,
// its accent dot and pull-quote, the /compare SVG) is deliberately not
// checked — D52's reservation is written about conversion controls, not
// about the colour existing. If the intent is ever "gilt means enrolment
// anywhere", widen this.
//
// Runs on `prebuild`: this is a source-shape rule, so it needs no build.

import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DIRS = ['app', 'components']

// `/ops` is internal admin tooling, not the public design system.
const SKIP = /(^|\/)(node_modules|\.next|out|ops)(\/|$)/

// Anything that renders gilt.
const GILT = /#F5C842|#f5c842|245,\s*200,\s*66|--color-gilt|text-gilt|badge-gilt|btn-gilt/

// Interactive elements — the things D52's reservation is about.
const CONTROL = /<(Link|a|button)\b((?:[^<>]|\{[^{}]*\}|\{\{[^{}]*\}\})*?)>/gs

// ── Known exceptions ─────────────────────────────────────────────────
// Each needs a reason and an expiry condition. An allowlist without those
// is just a slower way of losing the rule.
const ALLOWED = [
  // EMPTY, and that is the point.
  //
  // This list held the /program and /little-dodo hero cross-link chips,
  // with a stated retirement condition: resolve what an interactive chip
  // wears. It was resolved in D68 — they were using gilt for WAYFINDING
  // ("the other age band"), a third meaning alongside "enrolment" and
  // "earned proof". They moved to --color-lavender-signal, which reads as
  // navigation rather than conversion, so they need no D-o bracket either
  // and the open D65 question closes with them.
  //
  // Keep it empty. An entry here needs a reason AND the condition that
  // retires it, or the rule leaks one exception at a time.
]

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (SKIP.test(p)) continue
    if (e.isDirectory()) walk(p, out)
    else if (/\.(jsx|tsx)$/.test(e.name)) out.push(p)
  }
  return out
}

const violations = []
let allowedHit = 0

for (const file of DIRS.flatMap((d) => walk(path.join(ROOT, d)))) {
  const rel = path.relative(ROOT, file)
  const src = fs.readFileSync(file, 'utf8')
  if (!GILT.test(src)) continue

  for (const m of src.matchAll(CONTROL)) {
    const attrs = m.group ? m.group(2) : m[2]
    if (!GILT.test(attrs)) continue
    // A gilt LABEL via the system class is the one sanctioned use.
    if (/btn-do-charter/.test(attrs)) continue

    const line = src.slice(0, m.index).split('\n').length
    if (ALLOWED.some((a) => a.file === rel)) {
      allowedHit++
      continue
    }
    violations.push({ file: rel, line, snippet: attrs.replace(/\s+/g, ' ').trim().slice(0, 90) })
  }
}

if (violations.length === 0) {
  console.log(
    `✓ gilt escrow: no gilt on interactive controls` +
      (allowedHit ? ` (${allowedHit} allowlisted — see ALLOWED in this script)` : '') +
      `.`
  )
  process.exit(0)
}

console.error(
  `\n✖ gilt escrow guard: ${violations.length} interactive control(s) use gilt.\n\n` +
    `  Gilt (#F5C842) is reserved for Charter Enrolment (D52). The site has no\n` +
    `  enrolment CTA, so the only sanctioned use is \`.btn-do-charter\` — and that\n` +
    `  currently has no call sites, by design.\n`
)
for (const v of violations) {
  console.error(`    ${v.file}:${v.line}`)
  console.error(`        ${v.snippet}\n`)
}
console.error(
  `  Fix — if it is a consult/demo/exploratory control, it takes the ordinary\n` +
    `  bracket, not gilt:\n\n` +
    `      className="btn btn-do btn-do-primary"\n\n` +
    `  ⚠️ If the enclosing section paints a dark ground by hand, it also needs the\n` +
    `  \`on-dark\` hook or the label lands near-black on near-black (D53/D65).\n\n` +
    `  If this genuinely IS the Charter Enrolment CTA, use \`.btn-do-charter\` and\n` +
    `  update D52. If it is something else, add it to ALLOWED with a reason and\n` +
    `  the condition that would retire it.\n`
)
process.exit(1)
