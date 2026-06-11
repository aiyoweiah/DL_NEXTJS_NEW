# Copy pass — `/coding` homepage (lint + ZH mirror)

**Date:** 2026-06-09 · **Rewritten** to reflect the locked voice direction (language-art framing; three machine verbs; critical thinking as the human emphasis; no Loop / Arc / Protocol methodology name).
**Status:** No live files edited. Staged for apply.
**Authored via:** `dodo-content-writer` skill
**Source:** `F:\PC-Documents\DODO_Coding\marketing\dodo-coding-content-guide.md` §8.1 (adapted — the marketing guide v1.0 references the retired four-phase Loop in places; this copy pass uses its substance but replaces the Loop architecture)
**Brand guide consulted:** `DL_NEXTJS_NEW/translation/BRAND_CONTENT_GUIDE.md` v4.1; `DL_NEXTJS_NEW/translation/dodo-glossary.json`
**Scope:** `/coding` home only. Methodology, program, consult pages come in later passes.

> 📌 **What changed from the prior copy pass:** The earlier draft of this doc proposed a four-phase Loop graphic on the homepage (Read · Reason · Speak · Decide), with the fourth verb visually distinguished. The user redirected away from that architecture entirely. This rewrite:
> - Replaces the "Section 4 — The Methodology / The Loop" section with a "What we teach" section that surfaces three machine verbs (Read · Think · Write) as a plain typographic triplet, followed by a critical-thinking heading in `--ink-deep` as the human emphasis.
> - Deletes the Hard Block on the naming conflict — there is no DODO Coding "Loop" to conflict with.
> - Simplifies the brand-guide additive edits (no §09 exception clause; no new owned-term row for "The Protocol" or "The Arc").
> - Drops the §1.4 audience-positioning line's "decide what is worth building" tag — critical thinking is no longer a fourth verb; it's the discipline emphasized throughout.
>
> 📌 **Subsequent decisions (post-04 first draft):**
> - The Cross-sell to ELA section (Section 8) is kept as a **one-way pointer**: the `/coding` home page mentions ELA, but ELA pages do not mention DODO Coding. Per the separation directive.
> - `/coding/about` and `/coding/faq` are launch routes (not deferred). Copy passes for those land in subsequent docs.
> - `/coding/blog`, `/coding/cities/*`, `/coding/compare` are not built at launch.
> - No third card in `AgeBandChooser`. DODO Coding gets its own band on the ELA home (spec in `02-THEME.md`). A separate "DODO Coding band on ELA `/`" copy pass is needed — its review draft is at the end of this doc.

---

## Brand-system additive edits (simplified)

Apply with W5. No methodology-name exception needed.

### BRAND_CONTENT_GUIDE.md §07 — frameworks table extension

Add four rows for DODO Coding's anchor frameworks:

| Framework | One-line position | Permitted language | Forbidden language | Deploy on |
|---|---|---|---|---|
| **AI4K12 Five Big Ideas** (AAAI + CSTA) | International K–12 AI literacy framework. Five named Big Ideas (Perception · Representation & Reasoning · Learning · Natural Interaction · Societal Impact). The curriculum map. | "The AI4K12 Five Big Ideas framework" on first mention · rubric scores cited 1–5 per Big Idea | Vague "AI literacy" without naming the framework · "STEM" | /coding · /coding/methodology · /coding/program · llms.txt |
| **CMU CS Academy CS1–3** (Carnegie Mellon University) | Free open computer-science curriculum from CMU. CS1 → CS2 → 3CS. 3CS earns CMU college credit. | Always "CMU CS Academy" (proper name) · "Carnegie Mellon's open computer-science curriculum" · "3CS carries CMU college credit" | "Carnegie Mellon's online platform" · downgrading the credit claim | /coding · /coding/methodology · /coding/program · llms.txt |
| **AI Engineering (Chip Huyen, O'Reilly 2025)** | Foundation-model-era textbook, adapted for age-appropriate delivery. | "Chip Huyen's *AI Engineering*" on first mention; "Huyen" subsequent · cite O'Reilly · "foundation models" preferred over "large language models" | Framing the book as student-facing | /coding · /coding/methodology · /coding/program |
| **Working with Claude and Google Gemini** | Ambient lab environment — students build with the same tools used by professional AI engineers. | "Anthropic's Claude" · "Google's Gemini" · "the lab, not the curriculum" | Casual lowercase · "AI chatbots" · "ChatGPT" used as generic | /coding · /coding/methodology · /coding/program |

### BRAND_CONTENT_GUIDE.md §09 — no edit needed

DODO Coding does not introduce a named methodology (no Loop / Arc / Protocol). The existing §09 "The Loop" row stays as-is — it continues to govern ELA surfaces only, and DODO Coding has nothing competing.

### BRAND_CONTENT_GUIDE.md §10 — anti-dictionary extension

Add (lifted from DODO Coding marketing guide §2.2):

| Never say | Why it hurts | Say this instead |
|---|---|---|
| "STEM" | Buzzword; collapses computer science into a marketing category | "Computer science" · "AI engineering" |
| "Coding for kids" · "kids learn Python" | Wrong register; signals after-school camp | "A language art for the AI age" · "Computer science with a Navigator" |
| "21st century skills" · "future-ready" | Platitudes; signal absence of substance | Name the framework: "AI4K12 Big Ideas mastery" · "CMU CS Academy progression" |
| "We make learning fun" | Rigor is what parents pay for; "fun" undercuts the register | Omit |
| "Future-proof your child" | Fear marketing | "Your child learns to think critically about AI" |
| Animated coding mascots · cartoon robots · 🤖 emoji | Off-brand iconography | None — the brand uses no anthropomorphic AI |
| "AI tools" generically | Vague | Name the tool: "Claude," "Gemini," "foundation models" |

### dodo-glossary.json — `owned_terms` extension

Add:

```json
"AI4K12 Five Big Ideas": "AI4K12 五大核心理念",
"AI4K12 Big Ideas": "AI4K12 核心理念",
"AI4K12": "AI4K12（保留英文 — AAAI + CSTA 联合制定的 K–12 AI 素养国际框架）",
"CMU CS Academy": "CMU CS Academy（卡内基梅隆大学计算机科学学院）",
"Carnegie Mellon University": "卡内基梅隆大学",
"Carnegie Mellon": "卡内基梅隆大学",
"CS1": "CS1（保留英文 — CMU CS Academy 第一阶段）",
"CS2": "CS2（保留英文 — CMU CS Academy 第二阶段）",
"3CS": "3CS（保留英文 — CMU 学分课程）",
"Chip Huyen": "Chip Huyen（保留英文姓名）",
"AI Engineering": "AI 工程",
"foundation models": "基础模型",
"Anthropic": "Anthropic（保留英文）",
"Claude": "Claude（保留英文）",
"Google Gemini": "Google Gemini（保留英文）",
"Gemini": "Gemini（保留英文）",
"mBot Neo": "mBot Neo（保留英文）",
"Makeblock": "Makeblock（保留英文）",
"Toulmin": "Toulmin（保留英文 — 图尔敏论证模型）",
"DODO Coding": "DODO 编程",
"language art for the AI age": "AI 时代的一门语言艺术",
"critical thinking (DODO Coding sense)": "批判性思考（DODO 编程语境 — 含 AI 输出的质疑、验证、判断何时不可信任）"
```

Notes:
- **No "The Loop" / "The Arc" / "The Protocol" entry.** No methodology name.
- **No "Discern" / "Decide" entry.** No fourth verb.
- The "Read → Think → Write" triplet is not a glossary entry on its own — it is body copy, not a branded sequence.

### BRAND_CONTENT_GUIDE.md §12 — new page row

| Page | Conversion goal | Must include | Hero cap | Tone weight |
|---|---|---|---|---|
| `/coding` (home) | Move to `/coding/consult` or `/coding/program` | "A language art" positioning eyebrow · two parallel `We teach…` sentences in the H1 · the three machine verbs (Read · Think · Write) named in body · critical-thinking emphasis as a named human discipline · one named framework on first scroll (AI4K12 or CMU CS Academy) · cross-sell to ELA with verbal parallel | H1 ≤ ~20 words spread across two sentences · sub ≤ 30 | Confident 40% · Precise 30% · Direct 30% (avoid the editorial-scholar weight ELA uses) |

Tone-weight differs from `/` — DODO Coding leads more direct and less editorial, intentionally distinct from the ELA voice register.

---

## EN copy — `/coding` homepage

```javascript
// content/coding.en.js — `home` export (full launch version)
export const home = {
  meta: {
    title: 'DODO Coding — A language art for the AI age.',
    description: 'We teach how AI reads, thinks, and writes. We teach your child to think critically about it. Grounded in Carnegie Mellon\'s CS Academy and the AI4K12 Five Big Ideas framework. 1-on-1 with a Navigator. 16 weeks.',
  },

  hero: {
    eyebrow: 'A language art.',
    h1: [
      'We teach how AI reads, thinks, and writes.',
      'We teach your child to think critically about it.',
    ],
    subhead: 'Grounded in Carnegie Mellon\'s CS Academy and the AI4K12 Five Big Ideas framework. 1-on-1 with a Navigator. 16 weeks. Every claim has a framework behind it.',
    primaryCta:   { label: 'Book Your Consultation', href: '/coding/consult' },
    secondaryCta: { label: 'Talk to a Navigator',    href: '/coding/consult',
                    note: 'A live demo with a Navigator is part of the consultation.' },
  },

  trustStrip: {
    items: [
      'AI4K12 Mastery Rubric',
      'Carnegie Mellon CS Academy',
      'Live Navigator-led sessions',
      'Built with Claude and Google\'s working tools',
    ],
  },

  whoWeAre: {
    eyebrow: 'Who we are',
    h2: 'The difference between a coding class and a Navigator is a map.',
    paragraphs: [
      'Your child can find a coding class anywhere. That is not the same as knowing where they are. Most children using AI today carry a literacy gap their school never measures — the distance between what they can prompt and what they can actually build, debug, and defend.',
      'Navigators are not coding instructors. They are specialists in computer science and AI engineering, trained in Carnegie Mellon\'s CS Academy curriculum and the AI4K12 Five Big Ideas framework. They close the gap between where your child uses AI now and where their working life will demand they understand it.',
      'Every Navigator tracks one thing per student: the distance between their current AI4K12 mastery and their goal — and closes it, week by week.',
    ],
    cta: { label: 'Read the curriculum', href: '/coding/methodology' },
  },

  whatWeTeach: {
    eyebrow: 'What we teach',
    h2: 'We teach how AI reads, thinks, and writes.',
    lead: 'Three things AI does. Your child learns each by building it — not by prompting it. Grounded in the AI4K12 framework and the open CMU CS Academy curriculum.',
    machineVerbs: [
      { verb: 'Read',
        role: 'How AI perceives. Pixels, text, audio, and sensor data become signals it can act on. Your child trains classifiers, explores datasets, and learns where perception fails. Grounded in AI4K12 Big Idea 1.' },
      { verb: 'Think',
        role: 'How AI processes. Search, logic, planning, learning. Your child implements these algorithms themselves in Python — not just by calling libraries. Grounded in AI4K12 Big Ideas 2 and 3, and the CMU CS Academy curriculum.' },
      { verb: 'Write',
        role: 'How AI generates. From rule-based output to foundation-model language. Your child builds with Claude and Gemini, learns to prompt as a form of writing, and verifies every output. Grounded in AI4K12 Big Idea 4 and Chip Huyen\'s AI Engineering.' },
    ],
  },

  criticalThinking: {
    eyebrow: 'And the human discipline that anchors it all',
    h2: 'Critical thinking.',
    body: 'Throughout every session, your child learns to question what AI says, verify it, and decide when not to trust it. This is the discipline that gives machine fluency its value. Grounded in AI4K12 Big Idea 5 (Societal Impact) and the Toulmin argument model.',
  },

  pillars: {
    eyebrow: 'The grounding',
    h2: 'Four open frameworks. Verifiable. Yours to read.',
    items: [
      { name: 'AI4K12 Five Big Ideas',  role: 'International K–12 AI literacy standard from AAAI + CSTA',  citationUrl: 'https://ai4k12.org' },
      { name: 'CMU CS Academy',          role: 'Carnegie Mellon\'s free open computer-science curriculum',  citationUrl: 'https://academy.cs.cmu.edu' },
      { name: 'AI Engineering (Huyen)',  role: 'The foundation-model-era textbook (O\'Reilly 2025), adapted for age',  citationUrl: 'https://oreilly.com' },
      { name: 'Claude · Gemini',         role: 'The lab where work happens — the same tools used by professional AI engineers' },
    ],
  },

  howItWorks: {
    eyebrow: 'How it works',
    h2: 'Measurable AI literacy in sixteen weeks. Every claim names the framework that backs it.',
    phases: [
      { label: 'Before We Begin',
        lead: 'We find out exactly where your child is.',
        body: 'Before the first session, every student receives an AI4K12 baseline assessment across all five Big Ideas and a CMU CS Academy placement. We plan from data, not from guesswork.' },
      { label: 'During The Program',
        lead: 'Three machine verbs. One human discipline. Every session.',
        body: 'Your child learns how AI reads, thinks, and writes — by building each ability from the parts. Throughout, the Navigator coaches the critical thinking that decides when not to trust the output. Nothing is guessed. Everything is guided and measured.' },
      { label: 'After 16 Weeks',
        lead: 'We show you the numbers.',
        body: 'Every student receives an exit AI4K12 mastery rubric and a CMU CS Academy progress report. A child who can build what reads, what thinks, and what writes — and who has learned to think critically about it — that child is not replaced by AI. They direct it.' },
    ],
  },

  crossSell: {
    eyebrow: 'Two language arts',
    h2: 'Two language arts. One mind.',
    body: 'DODO Learning ELA teaches your child to read, think, speak, and write in human language. DODO Coding teaches your child how AI reads, thinks, and writes — and how to think critically about it. Most of our families will enroll in both.',
    cta: { label: 'Explore DODO Learning ELA', href: '/program' },
  },
}
```

---

## EN lint pass

| Check | Verdict |
|---|---|
| §10 anti-dictionary (BCG + DODO Coding §2.2) | **PASS.** No "STEM," "coding for kids," "fun," "future-ready," "21st century skills," "ESL," "tutor," "catch up," forbidden ZH words. |
| §02 Truth 3 (at least one specific number OR named framework per conversion-page section) | **PASS** in each section: hero names AI4K12 + CMU CS Academy; trust strip names both + Claude + Gemini; whoWeAre names CMU CS Academy + AI4K12; whatWeTeach names AI4K12 Big Ideas 1–4 + CMU + Huyen; criticalThinking names Big Idea 5 + Toulmin; pillars names all four; howItWorks names the assessments. |
| §08 affirmative-default | **PASS.** Every section leads with "We teach…" / "Your child…" / "Navigators…" — affirmative, forward. |
| §08 "We don't / We do" usage | **PASS.** One use in `howItWorks.Before We Begin`: *"We plan from data, not from guesswork."* Fits the strategic-and-sparse criterion (resolves the real misconception that ed-tech "guesses"). |
| §08 future-focused | **PASS.** Closing of howItWorks: *"that child is not replaced by AI. They direct it."* |
| §09 owned-vocab consistency | **PASS.** "Navigator" capitalized throughout; AI4K12, CMU CS Academy, Huyen named per glossary additions. **No "The Loop" / "The Arc" / "The Protocol"** on `/coding/*` — confirmed. |
| Hero H1 word count | H1 is two short sentences (8 words + 9 words = 17 words total). Under the proposed §12 cap of ~20 words spread across two sentences. **PASS.** |
| Hero subhead word count | 28 words. Within the proposed §12 cap (≤30). **PASS.** |
| Em-dash usage | Reduced. The user's voice direction emphasized moving away from em-dash-heavy register. Remaining em-dashes appear in body copy only where the sentence structure genuinely needs the pause (e.g., whoWeAre paragraph 1: "the distance between what they can prompt and what they can actually build, debug, and defend"). None in H1, H2, or eyebrows. |
| Anti-tutoring line | **PASS.** "Navigators are not coding instructors. They are specialists…" — preserved. |
| Stats block | **OMITTED at launch** per `01-PROPOSAL.md` open-decision #3. Restore after first cohort completes. |
| Demo CTA at launch | Routes to `/coding/consult` with the "A live demo with a Navigator is part of the consultation." note. Flips to `/coding/demos` when a real demo recording exists. |
| Cross-sell line "Most of our families will enroll in both" | **PASS.** Softened from "Most of our families enroll in both" — the future-tense version is honest at launch (DODO Coding has zero enrolled families day-one). Restore present tense after first cohort. |

---

## ZH mirror — review draft

> Per BCG §15, canonical ZH copy goes through DeepSeek (paste the locked EN + DEEPSEEK_BRIEF.md + the extended dodo-glossary.json). The ZH below is a brand-voice review draft. The DeepSeek pass replaces this entirely.

```javascript
// content/coding.zh.js — `home` export (REVIEW DRAFT)
export const home = {
  meta: {
    title: 'DODO 编程 — AI 时代的一门语言艺术。',
    description: '我们教孩子 AI 如何阅读、思考、书写。我们教孩子批判性地思考 AI。植根于卡内基梅隆 CS Academy 与 AI4K12 五大核心理念框架。一对一导师授课。16 周。',
  },

  hero: {
    eyebrow: '一门语言艺术。',
    h1: [
      '我们教孩子 AI 如何阅读、思考、书写。',
      '我们教孩子批判性地思考 AI。',
    ],
    subhead: '植根于卡内基梅隆 CS Academy 与 AI4K12 五大核心理念框架。一对一导师授课。16 周。每一项主张，都有它依据的框架。',
    primaryCta:   { label: '预约咨询', href: '/coding/consult' },
    secondaryCta: { label: '与导师对话', href: '/coding/consult',
                    note: '咨询中包含与导师的现场演示课。' },
  },

  trustStrip: {
    items: [
      'AI4K12 掌握度评估',
      '卡内基梅隆 CS Academy',
      '导师（Navigator）现场授课',
      '与 Claude 和 Google 的实际工具协作',
    ],
  },

  whoWeAre: {
    eyebrow: '关于我们',
    h2: '编程课与导师（Navigator）的区别，在于一张地图。',
    paragraphs: [
      '孩子在哪里都能找到编程课。但那不等于知道孩子现在在哪里。今天使用 AI 的孩子大多带着一道学校从未测量的素养鸿沟——他们能 prompt 出来的，与他们能真正构建、调试、辩护的之间的距离。',
      '导师（Navigator）不是编程老师。他们是计算机科学与 AI 工程的专业人员，受训于卡内基梅隆 CS Academy 课程，以及锚定当今每一个 K–12 AI 项目的 AI4K12 五大核心理念框架。他们闭合的，是孩子现在使用 AI 的方式与未来工作生活要求他们理解 AI 的程度之间的距离。',
      '每一位导师对每一位学生只追踪一件事：他们当前 AI4K12 掌握度与目标之间的距离——并一周一周闭合它。',
    ],
    cta: { label: '查看课程内容', href: '/coding/methodology' },
  },

  whatWeTeach: {
    eyebrow: '我们教什么',
    h2: '我们教孩子 AI 如何阅读、思考、书写。',
    lead: 'AI 做的三件事。你的孩子通过亲手构建去学会每一件——而不是通过 prompt 去使唤它。植根于 AI4K12 框架与开源的 CMU CS Academy 课程。',
    machineVerbs: [
      { verb: '阅读',
        role: 'AI 如何感知。像素、文字、音频、传感数据如何成为它可以行动的信号。你的孩子训练分类器、探索数据集、了解感知何时失败。植根于 AI4K12 核心理念一。' },
      { verb: '思考',
        role: 'AI 如何处理。搜索、逻辑、规划、学习。你的孩子用 Python 自己实现这些算法——而不是只调用现成的库。植根于 AI4K12 核心理念二和三，以及 CMU CS Academy 课程。' },
      { verb: '书写',
        role: 'AI 如何生成。从规则化输出到基础模型语言。你的孩子用 Claude 和 Gemini 构建，把 prompt 当作一种写作来设计，并验证每一个输出。植根于 AI4K12 核心理念四与 Chip Huyen 的《AI Engineering》。' },
    ],
  },

  criticalThinking: {
    eyebrow: '以及贯穿这一切的人之纪律',
    h2: '批判性思考。',
    body: '每一节课，你的孩子都在学习质疑 AI 所说的、验证它、并判断何时不应信任它。这是让机器素养真正有价值的那门纪律。植根于 AI4K12 核心理念五（社会影响）与图尔敏论证模型（Toulmin）。',
  },

  pillars: {
    eyebrow: '我们的根基',
    h2: '四个开放框架。可验证。你可以亲自去读。',
    items: [
      { name: 'AI4K12 五大核心理念', role: 'AAAI 与 CSTA 联合制定的 K–12 AI 素养国际标准', citationUrl: 'https://ai4k12.org' },
      { name: 'CMU CS Academy',     role: '卡内基梅隆大学的免费开源计算机科学课程',             citationUrl: 'https://academy.cs.cmu.edu' },
      { name: '《AI Engineering》(Huyen)', role: '基础模型时代的标准教材（O\'Reilly 2025），按学龄改编', citationUrl: 'https://oreilly.com' },
      { name: 'Claude · Gemini',    role: '专业 AI 工程师使用的工作环境——你的孩子也在这里建造' },
    ],
  },

  howItWorks: {
    eyebrow: '课程如何运作',
    h2: '十六周内，可衡量的 AI 素养。每一项主张，都标注它依据的框架。',
    phases: [
      { label: '开始之前',
        lead: '我们先弄清楚孩子在哪里。',
        body: '在第一节课之前，每位学生都会接受 AI4K12 五大核心理念的入学基线评估，以及 CMU CS Academy 的水平定位。我们从数据出发，不从假设出发。' },
      { label: '课程进行中',
        lead: '三件机器做的事。一门人类的纪律。每一节课都是。',
        body: '你的孩子通过亲手构建每一项能力，学会 AI 如何阅读、思考、书写。其间，导师教练那种判断「何时不应信任 AI 输出」的批判性思考。没有任何环节靠猜。每一步都被引导、被衡量。' },
      { label: '十六周之后',
        lead: '我们让你看见数字。',
        body: '每位学生都会收到一份退出评估的 AI4K12 掌握度量表，以及一份 CMU CS Academy 进度报告。一个能构建出阅读、思考、书写的部分——并且学会了批判性地思考它的孩子——这样的孩子不会被 AI 取代。他们指挥 AI。' },
    ],
  },

  crossSell: {
    eyebrow: '两门语言艺术',
    h2: '两门语言艺术。一颗心智。',
    body: 'DODO Learning ELA 教孩子用人类语言去阅读、思考、表达、写作。DODO 编程教孩子 AI 如何阅读、思考、书写——以及如何批判性地思考它。我们预期大多数家庭会同时报读两门课程。',
    cta: { label: '查看 DODO Learning ELA', href: '/program' },
  },
}
```

### ZH lint pass

| Check | Verdict |
|---|---|
| §10 forbidden ZH words (补习班 · 干预 · 综上所述 etc.) | **PASS.** None present. |
| ZH combat-metaphor lint (捍卫 · 战胜 · 搏斗 · 较量 · 攻克) | **PASS.** |
| ZH reassurance-tail lint (而不是猜测 · 我们承诺 · 我们保证) | **PASS** with one intentional carry: "我们从数据出发，不从假设出发" — translates the integral EN line *"We plan from data, not from guesswork."* The §08 ZH rule allows this when the line carries weight, not filler. Here it does. Keep. |
| Owned terms render bilingually | **PASS.** "导师（Navigator）" rendered; Claude / Gemini / CMU CS Academy / AI4K12 / Huyen per glossary. No "The Loop" / "The Arc" / "The Protocol" — confirmed. |
| ZH four-character idiomatic frames | **PARTIAL.** "可衡量" and "可验证" function as compact qualifiers but the four-character pattern is lighter than the prior draft. Acceptable — the voice direction moved away from the Confucian scholar register; lighter ZH is consistent. |
| ZH two-sentence punch-line opener (§08 ZH pattern) | **PASS** in whoWeAre paragraph 1: "孩子在哪里都能找到编程课。但那不等于知道孩子现在在哪里。" |
| Tagline ZH | Hero eyebrow "一门语言艺术。" matches the EN "A language art." — short, declarative, no metaphor. ZH literal is faithful and reads premium. The §00 brand-identity rule that EN and ZH taglines need not literally translate still applies; in this case, literal works. |

---

## Apply order (for this copy pass)

1. Confirm direction (already locked 2026-06-09)
2. Apply BRAND_CONTENT_GUIDE.md §07 / §10 / §12 additive edits (no §09 edit needed)
3. Apply dodo-glossary.json extension (no Loop/Discern entries)
4. Run DeepSeek round-trip on the locked EN block to produce canonical ZH
5. Land `content/coding.en.js` and `content/coding.zh.js` (homepage `home` export only)
6. `npx next build` clean
7. Render `/en/coding` and `/zh/coding` in dev; squint-test against `/en` and `/zh` homepages

---

## DODO Coding band on the ELA home page (`/`) — copy

This is content that lives on the ELA home but renders DODO Coding. Lives in `content/coding.{en,zh}.js` as the `homeBand` export (not in `marketing.{en,zh}.js`) so DODO Coding owns it. The ELA home page imports `homeBand` from `content/coding.{en,zh}.js` and renders the band inline.

### EN

```javascript
export const homeBand = {
  eyebrow: 'Also from DODO Learning',
  h2:      'DODO Coding',
  sub:     'A language art for the AI age.',
  body:    'We teach how AI reads, thinks, and writes. We teach your child to think critically about it.',
  cta:     { label: 'Visit DODO Coding', href: '/coding' },
  preview: { machineVerbs: ['Read', 'Think', 'Write'], humanDiscipline: 'Critical thinking' },
}
```

### ZH review draft

```javascript
export const homeBand = {
  eyebrow: '同样来自 DODO Learning',
  h2:      'DODO 编程',
  sub:     'AI 时代的一门语言艺术。',
  body:    '我们教孩子 AI 如何阅读、思考、书写。我们教孩子批判性地思考 AI。',
  cta:     { label: '了解 DODO 编程', href: '/coding' },
  preview: { machineVerbs: ['阅读', '思考', '书写'], humanDiscipline: '批判性思考' },
}
```

### Lint

| Check | Verdict |
|---|---|
| §10 anti-dictionary | **PASS.** No forbidden EN or ZH terms. |
| Owned-vocab consistency | **PASS.** "DODO Coding" / "DODO 编程" rendered per glossary. |
| Tone register for a band on the ELA home (where the surrounding voice is ELA's editorial-classical) | **PASS.** The band's "A language art" eyebrow does the positioning; the body uses the same direct two-sentence structure as the `/coding` hero — keeps the DODO Coding voice intact even when surrounded by ELA's editorial register. |
| One-way pointer | **PASS.** Band routes one-way to `/coding`; no reciprocal link from ELA pages other than the footer column and this band. |
| Length | EN total ~25 words including CTA — band fits in a single screen above the fold on desktop, below the fold but easily visible on mobile scroll. |

---

*End of 04-COPY-PASS.md. About, methodology, program, faq, consult copy passes follow as separate staged docs.*
