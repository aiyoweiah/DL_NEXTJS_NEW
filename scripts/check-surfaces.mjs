// scripts/check-surfaces.mjs
//
// THE GUARD (D60).
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
// It is a RATCHET, not a ban. The 31 panels already in the tree are
// recorded in surface-baseline.json and tolerated, so this does not block
// today's build. Counts may go down freely — never up. Migrate a page,
// re-run with --update, commit the smaller baseline.
//
//   npm run check:surfaces            verify (runs automatically on build)
//   npm run check:surfaces -- --update  re-record after migrating a page
//
// A "panel" is one element carrying BOTH an inline background and an
// inline border. Section bands (a <section> with a background and no
// border) are legitimate page-level surfaces and are deliberately NOT
// counted — there were 56 of those, and they are not what drifted.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const ROOTS = ['app', 'components']
const BASELINE = 'scripts/surface-baseline.json'

const PANEL = new RegExp(
  "style=\\{\\{[^}]*backgroundColor:\\s*'(?:#ffffff|#fff|rgba\\(183,181,254[^']*|#2E3848|#1C2330|#212830)'" +
  "[^}]*border:\\s*'1px solid[^}]*\\}\\}",
  'g',
)

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.(jsx|tsx)$/.test(name)) out.push(p)
  }
  return out
}

const counts = {}
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const n = (readFileSync(file, 'utf8').match(PANEL) || []).length
    if (n > 0) counts[relative('.', file).split(sep).join('/')] = n
  }
}

const total = Object.values(counts).reduce((a, b) => a + b, 0)

if (process.argv.includes('--update')) {
  writeFileSync(BASELINE, JSON.stringify({ total, counts }, null, 2) + '\n')
  console.log(`surface baseline updated — ${total} hand-rolled panels across ${Object.keys(counts).length} files`)
  process.exit(0)
}

let base
try {
  base = JSON.parse(readFileSync(BASELINE, 'utf8'))
} catch {
  console.error(`✖ ${BASELINE} missing. Run: npm run check:surfaces -- --update`)
  process.exit(1)
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
  process.exit(1)
}

if (total < base.total) {
  console.log(`✓ surfaces: ${total} hand-rolled panels (down from ${base.total}) — run with --update to lock it in`)
} else {
  console.log(`✓ surfaces: ${total} hand-rolled panels, no new drift`)
}
