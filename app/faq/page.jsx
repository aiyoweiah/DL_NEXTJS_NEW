'use client'

// components/UnderConstruction.jsx
//
// Standalone under-construction page.
// Direct translation of Figma UnderConstruction component.
//
// Usage: drop into any not-yet-built route, e.g.:
//   app/[locale]/lexile/page.jsx → export { default } from '@/components/UnderConstruction'
//
// IMPORTANT — this page has its own minimal nav + footer.
// It should be rendered inside a layout that suppresses the site Navbar + Footer.
// Option A: create app/[locale]/[page]/layout.jsx that returns children directly.
// Option B: wrap with a dedicated blank layout at the route level.
//
// Framer-motion animations → CSS keyframes (no client bundle cost beyond useState).
// Link/router → Next.js <Link href="/">.
// form onSubmit → standard React event handler.

import { useState }  from 'react'
import Link          from 'next/link'

// ═══════════════════════════════════════════════════════════════
// CSS ANIMATIONS
// ═══════════════════════════════════════════════════════════════
// Injected via <style> tag — replaces framer-motion variants.
// float, floatSlow → translateY loops (4s / 5s)
// pulse → opacity + scale loop (3s)
// fadeUp → opacity + translateY enter (0.7s)
// progressFill → width 0 → 65% (1.5s, delay 0.5s)

const KEYFRAMES = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-12px); }
  }
  @keyframes floatSlow {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes pulseBlob {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50%       { opacity: 0.6; transform: scale(1.05); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes progressFill {
    from { width: 0%; }
    to   { width: 65%; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1); }
  }
`

// Animation style helpers
const fadeUpStyle = (delay = 0) => ({
  animation:    `fadeUp 0.7s ease-out both`,
  animationDelay: `${delay}ms`,
})

export default function UnderConstruction() {
  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* Figma: min-h-screen bg-[#F5F5FF] text-[#0E0E12] relative overflow-hidden */}
      <div
        className="relative overflow-hidden"
        style={{
          minHeight:       '100dvh',
          backgroundColor: '#F5F5FF',
          color:           '#0E0E12',
          fontFamily:      'var(--font-latin)',
        }}
      >

        {/* ── Background blobs ────────────────────────────────
            Figma: three absolute blobs — lavender top-left, lavender bottom-right, gilt centre
            All use blur-3xl + pulseBlob animation
        ── */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Figma: top-[15%] left-[10%] w-72 h-72 bg-[#b7b5fe]/10 blur-3xl */}
          <div
            style={{
              position:        'absolute',
              top:             '15%',
              left:            '10%',
              width:           288,
              height:          288,
              borderRadius:    '50%',
              backgroundColor: 'rgba(183,181,254,0.1)',
              filter:          'blur(48px)',
              animation:       'pulseBlob 3s ease-in-out infinite',
            }}
          />
          {/* Figma: bottom-[20%] right-[8%] w-96 h-96 bg-[#b7b5fe]/8 blur-3xl delay-1.5s */}
          <div
            style={{
              position:        'absolute',
              bottom:          '20%',
              right:           '8%',
              width:           384,
              height:          384,
              borderRadius:    '50%',
              backgroundColor: 'rgba(183,181,254,0.08)',
              filter:          'blur(48px)',
              animation:       'pulseBlob 3s ease-in-out infinite',
              animationDelay:  '1.5s',
            }}
          />
          {/* Figma: top-[60%] left-[50%] w-48 h-48 bg-[#F5C842]/8 blur-3xl */}
          <div
            style={{
              position:        'absolute',
              top:             '60%',
              left:            '50%',
              width:           192,
              height:          192,
              borderRadius:    '50%',
              backgroundColor: 'rgba(245,200,66,0.08)',
              filter:          'blur(48px)',
              animation:       'pulseBlob 3s ease-in-out infinite',
              animationDelay:  '0.75s',
            }}
          />
        </div>

        {/* ── Grid pattern overlay ─────────────────────────────
            Figma: opacity-[0.03], 60px grid, #b7b5fe lines
        ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            opacity:         0.03,
            backgroundImage:
              'linear-gradient(#b7b5fe 1px, transparent 1px), linear-gradient(90deg, #b7b5fe 1px, transparent 1px)',
            backgroundSize:  '60px 60px',
          }}
        />

        {/* ── Mini Nav ─────────────────────────────────────────
            Figma: bg-[#F5F5FF]/80 backdrop-blur-md border-b border-[#b7b5fe]/10
            Logo left (square lavender badge + DODO wordmark) + Back link right
        ── */}
        <nav
          className="relative z-10"
          aria-label="Under construction navigation"
          style={{
            backgroundColor: 'rgba(245,245,255,0.8)',
            backdropFilter:  'blur(12px)',
            borderBottom:    '1px solid rgba(183,181,254,0.1)',
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{ maxWidth: '72rem', margin: '0 auto', padding: '1rem 1.5rem' }}
          >
            {/* Figma: w-9 h-9 rounded-xl bg-[#b7b5fe] + "DODO" wordmark */}
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="DODO Learning — home"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width:           36,
                  height:          36,
                  borderRadius:    '0.75rem',
                  backgroundColor: '#b7b5fe',
                  flexShrink:      0,
                }}
                aria-hidden="true"
              >
                <span style={{ fontWeight: 700, fontSize: '14px', color: '#ffffff' }}>
                  do
                </span>
              </div>
              <span style={{ fontWeight: 600, fontSize: '20px', color: '#0E0E12' }}>
                DODO
              </span>
            </Link>

            {/* Figma: ArrowLeft + "Back to Home" — color #2E3848 hover:text-[#b7b5fe] */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 transition-colors duration-150"
              style={{
                fontSize:       '14px',
                fontWeight:     500,
                color:          '#2E3848',
                textDecoration: 'none',
              }}
            >
              {/* Arrow left icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Home
            </Link>
          </div>
        </nav>

        {/* ── Main content area ────────────────────────────────
            Figma: flex flex-col items-center justify-center
            min-h-[calc(100vh-65px)] px-6 py-16 relative z-10
        ── */}
        <div
          className="relative z-10 flex flex-col items-center justify-center"
          style={{
            minHeight: 'calc(100dvh - 65px)',
            padding:   '4rem 1.5rem',
          }}
        >

          {/* ── Floating construction icons ───────────────────
              Figma: four absolute white-bg squares/circles with icons
              top-left: Hammer (float 4s)
              top-right: Sparkles in Gilt (floatSlow 5s, delay 1s)
              bottom-left: "Do" text (float)
              bottom-right: "Do" in #b7b5fe (floatSlow)
          ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Figma: top-[18%] left-[15%] w-12 h-12 rounded-xl */}
            <div
              className="flex items-center justify-center"
              style={{
                position:        'absolute',
                top:             '18%',
                left:            '15%',
                width:           48,
                height:          48,
                borderRadius:    '0.75rem',
                backgroundColor: '#ffffff',
                border:          '1px solid rgba(183,181,254,0.1)',
                boxShadow:       '0 4px 16px rgba(183,181,254,0.1)',
                animation:       'float 4s ease-in-out infinite',
              }}
            >
              {/* Hammer icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b7b5fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 12l-8.5 8.5a2.121 2.121 0 0 1-3-3L12 9" />
                <path d="M17.64 15L22 10.36" />
                <path d="M20.41 8.59l-3-3a2 2 0 0 0-2.83 0L12 8.17l3.83 3.83 2.58-2.58a2 2 0 0 0 0-2.83z" />
              </svg>
            </div>

            {/* Figma: top-[25%] right-[18%] w-10 h-10 rounded-lg */}
            <div
              className="flex items-center justify-center"
              style={{
                position:        'absolute',
                top:             '25%',
                right:           '18%',
                width:           40,
                height:          40,
                borderRadius:    '0.5rem',
                backgroundColor: '#ffffff',
                border:          '1px solid rgba(183,181,254,0.1)',
                boxShadow:       '0 4px 16px rgba(183,181,254,0.1)',
                animation:       'floatSlow 5s ease-in-out infinite',
                animationDelay:  '1s',
              }}
            >
              {/* Sparkles icon in Gilt */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5C842" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                <path d="M5 17l.75 2.25L8 20l-2.25.75L5 23" />
                <path d="M19 2l.5 1.5L21 4l-1.5.5L19 6" />
              </svg>
            </div>

            {/* Figma: bottom-[28%] left-[20%] w-10 h-10 rounded-lg — "Do" text */}
            <div
              className="flex items-center justify-center"
              style={{
                position:        'absolute',
                bottom:          '28%',
                left:            '20%',
                width:           40,
                height:          40,
                borderRadius:    '0.5rem',
                backgroundColor: '#ffffff',
                border:          '1px solid rgba(183,181,254,0.1)',
                boxShadow:       '0 4px 16px rgba(183,181,254,0.1)',
                animation:       'float 4s ease-in-out infinite',
                animationDelay:  '0.5s',
              }}
            >
              <span style={{ fontSize: '16px', color: '#0E0E12' }}>Do</span>
            </div>

            {/* Figma: bottom-[32%] right-[15%] w-11 h-11 rounded-xl — "Do" in lavender */}
            <div
              className="flex items-center justify-center"
              style={{
                position:        'absolute',
                bottom:          '32%',
                right:           '15%',
                width:           44,
                height:          44,
                borderRadius:    '0.75rem',
                backgroundColor: '#ffffff',
                border:          '1px solid rgba(183,181,254,0.1)',
                boxShadow:       '0 4px 16px rgba(183,181,254,0.1)',
                animation:       'floatSlow 5s ease-in-out infinite',
                animationDelay:  '0.3s',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#b7b5fe' }}>Do</span>
            </div>
          </div>

          {/* ── Central content ──────────────────────────────── */}
          {/* Figma: text-center max-w-2xl, fadeUp animation */}
          <div
            className="text-center"
            style={{ maxWidth: '42rem', ...fadeUpStyle(0) }}
          >

            {/* Figma: badge — bg-[#F5C842]/10 border-[#F5C842]/20 rounded-full mb-8 */}
            {/* Construction icon + "Under Construction" + Chinese dot */}
            <div
              className="inline-flex items-center gap-2 rounded-full mb-8"
              style={{
                padding:         '8px 16px',
                backgroundColor: 'rgba(245,200,66,0.1)',
                border:          '1px solid rgba(245,200,66,0.2)',
              }}
            >
              {/* Construction icon */}
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#F5C842" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 20h20" />
                <path d="M6 20V10l6-7 6 7v10" />
                <path d="M10 20v-5h4v5" />
              </svg>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#0E0E12' }}>
                Under Construction
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-cjk)',
                  fontSize:   '12px',
                  color:      '#b7b5fe',
                }}
              >
                · 建设中
              </span>
            </div>

            {/* Figma: h1 fontWeight 300 clamp(2rem,5vw,3.25rem) lineHeight 1.15 */}
            {/* "thoughtful" → #b7b5fe fontWeight 600 */}
            <h1
              className="mb-4"
              style={{
                fontSize:      'clamp(2rem, 5vw, 3.25rem)',
                fontWeight:    300,
                lineHeight:    1.15,
                letterSpacing: '-0.02em',
                color:         '#0E0E12',
              }}
            >
              Something{' '}
              <span style={{ fontWeight: 600, color: '#b7b5fe' }}>thoughtful</span>{' '}
              is being built.
            </h1>

            {/* Figma: Chinese subtitle — font-chinese fontSize 18 color #b7b5fe mb-6 */}
            <p
              className="mb-6"
              style={{
                fontFamily: 'var(--font-cjk)',
                fontSize:   '18px',
                color:      '#b7b5fe',
              }}
            >
              我们正在精心打造中。
            </p>

            {/* Figma: body — #2E3848 fontSize 16 lineHeight 1.8 max-w-lg mx-auto mb-4 */}
            <p
              className="mx-auto mb-4"
              style={{
                fontSize:   '16px',
                lineHeight: 1.8,
                color:      '#2E3848',
                maxWidth:   '32rem',
              }}
            >
              This page isn&rsquo;t ready yet — but we&rsquo;re working on it with the
              same care we bring to everything at DODO. Real learning takes time.
              So does building something worth visiting.
            </p>

            {/* Figma: Chinese body — font-chinese fontSize 14 lineHeight 1.8 #b7b5fe/60 */}
            <p
              className="mx-auto"
              style={{
                fontFamily: 'var(--font-cjk)',
                fontSize:   '14px',
                lineHeight: 1.8,
                color:      'rgba(183,181,254,0.6)',
                maxWidth:   '32rem',
              }}
            >
              这个页面还没有准备好，但我们正在用心打造。好的东西值得等待。
            </p>

          </div>

          {/* ── Progress bar ─────────────────────────────────────
              Figma: w-full max-w-sm mt-12
              Label row: "Progress" + "65%" in #b7b5fe
              Track: bg-[#b7b5fe]/10, h-2, rounded-full
              Fill: gradient from-[#b7b5fe] to-[#b7b5fe]/70, animated to 65%
          ── */}
          <div
            style={{ marginTop: '3rem', width: '100%', maxWidth: '24rem', ...fadeUpStyle(200) }}
          >
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#2E3848' }}>
                Progress
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#b7b5fe' }}>
                65%
              </span>
            </div>
            <div
              style={{
                width:           '100%',
                height:          8,
                borderRadius:    9999,
                backgroundColor: 'rgba(183,181,254,0.1)',
                overflow:        'hidden',
              }}
              role="progressbar"
              aria-valuenow={65}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Page construction progress: 65%"
            >
              <div
                style={{
                  height:           '100%',
                  borderRadius:     9999,
                  background:       'linear-gradient(to right, #b7b5fe 0%, rgba(183,181,254,0.7) 100%)',
                  animation:        'progressFill 1.5s ease-out both',
                  animationDelay:   '0.5s',
                }}
              />
            </div>
          </div>

          {/* ── Email notification form ───────────────────────────
              Figma: w-full max-w-md mt-12
              Before submit: white card, Bell icon + label, email input + Gilt button
              After submit: white card, Bell icon, "You're on the list!" + Chinese
          ── */}
          <div
            style={{ marginTop: '3rem', width: '100%', maxWidth: '28rem', ...fadeUpStyle(350) }}
          >
            {submitted ? (
              // Figma: submitted state — scaleIn animation, text-center
              <div
                className="text-center"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius:    '1rem',
                  padding:         '1.5rem',
                  border:          '1px solid rgba(183,181,254,0.15)',
                  boxShadow:       '0 1px 4px rgba(0,0,0,0.04)',
                  animation:       'scaleIn 0.3s ease-out both',
                }}
              >
                {/* Bell icon circle */}
                <div
                  className="flex items-center justify-center mx-auto mb-4"
                  style={{
                    width:           48,
                    height:          48,
                    borderRadius:    '50%',
                    backgroundColor: 'rgba(183,181,254,0.1)',
                  }}
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b7b5fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <p style={{ fontSize: '16px', fontWeight: 600, color: '#0E0E12', marginBottom: '4px' }}>
                  You&rsquo;re on the list!
                </p>
                <p style={{ fontSize: '14px', color: '#2E3848' }}>
                  We&rsquo;ll let you know when this page is ready.
                </p>
                <p
                  className="mt-2"
                  style={{ fontFamily: 'var(--font-cjk)', fontSize: '13px', color: '#b7b5fe' }}
                >
                  页面准备好后，我们会通知您。
                </p>
              </div>
            ) : (
              // Figma: default state — white card, form with input + button
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius:    '1rem',
                  padding:         '1.5rem',
                  border:          '1px solid rgba(183,181,254,0.1)',
                  boxShadow:       '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                {/* Figma: Bell icon + label row mb-4 */}
                <div className="flex items-center gap-3 mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b7b5fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#0E0E12' }}>
                    Get notified when we launch
                  </span>
                </div>

                {/* Figma: flex gap-3, input + Gilt button */}
                {/* Note: no <form> per artifact rules — using div + onClick */}
                <div className="flex gap-3">
                  <label htmlFor="notify-email" className="sr-only">
                    Your email address
                  </label>
                  <input
                    id="notify-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(e) }}
                    required
                    style={{
                      flex:            1,
                      padding:         '12px 16px',
                      borderRadius:    '0.75rem',
                      backgroundColor: '#F5F5FF',
                      border:          '1px solid rgba(183,181,254,0.1)',
                      fontSize:        '14px',
                      color:           '#0E0E12',
                      outline:         'none',
                      fontFamily:      'var(--font-latin)',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(183,181,254,0.3)' }}
                    onBlur={(e)  => { e.target.style.borderColor = 'rgba(183,181,254,0.1)' }}
                  />
                  {/* Figma: bg-[#F5C842] text-[#0E0E12] px-6 py-3 rounded-xl */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-charter shrink-0"
                    style={{
                      fontSize:     '14px',
                      fontWeight:   600,
                      padding:      '12px 24px',
                      borderRadius: '0.75rem',
                    }}
                  >
                    Notify Me
                  </button>
                </div>

                {/* Figma: disclaimer — #2E3848/40 fontSize 12 mt-3 */}
                <p
                  className="mt-3"
                  style={{ fontSize: '12px', color: 'rgba(46,56,72,0.4)' }}
                >
                  No spam. Just one email when the page goes live.
                </p>
              </div>
            )}
          </div>

          {/* ── Back home CTA ─────────────────────────────────────
              Figma: mt-10, bg-[#0E0E12] text-white rounded-xl px-6 py-3
              + Chinese label centred below
          ── */}
          <div
            style={{ marginTop: '2.5rem', textAlign: 'center', ...fadeUpStyle(500) }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 transition-colors duration-150"
              style={{
                padding:         '12px 24px',
                borderRadius:    '0.75rem',
                backgroundColor: '#0E0E12',
                color:           '#ffffff',
                fontSize:        '14px',
                fontWeight:      500,
                textDecoration:  'none',
              }}
            >
              {/* ArrowLeft */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Return to Home Page
            </Link>

            {/* Figma: Chinese label centred, #b7b5fe/50 fontSize 12 mt-3 */}
            <p
              className="mt-3 text-center"
              style={{
                fontFamily: 'var(--font-cjk)',
                fontSize:   '12px',
                color:      'rgba(183,181,254,0.5)',
              }}
            >
              返回首页
            </p>
          </div>

          {/* ── Brand line ────────────────────────────────────────
              Figma: mt-20, "Think Once. In Both Languages." fontWeight 300
              letterSpacing 0.05em, #0E0E12/15
              Chinese subtitle #b7b5fe/20 mt-1
          ── */}
          <div
            style={{ marginTop: '5rem', textAlign: 'center', ...fadeUpStyle(650) }}
            aria-label="DODO Learning brand tagline"
          >
            <p
              style={{
                fontSize:      'clamp(1rem, 2.5vw, 1.5rem)',
                fontWeight:    300,
                letterSpacing: '0.05em',
                color:         'rgba(14,14,18,0.15)',
              }}
            >
              Think Once. In Both Languages.
            </p>
            <p
              className="mt-1"
              style={{
                fontFamily: 'var(--font-cjk)',
                fontSize:   '14px',
                color:      'rgba(183,181,254,0.2)',
              }}
            >
              一次思考，两种语言。
            </p>
          </div>

        </div>

        {/* ── Mini Footer ───────────────────────────────────────
            Figma: border-t border-[#b7b5fe]/10 py-8 bg-[#F5F5FF]/80
            Copyright left, Chinese tagline right
        ── */}
        <footer
          className="relative z-10"
          role="contentinfo"
          style={{
            borderTop:       '1px solid rgba(183,181,254,0.1)',
            padding:         '2rem 0',
            backgroundColor: 'rgba(245,245,255,0.8)',
          }}
        >
          <div
            className="flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem', fontSize: '13px' }}
          >
            <p style={{ color: 'rgba(46,56,72,0.4)' }}>
              &copy; {new Date().getFullYear()} DODO Learning. All rights reserved.
            </p>
            <p
              style={{ fontFamily: 'var(--font-cjk)', color: 'rgba(183,181,254,0.4)' }}
            >
              DODO 学习 &middot; 用英语思考的力量
            </p>
          </div>
        </footer>

      </div>
    </>
  )
}