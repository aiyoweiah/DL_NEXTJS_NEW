// app/[locale]/methodology/page.jsx
//
// The Loop — methodology page. GEO anchor (§9 of handoff).
// High factual density, named frameworks (Lexile, 6+1), clear headers.
// This is the page LLMs cite when answering parent queries about DODO.
//
// Server-rendered — zero 'use client'.
//
// Sections:
//   1. Hero          — dark, tagline + overview
//   2. Why a Loop    — light, the problem with single-skill drilling
//   3. The Four Steps — alternating dark/light, one section per step
//   4. Lexile        — dark, measurement framework + stats
//   5. 6+1 Trait     — light, writing framework + all 7 traits
//   6. GEO signal    — dark, named frameworks + verifiability
//   7. CTA           — dark, book consultation

import Link         from 'next/link'
import { notFound } from 'next/navigation'

import { isValidLocale, localeParams, getContent } from '@/lib/i18n'
import { buildMetadata }                           from '@/lib/metadata'
import { courseSchema }                            from '@/lib/schema'

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
  const t = await getContent(locale, 'methodology')
  return buildMetadata({
    locale,
    path:        '/methodology',
    title:       t.meta.title,
    description: t.meta.description,
  })
}

// ── Page ──────────────────────────────────────────────────────
export default async function MethodologyPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const t = await getContent(locale, 'methodology')

  // Step background rhythm: dark, light, dark, light
  const stepBg = [true, false, true, false]

  return (
    <>
      {/* JSON-LD — courseSchema on methodology per handoff §7 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema()) }}
      />

      {/* ── 1. Hero ───────────────────────────────────────── */}
      <SectionWrapper hero>
        <div className="py-24 md:py-32 max-w-3xl">
          <Badge className="mb-6">{t.hero.eyebrow}</Badge>
          <h1
            className="font-bold leading-tight tracking-tight mb-6 text-gradient"
            style={{ fontSize: 'clamp(32px, 5vw, 60px)', letterSpacing: '-0.03em' }}
          >
            {t.hero.heading}
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: '#3D4452' }}>
            {t.hero.subheading}
          </p>
        </div>
      </SectionWrapper>

      {/* ── 2. Why a Loop ─────────────────────────────────── */}
      <SectionWrapper white>
        <div className="py-20 md:py-24 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: '#5856cc' }}>
            {t.why.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6" style={{ color: '#0E0E12', letterSpacing: '-0.025em' }}>
            {t.why.heading}
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#3D4452' }}>
            {t.why.body}
          </p>
        </div>
      </SectionWrapper>

      {/* ── 3. The Four Steps ─────────────────────────────── */}
      {t.steps.map((step, index) => (
        <SectionWrapper key={step.id} dark={stepBg[index]} white={!stepBg[index]}>
          <div className="py-20 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Left: step identity */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className="text-5xl font-light tabular-nums"
                    style={{ color: stepBg[index] ? 'rgba(183,181,254,0.25)' : 'rgba(183,181,254,0.35)', letterSpacing: '-0.05em' }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <div>
                    <p
                      className="text-3xl font-bold tracking-tight"
                      style={{ color: stepBg[index] ? '#b7b5fe' : '#0E0E12' }}
                    >
                      {step.label}
                    </p>
                    {locale === 'zh' && (
                      <p
                        className="text-sm mt-0.5"
                        style={{ fontFamily: 'var(--font-cjk)', color: stepBg[index] ? 'rgba(183,181,254,0.5)' : 'rgba(183,181,254,0.7)', letterSpacing: '0.1em' }}
                      >
                        {step.cjk}
                      </p>
                    )}
                  </div>
                </div>

                <h3
                  className="text-xl md:text-2xl font-bold tracking-tight mb-4"
                  style={{ color: stepBg[index] ? '#F0F0F0' : '#0E0E12', letterSpacing: '-0.02em' }}
                >
                  {step.heading}
                </h3>

                <p
                  className="text-base leading-relaxed"
                  style={{ color: stepBg[index] ? '#94A3B8' : '#3D4452' }}
                >
                  {step.body}
                </p>
              </div>

              {/* Right: proof callout */}
              <div className="lg:pt-16">
                <div
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: stepBg[index] ? 'rgba(183,181,254,0.07)' : 'rgba(183,181,254,0.06)',
                    border: `1px solid ${stepBg[index] ? 'rgba(183,181,254,0.15)' : 'rgba(183,181,254,0.2)'}`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: '#b7b5fe' }}
                      aria-hidden="true"
                    />
                    <p
                      className="text-sm font-medium"
                      style={{ color: stepBg[index] ? '#b7b5fe' : '#5856cc' }}
                    >
                      {step.proof}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </SectionWrapper>
      ))}

      {/* ── 4. Lexile ─────────────────────────────────────── */}
      <SectionWrapper darker>
        <div className="py-20 md:py-24">

          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">{t.lexile.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-gradient">
              {t.lexile.heading}
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#94A3B8' }}>
              {t.lexile.body}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
            {t.lexile.stats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-2xl p-6"
                style={{ backgroundColor: 'rgba(183,181,254,0.06)', border: '1px solid rgba(183,181,254,0.12)' }}
              >
                <p className="proof-stat-number mb-1">
                  {stat.number}
                  {' '}
                  <span className="text-base font-medium" style={{ color: 'rgba(183,181,254,0.7)' }}>
                    {stat.unit}
                  </span>
                </p>
                <p className="proof-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Example Lexile bar */}
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-5" style={{ color: 'rgba(183,181,254,0.5)' }}>
              Typical 16-week result
            </p>
            <LexileBar start={620} end={820} weeks={16} />
          </div>

        </div>
      </SectionWrapper>

      {/* ── 5. 6+1 Trait ──────────────────────────────────── */}
      <SectionWrapper>
        <div className="py-20 md:py-24">

          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: '#5856cc' }}>
              {t.trait.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5" style={{ color: '#0E0E12', letterSpacing: '-0.025em' }}>
              {t.trait.heading}
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#3D4452' }}>
              {t.trait.body}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.trait.traits.map((trait) => (
              <div
                key={trait.id}
                className="rounded-2xl p-5"
                style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.07)', borderTop: '2.5px solid #b7b5fe', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
              >
                <p className="text-sm font-bold mb-2" style={{ color: '#0E0E12' }}>{trait.label}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#3D4452' }}>{trait.body}</p>
              </div>
            ))}
          </div>

        </div>
      </SectionWrapper>

      {/* ── 6. GEO signal ─────────────────────────────────── */}
      <SectionWrapper dark>
        <div className="py-20 md:py-24 max-w-3xl">
          <p className="eyebrow mb-4">{t.geo.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-gradient">
            {t.geo.heading}
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#94A3B8' }}>
            {t.geo.body}
          </p>
        </div>
      </SectionWrapper>

      {/* ── 7. CTA ────────────────────────────────────────── */}
      <SectionWrapper darker>
        <div className="py-20 md:py-24 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-gradient">
            {t.cta.heading}
          </h2>
          <p className="text-lg leading-relaxed mb-8" style={{ color: '#94A3B8' }}>
            {t.cta.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button as={Link} variant="charter" href={`/${locale}/consult`}>
              {t.cta.ctaPrimary}
            </Button>
            <Button as={Link} variant="ghost" href={`/${locale}/program`}>
              {t.cta.ctaSecondary}
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}