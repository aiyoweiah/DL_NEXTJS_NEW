// app/[locale]/about/page.jsx
//
// /about — Bilingual EN + ZH.
// BilingualHeading already shows both languages simultaneously (unchanged).
// Body copy, section labels, and CTAs are locale-driven via COPY object.

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
      title:       'What Is DODO Learning? Bilingual Thinking Program for Chinese Families in Canada & the US',
      description:
        'DODO Learning is the live, Navigator-led bilingual thinking program for Chinese families in Canada and the US — trained on the full Read \u2192 Think \u2192 Speak \u2192 Write loop, measured by Lexile levels and the 6+1 Trait writing framework. Not just fluency. Thought.',
    },
    hero: {
      chip:          'Our Story',
      h1a:           'A child who\u00a0', h1em1: 'speaks', h1b: '\u00a0English',
      h1c:           'is not the same as a child',
      h1d:           'who\u00a0', h1em2: 'thinks', h1e: '\u00a0in it.',
      sub:           'Built for Chinese families in Canada and the US raising children in two languages. Most bilingual children learn English as a subject \u2014 they pass exams and sound fluent. But ask them to argue, to build, to write something original \u2014 and the language falls apart. Our founder saw this gap and built DODO to close it.',
      videoLabel:    'Watch: Why DODO Exists',
      videoDuration: '3 min',
    },
    name: {
      p1:       'DODO comes from a simple, powerful idea:\u00a0',
      p1strong: 'Do + Do.',
      p2:       "Learning isn\u2019t passive. It\u2019s not about absorbing \u2014 it\u2019s about doing. Reading is doing. Thinking is doing. Speaking is doing. Writing is doing.",
      p3:       'The double \u201cDo\u201d is also a nod to the iterative nature of mastery. You don\u2019t learn a language once. You learn it by doing, then doing again \u2014 each time deeper, each time more your own.',
    },
    beliefs: {
      sub:    'Every session follows the same three truths.',
      bodies: [
        "Fluency isn\u2019t about sounding right. It\u2019s about thinking clearly. We build the architecture of thought \u2014 in both languages.",
        'The best learning happens between people, not between a child and a screen. Every DODO session is a dialogue, not a lecture.',
        "We don\u2019t teach English by replacing Chinese. We teach children to move fluidly between two worlds of thought.",
      ],
    },
    loop: {
      sub:         'Every session follows the same cycle. Simple in structure. Profound in effect.',
      cta:         'Explore Methodology',
      programLink: 'See The 16-Week Program \u2192',
      descs: [
        'Encounter ideas worth thinking about. Not textbooks \u2014 real stories, real arguments, real questions.',
        "Process what you\u2019ve read. Form opinions. Make connections. This is where language becomes thinking.",
        "Articulate your ideas aloud. Defend them. Refine them. Speaking isn\u2019t output \u2014 it\u2019s processing.",
        'Commit your thinking to paper. Writing is the proof that a language truly belongs to you.',
      ],
    },
    navigators: {
      chipNot:        'Not teachers.',
      chipAre:        'Navigators.',
      p1pre:          "We don\u2019t call them teachers. We call them\u00a0",
      p1strong:       'Navigators',
      p1post:         ' \u2014 because they don\u2019t stand at the front and lecture. They sit beside your child and guide.',
      p2:             "A Navigator is the kind of person who asks questions they don\u2019t already know the answer to. Who gets genuinely curious about what a seven-year-old thinks about fairness.",
      p3:             "They\u2019re readers. They\u2019re thinkers. They care about language not because it\u2019s their job, but because it\u2019s how they make sense of everything.",
      navigatorsLink: 'Meet the Navigators \u2192',
    },
    families: {
      items: [
        { quote: '\u201cThat\u2019s us \u2014 two languages, one family.\u201d',      desc: 'You speak two languages at home and you want your child to feel equally powerful in both. Not just conversational \u2014 intellectually fluent.' },
        { quote: '\u201cWe move between worlds. So does our child.\u201d',            desc: "You\u2019ve moved countries \u2014 maybe more than once. Your child navigates cultures daily, and you want their English to match the complexity of their life." },
        { quote: '\u201cGood isn\u2019t enough. We want depth.\u201d',               desc: "Your child is already good at English. Maybe even great. But you sense there\u2019s a ceiling \u2014 and the current system isn\u2019t going to break through it." },
      ],
    },
    closing: {
      sub: 'Not a tagline. A philosophy. Every session, every conversation, every written word at DODO is built on this single truth: real bilingualism means thinking \u2014 not translating.',
      cta: "Start Your Child\u2019s Journey",
    },
  },

  zh: {
    meta: {
      title:       'DODO Learning\u662f\u4ec0\u4e48\uff1f\u9762\u5411\u52a0\u62ff\u5927\u548c\u7f8e\u56fd\u534e\u8bed\u5bb6\u5ead\u7684\u53cc\u8bed\u601d\u7ef4\u8bfe\u7a0b',
      description:
        'DODO Learning\u662f\u9762\u5411\u52a0\u62ff\u5927\u548c\u7f8e\u56fd\u534e\u8bed\u5bb6\u5ead\u7684\u5b9e\u65f6\u53cc\u8bed\u601d\u7ef4\u8bfe\u7a0b\u2014\u2014\u7531Navigator\u4e3b\u5bfc\uff0c\u8bad\u7ec3\u5b8c\u6574\u7684\u9605\u8bfb\u2192\u601d\u8003\u2192\u8868\u8fbe\u2192\u5199\u4f5c\u95ed\u73af\uff0c\u4ee5Lexile\u6d4b\u91cf\u548c6+1\u7279\u8d28\u5199\u4f5c\u6846\u67b6\u8861\u91cf\u3002\u4e0d\u4ec5\u4ec5\u662f\u6d41\u5229\u5ea6\uff0c\u800c\u662f\u601d\u7ef4\u672c\u8eab\u3002',
    },
    hero: {
      chip:          '\u6211\u4eec\u7684\u6545\u4e8b',
      h1a:           '\u4f1a\u00a0', h1em1: '\u8bf4', h1b: '\u00a0\u82f1\u8bed\u7684\u5b69\u5b50\uff0c',
      h1c:           '\u548c\u7528\u82f1\u8bed',
      h1d:           '', h1em2: '\u601d\u8003', h1e: '\u00a0\u7684\u5b69\u5b50\uff0c\u662f\u4e0d\u4e00\u6837\u7684\u3002',
      sub:           '\u4e13\u4e3a\u5728\u52a0\u62ff\u5927\u548c\u7f8e\u56fd\u7528\u4e24\u79cd\u8bed\u8a00\u517b\u80b2\u5b69\u5b50\u7684\u534e\u8bed\u5bb6\u5ead\u800c\u5efa\u3002\u5927\u591a\u6570\u53cc\u8bed\u5b69\u5b50\u628a\u82f1\u8bed\u5f53\u4f5c\u4e00\u95e8\u5b66\u79d1\u6765\u5b66\u3002\u4ed6\u4eec\u901a\u8fc7\u8003\u8bd5\uff0c\u542c\u8d77\u6765\u4e5f\u5f88\u6d41\u5229\u3002\u4f46\u5f53\u4f60\u8981\u6c42\u4ed6\u4eec\u53bb\u8bba\u8bc1\u3001\u53bb\u5efa\u6784\u3001\u5199\u51fa\u6709\u72ec\u521b\u6027\u7684\u4e1c\u897f\u2014\u2014\u8bed\u8a00\u5c31\u5d29\u4e86\u3002\u6211\u4eec\u7684\u521b\u59cb\u4eba\u770b\u5230\u4e86\u8fd9\u9053\u88c2\u7f1d\uff0c\u4e8e\u662f\u521b\u5efa\u4e86DODO\u6765\u5f25\u5408\u5b83\u3002',
      videoLabel:    '\u89c2\u770b\uff1aDODO\u4e3a\u4f55\u800c\u5b58\u5728',
      videoDuration: '3\u5206\u949f',
    },
    name: {
      p1:       'DODO\u6765\u81ea\u4e00\u4e2a\u7b80\u5355\u800c\u6709\u529b\u7684\u60f3\u6cd5\uff1a\u00a0',
      p1strong: 'Do + Do\uff08\u505a+\u518d\u505a\uff09\u3002',
      p2:       '\u5b66\u4e60\u4e0d\u662f\u88ab\u52a8\u7684\u3002\u5b83\u4e0d\u5173\u4e4e\u5438\u6536\u2014\u2014\u800c\u5173\u4e4e\u884c\u52a8\u3002\u9605\u8bfb\u662f\u884c\u52a8\u3002\u601d\u8003\u662f\u884c\u52a8\u3002\u8868\u8fbe\u662f\u884c\u52a8\u3002\u4e66\u5199\u662f\u884c\u52a8\u3002',
      p3:       '\u201cDo\u201d\u7684\u91cd\u590d\u4e5f\u662f\u5bf9\u7cbe\u901a\u672c\u8d28\u7684\u81f4\u656c\uff1a\u4f60\u4e0d\u662f\u5b66\u4e00\u6b21\u5c31\u4e60\u5f97\u4e86\u4e00\u95e8\u8bed\u8a00\u3002\u4f60\u662f\u901a\u8fc7\u4e00\u9057\u9057\u5730\u505a\u6765\u5b66\u4e60\u7684\u2014\u2014\u6bcf\u6b21\u90fd\u66f4\u6df1\u5165\uff0c\u6bcf\u6b21\u90fd\u66f4\u5c5e\u4e8e\u81ea\u5df1\u3002',
    },
    beliefs: {
      sub:    '\u6bcf\u8282\u8bfe\u90fd\u5efa\u7acb\u5728\u540c\u6837\u7684\u4e09\u4e2a\u771f\u7406\u4e4b\u4e0a\u3002',
      bodies: [
        '\u6d41\u5229\u5ea6\u4e0d\u662f\u542c\u8d77\u6765\u5bf9\u3002\u5b83\u662f\u60f3\u5f97\u6e05\u695a\u3002\u6211\u4eec\u6784\u5efa\u601d\u7ef4\u7684\u67b6\u6784\u2014\u2014\u5728\u4e24\u79cd\u8bed\u8a00\u4e2d\u540c\u65f6\u8fdb\u884c\u3002',
        '\u6700\u597d\u7684\u5b66\u4e60\u53d1\u751f\u5728\u4eba\u4e0e\u4eba\u4e4b\u95f4\uff0c\u800c\u975e\u5b69\u5b50\u4e0e\u5c4f\u5e55\u4e4b\u95f4\u3002\u6bcf\u8282DODO\u8bfe\u7a0b\u90fd\u662f\u5bf9\u8bdd\uff0c\u800c\u975e\u8bb2\u6570\u3002',
        '\u6211\u4eec\u4e0d\u662f\u901a\u8fc7\u53d6\u4ee3\u4e2d\u6587\u6765\u6559\u6388\u82f1\u8bed\u3002\u6211\u4eec\u6559\u5b69\u5b50\u5728\u4e24\u79cd\u601d\u7ef4\u4e16\u754c\u4e4b\u95f4\u81ea\u5982\u6d41\u52a8\u3002',
      ],
    },
    loop: {
      sub:         '\u6bcf\u8282\u8bfe\u9075\u5faa\u540c\u6837\u7684\u5faa\u73af\u3002\u7ed3\u6784\u7b80\u5355\uff0c\u6548\u679c\u6df1\u8fdc\u3002',
      cta:         '\u63a2\u7d22\u6559\u5b66\u65b9\u6cd5',
      programLink: '\u4e86\u89e316\u5468\u8bfe\u7a0b \u2192',
      descs: [
        '\u63a5\u89e6\u5024\u5f97\u601d\u8003\u7684\u60f3\u6cd5\u3002\u4e0d\u662f\u6559\u79d1\u4e66\u2014\u2014\u800c\u662f\u771f\u5b9e\u7684\u6545\u4e8b\u3001\u771f\u5b9e\u7684\u8bba\u70b9\u3001\u771f\u5b9e\u7684\u95ee\u9898\u3002',
        '\u5904\u7406\u4f60\u6240\u9605\u8bfb\u7684\u5185\u5bb9\u3002\u5f62\u6210\u89c2\u70b9\u3002\u5efa\u7acb\u8054\u7ed3\u3002\u8fd9\u662f\u8bed\u8a00\u53d8\u6210\u601d\u8003\u7684\u5730\u65b9\u3002',
        '\u5927\u58f0\u8868\u8fbe\u4f60\u7684\u60f3\u6cd5\u3002\u634d\u536b\u5b83\u4eec\u3002\u6253\u78e8\u5b83\u4eec\u3002\u8868\u8fbe\u4e0d\u662f\u8f93\u51fa\u2014\u2014\u800c\u662f\u52a0\u5de5\u3002',
        '\u5c06\u601d\u8003\u843d\u5b9e\u4e8e\u7eb8\u9762\u3002\u4e66\u5199\u662f\u8bed\u8a00\u771f\u6b63\u5c5e\u4e8e\u4f60\u7684\u8bc1\u660e\u3002',
      ],
    },
    navigators: {
      chipNot:        '\u4e0d\u662f\u8001\u5e08\u3002',
      chipAre:        'Navigators\u3002',
      p1pre:          '\u6211\u4eec\u4e0d\u79f0\u4ed6\u4eec\u4e3a\u8001\u5e08\u3002\u6211\u4eec\u79f0\u4ed6\u4eec\u4e3a\u00a0',
      p1strong:       'Navigators',
      p1post:         '\u2014\u2014\u56e0\u4e3a\u4ed6\u4eec\u4e0d\u7ad9\u5728\u524d\u9762\u8bb2\u6388\uff0c\u800c\u662f\u5750\u5728\u60a8\u5b69\u5b50\u8eab\u8fb9\uff0c\u5f15\u5bfc\u3002',
      p2:             'Navigator\u662f\u90a3\u79cd\u4f1a\u63d0\u51fa\u81ea\u5df1\u4e5f\u4e0d\u77e5\u9053\u7b54\u6848\u7684\u95ee\u9898\u7684\u4eba\u3002\u4f1a\u5bf9\u4e00\u4e2a\u4e03\u5c81\u5b69\u5b50\u5982\u4f55\u770b\u5f85\u516c\u5e73\u8fd9\u4ef6\u4e8b\u771f\u6b63\u611f\u5230\u597d\u5947\u7684\u4eba\u3002',
      p3:             '\u4ed6\u4eec\u662f\u8bfb\u8005\uff0c\u662f\u601d\u8003\u8005\u3002\u4ed6\u4eec\u5173\u5fc3\u8bed\u8a00\uff0c\u4e0d\u662f\u56e0\u4e3a\u90a3\u662f\u5de5\u4f5c\uff0c\u800c\u662f\u56e0\u4e3a\u90a3\u662f\u4ed6\u4eec\u7406\u89e3\u4e00\u5207\u7684\u65b9\u5f0f\u3002',
      navigatorsLink: '\u8ba4\u8bc6\u5bfc\u5e08\u56e2\u961f \u2192',
    },
    families: {
      items: [
        { quote: '\u201c\u8fd9\u5c31\u662f\u6211\u4eec\u2014\u2014\u4e24\u79cd\u8bed\u8a00\uff0c\u4e00\u4e2a\u5bb6\u5ead\u3002\u201d', desc: '\u60a8\u5728\u5bb6\u91cc\u4f7f\u7528\u4e24\u79cd\u8bed\u8a00\uff0c\u5e0c\u671b\u5b69\u5b50\u5728\u4e24\u79cd\u8bed\u8a00\u4e2d\u90fd\u540c\u6837\u6709\u529b\u91cf\u2014\u2014\u4e0d\u53ea\u662f\u65e5\u5e38\u5bf9\u8bdd\uff0c\u800c\u662f\u5728\u667a\u8bc6\u5c42\u9762\u771f\u6b63\u6d41\u7545\u3002' },
        { quote: '\u201c\u6211\u4eec\u5728\u4e16\u754c\u4e4b\u95f4\u7a7f\u884c\u3002\u6211\u4eec\u7684\u5b69\u5b50\u4e5f\u662f\u3002\u201d',    desc: '\u60a8\u66fe\u79fb\u5c45\u4ed6\u56fd\u2014\u2014\u4e5f\u8bb8\u4e0d\u6b62\u4e00\u6b21\u3002\u60a8\u7684\u5b69\u5b50\u6bcf\u5929\u5728\u6587\u5316\u4e4b\u95f4\u5207\u6362\uff0c\u60a8\u5e0c\u671b\u4ed6\u4eec\u7684\u82f1\u8bed\u80fd\u5339\u914d\u751f\u6d3b\u7684\u590d\u6742\u7a0b\u5ea6\u3002' },
        { quote: '\u201c\u591f\u597d\u8fd8\u4e0d\u591f\u3002\u6211\u4eec\u8981\u6df1\u5ea6\u3002\u201d',         desc: '\u60a8\u7684\u5b69\u5b50\u82f1\u8bed\u5df2\u7ecf\u4e0d\u9519\uff0c\u751a\u81f3\u5f88\u597d\u3002\u4f46\u60a8\u611f\u89c9\u5230\u6709\u4e00\u4e2a\u5929\u82b1\u677f\u2014\u2014\u800c\u73b0\u6709\u7684\u4f53\u7cfb\u65e0\u6cd5\u7a81\u7834\u5b83\u3002' },
      ],
    },
    closing: {
      sub: '\u8fd9\u4e0d\u662f\u4e00\u53e5\u53e3\u53f7\uff0c\u800c\u662f\u4e00\u79cd\u54f2\u5b66\u3002DODO\u7684\u6bcf\u8282\u8bfe\u3001\u6bcf\u6bb5\u5bf9\u8bdd\u3001\u6bcf\u4e2a\u4e66\u5199\u7684\u6587\u5b57\uff0c\u90fd\u5efa\u7acb\u5728\u8fd9\u4e00\u771f\u7406\u4e4b\u4e0a\uff1a\u771f\u6b63\u7684\u53cc\u8bed\u610f\u5473\u7740\u601d\u8003\u2014\u2014\u800c\u975e\u7ffb\u8bd1\u3002',
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
// STATIC DATA (non-text structural data stays universal)
// ─────────────────────────────────────────────────────────────
const BELIEFS_BASE = [
  { id: 'belief-1', num: '01', belief: 'Language is a thinking tool, not a performance skill.', beliefCn: '\u8bed\u8a00\u662f\u601d\u7ef4\u7684\u5de5\u5177\uff0c\u800c\u975e\u8868\u6f14\u7684\u6280\u80fd\u3002' },
  { id: 'belief-2', num: '02', belief: "Children don't need more content. They need better conversations.", beliefCn: '\u5b69\u5b50\u4eec\u9700\u8981\u7684\u4e0d\u662f\u66f4\u591a\u5185\u5bb9\uff0c\u800c\u662f\u66f4\u597d\u7684\u5bf9\u8bdd\u3002' },
  { id: 'belief-3', num: '03', belief: 'Bilingual means both. Not one at the cost of the other.', beliefCn: '\u53cc\u8bed\u610f\u5473\u7740\u4e24\u8005\u517c\u5f97\uff0c\u800c\u975e\u6b64\u6d88\u5f7c\u957f\u3002' },
]

const LOOP_STEPS_BASE = [
  { id: 'read',  step: 'Read',  stepCn: '\u9605\u8bfb' },
  { id: 'think', step: 'Think', stepCn: '\u601d\u8003' },
  { id: 'speak', step: 'Speak', stepCn: '\u8868\u8fbe' },
  { id: 'write', step: 'Write', stepCn: '\u4e66\u5199' },
]

const NAVIGATOR_TRAITS = [
  { trait: 'Curious',          traitZh: '\u597d\u5947',         symbol: '?' },
  { trait: 'Patient',          traitZh: '\u8010\u5fc3',         symbol: '~' },
  { trait: 'Bilingual Thinkers', traitZh: '\u53cc\u8bed\u601d\u8003\u8005', symbol: 'AB' },
  { trait: 'Empathetic',       traitZh: '\u5171\u60c5',         symbol: '\u2661' },
  { trait: 'Rigorous',         traitZh: '\u4e25\u8c28',         symbol: '\u25c8' },
]

const FAMILIES_BASE = [
  { id: 'family-1', title: 'The Bilingual Home',    titleCn: '\u53cc\u8bed\u5bb6\u5ead',        imgBg: 'linear-gradient(135deg, #142318 0%, #1e3526 60%, #142318 100%)' },
  { id: 'family-2', title: 'The Global Family',     titleCn: '\u56fd\u9645\u5316\u5bb6\u5ead',  imgBg: 'linear-gradient(135deg, #131c2e 0%, #1e2a40 60%, #131c2e 100%)' },
  { id: 'family-3', title: 'The Ambitious Learner', titleCn: '\u5fd7\u5411\u8fdc\u5927\u7684\u5b66\u4e60\u8005', imgBg: 'linear-gradient(135deg, #2a1218 0%, #3a1e24 60%, #2a1218 100%)' },
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
      className="relative overflow-hidden"
      aria-labelledby="about-hero-heading"
      style={{ backgroundColor: '#0E0E12', minHeight: '100dvh', display: 'flex', alignItems: 'center' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(183,181,254,0.05) 0%, transparent 50%)' }}
      />
      <div
        className="container-section relative z-10 w-full"
        style={{ paddingTop: 'calc(var(--nav-height) + 3.5rem)', paddingBottom: '5rem' }}
      >
        <div className="grid lg:grid-cols-5 gap-12 items-center">
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
                \u4f1a\u8bf4\u82f1\u8bed\u7684\u5b69\u5b50\uff0c\u548c\u7528\u82f1\u8bed\u601d\u8003\u7684\u5b69\u5b50\uff0c\u662f\u4e0d\u4e00\u6837\u7684\u3002
              </p>
            )}
            <p style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(240,240,240,0.5)', maxWidth: '32rem' }}>
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
        <div className="flex justify-center mt-16" aria-hidden="true">
          <svg
            width="20" height="20" viewBox="0 0 20 20" fill="none"
            style={{ color: 'rgba(183,181,254,0.3)', animation: 'bounce 2s infinite' }}
          >
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
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, #0E0E12 0%, #212830 40%, #212830 100%)' }}
      />
      <div className="container-section relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <BilingualHeading en="The Name" cn="\u540d\u5b57\u7684\u6545\u4e8b" light locale={locale} />
            <div className="mt-10 space-y-5" style={{ fontSize: '17px', lineHeight: 1.9, color: 'rgba(240,240,240,0.7)' }}>
              <p>{c.name.p1}<strong style={{ color: '#F0F0F0' }}>{c.name.p1strong}</strong></p>
              <p>{c.name.p2}</p>
              <p>{c.name.p3}</p>
            </div>
            {locale === 'zh' && (
              <p className="mt-6" style={{ fontFamily: 'var(--font-cjk)', fontSize: '15px', lineHeight: 1.8, color: 'rgba(183,181,254,0.5)' }}>
                DODO\uff0c\u6e90\u4e8e\u201c\u505a\u201d\u4e0e\u201c\u518d\u505a\u201d\u3002\u5b66\u4e60\u4e0d\u662f\u88ab\u52a8\u7684\u5438\u6536\uff0c\u800c\u662f\u4e3b\u52a8\u7684\u884c\u52a8\u4e0e\u53cd\u590d\u7684\u6df1\u5316\u3002
              </p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div
                className="flex items-center justify-center"
                style={{ width: 256, height: 256, borderRadius: '50%', border: '2px solid rgba(183,181,254,0.2)', position: 'relative' }}
              >
                <div
                  aria-hidden="true"
                  style={{ position: 'absolute', inset: '1rem', borderRadius: '50%', border: '1px solid rgba(183,181,254,0.1)' }}
                />
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

// ── WhatWeBelieve ─────────────────────────────────────────────
// Fix: body text was rendering twice — once inside the belief column
// (md:hidden) and once as a separate grid column (hidden md:block).
// At certain viewport widths both were visible simultaneously.
// Replaced with a single <p> that always renders. The flex-col mobile
// layout stacks it naturally; the 3-column grid places it in column 3
// on desktop. No duplication possible.
function WhatWeBelieve({ c, locale }) {
  return (
    <section className="section-light" aria-labelledby="beliefs-heading">
      <div className="container-section">
        <div className="mb-20 text-center">
          <BilingualHeading en="What We Believe" cn="\u6211\u4eec\u7684\u4fe1\u5ff5" center locale={locale} />
        </div>
        <div>
          {BELIEFS_BASE.map((item, i) => (
            <div
              key={item.id}
              className="py-8 md:py-12"
              style={{ borderBottom: i < BELIEFS_BASE.length - 1 ? '1px solid rgba(14,14,18,0.08)' : 'none' }}
              aria-label={`Belief ${item.num}: ${item.belief}`}
            >
              {/* flex-col on mobile, 3-col grid on md+ */}
              <div className="flex flex-col gap-4 md:grid md:grid-cols-[3rem_1fr_1fr] md:gap-8 md:items-start">

                {/* Col 1: icon */}
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.1)', color: '#b7b5fe' }}
                  aria-hidden="true"
                >
                  <BeliefIcon id={item.id} />
                </div>

                {/* Col 2: belief statement */}
                <div className="min-w-0">
                  <p style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.3, color: '#0E0E12' }}>
                    &ldquo;{item.belief}&rdquo;
                  </p>
                  {locale === 'zh' && (
                    <p className="mt-1" style={{ fontFamily: 'var(--font-cjk)', fontSize: '13px', color: '#5856cc' }}>
                      {item.beliefCn}
                    </p>
                  )}
                </div>

                {/* Col 3: body — single render, no duplication */}
                <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#2E3848' }}>
                  {c.beliefs.bodies[i]}
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── TheLoop ───────────────────────────────────────────────────
// Fix: adds /program link alongside existing /methodology link
function TheLoop({ locale, c }) {
  return (
    <section className="section-dark" aria-labelledby="loop-section-heading">
      <div className="container-section">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <BilingualHeading en="The Loop" cn="\u5b66\u4e60\u5faa\u73af" light locale={locale} />
          <p className="max-w-md" style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(240,240,240,0.4)' }}>
            {c.loop.sub}
          </p>
        </div>
        <div className="relative">
          <div
            aria-hidden="true"
            className="hidden lg:block absolute"
            style={{ top: '3.5rem', left: '12.5%', right: '12.5%', height: '1px', background: 'linear-gradient(to right, rgba(183,181,254,0) 0%, rgba(183,181,254,0.2) 50%, rgba(183,181,254,0) 100%)' }}
          />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4" aria-label="The Loop methodology">
            {LOOP_STEPS_BASE.map((item, i) => (
              <li key={item.id} className="text-center px-8 py-8">
                <div
                  className="flex items-center justify-center mx-auto mb-6 relative z-10"
                  style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.1)', border: '1px solid rgba(183,181,254,0.2)', color: '#b7b5fe' }}
                  aria-hidden="true"
                >
                  <LoopStepIcon id={item.id} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.01em', color: '#ffffff', marginBottom: '4px' }}>
                  {item.step}
                </h3>
                {locale === 'zh' && (
                  <p className="mb-4" style={{ fontFamily: 'var(--font-cjk)', fontSize: '14px', color: 'rgba(183,181,254,0.5)' }}>
                    {item.stepCn}
                  </p>
                )}
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(240,240,240,0.5)' }}>
                  {c.loop.descs[i]}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Links: methodology (existing) + program (new) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
          <Link
            href={`/${locale}/methodology`}
            className="inline-flex items-center gap-2"
            style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#b7b5fe', textDecoration: 'none' }}
          >
            {c.loop.cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href={`/${locale}/program`}
            className="inline-flex items-center gap-2"
            style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(183,181,254,0.55)', textDecoration: 'none' }}
          >
            {c.loop.programLink}
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── WhoNavigatorsAre ──────────────────────────────────────────
// Fix: adds navigators link after trait pills
function WhoNavigatorsAre({ locale, c }) {
  return (
    <section className="section-light" aria-labelledby="navigators-heading">
      <div className="container-section">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div
                className="rounded-3xl overflow-hidden"
                style={{ height: '520px' }}
                aria-label="A DODO Navigator in session"
              >
                <div
                  className="w-full h-full"
                  style={{ background: 'linear-gradient(135deg, #e8e7f8 0%, #d4d3f0 40%, #c0bfea 100%)' }}
                  aria-hidden="true"
                />
              </div>
              <div
                className="absolute rounded-2xl px-6 py-4"
                style={{ bottom: -24, right: -24, backgroundColor: '#b7b5fe' }}
                aria-hidden="true"
              >
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#0E0E12' }}>{c.navigators.chipNot}</p>
                <p style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(14,14,18,0.7)' }}>{c.navigators.chipAre}</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <BilingualHeading en="Who Navigators Are" cn="\u5173\u4e8e\u9886\u822a\u5458" locale={locale} />
            <div className="mt-8 space-y-5" style={{ fontSize: '16px', lineHeight: 1.85, color: '#2E3848' }}>
              <p>
                {c.navigators.p1pre}
                <strong style={{ color: '#0E0E12' }}>{c.navigators.p1strong}</strong>
                {c.navigators.p1post}
              </p>
              <p>{c.navigators.p2}</p>
              <p>{c.navigators.p3}</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-10" aria-label="Navigator traits">
              {NAVIGATOR_TRAITS.map((item) => (
                <span
                  key={item.trait}
                  className="inline-flex items-center gap-2 rounded-full"
                  style={{ padding: '10px 20px', backgroundColor: '#0E0E12', color: '#ffffff', fontSize: '13px', fontWeight: 500 }}
                >
                  <span aria-hidden="true" style={{ fontSize: '11px', color: '#b7b5fe' }}>{item.symbol}</span>
                  {locale === 'zh' ? item.traitZh : item.trait}
                </span>
              ))}
            </div>
            {/* Navigators link — new */}
            <div style={{ marginTop: '1.5rem' }}>
              <Link
                href={`/${locale}/navigators`}
                style={{ fontSize: '14px', fontWeight: 600, color: '#5856cc', textDecoration: 'none' }}
              >
                {c.navigators.navigatorsLink}
              </Link>
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
          <BilingualHeading en="The Families We Serve" cn="\u6211\u4eec\u670d\u52a1\u7684\u5bb6\u5ead" light center locale={locale} />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {FAMILIES_BASE.map((family, i) => (
            <article
              key={family.id}
              className="group relative rounded-3xl overflow-hidden transition-all duration-300"
              style={{ backgroundColor: '#212830', border: '1px solid rgba(255,255,255,0.05)' }}
              aria-label={`Family: ${family.title}`}
            >
              <div className="overflow-hidden" style={{ height: '13rem' }} aria-hidden="true">
                <div className="w-full h-full" style={{ background: family.imgBg }} />
              </div>
              <div className="p-8">
                <p className="mb-3" style={{ fontSize: '13px', fontWeight: 500, fontStyle: 'italic', color: '#F5C842' }}>
                  {c.families.items[i].quote}
                </p>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff' }}>{family.title}</h3>
                {locale === 'zh' && (
                  <p className="mb-4" style={{ fontFamily: 'var(--font-cjk)', fontSize: '13px', color: 'rgba(183,181,254,0.5)' }}>
                    {family.titleCn}
                  </p>
                )}
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'rgba(240,240,240,0.5)' }}>
                  {c.families.items[i].desc}
                </p>
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
        <div
          className="flex items-center justify-center mx-auto mb-10"
          style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.1)', border: '1px solid rgba(183,181,254,0.2)', color: '#b7b5fe' }}
          aria-hidden="true"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h2
          id="about-closing-heading"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '0.5rem' }}
        >
          Think Once.
        </h2>
        <h2
          className="mb-6"
          aria-label="In Both Languages."
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #b7b5fe 0%, #F5C842 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
        >
          In Both Languages.
        </h2>
        {locale === 'zh' && (
          <p className="mb-6" style={{ fontFamily: 'var(--font-cjk)', fontSize: '22px', color: 'rgba(183,181,254,0.5)' }}>
            \u4e00\u6b21\u601d\u8003\uff0c\u4e24\u79cd\u8bed\u8a00\u3002
          </p>
        )}
        <p className="mx-auto mb-12" style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(240,240,240,0.4)', maxWidth: '32rem' }}>
          {c.closing.sub}
        </p>
        <Link
          href={`/${locale}/consult`}
          className="btn btn-charter"
          style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.02em', padding: '1rem 2.5rem' }}
          aria-label="Start your child's journey — book a consultation"
        >
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