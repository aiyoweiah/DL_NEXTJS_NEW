# Consolidated Proposal — Program Family Parallel

**Status:** Proposal only. **No live files have been edited.** Per the content apply-gate, every change below is staged here. User must give explicit "apply" trigger.

**Date:** 2026-06-03
**Companion docs:** `00-NAMING_MODEL.md`, `03-AUDIT.md`, `04-FLOW_MAP.md`.
**Bilingual:** every EN string change carries a ZH mirror in the same row, marked `(needs dodo-content-writer pass)` where the transcreation is not yet locked.

---

## How this doc is organized

Five workstreams (W1–W5), ordered by dependency + impact:

- **W1 — Rename foundation** (mechanical, high-coverage). The "16-Week Program → ELA Program" pass across content/, lib/schema.js, public/llms.txt. Everything else assumes this lands first.
- **W2 — Chrome** (nav + footer). Plural labels, drawer addition.
- **W3 — Home page** (highest-traffic single change). AgeBand band insertion.
- **W4 — Warm pages** (parallel-funnel acknowledgements). Tier 2 + /faq + /demos K-2 row + /cities callout.
- **W5 — Infra** (schema + sitemap + llms.txt finalization).

A sixth implicit workstream — **W6: per-page deep reframes** (`/program` H1 + AgeBandChooser repositioning, `/about` "Families" addition, `/navigators` K-2 profile) — is sketched here but treated as a follow-up that can land after W1–W5. Each W6 item is also a copy edit, not architectural, and is safe to defer if scope tightens.

Within each workstream, items are ordered by impact × cost. Each item lists: file, current state, proposed change, EN copy, ZH copy, rationale.

---

# W1 — Rename foundation

The 207-occurrence "16-Week" pass, classified into rename vs keep.

## W1.1 — Classification rule

For each "16-Week" / "16-week" hit:

- **Brand name use** ("The 16-Week Program", "the 16-Week Program", "Our 16-Week Program") → rename to **"the ELA Program"** (or "the English Language Arts Program" on first mention in a long body).
- **Format descriptor use** ("16 weeks", "16-week cycle", "after 16 weeks", "across two 16-week cycles", "P16W" in schema) → **keep unchanged**. 16-week IS the cycle length for both bands; the descriptor remains accurate.

Decision flowchart:
```
Does the phrase function as the program's name?
  ├─ Yes  → rename to "ELA Program" / "English Language Arts Program"
  └─ No   → keep (it's describing duration / cycle / timing)
```

Quick test: replace "16-Week Program" with "X Program" — if the sentence still scans grammatically with X as a brand name, it was a brand use. If swapping in "X-week" only works as a duration, it was a descriptor.

## W1.2 — Per-file rename targets

### `content/marketing.en.js` (62 hits)

Sample of the brand-name hits to rename (full list in apply phase; this is representative):

| Line | Current EN | Proposed EN | ZH mirror needed |
|---|---|---|---|
| 126 | `{ href: '/program', label: 'The 16-Week Program' }` (footer.program) | `{ href: '/program', label: 'ELA Program (Grade 3+)' }` | `{ href: '/program', label: 'ELA 课程（3 年级+）' }` |
| 348 | `title: 'What Happens in a 16-Week Program — DODO Learning'` (program.meta.title) | `title: 'The ELA Program — DODO Learning'` | `标题：英语语言艺术（ELA）课程 — DODO Learning` |
| 354 | `h1: 'What happens in a 16-Week Program?'` (program.hero.h1) | `h1: 'What happens in the ELA Program?'` | `'ELA 课程里发生了什么？'` |
| 527 | `programLink: 'See The 16-Week Program →'` (about.loop.programLink) | `programLink: 'See the ELA Program →'` | `'查看 ELA 课程 →'` |
| 597 | `cta2: 'See The 16-Week Program'` | `cta2: 'See the ELA Program'` | `'查看 ELA 课程'` |
| 633 | Navigator quote `'Based on what you've told me, I think the 16-Week Program is the right fit. Here's exactly why…'` | `'Based on what you've told me, I think the ELA Program is the right fit. Here's exactly why…'` | (ZH transcreation needed) |
| 639 | `'They will tell you honestly whether the 16-Week Program is the right fit'` | `'They will tell you honestly whether the ELA Program is the right fit'` | (ZH transcreation) |
| 680 | compare s3 col title `'A 16-week arc — not a score for next month'` | KEEP as descriptor; reframe slightly: `'A 16-week arc — not a score for next month'` (no rename needed) | (already in ZH) |
| 717 | compare s9 `ctaSecondary: 'See The 16-Week Program'` | `ctaSecondary: 'See the ELA Program'` | `'查看 ELA 课程'` |
| 913 | `ctaSecondary: 'See The 16-Week Program'` (lexile cta) | `ctaSecondary: 'See the ELA Program'` | `'查看 ELA 课程'` |
| 1010 | `'showing reading and writing progress across The 16-Week Program — measured'` | `'showing reading and writing progress across the ELA Program — measured'` | (ZH transcreation) |
| 1019 | `'before and after The 16-Week Program. Real students. Real data.'` | `'before and after the ELA Program. Real students. Real data.'` | (ZH transcreation) |
| 1148 | `'and show you what The 16-Week Program looks like'` | `'and show you what the ELA Program looks like'` | (ZH transcreation) |
| 1311 | `'Students who complete The 16-Week Program after watching the demo'` | `'Students who complete the ELA Program after watching the demo'` | (ZH transcreation) |
| 1346 | `name: 'The 16-Week Program'` (ageBands second card) | `name: 'ELA Program'` | `name: 'ELA 课程'` |
| 1348 | `cta: 'See The 16-Week Program'` (ageBands card) | `cta: 'See the ELA Program'` | `'查看 ELA 课程'` |
| 1355 | Comment header `'Little DODO — the K–2 (ages 5–8) sibling of the 16-Week Program'` | rename to `'sibling of the ELA Program'` | n/a (comment) |
| 1360 | `'pre-measurement; formal Lexile begins in the 16-Week Program'` | `'pre-measurement; formal Lexile begins in the ELA Program'` | (ZH transcreation) |

**Descriptor hits to keep unchanged** (sample, not exhaustive): lines 185, 204, 206, 287 ("After 16 Weeks" eyebrow), 418, 420, 435, 443, 467, 468, 475, 484, 550, 589, 617, 666, 685, 695, 702, 704, 730, 744, 773, 858, 864, 965, 987, 988, 1025, 1040, 1230–1233, 1244, 1312, 1317. These all use "16-week", "16 weeks", or "after 16 weeks" as a *duration* — not as the brand name. Keep.

### `content/marketing.zh.js` (70 hits)

ZH mirror. Every EN brand-name rename above needs its ZH counterpart. The ZH side likely has been using `十六周课程` or `16周课程` as the brand name. Replace those with `ELA 课程` (matching the ZH naming dictionary in `00-NAMING_MODEL.md`). Format-descriptor uses (`16 周`, `每个 16 周周期`) stay.

**Open ZH question:** is "ELA" acceptable as a Chinese-language brand label, or should we use `都学英语课程` / `都学英文课程`? The brand-content writer should decide before apply. The naming model proposes `ELA 课程` (terse) as default with `都学英语课程` as an alternative; both keep "课程" plural-neutral.

### `content/faq.js` (42 hits)

Two passes:
1. Brand-name rename: every "the 16-week program" / "the 16-Week Program" in question text or answer body → "the ELA Program".
2. **Structural addition:** add a new top-level category **"Little DODO (Ages 5–8)"** with at least 6 starter questions:
   - "What is Little DODO?"
   - "What ages does Little DODO serve?"
   - "How is Little DODO different from the ELA Program?"
   - "How often does a Little DODO student meet with their Navigator?"
   - "Does Little DODO use Lexile measurement?"
   - "When should we move from Little DODO to the ELA Program?"

Each Q+A needs EN+ZH copy. Draft these via `dodo-content-writer` before apply. The 6 above are *placeholders for scope* — the actual question set should come from real consult-call questions parents ask about K-2.

Page meta description (in `app/[locale]/faq/page.jsx` line 28-31) also names "16-Week Program" → rename to "the ELA Program and Little DODO".

### `content/cities.js` (23 hits)

Rename brand-name uses (lines 107, 157, 445, 455, 458 are clear brand uses; rename to "ELA Program"). Descriptor uses (lines 34, 86, 136, 248, 404, 406, "16 weeks", "across all 16 weeks") stay.

**Structural addition** per city: a small "Both age bands serve [City] online" callout block. Single sentence; lives near the existing city CTA. Example EN: "Both the ELA Program (Grade 3+) and Little DODO (5–8) serve [City] families online." ZH: "ELA 课程（3 年级+）和都学启蒙（5–8 岁）都为 [城市] 家庭线上授课。"

### `content/en/blog/*.mdx` + `content/zh/blog/*.mdx` (3 hits in EN, 2 in ZH)

Three minor rename hits in the two existing posts. Mechanical.

### `lib/schema.js` (11 hits)

Course schema renames:
- Line 231: `name: 'The DODO 16-Week Program'` → `name: 'English Language Arts Program — DODO Learning'`
- Line 233: description body "The DODO 16-Week Program is a live, Navigator-led English literacy program" → "The DODO English Language Arts Program is a live, Navigator-led literacy and writing program for Grade 3+ students. (Younger students 5–8 are served by Little DODO; see /little-dodo for the K-2 program.)"
- Line 242: descriptor "two 16-week cycles" → stays (it's the cycle length)
- Line 246: `timeRequired: 'P16W'` → stays (ISO 8601 metadata)
- Line 299: "Initial-cohort enrollment for the 16-week program" → "Initial-cohort enrollment for the ELA Program"
- Lines 310, 324, 325 (littleDodoCourseSchema): description references to "16-Week Program" → "ELA Program"

Add a new top-level umbrella schema OR add `isPartOf` references linking both Course schemas to a parent `EducationalOrganization` with a `hasOfferCatalog` listing both. Optional v2 enhancement; not blocking.

### `public/llms.txt` (3 visible hits)

- Line 12: "[The 16-Week Program](https://www.dodolearning.com/en/program/)" → "[ELA Program — Grade 3+](https://www.dodolearning.com/en/program/)"
- Line 13: "The K–2 foundational-reading sibling of the 16-Week Program." → "The K–2 foundational-reading sibling of the ELA Program."
- Add at file top (after the title line): an umbrella paragraph: "DODO Learning runs two parallel English-literacy programs sharing the same Navigators, live model, and 16-week cycle structure: **Little DODO** for ages 5–8 (foundational reading + comprehension, pre-Lexile) and the **English Language Arts (ELA) Program** for Grade 3+ (Lexile-measured reading + 6+1 Trait writing)."

---

# W2 — Chrome (nav + footer)

## W2.1 — Nav primary label: "ELA Program" → "Programs"

File: `content/marketing.{en,zh}.js` line 53 (EN) / mirror in ZH.

| EN | ZH |
|---|---|
| `{ href: '/program', label: 'Programs' }` | `{ href: '/program', label: '课程' }` |

Alternative if "Programs" reads too thin: `'ELA Programs'` (plural keeps disambiguator). My pick: `'Programs'` — terse + signals plurality. Pair this with W3 + W6.1 so the destination page's reframed hero immediately validates the plural.

## W2.2 — Add Little DODO to mobile drawer `nav.more`

File: `content/marketing.{en,zh}.js` lines 60–66 (EN) / mirror in ZH.

Prepend to `more` array:

| EN | ZH |
|---|---|
| `{ href: '/little-dodo', label: 'Little DODO (5–8)' }` | `{ href: '/little-dodo', label: '都学启蒙（5–8 岁）' }` |

Rest of `more` stays as-is (Lexile, Difference, FAQ, Blog, Partners).

## W2.3 — Footer column header "Program" → "Programs"

File: `content/marketing.{en,zh}.js` — find `columns.program` in footer slice; rename label.

| EN | ZH |
|---|---|
| `program: 'Programs'` | `program: '课程'` |

## W2.4 — Footer.program first item rename

Already covered in W1.2 (line 126). Repeated here for grouping: the link label `'The 16-Week Program'` becomes `'ELA Program (Grade 3+)'` so the two band entries read as peers in the footer column.

---

# W3 — Home page: AgeBand band insertion

The single highest-impact body edit. Inserts an AgeBand block between ProofStrip and PhotoIntro on `/`.

## W3.1 — Component reuse

Use `components/ui/AgeBandChooser.jsx` directly. Pass `current={null}` so neither band is muted (home is neutral ground; both forks are clickable).

The component today reads `copy.eyebrow`, `copy.heading`, `copy.bands[]`, `copy.here`. The existing `ageBands` export already has these — they're tuned for the in-page-of-a-band use case ("This is your branch / You're here" framing). For the home use case the heading should be different (it shouldn't say "Two ways into DODO English" because that's the `/program`-context heading).

**Proposed:** extend the `ageBands` export with an optional `homeHeading` + `homeEyebrow` field. AgeBandChooser picks them when `current` is null. Single source of truth, two-line component change.

```js
// content/marketing.en.js — ageBands slice (around line 1335)
export const ageBands = {
  eyebrow: 'By Your Child's Stage',
  heading: 'Two ways into DODO English.',
  homeEyebrow: 'Built for the stage your child is in',
  homeHeading: 'Two paths into DODO English literacy.',
  here: "You're here",
  bands: [
    {
      href:  '/little-dodo',
      tag:   'Ages 5–8',
      name:  'Little DODO',
      blurb: 'High-frequency, low-pressure reading and comprehension for pre-elementary starters. Where the reader begins.',
      cta:   'Explore Little DODO',
    },
    {
      href:  '/program',
      tag:   'Grade 3+',
      name:  'ELA Program',
      blurb: 'Live, Navigator-led literacy and writing — read complexity, argue with evidence, write with intention. Progress measured in Lexile. A 16-week cycle, four skills every session.',
      cta:   'Explore the ELA Program',
    },
  ],
}
```

ZH mirror in `marketing.zh.js`:
```js
export const ageBands = {
  eyebrow: '因孩子的阶段而设计',
  heading: '两条进入 DODO 英语的路径。',
  homeEyebrow: '为孩子所处的阶段而设',
  homeHeading: '通往 DODO 英语素养的两条路径。',
  here: '当前页面',
  bands: [
    {
      href:  '/little-dodo',
      tag:   '5–8 岁',
      name:  '都学启蒙',
      blurb: '高频次、低压力的阅读与理解课程，专为学前/小学低龄起点设计。让阅读从这里开始。',
      cta:   '了解都学启蒙',
    },
    {
      href:  '/program',
      tag:   '3 年级+',
      name:  'ELA 课程',
      blurb: '导师带领的英语阅读与写作直播课——读复杂文本、用证据论证、有意识地写作。用 Lexile 衡量进步。16 周周期，每节课四项技能。',
      cta:   '了解 ELA 课程',
    },
  ],
}
```

(Both ZH strings need `dodo-content-writer` lint pass before locking.)

## W3.2 — AgeBandChooser component micro-change

```jsx
// components/ui/AgeBandChooser.jsx (current signature)
export default function AgeBandChooser({ locale, copy, current }) {
  // ...
  const eyebrow = current ? copy.eyebrow : (copy.homeEyebrow || copy.eyebrow)
  const heading = current ? copy.heading : (copy.homeHeading || copy.heading)
  // use eyebrow + heading instead of copy.eyebrow + copy.heading
}
```

## W3.3 — Home page insertion

`app/[locale]/page.tsx` — between line 336 (`<ProofStrip>`) and line 337 (`<PhotoIntro>`), add:

```tsx
import AgeBandChooser from '@/components/ui/AgeBandChooser'
import { ageBands as bandsEn } from '@/content/marketing.en'
import { ageBands as bandsZh } from '@/content/marketing.zh'

// inside HOMEPAGE_COPY:
const BANDS = { en: bandsEn, zh: bandsZh }

// inside HomePage:
const bands = BANDS[locale] ?? BANDS.en

// in the JSX return:
<Hero locale={locale} c={c} />
<ProofStrip c={c} />
<AgeBandChooser locale={locale} copy={bands} current={null} />
<PhotoIntro locale={locale} c={c} />
// ...rest
```

Section spacing: AgeBandChooser already wraps itself in `style={{ backgroundColor: '#F5F5FF', padding: 'var(--section-md) 0' }}`. ProofStrip above it is `#212830` dark; PhotoIntro below is light `#ffffff`. Dark → light-tinted → white — that's the alternating cadence `system.md` v6.2 wants. No surface conflict.

PreCtaBand stays unchanged (home is already in shown-list; AgeBand is a fork not a CTA, so doesn't break one-conversion-per-page).

---

# W4 — Warm pages: parallel-funnel acknowledgements

Smaller per-page edits to make each warm page acknowledge both bands. Listed in priority order.

## W4.1 — `/demos` add Little DODO row

This is the highest-impact W4 item because demos = the soft-close itself. The video gallery today has 6 cards split row1/row2. Restructure into two band-labeled rows:

```js
// content/marketing.{en,zh}.js — demos slice
videos: {
  eyebrow: 'See It Live',
  h2: '...',
  h2zh: '...',
  row1Label: 'ELA Program (Grade 3+)',
  row2Label: 'Little DODO (Ages 5–8)',
  cards: [
    // row1: 3 ELA demo videos (current ELA ones)
    // row2: at minimum 1 Little DODO demo + 2 "Recording soon" placeholder cards that link to /little-dodo
  ],
},
```

If no K-2 demo footage exists yet: row2 contains one placeholder card per intended demo with a "Recording soon" badge and a link to `/little-dodo`. Hiding the row is worse than honestly stating "we're recording these."

ZH mirror with `ELA 课程（3 年级+）` and `都学启蒙（5–8 岁）` labels.

## W4.2 — `/consult` parallel-band signal

Three small edits:

1. **Hero subline addition** — current subline is generic but doesn't name the two bands. Add a one-line phrase to `consult.hero.sub`: "We consult for both age bands — Little DODO (5–8) and the ELA Program (Grade 3+)."
2. **RealCall narrative reframe** — line 633 of marketing.en.js where the Navigator quote says "I think the 16-Week Program is the right fit" → make it band-agnostic: "I think this is the right path for your child" (or split the Navigator's quote into a fork: "ELA Program if Grade 3+ / Little DODO if 5–8").
3. **TrustSection bullet** — add a single bullet to `consult.trust.points`: "We consult for both age bands — same Navigator team, same diagnostic call, two different programs depending on your child's stage."

ZH mirrors for all three.

## W4.3 — Tier 2 warm-page K-2 callouts

For `/methodology`, `/lexile`, `/results`, `/compare`, `/navigators` — each gets one (1) age-band acknowledgement.

### `/methodology`

End of the Two Session Types section (or in the GEO signal section), add a one-line callout:
- EN: "The Loop runs the same way for our K-2 starters in Little DODO — adapted in pace and pressure, identical in structure."
- ZH: "都学启蒙（5–8 岁）也运行同样的 Loop —— 节奏和强度做了适龄调整，但结构完全相同。"

And update the closing CTA secondary `ctaSecondary: 'See The 16-Week Program'` → `'Explore Programs'` (links to `/program`, the hub).

### `/lexile`

In the "How DODO Uses Lexile" section (or as a single line in the Bilingual Gap section), add:
- EN: "Formal Lexile measurement begins at Grade 3+ in the ELA Program. K-2 readers in Little DODO build the comprehension foundation that Lexile later measures — without scoring a 5-year-old."
- ZH: "正式 Lexile 评估从 3 年级（ELA 课程）开始。5–8 岁孩子在都学启蒙阶段先建立阅读理解的基础——不会过早给五岁孩子打分。"

### `/results`

In the Intro section (line ~183 of results page), add one paragraph:
- EN: "These are ELA Program results — Lexile-measured, 6+1-Trait-scored. Little DODO outcomes look different at this stage: confidence to read aloud, comfort with comprehension questions, the steady habit of opening a book. The formal Lexile arc begins later."
- ZH: "这些是 ELA 课程的成果——Lexile 测量、6+1 Trait 评分。都学启蒙阶段的成果呈现方式不同：朗读时的自信、面对理解题的从容、每天打开一本书的稳定习惯。正式的 Lexile 轨迹之后才开始。"

### `/compare`

S8 testimonial section: add at least one K-2 voice card (Parent, Vancouver — student Grade 1 · 16 weeks with Navigator [Name]). And in s9 closing CTA, change secondary CTA to a two-link block:
- EN: "Explore the ELA Program · Explore Little DODO" (two ghost buttons side by side)
- ZH: "了解 ELA 课程 · 了解都学启蒙"

### `/navigators`

Either:
- Add a K-2 Navigator profile to the `NAVIGATORS` array at the bottom of the page (e.g. third profile, "Navigator [X] · Little DODO student, Ages 5–8"), OR
- Add a single sentence in S2 ("What a Navigator is not") section: "Navigators teach across both age bands — from the K-2 reader in Little DODO to the Grade 12 SAT/IB candidate in the ELA Program."

The profile is stronger but needs a real K-2 Navigator named + photo. The sentence is the safer first step.

## W4.4 — `/about` "Families We Serve" addition

In the `FamiliesWeServe` section, either:
- Add a fourth family archetype card: **"The Early-Reader Home"** (K-2) with EN copy like "Parents of 5–8-year-olds choosing a gentle, consistent start — high-frequency, low-pressure reading and the joy of understanding what they read."
- Or follow the FamiliesWeServe block with a small two-program callout that names both bands and links to both.

The fourth-card approach is consistent with the existing pattern.

## W4.5 — `/program` H1 rename + AgeBandChooser repositioning

Covered partially in W1 (H1 rename to "What happens in the ELA Program?"). Additional structural move:

Today: Hero → AgeBandChooser → LoopSection → ...
Proposed: keep order BUT also add the AgeBandChooser as a very small "Looking for ages 5–8? See Little DODO →" chip in the hero region next to the existing chip. This duplicates the fork visibility — the small chip serves a parent who decides at first glance; the full AgeBandChooser below the hero serves a parent who scrolls.

## W4.6 — `/cities/*` callout

In the city page template, before or after the existing city body, add a single-line callout block:
- EN: "Both the ELA Program (Grade 3+) and Little DODO (5–8) serve [City] families online."
- ZH: "ELA 课程（3 年级+）和都学启蒙（5–8 岁）都为 [城市] 家庭线上授课。"

Rename the `badge` field in cities.js from `'The 16-Week Program'` to `'DODO Programs'` or `'ELA Program · Little DODO'`.

---

# W5 — Infra finalization

After W1's mechanical renames have landed in `lib/schema.js`, `public/llms.txt`, run a verification pass:

1. `next build` — must complete clean (catches any string-template parse errors in bilingual files).
2. View `/sitemap.xml` — confirm both `/en/program` and `/en/little-dodo` and `/zh/program` and `/zh/little-dodo` are present with correct alternates.
3. Verify both Course schemas validate via Google's Rich Results Test (paste `/program` and `/little-dodo` HTML, confirm structured data parses).
4. Verify `public/llms.txt` parses cleanly + the umbrella paragraph reads correctly.
5. Bump `/little-dodo` sitemap priority from 0.8 → 0.85 (or 0.9, matching `/program`) for parallel signal.

---

# Sequenced apply order (when user says "apply")

Because edits cascade, do them in this order so `next build` stays clean after each step:

1. **Step 1 — Naming model strings only** (W1.2 — content/marketing.en.js + marketing.zh.js + faq.js + cities.js + blog mdx + lib/schema.js + llms.txt). Bilingual rename pass. `next build` checkpoint.
2. **Step 2 — Chrome** (W2). Nav label + drawer addition + footer column header. `next build` checkpoint.
3. **Step 3 — AgeBandChooser micro-change + ageBands homeHeading/homeEyebrow** (W3.1 + W3.2). `next build` checkpoint.
4. **Step 4 — Home page AgeBand band insertion** (W3.3). Visual check at the live preview. `next build` checkpoint.
5. **Step 5 — /program H1 rename + AgeBandChooser hero chip** (W4.5 + the W1 rename items already landed in Step 1). `next build` checkpoint.
6. **Step 6 — Tier 2 callouts** (W4.3 — methodology, lexile, results, compare, navigators). Per page, bilingual. `next build` checkpoint after each.
7. **Step 7 — /demos K-2 row** (W4.1). Even with placeholder cards. `next build` checkpoint.
8. **Step 8 — /consult parallel-band signal** (W4.2). `next build` checkpoint.
9. **Step 9 — /about Families addition** (W4.4). `next build` checkpoint.
10. **Step 10 — /cities callout + badge rename** (W4.6). `next build` checkpoint.
11. **Step 11 — /faq Little DODO category** (W1 faq structural addition). Bilingual question + answer copy via `dodo-content-writer`. `next build` checkpoint.
12. **Step 12 — Infra verification** (W5). Sitemap priority bump + Rich Results validation.

Each step is a self-contained commit. Steps 5–11 are independently revertable.

---

# Decisions still open (before any apply)

These need user input or a `dodo-content-writer` pass before locking the strings:

1. **ZH brand label for the older band.** `ELA 课程` (terse) vs `都学英语课程` (descriptive). Naming model defaults to `ELA 课程`; confirm or override.
2. **"Programs" vs "ELA Programs" for nav primary label.** Default: `Programs`.
3. **Confidence that "Grade 3+" is the right band tag** (changed from Grade 4+ on 2026-06-03 per user). Live AgeBandChooser tag is still `Grade 4+` / `四年级及以上`; rename to `Grade 3+` / `三年级及以上` is part of the apply.
4. **/demos K-2 row content.** Real videos vs placeholder "Recording soon" cards.
5. **/navigators K-2 profile.** Add a real Navigator profile vs add a single framing sentence (less impact, less risk).
6. **/faq Little DODO category questions.** The 6 starter questions in W1.2 are placeholders. Real questions should come from actual K-2 consult-call patterns.
7. **/about "Families We Serve" fourth card.** Add fourth ("Early-Reader Home") vs reframe one existing card.

Get these resolved (in chat or via `dodo-content-writer`) and the apply phase becomes mechanical.

---

# What this proposal does NOT touch

- URL routes (no `/programs` hub, no rename of `/program` or `/little-dodo`).
- Navbar primary item count (stays 6).
- PreCtaBand SUPPRESS list membership.
- Design tokens / color palette / spacing protocol.
- New components (everything reuses AgeBandChooser, Card, Button, SectionWrapper).
- New routes or new locales.
- DODO Coding sibling-site work.
- DL_NAVIGATORS portal work.
- Audiobook content writing (separate task).
- The `/assessment` page (still UnderConstruction; will be designed parallel when it ships).
- Cal.com booking configuration (the ConsultCalEmbed; whether to add an age-band field is a separate ops decision — flag for review).

Ready to apply on user trigger.
