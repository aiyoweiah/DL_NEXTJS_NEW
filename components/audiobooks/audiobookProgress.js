// components/audiobooks/audiobookProgress.js
//
// localStorage helper for audiobook resume + listening progress.
// Pure functions — safe to call from 'use client' components.
//
// Storage shape (one entry per audiobook slug):
//   localStorage["dodo:audiobook:<slug>"] = JSON.stringify({
//     chapterIndex: 0,        // which chapter the user was on
//     positionSec:  127.4,    // playhead within that chapter
//     totalSec:     3600,     // sum of chapter durations (for percent calc)
//     listenedSec:  840,      // cumulative listened time (approx)
//     updatedAt:    1715430000000
//   })
//
// All reads/writes are wrapped in try/catch — Safari private mode and a
// few iOS WebView contexts throw on localStorage access. We treat any
// failure as "no progress saved" and move on.

const PREFIX = 'dodo:audiobook:'

function key(slug) {
  return `${PREFIX}${slug}`
}

export function loadProgress(slug) {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(key(slug))
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function saveProgress(slug, progress) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(
      key(slug),
      JSON.stringify({ ...progress, updatedAt: Date.now() }),
    )
  } catch {
    // Quota exceeded or storage disabled — silently no-op.
  }
}

export function clearProgress(slug) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(key(slug))
  } catch {
    // ignore
  }
}

// Percent 0–100, clamped. Used by the library card's progress bar.
export function progressPercent(progress) {
  if (!progress || !progress.totalSec) return 0
  const pct = (progress.listenedSec / progress.totalSec) * 100
  return Math.max(0, Math.min(100, pct))
}

// Format seconds as "1:23:45" or "12:34".
export function formatTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) sec = 0
  const s = Math.floor(sec % 60)
  const m = Math.floor((sec / 60) % 60)
  const h = Math.floor(sec / 3600)
  const pad = (n) => String(n).padStart(2, '0')
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
}
