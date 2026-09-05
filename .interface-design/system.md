# DODO Learning — Interface Design System

**v7.0 · 2026-09-03.** Normative rulebook for the marketing-site chrome and visual
system. Read this before touching navigation, CTAs, the pre-footer band, or any
colour value.

This file states **what the rules are now**. It deliberately contains no history:

- **Why a rule exists / how it got here** → the decision it cites.
  D33–D90 narratives: [`docs/_archive/interface-system-v6.44.md`](../docs/_archive/interface-system-v6.44.md)
  (the pre-restructure guide, verbatim). D91–D96: [`docs/content-style-decisions.md`](../docs/content-style-decisions.md).
  D97+: [`docs/decision-log.md`](../docs/decision-log.md).
- **Whether a decision is still in force** → [`docs/decision-index.md`](../docs/decision-index.md). Always.
- **Measured numbers** → `npm run conformance` / `npm run type-floor`. Quote tool
  output with a date; never copy a number from prose (including this file's).
- **Sibling guide:** [`translation/BRAND_CONTENT_GUIDE.md`](../translation/BRAND_CONTENT_GUIDE.md)
  (v6) owns voice, copy and positioning; this file owns chrome and visual tokens.

**Where a value and this file disagree, the code + guards win — then fix this file.**
Lists marked *(authority: code)* are convenience copies of something the repo enforces;
verify at the named source before relying on them.

---

## 1 · Direction & feel

A live, Navigator-led **English language arts** brand for families who want mastery
rather than remediation — defined by aspiration, not geography (D40: local and settled
families are courted directly; international reach stays implicit, never a headline).
The category being designed to own is *English language arts at mastery level* (§04a).

Chrome is **calm, editorial, credible** — not SaaS, not ad-tech. Whisper-quiet
structure; colour carries meaning, never decoration. Bilingual (EN/ZH) from one copy
source: every visible string lives in `content/marketing.{en,zh}.js`, never hardcoded
(D25).

⛔ Do not reintroduce "globally-mobile families" / "students around the world" /
面向全球家庭 as framing (retired by D40).

## 2 · Strategy → visual brief

Three things carry the premium; each has a visual treatment:

1. **The seven-level ELA ladder (D37)** — render as an ordered, cumulative ladder;
   cleared levels stay visible (sunk progress is a retention moat).
   - ⛔ The **ladder** never renders as a score, gauge or dial — a visitor's own
     standing is assessment, which acquisition never does (D29).
   - ✅ **Scope (D74): the test is whose number it is.** A measured outcome a family
     owns — a Lexile number, a 6+1 movement — MAY render as a bar. Sanctioned:
     `LexileBar` (5 routes) and the `/results` trait bars. D44 Truth 3 requires a
     specific number on every conversion page.
   - ⛔ No "9 levels" / Poodle framing anywhere (D37).
2. **Navigator presence (D44 Truth 2)** — named humans at real size, their own words.
   Never stock imagery, never an anonymous teacher grid. Where a surface has room,
   show the **Speaking strand** — the spoken defence is the moat, not credentials
   plus warmth (D74).
3. **Research & credentials (D38)** — proof renders as **citation**, not badge.
   `/credentials` is the canonical attribution surface. Gilt is not a "credential"
   colour — see §5 for gilt's actual (positional) job (D76).

**Guardrail (§10 of the brand guide):** no visual device may introduce discount,
deficit, urgency or remediation framing — no countdowns, scarcity counters,
before/after deficit charts, or red-to-green gradients. Progress frames as
*acceleration into mastery*.

## 3 · Funnel & CTAs

```
See  →  Talk  →  [enroll]  →  Assess
Watch    Book Your             Lexile baseline (Week 0/8/16)
a Demo   Consultation          INFORMATIONAL ONLY — never a lead-capture CTA
(soft)   (firm)
```

- **Assessment is NOT a funnel entry (D29).** `/assessment` and `/lexile` explain
  the in-program assessment; they never carry a "Book a Free Assessment" CTA.
- **Match ask to temperature (D27):** cold surfaces (navbar, home hero, About) lead
  soft; warm surfaces (deep page ends, footer band) carry the firm close.
- **Standard labels — one action, one label (D30):**
  - Soft: **Watch a Demo Class** / 课堂实录 → `/demos`
  - Firm: **Book Your Consultation** / 预约咨询 → `/consult`
    (consult-page hero may use first-person **Book My Consultation** / 预约我的咨询)
  - Secondary: **See the ELA Program** / 查看 ELA 课程 → `/program`
    *(the program's name is **ELA Program** — the "16-Week Program" label is retired
    from chrome; "cycle" remains the 16-week unit. See brand guide §06/§09.)*
  - ZH deliberately uses 预约咨询, never 评估, on consult CTAs (D29 reinforcement).
- **Max two consult touchpoints per page:** one in-body CTA + the global band. Never
  two dark consult panels (D28→D33).
- **`PreCtaBand` is a soft fallback (D33).** Suppressed on every page that owns an
  in-body close; shown only on pages without one (home, `/faq`, `/partners`,
  `/assessment`), where it leads soft. **The `SUPPRESS` list in
  `components/layout/PreCtaBand.jsx` is the authority** *(authority: code)* —
  currently 16 routes incl. `/little-dodo` and `/credentials`. When adding a page,
  decide whether it owns a close; if yes, add it there.

**Inquiry forms** (`components/consult/ConsultForm.jsx` is the reference): single
column, ~5 grouped sections, labels above inputs, required marks in
`--form-required-color`; honest submit (spinner → success only on real 2xx, inline
error otherwise); success state replaces the form in place with two contact cards;
locale-aware `preferredContact` default (email on EN, wechat on ZH). Backend:
Cloudflare Pages Function `functions/api/consult-inquiry.js` (static export disables
Next API routes) — architecture and env vars in
[`docs/_archive/successor-handoff-2026-09-02.md`](../docs/_archive/successor-handoff-2026-09-02.md) § 2026-06-28.

## 4 · Chrome conventions

**Navbar** (`components/layout/Navbar.jsx`): single flat row of primary links, no
dropdowns; secondary links live in the mobile drawer + footer. Desktop CTA = the soft
close, rendered `btn btn-do btn-do-primary`; drawer CTAs = Watch (`btn-do-primary`)
over Consult (`btn-do`). Gated items (`/audiobooks`): lock glyph only, gating word
`sr-only` (D31). `--nav-height: 4rem`; logo 32px. Drawer inertness is
`inert={!mobileOpen}` — a boolean, never a string (D80). ZH nav is descriptive over
branded (D34): `/methodology` is "DODO Method" / "DODO 教学系统" in both navbar and
footer — one destination, one label (D92 closed the footer's "The Loop" breach).

**Footer** (`components/layout/Footer.jsx`): server component; order PreCtaBand →
grid (Brand | Programs | Resources | Serving) → trust strip → legal strip; PreCtaBand
is the one client child. Column headers and qualifiers use `Label` (§5). Footer links
hold the 24×24 target minimum via `min-h-[24px]`/`min-w-[24px]` (D61) — note Tailwind
is pinned 3.3.3, so `min-h-6` does not exist; arbitrary values only.

## 5 · The grammar — one drawn hand, three parts of speech

The system's signature is a school-cursive monoline hand (`--do-mark`) doing three
distinct jobs. Keeping the jobs distinct is the whole system:

| Part | Device | Means | Applied via |
|---|---|---|---|
| **Control** | letterforms **enclose** the label — the D-o bracket | *press this* | `DoCta` / `.btn-do` (D53b) |
| **Label** | punctuation **introduces** it — the lead-in quote | *DODO claims this* | `.label-quote`, by construction in `Eyebrow` (D54, D57) |
| **Brush** | a stroke **under/around** — swash, divider, circle | *emphasis / earned* | `.btn-do-*` swash (D55–D56), §7 furniture (D58) |

- ⛔ **Never quote an interactive element**; never bracket a non-control. Mixing the
  parts of speech makes all three meaningless (D54).
- **Budget rule (D58): at most one drawn device per section, two on a hero.** Do not
  "finish the set" on a page that already has one.
- Marks are CSS pseudo-elements with baked data-URIs, `aria-hidden`; the label always
  carries the accessible name (D53b).

### Controls — the `.btn-do` family *(the only classes for new controls)*

| Class | Job | Swash |
|---|---|---|
| `.btn-do` | secondary / exploratory | pale ink @26% |
| `.btn-do-primary` | the lead of its section | deep ink @30% — **gilt when it is the single lead of a conversion `<section>` (D76)** |
| `.btn-do-fork` | co-equal choice pair (age-band chooser) | lavender, no gold — a fork has no lead (D76/D79) |

- **Gilt is positional, not semantic (D76, supersedes the D52 reservation):** the
  single lead of a conversion section takes the gilt swash; a section with no lead, or
  a fork, takes none. **Gold is never text** — it rides in `background-image`, where
  WCAG 1.4.11 does not apply. `check-gilt-escrow` enforces both halves on the built
  output. Gilt's second job is the **earned-proof mark** (`--gilt-mark`, §7); D58's
  budget rule keeps the two from co-occurring.
- `.btn-do-charter` no longer exists — folded into `primary` (D79).
- Hierarchy is weight + label colour + swash ink. **No fills on system controls**
  (D53b). Scope exclusions: media transport, non-interactive labels, utility chrome
  (locale switcher, pagination).
- ⚠️ **Legacy fill classes still exist** (`.btn-primary`, `.btn-solid`, `.btn-ghost`,
  `.btn-outline`, `.btn-charter` + `components/ui/Button.jsx`), consumed only by the
  gated `AudiobookPlayer` (4 call sites). **Do not use them in new work.**
  **OPEN RULING:** migrate those 4 sites (or scope audiobook styles locally) so the
  fills can be retired at the definition per the D75 precedent — or record a permanent
  carve-out. Until ruled, this paragraph is the carve-out's only record.

### Labels

| Component | Job | Notes |
|---|---|---|
| `Eyebrow` (`components/ui/Eyebrow.jsx`) | the canonical section/hero label — sole definition (D57, D71, D77) | renders `.eyebrow .label-quote`; 12px / 600 / 0.12em, `:lang(zh)` 0.06em; `pill` prop (10px — an open type-floor item), `sentence` prop exempts the D36 tagline from uppercase (D79); `dark` prop for self-painted dark grounds |
| `Label` (`components/ui/Label.jsx`) | chrome labels (D94): `column` (link-group headers), `qualifier` (item descriptors — **11px, a logged exception to the type floor**), `pill` (status chip) | `dark` prop; guarded by `check-label-variant` |
| `TagRun` (`components/ui/TagRun.jsx`) | taxonomy value sets as middot runs (D70) | sets its own 0.75rem floor |

- **Quote scope (D54):** section-level eyebrows and hero badges = claims → quoted.
  Taxonomy values (blog categories, credential chips, trait tags), card-level
  eyebrows, form field labels, stat values = not claims → never quoted.
- **Pills are retired sitewide (D70/D75).** No bordered text capsules; `.badge` is
  deleted. The one selected-state that needs emphasis (`/faq` filters) uses the swash.
- The `section-label` residue and `framework` step names are **correctly hand-rolled**
  — triaged 2026-09-02, verdict "build nothing." Do not absorb them into a component.

## 6 · Surfaces & spacing

- **`Surface` (`components/ui/Surface.jsx`)** is the canonical panel: `card` (white) ·
  `tinted` (lavender) · `panel` (dark — emits `.on-dark` by construction) (D60).
  Hand-rolled panels are ratcheted by `check-surfaces` (baseline
  `scripts/surface-baseline.json`, currently 41 — D87's structural re-count). Migrate
  opportunistically; section *bands* (background, no border) are legitimate and are
  not panels.
- **Dark grounds: `.section-dark` / `.section-darker` paint + hook; `.on-dark` is the
  hook alone.** Any section that paints its own dark ground MUST carry `.on-dark`, or
  its eyebrows/labels/controls silently keep light-surface colours — this trap has
  shipped real 1.0–1.3:1 controls at least five times (D53/D65/D85). It is the first
  question when adding a control. Guarded post-build by `check-on-dark` (D85).
  ⚠️ `.section-hero` is **LIGHT**.
- **Section colour rules are defaults, not overrides (D89):** the `.section-*` /
  `.on-dark` descendant colour selectors are wrapped in `:where()` so components and
  utilities can override them. Never add a surface-scoped text rule that outranks a
  component (the v6.5 rule: exclude components explicitly).
- **Spacing protocol (v6.2):** `SectionWrapper` owns all section padding
  (`--section-md`); never page-level `py-*` on sections. Two adjacent sections must
  not share both the same surface and default padding — combine, alternate the
  surface, or (last resort) zero the inner boundary.
- Scrims are components, not inline alpha: `.hero-scrim` · `.hero-vignette` ·
  `.band-scrim` (D81).

## 7 · Brush furniture (D58)

`.divider` (dry-brush rule) · `.accent-top` (painted card edge) · `.quote-glyph`
(decorative mark only — real speech uses `q`, which is language-aware: `q:lang(zh)`
yields 「」) · `.score-marked` (the earned-proof circle in `--gilt-mark`, D68) ·
`.check-list` (**defined, deliberately unused — reserved; do not delete on a usage
count**, D96).

- `.score-marked` marks a **measured outcome only**, never a feature count; at most
  one per row; applied by content flag (`marked: true`), never by index.
- Held deliberately: the swashed word, the torn section edge, the inkstone blot.
  Handwritten marginalia is refused — it cannot survive translation (same test that
  rejected the guillemet in D54).

## 8 · Colour & tokens

- **`styles/globals.css` is the value authority.** This guide names tokens, never hex.
  The layer model (all three exist): **primitive** (`--color-lavender-signal`,
  `--color-lavender-deep`, `--color-void-black`, `--color-midnight`, …) → **semantic**
  (`--text-accent`/`-dark`, `--text-heading`, `--text-body`/`-dark`,
  `--text-muted`/`-dark`, `--surface-*`) → **component** (`--label-color`,
  `--form-required-color`, `--link-hover-color`, …). Components reach for component
  or semantic tokens; **no colour hex literals in components** — if the token you
  need is missing, add it first. `check-tokens` fails the build on any bare `var(--x)`
  with no definition (D73).
- **Alpha is three scales, not one ramp (D82):** `--platinum-60/70/80/90` (text —
  the floor is .60; below it is a defect, not a step), `--lavender-08…80`
  (decoration only — lavender as text fails AA below α .8), `--ink-08…45`
  (light-ground tints). Deep lavender mirrors the light scale in 5 steps (D96).
- **Contrast is two tests, not one:** text ≥ 4.5:1 (1.4.3) AND non-text boundary
  ≥ 3:1 (1.4.11). State the ground; muted and accent colours are **surface-specific**
  (`--text-muted` vs `--text-muted-dark`, `--text-accent` vs `--text-accent-dark`).
  `#7c79e8` (`--do-mark`) is large-text/borders/marks only — it is the one lavender
  clearing 3:1 on both grounds, which is why the marks can be baked single-colour.
- **Structural contrast is guarded; value contrast is a design review (D85).** A
  missing `.on-dark` hook is machine-decidable and `check-on-dark` catches it. A
  colour merely too faint needs composited pixels, and the build must not acquire an
  install step — so there is deliberately no pixel auditor. Colour changes need a
  measured ratio, stated against the named ground.
- Retired values and their reasons: archive §"Depth & color tokens". Do not resurrect
  a colour without re-measuring.

## 9 · Type

- **One Latin face: Source Sans 3 (D59).** There is no display face. Never name a
  font family literally in code — use `var(--font-latin)` / the cascade (nine
  hard-coded stacks were the D59 bug). If a display face is ever piloted again: with
  a written expiry, and preferably covering both scripts.
- **ZH body ships LXGW WenKai GB (D62 — Live).** Built `fe4d5e4`, silently reverted
  to Noto by a default-source regeneration (`799629f`), **re-shipped 2026-09-05 by
  admin ruling** through D97's explicit `--source=lxgw-wenkai-gb` flag. Two static
  faces: Regular = 400, Medium declared `500 700` — WenKai has no true bold; never
  synthesize one. The generator's source is **sticky (D97)**: a plain `fonts:cjk`
  keeps the manifest's face, and `check-cjk-coverage` prints the shipping source on
  every run and fails half-regenerated states, on **both** `prebuild` and `postbuild`
  (the postbuild pass sees client-only and dependency glyphs). The subset pipeline
  itself (D63) is unchanged: committed chunks in `public/fonts/cjk/`. **The Latin
  face leads the CJK stack (D67)** so Latin inside ZH copy stays Source Sans 3.
- **Latin preload is `subsets: ['latin']` only (D64)**, ratcheted by
  `check-font-preload` (a tolerated next/font cyrillic-ext-italic quirk is documented
  in the guard).
- **Type floor:** body 16px · secondary/captions 14px · labels 12px (`.eyebrow`) ·
  **below 12px ⛔** — with exactly one logged exception: `Label variant="qualifier"`
  at 11px (D94). Never pair the smallest size with the lowest-contrast colour.
  Measure with `npm run type-floor` (rem-aware); `conformance`'s px-only count is a
  known undercount — do not quote it for this.

## 10 · Guards & ratchets

Wired in `package.json` — six `prebuild` (source) + eight `postbuild` (built output)
passes *(authority: code — count it there)*:

| Script | Enforces | Passes |
|---|---|---|
| `check-surfaces` | hand-rolled panels ratchet (D60/D87) | pre + post |
| `check-cjk-coverage` | every CJK glyph is in the subset (D63) | pre + post |
| `check-gilt-escrow` | gilt = swash on the single lead per section; gold never paints text (D66→D76) | pre + post |
| `check-tokens` | every `var(--x)` resolves (D73) | pre + post |
| `check-inline-style` | inline colour/type ratchet (D78) | pre + post |
| `check-label-variant` | chrome labels use `Label` variants (D94) | pre |
| `check-font-preload` | Latin payload stays trimmed (D64) | post |
| `check-on-dark` | no control on a dark ground without the hook (D85) | post |
| `check-utility-emitted` | a utility that reaches the browser may not silently stop shipping (D95) | post |

**Ratchet discipline:** counts fall freely, never rise; after a real migration,
`--update` and commit the smaller baseline **with the reason in the commit** — a
baseline bumped silently is a formality. Both big ratchets refuse an implausible drop
(>30% and ≥8 items) without `--force`, which means "I checked" (D87). Match on
structure, never on value lists (D87). Order per file is **tokenise, then extract** —
extraction alone games the ratchet.

**Instruments (report, never fail):** `npm run conformance` (measured state — read
its output, don't trust it blind; it has shipped wrong groupings and once broken) and
`npm run type-floor`. A detector's first run is data about the detector. Write the
predicted figure down before measuring.

**Standing floor for inline styles:** the ratchet holds at its baseline
(`scripts/inline-style-baseline.json`) **by decision, not by shortfall** — D88 proved
blind extraction breaks specificity, D90 took what was safe, and most of the rest are
one-offs. Take repeated shapes opportunistically; do not campaign toward zero.

## 11 · Process guardrails

- **Content apply-gate:** never edit live copy until an explicit "apply". Propose in
  chat first.
- **Bilingual parity:** every EN copy change lands with its ZH mirror (brand-voice,
  not literal); both locales must parse and `next build` clean.
- `next lint` is broken in this Next version — use `npx eslint <files>` + a full
  `npx next build`.
- **Completeness claims name their guard** or are written `(unverified)` — five
  sincere unguarded claims were false. Measurement traps (frozen preview URLs,
  cache-hit byte sizes, hero contrast probes, desynced screenshots, self-polluting
  instrumentation): [`docs/architecture-cohesion-proposal.md`](../docs/architecture-cohesion-proposal.md) §4 — read before
  measuring anything.

## 12 · Known-open (interface)

The queue lives in [`docs/completion-plan.md`](../docs/completion-plan.md); the open
rulings live in [`docs/decision-index.md`](../docs/decision-index.md) § Open. The ones
that touch this file: the AudiobookPlayer fill carve-out (§5), the `/compare` founder
`<figure>` play button with `pointerEvents: none` (needs the real embed URL), the 15
images without dimensions, and the 41 ratcheted panels.
