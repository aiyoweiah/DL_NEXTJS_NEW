# Home page — full content dump for granular review

**Source file:** `content/marketing.{en,zh}.js` (`home` export, migrated from inline `HOMEPAGE_COPY` 2026-05-21 per workflow #13)
**As of:** 2026-05-21 (after Round 1 Fix A/B/C/D + Round 2 33-edit pass; pre-migration text below not refreshed to post-migration shape)
**Status:** Archived. Home review Round 1+2 complete; see `01-home.md` for applied state.
**Purpose:** Every user-facing string on the home page, with clear site-position indicator. EN ↔ ZH side-by-side. No commentary.

**Page layout (top → bottom):**
1. SEO meta (head, not visible on page)
2. Hero (light bg `#F5F5FF`) — full viewport
3. ProofStrip (dark bg `#212830`)
4. PhotoIntro (white bg)
5. LoopSection (dark bg)
6. ConfidenceSection (light bg)
7. ParentTrustSection (dark bg)

---

## §0 · SEO META — `<head>` (not visible on page)

### `<title>`

**EN:**
> DODO Learning — English Literacy at the Cognitive Level | Think Once. In Both Languages.

**ZH:**
> DODO都学语言 — 英文认知深度，保护两种语言

### `<meta name="description">`

**EN:**
> Navigator-led English literacy program training the full Read→Think→Speak→Write loop. One grade level of Lexile growth in 16 weeks. Built on the MCT Language Arts framework. Bilingual depth emerges from cognitive rigor.

**ZH:**
> 导师主导的英语深度学习课程，训练完整的阅读→思考→表达→写作闭环。16周内Lexile阅读测验平均提升一个年级。

---

## §1 · HERO SECTION (top of page, full viewport, light background)

### Element 1.1 — Eyebrow badge (lavender pill, top-left above H1)

**EN:**
> For children who will think and lead in English at the highest levels

**ZH:**
> 为五年后能在英语环境里侃侃而谈的孩子

*(There is a second eyebrow slot `eyebrow2` — currently empty in both locales.)*

### Element 1.2 — H1 (two-line headline, primary visual focus)

**EN — line 1:**
> English mastery at the cognitive level.

**EN — line 2:**
> Bilingual depth as the natural outcome.

**ZH — line 1:**
> 以原版文学精读为起点，用写作锤炼思维，用表达释放声音。

**ZH — line 2:**
> empty now.

*(There is a third H1 slot `h1Chinese` for an additional ZH overlay — currently empty.)*

### Element 1.3 — Consult-hook paragraph (lavender text, directly under H1)

**I actually don't see this on live site. investigate**

**EN:**
> We train English Thinkers — children who read above grade level, argue with evidence, write with precision. Built on the advanced literature and writing framework and Harvard's thinking science.

**ZH:**
> 我们培养英语思维者——能阅读超出年级水平的文本、以证据论证、精确写作的孩子。以高阶文学与写作框架、哈佛思维科学为根基。

### Element 1.4 — Primary CTA button (gilt/gold, links to `/[locale]/consult`)

**EN:**
> Book Your Consultation

**ZH:**
> 预约能力评估

### Element 1.5 — Secondary CTA button (ghost outline, links to `/[locale]/program`)

**EN:**
> Explore The 16-Week Program

**ZH:**
> 探索16周课程

### Element 1.6 — Trust line (small grey text, bottom of hero)

**EN:**
> Lexile-measured progress · 6+1 Trait writing framework · Live Navigator-led sessions · Think Once. In Both Languages.

**ZH:**
> Lexile测量进度 · 6+1 Trait写作评估体系 · 导师实时主导 · Think Once. In Both Languages.

---

## §2 · PROOF STRIP (dark band below hero, 4 stat columns)

*Each column has three lines: big number → unit (small caps) → label (small grey).*

### Element 2.1 — Stat 1 (families)

**EN:**
- Number: `300+`
- Unit: `children & families`
- Label: `served since launch — real Lexile growth, verified results`

**ZH:**
- Number: `300+`
- Unit: `个孩子和家庭`
- Label: `自成立以来真实陪跑——Lexile真实增长，已验证的成果`

### Element 2.2 — Stat 2 (Lexile)

**EN:**
- Number: `1`
- Unit: `grade level`
- Label: `average Lexile reading growth across two 16-week cycles`

**ZH:**
- Number: `1`
- Unit: `个年级`
- Label: `两个16周课程周期内的平均Lexile阅读水平增长`

### Element 2.3 — Stat 3 (writing)

**EN:**
- Number: `2×`
- Unit: `writing score gain`
- Label: `average 6+1 Trait score gain from entry to exit assessment`

**ZH:**
- Number: `2×`
- Unit: `写作评分增长`
- Label: `入学至结课6+1 Trait平均得分增长`

### Element 2.4 — Stat 4 (retention)

**EN:**
- Number: `8/10`
- Unit: `continue after first 16 weeks`
- Label: `families see the growth and choose to continue`

**ZH:**
- Number: `8/10`
- Unit: `16周后继续`
- Label: `家庭看到成果，主动选择继续`

---

## §3 · PHOTO INTRO SECTION (white background, image right, text left)

### Element 3.1 — Eyebrow (lavender, above heading)

**EN:**
> Who We Are

**ZH:**
> 认识导师团队

### Element 3.2 — Section H2 (dark text, primary heading)

**EN:**
> The difference between a teacher and a Navigator is a map.

**ZH:**
> 外教不代表会教：我们只用文学写作专家。

### Element 3.3 — Body paragraph 1 (`body0`)

**EN:**
> Your child's school knows what grade they're in. That's not the same as knowing where they are. Most children in immigrant families carry a reading gap their report card never shows — the distance between what they can decode and what they can actually think through.

**ZH:**
> 学校知道孩子在几年级。那不等于知道孩子真正站在哪里。很多华人家庭的孩子，都有一个成绩单上看不见的阅读差距——能认出的词，和能真正思考的内容，中间隔着一段距离。这段距离，大多数课程测不出来。

### Element 3.4 — Body paragraph 2 (`body1`)

**EN:**
> Navigators are not tutors. They are specialists in composition, literature, and academic writing — trained in the MCT Language Arts tradition and in the structured thinking protocols of Harvard Project Zero. They close the gap between where your child reads now and where their academic life demands.

**ZH:**
> 导师一对一不间断。 英语是他们的母语，却远不止外教。

课堂里，导师不会问"你读懂了什么？"，而会问"你觉得这个人物为什么做出这个选择？"—— 专注培养孩子用英语的思考就是 DODO Learning 不一样的地方 。导师们是写作、文学和学术写作领域的专家——以MCT语言艺术传统为基础，运用哈佛Project Zero思维训练体系，专门负责缩短学生当前Lexile阅读水平与学业真正需求之间的差距。

### Element 3.5 — Body paragraph 3 (`body2`)

**EN:**
> Every Navigator tracks one thing per student: the distance between their current literacy & writing level and their goal — and closes it, week by week, through The LCS System. Bilingual depth emerges from this rigor, never taught separately.

**ZH:**
> 导师从头到尾追踪学生的进步：当前读写水平与目标之间的距离——并通过The LCS 逐周缩小这个距离，高阶课程来确保学生不断的进阶和进步。
### Element 3.6 — Primary CTA (ghost button, links to `/[locale]/navigators`)

**EN:**
> Meet the Navigators

**ZH:**
> 认识导师团队

### Element 3.7 — Secondary CTA (ghost button, links to `/[locale]/results`)

**EN:**
> See Student Improvements

**ZH:**
> 学生成功

### Element 3.8 — Image alt text (`/homepage-mom-daughter-thinking.jpeg`)

**EN:**
> A mother watches her child pause mid-thought after finishing a reading passage at home

**ZH:**
> 一位母亲注视孩子在家中读完一段课文后停下来思考的瞬间

---

## §4 · LOOP SECTION (dark background, 4-column grid of step cards)

### Element 4.1 — Eyebrow (lavender, top of section)

**EN:**
> The Methodology

**ZH:**
> 教学方法

### Element 4.2 — Section H2

**EN:**
> The LCS System

**ZH:**
> LCS 教学理念

### Element 4.3 — Section body (grey text below H2)

**EN:**
> Every session. Every week. In this order, without exception. Read → Think → Speak → Write is not a framework we teach about — it is what we do.

**ZH:**
> 每一节课，每一周，坚持高频低压的建立语言习惯。阅读 → 思考 → 表达 → 写作是我们课程每节课练习的。

### Element 4.4 — Step 01 card (Read)

**Label (lavender heading on dark card):**
- EN: `Read`
- ZH: `Read 阅读`

**Description (grey body text):**

EN:
> Students read classical and SAT-must read texts chosen at or just above their current Lexile level — from Alice in Wonderland and The Invisible Man, to The War of the Worlds, progressively greater complexity. No simplified versions. The text is the raw material.

ZH:
> 学生阅读精心选定的经典与分析性文本——从（LLM Re-translate with reliable sources)，以及递进难度的说明性非虚构文本，选材在当前Lexile水平或略高一筹。原文，没有简化版。文本是原材料。

### Element 4.5 — Step 02 card (Think)

**Label:**
- EN: `Think`
- ZH: `Think 思考`

**Description:**

EN:
> Navigators are trained to utilize Harvard Project Zero thinking routines to form precise discussions — supported by specific textual evidence, beyond general impression.

ZH:
> 导师运用哈佛教育学院研发的Project Zero思维训练工具，引导学生形成有具体依据支撑的明确立场。他们真正认为什么？而不是他们觉得应该认为什么。

### Element 4.6 — Step 03 card (Speak)

**Label:**
- EN: `Speak`
- ZH: `Speak 表达`

**Description:**

EN:
> Students defend their thinking in a live Socratic session with their Navigator. The Navigator's first move after any answer is always a more thought provoking question — never an evaluation. Precision in speech precedes precision in writing.

ZH:
> 学生在与导师的实时苏格拉底式对话中表达并支持自己的立场。导师在学生回答后的引导 - 永远是一个更深入的问题。导师不急于评价，我们借着好的问题来训练学生口语表达的精准度。

### Element 4.7 — Step 04 card (Write)

**Label:**
- EN: `Write`
- ZH: `Write 写作`

**Description:**

EN:
> Students produce written work assessed through the MCT framework: Grammar, Sentence composition, paragraph composition, English essay, creative writing, poetry, and much more. (You can research and expand grounded with MCT)

ZH:
> 学生产出书面作品，以6+1 Trait框架评估：思考、结构、声音、用词、流畅、规范、呈现。导师为每篇作品逐项评分。进步可见，可量化。(Rewrite and flag for review)

### Element 4.8 — Section CTA (ghost button, bottom of section, links to `/[locale]/methodology`)

**EN:**
> Read the full methodology →

**ZH:**
> 阅读完整教学方法 →

---

## §5 · CONFIDENCE SECTION (light background, 3-column pillar grid)

### Element 5.1 — Eyebrow

**EN:**
> How It Works

**ZH:**
> 简单说

### Element 5.2 — Section H2

**EN:**
> One grade level of English reading growth. Sixteen weeks. 

**ZH:**
> 一期16周，学生英语阅读提升一个年级。

### Element 5.3 — Section body

**EN:**
> Measured by Lexile. Shown in writing scores. When a child learns to think precisely in English, that discipline transfers — to every subject, every exam, every language they use.

**ZH:**
> 以Lexile测量。写作评分可见。当孩子学会用英文精确思考，这种认知训练迁移到每一门学科、每一次考试、到他们使用的每一种语言。

### Element 5.4 — Pillar 1 (assessment, links to `/[locale]/program`)

**Eyebrow:**
- EN: `Before We Begin`
- ZH: `开始之前`

**Heading:**
- EN: `We find out exactly where your child is.`
- ZH: `我们确切了解您的孩子目前在哪里。`

**Body:**

EN:
> Not where their school report says they are. Before the first session, every student receives a Lexile reading assessment and a baseline 6+1 Trait writing evaluation. We plan from data, not from guesswork.

ZH:
> 不是学校成绩单说的在哪里。在第一节课之前，每位学生都会接受Lexile阅读评估和6+1 Trait写作基准线评估。我们根据数据制定方案。

**Link label:**
- EN: `How the assessment works`
- ZH: `测评如何进行`

### Element 5.5 — Pillar 2 (loop, links to `/[locale]/methodology`)

**Eyebrow:**
- EN: `During The Program`
- ZH: `课程期间`

**Heading:**
- EN: `Every session runs The LCS.`
- ZH: `每节课均运行The LCS。`

**Body:**

EN:
> Read. Think. Speak. Write. Your child's Navigator tracks their movement through each phase every week. The LCS system is grounded in the MCT Language Arts framework and Harvard Project Zero's thinking routines. Nothing is guessed. Everything is guided and measured.

ZH:
> 阅读。思考。表达。写作。导师每周追踪孩子在每个阶段的进展。The MCT 以 MCT 语言艺术框架和哈佛Project Zero思维训练体系为基础。全程有量有据。

**Link label:**
- EN: `Understand The Loop`
- ZH: `理解The Loop`

### Element 5.6 — Pillar 3 (results, links to `/[locale]/results`)

**Eyebrow:**
- EN: `After 16 Weeks`
- ZH: `16周后`

**Heading:**
- EN: `We show you the numbers.`
- ZH: `我们展示数字。`

**Body:**

EN:
> Every student receives an exit Lexile assessment and a re-evaluated 6+1 Trait writing score. A child who can read complex text, argue a position, and write with intention in English — and who also thinks in Chinese — has a mind built for what comes next. That is the competitive advantage AI cannot replace.

ZH:
> 每位学生将接受结课Lexile评估和重新评估的6+1 Trait写作得分。能用英文阅读复杂文本、以论据支撑立场、有意识地写作——同时也在中文里思考— 让孩子拥有AI替代不了的能力。这是真正的竞争优势。

**Link label:**
- EN: `View student results`
- ZH: `查看学生成果`

---

## §6 · PARENT TRUST SECTION (dark background, 3-column results grid)

### Element 6.1 — Eyebrow

**EN:**
> Student Results

**ZH:**
> 学生成果

### Element 6.2 — Section H2 (two-line)

**EN — line 1:**
> Enabling students to enjoy the arts of language

**EN — line 2:**
> 

**ZH — line 1:**
> 培养学生享受文学艺术的能力

**ZH — line 2:**
> 

### Element 6.3 — "View all" link (right-aligned, top of section, links to `/[locale]/results`)

**EN:**
> View all results →

**ZH:**
> 查看全部成果 →

### Element 6.4 — Weeks label suffix (used in each result card meta line)

- EN: `weeks`
- ZH: `周`

### Element 6.5 — Result card 1 (Student A · Grade 5 · Vancouver)

| Field | EN | ZH |
|---|---|---|
| Student | Vincent X | Vincent X |
| Detail | Grade 5 · Vancouver | 五年级 · 温哥华 |
| Lexile start | 620 | 620 |
| Lexile end | 820 | 820 |
| Weeks | 16 | 16 |
| 6+1 trait badge | Voice: 2 → 4 | Voice 声音: 2 → 4 |
| Source | Parent, Vancouver | 家长，温哥华 |

**Quote (EN):**
> She started raising her hand in class by week eight. By week twelve she was leading the discussion.

**Quote (ZH):**
> 她到了第八周开始主动举手发言。到第十二周时，她已经在引领课堂讨论了。

### Element 6.6 — Result card 2 (Student B · Grade 6 · Markham)

| Field | EN | ZH |
|---|---|---|
| Student | Juliette W | Juliette W |
| Detail | Grade 6 · Calgary | 六年级 · 卡尔加里 |
| Lexile start | 540 | 540 |
| Lexile end | 720 | 720 |
| Weeks | 16 | 16 |
| 6+1 trait badge | Organization: 2 → 5 | Organization 结构: 2 → 5 |
| Source | Parent, Calgary | 家长，卡尔加里 |

**Quote (EN):**
> His teacher told us his writing had transformed. The 6+1 scores made it easy to see exactly what changed.

**Quote (ZH):**
> 孩子的老师告诉我们，他的作文从以前的两三行变成了满满一页，结构也清楚了。

### Element 6.7 — Result card 3 (Student C · Grade 7 · Bay Area)

| Field | EN | ZH |
|---|---|---|
| Student | River C | River C |
| Detail | Grade 7 · Denver | 七年级 · 丹佛 |
| Lexile start | 710 | 710 |
| Lexile end | 940 | 940 |
| Weeks | 16 | 16 |
| 6+1 trait badge | Ideas: 3 → 5 | Ideas 思考: 3 → 5 |
| Source | Parent, Denver | 家长，丹佛 |

**Quote (EN):**
> She went from dreading writing assignments to submitting them early. The Navigator knew exactly where she was stuck.

**Quote (ZH):**
> 她从害怕写作任务，到提前交作业。导师确切地知道她卡在哪里了。

---

## End of home page content

**Elements rendered by component but NOT in HOMEPAGE_COPY:**
- Navigation header (lives in `app/layout.jsx` / `components/Header.jsx`)
- Site footer (lives in `app/layout.jsx` / `components/Footer.jsx`)
- O-glyph SVG watermark (decorative, no text)

**Structural keys present but currently empty (no render):**
- `hero.eyebrow2` (second eyebrow slot)
- `hero.h1Chinese` (additional ZH H1 overlay)
- `hero.differentiator` (unused slot)
- The `closing` section was removed from JSX — no component renders it.

---

**How to mark this up for review:**
- Strike through any text you want changed
- Write your replacement directly below the original (label it `→`)
- Add comments in `// ...` blocks
- When done, save and say "apply content review" — I'll diff and apply.
