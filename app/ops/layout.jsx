// app/ops/layout.jsx
//
// Ops section layout — wraps all /ops/* routes in the client-side PIN gate.
// Not locale-aware: ops tools are internal, English-only.
// Not in sitemap. noIndex applied per-page via metadata.
//
// Route coverage:
//   /ops            → ops index (tool list)
//   /ops/assessment → Student Baseline Assessment Report generator
//   /ops/onboarding → Student Enrollment Welcome Packet generator (Tool 2 — TBD)

import OpsGate from '@/components/ops/OpsGate'

export default function OpsLayout({ children }) {
  return <OpsGate>{children}</OpsGate>
}
