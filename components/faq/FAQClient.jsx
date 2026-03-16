'use client'

// components/faq/FAQClient.jsx
//
// Owns all FAQ interactivity:
//   - Search bar (S1) — filters across all categories
//   - Category nav (S2) — sticky, scrolls to section on click
//   - FAQAccordion (S3–S10) — per-item open/close, light + dark variants
//   - S11 Still Here + S12 Closing CTA — static, but co-located here
//     since data lives in this file
//
// Figma source: FAQ App.tsx — tUKokxMK9eHkSortCPKzTX
// All measurements, colours, and type specs taken verbatim.
//
// Figma → Next.js adaptations:
//   lucide Search/ArrowRight → inline SVGs
//   button → <Link href="/consult">
//   FAQAccordion component → AccordionItem primitive inlined
//   CategoryNav component → CategoryBar inlined
//   SectionWrapper → inline style + Section primitive
//   answer JSX nodes with <a> links → kept as JSX (valid in client component)
//
// Content: TODO: migrate to content/en/faq.json

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────
// INLINE SVG ICONS
// ─────────────────────────────────────────────────────────────
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
      style={{
        transform:  open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 220ms cubic-bezier(0.4,0,0.2,1)',
        flexShrink:  0,
      }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────────────────────

// Eyebrow — exact Figma FAQ spec: 12px fw500 tracking-[0.1em] #b7b5fe
function Eyebrow({ children }) {
  return (
    <div style={{
      fontFamily:    'var(--font-latin)',
      fontSize:      '12px',
      fontWeight:    500,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color:         '#b7b5fe',
      marginBottom:  '12px',
    }}>
      {children}
    </div>
  )
}

// Section heading — 28px fw700, colour depends on variant
function SectionH2({ children, dark = false }) {
  return (
    <h2 style={{
      fontFamily:    'var(--font-latin)',
      fontSize:      '28px',
      fontWeight:    700,
      color:         dark ? '#F0F0F0' : '#0E0E12',
      marginBottom:  '32px',
      letterSpacing: '-0.02em',
      lineHeight:    1.3,
    }}>
      {children}
    </h2>
  )
}

// ─────────────────────────────────────────────────────────────
// ACCORDION ITEM
// ─────────────────────────────────────────────────────────────
// variant: 'light' | 'dark'
// Light: white bg, #0E0E12 question, #212830 answer, bottom border rgba(0,0,0,0.08)
// Dark:  transparent bg, #F0F0F0 question, #F0F0F0/75 answer, border rgba(183,181,254,0.15)
function AccordionItem({ question, answer, open, onToggle, variant = 'light', id }) {
  const isDark = variant === 'dark'

  return (
    <div style={{
      borderBottom: isDark
        ? '1px solid rgba(183,181,254,0.15)'
        : '1px solid rgba(0,0,0,0.08)',
    }}>
      <button
        id={`faq-btn-${id}`}
        aria-expanded={open}
        aria-controls={`faq-panel-${id}`}
        onClick={onToggle}
        className="w-full text-left flex items-start justify-between gap-4 py-5"
        style={{
          fontFamily:  'var(--font-latin)',
          fontSize:    '17px',
          fontWeight:  600,
          color:       isDark ? '#F0F0F0' : '#0E0E12',
          lineHeight:  1.45,
          background:  'none',
          border:      'none',
          cursor:      'pointer',
          padding:     '20px 0',
        }}
      >
        <span style={{ flex: 1 }}>{question}</span>
        <span style={{ color: '#b7b5fe', marginTop: '2px' }}>
          <IconChevron open={open} />
        </span>
      </button>

      {/* Answer panel — CSS height transition */}
      <div
        id={`faq-panel-${id}`}
        role="region"
        aria-labelledby={`faq-btn-${id}`}
        style={{
          overflow:   'hidden',
          maxHeight:  open ? '1200px' : '0px',
          transition: 'max-height 280ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div
          style={{
            fontFamily:  'var(--font-latin)',
            fontSize:    '16px',
            fontWeight:  400,
            color:       isDark ? 'rgba(240,240,240,0.75)' : '#212830',
            lineHeight:  1.7,
            paddingBottom: '20px',
          }}
        >
          {answer}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// ACCORDION GROUP
// One open item at a time per group (standard FAQ UX).
// ─────────────────────────────────────────────────────────────
function AccordionGroup({ items, variant, groupId }) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = useCallback((i) => {
    setOpenIndex((prev) => (prev === i ? null : i))
  }, [])

  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          id={`${groupId}-${i}`}
          question={item.question}
          answer={item.answer}
          variant={variant}
          open={openIndex === i}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// CATEGORY NAV BAR (S2)
// Sticky below navbar. Scrolls to section anchor on click.
// Active category highlighted with #b7b5fe bg.
// Figma: #0E0E12 bg, py-[28px]
// ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  { label: 'The Program',         anchor: 'program'    },
  { label: 'The Loop',            anchor: 'the-loop'   },
  { label: 'Navigators',          anchor: 'navigators' },
  { label: 'Results',             anchor: 'results'    },
  { label: 'The Hangar',          anchor: 'the-hangar' },
  { label: 'Enrollment',          anchor: 'enrollment' },
  { label: 'Bilingual',           anchor: 'bilingual'  },
  { label: 'Cities',              anchor: 'cities'     },
]

function CategoryBar({ active, onSelect }) {
  const scrollTo = (anchor) => {
    onSelect(anchor)
    const el = document.getElementById(anchor)
    if (!el) return
    const navH = 64
    const catH = 60
    const top = el.getBoundingClientRect().top + window.scrollY - navH - catH - 16
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div
      style={{
        backgroundColor: '#0E0E12',
        borderBottom:    '1px solid rgba(183,181,254,0.10)',
        position:        'sticky',
        top:             '64px',  // below Navbar --nav-height
        zIndex:          50,
        overflowX:       'auto',
      }}
    >
      <div
        className="max-w-7xl mx-auto px-6"
        style={{ display: 'flex', gap: '4px', padding: '10px 24px' }}
      >
        {CATEGORIES.map(({ label, anchor }) => {
          const isActive = active === anchor
          return (
            <button
              key={anchor}
              onClick={() => scrollTo(anchor)}
              style={{
                fontFamily:      'var(--font-latin)',
                fontSize:        '13px',
                fontWeight:      isActive ? 600 : 400,
                whiteSpace:      'nowrap',
                padding:         '6px 14px',
                borderRadius:    '9999px',
                backgroundColor: isActive ? '#b7b5fe' : 'transparent',
                color:           isActive ? '#0E0E12' : 'rgba(240,240,240,0.6)',
                border:          isActive ? 'none' : '1px solid rgba(183,181,254,0.15)',
                cursor:          'pointer',
                transition:      'all 150ms ease',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// SEARCH RESULTS VIEW
// When search has a query, show a flat filtered list instead of
// the sectioned accordion layout.
// ─────────────────────────────────────────────────────────────
function SearchResults({ results, query }) {
  const [openIndex, setOpenIndex] = useState(null)

  if (results.length === 0) {
    return (
      <div
        className="max-w-[800px] mx-auto px-6 py-20 text-center"
        style={{ backgroundColor: '#F5F5FF', minHeight: '400px' }}
      >
        <p style={{
          fontFamily: 'var(--font-latin)',
          fontSize:   '16px',
          color:      'rgba(14,14,18,0.45)',
        }}>
          No results for &ldquo;{query}&rdquo; — try a shorter term or browse categories below.
        </p>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#F5F5FF' }}>
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <p style={{
          fontFamily:   'var(--font-latin)',
          fontSize:     '13px',
          fontWeight:   500,
          color:        '#b7b5fe',
          marginBottom: '24px',
          letterSpacing: '0.05em',
        }}>
          {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
        </p>
        {results.map((item, i) => (
          <div key={i}>
            {i > 0 && (
              <div style={{ marginBottom: '4px', fontSize: '11px', color: 'rgba(183,181,254,0.5)',
                fontFamily: 'var(--font-latin)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {item._category}
              </div>
            )}
            {i === 0 && (
              <div style={{ marginBottom: '4px', fontSize: '11px', color: 'rgba(183,181,254,0.5)',
                fontFamily: 'var(--font-latin)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {item._category}
              </div>
            )}
            <AccordionItem
              id={`search-${i}`}
              question={item.question}
              answer={item.answer}
              variant="light"
              open={openIndex === i}
              onToggle={() => setOpenIndex((p) => (p === i ? null : i))}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// FAQ DATA
// Answers with inline links kept as JSX (valid in client component).
// TODO: migrate plain-string answers to content/en/faq.json
// ─────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id:       'program',
    label:    'The Program',
    heading:  'What the 16 weeks actually involves.',
    variant:  'light',
    bg:       '#F5F5FF',
    items: [
      {
        question: 'What exactly happens in the 16-week program?',
        answer:   'The program runs through The Loop — Read → Think → Speak → Write — across 16 structured weeks. Each session involves live instruction with a Navigator, independent practice inside The Hangar, and baseline-to-exit assessment using Lexile and 6+1 Trait frameworks. Your child moves through grade-level content, not simplified material.',
      },
      {
        question: 'How many sessions are there and how long is each one?',
        answer:   'Sixteen sessions. Each session is 90 minutes — 60 minutes live with their Navigator, 30 minutes asynchronous work inside The Hangar. Sessions run weekly on a fixed schedule determined by cohort start date.',
      },
      {
        question: 'What grade levels does DODO serve?',
        answer:   'Grades 3 through 8. The program is designed for students reading between Lexile 400L and 1000L — the critical range where bilingual thinking either consolidates or fragments.',
      },
      {
        question: 'Is this a group program or one-on-one?',
        answer:   'One-on-one. Every child works with a dedicated Navigator for the full 16 weeks. The Hangar provides peer interaction, but live sessions are always 1:1.',
      },
      {
        question: 'What happens if my child misses a session?',
        answer:   "Sessions are recorded and accessible within 24 hours. Your child's Navigator will adjust the following session to address any gaps. Two consecutive missed sessions trigger a parent check-in to assess whether the cohort timing is correct.",
      },
      {
        question: 'What is The Hangar and is it included?',
        answer:   "The Hangar is the asynchronous learning environment where students practice between sessions. It is included in every Charter Enrollment. This is where your child consolidates what they learned during live sessions — not where they wait for help.",
      },
      {
        question: 'How is DODO different from an after-school English class?',
        answer:   'DODO builds bilingual thinking capacity — the ability to reason academically in English while maintaining Chinese fluency. An after-school class builds conversational skills. The Loop trains reading comprehension, analytical thinking, oral argument construction, and structured writing. These are not language skills. They are cognitive architecture.',
      },
    ],
  },
  {
    id:       'the-loop',
    label:    'The Loop',
    heading:  'How the methodology works — and why the order is not negotiable.',
    variant:  'dark',
    bg:       '#212830',
    items: [
      {
        question: 'What is The Loop?',
        answer:   "The Loop is DODO's four-phase methodology: Read → Think → Speak → Write. It mirrors how bilingual thinkers process academic content — not how language learners translate vocabulary. The sequence is fixed because each phase builds the neural scaffolding the next phase requires.",
      },
      {
        question: 'Why Read → Think → Speak → Write in that order?',
        answer:   'Because that is the order in which bilingual cognition develops. Reading builds input capacity. Thinking builds conceptual frameworks. Speaking externalizes those frameworks. Writing consolidates them into durable mental structures. Reversing the order produces fluency without comprehension — your child sounds confident but cannot reason independently.',
      },
      {
        question: 'How long does a student spend on each phase of The Loop?',
        answer:   'Each phase runs for 4 weeks. Read: weeks 1–4. Think: weeks 5–8. Speak: weeks 9–12. Write: weeks 13–16. Every student moves through the full sequence regardless of initial ability level. The content difficulty adjusts — the methodology does not.',
      },
      {
        question: 'Does The Loop change as the student improves?',
        answer:   'The structure never changes. The content complexity increases. A student reading at Lexile 600L in week 1 will still follow Read → Think → Speak → Write. But the texts, prompts, and writing assignments will increase in Lexile range and analytical demand as their baseline rises.',
      },
      {
        question: "How is The Loop different from what my child's school already does?",
        answer:   "Most school curricula assume monolingual cognition. They teach reading and writing as separate skills. The Loop treats them as interdependent cognitive phases within a single system. Your child's school may teach comprehension strategies. The Loop builds the thinking structure that makes those strategies automatic.",
      },
      {
        question: 'Can my child join mid-Loop or must they start at Read?',
        answer:   'Every student begins at Read. The entrance assessment determines content difficulty — not phase placement. A high-performing student will read more challenging texts in weeks 1–4, but they still enter at Read. The Loop is a sequence, not a ladder.',
      },
    ],
  },
  {
    id:       'navigators',
    label:    'Navigators',
    heading:  "Who they are, how they work, and how they're matched to your child.",
    variant:  'light',
    bg:       '#F5F5FF',
    items: [
      {
        question: 'What is a Navigator?',
        answer:   "A Navigator is your child's dedicated instructor for the full 16 weeks. They guide your child through The Loop, track Lexile and 6+1 Trait growth, adjust content difficulty in real time, and communicate progress to you every four weeks.",
      },
      {
        question: 'How is a Navigator different from a teacher or tutor?',
        answer:   "A teacher delivers curriculum to a classroom. A tutor remediates gaps. A Navigator builds cognitive systems. They do not reteach what your child's school already covered — they construct the thinking architecture that lets your child use what they already know.",
      },
      {
        question: 'How is my child matched to their Navigator?',
        answer:   "Matching is based on three inputs: baseline Lexile score from the entrance assessment, 6+1 Trait writing entry level, and the parent diagnostic call. We match cognitive profile, not personality. Your child's Navigator is selected for their ability to guide your child's specific thinking development — not to be their friend.",
      },
      {
        question: 'Will my child have the same Navigator for all 16 weeks?',
        answer:   'Yes. Consistency is non-negotiable. Changing Navigators mid-program disrupts the trust required for cognitive risk-taking. If a match is incorrect, we address it in week 2 — not week 10.',
      },
      {
        question: "What are Navigators' academic backgrounds?",
        answer:   'Every Navigator holds a graduate degree in education, linguistics, or a related field. Most have prior experience teaching bilingual students. All are trained in The Loop methodology and certified in Lexile assessment administration.',
      },
      {
        question: "How does a Navigator track my child's progress between sessions?",
        answer:   "Navigators review Hangar activity logs before every session. They track question response patterns, time-on-task data, and content engagement. This allows them to adjust the next session's difficulty in real time — your child never repeats work they have already mastered.",
      },
      {
        question: "What happens if my child and their Navigator aren't the right fit?",
        answer:   "You will know by week 2. If the match is incorrect, we reassign within 48 hours. After week 4, reassignment becomes disruptive to progress and is only considered in exceptional circumstances. The diagnostic call exists to prevent mismatches — use it.",
      },
    ],
  },
  {
    id:       'results',
    label:    'Results + Measurement',
    heading:  'What to expect — in numbers, not promises.',
    variant:  'dark',
    bg:       '#0E0E12',
    items: [
      {
        question: 'What results can I expect after 16 weeks?',
        answer: (
          <span>
            One grade level of Lexile growth — 100L to 150L increase — over 16 weeks. This is the
            research-backed benchmark for intensive intervention. Your child will also show measurable
            improvement in 6+1 Trait writing scores, specifically in Ideas, Organization, and Voice.
            See our{' '}
            <Link href="/methodology" style={{ color: '#b7b5fe', fontWeight: 500 }}>
              methodology
            </Link>{' '}
            page for framework details.
          </span>
        ),
      },
      {
        question: 'What is a Lexile level and how is it measured?',
        answer: (
          <span>
            A Lexile level quantifies reading comprehension ability on a scale from 0L to 2000L. It is
            measured using standardized assessments that evaluate sentence complexity, vocabulary demand,
            and conceptual density. DODO uses MetaMetrics-certified Lexile assessment tools. Learn more
            on our{' '}
            <Link href="/lexile" style={{ color: '#b7b5fe', fontWeight: 500 }}>
              Lexile
            </Link>{' '}
            page.
          </span>
        ),
      },
      {
        question: 'What is the 6+1 Trait writing framework?',
        answer: (
          <span>
            The 6+1 Trait framework measures seven dimensions of writing: Ideas, Organization, Voice,
            Word Choice, Sentence Fluency, Conventions, and Presentation. Each trait is scored
            independently on a 5-point rubric. DODO focuses on Ideas, Organization, and Voice during
            the 16-week program. Full framework documentation is available on our{' '}
            <Link href="/methodology" style={{ color: '#b7b5fe', fontWeight: 500 }}>
              methodology
            </Link>{' '}
            page.
          </span>
        ),
      },
      {
        question: 'How much Lexile growth is realistic in 16 weeks?',
        answer:   'One grade level — 100L to 150L. This is achievable for students starting between Lexile 400L and 1000L with consistent session attendance. Growth above 150L in 16 weeks is possible but not typical. Growth below 100L signals a mismatch between content difficulty and baseline ability — we adjust immediately.',
      },
      {
        question: 'When is my child assessed — and who does the assessment?',
        answer:   "Three times. Week 0: entrance assessment before the first session. Week 8: mid-program check. Week 16: exit assessment. All assessments are administered by your child's Navigator using MetaMetrics-certified tools. Results are shared with you within 72 hours of each assessment.",
      },
      {
        question: "What if my child doesn't show measurable growth?",
        answer:   "If your child shows less than 50L growth by week 8, we initiate a diagnostic review. This involves a parent call, Navigator observation, and content difficulty audit. If the issue is engagement, we adjust. If the issue is developmental readiness, we defer enrollment to a later cohort and refund the remaining balance.",
      },
      {
        question: "How does DODO's measurement compare to what my child's school reports?",
        answer:   "School grades measure compliance and effort. Lexile scores measure comprehension capacity. Your child may receive an A in English class while reading below grade level. DODO reports what your child can do — not how hard they tried.",
      },
      {
        question: 'Can I see the assessment results during the program — not just at the end?',
        answer:   "Yes. You receive a progress report after weeks 4, 8, 12, and 16. Each report includes Lexile trajectory, 6+1 Trait scores, Hangar engagement data, and Navigator observations. You will never be surprised by the final assessment — you will have watched your child's growth unfold across four data points.",
      },
    ],
  },
  {
    id:       'the-hangar',
    label:    'The Hangar',
    heading:  'What happens between sessions — and what The Hangar is not.',
    variant:  'light',
    bg:       '#F5F5FF',
    items: [
      {
        question: 'What is The Hangar?',
        answer:   "The Hangar is DODO's asynchronous learning environment. It is where your child consolidates what they learned in their live session — practicing independently, reviewing recorded content, and preparing for the next phase of The Loop. It is not a homework portal. It is a thinking workspace.",
      },
      {
        question: 'Is The Hangar the same as homework help?',
        answer:   "No. The Hangar is not where students go when they are stuck. It is where students go to keep moving. It provides structured practice, not reactive tutoring. Your child will have clear tasks — reading assignments, thinking prompts, speaking rehearsals, writing drafts — that extend the live session's cognitive work.",
      },
      {
        question: 'How much time does my child spend in The Hangar each week?',
        answer:   '30 to 45 minutes per week, spread across 2–3 shorter sessions. The Hangar is designed for daily micro-practice, not one long homework block. Most students engage for 10–15 minutes per day between live sessions.',
      },
      {
        question: 'Is a Navigator present in The Hangar?',
        answer:   "Not live. Your child's Navigator reviews Hangar activity logs and leaves asynchronous feedback — text comments, audio notes, or annotated work samples. If your child submits a writing draft in The Hangar, their Navigator will respond before the next live session.",
      },
      {
        question: 'What does my child actually do between sessions?',
        answer:   'It depends on the phase. During Read, they annotate texts and answer comprehension prompts. During Think, they respond to analytical questions and map argument structures. During Speak, they rehearse oral responses using recorded prompts. During Write, they draft, revise, and refine written work. Every task is phase-specific.',
      },
      {
        question: 'Is The Hangar moderated?',
        answer:   'Yes. All Hangar activity is logged and reviewed. Content is curated — your child cannot access unrelated material or communicate with other students in unstructured ways. The Hangar is a workspace, not a social platform.',
      },
      {
        question: 'What happens in The Hangar if my child is stuck?',
        answer:   'The Hangar is not where students go when they are stuck. It is where students go to keep moving. If your child encounters a genuine conceptual barrier, they flag it for their Navigator, who addresses it in the next live session. The Hangar builds independence — not dependency.',
      },
    ],
  },
  {
    id:       'enrollment',
    label:    'Enrollment + Pricing',
    heading:  'Everything included in Charter Enrollment — no surprises.',
    variant:  'dark',
    bg:       '#212830',
    items: [
      {
        question: 'What is Charter Enrollment?',
        answer:   "Charter Enrollment is DODO's founding enrollment tier. It grants access to the 16-week program, a dedicated Navigator, The Hangar, all assessment tools, and progress reporting. Charter families also receive priority placement in future cohorts and early access to program expansions.",
      },
      {
        question: 'What is the Founding Family Rate?',
        answer: (
          <span>
            The Founding Family Rate is the pricing tier available to the first 100 families who
            enroll in each city. It is{' '}
            <strong style={{ fontWeight: 600, color: '#F0F0F0' }}>$3,200</strong> for the full
            16-week program. After the first 100 families, the rate increases to standard enrollment
            pricing.
          </span>
        ),
      },
      {
        question: 'What is included in the enrollment fee?',
        answer:   "Everything. Sixteen 90-minute sessions with your child's Navigator. Full Hangar access. Entrance, mid-program, and exit assessments. Four progress reports. Recorded session archive. There are no add-ons, no material fees, no hidden costs.",
      },
      {
        question: 'Are there any additional costs beyond the program fee?',
        answer:   'No. The enrollment fee covers the entire 16-week program. You will not be asked to purchase books, software licenses, or supplementary materials. If your child needs accommodations — extended session time, translated materials, assistive technology — those are included at no additional cost.',
      },
      {
        question: 'What is the payment structure?',
        answer: (
          <span>
            Two options. Full payment at enrollment —{' '}
            <strong style={{ fontWeight: 600, color: '#F0F0F0' }}>$3,200</strong> upfront for
            Charter Enrollment. Or split payment —{' '}
            <strong style={{ fontWeight: 600, color: '#F0F0F0' }}>$1,700</strong> at enrollment,{' '}
            <strong style={{ fontWeight: 600, color: '#F0F0F0' }}>$1,500</strong> at week 8.
            Payment plans beyond two installments are not available.
          </span>
        ),
      },
      {
        question: 'What is the cancellation policy?',
        answer:   'Full refund if you cancel before the first session. 50% refund if you cancel before week 4. No refund after week 4. If DODO initiates a program withdrawal due to lack of measurable progress, you receive a prorated refund for the remaining weeks.',
      },
      {
        question: 'Can I enroll mid-cohort?',
        answer:   'No. Every student begins at week 1. The Loop is a sequence — joining mid-program would require skipping phases, which undermines the methodology. If the current cohort has already started, you will be placed in the next available cohort.',
      },
      {
        question: 'Is there a waitlist?',
        answer:   'Only if the current cohort is full. DODO runs cohorts every 6–8 weeks in each city. If you are waitlisted, you receive priority placement in the next cohort and a 48-hour early enrollment window before general availability.',
      },
      {
        question: 'What happens after the 16 weeks — is there a renewal option?',
        answer:   'Yes. Students who complete the 16-week program and show measurable Lexile growth are eligible for Advanced Loop — a continuation program with elevated content difficulty. Enrollment details are shared during your week 16 exit assessment review.',
      },
    ],
  },
  {
    id:       'bilingual',
    label:    'Bilingual Development',
    heading:  'The science behind raising a bilingual thinker — not a bilingual speaker.',
    variant:  'light',
    bg:       '#F5F5FF',
    items: [
      {
        question: "Does speaking Chinese at home hurt my child's English development?",
        answer:   "No. Research shows that maintaining first-language proficiency strengthens second-language acquisition. The issue is not Chinese at home — it is fragmented cognitive development. If your child is learning English conversationally while thinking academically in Chinese, they develop two incomplete systems. DODO builds bilingual thinking — not bilingual speaking.",
      },
      {
        question: 'What is the difference between bilingual fluency and bilingual thinking?',
        answer:   "Bilingual fluency is the ability to speak two languages. Bilingual thinking is the ability to reason, analyze, and problem-solve in both languages. Your child may speak English fluently and still struggle with reading comprehension, essay construction, or abstract reasoning. Fluency is surface-level. Thinking is structural.",
      },
      {
        question: "My child speaks English fluently — why do they still struggle academically?",
        answer:   "Because conversational fluency and academic cognition are not the same skill. Your child may navigate social situations in English while still processing complex texts, logical arguments, and written analysis in Chinese. DODO trains the cognitive architecture required for academic English — not the vocabulary required for casual conversation.",
      },
      {
        question: 'How does DODO approach the Chinese-English language relationship?',
        answer:   "DODO treats Chinese and English as interdependent cognitive systems — not competing languages. The Loop does not replace Chinese thinking with English thinking. It builds a bilingual cognitive framework where your child can reason academically in English while maintaining Chinese fluency. This is not language instruction. It is cognitive architecture development.",
      },
      {
        question: 'At what age is bilingual thinking development most effective?',
        answer:   'Grades 3 through 8 — ages 8 to 14. This is the critical window when academic cognition consolidates. Before age 8, children are still developing basic literacy. After age 14, cognitive patterns are largely fixed. The Loop works because it intervenes during the exact developmental window when bilingual thinking architecture can still be built.',
      },
      {
        question: 'What does research say about bilingual academic performance?',
        answer:   'Bilingual students who develop academic proficiency in both languages outperform monolingual peers on measures of executive function, cognitive flexibility, and problem-solving. The advantage is not the bilingualism itself — it is the cognitive complexity required to manage two language systems simultaneously. DODO builds that complexity intentionally.',
      },
      {
        question: "Will DODO help my child maintain their Chinese while improving their English?",
        answer:   "DODO does not teach Chinese. But by building bilingual thinking capacity, it strengthens your child's ability to operate in both languages. A student who can analyze a text, construct an argument, and write a structured essay in English can transfer those cognitive skills back to Chinese. The thinking structure is portable.",
      },
    ],
  },
  {
    id:       'cities',
    label:    'Cities + Scheduling',
    heading:  'Where DODO runs, and when.',
    variant:  'dark',
    bg:       '#0E0E12',
    items: [
      {
        question: 'What cities does DODO serve?',
        answer:   'Six diaspora cities: Vancouver, Richmond BC, Markham, Toronto, San Francisco Bay Area, and Los Angeles. These cities represent the highest concentrations of bilingual Chinese-English families in North America. Expansion to additional cities is planned for 2027.',
      },
      {
        question: 'What timezone are sessions run in?',
        answer:   'Sessions are scheduled in your local timezone. Vancouver and Richmond BC cohorts run on Pacific Time. Toronto and Markham cohorts run on Eastern Time. San Francisco and Los Angeles cohorts run on Pacific Time. Your child will never need to attend a session outside of reasonable local hours.',
      },
      {
        question: 'Can students in different timezones join the same cohort?',
        answer:   'No. Cohorts are city-specific. A student in Vancouver cannot join a Toronto cohort. This ensures that all students in a cohort are working within compatible schedules and cultural contexts.',
      },
      {
        question: 'How are sessions delivered — ClassIn, Zoom, or something else?',
        answer:   "Sessions are delivered through DODO's proprietary platform, which integrates live video, screen sharing, collaborative annotation, and session recording. You do not need to install ClassIn, Zoom, or any third-party software. Everything runs in a browser.",
      },
      {
        question: 'What are the available session times?',
        answer:   'Weekday evenings (5:00 PM to 8:00 PM local time) and weekend mornings (9:00 AM to 12:00 PM local time). Exact session time is assigned during the diagnostic call based on your schedule and Navigator availability. Once assigned, session time remains fixed for all 16 weeks.',
      },
      {
        question: 'Do sessions run during school holidays?',
        answer:   'No. DODO observes major school holidays in each city — winter break, spring break, and summer holidays. If a holiday falls during your cohort, that week is skipped and the program extends by one week. You are notified of holiday adjustments at enrollment.',
      },
      {
        question: 'Is DODO available in cities not on the priority list?',
        answer:   'Not yet. The current program is optimized for the six diaspora cities listed above. If you live outside these cities, you can join a waitlist for future expansion. DODO will notify you when enrollment opens in your area.',
      },
    ],
  },
]

// Flat list for search — inject _category label
const ALL_ITEMS = SECTIONS.flatMap((s) =>
  s.items.map((item) => ({ ...item, _category: s.label, _sectionId: s.id }))
)

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────
export default function FAQClient() {
  const [searchQuery,    setSearchQuery]    = useState('')
  const [activeCategory, setActiveCategory] = useState('')

  const trimmed = searchQuery.trim().toLowerCase()

  const searchResults = useMemo(() => {
    if (!trimmed) return []
    return ALL_ITEMS.filter((item) => {
      const q = item.question.toLowerCase()
      // answer may be JSX — only search string answers
      const a = typeof item.answer === 'string' ? item.answer.toLowerCase() : ''
      return q.includes(trimmed) || a.includes(trimmed)
    })
  }, [trimmed])

  const isSearching = trimmed.length > 0

  return (
    <div className="w-full overflow-hidden" style={{ fontFamily: 'var(--font-latin)' }}>

      {/* ── S1 HERO + SEARCH ──────────────────────────────────
          Figma: #212830, max-w-[680px] mx-auto text-center
          pt-[80px] pb-[64px] (Figma exact)
          Eyebrow 12px fw500 tracking-[0.1em] #b7b5fe
          H1 clamp(32-52px) fw700 #F0F0F0 lineHeight 1.2
          Sub 16px fw400 #F0F0F0/60 max-w-[520px]
          Search: #2E3848 bg, border #b7b5fe/30, rounded-lg
      ───────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#212830' }}>
        <div
          className="max-w-[680px] mx-auto text-center px-6"
          style={{ paddingTop: '80px', paddingBottom: '64px' }}
        >
          {/* Eyebrow */}
          <div style={{
            fontFamily:    'var(--font-latin)',
            fontSize:      '12px',
            fontWeight:    500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         '#b7b5fe',
            marginBottom:  '24px',
          }}>
            Frequently Asked Questions
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily:    'var(--font-latin)',
            fontSize:      'clamp(32px, 5vw, 52px)',
            fontWeight:    700,
            color:         '#F0F0F0',
            lineHeight:    1.2,
            letterSpacing: '-0.03em',
            marginBottom:  '16px',
          }}>
            Every question parents ask before enrolling — answered completely.
          </h1>

          {/* Subhead */}
          <p
            className="max-w-[520px] mx-auto"
            style={{
              fontFamily:   'var(--font-latin)',
              fontSize:     '16px',
              fontWeight:   400,
              color:        'rgba(240,240,240,0.60)',
              lineHeight:   1.6,
              marginBottom: '20px',
            }}
          >
            Use the search below or jump to a category. Every answer is complete — nothing requires a follow-up call.
          </p>

          {/* Search bar */}
          <form
            role="search"
            className="max-w-[560px] mx-auto mt-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="faq-search" className="sr-only">Search questions</label>
            <div className="relative">
              <IconSearch style={{
                position:      'absolute',
                left:          '16px',
                top:           '50%',
                transform:     'translateY(-50%)',
                color:         '#b7b5fe',
                pointerEvents: 'none',
              }} />
              <input
                id="faq-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full h-[52px] pl-12 pr-12 rounded-lg transition-colors"
                style={{
                  fontFamily:      'var(--font-latin)',
                  fontSize:        '16px',
                  fontWeight:      400,
                  backgroundColor: '#2E3848',
                  border:          '1.5px solid rgba(183,181,254,0.30)',
                  color:           '#F0F0F0',
                  outline:         'none',
                }}
                onFocus={(e)  => { e.target.style.borderColor = '#b7b5fe' }}
                onBlur={(e)   => { e.target.style.borderColor = 'rgba(183,181,254,0.30)' }}
              />
              <IconArrowRight style={{
                position:      'absolute',
                right:         '16px',
                top:           '50%',
                transform:     'translateY(-50%)',
                color:         '#b7b5fe',
                pointerEvents: 'none',
              }} />
            </div>
          </form>
        </div>
      </section>

      {/* ── S2 CATEGORY NAV ───────────────────────────────────
          Figma: #0E0E12, sticky, py-[28px]
          Pill buttons, active = #b7b5fe bg #0E0E12 text
      ───────────────────────────────────────────────────────── */}
      <CategoryBar active={activeCategory} onSelect={setActiveCategory} />

      {/* ── SEARCH RESULTS or SECTIONED LAYOUT ─────────────── */}
      {isSearching ? (
        <SearchResults results={searchResults} query={trimmed} />
      ) : (
        <>
          {SECTIONS.map((section) => {
            const isDark = section.variant === 'dark'
            return (
              <section
                key={section.id}
                id={section.id}
                className="px-6 py-16"
                style={{ backgroundColor: section.bg }}
              >
                <div className="max-w-[800px] mx-auto">
                  <Eyebrow>{section.label}</Eyebrow>
                  <SectionH2 dark={isDark}>{section.heading}</SectionH2>
                  <AccordionGroup
                    items={section.items}
                    variant={section.variant}
                    groupId={section.id}
                  />
                </div>
              </section>
            )
          })}
        </>
      )}

      {/* ── S11 STILL HAVE A QUESTION ─────────────────────────
          Figma: light #F5F5FF, max-w-[560px], pt/pb 80px
          Eyebrow "STILL HERE?" · h2 32px fw700 #0E0E12
          Sub 17px fw400 #212830 lineHeight 1.6
          Gilt button · email link below
      ───────────────────────────────────────────────────────── */}
      <section
        className="px-6"
        style={{ backgroundColor: '#F5F5FF', paddingTop: '80px', paddingBottom: '80px' }}
      >
        <div className="max-w-[560px] mx-auto text-center">
          <Eyebrow>Still Here?</Eyebrow>

          <h2 style={{
            fontFamily:    'var(--font-latin)',
            fontSize:      '32px',
            fontWeight:    700,
            color:         '#0E0E12',
            letterSpacing: '-0.02em',
            marginBottom:  '16px',
          }}>
            Your question isn&rsquo;t here.
          </h2>

          <p
            className="max-w-[480px] mx-auto"
            style={{
              fontFamily:   'var(--font-latin)',
              fontSize:     '17px',
              fontWeight:   400,
              color:        '#212830',
              lineHeight:   1.6,
              marginBottom: '28px',
            }}
          >
            Book a diagnostic call. We will answer it in the first five minutes — then spend the
            rest of the time on your child.
          </p>

          <Link
            href="/consult"
            className="inline-block rounded-lg transition-all hover:opacity-90"
            style={{
              fontFamily:      'var(--font-latin)',
              fontWeight:      700,
              fontSize:        '16px',
              backgroundColor: '#F5C842',
              color:           '#0E0E12',
              padding:         '16px 32px',
              textDecoration:  'none',
            }}
          >
            Book a Diagnostic Call
          </Link>

          <div style={{ marginTop: '14px' }}>
            <a
              href="mailto:hello@dodolearning.com"
              style={{
                fontFamily:  'var(--font-latin)',
                fontSize:    '14px',
                fontWeight:  400,
                color:       '#b7b5fe',
              }}
            >
              Or email us directly
            </a>
          </div>
        </div>
      </section>

      {/* ── S12 CLOSING CTA ───────────────────────────────────
          Figma: #212830, max-w-[600px], pt/pb 96px
          h2 32px fw700 #b7b5fe lineHeight 1.3 max-w-[580px]
          sub 16px fw400 #F0F0F0/70 max-w-[480px]
          Gilt button · microcopy 13px #b7b5fe
      ───────────────────────────────────────────────────────── */}
      <section
        className="px-6"
        style={{ backgroundColor: '#212830', paddingTop: '96px', paddingBottom: '96px' }}
      >
        <div className="max-w-[600px] mx-auto text-center">
          <h2
            className="max-w-[580px] mx-auto"
            style={{
              fontFamily:    'var(--font-latin)',
              fontSize:      '32px',
              fontWeight:    700,
              color:         '#b7b5fe',
              lineHeight:    1.3,
              letterSpacing: '-0.02em',
              marginBottom:  '16px',
            }}
          >
            You have the answers. Now get the assessment.
          </h2>

          <p
            className="max-w-[480px] mx-auto"
            style={{
              fontFamily:   'var(--font-latin)',
              fontSize:     '16px',
              fontWeight:   400,
              color:        'rgba(240,240,240,0.70)',
              lineHeight:   1.6,
              marginBottom: '32px',
            }}
          >
            The entrance assessment is the beginning. It tells us exactly where your child is — and
            what the first 16 weeks should look like for them.
          </p>

          <Link
            href="/consult"
            className="inline-block rounded-lg transition-all hover:opacity-90"
            style={{
              fontFamily:      'var(--font-latin)',
              fontWeight:      700,
              fontSize:        '16px',
              backgroundColor: '#F5C842',
              color:           '#0E0E12',
              padding:         '16px 32px',
              textDecoration:  'none',
            }}
          >
            Book a Diagnostic Call
          </Link>

          <p style={{
            fontFamily:   'var(--font-latin)',
            fontSize:     '13px',
            fontWeight:   400,
            color:        '#b7b5fe',
            marginTop:    '14px',
          }}>
            The entrance assessment is included in every enrollment. The first number costs nothing.
          </p>
        </div>
      </section>

    </div>
  )
}