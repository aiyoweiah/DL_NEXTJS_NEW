// app/[locale]/page.tsx
//
// Homepage. SEO priority: Highest.
// Bilingual: all copy switches via HOMEPAGE_COPY[locale].
// Copy: v2.1 compliant — English mastery primary · bilingualism as outcome
//       MCT + Harvard Project Zero credentialed · AI differentiation added
//
// Sections:
//   1.  Hero              — LIGHT  (#F5F5FF)
//   2.  ProofStrip        — DARK   (#212830)
//   3.  PhotoIntro        — WHITE  (#ffffff)
//   4.  LoopSection       — DARK   (#212830)
//   5.  ConfidenceSection — LIGHT  (#F5F5FF)
//   6.  ParentTrustSection— DARK   (#212830)
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
// BILINGUAL COPY — v2.1
// ─────────────────────────────────────────────────────────────
const HOMEPAGE_COPY: Record<string, any> = {

  // ═══════════════════════════════════════
  // ENGLISH
  // ═══════════════════════════════════════
  en: {
    meta: {
      title:
        'DODO Learning \u2014 English Literacy at the Cognitive Level | Think Once. In Both Languages.',
      description:
        'Navigator-led English literacy program training the full Read\u2192Think\u2192Speak\u2192Write loop. One grade level of Lexile growth in 16 weeks. Built on the MCT Language Arts framework. Bilingual depth emerges from cognitive rigor.',
    },

    hero: {
      eyebrow:        'For children who will think and lead in English at the highest levels',
      eyebrow2:       '',
      h1:             ['English mastery at the cognitive level.', 'Bilingual depth as the natural outcome.'],
      h1Chinese:      '',
      differentiator: '',
      consultHook:
        'DODO Learning trains the complete\u00a0Read\u00a0\u2192\u00a0Think\u00a0\u2192\u00a0Speak\u00a0\u2192\u00a0Write loop, grounded in the MCT Language Arts framework and Harvard Project Zero\u2019s thinking science. When a child learns to read complex text, argue with evidence, and write with intention in English, that cognitive discipline transfers to every language they use \u2014 including Mandarin. The result? A child who thinks precisely in both.',
      cta1:      'Book Your Consultation',
      cta2:      'Explore The 16-Week Program',
      trustLine:
        'Lexile-measured progress\u00a0\u00b7\u00a06+1 Trait writing framework\u00a0\u00b7\u00a0Live Navigator-led sessions\u00a0\u00b7\u00a0Think Once. In Both Languages.',
    },

    proof: [
      { id: 'families', number: '300+', unit: 'children & families', label: 'served since launch \u2014 real Lexile growth, verified results' },
      { id: 'lexile',   number: '1',    unit: 'grade level',          label: 'average reading growth in 16 weeks, measured by Lexile' },
      { id: 'writing',  number: '2\u00d7', unit: 'writing score gain', label: 'average 6+1 Trait score gain from entry to exit assessment' },
      { id: 'repeat',   number: '8/10', unit: 'continue after first 16 weeks', label: 'families see the growth and choose to continue' },
    ],

    photoIntro: {
      eyebrow: 'Who We Are',
      heading: 'The difference between a teacher and a Navigator is a map.',
      body0:
        'Your child\u2019s school knows what grade they\u2019re in. That\u2019s not the same as knowing where they are. Most children in immigrant families carry a reading gap their report card never shows \u2014 the distance between what they can decode and what they can actually think through.',
      body1:
        'Navigators are not tutors. They are specialists in composition, literature, and academic writing \u2014 trained in the MCT Language Arts tradition and in the structured thinking protocols of Harvard Project Zero. They close the gap between where your child reads now and where their academic life demands.',
      body2:
        'Every Navigator tracks one thing per student: the distance between their current Lexile level and their goal \u2014 and closes it, week by week, through The Loop. Bilingual depth emerges from this rigor. It is not taught separately.',
      cta1:   'Meet the Navigators',
      cta2:   'See Student Results',
      imgAlt: 'A mother watches her child pause mid-thought after finishing a reading passage at home',
    },

    loop: {
      eyebrow: 'The Methodology',
      heading: 'The Loop',
      body:
        'Every session. Every week. In this order, without exception. Read\u00a0\u2192\u00a0Think\u00a0\u2192\u00a0Speak\u00a0\u2192\u00a0Write is not a framework we teach about \u2014 it is what we do.',
      cta: 'Read the full methodology \u2192',
      steps: [
        {
          id:          'read',
          number:      '01',
          label:       'Read',
          description:
            'Students read classical and analytical texts chosen at or just above their current Lexile level \u2014 from Alice in Wonderland and Treasure Island to Poe and analytical non-fiction at progressively greater complexity. No simplified versions. The text is the raw material.',
        },
        {
          id:          'think',
          number:      '02',
          label:       'Think',
          description:
            'Before speaking, students use structured thinking protocols developed at the Harvard Graduate School of Education to form a precise position \u2014 supported by specific textual evidence, not general impression.',
        },
        {
          id:          'speak',
          number:      '03',
          label:       'Speak',
          description:
            'Students defend their thinking in a live Socratic session with their Navigator. The Navigator\u2019s first move after any answer is always a better question \u2014 never an evaluation. Precision in speech precedes precision in writing.',
        },
        {
          id:          'write',
          number:      '04',
          label:       'Write',
          description:
            'Students produce written work assessed through the 6+1 Trait framework: Ideas, Organization, Voice, Word Choice, Sentence Fluency, Conventions, and Presentation. Their Navigator scores each piece. Progress is concrete and visible.',
        },
      ],
    },

    confidence: {
      eyebrow: 'How It Works',
      heading: 'One grade level of English reading growth. Sixteen weeks. Every claim is a number we can prove.',
      body:
        'Measured by Lexile. Shown in writing scores. When a child learns to think precisely in English, that discipline transfers \u2014 to every subject, every exam, every language they use.',
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
          heading:   'Every session runs The Loop.',
          body:
            'Read. Think. Speak. Write. Your child\u2019s Navigator tracks their movement through each phase every week. The Loop is grounded in the MCT Language Arts framework and Harvard Project Zero\u2019s thinking routines. Nothing is guessed. Everything is guided and measured.',
          linkHref:  '/methodology',
          linkLabel: 'Understand The Loop',
        },
        {
          id:        'results',
          eyebrow:   'After 16 Weeks',
          heading:   'We show you the numbers.',
          body:
            'Every student receives an exit Lexile assessment and a re-evaluated 6+1 Trait writing score. A child who can read complex text, argue a position, and write with intention in English \u2014 and who also thinks in Chinese \u2014 has a mind built for what comes next. That is the competitive advantage AI cannot replace.',
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
        {
          id:      'result-1',
          student: 'Student A',
          detail:  'Grade 5 \u00b7 Vancouver',
          start:   620,
          end:     820,
          weeks:   16,
          trait:   'Voice: 2 \u2192 4',
          quote:
            'She started raising her hand in class by week eight. By week twelve she was leading the discussion.',
          source: 'Parent, Vancouver',
        },
        {
          id:      'result-2',
          student: 'Student B',
          detail:  'Grade 6 \u00b7 Markham',
          start:   540,
          end:     720,
          weeks:   16,
          trait:   'Organization: 2 \u2192 5',
          quote:
            'His teacher told us his writing had transformed. The 6+1 scores made it easy to see exactly what changed.',
          source: 'Parent, Markham',
        },
        {
          id:      'result-3',
          student: 'Student C',
          detail:  'Grade 7 \u00b7 San Francisco Bay Area',
          start:   710,
          end:     940,
          weeks:   16,
          trait:   'Ideas: 3 \u2192 5',
          quote:
            'She went from dreading writing assignments to submitting them early. The Navigator knew exactly where she was stuck.',
          source: 'Parent, Bay Area',
        },
      ],
    },

    // closing section removed — no component renders it. Future build item.
  },

  // ═══════════════════════════════════════
  // 中文
  // ═══════════════════════════════════════
  zh: {
    meta: {
      title:
        'DODO\u90fd\u5b66\u8bed\u8a00 \u2014 \u82f1\u6587\u8ba4\u77e5\u6df1\u5ea6\uff0c\u4fdd\u62a4\u4e24\u79cd\u8bed\u8a00',
      description:
        '\u5bfc\u5e08\u4e3b\u5bfc\u7684\u82f1\u8bed\u6df1\u5ea6\u5b66\u4e60\u8bfe\u7a0b\uff0c\u8bad\u7ec3\u5b8c\u6574\u7684\u9605\u8bfb\u2192\u601d\u8003\u2192\u8868\u8fbe\u2192\u5199\u4f5c\u95ed\u73af\u300216\u5468\u5185Lexile\u9605\u8bfb\u6c34\u5e73\u5e73\u5747\u63d0\u5347\u4e00\u4e2a\u5e74\u7ea7\u3002\u53cc\u8bed\u80fd\u529b\u662f\u8ba4\u77e5\u6df1\u5ea6\u7684\u81ea\u7136\u7ed3\u679c\u3002',
    },

    hero: {
      eyebrow:        '\u4e3a\u4e94\u5e74\u540e\u80fd\u5728\u5168\u82f1\u6587\u8bfe\u5802\u4f83\u4f83\u800c\u8c08\u7684\u5b69\u5b50',
      eyebrow2:       '',
      h1:             ['\u5b69\u5b50\u7684\u82f1\u6587\u6839\u57fa\uff0c\u5728\u9605\u8bfb\u4e2d\u624e\u4e0b\u3002', '\u53cc\u8bed\u6df1\u5ea6\uff0c\u662f\u8fd9\u4efd\u4e25\u8c28\u81ea\u7136\u7ed3\u51fa\u7684\u679c\u3002'],
      h1Chinese:      '',
      differentiator: '',
      consultHook:
        'DODO\u90fd\u5b66\u8bed\u8a00\u8bad\u7ec3\u5b8c\u6574\u7684\u9605\u8bfb\u2192\u601d\u8003\u2192\u8868\u8fbe\u2192\u5199\u4f5c\u95ed\u73af\uff0c\u4ee5MCT\u8bed\u8a00\u827a\u672f\u6846\u67b6\u548c\u54c8\u4f5bProject Zero\u601d\u7ef4\u8bad\u7ec3\u4f53\u7cfb\u4e3a\u57fa\u7840\u3002\u5f53\u5b69\u5b50\u5b66\u4f1a\u7528\u82f1\u6587\u9605\u8bfb\u590d\u6742\u6587\u672c\u3001\u4ee5\u8bc1\u636e\u652f\u6491\u7acb\u573a\u3001\u6709\u610f\u8bc6\u5730\u5199\u4f5c\u2014\u2014\u4f60\u4f1a\u5728\u67d0\u5929\u665a\u996d\u65f6\u7a81\u7136\u53d1\u73b0\uff0c\u4ed6\u7528\u4e2d\u6587\u6761\u7406\u6e05\u6670\u5730\u8bb2\u51fa\u4e86\u81ea\u5df1\u8bfb\u5b8c\u4e00\u672c\u82f1\u6587\u4e66\u540e\u7684\u60f3\u6cd5\u3002\u8fd9\u79cd\u8ba4\u77e5\u80fd\u529b\uff0c\u4f1a\u81ea\u52a8\u8fc1\u79fb\u5230\u6bcf\u4e00\u79cd\u8bed\u8a00\u3002',
      cta1:      '\u9884\u7ea6\u80fd\u529b\u8bc4\u4f30',
      cta2:      '\u63a2\u7d0216\u5468\u8bfe\u7a0b',
      trustLine:
        'Lexile\u6d4b\u91cf\u8fdb\u5ea6\u00a0\u00b7\u00a06+1 Trait\u5199\u4f5c\u8bc4\u4f30\u4f53\u7cfb\u00a0\u00b7\u00a0\u5bfc\u5e08\u5b9e\u65f6\u4e3b\u5bfc\u00a0\u00b7\u00a0Think Once. In Both Languages.',
    },

    proof: [
      { id: 'families', number: '300+', unit: '\u4e2a\u5b69\u5b50\u548c\u5bb6\u5ead', label: '\u81ea\u6210\u7acb\u4ee5\u6765\u771f\u5b9e\u966a\u8dd1\u2014\u2014Lexile\u771f\u5b9e\u589e\u957f\uff0c\u5df2\u9a8c\u8bc1\u7684\u6210\u679c' },
      { id: 'lexile',   number: '1',    unit: '\u4e2a\u5e74\u7ea7',       label: '16\u5468\u5185Lexile\u6d4b\u91cf\u7684\u5e73\u5747\u9605\u8bfb\u589e\u957f' },
      { id: 'writing',  number: '2\u00d7', unit: '\u5199\u4f5c\u8bc4\u5206\u589e\u957f', label: '\u5165\u5b66\u81f3\u7ed3\u8bfe6+1 Trait\u5e73\u5747\u5f97\u5206\u589e\u957f' },
      { id: 'repeat',   number: '8/10', unit: '16\u5468\u540e\u7ee7\u7eed',   label: '\u5bb6\u5ead\u770b\u5230\u6210\u679c\uff0c\u4e3b\u52a8\u9009\u62e9\u7ee7\u7eed' },
    ],

    photoIntro: {
      eyebrow: '\u8ba4\u8bc6\u5bfc\u5e08\u56e2\u961f',
      heading: '\u8001\u5e08\u4e0e\u5bfc\u5e08\u7684\u533a\u522b\uff0c\u5728\u4e8e\u90a3\u5f20\u5730\u56fe\u3002',
      body0:
        '\u5b66\u6821\u77e5\u9053\u5b69\u5b50\u5728\u51e0\u5e74\u7ea7\u3002\u90a3\u4e0d\u7b49\u4e8e\u77e5\u9053\u5b69\u5b50\u771f\u6b63\u7ad9\u5728\u54ea\u91cc\u3002\u5f88\u591a\u534e\u4eba\u5bb6\u5ead\u7684\u5b69\u5b50\uff0c\u90fd\u6709\u4e00\u4e2a\u6210\u7ee9\u5355\u4e0a\u770b\u4e0d\u89c1\u7684\u9605\u8bfb\u5dee\u8ddd\u2014\u2014\u80fd\u8ba4\u51fa\u7684\u8bcd\uff0c\u548c\u80fd\u771f\u6b63\u601d\u8003\u7684\u5185\u5bb9\uff0c\u4e2d\u95f4\u9694\u7740\u4e00\u6bb5\u8ddd\u79bb\u3002\u8fd9\u6bb5\u8ddd\u79bb\uff0c\u5927\u591a\u6570\u8bfe\u7a0b\u6d4b\u4e0d\u51fa\u6765\u3002',
      body1:
        '\u5bfc\u5e08\u4e0d\u662f\u4e00\u5bf9\u4e00\u8f85\u5bfc\u8001\u5e08\u3002\u7b2c\u4e00\u8282\u8bfe\uff0c\u5bfc\u5e08\u4e0d\u4f1a\u95ee\u201c\u4f60\u8bfb\u61c2\u4e86\u4ec0\u4e48\u201d\uff0c\u800c\u662f\u95ee\u201c\u4f60\u89c9\u5f97\u8fd9\u4e2a\u4eba\u7269\u4e3a\u4ec0\u4e48\u505a\u51fa\u8fd9\u4e2a\u9009\u62e9\uff1f\u201d\u2014\u2014\u8fd9\u5c31\u662f\u533a\u522b\u3002\u4ed6\u4eec\u662f\u5199\u4f5c\u3001\u6587\u5b66\u548c\u5b66\u672f\u5199\u4f5c\u9886\u57df\u7684\u4e13\u5bb6\u2014\u2014\u4ee5MCT\u8bed\u8a00\u827a\u672f\u4f20\u7edf\u4e3a\u57fa\u7840\uff0c\u8fd0\u7528\u54c8\u4f5bProject Zero\u601d\u7ef4\u8bad\u7ec3\u4f53\u7cfb\uff0c\u4e13\u95e8\u8d1f\u8d23\u7f29\u77ed\u5b66\u751f\u5f53\u524dLexile\u9605\u8bfb\u6c34\u5e73\u4e0e\u5b66\u4e1a\u771f\u6b63\u9700\u6c42\u4e4b\u95f4\u7684\u5dee\u8ddd\u3002',
      body2:
        '\u6bcf\u4f4d\u5bfc\u5e08\u53ea\u8ffd\u8e2a\u6bcf\u4e2a\u5b69\u5b50\u4e00\u4ef6\u4e8b\uff1a\u5f53\u524dLexile\u6c34\u5e73\u4e0e\u76ee\u6807\u4e4b\u95f4\u7684\u8ddd\u79bb\u2014\u2014\u5e76\u901a\u8fc7The Loop\u9010\u5468\u7f29\u5c0f\u8fd9\u4e2a\u8ddd\u79bb\u3002\u53cc\u8bed\u6df1\u5ea6\u4ece\u8fd9\u79cd\u4e25\u8c28\u4e2d\u81ea\u7136\u751f\u957f\uff0c\u4e0d\u662f\u53e6\u5916\u6559\u7684\u4e00\u95e8\u8bfe\u3002',
      cta1:   '\u8ba4\u8bc6\u5bfc\u5e08\u56e2\u961f',
      cta2:   '\u67e5\u770b\u5b66\u751f\u6210\u679c',
      imgAlt: '\u4e00\u4f4d\u6bcd\u4eb2\u6ce8\u89c6\u5b69\u5b50\u5728\u5bb6\u4e2d\u8bfb\u5b8c\u4e00\u6bb5\u8bfe\u6587\u540e\u505c\u4e0b\u6765\u601d\u8003\u7684\u77ac\u95f4',
    },

    loop: {
      eyebrow: '\u6559\u5b66\u65b9\u6cd5',
      heading: 'The Loop',
      body:
        '\u6bcf\u4e00\u8282\u8bfe\u3002\u6bcf\u4e00\u5468\u3002\u59cb\u7ec8\u6309\u8fd9\u4e2a\u987a\u5e8f\uff0c\u6ca1\u6709\u4f8b\u5916\u3002\u9605\u8bfb\u00a0\u2192\u00a0\u601d\u8003\u00a0\u2192\u00a0\u8868\u8fbe\u00a0\u2192\u00a0\u5199\u4f5c\u4e0d\u662f\u6211\u4eec\u6559\u6388\u7684\u6846\u67b6\u2014\u2014\u800c\u662f\u6211\u4eec\u5b9e\u9645\u7684\u505a\u6cd5\u3002',
      cta: '\u9605\u8bfb\u5b8c\u6574\u6559\u5b66\u65b9\u6cd5 \u2192',
      steps: [
        {
          id:          'read',
          number:      '01',
          label:       'Read \u9605\u8bfb',
          description:
            '\u5b66\u751f\u9605\u8bfb\u7cbe\u5fc3\u9009\u5b9a\u7684\u7ecf\u5178\u4e0e\u5206\u6790\u6027\u6587\u672c\u2014\u2014\u4ece\u7231\u4e3d\u4e1d\u68a6\u6e38\u4ed9\u5883\u3001\u91d1\u94f6\u5c9b\u5230\u7231\u4f26\u00b7\u5761\uff0c\u4ee5\u53ca\u9012\u8fdb\u96be\u5ea6\u7684\u8bf4\u660e\u6027\u975e\u865a\u6784\u6587\u672c\uff0c\u9009\u6750\u5728\u5f53\u524dLexile\u6c34\u5e73\u6216\u7565\u9ad8\u4e00\u7b51\u3002\u539f\u6587\uff0c\u6ca1\u6709\u7b80\u5316\u7248\u3002\u6587\u672c\u662f\u539f\u6750\u6599\u3002',
        },
        {
          id:          'think',
          number:      '02',
          label:       'Think \u601d\u8003',
          description:
            '\u5f00\u53e3\u4e4b\u524d\uff0c\u5b66\u751f\u9996\u5148\u8fd0\u7528\u54c8\u4f5b\u6559\u80b2\u5b66\u9662\u7814\u53d1\u7684Project Zero\u601d\u7ef4\u8bad\u7ec3\u5de5\u5177\uff0c\u5f62\u6210\u6709\u5177\u4f53\u6587\u672c\u4f9d\u636e\u652f\u6491\u7684\u660e\u786e\u7acb\u573a\u3002\u4ed6\u4eec\u771f\u6b63\u8ba4\u4e3a\u4ec0\u4e48\uff1f\u800c\u4e0d\u662f\u4ed6\u4eec\u89c9\u5f97\u5e94\u8be5\u8ba4\u4e3a\u4ec0\u4e48\u3002',
        },
        {
          id:          'speak',
          number:      '03',
          label:       'Speak \u8868\u8fbe',
          description:
            '\u5b66\u751f\u5728\u4e0e\u5bfc\u5e08\u7684\u5b9e\u65f6\u82cf\u683c\u62c9\u5f0f\u5bf9\u8bdd\u4e2d\u634d\u536b\u81ea\u5df1\u7684\u7acb\u573a\u3002\u5bfc\u5e08\u5728\u5b66\u751f\u56de\u7b54\u540e\u7684\u7b2c\u4e00\u4e2a\u52a8\u4f5c\uff0c\u6c38\u8fdc\u662f\u4e00\u4e2a\u66f4\u597d\u7684\u95ee\u9898\u2014\u2014\u800c\u4e0d\u662f\u8bc4\u4ef7\u3002\u53e3\u5934\u8868\u8fbe\u7684\u7cbe\u786e\u6027\u5148\u4e8e\u4e66\u9762\u5199\u4f5c\u7684\u7cbe\u786e\u6027\u3002',
        },
        {
          id:          'write',
          number:      '04',
          label:       'Write \u5199\u4f5c',
          description:
            '\u5b66\u751f\u4ea7\u51fa\u4e66\u9762\u4f5c\u54c1\uff0c\u4ee56+1 Trait\u6846\u67b6\u8bc4\u4f30\uff1a\u60f3\u6cd5\u3001\u7ed3\u6784\u3001\u58f0\u97f3\u3001\u7528\u8bcd\u3001\u53e5\u5b50\u6d41\u7545\u5ea6\u3001\u89c4\u8303\u3001\u547c\u5e94\u3002\u5bfc\u5e08\u4e3a\u6bcf\u7bc7\u4f5c\u54c1\u9010\u9879\u8bc4\u5206\u3002\u8fdb\u6b65\u53ef\u89c1\uff0c\u53ef\u91cf\u5316\u3002',
        },
      ],
    },

    confidence: {
      eyebrow: '\u5982\u4f55\u8fd0\u4f5c',
      heading:
        '16\u5468\u5185\uff0c\u82f1\u8bed\u9605\u8bfb\u63d0\u5347\u4e00\u4e2a\u5e74\u7ea7\u3002\u6211\u4eec\u8bf4\u7684\u6bcf\u4e00\u4e2a\u4e3b\u5f20\uff0c\u90fd\u6709\u6570\u636e\u652f\u6491\u3002',
      body:
        '\u4ee5Lexile\u6d4b\u91cf\u3002\u5199\u4f5c\u8bc4\u5206\u53ef\u89c1\u3002\u5f53\u5b69\u5b50\u5b66\u4f1a\u7528\u82f1\u6587\u7cbe\u786e\u601d\u8003\uff0c\u8fd9\u79cd\u8ba4\u77e5\u8bad\u7ec3\u8fc1\u79fb\u5230\u6bcf\u4e00\u95e8\u5b66\u79d1\u3001\u6bcf\u4e00\u6b21\u8003\u8bd5\u3001\u4ed6\u4eec\u4f7f\u7528\u7684\u6bcf\u4e00\u79cd\u8bed\u8a00\u3002',
      pillars: [
        {
          id:        'assessment',
          eyebrow:   '\u5f00\u59cb\u4e4b\u524d',
          heading:   '\u6211\u4eec\u786e\u5207\u4e86\u89e3\u60a8\u7684\u5b69\u5b50\u76ee\u524d\u5728\u54ea\u91cc\u3002',
          body:
            '\u4e0d\u662f\u5b66\u6821\u6210\u7ee9\u5355\u8bf4\u7684\u5728\u54ea\u91cc\u3002\u5728\u7b2c\u4e00\u8282\u8bfe\u4e4b\u524d\uff0c\u6bcf\u4f4d\u5b66\u751f\u90fd\u4f1a\u63a5\u53d7Lexile\u9605\u8bfb\u8bc4\u4f30\u548c6+1 Trait\u5199\u4f5c\u57fa\u51c6\u7ebf\u8bc4\u4f30\u3002\u6211\u4eec\u6839\u636e\u6570\u636e\u5236\u5b9a\u65b9\u6848\uff0c\u800c\u4e0d\u662f\u731c\u6d4b\u3002',
          linkHref:  '/program',
          linkLabel: '\u4e86\u89e3\u8bc4\u4f30\u5982\u4f55\u8fdb\u884c',
        },
        {
          id:        'loop',
          eyebrow:   '\u8bfe\u7a0b\u671f\u95f4',
          heading:   '\u6bcf\u8282\u8bfe\u5747\u8fd0\u884cThe Loop\u3002',
          body:
            '\u9605\u8bfb\u3002\u601d\u8003\u3002\u8868\u8fbe\u3002\u5199\u4f5c\u3002\u5bfc\u5e08\u6bcf\u5468\u8ffd\u8e2a\u5b69\u5b50\u5728\u6bcf\u4e2a\u9636\u6bb5\u7684\u8fdb\u5c55\u3002The Loop\u4ee5MCT\u8bed\u8a00\u827a\u672f\u6846\u67b6\u548c\u54c8\u4f5bProject Zero\u601d\u7ef4\u8bad\u7ec3\u4f53\u7cfb\u4e3a\u57fa\u7840\u3002\u6ca1\u6709\u731c\u6d4b\uff0c\u5168\u7a0b\u6709\u91cf\u6709\u636e\u3002',
          linkHref:  '/methodology',
          linkLabel: '\u7406\u89e3The Loop',
        },
        {
          id:        'results',
          eyebrow:   '16\u5468\u540e',
          heading:   '\u6211\u4eec\u5c55\u793a\u6570\u5b57\u3002',
          body:
            '\u6bcf\u4f4d\u5b66\u751f\u5c06\u63a5\u53d7\u7ed3\u8bfeLexile\u8bc4\u4f30\u548c\u91cd\u65b0\u8bc4\u4f30\u76846+1 Trait\u5199\u4f5c\u5f97\u5206\u3002\u80fd\u7528\u82f1\u6587\u9605\u8bfb\u590d\u6742\u6587\u672c\u3001\u4ee5\u8bba\u636e\u652f\u6491\u7acb\u573a\u3001\u6709\u610f\u8bc6\u5730\u5199\u4f5c\u2014\u2014\u540c\u65f6\u4e5f\u5728\u4e2d\u6587\u91cc\u601d\u8003\u2014\u2014\u8fd9\u4e2a\u5b69\u5b50\u62e5\u6709\u7684\uff0c\u662fAI\u66ff\u4ee3\u4e0d\u4e86\u7684\u3002\u8fd9\u624d\u662f\u771f\u6b63\u7684\u7ade\u4e89\u4f18\u52bf\u3002',
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
        {
          id:      'result-1',
          student: '\u5b66\u751fA',
          detail:  '\u4e94\u5e74\u7ea7 \u00b7 \u6e29\u54e5\u534e',
          start:   620,
          end:     820,
          weeks:   16,
          trait:   'Voice \u58f0\u97f3: 2 \u2192 4',
          quote:
            '\u5979\u5230\u4e86\u7b2c\u516b\u5468\u5f00\u59cb\u4e3b\u52a8\u4e3e\u624b\u53d1\u8a00\u3002\u5230\u7b2c\u5341\u4e8c\u5468\u65f6\uff0c\u5979\u5df2\u7ecf\u5728\u5f15\u9886\u8bfe\u5802\u8ba8\u8bba\u4e86\u3002',
          source: '\u5bb6\u957f\uff0c\u6e29\u54e5\u534e',
        },
        {
          id:      'result-2',
          student: '\u5b66\u751fB',
          detail:  '\u516d\u5e74\u7ea7 \u00b7 \u4e07\u9526\u5e02',
          start:   540,
          end:     720,
          weeks:   16,
          trait:   'Organization \u7ed3\u6784: 2 \u2192 5',
          quote:
            '\u5b69\u5b50\u7684\u8001\u5e08\u544a\u8bc9\u6211\u4eec\uff0c\u4ed6\u7684\u4f5c\u6587\u4ece\u4ee5\u524d\u7684\u4e24\u4e09\u884c\u53d8\u6210\u4e86\u6ee1\u6ee1\u4e00\u9875\uff0c\u7ed3\u6784\u4e5f\u6e05\u695a\u4e86\u3002',
          source: '\u5bb6\u957f\uff0c\u4e07\u9526\u5e02',
        },
        {
          id:      'result-3',
          student: '\u5b66\u751fC',
          detail:  '\u4e03\u5e74\u7ea7 \u00b7 \u65e7\u91d1\u5c71\u6e7e\u533a',
          start:   710,
          end:     940,
          weeks:   16,
          trait:   'Ideas \u60f3\u6cd5: 3 \u2192 5',
          quote:
            '\u5979\u4ece\u5bb3\u6015\u5199\u4f5c\u4efb\u52a1\uff0c\u5230\u63d0\u524d\u4ea4\u4f5c\u4e1a\u3002\u5bfc\u5e08\u786e\u5207\u5730\u77e5\u9053\u5979\u5361\u5728\u54ea\u91cc\u4e86\u3002',
          source: '\u5bb6\u957f\uff0c\u6e7e\u533a',
        },
      ],
    },

    // closing section removed — no component renders it. Future build item.
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
        paddingTop: 'var(--nav-height)',
      }}
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 70% 40%, rgba(183,181,254,0.22) 0%, transparent 65%)' }}
      />

      {/* O glyph watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute select-none"
        style={{ top: '0', right: '0', zIndex: 1 }}
      >
        <svg
          viewBox="280 55 200 195"
          xmlns="http://www.w3.org/2000/svg"
          fill="#b7b5fe"
          opacity="0.12"
          style={{ display: 'block', height: '100dvh', width: 'auto' }}
        >
          <g transform="translate(0,338) scale(0.1,-0.1)" stroke="none">
            <path d="M3650 2626 c-413 -124 -743 -651 -744 -1186 0 -209 37 -313 169 -472 187 -227 711 -313 1054 -174 195 79 426 287 502 451 122 262 102 632 -47 903 -83 152 -247 339 -348 397 -169 98 -417 132 -586 81z m113 -393 c7 -237 14 -219 -93 -227 -41 -4 -99 -8 -127 -10 l-53 -5 0 160 0 159 43 31 c62 46 174 97 213 99 7 0 13 -67 17 -207z m320 155 c37 -17 72 -37 79 -45 9 -11 14 -261 5 -270 -9 -9 -190 -17 -192 -9 -2 6 -5 91 -8 189 l-4 178 26 -6 c14 -3 56 -20 94 -37z m357 -421 c60 -153 78 -325 50 -475 -20 -115 -18 -112 -109 -112 -99 0 -217 -22 -285 -53 -48 -22 -54 -23 -91 -9 -173 63 -480 -8 -701 -163 -80 -55 -75 -56 -114 6 -122 189 -103 463 54 814 l31 70 6 -77 c8 -91 32 -138 86 -163 54 -26 334 -16 443 15 45 13 127 25 204 30 277 19 356 58 356 181 l1 64 19 -23 c10 -12 33 -60 50 -105z m-120 -801 c0 -3 -33 -31 -72 -62 -213 -167 -457 -211 -755 -137 -35 8 -63 19 -63 23 0 12 147 86 218 109 134 45 243 44 351 -4 l60 -27 52 33 c74 47 209 89 209 65z" />
          </g>
        </svg>
      </div>

      <div
        className="container-section relative z-10"
        style={{ paddingTop: 'clamp(3rem, 6vh, 5rem)', paddingBottom: 'clamp(2rem, 4vh, 4rem)' }}
      >
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="badge badge-lavender" aria-label="Program audience">{c.hero.eyebrow}</span>
            {c.hero.eyebrow2 && (
              <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium" style={{ color: '#5856cc' }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F5C842' }} aria-hidden="true" />
                {c.hero.eyebrow2}
              </span>
            )}
          </div>

          <h1 id="hero-heading" className="mb-6" style={{ color: '#212830', fontWeight: 700 }}>
            {c.hero.h1[0]}<br />{c.hero.h1[1]}
            {c.hero.h1Chinese && (
              <><br className="hidden sm:block" /><span style={{ color: '#5856cc' }}>{c.hero.h1Chinese}</span></>
            )}
          </h1>

          <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: '#5856cc', maxWidth: '42rem' }}>{c.hero.consultHook}</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href={`/${locale}/consult`} className="btn btn-gilt">
              {c.hero.cta1}
            </Link>
            <Link href={`/${locale}/program`} className="btn btn-ghost">
              {c.hero.cta2}
            </Link>
          </div>

          <p className="text-xs md:text-sm leading-relaxed" style={{ color: '#3D4452', maxWidth: '42rem' }}>{c.hero.trustLine}</p>
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
    <section className="section-dark" aria-labelledby="proof-heading">
      <div className="container-section">
        <h2 id="proof-heading" className="sr-only">Student Progress Proof</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {c.proof.map((item) => (
            <article key={item.id} className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#b7b5fe' }}>
                {item.number}
              </p>
              <p className="text-xs md:text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: '#94A3B8' }}>
                {item.unit}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3 — PHOTO INTRO
// ═══════════════════════════════════════════════════════════════
function PhotoIntro({ locale, c }) {
  return (
    <section className="section-light" aria-labelledby="photo-intro-heading">
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <article className="max-w-xl">
            <p className="eyebrow mb-4" style={{ color: '#5856cc' }}>{c.photoIntro.eyebrow}</p>
            <h2 id="photo-intro-heading" className="mb-6" style={{ color: '#212830' }}>{c.photoIntro.heading}</h2>

            <p className="text-base md:text-lg leading-relaxed mb-5" style={{ color: '#3D4452' }}>{c.photoIntro.body0}</p>
            <p className="text-base md:text-lg leading-relaxed mb-5" style={{ color: '#3D4452' }}>{c.photoIntro.body1}</p>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: '#3D4452' }}>{c.photoIntro.body2}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/navigators`} className="btn btn-ghost">
                {c.photoIntro.cta1}
              </Link>
              <Link href={`/${locale}/results`} className="btn btn-ghost">
                {c.photoIntro.cta2}
              </Link>
            </div>
          </article>

          {/* Image column */}
          <div className="relative" style={{ aspectRatio: '4/3' }}>
            <img
              src="/homepage-mom-daughter-thinking.jpeg"
              alt={c.photoIntro.imgAlt}
              className="w-full h-full object-cover rounded-lg"
            />
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
              <div className="card card-dark h-full p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="loop-step-number" aria-hidden="true" style={{ width: 40, height: 40, fontSize: '0.875rem' }}>{step.number}</span>
                  {index < steps.length - 1 && (
                    <span className="loop-arrow text-lg hidden sm:block lg:hidden" aria-hidden="true">&rarr;</span>
                  )}
                </div>
                <h3 className="text-lg font-bold" style={{ color: '#b7b5fe', letterSpacing: '-0.01em' }}>{step.label}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: '#94A3B8' }}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-start">
          <Link
            href={`/${locale}/methodology`}
            className="btn btn-ghost text-sm px-6 py-3"
            aria-label="Read the full Loop methodology breakdown"
          >
            {c.loop.cta}
          </Link>
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
                {pillar.linkLabel}
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
          <Link
            href={`/${locale}/results`}
            className="btn btn-ghost text-sm px-6 py-3 shrink-0"
            aria-label="View all student results and Lexile data"
          >
            {c.trust.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.trust.results.map((result) => (
            <article
              key={result.id}
              className="card card-dark p-6 flex flex-col gap-5"
              aria-label={`${result.student}, ${result.detail}`}
            >
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
    </>
  )
}