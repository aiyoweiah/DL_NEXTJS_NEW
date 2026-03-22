'use client'

// components/faq/FAQClient.jsx
//
// Bilingual FAQ — locale prop switches ALL content, labels, and UI strings.
// JSX answers with inline links use locale-prefixed hrefs.
// Content stays inline (answers use JSX links — cannot be serialised per §4).

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'

// ─── SVG ICONS ──────────────────────────────────────────────
function IconSearch({ style }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" style={style} aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  )
}
function IconArrowRight({ style }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
function IconChevron({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 220ms cubic-bezier(0.4,0,0.2,1)', flexShrink: 0 }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

// ─── PRIMITIVES ─────────────────────────────────────────────
function Eyebrow({ children, dark = false }) {
  return (
    <div style={{ fontFamily: 'var(--font-latin)', fontSize: '12px', fontWeight: 500,
      letterSpacing: '0.1em', textTransform: 'uppercase', color: dark ? '#b7b5fe' : '#5856cc', marginBottom: '12px' }}>
      {children}
    </div>
  )
}
function SectionH2({ children, dark = false }) {
  return (
    <h2 style={{ fontFamily: 'var(--font-latin)', fontSize: '28px', fontWeight: 700,
      color: dark ? '#F0F0F0' : '#0E0E12', marginBottom: '32px',
      letterSpacing: '-0.02em', lineHeight: 1.3 }}>
      {children}
    </h2>
  )
}

// ─── ACCORDION ITEM ─────────────────────────────────────────
function AccordionItem({ question, answer, open, onToggle, variant = 'light', id }) {
  const isDark = variant === 'dark'
  return (
    <div style={{ borderBottom: isDark ? '1px solid rgba(183,181,254,0.15)' : '1px solid rgba(0,0,0,0.08)' }}>
      <button
        id={`faq-btn-${id}`} aria-expanded={open} aria-controls={`faq-panel-${id}`}
        onClick={onToggle}
        className="w-full text-left flex items-start justify-between gap-4"
        style={{ fontFamily: 'var(--font-latin)', fontSize: '17px', fontWeight: 600,
          color: isDark ? '#F0F0F0' : '#0E0E12', lineHeight: 1.45,
          background: 'none', border: 'none', cursor: 'pointer', padding: '20px 0' }}
      >
        <span style={{ flex: 1 }}>{question}</span>
        <span style={{ color: isDark ? '#b7b5fe' : '#5856cc', marginTop: '2px' }}><IconChevron open={open} /></span>
      </button>
      <div id={`faq-panel-${id}`} role="region" aria-labelledby={`faq-btn-${id}`}
        style={{ overflow: 'hidden', maxHeight: open ? '1200px' : '0px',
          transition: 'max-height 280ms cubic-bezier(0.4,0,0.2,1)' }}>
        <div style={{ fontFamily: 'var(--font-latin)', fontSize: '16px', fontWeight: 400,
          color: isDark ? 'rgba(240,240,240,0.75)' : '#212830', lineHeight: 1.7, paddingBottom: '20px' }}>
          {answer}
        </div>
      </div>
    </div>
  )
}

// ─── ACCORDION GROUP ────────────────────────────────────────
function AccordionGroup({ items, variant, groupId }) {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = useCallback((i) => setOpenIndex((prev) => (prev === i ? null : i)), [])
  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem key={i} id={`${groupId}-${i}`} question={item.question}
          answer={item.answer} variant={variant} open={openIndex === i}
          onToggle={() => toggle(i)} />
      ))}
    </div>
  )
}

// ─── CATEGORY NAV ───────────────────────────────────────────
const CATEGORIES_EN = [
  { label: 'The Program',   anchor: 'program'    },
  { label: 'The Loop',      anchor: 'the-loop'   },
  { label: 'Navigators',    anchor: 'navigators' },
  { label: 'Results',       anchor: 'results'    },
  { label: 'The Hangar',    anchor: 'the-hangar' },
  { label: 'Enrollment',    anchor: 'enrollment' },
  { label: 'Bilingual',     anchor: 'bilingual'  },
  { label: 'Cities',        anchor: 'cities'     },
]
const CATEGORIES_ZH = [
  { label: '课程介绍',        anchor: 'program'    },
  { label: 'The Loop 教学法', anchor: 'the-loop'   },
  { label: '导师团队',        anchor: 'navigators' },
  { label: '学习成果',        anchor: 'results'    },
  { label: 'The Hangar',    anchor: 'the-hangar' },
  { label: '报名与费用',      anchor: 'enrollment' },
  { label: '双语发展',        anchor: 'bilingual'  },
  { label: '城市与安排',      anchor: 'cities'     },
]

function CategoryBar({ active, onSelect, categories }) {
  const scrollTo = (anchor) => {
    onSelect(anchor)
    const el = document.getElementById(anchor)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 64 - 60 - 16
    window.scrollTo({ top, behavior: 'smooth' })
  }
  return (
    <div style={{ backgroundColor: '#0E0E12', borderBottom: '1px solid rgba(183,181,254,0.10)',
      position: 'sticky', top: '64px', zIndex: 50, overflowX: 'auto' }}>
      <div className="max-w-7xl mx-auto" style={{ display: 'flex', gap: '4px', padding: '10px 24px' }}>
        {categories.map(({ label, anchor }) => {
          const isActive = active === anchor
          return (
            <button key={anchor} onClick={() => scrollTo(anchor)} style={{
              fontFamily: 'var(--font-latin)', fontSize: '13px',
              fontWeight: isActive ? 600 : 400, whiteSpace: 'nowrap',
              padding: '6px 14px', borderRadius: '9999px',
              backgroundColor: isActive ? '#b7b5fe' : 'transparent',
              color: isActive ? '#0E0E12' : 'rgba(240,240,240,0.6)',
              border: isActive ? 'none' : '1px solid rgba(183,181,254,0.15)',
              cursor: 'pointer', transition: 'all 150ms ease' }}>
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── SEARCH RESULTS ─────────────────────────────────────────
function SearchResults({ results, query, ui }) {
  const [openIndex, setOpenIndex] = useState(null)
  if (results.length === 0) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-20 text-center"
        style={{ backgroundColor: '#F5F5FF', minHeight: '400px' }}>
        <p style={{ fontFamily: 'var(--font-latin)', fontSize: '16px', color: 'rgba(14,14,18,0.45)' }}>
          {ui.noResults(query)}
        </p>
      </div>
    )
  }
  return (
    <div style={{ backgroundColor: '#F5F5FF' }}>
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <p style={{ fontFamily: 'var(--font-latin)', fontSize: '13px', fontWeight: 500,
          color: '#5856cc', marginBottom: '24px', letterSpacing: '0.05em' }}>
          {ui.searchCount(results.length, query)}
        </p>
        {results.map((item, i) => (
          <div key={i}>
            <div style={{ marginBottom: '4px', fontSize: '11px', color: 'rgba(183,181,254,0.5)',
              fontFamily: 'var(--font-latin)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {item._category}
            </div>
            <AccordionItem id={`search-${i}`} question={item.question} answer={item.answer}
              variant="light" open={openIndex === i}
              onToggle={() => setOpenIndex((p) => (p === i ? null : i))} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── UI STRINGS ─────────────────────────────────────────────
const UI = {
  en: {
    eyebrow:      'Frequently Asked Questions',
    h1:           'Every question parents ask before enrolling \u2014 answered completely.',
    subhead:      'Use the search below or jump to a category. Every answer is complete \u2014 nothing requires a follow-up call.',
    placeholder:  'Search questions...',
    searchCount:  (n, q) => `${n} result${n !== 1 ? 's' : ''} for \u201c${q}\u201d`,
    noResults:    (q) => `No results for \u201c${q}\u201d \u2014 try a shorter term or browse categories below.`,
    stillEyebrow: 'Still Here?',
    stillH2:      'Your question isn\u2019t here.',
    stillSub:     'Book a diagnostic call. We will answer it in the first five minutes \u2014 then spend the rest of the time on your child.',
    ctaButton:    'Book a Diagnostic Call',
    emailLink:    'Or email us directly',
    closingH2:    'You have the answers. Now get the assessment.',
    closingSub:   'The entrance assessment is the beginning. It tells us exactly where your child is \u2014 and what the first 16 weeks should look like for them.',
    closingMicro: 'The entrance assessment is included in every enrollment. The first number costs nothing.',
  },
  zh: {
    eyebrow:      '\u5e38\u89c1\u95ee\u9898',
    h1:           '\u5165\u5b66\u524d\u5bb6\u957f\u6700\u5173\u5fc3\u7684\u6bcf\u4e00\u4e2a\u95ee\u9898\u2014\u2014\u5b8c\u6574\u89e3\u7b54\u3002',
    subhead:      '\u4f7f\u7528\u4e0b\u65b9\u641c\u7d22\u6216\u8df3\u8f6c\u81f3\u5206\u7c7b\u3002\u6bcf\u4e2a\u7b54\u6848\u5747\u5b8c\u6574\u72ec\u7acb\uff0c\u65e0\u9700\u989d\u5916\u548c\u8be2\u3002',
    placeholder:  '\u641c\u7d22\u95ee\u9898\u2026',
    searchCount:  (n, q) => `\u201c${q}\u201d \u7684\u641c\u7d22\u7ed3\u679c\uff1a${n} \u6761`,
    noResults:    (q) => `\u672a\u627e\u5230\u201c${q}\u201d\u76f8\u5173\u7ed3\u679c\u2014\u2014\u8bf7\u5c1d\u8bd5\u7b80\u77ed\u5173\u952e\u8bcd\uff0c\u6216\u6d4f\u89c8\u4ee5\u4e0b\u5206\u7c7b\u3002`,
    stillEyebrow: '\u8fd8\u6709\u7591\u95ee\uff1f',
    stillH2:      '\u6ca1\u6709\u627e\u5230\u60a8\u60f3\u8981\u7684\u7b54\u6848\uff1f',
    stillSub:     '\u9884\u7ea6\u8bca\u65ad\u901a\u8bdd\u3002\u6211\u4eec\u4f1a\u5728\u524d\u4e94\u5206\u949f\u5185\u89e3\u7b54\u60a8\u7684\u95ee\u9898\u2014\u2014\u7136\u540e\u628a\u5269\u4f59\u65f6\u95f4\u4e13\u6ce8\u4e8e\u60a8\u7684\u5b69\u5b50\u3002',
    ctaButton:    '\u9884\u7ea6\u8bca\u65ad\u901a\u8bdd',
    emailLink:    '\u6216\u76f4\u63a5\u53d1\u9001\u90ae\u4ef6',
    closingH2:    '\u60a8\u5df2\u4e86\u89e3\u6240\u6709\u4fe1\u606f\u3002\u73b0\u5728\uff0c\u8ba9\u6211\u4eec\u5f00\u59cb\u8bc4\u4f30\u3002',
    closingSub:   '\u5165\u5b66\u8bc4\u4f30\u662f\u4e00\u5207\u7684\u8d77\u70b9\u3002\u5b83\u544a\u8bc9\u6211\u4eec\u60a8\u7684\u5b69\u5b50\u76ee\u524d\u7684\u80fd\u529b\u6c34\u5e73\u2014\u2014\u4ee5\u53ca\u6700\u521d16\u5468\u5e94\u5982\u4f55\u4e3a\u4ed6\u4eec\u91cf\u8eab\u89c4\u5212\u3002',
    closingMicro: '\u5165\u5b66\u8bc4\u4f30\u5305\u542b\u5728\u6240\u6709\u62a5\u540d\u5957\u9910\u4e2d\uff0c\u9996\u6b21\u6d4b\u8bc4\u5b8c\u5168\u514d\u8d39\u3002',
  },
}

// ─── FAQ DATA ───────────────────────────────────────────────
// locale is passed in so JSX answers use locale-prefixed hrefs (bug fix).
function buildSectionsEN(locale) {
  return [
    {
      id: 'program', label: 'The Program',
      heading: 'What the 16 weeks actually involves.',
      variant: 'light', bg: '#F5F5FF',
      items: [
        { question: 'What exactly happens in the 16-week program?', answer: 'The program runs through The Loop \u2014 Read \u2192 Think \u2192 Speak \u2192 Write \u2014 across 16 structured weeks. Each session involves live instruction with a Navigator, independent practice inside The Hangar, and baseline-to-exit assessment using Lexile and 6+1 Trait frameworks. Your child moves through grade-level content, not simplified material.' },
        { question: 'How many sessions are there and how long is each one?', answer: 'Sixteen sessions. Each session is 90 minutes \u2014 60 minutes live with their Navigator, 30 minutes asynchronous work inside The Hangar. Sessions run weekly on a fixed schedule determined by cohort start date.' },
        { question: 'What grade levels does DODO serve?', answer: 'Grades 3 through 8. The program is designed for students reading between Lexile 400L and 1000L \u2014 the critical range where bilingual thinking either consolidates or fragments.' },
        { question: 'Is this a group program or one-on-one?', answer: 'One-on-one. Every child works with a dedicated Navigator for the full 16 weeks. The Hangar provides peer interaction, but live sessions are always 1:1.' },
        { question: 'What happens if my child misses a session?', answer: "Sessions are recorded and accessible within 24 hours. Your child\u2019s Navigator will adjust the following session to address any gaps. Two consecutive missed sessions trigger a parent check-in to assess whether the cohort timing is correct." },
        { question: 'What is The Hangar and is it included?', answer: "The Hangar is the asynchronous learning environment where students practice between sessions. It is included in every Charter Enrollment. This is where your child consolidates what they learned during live sessions \u2014 not where they wait for help." },
        { question: 'How is DODO different from an after-school English class?', answer: 'DODO builds bilingual thinking capacity \u2014 the ability to reason academically in English while maintaining Chinese fluency. An after-school class builds conversational skills. The Loop trains reading comprehension, analytical thinking, oral argument construction, and structured writing. These are not language skills. They are cognitive architecture.' },
      ],
    },
    {
      id: 'the-loop', label: 'The Loop',
      heading: 'How the methodology works \u2014 and why the order is not negotiable.',
      variant: 'dark', bg: '#212830',
      items: [
        { question: 'What is The Loop?', answer: "The Loop is DODO\u2019s four-phase methodology: Read \u2192 Think \u2192 Speak \u2192 Write. It mirrors how bilingual thinkers process academic content \u2014 not how language learners translate vocabulary. The sequence is fixed because each phase builds the neural scaffolding the next phase requires." },
        { question: 'Why Read \u2192 Think \u2192 Speak \u2192 Write in that order?', answer: 'Because that is the order in which bilingual cognition develops. Reading builds input capacity. Thinking builds conceptual frameworks. Speaking externalizes those frameworks. Writing consolidates them into durable mental structures. Reversing the order produces fluency without comprehension \u2014 your child sounds confident but cannot reason independently.' },
        { question: 'How long does a student spend on each phase of The Loop?', answer: 'Each phase runs for 4 weeks. Read: weeks 1\u20134. Think: weeks 5\u20138. Speak: weeks 9\u201312. Write: weeks 13\u201316. Every student moves through the full sequence regardless of initial ability level. The content difficulty adjusts \u2014 the methodology does not.' },
        { question: 'Does The Loop change as the student improves?', answer: 'The structure never changes. The content complexity increases. A student reading at Lexile 600L in week 1 will still follow Read \u2192 Think \u2192 Speak \u2192 Write. But the texts, prompts, and writing assignments will increase in Lexile range and analytical demand as their baseline rises.' },
        { question: "How is The Loop different from what my child\u2019s school already does?", answer: "Most school curricula assume monolingual cognition. They teach reading and writing as separate skills. The Loop treats them as interdependent cognitive phases within a single system. Your child\u2019s school may teach comprehension strategies. The Loop builds the thinking structure that makes those strategies automatic." },
        { question: 'Can my child join mid-Loop or must they start at Read?', answer: 'Every student begins at Read. The entrance assessment determines content difficulty \u2014 not phase placement. A high-performing student will read more challenging texts in weeks 1\u20134, but they still enter at Read. The Loop is a sequence, not a ladder.' },
      ],
    },
    {
      id: 'navigators', label: 'Navigators',
      heading: "Who they are, how they work, and how they\u2019re matched to your child.",
      variant: 'light', bg: '#F5F5FF',
      items: [
        { question: 'What is a Navigator?', answer: "A Navigator is your child\u2019s dedicated instructor for the full 16 weeks. They guide your child through The Loop, track Lexile and 6+1 Trait growth, adjust content difficulty in real time, and communicate progress to you every four weeks." },
        { question: 'How is a Navigator different from a teacher or tutor?', answer: "A teacher delivers curriculum to a classroom. A tutor remediates gaps. A Navigator builds cognitive systems. They do not reteach what your child\u2019s school already covered \u2014 they construct the thinking architecture that lets your child use what they already know." },
        { question: 'How is my child matched to their Navigator?', answer: "Matching is based on three inputs: baseline Lexile score from the entrance assessment, 6+1 Trait writing entry level, and the parent diagnostic call. We match cognitive profile, not personality. Your child\u2019s Navigator is selected for their ability to guide your child\u2019s specific thinking development \u2014 not to be their friend." },
        { question: 'Will my child have the same Navigator for all 16 weeks?', answer: 'Yes. Consistency is non-negotiable. Changing Navigators mid-program disrupts the trust required for cognitive risk-taking. If a match is incorrect, we address it in week 2 \u2014 not week 10.' },
        { question: "What are Navigators\u2019 academic backgrounds?", answer: 'Every Navigator holds a graduate degree in education, linguistics, or a related field. Most have prior experience teaching bilingual students. All are trained in The Loop methodology and certified in Lexile assessment administration.' },
        { question: "How does a Navigator track my child\u2019s progress between sessions?", answer: "Navigators review Hangar activity logs before every session. They track question response patterns, time-on-task data, and content engagement. This allows them to adjust the next session\u2019s difficulty in real time \u2014 your child never repeats work they have already mastered." },
        { question: "What happens if my child and their Navigator aren\u2019t the right fit?", answer: "You will know by week 2. If the match is incorrect, we reassign within 48 hours. After week 4, reassignment becomes disruptive to progress and is only considered in exceptional circumstances. The diagnostic call exists to prevent mismatches \u2014 use it." },
      ],
    },
    {
      id: 'results', label: 'Results + Measurement',
      heading: 'What to expect \u2014 in numbers, not promises.',
      variant: 'dark', bg: '#0E0E12',
      items: [
        {
          question: 'What results can I expect after 16 weeks?',
          answer: (<span>One grade level of Lexile growth \u2014 100L to 150L increase \u2014 over 16 weeks. This is the research-backed benchmark for intensive intervention. Your child will also show measurable improvement in 6+1 Trait writing scores, specifically in Ideas, Organization, and Voice. See our{' '}<Link href={`/${locale}/methodology`} style={{ color: '#b7b5fe', fontWeight: 500 }}>methodology</Link>{' '}page for framework details.</span>),
        },
        {
          question: 'What is a Lexile level and how is it measured?',
          answer: (<span>A Lexile level quantifies reading comprehension ability on a scale from 0L to 2000L. It is measured using standardized assessments that evaluate sentence complexity, vocabulary demand, and conceptual density. DODO uses MetaMetrics-certified Lexile assessment tools. Learn more on our{' '}<Link href={`/${locale}/lexile`} style={{ color: '#b7b5fe', fontWeight: 500 }}>Lexile</Link>{' '}page.</span>),
        },
        {
          question: 'What is the 6+1 Trait writing framework?',
          answer: (<span>The 6+1 Trait framework measures seven dimensions of writing: Ideas, Organization, Voice, Word Choice, Sentence Fluency, Conventions, and Presentation. Each trait is scored independently on a 5-point rubric. DODO focuses on Ideas, Organization, and Voice during the 16-week program. Full framework documentation is available on our{' '}<Link href={`/${locale}/methodology`} style={{ color: '#b7b5fe', fontWeight: 500 }}>methodology</Link>{' '}page.</span>),
        },
        { question: 'How much Lexile growth is realistic in 16 weeks?', answer: 'One grade level \u2014 100L to 150L. This is achievable for students starting between Lexile 400L and 1000L with consistent session attendance. Growth above 150L in 16 weeks is possible but not typical. Growth below 100L signals a mismatch between content difficulty and baseline ability \u2014 we adjust immediately.' },
        { question: 'When is my child assessed \u2014 and who does the assessment?', answer: "Three times. Week 0: entrance assessment before the first session. Week 8: mid-program check. Week 16: exit assessment. All assessments are administered by your child\u2019s Navigator using MetaMetrics-certified tools. Results are shared with you within 72 hours of each assessment." },
        { question: "What if my child doesn\u2019t show measurable growth?", answer: "If your child shows less than 50L growth by week 8, we initiate a diagnostic review. This involves a parent call, Navigator observation, and content difficulty audit. If the issue is engagement, we adjust. If the issue is developmental readiness, we defer enrollment to a later cohort and refund the remaining balance." },
        { question: "How does DODO\u2019s measurement compare to what my child\u2019s school reports?", answer: "School grades measure compliance and effort. Lexile scores measure comprehension capacity. Your child may receive an A in English class while reading below grade level. DODO reports what your child can do \u2014 not how hard they tried." },
        { question: 'Can I see the assessment results during the program \u2014 not just at the end?', answer: "Yes. You receive a progress report after weeks 4, 8, 12, and 16. Each report includes Lexile trajectory, 6+1 Trait scores, Hangar engagement data, and Navigator observations. You will never be surprised by the final assessment \u2014 you will have watched your child\u2019s growth unfold across four data points." },
      ],
    },
    {
      id: 'the-hangar', label: 'The Hangar',
      heading: 'What happens between sessions \u2014 and what The Hangar is not.',
      variant: 'light', bg: '#F5F5FF',
      items: [
        { question: 'What is The Hangar?', answer: "The Hangar is DODO\u2019s asynchronous learning environment. It is where your child consolidates what they learned in their live session \u2014 practicing independently, reviewing recorded content, and preparing for the next phase of The Loop. It is not a homework portal. It is a thinking workspace." },
        { question: 'Is The Hangar the same as homework help?', answer: "No. The Hangar is not where students go when they are stuck. It is where students go to keep moving. It provides structured practice, not reactive tutoring. Your child will have clear tasks \u2014 reading assignments, thinking prompts, speaking rehearsals, writing drafts \u2014 that extend the live session\u2019s cognitive work." },
        { question: 'How much time does my child spend in The Hangar each week?', answer: '30 to 45 minutes per week, spread across 2\u20133 shorter sessions. The Hangar is designed for daily micro-practice, not one long homework block. Most students engage for 10\u201315 minutes per day between live sessions.' },
        { question: 'Is a Navigator present in The Hangar?', answer: "Not live. Your child\u2019s Navigator reviews Hangar activity logs and leaves asynchronous feedback \u2014 text comments, audio notes, or annotated work samples. If your child submits a writing draft in The Hangar, their Navigator will respond before the next live session." },
        { question: 'What does my child actually do between sessions?', answer: 'It depends on the phase. During Read, they annotate texts and answer comprehension prompts. During Think, they respond to analytical questions and map argument structures. During Speak, they rehearse oral responses using recorded prompts. During Write, they draft, revise, and refine written work. Every task is phase-specific.' },
        { question: 'Is The Hangar moderated?', answer: 'Yes. All Hangar activity is logged and reviewed. Content is curated \u2014 your child cannot access unrelated material or communicate with other students in unstructured ways. The Hangar is a workspace, not a social platform.' },
        { question: 'What happens in The Hangar if my child is stuck?', answer: 'The Hangar is not where students go when they are stuck. It is where students go to keep moving. If your child encounters a genuine conceptual barrier, they flag it for their Navigator, who addresses it in the next live session. The Hangar builds independence \u2014 not dependency.' },
      ],
    },
    {
      id: 'enrollment', label: 'Enrollment + Pricing',
      heading: 'Everything included in Charter Enrollment \u2014 no surprises.',
      variant: 'dark', bg: '#212830',
      items: [
        { question: 'What is Charter Enrollment?', answer: "Charter Enrollment is DODO\u2019s founding enrollment tier. It grants access to the 16-week program, a dedicated Navigator, The Hangar, all assessment tools, and progress reporting. Charter families also receive priority placement in future cohorts and early access to program expansions." },
        {
          question: 'What is the Founding Family Rate?',
          answer: (<span>The Founding Family Rate is the pricing tier available to the first 100 families who enroll in each city. It is{' '}<strong style={{ fontWeight: 600, color: '#F0F0F0' }}>$3,200</strong> for the full 16-week program. After the first 100 families, the rate increases to standard enrollment pricing.</span>),
        },
        { question: 'What is included in the enrollment fee?', answer: "Everything. Sixteen 90-minute sessions with your child\u2019s Navigator. Full Hangar access. Entrance, mid-program, and exit assessments. Four progress reports. Recorded session archive. There are no add-ons, no material fees, no hidden costs." },
        { question: 'Are there any additional costs beyond the program fee?', answer: 'No. The enrollment fee covers the entire 16-week program. You will not be asked to purchase books, software licenses, or supplementary materials. If your child needs accommodations \u2014 extended session time, translated materials, assistive technology \u2014 those are included at no additional cost.' },
        {
          question: 'What is the payment structure?',
          answer: (<span>Two options. Full payment at enrollment \u2014{' '}<strong style={{ fontWeight: 600, color: '#F0F0F0' }}>$3,200</strong> upfront for Charter Enrollment. Or split payment \u2014{' '}<strong style={{ fontWeight: 600, color: '#F0F0F0' }}>$1,700</strong> at enrollment,{' '}<strong style={{ fontWeight: 600, color: '#F0F0F0' }}>$1,500</strong> at week 8. Payment plans beyond two installments are not available.</span>),
        },
        { question: 'What is the cancellation policy?', answer: 'Full refund if you cancel before the first session. 50% refund if you cancel before week 4. No refund after week 4. If DODO initiates a program withdrawal due to lack of measurable progress, you receive a prorated refund for the remaining weeks.' },
        { question: 'Can I enroll mid-cohort?', answer: 'No. Every student begins at week 1. The Loop is a sequence \u2014 joining mid-program would require skipping phases, which undermines the methodology. If the current cohort has already started, you will be placed in the next available cohort.' },
        { question: 'Is there a waitlist?', answer: 'Only if the current cohort is full. DODO runs cohorts every 6\u20138 weeks in each city. If you are waitlisted, you receive priority placement in the next cohort and a 48-hour early enrollment window before general availability.' },
        { question: 'What happens after the 16 weeks \u2014 is there a renewal option?', answer: 'Yes. Students who complete the 16-week program and show measurable Lexile growth are eligible for Advanced Loop \u2014 a continuation program with elevated content difficulty. Enrollment details are shared during your week 16 exit assessment review.' },
      ],
    },
    {
      id: 'bilingual', label: 'Bilingual Development',
      heading: 'The science behind raising a bilingual thinker \u2014 not a bilingual speaker.',
      variant: 'light', bg: '#F5F5FF',
      items: [
        { question: "Does speaking Chinese at home hurt my child\u2019s English development?", answer: "No. Research shows that maintaining first-language proficiency strengthens second-language acquisition. The issue is not Chinese at home \u2014 it is fragmented cognitive development. If your child is learning English conversationally while thinking academically in Chinese, they develop two incomplete systems. DODO builds bilingual thinking \u2014 not bilingual speaking." },
        { question: 'What is the difference between bilingual fluency and bilingual thinking?', answer: "Bilingual fluency is the ability to speak two languages. Bilingual thinking is the ability to reason, analyze, and problem-solve in both languages. Your child may speak English fluently and still struggle with reading comprehension, essay construction, or abstract reasoning. Fluency is surface-level. Thinking is structural." },
        { question: "My child speaks English fluently \u2014 why do they still struggle academically?", answer: "Because conversational fluency and academic cognition are not the same skill. Your child may navigate social situations in English while still processing complex texts, logical arguments, and written analysis in Chinese. DODO trains the cognitive architecture required for academic English \u2014 not the vocabulary required for casual conversation." },
        { question: 'How does DODO approach the Chinese-English language relationship?', answer: "DODO treats Chinese and English as interdependent cognitive systems \u2014 not competing languages. The Loop does not replace Chinese thinking with English thinking. It builds a bilingual cognitive framework where your child can reason academically in English while maintaining Chinese fluency. This is not language instruction. It is cognitive architecture development." },
        { question: 'At what age is bilingual thinking development most effective?', answer: 'Grades 3 through 8 \u2014 ages 8 to 14. This is the critical window when academic cognition consolidates. Before age 8, children are still developing basic literacy. After age 14, cognitive patterns are largely fixed. The Loop works because it intervenes during the exact developmental window when bilingual thinking architecture can still be built.' },
        { question: 'What does research say about bilingual academic performance?', answer: 'Bilingual students who develop academic proficiency in both languages outperform monolingual peers on measures of executive function, cognitive flexibility, and problem-solving. The advantage is not the bilingualism itself \u2014 it is the cognitive complexity required to manage two language systems simultaneously. DODO builds that complexity intentionally.' },
        { question: "Will DODO help my child maintain their Chinese while improving their English?", answer: "DODO does not teach Chinese. But by building bilingual thinking capacity, it strengthens your child\u2019s ability to operate in both languages. A student who can analyze a text, construct an argument, and write a structured essay in English can transfer those cognitive skills back to Chinese. The thinking structure is portable." },
      ],
    },
    {
      id: 'cities', label: 'Cities + Scheduling',
      heading: 'Where DODO runs, and when.',
      variant: 'dark', bg: '#0E0E12',
      items: [
        { question: 'What cities does DODO serve?', answer: 'Six diaspora cities: Vancouver, Richmond BC, Markham, Toronto, San Francisco Bay Area, and Los Angeles. These cities represent the highest concentrations of bilingual Chinese-English families in North America. Expansion to additional cities is planned for 2027.' },
        { question: 'What timezone are sessions run in?', answer: 'Sessions are scheduled in your local timezone. Vancouver and Richmond BC cohorts run on Pacific Time. Toronto and Markham cohorts run on Eastern Time. San Francisco and Los Angeles cohorts run on Pacific Time. Your child will never need to attend a session outside of reasonable local hours.' },
        { question: 'Can students in different timezones join the same cohort?', answer: 'No. Cohorts are city-specific. A student in Vancouver cannot join a Toronto cohort. This ensures that all students in a cohort are working within compatible schedules and cultural contexts.' },
        { question: 'How are sessions delivered \u2014 ClassIn, Zoom, or something else?', answer: "Sessions are delivered through DODO\u2019s proprietary platform, which integrates live video, screen sharing, collaborative annotation, and session recording. You do not need to install ClassIn, Zoom, or any third-party software. Everything runs in a browser." },
        { question: 'What are the available session times?', answer: 'Weekday evenings (5:00 PM to 8:00 PM local time) and weekend mornings (9:00 AM to 12:00 PM local time). Exact session time is assigned during the diagnostic call based on your schedule and Navigator availability. Once assigned, session time remains fixed for all 16 weeks.' },
        { question: 'Do sessions run during school holidays?', answer: 'No. DODO observes major school holidays in each city \u2014 winter break, spring break, and summer holidays. If a holiday falls during your cohort, that week is skipped and the program extends by one week. You are notified of holiday adjustments at enrollment.' },
        { question: 'Is DODO available in cities not on the priority list?', answer: 'Not yet. The current program is optimized for the six diaspora cities listed above. If you live outside these cities, you can join a waitlist for future expansion. DODO will notify you when enrollment opens in your area.' },
      ],
    },
  ]
}

function buildSectionsZH(locale) {
  return [
    {
      id: 'program', label: '\u8bfe\u7a0b\u4ecb\u7ecd',
      heading: '16\u5468\u8bfe\u7a0b\u5177\u4f53\u5305\u542b\u54ea\u4e9b\u5185\u5bb9\u3002',
      variant: 'light', bg: '#F5F5FF',
      items: [
        { question: '16\u5468\u8bfe\u7a0b\u5177\u4f53\u5305\u542b\u4ec0\u4e48\u5185\u5bb9\uff1f', answer: '\u8bfe\u7a0b\u8d2f\u7a7f\u53caThe Loop\u7684\u56db\u4e2a\u9636\u6bb5\u2014\u2014Read\uff08\u9605\u8bfb\uff09\u2192 Think\uff08\u601d\u8003\uff09\u2192 Speak\uff08\u8868\u8fbe\uff09\u2192 Write\uff08\u5199\u4f5c\uff09\u2014\u2014\u5171\u5386\u7ecf16\u4e2a\u7ed3\u6784\u5316\u5468\u6b21\u3002\u6bcf\u8282\u8bfe\u5305\u542b\u4e0e\u5bfc\u5e08\u7684\u5728\u7ebf\u5b9e\u65f6\u6559\u5b66\u3001\u5728The Hangar\u5b66\u4e60\u7a7a\u95f4\u5185\u7684\u72ec\u7acb\u7ec3\u4e60\uff0c\u4ee5\u53ca\u57fa\u4e8eLexile\u9605\u8bfb\u6c34\u5e73\u548c6+1\u7279\u8d28\u5199\u4f5c\u6846\u67b6\u7684\u5165\u5b66\u4e0e\u7ed3\u8bfe\u8bc4\u4f30\u3002\u60a8\u7684\u5b69\u5b50\u5c06\u63a5\u89e6\u4e0e\u5e74\u7ea7\u6c34\u5e73\u76f8\u7b26\u7684\u5185\u5bb9\uff0c\u800c\u975e\u7b80\u5316\u6750\u6599\u3002' },
        { question: '\u8bfe\u7a0b\u5171\u6709\u591a\u5c11\u8282\u8bfe\uff1f\u6bcf\u8282\u8bfe\u591a\u957f\u65f6\u95f4\uff1f', answer: '\u516816\u8282\u8bfe\u3002\u6bcf\u828290\u5206\u949f\u2014\u201460\u5206\u949f\u4e0e\u5bfc\u5e08\u5728\u7ebf\u5b9e\u65f6\u4e92\u52a8\uff0c30\u5206\u949f\u5728The Hangar\u5b8c\u6210\u5f02\u6b65\u7ec3\u4e60\u3002\u8bfe\u7a0b\u6bcf\u5468\u56fa\u5b9a\u65f6\u95f4\u8fdb\u884c\uff0c\u7531\u6279\u6b21\u5f00\u8bfe\u65e5\u671f\u786e\u5b9a\u3002' },
        { question: 'DODO\u9002\u5408\u54ea\u4e9b\u5e74\u7ea7\u7684\u5b66\u751f\uff1f', answer: '\u5c0f\u5b66\u4e09\u5e74\u7ea7\u81f3\u521d\u4e2d\u4e8c\u5e74\u7ea7\uff08\u52048\u81f314\u5c81\uff09\u3002\u8bfe\u7a0b\u4e13\u4e3aLexile\u9605\u8bfb\u6c34\u5e73\u5728400L\u81f31000L\u4e4b\u95f4\u7684\u5b66\u751f\u8bbe\u8ba1\u2014\u2014\u8fd9\u662f\u53cc\u8bed\u601d\u7ef4\u80fd\u529b\u5f62\u6210\u6216\u65ad\u88c2\u7684\u5173\u952e\u533a\u95f4\u3002' },
        { question: '\u8fd9\u662f\u5c0f\u7ec4\u8bfe\u8fd8\u662f\u4e00\u5bf9\u4e00\u8bfe\u7a0b\uff1f', answer: '\u4e00\u5bf9\u4e00\u8bfe\u7a0b\u3002\u6bcf\u4f4d\u5b66\u751f\u5728\u6574\u4e2a16\u5468\u5185\u90fd\u6709\u4e13\u5c5e\u5bfc\u5e08\u966a\u4f34\u3002The Hangar\u63d0\u4f9b\u540c\u4f34\u4e92\u52a8\u673a\u4f1a\uff0c\u4f46\u5b9e\u65f6\u8bfe\u7a0b\u59cb\u7ec8\u4fdd\u6301\u00b11\u5bf91\u5f62\u5f0f\u3002' },
        { question: '\u5b69\u5b50\u8bf7\u5047\u7f3a\u8bfe\u600e\u4e48\u529e\uff1f', answer: '\u8bfe\u7a0b\u5c06\u572824\u5c0f\u65f6\u5185\u5f55\u5236\u5e76\u53ef\u56de\u770b\u3002\u5b69\u5b50\u7684\u5bfc\u5e08\u4f1a\u5728\u4e0b\u4e00\u8282\u8bfe\u4e2d\u8865\u5145\u76f8\u5e94\u5185\u5bb9\u3002\u8fde\u7eed\u7f3a\u5e722\u8282\u8bfe\u5c06\u89e6\u53d1\u5bb6\u957f\u6c9f\u901a\uff0c\u5171\u540c\u8bc4\u4f30\u5f53\u524d\u6279\u6b21\u7684\u65f6\u95f4\u5b89\u6392\u662f\u5426\u9002\u5408\u5b69\u5b50\u3002' },
        { question: 'The Hangar\u662f\u4ec0\u4e48\uff1f\u662f\u5426\u5305\u542b\u5728\u8bfe\u7a0b\u4e2d\uff1f', answer: 'The Hangar\u662f\u5f02\u6b65\u5b66\u4e60\u73af\u5883\uff0c\u4f9b\u5b66\u751f\u5728\u8bfe\u7a0b\u95f4\u9699\u5de9\u56fa\u6240\u5b66\u5185\u5bb9\u3002\u5b83\u5305\u542b\u5728\u6bcf\u4efdCharter\u62a5\u540d\u5957\u9910\u4e2d\u3002\u8fd9\u91cc\u662f\u5b69\u5b50\u6df1\u5316\u8bfe\u5802\u6240\u5b66\u7684\u5730\u65b9\u2014\u2014\u800c\u4e0d\u662f\u7b49\u5f85\u5e2e\u52a9\u7684\u5730\u65b9\u3002' },
        { question: 'DODO\u4e0e\u8bfe\u5916\u82f1\u8bed\u57f9\u8bad\u73ed\u6709\u4f55\u533a\u522b\uff1f', answer: 'DODO\u57f9\u517b\u7684\u662f\u53cc\u8bed\u601d\u7ef4\u80fd\u529b\u2014\u2014\u5728\u4fdd\u6301\u4e2d\u6587\u6d41\u5229\u7684\u540c\u65f6\uff0c\u5177\u5907\u7528\u82f1\u8bed\u8fdb\u884c\u5b66\u672f\u63a8\u7406\u7684\u80fd\u529b\u3002\u8bfe\u5916\u82f1\u8bed\u73ed\u57f9\u517b\u7684\u662f\u4f1a\u8bdd\u6280\u80fd\u3002The Loop\u8bad\u7ec3\u9605\u8bfb\u7406\u89e3\u3001\u5206\u6790\u601d\u7ef4\u3001\u53e3\u5934\u8bba\u8bc1\u548c\u7ed3\u6784\u5316\u5199\u4f5c\u2014\u2014\u8fd9\u4e9b\u4e0d\u662f\u8bed\u8a00\u6280\u80fd\uff0c\u800c\u662f\u8ba4\u77e5\u67b6\u6784\u3002' },
      ],
    },
    {
      id: 'the-loop', label: 'The Loop \u6559\u5b66\u6cd5',
      heading: '\u6559\u5b66\u65b9\u6cd5\u5982\u4f55\u8fd0\u4f5c\u2014\u2014\u4ee5\u53ca\u987a\u5e8f\u4e0d\u53ef\u66f4\u6539\u7684\u539f\u56e0\u3002',
      variant: 'dark', bg: '#212830',
      items: [
        { question: 'The Loop\u662f\u4ec0\u4e48\uff1f', answer: 'The Loop\u662fDODO\u7684\u56db\u9636\u6bb5\u6559\u5b66\u6cd5\uff1aRead\uff08\u9605\u8bfb\uff09\u2192 Think\uff08\u601d\u8003\uff09\u2192 Speak\uff08\u8868\u8fbe\uff09\u2192 Write\uff08\u5199\u4f5c\uff09\u3002\u5b83\u6a21\u62df\u53cc\u8bed\u601d\u7ef4\u8005\u5904\u7406\u5b66\u672f\u5185\u5bb9\u7684\u65b9\u5f0f\u2014\u2014\u800c\u975e\u8bed\u8a00\u5b66\u4e60\u8005\u7ffb\u8bd1\u8bcd\u6c47\u7684\u65b9\u5f0f\u3002\u987a\u5e8f\u56fa\u5b9a\uff0c\u56e0\u4e3a\u6bcf\u4e2a\u9636\u6bb5\u90fd\u4e3a\u4e0b\u4e00\u9636\u6bb5\u6784\u5efa\u5fc5\u8981\u7684\u8ba4\u77e5\u810f\u624b\u67b6\u3002' },
        { question: '\u4e3a\u4ec0\u4e48\u5fc5\u987b\u6309\u7167Read \u2192 Think \u2192 Speak \u2192 Write\u7684\u987a\u5e8f\uff1f', answer: '\u56e0\u4e3a\u8fd9\u662f\u53cc\u8bed\u8ba4\u77e5\u53d1\u5c55\u7684\u81ea\u7136\u987a\u5e8f\u3002\u9605\u8bfb\u6784\u5efa\u8f93\u5165\u80fd\u529b\uff0c\u601d\u8003\u6784\u5efa\u6982\u5ff5\u6846\u67b6\uff0c\u8868\u8fbe\u5c06\u6846\u67b6\u5916\u5316\uff0c\u5199\u4f5c\u5c06\u5176\u56fa\u5316\u4e3a\u6301\u4e45\u7684\u601d\u7ef4\u7ed3\u6784\u3002\u98a0\u5012\u987a\u5e8f\u4f1a\u4ea7\u751f\u6ca1\u6709\u6df1\u5ea6\u7684\u6d41\u5229\u2014\u2014\u5b69\u5b50\u542c\u8d77\u6765\u81ea\u4fe1\uff0c\u5374\u65e0\u6cd5\u72ec\u7acb\u63a8\u7406\u3002' },
        { question: '\u5b66\u751f\u5728The Loop\u6bcf\u4e2a\u9636\u6bb5\u5404\u82b1\u591a\u957f\u65f6\u95f4\uff1f', answer: '\u6bcf\u4e2a\u9636\u6bb5\u6301\u7eed4\u5468\u3002\u9605\u8bfb\uff1a\u76841\u20134\u5468\u3002\u601d\u8003\uff1a\u76845\u20138\u5468\u3002\u8868\u8fbe\uff1a\u76849\u201312\u5468\u3002\u5199\u4f5c\uff1a\u784813\u201316\u5468\u3002\u65e0\u8bba\u521d\u59cb\u80fd\u529b\u6c34\u5e73\u5982\u4f55\uff0c\u6bcf\u4f4d\u5b66\u751f\u90fd\u5b8c\u6574\u7ecf\u5386\u56db\u4e2a\u9636\u6bb5\u3002\u5185\u5bb9\u96be\u5ea6\u4f1a\u8c03\u6574\u2014\u2014\u6559\u5b66\u65b9\u6cd5\u4e0d\u4f1a\u3002' },
        { question: '\u968f\u7740\u5b66\u751f\u8fdb\u6b65\uff0cThe Loop\u4f1a\u6539\u53d8\u5417\uff1f', answer: '\u7ed3\u6784\u6c38\u4e0d\u6539\u53d8\uff0c\u5185\u5bb9\u590d\u6742\u5ea6\u4f1a\u63d0\u5347\u3002\u7b2c1\u5468Lexile 600L\u7684\u5b66\u751f\u4ecd\u7136\u9075\u5faaRead \u2192 Think \u2192 Speak \u2192 Write\u7684\u987a\u5e8f\uff0c\u4f46\u968f\u7740\u57fa\u7840\u6c34\u5e73\u63d0\u5347\uff0c\u6587\u672c\u3001\u63d0\u793a\u548c\u5199\u4f5c\u4efb\u52a1\u7684Lexile\u8303\u56f4\u4e0e\u5206\u6790\u8981\u6c42\u90fd\u4f1a\u76f8\u5e94\u589e\u52a0\u3002' },
        { question: 'The Loop\u4e0e\u5b69\u5b50\u5b66\u6821\u7684\u8bfe\u7a0b\u6709\u4f55\u4e0d\u540c\uff1f', answer: '\u5927\u591a\u6570\u5b66\u6821\u8bfe\u7a0b\u4ee5\u5355\u8bed\u8ba4\u77e5\u4e3a\u524d\u63d0\uff0c\u5c06\u9605\u8bfb\u548c\u5199\u4f5c\u4f5c\u4e3a\u72ec\u7acb\u6280\u80fd\u6765\u6559\u6388\u3002The Loop\u5c06\u5b83\u4eec\u89c6\u4e3a\u540c\u4e00\u8ba4\u77e5\u7cfb\u7edf\u4e2d\u76f8\u4e92\u4f9d\u5b58\u7684\u9636\u6bb5\u3002\u5b66\u6821\u53ef\u80fd\u6559\u6388\u7406\u89e3\u7b56\u7565\uff0cThe Loop\u5219\u6784\u5efa\u4f7f\u8fd9\u4e9b\u7b56\u7565\u81ea\u52a8\u5316\u7684\u601d\u7ef4\u7ed3\u6784\u3002' },
        { question: '\u5b69\u5b50\u53ef\u4ee5\u4ece\u4e2d\u95f4\u9636\u6bb5\u52a0\u5165\uff0c\u8fd8\u662f\u5fc5\u987b\u4ece Read \u5f00\u59cb\uff1f', answer: '\u6bcf\u4f4d\u5b66\u751f\u90fd\u4ece\u7b2c\u4e00\u9636\u6bb5\uff08Read\uff09\u5f00\u59cb\u3002\u5165\u5b66\u8bc4\u4f30\u51b3\u5b9a\u5185\u5bb9\u96be\u5ea6\u2014\u2014\u800c\u975e\u9636\u6bb5\u4f4d\u7f6e\u3002\u9ad8\u6c34\u5e73\u5b66\u751f\u5728\u76841\u20134\u5468\u4f1a\u9605\u8bfb\u66f4\u5177\u6311\u6218\u6027\u7684\u6587\u672c\uff0c\u4f46\u540c\u6837\u4ece Read \u5f00\u59cb\u3002The Loop\u662f\u4e00\u4e2a\u5e8f\u5217\uff0c\u4e0d\u662f\u4e00\u628a\u68af\u5b50\u3002' },
      ],
    },
    {
      id: 'navigators', label: '\u5bfc\u5e08\uff08Navigators\uff09',
      heading: '\u4ed6\u4eec\u662f\u8c01\u3001\u5982\u4f55\u5de5\u4f5c\uff0c\u4ee5\u53ca\u5982\u4f55\u4e0e\u60a8\u7684\u5b69\u5b50\u5339\u914d\u3002',
      variant: 'light', bg: '#F5F5FF',
      items: [
        { question: '\u5bfc\u5e08\uff08Navigator\uff09\u662f\u4ec0\u4e48\uff1f', answer: '\u5bfc\u5e08\u662f\u5b69\u5b50\u5728\u6574\u4e2a16\u5468\u5185\u7684\u4e13\u5c5e\u6307\u5bfc\u8001\u5e08\u3002\u4ed6\u4eec\u5f15\u9886\u5b69\u5b50\u7a7f\u8d8aThe Loop\u7684\u56db\u4e2a\u9636\u6bb5\uff0c\u8ffd\u8e2aLexile\u548c6+1\u7279\u8d28\u5199\u4f5c\u7684\u6210\u957f\u8f68\u8ff9\uff0c\u5b9e\u65f6\u8c03\u6574\u5185\u5bb9\u96be\u5ea6\uff0c\u5e76\u6bcf\u56db\u5468\u5411\u60a8\u6c47\u62a5\u8fdb\u5c55\u3002' },
        { question: '\u5bfc\u5e08\u4e0e\u666e\u901a\u8001\u5e08\u6216\u8865\u4e60\u8001\u5e08\u6709\u4ec0\u4e48\u533a\u522b\uff1f', answer: '\u8001\u5e08\u5411\u8bfe\u5802\u4f20\u6388\u8bfe\u7a0b\u5185\u5bb9\u3002\u8865\u4e60\u8001\u5e08\u5f25\u8865\u77e5\u8bc6\u6f0f\u6d1e\u3002\u5bfc\u5e08\u6784\u5efa\u8ba4\u77e5\u7cfb\u7edf\u3002\u4ed6\u4eec\u4e0d\u4f1a\u91cd\u590d\u5b66\u6821\u5df2\u6559\u8fc7\u7684\u5185\u5bb9\u2014\u2014\u800c\u662f\u641e\u5efa\u8ba9\u5b69\u5b50\u5145\u5206\u8fd0\u7528\u5df2\u6709\u77e5\u8bc6\u7684\u601d\u7ef4\u67b6\u6784\u3002' },
        { question: '\u5982\u4f55\u4e3a\u6211\u7684\u5b69\u5b50\u5339\u914d\u5bfc\u5e08\uff1f', answer: '\u5339\u914d\u57fa\u4e8e\u4e09\u9879\u8f93\u5165\uff1a\u5165\u5b66\u8bc4\u4f30\u7684Lexile\u57fa\u7840\u5206\u30016+1\u7279\u8d28\u5199\u4f5c\u5165\u95e8\u6c34\u5e73\uff0c\u4ee5\u53ca\u5bb6\u957f\u8bca\u65ad\u901a\u8bdd\u3002\u6211\u4eec\u4f9d\u636e\u8ba4\u77e5\u7279\u5f81\u8fdb\u884c\u5339\u914d\u2014\u2014\u800c\u975e\u6027\u683c\u76f8\u5408\u3002\u5b69\u5b50\u7684\u5bfc\u5e08\u662f\u6839\u636e\u5176\u5f15\u5bfc\u7279\u5b9a\u601d\u7ef4\u53d1\u5c55\u7684\u80fd\u529b\u6765\u9009\u62e9\u7684\u2014\u2014\u800c\u4e0d\u662f\u4e3a\u4e86\u6210\u4e3a\u5b69\u5b50\u7684\u670b\u53cb\u3002' },
        { question: '\u6574\u4e2a16\u5468\u5185\uff0c\u5b69\u5b50\u4f1a\u4e00\u76f4\u662f\u540c\u4e00\u4f4d\u5bfc\u5e08\u5417\uff1f', answer: '\u662f\u7684\u3002\u7a33\u5b9a\u6027\u4e0d\u53ef\u5987\u534f\u3002\u4e2d\u9014\u66f4\u6362\u5bfc\u5e08\u4f1a\u7834\u574f\u8ba4\u77e5\u5192\u9669\u6240\u9700\u7684\u4fe1\u4efb\u5173\u7cfb\u3002\u5982\u679c\u5339\u914d\u4e0d\u5f53\uff0c\u6211\u4eec\u4f1a\u5728\u76842\u5468\u89e3\u51b3\u2014\u2014\u800c\u4e0d\u662f\u7b2c10\u5468\u3002' },
        { question: '\u5bfc\u5e08\u7684\u5b66\u672f\u80cc\u666f\u5982\u4f55\uff1f', answer: '\u6bcf\u4f4d\u5bfc\u5e08\u5747\u6301\u6709\u6559\u80b2\u5b66\u3001\u8bed\u8a00\u5b66\u6216\u76f8\u5173\u9886\u57df\u7684\u7814\u7a76\u751f\u5b66\u4f4d\u3002\u5927\u591a\u6570\u5177\u5907\u6559\u6388\u53cc\u8bed\u5b66\u751f\u7684\u4e30\u5bcc\u7ecf\u9a8c\uff0c\u5747\u63a5\u53d7\u8fc7The Loop\u6559\u5b66\u6cd5\u57f9\u8bad\uff0c\u5e76\u901a\u8fc7Lexile\u8bc4\u4f30\u7ba1\u7406\u8ba4\u8bc1\u3002' },
        { question: '\u5bfc\u5e08\u5982\u4f55\u5728\u8bfe\u7a0b\u4e4b\u95f4\u8ffd\u8e2a\u5b69\u5b50\u7684\u8fdb\u5ea6\uff1f', answer: '\u5bfc\u5e08\u5728\u6bcf\u8282\u8bfe\u524d\u4f1a\u5ba1\u9605The Hangar\u7684\u6d3b\u52a8\u65e5\u5fd7\uff0c\u8ffd\u8e2a\u95ee\u9898\u56de\u7b54\u6a21\u5f0f\u3001\u4efb\u52a1\u5b8c\u6210\u65f6\u957f\u548c\u5185\u5bb9\u53c2\u4e0e\u5ea6\u3002\u8fd9\u4f7f\u4ed6\u4eec\u80fd\u591f\u5b9e\u65f6\u8c03\u6574\u4e0b\u4e00\u8282\u8bfe\u7684\u96be\u5ea6\u2014\u2014\u5b69\u5b50\u4e0d\u4f1a\u91cd\u590d\u5df2\u638c\u63e1\u7684\u5185\u5bb9\u3002' },
        { question: '\u5982\u679c\u5b69\u5b50\u4e0e\u5bfc\u5e08\u4e0d\u5408\u9002\u600e\u4e48\u529e\uff1f', answer: '\u76842\u5468\u65f6\u60a8\u5c31\u4f1a\u5bdf\u89c9\u3002\u5982\u679c\u5339\u914d\u4e0d\u5f53\uff0c\u6211\u4eec\u4f1a\u572848\u5c0f\u65f6\u5185\u91cd\u65b0\u5206\u914d\u3002\u76844\u5468\u540e\u91cd\u65b0\u5206\u914d\u4f1a\u5bf9\u8fdb\u5ea6\u9020\u6210\u5e72\u6270\uff0c\u4ec5\u5728\u7279\u6b8a\u60c5\u51b5\u4e0b\u8003\u8651\u3002\u8bca\u65ad\u901a\u8bdd\u7684\u76ee\u7684\u6b63\u662f\u4e3a\u4e86\u9884\u9632\u5339\u914d\u5931\u8bef\u2014\u2014\u8bf7\u5145\u5206\u5229\u7528\u5b83\u3002' },
      ],
    },
    {
      id: 'results', label: '\u5b66\u4e60\u6210\u679c\u4e0e\u6d4b\u91cf',
      heading: '\u60a8\u53ef\u4ee5\u671f\u5f85\u7684\u7ed3\u679c\u2014\u2014\u7528\u6570\u5b57\u800c\u975e\u627f\u8bfa\u3002',
      variant: 'dark', bg: '#0E0E12',
      items: [
        { question: '16\u5468\u540e\u53ef\u4ee5\u671f\u5f85\u4ec0\u4e48\u6837\u7684\u6210\u679c\uff1f', answer: (<span>\u4e00\u4e2a\u5e74\u7ea7\u7684Lexile\u589e\u957f\u2014\u201416\u5468\u5185\u63d0\u5347100L\u81f3150L\u3002\u8fd9\u662f\u5f3a\u5316\u5e72\u9884\u7684\u5faa\u8bc1\u57fa\u51c6\u3002\u5b69\u5b50\u57286+1\u7279\u8d28\u5199\u4f5c\u8bc4\u5206\u65b9\u9762\u4e5f\u4f1a\u6709\u53ef\u91cf\u5316\u7684\u63d0\u5347\u3002\u8be6\u89c1\u6211\u4eec\u7684{' '}<Link href={`/${locale}/methodology`} style={{ color: '#b7b5fe', fontWeight: 500 }}>\u6559\u5b66\u65b9\u6cd5</Link>{' '}\u9875\u9762\u3002</span>) },
        { question: 'Lexile\u6c34\u5e73\u662f\u4ec0\u4e48\uff1f\u5982\u4f55\u6d4b\u91cf\uff1f', answer: (<span>Lexile\u6c34\u5e73\u57280L\u81f32000L\u7684\u91cf\u8868\u4e0a\u91cf\u5316\u9605\u8bfb\u7406\u89e3\u80fd\u529b\uff0c\u901a\u8fc7\u8bc4\u4f30\u53e5\u5b50\u590d\u6742\u5ea6\u3001\u8bcd\u6c47\u96be\u5ea6\u548c\u6982\u5ff5\u5bc6\u5ea6\u7684\u6807\u51c6\u5316\u6d4b\u8bd5\u6765\u8861\u91cf\u3002DODO\u4f7f\u7528MetaMetrics\u8ba4\u8bc1\u7684Lexile\u8bc4\u4f30\u5de5\u5177\u3002\u8be6\u89c1\u6211\u4eec\u7684{' '}<Link href={`/${locale}/lexile`} style={{ color: '#b7b5fe', fontWeight: 500 }}>Lexile</Link>{' '}\u9875\u9762\u3002</span>) },
        { question: '6+1\u7279\u8d28\u5199\u4f5c\u6846\u67b6\u662f\u4ec0\u4e48\uff1f', answer: (<span>6+1\u7279\u8d28\u6846\u67b6\u4ece\u4e03\u4e2a\u7ef4\u5ea6\u8861\u91cf\u5199\u4f5c\uff1a\u60f3\u6cd5\u3001\u7ed3\u6784\u3001\u58f0\u97f3\u3001\u7528\u8bcd\u3001\u53e5\u5b50\u6d41\u7545\u5ea6\u3001\u89c4\u8303\u6027\u548c\u547c\u73b0\u3002DODO\u572816\u5468\u8bfe\u7a0b\u4e2d\u91cd\u70b9\u5173\u6ce8\u201c\u60f3\u6cd5\u201d\u3001\u201c\u7ed3\u6784\u201d\u548c\u201c\u58f0\u97f3\u201d\u4e09\u4e2a\u7ef4\u5ea6\u3002\u5b8c\u6574\u6846\u67b6\u6587\u6863\u8be6\u89c1{' '}<Link href={`/${locale}/methodology`} style={{ color: '#b7b5fe', fontWeight: 500 }}>\u6559\u5b66\u65b9\u6cd5</Link>{' '}\u9875\u9762\u3002</span>) },
        { question: '16\u5468\u5185\u5b9e\u9645\u4e0a\u80fd\u6709\u591a\u5c11Lexile\u589e\u957f\uff1f', answer: '\u4e00\u4e2a\u5e74\u7ea7\u2014\u2014100L\u81f3150L\u3002\u8fd9\u5bf9\u4e8eLexile 400L\u81f31000L\u4e4b\u95f4\u3001\u4fdd\u6301\u89c4\u5f8b\u51fa\u52e4\u7684\u5b66\u751f\u662f\u53ef\u4ee5\u5b9e\u73b0\u7684\u3002\u516816\u5468\u5185\u8d85\u8fc7150L\u7684\u589e\u957f\u662f\u53ef\u80fd\u7684\uff0c\u4f46\u5e76\u975e\u666e\u904d\u60c5\u51b5\u3002\u4f4e\u4e8e100L\u7684\u589e\u957f\u610f\u5473\u7740\u5185\u5bb9\u96be\u5ea6\u4e0e\u57fa\u7840\u80fd\u529b\u4e0d\u5339\u914d\u2014\u2014\u6211\u4eec\u4f1a\u7acb\u5373\u8c03\u6574\u3002' },
        { question: '\u5b69\u5b50\u4f55\u65f6\u63a5\u53d7\u8bc4\u4f30\uff1f\u7531\u8c01\u6765\u8fdb\u884c\uff1f', answer: '\u4e09\u6b21\u3002\u76840\u5468\uff1a\u7b2c\u4e00\u8282\u8bfe\u524d\u7684\u5165\u5b66\u8bc4\u4f30\u3002\u76848\u5468\uff1a\u8bfe\u7a0b\u4e2d\u671f\u68c0\u6d4b\u3002\u784816\u5468\uff1a\u7ed3\u8bfe\u8bc4\u4f30\u3002\u6240\u6709\u8bc4\u4f30\u5747\u7531\u5b69\u5b50\u7684\u5bfc\u5e08\u4f7f\u7528MetaMetrics\u8ba4\u8bc1\u5de5\u5177\u8fdb\u884c\u3002\u7ed3\u679c\u5c06\u5728\u6bcf\u6b21\u8bc4\u4f30\u540e72\u5c0f\u65f6\u5185\u4e0e\u60a8\u5206\u4eab\u3002' },
        { question: '\u5982\u679c\u5b69\u5b50\u6ca1\u6709\u660e\u663e\u8fdb\u6b65\u600e\u4e48\u529e\uff1f', answer: '\u5982\u679c\u5b69\u5b50\u5728\u76848\u5468\u7684Lexile\u589e\u957f\u4f4e\u4e8e50L\uff0c\u6211\u4eec\u4f1a\u542f\u52a8\u8bca\u65ad\u5ba1\u67e5\uff0c\u5305\u62ec\u5bb6\u957f\u6c9f\u901a\u3001\u5bfc\u5e08\u89c2\u5bdf\u548c\u5185\u5bb9\u96be\u5ea6\u5ba1\u6838\u3002\u5982\u679c\u95ee\u9898\u5728\u4e8e\u53c2\u4e0e\u5ea6\uff0c\u6211\u4eec\u4f1a\u8c03\u6574\u3002\u5982\u679c\u95ee\u9898\u5728\u4e8e\u53d1\u5c55\u51c6\u5907\u5ea6\uff0c\u6211\u4eec\u4f1a\u5c06\u5165\u5b66\u63a8\u8fdf\u5230\u4e0b\u4e00\u6279\u6b21\u5e76\u9000\u8fd8\u5269\u4f59\u4f59\u989d\u3002' },
        { question: 'DODO\u7684\u6d4b\u91cf\u65b9\u5f0f\u4e0e\u5b66\u6821\u6210\u7ee9\u5355\u6709\u4f55\u4e0d\u540c\uff1f', answer: '\u5b66\u6821\u6210\u7ee9\u8861\u91cf\u7684\u662f\u914d\u5408\u5ea6\u548c\u52aa\u529b\u7a0b\u5ea6\u3002Lexile\u5206\u6570\u8861\u91cf\u7684\u662f\u7406\u89e3\u80fd\u529b\u3002\u5b69\u5b50\u7684\u82f1\u8bed\u6210\u7ee9\u53ef\u80fd\u662fA\uff0c\u4f46\u9605\u8bfb\u6c34\u5e73\u5374\u4f4e\u4e8e\u5e74\u7ea7\u8981\u6c42\u3002DODO\u62a5\u544a\u7684\u662f\u5b69\u5b50\u7684\u5b9e\u9645\u80fd\u529b\u2014\u2014\u800c\u975e\u52aa\u529b\u7a0b\u5ea6\u3002' },
        { question: '\u8bfe\u7a0b\u671f\u95f4\u662f\u5426\u53ef\u4ee5\u67e5\u770b\u8bc4\u4f30\u7ed3\u679c\uff0c\u800c\u4e0d\u5fc5\u7b49\u5230\u6700\u540e\uff1f', answer: '\u662f\u7684\u3002\u60a8\u5c06\u5728\u76844\u30018\u300112\u548c16\u5468\u5206\u522b\u6536\u5230\u8fdb\u5ea6\u62a5\u544a\u3002\u6bcf\u4efd\u62a5\u544a\u5305\u542bLexile\u589e\u957f\u8f68\u8ff9\u30016+1\u7279\u8d28\u5199\u4f5c\u8bc4\u5206\u3001The Hangar\u53c2\u4e0e\u6570\u636e\u548c\u5bfc\u5e08\u89c2\u5bdf\u8bb0\u5f55\u3002\u6700\u7ec8\u8bc4\u4f30\u4e0d\u4f1a\u7ed9\u60a8\u5e26\u6765\u4efb\u4f55\u610f\u5916\u3002' },
      ],
    },
    {
      id: 'the-hangar', label: 'The Hangar',
      heading: '\u8bfe\u7a0b\u4e4b\u95f4\u53d1\u751f\u4e86\u4ec0\u4e48\u2014\u2014\u4ee5\u53caThe Hangar\u4e0d\u662f\u4ec0\u4e48\u3002',
      variant: 'light', bg: '#F5F5FF',
      items: [
        { question: 'The Hangar\u662f\u4ec0\u4e48\uff1f', answer: 'The Hangar\u662fDODO\u7684\u5f02\u6b65\u5b66\u4e60\u73af\u5883\u3002\u5b69\u5b50\u5728\u8fd9\u91cc\u5de9\u56fa\u5b9e\u65f6\u8bfe\u7a0b\u4e2d\u6240\u5b66\u7684\u5185\u5bb9\u2014\u2014\u72ec\u7acb\u7ec3\u4e60\uff0c\u56de\u987e\u5f55\u5236\u5185\u5bb9\uff0c\u5e76\u4e3aThe Loop\u7684\u4e0b\u4e00\u9636\u6bb5\u505a\u51c6\u5907\u3002\u5b83\u4e0d\u662f\u4f5c\u4e1a\u8f85\u5bfc\u95e8\u6237\uff0c\u800c\u662f\u4e00\u4e2a\u601d\u7ef4\u5de5\u4f5c\u7a7a\u95f4\u3002' },
        { question: 'The Hangar\u4e0e\u4f5c\u4e1a\u8f85\u5bfc\u4e00\u6837\u5417\uff1f', answer: '\u4e0d\u4e00\u6837\u3002The Hangar\u4e0d\u662f\u5b69\u5b50\u9047\u5230\u56f0\u96be\u65f6\u6c42\u52a9\u7684\u5730\u65b9\uff0c\u800c\u662f\u4fdd\u6301\u524d\u8fdb\u52a8\u529b\u7684\u5730\u65b9\u3002\u5b83\u63d0\u4f9b\u7ed3\u6784\u5316\u7ec3\u4e60\uff0c\u800c\u975e\u88ab\u52a8\u5f0f\u8f85\u5bfc\u3002' },
        { question: '\u5b69\u5b50\u6bcf\u5468\u5728The Hangar\u82b1\u591a\u5c11\u65f6\u95f4\uff1f', answer: '\u6bcf\u5468\u3030\u81f345\u5206\u949f\uff0c\u52062\u20133\u6b21\u8f83\u77ed\u7684\u5b66\u4e60\u65f6\u6bb5\u5b8c\u6210\u3002The Hangar\u7684\u8bbe\u8ba1\u7406\u5ff5\u662f\u6bcf\u65e5\u5fae\u7ec3\u4e60\uff0c\u800c\u975e\u4e00\u6b21\u6027\u5b8c\u6210\u7684\u957f\u65f6\u4f5c\u4e1a\u3002\u5927\u591a\u6570\u5b66\u751f\u5728\u8bfe\u7a0b\u95f4\u9694\u6bcf\u5929\u6295\u516510\u201315\u5206\u949f\u3002' },
        { question: 'The Hangar\u91cc\u6709\u5bfc\u5e08\u5728\u573a\u5417\uff1f', answer: '\u6ca1\u6709\u5b9e\u65f6\u5728\u573a\u3002\u5b69\u5b50\u7684\u5bfc\u5e08\u4f1a\u5ba1\u9605The Hangar\u7684\u6d3b\u52a8\u65e5\u5fd7\uff0c\u5e76\u7559\u4e0b\u5f02\u6b65\u53cd\u9988\u2014\u2014\u6587\u5b57\u8bc4\u8bed\u3001\u97f3\u9891\u7b14\u8bb0\u6216\u6279\u6ce8\u4f5c\u4e1a\u6837\u672c\u3002\u5982\u679c\u5b69\u5b50\u5728The Hangar\u63d0\u4ea4\u4e86\u5199\u4f5c\u8349\u7a3f\uff0c\u5bfc\u5e08\u4f1a\u5728\u4e0b\u4e00\u8282\u5b9e\u65f6\u8bfe\u7a0b\u524d\u7ed9\u4e88\u56de\u5e94\u3002' },
        { question: '\u5b69\u5b50\u5728\u8bfe\u7a0b\u4e4b\u95f4\u5177\u4f53\u505a\u4ec0\u4e48\uff1f', answer: '\u53d6\u51b3\u4e8e\u5f53\u524d\u6240\u5904\u7684\u9636\u6bb5\u3002\u9605\u8bfb\u9636\u6bb5\uff1a\u6ce8\u91ca\u6587\u672c\u5e76\u56de\u7b54\u7406\u89e3\u63d0\u793a\u3002\u601d\u8003\u9636\u6bb5\uff1a\u56de\u7b54\u5206\u6790\u6027\u95ee\u9898\u5e76\u68b3\u7406\u8bba\u8bc1\u7ed3\u6784\u3002\u8868\u8fbe\u9636\u6bb5\uff1a\u4f7f\u7528\u5f55\u97f3\u63d0\u793a\u7ec3\u4e60\u53e3\u5934\u56de\u7b54\u3002\u5199\u4f5c\u9636\u6bb5\uff1a\u8d77\u8349\u3001\u4fee\u6539\u548c\u5b8c\u5584\u4e66\u9762\u4f5c\u54c1\u3002' },
        { question: 'The Hangar\u6709\u76d1\u7ba1\u5417\uff1f', answer: '\u6709\u3002\u6240\u6709The Hangar\u6d3b\u52a8\u5747\u6709\u8bb0\u5f55\u5e76\u63a5\u53d7\u5ba1\u9605\u3002\u5185\u5bb9\u7ecf\u8fc7\u7cbe\u5fc3\u7b5b\u9009\u2014\u2014\u5b69\u5b50\u65e0\u6cd5\u8bbf\u95ee\u65e0\u5173\u6750\u6599\uff0c\u4e5f\u65e0\u6cd5\u4ee5\u975e\u7ed3\u6784\u5316\u65b9\u5f0f\u4e0e\u5176\u4ed6\u5b66\u751f\u6c9f\u901a\u3002The Hangar\u662f\u5b66\u4e60\u5de5\u4f5c\u7a7a\u95f4\uff0c\u4e0d\u662f\u793e\u4ea4\u5e73\u53f0\u3002' },
        { question: '\u5982\u679c\u5b69\u5b50\u5728The Hangar\u9047\u5230\u56f0\u96be\u600e\u4e48\u529e\uff1f', answer: 'The Hangar\u4e0d\u662f\u5b69\u5b50\u9047\u5230\u56f0\u96be\u65f6\u7684\u6c42\u52a9\u4e4b\u6240\uff0c\u800c\u662f\u4fdd\u6301\u524d\u8fdb\u7684\u5730\u65b9\u3002\u5982\u679c\u5b69\u5b50\u9047\u5230\u771f\u6b63\u7684\u6982\u5ff5\u969c\u788d\uff0c\u4ed6\u4eec\u53ef\u4ee5\u6807\u8bb0\u7ed9\u5bfc\u5e08\uff0c\u5bfc\u5e08\u4f1a\u5728\u4e0b\u4e00\u8282\u5b9e\u65f6\u8bfe\u7a0b\u4e2d\u89e3\u51b3\u3002The Hangar\u57f9\u517b\u72ec\u7acb\u6027\u2014\u2014\u800c\u975e\u4f9d\u8d56\u6027\u3002' },
      ],
    },
    {
      id: 'enrollment', label: '\u62a5\u540d\u4e0e\u8d39\u7528',
      heading: 'Charter\u62a5\u540d\u7684\u5168\u90e8\u5185\u5bb9\u2014\u2014\u65e0\u4efb\u4f55\u60ca\u559c\u3002',
      variant: 'dark', bg: '#212830',
      items: [
        { question: 'Charter\u62a5\u540d\u662f\u4ec0\u4e48\uff1f', answer: 'Charter\u62a5\u540d\u662fDODO\u7684\u521b\u59cb\u62a5\u540d\u6863\u4f4d\u3002\u5b83\u5305\u542b16\u5468\u8bfe\u7a0b\u7684\u5168\u90e8\u6743\u76ca\uff1a\u4e13\u5c5e\u5bfc\u5e08\u3001The Hangar\u5b66\u4e60\u7a7a\u95f4\u3001\u6240\u6709\u8bc4\u4f30\u5de5\u5177\u548c\u8fdb\u5ea6\u62a5\u544a\u3002Charter\u5bb6\u5ead\u8fd8\u5c06\u5728\u672a\u6765\u6279\u6b21\u4e2d\u4eab\u6709\u4f18\u5148\u5165\u5b66\u8d44\u683c\uff0c\u4ee5\u53ca\u8bfe\u7a0b\u6269\u5c55\u7684\u4f18\u5148\u4f53\u9a8c\u6743\u3002' },
        { question: '\u521b\u59cb\u5bb6\u5ead\u4ef7\u683c\u662f\u591a\u5c11\uff1f', answer: (<span>\u521b\u59cb\u5bb6\u5ead\u4ef7\u683c\u662f\u9762\u5411\u6bcf\u4e2a\u57ce\u5e02\u524d100\u4e2a\u62a5\u540d\u5bb6\u5ead\u7684\u4e13\u5c5e\u6863\u4f4d\u300116\u5468\u5b8c\u6574\u8bfe\u7a0b\u8d39\u7528\u4e3a{' '}<strong style={{ fontWeight: 600, color: '#F0F0F0' }}>$3,200</strong>\u3002\u524d100\u4e2a\u5bb6\u5ead\u540d\u989d\u5145\u6ee1\u540e\uff0c\u8d39\u7528\u5c06\u8c03\u6574\u4e3a\u6807\u51c6\u62a5\u540d\u4ef7\u683c\u3002</span>) },
        { question: '\u62a5\u540d\u8d39\u5305\u542b\u54ea\u4e9b\u5185\u5bb9\uff1f', answer: '\u5168\u90e8\u5185\u5bb9\u3002\u516816\u8282\u6bcf\u8282\u9090\u5206\u949f\u7684\u5bfc\u5e08\u5b9e\u65f6\u8bfe\u7a0b\u3001The Hangar\u5168\u7a0b\u4f7f\u7528\u6743\u3001\u5165\u5b66/\u4e2d\u671f/\u7ed3\u8bfe\u4e09\u6b21\u8bc4\u4f30\u3001\u56db\u4efd\u8fdb\u5ea6\u62a5\u544a\u3001\u8bfe\u7a0b\u5f55\u50cf\u6863\u6848\u3002\u6ca1\u6709\u9644\u52a0\u8d39\u7528\uff0c\u6ca1\u6709\u6750\u6599\u8d39\uff0c\u6ca1\u6709\u9690\u6027\u6536\u8d39\u3002' },
        { question: '\u9664\u8bfe\u7a0b\u8d39\u7528\u5916\u662f\u5426\u6709\u5176\u4ed6\u8d39\u7528\uff1f', answer: '\u6ca1\u6709\u3002\u62a5\u540d\u8d39\u6db5\u76d6\u6574\u4e2a16\u5468\u8bfe\u7a0b\u7684\u5168\u90e8\u5185\u5bb9\u3002\u60a8\u4e0d\u9700\u8981\u53e6\u5916\u8d2d\u4e70\u4e66\u7c4d\u3001\u8f6f\u4ef6\u6388\u6743\u6216\u8865\u5145\u6750\u6599\u3002\u5982\u679c\u5b69\u5b50\u9700\u8981\u7279\u6b8a\u5b89\u6392\u2014\u2014\u5ef6\u957f\u8bfe\u7a0b\u65f6\u957f\u3001\u7ffb\u8bd1\u6750\u6599\u3001\u8f85\u52a9\u6280\u672f\u2014\u2014\u8fd9\u4e9b\u5747\u514d\u8d39\u5305\u542b\u5728\u5185\u3002' },
        { question: '\u4ed8\u6b3e\u65b9\u5f0f\u6709\u54ea\u4e9b\uff1f', answer: (<span>\u4e24\u79cd\u65b9\u5f0f\u53ef\u9009\u3002\u62a5\u540d\u65f6\u4e00\u6b21\u6027\u4ed8\u6e05\u2014\u2014Charter\u62a5\u540d{' '}<strong style={{ fontWeight: 600, color: '#F0F0F0' }}>$3,200</strong>\u3002\u6216\u5206\u671f\u4ed8\u6b3e\u2014\u2014\u62a5\u540d\u65f6\u652f\u4ed8{' '}<strong style={{ fontWeight: 600, color: '#F0F0F0' }}>$1,700</strong>\uff0c\u76848\u5468\u652f\u4ed8{' '}<strong style={{ fontWeight: 600, color: '#F0F0F0' }}>$1,500</strong>\u3002\u4e0d\u63d0\u4f9b\u4e24\u671f\u4ee5\u4e0a\u7684\u5206\u671f\u65b9\u6848\u3002</span>) },
        { question: '\u9000\u6b3e\u653f\u7b56\u662f\u4ec0\u4e48\uff1f', answer: '\u7b2c\u4e00\u8282\u8bfe\u524d\u53d6\u6d88\uff0c\u5168\u989d\u9000\u6b3e\u3002\u76844\u5468\u524d\u53d6\u6d88\uff0c\u9000\u6b3e50%\u3002\u76844\u5468\u540e\u4e0d\u4e88\u9000\u6b3e\u3002\u5982\u679cDODO\u56e0\u7f3a\u4e4f\u53ef\u91cf\u5316\u8fdb\u6b65\u800c\u4e3b\u52a8\u7ec8\u6b62\u8bfe\u7a0b\uff0c\u5c06\u6309\u5269\u4f59\u5468\u6b21\u6bd4\u4f8b\u9000\u6b3e\u3002' },
        { question: '\u53ef\u4ee5\u5728\u6279\u6b21\u4e2d\u9014\u52a0\u5165\u5417\uff1f', answer: '\u4e0d\u53ef\u4ee5\u3002\u6bcf\u4f4d\u5b66\u751f\u90fd\u4ece\u7b2c\u4e00\u5468\u5f00\u59cb\u3002The Loop\u662f\u4e00\u4e2a\u5e8f\u5217\u2014\u2014\u4e2d\u9014\u52a0\u5165\u610f\u5473\u7740\u8df3\u8fc7\u9636\u6bb5\uff0c\u8fd9\u4f1a\u7834\u574f\u6559\u5b66\u65b9\u6cd5\u7684\u5b8c\u6574\u6027\u3002\u5982\u679c\u5f53\u524d\u6279\u6b21\u5df2\u5f00\u8bfe\uff0c\u60a8\u5c06\u88ab\u5b89\u6392\u8fdb\u5165\u4e0b\u4e00\u4e2a\u53ef\u7528\u6279\u6b21\u3002' },
        { question: '\u6709\u5019\u8865\u540d\u5355\u5417\uff1f', answer: '\u4ec5\u5f53\u5f53\u524d\u6279\u6b21\u5df2\u6ee1\u65f6\u624d\u6709\u5019\u8865\u3002DODO\u5728\u6bcf\u4e2a\u57ce\u5e02\u6bcf6\u20138\u5468\u5f00\u8bbe\u65b0\u6279\u6b21\u3002\u5019\u8865\u5bb6\u5ead\u5c06\u83b7\u5f97\u4e0b\u4e00\u6279\u6b21\u7684\u4f18\u5148\u62a5\u540d\u8d44\u683c\uff0c\u4ee5\u53ca\u5728\u516c\u5f00\u62a5\u540d\u524d48\u5c0f\u65f6\u7684\u62a2\u5148\u62a5\u540d\u7a97\u53e3\u3002' },
        { question: '16\u5468\u7ed3\u675f\u540e\u662f\u5426\u6709\u7eed\u8bfe\u9009\u9879\uff1f', answer: '\u6709\u3002\u5b8c\u6210\u516816\u5468\u8bfe\u7a0b\u4e14Lexile\u6709\u53ef\u91cf\u5316\u589e\u957f\u7684\u5b66\u751f\uff0c\u53ef\u4ee5\u62a5\u540d\u201c\u9ad8\u9636\u5faa\u73af\uff08Advanced Loop\uff09\u201d\u2014\u2014\u4e00\u4e2a\u5185\u5bb9\u96be\u5ea6\u66f4\u9ad8\u7684\u5ef6\u4f38\u8bfe\u7a0b\u3002\u8be6\u60c5\u5c06\u5728\u784816\u5468\u7ed3\u8bfe\u8bc4\u4f30\u56de\u987e\u65f6\u4e0e\u60a8\u5206\u4eab\u3002' },
      ],
    },
    {
      id: 'bilingual', label: '\u53cc\u8bed\u53d1\u5c55',
      heading: '\u57f9\u517b\u53cc\u8bed\u601d\u7ef4\u8005\u800c\u975e\u53cc\u8bed\u53e3\u8bed\u8005\u7684\u79d1\u5b66\u4f9d\u636e\u3002',
      variant: 'light', bg: '#F5F5FF',
      items: [
        { question: '\u5728\u5bb6\u8bf4\u4e2d\u6587\u4f1a\u5f71\u54cd\u5b69\u5b50\u7684\u82f1\u8bed\u53d1\u5c55\u5417\uff1f', answer: '\u4e0d\u4f1a\u3002\u7814\u7a76\u8868\u660e\uff0c\u4fdd\u6301\u7b2c\u4e00\u8bed\u8a00\u7684\u71ac\u7ec3\u7a0b\u5ea6\u80fd\u591f\u5f3a\u5316\u7b2c\u4e8c\u8bed\u8a00\u7684\u4e60\u5f97\u3002\u95ee\u9898\u4e0d\u5728\u4e8e\u5728\u5bb6\u8bf4\u4e2d\u6587\u2014\u2014\u800c\u5728\u4e8e\u8ba4\u77e5\u53d1\u5c55\u7684\u788e\u7247\u5316\u3002\u5982\u679c\u5b69\u5b50\u5728\u4f1a\u8bdd\u5c42\u9762\u5b66\u82f1\u8bed\uff0c\u5374\u5728\u5b66\u672f\u601d\u7ef4\u5c42\u9762\u4f9d\u8d56\u4e2d\u6587\uff0c\u4ed6\u4eec\u4f1a\u5f62\u6210\u4e24\u5957\u4e0d\u5b8c\u6574\u7684\u7cfb\u7edf\u3002DODO\u57f9\u517b\u7684\u662f\u53cc\u8bed\u601d\u7ef4\u2014\u2014\u800c\u975e\u53cc\u8bed\u53e3\u8bed\u3002' },
        { question: '\u53cc\u8bed\u6d41\u5229\u4e0e\u53cc\u8bed\u601d\u7ef4\u6709\u4ec0\u4e48\u533a\u522b\uff1f', answer: '\u53cc\u8bed\u6d41\u5229\u662f\u6307\u80fd\u591f\u8bf4\u4e24\u79cd\u8bed\u8a00\u3002\u53cc\u8bed\u601d\u7ef4\u662f\u6307\u80fd\u591f\u5728\u4e24\u79cd\u8bed\u8a00\u4e2d\u8fdb\u884c\u63a8\u7406\u3001\u5206\u6790\u548c\u89e3\u51b3\u95ee\u9898\u3002\u5b69\u5b50\u53ef\u80fd\u82f1\u8bed\u53e3\u8bed\u6d41\u5229\uff0c\u4f46\u4ecd\u7136\u5728\u9605\u8bfb\u7406\u89e3\u3001\u6587\u7ae0\u5199\u4f5c\u6216\u62bd\u8c61\u63a8\u7406\u65b9\u9762\u611f\u5230\u5439\u529b\u3002\u6d41\u5229\u662f\u8868\u5c42\u73b0\u8c61\uff0c\u601d\u7ef4\u662f\u7ed3\u6784\u5c42\u9762\u7684\u80fd\u529b\u3002' },
        { question: '\u6211\u7684\u5b69\u5b50\u82f1\u8bed\u53e3\u8bed\u5f88\u6d41\u5229\u2014\u2014\u4e3a\u4ec0\u4e48\u5b66\u4e1a\u4e0a\u8fd8\u662f\u56f0\u96be\uff1f', answer: '\u56e0\u4e3a\u4f1a\u8bdd\u6d41\u5229\u548c\u5b66\u672f\u8ba4\u77e5\u4e0d\u662f\u540c\u4e00\u79cd\u80fd\u529b\u3002\u5b69\u5b50\u53ef\u80fd\u5728\u82f1\u8bed\u793e\u4ea4\u573a\u5408\u4e2d\u5e94\u5bf9\u81ea\u5982\uff0c\u5374\u4ecd\u5728\u4e2d\u6587\u4e2d\u5904\u7406\u590d\u6742\u6587\u672c\u3001\u903b\u8f91\u8bba\u8bc1\u548c\u4e66\u9762\u5206\u6790\u3002DODO\u8bad\u7ec3\u7684\u662f\u5b66\u672f\u82f1\u8bed\u6240\u9700\u7684\u8ba4\u77e5\u67b6\u6784\u2014\u2014\u800c\u975e\u65e5\u5e38\u4f1a\u8bdd\u6240\u9700\u7684\u8bcd\u6c47\u91cf\u3002' },
        { question: 'DODO\u5982\u4f55\u770b\u5f85\u4e2d\u82f1\u6587\u7684\u8bed\u8a00\u5173\u7cfb\uff1f', answer: 'DODO\u5c06\u4e2d\u6587\u548c\u82f1\u6587\u89c6\u4e3a\u76f8\u4e92\u4f9d\u5b58\u7684\u8ba4\u77e5\u7cfb\u7edf\u2014\u2014\u800c\u975e\u76f8\u4e92\u7ade\u4e89\u7684\u8bed\u8a00\u3002The Loop\u4e0d\u662f\u7528\u82f1\u8bed\u601d\u7ef4\u53d6\u4ee3\u4e2d\u6587\u601d\u7ef4\uff0c\u800c\u662f\u6784\u5efa\u4e00\u4e2a\u53cc\u8bed\u8ba4\u77e5\u6846\u67b6\uff0c\u8ba9\u5b69\u5b50\u65e2\u80fd\u7528\u82f1\u8bed\u8fdb\u884c\u5b66\u672f\u63a8\u7406\uff0c\u53c8\u80fd\u4fdd\u6301\u4e2d\u6587\u6d41\u5229\u3002\u8fd9\u4e0d\u662f\u8bed\u8a00\u6559\u5b66\uff0c\u800c\u662f\u8ba4\u77e5\u67b6\u6784\u7684\u5efa\u8bbe\u3002' },
        { question: '\u53cc\u8bed\u601d\u7ef4\u53d1\u5c55\u5728\u4ec0\u4e48\u5e74\u9f84\u6700\u6709\u6548\uff1f', answer: '\u5c0f\u5b66\u4e09\u5e74\u7ea7\u81f3\u521d\u4e2d\u4e8c\u5e74\u7ea7\u2014\u2014\u52048\u81f314\u5c81\u3002\u8fd9\u662f\u5b66\u672f\u8ba4\u77e5\u56fa\u5316\u7684\u5173\u952e\u7a97\u53e3\u671f\u30028\u5c81\u4e4b\u524d\uff0c\u5b69\u5b50\u4ecd\u5728\u53d1\u5c55\u57fa\u7840\u8bfb\u5199\u80fd\u529b\uff1b14\u5c81\u4e4b\u540e\uff0c\u8ba4\u77e5\u6a21\u5f0f\u57fa\u672c\u5b9a\u578b\u3002The Loop\u4e4b\u6240\u4ee5\u6709\u6548\uff0c\u662f\u56e0\u4e3a\u5b83\u5728\u53cc\u8bed\u601d\u7ef4\u67b6\u6784\u4ecd\u53ef\u6784\u5efa\u7684\u786e\u5207\u53d1\u5c55\u7a97\u53e3\u671f\u5185\u8fdb\u884c\u5e72\u9884\u3002' },
        { question: '\u7814\u7a76\u5982\u4f55\u8bc4\u4ef7\u53cc\u8bed\u5b66\u751f\u7684\u5b66\u4e1a\u8868\u73b0\uff1f', answer: '\u5728\u4e24\u79cd\u8bed\u8a00\u4e2d\u5747\u5177\u5907\u5b66\u672f\u719f\u7ec3\u5ea6\u7684\u53cc\u8bed\u5b66\u751f\uff0c\u5728\u6267\u884c\u529f\u80fd\u3001\u8ba4\u77e5\u7075\u6d3b\u6027\u548c\u95ee\u9898\u89e3\u51b3\u80fd\u529b\u65b9\u9762\u4f18\u4e8e\u5355\u8bed\u540c\u9f84\u3002\u8fd9\u79cd\u4f18\u52bf\u4e0d\u6765\u81ea\u53cc\u8bed\u672c\u8eab\u2014\u2014\u800c\u6765\u81ea\u540c\u65f6\u7ba1\u7406\u4e24\u5957\u8bed\u8a00\u7cfb\u7edf\u6240\u9700\u7684\u8ba4\u77e5\u590d\u6742\u5ea6\u3002DODO\u6709\u610f\u8bc6\u5730\u6784\u5efa\u8fd9\u79cd\u590d\u6742\u5ea6\u3002' },
        { question: 'DODO\u80fd\u5e2e\u52a9\u5b69\u5b50\u5728\u63d0\u5347\u82f1\u8bed\u7684\u540c\u65f6\u7ef4\u6301\u4e2d\u6587\u5417\uff1f', answer: 'DODO\u4e0d\u6559\u4e2d\u6587\u3002\u4f46\u901a\u8fc7\u6784\u5efa\u53cc\u8bed\u601d\u7ef4\u80fd\u529b\uff0c\u5b83\u80fd\u591f\u5f3a\u5316\u5b69\u5b50\u5728\u4e24\u79cd\u8bed\u8a00\u4e2d\u8fd0\u4f5c\u7684\u80fd\u529b\u3002\u4e00\u4e2a\u80fd\u591f\u5206\u6790\u6587\u672c\u3001\u6784\u5efa\u8bba\u70b9\u3001\u7528\u82f1\u8bed\u64b0\u5199\u7ed3\u6784\u5316\u6587\u7ae0\u7684\u5b66\u751f\uff0c\u53ef\u4ee5\u5c06\u8fd9\u4e9b\u8ba4\u77e5\u6280\u80fd\u8fc1\u79fb\u56de\u4e2d\u6587\u3002\u601d\u7ef4\u7ed3\u6784\u662f\u53ef\u4ee5\u8de8\u8bed\u8a00\u8fc1\u79fb\u7684\u3002' },
      ],
    },
    {
      id: 'cities', label: '\u57ce\u5e02\u4e0e\u8bfe\u7a0b\u5b89\u6392',
      heading: 'DODO\u7684\u5f00\u8bfe\u57ce\u5e02\u4e0e\u65f6\u95f4\u5b89\u6392\u3002',
      variant: 'dark', bg: '#0E0E12',
      items: [
        { question: 'DODO\u76ee\u524d\u5728\u54ea\u4e9b\u57ce\u5e02\u5f00\u8bbe\u8bfe\u7a0b\uff1f', answer: '\u516d\u4e2a\u6d77\u5916\u534e\u4eba\u805a\u5c45\u57ce\u5e02\uff1a\u6e29\u54e5\u534e\u3001\u5217\u6cbb\u6587\uff08\u4e0d\u5217\u98a0\u54e5\u4f26\u6bd4\u4e9a\u7701\uff09\u3001\u4e07\u9526\u5e02\u3001\u591a\u4f26\u591a\u3001\u65e7\u91d1\u5c71\u6e7e\u533a\u548c\u6d1b\u6749\u77f6\u3002\u8fd9\u4e9b\u57ce\u5e02\u662f\u5317\u7f8e\u53cc\u8bed\u4e2d\u82f1\u6587\u5bb6\u5ead\u6700\u96c6\u4e2d\u7684\u5730\u533a\u3002\u8ba1\u5212\u4e8e2027\u5e74\u6269\u5c55\u81f3\u66f4\u591a\u57ce\u5e02\u3002' },
        { question: '\u8bfe\u7a0b\u5728\u54ea\u4e2a\u65f6\u533a\u8fdb\u884c\uff1f', answer: '\u8bfe\u7a0b\u6309\u60a8\u6240\u5728\u5730\u7684\u672c\u5730\u65f6\u533a\u5b89\u6392\u3002\u6e29\u54e5\u534e\u548c\u5217\u6cbb\u6587\u6279\u6b21\u4f7f\u7528\u592a\u5e73\u6d0b\u65f6\u533a\uff0c\u591a\u4f26\u591a\u548c\u4e07\u9526\u6279\u6b21\u4f7f\u7528\u4e1c\u90e8\u65f6\u533a\uff0c\u65e7\u91d1\u5c71\u548c\u6d1b\u6749\u77f6\u6279\u6b21\u4f7f\u7528\u592a\u5e73\u6d0b\u65f6\u533a\u3002\u5b69\u5b50\u4e0d\u4f1a\u5728\u672c\u5730\u4e0d\u5408\u7406\u7684\u65f6\u95f4\u6bb5\u4e0a\u8bfe\u3002' },
        { question: '\u4e0d\u540c\u65f6\u533a\u7684\u5b66\u751f\u53ef\u4ee5\u52a0\u5165\u540c\u4e00\u6279\u6b21\u5417\uff1f', answer: '\u4e0d\u53ef\u4ee5\u3002\u6279\u6b21\u6309\u57ce\u5e02\u5212\u5206\u3002\u6e29\u54e5\u534e\u7684\u5b66\u751f\u65e0\u6cd5\u52a0\u5165\u591a\u4f26\u591a\u6279\u6b21\u3002\u8fd9\u786e\u4fdd\u540c\u4e00\u6279\u6b21\u7684\u6240\u6709\u5b66\u751f\u90fd\u5728\u517c\u5bb9\u7684\u65f6\u95f4\u5b89\u6392\u548c\u6587\u5316\u80cc\u666f\u4e0b\u5171\u540c\u5b66\u4e60\u3002' },
        { question: '\u8bfe\u7a0b\u901a\u8fc7\u4ec0\u4e48\u5e73\u53f0\u8fdb\u884c\u2014\u2014ClassIn\u3001Zoom\u8fd8\u662f\u5176\u4ed6\uff1f', answer: '\u8bfe\u7a0b\u901a\u8fc7DODO\u81ea\u6709\u5e73\u53f0\u8fdb\u884c\uff0c\u96c6\u6210\u4e86\u5b9e\u65f6\u89c6\u9891\u3001\u5c4f\u5e55\u5171\u4eab\u3001\u534f\u4f5c\u6ce8\u91ca\u548c\u8bfe\u7a0b\u5f55\u5236\u529f\u80fd\u3002\u60a8\u4e0d\u9700\u8981\u5b89\u88c5ClassIn\u3001Zoom\u6216\u4efb\u4f55\u7b2c\u4e09\u65b9\u8f6f\u4ef6\uff0c\u4e00\u5207\u90fd\u5728\u6d4f\u89c8\u5668\u4e2d\u8fd0\u884c\u3002' },
        { question: '\u6709\u54ea\u4e9b\u53ef\u7528\u7684\u4e0a\u8bfe\u65f6\u95f4\uff1f', answer: '\u5de5\u4f5c\u65e5\u5088\u665a\uff08\u672c\u5730\u65f6\u95f4\u4e0b\u534516\u65f6\u81f320\u65f6\uff09\u548c\u5468\u672b\u4e0a\u5348\uff08\u672c\u5730\u65f6\u95f4\u4e0a\u53489\u65f6\u81f312\u65f6\uff09\u3002\u5177\u4f53\u4e0a\u8bfe\u65f6\u95f4\u5728\u8bca\u65ad\u901a\u8bdd\u671f\u95f4\u6839\u636e\u60a8\u7684\u65e5\u7a0b\u548c\u5bfc\u5e08\u53ef\u7528\u6027\u786e\u5b9a\u3002\u4e00\u65e6\u786e\u5b9a\uff0c\u8bfe\u7a0b\u65f6\u95f4\u5728\u6574\u4e2a16\u5468\u5185\u4fdd\u6301\u56fa\u5b9a\u3002' },
        { question: '\u5b66\u6821\u5047\u671f\u671f\u95f4\u8bfe\u7a0b\u7167\u5e38\u8fdb\u884c\u5417\uff1f', answer: '\u4e0d\u8fdb\u884c\u3002DODO\u9075\u5b88\u5404\u57ce\u5e02\u7684\u4e3b\u8981\u5b66\u6821\u5047\u671f\u2014\u2014\u5bd2\u5047\u3001\u6625\u5047\u548c\u6691\u5047\u3002\u5982\u679c\u5047\u671f\u6070\u9022\u6279\u6b21\u8fdb\u884c\u4e2d\uff0c\u8be5\u5468\u8df3\u8fc7\uff0c\u8bfe\u7a0b\u987a\u5ef617\u5468\u3002\u5047\u671f\u8c03\u6574\u5b89\u6392\u5c06\u5728\u62a5\u540d\u65f6\u544a\u77e5\u60a8\u3002' },
        { question: '\u5728\u4f18\u5148\u540d\u5355\u4e4b\u5916\u7684\u57ce\u5e02\u4e5f\u80fd\u62a5\u540d\u5417\uff1f', answer: '\u6682\u65f6\u4e0d\u884c\u3002\u5f53\u524d\u8bfe\u7a0b\u4e13\u4e3a\u4ee5\u4e0a\u516d\u4e2a\u6d77\u5916\u534e\u4eba\u805a\u5c45\u57ce\u5e02\u4f18\u5316\u3002\u5982\u679c\u60a8\u5c45\u4f4f\u5728\u8fd9\u4e9b\u57ce\u5e02\u4e4b\u5916\uff0c\u53ef\u4ee5\u52a0\u5165\u672a\u6765\u6269\u5c55\u7684\u5019\u8865\u540d\u5355\u3002DODO\u5c06\u5728\u60a8\u6240\u5728\u5730\u533a\u5f00\u653e\u62a5\u540d\u65f6\u901a\u77e5\u60a8\u3002' },
      ],
    },
  ]
}

// ─── MAIN EXPORT ────────────────────────────────────────────
export default function FAQClient({ locale = 'en' }) {
  const [searchQuery,    setSearchQuery]    = useState('')
  const [activeCategory, setActiveCategory] = useState('')

  const ui         = UI[locale] ?? UI.en
  const categories = locale === 'zh' ? CATEGORIES_ZH : CATEGORIES_EN
  const sections   = useMemo(
    () => locale === 'zh' ? buildSectionsZH(locale) : buildSectionsEN(locale),
    [locale]
  )
  const allItems = useMemo(
    () => sections.flatMap((s) => s.items.map((item) => ({ ...item, _category: s.label, _sectionId: s.id }))),
    [sections]
  )

  const trimmed = searchQuery.trim().toLowerCase()
  const searchResults = useMemo(() => {
    if (!trimmed) return []
    return allItems.filter((item) => {
      const q = item.question.toLowerCase()
      const a = typeof item.answer === 'string' ? item.answer.toLowerCase() : ''
      return q.includes(trimmed) || a.includes(trimmed)
    })
  }, [trimmed, allItems])

  const isSearching = trimmed.length > 0

  return (
    <div className="w-full overflow-hidden" style={{ fontFamily: 'var(--font-latin)' }}>

      {/* ── S1 HERO + SEARCH ────────────────────────────────── */}
      <section style={{ backgroundColor: '#212830' }}>
        <div className="max-w-[680px] mx-auto text-center px-6"
          style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', paddingBottom: '64px' }}>
          <div style={{ fontFamily: 'var(--font-latin)', fontSize: '12px', fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b7b5fe', marginBottom: '24px' }}>
            {ui.eyebrow}
          </div>
          <h1 style={{ fontFamily: 'var(--font-latin)', fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2, letterSpacing: '-0.03em', marginBottom: '16px' }}>
            {ui.h1}
          </h1>
          <p className="max-w-[520px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontSize: '16px',
            fontWeight: 400, color: 'rgba(240,240,240,0.60)', lineHeight: 1.6, marginBottom: '20px' }}>
            {ui.subhead}
          </p>
          <form role="search" className="max-w-[560px] mx-auto mt-5" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="faq-search" className="sr-only">{ui.placeholder}</label>
            <div className="relative">
              <IconSearch style={{ position: 'absolute', left: '16px', top: '50%',
                transform: 'translateY(-50%)', color: '#b7b5fe', pointerEvents: 'none' }} />
              <input id="faq-search" type="search" value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={ui.placeholder}
                className="w-full h-[52px] pl-12 pr-12 rounded-lg transition-colors"
                style={{ fontFamily: 'var(--font-latin)', fontSize: '16px', fontWeight: 400,
                  backgroundColor: '#2E3848', border: '1.5px solid rgba(183,181,254,0.30)',
                  color: '#F0F0F0', outline: 'none' }}
                onFocus={(e) => { e.target.style.borderColor = '#b7b5fe' }}
                onBlur={(e)  => { e.target.style.borderColor = 'rgba(183,181,254,0.30)' }} />
              <IconArrowRight style={{ position: 'absolute', right: '16px', top: '50%',
                transform: 'translateY(-50%)', color: '#b7b5fe', pointerEvents: 'none' }} />
            </div>
          </form>
        </div>
      </section>

      {/* ── S2 CATEGORY NAV ───────────────────────────────────── */}
      <CategoryBar active={activeCategory} onSelect={setActiveCategory} categories={categories} />

      {/* ── SEARCH RESULTS or SECTIONED LAYOUT ─────────────── */}
      {isSearching ? (
        <SearchResults results={searchResults} query={trimmed} ui={ui} />
      ) : (
        <>
          {sections.map((section) => {
            const isDark = section.variant === 'dark'
            return (
              <section key={section.id} id={section.id} className="px-6 py-16"
                style={{ backgroundColor: section.bg }}>
                <div className="max-w-[800px] mx-auto">
                  <Eyebrow dark={isDark}>{section.label}</Eyebrow>
                  <SectionH2 dark={isDark}>{section.heading}</SectionH2>
                  <AccordionGroup items={section.items} variant={section.variant} groupId={section.id} />
                </div>
              </section>
            )
          })}
        </>
      )}

      {/* ── S11 STILL HAVE A QUESTION ─────────────────────────── */}
      <section className="px-6" style={{ backgroundColor: '#F5F5FF', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-[560px] mx-auto text-center">
          <Eyebrow>{ui.stillEyebrow}</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-latin)', fontSize: '32px', fontWeight: 700,
            color: '#0E0E12', letterSpacing: '-0.02em', marginBottom: '16px' }}>
            {ui.stillH2}
          </h2>
          <p className="max-w-[480px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontSize: '17px',
            fontWeight: 400, color: '#212830', lineHeight: 1.6, marginBottom: '28px' }}>
            {ui.stillSub}
          </p>
          <Link href={`/${locale}/consult`} className="inline-block rounded-lg transition-all hover:opacity-90"
            style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '16px',
              backgroundColor: '#F5C842', color: '#0E0E12', padding: '16px 32px', textDecoration: 'none' }}>
            {ui.ctaButton}
          </Link>
          <div style={{ marginTop: '14px' }}>
            <a href="mailto:hello@dodolearning.com"
              style={{ fontFamily: 'var(--font-latin)', fontSize: '14px', fontWeight: 400, color: '#5856cc' }}>
              {ui.emailLink}
            </a>
          </div>
        </div>
      </section>

      {/* ── S12 CLOSING CTA ───────────────────────────────────── */}
      <section className="px-6" style={{ backgroundColor: '#212830', paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="max-w-[580px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontSize: '32px',
            fontWeight: 700, color: '#b7b5fe', lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            {ui.closingH2}
          </h2>
          <p className="max-w-[480px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontSize: '16px',
            fontWeight: 400, color: 'rgba(240,240,240,0.70)', lineHeight: 1.6, marginBottom: '32px' }}>
            {ui.closingSub}
          </p>
          <Link href={`/${locale}/consult`} className="inline-block rounded-lg transition-all hover:opacity-90"
            style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '16px',
              backgroundColor: '#F5C842', color: '#0E0E12', padding: '16px 32px', textDecoration: 'none' }}>
            {ui.ctaButton}
          </Link>
          <p style={{ fontFamily: 'var(--font-latin)', fontSize: '13px', fontWeight: 400,
            color: '#b7b5fe', marginTop: '14px' }}>
            {ui.closingMicro}
          </p>
        </div>
      </section>

    </div>
  )
}