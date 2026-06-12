// components/ui/K2Note.jsx
//
// Small inline callout that acknowledges the K-2 sibling band (Little DODO)
// from within an ELA Program page. Used on /methodology, /lexile, /results,
// /compare, /navigators per the program-family-parallel workstream
// (Step 6, Tier 2 callouts).
//
// Surface: light tinted (#EAEAF8) — sits between sections without competing
// with primary content. Honours v6.2 section-spacing protocol.
//
// Visual review 2026-06-11: subtle design polish to encourage exploration
// without standing out. Three small affordances:
//   1. A thin lavender left-accent rail on the inner block — signals "callout"
//      visually without using a heavy box or icon.
//   2. Whole-block hover state — background lifts a hair toward lavender,
//      cursor reads as actionable.
//   3. Animated arrow on the link that nudges right on hover.

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
        <Link
          href={`/${locale}${copy.href}`}
          className="group block rounded-lg transition-colors duration-150"
          style={{
            color:         '#3D4452',
            textDecoration: 'none',
          }}
        >
          <div
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-lg transition-all duration-150 group-hover:bg-[rgba(124,121,232,0.06)]"
            style={{
              padding:    '0.625rem 0.875rem 0.625rem 1rem',
              borderLeft: '2px solid rgba(124,121,232,0.45)',
            }}
          >
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.55, maxWidth: '56rem' }}>
              {copy.text}
            </p>
            <span
              className="shrink-0 text-sm font-semibold whitespace-nowrap inline-flex items-center gap-1 transition-colors duration-150 group-hover:text-[#3d3baa]"
              style={{ color: '#5856cc' }}
            >
              {copy.linkLabel}
              <span
                aria-hidden="true"
                className="transition-transform duration-150 group-hover:translate-x-1"
                style={{ marginLeft: '-0.125rem' }}
              >
                →
              </span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
