'use client'

// components/layout/Navbar.jsx
//
// Fixed navigation bar. First interactive element after SkipLink.
//
// Bilingual activation:
//   Replace <LocaleSwitcherSlot /> with <LocaleSwitcher /> when zh is ready.
//   No other changes needed in this file.

import { useState, useEffect, useRef, useCallback } from 'react'
import Link                                          from 'next/link'
import Image                                         from 'next/image'
import { usePathname }                               from 'next/navigation'

// ── Nav link definitions ──────────────────────────────────────
const PRIMARY_LINKS = [
  { href: '/program',    label: 'The Program' },
  { href: '/results',    label: 'Results'     },
  { href: '/navigators', label: 'Navigators'  },
  { href: '/the-hangar', label: 'The Hangar'  },
]

const SECONDARY_LINKS = [
  { href: '/methodology', label: 'Methodology' },
  { href: '/about',       label: 'About'       },
  { href: '/blog',        label: 'Blog'        },
]

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

// ── Language switcher slot ────────────────────────────────────
function LocaleSwitcherSlot() {
  return (
    <div
      aria-hidden="true"
      className="hidden lg:flex items-center"
      style={{ width: '2.5rem' }}
    />
  )
}

// ── Wordmark ──────────────────────────────────────────────────
// logo-dark.svg — high-contrast variant for the dark (#0E0E12) navbar background.
// When a light navbar variant is needed, swap src to "/logo.svg".
function Wordmark() {
  return (
    <Link
      href="/"
      className="flex items-center shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b7b5fe] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E12]"
      aria-label="DODO Learning — home"
    >
      <Image
        src="/logo-dark.svg"
        alt="DODO Learning"
        width={360}
        height={108}
        priority
        className="w-auto"
        style={{ height: 'calc(var(--nav-height) * 0.65)' }}
      />
    </Link>
  )
}

// ── Main component ────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname()
  const [scrolled,   setScrolled]  = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const drawerRef    = useRef(null)
  const hamburgerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen || !drawerRef.current) return

    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ')

    const focusable = Array.from(drawerRef.current.querySelectorAll(selectors))
    if (focusable.length === 0) return
    focusable[0].focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        hamburgerRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const first = focusable[0]
      const last  = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus() }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  const isActive = useCallback(
    (href) =>
      href === '/'
        ? pathname === '/'
        : pathname === href || pathname.startsWith(href + '/'),
    [pathname]
  )

  const DesktopNavLink = ({ href, label }) => {
    const active = isActive(href)
    return (
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className={`nav-link text-sm font-medium transition-colors duration-150 ${
          active ? 'text-[#b7b5fe]' : 'text-[#F0F0F0] hover:text-[#b7b5fe]'
        }`}
      >
        {label}
      </Link>
    )
  }

  const MobileNavLink = ({ href, label }) => {
    const active = isActive(href)
    return (
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className={`block py-4 text-[1.125rem] font-medium border-b transition-colors duration-150 ${
          active
            ? 'text-[#b7b5fe] border-[rgba(183,181,254,0.2)]'
            : 'text-[#F0F0F0] hover:text-[#b7b5fe] border-[rgba(183,181,254,0.1)]'
        }`}
      >
        {label}
      </Link>
    )
  }

  const showCharterCTA = pathname !== '/consult'

  return (
    <>
      {/* ── Nav bar ───────────────────────────────────────── */}
      <header
        role="banner"
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        data-locale-ready="true"
        style={{
          backgroundColor: '#0E0E12',
          borderBottom: '1px solid rgba(183,181,254,0.10)',
        }}
      >
        <div className="container-section h-full flex items-center justify-between gap-6">

          <Wordmark />

          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-8">
            {PRIMARY_LINKS.map((link) => (
              <DesktopNavLink key={link.href} {...link} />
            ))}
            <span aria-hidden="true" className="w-px h-4 bg-[rgba(183,181,254,0.2)]" />
            {SECONDARY_LINKS.map((link) => (
              <DesktopNavLink key={link.href} {...link} />
            ))}
          </nav>

          <div className="flex items-center gap-3">

            <LocaleSwitcherSlot />

            <Link
              href="/consult"
              className="btn btn-primary hidden md:inline-flex text-sm px-5 py-2.5"
              aria-label="Book a diagnostic consultation"
            >
              Book a Consult
            </Link>

            {showCharterCTA && (
              <Link
                href="/consult"
                className="btn btn-charter hidden lg:inline-flex text-sm px-5 py-2.5"
                aria-label="Book your diagnostic consultation — Charter Enrollment"
              >
                Book Your Consultation
              </Link>
            )}

            <button
              ref={hamburgerRef}
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-[#F0F0F0] hover:text-[#b7b5fe] hover:bg-[rgba(183,181,254,0.08)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b7b5fe] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0E0E12]"
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
          className="fixed inset-0 bg-[rgba(14,14,18,0.7)] backdrop-blur-sm z-[90] lg:hidden"
          style={{ top: 'var(--nav-height)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer ──────────────────────────────────── */}
      <div
        id="mobile-nav-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`
          fixed left-0 right-0 bottom-0 z-[95] lg:hidden
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

          <nav aria-label="Primary navigation">
            {PRIMARY_LINKS.map((link) => (
              <MobileNavLink key={link.href} {...link} />
            ))}
          </nav>

          <nav aria-label="Secondary navigation" className="mt-2">
            {SECONDARY_LINKS.map((link) => (
              <MobileNavLink key={link.href} {...link} />
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/consult"
              className="btn btn-primary w-full justify-center text-base py-3.5"
              aria-label="Book a diagnostic consultation"
            >
              Book a Consult
            </Link>
            {showCharterCTA && (
              <Link
                href="/consult"
                className="btn btn-charter w-full justify-center text-base py-3.5"
                aria-label="Book your diagnostic consultation — Charter Enrollment"
              >
                Book Your Consultation
              </Link>
            )}
          </div>

          <p
            className="mt-8 text-xs font-medium tracking-widest uppercase text-center"
            style={{ color: 'rgba(183,181,254,0.4)' }}
          >
            Think Twice. In Both Languages.
          </p>

        </div>
      </div>
    </>
  )
}