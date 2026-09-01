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
// ── TWO PASSES (D73) ─────────────────────────────────────────────────
//
//   node scripts/check-gilt-escrow.mjs            source pass  (prebuild)
//   node scripts/check-gilt-escrow.mjs --build    build pass   (postbuild)
//
// The source pass is a source-shape rule and needs no build. It has one
// structural blind spot, named in docs/architecture-cohesion-proposal.md §2B:
// it can only recognise gilt spelled the way it expects, on markup that
// appears in our own source. It cannot see gilt that arrives through a CSS
// CLASS whose rule it never read, and it cannot see a control rendered only
// on the client.
//
// The build pass closes both. It reads the emitted CSS, works out which class
// selectors actually paint gilt — whatever they are called — and then PARSES
// every page in out/ and checks the controls that really rendered. It is the
// difference between "no source file spells gilt near a <Link>" and "no
// control on this site is gilt".

import fs from 'node:fs'
import path from 'node:path'
import { parse, findAll, classList, styleMap, describe } from './html-parse.mjs'

const ROOT = process.cwd()
const DIRS = ['app', 'components']
const OUT = path.join(ROOT, 'out')
const BUILD = process.argv.includes('--build')

// `/ops` is internal admin tooling, not the public design system.
const SKIP = /(^|\/)(node_modules|\.next|out|ops)(\/|$)/

// Anything that renders gilt.
const GILT = /#F5C842|#f5c842|245,\s*200,\s*66|--color-gilt|text-gilt|badge-gilt|btn-gilt/

// Interactive elements — the things D52's reservation is about.
const CONTROL = /<(Link|a|button)\b((?:[^<>]|\{[^{}]*\}|\{\{[^{}]*\}\})*?)>/gs

// ── Known exceptions ─────────────────────────────────────────────────
// An entry takes `file` (source pass) or `class` (build pass), and MUST carry a
// reason AND the condition that retires it. An allowlist without those is just
// a slower way of losing the rule.
//
// This list was empty before D73, and that was the point: it had held the
// /program and /little-dodo hero cross-link chips with a stated retirement
// condition, and D68 retired them (they were using gilt for WAYFINDING, a
// third meaning alongside "enrolment" and "earned proof"; they moved to
// --color-lavender-signal).
const ALLOWED = [
  {
    class: 'skip-link',
    // Found by the build pass on its first run (D73). Invisible to the source
    // pass by construction: the JSX says only `className="skip-link"` and the
    // gilt lives in globals.css, so a scan for gilt spelled near an anchor
    // cannot reach it. Same shape as D65, one layer further out.
    //
    // Reason it is tolerated rather than restyled: D52 escrows gilt against
    // CONVERSION controls, to stop the enrolment signal being spent sitewide.
    // The skip link is neither decorative nor conversion — it is a WCAG 2.4.1
    // bypass affordance that renders only on keyboard focus, so it spends the
    // signal in front of approximately no prospective parent, and gilt on Void
    // Black is 12.13:1, which is a real argument for a focus target that has
    // to be unmissable.
    //
    // RETIRES WHEN: the owner rules on it. Either (a) confirm the exception and
    // record it in D52 as a stated carve-out for a11y affordances, at which
    // point this entry cites that instead of arguing the case, or (b) restyle
    // the skip link — --color-lavender-signal is the natural alternative, as it
    // was for the D68 chips — and delete this entry.
    reason: 'WCAG bypass link, focus-only, not a conversion control — pending owner ruling',
  },
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

// ── Source pass ──────────────────────────────────────────────────────

function sourcePass() {
  const violations = []
  let allowedHit = 0

  for (const file of DIRS.flatMap((d) => walk(path.join(ROOT, d)))) {
    const rel = path.relative(ROOT, file)
    const src = fs.readFileSync(file, 'utf8')
    if (!GILT.test(src)) continue

    for (const m of src.matchAll(CONTROL)) {
      const attrs = m[2]
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
      `✓ gilt escrow (source): no gilt on interactive controls` +
        (allowedHit ? ` (${allowedHit} allowlisted — see ALLOWED in this script)` : '') +
        `.`
    )
    return 0
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
  return 1
}

// ── Build pass ───────────────────────────────────────────────────────

// Gilt as it can appear in an emitted declaration.
//
// `--gilt-mark` (#AD8100) is deliberately NOT here. D68 gave that colour one
// job — stroking an earned-proof mark — and it is not the escrowed brand gold.
// Conflating them would make the guard fail on `.score-marked`, which is the
// D68 grammar working correctly.
const GILT_VALUE =
  /#F5C842\b|#8F6B00\b|rgba?\(\s*245\s*,\s*200\s*,\s*66|var\(\s*--color-gilt|var\(\s*--text-gilt-(light|dark)/i

// The one sanctioned gilt control.
const SANCTIONED = 'btn-do-charter'

/**
 * Class names in the SUBJECT compound of a selector — the element the rule
 * actually paints.
 *
 * `.on-dark .btn-do-charter` paints the charter button, not everything with
 * `.on-dark`; taking every class in the selector would blacklist `.on-dark`
 * sitewide and fail every control inside a dark section. So: strip functional
 * pseudos, split on combinators, keep the last compound.
 *
 * Returns the classes that must ALL be present for the rule to apply, so
 * `.a.b { … }` does not condemn `.a` on its own.
 */
function subjectClasses(selector) {
  const cleaned = selector.replace(/:(not|is|where|has)\([^)]*\)/g, '')
  const parts = cleaned.trim().split(/\s*[\s>+~]\s*/).filter(Boolean)
  const subject = parts[parts.length - 1] ?? ''
  // Class tokens may carry CSS escapes: `.md\:p-8`, `.w-1\.5`.
  return [...subject.matchAll(/\.((?:\\.|[A-Za-z0-9_-])+)/g)].map((m) => m[1].replace(/\\/g, ''))
}

/** Every class-rule in the emitted CSS whose declarations paint gilt. */
function giltRulesFromCss() {
  const cssDir = path.join(OUT, '_next', 'static')
  const files = []
  const collect = (dir) => {
    if (!fs.existsSync(dir)) return
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) collect(p)
      else if (e.name.endsWith('.css')) files.push(p)
    }
  }
  collect(cssDir)

  const rules = []
  for (const file of files) {
    const css = fs.readFileSync(file, 'utf8')
    // Innermost blocks only — an @media wrapper cannot match `[^{}]*`, so its
    // nested rules are matched individually, which is what we want.
    for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      if (!GILT_VALUE.test(m[2])) continue
      for (const sel of m[1].split(',')) {
        const classes = subjectClasses(sel)
        if (classes.length) rules.push({ classes, selector: sel.trim(), decl: m[2].trim().slice(0, 80) })
      }
    }
  }
  return rules
}

const isControl = (el) =>
  el.tag === 'a' ||
  el.tag === 'button' ||
  (el.tag === 'input' && /^(submit|button|reset)$/i.test(el.attrs.type || ''))

const routeOf = (file) =>
  '/' + path.relative(OUT, file).split(path.sep).join('/')
    .replace(/\/?index\.html$/, '')
    .replace(/\.html$/, '')

function buildPass() {
  if (!fs.existsSync(OUT)) {
    console.log('· gilt escrow (build): no out/ directory — skipping.')
    return 0
  }

  const rules = giltRulesFromCss()
  const htmlFiles = []
  const collect = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) collect(p)
      else if (e.name.endsWith('.html')) htmlFiles.push(p)
    }
  }
  collect(OUT)

  const violations = []
  let allowedHit = 0

  for (const file of htmlFiles) {
    const route = routeOf(file)
    const root = parse(fs.readFileSync(file, 'utf8'))

    for (const el of findAll(root, isControl)) {
      const classes = classList(el)
      if (classes.includes(SANCTIONED)) continue

      let why = null

      // 1. Gilt written straight onto the control.
      const inline = el.attrs.style || ''
      if (GILT_VALUE.test(inline)) {
        why = `inline style: ${inline.replace(/\s+/g, ' ').slice(0, 70)}`
      }

      // 2. Gilt arriving through a class, whatever that class is called. This
      //    is the half the source pass cannot see: it matches known gilt class
      //    NAMES, so a new one would pass it and ship.
      if (!why) {
        for (const rule of rules) {
          if (rule.classes.every((c) => classes.includes(c))) {
            why = `class rule: ${rule.selector} { ${rule.decl} }`
            break
          }
        }
      }

      if (!why) continue
      if (ALLOWED.some((a) => a.class && classes.includes(a.class))) { allowedHit++; continue }

      violations.push({ route, line: el.line, node: describe(el), why })
    }
  }

  if (violations.length === 0) {
    console.log(
      `✓ gilt escrow (build): ${htmlFiles.length} pages parsed, ` +
        `${rules.length} gilt class rule(s) resolved from CSS, no gilt on any rendered control` +
        (allowedHit ? ` (${allowedHit} allowlisted)` : '') + `.`
    )
    return 0
  }

  // One control in a shared component is one violation per route. Group so the
  // output names the problem once, with its blast radius.
  const grouped = new Map()
  for (const v of violations) {
    const key = `${v.node}|${v.why}`
    if (!grouped.has(key)) grouped.set(key, { ...v, routes: [] })
    grouped.get(key).routes.push(v.route)
  }

  console.error(
    `\n✖ gilt escrow (build): ${grouped.size} rendered control(s) paint gilt, ` +
      `across ${new Set(violations.map((v) => v.route)).size} route(s).\n\n` +
      `  Gilt (#F5C842) is reserved for Charter Enrolment (D52). The only\n` +
      `  sanctioned control is \`.btn-do-charter\`.\n`
  )
  for (const g of grouped.values()) {
    console.error(`    ${g.node}  — ${g.routes.length} route(s), e.g. ${g.routes[0]}:${g.line}`)
    console.error(`        ${g.why}\n`)
  }
  console.error(
    `  This pass reads the emitted CSS and the parsed pages, so it catches gilt\n` +
      `  arriving through a class the source pass has never heard of, and controls\n` +
      `  that only render on the client. A green source pass does not clear it.\n\n` +
      `  Fix — an ordinary consult/demo control takes the bracket, not gilt:\n\n` +
      `      className="btn btn-do btn-do-primary"\n`
  )
  return 1
}

process.exit(BUILD ? buildPass() : sourcePass())
