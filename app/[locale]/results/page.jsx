// app/[locale]/results/page.jsx
//
// Student Results page.
// Server-rendered — zero 'use client'.
//
// Sections (top → bottom):
//   1. Hero           — dark, heading, reading-child bg illustration
//   2. ProofStrip     — dark, three stat callouts
//   3. Intro          — light, framing copy
//   4. Result Cards   — light, grid of anonymised student results with LexileBar
//   5. Writing        — dark, 6+1 Trait score table
//   6. Methodology    — light, why the numbers move + link to /methodology
//   7. FoundingFamily — dark, conversion (key was: charter)
//
// BACKGROUND UPDATE — April 13 2026
//   Hero bg: results-background.webp (child reading by doorstep, watercolor)
//   objectPosition: 'center 40%' — frames the figure + warm amber glow
//   Overlay: same 4-stop treatment as program/methodology pages
//   Warm amber radial accent echoes illustration's doorstep glow

import Link from 'next/link'
import { results as copyEn }              from '@/content/marketing.en'
import { results as copyZh }              from '@/content/marketing.zh'

import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams}                  from '@/lib/i18n'
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
  const t = locale === 'zh' ? copyZh : copyEn
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

  const t = locale === 'zh' ? copyZh : copyEn

  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────── */}
      {/*
        Custom hero with reading-child illustration background.
        Image: dark teal trees left → warm amber doorstep glow right.
        Left side is naturally very dark — ideal for text legibility.
        objectPosition 'center 40%' keeps the figure + glow centred.
        Warm amber radial accent (rgba(200,130,60,…)) echoes the lamp glow.
      */}
      <section
        aria-labelledby="results-hero-heading"
        style={{
          minHeight:     '80dvh',
          display:       'flex',
          flexDirection: 'column',
          position:      'relative',
          overflow:      'hidden',
        }}
      >
        {/* Background illustration */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/results-background.webp"
          alt=""
          aria-hidden="true"
          style={{
            position:       'absolute',
            inset:          0,
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'center 40%',
            display:        'block',
          }}
        />

        {/* Primary directional overlay */}
        <div
          aria-hidden="true"
          style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(108deg, rgba(14,14,18,0.98) 0%, rgba(14,14,18,0.97) 35%, rgba(14,14,18,0.80) 58%, rgba(14,14,18,0.28) 100%)',
          }}
        />

        {/* Bottom vignette */}
        <div
          aria-hidden="true"
          style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(to top, rgba(14,14,18,0.88) 0%, transparent 28%)',
          }}
        />

        {/* Warm amber radial accent — echoes the doorstep lamp glow */}
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            inset:         0,
            background:    'radial-gradient(ellipse 50% 55% at 68% 50%, rgba(200,130,60,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div
          className="container-section relative z-10"
          style={{
            flex:          1,
            display:       'flex',
            alignItems:    'center',
            paddingTop:    'calc(var(--nav-height) + 3.5rem)',
            paddingBottom: '3.5rem',
          }}
        >
          <div className="py-4 max-w-3xl">
            <Badge className="mb-6">{t.hero.eyebrow}</Badge>
            <h1
              id="results-hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 text-gradient"
            >
              {t.hero.heading}
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{ color: 'rgba(240,240,240,0.52)' }}
            >
              {t.hero.subheading}
            </p>
          </div>
        </div>
      </section>

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

      {/* ── 3b. Anchor case study (long-arc proof) ──────────── */}
      {t.anchor && (
        <SectionWrapper dark>
          <div className="py-16 md:py-20 max-w-3xl">
            <p className="eyebrow mb-4" style={{ color: '#b7b5fe' }}>{t.anchor.eyebrow}</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-5" style={{ color: '#F0F0F0' }}>
              {t.anchor.heading}
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(240,240,240,0.7)' }}>
              {t.anchor.body}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {t.anchor.stats.map((stat, i) => (
                <div key={i} className="p-6" style={{ background: 'rgba(183,181,254,0.08)', borderLeft: '3px solid #b7b5fe' }}>
                  <p className="text-5xl font-bold tracking-tight" style={{ color: '#b7b5fe', letterSpacing: '-0.03em' }}>
                    {stat.number}
                    <span className="text-base font-medium ml-2" style={{ color: 'rgba(183,181,254,0.7)' }}>{stat.unit}</span>
                  </p>
                  <p className="text-sm font-semibold uppercase tracking-wider mt-2" style={{ color: 'rgba(240,240,240,0.85)', letterSpacing: '0.08em' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,240,240,0.5)' }}>
              {t.anchor.note}
            </p>
          </div>
        </SectionWrapper>
      )}

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
              const maxScore = 6
              const entryPct = (trait.entryAvg / maxScore) * 100
              const exitPct  = (trait.exitAvg  / maxScore) * 100

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

      {/* ── 7. Consultation CTA ──────────────────────────── */}
      <SectionWrapper darker>
        <div className="py-20 md:py-24 max-w-2xl">

          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'rgba(183,181,254,0.5)' }}
          >
            {t.foundingFamily.eyebrow}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-gradient">
            {t.foundingFamily.heading}
          </h2>

          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: '#94A3B8' }}
          >
            {t.foundingFamily.body}
          </p>

          <Button as={Link} variant="charter" href={`/${locale}/consult`}>
            {t.foundingFamily.cta}
          </Button>

        </div>
      </SectionWrapper>

    </>
  )
}