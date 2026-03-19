// content/en.js
//
// Central EN translation file.
// One named export per page — key structure must be mirrored exactly in zh.js.
//
// Usage:
//   import { program } from '@/content/en.js'   ← direct (rare)
//   const t = await getContent('en', 'program')  ← preferred (via lib/i18n.js)
//
// Adding a new page:
//   1. Add the named export here with all keys.
//   2. Add the matching export to content/zh.js.
//   3. Call getContent(locale, 'yourpage') in the page component.
//
// Page build order follows §1 of the handoff:
//   program ✓ | results | enroll | consult | methodology | faq
//   navigators | the-hangar | lexile | about | compare
//   cities (via citySchema, not a content key) | blog (MDX)

// ── Program ───────────────────────────────────────────────────
export const program = {
  meta: {
    title: 'The 16-Week Program',
    description:
      'A live, Navigator-led bilingual thinking program. Read, think, speak, and write in English — measured by Lexile levels and the 6+1 Trait writing framework. One grade level of growth in sixteen weeks.',
  },

  hero: {
    eyebrow:      'The 16-Week Program',
    heading:      'What does it take to think — and lead — in two languages?',
    subheading:
      'Not more vocabulary drills. Not another tutor. A structured methodology that trains the full cognitive loop: Read → Think → Speak → Write. Measured from day one.',
    ctaPrimary:   'Book Your Consultation',
    ctaSecondary: 'Watch a Demo Class',
  },

  proof: {
    stats: [
      {
        id:     'lexile',
        number: '1.2',
        unit:   'grade levels',
        label:  'average Lexile growth in 16 weeks',
      },
      {
        id:     'weeks',
        number: '16',
        unit:   'weeks',
        label:  'from baseline assessment to exit report',
      },
      {
        id:     'loop',
        number: '4',
        unit:   'phases',
        label:  'Read, Think, Speak, Write — every session',
      },
    ],
  },

  loop: {
    eyebrow: 'The Methodology',
    heading: 'The Loop runs in every session.',
    body:
      'Most English programs drill one skill in isolation. DODO trains the full cognitive sequence — because thinking in a language and performing in a language are not the same thing.',
    steps: [
      {
        id:          'read',
        number:      '01',
        label:       'Read',
        description:
          'Texts are selected above the student\'s current Lexile level — intentionally. We build vocabulary depth and reading stamina, not surface recognition.',
      },
      {
        id:          'think',
        number:      '02',
        label:       'Think',
        description:
          'Before speaking, students form a position. The Navigator uses structured prompts that activate both language registers — English and mother tongue simultaneously.',
      },
      {
        id:          'speak',
        number:      '03',
        label:       'Speak',
        description:
          'Ideas are articulated in structured Socratic discussion. Navigators guide — they do not correct in real time. Fluency comes from thinking first.',
      },
      {
        id:          'write',
        number:      '04',
        label:       'Write',
        description:
          'Students commit their thinking to the page. Writing is assessed using the 6+1 Trait framework — the same rubric used in Canadian and US classrooms.',
      },
    ],
  },

  structure: {
    eyebrow: 'Program Structure',
    heading: 'A beginning, a midpoint, and a measured end.',
    body:
      'The 16-Week Program is a commitment — not a subscription. It has a defined arc with three anchor points that keep students and families oriented.',
    phases: [
      {
        id:          'entrance',
        week:        'Week 1',
        label:       'Entrance Assessment',
        description:
          'Lexile baseline reading assessment and a 6+1 Trait writing snapshot. Before we begin, we find out exactly where your child is — not where their school says they are.',
      },
      {
        id:          'midpoint',
        week:        'Week 8',
        label:       'Midpoint Check-In',
        description:
          'Navigator review of Lexile trajectory and writing trait scores. Families receive a written progress note. The plan is adjusted if the pace needs to shift.',
      },
      {
        id:          'exit',
        week:        'Week 16',
        label:       'Exit Assessment',
        description:
          'Full Lexile re-measure and 6+1 Trait re-evaluation. Growth is quantified, visible, and documented. Then you decide what comes next.',
      },
    ],
  },

  lexile: {
    eyebrow: 'Measured Progress',
    heading: 'Every result is a number, not a feeling.',
    body:
      'Lexile levels are the same measurement standard used by North American school systems. When a student\'s Lexile moves, it means something specific.',
    example: {
      label:   'Typical 16-week result',
      start:   620,
      end:     820,
      weeks:   16,
      context: 'Grade 4 reading level to Grade 6 — one year of growth in four months.',
    },
  },

  navigators: {
    eyebrow: 'Your Child\'s Navigator',
    heading: 'Not a tutor. A guide who knows exactly where your child is going.',
    body:
      'Navigators are specialists in composition, literature, and academic writing. They work with the same students across all 16 weeks — no handoffs, no substitutes. Longitudinal. Personal. Expert.',
    credentials: [
      'Backgrounds in composition, literature, and academic writing',
      'Trained in the 6+1 Trait writing assessment framework',
      'Certified Lexile assessment practitioners',
      'Native or near-native English fluency',
      'Experience with bilingual learners in Canadian and US academic contexts',
    ],
  },

  hangar: {
    eyebrow: 'The Hangar',
    heading: 'Where DODO learners belong.',
    body:
      'The Hangar is the DODO community hub — Navigator-supported study sessions, peer discussion, and the shared identity of students who are building something real. Not homework help. Belonging.',
  },

  charter: {
    eyebrow: 'Charter Enrollment',
    heading: 'Charter families believe in DODO early.',
    body:
      'Charter Enrollment is for families who commit to the full 16-Week Program at the founding rate. It is not a promotional price. It rewards foresight — and it is available now.',
    cta:  'Reserve Your Charter Spot',
    note: 'Charter spots are limited per cohort. Consultation required before enrollment.',
  },
}

// ── Results ───────────────────────────────────────────────────
export const results = {
  meta: {
    title: 'Student Results',
    description:
      'Real Lexile growth data from DODO Learning students. Anonymised results showing reading and writing progress across The 16-Week Program — measured by Lexile levels and the 6+1 Trait writing framework.',
  },

  hero: {
    eyebrow:   'Student Results',
    heading:   'Growth you can read in a number.',
    subheading:
      'Every result below is measured — not estimated, not felt. Lexile scores before and after The 16-Week Program. Real students. Real data. Names withheld by design.',
  },

  intro: {
    heading: 'How we measure.',
    body:
      'Before the first session, every student receives a Lexile baseline assessment and a 6+1 Trait writing snapshot. At week 8 we check trajectory. At week 16 we remeasure. The difference is the result.',
    note:
      'All results are anonymised. Student identities are never shared. Lexile scores and writing trait ratings are real.',
  },

  stats: [
    {
      id:     'avg-lexile',
      number: '187',
      unit:   'points',
      label:  'average Lexile gain across all students',
    },
    {
      id:     'grade-levels',
      number: '1.2',
      unit:   'grade levels',
      label:  'average growth in 16 weeks',
    },
    {
      id:     'students',
      number: '94%',
      unit:   '',
      label:  'of students improved at least one full grade level',
    },
  ],

  results: [
    {
      id:           'student-a',
      label:        'Student A',
      context:      'Grade 6 — arrived in Canada 14 months prior',
      lexileStart:  580,
      lexileEnd:    780,
      weeks:        16,
      writingBefore: '6+1 Trait: Voice 2 / Organisation 2',
      writingAfter:  '6+1 Trait: Voice 4 / Organisation 4',
      quote:
        'She started raising her hand in class around week ten. By the end she was the one asking the teacher follow-up questions.',
      quoteAttribution: 'Parent',
    },
    {
      id:           'student-b',
      label:        'Student B',
      context:      'Grade 7 — preparing for Canadian secondary school entry',
      lexileStart:  640,
      lexileEnd:    860,
      weeks:        16,
      writingBefore: '6+1 Trait: Ideas 2 / Word Choice 2',
      writingAfter:  '6+1 Trait: Ideas 4 / Word Choice 5',
      quote:
        'I can actually argue a point now. Not just in English — I think differently.',
      quoteAttribution: 'Student',
    },
    {
      id:           'student-c',
      label:        'Student C',
      context:      'Grade 5 — family relocating to Vancouver from Shanghai',
      lexileStart:  490,
      lexileEnd:    670,
      weeks:        16,
      writingBefore: '6+1 Trait: Conventions 1 / Sentence Fluency 2',
      writingAfter:  '6+1 Trait: Conventions 3 / Sentence Fluency 4',
      quote:        null,
      quoteAttribution: null,
    },
    {
      id:           'student-d',
      label:        'Student D',
      context:      'Grade 8 — targeting top-tier US university pathway',
      lexileStart:  820,
      lexileEnd:    1020,
      weeks:        16,
      writingBefore: '6+1 Trait: Voice 3 / Organisation 3',
      writingAfter:  '6+1 Trait: Voice 5 / Organisation 5',
      quote:
        'The Navigator didn\'t fix my writing. They changed how I read. The writing fixed itself.',
      quoteAttribution: 'Student',
    },
    {
      id:           'student-e',
      label:        'Student E',
      context:      'Grade 6 — bilingual household, Mandarin dominant',
      lexileStart:  610,
      lexileEnd:    800,
      weeks:        16,
      writingBefore: '6+1 Trait: Ideas 2 / Voice 2',
      writingAfter:  '6+1 Trait: Ideas 4 / Voice 4',
      quote:
        'We chose DODO because we wanted the Lexile data. The confidence was the part we didn\'t expect.',
      quoteAttribution: 'Parent',
    },
    {
      id:           'student-f',
      label:        'Student F',
      context:      'Grade 7 — Richmond BC, preparing for IB programme',
      lexileStart:  710,
      lexileEnd:    920,
      weeks:        16,
      writingBefore: '6+1 Trait: Organisation 2 / Word Choice 3',
      writingAfter:  '6+1 Trait: Organisation 5 / Word Choice 5',
      quote:        null,
      quoteAttribution: null,
    },
  ],

  methodology: {
    eyebrow: 'Why Lexile',
    heading: 'The same standard North American schools use.',
    body:
      'Lexile levels are not a DODO-proprietary metric. They are the measurement framework used by Canadian and US school systems to track reading development. When we report a Lexile score, it means the same thing your child\'s school means when they report one.',
    points: [
      'Lexile measures are text-independent — the same scale applies across all reading material',
      'A 100-point Lexile gain correlates to approximately half a grade level of reading development',
      'The 6+1 Trait framework assesses writing across seven dimensions: Ideas, Organisation, Voice, Word Choice, Sentence Fluency, Conventions, and Presentation',
      'Both frameworks are used in BC, Ontario, and US Common Core curricula',
    ],
  },

  cta: {
    heading: 'See where your child is starting from.',
    body:
      'The entrance assessment is where every result begins. Book a consultation and we\'ll tell you exactly where your child\'s Lexile sits — and what 16 weeks looks like from there.',
    ctaPrimary:   'Book Your Consultation',
    ctaSecondary: 'See The Program',
  },
}


// ── Consult ───────────────────────────────────────────────────
export const consult = {
  meta: {
    title: 'Book a Diagnostic Consultation',
    description:
      'Book a 20-minute diagnostic consultation with DODO Learning. We find out exactly where your child is — not where their school says they are. No obligation.',
  },

  hero: {
    eyebrow:    'Diagnostic Consultation',
    heading:    'We find out exactly where your child is.',
    subheading:
      'Not where their school report says they are. The consultation is 20 minutes. A Navigator — not a sales call.',
    badge:      '20 minutes · No obligation',
  },

  what: {
    eyebrow: 'What Happens in the Call',
    phases: [
      {
        id:    'diagnose',
        time:  '5 min',
        label: 'Diagnose',
        body:  'We ask about your child\'s current school experience — not their English level. What does a typical English class feel like for them?',
      },
      {
        id:    'identify',
        time:  '5 min',
        label: 'Identify the Gap',
        body:  'We name the specific gap with precision. Vocabulary depth gap, fluency gap, and writing confidence gap require different solutions.',
      },
      {
        id:    'prescribe',
        time:  '5 min',
        label: 'Prescribe',
        body:  'We describe what the first 16 weeks looks like for a student exactly like yours — with specific Lexile targets.',
      },
      {
        id:    'commit',
        time:  '5 min',
        label: 'Decide',
        body:  'If Charter Enrollment is the right fit, we explain the founding rate and next steps. No pressure. Clear terms.',
      },
    ],
  },

  trust: {
    eyebrow: 'Before You Book',
    heading: 'This is a diagnostic call, not a sales call.',
    body:
      'DODO consultations are run by Navigators — the same people who deliver the program. They will tell you honestly whether the 16-Week Program is the right fit for your child right now. If it is not, they will tell you that too.',
    points: [
      'Run by a Navigator, not a sales representative',
      'Lexile level identified before the call ends',
      'Honest fit assessment — we only enroll students we can genuinely move',
      'No commitment required to book',
    ],
  },

  cta: {
    heading: 'Book your consultation.',
    body:    'Fill in the form and we will confirm a time within one business day.',
    form: {
      parentName:    'Parent or Guardian Name',
      email:         'Email Address',
      phone:         'Phone Number',
      childName:     'Child\'s Name',
      childGrade:    'Child\'s Current Grade',
      city:          'City',
      message:       'What is your main concern about your child\'s English right now?',
      submit:        'Book My Consultation',
      submitting:    'Submitting…',
      successTitle:  'We\'ll be in touch.',
      successBody:   'Expect a response within one business day to confirm your consultation time.',
      errorBody:     'Something went wrong. Please try again or email us directly.',
    },
  },
}

// ── Methodology ───────────────────────────────────────────────
// TODO: populate when building app/[locale]/methodology/page.jsx
export const methodology = {}

// ── FAQ ───────────────────────────────────────────────────────
// TODO: populate when building app/[locale]/faq/page.jsx
export const faq = {}

// ── Navigators ────────────────────────────────────────────────
// TODO: populate when building app/[locale]/navigators/page.jsx
export const navigators = {}

// ── The Hangar ────────────────────────────────────────────────
// TODO: populate when building app/[locale]/the-hangar/page.jsx
export const theHangar = {}

// ── Lexile ────────────────────────────────────────────────────
// TODO: populate when building app/[locale]/lexile/page.jsx
export const lexile = {}

// ── About ─────────────────────────────────────────────────────
// TODO: populate when building app/[locale]/about/page.jsx
export const about = {}

// ── Compare ───────────────────────────────────────────────────
// TODO: populate when building app/[locale]/compare/page.jsx
export const compare = {}

// ── Assessment ────────────────────────────────────────────────
// TODO: populate when building app/[locale]/assessment/page.jsx
export const assessment = {}

// ── Demos ─────────────────────────────────────────────────────
// TODO: populate when building app/[locale]/demos/page.jsx
export const demos = {}