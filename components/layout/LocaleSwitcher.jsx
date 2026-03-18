'use client'

// components/layout/LocaleSwitcher.jsx
//
// EN ↔ ZH toggle button. Client component.
//
// Behaviour:
//   - Swaps the locale segment in the current URL (/en/... ↔ /zh/...) and
//     navigates immediately using Next.js router.
//   - Persists the chosen locale in the DODO_LOCALE cookie (1-year maxAge,
//     SameSite=Lax) so returning users land directly in their preferred locale
//     without hitting the _redirects default.
//   - On mount, reads the cookie and — if it differs from the current URL
//     locale — redirects once. This handles the case where a user followed
//     a bare /program link (edge-redirected to /en/program) but their saved
//     preference is zh.
//
// Props:
//   locale  — 'en' | 'zh'  (current locale, passed from server layout)
//
// This file is safe to import from server components (layout, navbar, footer).
// Never import lib/i18n.js here — it uses fs and is server-only.

import { useRouter, usePathname } from 'next/navigation'
import { useEffect }               from 'react'

// ── Constants ─────────────────────────────────────────────────
const COOKIE_NAME = 'DODO_LOCALE'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year in seconds
const LOCALES = ['en', 'zh']

// ── Cookie helpers (client-side only) ─────────────────────────

function getCookie(name) {
  if (typeof document === 'undefined') return null
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
  return match ? match.split('=')[1] : null
}

function setCookie(name, value) {
  document.cookie = [
    `${name}=${value}`,
    `max-age=${COOKIE_MAX_AGE}`,
    'path=/',
    'SameSite=Lax',
  ].join('; ')
}

// ── Path helper ───────────────────────────────────────────────

/**
 * Swap the locale segment in a pathname.
 * '/en/program' + 'zh' → '/zh/program'
 * '/zh/'        + 'en' → '/en/'
 * '/en'         + 'zh' → '/zh'  (root locale path, no trailing segment)
 */
function swapLocalePath(pathname, nextLocale) {
  // pathname starts with /en or /zh
  const current = LOCALES.find((l) => pathname.startsWith(`/${l}`))
  if (!current) {
    // No locale segment found — prepend the target locale
    return `/${nextLocale}${pathname}`
  }
  return pathname.replace(`/${current}`, `/${nextLocale}`)
}

// ── Component ─────────────────────────────────────────────────

export default function LocaleSwitcher({ locale }) {
  const router   = useRouter()
  const pathname = usePathname()

  // On mount: if cookie locale differs from current URL locale, redirect once.
  // Handles the edge case where _redirects defaulted the user to /en/ but
  // their saved preference is zh.
  useEffect(() => {
    const saved = getCookie(COOKIE_NAME)
    if (saved && LOCALES.includes(saved) && saved !== locale) {
      router.replace(swapLocalePath(pathname, saved))
    }
    // Only run on mount — intentionally omitting deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSwitch() {
    const nextLocale = locale === 'zh' ? 'en' : 'zh'
    setCookie(COOKIE_NAME, nextLocale)
    router.push(swapLocalePath(pathname, nextLocale))
  }

  const label = locale === 'zh'
    ? 'Switch to English'
    : '切换到中文'

  const display = locale === 'zh'
    ? <><span aria-hidden="true">EN</span><span className="sr-only">Switch to English</span></>
    : <><span aria-hidden="true">中文</span><span className="sr-only">切换到中文</span></>

  return (
    <button
      type="button"
      onClick={handleSwitch}
      aria-label={label}
      className="
        inline-flex items-center justify-center
        h-8 px-2.5 rounded-md
        text-xs font-semibold tracking-wide
        text-[#b7b5fe] border border-[rgba(183,181,254,0.3)]
        hover:border-[rgba(183,181,254,0.7)] hover:bg-[rgba(183,181,254,0.08)]
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#b7b5fe] focus-visible:ring-offset-1
        focus-visible:ring-offset-[#0E0E12]
      "
    >
      {display}
    </button>
  )
}