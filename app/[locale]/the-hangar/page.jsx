// app/the-hangar/page.jsx
// Pure server component — no 'use client', zero external dependencies.
//
// Direct translation of Figma Make Hangar source (tUKokxMK9eHkSortCPKzTX)
// into Next.js App Router patterns. Every measurement, colour, and type
// spec taken verbatim from the Figma source.
//
// Section map (9 sections — exact from Figma):
//   S1  Hero                  — #212830 bg-img + gradient overlay, ghost nothing, h1 + sub
//   S2  The One Reframe       — #0E0E12 (void-black), single centred pull-quote
//   S3  What It Is            — #212830 (dark), 3-col divider grid with italic question labels
//   S4  Inside The Loop       — #F5F5FF (whisper), LoopDiagram SVG + caption
//   S5  Founder Video         — #0E0E12 (void-black), placeholder video embed
//   S6  Navigator Presence    — #F5F5FF (whisper), 2-col image + copy
//   S7  The Cohort            — #212830 (dark), 3-col numbered grid
//   S8  Student Voice         — #0E0E12 (void-black), 2-col student quote cards
//   S9  Closing CTA           — #212830 (dark), gilt + ghost buttons, microcopy
//
// Figma → Next.js adaptations:
//   SectionWrapper background props → inline style backgroundColor
//   LoopDiagram component → inlined SVG (same asset as program/page.jsx)
//   VideoPlayer component → <figure> placeholder (client embeds need 'use client')
//   StudentVoiceCard component → inlined server primitive
//   button → <Link href="..."> (SSR-safe, no onClick needed)
//   Eyebrow component → inlined primitive (exact Figma spec)
//
// Content: TODO: migrate to content/en/the-hangar.json

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'

export const metadata = buildMetadata({
  locale,
  title:       'The Hangar — Between-Session Community',
  description:
    'The Hangar is where DODO learners continue The Loop between sessions — ' +
    'Navigator-supported, cohort-driven, and built to turn 16 weeks into a ' +
    'compounding system. Not homework help. The environment.',
  path: '/the-hangar',
})

// ─────────────────────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────────────────────

// Eyebrow — exact Figma spec:
// 12px · fw500 · tracking-[0.1em] · uppercase · #b7b5fe
function Eyebrow({ children, center = false }) {
  return (
    <div
      style={{
        fontFamily:    'var(--font-latin)',
        fontWeight:    500,
        fontSize:      '12px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color:         '#b7b5fe',
        marginBottom:  '16px',
        textAlign:     center ? 'center' : undefined,
      }}
    >
      {children}
    </div>
  )
}

// StudentVoiceCard — replaces Figma StudentVoiceCard component.
// Dark card: #2E3848 bg on #0E0E12 section.
// Quote italic fw300 #F0F0F0 · meta row: grade · city · weeks
// hangarDetail: small italic caption below meta
function StudentVoiceCard({ quote, grade, city, weeksInProgram, hangarDetail }) {
  return (
    <div
      className="rounded-2xl"
      style={{
        backgroundColor: '#2E3848',
        border:          '1px solid rgba(183,181,254,0.10)',
        padding:         '32px',
      }}
    >
      {/* Opening mark */}
      <div
        aria-hidden="true"
        style={{
          fontFamily:   'var(--font-latin)',
          fontSize:     '48px',
          fontWeight:   700,
          color:        '#b7b5fe',
          opacity:      0.25,
          lineHeight:   1,
          marginBottom: '12px',
        }}
      >
        &ldquo;
      </div>

      {/* Quote */}
      <p
        style={{
          fontFamily:   'var(--font-latin)',
          fontWeight:   300,
          fontSize:     '16px',
          fontStyle:    'italic',
          color:        '#F0F0F0',
          lineHeight:   1.7,
          marginBottom: '24px',
        }}
      >
        {quote}
      </p>

      {/* Meta row */}
      <div
        className="flex items-center gap-2"
        style={{
          fontFamily: 'var(--font-latin)',
          fontSize:   '13px',
          fontWeight: 600,
          color:      '#b7b5fe',
          marginBottom: '8px',
        }}
      >
        <span>{grade}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>{city}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ fontWeight: 400, color: 'rgba(240,240,240,0.5)' }}>
          {weeksInProgram} weeks in program
        </span>
      </div>

      {/* Hangar detail */}
      {hangarDetail && (
        <p
          style={{
            fontFamily: 'var(--font-latin)',
            fontSize:   '12px',
            fontWeight: 400,
            fontStyle:  'italic',
            color:      'rgba(183,181,254,0.45)',
            lineHeight: 1.5,
          }}
        >
          {hangarDetail}
        </p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// LOOP DIAGRAM SVG
// Same asset used in program/page.jsx and about/page.jsx.
// Renders on #F5F5FF (whisper) background — circles use #F5F5FF fill.
// ─────────────────────────────────────────────────────────────
function LoopDiagram() {
  return (
    <div
      className="relative w-full max-w-md mx-auto"
      style={{ aspectRatio: '1 / 1' }}
    >
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        fill="none"
        aria-label="The Loop: Read, Think, Speak, Write"
        role="img"
      >
        <circle cx="200" cy="200" r="160" stroke="#b7b5fe" strokeWidth="1.5" opacity="0.2" />
        <circle cx="200" cy="200" r="145" stroke="#b7b5fe" strokeWidth="0.5" opacity="0.08" />
        <path d="M200 40 A160 160 0 0 1 360 200"  stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M360 200 A160 160 0 0 1 200 360" stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M200 360 A160 160 0 0 1 40 200"  stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M40 200 A160 160 0 0 1 200 40"   stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        {/* READ */}
        <circle cx="200" cy="40"  r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="200" y="37"  textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">READ</text>
        <text x="200" y="53"  textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC, sans-serif">阅读</text>
        {/* THINK */}
        <circle cx="360" cy="200" r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="360" y="197" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">THINK</text>
        <text x="360" y="213" textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC, sans-serif">思考</text>
        {/* SPEAK — Gilt accent */}
        <circle cx="200" cy="360" r="36" fill="#F5F5FF" stroke="#F5C842" strokeWidth="2" />
        <text x="200" y="357" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">SPEAK</text>
        <text x="200" y="373" textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC, sans-serif">表达</text>
        {/* WRITE */}
        <circle cx="40"  cy="200" r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="40"  y="197" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">WRITE</text>
        <text x="40"  y="213" textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC, sans-serif">写作</text>
        {/* Centre */}
        <text x="200" y="193" textAnchor="middle" fill="#0E0E12" fontSize="13" fontWeight="700" fontFamily="DM Sans, sans-serif" opacity="0.6">THE LOOP</text>
        <text x="200" y="210" textAnchor="middle" fill="#b7b5fe" fontSize="10" fontFamily="Noto Sans SC, sans-serif" opacity="0.5">学习闭环</text>
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION WRAPPER — mirrors Figma SectionWrapper background prop
// ─────────────────────────────────────────────────────────────
// background values used in this file:
//   "dark"       → #212830
//   "void-black" → #0E0E12
//   "whisper"    → #F5F5FF
const BG = {
  dark:        '#212830',
  'void-black': '#0E0E12',
  whisper:     '#F5F5FF',
}

function Section({ bg = 'dark', className = '', children, id }) {
  return (
    <section
      id={id}
      className={`px-6 py-24 md:py-32 ${className}`}
      style={{ backgroundColor: BG[bg] }}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// DATA — TODO: migrate to content/en/the-hangar.json
// ─────────────────────────────────────────────────────────────

// S3 — What It Is columns
const WHAT_IT_IS = [
  {
    question:    'What actually happens here?',
    title:       'Navigator-supported sessions',
    body:        'Structured, not supervised. A Navigator poses the question — students do the thinking. Nothing is passive.',
  },
  {
    question:    "Who else is in The Hangar?",
    title:       'A cohort at the same Loop stage',
    body:        'Every student in the room is navigating two languages and the same phase of The Loop. The shared context is the point.',
  },
  {
    question:    'What does it produce?',
    title:       'Between-session momentum',
    body:        'The Hangar is what turns 16 weeks into a system instead of a schedule. It is where the compounding begins.',
  },
]

// S6 — Navigator Presence copy points
const NAVIGATOR_PRESENCE = [
  {
    label: 'Same Navigator',
    body:  "The Navigator in The Hangar is not a moderator or a support assistant. It is the same Navigator from your child's session — with the same Lexile baseline, the same 6+1 Trait profile, the same session notes.",
  },
  {
    label: 'Calibrated feedback',
    body:  "Every comment in The Hangar references where that specific student is in The Loop. Not generic encouragement — a named trait, a specific score, a precise next move.",
  },
  {
    label: 'Not generic',
    body:  "A Navigator does not copy and paste feedback. When they respond to a student's writing draft in The Hangar, they are responding to that draft — the specific sentence that needs to move, the specific score that changes if it does.",
  },
  {
    label: 'Response time',
    body:  'Hangar responses are delivered within 6 hours on session days and 12 hours on off days.',
  },
]

// S7 — The Cohort columns
const COHORT = [
  {
    num:   '01',
    title: 'Same stage, not same age',
    body:  'Cohorts are grouped by Loop phase and Lexile level — not by school year. A Grade 5 and a Grade 7 student at the same Lexile are in the same conversation.',
  },
  {
    num:   '02',
    title: 'Bilingual by design',
    body:  'Every student in the cohort is navigating two languages simultaneously. The shared experience is not incidental — it is the foundation of what they build together.',
  },
  {
    num:   '03',
    title: 'Belonging before performance',
    body:  'The Hangar is not a place to prove yourself. It is a place to build yourself — in a room where everyone else is doing the same thing, in the same two languages.',
  },
]

// S8 — Student Voice cards
const STUDENT_VOICES = [
  {
    quote:            "I used to think I had to wait until my session to ask questions. Now I post my draft in The Hangar and get feedback before the session even starts. It's like having an extra session every week except it's on my schedule.",
    grade:            'Grade 6',
    city:             'Shanghai',
    weeksInProgram:   8,
    hangarDetail:     'Posted a writing draft at 10pm, received calibrated feedback by morning',
  },
  {
    quote:            "There's this kid in my cohort who's in Grade 9 but we're at the same Lexile. We both struggle with the same stuff and help each other. Nobody at my school gets what it's like doing this in two languages.",
    grade:            'Grade 7',
    city:             'Beijing',
    weeksInProgram:   12,
    hangarDetail:     'Participated in a peer review exchange in The Hangar between sessions',
  },
]

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return localeParams()
}

export default function TheHangarPage({ params }) {
  const locale = params?.locale ?? 'en'
  if (!isValidLocale(locale)) notFound()
  return (
    <div className="w-full overflow-hidden" style={{ fontFamily: 'var(--font-latin)' }}>

      {/* ══ S1 HERO ══════════════════════════════════════════
          Figma: #212830 bg, full-bleed background image + gradient overlay
          Gradient: from-[#0E0E12]/55 via-[#0E0E12]/40 to-[#0E0E12]/25 desktop
                    +[#0E0E12]/60 mobile overlay on top
          Content: max-w-[700px], Eyebrow + h1 (clamp 38-68px) + sub
          h1: two inline #b7b5fe spans
          sub: 18px fw400 #F0F0F0/75
      ════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center justify-center px-6 md:px-12"
        style={{ backgroundColor: '#212830' }}
      >
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1758270705317-3ef6142d306f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
          />
          {/* Desktop gradient — stronger left, lighter right */}
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background: 'linear-gradient(to right, rgba(14,14,18,0.85) 0%, rgba(14,14,18,0.55) 50%, rgba(14,14,18,0.30) 100%)',
            }}
          />
          {/* Mobile overlay — uniform dark */}
          <div
            className="absolute inset-0 md:hidden"
            style={{ backgroundColor: 'rgba(14,14,18,0.72)' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[700px]">
          <Eyebrow>The Hangar</Eyebrow>

          <h1
            className="mb-6"
            style={{
              fontFamily:  'var(--font-latin)',
              fontWeight:  700,
              fontSize:    'clamp(38px, 5vw, 68px)',
              lineHeight:  1.2,
              color:       '#F0F0F0',
              letterSpacing: '-0.03em',
              maxWidth:    '700px',
            }}
          >
            Where the work continues — and the people who{' '}
            <span style={{ color: '#b7b5fe' }}>get it</span> are already there.
          </h1>

          <p
            style={{
              fontFamily:  'var(--font-latin)',
              fontWeight:  400,
              fontSize:    '18px',
              lineHeight:  1.6,
              color:       'rgba(240,240,240,0.75)',
              maxWidth:    '520px',
            }}
          >
            Not homework help. Not a study hall. The environment where The Loop becomes a habit.
          </p>
        </div>
      </section>

      {/* ══ S2 THE ONE REFRAME ═══════════════════════════════
          Figma: void-black (#0E0E12), !py-24 md:!py-32
          Single centred pull-quote: clamp(26-48px) fw700 #F0F0F0
          One #b7b5fe inline span: "ready to go further"
          max-w-[860px] mx-auto
      ════════════════════════════════════════════════════════ */}
      <section
        className="px-6 py-24 md:py-32"
        style={{ backgroundColor: '#0E0E12' }}
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="text-center max-w-[860px] mx-auto"
            style={{
              fontFamily:    'var(--font-latin)',
              fontWeight:    700,
              fontSize:      'clamp(26px, 4vw, 48px)',
              color:         '#F0F0F0',
              lineHeight:    1.3,
              letterSpacing: '-0.025em',
            }}
          >
            The Hangar is not where students go when they are stuck. It is where students go when they are{' '}
            <span style={{ color: '#b7b5fe' }}>ready to go further</span>.
          </p>
        </div>
      </section>

      {/* ══ S3 WHAT THE HANGAR ACTUALLY IS ═══════════════════
          Figma: dark (#212830), text-center header + 3-col divider grid
          Each col: italic question label (13px fw400 #F0F0F0/45)
                    → h3 (22px fw700 #b7b5fe)
                    → body (15px fw400 #F0F0F0/70 lineHeight 1.6)
          Dividers: md:divide-x md:divide-[#b7b5fe]/20
          Col padding: px-0 md:px-8
      ════════════════════════════════════════════════════════ */}
      <Section bg="dark">
        <div className="text-center mb-16">
          <Eyebrow center>What It Is</Eyebrow>
          <h2
            className="max-w-3xl mx-auto"
            style={{
              fontFamily:    'var(--font-latin)',
              fontWeight:    600,
              fontSize:      'clamp(28px, 3vw, 42px)',
              color:         '#F0F0F0',
              lineHeight:    1.3,
              letterSpacing: '-0.02em',
            }}
          >
            Three things The Hangar is — that nothing else in your child&rsquo;s week is.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {WHAT_IT_IS.map(({ question, title, body }, i) => (
            <div
              key={title}
              className="px-0 md:px-8"
              style={
                i > 0
                  ? { borderLeft: '1px solid rgba(183,181,254,0.2)' }
                  : undefined
              }
            >
              {/* Italic question label */}
              <div
                className="mb-4"
                style={{
                  fontFamily:  'var(--font-latin)',
                  fontWeight:  400,
                  fontSize:    '13px',
                  fontStyle:   'italic',
                  color:       'rgba(240,240,240,0.45)',
                }}
              >
                {question}
              </div>
              {/* Title */}
              <h3
                className="mb-3"
                style={{
                  fontFamily:  'var(--font-latin)',
                  fontWeight:  700,
                  fontSize:    '22px',
                  color:       '#b7b5fe',
                }}
              >
                {title}
              </h3>
              {/* Body */}
              <p
                style={{
                  fontFamily:  'var(--font-latin)',
                  fontWeight:  400,
                  fontSize:    '15px',
                  color:       'rgba(240,240,240,0.70)',
                  lineHeight:  1.6,
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ S4 THE HANGAR INSIDE THE LOOP ════════════════════
          Figma: whisper (#F5F5FF), text-center header
          h2 (clamp 28-42px fw700 #0E0E12)
          LoopDiagram SVG centred
          Caption: 16px fw400 #212830 max-w-[640px] lineHeight 1.7
      ════════════════════════════════════════════════════════ */}
      <Section bg="whisper">
        <div className="text-center mb-8">
          <Eyebrow center>The Methodology</Eyebrow>
          <h2
            className="max-w-3xl mx-auto mb-4"
            style={{
              fontFamily:    'var(--font-latin)',
              fontWeight:    700,
              fontSize:      'clamp(28px, 3vw, 42px)',
              color:         '#0E0E12',
              lineHeight:    1.3,
              letterSpacing: '-0.02em',
            }}
          >
            The Loop runs in sessions. The Hangar keeps it running between them.
          </h2>
        </div>

        <LoopDiagram />

        <div className="text-center mt-8">
          <p
            className="max-w-[640px] mx-auto"
            style={{
              fontFamily:  'var(--font-latin)',
              fontWeight:  400,
              fontSize:    '16px',
              color:       '#212830',
              lineHeight:  1.7,
            }}
          >
            A student who only works The Loop during sessions will plateau at the pace
            of one session per week. A student who lives inside The Hangar between
            sessions compounds. The Loop becomes instinct, not instruction.
          </p>
        </div>
      </Section>

      {/* ══ S5 FOUNDER VIDEO ═════════════════════════════════
          Figma: void-black (#0E0E12), text-center header
          Eyebrow "FROM THE FOUNDER"
          h2: clamp(22-34px) fw600 #F0F0F0 max-w-[640px]
          sub: 15px fw400 #F0F0F0/60 max-w-[500px]
          VideoPlayer → placeholder frame.
          Real Cal.com-style embed to be wired in by client.
          Server-safe: no onClick/JS needed for the placeholder.
      ════════════════════════════════════════════════════════ */}
      <section
        className="px-6 py-24 md:py-32"
        style={{ backgroundColor: '#0E0E12' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow center>From the Founder</Eyebrow>
            <h2
              className="max-w-[640px] mx-auto mb-4"
              style={{
                fontFamily:    'var(--font-latin)',
                fontWeight:    600,
                fontSize:      'clamp(22px, 3vw, 34px)',
                color:         '#F0F0F0',
                lineHeight:    1.3,
                letterSpacing: '-0.02em',
              }}
            >
              Why The Hangar exists — and why nothing else does what it does.
            </h2>
            <p
              className="max-w-[500px] mx-auto"
              style={{
                fontFamily:  'var(--font-latin)',
                fontWeight:  400,
                fontSize:    '15px',
                color:       'rgba(240,240,240,0.60)',
                lineHeight:  1.6,
              }}
            >
              Unscripted. Eight minutes. The concept in full.
            </p>
          </div>

          {/* Video player placeholder — wire in real embed URL */}
          {/* TODO: replace src with production YouTube/Vimeo embed URL */}
          <figure
            className="max-w-[800px] mx-auto rounded-2xl overflow-hidden"
            style={{
              aspectRatio:     '16 / 9',
              backgroundColor: '#2E3848',
              border:          '1px solid rgba(183,181,254,0.12)',
              position:        'relative',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
            }}
          >
            {/* Play icon placeholder */}
            <div
              className="flex flex-col items-center gap-4"
              style={{ pointerEvents: 'none' }}
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width:           '72px',
                  height:          '72px',
                  backgroundColor: 'rgba(183,181,254,0.15)',
                  border:          '1.5px solid rgba(183,181,254,0.3)',
                }}
              >
                {/* Play triangle */}
                <svg
                  width="28" height="28" viewBox="0 0 24 24"
                  fill="#b7b5fe" aria-hidden="true"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontFamily:  'var(--font-latin)',
                    fontWeight:  600,
                    fontSize:    '15px',
                    color:       '#F0F0F0',
                    marginBottom: '4px',
                  }}
                >
                  Sarah Chen — Founder &amp; Lead Navigator
                </p>
                <p
                  style={{
                    fontFamily:  'var(--font-latin)',
                    fontWeight:  300,
                    fontSize:    '12px',
                    color:       'rgba(183,181,254,0.5)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Video embed — replace with production URL
                </p>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* ══ S6 NAVIGATOR PRESENCE ════════════════════════════
          Figma: whisper (#F5F5FF), 2-col grid
          Image: order-2 md:order-1, rounded-lg
          Copy: order-1 md:order-2
          Eyebrow, h2 (clamp 28-38px fw700 #0E0E12)
          4 strong-labelled paragraphs, 16px fw400 #212830 lineHeight 1.6
      ════════════════════════════════════════════════════════ */}
      <Section bg="whisper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left — Image */}
          <div className="order-2 md:order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1688646545293-2755ea04cd8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80"
              alt="Navigator providing personalised feedback on a student's writing"
              className="rounded-lg w-full"
              style={{ display: 'block' }}
            />
          </div>

          {/* Right — Copy */}
          <div className="order-1 md:order-2">
            <Eyebrow>Navigator Presence</Eyebrow>

            <h2
              className="mb-8 max-w-[480px]"
              style={{
                fontFamily:    'var(--font-latin)',
                fontWeight:    700,
                fontSize:      'clamp(28px, 3vw, 38px)',
                color:         '#0E0E12',
                lineHeight:    1.3,
                letterSpacing: '-0.02em',
              }}
            >
              The same Navigator. In The Hangar. Knowing exactly where your child is.
            </h2>

            <div className="space-y-5">
              {NAVIGATOR_PRESENCE.map(({ label, body }) => (
                <p
                  key={label}
                  style={{
                    fontFamily:  'var(--font-latin)',
                    fontWeight:  400,
                    fontSize:    '16px',
                    color:       '#212830',
                    lineHeight:  1.6,
                  }}
                >
                  <strong style={{ fontWeight: 600, color: '#0E0E12' }}>
                    {label}:
                  </strong>{' '}
                  {body}
                </p>
              ))}
            </div>
          </div>

        </div>
      </Section>

      {/* ══ S7 THE COHORT ════════════════════════════════════
          Figma: dark (#212830), text-center header + 3-col numbered grid
          Step num: 11px fw300 #b7b5fe/40 mb-3
          h3: 20px fw700 #b7b5fe
          body: 15px fw400 #F0F0F0/70 lineHeight 1.6
          Dividers: md:divide-x md:divide-[#b7b5fe]/20
      ════════════════════════════════════════════════════════ */}
      <Section bg="dark">
        <div className="text-center mb-16">
          <Eyebrow center>The Cohort</Eyebrow>
          <h2
            className="max-w-3xl mx-auto"
            style={{
              fontFamily:    'var(--font-latin)',
              fontWeight:    600,
              fontSize:      'clamp(28px, 3vw, 42px)',
              color:         '#F0F0F0',
              lineHeight:    1.3,
              letterSpacing: '-0.02em',
            }}
          >
            Who else is in The Hangar — and why it matters that they&rsquo;re there.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {COHORT.map(({ num, title, body }, i) => (
            <div
              key={num}
              className="px-0 md:px-8"
              style={
                i > 0
                  ? { borderLeft: '1px solid rgba(183,181,254,0.2)' }
                  : undefined
              }
            >
              {/* Step number */}
              <div
                className="mb-3"
                style={{
                  fontFamily:  'var(--font-latin)',
                  fontWeight:  300,
                  fontSize:    '11px',
                  color:       'rgba(183,181,254,0.40)',
                }}
              >
                {num}
              </div>
              <h3
                className="mb-3"
                style={{
                  fontFamily:  'var(--font-latin)',
                  fontWeight:  700,
                  fontSize:    '20px',
                  color:       '#b7b5fe',
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily:  'var(--font-latin)',
                  fontWeight:  400,
                  fontSize:    '15px',
                  color:       'rgba(240,240,240,0.70)',
                  lineHeight:  1.6,
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ S8 STUDENT VOICE ═════════════════════════════════
          Figma: void-black (#0E0E12), text-center header
          "In their words — not ours." — fw600 clamp(28-42px) #F0F0F0
          2-col grid, max-w-5xl mx-auto
          StudentVoiceCard: dark card #2E3848
      ════════════════════════════════════════════════════════ */}
      <section
        className="px-6 py-24 md:py-32"
        style={{ backgroundColor: '#0E0E12' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow center>Student Voice</Eyebrow>
            <h2
              style={{
                fontFamily:    'var(--font-latin)',
                fontWeight:    600,
                fontSize:      'clamp(28px, 3vw, 42px)',
                color:         '#F0F0F0',
                lineHeight:    1.3,
                letterSpacing: '-0.02em',
              }}
            >
              In their words — not ours.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {STUDENT_VOICES.map((voice) => (
              <StudentVoiceCard key={voice.grade + voice.city} {...voice} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ S9 CLOSING CTA ═══════════════════════════════════
          Figma: dark (#212830), text-center, max-w-2xl mx-auto
          h2: clamp(28-42px) fw700 #b7b5fe lineHeight 1.3
          sub: 16px fw400 #F0F0F0/75 max-w-[520px] mb-8
          Primary button: gilt #F5C842 #0E0E12 fw700 16px
          Secondary button: border-[#F0F0F0]/50 #F0F0F0 bg-transparent fw500
          Microcopy: 13px fw400 #b7b5fe mt-4
          Figma uses md:w-auto md:min-w-[280px] on buttons — preserved
      ════════════════════════════════════════════════════════ */}
      <Section bg="dark">
        <div className="text-center max-w-2xl mx-auto">

          <h2
            className="mb-5"
            style={{
              fontFamily:    'var(--font-latin)',
              fontWeight:    700,
              fontSize:      'clamp(28px, 3vw, 42px)',
              color:         '#b7b5fe',
              lineHeight:    1.3,
              letterSpacing: '-0.02em',
            }}
          >
            The Hangar is included in every 16-Week Program enrollment. It is not an add-on. It is the environment.
          </h2>

          <p
            className="max-w-[520px] mx-auto mb-8"
            style={{
              fontFamily:  'var(--font-latin)',
              fontWeight:  400,
              fontSize:    '16px',
              color:       'rgba(240,240,240,0.75)',
              lineHeight:  1.6,
            }}
          >
            When your child enrolls in The 16-Week Program, The Hangar is where the
            program lives between sessions. One Navigator. One cohort. One continuous loop.
          </p>

          {/* Button row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">

            {/* Primary — gilt */}
            <Link
              href={`/${locale}/consult`}
              className="w-full md:w-auto rounded-lg transition-all hover:opacity-90"
              style={{
                fontFamily:      'var(--font-latin)',
                fontWeight:      700,
                fontSize:        '16px',
                backgroundColor: '#F5C842',
                color:           '#0E0E12',
                padding:         '16px 32px',
                textDecoration:  'none',
                display:         'inline-block',
                textAlign:       'center',
                minWidth:        '280px',
              }}
            >
              Book a Diagnostic Call
            </Link>

            {/* Secondary — ghost */}
            <Link
              href={`/${locale}/program`}
              className="w-full md:w-auto rounded-lg transition-all hover:border-white"
              style={{
                fontFamily:      'var(--font-latin)',
                fontWeight:      500,
                fontSize:        '16px',
                backgroundColor: 'transparent',
                color:           '#F0F0F0',
                border:          '1.5px solid rgba(240,240,240,0.50)',
                padding:         '14px 32px',
                textDecoration:  'none',
                display:         'inline-block',
                textAlign:       'center',
                minWidth:        '280px',
              }}
            >
              See the Full Program
            </Link>

          </div>

          {/* Microcopy */}
          <p
            className="mt-4"
            style={{
              fontFamily:  'var(--font-latin)',
              fontWeight:  400,
              fontSize:    '13px',
              color:       '#b7b5fe',
            }}
          >
            The Hangar is included in every 16-Week Program enrollment. It is not an add-on.
          </p>

        </div>
      </Section>

    </div>
  )
}