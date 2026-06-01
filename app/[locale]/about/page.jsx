// app/[locale]/about/page.jsx
//
// /about — Bilingual EN + ZH.
// Copy rewritten to DODO Learning Master Content & Brand Prompt v2.1 (April 12, 2026)
// Key changes: English mastery as primary goal · Bilingualism as cognitive outcome ·
// Positive-forward voice · English Thinker nomenclature · Future positioning + AI differentiation
//
// BACKGROUND UPDATE — April 13 2026
//   Hero bg: bg-about-hero.webp (blue jay on branch at sunset, watercolor)
//   Replaced CSS backgroundImage with <img> tag + overlay divs
//   Same 4-stop overlay treatment as program / methodology / results / navigators
//   objectPosition: 'center 38%' — frames the jay + branch + sunset horizon
//   Warm amber/orange radial accent echoes the sunset sky

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import { about as copyEn }              from '@/content/marketing.en'
import { about as copyZh }              from '@/content/marketing.zh'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const meta = (COPY[locale] ?? COPY.en).meta
  return buildMetadata({ locale, title: meta.title, description: meta.description, path: '/about' })
}

// ─────────────────────────────────────────────────────────────
// BILINGUAL CONTENT
// ─────────────────────────────────────────────────────────────
const COPY = { en: copyEn, zh: copyZh }

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────
function BilingualHeading({ en, cn, light = false, center = false, locale = 'en' }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 600, lineHeight: 1.2, color: light ? '#F0F0F0' : '#0E0E12' }}>
        {en}
      </h2>
      {locale === 'zh' && (
        <p className="mt-2" style={{ fontFamily: 'var(--font-cjk)', fontSize: '16px', fontWeight: 500, color: light ? '#b7b5fe' : '#5856cc' }}>
          {cn}
        </p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────
const PILLARS_BASE = [
  { id: 'belief-1', num: '01', belief: 'Language is architecture for thought. We build the architecture first.', beliefCn: '\u8bed\u8a00\u662f\u601d\u7ef4\u7684\u67b6\u6784\u3002\u6211\u4eec\u5148\u5efa\u67b6\u6784\u3002' },
  { id: 'belief-2', num: '02', belief: "Children don\u2019t need more content. They need better conversations.", beliefCn: '\u5b69\u5b50\u9700\u8981\u7684\u4e0d\u662f\u66f4\u591a\u5185\u5bb9\uff0c\u800c\u662f\u66f4\u597d\u7684\u5bf9\u8bdd\u3002' },
  { id: 'belief-3', num: '03', belief: 'A rigorous English mind is a bilingual mind \u2014 by nature, not by design.', beliefCn: '\u4e25\u8c28\u7684\u82f1\u8bed\u601d\u7ef4\u8005\uff0c\u81ea\u7136\u662f\u6d41\u5229\u7684\u53cc\u8bed\u8005\u3002' },
  { id: 'belief-4', num: '04', belief: 'Progress must be visible, measurable, and felt. We show parents the results.', beliefCn: '进步必须可见、可衡量、可感知。我们让家长看见结果。' },
]

const LOOP_STEPS_BASE = [
  { id: 'read',  step: 'Read',  stepCn: '\u9605\u8bfb' },
  { id: 'think', step: 'Think', stepCn: '\u601d\u8003' },
  { id: 'speak', step: 'Speak', stepCn: '\u8868\u8fbe' },
  { id: 'write', step: 'Write', stepCn: '\u4e66\u5199' },
]

const NAVIGATOR_TRAITS = [
  { trait: 'Curious',          traitZh: '\u597d\u5947',                  symbol: '?' },
  { trait: 'Patient',          traitZh: '\u8010\u5fc3',                  symbol: '~' },
  { trait: 'English Thinkers', traitZh: '\u82f1\u8bed\u601d\u7ef4\u8005', symbol: 'EN' },
  { trait: 'Empathetic',       traitZh: '\u5171\u60c5',                  symbol: '\u2661' },
  { trait: 'Rigorous',         traitZh: '\u4e25\u8c28',                  symbol: '\u25c8' },
]

const FAMILIES_BASE = [
  { id: 'family-1', title: 'The High-Standard Home',  titleCn: '\u9ad8\u6807\u51c6\u5bb6\u5ead',               imgBg: 'linear-gradient(135deg, #142318 0%, #1e3526 60%, #142318 100%)' },
  { id: 'family-2', title: 'The Global Family',        titleCn: '\u56fd\u9645\u5316\u5bb6\u5ead',               imgBg: 'linear-gradient(135deg, #131c2e 0%, #1e2a40 60%, #131c2e 100%)' },
  { id: 'family-3', title: 'The Ambitious Learner',    titleCn: '\u5fd7\u5411\u8fdc\u5927\u7684\u5b66\u4e60\u8005', imgBg: 'linear-gradient(135deg, #2a1218 0%, #3a1e24 60%, #2a1218 100%)' },
]

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────
function BeliefIcon({ id }) {
  const base = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (id === 'belief-1') return <svg {...base}><path d="M9.5 2a4.5 4.5 0 0 0 0 9M14.5 2a4.5 4.5 0 0 1 0 9" /><path d="M5 10a4 4 0 0 0 4 4v6M19 10a4 4 0 0 1-4 4v6M9 20h6" /></svg>
  if (id === 'belief-2') return <svg {...base}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /><path d="M5 17l.75 2.25L8 20l-2.25.75L5 23" /><path d="M19 2l.5 1.5L21 4l-1.5.5L19 6" /></svg>
  return <svg {...base}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
}

function LoopStepIcon({ id }) {
  const base = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (id === 'read')  return <svg {...base} aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
  if (id === 'think') return <svg {...base} aria-hidden="true"><path d="M9.5 2a4.5 4.5 0 0 0 0 9M14.5 2a4.5 4.5 0 0 1 0 9" /><path d="M5 10a4 4 0 0 0 4 4v6M19 10a4 4 0 0 1-4 4v6M9 20h6" /></svg>
  if (id === 'speak') return <svg {...base} aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
  return <svg {...base} aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
}

// ─────────────────────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────────────────────

function Hero({ c, locale }) {
  return (
    <section
      aria-labelledby="about-hero-heading"
      style={{
        minHeight:     '100dvh',
        display:       'flex',
        flexDirection: 'column',
        position:      'relative',
        overflow:      'hidden',
      }}
    >
      {/* Background illustration — blue jay at sunset */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/bg-about-hero.webp"
        alt=""
        aria-hidden="true"
        style={{
          position:       'absolute',
          inset:          0,
          width:          '100%',
          height:         '100%',
          objectFit:      'cover',
          objectPosition: 'center 38%',
          display:        'block',
        }}
      />

      {/* Primary directional overlay — left text zone near-solid, right opens to sunset */}
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

      {/* Warm amber/orange radial accent — echoes the sunset sky */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          background:    'radial-gradient(ellipse 55% 50% at 70% 40%, rgba(200,120,40,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        className="container-section relative z-10 w-full"
        style={{
          flex:          1,
          display:       'flex',
          alignItems:    'center',
          paddingTop:    'calc(var(--nav-height) + 3.5rem)',
          paddingBottom: '5rem',
        }}
      >
        <div className="grid lg:grid-cols-5 gap-12 items-center w-full">
          <div className="lg:col-span-3">
            <div
              className="inline-flex items-center gap-2 mb-10 rounded-full"
              style={{ padding: '6px 16px', border: '1px solid rgba(183,181,254,0.2)', backgroundColor: 'rgba(183,181,254,0.05)' }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#b7b5fe' }} aria-hidden="true" />
              <span style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#b7b5fe' }}>
                {c.hero.chip}
              </span>
            </div>
            <h1
              id="about-hero-heading"
              className="mb-6"
              style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.02em', color: '#F0F0F0' }}
            >
              {c.hero.h1a}<em className="not-italic" style={{ fontWeight: 600, color: '#b7b5fe' }}>{c.hero.h1em1}</em>{c.hero.h1b}<br />
              {c.hero.h1c}<br />
              {c.hero.h1d}<em className="not-italic" style={{ fontWeight: 600, color: '#F5C842' }}>{c.hero.h1em2}</em>{c.hero.h1e}
            </h1>
            {locale === 'zh' && (
              <p className="mb-8" style={{ fontFamily: 'var(--font-cjk)', fontSize: '20px', color: 'rgba(183,181,254,0.5)' }}>
                会说英语的孩子，和用英语思考的孩子，是不一样的。
              </p>
            )}
            <p style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(240,240,240,0.52)', maxWidth: '32rem' }}>
              {c.hero.sub}
            </p>
          </div>
          <div className="lg:col-span-2">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ aspectRatio: '3/4' }}
              aria-label={c.hero.videoLabel}
            >
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, #161c28 0%, #2E3848 50%, #1a2030 100%)' }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
                <div
                  className="flex items-center justify-center"
                  style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: '#F5C842', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M11 8l14 8-14 8V8z" fill="#0E0E12" />
                  </svg>
                </div>
                <p className="mt-4" style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{c.hero.videoLabel}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{c.hero.videoDuration}</p>
              </div>
              <div className="absolute inset-0 rounded-3xl" style={{ border: '1px solid rgba(183,181,254,0.1)' }} aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-16 absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: 'rgba(183,181,254,0.3)', animation: 'bounce 2s infinite' }}>
            <path d="M10 3v11M4 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}

function TheNameSection({ c, locale }) {
  return (
    <section className="relative" aria-labelledby="name-heading" style={{ padding: 'var(--section-md) 0' }}>
      <div aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0E0E12 0%, #212830 40%, #212830 100%)' }} />
      <div className="container-section relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <BilingualHeading en="The Name" cn="名字的故事" light locale={locale} />
            <div className="mt-10 space-y-5" style={{ fontSize: '17px', lineHeight: 1.9, color: 'rgba(240,240,240,0.92)' }}>
              <p>{c.name.p1}<strong style={{ color: '#F0F0F0' }}>{c.name.p1strong}</strong></p>
              <p>{c.name.p2}</p>
              <p>{c.name.p3}</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="flex items-center justify-center" style={{ width: 256, height: 256, borderRadius: '50%', border: '2px solid rgba(183,181,254,0.2)', position: 'relative' }}>
                <div aria-hidden="true" style={{ position: 'absolute', inset: '1rem', borderRadius: '50%', border: '1px solid rgba(183,181,254,0.1)' }} />
                <div className="flex items-center gap-4 relative z-10" aria-label="Do plus Do">
                  <span style={{ fontSize: '56px', fontWeight: 700, color: '#b7b5fe', letterSpacing: '-0.02em', lineHeight: 1 }}>Do</span>
                  <span aria-hidden="true" style={{ fontSize: '32px', fontWeight: 300, color: '#F5C842', lineHeight: 1 }}>+</span>
                  <span style={{ fontSize: '56px', fontWeight: 700, color: '#b7b5fe', letterSpacing: '-0.02em', lineHeight: 1 }}>Do</span>
                </div>
              </div>
              <div aria-hidden="true" style={{ position: 'absolute', top: -8, right: -8, width: 24, height: 24, borderRadius: '50%', backgroundColor: '#F5C842' }} />
              <div aria-hidden="true" style={{ position: 'absolute', bottom: -12, left: -12, width: 16, height: 16, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.4)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatWeBelieve({ c, locale }) {
  return (
    <section className="section-light" aria-labelledby="beliefs-heading">
      <div className="container-section">
        <div className="mb-20 text-center">
          <BilingualHeading en="DODO Learning's Pillars" cn="DODO Learning 的核心支柱" center locale={locale} />
          <p className="mt-4 mx-auto" style={{ fontSize: '15px', color: 'rgba(14,14,18,0.5)', maxWidth: '28rem' }}>{c.beliefs.sub}</p>
        </div>
        <div>
          {PILLARS_BASE.map((item, i) => (
            <div key={item.id} className="py-8 md:py-12" style={{ borderBottom: i < PILLARS_BASE.length - 1 ? '1px solid rgba(14,14,18,0.08)' : 'none' }} aria-label={`Pillar ${item.num}: ${item.belief}`}>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-[3rem_1fr_1fr] md:gap-8 md:items-start">
                <div className="flex items-center justify-center shrink-0" style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.1)', color: '#b7b5fe' }} aria-hidden="true">
                  <BeliefIcon id={item.id} />
                </div>
                <div className="min-w-0">
                  <p style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.3, color: '#0E0E12' }}>&ldquo;{item.belief}&rdquo;</p>
                  {locale === 'zh' && <p className="mt-1" style={{ fontFamily: 'var(--font-cjk)', fontSize: '13px', color: '#5856cc' }}>{item.beliefCn}</p>}
                </div>
                <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#2E3848' }}>{c.beliefs.bodies[i]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TheLoop({ locale, c }) {
  return (
    <section className="section-dark" aria-labelledby="loop-section-heading">
      <div className="container-section">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <BilingualHeading en="The LCS System" cn="语言循环体系" light locale={locale} />
          <p className="max-w-md" style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(240,240,240,0.4)' }}>{c.loop.sub}</p>
        </div>
        <div className="relative">
          <div aria-hidden="true" className="hidden lg:block absolute" style={{ top: '3.5rem', left: '12.5%', right: '12.5%', height: '1px', background: 'linear-gradient(to right, rgba(183,181,254,0) 0%, rgba(183,181,254,0.2) 50%, rgba(183,181,254,0) 100%)' }} />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4" aria-label="The Loop methodology">
            {LOOP_STEPS_BASE.map((item, i) => (
              <li key={item.id} className="text-center px-8 py-8">
                <div className="flex items-center justify-center mx-auto mb-6 relative z-10" style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.1)', border: '1px solid rgba(183,181,254,0.2)', color: '#b7b5fe' }} aria-hidden="true">
                  <LoopStepIcon id={item.id} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.01em', color: '#ffffff', marginBottom: '4px' }}>{item.step}</h3>
                {locale === 'zh' && <p className="mb-4" style={{ fontFamily: 'var(--font-cjk)', fontSize: '14px', color: 'rgba(183,181,254,0.5)' }}>{item.stepCn}</p>}
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(240,240,240,0.5)' }}>{c.loop.descs[i]}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
          <Link href={`/${locale}/methodology`} className="inline-flex items-center gap-2" style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#b7b5fe', textDecoration: 'none', borderBottom: '2px solid rgba(183,181,254,0.5)', paddingBottom: '6px' }}>
            {c.loop.cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
          <Link href={`/${locale}/program`} className="inline-flex items-center gap-2" style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(183,181,254,0.85)', textDecoration: 'none' }}>
            {c.loop.programLink}
          </Link>
        </div>
      </div>
    </section>
  )
}

function WhoNavigatorsAre({ locale, c }) {
  return (
    <section className="section-light" aria-labelledby="navigators-heading">
      <div className="container-section">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden" style={{ height: '520px' }} aria-label="A DODO Navigator in session">
                <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #e8e7f8 0%, #d4d3f0 40%, #c0bfea 100%)' }} aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <BilingualHeading en="Who Navigators Are" cn="关于导师团队" locale={locale} />
            <div className="mt-8 space-y-5" style={{ fontSize: '16px', lineHeight: 1.85, color: '#2E3848' }}>
              <p>{c.navigators.p1pre}<strong style={{ color: '#0E0E12' }}>{c.navigators.p1strong}</strong>{c.navigators.p1post}</p>
              <p>{c.navigators.p2}</p>
              <p>{c.navigators.p3}</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-10" aria-label="Navigator traits">
              {NAVIGATOR_TRAITS.map((item) => (
                <span key={item.trait} className="inline-flex items-center gap-2 rounded-full" style={{ padding: '10px 20px', backgroundColor: '#0E0E12', color: '#ffffff', fontSize: '13px', fontWeight: 500 }}>
                  <span aria-hidden="true" style={{ fontSize: '11px', color: '#b7b5fe' }}>{item.symbol}</span>
                  {locale === 'zh' ? item.traitZh : item.trait}
                </span>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <Link href={`/${locale}/navigators`} style={{ fontSize: '14px', fontWeight: 600, color: '#5856cc', textDecoration: 'none' }}>{c.navigators.navigatorsLink}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ByTheNumbers({ c, locale }) {
  if (!c.stats) return null
  const s = c.stats
  return (
    <section className="section-light" aria-labelledby="bynumbers-heading" style={{ backgroundColor: '#F5F5FF' }}>
      <div className="container-section">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: '#5856cc' }}>{s.eyebrow}</p>
          <h2 id="bynumbers-heading" className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: '#0E0E12', letterSpacing: '-0.025em' }}>{s.h2}</h2>
          <p className="text-base leading-relaxed" style={{ color: '#3D4452' }}>{s.sub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {s.items.map((item, i) => (
            <div key={i} className="rounded-xl p-6"
              style={{ backgroundColor: '#ffffff', border: '1px solid rgba(14,14,18,0.06)' }}>
              <p className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: '#5856cc', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                {item.number}
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: '#3D4452' }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FamiliesWeServe({ c, locale }) {
  return (
    <section className="section-darker" aria-labelledby="families-heading">
      <div className="container-section">
        <div className="mb-16">
          <BilingualHeading en="The Families We Serve" cn="我们服务的家庭" light center locale={locale} />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {FAMILIES_BASE.map((family, i) => (
            <article key={family.id} className="group relative rounded-3xl overflow-hidden" style={{ backgroundColor: '#212830', border: '1px solid rgba(255,255,255,0.05)' }} aria-label={`Family: ${family.title}`}>
              <div className="overflow-hidden" style={{ height: '13rem' }} aria-hidden="true">
                <div className="w-full h-full" style={{ background: family.imgBg }} />
              </div>
              <div className="p-8">
                <p className="mb-3" style={{ fontSize: '13px', fontWeight: 500, fontStyle: 'italic', color: '#F5C842' }}>{c.families.items[i].quote}</p>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff' }}>{family.title}</h3>
                {locale === 'zh' && <p className="mb-4" style={{ fontFamily: 'var(--font-cjk)', fontSize: '13px', color: 'rgba(183,181,254,0.5)' }}>{family.titleCn}</p>}
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'rgba(240,240,240,0.5)' }}>{c.families.items[i].desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClosingStamp({ locale, c }) {
  return (
    <section className="relative overflow-hidden" aria-labelledby="about-closing-heading">
      <div aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0E0E12 0%, #212830 50%, #0E0E12 100%)' }} />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(183,181,254,0.08) 0%, transparent 60%)' }} />
      <div className="relative z-10 text-center mx-auto" style={{ maxWidth: '56rem', padding: '10rem 1.5rem' }}>
        <div className="flex items-center justify-center mx-auto mb-10" style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.1)', border: '1px solid rgba(183,181,254,0.2)', color: '#b7b5fe' }} aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h2 id="about-closing-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '0.5rem' }}>Think Once.</h2>
        <h2 className="mb-6" aria-label="In Both Languages." style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #b7b5fe 0%, #F5C842 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>In Both Languages.</h2>
        {locale === 'zh' && <p className="mb-6" style={{ fontFamily: 'var(--font-cjk)', fontSize: '22px', color: 'rgba(183,181,254,0.5)' }}>语言的根，长在阅读里</p>}
        <p className="mx-auto mb-12" style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(240,240,240,0.4)', maxWidth: '32rem' }}>{c.closing.sub}</p>
        <Link href={`/${locale}/consult`} className="btn btn-charter" style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.02em', padding: '1rem 2.5rem' }} aria-label="Start your child's journey — book a consultation">
          {c.closing.cta}
        </Link>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// PAGE EXPORT
// ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return localeParams()
}

export default async function AboutPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en
  return (
    <>
      <Hero c={c} locale={locale} />
      <TheNameSection c={c} locale={locale} />
      <WhatWeBelieve c={c} locale={locale} />
      <TheLoop locale={locale} c={c} />
      <WhoNavigatorsAre locale={locale} c={c} />
      <ByTheNumbers     c={c} locale={locale} />
      <FamiliesWeServe  c={c} locale={locale} />
      <ClosingStamp locale={locale} c={c} />
    </>
  )
}