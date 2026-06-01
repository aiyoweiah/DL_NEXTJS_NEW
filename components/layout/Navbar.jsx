'use client'

// components/layout/Navbar.jsx
//
// Global navbar — first interactive element after SkipLink.
//
// Structure (v5.0 — June 2026, "chrome overhaul"):
//   - Single flat row of 6 primary links (was 2-tier 4+6).
//   - Desktop nav appears at md:768 (was lg:1024) — fixes tablet cliff.
//   - One primary CTA: Book Your Consultation (lg+) / Book Consultation (md).
//     "Watch Demo Class" demoted from desktop bar (still in mobile drawer + footer).
//   - Reading Companion (/audiobooks) carries a lock glyph + "members"
//     micro-tag (lg+ only) to set member-area expectations before click.
//   - All copy comes from `copy` prop, passed by app/[locale]/layout.jsx
//     after resolving content/marketing.[locale].js → nav. EN-hardcoding gone.
//
// Mobile drawer order (top → bottom) — primary CTA pinned at top fixes
// the prior bug where Book Your Consultation was hidden below md:
//   1. Book Your Consultation (primary)
//   2. Watch Demo Class (secondary, ghost)
//   3. Primary links (6)
//   4. "More" group (5 secondary)
//   5. Locale switcher
//   6. Tagline
//
// Logo sizing:
//   --nav-height: 4rem = 64px.
//   Logo height: 32px = 50% of nav-height → 16px optical padding top/bottom.
//   Width auto from trimmed viewBox 484×240 (2.02:1) → ~65px at 32px tall.

import { useState, useEffect, useRef, useCallback } from 'react'
import Link                                          from 'next/link'
import { usePathname }                               from 'next/navigation'
import LocaleSwitcher                                from '@/components/layout/LocaleSwitcher'
import { useFocusTrap }                              from '@/lib/a11y'

// ── Lock glyph (for gated nav items) ──────────────────────────
function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ flexShrink: 0, marginLeft: 4, verticalAlign: 'middle' }}
    >
      <rect
        x="2.5" y="6"
        width="9" height="6.5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M4.5 6V4.25a2.5 2.5 0 0 1 5 0V6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ── Hamburger icon ────────────────────────────────────────────
function HamburgerIcon({ open }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <line
        x1="2" y1={open ? '11' : '5'}
        x2="20" y2={open ? '11' : '5'}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        style={{
          transform:       open ? 'rotate(45deg)' : 'none',
          transformOrigin: '11px 11px',
          transition:      'transform 200ms cubic-bezier(0.25,1,0.5,1)',
        }}
      />
      <line
        x1="2" y1="11" x2="20" y2="11"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        style={{ opacity: open ? 0 : 1, transition: 'opacity 150ms ease' }}
      />
      <line
        x1="2" y1={open ? '11' : '17'}
        x2="20" y2={open ? '11' : '17'}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        style={{
          transform:       open ? 'rotate(-45deg)' : 'none',
          transformOrigin: '11px 11px',
          transition:      'transform 200ms cubic-bezier(0.25,1,0.5,1)',
        }}
      />
    </svg>
  )
}

// ── Wordmark ──────────────────────────────────────────────────
function Wordmark({ locale, ariaLabel }) {
  return (
    <Link
      href={`/${locale}`}
      className="flex items-center shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b7b5fe] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E12]"
      aria-label={ariaLabel}
      style={{ overflow: 'visible' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-dark.svg"
        alt="DODO Learning"
        width={61}
        height={32}
        style={{ height: '32px', width: 'auto', display: 'block', flexShrink: 0 }}
      />
    </Link>
  )
}

// ── Main component ────────────────────────────────────────────
export default function Navbar({ locale, copy }) {
  const pathname = usePathname() // e.g. /en/program, /zh/compare

  const [scrolled,    setScrolled]   = useState(false)
  const [mobileOpen,  setMobileOpen] = useState(false)

  const drawerRef    = useRef(null)
  const hamburgerRef = useRef(null)

  // Strip locale prefix for active-link comparison.
  const strippedPathname = pathname.replace(/^\/(en|zh)/, '') || '/'

  const isActive = useCallback(
    (href) =>
      href === '/'
        ? strippedPathname === '/'
        : strippedPathname === href || strippedPathname.startsWith(href + '/'),
    [strippedPathname]
  )

  // ── Scroll shadow ─────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Close drawer on navigation ────────────────────────────────
  useEffect(() => { setMobileOpen(false) }, [pathname])

  // ── Body scroll lock ──────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // ── Mobile focus trap ─────────────────────────────────────────
  useFocusTrap(drawerRef, mobileOpen, () => setMobileOpen(false))

  // ── Link sub-components ───────────────────────────────────────
  // Desktop nav link. Compact at md (gap-4 outer), comfortable at lg+ (gap-8).
  // Gated items render with a lock glyph and a "members" micro-label at lg+.
  const DesktopNavLink = ({ href, label, gated }) => {
    const active = isActive(href)
    return (
      <Link
        href={`/${locale}${href}`}
        aria-current={active ? 'page' : undefined}
        className={`nav-link text-sm font-medium whitespace-nowrap transition-colors duration-150 inline-flex items-center ${
          active ? 'text-[#b7b5fe]' : 'text-[#F0F0F0] hover:text-[#b7b5fe]'
        }`}
      >
        <span className="inline-flex items-center">
          {label}
          {gated && <LockIcon />}
        </span>
        {gated && (
          <span
            className="hidden lg:inline ml-1.5 text-[10px] uppercase tracking-wider font-semibold"
            style={{ color: 'rgba(183,181,254,0.55)' }}
            aria-hidden="true"
          >
            · {copy.members}
          </span>
        )}
      </Link>
    )
  }

  const MobileNavLink = ({ href, label, gated }) => {
    const active = isActive(href)
    return (
      <Link
        href={`/${locale}${href}`}
        aria-current={active ? 'page' : undefined}
        className={`flex items-center py-4 text-[1.125rem] font-medium border-b transition-colors duration-150 ${
          active
            ? 'text-[#b7b5fe] border-[rgba(183,181,254,0.2)]'
            : 'text-[#F0F0F0] hover:text-[#b7b5fe] border-[rgba(183,181,254,0.1)]'
        }`}
      >
        <span className="inline-flex items-center">
          {label}
          {gated && <LockIcon />}
        </span>
        {gated && (
          <span
            className="ml-2 text-[10px] uppercase tracking-wider font-semibold"
            style={{ color: 'rgba(183,181,254,0.55)' }}
            aria-hidden="true"
          >
            · {copy.members}
          </span>
        )}
      </Link>
    )
  }

  // Hide CTAs when already on that page.
  const showDemoCTA    = strippedPathname !== '/demos'
  const showCharterCTA = strippedPathname !== '/consult'

  return (
    <>
      {/* ── Nav bar ───────────────────────────────────────── */}
      <header
        role="banner"
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        style={{
          backgroundColor: '#0E0E12',
          borderBottom:    '1px solid rgba(183,181,254,0.10)',
          overflow:        'visible',
        }}
      >
        <div className="container-section h-full flex items-center justify-between gap-4 lg:gap-6" style={{ overflow: 'visible' }}>

          <Wordmark locale={locale} ariaLabel={copy.logoAria} />

          {/*
            Primary nav — single flat row of 6.
            Visible from md:768 (tablet+) with compact gap-4; widens to
            gap-8 at lg:1024+. Fixes prior tablet cliff (mobile drawer
            until lg:1024) where Book Consultation was hidden until lg.
          */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-4 lg:gap-8">
            {copy.primary.map((link) => (
              <DesktopNavLink key={link.href} {...link} />
            ))}
          </nav>

          <div className="flex items-center gap-3">

            <LocaleSwitcher locale={locale} />

            {showCharterCTA && (
              <Link
                href={`/${locale}/consult`}
                className="btn btn-charter hidden md:inline-flex text-sm px-5 py-2.5"
                aria-label={copy.cta.consultAria}
              >
                {/* "Book Consultation" at md, "Book Your Consultation" at lg+ */}
                <span className="lg:hidden">{copy.cta.consultCompact}</span>
                <span className="hidden lg:inline">{copy.cta.consult}</span>
              </Link>
            )}

            {/* Hamburger — visible only below md (tablet collapses to flat nav, not drawer) */}
            <button
              ref={hamburgerRef}
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? copy.menuCloseAria : copy.menuOpenAria}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-[#F0F0F0] hover:text-[#b7b5fe] hover:bg-[rgba(183,181,254,0.08)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b7b5fe] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0E0E12]"
            >
              <HamburgerIcon open={mobileOpen} />
            </button>

          </div>
        </div>
      </header>

      {/* ── Mobile backdrop ────────────────────────────────── */}
      {mobileOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 bg-[rgba(14,14,18,0.7)] backdrop-blur-sm z-[90] md:hidden"
          style={{ top: 'var(--nav-height)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer ─────────────────────────────────── */}
      <div
        id="mobile-nav-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`
          fixed left-0 right-0 bottom-0 z-[95] md:hidden
          bg-[#0E0E12] border-t border-[rgba(183,181,254,0.12)]
          overflow-y-auto
          transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${mobileOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
        style={{ top: 'var(--nav-height)' }}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen ? '' : undefined}
      >
        <div className="container-section py-6">

          {/*
            CTA group — pinned at top of drawer. Fixes the prior bug where
            "Book Your Consultation" was hidden below md, leaving phones
            with only the secondary "Watch Demo Class" button visible.
          */}
          <div className="flex flex-col gap-3 mb-6">
            {showCharterCTA && (
              <Link
                href={`/${locale}/consult`}
                className="btn btn-charter w-full justify-center text-base py-3.5"
                aria-label={copy.cta.consultAria}
              >
                {copy.cta.consult}
              </Link>
            )}
            {showDemoCTA && (
              <Link
                href={`/${locale}/demos`}
                className="btn btn-ghost w-full justify-center text-base py-3.5"
                aria-label={copy.cta.demoAria}
              >
                {copy.cta.demo}
              </Link>
            )}
          </div>

          <nav aria-label="Primary navigation">
            {copy.primary.map((link) => (
              <MobileNavLink key={link.href} {...link} />
            ))}
          </nav>

          {copy.more?.length > 0 && (
            <nav aria-label="Secondary navigation" className="mt-2">
              {copy.more.map((link) => (
                <MobileNavLink key={link.href} {...link} />
              ))}
            </nav>
          )}

          <div className="mt-8 flex items-center justify-center">
            <LocaleSwitcher locale={locale} />
          </div>

          <p
            className="mt-6 text-xs font-medium tracking-widest uppercase text-center"
            style={{ color: 'rgba(183,181,254,0.4)' }}
          >
            {copy.tagline}
          </p>

        </div>
      </div>
    </>
  )
}
