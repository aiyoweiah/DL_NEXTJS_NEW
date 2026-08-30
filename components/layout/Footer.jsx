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
// Contrast: body text uses #3D4452; lavender label text uses the
// --label-color token (#5856cc, 5.36:1 on #F5F5FF — passes AA).
// Corrected v6.4: #7c79e8 was previously used here and documented as
// AA-safe, but it measures 3.37:1 on Whisper and fails for normal text.
// #b7b5fe (1.75:1 on Whisper) is never used as text on light.

import Link           from 'next/link'
import LocaleSwitcher from '@/components/layout/LocaleSwitcher'
import PreCtaBand     from '@/components/layout/PreCtaBand'

// ── Helpers ───────────────────────────────────────────────────

// Locale-prefix RELATIVE hrefs only. Content marks cross-site links with
// `external: true` and stores an absolute URL; blindly prefixing those
// produced `/enhttps://coding.dodolearning.com` on every page. Navbar already
// handled this; Footer did not. Fixed v6.5.
const isExternalHref = (href) => /^(https?:)?\/\//i.test(href || '')
const resolveHref = (locale, href) =>
  isExternalHref(href) ? href : `/${locale}${href}`

// ── Sub-components ────────────────────────────────────────────

function FooterLink({ href, label, soon, comingSoonLabel, external }) {
  // "Coming soon" items render as a non-link span with a muted badge.
  if (soon) {
    return (
      <li>
        <span
          className="text-sm inline-flex items-center gap-2"
          style={{ color: 'var(--text-muted)' }}
        >
          {label}
          <span
            className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded"
            style={{
              color: 'var(--label-color)',
              backgroundColor: 'rgba(124,121,232,0.10)',
            }}
          >
            {comingSoonLabel}
          </span>
        </span>
      </li>
    )
  }

  // WCAG 2.2 SC 2.5.8 (Target Size Minimum, AA) requires 24x24 CSS px.
  // These links rendered at 20px tall (two at 16px), so 22 of 25 failed —
  // and because the footer is chrome, that repeated on every route: on the
  // order of a thousand failing instances from one declaration.
  //
  // inline-flex + min-h-[24px] min-w-[24px] is the whole fix. The gap between links is
  // already 20px, so the hit area grows into space that already existed:
  // nothing moves and the footer does not get taller. `align-middle`
  // keeps the inline box sitting on the text baseline it had before.
  //
  // min-w matters too: SC 2.5.8 is 24x24, and short labels fail on WIDTH —
  // 'FAQ' measured 23.2px. The box only grows rightward into the list, so
  // again nothing visually moves.
  const linkClass =
    'inline-flex items-center align-middle min-h-[24px] min-w-[24px] text-sm text-[#3D4452] hover:text-[color:var(--link-hover-color)] transition-colors duration-150 focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#b7b5fe] focus-visible:ring-offset-1 focus-visible:ring-offset-[#F5F5FF]'

  // External links leave the site — plain <a>, new tab, and rel guarded.
  // Matches how Navbar renders `external` items.
  if (external) {
    return (
      <li>
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {label}
          <span aria-hidden="true" style={{ marginLeft: '0.25rem' }}>↗</span>
        </a>
      </li>
    )
  }

  return (
    <li>
      <Link href={href} className={linkClass}>
        {label}
      </Link>
    </li>
  )
}

function ColHeading({ children }) {
  return (
    <h3
      className="text-xs font-semibold uppercase tracking-widest mb-5"
      style={{ color: 'var(--label-color)' }}
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
                style={{ color: 'var(--label-color)' }}
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
                  style={{ color: 'var(--label-color)', letterSpacing: '0.12em' }}
                >
                  {copy.sibling.label}
                </p>
                <a
                  href={copy.sibling.href}
                  className="group block"
                >
                  <p
                    className="text-sm font-semibold mb-1 inline-flex items-baseline gap-1.5 transition-colors duration-150 group-hover:text-[color:var(--link-hover-color)]"
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
                    style={{ color: 'var(--text-muted)' }}
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
                    href={resolveHref(locale, link.href)}
                    external={link.external}
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
                    href={resolveHref(locale, link.href)}
                    external={link.external}
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
                    href={resolveHref(locale, link.href)}
                    external={link.external}
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
                  style={{ backgroundColor: 'var(--bullet-color)' }}
                  aria-hidden="true"
                />
                <div>
                  <p
                    className="text-xs font-semibold mb-0.5"
                    style={{ color: 'var(--label-color)' }}
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

            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              &copy; {currentYear} {copy.legal.copyright}
            </p>

            <div className="flex items-center gap-5">
              {copy.legal.links.map((link) => (
                <Link
                  key={link.href}
                  href={resolveHref(locale, link.href)}
                  className="inline-flex items-center align-middle min-h-[24px] min-w-[24px] text-xs text-[color:var(--text-muted)] hover:text-[#212830] transition-colors duration-150 focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-1 focus-visible:ring-[#b7b5fe] focus-visible:ring-offset-1 focus-visible:ring-offset-[#F5F5FF]"
                >
                  {link.label}
                </Link>
              ))}

              <div className="[&_button]:text-[color:var(--label-color)] [&_button]:border-[rgba(124,121,232,0.3)] [&_button]:hover:border-[rgba(124,121,232,0.7)] [&_button]:hover:bg-[rgba(124,121,232,0.08)] [&_button]:focus-visible:ring-offset-[#F5F5FF]">
                <LocaleSwitcher locale={locale} />
              </div>
            </div>

          </div>
        </div>
      </div>

    </footer>
  )
}
