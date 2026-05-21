# Content style decisions log

**Purpose:** Date-stamped log of active brand/voice decisions made during page-by-page content reviews. Decisions promoted from this log into `translation/BRAND_CONTENT_GUIDE.md` when stable. Living doc — append, never delete.

**How to read:** Each entry includes (1) the decision, (2) what it overrides if anything, (3) where it lives now (brand guide section, glossary entry, skill lint rule), and (4) the trigger (which review surfaced it).

---

## 2026-05-21 · Home page review (first granular pass)

### D1 · LCS promoted to parent-facing methodology name
- **Decision:** On brand surfaces (dodolearning.com), the named methodology system is **"The LCS System"** (EN) / **"LCS 教学理念"** (ZH). "The Loop" is preserved as the per-session phrase Read → Think → Speak → Write that lives inside body copy. Never use "The Loop" as a section header / pillar heading on brand surfaces.
- **Overrides:** Prior §06 framing where The Loop was the dominant named surface.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §06 (Loop vs LCS naming convention note, 2026-05-21); §09 owned-vocabulary rows updated; `dodo-content-writer` skill lint rule added.
- **Trigger:** User edits to home `LoopSection` (EN H2 → "The LCS System", ZH H2 → "LCS 教学理念") and Pillar 2 heading/body/link.

### D2 · MCT direct naming permitted in Write step
- **Decision:** When describing the actual writing arc students follow, MCT may be named directly using the construction *"the MCT writing arc: Grammar → sentence → paragraph → essay → academic composition"*. This is in addition to the existing soft-distancing phrasings.
- **Overrides:** Prior §07 restriction that MCT only appeared with soft-distancing phrasings.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §07 MCT row permitted-phrasings column.
- **Trigger:** User Write-step EN edit replacing 6+1 Trait framework reference with MCT writing-arc progression. 6+1 retained as the scoring rubric for the same step.

### D3 · ZH H1 = brand sub-tagline
- **Decision:** On the home hero, the ZH H1 is the brand sub-tagline: **"以原版文学精读为起点，用写作锤炼思维，用表达释放声音。"** (Master Brand Guide v3.1 origin.) ZH H1 line 2 left empty.
- **Overrides:** Prior poetic two-line ZH H1 ("孩子的英文根基..."). The sub-tagline replaces it as the H1 source.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §12 home row (H1 = brand sub-tagline in ZH).
- **Trigger:** User edit to `hero.h1` in `app/[locale]/page.tsx`.

### D4 · ZH voice patterns (six rules)
- **Decision:** Six ZH-specific voice patterns recorded in §08:
  1. Positioning over poetic abstraction in headlines
  2. Two-sentence punch openers for body paragraphs
  3. Avoid combat metaphors (捍卫 → 表达并支持; 战胜 → 引导)
  4. Use four-character idiomatic frames (高频低压, 可见可量化)
  5. Drop reassurance tails (而不是猜测 / 我们承诺 / 我们保证)
  6. Use 外教 only as contrast term, never as DODO self-positioning
- **Overrides:** Nothing — additive. Codifies patterns implicit in the brand voice but not previously written down.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §08 ZH-specific voice patterns table; `dodo-content-writer` skill lint rules; glossary §09 (外教, 高频低压).
- **Trigger:** User ZH edits across §3.2 H2, §3.4 body1, §4.6 Speak step, §5.4 Pillar 1 body.

### D5 · Testimonial style: First name + last initial, primary city pool
- **Decision:** Result-card students get realistic first names + last initial (Vincent X · Juliette W · River C). Placeholder "Student A/B/C" forbidden in production. Cities rotate through the primary pool: Vancouver · Calgary · Toronto · Montreal · San Francisco Bay Area · **Denver** (new addition 2026-05-21). Markham retired from primary pool in favor of Calgary.
- **Overrides:** Prior placeholder convention.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §11 testimonial/result-card style table; `dodo-content-writer` skill lint rules.
- **Trigger:** User updated all three result cards on home with named students and revised cities.

### D6 · Humanistic frame: "Enjoy the arts of language"
- **Decision:** The phrase **"Enabling students to enjoy the arts of language" / "培养学生享受文学艺术的能力"** is the humanistic positioning that pairs with cognitive-rigor language. Used as section H2 on trust/results surfaces. Recognises that rigor and joy are not opposites.
- **Overrides:** Replaced "The numbers speak first / Then the parents" as the home parent-trust section H2.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §09 owned vocabulary; appears in §11 implicitly as a positioning phrase.
- **Trigger:** User §6.2 H2 edit on home.
- **Watch:** This may be a candidate 4th brand truth (joy/arts pairing with rigor). Re-evaluate after /about and /program reviews.

### D7 · Specific book titles over genre labels
- **Decision:** In Read-step copy, name specific SAT-recognized classics (Alice in Wonderland, The Invisible Man, The War of the Worlds) over generic descriptors ("analytical non-fiction").
- **Overrides:** Prior Read step on home which used "Alice + Treasure Island + Poe + analytical non-fiction".
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §12 home row must-include adds "one specific book title in Read step".
- **Trigger:** User Read-step EN edit on home.

### D8 · Canonical Lexile claim — one grade level over two 16-week cycles
- **Decision:** The canonical Lexile gain claim is **"one grade level over two 16-week cycles"** — supersedes prior "187 points / 1.2 grade levels / 16 weeks" figure. Re-verify against latest cohort data before quoting tighter numbers.
- **Overrides:** §11 prior canonical figure.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §11 Typical Lexile gain row.
- **Trigger:** User Fix C admin-set-truth override during initial home review.

### D9 · ZH 6+1 trait canon updated
- **Decision:** New ZH canon for 6+1 traits: **思考、结构、声音、用词、流畅、规范、呈现**. Note: collides with "Think 思考" (Loop step 2) — accepted trade-off.
- **Overrides:** Prior `想法、结构、声音、用词、句子流畅度、规范性、呈现`.
- **Where it lives now:** `translation/dodo-glossary.json`; cascaded across `content/marketing.zh.js`, `content/faq.js`, `translation/DEEPSEEK_BRIEF.md`, `content/zh/blog/lexile-asymmetry-bilingual-children.mdx`.
- **Trigger:** User Fix A admin override during initial home review.

---

## Promotion checklist (review before each guide release)

For each decision above, ask: has this stabilized across 2+ surface reviews? If yes, lock into brand guide as canonical rule and drop from this log's "active" set. Decisions older than 90 days that haven't been promoted should be re-examined.

---

## Open observations (not yet decisions)

- **Em-dash style in ZH** — `——` (double em-dash, no space) vs `— ` (single em-dash + space). User edit on §5.6 mixed both. Worth a style call after 1–2 more page reviews.
- **"Improvements" vs "Results"** in soft CTAs — pattern emerging; need a second data point before codifying.
- **"高阶课程" phrasing** — user introduced it once. May be a candidate owned ZH phrase if it recurs.
