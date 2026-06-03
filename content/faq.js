// content/faq.js
//
// Single source of truth for /faq — consolidates the legacy split between
// content/faq-en.js + content/faq-zh.js (plain-text canonical for schema/LLMs)
// and components/faq/FAQClient.jsx (JSX-rich UI version with inline links).
//
// Answer strings use markdown-lite syntax:
//   [link text](/path)   — relative path, FAQClient prefixes the active locale at render
//   **bold text**         — rendered as <strong>
//
// FAQClient.jsx parses this with a tiny renderer. app/[locale]/faq/page.jsx
// strips the same syntax to produce plain text for the JSON-LD FAQPage schema.
//
// Translation workflow (per translation/BRAND_CONTENT_GUIDE.md §13):
//   Hand `faq.sections.en` to DeepSeek with the brief + glossary, paste the
//   returned same-shape array into `faq.sections.zh`. Same for ui + categories.
//
// ZH translation: DeepSeek run 2026-05-17. Post-merge: "补习老师" → "家教" for
// consistency with /compare ZH testimonials + cleaner anti-dict alignment.
//
// All answers must read in isolation (GEO requirement — each Q&A must be
// self-contained, no implicit dependency on surrounding answers).

export const faq = {

  // ─── UI labels ──────────────────────────────────────────────
  ui: {
    en: {
      eyebrow:      'Frequently Asked Questions',
      h1:           'Every question parents ask before enrolling — answered completely.',
      subhead:      'Use the search below or jump to a category. Every answer is complete — nothing requires a follow-up call.',
      placeholder:  'Search questions...',
      searchCount:  (n, q) => `${n} result${n !== 1 ? 's' : ''} for “${q}”`,
      noResults:    (q) => `No results for “${q}” — try a shorter term or browse categories below.`,
      stillEyebrow: 'Still Here?',
      stillH2:      'Your question isn’t here.',
      stillSub:     'Book a diagnostic call. We will answer it in the first five minutes — then spend the rest of the time on your child.',
      ctaButton:    'Book a Diagnostic Call',
      emailLink:    'Or email us directly',
      closingH2:    'You have the answers. Now get the assessment.',
      closingSub:   'The entrance assessment is the beginning. It tells us exactly where your child is — and what the first 16 weeks should look like for them.',
      closingMicro: 'The entrance assessment is included in every enrollment. The first number costs nothing.',
    },
    zh: {
      eyebrow:      '常见问题',
      h1:           '入学前家长最关心的每一个问题——完整解答。',
      subhead:      '使用下方搜索或跳转至分类。每个答案均完整独立，无需额外咨询。',
      placeholder:  '搜索问题…',
      searchCount:  (n, q) => `“${q}” 的搜索结果：${n} 条`,
      noResults:    (q) => `未找到“${q}”相关结果——请尝试简短关键词，或浏览以下分类。`,
      stillEyebrow: '还有疑问？',
      stillH2:      '没有找到您想要的答案？',
      stillSub:     '预约诊断咨询。我们会在前五分钟内解答您的问题——然后把剩余时间专注于您的孩子。',
      ctaButton:    '预约诊断咨询',
      emailLink:    '或直接发送邮件',
      closingH2:    '您已了解所有信息。现在，让我们开始评估。',
      closingSub:   '入学评估是一切的起点。它告诉我们您的孩子目前的能力水平——以及最初16周应如何为他们量身规划。',
      closingMicro: '入学评估包含在所有报名套餐中，首次测评完全免费。',
    },
  },

  // ─── Category labels (anchor IDs must match section ids) ────
  categories: {
    en: [
      { label: 'The Program',   anchor: 'program'    },
      { label: 'The Loop',      anchor: 'the-loop'   },
      { label: 'Navigators',    anchor: 'navigators' },
      { label: 'Results',       anchor: 'results'    },
      { label: 'Enrollment',    anchor: 'enrollment' },
      { label: 'Bilingual',     anchor: 'bilingual'  },
      { label: 'Cities',        anchor: 'cities'     },
    ],
    zh: [
      { label: '课程介绍',        anchor: 'program'    },
      { label: 'The Loop 教学系统', anchor: 'the-loop'   },
      { label: '导师团队',        anchor: 'navigators' },
      { label: '学习成果',        anchor: 'results'    },
      { label: '报名与费用',      anchor: 'enrollment' },
      { label: '双语发展',        anchor: 'bilingual'  },
      { label: '城市与安排',      anchor: 'cities'     },
    ],
  },

  // ─── Q&A sections ───────────────────────────────────────────
  sections: {
    en: [
      {
        id: 'program', label: 'The Program',
        heading: 'What the 16 weeks actually involves.',
        variant: 'light', bg: '#F5F5FF',
        items: [
          { question: 'What exactly happens in the 16-week program?', answer: 'The program runs through The Loop — Read → Think → Speak → Write — across 16 structured weeks. Each session involves live instruction with a Navigator, structured practice between sessions, and progress tracking using Lexile and 6+1 Trait frameworks. Your child moves through grade-level content, not simplified material.' },
          { question: 'How many sessions are there and how long is each one?', answer: 'Two enrollment options, both running for 16 weeks. The Full Program includes three live sessions each week with your child’s Navigator — two 25-minute literacy sessions plus one 50-minute writing session. The Literacy Foundation includes two 25-minute literacy sessions each week. Sessions run on a fixed weekly schedule determined by cohort start date.' },
          { question: 'What grade levels does DODO serve?', answer: 'Grades 3 through 8. The program is designed for students reading between Lexile 400L and 1000L — the critical range where bilingual thinking either consolidates or fragments.' },
          { question: 'Is this a group program or one-on-one?', answer: 'One-on-one. Every child works with a dedicated Navigator for the full 16 weeks. Live sessions are always 1:1.' },
          { question: 'What happens if my child misses a session?', answer: 'Sessions are recorded and accessible within 24 hours. Your child’s Navigator will adjust the following session to address any gaps. Two consecutive missed sessions trigger a parent check-in to assess whether the cohort timing is correct.' },
          { question: 'How is DODO different from an after-school English class?', answer: 'DODO builds English Thinkers at mastery level—children with the cognitive capacity to reason academically in English at the highest level — the ability to read complex texts, argue a position with evidence, and write with precision. An after-school class builds conversational skills. The Loop trains reading comprehension, analytical thinking, oral argument construction, and structured writing. These are not language skills. They are cognitive architecture.' },
        ],
      },
      {
        id: 'the-loop', label: 'The Loop',
        heading: 'How the methodology works — and why the order is not negotiable.',
        variant: 'dark', bg: '#212830',
        items: [
          { question: 'What is The Loop?', answer: 'The Loop is DODO’s four-phase methodology: Read → Think → Speak → Write. Grounded in the MCT Language Arts tradition and Harvard Project Zero’s Visible Thinking routines, it mirrors how high-level thinkers process academic content — not how language learners translate vocabulary. The sequence is fixed because each phase builds the cognitive scaffolding the next phase requires.' },
          { question: 'Why Read → Think → Speak → Write in that order?', answer: 'Because that is the order in which academic cognition develops. Reading builds input capacity. Thinking builds conceptual frameworks. Speaking externalizes those frameworks. Writing consolidates them into durable mental structures. Reversing the order produces fluency without comprehension — your child sounds confident but cannot reason independently.' },
          { question: 'How long does a student spend on each phase of The Loop?', answer: 'Each phase runs for 4 weeks. Read: weeks 1–4. Think: weeks 5–8. Speak: weeks 9–12. Write: weeks 13–16. Every student moves through the full sequence regardless of initial ability level. The content difficulty adjusts — the methodology does not.' },
          { question: 'Does The Loop change as the student improves?', answer: 'The structure never changes. The content complexity increases. A student reading at Lexile 600L in week 1 will still follow Read → Think → Speak → Write. But the texts, prompts, and writing assignments will increase in Lexile range and analytical demand as their baseline rises.' },
          { question: 'How is The Loop different from what my child’s school already does?', answer: 'Most school curricula assume monolingual cognition. They teach reading and writing as separate skills. The Loop treats them as interdependent cognitive phases within a single system. Your child’s school may teach comprehension strategies. The Loop builds the thinking structure that makes those strategies automatic.' },
          { question: 'Can my child join mid-Loop or must they start at Read?', answer: 'Every student begins at Read. The entrance assessment determines content difficulty — not phase placement. A high-performing student will read more challenging texts in weeks 1–4, but they still enter at Read. The Loop is a sequence, not a ladder.' },
        ],
      },
      {
        id: 'navigators', label: 'Navigators',
        heading: 'Who they are, how they work, and how they’re matched to your child.',
        variant: 'light', bg: '#F5F5FF',
        items: [
          { question: 'What is a Navigator?', answer: 'A Navigator is your child’s dedicated instructor for the full 16 weeks. They guide your child through The Loop, track Lexile and 6+1 Trait growth, adjust content difficulty in real time, and communicate progress to you every four weeks.' },
          { question: 'How is a Navigator different from a teacher or tutor?', answer: 'A teacher delivers curriculum to a classroom. A tutor remediates gaps. A Navigator builds cognitive systems. They do not reteach what your child’s school already covered — they construct the thinking architecture that lets your child use what they already know at a higher level.' },
          { question: 'How is my child matched to their Navigator?', answer: 'Matching is based on three inputs: baseline Lexile score from the entrance assessment, 6+1 Trait writing entry level, and the parent diagnostic call. We match cognitive profile, not personality. Your child’s Navigator is selected for their ability to guide your child’s specific thinking development — not to be their friend.' },
          { question: 'Will my child have the same Navigator for all 16 weeks?', answer: 'Yes. Consistency is non-negotiable. Changing Navigators mid-program disrupts the trust required for cognitive risk-taking. If a match is incorrect, we address it in week 2 — not week 10.' },
          { question: 'What are Navigators’ academic backgrounds?', answer: 'Every Navigator holds a graduate degree from a world top-50 university (Oxford, U of T, Queen’s, LSE and others) with a specialist background in English literature or composition. All are native English speakers, all are certified Lexile assessment practitioners, and all are trained in the 6+1 Trait writing framework. Most have longitudinal experience teaching bilingual students in North American academic contexts.' },
          { question: 'How does a Navigator track my child’s progress between sessions?', answer: 'Navigators review notes from the previous session before every meeting. They track question response patterns, depth of reasoning, and where your child pushed back or went quiet. This allows them to adjust the next session’s difficulty in real time — your child never repeats work they have already mastered.' },
          { question: 'What happens if my child and their Navigator aren’t the right fit?', answer: 'You will know by week 2. If the match is incorrect, we reassign within 48 hours. After week 4, reassignment becomes disruptive to progress and is only considered in exceptional circumstances. The diagnostic call exists to prevent mismatches — use it.' },
        ],
      },
      {
        id: 'results', label: 'Results + Measurement',
        heading: 'What to expect — in numbers, not promises.',
        variant: 'dark', bg: '#0E0E12',
        items: [
          { question: 'What results can I expect after 16 weeks?',
            searchText: 'one grade level lexile growth 100L 150L increase 16 weeks evidence base structured rigorous instruction 6+1 trait writing scores ideas organization voice methodology',
            answer: 'One grade level of Lexile growth — 100L to 150L increase — over 16 weeks. This is the evidence base for what 16 weeks of structured, rigorous instruction produces. Your child will also show measurable improvement in 6+1 Trait writing scores, specifically in Ideas, Organization, and Voice. See our [methodology](/methodology) page for framework details.' },
          { question: 'What is a Lexile level and how is it measured?',
            searchText: 'lexile level measured 0L 2000L reading comprehension ability standardized assessments sentence complexity vocabulary demand conceptual density MetaMetrics certified assessment tools',
            answer: 'A Lexile level quantifies reading comprehension ability on a scale from 0L to 2000L. It is measured using standardized assessments that evaluate sentence complexity, vocabulary demand, and conceptual density. DODO uses MetaMetrics-certified Lexile assessment tools. Learn more on our [Lexile](/lexile) page.' },
          { question: 'What is the 6+1 Trait writing framework?',
            searchText: '6+1 trait writing framework seven dimensions ideas organization voice word choice sentence fluency conventions presentation 5-point rubric methodology',
            answer: 'The 6+1 Trait framework measures seven dimensions of writing: Ideas, Organization, Voice, Word Choice, Sentence Fluency, Conventions, and Presentation. Each trait is scored independently on a 5-point rubric. DODO focuses on Ideas, Organization, and Voice during the 16-week program. Full framework documentation is available on our [methodology](/methodology) page.' },
          { question: 'How much Lexile growth is realistic in 16 weeks?', answer: 'One grade level — 100L to 150L. This is achievable for students starting between Lexile 400L and 1000L with consistent session attendance. Growth above 150L in 16 weeks is possible but not typical. Growth below 100L signals a mismatch between content difficulty and baseline ability — we adjust immediately.' },
          { question: 'When is my child assessed — and who does the assessment?', answer: 'Three times. Week 0: entrance assessment before the first session. Week 8: mid-program check. Week 16: exit assessment. All assessments are administered by your child’s Navigator using MetaMetrics-certified tools. Results are shared with you within 72 hours of each assessment.' },
          { question: 'What if my child doesn’t show measurable growth?', answer: 'If your child shows less than 50L growth by week 8, we initiate a diagnostic review. This involves a parent call, Navigator observation, and content difficulty audit. If the issue is engagement, we adjust. If the issue is developmental readiness, we defer enrollment to a later cohort and refund the remaining balance.' },
          { question: 'How does DODO’s measurement compare to what my child’s school reports?', answer: 'School grades measure compliance and effort. Lexile scores measure comprehension capacity. Your child may receive an A in English class while reading below grade level. DODO reports what your child can do — not how hard they tried.' },
          { question: 'Can I see the assessment results during the program — not just at the end?', answer: 'Yes. You receive a progress report after weeks 4, 8, 12, and 16. Each report includes Lexile trajectory, 6+1 Trait scores, and Navigator observations from the previous four weeks. You will never be surprised by the final assessment — you will have watched your child’s growth unfold across four data points.' },
        ],
      },
      {
        id: 'enrollment', label: 'Enrollment + Pricing',
        heading: 'Everything in the 16-Week Program — no surprises.',
        variant: 'dark', bg: '#212830',
        items: [
          { question: 'How do I get started?', answer: 'It starts with a diagnostic consultation — 20 minutes with a Navigator, not a sales call. We measure your child’s Lexile level, identify the exact gaps, and show you what the first 16 weeks looks like for a student exactly like yours. Families who enroll during a new city’s launch are recognised through the **Founding Family Program**. Book your consultation to begin.' },
          { question: 'What does the 16-week program cost?',
            searchText: 'program cost fee 2250 1185 sixteen weeks full program literacy foundation 25 minute writing session navigator assessments progress reports personalization no hidden costs',
            answer: 'Five programme combinations, all 16 weeks per cycle, all with full personalization included. **Summit (全境领航) — $2,830**: 3× literature + 1× writing session per week. **Core (稳健航行) — $2,250** *(most popular)*: 2× literature + 1× writing session per week. **Flex 1 (文学阅读自由航行) — $1,185**: 2× literature sessions per week — reading foundation first. **Flex 2 (大师写作自由航行) — $2,110**: 2× writing sessions per week — writing specialisation. **Flex 3 (GPA管理自由航行) — from $750**: 1× GPA tutoring session per week — school academic management; pricing varies by subject. All tiers include entrance, mid-program, and exit assessments, four progress reports, and full access to recorded session archives.' },
          { question: 'What is included in the enrollment fee?', answer: 'Everything. Sixteen weeks of live Navigator sessions per your chosen tier (Summit / Core / Flex 1 / Flex 2 / Flex 3 — see pricing breakdown above). Entrance, mid-program, and exit assessments. Four progress reports. Recorded session archive. Full personalization at every tier. No add-ons, no material fees, no hidden costs.' },
          { question: 'Are there any additional costs beyond the program fee?', answer: 'No. The enrollment fee covers the entire 16-week program. You will not be asked to purchase books, software licenses, or supplementary materials. If your child needs accommodations — extended session time, translated materials, assistive technology — those are included at no additional cost.' },
          { question: 'What is the payment structure?',
            searchText: 'payment structure options lump sum full payment upfront weekly 74 per week enrollment plan',
            answer: 'Two options. Lump sum at enrollment, or weekly payments. Weekly rates: **Flex 1 from $74/week**, **Flex 2 from $132/week**, **Core from $140/week**, **Summit from $177/week**. Flex 3 weekly rate varies by subject (typically from $47/week). Both lump-sum and weekly options are available for every tier.' },
          { question: 'What is the cancellation policy?', answer: 'Full refund if you cancel before the first session. 50% refund if you cancel before week 4. No refund after week 4. If DODO initiates a program withdrawal due to lack of measurable progress, you receive a prorated refund for the remaining weeks.' },
          { question: 'Can I enroll mid-cohort?', answer: 'No. Every student begins at week 1. The Loop is a sequence — joining mid-program would require skipping phases, which undermines the methodology. If the current cohort has already started, you will be placed in the next available cohort.' },
          { question: 'Is there a waitlist?', answer: 'Only if the current cohort is full. DODO runs cohorts every 6–8 weeks in each city. If you are waitlisted, you receive priority placement in the next cohort and a 48-hour early enrollment window before general availability.' },
          { question: 'What happens after the 16 weeks — is there a renewal option?', answer: 'Yes. Students who complete the 16-week program and show measurable Lexile growth are eligible for Advanced Loop — a continuation program with elevated content difficulty. Enrollment details are shared during your week 16 exit assessment review.' },
        ],
      },
      {
        id: 'bilingual', label: 'Bilingual Development',
        heading: 'Why English mastery at the cognitive level protects both languages.',
        variant: 'light', bg: '#F5F5FF',
        items: [
          { question: 'Does speaking Chinese at home hurt my child’s English development?', answer: 'No. Research shows that maintaining first-language proficiency strengthens second-language acquisition. The issue is not Chinese at home — it is fragmented cognitive development. If your child is learning English conversationally while thinking academically in Chinese, they develop two incomplete systems. DODO builds cognitive depth in English — and that depth protects both languages.' },
          { question: 'What is the difference between bilingual fluency and bilingual thinking?', answer: 'Bilingual fluency is the ability to speak two languages. Bilingual thinking is the ability to reason, analyze, and problem-solve in both languages. Your child may speak English fluently and still struggle with reading comprehension, essay construction, or abstract reasoning. Fluency is surface-level. Thinking is structural.' },
          { question: 'My child speaks English fluently — why do they still struggle academically?', answer: 'Because conversational fluency and academic cognition are not the same skill. Your child may navigate social situations in English while still processing complex texts, logical arguments, and written analysis in Chinese. DODO trains the cognitive architecture required for academic English — not the vocabulary required for casual conversation.' },
          { question: 'How does DODO approach the Chinese-English language relationship?', answer: 'DODO treats Chinese and English as interdependent cognitive systems — not competing languages. The Loop does not replace Chinese thinking with English thinking. It builds a cognitive framework where your child reasons academically in English at mastery level. That cognitive depth transfers back to Chinese. Thinking structure is portable.' },
          { question: 'At what age is this development most effective?', answer: 'Grades 3 through 8 — ages 8 to 14. This is the critical window when academic cognition consolidates. Before age 8, children are still developing basic literacy. After age 14, cognitive patterns are largely fixed. The Loop works because it acts during the exact developmental window when this cognitive architecture is still forming.' },
          { question: 'What does research say about bilingual academic performance?', answer: 'Students who develop academic proficiency in both languages outperform monolingual peers on measures of executive function, cognitive flexibility, and problem-solving. The advantage is not the bilingualism itself — it is the cognitive complexity required to manage two language systems simultaneously. DODO builds that complexity intentionally.' },
          { question: 'Will DODO help my child maintain their Chinese while improving their English?', answer: 'DODO does not teach Chinese. But by building English mastery at the cognitive level, it strengthens your child’s ability to operate in both languages. A student who can analyze a text, construct an argument, and write a structured essay in English can transfer those cognitive skills back to Chinese. The thinking structure is portable.' },
        ],
      },
      {
        id: 'cities', label: 'Cities + Scheduling',
        heading: 'Where DODO runs, and when.',
        variant: 'dark', bg: '#0E0E12',
        items: [
          { question: 'What cities does DODO serve?', answer: 'Six diaspora cities: Vancouver, Richmond BC, Markham, Toronto, San Francisco Bay Area, and Los Angeles. These cities represent the highest concentrations of bilingual Chinese-English families in North America. Expansion to additional cities is planned for 2027.' },
          { question: 'What timezone are sessions run in?', answer: 'Sessions are scheduled in your local timezone. Vancouver and Richmond BC cohorts run on Pacific Time. Toronto and Markham cohorts run on Eastern Time. San Francisco and Los Angeles cohorts run on Pacific Time. Your child will never need to attend a session outside of reasonable local hours.' },
          { question: 'Can students in different timezones join the same cohort?', answer: 'No. Cohorts are city-specific. A student in Vancouver cannot join a Toronto cohort. This ensures that all students in a cohort are working within compatible schedules and cultural contexts.' },
          { question: 'How are sessions delivered — ClassIn, Zoom, or something else?', answer: 'Sessions are delivered through DODO’s proprietary platform, which integrates live video, screen sharing, collaborative annotation, and session recording. You do not need to install ClassIn, Zoom, or any third-party software. Everything runs in a browser.' },
          { question: 'What are the available session times?', answer: 'Weekday evenings (5:00 PM to 8:00 PM local time) and weekend mornings (9:00 AM to 12:00 PM local time). Exact session time is assigned during the diagnostic call based on your schedule and Navigator availability. Once assigned, session time remains fixed for all 16 weeks.' },
          { question: 'Do sessions run during school holidays?', answer: 'No. DODO observes major school holidays in each city — winter break, spring break, and summer holidays. If a holiday falls during your cohort, that week is skipped and the program extends by one week. You are notified of holiday adjustments at enrollment.' },
          { question: 'Is DODO available in cities not on the priority list?', answer: 'Not yet. The current program is optimized for the six diaspora cities listed above. If you live outside these cities, you can join a waitlist for future expansion. DODO will notify you when enrollment opens in your area.' },
        ],
      },
    ],

    zh: [
      {
        id: 'program', label: '课程介绍',
        heading: '16周课程具体包含哪些内容。',
        variant: 'light', bg: '#F5F5FF',
        items: [
          { question: '16周课程具体包含什么内容？', answer: '课程贯穿 The Loop（学习循环）的四个阶段——阅读 → 思考 → 表达 → 写作——共历经16个结构化周次。每节课包含与导师（Navigator）的实时教学、课程间隙的结构化练习，以及基于 Lexile（蓝思）和 6+1 特质写作框架的进度跟踪。您的孩子将接触与年级水平相符的内容，而非简化材料。' },
          { question: '课程共有多少节课？每节课多长时间？', answer: '两种报名选项，均为16周。完整课程（Full Program）每周包含三节与导师的实时课程——两节25分钟文学课（Literacy Session），加一节50分钟写作课（Writing Session）。读写基础（Literacy Foundation）每周包含两节25分钟文学课。课程每周固定时间进行，由批次开课日期决定。' },
          { question: 'DODO 适合哪些年级的学生？', answer: '小学三年级至初中二年级。课程专为 Lexile 阅读水平在 400L 至 1000L 之间的学生设计——这是双语思维能否巩固或断裂的关键区间。' },
          { question: '这是小组课还是一对一课程？', answer: '一对一课程。每位学生在整个16周内都有专属导师（Navigator）陪伴。实时课程始终保持1对1形式。' },
          { question: '孩子请假缺课怎么办？', answer: '课程将在24小时内录制并可回看。孩子的导师会在下一节课中调整内容以填补空缺。连续缺勤两节课将触发家长沟通，共同评估当前批次的时间安排是否合适。' },
          { question: 'DODO 与课外英语班有何区别？', answer: 'DODO 培养的是最高认知层面的英语思维者（English Thinker）——能够阅读复杂文本、用证据展开论证、写出精准文章的孩子。课外英语班培养的是会话技能。The Loop 训练阅读理解、分析思维、口头论证和结构化写作——这些不是语言技能，而是认知架构。' },
        ],
      },
      {
        id: 'the-loop', label: 'The Loop 教学系统',
        heading: '教学方法如何运作——以及顺序不可更改的原因。',
        variant: 'dark', bg: '#212830',
        items: [
          { question: 'The Loop 是什么？', answer: 'The Loop 是 DODO 的四阶段教学系统：阅读 → 思考 → 表达 → 写作。它根植于 MCT 语言艺术课程传统和哈佛教育学院零点项目（Harvard Project Zero）的 Visible Thinking（可视化思维方法），模拟高水平思考者处理学术内容的方式——而非语言学习者翻译词汇的方式。顺序固定，因为每个阶段都为下一阶段构建必要的认知脚手架。' },
          { question: '为什么必须按照阅读 → 思考 → 表达 → 写作的顺序？', answer: '因为这是学术认知发展的自然顺序。阅读构建输入能力，思考构建概念框架，表达将框架外化，写作将其固化为持久的思维结构。颠倒顺序会产生没有理解深度的流利——孩子听起来自信，却无法独立推理。' },
          { question: '学生在 The Loop 每个阶段各花多长时间？', answer: '每个阶段持续4周。阅读：第1–4周。思考：第5–8周。表达：第9–12周。写作：第13–16周。无论初始能力水平如何，每位学生都完整经历四个阶段。内容难度会调整——教学方法不变。' },
          { question: '随着学生进步，The Loop 会改变吗？', answer: '结构永不改变，内容复杂度会提升。第1周 Lexile 600L 的学生仍然遵循阅读 → 思考 → 表达 → 写作的顺序，但随着基础水平提升，文本、提示和写作任务的 Lexile 范围与分析要求也会相应增加。' },
          { question: 'The Loop 与孩子学校的课程有何不同？', answer: '大多数学校课程以单语认知为前提，将阅读和写作作为独立技能来教授。The Loop 将它们视为同一认知系统中相互依存的阶段。学校可能教授理解策略，The Loop 则构建使这些策略自动化的思维结构。' },
          { question: '孩子可以从中间阶段加入，还是必须从阅读开始？', answer: '每位学生都从阅读阶段开始。入学评估决定内容难度——而非阶段位置。高水平学生在第1–4周会阅读更具挑战性的文本，但同样从阅读开始。The Loop 是一个序列，不是一把梯子。' },
        ],
      },
      {
        id: 'navigators', label: '导师（Navigators）',
        heading: '他们是谁、如何工作，以及如何与您的孩子匹配。',
        variant: 'light', bg: '#F5F5FF',
        items: [
          { question: '导师（Navigator）是什么？', answer: '导师是孩子在整个16周内的专属指导者。他们引领孩子穿越 The Loop，追踪 Lexile 和 6+1 特质写作的成长轨迹，实时调整内容难度，并每四周向您汇报进度。' },
          { question: '导师与普通老师或家教有什么区别？', answer: '老师向课堂传授课程内容。家教弥补知识漏洞。导师构建认知系统。他们不会重复学校已教过的内容——而是构建让孩子在更高层面运用已有知识的思维架构。' },
          { question: '如何为我的孩子匹配导师？', answer: '匹配基于三项输入：入学评估的 Lexile 基础分、6+1 特质写作入门水平，以及家长诊断通话。我们依据认知特征进行匹配——而非性格相合。孩子的导师是根据其引导特定思维发展的能力来选择的——而不是为了成为孩子的朋友。' },
          { question: '整个16周内，孩子会一直是同一位导师吗？', answer: '是的。稳定性不可妥协。中途更换导师会破坏认知冒险所需的信任关系。如果匹配不当，我们会在第2周解决——而不是第10周。' },
          { question: '导师的学术背景如何？', answer: '每位导师均持有世界排名前50大学（牛津大学、多伦多大学、皇后大学、伦敦政治经济学院等）的研究生学位，专业背景为英语文学或写作。所有导师均为英语母语者，均获得 Lexile 评估认证，并接受过 6+1 特质写作框架培训。大多数人拥有多年在北美学术环境中教授双语学生的经验。' },
          { question: '导师如何在课程之间追踪孩子的进度？', answer: '导师在每节课前会回顾上一节课的记录，追踪孩子的问题回答模式、推理深度，以及在哪些地方提出异议或陷入沉默。这使他们能够实时调整下一节课的难度——孩子不会重复已掌握的内容。' },
          { question: '如果孩子与导师不合适怎么办？', answer: '第2周时您就会察觉。如果匹配不当，我们会在48小时内重新分配。第4周后重新分配会对进度造成干扰，仅在特殊情况下考虑。诊断通话的目的正是为了预防匹配失误——请充分利用它。' },
        ],
      },
      {
        id: 'results', label: '学习成果与测量',
        heading: '您可以期待的结果——用数字而非承诺。',
        variant: 'dark', bg: '#0E0E12',
        items: [
          { question: '16周后可以期待什么样的成果？',
            searchText: 'one grade level lexile growth 100L 150L increase 16 weeks evidence base structured rigorous instruction 6+1 trait writing scores ideas organization voice methodology',
            answer: '一个年级的 Lexile 增长——16周内提升 100L 至 150L。这是 16 周结构化、高强度教学所能产生的循证依据。孩子在 6+1 特质写作评分方面也会有可量化的提升，具体体现在“思考”、“结构”和“声音”三个维度。详见我们的[教学方法](/methodology)页面。' },
          { question: 'Lexile 水平是什么？如何测量？',
            searchText: 'lexile level measured 0L 2000L reading comprehension ability standardized assessments sentence complexity vocabulary demand conceptual density MetaMetrics certified assessment tools',
            answer: 'Lexile 水平在 0L 至 2000L 的量表上量化阅读理解能力，通过评估句子复杂度、词汇难度和概念密度的标准化测试来衡量。DODO 使用 MetaMetrics（保留英文）认证的 Lexile 评估工具。详见我们的[Lexile](/lexile)页面。' },
          { question: '6+1 特质写作框架是什么？',
            searchText: '6+1 trait writing framework seven dimensions ideas organization voice word choice sentence fluency conventions presentation 5-point rubric methodology',
            answer: '6+1 特质框架从七个维度衡量写作：思考、结构、声音、用词、流畅、规范和呈现。每个特质在 5 分制量表上独立评分。DODO 在 16 周课程中重点关注“思考”、“结构”和“声音”三个维度。完整框架文档详见[教学方法](/methodology)页面。' },
          { question: '16周内实际上能有多少 Lexile 增长？', answer: '一个年级——100L 至 150L。这对于 Lexile 400L 至 1000L 之间、保持规律出勤的学生是可以实现的。16周内超过 150L 的增长是可能的，但并非普遍情况。低于 100L 的增长意味着内容难度与基础能力不匹配——我们会立即调整。' },
          { question: '孩子何时接受评估？由谁来进行？', answer: '三次。第0周：第一节课前的入学评估。第8周：课程中期检测。第16周：结课评估。所有评估均由孩子的导师使用 MetaMetrics 认证工具进行。结果将在每次评估后 72 小时内与您分享。' },
          { question: '如果孩子没有明显进步怎么办？', answer: '如果孩子在第8周的 Lexile 增长低于 50L，我们会启动诊断审查，包括家长沟通、导师观察和内容难度审核。如果问题在于参与度，我们会调整。如果问题在于发展准备度，我们会将入学推迟到下一批次并退还剩余费用。' },
          { question: 'DODO 的测量方式与学校成绩单有何不同？', answer: '学校成绩衡量的是配合度和努力程度。Lexile 分数衡量的是理解能力。孩子的英语成绩可能是 A，但阅读水平却低于年级要求。DODO 报告的是孩子的实际能力——而非努力程度。' },
          { question: '课程期间是否可以查看评估结果，而不必等到最后？', answer: '是的。您将在第4、8、12和16周分别收到进度报告。每份报告包含 Lexile 增长轨迹、6+1 特质写作评分和过去四周的导师观察记录。最终评估不会给您带来任何意外——您将通过四个数据点亲眼见证孩子的成长。' },
        ],
      },
      {
        id: 'enrollment', label: '报名与费用',
        heading: '16周课程的全部内容——无任何惊喜。',
        variant: 'dark', bg: '#212830',
        items: [
          { question: '如何开始？', answer: '从诊断咨询开始——与导师一对一的 20 分钟对话，不是销售电话。我们测量孩子的 Lexile 等级，找出确切的差距，展示属于这个孩子的头 16 周路径。在新城市开课初期报名的家庭，将通过**创始家庭计划（Founding Family Program）**获得认可。预约咨询即可开始。' },
          { question: '16周课程费用是多少？',
            searchText: 'program cost fee 2250 1185 sixteen weeks full program literacy foundation 25 minute writing session navigator assessments progress reports personalization no hidden costs',
            answer: '五种课程组合，每个周期均为16周，均含全程个性化定制。**Summit（全境领航）—— $2,830**：每周 3 节文学课 + 1 节写作课。**Core（稳健航行）—— $2,250** *（最受欢迎）*：每周 2 节文学课 + 1 节写作课。**Flex 1（文学阅读自由航行）—— $1,185**：每周 2 节文学课——以阅读基础为先。**Flex 2（大师写作自由航行）—— $2,110**：每周 2 节写作课——专注写作训练。**Flex 3（GPA管理自由航行）—— 起价 $750**：每周 1 节 GPA 辅导课——校内学业支持；具体费用因科目而异。所有档位均含入学、中期、结课三次评估，四份进度报告，以及完整的课程录像档案。' },
          { question: '报名费包含哪些内容？', answer: '全部内容。根据您选择的档位提供 16 周导师实时课程（Summit / Core / Flex 1 / Flex 2 / Flex 3——详见上方费用说明）。入学、中期、结课三次评估。四份进度报告。课程录像档案。所有档位均含全程个性化。没有附加费用，没有材料费，没有隐性收费。' },
          { question: '除课程费用外是否有其他费用？', answer: '没有。报名费涵盖整个16周课程的全部内容。您不需要另外购买书籍、软件授权或补充材料。如果孩子需要特殊安排——延长课程时长、翻译材料、辅助技术——这些均免费包含在内。' },
          { question: '付款方式有哪些？',
            searchText: 'payment structure options lump sum full payment upfront weekly 74 per week enrollment plan',
            answer: '两种方式可选。报名时一次性付清，或按周支付。各档位周费：**Flex 1 起价 $74/周**、**Flex 2 起价 $132/周**、**Core 起价 $140/周**、**Summit 起价 $177/周**。Flex 3 周费因科目而异（通常起价 $47/周）。一次性付清和按周支付两种方式均适用于所有档位。' },
          { question: '退款政策是什么？', answer: '第一节课前取消，全额退款。第4周前取消，退款50%。第4周后不予退款。如果 DODO 因缺乏可量化进步而主动终止课程，将按剩余周次比例退款。' },
          { question: '可以在批次中途加入吗？', answer: '不可以。每位学生都从第1周开始。The Loop 是一个序列——中途加入意味着跳过阶段，这会破坏教学方法的完整性。如果当前批次已开课，您将被安排进入下一个可用批次。' },
          { question: '有候补名单吗？', answer: '仅当当前批次已满时才有候补。DODO 在每个城市每 6–8 周开设新批次。候补家庭将获得下一批次的优先报名资格，以及在公开报名前 48 小时的抢先报名窗口。' },
          { question: '16周结束后是否有续课选项？', answer: '有。完成完整16周课程且 Lexile 有可量化增长的学生，可以报名“高阶循环（Advanced Loop）”——一个内容难度更高的延伸课程。详情将在第16周结课评估回顾时与您分享。' },
        ],
      },
      {
        id: 'bilingual', label: '双语发展',
        heading: '为什么在认知层面掌握英语，能同时守护两种语言。',
        variant: 'light', bg: '#F5F5FF',
        items: [
          { question: '在家说中文会影响孩子的英语发展吗？', answer: '不会。研究表明，保持第一语言的熟练程度能够强化第二语言的习得。问题不在于在家说中文——而在于认知发展的碎片化。如果孩子在会话层面学英语，却在学术思维层面依赖中文，他们会形成两套不完整的系统。DODO 在认知层面构建英语深度——这种深度同时守护两种语言。' },
          { question: '双语流利与双语思维有什么区别？', answer: '双语流利是指能够说两种语言。双语思维是指能够在两种语言中进行推理、分析和解决问题。孩子可能英语口语流利，但仍然在阅读理解、文章写作或抽象推理方面感到吃力。流利是表层现象，思维是结构层面的能力。' },
          { question: '我的孩子英语口语很流利——为什么学业上还是困难？', answer: '因为会话流利和学术认知不是同一种能力。孩子可能在英语社交场合中应对自如，却仍在用中文处理复杂文本、逻辑论证和书面分析。DODO 训练的是学术英语所需的认知架构——而非日常会话所需的词汇量。' },
          { question: 'DODO 如何看待中英文的语言关系？', answer: 'DODO 将中文和英文视为相互依存的认知系统——而非相互竞争的语言。The Loop 不是用英语思维取代中文思维，而是构建一个认知框架，让孩子能够在最高水平上用英语进行学术推理。这种认知深度自然而然地迁移回中文。思维结构是可以跨语言迁移的。' },
          { question: '这种发展在什么年龄最有效？', answer: '小学三年级至初中二年级——约 8 至 14 岁。这是学术认知固化的关键窗口期。8 岁之前，孩子仍在发展基础读写能力；14 岁之后，认知模式基本定型。The Loop 之所以有效，是因为它恰好在这一认知架构仍在成形的关键窗口期内发挥作用。' },
          { question: '研究如何评价双语学生的学业表现？', answer: '在两种语言中均具备学术熟练度的学生，在执行功能、认知灵活性和问题解决能力方面优于单语同龄人。这种优势不来自双语本身——而来自同时管理两套语言系统所需的认知复杂度。DODO 有意识地构建这种复杂度。' },
          { question: 'DODO 能帮助孩子在提升英语的同时保持中文能力吗？', answer: 'DODO 不教中文。但通过在认知层面构建英语深度，它能够强化孩子在两种语言中运作的能力。一个能够分析文本、构建论点、用英语撰写结构化文章的孩子，可以将这些认知技能迁移回中文。思维结构是可以跨语言迁移的。' },
        ],
      },
      {
        id: 'cities', label: '城市与课程安排',
        heading: 'DODO 的开课城市与时间安排。',
        variant: 'dark', bg: '#0E0E12',
        items: [
          { question: 'DODO 目前在哪些城市开设课程？', answer: '六个海外华人聚居城市：温哥华、列治文（BC省）、万锦、多伦多、旧金山湾区和洛杉矶。这些城市是北美中英双语家庭最集中的地区。计划于 2027 年扩展至更多城市。' },
          { question: '课程在哪个时区进行？', answer: '课程按您所在地的本地时区安排。温哥华和列治文批次使用太平洋时间，多伦多和万锦批次使用东部时间，旧金山和洛杉矶批次使用太平洋时间。孩子不会在本地不合理的时间段上课。' },
          { question: '不同时区的学生可以加入同一批次吗？', answer: '不可以。批次按城市划分。温哥华的学生无法加入多伦多批次。这确保同一批次的所有学生都在兼容的时间安排和文化背景下学习。' },
          { question: '课程通过什么平台进行——ClassIn、Zoom 还是其他？', answer: '课程通过 DODO 自有平台进行，集成了实时视频、屏幕共享、协作注释和课程录制功能。您不需要安装 ClassIn、Zoom 或任何第三方软件，一切都在浏览器中运行。' },
          { question: '有哪些可用的上课时间？', answer: '工作日傍晚（本地时间 17:00 至 20:00）和周末上午（本地时间 9:00 至 12:00）。具体上课时间在诊断咨询期间根据您的日程和导师可用性确定。一旦确定，课程时间在整个 16 周内保持固定。' },
          { question: '学校假期期间课程照常进行吗？', answer: '不进行。DODO 遵守各城市的主要学校假期——寒假、春假和暑假。如果假期恰逢批次进行中，该周跳过，课程顺延一周。假期调整安排将在报名时告知您。' },
          { question: '在优先名单之外的城市也能报名吗？', answer: '暂时不能。当前课程专为以上六个海外华人聚居城市优化。如果您居住在这些城市之外，可以加入未来扩展的候补名单。DODO 将在您所在地区开放报名时通知您。' },
        ],
      },
    ],
  },

}
