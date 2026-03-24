// app/[locale]/the-hangar/page.jsx
//
// Pure server component — no 'use client', zero external dependencies.
// Bilingual EN + ZH — all text driven from COPY object below.
//
// Hero bg: /public/thehangar-book-bg.jpeg (local)
//   objectPosition: '70% center' — anchors book detail to right.
//   Single unified overlay (no separate mobile/desktop divs) for
//   consistent rendering across all breakpoints.
//   Opacity reduced 15% from original: 0.72 → 0.47 → 0.26 gradient.
//
// Hero layout: matches program/page.jsx and homepage —
//   section has no horizontal padding; container-section on content div.

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const meta = (COPY[locale] ?? COPY.en).meta
  return buildMetadata({ locale, title: meta.title, description: meta.description, path: '/the-hangar' })
}

// ─────────────────────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────────────────────
function Eyebrow({ children, center = false, dark = false }) {
  return (
    <div style={{ fontFamily: 'var(--font-latin)', fontWeight: 500, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: dark ? '#b7b5fe' : '#5856cc', marginBottom: '16px', textAlign: center ? 'center' : undefined }}>
      {children}
    </div>
  )
}

function StudentVoiceCard({ quote, grade, city, weeksInProgram, hangarDetail }) {
  return (
    <div className="rounded-2xl" style={{ backgroundColor: '#2E3848', border: '1px solid rgba(183,181,254,0.10)', padding: '32px' }}>
      <div aria-hidden="true" style={{ fontFamily: 'var(--font-latin)', fontSize: '48px', fontWeight: 700, color: '#b7b5fe', opacity: 0.25, lineHeight: 1, marginBottom: '12px' }}>&ldquo;</div>
      <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 300, fontSize: '16px', fontStyle: 'italic', color: '#F0F0F0', lineHeight: 1.7, marginBottom: '24px' }}>{quote}</p>
      <div className="flex items-center gap-2" style={{ fontFamily: 'var(--font-latin)', fontSize: '13px', fontWeight: 600, color: '#b7b5fe', marginBottom: '8px' }}>
        <span>{grade}</span><span style={{ opacity: 0.4 }}>·</span><span>{city}</span><span style={{ opacity: 0.4 }}>·</span>
        <span style={{ fontWeight: 400, color: 'rgba(240,240,240,0.5)' }}>{weeksInProgram}</span>
      </div>
      {hangarDetail && <p style={{ fontFamily: 'var(--font-latin)', fontSize: '12px', fontWeight: 400, fontStyle: 'italic', color: 'rgba(183,181,254,0.45)', lineHeight: 1.5 }}>{hangarDetail}</p>}
    </div>
  )
}

function LoopDiagram({ locale = 'en' }) {
  return (
    <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: '1 / 1' }}>
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" aria-label="The Loop: Read, Think, Speak, Write" role="img">
        <circle cx="200" cy="200" r="160" stroke="#b7b5fe" strokeWidth="1.5" opacity="0.2" />
        <circle cx="200" cy="200" r="145" stroke="#b7b5fe" strokeWidth="0.5" opacity="0.08" />
        <path d="M200 40 A160 160 0 0 1 360 200"  stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M360 200 A160 160 0 0 1 200 360" stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M200 360 A160 160 0 0 1 40 200"  stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M40 200 A160 160 0 0 1 200 40"   stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <circle cx="200" cy="40"  r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="200" y="37"  textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">READ</text>
        {locale === 'zh' && <text x="200" y="53"  textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC, sans-serif">\u9605\u8bfb</text>}
        <circle cx="360" cy="200" r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="360" y="197" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">THINK</text>
        {locale === 'zh' && <text x="360" y="213" textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC, sans-serif">\u601d\u8003</text>}
        <circle cx="200" cy="360" r="36" fill="#F5F5FF" stroke="#F5C842" strokeWidth="2" />
        <text x="200" y="357" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">SPEAK</text>
        {locale === 'zh' && <text x="200" y="373" textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC, sans-serif">\u8868\u8fbe</text>}
        <circle cx="40"  cy="200" r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="40"  y="197" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">WRITE</text>
        {locale === 'zh' && <text x="40"  y="213" textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC, sans-serif">\u5199\u4f5c</text>}
        <text x="200" y="193" textAnchor="middle" fill="#0E0E12" fontSize="13" fontWeight="700" fontFamily="DM Sans, sans-serif" opacity="0.6">THE LOOP</text>
        {locale === 'zh' && <text x="200" y="210" textAnchor="middle" fill="#b7b5fe" fontSize="10" fontFamily="Noto Sans SC, sans-serif" opacity="0.5">\u5b66\u4e60\u95ed\u73af</text>}
      </svg>
    </div>
  )
}

const BG = { dark: '#212830', 'void-black': '#0E0E12', whisper: '#F5F5FF' }

function Section({ bg = 'dark', className = '', children, id }) {
  return (
    <section id={id} className={`px-6 py-24 md:py-32 ${className}`} style={{ backgroundColor: BG[bg] }}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// BILINGUAL CONTENT
// ─────────────────────────────────────────────────────────────
const COPY = {
  en: {
    meta: {
      title:       'What Is The Hangar? Navigator-Supported Community Between DODO Sessions \u2014 DODO Learning',
      description: 'The Hangar is the Navigator-supported study community included in every DODO 16-Week Program enrollment \u2014 for Chinese families in Canada and the US. Where The Loop becomes a habit between sessions. Not homework help. The environment.',
    },
    s1: {
      eyebrow: 'The Hangar',
      h1a:     'What keeps a bilingual thinking program\u00a0',
      h1b:     'working between sessions?',
      h1c:     '',
      sub:     'Not homework help. Not a study hall. For Chinese families in Canada and the US \u2014 The Hangar is the Navigator-supported community where The Loop becomes a habit.',
    },
    s2: {
      pull:     'The Hangar is not where students go when they are stuck. It is where students go when they are\u00a0',
      pullSpan: 'ready to go further',
      pullEnd:  '.',
    },
    s3: {
      eyebrow: 'What It Is',
      h2:      "Three things The Hangar is \u2014 that nothing else in your child\u2019s week is.",
      cols: [
        { question: 'What actually happens here?',  title: 'Navigator-supported sessions',    body: 'Structured, not supervised. A Navigator poses the question \u2014 students do the thinking. Nothing is passive.' },
        { question: 'Who else is in The Hangar?',   title: 'A cohort at the same Loop stage', body: 'Every student in the room is navigating two languages and the same phase of The Loop. The shared context is the point.' },
        { question: 'What does it produce?',         title: 'Between-session momentum',        body: 'The Hangar is what turns 16 weeks into a system instead of a schedule. It is where the compounding begins.' },
      ],
    },
    s4: {
      eyebrow:         'The Methodology',
      h2:              'The Loop runs in sessions. The Hangar keeps it running between them.',
      caption:         'A student who only works The Loop during sessions will plateau at the pace of one session per week. A student who lives inside The Hangar between sessions compounds. The Loop becomes instinct, not instruction.',
      methodologyLink: 'Read the full methodology \u2192',
    },
    s5: {
      eyebrow:      'From the Founder',
      h2:           'Why The Hangar exists \u2014 and why nothing else does what it does.',
      sub:          'Unscripted. Eight minutes. The concept in full.',
      founderName:  'Sarah Chen \u2014 Founder & Lead Navigator',
      founderNote:  'Video embed \u2014 replace with production URL',
    },
    s6: {
      eyebrow:        'Navigator Presence',
      h2:             'The same Navigator. In The Hangar. Knowing exactly where your child is.',
      points: [
        { label: 'Same Navigator',      body: "The Navigator in The Hangar is not a moderator or a support assistant. It is the same Navigator from your child\u2019s session \u2014 with the same Lexile baseline, the same 6+1 Trait profile, the same session notes." },
        { label: 'Calibrated feedback', body: "Every comment in The Hangar references where that specific student is in The Loop. Not generic encouragement \u2014 a named trait, a specific score, a precise next move." },
        { label: 'Not generic',         body: "A Navigator does not copy and paste feedback. When they respond to a student\u2019s writing draft in The Hangar, they are responding to that draft \u2014 the specific sentence that needs to move, the specific score that changes if it does." },
        { label: 'Response time',       body: 'Hangar responses are delivered within 6 hours on session days and 12 hours on off days.' },
      ],
      navigatorsLink: 'Meet the Navigators \u2192',
    },
    s7: {
      eyebrow: 'The Cohort',
      h2:      "Who else is in The Hangar \u2014 and why it matters that they\u2019re there.",
      cols: [
        { num: '01', title: 'Same stage, not same age',     body: 'Cohorts are grouped by Loop phase and Lexile level \u2014 not by school year. A Grade 5 and a Grade 7 student at the same Lexile are in the same conversation.' },
        { num: '02', title: 'Bilingual by design',          body: 'Every student in the cohort is navigating two languages simultaneously. The shared experience is not incidental \u2014 it is the foundation of what they build together.' },
        { num: '03', title: 'Belonging before performance', body: 'The Hangar is not a place to prove yourself. It is a place to build yourself \u2014 in a room where everyone else is doing the same thing, in the same two languages.' },
      ],
    },
    s8: {
      eyebrow: 'Student Voice',
      h2:      'In their words \u2014 not ours.',
      voices: [
        {
          quote:  "I used to think I had to wait until my session to ask questions. Now I post my draft in The Hangar and get feedback before the session even starts. It\u2019s like having an extra session every week except it\u2019s on my schedule.",
          grade:  'Grade 6',
          city:   'Vancouver',
          weeks:  '8 weeks in program',
          detail: 'Lexile 640 \u2192 720 at week 8 midpoint \u00b7 6+1 Ideas: 2 \u2192 4 \u00b7 Draft posted at 10pm, calibrated feedback by morning',
        },
        {
          quote:  "There\u2019s this kid in my cohort who\u2019s in Grade 9 but we\u2019re at the same Lexile. We both struggle with the same stuff and help each other. Nobody at my school gets what it\u2019s like doing this in two languages.",
          grade:  'Grade 7',
          city:   'Markham',
          weeks:  '12 weeks in program',
          detail: 'Lexile 710 \u2192 870 at week 12 \u00b7 6+1 Voice: 2 \u2192 4 \u00b7 Peer review exchange between sessions',
        },
      ],
    },
    s9: {
      h2:           'The Hangar is included in every 16-Week Program enrollment. It is not an add-on. It is the environment.',
      sub:          'When your child enrolls in The 16-Week Program, The Hangar is where the program lives between sessions. One Navigator. One cohort. One continuous loop.',
      ctaPrimary:   'Book a Diagnostic Call',
      ctaSecondary: 'See the Full Program',
      note:         'The Hangar is included in every 16-Week Program enrollment. It is not an add-on.',
    },
  },

  zh: {
    meta: {
      title:       'The Hangar\u662f\u4ec0\u4e48\uff1f\u8bfe\u7a0b\u95f4\u9694\u7684Navigator\u652f\u6301\u793e\u533a \u2014 DODO Learning',
      description: 'The Hangar\u662f\u6bcf\u4e2a16\u5468\u9879\u76ee\u6240\u5305\u542b\u7684Navigator\u652f\u6301\u5b66\u4e60\u793e\u533a\u2014\u2014\u9762\u5411\u52a0\u62ff\u5927\u548c\u7f8e\u56fd\u7684\u534e\u8bed\u5bb6\u5ead\u3002The Loop\u5728\u8bfe\u7a0b\u4e4b\u95f4\u6301\u7eed\u8fd0\u884c\u7684\u5730\u65b9\u3002\u4e0d\u662f\u4f5c\u4e1a\u8f85\u5bfc\u2014\u2014\u800c\u662f\u5b66\u4e60\u73af\u5883\u672c\u8eab\u3002',
    },
    s1: {
      eyebrow: 'The Hangar',
      h1a:     '\u4ec0\u4e48\u8ba9\u53cc\u8bed\u601d\u7ef4\u8bfe\u7a0b\u5728\u00a0',
      h1b:     '\u8bfe\u7a0b\u4e4b\u95f4\u6301\u7eed\u8fd0\u8f6c\uff1f',
      h1c:     '',
      sub:     '\u4e0d\u662f\u4f5c\u4e1a\u8f85\u5bfc\uff0c\u4e0d\u662f\u81ea\u4e60\u5ba4\u3002\u9762\u5411\u52a0\u62ff\u5927\u548c\u7f8e\u56fd\u7684\u534e\u8bed\u5bb6\u5ead\u2014\u2014The Hangar\u662f\u7531Navigator\u652f\u6301\u7684\u793e\u533a\uff0c\u8ba9The Loop\u6210\u4e3a\u4e60\u60ef\u3002',
    },
    s2: {
      pull:     'The Hangar\u4e0d\u662f\u5b66\u751f\u9047\u5230\u56f0\u96be\u65f6\u53bb\u7684\u5730\u65b9\u3002\u5b83\u662f\u5b66\u751f\u00a0',
      pullSpan: '\u51c6\u5907\u597d\u8d70\u5f97\u66f4\u8fdc\u65f6',
      pullEnd:  '\u00a0\u53bb\u7684\u5730\u65b9\u3002',
    },
    s3: {
      eyebrow: '\u5b83\u662f\u4ec0\u4e48',
      h2:      'The Hangar\u62e5\u6709\u4e09\u79cd\u7279\u8d28\u2014\u2014\u60a8\u5b69\u5b50\u4e00\u5468\u4e2d\u7684\u5176\u4ed6\u4efb\u4f55\u5730\u65b9\u90fd\u6ca1\u6709\u3002',
      cols: [
        { question: '\u8fd9\u91cc\u5b9e\u9645\u4e0a\u53d1\u751f\u4ec0\u4e48\uff1f',  title: 'Navigator\u652f\u6301\u7684\u5b66\u4e60',   body: '\u6709\u7ed3\u6784\uff0c\u800c\u975e\u76d1\u7763\u3002Navigator\u63d0\u51fa\u95ee\u9898\u2014\u2014\u5b66\u751f\u5b8c\u6210\u601d\u8003\u3002\u6ca1\u6709\u88ab\u52a8\u73af\u8282\u3002' },
        { question: 'The Hangar\u91cc\u8fd8\u6709\u8c01\uff1f',                       title: '\u5904\u4e8e\u540c\u4e00Loop\u9636\u6bb5\u7684\u540c\u4f34', body: '\u623f\u95f4\u91cc\u7684\u6bcf\u4f4d\u5b66\u751f\u90fd\u5728\u540c\u65f6\u9a7e\u9a6d\u4e24\u79cd\u8bed\u8a00\uff0c\u5e76\u5904\u4e8eThe Loop\u7684\u540c\u4e00\u9636\u6bb5\u3002\u5171\u540c\u7684\u80cc\u666f\u5c31\u662f\u610f\u4e49\u6240\u5728\u3002' },
        { question: '\u5b83\u80fd\u4ea7\u751f\u4ec0\u4e48\uff1f',                     title: '\u8bfe\u7a0b\u95f4\u7684\u6301\u7eed\u52a8\u529b',       body: 'The Hangar\u5c06\u516816\u5468\u53d8\u6210\u4e00\u4e2a\u7cfb\u7edf\uff0c\u800c\u975e\u4e00\u4e2a\u65e5\u7a0b\u8868\u3002\u590d\u5229\u5c31\u4ece\u8fd9\u91cc\u5f00\u59cb\u3002' },
      ],
    },
    s4: {
      eyebrow:         '\u6559\u5b66\u65b9\u6cd5',
      h2:              'The Loop\u5728\u8bfe\u7a0b\u4e2d\u8fd0\u884c\u3002The Hangar\u8ba9\u5b83\u5728\u8bfe\u7a0b\u4e4b\u95f4\u6301\u7eed\u8fd0\u884c\u3002',
      caption:         '\u53ea\u5728\u8bfe\u7a0b\u671f\u95f4\u8fdb\u884cThe Loop\u7684\u5b66\u751f\uff0c\u4f1a\u4ee5\u6bcf\u5468\u4e00\u8282\u8bfe\u7684\u8282\u594f\u505c\u6ede\u4e0d\u524d\u3002\u800c\u6d3b\u8dc3\u5728The Hangar\u4e2d\u7684\u5b66\u751f\u5219\u4f1a\u5b9e\u73b0\u590d\u5229\u589e\u957f\u3002The Loop\u4ece\u6307\u4ee4\u53d8\u6210\u672c\u80fd\u3002',
      methodologyLink: '\u9605\u8bfb\u5b8c\u6574\u6559\u5b66\u65b9\u6cd5 \u2192',
    },
    s5: {
      eyebrow:     '\u521b\u59cb\u4eba\u8bf4',
      h2:          'The Hangar\u4e3a\u4f55\u5b58\u5728\u2014\u2014\u4ee5\u53ca\u4e3a\u4ec0\u4e48\u6ca1\u6709\u5176\u4ed6\u4e8b\u7269\u80fd\u505a\u5230\u5b83\u6240\u505a\u7684\u3002',
      sub:         '\u65e0\u811a\u672c\u3002\u516b\u5206\u949f\u3002\u5b8c\u6574\u9610\u8ff0\u8fd9\u4e2a\u6982\u5ff5\u3002',
      founderName: 'Sarah Chen \u2014 \u521b\u59cb\u4eba & \u9996\u5e2dNavigator',
      founderNote: '\u89c6\u9891\u94fe\u63a5\u2014\u2014\u8bf7\u66ff\u6362\u4e3a\u6b63\u5f0fURL',
    },
    s6: {
      eyebrow: 'Navigator\u7684\u5b58\u5728',
      h2:      '\u540c\u4e00\u4f4d Navigator\u3002\u5728The Hangar\u4e2d\u3002\u786e\u5207\u77e5\u9053\u60a8\u7684\u5b69\u5b50\u5728\u54ea\u91cc\u3002',
      points: [
        { label: '\u540c\u4e00\u4f4dNavigator', body: 'The Hangar\u4e2d\u7684Navigator\u4e0d\u662f\u4e3b\u6301\u4eba\u6216\u652f\u6301\u52a9\u624b\u3002\u4ed6\u662f\u60a8\u5b69\u5b50\u8bfe\u7a0b\u4e2d\u7684\u540c\u4e00\u4f4dNavigator\u2014\u2014\u5e26\u7740\u76f8\u540c\u7684Lexile\u57fa\u7ebf\u3001\u76f8\u540c\u76846+1\u7279\u8d28\u6863\u6848\u3001\u76f8\u540c\u7684\u8bfe\u7a0b\u7b14\u8bb0\u3002' },
        { label: '\u6709\u9488\u5bf9\u6027\u7684\u53cd\u9988', body: 'The Hangar\u4e2d\u7684\u6bcf\u6761\u8bc4\u8bba\u90fd\u6307\u5411\u8be5\u5b66\u751f\u5728The Loop\u4e2d\u7684\u5177\u4f53\u4f4d\u7f6e\u3002\u4e0d\u662f\u6cdb\u6cdb\u7684\u9f13\u52b1\u2014\u2014\u800c\u662f\u5177\u540d\u7684\u7279\u8d28\u3001\u5177\u4f53\u7684\u5206\u6570\u3001\u7cbe\u51c6\u7684\u4e0b\u4e00\u6b65\u3002' },
        { label: '\u975e\u6a21\u677f\u5316',       body: 'Navigator\u4e0d\u4f1a\u590d\u5236\u7c98\u8d34\u53cd\u9988\u3002\u5f53\u4ed6\u4eec\u5728The Hangar\u4e2d\u56de\u5e94\u5b66\u751f\u7684\u5199\u4f5c\u8349\u7a3f\u65f6\uff0c\u4ed6\u4eec\u5728\u56de\u5e94\u90a3\u4efd\u5177\u4f53\u7684\u8349\u7a3f\u2014\u2014\u9700\u8981\u6539\u52a8\u7684\u90a3\u4e2a\u5177\u4f53\u53e5\u5b50\uff0c\u4ee5\u53ca\u6539\u52a8\u540e\u4f1a\u53d8\u5316\u7684\u90a3\u4e2a\u5177\u4f53\u5206\u6570\u3002' },
        { label: '\u54cd\u5e94\u65f6\u95f4',       body: '\u5728\u8bfe\u7a0b\u5f53\u5929\uff0cHangar\u7684\u53cd\u9988\u57286\u5c0f\u65f6\u5185\u9001\u8fbe\uff1b\u975e\u8bfe\u7a0b\u65e5\u5219\u572812\u5c0f\u65f6\u5185\u3002' },
      ],
      navigatorsLink: '\u8ba4\u8bc6\u5bfc\u5e08\u56e2\u961f \u2192',
    },
    s7: {
      eyebrow: '\u540c\u4f34\u7fa4\u4f53',
      h2:      'The Hangar\u91cc\u8fd8\u6709\u8c01\u2014\u2014\u4ee5\u53ca\u4ed6\u4eec\u5728\u573a\u4e3a\u4ec0\u4e48\u91cd\u8981\u3002',
      cols: [
        { num: '01', title: '\u540c\u4e00\u9636\u6bb5\uff0c\u800c\u975e\u540c\u4e00\u5e74\u9f84', body: '\u540c\u4f34\u7fa4\u4f53\u6309Loop\u9636\u6bb5\u548cLexile\u6c34\u5e73\u5206\u7ec4\u2014\u2014\u800c\u975e\u6309\u5b66\u5e74\u3002\u4e94\u5e74\u7ea7\u548c\u4e03\u5e74\u7ea7\u7684\u5b66\u751f\u5982\u679cLexile\u76f8\u540c\uff0c\u5c31\u5728\u540c\u4e00\u6bb5\u5bf9\u8bdd\u4e2d\u3002' },
        { num: '02', title: '\u53cc\u8bed\u7531\u8bbe\u8ba1\u800c\u751f',         body: '\u7fa4\u4f53\u4e2d\u7684\u6bcf\u4f4d\u5b66\u751f\u90fd\u5728\u540c\u65f6\u9a7e\u9a6d\u4e24\u79cd\u8bed\u8a00\u3002\u8fd9\u79cd\u5171\u540c\u7ecf\u5386\u5e76\u975e\u5076\u7136\u2014\u2014\u5b83\u662f\u4ed6\u4eec\u5171\u540c\u6784\u5efa\u7684\u57fa\u7840\u3002' },
        { num: '03', title: '\u5f52\u5c5e\u611f\u5148\u4e8e\u8868\u73b0',         body: 'The Hangar\u4e0d\u662f\u4e00\u4e2a\u8bc1\u660e\u81ea\u5df1\u7684\u5730\u65b9\u3002\u5b83\u662f\u4e00\u4e2a\u5efa\u6784\u81ea\u5df1\u7684\u5730\u65b9\u2014\u2014\u5728\u4e00\u4e2a\u6240\u6709\u4eba\u90fd\u5728\u505a\u540c\u6837\u7684\u4e8b\u3001\u7528\u540c\u6837\u4e24\u79cd\u8bed\u8a00\u7684\u623f\u95f4\u91cc\u3002' },
      ],
    },
    s8: {
      eyebrow: '\u5b66\u751f\u7684\u58f0\u97f3',
      h2:      '\u7528\u4ed6\u4eec\u81ea\u5df1\u7684\u8bdd\u2014\u2014\u4e0d\u662f\u6211\u4eec\u7684\u3002',
      voices: [
        {
          quote:  '\u6211\u4ee5\u524d\u4ee5\u4e3a\u5fc5\u987b\u7b49\u5230\u8bfe\u7a0b\u624d\u80fd\u63d0\u95ee\u3002\u73b0\u5728\u6211\u628a\u8349\u7a3f\u53d1\u5230The Hangar\uff0c\u8bfe\u7a0b\u5f00\u59cb\u4e4b\u524d\u5c31\u80fd\u6536\u5230\u53cd\u9988\u3002\u5c31\u50cf\u6bcf\u5468\u591a\u4e86\u4e00\u8282\u8bfe\uff0c\u53ea\u662f\u6309\u6211\u81ea\u5df1\u7684\u65f6\u95f4\u5b89\u6392\u3002',
          grade:  '\u516d\u5e74\u7ea7',
          city:   '\u6e29\u54e5\u534e',
          weeks:  '\u5df2\u5b8c\u6210\u7b2c8\u5468',
          detail: 'Lexile 640 \u2192 720\uff08\u7b2c8\u5468\u4e2d\u671f\u6d4b\u8bc4\uff09\u00b76+1\u60f3\u6cd5\uff1a2\u21924\u00b7\u665a10\u70b9\u53d1\u5e03\u8349\u7a3f\uff0c\u6e05\u6668\u6536\u5230\u9488\u5bf9\u6027\u53cd\u9988',
        },
        {
          quote:  '\u6211\u7684\u7fa4\u4f53\u91cc\u6709\u4e2a\u4e5d\u5e74\u7ea7\u7684\u5b66\u751f\uff0c\u4f46\u6211\u4eecLexile\u76f8\u540c\u3002\u6211\u4eec\u5728\u540c\u6837\u7684\u5730\u65b9\u632a\u624e\uff0c\u4e92\u76f8\u5e2e\u52a9\u3002\u6211\u5b66\u6821\u91cc\u6ca1\u6709\u4eba\u80fd\u7406\u89e3\u7528\u4e24\u79cd\u8bed\u8a00\u5b66\u4e60\u662f\u4ec0\u4e48\u611f\u89c9\u3002',
          grade:  '\u4e03\u5e74\u7ea7',
          city:   '\u4e07\u9526\u5e02',
          weeks:  '\u5df2\u5b8c\u6210\u7b2c12\u5468',
          detail: 'Lexile 710 \u2192 870\uff08\u7b2c12\u5468\uff09\u00b76+1\u58f0\u97f3\uff1a2\u21924\u00b7\u8bfe\u7a0b\u95f4\u9694\u53c2\u4e0e\u4e86The Hangar\u4e2d\u7684\u540c\u4f34\u4e92\u8bc4',
        },
      ],
    },
    s9: {
      h2:           'The Hangar\u5305\u542b\u5728\u6bcf\u4e00\u987916\u5468\u9879\u76ee\u6ce8\u518c\u4e2d\u3002\u5b83\u4e0d\u662f\u9644\u52a0\u9879\u76ee\u3002\u5b83\u662f\u5b66\u4e60\u73af\u5883\u672c\u8eab\u3002',
      sub:          '\u5f53\u60a8\u7684\u5b69\u5b50\u6ce8\u518c16\u5468\u9879\u76ee\u65f6\uff0cThe Hangar\u5c31\u662f\u8bfe\u7a0b\u4e4b\u95f4\u9879\u76ee\u6240\u5728\u7684\u5730\u65b9\u3002\u4e00\u4f4dNavigator\u3002\u4e00\u4e2a\u540c\u4f34\u7fa4\u4f53\u3002\u4e00\u4e2a\u6301\u7eed\u7684\u95ed\u73af\u3002',
      ctaPrimary:   '\u9884\u7ea6\u8bfa\u65ad\u548c\u8be2',
      ctaSecondary: '\u67e5\u770b\u5b8c\u6574\u9879\u76ee',
      note:         'The Hangar\u5305\u542b\u5728\u6bcf\u4e00\u9879 16\u5468\u9879\u76ee\u6ce8\u518c\u4e2d\u3002\u5b83\u4e0d\u662f\u9644\u52a0\u9879\u76ee\u3002',
    },
  },
}

export function generateStaticParams() {
  return localeParams()
}

export default async function TheHangarPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en

  return (
    <div className="w-full overflow-hidden" style={{ fontFamily: 'var(--font-latin)' }}>

      {/* ─────────────────────────────────────────────────────
          S1 HERO
          ───────────────────────────────────────────────────── */}
      <section
        className="relative flex items-center"
        style={{
          backgroundColor: '#212830',
          minHeight:       '100dvh',
          paddingTop:      'calc(var(--nav-height) + 3.5rem)',
          paddingBottom:   '5rem',
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/thehangar-book-bg.jpeg"
            alt=""
            aria-hidden="true"
            style={{
              width:          '100%',
              height:         '100%',
              objectFit:      'cover',
              objectPosition: '70% center',
              display:        'block',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position:   'absolute',
              inset:      0,
              background: 'linear-gradient(to right, rgba(14,14,18,0.72) 0%, rgba(14,14,18,0.47) 50%, rgba(14,14,18,0.26) 100%)',
            }}
          />
        </div>

        <div className="container-section relative z-10">
          <div style={{ maxWidth: '700px' }}>
            <Eyebrow dark>{c.s1.eyebrow}</Eyebrow>
            <h1
              className="mb-6"
              style={{
                fontFamily:    'var(--font-latin)',
                fontWeight:    700,
                fontSize:      'clamp(38px, 5vw, 68px)',
                lineHeight:    1.2,
                color:         '#F0F0F0',
                letterSpacing: '-0.03em',
                textWrap:      'balance',
              }}
            >
              {c.s1.h1a}<span style={{ color: '#b7b5fe' }}>{c.s1.h1b}</span>{c.s1.h1c}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-latin)',
                fontWeight: 400,
                fontSize:   '18px',
                lineHeight: 1.6,
                color:      'rgba(240,240,240,0.75)',
                maxWidth:   '520px',
              }}
            >
              {c.s1.sub}
            </p>
          </div>
        </div>
      </section>

      {/* S2 THE ONE REFRAME */}
      <section className="px-6 py-24 md:py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-center max-w-[860px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(26px, 4vw, 48px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.025em' }}>
            {c.s2.pull}<span style={{ color: '#b7b5fe' }}>{c.s2.pullSpan}</span>{c.s2.pullEnd}
          </p>
        </div>
      </section>

      {/* S3 WHAT THE HANGAR IS */}
      <Section bg="dark">
        <div className="text-center mb-16">
          <Eyebrow dark center>{c.s3.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 42px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s3.h2}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {c.s3.cols.map(({ question, title, body }, i) => (
            <div key={title} className="px-0 md:px-8" style={i > 0 ? { borderLeft: '1px solid rgba(183,181,254,0.2)' } : undefined}>
              <div className="mb-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '13px', fontStyle: 'italic', color: 'rgba(240,240,240,0.45)' }}>{question}</div>
              <h3 className="mb-3" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '22px', color: '#b7b5fe' }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: 'rgba(240,240,240,0.70)', lineHeight: 1.6 }}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* S4 INSIDE THE LOOP — adds methodology link */}
      <Section bg="whisper">
        <div className="text-center mb-8">
          <Eyebrow center>{c.s4.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl mx-auto mb-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 42px)', color: '#0E0E12', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s4.h2}</h2>
        </div>
        <LoopDiagram locale={locale} />
        <div className="text-center mt-8">
          <p className="max-w-[640px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '16px', color: '#212830', lineHeight: 1.7 }}>{c.s4.caption}</p>
          {/* Methodology link — new */}
          <div style={{ marginTop: '1.25rem' }}>
            <Link
              href={`/${locale}/methodology`}
              style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '14px', color: '#5856cc', textDecoration: 'none' }}
            >
              {c.s4.methodologyLink}
            </Link>
          </div>
        </div>
      </Section>

      {/* S5 FOUNDER VIDEO */}
      <section className="px-6 py-24 md:py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow dark center>{c.s5.eyebrow}</Eyebrow>
            <h2 className="max-w-[640px] mx-auto mb-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: 'clamp(22px, 3vw, 34px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s5.h2}</h2>
            <p className="max-w-[500px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: 'rgba(240,240,240,0.60)', lineHeight: 1.6 }}>{c.s5.sub}</p>
          </div>
          <figure
            className="max-w-[800px] mx-auto rounded-2xl overflow-hidden"
            style={{ aspectRatio: '16 / 9', backgroundColor: '#2E3848', border: '1px solid rgba(183,181,254,0.12)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="flex flex-col items-center gap-4" style={{ pointerEvents: 'none' }}>
              <div
                className="flex items-center justify-center rounded-full"
                style={{ width: '72px', height: '72px', backgroundColor: 'rgba(183,181,254,0.15)', border: '1.5px solid rgba(183,181,254,0.3)' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#b7b5fe" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '15px', color: '#F0F0F0', marginBottom: '4px' }}>{c.s5.founderName}</p>
                <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 300, fontSize: '12px', color: 'rgba(183,181,254,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.s5.founderNote}</p>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* S6 NAVIGATOR PRESENCE — adds navigators link */}
      <Section bg="whisper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1688646545293-2755ea04cd8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80"
              alt="Navigator providing personalised feedback on a student's writing"
              className="rounded-lg w-full"
              style={{ display: 'block' }}
            />
          </div>
          <div className="order-1 md:order-2">
            <Eyebrow>{c.s6.eyebrow}</Eyebrow>
            <h2 className="mb-8 max-w-[480px]" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 38px)', color: '#0E0E12', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s6.h2}</h2>
            <div className="space-y-5">
              {c.s6.points.map(({ label, body }) => (
                <p key={label} style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '16px', color: '#212830', lineHeight: 1.6 }}>
                  <strong style={{ fontWeight: 600, color: '#0E0E12' }}>{label}:</strong>{' '}{body}
                </p>
              ))}
            </div>
            {/* Navigators link — new */}
            <div style={{ marginTop: '1.5rem' }}>
              <Link
                href={`/${locale}/navigators`}
                style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '14px', color: '#5856cc', textDecoration: 'none' }}
              >
                {c.s6.navigatorsLink}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* S7 THE COHORT */}
      <Section bg="dark">
        <div className="text-center mb-16">
          <Eyebrow dark center>{c.s7.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 42px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s7.h2}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {c.s7.cols.map(({ num, title, body }, i) => (
            <div key={num} className="px-0 md:px-8" style={i > 0 ? { borderLeft: '1px solid rgba(183,181,254,0.2)' } : undefined}>
              <div className="mb-3" style={{ fontFamily: 'var(--font-latin)', fontWeight: 300, fontSize: '11px', color: 'rgba(183,181,254,0.40)' }}>{num}</div>
              <h3 className="mb-3" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '20px', color: '#b7b5fe' }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: 'rgba(240,240,240,0.70)', lineHeight: 1.6 }}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* S8 STUDENT VOICE */}
      <section className="px-6 py-24 md:py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow dark center>{c.s8.eyebrow}</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 42px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s8.h2}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {c.s8.voices.map((v) => (
              <StudentVoiceCard
                key={v.grade + v.city}
                quote={v.quote}
                grade={v.grade}
                city={v.city}
                weeksInProgram={v.weeks}
                hangarDetail={v.detail}
              />
            ))}
          </div>
        </div>
      </section>

      {/* S9 CLOSING CTA */}
      <Section bg="dark">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="mb-5" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 42px)', color: '#b7b5fe', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s9.h2}</h2>
          <p className="max-w-[520px] mx-auto mb-8" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '16px', color: 'rgba(240,240,240,0.75)', lineHeight: 1.6 }}>{c.s9.sub}</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <Link
              href={`/${locale}/consult`}
              className="w-full md:w-auto rounded-lg transition-all hover:opacity-90"
              style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '16px', backgroundColor: '#F5C842', color: '#0E0E12', padding: '16px 32px', textDecoration: 'none', display: 'inline-block', textAlign: 'center', minWidth: '280px' }}
            >
              {c.s9.ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/program`}
              className="w-full md:w-auto rounded-lg transition-all hover:border-white"
              style={{ fontFamily: 'var(--font-latin)', fontWeight: 500, fontSize: '16px', backgroundColor: 'transparent', color: '#F0F0F0', border: '1.5px solid rgba(240,240,240,0.50)', padding: '14px 32px', textDecoration: 'none', display: 'inline-block', textAlign: 'center', minWidth: '280px' }}
            >
              {c.s9.ctaSecondary}
            </Link>
          </div>
          <p className="mt-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '13px', color: '#b7b5fe' }}>{c.s9.note}</p>
        </div>
      </Section>

    </div>
  )
}