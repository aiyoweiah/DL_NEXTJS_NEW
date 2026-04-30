// app/ops/assessment/page.jsx
//
// Student Baseline Assessment Report generator — ops tool v3.1.1
//
// Loaded via next/dynamic with ssr: false because:
//   1. jsPDF and html2canvas are browser-only (DOM/Canvas APIs)
//   2. The hidden off-screen PDF page divs must render client-side
//   3. static export (output: 'export') is incompatible with SSR for these libs
//
// The PIN gate is handled by app/ops/layout.jsx — no gate needed here.
// Not in sitemap. noIndex: true.

import dynamic from 'next/dynamic'

export const metadata = {
  title: 'Baseline Assessment Report — DODO Ops',
  robots: { index: false, follow: false },
}

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

export default function AssessmentPage() {
  return <AssessmentTool />
}
