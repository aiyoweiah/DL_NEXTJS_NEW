// app/ops/assessment/page.jsx
//
// Student Baseline Assessment Report generator — ops tool v3.1.1
//
// next/dynamic with ssr: false must live in a Client Component.
// AssessmentLoader (client) handles the dynamic import.
// This page (server) just renders the loader.
//
// Not in sitemap. noIndex: true.

import AssessmentLoader from '@/components/ops/AssessmentLoader'

export const metadata = {
  title: 'Baseline Assessment Report — DODO Ops',
  robots: { index: false, follow: false },
}

export default function AssessmentPage() {
  return <AssessmentLoader />
}