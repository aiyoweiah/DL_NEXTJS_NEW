// app/[locale]/demos/page.jsx
//
// Watch Demo Classes — video-first, properly sized for 1280–1440 px viewports.
//
// ─── VIDEO IDs ───────────────────────────────────────────────────────────────
// Replace the YOUTUBE_IDS constants below with your real YouTube video IDs.
// IDs are the 11-character string after ?v= in a YouTube URL.
// Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ → "dQw4w9WgXcQ"
// ─────────────────────────────────────────────────────────────────────────────
//
// Sections (top → bottom):
//   1. Hero          — dark, headline + CTAs, stats strip
//   2. FeaturedDemo  — white, cinema-scale featured video + metadata panel
//   3. DemoGrid      — white, 3-col grade-band video grid (supporting scale)
//   4. BrandVideos   — whisper, 2-col brand/culture videos (max-width 960px)
//   5. InsideSession — dark bg image, narrative overlay
//   6. AfterDemo     — dark, what to do next
//   7. Results       — darker, Lexile scale + 6+1 Trait
//   8. BookCall      — light, diagnostic CTA
//   9. Charter       — dark, dual-CTA footer band

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import LexileBar                       from '@/components/ui/LexileBar'
import YoutubeEmbed                    from '@/components/demos/YoutubeEmbed'

// ─────────────────────────────────────────────────────────────
// VIDEO IDs — REPLACE THESE WITH YOUR REAL YOUTUBE VIDEO IDs
// ─────────────────────────────────────────────────────────────

const YOUTUBE_IDS = {
  featured:       'REPLACE_FEATURED_VIDEO_ID',
  demoGr46:       'REPLACE_DEMO_GR4_6_VIDEO_ID',
  demoGr78:       'REPLACE_DEMO_GR7_8_VIDEO_ID',
  demoGr9plus:    'REPLACE_DEMO_GR9PLUS_VIDEO_ID',
  brandLoop:      'REPLACE_BRAND_LOOP_VIDEO_ID',
  brandNavigator: 'REPLACE_BRAND_NAVIGATOR_VIDEO_ID',
}

const LEXILE_SCALE = [
  { level: 1200, grade: 'Grade 12+' },
  { level: 1000, grade: 'Grade 9'   },
  { level:  800, grade: 'Grade 6'   },
  { level:  600, grade: 'Grade 4'   },
  { level:  400, grade: 'Grade 2'   },
  { level:  200, grade: 'Grade 1'   },
]

const TRAITS = [
  { id: 'ideas',        en: 'Ideas',            zh: '\u60f3\u6cd5',             start: 2, end: 4 },
  { id: 'organisation', en: 'Organisation',     zh: '\u7ed3\u6784',             start: 2, end: 4 },
  { id: 'voice',        en: 'Voice',            zh: '\u58f0\u97f3',             start: 2, end: 4 },
  { id: 'word-choice',  en: 'Word Choice',      zh: '\u8bcd\u6c47\u9009\u62e9', start: 2, end: 5 },
  { id: 'fluency',      en: 'Sentence Fluency', zh: '\u53e5\u5b50\u6d41\u7545', start: 3, end: 5 },
  { id: 'conventions',  en: 'Conventions',      zh: '\u5199\u4f5c\u89c4\u8303', start: 3, end: 4 },
  { id: 'presentation', en: 'Presentation',     zh: '\u5448\u73b0',             start: 2, end: 4 },
]

const COPY = {
  en: {
    meta: {
      title:       'Watch a Demo Class',
      description: 'Watch real DODO Learning demo classes. See The Loop in Navigator-led sessions with bilingual students. Three grade bands. Unedited.',
    },
    hero: {
      chip: 'Think Once. In Both Languages.',
      h1:   'See exactly what your child\u2019s sessions look like.',
      h1zh: '\u770b\u770b\u771f\u5b9e\u7684\u8bfe\u5802\u662f\u4ec0\u4e48\u6837\u5b50',
      sub:  'No pitch. No edited highlights. A real Navigator, a real student, working through a real session of The Loop. Watch before you decide.',
      cta1: 'Watch Demo Classes',
      cta2: 'Book Your Consultation',
      stats: [
        { value: '3',      unit: 'Grade Bands',  desc: 'Grades 4\u20136, 7\u20138, 9+' },
        { value: '20',     unit: 'Min',          desc: 'Full sessions, unedited'       },
        { value: '4',      unit: 'Loop Phases',  desc: 'Read \u00b7 Think \u00b7 Speak \u00b7 Write' },
        { value: '1',      unit: 'Real Student', desc: 'Parent consent given'          },
        { value: '1',      unit: 'Navigator',    desc: 'Live, no script'               },
        { value: '\u221e', unit: 'Free',          desc: 'No sign-up required'           },
      ],
    },
    videos: {
      eyebrow:   'Watch Before You Decide',
      h2:        'Demo classes and program explainers.',
      h2zh:      '\u793a\u8303\u8bfe\u4e0e\u8bfe\u7a0b\u4ecb\u7ecd',
      row1Label: 'Demo Class Recordings',
      row2Label: 'About the Program',
      cards: [
        // Row 1 — demo classes
        { videoId: YOUTUBE_IDS.demoGr46,       label: 'Emerging Reader',    labelZh: '\u6210\u957f\u671f\u8bfb\u8005', tag1: 'Grades 4\u20136', tag2: 'Lexile 580\u2013720', tag3: 'Read \u00b7 Think \u00b7 Write' },
        { videoId: YOUTUBE_IDS.demoGr78,       label: 'Independent Reader', labelZh: '\u72ec\u7acb\u9605\u8bfb\u8005', tag1: 'Grades 7\u20138', tag2: 'Lexile 820\u2013980', tag3: 'Full Loop' },
        { videoId: YOUTUBE_IDS.demoGr9plus,    label: 'Advanced Reader',    labelZh: '\u9ad8\u7ea7\u9605\u8bfb\u8005', tag1: 'Grades 9+',       tag2: 'Lexile 1020+',      tag3: 'Full Loop \u00b7 Extended' },
        // Row 2 — about
        { videoId: YOUTUBE_IDS.featured,       label: 'The Full Loop',      labelZh: '\u5b8c\u6574\u5faa\u73af\u5c55\u793a', tag1: 'Featured',   tag2: '20 min',  tag3: 'Grades 7\u20138' },
        { videoId: YOUTUBE_IDS.brandLoop,      label: 'The Loop Explained', labelZh: '\u5b66\u4e60\u5faa\u73af\u89e3\u6790', tag1: 'Method',     tag2: '5 min',   tag3: null },
        { videoId: YOUTUBE_IDS.brandNavigator, label: 'Meet a Navigator',   labelZh: '\u8ba4\u8bc6\u9886\u822a\u5458',       tag1: 'People',     tag2: '3 min',   tag3: null },
      ],
    },
    session: {
      eyebrow:       'Inside a Demo Session',
      navigatorName: 'Navigator Sarah',
      sessionPhase:  'Think Phase \u00b7 Lexile 740',
      h2:   'What you\u2019re actually watching.',
      h2zh: '\u4f60\u5728\u89c2\u770b\u4e00\u573a\u771f\u5b9e\u7684\u8bfe',
      p1: 'The Navigator doesn\u2019t introduce the student or explain the format. The session is already in progress:',
      q1: '\u201cYou said the author\u2019s main claim is about fairness. I want to push on that \u2014 what does fairness mean to the characters in this text versus what it means to you?\u201d',
      p2: 'The student pauses. Not out of confusion \u2014 out of thought. That pause is The Loop working.',
      p3: 'The Navigator doesn\u2019t fill the silence. They wait. When the student speaks, the answer is more precise than anything they\u2019d have said without the pause.',
      p4: 'At the end you\u2019ll hear the Navigator set the write prompt:',
      q4: '\u201cDraft a paragraph: what does fairness cost? Use two pieces of evidence from the text. I\u2019ll read it before next session.\u201d',
    },
    after: {
      eyebrow: 'After You Watch',
      h2:      'You\u2019ll know within 20 minutes.',
      h2zh:    '\u89c2\u770b\u540e\uff0c\u60a8\u5c06\u5fc3\u4e2d\u6709\u6570',
      body:    'Most parents tell us the demo answers the question they couldn\u2019t put into words before watching. Is this the right kind of challenge for my child? Watch the demo. Then book the diagnostic call. The Navigator who runs your consultation will be the same kind of person you see on screen.',
      cta:    'Book a Diagnostic Call',
    },
    growth: {
      eyebrow: 'What Students Achieve',
      h2:      'The demo shows the method. The numbers show the result.',
      h2zh:    '\u6f14\u793a\u5c55\u793a\u65b9\u6cd5\uff0c\u6570\u5b57\u8bc1\u660e\u6210\u679c',
      lexile: {
        h3:  'Lexile Reading Level',
        sub: 'Students who complete The 16-Week Program after watching the demo start with a clear baseline and finish with a measurable number.',
        note: 'The student in the Grade 7\u20138 demo started at <strong>Lexile 820</strong>. After 16 weeks: <strong>Lexile 1020</strong>. That\u2019s two full grade levels in four months.',
        start: 820, end: 1020,
      },
      trait: {
        h3:         '6+1 Trait Writing',
        sub:        'Every demo includes a live 6+1 Trait writing moment. These are average entry and exit scores across all 16-week program students.',
        startLabel: 'Entry',
        endLabel:   'Exit (16 wks)',
        scaleLabel: 'Scale 1\u20136',
        note:       'The writing growth you see in the demos is exactly what causes these scores to move. The Loop is the mechanism.',
      },
    },
    cta: {
      eyebrow: 'Ready to Talk',
      h2:      'Watched the demo. Want to know if it\u2019s right for your child?',
      h2zh:    '\u770b\u5b8c\u793a\u8303\uff0c\u60f3\u77e5\u9053\u662f\u5426\u9002\u5408\u60a8\u7684\u5b69\u5b50\uff1f',
      body:    'The diagnostic consultation is 20 minutes with a Navigator \u2014 not a sales call. We assess your child\u2019s current Lexile level, identify the specific gap, and map out what 16 weeks could look like for them. No commitment required to book.',
      btn:    'Book Your Consultation',
      note:   'With a Navigator, not a sales representative. Honest fit assessment \u2014 we only enroll students we can genuinely move.',
    },
    charter: {
      badge: 'Charter Enrollment Open',
      h2:    'Ready to start after watching?',
      sub:   'Charter families commit to The 16-Week Program at the founding rate. Not a promotion \u2014 a reward for deciding early.',
      btn1:  'Book Your Consultation',
      btn2:  'See The Program',
    },
  },

  zh: {
    meta: {
      title:       '\u89c2\u770b\u793a\u8303\u8bfe',
      description: '\u89c2\u770b DODO Learning \u7684\u771f\u5b9e\u793a\u8303\u8bfe\u3002\u4e09\u4e2a\u5e74\u7ea7\u7ec4\uff0c\u672a\u526a\u8f91\u7684\u5b8c\u6574\u5b66\u4e60\u5faa\u73af\u3002',
    },
    hero: {
      chip: 'Think Once. In Both Languages.',
      h1:   '\u770b\u770b\u771f\u5b9e\u7684\u8bfe\u5802\u662f\u4ec0\u4e48\u6837\u5b50',
      h1zh: 'See exactly what your child\u2019s sessions look like.',
      sub:  '\u6ca1\u6709\u9500\u552e\u8bdd\u672f\uff0c\u6ca1\u6709\u7cbe\u5fc3\u526a\u8f91\u3002\u4e00\u4f4d\u771f\u5b9e\u7684\u9886\u822a\u5458\uff0c\u4e00\u4f4d\u771f\u5b9e\u7684\u5b66\u751f\uff0c\u5b8c\u6574\u7684\u5b66\u4e60\u5faa\u73af\u3002\u5148\u770b\u518d\u51b3\u5b9a\u3002',
      cta1: '\u67e5\u770b\u793a\u8303\u8bfe',
      cta2: '\u9884\u7ea6\u514d\u8d39\u548b\u8be2',
      stats: [
        { value: '3',      unit: '\u5e74\u7ea7\u7ec4',       desc: '\u56db\u516d\u5e74\u7ea7\u3001\u4e03\u516b\u5e74\u7ea7\u3001\u4e5d\u5e74\u7ea7+' },
        { value: '20',     unit: '\u5206\u949f',             desc: '\u5b8c\u6574\u8bfe\u5802\uff0c\u672a\u526a\u8f91'          },
        { value: '4',      unit: '\u5faa\u73af\u9636\u6bb5', desc: '\u9605\u8bfb \u00b7 \u601d\u8003 \u00b7 \u8868\u8fbe \u00b7 \u5199\u4f5c' },
        { value: '1',      unit: '\u771f\u5b9e\u5b66\u751f', desc: '\u5df2\u83b7\u5bb6\u957f\u6388\u6743'                    },
        { value: '1',      unit: '\u9886\u822a\u5458',       desc: '\u5168\u7a0b\u73b0\u573a\uff0c\u65e0\u811a\u672c'         },
        { value: '\u221e', unit: '\u514d\u8d39',             desc: '\u65e0\u9700\u6ce8\u518c'                                 },
      ],
    },
    videos: {
      eyebrow:   '\u89c2\u770b\u540e\u518d\u51b3\u5b9a',
      h2:        '\u793a\u8303\u8bfe\u4e0e\u8bfe\u7a0b\u4ecb\u7ecd',
      h2zh:      'Demo classes and program explainers.',
      row1Label: '\u793a\u8303\u8bfe\u5f55\u50cf',
      row2Label: '\u5173\u4e8e\u8bfe\u7a0b',
      cards: [
        { videoId: YOUTUBE_IDS.demoGr46,       label: '\u6210\u957f\u671f\u8bfb\u8005', labelZh: 'Emerging Reader',    tag1: 'Grades 4\u20136', tag2: 'Lexile 580\u2013720', tag3: '\u9605\u8bfb \u00b7 \u601d\u8003 \u00b7 \u5199\u4f5c' },
        { videoId: YOUTUBE_IDS.demoGr78,       label: '\u72ec\u7acb\u9605\u8bfb\u8005', labelZh: 'Independent Reader', tag1: 'Grades 7\u20138', tag2: 'Lexile 820\u2013980', tag3: '\u5b8c\u6574\u5faa\u73af' },
        { videoId: YOUTUBE_IDS.demoGr9plus,    label: '\u9ad8\u7ea7\u9605\u8bfb\u8005', labelZh: 'Advanced Reader',    tag1: 'Grades 9+',       tag2: 'Lexile 1020+',      tag3: '\u5b8c\u6574\u5faa\u73af \u00b7 \u5ef6\u4f38' },
        { videoId: YOUTUBE_IDS.featured,       label: '\u5b8c\u6574\u5faa\u73af\u5c55\u793a', labelZh: 'The Full Loop',      tag1: '\u7cbe\u9009',    tag2: '20 \u5206\u949f', tag3: 'Grades 7\u20138' },
        { videoId: YOUTUBE_IDS.brandLoop,      label: '\u5b66\u4e60\u5faa\u73af\u89e3\u6790', labelZh: 'The Loop Explained', tag1: '\u65b9\u6cd5',    tag2: '5 \u5206\u949f',  tag3: null },
        { videoId: YOUTUBE_IDS.brandNavigator, label: '\u8ba4\u8bc6\u9886\u822a\u5458',       labelZh: 'Meet a Navigator',   tag1: '\u4eba\u7269',    tag2: '3 \u5206\u949f',  tag3: null },
      ],
    },
    session: {
      eyebrow:       '\u793a\u8303\u8bfe\u5185\u90e8',
      navigatorName: 'Navigator Sarah',
      sessionPhase:  '\u601d\u8003\u9636\u6bb5 \u00b7 Lexile 740',
      h2:   '\u4f60\u5728\u89c2\u770b\u4e00\u573a\u771f\u5b9e\u7684\u8bfe',
      h2zh: 'What you\u2019re actually watching.',
      p1: '\u9886\u822a\u5458\u4e0d\u4ecb\u7ecd\u5b66\u751f\uff0c\u4e5f\u4e0d\u89e3\u91ca\u683c\u5f0f\u3002\u8bfe\u5df2\u7ecf\u5f00\u59cb\uff1a',
      q1: '\u201c\u4f60\u8bf4\u4f5c\u8005\u7684\u4e3b\u8981\u8bba\u70b9\u662f\u516c\u5e73\u3002\u6211\u60f3\u8fdb\u4e00\u6b65\u63d0\u95ee\u2014\u2014\u8fd9\u7bc7\u6587\u672c\u4e2d\u7684\u4eba\u7269\u5bf9\u516c\u5e73\u7684\u7406\u89e3\uff0c\u4e0e\u4f60\u7684\u7406\u89e3\u6709\u4f55\u4e0d\u540c\uff1f\u201d',
      p2: '\u5b66\u751f\u505c\u987f\u4e86\u3002\u4e0d\u662f\u56e0\u4e3a\u56f0\u60d1\u2014\u2014\u800c\u662f\u56e0\u4e3a\u5728\u601d\u8003\u3002\u90a3\u4e2a\u505c\u987f\uff0c\u6b63\u662f\u5b66\u4e60\u5faa\u73af\u5728\u8d77\u4f5c\u7528\u3002',
      p3: '\u9886\u822a\u5458\u6ca1\u6709\u6253\u7834\u6c89\u9ed8\u3002\u4ed6\u4eec\u5728\u7b49\u5f85\u3002\u5f53\u5b66\u751f\u5f00\u53e3\uff0c\u56de\u7b54\u6bd4\u6ca1\u6709\u505c\u987f\u65f6\u66f4\u52a0\u7cbe\u786e\u3002',
      p4: '\u6700\u540e\uff0c\u60a8\u5c06\u542c\u5230\u9886\u822a\u5458\u5e03\u7f6e\u5199\u4f5c\u4efb\u52a1\uff1a',
      q4: '\u201c\u5199\u4e00\u6bb5\u8bdd\uff1a\u516c\u5e73\u9700\u8981\u4ed8\u51fa\u4ec0\u4e48\u4ee3\u4ef7\uff1f\u4ece\u6587\u672c\u4e2d\u627e\u4e24\u4e2a\u4f9d\u636e\u3002\u6211\u5728\u4e0b\u6b21\u8bfe\u524d\u4f1a\u9605\u8bfb\u3002\u201d',
    },
    after:   { eyebrow: '\u89c2\u770b\u540e', h2: '\u89c2\u770b\u540e\uff0c\u60a8\u5c06\u5fc3\u4e2d\u6709\u6570', h2zh: 'You\u2019ll know within 20 minutes.', body: '\u5927\u591a\u6570\u5bb6\u957f\u544a\u8bc9\u6211\u4eec\uff0c\u793a\u8303\u89e3\u7b54\u4e86\u4ed6\u4eec\u89c2\u770b\u524d\u65e0\u6cd5\u7528\u8bed\u8a00\u8868\u8fbe\u7684\u95ee\u9898\u3002\u89c2\u770b\u793a\u8303\uff0c\u7136\u540e\u9884\u7ea6\u8bfa\u65ad\u901a\u8bdd\u3002', cta: '\u9884\u7ea6\u8bfa\u65ad\u901a\u8bdd' },
    growth: {
      eyebrow: '\u5b66\u751f\u6210\u679c',
      h2:      '\u6f14\u793a\u5c55\u793a\u65b9\u6cd5\uff0c\u6570\u5b57\u8bc1\u660e\u6210\u679c',
      h2zh:    'The demo shows the method. The numbers show the result.',
      lexile:  { h3: 'Lexile \u9605\u8bfb\u7b49\u7ea7', sub: '\u89c2\u770b\u793a\u8303\u540e\u53c2\u52a0\u5341\u516d\u5468\u8bfe\u7a0b\u7684\u5b66\u751f\uff0c\u4ece\u6e05\u6670\u7684\u57fa\u7ebf\u51fa\u53d1\uff0c\u5f97\u5230\u53ef\u8861\u91cf\u7684\u6570\u5b57\u7ed3\u679c\u3002', note: '\u4e03\u81f3\u516b\u5e74\u7ea7\u793a\u8303\u4e2d\u7684\u5b66\u751f\u8d77\u59cb\u4e8e <strong>Lexile 820</strong>\u3002\u5341\u516d\u5468\u540e\uff1a<strong>Lexile 1020</strong>\u3002\u56db\u4e2a\u6708\u5185\u63d0\u5347\u4e86\u4e24\u4e2a\u5b8c\u6574\u5e74\u7ea7\u3002', start: 820, end: 1020 },
      trait:   { h3: '6+1 \u5199\u4f5c\u7279\u8d28', sub: '\u6bcf\u4e2a\u793a\u8303\u8bfe\u90fd\u5305\u542b\u4e00\u4e2a\u5b9e\u65f66+1\u5199\u4f5c\u7279\u8d28\u8bc4\u5206\u73af\u8282\u3002', startLabel: '\u5165\u5b66', endLabel: '\u7ed3\u4e1a (16\u5468)', scaleLabel: '\u8bc4\u5206 1\u20136', note: '\u5b66\u4e60\u5faa\u73af\u662f\u63a8\u52a8\u8bc4\u5206\u63d0\u5347\u7684\u52a8\u56e0\u3002' },
    },
    cta:     { eyebrow: '\u51c6\u5907\u8c08\u8c08', h2: '\u770b\u5b8c\u793a\u8303\uff0c\u60f3\u77e5\u9053\u662f\u5426\u9002\u5408\u60a8\u7684\u5b69\u5b50\uff1f', h2zh: 'Watched the demo. Want to know if it\u2019s right for your child?', body: '\u8bfa\u65ad\u548b\u8be2\u662f\u4e0e\u9886\u822a\u5458\u4e00\u5bf9\u4e00\u7684\u4e8c\u5341\u5206\u949f\u5bf9\u8bdd\u2014\u2014\u4e0d\u662f\u9500\u552e\u7535\u8bdd\u3002\u9884\u7ea6\u65e0\u9700\u627f\u8bfa\u3002', btn: '\u9884\u7ea6\u514d\u8d39\u8bfa\u65ad\u901a\u8bdd', note: '\u548b\u8be2\u7531\u9886\u822a\u5458\u4e3b\u6301\uff0c\u8bda\u5b9e\u7684\u9002\u5408\u6027\u8bc4\u4f30\u3002' },
    charter: { badge: 'Charter Enrollment Open', h2: '\u89c2\u770b\u540e\u51b3\u5b9a\u5f00\u59cb\uff1f', sub: '\u521b\u59cb\u5bb6\u5ead\u4ee5\u521b\u59cb\u8d39\u7387\u627f\u8bfa\u53c2\u52a0\u5341\u516d\u5468\u8bfe\u7a0b\u3002\u4e0d\u662f\u4fc3\u9500\u2014\u2014\u662f\u5bf9\u65e9\u51b3\u5b9a\u8005\u7684\u56de\u62a5\u3002', btn1: '\u9884\u7ea6\u548b\u8be2', btn2: '\u67e5\u770b\u8bfe\u7a0b' },
  },
}

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────

function BilingualH2({ primary, secondary, light = false, center = false, id }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2 id={id} style={{ fontSize: 'clamp(1.75rem, 3vw + 0.25rem, 2.75rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.025em', color: light ? '#F0F0F0' : '#0E0E12', textWrap: 'balance', marginBottom: 0 }}>{primary}</h2>
      <p className="mt-2" style={{ fontFamily: 'var(--font-cjk)', fontSize: '15px', fontWeight: 500, color: light ? '#b7b5fe' : '#5856cc', lineHeight: 1.5 }}>{secondary}</p>
    </div>
  )
}

function Eyebrow({ children, center = false, dark = false }) {
  return <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: dark ? '#b7b5fe' : '#5856cc', marginBottom: '0.875rem', textAlign: center ? 'center' : undefined }}>{children}</p>
}

function Tag({ children, variant = 'default' }) {
  const s = {
    default: { backgroundColor: 'rgba(14,14,18,0.05)',   border: '1px solid rgba(14,14,18,0.09)',     color: '#7B8494' },
    violet:  { backgroundColor: 'rgba(183,181,254,0.08)', border: '1px solid rgba(183,181,254,0.2)',  color: '#5856cc' },
    dark:    { backgroundColor: 'rgba(183,181,254,0.06)', border: '1px solid rgba(183,181,254,0.15)', color: '#b7b5fe', letterSpacing: '0.07em' },
  }
  return <span style={{ padding: '2px 9px', borderRadius: '9999px', fontSize: '10px', fontWeight: 700, lineHeight: 1.5, whiteSpace: 'nowrap', ...s[variant] }}>{children}</span>
}

// ─────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// ─────────────────────────────────────────────────────────────

function Hero({ locale, c }) {
  return (
    <section aria-labelledby="demos-hero-heading" style={{ backgroundColor: '#0E0E12', minHeight: '100dvh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 50% at 80% 30%, rgba(183,181,254,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div className="container-section relative z-10" style={{ flex: 1, display: 'flex', alignItems: 'center', paddingTop: 'calc(var(--nav-height) + 3.5rem)', paddingBottom: '2.5rem' }}>
        <div style={{ maxWidth: '46rem' }}>
          <div className="inline-flex items-center gap-2 mb-7 rounded-full" style={{ padding: '5px 14px', border: '1px solid rgba(183,181,254,0.18)', backgroundColor: 'rgba(183,181,254,0.05)' }}>
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#b7b5fe' }} />
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#b7b5fe' }}>{c.hero.chip}</span>
          </div>
          <h1 id="demos-hero-heading" style={{ fontSize: 'clamp(2.25rem, 5vw + 0.5rem, 4rem)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.03em', color: '#F0F0F0', marginBottom: '0.625rem', textWrap: 'balance' }}>{c.hero.h1}</h1>
          <p style={{ fontFamily: 'var(--font-cjk)', fontSize: '17px', fontWeight: 500, color: 'rgba(183,181,254,0.45)', marginBottom: '1.25rem', lineHeight: 1.5 }}>{c.hero.h1zh}</p>
          <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'rgba(240,240,240,0.5)', maxWidth: '36rem', marginBottom: '2.25rem' }}>{c.hero.sub}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#demo-videos" className="btn btn-primary" style={{ fontWeight: 700 }}>{c.hero.cta1}</a>
            <Link href={`/${locale}/consult`} className="btn btn-ghost">{c.hero.cta2}</Link>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(183,181,254,0.07)', flexShrink: 0, position: 'relative', zIndex: 10 }}>
        <div className="container-section">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} className="sm:grid-cols-6">
            {c.hero.stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '1.125rem 0.375rem', borderRight: i !== 2 && i !== 5 ? '1px solid rgba(183,181,254,0.07)' : 'none', borderBottom: i < 3 ? '1px solid rgba(183,181,254,0.07)' : 'none' }}>
                <p style={{ fontSize: 'clamp(1.375rem, 2.5vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: '#b7b5fe' }}>{stat.value}</p>
                <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(240,240,240,0.75)', marginTop: '3px', lineHeight: 1.2 }}>{stat.unit}</p>
                <p style={{ fontSize: '0.625rem', color: 'rgba(183,181,254,0.35)', marginTop: '2px', lineHeight: 1.3 }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTIONS 2–4 — VIDEO GALLERY (3-per-row, 2 labelled rows)
// ─────────────────────────────────────────────────────────────

function VideoGallery({ locale, c }) {
  const row1 = c.videos.cards.slice(0, 3)
  const row2 = c.videos.cards.slice(3, 6)

  function VideoCard({ card }) {
    return (
      <article
        aria-label={`${card.label} — ${card.labelZh}`}
        style={{
          backgroundColor: '#ffffff',
          border:          '1px solid rgba(14,14,18,0.08)',
          borderRadius:    '0.875rem',
          overflow:        'hidden',
          boxShadow:       '0 1px 3px rgba(0,0,0,0.05)',
          display:         'flex',
          flexDirection:   'column',
        }}
      >
        {/* Thumbnail — flush, no internal padding */}
        <YoutubeEmbed videoId={card.videoId} title={`${card.label} — ${card.labelZh}`} rounded="0" />

        {/* Compact metadata strip */}
        <div style={{ padding: '0.625rem 0.75rem 0.875rem' }}>
          {/* Pill row */}
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <Tag variant="violet">{card.tag1}</Tag>
            <Tag variant="default">{card.tag2}</Tag>
            {card.tag3 && <Tag variant="default">{card.tag3}</Tag>}
          </div>
          {/* Title */}
          <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0E0E12', lineHeight: 1.3, marginBottom: '1px' }}>
            {card.label}
          </p>
          <p style={{ fontFamily: 'var(--font-cjk)', fontSize: '10px', color: '#5856cc', lineHeight: 1.3 }}>
            {card.labelZh}
          </p>
        </div>
      </article>
    )
  }

  return (
    <section id="demo-videos" aria-labelledby="video-gallery-heading" style={{ backgroundColor: '#ffffff', padding: 'var(--section-md) 0' }}>
      <div className="container-section">

        {/* Section header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Eyebrow>{c.videos.eyebrow}</Eyebrow>
          <BilingualH2 id="video-gallery-heading" primary={c.videos.h2} secondary={c.videos.h2zh} />
        </div>

        {/* Row 1 — Demo Classes */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5856cc' }}>
              {c.videos.row1Label}
            </p>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(14,14,18,0.07)' }} aria-hidden="true" />
          </div>
          <div style={{ display: 'grid', gap: '1rem' }} className="md:grid-cols-3">
            {row1.map((card, i) => <VideoCard key={i} card={card} />)}
          </div>
        </div>

        {/* Row 2 — About */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5856cc' }}>
              {c.videos.row2Label}
            </p>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(14,14,18,0.07)' }} aria-hidden="true" />
          </div>
          <div style={{ display: 'grid', gap: '1rem' }} className="md:grid-cols-3">
            {row2.map((card, i) => <VideoCard key={i} card={card} />)}
          </div>
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 5 — INSIDE A SESSION
// ─────────────────────────────────────────────────────────────

const SESSION_IMG = 'https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80'

function InsideSession({ locale, c }) {
  return (
    <section aria-labelledby="session-heading" style={{ position: 'relative', overflow: 'hidden', minHeight: '500px' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SESSION_IMG} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(14,14,18,0.97) 0%, rgba(14,14,18,0.90) 45%, rgba(14,14,18,0.55) 100%)' }} />
      <div className="container-section relative z-10" style={{ padding: 'var(--section-md) 1.25rem' }}>
        <div style={{ maxWidth: '40rem' }}>
          <div className="inline-flex items-center gap-2.5 rounded-full mb-7" style={{ padding: '7px 14px 7px 7px', backgroundColor: 'rgba(183,181,254,0.07)', border: '1px solid rgba(183,181,254,0.14)' }}>
            <span aria-hidden="true" style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#b7b5fe', color: '#0E0E12', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>NV</span>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2 }}>{c.session.navigatorName}</p>
              <p style={{ fontSize: '10px', color: 'rgba(183,181,254,0.55)', lineHeight: 1.2 }}>{c.session.sessionPhase}</p>
            </div>
          </div>
          <Eyebrow dark>{c.session.eyebrow}</Eyebrow>
          <BilingualH2 id="session-heading" primary={c.session.h2} secondary={c.session.h2zh} light />
          <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>{c.session.p1}{' '}<em style={{ fontStyle: 'italic', color: 'rgba(183,181,254,0.8)' }}>{c.session.q1}</em></p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>{c.session.p2}</p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>{c.session.p3}</p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>{c.session.p4}{' '}<em style={{ fontStyle: 'italic', color: 'rgba(183,181,254,0.8)' }}>{c.session.q4}</em></p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 6 — AFTER THE DEMO
// ─────────────────────────────────────────────────────────────

function AfterDemo({ locale, c }) {
  return (
    <section aria-labelledby="after-heading" style={{ backgroundColor: '#212830', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ maxWidth: '40rem' }}>
          <Eyebrow dark>{c.after.eyebrow}</Eyebrow>
          <BilingualH2 id="after-heading" primary={c.after.h2} secondary={c.after.h2zh} light />
          <p style={{ fontSize: '1rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.55)', marginTop: '1.125rem', marginBottom: '1.875rem' }}>{c.after.body}</p>
          <Link href={`/${locale}/consult`} className="btn btn-primary">{c.after.cta}</Link>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 7 — RESULTS
// ─────────────────────────────────────────────────────────────

function LexileScaleViz({ start, end }) {
  const MIN = 200, MAX = 1200, SPAN = MAX - MIN
  const topPct = (l) => ((MAX - l) / SPAN) * 100
  const hlTop = topPct(end), hlH = topPct(start) - hlTop
  return (
    <div style={{ position: 'relative', height: '300px', width: '160px', flexShrink: 0 }} role="img" aria-label={`Lexile scale. Highlighted: ${start}L to ${end}L`}>
      <div aria-hidden="true" style={{ position: 'absolute', left: '16px', top: 0, bottom: 0, width: '3px', backgroundColor: 'rgba(183,181,254,0.1)', borderRadius: '9999px' }} />
      <div aria-hidden="true" style={{ position: 'absolute', left: '16px', top: `${hlTop}%`, height: `${hlH}%`, width: '3px', backgroundColor: '#b7b5fe', borderRadius: '9999px', boxShadow: '0 0 12px rgba(183,181,254,0.5)' }} />
      {LEXILE_SCALE.map((row) => {
        const yPct = topPct(row.level), inRange = row.level >= start && row.level <= end
        return (
          <div key={row.level} aria-hidden="true" style={{ position: 'absolute', top: `${yPct}%`, left: 0, transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: inRange ? '#b7b5fe' : 'rgba(183,181,254,0.18)', marginLeft: '13px', flexShrink: 0, boxShadow: inRange ? '0 0 6px rgba(183,181,254,0.4)' : 'none' }} />
            <div>
              <span style={{ fontSize: '10px', fontWeight: inRange ? 700 : 500, color: inRange ? '#b7b5fe' : 'rgba(183,181,254,0.28)', display: 'block', lineHeight: 1.2 }}>{row.level}L</span>
              <span style={{ fontSize: '9px', color: inRange ? 'rgba(183,181,254,0.65)' : 'rgba(183,181,254,0.2)', lineHeight: 1.2 }}>{row.grade}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ResultsSection({ locale, c }) {
  return (
    <section aria-labelledby="results-heading" style={{ backgroundColor: '#0E0E12', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ marginBottom: '3.5rem' }}>
          <Eyebrow dark>{c.growth.eyebrow}</Eyebrow>
          <BilingualH2 id="results-heading" primary={c.growth.h2} secondary={c.growth.h2zh} light />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3.5rem' }} className="lg:grid-cols-2">
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#b7b5fe', marginBottom: '0.375rem', letterSpacing: '-0.01em' }}>{c.growth.lexile.h3}</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.72, color: 'rgba(240,240,240,0.45)', marginBottom: '1.75rem' }}>{c.growth.lexile.sub}</p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <LexileScaleViz start={c.growth.lexile.start} end={c.growth.lexile.end} />
              <p style={{ fontSize: '0.875rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.5)', flex: 1, paddingTop: '0.5rem' }} dangerouslySetInnerHTML={{ __html: c.growth.lexile.note }} />
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#b7b5fe', marginBottom: '0.375rem', letterSpacing: '-0.01em' }}>{c.growth.trait.h3}</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.72, color: 'rgba(240,240,240,0.45)', marginBottom: '1.25rem' }}>{c.growth.trait.sub}</p>
            <div className="flex items-center gap-4" style={{ marginBottom: '0.75rem' }} aria-hidden="true">
              <div className="flex items-center gap-1.5"><div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'rgba(183,181,254,0.18)' }} /><span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(183,181,254,0.4)' }}>{c.growth.trait.startLabel}</span></div>
              <div className="flex items-center gap-1.5"><div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#b7b5fe' }} /><span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(183,181,254,0.7)' }}>{c.growth.trait.endLabel}</span></div>
              <span style={{ fontSize: '10px', color: 'rgba(183,181,254,0.22)', marginLeft: 'auto' }}>{c.growth.trait.scaleLabel}</span>
            </div>
            <div>
              {TRAITS.map((trait) => {
                const label = locale === 'zh' ? trait.zh : trait.en
                const sPct = (trait.start / 6) * 100, gainPct = ((trait.end - trait.start) / 6) * 100
                return (
                  <div key={trait.id} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 52px', gap: '0.75rem', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid rgba(183,181,254,0.05)' }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#F0F0F0', lineHeight: 1.2 }}>{label}</p>
                    <div style={{ position: 'relative', height: '7px', backgroundColor: 'rgba(183,181,254,0.07)', borderRadius: '9999px', overflow: 'hidden' }} aria-label={`${label}: ${trait.start} to ${trait.end}`}>
                      <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${sPct}%`, backgroundColor: 'rgba(183,181,254,0.15)', borderRadius: '9999px' }} />
                      <div aria-hidden="true" style={{ position: 'absolute', left: `${sPct}%`, top: 0, height: '100%', width: `${gainPct}%`, backgroundColor: '#b7b5fe', borderRadius: '9999px' }} />
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(183,181,254,0.5)', textAlign: 'right', whiteSpace: 'nowrap' }}>{trait.start}→<span style={{ color: '#b7b5fe', fontWeight: 700 }}>{trait.end}</span></p>
                  </div>
                )
              })}
            </div>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.72, color: 'rgba(240,240,240,0.35)', marginTop: '1rem' }}>{c.growth.trait.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 8 — BOOK A CALL
// ─────────────────────────────────────────────────────────────

function BookCall({ locale, c }) {
  return (
    <section aria-labelledby="book-heading" style={{ backgroundColor: '#F5F5FF', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ maxWidth: '40rem' }}>
          <Eyebrow>{c.cta.eyebrow}</Eyebrow>
          <BilingualH2 id="book-heading" primary={c.cta.h2} secondary={c.cta.h2zh} />
          <p style={{ fontSize: '1rem', lineHeight: 1.82, color: '#3D4452', marginTop: '1.125rem', marginBottom: '1.875rem' }}>{c.cta.body}</p>
          <Link href={`/${locale}/consult`} className="btn btn-charter">{c.cta.btn}</Link>
          <p style={{ fontSize: '0.8125rem', color: '#7B8494', marginTop: '0.875rem' }}>{c.cta.note}</p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 9 — CHARTER
// ─────────────────────────────────────────────────────────────

function CharterSection({ locale, c }) {
  return (
    <section aria-labelledby="charter-heading" style={{ backgroundColor: '#212830', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ maxWidth: '40rem' }}>
          <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{ padding: '4px 12px', backgroundColor: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.22)' }}>
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#F5C842' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#F5C842' }}>{c.charter.badge}</span>
          </div>
          <h2 id="charter-heading" style={{ fontSize: 'clamp(1.625rem, 2.5vw + 0.25rem, 2.5rem)', fontWeight: 700, letterSpacing: '-0.025em', color: '#F0F0F0', marginBottom: '0.625rem' }}>{c.charter.h2}</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(240,240,240,0.45)', marginBottom: '1.875rem' }}>{c.charter.sub}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={`/${locale}/consult`} className="btn btn-charter">{c.charter.btn1}</Link>
            <Link href={`/${locale}/program`} className="btn btn-ghost">{c.charter.btn2}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// METADATA + PAGE EXPORT
// ─────────────────────────────────────────────────────────────

export function generateStaticParams() { return localeParams() }

export async function generateMetadata({ params }) {
  const { locale } = await params
  const c = COPY[locale] ?? COPY.en
  return buildMetadata({ locale, path: '/demos', title: c.meta.title, description: c.meta.description })
}

export default async function DemosPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en
  return (
    <>
      <Hero           locale={locale} c={c} />
      <VideoGallery   locale={locale} c={c} />
      <InsideSession  locale={locale} c={c} />
      <AfterDemo      locale={locale} c={c} />
      <ResultsSection locale={locale} c={c} />
      <BookCall       locale={locale} c={c} />
      <CharterSection locale={locale} c={c} />
    </>
  )
}