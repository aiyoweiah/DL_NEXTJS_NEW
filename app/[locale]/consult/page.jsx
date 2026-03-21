// app/[locale]/consult/page.jsx
//
// Diagnostic Consultation — Cal.com booking embed.
// Sections (top → bottom):
//   1. Hero           — dark, h1, 6 stat pills
//   2. WhatHappens    — white, 4 numbered phase steps (no images)
//   3. RealCall       — dark bg image, narrative overlay
//   4. TrustSection   — dark, Navigator-not-sales + bullet points
//   5. CalendarSection — whisper, Cal.com embed
//   6. CharterSection  — dark footer band

import Link            from 'next/link'
import { notFound }   from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import ConsultCalEmbed from '@/components/consult/ConsultCalEmbed'

// ─────────────────────────────────────────────────────────────
// BILINGUAL COPY
// ─────────────────────────────────────────────────────────────

const COPY = {
  en: {
    meta: {
      title:       'Book a Diagnostic Consultation',
      description: 'Book a 20-minute diagnostic consultation with DODO Learning. A Navigator \u2014 not a sales rep \u2014 finds out exactly where your child is and maps out what 16 weeks could look like. No commitment required.',
    },
    hero: {
      chip: 'Think Once. In Both Languages.',
      h1:   'We find out exactly where your child is.',
      h1zh: '\u6211\u4eec\u7cbe\u786e\u786e\u5b9a\u60a8\u5b69\u5b50\u7684\u8d77\u70b9',
      sub:  'Not where their school report says they are. The consultation is 20 minutes with a Navigator \u2014 not a sales call. We diagnose, we identify the gap, we prescribe. You decide.',
      cta1: 'Book My Consultation',
      cta2: 'See The Program',
      stats: [
        { value: '20',     unit: 'Minutes',      desc: 'Focused, no filler'                                        },
        { value: '1',      unit: 'Navigator',    desc: 'Not a sales rep'                                           },
        { value: '4',      unit: 'Phases',       desc: 'Diagnose \u00b7 Identify \u00b7 Prescribe \u00b7 Decide'   },
        { value: '1',      unit: 'Lexile Score', desc: 'Identified before call ends'                               },
        { value: '0',      unit: 'Obligation',   desc: 'No commitment to book'                                     },
        { value: '\u221e', unit: 'Free',          desc: 'Always, no sign-up'                                       },
      ],
    },
    phases: {
      eyebrow: 'What Happens in the Call',
      h2:      'Four phases. Twenty minutes. A real answer.',
      h2zh:    '\u56db\u4e2a\u9636\u6bb5\uff0c\u4e8c\u5341\u5206\u949f\uff0c\u771f\u5b9e\u7684\u7b54\u6848',
      steps: [
        { num: '01', label: 'Diagnose',         labelZh: '\u8bfa\u65ad',            time: '5 min',
          desc: 'We ask about your child\u2019s current school experience \u2014 not their English level. What does a typical English class feel like for them? Not the grade \u2014 the feeling.' },
        { num: '02', label: 'Identify the Gap', labelZh: '\u786e\u5b9a\u5dee\u8ddd', time: '5 min',
          desc: 'We name the specific gap with precision. A vocabulary depth gap, a fluency gap, and a writing confidence gap require different solutions. We identify which one.' },
        { num: '03', label: 'Prescribe',        labelZh: '\u5236\u5b9a\u65b9\u6848', time: '5 min',
          desc: 'We describe what the first 16 weeks looks like for a student exactly like yours \u2014 with specific Lexile targets and a 6+1 Trait writing baseline.' },
        { num: '04', label: 'Decide',           labelZh: '\u505a\u51b3\u5b9a',       time: '5 min',
          desc: 'If Charter Enrollment is the right fit, we explain the founding rate and next steps. No pressure. Clear terms. You decide when you\u2019re ready.' },
      ],
    },
    call: {
      eyebrow:       'A Real Consultation',
      navigatorName: 'Navigator Sarah',
      sessionPhase:  'Diagnose Phase \u00b7 5 min',
      h2:   'What the Navigator actually says.',
      h2zh: '\u9886\u822a\u5458\u5b9e\u9645\u5982\u4f55\u5f00\u5c55\u548b\u8be2',
      p1: 'The Navigator doesn\u2019t open with a pitch. They open with a question:',
      q1: '\u201cTell me what a typical English class looks like for your child. Not the grade \u2014 the feeling. Do they raise their hand? Do they avoid the teacher\u2019s eye?\u201d',
      p2: 'That question tells us more in thirty seconds than a report card tells us in a year. We\u2019re listening for the gap between what the school measures and what\u2019s actually happening.',
      p3: 'By minute fifteen, we\u2019ve named the gap. We\u2019ve described what the first four weeks of The Loop looks like for a student with that specific profile.',
      p4: 'The call closes with one honest statement:',
      q4: '\u201cBased on what you\u2019ve told me, I think the 16-Week Program is the right fit. Here\u2019s exactly why \u2014 and here\u2019s what happens if it isn\u2019t working at week eight.\u201d',
    },
    trust: {
      eyebrow: 'Before You Book',
      h2:      'This is a diagnostic call, not a sales call.',
      h2zh:    '\u8fd9\u662f\u8bfa\u65ad\u901a\u8bdd\uff0c\u4e0d\u662f\u9500\u552e\u901a\u8bdd',
      body:    'DODO consultations are run by Navigators \u2014 the same people who deliver the program. They will tell you honestly whether the 16-Week Program is the right fit for your child right now. If it is not, they will tell you that too.',
      points: [
        'Run by a Navigator, not a sales representative',
        'Lexile level identified before the call ends',
        'Honest fit assessment \u2014 we only enroll students we can genuinely move',
        'No commitment required to book',
        'Available in English and Mandarin',
      ],
    },
    calendar: {
      eyebrow: 'Book Your Consultation',
      h2:      'Pick a time. We\u2019ll do the rest.',
      h2zh:    '\u9009\u62e9\u65f6\u95f4\uff0c\u6211\u4eec\u6765\u5b89\u6392',
      sub:     'Choose any available 20-minute slot below. A Navigator will confirm and be ready with your child\u2019s profile in mind.',
      badge:   'Navigator Available',
      points: [
        'Confirmation within one business day',
        'Available in English and Mandarin',
        'Reschedule any time \u2014 no penalty',
      ],
    },
    charter: {
      badge: 'Charter Enrollment Open',
      h2:    'Ready to start after the call?',
      sub:   'Charter families commit to The 16-Week Program at the founding rate. Not a promotion \u2014 a reward for deciding early.',
      btn1:  'Book Your Consultation',
      btn2:  'See The Program',
    },
  },

  zh: {
    meta: {
      title:       '\u9884\u7ea6\u8bfa\u65ad\u548b\u8be2',
      description: '\u9884\u7ea6\u4e0eDODO Learning\u7684\u4e8c\u5341\u5206\u949f\u8bfa\u65ad\u548b\u8be2\u3002\u7531\u9886\u822a\u5458\u2014\u2014\u800c\u975e\u9500\u552e\u4ee3\u8868\u2014\u2014\u7cbe\u786e\u4e86\u89e3\u60a8\u5b69\u5b50\u7684\u73b0\u72b6\u3002\u65e0\u9700\u627f\u8bfa\u3002',
    },
    hero: {
      chip: 'Think Once. In Both Languages.',
      h1:   '\u6211\u4eec\u7cbe\u786e\u786e\u5b9a\u60a8\u5b69\u5b50\u7684\u8d77\u70b9',
      h1zh: 'We find out exactly where your child is.',
      sub:  '\u4e0d\u662f\u4f9d\u636e\u5b66\u6821\u6210\u7ee9\u5355\u7684\u8bc4\u5b9a\u3002\u548b\u8be2\u662f\u4e8c\u5341\u5206\u949f\u4e0e\u9886\u822a\u5458\u7684\u5bf9\u8bdd\u2014\u2014\u4e0d\u662f\u9500\u552e\u7535\u8bdd\u3002\u6211\u4eec\u8bfa\u65ad\u3001\u786e\u5b9a\u5dee\u8ddd\u3001\u5236\u5b9a\u65b9\u6848\u3002\u60a8\u6765\u51b3\u5b9a\u3002',
      cta1: '\u9884\u7ea6\u6211\u7684\u548b\u8be2',
      cta2: '\u67e5\u770b\u8bfe\u7a0b',
      stats: [
        { value: '20',     unit: '\u5206\u949f',            desc: '\u7cbe\u51c6\u9ad8\u6548'                                              },
        { value: '1',      unit: '\u4f4d\u9886\u822a\u5458', desc: '\u4e0d\u662f\u9500\u552e\u4ee3\u8868'                               },
        { value: '4',      unit: '\u4e2a\u9636\u6bb5',      desc: '\u8bfa\u65ad \u00b7 \u786e\u5dee\u8ddd \u00b7 \u5236\u65b9\u6848 \u00b7 \u505a\u51b3\u5b9a' },
        { value: '1',      unit: 'Lexile\u5206\u6570',      desc: '\u901a\u8bdd\u7ed3\u675f\u524d\u786e\u5b9a'                           },
        { value: '0',      unit: '\u627f\u8bfa\u8981\u6c42', desc: '\u9884\u7ea6\u65e0\u9700\u627f\u8bfa'                               },
        { value: '\u221e', unit: '\u514d\u8d39',             desc: '\u59cb\u7ec8\u514d\u8d39\uff0c\u65e0\u9700\u6ce8\u518c'               },
      ],
    },
    phases: {
      eyebrow: '\u548b\u8be2\u5185\u5bb9',
      h2:      '\u56db\u4e2a\u9636\u6bb5\uff0c\u4e8c\u5341\u5206\u949f\uff0c\u771f\u5b9e\u7684\u7b54\u6848',
      h2zh:    'Four phases. Twenty minutes. A real answer.',
      steps: [
        { num: '01', label: '\u8bfa\u65ad',          labelZh: 'Diagnose',         time: '5 \u5206\u949f',
          desc: '\u6211\u4eec\u8be2\u95ee\u5b69\u5b50\u7684\u5b66\u6821\u4f53\u9a8c\u2014\u2014\u800c\u975e\u82f1\u8bed\u6c34\u5e73\u3002\u82f1\u8bed\u8bfe\u5bf9\u4ed6\u4eec\u6765\u8bf4\u662f\u4ec0\u4e48\u611f\u89c9\uff1f\u4e0d\u770b\u6210\u7ee9\u2014\u2014\u770b\u611f\u53d7\u3002' },
        { num: '02', label: '\u786e\u5b9a\u5dee\u8ddd', labelZh: 'Identify the Gap', time: '5 \u5206\u949f',
          desc: '\u6211\u4eec\u7cbe\u786e\u547d\u540d\u5177\u4f53\u7684\u5dee\u8ddd\u3002\u8bcd\u6c47\u6df1\u5ea6\u5dee\u8ddd\u3001\u6d41\u7545\u5ea6\u5dee\u8ddd\u548c\u5199\u4f5c\u4fe1\u5fc3\u5dee\u8ddd\u9700\u8981\u4e0d\u540c\u7684\u89e3\u51b3\u65b9\u6848\u3002' },
        { num: '03', label: '\u5236\u5b9a\u65b9\u6848', labelZh: 'Prescribe',        time: '5 \u5206\u949f',
          desc: '\u6211\u4eec\u63cf\u8ff0\u4e0e\u60a8\u5b69\u5b50\u5b8c\u5168\u76f8\u540c\u7684\u5b66\u751f\u7684\u524d\u5341\u516d\u5468\u662f\u4ec0\u4e48\u6837\u5b50\u2014\u2014\u5305\u62ecLexile\u76ee\u6807\u548c6+1\u5199\u4f5c\u7279\u8d28\u57fa\u7ebf\u3002' },
        { num: '04', label: '\u505a\u51b3\u5b9a',      labelZh: 'Decide',          time: '5 \u5206\u949f',
          desc: '\u5982\u679c\u521b\u59cb\u62a5\u540d\u9002\u5408\u60a8\uff0c\u6211\u4eec\u4ecb\u7ecd\u521b\u59cb\u8d39\u7387\u548c\u540e\u7eed\u6b65\u9aa4\u3002\u6ca1\u6709\u538b\u529b\uff0c\u6761\u6b3e\u6e05\u6670\u3002\u60a8\u51b3\u5b9a\u65f6\u6211\u4eec\u5c31\u51c6\u5907\u597d\u4e86\u3002' },
      ],
    },
    call: {
      eyebrow:       '\u771f\u5b9e\u7684\u548b\u8be2',
      navigatorName: 'Navigator Sarah',
      sessionPhase:  '\u8bfa\u65ad\u9636\u6bb5 \u00b7 5\u5206\u949f',
      h2:   '\u9886\u822a\u5458\u5b9e\u9645\u5982\u4f55\u5f00\u5c55\u548b\u8be2',
      h2zh: 'What the Navigator actually says.',
      p1: '\u9886\u822a\u5458\u5f00\u5c4f\u4e0d\u662f\u4ecb\u7ecd\u8bfe\u7a0b\uff0c\u800c\u662f\u63d0\u51fa\u4e00\u4e2a\u95ee\u9898\uff1a',
      q1: '\u201c\u8bf7\u63cf\u8ff0\u4e00\u4e0b\u5b69\u5b50\u5178\u578b\u7684\u82f1\u8bed\u8bfe\u662f\u4ec0\u4e48\u6837\u5b50\u7684\u3002\u4e0d\u770b\u6210\u7ee9\u2014\u2014\u770b\u611f\u53d7\u3002\u4ed6\u4eec\u4f1a\u4e3b\u52a8\u4e3e\u624b\u5417\uff1f\u8fd8\u662f\u907f\u5f00\u8001\u5e08\u7684\u773c\u795e\uff1f\u201d',
      p2: '\u8fd9\u4e2a\u95ee\u9898\u5728\u4e09\u5341\u79d2\u5185\u544a\u8bc9\u6211\u4eec\u7684\uff0c\u6bd4\u4e00\u5e74\u7684\u6210\u7ee9\u5355\u6240\u80fd\u8bc9\u8bf4\u7684\u66f4\u591a\u3002',
      p3: '\u5230\u7b2c\u5341\u4e94\u5206\u949f\uff0c\u6211\u4eec\u5df2\u7ecf\u7cbe\u786e\u547d\u540d\u4e86\u5dee\u8ddd\uff0c\u5e76\u63cf\u8ff0\u4e86\u5177\u6709\u8be5\u7279\u5b9a\u5c5e\u6027\u7684\u5b66\u751f\u5728\u5faa\u73af\u7684\u524d\u56db\u5468\u662f\u4ec0\u4e48\u6837\u5b50\u7684\u3002',
      p4: '\u548b\u8be2\u4ee5\u4e00\u53e5\u8bda\u5b9e\u7684\u8bdd\u7ed3\u5c3e\uff1a',
      q4: '\u201c\u6839\u636e\u60a8\u544a\u8bc9\u6211\u7684\u60c5\u51b5\uff0c\u6211\u8ba4\u4e3a\u5341\u516d\u5468\u8bfe\u7a0b\u662f\u5408\u9002\u7684\u9009\u62e9\u3002\u539f\u56e0\u5982\u4e0b\u2014\u2014\u4ee5\u53ca\u5982\u679c\u5230\u7b2c\u516b\u5468\u8fdb\u5c55\u4e0d\u7406\u60f3\uff0c\u6211\u4eec\u4f1a\u600e\u4e48\u505a\u3002\u201d',
    },
    trust: {
      eyebrow: '\u9884\u7ea6\u4e4b\u524d',
      h2:      '\u8fd9\u662f\u8bfa\u65ad\u901a\u8bdd\uff0c\u4e0d\u662f\u9500\u552e\u901a\u8bdd',
      h2zh:    'This is a diagnostic call, not a sales call.',
      body:    'DODO\u548b\u8be2\u7531\u9886\u822a\u5458\u4e3b\u6301\u2014\u2014\u4e0e\u63d0\u4f9b\u8bfe\u7a0b\u7684\u662f\u540c\u4e00\u6279\u4eba\u3002\u5982\u679c\u5341\u516d\u5468\u8bfe\u7a0b\u5f53\u524d\u4e0d\u9002\u5408\u60a8\u7684\u5b69\u5b50\uff0c\u4ed6\u4eec\u4f1a\u76f4\u63a5\u544a\u8bc9\u60a8\u3002',
      points: [
        '\u7531\u9886\u822a\u5458\u4e3b\u6301\uff0c\u800c\u975e\u9500\u552e\u4ee3\u8868',
        '\u901a\u8bdd\u7ed3\u675f\u524d\u786e\u5b9a Lexile \u7b49\u7ea7',
        '\u8bda\u5b9e\u7684\u9002\u5408\u6027\u8bc4\u4f30\u2014\u2014\u6211\u4eec\u53ea\u62db\u6536\u6211\u4eec\u80fd\u771f\u6b63\u5e2e\u52a9\u7684\u5b66\u751f',
        '\u9884\u7ea6\u65e0\u9700\u627f\u8bfa',
        '\u548b\u8be2\u53ef\u7528\u82f1\u8bed\u6216\u666e\u901a\u8bdd\u8fdb\u884c',
      ],
    },
    calendar: {
      eyebrow: '\u9884\u7ea6\u548b\u8be2',
      h2:      '\u9009\u62e9\u65f6\u95f4\uff0c\u6211\u4eec\u6765\u5b89\u6392',
      h2zh:    'Pick a time. We\u2019ll do the rest.',
      sub:     '\u5728\u4e0b\u65b9\u9009\u62e9\u4efb\u610f\u4e00\u4e2a20\u5206\u949f\u7684\u53ef\u7528\u65f6\u6bb5\u3002\u9886\u822a\u5458\u5c06\u786e\u8ba4\u5e76\u63d0\u524d\u4e86\u89e3\u60a8\u5b69\u5b50\u7684\u60c5\u51b5\u3002',
      badge:   '\u9886\u822a\u5458\u5f85\u547d',
      points: [
        '\u4e00\u4e2a\u5de5\u4f5c\u65e5\u5185\u786e\u8ba4',
        '\u53ef\u7528\u82f1\u8bed\u6216\u666e\u901a\u8bdd\u8fdb\u884c',
        '\u53ef\u968f\u65f6\u91cd\u65b0\u5b89\u6392\uff0c\u65e0\u9700\u7f5a\u6b3e',
      ],
    },
    charter: {
      badge: 'Charter Enrollment Open',
      h2:    '\u548b\u8be2\u540e\u51b3\u5b9a\u5f00\u59cb\uff1f',
      sub:   '\u521b\u59cb\u5bb6\u5ead\u4ee5\u521b\u59cb\u8d39\u7387\u627f\u8bfa\u53c2\u52a0\u5341\u516d\u5468\u8bfe\u7a0b\u3002\u4e0d\u662f\u4fc3\u9500\u2014\u2014\u662f\u5bf9\u65e9\u51b3\u5b9a\u8005\u7684\u56de\u62a5\u3002',
      btn1:  '\u9884\u7ea6\u548b\u8be2',
      btn2:  '\u67e5\u770b\u8bfe\u7a0b',
    },
  },
}

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────

function BilingualH2({ primary, secondary, light = false, center = false, id }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2 id={id} style={{ fontSize: 'clamp(1.75rem, 3vw + 0.25rem, 2.75rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.025em', color: light ? '#F0F0F0' : '#0E0E12', textWrap: 'balance', marginBottom: 0 }}>
        {primary}
      </h2>
      <p className="mt-2" style={{ fontFamily: 'var(--font-cjk)', fontSize: '15px', fontWeight: 500, color: light ? '#b7b5fe' : '#5856cc', lineHeight: 1.5 }}>
        {secondary}
      </p>
    </div>
  )
}

function Eyebrow({ children, center = false, dark = false }) {
  return (
    <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: dark ? '#b7b5fe' : '#5856cc', marginBottom: '0.875rem', textAlign: center ? 'center' : undefined }}>
      {children}
    </p>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// ─────────────────────────────────────────────────────────────

function Hero({ locale, c }) {
  return (
    <section aria-labelledby="consult-hero-heading" style={{ backgroundColor: '#0E0E12', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 50% at 80% 30%, rgba(183,181,254,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div className="container-section relative z-10" style={{ flex: 1, display: 'flex', alignItems: 'center', paddingTop: 'calc(var(--nav-height) + 3.5rem)', paddingBottom: '2.5rem' }}>
        <div style={{ maxWidth: '46rem' }}>
          <div className="inline-flex items-center gap-2 mb-7 rounded-full" style={{ padding: '5px 14px', border: '1px solid rgba(183,181,254,0.18)', backgroundColor: 'rgba(183,181,254,0.05)' }}>
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#b7b5fe' }} />
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#b7b5fe' }}>{c.hero.chip}</span>
          </div>

          <h1 id="consult-hero-heading" style={{ fontSize: 'clamp(2.25rem, 5vw + 0.5rem, 4rem)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.03em', color: '#F0F0F0', marginBottom: '0.625rem', textWrap: 'balance' }}>
            {c.hero.h1}
          </h1>
          <p style={{ fontFamily: 'var(--font-cjk)', fontSize: '17px', fontWeight: 500, color: 'rgba(183,181,254,0.45)', marginBottom: '1.25rem', lineHeight: 1.5 }}>{c.hero.h1zh}</p>
          <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'rgba(240,240,240,0.5)', maxWidth: '36rem', marginBottom: '2.25rem' }}>{c.hero.sub}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#consult-calendar" className="btn btn-charter" style={{ fontWeight: 700 }}>{c.hero.cta1}</a>
            <Link href={`/${locale}/program`} className="btn btn-ghost">{c.hero.cta2}</Link>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ borderTop: '1px solid rgba(183,181,254,0.07)', flexShrink: 0, position: 'relative', zIndex: 10 }}>
        <div className="container-section">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} className="sm:grid-cols-6">
            {c.hero.stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '1.125rem 0.375rem', borderRight: i !== 2 && i !== 5 ? '1px solid rgba(183,181,254,0.07)' : 'none', borderBottom: i < 3 ? '1px solid rgba(183,181,254,0.07)' : 'none' }}>
                <p style={{ fontSize: 'clamp(1.375rem, 2.5vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: '#b7b5fe' }}>{stat.value}</p>
                <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(240,240,240,0.75)', marginTop: '3px', lineHeight: 1.2 }}>{stat.unit}</p>
                <p style={{ fontSize: '0.625rem', color: 'rgba(183,181,254,0.35)', marginTop: '2px', lineHeight: 1.3 }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 2 — WHAT HAPPENS (4 numbered steps, no images)
// ─────────────────────────────────────────────────────────────

function WhatHappens({ locale, c }) {
  return (
    <section aria-labelledby="phases-heading" style={{ backgroundColor: '#ffffff', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ marginBottom: '2.5rem' }}>
          <Eyebrow>{c.phases.eyebrow}</Eyebrow>
          <BilingualH2 id="phases-heading" primary={c.phases.h2} secondary={c.phases.h2zh} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '0' }} className="sm:grid-cols-2 lg:grid-cols-4">
          {c.phases.steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                padding:     '1.75rem 1.5rem',
                borderRight: i < 3 ? '1px solid rgba(14,14,18,0.07)' : 'none',
                borderTop:   '3px solid transparent',
                position:    'relative',
              }}
            >
              {/* Lavender top accent line */}
              <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: i === 0 ? '#b7b5fe' : 'rgba(183,181,254,0.15)', borderRadius: '0' }} />

              {/* Step number + time */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: 'clamp(2rem, 3vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'rgba(183,181,254,0.18)', lineHeight: 1 }}>
                  {step.num}
                </span>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(88,86,204,0.5)', padding: '2px 8px', border: '1px solid rgba(183,181,254,0.2)', borderRadius: '9999px' }}>
                  {step.time}
                </span>
              </div>

              {/* Label */}
              <p style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0E0E12', lineHeight: 1.25, marginBottom: '2px' }}>{step.label}</p>
              <p style={{ fontFamily: 'var(--font-cjk)', fontSize: '11px', color: '#5856cc', lineHeight: 1.3, marginBottom: '0.875rem' }}>{step.labelZh}</p>

              {/* Description */}
              <p style={{ fontSize: '0.8125rem', lineHeight: 1.75, color: '#3D4452' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 3 — A REAL CALL (dark bg image narrative)
// ─────────────────────────────────────────────────────────────

const CALL_IMG = 'https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80'

function RealCall({ locale, c }) {
  return (
    <section aria-labelledby="call-heading" style={{ position: 'relative', overflow: 'hidden', minHeight: '480px' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={CALL_IMG} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(14,14,18,0.97) 0%, rgba(14,14,18,0.90) 45%, rgba(14,14,18,0.55) 100%)' }} />

      <div className="container-section relative z-10" style={{ padding: 'var(--section-md) 1.25rem' }}>
        <div style={{ maxWidth: '40rem' }}>
          <div className="inline-flex items-center gap-2.5 rounded-full mb-7" style={{ padding: '7px 14px 7px 7px', backgroundColor: 'rgba(183,181,254,0.07)', border: '1px solid rgba(183,181,254,0.14)' }}>
            <span aria-hidden="true" style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#b7b5fe', color: '#0E0E12', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>NV</span>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2 }}>{c.call.navigatorName}</p>
              <p style={{ fontSize: '10px', color: 'rgba(183,181,254,0.55)', lineHeight: 1.2 }}>{c.call.sessionPhase}</p>
            </div>
          </div>

          <Eyebrow dark>{c.call.eyebrow}</Eyebrow>
          <BilingualH2 id="call-heading" primary={c.call.h2} secondary={c.call.h2zh} light />

          <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>
              {c.call.p1}{' '}<em style={{ fontStyle: 'italic', color: 'rgba(183,181,254,0.8)' }}>{c.call.q1}</em>
            </p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>{c.call.p2}</p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>{c.call.p3}</p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.6)' }}>
              {c.call.p4}{' '}<em style={{ fontStyle: 'italic', color: 'rgba(183,181,254,0.8)' }}>{c.call.q4}</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 4 — TRUST (dark, 2-col)
// ─────────────────────────────────────────────────────────────

function TrustSection({ locale, c }) {
  return (
    <section aria-labelledby="trust-heading" style={{ backgroundColor: '#212830', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="lg:grid-cols-2">
          <div>
            <Eyebrow dark>{c.trust.eyebrow}</Eyebrow>
            <BilingualH2 id="trust-heading" primary={c.trust.h2} secondary={c.trust.h2zh} light />
            <p style={{ fontSize: '1rem', lineHeight: 1.82, color: 'rgba(240,240,240,0.55)', marginTop: '1.125rem' }}>{c.trust.body}</p>
          </div>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '0.25rem' }} aria-label="Trust points">
            {c.trust.points.map((point, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span aria-hidden="true" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#b7b5fe', flexShrink: 0, marginTop: '0.45rem' }} />
                <span style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'rgba(240,240,240,0.6)' }}>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 5 — CALENDAR BOOKING
// ─────────────────────────────────────────────────────────────

function CalendarSection({ locale, c }) {
  return (
    <section id="consult-calendar" aria-labelledby="calendar-heading" style={{ backgroundColor: '#F5F5FF', padding: 'var(--section-md) 0' }}>
      <div className="container-section">

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', marginBottom: '3rem' }} className="lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>{c.calendar.eyebrow}</Eyebrow>
            <BilingualH2 id="calendar-heading" primary={c.calendar.h2} secondary={c.calendar.h2zh} />
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#3D4452', marginTop: '0.875rem', maxWidth: '32rem' }}>{c.calendar.sub}</p>
          </div>

          {/* Trust strip */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem', backgroundColor: '#ffffff', borderRadius: '1rem', border: '1px solid rgba(14,14,18,0.07)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="inline-flex items-center gap-2 self-start rounded-full" style={{ padding: '4px 12px', backgroundColor: 'rgba(183,181,254,0.08)', border: '1px solid rgba(183,181,254,0.2)' }}>
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#b7b5fe' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#5856cc' }}>{c.calendar.badge}</span>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', margin: 0, padding: 0, listStyle: 'none' }}>
              {c.calendar.points.map((pt, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <span aria-hidden="true" style={{ width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, backgroundColor: 'rgba(183,181,254,0.12)', border: '1px solid rgba(183,181,254,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                      <path d="M1 3l2 2 4-4" stroke="#b7b5fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span style={{ fontSize: '0.875rem', color: '#3D4452', lineHeight: 1.5 }}>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '1.25rem', border: '1px solid rgba(14,14,18,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflow: 'hidden', padding: '0.5rem' }}>
          <ConsultCalEmbed />
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION 6 — CHARTER FOOTER
// ─────────────────────────────────────────────────────────────

function CharterSection({ locale, c }) {
  return (
    <section aria-labelledby="charter-heading" style={{ backgroundColor: '#212830', padding: 'var(--section-md) 0' }}>
      <div className="container-section">
        <div style={{ maxWidth: '40rem' }}>
          <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{ padding: '4px 12px', backgroundColor: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.22)' }}>
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#F5C842' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#F5C842' }}>{c.charter.badge}</span>
          </div>
          <h2 id="charter-heading" style={{ fontSize: 'clamp(1.625rem, 2.5vw + 0.25rem, 2.5rem)', fontWeight: 700, letterSpacing: '-0.025em', color: '#F0F0F0', marginBottom: '0.625rem' }}>{c.charter.h2}</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(240,240,240,0.45)', marginBottom: '1.875rem' }}>{c.charter.sub}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#consult-calendar" className="btn btn-charter">{c.charter.btn1}</a>
            <Link href={`/${locale}/program`} className="btn btn-ghost">{c.charter.btn2}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// METADATA + PAGE EXPORT
// ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return localeParams()
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const c = COPY[locale] ?? COPY.en
  return buildMetadata({ locale, path: '/consult', title: c.meta.title, description: c.meta.description })
}

export default async function ConsultPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const c = COPY[locale] ?? COPY.en

  return (
    <>
      <Hero            locale={locale} c={c} />
      <WhatHappens     locale={locale} c={c} />
      <RealCall        locale={locale} c={c} />
      <TrustSection    locale={locale} c={c} />
      <CalendarSection locale={locale} c={c} />
      <CharterSection  locale={locale} c={c} />
    </>
  )
}