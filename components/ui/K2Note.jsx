// components/ui/K2Note.jsx
//
// Small inline callout that acknowledges the K-2 sibling band (Little DODO)
// from within an ELA Program page. Used on /methodology, /lexile, /results,
// /compare, /navigators per the program-family-parallel workstream
// (Step 6, Tier 2 callouts).
//
// Surface: light tinted (#EAEAF8) — sits between sections without competing
// with primary content. Honours v6.2 section-spacing protocol.

import Link from 'next/link'

export default function K2Note({ locale, copy }) {
  if (!copy) return null
  return (
    <section
      aria-label="Little DODO note"
      style={{
        backgroundColor: '#EAEAF8',
        padding:         '1.5rem 0',
      }}
    >
      <div className="container-section">
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          style={{
            color: '#3D4452',
          }}
        >
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.55, maxWidth: '56rem' }}>
            {copy.text}
          </p>
          <Link
            href={`/${locale}${copy.href}`}
            className="shrink-0 text-sm font-semibold whitespace-nowrap"
            style={{ color: '#5856cc' }}
          >
            {copy.linkLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
