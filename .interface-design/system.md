# DODO Learning — Interface Design System

Living reference for the DODO marketing site chrome (navbar, footer, funnel CTAs).
Read this before touching navigation, CTAs, or the pre-footer band. Last set during
the v6.0 "funnel swap" (June 2026).

---

## Direction & feel

A live, Navigator-led English literacy brand for globally-mobile families. The chrome
should feel **calm, editorial, and credible** — not SaaS, not ad-tech. Whisper-quiet
structure; color carries meaning, never decoration. Bilingual (EN/ZH) from one copy
source; every visible string lives in `content/marketing.{en,zh}.js`, never hardcoded.

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
  fields marked with a `*` in lavender `#7c79e8`; optional fields left unmarked.
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

| Role | Token / value |
|---|---|
| Dark canvas (navbar, dark sections) | `#0E0E12` |
| Dark conversion band | `#212830` |
| Light surface (footer, light sections) | `#F5F5FF` |
| Text on dark (primary) | `#F0F0F0` |
| Brand lavender — accent on dark | `#b7b5fe` |
| Brand lavender — AA-safe text on light | `#7c79e8` (never `#b7b5fe` as text on light) |
| Brand lavender — deep | `#5856cc` |
| Gilt / gold accent (badges, `btn-gilt`) | `#F5C842` |
| Body text on light | `#3D4452` |
| Muted text | `#7B8494` / `#94A3B8` |
| Borders | `rgba(183,181,254,0.10)` family (low-opacity lavender) |

**Buttons — accessibility rule (WCAG AA: text ≥ 4.5:1, boundary ≥ 3:1):**
- **Filled primaries are surface-agnostic** (near-black text on a light fill): `btn-charter`
  (gold `#F5C842`, ~11.8:1 — firm close / Watch on light heroes) · `btn-primary` (lavender
  `#b7b5fe`, ~9.8:1 — Watch on dark heroes). Use either on any surface.
- **Outline secondaries are surface-SPECIFIC — this is the load-bearing rule:**
  - On **DARK** surfaces → `btn-ghost` (light-lavender text `#b7b5fe`).
  - On **LIGHT** surfaces → `btn-outline` (deep-lavender text `#5856cc`, ~5.8:1).
  - ⚠️ **Never `btn-ghost` on light** — `#b7b5fe` on white is ~1.8:1 (fails). No single text
    color passes on both black and white, so the secondary MUST match its surface.
- `btn-gilt` is a safety **alias of `btn-charter`** (it was once undefined → invisible). Prefer
  `btn-charter` directly. When adding a CTA, ask: filled or outline? and dark or light surface?

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
