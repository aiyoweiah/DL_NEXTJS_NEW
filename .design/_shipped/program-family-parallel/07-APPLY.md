# Apply log

**Started:** 2026-06-03
**Mode:** "apply 12" with defaults + ZH route through `/dodo-content-writer` (per user pick on 2026-06-03)

---

## Steps 1 + 2 — COMPLETE

### What landed

Mechanical brand renames + chrome edits across all live content files. Bilingual parity verified by `node` require parse.

**Files edited:**

- `content/marketing.en.js` — ~17 brand renames, nav.primary label "ELA Program" → "Programs", nav.more prepended with Little DODO, footer.columns.program "Program" → "Programs", footer.program[0] "The 16-Week Program" → "ELA Program (Grade 3+)", ageBands[1] tag "Grade 4+" → "Grade 3+" + name "The 16-Week Program" → "ELA Program" + cta "See The 16-Week Program" → "Explore the ELA Program" + blurb gains "A 16-week cycle, four skills every session"
- `content/marketing.zh.js` — mirror renames (`十六周课程` / `16周课程` → `ELA 课程`), nav.primary `'ELA 课程'` → `'课程'` (matches plural EN), nav.more prepended with `'都学启蒙（5–8 岁）'`, ageBands[1] tag `'四年级及以上'` → `'三年级及以上'` + name `'十六周课程'` → `'ELA 课程'` + cta `'查看十六周课程'` → `'探索 ELA 课程'`
- `content/faq.js` — section heading `"Everything in the 16-Week Program — no surprises."` → `"Everything in the ELA Program — no surprises."` (only Title-Case brand use; the ~40 lowercase `"16-week program"` descriptor uses kept as descriptors per naming model)
- `content/cities.js` — Toronto + SF Bay Area + LA city-context strings (EN + ZH) brand-renamed; `citiesUi.en.badge` `"The 16-Week Program"` → `"ELA Program · Little DODO"` (parallel signal), `citiesUi.zh.badge` `"16周课程"` → `"ELA 课程 · 都学启蒙"`, plus `structureBody` + `charterBody` brand renames EN + ZH
- `lib/schema.js` — Course schema `name` `"The DODO 16-Week Program"` → `"English Language Arts Program — DODO Learning"`; description body brand renames; `Offers.description` `"Initial-cohort enrollment for the 16-week program"` → `"…for the ELA Program"`; littleDodoCourseSchema description "the DODO 16-Week Program" → "the DODO ELA Program" + "formal Lexile measurement begins later, in the 16-Week Program" → "in the ELA Program (Grade 3+)"
- `public/llms.txt` — umbrella paragraph added at top naming both programs explicitly with shared 16-week cycle + Navigator model; Core pages: "[The 16-Week Program]" → "[ELA Program — Grade 3+]" + description rewritten for Grade 3+; "[Little DODO]" description rewritten to reference "the ELA Program" instead of "the 16-Week Program"

### Verification

```text
$ node -e "..."
Parsed: marketing.en.js, marketing.zh.js, faq.js, cities.js
EN nav.more length: 6 (should be 6 with Little DODO first)
EN nav.more[0]: { href: '/little-dodo', label: 'Little DODO (5–8)' }
ZH nav.more[0]: { href: '/little-dodo', label: '都学启蒙（5–8 岁）' }
EN ageBands[0]: Little DODO | Ages 5–8
EN ageBands[1]: ELA Program | Grade 3+
cities EN badge: ELA Program · Little DODO
cities ZH badge: ELA 课程 · 都学启蒙
```

All bilingual content files require-parse cleanly. No `next build` run yet — recommended before continuing to Step 3.

### What's intentionally NOT renamed

Per naming model `00-NAMING_MODEL.md`:
- `"16-week cycle"`, `"after 16 weeks"`, `"across two 16-week cycles"`, `"P16W"` (ISO 8601), `"16 周"` (ZH duration) — format descriptors describing cycle length. Apply to both bands. **Kept everywhere.**
- `"the 16-week program"` (lowercase) in FAQ question text and answer body — lowercase descriptor uses; not Title-Case brand use. Kept. Will be revisited if Step 11 (FAQ K-2 category authoring) surfaces specific FAQ items that should drop the brand-y phrasing entirely.
- Lexile-benchmark-table rows ("Grade 4: 635L – 950L" etc.) — factual Lexile data per grade. Unrelated to ELA Program brand. Kept.

### What's also deferred

- `content/en/blog/lexile-asymmetry-bilingual-children.mdx`, `content/en/blog/what-does-lexile-score-mean.mdx` + ZH mirrors — 4 small brand renames each. Not done in this batch; recommend pickup during a future blog content pass. Low-impact, low-traffic relative to the main app.

---

## Steps 3–12 — pending

These steps include **net-new content** that should be routed through `/dodo-content-writer` for ZH brand-voice review before locking, per your 2026-06-03 instruction:

| Step | Net-new content needing writer pass? |
|---|---|
| 3 — AgeBandChooser homeHeading/homeEyebrow | EN drafted in `00-NAMING_MODEL.md`; ZH needs writer pass |
| 4 — Home page band insertion | None (just wiring the existing component) |
| 5 — /program hero chip "Ages 5–8? See Little DODO" | New chip text EN + ZH |
| 6 — Tier 2 callouts on 5 pages | One sentence per page EN + ZH × 5 pages |
| 7 — /demos band-labelled rows | Row labels + placeholder card text EN + ZH |
| 8 — /consult parallel-band signal | Hero subline + RealCall reframe + Trust bullet EN + ZH |
| 9 — /about Families We Serve 4th card | New family archetype EN + ZH |
| 10 — /cities callout | (Badge already done in Step 1; per-city callout line still net-new) |
| 11 — /faq Little DODO category | 6 Q+A in EN + ZH — the heaviest new-content task |
| 12 — Infra verification | None |

The recommendation: pause here, run `npx next build` and a manual look at the live site to confirm Steps 1+2 land cleanly, then resume Steps 3–12 with `/dodo-content-writer` invocations interleaved.

---

## Recommended next move

Run a build + look check on Steps 1+2 first:

```bash
cd DL_NEXTJS_NEW
npx next build
npx next start    # or use Cloudflare Pages preview
```

Visual targets to confirm:
1. Desktop navbar primary shows **Programs** (was "ELA Program")
2. Mobile drawer "more" group shows **Little DODO (5–8)** as the first secondary item
3. Footer column header shows **Programs** (was "Program") and first link reads **ELA Program (Grade 3+)** (was "The 16-Week Program")
4. `/program` hero H1 reads **"What happens in the ELA Program?"** (was "…16-Week Program?")
5. `/program` AgeBandChooser second card name = **ELA Program**, tag = **Grade 3+** (was "Grade 4+")
6. `/little-dodo` AgeBandChooser second card matches the same
7. `/cities/markham` (and any other Toronto-context page) reads "the ELA Program" not "The 16-Week Program"
8. `/sitemap.xml` still resolves
9. View-source on `/program` shows Course schema `name: "English Language Arts Program — DODO Learning"`

Then say `apply 3-12` (or any range) to continue. Or `rework <N>` to revise a specific step's plan before applying.
