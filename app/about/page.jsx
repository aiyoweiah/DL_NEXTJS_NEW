// app/[locale]/about/page.jsx
//
// /about — Brand story, Think Once philosophy, Who We Serve
// SEO Priority: Medium
//
// Section rhythm (matches homepage alternating cadence):
//   1. AboutHero       — LIGHT  (#F5F5FF)  — brand statement, credentialed entry
//   2. TheNameSection  — DARK   (#212830)  — DO + DO architecture, weight + gravitas
//   3. ThreeTruths     — LIGHT  (#F5F5FF)  — 3 brand truth cards, airy
//   4. WhoWeServe      — WHITE  (#ffffff)  — 3-column family profiles, breathing room
//   5. MissionSection  — DARK   (#212830)  — full brand narrative, authoritative
//   6. ThinkOnceStamp  — DARKER (#0E0E12)  — deepest conversion closing
//
// Colour rhythm: Light → Dark → Light → White → Dark → Darkest
// No two same-tone sections adjacent. Matches homepage cadence.
//
// Pure server component. Zero 'use client'.
// Content hardcoded with migration comments for content/en/about.json.

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
// SECTION 1 — ABOUT HERO
// ═══════════════════════════════════════════════════════════════
// LIGHT section — Whisper (#F5F5FF) with lavender ambient glow.
// H1 on light = Deep Void (#212830). Lavender accent on key phrase.
// Mirrors Hero pattern from homepage but tighter — not full-viewport.

function AboutHero() {
  return (
    <section
      className="section-light relative overflow-hidden"
      aria-labelledby="about-hero-heading"
    >
      {/* Ambient lavender glow — top-right, same as homepage hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 75% 35%, rgba(183,181,254,0.18) 0%, transparent 65%)',
        }}
      />

      <div className="container-section relative z-10">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          {/* migrate → content/en/about.json > hero.eyebrow */}
          <p className="eyebrow mb-6">About DODO Learning</p>

          {/* H1 — diagnoses what DODO is, not just names the company */}
          {/* migrate → content/en/about.json > hero.heading */}
          <h1
            id="about-hero-heading"
            className="mb-8"
            style={{ color: '#212830' }}
          >
            We don&rsquo;t teach English.{' '}
            <br className="hidden sm:block" />
            We build{' '}
            <span style={{ color: '#b7b5fe' }}>Bilingual Thinkers.</span>
          </h1>

          {/* Differentiator — one true sentence */}
          {/* migrate → content/en/about.json > hero.differentiator */}
          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mb-6"
            style={{ color: '#3D4452' }}
          >
            Most English programs teach children what to say. DODO teaches them
            how to think — then say it, then write it. We are the only live,
            high-touch program that trains the full Read → Think → Speak → Write
            loop, for families who live between two languages.
          </p>

          {/* Brand position */}
          {/* migrate → content/en/about.json > hero.position */}
          <p
            className="text-base leading-relaxed max-w-xl mb-10"
            style={{ color: '#7B8494' }}
          >
            Live, Navigator-led sessions. Lexile-measured literacy growth.
            For Chinese-speaking diaspora families in Canada and the US.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/program"
              className="btn btn-secondary text-base px-8 py-4 justify-center"
              aria-label="Learn about The 16-Week Program"
            >
              See The 16-Week Program
            </Link>
            <Link
              href="/consult"
              className="btn btn-outline text-base px-8 py-4 justify-center"
              aria-label="Book a diagnostic consultation"
            >
              Book a Consultation
            </Link>
          </div>

          {/* Trust micro-line */}
          <p
            className="mt-8 text-xs"
            style={{ color: 'rgba(123,132,148,0.8)' }}
          >
            Serving Vancouver · Richmond BC · Markham · Toronto ·
            San Francisco Bay Area · Los Angeles
          </p>

        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 2 — THE NAME
// ═══════════════════════════════════════════════════════════════
// DARK (#212830) — the etymology of DODO earns weight and gravitas.
// Two-column split: DO (English) / DO (Mother Tongue).
// Large typographic treatment — the name is the brand.

function TheNameSection() {
  return (
    <section
      className="section-dark relative overflow-hidden"
      aria-labelledby="name-heading"
    >
      {/* Subtle background texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 60%, rgba(183,181,254,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="container-section relative z-10">

        <div className="max-w-xl mb-14 md:mb-16">
          <p
            className="eyebrow mb-4"
            style={{ color: 'rgba(183,181,254,0.6)' }}
          >
            The Name
          </p>
          {/* migrate → content/en/about.json > name.heading */}
          <h2 id="name-heading">
            DODO is not named after the extinct bird.
          </h2>
          <p
            className="mt-4 text-base md:text-lg leading-relaxed"
            style={{ color: '#94A3B8' }}
          >
            It is named after the most fundamental act of language mastery:
            doing the work — twice, in two languages, at every level.
          </p>
        </div>

        {/* DO + DO split — large typographic centrepiece */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">

          {/* DO — English */}
          {/* migrate → content/en/about.json > name.doEnglish */}
          <div
            className="card card-dark p-8 md:p-10 flex flex-col gap-5"
            aria-label="DO — English, the first language of the name"
          >
            <div className="flex items-baseline gap-4">
              <span
                className="font-bold leading-none"
                style={{
                  fontSize: 'clamp(4rem, 8vw, 7rem)',
                  color: '#b7b5fe',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                DO
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'rgba(183,181,254,0.5)', paddingBottom: '0.75rem' }}
              >
                English
              </span>
            </div>
            <div
              className="w-8 h-0.5 rounded-full"
              style={{ backgroundColor: '#b7b5fe' }}
              aria-hidden="true"
            />
            <p
              className="text-base leading-relaxed"
              style={{ color: '#94A3B8' }}
            >
              The new world. The academic language. The language of possibility
              and future belonging.
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(148,163,184,0.7)' }}
            >
              Every session, every Navigator, every Lexile target — this DO is
              the destination. The language your child will lead in.
            </p>
          </div>

          {/* DO — Mother Tongue */}
          {/* migrate → content/en/about.json > name.doMotherTongue */}
          <div
            className="card card-dark p-8 md:p-10 flex flex-col gap-5"
            aria-label="DO — Mother Tongue, the second language of the name"
          >
            <div className="flex items-baseline gap-4">
              <span
                className="font-bold leading-none"
                style={{
                  fontSize: 'clamp(4rem, 8vw, 7rem)',
                  color: '#b7b5fe',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                DO
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'rgba(183,181,254,0.5)', paddingBottom: '0.75rem' }}
              >
                母语
              </span>
            </div>
            <div
              className="w-8 h-0.5 rounded-full"
              style={{ backgroundColor: 'rgba(183,181,254,0.4)' }}
              aria-hidden="true"
            />
            <p
              className="text-base leading-relaxed"
              style={{ color: '#94A3B8' }}
            >
              The emotional core. The first lens. The language through which
              the world first made sense.
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(148,163,184,0.7)' }}
            >
              Not a language to leave behind — a cognitive foundation to
              leverage. The bilingual mind is not half of two things.
              It is twice one thing.
            </p>
          </div>
        </div>

        {/* The synthesis statement */}
        {/* migrate → content/en/about.json > name.synthesis */}
        <div
          className="max-w-3xl mx-auto text-center px-4 py-10 md:py-12 rounded-2xl"
          style={{
            background: 'rgba(183,181,254,0.05)',
            border: '1px solid rgba(183,181,254,0.1)',
          }}
        >
          <p
            className="text-xl md:text-2xl font-semibold leading-relaxed"
            style={{ color: '#b7b5fe', letterSpacing: '-0.01em' }}
          >
            &ldquo;DODO is what happens when a student stops translating and
            starts thinking — simultaneously — in both.&rdquo;
          </p>
        </div>

      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3 — THREE BRAND TRUTHS
// ═══════════════════════════════════════════════════════════════
// LIGHT (#F5F5FF) — returns to Whisper after the dark name section.
// .card with .accent-top lavender border — matches ConfidenceSection
// pattern from homepage.

const BRAND_TRUTHS = [
  {
    id:      'truth-1',
    number:  '01',
    heading: 'Language is a thinking tool, not a performance skill.',
    body:
      'Fluency without depth is noise. We train students to have something ' +
      'worth saying — and the precision to say it in two languages. A student ' +
      'who can perform English is not the same as a student who can wield it.',
  },
  {
    id:      'truth-2',
    number:  '02',
    heading: 'The bilingual mind is a competitive advantage.',
    body:
      'We don\'t treat bilingualism as a gap to close. We treat it as a ' +
      'cognitive superpower to develop. Every lesson builds the double-track ' +
      'mind — the student who leads in two registers simultaneously.',
  },
  {
    id:      'truth-3',
    number:  '03',
    heading: 'Progress must be visible, measurable, and felt.',
    body:
      'Parents invest in outcomes. Students invest in confidence. We measure ' +
      'both — with Lexile levels and 6+1 Trait writing assessments — and we ' +
      'make growth legible. The numbers are the proof.',
  },
]

function ThreeTruths() {
  return (
    <section
      className="section-light"
      aria-labelledby="truths-heading"
    >
      <div className="container-section">

        <div className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">The Three Brand Truths</p>
          {/* migrate → content/en/about.json > truths.heading */}
          <h2 id="truths-heading">
            What we believe about language, learning, and your child.
          </h2>
          <p
            className="mt-4 text-base md:text-lg leading-relaxed"
            style={{ color: '#3D4452' }}
          >
            These are not marketing claims. They are the principles every
            Navigator works from, every session, with every student.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {BRAND_TRUTHS.map((truth) => (
            <div
              key={truth.id}
              className="card p-8 flex flex-col gap-5 accent-top"
            >
              {/* Number chip */}
              <span
                className="loop-step-number self-start"
                aria-hidden="true"
                style={{ width: 40, height: 40, fontSize: '0.875rem' }}
              >
                {truth.number}
              </span>

              {/* migrate → content/en/about.json > truths[n].heading */}
              <h3
                className="text-xl font-bold leading-snug"
                style={{ color: '#212830' }}
              >
                {truth.heading}
              </h3>

              {/* migrate → content/en/about.json > truths[n].body */}
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: '#3D4452' }}
              >
                {truth.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 4 — WHO WE SERVE
// ═══════════════════════════════════════════════════════════════
// WHITE (#ffffff) — breathing room after two dense sections.
// Three family profiles: their real fear / what DODO solves.
// Mirrors PhotoIntro's white lift on the homepage.

const FAMILY_PROFILES = [
  {
    id:       'family-1',
    eyebrow:  'Newly Arrived',
    heading:  'My child speaks English but can\'t hold their own in class.',
    fear:
      'Survival English and academic English are two different languages. ' +
      'Your child can order lunch and navigate the playground. But when the ' +
      'teacher asks them to argue a position in writing, the gap opens.',
    solve:
      'We close the gap between survival English and academic fluency. ' +
      'The Loop gives them the vocabulary depth, the reading stamina, and the ' +
      'writing precision their classroom demands.',
  },
  {
    id:       'family-2',
    eyebrow:  'Planning to Move',
    heading:  'My child will fall behind the moment they land.',
    fear:
      'You\'ve seen it happen to other families. The first semester is lost to ' +
      'adjustment. Your child spends a year catching up instead of moving ' +
      'ahead. You don\'t want that.',
    solve:
      'We build academic language infrastructure before arrival. A student who ' +
      'lands at Lexile 780 with 6+1 Trait writing skills doesn\'t catch up — ' +
      'they start at the front.',
  },
  {
    id:       'family-3',
    eyebrow:  'Staying, Thinking Globally',
    heading:  'My child will be outcompeted by truly bilingual peers.',
    fear:
      'You see the next generation of globally mobile talent. You know that ' +
      'operational English is not enough. Your child needs the double-track ' +
      'mind that sets them apart in university admissions and beyond.',
    solve:
      'We develop the cognitive identity that makes the difference — a student ' +
      'whose thinking is genuinely bilingual, not translated. That is the ' +
      'competitive advantage that compounds.',
  },
]

function WhoWeServe() {
  return (
    <section
      className="section-white"
      aria-labelledby="who-heading"
    >
      <div className="container-section">

        <div className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">Who We Serve</p>
          {/* migrate → content/en/about.json > who.heading */}
          <h2 id="who-heading">
            Three families. One real fear.
            One precise solution.
          </h2>
          <p
            className="mt-4 text-base md:text-lg leading-relaxed"
            style={{ color: '#3D4452' }}
          >
            DODO is built for Chinese-speaking diaspora families at a specific
            moment — when their child&rsquo;s English needs to move beyond
            fluency and into academic leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {FAMILY_PROFILES.map((profile) => (
            <article
              key={profile.id}
              className="card p-8 flex flex-col gap-5"
              aria-label={`Family profile: ${profile.eyebrow}`}
            >
              <p className="eyebrow">{profile.eyebrow}</p>

              {/* migrate → content/en/about.json > who[n].heading */}
              <h3
                className="text-xl font-bold leading-snug"
                style={{ color: '#212830' }}
              >
                {profile.heading}
              </h3>

              {/* The fear */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: 'rgba(123,132,148,0.7)' }}
                >
                  The real fear
                </p>
                {/* migrate → content/en/about.json > who[n].fear */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#7B8494' }}
                >
                  {profile.fear}
                </p>
              </div>

              {/* The solve */}
              <div
                className="rounded-xl p-5 mt-auto"
                style={{ backgroundColor: 'rgba(183,181,254,0.08)', border: '1px solid rgba(183,181,254,0.2)' }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: '#7c79e8' }}
                >
                  What DODO solves
                </p>
                {/* migrate → content/en/about.json > who[n].solve */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#3D4452' }}
                >
                  {profile.solve}
                </p>
              </div>

            </article>
          ))}
        </div>

        {/* Cities strip */}
        <div
          className="mt-14 pt-10 flex flex-wrap gap-x-8 gap-y-3 items-center"
          style={{ borderTop: '1px solid rgba(14,14,18,0.08)' }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#7c79e8' }}
          >
            Serving families in
          </p>
          {[
            'Vancouver',
            'Richmond BC',
            'Markham',
            'Toronto',
            'San Francisco Bay Area',
            'Los Angeles',
          ].map((city) => (
            <span
              key={city}
              className="text-sm font-medium"
              style={{ color: '#7B8494' }}
            >
              {city}
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 5 — MISSION & THE FULL BRAND NARRATIVE
// ═══════════════════════════════════════════════════════════════
// DARK (#212830) — prose-heavy, authoritative. The "putting it all
// together" section. Two columns on desktop: the narrative left,
// key claims callout right.

const BRAND_CLAIMS = [
  {
    id:    'claim-1',
    stat:  '16',
    unit:  'weeks',
    label: 'From Lexile baseline to measurable exit growth — every student, every time.',
  },
  {
    id:    'claim-2',
    stat:  '1',
    unit:  'grade level',
    label: 'Average reading growth in 16 weeks, measured by Lexile re-assessment.',
  },
  {
    id:    'claim-3',
    stat:  '2×',
    unit:  'writing scores',
    label: 'Average 6+1 Trait score improvement from entry to exit evaluation.',
  },
]

function MissionSection() {
  return (
    <section
      className="section-dark"
      aria-labelledby="mission-heading"
    >
      <div className="container-section">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left — narrative prose */}
          <div>
            <p
              className="eyebrow mb-4"
              style={{ color: 'rgba(183,181,254,0.6)' }}
            >
              Our Mission
            </p>

            {/* migrate → content/en/about.json > mission.heading */}
            <h2 id="mission-heading" className="mb-8">
              We exist for families who have crossed borders — or are about to.
            </h2>

            {/* migrate → content/en/about.json > mission.body — full brand narrative */}
            <div className="space-y-5">
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: '#94A3B8' }}
              >
                For children who wake up in one world and go to sleep in another.
                For parents who know that fluency is not enough.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: '#94A3B8' }}
              >
                We build Bilingual Thinkers. Students who don&rsquo;t just speak
                English — they wield it. Students who don&rsquo;t lose their first
                language — they leverage it. Students who move through The Loop —
                Read, Think, Speak, Write — until the loop becomes instinct.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: '#94A3B8' }}
              >
                Our Navigators don&rsquo;t teach. They guide. They know your
                child&rsquo;s Lexile baseline. They know their 6+1 Trait profile.
                They know the gap between where your child is and where they&rsquo;re
                going — and they close it, week by week, session by session.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: '#94A3B8' }}
              >
                We measure everything. We show you the numbers. We let the growth
                speak. In sixteen weeks, we don&rsquo;t promise fluency. We deliver
                a grade level of literacy growth, a measurable writing progression,
                and a student who knows what it feels like to think — and lead —
                in two languages.
              </p>
            </div>

            {/* Loop reference */}
            <div
              className="mt-10 flex items-center gap-3 text-sm font-semibold"
              style={{ color: '#b7b5fe' }}
              aria-label="The Loop methodology: Read, Think, Speak, Write"
            >
              {['Read', 'Think', 'Speak', 'Write'].map((step, i, arr) => (
                <span key={step} className="flex items-center gap-3">
                  <span>{step}</span>
                  {i < arr.length - 1 && (
                    <span
                      className="loop-arrow"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/methodology"
                className="btn btn-ghost text-sm px-6 py-3"
                aria-label="Read the full Loop methodology"
              >
                Read the full methodology →
              </Link>
              <Link
                href="/navigators"
                className="btn btn-ghost text-sm px-6 py-3"
                aria-label="Meet the Navigators"
              >
                Meet the Navigators →
              </Link>
            </div>
          </div>

          {/* Right — claims sidebar */}
          <div className="flex flex-col gap-6 lg:pt-16">

            {/* Differentiator callout */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(183,181,254,0.06)',
                border: '1px solid rgba(183,181,254,0.12)',
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'rgba(183,181,254,0.5)' }}
              >
                The One True Differentiator
              </p>
              <p
                className="text-lg md:text-xl font-semibold leading-relaxed"
                style={{ color: '#b7b5fe', letterSpacing: '-0.01em' }}
              >
                &ldquo;Bilingual children don&rsquo;t have half a language twice.
                They have twice a mind.&rdquo;
              </p>
            </div>

            {/* Stats */}
            <dl className="flex flex-col gap-5">
              {BRAND_CLAIMS.map((claim) => (
                <div
                  key={claim.id}
                  className="flex items-start gap-5 rounded-xl p-6"
                  style={{
                    background: 'rgba(183,181,254,0.04)',
                    border: '1px solid rgba(183,181,254,0.08)',
                  }}
                >
                  <div className="shrink-0 text-right" style={{ minWidth: '3.5rem' }}>
                    <span
                      className="block font-bold leading-none"
                      style={{
                        fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                        color: '#b7b5fe',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {claim.stat}
                    </span>
                    <span
                      className="block text-xs font-semibold mt-0.5"
                      style={{ color: 'rgba(183,181,254,0.6)' }}
                    >
                      {claim.unit}
                    </span>
                  </div>
                  <div>
                    <dt className="sr-only">{claim.stat} {claim.unit}</dt>
                    <dd
                      className="text-sm leading-relaxed"
                      style={{ color: '#94A3B8' }}
                    >
                      {claim.label}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 6 — THINK ONCE STAMP / CLOSING CTA
// ═══════════════════════════════════════════════════════════════
// Void Black (#0E0E12) — deepest tone, final conversion.
// Matches homepage ClosingCTA pattern exactly.
// Brand tagline stamped prominently — "Think Once. In Both Languages."

function ThinkOnceClosing() {
  return (
    <section
      className="section-darker relative overflow-hidden"
      aria-labelledby="about-closing-heading"
      style={{ paddingTop: 'var(--section-lg)', paddingBottom: 'var(--section-lg)' }}
    >
      {/* Gilt ambient glow — Charter enrollment moment */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 55% at 50% 50%, rgba(245,200,66,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="container-section relative z-10 text-center max-w-3xl mx-auto">

        {/* Brand tagline — the stamp at the heart of the page */}
        {/* migrate → content/en/about.json > closing.tagline */}
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-8"
          style={{ color: 'rgba(183,181,254,0.4)' }}
          aria-label="DODO Learning brand tagline"
        >
          Think Once. In Both Languages.
        </p>

        {/* migrate → content/en/about.json > closing.heading */}
        <h2
          id="about-closing-heading"
          className="mb-6"
          style={{ color: '#b7b5fe' }}
        >
          The diagnostic consultation is where
          we find out exactly where your child is.
        </h2>

        {/* migrate → content/en/about.json > closing.body */}
        <p
          className="text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: '#94A3B8' }}
        >
          Not where their school says they are. We measure their Lexile level,
          identify the specific gap, and tell you exactly what the first 16
          weeks looks like for a student exactly like yours.
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
            href="/results"
            className="btn btn-ghost text-base px-10 py-4 justify-center"
            aria-label="View student results and Lexile data"
          >
            See Student Results
          </Link>
        </div>

        {/* Trust strip */}
        <p
          className="mt-10 text-xs"
          style={{ color: 'rgba(148,163,184,0.45)' }}
        >
          Lexile-measured progress &nbsp;·&nbsp; 6+1 Trait writing framework
          &nbsp;·&nbsp; Live Navigator-led sessions
        </p>

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
      <AboutHero />
      <TheNameSection />
      <ThreeTruths />
      <WhoWeServe />
      <MissionSection />
      <ThinkOnceClosing />
    </>
  )
}