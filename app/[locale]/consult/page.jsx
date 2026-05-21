// app/[locale]/consult/page.jsx
//
// Diagnostic Consultation — Cal.com booking embed.
// Sections (top → bottom):
//   1. Hero           — dark bg illustration, h1, 6 stat pills
//   2. WhatHappens    — white, 4 numbered phase steps (no images)
//   3. RealCall       — dark bg image, narrative overlay
//   4. TrustSection   — dark, Navigator-not-sales + bullet points
//   5. CalendarSection — whisper, Cal.com embed
//   6. CharterSection  — dark footer band
//
// BACKGROUND UPDATE — April 13 2026
//   Hero bg: consult-background.webp (harbour with sailboat at sunset, watercolor)
//   Added <img> + 4-stop overlay to Hero (was plain #0E0E12 + radial)
//   objectPosition: 'center 40%' — centres sailboat + lighthouse + harbour
//   Warm amber radial accent echoes the sunset sky on the right

import Link            from 'next/link'
import { notFound }   from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import ConsultCalEmbed from '@/components/consult/ConsultCalEmbed'
import { consult as copyEn }       from '@/content/marketing.en'
import { consult as copyZh }       from '@/content/marketing.zh'

const COPY = { en: copyEn, zh: copyZh }

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────

function BilingualH2({ primary, secondary, light = false, center = false, id }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2 id={id} style={{ fontSize: 'clamp(1.75rem, 3vw + 0.25rem, 2.75rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.025em', color: light ? '#F0F0F0' : '#0E0E12', textWrap: 'balance', marginBottom: 0 }}>
        {primary}
      </h2>
      <p className="mt-2" style={{ fontFamily: 'var(--font-cjk)', fontSize: '15px', fontWeight: 500, color: light ? '#b7b5fe' : '#5856cc', lineHeight: 1.5 }}>
        {secondary}
      </p>
    </div>
  )
}

function Eyebrow({ children, center = false, dark = false }) {
  return (
    <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: dark ? '#b7b5fe' : '#5856cc', marginBottom: '0.875rem', textAlign: center ? 'center' : undefined }}>
      {children}
    </p>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// Harbour with red-sailed boat at sunset, watercolor.
// Left half: deep teal storm sky — naturally dark for text.
// Right half: amber sunset + harbour buildings — opens through overlay.
// objectPosition 'center 40%' keeps sailboat + lighthouse in frame.
// Warm amber radial accent echoes the sunset sky.
// ─────────────────────────────────────────────────────────────

function Hero({ locale, c }) {
  return (
    <section
      aria-labelledby="consult-hero-heading"
      style={{
        minHeight:     '100dvh',
        display:       'flex',
        flexDirection: 'column',
        position:      'relative',
        overflow:      'hidden',
      }}
    >
      {/* Background illustration */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/consult-background.webp"
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

      {/* Warm amber radial — echoes the harbour sunset */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          background:    'radial-gradient(ellipse 55% 50% at 68% 42%, rgba(195,140,40,0.08) 0%, transparent 65%)',
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
          paddingBottom: '2.5rem',
        }}
      >
        <div style={{ maxWidth: '46rem' }}>
          <div className="inline-flex items-center gap-2 mb-7 rounded-full" style={{ padding: '5px 14px', border: '1px solid rgba(183,181,254,0.18)', backgroundColor: 'rgba(183,181,254,0.05)' }}>
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#b7b5fe' }} />
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#b7b5fe' }}>{c.hero.chip}</span>
          </div>

          <h1
            id="consult-hero-heading"
            style={{ fontSize: 'clamp(2.25rem, 5vw + 0.5rem, 4rem)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.03em', color: '#F0F0F0', marginBottom: '0.625rem', textWrap: 'balance' }}
          >
            {c.hero.h1}
          </h1>
          <p style={{ fontFamily: 'var(--font-cjk)', fontSize: '17px', fontWeight: 500, color: 'rgba(183,181,254,0.40)', marginBottom: '1.25rem', lineHeight: 1.5 }}>{c.hero.h1zh}</p>
          <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'rgba(240,240,240,0.52)', maxWidth: '36rem', marginBottom: '2.25rem' }}>{c.hero.sub}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#consult-calendar" className="btn btn-charter" style={{ fontWeight: 700 }}>{c.hero.cta1}</a>
            <Link href={`/${locale}/program`} className="btn btn-ghost">{c.hero.cta2}</Link>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ borderTop: '1px solid rgba(183,181,254,0.07)', flexShrink: 0, position: 'relative', zIndex: 10, backgroundColor: '#1C2330' }}>
        <div className="container-section">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} className="sm:grid-cols-6">
            {c.hero.stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '1.125rem 0.375rem', borderRight: i !== 2 && i !== 5 ? '1px solid rgba(183,181,254,0.07)' : 'none', borderBottom: i < 3 ? '1px solid rgba(183,181,254,0.07)' : 'none' }}>
                <p style={{ fontSize: 'clamp(1.375rem, 2.5vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: '#b7b5fe' }}>{stat.value}</p>
                <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(240,240,240,0.75)', marginTop: '3px', lineHeight: 1.2 }}>{stat.unit}</p>
                <p style={{ fontSize: '0.625rem', color: 'rgba(183,181,254,0.35)', marginTop: '2px', lineHeight: 1.3 }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 2 — WHAT HAPPENS
// ─────────────────────────────────────────────────────────────

function WhatHappens({ locale, c }) {
  return (
    <section aria-labelledby="phases-heading" style={{ backgroundColor: '#ffffff', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ marginBottom: '2.5rem' }}>
          <Eyebrow>{c.phases.eyebrow}</Eyebrow>
          <BilingualH2 id="phases-heading" primary={c.phases.h2} secondary={c.phases.h2zh} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '0' }} className="sm:grid-cols-2 lg:grid-cols-4">
          {c.phases.steps.map((step, i) => (
            <div key={step.num} style={{ padding: '1.75rem 1.5rem', borderRight: i < 3 ? '1px solid rgba(14,14,18,0.07)' : 'none', borderTop: '3px solid transparent', position: 'relative' }}>
              <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: i === 0 ? '#b7b5fe' : 'rgba(183,181,254,0.15)' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: 'clamp(2rem, 3vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'rgba(183,181,254,0.18)', lineHeight: 1 }}>{step.num}</span>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(88,86,204,0.5)', padding: '2px 8px', border: '1px solid rgba(183,181,254,0.2)', borderRadius: '9999px' }}>{step.time}</span>
              </div>
              <p style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0E0E12', lineHeight: 1.25, marginBottom: '2px' }}>{step.label}</p>
              <p style={{ fontFamily: 'var(--font-cjk)', fontSize: '11px', color: '#5856cc', lineHeight: 1.3, marginBottom: '0.875rem' }}>{step.labelZh}</p>
              <p style={{ fontSize: '0.8125rem', lineHeight: 1.75, color: '#3D4452' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 3 — A REAL CALL
// ─────────────────────────────────────────────────────────────

const CALL_IMG = 'https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80'

function RealCall({ locale, c }) {
  return (
    <section aria-labelledby="call-heading" style={{ position: 'relative', overflow: 'hidden', minHeight: '480px' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={CALL_IMG} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(14,14,18,0.97) 0%, rgba(14,14,18,0.90) 45%, rgba(14,14,18,0.55) 100%)' }} />
      <div className="container-section relative z-10" style={{ padding: 'var(--section-md) 1.25rem' }}>
        <div style={{ maxWidth: '40rem' }}>
          <div className="inline-flex items-center gap-2.5 rounded-full mb-7" style={{ padding: '7px 14px 7px 7px', backgroundColor: 'rgba(183,181,254,0.07)', border: '1px solid rgba(183,181,254,0.14)' }}>
            <span aria-hidden="true" style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#b7b5fe', color: '#0E0E12', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>NV</span>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2 }}>{c.call.navigatorName}</p>
              <p style={{ fontSize: '10px', color: 'rgba(183,181,254,0.55)', lineHeight: 1.2 }}>{c.call.sessionPhase}</p>
            </div>
          </div>
          <Eyebrow dark>{c.call.eyebrow}</Eyebrow>
          <BilingualH2 id="call-heading" primary={c.call.h2} secondary={c.call.h2zh} light />
          <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>{c.call.p1}{' '}<em style={{ fontStyle: 'italic', color: 'rgba(183,181,254,0.8)' }}>{c.call.q1}</em></p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>{c.call.p2}</p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>{c.call.p3}</p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>{c.call.p4}{' '}<em style={{ fontStyle: 'italic', color: 'rgba(183,181,254,0.8)' }}>{c.call.q4}</em></p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 4 — TRUST
// ─────────────────────────────────────────────────────────────

function TrustSection({ locale, c }) {
  return (
    <section aria-labelledby="trust-heading" style={{ backgroundColor: '#212830', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="lg:grid-cols-2">
          <div>
            <Eyebrow dark>{c.trust.eyebrow}</Eyebrow>
            <BilingualH2 id="trust-heading" primary={c.trust.h2} secondary={c.trust.h2zh} light />
            <p style={{ fontSize: '1rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.55)', marginTop: '1.125rem' }}>{c.trust.body}</p>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '0.25rem' }} aria-label="Trust points">
            {c.trust.points.map((point, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span aria-hidden="true" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#b7b5fe', flexShrink: 0, marginTop: '0.45rem' }} />
                <span style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'rgba(240,240,240,0.6)' }}>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 5 — CALENDAR BOOKING
// ─────────────────────────────────────────────────────────────

function CalendarSection({ locale, c }) {
  return (
    <section id="consult-calendar" aria-labelledby="calendar-heading" style={{ backgroundColor: '#F5F5FF', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', marginBottom: '3rem' }} className="lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>{c.calendar.eyebrow}</Eyebrow>
            <BilingualH2 id="calendar-heading" primary={c.calendar.h2} secondary={c.calendar.h2zh} />
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#3D4452', marginTop: '0.875rem', maxWidth: '32rem' }}>{c.calendar.sub}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem', backgroundColor: '#ffffff', borderRadius: '1rem', border: '1px solid rgba(14,14,18,0.07)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="inline-flex items-center gap-2 self-start rounded-full" style={{ padding: '4px 12px', backgroundColor: 'rgba(183,181,254,0.08)', border: '1px solid rgba(183,181,254,0.2)' }}>
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#b7b5fe' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#5856cc' }}>{c.calendar.badge}</span>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', margin: 0, padding: 0, listStyle: 'none' }}>
              {c.calendar.points.map((pt, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <span aria-hidden="true" style={{ width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, backgroundColor: 'rgba(183,181,254,0.12)', border: '1px solid rgba(183,181,254,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                      <path d="M1 3l2 2 4-4" stroke="#b7b5fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span style={{ fontSize: '0.875rem', color: '#3D4452', lineHeight: 1.5 }}>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '1.25rem', border: '1px solid rgba(14,14,18,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflow: 'hidden', padding: '0.5rem' }}>
          <ConsultCalEmbed />
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 6 — CHARTER FOOTER
// ─────────────────────────────────────────────────────────────

function CharterSection({ locale, c }) {
  return (
    <section aria-labelledby="charter-heading" style={{ backgroundColor: '#212830', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ maxWidth: '40rem' }}>
          <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{ padding: '4px 12px', backgroundColor: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.22)' }}>
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#F5C842' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#F5C842' }}>{c.charter.badge}</span>
          </div>
          <h2 id="charter-heading" style={{ fontSize: 'clamp(1.625rem, 2.5vw + 0.25rem, 2.5rem)', fontWeight: 700, letterSpacing: '-0.025em', color: '#F0F0F0', marginBottom: '0.625rem' }}>{c.charter.h2}</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(240,240,240,0.45)', marginBottom: '1.875rem' }}>{c.charter.sub}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#consult-calendar" className="btn btn-charter">{c.charter.btn1}</a>
            <Link href={`/${locale}/program`} className="btn btn-ghost">{c.charter.btn2}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// METADATA + PAGE EXPORT
// ─────────────────────────────────────────────────────────────

export function generateStaticParams() { return localeParams() }

export async function generateMetadata({ params }) {
  const { locale } = await params
  const c = COPY[locale] ?? COPY.en
  return buildMetadata({ locale, path: '/consult', title: c.meta.title, description: c.meta.description })
}

export default async function ConsultPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en
  return (
    <>
      <Hero            locale={locale} c={c} />
      <WhatHappens     locale={locale} c={c} />
      <RealCall        locale={locale} c={c} />
      <TrustSection    locale={locale} c={c} />
      <CalendarSection locale={locale} c={c} />
      <CharterSection  locale={locale} c={c} />
    </>
  )
}