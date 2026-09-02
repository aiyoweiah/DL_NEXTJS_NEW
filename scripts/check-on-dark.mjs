#!/usr/bin/env node
// scripts/check-on-dark.mjs
//
// THE `on-dark` TRAP (D85).
//
// A control on a hand-painted dark ground must carry an `on-dark` hook, or its
// label keeps the light-ground colour and lands near-black on near-black.
//
// WHY THIS EXISTS
//
// The system's own fix message has warned about this since D53:
//
//   "⚠️ If the enclosing section paints a dark ground by hand, it also needs the
//    `on-dark` hook or the label lands near-black on near-black (D53/D65)."
//
// It warned, and then it happened anyway. `/compare` defines a LOCAL `Section`
// component that paints `backgroundColor: '#212830'` inline and never adds the
// hook, so its `.btn-do-primary` shipped a `--text-body-dark` label on Deep Void
// at **1.29:1** — on a conversion CTA, in both locales.
//
// ── WHY IT IS STRUCTURAL, AND WHY THAT MATTERS ───────────────────────
//
// This guard does NOT compute contrast. It does not need to. The failure is
// structural — a control inside an inline-dark ancestor with no hook — and that
// is decidable from the DOM alone: a class check plus an ancestor check.
//
// That distinction was learned the hard way. A probe that walks ancestors for an
// opaque `backgroundColor` to compute real contrast is unreliable here: it cannot
// see a ground painted by an overlay or a pseudo-element, so it reported false
// failures on /program and /demos, and it gave opposite answers for this very
// control depending on whether it ran against a detached DOM or the live page —
// because cascade-dependent rules like `.on-dark .btn-do` do not resolve the same
// way in an injected copy.
//
// Contrast splits into two problems. VALUE failures (a colour too faint for its
// ground) genuinely need composited pixels, which means a browser in the build —
// and the build must not acquire an install step, which is why html-parse.mjs is
// dependency-free. STRUCTURAL failures need none of that, and they are the ones
// that ship broken conversion controls. This guard covers those; value-level
// contrast is a design review, and the guide says so rather than pretending
// otherwise.
//
// ── SCOPE ────────────────────────────────────────────────────────────
//
// Controls only (`.btn-do`). `.on-dark` also governs headings and body copy, but
// those overwhelmingly set their colour inline, where the cascade cannot reach
// them — so widening this would add false positives without finding real bugs.
// Measured before choosing: controls found the one real defect on the site with
// zero false positives.
//
//   node scripts/check-on-dark.mjs --build    (runs on postbuild)

import fs from 'node:fs'
import path from 'node:path'
import { parse, walk, classList, styleMap, text, closest, describe } from './html-parse.mjs'

const OUT = path.join(process.cwd(), 'out')

// Grounds the system paints by hand. A dark ground arriving through a CLASS
// (.section-dark and friends) is not a trap — the class IS the hook.
//
// ⚠️ Token spellings are listed alongside the hex ON PURPOSE. This guard reads
// the inline style as authored, and an inline `var(--color-void-black)` does NOT
// resolve to its hex there. So the moment anyone tokenises a background — which
// is exactly what the Wave 1 migration does — a hex-only list would stop
// matching and this guard would go quietly green while the trap came back.
// That is the failure mode this whole file exists to prevent, so: both forms.
const DARK_GROUNDS = new Set([
  '#212830', '#0e0e12', '#2e3848', '#1a1a22', '#1c2330',
  'var(--color-deep-void)', 'var(--color-void-black)', 'var(--color-midnight)',
  'var(--surface-dark)', 'var(--surface-darker)', 'var(--surface-mid)',
])

// Any one of these on an ancestor supplies the dark-surface label colours.
const HOOKS = ['on-dark', 'section-dark', 'section-darker', 'section-hero-short']

function main() {
  if (!fs.existsSync(OUT)) {
    console.log('· on-dark (build): no out/ directory — skipping.')
    return 0
  }

  const files = []
  ;(function w(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name)
      if (e.isDirectory()) w(p)
      else if (e.name === 'index.html') files.push(p)
    }
  })(OUT)

  const found = new Map()
  let controls = 0

  for (const file of files) {
    const route = '/' + path.relative(OUT, path.dirname(file)).split(path.sep).join('/')
    if (/\/ops(\/|$)/.test(route)) continue
    const root = parse(fs.readFileSync(file, 'utf8'))

    walk(root, (el) => {
      if (!classList(el).includes('btn-do')) return
      controls++

      // Already hooked anywhere up the tree? Then the label is correct.
      if (closest(el, (n) => classList(n).some((c) => HOOKS.includes(c)))) return

      // Nearest ancestor painting a dark ground inline.
      const darkAncestor = closest(el, (n) => {
        const bg = (styleMap(n).get('background-color') || '').trim().toLowerCase()
        return bg !== '' && DARK_GROUNDS.has(bg)
      })
      if (!darkAncestor) return

      const lead = classList(el).includes('btn-do-primary')
      const key = [
        (text(el) || describe(el)).trim().slice(0, 30),
        (styleMap(darkAncestor).get('background-color') || '').trim(),
        lead ? 'LEAD — ink label' : 'secondary — accent label',
      ].join(' | ')
      if (!found.has(key)) found.set(key, [])
      found.get(key).push(route)
    })
  }

  if (found.size === 0) {
    console.log(
      `✓ on-dark (build): ${controls} control(s) checked, ` +
        `none on a hand-painted dark ground without the hook.`
    )
    return 0
  }

  console.error(
    `\n✖ on-dark (build): ${found.size} control(s) sit on a hand-painted dark ` +
      `ground with no \`on-dark\` hook.\n\n` +
      `  Their labels keep the LIGHT-ground colour. A \`.btn-do-primary\` label is\n` +
      `  --text-body-dark, so it lands near-black on near-black — the /compare CTA\n` +
      `  that prompted this guard measured 1.29:1.\n`
  )
  for (const [key, routes] of found) {
    console.error(`    ${key}`)
    console.error(`        ${routes.length} route(s), e.g. ${routes.slice(0, 3).join(' ')}\n`)
  }
  console.error(
    `  Fix — add the hook to whatever paints the ground:\n\n` +
      `      <section className="on-dark" style={{ backgroundColor: '#212830' }}>\n\n` +
      `  Better, if the surface is a real section: use \`SectionWrapper\`, which\n` +
      `  carries the hook already. A local Section component that paints its own\n` +
      `  background is how this one got here.\n`
  )
  return 1
}

process.exit(main())
