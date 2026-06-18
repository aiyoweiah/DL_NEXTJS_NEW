'use client'

// components/ops/OpsGate.jsx
//
// Client-side PIN gate — wraps all /ops/* routes via app/ops/layout.jsx.
// Access is social, not cryptographic — PIN prevents accidental discovery,
// not determined adversaries.
//
// PIN: stored in source only. Not logged, not sent to any server.
// Storage key: dodo_ops_unlocked (localStorage '1' = unlocked)
//
// Pattern mirrors components/partners/PartnersClient.jsx PIN gate.

import { useState, useEffect } from 'react'

const CORRECT_PIN = '6474691126'
const STORAGE_KEY = 'dodo_ops_unlocked'

const B = {
  voidBlack:  '#0E0E12',
  deepVoid:   '#212830',
  midnight:   '#2E3848',
  lavender:   '#B7B5FE',
  gilt:       '#F5C842',
  platinum:   '#F0F0F0',
  muted:      '#5E6879',
  border:     '#2E3848',
}

export default function OpsGate({ children }) {
  const [input,   setInput]   = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error,   setError]   = useState(false)
  const [shake,   setShake]   = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') setUnlocked(true)
    } catch {}
  }, [])

  function handleSubmit() {
    if (input.trim() === CORRECT_PIN) {
      try { localStorage.setItem(STORAGE_KEY, '1') } catch {}
      setUnlocked(true)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 600)
      setTimeout(() => setError(false), 3000)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter') handleSubmit()
  }

  // Hydration guard — prevents localStorage mismatch on static export
  if (!mounted) return <div style={{ minHeight: '100dvh', backgroundColor: B.voidBlack }} />

  if (!unlocked) {
    return (
      <>
        <style>{`
          @keyframes gate-shake {
            0%,100% { transform: translateX(0); }
            20%      { transform: translateX(-8px); }
            40%      { transform: translateX(8px); }
            60%      { transform: translateX(-6px); }
            80%      { transform: translateX(6px); }
          }
          .gate-shake { animation: gate-shake 0.55s ease; }
          .gate-input:focus {
            outline: none;
            border-color: ${B.lavender} !important;
            box-shadow: 0 0 0 3px rgba(183,181,254,0.18);
          }
          .gate-btn:hover  { background-color: #c8c6ff !important; }
          .gate-btn:active { transform: scale(0.97); }
        `}</style>

        <div style={{
          minHeight: '100dvh',
          backgroundColor: B.voidBlack,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-latin), var(--font-cjk), sans-serif',
          padding: '24px',
        }}>
          <div
            className={shake ? 'gate-shake' : ''}
            style={{
              background: B.deepVoid,
              border: `1px solid ${error ? '#c0504d' : B.border}`,
              borderRadius: 14,
              padding: '40px 36px',
              width: '100%',
              maxWidth: 380,
              transition: 'border-color 0.2s',
            }}
          >
            {/* DODO wordmark */}
            <div style={{
              fontSize: 11,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: B.lavender,
              marginBottom: 6,
            }}>
              DODO Learning
            </div>

            <div style={{
              fontSize: 20,
              fontWeight: 700,
              color: B.platinum,
              marginBottom: 6,
            }}>
              Internal Ops
            </div>

            <div style={{
              fontSize: 14,
              color: B.muted,
              lineHeight: 1.5,
              marginBottom: 28,
            }}>
              Enter your access code to continue.
            </div>

            {/* PIN input */}
            <input
              className="gate-input"
              type="password"
              inputMode="numeric"
              placeholder="Access code"
              value={input}
              onChange={e => { setInput(e.target.value); setError(false) }}
              onKeyDown={handleKey}
              autoFocus
              style={{
                width: '100%',
                padding: '11px 14px',
                background: B.midnight,
                border: `1.5px solid ${error ? '#c0504d' : B.border}`,
                borderRadius: 8,
                fontSize: 16,
                color: B.platinum,
                fontFamily: 'inherit',
                letterSpacing: 4,
                boxSizing: 'border-box',
                marginBottom: 10,
                transition: 'border-color 0.2s',
              }}
            />

            {/* Error message */}
            <div style={{
              fontSize: 13,
              color: '#e07070',
              minHeight: 18,
              marginBottom: 14,
              transition: 'opacity 0.2s',
              opacity: error ? 1 : 0,
            }}>
              Incorrect code. Contact Janet if you need access.
            </div>

            {/* Submit */}
            <button
              className="gate-btn"
              onClick={handleSubmit}
              style={{
                width: '100%',
                padding: '12px',
                background: B.lavender,
                color: B.voidBlack,
                border: 'none',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 700,
                fontFamily: 'inherit',
                cursor: 'pointer',
                transition: 'background-color 0.15s, transform 0.1s',
              }}
            >
              Access Ops Tools
            </button>
          </div>
        </div>
      </>
    )
  }

  return <>{children}</>
}
