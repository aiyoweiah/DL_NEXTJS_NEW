// app/[locale]/cities/[city]/page.jsx
//
// City landing pages — local diaspora SEO (§13).
// One page per city slug, rendered in EN and ZH.
//
// City slugs (6):
//   vancouver | richmond-bc | markham | toronto |
//   san-francisco-bay-area | los-angeles
//
// Content is hardcoded inline — cities do not use getContent() because
// the content volume per city is small and city-specific. The en.js comment
// explicitly marks: "cities (via citySchema, not a content key)".
//
// Sections (top → bottom):
//   1. Hero          — city-specific h1 + dual CTAs
//   2. ProofStrip    — standard three stats
//   3. LocalContext  — city-specific community paragraph
//   4. LoopSection   — brief Loop summary → links to /methodology
//   5. Structure     — 3-phase program arc, condensed
//   6. CharterCTA    — conversion

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cities, citiesProofStats, citiesLoopSteps, citiesPhases, citiesUi } from '@/content/cities'

import { isValidLocale, LOCALES } from '@/lib/i18n'
import { buildCityMetadata }      from '@/lib/metadata'
import { citySchema }             from '@/lib/schema'

import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge          from '@/components/ui/Badge'
import Button         from '@/components/ui/Button'

// ── City data ─────────────────────────────────────────────────


// ── Static params ─────────────────────────────────────────────
export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    Object.keys(cities).map((city) => ({ locale, city }))
  )
}

// ── Metadata ──────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { locale, city } = await params
  const data = cities[city]
  if (!data) return {}
  const cityName = locale === 'zh' ? data.nameCN : data.name
  return buildCityMetadata(city, locale, cityName)
}

// ── Proof stats ───────────────────────────────────────────────


// ── Loop steps ────────────────────────────────────────────────


// ── Program phases ────────────────────────────────────────────


// ── citiesUi copy ───────────────────────────────────────────────────


// ── Page ──────────────────────────────────────────────────────
export default async function CityPage({ params }) {
  const { locale, city } = await params

  if (!isValidLocale(locale)) notFound()

  const data = cities[city]
  if (!data) notFound()

  const copy    = data[locale] ?? data.en
  const ui      = citiesUi[locale]  ?? citiesUi.en
  const stats   = citiesProofStats[locale]  ?? citiesProofStats.en
  const steps   = citiesLoopSteps[locale]   ?? citiesLoopSteps.en
  const phases  = citiesPhases[locale]       ?? citiesPhases.en
  const cityName = locale === 'zh' ? data.nameCN : data.name

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            citySchema({
              name:        data.name,
              slug:        city,
              region:      data.region,
              country:     data.country,
              countryCode: data.countryCode,
            })
          ),
        }}
      />

      {/* ── 1. Hero ──────────────────────────────────────── */}
      <SectionWrapper hero>
        <div className="py-24 md:py-32 max-w-3xl">

          <Badge className="mb-6">{ui.badge}</Badge>

          <h1
            id="city-heading"
            className="mb-6"
          >
            {copy.h1}
          </h1>

          <p className="mb-10 text-lg md:text-xl leading-relaxed max-w-2xl">
            {copy.subheading}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}/consult`}
              className="btn btn-charter text-base px-8 py-4 justify-center"
            >
              {ui.ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/program`}
              className="btn btn-secondary text-base px-8 py-4 justify-center"
            >
              {ui.ctaSecondary}
            </Link>
          </div>

          {ui.bandsCallout && (
            <p
              className="mt-6 text-sm"
              style={{ color: 'rgba(240,240,240,0.55)', maxWidth: '36rem' }}
            >
              {ui.bandsCallout}
            </p>
          )}

        </div>
      </SectionWrapper>

      {/* ── 2. ProofStrip ────────────────────────────────── */}
      <div className="proof-strip">
        <div className="container-section">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 py-12">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-start sm:items-center sm:text-center">
                <p className="proof-stat-number" aria-label={`${stat.number} ${stat.unit}`}>
                  {stat.number}
                  {stat.unit && (
                    <span className="ml-1.5 text-xl font-medium" style={{ color: 'rgba(183,181,254,0.7)' }}>
                      {stat.unit}
                    </span>
                  )}
                </p>
                <p className="proof-stat-label mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Local Context ─────────────────────────────── */}
      <SectionWrapper white>
        <div className="py-16 md:py-20 max-w-3xl">
          <p className="eyebrow mb-4">{ui.contextEyebrow} — {cityName}</p>
          <p className="text-lg leading-relaxed" style={{ color: '#3D4452' }}>
            {copy.context}
          </p>
        </div>
      </SectionWrapper>

      {/* ── 4. Loop Section ──────────────────────────────── */}
      <SectionWrapper dark>
        <div className="py-16 md:py-20">

          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">{ui.loopEyebrow}</p>
            <h2 className="mb-5">{ui.loopHeading}</h2>
            <p className="text-lg leading-relaxed" style={{ color: '#94A3B8' }}>
              {ui.loopBody}
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
            role="list"
            aria-label="The Loop — Read, Think, Speak, Write"
          >
            {steps.map((step) => (
              <div
                key={step.number}
                role="listitem"
                className="flex flex-col gap-3"
                style={{
                  background:   'rgba(183,181,254,0.05)',
                  border:       '1px solid rgba(183,181,254,0.12)',
                  borderRadius: '0.875rem',
                  padding:      '1.5rem',
                }}
              >
                <div className="loop-step-number" aria-hidden="true">
                  {step.number}
                </div>
                <p
                  className="font-semibold text-sm uppercase tracking-widest"
                  style={{ color: '#b7b5fe' }}
                >
                  {step.label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          <Link
            href={`/${locale}/methodology`}
            className="text-sm font-semibold"
            style={{ color: '#b7b5fe' }}
          >
            {ui.loopCta}
          </Link>

        </div>
      </SectionWrapper>

      {/* ── 5. Structure ─────────────────────────────────── */}
      <SectionWrapper>
        <div className="py-16 md:py-20">

          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-4">{ui.structureEyebrow}</p>
            <h2 className="mb-5">{ui.structureHeading}</h2>
            <p className="text-lg leading-relaxed">{ui.structureBody}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {phases.map((phase, i) => (
              <div
                key={i}
                className="card card-light accent-top p-7 flex flex-col gap-3"
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: '#5856cc' }}
                >
                  {phase.week}
                </p>
                <h3 className="text-lg font-semibold" style={{ color: '#0E0E12' }}>
                  {phase.label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#3D4452' }}>
                  {phase.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </SectionWrapper>

      {/* ── 6. Charter CTA ───────────────────────────────── */}
      <SectionWrapper darker>
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-10"
          style={{ paddingTop: 'var(--section-md)', paddingBottom: 'var(--section-md)' }}
        >
          <div className="max-w-xl">
            <p className="eyebrow mb-4" style={{ color: 'rgba(183,181,254,0.6)' }}>
              {ui.charterEyebrow}
            </p>
            <h2 className="mb-5">{ui.charterHeading}</h2>
            <p className="text-lg leading-relaxed mb-4" style={{ color: '#94A3B8' }}>
              {ui.charterBody}
            </p>
            <p className="text-sm" style={{ color: 'rgba(183,181,254,0.45)' }}>
              {ui.charterNote}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href={`/${locale}/consult`}
              className="btn btn-charter text-base px-8 py-4 justify-center"
            >
              {ui.charterCta}
            </Link>
          </div>
        </div>
      </SectionWrapper>

    </>
  )
}