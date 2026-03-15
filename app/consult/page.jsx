// app/[locale]/about/page.jsx
// Pure server component — no 'use client', zero external dependencies.
//
// Design: replicates exact layout patterns, card styles, type specs, and
// colour rhythm from the Consult Page Figma Make design (tUKokxMK9eHkSortCPKzTX).
//
// Section rhythm (mirrors Consult page 7-section structure):
//   §1 Hero          — Light (#F5F5FF), radial gradient, rounded-2xl inner
//   §2 The Name      — Dark (#0E0E12), 2-column DO + DO cards
//   §3 Brand Truths  — Light (#F5F5FF), 3 accent-top cards
//   §4 The Loop      — Dark (#212830), diagram + step breakdown
//   §5 Who We Serve  — Light (#F5F5FF), 3 family-type cards
//   §6 Navigators    — Dark (#0E0E12), blockquote + credential badges
//   §7 Closing CTA   — Dark (#212830), gilt CTA, brand stamp
//
// Content migration: hardcoded with <!-- TODO: migrate to content/en/about.json -->

import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'About DODO Learning',
  description:
    'DODO Learning is a live, Navigator-led bilingual thinking program for ' +
    'Chinese-speaking diaspora families in Canada and the US. We build bilingual ' +
    'thinkers through the Read → Think → Speak → Write methodology.',
  path: '/about',
})

// ─────────────────────────────────────────────────────────────
// INLINE SVG ICONS — no external package
// ─────────────────────────────────────────────────────────────
function IconArrowRight({ style }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES — exact specs from Figma Eyebrow component
// ─────────────────────────────────────────────────────────────

// Eyebrow — fontSize 11px, fontWeight 600, letterSpacing 0.15em, #b7b5fe
// Matches Figma Make Eyebrow.tsx exactly. Used on both dark and light sections.
function Eyebrow({ children, center = false }) {
  return (
    <p
      style={{
        fontFamily:     'var(--font-latin)',
        fontSize:       '11px',
        fontWeight:     600,
        letterSpacing:  '0.15em',
        textTransform:  'uppercase',
        color:          '#b7b5fe',
        marginBottom:   '16px',
        textAlign:      center ? 'center' : undefined,
      }}
    >
      {children}
    </p>
  )
}

// DarkCard — ConsultCard default on dark sections.
// On #0E0E12 bg: #212830 card. On #212830 bg: #2E3848 card.
function DarkCard({ children, bg = '#2E3848', className = '' }) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{
        backgroundColor: bg,
        border:          '1px solid rgba(183,181,254,0.10)',
        padding:         '28px 32px',
      }}
    >
      {children}
    </div>
  )
}

// LightCard — ConsultCard variant="light".
// White bg, subtle border, optional 3px lavender top accent.
function LightCard({ children, accentTop = false, className = '' }) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{
        backgroundColor: '#ffffff',
        border:          '1px solid rgba(0,0,0,0.08)',
        borderTop:       accentTop ? '3px solid #b7b5fe' : '1px solid rgba(0,0,0,0.08)',
        boxShadow:       '0 2px 12px rgba(0,0,0,0.04)',
        padding:         '32px',
      }}
    >
      {children}
    </div>
  )
}

// ConsultBadge — pill chip. Matches Figma ConsultBadge.tsx.
function ConsultBadge({ children }) {
  return (
    <span
      style={{
        display:         'inline-block',
        fontFamily:      'var(--font-latin)',
        fontSize:        '12px',
        fontWeight:      500,
        letterSpacing:   '0.04em',
        color:           '#b7b5fe',
        backgroundColor: 'rgba(183,181,254,0.15)',
        border:          '1px solid rgba(183,181,254,0.3)',
        borderRadius:    '9999px',
        padding:         '4px 12px',
        marginRight:     '8px',
        marginBottom:    '8px',
      }}
    >
      {children}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────
// LOOP DIAGRAM SVG — same asset used in program/page.jsx
// ─────────────────────────────────────────────────────────────
function LoopDiagram() {
  return (
    <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: '1 / 1' }}>
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        fill="none"
        aria-label="The Loop: Read, Think, Speak, Write"
        role="img"
      >
        <circle cx="200" cy="200" r="160" stroke="#b7b5fe" strokeWidth="1.5" opacity="0.2" />
        <circle cx="200" cy="200" r="145" stroke="#b7b5fe" strokeWidth="0.5" opacity="0.08" />
        <path d="M200 40 A160 160 0 0 1 360 200"  stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M360 200 A160 160 0 0 1 200 360" stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M200 360 A160 160 0 0 1 40 200"  stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M40 200 A160 160 0 0 1 200 40"   stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        {/* READ */}
        <circle cx="200" cy="40" r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="200" y="37"  textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">READ</text>
        <text x="200" y="53"  textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC, sans-serif">阅读</text>
        {/* THINK */}
        <circle cx="360" cy="200" r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="360" y="197" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">THINK</text>
        <text x="360" y="213" textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC, sans-serif">思考</text>
        {/* SPEAK — Gilt accent */}
        <circle cx="200" cy="360" r="36" fill="#F5F5FF" stroke="#F5C842" strokeWidth="2" />
        <text x="200" y="357" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">SPEAK</text>
        <text x="200" y="373" textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC, sans-serif">表达</text>
        {/* WRITE */}
        <circle cx="40"  cy="200" r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="40"  y="197" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">WRITE</text>
        <text x="40"  y="213" textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC, sans-serif">写作</text>
        {/* Centre label */}
        <text x="200" y="193" textAnchor="middle" fill="#0E0E12" fontSize="13" fontWeight="700" fontFamily="DM Sans, sans-serif" opacity="0.6">THE LOOP</text>
        <text x="200" y="210" textAnchor="middle" fill="#b7b5fe" fontSize="10" fontFamily="Noto Sans SC, sans-serif" opacity="0.5">学习闭环</text>
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// DATA — TODO: migrate to content/en/about.json + content/zh/about.json
// ─────────────────────────────────────────────────────────────

const BRAND_TRUTHS = [
  {
    num:   '01',
    title: 'Language is a thinking tool, not a performance skill.',
    body:  'Fluency without depth is noise. We train students to have something worth saying — and the precision to say it in two languages.',
    cjk:   '语言是思维工具，不是表演技巧',
  },
  {
    num:   '02',
    title: 'The bilingual mind is a competitive advantage.',
    body:  "We don't treat bilingualism as a gap to close. We treat it as a cognitive superpower to develop. Every session builds the double-track mind.",
    cjk:   '双语思维是认知优势',
  },
  {
    num:   '03',
    title: 'Progress must be visible, measurable, and felt.',
    body:  'Parents invest in outcomes. Students invest in confidence. We measure both — with Lexile levels and 6+1 Trait writing assessments — and make growth legible.',
    cjk:   '成长必须看得见、量得出',
  },
]

const LOOP_STEPS = [
  {
    step:  'Read',
    cjk:   '阅读',
    body:  'Texts chosen above their comfort zone — just enough to stretch. Comprehension tracked by Lexile level, not guesswork.',
  },
  {
    step:  'Think',
    cjk:   '思考',
    body:  "Before they speak or write, they build the argument. What's the claim? What's the evidence? Structure first.",
  },
  {
    step:  'Speak',
    cjk:   '表达',
    gilt:  true,
    body:  'They take a position and defend it — live, with their Navigator. This is where confidence is built, not performed.',
  },
  {
    step:  'Write',
    cjk:   '写作',
    body:  "Everything they've read, thought, and said now lands on the page. Draft to revision — measurable improvement, every time.",
  },
]

const WHO_WE_SERVE = [
  {
    type:     'Newly arrived in Canada or the US',
    cjk:      '刚到北美的家庭',
    fear:     "My child speaks English but can't hold their own in class.",
    solution: 'We close the gap between survival English and academic fluency — fast, measurably, and with a Navigator who knows their name.',
  },
  {
    type:     'Planning to move',
    cjk:      '准备移居的家庭',
    fear:     'My child will fall behind the moment they land.',
    solution: 'We build academic language infrastructure before arrival. They land ready — not catching up.',
  },
  {
    type:     'Staying, but thinking globally',
    cjk:      '放眼全球的本地家庭',
    fear:     'My child will be outcompeted by truly bilingual peers.',
    solution: 'We develop the double-track cognitive identity that sets them apart — in every classroom, in every country, for the rest of their lives.',
  },
]

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="w-full overflow-hidden">

      {/* ══ §1 HERO ══════════════════════════════════════════
          Light section. Rounded-2xl inner container.
          Radial gradient: #EEEEFF → #F5F5FF (exact from Figma F1).
          py-[120px] inner padding — same as Consult hero.
      ════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="container-section">
          <div
            className="w-full relative overflow-hidden rounded-2xl"
            style={{
              background: 'radial-gradient(circle at top center, #EEEEFF 0%, #F5F5FF 80%)',
            }}
          >
            <div
              className="max-w-[720px] mx-auto text-center px-6"
              style={{ paddingTop: '120px', paddingBottom: '120px' }}
            >
              <Eyebrow center>Our Story</Eyebrow>

              <h1
                style={{
                  fontFamily:    'var(--font-latin)',
                  fontWeight:    700,
                  fontSize:      'clamp(36px, 5vw, 60px)',
                  color:         '#0E0E12',
                  lineHeight:    1.1,
                  letterSpacing: '-0.03em',
                  maxWidth:      '680px',
                  margin:        '0 auto 1.25rem',
                }}
              >
                We don&rsquo;t teach English. We build bilingual thinkers.
              </h1>

              <p
                style={{
                  fontFamily:    'var(--font-cjk)',
                  fontWeight:    500,
                  fontSize:      '15px',
                  color:         '#b7b5fe',
                  letterSpacing: '0.08em',
                  marginBottom:  '1.5rem',
                }}
              >
                我们不教英语，我们培养双语思考者
              </p>

              <p
                style={{
                  fontFamily:   'var(--font-latin)',
                  fontWeight:   400,
                  fontSize:     'clamp(16px, 2vw, 20px)',
                  color:        '#212830',
                  maxWidth:     '560px',
                  margin:       '0 auto 2.5rem',
                  lineHeight:   1.6,
                }}
              >
                DODO Learning is a live, Navigator-led bilingual thinking program for
                globally mobile families who expect more than fluency. We develop students
                who don&rsquo;t just operate in two languages — they lead in both.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/navigators"
                  className="inline-flex items-center justify-center gap-2 rounded-lg transition-all hover:opacity-90"
                  style={{
                    fontFamily:      'var(--font-latin)',
                    fontWeight:      700,
                    fontSize:        '16px',
                    backgroundColor: '#b7b5fe',
                    color:           '#0E0E12',
                    padding:         '16px 32px',
                  }}
                >
                  Meet Our Navigators
                  <IconArrowRight />
                </Link>
                <Link
                  href="/consult"
                  className="inline-flex items-center justify-center gap-2 rounded-lg transition-all hover:opacity-90"
                  style={{
                    fontFamily:      'var(--font-latin)',
                    fontWeight:      700,
                    fontSize:        '16px',
                    backgroundColor: '#F5C842',
                    color:           '#0E0E12',
                    padding:         '16px 32px',
                  }}
                >
                  Book a Diagnostic Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ §2 WHY DODO — THE NAME ═══════════════════════════
          Dark (#0E0E12). 2-col card grid.
          Step number treatment: fontWeight 300, 64px, #b7b5fe, opacity 0.5.
          Matches Figma F2 step-card pattern scaled to 2 columns.
      ════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#0E0E12' }}>
        <div className="container-section">

          <div className="text-center mb-14">
            <Eyebrow center>Why DODO</Eyebrow>
            <h2
              style={{
                fontFamily:    'var(--font-latin)',
                fontWeight:    600,
                fontSize:      'clamp(28px, 4vw, 48px)',
                color:         '#F0F0F0',
                letterSpacing: '-0.025em',
                lineHeight:    1.15,
                marginBottom:  '1.25rem',
              }}
            >
              Every letter is intentional.
            </h2>
            <p
              style={{
                fontFamily:  'var(--font-latin)',
                fontWeight:  400,
                fontSize:    '16px',
                color:       'rgba(240,240,240,0.55)',
                maxWidth:    '480px',
                margin:      '0 auto',
                lineHeight:  1.65,
              }}
            >
              DODO is not named after the extinct bird. It is named after the most
              fundamental act of language mastery: doing the work — twice, in two
              languages, at every level.
            </p>
          </div>

          {/* DO + DO cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[820px] mx-auto">

            {/* DO — English */}
            <DarkCard bg="#212830">
              {/* Large display DO — fontWeight 300, #b7b5fe, opacity 0.5 — matches Figma step number treatment */}
              <div
                style={{
                  fontFamily:    'var(--font-latin)',
                  fontWeight:    300,
                  fontSize:      '72px',
                  color:         '#b7b5fe',
                  opacity:       0.5,
                  lineHeight:    1,
                  marginBottom:  '20px',
                  letterSpacing: '-0.05em',
                }}
                aria-hidden="true"
              >
                DO
              </div>
              <h3
                style={{
                  fontFamily:   'var(--font-latin)',
                  fontWeight:   700,
                  fontSize:     '20px',
                  color:        '#F0F0F0',
                  marginBottom: '10px',
                }}
              >
                English
              </h3>
              <p
                style={{
                  fontFamily:   'var(--font-latin)',
                  fontWeight:   400,
                  fontSize:     '14px',
                  color:        '#F0F0F0',
                  opacity:      0.75,
                  lineHeight:   1.6,
                  marginBottom: '16px',
                }}
              >
                The new world. The academic language. The language of possibility
                and future belonging.
              </p>
              <p
                style={{
                  fontFamily:    'var(--font-cjk)',
                  fontWeight:    400,
                  fontSize:      '12px',
                  color:         '#b7b5fe',
                  opacity:       0.55,
                  letterSpacing: '0.08em',
                }}
              >
                新世界 · 学术语言 · 未来归属
              </p>
            </DarkCard>

            {/* DO — Mother Tongue */}
            <DarkCard bg="#212830">
              <div
                style={{
                  fontFamily:    'var(--font-cjk)',
                  fontWeight:    700,
                  fontSize:      '72px',
                  color:         '#b7b5fe',
                  opacity:       0.5,
                  lineHeight:    1,
                  marginBottom:  '20px',
                }}
                aria-hidden="true"
              >
                做
              </div>
              <h3
                style={{
                  fontFamily:   'var(--font-latin)',
                  fontWeight:   700,
                  fontSize:     '20px',
                  color:        '#F0F0F0',
                  marginBottom: '10px',
                }}
              >
                Mother Tongue
              </h3>
              <p
                style={{
                  fontFamily:   'var(--font-latin)',
                  fontWeight:   400,
                  fontSize:     '14px',
                  color:        '#F0F0F0',
                  opacity:      0.75,
                  lineHeight:   1.6,
                  marginBottom: '16px',
                }}
              >
                The emotional core. The first lens. The language through which the
                world first made sense.
              </p>
              <p
                style={{
                  fontFamily:    'var(--font-cjk)',
                  fontWeight:    400,
                  fontSize:      '12px',
                  color:         '#b7b5fe',
                  opacity:       0.55,
                  letterSpacing: '0.08em',
                }}
              >
                情感根基 · 第一视角 · 最初的理解
              </p>
            </DarkCard>
          </div>

          {/* Full-width pull quote — below the two cards */}
          <div
            className="mt-12 text-center max-w-[680px] mx-auto"
            style={{
              borderTop:  '1px solid rgba(183,181,254,0.12)',
              paddingTop: '48px',
            }}
          >
            <p
              style={{
                fontFamily:  'var(--font-latin)',
                fontWeight:  300,
                fontSize:    'clamp(18px, 2.5vw, 26px)',
                color:       'rgba(240,240,240,0.75)',
                lineHeight:  1.65,
                fontStyle:   'italic',
              }}
            >
              DODO is what happens when a student stops translating and starts
              thinking — simultaneously — in both.
            </p>
          </div>

        </div>
      </section>

      {/* ══ §3 THREE BRAND TRUTHS ═══════════════════════════
          Light (#F5F5FF). 3-col card grid.
          Light cards with lavender top border — exact Figma F4 pattern.
          Step numbers: fontWeight 300, #b7b5fe, opacity 0.6.
      ════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="container-section">

          <div className="mb-12">
            <Eyebrow>What We Believe</Eyebrow>
            <h2
              style={{
                fontFamily:    'var(--font-latin)',
                fontWeight:    600,
                fontSize:      'clamp(28px, 4vw, 48px)',
                color:         '#0E0E12',
                letterSpacing: '-0.025em',
                lineHeight:    1.15,
              }}
            >
              Three things we know to be true.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRAND_TRUTHS.map((truth) => (
              <LightCard key={truth.num} accentTop>
                {/* Step number — Figma F2/F4 treatment */}
                <div
                  style={{
                    fontFamily:   'var(--font-latin)',
                    fontWeight:   300,
                    fontSize:     '32px',
                    color:        '#b7b5fe',
                    opacity:      0.6,
                    lineHeight:   1,
                    marginBottom: '12px',
                  }}
                  aria-hidden="true"
                >
                  {truth.num}
                </div>
                <h3
                  style={{
                    fontFamily:   'var(--font-latin)',
                    fontWeight:   600,
                    fontSize:     '19px',
                    color:        '#0E0E12',
                    lineHeight:   1.35,
                    marginBottom: '12px',
                  }}
                >
                  {truth.title}
                </h3>
                <p
                  style={{
                    fontFamily:   'var(--font-latin)',
                    fontWeight:   400,
                    fontSize:     '15px',
                    color:        '#212830',
                    lineHeight:   1.6,
                    marginBottom: '16px',
                  }}
                >
                  {truth.body}
                </p>
                <p
                  style={{
                    fontFamily:    'var(--font-cjk)',
                    fontWeight:    400,
                    fontSize:      '12px',
                    color:         '#b7b5fe',
                    opacity:       0.65,
                    letterSpacing: '0.08em',
                  }}
                >
                  {truth.cjk}
                </p>
              </LightCard>
            ))}
          </div>

        </div>
      </section>

      {/* ══ §4 THE LOOP ══════════════════════════════════════
          Dark (#212830). 2-col: step list (left) + LoopDiagram SVG (right).
          Loop step circles match the loop-step-number class in globals.css.
          Gilt accent on Speak step — matches LoopDiagram SVG.
      ════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#212830' }}>
        <div className="container-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: step breakdown */}
            <div>
              <Eyebrow>The Loop</Eyebrow>
              <h2
                style={{
                  fontFamily:    'var(--font-latin)',
                  fontWeight:    600,
                  fontSize:      'clamp(28px, 4vw, 48px)',
                  color:         '#F0F0F0',
                  letterSpacing: '-0.025em',
                  lineHeight:    1.15,
                  marginBottom:  '0.75rem',
                }}
              >
                A method is a set of steps. The Loop is a way of thinking.
              </h2>
              <p
                style={{
                  fontFamily:    'var(--font-cjk)',
                  fontWeight:    400,
                  fontSize:      '13px',
                  color:         '#b7b5fe',
                  opacity:       0.55,
                  letterSpacing: '0.1em',
                  marginBottom:  '2.5rem',
                }}
              >
                阅读 → 思考 → 表达 → 写作
              </p>

              <div className="space-y-6">
                {LOOP_STEPS.map(({ step, cjk, gilt, body }) => (
                  <div key={step} className="flex gap-4 items-start">
                    {/* Step circle — gilt accent on Speak */}
                    <div
                      className="flex-shrink-0 flex items-center justify-center rounded-full"
                      style={{
                        width:           '44px',
                        height:          '44px',
                        backgroundColor: gilt
                          ? 'rgba(245,200,66,0.12)'
                          : 'rgba(183,181,254,0.1)',
                        border:          gilt
                          ? '1.5px solid rgba(245,200,66,0.4)'
                          : '1.5px solid rgba(183,181,254,0.28)',
                        flexShrink:      0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-cjk)',
                          fontSize:   '12px',
                          fontWeight: 500,
                          color:      gilt ? '#F5C842' : '#b7b5fe',
                        }}
                      >
                        {cjk}
                      </span>
                    </div>
                    <div>
                      <h4
                        style={{
                          fontFamily:   'var(--font-latin)',
                          fontWeight:   700,
                          fontSize:     '16px',
                          color:        gilt ? '#F5C842' : '#F0F0F0',
                          marginBottom: '4px',
                        }}
                      >
                        {step}
                      </h4>
                      <p
                        style={{
                          fontFamily: 'var(--font-latin)',
                          fontWeight: 400,
                          fontSize:   '14px',
                          color:      'rgba(240,240,240,0.65)',
                          lineHeight: 1.6,
                        }}
                      >
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Loop diagram */}
            <div>
              <LoopDiagram />
            </div>

          </div>
        </div>
      </section>

      {/* ══ §5 WHO WE SERVE ══════════════════════════════════
          Light (#F5F5FF). 3-col family-type cards.
          Quote block inside each card — tinted lavender bg.
          Matches Figma F4 light card pattern.
      ════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="container-section">

          <div className="mb-12">
            <Eyebrow>Who DODO Is For</Eyebrow>
            <h2
              style={{
                fontFamily:    'var(--font-latin)',
                fontWeight:    600,
                fontSize:      'clamp(28px, 4vw, 48px)',
                color:         '#0E0E12',
                letterSpacing: '-0.025em',
                lineHeight:    1.15,
              }}
            >
              Three families. One program.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHO_WE_SERVE.map((family) => (
              <LightCard key={family.type} accentTop>
                <p
                  style={{
                    fontFamily:    'var(--font-cjk)',
                    fontWeight:    500,
                    fontSize:      '11px',
                    color:         '#b7b5fe',
                    letterSpacing: '0.1em',
                    marginBottom:  '10px',
                  }}
                >
                  {family.cjk}
                </p>
                <h3
                  style={{
                    fontFamily:   'var(--font-latin)',
                    fontWeight:   600,
                    fontSize:     '18px',
                    color:        '#0E0E12',
                    lineHeight:   1.3,
                    marginBottom: '16px',
                  }}
                >
                  {family.type}
                </h3>
                {/* Parent fear — tinted quote block */}
                <div
                  className="rounded-xl mb-4"
                  style={{
                    backgroundColor: 'rgba(183,181,254,0.07)',
                    border:          '1px solid rgba(183,181,254,0.15)',
                    padding:         '14px 16px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-latin)',
                      fontWeight: 400,
                      fontSize:   '13px',
                      color:      'rgba(14,14,18,0.55)',
                      lineHeight: 1.55,
                      fontStyle:  'italic',
                    }}
                  >
                    &ldquo;{family.fear}&rdquo;
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-latin)',
                    fontWeight: 400,
                    fontSize:   '14px',
                    color:      '#212830',
                    lineHeight: 1.65,
                  }}
                >
                  {family.solution}
                </p>
              </LightCard>
            ))}
          </div>

        </div>
      </section>

      {/* ══ §6 NAVIGATOR PHILOSOPHY ══════════════════════════
          Dark (#0E0E12). Large blockquote + badge row + link.
          Matches Figma F5 navigator profile section visual weight.
          No photo placeholder needed — brand philosophy focus.
      ════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div className="container-section">
          <div className="max-w-[800px]">

            <Eyebrow>Our Navigators</Eyebrow>

            {/* Blockquote — lavender left border, Figma F5 text hierarchy */}
            <blockquote
              style={{
                fontFamily:  'var(--font-latin)',
                fontWeight:  300,
                fontSize:    'clamp(22px, 3vw, 36px)',
                color:       '#F0F0F0',
                lineHeight:  1.5,
                fontStyle:   'italic',
                borderLeft:  '3px solid #b7b5fe',
                paddingLeft: '1.5rem',
                marginBottom: '2.5rem',
              }}
            >
              &ldquo;Your child&rsquo;s Navigator knows their voice, their pace, their gaps.
              They don&rsquo;t just teach — they guide.&rdquo;
            </blockquote>

            <p
              style={{
                fontFamily:   'var(--font-latin)',
                fontWeight:   400,
                fontSize:     '16px',
                color:        'rgba(240,240,240,0.65)',
                lineHeight:   1.75,
                marginBottom: '2rem',
                maxWidth:     '640px',
              }}
            >
              A Navigator is not a tutor. They don&rsquo;t sit beside your child and
              watch them work through problems. They know your child&rsquo;s Lexile
              baseline. They know their 6+1 Trait writing profile. They know the gap
              between where your child is and where they&rsquo;re going — and they close
              it, week by week, session by session. Backgrounds in composition,
              literature, and academic writing. Not table stakes — the actual standard.
            </p>

            {/* Badge row — matches Figma F5 ConsultBadge usage */}
            <div className="mb-8">
              <ConsultBadge>Lexile Specialist</ConsultBadge>
              <ConsultBadge>6+1 Trait Certified</ConsultBadge>
              <ConsultBadge>Academic Writing</ConsultBadge>
              <ConsultBadge>Bilingual Methodology</ConsultBadge>
            </div>

            <Link
              href="/navigators"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
              style={{
                fontFamily: 'var(--font-latin)',
                fontWeight: 500,
                fontSize:   '15px',
                color:      '#b7b5fe',
              }}
            >
              Meet our Navigators
              <IconArrowRight />
            </Link>

          </div>
        </div>
      </section>

      {/* ══ §7 CLOSING CTA ═══════════════════════════════════
          Dark (#212830). Centred. Gilt CTA button.
          Exact Figma F7 layout: max-w-[800px], py-12 inner,
          h2 #b7b5fe clamp(28-48px), gilt button, 13px sub text.
          Brand stamp: "Think Once. In Both Languages." — never paraphrased.
      ════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#212830' }}>
        <div className="container-section">
          <div
            className="text-center max-w-[800px] mx-auto"
            style={{ paddingTop: '48px', paddingBottom: '48px' }}
          >
            {/* Brand stamp */}
            <p
              style={{
                fontFamily:    'var(--font-latin)',
                fontWeight:    600,
                fontSize:      '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color:         '#b7b5fe',
                marginBottom:  '28px',
              }}
            >
              Think Once. In Both Languages.
            </p>

            <h2
              style={{
                fontFamily:    'var(--font-latin)',
                fontWeight:    700,
                fontSize:      'clamp(28px, 4vw, 48px)',
                color:         '#b7b5fe',
                letterSpacing: '-0.025em',
                lineHeight:    1.3,
                marginBottom:  '12px',
              }}
            >
              The call is 20 minutes. The decision it leads to can last years.
            </h2>

            <p
              style={{
                fontFamily:    'var(--font-cjk)',
                fontWeight:    400,
                fontSize:      '14px',
                color:         'rgba(183,181,254,0.45)',
                letterSpacing: '0.08em',
                marginBottom:  '2.5rem',
              }}
            >
              从一次诊断性对话开始
            </p>

            {/* Gilt CTA — Charter Enrollment moment */}
            <div className="flex flex-col items-center gap-4">
              <Link
                href="/consult"
                className="inline-flex items-center justify-center gap-2 rounded-lg transition-all hover:opacity-90"
                style={{
                  fontFamily:      'var(--font-latin)',
                  fontWeight:      700,
                  fontSize:        '16px',
                  backgroundColor: '#F5C842',
                  color:           '#0E0E12',
                  padding:         '16px 40px',
                }}
              >
                Book Your Diagnostic Call
              </Link>

              <p
                style={{
                  fontFamily: 'var(--font-latin)',
                  fontWeight: 400,
                  fontSize:   '13px',
                  color:      '#b7b5fe',
                  opacity:    0.55,
                }}
              >
                20 minutes · No obligation · A Navigator, not a sales call
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}