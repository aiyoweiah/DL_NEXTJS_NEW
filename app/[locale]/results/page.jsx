// app/[locale]/results/page.jsx
//
// Student Results page.
// Server-rendered — zero 'use client'.
//
// Sections (top → bottom):
//   1. Hero           — dark, heading
//   2. ProofStrip     — dark, three stat callouts
//   3. Intro          — light, framing copy
//   4. Result Cards   — light, grid of anonymised student results with LexileBar
//   5. Writing        — dark, 6+1 Trait score table
//   6. Methodology    — light, why the numbers move + link to /methodology
//   7. CharterCTA     — dark, conversion

import Link from 'next/link'

import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams,
         getContent }                  from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'

import SectionWrapper from '@/components/ui/SectionWrapper'
import Button         from '@/components/ui/Button'
import Badge          from '@/components/ui/Badge'
import LexileBar      from '@/components/ui/LexileBar'

// ── Static params ─────────────────────────────────────────────
export function generateStaticParams() {
  return localeParams()
}

// ── Metadata ──────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getContent(locale, 'results')
  return buildMetadata({
    locale,
    path:        '/results',
    title:       t.meta.title,
    description: t.meta.description,
  })
}

// ── Page ──────────────────────────────────────────────────────
export default async function ResultsPage({ params }) {
  const { locale } = await params

  if (!isValidLocale(locale)) notFound()

  const t = await getContent(locale, 'results')

  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────── */}
      <SectionWrapper hero>
        <div className="py-24 md:py-32 max-w-3xl">

          <Badge className="mb-6">{t.hero.eyebrow}</Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 text-gradient">
            {t.hero.heading}
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: '#3D4452' }}
          >
            {t.hero.subheading}
          </p>

        </div>
      </SectionWrapper>

      {/* ── 2. Proof strip ───────────────────────────────── */}
      <div className="proof-strip">
        <div className="container-section py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(183,181,254,0.12)]">
            {t.proof.stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col items-center text-center sm:px-6 pt-8 sm:pt-0 first:pt-0"
              >
                <p className="proof-stat-number">
                  {stat.number}
                  <span
                    className="ml-1 text-xl font-medium"
                    style={{ color: 'rgba(183,181,254,0.7)' }}
                  >
                    {stat.unit}
                  </span>
                </p>
                <p className="proof-stat-label mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Intro ─────────────────────────────────────── */}
      <SectionWrapper white>
        <div className="py-16 md:py-20 max-w-2xl">
          <h2
            className="text-2xl md:text-3xl font-bold tracking-tight mb-5"
            style={{ color: '#0E0E12' }}
          >
            {t.intro.heading}
          </h2>
          <p className="text-lg leading-relaxed text-[#3D4452]">
            {t.intro.body}
          </p>
        </div>
      </SectionWrapper>

      {/* ── 4. Result cards ──────────────────────────────── */}
      <SectionWrapper>
        <div className="py-6 pb-20 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {t.results.map((result) => (
              <div
                key={result.id}
                className="card card-light accent-top p-6 flex flex-col gap-5"
              >
                {/* LexileBar */}
                <LexileBar
                  start={result.lexileStart}
                  end={result.lexileEnd}
                  weeks={result.weeks}
                  light
                />

                {/* Grade context */}
                <p className="text-sm leading-relaxed text-[#3D4452]">
                  {result.gradeContext}
                </p>

                {/* Optional quote */}
                {result.quote && (
                  <div className="mt-auto pt-4 border-t border-[rgba(14,14,18,0.08)]">
                    <blockquote
                      className="text-sm leading-relaxed italic text-[#3D4452] mb-2"
                    >
                      &ldquo;{result.quote}&rdquo;
                    </blockquote>
                    {result.quoteSource && (
                      <p
                        className="text-xs font-medium uppercase tracking-widest"
                        style={{ color: '#5856cc' }}
                      >
                        {result.quoteSource}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── 5. Writing traits ────────────────────────────── */}
      <SectionWrapper dark>
        <div className="py-20 md:py-24">

          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-4">{t.writing.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-gradient">
              {t.writing.heading}
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#94A3B8' }}>
              {t.writing.body}
            </p>
          </div>

          {/* Trait score table */}
          <div className="max-w-xl flex flex-col gap-4">
            {t.writing.traits.map((trait) => {
              const maxScore  = 6
              const entryPct  = (trait.entryAvg / maxScore) * 100
              const exitPct   = (trait.exitAvg  / maxScore) * 100

              return (
                <div key={trait.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-sm font-medium"
                      style={{ color: '#F0F0F0' }}
                    >
                      {trait.label}
                    </span>
                    <span className="text-xs tabular-nums" style={{ color: '#94A3B8' }}>
                      <span style={{ color: 'rgba(183,181,254,0.5)' }}>
                        {trait.entryAvg.toFixed(1)}
                      </span>
                      <span style={{ color: 'rgba(183,181,254,0.3)' }}> → </span>
                      <span style={{ color: '#b7b5fe' }}>
                        {trait.exitAvg.toFixed(1)}
                      </span>
                      <span style={{ color: '#94A3B8' }}> / 6</span>
                    </span>
                  </div>

                  {/* Stacked track: entry (muted) + exit growth (lavender) */}
                  <div
                    className="relative h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'rgba(183,181,254,0.08)' }}
                    role="img"
                    aria-label={`${trait.label}: entry ${trait.entryAvg}, exit ${trait.exitAvg} out of 6`}
                  >
                    <div
                      className="absolute left-0 top-0 h-full rounded-full"
                      style={{
                        width:           `${entryPct}%`,
                        backgroundColor: 'rgba(183,181,254,0.2)',
                      }}
                    />
                    <div
                      className="absolute top-0 h-full rounded-full"
                      style={{
                        left:            `${entryPct}%`,
                        width:           `${exitPct - entryPct}%`,
                        backgroundColor: '#b7b5fe',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </SectionWrapper>

      {/* ── 6. Methodology callout ───────────────────────── */}
      <SectionWrapper>
        <div className="py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>
              <p
                className="eyebrow mb-4"
                style={{ color: '#5856cc' }}
              >
                {t.methodology.eyebrow}
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight mb-5"
                style={{ color: '#0E0E12' }}
              >
                {t.methodology.heading}
              </h2>
              <p className="text-lg leading-relaxed text-[#3D4452] mb-8">
                {t.methodology.body}
              </p>
              <Button
                as={Link}
                variant="primary"
                href={`/${locale}${t.methodology.ctaHref}`}
              >
                {t.methodology.cta}
              </Button>
            </div>

            {/* Visual accent — Loop steps as a simple dark card */}
            <div
              className="card p-8 flex flex-col gap-5"
              aria-hidden="true"
            >
              {['Read', 'Think', 'Speak', 'Write'].map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <span
                    className="loop-step-number shrink-0"
                    style={{ minWidth: '2rem' }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="text-lg font-bold tracking-tight"
                    style={{ color: '#5856cc' }}
                  >
                    {step}
                  </span>
                  {i < 3 && (
                    <svg
                      className="ml-auto shrink-0 loop-arrow"
                      width="16" height="16" viewBox="0 0 16 16"
                      fill="none" aria-hidden="true"
                    >
                      <path
                        d="M3 8h10M13 8l-4-4M13 8l-4 4"
                        stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </SectionWrapper>

      {/* ── 7. Charter CTA ───────────────────────────────── */}
      <SectionWrapper darker>
        <div className="py-20 md:py-24 max-w-2xl">

          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'rgba(183,181,254,0.5)' }}
          >
            {t.charter.eyebrow}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-gradient">
            {t.charter.heading}
          </h2>

          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: '#94A3B8' }}
          >
            {t.charter.body}
          </p>

          <Button as={Link} variant="charter" href={`/${locale}/consult`}>
            {t.charter.cta}
          </Button>

        </div>
      </SectionWrapper>

    </>
  )
}