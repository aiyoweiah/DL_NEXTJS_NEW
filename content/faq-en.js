// content/faq-en.js
//
// Server-safe FAQ data for the English locale.
// Used by app/[locale]/faq/page.jsx to populate the FAQPage JSON-LD schema.
//
// NOTE — duplication with components/faq/FAQClient.jsx is intentional for Tier 1.
// FAQClient holds the UI version (with JSX inline links and bold pricing); this
// module holds the plain-text canonical version that schema.org / LLMs consume.
// Tier 2 cleanup will consolidate these into a single source of truth using
// markdown-style inline-link syntax + a small client-side renderer.
//
// Shape:
//   [{ question: string, answer: string }, ...]
//
// All answers are self-contained (per GEO requirement — each Q&A must read in
// isolation, with no implicit dependency on surrounding answers).

export const faqEn = [
  // ── The Program ───────────────────────────────────────────────
  {
    question: 'What exactly happens in the 16-week program?',
    answer: 'The program runs through The Loop — Read → Think → Speak → Write — across 16 structured weeks. Each session involves live instruction with a Navigator, structured practice between sessions, and progress tracking using Lexile and 6+1 Trait frameworks. Your child moves through grade-level content, not simplified material.',
  },
  {
    question: 'How many sessions are there and how long is each one?',
    answer: 'Two enrollment options, both running for 16 weeks. The Full Program includes three live sessions each week with your child’s Navigator — two 25-minute literacy sessions plus one 50-minute writing session. The Literacy Foundation includes two 25-minute literacy sessions each week. Sessions run on a fixed weekly schedule determined by cohort start date.',
  },
  {
    question: 'What grade levels does DODO serve?',
    answer: 'Grades 3 through 8. The program is designed for students reading between Lexile 400L and 1000L — the critical range where bilingual thinking either consolidates or fragments.',
  },
  {
    question: 'Is this a group program or one-on-one?',
    answer: 'One-on-one. Every child works with a dedicated Navigator for the full 16 weeks. Live sessions are always 1:1.',
  },
  {
    question: 'What happens if my child misses a session?',
    answer: 'Sessions are recorded and accessible within 24 hours. Your child’s Navigator will adjust the following session to address any gaps. Two consecutive missed sessions trigger a parent check-in to assess whether the cohort timing is correct.',
  },
  {
    question: 'How is DODO different from an after-school English class?',
    answer: 'DODO builds the cognitive capacity to reason academically in English at the highest level — the ability to read complex texts, argue a position with evidence, and write with precision. An after-school class builds conversational skills. The Loop trains reading comprehension, analytical thinking, oral argument construction, and structured writing. These are not language skills. They are cognitive architecture.',
  },

  // ── The Loop ──────────────────────────────────────────────────
  {
    question: 'What is The Loop?',
    answer: 'The Loop is DODO’s four-phase methodology: Read → Think → Speak → Write. It mirrors how high-level thinkers process academic content — not how language learners translate vocabulary. The sequence is fixed because each phase builds the cognitive scaffolding the next phase requires.',
  },
  {
    question: 'Why Read → Think → Speak → Write in that order?',
    answer: 'Because that is the order in which academic cognition develops. Reading builds input capacity. Thinking builds conceptual frameworks. Speaking externalizes those frameworks. Writing consolidates them into durable mental structures. Reversing the order produces fluency without comprehension — your child sounds confident but cannot reason independently.',
  },
  {
    question: 'How long does a student spend on each phase of The Loop?',
    answer: 'Each phase runs for 4 weeks. Read: weeks 1–4. Think: weeks 5–8. Speak: weeks 9–12. Write: weeks 13–16. Every student moves through the full sequence regardless of initial ability level. The content difficulty adjusts — the methodology does not.',
  },
  {
    question: 'Does The Loop change as the student improves?',
    answer: 'The structure never changes. The content complexity increases. A student reading at Lexile 600L in week 1 will still follow Read → Think → Speak → Write. But the texts, prompts, and writing assignments will increase in Lexile range and analytical demand as their baseline rises.',
  },
  {
    question: 'How is The Loop different from what my child’s school already does?',
    answer: 'Most school curricula assume monolingual cognition. They teach reading and writing as separate skills. The Loop treats them as interdependent cognitive phases within a single system. Your child’s school may teach comprehension strategies. The Loop builds the thinking structure that makes those strategies automatic.',
  },
  {
    question: 'Can my child join mid-Loop or must they start at Read?',
    answer: 'Every student begins at Read. The entrance assessment determines content difficulty — not phase placement. A high-performing student will read more challenging texts in weeks 1–4, but they still enter at Read. The Loop is a sequence, not a ladder.',
  },

  // ── Navigators ────────────────────────────────────────────────
  {
    question: 'What is a Navigator?',
    answer: 'A Navigator is your child’s dedicated instructor for the full 16 weeks. They guide your child through The Loop, track Lexile and 6+1 Trait growth, adjust content difficulty in real time, and communicate progress to you every four weeks.',
  },
  {
    question: 'How is a Navigator different from a teacher or tutor?',
    answer: 'A teacher delivers curriculum to a classroom. A tutor remediates gaps. A Navigator builds cognitive systems. They do not reteach what your child’s school already covered — they construct the thinking architecture that lets your child use what they already know at a higher level.',
  },
  {
    question: 'How is my child matched to their Navigator?',
    answer: 'Matching is based on three inputs: baseline Lexile score from the entrance assessment, 6+1 Trait writing entry level, and the parent diagnostic call. We match cognitive profile, not personality. Your child’s Navigator is selected for their ability to guide your child’s specific thinking development — not to be their friend.',
  },
  {
    question: 'Will my child have the same Navigator for all 16 weeks?',
    answer: 'Yes. Consistency is non-negotiable. Changing Navigators mid-program disrupts the trust required for cognitive risk-taking. If a match is incorrect, we address it in week 2 — not week 10.',
  },
  {
    question: 'What are Navigators’ academic backgrounds?',
    answer: 'Every Navigator holds a graduate degree in education, linguistics, or a related field. Most have prior experience teaching bilingual students. All are trained in The Loop methodology and certified in Lexile assessment administration.',
  },
  {
    question: 'How does a Navigator track my child’s progress between sessions?',
    answer: 'Navigators review notes from the previous session before every meeting. They track question response patterns, depth of reasoning, and where your child pushed back or went quiet. This allows them to adjust the next session’s difficulty in real time — your child never repeats work they have already mastered.',
  },
  {
    question: 'What happens if my child and their Navigator aren’t the right fit?',
    answer: 'You will know by week 2. If the match is incorrect, we reassign within 48 hours. After week 4, reassignment becomes disruptive to progress and is only considered in exceptional circumstances. The diagnostic call exists to prevent mismatches — use it.',
  },

  // ── Results & Measurement ─────────────────────────────────────
  {
    question: 'What results can I expect after 16 weeks?',
    answer: 'One grade level of Lexile growth — 100L to 150L increase — over 16 weeks. This is the evidence base for what 16 weeks of structured, rigorous instruction produces. Your child will also show measurable improvement in 6+1 Trait writing scores, specifically in Ideas, Organization, and Voice.',
  },
  {
    question: 'What is a Lexile level and how is it measured?',
    answer: 'A Lexile level quantifies reading comprehension ability on a scale from 0L to 2000L. It is measured using standardized assessments that evaluate sentence complexity, vocabulary demand, and conceptual density. DODO uses MetaMetrics-certified Lexile assessment tools.',
  },
  {
    question: 'What is the 6+1 Trait writing framework?',
    answer: 'The 6+1 Trait framework measures seven dimensions of writing: Ideas, Organization, Voice, Word Choice, Sentence Fluency, Conventions, and Presentation. Each trait is scored independently on a 5-point rubric. DODO focuses on Ideas, Organization, and Voice during the 16-week program. The 6+1 Trait framework was developed by Education Northwest.',
  },
  {
    question: 'How much Lexile growth is realistic in 16 weeks?',
    answer: 'One grade level — 100L to 150L. This is achievable for students starting between Lexile 400L and 1000L with consistent session attendance. Growth above 150L in 16 weeks is possible but not typical. Growth below 100L signals a mismatch between content difficulty and baseline ability — we adjust immediately.',
  },
  {
    question: 'When is my child assessed — and who does the assessment?',
    answer: 'Three times. Week 0: entrance assessment before the first session. Week 8: mid-program check. Week 16: exit assessment. All assessments are administered by your child’s Navigator using MetaMetrics-certified tools. Results are shared with you within 72 hours of each assessment.',
  },
  {
    question: 'What if my child doesn’t show measurable growth?',
    answer: 'If your child shows less than 50L growth by week 8, we initiate a diagnostic review. This involves a parent call, Navigator observation, and content difficulty audit. If the issue is engagement, we adjust. If the issue is developmental readiness, we defer enrollment to a later cohort and refund the remaining balance.',
  },
  {
    question: 'How does DODO’s measurement compare to what my child’s school reports?',
    answer: 'School grades measure compliance and effort. Lexile scores measure comprehension capacity. Your child may receive an A in English class while reading below grade level. DODO reports what your child can do — not how hard they tried.',
  },
  {
    question: 'Can I see the assessment results during the program — not just at the end?',
    answer: 'Yes. You receive a progress report after weeks 4, 8, 12, and 16. Each report includes Lexile trajectory, 6+1 Trait scores, and Navigator observations from the previous four weeks. You will never be surprised by the final assessment — you will have watched your child’s growth unfold across four data points.',
  },

  // ── Enrollment & Pricing ──────────────────────────────────────
  {
    question: 'How do I get started?',
    answer: 'It starts with a diagnostic consultation — 20 minutes with a Navigator, not a sales call. We measure your child’s Lexile level, identify the exact gaps, and show you what the first 16 weeks looks like for a student exactly like yours.',
  },
  {
    question: 'What does the 16-week program cost?',
    answer: 'Two enrollment tiers, both 16 weeks, both with full personalization included. Full Program — $2,250: three live sessions each week with your child’s Navigator (two 25-minute literacy sessions plus one 50-minute writing session). Literacy Foundation — from $1,185: two 25-minute literacy sessions each week. Both tiers include entrance, mid-program, and exit assessments, four progress reports, and full access to recorded session archives.',
  },
  {
    question: 'What is included in the enrollment fee?',
    answer: 'Everything. Sixteen weeks of live Navigator sessions (Full Program: three weekly sessions of two 25-minute literacy plus one 50-minute writing; Literacy Foundation: two 25-minute literacy sessions weekly). Entrance, mid-program, and exit assessments. Four progress reports. Recorded session archive. Personalization at every tier. No add-ons, no material fees, no hidden costs.',
  },
  {
    question: 'Are there any additional costs beyond the program fee?',
    answer: 'No. The enrollment fee covers the entire 16-week program. You will not be asked to purchase books, software licenses, or supplementary materials. If your child needs accommodations — extended session time, translated materials, assistive technology — those are included at no additional cost.',
  },
  {
    question: 'What is the payment structure?',
    answer: 'Two options. Lump sum at enrollment, or weekly payments starting at $74 per week. Both options are available for either tier.',
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'Full refund if you cancel before the first session. 50% refund if you cancel before week 4. No refund after week 4. If DODO initiates a program withdrawal due to lack of measurable progress, you receive a prorated refund for the remaining weeks.',
  },
  {
    question: 'Can I enroll mid-cohort?',
    answer: 'No. Every student begins at week 1. The Loop is a sequence — joining mid-program would require skipping phases, which undermines the methodology. If the current cohort has already started, you will be placed in the next available cohort.',
  },
  {
    question: 'Is there a waitlist?',
    answer: 'Only if the current cohort is full. DODO runs cohorts every 6–8 weeks in each city. If you are waitlisted, you receive priority placement in the next cohort and a 48-hour early enrollment window before general availability.',
  },
  {
    question: 'What happens after the 16 weeks — is there a renewal option?',
    answer: 'Yes. Students who complete the 16-week program and show measurable Lexile growth are eligible for Advanced Loop — a continuation program with elevated content difficulty. Enrollment details are shared during your week 16 exit assessment review.',
  },

  // ── Bilingual Development ─────────────────────────────────────
  {
    question: 'Does speaking Chinese at home hurt my child’s English development?',
    answer: 'No. Research shows that maintaining first-language proficiency strengthens second-language acquisition. The issue is not Chinese at home — it is fragmented cognitive development. If your child is learning English conversationally while thinking academically in Chinese, they develop two incomplete systems. DODO builds cognitive depth in English — and that depth protects both languages.',
  },
  {
    question: 'What is the difference between bilingual fluency and bilingual thinking?',
    answer: 'Bilingual fluency is the ability to speak two languages. Bilingual thinking is the ability to reason, analyze, and problem-solve in both languages. Your child may speak English fluently and still struggle with reading comprehension, essay construction, or abstract reasoning. Fluency is surface-level. Thinking is structural.',
  },
  {
    question: 'My child speaks English fluently — why do they still struggle academically?',
    answer: 'Because conversational fluency and academic cognition are not the same skill. Your child may navigate social situations in English while still processing complex texts, logical arguments, and written analysis in Chinese. DODO trains the cognitive architecture required for academic English — not the vocabulary required for casual conversation.',
  },
  {
    question: 'How does DODO approach the Chinese-English language relationship?',
    answer: 'DODO treats Chinese and English as interdependent cognitive systems — not competing languages. The Loop does not replace Chinese thinking with English thinking. It builds a cognitive framework where your child reasons academically in English at mastery level. That cognitive depth transfers back to Chinese. Thinking structure is portable.',
  },
  {
    question: 'At what age is this development most effective?',
    answer: 'Grades 3 through 8 — ages 8 to 14. This is the critical window when academic cognition consolidates. Before age 8, children are still developing basic literacy. After age 14, cognitive patterns are largely fixed. The Loop works because it acts during the exact developmental window when this cognitive architecture is still forming.',
  },
  {
    question: 'What does research say about bilingual academic performance?',
    answer: 'Students who develop academic proficiency in both languages outperform monolingual peers on measures of executive function, cognitive flexibility, and problem-solving. The advantage is not the bilingualism itself — it is the cognitive complexity required to manage two language systems simultaneously. DODO builds that complexity intentionally.',
  },
  {
    question: 'Will DODO help my child maintain their Chinese while improving their English?',
    answer: 'DODO does not teach Chinese. But by building English mastery at the cognitive level, it strengthens your child’s ability to operate in both languages. A student who can analyze a text, construct an argument, and write a structured essay in English can transfer those cognitive skills back to Chinese. The thinking structure is portable.',
  },

  // ── Cities & Scheduling ───────────────────────────────────────
  {
    question: 'What cities does DODO serve?',
    answer: 'DODO Learning serves Chinese-speaking diaspora families across major North American hubs — including Metro Vancouver (Vancouver, Richmond, Burnaby, Coquitlam), the Greater Toronto Area (Toronto, Markham, Richmond Hill, Mississauga), Calgary, the San Francisco Bay Area (San Jose, Cupertino, Fremont), Greater Los Angeles and the San Gabriel Valley, Orange County (Irvine), Seattle and Bellevue, New York City (Flushing, Manhattan), Boston and Cambridge, and Houston. The program is delivered online; students join from across their metropolitan region.',
  },
  {
    question: 'What timezone are sessions run in?',
    answer: 'Sessions are scheduled in your local timezone. Vancouver, Richmond BC, San Francisco, Los Angeles, Seattle, and other Pacific-coast cohorts run on Pacific Time. Calgary cohorts run on Mountain Time. Toronto, Markham, Boston, and New York cohorts run on Eastern Time. Houston cohorts run on Central Time. Your child will never need to attend a session outside of reasonable local hours.',
  },
  {
    question: 'Can students in different timezones join the same cohort?',
    answer: 'No. Cohorts are timezone-specific. A student in Vancouver cannot join a Toronto cohort. This ensures that all students in a cohort are working within compatible schedules.',
  },
  {
    question: 'How are sessions delivered — ClassIn, Zoom, or something else?',
    answer: 'Sessions are delivered through DODO’s proprietary platform, which integrates live video, screen sharing, collaborative annotation, and session recording. You do not need to install ClassIn, Zoom, or any third-party software. Everything runs in a browser.',
  },
  {
    question: 'What are the available session times?',
    answer: 'Weekday evenings (5:00 PM to 8:00 PM local time) and weekend mornings (9:00 AM to 12:00 PM local time). Exact session time is assigned during the diagnostic call based on your schedule and Navigator availability. Once assigned, session time remains fixed for all 16 weeks.',
  },
  {
    question: 'Do sessions run during school holidays?',
    answer: 'No. DODO observes major school holidays in each city — winter break, spring break, and summer holidays. If a holiday falls during your cohort, that week is skipped and the program extends by one week. You are notified of holiday adjustments at enrollment.',
  },
  {
    question: 'Is DODO available in cities not on the priority list?',
    answer: 'The program is delivered online and can serve students across North America. If your city is not currently a priority location, you can join a waitlist for future expansion. DODO will notify you when enrollment opens with a dedicated cohort in your area.',
  },
]
