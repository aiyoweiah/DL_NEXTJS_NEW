// app/[locale]/credentials/page.jsx
//
// /credentials — GEO reference page for the named frameworks DODO builds on
// and the research base underneath. Explicitly citation-dense, LLM-first.
//
// Ships 2026-08-26 · Tier-2 #2 (workflow.md).
//
// Content lives in `credentials` export of content/marketing.{en,zh}.js.
// Schema wired via `credentialsSchema()` in lib/schema.js — CollectionPage
// with four EducationalOccupationalCredential nodes + academic citations.
//
// Voice rules from BRAND_CONTENT_GUIDE:
//   - MCT named once as the lineage of L/C content (§07)
//   - Research base framed as acceleration into mastery (§07a hard rule)
//   - Speaking = DODO’s own strand — the live differentiator
//   - Every research claim traceable to a dated academic source
//
// Server-rendered — zero 'use client'.

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { credentials as copyEn } from '@/content/marketing.en'
import { credentials as copyZh } from '@/content/marketing.zh'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata } from '@/lib/metadata'
import { credentialsSchema } from '@/lib/schema'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'
import DoCta         from '@/components/ui/DoCta'
import Eyebrow from '@/components/ui/Eyebrow'

export function generateStaticParams() {
  return localeParams()
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = locale === 'zh' ? copyZh : copyEn
  return buildMetadata({
    locale,
    path:        '/credentials',
    title:       t.meta.title,
    description: t.meta.description,
  })
}

// ── Framework block ───────────────────────────────────────────
function FrameworkBlock({ f }) {
  return (
    <article id={f.key} className="max-w-3xl mx-auto" style={{ paddingBlock: '3rem' }}>
      <h2 style={{
        fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, lineHeight: 1.2,
        letterSpacing: '-0.01em', marginBottom: '1rem', color: 'var(--text-heading)',
      }}>{f.name}</h2>
      <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--text-body)', marginBottom: '1.25rem' }}>
        <strong>Attribution.</strong> {f.attribution}
      </p>
      <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--text-body)', marginBottom: '1.25rem' }}>
        <strong>How DODO uses it.</strong> {f.dodoRole}
      </p>
      {f.source && (
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: 0 }}>
          Source: <a href={f.source.url} target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--text-accent)', textDecoration: 'underline' }}>
            {f.source.label}
          </a>
        </p>
      )}
    </article>
  )
}

// ── Research block ────────────────────────────────────────────
function ResearchBlock({ r }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div style={{ marginBottom: '2rem' }}>
        <Eyebrow mb="0.75rem">{r.eyebrow}</Eyebrow>
        <h2 style={{
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, lineHeight: 1.15,
          letterSpacing: '-0.02em', marginBottom: '1.5rem', color: 'var(--text-heading)',
        }}>{r.h2}</h2>
        <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--text-body)', marginBottom: '1.25rem' }}>
          {r.intro}
        </p>
        <p style={{
          fontSize: '15px', lineHeight: 1.7, color: 'var(--text-muted)',
          borderInlineStart: '3px solid var(--color-lavender-signal)', paddingInlineStart: '1rem',
          marginBottom: '2rem', fontStyle: 'italic',
        }}>
          {r.hardRule}
        </p>
      </div>

      <h3 style={{
        fontSize: 'clamp(1.15rem, 2vw, 1.35rem)', fontWeight: 700, marginBottom: '1rem',
        color: 'var(--text-heading)',
      }}>What the evidence lets DODO say.</h3>
      <ul style={{ listStyle: 'disc', paddingInlineStart: '1.5rem', marginBottom: '2.5rem' }}>
        {r.claims.map((c, i) => (
          <li key={i} style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text-body)', marginBottom: '0.65rem' }}>{c}</li>
        ))}
      </ul>

      <h3 style={{
        fontSize: 'clamp(1.15rem, 2vw, 1.35rem)', fontWeight: 700, marginBottom: '1rem',
        color: 'var(--text-heading)',
      }}>Citations.</h3>
      <ol style={{ listStyle: 'decimal', paddingInlineStart: '1.5rem' }}>
        {r.citations.map((c, i) => (
          <li key={i} style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--text-body)', marginBottom: '1rem' }}>
            <strong>{c.authors}</strong> <em>{c.title}</em> {c.publication}
            {c.note && <><br /><span style={{ color: 'var(--text-muted)' }}>{c.note}</span></>}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default async function CredentialsPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const t = locale === 'zh' ? copyZh : copyEn

  return (
    <>
      {/* JSON-LD — credentialsSchema (Tier-2 #2, 2026-08-26).
          CollectionPage + 4 EducationalOccupationalCredential nodes +
          academic citations for the research base. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(credentialsSchema()) }}
      />

      {/* Hero */}
      <SectionWrapper white>
        <div className="max-w-3xl mx-auto text-center" style={{ paddingBlock: '2rem' }}>
          <Eyebrow mb="0.75rem">{t.hero.eyebrow}</Eyebrow>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, lineHeight: 1.15,
            letterSpacing: '-0.02em', marginBottom: '1.5rem', color: 'var(--text-heading)',
          }}>{t.hero.h1}</h1>
          <p style={{
            fontSize: '17px', lineHeight: 1.7, color: 'var(--text-body)', maxWidth: '38rem',
            marginInline: 'auto',
          }}>{t.hero.sub}</p>
        </div>
      </SectionWrapper>

      {/* Frameworks */}
      <SectionWrapper>
        <div style={{ borderBlockStart: '1px solid var(--border-light)' }}>
          {t.frameworks.map((f) => <FrameworkBlock key={f.key} f={f} />)}
        </div>
      </SectionWrapper>

      {/* Research Base */}
      <SectionWrapper tinted>
        <ResearchBlock r={t.researchBase} />
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper white>
        <div className="max-w-2xl mx-auto text-center" style={{ paddingBlock: '2rem' }}>
          <Eyebrow mb="0.75rem">{t.cta.eyebrow}</Eyebrow>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.2,
            letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--text-heading)',
          }}>{t.cta.h2}</h2>
          <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text-body)', marginBottom: '2rem' }}>
            {t.cta.sub}
          </p>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: '1rem' }}>
            <Button as={Link} href={`/${locale}/demos`} variant="solid">{t.cta.watch}</Button>
            <DoCta as={Link} href={`/${locale}/consult`}>{t.cta.consult}</DoCta>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
