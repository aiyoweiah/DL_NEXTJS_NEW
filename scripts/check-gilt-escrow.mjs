#!/usr/bin/env node
// scripts/check-gilt-escrow.mjs
//
// Build guard for the gilt rule (D76).
//
// ── THE RULE ─────────────────────────────────────────────────────────
//
//   1. Gilt is NEVER paint on a control — not a label colour, not a fill,
//      not a border. Gold as text is what kept failing contrast.
//   2. Gilt IS the swash under the single LEAD control of a conversion
//      section. One per section, or none.
//
// D52 used to reserve gilt for a Charter Enrolment CTA that did not exist.
// D76 retired that reservation: gilt is now positional — it marks which
// control leads — rather than semantic.
//
// ── WHY THIS FILE IS SHAPED LIKE THIS ────────────────────────────────
//
// Under D52 this guard asserted "no gilt on any control". It shipped that
// way and it was still wrong, because the premise was false: the guide
// asserted FIVE times, in five places, that `.btn-do-charter` had no call
// sites, while `/lexile`, `/methodology` and `/results` had been rendering
// it since 2026-03-19 — six controls, EN + ZH. For five months before D68
// its label was `#C49400`, 2.56:1 on Whisper: failing AA text AND the 3:1
// non-text floor, live, on three conversion pages. D68's token correction
// was written as a pre-emptive fix for a CTA that did not exist; it was
// actually repairing a shipped accessibility failure.
//
// The class was invisible to every sweep because it lived in a VARIANT MAP
// (`components/ui/Button.jsx`), not in the page markup any of them read.
// That is the same failure shape as D65's inline hex, D69's pill eyebrows,
// D71's nested pills and D73's `.skip-link` — the detector's blind spot is
// where the bug lives, every single time.
//
// So this guard checks RENDERED OUTPUT and distinguishes gilt-as-paint from
// gilt-as-swash by reading which PROPERTY the colour lands in, rather than
// trusting any class name to mean what it is called.
//
// ── TWO PASSES ───────────────────────────────────────────────────────
//
//   node scripts/check-gilt-escrow.mjs            source pass  (prebuild)
//   node scripts/check-gilt-escrow.mjs --build    build pass   (postbuild)
//
// The source pass forbids hand-rolled gilt on a control: gilt must arrive
// through the system class, never through an inline hex. It is a cheap
// shape rule and it has a structural blind spot (docs/architecture-
// cohesion-proposal.md §2B) — it cannot see gilt arriving via a CSS class
// whose rule it never read, nor a control rendered only on the client.
//
// The build pass closes both. It reads the emitted CSS, works out which
// class selectors actually paint gilt and HOW, then parses every page in
// out/ and checks the controls that really rendered.

import fs from 'node:fs'
import path from 'node:path'
import { parse, findAll, classList, styleMap, describe, closest, text } from './html-parse.mjs'

const ROOT = process.cwd()
const DIRS = ['app', 'components']
const OUT = path.join(ROOT, 'out')
const BUILD = process.argv.includes('--build')

// `/ops` is internal admin tooling, not the public design system.
const SKIP = /(^|\/)(node_modules|\.next|out|ops)(\/|$)/

// Anything that renders gilt in SOURCE.
const GILT = /#F5C842|#f5c842|245,\s*200,\s*66|--color-gilt|text-gilt|badge-gilt|btn-gilt/

// Interactive elements — the things the rule is about.
const CONTROL = /<(Link|a|button)\b((?:[^<>]|\{[^{}]*\}|\{\{[^{}]*\}\})*?)>/gs

// The classes that carry the sanctioned gilt swash (D76). A control wearing
// one of these is a LEAD, and is checked for the one-per-section rule rather
// than treated as an escape.
// `btn-do-charter` was the second entry here and is gone (D79). It painted
// identically to primary after D76, and all three of its call sites pointed at
// /consult — so the class reserved for "Charter Enrolment" was never once used
// for enrolment. Folded in rather than kept: a reserved name nobody can see in
// use is exactly what went unnoticed for five months.
const LEAD_CLASSES = ['btn-do-primary']

// The opt-out. A section where two controls are genuinely co-equal — an
// age-band fork, not a conversion close — has no lead, so it takes no gilt.
const FORK_CLASS = 'btn-do-fork'

// ── Known exceptions ─────────────────────────────────────────────────
// An entry takes `file` (source pass) or `class` (build pass), and MUST carry
// a reason AND the condition that retires it. An allowlist without those is
// just a slower way of losing the rule.
// EMPTY, and that is the point. It held one entry — `.skip-link`, found by the
// build pass on its first run (D73) painting gilt on all 114 routes. The owner
// ruled on 2026-09-01 (D79): restyle rather than carve out. Both colours clear
// AAA on Void Black, so the accessibility argument never required gold.
//
// It was empty once before, after D68, and D73 refilled it within a day. If a
// third entry ever lands here, the honest reading is that the rule has an
// exception class nobody has named yet — not that this one is special.
const ALLOWED = []

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
      // Gilt arriving through the system class is the sanctioned route.
      if (new RegExp(LEAD_CLASSES.join('|')).test(attrs)) continue

      const line = src.slice(0, m.index).split('\n').length
      if (ALLOWED.some((a) => a.file === rel)) { allowedHit++; continue }
      violations.push({ file: rel, line, snippet: attrs.replace(/\s+/g, ' ').trim().slice(0, 90) })
    }
  }

  if (violations.length === 0) {
    console.log(
      `✓ gilt escrow (source): no hand-rolled gilt on interactive controls` +
        (allowedHit ? ` (${allowedHit} allowlisted — see ALLOWED in this script)` : '') + `.`
    )
    return 0
  }

  console.error(
    `\n✖ gilt escrow (source): ${violations.length} control(s) spell gilt by hand.\n\n` +
      `  Gilt reaches a control through the system class and nowhere else (D76).\n` +
      `  An inline hex is invisible to a class rename and to every sweep that\n` +
      `  reads class names — which is how six of these shipped before (D65).\n`
  )
  for (const v of violations) {
    console.error(`    ${v.file}:${v.line}`)
    console.error(`        ${v.snippet}\n`)
  }
  console.error(
    `  Fix — if this control LEADS its section, it takes the lead class and the\n` +
      `  gilt swash comes with it:\n\n` +
      `      className="btn btn-do btn-do-primary"\n\n` +
      `  If it does not lead, it is a secondary and keeps the pale swash:\n\n` +
      `      className="btn btn-do"\n\n` +
      `  ⚠️ If the enclosing section paints a dark ground by hand, it also needs\n` +
      `  the \`on-dark\` hook or the label lands near-black on near-black (D53/D65).\n`
  )
  return 1
}

// ── Build pass ───────────────────────────────────────────────────────

// Gilt as it can appear in an emitted declaration. `%23F5C842` is the same
// colour inside a data-URI SVG, which is how the swash ships — omit it and the
// guard cannot see the very thing D76 is about.
//
// `--gilt-mark` (#AD8100) is deliberately NOT here. D68 gave that colour one
// job — stroking an earned-proof mark — and it is not the brand gold.
// Conflating them would fail `.score-marked`, which is D68 working correctly.
const GILT_VALUE =
  /#F5C842\b|%23F5C842\b|#8F6B00\b|rgba?\(\s*245\s*,\s*200\s*,\s*66|var\(\s*--color-gilt|var\(\s*--text-gilt-(light|dark)/i

/** Split a declaration block on top-level `;` — data URIs contain their own. */
function declarations(block) {
  const out = []
  let depth = 0, buf = ''
  const flush = () => { const d = buf.trim(); buf = ''; if (d) out.push(d) }
  for (const ch of block) {
    if (ch === '(') depth++
    else if (ch === ')') depth--
    if (ch === ';' && depth === 0) { flush(); continue }
    buf += ch
  }
  flush()
  return out
}

/**
 * Class names in the SUBJECT compound of a selector — the element the rule
 * actually paints. `.on-dark .btn-do-charter` paints the charter button, not
 * everything with `.on-dark`.
 */
function subjectClasses(selector) {
  const cleaned = selector.replace(/:(not|is|where|has)\([^)]*\)/g, '')
  const parts = cleaned.trim().split(/\s*[\s>+~]\s*/).filter(Boolean)
  const subject = parts[parts.length - 1] ?? ''
  return [...subject.matchAll(/\.((?:\\.|[A-Za-z0-9_-])+)/g)].map((m) => m[1].replace(/\\/g, ''))
}

/**
 * Every class-rule in the emitted CSS that paints gilt, classified by HOW.
 *
 *   kind 'swash' — the colour arrives inside a background-image. Decorative,
 *                  WCAG 1.4.11 does not apply (D55), and this is the D76 mark.
 *   kind 'paint' — the colour arrives as text, fill or border. Forbidden.
 *
 * Reading the property rather than the class name is the point: a class called
 * `btn-do-charter` told five separate places it was unused while it shipped.
 */
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
    for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      if (!GILT_VALUE.test(m[2])) continue
      // Which declarations actually carry the gilt?
      let kind = null
      for (const decl of declarations(m[2])) {
        if (!GILT_VALUE.test(decl)) continue
        const prop = decl.slice(0, decl.indexOf(':')).trim().toLowerCase()
        if (/^background(-image)?$/.test(prop) && /url\(/i.test(decl)) {
          kind = kind === 'paint' ? 'paint' : 'swash'
        } else {
          kind = 'paint'
        }
      }
      if (!kind) continue
      for (const sel of m[1].split(',')) {
        const classes = subjectClasses(sel)
        if (classes.length) {
          rules.push({ classes, kind, selector: sel.trim(), decl: m[2].trim().slice(0, 80) })
        }
      }
    }
  }
  return rules
}

const isControl = (el) =>
  el.tag === 'a' ||
  el.tag === 'button' ||
  (el.tag === 'input' && /^(submit|button|reset)$/i.test(el.attrs.type || ''))

// The unit the one-lead rule is measured in. `<section>` is the design
// system's own unit — D58's budget rule is already written per section, and
// measured against the built output it is the grouping that fits: 97.4% of
// sections already held exactly one lead before D76 was written, against 92%
// for a nearest-common-ancestor grouping.
//
// ⚠️ KNOWN COARSENESS. A control outside every `<section>` falls back to
// `<body>`, so all such controls on a page share one bucket. Today that is
// safe — no page has two section-less leads — but it is luck, not design. If
// this guard ever reports a `<body>` section with two leads that are visually
// far apart, the fix is to wrap them in real sections, not to loosen this.
const SECTIONISH = new Set(['section', 'footer', 'nav', 'header', 'main', 'body'])

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

  const painted = []     // gilt as text/fill/border — always a violation
  const crowded = []     // more than one gilt lead in one section
  let allowedHit = 0, leadCount = 0, sectionCount = 0

  for (const file of htmlFiles) {
    const route = routeOf(file)
    const root = parse(fs.readFileSync(file, 'utf8'))
    const leadsBySection = new Map()

    for (const el of findAll(root, isControl)) {
      const classes = classList(el)

      // ── 1. gilt as paint, from an inline style or a class rule ──
      let why = null
      const inline = el.attrs.style || ''
      if (GILT_VALUE.test(inline)) {
        // An inline background-image is still a swash.
        const inlineIsSwash = [...styleMap(el)].some(
          ([p, v]) => /^background(-image)?$/.test(p) && /url\(/i.test(v) && GILT_VALUE.test(v)
        )
        if (!inlineIsSwash) why = `inline style: ${inline.replace(/\s+/g, ' ').slice(0, 70)}`
      }
      if (!why) {
        for (const rule of rules) {
          if (rule.kind !== 'paint') continue
          if (rule.classes.every((c) => classes.includes(c))) {
            why = `class rule: ${rule.selector} { ${rule.decl} }`
            break
          }
        }
      }
      if (why) {
        if (ALLOWED.some((a) => a.class && classes.includes(a.class))) allowedHit++
        else painted.push({ route, node: describe(el), why })
        continue
      }

      // ── 2. the sanctioned swash — subject to one per section ──
      const isLead =
        !classes.includes(FORK_CLASS) &&
        (LEAD_CLASSES.some((c) => classes.includes(c)) ||
          rules.some((r) => r.kind === 'swash' && r.classes.every((c) => classes.includes(c))))

      if (!isLead) continue
      leadCount++
      const sec = closest(el, (n) => SECTIONISH.has(n.tag)) || root
      if (!leadsBySection.has(sec)) leadsBySection.set(sec, [])
      leadsBySection.get(sec).push(el)
    }

    for (const [, members] of leadsBySection) {
      sectionCount++
      if (members.length > 1) {
        crowded.push({
          route,
          labels: members.map((m) => (text(m) || describe(m)).slice(0, 28)),
        })
      }
    }
  }

  if (painted.length === 0 && crowded.length === 0) {
    console.log(
      `✓ gilt escrow (build): ${htmlFiles.length} pages parsed, ` +
        `${rules.length} gilt rule(s) resolved from CSS; ` +
        `${leadCount} gilt lead(s) across ${sectionCount} section(s), never more than one` +
        (allowedHit ? ` (${allowedHit} allowlisted)` : '') + `.`
    )
    return 0
  }

  if (painted.length) {
    const grouped = new Map()
    for (const v of painted) {
      const key = `${v.node}|${v.why}`
      if (!grouped.has(key)) grouped.set(key, { ...v, routes: [] })
      grouped.get(key).routes.push(v.route)
    }
    console.error(
      `\n✖ gilt escrow (build): ${grouped.size} rendered control(s) paint gilt as ` +
        `text, fill or border, across ${new Set(painted.map((v) => v.route)).size} route(s).\n\n` +
        `  Gold is never paint on a control (D76). It failed contrast every time it\n` +
        `  was: #F5C842 is 1.59:1 on white, and .btn-do-charter shipped #C49400 at\n` +
        `  2.56:1 on Whisper for five months. Gilt rides UNDER the label as a swash.\n`
    )
    for (const g of grouped.values()) {
      console.error(`    ${g.node}  — ${g.routes.length} route(s), e.g. ${g.routes[0]}`)
      console.error(`        ${g.why}\n`)
    }
  }

  if (crowded.length) {
    console.error(
      `\n✖ gilt escrow (build): ${crowded.length} section(s) contain more than one ` +
        `gilt lead.\n\n` +
        `  A section has one conversion moment, so it has one lead (D76), and D58's\n` +
        `  budget rule already allows it one drawn device. Two gilt swashes in a\n` +
        `  section means the page has not decided which control it wants pressed.\n`
    )
    for (const c of crowded.slice(0, 12)) {
      console.error(`    ${c.route}`)
      console.error(`        ${c.labels.join('   |   ')}\n`)
    }
    console.error(
      `  Fix — demote all but one to \`btn btn-do\` (secondary), OR, if the two are\n` +
        `  genuinely co-equal and the section is a FORK rather than a close (the\n` +
        `  age-band chooser is the real case), add \`${FORK_CLASS}\` to both. A fork\n` +
        `  has no lead, so it takes no gilt.\n`
    )
  }
  return 1
}

process.exit(BUILD ? buildPass() : sourcePass())
