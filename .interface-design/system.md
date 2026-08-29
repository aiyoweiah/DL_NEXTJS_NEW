# DODO Learning — Interface Design System

Living reference for the DODO marketing site chrome (navbar, footer, funnel CTAs)
and its visual token system. Read this before touching navigation, CTAs, the
pre-footer band, or any colour value.

**Current through:** v6.6 · 2026-08-28 (D52: filled buttons are surface-specific;
boundary contrast added to the button rule). v6.5 fixed button specificity, muted-on-dark
and external links; v6.4 added display typeface D51; v6.3 the token-table correction.
**Sibling document:** `translation/BRAND_CONTENT_GUIDE.md` (**v5.1**, decisions through
**D50**) owns voice, copy and positioning; this file owns chrome and visual tokens.
Decisions are numbered **D** in `docs/content-style-decisions.md` and apply to *both* —
see the decision log at the foot of this file for which ones have landed here.

---

## Direction & feel

A live, Navigator-led **English language arts** brand for families who want mastery
rather than remediation — defined by aspiration, not geography (**D40**: local and
settled families are courted directly; international reach stays implicit, never a
headline). The category we are writing and designing to own is *English language arts
at mastery level* (**§04a**).

The chrome should feel **calm, editorial, and credible** — not SaaS, not ad-tech.
Whisper-quiet structure; color carries meaning, never decoration. Bilingual (EN/ZH)
from one copy source; every visible string lives in `content/marketing.{en,zh}.js`,
never hardcoded.

> ⚠️ Do not reintroduce "globally-mobile families", "students around the world" or
> 面向全球家庭 as framing here or in page copy. Retired 2026-08-26 by D40.

---

## Strategy → visual brief (added v6.3 · §04a, D37, D38, D42)

The content guide names what the brand must be *seen* to be; this section is the bridge.
Three things carry the premium, and each needs a visual treatment. Where a surface has
no rule here yet, that is a gap to fill deliberately — not licence to improvise.

**1 · The seven-level ELA ladder (D37) — progress must read as longitudinal.**
Render as an ordered, cumulative ladder where cleared levels stay visible. The parent
should see both where their child sits *and* how far the road runs — that visible sunk
progress is a retention moat, not a decoration.
- ⛔ Never a score, gauge, or dial. Those read as *assessment*, which the funnel ladder
  deliberately keeps out of acquisition (see below).
- ⛔ No "9 levels" or Poodle-era framing anywhere — retired by D37.

**2 · Navigator presence — the bond is a person, not a feature.**
Navigators appear as named humans at real size, with their own words. Never stock
imagery, never an anonymous "our teachers" grid, never an avatar row. The longitudinal
Navigator bond is the moat; a generic teacher grid actively destroys it.
- Precedent: `/navigators` S4 → S4.5 (Kimberly spotlight). The surface-alternation rule
  in the spacing protocol exists partly to give these spotlights their own ground.

**3 · Research base & credentials (D38) — proof renders as citation, not as badge.**
`/credentials` is the canonical attribution surface; every research reference routes
there. Treat proof typographically — footnote register, restrained, checkable.
- ⛔ **Gilt does not mean "credential."** Gilt (`#F5C842`) is reserved for Charter
  Enrolment moments. Spending it on trust badges devalues the one place it means
  something.

**Guardrail (§10).** No visual device may introduce discount, deficit, urgency or
remediation framing: no countdowns, no scarcity counters, no before/after deficit
charts, no red-to-green "improvement" gradients. Progress is always framed as
**acceleration into mastery**, never catch-up.

---

## The funnel ladder (the spine of every CTA decision)

```
See  →  Talk  →  [enroll]  →  Assess
Watch    Book Your             Lexile baseline
a Demo   Consultation          (Week 0 / 8 / 16)
(soft,   (firm, warm)          INFORMATIONAL ONLY —
 cold)                          never a lead-capture CTA
```

- **Assessment is NOT a funnel entry.** We consult families *before* assessing them.
  The `/assessment` and `/lexile` pages explain the in-program assessment; they must
  never carry a "Book a Free Assessment" style CTA. (This was the v6.0 reframe.)
- **Match the ask to visitor temperature.** Cold/exploratory surfaces (navbar, home
  hero, About) lead with the **soft** close (Watch). Warm surfaces (deep page ends,
  post-video, footer band) carry the **firm** close (Consult).

---

## CTA rules (enforce on every page)

1. **Max two consult touchpoints per page**: one in-body CTA + the global footer band.
   Never render the dark consult panel twice. Do **not** add per-page "charter" bands —
   the global `PreCtaBand` (in `Footer.jsx`) is the universal close. (v6.0 deleted the
   `charter` sections from program/demos/consult and the duplicate `BookCall` on demos.)
2. **Standardized labels — one action, one label:**
   - Soft close: **Watch a Demo Class** / 课堂实录  → `/demos`
   - Firm close: **Book Your Consultation** / 预约咨询  → `/consult`
   - Secondary:  **See The 16-Week Program** / 查看十六周课程  → `/program`
   - Exception: the consult-page hero may use first-person **Book My Consultation** /
     预约我的咨询.
   - ZH deliberately uses **预约咨询** (not 预约评估面谈) so the word "评估" (assessment)
     never appears on a consult CTA — reinforces the consult-before-assess reframe.
3. **`PreCtaBand` is a soft fallback, not a peer panel (v6.1, D33).** It is
   **suppressed** on every page that owns an in-body closing CTA (see the `SUPPRESS`
   list in `PreCtaBand.jsx`: about, program, methodology, lexile, results, navigators,
   compare, demos, consult, blog, cities, audiobooks, privacy, terms) and **shown only**
   on pages without one (home, `/faq`, `/partners`, `/assessment`). Where shown it leads
   **soft** — Watch a Demo Class (primary) + Book Your Consultation (ghost). Copy:
   `footer.preCta` (reframed soft). This is what guarantees "one conversion moment per
   page" — never a page's own close *plus* the band. When you add a page, decide: does it
   own a close? If yes, add its route to `SUPPRESS`.

---

## Inquiry forms (added 2026-06-28, consult form rework)

The firm close (Book Your Consultation) lands on `/consult`, whose closing section is
now a **custom inquiry form** — not a third-party calendar embed.
See `components/consult/ConsultForm.jsx`.

**Pattern**, in case more inquiry-style forms get added:

- Single column, ~5 grouped sections with mini-eyebrow labels above each cluster.
  Labels above inputs (never floating placeholders). Editorial line-height. Required
  fields marked with a `*` in deep lavender `#5856cc` (**corrected v6.3** — was
  `#7c79e8`, which is 3.65:1 on white and fails AA at asterisk size); optional
  fields left unmarked.
  Fields collapse to single column at `< 640px` via `grid-template-columns:
  repeat(auto-fit, minmax(220px, 1fr))`.
- Sits inside a white card (`#ffffff`, 1.25rem radius, hairline border) centered
  in the page's light-lavender surface (`#F5F5FF`) — same surface treatment that
  used to host the Cal.com embed, so the page rhythm is preserved.
- **Submit moment is honest, not optimistic** — button transitions to spinner
  ("Sending…"), only swaps to success state on real 2xx from the API. If the
  POST fails, an inline error appears and the button re-enables. Don't fake-confirm
  before the backend has actually accepted.
- **Success state replaces the form in-place** (same component, internal state
  swap). No page navigation, no scroll jump — the parent stays where they are.
  Header is a personalised "Got it, {firstName}." with the bilingual mini-line below.
- **Two equally-weighted contact cards** in the success state (Email | WeChat),
  with the card matching the user's preferred-contact selection getting a 2px
  lavender border (`#5856cc`); the other card gets a 1px hairline. Both have
  copy-to-clipboard. WeChat card surfaces a mobile hint ("Open WeChat → +
  → Add Contacts → search the ID") since most parents will be on phone.
- **Locale-aware default**: `preferredContact` defaults to `email` on EN, `wechat`
  on ZH — cultural fit, easy to override on the page.
- **Submit button copy**: "Send to {recipient name}" rather than "Submit" or
  "Send". Names the recipient turns a transaction into a small social act.

**Server-side**: posts to `/api/consult-inquiry`, a Cloudflare Pages Function
(NOT a Next.js API route — disabled by `output: 'export'`). Lives at
`functions/api/consult-inquiry.js` with helpers in `functions/_lib/{lark,email}.js`.
The function writes a row to the Lark Base, posts a 📥 card to Lead Pulse, and
fires parent ack + team digest emails via Resend. See
`docs/SUCCESSOR_HANDOFF.md` § 2026-06-28 for full architecture + env vars.

---

## Navbar conventions (`components/layout/Navbar.jsx`)

- Single flat row of **6** primary links (no dropdown — simplicity/focus is a funnel
  asset). The 5 secondary links live in the mobile drawer + footer, not the desktop bar.
- Desktop nav appears at `md:768` (compact `gap-4`, widens to `gap-8` at `lg`).
- **One** desktop CTA = the soft close (Watch Demo Class), `btn-charter`, hides on `/demos`.
- Mobile drawer CTA group: Watch (primary `btn-charter`) over Consult (ghost `btn-ghost`).
- **Gated items** (Reading Companion / `/audiobooks`): lock glyph only. The gating word
  is `sr-only` (`copy.members`), never a visible micro-tag. The glyph is the visual.
- `--nav-height: 4rem` (64px); logo 32px tall (50% of nav height).

---

## Footer conventions (`components/layout/Footer.jsx`)

Server component. Order: PreCtaBand → main grid (Brand | Program | Resources | Serving)
→ trust strip → legal strip. Grid jumps `sm:2 → md:4`. `PreCtaBand` is a **client**
child (needs `usePathname`); everything else stays server.

---

## Depth & color tokens (use these — do not invent hex)

**Strategy:** surface-color shifts + low-opacity borders. No dramatic shadows.

**Every row names the ground it was measured against.** A colour is not accessible in
the abstract, only against a surface — the same principle the button rule below already
established. Ratios are measured (WCAG 2.1 relative luminance), not estimated.

| Role | Value | On ground | Ratio |
|---|---|---|---|
| Dark canvas (navbar, dark sections) | `#0E0E12` | — | surface |
| Dark conversion band | `#212830` | — | surface |
| Light surface (footer, light sections) | `#F5F5FF` | — | surface |
| White card surface | `#ffffff` | — | surface |
| Text on dark (primary) | `#F0F0F0` | `#0E0E12` | 16.9:1 ✅ |
| Label / eyebrow **on dark** | `#b7b5fe` | `#0E0E12` | 10.1:1 ✅ |
| Label / eyebrow **on light** | `#5856cc` | `#F5F5FF` | 5.36:1 ✅ |
| Body text on light | `#3D4452` | `#F5F5FF` | 9.03:1 ✅ |
| Muted text on light | `#5E6879` | `#F5F5FF` | 5.19:1 ✅ |
| Muted text on **dark** | `#9AA3B2` | `#0E0E12` | 7.57:1 ✅ |
| Gilt / gold accent (badges, `btn-gilt`) | `#F5C842` | `#0E0E12` | 12.1:1 ✅ |
| Gilt as *text* on light | `#C49400` | `#F5F5FF` | 4.6:1 ✅ |
| Success text on light | `#1E6E4B` | `#F5F5FF` | 5.72:1 ✅ |
| Error text on light | `#B3261E` | `#F5F5FF` | 6.03:1 ✅ |
| Info / link blue on light | `#3a6ac4` | `#F5F5FF` | 4.80:1 ✅ |
| Lavender — **large text ≥24px & borders only** | `#7c79e8` | `#F5F5FF` | 3.37:1 ⚠️ |
| Borders | `rgba(183,181,254,0.10)` family (low-opacity lavender) | — | decorative |

**⛔ Retired — do not use as text on light surfaces:**

| Value | On `#F5F5FF` | Why retired |
|---|---|---|
| `#7B8494` | 3.48:1 | Old muted. Superseded by `#5E6879`. |
| `#94A3B8` | 2.37:1 | Old muted. **Dark surfaces only** — passes there, fails on light. |
| `#b7b5fe` | 1.75:1 | Accent-on-dark only. Never as text on light. |
| `#7ec8a0` | 1.82:1 | ✅ v6.4 — no longer used in components. Kept as `--accent-success` for decorative/dark use only. |
| `#c0504d` | 4.31:1 | ✅ v6.4 — kept as `--accent-error` (decorative). Still used in `/ops` report severity scales: internal tooling, **out of scope** for site chrome. |
| `#3b6fcc` | 4.48:1 | ✅ v6.4 — replaced by `--text-info` `#3a6ac4` (4.80:1) on the home subhead. |

> **Why this table changed (v6.3).** The previous version listed `#7c79e8` as
> "Brand lavender — AA-safe text on light". It is not: 3.37:1 on Whisper, 3.65:1 on
> white. That row licensed four components to hand-roll labels at 10–12px, producing
> 19 AA failures on the live home page. `globals.css` had it right all along
> (`.eyebrow` = `#5856cc`). **When a component needs a label, use `.eyebrow` — do not
> re-derive a lavender.**

**Buttons — accessibility rule. TWO tests, not one (WCAG 1.4.3 text ≥ 4.5:1 AND
1.4.11 non-text boundary ≥ 3:1).** Until v6.6 this section only checked the label.
That is how gilt-on-Whisper shipped: text 12.13:1, but the pill's edge against the
page only **1.47:1**, so the label read fine while the control had no visible shape.
**Every button row below states both numbers. A fill that passes text and fails
boundary is not usable — it is an invisible control with legible words on it.**
- **Filled primaries are surface-SPECIFIC (D52, v6.6 — they were wrongly documented as
  surface-agnostic).** Their labels pass anywhere; their edges do not.

  | Class | Fill + text | Use on | Text | Edge |
  |---|---|---|---|---|
  | `btn-charter` | gilt `#F5C842` + void black | **DARK only** | 12.13:1 ✅ | 9.37:1 ✅ |
  | `btn-primary` | lavender `#b7b5fe` + void black | **DARK only** | 10.14:1 ✅ | 7.84:1 ✅ |
  | `btn-solid` | deep lavender `#5856cc` + white | **LIGHT only** | 5.80:1 ✅ | 5.36:1 ✅ |

  ⚠️ On Whisper, `btn-charter` is **1.47:1** at the edge and `btn-primary` is **1.75:1**.
  Both are unusable on light. Use `btn-solid` there — hover `#4a48b8` (edge 6.66:1).
  `btn-solid` also clears white cards (5.80:1) and the tinted surface `#EAEAF8` (4.87:1).
- **Outline secondaries are surface-SPECIFIC — this is the load-bearing rule:**
  - On **DARK** surfaces → `btn-ghost` (light-lavender text `#b7b5fe`, **10.1:1**).
  - On **LIGHT** surfaces → `btn-outline` (deep-lavender text `#5856cc`, **5.36:1**).
  - ⚠️ **Never `btn-ghost` on light** — `#b7b5fe` on Whisper is **1.75:1** (fails badly). No
    single text color passes on both black and white, so the secondary MUST match its surface.
- `btn-gilt` is a safety **alias of `btn-charter`** (it was once undefined → invisible). Prefer
  `btn-charter` directly. When adding a CTA, ask: filled or outline? and dark or light surface?
  Both halves of that question now change the class — **there is no surface-agnostic button.**
- **Gilt reservation, resolved (D52).** §Strategy reserves gilt for Charter Enrolment
  moments, while this section used to hand it to the firm close on every surface —
  the guide contradicted itself and gilt was spent sitewide. Light-surface firm closes
  now use `btn-solid`; gilt survives on dark sections and genuine enrolment moments,
  which is what the reservation intended.
- ⚠️ **A section-scoped descendant selector must never set a component's colour.**
  `.section-dark a { color: … }` is specificity `(0,1,1)`; `.btn-charter { color: … }` is
  `(0,1,0)`, so the section rule silently repainted every button inside a dark section.
  Live effect before the v6.5 fix: gold CTAs rendered lavender-on-gold (**1.2:1**), and the
  404 page's `btn-primary` rendered lavender-on-lavender (**1.0:1 — the label was exactly
  the same colour as its own fill**). The dark-section link rules now carry `:not(.btn)`.
  When adding any surface-scoped text rule, exclude components explicitly.

**Token architecture — three layers (added v6.3).** Primitive → semantic → component.
`globals.css` currently defines primitives (`--color-lavender-signal`) and semantics
(`--text-accent`, `--surface-base`) but **no component layer** — which is why 58 distinct
hex literals have accumulated in components against ~12 documented values. A component
with no token to reach for invents one.

```css
/* Primitive — raw brand value, never referenced directly by a component */
--color-lavender-signal: #b7b5fe;
--color-lavender-deep:   #5856cc;

/* Semantic — purpose, bound to a named ground */
--text-accent:      var(--color-lavender-deep);   /* on light */
--text-accent-dark: var(--color-lavender-signal); /* on dark  */

/* Component — what a component actually reaches for */
--label-color:         var(--text-accent);
--form-required-color: var(--text-accent);
```

- **Components must not contain colour hex literals.** If no token exists for what you
  need, add the component token first, then use it.
- Typography already does this correctly — `var(--font-latin)` appears 124× in
  components. Colour does not (8 refs). Closing that gap is the structural fix; review
  alone will not hold the line.
- Audit before shipping — this count should not grow:
  ```bash
  grep -rhoE '#[0-9a-fA-F]{6}' components/ | sort | uniq -c | sort -rn
  ```

**⚠️ Contrast-auditing this site: two traps.** Both produce false failures and
have already cost one investigation each.

1. **Gradient backdrops are invisible to an ancestor walk.** Several heroes
   (`/program`, others) paint their dark ground with absolutely-positioned
   `inset: 0` gradient layers that are *siblings* of the text container, not
   ancestors. A script that resolves the effective background by walking
   `parentElement` for a `background-color` will fall through to `body`
   (Whisper) and report light-on-light. Check for positioned backdrops inside
   the `<section>` before believing any such result.
2. **Hidden drawer content still computes.** `getComputedStyle` on a descendant
   of `display: none` returns that descendant's own display, so the mobile
   drawer's links get audited against the wrong ground on desktop. Filter with
   `el.getClientRects().length` — on `/program` that excluded 113 nodes.

**Type scale — minimum sizes (added v6.3).** The live home page runs 66 nodes at 14px,
51 at 12px and 4 at 10px — ~57% of all text at 14px or below, against a stated *calm,
editorial* register. Editorial layouts run 16–18px body.

| Role | Floor | Notes |
|---|---|---|
| Body copy | **16px** | 17–18px preferred on long-form pages |
| Secondary / caption | **14px** | floor for running text |
| Eyebrow / label | **12px** | uppercase + `0.12em` tracking; must use `.eyebrow` |
| Below 12px | ⛔ | not permitted for text |

- **Never pair the smallest size with the lowest-contrast colour.** The 10px `#7c79e8`
  age-band labels were both at once; that combination produced the worst failures found
  in the v6.3 audit.

**Typeface pairing (approved 2026-08-27 · D51).** Until now the site set *every* text
node in DM Sans — 440 of 440 on the home page, with no display face anywhere. A brand
whose product is reading and writing English was presenting itself in the same register
a fintech dashboard uses. Literata adds the missing voice.

| Role | Latin | CJK | Token |
|---|---|---|---|
| **Display** — `h1`/`h2` on strategic surfaces | Literata 500 | Noto Serif SC 500/600 | `--font-display` / `--font-display-cjk` |
| **Body, UI, labels, buttons** | DM Sans 400–700 | Noto Sans SC 400–700 | `--font-latin` / `--font-cjk` |

- **Display-only — this is the whole discipline.** Literata never sets body copy, UI,
  labels or buttons. DM Sans keeps everything it currently owns, so there is no
  migration cost and no change to reading copy.
- **Why Literata.** Drawn for Google Play Books, for long-form reading. A literacy brand
  using a face built for readers is an argument, not a decoration. Deliberately *not*
  Playfair Display, Fraunces or Space Grotesk — those are the AI-default display serifs
  and read as generic. (The `ui-ux-pro-max` font database recommends Playfair + Inter for
  this brief; it was rejected for exactly that reason.)
- **The CJK half is load-bearing, not an afterthought.** A Latin serif with no CJK
  counterpart breaks every `/zh` page. **Noto Serif SC (思源宋体)** is the required pair —
  same superfamily as Noto Sans SC, so the metrics stay coherent. Any future type
  proposal naming only a Latin face is incomplete and should be rejected.
- **Rollout is per-surface, never global in one pass.** Pilot one strategic surface,
  verify EN *and* `/zh`, then extend. Do not start with the home hero.
- ⛔ **Never below 24px.** Literata is a display face here; at label size it fights
  DM Sans instead of complementing it. Labels stay on `.eyebrow` + DM Sans.

**Spacing/layout:** `container-section` wrapper; section padding `var(--section-md)`;
pill badges `rounded-full`, buttons/cards `rounded-lg`. Breakpoints: `md:768`, `lg:1024`.

**Section spacing protocol (v6.2, added when wiring Stream video embeds).** All
section padding is owned by `SectionWrapper` — never apply section-level `py-*`
in a page file (the `.section-*` classes in `globals.css` already add
`padding-top/bottom: var(--section-md)` = 64 px). Inner content may add `py-*`
for emphasis. Critically: **two adjacent sections must NOT share both the same
surface colour AND default `--section-md` padding** — back-to-back same-surface
sections double the vertical air and read as loose (the failure mode that
prompted this rule was on /methodology where two consecutive `<SectionWrapper
white>` calls produced ~240 px of empty white between the LCS definition box
and the "See it live" video heading). When two adjacent sections semantically
belong together, choose one:

1. **Combine** into a single `SectionWrapper` with internal `mt-16 md:mt-20`
   between blocks — preferred when continuous (e.g., a definition followed by
   its illustrative video).
2. **Alternate the surface** of the second to a different token (`section-light`
   → `section-tinted` → `section-light`; `#F5F5FF` → `#EAEAF8` → `#F5F5FF`) —
   preferred when distinct (e.g., abstract claim → specific spotlight example,
   as in `/navigators` S4 → S4.5 Kimberly).
3. **Tighten the boundary** with `paddingTop: 0` on the inner container — last
   resort, only when neither combine nor alternate fits the semantic.

---

## Process guardrails (DODO-specific)

- **Content apply-gate:** never edit live copy/files until the user gives an explicit
  "apply" trigger. Propose in chat first.
- **Bilingual parity:** any EN copy change needs the ZH mirror in `marketing.zh.js`
  (brand-voice, not literal). Both files must `require()`-parse and `next build` clean.
- `next lint` is broken in this Next version — validate with `npx eslint <files>` and a
  full `npx next build` instead.
- **Colour changes need a measured ratio**, not an eyeballed one. State the ground.

---

## Decision log — what has landed in *this* file

Shared **D**-numbering with `docs/content-style-decisions.md`, so a strategy decision can
be traced into the visual system. Content-side decisions with no visual consequence are
not listed.

| D | Decision | Visual consequence | Status |
|---|---|---|---|
| D33 | `PreCtaBand` is a soft fallback, not a peer panel | `SUPPRESS` list; one conversion moment per page | ✅ v6.1 |
| D37 | Five Strands nested under LCS · ELA = 7 levels | Ladder brief added; "9 levels"/Poodle framing banned | ✅ v6.3 |
| D38 | §07a Research Base | Proof renders as citation, not badge; gilt stays reserved | ✅ v6.3 |
| D40 | Positioning shift — drop explicit international, add local | "Direction & feel" rewritten; retired-framing warning added | ✅ v6.3 |
| D42 | §04a Marketing Direction | Strategy → visual brief section added | ✅ v6.3 |
| D36 · D45 | Tagline "Think once, in two languages." + live swap | No chrome consequence — copy-side only | n/a here |
| D43 | One-sentence position (LCS / five strands) | Referenced in Direction & feel; cascaded to copy by D46/D49 | ✅ v6.3 |
| D44 | Redesigned Three Brand Truths | **No visual brief yet — open gap** (copy landed via D46/D49) | ⏳ open |
| D46–D50 | Home, About, Methodology, Program, Compare reworked to v5.1 + §08 voice | Copy-side cascade; chrome unaffected. Re-audit contrast after these ship | n/a here |
| D51 | Display typeface — Literata + Noto Serif SC, **display-only** | Type pairing section added; `--font-display` / `--font-display-cjk` tokens; per-surface rollout | ✅ v6.4 |
| D52 | **Filled buttons are surface-specific** (option B) | `.btn-solid` added (deep lavender + white) for light surfaces; button rule now states text *and* boundary contrast; gilt reservation resolved | ✅ v6.6 |

### Cascade status

**Done in v6.4 (2026-08-27):**

- [x] All 11 hand-rolled `#7c79e8` label instances migrated to component tokens
      across `ConsultForm.jsx`, `Footer.jsx`, `AgeBandChooser.jsx` and
      `little-dodo/page.jsx`. Clears the 19 live AA failures. (Tokens rather than
      the `.eyebrow` class — same colour, and tokens also work in inline styles.)
- [x] Component token layer added to `globals.css` (`--label-color`,
      `--form-required-color`, `--link-hover-color`, `--bullet-color`, …).
- [x] `--text-muted` raised `#6B7280` → `#5E6879` (4.46 → 5.19:1).
- [x] Semantic status tokens added: `--text-success`, `--text-error`, `--text-info`.
      Home-page subhead blue `#3b6fcc` → `--text-info` `#3a6ac4`.
- [x] D51 display face wired (`lib/fonts.js`, root layout, `.font-display`) and
      **piloted on `/methodology` h1 only**.

**Done in v6.6 (2026-08-28) — D52, option B:**

- [x] `.btn-solid` added: deep lavender `#5856cc` + white, for light surfaces.
      Text 5.80:1, edge 5.36:1; hover `#4a48b8` at 6.66:1.
- [x] `--color-lavender-deep` promoted to a primitive; `--text-accent` now points at it.
- [x] Two light-ground filled buttons migrated off gilt — `AgeBandChooser` (white card,
      edge was 1.59:1) and the `/program` closing CTA (Whisper, edge was 1.47:1).
      A runtime scan of every filled button across the site found only these two;
      the rest sit on dark grounds and keep gilt correctly.
- [x] Button rule rewritten to state **both** tests. The old rule checked label
      contrast only, which is how a 1.47:1 edge shipped looking compliant.

**Done in v6.5 (2026-08-28) — from the live-conformance audit:**

- [x] `.section-dark a` / `.section-darker a` now carry `:not(.btn)`. Fixes invisible
      buttons on every dark section and on all 404 pages.
- [x] `--text-muted-dark` (`#9AA3B2`) added; `.proof-stat-label` re-pointed to it.
      The v6.4 muted raise was correct on light but regressed dark surfaces
      (`#7B8494` was 5.11:1 on Void Black; `#5E6879` is 3.42:1). **Muted is
      surface-specific — the same rule the outline buttons already follow.**
- [x] Footer now locale-prefixes only relative hrefs. Links flagged `external: true`
      carry absolute URLs and were becoming `/enhttps://coding.dodolearning.com`
      on every page. Footer now matches Navbar's existing `external` handling.

**Still open:**

- [ ] **Dark heroes do not declare themselves as `.section-dark`** — they paint their
      ground with positioned gradient backdrops instead. So `.section-dark .eyebrow`
      and the dark link rules never fire there. Live effects: `.eyebrow` at `#5856cc`
      on `#0E0E12` (3.32:1) on `/results` + `/methodology`; body `#3D4452` on dark on
      `/about`; the `/faq` search placeholder at 1.52:1. **Fix the hook, not the nodes.**
- [ ] `/results` stat numbers use `#b7b5fe` as text on white cards — 12 nodes at
      1.90:1, plus 2 on `/program` at 1.67:1. These are the proof numbers (§04a).
- [ ] `/program` numbered step badges are 9px white-on-lavender (1.90–3.80:1) —
      below the 12px floor *and* failing contrast.

- [ ] Extend the display face beyond `/methodology` — one surface at a time,
      verifying `/zh` each time. Home hero last.
- [ ] Revisit the type scale against the 16px body floor (57% of home-page text
      is still ≤14px).
- [ ] Give D44's Three Brand Truths a visual brief.
- [ ] Decide the visual motif (see the aesthetic-direction review) — it should
      anchor the anti-generic section before that section is written.
- [ ] `/ops` tools carry their own report colour scales (`#c0504d`, `#5aaa82`,
      `#fde8e8`…). Deliberately untouched — internal tooling, not site chrome.
      If they should follow this system, that is a separate decision.
