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

---

## 2026-05-21 (later) · /program review Round 2 + audience pivot

### D10 · Audience pivot to global positioning (Q1)
- **Decision:** Drop "Chinese immigrant families in Canada and the US" framing from positioning surfaces. Use "globally-mobile families" / "面向全球家庭" on `/program`, `/about`, home PhotoIntro body0, `/compare`, and `llms.txt` lead blockquote. Preserve Chinese-diaspora references where authentically operational (FAQ city coverage, bilingual cognitive-system descriptions).
- **Overrides:** Prior brand guide §04 NA-Chinese-immigrant scoping.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §04 dual-market block; cascaded across `/program`, `/about`, `/home`, `/compare`, llms files. Workflow #16 marked done.
- **Trigger:** User Q1 answer "Option B full calibration" during /program review.
- **Watch:** Core market remains Chinese diaspora (90%+ of current cohort). Voice and product language untouched — only surface positioning broadened. If future cohort data shifts substantially, re-evaluate §04.

### D11 · Canonical session length updated (Q2)
- **Decision:** "Sessions run up to 50 minutes, minimum once per week" (replaces "90 minutes, once per week"). Aligns with the variable-intensity Summit/Core/Flex combinations.
- **Where it lives now:** `marketing.{en,zh}.js` /program §3 Journey · `llms-full.txt` What DODO Is section · brand guide §05 implied via combination cadence.
- **Trigger:** User Q2 confirmation during /program review.

### D12 · Loop/LCS asymmetry permitted in EN/ZH within the same section (Q3 answer A)
- **Decision:** When EN and ZH copy in the same element describe per-session work, the choice between naming "The LCS" (architecture) or "The Loop" (per-session phrase) can be made independently per locale. Example: /program §3.4 EN says "works through The LCS" while ZH says "操练 The Loop" — both pass.
- **Reasoning:** ZH carries more rhythmic / per-session emotional weight via "操练 The Loop". EN reads cleaner with "The LCS". Both honor the brand-architecture distinction.
- **Where it lives now:** `marketing.{en,zh}.js` /program §3.4 · noted in `02-program-content-dump.md`.
- **Trigger:** User Q3 explicit answer A.

### D13 · Pricing display: hidden on /program, surfaced on /faq (Q7)
- **Decision:** Combination card price field hidden on /program via JSX conditional `{item.price && false && (...)}`. Item.price data preserved. Pricing facts live on `/faq#enrollment` as the only public source. Combinations `note` rewritten to remove "Pricing per 16-week cycle" framing and instead direct to FAQ.
- **Overrides:** Brand guide §12 /program "must include · pricing" — pricing is now via FAQ link, not directly displayed.
- **Where it lives now:** `app/[locale]/program/page.jsx` CombinationsSection · `marketing.{en,zh}.js` /program note. Workflow #17 marks "verify FAQ pricing current" as pending.
- **Trigger:** User Q7 answer A.
- **Future re-enable:** Delete `&& false` in the JSX conditional.

### D14 · Type A/B caption moved to /methodology (Q6 — deferred)
- **Decision:** Type A (Literacy Session) / Type B (Writing Session) caption removed from /program §2 (`loop.typeAB: ''` both locales). Content moves to /methodology when that page is reviewed. **Apply during /methodology review** — workflow #18 logged as deferred.
- **Where it lives now:** Cleared from `marketing.{en,zh}.js` /program loop.typeAB · workflow #18 pending · brand guide §05 still has the Type A/B definition (untouched).
- **Trigger:** User Q6 answer B.

### D15 · Observer-POV session pattern (Q8)
- **Decision:** "Real session" sections on conversion pages are written as third-person observer POV from an actual DLCW curriculum lesson. No marketing voice ("we build", "where confidence is built"), no timing notations, no slogan-branded Visible Thinking routine names. Real characters, real source quotes, cognitive discovery in the student's voice. First reference implementation: `/program §6` = Mud Trilogy Phase 2 Lesson 04 "The Red Tide" Ch. 4.
- **Where it lives now:** New brand guide section **§12a · The observer-POV session pattern**. Reference implementation at `marketing.{en,zh}.js` `program.session` (commit `6ced09c`). Reusable for /methodology, /about, /results when those surfaces want a "what does a real session look like" element.
- **Trigger:** User rejected the marketing-voice and gimmicky drafts; provided source curriculum path for grounding.

### Observations promoted to decisions
- **Pronoun disambiguation** in narrative scenes — when same-gender Navigator and student both appear, use explicit subjects ("Ms. Jennifer", "the student") for the subject who'd otherwise pronoun-collide. Applied in /program §6 EN+ZH. Now part of §12a observer-POV pattern.

### Still-open observations
- **EN/ZH semantic asymmetry tolerance** — D12 explicitly permits within one element; broader tolerance (sections deliberately diverging in their POV) hasn't been tested. Watch as more pages get reviewed.
- **Lexile data display strategy** — `/program` §6 dropped Lexile from the q1 dialogue. Whether this generalizes (Lexile signals stay in section chips + ProofStrip stats, not in narrative dialogue) needs another page test.

---

## 2026-06-01 · /about review

### D16 · "What We Believe" → "DODO Learning's Pillars"
- **Decision:** The /about beliefs section is reframed as **"DODO Learning's Pillars" / "DODO Learning 的核心支柱"**. Four numbered statements kept; wrapper language moved from belief/conviction → pillar. Internal: `BELIEFS_BASE` → `PILLARS_BASE`, aria `Belief N` → `Pillar N`. Sub ties the pillars to "every session — and every teaching moment a Navigator shares."
- **Where it lives now:** `app/[locale]/about/page.jsx` · `marketing.{en,zh}.js` `about.beliefs`. Bodies rewritten to weave (unnamed) MCT structure-of-language + Project Zero dialogic/visible-thinking philosophy.
- **Trigger:** User /about dump markup §3.

### D17 · Referral rate 90%+ → 75%+ (site-wide)
- **Decision:** Canonical referral figure is **75%+ from genuine word-of-mouth**, supersedes 90%+. Cascaded /about (EN+ZH), partners page (EN+ZH), llms-full.txt.
- **Overrides:** §11 prior 90%+.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §11 referral row.
- **Trigger:** User C-2.

### D18 · Top-50 university credential retained (top-30 rejected)
- **Decision:** Navigator credential stays **world top-50**. A proposed top-30 was rejected: the named pool (Oxford · U of T · Queen's · LSE) is not all top-30, so the tighter claim is unverifiable and fails the skeptical-parent fact-check (§04 profile).
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §11 credentials row (do-not-downgrade note).
- **Trigger:** User C-1.

### D19 · LCS ZH section header = 语言循环体系
- **Decision:** Canonical ZH section header for the LCS system is **"语言循环体系"**. Supersedes the prior three-way drift: D1's "LCS 教学理念" (§09), glossary "LCS 教学体系" (§15). EN unchanged ("The LCS System").
- **Overrides:** D1 ZH rendering; glossary LCS entries.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §09 + §15 · `dodo-glossary.json` LCS entries · `about/page.jsx` §4 heading.
- **Trigger:** User C-4.

### D20 · 领航员 forbidden as Navigator translation
- **Decision:** **领航员** (literal "navigator") is forbidden — Navigator is always **导师（Navigator）**. Purged from /about heading, /consult h2zh (also fixed typo 咋询→咨询), demos labels (EN+ZH).
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §09 Navigators row + §10 anti-dictionary · `dodo-glossary.json` voice_rules.
- **Trigger:** User /about dump §5 remark.

### D21 · Mother-tongue framing over Chinese-specific
- **Decision:** In globalized body copy, the child's first language is **"mother tongue" / "母语"**, not "Chinese / 中文" — except on intentionally core-market surfaces. Applied to /about Pillar 03 + Family 1.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §04 (2026-06-01 note). Operationalizes D10's "cascade pending".
- **Trigger:** User C-5.

### D22 · Founder named on /about; closing uses poetic ZH sub-tagline
- **Decision:** (a) **Janet Sui** is named in the /about hero sub + video label (founder identity, §12 must-include). (b) The closing-stamp ZH H2 switches from the literal "一次思考，两种语言。" to the canonical poetic sub-tagline **"语言的根，长在阅读里"** (§00). EN tagline unchanged.
- **Where it lives now:** `marketing.{en,zh}.js` `about.hero` · `about/page.jsx` ClosingStamp.
- **Trigger:** User C-3, C-6.

### Reinforced (not new)
- **ZH combat-metaphor lint** caught **捍卫** in the /about Speak step + Pillar 01 body — replaced with 阐明并支持 / 支持自己的立场. Lint rule already in §08 + skill; this is a recurrence flag.
- **Affirmative voice** — removed the oppositional "Not teachers. / Navigators." chip pair from /about §5 (render deleted; orphan `chipNot`/`chipAre` content keys left harmless).
