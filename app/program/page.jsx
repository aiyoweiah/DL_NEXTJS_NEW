// app/[locale]/program/page.jsx
// Pure server component — no 'use client', zero external icon dependencies.

import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { courseSchema }  from '@/lib/schema'

export const metadata = buildMetadata({
  title:       'The 16-Week Program',
  description:
    'A structured, Navigator-led 16-week bilingual thinking program. ' +
    'Entrance Lexile assessment, weekly Read → Think → Speak → Write sessions, ' +
    'and a measurable exit result for Chinese-speaking families in Canada and the US.',
  path: '/program',
})

// ─────────────────────────────────────────────────────────────
// INLINE SVG ICONS — no external package needed
// ─────────────────────────────────────────────────────────────
function IconArrowRight({ style }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
function IconBookOpen({ style }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}
function IconLightbulb({ style }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.8 10.1 19 8.7 19 7a7 7 0 1 0-14 0c0 1.7 1.2 3.1 2.5 4.5.8.8 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6M10 22h4" />
    </svg>
  )
}
function IconMessageCircle({ style }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function IconEdit3({ style }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}
function IconPlayCircle({ style }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  )
}
function IconTarget({ style }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}
function IconSparkles({ style }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" />
      <path d="M5 3l.8 2.8L8.5 6.5l-2.7.9L5 10l-.8-2.6L1.5 6.5l2.7-.9z" />
      <path d="M19 14l.8 2.8 2.7.9-2.7.8L19 21l-.8-2.5-2.7-.8 2.7-.9z" />
    </svg>
  )
}
function IconHeart({ style }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
function IconUsers({ style }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
function IconInfinity({ style }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4z" />
      <path d="M12 12c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────
function Headline({ eng, zho, dark = true, center = false }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2
        className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15]"
        style={{ fontFamily: 'var(--font-latin)', color: dark ? '#b7b5fe' : '#0E0E12' }}
      >
        {eng}
      </h2>
      <h3
        className="font-medium text-base md:text-xl tracking-wider mt-2"
        style={{ fontFamily: 'var(--font-cjk)', color: dark ? '#F0F0F0' : '#0E0E12', opacity: 0.5 }}
      >
        {zho}
      </h3>
    </div>
  )
}

function Eyebrow({ children, dark = false, center = false }) {
  return (
    <span
      className={`text-xs tracking-[0.2em] uppercase font-medium mb-4${center ? ' block text-center' : ' inline-block'}`}
      style={{ color: dark ? '#b7b5fe' : '#7c79e8' }}
    >
      {children}
    </span>
  )
}

function TraitBar({ trait, entry, exit }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-32 truncate"
        style={{ fontFamily: 'var(--font-latin)', color: 'rgba(14,14,18,0.7)' }}>
        {trait}
      </span>
      <div className="flex-1 flex items-center gap-1.5">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="flex-1 h-7 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 rounded-lg"
              style={{ backgroundColor: n <= entry ? 'rgba(14,14,18,0.12)' : 'rgba(0,0,0,0.03)' }} />
            <div className="absolute inset-0 rounded-lg"
              style={{ backgroundColor: n <= exit ? 'rgba(183,181,254,0.75)' : 'transparent' }} />
          </div>
        ))}
      </div>
      <span className="w-14 text-right font-mono">
        <span style={{ color: 'rgba(14,14,18,0.35)' }}>{entry}</span>
        <span style={{ color: 'rgba(14,14,18,0.2)', margin: '0 4px' }}>&#8594;</span>
        <span className="font-bold" style={{ color: '#b7b5fe' }}>{exit}</span>
      </span>
    </div>
  )
}

function LoopDiagram() {
  return (
    <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: '1 / 1' }}>
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none"
        aria-label="The Loop: Read, Think, Speak, Write" role="img">
        <circle cx="200" cy="200" r="160" stroke="#b7b5fe" strokeWidth="1.5" opacity="0.2" />
        <circle cx="200" cy="200" r="145" stroke="#b7b5fe" strokeWidth="0.5" opacity="0.08" />
        <path d="M200 40 A160 160 0 0 1 360 200"  stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M360 200 A160 160 0 0 1 200 360" stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M200 360 A160 160 0 0 1 40 200"  stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M40 200 A160 160 0 0 1 200 40"   stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <circle cx="200" cy="40"  r="36" fill="#F5F5FF" stroke="#b7b5fe"  strokeWidth="2" />
        <text x="200" y="37"  textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">READ</text>
        <text x="200" y="53"  textAnchor="middle" fill="#0E0E12" fontSize="9" opacity="0.4" fontFamily="Noto Sans SC, sans-serif">&#38461;&#35835;</text>
        <circle cx="360" cy="200" r="36" fill="#F5F5FF" stroke="#b7b5fe"  strokeWidth="2" />
        <text x="360" y="197" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">THINK</text>
        <text x="360" y="213" textAnchor="middle" fill="#0E0E12" fontSize="9" opacity="0.4" fontFamily="Noto Sans SC, sans-serif">&#24605;&#32771;</text>
        <circle cx="200" cy="360" r="36" fill="#F5F5FF" stroke="#F5C842"  strokeWidth="2" />
        <text x="200" y="357" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">SPEAK</text>
        <text x="200" y="373" textAnchor="middle" fill="#0E0E12" fontSize="9" opacity="0.4" fontFamily="Noto Sans SC, sans-serif">&#34920;&#36798;</text>
        <circle cx="40"  cy="200" r="36" fill="#F5F5FF" stroke="#b7b5fe"  strokeWidth="2" />
        <text x="40"  y="197" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">WRITE</text>
        <text x="40"  y="213" textAnchor="middle" fill="#0E0E12" fontSize="9" opacity="0.4" fontFamily="Noto Sans SC, sans-serif">&#20889;&#20316;</text>
        <text x="200" y="193" textAnchor="middle" fill="#0E0E12" fontSize="13" fontWeight="700" fontFamily="DM Sans, sans-serif" opacity="0.6">THE LOOP</text>
        <text x="200" y="210" textAnchor="middle" fill="#b7b5fe" fontSize="10" fontFamily="Noto Sans SC, sans-serif" opacity="0.5">&#23398;&#20064;&#38381;&#29615;</text>
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const STATS = [
  { num: '16', label: 'Weeks',         sub: 'A real commitment',            IconComp: IconTarget   },
  { num: '4',  label: 'Skills',        sub: 'Read · Think · Speak · Write', IconComp: IconSparkles },
  { num: '2',  label: 'Assessments',   sub: 'Before + After',               IconComp: IconBookOpen },
  { num: '1',  label: 'Navigator',     sub: 'Who knows your child',         IconComp: IconHeart    },
  { num: '1',  label: 'Cohort',        sub: 'Small & intentional',          IconComp: IconUsers    },
  { num: '&#8734;', label: 'The Full Loop', sub: 'Every single session',    IconComp: IconInfinity },
]

const LOOP_PANELS = [
  {
    num: '01', title: 'Read',  IconComp: IconBookOpen,
    accent: '#b7b5fe', numCol: 'rgba(183,181,254,0.35)', border: 'rgba(0,0,0,0.06)',
    badge: 'LEXILE 740',
    img:    'https://images.unsplash.com/photo-1612650699397-a47b20e57ca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    imgAlt: 'Student reading in natural light',
    body:   'Texts chosen above their comfort zone \u2014 just enough to stretch. Comprehension is tracked by Lexile level, not guesswork.',
  },
  {
    num: '02', title: 'Think', IconComp: IconLightbulb,
    accent: '#b7b5fe', numCol: 'rgba(183,181,254,0.35)', border: 'rgba(0,0,0,0.06)',
    badge: null,
    img:    'https://images.unsplash.com/photo-1565665634648-1a036f3a5688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    imgAlt: 'Brainstorming sticky notes',
    body:   'Before they speak or write, they build the argument. What\u2019s the claim? What\u2019s the evidence? What\u2019s the counter? Structure first.',
  },
  {
    num: '03', title: 'Speak', IconComp: IconMessageCircle,
    accent: '#F5C842', numCol: 'rgba(245,200,66,0.45)', border: 'rgba(245,200,66,0.1)',
    badge: null,
    img:    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    imgAlt: 'Student presenting confidently',
    body:   'They take a position and defend it \u2014 live, with their Navigator. This is where confidence is built, not performed.',
  },
  {
    num: '04', title: 'Write', IconComp: IconEdit3,
    accent: '#b7b5fe', numCol: 'rgba(183,181,254,0.35)', border: 'rgba(0,0,0,0.06)',
    badge: null,
    img:    'https://images.unsplash.com/photo-1588561181397-fed38f837e17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    imgAlt: 'Child writing in notebook',
    body:   'Everything they\u2019ve read, thought, and said now lands on the page. Draft to revision \u2014 measurable improvement, every time.',
  },
]

const TRAIT_BARS = [
  { trait: 'Ideas',            entry: 2, exit: 4 },
  { trait: 'Organisation',     entry: 2, exit: 4 },
  { trait: 'Voice',            entry: 2, exit: 4 },
  { trait: 'Word Choice',      entry: 2, exit: 5 },
  { trait: 'Sentence Fluency', entry: 3, exit: 5 },
  { trait: 'Conventions',      entry: 3, exit: 4 },
  { trait: 'Presentation',     entry: 2, exit: 4 },
]

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default function ProgramPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema()) }}
      />

      <div className="w-full overflow-hidden">

        {/* ══ §1 HERO ══════════════════════════════════════ */}
        <section className="relative w-full min-h-screen flex items-center overflow-hidden"
          style={{ backgroundColor: '#F5F5FF' }}>

          <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
            <div className="absolute rounded-full blur-[120px]"
              style={{ top: '-20%', right: '-10%', width: '60vw', height: '60vw', backgroundColor: 'rgba(183,181,254,0.06)' }} />
            <div className="absolute rounded-full blur-[100px]"
              style={{ bottom: '-10%', left: '-5%', width: '40vw', height: '40vw', backgroundColor: 'rgba(245,200,66,0.04)' }} />
          </div>

          <div className="relative z-10 container-section py-20 md:py-28 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">

              <div className="lg:col-span-3 flex flex-col gap-5">
                <Eyebrow>The 16-Week Program</Eyebrow>
                <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1]"
                  style={{ fontFamily: 'var(--font-latin)', color: '#0E0E12' }}>
                  A real plan for your child&rsquo;s next 16&nbsp;weeks.
                </h1>
                <p className="font-medium text-lg md:text-xl tracking-wider"
                  style={{ fontFamily: 'var(--font-cjk)', color: '#b7b5fe' }}>
                  为您孩子定制的十六周成长计划
                </p>
                <p className="text-lg md:text-xl font-light max-w-xl leading-relaxed"
                  style={{ color: 'rgba(14,14,18,0.55)' }}>
                  We start with a clear baseline — reading level, writing ability —
                  and build from there. Every week is structured, tracked, and guided
                  by a dedicated Navigator who knows your child by name.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <a href="#structure"
                    className="inline-flex items-center justify-center gap-2 font-bold py-4 px-8 rounded-full transition-all"
                    style={{ fontFamily: 'var(--font-latin)', backgroundColor: '#b7b5fe', color: '#0E0E12', boxShadow: '0 4px 20px rgba(183,181,254,0.25)' }}>
                    See How It Works <IconArrowRight />
                  </a>
                  <Link href="/consult"
                    className="inline-flex items-center justify-center gap-2 font-bold py-4 px-8 rounded-full transition-colors hover:border-[#b7b5fe] hover:text-[#7c79e8]"
                    style={{ fontFamily: 'var(--font-latin)', border: '1.5px solid rgba(14,14,18,0.15)', color: '#0E0E12' }}>
                    Book a Free Consultation
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-2">
                <LoopDiagram />
              </div>

            </div>
          </div>
        </section>

        {/* ══ §2 STATS STRIP ══════════════════════════════ */}
        <section className="w-full py-12 md:py-16" style={{ backgroundColor: '#212830' }}
          aria-label="Program at a glance">
          <div className="container-section">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-y-10 gap-x-2">
              {STATS.map(({ num, label, sub, IconComp }, i) => (
                <div key={label} className="flex flex-col items-center text-center px-3"
                  style={i > 0 ? { borderLeft: '1px solid rgba(183,181,254,0.15)' } : undefined}>
                  <IconComp style={{ color: 'rgba(183,181,254,0.4)', marginBottom: '8px' }} />
                  <span className="text-4xl md:text-5xl font-bold tracking-tight mb-1"
                    style={{ fontFamily: 'var(--font-latin)', color: '#b7b5fe' }}
                    dangerouslySetInnerHTML={{ __html: num }} />
                  <span className="text-sm font-medium uppercase tracking-[0.15em] mb-1"
                    style={{ color: 'rgba(240,240,240,0.8)' }}>{label}</span>
                  <span className="text-xs font-light leading-snug"
                    style={{ color: 'rgba(240,240,240,0.4)' }}>{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ §3 THE LOOP DEEP DIVE ═══════════════════════ */}
        <section id="structure" className="w-full py-20 md:py-28" style={{ backgroundColor: '#F5F5FF' }}>
          <div className="container-section">
            <Eyebrow>How The Loop Works</Eyebrow>
            <div className="mb-14 md:mb-20">
              <Headline eng="Four skills. Every session." zho="四项技能，贯穿每堂课" dark={false} />
            </div>
            <p className="font-light max-w-2xl leading-relaxed -mt-8 md:-mt-12 mb-12 md:mb-16"
              style={{ color: 'rgba(14,14,18,0.5)' }}>
              Each session cycles through four connected phases. Your child doesn&rsquo;t
              just study one skill at a time — they learn how reading fuels thinking,
              thinking sharpens speaking, and speaking strengthens writing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {LOOP_PANELS.map(({ num, title, IconComp, accent, numCol, border, badge, img, imgAlt, body }) => (
                <div key={title}
                  className="group relative overflow-hidden rounded-3xl flex flex-col justify-end p-8 md:p-10 transition-shadow hover:shadow-lg"
                  style={{ aspectRatio: '3 / 4', backgroundColor: '#ffffff', border: `1px solid ${border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={imgAlt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ opacity: 0.35 }} />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.3) 100%)' }} />
                  {badge && (
                    <div className="absolute top-6 right-6 z-10 font-mono text-xs tracking-widest border px-3 py-1.5 rounded-lg"
                      style={{ color: 'rgba(183,181,254,0.7)', borderColor: 'rgba(183,181,254,0.25)', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)' }}>
                      {badge}
                    </div>
                  )}
                  <div className="relative z-10">
                    <span className="font-light text-sm tracking-widest mb-3 block" style={{ color: numCol }}>{num}</span>
                    <h3 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3"
                      style={{ fontFamily: 'var(--font-latin)', color: '#0E0E12' }}>
                      <IconComp style={{ color: accent }} />
                      {title}
                    </h3>
                    <p className="font-light leading-relaxed" style={{ color: 'rgba(14,14,18,0.55)', maxWidth: 'none' }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ §4 16-WEEK JOURNEY ══════════════════════════ */}
        <section className="w-full py-20 md:py-28" style={{ backgroundColor: '#212830' }}>
          <div className="container-section">
            <Eyebrow dark>The Journey</Eyebrow>
            <div className="mb-14 md:mb-20">
              <Headline eng="Where your child starts — and where they'll be." zho="从起点到成长的清晰路径" dark />
            </div>

            <div className="flex flex-col md:flex-row gap-12 md:gap-8 relative">
              <div className="hidden md:block absolute top-[10px] pointer-events-none"
                style={{ left: '8.33%', right: '8.33%', borderTop: '1px dashed rgba(183,181,254,0.25)' }}
                aria-hidden="true" />
              <div className="md:hidden absolute top-0 bottom-0 left-[10px] pointer-events-none"
                style={{ borderLeft: '1px dashed rgba(183,181,254,0.25)' }}
                aria-hidden="true" />

              {/* Node 1 */}
              <div className="flex-1 relative pl-14 md:pl-0">
                <div className="flex items-center justify-start mb-4 md:mb-6 relative z-10">
                  <div className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: '#b7b5fe', boxShadow: '0 0 16px rgba(183,181,254,0.4)' }} />
                </div>
                <h4 className="font-semibold text-xl mb-1"
                  style={{ fontFamily: 'var(--font-latin)', color: '#b7b5fe' }}>
                  Entrance Assessment
                </h4>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(183,181,254,0.45)' }}>
                  Week 1 · 第一周
                </p>
                <p className="font-light text-sm leading-relaxed mb-6" style={{ color: 'rgba(240,240,240,0.65)', maxWidth: 'none' }}>
                  We start by finding out exactly where your child is — their reading level,
                  their writing strengths, and the specific areas where they need support. No assumptions.
                </p>
                <div className="rounded-2xl overflow-hidden border"
                  style={{ aspectRatio: '4 / 3', backgroundColor: '#2E3848', borderColor: 'rgba(255,255,255,0.05)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1606327054581-899eb5e6d1dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80"
                    alt="Student entrance assessment" className="w-full h-full object-cover" style={{ opacity: 0.7 }} />
                </div>
                <div className="mt-3 flex items-center gap-2 font-mono text-xs" style={{ color: 'rgba(183,181,254,0.45)' }}>
                  <span className="border rounded-lg px-2.5 py-1" style={{ borderColor: 'rgba(183,181,254,0.2)' }}>LEXILE 620</span>
                  <span>Starting point established</span>
                </div>
              </div>

              {/* Node 2 */}
              <div className="flex-1 relative pl-14 md:pl-0">
                <div className="flex items-center justify-start mb-4 md:mb-6 relative z-10">
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: 'rgba(240,240,240,0.25)' }} />
                </div>
                <h4 className="font-semibold text-xl mb-1"
                  style={{ fontFamily: 'var(--font-latin)', color: '#F0F0F0' }}>
                  Weekly Sessions
                </h4>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(240,240,240,0.35)' }}>
                  Weeks 2–15 · 第二至十五周
                </p>
                <p className="font-light text-sm leading-relaxed mb-6" style={{ color: 'rgba(240,240,240,0.65)', maxWidth: 'none' }}>
                  Each week, your child works through The Loop with their Navigator —
                  someone who knows their progress, their challenges, and what to push next.
                </p>
                <div className="rounded-2xl overflow-hidden border"
                  style={{ aspectRatio: '4 / 3', backgroundColor: '#2E3848', borderColor: 'rgba(255,255,255,0.05)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1605915968535-7a95bcd68cab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80"
                    alt="Online tutoring session on screen" className="w-full h-full object-cover" style={{ opacity: 0.7 }} />
                </div>
              </div>

              {/* Node 3 — gilt */}
              <div className="flex-1 relative pl-14 md:pl-0">
                <div className="flex items-center justify-start mb-4 md:mb-6 relative z-10">
                  <div className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: '#F5C842', boxShadow: '0 0 16px rgba(245,200,66,0.4)' }} />
                </div>
                <h4 className="font-semibold text-xl mb-1"
                  style={{ fontFamily: 'var(--font-latin)', color: '#F5C842' }}>
                  Exit Assessment
                </h4>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(245,200,66,0.45)' }}>
                  Week 16 · 第十六周
                </p>
                <p className="font-light text-sm leading-relaxed mb-6" style={{ color: 'rgba(240,240,240,0.65)', maxWidth: 'none' }}>
                  At the end, you see the growth — not as a vague report card, but as real numbers.
                  Lexile level, writing scores, side by side with where they started.
                </p>
                <div className="rounded-2xl overflow-hidden border relative"
                  style={{ aspectRatio: '4 / 3', backgroundColor: '#2E3848', borderColor: 'rgba(255,255,255,0.05)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1590019012497-b44f1aaa40d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80"
                    alt="Progress measurement chart" className="w-full h-full object-cover" style={{ opacity: 0.7 }} />
                  <div className="absolute bottom-4 left-4 right-4 backdrop-blur rounded-xl p-4 border"
                    style={{ backgroundColor: 'rgba(0,0,0,0.65)', borderColor: 'rgba(255,255,255,0.1)' }}>
                    <div className="text-xs font-mono mb-2" style={{ color: 'rgba(240,240,240,0.45)' }}>Lexile Growth</div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-lg" style={{ color: 'rgba(240,240,240,0.45)' }}>620</span>
                      <div className="flex-1 h-2.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                        <div className="h-full rounded-full"
                          style={{ width: '75%', background: 'linear-gradient(90deg, #b7b5fe 0%, #F5C842 100%)' }} />
                      </div>
                      <span className="font-mono font-bold text-lg" style={{ color: '#F5C842' }}>820</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══ §5 SESSION NARRATIVE ════════════════════════ */}
        <section className="w-full py-20 md:py-28" style={{ backgroundColor: '#F5F5FF' }}>
          <div className="container-section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              <div className="relative rounded-3xl overflow-hidden"
                style={{ aspectRatio: '4 / 3', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.05)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1605915968535-7a95bcd68cab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
                  alt="Navigator-led session in progress on screen" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md rounded-xl p-4 flex items-center justify-between border"
                  style={{ backgroundColor: 'rgba(33,40,48,0.8)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(183,181,254,0.2)' }}>
                      <span className="text-xs font-bold" style={{ color: '#b7b5fe', fontFamily: 'var(--font-latin)' }}>NV</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Navigator Sarah</div>
                      <div className="text-xs" style={{ color: '#b7b5fe' }}>Read Phase · Lexile 740</div>
                    </div>
                  </div>
                  <IconPlayCircle style={{ color: 'rgba(255,255,255,0.4)' }} />
                </div>
              </div>

              <div>
                <Eyebrow>A Real Session</Eyebrow>
                <h2 className="font-bold text-3xl md:text-5xl tracking-tight leading-[1.15] mb-2"
                  style={{ fontFamily: 'var(--font-latin)', color: '#0E0E12' }}>
                  Here&rsquo;s what a typical Tuesday looks like.
                </h2>
                <h3 className="font-medium text-base tracking-wider mb-8"
                  style={{ fontFamily: 'var(--font-cjk)', color: '#0E0E12', opacity: 0.35 }}>
                  一个典型的周二课堂
                </h3>
                <div className="space-y-5 font-light leading-relaxed" style={{ color: 'rgba(14,14,18,0.6)' }}>
                  <p style={{ maxWidth: 'none' }}>
                    The Navigator opens by naming the phase:{' '}
                    <em className="not-italic font-medium" style={{ color: '#0E0E12' }}>
                      &ldquo;Today we&rsquo;re in Read. Your text is at Lexile 740 — that&rsquo;s
                      eight points above where you were last week. Let&rsquo;s see what you can do.&rdquo;
                    </em>
                  </p>
                  <p style={{ maxWidth: 'none' }}>
                    Twenty minutes of structured reading. Not silent — annotated, questioned, discussed together.
                  </p>
                  <p style={{ maxWidth: 'none' }}>
                    Then comes Think. The Navigator asks:{' '}
                    <em className="not-italic font-medium" style={{ color: '#0E0E12' }}>
                      what&rsquo;s the author&rsquo;s argument? Do you agree? What&rsquo;s the strongest counter?
                    </em>
                  </p>
                  <p style={{ maxWidth: 'none' }}>
                    The session closes looking forward:{' '}
                    <em className="not-italic font-medium" style={{ color: '#0E0E12' }}>
                      &ldquo;Next week is Speak. You&rsquo;ll defend your position out loud. Start getting ready.&rdquo;
                    </em>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══ §6 THE HANGAR ═══════════════════════════════ */}
        <section className="relative w-full py-20 md:py-32 overflow-hidden" style={{ backgroundColor: '#0E0E12' }}>
          <div className="absolute inset-0 z-0" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80"
              alt="" className="w-full h-full object-cover"
              style={{ opacity: 0.25, mixBlendMode: 'luminosity' }} />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(14,14,18,0.8)' }} />
          </div>
          <div className="relative z-10 container-section text-center" style={{ maxWidth: '40rem', marginLeft: 'auto', marginRight: 'auto' }}>
            <Eyebrow dark center>The Hangar</Eyebrow>
            <h2 className="font-bold text-3xl md:text-5xl tracking-tight leading-[1.15] mb-2"
              style={{ fontFamily: 'var(--font-latin)', color: '#ffffff' }}>
              Between sessions, they&rsquo;re not alone.
            </h2>
            <h3 className="font-medium text-base tracking-wider mb-8"
              style={{ fontFamily: 'var(--font-cjk)', color: '#b7b5fe', opacity: 0.35 }}>
              课后社区，持续学习
            </h3>
            <p className="text-lg md:text-xl font-light leading-relaxed mx-auto"
              style={{ color: 'rgba(240,240,240,0.75)', maxWidth: '52ch' }}>
              The Hangar is where DODO learners connect between sessions — not for homework
              help, but for the kind of peer learning that happens when curious minds find
              each other. Navigator-supported, student-driven, and a place where good habits
              stick.
            </p>
          </div>
        </section>

        {/* ══ §7 ASSESSMENT FRAMEWORK ═════════════════════ */}
        <section className="w-full py-20 md:py-28" style={{ backgroundColor: '#F5F5FF' }}>
          <div className="container-section">
            <div className="mb-14 md:mb-20 text-center">
              <Eyebrow center>How We Measure Growth</Eyebrow>
              <Headline eng="Real numbers, not vague progress reports." zho="真实数据，告别模糊评语" dark={false} center />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

              {/* Lexile card */}
              <div className="rounded-3xl p-8 md:p-12 flex flex-col gap-8 border"
                style={{ backgroundColor: '#ffffff', borderColor: 'rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2"
                    style={{ fontFamily: 'var(--font-latin)', color: '#0E0E12' }}>
                    Lexile Reading Level
                  </h3>
                  <p className="font-light leading-relaxed" style={{ color: 'rgba(14,14,18,0.5)', maxWidth: 'none' }}>
                    The same measurement system used by schools across North America —
                    so you can compare progress directly.
                  </p>
                </div>
                <div className="flex gap-6 items-stretch" style={{ minHeight: '200px' }}>
                  <div className="relative w-16 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full overflow-hidden"
                      style={{ backgroundColor: 'rgba(14,14,18,0.04)' }}>
                      <div className="absolute bottom-0 left-0 right-0 rounded-b-full"
                        style={{ height: `${(620 / 1200) * 100}%`, backgroundColor: 'rgba(14,14,18,0.08)' }} />
                      <div className="absolute bottom-0 left-0 right-0 rounded-b-full"
                        style={{ height: `${(820 / 1200) * 100}%`, backgroundColor: 'rgba(183,181,254,0.65)' }} />
                    </div>
                    <div className="absolute left-full ml-2 flex items-center gap-1 text-xs font-mono whitespace-nowrap"
                      style={{ bottom: `${(620 / 1200) * 100}%`, transform: 'translateY(50%)', color: 'rgba(14,14,18,0.45)' }}>
                      <div className="w-3 h-px" style={{ backgroundColor: 'rgba(14,14,18,0.25)' }} />
                      <span>620 Start</span>
                    </div>
                    <div className="absolute left-full ml-2 flex items-center gap-1 text-xs font-mono font-bold whitespace-nowrap"
                      style={{ bottom: `${(820 / 1200) * 100}%`, transform: 'translateY(50%)', color: '#b7b5fe' }}>
                      <div className="w-3 h-px" style={{ backgroundColor: '#b7b5fe' }} />
                      <span>820 After</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between text-xs font-mono py-2"
                    style={{ color: 'rgba(14,14,18,0.25)' }} aria-hidden="true">
                    <span>1200 — Grade 12+</span>
                    <span>1000 — Grade 9</span>
                    <span>800 — Grade 6</span>
                    <span>600 — Grade 4</span>
                    <span>400 — Grade 2</span>
                    <span>200 — Grade 1</span>
                  </div>
                </div>
                <p className="font-light text-sm leading-relaxed mt-auto" style={{ color: 'rgba(14,14,18,0.55)', maxWidth: 'none' }}>
                  We don&rsquo;t say your child &ldquo;reads well.&rdquo; We show you they moved from{' '}
                  <strong className="font-medium" style={{ color: '#0E0E12' }}>Lexile 620 to 820</strong>{' '}
                  in 16 weeks — that&rsquo;s the difference between Grade 4 and Grade 6 reading territory.
                </p>
              </div>

              {/* 6+1 Trait card */}
              <div className="rounded-3xl p-8 md:p-12 flex flex-col gap-8 border"
                style={{ backgroundColor: '#ffffff', borderColor: 'rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2"
                    style={{ fontFamily: 'var(--font-latin)', color: '#0E0E12' }}>
                    6+1 Trait Writing
                  </h3>
                  <p className="font-light leading-relaxed" style={{ color: 'rgba(14,14,18,0.5)', maxWidth: 'none' }}>
                    The same rubric your child&rsquo;s school uses — so when you see improvement here,
                    it shows up in the classroom too.
                  </p>
                </div>
                <div className="space-y-3">
                  {TRAIT_BARS.map((bar) => <TraitBar key={bar.trait} {...bar} />)}
                </div>
                <div className="flex items-center gap-4 text-xs mt-2" style={{ color: 'rgba(14,14,18,0.35)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-md" style={{ backgroundColor: 'rgba(14,14,18,0.12)' }} />
                    <span>Start</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-md" style={{ backgroundColor: 'rgba(183,181,254,0.75)' }} />
                    <span>After 16 weeks</span>
                  </div>
                  <span className="ml-auto font-mono">Scale 1–6</span>
                </div>
                <p className="font-light text-sm leading-relaxed mt-auto" style={{ color: 'rgba(14,14,18,0.55)', maxWidth: 'none' }}>
                  When you ask &ldquo;has the writing improved?&rdquo; — we don&rsquo;t say yes.
                  We show you each trait score, before and after, so you can see exactly where
                  the growth happened.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ══ §8 CHARTER CTA ══════════════════════════════ */}
        <section id="cta" className="w-full py-28 md:py-40 text-center relative overflow-hidden"
          style={{ backgroundColor: '#212830' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full pointer-events-none"
            style={{ backgroundColor: 'rgba(183,181,254,0.12)', filter: 'blur(100px)' }}
            aria-hidden="true" />
          <div className="relative z-10 container-section flex flex-col items-center gap-6"
            style={{ maxWidth: '40rem', marginLeft: 'auto', marginRight: 'auto' }}>
            <Eyebrow dark center>Get Started</Eyebrow>
            <h2 className="font-bold text-3xl md:text-5xl tracking-tight leading-[1.15]"
              style={{ fontFamily: 'var(--font-latin)', color: '#b7b5fe' }}>
              Ready to see where your child stands?
            </h2>
            <h3 className="font-medium text-base tracking-wider"
              style={{ fontFamily: 'var(--font-cjk)', color: '#b7b5fe', opacity: 0.35 }}>
              从一次诊断性对话开始
            </h3>
            <p className="text-lg md:text-xl font-light leading-relaxed"
              style={{ color: 'rgba(240,240,240,0.6)', maxWidth: '52ch' }}>
              It starts with a single conversation — a free diagnostic call where we learn
              about your child, assess where they are, and map out what 16 weeks could look
              like for them. Founding Family rates are available for our charter cohorts.
              Spots are limited.
            </p>
            <Link href="/consult"
              className="mt-4 font-bold text-lg py-5 px-12 rounded-full transition-all hover:scale-105 active:scale-95"
              style={{ fontFamily: 'var(--font-latin)', backgroundColor: '#F5C842', color: '#0E0E12', boxShadow: '0 0 30px rgba(245,200,66,0.2)' }}>
              Book a Free Diagnostic Call
            </Link>
            <p className="font-light text-sm mt-1" style={{ color: 'rgba(240,240,240,0.35)' }}>
              Limited charter spots per cohort. Founding Family rate — not a promotion.
            </p>
          </div>
        </section>

      </div>
    </>
  )
}