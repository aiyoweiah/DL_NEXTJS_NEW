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
      title: 'About DODO Learning \u2014 Think Once. In Both Languages.',
      description:
        'DODO Learning is a bilingual thinking program for globally mobile families who expect more than fluency. Navigator-led. Lexile-measured. The only live program that trains the full Read \u2192 Think \u2192 Speak \u2192 Write loop for Chinese-speaking diaspora families in Canada and the US.',
    },
    hero: {
      chip: 'Our Story',
      h1a: 'A child who\u00a0', h1em1: 'speaks', h1b: '\u00a0English', h1c: 'is not the same as a child', h1d: 'who\u00a0', h1em2: 'thinks', h1e: '\u00a0in it.',
      sub: 'Most bilingual children learn English as a subject. They pass exams and sound fluent. But ask them to argue, to build, to write something original \u2014 and the language falls apart. Our founder saw this gap and built DODO to close it.',
      videoLabel: 'Watch: Why DODO Exists', videoDuration: '3 min',
    },
    name: {
      p1: 'DODO comes from a simple, powerful idea:\u00a0',
      p1strong: 'Do + Do.',
      p2: "Learning isn\u2019t passive. It\u2019s not about absorbing \u2014 it\u2019s about doing. Reading is doing. Thinking is doing. Speaking is doing. Writing is doing.",
      p3: 'The double \u201cDo\u201d is also a nod to the iterative nature of mastery. You don\u2019t learn a language once. You learn it by doing, then doing again \u2014 each time deeper, each time more your own.',
    },
    beliefs: {
      sub: 'Every session follows the same three truths.',
      bodies: [
        "Fluency isn\u2019t about sounding right. It\u2019s about thinking clearly. We build the architecture of thought \u2014 in both languages.",
        'The best learning happens between people, not between a child and a screen. Every DODO session is a dialogue, not a lecture.',
        "We don\u2019t teach English by replacing Chinese. We teach children to move fluidly between two worlds of thought.",
      ],
    },
    loop: {
      sub: 'Every session follows the same cycle. Simple in structure. Profound in effect.',
      cta: 'Explore Methodology',
      descs: [
        'Encounter ideas worth thinking about. Not textbooks \u2014 real stories, real arguments, real questions.',
        "Process what you\u2019ve read. Form opinions. Make connections. This is where language becomes thinking.",
        "Articulate your ideas aloud. Defend them. Refine them. Speaking isn\u2019t output \u2014 it\u2019s processing.",
        'Commit your thinking to paper. Writing is the proof that a language truly belongs to you.',
      ],
    },
    navigators: {
      chipNot: 'Not teachers.',
      chipAre: 'Navigators.',
      p1pre: "We don\u2019t call them teachers. We call them\u00a0", p1strong: 'Navigators', p1post: ' \u2014 because they don\u2019t stand at the front and lecture. They sit beside your child and guide.',
      p2: "A Navigator is the kind of person who asks questions they don\u2019t already know the answer to. Who gets genuinely curious about what a seven-year-old thinks about fairness.",
      p3: "They\u2019re readers. They\u2019re thinkers. They care about language not because it\u2019s their job, but because it\u2019s how they make sense of everything.",
    },
    families: {
      items: [
        { quote: '\u201cThat\u2019s us \u2014 two languages, one family.\u201d', desc: 'You speak two languages at home and you want your child to feel equally powerful in both. Not just conversational \u2014 intellectually fluent.' },
        { quote: '\u201cWe move between worlds. So does our child.\u201d',    desc: "You\u2019ve moved countries \u2014 maybe more than once. Your child navigates cultures daily, and you want their English to match the complexity of their life." },
        { quote: '\u201cGood isn\u2019t enough. We want depth.\u201d',         desc: "Your child is already good at English. Maybe even great. But you sense there\u2019s a ceiling \u2014 and the current system isn\u2019t going to break through it." },
      ],
    },
    closing: {
      sub: 'Not a tagline. A philosophy. Every session, every conversation, every written word at DODO is built on this single truth: real bilingualism means thinking \u2014 not translating.',
      cta: "Start Your Child\u2019s Journey",
    },
  },

  zh: {
    meta: {
      title: '关于DODO Learning \u2014 Think Once. In Both Languages.',
      description:
        'DODO Learning是面向全球华语移民家庭的双语思维项目——不止于流利度。由Navigator主导，以Lexile衡量。唯一能训练完整阅读\u2192思考\u2192表达\u2192写作闭环的实时项目。',
    },
    hero: {
      chip: '我们的故事',
      h1a: '会\u00a0', h1em1: '说', h1b: '\u00a0英语的孩子，', h1c: '和用英语', h1d: '', h1em2: '思考', h1e: '\u00a0的孩子，是不一样的。',
      sub: '大多数双语孩子把英语当作一门学科来学。他们通过考试，听起来也很流利。但当你让他们去论证、去建构、去写出有独创性的东西——语言就垮了。我们的创始人看到了这道裂缝，于是创建了DODO来弥合它。',
      videoLabel: '观看：DODO为何而存在', videoDuration: '3分钟',
    },
    name: {
      p1: 'DODO来自一个简单而有力的想法：\u00a0',
      p1strong: 'Do + Do（做+再做）。',
      p2: '学习不是被动的。它不关乎吸收——而关乎行动。阅读是行动。思考是行动。表达是行动。书写是行动。',
      p3: '"Do"的重复也是对精通本质的致敬：你不是学一次就习得了一门语言。你是通过一遍遍地做来学习的——每次都更深入，每次都更属于自己。',
    },
    beliefs: {
      sub: '每节课都建立在同样的三个真理之上。',
      bodies: [
        '流利度不是听起来对。它是想得清楚。我们构建思维的架构——在两种语言中同时进行。',
        '最好的学习发生在人与人之间，而非孩子与屏幕之间。每节DODO课程都是对话，而非讲授。',
        '我们不是通过取代中文来教授英语。我们教孩子在两种思维世界之间自如流动。',
      ],
    },
    loop: {
      sub: '每节课遵循同样的循环。结构简单，效果深远。',
      cta: '探索教学方法',
      descs: [
        '接触值得思考的想法。不是教科书——而是真实的故事、真实的论点、真实的问题。',
        '处理你所读到的内容。形成观点。建立联结。这是语言变成思考的地方。',
        '大声表达你的想法。捍卫它们。打磨它们。表达不是输出——而是加工。',
        '将思考落实于纸面。书写是语言真正属于你的证明。',
      ],
    },
    navigators: {
      chipNot: '不是老师。',
      chipAre: 'Navigators。',
      p1pre: '我们不称他们为老师。我们称他们为\u00a0', p1strong: 'Navigators', p1post: '——因为他们不站在前面讲授，而是坐在您孩子身边，引导。',
      p2: 'Navigator是那种会提出自己也不知道答案的问题的人。会对一个七岁孩子如何看待公平这件事真正感到好奇的人。',
      p3: '他们是读者，是思考者。他们关心语言，不是因为那是工作，而是因为那是他们理解一切的方式。',
    },
    families: {
      items: [
        { quote: '\u201c这就是我们——两种语言，一个家庭。\u201d', desc: '您在家里使用两种语言，希望孩子在两种语言中都同样有力量——不只是日常对话，而是在智识层面真正流畅。' },
        { quote: '\u201c我们在世界之间穿行。我们的孩子也是。\u201d', desc: '您曾移居他国——也许不止一次。您的孩子每天在文化之间切换，您希望他们的英语能匹配生活的复杂程度。' },
        { quote: '\u201c够好还不够。我们要深度。\u201d', desc: '您的孩子英语已经不错，甚至很好。但您感觉到有一个天花板——而现有的体系无法突破它。' },
      ],
    },
    closing: {
      sub: '这不是一句口号，而是一种哲学。DODO的每节课、每段对话、每个书写的文字，都建立在这一真理之上：真正的双语意味着思考——而非翻译。',
      cta: '开始您孩子的旅程',
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
  { id: 'belief-1', num: '01', belief: 'Language is a thinking tool, not a performance skill.', beliefCn: '语言是思维的工具，而非表演的技能。' },
  { id: 'belief-2', num: '02', belief: "Children don't need more content. They need better conversations.", beliefCn: '孩子们需要的不是更多内容，而是更好的对话。' },
  { id: 'belief-3', num: '03', belief: 'Bilingual means both. Not one at the cost of the other.', beliefCn: '双语意味着两者兼得，而非此消彼长。' },
]

const LOOP_STEPS_BASE = [
  { id: 'read',  step: 'Read',  stepCn: '阅读' },
  { id: 'think', step: 'Think', stepCn: '思考' },
  { id: 'speak', step: 'Speak', stepCn: '表达' },
  { id: 'write', step: 'Write', stepCn: '书写' },
]

const NAVIGATOR_TRAITS = [
  { trait: 'Curious', traitZh: '好奇',         symbol: '?' },
  { trait: 'Patient', traitZh: '耐心',         symbol: '~' },
  { trait: 'Bilingual Thinkers', traitZh: '双语思考者', symbol: 'AB' },
  { trait: 'Empathetic', traitZh: '共情',      symbol: '\u2661' },
  { trait: 'Rigorous',   traitZh: '严谨',      symbol: '\u25c8' },
]

const FAMILIES_BASE = [
  { id: 'family-1', title: 'The Bilingual Home',   titleCn: '双语家庭',     imgBg: 'linear-gradient(135deg, #142318 0%, #1e3526 60%, #142318 100%)' },
  { id: 'family-2', title: 'The Global Family',    titleCn: '国际化家庭',   imgBg: 'linear-gradient(135deg, #131c2e 0%, #1e2a40 60%, #131c2e 100%)' },
  { id: 'family-3', title: 'The Ambitious Learner',titleCn: '志向远大的学习者', imgBg: 'linear-gradient(135deg, #2a1218 0%, #3a1e24 60%, #2a1218 100%)' },
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
  if (id === 'read') return <svg {...base} aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
  if (id === 'think') return <svg {...base} aria-hidden="true"><path d="M9.5 2a4.5 4.5 0 0 0 0 9M14.5 2a4.5 4.5 0 0 1 0 9" /><path d="M5 10a4 4 0 0 0 4 4v6M19 10a4 4 0 0 1-4 4v6M9 20h6" /></svg>
  if (id === 'speak') return <svg {...base} aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
  return <svg {...base} aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
}

// ─────────────────────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────────────────────
function Hero({ c, locale }) {
  return (
    <section className="relative overflow-hidden" aria-labelledby="about-hero-heading"
      style={{ backgroundColor: '#0E0E12', minHeight: '100dvh', display: 'flex', alignItems: 'center' }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(183,181,254,0.05) 0%, transparent 50%)' }} />
      <div className="container-section relative z-10 w-full"
        style={{ paddingTop: 'calc(var(--nav-height) + 3.5rem)', paddingBottom: '5rem' }}>
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 mb-10 rounded-full"
              style={{ padding: '6px 16px', border: '1px solid rgba(183,181,254,0.2)', backgroundColor: 'rgba(183,181,254,0.05)' }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#b7b5fe' }} aria-hidden="true" />
              <span style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#b7b5fe' }}>{c.hero.chip}</span>
            </div>
            <h1 id="about-hero-heading" className="mb-6"
              style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.02em', color: '#F0F0F0' }}>
              {c.hero.h1a}<em className="not-italic" style={{ fontWeight: 600, color: '#b7b5fe' }}>{c.hero.h1em1}</em>{c.hero.h1b}<br />
              {c.hero.h1c}<br />
              {c.hero.h1d}<em className="not-italic" style={{ fontWeight: 600, color: '#F5C842' }}>{c.hero.h1em2}</em>{c.hero.h1e}
            </h1>
            <p className="mb-8" style={{ fontFamily: 'var(--font-cjk)', fontSize: '20px', color: 'rgba(183,181,254,0.5)' }}>
              {locale === 'zh' ? '会说英语的孩子，和用英语思考的孩子，是不一样的。' : null}
            </p>
            <p style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(240,240,240,0.5)', maxWidth: '32rem' }}>{c.hero.sub}</p>
          </div>
          <div className="lg:col-span-2">
            <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '3/4' }} aria-label={c.hero.videoLabel}>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #161c28 0%, #2E3848 50%, #1a2030 100%)' }} aria-hidden="true" />
              <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
                <div className="flex items-center justify-center"
                  style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: '#F5C842', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M11 8l14 8-14 8V8z" fill="#0E0E12" /></svg>
                </div>
                <p className="mt-4" style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{c.hero.videoLabel}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{c.hero.videoDuration}</p>
              </div>
              <div className="absolute inset-0 rounded-3xl" style={{ border: '1px solid rgba(183,181,254,0.1)' }} aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-16" aria-hidden="true">
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
      <div aria-hidden="true" className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, #0E0E12 0%, #212830 40%, #212830 100%)' }} />
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
                DODO，源于"做"与"再做"。学习不是被动的吸收，而是主动的行动与反复的深化。
              </p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="flex items-center justify-center"
                style={{ width: 256, height: 256, borderRadius: '50%', border: '2px solid rgba(183,181,254,0.2)', position: 'relative' }}>
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
        </div>
        <div>
          {BELIEFS_BASE.map((item, i) => (
            <div key={item.id}
              className="py-8 md:py-12"
              style={{ borderBottom: i < BELIEFS_BASE.length - 1 ? '1px solid rgba(14,14,18,0.08)' : 'none' }}
              aria-label={`Belief ${item.num}: ${item.belief}`}>

              {/* Mobile: flex. md+: 3-col grid [icon | statement | body] */}
              <div className="flex items-start gap-4 md:grid md:grid-cols-[3rem_1fr_1fr] md:gap-8">

                {/* Icon (visible on all sizes) */}
                <div className="flex items-center justify-center shrink-0"
                  style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.1)', color: '#b7b5fe' }} aria-hidden="true">
                  <BeliefIcon id={item.id} />
                </div>

                {/* Belief statement */}
                <div className="flex-1 md:flex-none min-w-0">
                  <p style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.3, color: '#0E0E12' }}>&ldquo;{item.belief}&rdquo;</p>
                  {locale === 'zh' && (
                    <p className="mt-1" style={{ fontFamily: 'var(--font-cjk)', fontSize: '13px', color: '#5856cc' }}>{item.beliefCn}</p>
                  )}
                  {/* Body text stacks below on mobile */}
                  <p className="mt-3 md:hidden" style={{ fontSize: '15px', lineHeight: 1.8, color: '#2E3848' }}>{c.beliefs.bodies[i]}</p>
                </div>

                {/* Body text — desktop separate column */}
                <p className="hidden md:block" style={{ fontSize: '15px', lineHeight: 1.8, color: '#2E3848' }}>{c.beliefs.bodies[i]}</p>

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
          <div aria-hidden="true" className="hidden lg:block absolute"
            style={{ top: '3.5rem', left: '12.5%', right: '12.5%', height: '1px', background: 'linear-gradient(to right, rgba(183,181,254,0) 0%, rgba(183,181,254,0.2) 50%, rgba(183,181,254,0) 100%)' }} />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4" aria-label="The Loop methodology">
            {LOOP_STEPS_BASE.map((item, i) => (
              <li key={item.id} className="text-center px-8 py-8">
                <div className="flex items-center justify-center mx-auto mb-6 relative z-10"
                  style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.1)', border: '1px solid rgba(183,181,254,0.2)', color: '#b7b5fe' }} aria-hidden="true">
                  <LoopStepIcon id={item.id} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.01em', color: '#ffffff', marginBottom: '4px' }}>{item.step}</h3>
                {locale === 'zh' && (
                  <p className="mb-4" style={{ fontFamily: 'var(--font-cjk)', fontSize: '14px', color: 'rgba(183,181,254,0.5)' }}>{item.stepCn}</p>
                )}
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(240,240,240,0.5)' }}>{c.loop.descs[i]}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="text-center mt-12">
          <Link href={`/${locale}/methodology`} className="inline-flex items-center gap-2"
            style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#b7b5fe', textDecoration: 'none' }}>
            {c.loop.cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
                <span key={item.trait} className="inline-flex items-center gap-2 rounded-full"
                  style={{ padding: '10px 20px', backgroundColor: '#0E0E12', color: '#ffffff', fontSize: '13px', fontWeight: 500 }}>
                  <span aria-hidden="true" style={{ fontSize: '11px', color: '#b7b5fe' }}>{item.symbol}</span>
                  {locale === 'zh' ? item.traitZh : item.trait}
                </span>
              ))}
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
            <article key={family.id} className="group relative rounded-3xl overflow-hidden transition-all duration-300"
              style={{ backgroundColor: '#212830', border: '1px solid rgba(255,255,255,0.05)' }}
              aria-label={`Family: ${family.title}`}>
              <div className="overflow-hidden" style={{ height: '13rem' }} aria-hidden="true">
                <div className="w-full h-full" style={{ background: family.imgBg }} />
              </div>
              <div className="p-8">
                <p className="mb-3" style={{ fontSize: '13px', fontWeight: 500, fontStyle: 'italic', color: '#F5C842' }}>{c.families.items[i].quote}</p>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff' }}>{family.title}</h3>
                {locale === 'zh' && (
                  <p className="mb-4" style={{ fontFamily: 'var(--font-cjk)', fontSize: '13px', color: 'rgba(183,181,254,0.5)' }}>{family.titleCn}</p>
                )}
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
        <div className="flex items-center justify-center mx-auto mb-10"
          style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.1)', border: '1px solid rgba(183,181,254,0.2)', color: '#b7b5fe' }} aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h2 id="about-closing-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '0.5rem' }}>
          Think Once.
        </h2>
        <h2 className="mb-6" aria-label="In Both Languages."
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #b7b5fe 0%, #F5C842 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          In Both Languages.
        </h2>
        {locale === 'zh' && (
          <p className="mb-6" style={{ fontFamily: 'var(--font-cjk)', fontSize: '22px', color: 'rgba(183,181,254,0.5)' }}>
            一次思考，两种语言。
          </p>
        )}
        <p className="mx-auto mb-12" style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(240,240,240,0.4)', maxWidth: '32rem' }}>{c.closing.sub}</p>
        <Link href={`/${locale}/consult`} className="btn btn-charter"
          style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.02em', padding: '1rem 2.5rem' }}
          aria-label="Start your child's journey — book a consultation">
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