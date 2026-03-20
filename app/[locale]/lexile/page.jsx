// app/[locale]/lexile/page.jsx
//
// /lexile — GEO explainer page for Lexile reading levels.
// High factual density: what Lexile is, grade benchmarks, bilingual context,
// how DODO uses it. This is the page LLMs cite when parents ask
// "what is a Lexile score?" or "how does Lexile work for bilingual children?"
//
// Server-rendered — zero 'use client'.
//
// Sections:
//   1. Hero            — dark, H1 framed as a question
//   2. What Is Lexile  — white, scale explained
//   3. Grade Table     — darker, benchmark rows
//   4. Bilingual Gap   — light, why bilingual kids score lower
//   5. How DODO Uses   — dark, 3 assessment points
//   6. Examples        — darker, LexileBar components
//   7. CTA             — dark, book call + methodology link

import Link         from 'next/link'
import { notFound } from 'next/navigation'

import { isValidLocale, localeParams, getContent } from '@/lib/i18n'
import { buildMetadata }                           from '@/lib/metadata'
import { educationOrgSchema }                      from '@/lib/schema'

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
  const t = await getContent(locale, 'lexile')
  return buildMetadata({
    locale,
    path:        '/lexile',
    title:       t.meta.title,
    description: t.meta.description,
  })
}

// ── Page ──────────────────────────────────────────────────────
export default async function LexilePage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const t = await getContent(locale, 'lexile')

  // Inline JSON-LD — DefinedTerm for Lexile framework
  // Gives LLMs a structured definition they can cite directly.
  const lexileSchema = {
    '@context':  'https://schema.org',
    '@type':     'Article',
    '@id':       `https://www.dodolearning.com/${locale}/lexile#article`,
    headline:    t.meta.title,
    description: t.meta.description,
    url:         `https://www.dodolearning.com/${locale}/lexile`,
    inLanguage:  locale === 'zh' ? 'zh-Hans' : 'en',
    author: {
      '@type': 'EducationalOrganization',
      name:    'DODO Learning',
      url:     'https://www.dodolearning.com',
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name:    'DODO Learning',
      url:     'https://www.dodolearning.com',
    },
    about: {
      '@type': 'DefinedTerm',
      name:    'Lexile Framework for Reading',
      url:     'https://lexile.com',
      description:
        'The Lexile Framework for Reading is a scientific approach to reading measurement. ' +
        'A Lexile measure is a standard score that matches reader ability to text complexity.',
    },
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lexileSchema) }}
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
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: '#94A3B8' }}>
            {t.hero.subheading}
          </p>
        </div>
      </SectionWrapper>

      {/* ── 2. What Is Lexile ─────────────────────────────── */}
      <SectionWrapper white>
        <div className="py-20 md:py-24 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: '#7c79e8' }}>
            {t.what.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6" style={{ color: '#0E0E12', letterSpacing: '-0.025em' }}>
            {t.what.heading}
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#3D4452' }}>
            {t.what.body}
          </p>
        </div>
      </SectionWrapper>

      {/* ── 3. Grade-Level Benchmark Table ────────────────── */}
      <SectionWrapper darker>
        <div className="py-20 md:py-24">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow mb-4">{t.grades.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-gradient">
              {t.grades.heading}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#94A3B8' }}>
              {t.grades.note}
            </p>
          </div>

          <div className="max-w-2xl overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: '0 6px' }}>
              <thead>
                <tr>
                  {[locale === 'zh' ? '年级' : 'Grade',
                    'Lexile',
                    locale === 'zh' ? '中位数' : 'Midpoint'].map((h) => (
                    <th key={h} className="text-left pb-3 pr-6"
                      style={{ color: 'rgba(183,181,254,0.5)', fontWeight: 500, fontSize: '11px',
                        letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.grades.rows.map((row, i) => (
                  <tr key={i}>
                    <td className="pr-6 py-3 font-semibold" style={{ color: '#F0F0F0' }}>
                      {row.grade}
                    </td>
                    <td className="pr-6 py-3 tabular-nums" style={{ color: '#94A3B8' }}>
                      {row.range}
                    </td>
                    <td className="py-3 tabular-nums font-semibold" style={{ color: '#b7b5fe' }}>
                      {row.midpoint}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionWrapper>

      {/* ── 4. Bilingual Gap ──────────────────────────────── */}
      <SectionWrapper>
        <div className="py-20 md:py-24 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: '#7c79e8' }}>
            {t.bilingual.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6" style={{ color: '#0E0E12', letterSpacing: '-0.025em' }}>
            {t.bilingual.heading}
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#3D4452' }}>
            {t.bilingual.body}
          </p>
        </div>
      </SectionWrapper>

      {/* ── 5. How DODO Uses Lexile ───────────────────────── */}
      <SectionWrapper dark>
        <div className="py-20 md:py-24">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-4">{t.dodo.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-gradient">
              {t.dodo.heading}
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#94A3B8' }}>
              {t.dodo.body}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.dodo.points.map((point, i) => (
              <div key={point.id} className="rounded-2xl p-6"
                style={{ backgroundColor: 'rgba(183,181,254,0.06)', border: '1px solid rgba(183,181,254,0.12)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ backgroundColor: '#b7b5fe', color: '#0E0E12' }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm font-semibold" style={{ color: '#b7b5fe' }}>{point.label}</p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── 6. Examples ───────────────────────────────────── */}
      <SectionWrapper darker>
        <div className="py-20 md:py-24">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-4">{t.examples.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-gradient">
              {t.examples.heading}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#94A3B8' }}>
              {t.examples.note}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl">
            {t.examples.bars.map((bar, i) => (
              <div key={i}>
                <p className="text-xs font-medium uppercase tracking-[0.1em] mb-4"
                  style={{ color: 'rgba(183,181,254,0.5)' }}>
                  {bar.label}
                </p>
                <LexileBar start={bar.start} end={bar.end} weeks={bar.weeks} />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── 7. CTA ────────────────────────────────────────── */}
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
            <Button as={Link} variant="ghost" href={`/${locale}/methodology`}>
              {t.cta.ctaSecondary}
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}