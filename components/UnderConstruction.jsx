'use client'

// components/UnderConstruction.jsx
//
// Standalone under-construction page.
// Direct translation of Figma UnderConstruction component.
//
// Usage: drop into any not-yet-built locale route:
//   app/[locale]/lexile/page.jsx:
//     export { default } from '@/components/UnderConstruction'
//     export { generateStaticParams } from '@/components/UnderConstruction'
//
// This component renders its own minimal nav + footer — the site
// Navbar and Footer still render from app/[locale]/layout.jsx above it.
// The mini-nav here is decorative / brand-consistent, not functional.

import { useState } from 'react'
import Link         from 'next/link'

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

const fadeUpStyle = (delay = 0) => ({
  animation:      `fadeUp 0.7s ease-out both`,
  animationDelay: `${delay}ms`,
})

export default function UnderConstruction() {
  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault?.()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div
        className="relative overflow-hidden"
        style={{ minHeight: '80dvh', backgroundColor: '#F5F5FF', color: '#0E0E12', fontFamily: 'var(--font-latin)' }}
      >
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div style={{ position: 'absolute', top: '15%', left: '10%', width: 288, height: 288, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.1)', filter: 'blur(48px)', animation: 'pulseBlob 3s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '20%', right: '8%', width: 384, height: 384, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.08)', filter: 'blur(48px)', animation: 'pulseBlob 3s ease-in-out infinite', animationDelay: '1.5s' }} />
          <div style={{ position: 'absolute', top: '60%', left: '50%', width: 192, height: 192, borderRadius: '50%', backgroundColor: 'rgba(245,200,66,0.08)', filter: 'blur(48px)', animation: 'pulseBlob 3s ease-in-out infinite', animationDelay: '0.75s' }} />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: 0.03, backgroundImage: 'linear-gradient(#b7b5fe 1px, transparent 1px), linear-gradient(90deg, #b7b5fe 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center" style={{ minHeight: '80dvh', padding: '4rem 1.5rem' }}>

          {/* Floating icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="flex items-center justify-center" style={{ position: 'absolute', top: '18%', left: '15%', width: 48, height: 48, borderRadius: '0.75rem', backgroundColor: '#ffffff', border: '1px solid rgba(183,181,254,0.1)', boxShadow: '0 4px 16px rgba(183,181,254,0.1)', animation: 'float 4s ease-in-out infinite' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b7b5fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 12l-8.5 8.5a2.121 2.121 0 0 1-3-3L12 9" /><path d="M17.64 15L22 10.36" /><path d="M20.41 8.59l-3-3a2 2 0 0 0-2.83 0L12 8.17l3.83 3.83 2.58-2.58a2 2 0 0 0 0-2.83z" /></svg>
            </div>
            <div className="flex items-center justify-center" style={{ position: 'absolute', top: '25%', right: '18%', width: 40, height: 40, borderRadius: '0.5rem', backgroundColor: '#ffffff', border: '1px solid rgba(183,181,254,0.1)', boxShadow: '0 4px 16px rgba(183,181,254,0.1)', animation: 'floatSlow 5s ease-in-out infinite', animationDelay: '1s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5C842" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /></svg>
            </div>
            <div className="flex items-center justify-center" style={{ position: 'absolute', bottom: '28%', left: '20%', width: 40, height: 40, borderRadius: '0.5rem', backgroundColor: '#ffffff', border: '1px solid rgba(183,181,254,0.1)', boxShadow: '0 4px 16px rgba(183,181,254,0.1)', animation: 'float 4s ease-in-out infinite', animationDelay: '0.5s' }}>
              <span style={{ fontSize: '16px', color: '#0E0E12' }}>Do</span>
            </div>
            <div className="flex items-center justify-center" style={{ position: 'absolute', bottom: '32%', right: '15%', width: 44, height: 44, borderRadius: '0.75rem', backgroundColor: '#ffffff', border: '1px solid rgba(183,181,254,0.1)', boxShadow: '0 4px 16px rgba(183,181,254,0.1)', animation: 'floatSlow 5s ease-in-out infinite', animationDelay: '0.3s' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#b7b5fe' }}>Do</span>
            </div>
          </div>

          {/* Central content */}
          <div className="text-center" style={{ maxWidth: '42rem', ...fadeUpStyle(0) }}>
            <div className="inline-flex items-center gap-2 rounded-full mb-8" style={{ padding: '8px 16px', backgroundColor: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5C842" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 20h20" /><path d="M6 20V10l6-7 6 7v10" /><path d="M10 20v-5h4v5" /></svg>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#0E0E12' }}>Under Construction</span>
              <span style={{ fontFamily: 'var(--font-cjk)', fontSize: '12px', color: '#b7b5fe' }}>· 建设中</span>
            </div>

            <h1 className="mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#0E0E12' }}>
              Something <span style={{ fontWeight: 600, color: '#b7b5fe' }}>thoughtful</span> is being built.
            </h1>
            <p className="mb-6" style={{ fontFamily: 'var(--font-cjk)', fontSize: '18px', color: '#b7b5fe' }}>我们正在精心打造中。</p>
            <p className="mx-auto mb-4" style={{ fontSize: '16px', lineHeight: 1.8, color: '#2E3848', maxWidth: '32rem' }}>
              This page isn&rsquo;t ready yet — but we&rsquo;re working on it with the same care we bring to everything at DODO.
            </p>
            <p className="mx-auto" style={{ fontFamily: 'var(--font-cjk)', fontSize: '14px', lineHeight: 1.8, color: 'rgba(183,181,254,0.6)', maxWidth: '32rem' }}>
              这个页面还没有准备好，但我们正在用心打造。好的东西值得等待。
            </p>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: '3rem', width: '100%', maxWidth: '24rem', ...fadeUpStyle(200) }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#2E3848' }}>Progress</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#b7b5fe' }}>65%</span>
            </div>
            <div style={{ width: '100%', height: 8, borderRadius: 9999, backgroundColor: 'rgba(183,181,254,0.1)', overflow: 'hidden' }} role="progressbar" aria-valuenow={65} aria-valuemin={0} aria-valuemax={100} aria-label="Page construction progress: 65%">
              <div style={{ height: '100%', borderRadius: 9999, background: 'linear-gradient(to right, #b7b5fe 0%, rgba(183,181,254,0.7) 100%)', animation: 'progressFill 1.5s ease-out both', animationDelay: '0.5s' }} />
            </div>
          </div>

          {/* Email form */}
          <div style={{ marginTop: '3rem', width: '100%', maxWidth: '28rem', ...fadeUpStyle(350) }}>
            {submitted ? (
              <div className="text-center" style={{ backgroundColor: '#ffffff', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(183,181,254,0.15)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', animation: 'scaleIn 0.3s ease-out both' }}>
                <div className="flex items-center justify-center mx-auto mb-4" style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(183,181,254,0.1)' }} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b7b5fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                </div>
                <p style={{ fontSize: '16px', fontWeight: 600, color: '#0E0E12', marginBottom: '4px' }}>You&rsquo;re on the list!</p>
                <p style={{ fontSize: '14px', color: '#2E3848' }}>We&rsquo;ll let you know when this page is ready.</p>
                <p className="mt-2" style={{ fontFamily: 'var(--font-cjk)', fontSize: '13px', color: '#b7b5fe' }}>页面准备好后，我们会通知您。</p>
              </div>
            ) : (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(183,181,254,0.1)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b7b5fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#0E0E12' }}>Get notified when we launch</span>
                </div>
                <div className="flex gap-3">
                  <label htmlFor="notify-email" className="sr-only">Your email address</label>
                  <input id="notify-email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(e) }} style={{ flex: 1, padding: '12px 16px', borderRadius: '0.75rem', backgroundColor: '#F5F5FF', border: '1px solid rgba(183,181,254,0.1)', fontSize: '14px', color: '#0E0E12', outline: 'none', fontFamily: 'var(--font-latin)' }} />
                  <button type="button" onClick={handleSubmit} className="btn btn-charter shrink-0" style={{ fontSize: '14px', fontWeight: 600, padding: '12px 24px', borderRadius: '0.75rem' }}>Notify Me</button>
                </div>
                <p className="mt-3" style={{ fontSize: '12px', color: 'rgba(46,56,72,0.4)' }}>No spam. Just one email when the page goes live.</p>
              </div>
            )}
          </div>

          {/* Back home */}
          <div style={{ marginTop: '2.5rem', textAlign: 'center', ...fadeUpStyle(500) }}>
            <Link href="/" className="inline-flex items-center gap-2 transition-colors duration-150" style={{ padding: '12px 24px', borderRadius: '0.75rem', backgroundColor: '#0E0E12', color: '#ffffff', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Return to Home Page
            </Link>
            <p className="mt-3" style={{ fontFamily: 'var(--font-cjk)', fontSize: '12px', color: 'rgba(183,181,254,0.5)' }}>返回首页</p>
          </div>

          {/* Brand line */}
          <div style={{ marginTop: '5rem', textAlign: 'center', ...fadeUpStyle(650) }}>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', fontWeight: 300, letterSpacing: '0.05em', color: 'rgba(14,14,18,0.15)' }}>Think Once. In Both Languages.</p>
            <p className="mt-1" style={{ fontFamily: 'var(--font-cjk)', fontSize: '14px', color: 'rgba(183,181,254,0.2)' }}>一次思考，两种语言。</p>
          </div>

        </div>
      </div>
    </>
  )
}