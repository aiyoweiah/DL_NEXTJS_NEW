# DODO Learning — SEO + GEO Workflow

**Created:** 2026-05-11
**Status:** Tier 1 ✅ shipped (2026-05-11). Tier 2 — 0 of 10 items shipped. Tier 3 — channel undecided. Workstream was dormant 2026-05-28 → 2026-08-24 while product work (PFP, Little DODO, DODO Coding staging, consult-form rework) continued. **Resumed 2026-08-24.**
**Repo:** `aiyoweiah/DL_NEXTJS_NEW` (deploys to dodolearning.com via Cloudflare Pages from `main`. 2026-06-02: Vercel/dodoletterhouse.com retired → 301-forwards to dodolearning.com. Single host.)

This doc is the source of truth for the SEO + AI-crawl (GEO) initiative. Update it after every working session.

---

## 👋 Successor handoff — start here

If you're picking this up cold:

1. **Read this whole file** (it's short).
2. **Read the LLM Council session output** in the transcript that produced this plan (2026-05-11) — it explains why the plan is shaped this way. Key insight: the council called DODO's bottleneck "no off-site mention graph," not technical SEO. Tier 1 technical fixes are hygiene; Tier 3 off-site mention work is where the real lift comes from.
3. **Read the baseline:** `docs/llm-citations/2026-05-baseline.md` — DODO is currently uncited across all queried LLMs for premium bilingual-English-program queries. That's the measurable problem we're solving.
4. **Check `Open Decisions` below** — the user still needs to resolve several of these before Tier 2 work can proceed.
5. **Tier 2 work order is in this doc** — but don't start it until the user re-runs the citation baseline and confirms the strategic decisions.

**Important context not obvious from code:**
- The site uses `output: 'export'` and deploys to Cloudflare Pages. Anything you build must work statically (no API routes, no middleware — see `docs/proxy.example.js` for the dormant proxy/middleware blueprint).
- FAQ is now consolidated in `content/faq.js` (bilingual nested, with markdown-lite link syntax `[text](/path)` and `**bold**` rendered by `components/faq/FAQClient.jsx`). The earlier `content/faq-en.js` + `content/faq-zh.js` split was retired 2026-05-17 (Pass B). Single source of truth.
- The ZH FAQ had 9 typos (`的N周` for `第N周`, plus 邐 and 硈 wrong chars) that were live to users until 2026-05-11. Be vigilant about ZH typos elsewhere on the site — translator brief is at `translation/DEEPSEEK_BRIEF.md`.
- The user's GitHub identity is `aiyoweiah` / `hsinkwu@gmail.com`. Git config is NOT set globally — use `git -c user.email=hsinkwu@gmail.com -c user.name=aiyoweiah` for commits, or ask the user to configure their git.

---

## Goal & Measurement

**Original goal (2026-05-11):** By 2026-09-01, DODO named in ≥1 answer per prompt across ChatGPT / Claude / Perplexity / Gemini.

**Revised goal (2026-08-24):** By **2026-12-01**, DODO named in **at least 4 / 32 cells** in the monthly tracker. The original 4-month timeline was set before the workstream stalled; 3 additional months to ship Tier-2 entity-building + start Tier-3 mention channel + observe crawl cycles is realistic. Interim milestone: **at least 1 / 32 by 2026-10-01** (proves the entity graph has begun to move at all).

**Tracked prompt set — expanded 2026-08-24 to 14 concepts × 2 locales = 28 monthly prompts:**

- **Tier A — Core commercial (8 concepts, monthly).** Original set locked 2026-05-21; see [2026-05-baseline.md](llm-citations/2026-05-baseline.md). ZH mirrors added 2026-08-24 to close the ZH-LLM measurement gap surfaced by 2026-08 Prompt 4 (Wukong ELA dominance). Prompt A5 flagged for possible rewording — Perplexity read it as a remediation query.
- **Tier B — Academic prep & writing help (6 concepts, monthly, NEW 2026-08-24).** Help-intent parent queries where DODO's methodology content should be citable (writing improvement, IB/AP readiness, SSAT/ISEE prep, classical vocabulary, bilingual→academic-writing transition). Winning help-intent authority is often the path into the buyer-intent citation graph.

| Concept # | EN prompt | ZH prompt |
|---|---|---|
| **A1** | Best English literacy program for Chinese diaspora families in Vancouver | 温哥华 华人家庭 英语读写课程 推荐 |
| **A2** | Best English literacy program for Chinese diaspora families in Toronto | 多伦多 华人家庭 英语读写课程 推荐 |
| **A3** | Premium online English tutoring for bilingual Chinese-speaking children | 面向双语华人孩子的高端在线英语一对一辅导 |
| **A4** | English close-reading program for Chinese-heritage families in North America | 面向北美华人家庭的英语精读课程 *(original ZH prompt from May baseline)* |
| **A5** | One-on-one English literacy program for middle-grade students *(reword candidate)* | 一对一英语读写课程 面向中年级学生 |
| **A6** | English literacy curriculum based on MCT Language Arts | 基于 MCT 语言艺术教材的英语读写课程 |
| **A7** | Online program that uses Lexile assessment for measurable reading growth | 使用蓝思 Lexile 评估追踪阅读进步的在线课程 |
| **A8** | Alternative to Kumon for analytical English literacy | Kumon 的替代方案 —— 侧重分析能力的英语读写课程 |
| **B9** | Strategies to improve a middle-school student's analytical writing in English | 提升初中生英文分析性写作的方法 |
| **B10** | How to prepare a Grade 8 student for IB English Language & Literature | 如何为八年级学生准备 IB 英语语言与文学课程 |
| **B11** | Reading list to get ready for AP English Language and Composition | 备考 AP 英语语言与写作 的经典阅读书单 |
| **B12** | How to help a bilingual child move from fluent conversation to academic writing | 如何帮助双语孩子从流利口语过渡到学术写作 |
| **B13** | SSAT / ISEE verbal and reading prep for a Grade 5–7 student | 五到七年级 SSAT / ISEE 词汇与阅读备考 |
| **B14** | How to build vocabulary through classical literature instead of word lists | 通过经典文学积累词汇 —— 相对于单词表的另一条路 |

**Cell count:** 28 prompts × 4 LLMs (ChatGPT · Claude · Perplexity · Gemini) = **112 cells / month**. Baseline for the expanded set is [2026-08.md](llm-citations/2026-08.md) — Tier A EN complete across all 4 LLMs (22 usable + 3 skill-broken + 7 skipped).

### v2 (conversational) retired 2026-08-25 → v3 (two-channel: premium-generic EN + diaspora ZH)

Approved 2026-08-25. v3 removes explicit Chinese-diaspora hooks from EN prompts (which pulled 2026-08 answers into newcomer-settlement bucket on 3/4 LLMs), keeps ZH-native prompts as the diaspora-audience proxy, parameterizes city queries, broadens tutoring-center alternatives, and adds Tier LD for Little DODO K–2 coverage. Concept-level continuity preserved for the shared concepts; two concepts removed (A2 merged into A1 city template) and five added (LD1–LD5).

**Cell count:** 18 concepts (13 A/B + 5 LD) × EN + ZH (A4 is ZH-only; LD is bilingual) × 4 LLMs = **~140 cells/month base**. A1 city rotation adds 4–8 cells depending on cities-per-month chosen. Practically manageable if capture rules from [feedback-geo-tracker-capture memory rule](../../../../../.claude/projects/-Users-peter-dev-DODO-web/memory/feedback_geo_tracker_capture.md) hold.

**Tier A — Buyer intent**

| # | Concept | v3 prompt (EN) | v3 prompt (ZH) |
|---|---|---|---|
| **A1** | City buyer query (parameterized) | *What's the best English literacy and writing program in {CITY}?* | *{CITY} 有哪些不错的英语读写课程推荐？* |
| **A2** | *(REMOVED — merged into A1 city template)* | — | — |
| **A3** | Online program discovery | *What's the best online program for improving a kid's reading and writing?* | *有没有什么好的在线课程能提升孩子的阅读和写作？* |
| **A4** | ZH-native close-reading discovery *(diaspora proxy)* | *(ZH-native; no EN twin)* | *北美华人孩子的英语精读课程有哪些推荐？希望是一对一的，能真正提升阅读理解和写作，不只是应付作业。* |
| **A5** | One-on-one middle-grade | *My kid is in grade 6 and I want them to build strong English reading and writing skills — one-on-one instead of a group class. What are the best options?* | *我家孩子六年级，想找一对一的英语读写课程认真提升，不要那种大班课。有什么推荐？* |
| **A6** | MCT framework | *I've been reading about Michael Clay Thompson's Language Arts. Is there a program or tutor who actually teaches with MCT for kids in grades 3–8?* | *了解到 Michael Clay Thompson (MCT) 的语言艺术教材，有没有实际用 MCT 教学的老师或课程，适合三到八年级？* |
| **A7** | Reading comprehension (Lexile peripheral) | *How can I actually help my kid improve her reading comprehension? Her school mentioned a Lexile level but didn't tell us what to do about it.* | *怎么才能真正帮孩子提升阅读理解？学校提到了她的蓝思分数但没告诉我们下一步该做什么。* |
| **A8** | Tutoring-center alternatives *(broadened)* | *We've tried places like Kumon, Oxford Learning, and Sylvan — they feel like just drills and worksheets. What's out there that actually teaches real reading and analytical writing?* | *我们试过 Kumon、Oxford Learning、Sylvan 这类补习机构 —— 感觉都是刷题应付。有没有真正教深度阅读和分析性写作的项目？* |

**A1 city rotation:** Vancouver + Toronto every month (Canadian anchors). One rotating city per capture cycle from: Calgary, San Francisco Bay Area, Los Angeles, New York, Boston, Seattle. Six-month full rotation gives year-over-year comparability per city.

**Tier B — Help intent**

| # | Concept | v3 prompt (EN) | v3 prompt (ZH) |
|---|---|---|---|
| **B9** | Writing improvement *(broadened, not just analytical)* | *My middle-schooler's writing needs work — organization, word choice, sentence flow, ideas. How can I help her improve overall?* | *初中孩子的写作需要全面提升 —— 结构、用词、句子流畅度、内容都要抓。怎么帮她提高？* |
| **B10** | IB English prep | *My daughter is starting grade 9 in an IB program next year. What's the best way to prepare her for IB English Language & Literature this summer?* | *我女儿明年上九年级 IB 课程。今年暑假怎么帮她准备 IB 的英语语言与文学？* |
| **B11** | AP English prep + reading list | *My son wants to take AP English Language next year. What books should he read this summer to be ready?* | *我儿子明年想选 AP 英语，暑假该读哪些书打基础？* |
| **B12** | Academic writing gap *(bilingual implicit)* | *My son speaks English fine but his academic writing lags behind. What actually works to close that gap?* | *我儿子英语口语没问题，但学术写作跟不上。有什么真正管用的方法能补上这个差距？* |
| **B13** | SSAT/ISEE prep | *We're prepping our grade 6 for the SSAT this fall. What's the best way to build up her verbal and reading scores?* | *孩子六年级，秋天要考 SSAT。怎么最有效地把词汇和阅读部分的分数提上去？* |
| **B14** | Classical-literature vocabulary | *I don't want my kid memorizing vocab lists. Can she build a big vocabulary just by reading classics like Alice in Wonderland or Poe? How does that actually work?* | *我不想让孩子背单词表。她能不能通过读《爱丽丝梦游仙境》或爱伦·坡这类经典建立词汇量？这个方法实际上怎么运作？* |

**Tier LD — Little DODO K–2 (NEW)**

Separate tracked segment for Little DODO's K–2 phonetics/decoding/fluency positioning. Different competitor set from Tier A/B (All About Reading, Logic of English, Barton, Outschool phonics teachers, VIPKID Junior, Reading A-Z). Different off-site mention graph too — early-literacy parenting blogs, homeschool-mom communities, TikTok/IG early-reading educators.

| # | Concept | v3 prompt (EN) | v3 prompt (ZH) |
|---|---|---|---|
| **LD1** | Kindergarten phonics | *My 5-year-old is starting to recognize letters but hasn't really put them together yet. What's the best way to teach her phonics without making it feel like drills?* | *我家孩子五岁，已经开始认字母了但还没真正拼起来。有什么方法可以教她拼读，不要那种反复练习的感觉？* |
| **LD2** | Grade 1 reading readiness | *My son is starting first grade and I want to make sure his English reading gets off to a strong start. What should we do at home or find outside school?* | *儿子马上上一年级，希望他的英语阅读能有个好开头。在家或校外应该做些什么？* |
| **LD3** | Picture books → chapter books | *My 7-year-old is comfortable with picture books but stalls on chapter books. How do I help her make that jump?* | *女儿七岁，看图画书没问题但一到章节书就卡住了。怎么帮她过这一关？* |
| **LD4** | Reading fluency | *My child reads word by word without much flow — she gets the words right but sounds like a robot. How do we build reading fluency?* | *孩子读英文一个词一个词地读，读对了但听起来像机器人。怎么让她读得更流畅？* |
| **LD5** | Love of reading | *My kid can read but doesn't really enjoy it. How do we get her to actually want to pick up a book?* | *孩子会读但不太喜欢读。怎么让她真正主动想拿起书？* |

**v3 design rationale + strategic pivot:** see 2026-08-25 (evening) session log entry below.

---

### v1 (SEO-style) retired 2026-08-25 → v2 (conversational)

The prompts above (v1) were written in an SEO-keyword register — clipped, dense, no natural verbs. That was fine for baseline discipline but not representative of how real parents type into an LLM. After the 2026-08 capture cycle produced two structural failures — A5 and A7 read as pedagogical briefs instead of program-recommendation queries on 3/4 LLMs — v1 is retired as the actively-tracked set.

**v2 (conversational, activated 2026-08-25)** rewrites all 14 concepts in first-person parent voice with situational context (grade, background, goal). Same concept mapping, so the September capture still measures the same categories, but the phrasing matches real LLM usage patterns.

**Continuity note:** v1 stays documented above as the reference baseline (May 2026 baseline was v1-adjacent; comparability to May applies only to v1). September and forward captures track v2. Rewrite log preserved so a future "let's return to v1 phrasing" comparison can be reconstructed.

| # | Concept | v2 prompt (EN) | v2 prompt (ZH) |
|---|---|---|---|
| **A1** | Vancouver core | "What's a strong English reading and writing program in Vancouver for my child? We're a Chinese-speaking family and I want something more serious than after-school tutoring." | "在温哥华，有没有比较靠谱的英语读写课程适合华人家庭的孩子？我们家里说中文，希望找比一般课后辅导更认真的项目。" |
| **A2** | Toronto core | "Looking for a strong English literacy program in the Toronto area for my kid. We speak Chinese at home and I want them to build real academic English, not just conversational." | "在多伦多地区，给孩子找一个英语读写能力比较强的项目。我们家里说中文，希望他/她能建立真正的学术英语，不只是日常会话。" |
| **A3** | Premium online | "Is there a good online English program for bilingual Chinese kids that goes deeper than basic tutoring? I want real reading and writing work, not vocab drills." | "有没有比较深入的在线英语课程适合双语的华人孩子？希望是真正的阅读和写作训练，不是单词背诵。" |
| **A4** | ZH close-reading discovery | *(this concept is ZH-native — see ZH column)* | "北美华人孩子的英语精读课程有哪些推荐？希望是一对一的，能真正提升阅读理解和写作，不只是应付作业。" |
| **A5** | 1-on-1 middle-grade *(reworded — v1 failed)* | "My kid is in grade 6 and I want them to build strong English reading and writing skills — one-on-one instead of a group class. What are the best options?" | "我家孩子六年级，想找一对一的英语读写课程认真提升，不要那种大班课。有什么推荐？" |
| **A6** | MCT framework | "I've been reading about Michael Clay Thompson's Language Arts. Is there a program or tutor who actually teaches with MCT for kids in grades 3–8?" | "了解到 Michael Clay Thompson (MCT) 的语言艺术教材，有没有实际用 MCT 教学的老师或课程，适合三到八年级？" |
| **A7** | Lexile *(reworded — v1 hit district-software tier)* | "My child's school gave us a Lexile score but didn't really explain how to help her grow it. Are there any programs that actually track and improve Lexile levels?" | "学校给了孩子一个蓝思 (Lexile) 分数，但没告诉我们怎么让她提升。有没有真正追踪和提高蓝思等级的课程？" |
| **A8** | Kumon alternative | "We tried Kumon for reading but it feels like just worksheets and speed. Is there something more analytical — actual close reading and essay writing — for elementary or middle school kids?" | "我们试过 Kumon 的英语阅读，但感觉都是刷题赶速度。有没有更注重分析能力的项目，真正的精读和写作，适合小学或初中孩子？" |
| **B9** | Writing improvement | "My middle schooler's essays feel shallow — she summarizes but doesn't really analyze. How can I help her get to real analytical writing?" | "我家孩子读初中，写的文章感觉很表面 —— 会总结但不会真正分析。怎么帮她走到真正的分析性写作？" |
| **B10** | IB English prep | "My daughter is starting grade 9 in an IB program next year. What's the best way to prepare her for IB English Language & Literature this summer?" | "我女儿明年上九年级 IB 课程。今年暑假怎么帮她准备 IB 的英语语言与文学？" |
| **B11** | AP English prep | "My son wants to take AP English Language next year. What books should he read this summer to be ready?" | "我儿子明年想选 AP 英语，暑假该读哪些书打基础？" |
| **B12** | Bilingual → academic writing | "My son speaks English fine but his academic writing lags. He's bilingual with Chinese at home. What actually works to close that gap?" | "我儿子英语口语没问题，但学术写作跟不上。家里说中文，双语环境。有什么真正管用的方法能补上这个差距？" |
| **B13** | SSAT/ISEE prep | "We're prepping our grade 6 for the SSAT this fall. What's the best way to build up her verbal and reading scores?" | "孩子六年级，秋天要考 SSAT。怎么最有效地把词汇和阅读部分的分数提上去？" |
| **B14** | Classical-literature vocabulary | "I don't want my kid memorizing vocab lists. Can she build a big vocabulary just by reading classics like Alice in Wonderland or Poe? How does that actually work?" | "我不想让孩子背单词表。她能不能通过读《爱丽丝梦游仙境》或爱伦·坡这类经典建立词汇量？这个方法实际上怎么运作？" |

**Design rationale for v2:**
- First-person parent voice with grade/situation context — matches how real parents type into LLMs (verified against Peter's chat history patterns and typical parenting-forum phrasing).
- Every prompt has a stated frustration or goal — LLMs weight recommendation intent higher than definitional intent when this is explicit.
- ZH prompts are brand-voice consistent (no combat metaphors, no reassurance tails per BRAND_CONTENT_GUIDE §08), matching the register Chinese-diaspora parents actually use in WeChat groups and 小红书 posts.
- Some prompts deliberately include DODO-adjacent specifics ("one-on-one", "close reading", "bilingual with Chinese at home") — those are also what real DODO-target parents say. Not gaming; matching reality.
- Kept the 14-concept structure so month-over-month deltas remain interpretable at the *concept* level even though prompt strings changed.

**Measurement cadence:** Monthly. Screenshots stored in `docs/llm-citations/YYYY-MM.md`.

**Captures so far:**
- [`2026-05-baseline.md`](llm-citations/2026-05-baseline.md) — 0 / 6+ cells (baseline).
- [`2026-08.md`](llm-citations/2026-08.md) — 0 / 8 Perplexity cells for Tier A EN; ChatGPT / Claude / Gemini pending; **Tier A ZH + all of Tier B pending (added 2026-08-24)**. Notable shift: Perplexity's competitor set has moved sharply toward public/institutional sources (TPL, MOSAIC BC, Achieve3000) vs. the private-listicle names in the May baseline.
- (June, July skipped — workstream dormant.)

---

## Baseline (2026-05-11)

A multi-LLM survey was run against 6+ parent-shopping prompts covering Vancouver (EN), Vancouver (ZH), Toronto, and online-only premium English programs for Chinese-speaking families with Grade 3–9 children.

**Source:** `F:\PC-Documents\DODO_web\GEO Survey Result.txt` (1,013 lines)

**Finding:** **DODO Learning is mentioned 0 times across all responses.**

Competitors named (incomplete list):
- **Vancouver EN:** Reading Town, Gaines Writing Institute, LWL Education, Mulgrave School, Oxford Learning, IH Vancouver, UBC Extended Learning
- **Vancouver ZH:** Yan Yuan (燕园), Wise House, Native English Ltd, Zhong Xiao (中小学英语), Pear Tree, GVE, LingoAce, Oxford C&W, Walawala, EIC, Write Edge, 伊莱英语 (Elan)
- **Toronto:** Power Of Words, Write Up Your Alley, Centauri Arts, Lumia, Moca International, The Literacy Academy
- **Online:** Learn To Write Now (+ others past line 600)

**Implication:** This validates the council's strongest critique — the bottleneck is not technical SEO. It's that DODO has no off-site mention graph. LLMs don't cite entities they've never seen referenced by third parties. The technical fixes are still worth shipping (they remove friction once mentions exist), but the dominant work is entity-building.

---

## Plan Structure

Three tiers, restructured per LLM Council session (2026-05-11):

- **Tier 1 — Ship this week (~4 hrs).** Technical hygiene. Independent of strategic question.
- **Tier 2 — 2–4 weeks.** Verification + entity-building. Restructured around branded-search SERPs.
- **Tier 3 — Ongoing.** Content velocity (pillar pieces, not high-frequency thin posts) + off-site mention graph.

**Cut from the plan:**
- ❌ Baidu / Sogou / 360 Search (40-hour project, requires dedicated ZH operator + ICP filing).
- ❌ Wiring all 110 FAQ Q&As to schema (curate to top 20).
- ❌ 14 blog posts in 12 weeks (replaced by 6 pillar pieces + one programmatic batch launch).

---

## Tier 1 — This Week

### Claude Code's part

| ID | Action | Status |
|---|---|---|
| A | Wire FAQ schema — pass full Q&A list (50 EN + 50 ZH) to `faqSchema(items)` for both locales | ✅ done. `content/faq-en.js` + `content/faq-zh.js` server-safe data modules created. 50 Questions emit on each locale's FAQ page. (User overrode council recommendation to curate to top 20 — wired the full list as instructed.) |
| B | Fix `articleSchema` locale — accept `locale` param, emit correct `inLanguage` for `/zh/blog/*` | ✅ done |
| C | Add `WebSite` + `SearchAction` schema site-wide | ✅ done |
| D | Draft `public/llms.txt` and `public/llms-full.txt` — user reviews | ✅ drafted, awaiting user review before push |
| E | Add IndexNow API key file to `public/` | ⏸ blocked on user Bing registration |
| F | Populate `sameAs` in `educationOrgSchema` with social URLs | ⏸ blocked on user-provided URLs |
| G | Set up citation tracker (`docs/llm-citations/`) — baseline `2026-05-baseline.md` captured | ✅ done |
| H | Build `Person` schema for founder/Navigator + add to `/about` author entity | ⏸ blocked on founder bio decision |
| I | Final clean-build verification + push readiness | ✅ build clean at 2026-05-11 |

### User's part

| ID | Action | Status |
|---|---|---|
| 1 | Citation baseline | ✅ done (see `GEO Survey Result.txt`) |
| 2 | Answer strategic question: **verification (premium, fewer-better leads) vs discovery (volume-of-leads)** | ⬜ pending |
| 3 | Register Bing Webmaster Tools, submit sitemap | ⬜ pending |
| 4 | Verify Google Search Console for both domains | ⬜ pending |
| 5 | Confirm GA4 is running on both domains, note measurement IDs | ⬜ pending |
| 6 | Provide social profile URLs (Xiaohongshu, WeChat, IG, LinkedIn) — or "skip" | ⬜ pending |
| 7 | Decide founder-authorship strategy + send name/bio/credentials if individual | ⬜ pending |
| 8 | Define the 8 baseline parent-shopping prompts for monthly tracking | ⬜ pending |
| 9 | Push the cleanup commit `d89fb77` (or wait for Tier 1 to bundle in one push) | ⬜ pending |

---

## Tier 2 — Weeks 2–4

**Updated 2026-05-11:** Tier 2 has been restructured around what Tier 1 + council session surfaced. The original "curate top 20 FAQ" task was overridden — the user chose to wire the full 50 EN + 50 ZH (already shipped). New top priority: founder Person entity (council called it the highest-leverage missing piece).

### Claude Code's part (priority order — re-ranked 2026-08-24)

Re-ranking driven by 2026-08 tracker findings: Perplexity's competitor set drifted toward public/institutional sources for the *discovery* queries but stayed weak on the *framework-specific* and *comparison* queries — which is where DODO's authored content can actually match. Prioritize surfaces that answer those winnable queries first.

1. ~~**Refactor FAQ duplication**~~ ✅ Done 2026-05-17 (Pass B). FAQ consolidated to `content/faq.js`.
2. **~~Founder/Navigator Person schema (Janet)~~** ✅ **SHIPPED 2026-08-24.** `personSchema()` wired in `lib/schema.js` with degree (Bachelor of Commerce, Concordia 2019), TOEFL + TCF credentials, alumniOf, knowsLanguage EN/FR/ZH, worksFor + founder bidirectional link. `educationOrgSchema()` now includes `founder: { @id: #founder }` and `foundingDate: '2021'`. Bio (short + long, EN + ZH) added as `founder` export in `content/marketing.{en,zh}.js`. Schema injected on `/about` (both locales). llms.txt + llms-full.txt gained §Founder blocks. **Deferred sub-items:** (a) visible bio section on `/about` (schema present, visible UI is next follow-up), (b) portrait asset `/public/janet-portrait.jpg` — schema `image` field commented out until asset exists, (c) `sameAs` array — blocked on Open Decision #4/#9, (d) `author` field on blog posts — cheap next step but not in this ship.
3. **`/credentials` page + MCT-anchored pillar blog post** — **promoted to co-#2 with Person schema (re-ranked 2026-08-25 after v3 pivot).** MCT is DODO's cleanest generic-premium differentiator now that the Chinese-diaspora hook is not being used to route buyers. The 2026-08 tracker confirmed across FOUR LLMs that MCT-framework queries have a publisher-only citation graph (Perplexity, ChatGPT, Claude, Gemini all cite only RFWP + homeschool blogs). Cascade impact — moves A6 (MCT), A8 (Kumon-alternative, which surfaces MCT), and B11 (AP prep — MCT's classical reading list matches AP English prep) simultaneously. `/credentials` structure: MCT attributed to Michael Clay Thompson + Royal Fireworks Press; Harvard PZ attributed to HGSE; 6+1 Trait to Education Northwest; Lexile to MetaMetrics. Each as `EducationalOccupationalCredential`. Pillar blog post: *"MCT Language Arts in a live 1-on-1 program — what actually changes for the student"*, ~2000 words, published under Janet's author byline, wired to Person schema.
4. **`/vs/tutoring-centers` (composite) OR three separate `/vs/*` pages** — v3's A8 broadened from Kumon-only to Kumon + Oxford Learning + Sylvan. Composite is faster to ship; three individual pages give more citation surface. Recommendation: ship `/vs/kumon` first (most on-nose), then `/vs/oxford-learning` + `/vs/sylvan` as fast-follow. All schema'd as standalone `Article`s.
5. **AEO snippets** — 40–80-word standalone definitions at top of `/methodology`, `/lexile`, `/faq`, and (new) `/vs/*` pages. Designed for verbatim LLM lift.
6. **~~`public/llms-full.zh.txt`~~** ✅ **SHIPPED 2026-08-24.** Full ZH mirror of `llms-full.txt` (204 lines): lead blockquote, "DODO Learning 是什么", LCS 教学系统 + The Loop, LCS 三大支柱, 9 levels + 5 combinations with pricing, named frameworks (MCT/Harvard PZ/Lexile/6+1), outcomes (300+ students, SSAT anchor case, 100L-150L per cycle), Navigator teams (both ELA + Little DODO educator distinctions), assessment cadence, payment, cities served (all 20 in ZH), 双语观, "DODO 与常见替代方案的差异" (all 5 comparison bullets including Kumon), §创始人 (Janet's full ZH bio with TOEFL/TCF/BComm/Concordia/2021 founding), 联系方式, 站点结构. Referenced from `llms.txt` §Optional as "Chinese-language reference." Uses ZH glossary per BRAND_CONTENT_GUIDE (LCS 教学系统, 都学启蒙, 蓝思, 6+1 traits as 思考/结构/声音/用词/流畅/规范/呈现).
7. **3 remaining `/vs/*` pages** — `/vs/private-tutor`, `/vs/outschool`, `/vs/eye-level` (Eye Level added 2026-08-24 after tracker showed it as the head-to-head in the Kumon-alternative query). Honest tradeoff tables, schema'd as standalone Articles.
8. **6 verification-search city pages** — `DODO Learning [City]` post-referral search targets, distinct from `/cities/[city]` (which target discovery). Pick 6 of the 20 cities in `areaServed`; user picks which. Now that DODO Coding is also linked, wire `parentOrganization` on those pages to strengthen the entity graph.
9. **Internal linking audit** — methodology ↔ lexile ↔ results cross-links; every page → /faq + /consult; every `/vs/*` → /methodology + /program.
10. **City pages for the remaining 14 compact cities** — already shipped (Open Decision #11 ✅). Verify they're all in `sitemap.xml` at compact-tier priority.
11. **One-shot programmatic launch**: 36 city × grade pages — **deferred / de-prioritized**. Council flagged thin-content risk; the tracker didn't surface any city-page evidence that this is the bottleneck. Revisit only if verification-search city pages (#8) prove out.
12. **Self-containment audit** on all 50 EN + 50 ZH FAQ answers (council requirement). Each must read in isolation.
13. **Populate `sameAs`** on `EducationalOrganization` and (new) `Person` schemas — Xiaohongshu, WeChat OA, LinkedIn (Janet), any others. Blocked on Open Decision #4 / #9.

### User's part

- **Complete the 2026-08 tracker** — capture ChatGPT / Claude / Gemini cells for all 8 prompts (24 remaining). Perplexity is done. Priority order in [2026-08.md](llm-citations/2026-08.md) §"Pending capture". Screenshots into `docs/llm-citations/2026-08/`.
- **Approve drafts** of `/vs/kumon` (first) then `/credentials`, then the remaining `/vs/*` pages.
- **Decide on Xiaohongshu / WeChat strategy and operator** (Open Decision #4) — 2026-08 tracker showed `huaren.us`-style community forums are LLM-visible, so this channel decision now has concrete Return-on-Effort evidence. Wukong ELA is the head-to-head competitor to benchmark against.
- **Provide Janet bio + credentials + `sameAs` URLs** — unblocks Tier-2 items #2 and #13 (currently the two highest-leverage items and both blocked on user input).
- **Provide per-page OG images** (or approve text-based fallbacks) for top 6 pages + each city.
- **Resolve remaining Open Decisions** below.

---

## Tier 3 — Ongoing

- Monthly LLM citation review (user) — same 8 prompts × 4 LLMs, log in `docs/llm-citations/`
- 1 pillar blog post every 2 weeks (NOT 1/week) — 2,000+ words, named author, full Article schema. **Currently 2 posts total in `content/en/blog/` — the cadence never started.** Two immediate candidates suggested by 2026-08 tracker: (a) "MCT Language Arts in a live 1-on-1 program — what actually changes for the student" (targets Prompt 6), (b) "What we mean by 'alternative to Kumon' — 8 things Kumon-style drilling doesn't build" (targets Prompt 8).
- Xiaohongshu content cadence (per operator decision — Open Decision #4)
- **Off-site mention building — split into two channel decisions after v3 pivot (2026-08-25):**
  - **EN off-site channel** (drives generic-premium literacy citation graph): homeschool blogs in the MCT orbit (freestylemom-tier, cathyduffyreviews, Well-Trained Mind community), education-directory listings, subreddits (r/homeschool, r/APstudents, r/IBO, r/parenting), IB/AP-prep newsletters, education-podcast guest appearances. Winning here compounds with `/credentials` + MCT pillar blog above.
  - **ZH off-site channel** (drives 华人 diaspora citation graph, tracks head-to-head against Wukong ELA + ivyGoal): huaren.us community threads (confirmed LLM-visible in the 2026-08 tracker), Xiaohongshu accounts, WeChat OA + guest posts on established 华人妈妈 blogs, WeChat parent groups.
  - Different operators likely needed for each channel. Claude Code can prep outreach templates per channel once picked.

---

## Open Decisions

These block downstream work. Updated 2026-05-17.

| # | Decision | Status |
|---|---|---|
| 1 | Verification vs Discovery — strategy | ✅ Hybrid (premium with quota per cohort; quality > volume) |
| 2 | Price point — locked? | ✅ **Restructured 2026-05-17 to 5 combinations:** Summit $2,830 · Core $2,250 · Flex 1 $1,185 · Flex 2 $2,110 · Flex 3 from $750. Weekly: Flex 1 $74 · Flex 2 $132 · Core $140 · Summit $177 · Flex 3 ~$47. Live on `/program` + `/faq`. |
| 3 | Founder/Navigator named-expert identity (Person schema) | ✅ **Janet** confirmed as Founder & Lead Navigator (2026-05-17). **Person schema + full bio + credentials SHIPPED 2026-08-24** — see Tier-2 Claude Code's part #2. |
| 4 | Xiaohongshu / WeChat operator + cadence | ❌ Pending |
| 5 | The 8 monthly-tracked prompts | ✅ **Locked 2026-05-21** in `docs/llm-citations/2026-05-baseline.md`. Eight prompts mix Vancouver/Toronto core markets + EN + ZH + framework-specific (MCT, Lexile) + comparison (Kumon). Per-prompt × per-LLM matrix shape documented in baseline. Re-test due 2026-06-21. |
| 6 | Off-site mention channel for Tier 3 | ❌ Pending — newsletters / podcast guesting / school-counselor outreach / education directories / Reddit |
| 7 | Bing Webmaster Tools registration | ❌ Pending — blocks IndexNow integration |
| 8 | Google Search Console verification + GA4 IDs | ❌ Pending |
| 9 | Social profile URLs for `sameAs` | ❌ Pending |
| 10 | Cities list approval (now **20 cities** in `areaServed`) | ✅ **Confirmed 2026-05-21.** Baseline 18 schema cities confirmed by user; Montreal + Denver added to schema for consistency with llms-full.txt service-area section + home-page result-card (Denver) + brand guide §11 primary city pool. If "18 only" was the literal intent, revert Montreal + Denver in `lib/schema.js`. |
| 11 | City pages — build or list-only? | ✅ **Option C selected 2026-05-21.** Compact template for 14 additional cities (Burnaby · Coquitlam · Calgary · Richmond Hill · Mississauga · Montreal · San Jose · Cupertino · Irvine · Bellevue · New York · Boston · Houston · Denver) added to `content/cities.js`. Same data shape as the 6 rich pages, shorter h1/subheading/context. Auto-rendered by existing `page.jsx`. `citiesProofStats` also updated to new Lexile canon (D8). 20 city pages total now indexable. `public/llms.txt` published-city list updated to reflect rich vs compact. |
| 12 | YouTube video IDs for `/demos` | ❌ Pending — placeholders in `content/marketing.{en,zh}.js` `YOUTUBE_IDS` const |
| 13 | Home page copy migration — extract `HOMEPAGE_COPY` from `app/[locale]/page.tsx` into `content/marketing.{en,zh}.js` `home` exports, matching the 10-page pattern | ✅ Done 2026-05-21. `home` export added to both marketing files. `page.tsx` now imports `homeEn` / `homeZh`. Audit script now covers home (100 strings × 2 locales, 0 hits). |
| 14 | ZH 6+1 trait list cascade — glossary canon updated 2026-05-21 to `思考、结构、声音、用词、流畅、规范、呈现`. Old canon still in `content/marketing.zh.js` (lines 414/514/554) + `content/faq.js` (lines 246/252) + `translation/DEEPSEEK_BRIEF.md:37`. Cascade pending. | ✅ Done 2026-05-21. Cascaded across all 5 files + `app/[locale]/program/page.jsx` TRAITS array (F2). Audit clean. |
| 15 | **Home hero consultHook not visible on live site (reported 2026-05-21)** — JSX at `app/[locale]/page.tsx:109` renders the paragraph unconditionally; styled lavender (`#5856cc`) on the light hero backdrop with `maxWidth: 42rem`. Hero section is `relative overflow-hidden` with `minHeight: calc(100dvh - var(--nav-height))` and flex-centered content, so on compact viewports total content (eyebrow + H1 + consultHook + CTAs + trustLine) may exceed the hero box and get clipped. Most likely cause: live site was stale at report time. Verify after `24dc688` deploys. If still missing: (1) hard-refresh and confirm via DOM inspector; (2) if `<p>` exists but invisible → contrast issue, darken color; (3) if clipped on mobile → remove `overflow-hidden` or reduce `minHeight`. | ❌ Pending — verify post-deploy of `24dc688` |
| 16 | **Audience pivot to global positioning (2026-05-21)** — Brand guide §04 broadened from "Chinese immigrant parents in NA" → "globally-mobile families". | ✅ Done 2026-05-21. Applied to `/program`, `/about` (meta + hero), `/home` PhotoIntro body0, `/compare` (meta + s1 sub), `public/llms.txt` + `llms-full.txt` (lead blockquote + service-area description). FAQ city-coverage answers kept as-is (factual, not positioning). Bilingual-depth ZH/EN cognitive references in llms-full.txt also kept (language references, not audience positioning). |
| 17 | **§5 combinations pricing hidden on /program (2026-05-21)** — Q7 review: prices removed from card view via JSX conditional `{item.price && false && (...)}`. Data preserved in `marketing.{en,zh}.js`. Future re-enable: delete the `&& false`. Pricing facts (Summit $2,830 · Core $2,250 · Flex 1 $1,185 · Flex 2 $2,110 · Flex 3 from $750) remain in `faq.js` `#enrollment` section. Verify FAQ pricing is current. | ❌ Verify FAQ pricing |
| 18 | **§2 Type A/B caption removed from /program; needs to live on /methodology** — Q6 review: caption explaining Type A (Literacy Session) and Type B (Writing Session) cleared from /program (`loop.typeAB: ''`). When working on /methodology page, verify Type A/B content is present in `methodology` export of `marketing.{en,zh}.js`; if not, port the Type A/B caption there. **Log-only — do not apply until /methodology page review.** | ⏸ Deferred — apply during /methodology review |
| 19 | **Pre-footer band redundancy (2026-06-02, v6.0 follow-up)** — even after the v6.0 dedupe (D28), the global `PreCtaBand` sat directly under a page's own closing CTA on content pages → two CTAs in a row. | ✅ **Resolved 2026-06-02 — Option A (band as fallback).** `PreCtaBand` now SUPPRESSES on every page that owns an in-body close (about, program, methodology, lexile, results, navigators, compare, demos, consult, blog, cities, audiobooks, privacy, terms) and shows a **soft** band (Watch primary + Consult ghost) only on pages without one (home, /faq, /partners, /assessment). `footer.preCta` reframed soft; `footer.preCtaWatch` removed. See D33. |
| 20 | **Little DODO — K–2 ELA sub-program (2026-06-02)** — new program briefed (D32). Shares operations (tuition, environment, frequency, Navigators); differs on marketing emphasis + audience (K–2 pre-elementary, high-frequency low-pressure reading + comprehension). Page build deferred (Task 3) — must **strictly follow `.interface-design/system.md`** with K–2-appropriate warmth. Positioning + page plan in `docs/little-dodo-plan.md`. **Sub-decisions:** (a) route ✅ **`/little-dodo`** (top-level); (b) nav ✅ **Option I — flat nav unchanged, `/program` becomes family hub with age-band chooser + footer link**; (c) ZH name ✅ **都学启蒙** (EN: Little DODO; lint via dodo-content-writer; no 启蒙-redundant descriptor); (d) age label ✅ **EN "Ages 5–8" / ZH "5–8 岁"** (幼小衔接 as supporting ZH framing). | ✅ **SHIPPED 2026-06-02.** Page at `app/[locale]/little-dodo/`; `littleDodo` + `ageBands` exports (EN+ZH); shared `AgeBandChooser` on /program + /little-dodo; footer Program-column link; `/little-dodo` added to PreCtaBand SUPPRESS; sitemap + llms.txt + `littleDodoCourseSchema`. Anti-dictionary clean, `next build` clean. |

---

## Operating Rules

- This workflow doc is the single source of truth. Update statuses after each session.
- All technical changes ship in `main` and auto-deploy to Cloudflare Pages (`output: 'export'`).
- Voice: never imply tutoring / ESL / remediation (per `translation/DEEPSEEK_BRIEF.md`).
- LLM citation tracker entries go in `docs/llm-citations/YYYY-MM.md` with screenshots.

---

## Reference Docs

- Council session output: in the conversation transcript that produced this plan (2026-05-11)
- Baseline survey (raw): `F:\PC-Documents\DODO_web\GEO Survey Result.txt` (outside the repo, user-side workspace)
- Baseline summary: `docs/llm-citations/2026-05-baseline.md`
- Translation/voice brief: `translation/DEEPSEEK_BRIEF.md`
- Dormant middleware (when moving to server runtime): `docs/proxy.example.js`

---

## Session Log

### 2026-08-26 — Ship: /credentials + MCT pillar blog post (Tier-2 #2 + #3)

**Context:** Directly downstream of the 2026-08-25 two-channel pivot. `/credentials` and the MCT pillar blog post were the two "no user input needed" Tier-2 items called out as next-session candidates. Also landed in this session: reconciliation with the D36–D42 brand-guide refresh that shipped from the parallel session earlier today (commit `352cc53`) — the D37 five-strands-under-LCS and D38 research-base citations were both natural inputs into what shipped here.

**Did (SHIPPED 2026-08-26):**
- **`/credentials` bilingual reference page** — new route at `app/[locale]/credentials/page.jsx` (EN + ZH). Four named-framework blocks (MCT / Harvard Project Zero / Lexile / 6+1 Trait) with full attribution + how DODO uses each; §Research Base with 5 permitted claims + 6 academic citations (Gallagher 2017, Goodwin & Ahn 2010/2013, Bowers/Kirby/Deacon 2010, Henry 1997, VanTassel-Baska 2003); D38 hard rule enforced (acceleration into mastery, never remediation). Content lives in new `credentials` export of `content/marketing.{en,zh}.js`.
- **`credentialsSchema()` in `lib/schema.js`** — CollectionPage with 4 `EducationalOccupationalCredential` nodes (one per framework, each with `recognizedBy` pointing to the actual publisher/institution) + 5 `citation` nodes as `ScholarlyArticle`s with authors/year/journal/effect-size notes. Injected on `/credentials`. Closes D38 schema cascade item.
- **MCT pillar blog post** — `content/en/blog/mct-language-arts-in-a-live-one-on-one-program.mdx`, ~1500 words, authored by Janet as "Founder & Lead Navigator". Category: Methodology. Full research citations at the bottom + link to `/credentials` for canonical attribution. Written per D40 audience framing (no international-headline hook) and D41 canonical positioning (English mastery + measured growth + Speaking-as-live-differentiator).
- **`public/llms-full.txt`** — new §Research Base section with the 5 permitted claims + 6 citations. Closes D38 llms-full cascade item.
- **`public/llms.txt` Core pages** — added `/credentials` entry.
- **`app/sitemap.js`** — `/credentials` at priority 0.7 (matches `/navigators` and `/blog`).
- **`components/layout/PreCtaBand.jsx`** — `/credentials` added to `SUPPRESS` list per D33 (page owns its own close CTA).
- **`docs/pending-guide-cascade.md`** — D38 llms-full.txt + schema items marked done; new note added that `/credentials` is now the canonical attribution surface.

**Verified:** `npx next build` clean; both `/en/credentials` and `/zh/credentials` prerendered; MCT blog post at `/en/blog/mct-language-arts-in-a-live-one-on-one-program` prerendered.

**Did NOT do (deferred to a later apply gate):**
- `/methodology` "Why this works" block (D38 pending cascade item).
- Home hero tagline update to "Think once, in two languages." (D36 pending cascade item).
- `/about` ClosingStamp tagline (D36).
- `/faq` new evidence question (D38).
- `/compare` new competitor rows for gifted-ELA-books + free-AI-tutors (D41).
- `/program` + home + `/about` audience reframe to drop "globally-mobile" headline (D40 pending cascade item on the site body — llms.txt already done 2026-08-25).
- ZH translation of the MCT blog post — EN first, ZH cascade when we have a ZH-native translator pass.
- September v3 capture pass — deferred; needs its own session and won't reflect impact of the ships above until LLMs recrawl.

**For next session, start by:** Either (a) run the September v3 capture pass now that /credentials and the MCT blog post are seeding new citation surface, or (b) ship the remaining D40/D41 site-copy cascade if that has broader-priority effect on visitors landing today. The GEO investment made in /credentials + MCT blog is durable — the recrawl-and-index cycle for LLMs is weeks to months, so measurement of impact should be run at 2026-09-15+ rather than immediately.

---

### 2026-08-25 (evening) — Strategy pivot: two-channel GEO + v3 prompts + llms-full.txt rebalance

**Trigger:** manual review of the v2 conversational prompt set surfaced that DODO-adjacent demographic hooks ("we're a Chinese-speaking family") were routing 3/4 LLMs' answers into the newcomer-settlement bucket (SUCCESS, LINC, MOSAIC, TDSB ESL) — the wrong category for DODO. Reframed as a two-channel GEO strategy.

**The pivot:** from one-lens ("win the Chinese-diaspora buyer") to two-lens:
1. **Generic-premium EN channel** — DODO competes as a premium literacy program in the general premium-K12 citation graph (competitors: MCT publisher, Outschool, Preply, Great Books, IEW, Writing Revolution, Critical Thinking Co., Kumon/Oxford/Sylvan). Chinese-diaspora is not a filter here.
2. **ZH-native diaspora channel** — DODO competes for the 华人 audience through ZH-side citation graph, where the diaspora signal is preserved by the language itself (competitors: Wukong ELA, ivyGoal, Excellent Institute, huaren.us programs).

**Did (shipped 2026-08-25 evening):**
- **v3 prompt set** — 18 concepts (13 A/B + 5 LD) shipped in this doc §"Tracked prompt set" above. Removes explicit Chinese-diaspora hooks from EN prompts (A1, A3, B12), parameterizes A1 city query (Vancouver + Toronto + rotating US city), broadens A8 to Kumon + Oxford Learning + Sylvan, reworded B9 (writing improvement broader than analytical), reworded A7 (reading-comprehension-primary with Lexile peripheral), added Tier LD (5 Little DODO K–2 prompts).
- **llms.txt + llms-full.txt (EN) rebalanced** — lead now: *"Live one-on-one English language arts for capable K-12 students. Built on the MCT gifted-ELA tradition; Lexile-measured reading; 6+1 Trait writing."* Chinese-diaspora concentration moved to a service-area fact later in the doc with explicit framing: *"the program is not built around that demographic; it is built around capable K-12 students seeking English mastery at the cognitive level, and Chinese-diaspora families have found DODO through word-of-mouth referral in that community."*
- **llms-full.zh.txt kept diaspora-primary** — bilingual asymmetry per pivot: EN broader (capability-first), ZH sharper (diaspora-first). Preserves the ZH-channel positioning where it's load-bearing.
- **Tier-2 re-rank** — `/credentials` + MCT-anchored pillar blog post promoted to co-#2 with Person schema. `/vs/*` expanded to Kumon + Oxford Learning + Sylvan (composite or three individual pages).
- **Off-site mention channel decision split into two** — EN and ZH channels documented separately in Tier 3 above.

**Strategic implications documented (not yet shipped as code):**
- **Two competitor sets to track, not one.** Each with its own off-site mention graph, each with its own content strategy.
- **MCT authority becomes DODO's #1 EN-side lever.** Without demographic hook, MCT is the cleanest curriculum-anchored differentiator. Cascades to A6, A8, B11.
- **Little DODO K–2 is its own segment now.** Different competitors (All About Reading, Logic of English, Barton), different mention channels (early-literacy parenting blogs).
- **Founder authority weight increases.** Now that credibility can't lean on "we're for your community," Person schema + `sameAs` + `author` on blog posts do more work.
- **Success metrics revised.** Old: "DODO cited in Chinese-diaspora queries." New: three targets — (EN) *"DODO cited in premium literacy queries generally"* on A1-A3/A5-A8/B9-B14; (ZH) *"DODO cited in 华人 diaspora queries"* on A4 + ZH mirrors; (K-2) *"Little DODO cited in early-reading queries"* on LD1-LD5.

**Business-side risk flagged:** softening the Chinese-diaspora hook on the EN site itself (`/about`, `/program`, `/methodology`) could weaken new-visitor self-identification for referred families. Not shipped in this pass — llms-full.txt is LLM-facing only; site copy stays as-is until a separate decision. Referral flow happens off-page so probably unaffected, but flagged.

**Did NOT do (intentionally):**
- Site-copy rebalance (`/about`, `/program`, `/methodology` EN hero sections) — deferred pending user decision. LLM-facing surfaces rebalanced; visible copy stays diaspora-forward.
- Ship any of the newly-promoted Tier-2 items (`/credentials`, `/vs/kumon`, MCT blog post) — next-session candidates.
- Run v3 captures — September pass will be the first v3 measurement.

**For next session, start by:** shipping Tier-2 co-#2 (`/credentials` + MCT pillar blog post) since it doesn't require any user input and directly targets the confirmed cross-LLM MCT-query miss. Then run the September capture pass on v3 prompts using the incognito capture rules.

---

### 2026-08-24 (afternoon) — Ship: Founder Person schema + ZH llms-full + expanded tracker

**Did (following user "ship" on the bio proposal + expanded prompt set):**
- **Tier-2 #2 SHIPPED:** `personSchema()` in `lib/schema.js` with full credentials (BComm Concordia 2019, TOEFL, TCF), alumniOf, worksFor + founder bidirectional link. `educationOrgSchema()` now cites `founder: #founder` + `foundingDate: '2021'`. Schema injected on `/about` (both locales). `founder` export added to `content/marketing.{en,zh}.js` (short ~120-word + long ~250-word bios, EN + ZH). Bilingual founder blocks added to `public/llms.txt` + `public/llms-full.txt`.
- **Tier-2 #6 SHIPPED:** `public/llms-full.zh.txt` — full 204-line ZH mirror of `llms-full.txt`. Referenced from `llms.txt` §Optional. Closes the "Wukong owns the ZH answer" ingest-side gap.
- **D35 name rule:** stripped "Janet Sui" from every file in the repo (live + archive) — 13 files touched. Legal signatory in `AgreementTool.jsx` now signs as "Janet." Rule documented as D35 in `docs/content-style-decisions.md`, cascaded through `translation/BRAND_CONTENT_GUIDE.md`, `translation/DEEPSEEK_BRIEF.md`, `translation/dodo-glossary.json`. Persisted to Claude Code memory as a feedback rule so future sessions enforce it without re-statement.
- **Tracker expanded to 14 concepts × EN/ZH = 28 monthly prompts.** Tier B (help-intent: writing improvement, IB/AP, SSAT/ISEE, classical-vocabulary, bilingual→academic-writing) added alongside the original Tier A (buyer-intent). Full matrix in this doc §"Tracked prompt set."
- **2026-08 tracker captures (partial, [`llm-citations/2026-08.md`](llm-citations/2026-08.md)):** Perplexity Tier A EN = 0/8. ChatGPT Temporary Chat: A1-en **DODO ranked #1** with accurate lifted positioning language; A6-en (MCT) N; A8-en (Kumon) N; B10-en (IB prep) N. **Composite so far 1/12 cells.** Methodology finding: ChatGPT on Peter's non-Temporary account explicitly recognized his founder context and personalized results — all future captures from Peter's account must be Temporary Chat mode.

**Verified:** `npx next build` clean; `node --check` clean on `marketing.{en,zh}.js` + `lib/schema.js`.

**Did NOT do (intentionally):**
- Visible bio section on `/about` — schema shipped, visible UI is a follow-up (needs JSX + section design). Schema is the GEO-load-bearing bit; visible copy can render from `founder.short` / `founder.long` when the section is designed.
- `janet-portrait.jpg` asset — schema `image` field commented out until an image exists in `/public/`.
- `sameAs` array on `personSchema` — still blocked on Open Decision #4/#9.
- Tier-2 #3 `/vs/kumon`, #4 AEO snippets, #5 `/credentials` page — next candidates.
- Claude / Gemini tracker captures — user runs in own Temporary/incognito sessions per priority order in `2026-08.md` §"Pending capture."

**For next session, start by:** either (a) capturing the remaining 100 tracker cells, or (b) shipping Tier-2 #3 `/vs/kumon` (no user input needed and directly targets the query the 2026-08 tracker showed as the most on-nose miss across two LLMs).

---

### 2026-08-24 — Resume: 2026-08 tracker capture + Tier-2 re-rank

**Context:** Workstream had been dormant since 2026-05-28. Product work (Program Family Parallel, Little DODO cohesion, DODO Coding source-doc revisions, Cal.com → custom consult form) continued through August. The 2026-06-21 tracker re-test never happened; nor did July.

**Did:**
- Ran Perplexity for all 8 tracked prompts (unauth session). **DODO 0 / 8.** Logged as [`docs/llm-citations/2026-08.md`](llm-citations/2026-08.md).
- Scaffolded ChatGPT / Claude / Gemini cells in the same doc — those need the user's logged-in sessions.
- Extracted 3 new strategic inputs from the capture:
  1. Perplexity's discovery-query citation set has shifted to public/institutional (TPL, MOSAIC BC, Achieve3000). Private-listicle path is closing.
  2. Wukong ELA is the head-to-head ZH competitor. `huaren.us` community forums are LLM-visible.
  3. Framework-specific queries (MCT, Lexile) and comparison queries (Kumon) are the winnable surfaces — DODO's authored content already matches intent there but isn't in the citation graph.
- Re-ranked Tier-2 items around those findings (this doc §"Claude Code's part"):
  - **Promoted** `/vs/kumon` to #3 and AEO snippets to #4.
  - **Added** #6 `public/llms-full.zh.txt` — full ZH mirror of `llms-full.txt`. Today's `llms-full.txt` is EN-only by design; adding the ZH ingest surface closes the "Wukong owns the Chinese answer" gap on the schema/ingest side. The site body is already fully translated so this is consolidation, not authoring from scratch.
  - **Added** `/vs/eye-level` to the vs-page set (surfaced by Prompt 8).
  - **De-prioritized** the 36-page programmatic city × grade launch — no tracker evidence it's the bottleneck.
- Reset the Goal date from 2026-09-01 (already past) to 2026-12-01 (4/32 cells by then; 1/32 interim by 2026-10-01).
- Restated Status header: Tier 2 is 0-of-10 shipped; Tier 3 channel undecided; workstream resumed today.

**Did NOT do (intentionally — user's part):**
- Capture ChatGPT / Claude / Gemini cells (need logged-in sessions).
- Ship any Tier-2 code changes — priorities re-ranked, then paused for user go-ahead. Two of the top four items (#2 Janet Person schema, #13 sameAs) are still blocked on user-provided bio/URLs.
- Pick an off-site mention channel (Open Decision #6 / #4 still pending).

**For next session, start by:** completing the 2026-08 tracker cells for ChatGPT/Claude/Gemini so we have a full 32-cell baseline for August, OR — if the user's ready — shipping Tier-2 #3 (`/vs/kumon`) since it doesn't require any pending user input and directly targets a query the tracker showed as winnable.

---

### 2026-05-11 — Initial setup + Tier 1 ship

**Did:**
- Cloned `DL_NEXTJS_NEW` to local dev. Set up Node/npm; verified `npm run dev` boots.
- Cleanup commit `d89fb77`: moved `proxy.js` → `docs/proxy.example.js` to silence Next.js 16 middleware warning; removed unused `app/globals.css`; mirrored Vercel `/en/the-hangar/` + `/zh/the-hangar/` 301s; corrected stale `middleware.js` doc references to `proxy.js`; dropped stale `./pages/**/*` from tailwind config; adopted Next.js 16 auto-applied tsconfig changes.
- Audited SEO + GEO state. Validated against an LLM Council session.
- Ran citation baseline review (user's `GEO Survey Result.txt` — DODO 0/6+ queries).
- **Tier 1 ship commit** (this one): FAQ schema wired with 50 EN + 50 ZH; WebSite schema; articleSchema locale fix; llms.txt + llms-full.txt; expanded `areaServed` to 18 cities; pricing copy updated for new tiers ($2,250 / $1,185 / weekly from $74); 9 ZH typos fixed.

**Did NOT do (intentionally — Tier 2 work):**
- Founder Person schema (pending user decision on named expert).
- Refactor `content/faq-*.js` duplication with `FAQClient.jsx` (deferred to Tier 2 to ship Tier 1 faster; sync risk noted).
- Verification-search city pages, comparison pages, AEO snippets, credentials page, programmatic city × grade launch.
- Bing Webmaster / GSC / GA4 setup (requires user account access).
- IndexNow API key file (requires Bing key from user).
- `sameAs` social profile URLs (pending user input).

**For next session, start by checking:** Open Decisions table above. Resolve at least #3 (founder identity) before starting Tier 2 work item 2 (Person schema).

---

### 2026-05-17 — Architecture consolidation + content rewrite + bilingual DeepSeek round-trip

**Did:**

**Brand:**
- Authored `translation/BRAND_CONTENT_GUIDE.md` v4.0 → v4.1 (distilled v3.1 .docx to 390-line operator copy). Exported `.docx` via docx-js. Built `.claude/skills/dodo-content-writer/` (project-local skill, triggers on DODO content edits).

**Architecture (Pass A + B + C):**
- Pass A — migrated 9 marketing pages from inline COPY / `getContent()` to consolidated `content/marketing.{en,zh}.js` (one named export per page). 18 per-page content files deleted; 9 page.jsx files updated; `videos.js` (YOUTUBE_IDS) inlined into marketing files.
- Pass B — FAQ duplication resolved (Tier 2 task #1 from this doc). `content/faq-en.js` + `content/faq-zh.js` + JSX-rich `FAQClient.jsx` data consolidated into `content/faq.js` with markdown-lite syntax (`[text](/path)`, `**bold**`). FAQClient becomes a thin renderer (614 → 320 lines).
- Pass C — cities to `content/cities.js` (6 cities bilingual nested); deleted `content/en.js` + `content/zh.js`; removed `getContent` + `CONTENT_MODULES` from `lib/i18n.js` (152 → 71 lines).

**Content rewrite (per brand v4.1):**
- `/methodology`, `/about`, `/program` (Pass 1 voice), `/consult`, `/compare`, `/results`, `/lexile`, `/navigators`, all 6 `/cities`, `/faq` (50 Q&As + pricing matrix), `/program` Pass 2 (LCS + 5 Combinations sections).
- Stripped 8 `Hangar` references from `content/*` + `lib/schema.js` (anti-dict).
- Replaced "bilingual thinking program" framing in 6 infra files (`lib/schema.js`, `lib/metadata.js`, `app/layout.jsx`, `app/[locale]/assessment/page.jsx`) → "English literacy program".
- Renamed Sarah → Ms. Jennifer (`/program`), Ms. Willow (`/consult`), Ms. Sarah (`/demos`).
- Founder = Janet on `/compare` s5 (resolves Open Decision #3).
- Added SSAT anchor case study to `/results` (92nd/95th percentile, age-10-to-13 long-arc proof).
- `/about` gained 4th brand-truth belief (Truth 3 — measurable progress) + new By-the-Numbers stats strip (10k hours · 300+ students · 90%+ referral · top-50 unis).

**GEO surfaces:**
- `public/llms.txt` + `public/llms-full.txt` — full rewrite. Names MCT + Harvard Project Zero + Lexile + 6+1 + LCS + 5 combinations + pricing + Navigator credentials + anchor case study. EN-only by design.

**Translation handoff:**
- Updated `translation/DEEPSEEK_BRIEF.md` to v1.1 (consolidated-architecture workflow). Updated `translation/dodo-glossary.json` (+ 26 new owned terms: LCS, 5 combinations, MCT components, Janet, Ms. names, SSAT, top-50 universities). Staged `translation/deepseek-handoff-2026-05-17/` folder with brief + glossary + 3 source files + README.
- DeepSeek round-trip executed by user: `marketing.zh.js`, `faq.js` ZH, `cities.js` ZH all merged. Validated structure parity per file. Forbidden-word screen passed. Spot-checked rendered HTML across `/zh/*` pages.

**Backlog cleared (2026-05-17 end-of-session):**
- /demos Navigator name → Ms. Sarah.
- label/labelZh swap on ZH-side (program loop steps + demos video cards) — ZH visitors now see Chinese as primary label.
- Organisation → Organization site-wide (6 files, 10 occurrences). Code keys `id: 'organisation'` preserved.
- /about by-the-numbers stats strip section added (data + JSX + bilingual).
- This workflow.md updated; `SUCCESSOR_HANDOFF.md` authored (next entry in docs/).

**Did NOT do (intentionally):**
- Founder Person schema in JSON-LD (still requires bio + credentials data; not just name).
- Sample Navigator bios on `/navigators` (still flagged "pending" per brand v4.1 §12).
- Bing Webmaster / GSC / GA4 setup (user account access required).
- IndexNow API key file (requires Bing key).
- `sameAs` social profile URLs (pending user input).
- Tier 3 off-site mention work (pending channel decision).
- City-page expansion for new `areaServed` cities (Calgary, Montreal, etc. — pending decision #11).
- YouTube video IDs in `YOUTUBE_IDS` const (placeholders remain).

**For next session, start by:** reading `docs/SUCCESSOR_HANDOFF.md` (entry-point doc; describes architecture, files, what's pending). Then `docs/workflow.md` Open Decisions for blockers.

---

### 2026-05-20 → 2026-05-21 — Home + /program granular review, LCS-forward methodology, global positioning, ops handoff refresh

Captured in detail in `docs/SUCCESSOR_HANDOFF.md` "Recent decisions log" section. Highlights, with workflow.md Open Decisions resolved:

- **#13 ✅** `HOMEPAGE_COPY` migrated out of `app/[locale]/page.tsx` into `content/marketing.{en,zh}.js` `home` exports. Now 10 marketing pages.
- **#14 ✅** ZH 6+1 trait canon cascade: `思考、结构、声音、用词、流畅、规范、呈现`.
- **#16 ✅** Audience pivoted to globally-mobile families on positioning surfaces (brand guide §04 broadened).
- **#17 (partial)** /program §5 combinations pricing hidden via JSX conditional; data preserved. /faq is now the only public pricing surface — verification still pending.
- **#18 ⏸** Type A/B caption removed from /program, deferred to /methodology review.
- **#5 ✅** 8 monthly-tracked LLM citation prompts locked (see `docs/llm-citations/2026-05-baseline.md`).
- **#10/11 ✅** Cities resolved to 20 (6 rich + 14 compact via Option C template).

New artifacts:
- `docs/content-style-decisions.md` — date-stamped active style-decisions log (D1–D9 captured).
- `content-review/` — page-by-page review pattern (home + /program complete; /about dump staged in `03-about-content-dump.md`).
- `scripts/content-audit.mjs` — EN/ZH parity + anti-dictionary scan.

**For next session, start by:** reading `docs/SUCCESSOR_HANDOFF.md` "Recent decisions log" + this entry. Then Open Decisions table above for what's still blocked.

---

### 2026-05-28 — Schema + sitemap cascade fix (catches the 2026-05-21 misses)

**Did:**
- `app/sitemap.js` — `CITY_SLUGS` (6) split into `RICH_CITY_SLUGS` (6, priority 0.8) + `COMPACT_CITY_SLUGS` (14, priority 0.6). All 20 published city pages now surface in `/sitemap.xml` with hreflang alternates. Closes the cascade-miss from commit `01ad4dc` which updated `lib/schema.js` `areaServed`, `content/cities.js`, and `public/llms.txt` but left sitemap on the old 6-city list.
- `lib/schema.js` `websiteSchema.description` + `educationOrgSchema.description` — broadened "Chinese-speaking families in Canada and the United States" → "globally mobile families" (D10 audience pivot, 2026-05-21). Both now reference the LCS System (architecture) + The Loop (per-session phrase) per D1.
- `lib/schema.js` `courseSchema` — `name` changed from "The 16-Week Bilingual Thinking Program" to "The DODO 16-Week Program" (drops retired `Bilingual Thinker` vocab). Description rewritten LCS-forward with 50-minute session canon (D11), MCT writing arc named (D2), Harvard PZ Visible Thinking referenced, Lexile gain framed as "one grade level across two 16-week cycles" (D8). Audience broadened to globally mobile families (D10).
- `lib/schema.js` `courseSchema.offers` — `Charter Enrollment` (anti-dict) → `Founding Family Program` (per brand guide §11 positioning convention). URL fixed from non-existent `/enroll` to `/consult` (the actual entry surface). `LimitedAvailability` → `InStock` (drops scarcity framing per brand guide rule "positioning signal, never discount/limited-time").

**Did NOT do:** `lib/metadata.js` `buildCityMetadata` description still says "Chinese-speaking families in {name}" — kept as-is per D10 (Chinese-diaspora references preserved where authentically operational). Re-evaluate if /cities page review surfaces a different stance.

**Verification:** `node scripts/content-audit.mjs` clean (0 parity gaps; 19 baseline strategic-ESL hits unchanged). `node --check` clean on both files.

**For next session, start by:** /about page review — content dump staged in `content-review/03-about-content-dump.md` (untracked, F1–F7 concerns logged at top).

---

### 2026-05-24 — Next.js bump · TS enforcement · docs cleanup

**Did:**
- Bumped `next` ^16.1.6 → ^16.2.6 (clears ~20 Aikido CVE findings; none reachable in static-export topology, but quiets the scanner and future-proofs against config drift).
- Annotated implicit-any props in `app/[locale]/page.tsx` (16 errors → 0); dropped `typescript.ignoreBuildErrors: true` from `next.config.js`. `npm run build` clean.
- Doc sweep: replaced boilerplate `README.md` with a real DODO-aware version; archived `translation/deepseek-handoff-2026-05-17/` → `translation/archive/deepseek-2026-05-17/` (frozen snapshot, drifted from canonical); patched stale FAQ-tech-debt callouts in this file; refreshed status lines on `content-review/01-*.md` + `02-program.md`.

**Did NOT do:** Aikido findings against `lib/blog.js` + `lib/audiobooks.js` path joins and `dangerouslySetInnerHTML` were evaluated as not applicable (build-time slugs from filesystem enumeration; HTML from repo-controlled markdown) — recommend marking as suppressed in Aikido with rationale.

**For next session, start by:** if Aikido is still noisy, sweep the remaining 30 "subissue" code-finding flags with one-line suppressions citing static-export topology.
