#!/usr/bin/env node
// scripts/check-inline-style.mjs
//
// THE INLINE-STYLE RATCHET — architecture-cohesion-proposal.md §3.3 (D78).
//
// The proposal calls this "the only item that reduces the SUPPLY of future
// bugs rather than detecting them after the fact", and the reason is in §1:
// every one of the nine defects in the D63–D72 run lived in an inline style.
//
//   D65  six gilt CTAs      style={{ backgroundColor: '#F5C842' }}
//   D69  four hero eyebrows a <div> pill with an inline dot
//   D70  six label pills     border-radius written by hand
//   D71  six nested pills    text one level below the rounded element
//   D72  /credentials        six colour tokens that were never defined
//
// Every sweep that missed them matched one spelling of one shape in a class
// name. Anything inline is unreachable by a class-based sweep, unreadable by
// a guard, and invisible to a token rename. This makes the count go one way.
//
// It is a RATCHET, not a ban — the same contract as check-surfaces. What is
// in the tree today is recorded and tolerated, so this does not block the
// build. Counts may fall freely, never rise. Migrate something, re-run with
// --update, commit the smaller baseline.
//
//   npm run check:inline                      source pass (prebuild)
//   npm run check:inline -- --update          re-record after migrating
//   npm run check:inline -- --build           build pass (postbuild)
//   npm run check:inline -- --build --update  re-record the build baseline
//
// ── WHAT COUNTS ──────────────────────────────────────────────────────
//
// Only inline declarations that set COLOUR or TYPOGRAPHY — the two things
// this design system expresses as tokens and components, and therefore the
// two that drift when written by hand. Layout written inline (position,
// width, padding, display, gap) is NOT counted: the system does not define
// those centrally, so an inline value is not a bypass of anything.
//
// This deliberately overlaps check-surfaces, which counts elements carrying
// BOTH an inline background and an inline border. That guard asks "is this a
// hand-rolled panel"; this one asks "is a colour or a typeface being set by
// hand". Same as the note in check-surfaces: the two counts do not
// correspond and are not meant to.
//
// ── WHY TWO PASSES ───────────────────────────────────────────────────
//
// Source answers "which file do I edit" and is the number a migration moves.
// Build answers "what actually rendered" and catches client-only components
// the source pass reads but cannot prove. One block authored in a shared
// component is one source hit and one build hit PER ROUTE that renders it,
// so the two numbers differ by an order of magnitude by construction. They
// are separate ratchets over separate baselines.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { parse, walk, styleMap } from './html-parse.mjs'

const ROOTS = ['app', 'components']
const BASELINE = 'scripts/inline-style-baseline.json'
const BUILD_BASELINE = 'scripts/inline-style-build-baseline.json'
const OUT = 'out'

const UPDATE = process.argv.includes('--update')
const BUILD = process.argv.includes('--build')

// `/ops` is internal admin tooling, not the public design system — the same
// exclusion every other guard here makes.
const SKIP = /(^|[\\/])(node_modules|\.next|out|ops)([\\/]|$)/

// JSX spellings (camelCase) and CSS spellings (kebab-case) of the same set.
const PROPS_JSX = [
  'color', 'backgroundColor', 'background', 'borderColor', 'borderTopColor',
  'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'outlineColor',
  'fill', 'stroke',
  'fontSize', 'fontWeight', 'fontFamily', 'fontStyle', 'letterSpacing',
  'lineHeight', 'textTransform',
]
const PROPS_CSS = new Set(PROPS_JSX.map((p) => p.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())))

const JSX_PROP_RE = new RegExp('\\b(' + PROPS_JSX.join('|') + ')\\s*:')

/**
 * Every `style={{ … }}` block in a source file, brace-matched rather than
 * regexed — a colour can contain braces via a template literal, and D71's
 * miss was a regex that assumed structure it had not checked.
 */
function styleBlocks(src) {
  const out = []
  let i = 0
  for (;;) {
    i = src.indexOf('style={{', i)
    if (i === -1) break
    const start = i + 6            // the first '{' of the object literal
    let depth = 0, j = start
    for (; j < src.length; j++) {
      const c = src[j]
      if (c === '{') depth++
      else if (c === '}') { depth--; if (depth === 0) break }
    }
    if (j >= src.length) break     // unbalanced; stop rather than guess
    out.push({ block: src.slice(start, j + 1), line: src.slice(0, i).split('\n').length })
    i = j + 1
  }
  return out
}

function walkFiles(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (SKIP.test(p)) continue
    if (e.isDirectory()) walkFiles(p, out)
    else if (/\.(jsx|tsx)$/.test(e.name)) out.push(p)
  }
  return out
}

const readBaseline = (file) =>
  existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : null

/** Compare current counts against a baseline; report only INCREASES. */
function ratchet({ counts, total, baseline, keyName, file, label, fixHint }) {
  if (UPDATE || !baseline) {
    const sorted = Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)))
    writeFileSync(file, JSON.stringify({ total, [keyName]: sorted }, null, 2) + '\n')
    console.log(
      (baseline ? '✎ ' : '✚ ') + `inline style (${label}): baseline ` +
      (baseline ? `${baseline.total} → ${total}` : `recorded at ${total}`) + ` in ${file}`
    )
    return 0
  }

  const risen = []
  for (const [k, n] of Object.entries(counts)) {
    const was = baseline[keyName]?.[k] ?? 0
    if (n > was) risen.push({ k, was, now: n })
  }

  if (!risen.length && total <= baseline.total) {
    const moved = baseline.total - total
    console.log(
      `✓ inline style (${label}): ${total} inline colour/type declaration(s)` +
      (moved > 0 ? `, ${moved} fewer than baseline — run with --update to bank it` : ', no new drift')
    )
    return 0
  }

  console.error(
    `\n✖ inline style (${label}): the ratchet went the wrong way.\n\n` +
    `  total ${baseline.total} → ${total}\n`
  )
  for (const r of risen.slice(0, 20)) {
    console.error(`    ${r.k}   ${r.was} → ${r.now}`)
  }
  if (risen.length > 20) console.error(`    …and ${risen.length - 20} more`)
  console.error(
    `\n  Every defect in the D63–D72 run lived in an inline style, because\n` +
    `  anything inline is invisible to a class-based sweep and to a token\n` +
    `  rename. ${fixHint}\n\n` +
    `  If the increase is genuinely correct — a new page, a value the system\n` +
    `  does not define — re-record it deliberately:\n\n` +
    `      npm run check:inline${BUILD ? ' -- --build --update' : ' -- --update'}\n\n` +
    `  and say why in the commit. A baseline bumped without a reason is how a\n` +
    `  ratchet becomes a formality.\n`
  )
  return 1
}

// ── Source pass ──────────────────────────────────────────────────────

function sourcePass() {
  const counts = {}
  let total = 0

  for (const file of ROOTS.flatMap((r) => walkFiles(r))) {
    const rel = relative(process.cwd(), file).split(sep).join('/')
    const src = readFileSync(file, 'utf8')
    let n = 0
    for (const { block } of styleBlocks(src)) {
      if (JSX_PROP_RE.test(block)) n++
    }
    if (n) { counts[rel] = n; total += n }
  }

  return ratchet({
    counts, total, baseline: readBaseline(BASELINE), keyName: 'counts',
    file: BASELINE, label: 'source',
    fixHint: 'Reach for a token or a component instead — the fast path should be the correct one.',
  })
}

// ── Build pass ───────────────────────────────────────────────────────

function buildPass() {
  if (!existsSync(OUT)) {
    console.log('· inline style (build): no out/ directory — skipping.')
    return 0
  }

  const files = []
  ;(function w(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name)
      if (e.isDirectory()) w(p)
      else if (e.name === 'index.html') files.push(p)
    }
  })(OUT)

  const counts = {}
  let total = 0

  for (const f of files) {
    const route = '/' + relative(OUT, f.replace(/[\\/]index\.html$/, '')).split(sep).join('/')
    if (/^\/?ops(\/|$)/.test(route.replace(/^\//, '/'))) continue
    const root = parse(readFileSync(f, 'utf8'))
    let n = 0
    walk(root, (el) => {
      if (!el.attrs.style) return
      for (const k of styleMap(el).keys()) {
        if (PROPS_CSS.has(k)) { n++; return }
      }
    })
    if (n) { counts[route] = n; total += n }
  }

  return ratchet({
    counts, total, baseline: readBaseline(BUILD_BASELINE), keyName: 'routes',
    file: BUILD_BASELINE, label: 'build',
    fixHint: 'A rise here with no rise in source means a client-only component grew one.',
  })
}

process.exit(BUILD ? buildPass() : sourcePass())
