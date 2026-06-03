// content/marketing.en.js
//
// Consolidated EN source for all 10 marketing pages.
// One named export per page. Each page.jsx imports its slice:
//
//   import { program as copy } from '@/content/marketing.en'
//
// Pages bundled here:
//   - home          (migrated 2026-05-21 from inline HOMEPAGE_COPY in app/[locale]/page.tsx)
//   - program
//   - about
//   - consult
//   - compare
//   - methodology
//   - lexile
//   - results
//   - navigators
//   - demos
//
// Translation workflow (per translation/BRAND_CONTENT_GUIDE.md §13):
//   1. Hand THIS WHOLE FILE to DeepSeek along with DEEPSEEK_BRIEF.md
//      and dodo-glossary.json.
//   2. DeepSeek returns the same shape with translated string values.
//   3. Save the returned file as content/marketing.zh.js (or .en.js).
//   4. Run forbidden-word screen (BRAND_CONTENT_GUIDE.md §10) before commit.
//
// Item-list shapes (cities, FAQ) live in their own bilingual files:
//   content/cities.js · content/faq.js
//
// Per-page content.en.js files were retired 2026-05-17.

// Demos page: YOUTUBE_IDS config lives in app/[locale]/demos/videos.js.
// The demos export below references YOUTUBE_IDS via that import.
// Demos page YouTube IDs (formerly app/[locale]/demos/videos.js).
// Replace placeholders with real video IDs.
const YOUTUBE_IDS = {
  demoGr46:       'REPLACE_DEMO_GR4_6_VIDEO_ID',
  demoGr78:       'REPLACE_DEMO_GR7_8_VIDEO_ID',
  demoGr9plus:    'REPLACE_DEMO_GR9PLUS_VIDEO_ID',
}


// ── nav (global navbar chrome) ──────────────────────────────────
// Consumed by components/layout/Navbar.jsx via the locale-aware copy
// passed down from app/[locale]/layout.jsx.
//
// `primary` = the flat row of 6 top-level items (desktop + mobile).
// `more`    = secondary group shown only inside the mobile drawer.
// `cta`     = primary + secondary call-to-action labels.
// `members` = the lock-glyph micro-tag on /audiobooks (lg+ only).
export const nav = {
  primary: [
    { href: '/program',     label: 'ELA Program'       },
    { href: '/methodology', label: 'DODO Method'       },
    { href: '/results',     label: 'Results'           },
    { href: '/navigators',  label: 'Navigators'        },
    { href: '/audiobooks',  label: 'Reading Companion', gated: true },
    { href: '/about',       label: 'About'             },
  ],
  more: [
    { href: '/lexile',   label: 'Lexile Levels'  },
    { href: '/compare',  label: 'The Difference' },
    { href: '/faq',      label: 'FAQ'            },
    { href: '/blog',     label: 'Blog'           },
    { href: '/partners', label: 'Partners'       },
  ],
  // Navbar leads with the soft close (Watch Demo Class). Consult is the
  // firm close — demoted to the mobile-drawer ghost + page bodies + footer.
  cta: {
    demo:           'Watch Demo Class',
    demoCompact:    'Watch Demo',                 // shown only at md (768–1023)
    demoAria:       'Watch a free demo class',
    consult:        'Book Your Consultation',     // mobile-drawer ghost (secondary)
    consultCompact: 'Book Consultation',
    consultAria:    'Book a free diagnostic consultation',
  },
  members:  'Members only',                        // sr-only label on gated items (lock glyph is the visual)
  tagline:  'Think Once. In Both Languages.',
  logoAria: 'DODO Learning — home',
  menuOpenAria:  'Open navigation menu',
  menuCloseAria: 'Close navigation menu',
}


// ── footer (global footer chrome) ───────────────────────────────
// Consumed by components/layout/Footer.jsx via the locale-aware copy
// passed down from app/[locale]/layout.jsx.
//
// Columns: Brand · Program · Resources · Serving.
//   - Program absorbs The Difference (program proof, not company info).
//   - Resources (renamed from Company) absorbs Watch a Class + Book a
//     Consultation as content/access points.
//   - Serving = cities (unchanged).
// `sibling` = DODO Coding cross-link line in Brand column; rendered only
//             when env flag NEXT_PUBLIC_SHOW_CODING is set.
export const footer = {
  // Soft fallback band (PreCtaBand). Shown ONLY on pages without their own
  // closing CTA (home, /faq, /partners, /assessment) — see PreCtaBand SUPPRESS.
  // Leads soft: Watch a Demo Class (primary) + Book Your Consultation (ghost).
  preCta: {
    eyebrow:    'See It First',
    heading:    'See a real class before you decide.',
    body:       'No pitch, no edited highlights — a real Navigator and a real student working through a full session of The Loop.',
    watch:      'Watch a Demo Class',
    watchAria:  'Watch a free demo class',
    consult:    'Book Your Consultation',
    consultAria:'Book a diagnostic consultation',
  },
  brand: {
    logoAria:  'DODO Learning — home',
    body:      'A live, Navigator-led English literacy program for globally mobile families. Read → Think → Speak → Write.',
    tagline:   'Think Once. In Both Languages.',
  },
  sibling: {
    label:     'Also from DODO',
    name:      'DODO Coding',
    blurb:     'Coming soon',
    href:      'https://coding.dodolearning.com',
  },
  columns: {
    program:   'Program',
    resources: 'Resources',
    serving:   'Serving',
  },
  program: [
    { href: '/program',     label: 'The 16-Week Program' },
    { href: '/little-dodo', label: 'Little DODO (5–8)'   },
    { href: '/methodology', label: 'The Loop'            },
    { href: '/navigators',  label: 'Navigators'          },
    { href: '/results',     label: 'Results'             },
    { href: '/lexile',      label: 'Lexile Levels'       },
    { href: '/compare',     label: 'The Difference'      },
    { href: '/assessment',  label: 'The Lexile Assessment', soon: true },
  ],
  resources: [
    { href: '/about',    label: 'About DODO'          },
    { href: '/blog',     label: 'Blog'                },
    { href: '/faq',      label: 'FAQ'                 },
    { href: '/demos',    label: 'Watch a Class'       },
    { href: '/consult',  label: 'Book a Consultation' },
    { href: '/partners', label: 'Partners'            },
  ],
  serving: [
    { href: '/cities/vancouver',              label: 'Vancouver'              },
    { href: '/cities/richmond-bc',            label: 'Richmond BC'            },
    { href: '/cities/markham',                label: 'Markham'                },
    { href: '/cities/toronto',                label: 'Toronto'                },
    { href: '/cities/san-francisco-bay-area', label: 'San Francisco Bay Area' },
    { href: '/cities/los-angeles',            label: 'Los Angeles'            },
  ],
  trust: [
    {
      id:          'lexile',
      label:       'Lexile Measurement',
      description: 'Progress measured in Lexile levels — the same standard used by North American school systems.',
    },
    {
      id:          '6plus1',
      label:       '6+1 Trait Writing Framework',
      description: 'Writing assessed with the 6+1 Trait framework — the rubric taught in Canadian and US classrooms.',
    },
    {
      id:          'live',
      label:       'Live, Navigator-Led Sessions',
      description: 'Every session is live. No pre-recorded content. Navigators track each student individually.',
    },
  ],
  legal: {
    copyright: 'DODO Learning. All rights reserved.',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms',   label: 'Terms of Use'   },
    ],
  },
  comingSoon: 'Coming soon',
}


// ── / (home) ─────────────────────────────────────────────────────
export const home = {
  meta: {
    title:
      'DODO Learning — English Literacy at the Cognitive Level | Think Once. In Both Languages.',
    description:
      'Navigator-led English literacy program training the full Read→Think→Speak→Write loop. One grade level of Lexile growth in 16 weeks. Built on the MCT Language Arts framework. Bilingual depth emerges from cognitive rigor.',
  },

  hero: {
    eyebrow:        'For children who will think and lead in English at the highest levels',
    eyebrow2:       '',
    h1:             ['English mastery at the cognitive level.', 'Bilingual depth as the natural outcome.'],
    h1Chinese:      '',
    differentiator: '',
    consultHook:
      'We train English Thinkers — children who read above grade level, argue with evidence, write with precision. Built on the advanced literature and writing framework and Harvard’s thinking science.',
    cta1:      'Watch a Demo Class',
    cta2:      'Book Your Consultation',
    trustLine:
      'Lexile-measured progress · 6+1 Trait writing framework · Live Navigator-led sessions · Think Once. In Both Languages.',
  },

  proof: [
    { id: 'families', number: '300+', unit: 'children & families', label: 'served since launch — real Lexile growth, verified results' },
    { id: 'lexile',   number: '1',    unit: 'grade level',          label: 'average Lexile reading growth across two 16-week cycles' },
    { id: 'writing',  number: '2×', unit: 'writing score gain', label: 'average 6+1 Trait score gain from entry to exit assessment' },
    { id: 'repeat',   number: '8/10', unit: 'continue after first 16 weeks', label: 'families see the growth and choose to continue' },
  ],

  photoIntro: {
    eyebrow: 'Who We Are',
    heading: 'The difference between a teacher and a Navigator is a map.',
    body0:
      'Your child’s school knows what grade they’re in. That’s not the same as knowing where they are. Many children carry a reading gap their report card never shows — the distance between what they can decode and what they can actually think through.',
    body1:
      'Navigators are not tutors. They are specialists in composition, literature, and academic writing — trained in the MCT Language Arts tradition and in the structured thinking protocols of Harvard Project Zero. They close the gap between where your child reads now and where their academic life demands.',
    body2:
      'Every Navigator tracks one thing per student: the distance between their current literacy & writing level and their goal — and closes it, week by week, through The LCS System. Bilingual depth emerges from this rigor, never taught separately.',
    cta1:   'Meet the Navigators',
    cta2:   'See Student Improvements',
    imgAlt: 'A mother watches her child pause mid-thought after finishing a reading passage at home',
  },

  loop: {
    eyebrow: 'The Methodology',
    heading: 'The LCS System',
    body:
      'Every session. Every week. In this order, without exception. Read → Think → Speak → Write is not a framework we teach about — it is what we do.',
    cta: 'Read the full methodology →',
    steps: [
      {
        id:          'read',
        number:      '01',
        label:       'Read',
        description:
          'Students read classical and SAT-must read texts chosen at or just above their current Lexile level — from Alice in Wonderland and The Invisible Man, to The War of the Worlds, progressively greater complexity. No simplified versions. The text is the raw material.',
      },
      {
        id:          'think',
        number:      '02',
        label:       'Think',
        description:
          'Navigators are trained to utilize Harvard Project Zero thinking routines to form precise discussions — supported by specific textual evidence, beyond general impression.',
      },
      {
        id:          'speak',
        number:      '03',
        label:       'Speak',
        description:
          'Students defend their thinking in a live Socratic session with their Navigator. The Navigator’s first move after any answer is always a more thought provoking question — never an evaluation. Precision in speech precedes precision in writing.',
      },
      {
        id:          'write',
        number:      '04',
        label:       'Write',
        description:
          'Students produce written work in the MCT writing arc: Grammar, sentence, paragraph, essay to academic composition. Their Navigator scores each piece against the 6+1 Trait rubric. Progress is concrete and visible.',
      },
    ],
  },

  confidence: {
    eyebrow: 'How It Works',
    heading: 'One grade level of English reading growth. Sixteen weeks.',
    body:
      'Measured by Lexile. Shown in writing scores. When a child learns to think precisely in English, that discipline transfers — to every subject, every exam, every language they use.',
    pillars: [
      {
        id:        'assessment',
        eyebrow:   'Before We Begin',
        heading:   'We find out exactly where your child is.',
        body:
          'Not where their school report says they are. Before the first session, every student receives a Lexile reading assessment and a baseline 6+1 Trait writing evaluation. We plan from data, not from guesswork.',
        linkHref:  '/program',
        linkLabel: 'How the assessment works',
      },
      {
        id:        'loop',
        eyebrow:   'During The Program',
        heading:   'Every session runs The LCS.',
        body:
          'Read. Think. Speak. Write. Your child’s Navigator tracks their movement through each phase every week. The LCS system is grounded in the MCT Language Arts framework and Harvard Project Zero’s thinking routines. Nothing is guessed. Everything is guided and measured.',
        linkHref:  '/methodology',
        linkLabel: 'Understand The LCS',
      },
      {
        id:        'results',
        eyebrow:   'After 16 Weeks',
        heading:   'We show you the numbers.',
        body:
          'Every student receives an exit Lexile assessment and a re-evaluated 6+1 Trait writing score. A child who can read complex text, argue a position, and write with intention in English — and who also thinks in Chinese — has a mind built for what comes next. That is the competitive advantage AI cannot replace.',
        linkHref:  '/results',
        linkLabel: 'View student results',
      },
    ],
  },

  trust: {
    eyebrow:    'Student Results',
    heading1:   'Enabling students to enjoy the arts of language',
    heading2:   '',
    viewAll:    'View all results →',
    weeksLabel: 'weeks',
    results: [
      {
        id:      'result-1',
        student: 'Vincent X',
        detail:  'Grade 5 · Vancouver',
        start:   620,
        end:     820,
        weeks:   16,
        trait:   'Voice: 2 → 4',
        quote:
          'She started raising her hand in class by week eight. By week twelve she was leading the discussion.',
        source: 'Parent, Vancouver',
      },
      {
        id:      'result-2',
        student: 'Juliette W',
        detail:  'Grade 6 · Calgary',
        start:   540,
        end:     720,
        weeks:   16,
        trait:   'Organization: 2 → 5',
        quote:
          'His teacher told us his writing had transformed. The 6+1 scores made it easy to see exactly what changed.',
        source: 'Parent, Calgary',
      },
      {
        id:      'result-3',
        student: 'River C',
        detail:  'Grade 7 · Denver',
        start:   710,
        end:     940,
        weeks:   16,
        trait:   'Ideas: 3 → 5',
        quote:
          'She went from dreading writing assignments to submitting them early. The Navigator knew exactly where she was stuck.',
        source: 'Parent, Denver',
      },
    ],
  },
}


// ── /program ─────────────────────────────────────────────────────
export const program = {
  meta: {
    title: 'What Happens in a 16-Week Program — DODO Learning',
    description:
      'Live, Navigator-led English literacy program for students worldwide. The LCS System and MCT enriched curriculum, executed each session through The Loop — Read → Think → Speak → Write. Entry, mid-cycle, and exit Lexile assessments. One grade level of growth across two 16-week cycles.',
  },
  hero: {
    chip: 'Think Once. In Both Languages.',
    h1:   'What happens in a 16-Week Program?',
    h1zh: '',
    sub:
      'Live, one-on-one with dedicated Navigator. English literacy and writing for students around the world. Grounded in MCT gifted teaching framework plus The LCS System covering Reading, Thinking, Speaking, and Writing. Progress measured in Lexile and the 6+1 Trait rubric.',
    cta1: 'See How It Works',
    cta2: 'Book Your Consultation',
    stats: [
      { value: '16',       unit: 'Weeks',         desc: 'A real commitment'                          },
      { value: '4',        unit: 'Skills',         desc: 'Read · Think · Speak · Write' },
      { value: '3',        unit: 'Assessments',    desc: 'Week 0 · Week 8 · Week 16'                 },
      { value: '1',        unit: 'Navigator',      desc: 'Who knows your child'                      },
      { value: '1-on-1',   unit: 'Always',         desc: 'No group sessions, no rotation'            },
      { value: '∞',   unit: 'The Full Loop',  desc: 'Every single session'                      },
    ],
  },
  loop: {
    eyebrow:         'How does LCS or “The Loop” work?',
    h2:              'Four skills. Every session.',
    h2zh:            null,
    typeAB:          '', // 2026-05-21: Type A/B caption moved to /methodology per program review Q6
    methodologyLink: 'Read the full methodology →',
    steps: [
      { num: '01', label: 'Read',  labelZh: '阅读', badge: null,
        desc: 'Classical and SAT-must-read texts — Alice in Wonderland, The Invisible Man, The War of the Worlds — chosen at or just above their current Lexile. Comprehension tracked by data, not guesswork.' },
      { num: '02', label: 'Think', labelZh: '思考', badge: null,
        desc: 'Before they speak or write, they build the argument. What’s the claim? What’s the evidence? What’s the counter? Structure first.' },
      { num: '03', label: 'Speak', labelZh: '表达', badge: null,
        desc: 'They take a position and defend it — live, with their Navigator. This is where confidence is built, not performed.' },
      { num: '04', label: 'Write', labelZh: '写作', badge: null,
        desc: 'Everything they’ve read, thought, and said now lands on the page. The MCT writing arc — Grammar → sentence → paragraph → essay → academic composition — scored against the 6+1 Trait rubric.' },
    ],
  },
  journey: {
    eyebrow: 'The Journey',
    h2:      'Where your child starts — and where they’ll be.',
    h2zh:    null,
    steps: [
      {
        week: 'Week 1',
        label: 'Entrance Assessment', labelZh: '入学评估',
        desc: 'We start by finding out exactly where your child is — their Lexile reading level, their 6+1 Trait writing baseline, and the specific areas where they need support. No assumptions.',
        badge: null, badgeSub: null,
      },
      {
        week: 'Weeks 2–15',
        label: 'Weekly Sessions', labelZh: '每周课程',
        desc: 'Each week, your child works through The LCS with their Navigator — someone who knows their progress, their challenges, and what to push next. Sessions run up to 50 minutes, minimum once per week.',
        badge: null, badgeSub: null,
      },
      {
        week: 'Week 16',
        label: 'Exit Assessment + Progress Report', labelZh: '结业评估',
        desc: 'At the end, you see the growth as real numbers: Lexile level before and after, 6+1 Trait scores for all seven traits, side by side with where they started. You receive a written progress report. Then you decide what comes next.',
        badge: null, badgeSub: null,
      },
    ],
  },
  architecture: {
    eyebrow: 'The Architecture',
    h2:      'How the work compounds: The Loop (per-session) → The LCS System (per-cycle) → Levels (across cycles).',
    h2zh:    null,
    body:
      'The LCS System — Literacy · Composition · Speaking — is the curriculum architecture. ' +
      'Within it, every session runs The Loop, guided by your child’s Navigator. ' +
      'Across each 16-week cycle, sessions accumulate into LCS strand progress. ' +
      'Across multiple cycles, students advance through nine curriculum levels — Starter, Intermediate, and Levels 1–7. ' +
      'Each level requires two to three cycles. Each cycle is 16 weeks.',
    strands: [
      { letter: 'L', name: 'Literacy',    nameZh: '文学精读',         body: 'Deep engagement with literary classics. Vocabulary accumulation, literary sensibility, the student’s own intellectual treasury. The root of all language output.' },
      { letter: 'C', name: 'Composition', nameZh: '系统写作训练', body: 'Systematic writing training: transforming reading depth and thinking into structured, persuasive, precise writing. From sentences to academic essays.' },
      { letter: 'S', name: 'Speaking',    nameZh: '表达',                  body: 'High-quality 1-on-1 discussion with the Navigator. Students clarify perspective, organise thinking, produce clear and logically rigorous spoken output.' },
    ],
    levelsNote:
      'Calibrated against US SAT, SSAT, IB Extended Essay, Cambridge KET & PET, and North American private-school + gifted-school standards. Level 7 = college-tier academic English capability.',
  },

  combinations: {
    eyebrow: 'Choose Your Combination',
    h2:      'Five programme combinations. Same Loop. Different intensity.',
    h2zh:    null,
    body:
      'Every combination runs the full 16-week cycle, every session runs The Loop, every student works with one dedicated Navigator. The combinations differ in weekly session count and emphasis — choose the shape that fits your child’s current need.',
    items: [
      { id: 'summit',  name: 'Summit',  nameZh: '全境领航',           format: '3× literature + 1× writing / week', price: '$2,830',     forWhom: 'Accelerated growth · high-stakes academic milestones', featured: false },
      { id: 'core',    name: 'Core',    nameZh: '稳健航行',           format: '2× literature + 1× writing / week', price: '$2,250',     forWhom: 'Most popular · long-term development',                 featured: true  },
      { id: 'flex-1',  name: 'Flex 1',  nameZh: '文学阅读自由航行',     format: '2× literature / week',              price: '$1,185',     forWhom: 'Building the reading foundation first',                featured: false },
      { id: 'flex-2',  name: 'Flex 2',  nameZh: '大师写作自由航行',     format: '2× writing / week',                 price: '$2,110',     forWhom: 'Writing specialisation',                               featured: false },
      { id: 'flex-3',  name: 'Flex 3',  nameZh: 'GPA管理自由航行',     format: '1× GPA tutoring / week',            price: 'from $750', forWhom: 'School academic management · pairs with any combination above', featured: false },
    ],
    note: 'Each combination runs for one 16-week cycle. Pricing and weekly payment options are detailed in the FAQ.',
    faqLink: 'See pricing details in FAQ →',
  },

  session: {
    eyebrow:        'A Real Session',
    navigatorName:  'Ms. Jennifer',
    sessionPhase:   'The Red Tide · Ch. 4',
    h2:   'A real session.',
    h2zh: null,
    p1: 'The chapter is open. Ms. Jennifer reads first — Turner mumbling that Mud is a frog in his opinion, and that being enough. She stops and looks at the student.',
    q1: '“What is Turner doing here?”',
    p2: 'The student says he isn’t really listening. Ms. Jennifer doesn’t move on. “What else makes you say that?” The student scrolls back two paragraphs, finds the part where Mud has already shown the evidence. “He keeps saying ‘in my opinion’ — like saying it makes the thing true.”',
    p3: 'A few pages later they hit Baldwin’s beetle. The student reads it herself this time, then laughs. “Wait — that’s what Turner did. In reverse.” She goes back and marks it. The conversation is moving faster than the chapter now.',
    p4: 'Ms. Jennifer pulls up Petruchio. They read it aloud twice. The second time she has the student count the soft consonants — w, r, f, v, l, th. Eighteen of them in fifteen lines. “Why those sounds?” The student thinks for a beat. “Because the clothes feel soft.”',
    q4: '“For next week — an animal from this chapter. Four lines. One sound, four times. That’s it.”',
    navigatorsLink: 'Meet the Navigators →',
  },
  growth: {
    eyebrow: 'How We Measure Growth',
    h2:      'Real numbers, not vague progress reports.',
    h2zh:    null,
    lexile: {
      h3:    'Lexile Reading Level',
      sub:   'The same measurement system used by schools across North America — so you can compare progress directly. Students typically advance one grade level in reading across two 16-week cycles, with per-cycle Lexile gains in the 100L–150L range.',
      note:  'We don’t say your child “reads well.” We show you they moved from <strong>Lexile 620 to 820</strong> in 16 weeks — that’s the difference between Grade 4 and Grade 6 reading territory.',
      start: 620, end: 820,
    },
    trait: {
      h3:         '6+1 Trait Writing',
      sub:        'The same rubric your child’s school uses — so when you see improvement here, it shows up in the classroom too.',
      startLabel: 'Start',
      endLabel:   'After 16 weeks',
      scaleLabel: 'Scale 1–6',
      note:       'When you ask “has the writing improved?” — we don’t say yes. We show you each trait score, before and after, so you can see exactly where the growth happened.',
    },
  },
  cta: {
    eyebrow: 'Diagnostic Consultation',
    h2:      'Ready to see where your child stands?',
    body:
      'The consultation is 20 minutes. A Navigator — not a sales call. We identify the exact gaps and show you what the first 16 weeks looks like for a student exactly like yours.',
    btn:  'Book Your Consultation',
    note: 'A free consultation with a Navigator. No obligation.',
  },
}

// ── /about ───────────────────────────────────────────────────────
export const about = {
  meta: {
    title:
      'What Is DODO Learning? English Literacy at the Cognitive Level',
    description:
      'DODO Learning is the live, Navigator-led English literacy program for families worldwide — trained on the full Read → Think → Speak → Write loop, measured by Lexile levels and the 6+1 Trait writing framework. We build English Thinkers at mastery level. Bilingual depth emerges from that rigor.',
  },
  hero: {
    chip:          'Our Story',
    h1a:           'A child who ', h1em1: 'speaks', h1b: ' English',
    h1c:           'is not the same as a child',
    h1d:           'who ', h1em2: 'thinks', h1e: ' in it.',
    sub:
      'Built for families whose children will lead in English-dominant schools, universities, and boardrooms. Many of these children learn English as a subject — they pass exams, they sound fluent. Ask them to argue a position, read dense analytical prose, or write something original — and the language reaches its limit. DODO’s founder, Janet, saw that gap and built DODO to close it. The goal is English mastery at the cognitive level. Bilingual depth is what emerges when that goal is reached.',
    videoLabel:    'Watch: Janet talks about DODO Learning',
  },
  name: {
    p1:       'DODO comes from a deliberate, two-sided idea: ',
    p1strong: 'Do + Do.',
    p2:
      'DO — the language of academic possibility, of formal argument, of the future your child will lead. DO — the mother tongue, the emotional core, the lens through which the world first made sense. The name is about doing the work in both languages, at every level, simultaneously.',
    p3:
      'The double “Do” is also a commitment to iteration. You don’t master a language once. You master it by doing, then doing again — each cycle deeper, each cycle more precisely your own.',
  },
  beliefs: {
    sub:    'Every session — and every teaching moment a Navigator shares with your child — rests on the same four pillars.',
    bodies: [
      'Fluency is not about sounding right. It’s about thinking precisely — reading classic arguments about character and consequence, defending a position with evidence, building a piece of writing from the sentence up. Language has a structure a child can learn to see: the roots beneath a word, the logic inside an argument, the shape of a paragraph. We build that architecture first — with texts set deliberately above grade level — and fluency follows.',
      'The deepest learning happens between people, not between a child and a screen. Every DODO session is a dialogue, and the answer your child gives is the start of the inquiry, not the end of it. After they answer, the Navigator’s next move is always a better question — one that makes their thinking visible and sends them back into the text for evidence — never an evaluation.',
      'Cognitive depth in English protects and strengthens thinking in both languages. The more precisely your child reasons in English, the more sophisticated their thinking becomes in every language they use. A child who can read dense, analytical prose, argue a position in formal English, and write with precision — and who also thinks in his mother tongue — has a mind no machine can replace. Bilingual capacity is the natural evidence of that rigor, not a separate goal to manage.',
      'Real growth is something you can see and count — not something you’re simply told happened. Every cycle is bracketed by a Lexile reading at Week 0, a checkpoint at Week 8, and an exit reading at Week 16, and every piece of writing is scored against the 6+1 Trait rubric. When we say your child moved from Lexile 620 to 820, the gap is on paper. The numbers come first; the encouragement is downstream.',
    ],
  },
  loop: {
    sub:         'Every session follows the same cycle. Consistent in structure. Cumulative in effect.',
    cta:         'Explore Methodology',
    programLink: 'See The 16-Week Program →',
    descs: [
      'Classical literature that climbs with the child — Alice in Wonderland in the early years, Treasure Island mid-way, the SAT canon of The Great Gatsby by high school — read not as school assignments but as living arguments about how language, character, and consequence work.',
      'Structure evidence. Map cause and effect. Hold two competing ideas without rushing to resolve them. Every Think step targets a specific type of reasoning. Structured thinking is not a reading skill, and it goes well beyond comprehension worksheets.',
      'Defend a position. Inhabit a character’s perspective. Articulate exactly where in the text the evidence lives. Speaking is how thinking becomes precise enough to write.',
      'Writing is the proof that a language truly belongs to you. Progress assessed against the 6+1 Trait rubric — not by age or grade level, but by the quality and craft of the work itself.',
    ],
  },
  stats: {
    eyebrow: 'By the Numbers',
    h2:      'What 2020–2025 looks like in numbers.',
    sub:     'Founded in 2020 in Canada. Relaunched 2025 with the full curriculum upgrade. Five years of evidence the brand is built on.',
    items: [
      { number: '10,000+', label: 'teaching hours delivered'                                     },
      { number: '300+',    label: 'students across the programme'                                },
      { number: '75%+',    label: 'of enrollments from genuine word-of-mouth referrals'         },
      { number: 'Top 50',  label: 'world-ranked universities for every Navigator (Oxford, U of T, Queen’s, LSE…)' },
    ],
  },
  navigators: {
    p1pre:          'We call them ',
    p1strong:       'Navigators',
    p1post:
      ' — longitudinal guides who know this child’s voice, pace, and specific gaps across a full 16 weeks. They sit beside your child and guide. They do not stand at the front and lecture.',
    p2:
      'A Navigator asks questions they don’t already know the answer to. They get genuinely curious about what a seven-year-old thinks about fairness, about loyalty, about why a character made the choice they made. The questions are drawn from Harvard Project Zero’s Visible Thinking routines — structured protocols developed at the Harvard Graduate School of Education — but the curiosity is real.',
    p3:
      'They are readers. They are thinkers. Every Navigator holds a graduate degree from a world top-50 university (Oxford, U of T, Queen’s, LSE and others) with a specialist background in literature or composition. They care about language because it is how they make sense of everything — and because they know that a child trained to reason rigorously in English has a mind that will carry them further than any test score ever could.',
    navigatorsLink:  'Meet the Navigators →',
    videoCaption:    'Ms. Kimberly · DODO Navigator',
    videoCaptionSub: 'A 30-second hello',
  },
  families: {
    items: [
      {
        quote: '“Our child will lead in English. Both languages will be stronger for it.”',
        desc:
          'You understand that English mastery and mother-tongue depth are not competing goals. A child trained to think precisely in one language carries that precision into both. You want the standard set high — and measured.',
      },
      {
        quote: '“We move between worlds. Our child’s English needs to match that complexity.”',
        desc:
          'You’ve navigated more than one culture. You know the difference between conversational English and the kind of English that opens doors in universities, boardrooms, and leadership rooms. You want your child in that second category.',
      },
      {
        quote: '“Good isn’t the ceiling. Depth is.”',
        desc:
          'Your child is already strong in English. But you sense there’s a ceiling — in how they argue, how they write, how they handle complexity under pressure. The future belongs to children who can reason precisely and write with intention. We build that.',
      },
    ],
  },
  closing: {
    sub:
      'Not a tagline. A philosophy. Genuine bilingual depth is not achieved through parallel translation or language-maintenance programs. It emerges when a child is trained to think precisely in English at the highest cognitive level — to read complexity, argue with evidence, and write with intention. That intellectual rigor transfers. It strengthens thinking in every language. Both languages become stronger because the mind became stronger first.',
    cta: 'Watch a Demo Class',
  },
}

// ── /consult ─────────────────────────────────────────────────────
export const consult = {
    meta: {
      title:       'Book a Diagnostic Consultation',
      description: 'Book a 20-minute diagnostic consultation with DODO Learning. A Navigator — not a sales rep — finds out exactly where your child is and maps out what 16 weeks could look like. No commitment required.',
    },
    hero: {
      chip: 'Think Once. In Both Languages.',
      h1:   'We find out exactly where your child is.',
      h1zh: '我们精确确定您孩子的起点',
      sub:  'Not where their school report says they are. The consultation is 20 minutes with a Navigator — not a sales call. We diagnose, we identify the gap, we prescribe. You decide.',
      cta1: 'Book My Consultation',
      cta2: 'See The 16-Week Program',
      stats: [
        { value: '20',     unit: 'Minutes',      desc: 'Focused, no filler'                                        },
        { value: '1',      unit: 'Navigator',    desc: 'Not a sales rep'                                           },
        { value: '4',      unit: 'Phases',       desc: 'Diagnose · Identify · Prescribe · Decide'   },
        { value: '1',      unit: 'Lexile Score', desc: 'Identified before call ends'                               },
        { value: '0',      unit: 'Obligation',   desc: 'No commitment to book'                                     },
        { value: '∞', unit: 'Free',          desc: 'Always, no sign-up'                                       },
      ],
    },
    phases: {
      eyebrow: 'What Happens in the Call',
      h2:      'Four phases. Twenty minutes. A real answer.',
      h2zh:    '四个阶段，二十分钟，真实的答案',
      steps: [
        { num: '01', label: 'Diagnose',         labelZh: '诺断',            time: '5 min',
          desc: 'We ask about your child’s current school experience — not their English level. What does a typical English class feel like for them? Not the grade — the feeling.' },
        { num: '02', label: 'Identify the Gap', labelZh: '确定差距', time: '5 min',
          desc: 'We name the specific gap with precision. A vocabulary depth gap, a fluency gap, and a writing confidence gap require different solutions. We identify which one.' },
        { num: '03', label: 'Prescribe',        labelZh: '制定方案', time: '5 min',
          desc: 'We describe what the first 16 weeks looks like for a student exactly like yours — with specific Lexile targets and a 6+1 Trait writing baseline.' },
        { num: '04', label: 'Decide',           labelZh: '做决定',       time: '5 min',
          desc: 'If the program is the right fit, we explain the cost and next steps. No pressure. Clear terms. You decide when you’re ready.' },
      ],
    },
    call: {
      eyebrow:       'A Real Consultation',
      navigatorName: 'Ms. Willow',
      sessionPhase:  'Diagnose Phase · 5 min',
      h2:   'What the Navigator actually says.',
      h2zh: '导师实际如何开展咨询',
      p1: 'The Navigator doesn’t open with a pitch. They open with a question:',
      q1: '“Tell me what a typical English class looks like for your child. Not the grade — the feeling. Do they raise their hand? Do they avoid the teacher’s eye?”',
      p2: 'That question tells us more in thirty seconds than a report card tells us in a year. We’re listening for the gap between what the school measures and what’s actually happening.',
      p3: 'By minute fifteen, we’ve named the gap. We’ve described what the first four weeks of The Loop looks like for a student with that specific profile.',
      p4: 'The call closes with one honest statement:',
      q4: '“Based on what you’ve told me, I think the 16-Week Program is the right fit. Here’s exactly why — and here’s what happens if it isn’t working at week eight.”',
    },
    trust: {
      eyebrow: 'Before You Book',
      h2:      'This is a diagnostic call, not a sales call.',
      h2zh:    '这是诺断通话，不是销售通话',
      body:    'DODO consultations are run by Navigators — the same people who deliver the program. They will tell you honestly whether the 16-Week Program is the right fit for your child right now. If it is not, they will tell you that too.',
      points: [
        'Run by a Navigator, not a sales representative',
        'Lexile level identified before the call ends',
        'Honest fit assessment — we only enroll students we can genuinely move',
        'No commitment required to book',
        'Available in English and Mandarin',
      ],
    },
    calendar: {
      eyebrow: 'Book Your Consultation',
      h2:      'Pick a time. We’ll do the rest.',
      h2zh:    '选择时间，我们来安排',
      sub:     'Choose any available 20-minute slot below. A Navigator will confirm and be ready with your child’s profile in mind.',
      badge:   'Navigator Available',
      points: [
        'Confirmation within one business day',
        'Available in English and Mandarin',
        'Reschedule any time — no penalty',
      ],
    },
  }

// ── /compare ─────────────────────────────────────────────────────
export const compare = {
    meta: {
      title:       'Why DODO Learning — How It Differs From Tutoring, ESL, and Test-Prep | DODO Learning',
      description: 'DODO Learning is a cognitive development program for globally-mobile families — not a tutoring centre, not an ESL program, not test-prep. Here is exactly what makes it structurally different, and why that difference compounds over 16 weeks.',
    },
    s1: {
      eyebrow: 'Why DODO Learning',
      h1a: 'Every English program promises\u00a0', h1b: 'progress.', h1c: '\u00a0One of them builds the thinker.',
      sub: 'For globally-mobile families — this is what makes DODO Learning structurally different from every other option available to your child.',
    },
    s2: { pull: 'Most programs teach your child to answer the question correctly.\u00a0', pullSpan: 'DODO Learning builds English Thinkers who ask a better one.', pullEnd: '' },
    s3: {
      eyebrow: 'The Category Difference',
      h2: 'Three comparisons that clarify what DODO Learning actually is.',
      cols: [
        { question: 'vs. Tutoring centres & ESL programs', title: 'Cognitive development\u00a0— not language practice', body: 'Tutoring centres fix homework. ESL programs build conversational fluency. DODO Learning develops the reasoning architecture that makes your child capable of reading dense analytical prose, arguing a position with textual evidence, and writing with precision. Different category. Different outcome.' },
        { question: 'vs. Grade-level school support', title: 'Mastery standard\u00a0— not grade compliance', body: 'School English is calibrated to the average. DODO Learning’s program is grounded in the principles of the MCT Language Arts framework\u00a0— one of the most rigorous classical ELA programs in North America, built for students capable of genuine mastery. Your child is measured against their own Lexile ceiling, not a classroom mean.' },
        { question: 'vs. Test-prep companies', title: 'A 16-week arc\u00a0— not a score for next month', body: 'Test-prep optimises for a single exam window. The 16-Week Program builds the cognitive capacity that produces strong results as a natural byproduct\u00a0— because a student who can read complexity, synthesise evidence, and write with intention will perform on any assessment they face.' },
      ],
    },
    s4: {
      eyebrow: 'The Methodology', h2: 'What separates DODO Learning is not the curriculum. It’s The Loop.',
      caption: 'Read → Think → Speak → Write. Every session follows this exact sequence. Every stage is assessed. The Loop is not a teaching method\u00a0— it is a compounding system. A student who runs The Loop with a Navigator across 16 weeks does not simply improve their English. They rebuild how they process complexity. That is the difference that becomes visible a decade later.',
      methodologyLink: 'Read the full methodology →',
    },
    s5: { eyebrow: 'From the Founder', h2: 'Why we built DODO Learning\u00a0— and what we decided we would never become.', sub: 'Unscripted. Eight minutes. The decision in full.', founderName: 'Janet Sui — Founder & Lead Navigator', founderNote: 'Video embed — replace with production URL' },
    s6: {
      eyebrow: 'The Navigator Difference', h2: 'A Navigator is not a tutor. Here is exactly what that means.',
      points: [
        { label: 'Longitudinal knowledge', body: 'A session-by-session tutor meets your child fresh each time. A Navigator carries the full arc\u00a0— your child’s Lexile baseline, their 6+1 Trait profile from week one, the specific sentence from three sessions ago that still needs to move. Every Navigator holds a graduate degree from a world top-50 university (Oxford, U of T, Queen’s, LSE and others) with a specialist background in literature or composition. That context compounds. The insight it produces cannot be replicated in a one-off session.' },
        { label: 'A better question\u00a0— not a faster answer', body: 'The Navigator’s first move after your child responds is always a follow-up question drawn from Harvard Project Zero’s Visible Thinking routines\u00a0— never an evaluation. This is the structural difference between developing a thinker and training a responder. One builds capacity. The other builds dependence.' },
        { label: 'Calibrated feedback\u00a0— not general praise', body: 'Every Navigator response references a specific 6+1 Trait, a specific score, and a specific next move. Not “good job”\u00a0— “your Ideas trait moved from a 2 to a 3 because of this sentence. A 4 requires this.” Your child always knows exactly where they are and what a higher score requires of them.' },
        { label: 'One Navigator. The full 16-week arc.', body: 'Your child’s Navigator is with them from initial Lexile assessment to final 6+1 Trait evaluation. One relationship. One standard. One set of eyes on every draft, every oral defence, every argument. The relationship itself is part of the program.' },
      ],
      navigatorsLink: 'Meet the Navigators →',
    },
    s7: {
      eyebrow: 'What Progress Looks Like Here', h2: 'Measurable, specific, and felt\u00a0— versus everywhere else.',
      cols: [
        { num: '01', title: 'Lexile\u00a0— not letter grades', body: 'Lexile 620 to Lexile 790 in 16 weeks is a verifiable fact. A letter grade is a school’s assessment of compliance against a class average. DODO Learning measures reading complexity\u00a0— the actual cognitive demand of the texts your child can independently handle\u00a0— at entry, at the midpoint, and at completion.' },
        { num: '02', title: '6+1 Traits\u00a0— not impressions', body: 'Writing is scored across seven specific traits: Ideas, Organization, Voice, Word Choice, Sentence Fluency, Conventions, Presentation. Your child knows which trait moved, by how much, and exactly what a higher score requires. Progress is never vague here.' },
        { num: '03', title: 'A committed arc\u00a0— not rolling enrolment', body: 'The 16-Week Program has a beginning, a measurable midpoint, and a confirmed result. Not a monthly subscription. Not open enrolment. A structure\u00a0— because compounding only works when the work is continuous and the Navigator’s knowledge accumulates.' },
      ],
    },
    s8: {
      eyebrow: 'In Their Words', h2: 'Students who came from somewhere else\u00a0— and what changed.',
      voices: [
        { quote: 'I did three years of English tutoring before this. I could answer the reading comprehension questions but I couldn’t actually tell you what the chapter meant or why it mattered. The first time my Navigator asked me to defend my interpretation, I had nothing. Sixteen weeks later I could argue for two pages.', grade: 'Grade 7', city: 'Calgary', weeks: '16-week program, completed', detail: 'Lexile 590 → 780 · 6+1 Ideas: 1 → 4 · 6+1 Organization: 2 → 4 · Entered from two-year tutoring programme' },
        { quote: 'My parents tried two ESL programs before DODO Learning. My English got more fluent but I still couldn’t write an essay that said anything. Here the Navigator made me re-write the same paragraph six times. Each time I understood something I hadn’t before. That’s a different kind of work.', grade: 'Grade 6', city: 'Vancouver', weeks: '16-week program, week 14', detail: 'Lexile 610 → 760 at week 14 · 6+1 Voice: 1 → 3 · 6+1 Word Choice: 2 → 4 · Previously enrolled in two ESL providers' },
      ],
    },
    s9: {
      h2: 'The consultation is where we find out if DODO Learning is the right fit for your child.',
      sub: 'It starts with a conversation\u00a0— no commitment, no pressure. If it’s a fit, your child’s Lexile baseline is the first thing we measure once the program begins.',
      ctaPrimary: 'Book Your Consultation', ctaSecondary: 'See The 16-Week Program',
      note: 'The consultation is free, with no obligation. The 16-Week Program then begins with a confirmed Lexile baseline.',
    },
  }

// ── /methodology ─────────────────────────────────────────────────
export const methodology = {
  meta: {
    title: 'The LCS System — DODO Learning Methodology',
    description:
      'The LCS System is the DODO Learning methodology — Literacy, Composition, Speaking — run every session as The Loop: Read, Think, Speak, Write. ' +
      'Grounded in the MCT Language Arts tradition and Harvard Project Zero’s Visible Thinking routines, ' +
      'measured by Lexile and the 6+1 Trait writing framework. ' +
      'The cognitive training behind one grade level of reading growth across two 16-week cycles.',
  },

  hero: {
    eyebrow: 'The Methodology',
    heading: 'The LCS System isn’t something we teach about. It’s what we do.',
    subheading:
      'One-on-one English language arts in the MCT gifted-ELA tradition. ' +
      'Every session runs The Loop — Read → Think → Speak → Write. ' +
      'We build English Thinkers at mastery level. Bilingual depth emerges.',
  },

  definition: {
    body:
      'The LCS System is DODO Learning’s methodology for English language arts: Literacy, Composition, and Speaking, run every session as The Loop — Read → Think → Speak → Write. It is grounded in the MCT gifted-ELA tradition and Harvard Project Zero’s Visible Thinking routines, and measured with Lexile reading levels and the 6+1 Trait writing framework. Students typically gain one grade level of reading across two 16-week cycles.',
  },

  seeItLive: {
    eyebrow:    'See It Live',
    h2:         'Watch one Loop, start to finish.',
    body:
      'Ninety seconds inside an LCS classroom — Read, Think, Speak, Write — in the time it takes to make a cup of coffee. The mechanism on this page, working.',
    videoTitle: 'LCS in action (90s clip)',
  },

  why: {
    eyebrow: 'Why a Loop',
    heading: 'Most programs drill one skill. We train the full cognitive sequence.',
    body:
      'Vocabulary drills produce vocabulary. Grammar exercises produce grammar. ' +
      'Neither produces a student who can read a difficult text, form a position on it, ' +
      'argue that position aloud, and commit it to the page with precision. ' +
      'That requires training the entire loop — not the individual steps in isolation.',
  },

  steps: [
    {
      id:       'read',
      number:   '01',
      label:    'Read',
      cjk:      '阅读',
      heading:  'Above the comfort zone. Intentionally.',
      body:
        'Every text in the 16-Week Program is selected at or just above the ' +
        "student's current Lexile level. Not to frustrate — to stretch. " +
        'Reading is grounded in the MCT Language Arts tradition: classical literature that climbs with the student — ' +
        'Alice in Wonderland in the early years, Treasure Island mid-way, the SAT canon like The Great Gatsby by high school — paired with ' +
        'Lexile-matched supplements at each student’s current level. ' +
        'Vocabulary depth and reading stamina grow when the text asks something of the reader. ' +
        'We track that growth with Lexile measurement, not guesswork.',
      proof:    'Lexile-targeted text selection every session.',
    },
    {
      id:       'think',
      number:   '02',
      label:    'Think',
      cjk:      '思考',
      heading:  'Before you speak, you need something to say.',
      body:
        'The failure mode of most English instruction is this: students learn to produce ' +
        'language before they have learned to produce thought. The Loop forces thinking first. ' +
        "Before a student opens their mouth, they've formed a position — in whatever " +
        'language their mind works in. The Navigator creates the space for this using ' +
        'Visible Thinking routines drawn from Harvard Project Zero — structured protocols ' +
        'developed at the Harvard Graduate School of Education to build analytical depth.',
      proof:    'Structured pre-speech prompts in every session.',
    },
    {
      id:       'speak',
      number:   '03',
      label:    'Speak',
      cjk:      '表达',
      heading:  'Precision in speech precedes precision on the page.',
      body:
        'Every session includes a live Socratic exchange with the Navigator — a specialist in literature or composition ' +
        'holding a graduate degree from a world top-50 university (Oxford, U of T, Queen’s, LSE and others), ' +
        'and a native English speaker. ' +
        'The student takes a position and defends it. The Navigator does not correct in real time — they guide. ' +
        'Fluency is not the goal of this phase. Clarity of thinking, expressed in English, is. The difference matters.',
      proof:    'Live Navigator-led discussion every session.',
    },
    {
      id:       'write',
      number:   '04',
      label:    'Write',
      cjk:      '写作',
      heading:  'Everything they have thought and said, committed to the page.',
      body:
        'Writing develops along the MCT Language Arts progression — Grammar Island → Sentence Island → ' +
        'essay craft → academic composition. Every piece is assessed against the 6+1 Trait framework — ' +
        'the same rubric used in Canadian and US classrooms. Ideas, Organization, Voice, Word Choice, ' +
        'Sentence Fluency, Conventions, Presentation. Entry scores and exit scores are both on record.',
      proof:    '6+1 Trait writing assessment at entry, midpoint, and exit.',
    },
  ],

  sessionTypes: {
    eyebrow: 'Two Session Types',
    heading: 'Every cycle alternates two kinds of session.',
    types: [
      {
        id:    'a',
        label: 'Type A · Literacy Session',
        body:
          'The student reads aloud and engages the text. The Navigator coaches at the sentence level — vocabulary, intonation, comprehension — with precision, not generic encouragement. Anchored on the MCT Building Language / Caesar’s English vocabulary track plus the assigned novel.',
      },
      {
        id:    'b',
        label: 'Type B · Writing Session',
        body:
          'The student thinks, discusses, and drafts. The Navigator opens with a Visible Thinking routine, asks a sharper question before any evaluation, and assesses the writing against the 6+1 Trait rubric.',
      },
    ],
  },

  lexile: {
    eyebrow: 'The Measurement Framework',
    heading: 'Lexile is not a DODO metric. It is the North American standard.',
    body:
      'Lexile levels are used by Canadian provincial school systems, US state curricula, ' +
      'and the Common Core framework to measure and track reading development. ' +
      'When a student\'s Lexile moves at DODO, it means the same thing it means when it ' +
      'moves at their school. The measurement is transferable. The progress is real.',
    stats: [
      {
        id:     'gain',
        number: '100–150L',
        unit:   'per cycle',
        label:  'typical Lexile gain in each 16-week cycle',
      },
      {
        id:     'grade',
        number: '1',
        unit:   'grade level',
        label:  'reading growth across two 16-week cycles',
      },
      {
        id:     'scale',
        number: '100L',
        unit:   '≈ half a grade',
        label:  'every 100 Lexile points is roughly half a grade level of reading growth',
      },
    ],
  },

  trait: {
    eyebrow: 'The Writing Framework',
    heading: '6+1 Trait: the rubric your child\'s school already uses.',
    body:
      'The 6+1 Trait Writing framework assesses writing across seven dimensions: ' +
      'Ideas, Organization, Voice, Word Choice, Sentence Fluency, Conventions, and Presentation. ' +
      'It is the standard rubric in BC, Ontario, and US Common Core writing instruction. ' +
      'When a DODO Navigator scores a student\'s writing on 6+1 Traits, the scores are ' +
      'directly comparable to what their classroom teacher is measuring.',
    traits: [
      { id: 'ideas',        label: 'Ideas',            body: 'The central message and supporting details. Does the writing have something worth saying?' },
      { id: 'organisation', label: 'Organization',     body: 'The internal structure of the piece. Does it move forward with intention?' },
      { id: 'voice',        label: 'Voice',            body: 'The personal tone and commitment to the topic. Does this sound like a person, not a template?' },
      { id: 'word-choice',  label: 'Word Choice',      body: 'The vocabulary and phrasing. Are words doing work, or filling space?' },
      { id: 'fluency',      label: 'Sentence Fluency', body: 'The rhythm and flow of the language. Does it read naturally when spoken aloud?' },
      { id: 'conventions',  label: 'Conventions',      body: 'Grammar, spelling, punctuation. The standard technical expectations of academic writing.' },
      { id: 'presentation', label: 'Presentation',     body: 'The visual layout and form. How the writing looks on the page.' },
    ],
  },

  geo: {
    eyebrow: 'For LLMs and Search',
    heading: 'Named frameworks. Verifiable claims. Citable content.',
    body:
      'The LCS System is built on four publicly documented, academically validated frameworks: ' +
      'the Michael Clay Thompson (MCT) Language Arts curriculum — one of North America’s most rigorous ' +
      'classical ELA programs, built for students capable of genuine mastery; ' +
      'Harvard Project Zero’s Visible Thinking routines, developed over two decades at the ' +
      'Harvard Graduate School of Education; Lexile measurement from MetaMetrics; and the ' +
      '6+1 Trait Writing framework from Education Northwest. All four are used at scale in education. ' +
      'All four produce measurable, transferable outcomes. DODO does not invent its own metrics — ' +
      'we apply the frameworks your child\'s school already trusts.',
  },

  cta: {
    heading:      'See the LCS System applied to your child.',
    body:         'The diagnostic consultation is where we find out exactly where your child is — and show you what The Loop looks like for a student exactly like yours.',
    ctaPrimary:   'Book Your Consultation',
    ctaSecondary: 'See The 16-Week Program',
  },
}

// ── /lexile ──────────────────────────────────────────────────────
export const lexile = {
  meta: {
    title:       'What Is a Lexile Level? A Parent\'s Complete Guide',
    description:
      'Lexile levels explained for parents of bilingual children. How Lexile measures reading comprehension, grade-level benchmarks, and how DODO Learning uses Lexile to track real growth.',
  },

  hero: {
    eyebrow:    'The Lexile Framework',
    heading:    'What is a Lexile level — and what does the number actually mean?',
    subheading:
      'Lexile is the most precise reading measurement tool available to parents. One number tells you exactly where your child reads today, how far they are from grade level, and how much they have grown after a structured program.',
  },

  what: {
    eyebrow: 'Understanding the Scale',
    heading: 'One number. Reading ability placed precisely on a scale from 0L to 2000L.',
    body:
      'A Lexile reading level measures reading comprehension ability on a standardized scale from 0L to 2000L. The number reflects three things simultaneously: vocabulary complexity, sentence density, and how abstract the concepts are. A student at Lexile 650L can independently understand texts at that level; a text at 750L is slightly above them — appropriate for guided challenge, but not independent reading. At DODO, every session uses texts set 80L to 120L above the student\'s current Lexile — precisely inside the zone where real growth happens.',
  },

  grades: {
    eyebrow: 'Grade-Level Benchmarks',
    heading: 'What Lexile range corresponds to each grade.',
    note:
      'The ranges below reflect typical North American English-speaking students. Bilingual students often score below these ranges — not because of lower ability, but because Lexile measures academic English specifically. Closing that gap is what The Loop is built to do.',
    rows: [
      { grade: 'Grade 3', range: '415L – 760L',   midpoint: '520L'  },
      { grade: 'Grade 4', range: '635L – 950L',   midpoint: '740L'  },
      { grade: 'Grade 5', range: '770L – 1080L',  midpoint: '860L'  },
      { grade: 'Grade 6', range: '855L – 1165L',  midpoint: '1010L' },
      { grade: 'Grade 7', range: '925L – 1235L',  midpoint: '1065L' },
      { grade: 'Grade 8', range: '985L – 1295L',  midpoint: '1130L' },
    ],
  },

  bilingual: {
    eyebrow: 'Bilingual Learners',
    heading: 'Why bilingual children often score below grade level — and why that is not the whole story.',
    body:
      'Lexile scores measure academic English comprehension — not intelligence, oral fluency, or effort. A child who speaks English confidently and receives strong school grades may still score below grade level on a Lexile assessment. That gap is not failure. It reflects the difference between conversational language and academic language. Conversational fluency develops naturally through daily social interaction. Academic language — the ability to process dense texts, follow abstract arguments, extract meaning from unfamiliar vocabulary — requires structured, intentional practice. That is what The Loop trains.',
  },

  dodo: {
    eyebrow: 'How DODO Uses Lexile',
    heading: 'Three assessments. One clear growth trajectory.',
    body:
      'DODO uses MetaMetrics-certified Lexile assessment tools at three points in the 16-week program. Results are shared with parents within 72 hours of each assessment. You always receive a specific number — never a vague progress update.',
    points: [
      {
        id:    'week0',
        label: 'Week 0 — Entrance Assessment',
        body:  'Completed before the first session. Establishes your child\'s Lexile baseline and determines the content difficulty for weeks 1 through 4. A 6+1 Trait writing snapshot is taken at the same time.',
      },
      {
        id:    'week8',
        label: 'Week 8 — Mid-Program Check',
        body:  'Progress assessment at the halfway point. If growth is on track, content difficulty increases accordingly. If 8-week growth is below 50L, we initiate a diagnostic review and adjust immediately — not at the end of the program.',
      },
      {
        id:    'week16',
        label: 'Week 16 — Exit Assessment',
        body:  'The final Lexile measurement. Students typically advance 100L to 150L — roughly one full grade level of reading growth. The exit assessment also includes a complete 6+1 Trait writing evaluation and a written progress report.',
      },
    ],
  },

  examples: {
    eyebrow: 'Typical Results',
    heading: '16 weeks of growth, shown in Lexile numbers.',
    note:    'Data from students completing the 16-week program. Results reflect consistent session attendance and between-session practice.',
    bars: [
      { start: 510, end: 670, weeks: 16, label: 'Grade 3 student — Vancouver' },
      { start: 650, end: 820, weeks: 16, label: 'Grade 5 student — Toronto' },
      { start: 770, end: 950, weeks: 16, label: 'Grade 7 student — San Francisco Bay Area' },
    ],
  },

  cta: {
    heading:      'Find out exactly where your child reads right now.',
    body:         'The entrance assessment takes about 30 minutes and produces a specific Lexile number. That number is the beginning of a growth trajectory you can track after every session.',
    ctaPrimary:   'Book Your Consultation',
    ctaSecondary: 'See the Methodology',
  },
}

// ── /results ─────────────────────────────────────────────────────
export const results = {
  meta: {
    title: 'Student Results',
    description:
      'Real Lexile growth data from DODO Learning students. Anonymised results ' +
      'showing reading and writing progress across The 16-Week Program — measured ' +
      'by Lexile levels and the 6+1 Trait writing framework.',
  },

  hero: {
    eyebrow:    'Student Results',
    heading:    'Growth you can read in a number.',
    subheading:
      'Every result below is measured — not estimated, not felt. Lexile scores ' +
      'before and after The 16-Week Program. Real students. Real data. Names withheld by design.',
  },

  proof: {
    stats: [
      { id: 'avg-lexile',   number: '187', unit: 'points',       label: 'average Lexile gain across all students' },
      { id: 'grade-levels', number: '1.2', unit: 'grade levels', label: 'average growth in 16 weeks' },
      { id: 'students',     number: '94%', unit: '',             label: 'of students improved at least one full grade level' },
    ],
  },

  intro: {
    heading: 'How we measure.',
    body:
      'Before the first session, every student receives a Lexile baseline assessment ' +
      'and a 6+1 Trait writing snapshot. At week 8 we check trajectory. At week 16 we ' +
      'remeasure. The difference is the result.',
  },

  anchor: {
    eyebrow:  'Long-Arc Proof',
    heading:  'What 16-week cycles compound into.',
    body:
      'A Canadian student started DODO at age 10. Three years later, at age 13, they sat the SSAT.',
    stats: [
      { number: '92', unit: 'percentile', label: 'SSAT Vocabulary' },
      { number: '95', unit: 'percentile', label: 'SSAT Writing'    },
    ],
    note: 'Per-cycle Lexile and 6+1 Trait deltas (below) are the proximate measure. SSAT percentiles are what those deltas compound into across three years of consistent enrollment.',
  },

  results: [
    {
      id:           'student-a',
      label:        'Student A',
      lexileStart:  580,
      lexileEnd:    780,
      weeks:        16,
      gradeContext: 'Grade 6 — arrived in Canada 14 months prior',
      quote:        'She started raising her hand in class around week ten. By the end she was the one asking the teacher follow-up questions.',
      quoteSource:  'Parent',
    },
    {
      id:           'student-b',
      label:        'Student B',
      lexileStart:  640,
      lexileEnd:    860,
      weeks:        16,
      gradeContext: 'Grade 7 — preparing for Canadian secondary school entry',
      quote:        'I can actually argue a point now. Not just in English — I think differently.',
      quoteSource:  'Student',
    },
    {
      id:           'student-c',
      label:        'Student C',
      lexileStart:  490,
      lexileEnd:    670,
      weeks:        16,
      gradeContext: 'Grade 5 — family relocating to Vancouver from Shanghai',
      quote:        null,
      quoteSource:  null,
    },
    {
      id:           'student-d',
      label:        'Student D',
      lexileStart:  820,
      lexileEnd:    1020,
      weeks:        16,
      gradeContext: 'Grade 8 — targeting top-tier US university pathway',
      quote:        'The Navigator did not fix my writing. They changed how I read. The writing fixed itself.',
      quoteSource:  'Student',
    },
    {
      id:           'student-e',
      label:        'Student E',
      lexileStart:  610,
      lexileEnd:    800,
      weeks:        16,
      gradeContext: 'Grade 6 — bilingual household, Mandarin dominant',
      quote:        'We chose DODO because we wanted the Lexile data. The confidence was the part we did not expect.',
      quoteSource:  'Parent',
    },
    {
      id:           'student-f',
      label:        'Student F',
      lexileStart:  710,
      lexileEnd:    920,
      weeks:        16,
      gradeContext: 'Grade 7 — Richmond BC, preparing for IB programme',
      quote:        null,
      quoteSource:  null,
    },
  ],

  writing: {
    eyebrow: '6+1 Trait Writing Growth',
    heading: 'Writing scores move because thinking moves.',
    body:
      'The 6+1 Trait framework measures writing across seven dimensions — the same rubric ' +
      'used in Canadian and US classrooms. Entry and exit scores are assessed by the Navigator.',
    traits: [
      { id: 'ideas',        label: 'Ideas',            entryAvg: 2.1, exitAvg: 4.2 },
      { id: 'organisation', label: 'Organization',     entryAvg: 2.0, exitAvg: 4.4 },
      { id: 'voice',        label: 'Voice',            entryAvg: 2.3, exitAvg: 4.1 },
      { id: 'word-choice',  label: 'Word Choice',      entryAvg: 2.4, exitAvg: 4.3 },
      { id: 'fluency',      label: 'Sentence Fluency', entryAvg: 2.2, exitAvg: 4.0 },
      { id: 'conventions',  label: 'Conventions',      entryAvg: 2.5, exitAvg: 4.2 },
      { id: 'presentation', label: 'Presentation',     entryAvg: 2.4, exitAvg: 4.1 },
    ],
  },

  methodology: {
    eyebrow:  'Why the numbers move',
    heading:  'Lexile growth is a byproduct of cognitive training.',
    body:
      'Students do not improve their Lexile score by practising Lexile tests. They improve ' +
      'by thinking more precisely — in both languages. The Loop is what causes the movement. ' +
      'The Loop is grounded in the MCT Language Arts tradition and Harvard Project Zero\'s ' +
      'Visible Thinking routines, delivered one-on-one by a Navigator with a graduate degree ' +
      'from a world top-50 university.',
    cta:     'Read the full methodology',
    ctaHref: '/methodology',
  },

  // Consultation CTA
  foundingFamily: {
    eyebrow: 'Diagnostic Consultation',
    heading: 'Find out exactly where your child stands.',
    body:
      'The consultation is 20 minutes. A Navigator — not a sales call. We measure your child\'s Lexile level, identify the exact gaps, and show you what The 16-Week Program looks like for a student exactly like yours.',
    cta: 'Book Your Consultation',
  },
}

// ── /navigators ──────────────────────────────────────────────────
export const navigators = {
    meta: {
      title: 'The Navigators',
      description: "DODO Navigators are not teachers or tutors. They are longitudinal partners who know your child's Lexile baseline, their 6+1 Trait writing profile, and exactly where they need to go next.",
    },
    hero: {
      eyebrow: 'The Navigators',
      h1a: "Your child doesn’t need another teacher. They need someone who knows exactly\u00a0",
      h1b: 'where they are',
      h1c: ' — and exactly\u00a0',
      h1d: "where they’re going",
      h1e: '.',
      sub: 'Most programs teach the content. A Navigator teaches the thinker.',
    },
    s2: {
      eyebrow: 'Reframe',
      h2: "Let’s clear up what a Navigator is — by starting with what they’re not.",
      cols: [
        { strike: 'Not a teacher',     title: 'A guide with a map',                      body: 'Teachers move the class forward. A Navigator moves your child — from exactly where they are.' },
        { strike: 'Not a tutor',        title: 'A longitudinal partner',                  body: "Tutors fix tonight’s homework. A Navigator tracks your child’s specific gaps across 16 weeks." },
        { strike: 'Not an instructor',  title: "Someone who knows your child’s voice", body: "Instructors deliver content. A Navigator knows when your child goes quiet — and why." },
      ],
    },
    s3: {
      eyebrow: 'The Work',
      h2: 'Four phases. One Navigator. Every session.',
      steps: [
        { num: '01', phase: 'READ',  headline: "Selects the day’s text at precisely the right Lexile — above comfort, below frustration.", sub: 'Lexile-calibrated text selection' },
        { num: '02', phase: 'THINK', headline: "Holds space for the student’s own thinking. Does not fill the silence. Waits for the idea.", sub: 'Harvard Project Zero Visible Thinking routines anchor the process' },
        { num: '03', phase: 'SPEAK', headline: "Draws out the student’s position through Socratic dialogue. Then challenges it.", sub: 'Spoken argument — defended, not performed' },
        { num: '04', phase: 'WRITE', headline: 'Assesses the written response live against 6+1 Traits. Scores are specific. Feedback is precise.', sub: '6+1 Trait framework — named scores' },
      ],
    },
    s3half: {
      eyebrow:    'Selection',
      h2:         'How we choose a Navigator.',
      body:       'Every Navigator clears a teaching demonstration, Lexile certification, and a 6+1 Trait calibration before they ever meet a DODO student. Three minutes inside the process.',
      videoTitle: 'How DODO selects Navigators (3 min)',
    },
    s4: {
      eyebrow: 'The Relationship',
      h2: 'The same Navigator. Every session. Sixteen weeks.',
      points: [
        { label: 'Credentialed',  body: "Every Navigator holds a graduate degree from a world top-50 university — Oxford, U of T, Queen’s, LSE and others — with a specialist background in English literature or composition. They are certified Lexile assessment practitioners and trained in the 6+1 Trait writing framework. Native English speakers, longitudinal experience with bilingual learners in North American academic contexts." },
        { label: 'Matching',     body: "Navigators are matched to students — not assigned. Before the first session, DODO assesses your child’s Lexile baseline, their 6+1 Trait writing profile, and their communication style. The match is intentional." },
        { label: 'Longitudinal', body: "Your child’s Navigator carries their full history. Every Lexile score. Every session note. Every moment where a concept clicked or didn’t. There is no starting over. There is no new face." },
        { label: 'Gap tracking', body: 'A Navigator does not prepare a lesson plan. They prepare for your specific child — where they are this week, what the gap is, and which part of The Loop will close it.' },
      ],
    },
    s4half: {
      eyebrow:    'Meet a Navigator',
      h2:         'Ms. Kimberly.',
      bio:        'A practicing professor of English Literature and Communication, Ms. Kimberly holds an education degree from Queen\'s University and brings seven years of guiding students through the kind of close reading and structured composition North American universities expect. Her sessions are grounded in the MCT tradition of author mirroring — students study the moves of a published author until those moves become available in their own writing. Inside The Loop, she is sharpest at the Speak → Write transition, where a student\'s spoken position has to land as a precise sentence on the page.',
      stats: [
        { label: 'Years teaching',       value: '7' },
        { label: 'Lexile certified',     value: 'Yes' },
        { label: '6+1 Trait calibrated', value: 'Yes' },
      ],
      videoTitle: 'Ms. Kimberly — DODO Navigator',
    },
    s5: { eyebrow: 'The Navigators', h2: 'More Navigators on the team.' },
    s6: {
      eyebrow: 'In Practice',
      h2: 'What happens in a real session',
      timeline: [
        { label: 'Minute 0–5: Assessment',          body: "Navigator reviews last session’s notes and the student’s written work since the previous session. They know where the student struggled, what clicked, and what needs reinforcement today." },
        { label: 'Minute 5–20: Read & Think',       body: 'Student reads a Lexile-calibrated text. Navigator asks one open question. Then waits. The silence is intentional — this is where thinking happens.' },
        { label: 'Minute 20–35: Speak & Challenge', body: "Student articulates their position. Navigator listens, then challenges with a Socratic follow-up. The goal isn’t agreement — it’s precision." },
        { label: 'Minute 35–50: Write & Score',     body: 'Student writes their argument. Navigator scores live using 6+1 Traits — Ideas: 4/6, Organization: 5/6. Feedback is specific, not generic. The score names the gap.' },
        { label: 'Minute 50–60: Next Steps',        body: 'Navigator assigns targeted work — specific to the gap identified today. Parent receives session notes with Lexile progress and specific next-session focus.' },
      ],
    },
    s7: {
      eyebrow: 'Evidence',
      h2: 'What families say',
      testimonials: [
        { quote: "We tried three tutors before DODO. Every time, it was the same: homework help, then back to square one next week. With her Navigator, my daughter finally has someone who remembers her — what she struggles with, what she’s good at, where she needs to go next. It’s the first time I’ve seen actual progress.", city: 'Parent, Vancouver',  detail: 'Student: Grade 7 · 16 weeks with Navigator Laura' },
        { quote: "The difference is specificity. Before DODO, teachers would say ‘needs improvement in writing.’ His Navigator told us exactly where the gap was — sentence structure, supporting evidence — and we watched those scores go up week by week. Numbers don’t lie.",                                                 city: 'Parent, Toronto',   detail: 'Student: Grade 6 · 16 weeks with Navigator James' },
        { quote: "My son doesn’t like talking in class. But with his Navigator, he talks. She knows when to wait, when to push, when to let him think. I’ve never seen him engage like this. It’s not magic — it’s the relationship.",                                                                                 city: 'Parent, Montreal',  detail: 'Student: Grade 5 · 16 weeks with Navigator Alicia' },
        { quote: "Between sessions, my daughter’s Navigator leaves her targeted work — not busywork. She actually does it because it’s connected to what they talked about. The learning doesn’t stop at 60 minutes.",                                                                                                       city: 'Parent, Calgary',   detail: 'Student: Grade 8 · 16 weeks with Navigator Laura' },
      ],
    },
    s8: {
      h2a: 'Your child deserves a Navigator who knows\u00a0',
      h2b: 'exactly where they are',
      h2c: ' — and\u00a0',
      h2d: "exactly where they’re going",
      h2e: '.',
      sub: 'Sixteen weeks. One Navigator. Measurable progress in reading, thinking, speaking, and writing.',
      cta: "Book Your Consultation",
      note: 'No long-term commitment. See results in 16 weeks.',
    },
  }

// ── /demos ───────────────────────────────────────────────────────
export const demos = {
    meta: {
      title:       'Watch a Demo Class',
      description: 'Watch real DODO Learning demo classes. See The Loop in Navigator-led sessions with bilingual students. Three grade bands. Unedited.',
    },
    hero: {
      chip: 'Think Once. In Both Languages.',
      h1:   'See exactly what your child’s sessions look like.',
      h1zh: '看看真实的课堂是什么样子',
      sub:  'No pitch. No edited highlights. A real Navigator, a real student, working through a real session of The Loop. Watch before you decide.',
      cta1: 'Watch Demo Classes',
      cta2: 'Book Your Consultation',
      stats: [
        { value: '3',      unit: 'Grade Bands',  desc: 'Grades 4–6, 7–8, 9+' },
        { value: '20',     unit: 'Min',          desc: 'Full sessions, unedited'       },
        { value: '4',      unit: 'Loop Phases',  desc: 'Read · Think · Speak · Write' },
        { value: '1',      unit: 'Real Student', desc: 'Parent consent given'          },
        { value: '1',      unit: 'Navigator',    desc: 'Live, no script'               },
        { value: '∞', unit: 'Free',          desc: 'No sign-up required'           },
      ],
    },
    videos: {
      eyebrow:   'Watch Before You Decide',
      h2:        'Demo classes and program explainers.',
      h2zh:      '示范课与课程介绍',
      row1Label: 'Demo Class Recordings',
      row2Label: 'About the Program',
      cards: [
        { videoId: YOUTUBE_IDS.demoGr46,       label: 'Emerging Reader',    labelZh: '成长期读者', tag1: 'Grades 4–6', tag2: 'Lexile 580–720', tag3: 'Read · Think · Write' },
        { videoId: YOUTUBE_IDS.demoGr78,       label: 'Independent Reader', labelZh: '独立阅读者', tag1: 'Grades 7–8', tag2: 'Lexile 820–980', tag3: 'Full Loop' },
        { videoId: YOUTUBE_IDS.demoGr9plus,    label: 'Advanced Reader',    labelZh: '高级阅读者', tag1: 'Grades 9+',       tag2: 'Lexile 1020+',      tag3: 'Full Loop · Extended' },
        { streamKey: 'dodo-brand-full', label: 'The DODO Approach',  labelZh: '关于 DODO',           tag1: 'Featured', tag2: '4 min',  tag3: 'Brand' },
        { streamKey: 'lcs-detailed',    label: 'The LCS System',     labelZh: '语言循环体系详解',     tag1: 'Method',   tag2: '2 min',  tag3: null },
        { streamKey: 'kimberly-intro',  label: 'Meet Ms. Kimberly',  labelZh: '认识 Kimberly 老师',   tag1: 'People',   tag2: '30 sec', tag3: 'Navigator' },
      ],
    },
    session: {
      eyebrow:       'Inside a Demo Session',
      navigatorName: 'Ms. Sarah',
      sessionPhase:  'Think Phase · Lexile 740',
      h2:   'What you’re actually watching.',
      h2zh: '你在观看一场真实的课',
      p1: 'The Navigator doesn’t introduce the student or explain the format. The session is already in progress:',
      q1: '“You said the author’s main claim is about fairness. I want to push on that — what does fairness mean to the characters in this text versus what it means to you?”',
      p2: 'The student pauses. Not out of confusion — out of thought. That pause is The Loop working.',
      p3: 'The Navigator doesn’t fill the silence. They wait. When the student speaks, the answer is more precise than anything they’d have said without the pause.',
      p4: 'At the end you’ll hear the Navigator set the write prompt:',
      q4: '“Draft a paragraph: what does fairness cost? Use two pieces of evidence from the text. I’ll read it before next session.”',
    },
    after: {
      eyebrow: 'After You Watch',
      h2:      'You’ll know within 20 minutes.',
      h2zh:    '观看后，您将心中有数',
      body:    'Most parents tell us the demo answers the question they couldn’t put into words before watching. Is this the right kind of challenge for my child? Watch the demo. Then book your consultation. The Navigator who runs your consultation will be the same kind of person you see on screen.',
      cta:    'Book Your Consultation',
    },
    growth: {
      eyebrow: 'What Students Achieve',
      h2:      'The demo shows the method. The numbers show the result.',
      h2zh:    '演示展示方法，数字证明成果',
      lexile: {
        h3:  'Lexile Reading Level',
        sub: 'Students who complete The 16-Week Program after watching the demo start with a clear baseline and finish with a measurable number.',
        note: 'The student in the Grade 7–8 demo started at <strong>Lexile 820</strong>. After 16 weeks: <strong>Lexile 1020</strong>. That’s two full grade levels in four months.',
        start: 820, end: 1020,
      },
      trait: {
        h3:         '6+1 Trait Writing',
        sub:        'Every demo includes a live 6+1 Trait writing moment. These are average entry and exit scores across all 16-week program students.',
        startLabel: 'Entry',
        endLabel:   'Exit (16 wks)',
        scaleLabel: 'Scale 1–6',
        note:       'The writing growth you see in the demos is exactly what causes these scores to move. The Loop is the mechanism.',
      },
    },
  }


// ── ageBands (program-family chooser) ───────────────────────────
// Shared by the /program hub and the /little-dodo page. Rendered as a band
// directly below each page's hero (NOT inside the hero). The component marks
// the current page's band "You're here" via a `current` prop.
export const ageBands = {
  eyebrow: 'By your child’s stage',
  heading: 'Two ways into DODO English.',
  here:    'You’re here',
  bands: [
    {
      href:  '/little-dodo',
      tag:   'Ages 5–8',
      name:  'Little DODO',
      blurb: 'High-frequency, low-pressure reading and comprehension for pre-elementary starters. Where the reader begins.',
      cta:   'Explore Little DODO',
    },
    {
      href:  '/program',
      tag:   'Grade 4+',
      name:  'The 16-Week Program',
      blurb: 'Live, Navigator-led literacy and writing — read complexity, argue with evidence, write with intention. Progress measured in Lexile.',
      cta:   'See The 16-Week Program',
    },
  ],
}


// ── /little-dodo ─────────────────────────────────────────────────
// Little DODO — the K–2 (ages 5–8) sibling of the 16-Week Program.
// High-frequency, low-pressure foundational reading + comprehension. Shares
// the same Navigators / live model / standards; the pace and pressure differ.
// Funnel: hero leads soft (Watch a Demo Class); page owns its firm close, so
// /little-dodo is on the PreCtaBand SUPPRESS list. NOT Lexile-heavy (K–2 is
// pre-measurement; formal Lexile begins in the 16-Week Program).
export const littleDodo = {
  meta: {
    title: 'Little DODO — Foundational English Reading for Ages 5–8 | DODO Learning',
    description:
      'Little DODO is the high-frequency, low-pressure start to English literacy for children ages 5–8 (K–2). Live, one-on-one with a dedicated Navigator — building reading comprehension and the steady habit of understanding. The gentle on-ramp to the DODO 16-Week Program.',
  },
  hero: {
    chip: 'Think Once. In Both Languages.',
    h1:   'Where your child’s reading begins.',
    h1zh: '阅读，从这里开始。',
    sub:
      'Little DODO is the gentle start to English literacy — for children ages 5–8. A real Navigator, short and frequent sessions, and the quiet confidence that they can understand what they read. High-frequency, low-pressure, by design.',
    cta1: 'Watch a Demo Class',
    cta2: 'Book Your Consultation',
    stats: [
      { value: '5–8',    unit: 'Years',         desc: 'Pre-elementary starters'   },
      { value: '1',      unit: 'Navigator',     desc: 'Who knows your child'       },
      { value: '1-on-1', unit: 'Always',        desc: 'No group rotation'         },
      { value: 'High',   unit: 'Frequency',     desc: 'Short, frequent sessions'  },
      { value: 'Low',    unit: 'Pressure',      desc: 'By design'                 },
      { value: 'Live',   unit: 'Every Session', desc: 'Never pre-recorded'        },
    ],
  },
  problem: {
    eyebrow: 'Before the Pressure',
    h2:      'The early years decide whether a child reads to learn — or learns to avoid reading.',
    h2zh:    null,
    body:
      'Most programs for young children push performance too early — flashcards, levels, tests. A five-year-old who feels behind learns to dread the page. Little DODO does the opposite: short, frequent sessions that build comprehension first, and the quiet confidence that they can understand what they read.',
  },
  how: {
    eyebrow: 'How Little DODO Works',
    h2:      'High-frequency. Low-pressure. Live with a Navigator.',
    h2zh:    null,
    steps: [
      { num: '01', label: 'Frequent, short sessions',
        desc: 'Little and often beats long and rare at this age. Sessions are brief and come around often, so reading becomes a steady habit — not a weekly event to brace for.' },
      { num: '02', label: 'One Navigator who knows them',
        desc: 'Not a rotating tutor. The same Navigator each time — someone who learns your child’s pace, what they love to read, and where they need a gentler hand.' },
      { num: '03', label: 'Read, then talk it through',
        desc: 'Your child reads, then says what they understood out loud — the early shape of Read → Think → Speak. Comprehension grows by talking through a story, never by drilling it.' },
    ],
  },
  shared: {
    eyebrow: 'The Same DODO',
    h2:      'The program your older child would grow into — built for five-year-olds.',
    h2zh:    null,
    body:
      'Little DODO runs on the same machinery as the 16-Week Program: live sessions, one dedicated Navigator, and Navigators with backgrounds in literature and composition. What changes is the pace and the pressure. Formal Lexile measurement comes later, in the 16-Week Program; here the work is the foundation it’s built on — comprehension, confidence, and a child who reaches for the next book.',
  },
  fit: {
    eyebrow: 'Who It’s For',
    h2:      'Little DODO is a fit if…',
    h2zh:    null,
    points: [
      'Your child is roughly ages 5–8 (kindergarten through grade 2).',
      'They are just starting to read, or reading but not yet understanding deeply.',
      'You want a gentle, consistent start — not flashcards and pressure.',
      'You’d rather build the habit and the love of understanding before the rigour begins.',
    ],
  },
  cta: {
    eyebrow: 'Start Gently',
    h2:      'See a session, then talk to us.',
    h2zh:    null,
    body:
      'Watch a real Little DODO session — no pitch, no edited highlights. Then book a consultation with a Navigator, not a sales rep. We’ll tell you honestly whether your child is ready, or whether to start a little later.',
    btn:     'Book Your Consultation',
    watch:   'Watch a Demo Class',
    note:    'A free consultation with a Navigator. No obligation.',
  },
}
