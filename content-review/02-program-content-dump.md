# `/program` — full content dump for granular review

**Source file:** `content/marketing.en.js` + `content/marketing.zh.js` (`program` export)
**Rendered by:** `app/[locale]/program/page.jsx`
**As of:** 2026-05-21
**Purpose:** Every user-visible string on /program, EN ↔ ZH paired, with section + element labels. No commentary or recommendations in the body — flags collected at top.

---

## Pre-existing issues I want on your radar (flagged, not edits)

These were already in the source before this review. Catalog them as you mark up; we can apply fixes after.

| # | Issue | Location | Why it matters |
|---|---|---|---|
| **F1** | **Stale Lexile claim** — "187-point gain · 1.2 grade levels · over 16 weeks" | §7 Growth · `growth.lexile.sub` (EN + ZH) | Contradicts the new canonical "one grade level over two 16-week cycles" set 2026-05-21. Brand guide §11 |
| **F2** | **TRAITS array in `page.jsx:47-53`** still uses old ZH canon (想法/词汇选择/句子流畅/写作规范) | `app/[locale]/program/page.jsx:47-53` | Doesn't match the new canon (思考/用词/流畅/规范) cascaded across other files |
| **F3** | **"1 Cohort · Small & intentional"** | §1 Hero · `hero.stats[4]` (EN + ZH) | Conflicts with the 1-on-1 Navigator model elsewhere. Cohort vs 1-on-1 inconsistency |
| **F4** | **Architecture H2 "Loop → LCS → Levels"** | §4 Architecture · `architecture.h2` | The new canon puts LCS as the named architecture, with Loop as the per-session phrase. Sequence framing reads backward |
| **F5** | **"The Loop" used as named methodology in headings** | §2 LoopSection · `loop.eyebrow` "How The Loop Works"; §4 architecture body; §5 combinations | New canon: LCS = named system. "The Loop" should be the per-session phrase only |
| **F6** | **"Read the full methodology" CTA points to /methodology** but the user landed here from a methodology CTA on home that says "Understand The LCS" | §2 · `loop.methodologyLink` | Naming asymmetry — link label could be "Read the full LCS methodology" |
| **F7** | **Session sample uses "Lexile 740"** in the dialogue but the growth viz uses "620 → 820" range | §6 Session · `session.q1` · §7 Growth · `growth.lexile.note` | Internally consistent (740 = mid-flight student) but worth double-checking the numbers tell a coherent story |

---

## §0 · SEO META

### Element 0.1 — `<title>`
- **EN:** `What Happens in The 16-Week Program — DODO Learning`
- **ZH:** `16周课程的内部安排 — DODO Learning`

### Element 0.2 — `<meta name="description">`
- **EN:** `The live, Navigator-led program that trains Read → Think → Speak → Write for Chinese families in Canada and the US. Entry and exit Lexile assessments. One grade level of growth, measured.`
- **ZH:** `面向加拿大和美国的华人家庭，由导师（Navigator）带领的直播课程，训练阅读 → 思考 → 表达 → 写作。入学与结业均进行Lexile评估。一整个年级水平的可测量成长。`

---

## §1 · HERO SECTION (dark void bg, full viewport, steamboat illustration overlay)

### Element 1.1 — Tagline chip (pill above H1)
- **EN:** `Think Once. In Both Languages.`
- **ZH:** `一次思考。两种语言。`

### Element 1.2 — H1
- **EN:** `What happens inside The 16-Week Program?`
- **ZH:** `16周课程内部是怎样的？`
- *(`hero.h1zh` field exists as a secondary lavender subheading; currently empty in both locales)*

### Element 1.3 — Sub paragraph (under H1)
- **EN:** `Designed for Chinese families in Canada and the US. Every session runs The Loop — Read → Think → Speak → Write — guided by a dedicated Navigator. We build English Thinkers at mastery level.`
- **ZH:** `专为加拿大和美国的华人家庭设计。每节课都运行The Loop（学习循环）——阅读 → 思考 → 表达 → 写作——由一位专属导师（Navigator）引导。我们培养达到精通水平的英语思维者。`

### Element 1.4 — Primary CTA (gold, anchors to #loop-section)
- **EN:** `See How It Works`
- **ZH:** `了解运作方式`

### Element 1.5 — Secondary CTA (ghost, links to `/[locale]/consult`)
- **EN:** `Book Your Consultation`
- **ZH:** `预约咨询`

### Element 1.6 — Stat rail (6 stat pills, dark band below hero)

| # | EN value · unit · desc | ZH value · unit · desc |
|---|---|---|
| 1 | `16` · `Weeks` · `A real commitment` | `16` · `周` · `一份真正的承诺` |
| 2 | `4` · `Skills` · `Read · Think · Speak · Write` | `4` · `项技能` · `阅读 · 思考 · 表达 · 写作` |
| 3 | `2` · `Assessments` · `Before + After` | `2` · `次评估` · `入学前 + 结业后` |
| 4 | `1` · `Navigator` · `Who knows your child` | `1` · `位导师（Navigator）` · `了解您的孩子` |
| 5 | `1` · `Cohort` · `Small & intentional` ⚠️ F3 | `1` · `个学习小组` · `小而精` ⚠️ F3 |
| 6 | `∞` · `The Full Loop` · `Every single session` | `∞` · `完整学习循环` · `每一节课` |

---

## §2 · LOOP SECTION (white bg, 4-card grid)

### Element 2.1 — Eyebrow
- **EN:** `How The Loop Works` ⚠️ F5
- **ZH:** `The Loop（学习循环）的运作方式` ⚠️ F5

### Element 2.2 — H2 (primary + secondary line)
- **EN H2:** `Four skills. Every session.`
- **EN secondary:** *(null — no ZH gloss on EN view)*
- **ZH H2:** `四项技能。每节课都涉及。`
- **ZH secondary:** *(null)*

### Element 2.3 — Phase tag (top-right of section)
- Static, both locales: `Read → Think → Speak → Write`

### Element 2.4 — Step 01 Read
| Field | EN | ZH |
|---|---|---|
| label | `Read` | `阅读` |
| labelZh (secondary) | `阅读` | `Read` |
| desc | `Texts chosen above their comfort zone — just enough to stretch. Comprehension is tracked by Lexile level, not guesswork.` | `所选文本略高于他们的舒适区——刚好足以产生拉伸。理解力通过Lexile水平跟踪，而非猜测。` |

### Element 2.5 — Step 02 Think
| Field | EN | ZH |
|---|---|---|
| label | `Think` | `思考` |
| labelZh | `思考` | `Think` |
| desc | `Before they speak or write, they build the argument. What's the claim? What's the evidence? What's the counter? Structure first.` | `在表达或写作之前，先构建论点。主张是什么？证据是什么？反方观点是什么？结构先行。` |

### Element 2.6 — Step 03 Speak
| Field | EN | ZH |
|---|---|---|
| label | `Speak` | `表达` |
| labelZh | `表达` | `Speak` |
| desc | `They take a position and defend it — live, with their Navigator. This is where confidence is built, not performed.` | `他们提出立场并为之辩护——实时进行，与导师一起。这是建立真正自信的地方，而非表演出来的自信。` |

### Element 2.7 — Step 04 Write
| Field | EN | ZH |
|---|---|---|
| label | `Write` | `写作` |
| labelZh | `写作` | `Write` |
| desc | `Everything they've read, thought, and said now lands on the page. Draft to revision — measurable improvement, every time.` | `他们所阅读、思考、表达的一切，最终落到纸面上。从草稿到修改——每次都有可衡量的进步。` |

### Element 2.8 — Type A/B caption (below cards)
- **EN:** `Sessions alternate between two types. Type A — Literacy Session: the student reads aloud while the Navigator coaches at sentence level (vocabulary, intonation, comprehension), anchored on the MCT Building Language and Caesar's English vocabulary tracks. Type B — Writing Session: the student thinks, discusses, and drafts; the Navigator opens with a Harvard Project Zero Visible Thinking routine and scores output against the 6+1 Trait rubric. Type assignment is driven by the student's current Lexile data, not a fixed rotation.`
- **ZH:** `每节课交替两种类型。A型课 — Literacy Session（文学课）：学生大声朗读，导师在句子层面进行指导（词汇、语调、理解力），以MCT的Building Language和Caesar's English词汇体系为锚点。B型课 — Writing Session（写作课）：学生思考、讨论并起草；导师以哈佛教育学院零点项目的Visible Thinking（可视化思维方法）开场，并按照6+1特质评分体系评估输出内容。课程类型的分配由学生当前的Lexile数据驱动，而非固定轮换。`

### Element 2.9 — Methodology link
- **EN:** `Read the full methodology →` ⚠️ F6
- **ZH:** `阅读完整方法论 →` ⚠️ F6

---

## §3 · JOURNEY SECTION (whisper bg, 3 + 1 grid: steps + LexileBar)

### Element 3.1 — Eyebrow
- **EN:** `The Journey`
- **ZH:** `学习旅程`

### Element 3.2 — H2
- **EN:** `Where your child starts — and where they'll be.`
- **ZH:** `您的孩子从哪里开始——又将到达哪里。`

### Element 3.3 — Step 1 (Week 1)
| Field | EN | ZH |
|---|---|---|
| week | `Week 1` | `第1周` |
| label | `Entrance Assessment` | `入学评估` |
| labelZh | `入学评估` | `入学评估` |
| desc | `We start by finding out exactly where your child is — their Lexile reading level, their 6+1 Trait writing baseline, and the specific areas where they need support. No assumptions.` | `我们从精确了解您孩子的当前位置开始——他们的Lexile阅读水平、6+1特质写作基线，以及他们需要支持的具体方面。不做任何假设。` |

### Element 3.4 — Step 2 (Weeks 2-15)
| Field | EN | ZH |
|---|---|---|
| week | `Weeks 2–15` | `第2–15周` |
| label | `Weekly Sessions` | `每周课程` |
| labelZh | `每周课程` | `每周课程` |
| desc | `Each week, your child works through The Loop with their Navigator — someone who knows their progress, their challenges, and what to push next. Sessions run 90 minutes, once per week.` | `每周，您的孩子与他们的导师（Navigator）一起完成The Loop（学习循环）——这位导师了解他们的进步、挑战以及下一步该推动什么。每节课90分钟，每周一次。` |

### Element 3.5 — Step 3 (Week 16)
| Field | EN | ZH |
|---|---|---|
| week | `Week 16` | `第16周` |
| label | `Exit Assessment + Progress Report` | `结业评估与进度报告` |
| labelZh | `结业评估` | `结业评估` |
| desc | `At the end, you see the growth as real numbers: Lexile level before and after, 6+1 Trait scores for all seven traits, side by side with where they started. You receive a written progress report. Then you decide what comes next.` | `在课程结束时，您将看到以真实数字呈现的成长：前后Lexile水平，七个特质的6+1特质评分，与起始状态并排对比。您将收到一份书面的进度报告。然后由您决定下一步。` |

### Element 3.6 — LexileBar cell (4th cell of journey grid)
- Eyebrow: EN `Lexile Growth` · ZH `Lexile 成长`
- Caption: EN `Typical 16-week result: 620L → 820L` · ZH `典型16周成果：620L → 820L`
- *(LexileBar visual: 620 → 820 over 16 weeks, hardcoded in page.jsx:470)*

---

## §4 · ARCHITECTURE SECTION (dark bg, LCS strand breakdown)

### Element 4.1 — Eyebrow
- **EN:** `The Architecture`
- **ZH:** `体系架构`

### Element 4.2 — H2 ⚠️ F4
- **EN:** `How the work compounds: Loop → LCS → Levels.`
- **ZH:** `成果如何累积：学习循环 → LCS → 级别。`

### Element 4.3 — Body
- **EN:** `Each session runs The Loop — Read → Think → Speak → Write — guided by your child's Navigator. Across each 16-week cycle, sessions roll up into the LCS Teaching System. Across multiple cycles, students progress through nine curriculum levels — Starter, Intermediate, and Levels 1–7. Each level requires two to three cycles. Each cycle is 16 weeks.`
- **ZH:** `每节课运行The Loop（学习循环）——阅读 → 思考 → 表达 → 写作——由您孩子的导师（Navigator）引导。在每个16周周期内，每节课汇总到LCS教学体系中。跨越多个周期，学生逐步进阶九个课程级别——Starter、Intermediate以及Levels 1–7。每个级别需要两到三个周期。每个周期为16周。`

### Element 4.4 — Strand L (Literacy)
| Field | EN | ZH |
|---|---|---|
| name | `Literacy` | `Literacy` (kept English) |
| nameZh | `文学精读` | `文学精读` |
| body | `Deep engagement with literary classics. Vocabulary accumulation, literary sensibility, the student's own intellectual treasury. The root of all language output.` | `深度研读文学经典。词汇积累、文学感知力、学生自己的思想宝库。所有语言输出的根基。` |

### Element 4.5 — Strand C (Composition)
| Field | EN | ZH |
|---|---|---|
| name | `Composition` | `Composition` (kept English) |
| nameZh | `系统写作训练` | `系统写作训练` |
| body | `Systematic writing training: transforming reading depth and thinking into structured, persuasive, precise writing. From sentences to academic essays.` | `系统的写作训练：将阅读深度和思考转化为结构化、有说服力、精准的写作。从句子到学术论文。` |

### Element 4.6 — Strand S (Speaking)
| Field | EN | ZH |
|---|---|---|
| name | `Speaking` | `Speaking` (kept English) |
| nameZh | `表达` | `表达` |
| body | `High-quality 1-on-1 discussion with the Navigator. Students clarify perspective, organise thinking, produce clear and logically rigorous spoken output.` | `与导师进行高质量的一对一讨论。学生厘清观点、组织思维、产出清晰且逻辑严谨的口头表达。` |

### Element 4.7 — Levels note (small caption at bottom)
- **EN:** `Calibrated against US SAT, SSAT, IB Extended Essay, Cambridge KET & PET, and North American private-school + gifted-school standards. Level 7 = college-tier academic English capability.`
- **ZH:** `对标美国SAT、SSAT、IB拓展论文、剑桥KET与PET，以及北美私立学校和资优生项目标准。Level 7相当于大学级别的学术英语能力。`

---

## §5 · COMBINATIONS SECTION (light bg, 5-card grid)

### Element 5.1 — Eyebrow
- **EN:** `Choose Your Combination`
- **ZH:** `选择您的组合`

### Element 5.2 — H2
- **EN:** `Five programme combinations. Same Loop. Different intensity.` ⚠️ F5 partial
- **ZH:** `五种课程组合。相同的The Loop（学习循环）。不同的强度。` ⚠️ F5 partial

### Element 5.3 — Body
- **EN:** `Every combination runs the full 16-week cycle, every session runs The Loop, every student works with one dedicated Navigator. The combinations differ in weekly session count and emphasis — choose the shape that fits your child's current need.`
- **ZH:** `每一种组合都运行完整的16周周期，每节课都运行The Loop（学习循环），每个学生都与一位专属导师（Navigator）一起学习。不同组合在于每周课时数和侧重点——选择符合您孩子当前需求的模式。`

### Element 5.4 — Combination cards (5 cards)

| ID | Name (EN) | nameZh | Format (EN) | Format (ZH) | Price | forWhom (EN) | forWhom (ZH) | Featured |
|---|---|---|---|---|---|---|---|---|
| summit | Summit | 全境领航 | `3× literature + 1× writing / week` | `每周3节文学课 + 1节写作课` | `$2,830` | `Accelerated growth · high-stakes academic milestones` | `加速成长 · 高难度学业里程碑` | no |
| core | Core | 稳健航行 | `2× literature + 1× writing / week` | `每周2节文学课 + 1节写作课` | `$2,250` | `Most popular · long-term development` | `最受欢迎 · 长期发展` | **yes** |
| flex-1 | Flex 1 | 文学阅读自由航行 | `2× literature / week` | `每周2节文学课` | `$1,185` | `Building the reading foundation first` | `先打好阅读基础` | no |
| flex-2 | Flex 2 | 大师写作自由航行 | `2× writing / week` | `每周2节写作课` | `$2,110` | `Writing specialisation` | `写作专精` | no |
| flex-3 | Flex 3 | GPA管理自由航行 | `1× GPA tutoring / week` | `每周1节GPA学业辅导` | `from $750` | `School academic management · pairs with any combination above` | `学校学业管理 · 可与上述任意组合搭配` | no |

### Element 5.5 — "Most Popular" badge (rendered on Core card)
- **EN:** `Most Popular`
- **ZH:** `最受欢迎`

### Element 5.6 — Combinations note (below grid)
- **EN:** `Pricing per 16-week cycle. Weekly payment options available — see FAQ for breakdown.`
- **ZH:** `价格为每16周周期。可按周付款选项——请参阅常见问题了解详情。`

### Element 5.7 — FAQ link
- **EN:** `See pricing details in FAQ →`
- **ZH:** `查看定价详情 →`

---

## §6 · SESSION SECTION (dark bg with Unsplash image, narrative)

### Element 6.1 — Navigator chip (top of section, with avatar circle)
- Avatar text: `NV` (static)
- navigatorName: **EN** `Ms. Jennifer` · **ZH** `Ms. Jennifer`
- sessionPhase: **EN** `Read Phase · Lexile 740` · **ZH** `阅读阶段 · Lexile 740`

### Element 6.2 — Eyebrow
- **EN:** `A Real Session`
- **ZH:** `一堂真实的课`

### Element 6.3 — H2
- **EN:** `Here's what a typical Tuesday looks like.`
- **ZH:** `一个典型的周二是什么样子的。`
- *(ZH-side: h2zh field exists but only rendered when `locale === 'zh'` — currently null)*

### Element 6.4 — Narrative paragraph 1 (`p1` + italicized `q1`)
- **EN p1:** `The Navigator opens by naming the phase:`
- **EN q1 (italic, lavender):** `"Today we're in Read. Your text is at Lexile 740 — that's eight points above where you were last week. Let's see what you can do."`
- **ZH p1:** `导师首先说明本节课的阶段：`
- **ZH q1 (italic):** `"今天我们处于阅读阶段。你的文本Lexile是740——比你上周高8个点。我们来看看你能做到什么。"`

### Element 6.5 — Narrative paragraph 2 (`p2`)
- **EN:** `Twenty minutes of structured reading. Not silent — annotated, questioned, discussed together.`
- **ZH:** `二十分钟的结构化阅读。不是默读——而是一起批注、提问、讨论。`

### Element 6.6 — Narrative paragraph 3 (`p3`)
- **EN:** `Then comes Think. The Navigator asks: what's the author's argument? Do you agree? What's the strongest counter?`
- **ZH:** `接着进入思考阶段。导师问：作者的主张是什么？你同意吗？最强的反方论点是什么？`

### Element 6.7 — Narrative paragraph 4 (`p4` + italicized `q4`)
- **EN p4:** `The session closes looking forward:`
- **EN q4 (italic, lavender):** `"Next week is Speak. You'll defend your position out loud. Start getting ready."`
- **ZH p4:** `课程以展望下次结束：`
- **ZH q4 (italic):** `"下周是表达阶段。你将口头为自己的立场辩护。现在开始准备。"`

### Element 6.8 — Navigators link
- **EN:** `Meet the Navigators →`
- **ZH:** `认识导师（Navigator）团队 →`

---

## §7 · GROWTH SECTION (black bg, Lexile scale + 6+1 trait bars)

### Element 7.1 — Eyebrow
- **EN:** `How We Measure Growth`
- **ZH:** `我们如何衡量成长`

### Element 7.2 — H2
- **EN:** `Real numbers, not vague progress reports.`
- **ZH:** `真实的数字，而非模糊的进度报告。`

### Element 7.3 — Lexile sub-section H3
- **EN:** `Lexile Reading Level`
- **ZH:** `Lexile阅读水平`

### Element 7.4 — Lexile sub (caption) ⚠️ F1 stale claim
- **EN:** `The same measurement system used by schools across North America — so you can compare progress directly. Our students average a 187-point gain — 1.2 grade levels — over 16 weeks.`
- **ZH:** `与北美学校使用的测量体系相同——因此您可以直接对比进步。我们的学生在16周内平均增长187个Lexile点——相当于1.2个年级水平。`

### Element 7.5 — Lexile note (right of scale viz, HTML allowed)
- **EN:** `We don't say your child "reads well." We show you they moved from <strong>Lexile 620 to 820</strong> in 16 weeks — that's the difference between Grade 4 and Grade 6 reading territory.`
- **ZH:** `我们不会说您的孩子"读得不错"。我们向您展示他们在16周内从<strong>Lexile 620 到 820</strong>——这就是四年级和六年级阅读水平之间的差距。`

### Element 7.6 — 6+1 Trait sub-section H3
- **EN:** `6+1 Trait Writing`
- **ZH:** `6+1特质写作`

### Element 7.7 — Trait sub (caption)
- **EN:** `The same rubric your child's school uses — so when you see improvement here, it shows up in the classroom too.`
- **ZH:** `与您孩子学校使用的评分标准相同——因此当您在这里看到进步时，也会在课堂上体现出来。`

### Element 7.8 — Trait legend labels
- Start label: EN `Start` · ZH `入学时`
- End label: EN `After 16 weeks` · ZH `16周后`
- Scale label: EN `Scale 1–6` · ZH `1–6分制`

### Element 7.9 — Trait rows (rendered from `TRAITS` array in page.jsx)

⚠️ F2 — The TRAITS array in `page.jsx:47-53` is **separate** from copy and uses the OLD ZH canon. Currently renders:

| ID | EN label | ZH label (stale) | start → end |
|---|---|---|---|
| ideas | `Ideas` | `想法` *(should be `思考`)* | 2 → 4 |
| organisation | `Organization` | `结构` | 2 → 4 |
| voice | `Voice` | `声音` | 2 → 4 |
| word-choice | `Word Choice` | `词汇选择` *(should be `用词`)* | 2 → 5 |
| fluency | `Sentence Fluency` | `句子流畅` *(should be `流畅`)* | 3 → 5 |
| conventions | `Conventions` | `写作规范` *(should be `规范`)* | 3 → 4 |
| presentation | `Presentation` | `呈现` | 2 → 4 |

### Element 7.10 — Trait note (below bars)
- **EN:** `When you ask "has the writing improved?" — we don't say yes. We show you each trait score, before and after, so you can see exactly where the growth happened.`
- **ZH:** `当您问"写作进步了吗？"——我们不说"是的"。我们向您展示每个特质的分数，前后对比，让您精确看到成长发生在哪里。`

---

## §8 · GET STARTED SECTION (light lavender bg)

### Element 8.1 — Eyebrow
- **EN:** `Diagnostic Consultation`
- **ZH:** `诊断性咨询`

### Element 8.2 — H2
- **EN:** `Ready to see where your child stands?`
- **ZH:** `准备好了解您孩子的真实水平了吗？`

### Element 8.3 — Body
- **EN:** `The consultation is 20 minutes. A Navigator — not a sales call. We measure your child's Lexile level, identify the exact gaps, and show you what the first 16 weeks looks like for a student exactly like yours.`
- **ZH:** `咨询时长20分钟。由导师（Navigator）进行——不是销售电话。我们测量您孩子的Lexile水平，定位精确的差距，并向您展示对于与您孩子情况相似的学生，头16周会是什么样子。`

### Element 8.4 — CTA button
- **EN:** `Book Your Consultation`
- **ZH:** `预约咨询`

### Element 8.5 — CTA note
- **EN:** `Free diagnostic assessment included. No obligation.`
- **ZH:** `包含免费诊断性评估。无任何义务。`

---

## §9 · CHARTER / FOOTER BAND (dark bg, gold-accent badge + dual CTA)

### Element 9.1 — Badge text (gold pill)
- **EN:** `Diagnostic Consultation`
- **ZH:** `诊断性咨询`

### Element 9.2 — H2
- **EN:** `Ready to meet your child's Navigator?`
- **ZH:** `准备好与您孩子的导师（Navigator）见面了吗？`

### Element 9.3 — Sub
- **EN:** `The diagnostic consultation is where we find out exactly where your child is — not where their school says they are.`
- **ZH:** `诊断性咨询让我们精确了解您孩子目前的真实水平——而不是学校说的水平。`

### Element 9.4 — Primary CTA (links to `/[locale]/consult`)
- **EN:** `Book Your Consultation`
- **ZH:** `预约咨询`

### Element 9.5 — Secondary CTA (links to `/[locale]/methodology`)
- **EN:** `Read the Methodology`
- **ZH:** `阅读方法论`

---

## End of /program content

**Elements rendered by component but NOT in `program` export:**
- TRAITS array in `page.jsx:47-53` (drives §7.9 trait rows) — **separate static data**, needs F2 cascade
- LEXILE_SCALE array in `page.jsx:37-44` — Lexile/grade reference labels for §7 scale viz
- Hardcoded LexileBar values: `start={620} end={820} weeks={16}` in `page.jsx:470` — consistent with §3.6 caption

**Structural fields present but currently null/empty:**
- `hero.h1zh` (secondary ZH H1 line) — empty
- All `*.h2zh` fields (secondary heading lines) — null across the file

---

## How to mark this up for review

Same as `01-home-content-dump.md`:
- Strike through anything you want changed
- Write your replacement directly below the original
- Note where you want to keep stale claims vs update
- When done, save and tell me **"apply program review"** — I'll catalogue your changes, present them for confirmation, then apply

If you also want to address the pre-existing F1–F7 flags I called out at the top, mark each with `F1: fix` / `F1: defer` / `F1: keep` etc. — I'll handle them per your call.
