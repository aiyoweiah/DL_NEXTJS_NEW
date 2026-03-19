// proxy.js
//
// ── STATIC EXPORT MODE — THIS FILE IS NOT ACTIVE ────────────
// The site currently uses output: 'export' for Cloudflare Pages.
// In static export mode, Next.js does not run middleware — there
// is no server runtime to execute it.
//
// Locale redirects are handled instead by public/_redirects, which
// Cloudflare Pages reads natively at the CDN edge. See that file.
//
// ── How to activate this file ────────────────────────────────
// If the project moves to a server runtime (Cloudflare Workers via
// @cloudflare/next-on-pages, or Vercel), simply:
//   1. Remove output: 'export' from next.config.js
//   2. Remove trailingSlash: true from next.config.js
//   3. Delete public/_redirects
//   4. This file activates automatically — no other changes needed.
//
// ── What this file does (when active) ────────────────────────
// Runs on the Next.js edge runtime before every matched request.
//   1. Skips static assets, API routes, and already-prefixed paths.
//   2. Reads the DODO_LOCALE cookie (set by LocaleSwitcher).
//   3. Falls back to the Accept-Language header on first visit.
//   4. Redirects /program → /en/program (or /zh/program).
// ─────────────────────────────────────────────────────────────

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
  const cookie = request.cookies.get(COOKIE_NAME)?.value
  if (cookie && LOCALES.includes(cookie)) return cookie
  return detectFromHeader(request)
}

// ── Middleware handler ────────────────────────────────────────
export function proxy(request) {
  const { pathname } = request.nextUrl

  if (LOCALES.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))) {
    return NextResponse.next()
  }

  const locale   = resolveLocale(request)
  const target   = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
  const redirect = NextResponse.redirect(new URL(target, request.url))

  if (!request.cookies.get(COOKIE_NAME)) {
    redirect.cookies.set(COOKIE_NAME, locale, {
      path:     '/',
      maxAge:   60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
  }

  return redirect
}

// ── Route matcher ─────────────────────────────────────────────
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|favicon\\.svg|robots\\.txt|sitemap\\.xml|site\\.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|woff|woff2|ttf|otf)).*)',
  ],
}