# D99 growth-canon cascade — DRAFT, apply-gated

**Ruling (2026-09-05, admin, via rulings form):** the canonical growth rate is
**about one grade level of reading growth per 16-week cycle**; the measured set is
restored as canon: **187 Lexile points average · 1.2 grade levels · 94% ≥ one full
grade level**. Supersedes the 2026-05-21 two-cycle set (D8 → D99).

**Status:** guides amended (BCG §01/§02/§06/§11/§12/§13 EN+ZH, same change as this
draft). The former contradiction set C1–C4 — home `:276`, `/program` `:486`,
`/compare` `:794`, `/results` rail `:1232–1234` — plus `en:198`, `en:1182`\*,
`en:1530`, `zh:180`, `zh:259` and both blog posts now **conform** and need no edit
(\*`en:1182` keeps its 100–150L range — see flag 2). The spots below carried the
old two-cycle canon and are now the outliers. **None of these edits are applied.**
Admin reviews the proposed column, adjusts wording freely, then says **"apply"**.

| # | File:line | Live (old canon) | Proposed |
|---|---|---|---|
| 1 | `content/marketing.en.js:217` (home stat) | `number: '1', unit: 'grade level', label: 'average Lexile reading growth across two 16-week cycles'` | `label: 'average Lexile reading growth in each 16-week cycle'` |
| 2 | `content/marketing.en.js:363` (program meta description) | "One grade level of growth across two 16-week cycles." | "About one grade level of growth in each 16-week cycle." |
| 3 | `content/marketing.en.js:485` (`/program` growth sub) | "Students typically advance one grade level in reading across two 16-week cycles, with per-cycle Lexile gains in the 100L–150L range." | "Students typically advance about one grade level in reading in each 16-week cycle — an average gain of 187 Lexile points." |
| 4 | `content/marketing.en.js:822` (`/methodology` intro) | "The cognitive training behind one grade level of reading growth across two 16-week cycles." | "The cognitive training behind about one grade level of reading growth in each 16-week cycle." |
| 5 | `content/marketing.en.js:842` (LCS description) | "Students typically gain one grade level of reading across two 16-week cycles." | "Students typically gain about one grade level of reading in each 16-week cycle." |
| 6 | `content/marketing.en.js:1004–1015` (`/methodology` tiles 1–2) | tile 1: `number: '100–150L' · 'typical Lexile gain in each 16-week cycle'`; tile 2: `number: '1', unit: 'grade level', label: 'reading growth across two 16-week cycles'` | tile 1: `number: '187L', label: 'average Lexile gain in each 16-week cycle'`; tile 2: `label: 'average reading growth in each 16-week cycle'` (tile 3, the 100L ≈ half-grade conversion, unchanged) |
| 7 | `content/marketing.en.js:1749–1750` (Lexile framework card) | "Students typically advance one full grade level in reading across two 16-week cycles (per-cycle Lexile gains in the 100L–150L range)." | "Students typically advance about one full grade level in reading in each 16-week cycle (average gain 187 Lexile points)." |
| 8 | `content/marketing.zh.js:199` (home stat) | `'两个16周课程周期内的平均Lexile阅读水平增长'` | `'每个16周课程周期的平均Lexile阅读水平增长'` |
| 9 | `content/marketing.zh.js:346` (program meta description) | "两个16周周期内Lexile阅读水平提升一个年级。" | "每个16周周期Lexile阅读水平提升约一个年级。" |
| 10 | `lib/schema.js:111–112` (Organization schema) | "Students typically advance one grade level in reading across two 16-week cycles." | "Students typically advance about one grade level in reading in each 16-week cycle." |
| 11 | `lib/schema.js:258–259` (ELA Course schema) | "Students typically advance one full grade level in reading across two 16-week cycles." | "Students typically advance about one full grade level in reading in each 16-week cycle." |
| 12 | `public/llms.txt:3` | "ELA Program students typically advance one grade level in reading across two 16-week cycles." | "ELA Program students typically advance about one grade level in reading in each 16-week cycle." |
| 13 | `public/llms-full.txt:71` | "one grade level in reading across two 16-week cycles (the canonical Lexile claim as of 2026-05-21; per-cycle Lexile gains typically fall in the 100L–150L range, accumulating to one full grade level by the end of the second cycle)" | "**about one grade level in reading in each 16-week cycle** (the canonical Lexile claim as of 2026-09-05, D99; measured set: 187 Lexile points average · 1.2 grade levels · 94% of students at least one full grade level)" |
| 14 | `public/llms-full.zh.txt:70` | "学生通常在 **两个 16 周周期内阅读级别提升一个年级**（2026-05-21 起的官方蓝思陈述；每周期蓝思提升典型落在 100L–150L，累计到第二周期结束达到完整一个年级）。" | "学生通常在**每个 16 周周期内阅读级别提升约一个年级**（2026-09-05 起的官方蓝思陈述，D99；实测：平均 187 蓝思点 · 1.2 个年级 · 94% 学生至少提升一整个年级）。" |

## Flags for the admin (decide before "apply")

1. **The 100–150L per-cycle range dies with the old canon.** It implied half to
   three-quarters of a grade per cycle (via the 100L ≈ half-grade conversion) and
   cannot coexist with "about one grade per cycle". The draft replaces it with the
   measured 187L average everywhere it appears (rows 3, 6, 7). If the range should
   survive as a floor ("100–150L+"), say so.
2. **Arithmetic tension left visible:** 187L × (half-grade per 100L) ≈ 0.94 grades,
   while the `/results` rail says 1.2 grade levels. Both are defensible (grade-band
   conversion is non-linear) but a sharp reader can do the division. The draft
   keeps both, per the ruling; flagging, not resolving.
3. `en:1182` ("advance 100L to 150L — roughly one full grade level") conforms in
   *rate* but keeps the 100–150L range flag 1 retires elsewhere. Optional row:
   "advance about 187 Lexile points — roughly one full grade level."
4. Blog claim "187 points — just under one full grade level in four months" now
   conforms exactly; naming fix (16-Week Program → ELA Program) already applied.
