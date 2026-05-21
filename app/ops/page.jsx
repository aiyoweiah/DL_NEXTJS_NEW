// app/ops/page.jsx
//
// Ops tools index — lists available internal tools after PIN gate.
// Not in sitemap. noIndex: true.
//
// Tools:
//   /ops/assessment        → Student Baseline Assessment Report (v3.1.1)
//   /ops/onboarding        → Student Enrollment Welcome Packet (v1.7)
//   /ops/teacher-agreement → Teacher Service Agreement (v1.0)

import Link from 'next/link'

export const metadata = {
  title: 'Ops Tools — DODO Learning',
  robots: { index: false, follow: false },
}

const B = {
  voidBlack: '#0E0E12',
  deepVoid:  '#212830',
  midnight:  '#2E3848',
  lavender:  '#B7B5FE',
  gilt:      '#F5C842',
  softGreen: '#7EC8A0',
  platinum:  '#F0F0F0',
  muted:     '#5E6879',
  border:    '#2E3848',
  whisper:   '#F5F5FF',
}

const TOOLS = [
  {
    href:    '/ops/assessment',
    label:   'Baseline Assessment Report',
    version: 'v3.2.0',
    desc:    'Generate a 5-page PDF report from a student baseline evaluation. Covers Literature & Literacy, Speaking & Discussion, and Language Craft & Writing. Includes Lexile input, grade band modules, comment pools, and evaluator notes.',
    accent:  B.lavender,
    status:  'live',
  },
  {
    href:    '/ops/onboarding',
    label:   'Student Enrollment Welcome Packet',
    version: 'v2.8',
    desc:    'Generate the 4-page enrollment welcome packet: welcome letter, student info + QR codes, curriculum overview + Navigator intro, and terms page.',
    accent:  B.softGreen,
    status:  'live',
  },
  {
    href:    '/ops/teacher-agreement',
    label:   'Teacher Service Agreement',
    version: 'v1.1',
    desc:    'Generate the 4-page teacher service agreement: welcome letter with cursive signature, Schedule A service scope + Schedule B sections 1–4, Schedule B sections 5–9, and execution page with signature blocks, fillable teacher fields, and notes.',
    accent:  B.gilt,
    status:  'live',
  },
]

export default function OpsIndexPage() {
  return (
    <div style={{
      minHeight: '100dvh',
      backgroundColor: B.voidBlack,
      fontFamily: '"DM Sans", sans-serif',
      padding: '48px 24px 80px',
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          borderBottom: `1px solid ${B.border}`,
          paddingBottom: 24,
          marginBottom: 36,
        }}>
          <div style={{
            fontSize: 11,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: B.lavender,
            marginBottom: 8,
          }}>
            DODO Learning
          </div>
          <h1 style={{
            fontSize: 28,
            fontWeight: 700,
            color: B.platinum,
            margin: 0,
          }}>
            Internal Ops Tools
          </h1>
        </div>

        {/* Tool cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {TOOLS.map(tool => (
            <div
              key={tool.href}
              style={{
                background: B.deepVoid,
                border: `1px solid ${B.border}`,
                borderLeft: `3px solid ${tool.accent}`,
                borderRadius: 12,
                padding: '24px 28px',
                opacity: tool.status === 'coming' ? 0.6 : 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 10 }}>
                <div>
                  <div style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: B.platinum,
                    marginBottom: 2,
                  }}>
                    {tool.label}
                  </div>
                  <div style={{ fontSize: 11, color: B.muted, letterSpacing: 1 }}>
                    {tool.version}
                  </div>
                </div>
                {tool.status === 'live' ? (
                  <Link
                    href={tool.href}
                    style={{
                      padding: '9px 20px',
                      background: tool.accent,
                      color: B.voidBlack,
                      borderRadius: 7,
                      fontSize: 14,
                      fontWeight: 700,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    Open Tool →
                  </Link>
                ) : (
                  <span style={{
                    padding: '9px 16px',
                    background: B.midnight,
                    color: B.muted,
                    borderRadius: 7,
                    fontSize: 13,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    Coming next
                  </span>
                )}
              </div>
              <p style={{
                fontSize: 14,
                color: B.muted,
                lineHeight: 1.6,
                margin: 0,
              }}>
                {tool.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}