/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Static export for Cloudflare Pages + Vercel ──────────────
  // Both hosts serve a static file bundle. output: 'export' tells
  // Next.js to emit the full site to /out at build time.
  //
  // Locale detection does NOT use proxy.js (Next.js 16 middleware)
  // in this mode — the proxy requires a server/edge runtime that
  // static export does not have. Locale redirects are handled by:
  //   • public/_redirects  — Cloudflare Pages reads at the CDN edge
  //   • vercel.json        — Vercel reads at the edge
  //
  // If the project ever moves to a server runtime, copy
  // docs/proxy.example.js to the project root as proxy.js — see
  // that file's header for the full activation steps.
  // ── Redirects ─────────────────────────────────────────────
  // NOTE: output: 'export' disables Next.js server-side redirects.
  // Redirects are handled at the CDN edge instead:
  //   • Cloudflare Pages: public/_redirects
  //   • Vercel:           vercel.json → redirects[]
  // This includes the /the-hangar → /compare 301 redirect
  // added April 2026 when The Hangar route was retired.

  output: 'export',

  // ── Trailing slashes ─────────────────────────────────────────
  // Cloudflare Pages expects /en/program/ → out/en/program/index.html
  // Without this, /en/program → out/en/program.html, which can cause
  // 404s on direct URL navigation on some Cloudflare configurations.
  trailingSlash: true,

  typescript: {
    // TODO: flip to false once all pages are typed and errors are resolved.
    ignoreBuildErrors: true,
  },

  images: {
    // next/image optimisation is not available in static export mode.
    // Use unoptimized: true so <Image> components still render as plain
    // <img> tags without breaking the build. Remove this if you move
    // to a server runtime and want Cloudflare image resizing instead.
    unoptimized: true,
  },
}

module.exports = nextConfig