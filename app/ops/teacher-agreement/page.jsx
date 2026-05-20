// app/ops/teacher-agreement/page.jsx
//
// Teacher Service Agreement generator — ops tool v1.0
//
// next/dynamic with ssr: false must live in a Client Component.
// AgreementLoader (client) handles the dynamic import.
// This page (server) just renders the loader.
//
// Not in sitemap. noIndex: true.

import AgreementLoader from '@/components/ops/AgreementLoader'

export const metadata = {
  title: 'Teacher Service Agreement — DODO Ops',
  robots: { index: false, follow: false },
}

export default function TeacherAgreementPage() {
  return <AgreementLoader />
}
