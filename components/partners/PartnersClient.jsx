'use client'

// components/partners/PartnersClient.jsx
//
// Partners portal — invite-only access for education consultants,
// immigration advisors, and referral partners.
//
// Access mechanism: client-side PIN gate (social access control, not security).
// PIN persisted in localStorage so partners don't re-enter on refresh.
// Content is EN-only — partner audience is English-speaking B2B.
//
// PIN: dodopartners
// Storage key: dodo_partners_unlocked

import { useState, useEffect } from 'react'
import Link from 'next/link'

// ── Access constant ───────────────────────────────────────────
const CORRECT_PIN   = 'dodopartners'
const STORAGE_KEY   = 'dodo_partners_unlocked'

// ── Sub-components ────────────────────────────────────────────
function Eyebrow({ children, center = false, dark = false }) {
  return (
    <div style={{
      fontFamily:    'var(--font-latin)',
      fontWeight:    500,
      fontSize:      '12px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color:         dark ? '#b7b5fe' : '#5856cc',
      marginBottom:  '16px',
      textAlign:     center ? 'center' : undefined,
    }}>
      {children}
    </div>
  )
}

function Pill({ children }) {
  return (
    <span style={{
      display:         'inline-block',
      fontFamily:      'var(--font-latin)',
      fontSize:        '12px',
      fontWeight:      500,
      color:           '#b7b5fe',
      backgroundColor: 'rgba(183,181,254,0.12)',
      border:          '1px solid rgba(183,181,254,0.25)',
      borderRadius:    '9999px',
      padding:         '4px 12px',
      marginRight:     '8px',
      marginBottom:    '8px',
    }}>
      {children}
    </span>
  )
}

// ── Gate view (locked) ────────────────────────────────────────
function GateView({ input, setInput, onSubmit, onKeyDown, error, shake }) {
  return (
    <div style={{
      minHeight:      '100dvh',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      backgroundColor: '#0E0E12',
      padding:        '2rem',
      fontFamily:     'var(--font-latin)',
    }}>
      <style>{`
        @keyframes gate-shake {
          0%   { transform: translateX(0);    }
          15%  { transform: translateX(-7px); }
          30%  { transform: translateX(7px);  }
          45%  { transform: translateX(-5px); }
          60%  { transform: translateX(5px);  }
          75%  { transform: translateX(-3px); }
          90%  { transform: translateX(3px);  }
          100% { transform: translateX(0);    }
        }
        .gate-shake { animation: gate-shake 0.55s ease; }
        .gate-input:focus {
          outline:      none;
          border-color: #b7b5fe;
          box-shadow:   0 0 0 3px rgba(183,181,254,0.15);
        }
        .gate-btn:hover  { background-color: #c8c6ff; }
        .gate-btn:active { transform: scale(0.97); }
      `}</style>

      {/* Logo */}
      <div style={{ marginBottom: '48px', opacity: 0.9 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-dark.svg"
          alt="DODO Learning"
          width={120}
          height={40}
          style={{ display: 'block' }}
        />
      </div>

      {/* Gate card */}
      <div
        className={shake ? 'gate-shake' : ''}
        style={{
          width:           '100%',
          maxWidth:        '400px',
          backgroundColor: '#161820',
          border:          '1px solid rgba(183,181,254,0.18)',
          borderRadius:    '16px',
          padding:         '40px 36px',
          boxShadow:       '0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        {/* Label */}
        <div style={{
          fontSize:      '11px',
          fontWeight:    600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         '#b7b5fe',
          marginBottom:  '12px',
          textAlign:     'center',
        }}>
          Partner Portal
        </div>

        <p style={{
          fontSize:     '15px',
          fontWeight:   400,
          color:        'rgba(240,240,240,0.6)',
          lineHeight:   1.6,
          textAlign:    'center',
          marginBottom: '32px',
        }}>
          This page is for invited partners.<br />
          Enter your access code to continue.
        </p>

        {/* PIN input */}
        <input
          className="gate-input"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Access code"
          value={input}
          onChange={(e) => { setInput(e.target.value); }}
          onKeyDown={onKeyDown}
          style={{
            display:         'block',
            width:           '100%',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border:          `1px solid ${error ? 'rgba(255,100,100,0.5)' : 'rgba(183,181,254,0.25)'}`,
            borderRadius:    '10px',
            padding:         '14px 16px',
            fontSize:        '15px',
            fontWeight:      400,
            color:           '#F0F0F0',
            fontFamily:      'var(--font-latin)',
            letterSpacing:   '0.08em',
            marginBottom:    error ? '10px' : '20px',
            transition:      'border-color 0.2s, box-shadow 0.2s',
            boxSizing:       'border-box',
          }}
        />

        {/* Error message */}
        {error && (
          <p style={{
            fontSize:     '13px',
            fontWeight:   400,
            color:        'rgba(255,120,120,0.85)',
            textAlign:    'center',
            marginBottom: '16px',
            lineHeight:   1.4,
          }}>
            That code doesn't match. Check with your contact at DODO.
          </p>
        )}

        {/* Submit button */}
        <button
          className="gate-btn"
          onClick={onSubmit}
          style={{
            display:         'block',
            width:           '100%',
            backgroundColor: '#b7b5fe',
            color:           '#0E0E12',
            fontSize:        '15px',
            fontWeight:      600,
            fontFamily:      'var(--font-latin)',
            padding:         '14px 24px',
            borderRadius:    '10px',
            border:          'none',
            cursor:          'pointer',
            transition:      'background-color 0.15s, transform 0.1s',
            letterSpacing:   '0.01em',
          }}
        >
          Access Partner Content
        </button>
      </div>

      {/* Footer note */}
      <p style={{
        marginTop:  '32px',
        fontSize:   '13px',
        fontWeight: 400,
        color:      'rgba(240,240,240,0.25)',
        textAlign:  'center',
        lineHeight: 1.5,
      }}>
        Don&rsquo;t have a code? Reach out to{' '}
        <a
          href="mailto:hello@dodolearning.com"
          style={{ color: 'rgba(183,181,254,0.6)', textDecoration: 'none' }}
        >
          hello@dodolearning.com
        </a>
      </p>
    </div>
  )
}

// ── Unlocked content ──────────────────────────────────────────
function PartnersContent({ locale }) {
  return (
    <div style={{ fontFamily: 'var(--font-latin)', width: '100%', overflow: 'hidden' }}>

      {/* ── HERO ─────────────────────────────────────────────
          Dark, premium, partner-facing. No hero image.
          Typography-first — this is a brief, not a brochure.
      */}
      <section style={{
        minHeight:       'min(90dvh, 780px)',
        display:         'flex',
        flexDirection:   'column',
        justifyContent:  'flex-end',
        position:        'relative',
        overflow:        'hidden',
        backgroundColor: '#0E0E12',
        paddingTop:      'calc(var(--nav-height) + 4rem)',
        paddingBottom:   '5rem',
      }}>
        {/* Lavender radial accent */}
        <div aria-hidden="true" style={{
          position:   'absolute',
          inset:      0,
          background: 'radial-gradient(ellipse 60% 55% at 18% 65%, rgba(183,181,254,0.09) 0%, transparent 65%)',
        }} />

        {/* Background watermark */}
        <div aria-hidden="true" style={{
          position:      'absolute',
          bottom:        '-40px',
          right:         '-40px',
          fontSize:      '320px',
          fontWeight:    700,
          color:         '#b7b5fe',
          opacity:       0.035,
          lineHeight:    1,
          letterSpacing: '-0.04em',
          userSelect:    'none',
          pointerEvents: 'none',
        }}>
          PARTNER
        </div>

        <div className="px-6 relative z-10" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          {/* Invite chip */}
          <div style={{
            display:         'inline-flex',
            alignItems:      'center',
            gap:             '8px',
            backgroundColor: 'rgba(183,181,254,0.1)',
            border:          '1px solid rgba(183,181,254,0.25)',
            borderRadius:    '9999px',
            padding:         '5px 14px',
            marginBottom:    '32px',
          }}>
            <span style={{
              width:           '7px',
              height:          '7px',
              borderRadius:    '9999px',
              backgroundColor: '#b7b5fe',
              display:         'inline-block',
            }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#b7b5fe', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Invited Partners
            </span>
          </div>

          <h1 style={{
            fontSize:   'clamp(36px, 5vw, 64px)',
            fontWeight: 700,
            color:      '#F0F0F0',
            lineHeight: 1.15,
            maxWidth:   '820px',
            marginBottom: '28px',
          }}>
            The families you advise have solved every hard problem.{' '}
            <span style={{ color: '#b7b5fe' }}>Their child&rsquo;s English</span>{' '}
            is the one gap left on the table.
          </h1>

          <p style={{
            fontSize:   'clamp(16px, 2vw, 20px)',
            fontWeight: 400,
            color:      'rgba(240,240,240,0.55)',
            lineHeight: 1.65,
            maxWidth:   '620px',
            marginBottom: '48px',
          }}>
            Chinese immigrant families in Canada and the US are expert navigators. Immigration, housing, financial planning, school admissions — solved. Their child&rsquo;s English development at the cognitive level? That one remains open. Not because they haven&rsquo;t tried. Because what&rsquo;s available doesn&rsquo;t work at the level these families expect.
          </p>

          {/* Proof strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
            {[
              { num: '16', label: 'Weeks per cohort' },
              { num: '6–12', label: 'Student age range' },
              { num: '1:1', label: 'Navigator per student' },
              { num: '200+', label: 'Avg. Lexile gain' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 700, color: '#b7b5fe', lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(240,240,240,0.45)', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S2 THE PROGRAM IN 90 SECONDS ─────────────────────
          What partners would tell a client over coffee.
          Three column cards: Method / Measurement / Model.
      */}
      <section className="px-6 py-24" style={{ backgroundColor: '#212830' }}>
        <div className="container-section">
          <Eyebrow dark center>The Program</Eyebrow>
          <h2 className="text-center mb-6" style={{
            fontSize:   'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            color:      '#F0F0F0',
            lineHeight: 1.25,
          }}>
            What you&rsquo;d tell a client in 90 seconds.
          </h2>
          <p className="text-center mb-16 mx-auto" style={{
            fontSize:  '16px',
            fontWeight: 400,
            color:     'rgba(240,240,240,0.5)',
            lineHeight: 1.6,
            maxWidth:  '560px',
          }}>
            DODO Learning is not a tutoring center, not an ESL program, not a reading support service. Here&rsquo;s what it actually is.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                label:    'The Method',
                headline: 'Read → Think → Speak → Write',
                body:     '16 weeks. Live, 1:1 sessions. A structured sequence — The Loop — that trains children to argue a position, read analytical prose, and write with intention. Not drill-based. Not homework support. A cognitive development program that happens in English.',
                accent:   '#b7b5fe',
              },
              {
                label:    'The Measurement',
                headline: 'A number. Every 16 weeks.',
                body:     'Progress tracked by Lexile levels — a nationally recognized reading metric used by schools across North America. Your client will have a before and after number at the end of every cycle. That\'s what they\'ll tell you about.',
                accent:   '#F5C842',
              },
              {
                label:    'The Model',
                headline: 'One Navigator. Full 16 weeks.',
                body:     'Not a rotating roster of instructors. Not a different face each session. One Navigator per child — a longitudinal guide who knows this child\'s voice, pace, and specific gaps across the full program. The relationship is the methodology.',
                accent:   '#7EC8A0',
              },
            ].map(({ label, headline, body, accent }) => (
              <div key={label} style={{
                backgroundColor: '#2E3848',
                borderRadius:    '16px',
                padding:         '32px',
                borderTop:       `3px solid ${accent}`,
              }}>
                <div style={{
                  fontSize:      '11px',
                  fontWeight:    600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:         accent,
                  opacity:        0.85,
                  marginBottom:  '12px',
                }}>
                  {label}
                </div>
                <div style={{
                  fontSize:     '20px',
                  fontWeight:   700,
                  color:        '#F0F0F0',
                  lineHeight:   1.3,
                  marginBottom: '16px',
                }}>
                  {headline}
                </div>
                <p style={{
                  fontSize:   '15px',
                  fontWeight: 400,
                  color:      'rgba(240,240,240,0.65)',
                  lineHeight: 1.65,
                }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S3 WHO'S THE RIGHT FIT ────────────────────────────
          Partner qualification guide. Clear criteria so partners
          self-qualify referrals well. Better referrals = happier clients.
      */}
      <section className="px-6 py-24" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="container-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

            {/* Left — intro */}
            <div>
              <Eyebrow>Who Fits</Eyebrow>
              <h2 style={{
                fontSize:     'clamp(28px, 4vw, 44px)',
                fontWeight:   700,
                color:        '#0E0E12',
                lineHeight:   1.25,
                marginBottom: '20px',
              }}>
                Refer well.<br />
                <span style={{ color: '#5856cc' }}>Your clients will thank you.</span>
              </h2>
              <p style={{
                fontSize:     '16px',
                fontWeight:   400,
                color:        '#3D4452',
                lineHeight:   1.65,
                marginBottom: '24px',
              }}>
                Partners who understand the fit criteria refer better. Their clients arrive with the right expectations and leave with measurable results. That&rsquo;s the referral that builds your practice.
              </p>
              <p style={{
                fontSize:   '16px',
                fontWeight: 400,
                color:      '#3D4452',
                lineHeight: 1.65,
              }}>
                When a client asks &ldquo;where did you find this?&rdquo; at their six-month check-in — they&rsquo;ll say your name first.
              </p>
            </div>

            {/* Right — criteria */}
            <div>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius:    '16px',
                border:          '1px solid rgba(14,14,18,0.1)',
                overflow:        'hidden',
              }}>
                {/* Good fit */}
                <div style={{ padding: '28px 32px', borderBottom: '1px solid rgba(14,14,18,0.08)' }}>
                  <div style={{
                    fontSize:      '11px',
                    fontWeight:    600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color:         '#7EC8A0',
                    marginBottom:  '16px',
                  }}>
                    ✓ Strong Referral
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      'Child aged 6–12, currently in an English-dominant school',
                      'Chinese immigrant family — Canada or the US',
                      'Parent expects mastery-level English, not tutoring',
                      'Family can commit to 16 consecutive weeks',
                      'Child is engaged, not in crisis — building ahead, not catching up',
                    ].map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ color: '#7EC8A0', fontWeight: 700, marginTop: '2px', flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: '15px', fontWeight: 400, color: '#212830', lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Not a fit */}
                <div style={{ padding: '28px 32px', backgroundColor: '#FAFAFA' }}>
                  <div style={{
                    fontSize:      '11px',
                    fontWeight:    600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color:         'rgba(14,14,18,0.4)',
                    marginBottom:  '16px',
                  }}>
                    Not a fit for DODO
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      'Families looking for test prep or exam coaching',
                      'Emergency academic intervention or catch-up cases',
                      'Children who need individualized learning support (IEP)',
                    ].map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ color: 'rgba(14,14,18,0.3)', fontWeight: 700, marginTop: '2px', flexShrink: 0 }}>—</span>
                        <span style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(14,14,18,0.45)', lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── S4 WHY THE REFERRAL REFLECTS ON YOU ──────────────
          The trust layer. Named frameworks as the proof.
          Methodology is citable, researched, and attributable.
      */}
      <section className="px-6 py-24" style={{ backgroundColor: '#0E0E12' }}>
        <div className="container-section">
          <Eyebrow dark center>Methodology</Eyebrow>
          <h2 className="text-center mb-6" style={{
            fontSize:     'clamp(28px, 4vw, 44px)',
            fontWeight:   700,
            color:        '#F0F0F0',
            lineHeight:   1.25,
            maxWidth:     '700px',
            margin:       '0 auto 20px',
          }}>
            When you refer DODO, you co-sign an outcome. Here&rsquo;s what makes it defensible.
          </h2>
          <p className="text-center mx-auto mb-16" style={{
            fontSize:   '16px',
            fontWeight: 400,
            color:      'rgba(240,240,240,0.5)',
            lineHeight: 1.65,
            maxWidth:   '560px',
          }}>
            Every framework below is named, researched, and attributable. Your clients can look it up. Their schools will recognize it. That&rsquo;s what makes the referral worth making.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                name:  'Lexile Framework for Reading',
                org:   'MetaMetrics',
                body:  'A nationally recognized reading metric used by schools and programs across North America. DODO tracks every student\'s Lexile level before and after each 16-week cycle. The number is verifiable, school-compatible, and parent-readable.',
                color: '#b7b5fe',
              },
              {
                name:  'MCT Language Arts',
                org:   'Michael Clay Thompson',
                body:  'One of the most rigorous classical ELA programs in North America — built for students capable of genuine mastery. Etymology-based vocabulary, integrated grammar and literary craft, discussion-based rather than drill-based. DODO\'s writing program is grounded in the principles of this framework.',
                color: '#F5C842',
              },
              {
                name:  'Harvard Project Zero Thinking Routines',
                org:   'Harvard Graduate School of Education',
                body:  'Research-based thinking protocols embedded in every DODO session. Students use structured cognitive scaffolds — not generic comprehension questions — to analyze texts, defend positions, and develop analytical habits that transfer across subjects.',
                color: '#7EC8A0',
              },
            ].map(({ name, org, body, color }) => (
              <div key={name} style={{
                backgroundColor: '#1A1C24',
                borderRadius:    '16px',
                padding:         '32px',
                border:          '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{
                  fontSize:      '11px',
                  fontWeight:    500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color:         'rgba(240,240,240,0.3)',
                  marginBottom:  '8px',
                }}>
                  {org}
                </div>
                <div style={{
                  fontSize:     '17px',
                  fontWeight:   700,
                  color,
                  lineHeight:   1.3,
                  marginBottom: '16px',
                }}>
                  {name}
                </div>
                <p style={{
                  fontSize:   '14px',
                  fontWeight: 400,
                  color:      'rgba(240,240,240,0.6)',
                  lineHeight: 1.65,
                }}>
                  {body}
                </p>
              </div>
            ))}
          </div>

          {/* Pull quote */}
          <div style={{
            borderLeft:  '3px solid #b7b5fe',
            paddingLeft: '28px',
            maxWidth:    '700px',
            margin:      '0 auto',
          }}>
            <p style={{
              fontSize:   'clamp(18px, 2.5vw, 24px)',
              fontWeight: 300,
              fontStyle:  'italic',
              color:      'rgba(240,240,240,0.75)',
              lineHeight: 1.55,
            }}>
              &ldquo;普通英文课教孩子怎么答题。DODO Learning训练孩子怎么思考。这两件事的区别，十年后才真正显现出来。&rdquo;
            </p>
            <p style={{
              fontSize:   '13px',
              fontWeight: 500,
              color:      '#b7b5fe',
              marginTop:  '12px',
              opacity:    0.8,
            }}>
              What families tell other families.
            </p>
          </div>
        </div>
      </section>

      {/* ── S5 WHAT PARTNERS GET ──────────────────────────────
          Practical. What the referral relationship looks like.
      */}
      <section className="px-6 py-24" style={{ backgroundColor: '#212830' }}>
        <div className="container-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <Eyebrow dark>For Partners</Eyebrow>
              <h2 style={{
                fontSize:     'clamp(28px, 4vw, 40px)',
                fontWeight:   700,
                color:        '#F0F0F0',
                lineHeight:   1.25,
                marginBottom: '28px',
              }}>
                A referral relationship built on outcomes, not commission structures.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  {
                    label: 'Client-first fit assessment',
                    body:  'Every referred family receives a free Lexile baseline assessment before enrollment. No obligation. This gives your client a concrete starting point — and you a proof point.',
                  },
                  {
                    label: 'Measurable outcomes to report back',
                    body:  'At the end of each 16-week cycle, parents receive a written Lexile progress report and a 6+1 Trait writing assessment summary. You\'ll know exactly how the referral performed.',
                  },
                  {
                    label: 'Material on request',
                    body:  'A one-page partner brief, a printable parent overview, and a slide deck for client presentations are available on request. Use them in your own language.',
                  },
                  {
                    label: 'Direct access to Peter',
                    body:  'Book a 30-minute call below to discuss your client base, whether DODO is the right fit, and how we can support each other\'s work.',
                  },
                ].map(({ label, body }) => (
                  <div key={label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      width:           '8px',
                      height:          '8px',
                      borderRadius:    '9999px',
                      backgroundColor: '#b7b5fe',
                      marginTop:       '8px',
                      flexShrink:      0,
                    }} />
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: '#F0F0F0', marginBottom: '4px' }}>{label}</div>
                      <p style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(240,240,240,0.6)', lineHeight: 1.6 }}>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Capability tags */}
            <div style={{
              backgroundColor: '#2E3848',
              borderRadius:    '20px',
              padding:         '40px 36px',
              border:          '1px solid rgba(183,181,254,0.12)',
            }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(240,240,240,0.4)', marginBottom: '20px', letterSpacing: '0.05em' }}>
                Partner toolkit
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '32px' }}>
                {[
                  'Free Lexile Assessment', 'Written Progress Reports',
                  'Partner Brief (PDF)', 'Slide Deck Available',
                  '6+1 Trait Summaries', 'Co-presentation Support',
                  'Direct Founder Access', 'EN + ZH Materials',
                ].map((tag) => <Pill key={tag}>{tag}</Pill>)}
              </div>
              <div style={{
                borderTop:    '1px solid rgba(183,181,254,0.12)',
                paddingTop:   '28px',
                marginTop:    '4px',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(240,240,240,0.4)', marginBottom: '4px' }}>
                  Cities currently served
                </div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: 'rgba(240,240,240,0.75)', lineHeight: 1.6 }}>
                  Toronto · Vancouver · Calgary · Montreal · Richmond BC · Markham
                </div>
                <div style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(240,240,240,0.35)', marginTop: '4px' }}>
                  Online delivery — no geographic constraint
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S6 CLOSING CTA ────────────────────────────────────
          Two paths: book a call, or request partner materials.
      */}
      <section className="px-6 py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display:         'inline-flex',
            alignItems:      'center',
            gap:             '8px',
            backgroundColor: 'rgba(183,181,254,0.08)',
            border:          '1px solid rgba(183,181,254,0.2)',
            borderRadius:    '9999px',
            padding:         '5px 16px',
            marginBottom:    '32px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#b7b5fe', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#b7b5fe', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Let&rsquo;s Talk
            </span>
          </div>

          <h2 style={{
            fontSize:     'clamp(30px, 5vw, 52px)',
            fontWeight:   700,
            color:        '#F0F0F0',
            lineHeight:   1.2,
            marginBottom: '20px',
          }}>
            Ready to refer with confidence?
          </h2>
          <p style={{
            fontSize:     '18px',
            fontWeight:   400,
            color:        'rgba(240,240,240,0.55)',
            lineHeight:   1.65,
            marginBottom: '48px',
            maxWidth:     '560px',
            margin:       '0 auto 48px',
          }}>
            Book a 30-minute call with Peter to discuss your client base, whether DODO is the right fit, and what the referral relationship looks like in practice.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <Link
              href={`/${locale}/consult`}
              style={{
                display:         'inline-block',
                backgroundColor: '#F5C842',
                color:           '#0E0E12',
                fontSize:        '17px',
                fontWeight:      600,
                padding:         '16px 36px',
                borderRadius:    '12px',
                textDecoration:  'none',
                boxShadow:       '0 4px 24px rgba(245,200,66,0.25)',
                transition:      'transform 0.15s',
              }}
            >
              Book a Partner Call
            </Link>

            <a
              href="mailto:hello@dodolearning.com?subject=Partner%20Materials%20Request"
              style={{
                display:         'inline-block',
                backgroundColor: 'transparent',
                color:           '#F0F0F0',
                fontSize:        '17px',
                fontWeight:      500,
                padding:         '16px 36px',
                borderRadius:    '12px',
                textDecoration:  'none',
                border:          '1px solid rgba(240,240,240,0.2)',
                transition:      'border-color 0.15s',
              }}
            >
              Request Partner Materials
            </a>
          </div>

          <p style={{
            fontSize:   '13px',
            fontWeight: 400,
            color:      'rgba(240,240,240,0.25)',
            marginTop:  '28px',
          }}>
            Think Once. In Both Languages.
          </p>
        </div>
      </section>

    </div>
  )
}

// ── Main export ───────────────────────────────────────────────
export default function PartnersClient({ locale }) {
  const [input,   setInput]   = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error,   setError]   = useState(false)
  const [shake,   setShake]   = useState(false)
  const [mounted, setMounted] = useState(false)

  // Hydration-safe localStorage read
  useEffect(() => {
    setMounted(true)
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') {
        setUnlocked(true)
      }
    } catch {
      // localStorage unavailable (private mode) — PIN required each session
    }
  }, [])

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === CORRECT_PIN) {
      try { localStorage.setItem(STORAGE_KEY, '1') } catch {}
      setError(false)
      setUnlocked(true)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  // Avoid hydration mismatch — render nothing until client-side mount
  if (!mounted) {
    return (
      <div style={{
        minHeight:       '100dvh',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        backgroundColor: '#0E0E12',
      }} />
    )
  }

  if (!unlocked) {
    return (
      <GateView
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        error={error}
        shake={shake}
      />
    )
  }

  return <PartnersContent locale={locale} />
}