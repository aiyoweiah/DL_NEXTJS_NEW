// app/[locale]/page.tsx
//
// Homepage. SEO priority: Highest.
// Bilingual: all copy switches via HOMEPAGE_COPY[locale].
//
// Sections:
//   1.  Hero              — LIGHT  (#F5F5FF)
//   2.  ProofStrip        — DARK   (#212830)
//   3.  PhotoIntro        — WHITE  (#ffffff)
//   4.  LoopSection       — DARK   (#212830)
//   5.  ConfidenceSection — LIGHT  (#F5F5FF)
//   6.  ParentTrustSection— DARK   (#212830)
//   7.  ClosingCTA        — DARKER (#0E0E12)
//
// Pure server component. Zero 'use client'.

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import LexileBar                        from '@/components/ui/LexileBar'

// ── Metadata ──────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const c = HOMEPAGE_COPY[locale] ?? HOMEPAGE_COPY.en
  return buildMetadata({
    locale,
    path:        '/',
    title:       c.meta.title,
    description: c.meta.description,
  })
}

// ─────────────────────────────────────────────────────────────
// BILINGUAL COPY
// ─────────────────────────────────────────────────────────────
const HOMEPAGE_COPY: Record<string, any> = {
  en: {
    meta: {
      title:       'DODO Learning \u2014 Bilingual Thinking Program for Globally Mobile Families',
      description:
        'The only live, Navigator-led program that trains the full Read \u2192 Think \u2192 Speak \u2192 Write loop \u2014 for Chinese-speaking families in Canada and the US. One grade level of reading growth in 16 weeks, measured by Lexile.',
    },
    hero: {
      eyebrow:       'For Globally Mobile Families',
      eyebrow2:      'Charter Enrollment',
      h1:            ['Build the edge.\u00a0', 'Own both languages.\u00a0'],
      h1Chinese:     '\u4e0d\u662f\u8ffd\u8d76\u3002\u662f\u9886\u8dd1\u3002',
      differentiator: '\u5176\u4ed6\u8bfe\u7a0b\u6559\u5b69\u5b50\u8bf4\u4ec0\u4e48\u3002\u6211\u4eec\u6559\u5b69\u5b50\u600e\u4e48\u53cc\u8bed\u601d\u8003\u3002',
      consultHook:
        'The only live, high-touch program that trains the full\u00a0Read \u2192 Think \u2192 Speak \u2192 Write loop \u2014 for families who live between two languages.',
      cta1:          'Book Your Consultation',
      cta2:          'See The 16-Week Program',
      trustLine:     'Lexile-measured progress\u00a0\u00b7\u00a06+1 Trait writing framework\u00a0\u00b7\u00a0Live Navigator-led sessions',
    },
    proof: [
      { id: 'lexile',  number: '1',       unit: 'grade level',                label: 'average reading growth in 16 weeks, measured by Lexile' },
      { id: 'writing', number: '2\u00d7', unit: 'writing score improvement',  label: 'average 6+1 Trait score gain from entry to exit assessment' },
      { id: 'live',    number: '100%',    unit: 'live sessions',              label: 'no pre-recorded content \u2014 every session is Navigator-led' },
    ],
    photoIntro: {
      eyebrow:  'Who We Are',
      heading:  'The difference between a teacher and a Navigator is a map.',
      body1:
        'Navigators are not tutors. They are specialists in composition, literature, and academic writing \u2014 trained to close the gap between a student\u2019s current reading level and the level their academic life demands.',
      body2:
        'Every Navigator tracks one thing per student: the distance between their current Lexile level and their goal \u2014 and closes it, week by week, through The Loop.',
      cta1:     'Meet the Navigators',
      cta2:     'See Student Results',
      imgLabel: 'Navigator Session',
    },
    loop: {
      eyebrow:  'The Methodology',
      heading:  'The Loop',
      body:     'Every session. Every week. In this order, without exception. Read\u00a0\u2192\u00a0Think\u00a0\u2192\u00a0Speak\u00a0\u2192\u00a0Write is not a framework we teach about \u2014 it is what we do.',
      cta:      'Read the full methodology \u2192',
      steps: [
        { id: 'read',  number: '01', label: 'Read',  description: 'Students read texts carefully chosen at or just above their current Lexile level. The text is the raw material \u2014 nothing is simplified.' },
        { id: 'think', number: '02', label: 'Think', description: 'Before speaking, students are trained to form a position. What do they actually think? Not what they think they should think.' },
        { id: 'speak', number: '03', label: 'Speak', description: 'Students articulate their thinking in a live Socratic session with their Navigator. Precision in speech precedes precision in writing.' },
        { id: 'write', number: '04', label: 'Write', description: 'Students produce written work assessed with the 6+1 Trait framework. Their Navigator scores each piece. Growth is visible and measurable.' },
      ],
    },
    confidence: {
      eyebrow:  'How It Works',
      heading:  'We don\u2019t promise fluency. We deliver a grade level of literacy growth.',
      body:     'In 16 weeks. Measured by Lexile. Shown in writing scores. Every claim we make is a number we can prove.',
      pillars: [
        {
          id:        'assessment',
          eyebrow:   'Before We Begin',
          heading:   'We find out exactly where your child is.',
          body:      'Not where their school report says they are. Before the first session, every student receives a Lexile reading assessment and a baseline 6+1 Trait writing evaluation. We prescribe from data, not from guesswork.',
          linkHref:  '/program',
          linkLabel: 'How the assessment works',
        },
        {
          id:        'loop',
          eyebrow:   'During The Program',
          heading:   'Every session runs The Loop.',
          body:      'Read. Think. Speak. Write. Your child\u2019s Navigator tracks their movement through each phase every week. Nothing is guessed. Everything is guided. The Hangar provides structured support between sessions.',
          linkHref:  '/the-hangar',
          linkLabel: 'About The Hangar',
        },
        {
          id:        'results',
          eyebrow:   'After 16 Weeks',
          heading:   'We show you the numbers.',
          body:      'Every student receives an exit Lexile assessment and a re-evaluated 6+1 Trait writing score. We show you the before and after. Then you decide what comes next.',
          linkHref:  '/results',
          linkLabel: 'View student results',
        },
      ],
    },
    trust: {
      eyebrow:    'Student Results',
      heading1:   'The numbers speak first.',
      heading2:   'Then the parents.',
      viewAll:    'View all results \u2192',
      weeksLabel: 'weeks',
      results: [
        { id: 'result-1', student: 'Student A', detail: 'Grade 5 \u00b7 Vancouver',              start: 620, end: 820, weeks: 16, trait: 'Voice: 2 \u2192 4',        quote: 'She started raising her hand in class by week eight. By week twelve she was leading the discussion.',                           source: 'Parent, Vancouver' },
        { id: 'result-2', student: 'Student B', detail: 'Grade 6 \u00b7 Markham',                start: 540, end: 720, weeks: 16, trait: 'Organization: 2 \u2192 5',  quote: 'His teacher told us his writing had transformed. The 6+1 scores made it easy to see exactly what changed.',                   source: 'Parent, Markham' },
        { id: 'result-3', student: 'Student C', detail: 'Grade 7 \u00b7 San Francisco Bay Area', start: 710, end: 940, weeks: 16, trait: 'Ideas: 3 \u2192 5',          quote: 'She went from dreading writing assignments to submitting them early. The Navigator knew exactly where she was stuck.',           source: 'Parent, Bay Area' },
      ],
    },
    closing: {
      eyebrow:  'Charter Enrollment',
      heading:  'The diagnostic consultation is where we find out exactly where your child is.',
      body:     'Not where their school says they are. We measure their Lexile level, identify the specific gap, and tell you exactly what the first 16 weeks looks like for a student exactly like yours.',
      cta1:     'Book Your Consultation',
      cta2:     'Read About The Program',
      tagline:  'Think Once. In Both Languages.',
    },
  },

  zh: {
    meta: {
      title:       'DODO Learning \u2014 \u9762\u5411\u5168\u7403\u534e\u8bed\u5bb6\u5ead\u7684\u53cc\u8bed\u601d\u7ef4\u8bfe\u7a0b',
      description:
        '\u552f\u4e00\u7531\u5bfc\u5e08\u4e3b\u5bfc\u7684\u5b9e\u65f6\u8bfe\u7a0b\uff0c\u8bad\u7ec3\u5b8c\u6574\u7684\u9605\u8bfb\u2192\u601d\u8003\u2192\u8868\u8fbe\u2192\u5199\u4f5c\u95ed\u73af\u2014\u2014\u9762\u5411\u52a0\u62ff\u5927\u548c\u7f8e\u56fd\u7684\u534e\u8bed\u5bb6\u5ead\u3002\u516816\u5468\u5185\u63d0\u5347\u4e00\u4e2a\u5e74\u7ea7\u7684\u9605\u8bfb\u6c34\u5e73\uff0c\u4ee5Lexile\u6d4b\u91cf\u3002',
    },
    hero: {
      eyebrow:       '\u9762\u5411\u5168\u7403\u6d41\u52a8\u5bb6\u5ead',
      eyebrow2:      'Charter \u62a5\u540d\u5f00\u653e\u4e2d',
      h1:            ['\u5efa\u7acb\u4f18\u52bf\u3002\u00a0', '\u638c\u63e1\u4e24\u79cd\u8bed\u8a00\u3002\u00a0'],
      h1Chinese:     '\u4e0d\u662f\u8ffd\u8d76\u3002\u662f\u9886\u8dd1\u3002',
      differentiator: '\u5176\u4ed6\u8bfe\u7a0b\u6559\u5b69\u5b50\u8bf4\u4ec0\u4e48\u3002\u6211\u4eec\u6559\u5b69\u5b50\u600e\u4e48\u53cc\u8bed\u601d\u8003\u3002',
      consultHook:
        '\u552f\u4e00\u80fd\u8bad\u7ec3\u5b8c\u6574\u9605\u8bfb\u2192\u601d\u8003\u2192\u8868\u8fbe\u2192\u5199\u4f5c\u95ed\u73af\u7684\u5b9e\u65f6\u9ad8\u5f3a\u5ea6\u8bfe\u7a0b\u2014\u2014\u4e3a\u751f\u6d3b\u5728\u4e24\u79cd\u8bed\u8a00\u4e4b\u95f4\u7684\u5bb6\u5ead\u800c\u8bbe\u8ba1\u3002',
      cta1:          '\u9884\u7ea6\u548c\u8be2',
      cta2:          '\u4e86\u89e316\u5468\u8bfe\u7a0b',
      trustLine:     'Lexile\u6d4b\u91cf\u8fdb\u5ea6\u00a0\u00b7\u00a06+1\u7279\u8d28\u5199\u4f5c\u6846\u67b6\u00a0\u00b7\u00a0\u5bfc\u5e08\u5b9e\u65f6\u4e3b\u5bfc',
    },
    proof: [
      { id: 'lexile',  number: '1',       unit: '\u4e2a\u5e74\u7ea7',          label: '16\u5468\u5185Lexile\u6d4b\u91cf\u7684\u5e73\u5747\u9605\u8bfb\u589e\u957f' },
      { id: 'writing', number: '2\u00d7', unit: '\u5199\u4f5c\u8bc4\u5206\u63d0\u5347', label: '\u5165\u5b66\u81f3\u7ed3\u8bfe\u8bc4\u4f306+1\u7279\u8d28\u5e73\u5747\u5f97\u5206\u589e\u957f' },
      { id: 'live',    number: '100%',    unit: '\u5b9e\u65f6\u8bfe\u7a0b',    label: '\u6ca1\u6709\u9884\u5f55\u5185\u5bb9\u2014\u2014\u6bcf\u8282\u8bfe\u5747\u7531\u5bfc\u5e08\u4e3b\u5bfc' },
    ],
    photoIntro: {
      eyebrow:  '\u6211\u4eec\u662f\u8c01',
      heading:  '\u8001\u5e08\u4e0e\u5bfc\u5e08\u7684\u533a\u522b\uff0c\u5728\u4e8e\u4e00\u5f20\u5730\u56fe\u3002',
      body1:
        '\u5bfc\u5e08\u4e0d\u662f\u8865\u4e60\u8001\u5e08\u3002\u4ed6\u4eec\u662f\u5199\u4f5c\u3001\u6587\u5b66\u548c\u5b66\u672f\u5199\u4f5c\u9886\u57df\u7684\u4e13\u5bb6\u2014\u2014\u62c5\u8d1f\u5f25\u5408\u5b66\u751f\u5f53\u524d\u9605\u8bfb\u6c34\u5e73\u4e0e\u5b66\u4e1a\u9700\u6c42\u4e4b\u95f4\u5dee\u8ddd\u7684\u91cd\u8d23\u3002',
      body2:
        '\u6bcf\u4f4d\u5bfc\u5e08\u53ea\u8ffd\u8e2a\u6bcf\u4f4d\u5b66\u751f\u7684\u4e00\u4ef6\u4e8b\uff1a\u5f53\u524dLexile\u6c34\u5e73\u4e0e\u76ee\u6807\u4e4b\u95f4\u7684\u8ddd\u79bb\u2014\u2014\u5e76\u901a\u8fc7The Loop\u9010\u5468\u7f29\u5c0f\u8fd9\u4e2a\u8ddd\u79bb\u3002',
      cta1:     '\u8ba4\u8bc6\u5bfc\u5e08\u56e2\u961f',
      cta2:     '\u67e5\u770b\u5b66\u751f\u6210\u679c',
      imgLabel: '\u5bfc\u5e08\u5728\u7ebf\u8bfe',
    },
    loop: {
      eyebrow:  '\u6559\u5b66\u65b9\u6cd5',
      heading:  'The Loop',
      body:     '\u6bcf\u8282\u8bfe\u3002\u6bcf\u4e00\u5468\u3002\u59cb\u7ec8\u6309\u8fd9\u4e2a\u987a\u5e8f\u3002\u9605\u8bfb\u00a0\u2192\u00a0\u601d\u8003\u00a0\u2192\u00a0\u8868\u8fbe\u00a0\u2192\u00a0\u5199\u4f5c\u4e0d\u662f\u6211\u4eec\u6559\u6388\u7684\u6846\u67b6\u2014\u2014\u800c\u662f\u6211\u4eec\u5b9e\u9645\u7684\u505a\u6cd5\u3002',
      cta:      '\u9605\u8bfb\u5b8c\u6574\u6559\u5b66\u65b9\u6cd5 \u2192',
      steps: [
        { id: 'read',  number: '01', label: 'Read',  description: '\u5b66\u751f\u9605\u8bfb\u7cbe\u5fc3\u9009\u5b9a\u5728\u5f53\u524dLexile\u6c34\u5e73\u6216\u7565\u9ad8\u4e00\u7b51\u7684\u6587\u672c\u3002\u6587\u672c\u662f\u539f\u6750\u6599\u2014\u2014\u6ca1\u6709\u4efb\u4f55\u7b80\u5316\u3002' },
        { id: 'think', number: '02', label: 'Think', description: '\u5728\u5f00\u53e3\u4e4b\u524d\uff0c\u5b66\u751f\u9996\u5148\u88ab\u8bad\u7ec3\u5f62\u6210\u4e00\u4e2a\u7acb\u573a\u3002\u4ed6\u4eec\u771f\u6b63\u8ba4\u4e3a\u4ec0\u4e48\uff1f\u800c\u975e\u4ed6\u4eec\u8ba4\u4e3a\u5e94\u8be5\u8ba4\u4e3a\u4ec0\u4e48\u3002' },
        { id: 'speak', number: '03', label: 'Speak', description: '\u5b66\u751f\u5728\u4e0e\u5bfc\u5e08\u7684\u5b9e\u65f6\u82cf\u683c\u62c9\u5f0f\u5bf9\u8bdd\u4e2d\u8868\u8fbe\u81ea\u5df1\u7684\u601d\u8003\u3002\u53e3\u5934\u8868\u8fbe\u7684\u7cbe\u786e\u6027\u5148\u4e8e\u4e66\u9762\u7684\u7cbe\u786e\u6027\u3002' },
        { id: 'write', number: '04', label: 'Write', description: '\u5b66\u751f\u4ea7\u51fa\u4e66\u9762\u4f5c\u54c1\uff0c\u4f7f\u75286+1\u7279\u8d28\u6846\u67b6\u8fdb\u884c\u8bc4\u4f30\u3002\u5bfc\u5e08\u8bc4\u5206\u6bcf\u4e00\u7bc7\u4f5c\u54c1\u3002\u6210\u957f\u53ef\u89c1\u53ef\u91cf\u5316\u3002' },
      ],
    },
    confidence: {
      eyebrow:  '\u5982\u4f55\u8fd0\u4f5c',
      heading:  '\u6211\u4eec\u4e0d\u627f\u8bfa\u6d41\u5229\u5ea6\u3002\u6211\u4eec\u4ea4\u4ed8\u4e00\u4e2a\u5e74\u7ea7\u7684\u8bfb\u5199\u589e\u957f\u3002',
      body:     '\u516816\u5468\u5185\u3002\u4ee5Lexile\u6d4b\u91cf\u3002\u5199\u4f5c\u5f97\u5206\u53ef\u89c1\u3002\u6211\u4eec\u6240\u6709\u7684\u4e3b\u5f20\u90fd\u662f\u53ef\u4ee5\u7528\u6570\u5b57\u8bc1\u660e\u7684\u3002',
      pillars: [
        {
          id:        'assessment',
          eyebrow:   '\u5f00\u59cb\u4e4b\u524d',
          heading:   '\u6211\u4eec\u786e\u5207\u4e86\u89e3\u60a8\u7684\u5b69\u5b50\u76ee\u524d\u5728\u54ea\u91cc\u3002',
          body:      '\u4e0d\u662f\u5b66\u6821\u6210\u7ee9\u5355\u8bf4\u7684\u5728\u54ea\u91cc\u3002\u5728\u7b2c\u4e00\u8282\u8bfe\u4e4b\u524d\uff0c\u6bcf\u4f4d\u5b66\u751f\u90fd\u5c06\u63a5\u53d7Lexile\u9605\u8bfb\u8bc4\u4f30\u548c6+1\u7279\u8d28\u5199\u4f5c\u57fa\u51c6\u7ebf\u8bc4\u4f30\u3002\u6211\u4eec\u6839\u636e\u6570\u636e\u5236\u5b9a\u65b9\u6848\uff0c\u800c\u975e\u731c\u6d4b\u3002',
          linkHref:  '/program',
          linkLabel: '\u4e86\u89e3\u8bc4\u4f30\u5982\u4f55\u8fdb\u884c',
        },
        {
          id:        'loop',
          eyebrow:   '\u8bfe\u7a0b\u671f\u95f4',
          heading:   '\u6bcf\u8282\u8bfe\u5747\u8fdb\u884cThe Loop\u3002',
          body:      '\u9605\u8bfb\u3002\u601d\u8003\u3002\u8868\u8fbe\u3002\u5199\u4f5c\u3002\u5bfc\u5e08\u6bcf\u5468\u8ffd\u8e2a\u5b69\u5b50\u5728\u6bcf\u4e2a\u9636\u6bb5\u7684\u8fdb\u5c55\u3002\u6ca1\u6709\u731c\u6d4b\uff0c\u5168\u7a0b\u5f15\u5bfc\u3002The Hangar\u5728\u8bfe\u7a0b\u95f4\u9694\u63d0\u4f9b\u7ed3\u6784\u5316\u652f\u6301\u3002',
          linkHref:  '/the-hangar',
          linkLabel: '\u4e86\u89e3The Hangar',
        },
        {
          id:        'results',
          eyebrow:   '16\u5468\u540e',
          heading:   '\u6211\u4eec\u5c55\u793a\u6570\u5b57\u3002',
          body:      '\u6bcf\u4f4d\u5b66\u751f\u5c06\u63a5\u53d7\u7ed3\u8bfe Lexile\u8bc4\u4f30\u548c\u91cd\u65b0\u8bc4\u4f30\u76846+1\u7279\u8d28\u5199\u4f5c\u5f97\u5206\u3002\u6211\u4eec\u5c55\u793a\u524d\u540e\u6570\u636e\u5bf9\u6bd4\u3002\u7136\u540e\u7531\u60a8\u51b3\u5b9a\u4e0b\u4e00\u6b65\u3002',
          linkHref:  '/results',
          linkLabel: '\u67e5\u770b\u5b66\u751f\u6210\u679c',
        },
      ],
    },
    trust: {
      eyebrow:    '\u5b66\u751f\u6210\u679c',
      heading1:   '\u6570\u5b57\u5148\u8bf4\u8bdd\u3002',
      heading2:   '\u7136\u540e\u662f\u5bb6\u957f\u3002',
      viewAll:    '\u67e5\u770b\u5168\u90e8\u6210\u679c \u2192',
      weeksLabel: '\u5468',
      results: [
        { id: 'result-1', student: '\u5b66\u751fA', detail: '\u4e94\u5e74\u7ea7 \u00b7 \u6e29\u54e5\u534e',           start: 620, end: 820, weeks: 16, trait: '\u58f0\u97f3: 2 \u2192 4', quote: '\u5979\u5230\u4e86\u7b2c\u516b\u5468\u5f00\u59cb\u4e3b\u52a8\u4e3e\u624b\u53d1\u8a00\u3002\u5230\u7b2c\u5341\u4e8c\u5468\u65f6\uff0c\u5979\u5df2\u7ecf\u5f15\u9886\u8bfe\u5802\u8ba8\u8bba\u4e86\u3002',                   source: '\u5bb6\u957f\uff0c\u6e29\u54e5\u534e' },
        { id: 'result-2', student: '\u5b66\u751fB', detail: '\u516d\u5e74\u7ea7 \u00b7 \u4e07\u9526\u5e02',           start: 540, end: 720, weeks: 16, trait: '\u7ed3\u6784: 2 \u2192 5', quote: '\u5b69\u5b50\u7684\u8001\u5e08\u544a\u8bc9\u6211\u4eec\u4ed6\u7684\u5199\u4f5c\u53d1\u751f\u4e86\u8d28\u7684\u53d8\u5316\u30026+1\u8bc4\u5206\u8ba9\u6211\u4eec\u6e05\u6670\u5730\u770b\u5230\u5177\u4f53\u6539\u53d8\u4e86\u4ec0\u4e48\u3002', source: '\u5bb6\u957f\uff0c\u4e07\u9526\u5e02' },
        { id: 'result-3', student: '\u5b66\u751fC', detail: '\u4e03\u5e74\u7ea7 \u00b7 \u65e7\u91d1\u5c71\u6e7e\u533a', start: 710, end: 940, weeks: 16, trait: '\u60f3\u6cd5: 3 \u2192 5', quote: '\u5979\u4ece\u5bb3\u6015\u5199\u4f5c\u4efb\u52a1\uff0c\u5230\u63d0\u524d\u4ea4\u4f5c\u4e1a\u3002\u5bfc\u5e08\u786e\u5207\u5730\u77e5\u9053\u5979\u5361\u5728\u54ea\u91cc\u4e86\u3002',                 source: '\u5bb6\u957f\uff0c\u6e7e\u533a' },
      ],
    },
    closing: {
      eyebrow:  'Charter \u62a5\u540d',
      heading:  '\u8bca\u65ad\u548c\u8be2\u662f\u6211\u4eec\u786e\u5207\u4e86\u89e3\u60a8\u5b69\u5b50\u76ee\u524d\u5728\u54ea\u91cc\u7684\u8d77\u70b9\u3002',
      body:     '\u4e0d\u662f\u5b66\u6821\u8bf4\u7684\u5728\u54ea\u91cc\u3002\u6211\u4eec\u6d4b\u91cf\u5b69\u5b50\u7684Lexile\u6c34\u5e73\uff0c\u786e\u5b9a\u5177\u4f53\u7684\u5dee\u8ddd\uff0c\u5e76\u544a\u8bc9\u60a8\u5bf9\u4e8e\u50cf\u60a8\u5b69\u5b50\u8fd9\u6837\u7684\u5b66\u751f\uff0c\u6700\u521d16\u5468\u5177\u4f53\u662f\u4ec0\u4e48\u6837\u5b50\u7684\u3002',
      cta1:     '\u9884\u7ea6\u548c\u8be2',
      cta2:     '\u4e86\u89e3\u8bfe\u7a0b\u8be6\u60c5',
      tagline:  'Think Once. In Both Languages.',
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═══════════════════════════════════════════════════════════════
function Hero({ locale, c }) {
  return (
    <section
      className="section-light relative overflow-hidden"
      aria-labelledby="hero-heading"
      style={{
        minHeight:  'calc(100dvh - var(--nav-height))',
        display:    'flex',
        alignItems: 'center',
        paddingTop: 'var(--nav-height)', // push content below the fixed navbar
      }}
    >
      {/* Radial glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 70% 40%, rgba(183,181,254,0.22) 0%, transparent 65%)' }} />

      {/* Logo icon — oversized, bleeds off right edge, underlaps text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute select-none"
        style={{
          right:     '-12%',
          top:       '50%',
          transform: 'translateY(-50%)',
          width:     '80%',
          maxWidth:  '900px',
          minWidth:  '480px',
          opacity:   0.08,
        }}
      >
        <svg
          viewBox="0 0 600 338"
          xmlns="http://www.w3.org/2000/svg"
          fill="#b7b5fe"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <g transform="translate(0,338) scale(0.1,-0.1)" stroke="none">
            <path d="M3650 2626 c-413 -124 -743 -651 -744 -1186 0 -209 37 -313 169 -472 187 -227 711 -313 1054 -174 195 79 426 287 502 451 122 262 102 632 -47 903 -83 152 -247 339 -348 397 -169 98 -417 132 -586 81z m113 -393 c7 -237 14 -219 -93 -227 -41 -4 -99 -8 -127 -10 l-53 -5 0 160 0 159 43 31 c62 46 174 97 213 99 7 0 13 -67 17 -207z m320 155 c37 -17 72 -37 79 -45 9 -11 14 -261 5 -270 -9 -9 -190 -17 -192 -9 -2 6 -5 91 -8 189 l-4 178 26 -6 c14 -3 56 -20 94 -37z m357 -421 c60 -153 78 -325 50 -475 -20 -115 -18 -112 -109 -112 -99 0 -217 -22 -285 -53 -48 -22 -54 -23 -91 -9 -173 63 -480 -8 -701 -163 -80 -55 -75 -56 -114 6 -122 189 -103 463 54 814 l31 70 6 -77 c8 -91 32 -138 86 -163 54 -26 334 -16 443 15 45 13 127 25 204 30 277 19 356 58 356 181 l1 64 19 -23 c10 -12 33 -60 50 -105z m-120 -801 c0 -3 -33 -31 -72 -62 -213 -167 -457 -211 -755 -137 -35 8 -63 19 -63 23 0 12 147 86 218 109 134 45 243 44 351 -4 l60 -27 52 33 c74 47 209 89 209 65z" />
            <path d="M1705 2613 c-80 -6 -268 -35 -291 -44 -14 -5 -47 -30 -74 -55 l-50 -47 0 -793 0 -794 145 0 145 0 0 754 0 754 73 13 c347 61 623 -67 777 -362 68 -132 85 -209 85 -399 -1 -189 -12 -244 -76 -377 -120 -251 -314 -302 -639 -169 -24 10 -140 -161 -119 -175 67 -43 253 -90 385 -96 443 -22 722 270 741 777 24 662 -419 1070 -1102 1013z" />
          </g>
        </svg>
      </div>

      <div className="container-section relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="badge badge-lavender" aria-label="Program audience">{c.hero.eyebrow}</span>
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium" style={{ color: '#5856cc' }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F5C842' }} aria-hidden="true" />
              {c.hero.eyebrow2}
            </span>
          </div>

          <h1 id="hero-heading" className="mb-6" style={{ color: '#212830', fontWeight: 700 }}>
            {c.hero.h1[0]}<br />{c.hero.h1[1]}<br className="hidden sm:block" />
            <span style={{ color: '#5856cc' }}>{c.hero.h1Chinese}</span>
          </h1>

          <p className="mb-4 text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: '#3D4452' }}>
            {c.hero.differentiator}
          </p>
          <p className="mb-10 text-base md:text-lg leading-relaxed max-w-xl" style={{ color: '#7B8494' }}>
            {c.hero.consultHook}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/consult`} className="btn btn-charter text-base px-8 py-4 justify-center"
              aria-label="Book a diagnostic consultation">{c.hero.cta1}</Link>
            <Link href={`/${locale}/program`} className="btn btn-secondary text-base px-8 py-4 justify-center"
              aria-label="Learn about The 16-Week Program">{c.hero.cta2}</Link>
          </div>

          <p className="mt-8 text-xs" style={{ color: 'rgba(123,132,148,0.8)' }}>{c.hero.trustLine}</p>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 2 — PROOF STRIP
// ═══════════════════════════════════════════════════════════════
function ProofStrip({ c }) {
  return (
    <div className="proof-strip" aria-label="Program outcomes">
      <div className="container-section">
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {c.proof.map((stat) => (
            <div key={stat.id} className="flex flex-col items-start sm:items-center sm:text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="proof-stat-number" aria-hidden="true">{stat.number}</span>
                <span className="block text-sm font-semibold mt-1" style={{ color: '#b7b5fe' }} aria-hidden="true">{stat.unit}</span>
                <span className="proof-stat-label block mt-1">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3 — PHOTO INTRO
// ═══════════════════════════════════════════════════════════════
function PhotoIntro({ locale, c }) {
  return (
    <section className="section-white" aria-labelledby="photo-intro-heading">
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="eyebrow mb-4">{c.photoIntro.eyebrow}</p>
            <h2 id="photo-intro-heading">{c.photoIntro.heading}</h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed" style={{ color: '#3D4452' }}>{c.photoIntro.body1}</p>
            <p className="mt-4 text-base leading-relaxed" style={{ color: '#3D4452' }}>{c.photoIntro.body2}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/navigators`} className="btn btn-secondary text-sm px-6 py-3 justify-center">{c.photoIntro.cta1}</Link>
              <Link href={`/${locale}/results`} className="btn btn-outline text-sm px-6 py-3 justify-center">{c.photoIntro.cta2}</Link>
            </div>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }} aria-hidden="true">
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #EAEAF8 0%, #f0efff 50%, #e8e7ff 100%)' }}>
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#5856cc' }}>
                  {c.photoIntro.imgLabel}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#5856cc' }}>
                  <span>Read</span><span style={{ color: 'rgba(183,181,254,0.4)' }}>\u2192</span>
                  <span>Think</span><span style={{ color: 'rgba(183,181,254,0.4)' }}>\u2192</span>
                  <span>Speak</span><span style={{ color: 'rgba(183,181,254,0.4)' }}>\u2192</span>
                  <span>Write</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 4 — THE LOOP
// ═══════════════════════════════════════════════════════════════
function LoopSection({ locale, c }) {
  const steps = c.loop.steps
  return (
    <section className="section-dark" aria-labelledby="loop-heading">
      <div className="container-section">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className="eyebrow mb-4" style={{ color: 'rgba(183,181,254,0.6)' }}>{c.loop.eyebrow}</p>
          <h2 id="loop-heading">{c.loop.heading}</h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed" style={{ color: '#94A3B8' }}>{c.loop.body}</p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="The Loop — DODO Learning methodology">
          {steps.map((step, index) => (
            <li key={step.id} className="relative">
              {index < steps.length - 1 && (
                <div aria-hidden="true" className="hidden lg:block absolute top-6 left-[calc(100%+0.75rem)] right-[-0.75rem] h-px"
                  style={{ background: 'linear-gradient(90deg, rgba(183,181,254,0.3) 0%, rgba(183,181,254,0.1) 100%)', width: 'calc(100% - 3rem)', zIndex: 1 }} />
              )}
              <div className="card card-dark h-full p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="loop-step-number" aria-hidden="true" style={{ width: 40, height: 40, fontSize: '0.875rem' }}>{step.number}</span>
                  {index < steps.length - 1 && (
                    <span className="loop-arrow text-lg hidden sm:block lg:hidden" aria-hidden="true">\u2192</span>
                  )}
                </div>
                <h3 className="text-lg font-bold" style={{ color: '#b7b5fe', letterSpacing: '-0.01em' }}>{step.label}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: '#94A3B8' }}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-start">
          <Link href={`/${locale}/methodology`} className="btn btn-ghost text-sm px-6 py-3"
            aria-label="Read the full Loop methodology breakdown">{c.loop.cta}</Link>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 5 — CONFIDENCE SECTION
// ═══════════════════════════════════════════════════════════════
function ConfidenceSection({ locale, c }) {
  return (
    <section className="section-light" aria-labelledby="confidence-heading">
      <div className="container-section">
        <div className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">{c.confidence.eyebrow}</p>
          <h2 id="confidence-heading">{c.confidence.heading}</h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed" style={{ color: '#3D4452' }}>{c.confidence.body}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {c.confidence.pillars.map((pillar) => (
            <div key={pillar.id} className="card p-8 flex flex-col gap-4 accent-top">
              <p className="eyebrow">{pillar.eyebrow}</p>
              <h3 className="text-xl font-bold leading-snug" style={{ color: '#212830' }}>{pillar.heading}</h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: '#3D4452' }}>{pillar.body}</p>
              <Link
                href={`/${locale}${pillar.linkHref}`}
                className="text-sm font-semibold text-[#5856cc] hover:text-[#3d3baa] transition-colors duration-150 focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#b7b5fe]"
              >
                {pillar.linkLabel} \u2192
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 6 — PARENT TRUST SECTION
// ═══════════════════════════════════════════════════════════════
function ParentTrustSection({ locale, c }) {
  return (
    <section className="section-dark" aria-labelledby="results-heading">
      <div className="container-section">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="eyebrow mb-4" style={{ color: 'rgba(183,181,254,0.6)' }}>{c.trust.eyebrow}</p>
            <h2 id="results-heading">{c.trust.heading1}<br />{c.trust.heading2}</h2>
          </div>
          <Link href={`/${locale}/results`} className="btn btn-ghost text-sm px-6 py-3 shrink-0"
            aria-label="View all student results and Lexile data">{c.trust.viewAll}</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.trust.results.map((result) => (
            <article key={result.id} className="card card-dark p-6 flex flex-col gap-5"
              aria-label={`${result.student}, ${result.detail}`}>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#b7b5fe' }}>{result.student}</p>
                <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{result.detail} &nbsp;&middot;&nbsp; {result.weeks} {c.trust.weeksLabel}</p>
              </div>
              <LexileBar start={result.start} end={result.end} weeks={result.weeks} />
              <span className="badge badge-lavender-dark self-start">6+1 {result.trait}</span>
              <blockquote className="mt-auto">
                <p className="text-sm leading-relaxed italic" style={{ color: '#94A3B8' }}>&ldquo;{result.quote}&rdquo;</p>
                <footer className="mt-3 text-xs font-medium" style={{ color: 'rgba(183,181,254,0.5)' }}>&mdash; {result.source}</footer>
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 7 — CLOSING CTA
// ═══════════════════════════════════════════════════════════════
function ClosingCTA({ locale, c }) {
  return (
    <section className="section-darker relative overflow-hidden" aria-labelledby="closing-cta-heading"
      style={{ paddingTop: 'var(--section-lg)', paddingBottom: 'var(--section-lg)' }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(245,200,66,0.06) 0%, transparent 70%)' }} />

      <div className="container-section relative z-10 text-center max-w-3xl mx-auto">
        <p className="eyebrow mb-6" style={{ color: 'rgba(183,181,254,0.5)' }}>{c.closing.eyebrow}</p>
        <h2 id="closing-cta-heading" className="mb-6" style={{ color: '#b7b5fe' }}>{c.closing.heading}</h2>
        <p className="text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: '#94A3B8' }}>{c.closing.body}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}/consult`} className="btn btn-charter text-base px-10 py-4 justify-center"
            aria-label="Book your diagnostic consultation — Charter Enrollment">{c.closing.cta1}</Link>
          <Link href={`/${locale}/program`} className="btn btn-ghost text-base px-10 py-4 justify-center">{c.closing.cta2}</Link>
        </div>

        <p className="mt-8 text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>{c.closing.tagline}</p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// PAGE EXPORT
// ═══════════════════════════════════════════════════════════════
export function generateStaticParams() {
  return localeParams()
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const c = HOMEPAGE_COPY[locale] ?? HOMEPAGE_COPY.en
  return (
    <>
      <Hero locale={locale} c={c} />
      <ProofStrip c={c} />
      <PhotoIntro locale={locale} c={c} />
      <LoopSection locale={locale} c={c} />
      <ConfidenceSection locale={locale} c={c} />
      <ParentTrustSection locale={locale} c={c} />
      <ClosingCTA locale={locale} c={c} />
    </>
  )
}