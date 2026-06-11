// app/[locale]/page.tsx
//
// Homepage. SEO priority: Highest.
// Bilingual: all copy lives in content/marketing.{en,zh}.js as `export const home`
// (migrated 2026-05-21 from inline HOMEPAGE_COPY). Locale switch wires the two
// language slices into HOMEPAGE_COPY below.
//
// Sections:
//   1.  Hero              — LIGHT  (#F5F5FF)
//   2.  ProofStrip        — DARK   (#212830)
//   3.  PhotoIntro        — WHITE  (#ffffff)
//   4.  LoopSection       — DARK   (#212830)
//   5.  ConfidenceSection — LIGHT  (#F5F5FF)
//   6.  ParentTrustSection— DARK   (#212830)
//
// Pure server component. Zero 'use client'.

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import LexileBar                        from '@/components/ui/LexileBar'
import AgeBandChooser                   from '@/components/ui/AgeBandChooser'
import { home as homeEn, ageBands as bandsEn }      from '@/content/marketing.en'
import { home as homeZh, ageBands as bandsZh }      from '@/content/marketing.zh'

// ── Metadata ──────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const c = HOMEPAGE_COPY[locale] ?? HOMEPAGE_COPY.en
  return buildMetadata({
    locale,
    path:        '/',
    title:       c.meta.title,
    description: c.meta.description,
  })
}

// ─────────────────────────────────────────────────────────────
// BILINGUAL COPY — sourced from content/marketing.{en,zh}.js
// ─────────────────────────────────────────────────────────────
const HOMEPAGE_COPY: Record<string, any> = {
  en: homeEn,
  zh: homeZh,
}

const BANDS_COPY: Record<string, any> = {
  en: bandsEn,
  zh: bandsZh,
}

// ═══════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═══════════════════════════════════════════════════════════════
function Hero({ locale, c }: { locale: string; c: any }) {
  return (
    <section
      className="section-light relative overflow-hidden"
      aria-labelledby="hero-heading"
      style={{
        minHeight:  'calc(100dvh - var(--nav-height))',
        display:    'flex',
        alignItems: 'center',
        paddingTop: 'var(--nav-height)',
      }}
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 70% 40%, rgba(183,181,254,0.22) 0%, transparent 65%)' }}
      />

      {/* O glyph watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute select-none"
        style={{ top: '0', right: '0', zIndex: 1 }}
      >
        <svg
          viewBox="280 55 200 195"
          xmlns="http://www.w3.org/2000/svg"
          fill="#b7b5fe"
          opacity="0.12"
          style={{ display: 'block', height: '100dvh', width: 'auto' }}
        >
          <g transform="translate(0,338) scale(0.1,-0.1)" stroke="none">
            <path d="M3650 2626 c-413 -124 -743 -651 -744 -1186 0 -209 37 -313 169 -472 187 -227 711 -313 1054 -174 195 79 426 287 502 451 122 262 102 632 -47 903 -83 152 -247 339 -348 397 -169 98 -417 132 -586 81z m113 -393 c7 -237 14 -219 -93 -227 -41 -4 -99 -8 -127 -10 l-53 -5 0 160 0 159 43 31 c62 46 174 97 213 99 7 0 13 -67 17 -207z m320 155 c37 -17 72 -37 79 -45 9 -11 14 -261 5 -270 -9 -9 -190 -17 -192 -9 -2 6 -5 91 -8 189 l-4 178 26 -6 c14 -3 56 -20 94 -37z m357 -421 c60 -153 78 -325 50 -475 -20 -115 -18 -112 -109 -112 -99 0 -217 -22 -285 -53 -48 -22 -54 -23 -91 -9 -173 63 -480 -8 -701 -163 -80 -55 -75 -56 -114 6 -122 189 -103 463 54 814 l31 70 6 -77 c8 -91 32 -138 86 -163 54 -26 334 -16 443 15 45 13 127 25 204 30 277 19 356 58 356 181 l1 64 19 -23 c10 -12 33 -60 50 -105z m-120 -801 c0 -3 -33 -31 -72 -62 -213 -167 -457 -211 -755 -137 -35 8 -63 19 -63 23 0 12 147 86 218 109 134 45 243 44 351 -4 l60 -27 52 33 c74 47 209 89 209 65z" />
          </g>
        </svg>
      </div>

      <div
        className="container-section relative z-10"
        style={{ paddingTop: 'clamp(3rem, 6vh, 5rem)', paddingBottom: 'clamp(2rem, 4vh, 4rem)' }}
      >
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="badge badge-lavender" aria-label="Program audience">{c.hero.eyebrow}</span>
            {c.hero.eyebrow2 && (
              <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium" style={{ color: '#5856cc' }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F5C842' }} aria-hidden="true" />
                {c.hero.eyebrow2}
              </span>
            )}
          </div>

          <h1 id="hero-heading" className="mb-6" style={{ color: '#212830', fontWeight: 700 }}>
            {c.hero.h1[0]}<br />{c.hero.h1[1]}
            {c.hero.h1Chinese && (
              <><br className="hidden sm:block" /><span style={{ color: '#5856cc' }}>{c.hero.h1Chinese}</span></>
            )}
          </h1>

          <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: '#5856cc', maxWidth: '42rem' }}>{c.hero.consultHook}</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            {/* cta1 = Watch a Demo Class (soft close); cta2 = Book Your Consultation (firm).
                Light hero → filled gold primary + outline secondary (NOT ghost, which is dark-only). */}
            <Link href={`/${locale}/demos`} className="btn btn-charter">
              {c.hero.cta1}
            </Link>
            <Link href={`/${locale}/consult`} className="btn btn-outline">
              {c.hero.cta2}
            </Link>
          </div>

          <p className="text-xs md:text-sm leading-relaxed" style={{ color: '#3D4452', maxWidth: '42rem' }}>{c.hero.trustLine}</p>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 2 — PROOF STRIP
// ═══════════════════════════════════════════════════════════════
function ProofStrip({ c }: { c: any }) {
  return (
    <section className="section-dark" aria-labelledby="proof-heading">
      <div className="container-section">
        <h2 id="proof-heading" className="sr-only">Student Progress Proof</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {c.proof.map((item: any) => (
            <article key={item.id} className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#b7b5fe' }}>
                {item.number}
              </p>
              <p className="text-xs md:text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: '#94A3B8' }}>
                {item.unit}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3 — PHOTO INTRO
// ═══════════════════════════════════════════════════════════════
function PhotoIntro({ locale, c }: { locale: string; c: any }) {
  return (
    <section className="section-light" aria-labelledby="photo-intro-heading">
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <article className="max-w-xl">
            <p className="eyebrow mb-4" style={{ color: '#5856cc' }}>{c.photoIntro.eyebrow}</p>
            <h2 id="photo-intro-heading" className="mb-6" style={{ color: '#212830' }}>{c.photoIntro.heading}</h2>

            <p className="text-base md:text-lg leading-relaxed mb-5" style={{ color: '#3D4452' }}>{c.photoIntro.body0}</p>
            <p className="text-base md:text-lg leading-relaxed mb-5" style={{ color: '#3D4452' }}>{c.photoIntro.body1}</p>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: '#3D4452' }}>{c.photoIntro.body2}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/navigators`} className="btn btn-outline">
                {c.photoIntro.cta1}
              </Link>
              <Link href={`/${locale}/results`} className="btn btn-outline">
                {c.photoIntro.cta2}
              </Link>
            </div>
          </article>

          {/* Image column */}
          <div className="relative" style={{ aspectRatio: '4/3' }}>
            <img
              src="/homepage-mom-daughter-thinking.jpeg"
              alt={c.photoIntro.imgAlt}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 4 — THE LOOP
// ═══════════════════════════════════════════════════════════════
function LoopSection({ locale, c }: { locale: string; c: any }) {
  const steps = c.loop.steps
  return (
    <section className="section-dark" aria-labelledby="loop-heading">
      <div className="container-section">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className="eyebrow mb-4" style={{ color: 'rgba(183,181,254,0.6)' }}>{c.loop.eyebrow}</p>
          <h2 id="loop-heading">{c.loop.heading}</h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed" style={{ color: '#94A3B8' }}>{c.loop.body}</p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="The Loop — DODO Learning methodology">
          {steps.map((step: any, index: number) => (
            <li key={step.id} className="relative">
              <div className="card card-dark h-full p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="loop-step-number" aria-hidden="true" style={{ width: 40, height: 40, fontSize: '0.875rem' }}>{step.number}</span>
                  {index < steps.length - 1 && (
                    <span className="loop-arrow text-lg hidden sm:block lg:hidden" aria-hidden="true">&rarr;</span>
                  )}
                </div>
                <h3 className="text-lg font-bold" style={{ color: '#b7b5fe', letterSpacing: '-0.01em' }}>{step.label}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: '#94A3B8' }}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-start">
          <Link
            href={`/${locale}/methodology`}
            className="btn btn-ghost text-sm px-6 py-3"
            aria-label="Read the full Loop methodology breakdown"
          >
            {c.loop.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 5 — CONFIDENCE SECTION
// ═══════════════════════════════════════════════════════════════
function ConfidenceSection({ locale, c }: { locale: string; c: any }) {
  return (
    <section className="section-light" aria-labelledby="confidence-heading">
      <div className="container-section">
        <div className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">{c.confidence.eyebrow}</p>
          <h2 id="confidence-heading">{c.confidence.heading}</h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed" style={{ color: '#3D4452' }}>{c.confidence.body}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {c.confidence.pillars.map((pillar: any) => (
            <div key={pillar.id} className="card p-8 flex flex-col gap-4 accent-top">
              <p className="eyebrow">{pillar.eyebrow}</p>
              <h3 className="text-xl font-bold leading-snug" style={{ color: '#212830' }}>{pillar.heading}</h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: '#3D4452' }}>{pillar.body}</p>
              <Link
                href={`/${locale}${pillar.linkHref}`}
                className="text-sm font-semibold text-[#5856cc] hover:text-[#3d3baa] transition-colors duration-150 focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#b7b5fe]"
              >
                {pillar.linkLabel}
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
function ParentTrustSection({ locale, c }: { locale: string; c: any }) {
  return (
    <section className="section-dark" aria-labelledby="results-heading">
      <div className="container-section">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="eyebrow mb-4" style={{ color: 'rgba(183,181,254,0.6)' }}>{c.trust.eyebrow}</p>
            <h2 id="results-heading">{c.trust.heading1}<br />{c.trust.heading2}</h2>
          </div>
          <Link
            href={`/${locale}/results`}
            className="btn btn-ghost text-sm px-6 py-3 shrink-0"
            aria-label="View all student results and Lexile data"
          >
            {c.trust.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.trust.results.map((result: any) => (
            <article
              key={result.id}
              className="card card-dark p-6 flex flex-col gap-5"
              aria-label={`${result.student}, ${result.detail}`}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: '#b7b5fe' }}>{result.student}</p>
                <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{result.detail} &nbsp;&middot;&nbsp; {result.weeks} {c.trust.weeksLabel}</p>
              </div>
              <LexileBar start={result.start} end={result.end} weeks={result.weeks} />
              <span className="badge badge-lavender-dark self-start">6+1 {result.trait}</span>
              <blockquote className="mt-auto">
                <p className="text-sm leading-relaxed italic" style={{ color: '#94A3B8' }}>&ldquo;{result.quote}&rdquo;</p>
                <footer className="mt-3 text-xs font-medium" style={{ color: 'rgba(183,181,254,0.5)' }}>&mdash; {result.source}</footer>
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// PAGE EXPORT
// ═══════════════════════════════════════════════════════════════
export function generateStaticParams() {
  return localeParams()
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const c = HOMEPAGE_COPY[locale] ?? HOMEPAGE_COPY.en
  const bands = BANDS_COPY[locale] ?? BANDS_COPY.en
  return (
    <>
      <Hero locale={locale} c={c} />
      <ProofStrip c={c} />
      <AgeBandChooser locale={locale} copy={bands} current={null} />
      <PhotoIntro locale={locale} c={c} />
      <LoopSection locale={locale} c={c} />
      <ConfidenceSection locale={locale} c={c} />
      <ParentTrustSection locale={locale} c={c} />
    </>
  )
}