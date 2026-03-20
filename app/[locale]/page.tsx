// app/page.jsx  —  /
//
// Homepage. SEO priority: Highest.
// Sections:
//   1.  Hero              — LIGHT (Whisper #F5F5FF) — credentialed, authoritative
//   2.  ProofStrip        — DARK  (#212830) — sharp contrast strike after light hero
//   3.  PhotoIntro        — WHITE (#ffffff) — breathing room, image panel
//   4.  LoopSection       — DARK  (#212830) — methodology on dark = gravitas
//   5.  ConfidenceSection — LIGHT (#F5F5FF) — structured cards, airy
//   6.  ParentTrustSection— DARK  (#212830) — results on dark = authority
//   7.  ClosingCTA        — DARKER (#0E0E12) — deepest conversion moment
//
// Colour rhythm: Light → Dark → White → Dark → Light → Dark → Darkest
// This creates a deliberate alternating cadence after the light hero.
// No two same-tone sections are adjacent.
//
// This is a pure server component. Every section is self-contained.
// Content is hardcoded here until content/en/home.json is built —
// comments mark each value that migrates to JSON.

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import LexileBar                        from '@/components/ui/LexileBar'



// ═══════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═══════════════════════════════════════════════════════════════
// LIGHT section — Whisper (#F5F5FF) background with soft lavender glow.
// Heading: Deep Void (#212830) — authoritative on light, high contrast.
// Chinese accent line: Lavender Signal — bilingual identity marker.
// CTAs: btn-charter (Gilt) + btn-secondary (Deep Void solid).
// This section flows directly into the ProofStrip dark band below.

function Hero({ locale }) {
  return (
    <section
      className="section-light relative overflow-hidden"
      aria-labelledby="hero-heading"
      style={{
        // #main-content already offsets by --nav-height via globals.css.
        // Subtract it so the hero fills exactly the visible viewport.
        minHeight: 'calc(100dvh - var(--nav-height))',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Ambient lavender glow — reads on light bg */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 70% 40%, rgba(183,181,254,0.22) 0%, transparent 65%)',
        }}
      />

      <div className="container-section relative z-10">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span
              className="badge badge-lavender"
              aria-label="Program audience"
            >
              For Globally Mobile Families
            </span>
            {/* migrate to home.json > hero.eyebrowSecondary */}
            <span
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium"
              style={{ color: 'rgba(124,121,232,0.7)' }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#F5C842' }}
                aria-hidden="true"
              />
              Charter Enrollment
            </span>
          </div>

          {/* H1 — Deep Void on light background. No text-gradient (designed for dark). */}
          {/* Chinese line rendered in Lavender Signal as the bilingual identity accent. */}
          {/* migrate to home.json > hero.heading */}
          <h1
            id="hero-heading"
            className="mb-6"
            style={{ color: '#212830', fontWeight: 700 }}
          >
            Build the edge.{' '}
            <br />
            Own both languages.{' '}
            <br className="hidden sm:block" />
            <span style={{ color: '#b7b5fe' }}>不是追赶。是领跑。</span>
          </h1>

          {/* Differentiator — one sentence */}
          {/* migrate to home.json > hero.differentiator */}
          <p
            className="mb-4 text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: '#3D4452' }}
          >
            其他课程教孩子说什么。我们教孩子怎么双语思考。
          </p>

          {/* Consultation hook — diagnose and prescribe voice */}
          {/* migrate to home.json > hero.consultHook */}
          <p
            className="mb-10 text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: '#7B8494' }}
          >
            The only live, high-touch program that trains the full{' '}
            <br />
            Read → Think → Speak → Write loop — for families{' '}
            <br />
            who live between two languages.
          </p>

          {/* CTAs — btn-charter (Gilt) is always primary conversion */}
          {/* btn-secondary (Deep Void solid) reads clearly on Whisper bg */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}/consult`}
              className="btn btn-charter text-base px-8 py-4 justify-center"
              aria-label="Book a diagnostic consultation"
            >
              Book Your Consultation
            </Link>
            <Link
              href={`/${locale}/program`}
              className="btn btn-secondary text-base px-8 py-4 justify-center"
              aria-label="Learn about The 16-Week Program"
            >
              See The 16-Week Program
            </Link>
          </div>

          {/* Trust micro-line — dark muted on light bg */}
          <p
            className="mt-8 text-xs"
            style={{ color: 'rgba(123,132,148,0.8)' }}
          >
            Lexile-measured progress &nbsp;·&nbsp; 6+1 Trait writing framework
            &nbsp;·&nbsp; Live Navigator-led sessions
          </p>

        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 2 — PROOF STRIP
// ═══════════════════════════════════════════════════════════════
// Dark mid-tone band directly after the light hero — maximum contrast.
// This is the first "strike of dark" that anchors the page rhythm.

const PROOF_STATS = [
  {
    id:      'lexile',
    number:  '1',
    unit:    'grade level',
    label:   'average reading growth in 16 weeks, measured by Lexile',
  },
  {
    id:      'writing',
    number:  '2×',
    unit:    'writing score improvement',
    label:   'average 6+1 Trait score gain from entry to exit assessment',
  },
  {
    id:      'live',
    number:  '100%',
    unit:    'live sessions',
    label:   'no pre-recorded content — every session is Navigator-led',
  },
]

function ProofStrip() {
  return (
    <div className="proof-strip" aria-label="Program outcomes">
      <div className="container-section">
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {PROOF_STATS.map((stat) => (
            <div key={stat.id} className="flex flex-col items-start sm:items-center sm:text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="proof-stat-number" aria-hidden="true">
                  {stat.number}
                </span>
                <span
                  className="block text-sm font-semibold mt-1"
                  style={{ color: '#b7b5fe' }}
                  aria-hidden="true"
                >
                  {stat.unit}
                </span>
                <span className="proof-stat-label block mt-1">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3 — PHOTO INTRO
// ═══════════════════════════════════════════════════════════════
// White (#ffffff) section — slightly lifted from Whisper to create
// a clean visual step after the dark ProofStrip.

function PhotoIntro({ locale }) {
  return (
    <section
      className="section-white"
      aria-labelledby="photo-intro-heading"
    >
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text */}
          <div>
            <p className="eyebrow mb-4">Who We Are</p>
            <h2 id="photo-intro-heading">
              The difference between a teacher and a Navigator is a map.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed"
               style={{ color: '#3D4452' }}>
              Navigators are not tutors. They are specialists in composition,
              literature, and academic writing — trained to close the gap
              between a student&rsquo;s current reading level and the level
              their academic life demands.
            </p>
            <p className="mt-4 text-base leading-relaxed"
               style={{ color: '#3D4452' }}>
              Every Navigator tracks one thing per student: the distance
              between their current Lexile level and their goal — and closes
              it, week by week, through The Loop.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/navigators`}
                className="btn btn-secondary text-sm px-6 py-3 justify-center"
              >
                Meet the Navigators
              </Link>
              <Link
                href={`/${locale}/results`}
                className="btn btn-outline text-sm px-6 py-3 justify-center"
              >
                See Student Results
              </Link>
            </div>
          </div>

          {/* Image placeholder — replace with Next.js <Image> when photo is ready */}
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ aspectRatio: '4/3' }}
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg, #EAEAF8 0%, #f0efff 50%, #e8e7ff 100%)',
              }}
            >
              <div className="text-center">
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: 'rgba(124,121,232,0.5)' }}
                >
                  Navigator Session
                </p>
                <div
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: 'rgba(124,121,232,0.6)' }}
                >
                  <span>Read</span>
                  <span style={{ color: 'rgba(183,181,254,0.4)' }}>→</span>
                  <span>Think</span>
                  <span style={{ color: 'rgba(183,181,254,0.4)' }}>→</span>
                  <span>Speak</span>
                  <span style={{ color: 'rgba(183,181,254,0.4)' }}>→</span>
                  <span>Write</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 4 — THE LOOP
// ═══════════════════════════════════════════════════════════════
// Dark (#212830) — methodology lands with weight and focus.
// Cards use .card-dark variant for dark-bg context.

const LOOP_STEPS = [
  {
    id:          'read',
    number:      '01',
    label:       'Read',
    description:
      'Students read texts carefully chosen at or just above their current ' +
      'Lexile level. The text is the raw material — nothing is simplified.',
  },
  {
    id:          'think',
    number:      '02',
    label:       'Think',
    description:
      'Before speaking, students are trained to form a position. What do ' +
      'they actually think? Not what they think they should think.',
  },
  {
    id:          'speak',
    number:      '03',
    label:       'Speak',
    description:
      'Students articulate their thinking in a live Socratic session with ' +
      'their Navigator. Precision in speech precedes precision in writing.',
  },
  {
    id:          'write',
    number:      '04',
    label:       'Write',
    description:
      'Students produce written work assessed with the 6+1 Trait framework. ' +
      'Their Navigator scores each piece. Growth is visible and measurable.',
  },
]

function LoopSection({ locale }) {
  return (
    <section
      className="section-dark"
      aria-labelledby="loop-heading"
    >
      <div className="container-section">

        <div className="max-w-2xl mb-14 md:mb-16">
          <p className="eyebrow mb-4" style={{ color: 'rgba(183,181,254,0.6)' }}>
            The Methodology
          </p>
          <h2 id="loop-heading">The Loop</h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed"
             style={{ color: '#94A3B8' }}>
            Every session. Every week. In this order, without exception.
            Read&nbsp;→&nbsp;Think&nbsp;→&nbsp;Speak&nbsp;→&nbsp;Write
            is not a framework we teach about — it is what we do.
          </p>
        </div>

        <ol
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          aria-label="The Loop — DODO Learning methodology"
        >
          {LOOP_STEPS.map((step, index) => (
            <li key={step.id} className="relative">

              {index < LOOP_STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute top-6 left-[calc(100%+0.75rem)] right-[-0.75rem] h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(183,181,254,0.3) 0%, rgba(183,181,254,0.1) 100%)',
                    width: 'calc(100% - 3rem)',
                    zIndex: 1,
                  }}
                />
              )}

              <div className="card card-dark h-full p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="loop-step-number"
                    aria-hidden="true"
                    style={{ width: 40, height: 40, fontSize: '0.875rem' }}
                  >
                    {step.number}
                  </span>
                  {index < LOOP_STEPS.length - 1 && (
                    <span
                      className="loop-arrow text-lg hidden sm:block lg:hidden"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </div>

                <h3
                  className="text-lg font-bold"
                  style={{ color: '#b7b5fe', letterSpacing: '-0.01em' }}
                >
                  {step.label}
                </h3>

                <p className="text-sm leading-relaxed flex-1"
                   style={{ color: '#94A3B8' }}>
                  {step.description}
                </p>
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
            Read the full methodology →
          </Link>
        </div>

      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 5 — CONFIDENCE SECTION
// ═══════════════════════════════════════════════════════════════
// Light (#F5F5FF) — returns to Whisper after the dark Loop section.
// .card-light cards with .accent-top lavender border.

const CONFIDENCE_PILLARS = [
  {
    id:       'assessment',
    eyebrow:  'Before We Begin',
    heading:  'We find out exactly where your child is.',
    body:
      'Not where their school report says they are. Before the first session, ' +
      'every student receives a Lexile reading assessment and a baseline ' +
      '6+1 Trait writing evaluation. We prescribe from data, not from guesswork.',
    link:     { href: '/program', label: 'How the assessment works' },
  },
  {
    id:       'loop',
    eyebrow:  'During The Program',
    heading:  'Every session runs The Loop.',
    body:
      'Read. Think. Speak. Write. Your child\'s Navigator tracks their movement ' +
      'through each phase every week. Nothing is guessed. Everything is guided. ' +
      'The Hangar provides structured support between sessions.',
    link:     { href: '/the-hangar', label: 'About The Hangar' },
  },
  {
    id:       'results',
    eyebrow:  'After 16 Weeks',
    heading:  'We show you the numbers.',
    body:
      'Every student receives an exit Lexile assessment and a re-evaluated ' +
      '6+1 Trait writing score. We show you the before and after. ' +
      'Then you decide what comes next.',
    link:     { href: '/results', label: 'View student results' },
  },
]

function ConfidenceSection({ locale }) {
  return (
    <section
      className="section-light"
      aria-labelledby="confidence-heading"
    >
      <div className="container-section">

        <div className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">How It Works</p>
          <h2 id="confidence-heading">
            We don&rsquo;t promise fluency.
            We deliver a grade level of literacy growth.
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed"
             style={{ color: '#3D4452' }}>
            In 16 weeks. Measured by Lexile. Shown in writing scores.
            Every claim we make is a number we can prove.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {CONFIDENCE_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="card p-8 flex flex-col gap-4 accent-top"
            >
              <p className="eyebrow">{pillar.eyebrow}</p>
              <h3
                className="text-xl font-bold leading-snug"
                style={{ color: '#212830' }}
              >
                {pillar.heading}
              </h3>
              <p className="text-sm leading-relaxed flex-1"
                 style={{ color: '#3D4452' }}>
                {pillar.body}
              </p>
              <Link
                href={pillar.link.href}
                className="text-sm font-semibold text-[#7c79e8] hover:text-[#b7b5fe] transition-colors duration-150 focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#b7b5fe]"
              >
                {pillar.link.label} →
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
// Dark (#212830) — results feel most authoritative on dark.

const STUDENT_RESULTS = [
  {
    id:        'result-1',
    student:   'Student A',
    detail:    'Grade 5 · Vancouver',
    start:     620,
    end:       820,
    weeks:     16,
    trait:     'Voice: 2 → 4',
    quote:
      'She started raising her hand in class by week eight. ' +
      'By week twelve she was leading the discussion.',
    source:    'Parent, Vancouver',
  },
  {
    id:        'result-2',
    student:   'Student B',
    detail:    'Grade 6 · Markham',
    start:     540,
    end:       720,
    weeks:     16,
    trait:     'Organization: 2 → 5',
    quote:
      'His teacher told us his writing had transformed. ' +
      'The 6+1 scores made it easy to see exactly what changed.',
    source:    'Parent, Markham',
  },
  {
    id:        'result-3',
    student:   'Student C',
    detail:    'Grade 7 · San Francisco Bay Area',
    start:     710,
    end:       940,
    weeks:     16,
    trait:     'Ideas: 3 → 5',
    quote:
      'She went from dreading writing assignments to submitting ' +
      'them early. The Navigator knew exactly where she was stuck.',
    source:    'Parent, Bay Area',
  },
]

function ParentTrustSection({ locale }) {
  return (
    <section
      className="section-dark"
      aria-labelledby="results-heading"
    >
      <div className="container-section">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="eyebrow mb-4" style={{ color: 'rgba(183,181,254,0.6)' }}>
              Student Results
            </p>
            <h2 id="results-heading">
              The numbers speak first.
              <br />Then the parents.
            </h2>
          </div>
          <Link
            href={`/${locale}/results`}
            className="btn btn-ghost text-sm px-6 py-3 shrink-0"
            aria-label="View all student results and Lexile data"
          >
            View all results →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STUDENT_RESULTS.map((result) => (
            <article
              key={result.id}
              className="card card-dark p-6 flex flex-col gap-5"
              aria-label={`Student result: ${result.student}, ${result.detail}`}
            >
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: '#b7b5fe' }}
                >
                  {result.student}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
                  {result.detail} &nbsp;·&nbsp; {result.weeks} weeks
                </p>
              </div>

              <LexileBar
                start={result.start}
                end={result.end}
                weeks={result.weeks}
              />

              <span className="badge badge-lavender-dark self-start">
                6+1 {result.trait}
              </span>

              <blockquote className="mt-auto">
                <p
                  className="text-sm leading-relaxed italic"
                  style={{ color: '#94A3B8' }}
                >
                  &ldquo;{result.quote}&rdquo;
                </p>
                <footer
                  className="mt-3 text-xs font-medium"
                  style={{ color: 'rgba(183,181,254,0.5)' }}
                >
                  — {result.source}
                </footer>
              </blockquote>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 7 — CLOSING CTA
// ═══════════════════════════════════════════════════════════════
// Void Black (#0E0E12) — deepest tone, final conversion moment.
// Comes after dark ParentTrust — a subtle step down, not a reset.

function ClosingCTA({ locale }) {
  return (
    <section
      className="section-darker relative overflow-hidden"
      aria-labelledby="closing-cta-heading"
      style={{ paddingTop: 'var(--section-lg)', paddingBottom: 'var(--section-lg)' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(245,200,66,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container-section relative z-10 text-center max-w-3xl mx-auto">

        <p
          className="eyebrow mb-6"
          style={{ color: 'rgba(183,181,254,0.5)' }}
        >
          Charter Enrollment
        </p>

        <h2
          id="closing-cta-heading"
          className="mb-6"
          style={{ color: '#b7b5fe' }}
        >
          The diagnostic consultation is where
          we find out exactly where your child is.
        </h2>

        <p
          className="text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: '#94A3B8' }}
        >
          Not where their school says they are. We measure their Lexile level,
          identify the specific gap, and tell you exactly what the first
          16 weeks looks like for a student exactly like yours.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}/consult`}
            className="btn btn-charter text-base px-10 py-4 justify-center"
            aria-label="Book your diagnostic consultation — Charter Enrollment"
          >
            Book Your Consultation
          </Link>
          <Link
            href={`/${locale}/program`}
            className="btn btn-ghost text-base px-10 py-4 justify-center"
          >
            Read About The Program
          </Link>
        </div>

        <p
          className="mt-8 text-xs"
          style={{ color: 'rgba(148,163,184,0.5)' }}
        >
          Think Once. In Both Languages.
        </p>

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
  return (
    <>
      <Hero locale={locale} />
      <ProofStrip />
      <PhotoIntro locale={locale} />
      <LoopSection locale={locale} />
      <ConfidenceSection locale={locale} />
      <ParentTrustSection locale={locale} />
      <ClosingCTA locale={locale} />
    </>
  )
}