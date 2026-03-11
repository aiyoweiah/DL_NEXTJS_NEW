// app/page.jsx  —  /
//
// Homepage. SEO priority: Highest.
// Sections (Figma Make order):
//   1.  Hero              — dark, full-viewport, headline + two CTAs
//   2.  ProofStrip        — three quantified social proof stats
//   3.  PhotoIntro        — who Navigators are, what DODO is
//   4.  LoopSection       — Read → Think → Speak → Write
//   5.  ConfidenceSection — methodology credibility + Lexile proof
//   6.  ParentTrustSection— anonymised student results + parent voice
//   7.  ClosingCTA        — Charter Enrollment, final conversion moment
//
// This is a pure server component. Every section is self-contained.
// Content is hardcoded here until content/en/home.json is built —
// comments mark each value that migrates to JSON.
//
// JSON-LD: educationOrgSchema is injected in app/layout.jsx (site-wide).
// No additional page-level schema is needed on the homepage.

import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'

// ── Metadata ──────────────────────────────────────────────────
export const metadata = buildMetadata({
  title: 'DODO Learning — Think Once. In Both Languages.',
  description:
    'A live, Navigator-led bilingual thinking program for globally mobile ' +
    'families in Canada and the US. The 16-Week Program ' +
    'develops students who read, think, speak, and write — measured by ' +
    'Lexile levels and the 6+1 Trait writing framework.',
  path: '/',
})

// ═══════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═══════════════════════════════════════════════════════════════
// Full-viewport dark section. Lavender Signal headline.
// Two CTAs: Book Your Consultation (Gilt / charter) + See The Program (ghost).
// Eyebrow chip frames the audience.
// Subhead is the single brand differentiator sentence.

function Hero() {
  return (
    <section
      className="section-hero relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Ambient glow — purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 60% at 65% 38%, rgba(183,181,254,0.13) 0%, transparent 68%)',
        }}
      />

      <div className="container-section relative z-10 py-24 md:py-32 lg:py-40">
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
              style={{ color: 'rgba(183,181,254,0.5)' }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#F5C842' }}
                aria-hidden="true"
              />
              Charter Enrollment
            </span>
          </div>

          {/* H1 — answers the question "what is this?" */}
          {/* migrate to home.json > hero.heading */}
          <h1
            id="hero-heading"
            className="mb-6 text-gradient"
            style={{ fontWeight: 700 }}
          >
            Build the edge. <br></br>Own both languages.{' '}
            <br className="hidden sm:block" />
            不是追赶。是领跑。
          </h1>

          {/* Differentiator — one sentence */}
          {/* migrate to home.json > hero.differentiator */}
          <p
            className="mb-4 text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: '#F0F0F0' }}
          >
            其他课程教孩子说什么。我们教孩子怎么双语思考。
          </p>

          {/* Consultation hook — diagnose and prescribe voice */}
          {/* migrate to home.json > hero.consultHook */}
          <p
            className="mb-10 text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: '#94A3B8' }}
          >
            The only live, high-touch program that trains the full <br></br>Read → Think → Speak → Write loop — for families <br></br>who live between two languages.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/consult"
              className="btn btn-charter text-base px-8 py-4 justify-center"
              aria-label="Book a diagnostic consultation"
            >
              Book Your Consultation
            </Link>
            <Link
              href="/program"
              className="btn btn-ghost text-base px-8 py-4 justify-center"
              aria-label="Learn about The 16-Week Program"
            >
              See The 16-Week Program
            </Link>
          </div>

          {/* Trust micro-line */}
          <p
            className="mt-8 text-xs"
            style={{ color: 'rgba(148,163,184,0.7)' }}
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
// Dark mid-tone band. Three quantified outcomes.
// Numbers are specific — brand rule: "always cite specific numbers."
// Migrate values to home.json > proofStrip.stats[]

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
// Light section. Who Navigators are + what the program is.
// Two-column on desktop: text left, image placeholder right.
// Image slot is ready for a real photo — currently a styled placeholder.

function PhotoIntro() {
  return (
    <section
      className="section-light"
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
                href="/navigators"
                className="btn btn-secondary text-sm px-6 py-3 justify-center"
              >
                Meet the Navigators
              </Link>
              <Link
                href="/results"
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
// Dark section. The Loop methodology spelled out.
// Four steps in order — never reordered, never renamed.
// Each step has a description so LLMs and screen readers
// get the full methodology, not just the label.

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

function LoopSection() {
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

              <div className="card h-full p-6 flex flex-col gap-4">
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
            href="/methodology"
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

function ConfidenceSection() {
  return (
    <section
      className="section-white"
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
              className="card card-light p-8 flex flex-col gap-4 accent-top"
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

function LexileProgressBar({ start, end, label }) {
  const startPct = Math.round((start / 1200) * 100)
  const endPct   = Math.round((end   / 1200) * 100)
  const gainPct  = endPct - startPct

  return (
    <div aria-label={label}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold" style={{ color: '#94A3B8' }}>
          Lexile {start}
        </span>
        <span
          className="text-xs font-bold"
          style={{ color: '#b7b5fe' }}
        >
          Lexile {end}
        </span>
      </div>

      <div
        className="w-full h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: 'rgba(183,181,254,0.1)' }}
        role="img"
        aria-label={label}
      >
        <div
          className="h-full relative"
          style={{ width: `${endPct}%`, backgroundColor: 'rgba(183,181,254,0.2)', borderRadius: 9999 }}
        >
          <div
            className="absolute right-0 top-0 h-full rounded-full"
            style={{
              width: `${Math.round((gainPct / endPct) * 100)}%`,
              background: 'linear-gradient(90deg, #b7b5fe 0%, #d4d3ff 100%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

function ParentTrustSection() {
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
            href="/results"
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
              className="card p-6 flex flex-col gap-5"
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

              <LexileProgressBar
                start={result.start}
                end={result.end}
                label={`Reading progress: Lexile ${result.start} to Lexile ${result.end} in ${result.weeks} weeks`}
              />

              <span className="badge badge-lavender self-start">
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

function ClosingCTA() {
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
            href="/consult"
            className="btn btn-charter text-base px-10 py-4 justify-center"
            aria-label="Book your diagnostic consultation — Charter Enrollment"
          >
            Book Your Consultation
          </Link>
          <Link
            href="/program"
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <PhotoIntro />
      <LoopSection />
      <ConfidenceSection />
      <ParentTrustSection />
      <ClosingCTA />
    </>
  )
}