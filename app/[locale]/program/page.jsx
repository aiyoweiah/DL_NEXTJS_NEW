// app/[locale]/program/page.jsx
//
// The 16-Week Program — full visual rebuild to match pre-locale reference.
// Uses inline COPY pattern (bilingual EN/ZH) — same approach as about, navigators,
// the-hangar, and cities pages. Richer visual structure than the previous
// getContent() version.
//
// Sections (top → bottom):
//   1. Hero          — dark void, ticker strip, h1, 6 stat pills
//   2. Loop          — white, 4 compact step cards (Read/Think/Speak/Write)
//   3. Journey       — whisper, compact 3-step timeline + inline LexileBar
//   4. Session       — dark bg image, narrative overlay
//   5. Hangar        — dark, community CTA
//   6. Growth        — darker, Lexile scale + 6+1 Trait table
//   7. GetStarted    — light, diagnostic CTA
//   8. Charter       — dark, dual-CTA footer band

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import { courseSchema }                from '@/lib/schema'
import LexileBar                       from '@/components/ui/LexileBar'

// ─────────────────────────────────────────────────────────────
// STATIC STRUCTURAL DATA (no locale variants)
// ─────────────────────────────────────────────────────────────

// Lexile scale — top (1200L) to bottom (200L)
const LEXILE_SCALE = [
  { level: 1200, grade: 'Grade 12+' },
  { level: 1000, grade: 'Grade 9'   },
  { level:  800, grade: 'Grade 6'   },
  { level:  600, grade: 'Grade 4'   },
  { level:  400, grade: 'Grade 2'   },
  { level:  200, grade: 'Grade 1'   },
]

const TRAITS = [
  { id: 'ideas',        en: 'Ideas',            zh: '想法',     start: 2, end: 4 },
  { id: 'organisation', en: 'Organisation',     zh: '结构',     start: 2, end: 4 },
  { id: 'voice',        en: 'Voice',            zh: '声音',     start: 2, end: 4 },
  { id: 'word-choice',  en: 'Word Choice',      zh: '词汇选择',  start: 2, end: 5 },
  { id: 'fluency',      en: 'Sentence Fluency', zh: '句子流畅',  start: 3, end: 5 },
  { id: 'conventions',  en: 'Conventions',      zh: '写作规范',  start: 3, end: 4 },
  { id: 'presentation', en: 'Presentation',     zh: '呈现',     start: 2, end: 4 },
]

// ─────────────────────────────────────────────────────────────
// BILINGUAL COPY
// ─────────────────────────────────────────────────────────────

const COPY = {
  en: {
    meta: {
      title: 'The 16-Week Program',
      description:
        'A live, Navigator-led bilingual thinking program. Read, think, speak, and write in English — measured by Lexile levels and the 6+1 Trait writing framework. One grade level of growth in sixteen weeks.',
    },
    hero: {
      chip: 'Think Once. In Both Languages.',
      h1:   'A real plan for your child\u2019s next 16 weeks.',
      h1zh: '\u4e3a\u60a8\u5b69\u5b50\u5b9a\u5236\u7684\u5341\u516d\u5468\u6210\u957f\u8ba1\u5212',
      sub:
        'We start with a clear baseline \u2014 reading level, writing ability \u2014 and build from there. Every week is structured, tracked, and guided by a dedicated Navigator who knows your child by name.',
      cta1: 'See How It Works',
      cta2: 'Book Your Consultation',
      stats: [
        { value: '16', unit: 'Weeks',         desc: 'A real commitment'            },
        { value: '4',  unit: 'Skills',        desc: 'Read \u00b7 Think \u00b7 Speak \u00b7 Write' },
        { value: '2',  unit: 'Assessments',   desc: 'Before + After'              },
        { value: '1',  unit: 'Navigator',     desc: 'Who knows your child'        },
        { value: '1',  unit: 'Cohort',        desc: 'Small & intentional'         },
        { value: '\u221e', unit: 'The Full Loop', desc: 'Every single session'    },
      ],
    },
    loop: {
      eyebrow: 'How The Loop Works',
      h2:      'Four skills. Every session.',
      h2zh:    '\u56db\u9879\u6280\u80fd\uff0c\u8d2f\u7a7f\u6bcf\u5802\u8bfe',
      steps: [
        { num: '01', label: 'Read',  labelZh: '\u9605\u8bfb', badge: null,
          desc: 'Texts chosen above their comfort zone \u2014 just enough to stretch. Comprehension is tracked by Lexile level, not guesswork.' },
        { num: '02', label: 'Think', labelZh: '\u601d\u8003', badge: null,
          desc: 'Before they speak or write, they build the argument. What\u2019s the claim? What\u2019s the evidence? What\u2019s the counter? Structure first.' },
        { num: '03', label: 'Speak', labelZh: '\u8868\u8fbe', badge: null,
          desc: 'They take a position and defend it \u2014 live, with their Navigator. This is where confidence is built, not performed.' },
        { num: '04', label: 'Write', labelZh: '\u5199\u4f5c', badge: null,
          desc: 'Everything they\u2019ve read, thought, and said now lands on the page. Draft to revision \u2014 measurable improvement, every time.' },
      ],
    },
    journey: {
      eyebrow: 'The Journey',
      h2:      'Where your child starts \u2014 and where they\u2019ll be.',
      h2zh:    '\u4ece\u8d77\u70b9\u5230\u6210\u957f\u7684\u6e05\u6670\u8def\u5f84',
      steps: [
        { week: 'Week 1',       label: 'Entrance Assessment', labelZh: '\u5165\u5b66\u8bc4\u4f30',
          desc: 'We start by finding out exactly where your child is \u2014 their reading level, their writing strengths, and the specific areas where they need support. No assumptions.',
          badge: null, badgeSub: null },
        { week: 'Weeks 2\u201315', label: 'Weekly Sessions', labelZh: '\u6bcf\u5468\u8bfe\u7a0b',
          desc: 'Each week, your child works through The Loop with their Navigator \u2014 someone who knows their progress, their challenges, and what to push next.',
          badge: null, badgeSub: null },
        { week: 'Week 16',     label: 'Exit Assessment',    labelZh: '\u7ed3\u4e1a\u8bc4\u4f30',
          desc: 'At the end, you see the growth \u2014 not as a vague report card, but as real numbers. Lexile level, writing scores, side by side with where they started.',
          badge: null, badgeSub: null },
      ],
    },
    session: {
      eyebrow:       'A Real Session',
      navigatorName: 'Navigator Sarah',
      sessionPhase:  'Read Phase \u00b7 Lexile 740',
      h2:   'Here\u2019s what a typical Tuesday looks like.',
      h2zh: '\u4e00\u4e2a\u5178\u578b\u7684\u5468\u4e8c\u8bfe\u5802',
      p1: 'The Navigator opens by naming the phase:',
      q1: '\u201cToday we\u2019re in Read. Your text is at Lexile 740 \u2014 that\u2019s eight points above where you were last week. Let\u2019s see what you can do.\u201d',
      p2: 'Twenty minutes of structured reading. Not silent \u2014 annotated, questioned, discussed together.',
      p3: 'Then comes Think. The Navigator asks: what\u2019s the author\u2019s argument? Do you agree? What\u2019s the strongest counter?',
      p4: 'The session closes looking forward:',
      q4: '\u201cNext week is Speak. You\u2019ll defend your position out loud. Start getting ready.\u201d',
    },
    hangar: {
      eyebrow: 'The Hangar',
      h2:      'Between sessions, they\u2019re not alone.',
      h2zh:    '\u8bfe\u540e\u793e\u533a\uff0c\u6301\u7eed\u5b66\u4e60',
      body:
        'The Hangar is where DODO learners connect between sessions \u2014 not for homework help, but for the kind of peer learning that happens when curious minds find each other. Navigator-supported, student-driven, and a place where good habits stick.',
      cta: 'Learn About The Hangar',
    },
    growth: {
      eyebrow: 'How We Measure Growth',
      h2:      'Real numbers, not vague progress reports.',
      h2zh:    '\u771f\u5b9e\u6570\u636e\uff0c\u544a\u522b\u6a21\u7cca\u8bc4\u8bed',
      lexile: {
        h3:  'Lexile Reading Level',
        sub: 'The same measurement system used by schools across North America \u2014 so you can compare progress directly.',
        note: 'We don\u2019t say your child \u201creads well.\u201d We show you they moved from <strong>Lexile 620 to 820</strong> in 16 weeks \u2014 that\u2019s the difference between Grade\u00a04 and Grade\u00a06 reading territory.',
        start: 620, end: 820,
      },
      trait: {
        h3:         '6+1 Trait Writing',
        sub:        'The same rubric your child\u2019s school uses \u2014 so when you see improvement here, it shows up in the classroom too.',
        startLabel: 'Start',
        endLabel:   'After 16 weeks',
        scaleLabel: 'Scale 1\u20136',
        note:       'When you ask \u201chas the writing improved?\u201d \u2014 we don\u2019t say yes. We show you each trait score, before and after, so you can see exactly where the growth happened.',
      },
    },
    cta: {
      eyebrow: 'Get Started',
      h2:      'Ready to see where your child stands?',
      body:
        'It starts with a single conversation \u2014 a free diagnostic call where we learn about your child, assess where they are, and map out what 16 weeks could look like for them. Founding Family rates are available for our charter cohorts. Spots are limited.',
      btn:  'Book Your Consultation',
      note: 'Limited charter spots per cohort. Founding Family rate \u2014 not a promotion.',
    },
    charter: {
      badge: 'Charter Enrollment Open',
      h2:    'Ready to meet your child\u2019s Navigator?',
      sub:   'The diagnostic consultation is where we find out exactly where your child is \u2014 not where their school says they are.',
      btn1:  'Book Your Consultation',
      btn2:  'See The Program',
    },
  },

  zh: {
    meta: {
      title: '\u5341\u516d\u5468\u8bfe\u7a0b',
      description:
        '\u7531\u9886\u822a\u5458\u4e3b\u5bfc\u7684\u5b9e\u65f6\u53cc\u8bed\u601d\u7ef4\u9879\u76ee\u3002\u5728\u82f1\u8bed\u4e2d\u9605\u8bfb\u3001\u601d\u8003\u3001\u8868\u8fbe\u548c\u4e66\u5199\u2014\u2014\u4ee5Lexile\u9605\u8bfb\u7b49\u7ea7\u548c6+1\u5199\u4f5c\u7279\u8d28\u6846\u67b6\u8861\u91cf\u3002\u5341\u516d\u5468\u5185\u63d0\u5347\u4e00\u4e2a\u5e74\u7ea7\u3002',
    },
    hero: {
      chip: 'Think Once. In Both Languages.',
      h1:   '\u4e3a\u60a8\u5b69\u5b50\u5b9a\u5236\u7684\u5341\u516d\u5468\u6210\u957f\u8ba1\u5212',
      h1zh: 'A real plan for your child\u2019s next 16 weeks.',
      sub:
        '\u6211\u4eec\u4ece\u6e05\u6670\u7684\u57fa\u7ebf\u51fa\u53d1\u2014\u2014\u9605\u8bfb\u6c34\u5e73\u3001\u5199\u4f5c\u80fd\u529b\u2014\u2014\u7136\u540e\u9010\u6b65\u63d0\u5347\u3002\u6bcf\u5468\u7684\u8bfe\u7a0b\u90fd\u6709\u7ed3\u6784\u3001\u6709\u8ddf\u8e2a\u3001\u7531\u4e13\u5c5e\u9886\u822a\u5458\u6307\u5bfc\uff0c\u9886\u822a\u5458\u719f\u77e5\u60a8\u5b69\u5b50\u7684\u6bcf\u4e00\u6b65\u6210\u957f\u3002',
      cta1: '\u4e86\u89e3\u8bfe\u7a0b\u7ed3\u6784',
      cta2: '\u9884\u7ea6\u548c\u548c\u548b\u8be2',
      stats: [
        { value: '16', unit: '\u5468',       desc: '\u771f\u5b9e\u7684\u627f\u8bfa'               },
        { value: '4',  unit: '\u9879\u6280\u80fd', desc: '\u9605\u8bfb \u00b7 \u601d\u8003 \u00b7 \u8868\u8fbe \u00b7 \u5199\u4f5c' },
        { value: '2',  unit: '\u6b21\u8bc4\u4f30', desc: '\u8bfe\u524d + \u8bfe\u540e'           },
        { value: '1',  unit: '\u4f4d\u9886\u822a\u5458', desc: '\u4e86\u89e3\u60a8\u7684\u5b69\u5b50' },
        { value: '1',  unit: '\u4e2a\u5c0f\u7ec4', desc: '\u5c0f\u73ed\u7cbe\u82f1'              },
        { value: '\u221e', unit: '\u5b8c\u6574\u5faa\u73af', desc: '\u6bcf\u8282\u8bfe\u90fd\u8d2f\u7a7f' },
      ],
    },
    loop: {
      eyebrow: '\u5faa\u73af\u5982\u4f55\u8fd0\u4f5c',
      h2:      '\u56db\u9879\u6280\u80fd\uff0c\u8d2f\u7a7f\u6bcf\u5802\u8bfe',
      h2zh:    'Four skills. Every session.',
      steps: [
        { num: '01', label: '\u9605\u8bfb', labelZh: 'Read',  badge: null,
          desc: '\u7cbe\u9009\u7565\u9ad8\u4e8e\u8212\u9002\u533a\u7684\u6587\u7ae0\u2014\u2014\u6070\u5230\u597d\u5904\u5730\u5ef6\u5c55\u3002\u9605\u8bfb\u7406\u89e3\u901a\u8fc7Lexile\u7b49\u7ea7\u8ffd\u8e2a\uff0c\u800c\u975e\u51ed\u611f\u89c9\u3002' },
        { num: '02', label: '\u601d\u8003', labelZh: 'Think', badge: null,
          desc: '\u5728\u5f00\u53e3\u6216\u52a8\u7b14\u4e4b\u524d\uff0c\u5148\u641e\u5efa\u8bba\u70b9\u6846\u67b6\u3002\u8bba\u70b9\u662f\u4ec0\u4e48\uff1f\u4f9d\u636e\u662f\u4ec0\u4e48\uff1f\u53cd\u9a73\u662f\u4ec0\u4e48\uff1f\u7ed3\u6784\u5148\u884c\u3002' },
        { num: '03', label: '\u8868\u8fbe', labelZh: 'Speak', badge: null,
          desc: '\u5728\u9886\u822a\u5458\u9762\u524d\uff0c\u73b0\u573a\u8868\u8fbe\u5e76\u634d\u536b\u81ea\u5df1\u7684\u7acb\u573a\u3002\u81ea\u4fe1\u5728\u8fd9\u91cc\u5efa\u7acb\uff0c\u800c\u975e\u8868\u6f14\u51fa\u6765\u3002' },
        { num: '04', label: '\u5199\u4f5c', labelZh: 'Write', badge: null,
          desc: '\u6240\u6709\u9605\u8bfb\u3001\u601d\u8003\u548c\u8868\u8fbe\u7684\u5185\u5bb9\uff0c\u6700\u7ec8\u843d\u5728\u7eb8\u9762\u4e0a\u3002\u4ece\u521d\u7a3f\u5230\u4fee\u6539\u2014\u2014\u6bcf\u6b21\u90fd\u6709\u53ef\u8861\u91cf\u7684\u8fdb\u6b65\u3002' },
      ],
    },
    journey: {
      eyebrow: '\u6210\u957f\u4e4b\u65c5',
      h2:      '\u4ece\u8d77\u70b9\u5230\u6210\u957f\u7684\u6e05\u6670\u8def\u5f84',
      h2zh:    'Where your child starts \u2014 and where they\u2019ll be.',
      steps: [
        { week: '\u7b2c\u4e00\u5468',            label: '\u5165\u5b66\u8bc4\u4f30', labelZh: 'Entrance Assessment',
          desc: '\u6211\u4eec\u4ece\u7cbe\u51c6\u4e86\u89e3\u5b69\u5b50\u73b0\u72b6\u5f00\u59cb\u2014\u2014\u9605\u8bfb\u7b49\u7ea7\u3001\u5199\u4f5c\u4f18\u52bf\uff0c\u4ee5\u53ca\u9700\u8981\u652f\u6301\u7684\u5177\u4f53\u65b9\u9762\u3002\u4e0d\u4f5c\u5047\u8bbe\u3002',
          badge: null, badgeSub: null },
        { week: '\u7b2c\u4e8c\u81f3\u5341\u4e94\u5468', label: '\u6bcf\u5468\u8bfe\u7a0b', labelZh: 'Weekly Sessions',
          desc: '\u6bcf\u5468\uff0c\u5b69\u5b50\u4e0e\u4e13\u5c5e\u9886\u822a\u5458\u5171\u540c\u5b8c\u6210\u5b8c\u6574\u7684\u5b66\u4e60\u5faa\u73af\u2014\u2014\u9886\u822a\u5458\u4e86\u89e3\u5b69\u5b50\u7684\u8fdb\u5c55\u3001\u6311\u6218\uff0c\u4ee5\u53ca\u4e0b\u4e00\u6b65\u5982\u4f55\u63a8\u8fdb\u3002',
          badge: null, badgeSub: null },
        { week: '\u7b2c\u5341\u516d\u5468',     label: '\u7ed3\u4e1a\u8bc4\u4f30', labelZh: 'Exit Assessment',
          desc: '\u8bfe\u7a0b\u7ed3\u675f\u65f6\uff0c\u60a8\u5c06\u770b\u5230\u771f\u5b9e\u7684\u6210\u957f\u6570\u636e\u2014\u2014\u4e0d\u662f\u6a21\u7cca\u7684\u6210\u7ee9\u5355\uff0c\u800c\u662f\u5177\u4f53\u7684\u6570\u5b57\uff1aLexile\u7b49\u7ea7\u3001\u5199\u4f5c\u8bc4\u5206\uff0c\u4e0e\u8d77\u70b9\u5e76\u6392\u5448\u73b0\u3002',
          badge: null, badgeSub: null },
      ],
    },
    session: {
      eyebrow:       '\u771f\u5b9e\u8bfe\u5802',
      navigatorName: 'Navigator Sarah',
      sessionPhase:  '\u9605\u8bfb\u9636\u6bb5 \u00b7 Lexile 740',
      h2:   '\u4e00\u4e2a\u5178\u578b\u7684\u5468\u4e8c\u8bfe\u5802',
      h2zh: 'Here\u2019s what a typical Tuesday looks like.',
      p1: '\u9886\u822a\u5458\u5f00\u573a\u65f6\u70b9\u660e\u5b66\u4e60\u9636\u6bb5\uff1a',
      q1: '\u201c\u4eca\u5929\u6211\u4eec\u8fdb\u884c\u9605\u8bfb\u9636\u6bb5\u3002\u4f60\u7684\u6587\u7ae0Lexile\u662f740\u2014\u2014\u6bd4\u4e0a\u5468\u9ad8\u4e86\u516b\u5206\u3002\u6211\u4eec\u6765\u770b\u770b\u4f60\u80fd\u505a\u5230\u4ec0\u4e48\u3002\u201d',
      p2: '\u4e8c\u5341\u5206\u949f\u7684\u7ed3\u6784\u5316\u9605\u8bfb\u3002\u4e0d\u662f\u9ed8\u8bfb\u2014\u2014\u800c\u662f\u6279\u6ce8\u3001\u63d0\u95ee\u3001\u5171\u540c\u8ba8\u8bba\u3002',
      p3: '\u7136\u540e\u8fdb\u5165\u601d\u8003\u9636\u6bb5\u3002\u9886\u822a\u5458\u63d0\u95ee\uff1a\u4f5c\u8005\u7684\u8bba\u70b9\u662f\u4ec0\u4e48\uff1f\u4f60\u540c\u610f\u5417\uff1f\u6700\u6709\u529b\u7684\u53cd\u9a73\u662f\u4ec0\u4e48\uff1f',
      p4: '\u8bfe\u7a0b\u7ed3\u675f\u65f6\uff0c\u76ee\u5149\u6295\u5411\u524d\u65b9\uff1a',
      q4: '\u201c\u4e0b\u5468\u662f\u8868\u8fbe\u9636\u6bb5\u3002\u4f60\u8981\u73b0\u573a\u634d\u536b\u4f60\u7684\u7acb\u573a\u3002\u4ece\u73b0\u5728\u5f00\u59cb\u51c6\u5907\u3002\u201d',
    },
    hangar: {
      eyebrow: 'The Hangar',
      h2:      '\u8bfe\u540e\u793e\u533a\uff0c\u6301\u7eed\u5b66\u4e60',
      h2zh:    'Between sessions, they\u2019re not alone.',
      body:
        'The Hangar\u662fDODO\u5b66\u5458\u5728\u8bfe\u95f4\u4fdd\u6301\u8054\u7cfb\u7684\u793e\u533a\u2014\u2014\u4e0d\u662f\u4f5c\u4e1a\u8f85\u5bfc\uff0c\u800c\u662f\u6709\u597d\u5947\u5fc3\u7684\u5b69\u5b50\u76f8\u9047\u65f6\u53d1\u751f\u7684\u540c\u4f34\u5b66\u4e60\u3002\u7531\u9886\u822a\u5458\u652f\u6301\u3001\u7531\u5b66\u751f\u4e3b\u5bfc\uff0c\u662f\u8ba9\u597d\u4e60\u60ef\u6301\u7eed\u751f\u957f\u7684\u5730\u65b9\u3002',
      cta: '\u4e86\u89e3 The Hangar',
    },
    growth: {
      eyebrow: '\u6211\u4eec\u5982\u4f55\u8861\u91cf\u6210\u957f',
      h2:      '\u771f\u5b9e\u6570\u636e\uff0c\u544a\u522b\u6a21\u7cca\u8bc4\u8bed',
      h2zh:    'Real numbers, not vague progress reports.',
      lexile: {
        h3:  'Lexile \u9605\u8bfb\u7b49\u7ea7',
        sub: '\u4e0e\u5317\u7f8e\u5404\u5730\u5b66\u6821\u4f7f\u7528\u7684\u540c\u4e00\u5957\u6d4b\u91cf\u4f53\u7cfb\u2014\u2014\u8ba9\u60a8\u53ef\u4ee5\u76f4\u63a5\u5bf9\u6bd4\u8fdb\u6b65\u3002',
        note: '\u6211\u4eec\u4e0d\u8bf4\u5b69\u5b50\u201c\u8bfb\u5f97\u4e0d\u9519\u201d\u3002\u6211\u4eec\u7528\u6570\u636e\u5c55\u793a\uff1a\u4ed6\u4eec\u572816\u5468\u5185\u4ece <strong>Lexile 620 \u63d0\u5347\u5230 820</strong>\u2014\u2014\u8fd9\u662f\u56db\u5e74\u7ea7\u548c\u516d\u5e74\u7ea7\u9605\u8bfb\u6c34\u5e73\u4e4b\u95f4\u7684\u5dee\u8ddd\u3002',
        start: 620, end: 820,
      },
      trait: {
        h3:         '6+1 \u5199\u4f5c\u7279\u8d28',
        sub:        '\u4e0e\u5b69\u5b50\u5b66\u6821\u4f7f\u7528\u7684\u540c\u4e00\u5957\u8bc4\u5206\u6807\u51c6\u2014\u2014\u5728\u8fd9\u91cc\u770b\u5230\u7684\u8fdb\u6b65\uff0c\u4f1a\u76f4\u63a5\u4f53\u73b0\u5728\u8bfe\u5802\u4e0a\u3002',
        startLabel: '\u8d77\u59cb',
        endLabel:   '16\u5468\u540e',
        scaleLabel: '\u8bc4\u5206 1\u20136',
        note:       '\u5f53\u4f60\u95ee\u201c\u5199\u4f5c\u6709\u8fdb\u6b65\u5417\u201d\u2014\u2014\u6211\u4eec\u4e0d\u8bf4\u201c\u6709\u201d\u3002\u6211\u4eec\u5c55\u793a\u6bcf\u9879\u7279\u8d28\u8bc4\u5206\u7684\u524d\u540e\u5bf9\u6bd4\uff0c\u8ba9\u60a8\u6e05\u6670\u770b\u5230\u6210\u957f\u53d1\u751f\u5728\u54ea\u91cc\u3002',
      },
    },
    cta: {
      eyebrow: '\u5f00\u59cb\u62a5\u540d',
      h2:      'Ready to see where your child stands?',
      body:
        '\u4e00\u5207\u4ece\u4e00\u6b21\u5bf9\u8bdd\u5f00\u59cb\u2014\u2014\u4e00\u6b21\u514d\u8d39\u7684\u8bfa\u65ad\u6027\u901a\u8bdd\uff0c\u6211\u4eec\u4e86\u89e3\u60a8\u7684\u5b69\u5b50\u3001\u8bc4\u4f30\u5176\u73b0\u72b6\uff0c\u5e76\u89c4\u5212\u5341\u516d\u5468\u80fd\u5b9e\u73b0\u4ec0\u4e48\u3002\u521b\u59cb\u5bb6\u5ead\u4e13\u5c5e\u8d39\u7387\u9002\u7528\u4e8e\u6211\u4eec\u7684\u9996\u6279\u5b66\u5458\u3002\u540d\u989d\u6709\u9650\u3002',
      btn:  '\u9884\u7ea6\u514d\u8d39\u8bfa\u65ad\u901a\u8bdd',
      note: '\u6bcf\u6279\u6b21\u521b\u59cb\u5bb6\u5ead\u540d\u989d\u6709\u9650\u3002\u521b\u59cb\u5bb6\u5ead\u4e13\u5c5e\u8d39\u7387\u2014\u2014\u975e\u4fc3\u9500\u4f18\u60e0\u3002',
    },
    charter: {
      badge: 'Charter Enrollment Open',
      h2:    '\u51c6\u5907\u597d\u8ba4\u8bc6\u5b69\u5b50\u7684\u9886\u822a\u5458\u4e86\u5417\uff1f',
      sub:   '\u8bfa\u65ad\u6027\u548b\u8be2\u662f\u6211\u4eec\u7cbe\u786e\u4e86\u89e3\u5b69\u5b50\u73b0\u72b6\u7684\u5730\u65b9\u2014\u2014\u800c\u975e\u4f9d\u8d56\u5b66\u6821\u7684\u8bc4\u4f30\u62a5\u544a\u3002',
      btn1:  '\u9884\u7ea6\u548c\u548c\u548b\u8be2',
      btn2:  '\u67e5\u770b\u8bfe\u7a0b',
    },
  },
}

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────

function BilingualH2({ primary, secondary, light = false, center = false, id }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2
        id={id}
        style={{
          fontSize:      'clamp(1.75rem, 3vw + 0.25rem, 2.75rem)',
          fontWeight:    700,
          lineHeight:    1.15,
          letterSpacing: '-0.025em',
          color:         light ? '#F0F0F0' : '#0E0E12',
          textWrap:      'balance',
          marginBottom:  0,
        }}
      >
        {primary}
      </h2>
      {secondary && (
        <p
          className="mt-2"
          style={{
            fontFamily: 'var(--font-cjk)',
            fontSize:   '15px',
            fontWeight: 500,
            color:      light ? '#b7b5fe' : '#5856cc',
            lineHeight: 1.5,
          }}
        >
          {secondary}
        </p>
      )}
    </div>
  )
}

function Eyebrow({ children, center = false, dark = false }) {
  return (
    <p
      style={{
        fontSize:      '0.75rem',
        fontWeight:    600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color:         dark ? '#b7b5fe' : '#5856cc',
        marginBottom:  '0.875rem',
        textAlign:     center ? 'center' : undefined,
      }}
    >
      {children}
    </p>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// ─────────────────────────────────────────────────────────────

function Hero({ locale, c }) {

  return (
    <section
      aria-labelledby="program-hero-heading"
      style={{
        backgroundColor: '#0E0E12',
        minHeight:       '100dvh',
        display:         'flex',
        flexDirection:   'column',
        position:        'relative',
        overflow:        'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          background:    'radial-gradient(ellipse 65% 50% at 80% 30%, rgba(183,181,254,0.07) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Main content ── */}
      <div
        className="container-section relative z-10"
        style={{
          flex:          1,
          display:       'flex',
          alignItems:    'center',
          paddingTop:    'calc(var(--nav-height) + 3.5rem)',
          paddingBottom: '2.5rem',
        }}
      >
        <div style={{ maxWidth: '46rem' }}>

          {/* Chip */}
          <div
            className="inline-flex items-center gap-2 mb-7 rounded-full"
            style={{
              padding:         '5px 14px',
              border:          '1px solid rgba(183,181,254,0.18)',
              backgroundColor: 'rgba(183,181,254,0.05)',
            }}
          >
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: '#b7b5fe' }}
            />
            <span
              style={{
                fontSize:      '10px',
                fontWeight:    600,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color:         '#b7b5fe',
              }}
            >
              {c.hero.chip}
            </span>
          </div>

          {/* H1 */}
          <h1
            id="program-hero-heading"
            style={{
              fontSize:      'clamp(2.25rem, 5vw + 0.5rem, 4rem)',
              fontWeight:    700,
              lineHeight:    1.06,
              letterSpacing: '-0.03em',
              color:         '#F0F0F0',
              marginBottom:  '0.625rem',
              textWrap:      'balance',
            }}
          >
            {c.hero.h1}
          </h1>

          {/* Bilingual subtitle — ZH only */}
          {locale === 'zh' && (
            <p
              style={{
                fontFamily:   'var(--font-cjk)',
                fontSize:     '17px',
                fontWeight:   500,
                color:        'rgba(183,181,254,0.45)',
                marginBottom: '1.25rem',
                lineHeight:   1.5,
              }}
            >
              {c.hero.h1zh}
            </p>
          )}

          {/* Subheading */}
          <p
            style={{
              fontSize:     '1rem',
              lineHeight:   1.85,
              color:        'rgba(240,240,240,0.5)',
              maxWidth:     '36rem',
              marginBottom: '2.25rem',
            }}
          >
            {c.hero.sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#loop-section" className="btn btn-primary" style={{ fontWeight: 700 }}>
              {c.hero.cta1}
            </a>
            <Link href={`/${locale}/consult`} className="btn btn-ghost">
              {c.hero.cta2}
            </Link>
          </div>

        </div>
      </div>

      {/* ── Stat pills strip ── */}
      <div
        style={{
          borderTop:       '1px solid rgba(183,181,254,0.07)',
          flexShrink:      0,
          position:        'relative',
          zIndex:          10,
          backgroundColor: '#2E3848',
        }}
      >
        <div className="container-section">
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
            className="sm:grid-cols-6"
          >
            {c.hero.stats.map((stat, i) => {
              const isLastInRow3   = i === 2
              const isLastOverall  = i === c.hero.stats.length - 1
              const isInFirstHalf  = i < 3
              return (
                <div
                  key={stat.unit + i}
                  style={{
                    textAlign:    'center',
                    padding:      '1.125rem 0.375rem',
                    borderRight:  !isLastOverall && !(isLastInRow3)
                      ? '1px solid rgba(183,181,254,0.07)' : 'none',
                    borderBottom: isInFirstHalf
                      ? '1px solid rgba(183,181,254,0.07)' : 'none',
                  }}
                >
                  <p
                    style={{
                      fontSize:      'clamp(1.375rem, 2.5vw, 2rem)',
                      fontWeight:    700,
                      letterSpacing: '-0.03em',
                      lineHeight:    1,
                      color:         '#b7b5fe',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontSize:   '0.6875rem',
                      fontWeight: 700,
                      color:      'rgba(240,240,240,0.75)',
                      marginTop:  '3px',
                      lineHeight: 1.2,
                    }}
                  >
                    {stat.unit}
                  </p>
                  <p
                    style={{
                      fontSize:   '0.625rem',
                      color:      'rgba(183,181,254,0.35)',
                      marginTop:  '2px',
                      lineHeight: 1.3,
                    }}
                  >
                    {stat.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 2 — THE LOOP (compact — ~half original height)
// ─────────────────────────────────────────────────────────────

const LOOP_ACCENT_COLORS = ['#b7b5fe', '#9896e8', '#7b79d4', '#5856cc']

function LoopSection({ locale, c }) {
  return (
    <section
      id="loop-section"
      aria-labelledby="loop-heading"
      style={{ backgroundColor: '#ffffff', padding: '2.5rem 0' }}
    >
      <div className="container-section">

        {/* Header */}
        <div
          style={{
            display:        'flex',
            flexWrap:       'wrap',
            alignItems:     'flex-end',
            justifyContent: 'space-between',
            gap:            '0.75rem',
            marginBottom:   '1.5rem',
          }}
        >
          <div>
            <Eyebrow>{c.loop.eyebrow}</Eyebrow>
            <BilingualH2
              id="loop-heading"
              primary={c.loop.h2}
              secondary={locale === 'zh' ? c.loop.h2zh : null}
            />
          </div>
          {/* Loop connector label — desktop only */}
          <p
            aria-hidden="true"
            style={{
              fontSize:      '0.6875rem',
              fontWeight:    600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         'rgba(88,86,204,0.4)',
              whiteSpace:    'nowrap',
            }}
          >
            Read → Think → Speak → Write
          </p>
        </div>

        {/* Steps grid — compact cards */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap:                 '1px',
            backgroundColor:     'rgba(14,14,18,0.07)',
            borderRadius:        '0.875rem',
            overflow:            'hidden',
            border:              '1px solid rgba(14,14,18,0.07)',
          }}
          className="sm:grid-cols-2 lg:grid-cols-4"
        >
          {c.loop.steps.map((step, i) => (
            <article
              key={step.num}
              aria-label={`${step.label} — ${step.labelZh}`}
              style={{
                backgroundColor: '#ffffff',
                padding:         '1rem 1.25rem 1.125rem',
              }}
            >
              {/* Number circle + label + zh label inline */}
              <div
                style={{
                  display:     'flex',
                  alignItems:  'center',
                  gap:         '0.5rem',
                  marginBottom: '0.625rem',
                  flexWrap:    'wrap',
                }}
              >
                {/* Numbered circle */}
                <span
                  aria-hidden="true"
                  style={{
                    width:           '22px',
                    height:          '22px',
                    borderRadius:    '50%',
                    backgroundColor: LOOP_ACCENT_COLORS[i],
                    display:         'inline-flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    flexShrink:      0,
                    opacity:         0.85,
                  }}
                >
                  <span
                    style={{
                      fontSize:   '9px',
                      fontWeight: 800,
                      color:      '#ffffff',
                      lineHeight: 1,
                    }}
                  >
                    {i + 1}
                  </span>
                </span>

                {/* Label */}
                <p
                  style={{
                    fontSize:   '1rem',
                    fontWeight: 700,
                    color:      '#0E0E12',
                    lineHeight: 1.1,
                  }}
                >
                  {step.label}
                </p>

                {/* ZH label — ZH only */}
                {locale === 'zh' && (
                  <p
                    style={{
                      fontFamily: 'var(--font-cjk)',
                      fontSize:   '11px',
                      color:      LOOP_ACCENT_COLORS[i],
                      lineHeight: 1.1,
                      opacity:    0.75,
                    }}
                  >
                    {step.labelZh}
                  </p>
                )}

                {/* Badge — pushed to end */}
                {step.badge && (
                  <span
                    style={{
                      marginLeft:      'auto',
                      padding:         '1px 7px',
                      backgroundColor: 'rgba(183,181,254,0.1)',
                      borderRadius:    '9999px',
                      border:          '1px solid rgba(183,181,254,0.25)',
                      fontSize:        '8px',
                      fontWeight:      600,
                      letterSpacing:   '0.08em',
                      color:           '#5856cc',
                      whiteSpace:      'nowrap',
                    }}
                  >
                    {step.badge}
                  </span>
                )}
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.8125rem', lineHeight: 1.7, color: '#3D4452' }}>
                {step.desc}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 3 — THE JOURNEY (compact — ~quarter original height)
// Images removed. Replaced with a connected 3-step row + inline LexileBar.
// ─────────────────────────────────────────────────────────────

function JourneySection({ locale, c }) {
  return (
    <section
      id="structure"
      aria-labelledby="journey-heading"
      style={{ backgroundColor: '#F5F5FF', padding: '2.25rem 0' }}
    >
      <div className="container-section">

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Eyebrow>{c.journey.eyebrow}</Eyebrow>
          <BilingualH2
            id="journey-heading"
            primary={c.journey.h2}
            secondary={locale === 'zh' ? c.journey.h2zh : null}
          />
        </div>

        {/* Single unified grid — 3 steps + LexileBar cell */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap:                 '1px',
            backgroundColor:     'rgba(14,14,18,0.07)',
            borderRadius:        '0.875rem',
            overflow:            'hidden',
            border:              '1px solid rgba(14,14,18,0.07)',
          }}
          className="sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* 3 journey step cards */}
          {c.journey.steps.map((step, i) => (
            <article
              key={step.label}
              style={{
                backgroundColor: '#ffffff',
                padding:         '1rem 1.25rem 1.125rem',
              }}
            >
              {/* Step indicator row */}
              <div
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          '0.5rem',
                  marginBottom: '0.625rem',
                }}
              >
                {/* Numbered circle */}
                <span
                  style={{
                    width:           '22px',
                    height:          '22px',
                    borderRadius:    '50%',
                    backgroundColor: 'rgba(183,181,254,0.12)',
                    border:          '1.5px solid #b7b5fe',
                    display:         'inline-flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    flexShrink:      0,
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#5856cc', lineHeight: 1 }}>
                    {i + 1}
                  </span>
                </span>

                {/* Week label */}
                <span
                  style={{
                    fontSize:      '9px',
                    fontWeight:    600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color:         '#5856cc',
                    opacity:       0.65,
                  }}
                >
                  {step.week}
                </span>
              </div>

              {/* Step title */}
              <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0E0E12', lineHeight: 1.2, marginBottom: '2px' }}>
                {step.label}
              </p>

              {/* ZH label — ZH only */}
              {locale === 'zh' && (
                <p style={{ fontFamily: 'var(--font-cjk)', fontSize: '11px', color: '#5856cc', opacity: 0.75, marginBottom: '0.375rem', lineHeight: 1.3 }}>
                  {step.labelZh}
                </p>
              )}

              {/* Description */}
              <p style={{ fontSize: '0.8125rem', lineHeight: 1.65, color: '#3D4452' }}>
                {step.desc}
              </p>
            </article>
          ))}

          {/* LexileBar cell — 4th column, same visual weight as the step cards */}
          <div
            style={{
              backgroundColor: '#f0efff',
              padding:         '1rem 1.25rem 1.125rem',
              display:         'flex',
              flexDirection:   'column',
              justifyContent:  'center',
              gap:             '0.75rem',
            }}
          >
            <p
              style={{
                fontSize:      '9px',
                fontWeight:    700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         '#5856cc',
              }}
            >
              {locale === 'zh' ? 'Lexile 成长' : 'Lexile Growth'}
            </p>
            <LexileBar start={620} end={820} weeks={16} light />
            <p style={{ fontSize: '0.75rem', lineHeight: 1.5, color: '#5856cc', opacity: 0.6 }}>
              {locale === 'zh'
                ? '典型16周成果：620L → 820L'
                : 'Typical 16-week result: 620L → 820L'}
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 4 — A REAL SESSION
// ─────────────────────────────────────────────────────────────

const SESSION_IMG = 'https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80'

function SessionSection({ locale, c }) {
  return (
    <section
      aria-labelledby="session-heading"
      style={{ position: 'relative', overflow: 'hidden', minHeight: '500px' }}
    >
      {/* bg image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SESSION_IMG}
        alt=""
        aria-hidden="true"
        style={{
          position:  'absolute',
          inset:     0,
          width:     '100%',
          height:    '100%',
          objectFit: 'cover',
          display:   'block',
        }}
      />
      {/* overlay */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(105deg, rgba(14,14,18,0.97) 0%, rgba(14,14,18,0.90) 45%, rgba(14,14,18,0.55) 100%)',
        }}
      />

      <div
        className="container-section relative z-10"
        style={{ padding: 'var(--section-md) 1.25rem' }}
      >
        <div style={{ maxWidth: '40rem' }}>

          {/* Navigator chip */}
          <div
            className="inline-flex items-center gap-2.5 rounded-full mb-7"
            style={{
              padding:         '7px 14px 7px 7px',
              backgroundColor: 'rgba(183,181,254,0.07)',
              border:          '1px solid rgba(183,181,254,0.14)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width:           '30px',
                height:          '30px',
                borderRadius:    '50%',
                backgroundColor: '#b7b5fe',
                color:           '#0E0E12',
                fontSize:        '10px',
                fontWeight:      800,
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                flexShrink:      0,
              }}
            >
              NV
            </span>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2 }}>
                {c.session.navigatorName}
              </p>
              <p style={{ fontSize: '10px', color: 'rgba(183,181,254,0.55)', lineHeight: 1.2 }}>
                {c.session.sessionPhase}
              </p>
            </div>
          </div>

          <Eyebrow dark>{c.session.eyebrow}</Eyebrow>
          <BilingualH2
            id="session-heading"
            primary={c.session.h2}
            secondary={locale === 'zh' ? c.session.h2zh : null}
            light
          />

          <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>
              {c.session.p1}{' '}
              <em style={{ fontStyle: 'italic', color: 'rgba(183,181,254,0.8)' }}>{c.session.q1}</em>
            </p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>
              {c.session.p2}
            </p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>
              {c.session.p3}
            </p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>
              {c.session.p4}{' '}
              <em style={{ fontStyle: 'italic', color: 'rgba(183,181,254,0.8)' }}>{c.session.q4}</em>
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 5 — THE HANGAR
// ─────────────────────────────────────────────────────────────

function HangarSection({ locale, c }) {
  return (
    <section
      aria-labelledby="hangar-heading"
      style={{ backgroundColor: '#212830', padding: 'var(--section-md) 0' }}
    >
      <div className="container-section">
        <div style={{ maxWidth: '40rem' }}>
          <Eyebrow dark>{c.hangar.eyebrow}</Eyebrow>
          <BilingualH2
            id="hangar-heading"
            primary={c.hangar.h2}
            secondary={locale === 'zh' ? c.hangar.h2zh : null}
            light
          />
          <p style={{ fontSize: '1rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.55)', marginTop: '1.125rem', marginBottom: '1.875rem' }}>
            {c.hangar.body}
          </p>
          <Link href={`/${locale}/the-hangar`} className="btn btn-primary">
            {c.hangar.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 6 — HOW WE MEASURE GROWTH
// ─────────────────────────────────────────────────────────────

function LexileScaleViz({ start, end }) {
  const MIN  = 200
  const MAX  = 1200
  const SPAN = MAX - MIN
  // From top: (MAX - level) / SPAN * 100%
  const topPct  = (l) => ((MAX - l) / SPAN) * 100
  const hlTop   = topPct(end)
  const hlBot   = topPct(start)
  const hlH     = hlBot - hlTop

  return (
    <div
      style={{ position: 'relative', height: '300px', width: '160px', flexShrink: 0 }}
      role="img"
      aria-label={`Lexile scale. Highlighted range: ${start}L to ${end}L`}
    >
      {/* Track */}
      <div
        aria-hidden="true"
        style={{
          position:        'absolute',
          left:            '16px',
          top:             0,
          bottom:          0,
          width:           '3px',
          backgroundColor: 'rgba(183,181,254,0.1)',
          borderRadius:    '9999px',
        }}
      />
      {/* Highlighted segment */}
      <div
        aria-hidden="true"
        style={{
          position:        'absolute',
          left:            '16px',
          top:             `${hlTop}%`,
          height:          `${hlH}%`,
          width:           '3px',
          backgroundColor: '#b7b5fe',
          borderRadius:    '9999px',
          boxShadow:       '0 0 12px rgba(183,181,254,0.5)',
        }}
      />
      {/* Scale labels */}
      {LEXILE_SCALE.map((row) => {
        const yPct    = topPct(row.level)
        const inRange = row.level >= start && row.level <= end
        return (
          <div
            key={row.level}
            aria-hidden="true"
            style={{
              position:   'absolute',
              top:        `${yPct}%`,
              left:       0,
              transform:  'translateY(-50%)',
              display:    'flex',
              alignItems: 'center',
              gap:        '8px',
            }}
          >
            {/* Tick */}
            <div
              style={{
                width:           '7px',
                height:          '7px',
                borderRadius:    '50%',
                backgroundColor: inRange ? '#b7b5fe' : 'rgba(183,181,254,0.18)',
                marginLeft:      '13px',
                flexShrink:      0,
                boxShadow:       inRange ? '0 0 6px rgba(183,181,254,0.4)' : 'none',
              }}
            />
            <div>
              <span
                style={{
                  fontSize:   '10px',
                  fontWeight: inRange ? 700 : 500,
                  color:      inRange ? '#b7b5fe' : 'rgba(183,181,254,0.28)',
                  display:    'block',
                  lineHeight: 1.2,
                }}
              >
                {row.level}L
              </span>
              <span
                style={{
                  fontSize:   '9px',
                  color:      inRange ? 'rgba(183,181,254,0.65)' : 'rgba(183,181,254,0.2)',
                  lineHeight: 1.2,
                }}
              >
                {row.grade}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function GrowthSection({ locale, c }) {
  return (
    <section
      aria-labelledby="growth-heading"
      style={{ backgroundColor: '#0E0E12', padding: 'var(--section-md) 0' }}
    >
      <div className="container-section">

        <div style={{ marginBottom: '3.5rem' }}>
          <Eyebrow dark>{c.growth.eyebrow}</Eyebrow>
          <BilingualH2
            id="growth-heading"
            primary={c.growth.h2}
            secondary={locale === 'zh' ? c.growth.h2zh : null}
            light
          />
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3.5rem' }}
          className="lg:grid-cols-2"
        >

          {/* ── Lexile ── */}
          <div>
            <h3
              style={{
                fontSize:      '1.125rem',
                fontWeight:    700,
                color:         '#b7b5fe',
                marginBottom:  '0.375rem',
                letterSpacing: '-0.01em',
              }}
            >
              {c.growth.lexile.h3}
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.72, color: 'rgba(240,240,240,0.45)', marginBottom: '1.75rem' }}>
              {c.growth.lexile.sub}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <LexileScaleViz start={c.growth.lexile.start} end={c.growth.lexile.end} />
              <p
                style={{
                  fontSize:   '0.875rem',
                  lineHeight: 1.82,
                  color:      'rgba(240,240,240,0.5)',
                  flex:       1,
                  paddingTop: '0.5rem',
                }}
                dangerouslySetInnerHTML={{ __html: c.growth.lexile.note }}
              />
            </div>
          </div>

          {/* ── 6+1 Trait ── */}
          <div>
            <h3
              style={{
                fontSize:      '1.125rem',
                fontWeight:    700,
                color:         '#b7b5fe',
                marginBottom:  '0.375rem',
                letterSpacing: '-0.01em',
              }}
            >
              {c.growth.trait.h3}
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.72, color: 'rgba(240,240,240,0.45)', marginBottom: '1.25rem' }}>
              {c.growth.trait.sub}
            </p>

            {/* Legend */}
            <div className="flex items-center gap-4" style={{ marginBottom: '0.75rem' }} aria-hidden="true">
              <div className="flex items-center gap-1.5">
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'rgba(183,181,254,0.18)' }} />
                <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(183,181,254,0.4)' }}>
                  {c.growth.trait.startLabel}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#b7b5fe' }} />
                <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(183,181,254,0.7)' }}>
                  {c.growth.trait.endLabel}
                </span>
              </div>
              <span style={{ fontSize: '10px', color: 'rgba(183,181,254,0.22)', marginLeft: 'auto' }}>
                {c.growth.trait.scaleLabel}
              </span>
            </div>

            {/* Rows */}
            <div>
              {TRAITS.map((trait) => {
                const label    = locale === 'zh' ? trait.zh : trait.en
                const maxScale = 6
                const sPct     = (trait.start / maxScale) * 100
                const ePct     = (trait.end   / maxScale) * 100
                const gainPct  = ePct - sPct
                return (
                  <div
                    key={trait.id}
                    style={{
                      display:             'grid',
                      gridTemplateColumns: '110px 1fr 52px',
                      gap:                 '0.75rem',
                      alignItems:          'center',
                      padding:             '0.5rem 0',
                      borderBottom:        '1px solid rgba(183,181,254,0.05)',
                    }}
                  >
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#F0F0F0', lineHeight: 1.2 }}>
                      {label}
                    </p>
                    <div
                      style={{
                        position:        'relative',
                        height:          '7px',
                        backgroundColor: 'rgba(183,181,254,0.07)',
                        borderRadius:    '9999px',
                        overflow:        'hidden',
                      }}
                      aria-label={`${label}: ${trait.start} to ${trait.end} out of ${maxScale}`}
                    >
                      <div
                        aria-hidden="true"
                        style={{
                          position:        'absolute',
                          left:            0,
                          top:             0,
                          height:          '100%',
                          width:           `${sPct}%`,
                          backgroundColor: 'rgba(183,181,254,0.15)',
                          borderRadius:    '9999px',
                        }}
                      />
                      <div
                        aria-hidden="true"
                        style={{
                          position:        'absolute',
                          left:            `${sPct}%`,
                          top:             0,
                          height:          '100%',
                          width:           `${gainPct}%`,
                          backgroundColor: '#b7b5fe',
                          borderRadius:    '9999px',
                        }}
                      />
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(183,181,254,0.5)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      {trait.start}→<span style={{ color: '#b7b5fe', fontWeight: 700 }}>{trait.end}</span>
                    </p>
                  </div>
                )
              })}
            </div>

            <p style={{ fontSize: '0.8125rem', lineHeight: 1.72, color: 'rgba(240,240,240,0.35)', marginTop: '1rem' }}>
              {c.growth.trait.note}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 7 — GET STARTED
// ─────────────────────────────────────────────────────────────

function GetStartedSection({ locale, c }) {
  return (
    <section
      aria-labelledby="get-started-heading"
      style={{ backgroundColor: '#F5F5FF', padding: 'var(--section-md) 0' }}
    >
      <div className="container-section">
        <div style={{ maxWidth: '40rem' }}>
          <Eyebrow>{c.cta.eyebrow}</Eyebrow>
          <BilingualH2 id="get-started-heading" primary={c.cta.h2} />
          <p style={{ fontSize: '1rem', lineHeight: 1.82, color: '#3D4452', marginTop: '1.125rem', marginBottom: '1.875rem' }}>
            {c.cta.body}
          </p>
          <Link href={`/${locale}/consult`} className="btn btn-charter">
            {c.cta.btn}
          </Link>
          <p style={{ fontSize: '0.8125rem', color: '#7B8494', marginTop: '0.875rem' }}>
            {c.cta.note}
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 8 — CHARTER FOOTER BAND
// ─────────────────────────────────────────────────────────────

function CharterSection({ locale, c }) {
  return (
    <section
      aria-labelledby="charter-heading"
      style={{ backgroundColor: '#212830', padding: 'var(--section-md) 0' }}
    >
      <div className="container-section">
        <div style={{ maxWidth: '40rem' }}>

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full mb-5"
            style={{
              padding:         '4px 12px',
              backgroundColor: 'rgba(245,200,66,0.08)',
              border:          '1px solid rgba(245,200,66,0.22)',
            }}
          >
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: '#F5C842' }}
            />
            <span
              style={{
                fontSize:      '10px',
                fontWeight:    700,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color:         '#F5C842',
              }}
            >
              {c.charter.badge}
            </span>
          </div>

          <h2
            id="charter-heading"
            style={{
              fontSize:      'clamp(1.625rem, 2.5vw + 0.25rem, 2.5rem)',
              fontWeight:    700,
              letterSpacing: '-0.025em',
              color:         '#F0F0F0',
              marginBottom:  '0.625rem',
            }}
          >
            {c.charter.h2}
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(240,240,240,0.45)', marginBottom: '1.875rem' }}>
            {c.charter.sub}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={`/${locale}/consult`} className="btn btn-charter">
              {c.charter.btn1}
            </Link>
            <Link href={`/${locale}/program`} className="btn btn-ghost">
              {c.charter.btn2}
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// STATIC PARAMS & METADATA
// ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return localeParams()
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const c = COPY[locale] ?? COPY.en
  return buildMetadata({
    locale,
    path:        '/program',
    title:       c.meta.title,
    description: c.meta.description,
  })
}

// ─────────────────────────────────────────────────────────────
// PAGE EXPORT
// ─────────────────────────────────────────────────────────────

export default async function ProgramPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const c = COPY[locale] ?? COPY.en

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema()) }}
      />
      <Hero              locale={locale} c={c} />
      <LoopSection       locale={locale} c={c} />
      <JourneySection    locale={locale} c={c} />
      <SessionSection    locale={locale} c={c} />
      <HangarSection     locale={locale} c={c} />
      <GrowthSection     locale={locale} c={c} />
      <GetStartedSection locale={locale} c={c} />
    </>
  )
}