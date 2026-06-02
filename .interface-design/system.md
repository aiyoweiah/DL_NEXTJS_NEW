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
   - Soft close: **Watch a Demo Class** / 观看示范课  → `/demos`
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

**Buttons:** `btn-charter` (primary), `btn-ghost` (secondary outline), `btn-gilt` (gold
primary, home hero), `btn-primary`. Pick by surface, keep one primary per surface.

**Spacing/layout:** `container-section` wrapper; section padding `var(--section-md)`;
pill badges `rounded-full`, buttons/cards `rounded-lg`. Breakpoints: `md:768`, `lg:1024`.

---

## Process guardrails (DODO-specific)

- **Content apply-gate:** never edit live copy/files until the user gives an explicit
  "apply" trigger. Propose in chat first.
- **Bilingual parity:** any EN copy change needs the ZH mirror in `marketing.zh.js`
  (brand-voice, not literal). Both files must `require()`-parse and `next build` clean.
- `next lint` is broken in this Next version — validate with `npx eslint <files>` and a
  full `npx next build` instead.
