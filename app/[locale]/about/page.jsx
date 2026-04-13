// app/[locale]/about/page.jsx
//
// /about — Bilingual EN + ZH.
// Copy rewritten to DODO Learning Master Content & Brand Prompt v2.1 (April 12, 2026)
// Key changes: English mastery as primary goal · Bilingualism as cognitive outcome ·
// Positive-forward voice · English Thinker nomenclature · Future positioning + AI differentiation
//
// BACKGROUND UPDATE — April 13 2026
//   Hero bg: bg-about-hero.webp (blue jay on branch at sunset, watercolor)
//   Replaced CSS backgroundImage with <img> tag + overlay divs
//   Same 4-stop overlay treatment as program / methodology / results / navigators
//   objectPosition: 'center 38%' — frames the jay + branch + sunset horizon
//   Warm amber/orange radial accent echoes the sunset sky

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const meta = (COPY[locale] ?? COPY.en).meta
  return buildMetadata({ locale, title: meta.title, description: meta.description, path: '/about' })
}

// ─────────────────────────────────────────────────────────────
// BILINGUAL CONTENT
// ─────────────────────────────────────────────────────────────
const COPY = {
  en: {
    meta: {
      title:
        'What Is DODO Learning? English Literacy at the Cognitive Level — for Chinese Families in Canada & the US',
      description:
        'DODO Learning is the live, Navigator-led English literacy program for Chinese families in Canada and the US — trained on the full Read \u2192 Think \u2192 Speak \u2192 Write loop, measured by Lexile levels and the 6+1 Trait writing framework. We build English thinkers at mastery level. Bilingual depth emerges from that rigor.',
    },
    hero: {
      chip:          'Our Story',
      h1a:           'A child who\u00a0', h1em1: 'speaks', h1b: '\u00a0English',
      h1c:           'is not the same as a child',
      h1d:           'who\u00a0', h1em2: 'thinks', h1e: '\u00a0in it.',
      sub:
        'Built for Chinese families in Canada and the US whose children will lead in English-dominant schools, universities, and boardrooms. Most children in these families learn English as a subject — they pass exams, they sound fluent. Ask them to argue a position, read dense analytical prose, or write something original — and the language reaches its limit. Our founder saw that gap and built DODO to close it. The goal is English mastery at the cognitive level. Bilingual depth is what emerges when that goal is reached.',
      videoLabel:    'Watch: Why DODO Exists',
      videoDuration: '3 min',
    },
    name: {
      p1:       'DODO comes from a deliberate, two-sided idea:\u00a0',
      p1strong: 'Do + Do.',
      p2:
        'DO — the language of academic possibility, of formal argument, of the future your child will lead. DO — the mother tongue, the emotional core, the lens through which the world first made sense. The name is about doing the work in both languages, at every level, simultaneously.',
      p3:
        'The double \u201cDo\u201d is also a commitment to iteration. You don\u2019t master a language once. You master it by doing, then doing again \u2014 each cycle deeper, each cycle more precisely your own.',
    },
    beliefs: {
      sub:    'Every session is built on the same three convictions.',
      bodies: [
        'Fluency is not about sounding right. It\u2019s about thinking precisely \u2014 reading complex arguments, defending a position with evidence, writing with intention. That is the standard we build toward. Language is architecture for thought. We build the architecture first; fluency follows.',
        'The best learning happens between people, not between a child and a screen. Every DODO session is a dialogue. The Navigator\u2019s first move after your child answers is always a better question \u2014 never an evaluation.',
        'Cognitive depth in English protects thinking in both languages. The more precisely your child reasons in English, the more sophisticated their thinking becomes in every language they use. Bilingual capacity is the natural evidence of intellectual rigor \u2014 not a separate goal to manage.',
      ],
    },
    loop: {
      sub:         'Every session follows the same cycle. Consistent in structure. Cumulative in effect.',
      cta:         'Explore Methodology',
      programLink: 'See The 16-Week Program \u2192',
      descs: [
        'Classical literature and carefully selected texts \u2014 Alice in Wonderland, Treasure Island, Poe \u2014 read not as school assignments, but as living arguments about how language, character, and consequence work.',
        'Structure evidence. Map cause and effect. Hold two competing ideas without rushing to resolve them. Every Think step targets a specific type of reasoning \u2014 not a reading skill, not a comprehension worksheet.',
        'Defend a position. Inhabit a character\u2019s perspective. Articulate exactly where in the text the evidence lives. Speaking is not output \u2014 it is how thinking becomes precise enough to write.',
        'Writing is the proof that a language truly belongs to you. Progress assessed against the 6+1 Trait rubric \u2014 not by age or grade level, but by the quality and craft of the work itself.',
      ],
    },
    navigators: {
      chipNot:        'Not teachers.',
      chipAre:        'Navigators.',
      p1pre:          'We call them\u00a0',
      p1strong:       'Navigators',
      p1post:
        ' \u2014 longitudinal guides who know this child\u2019s voice, pace, and specific gaps across a full 16 weeks. They sit beside your child and guide. They do not stand at the front and lecture.',
      p2:
        'A Navigator asks questions they don\u2019t already know the answer to. They get genuinely curious about what a seven-year-old thinks about fairness, about loyalty, about why a character made the choice they made.',
      p3:
        'They are readers. They are thinkers. They care about language because it is how they make sense of everything \u2014 and because they know that a child trained to reason rigorously in English has a mind that will carry them further than any test score ever could.',
      navigatorsLink: 'Meet the Navigators \u2192',
    },
    families: {
      items: [
        {
          quote: '\u201cOur child will lead in English. Both languages will be stronger for it.\u201d',
          desc:
            'You understand that English mastery and Chinese depth are not competing goals. A child trained to think precisely in one language carries that precision into both. You want the standard set high \u2014 and measured.',
        },
        {
          quote: '\u201cWe move between worlds. Our child\u2019s English needs to match that complexity.\u201d',
          desc:
            'You\u2019ve navigated more than one culture. You know the difference between conversational English and the kind of English that opens doors in universities, boardrooms, and leadership rooms. You want your child in that second category.',
        },
        {
          quote: '\u201cGood isn\u2019t the ceiling. Depth is.\u201d',
          desc:
            'Your child is already strong in English. But you sense there\u2019s a ceiling \u2014 in how they argue, how they write, how they handle complexity under pressure. The future belongs to children who can reason precisely and write with intention. We build that.',
        },
      ],
    },
    closing: {
      sub:
        'Not a tagline. A philosophy. Genuine bilingual depth is not achieved through parallel translation or language-maintenance programs. It emerges when a child is trained to think precisely in English at the highest cognitive level \u2014 to read complexity, argue with evidence, and write with intention. That intellectual rigor transfers. It strengthens thinking in every language. Both languages become stronger because the mind became stronger first.',
      cta: "Start Your Child\u2019s Journey",
    },
  },

  zh: {
    meta: {
      title:
        'DODO Learning\u662f\u4ec0\u4e48\uff1f\u9762\u5411\u52a0\u62ff\u5927\u548c\u7f8e\u56fd\u534e\u8bed\u5bb6\u5ead\u7684\u82f1\u8bed\u9ad8\u9636\u601d\u7ef4\u80fd\u529b\u8bad\u7ec3\u9879\u76ee',
      description:
        'DODO Learning\u4e3a\u52a0\u62ff\u5927\u548c\u7f8e\u56fd\u534e\u8bed\u5bb6\u5ead\u800c\u5efa\uff0c\u7531Navigator\u4e3b\u5bfc\uff0c\u8bad\u7ec3\u5b8c\u6574\u7684\u9605\u8bfb\u2192\u601d\u8003\u2192\u8868\u8fbe\u2192\u5199\u4f5c\u95ed\u73af\uff0c\u4ee5Lexile\u548c6+1\u7279\u8d28\u8861\u91cf\u6210\u957f\u3002\u6211\u4eec\u7684\u76ee\u6807\u662f\u82f1\u8bed\u601d\u7ef4\u80fd\u529b\u7684\u6839\u672c\u627f\u8f7d\u3002\u53cc\u8bed\u6df1\u5ea6\uff0c\u662f\u8fd9\u79cd\u80fd\u529b\u7684\u81ea\u7136\u7ed3\u679c\u3002',
    },
    hero: {
      chip:          '\u6211\u4eec\u7684\u6545\u4e8b',
      h1a:           '\u4f1a\u00a0', h1em1: '\u8bf4', h1b: '\u00a0\u82f1\u8bed\u7684\u5b69\u5b50\uff0c',
      h1c:           '\u548c\u7528\u82f1\u8bed',
      h1d:           '', h1em2: '\u601d\u8003', h1e: '\u00a0\u7684\u5b69\u5b50\uff0c\u662f\u4e0d\u4e00\u6837\u7684\u3002',
      sub:
        '\u4e13\u4e3a\u5b69\u5b50\u5c06\u5728\u82f1\u8bed\u4e3b\u5bfc\u7684\u5b66\u6821\u3001\u5927\u5b66\u548c\u804c\u573a\u4e2d\u5c55\u793a\u9886\u5bfc\u529b\u7684\u534e\u8bed\u5bb6\u5ead\u800c\u5efa\u3002\u5927\u591a\u6570\u8fd9\u6837\u7684\u5b69\u5b50\u628a\u82f1\u8bed\u5f53\u4f5c\u4e00\u95e8\u5b66\u79d1\u6765\u5b66\u2014\u2014\u4ed6\u4eec\u901a\u8fc7\u8003\u8bd5\uff0c\u542c\u8d77\u6765\u4e5f\u5f88\u6d41\u5229\u3002\u4f46\u8981\u6c42\u4ed6\u4eec\u8bba\u8bc1\u4e00\u4e2a\u89c2\u70b9\u3001\u9605\u8bfb\u5bc6\u96c6\u7684\u5206\u6790\u6027\u6587\u672c\u3001\u5199\u51fa\u6709\u539f\u521b\u6027\u7684\u4e1c\u897f\u2014\u2014\u8bed\u8a00\u5c31\u5230\u8fbe\u4e86\u4e0a\u9650\u3002\u6211\u4eec\u7684\u521b\u59cb\u4eba\u770b\u5230\u4e86\u8fd9\u9053\u7f3a\u53e3\uff0c\u521b\u5efa\u4e86DODO\u6765\u5f25\u5408\u5b83\u3002\u76ee\u6807\u662f\u82f1\u8bed\u601d\u7ef4\u80fd\u529b\u7684\u6839\u672c\u627f\u8f7d\u3002\u53cc\u8bed\u6df1\u5ea6\uff0c\u662f\u8fd9\u79cd\u80fd\u529b\u5230\u8fbe\u4e4b\u540e\u7684\u81ea\u7136\u7ed3\u679c\u3002',
      videoLabel:    '\u89c2\u770b\uff1aDODO\u4e3a\u4f55\u800c\u5b58\u5728',
      videoDuration: '3\u5206\u949f',
    },
    name: {
      p1:       'DODO\u6765\u81ea\u4e00\u4e2a\u8c03\u7528\u4e86\u4e24\u79cd\u8bed\u8a00\u7684\u60f3\u6cd5\uff1a\u00a0',
      p1strong: 'Do + Do\uff08\u505a+\u518d\u505a\uff09\u3002',
      p2:
        'DO\u2014\u2014\u82f1\u8bed\uff0c\u5b66\u672f\u53ef\u80fd\u6027\u7684\u8bed\u8a00\uff0c\u6b63\u5f0f\u8bba\u8bc1\u548c\u672a\u6765\u9886\u5bfc\u7684\u8bed\u8a00\u3002Do\u2014\u2014\u6bcd\u8bed\uff0c\u60c5\u611f\u7684\u6839\uff0c\u4e16\u754c\u6700\u521d\u6709\u610f\u4e49\u7684\u996e\u9014\u3002\u8fd9\u4e2a\u540d\u5b57\u662f\u5173\u4e8e\u5728\u4e24\u79cd\u8bed\u8a00\u4e2d\u540c\u65f6\u3001\u5728\u6bcf\u4e00\u4e2a\u5c42\u9762\u4e0a\u505a\u771f\u6b63\u7684\u5de5\u4f5c\u3002',
      p3:
        '\u201cDo\u201d\u7684\u91cd\u590d\u4e5f\u662f\u5bf9\u8fed\u4ee3\u672c\u8d28\u7684\u627f\u8bfa\uff1a\u638c\u63e1\u4e00\u95e8\u8bed\u8a00\u4e0d\u662f\u4e00\u6b21\u6027\u7684\u4e8b\u3002\u4f60\u901a\u8fc7\u505a\u6765\u5b66\u4e60\uff0c\u7136\u540e\u518d\u505a\u4e00\u9047\u2014\u2014\u6bcf\u4e00\u5faa\u73af\u66f4\u6df1\u5165\uff0c\u6bcf\u4e00\u5faa\u73af\u66f4\u5c5e\u4e8e\u81ea\u5df1\u3002',
    },
    beliefs: {
      sub:    '\u6bcf\u8282\u8bfe\u5efa\u7acb\u5728\u540c\u6837\u7684\u4e09\u4e2a\u4fe1\u5ff5\u4e4b\u4e0a\u3002',
      bodies: [
        '\u6d41\u5229\u5ea6\u4e0d\u662f\u542c\u8d77\u6765\u5bf9\u3002\u662f\u60f3\u5f97\u6e05\u695a\u2014\u2014\u80fd\u8bfb\u61c2\u590d\u6742\u7684\u8bba\u8bc1\uff0c\u80fd\u7528\u8bc1\u636e\u634d\u536b\u4e00\u4e2a\u89c2\u70b9\uff0c\u80fd\u6709\u610f\u56fe\u5730\u5199\u4f5c\u3002\u8fd9\u624d\u662f\u6211\u4eec\u8bad\u7ec3\u7684\u6807\u51c6\u3002\u8bed\u8a00\u662f\u601d\u7ef4\u7684\u67b6\u6784\u3002\u6211\u4eec\u5148\u5efa\u67b6\u6784\uff0c\u6d41\u5229\u5ea6\u968f\u4e4b\u800c\u6765\u3002',
        '\u6700\u597d\u7684\u5b66\u4e60\u53d1\u751f\u5728\u4eba\u4e0e\u4eba\u4e4b\u95f4\uff0c\u800c\u975e\u5b69\u5b50\u4e0e\u5c4f\u5e55\u4e4b\u95f4\u3002\u6bcf\u8282DODO\u8bfe\u7a0b\u90fd\u662f\u5bf9\u8bdd\u3002\u5b69\u5b50\u56de\u7b54\u4e4b\u540e\uff0cNavigator\u7684\u7b2c\u4e00\u53cd\u5e94\u6c38\u8fdc\u662f\u4e00\u4e2a\u66f4\u597d\u7684\u95ee\u9898\u2014\u2014\u4e0d\u662f\u8bc4\u5206\uff0c\u4e0d\u662f\u8868\u626c\u3002',
        '\u82f1\u8bed\u7684\u8ba4\u77e5\u6df1\u5ea6\u4fdd\u62a4\u4e24\u79cd\u8bed\u8a00\u7684\u601d\u7ef4\u80fd\u529b\u3002\u5b69\u5b50\u5728\u82f1\u8bed\u4e2d\u63a8\u7406\u5f97\u8d8a\u7cbe\u786e\uff0c\u4ed6\u5728\u6bcf\u79cd\u8bed\u8a00\u4e2d\u7684\u601d\u8003\u5c31\u8d8a\u6df1\u523b\u3002\u53cc\u8bed\u80fd\u529b\u662f\u8ba4\u77e5\u4e25\u8c28\u6027\u7684\u81ea\u7136\u4f53\u73b0\u2014\u2014\u800c\u4e0d\u662f\u4e00\u4e2a\u9700\u8981\u5355\u72ec\u7ba1\u7406\u7684\u76ee\u6807\u3002',
      ],
    },
    loop: {
      sub:         '\u6bcf\u8282\u8bfe\u9075\u5faa\u540c\u6837\u7684\u5faa\u73af\u3002\u7ed3\u6784\u4e00\u81f4\uff0c\u6548\u679c\u79ef\u7d2f\u3002',
      cta:         '\u63a2\u7d22\u6559\u5b66\u65b9\u6cd5',
      programLink: '\u4e86\u89e316\u5468\u8bfe\u7a0b \u2192',
      descs: [
        '\u7ecf\u5178\u6587\u5b66\u4e0e\u7cbe\u9009\u6587\u672c\u2014\u2014\u300a\u7231\u4e3d\u4e1d\u6f2b\u6e38\u4ed9\u5883\u300b\u3001\u300a\u91d1\u94f6\u5c9b\u300b\u3001\u7c21\u00b7\u7231\u4f26\u2014\u2014\u4e0d\u662f\u5f53\u4f5c\u8bfe\u5185\u4f5c\u4e1a\u6765\u9605\u8bfb\uff0c\u800c\u662f\u5f53\u4f5c\u5173\u4e8e\u8bed\u8a00\u3001\u4eba\u7269\u4e0e\u540e\u679c\u7684\u6d3b\u751f\u8bba\u8bc1\u6765\u9605\u8bfb\u3002',
        '\u6574\u7406\u8bc1\u636e\u3002\u63cf\u7ed8\u56e0\u679c\u5173\u7cfb\u3002\u540c\u65f6\u6301\u6709\u4e24\u4e2a\u76f8\u4e92\u7ade\u4e89\u7684\u60f3\u6cd5\u800c\u4e0d\u6025\u4e8e\u89e3\u51b3\u3002\u6bcf\u4e00\u4e2a\u201c\u601d\u8003\u201d\u73af\u8282\u9488\u5bf9\u7684\u662f\u4e00\u79cd\u5177\u4f53\u7684\u63a8\u7406\u65b9\u5f0f\u2014\u2014\u800c\u4e0d\u662f\u4e00\u9879\u9605\u8bfb\u6280\u80fd\uff0c\u4e0d\u662f\u4e00\u5f20\u7406\u89e3\u5de5\u4f5c\u8868\u3002',
        '\u634d\u536b\u4e00\u4e2a\u7acb\u573a\u3002\u8fdb\u5165\u4e00\u4e2a\u4eba\u7269\u7684\u89c6\u89d2\u3002\u786e\u5207\u8bf4\u51fa\u6587\u672c\u4e2d\u8bc1\u636e\u7684\u5177\u4f53\u4f4d\u7f6e\u3002\u8868\u8fbe\u4e0d\u662f\u8f93\u51fa\u2014\u2014\u800c\u662f\u8ba9\u601d\u7ef4\u7cbe\u786e\u5230\u8db3\u4ee5\u7528\u6587\u5b57\u8868\u8fbe\u7684\u8fc7\u7a0b\u3002',
        '\u5199\u4f5c\u662f\u8bed\u8a00\u771f\u6b63\u5c5e\u4e8e\u4f60\u7684\u8bc1\u660e\u3002\u8fdb\u5ea6\u4ee5\u300a6+1\u7279\u8d28\u300b\u8bc4\u5206\u8861\u91cf\u2014\u2014\u4e0d\u6309\u5e74\u9f84\u6216\u5e74\u7ea7\uff0c\u800c\u662f\u6309\u4f5c\u54c1\u672c\u8eab\u7684\u8d28\u91cf\u4e0e\u5de5\u827a\u3002',
      ],
    },
    navigators: {
      chipNot:        '\u4e0d\u662f\u8001\u5e08\u3002',
      chipAre:        'Navigators\u3002',
      p1pre:          '\u6211\u4eec\u79f0\u4ed6\u4eec\u4e3a\u00a0',
      p1strong:       'Navigators',
      p1post:
        '\u2014\u2014\u8de8\u8d8416\u5468\u5168\u7a0b\u6301\u7eed\u4e86\u89e3\u8fd9\u4e2a\u5b69\u5b50\u7684\u8bed\u8a00\u98ce\u683c\u3001\u5b66\u4e60\u8282\u594f\u548c\u5177\u4f53\u77ed\u677f\u7684\u5c55\u671b\u5f0f\u5bfc\u5e08\u3002\u4ed6\u4eec\u5750\u5728\u60a8\u5b69\u5b50\u8eab\u8fb9\uff0c\u5f15\u5bfc\u3002\u4e0d\u662f\u7ad9\u5728\u524d\u9762\u8bb2\u6388\u3002',
      p2:
        'Navigator\u4f1a\u63d0\u51fa\u81ea\u5df1\u4e5f\u4e0d\u77e5\u9053\u7b54\u6848\u7684\u95ee\u9898\u3002\u4ed6\u4eec\u4f1a\u5bf9\u4e00\u4e2a\u4e03\u5c81\u5b69\u5b50\u5982\u4f55\u770b\u5f85\u516c\u5e73\u8fd9\u4ef6\u4e8b\u771f\u6b63\u611f\u5230\u597d\u5947\u3002',
      p3:
        '\u4ed6\u4eec\u662f\u9605\u8bfb\u8005\uff0c\u662f\u601d\u8003\u8005\u3002\u4ed6\u4eec\u5173\u5fc3\u8bed\u8a00\uff0c\u4e0d\u662f\u56e0\u4e3a\u90a3\u662f\u5de5\u4f5c\u2014\u2014\u800c\u662f\u56e0\u4e3a\u90a3\u662f\u4ed6\u4eec\u7406\u89e3\u4e00\u5207\u7684\u65b9\u5f0f\u3002\u4ed6\u4eec\u77e5\u9053\uff0c\u4e00\u4e2a\u80fd\u5728\u82f1\u8bed\u4e2d\u4e25\u8c28\u63a8\u7406\u7684\u5b69\u5b50\uff0c\u62e5\u6709\u4e00\u4e2a\u4efb\u4f55\u6210\u7ee9\u5355\u90fd\u65e0\u6cd5\u5e26\u5230\u7684\u672a\u6765\u3002',
      navigatorsLink: '\u8ba4\u8bc6\u5bfc\u5e08\u56e2\u961f \u2192',
    },
    families: {
      items: [
        {
          quote: '\u201c\u6211\u4eec\u7684\u5b69\u5b50\u4f1a\u7528\u82f1\u8bed\u9886\u5bfc\u3002\u4e24\u79cd\u8bed\u8a00\u5c06\u56e0\u6b64\u53d8\u5f97\u66f4\u5f3a\u3002\u201d',
          desc:
            '\u60a8\u6e05\u695a\u82f1\u8bed\u7cbe\u901a\u548c\u4e2d\u6587\u6df1\u5ea6\u4e0d\u662f\u76f8\u4e92\u7ade\u4e89\u7684\u76ee\u6807\u3002\u4e00\u4e2a\u88ab\u8bad\u7ec3\u5f97\u5728\u82f1\u8bed\u4e2d\u7cbe\u786e\u601d\u8003\u7684\u5b69\u5b50\uff0c\u5c06\u8fd9\u79cd\u7cbe\u786e\u5ea6\u5e26\u5165\u6bcf\u4e00\u79cd\u4ed6\u4f7f\u7528\u7684\u8bed\u8a00\u3002\u60a8\u8981\u6807\u51c6\u9ad8\u2014\u2014\u800c\u4e14\u53ef\u91cf\u5316\u3002',
        },
        {
          quote: '\u201c\u6211\u4eec\u5728\u4e16\u754c\u4e4b\u95f4\u7a7f\u884c\u3002\u5b69\u5b50\u7684\u82f1\u8bed\u9700\u8981\u5339\u914d\u90a3\u79cd\u590d\u6742\u5ea6\u3002\u201d',
          desc:
            '\u60a8\u77e5\u9053\u65e5\u5e38\u82f1\u8bed\u4e0e\u80fd\u5728\u5927\u5b66\u3001\u804c\u573a\u548c\u9886\u5bfc\u7a7f\u4e0a\u8bed\u8a00\u4e4b\u95f4\u7684\u533a\u522b\u3002\u60a8\u5e0c\u671b\u5b69\u5b50\u8fdb\u5165\u7b2c\u4e8c\u4e2a\u7c7b\u522b\u2014\u2014\u8fd9\u5c31\u662f\u6211\u4eec\u6240\u5efa\u7684\u3002',
        },
        {
          quote: '\u201c\u591f\u597d\u4e0d\u662f\u5929\u82b1\u677f\u3002\u6df1\u5ea6\u624d\u662f\u3002\u201d',
          desc:
            '\u60a8\u7684\u5b69\u5b50\u82f1\u8bed\u5df2\u7ecf\u5f88\u5f3a\u3002\u4f46\u60a8\u611f\u5230\u6709\u4e00\u4e2a\u5929\u82b1\u677f\u2014\u2014\u5728\u5982\u4f55\u8bba\u8bc1\u3001\u5982\u4f55\u5199\u4f5c\u3001\u5982\u4f55\u5728\u538b\u529b\u4e0b\u5904\u7406\u590d\u6742\u60c5\u5883\u3002\u672a\u6765\u5c5e\u4e8e\u80fd\u7cbe\u786e\u63a8\u7406\u3001\u6709\u610f\u56fe\u5730\u5199\u4f5c\u7684\u5b69\u5b50\u3002\u6211\u4eec\u5efa\u7acb\u8fd9\u79cd\u80fd\u529b\u3002',
        },
      ],
    },
    closing: {
      sub:
        '\u8fd9\u4e0d\u662f\u4e00\u53e5\u53e3\u53f7\uff0c\u800c\u662f\u4e00\u79cd\u54f2\u5b66\u3002\u771f\u6b63\u7684\u53cc\u8bed\u6df1\u5ea6\u4e0d\u662f\u901a\u8fc7\u5e76\u884c\u7ffb\u8bd1\u6216\u8bed\u8a00\u7ef4\u62a4\u9879\u76ee\u5b9e\u73b0\u7684\u3002\u5b83\u662f\u5f53\u5b69\u5b50\u88ab\u8bad\u7ec3\u5f97\u5728\u82f1\u8bed\u4e2d\u5728\u6700\u9ad8\u8ba4\u77e5\u5c42\u9762\u7cbe\u786e\u601d\u8003\u2014\u2014\u9605\u8bfb\u590d\u6742\u6027\u3001\u7528\u8bc1\u636e\u8bba\u8bc1\u3001\u6709\u610f\u56fe\u5730\u5199\u4f5c\u2014\u2014\u4e4b\u540e\u7684\u81ea\u7136\u7ed3\u679c\u3002\u8fd9\u79cd\u667a\u8bc6\u4e0a\u7684\u4e25\u8c28\u6027\u53ef\u4ee5\u8fc1\u79fb\u3002\u5b83\u52a0\u5f3a\u6bcf\u4e00\u79cd\u8bed\u8a00\u7684\u601d\u7ef4\u80fd\u529b\u3002\u4e24\u79cd\u8bed\u8a00\u90fd\u53d8\u5f97\u66f4\u5f3a\uff0c\u662f\u56e0\u4e3a\u601d\u7ef4\u672c\u8eab\u5148\u53d8\u5f97\u66f4\u5f3a\u4e86\u3002',
      cta: '\u5f00\u59cb\u60a8\u5b69\u5b50\u7684\u65c5\u7a0b',
    },
  },
}

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────
function BilingualHeading({ en, cn, light = false, center = false, locale = 'en' }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 600, lineHeight: 1.2, color: light ? '#F0F0F0' : '#0E0E12' }}>
        {en}
      </h2>
      {locale === 'zh' && (
        <p className="mt-2" style={{ fontFamily: 'var(--font-cjk)', fontSize: '16px', fontWeight: 500, color: light ? '#b7b5fe' : '#5856cc' }}>
          {cn}
        </p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────
const BELIEFS_BASE = [
  { id: 'belief-1', num: '01', belief: 'Language is architecture for thought. We build the architecture first.', beliefCn: '\u8bed\u8a00\u662f\u601d\u7ef4\u7684\u67b6\u6784\u3002\u6211\u4eec\u5148\u5efa\u67b6\u6784\u3002' },
  { id: 'belief-2', num: '02', belief: "Children don\u2019t need more content. They need better conversations.", beliefCn: '\u5b69\u5b50\u9700\u8981\u7684\u4e0d\u662f\u66f4\u591a\u5185\u5bb9\uff0c\u800c\u662f\u66f4\u597d\u7684\u5bf9\u8bdd\u3002' },
  { id: 'belief-3', num: '03', belief: 'A rigorous English mind is a bilingual mind \u2014 by nature, not by design.', beliefCn: '\u4e25\u8c28\u7684\u82f1\u8bed\u601d\u7ef4\u8005\uff0c\u5929\u7136\u5c31\u662f\u53cc\u8bed\u8005\u3002' },
]

const LOOP_STEPS_BASE = [
  { id: 'read',  step: 'Read',  stepCn: '\u9605\u8bfb' },
  { id: 'think', step: 'Think', stepCn: '\u601d\u8003' },
  { id: 'speak', step: 'Speak', stepCn: '\u8868\u8fbe' },
  { id: 'write', step: 'Write', stepCn: '\u4e66\u5199' },
]

const NAVIGATOR_TRAITS = [
  { trait: 'Curious',          traitZh: '\u597d\u5947',                  symbol: '?' },
  { trait: 'Patient',          traitZh: '\u8010\u5fc3',                  symbol: '~' },
  { trait: 'English Thinkers', traitZh: '\u82f1\u8bed\u601d\u7ef4\u8005', symbol: 'EN' },
  { trait: 'Empathetic',       traitZh: '\u5171\u60c5',                  symbol: '\u2661' },
  { trait: 'Rigorous',         traitZh: '\u4e25\u8c28',                  symbol: '\u25c8' },
]

const FAMILIES_BASE = [
  { id: 'family-1', title: 'The High-Standard Home',  titleCn: '\u9ad8\u6807\u51c6\u5bb6\u5ead',               imgBg: 'linear-gradient(135deg, #142318 0%, #1e3526 60%, #142318 100%)' },
  { id: 'family-2', title: 'The Global Family',        titleCn: '\u56fd\u9645\u5316\u5bb6\u5ead',               imgBg: 'linear-gradient(135deg, #131c2e 0%, #1e2a40 60%, #131c2e 100%)' },
  { id: 'family-3', title: 'The Ambitious Learner',    titleCn: '\u5fd7\u5411\u8fdc\u5927\u7684\u5b66\u4e60\u8005', imgBg: 'linear-gradient(135deg, #2a1218 0%, #3a1e24 60%, #2a1218 100%)' },
]

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────
function BeliefIcon({ id }) {
  const base = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (id === 'belief-1') return <svg {...base}><path d="M9.5 2a4.5 4.5 0 0 0 0 9M14.5 2a4.5 4.5 0 0 1 0 9" /><path d="M5 10a4 4 0 0 0 4 4v6M19 10a4 4 0 0 1-4 4v6M9 20h6" /></svg>
  if (id === 'belief-2') return <svg {...base}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /><path d="M5 17l.75 2.25L8 20l-2.25.75L5 23" /><path d="M19 2l.5 1.5L21 4l-1.5.5L19 6" /></svg>
  return <svg {...base}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
}

function LoopStepIcon({ id }) {
  const base = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (id === 'read')  return <svg {...base} aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
  if (id === 'think') return <svg {...base} aria-hidden="true"><path d="M9.5 2a4.5 4.5 0 0 0 0 9M14.5 2a4.5 4.5 0 0 1 0 9" /><path d="M5 10a4 4 0 0 0 4 4v6M19 10a4 4 0 0 1-4 4v6M9 20h6" /></svg>
  if (id === 'speak') return <svg {...base} aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
  return <svg {...base} aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
}

// ─────────────────────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────────────────────

function Hero({ c, locale }) {
  return (
    <section
      aria-labelledby="about-hero-heading"
      style={{
        minHeight:     '100dvh',
        display:       'flex',
        flexDirection: 'column',
        position:      'relative',
        overflow:      'hidden',
      }}
    >
      {/* Background illustration — blue jay at sunset */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/bg-about-hero.webp"
        alt=""
        aria-hidden="true"
        style={{
          position:       'absolute',
          inset:          0,
          width:          '100%',
          height:         '100%',
          objectFit:      'cover',
          objectPosition: 'center 38%',
          display:        'block',
        }}
      />

      {/* Primary directional overlay — left text zone near-solid, right opens to sunset */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(108deg, rgba(14,14,18,0.98) 0%, rgba(14,14,18,0.97) 35%, rgba(14,14,18,0.80) 58%, rgba(14,14,18,0.28) 100%)',
        }}
      />

      {/* Bottom vignette */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(14,14,18,0.88) 0%, transparent 28%)',
        }}
      />

      {/* Warm amber/orange radial accent — echoes the sunset sky */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          background:    'radial-gradient(ellipse 55% 50% at 70% 40%, rgba(200,120,40,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        className="container-section relative z-10 w-full"
        style={{
          flex:          1,
          display:       'flex',
          alignItems:    'center',
          paddingTop:    'calc(var(--nav-height) + 3.5rem)',
          paddingBottom: '5rem',
        }}
      >
        <div className="grid lg:grid-cols-5 gap-12 items-center w-full">
          <div className="lg:col-span-3">
            <div
              className="inline-flex items-center gap-2 mb-10 rounded-full"
              style={{ padding: '6px 16px', border: '1px solid rgba(183,181,254,0.2)', backgroundColor: 'rgba(183,181,254,0.05)' }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#b7b5fe' }} aria-hidden="true" />
              <span style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#b7b5fe' }}>
                {c.hero.chip}
              </span>
            </div>
            <h1
              id="about-hero-heading"
              className="mb-6"
              style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.02em', color: '#F0F0F0' }}
            >
              {c.hero.h1a}<em className="not-italic" style={{ fontWeight: 600, color: '#b7b5fe' }}>{c.hero.h1em1}</em>{c.hero.h1b}<br />
              {c.hero.h1c}<br />
              {c.hero.h1d}<em className="not-italic" style={{ fontWeight: 600, color: '#F5C842' }}>{c.hero.h1em2}</em>{c.hero.h1e}
            </h1>
            {locale === 'zh' && (
              <p className="mb-8" style={{ fontFamily: 'var(--font-cjk)', fontSize: '20px', color: 'rgba(183,181,254,0.5)' }}>
                会说英语的孩子，和用英语思考的孩子，是不一样的。
              </p>
            )}
            <p style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(240,240,240,0.52)', maxWidth: '32rem' }}>
              {c.hero.sub}
            </p>
          </div>
          <div className="lg:col-span-2">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ aspectRatio: '3/4' }}
              aria-label={c.hero.videoLabel}
            >
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, #161c28 0%, #2E3848 50%, #1a2030 100%)' }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
                <div
                  className="flex items-center justify-center"
                  style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: '#F5C842', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M11 8l14 8-14 8V8z" fill="#0E0E12" />
                  </svg>
                </div>
                <p className="mt-4" style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{c.hero.videoLabel}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{c.hero.videoDuration}</p>
              </div>
              <div className="absolute inset-0 rounded-3xl" style={{ border: '1px solid rgba(183,181,254,0.1)' }} aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-16 absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: 'rgba(183,181,254,0.3)', animation: 'bounce 2s infinite' }}>
            <path d="M10 3v11M4 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}

function TheNameSection({ c, locale }) {
  return (
    <section className="relative" aria-labelledby="name-heading" style={{ padding: 'var(--section-md) 0' }}>
      <div aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0E0E12 0%, #212830 40%, #212830 100%)' }} />
      <div className="container-section relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <BilingualHeading en="The Name" cn="名字的故事" light locale={locale} />
            <div className="mt-10 space-y-5" style={{ fontSize: '17px', lineHeight: 1.9, color: 'rgba(240,240,240,0.7)' }}>
              <p>{c.name.p1}<strong style={{ color: '#F0F0F0' }}>{c.name.p1strong}</strong></p>
              <p>{c.name.p2}</p>
              <p>{c.name.p3}</p>
            </div>
            {locale === 'zh' && (
              <p className="mt-6" style={{ fontFamily: 'var(--font-cjk)', fontSize: '15px', lineHeight: 1.8, color: 'rgba(183,181,254,0.5)' }}>
                DODO，两个Do，两种语言，同时、同等地去做。
              </p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="flex items-center justify-center" style={{ width: 256, height: 256, borderRadius: '50%', border: '2px solid rgba(183,181,254,0.2)', position: 'relative' }}>
                <div aria-hidden="true" style={{ position: 'absolute', inset: '1rem', borderRadius: '50%', border: '1px solid rgba(183,181,254,0.1)' }} />
                <div className="flex items-center gap-4 relative z-10" aria-label="Do plus Do">
                  <span style={{ fontSize: '56px', fontWeight: 700, color: '#b7b5fe', letterSpacing: '-0.02em', lineHeight: 1 }}>Do</span>
                  <span aria-hidden="true" style={{ fontSize: '32px', fontWeight: 300, color: '#F5C842', lineHeight: 1 }}>+</span>
                  <span style={{ fontSize: '56px', fontWeight: 700, color: '#b7b5fe', letterSpacing: '-0.02em', lineHeight: 1 }}>Do</span>
                </div>
              </div>
              <div aria-hidden="true" style={{ position: 'absolute', top: -8, right: -8, width: 24, height: 24, borderRadius: '50%', backgroundColor: '#F5C842' }} />
              <div aria-hidden="true" style={{ position: 'absolute', bottom: -12, left: -12, width: 16, height: 16, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.4)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatWeBelieve({ c, locale }) {
  return (
    <section className="section-light" aria-labelledby="beliefs-heading">
      <div className="container-section">
        <div className="mb-20 text-center">
          <BilingualHeading en="What We Believe" cn="我们的信念" center locale={locale} />
          <p className="mt-4 mx-auto" style={{ fontSize: '15px', color: 'rgba(14,14,18,0.5)', maxWidth: '28rem' }}>{c.beliefs.sub}</p>
        </div>
        <div>
          {BELIEFS_BASE.map((item, i) => (
            <div key={item.id} className="py-8 md:py-12" style={{ borderBottom: i < BELIEFS_BASE.length - 1 ? '1px solid rgba(14,14,18,0.08)' : 'none' }} aria-label={`Belief ${item.num}: ${item.belief}`}>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-[3rem_1fr_1fr] md:gap-8 md:items-start">
                <div className="flex items-center justify-center shrink-0" style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.1)', color: '#b7b5fe' }} aria-hidden="true">
                  <BeliefIcon id={item.id} />
                </div>
                <div className="min-w-0">
                  <p style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.3, color: '#0E0E12' }}>&ldquo;{item.belief}&rdquo;</p>
                  {locale === 'zh' && <p className="mt-1" style={{ fontFamily: 'var(--font-cjk)', fontSize: '13px', color: '#5856cc' }}>{item.beliefCn}</p>}
                </div>
                <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#2E3848' }}>{c.beliefs.bodies[i]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TheLoop({ locale, c }) {
  return (
    <section className="section-dark" aria-labelledby="loop-section-heading">
      <div className="container-section">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <BilingualHeading en="The Loop" cn="学习循环" light locale={locale} />
          <p className="max-w-md" style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(240,240,240,0.4)' }}>{c.loop.sub}</p>
        </div>
        <div className="relative">
          <div aria-hidden="true" className="hidden lg:block absolute" style={{ top: '3.5rem', left: '12.5%', right: '12.5%', height: '1px', background: 'linear-gradient(to right, rgba(183,181,254,0) 0%, rgba(183,181,254,0.2) 50%, rgba(183,181,254,0) 100%)' }} />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4" aria-label="The Loop methodology">
            {LOOP_STEPS_BASE.map((item, i) => (
              <li key={item.id} className="text-center px-8 py-8">
                <div className="flex items-center justify-center mx-auto mb-6 relative z-10" style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.1)', border: '1px solid rgba(183,181,254,0.2)', color: '#b7b5fe' }} aria-hidden="true">
                  <LoopStepIcon id={item.id} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.01em', color: '#ffffff', marginBottom: '4px' }}>{item.step}</h3>
                {locale === 'zh' && <p className="mb-4" style={{ fontFamily: 'var(--font-cjk)', fontSize: '14px', color: 'rgba(183,181,254,0.5)' }}>{item.stepCn}</p>}
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(240,240,240,0.5)' }}>{c.loop.descs[i]}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
          <Link href={`/${locale}/methodology`} className="inline-flex items-center gap-2" style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#b7b5fe', textDecoration: 'none' }}>
            {c.loop.cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
          <Link href={`/${locale}/program`} className="inline-flex items-center gap-2" style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(183,181,254,0.55)', textDecoration: 'none' }}>
            {c.loop.programLink}
          </Link>
        </div>
      </div>
    </section>
  )
}

function WhoNavigatorsAre({ locale, c }) {
  return (
    <section className="section-light" aria-labelledby="navigators-heading">
      <div className="container-section">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden" style={{ height: '520px' }} aria-label="A DODO Navigator in session">
                <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #e8e7f8 0%, #d4d3f0 40%, #c0bfea 100%)' }} aria-hidden="true" />
              </div>
              <div className="absolute rounded-2xl px-6 py-4" style={{ bottom: -24, right: -24, backgroundColor: '#b7b5fe' }} aria-hidden="true">
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#0E0E12' }}>{c.navigators.chipNot}</p>
                <p style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(14,14,18,0.7)' }}>{c.navigators.chipAre}</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <BilingualHeading en="Who Navigators Are" cn="关于领航员" locale={locale} />
            <div className="mt-8 space-y-5" style={{ fontSize: '16px', lineHeight: 1.85, color: '#2E3848' }}>
              <p>{c.navigators.p1pre}<strong style={{ color: '#0E0E12' }}>{c.navigators.p1strong}</strong>{c.navigators.p1post}</p>
              <p>{c.navigators.p2}</p>
              <p>{c.navigators.p3}</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-10" aria-label="Navigator traits">
              {NAVIGATOR_TRAITS.map((item) => (
                <span key={item.trait} className="inline-flex items-center gap-2 rounded-full" style={{ padding: '10px 20px', backgroundColor: '#0E0E12', color: '#ffffff', fontSize: '13px', fontWeight: 500 }}>
                  <span aria-hidden="true" style={{ fontSize: '11px', color: '#b7b5fe' }}>{item.symbol}</span>
                  {locale === 'zh' ? item.traitZh : item.trait}
                </span>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <Link href={`/${locale}/navigators`} style={{ fontSize: '14px', fontWeight: 600, color: '#5856cc', textDecoration: 'none' }}>{c.navigators.navigatorsLink}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FamiliesWeServe({ c, locale }) {
  return (
    <section className="section-darker" aria-labelledby="families-heading">
      <div className="container-section">
        <div className="mb-16">
          <BilingualHeading en="The Families We Serve" cn="我们服务的家庭" light center locale={locale} />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {FAMILIES_BASE.map((family, i) => (
            <article key={family.id} className="group relative rounded-3xl overflow-hidden" style={{ backgroundColor: '#212830', border: '1px solid rgba(255,255,255,0.05)' }} aria-label={`Family: ${family.title}`}>
              <div className="overflow-hidden" style={{ height: '13rem' }} aria-hidden="true">
                <div className="w-full h-full" style={{ background: family.imgBg }} />
              </div>
              <div className="p-8">
                <p className="mb-3" style={{ fontSize: '13px', fontWeight: 500, fontStyle: 'italic', color: '#F5C842' }}>{c.families.items[i].quote}</p>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff' }}>{family.title}</h3>
                {locale === 'zh' && <p className="mb-4" style={{ fontFamily: 'var(--font-cjk)', fontSize: '13px', color: 'rgba(183,181,254,0.5)' }}>{family.titleCn}</p>}
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'rgba(240,240,240,0.5)' }}>{c.families.items[i].desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClosingStamp({ locale, c }) {
  return (
    <section className="relative overflow-hidden" aria-labelledby="about-closing-heading">
      <div aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0E0E12 0%, #212830 50%, #0E0E12 100%)' }} />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(183,181,254,0.08) 0%, transparent 60%)' }} />
      <div className="relative z-10 text-center mx-auto" style={{ maxWidth: '56rem', padding: '10rem 1.5rem' }}>
        <div className="flex items-center justify-center mx-auto mb-10" style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.1)', border: '1px solid rgba(183,181,254,0.2)', color: '#b7b5fe' }} aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h2 id="about-closing-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '0.5rem' }}>Think Once.</h2>
        <h2 className="mb-6" aria-label="In Both Languages." style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #b7b5fe 0%, #F5C842 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>In Both Languages.</h2>
        {locale === 'zh' && <p className="mb-6" style={{ fontFamily: 'var(--font-cjk)', fontSize: '22px', color: 'rgba(183,181,254,0.5)' }}>一次思考，两种语言。</p>}
        <p className="mx-auto mb-12" style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(240,240,240,0.4)', maxWidth: '32rem' }}>{c.closing.sub}</p>
        <Link href={`/${locale}/consult`} className="btn btn-charter" style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.02em', padding: '1rem 2.5rem' }} aria-label="Start your child's journey — book a consultation">
          {c.closing.cta}
        </Link>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// PAGE EXPORT
// ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return localeParams()
}

export default async function AboutPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en
  return (
    <>
      <Hero c={c} locale={locale} />
      <TheNameSection c={c} locale={locale} />
      <WhatWeBelieve c={c} locale={locale} />
      <TheLoop locale={locale} c={c} />
      <WhoNavigatorsAre locale={locale} c={c} />
      <FamiliesWeServe c={c} locale={locale} />
      <ClosingStamp locale={locale} c={c} />
    </>
  )
}