'use client'

// components/audiobooks/AudiobookCard.jsx
//
// Library-grid tile. Client component so it can read the per-book resume
// progress from localStorage and render the listened-so-far progress bar.
//
// Visual structure:
//   [ cover ]    title
//                author · narrator
//                ▰▰▰▱▱▱  42% · 1h 12m left
//                duration

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { loadProgress, progressPercent, formatTime } from './audiobookProgress'

export default function AudiobookCard({ book, locale }) {
  const fm = book.frontmatter
  const href = `/${locale}/audiobooks/${book.slug}`

  const [pct, setPct]         = useState(0)
  const [remaining, setRemaining] = useState(fm.durationSec || 0)

  useEffect(() => {
    const p = loadProgress(book.slug)
    if (!p) return
    setPct(progressPercent(p))
    const total = fm.durationSec || p.totalSec || 0
    setRemaining(Math.max(0, total - (p.listenedSec || 0)))
  }, [book.slug, fm.durationSec])

  return (
    <Link
      href={href}
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        height: '100%',
      }}
      aria-label={`Open ${fm.title}`}
    >
      {/* Cover */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          background: 'linear-gradient(135deg, #2E3848 0%, #0E0E12 100%)',
          overflow: 'hidden',
        }}
      >
        {fm.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={fm.cover}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-lavender-signal)',
              fontSize: '2.5rem',
              opacity: 0.6,
            }}
          >
            ♪
          </div>
        )}

        {/* Duration pill */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'rgba(14,14,18,0.75)',
            color: 'var(--color-lavender-signal)',
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '0.25rem 0.625rem',
            borderRadius: 'var(--radius-pill)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {formatTime(fm.durationSec || 0)}
        </span>
      </div>

      {/* Meta */}
      <div style={{ padding: '1.125rem 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3
          style={{
            fontSize: '1.125rem',
            lineHeight: 1.3,
            margin: 0,
            color: 'var(--color-deep-void)',
          }}
        >
          {fm.title}
        </h3>

        <div
          style={{
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            marginTop: '0.375rem',
          }}
        >
          {fm.author}
          {fm.narrator ? ` · Narrated by ${fm.narrator}` : null}
        </div>

        {fm.summary ? (
          <p
            style={{
              fontSize: '0.9375rem',
              lineHeight: 1.55,
              marginTop: '0.75rem',
              color: 'var(--text-body)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {fm.summary}
          </p>
        ) : null}

        {/* Progress bar — only visible if user has played anything */}
        {pct > 0 && (
          <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
            <div
              role="progressbar"
              aria-valuenow={Math.round(pct)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Listening progress"
              style={{
                height: 6,
                background: 'rgba(183,181,254,0.18)',
                borderRadius: 'var(--radius-pill)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: 'var(--color-lavender-signal)',
                  borderRadius: 'var(--radius-pill)',
                  transition: 'width 220ms ease',
                }}
              />
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                marginTop: '0.375rem',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>{Math.round(pct)}% listened</span>
              <span>{formatTime(remaining)} left</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
