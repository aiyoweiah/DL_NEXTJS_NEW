// components/layout/Footer.jsx
//
// Server component — no 'use client', no event handlers. Hover via Tailwind only.
//
// Structure (v6.0 — June 2026, "funnel swap"):
//   1. Pre-footer CTA band   — dark (#212830), conversion moment. Extracted to
//                              PreCtaBand (client): firm consult close on every
//                              page, soft Watch offer on /consult itself.
//   2. Main footer grid      — light (#F5F5FF), columns: Brand | Program | Resources | Serving.
//                              Renamed Company → Resources. The Difference moved into Program.
//                              Watch a Class + Book a Consultation absorbed into Resources.
//                              Grid jumps sm:2 → md:4 (was sm:2 → lg:4) to kill the
//                              awkward 2+1+1+1 layout at tablet widths.
//   3. Trust strip           — light, 3 evidentiary cards (Lexile · 6+1 · Live).
//   4. Legal strip           — light, copyright + Privacy + Terms + locale switcher.
//
// Brand column now reserves a sibling-site cross-link line ("Also from DODO ·
// DODO Coding"), rendered only when env flag NEXT_PUBLIC_SHOW_CODING is set.
// Hidden until the sibling site ships — the slot is structurally present.
//
// All copy comes from `copy` prop, passed by app/[locale]/layout.jsx after
// resolving content/marketing.[locale].js → footer. EN-hardcoding gone.
//
// Logo: uses logo.svg (black fill #000000) — correct for light #F5F5FF.
// Contrast: body text uses #3D4452, lavender accents use #7c79e8 (AA on #F5F5FF).
// #b7b5fe (2.8:1 on white) is never used as text on light — #7c79e8 instead.

import Link           from 'next/link'
import LocaleSwitcher from '@/components/layout/LocaleSwitcher'
import PreCtaBand     from '@/components/layout/PreCtaBand'

// ── Sub-components ────────────────────────────────────────────

function FooterLink({ href, label, soon, comingSoonLabel }) {
  // "Coming soon" items render as a non-link span with a muted badge.
  if (soon) {
    return (
      <li>
        <span
          className="text-sm inline-flex items-center gap-2"
          style={{ color: '#7B8494' }}
        >
          {label}
          <span
            className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded"
            style={{
              color: '#7c79e8',
              backgroundColor: 'rgba(124,121,232,0.10)',
            }}
          >
            {comingSoonLabel}
          </span>
        </span>
      </li>
    )
  }

  return (
    <li>
      <Link
        href={href}
        className="text-sm text-[#3D4452] hover:text-[#7c79e8] transition-colors duration-150 focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#b7b5fe] focus-visible:ring-offset-1 focus-visible:ring-offset-[#F5F5FF]"
      >
        {label}
      </Link>
    </li>
  )
}

function ColHeading({ children }) {
  return (
    <h3
      className="text-xs font-semibold uppercase tracking-widest mb-5"
      style={{ color: '#7c79e8' }}
    >
      {children}
    </h3>
  )
}

// ── Main component ────────────────────────────────────────────
export default function Footer({ locale, copy }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer role="contentinfo">

      {/* ── 1. Pre-footer CTA band — dark (conversion moment) ──
              Path-aware variant lives in PreCtaBand (client): firm consult
              close everywhere, soft Watch offer on /consult itself. */}
      <PreCtaBand locale={locale} copy={copy} />

      {/* ── 2. Main footer grid — light ────────────────────── */}
      <div style={{ backgroundColor: '#F5F5FF' }}>
        <div className="container-section pt-14 pb-10">
          {/*
            Grid jumps sm:2 → md:4. Previously sm:2 → lg:4 left an awkward
            2+1+1+1 layout at 640–1023px (Brand spanned 2 cells). Now Brand
            is single-cell from md+, all four columns balanced from tablet up.
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">

            {/* Column 1: Brand */}
            <div className="sm:col-span-2 md:col-span-1">

              <Link
                href={`/${locale}`}
                className="inline-flex mb-6 focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#b7b5fe] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F5FF]"
                aria-label={copy.brand.logoAria}
              >
                {/* logo.svg — black fill (#000000), correct for light bg (#F5F5FF). */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.svg"
                  alt="DODO Learning"
                  width={77}
                  height={40}
                  style={{ height: '40px', width: 'auto', display: 'block' }}
                />
              </Link>

              <p
                className="text-sm leading-relaxed mb-6 max-w-[26ch]"
                style={{ color: '#3D4452' }}
              >
                {copy.brand.body}
              </p>

              <p
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: '#7c79e8' }}
              >
                {copy.brand.tagline}
              </p>

              {/*
                The DODO Family — cross-site sibling link (DODO Coding).
                Env-gate removed 2026-06-11; stacked layout per visual review:
                name + arrow on its own line, blurb as muted subtitle below.
              */}
              <div className="pt-4 mt-1 border-t border-[rgba(124,121,232,0.15)]">
                <p
                  className="text-[10px] font-semibold uppercase tracking-wider mb-2.5"
                  style={{ color: '#7c79e8', letterSpacing: '0.12em' }}
                >
                  {copy.sibling.label}
                </p>
                <a
                  href={copy.sibling.href}
                  className="group block"
                >
                  <p
                    className="text-sm font-semibold mb-1 inline-flex items-baseline gap-1.5 transition-colors duration-150 group-hover:text-[#7c79e8]"
                    style={{ color: '#0E0E12' }}
                  >
                    {copy.sibling.name}
                    <span
                      className="text-xs transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: '#7B8494' }}
                  >
                    {copy.sibling.blurb}
                  </p>
                </a>
              </div>

            </div>

            {/* Column 2: Program */}
            <div>
              <ColHeading>{copy.columns.program}</ColHeading>
              <ul className="space-y-3">
                {copy.program.map((link) => (
                  <FooterLink
                    key={link.href}
                    href={`/${locale}${link.href}`}
                    label={link.label}
                    soon={link.soon}
                    comingSoonLabel={copy.comingSoon}
                  />
                ))}
              </ul>
            </div>

            {/* Column 3: Resources (renamed from Company) */}
            <div>
              <ColHeading>{copy.columns.resources}</ColHeading>
              <ul className="space-y-3">
                {copy.resources.map((link) => (
                  <FooterLink
                    key={link.href}
                    href={`/${locale}${link.href}`}
                    label={link.label}
                    soon={link.soon}
                    comingSoonLabel={copy.comingSoon}
                  />
                ))}
              </ul>
            </div>

            {/* Column 4: Serving (cities) */}
            <div>
              <ColHeading>{copy.columns.serving}</ColHeading>
              <ul className="space-y-3">
                {copy.serving.map((link) => (
                  <FooterLink
                    key={link.href}
                    href={`/${locale}${link.href}`}
                    label={link.label}
                  />
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── 3. Trust strip — light ─────────────────────────── */}
      <div
        style={{
          backgroundColor: '#F5F5FF',
          borderTop: '1px solid rgba(14,14,18,0.08)',
        }}
      >
        <div className="container-section py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {copy.trust.map((signal) => (
              <div key={signal.id} className="flex items-start gap-3">
                <span
                  className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: '#7c79e8' }}
                  aria-hidden="true"
                />
                <div>
                  <p
                    className="text-xs font-semibold mb-0.5"
                    style={{ color: '#7c79e8' }}
                  >
                    {signal.label}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: '#3D4452' }}
                  >
                    {signal.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Legal strip — light ─────────────────────────── */}
      <div
        style={{
          backgroundColor: '#F5F5FF',
          borderTop: '1px solid rgba(14,14,18,0.06)',
        }}
      >
        <div className="container-section py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <p className="text-xs" style={{ color: '#7B8494' }}>
              &copy; {currentYear} {copy.legal.copyright}
            </p>

            <div className="flex items-center gap-5">
              {copy.legal.links.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className="text-xs text-[#7B8494] hover:text-[#212830] transition-colors duration-150 focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-1 focus-visible:ring-[#b7b5fe] focus-visible:ring-offset-1 focus-visible:ring-offset-[#F5F5FF]"
                >
                  {link.label}
                </Link>
              ))}

              <div className="[&_button]:text-[#7c79e8] [&_button]:border-[rgba(124,121,232,0.3)] [&_button]:hover:border-[rgba(124,121,232,0.7)] [&_button]:hover:bg-[rgba(124,121,232,0.08)] [&_button]:focus-visible:ring-offset-[#F5F5FF]">
                <LocaleSwitcher locale={locale} />
              </div>
            </div>

          </div>
        </div>
      </div>

    </footer>
  )
}
