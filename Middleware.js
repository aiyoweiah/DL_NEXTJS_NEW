// middleware.js
//
// Runs on the Next.js edge runtime before every matched request.
// Responsibilities:
//   1. Skip anything that is not a page route (static assets, API, etc.)
//   2. If the path already starts with /en or /zh, pass it through.
//   3. Detect the user's preferred locale from:
//        a. DODO_LOCALE cookie   — set by LocaleSwitcher, persists choice
//        b. Accept-Language header — browser default on first visit
//        c. 'en' fallback        — safe default
//   4. Redirect the bare path to its locale-prefixed equivalent.
//      /program  →  /en/program  (or /zh/program)
//      /         →  /en          (or /zh)
//
// Cookie name: DODO_LOCALE
//   Written by LocaleSwitcher.jsx when the user toggles EN ↔ ZH.
//   MaxAge: 1 year. SameSite=Lax. No Secure flag needed (Vercel adds it).
//
// Accept-Language matching:
//   Any zh variant (zh, zh-CN, zh-TW, zh-HK, zh-Hans, zh-Hant)
//   maps to 'zh'. Everything else falls through to 'en'.

import { NextResponse } from 'next/server'

// ── Supported locales ─────────────────────────────────────────
const LOCALES        = ['en', 'zh']
const DEFAULT_LOCALE = 'en'
const COOKIE_NAME    = 'DODO_LOCALE'

// ── Locale detection ──────────────────────────────────────────
/**
 * Returns 'zh' or 'en' based on the Accept-Language header.
 * Matches any zh-* variant: zh, zh-CN, zh-TW, zh-HK, zh-Hans, zh-Hant.
 */
function detectFromHeader(request) {
  const header = request.headers.get('Accept-Language') || ''

  // Each entry looks like "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
  // Split on comma, take the language tag before any ;q= weighting.
  const preferred = header
    .split(',')
    .map((entry) => entry.split(';')[0].trim().toLowerCase())

  for (const tag of preferred) {
    if (tag.startsWith('zh')) return 'zh'
    if (tag.startsWith('en')) return 'en'
  }

  return DEFAULT_LOCALE
}

/**
 * Resolves the locale to use for this request.
 * Priority: cookie → Accept-Language header → default.
 */
function resolveLocale(request) {
  // 1. Explicit user choice (set by LocaleSwitcher)
  const cookie = request.cookies.get(COOKIE_NAME)?.value
  if (cookie && LOCALES.includes(cookie)) return cookie

  // 2. Browser preference
  return detectFromHeader(request)
}

// ── Middleware handler ────────────────────────────────────────
export function middleware(request) {
  const { pathname } = request.nextUrl

  // Already locale-prefixed — nothing to do.
  if (LOCALES.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))) {
    return NextResponse.next()
  }

  // Determine the correct locale and redirect.
  const locale   = resolveLocale(request)
  const target   = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
  const redirect = NextResponse.redirect(new URL(target, request.url))

  // Persist the detected locale in a cookie so subsequent navigations
  // skip header parsing. LocaleSwitcher overwrites this on explicit toggle.
  if (!request.cookies.get(COOKIE_NAME)) {
    redirect.cookies.set(COOKIE_NAME, locale, {
      path:     '/',
      maxAge:   60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    })
  }

  return redirect
}

// ── Route matcher ─────────────────────────────────────────────
// Only run middleware on page routes.
// Exclude: Next.js internals, static files, public assets.
export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     *   - _next/static   — build output
     *   - _next/image    — image optimisation
     *   - favicon.ico, favicon.svg
     *   - robots.txt, sitemap.xml
     *   - site.webmanifest
     *   - public files with a file extension (.svg, .png, .ico, .json, etc.)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|favicon\\.svg|robots\\.txt|sitemap\\.xml|site\\.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|woff|woff2|ttf|otf)).*)',
  ],
}