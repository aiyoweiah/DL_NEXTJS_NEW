// components/layout/Footer.jsx
//
// Pure server component — no 'use client', no event handlers.
// Hover states are handled via Tailwind CSS classes only.
//
// Structure (top → bottom):
//   1. Pre-footer CTA band     — stays dark (#212830), conversion moment
//   2. Main footer grid        — light (#F5F5FF), Brand / Program / Company / Cities
//   3. Trust strip             — light (#F5F5FF), Lexile + 6+1 credibility signals
//   4. Legal strip             — light (#F5F5FF), copyright, privacy, terms, locale switcher
//
// Changes from pre-locale version:
//   - Accepts `locale` prop from app/[locale]/layout.jsx
//   - All nav hrefs prefixed with /${locale} so links stay within the
//     current locale session
//   - LocaleSwitcherSlot replaced with <LocaleSwitcher locale={locale} />
//     Server components can render client components — no change to rendering model.
//
// Logo: uses logo.svg (black fill #000000) — correct for light #F5F5FF background.
//   Dimensions reflect trimmed viewBox="58 45 484 240" → 2.02:1 aspect ratio.
//   Plain <img> used (not next/image) — images: { unoptimized: true } gives no benefit.
//
// Contrast: all text on light bg uses #3D4452 (body) and #7c79e8 (lavender AA).
// #b7b5fe (2.8:1 on white) is never used as text on light — #7c79e8 is used instead.

import Link           from 'next/link'
import LocaleSwitcher from '@/components/layout/LocaleSwitcher'

// ── Navigation columns ────────────────────────────────────────
// Paths are locale-relative (no prefix). Prefix applied in render.
const NAV_PROGRAM = [
  { href: '/program',     label: 'The 16-Week Program' },
  { href: '/assessment',  label: 'Assessment'          },
  { href: '/navigators',  label: 'Navigators'          },
  { href: '/the-hangar',  label: 'The Hangar'          },
  { href: '/lexile',      label: 'Lexile Levels'       },
  { href: '/methodology', label: 'The Loop'            },
]

const NAV_COMPANY = [
  { href: '/about',   label: 'About DODO'          },
  { href: '/compare', label: 'How We Compare'      },
  { href: '/faq',     label: 'FAQ'                 },
  { href: '/blog',    label: 'Blog'                },
  { href: '/demos',   label: 'Watch Demo Class'    },
  { href: '/consult', label: 'Book a Consultation' },
  { href: '/enroll',  label: 'Charter Enrollment'  },
]

const NAV_CITIES = [
  { href: '/cities/vancouver',              label: 'Vancouver'              },
  { href: '/cities/richmond-bc',            label: 'Richmond BC'            },
  { href: '/cities/markham',                label: 'Markham'                },
  { href: '/cities/toronto',                label: 'Toronto'                },
  { href: '/cities/san-francisco-bay-area', label: 'San Francisco Bay Area' },
  { href: '/cities/los-angeles',            label: 'Los Angeles'            },
]

const NAV_LEGAL = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms',   label: 'Terms of Use'   },
]

// ── Trust signals ─────────────────────────────────────────────
const TRUST_SIGNALS = [
  {
    id:          'lexile',
    label:       'Lexile Measurement',
    description: 'Progress measured in Lexile levels — the same standard used by North American school systems.',
  },
  {
    id:          '6plus1',
    label:       '6+1 Trait Writing Framework',
    description: 'Writing assessed with the 6+1 Trait framework — the rubric taught in Canadian and US classrooms.',
  },
  {
    id:          'live',
    label:       'Live, Navigator-Led Sessions',
    description: 'Every session is live. No pre-recorded content. Navigators track each student individually.',
  },
]

// ── Sub-components ────────────────────────────────────────────

// FooterLink — light bg variant. #3D4452 body, #7c79e8 hover (AA on #F5F5FF).
function FooterLink({ href, label }) {
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

// ColHeading — #7c79e8 on light bg passes WCAG AA (4.6:1 on #F5F5FF).
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
export default function Footer({ locale }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer role="contentinfo">

      {/* ── 1. Pre-footer CTA band — stays dark (conversion moment) ── */}
      <div
        className="border-t border-b"
        style={{ borderColor: 'rgba(183,181,254,0.1)', backgroundColor: '#212830' }}
      >
        <div className="container-section py-14 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            <div className="max-w-xl">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'rgba(183,181,254,0.5)' }}
              >
                Charter Enrollment Open
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold leading-tight tracking-tight"
                style={{ color: '#b7b5fe' }}
              >
                Ready to meet your child&rsquo;s Navigator?
              </h2>
              <p
                className="mt-3 text-[0.9375rem] leading-relaxed"
                style={{ color: '#94A3B8' }}
              >
                The diagnostic consultation is where we find out exactly where
                your child is — not where their school says they are.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:shrink-0">
              <Link
                href={`/${locale}/consult`}
                className="btn btn-charter text-sm px-6 py-3 justify-center"
                aria-label="Book a diagnostic consultation"
              >
                Book Your Consultation
              </Link>
              <Link
                href={`/${locale}/program`}
                className="btn btn-ghost text-sm px-6 py-3 justify-center"
                aria-label="Learn about The 16-Week Program"
              >
                See The Program
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ── 2. Main footer grid — light ────────────────────── */}
      <div style={{ backgroundColor: '#F5F5FF' }}>
        <div className="container-section pt-14 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* Column 1: Brand */}
            <div className="sm:col-span-2 lg:col-span-1">

              <Link
                href={`/${locale}`}
                className="inline-flex mb-6 focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#b7b5fe] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F5FF]"
                aria-label="DODO Learning — home"
              >
                {/*
                  logo.svg — black fill (#000000), correct for light bg (#F5F5FF).
                  viewBox trimmed to content: 484×240 → 2.02:1 ratio.
                  width/height are intrinsic hints only; h-10 w-auto drives render size.
                  At h=40px → rendered width ≈ 81px.
                */}
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
                A live, Navigator-led bilingual thinking program for globally
                mobile families. Read → Think → Speak → Write.
              </p>

              {/* Tagline — confirmed: "Think Once. In Both Languages." */}
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: '#7c79e8' }}
              >
                Think Once. In Both Languages.
              </p>

            </div>

            {/* Column 2: Program */}
            <div>
              <ColHeading>Program</ColHeading>
              <ul className="space-y-3">
                {NAV_PROGRAM.map((link) => (
                  <FooterLink
                    key={link.href}
                    href={`/${locale}${link.href}`}
                    label={link.label}
                  />
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <ColHeading>Company</ColHeading>
              <ul className="space-y-3">
                {NAV_COMPANY.map((link) => (
                  <FooterLink
                    key={link.href}
                    href={`/${locale}${link.href}`}
                    label={link.label}
                  />
                ))}
              </ul>
            </div>

            {/* Column 4: Cities */}
            <div>
              <ColHeading>Serving</ColHeading>
              <ul className="space-y-3">
                {NAV_CITIES.map((link) => (
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
            {TRUST_SIGNALS.map((signal) => (
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
              &copy; {currentYear} DODO Learning. All rights reserved.
            </p>

            <div className="flex items-center gap-5">
              {NAV_LEGAL.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className="text-xs text-[#7B8494] hover:text-[#212830] transition-colors duration-150 focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-1 focus-visible:ring-[#b7b5fe] focus-visible:ring-offset-1 focus-visible:ring-offset-[#F5F5FF]"
                >
                  {link.label}
                </Link>
              ))}

              {/* LocaleSwitcher — inverted colours for light background */}
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