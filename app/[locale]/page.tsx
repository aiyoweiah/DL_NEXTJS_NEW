// app/[locale]/page.tsx
//
// Homepage. SEO priority: Highest.
// Bilingual: all copy switches via HOMEPAGE_COPY[locale].
//
// Sections:
//   1.  Hero              — LIGHT  (#F5F5FF)
//   2.  ProofStrip        — DARK   (#212830)
//   3.  NavigatorIntro    — WHITE  (#ffffff) [NEW: credentials]
//   4.  LoopSection       — DARK   (#212830)
//   5.  ConfidenceSection — LIGHT  (#F5F5FF)
//   6.  ParentTrustSection— DARK   (#212830)
//   7.  ClosingSection    — LIGHT  (#F5F5FF) [NEW: rendered]
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
// BILINGUAL COPY — UPDATED APRIL 12, 2026
// Aligned to DODO Learning Master Content & Brand Prompt v2
// Integrates: 100+ families, Navigator credentials, 8/10 repeat rate, 1-on-1 emphasis
// ─────────────────────────────────────────────────────────────
const HOMEPAGE_COPY: Record<string, any> = {
  en: {
    meta: {
      title:       'DODO Learning — Bilingual Thinking Program for Chinese Families in Canada & the US',
      description:
        'The live, Navigator-led bilingual thinking program that trains the full Read → Think → Speak → Write loop — for Chinese families in Canada and the US. One grade level of reading growth in 16 weeks, measured by Lexile. 1-on-1 sessions only.',
    },
    hero: {
      eyebrow:        'For Chinese Families in Canada & the US',
      eyebrow2:       'Founding Family Program',
      h1:             ['Your child thinks in two languages.\u00a0', 'We train them to think in both.'],
      h1Chinese:      '',
      differentiator: '',
      consultHook:
        'The Loop — Read → Think → Speak → Write — runs every single session, live with a Navigator who knows your child\'s voice, pace, and gaps. In 16 weeks. Lexile-measured. One grade level of reading growth is the floor, not the dream.',
      cta1:      'Book Your Consultation',
      cta2:      'See The 16-Week Program',
      trustLine: 'Lexile-measured progress · 6+1 Trait writing framework · 1-on-1 sessions with credentialed Navigators',
    },
    proof: [
      { id: 'families', number: '100+',   unit: 'families',                 label: 'served since launch — real Lexile growth, real families' },
      { id: 'lexile',   number: '1',      unit: 'grade level',              label: 'average reading growth in 16 weeks, measured by Lexile' },
      { id: 'writing',  number: '2\u00d7',unit: 'writing score improvement', label: 'average 6+1 Trait score gain from entry to exit assessment' },
      { id: 'repeat',   number: '8/10',   unit: 'students',                 label: 'continue after Phase 1 — parents see the growth and enroll again' },
    ],
    navigatorIntro: {
      eyebrow: 'Meet Your Navigator',
      heading: 'Not a tutor. Not a teacher. A specialist with a proven track record.',
      body0:
        'Every DODO Navigator is a credentialed educator with professional experience in composition, literature, and academic writing. Many come from top 50 universities. All have published work, teaching portfolios, or technical expertise in language and thinking.',
      body1:
        'This isn\'t an after-school tutoring center with high school helpers. This is 1-on-1 instruction from someone whose life\'s work is language, writing, and reading—paired with your child, one family at a time.',
      body2:
        'They know classical literature. They understand the thinking that precedes writing. They hear the gap in your child\'s spoken reasoning and know exactly which text, which question, which routine will close it.',
      cta1:   'Learn Navigator Philosophy',
      cta2:   'See Full Bios',
      imgAlt: 'A Navigator and student sit at a table, text open between them, mid-discussion about a passage',
    },
    loop: {
      eyebrow: 'The Methodology',
      heading: 'The Loop',
      body:    'Every 90-minute session. Every week. Always in this order: Read → Think → Speak → Write. This isn\'t a framework we teach about. It\'s what happens, live, every single time.',
      cta:     'Read the full methodology →',
      steps: [
        { id: 'read',  number: '01', label: 'Read',  description: 'Students read texts carefully chosen at or just above their current Lexile level. Classical literature — Alice, Poe, Treasure Island — not simplified versions.' },
        { id: 'think', number: '02', label: 'Think', description: 'Before speaking, students form a position. Using Project Zero thinking routines, they learn to ask better questions before they answer them.' },
        { id: 'speak', number: '03', label: 'Speak', description: 'Students articulate their thinking in a live dialogue with their Navigator. Socratic. Precision in speech comes before precision in writing.' },
        { id: 'write', number: '04', label: 'Write', description: 'Students produce written work assessed with the 6+1 Trait rubric: Ideas, Organization, Voice, Word Choice, Sentence Fluency, Conventions, Presentation. Growth is visible and measurable.' },
      ],
    },
    confidence: {
      eyebrow: 'How It Works',
      heading: 'Measured progress. From day one.',
      body:    'We don\'t promise fluency. We deliver a grade level of literacy growth in 16 weeks, measured by Lexile, shown in writing scores. Every single claim we make, we can prove.',
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
          heading:   'Your Navigator owns the full 16 weeks.',
          body:      'Every session runs The Loop in order: Read. Think. Speak. Write. Your child\'s Navigator tracks their Lexile progress week by week, adjusts text difficulty, and knows exactly when they\'re ready to move forward. Nothing is guessed. Everything is measured.',
          linkHref:  '/methodology',
          linkLabel: 'Understand The Loop',
        },
        {
          id:        'results',
          eyebrow:   'After 16 Weeks',
          heading:   'We show you the numbers.',
          body:      'Every student receives an exit Lexile assessment and a re-evaluated 6+1 Trait writing score. You see the before. You see the after. Then you decide what comes next.',
          linkHref:  '/results',
          linkLabel: 'View student results',
        },
      ],
    },
    trust: {
      eyebrow:    'Student Results',
      heading1:   'The numbers speak first.',
      heading2:   'Then the parents.',
      viewAll:    'View all results →',
      weeksLabel: 'weeks',
      results: [
        { id: 'result-1', student: 'Student A', detail: 'Grade 5 · Vancouver',              start: 620, end: 820, weeks: 16, trait: 'Voice: 2 → 4',       quote: 'She started raising her hand in class by week eight. By week twelve she was leading the discussion.',                        source: 'Parent, Vancouver' },
        { id: 'result-2', student: 'Student B', detail: 'Grade 6 · Markham',                start: 540, end: 720, weeks: 16, trait: 'Organization: 2 → 5', quote: 'His teacher told us his writing had transformed. The 6+1 scores made it easy to see exactly what changed.',                source: 'Parent, Markham' },
        { id: 'result-3', student: 'Student C', detail: 'Grade 7 · San Francisco Bay Area', start: 710, end: 940, weeks: 16, trait: 'Ideas: 3 → 5',        quote: 'She went from dreading writing assignments to submitting them early. The Navigator knew exactly where she was stuck.',      source: 'Parent, Bay Area' },
      ],
    },
    closing: {
      eyebrow: 'Founding Family Program',
      heading: 'Ready to start?',
      body:    'The diagnostic consultation is where we find out exactly where your child is — not where their school says they are. We measure their Lexile level, identify the specific gap between what they can decode and what they can think through, and map out the 16 weeks ahead. Founding Family Program spots are still available. The Lexile assessment is the first step.',
      subheading: 'How to Get Started',
      steps: [
        { id: 'step-1', number: '01', label: 'Book Your Consultation', description: 'Schedule a 20-minute call with a DODO advisor. We ask about your child\'s reading experience, school context, and what you\'ve noticed at home.' },
        { id: 'step-2', number: '02', label: 'Complete the Lexile Assessment', description: 'Your child takes our reading assessment (online, 45 minutes). We measure their actual independent reading level, not their grade.' },
        { id: 'step-3', number: '03', label: 'Receive Your Program Design', description: 'We show you the baseline Lexile, the gap, and the exact 16-week pathway. You\'ll know the texts, the frequency, the timeline, and the Navigator.' },
        { id: 'step-4', number: '04', label: 'Enroll & Begin Week 1', description: 'Founding Family families get priority Navigator assignment. First session: your Navigator sits with your child, texts in hand, ready to listen.' },
      ],
      cta1:    'Book Your Consultation',
      cta2:    'Questions? See Our FAQ',
      tagline: 'Think Once. In Both Languages.',
    },
  },

  zh: {
    meta: {
      title:       'DODO Learning — 面向加拿大和美国华语家庭的双语思维课程',
      description:
        '由导师实时主导的双语思维课程，训练完整的 阅读→思考→表达→写作 闭环。面向加拿大和美国的华语家庭，16周内提升一个年级的阅读水平，以Lexile评测。1对1课程。',
    },
    hero: {
      eyebrow:        '面向加拿大和美国的华语家庭',
      eyebrow2:       '创始家庭计划',
      h1:             ['孩子已经会思考。\u00a0', '我们训练他用两种语言思考。'],
      h1Chinese:      '',
      differentiator: '',
      consultHook:
        '闭环——阅读→思考→表达→写作——每堂课都在进行，和一位懂孩子的节奏、知道他的差距的导师一起。16周。用Lexile测量。一个年级的进步是起点，不是目标。',
      cta1:      '预约诊断通话',
      cta2:      '了解16周课程',
      trustLine: 'Lexile测量进度 · 6+1特质写作框架 · 专业导师的1对1课程',
    },
    proof: [
      { id: 'families', number: '100+',   unit: '个家庭',                   label: '自创办以来的真实学生——真实的Lexile增长，真实的家庭故事' },
      { id: 'lexile',   number: '1',      unit: '个年级',                   label: '16周内Lexile测量的平均阅读增长' },
      { id: 'writing',  number: '2\u00d7',unit: '写作评分提升',              label: '入学至结课6+1特质评分的平均增长倍数' },
      { id: 'repeat',   number: '8/10',   unit: '的学生',                   label: '完成第一阶段后继续报名——家长看到进步，决定继续' },
    ],
    navigatorIntro: {
      eyebrow: '认识导师',
      heading: '不是补习老师。不是学校老师。是有实绩的专家。',
      body0:
        'DODO的每位导师都是有证的教育工作者，拥有写作、文学和学术写作的专业经验。很多来自全球顶尖50所大学。所有导师都有出版作品、教学作品集，或在语言和思维领域的技术专长。',
      body1:
        '这不是一个放学后的补习中心，由高中生帮手组成。这是来自终身从事语言、写作和阅读工作的专家的1对1教学——和你的孩子配对，一个家庭一个导师。',
      body2:
        '他们熟悉古典文学。理解思考如何先于写作而产生。能听出孩子口头推理中的差距，精确知道哪篇文本、哪个问题、哪个思维方法能弥合这个差距。',
      cta1:   '了解导师理念',
      cta2:   '查看导师简历',
      imgAlt: '一位导师和学生坐在桌前，文本在他们之间打开，正在讨论一个段落',
    },
    loop: {
      eyebrow: '教学方法',
      heading: 'The Loop',
      body:    '每堂课90分钟。每周一次。顺序永远不变：阅读→思考→表达→写作。这不是我们讲授的框架。这是每次都在发生的事。',
      cta:     '阅读完整教学方法 →',
      steps: [
        { id: 'read',  number: '01', label: 'Read',  description: '学生阅读精心挑选、处于或略高于其当前Lexile水平的文本。古典文学——爱丽丝、爱伦·坡、宝岛——而不是简化版本。' },
        { id: 'think', number: '02', label: 'Think', description: '开口之前，学生先形成自己的想法。用哈佛Project Zero思考方法，他们学会在回答问题前提出更好的问题。' },
        { id: 'speak', number: '03', label: 'Speak', description: '学生和导师进行实时对话，表达自己的思考。这是苏格拉底式的互动。口头表达的精准性先于书面表达。' },
        { id: 'write', number: '04', label: 'Write', description: '学生完成写作，用6+1特质框架评估：想法、组织、声音、措辞、句子流畅性、规范、呈现。进步看得见、数得出。' },
      ],
    },
    confidence: {
      eyebrow: '如何运作',
      heading: '从第一天开始，进步看得见。',
      body:    '我们不承诺流利度。我们交付16周内提升一个年级的读写能力，用Lexile测量，在写作评分中体现。我们说的每一个数字，都是能证明的。',
      pillars: [
        {
          id:        'assessment',
          eyebrow:   '开始之前',
          heading:   '我们确切地知道孩子现在在哪里。',
          body:      '不是学校成绩单说的位置。第一堂课之前，每个学生都会做Lexile阅读评估和6+1特质写作基准评估。我们根据数据开方，而不是猜测。',
          linkHref:  '/program',
          linkLabel: '了解评估如何进行',
        },
        {
          id:        'loop',
          eyebrow:   '课程期间',
          heading:   '导师拥有整个16周。',
          body:      '每堂课都完整进行The Loop：阅读。思考。表达。写作。导师逐周追踪孩子的Lexile进度，调整文本难度，精确知道孩子何时准备好向前迈进。没有猜测。一切都有测量。',
          linkHref:  '/methodology',
          linkLabel: '理解The Loop',
        },
        {
          id:        'results',
          eyebrow:   '16周后',
          heading:   '我们展示数字。',
          body:      '每个学生都会获得结课Lexile评估和重新评估的6+1特质写作评分。你看到之前的样子。你看到之后的样子。然后你决定下一步。',
          linkHref:  '/results',
          linkLabel: '查看学生成果',
        },
      ],
    },
    trust: {
      eyebrow:    '学生成果',
      heading1:   '数字先说话。',
      heading2:   '然后是家长说。',
      viewAll:    '查看全部成果 →',
      weeksLabel: '周',
      results: [
        { id: 'result-1', student: '学生A', detail: '五年级 · 温哥华',                start: 620, end: 820, weeks: 16, trait: '声音: 2 → 4',     quote: '到第八周她开始在班上主动举手。第十二周时，她已经在引领班级讨论了。',                        source: '家长，温哥华' },
        { id: 'result-2', student: '学生B', detail: '六年级 · 万锦市',                start: 540, end: 720, weeks: 16, trait: '组织: 2 → 5',   quote: '孩子老师跟我们说他的写作彻底转变了。6+1评分让我们清楚看到具体改变了什么。',                source: '家长，万锦市' },
        { id: 'result-3', student: '学生C', detail: '七年级 · 旧金山湾区',          start: 710, end: 940, weeks: 16, trait: '想法: 3 → 5',   quote: '她从害怕写作任务，到主动提前交卷。导师准确知道她卡在哪里。',      source: '家长，湾区' },
      ],
    },
    closing: {
      eyebrow: '创始家庭计划',
      heading: '准备好开始了吗？',
      body:    '诊断通话是我们确切了解孩子在哪里的时刻——不是学校说的位置。我们测Lexile水平，找出具体差距，规划接下来的16周。创始家庭名额还在开放。Lexile评估是第一步。',
      subheading: '如何开始',
      steps: [
        { id: 'step-1', number: '01', label: '预约诊断通话', description: '和DODO顾问预约20分钟通话。我们会询问孩子的阅读经历、学校背景，以及你在家里的观察。' },
        { id: 'step-2', number: '02', label: '完成Lexile评估', description: '孩子进行我们的阅读评估（在线，45分钟）。我们测量的是他的真实独立阅读水平，不是学校年级。' },
        { id: 'step-3', number: '03', label: '收到课程规划', description: '我们展示基准Lexile、差距，和确切的16周路线。你会知道文本、频率、时间表，和哪位导师。' },
        { id: 'step-4', number: '04', label: '报名并开始第一周', description: '创始家庭学员获得导师优先分配。第一堂课：你的导师和孩子坐在一起，文本在手，准备倾听。' },
      ],
      cta1:    '预约诊断通话',
      cta2:    '有问题？查看常见问答',
      tagline: 'Think Once. In Both Languages.',
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// SCHEMA MARKUP — LD+JSON
// ═══════════════════════════════════════════════════════════════
function SchemaMarkup() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'DODO Learning',
    description:
      'Bilingual thinking program for children ages 6–12. Navigator-led 1-on-1 sessions using Read → Think → Speak → Write methodology.',
    url: 'https://dodolearning.com',
    logo: 'https://dodolearning.com/logo.svg',
    areaServed: [
      {
        '@type': 'State',
        name: 'California',
        url: 'https://dodolearning.com/cities/san-francisco-bay-area',
      },
      {
        '@type': 'State',
        name: 'Ontario',
        url: 'https://dodolearning.com/cities/markham',
      },
      {
        '@type': 'State',
        name: 'British Columbia',
        url: 'https://dodolearning.com/cities/vancouver',
      },
    ],
    priceRange: '$$',
    serviceType: 'Educational Services',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '120',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
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
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium" style={{ color: '#5856cc' }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F5C842' }} aria-hidden="true" />
              {c.hero.eyebrow2}
            </span>
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
        <h2 id="proof-heading" className="sr-only">Student Progress & Program Proof</h2>
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
// SECTION 3 — NAVIGATOR INTRO [NEW]
// ═══════════════════════════════════════════════════════════════
function NavigatorIntro({ locale, c }) {
  return (
    <section className="section-white" aria-labelledby="navigator-intro-heading">
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <article className="max-w-xl order-2 lg:order-1">
            <p className="eyebrow mb-4" style={{ color: '#5856cc' }}>{c.navigatorIntro.eyebrow}</p>
            <h2 id="navigator-intro-heading" className="mb-6" style={{ color: '#212830' }}>{c.navigatorIntro.heading}</h2>

            <p className="text-base md:text-lg leading-relaxed mb-5" style={{ color: '#3D4452' }}>{c.navigatorIntro.body0}</p>
            <p className="text-base md:text-lg leading-relaxed mb-5" style={{ color: '#3D4452' }}>{c.navigatorIntro.body1}</p>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: '#3D4452' }}>{c.navigatorIntro.body2}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/methodology`} className="btn btn-ghost">
                {c.navigatorIntro.cta1}
              </Link>
              <Link href={`/${locale}/navigators`} className="btn btn-ghost">
                {c.navigatorIntro.cta2}
              </Link>
            </div>
          </article>

          {/* Image column */}
          <div className="relative order-1 lg:order-2" style={{ aspectRatio: '4/3' }}>
            <img
              src="/navigator-student-discussion.jpeg"
              alt={c.navigatorIntro.imgAlt}
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
// SECTION 7 — CLOSING SECTION [NEW - RENDERED]
// ═══════════════════════════════════════════════════════════════
function ClosingSection({ locale, c }) {
  return (
    <section className="section-light" aria-labelledby="closing-heading">
      <div className="container-section">
        {/* CTA Block */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <p className="eyebrow mb-4" style={{ color: '#5856cc' }}>{c.closing.eyebrow}</p>
          <h2 id="closing-heading" className="mb-6" style={{ color: '#212830' }}>{c.closing.heading}</h2>
          <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: '#3D4452', maxWidth: '42rem', margin: '0 auto 2rem' }}>{c.closing.body}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href={`/${locale}/consult`} className="btn btn-gilt">
              {c.closing.cta1}
            </Link>
            <Link href={`/${locale}/faq`} className="btn btn-ghost">
              {c.closing.cta2}
            </Link>
          </div>

          <p className="text-sm font-medium" style={{ color: '#5856cc' }}>{c.closing.tagline}</p>
        </div>

        {/* How to Get Started */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12" style={{ color: '#212830' }}>{c.closing.subheading}</h3>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.closing.steps.map((step, index) => (
              <li key={step.id} className="relative">
                <div className="card p-6 h-full flex flex-col gap-4" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e3ff' }}>
                  <div>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm" style={{ backgroundColor: '#b7b5fe', color: '#ffffff' }}>
                      {step.number}
                    </span>
                  </div>
                  <h4 className="text-base font-bold" style={{ color: '#212830' }}>{step.label}</h4>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: '#3D4452' }}>{step.description}</p>
                </div>
                {index < c.closing.steps.length - 1 && (
                  <div
                    className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 items-center justify-center w-6 h-6 rounded-full"
                    style={{ backgroundColor: '#b7b5fe', color: '#ffffff', zIndex: 10, transform: 'translate(12px, -50%)' }}
                    aria-hidden="true"
                  >
                    →
                  </div>
                )}
              </li>
            ))}
          </ol>
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
      <SchemaMarkup />
      <Hero locale={locale} c={c} />
      <ProofStrip c={c} />
      <NavigatorIntro locale={locale} c={c} />
      <LoopSection locale={locale} c={c} />
      <ConfidenceSection locale={locale} c={c} />
      <ParentTrustSection locale={locale} c={c} />
      <ClosingSection locale={locale} c={c} />
    </>
  )
}