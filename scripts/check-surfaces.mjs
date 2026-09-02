// scripts/check-surfaces.mjs
//
// THE GUARD (D60), now in two passes (D73).
//
// Extraction alone does not hold. D57 consolidated nine private `Eyebrow`
// copies into one component; by then the *surfaces* had already drifted in
// parallel, and nobody noticed for months. Cleanups expire. A guard does
// not.
//
// The failure mode is human and reasonable: a developer reaches for an
// inline style because it is faster than finding the primitive. This makes
// the fast path the correct one by failing the build on NEW drift.
//
// It is a RATCHET, not a ban. The panels already in the tree are recorded
// in the baselines and tolerated, so this does not block today's build.
// Counts may go down freely — never up. Migrate a page, re-run with
// --update, commit the smaller baseline.
//
//   npm run check:surfaces                     source pass (runs on prebuild)
//   npm run check:surfaces -- --update         re-record after migrating a page
//   npm run check:surfaces -- --build          build pass (runs on postbuild)
//   npm run check:surfaces -- --build --update re-record the build baseline
//
// A "panel" is one element carrying BOTH an inline background and an
// inline border. Section bands (a <section> with a background and no
// border) are legitimate page-level surfaces and are deliberately NOT
// counted — there were 56 of those, and they are not what drifted.
//
// ── WHY TWO PASSES (D73) ─────────────────────────────────────────────
//
// The source pass answers "which FILE do I edit"; it cannot see what a page
// actually renders. The architecture-cohesion retrospective
// (docs/architecture-cohesion-proposal.md §2B) names that as one of the two
// root causes behind nine consecutive defects: client-rendered markup and
// dependency-shipped markup never appear in source in a form a scanner
// recognises, and every guard that has actually caught something —
// check-cjk-coverage --build, check-font-preload — reads the built output.
//
// So both run, on the model check-cjk-coverage already set: source on
// prebuild for fast, file-attributed feedback; built output on postbuild for
// the truth. The build pass PARSES the HTML (scripts/html-parse.mjs) rather
// than matching it with a regex — D71's miss was a regex that assumed text
// was a direct child, and it reported a completed sweep that was not.
//
// The two counts do not correspond and are not meant to: one panel authored
// in a shared component is one source hit and one build hit per route that
// renders it. They are separate ratchets over separate baselines.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { parse, findAll, styleMap, describe } from './html-parse.mjs'

const ROOTS = ['app', 'components']
const BASELINE = 'scripts/surface-baseline.json'
const BUILD_BASELINE = 'scripts/surface-build-baseline.json'
const OUT = 'out'

const BUILD = process.argv.includes('--build')
const UPDATE = process.argv.includes('--update')

// ── Source pass ──────────────────────────────────────────────────────

// ── MATCH ON STRUCTURE, NEVER ON VALUES (D87) ────────────────────────
//
// This detector used to enumerate the background colours a panel might use:
// `#ffffff|#fff|rgba(183,181,254…)|#2E3848|#1C2330|#212830`. That coupling
// failed twice over.
//
// It went BLIND. The D86 tokenisation rewrote `backgroundColor: '#2E3848'` to
// `var(--color-midnight)` and this guard reported **24 panels → 5** — not
// nineteen migrations, nineteen disappearances. The build pass, which asks
// whether the PROPERTIES are set rather than what they are set to, held at 737
// and never flinched. That contrast is the whole lesson.
//
// It was also WRONG the entire time. Measured structurally, there are **41**
// hand-rolled panels, not 24. Seventeen had never matched the list, so the
// ratchet had been guarding a number that was itself too low since D60.
//
// A ratchet that goes green when you rename a value is worse than no ratchet: it
// reports progress for a spelling change, and `--update` then locks the lie into
// the baseline. So there is no list any more.
//
// A "panel" is an element with an inline background AND an inline FULL border —
// enclosed on all sides. A section band (background, no border) is a legitimate
// page-level surface and is still deliberately not counted; nor is a band with
// only a `borderBottom`, which is a rule, not an enclosure.
const HAS_BG = /\bbackgroundColor\s*:/
const HAS_FULL_BORDER = /\bborder\s*:\s*'(?!none|0)/

/** Count style={{…}} blocks that set both. Brace-matched, not regexed — a value
 *  can contain braces via a template literal, and D71 lost to that assumption. */
function countPanels(src) {
  let n = 0, i = 0
  for (;;) {
    i = src.indexOf('style={{', i)
    if (i < 0) return n
    let depth = 0, j = i + 6
    const start = j
    for (; j < src.length; j++) {
      const c = src[j]
      if (c === '{') depth++
      else if (c === '}') { depth--; if (depth === 0) break }
    }
    const block = src.slice(start, j + 1)
    i = j + 1
    if (HAS_BG.test(block) && HAS_FULL_BORDER.test(block)) n++
  }
}

/**
 * The moment a ratchet lies is the moment you BANK the lie (D87).
 *
 * A detector that stops matching looks exactly like a successful migration: the
 * count falls, `--update` records it, and the smaller number becomes the thing
 * future runs are measured against. D86 dropped 24 → 5 that way and was caught
 * only because 79% was too big to believe.
 *
 * So a large drop now has to be stated rather than assumed. This is not a
 * ceiling on real work — it is a prompt to say which it was.
 */
const FORCE = process.argv.includes('--force')
function implausibleDrop(prev, next, noun) {
  if (prev === null || FORCE) return false
  if (next >= prev * 0.7 || prev - next < 8) return false
  console.error(
    `\n✖ refusing to bank ${prev} → ${next} ${noun} without --force.\n\n` +
      `  That is a ${Math.round((1 - next / prev) * 100)}% drop. Two things look identical here:\n` +
      `  a real migration, and a detector that stopped matching. D86 was the second\n` +
      `  kind — a rename made 19 panels invisible and the count fell to 5.\n\n` +
      `  Check the detector still sees what it used to, then re-run with --force and\n` +
      `  say in the commit which it was.\n`
  )
  return true
}

function walk(dir, out = [], test = /\.(jsx|tsx)$/) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out, test)
    else if (test.test(name)) out.push(p)
  }
  return out
}

function sourcePass() {
  const counts = {}
  for (const root of ROOTS) {
    for (const file of walk(root)) {
      const n = countPanels(readFileSync(file, 'utf8'))
      if (n > 0) counts[relative('.', file).split(sep).join('/')] = n
    }
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  if (UPDATE) {
    const prev = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')).total : null
    if (implausibleDrop(prev, total, 'panels')) return 1
    writeFileSync(BASELINE, JSON.stringify({ total, counts }, null, 2) + '\n')
    console.log(`surface baseline updated — ${total} hand-rolled panels across ${Object.keys(counts).length} files`)
    return 0
  }

  let base
  try {
    base = JSON.parse(readFileSync(BASELINE, 'utf8'))
  } catch {
    console.error(`✖ ${BASELINE} missing. Run: npm run check:surfaces -- --update`)
    return 1
  }

  const regressions = []
  for (const [file, n] of Object.entries(counts)) {
    const was = base.counts[file] ?? 0
    if (n > was) regressions.push(`  ${file}  ${was} → ${n}`)
  }

  if (regressions.length) {
    console.error('\n✖ New hand-rolled surfaces detected.\n')
    console.error(regressions.join('\n'))
    console.error(`
  A panel is a background + a border. Use the primitive instead:

      import Surface from '@/components/ui/Surface'
      <Surface>…</Surface>                      white card
      <Surface variant="tinted">…</Surface>     lavender panel
      <Surface variant="panel">…</Surface>      dark panel (adds .on-dark)

  This is why a class-level refresh reached some pages and not others:
  a hand-rolled panel cannot receive one. See system.md, D60.

  If this is genuinely not a panel (a pill, a chip, a section band),
  it should not carry both an inline background and an inline border —
  or record it deliberately with --update and say why in the commit.
`)
    return 1
  }

  if (total < base.total) {
    console.log(`✓ surfaces (source): ${total} hand-rolled panels (down from ${base.total}) — run with --update to lock it in`)
  } else {
    console.log(`✓ surfaces (source): ${total} hand-rolled panels, no new drift`)
  }
  return 0
}

// ── Build pass ───────────────────────────────────────────────────────

// An inline background AND an inline border, on one element. Both must be
// inline — a border arriving from a utility class is the system working, not
// drift.
//
// This is DELIBERATELY WIDER than the source rule above, which matches only a
// fixed list of brand hexes. Narrowing it to those hexes would rebuild the exact
// blind spot the retrospective is about: a rule that matches one spelling of one
// shape. So this pass counts every inline bg+border element — chrome bands and
// hand-rolled panels alike — and the number is a ratchet, not an inventory of
// panels. Do not quote it as one.
const hasBackground = (sm) => sm.has('background-color') || sm.has('background')
const hasBorder = (sm) => {
  for (const [prop, value] of sm) {
    if (!/^border(-(top|right|bottom|left))?$/.test(prop)) continue
    if (/^(none|0(px)?|initial|unset)$/i.test(value.trim())) continue
    return true
  }
  return false
}

const routeOf = (file) =>
  '/' + file.split(sep).join('/')
    .replace(new RegExp(`^${OUT}/`), '')
    .replace(/\/?index\.html$/, '')
    .replace(/\.html$/, '')

function buildPass() {
  if (!existsSync(OUT)) {
    console.log('· surfaces (build): no out/ directory — skipping.')
    return 0
  }

  const routes = {}
  const samples = new Map()
  for (const file of walk(OUT, [], /\.html$/)) {
    const root = parse(readFileSync(file, 'utf8'))
    const panels = findAll(root, (el) => {
      const sm = styleMap(el)
      return sm.size > 0 && hasBackground(sm) && hasBorder(sm)
    })
    if (!panels.length) continue
    const route = routeOf(file)
    routes[route] = panels.length
    samples.set(route, panels.slice(0, 4).map((el) => `${describe(el)} line ${el.line}`))
  }

  const total = Object.values(routes).reduce((a, b) => a + b, 0)

  if (UPDATE) {
    writeFileSync(BUILD_BASELINE, JSON.stringify({ total, routes }, null, 2) + '\n')
    console.log(`surface build baseline updated — ${total} inline bg+border elements across ${Object.keys(routes).length} routes`)
    return 0
  }

  let base
  try {
    base = JSON.parse(readFileSync(BUILD_BASELINE, 'utf8'))
  } catch {
    console.error(`✖ ${BUILD_BASELINE} missing. Run: npm run check:surfaces -- --build --update`)
    return 1
  }

  const regressions = []
  for (const [route, n] of Object.entries(routes)) {
    const was = base.routes[route] ?? 0
    if (n > was) regressions.push({ route, was, now: n })
  }

  if (regressions.length) {
    console.error(`\n✖ New hand-rolled surfaces in the BUILT OUTPUT.\n`)
    for (const r of regressions) {
      console.error(`  ${r.route}  ${r.was} → ${r.now}`)
      for (const s of samples.get(r.route) ?? []) console.error(`      ${s}`)
    }
    console.error(`
  This pass reads out/, so unlike the source pass it also sees panels rendered
  by client-only components and by dependencies. A route can regress here while
  the source pass stays green — that is the point of it (see D73).

  Use the primitive:

      import Surface from '@/components/ui/Surface'
      <Surface>…</Surface> / variant="tinted" / variant="panel"

  If the growth is deliberate, re-record it:

      npm run check:surfaces -- --build --update
`)
    return 1
  }

  if (total < base.total) {
    console.log(`✓ surfaces (build): ${total} inline bg+border elements across ${Object.keys(routes).length} routes (down from ${base.total}) — run with --build --update to lock it in`)
  } else {
    console.log(`✓ surfaces (build): ${total} inline bg+border elements across ${Object.keys(routes).length} routes, no new drift`)
  }
  return 0
}

process.exit(BUILD ? buildPass() : sourcePass())
