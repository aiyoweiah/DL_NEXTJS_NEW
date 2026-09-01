#!/usr/bin/env node
// scripts/check-tokens.mjs
//
// Build guard: every `var(--x)` must resolve — or carry a fallback (D73).
//
// WHY THIS EXISTS
//
// `app/[locale]/credentials/page.jsx` was authored against six custom
// properties this system never defined: --ink, --ink-deep, --ink-soft,
// --accent-lavender, --accent-lavender-deep, --divider. Every colour on that
// page inherited instead of resolving, and IT SHIPPED THAT WAY. Nobody caught
// it for as long as the page has existed.
//
// That is not carelessness, it is the language. CSS fails silently by design:
// an unresolvable `var()` makes the declaration invalid at computed-value time
// and the property falls back to its inherited or initial value. The page still
// renders. It just renders in the wrong colours, plausibly enough that a human
// scanning it does not flinch. Without a check, a typo'd token and a working
// token are indistinguishable.
//
// It is also what makes token RENAMES unsafe: rename `--text-muted` and every
// missed call site goes quiet rather than loud. This guard is what makes that
// refactor a normal one.
//
// ── THE DISTINCTION IT MUST MAKE ─────────────────────────────────────
//
//   var(--z-nav, 100)               fine — has a fallback
//   var(--color-border, #2E3848)    fine — has a fallback
//   var(--ink)                      a bug, if --ink is defined nowhere
//
// A fallback is an author saying "I know this may not resolve." Only bare
// references are claims that something exists.
//
// ── TWO PASSES ───────────────────────────────────────────────────────
//
//   node scripts/check-tokens.mjs            source pass  (prebuild)
//   node scripts/check-tokens.mjs --build    build pass   (postbuild)
//
// The source pass names the file and line, which is what you want while
// editing. The build pass reads what was actually emitted — CSS, parsed HTML
// inline styles, and the client JS chunks — so it also covers tokens used only
// by client-rendered components, which never reach the prerendered HTML. Both
// are needed for the same reason check-cjk-coverage needs both
// (docs/architecture-cohesion-proposal.md §2B).

import fs from 'node:fs'
import path from 'node:path'
import { parse, walk, styleMap } from './html-parse.mjs'

const ROOT = process.cwd()
const OUT = path.join(ROOT, 'out')
const BUILD = process.argv.includes('--build')

const SOURCE_DIRS = ['app', 'components', 'lib', 'styles']
const SOURCE_FILES = ['tailwind.config.ts']
const SKIP = /(^|[\\/])(node_modules|\.next|out)([\\/]|$)/

// A bare reference: `var(--x)` with nothing after the name but the paren.
// The capture group tells the two cases apart in one pass.
const VAR_REF = /var\(\s*(--[A-Za-z0-9_-]+)\s*([,)])/g

// A definition, in CSS: `--x: value`.
const CSS_DEF = /(--[A-Za-z0-9_-]+)\s*:/g

// A definition, in JS/TS: React inline styles write custom properties as object
// keys — `style={{ '--x': v }}` — and next/font declares its own via
// `variable: '--font-x'`. Both are real definitions and must count, or the
// guard reports the font tokens as undefined on every run.
const JS_DEF = /['"](--[A-Za-z0-9_-]+)['"]\s*:|variable:\s*['"](--[A-Za-z0-9_-]+)['"]/g

// ── Known exceptions ─────────────────────────────────────────────────
// Same discipline as the gilt escrow: a reason and the condition that retires
// it. A token listed here is one we assert resolves at runtime by a route this
// guard cannot see — not one we have decided to stop caring about.
const ALLOWED = [
  // EMPTY, and that is the point. If something lands here, say why the
  // definition is invisible to both passes, not merely that the build is red.
]

const allowed = new Set(ALLOWED.map((a) => a.token))

// Vendor namespaces — properties we do not author and cannot define.
//
//   --tw-*     Tailwind internals (`--tw-gradient-stops`, `--tw-ring-*`),
//              declared by Tailwind's own preflight in the universal
//              `*, ::before, ::after` rule, and referenced from
//              tailwind.config.ts before any of our CSS exists.
//   --next-*   Next.js internals — the error-overlay chunk carries eleven
//              `--next-error-*` references and injects their definitions from
//              inside its own component at runtime.
//
// These are NAMESPACE exemptions, not allowlist entries: a typo in one of these
// is the framework's bug shape, not ours. Everything in our own namespace stays
// checked, which is the whole point of the guard.
const VENDOR = /^--(tw|next)-/

// `skip` defaults to the source-tree exclusions. The build pass passes null:
// SKIP names `out/`, which is the very directory it needs to walk.
function walkDir(dir, test, { skip = SKIP } = {}, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (skip && skip.test(p)) continue
    if (e.isDirectory()) walkDir(p, test, { skip }, out)
    else if (test.test(e.name)) out.push(p)
  }
  return out
}

const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/')
const lineOf = (text, index) => text.slice(0, index).split('\n').length

/** Collect definitions and bare references out of one blob of text. */
function collect(text, { defs, refs, defRe, where }) {
  for (const m of text.matchAll(defRe)) {
    const name = m[1] ?? m[2]
    if (name) defs.add(name)
  }
  for (const m of text.matchAll(VAR_REF)) {
    if (m[2] === ',') continue // has a fallback — deliberate, and fine
    if (!refs.has(m[1])) refs.set(m[1], [])
    refs.get(m[1]).push(where(m.index))
  }
}

function report(label, defs, refs, hint) {
  const undefined_ = [...refs.entries()]
    .filter(([name]) => !defs.has(name) && !allowed.has(name) && !VENDOR.test(name))
    .sort((a, b) => b[1].length - a[1].length)

  if (!undefined_.length) {
    console.log(`✓ tokens (${label}): ${refs.size} bare var() reference(s), all resolve (${defs.size} defined)`)
    return 0
  }

  console.error(`\n✖ tokens (${label}): ${undefined_.length} custom propert(ies) referenced without a definition.\n`)
  for (const [name, sites] of undefined_) {
    console.error(`    ${name}  — ${sites.length} reference(s)`)
    for (const s of sites.slice(0, 4)) console.error(`        ${s}`)
    if (sites.length > 4) console.error(`        …and ${sites.length - 4} more`)
    console.error('')
  }
  console.error(hint)
  return 1
}

const HINT = `  CSS fails silently here: an unresolvable var() does not error, it makes the
  declaration invalid and the property inherits. The page renders in the wrong
  colours and looks fine. That is how /credentials shipped with six undefined
  tokens (D72).

  Fix — one of:
    · define the token in styles/globals.css, next to the ones it sits with;
    · point the reference at the canonical token that already exists;
    · give it an explicit fallback — var(--x, #2E3848) — if it is genuinely
      optional, which is what --z-nav and --color-border do.

  Do not add it to ALLOWED unless the definition is real but invisible to both
  passes, and say why.
`

// ── Source pass ──────────────────────────────────────────────────────

function sourcePass() {
  const defs = new Set()
  const refs = new Map()

  const cssFiles = SOURCE_DIRS.flatMap((d) => walkDir(path.join(ROOT, d), /\.css$/))
  for (const f of cssFiles) {
    const text = fs.readFileSync(f, 'utf8')
    collect(text, { defs, refs, defRe: CSS_DEF, where: (i) => `${rel(f)}:${lineOf(text, i)}` })
  }

  const jsFiles = [
    ...SOURCE_DIRS.flatMap((d) => walkDir(path.join(ROOT, d), /\.(jsx?|tsx?|mjs)$/)),
    ...SOURCE_FILES.map((f) => path.join(ROOT, f)).filter((f) => fs.existsSync(f)),
  ]
  for (const f of jsFiles) {
    const text = fs.readFileSync(f, 'utf8')
    collect(text, { defs, refs, defRe: JS_DEF, where: (i) => `${rel(f)}:${lineOf(text, i)}` })
  }

  return report('source', defs, refs, HINT)
}

// ── Build pass ───────────────────────────────────────────────────────

function buildPass() {
  if (!fs.existsSync(OUT)) {
    console.log('· tokens (build): no out/ directory — skipping.')
    return 0
  }

  const defs = new Set()
  const refs = new Map()

  // Emitted CSS — where the great majority of both live.
  for (const f of walkDir(path.join(OUT, '_next', 'static'), /\.css$/, { skip: null })) {
    const text = fs.readFileSync(f, 'utf8')
    collect(text, { defs, refs, defRe: CSS_DEF, where: () => rel(f) })
  }

  // Client chunks. A component that only renders on the client puts its inline
  // styles here and nowhere else — this is the half of the site the prerendered
  // HTML does not contain (the /ops tools, PartnersClient behind its gate).
  for (const f of walkDir(path.join(OUT, '_next', 'static'), /\.js$/, { skip: null })) {
    const text = fs.readFileSync(f, 'utf8')
    collect(text, { defs, refs, defRe: JS_DEF, where: () => rel(f) })
  }

  // Parsed pages: inline style attributes and any inlined <style> blocks.
  for (const f of walkDir(OUT, /\.html$/, { skip: null })) {
    const route = '/' + path.relative(OUT, f).split(path.sep).join('/')
      .replace(/\/?index\.html$/, '').replace(/\.html$/, '')
    const root = parse(fs.readFileSync(f, 'utf8'))
    walk(root, (el) => {
      if (el.tag === 'style') {
        const text = el.children.map((c) => c.value ?? '').join('')
        collect(text, { defs, refs, defRe: CSS_DEF, where: () => `${route} (inline <style>)` })
        return
      }
      const sm = styleMap(el)
      if (!sm.size) return
      for (const [prop, value] of sm) {
        if (prop.startsWith('--')) defs.add(prop)
        for (const m of value.matchAll(VAR_REF)) {
          if (m[2] === ',') continue
          if (!refs.has(m[1])) refs.set(m[1], [])
          refs.get(m[1]).push(`${route}:${el.line} (style="${prop}")`)
        }
      }
    })
  }

  return report('build', defs, refs, HINT)
}

process.exit(BUILD ? buildPass() : sourcePass())
