# Phase 2 Audit — Per-Page Findings

**Date:** 2026-06-03
**Lens:** Parallel funnel (both age bands must surface on every warm page) + the "16-Week Program → ELA Program" rename + the **Grade 3+ band boundary** (was Grade 3+ pre-2026-06-03 — see `00-NAMING_MODEL.md`).
**Coverage:** Tier 1+2+3 (11 pages) + /faq + Tier 4+5 sweep + infra (schema + llms.txt + sitemap).

> **Status:** Audit only — no live files edited. Edits will be proposed in `06-PROPOSAL.md` after the cross-page flow map in `05-FLOW_MAP.md`.

---

## Headline numbers

- **"16-Week" occurrences in `content/`:** 207, across 8 files.
- **"16-Week" occurrences in `lib/schema.js`:** 11. Canonical Course schema name today is "The DODO 16-Week Program".
- **"Little DODO" occurrences across all 20+ marketing page files:** 1 (the `/little-dodo` page itself).
- **AgeBandChooser usages:** 2 (`/program`, `/little-dodo`). Not present on `/`, `/about`, `/methodology`, `/results`, `/compare`, `/navigators`, `/demos`, `/consult`, `/faq`, `/lexile`, `/cities/*`, `/blog/*`.
- **Pages with an in-body close + on PreCtaBand SUPPRESS list:** about, program, methodology, lexile, results, navigators, compare, demos, consult, blog, cities, audiobooks, privacy, terms, little-dodo.
- **Pages where PreCtaBand shows (no in-body close):** home, faq, partners, assessment.

The numbers tell the headline story: the back-end ontology already encodes two bands (Course schema `littleDodoCourseSchema()` exists, llms.txt names both, sitemap includes both at high priority). The **front-end copy** does not. Every visible string assumes the older band is *the* program, and the rare reference to "Little DODO" appears only on its own destination page and in the footer column. The chrome leaks the family architecture; the body copy doesn't.

---

## Tier 1 — Top-of-funnel / cold

### `/` (home)

| Aspect | Finding |
|---|---|
| Hero framing | "English mastery at the cognitive level. Bilingual depth as the natural outcome." Eyebrow: "FOR CHILDREN WHO WILL THINK AND LEAD IN ENGLISH AT THE HIGHEST LEVELS." Subline: "We train English Thinkers — children who read above grade level, argue with evidence, write with precision." **Entire above-the-fold is older-band-coded.** No K-2 signal. |
| Section spine | Hero → ProofStrip → PhotoIntro → LoopSection → ConfidenceSection ("One grade level…sixteen weeks") → ParentTrustSection. **6 sections, 0 K-2 surface.** |
| In-body close | None. PreCtaBand shows (the "See a real class before you decide" band with Watch + Consult). |
| Internal links out | `/demos`, `/consult`, `/navigators`, `/results`, `/methodology` (Loop CTA), `/program` (via Confidence pillar links). **No `/little-dodo` link anywhere.** |
| "16-Week" hits | "After 16 Weeks" eyebrow (Confidence card 3). |
| "Little DODO" hits | 0. |
| Parallel-funnel gap | **Critical.** Highest-traffic page. K-2 audience invisible. Needs the AgeBand band insertion (the central proposal). |

### `/about`

| Aspect | Finding |
|---|---|
| Hero framing | "Think Once. In Both Languages." with brand identity focus. Voice is older-coded but more universal than home. |
| Section spine | Hero → TheNameSection → WhatWeBelieve (4 pillars) → TheLoop → WhoNavigatorsAre → ByTheNumbers → FamiliesWeServe → ClosingStamp. **8 sections.** |
| In-body close | Yes — ClosingStamp ends with `btn-charter` → `/demos` (soft close). On SUPPRESS list. |
| Internal links out | `/methodology` (Loop CTA), `/program` ("programLink"), `/navigators`, `/demos` (closing). **No `/little-dodo`.** |
| "16-Week" hits | None on page itself (handled via marketing.en.js `about` slice — needs grep verification). |
| "Little DODO" hits | 0. |
| Parallel-funnel gap | **High.** "The Families We Serve" section names three family archetypes ("High-Standard Home" / "Global Family" / "Ambitious Learner"). All three are older-coded. K-2 families are structurally absent from "the families we serve" — implicit message: we don't serve you. **Fix recommendations:** (1) add a fourth family card "The Early-Reader Home" (K-2); OR (2) reframe one existing card as age-spanning; OR (3) follow the WhoNavigatorsAre / ByTheNumbers / FamiliesWeServe block with a small "Two programs, same Navigators" callout that links to both `/little-dodo` and `/program`. Option (3) is least invasive. |

### `/program`

| Aspect | Finding |
|---|---|
| Hero framing | H1: **"What happens in a 16-Week Program?"** Subline: "Live, one-on-one with dedicated Navigator. English literacy and writing for students around the world. Grounded in MCT gifted teaching framework plus The LCS System covering Reading, Thinking, Speaking, and Writing." |
| Section spine | Hero → AgeBandChooser (current="/program") → LoopSection → JourneySection → ArchitectureSection (LCS strands) → CombinationsSection (Summit / Core / Flex 1-3) → SessionSection → GrowthSection → GetStartedSection. |
| In-body close | GetStartedSection — `btn-charter` → `/consult`. SUPPRESS. |
| Internal links out | `/methodology`, `/faq#enrollment`, `/navigators`, `/consult`. AgeBandChooser links to `/little-dodo`. |
| "16-Week" hits | Heavy. Including the H1, the Course schema, the Combinations footer note ("Each combination runs for one 16-week cycle"). |
| "Little DODO" hits | 1 (the AgeBandChooser card name). |
| Parallel-funnel gap | **Critical** for rename. This page IS the older band's deep page; per the naming model it should be renamed wholesale "ELA Program". H1 → "What happens in the ELA Program?" Hero chip + sub may also need touch-up. AgeBandChooser position is OK but could move ABOVE the stat rail (Option E from `02-FIRST_PROPOSAL_SUPERSEDED.md`) to surface the fork at first glance. CombinationsSection ("Summit / Core / Flex 1-3") is older-band-specific — needs an explicit note like "These combinations are for the ELA Program. See /little-dodo for the K-2 rhythm." |

### `/little-dodo`

| Aspect | Finding |
|---|---|
| Hero framing | "Where your child's reading begins." Watercolor dodo with picture book at dawn. K-2 register, warm, age-appropriate. |
| Section spine | Hero → AgeBandChooser (current="/little-dodo") → ProblemSection → HowSection → SharedSection → FitSection → CtaSection. |
| In-body close | CtaSection — `btn-charter` → `/consult` + `btn-outline` → `/demos`. SUPPRESS. |
| Internal links out | `/demos`, `/consult`. AgeBandChooser links to `/program`. |
| "16-Week" hits | 2: "Formal Lexile measurement comes later, in the 16-Week Program" (SharedSection body) and the schema description. **Rename target.** |
| "Little DODO" hits | Throughout (own page). |
| Parallel-funnel gap | **Low** in framing — the page itself is good. Rename impact: SharedSection body needs "ELA Program" instead of "16-Week Program". `littleDodoCourseSchema()` description (in `lib/schema.js`) likely says the same — verify and rename. |

---

## Tier 2 — Method / credibility / proof

### `/methodology`

| Aspect | Finding |
|---|---|
| Hero framing | The Loop methodology — universal. Pedagogy applies to both bands. |
| Section spine | Hero → Definition + See it live (combined SectionWrapper) → Why a Loop → 4 step sections (alternating dark/light) → Two session types → Lexile → 6+1 Trait → GEO signal → CTA. |
| In-body close | Yes — final CTA: `btn-charter` → `/consult` + `btn-ghost` → `/program`. SUPPRESS. |
| Internal links out | `/consult`, `/program`. **No `/little-dodo`** even though The Loop applies equally. |
| "16-Week" hits | "Typical result — two 16-week cycles" (Lexile section), and the CTA secondary "See The 16-Week Program". |
| "Little DODO" hits | 0. |
| Parallel-funnel gap | **Medium.** The Loop genuinely applies to both bands. The Lexile section is older-band-specific (formal Lexile begins later for K-2) — fine, just needs a note. The final CTA's secondary link is to `/program`; should it be plural ("See our Programs" → /program, where the AgeBandChooser branches)? Even simpler: add a small linking note at the end of the page body: "The Loop runs the same way for our K-2 starters too — see /little-dodo." |

### `/lexile`

| Aspect | Finding |
|---|---|
| Hero framing | "What is a Lexile score?" — Lexile is inherently grade-mapped. Older-coded by subject matter. |
| Section spine | Hero → What Is Lexile → Grade-Level Benchmark Table → Bilingual Gap → How DODO Uses Lexile → Examples → CTA. |
| In-body close | Yes — CTA: `btn-charter` → `/consult` + `btn-ghost` → `/methodology`. SUPPRESS. |
| Internal links out | `/consult`, `/methodology`. |
| "16-Week" hits | Multiple (typical results across 16-week cycles). |
| "Little DODO" hits | 0. |
| Parallel-funnel gap | **Low.** This page is intrinsically about formal Lexile measurement, which Little DODO defers. The honest move is a one-line callout: "Formal Lexile measurement begins at Grade 3+ in the ELA Program. K-2 readers in Little DODO build the comprehension foundation that Lexile later measures." This *helps* parents understand the parallel rather than hide it. |

### `/results`

| Aspect | Finding |
|---|---|
| Hero framing | "Real students. Real progress." Lexile-heavy. |
| Section spine | Hero → ProofStrip → Intro → Anchor case study → Result cards → Writing traits (6+1) → Methodology callout → FoundingFamily CTA. |
| In-body close | Yes — FoundingFamily CTA: `btn-charter` → `/consult`. SUPPRESS. |
| Internal links out | `/methodology`, `/consult`. |
| "16-Week" hits | Heavy — every result card frames in "16 weeks", "two 16-week cycles", etc. |
| "Little DODO" hits | 0. |
| Parallel-funnel gap | **Medium.** Results are intrinsically older-band today (Lexile-measured, formal). Once Little DODO has been running long enough to show outcomes, this page should have a K-2 results section. Until then: an honest callout — "These are ELA Program results. Little DODO outcomes are qualitative at this age (comprehension confidence, reading habit); the formal Lexile arc begins at Grade 3+." Don't fake K-2 numbers. |

### `/compare`

| Aspect | Finding |
|---|---|
| Hero framing | "Why a Navigator and not a tutor — and how it compounds." Older-coded ("comprehension precision", "argumentation"). |
| Section spine | Hero → Reframe → Category Difference → The Loop → Founder Video → Navigator Difference → Measurement → Student Voice (testimonials Grade 6/7/8) → Closing CTA. |
| In-body close | Yes — closing CTA: gold → `/consult` + outline → `/program`. SUPPRESS. |
| Internal links out | `/methodology`, `/navigators`, `/consult`, `/program`. |
| "16-Week" hits | Frequent. The s4 caption: "A student who runs The Loop with a Navigator across 16 weeks does not simply improve their English. They rebuild how they process complexity." |
| "Little DODO" hits | 0. |
| Parallel-funnel gap | **Medium.** The "category difference" argument (DODO ≠ tutor ≠ test-prep ≠ ESL) applies equally to both bands. Voices are all Grade 6+ — needs at least one parent voice from a K-2 family OR an explicit note that the category argument holds for the K-2 program too. Closing CTA secondary link goes to `/program` (ELA only); could become "Explore both programs" → land on a page that surfaces both bands. Easier interim fix: link both — "ELA Program (Gr 4+) · Little DODO (5–8)" two-link block. |

### `/navigators`

| Aspect | Finding |
|---|---|
| Hero framing | Who Navigators are and what they do — universal pedagogy. |
| Section spine | Hero → What a Navigator is not → What a Navigator does → How we choose Navigators → Navigator Relationship → Meet Ms. Kimberly → Navigator Profiles (Laura Mitchell, James Chen — both teaching older students) → A Real Session → Families Say → Closing CTA. |
| In-body close | Yes — closing CTA: `/consult`. SUPPRESS. |
| Internal links out | `/consult`. **No links to `/program` or `/little-dodo`** — this page is a sink for the conversion. |
| "16-Week" hits | Some (Lexile result mentions). Navigator profiles cite "Grade 6 · 16 weeks" and "Grade 8 · 16 weeks". |
| "Little DODO" hits | 0. |
| Parallel-funnel gap | **High.** Both featured Navigator profiles teach older students. A K-2 parent reading this page concludes Navigators are for older students. **Fix:** add a Navigator profile for someone who teaches Little DODO (a K-2 Navigator), even briefly. Or add a sentence in "Who Navigators Are" framing: "Navigators teach across both age bands — from the K-2 reader in Little DODO to the Grade 12 SAT/IB candidate in the ELA Program." |

---

## Tier 3 — Conversion

### `/demos`

| Aspect | Finding |
|---|---|
| Hero framing | "Watch a real demo class." Generic, age-neutral framing in the hero — good. |
| Section spine | Hero → VideoGallery (row1 + row2, 3 cards each = 6 cards) → InsideSession → AfterDemo → ResultsSection. |
| In-body close | Yes — AfterDemo CTA: `btn-primary` → `/consult`. SUPPRESS. |
| Internal links out | `/consult`. |
| "16-Week" hits | Multiple — ResultsSection mirrors `/program`'s growth panel ("After 16 weeks"). |
| "Little DODO" hits | 0. |
| Parallel-funnel gap | **Critical for parallel funnel.** The video gallery has 6 cards in two rows. **Today none of them is labeled as a Little DODO demo.** The whole demo gallery — the soft close itself — presents one band's pedagogy. A K-2 parent who clicks "Watch a Demo Class" sees no demos for K-2. **Fix:** the gallery's two rows should be structured by band — e.g. row1 = "ELA Program demos (Gr 4+)", row2 = "Little DODO demos (5–8)" — and seed at least 1 K-2 demo video. If no K-2 demo videos exist yet, name row2 honestly: "Little DODO sample (recording soon)" with a placeholder card linking to `/little-dodo`. Hiding the row entirely lets the funnel-ladder soft-close fail for K-2 families. |

### `/consult`

| Aspect | Finding |
|---|---|
| Hero framing | "Book Your Consultation" — generic and age-neutral. Good. |
| Section spine | Hero → WhatHappens (4 phases) → RealCall → TrustSection → CalendarSection (Cal.com embed). |
| In-body close | The page IS the close. Cal.com embed is the call-to-action. PreCtaBand on this page swaps to a soft Watch offer (per `system.md`). |
| Internal links out | `/program` (hero cta2 ghost button). |
| "16-Week" hits | Some — RealCall narrative talks through "what the first 16 weeks looks like for a student exactly like yours". |
| "Little DODO" hits | 0. |
| Parallel-funnel gap | **High.** Parallel-funnel decision means ONE consult pipeline. So the consult page should plainly say it serves both age bands. Today the narrative ("16-Week Program" prediction in the Navigator quote) reads as if there's only one program. **Fix:** (a) the hero subline or stat pills mention both age bands; (b) RealCall narrative shifts "the 16-Week Program is the right fit" → "the ELA Program is the right fit" OR "the right path for your child" (band-agnostic); (c) one of the TrustSection bullets reads "We consult for both age bands — Little DODO (5–8) and the ELA Program (Grade 3+)."; (d) the Cal.com embed itself — does the booking event have an age-band question or two separate events? Worth checking ConsultCalEmbed. |

### `/assessment`

UnderConstruction shell. Not in funnel today. Skip until built — at which point it must be designed parallel from day one (acknowledges both bands per the assessment-is-informational rule). PreCtaBand shows on this page; that's fine because it currently has no body.

---

## Tier 4 — Resources

### `/faq`

| Aspect | Finding |
|---|---|
| Hero framing | Search + accordions, structured by category. |
| Source | `content/faq.js` — single source. **42 "16-Week" occurrences inside.** |
| In-body close | None. PreCtaBand shows. |
| "Little DODO" hits | 0. |
| Parallel-funnel gap | **Critical.** The FAQ explicitly assumes ONE program. Example questions: "What exactly happens in the 16-week program?" / "Will my child have the same Navigator for all 16 weeks?" / "What results can I expect after 16 weeks?" Answers reference "Two enrollment options, both running for 16 weeks. The Full Program / The Literacy Foundation." These are ELA-specific combinations. Little DODO's enrollment rhythm + format isn't in the FAQ. **Fix:** the FAQ needs band-tagging. Either (a) add a new top-level category "Little DODO (Ages 5–8)" with K-2 specific questions (enrollment options, session length, what age to start, parental involvement); OR (b) inside each existing answer that's ELA-specific, add a "For Little DODO: …" parenthetical. (a) is cleaner. The page meta description also names "16-Week Program" — rename. |

### `/blog` (+ 2 posts)

| Aspect | Finding |
|---|---|
| Coverage | 2 posts: `lexile-asymmetry-bilingual-children.mdx`, `what-does-lexile-score-mean.mdx`. Both Lexile-themed. |
| Audience | Both posts are written for parents of school-aged children. Lexile is grade-mapped, so by topic these are older-band. The asymmetry post is genuinely cross-age (bilingual cognitive development). |
| "16-Week" hits | Several inside both posts. |
| "Little DODO" hits | 0. |
| Parallel-funnel gap | **Low-medium.** Blog is editorial — content choices reflect what's been written. Going forward, at least one K-2-themed post would help (e.g. "When is my child ready to start formal English literacy?" / "What does 'high-frequency, low-pressure' mean for a 6-year-old?"). For existing posts: where they say "The 16-Week Program", rename to "the ELA Program". Where they mention "DODO Learning's 16-week cycle", keep as format descriptor. |

### `/audiobooks`

Gated, noIndex. Chrome is bilingual but content is "EN-only content". Not in funnel. Out of audit scope — though Little DODO's K-2 audience is *exactly* who would benefit from audiobooks. Worth a separate task to consider K-2 picture-book/early-reader audio content. Flag for future.

### `/partners`

Gated, noIndex. Out of audit scope.

---

## Tier 5 — Geography

### `/cities/[city]`

| Aspect | Finding |
|---|---|
| Template | Single dynamic route serving 6 rich + 14 compact slugs. Content in `content/cities.js`. |
| "16-Week" hits | 23 in cities.js — including `badge: 'The 16-Week Program'`, `structureBody: 'The 16-Week Program is a commitment — not a subscription'`, multiple per-city context paragraphs. |
| "Little DODO" hits | 0 — no city page mentions K-2. |
| Parallel-funnel gap | **High.** Diaspora SEO is a real top-of-funnel for K-2 families (Mandarin-speaking parents of 6-year-olds in Markham/Richmond are a core audience). Today every city page tells them DODO is for older kids. **Fix:** city template gets a small "Both age bands serve [City] online" callout block — either a single banded line in the hero region or a paragraph in the body. Plus: rename the badge "The 16-Week Program" → "ELA Program · Little DODO" (parallel mention) or just "DODO Learning Programs". Per-city context paragraphs that name "16-Week Program" → "ELA Program" (the older band) where the framing is band-specific. |

---

## Infra audit

### `lib/schema.js`

- Course schema today (`courseSchema()`): `name: 'The DODO 16-Week Program'`. Used on `/program`, `/methodology`, and by `lib/metadata.js` in places.
- `littleDodoCourseSchema()`: separate, correct, descriptive — names "DODO Little DODO Course" or similar (verify exact name). Includes "Shares the same Navigators and live model; formal Lexile measurement begins later, in the 16-Week Program."
- **Rename action:** `courseSchema()` → `name: 'English Language Arts Program — DODO Learning'` (or close form). All descriptive references to "the 16-Week Program" become "the ELA Program". The "16-week" format duration in `timeRequired: 'P16W'` stays — that's correct ISO 8601 metadata for the cycle length.

### `public/llms.txt`

- Already names both programs:
  - "The 16-Week Program" — for grade 3+
  - "Little DODO (ages 5–8)" — explicitly described as "K–2 foundational-reading sibling"
- **Rename action:** rename "The 16-Week Program" → "English Language Arts (ELA) Program — Grade 3+, 16-week cycle". This keeps the format descriptor visible while retiring the brand name. Add at top: a one-sentence umbrella "DODO Learning runs two parallel English literacy programs: Little DODO for ages 5–8 and the ELA Program for Grade 3+. Both run 16-week cycles with the same Navigators and live model."

### `app/sitemap.js`

- Today: `/program` priority 0.9, `/little-dodo` priority 0.8. Mismatched priority signals to crawlers that ELA > Little DODO.
- **Action:** bump `/little-dodo` to 0.85 or 0.9 for parallel signal. Optionally lower `/program` to 0.85 so the two bands rank equivalently. Memory says SEO baseline is 0/32 so this won't disrupt any established rankings.

---

## Headline conclusion

**The chrome's bones already support a parallel-funnel architecture** — AgeBandChooser exists, Course schema for Little DODO exists, sitemap entry exists, footer link exists, llms.txt mentions both. **The body copy across 20+ pages does not.** Outside of `/little-dodo` itself and the AgeBandChooser on `/program`, *no page on the site lets a K-2 parent see themselves*. The fix is not architectural — it's a coordinated copy + nav + small-section pass, executed with bilingual parity, that lets the two bands live as peers from every cold and warm surface the funnel touches.

The 207 "16-Week" occurrences sound terrifying. They're not. Roughly:
- ~60 are *brand-name* uses ("The 16-Week Program", "the 16-Week Program") that need renaming to "ELA Program".
- ~140 are *format descriptors* ("16 weeks", "16-week cycle", "after 16 weeks", "across two 16-week cycles") that stay correct as-is (16-week IS the cycle length for both bands).
- The rename is a careful find-and-decide pass, not a global replace. Phase 4 (`06-PROPOSAL.md`) will table every brand-name occurrence with its proposed replacement; format-descriptor occurrences stay untouched.
