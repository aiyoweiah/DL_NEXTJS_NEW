#!/usr/bin/env node
// scripts/check-utility-emitted.mjs
//
// Build guard (D95): the set of custom utility classes that actually reach the
// browser may grow, but a class may not silently leave it.
//
//   npm run check:utility                 verify
//   npm run check:utility -- --update     bank a deliberate removal
//
// ─────────────────────────────────────────────────────────────────────
// THE FAILURE THIS EXISTS FOR
//
// Tailwind keeps a rule in `@layer utilities` only when the class name appears
// as a literal string in its content globs. D94's Label built its class as
// `label-${variant}`, so `.label-column`, `.label-qualifier` and `.label-pill`
// were stripped from the emitted CSS while `.label` and
// `.label-column.is-dark` survived — the first because "label" is literal in
// the file, the second because "is-dark" is.
//
// Every label on the site shipped unstyled. And:
//
//   • the build passed
//   • all fifteen guards passed
//   • `type-floor` reported a BETTER number (329 rather than 671), because the
//     11px rule it had been counting no longer existed
//
// The measurement improved *because* the styling broke.
//
// ─────────────────────────────────────────────────────────────────────
// THE FIRST VERSION OF THIS GUARD COULD NOT FIRE — READ THIS BEFORE EDITING
//
// It compared "declared in @layer utilities" against "present in emitted CSS",
// and treated a class referenced in JSX but missing from CSS as the failure.
// That condition is UNREACHABLE. Tailwind's content globs are
// `./components/**` and `./app/**` — precisely the files such a scan reads. Any
// literal the scan can see, Tailwind has already seen, so the class is kept;
// and when no literal exists the scan calls it "dead" rather than "broken".
//
// It also could not even be negative-tested honestly: removing the literals
// from Label.jsx did not purge the classes, because the COMMENT explaining the
// purge bug contains `.label-column` — and Tailwind's scanner is a plain text
// match that cannot tell a comment from code.
//
// So this checks a different thing, and one that is actually observable: the
// SET OF CLASSES THAT REACH THE BROWSER. A class leaving that set is the real
// event, whatever caused it — a built class name, a content-glob change, a
// Tailwind upgrade, a deleted rule. Same ratchet contract as check-surfaces
// and check-inline-style: it may grow freely, it may not shrink silently.

import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const OUT = path.join(ROOT, 'out')
const SRC_CSS = path.join(ROOT, 'styles/globals.css')
const BASELINE = path.join(ROOT, 'scripts/utility-emitted-baseline.json')
const UPDATE = process.argv.includes('--update')

if (!fs.existsSync(OUT)) {
  console.error('✖ utility emitted: no out/ — this guard runs on postbuild.')
  process.exit(1)
}

// ── declared in the source layer ─────────────────────────────────────
const src = fs.readFileSync(SRC_CSS, 'utf8')
const layerAt = src.indexOf('@layer utilities')
if (layerAt < 0) {
  console.error('✖ utility emitted: no @layer utilities block in styles/globals.css.')
  process.exit(1)
}
const declared = new Set()
for (const m of src.slice(layerAt).matchAll(/^\s{2}\.([a-zA-Z][\w-]*)/gm)) declared.add(m[1])

// ── what the browser actually receives ───────────────────────────────
function walkFiles(dir, re, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walkFiles(p, re, out)
    else if (re.test(e.name)) out.push(p)
  }
  return out
}
const emitted = walkFiles(path.join(OUT, '_next', 'static'), /\.css$/)
  .map((f) => fs.readFileSync(f, 'utf8'))
  .join('\n')

const shipping = [...declared].filter((n) => new RegExp('\\.' + n + '[{,:. )]').test(emitted)).sort()
const purged = [...declared].filter((n) => !shipping.includes(n)).sort()

// ── ratchet ──────────────────────────────────────────────────────────
const prev = fs.existsSync(BASELINE)
  ? JSON.parse(fs.readFileSync(BASELINE, 'utf8'))
  : { shipping: [], note: 'first run' }

const lost = prev.shipping.filter((n) => !shipping.includes(n))
const gained = shipping.filter((n) => !prev.shipping.includes(n))

if (UPDATE) {
  fs.writeFileSync(BASELINE, JSON.stringify({
    $comment: 'Custom @layer utilities classes that reach the browser. May grow freely; a loss must be banked deliberately. See the header of check-utility-emitted.mjs.',
    shipping,
    purgedButDeclared: purged,
  }, null, 2) + '\n')
  console.log(`✎ utility emitted: baseline ${prev.shipping.length} → ${shipping.length} class(es) in ${path.relative(ROOT, BASELINE)}`)
  if (lost.length) console.log(`  removed: ${lost.join(', ')}`)
  if (gained.length) console.log(`  added:   ${gained.join(', ')}`)
  process.exit(0)
}

if (lost.length) {
  console.error(`\n✖ utility emitted: ${lost.length} class(es) stopped reaching the browser.\n`)
  for (const n of lost) console.error(`    .${n}`)
  console.error(`
  Any element still carrying one of these is rendering UNSTYLED right now, and
  nothing else will tell you. The build passes, the other guards pass, and a
  measurement that had been counting the missing rule will report an
  IMPROVEMENT — that is exactly how D94 nearly shipped.

  The usual cause is a class name that is BUILT rather than written, so the
  literal never appears for Tailwind's scanner:

      className={\`label label-\${variant}\`}      ✗ purged — never literal
      className={\`label \${VARIANT_CLASS[v]}\`}    ✓ the map holds full literals

  If the removal is deliberate — the rule was deleted, or the last call site
  went — bank it and say why in the commit:

      npm run check:utility -- --update
`)
  process.exit(1)
}

console.log(`✓ utility emitted: ${shipping.length} custom utility class(es) reaching the browser, none lost${gained.length ? ` (+${gained.length} new)` : ''}.`)
if (purged.length) {
  console.log(`  note: ${purged.length} declared but never referenced, so correctly purged — ${purged.join(', ')}`)
}
