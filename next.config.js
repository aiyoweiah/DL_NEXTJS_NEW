/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Removed: output: 'export' ────────────────────────────────
  // Static export is incompatible with middleware.js (locale detection
  // requires the Next.js edge runtime). Vercel runs Next.js natively —
  // no static export needed. Deploy normally.

  typescript: {
    // TODO: flip to false once all pages are typed and errors are resolved.
    ignoreBuildErrors: true,
  },

  images: {
    // Add production image hostnames here when client provides assets.
    // Example:
    //   remotePatterns: [{ protocol: 'https', hostname: 'cdn.dodolearning.com' }]
    remotePatterns: [],
  },
}

module.exports = nextConfig