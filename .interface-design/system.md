# DODO Learning — Interface Design System

Living reference for the DODO marketing site chrome (navbar, footer, funnel CTAs)
and its visual token system. Read this before touching navigation, CTAs, the
pre-footer band, or any colour value.

**Current through:** v6.36 · 2026-09-01 (D82: three alpha scales + the grey folded; D81: hero scrims extracted — one composition, not an opacity problem; D80: the mobile drawer was never actually inert; D79: skip link off gilt, tagline exempted, charter folded in — the gilt allowlist is empty; D78: the inline-style ratchet — every §3 proposal now built; D77: D57 finished — the eyebrows declared in content; D76: gilt leads the conversion section, the reservation retired; D75: `.badge` retired at the definition; D74: the gauge ⛔ scoped to the ladder, D44's brief closed; D73 built: the guards read the built output + a token guard; D72 built: /credentials tokens + cohesion proposal; D71 built: hand-rolled eyebrows conformed; D70 built: pills retired sitewide; D69 built: hero eyebrow pills; D68 built: gilt means earned proof; D62 built: ZH on LXGW WenKai GB; D67 built: Latin leads the CJK stack; D66 built: gilt escrow enforced; D65 built: btn-do sweep finished; D64 built: Latin preload trimmed; D63 built: CJK frequency-tiered subset; D62 logged: ZH adopts LXGW WenKai, EN stays
Source Sans 3 — decision recorded, implementation not started).
v6.15 = D61 target size 24×24. v6.14 = D59 one Latin face + D60 the Surface guard.
v6.10 = D54 the lead-in quote on claim labels: letterforms enclose a control, punctuation introduces a label.
v6.9 = D53 option B: the D-o bracket is the control chrome sitewide; **all fills removed**.
v6.7 added the `.on-dark` hook and surface-aware badge + LexileBar. v6.6 = D52 filled buttons are surface-specific. v6.5 fixed button specificity, muted-on-dark
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
- ⛔ **The ladder itself** is never a score, gauge, or dial. A child's position on the
  curriculum, rendered as a measurement, reads as *assessment* — which the funnel
  deliberately keeps out of acquisition (D29, and see below).
- ✅ **Scope clause (D74).** That ⛔ governs the ladder, **not outcome proof.**
  Measurement against an **outside standard** — a Lexile number, a 6+1 Trait movement —
  MAY render as a bar. A result a family already owns is not the same act as assessing a
  prospect, and D44 Truth 3 requires a specific number on every conversion page; a blanket
  ban would leave that instruction unbuildable.
  **The test is whose number it is:** a measured outcome, yes; a visitor's own standing,
  no. Sanctioned instances: `components/ui/LexileBar.jsx` (home · /lexile · /methodology ·
  /program · /demos) and the `/results` 6+1 trait bars. Both predate this clause and were
  in tension with the ⛔ as written — that tension is what D74 resolves.
- ⛔ No "9 levels" or Poodle-era framing anywhere — retired by D37.

**2 · Navigator presence (D44 Truth 2) — the bond is a person, not a feature.**
This is the visual rule for **Truth 2 — "mastery is taught by a person, not delivered by
a product."** Navigators appear as named humans at real size, with their own words. Never stock
imagery, never an anonymous "our teachers" grid, never an avatar row. The longitudinal
Navigator bond is the moat; a generic teacher grid actively destroys it.
- **Carry the Speaking strand with it (D74).** §02 names Speaking as the specific work no
  book, app or AI can do — hearing how a child reasons, pressing on the point they didn't
  make, coaching the spoken defence of an idea. A Navigator surface showing only
  credentials and warmth states half of Truth 2. Where a surface has room, the spoken
  defence is the thing to show.
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

**The D-o bracket (D53 · v6.9 option B).** **Every control** is written as `Do <action>`:
a cursive capital **D** and lowercase **o** flanking the label. `DoCta`
(`components/ui/DoCta.jsx`) renders it; `.btn-do` styles it.

| | |
|---|---|
| Hand | School cursive — monoline, ~5° from upright, the letterform a child is taught |
| Marks | `--do-mark` `#7c79e8` — 3.37:1 on Whisper, 5.28:1 on Void Black |
| Label | `--text-accent` on light, `--text-accent-dark` on dark |
| Size | 22px glyph box, `size` prop to override |
| Hover | marks part 1.5px, opacity 0.92 → 1, tinted ground. No layout shift |

- **Monoline is load-bearing, not a style preference.** The modulated hands
  considered first (chancery, copperplate) drop to ~0.9px hairlines at button
  size and go muddy — they needed a second small-optical cut. A monoline stroke
  is the same width everywhere, so **one drawing serves every size**.
- **`#7c79e8` is the only lavender clearing 3:1 on both grounds**, so there is no
  light/dark variant. It also gives that token a job: v6.3 demoted it from body
  text (3.37:1 fails AA) to “large text and borders only”, after which nothing
  used it. A decorative `aria-hidden` mark is exactly that role.
- **`DoCta` keeps `.btn` in its class list on purpose.** `.section-dark a:not(.btn)`
  would otherwise repaint the label — the specificity trap fixed in v6.5.
- **Scope — every control.** Primaries, secondaries, exploratory links, navbar,
  404, form submits. ⛔ Still excluded: **media transport** (audiobook play/skip —
  “Do ⏵” is nonsense), **non-interactive badges and eyebrow pills** (a label wearing
  the button's mark makes the device mean “DODO made this” rather than “press
  this” — those get their own mark instead, the lead-in quote, D54 below), and
  utility chrome (locale switcher, pagination).
- **Correction to v6.8.** That version said “if it is everywhere it means nothing”
  and scoped the bracket to 9 funnel CTAs. That was wrong. Two bracketed CTAs side
  by side read **Do + Do = DODO** — the repetition *is* the brand. The line to hold
  is control vs label, not funnel vs exploratory.
- **No fills anywhere (option B).** `btn-solid`, `btn-charter`, `btn-primary`,
  `btn-outline` and `btn-ghost` are retired from call sites. Hierarchy is weight
  and label colour only:

  | Class | Weight | Label light | Label dark |
  |---|---|---|---|
  | `.btn-do` | 400 | `--text-accent` 5.36:1 | `--text-accent-dark` 10.14:1 |
  | `.btn-do-primary` | 700 | ink 17.78:1 | platinum 16.9:1 |
  | `.btn-do-charter` | 700 | ink 17.78:1 | platinum 16.9:1 |

- ⚠️ **Both claims in this block were wrong; corrected by D76.** It read: *"Gilt moved
  from a fill to the label, so the Charter signal survives option B. It is currently
  used **nowhere**: the site has no enrolment CTA."*
  - The **label** is no longer gilt. D76 retired gold-as-text; `.btn-do-charter` now
    takes the ordinary ink/platinum label and a gilt *swash*. The row above used to
    claim "gilt 4.6:1" on light, which was itself false — the token measured 2.56:1.
  - **"Used nowhere" was false when written and stayed false for five months.**
    `/lexile`, `/methodology` and `/results` have passed `variant="charter"` since
    2026-03-19 — six rendered controls, EN + ZH — so a 2.56:1 label shipped on three
    conversion pages. This is one of the five places that asserted zero call sites.
    Enforced now: `check-gilt-escrow` reads rendered output, not prose.
- **Marks are CSS pseudo-elements with a baked data-URI**, not markup — possible
  only because `--do-mark` clears 3:1 on both grounds. That made the rollout a class
  swap rather than ~50 JSX conversions, and keeps the marks out of the a11y tree.
- **Marks shrink to 18px below 640px.** A bracketed pair gains ~104px, which wraps a
  hero CTA row on a 375px phone at full size.
- Marks are `aria-hidden`; the label carries the accessible name. The letterforms
  are never the only affordance.
- ⚠️ **Placing `DoCta` (or `.eyebrow`, or `Badge`) inside a hand-rolled dark
  section requires `.on-dark` on that section.** This bit during the D53 build:
  `PreCtaBand` paints `#212830` itself and carried no hook, so its label rendered
  at **2.56:1** until the marker was added — the same trap v6.7 documented. The
  v6.7 sweep covered `app/[locale]/*/page.jsx` but **not `components/`**, where
  `AssessmentClient`, `FAQClient` and `PartnersClient` still paint dark grounds
  without it. They pass today only because their text is coloured inline.
  They were left alone deliberately: several contain white cards, and a blanket
  `.on-dark` would turn that card text platinum-on-white — the `/program` failure
  from v6.7. **Add the hook per section when you put a system component in one.**

**The lead-in quote (D54 · v6.10).** Claim labels are introduced by an **opening
double quotation mark** in the same monoline school-cursive hand as the D-o.
`.label-quote` in `styles/globals.css` renders it as a `::before` data-URI.

**THE GRAMMAR — this is the rule the system now rests on:**

| | Device | Means |
|---|---|---|
| **Control** | letterforms **enclose** it — the D-o bracket | *press this* |
| **Label** | punctuation **introduces** it — the lead-in quote | *DODO is claiming this* |

Same pen, same ink, different job. ⛔ **Never put the quote on anything
interactive.** A quoted button makes the D-o read as "DODO made this" instead of
"press this", and the two devices stop meaning anything distinct.

| | |
|---|---|
| Hand | School cursive — monoline, same pen as the D-o |
| Mark | `--do-mark` `#7c79e8` baked into the file — 3.37:1 Whisper, 5.28:1 Void Black |
| Geometry | `viewBox 10 15 55 32`, two strokes, `stroke-width 6`, round caps/joins |
| Size | 19 x 12px against a 12px label; 16 x 10px below 640px |
| Alignment | **Cap height** — `align-items: flex-start`. Never centred |

- **Why a lead-in and not a margin rule.** The mark's aspect is **1.54 — wide and
  short**. A margin tick needs tall and narrow; that was the bracket's job at 0.36.
  A wide mark in the margin reads as a stray dash. It hangs before the first word.
  **Vertically centring it is the single most reliable way to make it look broken.**
- **Why a quote at all.** Every eyebrow and badge is DODO *making a claim* — a quote
  mark says exactly that. It lands on **Speak** in Read → Think → Speak → Write, and
  it matches §07a: proof renders as **citation**, not as badge.
- **⛔ The guillemet was considered and rejected — do not re-propose it.** It fails a
  bilingual test, not a taste test: a guillemet reads as *French* quotation, while
  Chinese uses 「」 for speech and 《》 for titles. Beside `在线 · 导师亲授英文读写`
  it is meaningless at best and reads as a **book title** at worst. A device that
  misreads in one of two shipped languages is not a device.
- **Baked colour, like the D-o marks.** `--do-mark` clears 3:1 on both grounds, so
  one file serves every surface — no `currentColor`, no `.on-dark` variant, and the
  rollout is a class change per label instead of a component migration.
- **The mark REPLACES badge chrome.** Wherever `.label-quote` lands on a `.badge`,
  the fill, border and side padding are dropped. The whole point is that a claim
  stops looking like a control.
- **⚠️ Scope is OPT-IN, and that is deliberate — `.badge` is polymorphic.** It also
  carries blog categories, Navigator credential chips and 6+1 trait tags. Those are
  **taxonomy values, not claims**: four quoted credential chips in a row read as a
  bug, and on `/navigators` they would sit directly beneath the Navigator's *actual*
  pull-quote. Card-level eyebrows (the home-page pillar cards, audiobook cards) are
  excluded for the same wall-of-marks reason, as are the 404 eyebrows.

  | Gets the quote | Does not |
  |---|---|
  | Section-level `.eyebrow` | Card-level `.eyebrow` (pillars, audiobook cards) |
  | Hero `Badge` / hero pill | Blog category `Badge` |
  | | Navigator credential chips |
  | | `6+1` trait tags, 404 eyebrows |

  **Landed on 27 labels across 8 files** — 5 hero badges + 22 section eyebrows.
  Ask "is this label a claim, or a taxonomy value?" before adding it to a 28th.


**The highlighter swash (D55 · v6.11 — widened to every control by D56 · v6.12).** Controls carry a marker
stroke behind the lower portion of its label. `.btn-do-primary` in
`styles/globals.css` renders it as a `::background-image` data-URI.

**This is not a fill returning.** Option B's argument is that the letterforms *are*
the control chrome; a swash never encloses, so that argument survives intact. What
it adds is a **third hierarchy tier** — the D-o marks say *press this*, the swash
says *press this **one***.

| | |
|---|---|
| Mark | deep `#7c79e8` @30% (primary) · pale `#b7b5fe` @26% (all others) — baked, surface-blind |
| Geometry | `viewBox 0 0 160 14`, `preserveAspectRatio='none'`, one skip knocked out |
| Anchor | `background-origin: content-box`, inset 25px (21px below 640px) |
| Size | `calc(100% - 50px) × 15px` (`calc(100% - 42px) × 13px` below 640px) |
| Scope | **every `.btn-do`** — pale ink; `.btn-do-primary` overrides with deep ink |

- **Every control carries one (D56), and the tiers differ by INK WEIGHT, not by a
  second colour.** The primary is simply pressed harder. That is a brush idea rather
  than a palette one — and it is the only version the maths permits:

  | Class | Ink | Label on light | Label on dark |
  |---|---|---|---|
  | `.btn-do` | pale `#b7b5fe` @26% | 4.67:1 | 5.86:1 |
  | `.btn-do-primary` | deep `#7c79e8` @30% | 9.97:1 | 11.27:1 |

- **⛔ The secondary may not take the deep ink.** Its label is lavender `#5856cc` at
  only **5.36:1 bare**, so a deep wash drops it to **4.44:1 at just 18%** and 3.89:1
  at 30%. Lavender ink under a lavender label eats its own contrast — the same
  failure that keeps the wash off the D-o marks. The pale ink is light enough to
  leave the label alone.
- **⛔ And it may not take gilt**, which is the obvious "alternating colour" and was
  the first thing tried. **D52 reserved gilt for Charter Enrolment** after it had been
  spent sitewide; a gilt wash on every secondary would re-spend it exactly as that
  decision forbids. Measured anyway, for the record: gilt clears the label test all
  the way to 38% — it is the **reservation**, not the contrast, that rules it out.
- **The last non-`btn-do` CTA is gone.** ⚠️ **This claim was wrong — see D65.**
  Six inline-styled gilt CTAs survived this sweep and every sweep after it, because
  they carried no button class to swap. Fixed in v6.19. `/cities/[city]` still carried a
  `btn btn-secondary` that D53b's sweep missed. Only `AudiobookPlayer`'s four
  transport controls now sit outside the system, which is correct — "Do ⏵" is nonsense.


**One canonical eyebrow (D57 · v6.12).** `components/ui/Eyebrow.jsx` is now the only
definition. It renders `.eyebrow .label-quote`, so every section label gets the D54
lead-in quote by construction.

- **This closes the gap D54 actually left.** D54 searched for `className="eyebrow"`
  and found 27 labels. It missed **50 more** rendered by a local `Eyebrow` *component*
  — and there were **nine** of those, one defined privately inside each of `compare`,
  `consult`, `demos`, `little-dodo`, `navigators`, `program`, `AssessmentClient`,
  `FAQClient` and `PartnersClient`. Exactly the "site ends up with three vocabularies"
  outcome D54 was written to prevent, hiding behind a component boundary.
- **They had drifted, which is the argument for consolidating rather than patching:**

  | | Variants found |
  |---|---|
  | weight | 500 (×5), 600 (×3), `font-semibold` (×1) |
  | tracking | `0.10em`, `0.12em`, `tracking-widest` |
  | margin | 12px, 14px, 16px |
  | colour | `#5856cc`, `#b7b5fe`, `var(--label-color)`, `rgba(183,181,254,0.65)` |

  Canonical is 600 / `0.12em` / `1rem`, so the five weight-500 pages got very slightly
  bolder and wider-tracked. That is the drift being corrected, not a new design.
- **CJK tracking came from the consolidation.** `PartnersClient` was the only copy that
  tightened tracking for Chinese; the canonical class applied Latin `0.12em` to
  full-width glyphs sitewide. `.eyebrow:lang(zh)` now sets `0.06em`, mirroring what
  `.font-display` already did for zh.
- **⚠️ `AssessmentClient`'s copy was dark-only** — it hard-coded `#b7b5fe` and took no
  `dark` prop, so its nine call sites passed nothing. Routing them through a component
  that defaults to light would have rendered them at **3.32:1** on `#212830`. All nine
  now pass `dark` explicitly. The shared component sets the colour itself rather than
  relying on `.on-dark`, because those three client components still paint dark grounds
  without the hook.
- **Two surfaces can't be verified in the browser:** `/assessment` renders an
  Under Construction placeholder and `/partners` sits behind a code gate, so their
  eyebrows are consolidated in code but unproven at runtime. Check them when those
  surfaces open.


- **Primary-only is a measured decision, not a stylistic one.** The wash sits under
  the label, so the *label's* contrast sets the density ceiling:

  | Class | Label | Ceiling |
  |---|---|---|
  | `.btn-do` | lavender `#5856cc` | caps near **10%**, fails by 18% |
  | `.btn-do-primary` | ink `#212830` | **9.97:1 even at 30%** |

  A wash the secondary could survive would be too faint to signify. Applying it to
  both would spend the signal until it stopped being one.
- **One baked file serves every ground**, exactly like the D-o marks. At 30%,
  `#7c79e8` leaves the primary label at **9.97:1** on Whisper, **11.27:1** on Void
  Black and **8.65:1** on the `#212830` band — and ~9.2:1 under the existing hover
  tint, which composites beneath it.
- **⛔ The swash must never reach the marks.** A lavender ground behind the D-o drops
  the letterform to **2.97:1**, under the 3:1 non-text floor — the brush swallows the
  mark it is meant to support. This is why the ground is lavender under *text* and
  never under a *mark*. Keep ≥3px of bare ground on each side if you retune.
- **⚠️ `background-origin: content-box` is load-bearing — do not "simplify" it away.**
  Controls ship in at least **three padding variants (10 / 20 / 24px)**. An inset
  measured from the border box lands differently on each: the first attempt used a
  fixed 45px and it overlapped the mark by 1px on the `#212830` band while starting
  6px *past* the first letter on the compact variant. Measured from the content box,
  padding drops out of the arithmetic and only the mark (22px + 7px gap) remains —
  which the 640px breakpoint already tracks. Verified at 3px clearance and 4px
  overshoot across all three variants, EN and ZH.
- **Decorative, so WCAG 1.4.11 does not apply.** The control is still identified by
  its marks and its label, not by this shape. That is also why it may sit at a
  visibility of only ~1.4:1 against its own ground without being a boundary failure.
- **Hover is unchanged.** The marks already part 1.5px and the ground already tints;
  the swash deepens with that tint rather than moving. Two things travelling at once
  reads as wobble.
- **Charter is deliberately excluded for now.** When a real enrolment CTA exists,
  `.btn-do-charter` should take the same swash in gilt — the third tier, already
  defined and still used nowhere.


**The hand past the button (D58 · v6.13).** D53–D57 put one drawn hand into the
*chrome*. D58 extends the same hand to the furniture around it. Every item is the
**brush** — the third part of speech — so nothing here adds a fourth device.

| Primitive | Class | Where |
|---|---|---|
| Section rule | `.divider` | redrawn as a dry-brush stroke (surface-aware) |
| Card edge | `.accent-top` | painted top edge instead of a 3px rule |
| Decorative quote | `.quote-glyph` | the oversized mark opening a testimonial |
| Quotation marks | `q` | real punctuation, language-aware |
| Marked score | `.score-marked` | a teacher's circle round a proof number |
| Check | `.check-list` | **defined, deliberately unused** |

- **⚠️ THE BUDGET RULE — this is the governing constraint, not a footnote.** At most
  **one drawn device per section, two on a hero.** The D-o reads *because* most of the
  page is not drawn. If dividers, cards, quotes and numbers all go hand-drawn at once,
  the marks stop being a signature and become a texture — a craft-fair flyer rather
  than a premium literacy programme. **Do not "finish the set" on a page that already
  has one.**
- **⛔ The marked score marks a MEASURED OUTCOME, never a feature count.** `187 points
  average Lexile gain` is proof and may be circled. `16 Weeks`, `4 Skills`,
  `3 Assessments` are brochure facts, and circling them would claim they had been
  earned. **At most one per row** — a teacher circles the thing that matters, not the
  whole page. Live on two numbers sitewide: `/results` `avg-lexile`, and `/about`'s
  referral rate. Both are **content-flagged** (`marked: true`), not index-based, so a
  reordered row cannot drift the circle onto a different stat.
- **Real quotation punctuation stays text.** `.quote-glyph` is only for a *decorative*
  standalone mark. Quoted speech uses `q`, so it can be selected, read aloud and
  translated. This fixed a live bilingual bug: `&ldquo;{quote}&rdquo;` was hard-coded
  around strings that render in **both** languages, so every ZH testimonial carried
  Latin marks. `q:lang(zh)` now yields 「」. Six call sites converted.
- **⛔ `AgreementTool`'s `&ldquo;` are legal contract text** — *(the "Teacher")* — not
  pull-quotes. They were deliberately left alone. Do not sweep them.
- **`.accent-top` keeps a transparent 3px border rather than swapping to padding.**
  A padding swap loses to Tailwind's `p-6`/`p-8` on the same element and shifts every
  card by 3px; `background-origin: border-box` paints the brush over the reserved strip
  with the box unchanged.
- **`.check-list` is defined and used nowhere on purpose.** The site has no
  customer-facing feature list today — every `✓` in the repo is an `/ops/` status
  message. Reach for it when a list that deserves it exists; do not hunt for lists.
- **Held deliberately, with reasons:** the **swashed word** (competes with the button
  swash for "this one first" — revisit once the marked score has been live a while);
  the **torn section edge** (structural, changes section boundaries, which is where the
  `.on-dark` trap lives — do it alone and re-audit); the **inkstone blot** behind the
  marks (needs a warm neutral token the palette does not have — gilt is reserved, and
  a lavender blot drops the D-o to 2.97:1).
- **⛔ Handwritten marginalia was proposed and refused.** It needs real handwriting,
  therefore an image per string, therefore it cannot be translated — the ZH site would
  silently fall back to nothing. A device that cannot survive translation is not
  available to this brand, the same test that rejected the guillemet in D54.


**Surfaces — one primitive, and a guard (D60 · v6.14).**
`components/ui/Surface.jsx` is the canonical panel. Variants: `card` (white),
`tinted` (lavender), `panel` (dark).

- **⛔ ROOT CAUSE OF THE "SPOTTY REFRESH", stated properly.** D58 delivered its
  improvements on system classes, and a page only receives such a refresh if it uses
  the class. But **`.card` only ever covered the WHITE surface.** The two commonest
  surfaces on the site — a lavender-tinted panel and a dark panel — **had no class at
  all**, so they were hand-rolled inline and a class-level refresh could not reach them
  by construction. It was not that pages declined to use the system; **the system was
  missing two of the three surfaces it needed.**
- **They drifted, exactly as the nine private `Eyebrow` copies did (D57):**

  | | Spellings found in the wild |
  |---|---|
  | tinted background | `rgba(183,181,254, .05 / .07 / .10 / .15)` |
  | panel background | `#212830` · `#2E3848` · `#1C2330` |
  | tinted border | `rgba(183,181,254, .10 / .12 / .18 / .20)` |
  | corner radius | `0.75rem` · `0.875rem` vs `--radius-xl` `1.25rem` |

  `/program` hand-wrote `0.875rem` — that is `--radius-lg` — against `.card`'s
  `1.25rem`, **a 6px corner difference**. `/little-dodo` hand-wrote white plus
  `1px solid rgba(14,14,18,0.08)`, character-for-character what `.card` provides.
- **⚠️ `variant="panel"` emits `.on-dark` itself, and that is half the point.** The
  `.on-dark` trap has fired **five** times (navbar, mobile drawer, `PreCtaBand`, six
  page heroes, `PartnersClient`). A surface that paints its own dark ground now carries
  the hook by construction, so it cannot fire again *from a panel*.
- **Count the right thing.** A **panel** is one element with both an inline background
  and an inline border: there were **33**. A **section band** — a `<section>` with a
  background and no border — is a legitimate page-level surface, and there are **56**.
  Do not migrate section bands; they are not what drifted.
- **⛔ THE GUARD IS THE ACTUAL FIX — `scripts/check-surfaces.mjs`.** Extraction alone
  expires: D57 consolidated the eyebrows, and the surfaces had *already* drifted in
  parallel without anyone noticing. The guard runs as `prebuild`, so Cloudflare enforces
  it. It is a **ratchet**: the 31 remaining panels are recorded in
  `scripts/surface-baseline.json` and tolerated; counts may fall freely, never rise.
  Migrate a page, run `npm run check:surfaces -- --update`, commit the smaller baseline.
- **Migration queue** (31 panels, highest first): `PartnersClient` 5, `about` 4,
  `methodology` 3, `compare` 2, `consult` 2, `demos` 2, `navigators` 2, `program` 2,
  and one each in `lexile`, `AssessmentClient`, `StreamVideo`, `UnderConstruction`.
  Each is independently verifiable against its own contrast baseline, so this lands in
  small commits rather than one risky sweep.


**Target size — WCAG 2.2 SC 2.5.8 (D61 · v6.15).** Interactive targets are at least
**24 × 24 CSS px**. Enforced on the footer link class in `components/layout/Footer.jsx`.

- **The failure was chrome, so it was everywhere.** Footer links rendered **20px tall**
  (two at 16px): **22 of 25 failed**, on all 47 routes — on the order of a thousand
  instances from one declaration.
- **The fix moves nothing.** `inline-flex` + `min-h-[24px]` + `min-w-[24px]`. The gap
  between links was already 20px, so the hit area grew into space that already existed:
  **footer height is unchanged** (2244px EN / 2165px ZH, before and after).
- **⛔ `min-h-6` does not exist in this project.** Tailwind is pinned at **3.3.3**, and
  the `min-h-*` spacing scale only arrived in 3.4. It silently computed to `0px` —
  class present, no effect. **Use the arbitrary value `min-h-[24px]`.** Verify a
  Tailwind utility actually resolves before trusting it; a missing utility fails silent.
- **Width matters as much as height.** Short labels fail on the horizontal axis:
  `FAQ` measured **23.2px** wide and still failed after the height fix. Hence `min-w`.
- **The Inline exception is why the site is now conformant.** SC 2.5.8 exempts targets
  "in a sentence or otherwise constrained by the line-height of non-target text". The
  remaining sub-24px targets are all prose links (`methodology`, `Lexile`, `Or email us
  directly`). They are **exempt, not outstanding.**
- **Still below the 44px *recommendation*** (Apple HIG / Material, guidance not WCAG):
  the mobile hamburger at **40×40**. It clears 24 comfortably. Worth raising on its own
  merits as the most-tapped control on mobile.


**Hand-rolled eyebrows conformed, and D70's count corrected (D71 · v6.25 — BUILT).**

- **44 hand-rolled uppercase labels triaged; only 9 were eyebrows.** Those went to
  `Eyebrow` (`/blog` ×3, `/credentials` ×3, `/faq` hero, `PartnersClient` ×2). The other
  **35 are not labels at all** — stat values, form field labels, nav items, step weeks,
  comparison column headers, "Featured"/"Most Popular" badges. D54 gives the quote to a
  CLAIM; putting it on a form field would say the wrong thing. They were deliberately
  left alone. **A blanket sweep here would have been the wrong fix.**
- **⚠️ D70's "46 → 0" was wrong.** Its detector matched text as a *direct child* of the
  rounded element. Six pills nested their text one level deeper — the `/program`
  "Most Popular" badge, three Navigator identity chips (`/program`, `/demos`,
  `/consult`), and two `PartnersClient` chips that never appear in prerendered HTML
  because the page is client-gated. Re-counted with an HTML parser instead of a regex:
  **now genuinely 0.** Fourth instance of the same lesson — *the detector's blind spot
  is the bug's hiding place.*
- **`/credentials` was styled with tokens that do not exist.** Three of its eyebrows set
  `color: var(--accent-lavender-deep)`, which is **undefined**, so the colour was
  inheriting. Converting them to `Eyebrow` fixed those three by removing the reference.
- **Type floor:** "Most Popular" was **9px** in a filled lavender capsule — filled
  control-coloured chrome on a non-control, reading as a button. Now run type at 12px.

**⚠️ OPEN — six undefined custom properties, all on `/credentials`:**
`--accent-lavender`, `--accent-lavender-deep`, `--divider`, `--ink`, `--ink-deep`,
`--ink-soft`. That page is written against a token vocabulary this system never defined,
so those colours inherit rather than resolve. It ships that way today. The right values
are a design call — `--ink-deep` is probably `--text-heading`, `--ink-soft` probably
`--text-muted` — so they are reported rather than guessed. Also undefined: `--z-nav`
(globals.css) and `--color-border` (`AudiobooksGate`).

**Pills are retired (D70 · v6.24 — BUILT).** 46 text-bearing capsules → 0.

**Why.** The v6.x system is a drawn hand — the D-o bracket, the lead-in quote, the
swash, the brush divider, the marked score. A bordered capsule is generic UI-kit chrome
from the language that preceded all of it, which is why these read as dated next to
everything around them. Removing them finishes the D53–D58 transition instead of adding
a seventh device to it.

Three roles, three different answers:

- **Label pills → plain `Eyebrow`.** The capsule went, nothing replaced it. Already the
  dominant pattern — 14 quoted labels sat under the one pill on `/program`.
- **Taxonomy capsules → `TagRun`** (`components/ui/TagRun.jsx`, `.tag-run`). The capsule
  was doing one real job: making a row of values read as a SET. A middot run keeps that
  grouping with typography instead of chrome. D58's budget rule — one drawn device per
  section — forbids giving each tag its own mark.
- **`/faq` filters → the D55 swash.** The last place a pill did real work, because a
  filter genuinely needs a selected state. The swash already means *"press this ONE"*,
  which is exactly what a chosen filter is, so this reuses the system's device rather
  than inventing a seventh. No D-o bracket: D53b excludes utility chrome.

**What the first sweep missed, and why.** A `rounded-full` scan found 46 pills and
declared victory. It could not see `.badge`, which uses `border-radius: var(--radius-pill)`
— six more label pills on `/`, `/methodology`, `/results`, `/lexile`, `/cities/[city]`
and `/blog/[slug]`, including the template behind all 20 city pages. **Third time this
exact shape of miss has appeared** (D65's inline gilt, D69's pill eyebrows, now
`.badge`): a sweep matches one spelling, and the escapees wear another.

**Type floor.** Six sites moved off sub-12px — the `/program` step badge was **8px**.
`.tag-run` sets 0.75rem as its own floor so the pattern cannot reintroduce them.

**⚠️ Regression caught during the close-out, worth remembering.** The capsule's tinted
background had been carrying the label's contrast. Removing it drops every converted
label onto its section ground, and three hero eyebrows needed `dark` as a result.
**A contrast probe that walks up to a `backgroundColor` cannot judge these heroes** —
they layer a dark `<img>` over a Whisper ground, so the probe reports 1.75:1 for labels
that are plainly legible. Those readings are false positives; the heroes were verified
by eye. Do not trust a computed-ground number on a photographic hero.

**Still open — 46 hand-rolled uppercase labels** across the site (`/credentials`,
`/blog`, `AssessmentClient`, `PartnersClient`, `ConsultForm`, Navbar and others). Not
pills, so out of scope here, but the same drift D57 set out to fix: the `/faq` hero
eyebrow is a bare `<div>` with no quote while `❝ THE PROGRAM` sits directly beneath it.
Most are not eyebrows at all (form labels, table headers), so this needs triage before
any sweep.

**The hero eyebrow pills finally carry the quote (D69 · v6.23 — BUILT).**
Reported from a phone as "the brackets in the hero still seem outdated." They were.

- **Four pages hand-rolled a *pill* eyebrow**: `/program`, `/little-dodo`, `/demos`,
  `/consult`, each a `<div className="inline-flex … rounded-full">` holding a **1.5px
  bullet dot** and a styled `<span>` at 10px / 600 / 0.07em.
- **D57 swept those same four pages and missed these.** Its header names compare /
  consult / demos / little-dodo / navigators / program among the nine copies it
  replaced — but it replaced each page's **plain** eyebrow. The pill variant was a
  different shape, so the sweep did not match it. Result: every one of those pages
  carried D54-quoted labels throughout **and a pre-D54 dotted label at the very top**.
  On `/program` that is 14 quoted labels sitting under one dotted one — which is
  exactly why the hero read as stale while the rest of the page did not.
- **The dot is gone.** A pill is a label, and D54 says a label is introduced by the
  lead-in quote. The mark now comes from `.label-quote`, like every other label.
- **Type deliberately unchanged.** The pill has always run 10px / 0.07em against the
  canonical `.eyebrow`'s 12px / 0.12em. Migrating to canonical type would have resized
  four heroes; this fix is about the marker. The quote is scaled to 15×9px so it does
  not overpower 10px text. ⚠️ **That 10px remains part of the open sub-12px type floor.**
- **`Eyebrow` gained a `pill` prop** rather than the pages gaining more inline styles —
  the same structural argument as D57. There is now one place to change, so a fifth
  copy cannot appear by accident.

**Note on how this was found.** Two earlier reports against a
`d9a5409f.…pages.dev` URL were dismissed as a stale deployment — correctly for the
*colour*, since that build predates D68. But the *marker* was genuinely wrong the whole
time, on production too. A frozen preview URL is a real trap, and it is also a very
easy way to explain away a real bug. Check the live origin before concluding staleness.

**Gilt leads the conversion section (D76 · v6.30 — BUILT).**
The reservation is retired. Gilt is no longer a semantic escrow held for a Charter
Enrolment CTA — it is a **positional** signal: it marks which control leads.

- **The rule.** A section with exactly one lead (`.btn-do-primary` / `.btn-do-charter`)
  paints that control's swash gilt. A section with none, or with two co-equal controls,
  takes no gold. **The unit is the `<section>`** — the same unit D58's budget rule
  already uses, and the one the built output supports: measured before writing this,
  **97.4% of sections already held exactly one lead** (368/378), against 92% for a
  nearest-common-ancestor grouping. The rule was mostly already true; this names it.
- **Gold is never text (retires `--text-gilt-light` / `--text-gilt-dark`).** Gilt rides
  *under* the label as the D55 swash, where it is decorative — WCAG 1.4.11 does not
  apply — so `#F5C842`'s 1.59:1 on white never has to clear a text floor. The label
  keeps its own accessible colour. This is what makes the rule buildable on the light
  half of the site at all: the footer is Whisper, and a gilt *label* there is illegible.
- **The measurement already existed.** The D55 comment forbidding a gilt swash recorded,
  parenthetically, that "gilt survives the label test to 38% — it is the reservation,
  not the contrast, that rules it out." D76 retires the reservation, so that measurement
  became the whole answer. The lead ink is gilt at 30%, inside the measured ceiling.
- **The fork exception, which the data found.** Two sections had two leads: the age-band
  chooser on the home page. Those controls are co-equal by design — the chooser asks
  *which child you have*, it does not ask you to press one. A fork has no lead, so
  `.btn-do-fork` keeps both on the deep lavender `.btn-do-primary` used to carry.
  `AgeBandChooser` is marked fork on **every** page, including `/program` and
  `/little-dodo` where only one band renders: it is wayfinding either way, and
  wayfinding is the exact third meaning D68 took gilt away from.
- **Eight sections have no lead at all** (home, EN + ZH) — "View all results →",
  "Visit DODO Coding →". They are wayfinding too, and correctly take no gold. "The lead
  of every group" would have put gilt on them; "the lead of a *conversion* section" does
  not. That distinction is D76's whole precision.
- ⚠️ **The premise of D52 and D68 was false, and had been for five months.**
  `.btn-do-charter` was described as having **zero call sites in five separate places** —
  §14.11, D68's entry, `Button.jsx:28`, the `--text-gilt-light` comment, and this guide's
  gilt section. It had been rendering on `/lexile`, `/methodology` and `/results` since
  **2026-03-19** — six controls, EN + ZH. Its label was `#C49400`, **2.56:1 on Whisper**:
  failing AA text *and* the 3:1 non-text floor, live, on three conversion pages. D68's
  token correction reads as pre-emptive and was in fact an unwitting repair of a shipped
  a11y failure. Every sweep missed it because the call sites are a **variant map**
  (`Button.jsx`), not markup — and every sweep read markup. Fourth false completeness
  claim; same shape as D65, D69, D71 and D73.
- **`check-gilt-escrow` was inverted, and regression-tested both ways.** It no longer
  asks "is gilt on a control" — gilt on a control is now correct. It reads the emitted
  CSS, classifies each gilt rule by the **property** the colour lands in (a
  `background-image` is a swash and legal; anything else is paint and is not), then
  asserts one lead per section over `out/`. Verified in both directions: injecting gilt
  as a label colour fails with the control named; promoting a second lead into a section
  fails with both labels named. Both exit 1.
- **Known coarseness, stated rather than discovered later:** a control outside every
  `<section>` falls back to `<body>`, so all such controls on a page share one bucket.
  No page currently has two section-less leads, so this is safe today — by luck, not by
  design. If it ever reports a `<body>` section with two distant leads, wrap them in real
  sections rather than loosening the guard.
- **The honest cost.** D68's "gilt has exactly one job" ends. Gold now has two: *earned
  proof* (a drawn mark, `--gilt-mark` `#AD8100`, on an unpressable number) and *lead
  action* (a swash, under a pressable one). They are separated by device and by target,
  and D58's one-drawn-device-per-section budget is the structural firewall that stops
  them co-occurring. That is a weaker guarantee than D68 had. It is not the
  three-meanings-is-decoration state D52 was written to end.

**Gilt has exactly one job now: earned proof (D68 · v6.22 — BUILT).**
> ⤴ **AMENDED by D76** — the "never a control" half is retired; gilt marks the lead
> control of a conversion section. The earned-proof mark (`--gilt-mark`) is unchanged
> and still Live. The "zero call sites" claim below is **false** — see D76.

Gilt was not rare, it was *unused*. `.btn-do-charter`, `.badge-gilt` and `.text-gilt`
were all fully specified with **zero call sites**, while gilt actually rendered in ten
places as hand-rolled inline hex. That is why D52's reservation could be violated six
times unnoticed (D65) — nothing countable was ever using it.

- **The rule: gilt marks what was earned; it never marks a control.** D52 keeps gold off
  every control so that Charter Enrolment still means something when it exists. A gold
  mark on something unpressable cannot be confused with "press this", because the
  grammar already gives that to the D-o bracket. **One** new meaning, not several —
  three meanings is decoration, which is how it was spent last time.
- **`--gilt-mark` `#AD8100`.** Neither existing gold could do the job: raw `#F5C842` is
  **1.59:1 on white** and `--text-gilt-light` was **2.77:1**. `#AD8100` measures
  **3.55:1 white · 3.28:1 Whisper · 5.43:1 Void Black** — clearing 3:1 on both grounds,
  so a single baked data-URI serves every surface. Exactly the property that made
  `--do-mark` `#7c79e8` cheap to roll out in D53.
- **`.score-marked` was stroked in the control colour.** It used `#7c79e8` — the same
  hex and the same monoline hand as the D-o bracket — around a Lexile score. By this
  system's own grammar that circle said *press this* about a number. It now says
  *earned*, which is what a score is.
- ⚠️ **`--text-gilt-light` was a latent a11y bug.** `#C49400`, commented "passes AA",
  measures **2.56:1 on Whisper** — failing AA text and even the 3:1 non-text floor. The
  `.btn-do` table's claim of "gilt 4.6:1" was wrong. Nothing shipped it, because
  `.btn-do-charter` and `.badge-gilt` have no call sites — but **the Charter CTA would
  have launched with a failing label on day one.** Corrected to `#8F6B00` (4.54:1
  Whisper / 4.92:1 white). A reserved class that fails on arrival is worse than a
  slightly deeper gold; overrule this if the lighter tone matters more.
- **The hero chips were a third meaning.** They used gilt for *wayfinding* — "the other
  age band" — alongside "enrolment" and now "earned proof". Moved to
  `--color-lavender-signal`, which reads as navigation, so they need no D-o bracket
  either: **D65's open question closes with them, and the D66 allowlist is now empty.**

**ZH is set in LXGW WenKai GB, and Latin leads the stack (D62 + D67 · v6.21 — BUILT).**

- **D62 shipped as a flag, exactly as D63 promised.** `npm run fonts:cjk --
  --source=lxgw-wenkai-gb`. No pipeline rewrite; the generator takes the font as a
  parameter.
- **One thing the plan did not anticipate: WenKai is not variable.** Noto Sans SC ships
  a single file covering 300–700. WenKai ships separate 25 MB statics, so the generator
  gained multi-weight support and now emits **tiers × weights**: 10 files, **726.3 KB**
  against Noto's 436.5 KB. That is the real price of the typeface — still a third of the
  1,090 KB the hosted Noto cost, but it gives back most of D63's margin. Worth knowing
  before anyone treats the swap as free.
- **Bold resolves rather than synthesises.** Medium is declared `font-weight: 500 700`,
  so weight 700 lands on the real Medium cut instead of a smeared synthetic bold. D62
  accepted the missing bold; this picks the less ugly way to not have it.
- **⚠️ D67 — a regression D63 introduced, found while checking D62's Latin trap.** The
  generated subset is CJK-only, and it was leading `--font-cjk`. Latin inside Chinese
  copy therefore missed it and fell through to the first family that *does* carry Latin
  — the platform face. Measured: `Reading Thinking Lexile MCT` set **436.26px, byte-identical
  to PingFang SC**, against **380.29px** in Source Sans 3. The same words in a different
  typeface depending on locale: **exactly the split D59 exists to fix**, reintroduced by
  the very change that was supposed to be invisible. The Latin family now leads the
  stack, injected from `app/[locale]/layout.jsx` because next/font hashes the name at
  build time. Verified back to 380.29px. **The lesson: subsetting a CJK face to CJK-only
  silently changes what happens to the Latin sitting next to it.**

**The gilt reservation is now enforced (D66 · v6.20 — BUILT).**
D52 reserved gilt for Charter Enrolment in v6.6. Between then and v6.19 the guide
recorded gilt as "used nowhere" **three times**, while six gilt-filled consult CTAs
shipped continuously. The reservation was real; the enforcement never existed.

- **`scripts/check-gilt-escrow.mjs`, wired to `prebuild`.** Any interactive
  `<Link>`/`<a>`/`<button>` carrying `#F5C842`, `rgba(245,200,66,…)`, `--color-gilt` or
  a gilt utility class fails the build. `.btn-do-charter` — the one sanctioned use — is
  exempt, and still has no call sites.
- **It catches the inline case, which is the whole point.** The three previous sweeps
  matched class names; all six escapees were inline styles. This matches the *rendered
  colour*, not the spelling of a class.
- **The error names the fix**, including the `.on-dark` hook a hand-rolled dark section
  needs — the D53 trap that would otherwise turn each conversion into a contrast bug.
- **Two allowlist entries**, each with a reason and the condition that retires it: the
  `/program` and `/little-dodo` hero chips, pending the design decision about what an
  interactive chip wears. An allowlist without an expiry is just a slower way of losing
  the rule.
- **Scope is controls only.** Decorative gilt (`/about`'s gradient headline, accent dot
  and pull-quote; the `/compare` SVG) is deliberately unchecked — D52 reserves gilt on
  *conversion controls*, not the colour's existence. Widen this if that intent changes.

**The `btn-do` sweep is actually finished now (D65 · v6.19 — BUILT).**
v6.9 and v6.12 both recorded that the last non-`btn-do` CTA was gone. **Neither was
true.** Six conversion CTAs were still painted gilt:

| Surface | Ground | Was |
|---|---|---|
| `/navigators` S8 | `SectionWrapper darker` | gilt fill + gilt glow shadow |
| `/blog` S8 | `#212830` (`on-dark`) | gilt fill |
| `/compare` S9 | `#0E0E12` (`on-dark`) | gilt fill, 280px min-width |
| `/faq` ×2 | `#F5F5FF` **and** `#212830` | gilt fill |
| `/assessment` | `#0E0E12` | gilt fill |

- **Why every sweep missed them.** The sweeps swapped *classes* — `btn-secondary`,
  `btn-solid`, `btn-charter`. These six carried no button class at all: they were
  `<Link>`s with `style={{ backgroundColor: '#F5C842', … }}` inline. A grep for retired
  class names cannot see an inline hex. Same failure shape as the nine private
  `Eyebrow` copies (D57) and the 33 hand-rolled panels (D60): **hand-rolled markup
  escapes a system sweep, every time.**
- **They also broke D52.** Gilt is reserved for Charter Enrolment. D53b states plainly
  that it is "currently used nowhere" — but it was used on six consult CTAs, which is
  precisely the "gilt spent sitewide" contradiction D52 was written to resolve.
- **All six are consult/diagnostic CTAs**, so per D53b they become `.btn-do-primary`,
  not `.btn-do-charter`. Charter still has no call site, correctly.
- **The D53 dark-ground trap fired exactly as predicted.** `FAQClient` and
  `AssessmentClient` were named in v6.9 as painting dark grounds with no `.on-dark`
  hook. Converting their CTAs would have put an ink label on near-black. Both sections
  got the hook; neither contains white cards, so the v6.7 `/program` failure does not
  repeat. Measured after: 7.84–17.78:1 across every `.btn-do`, zero failures.
- ⚠️ **Still open — the two interactive gilt chips.** `/program` and `/little-dodo`
  heroes carry a cross-link chip (`<Link>`, gilt border + 6% gilt ground + gilt text,
  10px uppercase). They are **controls**, so D53b's scope says they take the bracket —
  but a 22px D-o against a 10px chip is absurd, and the guide's grammar has no third
  category between "control" and "non-interactive pill". **This needs a design
  decision, not a mechanical fix.** They are the last two gilt users on the public site.

**The Latin preload covers only what the site uses (D64 · v6.18 — BUILT).**
`lib/fonts.js` declared `subsets: ['latin', 'latin-ext']` with `preload: true`, which
forced **183.3 KB on every route**, EN and ZH alike.

- **latin-ext was used by nothing.** Measured across every HTML file and every client JS
  chunk in the export: **zero** latin-ext characters. The comment justifying it cited
  diacritics in student and Navigator names — but those accents (é ü ñ á) are
  U+00C0–00FF, inside `latin`. latin-ext is Central/Eastern European and pinyin macrons.
  116.6 KB per route to render nothing.
- **Dropping a subset cannot cause tofu.** The `subsets` array controls *preloading*
  only; all seven Google subsets stay declared with their `unicode-range`, so an
  unexpected character still renders — the browser just fetches that chunk on demand.
- **10.7 KB is a next/font bug, knowingly left.** When `style` includes `italic`,
  next/font 16.2.6 also preloads the **cyrillic-ext italic** face. `preload` is per-call,
  not per-subset, so suppressing it means either giving up real italic (faux-oblique on
  every `<em>`) or routing italic to a second family behind an `[style*="italic"]`
  selector. Both are worse than 10.7 KB. Recorded in `TOLERATED` in the guard so that if
  it is ever fixed upstream — or a second spurious file appears — the build says so.
- **Result: 183.3 → 66.6 KB per route.** Guarded by `scripts/check-font-preload.mjs` on
  `postbuild`, regression-tested both ways.

**CJK is served from a generated frequency-tiered subset (D63 · v6.17 — BUILT).**
The hosted Noto Sans SC declared **303 `@font-face` rules / 13.2 MB**, split by Unicode
block. A Chinese page pulled 23 of those chunks — **1,090 KB, measured cold on
/zh/faq**. Now: 5 chunks, **437 KB for the entire site's Chinese**, every weight
included.

- **Frequency, not Unicode block.** Block-splitting is what caused the bug: a page's
  characters scatter across many blocks, so it fetches many chunks. Ranked by frequency
  the top 150 characters cover **64.5%** of all Chinese character instances on this
  site, the top 400 cover **89.7%**. Chunks: `chrome` (5 glyphs, 2.3 KB) · `t1` (150,
  38.2 KB) · `t2` (250, 61.3 KB) · `t3` (400, 105.4 KB) · `t4` (768, 229.3 KB).
- **One file per chunk, not per weight.** The source is a **variable** font, so a single
  chunk serves the whole 300–700 scale. This is where most of the win comes from — the
  hosted version shipped every range three times, once per weight.
- **The English side was never the problem.** An EN route downloads **0 KB of CJK**,
  before and after. The 中文 switcher resolves through the platform CJK face; it is now
  *also* available from a 2.3 KB chunk. The 183 KB an EN page does load is all Source
  Sans 3 — a separate matter, untouched here.
- **Guarded on both sides of the build.** `prebuild` scans source (fast, catches new
  copy); `postbuild` scans the emitted export, which is the only pass that can see
  glyphs from **client-only components** (the `/ops` tools render entirely client-side —
  146 characters appear in no prerendered HTML) and glyphs shipped by **dependencies**
  (html2canvas/jsPDF carry 壹 貳 參 萬 and katakana). Source scanning alone would have
  shipped a subset missing ~140 real glyphs.
- **The subset covers punctuation.** ，。、：；！？“” and the fullwidth forms are CJK-face
  glyphs. Subsetting only U+4E00–9FFF would have dropped every comma in the ZH copy.
- **Regenerate with `npm run fonts:cjk`**, then commit `public/fonts/cjk/`,
  `scripts/cjk-manifest.json`, `lib/cjk-preload.json` and `styles/cjk-fonts.css`. The
  guard tells you when it is due; you do not have to remember.
- **D62 rides on this.** The generator takes the source font as a parameter, so the
  WenKai swap is a `--source` flag plus a regeneration, not a rewrite.

**ZH adopts LXGW WenKai; EN does not (D62 · v6.16 — DECISION LOGGED, NOT YET BUILT).**
Admin approved a Chinese-side typeface adaptation to **LXGW WenKai GB**, covering ZH
body copy as well as headings. **The English side stays on Source Sans 3.**

- **The argument.** 楷体 is the script Chinese children are taught to write — the model
  script in 语文 instruction, the one 字帖 copybooks use. The English chrome is already
  a school-cursive hand (D53's D-o, D54's quote, D55's brush). Kai is that register in
  the other script, so the two locales express the same idea in their own hands.
- **⚠️ A concern was raised and overruled, deliberately.** Kai is calligraphic and
  low-contrast; at the 13–14px the site runs a great deal of, it is measurably harder
  to read than a gothic, and the family has **no true Bold** (Light / Regular / Medium
  only) against a type scale using 300–700. The recommendation was display-only. **Admin
  accepted this trade for the ZH side.** Recorded here so the reasoning is not
  rediscovered as a bug: weight 700 will synthesise or fall back to Medium.
- **⛔ Subset CJK-ONLY — no Latin glyphs.** WenKai carries Latin (inherited from Klee
  One). If those ship, Latin inside Chinese copy renders in WenKai while the same words
  on the English site render in Source Sans 3 — **exactly the split D59 was created to
  fix**. Excluding Latin from the subset makes it fall through to Source Sans 3 and
  keeps D59 intact. It is also cheaper.
- **Use the GB edition.** Default WenKai carries traditional-leaning forms; GB follows
  PRC standard shapes.
- **Measured cost** (`fonttools`, real files, v1.520):

  | Subset (CJK-only, no Latin) | Regular | Medium |
  |---|---|---|
  | 1,033 chars — all CJK in current ZH copy | **229.8 KB** | **224.8 KB** |
  | 3,802 chars — GB2312 level-1, copy-proof | 859.3 KB | 847.4 KB |

- **⛔ THE REAL FINDING, AND IT IS NOT ABOUT WENKAI.** A cold English page —
  `/credentials`, which contains **5 unique hanzi** — downloads **24 font files,
  1,197 KB** (verified with `cache: 'no-store'`, not a cache artefact). Cause: Google's
  CJK chunks are ~60–75 KB each and split by unicode-range, so a handful of scattered
  hanzi pulls one chunk **per range per weight**. Five glyphs × 3 weights ≈ 15 chunks.
  **English visitors pay ~1 MB for the logo, the 中文 switcher and a footer tagline.**
- **Therefore: the 1.2 MB is a SUBSETTING problem, not a typeface problem.** Adopting
  WenKai fixes it only because adopting it forces self-hosting with a content subset.
  **The same ~600 KB saving is available on Noto Sans SC today, with no typeface change
  at all.** Judge WenKai on the brand argument; do not credit it with a win that belongs
  to subsetting.


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
   **Also exclude `sr-only`**: it is 1×1px and clipped, so a `width < 1` test lets it
   through. That alone invented a 1.52:1 "failure" on `/faq` that does not exist.
3. **Texture overlays are not grounds.** `/blog`'s hero paints a 1px dot pattern
   (`radial-gradient(circle, #b7b5fe 1px, transparent 1px)`) at `opacity: 0.08`
   over `#F5F5FF`. A detector that reads the first hex out of a positioned overlay's
   `background-image` will call the ground solid Lavender Signal and report 3.06:1
   where the real value is 5.36:1. Require the overlay's own `opacity` to be high
   before treating it as the ground.

4. **Low-opacity decorative lettering.** `/navigators` sets a 280px `NAVIGATOR`
   watermark at `opacity: 0.04`, `aria-hidden`. A scanner that only excludes
   `opacity: 0` reports it at 1.75:1. At 4% it is a texture, not text, and carries
   no information — exempt. Factor ancestor opacity before flagging.

5. **A collapsed viewport silently invalidates the whole run (added v6.10).** If the
   audit runs in a browser pane that is hidden or zero-width, `innerWidth` is 0 and
   every `getBoundingClientRect()` comes back 0-wide. Nothing errors. Layout-dependent
   checks (does this backdrop *cover* the element?) then fail everywhere, and the run
   reports scores of impossible failures — a 36px heading at 1.05:1. During the D54
   inspection this produced ~200 phantom failures before it was caught.
   **Set an explicit viewport and assert `innerWidth` before trusting any number.**
   Gradient parsing matters here too: trap 1's backdrops carry their colour in
   `background-image: linear-gradient(...)` with `background-color: transparent`, so
   the ground must be composited from the gradient's own stops, not read off
   `backgroundColor`. Treat `repeating-`, `radial-` and `conic-` as texture, not ground.

All five traps inflate the failure count. Confirm any surprising result against the
section's actual declared background before acting on it.

**The reliable regression check is a baseline diff, not an absolute score.** The site
carries a standing population of failures (the sub-12px type floor below, ~271 nodes
across 21 pages). Chasing "0 failures" against that backdrop tells you nothing about
your own change. Instead: `git stash` the change, run the identical scanner over the
same pages, unstash, and diff the **failure signatures** (text + ratio) and `.btn-do`
pass counts page by page. That is how D54 was cleared — 12 mark-bearing pages, byte-identical
signatures before and after. Pages containing none of the classes you touched cannot
be affected and do not need the round trip.

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

**Typeface pairing (D59 · v6.14 — supersedes D51).** Two faces, one per script:
**Source Sans 3** (Latin) and **Noto Sans SC** (CJK). There is no display face.

- **⛔ D51's display pair is RETIRED.** Literata + Noto Serif SC were piloted on
  **one `<h1>`, on `/methodology`**, and never completed or reverted. All four families
  were attached to `<html>`, so the site shipped **546 `@font-face` declarations and
  ~1.69 MB of fonts on a ZH page** to set that one heading. The methodology hero simply
  read as the odd page out — which is exactly how it was reported.
- **Source Sans 3 replaced DM Sans to fix a real bug, not for taste.** Noto Sans SC
  **is** Source Han Sans, and its Latin glyphs are **Source Sans**, scaled to 115% to
  sit beside Chinese. Pairing it with DM Sans meant Latin inside Chinese copy rendered
  in Source Sans while **the same words on the English site rendered in DM Sans** —
  measured at **122px vs 119px** for `Lexile 187 DODO` at 16px. Two Latin designs for
  one brand, split by locale. Source Sans 3 is the face the CJK font was drawn beside.
- **⚠️ Hard-coded font stacks are a real hazard here.** The swap broke nine call sites
  that named `"DM Sans"` literally — `AudiobooksGate`, three `/ops` loaders, and ten
  SVG `<text fontFamily>` attributes in `compare` and `AssessmentClient`. Inline stacks
  now use `var(--font-latin)`; the SVG attributes were **removed** so the text inherits
  the cascade (including `:lang(zh)`). **Never name a font family literally.**
- **⛔ Google Fonts ships only NINE Simplified-Chinese faces, and just two are
  multi-weight** (Noto Sans SC, Noto Serif SC). ZCOOL XiaoWei is single-weight; the
  other six are single-weight handwriting/display. **Any real change to the CJK face
  means self-hosting.** Do not plan a CJK type change assuming Google Fonts has options.
- **If a display face is wanted again:** pilot it **with a written expiry date**, and
  prefer one covering *both* scripts so it replaces two families rather than adding two.
  LXGW WenKai (霞鹜文楷, OFL) is the standing candidate — 楷体 is the script Chinese
  children are taught to write, which is the same argument as the school-cursive D-o.


**Declaring a dark surface (v6.7) — `.section-dark` is a *background*, `.on-dark` is a *hook*.**
Every dark-surface text rule (headings, `p`, links, `.eyebrow`, `.badge-lavender`,
`.text-gilt`) keys off a class. Three pages hand-rolled their own dark heroes with
positioned image/gradient backdrops and carried none of those classes, so they opted
out of the entire dark-surface system and rendered light-surface tokens on near-black.

- `.section-dark` / `.section-darker` — paint a background **and** opt into the hooks.
- `.section-hero-short` — is dark, and was previously excluded from every hook. Now included.
- **`.on-dark`** — marker only: the text hooks, **no background, no padding**. Put it on any
  section that paints its own ground. `/results`, `/methodology` and `/lexile` now carry it.
- ⚠️ `.section-hero` is **LIGHT** (`--color-whisper` + lavender glow), despite the stale
  "dark hero" wording once in `SectionWrapper`. Do not treat it as a dark surface.

**When you build a section that is dark but not `.section-dark`, add `.on-dark`.**
Otherwise its eyebrows, badges and links silently fall back to light-surface colours.

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

> **Status for every decision, both logs, in one table:**
> [`docs/decision-index.md`](../docs/decision-index.md). Check it before assuming a
> decision here is still current — several rows in this table were superseded by a
> later row that said so in its own cell and nowhere else.

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
| D44 | Redesigned Three Brand Truths | Visual brief **resolved by D74**. Truth 2's rule existed but was unlabelled; Truth 3's device was already shipping against a ⛔ that appeared to forbid it; Truth 1 needs no device — it is a positioning instruction, not a visual one | ✅ v6.28 |
| D46–D50 | Home, About, Methodology, Program, Compare reworked to v5.1 + §08 voice | Copy-side cascade; chrome unaffected. Re-audit contrast after these ship | n/a here |
| D51 | Display typeface — Literata + Noto Serif SC, **display-only** | Type pairing section added; `--font-display` / `--font-display-cjk` tokens; per-surface rollout | ⤴ superseded by D59 |
| D52 | **Filled buttons are surface-specific** (option B) | `.btn-solid` added (deep lavender + white) for light surfaces; button rule now states text *and* boundary contrast; gilt reservation resolved · ⤴ **reservation retired by D76** | ✅ v6.6 |
| D53 | **The D-o bracket on funnel CTAs** | `DoCta` component + `.btn-do`; `--do-mark` token | ⤴ superseded by D53b |
| D53b | **Option B — bracket is the control chrome, no fills** | 40 class swaps; hierarchy by weight; gilt to label; marks via CSS pseudo-elements; 73 controls verified | ✅ v6.9 |
| D54 | **The lead-in quote on claim labels** | `.label-quote` + baked data-URI; 27 labels marked; badge chrome dropped where marked; taxonomy labels excluded; guillemet rejected on a bilingual test | ✅ v6.10 |
| D55 | **The highlighter swash on the primary control** | `.btn-do-primary` background-image; `#7c79e8` at 30%; content-box anchored; restores a third hierarchy tier without a fill | ✅ v6.11 |
| D56 | **Swash on every control, tiered by ink weight** | `.btn-do` pale `#b7b5fe` @26%, `.btn-do-primary` deep @30%; gilt rejected (D52 reservation); last non-`btn-do` CTA retired | ✅ v6.12 |
| D57 | **One canonical `Eyebrow` component** | Nine local copies consolidated; 50 more labels gain the D54 quote; weight/tracking/margin drift corrected; `.eyebrow:lang(zh)` tracking added | ✅ v6.12 |
| D58 | **The drawn hand past the button** | `.divider` + `.accent-top` redrawn; `.quote-glyph`; language-aware `q` (fixes ZH testimonial marks); `.score-marked` on outcomes only; `.check-list` defined-unused; budget rule set | ✅ v6.13 |
| D59 | **Source Sans 3 + Noto Sans SC; D51 display pair retired** | Fixes Latin-face split across locales; drops 2 families, 546 `@font-face`, ~1.69 MB on ZH; 9 hard-coded stacks removed | ✅ v6.14 |
| D60 | **`Surface` primitive + build guard** | `.surface-tinted` / `.surface-panel` added — the system was missing 2 of 3 surfaces; `panel` emits `.on-dark`; `check-surfaces.mjs` ratchets on `prebuild` | ✅ v6.14 |
| D61 | **Target size 24×24 (WCAG 2.2 SC 2.5.8)** | Footer link class: `inline-flex` + `min-h-[24px]` + `min-w-[24px]`; 22 of 25 links were 20/16px on every route; footer height unchanged; `min-h-6` is not generated by Tailwind 3.3.3 | ✅ v6.15 |
| D62 | **ZH adopts LXGW WenKai GB; EN stays Source Sans 3** | **BUILT v6.21.** GB edition v1.522, CJK-only subset via the D63 pipeline — a `--source` flag, as designed. Static font, so 2 weights: Regular 400 + Medium declared `500 700` so bold RESOLVES to Medium rather than synthesising. 726.3 KB across 10 chunks (vs Noto's 436.5 KB variable) — the cost of no variable axis | ✅ v6.21 |
| D63 | **CJK served from a frequency-tiered local subset** | Hosted Noto (303 `@font-face`, 13.2 MB declared) replaced by 5 generated chunks, 437 KB total across the whole 400–700 range (variable font). ZH page CJK **1,090 → 437 KB** measured cold; EN unchanged at 0 KB. `check-cjk-coverage.mjs` guards `prebuild` **and** `postbuild`. Fixes a dead `<link rel=preload>` that 404'd on every ZH page | ✅ v6.17 |
| D64 | **Latin preload trimmed to the subset actually used** | `subsets: ['latin','latin-ext']` → `['latin']`. latin-ext usage across the whole export: **zero characters**; it cost 116.6 KB of forced preload per route. EN font payload **183.3 → 66.6 KB**. `check-font-preload.mjs` ratchets it on `postbuild`. Remaining 10.7 KB is a next/font 16.x bug (spurious cyrillic-ext italic preload), tolerated with reason | ✅ v6.18 |
| D65 | **The `btn-do` sweep finished — 6 inline-styled gilt CTAs found** | v6.9/v6.12 claimed "the last non-`btn-do` CTA is gone"; **that was false.** Six gilt-filled consult CTAs (`/navigators`, `/blog`, `/compare`, `/faq` ×2, `/assessment`) used inline `backgroundColor: '#F5C842'` and were invisible to a class-based sweep. Converted to `.btn-do-primary`; `.on-dark` added to the two hand-rolled dark sections the D53 note predicted. Zero contrast failures. 2 interactive gilt chips remained — **that open question was answered by D68** | ✅ v6.19 |
| D66 | **The gilt reservation is enforced, not just written down** | `check-gilt-escrow.mjs` on `prebuild`: gilt on any interactive control fails the build. D52 reserved gilt in v6.6 and three later sweeps each declared the job done while six gilt CTAs shipped — a reservation nobody enforces quietly expires. 2 hero chips allowlisted with a stated retirement condition | ✅ v6.20 |
| D67 | **The Latin face leads the CJK stack** | Fixes a regression D63 introduced: a CJK-only subset at the head of `--font-cjk` meant Latin inside Chinese copy missed it and fell to PingFang/YaHei. Measured: "Reading Thinking Lexile MCT" set **436.26px in PingFang vs 380.29px in Source Sans 3** — the D59 split, reintroduced. Latin now leads; verified back to 380.29px | ✅ v6.21 |
| D68 | **Gilt gets one job: earned proof** | `--gilt-mark` `#AD8100` added — the one gold clearing 3:1 on both grounds, so one baked colour serves every surface. `.score-marked` restroked from `--do-mark` lavender to gilt, fixing a grammar bug where the *control* mark circled an unpressable number. Hero chips gilt → lavender-signal (wayfinding, not conversion) — which closes D65 and empties the D66 allowlist. **Also fixes `--text-gilt-light`: it claimed "passes AA" at 2.56:1** | ✅ v6.22 · ⤴ amended by **D76** (gilt may mark a control again; the earned-proof mark is untouched) |
| D69 | **The hero eyebrow pills finish the D57 sweep** | `/program`, `/little-dodo`, `/demos`, `/consult` each hand-rolled a *pill* eyebrow as `<div>` + 1.5px dot + styled `<span>`. D57 consolidated those same four pages' PLAIN eyebrows and missed the pills — so each page carried quoted labels throughout and a **pre-D54 dotted label at the very top**. `.eyebrow-pill` + `pill` prop on `Eyebrow`; dot replaced by the D54 quote | ⤴ superseded by D70 |
| D70 | **Pills retired sitewide** | 46 capsules → 0. Label pills → plain `Eyebrow`; taxonomy capsules → `TagRun` (middot run, `components/ui/TagRun.jsx`); `/faq` filters → D55 swash as the selected state. `.badge`/`radius-pill` cases were invisible to a `rounded-full` scan and had to be found separately. Six sub-12px sites raised to 12px. D69's `.eyebrow-pill` superseded after one version | ✅ v6.24 |
| D71 | **Hand-rolled eyebrows conformed; the last 6 pills found** | 44 hand-rolled uppercase labels triaged: **9 were genuine eyebrows** → `Eyebrow`; the other 35 are stat labels, form fields, nav items and badges and correctly keep no quote. D70's "0 pills" was **wrong** — its detector needed text as a direct child, missing 6 nested ones. Now 0, verified with a parser. Retires 3 uses of the **undefined** `--accent-lavender-deep` | ✅ v6.25 |
| D72 | **`/credentials` token aliases + cohesion retrospective** | Six custom properties used by `/credentials` were **never defined**, so every colour there inherited — shipped that way. Aliased to canonical tokens by role (best-guess at the time). `--z-nav` / `--color-border` carry fallbacks and were never broken. Findings + permanent-fix proposal in [`docs/architecture-cohesion-proposal.md`](../docs/architecture-cohesion-proposal.md) **RESOLVED 2026-09-01:** all six mappings verified against the live render — each resolved to exactly its canonical counterpart (`--ink-deep` #212830 = `--text-heading`; the source link #5856cc = `--text-accent`, 5.36:1 on Whisper). The 19 call sites were migrated onto canonical tokens and the alias block deleted, so the page now has one vocabulary and `check-tokens` covers it | ✅ v6.26 · closed v6.30 |

| D73 | **The guards read the built output; every `var()` must resolve** | Closes the two root causes in [`architecture-cohesion-proposal.md`](../docs/architecture-cohesion-proposal.md) §3.1–3.2. `check-surfaces` and `check-gilt-escrow` gain a `--build` pass that PARSES `out/` (new `scripts/html-parse.mjs`) instead of scanning source; the gilt pass resolves gilt class rules out of the emitted CSS, so gilt arriving through a class name the source pass never heard of is now caught. New `check-tokens.mjs` fails the build on any bare `var(--x)` with no definition — the D72 defect, in ~30 lines. Found on its first run: **`.skip-link` paints `var(--color-gilt)` on all 114 routes**, invisible to the source pass by construction. Allowlisted with a stated retirement condition, pending an owner ruling | ✅ v6.27 |

| D74 | **The ⛔ on gauges governs the ladder, not outcome proof** | Closes D44's open visual brief. `LexileBar` (5 routes) and the `/results` trait bars are `role="progressbar"` devices that had been shipping since long before the ⛔ was written, while D44 Truth 3 requires a specific number on every conversion page — the rule and the code contradicted each other on the home page. Narrowed rather than enforced: the test is **whose number it is** — a measured outcome a family owns, yes; a visitor's own standing, no. Also labels brief item 2 as Truth 2's rule and adds the **Speaking strand**, which §02 calls the moat and the brief had omitted. **No code changed** | ✅ v6.28 |

| D75 | **`.badge` retired at the definition, not just the call sites** | The tail of D70/D71. Those two removed every rendered pill but left the *definitions* standing: `components/ui/Badge.jsx` with **zero call sites**, dead `import Badge` in five pages (`blog/[slug]`, `cities/[city]`, `lexile`, `methodology`, `results`), and 8 CSS rule blocks (`.badge`, `.badge-lavender`, `.badge-lavender-dark`, `.badge-neutral` ×2, `.badge-gilt`, `.badge.label-quote`, `.text-gilt`). All deleted. **`.badge-gilt` was the one real question** — keep it for the Charter enrolment CTA that does not exist yet (§14.11, `btn-do-charter`)? Deleted: D52 is the record of the gilt reservation and `check-gilt-escrow` enforces it, so re-adding a rule when a Charter CTA finally exists is cheaper than carrying a dead one every future sweep must re-triage | ✅ v6.29 |

| D76 | **Gilt leads the conversion section — the reservation is retired** | Gilt becomes **positional**, not semantic: the single lead of a conversion `<section>` takes a gilt swash; a section with no lead, or a co-equal **fork**, takes none. `<section>` is the unit — 97.4% of them already held exactly one lead (368/378) before the rule was written. **Gold is never text**: `--text-gilt-light` / `--text-gilt-dark` deleted, the swash carries the colour where it is decorative and 1.59:1-on-white cannot fail. D55 had already measured that gilt survives the label test to 38%; only D52 blocked it. New `.btn-do-fork` keeps the age-band chooser on lavender (wayfinding, per D68). ⚠️ **`.btn-do-charter` was called unused in FIVE places and had shipped since 2026-03-19 on 3 pages × 2 locales, with a 2.56:1 label for five months** — fourth false completeness claim, invisible because its call sites are a variant map, not markup. `check-gilt-escrow` inverted: classifies gilt by the CSS *property* it lands in, asserts one lead per section, regression-tested both ways | ✅ v6.30 |

| D77 | **D57 finished — the eyebrows declared in `content/`, not markup** | D71 triaged 44 hand-rolled uppercase labels and reported **9 genuine eyebrows, 35 correctly left alone**. Incomplete: it read `app/` and `components/`, so it could not see labels **declared as `eyebrow:` in `content/marketing.{en,zh}.js`** and hand-wrapped by page code. Nine more converted — `/about`, `/lexile` ×2, `/methodology` ×3, `/results`, `PreCtaBand`, `AgeBandChooser` — spelling tracking as `[0.15em]` and `widest` on top of D57's original four, and one already hand-adding `label-quote`. Canonical `.eyebrow` **362 → 390**; hand-rolled instances **1,374 → 1,346**; distinct strings **160 → 140**. `/results`'s dark eyebrow moves off `rgba(183,181,254,0.5)` to the full signal (~4:1 → 10.1:1). Measured by `npm run conformance`, which exists so the next such claim is a number | ✅ v6.31 |

| D78 | **The inline-style ratchet — the supply side** | Closes [`architecture-cohesion-proposal.md`](../docs/architecture-cohesion-proposal.md) §3.3, the last unbuilt proposal and the one it called highest-leverage: every defect in the D63–D72 run lived in an inline style, where it is invisible to a class sweep and to a token rename. `check-inline-style.mjs` counts inline declarations that set **colour or typography** (layout is deliberately out — the system does not define it centrally, so inline layout bypasses nothing) and ratchets them down. Two passes on the `check-surfaces` contract: source on `prebuild` per file, build on `postbuild` per route. **957 source / 8,753 build** — the proposal guessed "around 300", so it was 3× low, and that guess had read like a measurement for two days. `style={{…}}` is brace-matched, not regexed (D71 lost to a regex that assumed structure). Regression-tested both directions on both passes. Eleven guard passes now run on a build | ✅ v6.32 |

| D79 | **Three rulings: gilt off the skip link, the tagline exempted, charter folded in** | The three calls D76 left open, decided together. **(a)** `.skip-link` moves from gilt to `--color-lavender-signal` — both clear AAA on Void Black (12.13:1 vs 10.14:1), so the a11y case never required gold, and a carve-out would have put an asterisk on the rule for a control almost nobody sees. **`check-gilt-escrow`'s allowlist is now empty**, and the guard resolves 5 gilt CSS rules → 1. **(b)** The D36 tagline is exempted from `.eyebrow`'s uppercase via a `sentence` prop + `.sentence-case`, at the five sites that render it (/program, /consult, /demos hero chips; navbar mobile; footer). Scoped rather than dropping `text-transform` sitewide, which would move 390 elements and re-open the 0.12em tracking tuned for caps. ZH was never affected — `text-transform` does nothing to CJK, which is itself the argument that the casing was presentational. **(c)** `.btn-do-charter` folded into `.btn-do-primary` and deleted — class, both component entries, 3 call sites, the dark-ground override. Since D76 they painted identically, and all three call sites pointed at `/consult`: the class reserved for "Charter Enrolment" was never once used for enrolment | ✅ v6.33 |

| D80 | **The mobile drawer was never actually inert** | `Navbar.jsx` passed `inert={!mobileOpen ? '' : undefined}` — correct for React <18.3, which had no knowledge of `inert` and passed the empty string through as a bare attribute. React now knows it is a boolean and reads `""` as **false**, so it emitted nothing: **`inert` appeared 0 times in the built HTML**, on all 114 routes. The closed drawer was `aria-hidden="true"` with **17 focusable links still in the tab order** — focusable content hidden from assistive tech, a WCAG failure rather than a lint warning. Fixed to `inert={!mobileOpen}`; the built output now carries `aria-hidden="true" inert=""`. **React had been logging this in the console the entire time.** Found only because a dev-overlay badge appeared in a screenshot taken for something else — no guard reads console warnings, and none of the eleven would have caught it | ✅ v6.34 |

| D81 | **The hero scrims were one composition, copied — not an opacity problem** | Step C of the C→A ruling. The `rgba(14,14,18,α)` family looked like 22 alpha steps needing a scale; it was **two compositions used as a pair on nine heroes**, a third used mid-page three times, and **three hand-tuned near-copies that had drifted** with nothing on the page to say which was canonical. Extracted to `.hero-scrim` · `.hero-vignette` · `.band-scrim`, each carrying its own `position`/`inset` so the call site is `<div aria-hidden="true" className="hero-scrim" />` and no inline style survives. `PartnersClient`'s drifted pair (`.97/.93/.70/.30` + vignette `.90→32%`) converges on the canonical values — it is gated, so it renders in a client chunk and never in prerendered HTML, which is also why nothing caught the drift. **Ratchet: source 956 → 933 (−23), build 8,751 → 8,709 (−42 = 21 rendered × 2 locales).** The nine canonical heroes are byte-identical — same stops, same order, same `aria-hidden`, verified by computed style. `StreamVideo`'s 3-stop video overlay is a genuinely different job and stays inline. **Order was the point:** defining the alpha scale first would have enshrined `.97` and `.98` as palette steps when they are gradient stops | ✅ v6.35 |

| D82 | **Three alpha scales, not one ramp — and the grey folded** | Step A of the C→A ruling. 51 distinct alpha values across three colours collapse to **14 tokens in three scales**, because the families do different jobs: `--platinum-60/70/80/90` (**all 89 uses are `color:`** — the floor is at .60 because that is where AA holds on Void Black, Deep Void *and* Midnight; nothing below is a step, it is a defect), `--lavender-08/15/25/40/60/80` (decoration only), `--ink-08/15/30/45` (light-ground tints — only four needed because D81 took the high end out with the scrims). `#94A3B8` (31 uses, no token, 7.51:1 vs `--text-muted-dark` 7.57:1) folded — **32 occurrences**, all text. 47 exact-match declarations migrated onto the scales; text migrates only at or above its family floor, so nothing sub-floor was tokenised. ⚠️ **Two of my own measurement errors are recorded in the plan**: an unanchored skip regex silently excluded `components/layout/` from every ad-hoc scan, and lavender was *assumed* decorative without checking — **66 of its uses are text and 59 fail AA**. Re-measured on the rendered DOM: **105 failing text nodes across 10 of 12 public pages**, `aria-hidden` correctly excluded. That defect is deliberately **not** in this decision | ✅ v6.36 |

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

**Done in v6.15 (2026-08-29) — D61:**

- [x] Footer links raised to the 24×24 minimum; verified 22 → 0 failures, EN and ZH.
- [x] Footer height unchanged; no horizontal overflow introduced.
- [x] Remaining sub-24px targets confirmed **exempt** under SC 2.5.8's Inline exception.
- [x] Build green: exit 0, 122 pages / 45 routes, surface guard green.


**Done in v6.14 (2026-08-29) — D59 + D60:**

- [x] D51 retired: Literata + Noto Serif SC removed, `.font-display` deleted,
      `/methodology` h1 back on the site face.
- [x] DM Sans → Source Sans 3; 9 hard-coded `"DM Sans"` stacks fixed or removed.
- [x] `Surface` primitive + `.surface-tinted` / `.surface-panel` + surface tokens.
- [x] `/program` and `/little-dodo` panels migrated (the two pages reported).
- [x] `scripts/check-surfaces.mjs` wired to `prebuild`; baseline 31; regression-tested.
- [x] Build green: exit 0, 122 pages / 45 routes.


**Done in v6.13 (2026-08-29) — D58:**

- [x] `.divider` and `.accent-top` redrawn as brush strokes (card height preserved via
      a transparent border, not a padding swap).
- [x] `.quote-glyph` replaces the decorative 48px mark on `/compare`.
- [x] Six inline `&ldquo;…&rdquo;` pairs converted to `q`; `q:lang(zh)` yields 「」.
      Verified live on `/zh/results`. `AgreementTool`'s legal quotes left untouched.
- [x] `.score-marked` live on exactly two numbers, both content-flagged.
- [x] `.check-list` defined, no call sites (no list deserves it yet).
- [x] Budget rule recorded: one drawn device per section, two on a hero.
- [x] Build green: exit 0, 122 pages / 45 routes.


**Done in v6.12 (2026-08-29) — D56 + D57:**

- [x] Swash widened to every `.btn-do`; tiers now read as ink weight (pale vs deep).
- [x] `/cities/[city]` `btn-secondary` retired — ~~the last non-`btn-do` CTA on the site~~
      **(incorrect — 6 inline-styled gilt CTAs remained; see D65 / v6.19).**
- [x] Nine local `Eyebrow` definitions replaced by `components/ui/Eyebrow.jsx`;
      **50 additional section labels** now carry the D54 quote.
- [x] `.eyebrow:lang(zh)` tracking rule added (0.06em).
- [x] `AssessmentClient`'s nine call sites marked `dark` to preserve its dark-only default.
- [x] Build green: exit 0, 122 pages / 45 routes.
- [x] Contrast unchanged against baseline: program 36=36, consult 23=23, demos 38=38,
      faq 1=1, /zh/ 7=7; little-dodo improved 8 → 7. Navigators 0 failures.
      All newly quoted labels pass; every `.btn-do` passes.


**Done in v6.11 (2026-08-29) — D55:**

- [x] `.btn-do-primary` swash added — baked `#7c79e8` at 30%, `background-origin:
      content-box`, inset 25px / 21px below 640px.
- [x] Geometry verified across all three padding variants (10 / 20 / 24px): **3px
      clearance from the mark, 4px overshoot before the label**, EN and ZH.
- [x] Build green: exit 0, **122 static pages / 45 routes**.
- [x] Zero contrast regressions against a stashed baseline; every `.btn-do` still
      passes on every page, both grounds, desktop and 375px.
- [x] Secondary and charter deliberately untouched.


**Done in v6.10 (2026-08-29) — D54:**

- [x] `.label-quote` added to `styles/globals.css` (`@layer utilities`, placed *below*
      the `.on-dark .badge-lavender` overrides so the chrome-strip wins on equal
      specificity). Opening quote as a `::before` data-URI, `#7c79e8` baked.
- [x] Applied to **27 claim labels** across 8 files — 5 hero badges, 22 section eyebrows.
- [x] Badge fill + border + side padding dropped wherever the mark lands.
- [x] Taxonomy labels deliberately excluded (blog category, Navigator credential chips,
      6+1 trait tags, card-level eyebrows, 404 eyebrows). See the scope table above.
- [x] Build green: exit 0, **122 static pages / 45 routes**.
- [x] **49 marks across 21 pages, all 49 rendering.** 0 vertically centred,
      0 keeping a pill border, 0 on an interactive element, 0 `.btn-do` quoted.
- [x] **Zero contrast regressions.** 12 mark-bearing pages were audited against a
      stashed baseline of the same commit: identical failure signatures, identical
      ratios, identical `.btn-do` pass counts. Every `.btn-do` passed on every page,
      EN and ZH, desktop and 375px. The other 9 pages carry no `.label-quote`, and
      the D54 rules are all scoped to that class, so they cannot be affected.
- [x] The remaining site-wide failures are the **sub-12px type floor** already logged
      as an open gap — pre-existing, unchanged by D54, and still out of scope.
- [x] Mobile: mark shrinks to 16x10 below 640px. The home hero label is 7px
      **narrower** than before (dropping the 28px pill padding beats the 21px mark),
      so D54 slightly reduces the pre-existing nowrap clipping there.


**Done in v6.9 (2026-08-29) — D53 option B:**

- [x] `.btn-do` rewritten as CSS pseudo-elements; 40 class swaps across 22 files.
- [x] All filled pills retired from call sites. Hierarchy is weight + label colour.
- [x] **`.on-dark` added to five more surfaces the earlier sweeps missed** — the
      navbar `<header>`, the mobile drawer (which sits *outside* the header), and
      the `/program`, `/consult` and `/demos` heroes. Each paints its own dark
      ground. The navbar case rendered a primary label ink-on-void at **1.0:1**.
      **This trap has now bitten four times. Treat “does this surface paint its own
      dark ground?” as the first question when adding any control.**
- [x] Verified: 73 controls across 13 page/viewport combinations, EN + ZH,
      1280px and 375px — zero contrast failures, zero failing controls.

**Done in v6.8 (2026-08-29) — D53:**

- [x] `DoCta` component + `.btn-do` + `--do-mark` token.
- [x] Applied to 9 funnel CTAs: home hero, `/program` hero, `/demos` hero,
      `/consult` hero, `/little-dodo` hero + close, `/credentials`,
      `/methodology`, and the global `PreCtaBand` secondary.
- [x] Deliberately NOT applied: audiobook transport controls, navbar drawer,
      404 recovery links, and the home page's exploratory links.

**Done in v6.7 (2026-08-28) — closing the open items:**

- [x] `.on-dark` hook added; `/results`, `/methodology`, `/lexile` custom heroes now
      participate in the dark-surface system. `.section-hero-short` folded into every
      dark rule (it was excluded from all of them).
- [x] `.badge-lavender` hardcoded `#5856cc` (the light label colour) — 3.32:1 on Void
      Black. Now switches to Lavender Signal on dark surfaces. `.badge-lavender-dark`
      already existed and nothing used it.
- [x] `LexileBar` had a `light` prop that switched labels and numbers but **not** its
      three hardcoded `#b7b5fe` accents — 12 failing nodes on `/results` alone (6 cards
      × 2). Accent now follows `light` (`#5856cc`, 5.80:1).
- [x] `/program` step numerals: no single text colour passes on all four loop accents
      (white is 1.90:1 on `#b7b5fe`, near-black 3.32:1 on `#5856cc`), so the numeral
      colour is now paired per accent. Raised 9px → 12px; the 22px circle allows it.

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
