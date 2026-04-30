'use client'

// components/ops/AssessmentLoader.jsx
//
// Client component wrapper required because next/dynamic with ssr: false
// cannot be used in Server Components (Next.js 16 + Turbopack enforces this).
// page.jsx (server) renders this; this renders AssessmentTool dynamically.

import dynamic from 'next/dynamic'

const AssessmentTool = dynamic(
  () => import('@/components/ops/AssessmentTool'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        minHeight: '100dvh',
        backgroundColor: '#0E0E12',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"DM Sans", sans-serif',
        color: '#5E6879',
        fontSize: 14,
      }}>
        Loading assessment tool…
      </div>
    ),
  }
)

export default function AssessmentLoader() {
  return <AssessmentTool />
}
