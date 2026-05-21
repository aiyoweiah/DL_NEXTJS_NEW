// app/[locale]/demos/page.jsx
//
// Watch Demo Classes — video-first, properly sized for 1280–1440 px viewports.
//
// BACKGROUND UPDATE — April 13 2026
//   Hero bg: demos-background.webp (two golden retriever puppies on dock at sunset, watercolor)
//   Added <img> + 4-stop overlay to Hero (was plain #0E0E12 background)
//   Same overlay treatment as all other pages
//   objectPosition: 'center 45%' — keeps puppies + sunset horizon centred
//   Warm amber radial accent echoes the sunset sky
//
// ─── VIDEO IDs ───────────────────────────────────────────────────────────────
// Replace the YOUTUBE_IDS constants below with your real YouTube video IDs.
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import LexileBar                       from '@/components/ui/LexileBar'
import YoutubeEmbed                    from '@/components/demos/YoutubeEmbed'
import { demos as copyEn }              from '@/content/marketing.en'
import { demos as copyZh }              from '@/content/marketing.zh'

const LEXILE_SCALE = [
  { level: 1200, grade: 'Grade 12+' },
  { level: 1000, grade: 'Grade 9'   },
  { level:  800, grade: 'Grade 6'   },
  { level:  600, grade: 'Grade 4'   },
  { level:  400, grade: 'Grade 2'   },
  { level:  200, grade: 'Grade 1'   },
]

const TRAITS = [
  { id: 'ideas',        en: 'Ideas',            zh: '\u60f3\u6cd5',             start: 2, end: 4 },
  { id: 'organisation', en: 'Organization',     zh: '\u7ed3\u6784',             start: 2, end: 4 },
  { id: 'voice',        en: 'Voice',            zh: '\u58f0\u97f3',             start: 2, end: 4 },
  { id: 'word-choice',  en: 'Word Choice',      zh: '\u8bcd\u6c47\u9009\u62e9', start: 2, end: 5 },
  { id: 'fluency',      en: 'Sentence Fluency', zh: '\u53e5\u5b50\u6d41\u7545', start: 3, end: 5 },
  { id: 'conventions',  en: 'Conventions',      zh: '\u5199\u4f5c\u89c4\u8303', start: 3, end: 4 },
  { id: 'presentation', en: 'Presentation',     zh: '\u5448\u73b0',             start: 2, end: 4 },
]

const COPY = { en: copyEn, zh: copyZh }

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────

function BilingualH2({ primary, secondary, light = false, center = false, id }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2 id={id} style={{ fontSize: 'clamp(1.75rem, 3vw + 0.25rem, 2.75rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.025em', color: light ? '#F0F0F0' : '#0E0E12', textWrap: 'balance', marginBottom: 0 }}>{primary}</h2>
      <p className="mt-2" style={{ fontFamily: 'var(--font-cjk)', fontSize: '15px', fontWeight: 500, color: light ? '#b7b5fe' : '#5856cc', lineHeight: 1.5 }}>{secondary}</p>
    </div>
  )
}

function Eyebrow({ children, center = false, dark = false }) {
  return <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: dark ? '#b7b5fe' : '#5856cc', marginBottom: '0.875rem', textAlign: center ? 'center' : undefined }}>{children}</p>
}

function Tag({ children, variant = 'default' }) {
  const s = {
    default: { backgroundColor: 'rgba(14,14,18,0.05)',   border: '1px solid rgba(14,14,18,0.09)',     color: '#7B8494' },
    violet:  { backgroundColor: 'rgba(183,181,254,0.08)', border: '1px solid rgba(183,181,254,0.2)',  color: '#5856cc' },
    dark:    { backgroundColor: 'rgba(183,181,254,0.06)', border: '1px solid rgba(183,181,254,0.15)', color: '#b7b5fe', letterSpacing: '0.07em' },
  }
  return <span style={{ padding: '2px 9px', borderRadius: '9999px', fontSize: '10px', fontWeight: 700, lineHeight: 1.5, whiteSpace: 'nowrap', ...s[variant] }}>{children}</span>
}

// ─────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// Two golden retriever puppies playing tug-of-war on a dock at sunset.
// Sailboat hull is dark teal on the left — natural text zone.
// Amber sunset sky + puppies + lighthouse open right.
// objectPosition 'center 45%' keeps puppies + horizon in frame.
// Warm amber radial accent echoes the sunset sky.
// ─────────────────────────────────────────────────────────────

function Hero({ locale, c }) {
  return (
    <section
      aria-labelledby="demos-hero-heading"
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
        src="/demos-background.webp"
        alt=""
        aria-hidden="true"
        style={{
          position:       'absolute',
          inset:          0,
          width:          '100%',
          height:         '100%',
          objectFit:      'cover',
          objectPosition: 'center 45%',
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

      {/* Warm amber radial — echoes the sunset sky */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          background:    'radial-gradient(ellipse 55% 50% at 68% 42%, rgba(200,140,40,0.08) 0%, transparent 65%)',
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
          <div
            className="inline-flex items-center gap-2 mb-7 rounded-full"
            style={{ padding: '5px 14px', border: '1px solid rgba(183,181,254,0.18)', backgroundColor: 'rgba(183,181,254,0.05)' }}
          >
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#b7b5fe' }} />
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#b7b5fe' }}>{c.hero.chip}</span>
          </div>
          <h1
            id="demos-hero-heading"
            style={{ fontSize: 'clamp(2.25rem, 5vw + 0.5rem, 4rem)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.03em', color: '#F0F0F0', marginBottom: '0.625rem', textWrap: 'balance' }}
          >
            {c.hero.h1}
          </h1>
          <p style={{ fontFamily: 'var(--font-cjk)', fontSize: '17px', fontWeight: 500, color: 'rgba(183,181,254,0.40)', marginBottom: '1.25rem', lineHeight: 1.5 }}>{c.hero.h1zh}</p>
          <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'rgba(240,240,240,0.52)', maxWidth: '36rem', marginBottom: '2.25rem' }}>{c.hero.sub}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#demo-videos" className="btn btn-primary" style={{ fontWeight: 700 }}>{c.hero.cta1}</a>
            <Link href={`/${locale}/consult`} className="btn btn-ghost">{c.hero.cta2}</Link>
          </div>
        </div>
      </div>

      {/* Stat pills rail */}
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
// SECTIONS 2–4 — VIDEO GALLERY
// ─────────────────────────────────────────────────────────────

function VideoGallery({ locale, c }) {
  const row1 = c.videos.cards.slice(0, 3)
  const row2 = c.videos.cards.slice(3, 6)

  function VideoCard({ card }) {
    return (
      <article
        aria-label={`${card.label} — ${card.labelZh}`}
        style={{ backgroundColor: '#ffffff', border: '1px solid rgba(14,14,18,0.08)', borderRadius: '0.875rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
      >
        <YoutubeEmbed videoId={card.videoId} title={`${card.label} — ${card.labelZh}`} rounded="0" />
        <div style={{ padding: '0.625rem 0.75rem 0.875rem' }}>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <Tag variant="violet">{card.tag1}</Tag>
            <Tag variant="default">{card.tag2}</Tag>
            {card.tag3 && <Tag variant="default">{card.tag3}</Tag>}
          </div>
          <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0E0E12', lineHeight: 1.3, marginBottom: '1px' }}>{card.label}</p>
          <p style={{ fontFamily: 'var(--font-cjk)', fontSize: '10px', color: '#5856cc', lineHeight: 1.3 }}>{card.labelZh}</p>
        </div>
      </article>
    )
  }

  return (
    <section id="demo-videos" aria-labelledby="video-gallery-heading" style={{ backgroundColor: '#ffffff', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ marginBottom: '2.5rem' }}>
          <Eyebrow>{c.videos.eyebrow}</Eyebrow>
          <BilingualH2 id="video-gallery-heading" primary={c.videos.h2} secondary={c.videos.h2zh} />
        </div>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5856cc' }}>{c.videos.row1Label}</p>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(14,14,18,0.07)' }} aria-hidden="true" />
          </div>
          <div style={{ display: 'grid', gap: '1rem' }} className="md:grid-cols-3">
            {row1.map((card, i) => <VideoCard key={i} card={card} />)}
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5856cc' }}>{c.videos.row2Label}</p>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(14,14,18,0.07)' }} aria-hidden="true" />
          </div>
          <div style={{ display: 'grid', gap: '1rem' }} className="md:grid-cols-3">
            {row2.map((card, i) => <VideoCard key={i} card={card} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 5 — INSIDE A SESSION
// ─────────────────────────────────────────────────────────────

const SESSION_IMG = 'https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80'

function InsideSession({ locale, c }) {
  return (
    <section aria-labelledby="session-heading" style={{ position: 'relative', overflow: 'hidden', minHeight: '500px' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SESSION_IMG} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(14,14,18,0.97) 0%, rgba(14,14,18,0.90) 45%, rgba(14,14,18,0.55) 100%)' }} />
      <div className="container-section relative z-10" style={{ padding: 'var(--section-md) 1.25rem' }}>
        <div style={{ maxWidth: '40rem' }}>
          <div className="inline-flex items-center gap-2.5 rounded-full mb-7" style={{ padding: '7px 14px 7px 7px', backgroundColor: 'rgba(183,181,254,0.07)', border: '1px solid rgba(183,181,254,0.14)' }}>
            <span aria-hidden="true" style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#b7b5fe', color: '#0E0E12', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>NV</span>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2 }}>{c.session.navigatorName}</p>
              <p style={{ fontSize: '10px', color: 'rgba(183,181,254,0.55)', lineHeight: 1.2 }}>{c.session.sessionPhase}</p>
            </div>
          </div>
          <Eyebrow dark>{c.session.eyebrow}</Eyebrow>
          <BilingualH2 id="session-heading" primary={c.session.h2} secondary={c.session.h2zh} light />
          <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>{c.session.p1}{' '}<em style={{ fontStyle: 'italic', color: 'rgba(183,181,254,0.8)' }}>{c.session.q1}</em></p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>{c.session.p2}</p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>{c.session.p3}</p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>{c.session.p4}{' '}<em style={{ fontStyle: 'italic', color: 'rgba(183,181,254,0.8)' }}>{c.session.q4}</em></p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 6 — AFTER THE DEMO
// ─────────────────────────────────────────────────────────────

function AfterDemo({ locale, c }) {
  return (
    <section aria-labelledby="after-heading" style={{ backgroundColor: '#212830', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ maxWidth: '40rem' }}>
          <Eyebrow dark>{c.after.eyebrow}</Eyebrow>
          <BilingualH2 id="after-heading" primary={c.after.h2} secondary={c.after.h2zh} light />
          <p style={{ fontSize: '1rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.55)', marginTop: '1.125rem', marginBottom: '1.875rem' }}>{c.after.body}</p>
          <Link href={`/${locale}/consult`} className="btn btn-primary">{c.after.cta}</Link>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 7 — RESULTS
// ─────────────────────────────────────────────────────────────

function LexileScaleViz({ start, end }) {
  const MIN = 200, MAX = 1200, SPAN = MAX - MIN
  const topPct = (l) => ((MAX - l) / SPAN) * 100
  const hlTop = topPct(end), hlH = topPct(start) - hlTop
  return (
    <div style={{ position: 'relative', height: '300px', width: '160px', flexShrink: 0 }} role="img" aria-label={`Lexile scale. Highlighted: ${start}L to ${end}L`}>
      <div aria-hidden="true" style={{ position: 'absolute', left: '16px', top: 0, bottom: 0, width: '3px', backgroundColor: 'rgba(183,181,254,0.1)', borderRadius: '9999px' }} />
      <div aria-hidden="true" style={{ position: 'absolute', left: '16px', top: `${hlTop}%`, height: `${hlH}%`, width: '3px', backgroundColor: '#b7b5fe', borderRadius: '9999px', boxShadow: '0 0 12px rgba(183,181,254,0.5)' }} />
      {LEXILE_SCALE.map((row) => {
        const yPct = topPct(row.level), inRange = row.level >= start && row.level <= end
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

function ResultsSection({ locale, c }) {
  return (
    <section aria-labelledby="results-heading" style={{ backgroundColor: '#0E0E12', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ marginBottom: '3.5rem' }}>
          <Eyebrow dark>{c.growth.eyebrow}</Eyebrow>
          <BilingualH2 id="results-heading" primary={c.growth.h2} secondary={c.growth.h2zh} light />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3.5rem' }} className="lg:grid-cols-2">
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#b7b5fe', marginBottom: '0.375rem', letterSpacing: '-0.01em' }}>{c.growth.lexile.h3}</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.72, color: 'rgba(240,240,240,0.45)', marginBottom: '1.75rem' }}>{c.growth.lexile.sub}</p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <LexileScaleViz start={c.growth.lexile.start} end={c.growth.lexile.end} />
              <p style={{ fontSize: '0.875rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.5)', flex: 1, paddingTop: '0.5rem' }} dangerouslySetInnerHTML={{ __html: c.growth.lexile.note }} />
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#b7b5fe', marginBottom: '0.375rem', letterSpacing: '-0.01em' }}>{c.growth.trait.h3}</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.72, color: 'rgba(240,240,240,0.45)', marginBottom: '1.25rem' }}>{c.growth.trait.sub}</p>
            <div className="flex items-center gap-4" style={{ marginBottom: '0.75rem' }} aria-hidden="true">
              <div className="flex items-center gap-1.5"><div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'rgba(183,181,254,0.18)' }} /><span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(183,181,254,0.4)' }}>{c.growth.trait.startLabel}</span></div>
              <div className="flex items-center gap-1.5"><div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#b7b5fe' }} /><span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(183,181,254,0.7)' }}>{c.growth.trait.endLabel}</span></div>
              <span style={{ fontSize: '10px', color: 'rgba(183,181,254,0.22)', marginLeft: 'auto' }}>{c.growth.trait.scaleLabel}</span>
            </div>
            <div>
              {TRAITS.map((trait) => {
                const label = locale === 'zh' ? trait.zh : trait.en
                const sPct = (trait.start / 6) * 100, gainPct = ((trait.end - trait.start) / 6) * 100
                return (
                  <div key={trait.id} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 52px', gap: '0.75rem', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid rgba(183,181,254,0.05)' }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#F0F0F0', lineHeight: 1.2 }}>{label}</p>
                    <div style={{ position: 'relative', height: '7px', backgroundColor: 'rgba(183,181,254,0.07)', borderRadius: '9999px', overflow: 'hidden' }} aria-label={`${label}: ${trait.start} to ${trait.end}`}>
                      <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${sPct}%`, backgroundColor: 'rgba(183,181,254,0.15)', borderRadius: '9999px' }} />
                      <div aria-hidden="true" style={{ position: 'absolute', left: `${sPct}%`, top: 0, height: '100%', width: `${gainPct}%`, backgroundColor: '#b7b5fe', borderRadius: '9999px' }} />
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(183,181,254,0.5)', textAlign: 'right', whiteSpace: 'nowrap' }}>{trait.start}→<span style={{ color: '#b7b5fe', fontWeight: 700 }}>{trait.end}</span></p>
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
// SECTION 8 — BOOK A CALL
// ─────────────────────────────────────────────────────────────

function BookCall({ locale, c }) {
  return (
    <section aria-labelledby="book-heading" style={{ backgroundColor: '#F5F5FF', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ maxWidth: '40rem' }}>
          <Eyebrow>{c.cta.eyebrow}</Eyebrow>
          <BilingualH2 id="book-heading" primary={c.cta.h2} secondary={c.cta.h2zh} />
          <p style={{ fontSize: '1rem', lineHeight: 1.82, color: '#3D4452', marginTop: '1.125rem', marginBottom: '1.875rem' }}>{c.cta.body}</p>
          <Link href={`/${locale}/consult`} className="btn btn-charter">{c.cta.btn}</Link>
          <p style={{ fontSize: '0.8125rem', color: '#7B8494', marginTop: '0.875rem' }}>{c.cta.note}</p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 9 — CHARTER
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
            <Link href={`/${locale}/consult`} className="btn btn-charter">{c.charter.btn1}</Link>
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
  return buildMetadata({ locale, path: '/demos', title: c.meta.title, description: c.meta.description })
}

export default async function DemosPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en
  return (
    <>
      <Hero           locale={locale} c={c} />
      <VideoGallery   locale={locale} c={c} />
      <InsideSession  locale={locale} c={c} />
      <AfterDemo      locale={locale} c={c} />
      <ResultsSection locale={locale} c={c} />
      <BookCall       locale={locale} c={c} />
      <CharterSection locale={locale} c={c} />
    </>
  )
}