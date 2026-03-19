// app/[locale]/navigators/page.jsx
// Pure server component — no 'use client', zero external dependencies.
//
// Direct translation of src/app/Navigators.tsx (Figma Make tUKokxMK9eHkSortCPKzTX)
// into Next.js App Router patterns. Every measurement, colour, and type spec
// is taken verbatim from the Figma source.
//
// Section rhythm (8 sections — exact from Figma):
//   S1  Hero                        — gradient #2E3848→#212830, ghost type, #b7b5fe spans
//   S2  What a Navigator Is Not     — #0E0E12, 3-col divider grid, strikethrough labels
//   S3  What a Navigator Does       — #212830, 4-col loop steps, 3px lavender top rule
//   S4  The Navigator Relationship  — #F5F5FF, 2-col image + copy
//   S5  Navigator Profiles          — #0E0E12, 2-col cards, photo + quote + badge + result
//   S6  A Real Session              — #F5F5FF, single white card, timeline breakdown
//   S7  What Families Say           — #212830, 2×2 testimonial grid
//   S8  Closing CTA                 — #0E0E12, gilt button, echo of hero h1
//
// Figma → Next.js adaptations:
//   ImageWithFallback → <img> (external Unsplash URLs, no next/image needed)
//   button onClick (scrollToCalendar) → <Link href={`/${locale}/consult`}> (SSR-safe)
//   max-w-7xl mx-auto px-6 → container-section (established project pattern)
//   py-24 / py-32 → kept verbatim
//
// Content: TODO: migrate to content/en/navigators.json + content/zh/navigators.json

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'

export const metadata = buildMetadata({
  locale,
  title:       'The Navigators',
  description:
    'DODO Navigators are not teachers or tutors. They are longitudinal partners ' +
    'who know your child\'s Lexile baseline, their 6+1 Trait writing profile, ' +
    'and exactly where they need to go next. Meet the Navigators.',
  path: '/navigators',
})

// ─────────────────────────────────────────────────────────────
// INLINE SVG ICON
// ─────────────────────────────────────────────────────────────
function IconArrowRight({ style }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// Eyebrow spec from Figma Navigators.tsx:
//   fontSize 12px · fontWeight 500 · letterSpacing 0.1em · uppercase · #b7b5fe
// (Consult page was 11px/600/0.15em — Navigators is intentionally slightly looser)
// ─────────────────────────────────────────────────────────────
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

// Badge pill — identical to ConsultBadge / about page
function Badge({ children }) {
  return (
    <span
      style={{
        display:         'inline-block',
        fontFamily:      'var(--font-latin)',
        fontSize:        '12px',
        fontWeight:      500,
        color:           '#b7b5fe',
        backgroundColor: 'rgba(183,181,254,0.15)',
        borderRadius:    '9999px',
        padding:         '4px 12px',
        marginRight:     '8px',
        marginBottom:    '8px',
      }}
    >
      {children}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────
// DATA — TODO: migrate to content/en/navigators.json
// ─────────────────────────────────────────────────────────────

// S3 — Loop step data (exact from Figma)
const LOOP_STEPS = [
  {
    num:        '01',
    phase:      'READ',
    headline:   "Selects the day's text at precisely the right Lexile — above comfort, below frustration.",
    sub:        'Lexile-calibrated text selection',
  },
  {
    num:        '02',
    phase:      'THINK',
    headline:   "Holds space for the student's own thinking. Does not fill the silence. Waits for the idea.",
    sub:        'Socratic silence — not lecture',
  },
  {
    num:        '03',
    phase:      'SPEAK',
    headline:   "Draws out the student's position through Socratic dialogue. Then challenges it.",
    sub:        'Spoken argument — defended, not performed',
  },
  {
    num:        '04',
    phase:      'WRITE',
    headline:   'Assesses the written response live against 6+1 Traits. Scores are specific. Feedback is precise.',
    sub:        '6+1 Trait framework — named scores',
  },
]

// S4 — Relationship copy (exact from Figma)
const RELATIONSHIP_POINTS = [
  {
    label: 'Matching',
    body:  "Navigators are matched to students — not assigned. Before the first session, DODO assesses your child's Lexile baseline, their 6+1 Trait writing profile, and their communication style. The match is intentional.",
  },
  {
    label: 'Longitudinal',
    body:  "Your child's Navigator carries their full history. Every Lexile score. Every session note. Every moment where a concept clicked or didn't. There is no starting over. There is no new face.",
  },
  {
    label: 'Gap tracking',
    body:  'A Navigator does not prepare a lesson plan. They prepare for your specific child — where they are this week, what the gap is, and which part of The Loop will close it.',
  },
  {
    label: 'The Hangar',
    body:  "Between sessions, The Hangar extends the relationship — Navigator-supported, student-driven. The work doesn't stop when the screen closes.",
  },
]

// S5 — Navigator profiles (exact from Figma — updated by client)
const NAVIGATORS = [
  {
    name:   'Laura Mitchell',
    photo:  'https://images.unsplash.com/photo-1758685848001-0396a85ba84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    alt:    'Laura Mitchell — Navigator',
    bio:    'Background in composition and academic writing — taught at secondary and post-secondary level.',
    quote:  "I'm most interested in the moment before the student writes — the thinking they haven't found words for yet.",
    badges: ['Lexile Specialist', '6+1 Certified'],
    result: 'Student, Grade 6 · Vancouver',
    lexile: 'Lexile 660 → 810 · 16 weeks',
  },
  {
    name:   'James Chen',
    photo:  'https://images.unsplash.com/photo-1771050889377-b68415885c64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    alt:    'James Chen — Navigator',
    bio:    'Specialized in critical reading and argumentation — extensive work with multilingual learners.',
    quote:  'The Loop is where the student discovers they already know how to think — they just needed structure to see it.',
    badges: ['Lexile Specialist', '6+1 Certified'],
    result: 'Student, Grade 8 · Toronto',
    lexile: 'Lexile 720 → 920 · 16 weeks',
  },
]

// S6 — Session timeline (exact from Figma)
const SESSION_TIMELINE = [
  {
    label: 'Minute 0–5: Assessment',
    body:  "Navigator reviews last session's notes and The Hangar activity. They know where the student struggled, what clicked, and what needs reinforcement today.",
  },
  {
    label: 'Minute 5–20: Read & Think',
    body:  'Student reads a Lexile-calibrated text. Navigator asks one open question. Then waits. The silence is intentional — this is where thinking happens.',
  },
  {
    label: 'Minute 20–35: Speak & Challenge',
    body:  "Student articulates their position. Navigator listens, then challenges with a Socratic follow-up. The goal isn't agreement — it's precision.",
  },
  {
    label: 'Minute 35–50: Write & Score',
    body:  'Student writes their argument. Navigator scores live using 6+1 Traits — Ideas: 4/6, Organization: 5/6. Feedback is specific, not generic. The score names the gap.',
  },
  {
    label: 'Minute 50–60: Next Steps',
    body:  'Navigator assigns work in The Hangar — targeted to the gap identified today. Parent receives session notes with Lexile progress and specific next-session focus.',
  },
]

// S7 — Testimonials (exact from Figma)
const TESTIMONIALS = [
  {
    quote:   "We tried three tutors before DODO. Every time, it was the same: homework help, then back to square one next week. With her Navigator, my daughter finally has someone who remembers her — what she struggles with, what she's good at, where she needs to go next. It's the first time I've seen actual progress.",
    city:    'Parent, Vancouver',
    detail:  'Student: Grade 7 · 16 weeks with Navigator Laura',
  },
  {
    quote:   "The difference is specificity. Before DODO, teachers would say 'needs improvement in writing.' His Navigator told us exactly where the gap was — sentence structure, supporting evidence — and we watched those scores go up week by week. Numbers don't lie.",
    city:    'Parent, Toronto',
    detail:  'Student: Grade 6 · 16 weeks with Navigator James',
  },
  {
    quote:   "My son doesn't like talking in class. But with his Navigator, he talks. She knows when to wait, when to push, when to let him think. I've never seen him engage like this. It's not magic — it's the relationship.",
    city:    'Parent, Montreal',
    detail:  'Student: Grade 5 · 16 weeks with Navigator Alicia',
  },
  {
    quote:   "The Hangar was the surprise. Between sessions, my daughter's Navigator leaves her targeted work — not busywork. She actually does it because it's connected to what they talked about. The learning doesn't stop at 60 minutes.",
    city:    'Parent, Calgary',
    detail:  'Student: Grade 8 · 16 weeks with Navigator Laura',
  },
]

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return localeParams()
}

export default function NavigatorsPage({ params }) {
  const locale = params?.locale ?? 'en'
  if (!isValidLocale(locale)) notFound()
  return (
    <div className="w-full overflow-hidden" style={{ fontFamily: 'var(--font-latin)' }}>

      {/* ══ S1 HERO ══════════════════════════════════════════
          Figma: linear-gradient(to bottom, #2E3848 0%, #212830 60%)
          Ghost type: "NAVIGATOR" 280px fw700 #b7b5fe opacity 0.04
          Eyebrow 12px / h1 with two #b7b5fe inline spans / subhead
      ════════════════════════════════════════════════════════ */}
      <section
        className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #2E3848 0%, #212830 60%)',
        }}
      >
        {/* Ghost typographic watermark — exact from Figma */}
        <div
          className="absolute bottom-0 right-0 select-none pointer-events-none"
          aria-hidden="true"
          style={{
            fontSize:   '280px',
            fontWeight: 700,
            color:      '#b7b5fe',
            opacity:    0.04,
            lineHeight: 1,
            transform:  'translateX(15%)',
          }}
        >
          NAVIGATOR
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Eyebrow center>The Navigators</Eyebrow>

          <h1
            className="mb-8 mx-auto"
            style={{
              fontSize:   'clamp(38px, 5vw, 68px)',
              fontWeight: 700,
              color:      '#F0F0F0',
              lineHeight: 1.2,
              maxWidth:   '760px',
            }}
          >
            Your child doesn&rsquo;t need another teacher. They need someone who knows exactly{' '}
            <span style={{ color: '#b7b5fe' }}>where they are</span> — and exactly{' '}
            <span style={{ color: '#b7b5fe' }}>where they&rsquo;re going</span>.
          </h1>

          <p
            className="mx-auto"
            style={{
              fontSize:   'clamp(16px, 2vw, 20px)',
              fontWeight: 400,
              color:      '#F0F0F0',
              opacity:    0.8,
              maxWidth:   '580px',
              lineHeight: 1.6,
            }}
          >
            Most programs teach the content. A Navigator teaches the thinker.
          </p>
        </div>
      </section>

      {/* ══ S2 WHAT A NAVIGATOR IS NOT ═══════════════════════
          Figma: #0E0E12, 3-col grid, md:border-r rgba(183,181,254,0.2)
          Strikethrough label → lavender h3 → body copy
          Column padding: pr-12 / px-12 / pl-12
      ════════════════════════════════════════════════════════ */}
      <section
        className="px-6 py-24"
        style={{ backgroundColor: '#0E0E12' }}
      >
        <div className="container-section">
          <Eyebrow center>Reframe</Eyebrow>

          <h2
            className="text-center mb-16"
            style={{
              fontSize:   'clamp(28px, 4vw, 42px)',
              fontWeight: 600,
              color:      '#F0F0F0',
              lineHeight: 1.3,
            }}
          >
            Let&rsquo;s clear up what a Navigator is — by starting with what they&rsquo;re not.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">

            {/* Column 1 */}
            <div
              className="md:pr-12 md:border-r"
              style={{ borderColor: 'rgba(183,181,254,0.2)' }}
            >
              <div
                className="mb-3 line-through"
                style={{
                  fontSize:   '13px',
                  fontWeight: 500,
                  color:      '#F0F0F0',
                  opacity:    0.5,
                }}
              >
                Not a teacher
              </div>
              <div
                className="mb-4"
                style={{
                  fontSize:   '20px',
                  fontWeight: 700,
                  color:      '#b7b5fe',
                }}
              >
                A guide with a map
              </div>
              <p
                style={{
                  fontSize:   '15px',
                  fontWeight: 400,
                  color:      '#F0F0F0',
                  opacity:    0.7,
                  lineHeight: 1.6,
                }}
              >
                Teachers move the class forward. A Navigator moves your child — from exactly where they are.
              </p>
            </div>

            {/* Column 2 */}
            <div
              className="md:px-12 md:border-r"
              style={{ borderColor: 'rgba(183,181,254,0.2)' }}
            >
              <div
                className="mb-3 line-through"
                style={{
                  fontSize:   '13px',
                  fontWeight: 500,
                  color:      '#F0F0F0',
                  opacity:    0.5,
                }}
              >
                Not a tutor
              </div>
              <div
                className="mb-4"
                style={{
                  fontSize:   '20px',
                  fontWeight: 700,
                  color:      '#b7b5fe',
                }}
              >
                A longitudinal partner
              </div>
              <p
                style={{
                  fontSize:   '15px',
                  fontWeight: 400,
                  color:      '#F0F0F0',
                  opacity:    0.7,
                  lineHeight: 1.6,
                }}
              >
                Tutors fix tonight&rsquo;s homework. A Navigator tracks your child&rsquo;s specific gaps across 16 weeks.
              </p>
            </div>

            {/* Column 3 */}
            <div className="md:pl-12">
              <div
                className="mb-3 line-through"
                style={{
                  fontSize:   '13px',
                  fontWeight: 500,
                  color:      '#F0F0F0',
                  opacity:    0.5,
                }}
              >
                Not an instructor
              </div>
              <div
                className="mb-4"
                style={{
                  fontSize:   '20px',
                  fontWeight: 700,
                  color:      '#b7b5fe',
                }}
              >
                Someone who knows your child&rsquo;s voice
              </div>
              <p
                style={{
                  fontSize:   '15px',
                  fontWeight: 400,
                  color:      '#F0F0F0',
                  opacity:    0.7,
                  lineHeight: 1.6,
                }}
              >
                Instructors deliver content. A Navigator knows when your child goes quiet — and why.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ══ S3 WHAT A NAVIGATOR ACTUALLY DOES ════════════════
          Figma: #212830, 4-col grid
          Each step: step number (14px fw300 #b7b5fe opacity 0.5)
                     → borderTop 3px solid #b7b5fe
                     → phase name (22px fw700 #b7b5fe)
                     → headline (16px fw600 #F0F0F0)
                     → sub (14px fw400 #F0F0F0 opacity 0.65)
      ════════════════════════════════════════════════════════ */}
      <section
        className="px-6 py-24"
        style={{ backgroundColor: '#212830' }}
      >
        <div className="container-section">
          <Eyebrow center>The Work</Eyebrow>

          <h2
            className="text-center mb-16"
            style={{
              fontSize:   'clamp(28px, 4vw, 42px)',
              fontWeight: 600,
              color:      '#F0F0F0',
              lineHeight: 1.3,
            }}
          >
            Four phases. One Navigator. Every session.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {LOOP_STEPS.map(({ num, phase, headline, sub }) => (
              <div key={num} className="relative">
                {/* Step number */}
                <div
                  className="mb-2"
                  style={{
                    fontSize:   '14px',
                    fontWeight: 300,
                    color:      '#b7b5fe',
                    opacity:    0.5,
                  }}
                >
                  {num}
                </div>
                {/* 3px top rule — exact from Figma */}
                <div
                  className="mb-6"
                  style={{
                    borderTop: '3px solid #b7b5fe',
                    width:     '100%',
                  }}
                />
                {/* Phase name */}
                <div
                  className="mb-4"
                  style={{
                    fontSize:   '22px',
                    fontWeight: 700,
                    color:      '#b7b5fe',
                  }}
                >
                  {phase}
                </div>
                {/* Headline */}
                <p
                  className="mb-3"
                  style={{
                    fontSize:   '16px',
                    fontWeight: 600,
                    color:      '#F0F0F0',
                    lineHeight: 1.5,
                  }}
                >
                  {headline}
                </p>
                {/* Sub */}
                <p
                  style={{
                    fontSize:   '14px',
                    fontWeight: 400,
                    color:      '#F0F0F0',
                    opacity:    0.65,
                    lineHeight: 1.5,
                  }}
                >
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S4 THE NAVIGATOR–STUDENT RELATIONSHIP ════════════
          Figma: #F5F5FF, 2-col grid — image (order-2 md:order-1) + copy (order-1 md:order-2)
          Image: rounded-lg, w-full h-auto
          Copy: 4 strong-labelled paragraphs
      ════════════════════════════════════════════════════════ */}
      <section
        className="px-6 py-24"
        style={{ backgroundColor: '#F5F5FF' }}
      >
        <div className="container-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left — Image */}
            <div className="order-2 md:order-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1673515335586-f9f662c01482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80"
                alt="Navigator and student in a live online session"
                className="w-full h-auto rounded-lg"
                style={{ display: 'block' }}
              />
            </div>

            {/* Right — Copy */}
            <div className="order-1 md:order-2">
              <Eyebrow>The Relationship</Eyebrow>

              <h2
                className="mb-8"
                style={{
                  fontSize:  'clamp(28px, 4vw, 42px)',
                  fontWeight: 700,
                  color:     '#0E0E12',
                  lineHeight: 1.3,
                  maxWidth:  '480px',
                }}
              >
                The same Navigator. Every session. Sixteen weeks.
              </h2>

              <div className="space-y-5">
                {RELATIONSHIP_POINTS.map(({ label, body }) => (
                  <p
                    key={label}
                    style={{
                      fontSize:   '16px',
                      fontWeight: 400,
                      color:      '#212830',
                      lineHeight: 1.6,
                    }}
                  >
                    <strong
                      style={{
                        fontWeight: 600,
                        color:      '#0E0E12',
                      }}
                    >
                      {label}:
                    </strong>{' '}
                    {body}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ S5 NAVIGATOR PROFILES ════════════════════════════
          Figma: #0E0E12, max-w-5xl, 2-col grid
          Card: #2E3848, borderTop 3px solid #b7b5fe, p-8, rounded-lg
          Photo: w-24 h-24, rounded-lg, object-cover, mb-6
          Name (18px fw600 #F0F0F0) → bio (14px fw400 opacity 0.7)
          → quote italic (14px #b7b5fe) → badges → result stat
      ════════════════════════════════════════════════════════ */}
      <section
        className="px-6 py-24"
        style={{ backgroundColor: '#0E0E12' }}
      >
        <div className="container-section">
          <Eyebrow center>The Navigators</Eyebrow>

          <h2
            className="text-center mb-16"
            style={{
              fontSize:   'clamp(28px, 4vw, 42px)',
              fontWeight: 600,
              color:      '#F0F0F0',
              lineHeight: 1.3,
            }}
          >
            The person your child works with, every week.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {NAVIGATORS.map(({ name, photo, alt, bio, quote, badges, result, lexile }) => (
              <div
                key={name}
                className="rounded-lg"
                style={{
                  backgroundColor: '#2E3848',
                  borderTop:       '3px solid #b7b5fe',
                  padding:         '32px',
                }}
              >
                {/* Photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo}
                  alt={alt}
                  className="rounded-lg object-cover mb-6"
                  style={{
                    width:  '96px',
                    height: '96px',
                    display: 'block',
                  }}
                />

                {/* Name */}
                <div
                  className="mb-2"
                  style={{
                    fontSize:   '18px',
                    fontWeight: 600,
                    color:      '#F0F0F0',
                  }}
                >
                  {name}
                </div>

                {/* Bio */}
                <p
                  className="mb-4"
                  style={{
                    fontSize:   '14px',
                    fontWeight: 400,
                    color:      '#F0F0F0',
                    opacity:    0.7,
                    lineHeight: 1.5,
                  }}
                >
                  {bio}
                </p>

                {/* Quote — italic, #b7b5fe */}
                <p
                  className="mb-4"
                  style={{
                    fontSize:   '14px',
                    fontWeight: 400,
                    fontStyle:  'italic',
                    color:      '#b7b5fe',
                    lineHeight: 1.5,
                  }}
                >
                  &ldquo;{quote}&rdquo;
                </p>

                {/* Badges */}
                <div className="mb-4 flex flex-wrap">
                  {badges.map((badge) => (
                    <Badge key={badge}>{badge}</Badge>
                  ))}
                </div>

                {/* Result stat */}
                <p
                  style={{
                    fontSize:   '13px',
                    fontWeight: 500,
                    color:      '#F0F0F0',
                    lineHeight: 1.5,
                  }}
                >
                  {result}<br />{lexile}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S6 A REAL SESSION ════════════════════════════════
          Figma: #F5F5FF, max-w-5xl, single white card p-10 rounded-lg
          Timeline labels: 14px fw600 #b7b5fe uppercase letterSpacing 0.05em
          Body copy: 16px fw400 #212830 lineHeight 1.6
      ════════════════════════════════════════════════════════ */}
      <section
        className="px-6 py-24"
        style={{ backgroundColor: '#F5F5FF' }}
      >
        <div className="max-w-5xl mx-auto px-0 md:px-6">
          <Eyebrow center>In Practice</Eyebrow>

          <h2
            className="text-center mb-12"
            style={{
              fontSize:   'clamp(28px, 4vw, 42px)',
              fontWeight: 700,
              color:      '#0E0E12',
              lineHeight: 1.3,
            }}
          >
            What happens in a real session
          </h2>

          {/* Single white card — exact from Figma */}
          <div
            className="rounded-lg"
            style={{
              backgroundColor: '#ffffff',
              border:          '1px solid rgba(14,14,18,0.1)',
              padding:         '40px',
            }}
          >
            <div className="space-y-6">
              {SESSION_TIMELINE.map(({ label, body }) => (
                <div key={label}>
                  <div
                    className="mb-2"
                    style={{
                      fontSize:      '14px',
                      fontWeight:    600,
                      color:         '#b7b5fe',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {label}
                  </div>
                  <p
                    style={{
                      fontSize:   '16px',
                      fontWeight: 400,
                      color:      '#212830',
                      lineHeight: 1.6,
                    }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ S7 WHAT FAMILIES SAY ═════════════════════════════
          Figma: #212830, 2×2 testimonial grid
          Each card: #2E3848, p-8, rounded-lg
          Quote: 16px fw400 #F0F0F0 italic lineHeight 1.7
          Attribution: city 14px fw600 #b7b5fe / detail 13px #F0F0F0 opacity 0.6
      ════════════════════════════════════════════════════════ */}
      <section
        className="px-6 py-24"
        style={{ backgroundColor: '#212830' }}
      >
        <div className="container-section">
          <Eyebrow center>Evidence</Eyebrow>

          <h2
            className="text-center mb-16"
            style={{
              fontSize:   'clamp(28px, 4vw, 42px)',
              fontWeight: 600,
              color:      '#F0F0F0',
              lineHeight: 1.3,
            }}
          >
            What families say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map(({ quote, city, detail }) => (
              <div
                key={city + detail}
                className="rounded-lg"
                style={{
                  backgroundColor: '#2E3848',
                  padding:         '32px',
                }}
              >
                <p
                  className="mb-6"
                  style={{
                    fontSize:   '16px',
                    fontWeight: 400,
                    color:      '#F0F0F0',
                    lineHeight: 1.7,
                    fontStyle:  'italic',
                  }}
                >
                  &ldquo;{quote}&rdquo;
                </p>
                <div>
                  <div
                    style={{
                      fontSize:   '14px',
                      fontWeight: 600,
                      color:      '#b7b5fe',
                    }}
                  >
                    {city}
                  </div>
                  <div
                    style={{
                      fontSize:   '13px',
                      fontWeight: 400,
                      color:      '#F0F0F0',
                      opacity:    0.6,
                    }}
                  >
                    {detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S8 CLOSING CTA ═══════════════════════════════════
          Figma: #0E0E12, max-w-4xl, text-center, py-32
          h2: clamp(32-52px) fw700 #F0F0F0, two #b7b5fe inline spans
          Sub: 18px fw400 #F0F0F0 opacity 0.75 max-w-[600px]
          Gilt button: #F5C842 #0E0E12 fw600 18px, boxShadow lavender glow
          Footer note: 14px fw400 #F0F0F0 opacity 0.5
          CTA: Link → /consult (no button onClick in SSR)
      ════════════════════════════════════════════════════════ */}
      <section
        className="px-6 py-32"
        style={{ backgroundColor: '#0E0E12' }}
      >
        <div className="max-w-4xl mx-auto text-center">

          <h2
            className="mb-6"
            style={{
              fontSize:   'clamp(32px, 5vw, 52px)',
              fontWeight: 700,
              color:      '#F0F0F0',
              lineHeight: 1.2,
            }}
          >
            Your child deserves a Navigator who knows{' '}
            <span style={{ color: '#b7b5fe' }}>exactly where they are</span> — and{' '}
            <span style={{ color: '#b7b5fe' }}>exactly where they&rsquo;re going</span>.
          </h2>

          <p
            className="mb-10 mx-auto"
            style={{
              fontSize:   '18px',
              fontWeight: 400,
              color:      '#F0F0F0',
              opacity:    0.75,
              lineHeight: 1.6,
              maxWidth:   '600px',
            }}
          >
            Sixteen weeks. One Navigator. Measurable progress in reading, thinking,
            speaking, and writing.
          </p>

          {/* Gilt button — Charter Enrollment moment */}
          <Link
            href={`/${locale}/consult`}
            className="inline-block transition-all hover:scale-105 active:scale-95 rounded-lg"
            style={{
              backgroundColor: '#F5C842',
              color:           '#0E0E12',
              fontSize:        '18px',
              fontWeight:      600,
              padding:         '16px 40px',
              boxShadow:       '0 4px 20px rgba(245,200,66,0.3)',
              textDecoration:  'none',
            }}
          >
            Start Your Child&rsquo;s Charter
          </Link>

          <p
            className="mt-6"
            style={{
              fontSize:   '14px',
              fontWeight: 400,
              color:      '#F0F0F0',
              opacity:    0.5,
            }}
          >
            No long-term commitment. See results in 16 weeks.
          </p>

        </div>
      </section>

    </div>
  )
}