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
      { label: 'The Program',   anchor: 'program'      },
      { label: 'The LCS System', anchor: 'the-loop'     },
      { label: 'Navigators',    anchor: 'navigators'   },
      { label: 'Results',       anchor: 'results'      },
      { label: 'Enrollment',    anchor: 'enrollment'   },
      { label: 'Bilingual',     anchor: 'bilingual'    },
      { label: 'Cities',        anchor: 'cities'       },
      { label: 'Little DODO',   anchor: 'little-dodo'  },
    ],
    zh: [
      { label: '课程介绍',        anchor: 'program'      },
      { label: '语言循环体系',      anchor: 'the-loop'     },
      { label: '导师团队',        anchor: 'navigators'   },
      { label: '学习成果',        anchor: 'results'      },
      { label: '报名与费用',      anchor: 'enrollment'   },
      { label: '双语发展',        anchor: 'bilingual'    },
      { label: '城市与安排',      anchor: 'cities'       },
      { label: '都学启蒙',        anchor: 'little-dodo'  },
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
          { question: 'How many sessions are there and how long is each one?', answer: 'Five combinations, all 16 weeks per cycle. **Summit** is three literature sessions plus one writing session each week. **Core** — the most common — is two literature plus one writing. **Flex 1** is two or more literature sessions; **Flex 2** is two writing sessions; **Flex 3** is one or more GPA sessions per week and pairs with any of the others. Literature sessions run 25 minutes, writing sessions 50, on a fixed weekly schedule.' },
          { question: 'What grade levels does DODO serve?', answer: 'The ELA Program begins at Grade 3 and runs across seven levels to college-tier academic English — each level two to three 16-week cycles. Little DODO is a separate programme for ages 5 to 8, with its own early-childhood educators. Placement comes from the diagnostic, not from your child’s school year.' },
          { question: 'Is this a group program or one-on-one?', answer: 'One-on-one. Every child works with a dedicated Navigator for the full 16 weeks. Live sessions are always 1:1.' },
          { question: 'What happens if my child misses a session?', answer: 'Sessions are recorded and accessible within 24 hours. Your child’s Navigator will adjust the following session to address any gaps. Two consecutive missed sessions trigger a parent check-in to assess whether the cohort timing is correct.' },
          { question: 'How is DODO different from an after-school English class?', answer: 'DODO builds English Thinkers at mastery level—children with the cognitive capacity to reason academically in English at the highest level — the ability to read complex texts, argue a position with evidence, and write with precision. An after-school class builds conversational skills. The Loop trains reading comprehension, analytical thinking, oral argument construction, and structured writing. These are not language skills. They are cognitive architecture.' },
          { question: 'Why not just use ChatGPT?', answer: 'AI is a tool your child will use for the rest of their life, and using it well is a skill in itself. What it cannot do is build the judgment behind the question. It will answer whatever you ask; a Navigator teaches your child which question is worth asking — how to read a difficult text closely, hold a position under challenge, and write something that earns its conclusion. In a session your child does the reading and the reasoning; the Navigator presses on the point they haven’t made yet.' },
        ],
      },
      {
        id: 'the-loop', label: 'The LCS System',
        heading: 'How a session is built, and why the order holds.',
        variant: 'dark', bg: '#212830',
        items: [
          { question: 'What is the LCS System?', answer: 'The LCS System is DODO’s curriculum framework — Literacy, Composition, Speaking. Literacy is the reading treasury, where language goes in: whole unabridged classics, the Latin and Greek roots beneath English, and an ear for how good writing is built. Composition is the construction engine: grammar first and fast, then sentence to paragraph to essay. Speaking is our own strand, and the one a book cannot deliver — oral defence, Socratic dialogue, taking the other side. Inside every session those three run as one sequence: Read → Think → Speak → Write.' },
          { question: 'Why Read → Think → Speak → Write in that order?', answer: 'Because that is the order the thinking wants to go in. Reading puts something worth arguing about in front of your child. Thinking gives them a position on it. Speaking makes them defend that position out loud, where the gaps show. Writing is where it settles into something they own. Run it backwards and you get fluent sentences with nothing underneath.' },
          { question: 'How is a single session structured?', answer: 'One session runs the full sequence, not one quarter of it. A literacy session is 25 minutes; a writing session is 50. Your child reads, is asked what they make of it, says it aloud to a Navigator who presses on the part they haven’t thought through, and then writes. The next session does the same thing with harder material.' },
          { question: 'Does the sequence change as your child improves?', answer: 'The sequence stays. The material moves. That is what the seven ELA levels are for — L1 begins at Grade 3 and L7 is college-tier academic English, with each level running two to three 16-week cycles. A child at L1 and a child at L5 have the same session shape and completely different books.' },
          { question: 'How is this different from what my child’s school already does?', answer: 'Most classrooms teach reading and writing as separate subjects, a term apart. Here they are one motion, three times a week, with one Navigator who has read everything your child has written. School measures whether the work was done. We measure the Lexile at Week 0, 8 and 16, and the 6+1 Trait scores alongside it.' },
          { question: 'Where will my child start?', answer: 'At the level the diagnostic puts them, not at the level their grade implies. The 20-minute consultation measures where their reading actually sits, and that decides which of the seven levels they enter. Every session runs the full Read → Think → Speak → Write sequence from the first week, whatever the level.' },
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
          { question: 'Is DODO’s approach evidence-based?', answer: 'Yes, and the strongest evidence sits under the vocabulary work. Teaching the Latin and Greek roots beneath English is one of the most-researched strategies in education. About 60% of English comes from those roots — over 90% of the words in science — so a term your child has never seen becomes one they can take apart and solve. In a study of 493 middle-school students, root-based teaching outperformed memorization for gifted and typically-developing students alike (Gallagher, 2017, Roeper Review). Across dozens of controlled studies, teaching word structure produces measurable gains in vocabulary, decoding and spelling (Goodwin & Ahn, 2010, 2013; Bowers, Kirby & Deacon, 2010). One more finding shapes how we choose texts: children grow most on rich, challenging material rather than simplified readers, which is why we read real, unabridged classics set a step above the comfortable level.' },
        ],
      },
      {
        id: 'enrollment', label: 'Enrollment + Pricing',
        heading: 'Everything in the ELA Program — no surprises.',
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
          { question: 'My child speaks English easily. Isn’t that enough?', answer: 'Speaking easily and reading a difficult text closely are different capacities. A child can hold a conversation without effort and still lose the thread of a chapter, or write a paragraph that lists rather than argues. The conversation is surface. What we build sits under it.' },
          { question: 'My child speaks English fluently — why do they still struggle academically?', answer: 'Because conversational fluency and academic cognition are not the same skill. Your child may navigate social situations in English while still processing complex texts, logical arguments, and written analysis in Chinese. DODO trains the cognitive architecture required for academic English — not the vocabulary required for casual conversation.' },
          { question: 'How does DODO approach the Chinese–English language relationship?', answer: 'As one system, not two competing ones. We build depth in English — close reading, argument, structured writing — and that depth is portable. A child who can take a position and defend it in English does not lose that ability when they switch languages. Cognitive depth protects both.' },
          { question: 'At what age is this development most effective?', answer: 'The ELA Program starts at Grade 3, when academic reading begins to ask more than decoding. Little DODO covers ages 5 to 8 before that. There is no closing door: L7 is college-tier work, and students move up the ladder for as long as it keeps stretching them.' },
          { question: 'Does building English depth take something away from Chinese?', answer: 'No. The work is structural, and structure travels. A child who learns to hold a position under questioning, or to build an argument that earns its conclusion, keeps that capacity whichever language they are working in. We do not teach Chinese, and we do not ask families to set it aside.' },
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
      {
        id: 'little-dodo', label: 'Little DODO (Ages 5–8)',
        heading: 'What Little DODO is — and how it differs from the ELA Program.',
        variant: 'light', bg: '#F5F5FF',
        items: [
          { question: 'What is Little DODO?', answer: 'Little DODO is the K-2 foundational-reading sibling of the ELA Program. Live, one-on-one with a dedicated early-childhood educator specializing in phonetics, fluency, and pronunciation. High-frequency, low-pressure sessions that build vocabulary and the love of reading, book by book.' },
          { question: 'What ages does Little DODO serve?', answer: 'Ages 5–8 — kindergarten through Grade 2. The point is foundational reading at this stage: confidence to read aloud, comfort with comprehension questions, and the joy of understanding what they read.' },
          { question: 'How is Little DODO different from the ELA Program?', answer: 'Little DODO is the K-2 entry point. It uses the same live, one-on-one delivery model as the ELA Program, but a different specialist team: dedicated early-childhood educators trained in phonetics, fluency, and pronunciation, rather than literature and composition. Pace and pressure are adapted to the age. Formal Lexile measurement begins later, in the ELA Program. Little DODO builds the comprehension foundation that Lexile measures.' },
          { question: 'How often does a Little DODO student meet with their Navigator?', answer: 'High-frequency, low-pressure. The cadence is set with you during the diagnostic call to match your child’s attention span and family rhythm — never longer than the child can sustain.' },
          { question: 'Does Little DODO use Lexile measurement?', answer: 'No. Lexile is appropriate from Grade 3 in the ELA Program. At Little DODO ages, the outcomes are confidence with reading aloud, comfort with comprehension, and the steady habit of opening a book. Formal Lexile assessment starts later.' },
          { question: 'When should we move from Little DODO to the ELA Program?', answer: 'Typically around Grade 3 — when your child is ready for Lexile-measured reading and the 6+1 Trait writing arc. Your child’s Navigator tracks readiness and recommends the transition with you. There is no automatic age cutoff; the readiness signal is the gate.' },
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
          { question: '有多少节课，每节课多长时间？', answer: '五种组合，每个周期均为 16 周。**Summit（全境领航）** 每周三节文学课加一节写作课。**Core（稳健航行）** — 最常见的选择 — 每周两节文学课加一节写作课。**Flex 1（文学阅读自由航行）** 为两节或以上文学课；**Flex 2（大师写作自由航行）** 为两节写作课；**Flex 3（GPA管理自由航行）** 每周一节或以上 GPA 课程，可与其他任何组合搭配。文学课每节 25 分钟，写作课每节 50 分钟，按固定每周时间表进行。' },
          { question: 'DODO 面向哪些年级？', answer: 'ELA 课程从三年级开始，横跨七个级别直至大学级别的学术英语 — 每个级别两到三个 16 周周期。都学启蒙（Little DODO）是独立的课程，面向 5 至 8 岁儿童，由专属的幼儿教育导师带领。分级依据来自诊断评估，而非孩子的学校年级。' },
          { question: '这是小组课还是一对一课程？', answer: '一对一课程。每位学生在整个16周内都有专属导师（Navigator）陪伴。实时课程始终保持1对1形式。' },
          { question: '孩子请假缺课怎么办？', answer: '课程将在24小时内录制并可回看。孩子的导师会在下一节课中调整内容以填补空缺。连续缺勤两节课将触发家长沟通，共同评估当前批次的时间安排是否合适。' },
          { question: 'DODO 与课外英语班有何区别？', answer: 'DODO 培养的是最高认知层面的英语思维者（English Thinker）——能够阅读复杂文本、用证据展开论证、写出精准文章的孩子。课外英语班培养的是会话技能。The Loop 训练阅读理解、分析思维、口头论证和结构化写作——这些不是语言技能，而是认知架构。' },
          { question: '为什么不用 ChatGPT 就好？', answer: 'AI 是孩子终身都会使用的工具，善用 AI 本身就是一种技能。但它无法构建问题背后的判断力。它会回答你提出的任何问题；而导师（Navigator）教会孩子哪个问题值得提出 — 如何精读一篇困难的文本，在挑战中坚守立场，写出经得起推敲的结论。在一节课中，孩子完成阅读和推理；导师则在孩子尚未触及的要点上追问。' },
        ],
      },
      {
        id: 'the-loop', label: '语言循环体系',
        heading: '一节课如何构建，以及顺序为何如此重要。',
        variant: 'dark', bg: '#212830',
        items: [
          { question: '什么是语言循环体系？', answer: '语言循环体系是 DODO 的课程框架 — 文学精读、系统写作训练、表达。文学精读是阅读的宝库，语言由此输入：完整的未删节经典作品、英语背后的拉丁和希腊词根，以及对好文章如何构建的敏锐感知。系统写作训练是构建引擎：语法优先且快速掌握，然后从句到段再到文章。表达是我们独有的部分，也是书本无法交付的部分 — 口头辩护、苏格拉底式对话、换位思考。每一节课中，这三者作为一个序列运行：阅读 → 思考 → 表达 → 写作。' },
          { question: '为什么顺序是阅读 → 思考 → 表达 → 写作？', answer: '因为这是思考想要遵循的顺序。阅读将值得讨论的内容放在孩子面前。思考让他们形成自己的立场。表达让他们大声说出并为这一立场辩护，漏洞会在此显现。写作则是将其沉淀为他们真正拥有的东西。反向进行，你只会得到流畅的句子，而底下空无一物。' },
          { question: '一节课是如何安排的？', answer: '一节课运行完整的顺序，而非四分之一。一节文学课为 25 分钟；一节写作课为 50 分钟。孩子阅读，被问及他们的理解，向导师（Navigator）大声说出自己的想法 — 导师会追问他们尚未想透的部分 — 然后写作。下一节课用更难的材料做同样的事。' },
          { question: '随着孩子进步，这个顺序会改变吗？', answer: '顺序不变，材料升级。这正是七个 ELA 级别的意义 — L1 从三年级开始，L7 为大学级别的学术英语，每个级别运行两到三个 16 周周期。L1 的孩子和 L5 的孩子拥有相同的课程形态，但阅读的书籍完全不同。' },
          { question: '这与我孩子在学校所学的有什么不同？', answer: '大多数课堂将阅读和写作作为独立的科目教授，相隔一个学期。在这里，它们是同一个动作，每周三次，由一位读过孩子所有写作内容的导师（Navigator）带领。学校衡量作业是否完成。我们在第 0、8 和 16 周测量 Lexile（蓝思）值，并同时记录 6+1 特质评分。' },
          { question: '我的孩子将从哪个级别开始？', answer: '从诊断评估所确定的级别开始，而非他们年级所对应的级别。20 分钟的咨询会测量他们实际阅读水平，并由此决定他们进入七个级别中的哪一个。无论哪个级别，每一节课都从第一周开始运行完整的 阅读 → 思考 → 表达 → 写作 顺序。' },
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
          { question: 'DODO 的教学方法有研究依据吗？', answer: '有，最强有力的证据来自词汇教学部分。教授英语背后的拉丁和希腊词根是教育领域研究最充分的策略之一。约 60% 的英语词汇来自这些词根 — 科学词汇中超过 90% — 因此孩子从未见过的术语也能被拆解和理解。在一项涉及 493 名中学生的研究中，基于词根的教学在资优学生和普通发展学生中均优于死记硬背（Gallagher, 2017, Roeper Review）。在数十项对照研究中，词结构教学在词汇、解码和拼写方面均产生可衡量的提升（Goodwin & Ahn, 2010, 2013; Bowers, Kirby & Deacon, 2010）。另一项发现影响了我们选择文本的方式：孩子在丰富、有挑战性的材料上成长最快，而非简化的读本，这就是为什么我们阅读真实的、未删节的经典作品，并将其设置在略高于舒适水平的难度。' },
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
          { question: '我的孩子英语说得很好，这还不够吗？', answer: '流利口语和精读困难文本是两种不同的能力。孩子可以毫不费力地进行对话，但仍然抓不住一个章节的脉络，或者写出的段落只是罗列而非论证。对话在表层，我们构建的东西在表层之下。' },
          { question: '我的孩子英语口语很流利——为什么学业上还是困难？', answer: '因为会话流利和学术认知不是同一种能力。孩子可能在英语社交场合中应对自如，却仍在用中文处理复杂文本、逻辑论证和书面分析。DODO 训练的是学术英语所需的认知架构——而非日常会话所需的词汇量。' },
          { question: 'DODO 如何看待中文与英文的语言关系？', answer: '视为一个系统，而非两个竞争的体系。我们构建英语的深度 — 精读、论证、结构化写作 — 而这种深度是可迁移的。一个能用英语提出立场并为之辩护的孩子，切换语言时不会失去这种能力。认知深度守护两者。' },
          { question: '这个发展阶段在什么年龄最有效？', answer: 'ELA 课程从三年级开始，此时学术阅读开始要求超越解码的能力。都学启蒙（Little DODO）在此之前覆盖 5 至 8 岁。不存在关闭的门：L7 是大学级别的工作，学生只要还在被拉伸就会持续向上攀登。' },
          { question: '构建英语深度会削弱中文能力吗？', answer: '不会。这项工作本质是结构性的，而结构具有可迁移性。一个学会在追问中坚守立场、或构建经得起推敲的论证的孩子，无论使用哪种语言，都保有这种能力。我们不教中文，也不要求家庭放弃中文。' },
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
      {
        id: 'little-dodo', label: '都学启蒙（5–8 岁）',
        heading: '什么是都学启蒙——以及它与 ELA 课程有何不同。',
        variant: 'light', bg: '#F5F5FF',
        items: [
          { question: '什么是都学启蒙？', answer: '都学启蒙是 ELA 课程的 K-2 启蒙姊妹课程。由专属的幼儿教育导师 1 对 1 直播亲授，深耕语音、发音与流利度。高频次、低压力的课程，一本一本书慢慢建立词汇量与阅读的乐趣。' },
          { question: '都学启蒙服务哪些年龄段？', answer: '5–8 岁——幼儿园至二年级。这一阶段的重点是基础阅读：朗读时的自信、面对理解题的从容、读懂一本书的乐趣。' },
          { question: '都学启蒙和 ELA 课程有什么不同？', answer: '都学启蒙是 K-2 阶段的入口。它沿用 ELA 课程同样的直播 1 对 1 授课模式，但师资团队不同：是深耕语音、发音与流利度的幼儿教育导师，而非文学与写作专长的导师。节奏和强度做了适龄调整。正式的 Lexile 评估从 ELA 课程开始。都学启蒙为日后的 Lexile 测量打下阅读理解的基础。' },
          { question: '都学启蒙的学生一周和导师上几次课？', answer: '高频次，低压力。具体节奏在诊断咨询中与您一同确定，匹配孩子的专注时长和家庭节奏——绝不超过孩子能承受的范围。' },
          { question: '都学启蒙使用 Lexile 评估吗？', answer: '不使用。Lexile 适合 3 年级及以上 ELA 课程阶段。在都学启蒙年龄段，成果体现在朗读的自信、阅读理解的从容、以及每天打开一本书的稳定习惯。正式的 Lexile 评估之后才开始。' },
          { question: '什么时候从都学启蒙过渡到 ELA 课程？', answer: '通常在 3 年级前后——孩子准备好接受 Lexile 测量的阅读和 6+1 Trait 写作训练时。孩子的导师会持续追踪是否已经具备过渡条件，并与您一同推荐。没有强制的年龄分界——是否准备好才是真正的过渡信号。' },
        ],
      },
    ],
  },

}
