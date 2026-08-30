# Cross-Page UX Flow Map

**Date:** 2026-06-03
**Purpose:** Visualize where a visitor can travel from each page. Highlight K-2 (Little DODO) edges that exist vs. those that are missing. Diagnose dead-ends and dropoff risks under the parallel-funnel model.

Notation:
- **→** an explicit `<Link>` from page A to page B that exists today.
- **⤳** an implicit edge via shared chrome (navbar / footer / PreCtaBand) — always available.
- **✗→** an edge that *should* exist under parallel-funnel but does not.
- **[K-2]** the edge serves the Little DODO audience.
- **[ELA]** the edge serves the older-band audience.
- **[both]** the edge serves both bands.

---

## The chrome (always available on every page)

```
Navbar.primary (desktop + mobile drawer):
  / → /program          [Programs label; ELA today]
  / → /methodology      [DODO Method]
  / → /results          [Results]
  / → /navigators       [Navigators]
  / → /audiobooks       [Reading Companion 🔒]
  / → /about            [About]
  /  → /demos           [Watch Demo Class — desktop CTA]
  /  → /consult         [Book Your Consultation — mobile drawer ghost only]

Navbar.more (mobile drawer secondary, hidden on desktop):
  / → /lexile, /compare, /faq, /blog, /partners
  ✗→ /little-dodo        [MISSING — needs Phase 4 add]

Footer.program column:
  → /program, /little-dodo, /methodology, /navigators, /results,
    /lexile, /compare, /assessment (coming soon)
  ✓ Little DODO IS here (second item). The footer is the ONLY chrome surface that surfaces both bands.

Footer.resources:
  → /about, /blog, /faq, /demos, /consult, /partners

Footer.serving:
  → /cities/vancouver, /richmond-bc, /markham, /toronto,
    /san-francisco-bay-area, /los-angeles

PreCtaBand (shows only on /, /faq, /partners, /assessment):
  → /demos (Watch primary), /consult (ghost)
```

---

## Body-link graph (explicit `<Link href>` from each page's body)

### Tier 1 — top of funnel

```
/  (home)
├─ /demos                  [hero soft close — both]
├─ /consult                [hero firm close — both]
├─ /navigators             [PhotoIntro cta1 — both]
├─ /results                [PhotoIntro cta2 — both]
├─ /methodology            [LoopSection cta — both]
├─ /results                [ParentTrust "View all" — ELA-coded]
├─ /program (via Confidence pillars)  [ELA]
└─ ✗→ /little-dodo         [MISSING]

/about
├─ /methodology            [Loop cta — both]
├─ /program                [Loop programLink — currently ELA-coded]
├─ /navigators             [WhoNavigatorsAre — both]
├─ /demos                  [ClosingStamp — both]
└─ ✗→ /little-dodo         [MISSING]

/program
├─ /methodology            [Loop section — both]
├─ /faq#enrollment         [Combinations — ELA-specific anchor]
├─ /navigators             [Session — both]
├─ /consult                [GetStarted — both]
└─ → /little-dodo          [AgeBandChooser — ✓ present]

/little-dodo
├─ /demos                  [hero + CTA — both]
├─ /consult                [hero + CTA — both]
└─ → /program              [AgeBandChooser — ✓ present]
```

### Tier 2 — method / credibility

```
/methodology
├─ /consult                [closing CTA primary — both]
├─ /program                [closing CTA secondary — ELA-coded today]
└─ ✗→ /little-dodo         [MISSING — Loop applies equally]

/lexile
├─ /consult                [closing CTA primary — both]
├─ /methodology            [closing CTA secondary — both]
└─ ✗→ /little-dodo         [MISSING — Lexile-deferred for K-2; deserves a callout]

/results
├─ /methodology            [Methodology callout cta — both]
├─ /consult                [FoundingFamily — both]
└─ ✗→ /little-dodo         [MISSING — even an "outcomes look different for K-2" note]

/compare
├─ /methodology            [s4 — both]
├─ /navigators             [s6 — both]
├─ /consult                [s9 primary — both]
├─ /program                [s9 secondary — ELA-coded]
└─ ✗→ /little-dodo         [MISSING — category arg holds for both]

/navigators
├─ /consult                [s8 — both]
└─ ✗→ /little-dodo         [MISSING — but harder; profiles are older-coded]
   ✗→ /program             [MISSING — sink page, no path back to programs]
```

### Tier 3 — conversion

```
/demos
├─ /consult                [AfterDemo cta — both]
└─ ✗→ /little-dodo         [MISSING — no K-2 demo videos]

/consult
├─ /program                [hero cta2 ghost — ELA-coded]
└─ ✗→ /little-dodo         [MISSING — consult should signal both bands]
```

### Tier 4 / 5

```
/faq
├─ (markdown links to /methodology, etc.)
└─ ✗→ /little-dodo         [MISSING — FAQ assumes one program]

/blog/*
├─ (markdown links — varies per post)
└─ ✗→ /little-dodo         [MISSING — both posts ELA-coded]

/cities/*
├─ → /consult              [city CTA]
├─ → /program              [city body — ELA-coded]
└─ ✗→ /little-dodo         [MISSING — diaspora K-2 audience invisible]
```

---

## Visual summary — the K-2 funnel today

```
                                         ┌─────────────────────────┐
                                         │  Footer (every page)    │
                                         │  → /little-dodo  ✓      │
                                         └─────────────────────────┘
                                                    ▲
                                                    │  (only path)
                                                    │
   ┌───┐    ┌───────┐    ┌─────────────┐    ┌──────────────┐
   │ / │    │ /about│    │/methodology │    │ /results     │
   └───┘    └───────┘    └─────────────┘    └──────────────┘
       \         \              \                \
        \         \              \                \
         no link   no link        no link          no link
            \         \              \                \
   ┌────────┐    ┌──────────┐    ┌──────┐    ┌──────────┐
   │ /demos │    │ /consult │    │ /faq │    │ /cities/*│
   └────────┘    └──────────┘    └──────┘    └──────────┘
       \              \              \              \
        no link        no link        no link        no link
            \              \              \              \
                       /little-dodo ◀── only reachable from footer + /program

   ┌──────────┐
   │ /program │ ──── AgeBandChooser ──▶ /little-dodo  ✓
   └──────────┘
        ▲
        │ (named "ELA Program" in navbar today; will become "Programs" plural)
```

**The funnel for a K-2 parent today is one of two paths:**
1. They scroll a long way on any page → footer → click "Little DODO (5–8)".
2. They click "ELA Program" in the navbar (a singular label) → land on `/program` (a singular-band hero) → scroll past hero + stat-rail to find the AgeBandChooser → click "Explore Little DODO".

Both paths require *discovery against a wall of older-band copy*. A parent of a 6-year-old who Googles "DODO Learning" and lands on `/cities/markham` or `/results` or `/methodology` may never scroll deep enough to find the K-2 path.

---

## What "parallel-funnel" should look like (target state)

```
                  ┌──────────────────────────────────────────────────┐
                  │  Chrome surfaces BOTH bands on every page        │
                  │  • Navbar primary: "Programs" → /program hub    │
                  │  • Navbar.more drawer: + "Little DODO (5–8)"    │
                  │  • Footer column: "Programs" plural;            │
                  │    Little DODO + ELA Program named as peers     │
                  └──────────────────────────────────────────────────┘
                                       │
       ┌───────────────────────────────┼───────────────────────────────┐
       ▼                               ▼                               ▼
  ┌──────────┐                  ┌──────────────┐                ┌─────────────┐
  │     /    │                  │  warm pages  │                │   /demos    │
  │  + Age   │                  │  acknowledge │                │  + K-2 row  │
  │  Band    │                  │  both bands  │                └─────────────┘
  │  band    │                  │  (callout)   │                       │
  └──────────┘                  └──────────────┘                       ▼
       │                               │                         ┌──────────┐
       └──────────────┬────────────────┘                         │ /consult │
                      │                                          │  serves  │
                      ▼                                          │   both   │
              ┌───────────────────────┐                          └──────────┘
              │  /program  (ELA Gr4+) │ ◀──── AgeBandChooser ───▶ /little-dodo  (5–8)
              │  (renamed in copy)    │       above the fold              │
              └───────────────────────┘                                   │
                                                                          │
                                            both pages converge ─────────▶ /consult
                                                                          (single pipeline)
```

Every cold and warm page acquires at least *one* of these:
- An AgeBandChooser block (home).
- A small text/callout that names the other band (Tier 2 warm pages).
- A genuine peer surface (demos K-2 row, navigators K-2 profile, faq K-2 category, cities K-2 mention).
- A renamed link (Tier 2 close CTAs → "Explore Programs" hub-style).

The consult pipeline stays single — the parallel-funnel decision means we don't fork the conversion. Both bands consult with a Navigator; the Navigator routes to the right band.

---

## Dropoff risk inventory (current state)

| Risk | Page where it materializes | Severity |
|---|---|---|
| K-2 parent bounces on home before seeing the fork | `/` | HIGH (highest traffic) |
| K-2 parent lands on a city page (diaspora SEO) and concludes DODO is only for older kids | `/cities/*` | HIGH (likely high search traffic) |
| K-2 parent watching demos sees only older-band sessions, loses confidence DODO can teach 6-year-olds | `/demos` | HIGH (the soft close fails the K-2 funnel) |
| K-2 parent searching the FAQ finds no K-2 questions, opens a Cal session unsure if their child fits | `/faq` | MEDIUM |
| K-2 parent reading /navigators sees only older-band Navigator profiles, doubts there's a K-2 Navigator | `/navigators` | MEDIUM |
| K-2 parent opens /results, sees only Lexile-heavy older results, can't gauge what success looks like for their child | `/results` | MEDIUM |
| K-2 parent reading a blog post sees "The 16-Week Program" branded as if singular, gets confused about whether Little DODO is the same thing | `/blog/*` | LOW |
| Schema/LLM crawlers see "The DODO 16-Week Program" as the canonical course name, mismatching the new bilateral architecture | `lib/schema.js` | MEDIUM (affects GEO + AI-search discovery) |

The proposal in `06-PROPOSAL.md` addresses these risks in priority order.
