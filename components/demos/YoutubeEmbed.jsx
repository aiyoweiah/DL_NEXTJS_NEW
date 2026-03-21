'use client'

import { useState } from 'react'

// Thumbnail-first YouTube embed.
// Shows the YouTube maxresdefault thumbnail with a branded play button.
// Replaces with the real iframe only on click — avoids loading multiple
// iframes simultaneously which tanks Lighthouse scores.
//
// Usage:
//   <YoutubeEmbed videoId="dQw4w9WgXcQ" title="Grade 7-8 Demo Class" />
//
// Replace the videoId prop with the real YouTube video ID.
// Aspect ratio defaults to 16/9. Pass aspectRatio="4/3" for portrait-ish clips.

export default function YoutubeEmbed({ videoId, title, aspectRatio = '16/9', rounded = '1rem' }) {
  const [active, setActive] = useState(false)
  const thumbUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`

  if (active) {
    return (
      <div
        style={{
          position:     'relative',
          aspectRatio,
          width:        '100%',
          borderRadius: rounded,
          overflow:     'hidden',
          backgroundColor: '#0E0E12',
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position:     'absolute',
            inset:        0,
            width:        '100%',
            height:       '100%',
            border:       'none',
            display:      'block',
          }}
        />
      </div>
    )
  }

  return (
    <button
      onClick={() => setActive(true)}
      aria-label={`Play video: ${title}`}
      style={{
        position:        'relative',
        aspectRatio,
        width:           '100%',
        display:         'block',
        cursor:          'pointer',
        border:          'none',
        padding:         0,
        background:      'none',
        overflow:        'hidden',
        borderRadius:    rounded,
        WebkitAppearance: 'none',
      }}
    >
      {/* Thumbnail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbUrl}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(14,14,18,0.65) 0%, rgba(14,14,18,0.15) 50%, transparent 100%)',
          transition: 'background 0.2s ease',
        }}
      />

      {/* Play button */}
      <div
        aria-hidden="true"
        style={{
          position:       'absolute',
          inset:          0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width:           '60px',
            height:          '60px',
            borderRadius:    '50%',
            backgroundColor: 'rgba(14,14,18,0.88)',
            border:          '2px solid rgba(183,181,254,0.45)',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            flexShrink:      0,
            boxShadow:       '0 4px 24px rgba(0,0,0,0.4)',
            transition:      'transform 0.15s ease, border-color 0.15s ease',
          }}
        >
          {/* Triangle play icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#b7b5fe"
            style={{ marginLeft: '3px' }}
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Title label at bottom */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        '0.75rem',
          left:          '0.875rem',
          right:         '0.875rem',
          fontSize:      '11px',
          fontWeight:    600,
          color:         'rgba(240,240,240,0.85)',
          letterSpacing: '0.01em',
          textAlign:     'left',
          whiteSpace:    'nowrap',
          overflow:      'hidden',
          textOverflow:  'ellipsis',
        }}
      >
        {title}
      </div>
    </button>
  )
}