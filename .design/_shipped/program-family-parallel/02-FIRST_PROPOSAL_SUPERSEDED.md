# Little DODO Visibility Elevation — Proposal

**Status:** Proposal only. Per the content apply-gate (`feedback_about_review_apply_gate`), no live files have been edited. The user must give an explicit "apply" trigger before any of these land.

**Date:** 2026-06-03
**Author:** Claude (design review)
**Companion doc:** `DESIGN_REVIEW.md` (same folder)

---

## The problem in one sentence

Little DODO shipped 2026-06-02 with a strong page, a sitemap entry, a Course schema, and a footer link — but **zero presence on cold top-of-funnel surfaces** (home hero, navbar, home above-the-fold), so a parent of a 5–8-year-old who lands on `dodolearning.com` sees only older-child framing and bounces before they ever discover the K–2 program exists.

## Constraints (load-bearing — every option below respects them)

1. **Flat 6-link navbar.** No 7th primary item, no dropdowns. Simplicity is a funnel asset (`system.md` §Navbar).
2. **One conversion moment per page.** PreCtaBand SUPPRESS rule.
3. **Funnel ladder.** Cold/exploratory surfaces lead with Watch (soft); warm surfaces lead with Consult (firm). No "Book a Free Assessment" framing.
4. **Bilingual parity.** Every EN copy change needs the ZH mirror in `marketing.zh.js`. Both files `require()`-parse and `next build` clean.
5. **Token discipline.** No new hex. Reuse the existing palette + section spacing protocol.
6. **Content apply-gate.** Propose in chat/dump; never edit live files until the user gives "apply."

---

## Options ranked by impact × cost

The five options compose. **A + B + C is the recommended package**; D is a cleanup that pairs with everything; E is a stretch goal.

### Option A — Rename nav label "ELA Program" → "Programs" *(low cost, medium impact)*

**What:** Change the navbar primary link label from singular to plural. The href stays `/program` (the family hub). A parent reads "Programs" and *expects to find more than one*, which sets up the AgeBandChooser on the destination page as a confirmation rather than a surprise.

**Files:**
- `content/marketing.en.js:53` — `{ href: '/program', label: 'ELA Program' }` → `{ href: '/program', label: 'Programs' }`
- `content/marketing.zh.js` — find the matching entry; change `阅读写作课程` (if that's the current ZH) to remain plural-neutral or shift to `都学课程`. Run through `dodo-content-writer` lint before locking the ZH string.

**Why this is light-touch:** the route, the page, the nav structure, the desktop CTA, and every existing test or link target stay untouched. It's a one-word semantic shift.

**Trade-off:** "Programs" is more generic than "ELA Program" — a parent loses the "ELA" disambiguator at the nav level. Two mitigations: (1) the `/program` page's H1 still says "16-Week Program" / Little DODO is named in the AgeBand, so the ELA framing returns on click; (2) the home hero copy already establishes the brand context.

**Open question (worth a writer call):** if "Programs" reads too generic in EN, an alternative is **"ELA Programs"** — keeps the disambiguator and gains plurality. Three more characters; still fits in the desktop bar with current `gap-4 lg:gap-8` spacing.

### Option B — Add `/little-dodo` to the mobile drawer "more" list *(minimal cost, low-to-medium impact)*

**What:** Add Little DODO as the first item of `nav.more` so it appears in the mobile drawer between the 6 primary links and the secondary "Lexile / Difference / FAQ / Blog / Partners" group.

**Files:**
- `content/marketing.en.js:60-66` — prepend `{ href: '/little-dodo', label: 'Little DODO (5–8)' }` to `more: [...]`.
- `content/marketing.zh.js` — mirror: `{ href: '/little-dodo', label: '都学启蒙（5–8 岁）' }`.

**Why:** mobile drawer is the only navigation a phone user sees. Right now, after they tap the hamburger and scan the list, Little DODO is absent — so the mobile user is in even worse shape than the desktop one. This single line restores parity with the footer and gives mobile users a direct entry point.

**Trade-off:** none meaningful. The mobile drawer was designed exactly for "secondary but discoverable" items.

### Option C — Add an AgeBand band to the home page *(medium cost, HIGHEST impact)*

**What:** Insert a new home page section between `ProofStrip` (the dark stats row) and `PhotoIntro` (the Navigator-is-a-map photo block). Two cards, same component family as the `/program` AgeBandChooser, sized down to a single home-page row. No "You're here" muting on home (neither band is current). Reuses tokens.

**Why between ProofStrip and PhotoIntro:**
1. The proof strip (300+, 1, 2×, 8/10) is *temperature-raising* — by the end of it the parent is curious. That's the moment to disclose "we have two paths".
2. PhotoIntro currently leads cold with the "teacher vs Navigator" framing — adding the band before it lets PhotoIntro read as "the 16-Week story specifically" rather than "the only story".
3. Section-spacing protocol (`system.md` §v6.2): ProofStrip is dark `#212830`, PhotoIntro is light `#ffffff`. Inserting a light `#F5F5FF` band between them gives the alternating-surface cadence the spec already prefers (dark → tinted → white).

**Proposed copy (EN, draft — pending `dodo-content-writer` lint):**

> **Eyebrow:** TWO PATHS, ONE METHOD
> **H2:** Built for the stage your child is in.
> **H2-ZH (optional):** 因孩子的阶段而设计。
>
> **Card 1 — Little DODO**
> - Tag: AGES 5–8
> - Name: Little DODO
> - Blurb: High-frequency, low-pressure reading and comprehension. The gentle start to English literacy.
> - CTA: Explore Little DODO → `/little-dodo`
>
> **Card 2 — The 16-Week Program**
> - Tag: GRADE 4+
> - Name: The 16-Week Program
> - Blurb: Live, Navigator-led literacy and writing — read complexity, argue with evidence, write with intention. Progress measured in Lexile.
> - CTA: See How It Works → `/program`

**Implementation:**
- Reuse `components/ui/AgeBandChooser.jsx` directly. It already takes `locale`, `copy`, and `current` — pass `current={null}` from the home page so neither card is muted. Today the component receives `copy.heading` and `copy.bands[]` from the existing `ageBands` export. No component change needed.
- New `homeAgeBand` export in `marketing.{en,zh}.js` OR — cleaner — extend `ageBands` with a `homeHeading` field and let AgeBandChooser pick `current ? heading : (homeHeading || heading)`. The latter keeps a single source of truth for the two cards.
- Place the section call in `app/[locale]/page.tsx` between lines 336 and 337 (between `<ProofStrip>` and `<PhotoIntro>`). Use `<SectionWrapper light>` if available, otherwise the section's own `bg-[#F5F5FF] py-[var(--section-md)]` matching AgeBandChooser's current style.
- **PreCtaBand impact:** none. Home is already in the SUPPRESS-NOT (= shown) list because home has no in-body firm close; the band is the close. Adding an AgeBand section above it doesn't introduce a second close — the AgeBand is a fork, not a CTA panel.

**Why this is the highest-impact change:** it puts Little DODO above the fold on the highest-traffic page in the site. The current home page has six sections of older-child credibility before the parent of a 6-year-old ever sees a path that addresses them. This collapses that to one section.

### Option D — Footer Program column header "Program" → "Programs" *(near-zero cost, low impact)*

**What:** Singular → plural in the footer column heading. Mirrors Option A; the two should land together so the chrome reads consistently.

**Files:**
- `content/marketing.en.js` — find `columns: { program: 'Program', resources: 'Resources', serving: 'Serving' }` (or wherever the footer column labels live) and update `program: 'Programs'`.
- `content/marketing.zh.js` — mirror.

### Option E — `/program` hero signals Little DODO above the stat rail *(medium cost, medium impact)*

**What:** Today the `/program` hero is "What happens in a 16-Week Program?" with a steamboat illustration — visually committed to the older-child story. A K–2 parent who clicked Programs and lands here sees nothing about Little DODO until they scroll past the stat rail.

**Two sub-options:**

**E1 — Small eyebrow chip next to the existing "THINK ONCE. IN BOTH LANGUAGES." chip:** "Ages 5–8? See Little DODO →" as a tiny right-aligned ghost link, same row.

**E2 — Move AgeBandChooser above the stat rail.** Currently the page order is Hero → StatRail (still inside Hero) → AgeBandChooser → Four-Skills section. Moving AgeBandChooser to render *before* the stat rail (or before the hero CTAs) makes the fork visible at first glance.

**Recommended:** E1 for now. It's reversible, low-design-risk, and doesn't break the hero's visual rhythm. E2 is a stronger fix but needs a layout pass.

**Note:** if Option C ships, the importance of E drops sharply — most K–2 parents will route via the home AgeBand band and skip `/program` entirely. Treat E as a secondary follow-up, not a blocker.

---

## Recommended package: A + B + C + D

| Option | Change | Files touched | Effort |
| --- | --- | --- | --- |
| A | Nav label plural | `marketing.en.js`, `marketing.zh.js` | ~5 min |
| B | Little DODO in mobile drawer "more" | `marketing.en.js`, `marketing.zh.js` | ~5 min |
| C | AgeBand band on home page | `app/[locale]/page.tsx`, `marketing.en.js`, `marketing.zh.js`; possibly small extension to `AgeBandChooser` | ~45 min + design review of copy |
| D | Footer column "Programs" | `marketing.en.js`, `marketing.zh.js` | ~3 min |

Total: a one-sitting change that lands a coherent chrome update plus the high-impact home-page insertion. All four respect the funnel ladder, leave the PreCtaBand rule intact, and require no token additions.

## What this does NOT propose

- **No dropdown menu in the navbar.** Honors the no-dropdown decision.
- **No 7th primary nav item.** Little DODO surfaces via the renamed Programs link → AgeBandChooser on `/program` (plus the mobile drawer "more" addition), not by inflating the primary row.
- **No new conversion CTA.** The AgeBand band is a *fork*, not a Watch/Consult panel. PreCtaBand remains the only conversion moment on home.
- **No reframe of the home hero H1.** The H1 stays as the 16-Week Program's lead message — that's the strongest cold-open the brand has for the older audience. The fix is to make the *other* path visible right after, not to compromise the hero itself.
- **No new color tokens or new component family.** Reuses AgeBandChooser, tokens, and the existing section cadence.

## Decision points for you

If you want to apply A + B + D immediately and treat C as a separate review (because C needs writer-grade copy via `dodo-content-writer`), that split is fine — A/B/D land as a single bilingual copy edit; C lands as a code + copy change.

If you want C's copy drafted to writer-grade before approving anything, the next step is to invoke `dodo-content-writer` with this proposal and the two card blurbs above.

If you want any of these reframed — different copy, different section position, different name change — say so before "apply" and I'll re-draft.
