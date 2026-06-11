# Naming Model + URL/Hub Architecture

**Status:** Proposed — committed to in writing so the rest of the audit + proposal can use it consistently. User can redirect before any live edits land.
**Date:** 2026-06-03
**Decisions captured from user (2026-06-03):**
1. **Parallel funnel** — one consult/demo pipeline; every warm page acknowledges both age bands.
2. **Rename:** "16-Week Program" is a *factual format descriptor* applicable to both age bands. As a *brand name* for the older band, it is being retired. The older band is **"English Language Arts Program"** (long form) or **"ELA Program"** (short form).

---

## Naming dictionary (canonical)

| Concept | Canonical EN | Canonical ZH | Notes |
|---|---|---|---|
| Program family (umbrella) | **Programs** / **Our Programs** | **课程** / **我们的课程** | Conceptual umbrella; no dedicated URL — the AgeBandChooser IS the hub. |
| Older age band (Gr 3+) | **English Language Arts Program** (first mention) / **ELA Program** (subsequent) | **英语语言艺术课程** (first mention) / **ELA 课程** (subsequent) | Replaces every brand use of "The 16-Week Program". Boundary updated 2026-06-03 from Gr 4+ to Gr 3+. |
| Younger age band (5–8) | **Little DODO** | **都学启蒙** | Unchanged from current. |
| Format descriptor | "16-week", "16 weeks", "the 16-week cycle" | "16 周", "16 周课程周期" | Lowercase, adjectival. Applies to BOTH bands. Acceptable as a *description*, never as a brand. |
| Cycle reference | "the 16-week cycle", "one 16-week cycle" | "一个 16 周周期" | OK to use anywhere — it's the operational fact, not a band name. |
| Pedagogy / method | "The Loop" / "LCS" / "DODO Method" | "都学方法" / "LCS" | Unchanged. Shared by both bands. |

### Test cases — what changes vs what stays

| String | Old | New | Reason |
|---|---|---|---|
| Nav primary label | "ELA Program" | "Programs" | Plural, signals the family — see Nav model below. |
| `/program` page H1 | "What happens in a 16-Week Program?" | "What happens in the ELA Program?" | The page IS the older band's deep page. ELA is its brand name. |
| Footer Program column item | "The 16-Week Program" | "ELA Program (Grade 3+)" | Parallels "Little DODO (5–8)". |
| AgeBandChooser older card name | "The 16-Week Program" | "ELA Program" | Card name; tag becomes "Grade 3+" (was "Grade 4+" — band boundary updated 2026-06-03). |
| AgeBandChooser older card tag | "Grade 4+" / "四年级及以上" | "Grade 3+" / "三年级及以上" | New rename target as of 2026-06-03. Live in `marketing.en.js:1345` and `marketing.zh.js:1318`. |
| AgeBandChooser older card blurb | "Live, Navigator-led literacy and writing — read complexity, argue with evidence, write with intention. Progress measured in Lexile." | Same body, ends with "A 16-week cycle, four skills every session." | Surfaces the format as a fact. |
| `/results` page references to "the 16-Week Program" | Common today | "the ELA Program" OR "the program" | Drop "16-Week" as brand. Optionally keep "16-week" as adjective where the duration is itself the point. |
| `/cities/*` mention of "16-Week Program" | Several today (likely) | "ELA Program" + add Little DODO mention | Audit Phase 2. |
| `littleDodo` page section "shared credibility" — "the 16-Week Program" | "Formal Lexile measurement comes later, in the 16-Week Program" | "Formal Lexile measurement comes later, in the ELA Program" | Mechanical replace. |
| `littleDodoCourseSchema()` description | (check) | (audit) | Schema/llms.txt audit needed. |

### Strings to grep + decide one at a time

In Phase 2 we'll grep across content/marketing.{en,zh}.js + docs + schema + llms.txt for every literal occurrence of "16-Week Program" / "16-week program" / "the 16-Week" / "16 周课程" (etc.) and classify each as **rename to ELA Program** vs **keep as format descriptor**. Single-pass, bilingual.

---

## URL / hub architecture

### The decision

**Keep the existing URL structure. No new hub URL. Both band pages host the AgeBandChooser, which IS the hub.**

| Route | Role | Audience |
|---|---|---|
| `/program` | **ELA Program** deep page (older band). | Parents of Grade 3+ |
| `/little-dodo` | **Little DODO** deep page (younger band). | Parents of ages 5–8 |
| *(no `/programs` route)* | The umbrella exists as a UI pattern (AgeBandChooser), not a URL. | — |

### Why no new hub URL

- A `/programs` hub-page would compete with the home page for top-of-funnel attention and would add a route that needs SEO seeding from zero.
- The AgeBandChooser pattern already exists, already works, and already renders on `/program` and `/little-dodo`. The fix is to make it appear on the **home page** (and possibly elsewhere) — turning the home into the family's true funnel entry.
- Keeping URLs stable preserves the SEO baseline from `lib/schema.js` + `sitemap.js` + `llms.txt`. Memory says SEO baseline is 0/32 but it's still early — moving URLs now creates redirect debt for no architectural gain.

### What changes inside each existing route

- `/program` — heavy copy reframe: hero says "ELA Program" (not "16-Week Program"). Page continues to be the older band's deep dive. AgeBandChooser keeps its position (or moves above stat rail per `02-FIRST_PROPOSAL_SUPERSEDED.md` Option E).
- `/little-dodo` — minor copy touch-ups only (replace residual "16-Week Program" references with "ELA Program" where they appear in shared-credibility section).
- Home — the AgeBandChooser is inserted as a new section, with `current={null}` so neither band is muted.
- Every warm Tier-2 page (`/methodology`, `/lexile`, `/results`, `/compare`, `/navigators`) — audited in Phase 2 for K-2 acknowledgement. Likely each gets a small "Also applies to Little DODO" or "K-2 version available" callout where age-relevant.

---

## Nav model (proposed)

Per the constraint of a flat 6-link navbar with no dropdowns:

| Slot | Current label | Proposed label | Route | Reason |
|---|---|---|---|---|
| 1 | ELA Program | **Programs** | `/program` | Plural signals the family; destination page is reframed so a parent landing there immediately sees the AgeBandChooser fork. |
| 2 | DODO Method | DODO Method | `/methodology` | Unchanged. |
| 3 | Results | Results | `/results` | Unchanged. |
| 4 | Navigators | Navigators | `/navigators` | Unchanged. |
| 5 | Reading Companion 🔒 | Reading Companion 🔒 | `/audiobooks` | Unchanged. |
| 6 | About | About | `/about` | Unchanged. |

**Awkwardness check:** a "Programs" nav link that points to `/program` (a singular-band page) reads weird only if `/program` continues to lead with an ELA-only hero. The fix is **paired**: rename the nav label *and* lift the AgeBandChooser to the top of `/program` so the family fork is visible at first glance. Both changes ship together or neither does — they depend on each other.

**Mobile drawer "more" list — add Little DODO:** independent of the above, `nav.more` should gain `{ href: '/little-dodo', label: 'Little DODO (5–8)' }` as its first item. This is a parallel-funnel requirement: K-2 parents on mobile must have a direct nav entry.

---

## Footer model (proposed)

| Footer slot | Current | Proposed |
|---|---|---|
| Column header | "Program" | **"Programs"** |
| First item | "The 16-Week Program" → `/program` | **"ELA Program (Grade 3+)" → `/program`** |
| Second item | "Little DODO (5–8)" → `/little-dodo` | Unchanged |
| Subsequent items | The Loop / Navigators / Results / Lexile Levels / The Difference / The Lexile Assessment | Unchanged |

ZH mirror in `marketing.zh.js`.

---

## Schema + sitemap + llms.txt impact

- `lib/schema.js` — likely has hardcoded "16-Week Program" in the Course schema for `/program`. Audit + rename to "English Language Arts Program" (the formal name reads correctly to crawlers + LLMs). Keep `littleDodoCourseSchema()` as-is.
- `public/llms.txt` — likely names "16-Week Program". Rename to "English Language Arts Program". Add an explicit "two age bands" framing block at the top so LLM crawlers always emit the parallel.
- `app/sitemap.js` — no URL changes. No edit needed unless we want to bump `/little-dodo` priority from 0.8 → 0.85 to match `/faq` and signal parallel weight.

---

## What this naming model does NOT change

- The funnel ladder (Watch = soft cold / Consult = firm warm / Assessment never a CTA).
- The token system (`#0E0E12`, `#F5F5FF`, `#b7b5fe`, `#7c79e8`, `#F5C842`).
- The section spacing protocol (v6.2).
- The PreCtaBand SUPPRESS list (membership unchanged; behavior unchanged).
- The flat 6-link navbar rule (still 6 items).
- The "no dropdown" decision.
- Any URL.

It is **strictly a copy + nav-label + footer-label reframe + one home-page insertion**, paired with K-2 acknowledgement edits on warm pages (Phase 3 will spec these).

---

## Open questions to resolve before Phase 3 proposal

1. **EN long form vs short form on first mention.** Should the very first mention on any page use "English Language Arts Program" with "ELA Program" parenthetical, then "ELA Program" thereafter? Or just use "ELA Program" everywhere? My default: long form on hero H1 of `/program`, AgeBandChooser, and footer cross-link; short form everywhere else.
2. **ZH long form.** "英语语言艺术课程" is long and rare in Chinese ed-market copy. Alternatives: "都学英文阅读写作课程" (descriptive), "都学英语课程" (terse). Worth a `dodo-content-writer` call before locking.
3. **"Grade 3+" framing.** Decision locked 2026-06-03: older band is **Grade 3+** (was Grade 4+). AgeBand tag becomes "GRADE 3+" / "三年级及以上". Little DODO remains "AGES 5–8" — there is a natural age-8 overlap zone (Grade 2 vs Grade 3 transition); parents pick the band based on the child's readiness, not strict age. No change to Little DODO's age band.
4. **Should `/little-dodo` ever describe itself as "the Little DODO ELA Program" or "Little DODO program"?** I think no — "Little DODO" stands as a brand on its own and the parent of a 5–8-year-old doesn't need "ELA" jargon. But the cross-reference from `/program` should make the umbrella relationship clear.

These are flagged here so they get resolved during the Phase 3 proposal draft, not buried in implementation.
