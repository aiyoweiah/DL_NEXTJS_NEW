// app/[locale]/about/page.jsx
//
// /about — Direct translation of Figma variant-b.tsx into project patterns.
//
// Figma section order (preserved exactly):
//   1. Hero              — #0E0E12  full-bleed dark, 3-col text + 2-col video panel
//   2. TheNameSection    — #0E0E12→#212830 gradient, text left + circular Do+Do right
//   3. WhatWeBelieve     — #F5F5FF  horizontal row layout (NOT cards), 3 beliefs
//   4. TheLoop           — #212830  4-col steps with connecting line + icons
//   5. WhoNavigatorsAre  — #F5F5FF  2-col: image left w/ chip, text right + trait pills
//   6. FamiliesWeServe   — #0E0E12  3-col image cards, italic Gilt quote
//   7. ClosingStamp      — gradient dark, split h2 with gradient text
//
// Pure server component. Zero 'use client'.
// Framer-motion animations replaced with CSS (no client bundle).
// Images: placeholder divs — swap for <Image> once next.config.js allows
//   images.unsplash.com or client provides production assets.

import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'

// ── Metadata ──────────────────────────────────────────────────
export const metadata = buildMetadata({
  title: 'About DODO Learning — Think Once. In Both Languages.',
  description:
    'DODO Learning is a bilingual thinking program for globally mobile families ' +
    'who expect more than fluency. Navigator-led. Lexile-measured. ' +
    'The only live program that trains the full Read → Think → Speak → Write loop ' +
    'for Chinese-speaking diaspora families in Canada and the US.',
  path: '/about',
})

// ═══════════════════════════════════════════════════════════════
// SHARED — BilingualHeading
// ═══════════════════════════════════════════════════════════════
// Figma: BilingualHeadingB component
//   h2 (light=false → #0E0E12 | light=true → #F0F0F0)
//   Chinese subtitle always in #b7b5fe, fontSize 16, font-cjk
//   center prop applies text-center to wrapper

function BilingualHeading({ en, cn, light = false, center = false }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
          fontWeight: 600,
          lineHeight: 1.2,
          color: light ? '#F0F0F0' : '#0E0E12',
        }}
      >
        {en}
      </h2>
      <p
        className="mt-2"
        style={{
          fontFamily: 'var(--font-cjk)',
          fontSize: '16px',
          fontWeight: 500,
          color: '#b7b5fe',
        }}
      >
        {cn}
      </p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═══════════════════════════════════════════════════════════════
// Figma: bg-[#0E0E12], min-h-screen, items-center
//   gradient overlay: bg-gradient-to-b from-[#b7b5fe]/5 via-transparent to-transparent
//   max-w-7xl mx-auto px-6 lg:px-10, pt-32 pb-20
//   grid lg:grid-cols-5 gap-12 items-center
// Left (lg:col-span-3): badge → h1 (weight 300, #b7b5fe speak, #F5C842 thinks)
//   → Chinese subtitle #b7b5fe/50 → body #F0F0F0/50
// Right (lg:col-span-2): aspect-[3/4] rounded-3xl, Gilt play button, label

function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="about-hero-heading"
      style={{
        backgroundColor: '#0E0E12',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Figma: bg-gradient-to-b from-[#b7b5fe]/5 via-transparent to-transparent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(183,181,254,0.05) 0%, transparent 50%)',
        }}
      />

      <div
        className="container-section relative z-10 w-full"
        style={{
          paddingTop:    'calc(var(--nav-height-md) + 3.5rem)',
          paddingBottom: '5rem',
        }}
      >
        {/* Figma: grid lg:grid-cols-5 gap-12 items-center */}
        <div className="grid lg:grid-cols-5 gap-12 items-center">

          {/* ── Left — lg:col-span-3 ── */}
          <div className="lg:col-span-3">

            {/* Figma: pill badge — border border-[#b7b5fe]/20 bg-[#b7b5fe]/5 */}
            {/* pulse dot + "Our Story" uppercase label */}
            <div
              className="inline-flex items-center gap-2 mb-10 rounded-full"
              style={{
                padding:         '6px 16px',
                border:          '1px solid rgba(183,181,254,0.2)',
                backgroundColor: 'rgba(183,181,254,0.05)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#b7b5fe' }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontSize:      '12px',
                  fontWeight:    500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color:         '#b7b5fe',
                }}
              >
                Our Story
              </span>
            </div>

            {/* Figma: h1 fontWeight 300, clamp(2.25rem, 5.5vw, 4rem), color #F0F0F0 */}
            {/* "speaks" → #b7b5fe fontWeight 600 | "thinks" → #F5C842 fontWeight 600 */}
            <h1
              id="about-hero-heading"
              className="mb-6"
              style={{
                fontSize:      'clamp(2.25rem, 5.5vw, 4rem)',
                fontWeight:    300,
                lineHeight:    1.08,
                letterSpacing: '-0.02em',
                color:         '#F0F0F0',
              }}
            >
              A child who{' '}
              <em className="not-italic" style={{ fontWeight: 600, color: '#b7b5fe' }}>
                speaks
              </em>{' '}
              English
              <br />
              is not the same as a child
              <br />
              who{' '}
              <em className="not-italic" style={{ fontWeight: 600, color: '#F5C842' }}>
                thinks
              </em>{' '}
              in it.
            </h1>

            {/* Figma: Chinese subtitle — font-chinese fontSize 20 color #b7b5fe/50 */}
            <p
              className="mb-8"
              style={{
                fontFamily: 'var(--font-cjk)',
                fontSize:   '20px',
                color:      'rgba(183,181,254,0.5)',
              }}
            >
              会说英语的孩子，和用英语思考的孩子，是不一样的。
            </p>

            {/* Figma: body — fontSize 16, lineHeight 1.9, color #F0F0F0/50, max-w-lg */}
            <p
              style={{
                fontSize:   '16px',
                lineHeight: 1.9,
                color:      'rgba(240,240,240,0.5)',
                maxWidth:   '32rem',
              }}
            >
              Most bilingual children learn English as a subject. They pass exams
              and sound fluent. But ask them to argue, to build, to write something
              original — and the language falls apart. Our founder saw this gap and
              built DODO to close it.
            </p>

          </div>

          {/* ── Right — lg:col-span-2 ── */}
          {/* Figma: aspect-[3/4] rounded-3xl overflow-hidden */}
          {/* Inner: image brightness-50 + play button overlay + border overlay */}
          <div className="lg:col-span-2">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ aspectRatio: '3/4' }}
              aria-label="Video: Why DODO Exists — 3 minutes"
            >
              {/* Image placeholder — replace with <Image> + production asset */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, #161c28 0%, #2E3848 50%, #1a2030 100%)',
                }}
                aria-hidden="true"
              />

              {/* Figma: centred play button — w-20 h-20 rounded-full bg-[#F5C842] */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                aria-hidden="true"
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width:           80,
                    height:          80,
                    borderRadius:    '50%',
                    backgroundColor: '#F5C842',
                    boxShadow:       '0 8px 40px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Play triangle */}
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M11 8l14 8-14 8V8z" fill="#0E0E12" />
                  </svg>
                </div>
                <p
                  className="mt-4"
                  style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}
                >
                  Watch: Why DODO Exists
                </p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                  3 min
                </p>
              </div>

              {/* Figma: border border-[#b7b5fe]/10 on rounded-3xl */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{ border: '1px solid rgba(183,181,254,0.1)' }}
                aria-hidden="true"
              />
            </div>
          </div>

        </div>

        {/* Figma: ArrowDown animate-bounce, centred, mt-16 */}
        <div className="flex justify-center mt-16" aria-hidden="true">
          <svg
            width="20" height="20" viewBox="0 0 20 20" fill="none"
            style={{ color: 'rgba(183,181,254,0.3)', animation: 'bounce 2s infinite' }}
          >
            <path
              d="M10 3v11M4 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 2 — THE NAME
// ═══════════════════════════════════════════════════════════════
// Figma: gradient section — absolute bg from-[#0E0E12] via-[#212830] to-[#212830]
//   py-28, grid lg:grid-cols-2 gap-16 items-center
// Left: BilingualHeadingB (light) + body text (#F0F0F0/70) + Chinese body (#b7b5fe/50)
// Right: relative div → w-64 h-64 circle + inner ring + "Do + Do" text
//   gold dot (-top-2 -right-2) + lavender dot (-bottom-3 -left-3)

function TheNameSection() {
  return (
    <section
      className="relative"
      aria-labelledby="name-heading"
      style={{ padding: 'var(--section-md) 0' }}
    >
      {/* Figma: absolute bg-gradient-to-b from-[#0E0E12] via-[#212830] to-[#212830] */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #0E0E12 0%, #212830 40%, #212830 100%)',
        }}
      />

      <div className="container-section relative z-10">
        {/* Figma: grid lg:grid-cols-2 gap-16 items-center */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left — text ── */}
          <div>
            <BilingualHeading en="The Name" cn="名字的故事" light />

            {/* Figma: space-y-5, fontSize 17, lineHeight 1.9, color rgba(240,240,240,0.7) */}
            <div
              className="mt-10 space-y-5"
              style={{ fontSize: '17px', lineHeight: 1.9, color: 'rgba(240,240,240,0.7)' }}
            >
              <p>
                DODO comes from a simple, powerful idea:{' '}
                <strong style={{ color: '#F0F0F0' }}>Do + Do.</strong>
              </p>
              <p>
                Learning isn&rsquo;t passive. It&rsquo;s not about absorbing — it&rsquo;s
                about doing. Reading is doing. Thinking is doing. Speaking is doing.
                Writing is doing.
              </p>
              <p>
                The double &ldquo;Do&rdquo; is also a nod to the iterative nature of
                mastery. You don&rsquo;t learn a language once. You learn it by doing,
                then doing again — each time deeper, each time more your own.
              </p>
            </div>

            {/* Figma: Chinese body — font-chinese fontSize 15 lineHeight 1.8 color #b7b5fe/50 */}
            <p
              className="mt-6"
              style={{
                fontFamily: 'var(--font-cjk)',
                fontSize:   '15px',
                lineHeight: 1.8,
                color:      'rgba(183,181,254,0.5)',
              }}
            >
              DODO，源于"做"与"再做"。学习不是被动的吸收，而是主动的行动与反复的深化。
            </p>
          </div>

          {/* ── Right — circular Do+Do graphic ── */}
          <div className="flex items-center justify-center">
            <div className="relative">

              {/* Figma: w-64 h-64 rounded-full border-2 border-[#b7b5fe]/20 */}
              <div
                className="flex items-center justify-center"
                style={{
                  width:        256,
                  height:       256,
                  borderRadius: '50%',
                  border:       '2px solid rgba(183,181,254,0.2)',
                  position:     'relative',
                }}
              >
                {/* Figma: absolute inset-4 rounded-full border border-[#b7b5fe]/10 */}
                <div
                  aria-hidden="true"
                  style={{
                    position:     'absolute',
                    inset:        '1rem',
                    borderRadius: '50%',
                    border:       '1px solid rgba(183,181,254,0.1)',
                  }}
                />

                {/* Figma: "Do + Do" — flex items-center gap-4 */}
                <div
                  className="flex items-center gap-4 relative z-10"
                  aria-label="Do plus Do"
                >
                  <span
                    style={{
                      fontSize:      '56px',
                      fontWeight:    700,
                      color:         '#b7b5fe',
                      letterSpacing: '-0.02em',
                      lineHeight:    1,
                    }}
                  >
                    Do
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      fontSize:   '32px',
                      fontWeight: 300,
                      color:      '#F5C842',
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                  <span
                    style={{
                      fontSize:      '56px',
                      fontWeight:    700,
                      color:         '#b7b5fe',
                      letterSpacing: '-0.02em',
                      lineHeight:    1,
                    }}
                  >
                    Do
                  </span>
                </div>
              </div>

              {/* Figma: absolute -top-2 -right-2, w-6 h-6, bg-[#F5C842] */}
              <div
                aria-hidden="true"
                style={{
                  position:        'absolute',
                  top:             -8,
                  right:           -8,
                  width:           24,
                  height:          24,
                  borderRadius:    '50%',
                  backgroundColor: '#F5C842',
                }}
              />
              {/* Figma: absolute -bottom-3 -left-3, w-4 h-4, bg-[#b7b5fe]/40 */}
              <div
                aria-hidden="true"
                style={{
                  position:        'absolute',
                  bottom:          -12,
                  left:            -12,
                  width:           16,
                  height:          16,
                  borderRadius:    '50%',
                  backgroundColor: 'rgba(183,181,254,0.4)',
                }}
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3 — WHAT WE BELIEVE
// ═══════════════════════════════════════════════════════════════
// Figma: bg-[#F5F5FF] text-[#0E0E12], py-28
//   Centred BilingualHeadingB, mb-20
//   Horizontal rows — NOT card grid.
//   Per row: 12-col grid with:
//     col-span-1: number (#b7b5fe, fontSize 14, fontWeight 600)
//     col-span-1: icon in lavender circle (w-12 h-12)
//     col-span-5: belief quote (fontSize 20, fw 600) + Chinese (#b7b5fe, fontSize 14)
//     col-span-5: body text (#2E3848, fontSize 15, lineHeight 1.8)
//   Separated by border-b border-[#0E0E12]/8, last row no border

const BELIEFS = [
  {
    id:       'belief-1',
    num:      '01',
    belief:   'Language is a thinking tool, not a performance skill.',
    beliefCn: '语言是思维的工具，而非表演的技能。',
    body:
      'Fluency isn\'t about sounding right. It\'s about thinking clearly. ' +
      'We build the architecture of thought — in both languages.',
  },
  {
    id:       'belief-2',
    num:      '02',
    belief:   'Children don\'t need more content. They need better conversations.',
    beliefCn: '孩子们需要的不是更多内容，而是更好的对话。',
    body:
      'The best learning happens between people, not between a child and a screen. ' +
      'Every DODO session is a dialogue, not a lecture.',
  },
  {
    id:       'belief-3',
    num:      '03',
    belief:   'Bilingual means both. Not one at the cost of the other.',
    beliefCn: '双语意味着两者兼得，而非此消彼长。',
    body:
      'We don\'t teach English by replacing Chinese. We teach children to move ' +
      'fluidly between two worlds of thought.',
  },
]

// Belief icons — Brain, Sparkles, Globe — as inline SVG
function BeliefIcon({ id }) {
  const base = {
    width:             28,
    height:            28,
    viewBox:           '0 0 24 24',
    fill:              'none',
    stroke:            'currentColor',
    strokeWidth:       1.5,
    strokeLinecap:     'round',
    strokeLinejoin:    'round',
    'aria-hidden':     true,
  }
  if (id === 'belief-1') return (
    <svg {...base}>
      <path d="M9.5 2a4.5 4.5 0 0 0 0 9M14.5 2a4.5 4.5 0 0 1 0 9" />
      <path d="M5 10a4 4 0 0 0 4 4v6M19 10a4 4 0 0 1-4 4v6M9 20h6" />
    </svg>
  )
  if (id === 'belief-2') return (
    <svg {...base}>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M5 17l.75 2.25L8 20l-2.25.75L5 23" />
      <path d="M19 2l.5 1.5L21 4l-1.5.5L19 6" />
    </svg>
  )
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function WhatWeBelieve() {
  return (
    <section
      className="section-light"
      aria-labelledby="beliefs-heading"
    >
      <div className="container-section">

        {/* Figma: text-center, mb-20 */}
        <div className="mb-20 text-center">
          <BilingualHeading en="What We Believe" cn="我们的信念" center />
        </div>

        {/* Figma: space-y-0, horizontal rows */}
        <div>
          {BELIEFS.map((item, i) => (
            <div
              key={item.id}
              className="items-start py-12"
              style={{
                display:             'grid',
                gridTemplateColumns: '2.5rem 3.5rem 1fr 1fr',
                gap:                 '2rem',
                borderBottom:        i < BELIEFS.length - 1
                  ? '1px solid rgba(14,14,18,0.08)'
                  : 'none',
              }}
              aria-label={`Belief ${item.num}: ${item.belief}`}
            >
              {/* Figma: col-span-1 — number */}
              <div className="flex items-center pt-1">
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#b7b5fe' }}>
                  {item.num}
                </span>
              </div>

              {/* Figma: col-span-1 — icon in w-12 h-12 rounded-full bg-[#b7b5fe]/10 */}
              <div className="flex items-center">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width:           48,
                    height:          48,
                    borderRadius:    '50%',
                    backgroundColor: 'rgba(183,181,254,0.1)',
                    color:           '#b7b5fe',
                    flexShrink:      0,
                  }}
                  aria-hidden="true"
                >
                  <BeliefIcon id={item.id} />
                </div>
              </div>

              {/* Figma: col-span-5 — quote fontSize 20 fw 600 + Chinese subtitle */}
              <div>
                <p style={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.3, color: '#0E0E12' }}>
                  &ldquo;{item.belief}&rdquo;
                </p>
                <p
                  className="mt-2"
                  style={{ fontFamily: 'var(--font-cjk)', fontSize: '14px', color: '#b7b5fe' }}
                >
                  {item.beliefCn}
                </p>
              </div>

              {/* Figma: col-span-5 — body text #2E3848 fontSize 15 lineHeight 1.8 */}
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#2E3848' }}>
                {item.body}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 4 — THE LOOP
// ═══════════════════════════════════════════════════════════════
// Figma: bg-[#212830], py-28
//   Header: flex lg:flex-row lg:items-end lg:justify-between gap-6 mb-16
//     BilingualHeadingB (light) left + body right (#F0F0F0/40 max-w-md)
//   Steps: relative container
//     Connecting line: absolute top-14 left-[12.5%] right-[12.5%] h-px gradient
//     grid sm:grid-cols-2 lg:grid-cols-4 gap-0
//     Each step: text-center px-8 py-8
//       icon w-14 h-14 rounded-full bg-[#b7b5fe]/10 border-[#b7b5fe]/20 mx-auto mb-6
//       h3 text-white fontSize 24 fw 600 letterSpacing -0.01em
//       Chinese #b7b5fe/50 font-chinese fontSize 14 mb-4
//       body #F0F0F0/50 fontSize 14 lineHeight 1.7
//   Footer: centred "Explore Methodology" link + ChevronRight

const LOOP_STEPS = [
  {
    id:     'read',
    step:   'Read',
    stepCn: '阅读',
    desc:
      'Encounter ideas worth thinking about. Not textbooks — real stories, ' +
      'real arguments, real questions.',
  },
  {
    id:     'think',
    step:   'Think',
    stepCn: '思考',
    desc:
      'Process what you\'ve read. Form opinions. Make connections. ' +
      'This is where language becomes thinking.',
  },
  {
    id:     'speak',
    step:   'Speak',
    stepCn: '表达',
    desc:
      'Articulate your ideas aloud. Defend them. Refine them. ' +
      'Speaking isn\'t output — it\'s processing.',
  },
  {
    id:     'write',
    step:   'Write',
    stepCn: '书写',
    desc:
      'Commit your thinking to paper. Writing is the proof that a language ' +
      'truly belongs to you.',
  },
]

function LoopStepIcon({ id }) {
  const base = {
    width: 24, height: 24, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round',
  }
  if (id === 'read') return (
    <svg {...base} aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
  if (id === 'think') return (
    <svg {...base} aria-hidden="true">
      <path d="M9.5 2a4.5 4.5 0 0 0 0 9M14.5 2a4.5 4.5 0 0 1 0 9" />
      <path d="M5 10a4 4 0 0 0 4 4v6M19 10a4 4 0 0 1-4 4v6M9 20h6" />
    </svg>
  )
  if (id === 'speak') return (
    <svg {...base} aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
  return (
    <svg {...base} aria-hidden="true">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}

function TheLoop() {
  return (
    <section
      className="section-dark"
      aria-labelledby="loop-section-heading"
    >
      <div className="container-section">

        {/* Figma: flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <BilingualHeading en="The Loop" cn="学习循环" light />
          <p
            className="max-w-md"
            style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(240,240,240,0.4)' }}
          >
            Every session follows the same cycle. Simple in structure.
            Profound in effect.
          </p>
        </div>

        {/* Figma: relative container for absolute connecting line */}
        <div className="relative">

          {/* Figma: absolute top-14 left-[12.5%] right-[12.5%] h-px gradient */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute"
            style={{
              top:        '3.5rem',
              left:       '12.5%',
              right:      '12.5%',
              height:     '1px',
              background: 'linear-gradient(to right, rgba(183,181,254,0) 0%, rgba(183,181,254,0.2) 50%, rgba(183,181,254,0) 100%)',
            }}
          />

          {/* Figma: grid sm:grid-cols-2 lg:grid-cols-4 gap-0 */}
          <ol
            className="grid sm:grid-cols-2 lg:grid-cols-4"
            aria-label="The Loop methodology"
          >
            {LOOP_STEPS.map((item) => (
              <li key={item.id} className="text-center px-8 py-8">

                {/* Figma: w-14 h-14 rounded-full bg-[#b7b5fe]/10 border border-[#b7b5fe]/20 mx-auto mb-6 relative z-10 */}
                <div
                  className="flex items-center justify-center mx-auto mb-6 relative z-10"
                  style={{
                    width:           56,
                    height:          56,
                    borderRadius:    '50%',
                    backgroundColor: 'rgba(183,181,254,0.1)',
                    border:          '1px solid rgba(183,181,254,0.2)',
                    color:           '#b7b5fe',
                  }}
                  aria-hidden="true"
                >
                  <LoopStepIcon id={item.id} />
                </div>

                {/* Figma: h3 text-white fontSize 24 fontWeight 600 letterSpacing -0.01em mb-1 */}
                <h3
                  style={{
                    fontSize:      '24px',
                    fontWeight:    600,
                    letterSpacing: '-0.01em',
                    color:         '#ffffff',
                    marginBottom:  '4px',
                  }}
                >
                  {item.step}
                </h3>

                {/* Figma: Chinese label font-chinese fontSize 14 #b7b5fe/50 mb-4 */}
                <p
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-cjk)',
                    fontSize:   '14px',
                    color:      'rgba(183,181,254,0.5)',
                  }}
                >
                  {item.stepCn}
                </p>

                {/* Figma: body #F0F0F0/50 fontSize 14 lineHeight 1.7 */}
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(240,240,240,0.5)' }}>
                  {item.desc}
                </p>

              </li>
            ))}
          </ol>
        </div>

        {/* Figma: text-center mt-12, uppercase link with ChevronRight */}
        <div className="text-center mt-12">
          <Link
            href="/methodology"
            className="inline-flex items-center gap-2"
            style={{
              fontSize:      '13px',
              fontWeight:    600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color:         '#b7b5fe',
              textDecoration:'none',
            }}
          >
            Explore Methodology
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 5 — WHO NAVIGATORS ARE
// ═══════════════════════════════════════════════════════════════
// Figma: bg-[#F5F5FF] text-[#0E0E12], py-28
//   grid lg:grid-cols-2 gap-16 items-center
// Left (order-2 lg:order-1): rounded-3xl image h-[520px] + absolute chip
//   chip: absolute -bottom-6 -right-6, bg-[#b7b5fe], rounded-2xl px-6 py-4
//   "Not teachers." (fw 600 #0E0E12) / "Navigators." (fw 500 #0E0E12/70)
// Right (order-1 lg:order-2): BilingualHeadingB + body (#2E3848) + trait pills
//   Pills: bg-[#0E0E12] text-white rounded-full, symbol in #b7b5fe

const NAVIGATOR_TRAITS = [
  { trait: 'Curious',            symbol: '?' },
  { trait: 'Patient',            symbol: '~' },
  { trait: 'Bilingual Thinkers', symbol: 'AB' },
  { trait: 'Empathetic',         symbol: '♡' },
  { trait: 'Rigorous',           symbol: '◈' },
]

function WhoNavigatorsAre() {
  return (
    <section
      className="section-light"
      aria-labelledby="navigators-heading"
    >
      <div className="container-section">

        {/* Figma: grid lg:grid-cols-2 gap-16 items-center */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left — image (order-2 mobile, order-1 lg) ── */}
          <div className="order-2 lg:order-1">
            <div className="relative">

              {/* Figma: rounded-3xl overflow-hidden, h-[520px] */}
              <div
                className="rounded-3xl overflow-hidden"
                style={{ height: '520px' }}
                aria-label="A DODO Navigator in session"
              >
                {/* Image placeholder — replace with <Image> */}
                <div
                  className="w-full h-full"
                  style={{
                    background:
                      'linear-gradient(135deg, #e8e7f8 0%, #d4d3f0 40%, #c0bfea 100%)',
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Figma: absolute -bottom-6 -right-6, bg-[#b7b5fe], rounded-2xl px-6 py-4 */}
              <div
                className="absolute rounded-2xl px-6 py-4"
                style={{ bottom: -24, right: -24, backgroundColor: '#b7b5fe' }}
                aria-hidden="true"
              >
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#0E0E12' }}>
                  Not teachers.
                </p>
                <p style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(14,14,18,0.7)' }}>
                  Navigators.
                </p>
              </div>

            </div>
          </div>

          {/* ── Right — text (order-1 mobile, order-2 lg) ── */}
          <div className="order-1 lg:order-2">

            <BilingualHeading en="Who Navigators Are" cn="关于领航员" />

            {/* Figma: space-y-5, fontSize 16, lineHeight 1.85, color #2E3848 */}
            <div
              className="mt-8 space-y-5"
              style={{ fontSize: '16px', lineHeight: 1.85, color: '#2E3848' }}
            >
              <p>
                We don&rsquo;t call them teachers. We call them{' '}
                <strong style={{ color: '#0E0E12' }}>Navigators</strong> — because
                they don&rsquo;t stand at the front and lecture. They sit beside
                your child and guide.
              </p>
              <p>
                A Navigator is the kind of person who asks questions they don&rsquo;t
                already know the answer to. Who gets genuinely curious about what a
                seven-year-old thinks about fairness.
              </p>
              <p>
                They&rsquo;re readers. They&rsquo;re thinkers. They care about language
                not because it&rsquo;s their job, but because it&rsquo;s how they make
                sense of everything.
              </p>
            </div>

            {/* Figma: flex-wrap gap-3 mt-10, pill chips bg-[#0E0E12] text-white */}
            <div className="flex flex-wrap gap-3 mt-10" aria-label="Navigator traits">
              {NAVIGATOR_TRAITS.map((item) => (
                <span
                  key={item.trait}
                  className="inline-flex items-center gap-2 rounded-full"
                  style={{
                    padding:         '10px 20px',
                    backgroundColor: '#0E0E12',
                    color:           '#ffffff',
                    fontSize:        '13px',
                    fontWeight:      500,
                  }}
                >
                  <span aria-hidden="true" style={{ fontSize: '11px', color: '#b7b5fe' }}>
                    {item.symbol}
                  </span>
                  {item.trait}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 6 — THE FAMILIES WE SERVE
// ═══════════════════════════════════════════════════════════════
// Figma: bg-[#0E0E12], py-28
//   Centred BilingualHeadingB (light), mb-16
//   grid lg:grid-cols-3 gap-6
//   Cards: rounded-3xl overflow-hidden bg-[#212830] border border-white/5
//     hover:border-[#b7b5fe]/20
//   h-52 image, p-8 body:
//     Gilt italic quote (fontSize 13 fontStyle italic)
//     h3 text-white fontSize 20 fw 600
//     Chinese subtitle #b7b5fe/50 font-chinese fontSize 13 mb-4
//     body #F0F0F0/50 fontSize 14 lineHeight 1.75

const FAMILIES = [
  {
    id:       'family-1',
    title:    'The Bilingual Home',
    titleCn:  '双语家庭',
    quote:    '"That\'s us — two languages, one family."',
    desc:
      'You speak two languages at home and you want your child to feel equally ' +
      'powerful in both. Not just conversational — intellectually fluent.',
    imgBg:    'linear-gradient(135deg, #142318 0%, #1e3526 60%, #142318 100%)',
  },
  {
    id:       'family-2',
    title:    'The Global Family',
    titleCn:  '国际化家庭',
    quote:    '"We move between worlds. So does our child."',
    desc:
      'You\'ve moved countries — maybe more than once. Your child navigates cultures ' +
      'daily, and you want their English to match the complexity of their life.',
    imgBg:    'linear-gradient(135deg, #131c2e 0%, #1e2a40 60%, #131c2e 100%)',
  },
  {
    id:       'family-3',
    title:    'The Ambitious Learner',
    titleCn:  '志向远大的学习者',
    quote:    '"Good isn\'t enough. We want depth."',
    desc:
      'Your child is already good at English. Maybe even great. But you sense ' +
      'there\'s a ceiling — and the current system isn\'t going to break through it.',
    imgBg:    'linear-gradient(135deg, #2a1218 0%, #3a1e24 60%, #2a1218 100%)',
  },
]

function FamiliesWeServe() {
  return (
    <section
      className="section-darker"
      aria-labelledby="families-heading"
    >
      <div className="container-section">

        {/* Figma: centred BilingualHeadingB (light) mb-16 */}
        <div className="mb-16">
          <BilingualHeading
            en="The Families We Serve"
            cn="我们服务的家庭"
            light
            center
          />
        </div>

        {/* Figma: grid lg:grid-cols-3 gap-6 */}
        <div className="grid lg:grid-cols-3 gap-6">
          {FAMILIES.map((family) => (
            <article
              key={family.id}
              className="group relative rounded-3xl overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: '#212830',
                border:          '1px solid rgba(255,255,255,0.05)',
              }}
              aria-label={`Family: ${family.title}`}
            >
              {/* Figma: h-52 image, brightness-75, hover brightness-90 scale-105 */}
              <div
                className="overflow-hidden"
                style={{ height: '13rem' }}
                aria-hidden="true"
              >
                {/* Placeholder — swap for <Image> with production photo */}
                <div
                  className="w-full h-full"
                  style={{ background: family.imgBg }}
                />
              </div>

              {/* Figma: p-8 card body */}
              <div className="p-8">

                {/* Figma: Gilt italic quote fontSize 13 fontStyle italic mb-3 */}
                <p
                  className="mb-3"
                  style={{
                    fontSize:  '13px',
                    fontWeight: 500,
                    fontStyle: 'italic',
                    color:     '#F5C842',
                  }}
                >
                  {family.quote}
                </p>

                {/* Figma: h3 text-white fontSize 20 fontWeight 600 */}
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff' }}>
                  {family.title}
                </h3>

                {/* Figma: Chinese subtitle #b7b5fe/50 font-chinese fontSize 13 mb-4 */}
                <p
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-cjk)',
                    fontSize:   '13px',
                    color:      'rgba(183,181,254,0.5)',
                  }}
                >
                  {family.titleCn}
                </p>

                {/* Figma: body #F0F0F0/50 fontSize 14 lineHeight 1.75 */}
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'rgba(240,240,240,0.5)' }}>
                  {family.desc}
                </p>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 7 — CLOSING STAMP
// ═══════════════════════════════════════════════════════════════
// Figma: relative overflow-hidden, py-40, max-w-4xl mx-auto, text-center
//   BG: absolute bg-gradient-to-b from-[#0E0E12] via-[#212830] to-[#0E0E12]
//   + absolute radial-gradient lavender glow
//   Heart icon: w-16 h-16 rounded-full bg-[#b7b5fe]/10 border-[#b7b5fe]/20 mb-10
//   h2 "Think Once." — fontWeight 300, color #ffffff, mb-0.5rem
//   h2 "In Both Languages." — fontWeight 700, gradient #b7b5fe → #F5C842, mb-6
//   Chinese subtitle: #b7b5fe/50 font-chinese fontSize 22, mb-6
//   Body: #F0F0F0/40 fontSize 16 lineHeight 1.9 max-w-lg mb-12
//   CTA: bg-[#F5C842] text-[#0E0E12] rounded-full hover:shadow-gilt

function ClosingStamp() {
  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="about-closing-heading"
    >
      {/* Figma: absolute bg-gradient-to-b from-[#0E0E12] via-[#212830] to-[#0E0E12] */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #0E0E12 0%, #212830 50%, #0E0E12 100%)',
        }}
      />
      {/* Figma: absolute radial-gradient lavender glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(183,181,254,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Figma: max-w-4xl mx-auto px-6 py-40 text-center */}
      <div
        className="relative z-10 text-center mx-auto"
        style={{ maxWidth: '56rem', padding: '10rem 1.5rem' }}
      >

        {/* Figma: Heart icon circle — w-16 h-16 bg-[#b7b5fe]/10 border-[#b7b5fe]/20 mb-10 */}
        <div
          className="flex items-center justify-center mx-auto mb-10"
          style={{
            width:           64,
            height:          64,
            borderRadius:    '50%',
            backgroundColor: 'rgba(183,181,254,0.1)',
            border:          '1px solid rgba(183,181,254,0.2)',
            color:           '#b7b5fe',
          }}
          aria-hidden="true"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>

        {/* Figma: TWO separate h2 elements */}
        {/* First: fontWeight 300, color white, fontSize clamp(2rem,5vw,3.5rem) */}
        <h2
          id="about-closing-heading"
          style={{
            fontSize:      'clamp(2rem, 5vw, 3.5rem)',
            fontWeight:    300,
            lineHeight:    1.15,
            letterSpacing: '-0.02em',
            color:         '#ffffff',
            marginBottom:  '0.5rem',
          }}
        >
          Think Once.
        </h2>
        {/* Second: fontWeight 700, gradient text #b7b5fe → #F5C842 */}
        <h2
          className="mb-6"
          style={{
            fontSize:              'clamp(2rem, 5vw, 3.5rem)',
            fontWeight:            700,
            lineHeight:            1.15,
            letterSpacing:         '-0.02em',
            background:            'linear-gradient(135deg, #b7b5fe 0%, #F5C842 100%)',
            WebkitBackgroundClip:  'text',
            WebkitTextFillColor:   'transparent',
            backgroundClip:        'text',
          }}
          aria-label="In Both Languages."
        >
          In Both Languages.
        </h2>

        {/* Figma: Chinese subtitle — font-chinese fontSize 22 #b7b5fe/50 mb-6 */}
        <p
          className="mb-6"
          style={{
            fontFamily: 'var(--font-cjk)',
            fontSize:   '22px',
            color:      'rgba(183,181,254,0.5)',
          }}
        >
          一次思考，两种语言。
        </p>

        {/* Figma: body — #F0F0F0/40 fontSize 16 lineHeight 1.9 max-w-lg mb-12 */}
        <p
          className="mx-auto mb-12"
          style={{
            fontSize:   '16px',
            lineHeight: 1.9,
            color:      'rgba(240,240,240,0.4)',
            maxWidth:   '32rem',
          }}
        >
          Not a tagline. A philosophy. Every session, every conversation, every
          written word at DODO is built on this single truth: real bilingualism
          means thinking — not translating.
        </p>

        {/* Figma: bg-[#F5C842] text-[#0E0E12] rounded-full hover:shadow-[0_0_40px_rgba(245,200,66,0.3)] */}
        <Link
          href="/consult"
          className="btn btn-charter"
          style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.02em', padding: '1rem 2.5rem' }}
          aria-label="Start your child's journey — book a consultation"
        >
          Start Your Child&rsquo;s Journey
        </Link>

      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// PAGE EXPORT
// ═══════════════════════════════════════════════════════════════

export default function AboutPage() {
  return (
    <>
      <Hero />
      <TheNameSection />
      <WhatWeBelieve />
      <TheLoop />
      <WhoNavigatorsAre />
      <FamiliesWeServe />
      <ClosingStamp />
    </>
  )
}