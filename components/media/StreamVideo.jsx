'use client'

// components/media/StreamVideo.jsx
//
// Thumbnail-first Cloudflare Stream embed — the DODO counterpart to
// components/demos/YoutubeEmbed.jsx. Same lazy-load pattern: a static
// poster image renders until the user clicks play, then the iframe is
// injected. Saves a real Lighthouse hit on pages with multiple videos
// (e.g. /demos).
//
// Design system anchor (.interface-design/system.md):
//   • Calm, editorial chrome — minimal frame, low-opacity lavender border,
//     rounded-lg corners per the spacing/layout rules.
//   • Brand lavender accent (#b7b5fe on dark surfaces) for the play glyph.
//   • Surface-agnostic — works on light (#F5F5FF) or dark (#0E0E12) sections.
//
// Lookup:
//   Pass either `uid` (raw Stream UID) or `videoKey` (manifest key like
//   "about-page-intro"). Keys resolve via /Videos/video-manifest.json which
//   is committed despite Videos/ being .gitignored — see .gitignore for the
//   unignore rule. The manifest's `playbackHost` field provides the customer
//   playback subdomain.
//
// Usage:
//   <StreamVideo videoKey="about-page-intro" title="What DODO Is" />
//   <StreamVideo videoKey="kimberly-intro" aspectRatio="9/16" />
//   <StreamVideo uid="3303e7a112b4ad4db773de4e09526ee4" autoplay muted loop />

import { useState } from 'react'
import manifest from '@/Videos/video-manifest.json'

const PLAYBACK_HOST = manifest.playbackHost ?? 'customer-me018erhvwsykfhr.cloudflarestream.com'

function resolveVideo({ uid, videoKey }) {
  if (uid) return { uid, title: null, posterUrl: `https://${PLAYBACK_HOST}/${uid}/thumbnails/thumbnail.jpg` }
  if (videoKey) {
    const entry = manifest.videos?.[videoKey]
    if (!entry) {
      if (typeof window !== 'undefined') {
        console.warn(`[StreamVideo] Unknown videoKey "${videoKey}". Check Videos/video-manifest.json.`)
      }
      return null
    }
    return {
      uid:       entry.uid,
      title:     entry.title,
      posterUrl: entry.thumbnail ?? `https://${PLAYBACK_HOST}/${entry.uid}/thumbnails/thumbnail.jpg`,
    }
  }
  return null
}

function buildIframeSrc({ uid, autoplay, muted, loop, startUserInitiated }) {
  // Cloudflare Stream iframe param reference:
  // https://developers.cloudflare.com/stream/viewing-videos/using-the-stream-player/
  const params = new URLSearchParams()
  // Click-to-play case: kick the iframe with autoplay=true so the click that
  // mounted us also triggers playback (browser autoplay policy is satisfied
  // because the action is user-initiated).
  if (startUserInitiated || autoplay) params.set('autoplay', 'true')
  if (muted)    params.set('muted',    'true')
  if (loop)     params.set('loop',     'true')
  // Brand-aligned controls accent — Stream player honours `primaryColor`.
  params.set('primaryColor', 'b7b5fe')
  const qs = params.toString()
  return `https://${PLAYBACK_HOST}/${uid}/iframe${qs ? '?' + qs : ''}`
}

export default function StreamVideo({
  uid,
  videoKey,
  title,
  aspectRatio = '16/9',
  rounded     = '1rem',
  autoplay    = false,
  muted       = false,
  loop        = false,
  poster      = 'auto',           // 'auto' = Stream-generated; or pass a URL string to override
  className,
  style,
}) {
  const [active, setActive] = useState(autoplay)
  const resolved = resolveVideo({ uid, videoKey })

  // Defensive: missing manifest entry shouldn't crash the page.
  if (!resolved) {
    return (
      <div
        role="img"
        aria-label="Video unavailable"
        className={className}
        style={{
          position:        'relative',
          aspectRatio,
          width:           '100%',
          borderRadius:    rounded,
          backgroundColor: '#212830',
          border:          '1px solid rgba(183,181,254,0.10)',
          ...style,
        }}
      />
    )
  }

  const { uid: resolvedUid, title: manifestTitle, posterUrl: autoPoster } = resolved
  const effectiveTitle  = title ?? manifestTitle ?? 'DODO Learning video'
  const effectivePoster = poster === 'auto' ? autoPoster : poster

  const frameStyle = {
    position:        'relative',
    aspectRatio,
    width:           '100%',
    borderRadius:    rounded,
    overflow:        'hidden',
    backgroundColor: '#0E0E12',
    border:          '1px solid rgba(183,181,254,0.10)',
    ...style,
  }

  if (active) {
    return (
      <div className={className} style={frameStyle}>
        <iframe
          src={buildIframeSrc({ uid: resolvedUid, autoplay, muted, loop, startUserInitiated: !autoplay })}
          title={effectiveTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play video: ${effectiveTitle}`}
      className={className}
      style={{
        ...frameStyle,
        cursor:           'pointer',
        padding:          0,
        background:       'none',
        display:          'block',
        WebkitAppearance: 'none',
      }}
    >
      {/* Stream auto-thumbnail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={effectivePoster}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {/* Subtle dark wash so the play glyph sits cleanly on any frame */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(14,14,18,0.65) 0%, rgba(14,14,18,0.15) 50%, transparent 100%)',
        }}
      />

      {/* Play glyph — lavender token (#b7b5fe), same chrome as YoutubeEmbed */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#b7b5fe" style={{ marginLeft: '3px' }} aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Title label at bottom-left, ellipsised */}
      {effectiveTitle && (
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
          {effectiveTitle}
        </div>
      )}
    </button>
  )
}
