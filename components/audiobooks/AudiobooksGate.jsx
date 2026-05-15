'use client'

// components/audiobooks/AudiobooksGate.jsx
//
// Client-side gate for /audiobooks/*. Wraps the entire section via
// app/[locale]/audiobooks/layout.jsx.
//
// On first visit:
//   POST https://audio.dodolearning.com/auth  { password }
//   Worker validates against its PASSWORD secret (never in browser source).
//   On success the Worker sets an HttpOnly signed cookie on audio.dodolearning.com.
//   Subsequent <audio src> and <a download> requests carry that cookie
//   automatically (same eTLD+1 — SameSite=Lax covers it).
//
// On reload:
//   localStorage says "unlocked" → GET /auth to verify cookie is still alive.
//   200 → skip gate.  401 → clear flag, show gate.

import { useState, useEffect } from 'react'

const AUTH_URL    = 'https://audio.dodolearning.com/auth'
const STORAGE_KEY = 'dodo_audiobooks_unlocked'

export default function AudiobooksGate({ children }) {
  const [input,    setInput]    = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [checking, setChecking] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)
  const [shake,    setShake]    = useState(false)
  const [mounted,  setMounted]  = useState(false)

  useEffect(() => {
    setMounted(true)
    if (localStorage.getItem(STORAGE_KEY) !== '1') return

    // Remembered session — verify the Worker cookie is still alive before
    // skipping the gate. Avoids showing the library when the cookie expired.
    setChecking(true)
    fetch(AUTH_URL, { method: 'GET', credentials: 'include' })
      .then(r => {
        if (r.ok) setUnlocked(true)
        else      localStorage.removeItem(STORAGE_KEY)
      })
      .catch(() => setUnlocked(true)) // network error: optimistic — audio will 401 if truly dead
      .finally(() => setChecking(false))
  }, [])

  async function handleSubmit() {
    if (!input.trim() || loading) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(AUTH_URL, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: input.trim() }),
      })
      if (res.ok) {
        localStorage.setItem(STORAGE_KEY, '1')
        setUnlocked(true)
      } else {
        triggerError('wrong')
      }
    } catch (err) {
      triggerError('network')
    } finally {
      setLoading(false)
    }
  }

  function triggerError(type) {
    setError(type)
    setShake(true)
    setTimeout(() => setShake(false), 600)
    setTimeout(() => setError(null), 4000)
  }

  // Hydration guard + session-check blank (prevents flash)
  if (!mounted || checking) {
    return <div style={{ minHeight: '100dvh', backgroundColor: 'var(--color-void-black, #0E0E12)' }} />
  }

  if (unlocked) return <>{children}</>

  return (
    <>
      <style>{`
        @keyframes ab-gate-shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-6px); }
          80%      { transform: translateX(6px); }
        }
        .ab-gate-shake { animation: ab-gate-shake 0.55s ease; }
        .ab-gate-input:focus {
          outline: none;
          border-color: var(--color-lavender-signal, #B7B5FE) !important;
          box-shadow: 0 0 0 3px rgba(183,181,254,0.18);
        }
        .ab-gate-btn:hover  { opacity: 0.88; }
        .ab-gate-btn:active { transform: scale(0.97); }
      `}</style>

      <div style={{
        minHeight:       '100dvh',
        backgroundColor: 'var(--color-void-black, #0E0E12)',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        fontFamily:      '"DM Sans", sans-serif',
        padding:         '24px',
      }}>
        <div
          className={shake ? 'ab-gate-shake' : ''}
          style={{
            background:   'var(--color-deep-void, #212830)',
            border:       `1px solid ${error ? '#c0504d' : 'var(--color-border, #2E3848)'}`,
            borderRadius: 14,
            padding:      '40px 36px',
            width:        '100%',
            maxWidth:     380,
            transition:   'border-color 0.2s',
          }}
        >
          <div style={{
            fontSize:      11,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color:         'var(--color-lavender-signal, #B7B5FE)',
            marginBottom:  6,
          }}>
            DODO Library
          </div>

          <div style={{
            fontSize:     20,
            fontWeight:   700,
            color:        'var(--color-platinum, #F0F0F0)',
            marginBottom: 6,
          }}>
            Audiobooks
          </div>

          <div style={{
            fontSize:     14,
            color:        'var(--text-muted, #5E6879)',
            lineHeight:   1.5,
            marginBottom: 28,
          }}>
            Enter your access code to continue.
          </div>

          <input
            className="ab-gate-input"
            type="password"
            placeholder="Access code"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false) }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            autoFocus
            disabled={loading}
            style={{
              width:        '100%',
              padding:      '11px 14px',
              background:   'var(--color-midnight, #2E3848)',
              border:       `1.5px solid ${error ? '#c0504d' : 'var(--color-border, #2E3848)'}`,
              borderRadius: 8,
              fontSize:     16,
              color:        'var(--color-platinum, #F0F0F0)',
              fontFamily:   'inherit',
              letterSpacing: 4,
              boxSizing:    'border-box',
              marginBottom: 10,
              transition:   'border-color 0.2s',
              opacity:      loading ? 0.6 : 1,
            }}
          />

          <div style={{
            fontSize:     13,
            color:        '#e07070',
            minHeight:    18,
            marginBottom: 14,
            transition:   'opacity 0.2s',
            opacity:      error ? 1 : 0,
          }}>
            {error === 'wrong'   && 'Incorrect code. Contact Janet if you need access.'}
            {error === 'network' && 'Connection error — could not reach audio server.'}
          </div>

          <button
            className="ab-gate-btn"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width:        '100%',
              padding:      '12px',
              background:   'var(--color-lavender-signal, #B7B5FE)',
              color:        'var(--color-void-black, #0E0E12)',
              border:       'none',
              borderRadius: 8,
              fontSize:     15,
              fontWeight:   700,
              fontFamily:   'inherit',
              cursor:       loading ? 'wait' : 'pointer',
              transition:   'opacity 0.15s, transform 0.1s',
              opacity:      loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Checking…' : 'Listen to Audiobooks'}
          </button>
        </div>
      </div>
    </>
  )
}
