'use client'

// components/ops/AgreementLoader.jsx
//
// Client wrapper. next/dynamic with ssr: false cannot live in a Server
// Component (Next 16 + Turbopack enforces this), so page.jsx renders this
// and this renders AgreementTool dynamically.

import dynamic from 'next/dynamic'

const AgreementTool = dynamic(
  () => import('@/components/ops/AgreementTool'),
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
        Loading agreement tool…
      </div>
    ),
  }
)

export default function AgreementLoader() {
  return <AgreementTool />
}
