// app/[locale]/navigators/page.jsx
//
// Pure server component — no 'use client', zero external dependencies.
// Bilingual EN + ZH — all text driven from COPY object below.
//
// BACKGROUND UPDATE — April 13 2026
//   Hero bg: bg-navigators-hero.webp (banker's lamp desk, watercolor)
//   Replaced CSS backgroundImage with <img> tag + overlay divs
//   Same 4-stop overlay treatment as program / methodology / results pages
//   objectPosition: 'center 45%' — frames lamp, books, and map
//   Warm amber/green radial accent echoes the banker's lamp glow

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import { navigators as copyEn }    from '@/content/marketing.en'
import { navigators as copyZh }    from '@/content/marketing.zh'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const meta = (COPY[locale] ?? COPY.en).meta
  return buildMetadata({ locale, title: meta.title, description: meta.description, path: '/navigators' })
}

function Eyebrow({ children, center = false, dark = false }) {
  return (
    <div style={{ fontFamily: 'var(--font-latin)', fontWeight: 500, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: dark ? '#b7b5fe' : '#5856cc', marginBottom: '16px', textAlign: center ? 'center' : undefined }}>
      {children}
    </div>
  )
}

function Badge({ children }) {
  return (
    <span style={{ display: 'inline-block', fontFamily: 'var(--font-latin)', fontSize: '12px', fontWeight: 500, color: '#b7b5fe', backgroundColor: 'rgba(183,181,254,0.15)', borderRadius: '9999px', padding: '4px 12px', marginRight: '8px', marginBottom: '8px' }}>
      {children}
    </span>
  )
}

const COPY = { en: copyEn, zh: copyZh }

const NAVIGATORS = [
  {
    name: 'Laura Mitchell',
    photo: 'https://images.unsplash.com/photo-1758685848001-0396a85ba84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    alt: 'Laura Mitchell — Navigator',
    result: 'Student, Grade 6 · Vancouver', lexile: 'Lexile 660 → 810 · 16 weeks',
    badges: ['Lexile Specialist', '6+1 Certified'],
    en: { bio: 'Background in composition and academic writing — taught at secondary and post-secondary level.', quote: "I\u2019m most interested in the moment before the student writes \u2014 the thinking they haven\u2019t found words for yet." },
    zh: { bio: '写作与学术写作背景——曾在中学和大学层级任教。', quote: '我最感兴趣的是学生动笔之前的那一刻——那些他们尚未找到语言表达的思考。' },
  },
  {
    name: 'James Chen',
    photo: 'https://images.unsplash.com/photo-1771050889377-b68415885c64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    alt: 'James Chen — Navigator',
    result: 'Student, Grade 8 · Toronto', lexile: 'Lexile 720 → 920 · 16 weeks',
    badges: ['Lexile Specialist', '6+1 Certified'],
    en: { bio: 'Specialized in critical reading and argumentation — extensive work with multilingual learners.', quote: 'The Loop is where the student discovers they already know how to think \u2014 they just needed structure to see it.' },
    zh: { bio: '专注于批判性阅读与论证——与多语言学习者有大量合作经验。', quote: 'The Loop是学生发现自己已经懂得如何思考的地方——只是还没有一个结构帮他们看见这一点。' },
  },
]

export function generateStaticParams() {
  return localeParams()
}

export default async function NavigatorsPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en

  return (
    <div className="w-full overflow-hidden" style={{ fontFamily: 'var(--font-latin)' }}>

      {/* ── S1 HERO ──────────────────────────────────────────
          Banker's lamp desk illustration.
          Left side dark (bookcase shadows) — text sits here.
          Lamp glow is center — opens through on right half.
          objectPosition 'center 45%' keeps lamp + map in frame.
          Warm amber/green radial accent echoes the lamp shade.
      */}
      <section
        aria-labelledby="navigators-hero-heading"
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
          src="/bg-navigators-hero.webp"
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

        {/* Warm amber/green radial — echoes the banker's lamp shade */}
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            inset:         0,
            background:    'radial-gradient(ellipse 50% 50% at 62% 45%, rgba(180,140,60,0.08) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* Background watermark text */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 select-none pointer-events-none"
          style={{ fontSize: '280px', fontWeight: 700, color: '#b7b5fe', opacity: 0.04, lineHeight: 1, transform: 'translateX(15%)' }}
        >
          NAVIGATOR
        </div>

        {/* Content */}
        <div
          className="px-6 relative z-10 w-full"
          style={{
            flex:          1,
            display:       'flex',
            alignItems:    'center',
            paddingTop:    'calc(var(--nav-height) + 3rem)',
            paddingBottom: '5rem',
            maxWidth:      '1200px',
            margin:        '0 auto',
          }}
        >
          <div style={{ maxWidth: '760px' }}>
            <Eyebrow dark>{c.hero.eyebrow}</Eyebrow>
            <h1
              id="navigators-hero-heading"
              className="mb-8"
              style={{ fontSize: 'clamp(38px, 5vw, 68px)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2 }}
            >
              {c.hero.h1a}<span style={{ color: '#b7b5fe' }}>{c.hero.h1b}</span>{c.hero.h1c}<span style={{ color: '#b7b5fe' }}>{c.hero.h1d}</span>{c.hero.h1e}
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 400, color: 'rgba(240,240,240,0.52)', maxWidth: '580px', lineHeight: 1.6 }}>
              {c.hero.sub}
            </p>
          </div>
        </div>
      </section>

      {/* ── S2 WHAT A NAVIGATOR IS NOT ───────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: '#0E0E12' }}>
        <div className="container-section">
          <Eyebrow dark center>{c.s2.eyebrow}</Eyebrow>
          <h2 className="text-center mb-16" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 600, color: '#F0F0F0', lineHeight: 1.3 }}>
            {c.s2.h2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
            {c.s2.cols.map(({ strike, title, body }, i) => (
              <div key={i} className={i === 0 ? 'md:pr-12 md:border-r' : i === 1 ? 'md:px-12 md:border-r' : 'md:pl-12'}
                style={{ borderColor: 'rgba(183,181,254,0.2)' }}>
                <div className="mb-3 line-through" style={{ fontSize: '13px', fontWeight: 500, color: '#F0F0F0', opacity: 0.5 }}>{strike}</div>
                <div className="mb-4" style={{ fontSize: '20px', fontWeight: 700, color: '#b7b5fe' }}>{title}</div>
                <p style={{ fontSize: '15px', fontWeight: 400, color: '#F0F0F0', opacity: 0.7, lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S3 WHAT A NAVIGATOR DOES ─────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: '#212830' }}>
        <div className="container-section">
          <Eyebrow dark center>{c.s3.eyebrow}</Eyebrow>
          <h2 className="text-center mb-16" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 600, color: '#F0F0F0', lineHeight: 1.3 }}>
            {c.s3.h2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {c.s3.steps.map(({ num, phase, headline, sub }) => (
              <div key={num}>
                <div className="mb-2" style={{ fontSize: '14px', fontWeight: 300, color: '#b7b5fe', opacity: 0.5 }}>{num}</div>
                <div className="mb-6" style={{ borderTop: '3px solid #b7b5fe', width: '100%' }} />
                <div className="mb-4" style={{ fontSize: '22px', fontWeight: 700, color: '#b7b5fe' }}>{phase}</div>
                <p className="mb-3" style={{ fontSize: '16px', fontWeight: 600, color: '#F0F0F0', lineHeight: 1.5 }}>{headline}</p>
                <p style={{ fontSize: '14px', fontWeight: 400, color: '#F0F0F0', opacity: 0.65, lineHeight: 1.5 }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S4 THE NAVIGATOR RELATIONSHIP ────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="container-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1673515335586-f9f662c01482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80"
                alt="Navigator and student in a live online session" className="w-full h-auto rounded-lg" style={{ display: 'block' }} />
            </div>
            <div className="order-1 md:order-2">
              <Eyebrow>{c.s4.eyebrow}</Eyebrow>
              <h2 className="mb-8" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#0E0E12', lineHeight: 1.3, maxWidth: '480px' }}>
                {c.s4.h2}
              </h2>
              <div className="space-y-5">
                {c.s4.points.map(({ label, body }) => (
                  <p key={label} style={{ fontSize: '16px', fontWeight: 400, color: '#212830', lineHeight: 1.6 }}>
                    <strong style={{ fontWeight: 600, color: '#0E0E12' }}>{label}:</strong>{' '}{body}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S5 NAVIGATOR PROFILES ────────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: '#0E0E12' }}>
        <div className="container-section">
          <Eyebrow dark center>{c.s5.eyebrow}</Eyebrow>
          <h2 className="text-center mb-16" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 600, color: '#F0F0F0', lineHeight: 1.3 }}>
            {c.s5.h2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {NAVIGATORS.map((nav) => {
              const loc = nav[locale] ?? nav.en
              return (
                <div key={nav.name} className="rounded-lg" style={{ backgroundColor: '#2E3848', borderTop: '3px solid #b7b5fe', padding: '32px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={nav.photo} alt={nav.alt} className="rounded-lg object-cover mb-6" style={{ width: '96px', height: '96px', display: 'block' }} />
                  <div className="mb-2" style={{ fontSize: '18px', fontWeight: 600, color: '#F0F0F0' }}>{nav.name}</div>
                  <p className="mb-4" style={{ fontSize: '14px', fontWeight: 400, color: '#F0F0F0', opacity: 0.7, lineHeight: 1.5 }}>{loc.bio}</p>
                  <p className="mb-4" style={{ fontSize: '14px', fontWeight: 400, fontStyle: 'italic', color: '#b7b5fe', lineHeight: 1.5 }}>&ldquo;{loc.quote}&rdquo;</p>
                  <div className="mb-4 flex flex-wrap">{nav.badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: '#F0F0F0', lineHeight: 1.5 }}>{nav.result}<br />{nav.lexile}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── S6 A REAL SESSION ────────────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="max-w-5xl mx-auto px-0 md:px-6">
          <Eyebrow center>{c.s6.eyebrow}</Eyebrow>
          <h2 className="text-center mb-12" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#0E0E12', lineHeight: 1.3 }}>{c.s6.h2}</h2>
          <div className="rounded-lg" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(14,14,18,0.1)', padding: '40px' }}>
            <div className="space-y-6">
              {c.s6.timeline.map(({ label, body }) => (
                <div key={label}>
                  <div className="mb-2" style={{ fontSize: '14px', fontWeight: 600, color: '#5856cc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                  <p style={{ fontSize: '16px', fontWeight: 400, color: '#212830', lineHeight: 1.6 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── S7 WHAT FAMILIES SAY ─────────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: '#212830' }}>
        <div className="container-section">
          <Eyebrow dark center>{c.s7.eyebrow}</Eyebrow>
          <h2 className="text-center mb-16" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 600, color: '#F0F0F0', lineHeight: 1.3 }}>{c.s7.h2}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {c.s7.testimonials.map(({ quote, city, detail }) => (
              <div key={city + detail} className="rounded-lg" style={{ backgroundColor: '#2E3848', padding: '32px' }}>
                <p className="mb-6" style={{ fontSize: '16px', fontWeight: 400, color: '#F0F0F0', lineHeight: 1.7, fontStyle: 'italic' }}>&ldquo;{quote}&rdquo;</p>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#b7b5fe' }}>{city}</div>
                <div style={{ fontSize: '13px', fontWeight: 400, color: '#F0F0F0', opacity: 0.6 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S8 CLOSING CTA ───────────────────────────────── */}
      <section className="px-6 py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6" style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2 }}>
            {c.s8.h2a}<span style={{ color: '#b7b5fe' }}>{c.s8.h2b}</span>{c.s8.h2c}<span style={{ color: '#b7b5fe' }}>{c.s8.h2d}</span>{c.s8.h2e}
          </h2>
          <p className="mb-10 mx-auto" style={{ fontSize: '18px', fontWeight: 400, color: '#F0F0F0', opacity: 0.75, lineHeight: 1.6, maxWidth: '600px' }}>{c.s8.sub}</p>
          <Link href={`/${locale}/consult`} className="inline-block transition-all hover:scale-105 active:scale-95 rounded-lg"
            style={{ backgroundColor: '#F5C842', color: '#0E0E12', fontSize: '18px', fontWeight: 600, padding: '16px 40px', boxShadow: '0 4px 20px rgba(245,200,66,0.3)', textDecoration: 'none' }}>
            {c.s8.cta}
          </Link>
          <p className="mt-6" style={{ fontSize: '14px', fontWeight: 400, color: '#F0F0F0', opacity: 0.5 }}>{c.s8.note}</p>
        </div>
      </section>

    </div>
  )
}