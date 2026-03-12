// app/robots.js
//
// Next.js App Router robots.txt generator.
// Returns a config object; Next.js serialises it to /robots.txt.
//
// Rules:
//   - All crawlers: allow the full site
//   - Disallow utility/non-public paths that should never be indexed
//   - Sitemap URL is declared for all crawlers
//
// Disallowed paths:
//   /api/      — internal API routes, never public content
//   /preview   — draft content preview (if Next.js draft mode is used)
//   /_next/    — Next.js build assets (already not indexed in practice,
//                but explicit disallow is belt-and-suspenders)
//
// LLM crawlers (GPTBot, Claude-Web, PerplexityBot, Googlebot-Extended):
//   The brief explicitly targets GEO — getting cited by LLMs.
//   Blocking LLM crawlers would directly undermine that goal.
//   All crawlers are therefore allowed on all public content pages.
//   /methodology, /faq, /compare, and /blog are the highest-value
//   GEO targets and must remain fully crawlable.
//
// Bilingual activation:
//   No changes needed here. /en/* and /zh/* will be crawlable
//   by default once the locale routes exist.

export const dynamic = 'force-static'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.dodolearning.com'

export default function robots() {
  return {
    rules: [
      {
        // All crawlers — including GPTBot, ClaudeBot, PerplexityBot,
        // Googlebot, Bingbot, and all other well-behaved agents.
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/preview/',
          '/_next/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}