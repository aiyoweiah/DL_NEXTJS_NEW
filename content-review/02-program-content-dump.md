# `/program` — content dump for review v3 (post-Q1–Q8, refreshed 2026-05-21)

**Source files:** `content/marketing.en.js` + `content/marketing.zh.js` (`program` export)
**Rendered by:** `app/[locale]/program/page.jsx`
**State:** All Q1–Q8 review decisions applied. Type A/B caption removed (pending port to /methodology, workflow #18). Price column hidden via JSX conditional (workflow #17). Global positioning active on /program (cascade to other surfaces pending, workflow #16).

> **How to use:** Strike through anything you want changed; write replacements directly below each element. Mark "keep" if you've reviewed and accepted as-is. When ready, save and tell me **"apply program review"**.

---

## §0 · SEO META

### Element 0.1 — `<title>`
- **EN:** `What Happens in a 16-Week Program — DODO Learning`
- **ZH:** `16周课程安排 — DODO Learning`

### Element 0.2 — `<meta name="description">`
- **EN:** `Live, Navigator-led English literacy program for students worldwide. The LCS System and MCT enriched curriculum, executed each session through The Loop — Read → Think → Speak → Write. Entry, mid-cycle, and exit Lexile assessments. One grade level of growth across two 16-week cycles.`
- **ZH:** `面向全球家庭的英语深度学习课程，导师实时主导。LCS 教学理念与 MCT 课程为架构，每节课运行 The Loop — 阅读 → 思考 → 表达 → 写作。入学、中期、结业三次Lexile评估。两个16周周期内Lexile阅读水平提升一个年级。`

---

## §1 · HERO SECTION (dark void bg, full viewport, steamboat illustration)

### Element 1.1 — Tagline chip
- **EN:** `Think Once. In Both Languages.`
- **ZH:** `一次思考。两种语言。`

### Element 1.2 — H1
- **EN:** `What happens in a 16-Week Program?`
- **ZH:** `16周课程安排`

### Element 1.3 — Sub paragraph (under H1)
- **EN:** `Live, one-on-one with dedicated Navigator. English literacy and writing for students around the world. Grounded in MCT gifted teaching framework plus The LCS System covering Reading, Thinking, Speaking, and Writing. Progress measured in Lexile and the 6+1 Trait rubric.`
- **ZH:** `特约导师，线上一对一，面向全球家庭的英语深度学习课程。以 MCT 资优教学架构与 LCS 教学体系，每节课全面发展 Read - Think - Speak - Write。进步以 Lexile 数据和 6+1 Trait 评估体系衡量。`

### Element 1.4 — Primary CTA (gold, anchors to #loop-section)
- **EN:** `See How It Works`
- **ZH:** `了解详情`

### Element 1.5 — Secondary CTA (ghost, → `/[locale]/consult`)
- **EN:** `Book Your Consultation`
- **ZH:** `预约咨询`

### Element 1.6 — Stat rail (6 stat pills)

| # | EN value · unit · desc | ZH value · unit · desc |
|---|---|---|
| 1 | `16` · `Weeks` · `A real commitment` | `16` · `周` · `一份真正的承诺` |
| 2 | `4` · `Skills` · `Read · Think · Speak · Write` | `4` · `项技能` · `阅读 · 思考 · 表达 · 写作` |
| 3 | `3` · `Assessments` · `Week 0 · Week 8 · Week 16` | `3` · `次评估` · `第0周 · 第8周 · 第16周` |
| 4 | `1` · `Navigator` · `Who knows your child` | `1` · `位导师（Navigator）` · `了解您的孩子` |
| 5 | `1-on-1` · `Always` · `No group sessions, no rotation` | `1对1` · `始终如一` · `无班级课，无导师轮换` |
| 6 | `∞` · `The Full Loop` · `Every single session` | `∞` · `完整学习循环` · `每一节课` |

---

## §2 · LOOP SECTION (white bg, 4-card grid)

### Element 2.1 — Eyebrow
- **EN:** `How does LCS or "The Loop" work?`
- **ZH:** `LCS · The Loop · 语言发展系统`

### Element 2.2 — H2
- **EN:** `Four skills. Every session.`
- **ZH:** `四项技能。每节课都操练。`

### Element 2.3 — Phase tag (static, top-right)
- Both locales: `Read → Think → Speak → Write`

### Element 2.4 — Step 01 Read
| Field | EN | ZH |
|---|---|---|
| label | `Read` | `阅读` |
| labelZh | `阅读` | `Read` |
| desc | `Classical and SAT-must-read texts — Alice in Wonderland, The Invisible Man, The War of the Worlds — chosen at or just above their current Lexile. Comprehension tracked by data, not guesswork.` | `经典与SAT必读文本——爱丽丝梦游仙境、隐形人、世界大战——选材在当前Lexile水平或略高一筹。理解力以数据跟踪，而非猜测。` |

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
| desc | `They take a position and defend it — live, with their Navigator. This is where confidence is built, not performed.` | `他们提出立场，与导师一起实时表达并支持自己的观点。这是建立真正自信的地方，而非表演出来的自信。` |

### Element 2.7 — Step 04 Write
| Field | EN | ZH |
|---|---|---|
| label | `Write` | `写作` |
| labelZh | `写作` | `Write` |
| desc | `Everything they've read, thought, and said now lands on the page. The MCT writing arc — Grammar → sentence → paragraph → essay → academic composition — scored against the 6+1 Trait rubric.` | `他们所阅读、思考、表达的一切，最终落到纸面上。沿 MCT 写作路径——语法 → 句子 → 段落 → 论文 → 学术写作——以 6+1 Trait 评估体系逐项评分。` |

### Element 2.8 — Type A/B caption — **REMOVED FROM /program** (workflow #18 — port to /methodology)

### Element 2.9 — Methodology link
- **EN:** `Read the full methodology →`
- **ZH:** `了解详情 →`

---

## §3 · JOURNEY SECTION (whisper bg, 3 + 1 grid)

### Element 3.1 — Eyebrow
- **EN:** `The Journey`
- **ZH:** `学习旅程`

### Element 3.2 — H2
- **EN:** `Where your child starts — and where they'll be.`
- **ZH:** `孩子的起步——与 DODO Learning 一起的进步。`

### Element 3.3 — Step 1 (Week 1)
| Field | EN | ZH |
|---|---|---|
| week | `Week 1` | `第1周` |
| label | `Entrance Assessment` | `入学评估` |
| desc | `We start by finding out exactly where your child is — their Lexile reading level, their 6+1 Trait writing baseline, and the specific areas where they need support. No assumptions.` | `我们从精确了解您孩子的当前位置开始——他们的Lexile阅读水平、6+1特质写作基线，以及他们需要支持的具体方面，从不做任何假设。` |

### Element 3.4 — Step 2 (Weeks 2–15)
| Field | EN | ZH |
|---|---|---|
| week | `Weeks 2–15` | `第2–15周` |
| label | `Weekly Sessions` | `每周课程` |
| desc | `Each week, your child works through The LCS with their Navigator — someone who knows their progress, their challenges, and what to push next. Sessions run up to 50 minutes, minimum once per week.` | `每周，您的孩子与他们的导师（Navigator）一起操练 The Loop（学习循环）——这位导师了解他们的进步、挑战以及下一步该推动什么。每节课最长50分钟，最少每周一次。` |

> **Note:** EN uses "The LCS" / ZH uses "The Loop" — asymmetry confirmed by user (Q3 answer A). Reflects literal per-locale intent: EN naming the curriculum architecture, ZH naming the per-session phrase.

### Element 3.5 — Step 3 (Week 16)
| Field | EN | ZH |
|---|---|---|
| week | `Week 16` | `第16周` |
| label | `Exit Assessment + Progress Report` | `结业评估与进度报告` |
| desc | `At the end, you see the growth as real numbers: Lexile level before and after, 6+1 Trait scores for all seven traits, side by side with where they started. You receive a written progress report. Then you decide what comes next.` | `在课程结束时，您将看到以真实数字呈现的成长：前后Lexile水平，七个特质的6+1特质评分，与起始状态并排对比。您将收到一份书面的进度报告。然后由您决定下一步。` |

### Element 3.6 — LexileBar cell
- Eyebrow: EN `Lexile Growth` · ZH `Lexile 成长`
- Caption: EN `Typical 16-week result: 620L → 820L` · ZH `典型16周成果：620L → 820L`
- *(LexileBar hardcoded 620 → 820 over 16 weeks in `page.jsx:470`)*

---

## §4 · ARCHITECTURE SECTION (dark bg)

### Element 4.1 — Eyebrow
- **EN:** `The Architecture`
- **ZH:** `The LCS 体系架构`

### Element 4.2 — H2
- **EN:** `How the work compounds: The Loop (per-session) → The LCS System (per-cycle) → Levels (across cycles).`
- **ZH:** `成果如何累积：The Loop（每节课） → The LCS（每个周期） → 级别（跨多个周期）。`

### Element 4.3 — Body
- **EN:** `The LCS System — Literacy · Composition · Speaking — is the curriculum architecture. Within it, every session runs The Loop, guided by your child's Navigator. Across each 16-week cycle, sessions accumulate into LCS strand progress. Across multiple cycles, students advance through nine curriculum levels — Starter, Intermediate, and Levels 1–7. Each level requires two to three cycles. Each cycle is 16 weeks.`
- **ZH:** `LCS 教学理念——文学精读 · 系统写作 · 表达——是课程的架构。在 LCS 之内，每节课运行 The Loop，由您孩子的导师引导。每个16周周期内，每节课累积为 LCS 三个维度的进步。跨越多个周期，学生逐步进阶九个课程级别——Starter、Intermediate 以及 Levels 1–7。每个级别需要两到三个周期。每个周期为16周。`

### Element 4.4–4.6 — Strands L · C · S
*(Unchanged from previous review)*

### Element 4.7 — Levels note
- **EN:** `Calibrated against US SAT, SSAT, IB Extended Essay, Cambridge KET & PET, and North American private-school + gifted-school standards. Level 7 = college-tier academic English capability.`
- **ZH:** `对标美国SAT、SSAT、IB拓展论文、剑桥KET与PET，以及北美私立学校和资优生项目标准。Level 7相当于大学级别的学术英语能力。`

---

## §5 · COMBINATIONS SECTION (light bg, 5-card grid)

### Element 5.1 — Eyebrow
- **EN:** `Choose Your Combination`
- **ZH:** `选择您的组合`

### Element 5.2 — H2
- **EN:** `Five programme combinations. Same Loop. Different intensity.`
- **ZH:** `五种课程组合。相同的The Loop（学习循环）。不同的强度。`

### Element 5.3 — Body
- **EN:** `Every combination runs the full 16-week cycle, every session runs The Loop, every student works with one dedicated Navigator. The combinations differ in weekly session count and emphasis — choose the shape that fits your child's current need.`
- **ZH:** `每一种组合都运行完整的16周周期，每节课都运行The Loop（学习循环），每个学生都与一位专属导师（Navigator）一起学习。不同组合在于每周课时数和侧重点——选择符合您孩子当前需求的模式。`

### Element 5.4 — Combination cards — **PRICE HIDDEN ON RENDER** (data preserved, workflow #17)

| ID | Name | nameZh | Format (EN) | Format (ZH) | Price (data only — not rendered) | forWhom (EN) | forWhom (ZH) | Featured |
|---|---|---|---|---|---|---|---|---|
| summit | Summit | 全境领航 | `3× literature + 1× writing / week` | `每周3节文学课 + 1节写作课` | `$2,830` | `Accelerated growth · high-stakes academic milestones` | `加速成长 · 高难度学业里程碑` | no |
| core | Core | 稳健航行 | `2× literature + 1× writing / week` | `每周2节文学课 + 1节写作课` | `$2,250` | `Most popular · long-term development` | `最受欢迎 · 长期发展` | **yes** |
| flex-1 | Flex 1 | 文学阅读自由航行 | `2× literature / week` | `每周2节文学课` | `$1,185` | `Building the reading foundation first` | `先打好阅读基础` | no |
| flex-2 | Flex 2 | 大师写作自由航行 | `2× writing / week` | `每周2节写作课` | `$2,110` | `Writing specialisation` | `写作专精` | no |
| flex-3 | Flex 3 | GPA管理自由航行 | `1× GPA tutoring / week` | `每周1节GPA学业辅导` | `from $750` | `School academic management · pairs with any combination above` | `学校学业管理 · 可与上述任意组合搭配` | no |

### Element 5.5 — "Most Popular" badge (Core card)
- **EN:** `Most Popular` · **ZH:** `最受欢迎`

### Element 5.6 — Combinations note
- **EN:** `Each combination runs for one 16-week cycle. Pricing and weekly payment options are detailed in the FAQ.`
- **ZH:** `每种组合按16周一个周期运行。价格与按周付款选项详见常见问题。`

### Element 5.7 — FAQ link
- **EN:** `See pricing details in FAQ →` · **ZH:** `查看定价详情 →`

---

## §6 · SESSION SECTION (dark bg, Unsplash image) — *Mud Trilogy + Building Language rewrite*

### Element 6.1 — Navigator chip
- Avatar: `NV`
- navigatorName: **EN** `Ms. Jennifer` · **ZH** `Ms. Jennifer`
- sessionPhase: **EN** `Read · Red Tide · Lexile 740` · **ZH** `阅读 · Red Tide · Lexile 740`

### Element 6.2 — Eyebrow
- **EN:** `A Real Session` · **ZH:** `一堂真实的课`

### Element 6.3 — H2
- **EN:** `Here's what a typical Tuesday looks like.` · **ZH:** `一个典型的周二是什么样子的。`

### Element 6.4 — p1 + q1 (etymology opening)
- **EN p1:** `The Navigator opens with the day's text:`
- **EN q1:** `"Today we're inside Red Tide — chapter four. You're at Lexile 740, eight points above last week. The word doing the heavy lifting today is malevolent. Before we read, let's crack it open."`
- **ZH p1:** `导师打开当天的文本：`
- **ZH q1:** `"今天我们读 Red Tide 第四章。你现在的 Lexile 是 740，比上周高 8 个点。今天要重点掌握的词是 malevolent。先把这个词拆开来看。"`

### Element 6.5 — p2 (Building Language Latin root)
- **EN:** `Five minutes on the Latin root from MCT's Building Language — mal- for bad, volens for willing. Malevolent isn't just "evil." It's wanting harm, intentionally. The antagonist's choice now reads differently.`
- **ZH:** `用五分钟讲 MCT Building Language 里的拉丁词根——mal- 表示"坏"，volens 表示"有意愿的"。Malevolent 不只是"邪恶"，而是"有意作恶"。回到文本，反派角色的选择立刻有了新的意味。`

### Element 6.6 — p3 (annotated reading + Visible Thinking)
- **EN:** `Then the chapter. Annotated, paused, questioned. After each scene the Navigator asks: what is the author choosing not to tell us? What changes when malevolent is the word in your head?`
- **ZH:** `然后进入章节。一起批注、暂停、追问。每个场景结束，导师提问：作者刻意没告诉我们什么？当 malevolent 是你脑中的词，故事是否变了？`

### Element 6.7 — p4 + q4 (forward to Speak phase)
- **EN p4:** `The session closes looking forward:`
- **EN q4:** `"Next week is Speak. You'll defend whether the antagonist is malevolent or just afraid. Bring three pieces of evidence from this chapter."`
- **ZH p4:** `课程以展望下次结束：`
- **ZH q4:** `"下周是表达阶段。你要论证这个反派究竟是 malevolent，还是只是 afraid。请从这一章带三处文本证据来。"`

### Element 6.8 — Navigators link
- **EN:** `Meet the Navigators →` · **ZH:** `认识导师（Navigator）团队 →`

---

## §7 · GROWTH SECTION (black bg) — *unchanged this round*

### 7.1–7.10 Same as v2 dump. Key items:
- Lexile claim: "one grade level across two 16-week cycles, with per-cycle Lexile gains in the 100L–150L range"
- 6+1 Trait labels (ZH): 思考 · 结构 · 声音 · 用词 · 流畅 · 规范 · 呈现

---

## §8 · GET STARTED SECTION (light lavender bg) — *unchanged*

### 8.5 — CTA note
- **EN:** `Free diagnostic assessment included. No obligation.`
- **ZH:** `包含免费诊断性评估。` (reassurance tail dropped per §08 ZH lint)

---

## §9 · CHARTER / FOOTER BAND (dark bg) — *unchanged this round*

### 9.5 — Secondary CTA
- **EN:** `Read the LCS Methodology`
- **ZH:** `认识 The LCS 系统`

---

## What changed in this round (post-Q1–Q8, 2026-05-21)

| Section | Change | Trigger |
|---|---|---|
| §0.1 EN title | "The 16-Week Program" → "a 16-Week Program" | Style edit |
| §0.1 ZH title | "16周课程的内部安排" → "16周课程安排" | Style edit |
| §0.2 EN desc | Dropped "Chinese families in Canada and US"; added "MCT enriched curriculum" | Q1 (global) |
| §0.2 ZH desc | "加拿大和美国华人家庭" → "全球家庭"; added "MCT 课程" | Q1 + Q4 |
| §1.2 EN H1 | "What happens inside The 16-Week Program?" → "What happens in a 16-Week Program?" | Style edit |
| §1.2 ZH H1 | "16周课程内部是怎样的？" → "16周课程安排" | Style edit |
| §1.3 EN sub | Rewritten with global framing + MCT + LCS + typo fixes | Q1, Q4, typos |
| §1.3 ZH sub | Rewritten with global framing + 特约导师 + MCT + LCS | Q1, Q4 |
| §1.4 ZH CTA1 | "了解运作方式" → "了解详情" | Style edit |
| §2.1 EN eyebrow | "How The Loop Works" → "How does LCS or 'The Loop' work?" | Style edit + typo fix |
| §2.1 ZH eyebrow | "The Loop（学习循环）的运作方式" → "LCS · The Loop · 语言发展系统" | Q5 |
| §2.2 ZH H2 verb | 涉及 → 操练 | Style edit |
| §2.8 typeAB | Cleared (both locales) — content moves to /methodology | Q6 |
| §2.9 ZH link | "阅读完整方法论 →" → "了解详情 →" | Style edit |
| §3.2 ZH H2 | DODO Learning brand reference added | Style edit |
| §3.3 ZH desc | Sentence-connector edit (从不做任何假设) | Style edit |
| §3.4 EN desc | "The Loop"→"The LCS"; "90 min, once/week"→"up to 50 min, min once/week" | Q3, Q2 |
| §3.4 ZH desc | 完成→操练; same session-length update | Q2 + style |
| §4.1 ZH eyebrow | "体系架构" → "The LCS 体系架构" | Style edit |
| §5.4 cards | Price column hidden via JSX conditional (data preserved) | Q7 |
| §5.6 note | Rewritten to remove pricing-specific framing | Q7 follow-on |
| §6 session | Full rewrite: Red Tide + Latin root malevolent + Speak phase forecast | Q8 |

---

## How to mark up

Same as before — strike through, write replacements, mark "keep", save, and say **"apply program review"**.
