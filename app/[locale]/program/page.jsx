// app/[locale]/program/page.jsx
//
// The 16-Week Program page.
// Server-rendered — zero 'use client'. All interactivity is CSS-only.
//
// Sections (top → bottom):
//   1. Hero          — dark, heading + dual CTAs
//   2. ProofStrip    — dark, three stat callouts
//   3. LoopSection   — dark, LoopDiagram with description
//   4. Structure     — light, three-phase program arc
//   5. LexileSection — dark, LexileBar with example result
//   6. Navigators    — light, credentials
//   7. Hangar        — dark, community hub
//   8. CharterCTA    — dark, conversion

import Link from 'next/link'

import { notFound }              from 'next/navigation'
import { isValidLocale,
         localeParams,
         getContent   }          from '@/lib/i18n'
import { buildMetadata }         from '@/lib/metadata'
import { courseSchema }          from '@/lib/schema'

import SectionWrapper from '@/components/ui/SectionWrapper'
import Button         from '@/components/ui/Button'
import Badge          from '@/components/ui/Badge'
import LoopDiagram    from '@/components/ui/LoopDiagram'
import LexileBar      from '@/components/ui/LexileBar'

// ── Static params ─────────────────────────────────────────────
export function generateStaticParams() {
  return localeParams()
}

// ── Metadata ──────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getContent(locale, 'program')
  return buildMetadata({
    locale,
    path:        '/program',
    title:       t.meta.title,
    description: t.meta.description,
  })
}

// ── Page ──────────────────────────────────────────────────────
export default async function ProgramPage({ params }) {
  const { locale } = await params

  if (!isValidLocale(locale)) notFound()

  const t = await getContent(locale, 'program')

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema()) }}
      />

      {/* ── 1. Hero ──────────────────────────────────────── */}
      <SectionWrapper hero>
        <div className="py-24 md:py-32 max-w-3xl">

          <Badge className="mb-6">{t.hero.eyebrow}</Badge>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 text-gradient"
          >
            {t.hero.heading}
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
            style={{ color: '#94A3B8' }}
          >
            {t.hero.subheading}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button as={Link} variant="charter" href={`/${locale}/consult`}>
              {t.hero.ctaPrimary}
            </Button>
            <Button as={Link} variant="ghost" href={`/${locale}/demos`}>
              {t.hero.ctaSecondary}
            </Button>
          </div>

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

      {/* ── 3. The Loop ──────────────────────────────────── */}
      <SectionWrapper dark>
        <div className="py-20 md:py-24">

          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">{t.loop.eyebrow}</p>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-gradient"
            >
              {t.loop.heading}
            </h2>
            <p style={{ color: '#94A3B8' }} className="text-lg leading-relaxed">
              {t.loop.body}
            </p>
          </div>

          <LoopDiagram />

        </div>
      </SectionWrapper>

      {/* ── 4. Program structure ─────────────────────────── */}
      <SectionWrapper>
        <div className="py-20 md:py-24">

          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4" style={{ color: '#7c79e8' }}>
              {t.structure.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-[#0E0E12]">
              {t.structure.heading}
            </h2>
            <p className="text-lg leading-relaxed text-[#3D4452]">
              {t.structure.body}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {t.structure.phases.map((phase, index) => (
              <div
                key={phase.id}
                className="relative pl-6 border-l-2"
                style={{ borderColor: '#b7b5fe' }}
              >
                <span
                  className="absolute -left-[11px] top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ backgroundColor: '#b7b5fe', color: '#0E0E12' }}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: '#7c79e8' }}
                >
                  {phase.week}
                </p>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ color: '#0E0E12' }}
                >
                  {phase.label}
                </h3>
                <p className="text-sm leading-relaxed text-[#3D4452]">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </SectionWrapper>

      {/* ── 5. Lexile section ────────────────────────────── */}
      <SectionWrapper darker>
        <div className="py-20 md:py-24">

          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-4">{t.lexile.eyebrow}</p>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-gradient"
            >
              {t.lexile.heading}
            </h2>
            <p style={{ color: '#94A3B8' }} className="text-lg leading-relaxed">
              {t.lexile.body}
            </p>
          </div>

          <div className="max-w-xl">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: 'rgba(183,181,254,0.5)' }}
            >
              {t.lexile.example.label}
            </p>
            <LexileBar
              start={t.lexile.example.start}
              end={t.lexile.example.end}
              weeks={t.lexile.example.weeks}
            />
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: '#94A3B8' }}
            >
              {t.lexile.example.context}
            </p>
          </div>

        </div>
      </SectionWrapper>

      {/* ── 6. Navigators ────────────────────────────────── */}
      <SectionWrapper white>
        <div className="py-20 md:py-24">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            <div>
              <p
                className="eyebrow mb-4"
                style={{ color: '#7c79e8' }}
              >
                {t.navigators.eyebrow}
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight mb-5"
                style={{ color: '#0E0E12' }}
              >
                {t.navigators.heading}
              </h2>
              <p className="text-lg leading-relaxed text-[#3D4452]">
                {t.navigators.body}
              </p>
            </div>

            <ul className="flex flex-col gap-4">
              {t.navigators.credentials.map((credential, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: '#b7b5fe' }}
                    aria-hidden="true"
                  />
                  <span className="text-[0.9375rem] leading-relaxed text-[#3D4452]">
                    {credential}
                  </span>
                </li>
              ))}
            </ul>

          </div>

        </div>
      </SectionWrapper>

      {/* ── 7. The Hangar ────────────────────────────────── */}
      <SectionWrapper dark>
        <div className="py-20 md:py-24 max-w-2xl">

          <Badge className="mb-6">{t.hangar.eyebrow}</Badge>

          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-gradient"
          >
            {t.hangar.heading}
          </h2>

          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: '#94A3B8' }}
          >
            {t.hangar.body}
          </p>

          <Button as={Link} variant="primary" href={`/${locale}/the-hangar`}>
            Learn About The Hangar
          </Button>

        </div>
      </SectionWrapper>

      {/* ── 8. Charter CTA ───────────────────────────────── */}
      <SectionWrapper darker>
        <div className="py-20 md:py-24 max-w-2xl">

          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'rgba(183,181,254,0.5)' }}
          >
            {t.charter.eyebrow}
          </p>

          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-gradient"
          >
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

          <p
            className="mt-4 text-xs"
            style={{ color: 'rgba(183,181,254,0.4)' }}
          >
            {t.charter.note}
          </p>

        </div>
      </SectionWrapper>

    </>
  )
}