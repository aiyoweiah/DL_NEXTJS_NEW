#!/usr/bin/env node
// scripts/check-label-variant.mjs
//
// Build guard (D94): every `<Label>` names a variant the component defines.
//
// WHY A GUARD AND NOT JUST A THROW
//
// Label's runtime check is dev-only, on purpose. Footer.jsx is a server
// component, so a bad variant there fails the build — the right outcome.
// Navbar.jsx is 'use client', and a variant reachable only after hydration
// would build clean and then blank the site's primary navigation in
// production. A render throw is excellent where it fires at build time and
// dangerous where it does not.
//
// This reads source instead, so it sees every call site whether or not a
// render path reaches it. Same technique as check-gilt-escrow and
// check-tokens, which already scan JSX props.
//
// WHAT IT CANNOT DO, STATED PLAINLY
//
// A computed variant — `variant={x}` — cannot be resolved statically, so it
// is REPORTED rather than silently passed. There are none today; if one
// appears, the report says so and someone decides whether it is worth the
// hole. Failing on it would be wrong (it may well be correct code); ignoring
// it would be the unguarded-claim mistake this repo keeps relearning.
//
// Run directly:  node scripts/check-label-variant.mjs

import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DIRS = ['components', 'app']
const SKIP = /(^|[\\/])(node_modules|\.next|out)([\\/]|$)/

// The one source of truth is the component itself — parsing it means this
// guard cannot drift from the variants that actually exist.
const COMPONENT = path.join(ROOT, 'components/ui/Label.jsx')
const src = fs.readFileSync(COMPONENT, 'utf8')
// VARIANT_CLASS is the map from variant name to its full literal class name.
// It has to hold literal strings — Tailwind purges a custom `@layer utilities`
// rule whose class name never appears verbatim in source, which shipped every
// label unstyled once already. Parsing it here means this guard cannot drift
// from the variants that actually exist.
const declared = src.match(/const VARIANT_CLASS = \{([^}]*)\}/)
if (!declared) {
  console.error('✖ check-label-variant: cannot find VARIANT_CLASS in components/ui/Label.jsx.')
  process.exit(1)
}
const VALID = declared[1].split(',').map((s) => s.split(':')[0].trim()).filter(Boolean)

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (SKIP.test(p)) continue
    if (e.isDirectory()) walk(p, out)
    else if (/\.(jsx?|tsx?)$/.test(e.name)) out.push(p)
  }
  return out
}

const bad = []
const computed = []
let sites = 0

for (const f of DIRS.flatMap((d) => walk(path.join(ROOT, d)))) {
  if (path.resolve(f) === path.resolve(COMPONENT)) continue
  const text = fs.readFileSync(f, 'utf8')
  const rel = path.relative(ROOT, f).split(path.sep).join('/')

  for (const m of text.matchAll(/<Label(\s[^>]*?)?\/?>/g)) {
    sites++
    const attrs = m[1] || ''
    const line = text.slice(0, m.index).split('\n').length
    const lit = attrs.match(/\bvariant\s*=\s*["']([^"']*)["']/)
    const expr = attrs.match(/\bvariant\s*=\s*\{/)

    if (lit) {
      if (!VALID.includes(lit[1])) bad.push({ rel, line, got: lit[1] })
    } else if (expr) {
      computed.push({ rel, line })
    } else {
      bad.push({ rel, line, got: '(missing)' })
    }
  }
}

if (bad.length) {
  console.error(`\n✖ label variant: ${bad.length} call site(s) name a variant Label does not define.\n`)
  for (const b of bad) console.error(`    ${b.rel}:${b.line}   variant="${b.got}"`)
  console.error(`
  Valid: ${VALID.join(' | ')}

  Label's own runtime check is dev-only — it cannot catch a call site that
  only renders after hydration, which on Navbar.jsx would mean a blank
  navigation in production rather than a failed build. That is what this
  reads source for.

  If the job genuinely is not one of the three, it probably is not a chrome
  label: a section label is <Eyebrow> (D57) and a set of taxonomy values is
  <TagRun> (D70). Adding a fourth variant is a design decision — log it.
`)
  process.exit(1)
}

const note = computed.length
  ? `  ⚠ ${computed.length} computed variant(s) — not statically checkable:\n` +
    computed.map((c) => `      ${c.rel}:${c.line}`).join('\n') + '\n'
  : ''
console.log(`✓ label variant: ${sites} <Label> site(s), all naming one of ${VALID.join(' | ')}.`)
if (note) console.log(note)
