# Design Review — Site Chrome + Little DODO Visibility

Reviewed against: `.interface-design/system.md` (v6.0 funnel swap + v6.2 section-spacing protocol)
Philosophy: **Calm, editorial, credible** — Navigator-led English literacy brand for globally-mobile families. Whisper-quiet structure; color carries meaning.
Date: 2026-06-03
Pages audited: `/`, `/little-dodo`, `/program`
Tooling: Claude-in-Chrome MCP at https://dodolearning.com (live Cloudflare Pages build). Window resize did not trigger mobile CSS breakpoints in the extension, so mobile findings are derived from the code (`Navbar.jsx` mobile drawer + page components).

## Screenshots Captured

Captured via Claude-in-Chrome viewport screenshots (full-page capture not exposed by this MCP). Reference IDs from the session log; the JPEGs are inline in the conversation transcript, not on disk in this folder.

| Surface | Breakpoint | What it shows | Session ID |
| --- | --- | --- | --- |
| Home — hero | Desktop 1280 | H1, eyebrow, dual CTAs, O-glyph watermark | `ss_8713ok6fs` |
| Home — proof + PhotoIntro | Desktop 1280 | 300+/1/2×/8-10 stats + "teacher vs Navigator" photo block | `ss_248678ueg` |
| Home — Confidence + PreCtaBand + Footer | Desktop 1280 | "One grade level" / "See a real class" / footer columns | `ss_4616hr9ur`, `ss_5231ld8im` |
| `/little-dodo` — hero | Desktop 1280 | Watercolor dodo bg, "Where your child's reading begins" | `ss_12167tkhn` |
| `/program` — hero + AgeBandChooser | Desktop 1280 | 16-Week hero + "Two ways into DODO English" band | `ss_5988odc40`, `ss_8679m4gch` |
| Home — mobile attempt | (375 requested) | Window resized but layout did NOT shift to mobile — desktop nav still rendered | `ss_6516fer28`, `ss_1047nqcrv` |

## Summary

The chrome is well-disciplined: tokens are honored, the v6.0 funnel ladder is enforced consistently, and the three pages each follow the section rhythm prescribed by `system.md`. The standout problem is **discoverability of Little DODO from cold surfaces**. The K–2 program is *invisible* on the homepage and absent from the navbar (both primary and the mobile "more" list). The only entry points are the footer Program column and the `/program` age-band chooser, both of which require a scroll-and-discover from a parent who has already committed to reading the older-child framing. For a parent of a 5–8-year-old landing on the home hero, every visible signal — "English mastery at the cognitive level", "children who read above grade level, argue with evidence", "Lexile-measured", "Harvard's thinking science" — says *this is not for my child*. That is a bounce, not a funnel.

The page-level work on `/little-dodo` itself is strong (warm watercolor hero, K–2 register, page-owns-close, stat rail balanced between facts and reassurance). The `/program` AgeBandChooser is a clean hub pattern. The gap is the **top-of-funnel** layer above them.

## Findings by Category

### Visual Hierarchy — PASS with a caveat

- The home hero correctly places the H1 + dual CTAs as the most prominent element; the eyebrow chip is calibrated (small, restrained).
- The O-glyph watermark on the right is subtle (opacity 0.12) — does not fight the headline.
- **Caveat:** because the hero owns 100dvh and the next K–2-related element is in the footer ~5 sections down, the **information architecture itself buries Little DODO**. Hierarchy *within* the home page is fine; hierarchy *across the site* fails the K–2 audience.

### Consistency — PASS

- All three pages use the same token set: dark canvas `#0E0E12`, light surfaces `#F5F5FF`/`#ffffff`, dark conversion band `#212830`, accent lavender `#b7b5fe` on dark / `#7c79e8` on light.
- Eyebrow pattern (`text-xs uppercase tracking-widest`) appears on home, /program, /little-dodo with the same color rule — `#7c79e8` on light, `rgba(183,181,254,0.65)` on dark.
- Button discipline holds: `btn-charter` (gold) and `btn-outline` (lavender) on light heroes; `btn-primary` (lavender) and `btn-ghost` on dark heroes. `/little-dodo` hero correctly uses `btn-primary` + `btn-ghost` (dark surface). `/program` hero uses `btn-primary` + `btn-ghost` (also dark). Homepage uses `btn-charter` + `btn-outline` (light surface). All three pass the surface-specific outline rule from `system.md`.
- One small inconsistency: `/little-dodo` Hero uses `btn-primary` for the soft close, while the Home Hero uses `btn-charter`. This is *intentional per token rules* (gold on light, lavender on dark) but it does mean the same action wears two filled colors across the site. A first-time visitor would not register this as inconsistent — they only see one surface at a time — but it's worth naming explicitly so it stays a deliberate choice.

### Aesthetic Fidelity — PASS

- Editorial restraint: zero icons-as-decoration, no gradient sales-y badges, no big rounded shadows. The brand reads credible and calm.
- The watercolor hero illustrations on `/little-dodo` (dodo with a book at dawn) and `/program` (steamboat) are the strongest aesthetic differentiator. They feel commissioned, not stock. They are also the **only** real warmth on the site — and warmth is what a K–2 audience needs. See §"Should Fix" #2.

### Component Quality — PASS

- `AgeBandChooser` is well-isolated and reusable; the `current` prop correctly mutes the active band. This is exactly the component that should be elevated onto the home page (proposal §3).
- `PreCtaBand` SUPPRESS list is correctly populated for `/little-dodo` (one conversion moment per page).
- Footer Brand column reserves the sibling-site slot via `NEXT_PUBLIC_SHOW_CODING` — good structural foresight.

### States & Interactions — PASS

- Hover states on FooterLink, DesktopNavLink, MobileNavLink, AgeBandChooser CTA all defined and consistent.
- Mobile drawer has correct focus trap, body scroll lock, ESC handling, and an `inert` attribute when closed.
- Locale switcher inherits a separate styling pass in the footer legal strip (lavender on light); reads as intentional.

### Responsive Behavior — INCOMPLETE TEST

- The Chrome MCP does not apply CSS breakpoints on `resize_window`, so I could not visually verify mobile/tablet layouts on the live site. Code review confirms:
  - Navbar shows desktop nav from `md:768`, hamburger below — fixes the prior tablet cliff documented in `Navbar.jsx`.
  - Hero CTAs stack `flex-col sm:flex-row gap-3` — fine.
  - AgeBandChooser is `grid-cols-1 md:grid-cols-2` — stacks correctly.
- **Manual check recommended** at 375px on a real device before treating responsive as verified. Adding to "Should Fix".

### Accessibility — MOSTLY PASS

- `aria-labelledby` on every section, `aria-hidden` on decorative SVGs, `sr-only` on the lock-glyph gating label — correct.
- Focus rings defined: `focus-visible:ring-2 ring-[#b7b5fe]` with `ring-offset-2` — visible.
- Color contrast: `#7c79e8` on `#F5F5FF` measures ~4.6:1 — meets AA for normal text by a hair; OK for body but tight. Lavender `#b7b5fe` on dark `#0E0E12` ≈ 8.8:1 — comfortable.
- **One concern**: home hero subline color is `#5856cc` on `#F5F5FF` — measures ~5.7:1 — pass. But on the home hero the *trustLine* (`#3D4452` on `#F5F5FF`) is 9.2:1 — fine.
- No `prefers-reduced-motion` query observed in the chrome components. Animations are minimal (drawer translate, hamburger rotate) so impact is low — but a one-liner `@media (prefers-reduced-motion: reduce) { transition: none }` would close the gap.

### Typography — PASS

- Type ramp on the home hero is intentional (`clamp(2.25rem, 5vw + 0.5rem, 4rem)` H1, `1rem/1.85` body).
- Line lengths are constrained (`maxWidth: 42rem` on most body blocks) — within the 45–75ch guidance.
- CJK family applied via `var(--font-cjk)` consistently — Chinese sub-lines render in a different stack from the English headline, which gives the bilingual treatment its calm typographic voice.

### Dark Mode — N/A

- Site has no dark-mode toggle. The two-surface system (dark `#0E0E12` sections + light `#F5F5FF` sections) IS the design, not a theme. Tokens are CSS-variable-based, so a future toggle is structurally feasible. No work needed here today.

### Mobile-First — PASS in code

- Navbar built `md:768` upward — primary nav hidden until tablet, drawer below — that's `min-width`-style mobile-first.
- AgeBandChooser, Hero, Confidence pillars all stack first, then `md:grid-cols-*`.

## Must Fix

1. **Little DODO has no top-of-funnel surface.** A parent of a 5–8-year-old who lands on the homepage sees zero signal that DODO serves their age band, and the navbar offers no entry. The footer link is below 4 dark sections of older-child language. This is the central finding; the proposal in `ELEVATION_PROPOSAL.md` is the fix. _Fix: insert an AgeBand band on the home page between ProofStrip and PhotoIntro (Option C in the proposal) AND add `/little-dodo` to the mobile drawer "more" list AND rename the nav primary "ELA Program" → "Programs" (Options A + B + D in the proposal — they compose)._

## Should Fix

1. **Mobile drawer "more" list is missing Little DODO.** `marketing.en.js` line 60–66: `more: [Lexile Levels, The Difference, FAQ, Blog, Partners]`. Every other program-family route (`/methodology`, `/navigators`, `/results`, `/program`) is in `primary`. `/little-dodo` is in *neither*. Even before any chrome redesign, this single-line addition is a near-zero-cost win for mobile users. _Fix: prepend `{ href: '/little-dodo', label: 'Little DODO (5–8)' }` to `nav.more` in both `marketing.en.js` and `marketing.zh.js` (ZH: `都学启蒙（5–8 岁）`). Drawer order will read: Watch / Consult / 6 primary / Little DODO / Lexile / Difference / FAQ / Blog / Partners._
2. **Mobile/tablet not visually verified.** Window resize in Chrome MCP did not trigger CSS breakpoints. _Fix: do a one-pass manual check at 375/768 with DevTools device emulation before signing off. Specifically verify: (a) AgeBandChooser cards stack cleanly; (b) `/little-dodo` hero h1 (`clamp(2.25rem, 5vw + 0.5rem, 4rem)`) at 375 isn't crashing into the stat-rail; (c) mobile drawer's CTA group renders Watch above Consult per `Navbar.jsx:317-336`._
3. **`/program` hub does not signal Little DODO from its hero.** Hero copy reads "What happens in a 16-Week Program?" — singular. A parent in the K–2 audience who clicks "ELA Program" lands on a page that, above the fold, looks like it's about the 16-Week Program only; they need to scroll past the stat rail to reach the AgeBandChooser. _Fix: move the AgeBandChooser **above** the hero stat rail OR add a small eyebrow chip on the /program hero (next to "THINK ONCE. IN BOTH LANGUAGES.") that reads "Ages 5–8? See Little DODO →"._

## Could Improve

1. **`prefers-reduced-motion` query.** Add to `globals.css` or scoped to drawer/hamburger transitions. Small a11y polish.
2. **PhotoIntro photo on home is older-child framing.** A mom with a ~9-year-old daughter and an open book. If the AgeBand band is added above this section, this photo continues to anchor the 16-Week audience nicely; if not, the photo amplifies the K–2-invisibility problem. _Suggestion: keep the photo (it carries the section), but pair the proposed AgeBand band as the lead-in so the photo reads as "older-band detail" rather than "the only band."_
3. **Footer column header "Program" → "Programs".** Plural. Tiny semantic signal that there are multiple offerings. ZH: 课程 already plural-neutral.
4. **Home hero eyebrow chip** ("FOR CHILDREN WHO WILL THINK AND LEAD IN ENGLISH AT THE HIGHEST LEVELS") is explicitly older-child framing. If the AgeBand band is added below the hero, the eyebrow remains accurate as the *16-Week* eyebrow — but it does read as "this is a high-achievers program" which subtly screens out K–2 even when the band exists. _Suggestion (lower priority — needs writer review): consider a softer eyebrow like "FOR FAMILIES BUILDING ENGLISH LITERACY ACROSS LANGUAGES" that doesn't pre-screen by age._

## What Works Well

- The funnel ladder (Watch = soft cold, Consult = firm warm, Assessment NEVER a CTA) is enforced rigorously across every page reviewed. The CTA labels and routes match `system.md` to the letter.
- The AgeBandChooser is the right *pattern* for the program family. The component is reusable and the "You're here" muted state is a thoughtful touch.
- The `/little-dodo` page itself is genuinely good work: warm hero illustration, K–2 register without going saccharine, statRail balances facts (5–8 yrs / 1 Navigator / 1-on-1) with reassurance (High / Low / Live), shared-credibility section that reuses the operational proof without re-pitching it. The page deserves to be found.
- Token discipline (no hardcoded hex outside `system.md`) is exemplary. Two months of accumulated chrome decisions visible in the doc and applied consistently in the components.
- The PreCtaBand SUPPRESS list is the kind of small structural rule that prevents a whole class of "we have two competing closes on one page" bugs. Keep it.
- Bilingual parity is real, not performative — the ZH name `都学启蒙` is a transcreation (not a literal "little"), and the `littleDodoCourseSchema()` + `llms.txt` entry mean Little DODO is discoverable to crawlers and LLMs even while it's invisible to a human browsing the homepage. Fixing the human-facing visibility now closes the loop.
