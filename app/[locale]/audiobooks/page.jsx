// app/[locale]/audiobooks/page.jsx
//
// Audiobook library — gated grid of available titles.
//
// Gating (see docs/audiobooks-setup.md): runtime only. The AudiobooksGate
// access-code component controls who reaches the player; media URLs live on
// the audio host. (The old build-time NEXT_PUBLIC_SITE guard — which hid the
// library on the retired dodoletterhouse.com / Vercel build — was removed
// 2026-06-02 now that Cloudflare Pages is the single host.)

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata } from '@/lib/metadata'
import { getAllAudiobooks } from '@/lib/audiobooks'
import AudiobookCard from '@/components/audiobooks/AudiobookCard'

// ── UI strings — bilingual chrome, EN-only content ──────────────
const UI = {
  en: {
    meta: {
      title: 'Audiobooks — DODO Learning',
      description:
        'A private collection of DODO audiobooks. Access is by invitation.',
    },
    eyebrow:  'The DODO Library',
    heading:  'Audiobooks',
    subhead:
      'A growing collection of audiobooks recorded by DODO Navigators. ' +
      'Listen in your browser, pick up where you left off, or download for offline.',
    emptyTitle: 'No audiobooks yet',
    emptyBody:  'New titles will appear here as they’re published.',
    gateNoteEyebrow: 'Private library',
    gateNote:
      "You’re seeing this page because you have the access code. " +
      "Audio files are protected by the same session — they won’t play or download without it.",
  },
  zh: {
    meta: {
      title: '有声书 — DODO Learning',
      description: 'DODO专属有声书馆藏（邀请制）。',
    },
    eyebrow:  'DODO 有声图书馆',
    heading:  '有声书',
    subhead:
      'DODO导师录制的有声书合集，持续更新。' +
      '可在浏览器内收听、续听上次进度，或下载离线收听。',
    emptyTitle: '暂无有声书',
    emptyBody:  '新书发布后将出现在此。',
    gateNoteEyebrow: '私密馆藏',
    gateNote:
      '您可以看到本页，是因为您拥有访问码。' +
      '音频文件受同一套会话保护，未验证时无法播放或下载。',
  },
}

export function generateStaticParams() {
  return localeParams()
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const ui = UI[locale] ?? UI.en
  return buildMetadata({
    locale,
    title:       ui.meta.title,
    description: ui.meta.description,
    path: '/audiobooks',
    noIndex: true, // gated content — keep out of search indexes
  })
}

export default async function AudiobooksPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const ui    = UI[locale] ?? UI.en
  const books = await getAllAudiobooks()

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="section-hero-short">
        <div className="container-section">
          <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>
            {ui.eyebrow}
          </div>
          <h1 className="text-gradient" style={{ marginBottom: '1rem' }}>
            {ui.heading}
          </h1>
          <p style={{ maxWidth: '40rem', color: 'var(--color-platinum)' }}>
            {ui.subhead}
          </p>
        </div>
      </section>

      {/* ── Gate note ──────────────────────────────────────── */}
      <section className="section-tinted">
        <div className="container-section" style={{ maxWidth: '52rem' }}>
          <div className="eyebrow" style={{ marginBottom: '0.5rem' }}>
            {ui.gateNoteEyebrow}
          </div>
          <p style={{ color: 'var(--text-body)', margin: 0 }}>
            {ui.gateNote}
          </p>
        </div>
      </section>

      {/* ── Library grid ───────────────────────────────────── */}
      <section className="section-light">
        <div className="container-section">
          {books.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <h2 style={{ marginBottom: '0.5rem' }}>{ui.emptyTitle}</h2>
              <p style={{ color: 'var(--text-muted)', margin: '0 auto' }}>
                {ui.emptyBody}
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gap: '1.5rem',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              }}
            >
              {books.map((book) => (
                <AudiobookCard key={book.slug} book={book} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
