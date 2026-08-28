# DODO Learning — Interface Design System

Living reference for the DODO marketing site chrome (navbar, footer, funnel CTAs)
and its visual token system. Read this before touching navigation, CTAs, the
pre-footer band, or any colour value.

**Current through:** v6.3 · 2026-08-27 (token-table correction + strategy layer).
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
| Gilt / gold accent (badges, `btn-gilt`) | `#F5C842` | `#0E0E12` | 12.1:1 ✅ |
| Gilt as *text* on light | `#C49400` | `#F5F5FF` | 4.6:1 ✅ |
| Lavender — **large text ≥24px & borders only** | `#7c79e8` | `#F5F5FF` | 3.37:1 ⚠️ |
| Borders | `rgba(183,181,254,0.10)` family (low-opacity lavender) | — | decorative |

**⛔ Retired — do not use as text on light surfaces:**

| Value | On `#F5F5FF` | Why retired |
|---|---|---|
| `#7B8494` | 3.48:1 | Old muted. Superseded by `#5E6879`. |
| `#94A3B8` | 2.37:1 | Old muted. **Dark surfaces only** — passes there, fails on light. |
| `#b7b5fe` | 1.75:1 | Accent-on-dark only. Never as text on light. |
| `#7ec8a0` | 1.82:1 | Undocumented success-green. Needs a dark-only rule or a darker light variant (`#1E6E4B` = 5.72:1). |
| `#c0504d` | 4.31:1 | Undocumented error-red. Raise to `#B3261E` (6.03:1). |
| `#3b6fcc` | 4.48:1 | Undocumented link-blue. Fractionally under AA — raise or remove. |

> **Why this table changed (v6.3).** The previous version listed `#7c79e8` as
> "Brand lavender — AA-safe text on light". It is not: 3.37:1 on Whisper, 3.65:1 on
> white. That row licensed four components to hand-roll labels at 10–12px, producing
> 19 AA failures on the live home page. `globals.css` had it right all along
> (`.eyebrow` = `#5856cc`). **When a component needs a label, use `.eyebrow` — do not
> re-derive a lavender.**

**Buttons — accessibility rule (WCAG AA: text ≥ 4.5:1, boundary ≥ 3:1):**
- **Filled primaries are surface-agnostic** (near-black text on a light fill): `btn-charter`
  (gold `#F5C842`, **12.1:1** — firm close / Watch on light heroes) · `btn-primary` (lavender
  `#b7b5fe`, **10.1:1** — Watch on dark heroes). Use either on any surface.
- **Outline secondaries are surface-SPECIFIC — this is the load-bearing rule:**
  - On **DARK** surfaces → `btn-ghost` (light-lavender text `#b7b5fe`, **10.1:1**).
  - On **LIGHT** surfaces → `btn-outline` (deep-lavender text `#5856cc`, **5.36:1**).
  - ⚠️ **Never `btn-ghost` on light** — `#b7b5fe` on Whisper is **1.75:1** (fails badly). No
    single text color passes on both black and white, so the secondary MUST match its surface.
- `btn-gilt` is a safety **alias of `btn-charter`** (it was once undefined → invisible). Prefer
  `btn-charter` directly. When adding a CTA, ask: filled or outline? and dark or light surface?

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

### Open — carried out of the v6.3 audit, not yet done

- [ ] Refactor the four hand-rolled labels onto `.eyebrow`: `ConsultForm.jsx`,
      `Footer.jsx`, `AgeBandChooser.jsx`, `app/[locale]/little-dodo/page.jsx`.
- [ ] Add semantic light-surface rules for the undocumented green (`#7ec8a0`) and
      red (`#c0504d`); raise or retire `#3b6fcc`.
- [ ] Introduce the component token layer in `globals.css`.
- [ ] Raise `--text-muted` (`#6B7280` measures **4.46:1**, marginally under AA) to
      `#5E6879`. The inline comment claiming 4.6:1 is optimistic.
- [ ] Revisit the type scale against the 16px body floor.
- [ ] Give D44's Three Brand Truths a visual brief.
