'use client'

// components/partners/PartnersClient.jsx
//
// Partners portal — invite-only access for education consultants,
// immigration advisors, and referral partners.
//
// Access mechanism: client-side PIN gate (social access control, not security).
// PIN persisted in localStorage so partners don't re-enter on refresh.
// Content: EN + ZH — driven from COPY object. locale prop passed from server shell.
//
// Owned vocabulary discipline:
//   "The Loop", "Navigator", "Lexile", "6+1 Traits", "MCT", "Harvard Project Zero"
//   appear in EN form within both locales — they are proper names, not translated.
//
// PIN: dodopartners
// Storage key: dodo_partners_unlocked

import { useState, useEffect } from 'react'
import Link from 'next/link'

// ── Access constant ───────────────────────────────────────────
const CORRECT_PIN = 'dodopartners'
const STORAGE_KEY = 'dodo_partners_unlocked'

// ── Bilingual content ─────────────────────────────────────────
const COPY = {
  en: {
    gate: {
      label:       'Partner Portal',
      body:        'This page is for invited partners.\nEnter your access code to continue.',
      placeholder: 'Access code',
      submit:      'Access Partner Content',
      error:       "That code doesn\u2019t match. Check with your contact at DODO.",
      footer:      "Don\u2019t have a code? Reach out to\u00a0",
    },
    hero: {
      chip: 'Invited Partners',
      h1a:  'The families you advise have solved every hard problem.\u00a0',
      h1b:  "Their child\u2019s English",
      h1c:  '\u00a0is the one gap left on the table.',
      sub:  'Chinese immigrant families in Canada and the US are expert navigators. Immigration, housing, financial planning, school admissions \u2014 solved. Their child\u2019s English development at the cognitive level? That one remains open. Not because they haven\u2019t tried. Because what\u2019s available doesn\u2019t work at the level these families expect.',
      stats: [
        { num: '16',        label: 'Weeks per cohort'      },
        { num: '6\u201312', label: 'Student age range'     },
        { num: '1:1',       label: 'Navigator per student' },
        { num: '200+',      label: 'Avg. Lexile gain'      },
      ],
    },
    s2: {
      eyebrow: 'The Program',
      h2:      'What you\u2019d tell a client in 90 seconds.',
      sub:     'DODO Learning is not a tutoring center, not an ESL program, not a reading support service. Here\u2019s what it actually is.',
      cards: [
        {
          label:    'The Method',
          headline: 'Read \u2192 Think \u2192 Speak \u2192 Write',
          body:     '16 weeks. Live, 1:1 sessions. A structured sequence \u2014 The Loop \u2014 that trains children to argue a position, read analytical prose, and write with intention. Not drill-based. Not homework support. A cognitive development program that happens in English.',
          accent:   '#b7b5fe',
        },
        {
          label:    'The Measurement',
          headline: 'A number. Every 16 weeks.',
          body:     'Progress tracked by Lexile levels \u2014 a nationally recognized reading metric used by schools across North America. Your client will have a before and after number at the end of every cycle. That\u2019s what they\u2019ll tell you about.',
          accent:   '#F5C842',
        },
        {
          label:    'The Model',
          headline: 'One Navigator. Full 16 weeks.',
          body:     'Not a rotating roster of instructors. Not a different face each session. One Navigator per child \u2014 a longitudinal guide who knows this child\u2019s voice, pace, and specific gaps across the full program. The relationship is the methodology.',
          accent:   '#7EC8A0',
        },
      ],
    },
    s3: {
      eyebrow:   'Who Fits',
      h2a:       'Refer well.',
      h2b:       'Your clients will thank you.',
      p1:        'Partners who understand the fit criteria refer better. Their clients arrive with the right expectations and leave with measurable results. That\u2019s the referral that builds your practice.',
      p2:        'When a client asks \u201cwhere did you find this?\u201d at their six-month check-in \u2014 they\u2019ll say your name first.',
      goodLabel: '\u2713 Strong Referral',
      goodItems: [
        'Child aged 6\u201312, currently in an English-dominant school',
        'Chinese immigrant family \u2014 Canada or the US',
        'Parent expects mastery-level English, not tutoring',
        'Family can commit to 16 consecutive weeks',
        'Child is engaged, not in crisis \u2014 building ahead, not catching up',
      ],
      notLabel: 'Not a fit for DODO',
      notItems: [
        'Families looking for test prep or exam coaching',
        'Emergency academic intervention or catch-up cases',
        'Children who need individualized learning support (IEP)',
      ],
    },
    s4: {
      eyebrow: 'Methodology',
      h2:      'When you refer DODO, you co-sign an outcome. Here\u2019s what makes it defensible.',
      sub:     'Every framework below is named, researched, and attributable. Your clients can look it up. Their schools will recognize it. That\u2019s what makes the referral worth making.',
      frameworks: [
        {
          org:   'MetaMetrics',
          name:  'Lexile Framework for Reading',
          body:  'A nationally recognized reading metric used by schools and programs across North America. DODO tracks every student\u2019s Lexile level before and after each 16-week cycle. The number is verifiable, school-compatible, and parent-readable.',
          color: '#b7b5fe',
        },
        {
          org:   'Michael Clay Thompson',
          name:  'MCT Language Arts',
          body:  'One of the most rigorous classical ELA programs in North America \u2014 built for students capable of genuine mastery. Etymology-based vocabulary, integrated grammar and literary craft, discussion-based rather than drill-based. DODO\u2019s writing program is grounded in the principles of this framework.',
          color: '#F5C842',
        },
        {
          org:   'Harvard Graduate School of Education',
          name:  'Harvard Project Zero Thinking Routines',
          body:  'Research-based thinking protocols embedded in every DODO session. Students use structured cognitive scaffolds \u2014 not generic comprehension questions \u2014 to analyze texts, defend positions, and develop analytical habits that transfer across subjects.',
          color: '#7EC8A0',
        },
      ],
      quote:      '\u201c\u666e\u901a\u82f1\u6587\u8bfe\u6559\u5b69\u5b50\u600e\u4e48\u7b54\u9898\u3002DODO Learning\u8bad\u7ec3\u5b69\u5b50\u600e\u4e48\u601d\u8003\u3002\u8fd9\u4e24\u4ef6\u4e8b\u7684\u533a\u522b\uff0c\u5341\u5e74\u540e\u624d\u771f\u6b63\u663e\u73b0\u51fa\u6765\u3002\u201d',
      quoteLabel: 'What families tell other families.',
    },
    s5: {
      eyebrow: 'For Partners',
      h2:      'A referral relationship built on outcomes, not commission structures.',
      points: [
        {
          label: 'Client-first fit assessment',
          body:  'Every referred family receives a free Lexile baseline assessment before enrollment. No obligation. This gives your client a concrete starting point \u2014 and you a proof point.',
        },
        {
          label: 'Measurable outcomes to report back',
          body:  'At the end of each 16-week cycle, parents receive a written Lexile progress report and a 6+1 Trait writing assessment summary. You\u2019ll know exactly how the referral performed.',
        },
        {
          label: 'Material on request',
          body:  'A one-page partner brief, a printable parent overview, and a slide deck for client presentations are available on request. Use them in your own language.',
        },
        {
          label: 'Direct access to Peter',
          body:  'Book a 30-minute call below to discuss your client base, whether DODO is the right fit, and what the referral relationship looks like in practice.',
        },
      ],
      toolkitLabel: 'Partner toolkit',
      pills: [
        'Free Lexile Assessment', 'Written Progress Reports',
        'Partner Brief (PDF)',    'Slide Deck Available',
        '6+1 Trait Summaries',   'Co-presentation Support',
        'Direct Founder Access',  'EN + ZH Materials',
      ],
      citiesLabel: 'Cities currently served',
      cities:      'Toronto \u00b7 Vancouver \u00b7 Calgary \u00b7 Montreal \u00b7 Richmond BC \u00b7 Markham',
      citiesSub:   'Online delivery \u2014 no geographic constraint',
    },
    s6: {
      chip:    'Let\u2019s Talk',
      h2:      'Ready to refer with confidence?',
      sub:     'Book a 30-minute call with Peter to discuss your client base, whether DODO is the right fit, and what the referral relationship looks like in practice.',
      cta:     'Book a Partner Call',
      ctaAlt:  'Request Partner Materials',
      tagline: 'Think Once. In Both Languages.',
      mailto:  'mailto:hello@dodolearning.com?subject=Partner%20Materials%20Request',
    },
  },

  zh: {
    gate: {
      label:       '\u5408\u4f5c\u4f19\u4f34\u4e13\u533a',
      body:        '\u6b64\u9875\u9762\u4ec5\u9650\u53d7\u9080\u5408\u4f5c\u4f19\u4f34\u8bbf\u95ee\u3002\n\u8bf7\u8f93\u5165\u8bbf\u95ee\u7801\u4ee5\u7ee7\u7eed\u3002',
      placeholder: '\u8bbf\u95ee\u7801',
      submit:      '\u8fdb\u5165\u5408\u4f5c\u4f19\u4f34\u4e13\u533a',
      error:       '\u8bbf\u95ee\u7801\u4e0d\u5339\u914d\uff0c\u8bf7\u5411\u60a8\u7684DODO\u8054\u7cfb\u4eba\u786e\u8ba4\u3002',
      footer:      '\u6ca1\u6709\u8bbf\u95ee\u7801\uff1f\u8bf7\u8054\u7cfb\u00a0',
    },
    hero: {
      chip: '\u53d7\u9080\u5408\u4f5c\u4f19\u4f34',
      h1a:  '\u60a8\u670d\u52a1\u7684\u5bb6\u5ead\u5df2\u89e3\u51b3\u4e86\u6240\u6709\u96be\u9898\u3002\u00a0',
      h1b:  '\u5b69\u5b50\u7684\u82f1\u8bed',
      h1c:  '\uff0c\u662f\u6842\u4e0a\u5c1a\u672a\u5408\u4e0a\u7684\u90a3\u4e00\u4e2a\u7f3a\u53e3\u3002',
      sub:  '\u5728\u52a0\u62ff\u5927\u548c\u7f8e\u56fd\u7684\u534e\u4eba\u79fb\u6c11\u5bb6\u5ead\uff0c\u662f\u9a7e\u9a6d\u590d\u6742\u4f53\u7cfb\u7684\u9ad8\u624b\u3002\u79fb\u6c11\u3001\u7f6e\u4e1a\u3001\u8d22\u52a1\u89c4\u5212\u3001\u5b66\u6821\u7533\u8bf7\u2014\u2014\u90fd\u5df2\u5904\u7406\u5981\u5f53\u3002\u5b69\u5b50\u5728\u8ba4\u77e5\u5c42\u9762\u7684\u82f1\u8bed\u53d1\u5c55\uff1f\u8fd9\u4e00\u9879\u4ecd\u60ac\u800c\u672a\u51b3\u3002\u4e0d\u662f\u56e0\u4e3a\u6ca1\u6709\u5c1d\u8bd5\uff0c\u800c\u662f\u56e0\u4e3a\u73b0\u6709\u9009\u62e9\uff0c\u8fbe\u4e0d\u5230\u8fd9\u4e9b\u5bb6\u5ead\u671f\u671b\u7684\u6c34\u51c6\u3002',
      stats: [
        { num: '16',       label: '\u6bcf\u671f\u8bfe\u7a0b\u5468\u6570'  },
        { num: '6\u201312', label: '\u5b66\u751f\u5e74\u9f84\u533a\u95f4' },
        { num: '1:1',      label: '\u4e13\u5c5eNavigator'                 },
        { num: '200+',     label: '\u5e73\u5747Lexile\u63d0\u5347'        },
      ],
    },
    s2: {
      eyebrow: '\u8bfe\u7a0b\u6982\u89c8',
      h2:      '\u5982\u4f55\u572890\u79d2\u5185\u5411\u5ba2\u6237\u4ecb\u7ecd DODO\u3002',
      sub:     'DODO Learning\u4e0d\u662f\u8865\u4e60\u4e2d\u5fc3\uff0c\u4e0d\u662fESL\u9879\u76ee\uff0c\u4e5f\u4e0d\u662f\u9605\u8bfb\u8f85\u52a9\u8bfe\u7a0b\u3002\u4ee5\u4e0b\u662f\u5b83\u771f\u6b63\u7684\u6837\u5b50\u3002',
      cards: [
        {
          label:    '\u65b9\u6cd5\u8bba',
          headline: 'Read \u2192 Think \u2192 Speak \u2192 Write',
          body:     '16\u5468\u3002\u5728\u7ebf\u4e00\u5bf9\u4e00\u76f4\u64ad\u8bfe\u3002\u4e00\u5957\u7ed3\u6784\u5316\u7684\u5b66\u4e60\u5faa\u73af\u2014\u2014The Loop\u2014\u2014\u8bad\u7ec3\u5b69\u5b50\u5efa\u7acb\u7acb\u573a\u3001\u9605\u8bfb\u5206\u6790\u6027\u6587\u7ae0\u3001\u6709\u610f\u56fe\u5730\u5199\u4f5c\u3002\u4e0d\u662f\u9898\u6d77\u6218\u672f\uff0c\u4e0d\u662f\u4f5c\u4e1a\u8f85\u52a9\u3002\u8fd9\u662f\u4e00\u4e2a\u4ee5\u82f1\u8bed\u4e3a\u5a92\u4ecb\u7684\u8ba4\u77e5\u53d1\u5c55\u9879\u76ee\u3002',
          accent:   '#b7b5fe',
        },
        {
          label:    '\u8fdb\u5ea6\u8861\u91cf',
          headline: '\u4e00\u4e2a\u6570\u5b57\u3002\u6bcf16\u5468\u4e00\u6b21\u3002',
          body:     '\u4ee5Lexile\u9605\u8bfb\u6c34\u5e73\u8ffd\u8e2a\u8fdb\u5ea6\u2014\u2014\u5317\u7f8e\u5b66\u6821\u666e\u904d\u8ba4\u53ef\u7684\u9605\u8bfb\u8bc4\u4f30\u6307\u6807\u3002\u6bcf\u4e2a\u5468\u671f\u7ed3\u675f\u540e\uff0c\u60a8\u7684\u5ba2\u6237\u5c06\u5f97\u5230\u4e00\u4e2a\u524d\u540e\u5bf9\u6bd4\u7684\u5177\u4f53\u6570\u5b57\u3002\u90a3\u662f\u4ed6\u4eec\u4f1a\u544a\u8bc9\u60a8\u7684\u4e8b\u3002',
          accent:   '#F5C842',
        },
        {
          label:    '\u670d\u52a1\u6a21\u5f0f',
          headline: '\u4e00\u4f4dNavigator\u3002\u5b8c\u6574\u768416\u5468\u3002',
          body:     '\u4e0d\u662f\u8f6e\u6362\u7684\u6559\u5e08\u56e2\u961f\uff0c\u4e0d\u662f\u6bcf\u8282\u8bfe\u6362\u4e00\u5f20\u9762\u5b54\u3002\u6bcf\u4e2a\u5b69\u5b50\u5bf9\u5e94\u4e00\u4f4dNavigator\u2014\u2014\u8d2f\u7a7f\u6574\u4e2a\u8bfe\u7a0b\u7684\u7eb5\u5411\u9668\u4f34\u8005\uff0c\u6df1\u77e5\u8fd9\u4e2a\u5b69\u5b50\u7684\u8868\u8fbe\u65b9\u5f0f\u3001\u5b66\u4e60\u8282\u594f\u548c\u5177\u4f53\u5dee\u8ddd\u3002\u8fd9\u6bb5\u5173\u7cfb\uff0c\u672c\u8eab\u5c31\u662f\u65b9\u6cd5\u8bba\u3002',
          accent:   '#7EC8A0',
        },
      ],
    },
    s3: {
      eyebrow:   '\u9002\u5408\u8f6c\u4ecb\u7684\u5ba2\u6237',
      h2a:       '\u7cbe\u51c6\u8f6c\u4ecb\u3002',
      h2b:       '\u60a8\u7684\u5ba2\u6237\u4f1a\u611f\u8c22\u60a8\u3002',
      p1:        '\u7406\u89e3\u5339\u914d\u6807\u51c6\u7684\u5408\u4f5c\u4f19\u4f34\uff0c\u80fd\u505a\u51fa\u66f4\u7cbe\u51c6\u7684\u8f6c\u4ecb\u3002\u4ed6\u4eec\u7684\u5ba2\u6237\u5e26\u7740\u6b63\u786e\u7684\u671f\u5f85\u800c\u6765\uff0c\u5e26\u7740\u53ef\u91cf\u5316\u7684\u6210\u679c\u800c\u53bb\u3002\u8fd9\u6837\u7684\u8f6c\u4ecb\uff0c\u624d\u80fd\u4e3a\u60a8\u7684\u4e1a\u52a1\u79ef\u7d2f\u53e3\u7891\u3002',
      p2:        '\u5f53\u5ba2\u6237\u5728\u516d\u4e2a\u6708\u540e\u95ee\u8d77\u201c\u8fd9\u4e2a\u9879\u76ee\u4f60\u662f\u600e\u4e48\u627e\u5230\u7684\u201d\u2014\u2014\u4ed6\u4eec\u4f1a\u7b2c\u4e00\u4e2a\u63d0\u5230\u60a8\u7684\u540d\u5b57\u3002',
      goodLabel: '\u2713 \u9002\u5408\u8f6c\u4ecb',
      goodItems: [
        '\u5b69\u5b506\u81f312\u5c81\uff0c\u5c31\u8bfb\u4e8e\u4ee5\u82f1\u8bed\u4e3a\u4e3b\u8981\u6559\u5b66\u8bed\u8a00\u7684\u5b66\u6821',
        '\u534e\u4eba\u79fb\u6c11\u5bb6\u5ead\uff0c\u4f4d\u4e8e\u52a0\u62ff\u5927\u6216\u7f8e\u56fd',
        '\u5bb6\u957f\u671f\u671b\u5b69\u5b50\u8fbe\u5230\u82f1\u8bed\u638c\u63e1\u7ea7\u6c34\u5e73\uff0c\u800c\u975e\u8865\u4e60\u8f85\u5bfc',
        '\u5bb6\u5ead\u80fd\u591f\u627f\u8bfa\u5b8c\u6574\u53c2\u4e0e16\u5468\u8bfe\u7a0b',
        '\u5b69\u5b50\u72b6\u6001\u79ef\u6781\uff0c\u5e76\u975e\u5904\u4e8e\u5b66\u4e1a\u5371\u673a\u2014\u2014\u662f\u5728\u6784\u5efa\u4f18\u52bf\uff0c\u800c\u975e\u8ffd\u8d76\u8fdb\u5ea6',
      ],
      notLabel: '\u4e0d\u9002\u5408DODO\u7684\u60c5\u51b5',
      notItems: [
        '\u5bc5\u627e\u8003\u8bd5\u5907\u8003\u6216\u5e94\u8bd5\u8f85\u5bfc\u7684\u5bb6\u5ead',
        '\u9700\u8981\u7d27\u6025\u5b66\u4e1a\u5e72\u9884\u6216\u8ffd\u8d76\u8fdb\u5ea6\u7684\u60c5\u51b5',
        '\u9700\u8981\u4e2a\u6027\u5316\u5b66\u4e60\u652f\u6301\u8ba1\u5212\uff08IEP\uff09\u7684\u5150\u7ae5',
      ],
    },
    s4: {
      eyebrow: '\u65b9\u6cd5\u8bba\u4f9d\u636e',
      h2:      '\u5f53\u60a8\u8f6c\u4ecbDODO\uff0c\u60a8\u5728\u4e3a\u4e00\u4e2a\u7ed3\u679c\u80cc\u4e66\u3002\u4ee5\u4e0b\u662f\u8fd9\u4e2a\u80cc\u4e66\u7684\u5e95\u6c14\u6240\u5728\u3002',
      sub:     '\u4ee5\u4e0b\u6bcf\u4e2a\u6846\u67b6\u90fd\u6709\u540d\u79f0\u3001\u6709\u7814\u7a76\u652f\u6491\u3001\u53ef\u6eba\u6e90\u67e5\u8bc1\u3002\u60a8\u7684\u5ba2\u6237\u53ef\u4ee5\u81ea\u884c\u67e5\u9605\uff0c\u4ed6\u4eec\u5b69\u5b50\u7684\u5b66\u6821\u4e5f\u4f1a\u8ba4\u53ef\u3002\u8fd9\u662f\u8f6c\u4ecb\u503c\u5f97\u505a\u7684\u539f\u56e0\u3002',
      frameworks: [
        {
          org:   'MetaMetrics',
          name:  'Lexile\u9605\u8bfb\u6846\u67b6',
          body:  '\u5317\u7f8e\u5b66\u6821\u548c\u8bfe\u7a0b\u5e7f\u6cdb\u8ba4\u53ef\u7684\u9605\u8bfb\u8bc4\u4f30\u6307\u6807\u3002DODO\u5728\u6bcf\u4e2a16\u5468\u5468\u671f\u524d\u540e\u8ffd\u8e2a\u6bcf\u4f4d\u5b66\u751f\u7684Lexile\u6c34\u5e73\u3002\u8fd9\u4e2a\u6570\u5b57\u53ef\u88ab\u6838\u5b9e\uff0c\u4e0e\u5b66\u6821\u4f53\u7cfb\u517c\u5bb9\uff0c\u5bb6\u957f\u4e5f\u80fd\u770b\u61c2\u3002',
          color: '#b7b5fe',
        },
        {
          org:   'Michael Clay Thompson',
          name:  'MCT Language Arts',
          body:  '\u5317\u7f8e\u6700\u4e25\u683c\u7684\u7ecf\u5178\u82f1\u8bed\u8bed\u6587\u8bfe\u7a0b\u4e4b\u4e00\u2014\u2014\u4e13\u4e3a\u6709\u80fd\u529b\u8fbe\u5230\u771f\u6b63\u638c\u63e1\u6c34\u5e73\u7684\u5b66\u751f\u800c\u8bbe\u8ba1\u3002\u8bcd\u6839\u8bcd\u6e90\u8bcd\u6c47\u3001\u8bed\u6cd5\u5199\u4f5c\u6587\u5b66\u4e00\u4f53\u5316\uff0c\u8ba8\u8bba\u9a71\u52a8\u800c\u975e\u9898\u6d77\u8bad\u7ec3\u3002DODO\u7684\u5199\u4f5c\u8bfe\u7a0b\u4ee5\u8be5\u6846\u67b6\u7684\u539f\u5219\u548c\u7406\u5ff5\u4e3a\u57fa\u7840\u3002',
          color: '#F5C842',
        },
        {
          org:   'Harvard Graduate School of Education',
          name:  'Harvard Project Zero Thinking Routines',
          body:  '\u5d4c\u5165\u6bcf\u8282DODO\u8bfe\u7a0b\u7684\u7814\u7a76\u578b\u601d\u7ef4\u534f\u8bae\u3002\u5b66\u751f\u4f7f\u7528\u7ed3\u6784\u5316\u7684\u8ba4\u77e5\u652f\u67b6\u2014\u2014\u800c\u975e\u6cdb\u6cdb\u7684\u7406\u89e3\u95ee\u9898\u2014\u2014\u6765\u5206\u6790\u6587\u672c\u3001\u6350\u536b\u7acb\u573a\uff0c\u5c06\u5206\u6790\u6027\u601d\u7ef4\u4e60\u60ef\u5185\u5316\u4e3a\u672c\u80fd\u3002',
          color: '#7EC8A0',
        },
      ],
      quote:      '\u201c\u666e\u901a\u82f1\u6587\u8bfe\u6559\u5b69\u5b50\u600e\u4e48\u7b54\u9898\u3002DODO Learning\u8bad\u7ec3\u5b69\u5b50\u600e\u4e48\u601d\u8003\u3002\u8fd9\u4e24\u4ef6\u4e8b\u7684\u533a\u522b\uff0c\u5341\u5e74\u540e\u624d\u771f\u6b63\u663e\u73b0\u51fa\u6765\u3002\u201d',
      quoteLabel: '\u5bb6\u5ead\u4e4b\u95f4\u76f8\u4e92\u8bc9\u8bf4\u7684\u8bdd\u3002',
    },
    s5: {
      eyebrow: '\u5408\u4f5c\u4f19\u4f34\u652f\u6301',
      h2:      '\u4ee5\u6210\u679c\u4e3a\u57fa\u7840\u7684\u5408\u4f5c\u5173\u7cfb\uff0c\u800c\u975e\u4ee5\u4f63\u91d1\u7ed3\u6784\u4e3a\u57fa\u7840\u3002',
      points: [
        {
          label: '\u5ba2\u6237\u4f18\u5148\u7684\u5339\u914d\u8bc4\u4f30',
          body:  '\u6bcf\u4e2a\u88ab\u8f6c\u4ecb\u7684\u5bb6\u5ead\u5728\u5165\u5b66\u524d\u5747\u53ef\u514d\u8d39\u8fdb\u884cLexile\u57fa\u7ebf\u8bc4\u4f30\u3002\u65e0\u4efb\u4f55\u4e49\u52a1\u3002\u8fd9\u4e3a\u60a8\u7684\u5ba2\u6237\u63d0\u4f9b\u4e86\u660e\u786e\u7684\u8d77\u70b9\uff0c\u4e5f\u4e3a\u60a8\u63d0\u4f9b\u4e86\u53ef\u5f15\u7528\u7684\u4f9d\u636e\u3002',
        },
        {
          label: '\u53ef\u56de\u62a5\u7684\u53ef\u91cf\u5316\u6210\u679c',
          body:  '\u6bcf\u4e2a16\u5468\u5468\u671f\u7ed3\u675f\u540e\uff0c\u5bb6\u957f\u5c06\u6536\u5230\u4e66\u9762\u7684Lexile\u8fdb\u5c55\u62a5\u544a\u548c6+1\u7279\u8d28\u5199\u4f5c\u8bc4\u4f30\u6458\u8981\u3002\u60a8\u5c06\u786e\u5207\u4e86\u89e3\u8fd9\u6b21\u8f6c\u4ecb\u7684\u6210\u6548\u3002',
        },
        {
          label: '\u53ef\u6309\u9700\u63d0\u4f9b\u6750\u6599',
          body:  '\u53ef\u6309\u9700\u63d0\u4f9b\uff1a\u4e00\u9875\u7eb8\u5408\u4f5c\u4f19\u4f34\u7b80\u4ecb\u3001\u53ef\u6253\u5370\u7684\u5bb6\u957f\u6982\u89c8\uff0c\u4ee5\u53ca\u7528\u4e8e\u5ba2\u6237\u6f14\u793a\u7684\u5e7b\u706f\u7247\u3002\u4ee5\u60a8\u4e60\u60ef\u7684\u8bed\u8a00\u4f7f\u7528\u3002',
        },
        {
          label: '\u76f4\u63a5\u8054\u7cfbPeter',
          body:  '\u901a\u8fc7\u4e0b\u65b9\u9884\u7ea630\u5206\u949f\u901a\u8bdd\uff0c\u8ba8\u8bba\u60a8\u7684\u5ba2\u6237\u7fa4\u4f53\u3001DODO\u662f\u5426\u9002\u5408\uff0c\u4ee5\u53ca\u5408\u4f5c\u5173\u7cfb\u5728\u5b9e\u9645\u64cd\u4f5c\u4e2d\u7684\u6837\u5b50\u3002',
        },
      ],
      toolkitLabel: '\u5408\u4f5c\u4f19\u4f34\u5de5\u5177\u5305',
      pills: [
        '\u514d\u8d39Lexile\u8bc4\u4f30',         '\u4e66\u9762\u8fdb\u5c55\u62a5\u544a',
        '\u5408\u4f5c\u7b80\u4ecb\uff08PDF\uff09', '\u53ef\u63d0\u4f9b\u5e7b\u706f\u7247',
        '6+1\u7279\u8d28\u8bc4\u4f30\u6458\u8981', '\u8054\u5408\u6f14\u793a\u652f\u6301',
        '\u76f4\u63a5\u8054\u7cfb\u521b\u59cb\u4eba', '\u4e2d\u82f1\u53cc\u8bed\u6750\u6599',
      ],
      citiesLabel: '\u5f53\u524d\u670d\u52a1\u57ce\u5e02',
      cities:      '\u591a\u4f26\u591a \u00b7 \u6e29\u54e5\u534e \u00b7 \u5361\u5c14\u52a0\u91cc \u00b7 \u8499\u7279\u5229\u5c14 \u00b7 \u5217\u6cbb\u6587 \u00b7 \u9a6c\u514b\u6c49',
      citiesSub:   '\u7ebf\u4e0a\u6388\u8bfe\u2014\u2014\u4e0d\u53d7\u5730\u57df\u9650\u5236',
    },
    s6: {
      chip:    '\u7acb\u5373\u6c9f\u901a',
      h2:      '\u51c6\u5907\u597d\u81ea\u4fe1\u5730\u8f6c\u4ecb\u4e86\u5417\uff1f',
      sub:     '\u9884\u7ea6\u4e0ePeter\u768430\u5206\u949f\u901a\u8bdd\uff0c\u8ba8\u8bba\u60a8\u7684\u5ba2\u6237\u7fa4\u4f53\u3001DODO\u662f\u5426\u9002\u5408\uff0c\u4ee5\u53ca\u5408\u4f5c\u5173\u7cfb\u5728\u5b9e\u9645\u64cd\u4f5c\u4e2d\u7684\u6837\u5b50\u3002',
      cta:     '\u9884\u7ea6\u5408\u4f5c\u901a\u8bdd',
      ctaAlt:  '\u7d22\u53d6\u5408\u4f5c\u6750\u6599',
      tagline: '\u4e00\u6b21\u601d\u8003\uff0c\u53cc\u8bed\u7686\u901a\u3002',
      mailto:  'mailto:hello@dodolearning.com?subject=%E5%90%88%E4%BD%9C%E4%BC%99%E4%BC%B4%E6%9D%90%E6%96%99%E7%94%B3%E8%AF%B7',
    },
  },
}

// ── Font helper ───────────────────────────────────────────────
const font = (locale) => locale === 'zh' ? 'var(--font-cjk)' : 'var(--font-latin)'

// ── Sub-components ────────────────────────────────────────────
function Eyebrow({ children, center = false, dark = false, locale = 'en' }) {
  return (
    <div style={{
      fontFamily:    font(locale),
      fontWeight:    500,
      fontSize:      '12px',
      letterSpacing: locale === 'zh' ? '0.06em' : '0.1em',
      textTransform: 'uppercase',
      color:         dark ? '#b7b5fe' : '#5856cc',
      marginBottom:  '16px',
      textAlign:     center ? 'center' : undefined,
    }}>
      {children}
    </div>
  )
}

function Pill({ children, locale = 'en' }) {
  return (
    <span style={{
      display:         'inline-block',
      fontFamily:      font(locale),
      fontSize:        '12px',
      fontWeight:      500,
      color:           '#b7b5fe',
      backgroundColor: 'rgba(183,181,254,0.12)',
      border:          '1px solid rgba(183,181,254,0.25)',
      borderRadius:    '9999px',
      padding:         '4px 12px',
      marginRight:     '8px',
      marginBottom:    '8px',
    }}>
      {children}
    </span>
  )
}

// ── Gate view (locked) ────────────────────────────────────────
function GateView({ g, locale, input, setInput, onSubmit, onKeyDown, error, shake }) {
  return (
    <div style={{
      minHeight:       '100dvh',
      display:         'flex',
      flexDirection:   'column',
      alignItems:      'center',
      justifyContent:  'center',
      backgroundColor: '#0E0E12',
      padding:         '2rem',
      fontFamily:      font(locale),
    }}>
      <style>{`
        @keyframes gate-shake {
          0%   { transform: translateX(0);    }
          15%  { transform: translateX(-7px); }
          30%  { transform: translateX(7px);  }
          45%  { transform: translateX(-5px); }
          60%  { transform: translateX(5px);  }
          75%  { transform: translateX(-3px); }
          90%  { transform: translateX(3px);  }
          100% { transform: translateX(0);    }
        }
        .gate-shake { animation: gate-shake 0.55s ease; }
        .gate-input:focus {
          outline:      none;
          border-color: #b7b5fe;
          box-shadow:   0 0 0 3px rgba(183,181,254,0.15);
        }
        .gate-btn:hover  { background-color: #c8c6ff; }
        .gate-btn:active { transform: scale(0.97); }
      `}</style>

      {/* Logo */}
      <div style={{ marginBottom: '48px', opacity: 0.9 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-dark.svg"
          alt="DODO Learning"
          width={120}
          height={40}
          style={{ display: 'block' }}
        />
      </div>

      {/* Gate card */}
      <div
        className={shake ? 'gate-shake' : ''}
        style={{
          width:           '100%',
          maxWidth:        '400px',
          backgroundColor: '#161820',
          border:          '1px solid rgba(183,181,254,0.18)',
          borderRadius:    '16px',
          padding:         '40px 36px',
          boxShadow:       '0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{
          fontSize:      '11px',
          fontWeight:    600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         '#b7b5fe',
          marginBottom:  '12px',
          textAlign:     'center',
        }}>
          {g.label}
        </div>

        <p style={{
          fontSize:     '15px',
          fontWeight:   400,
          color:        'rgba(240,240,240,0.6)',
          lineHeight:   1.6,
          textAlign:    'center',
          marginBottom: '32px',
          whiteSpace:   'pre-line',
        }}>
          {g.body}
        </p>

        <input
          className="gate-input"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder={g.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          style={{
            display:         'block',
            width:           '100%',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border:          `1px solid ${error ? 'rgba(255,100,100,0.5)' : 'rgba(183,181,254,0.25)'}`,
            borderRadius:    '10px',
            padding:         '14px 16px',
            fontSize:        '15px',
            fontWeight:      400,
            color:           '#F0F0F0',
            fontFamily:      font(locale),
            letterSpacing:   '0.08em',
            marginBottom:    error ? '10px' : '20px',
            transition:      'border-color 0.2s, box-shadow 0.2s',
            boxSizing:       'border-box',
          }}
        />

        {error && (
          <p style={{
            fontSize:     '13px',
            fontWeight:   400,
            color:        'rgba(255,120,120,0.85)',
            textAlign:    'center',
            marginBottom: '16px',
            lineHeight:   1.4,
          }}>
            {g.error}
          </p>
        )}

        <button
          className="gate-btn"
          onClick={onSubmit}
          style={{
            display:         'block',
            width:           '100%',
            backgroundColor: '#b7b5fe',
            color:           '#0E0E12',
            fontSize:        '15px',
            fontWeight:      600,
            fontFamily:      font(locale),
            padding:         '14px 24px',
            borderRadius:    '10px',
            border:          'none',
            cursor:          'pointer',
            transition:      'background-color 0.15s, transform 0.1s',
          }}
        >
          {g.submit}
        </button>
      </div>

      <p style={{
        marginTop:  '32px',
        fontSize:   '13px',
        fontWeight: 400,
        color:      'rgba(240,240,240,0.25)',
        textAlign:  'center',
        lineHeight: 1.5,
      }}>
        {g.footer}
        <a
          href="mailto:hello@dodolearning.com"
          style={{ color: 'rgba(183,181,254,0.6)', textDecoration: 'none' }}
        >
          hello@dodolearning.com
        </a>
      </p>
    </div>
  )
}

// ── Unlocked content ──────────────────────────────────────────
function PartnersContent({ c, locale }) {
  const f = font(locale)

  return (
    <div style={{ fontFamily: f, width: '100%', overflow: 'hidden' }}>

      {/* ── HERO ───────────────────────────────────────────── */}
      {/*
          Background: bg-partners-hero.webp — 1920s watercolor main street.
          Warm brick reds + period-correct blues echo Lavender Signal palette.
          objectPosition 'center 55%' — keeps building facades + street in frame,
          cropping residual white sky at top.
          Overlay stack:
            1. Primary directional — text side dark, image side reveals at right
            2. Bottom vignette — grounds the section edge
            3. Lavender radial — maintains brand warmth over the illustration
      */}
      <section style={{
        minHeight:       'min(90dvh, 780px)',
        display:         'flex',
        flexDirection:   'column',
        justifyContent:  'flex-end',
        position:        'relative',
        overflow:        'hidden',
        backgroundColor: '#0E0E12',
        paddingTop:      'calc(var(--nav-height) + 4rem)',
        paddingBottom:   '5rem',
      }}>
        {/* Background illustration */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bg-partners-hero.webp"
          alt=""
          aria-hidden="true"
          style={{
            position:       'absolute',
            inset:          0,
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'center 55%',
            display:        'block',
          }}
        />

        {/* Primary directional overlay — heavy left, reveals right */}
        <div aria-hidden="true" style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(108deg, rgba(14,14,18,0.97) 0%, rgba(14,14,18,0.93) 32%, rgba(14,14,18,0.70) 58%, rgba(14,14,18,0.30) 100%)',
        }} />

        {/* Bottom vignette */}
        <div aria-hidden="true" style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(14,14,18,0.90) 0%, transparent 32%)',
        }} />

        {/* Lavender radial — brand warmth over the illustration */}
        <div aria-hidden="true" style={{
          position:   'absolute',
          inset:      0,
          background: 'radial-gradient(ellipse 55% 50% at 15% 62%, rgba(183,181,254,0.10) 0%, transparent 65%)',
        }} />

        <div aria-hidden="true" style={{
          position:      'absolute',
          bottom:        '-40px',
          right:         '-40px',
          fontSize:      '320px',
          fontWeight:    700,
          color:         '#b7b5fe',
          opacity:       0.028,
          lineHeight:    1,
          letterSpacing: '-0.04em',
          userSelect:    'none',
          pointerEvents: 'none',
          fontFamily:    'var(--font-latin)',
        }}>
          PARTNER
        </div>

        <div className="px-6 relative z-10" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{
            display:         'inline-flex',
            alignItems:      'center',
            gap:             '8px',
            backgroundColor: 'rgba(183,181,254,0.1)',
            border:          '1px solid rgba(183,181,254,0.25)',
            borderRadius:    '9999px',
            padding:         '5px 14px',
            marginBottom:    '32px',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '9999px', backgroundColor: '#b7b5fe', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#b7b5fe', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {c.hero.chip}
            </span>
          </div>

          <h1 style={{
            fontSize:     'clamp(36px, 5vw, 64px)',
            fontWeight:   700,
            color:        '#F0F0F0',
            lineHeight:   1.15,
            maxWidth:     '820px',
            marginBottom: '28px',
          }}>
            {c.hero.h1a}<span style={{ color: '#b7b5fe' }}>{c.hero.h1b}</span>{c.hero.h1c}
          </h1>

          <p style={{
            fontSize:     'clamp(16px, 2vw, 20px)',
            fontWeight:   400,
            color:        'rgba(240,240,240,0.55)',
            lineHeight:   1.65,
            maxWidth:     '620px',
            marginBottom: '48px',
          }}>
            {c.hero.sub}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
            {c.hero.stats.map(({ num, label }) => (
              <div key={label}>
                <div style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 700, color: '#b7b5fe', lineHeight: 1, fontFamily: 'var(--font-latin)' }}>{num}</div>
                <div style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(240,240,240,0.45)', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S2 PROGRAM IN 90 SECONDS ──────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: '#212830' }}>
        <div className="container-section">
          <Eyebrow dark center locale={locale}>{c.s2.eyebrow}</Eyebrow>
          <h2 className="text-center mb-6" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.25 }}>
            {c.s2.h2}
          </h2>
          <p className="text-center mb-16 mx-auto" style={{ fontSize: '16px', fontWeight: 400, color: 'rgba(240,240,240,0.5)', lineHeight: 1.6, maxWidth: '560px' }}>
            {c.s2.sub}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.s2.cards.map(({ label, headline, body, accent }) => (
              <div key={label} style={{ backgroundColor: '#2E3848', borderRadius: '16px', padding: '32px', borderTop: `3px solid ${accent}` }}>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, opacity: 0.85, marginBottom: '12px' }}>
                  {label}
                </div>
                {/* The Loop headline always renders in latin regardless of locale */}
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.3, marginBottom: '16px', fontFamily: 'var(--font-latin)' }}>
                  {headline}
                </div>
                <p style={{ fontSize: '15px', fontWeight: 400, color: 'rgba(240,240,240,0.65)', lineHeight: 1.65, fontFamily: f }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S3 WHO FITS ───────────────────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="container-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <Eyebrow locale={locale}>{c.s3.eyebrow}</Eyebrow>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0E0E12', lineHeight: 1.25, marginBottom: '20px' }}>
                {c.s3.h2a}<br /><span style={{ color: '#5856cc' }}>{c.s3.h2b}</span>
              </h2>
              <p style={{ fontSize: '16px', fontWeight: 400, color: '#3D4452', lineHeight: 1.65, marginBottom: '24px' }}>{c.s3.p1}</p>
              <p style={{ fontSize: '16px', fontWeight: 400, color: '#3D4452', lineHeight: 1.65 }}>{c.s3.p2}</p>
            </div>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid rgba(14,14,18,0.1)', overflow: 'hidden' }}>
              <div style={{ padding: '28px 32px', borderBottom: '1px solid rgba(14,14,18,0.08)' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7EC8A0', marginBottom: '16px' }}>
                  {c.s3.goodLabel}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {c.s3.goodItems.map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ color: '#7EC8A0', fontWeight: 700, marginTop: '2px', flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: '15px', fontWeight: 400, color: '#212830', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: '28px 32px', backgroundColor: '#FAFAFA' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(14,14,18,0.4)', marginBottom: '16px' }}>
                  {c.s3.notLabel}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {c.s3.notItems.map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ color: 'rgba(14,14,18,0.3)', fontWeight: 700, marginTop: '2px', flexShrink: 0 }}>—</span>
                      <span style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(14,14,18,0.45)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S4 METHODOLOGY ────────────────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: '#0E0E12' }}>
        <div className="container-section">
          <Eyebrow dark center locale={locale}>{c.s4.eyebrow}</Eyebrow>
          <h2 className="text-center mb-6" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.25, maxWidth: '700px', margin: '0 auto 20px' }}>
            {c.s4.h2}
          </h2>
          <p className="text-center mx-auto mb-16" style={{ fontSize: '16px', fontWeight: 400, color: 'rgba(240,240,240,0.5)', lineHeight: 1.65, maxWidth: '560px' }}>
            {c.s4.sub}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {c.s4.frameworks.map(({ name, org, body, color }) => (
              <div key={name} style={{ backgroundColor: '#1A1C24', borderRadius: '16px', padding: '32px', border: '1px solid rgba(255,255,255,0.07)' }}>
                {/* Org + framework name always in latin — they are proper nouns */}
                <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(240,240,240,0.3)', marginBottom: '8px', fontFamily: 'var(--font-latin)' }}>
                  {org}
                </div>
                <div style={{ fontSize: '17px', fontWeight: 700, color, lineHeight: 1.3, marginBottom: '16px', fontFamily: 'var(--font-latin)' }}>
                  {name}
                </div>
                <p style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(240,240,240,0.6)', lineHeight: 1.65, fontFamily: f }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
          {/* Pull quote — always in CJK, same across both locales */}
          <div style={{ borderLeft: '3px solid #b7b5fe', paddingLeft: '28px', maxWidth: '700px', margin: '0 auto' }}>
            <p style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(240,240,240,0.75)', lineHeight: 1.55, fontFamily: 'var(--font-cjk)' }}>
              {c.s4.quote}
            </p>
            <p style={{ fontSize: '13px', fontWeight: 500, color: '#b7b5fe', marginTop: '12px', opacity: 0.8 }}>
              {c.s4.quoteLabel}
            </p>
          </div>
        </div>
      </section>

      {/* ── S5 WHAT PARTNERS GET ──────────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: '#212830' }}>
        <div className="container-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <Eyebrow dark locale={locale}>{c.s5.eyebrow}</Eyebrow>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.25, marginBottom: '28px' }}>
                {c.s5.h2}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {c.s5.points.map(({ label, body }) => (
                  <div key={label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: '#b7b5fe', marginTop: '8px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: '#F0F0F0', marginBottom: '4px' }}>{label}</div>
                      <p style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(240,240,240,0.6)', lineHeight: 1.6 }}>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ backgroundColor: '#2E3848', borderRadius: '20px', padding: '40px 36px', border: '1px solid rgba(183,181,254,0.12)' }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(240,240,240,0.4)', marginBottom: '20px', letterSpacing: '0.05em' }}>
                {c.s5.toolkitLabel}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '32px' }}>
                {c.s5.pills.map((tag) => <Pill key={tag} locale={locale}>{tag}</Pill>)}
              </div>
              <div style={{ borderTop: '1px solid rgba(183,181,254,0.12)', paddingTop: '28px' }}>
                <div style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(240,240,240,0.4)', marginBottom: '4px' }}>{c.s5.citiesLabel}</div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: 'rgba(240,240,240,0.75)', lineHeight: 1.6 }}>{c.s5.cities}</div>
                <div style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(240,240,240,0.35)', marginTop: '4px' }}>{c.s5.citiesSub}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S6 CLOSING CTA ────────────────────────────────── */}
      <section className="px-6 py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display:         'inline-flex',
            alignItems:      'center',
            gap:             '8px',
            backgroundColor: 'rgba(183,181,254,0.08)',
            border:          '1px solid rgba(183,181,254,0.2)',
            borderRadius:    '9999px',
            padding:         '5px 16px',
            marginBottom:    '32px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#b7b5fe', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#b7b5fe', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {c.s6.chip}
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2, marginBottom: '20px' }}>
            {c.s6.h2}
          </h2>
          <p style={{ fontSize: '18px', fontWeight: 400, color: 'rgba(240,240,240,0.55)', lineHeight: 1.65, maxWidth: '560px', margin: '0 auto 48px' }}>
            {c.s6.sub}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <Link
              href={`/${locale}/consult`}
              style={{ display: 'inline-block', backgroundColor: '#F5C842', color: '#0E0E12', fontSize: '17px', fontWeight: 600, padding: '16px 36px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 24px rgba(245,200,66,0.25)' }}
            >
              {c.s6.cta}
            </Link>
            <a
              href={c.s6.mailto}
              style={{ display: 'inline-block', backgroundColor: 'transparent', color: '#F0F0F0', fontSize: '17px', fontWeight: 500, padding: '16px 36px', borderRadius: '12px', textDecoration: 'none', border: '1px solid rgba(240,240,240,0.2)' }}
            >
              {c.s6.ctaAlt}
            </a>
          </div>
          <p style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(240,240,240,0.25)', marginTop: '28px' }}>
            {c.s6.tagline}
          </p>
        </div>
      </section>

    </div>
  )
}

// ── Main export ───────────────────────────────────────────────
export default function PartnersClient({ locale }) {
  const c = COPY[locale] ?? COPY.en

  const [input,    setInput]    = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error,    setError]    = useState(false)
  const [shake,    setShake]    = useState(false)
  const [mounted,  setMounted]  = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') setUnlocked(true)
    } catch {}
  }, [])

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === CORRECT_PIN) {
      try { localStorage.setItem(STORAGE_KEY, '1') } catch {}
      setError(false)
      setUnlocked(true)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSubmit() }

  if (!mounted) return <div style={{ minHeight: '100dvh', backgroundColor: '#0E0E12' }} />

  if (!unlocked) {
    return (
      <GateView
        g={c.gate}
        locale={locale}
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        error={error}
        shake={shake}
      />
    )
  }

  return <PartnersContent c={c} locale={locale} />
}