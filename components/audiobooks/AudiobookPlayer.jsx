'use client'

// components/audiobooks/AudiobookPlayer.jsx
//
// Client-only audiobook player.
//
// Architecture:
//   - One native <audio> element under the hood, src swaps when the user
//     jumps chapters. We DON'T concatenate chapters into one file — keeps
//     downloads-per-chapter clean and lets us swap CDN URLs per chapter.
//   - Sticky bottom control bar (mobile-friendly), full chapter list above.
//   - Resume: on mount, load saved chapter+position from localStorage and
//     restore them as soon as the audio element is ready. On every
//     timeupdate (throttled to 5s), persist current state back.
//   - Auto-advance: when a chapter ends, jump to the next one and keep
//     playing. Stops at the end of the last chapter.
//   - Downloads: per-chapter <a download>. Files are proxied by the audio
//     Worker; the session cookie on audio.dodolearning.com authorizes
//     the download automatically (same-site, SameSite=Lax).
//
// Keyboard:
//   Space      play/pause
//   ←/→        ±15s
//   ↑/↓        speed up/down
//   J / L      ±15s (YouTube parity)
//   K          play/pause (YouTube parity)
//
// The audio element is intentionally not native-controls — we render
// custom UI so we own the look. Native controls remain accessible via
// the underlying element (it still has all ARIA semantics; we expose
// labels on the visible controls).

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  loadProgress,
  saveProgress,
  formatTime,
} from './audiobookProgress'

const SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2]
const SKIP_SEC = 15
const SAVE_INTERVAL_MS = 5000

export default function AudiobookPlayer({ slug, title, chapters }) {
  const audioRef = useRef(null)
  const lastSaveRef = useRef(0)

  // Resume state — restored from localStorage on first mount.
  const [chapterIndex, setChapterIndex] = useState(0)
  const [isPlaying, setIsPlaying]       = useState(false)
  const [position, setPosition]         = useState(0)
  const [duration, setDuration]         = useState(
    chapters[0]?.durationSec ?? 0,
  )
  const [speed, setSpeed]               = useState(1)
  const [hasMounted, setHasMounted]     = useState(false)

  const totalSec = chapters.reduce((acc, c) => acc + (c.durationSec || 0), 0)
  const current  = chapters[chapterIndex] || chapters[0]

  // ── Resume on mount ────────────────────────────────────────
  // The <audio> element exists but hasn't loaded metadata yet. We set the
  // chapter (which swaps src), then wait for loadedmetadata to set
  // currentTime — otherwise the seek is silently dropped.
  useEffect(() => {
    const progress = loadProgress(slug)
    if (progress && progress.chapterIndex < chapters.length) {
      setChapterIndex(progress.chapterIndex)
      // currentTime restore happens in the onLoadedMetadata handler below
      // using a ref so we don't depend on stale state.
      pendingResumeRef.current = progress.positionSec
    }
    setHasMounted(true)

  }, [slug, chapters.length])

  const pendingResumeRef = useRef(null)

  // ── Persist progress (throttled) ───────────────────────────
  const persist = useCallback(() => {
    const now = Date.now()
    if (now - lastSaveRef.current < SAVE_INTERVAL_MS) return
    lastSaveRef.current = now

    const chaptersBefore = chapters
      .slice(0, chapterIndex)
      .reduce((acc, c) => acc + (c.durationSec || 0), 0)

    saveProgress(slug, {
      chapterIndex,
      positionSec: position,
      totalSec,
      listenedSec: chaptersBefore + position,
    })
  }, [slug, chapterIndex, position, totalSec, chapters])

  useEffect(() => { persist() }, [position, persist])

  // ── Audio event wiring ─────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoaded = () => {
      setDuration(audio.duration || current.durationSec || 0)
      if (pendingResumeRef.current != null) {
        audio.currentTime = pendingResumeRef.current
        pendingResumeRef.current = null
      }
    }
    const onTime    = () => setPosition(audio.currentTime)
    const onEnded   = () => {
      if (chapterIndex < chapters.length - 1) {
        setChapterIndex(chapterIndex + 1)
        // keep playing through to the next chapter
        // (the chapter change effect handles src swap + auto-play)
      } else {
        setIsPlaying(false)
      }
    }
    const onPlay  = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate',     onTime)
    audio.addEventListener('ended',          onEnded)
    audio.addEventListener('play',           onPlay)
    audio.addEventListener('pause',          onPause)

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate',     onTime)
      audio.removeEventListener('ended',          onEnded)
      audio.removeEventListener('play',           onPlay)
      audio.removeEventListener('pause',          onPause)
    }
  }, [chapterIndex, chapters.length, current.durationSec])

  // ── Swap src when chapter changes ──────────────────────────
  const wasPlayingRef = useRef(false)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !hasMounted) return
    wasPlayingRef.current = !audio.paused
    audio.src = current.audioUrl
    audio.load()
    if (wasPlayingRef.current) {
      // Best-effort auto-play; some browsers block this without user gesture.
      audio.play().catch(() => {})
    }
    setPosition(0)
  }, [chapterIndex, current.audioUrl, hasMounted])

  // ── Speed ──────────────────────────────────────────────────
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed
  }, [speed])

  // ── Controls ───────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => {})
    else              audio.pause()
  }, [])

  const skip = useCallback((delta) => {
    const audio = audioRef.current
    if (!audio) return
    const next = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + delta))
    audio.currentTime = next
  }, [])

  const seekTo = useCallback((sec) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, Math.min(audio.duration || 0, sec))
  }, [])

  const cycleSpeed = useCallback((dir) => {
    const idx  = SPEEDS.indexOf(speed)
    const next = SPEEDS[Math.max(0, Math.min(SPEEDS.length - 1, idx + dir))]
    setSpeed(next)
  }, [speed])

  // ── Keyboard shortcuts (page-level) ────────────────────────
  useEffect(() => {
    function onKey(e) {
      // Ignore when typing into an input/textarea/contenteditable.
      const t = e.target
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return

      switch (e.code) {
        case 'Space':
        case 'KeyK':
          e.preventDefault(); togglePlay(); break
        case 'ArrowLeft':
        case 'KeyJ':
          e.preventDefault(); skip(-SKIP_SEC); break
        case 'ArrowRight':
        case 'KeyL':
          e.preventDefault(); skip(SKIP_SEC); break
        case 'ArrowUp':
          e.preventDefault(); cycleSpeed(1); break
        case 'ArrowDown':
          e.preventDefault(); cycleSpeed(-1); break
        default: break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [togglePlay, skip, cycleSpeed])

  // ── Render ─────────────────────────────────────────────────
  return (
    <>
      {/* Hidden native audio element — the source of truth. */}
      {/* preload="metadata" — load just enough to get duration without
          downloading the whole MP3 on page load. */}
      <audio
        ref={audioRef}
        src={current.audioUrl}
        preload="metadata"
        aria-label={`${title} — ${current.title}`}
      />

      {/* ── Chapter list ──────────────────────────────────── */}
      <section
        aria-labelledby="chapters-heading"
        className="container-section"
        style={{ paddingBottom: '8rem' /* space for sticky bar */ }}
      >
        <h2 id="chapters-heading" className="mb-6">Chapters</h2>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {chapters.map((ch, i) => {
            const active = i === chapterIndex
            return (
              <li
                key={i}
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  marginBottom: '0.625rem',
                  borderColor: active ? 'var(--color-lavender-signal)' : undefined,
                  boxShadow: active
                    ? '0 0 0 1px var(--color-lavender-signal), 0 4px 16px rgba(183,181,254,0.18)'
                    : undefined,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (i !== chapterIndex) {
                    pendingResumeRef.current = 0
                    setChapterIndex(i)
                  }
                  // play after click as user gesture
                  setTimeout(() => audioRef.current?.play().catch(() => {}), 0)
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 36, height: 36, flexShrink: 0,
                    borderRadius: '50%',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    background: active
                      ? 'var(--color-lavender-signal)'
                      : 'rgba(183,181,254,0.15)',
                    color: active ? 'var(--color-void-black)' : '#5856cc',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                  }}
                >
                  {i + 1}
                </span>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      color: 'var(--color-deep-void)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ch.title}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                    {formatTime(ch.durationSec || 0)}
                  </div>
                </div>

                <a
                  href={ch.audioUrl}
                  download
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Download ${ch.title}`}
                  className="btn-outline"
                  style={{
                    padding: '0.5rem 0.875rem',
                    fontSize: '0.8125rem',
                    borderRadius: 'var(--radius-pill)',
                    border: '1.5px solid rgba(183,181,254,0.5)',
                    color: '#5856cc',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    background: 'transparent',
                    minHeight: 36,
                  }}
                >
                  <DownloadIcon />
                  <span>Download</span>
                </a>
              </li>
            )
          })}
        </ol>
      </section>

      {/* ── Sticky player bar ─────────────────────────────── */}
      <div
        role="region"
        aria-label="Audio player"
        style={{
          position: 'fixed',
          left: 0, right: 0, bottom: 0,
          zIndex: 90,
          background: 'rgba(14,14,18,0.96)',
          backdropFilter: 'blur(18px) saturate(140%)',
          WebkitBackdropFilter: 'blur(18px) saturate(140%)',
          borderTop: '1px solid rgba(183,181,254,0.18)',
          color: 'var(--color-platinum)',
          padding: '0.875rem 1.25rem',
        }}
      >
        <div
          className="container-section"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) auto',
            alignItems: 'center',
            gap: '1rem',
            padding: 0,
          }}
        >
          {/* Now-playing label */}
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-lavender-signal)',
                marginBottom: '0.125rem',
              }}
            >
              Chapter {chapterIndex + 1} / {chapters.length}
            </div>
            <div
              style={{
                fontSize: '0.9375rem',
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {current.title}
            </div>
          </div>

          {/* Speed */}
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8125rem',
              color: 'var(--color-platinum)',
            }}
          >
            <span className="sr-only">Playback speed</span>
            <select
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              style={{
                background: 'rgba(183,181,254,0.1)',
                border: '1px solid rgba(183,181,254,0.3)',
                color: 'var(--color-platinum)',
                borderRadius: 'var(--radius-pill)',
                padding: '0.375rem 0.625rem',
                fontSize: '0.8125rem',
                fontWeight: 600,
              }}
              aria-label="Playback speed"
            >
              {SPEEDS.map((s) => (
                <option key={s} value={s}>{s}x</option>
              ))}
            </select>
          </label>
        </div>

        {/* Scrubber */}
        <div
          className="container-section"
          style={{ padding: 0, marginTop: '0.625rem' }}
        >
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={1}
            value={Math.min(position, duration || 0)}
            onChange={(e) => seekTo(parseFloat(e.target.value))}
            aria-label="Seek position"
            style={{ width: '100%', accentColor: 'var(--color-lavender-signal)' }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            <span>{formatTime(position)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Transport */}
        <div
          className="container-section"
          style={{
            padding: 0,
            marginTop: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <button
            type="button"
            onClick={() => skip(-SKIP_SEC)}
            aria-label="Back 15 seconds"
            className="btn-ghost"
            style={{ padding: '0.5rem 0.875rem' }}
          >
            ⟲ 15
          </button>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="btn-primary"
            style={{
              width: 56, height: 56, padding: 0,
              borderRadius: '50%',
              minWidth: 56, minHeight: 56,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <button
            type="button"
            onClick={() => skip(SKIP_SEC)}
            aria-label="Forward 15 seconds"
            className="btn-ghost"
            style={{ padding: '0.5rem 0.875rem' }}
          >
            15 ⟳
          </button>
        </div>
      </div>
    </>
  )
}

// ── Inline icons (no new deps) ─────────────────────────────
function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
function PauseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  )
}
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}
