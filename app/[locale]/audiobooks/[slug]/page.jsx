// app/[locale]/audiobooks/[slug]/page.jsx
//
// Per-audiobook detail page: cover, metadata, long description,
// chapter list + sticky player.
//
// Gating mirrors the library page — see ../page.jsx for the rationale.

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata } from '@/lib/metadata'
import {
  getAllAudiobookSlugs,
  getAudiobook,
} from '@/lib/audiobooks'
import AudiobookPlayer from '@/components/audiobooks/AudiobookPlayer'

const SITE = process.env.NEXT_PUBLIC_SITE

// ── UI strings — chrome only ────────────────────────────────────
const UI = {
  en: {
    backToLibrary: '← All audiobooks',
    by:            'by',
    narratedBy:    'Narrated by',
    runtime:       'Total runtime',
    aboutHeading:  'About this audiobook',
  },
  zh: {
    backToLibrary: '← 返回有声书馆',
    by:            '作者',
    narratedBy:    '朗读',
    runtime:       '总时长',
    aboutHeading:  '关于本书',
  },
}

// ── Static params ───────────────────────────────────────────────
// One entry per (locale, slug). When the NEXT_PUBLIC_SITE build guard is
// not 'dodolearning' the page notFound()s before any audiobook content is
// read, so each route emits 404 HTML and only the slug *string* lands in
// that build — titles, chapters, descriptions, and audio URLs never do.
// (Historically that was the dodoletterhouse.com / Vercel build; now a
// single Cloudflare Pages host renders the real pages.) Returning [] is not
// an option under output: 'export' (Next.js requires at least one param).
export function generateStaticParams() {
  const locales = localeParams()
  const slugs   = getAllAudiobookSlugs()
  return locales.flatMap(({ locale }) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params

  // On non-dodolearning builds, return generic metadata so no audiobook
  // title or summary is baked into the 404 HTML emitted for this route.
  if (SITE !== 'dodolearning') {
    return buildMetadata({ locale, title: 'Audiobook', path: `/audiobooks/${slug}`, noIndex: true })
  }

  const book = await getAudiobook(slug, { withHtml: false })
  if (!book) return buildMetadata({ locale, title: 'Audiobook', path: `/audiobooks/${slug}`, noIndex: true })

  return buildMetadata({
    locale,
    title:       book.frontmatter.title,
    description: book.frontmatter.summary,
    path:        `/audiobooks/${slug}`,
    noIndex:     true,
  })
}

export default async function AudiobookDetailPage({ params }) {
  const { locale, slug } = await params
  if (!isValidLocale(locale)) notFound()
  if (SITE !== 'dodolearning')  notFound()

  const ui   = UI[locale] ?? UI.en
  const book = await getAudiobook(slug)
  if (!book) notFound()

  const fm = book.frontmatter

  return (
    <>
      {/* ── Header ─────────────────────────────────────────── */}
      <section className="section-hero-short">
        <div className="container-section">
          <Link
            href={`/${locale}/audiobooks`}
            style={{
              display: 'inline-block',
              marginBottom: '1.5rem',
              color: 'var(--color-lavender-signal)',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            {ui.backToLibrary}
          </Link>

          <div className="grid gap-10 items-start grid-cols-1 md:grid-cols-[minmax(200px,280px)_1fr]">
            {/* Cover */}
            <div
              style={{
                aspectRatio: '1 / 1',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #2E3848 0%, #0E0E12 100%)',
                boxShadow: '0 12px 48px rgba(0,0,0,0.4)',
                maxWidth: '280px',
              }}
            >
              {fm.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={fm.cover}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : null}
            </div>

            {/* Meta */}
            <div>
              <h1 className="text-gradient" style={{ marginBottom: '0.75rem' }}>
                {fm.title}
              </h1>

              <p
                style={{
                  color: 'var(--color-platinum)',
                  fontSize: '1.0625rem',
                  marginBottom: '1.25rem',
                  maxWidth: '36rem',
                }}
              >
                {fm.summary}
              </p>

              <dl
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '0.375rem 1.25rem',
                  color: 'var(--color-platinum)',
                  fontSize: '0.9375rem',
                  margin: 0,
                }}
              >
                {fm.author && (
                  <>
                    <dt style={{ color: 'var(--text-muted)' }}>{ui.by}</dt>
                    <dd style={{ margin: 0 }}>{fm.author}</dd>
                  </>
                )}
                {fm.narrator && (
                  <>
                    <dt style={{ color: 'var(--text-muted)' }}>{ui.narratedBy}</dt>
                    <dd style={{ margin: 0 }}>{fm.narrator}</dd>
                  </>
                )}
                {fm.durationSec > 0 && (
                  <>
                    <dt style={{ color: 'var(--text-muted)' }}>{ui.runtime}</dt>
                    <dd style={{ margin: 0 }}>{humanDuration(fm.durationSec)}</dd>
                  </>
                )}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── About / long description ───────────────────────── */}
      {book.descriptionHtml && (
        <section className="section-white">
          <div className="container-section" style={{ maxWidth: '52rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>{ui.aboutHeading}</h2>
            <div
              className="prose-dodo"
              dangerouslySetInnerHTML={{ __html: book.descriptionHtml }}
            />
          </div>
        </section>
      )}

      {/* ── Chapter list + sticky player (client) ──────────── */}
      <section className="section-light" style={{ paddingTop: '2rem' }}>
        <AudiobookPlayer
          slug={book.slug}
          title={fm.title}
          chapters={fm.chapters}
        />
      </section>
    </>
  )
}

// ── Helpers ─────────────────────────────────────────────────────
// "3h 24m" / "47m" / "12s" — human-readable runtime for the header.
function humanDuration(sec) {
  if (!sec || sec <= 0) return ''
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  if (h > 0 && m > 0) return `${h}h ${m}m`
  if (h > 0)          return `${h}h`
  if (m > 0)          return `${m}m`
  return `${Math.floor(sec)}s`
}
