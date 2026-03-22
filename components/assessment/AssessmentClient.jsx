'use client'

// components/results/AssessmentClient.jsx
// All 10 sections of the Assessment/Results page.
// Figma source: Assessment App.tsx — tUKokxMK9eHkSortCPKzTX

import { useState, useCallback } from 'react'
import Link from 'next/link'

// ─── Eyebrow ──────────────────────────────────────────────────
function Eyebrow({ children }) {
  return (
    <div style={{
      fontFamily: 'var(--font-latin)', fontSize: '12px', fontWeight: 500,
      letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b7b5fe', marginBottom: '16px',
    }}>
      {children}
    </div>
  )
}

// ─── LexileBar ────────────────────────────────────────────────
function LexileBar({ beforeScore, afterScore, dark = false }) {
  const MAX = 1300
  const bf  = Math.min(beforeScore / MAX, 1)
  const af  = Math.min(afterScore  / MAX, 1)
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span style={{ fontFamily: 'var(--font-latin)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em',
          color: dark ? 'rgba(240,240,240,0.5)' : 'rgba(14,14,18,0.4)' }}>BEFORE</span>
        <span style={{ fontFamily: 'var(--font-latin)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', color: '#b7b5fe' }}>AFTER</span>
      </div>
      <div className="relative rounded-full overflow-hidden" style={{ height: '12px',
        backgroundColor: dark ? 'rgba(183,181,254,0.10)' : 'rgba(14,14,18,0.08)' }}>
        <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${bf*100}%`,
          backgroundColor: dark ? 'rgba(183,181,254,0.25)' : 'rgba(14,14,18,0.12)' }} />
        <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${af*100}%`,
          background: 'linear-gradient(90deg,#b7b5fe 0%,#c8c7ff 100%)' }} />
      </div>
      <div className="flex justify-between mt-3">
        <div>
          <span style={{ fontFamily: 'var(--font-latin)', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em',
            color: dark ? 'rgba(240,240,240,0.45)' : 'rgba(14,14,18,0.3)' }}>{beforeScore}L</span>
          <span style={{ display: 'block', fontFamily: 'var(--font-latin)', fontSize: '11px', fontWeight: 400, marginTop: '2px',
            color: dark ? 'rgba(240,240,240,0.35)' : 'rgba(14,14,18,0.3)' }}>Entry</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontFamily: 'var(--font-latin)', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', color: '#b7b5fe' }}>{afterScore}L</span>
          <span style={{ display: 'block', fontFamily: 'var(--font-latin)', fontSize: '11px', fontWeight: 400, marginTop: '2px', color: '#b7b5fe', opacity: 0.65 }}>Exit</span>
        </div>
      </div>
    </div>
  )
}

// ─── AssessmentReport ─────────────────────────────────────────
function AssessmentReport({ lexileBefore, lexileAfter, traits }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#212830', padding: '20px 24px', borderBottom: '1px solid rgba(183,181,254,0.15)' }}>
        <div style={{ fontFamily: 'var(--font-latin)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(183,181,254,0.6)', marginBottom: '12px' }}>Exit Assessment Report</div>
        <div className="flex items-end gap-3">
          <div>
            <span style={{ fontFamily: 'var(--font-latin)', fontSize: '11px', color: 'rgba(240,240,240,0.4)', display: 'block', marginBottom: '2px' }}>Entry</span>
            <span style={{ fontFamily: 'var(--font-latin)', fontSize: '28px', fontWeight: 700, color: 'rgba(240,240,240,0.35)', letterSpacing: '-0.03em' }}>{lexileBefore}L</span>
          </div>
          <div style={{ fontSize: '18px', color: 'rgba(183,181,254,0.35)', paddingBottom: '4px' }}>→</div>
          <div>
            <span style={{ fontFamily: 'var(--font-latin)', fontSize: '11px', color: '#b7b5fe', opacity: 0.7, display: 'block', marginBottom: '2px' }}>Exit</span>
            <span style={{ fontFamily: 'var(--font-latin)', fontSize: '28px', fontWeight: 700, color: '#b7b5fe', letterSpacing: '-0.03em' }}>{lexileAfter}L</span>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right', paddingBottom: '4px' }}>
            <span style={{ fontFamily: 'var(--font-latin)', fontSize: '13px', fontWeight: 700, color: '#F5C842', letterSpacing: '-0.01em' }}>+{lexileAfter - lexileBefore}L</span>
            <span style={{ display: 'block', fontFamily: 'var(--font-latin)', fontSize: '10px', color: 'rgba(245,200,66,0.55)' }}>~1 grade level</span>
          </div>
        </div>
      </div>
      {/* Trait bars */}
      <div style={{ padding: '20px 24px' }}>
        <div className="flex justify-between mb-4">
          <span style={{ fontFamily: 'var(--font-latin)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(14,14,18,0.35)' }}>Entry</span>
          <span style={{ fontFamily: 'var(--font-latin)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#b7b5fe' }}>Exit</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {traits.map((t) => (
            <div key={t.name} className="flex items-center gap-3">
              <div style={{ width: '112px', fontSize: '12px', fontWeight: 500, fontFamily: 'var(--font-latin)', color: '#0E0E12', flexShrink: 0 }}>{t.name}</div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 rounded-full overflow-hidden" style={{ height: '6px', backgroundColor: '#E8E8F0' }}>
                  <div className="h-full rounded-full" style={{ backgroundColor: 'rgba(183,181,254,0.30)', width: `${(t.entry/6)*100}%` }} />
                </div>
                <div className="flex-1 rounded-full overflow-hidden" style={{ height: '6px', backgroundColor: '#E8E8F0' }}>
                  <div className="h-full rounded-full" style={{ backgroundColor: '#b7b5fe', width: `${(t.exit/6)*100}%` }} />
                </div>
              </div>
              <div style={{ width: '48px', textAlign: 'right', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-latin)', flexShrink: 0 }}>
                <span style={{ color: 'rgba(14,14,18,0.35)' }}>{t.entry}</span>
                <span style={{ color: 'rgba(14,14,18,0.2)', margin: '0 3px' }}>→</span>
                <span style={{ color: '#b7b5fe' }}>{t.exit}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-2">
            <div style={{ width: '16px', height: '6px', borderRadius: '3px', backgroundColor: 'rgba(183,181,254,0.30)' }} />
            <span style={{ fontFamily: 'var(--font-latin)', fontSize: '11px', color: 'rgba(14,14,18,0.4)' }}>Entry</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: '16px', height: '6px', borderRadius: '3px', backgroundColor: '#b7b5fe' }} />
            <span style={{ fontFamily: 'var(--font-latin)', fontSize: '11px', color: 'rgba(14,14,18,0.4)' }}>Exit · 16 weeks</span>
          </div>
          <span style={{ fontFamily: 'var(--font-latin)', fontSize: '11px', color: 'rgba(14,14,18,0.3)', marginLeft: 'auto' }}>Scale 1–6</span>
        </div>
      </div>
    </div>
  )
}

// ─── LoopDiagram ──────────────────────────────────────────────
function LoopDiagram({ locale = 'en' }) {
  return (
    <div className="relative w-full max-w-sm mx-auto" style={{ aspectRatio: '1/1' }}>
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none"
        aria-label="The Loop: Read, Think, Speak, Write" role="img">
        <circle cx="200" cy="200" r="160" stroke="#b7b5fe" strokeWidth="1.5" opacity="0.2" />
        <circle cx="200" cy="200" r="145" stroke="#b7b5fe" strokeWidth="0.5" opacity="0.08" />
        <path d="M200 40 A160 160 0 0 1 360 200"  stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M360 200 A160 160 0 0 1 200 360" stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M200 360 A160 160 0 0 1 40 200"  stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M40 200 A160 160 0 0 1 200 40"   stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <circle cx="200" cy="40"  r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="200" y="37"  textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans,sans-serif">READ</text>
        {locale === 'zh' && <text x="200" y="53"  textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC,sans-serif">阅读</text>}
        <circle cx="360" cy="200" r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="360" y="197" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans,sans-serif">THINK</text>
        {locale === 'zh' && <text x="360" y="213" textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC,sans-serif">思考</text>}
        <circle cx="200" cy="360" r="36" fill="#F5F5FF" stroke="#F5C842" strokeWidth="2" />
        <text x="200" y="357" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans,sans-serif">SPEAK</text>
        {locale === 'zh' && <text x="200" y="373" textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC,sans-serif">表达</text>}
        <circle cx="40"  cy="200" r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="40"  y="197" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans,sans-serif">WRITE</text>
        {locale === 'zh' && <text x="40"  y="213" textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC,sans-serif">写作</text>}
        <text x="200" y="193" textAnchor="middle" fill="#0E0E12" fontSize="13" fontWeight="700" fontFamily="DM Sans,sans-serif" opacity="0.6">THE LOOP</text>
        {locale === 'zh' && <text x="200" y="210" textAnchor="middle" fill="#b7b5fe" fontSize="10" fontFamily="Noto Sans SC,sans-serif" opacity="0.5">学习闭环</text>}
      </svg>
    </div>
  )
}

// ─── AccordionItem ────────────────────────────────────────────
function AccordionItem({ question, answer, open, onToggle, id }) {
  return (
    <div className="rounded-lg" style={{
      backgroundColor: '#2E3848',
      borderLeft: open ? '2px solid #b7b5fe' : '2px solid transparent',
      transition: 'border-color 200ms',
    }}>
      <button id={`ab-${id}`} aria-expanded={open} aria-controls={`ap-${id}`} onClick={onToggle}
        className="w-full text-left flex items-start justify-between gap-4"
        style={{ fontFamily: 'var(--font-latin)', fontSize: '15px', fontWeight: 600, color: '#F0F0F0',
          lineHeight: 1.5, background: 'none', border: 'none', cursor: 'pointer', padding: '20px 24px' }}>
        <span style={{ flex: 1 }}>{question}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b7b5fe"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          style={{ flexShrink: 0, marginTop: '2px', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 220ms cubic-bezier(0.4,0,0.2,1)' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div id={`ap-${id}`} role="region" aria-labelledby={`ab-${id}`}
        style={{ overflow: 'hidden', maxHeight: open ? '600px' : '0px', transition: 'max-height 260ms cubic-bezier(0.4,0,0.2,1)' }}>
        <div style={{ fontFamily: 'var(--font-latin)', fontSize: '14px', fontWeight: 400,
          color: 'rgba(240,240,240,0.80)', lineHeight: 1.7, padding: '0 24px 20px' }}>
          {answer}
        </div>
      </div>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────
const TRAIT_DATA = [
  { name: 'Ideas',            entry: 2, exit: 4 },
  { name: 'Organisation',     entry: 3, exit: 5 },
  { name: 'Voice',            entry: 2, exit: 4 },
  { name: 'Word Choice',      entry: 3, exit: 4 },
  { name: 'Sentence Fluency', entry: 2, exit: 5 },
  { name: 'Conventions',      entry: 4, exit: 5 },
  { name: 'Presentation',     entry: 3, exit: 4 },
]

const SIX_TRAITS = [
  { name: 'Ideas',            def: 'The central message — what the student has to say and how clearly they say it' },
  { name: 'Organisation',     def: 'The internal structure — beginning, middle, end, and the logic that connects them' },
  { name: 'Voice',            def: 'The sense of a real person behind the words — the quality that makes writing unmistakably theirs' },
  { name: 'Word Choice',      def: 'The precision and energy of the specific words selected' },
  { name: 'Sentence Fluency', def: 'The rhythm and flow — how the writing sounds when read aloud' },
  { name: 'Conventions',      def: 'The mechanical correctness — spelling, punctuation, grammar' },
  { name: 'Presentation',     def: 'The final appearance — how the writing looks on the page' },
]

const ENTRANCE_STEPS = [
  {
    step: 'STEP 01', name: 'Lexile Reading Assessment',
    happens:  'Student reads calibrated texts at increasing complexity — not a race, a calibration.',
    admin:    'Navigator-administered · one session',
    produces: 'A precise Lexile baseline — one number that tells us exactly where the reading work begins.',
  },
  {
    step: 'STEP 02', name: '6+1 Trait Writing Snapshot',
    happens:  'Student writes a short response — unscored in the moment, unpressured by design.',
    admin:    'Navigator scores against all 7 traits',
    produces: 'A writing profile — which traits are strong, which need the most movement across 16 weeks.',
  },
  {
    step: 'STEP 03', name: 'Navigator Intake Conversation',
    happens:  'Navigator speaks with the student and parent — 15 minutes. Direct, specific, forward-facing.',
    admin:    'The matched Navigator',
    produces: 'A gap map — the distance between where the student is and where the 16 weeks will take them.',
  },
]

const EXIT_DETAILS = [
  { label: 'WHEN',             value: 'Week 16 — the final session of the program' },
  { label: 'WHAT IS MEASURED', value: 'Lexile re-measure + full 6+1 Trait re-evaluation across all 7 traits' },
  { label: 'WHO CONDUCTS IT',  value: 'The same Navigator who conducted the entrance assessment — no handoffs, no new faces' },
  { label: 'FORMAT',           value: 'Identical structure to the entrance assessment — familiar, not intimidating. The student has done this before.' },
]

const FAQ_ITEMS = [
  { q: 'Is the entrance assessment included in the enrollment fee?',
    a: 'Yes. The entrance assessment is included in every enrollment at no additional cost. It is the first step of the program, not an add-on.' },
  { q: "Can I see my child's assessment results in real time — or only at the end?",
    a: 'You receive three touchpoints: the entrance baseline immediately after week 1, a midpoint progress note at week 8, and the full results report at week 16. Real-time access is not provided because assessment is diagnostic, not ongoing monitoring.' },
  { q: "What happens if my child's Lexile score is lower than expected?",
    a: "The Lexile baseline tells us where to begin — not where your child is supposed to be. If the score is lower than expected, the Navigator calibrates The Loop to start at that level and targets the growth trajectory from there. Lower starting points often produce the most visible movement." },
  { q: "How is DODO's assessment different from what my child's school already measures?",
    a: "DODO uses the same frameworks — Lexile and 6+1 Traits — but applies them diagnostically at entry, midpoint, and exit. Most schools measure once or twice a year. DODO measures three times in 16 weeks, which makes course correction possible." },
  { q: 'Can my child take a standalone assessment without enrolling in the 16-week program?',
    a: "No. The entrance assessment is part of the program, not a standalone service. If you need a diagnostic Lexile measure only, we recommend contacting your child's school or a registered reading specialist." },
  { q: "What if my child has already had a Lexile assessment at school — do we repeat it?",
    a: "Yes. DODO conducts its own entrance assessment regardless of recent school measures. Lexile scores can shift within weeks, and the baseline must be current to the program start date." },
  { q: "Are assessment results shared with the child's school?",
    a: 'No. Assessment results belong to the parent and student. DODO does not share any results with schools unless the parent requests it in writing and provides explicit consent.' },
  { q: 'What age range do the assessments serve?',
    a: "The Lexile assessment serves students reading at or above Beginning Reader level, typically ages 7–16. The 6+1 Trait framework serves students who can produce written responses, typically ages 8–16." },
]

const NAV_H = 64

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_H - 24, behavior: 'smooth' })
}

// ─── Main export ──────────────────────────────────────────────
export default function AssessmentClient({ locale = 'en' }) {
  const [openFaq, setOpenFaq] = useState(null)
  const toggle = useCallback((i) => setOpenFaq((p) => (p === i ? null : i)), [])

  return (
    <div className="w-full overflow-hidden" style={{ fontFamily: 'var(--font-latin)' }}>

      {/* S1 HERO */}
      <section className="relative overflow-hidden px-6 py-24 md:py-32" style={{ backgroundColor: '#212830' }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          backgroundImage: 'radial-gradient(circle,#b7b5fe 1px,transparent 1px)',
          backgroundSize: '24px 24px', backgroundPosition: '0 66%', opacity: 0.05 }} />
        <div className="container-section relative z-10">
          <div className="max-w-3xl">
            <Eyebrow>Assessment at DODO</Eyebrow>
            <h1 className="mb-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700,
              fontSize: 'clamp(36px,5vw,64px)', color: '#F0F0F0', maxWidth: '740px',
              letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              We measure before we begin. We measure when it matters.{' '}
              <span style={{ color: '#b7b5fe' }}>We show you the numbers at the end.</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '17px',
              color: 'rgba(240,240,240,0.70)', maxWidth: '560px', lineHeight: 1.6, marginBottom: '0' }}>
              Two frameworks. One Lexile baseline. Seven writing traits. Measured at entry, week 8, and exit. Every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              {[
                { label: 'How assessment works',           anchor: 'entrance'       },
                { label: "Understand your child's results", anchor: 'results-anchor' },
                { label: 'What is a Lexile level?',        anchor: 'lexile'         },
              ].map((pill) => (
                <button key={pill.anchor} onClick={() => scrollToId(pill.anchor)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200"
                  style={{ fontFamily: 'var(--font-latin)', fontWeight: 500, fontSize: '13px',
                    color: '#b7b5fe', backgroundColor: 'transparent', border: '1.5px solid rgba(183,181,254,0.40)', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(183,181,254,0.80)'; e.currentTarget.style.backgroundColor = 'rgba(183,181,254,0.12)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(183,181,254,0.40)'; e.currentTarget.style.backgroundColor = 'transparent' }}>
                  {pill.label} <span style={{ color: 'rgba(183,181,254,0.60)', fontSize: '11px' }}>↓</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S2 WHY MEASUREMENT MATTERS */}
      <section className="px-6 py-24 md:py-28" style={{ backgroundColor: '#0E0E12' }}>
        <div className="container-section">
          <div className="text-center mb-12">
            <Eyebrow>The Philosophy</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '32px',
              color: '#F0F0F0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
              Three reasons DODO measures — when most programs guess.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
            {[
              { number: '01', heading: 'Measurement replaces guesswork',
                text: "Without a Lexile baseline, a Navigator is guessing. We don't guess — we start with the number." },
              { number: '02', heading: 'Numbers make growth legible',
                text: 'A parent who sees Lexile 590 → 790 understands something no report card can show them. The number is the story.' },
              { number: '03', heading: 'Assessment is ongoing, not occasional',
                text: "We don't wait 16 weeks to find out if it's working. We know at week 8 — and we correct if we need to." },
            ].map(({ number, heading, text }, i) => (
              <div key={number} className="px-0 md:px-8"
                style={i > 0 ? { borderLeft: '1px solid rgba(183,181,254,0.2)' } : undefined}>
                <div style={{ fontFamily: 'var(--font-latin)', fontSize: '11px', fontWeight: 300,
                  color: 'rgba(183,181,254,0.40)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>{number}</div>
                <h3 style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '21px', color: '#b7b5fe', marginBottom: '12px' }}>{heading}</h3>
                <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: 'rgba(240,240,240,0.70)', lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S3 ENTRANCE ASSESSMENT */}
      <section id="entrance" className="px-6 py-24 md:py-28" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="container-section">
          <div className="max-w-3xl mb-12">
            <Eyebrow>Entrance Assessment</Eyebrow>
            <h2 className="mb-3" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '32px',
              color: '#0E0E12', maxWidth: '640px', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
              Before we begin, we find out exactly where your child is.
            </h2>
            <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '17px', color: '#212830', maxWidth: '520px', lineHeight: 1.6 }}>
              Not where their school says they are. Where they actually are.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px pointer-events-none" aria-hidden="true"
              style={{ backgroundImage: 'linear-gradient(to right,rgba(183,181,254,0.3) 50%,transparent 50%)',
                backgroundSize: '16px 1px', zIndex: 0 }} />
            {ENTRANCE_STEPS.map((item) => (
              <div key={item.step} className="bg-white rounded-lg p-6 relative z-10"
                style={{ borderTop: '3px solid #b7b5fe', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ fontFamily: 'var(--font-latin)', fontSize: '11px', fontWeight: 300,
                  color: 'rgba(183,181,254,0.50)', textTransform: 'uppercase', marginBottom: '12px' }}>{item.step}</div>
                <h3 className="mb-3" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '18px', color: '#0E0E12' }}>{item.name}</h3>
                <p className="mb-3" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '14px', color: '#212830', lineHeight: 1.6 }}>{item.happens}</p>
                <p className="mb-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 500, fontSize: '13px', color: 'rgba(33,40,48,0.65)' }}>{item.admin}</p>
                <div style={{ borderTop: '1px solid rgba(183,181,254,0.20)', paddingTop: '16px' }}>
                  <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '14px', color: '#0E0E12', lineHeight: 1.5 }}>{item.produces}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S4 MIDPOINT CHECK */}
      <section className="px-6 py-24 md:py-28" style={{ backgroundColor: '#212830' }}>
        <div className="container-section">
          <div className="max-w-3xl mx-auto">
            <Eyebrow>Week 8</Eyebrow>
            <h2 className="mb-8" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '32px',
              color: '#F0F0F0', maxWidth: '600px', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
              We look at the numbers before the numbers are final.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {[
                "At week 8, the Navigator reviews the student's Lexile progress and their current 6+1 Trait scores against the entry baseline. Not a formal assessment — a check. The question is simple: is the Loop working at the right level?",
                'If a course correction is needed, the Navigator adjusts — the Lexile level of the texts, the specific traits being targeted in Write, the emphasis in Speak. The student rarely notices. The difference in the exit assessment does.',
                "The parent receives a midpoint progress note — not a full report, but a specific paragraph from the Navigator naming where the student is at week 8 and what the second half of the program is targeting.",
              ].map((text, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '16px', color: 'rgba(240,240,240,0.80)', lineHeight: 1.7 }}>{text}</p>
              ))}
            </div>
            <blockquote className="mt-8 pl-5" style={{ borderLeft: '3px solid #b7b5fe' }}>
              <p className="italic mb-3" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '18px', color: '#F0F0F0', lineHeight: 1.6 }}>
                Nothing in a DODO program drifts for 16 weeks without us noticing. The midpoint check exists because we don&rsquo;t trust time to do the work — we do.
              </p>
              <cite style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '13px', color: '#b7b5fe', fontStyle: 'normal' }}>DODO Learning</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* S5 EXIT ASSESSMENT */}
      <section id="results-anchor" className="px-6 py-24 md:py-28" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="container-section">
          <div className="mb-12">
            <Eyebrow>Exit Assessment + Results</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '32px',
              color: '#0E0E12', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
              Week 16. The numbers that show what the Loop produced.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="mb-6" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '18px', color: '#0E0E12' }}>The Assessment</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                {EXIT_DETAILS.map((item) => (
                  <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontFamily: 'var(--font-latin)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b7b5fe' }}>{item.label}</div>
                    <div style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: '#0E0E12', lineHeight: 1.7 }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '14px', color: 'rgba(33,40,48,0.70)', lineHeight: 1.6, fontStyle: 'italic' }}>
                The format is deliberate. A student who enters the exit assessment in familiar conditions performs at their true ceiling, not their anxiety floor.
              </p>
            </div>
            <div>
              <AssessmentReport lexileBefore={620} lexileAfter={820} traits={TRAIT_DATA} />
            </div>
          </div>
          <div className="text-center">
            <p className="max-w-xl mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '18px', color: '#0E0E12' }}>
              At the end of 16 weeks, we show you the numbers. Then you decide what comes next.
            </p>
          </div>
        </div>
      </section>

      {/* S6 WHAT IS A LEXILE LEVEL */}
      <section id="lexile" className="px-6 py-24 md:py-28" style={{ backgroundColor: '#0E0E12' }}>
        <div className="container-section">
          <div className="max-w-4xl mx-auto">
            <Eyebrow>Lexile Explained</Eyebrow>
            <h2 className="mb-12" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700,
              fontSize: 'clamp(30px,4vw,34px)', color: '#F0F0F0', maxWidth: '680px', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
              What is a Lexile level — and what does my child&rsquo;s score actually mean?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
              {[
                { heading: 'What Lexile is', content: 'A reading measure — not a grade, not a score. A number that describes both text complexity and reader ability on the same scale. A student at Lexile 720 can be expected to read a text at Lexile 720 with 75% comprehension.' },
                { heading: 'How the scale works', content: 'The scale runs from BR (Beginning Reader) through 1300+. Grade-level benchmarks: Lexile 420–620 = Grade 3. Lexile 620–820 = Grades 4–6. Lexile 820–1010 = Grades 7–8. Lexile 1010–1185 = Grades 9–10.' },
              ].map((b) => (
                <div key={b.heading}>
                  <h3 className="mb-2" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '16px', color: '#F0F0F0' }}>{b.heading}</h3>
                  <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: 'rgba(240,240,240,0.75)', lineHeight: 1.7 }}>{b.content}</p>
                </div>
              ))}
            </div>
            <div className="my-12"><LexileBar beforeScore={590} afterScore={790} dark /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                { heading: 'What a grade level of growth means', content: 'Approximately 100–150 Lexile points represents one grade level of reading growth. Lexile 590 to Lexile 790 is not just a number moving — it is a student crossing from Grade 4 territory into Grade 6 territory. That is the claim DODO makes, and the assessment is how we prove it.' },
                { heading: 'Why DODO uses it', content: "Lexile is the same measure North American schools use. It makes DODO's results directly comparable to what a parent sees on their child's school report — and directly comparable to grade-level reading expectations in the Canadian and US curricula." },
              ].map((b) => (
                <div key={b.heading}>
                  <h3 className="mb-2" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '16px', color: '#F0F0F0' }}>{b.heading}</h3>
                  <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: 'rgba(240,240,240,0.75)', lineHeight: 1.7 }}>{b.content}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/lexile" className="hover:underline underline-offset-4"
                style={{ fontFamily: 'var(--font-latin)', fontWeight: 500, fontSize: '14px', color: '#b7b5fe' }}>
                Read the full Lexile explainer →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* S7 6+1 TRAITS */}
      <section id="six-plus-one" className="px-6 py-24 md:py-28" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="container-section">
          <div className="max-w-4xl mx-auto">
            <Eyebrow>6+1 Traits Explained</Eyebrow>
            <h2 className="mb-12" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700,
              fontSize: 'clamp(30px,4vw,34px)', color: '#0E0E12', maxWidth: '680px', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
              What is the 6+1 Trait writing framework — and how does it score my child&rsquo;s writing?
            </h2>
            <div className="mb-8">
              <h3 className="mb-2" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '16px', color: '#0E0E12' }}>What it is</h3>
              <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: '#212830', lineHeight: 1.7 }}>
                A writing assessment framework used by North American schools and educators. Seven traits. Each scored 1–6. Developed by the Education Northwest — the same rubrics your child&rsquo;s teacher likely uses.
              </p>
            </div>
            <div className="mb-8">
              <h3 className="mb-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '16px', color: '#0E0E12' }}>The 7 traits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SIX_TRAITS.map(({ name, def }, idx) => (
                  <div key={name} className={idx >= 5 ? 'md:col-span-2 md:max-w-md' : ''}>
                    <div style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '14px', color: '#0E0E12', marginBottom: '4px' }}>{name}</div>
                    <div style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '14px', color: '#212830', lineHeight: 1.6 }}>{def}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h3 className="mb-2" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '16px', color: '#0E0E12' }}>What movement looks like</h3>
              <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: '#212830', lineHeight: 1.7 }}>
                A student who moves from 2 to 4 on Voice has not just improved their writing — they have found something worth saying and learned how to say it. A 6+1 Trait score tells the Navigator exactly which lever to move next.
              </p>
            </div>
            {/* Trait bars widget */}
            <div className="mb-8 max-w-2xl rounded-lg p-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)', backgroundColor: '#ffffff' }}>
              <div className="flex justify-between mb-4">
                <div style={{ fontFamily: 'var(--font-latin)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(33,40,48,0.50)' }}>Entry</div>
                <div style={{ fontFamily: 'var(--font-latin)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b7b5fe' }}>Exit</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {TRAIT_DATA.map((t) => (
                  <div key={t.name} className="flex items-center gap-3">
                    <div style={{ width: '112px', fontSize: '12px', fontWeight: 500, fontFamily: 'var(--font-latin)', color: '#0E0E12', flexShrink: 0 }}>{t.name}</div>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 rounded-full overflow-hidden" style={{ height: '6px', backgroundColor: '#E8E8F0' }}>
                        <div className="h-full rounded-full" style={{ backgroundColor: 'rgba(183,181,254,0.30)', width: `${(t.entry/6)*100}%` }} />
                      </div>
                      <div className="flex-1 rounded-full overflow-hidden" style={{ height: '6px', backgroundColor: '#E8E8F0' }}>
                        <div className="h-full rounded-full" style={{ backgroundColor: '#b7b5fe', width: `${(t.exit/6)*100}%` }} />
                      </div>
                    </div>
                    <div style={{ width: '56px', textAlign: 'right', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-latin)', flexShrink: 0 }}>
                      <span style={{ color: 'rgba(14,14,18,0.35)' }}>{t.entry}</span>
                      <span style={{ color: 'rgba(14,14,18,0.2)', margin: '0 3px' }}>→</span>
                      <span style={{ color: '#b7b5fe' }}>{t.exit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/methodology" className="hover:underline underline-offset-4"
              style={{ fontFamily: 'var(--font-latin)', fontWeight: 500, fontSize: '14px', color: '#b7b5fe' }}>
              See how The Loop builds each trait →
            </Link>
          </div>
        </div>
      </section>

      {/* S8 FAQ ACCORDION */}
      <section className="px-6 py-24 md:py-28" style={{ backgroundColor: '#212830' }}>
        <div className="container-section">
          <div className="max-w-3xl mx-auto">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mb-12" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '28px', color: '#F0F0F0', letterSpacing: '-0.02em' }}>
              What parents ask most about assessment — answered directly.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={i} id={`faq-${i}`} question={item.q} answer={item.a}
                  open={openFaq === i} onToggle={() => toggle(i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S9 ASSESSMENT INSIDE THE LOOP */}
      <section className="px-6 py-24 md:py-28" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="container-section">
          <div className="max-w-5xl mx-auto">
            <Eyebrow>Assessment + The Loop</Eyebrow>
            <h2 className="mb-12" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '28px', color: '#0E0E12', letterSpacing: '-0.02em' }}>
              Assessment is not outside the program. It is what makes the program measurable.
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div><LoopDiagram locale={locale} /></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  'The entrance assessment tells us where to begin in The Loop — which Lexile level to start the Read phase, which 6+1 Traits to prioritise in Write.',
                  'The week 8 check tells us if The Loop is working at the right level — if the Lexile texts need to move up, if the writing traits are tracking the expected trajectory.',
                  'The exit assessment tells us what The Loop produced — the specific Lexile movement, the specific trait progression, the specific evidence that the 16 weeks did what they were designed to do.',
                ].map((text, i) => (
                  <p key={i} style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: '#212830', lineHeight: 1.7 }}>{text}</p>
                ))}
                <div style={{ paddingTop: '16px' }}>
                  <Link href="/methodology" className="hover:underline underline-offset-4"
                    style={{ fontFamily: 'var(--font-latin)', fontWeight: 500, fontSize: '14px', color: '#b7b5fe' }}>
                    See the full methodology →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S10 CLOSING CTA */}
      <section className="px-6 py-24 md:py-32 text-center" style={{ backgroundColor: '#0E0E12' }}>
        <div className="container-section">
          <div className="max-w-2xl mx-auto">
            <h2 className="mb-4 max-w-[560px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '32px', color: '#b7b5fe', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
              The first number is free.
            </h2>
            <p className="mb-8 max-w-[500px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '16px', color: 'rgba(240,240,240,0.70)', lineHeight: 1.6 }}>
              The entrance assessment is included in every enrollment. Book a diagnostic call — and we will tell you what your child&rsquo;s first number is likely to look like before you commit to anything.
            </p>
            <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
              <Link href="/consult" className="w-full inline-flex items-center justify-center rounded-lg transition-all hover:opacity-90"
                style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '16px',
                  backgroundColor: '#F5C842', color: '#0E0E12', padding: '16px 32px', textDecoration: 'none' }}>
                Book a Diagnostic Call
              </Link>
              <Link href="/program" className="w-full inline-flex items-center justify-center rounded-lg transition-all hover:border-white"
                style={{ fontFamily: 'var(--font-latin)', fontWeight: 500, fontSize: '16px',
                  backgroundColor: 'transparent', color: '#F0F0F0', border: '1.5px solid rgba(240,240,240,0.50)',
                  padding: '14px 32px', textDecoration: 'none' }}>
                See the Full Program
              </Link>
              <Link href="/lexile" className="mt-2 hover:underline underline-offset-4"
                style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '14px', color: '#b7b5fe' }}>
                Read the full Lexile explainer →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}