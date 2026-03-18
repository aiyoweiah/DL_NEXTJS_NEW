// ── Results ───────────────────────────────────────────────────
// Replace the empty `export const results = {}` in content/en.js with this.

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