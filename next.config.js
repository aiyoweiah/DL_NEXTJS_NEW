/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Static export for Cloudflare Pages ───────────────────────
  // Cloudflare Pages serves a static file bundle. output: 'export'
  // tells Next.js to emit the full site to /out at build time.
  //
  // Locale detection does NOT use middleware.js in this mode —
  // middleware requires a server/edge runtime that static export
  // does not have. Locale redirects are handled by public/_redirects,
  // which Cloudflare Pages reads natively at the CDN edge.
  //
  // If the project ever moves to Cloudflare Workers or Vercel (server
  // mode), remove this line and middleware.js takes over automatically.
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