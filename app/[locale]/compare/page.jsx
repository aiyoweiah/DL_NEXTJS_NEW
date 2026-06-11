// app/[locale]/compare/page.jsx
//
// Pure server component — no 'use client', zero external dependencies.
// Bilingual EN + ZH — all text driven from COPY object below.
//
// BACKGROUND UPDATE — April 13 2026
//   Hero bg: compare-desk-bg.webp (stormy lake with glowing island, watercolor)
//   objectPosition: 'center 42%' — frames island + water + storm sky
//   Upgraded to 4-stop directional overlay + bottom vignette + teal radial accent
//   (same treatment as program / methodology / results / navigators / about)

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import { compare as copyEn }       from '@/content/marketing.en'
import { compare as copyZh }       from '@/content/marketing.zh'
import K2Note                       from '@/components/ui/K2Note'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const meta = (COPY[locale] ?? COPY.en).meta
  return buildMetadata({ locale, title: meta.title, description: meta.description, path: '/compare' })
}

function Eyebrow({ children, center = false, dark = false }) {
  return (
    <div style={{ fontFamily: 'var(--font-latin)', fontWeight: 500, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: dark ? '#b7b5fe' : '#5856cc', marginBottom: '16px', textAlign: center ? 'center' : undefined }}>
      {children}
    </div>
  )
}

function StudentVoiceCard({ quote, grade, city, weeksInProgram, hangarDetail }) {
  return (
    <div className="rounded-2xl" style={{ backgroundColor: '#2E3848', border: '1px solid rgba(183,181,254,0.10)', padding: '32px' }}>
      <div aria-hidden="true" style={{ fontFamily: 'var(--font-latin)', fontSize: '48px', fontWeight: 700, color: '#b7b5fe', opacity: 0.25, lineHeight: 1, marginBottom: '12px' }}>&ldquo;</div>
      <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 300, fontSize: '16px', fontStyle: 'italic', color: '#F0F0F0', lineHeight: 1.7, marginBottom: '24px' }}>{quote}</p>
      <div className="flex items-center gap-2" style={{ fontFamily: 'var(--font-latin)', fontSize: '13px', fontWeight: 600, color: '#b7b5fe', marginBottom: '8px' }}>
        <span>{grade}</span><span style={{ opacity: 0.4 }}>·</span><span>{city}</span><span style={{ opacity: 0.4 }}>·</span>
        <span style={{ fontWeight: 400, color: 'rgba(240,240,240,0.5)' }}>{weeksInProgram}</span>
      </div>
      {hangarDetail && <p style={{ fontFamily: 'var(--font-latin)', fontSize: '12px', fontWeight: 400, fontStyle: 'italic', color: 'rgba(183,181,254,0.45)', lineHeight: 1.5 }}>{hangarDetail}</p>}
    </div>
  )
}

function LoopDiagram({ locale = 'en' }) {
  return (
    <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: '1 / 1' }}>
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" aria-label="The Loop: Read, Think, Speak, Write" role="img">
        <circle cx="200" cy="200" r="160" stroke="#b7b5fe" strokeWidth="1.5" opacity="0.2" />
        <circle cx="200" cy="200" r="145" stroke="#b7b5fe" strokeWidth="0.5" opacity="0.08" />
        <path d="M200 40 A160 160 0 0 1 360 200"  stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M360 200 A160 160 0 0 1 200 360" stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M200 360 A160 160 0 0 1 40 200"  stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M40 200 A160 160 0 0 1 200 40"   stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <circle cx="200" cy="40"  r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="200" y="37"  textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">READ</text>
        {locale === 'zh' && <text x="200" y="53" textAnchor="middle" fill="#0E0E12" fontSize="9" opacity="0.4" fontFamily="Noto Sans SC, sans-serif">阅读</text>}
        <circle cx="360" cy="200" r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="360" y="197" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">THINK</text>
        {locale === 'zh' && <text x="360" y="213" textAnchor="middle" fill="#0E0E12" fontSize="9" opacity="0.4" fontFamily="Noto Sans SC, sans-serif">思考</text>}
        <circle cx="200" cy="360" r="36" fill="#F5F5FF" stroke="#F5C842" strokeWidth="2" />
        <text x="200" y="357" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">SPEAK</text>
        {locale === 'zh' && <text x="200" y="373" textAnchor="middle" fill="#0E0E12" fontSize="9" opacity="0.4" fontFamily="Noto Sans SC, sans-serif">表达</text>}
        <circle cx="40"  cy="200" r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="40"  y="197" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">WRITE</text>
        {locale === 'zh' && <text x="40"  y="213" textAnchor="middle" fill="#0E0E12" fontSize="9" opacity="0.4" fontFamily="Noto Sans SC, sans-serif">写作</text>}
        <text x="200" y="193" textAnchor="middle" fill="#0E0E12" fontSize="13" fontWeight="700" fontFamily="DM Sans, sans-serif" opacity="0.6">THE LOOP</text>
        {locale === 'zh' && <text x="200" y="210" textAnchor="middle" fill="#b7b5fe" fontSize="10" fontFamily="Noto Sans SC, sans-serif" opacity="0.5">学习闭环</text>}
      </svg>
    </div>
  )
}

const BG = { dark: '#212830', 'void-black': '#0E0E12', whisper: '#F5F5FF' }
function Section({ bg = 'dark', className = '', children, id }) {
  return (
    <section id={id} className={`px-6 py-24 md:py-32 ${className}`} style={{ backgroundColor: BG[bg] }}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}

const COPY = { en: copyEn, zh: copyZh }

export function generateStaticParams() { return localeParams() }

export default async function ComparePage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en

  return (
    <div className="w-full overflow-hidden" style={{ fontFamily: 'var(--font-latin)' }}>

      {/* ── S1 HERO ──────────────────────────────────────────
          Stormy lake / glowing island watercolor.
          Illustration is naturally very dark (slate sky, deep teal water) —
          the whole left half is already near-void, great for text.
          The luminous island centre-right reads through at 0.28.
          objectPosition 'center 42%' keeps island + waterline in frame.
      */}
      <section
        className="relative flex items-center"
        style={{ backgroundColor: '#212830', minHeight: '100dvh', paddingTop: 'calc(var(--nav-height) + 3.5rem)', paddingBottom: '5rem' }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/compare-desk-bg.webp"
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }}
          />
          {/* Primary directional overlay */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(108deg, rgba(14,14,18,0.98) 0%, rgba(14,14,18,0.97) 35%, rgba(14,14,18,0.80) 58%, rgba(14,14,18,0.28) 100%)' }} />
          {/* Bottom vignette */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,14,18,0.88) 0%, transparent 28%)' }} />
          {/* Teal radial accent — echoes the luminous island greens */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 55% at 65% 50%, rgba(40,160,130,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        </div>

        <div className="container-section relative z-10">
          <div style={{ maxWidth: '700px' }}>
            <Eyebrow dark>{c.s1.eyebrow}</Eyebrow>
            <h1 className="mb-6" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(38px, 5vw, 68px)', lineHeight: 1.2, color: '#F0F0F0', letterSpacing: '-0.03em', textWrap: 'balance' }}>
              {c.s1.h1a}<span style={{ color: '#b7b5fe' }}>{c.s1.h1b}</span>{c.s1.h1c}
            </h1>
            <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '18px', lineHeight: 1.6, color: 'rgba(240,240,240,0.52)', maxWidth: '520px' }}>
              {c.s1.sub}
            </p>
          </div>
        </div>
      </section>

      {/* ── S2 THE REFRAME ───────────────────────────────── */}
      <section className="px-6 py-24 md:py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-center max-w-[860px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(26px, 4vw, 48px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.025em' }}>
            {c.s2.pull}<span style={{ color: '#b7b5fe' }}>{c.s2.pullSpan}</span>{c.s2.pullEnd}
          </p>
        </div>
      </section>

      {/* ── S3 THE CATEGORY DIFFERENCE ───────────────────── */}
      <Section bg="dark">
        <div className="text-center mb-16">
          <Eyebrow dark center>{c.s3.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 42px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s3.h2}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {c.s3.cols.map(({ question, title, body }, i) => (
            <div key={title} className="px-0 md:px-8" style={i > 0 ? { borderLeft: '1px solid rgba(183,181,254,0.2)' } : undefined}>
              <div className="mb-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '13px', fontStyle: 'italic', color: 'rgba(240,240,240,0.45)' }}>{question}</div>
              <h3 className="mb-3" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '22px', color: '#b7b5fe' }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: 'rgba(240,240,240,0.70)', lineHeight: 1.6 }}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── S4 THE LOOP ───────────────────────────────────── */}
      <Section bg="whisper">
        <div className="text-center mb-8">
          <Eyebrow center>{c.s4.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl mx-auto mb-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 42px)', color: '#0E0E12', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s4.h2}</h2>
        </div>
        <LoopDiagram locale={locale} />
        <div className="text-center mt-8">
          <p className="max-w-[640px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '16px', color: '#212830', lineHeight: 1.7 }}>{c.s4.caption}</p>
          <div style={{ marginTop: '1.25rem' }}>
            <Link href={`/${locale}/methodology`} style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '14px', color: '#5856cc', textDecoration: 'none' }}>{c.s4.methodologyLink}</Link>
          </div>
        </div>
      </Section>

      {/* ── S5 FOUNDER VIDEO ──────────────────────────────── */}
      <section className="px-6 py-24 md:py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow dark center>{c.s5.eyebrow}</Eyebrow>
            <h2 className="max-w-[640px] mx-auto mb-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: 'clamp(22px, 3vw, 34px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s5.h2}</h2>
            <p className="max-w-[500px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: 'rgba(240,240,240,0.60)', lineHeight: 1.6 }}>{c.s5.sub}</p>
          </div>
          <figure className="max-w-[800px] mx-auto rounded-2xl overflow-hidden" style={{ aspectRatio: '16 / 9', backgroundColor: '#2E3848', border: '1px solid rgba(183,181,254,0.12)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="flex flex-col items-center gap-4" style={{ pointerEvents: 'none' }}>
              <div className="flex items-center justify-center rounded-full" style={{ width: '72px', height: '72px', backgroundColor: 'rgba(183,181,254,0.15)', border: '1.5px solid rgba(183,181,254,0.3)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#b7b5fe" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '15px', color: '#F0F0F0', marginBottom: '4px' }}>{c.s5.founderName}</p>
                <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 300, fontSize: '12px', color: 'rgba(183,181,254,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.s5.founderNote}</p>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* ── S6 NAVIGATOR DIFFERENCE ───────────────────────── */}
      <Section bg="whisper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1688646545293-2755ea04cd8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80" alt="Navigator providing calibrated, longitudinal feedback on a student draft" className="rounded-lg w-full" style={{ display: 'block' }} />
          </div>
          <div className="order-1 md:order-2">
            <Eyebrow>{c.s6.eyebrow}</Eyebrow>
            <h2 className="mb-8 max-w-[480px]" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 38px)', color: '#0E0E12', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s6.h2}</h2>
            <div className="space-y-5">
              {c.s6.points.map(({ label, body }) => (
                <p key={label} style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '16px', color: '#212830', lineHeight: 1.6 }}>
                  <strong style={{ fontWeight: 600, color: '#0E0E12' }}>{label}:</strong>{' '}{body}
                </p>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <Link href={`/${locale}/navigators`} style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '14px', color: '#5856cc', textDecoration: 'none' }}>{c.s6.navigatorsLink}</Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ── S7 MEASUREMENT ────────────────────────────────── */}
      <Section bg="dark">
        <div className="text-center mb-16">
          <Eyebrow dark center>{c.s7.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 42px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s7.h2}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {c.s7.cols.map(({ num, title, body }, i) => (
            <div key={num} className="px-0 md:px-8" style={i > 0 ? { borderLeft: '1px solid rgba(183,181,254,0.2)' } : undefined}>
              <div className="mb-3" style={{ fontFamily: 'var(--font-latin)', fontWeight: 300, fontSize: '11px', color: 'rgba(183,181,254,0.40)' }}>{num}</div>
              <h3 className="mb-3" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '20px', color: '#b7b5fe' }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: 'rgba(240,240,240,0.70)', lineHeight: 1.6 }}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── S8 STUDENT VOICE ──────────────────────────────── */}
      <section className="px-6 py-24 md:py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow dark center>{c.s8.eyebrow}</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 42px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s8.h2}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {c.s8.voices.map((v) => (
              <StudentVoiceCard key={v.grade + v.city} quote={v.quote} grade={v.grade} city={v.city} weeksInProgram={v.weeks} hangarDetail={v.detail} />
            ))}
          </div>
        </div>
      </section>

      {/* ── S9 CLOSING CTA ────────────────────────────────── */}
      <Section bg="dark">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="mb-5" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 42px)', color: '#b7b5fe', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s9.h2}</h2>
          <p className="max-w-[520px] mx-auto mb-8" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '16px', color: 'rgba(240,240,240,0.75)', lineHeight: 1.6 }}>{c.s9.sub}</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <Link href={`/${locale}/consult`} className="w-full md:w-auto rounded-lg transition-all hover:opacity-90" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '16px', backgroundColor: '#F5C842', color: '#0E0E12', padding: '16px 32px', textDecoration: 'none', display: 'inline-block', textAlign: 'center', minWidth: '280px' }}>{c.s9.ctaPrimary}</Link>
            <Link href={`/${locale}/program`} className="w-full md:w-auto rounded-lg transition-all hover:border-white" style={{ fontFamily: 'var(--font-latin)', fontWeight: 500, fontSize: '16px', backgroundColor: 'transparent', color: '#F0F0F0', border: '1.5px solid rgba(240,240,240,0.50)', padding: '14px 32px', textDecoration: 'none', display: 'inline-block', textAlign: 'center', minWidth: '280px' }}>{c.s9.ctaSecondary}</Link>
          </div>
          <p className="mt-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '13px', color: '#b7b5fe' }}>{c.s9.note}</p>
        </div>
      </Section>

      <K2Note locale={locale} copy={c.k2Note} />

    </div>
  )
}