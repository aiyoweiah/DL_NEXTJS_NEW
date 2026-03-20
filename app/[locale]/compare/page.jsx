// app/[locale]/compare/page.jsx
//
// /compare — "DODO vs. the alternatives"
// Per §13: frames around methodology differences, not competitor attacks.
// High GEO value — answers the question LLMs receive:
// "How does DODO compare to tutoring / Kumon / reading programs?"
//
// Server-rendered — zero 'use client'.
//
// Sections:
//   1. Hero         — dark, framed as parent's question
//   2. Intro        — white, the core argument
//   3. Alternatives — alternating light/dark, one card-row per alternative
//   4. Decision     — darker, "which tool for which need" table
//   5. CTA          — dark, book diagnostic

import Link         from 'next/link'
import { notFound } from 'next/navigation'

import { isValidLocale, localeParams, getContent } from '@/lib/i18n'
import { buildMetadata }                           from '@/lib/metadata'

import SectionWrapper from '@/components/ui/SectionWrapper'
import Button         from '@/components/ui/Button'
import Badge          from '@/components/ui/Badge'

// ── Static params ─────────────────────────────────────────────
export function generateStaticParams() {
  return localeParams()
}

// ── Metadata ──────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getContent(locale, 'compare')
  return buildMetadata({
    locale,
    path:        '/compare',
    title:       t.meta.title,
    description: t.meta.description,
  })
}

// ── Page ──────────────────────────────────────────────────────
export default async function ComparePage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const t = await getContent(locale, 'compare')

  // Alternate section backgrounds per alternative
  const altBg = [false, true, false, true, false] // light, dark, light, dark, light

  return (
    <>
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
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: '#94A3B8' }}>
            {t.hero.subheading}
          </p>
        </div>
      </SectionWrapper>

      {/* ── 2. Intro ──────────────────────────────────────── */}
      <SectionWrapper white>
        <div className="py-20 md:py-24 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
            style={{ color: '#0E0E12', letterSpacing: '-0.025em' }}>
            {t.intro.heading}
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#3D4452' }}>
            {t.intro.body}
          </p>
        </div>
      </SectionWrapper>

      {/* ── 3. Alternatives ───────────────────────────────── */}
      {t.alternatives.map((alt, i) => {
        const isDark = altBg[i]
        return (
          <SectionWrapper key={alt.id} dark={isDark} white={!isDark}>
            <div className="py-20 md:py-24">

              {/* Section label */}
              <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-8"
                style={{ color: isDark ? 'rgba(183,181,254,0.5)' : '#7c79e8' }}>
                {alt.label}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                {/* Left: what it is + strength + limit */}
                <div className="flex flex-col gap-6">
                  {/* What it is */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-2"
                      style={{ color: isDark ? 'rgba(183,181,254,0.4)' : 'rgba(124,121,232,0.7)' }}>
                      {locale === 'zh' ? '是什么' : 'What It Is'}
                    </p>
                    <p className="text-base leading-relaxed"
                      style={{ color: isDark ? '#94A3B8' : '#3D4452' }}>
                      {alt.what}
                    </p>
                  </div>

                  {/* Strength */}
                  <div className="rounded-xl p-4"
                    style={{
                      backgroundColor: isDark ? 'rgba(183,181,254,0.05)' : 'rgba(183,181,254,0.06)',
                      border: `1px solid ${isDark ? 'rgba(183,181,254,0.1)' : 'rgba(183,181,254,0.15)'}`,
                    }}>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-2"
                      style={{ color: isDark ? 'rgba(183,181,254,0.5)' : 'rgba(124,121,232,0.8)' }}>
                      {locale === 'zh' ? '适合场景' : 'Where It Works'}
                    </p>
                    <p className="text-sm leading-relaxed"
                      style={{ color: isDark ? '#94A3B8' : '#3D4452' }}>
                      {alt.strength}
                    </p>
                  </div>

                  {/* Limit */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-2"
                      style={{ color: isDark ? 'rgba(183,181,254,0.4)' : 'rgba(124,121,232,0.7)' }}>
                      {locale === 'zh' ? '局限性' : 'The Limit'}
                    </p>
                    <p className="text-sm leading-relaxed"
                      style={{ color: isDark ? '#94A3B8' : '#3D4452' }}>
                      {alt.limit}
                    </p>
                  </div>
                </div>

                {/* Right: DODO's position */}
                <div className="lg:pt-2">
                  <div className="rounded-2xl p-6 h-full"
                    style={{
                      backgroundColor: isDark ? 'rgba(183,181,254,0.07)' : '#F0F0FA',
                      border: `1.5px solid ${isDark ? 'rgba(183,181,254,0.18)' : 'rgba(183,181,254,0.3)'}`,
                    }}>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-4"
                      style={{ color: '#b7b5fe' }}>
                      {locale === 'zh' ? 'DODO 的位置' : 'Where DODO Fits'}
                    </p>
                    <p className="text-base leading-relaxed font-medium"
                      style={{ color: isDark ? '#F0F0F0' : '#0E0E12' }}>
                      {alt.dodo}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </SectionWrapper>
        )
      })}

      {/* ── 4. Decision table ─────────────────────────────── */}
      <SectionWrapper darker>
        <div className="py-20 md:py-24">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-4">{t.decision.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
              {t.decision.heading}
            </h2>
          </div>

          <div className="max-w-2xl flex flex-col gap-0">
            {t.decision.rows.map((row, i) => (
              <div key={i}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5"
                style={{ borderBottom: '1px solid rgba(183,181,254,0.10)' }}>
                <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                  {row.need}
                </p>
                <p className="text-sm leading-relaxed font-medium"
                  style={{ color: i === t.decision.rows.length - 1 ? '#b7b5fe' : '#F0F0F0' }}>
                  {row.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── 5. CTA ────────────────────────────────────────── */}
      <SectionWrapper dark>
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
            <Button as={Link} variant="ghost" href={`/${locale}/lexile`}>
              {t.cta.ctaSecondary}
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}