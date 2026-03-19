// app/[locale]/consult/page.jsx
//
// Diagnostic Consultation booking page.
// Highest a11y risk in the site — all form a11y is in ConsultForm.jsx.
// Server-rendered shell — form is a client component.
//
// Sections:
//   1. Hero      — dark, what the call is
//   2. What happens — light, 4-phase call breakdown
//   3. Trust     — dark, Navigator not sales
//   4. Form      — light, ConsultForm

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams,
         getContent }                  from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import SectionWrapper                  from '@/components/ui/SectionWrapper'
import Badge                           from '@/components/ui/Badge'
import ConsultForm                     from '@/components/consult/ConsultForm'

export function generateStaticParams() { return localeParams() }

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getContent(locale, 'consult')
  return buildMetadata({ locale, path: '/consult', title: t.meta.title, description: t.meta.description })
}

export default async function ConsultPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const t = await getContent(locale, 'consult')

  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────── */}
      <SectionWrapper hero>
        <div className="py-24 md:py-32 max-w-3xl">
          <Badge className="mb-6">{t.hero.eyebrow}</Badge>
          <h1
            className="font-bold leading-tight tracking-tight mb-5 text-gradient"
            style={{ fontSize: 'clamp(32px, 5vw, 60px)', letterSpacing: '-0.03em' }}
          >
            {t.hero.heading}
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
            style={{ color: '#94A3B8' }}
          >
            {t.hero.subheading}
          </p>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              backgroundColor: 'rgba(183,181,254,0.1)',
              border: '1px solid rgba(183,181,254,0.25)',
              color: '#b7b5fe',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#F5C842' }}
              aria-hidden="true"
            />
            {t.hero.badge}
          </div>
        </div>
      </SectionWrapper>

      {/* ── 2. What happens in the call ───────────────────── */}
      <SectionWrapper white>
        <div className="py-20 md:py-24">
          <div className="max-w-2xl mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-4"
              style={{ color: '#7c79e8' }}
            >
              {t.what.eyebrow}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {t.what.phases.map((phase, index) => (
              <div
                key={phase.id}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderTop: '2.5px solid #b7b5fe',
                  boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: 'rgba(183,181,254,0.12)',
                      color: '#b7b5fe',
                    }}
                  >
                    {phase.time}
                  </span>
                </div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ color: '#0E0E12' }}
                >
                  {phase.label}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#3D4452' }}
                >
                  {phase.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── 3. Trust ──────────────────────────────────────── */}
      <SectionWrapper darker>
        <div className="py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.15em] mb-4"
                style={{ color: 'rgba(183,181,254,0.5)' }}
              >
                {t.trust.eyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-gradient">
                {t.trust.heading}
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: '#94A3B8' }}>
                {t.trust.body}
              </p>
            </div>

            <ul className="flex flex-col gap-4 lg:pt-2">
              {t.trust.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: '#b7b5fe' }}
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </SectionWrapper>

      {/* ── 4. Form ───────────────────────────────────────── */}
      <SectionWrapper>
        <div className="py-20 md:py-24" id="consult-form">
          <div className="max-w-xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-center"
              style={{ color: '#0E0E12' }}
            >
              {t.cta.heading}
            </h2>
            <p
              className="text-base leading-relaxed mb-8 text-center"
              style={{ color: '#3D4452' }}
            >
              {t.cta.body}
            </p>
            <ConsultForm labels={t.cta.form} variant="consult" />
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}