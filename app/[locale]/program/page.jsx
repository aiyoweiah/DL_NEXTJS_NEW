// app/[locale]/program/page.jsx
//
// The 16-Week Program — full visual rebuild to match pre-locale reference.
// Uses inline COPY pattern (bilingual EN/ZH) — same approach as about, navigators,
// the-loop, session, growth, and cities pages. Richer visual structure than the previous
// getContent() version.
//
// Sections (top → bottom):
//   1. Hero          — dark void, ticker strip, h1, 6 stat pills
//   2. Loop          — white, 4 compact step cards + Type A/B note + methodology link
//   3. Journey       — whisper, compact 3-step timeline + inline LexileBar
//   4. Session       — dark bg image, narrative overlay + navigators link
//   5. Growth        — darker, Lexile scale + 6+1 Trait table
//   6. GetStarted    — light, diagnostic CTA
//   7. Charter       — dark, dual-CTA footer band
//
// BACKGROUND UPDATE — April 13 2026
//   Hero bg: program-background.webp (steamboat watercolor illustration)
//   objectPosition: 'center 28%'   — frames the ship above waterline
//   Main overlay: left stop 0.88 → softer right stop 0.18 (illustration is already dark)
//   Radial accent: shifted teal tint to echo illustration palette
//   Stat rail bg: #212830 (slightly lighter than Void Black — matches illustration darks)

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import { courseSchema }                from '@/lib/schema'
import LexileBar                       from '@/components/ui/LexileBar'
import { program as copyEn }              from '@/content/marketing.en'
import { program as copyZh }              from '@/content/marketing.zh'

// ─────────────────────────────────────────────────────────────
// STATIC STRUCTURAL DATA (no locale variants)
// ─────────────────────────────────────────────────────────────

const LEXILE_SCALE = [
  { level: 1200, grade: 'Grade 12+' },
  { level: 1000, grade: 'Grade 9'   },
  { level:  800, grade: 'Grade 6'   },
  { level:  600, grade: 'Grade 4'   },
  { level:  400, grade: 'Grade 2'   },
  { level:  200, grade: 'Grade 1'   },
]

const TRAITS = [
  { id: 'ideas',        en: 'Ideas',            zh: '\u601d\u8003',  start: 2, end: 4 },
  { id: 'organisation', en: 'Organization',     zh: '\u7ed3\u6784',  start: 2, end: 4 },
  { id: 'voice',        en: 'Voice',            zh: '\u58f0\u97f3',  start: 2, end: 4 },
  { id: 'word-choice',  en: 'Word Choice',      zh: '\u7528\u8bcd',  start: 2, end: 5 },
  { id: 'fluency',      en: 'Sentence Fluency', zh: '\u6d41\u7545',  start: 3, end: 5 },
  { id: 'conventions',  en: 'Conventions',      zh: '\u89c4\u8303',  start: 3, end: 4 },
  { id: 'presentation', en: 'Presentation',     zh: '\u5448\u73b0',  start: 2, end: 4 },
]

// ─────────────────────────────────────────────────────────────
// BILINGUAL COPY
// ─────────────────────────────────────────────────────────────

const COPY = { en: copyEn, zh: copyZh }

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────

function BilingualH2({ primary, secondary, light = false, center = false, id }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2
        id={id}
        style={{
          fontSize:      'clamp(1.75rem, 3vw + 0.25rem, 2.75rem)',
          fontWeight:    700,
          lineHeight:    1.15,
          letterSpacing: '-0.025em',
          color:         light ? '#F0F0F0' : '#0E0E12',
          textWrap:      'balance',
          marginBottom:  0,
        }}
      >
        {primary}
      </h2>
      {secondary && (
        <p
          className="mt-2"
          style={{
            fontFamily: 'var(--font-cjk)',
            fontSize:   '15px',
            fontWeight: 500,
            color:      light ? '#b7b5fe' : '#5856cc',
            lineHeight: 1.5,
          }}
        >
          {secondary}
        </p>
      )}
    </div>
  )
}

function Eyebrow({ children, center = false, dark = false }) {
  return (
    <p
      style={{
        fontSize:      '0.75rem',
        fontWeight:    600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color:         dark ? '#b7b5fe' : '#5856cc',
        marginBottom:  '0.875rem',
        textAlign:     center ? 'center' : undefined,
      }}
    >
      {children}
    </p>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// Steamboat watercolor illustration (program-background.webp)
//
// Tuning rationale:
//   • objectPosition 'center 28%' — keeps ship hull and masts in frame,
//     avoids over-cropping the dock ropes at bottom
//   • Main overlay: left darkens to 0.88 for text legibility; right opens
//     to 0.18 so the ship detail reads through (illustration already dark)
//   • Radial accent: teal tint (rgba(100,180,180,…)) echoes illustration palette
//   • Stat rail: #1C2330 — darker than Midnight, lighter than Void Black,
//     matches the illustration's harbour shadow tones
// ─────────────────────────────────────────────────────────────

function Hero({ locale, c }) {
  return (
    <section
      aria-labelledby="program-hero-heading"
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
        src="/program-background.webp"
        alt=""
        aria-hidden="true"
        style={{
          position:       'absolute',
          inset:          0,
          width:          '100%',
          height:         '100%',
          objectFit:      'cover',
          objectPosition: 'center 28%',
          display:        'block',
        }}
      />

      {/* Primary directional overlay — left text zone heavily darkened, right opens to show ship */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(108deg, rgba(14,14,18,0.98) 0%, rgba(14,14,18,0.97) 35%, rgba(14,14,18,0.80) 58%, rgba(14,14,18,0.28) 100%)',
        }}
      />

      {/* Bottom vignette — anchors stat rail transition */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(14,14,18,0.88) 0%, transparent 28%)',
        }}
      />

      {/* Teal accent radial — echoes illustration's harbour tones */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          background:    'radial-gradient(ellipse 55% 45% at 72% 38%, rgba(100,180,180,0.07) 0%, transparent 65%)',
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
          {/* Tagline chip */}
          <div
            className="inline-flex items-center gap-2 mb-7 rounded-full"
            style={{
              padding:         '5px 14px',
              border:          '1px solid rgba(183,181,254,0.18)',
              backgroundColor: 'rgba(183,181,254,0.05)',
            }}
          >
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#b7b5fe' }} />
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#b7b5fe' }}>
              {c.hero.chip}
            </span>
          </div>

          <h1
            id="program-hero-heading"
            style={{
              fontSize:      'clamp(2.25rem, 5vw + 0.5rem, 4rem)',
              fontWeight:    700,
              lineHeight:    1.06,
              letterSpacing: '-0.03em',
              color:         '#F0F0F0',
              marginBottom:  '0.625rem',
              textWrap:      'balance',
            }}
          >
            {c.hero.h1}
          </h1>

          {c.hero.h1zh && (
            <p
              style={{
                fontFamily:   'var(--font-cjk)',
                fontSize:     '17px',
                fontWeight:   500,
                color:        'rgba(183,181,254,0.40)',
                marginBottom: '1.25rem',
                lineHeight:   1.5,
              }}
            >
              {c.hero.h1zh}
            </p>
          )}

          <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'rgba(240,240,240,0.52)', maxWidth: '36rem', marginBottom: '2.25rem' }}>
            {c.hero.sub}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#loop-section" className="btn btn-primary" style={{ fontWeight: 700 }}>{c.hero.cta1}</a>
            <Link href={`/${locale}/consult`} className="btn btn-ghost">{c.hero.cta2}</Link>
          </div>
        </div>
      </div>

      {/* Stat pills rail */}
      <div
        style={{
          borderTop:       '1px solid rgba(183,181,254,0.07)',
          flexShrink:      0,
          position:        'relative',
          zIndex:          10,
          backgroundColor: '#1C2330',
        }}
      >
        <div className="container-section">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} className="sm:grid-cols-6">
            {c.hero.stats.map((stat, i) => {
              const isLastInRow3  = i === 2
              const isLastOverall = i === c.hero.stats.length - 1
              const isInFirstHalf = i < 3
              return (
                <div
                  key={stat.unit + i}
                  style={{
                    textAlign:    'center',
                    padding:      '1.125rem 0.375rem',
                    borderRight:  !isLastOverall && !isLastInRow3 ? '1px solid rgba(183,181,254,0.07)' : 'none',
                    borderBottom: isInFirstHalf ? '1px solid rgba(183,181,254,0.07)' : 'none',
                  }}
                >
                  <p style={{ fontSize: 'clamp(1.375rem, 2.5vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: '#b7b5fe' }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(240,240,240,0.75)', marginTop: '3px', lineHeight: 1.2 }}>
                    {stat.unit}
                  </p>
                  <p style={{ fontSize: '0.625rem', color: 'rgba(183,181,254,0.35)', marginTop: '2px', lineHeight: 1.3 }}>
                    {stat.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 2 — THE LOOP
// ─────────────────────────────────────────────────────────────

const LOOP_ACCENT_COLORS = ['#b7b5fe', '#9896e8', '#7b79d4', '#5856cc']

function LoopSection({ locale, c }) {
  return (
    <section id="loop-section" aria-labelledby="loop-heading" style={{ backgroundColor: '#ffffff', padding: '2.5rem 0' }}>
      <div className="container-section">

        <div
          style={{
            display:        'flex',
            flexWrap:       'wrap',
            alignItems:     'flex-end',
            justifyContent: 'space-between',
            gap:            '0.75rem',
            marginBottom:   '1.5rem',
          }}
        >
          <div>
            <Eyebrow>{c.loop.eyebrow}</Eyebrow>
            <BilingualH2 id="loop-heading" primary={c.loop.h2} secondary={c.loop.h2zh} />
          </div>
          <p
            aria-hidden="true"
            style={{
              fontSize:      '0.6875rem',
              fontWeight:    600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         'rgba(88,86,204,0.4)',
              whiteSpace:    'nowrap',
            }}
          >
            Read → Think → Speak → Write
          </p>
        </div>

        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap:                 '1px',
            backgroundColor:     'rgba(14,14,18,0.07)',
            borderRadius:        '0.875rem',
            overflow:            'hidden',
            border:              '1px solid rgba(14,14,18,0.07)',
          }}
          className="sm:grid-cols-2 lg:grid-cols-4"
        >
          {c.loop.steps.map((step, i) => (
            <article
              key={step.num}
              aria-label={`${step.label} — ${step.labelZh}`}
              style={{ backgroundColor: '#ffffff', padding: '1rem 1.25rem 1.125rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem', flexWrap: 'wrap' }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    backgroundColor: LOOP_ACCENT_COLORS[i],
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, opacity: 0.85,
                  }}
                >
                  <span style={{ fontSize: '9px', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>{i + 1}</span>
                </span>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: '#0E0E12', lineHeight: 1.1 }}>{step.label}</p>
                {locale === 'zh' && (
                  <p style={{ fontFamily: 'var(--font-cjk)', fontSize: '11px', color: LOOP_ACCENT_COLORS[i], lineHeight: 1.1, opacity: 0.75 }}>
                    {step.labelZh}
                  </p>
                )}
                {step.badge && (
                  <span style={{ marginLeft: 'auto', padding: '1px 7px', backgroundColor: 'rgba(183,181,254,0.1)', borderRadius: '9999px', border: '1px solid rgba(183,181,254,0.25)', fontSize: '8px', fontWeight: 600, letterSpacing: '0.08em', color: '#5856cc', whiteSpace: 'nowrap' }}>
                    {step.badge}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.8125rem', lineHeight: 1.7, color: '#3D4452' }}>{step.desc}</p>
            </article>
          ))}
        </div>

        {c.loop.typeAB && (
          <p style={{ marginTop: '1.25rem', fontSize: '0.875rem', lineHeight: 1.8, color: '#3D4452', maxWidth: '48rem' }}>
            {c.loop.typeAB}
          </p>
        )}

        <div style={{ marginTop: '1.25rem' }}>
          <Link
            href={`/${locale}/methodology`}
            style={{ fontSize: '0.875rem', fontWeight: 600, color: '#5856cc', textDecoration: 'none' }}
          >
            {c.loop.methodologyLink}
          </Link>
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 3 — THE JOURNEY
// ─────────────────────────────────────────────────────────────

function JourneySection({ locale, c }) {
  return (
    <section id="structure" aria-labelledby="journey-heading" style={{ backgroundColor: '#F5F5FF', padding: '2.25rem 0' }}>
      <div className="container-section">
        <div style={{ marginBottom: '1.5rem' }}>
          <Eyebrow>{c.journey.eyebrow}</Eyebrow>
          <BilingualH2 id="journey-heading" primary={c.journey.h2} secondary={c.journey.h2zh} />
        </div>

        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap:                 '1px',
            backgroundColor:     'rgba(14,14,18,0.07)',
            borderRadius:        '0.875rem',
            overflow:            'hidden',
            border:              '1px solid rgba(14,14,18,0.07)',
          }}
          className="sm:grid-cols-2 lg:grid-cols-4"
        >
          {c.journey.steps.map((step, i) => (
            <article key={step.label} style={{ backgroundColor: '#ffffff', padding: '1rem 1.25rem 1.125rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
                <span
                  style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    backgroundColor: 'rgba(183,181,254,0.12)',
                    border: '1.5px solid #b7b5fe',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#5856cc', lineHeight: 1 }}>{i + 1}</span>
                </span>
                <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#5856cc', opacity: 0.65 }}>
                  {step.week}
                </span>
              </div>
              <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0E0E12', lineHeight: 1.2, marginBottom: '2px' }}>{step.label}</p>
              {locale === 'zh' && (
                <p style={{ fontFamily: 'var(--font-cjk)', fontSize: '11px', color: '#5856cc', opacity: 0.75, marginBottom: '0.375rem', lineHeight: 1.3 }}>
                  {step.labelZh}
                </p>
              )}
              <p style={{ fontSize: '0.8125rem', lineHeight: 1.65, color: '#3D4452' }}>{step.desc}</p>
            </article>
          ))}

          {/* LexileBar cell */}
          <div style={{ backgroundColor: '#f0efff', padding: '1rem 1.25rem 1.125rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.75rem' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5856cc' }}>
              {locale === 'zh' ? 'Lexile \u6210\u957f' : 'Lexile Growth'}
            </p>
            <LexileBar start={620} end={820} weeks={16} light />
            <p style={{ fontSize: '0.75rem', lineHeight: 1.5, color: '#5856cc', opacity: 0.6 }}>
              {locale === 'zh' ? '\u5178\u578b16\u5468\u6210\u679c\uff1a620L \u2192 820L' : 'Typical 16-week result: 620L \u2192 820L'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 3b — ARCHITECTURE (Loop → LCS → Levels)
// Brand v4.1 §06 — distinguishes per-session Loop from
// curriculum-level LCS from multi-cycle Levels.
// ─────────────────────────────────────────────────────────────

function ArchitectureSection({ locale, c }) {
  if (!c.architecture) return null
  const a = c.architecture
  return (
    <section aria-labelledby="architecture-heading" style={{ backgroundColor: '#212830', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ marginBottom: '2rem' }}>
          <Eyebrow dark>{a.eyebrow}</Eyebrow>
          <BilingualH2 id="architecture-heading" primary={a.h2} secondary={a.h2zh} light />
          <p style={{ marginTop: '1.25rem', fontSize: '1rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)', maxWidth: '48rem' }}>
            {a.body}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: '1.5rem' }}>
          {a.strands.map((strand) => (
            <article key={strand.letter}
              style={{ padding: '1.5rem', backgroundColor: 'rgba(183,181,254,0.06)', border: '1px solid rgba(183,181,254,0.18)', borderRadius: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.625rem', marginBottom: '0.625rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#b7b5fe', lineHeight: 1, letterSpacing: '-0.03em' }} aria-hidden="true">
                  {strand.letter}
                </span>
                <div>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2 }}>{strand.name}</p>
                  {locale === 'zh' ? (
                    <p style={{ fontFamily: 'var(--font-cjk)', fontSize: '11px', color: 'rgba(183,181,254,0.7)', lineHeight: 1.3 }}>{strand.nameZh}</p>
                  ) : (
                    <p style={{ fontFamily: 'var(--font-cjk)', fontSize: '11px', color: 'rgba(183,181,254,0.5)', lineHeight: 1.3 }}>{strand.nameZh}</p>
                  )}
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'rgba(240,240,240,0.65)' }}>{strand.body}</p>
            </article>
          ))}
        </div>
        <p style={{ fontSize: '0.8125rem', lineHeight: 1.7, color: 'rgba(240,240,240,0.45)', maxWidth: '52rem' }}>
          {a.levelsNote}
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 3c — COMBINATIONS (Summit / Core / Flex 1-3)
// ─────────────────────────────────────────────────────────────

function CombinationsSection({ locale, c }) {
  if (!c.combinations) return null
  const k = c.combinations
  return (
    <section id="combinations" aria-labelledby="combinations-heading" style={{ backgroundColor: '#F5F5FF', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ marginBottom: '2rem' }}>
          <Eyebrow>{k.eyebrow}</Eyebrow>
          <BilingualH2 id="combinations-heading" primary={k.h2} secondary={k.h2zh} />
          <p style={{ marginTop: '1.25rem', fontSize: '1rem', lineHeight: 1.82, color: '#3D4452', maxWidth: '48rem' }}>
            {k.body}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3" style={{ marginBottom: '1.25rem' }}>
          {k.items.map((item) => (
            <article key={item.id}
              style={{
                padding: '1.25rem 1rem',
                backgroundColor: item.featured ? '#0E0E12' : '#ffffff',
                color: item.featured ? '#F0F0F0' : '#0E0E12',
                border: item.featured ? '2px solid #b7b5fe' : '1px solid rgba(14,14,18,0.08)',
                borderRadius: '0.625rem',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                minHeight: '220px',
              }}>
              <div>
                {item.featured && (
                  <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#b7b5fe', color: '#0E0E12', fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {locale === 'zh' ? '最受欢迎' : 'Most Popular'}
                  </span>
                )}
                <p style={{ fontSize: '1.125rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{item.name}</p>
                <p style={{ fontFamily: 'var(--font-cjk)', fontSize: '11px', color: item.featured ? 'rgba(183,181,254,0.75)' : '#5856cc', marginTop: '2px', lineHeight: 1.3 }}>
                  {item.nameZh}
                </p>
                <p style={{ fontSize: '0.8125rem', lineHeight: 1.55, color: item.featured ? 'rgba(240,240,240,0.7)' : '#3D4452', marginTop: '0.75rem' }}>
                  {item.format}
                </p>
                <p style={{ fontSize: '0.75rem', lineHeight: 1.5, color: item.featured ? 'rgba(240,240,240,0.55)' : '#7B8494', marginTop: '0.5rem' }}>
                  {item.forWhom}
                </p>
              </div>
              {/* Price intentionally hidden 2026-05-21 per program review Q7 — pricing now via FAQ + consultation. Data preserved in item.price for future re-enabling. */}
              {item.price && false && (
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: item.featured ? '#b7b5fe' : '#0E0E12', letterSpacing: '-0.02em', marginTop: '0.75rem' }}>
                  {item.price}
                </p>
              )}
            </article>
          ))}
        </div>
        <p style={{ fontSize: '0.8125rem', color: '#7B8494', marginBottom: '0.625rem' }}>
          {k.note}
        </p>
        <Link href={`/${locale}/faq#enrollment`} style={{ fontSize: '0.875rem', fontWeight: 600, color: '#5856cc', textDecoration: 'none' }}>
          {k.faqLink}
        </Link>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 4 — A REAL SESSION
// ─────────────────────────────────────────────────────────────

const SESSION_IMG = 'https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80'

function SessionSection({ locale, c }) {
  return (
    <section aria-labelledby="session-heading" style={{ position: 'relative', overflow: 'hidden', minHeight: '500px' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SESSION_IMG} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(14,14,18,0.97) 0%, rgba(14,14,18,0.90) 45%, rgba(14,14,18,0.55) 100%)' }} />

      <div className="container-section relative z-10" style={{ padding: 'var(--section-md) 1.25rem' }}>
        <div style={{ maxWidth: '40rem' }}>

          <div
            className="inline-flex items-center gap-2.5 rounded-full mb-7"
            style={{ padding: '7px 14px 7px 7px', backgroundColor: 'rgba(183,181,254,0.07)', border: '1px solid rgba(183,181,254,0.14)' }}
          >
            <span
              aria-hidden="true"
              style={{
                width: '30px', height: '30px', borderRadius: '50%',
                backgroundColor: '#b7b5fe', color: '#0E0E12',
                fontSize: '10px', fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}
            >
              NV
            </span>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2 }}>{c.session.navigatorName}</p>
              <p style={{ fontSize: '10px', color: 'rgba(183,181,254,0.55)', lineHeight: 1.2 }}>{c.session.sessionPhase}</p>
            </div>
          </div>

          <Eyebrow dark>{c.session.eyebrow}</Eyebrow>
          <BilingualH2
            id="session-heading"
            primary={c.session.h2}
            secondary={locale === 'zh' ? c.session.h2zh : null}
            light
          />

          <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>
              {c.session.p1}{' '}
              <em style={{ fontStyle: 'italic', color: 'rgba(183,181,254,0.8)' }}>{c.session.q1}</em>
            </p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>{c.session.p2}</p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>{c.session.p3}</p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>
              {c.session.p4}{' '}
              <em style={{ fontStyle: 'italic', color: 'rgba(183,181,254,0.8)' }}>{c.session.q4}</em>
            </p>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <Link
              href={`/${locale}/navigators`}
              style={{ fontSize: '0.875rem', fontWeight: 600, color: '#b7b5fe', textDecoration: 'none' }}
            >
              {c.session.navigatorsLink}
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 5 — HOW WE MEASURE GROWTH
// ─────────────────────────────────────────────────────────────

function LexileScaleViz({ start, end }) {
  const MIN  = 200
  const MAX  = 1200
  const SPAN = MAX - MIN
  const topPct = (l) => ((MAX - l) / SPAN) * 100
  const hlTop  = topPct(end)
  const hlBot  = topPct(start)
  const hlH    = hlBot - hlTop

  return (
    <div style={{ position: 'relative', height: '300px', width: '160px', flexShrink: 0 }} role="img" aria-label={`Lexile scale. Highlighted range: ${start}L to ${end}L`}>
      <div aria-hidden="true" style={{ position: 'absolute', left: '16px', top: 0, bottom: 0, width: '3px', backgroundColor: 'rgba(183,181,254,0.1)', borderRadius: '9999px' }} />
      <div aria-hidden="true" style={{ position: 'absolute', left: '16px', top: `${hlTop}%`, height: `${hlH}%`, width: '3px', backgroundColor: '#b7b5fe', borderRadius: '9999px', boxShadow: '0 0 12px rgba(183,181,254,0.5)' }} />
      {LEXILE_SCALE.map((row) => {
        const yPct    = topPct(row.level)
        const inRange = row.level >= start && row.level <= end
        return (
          <div key={row.level} aria-hidden="true" style={{ position: 'absolute', top: `${yPct}%`, left: 0, transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: inRange ? '#b7b5fe' : 'rgba(183,181,254,0.18)', marginLeft: '13px', flexShrink: 0, boxShadow: inRange ? '0 0 6px rgba(183,181,254,0.4)' : 'none' }} />
            <div>
              <span style={{ fontSize: '10px', fontWeight: inRange ? 700 : 500, color: inRange ? '#b7b5fe' : 'rgba(183,181,254,0.28)', display: 'block', lineHeight: 1.2 }}>{row.level}L</span>
              <span style={{ fontSize: '9px', color: inRange ? 'rgba(183,181,254,0.65)' : 'rgba(183,181,254,0.2)', lineHeight: 1.2 }}>{row.grade}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function GrowthSection({ locale, c }) {
  return (
    <section aria-labelledby="growth-heading" style={{ backgroundColor: '#0E0E12', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ marginBottom: '3.5rem' }}>
          <Eyebrow dark>{c.growth.eyebrow}</Eyebrow>
          <BilingualH2 id="growth-heading" primary={c.growth.h2} secondary={c.growth.h2zh} light />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3.5rem' }} className="lg:grid-cols-2">

          {/* Lexile */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#b7b5fe', marginBottom: '0.375rem', letterSpacing: '-0.01em' }}>{c.growth.lexile.h3}</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.72, color: 'rgba(240,240,240,0.45)', marginBottom: '1.75rem' }}>{c.growth.lexile.sub}</p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <LexileScaleViz start={c.growth.lexile.start} end={c.growth.lexile.end} />
              <p style={{ fontSize: '0.875rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.5)', flex: 1, paddingTop: '0.5rem' }} dangerouslySetInnerHTML={{ __html: c.growth.lexile.note }} />
            </div>
          </div>

          {/* 6+1 Trait */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#b7b5fe', marginBottom: '0.375rem', letterSpacing: '-0.01em' }}>{c.growth.trait.h3}</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.72, color: 'rgba(240,240,240,0.45)', marginBottom: '1.25rem' }}>{c.growth.trait.sub}</p>

            <div className="flex items-center gap-4" style={{ marginBottom: '0.75rem' }} aria-hidden="true">
              <div className="flex items-center gap-1.5">
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'rgba(183,181,254,0.18)' }} />
                <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(183,181,254,0.4)' }}>{c.growth.trait.startLabel}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#b7b5fe' }} />
                <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(183,181,254,0.7)' }}>{c.growth.trait.endLabel}</span>
              </div>
              <span style={{ fontSize: '10px', color: 'rgba(183,181,254,0.22)', marginLeft: 'auto' }}>{c.growth.trait.scaleLabel}</span>
            </div>

            <div>
              {TRAITS.map((trait) => {
                const label    = locale === 'zh' ? trait.zh : trait.en
                const maxScale = 6
                const sPct     = (trait.start / maxScale) * 100
                const ePct     = (trait.end   / maxScale) * 100
                const gainPct  = ePct - sPct
                return (
                  <div
                    key={trait.id}
                    style={{ display: 'grid', gridTemplateColumns: '110px 1fr 52px', gap: '0.75rem', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid rgba(183,181,254,0.05)' }}
                  >
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#F0F0F0', lineHeight: 1.2 }}>{label}</p>
                    <div style={{ position: 'relative', height: '7px', backgroundColor: 'rgba(183,181,254,0.07)', borderRadius: '9999px', overflow: 'hidden' }} aria-label={`${label}: ${trait.start} to ${trait.end} out of ${maxScale}`}>
                      <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${sPct}%`, backgroundColor: 'rgba(183,181,254,0.15)', borderRadius: '9999px' }} />
                      <div aria-hidden="true" style={{ position: 'absolute', left: `${sPct}%`, top: 0, height: '100%', width: `${gainPct}%`, backgroundColor: '#b7b5fe', borderRadius: '9999px' }} />
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(183,181,254,0.5)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      {trait.start}→<span style={{ color: '#b7b5fe', fontWeight: 700 }}>{trait.end}</span>
                    </p>
                  </div>
                )
              })}
            </div>

            <p style={{ fontSize: '0.8125rem', lineHeight: 1.72, color: 'rgba(240,240,240,0.35)', marginTop: '1rem' }}>{c.growth.trait.note}</p>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 6 — GET STARTED
// ─────────────────────────────────────────────────────────────

function GetStartedSection({ locale, c }) {
  return (
    <section aria-labelledby="get-started-heading" style={{ backgroundColor: '#F5F5FF', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ maxWidth: '40rem' }}>
          <Eyebrow>{c.cta.eyebrow}</Eyebrow>
          <BilingualH2 id="get-started-heading" primary={c.cta.h2} />
          <p style={{ fontSize: '1rem', lineHeight: 1.82, color: '#3D4452', marginTop: '1.125rem', marginBottom: '1.875rem' }}>
            {c.cta.body}
          </p>
          <Link href={`/${locale}/consult`} className="btn btn-charter">{c.cta.btn}</Link>
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
    path:        '/program',
    title:       c.meta.title,
    description: c.meta.description,
  })
}

// ─────────────────────────────────────────────────────────────
// PAGE EXPORT
// ─────────────────────────────────────────────────────────────

export default async function ProgramPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const c = COPY[locale] ?? COPY.en

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema()) }}
      />
      <Hero              locale={locale} c={c} />
      <LoopSection       locale={locale} c={c} />
      <JourneySection      locale={locale} c={c} />
      <ArchitectureSection locale={locale} c={c} />
      <CombinationsSection locale={locale} c={c} />
      <SessionSection      locale={locale} c={c} />
      <GrowthSection     locale={locale} c={c} />
      <GetStartedSection locale={locale} c={c} />
    </>
  )
}