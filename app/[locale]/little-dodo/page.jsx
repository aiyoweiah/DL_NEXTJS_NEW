// app/[locale]/little-dodo/page.jsx
//
// Little DODO — the K–2 (ages 5–8) sibling of the 16-Week Program.
// High-frequency, low-pressure foundational reading + comprehension.
//
// Inline COPY pattern (bilingual EN/ZH) — same approach as program, about.
// Chrome/funnel per .interface-design/system.md:
//   - Hero leads SOFT (Watch a Demo Class) — cold surface.
//   - The page owns its firm close (CtaSection), so /little-dodo is on the
//     PreCtaBand SUPPRESS list (one conversion moment per page, D33).
//   - AgeBandChooser sits directly below the hero (program-family branch;
//     honours the no-dropdown nav decision).
// Voice: K–2-warm, but English-mastery-primary; NOT Lexile-heavy (K–2 is
// pre-measurement). See docs/little-dodo-plan.md.
//
// BACKGROUND — 2026-06-02
//   Hero bg: little-dodo-background.webp (young dodo with a picture book at
//   dawn, watercolor — 2560×1429). Same 4-stop overlay treatment as program /
//   about / demos: <img> + 108deg directional overlay + bottom vignette +
//   warm-amber radial accent (rgba(200,140,40,…)) echoing the dawn light.
//   objectPosition 'center 40%' frames the bird + book in the revealed right zone.

import Link                              from 'next/link'
import { notFound }                      from 'next/navigation'
import { isValidLocale, localeParams }   from '@/lib/i18n'
import { buildMetadata }                 from '@/lib/metadata'
import { littleDodoCourseSchema }        from '@/lib/schema'
import AgeBandChooser                    from '@/components/ui/AgeBandChooser'
import { littleDodo as copyEn, ageBands as bandsEn } from '@/content/marketing.en'
import { littleDodo as copyZh, ageBands as bandsZh } from '@/content/marketing.zh'

// ─────────────────────────────────────────────────────────────
// BILINGUAL COPY
// ─────────────────────────────────────────────────────────────
const COPY  = { en: copyEn,  zh: copyZh  }
const BANDS = { en: bandsEn, zh: bandsZh }

// ─────────────────────────────────────────────────────────────
// SHARED HELPERS
// ─────────────────────────────────────────────────────────────
function Eyebrow({ children, dark = false }) {
  return (
    <p
      className="text-xs font-semibold uppercase tracking-widest mb-3"
      style={{ color: dark ? 'rgba(183,181,254,0.65)' : '#7c79e8' }}
    >
      {children}
    </p>
  )
}

function BilingualH2({ primary, secondary, light = false, id }) {
  return (
    <>
      <h2
        id={id}
        className="text-2xl md:text-3xl font-bold tracking-tight"
        style={{ color: light ? '#F0F0F0' : '#0E0E12', letterSpacing: '-0.02em', lineHeight: 1.2 }}
      >
        {primary}
      </h2>
      {secondary && (
        <p
          style={{
            fontFamily: 'var(--font-cjk)',
            fontSize: '15px',
            color: light ? 'rgba(183,181,254,0.4)' : '#7c79e8',
            marginTop: '0.5rem',
          }}
        >
          {secondary}
        </p>
      )}
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 1 — HERO (dark, image-free)
// ─────────────────────────────────────────────────────────────
function Hero({ locale, c }) {
  return (
    <section
      aria-labelledby="ld-hero-heading"
      style={{
        minHeight:     '100dvh',
        display:       'flex',
        flexDirection: 'column',
        position:      'relative',
        overflow:      'hidden',
        backgroundColor: '#0E0E12',
      }}
    >
      {/* Background illustration — young dodo with a picture book at dawn, watercolor */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/little-dodo-background.webp"
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

      {/* Primary directional overlay — left text zone near-solid, right opens to the art */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(108deg, rgba(14,14,18,0.98) 0%, rgba(14,14,18,0.97) 35%, rgba(14,14,18,0.80) 58%, rgba(14,14,18,0.28) 100%)',
        }}
      />

      {/* Bottom vignette — anchors the stat rail transition */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(14,14,18,0.88) 0%, transparent 28%)',
        }}
      />

      {/* Warm amber radial accent — echoes the dawn light around the book */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          background:    'radial-gradient(ellipse 55% 50% at 68% 42%, rgba(200,140,40,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container-section relative z-10"
        style={{
          flex:          1,
          display:       'flex',
          alignItems:    'center',
          paddingTop:    'calc(var(--nav-height) + 3.5rem)',
          paddingBottom: '2.5rem',
        }}
      >
        <div style={{ maxWidth: '46rem' }}>
          <div
            className="inline-flex items-center gap-2 mb-7 rounded-full"
            style={{ padding: '5px 14px', border: '1px solid rgba(183,181,254,0.18)', backgroundColor: 'rgba(183,181,254,0.05)' }}
          >
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#b7b5fe' }} />
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#b7b5fe' }}>
              {c.hero.chip}
            </span>
          </div>

          <h1
            id="ld-hero-heading"
            style={{ fontSize: 'clamp(2.25rem, 5vw + 0.5rem, 4rem)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.03em', color: '#F0F0F0', marginBottom: '0.625rem', textWrap: 'balance' }}
          >
            {c.hero.h1}
          </h1>

          {c.hero.h1zh && (
            <p style={{ fontFamily: 'var(--font-cjk)', fontSize: '17px', fontWeight: 500, color: 'rgba(183,181,254,0.40)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              {c.hero.h1zh}
            </p>
          )}

          <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'rgba(240,240,240,0.52)', maxWidth: '36rem', marginBottom: '2.25rem' }}>
            {c.hero.sub}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Soft close leads on this cold surface */}
            <Link href={`/${locale}/demos`} className="btn btn-primary" style={{ fontWeight: 700 }}>{c.hero.cta1}</Link>
            <Link href={`/${locale}/consult`} className="btn btn-ghost">{c.hero.cta2}</Link>
          </div>
        </div>
      </div>

      {/* Stat rail */}
      <div style={{ borderTop: '1px solid rgba(183,181,254,0.07)', flexShrink: 0, position: 'relative', zIndex: 10, backgroundColor: '#1C2330' }}>
        <div className="container-section">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} className="sm:grid-cols-6">
            {c.hero.stats.map((s, i) => (
              <div
                key={i}
                style={{ padding: '1.25rem 0.5rem', borderLeft: i % 6 === 0 ? 'none' : '1px solid rgba(183,181,254,0.06)', textAlign: 'center' }}
              >
                <div style={{ fontSize: '1.375rem', fontWeight: 700, color: '#b7b5fe', letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#F0F0F0', marginTop: '0.25rem' }}>{s.unit}</div>
                <div style={{ fontSize: '11px', color: 'rgba(240,240,240,0.4)', marginTop: '0.25rem', lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 3 — PROBLEM / REASSURANCE (white)
// ─────────────────────────────────────────────────────────────
function ProblemSection({ c }) {
  return (
    <section aria-labelledby="ld-problem-heading" style={{ backgroundColor: '#ffffff', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ maxWidth: '42rem' }}>
          <Eyebrow>{c.problem.eyebrow}</Eyebrow>
          <BilingualH2 id="ld-problem-heading" primary={c.problem.h2} secondary={c.problem.h2zh} />
          <p style={{ fontSize: '1rem', lineHeight: 1.85, color: '#3D4452', marginTop: '1.125rem' }}>
            {c.problem.body}
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 4 — HOW IT WORKS (light, 3 cards)
// ─────────────────────────────────────────────────────────────
function HowSection({ c }) {
  return (
    <section aria-labelledby="ld-how-heading" style={{ backgroundColor: '#F5F5FF', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <Eyebrow>{c.how.eyebrow}</Eyebrow>
        <BilingualH2 id="ld-how-heading" primary={c.how.h2} secondary={c.how.h2zh} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {c.how.steps.map((s) => (
            <div
              key={s.num}
              className="rounded-xl p-6"
              style={{ backgroundColor: '#ffffff', border: '1px solid rgba(14,14,18,0.08)' }}
            >
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#7c79e8', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>{s.num}</div>
              <h3 className="text-base font-bold mb-2" style={{ color: '#0E0E12' }}>{s.label}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#3D4452' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 5 — SHARED CREDIBILITY (dark)
// ─────────────────────────────────────────────────────────────
function SharedSection({ c }) {
  return (
    <section aria-labelledby="ld-shared-heading" style={{ backgroundColor: '#212830', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ maxWidth: '42rem' }}>
          <Eyebrow dark>{c.shared.eyebrow}</Eyebrow>
          <BilingualH2 id="ld-shared-heading" primary={c.shared.h2} secondary={c.shared.h2zh} light />
          <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'rgba(240,240,240,0.6)', marginTop: '1.125rem' }}>
            {c.shared.body}
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 6 — FIT (light, checklist)
// ─────────────────────────────────────────────────────────────
function FitSection({ c }) {
  return (
    <section aria-labelledby="ld-fit-heading" style={{ backgroundColor: '#F5F5FF', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ maxWidth: '42rem' }}>
          <Eyebrow>{c.fit.eyebrow}</Eyebrow>
          <BilingualH2 id="ld-fit-heading" primary={c.fit.h2} secondary={c.fit.h2zh} />
          <ul className="mt-6 space-y-3">
            {c.fit.points.map((p, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#7c79e8' }} aria-hidden="true" />
                <span className="text-[0.9375rem] leading-relaxed" style={{ color: '#3D4452' }}>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 7 — CLOSE (light; page's single in-body conversion moment)
// ─────────────────────────────────────────────────────────────
function CtaSection({ locale, c }) {
  return (
    <section aria-labelledby="ld-cta-heading" style={{ backgroundColor: '#ffffff', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ maxWidth: '40rem' }}>
          <Eyebrow>{c.cta.eyebrow}</Eyebrow>
          <BilingualH2 id="ld-cta-heading" primary={c.cta.h2} secondary={c.cta.h2zh} />
          <p style={{ fontSize: '1rem', lineHeight: 1.82, color: '#3D4452', marginTop: '1.125rem', marginBottom: '1.875rem' }}>
            {c.cta.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={`/${locale}/consult`} className="btn btn-charter">{c.cta.btn}</Link>
            <Link href={`/${locale}/demos`} className="btn btn-ghost">{c.cta.watch}</Link>
          </div>
          <p style={{ fontSize: '0.8125rem', color: '#7B8494', marginTop: '0.875rem' }}>{c.cta.note}</p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// STATIC PARAMS & METADATA
// ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return localeParams()
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const c = COPY[locale] ?? COPY.en
  return buildMetadata({
    locale,
    path:        '/little-dodo',
    title:       c.meta.title,
    description: c.meta.description,
  })
}

// ─────────────────────────────────────────────────────────────
// PAGE EXPORT
// ─────────────────────────────────────────────────────────────
export default async function LittleDodoPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const c     = COPY[locale]  ?? COPY.en
  const bands = BANDS[locale] ?? BANDS.en

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(littleDodoCourseSchema()) }}
      />
      <Hero            locale={locale} c={c} />
      <AgeBandChooser  locale={locale} copy={bands} current="/little-dodo" />
      <ProblemSection  c={c} />
      <HowSection      c={c} />
      <SharedSection   c={c} />
      <FitSection      c={c} />
      <CtaSection      locale={locale} c={c} />
    </>
  )
}
