// app/[locale]/blog/page.jsx
// Pure server component — all static sections.
// Interactive S3 (category filter) + S4 (article grid) + search bar
// are delegated to components/blog/BlogClient.jsx ('use client').
//
// Figma source: src/app/App.tsx (Blog page) — tUKokxMK9eHkSortCPKzTX
//
// Section map (8 sections — exact from Figma):
//   S1  Hero + Search     — #F5F5FF, dot grid, h1 + subhead + search (client)
//   S2  Featured Article  — #F5F5FF, white card, border-l-4 #b7b5fe, 45/55 split
//   S3  Category Filter   — #F5F5FF, pill buttons — CLIENT (BlogClient)
//   S4  Article Grid      — #F5F5FF, 3-col, hover borderTop — CLIENT (BlogClient)
//   S5  GEO Anchor Strip  — #212830, 3-col divided links
//   S6  Navigator Picks   — #F5F5FF, micro-profile + 3-col article grid
//   S7  Newsletter        — #ffffff, centered form
//   S8  Closing CTA       — #212830, gilt button
//
// Figma → Next.js adaptations:
//   useState/interactive → BlogClient.jsx
//   lucide ArrowRight → inline SVG
//   ImageWithFallback → <img>
//   button → <Link href={`/${locale}/consult`}>
//   max-w-7xl mx-auto px-6 → container-section (where padding matches)
//
// Content: TODO: migrate to content/en/blog/index.json

import Link        from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import BlogClient from '@/components/blog/BlogClient'

export const metadata = buildMetadata({
  locale,
  title:       'Blog — Thinking Tools for Bilingual Families',
  description:
    'Articles by DODO Navigators and researchers on Lexile growth, ' +
    'bilingual development, and what good writing actually looks like. ' +
    'For Chinese-speaking diaspora families in Canada and the US.',
  path: '/blog',
})

// ─────────────────────────────────────────────────────────────
// INLINE SVG
// ─────────────────────────────────────────────────────────────
function IconArrowRight({ style, className }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      style={style} className={className} aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// DATA — TODO: migrate to content/en/blog/index.json
// ─────────────────────────────────────────────────────────────

const featuredArticle = {
  slug:      'lexile-asymmetry-bilingual-children',
  category:  'Bilingual Development',
  title:     'What does it mean when a bilingual child reads above grade level in one language but not the other?',
  excerpt:   "Lexile asymmetry is normal in bilingual development. Here's why it happens — and when to intervene.",
  author:    'Dr. Sarah Chen',
  role:      'Lead Navigator',
  readTime:  '8 min read',
  date:      'March 10, 2026',
  imageUrl:  'https://images.unsplash.com/photo-1666198259234-f7033c78b94e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
}

const ARTICLES = [
  {
    id:       1,
    slug:     'what-does-lexile-score-mean',
    category: 'Lexile + Reading',
    title:    "What does my child's Lexile score actually mean — and how do we move it?",
    excerpt:  "A parent's guide to understanding Lexile measurements and creating actionable growth plans.",
    author:   'Michael Torres',
    readTime: '6 min',
    date:     'March 8, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1620679860338-aa1053541b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
  },
  {
    id:       2,
    slug:     'complex-stories-english-simple-sentences-mandarin',
    category: 'Writing + 6+1 Traits',
    title:    'Why does my 7-year-old write complex stories in English but struggle with simple sentences in Mandarin?',
    excerpt:  "Writing development doesn't transfer equally across languages. Here's what shapes the gap.",
    author:   'Li Wei',
    readTime: '7 min',
    date:     'March 5, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1646032539375-2ecd919356ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
  },
  {
    id:       3,
    slug:     'three-moments-bilingual-plan-not-working',
    category: 'Navigator Insights',
    title:    "The three moments when parents realize their bilingual plan isn't working",
    excerpt:  'Pattern recognition from 500+ diagnostic calls — and what intervention looks like at each stage.',
    author:   'Dr. Sarah Chen',
    readTime: '9 min',
    date:     'March 1, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1673515334717-da4d85aaf38b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
  },
  {
    id:       4,
    slug:     'bilingual-education-san-francisco',
    category: 'City Guides',
    title:    'Bilingual education options in San Francisco: What the data shows',
    excerpt:  'Comparative analysis of Mandarin immersion programs, dual-language schools, and private options.',
    author:   'Jennifer Park',
    readTime: '11 min',
    date:     'Feb 28, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1706528010331-0f12582db334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
  },
  {
    id:       5,
    slug:     'code-switching-bilingual-children',
    category: 'Parent Q+A',
    title:    'Should I be worried if my child mixes languages in the same sentence?',
    excerpt:  "Code-switching is a sign of linguistic competence, not confusion. Here's what the research says.",
    author:   'Dr. Maria Rodriguez',
    readTime: '5 min',
    date:     'Feb 25, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1769794371007-9bf419217727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
  },
  {
    id:       6,
    slug:     'when-bilingual-children-start-reading',
    category: 'Bilingual Development',
    title:    'When do bilingual children start reading? What to expect by age and language',
    excerpt:  "Timeline expectations for literacy emergence in two languages — and why they don't always align.",
    author:   'Michael Torres',
    readTime: '8 min',
    date:     'Feb 22, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1666198259234-f7033c78b94e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
  },
]

const CATEGORIES = [
  'All',
  'Bilingual Development',
  'Lexile + Reading',
  'Writing + 6+1 Traits',
  'Navigator Insights',
  'City Guides',
  'Parent Q+A',
]

// GEO anchor links (S5)
const GEO_LINKS = [
  {
    route:    '/methodology',
    title:    'The Loop Explained',
    rationale: 'The deepest content on the site — how Read → Think → Speak → Write works in practice.',
  },
  {
    route:    '/lexile',
    title:    'What Is a Lexile Level?',
    rationale: 'The question parents search most. The answer DODO gives with specific numbers.',
  },
  {
    route:    '/compare',
    title:    'DODO vs. The Alternatives',
    rationale: 'The question LLMs get asked most — answered directly, without attacking alternatives.',
  },
]

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return localeParams()
}

export default async function BlogPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  return (
    <div className="w-full overflow-hidden" style={{ fontFamily: 'var(--font-latin)' }}>

      {/* ══ S1 HERO ══════════════════════════════════════════
          Figma: #F5F5FF bg, dot grid radial-gradient opacity 0.08
          Eyebrow (12px fw500 tracking-[0.1em] #b7b5fe)
          H1 60px fw700 #0E0E12, #b7b5fe span
          Sub 18px fw400 #212830 lineHeight 1.6
          Search bar → rendered by BlogClient below
          pt-[100px] pb-20 — exact from Figma
      ════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: '#F5F5FF' }}
      >
        {/* Dot grid — exact from Figma Option B treatment */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(circle, #b7b5fe 1px, transparent 1px)',
            backgroundSize:  '32px 32px',
            opacity:         0.08,
          }}
        />

        <div
          className="relative max-w-7xl mx-auto px-6 text-center"
          style={{ paddingTop: '100px', paddingBottom: '80px' }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily:    'var(--font-latin)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight:    500,
              fontSize:      '12px',
              color:         '#b7b5fe',
              marginBottom:  '24px',
            }}
          >
            The DODO Blog
          </div>

          {/* H1 */}
          <h1
            className="mb-6 max-w-[720px] mx-auto"
            style={{
              color:       '#0E0E12',
              fontSize:    'clamp(36px, 5vw, 60px)',
              fontWeight:  700,
              lineHeight:  1.1,
              letterSpacing: '-0.03em',
            }}
          >
            Thinking tools for families who are{' '}
            <span style={{ color: '#b7b5fe' }}>raising bilingual minds</span>.
          </h1>

          {/* Subhead */}
          <p
            className="mb-8 max-w-[540px] mx-auto"
            style={{
              color:      '#212830',
              fontSize:   '18px',
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Articles by DODO Navigators and researchers — on Lexile growth, bilingual
            development, and what good writing actually looks like.
          </p>

          {/* Search bar + category filter + article grid — client boundary */}
          <BlogClient articles={ARTICLES} categories={CATEGORIES} />
        </div>
      </section>

      {/* ══ S2 FEATURED ARTICLE ══════════════════════════════
          Figma: bg #F5F5FF, white card, border-l-4 #b7b5fe
          boxShadow: 0 4px 24px rgba(183,181,254,0.15)
          45% image panel (bg #212830) + 55% content panel
          Category badge, h2 30px fw700, excerpt, author meta, date, CTA button
      ════════════════════════════════════════════════════════ */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: '#F5F5FF' }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="bg-white rounded-xl overflow-hidden flex flex-col md:flex-row"
            style={{
              borderLeft:  '4px solid #b7b5fe',
              boxShadow:   '0 4px 24px rgba(183,181,254,0.15)',
            }}
          >
            {/* Left — Image (45%) */}
            <div
              className="md:w-[45%] bg-[#212830] flex items-center justify-center overflow-hidden"
              style={{ minHeight: '300px' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
                style={{ minHeight: '300px', display: 'block' }}
              />
            </div>

            {/* Right — Content (55%) */}
            <div
              className="md:w-[55%] flex flex-col justify-center"
              style={{ padding: '40px 40px' }}
            >
              {/* Category badge */}
              <div
                className="inline-block rounded w-fit mb-4"
                style={{
                  backgroundColor: 'rgba(183,181,254,0.15)',
                  color:           '#b7b5fe',
                  fontSize:        '11px',
                  fontWeight:      500,
                  textTransform:   'uppercase',
                  padding:         '4px 12px',
                  letterSpacing:   '0.06em',
                }}
              >
                {featuredArticle.category}
              </div>

              {/* Title */}
              <h2
                className="mb-4 max-w-[480px]"
                style={{
                  color:       '#0E0E12',
                  fontSize:    '30px',
                  fontWeight:  700,
                  lineHeight:  1.3,
                  letterSpacing: '-0.02em',
                }}
              >
                {featuredArticle.title}
              </h2>

              {/* Excerpt */}
              <p
                className="mb-4"
                style={{
                  color:      '#212830',
                  fontSize:   '15px',
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                {featuredArticle.excerpt}
              </p>

              {/* Author meta */}
              <div
                className="flex items-center gap-2 mb-6"
                style={{ color: '#212830', fontSize: '13px', fontWeight: 500 }}
              >
                <span>{featuredArticle.author}</span>
                <span>·</span>
                <span style={{ opacity: 0.7 }}>{featuredArticle.role}</span>
                <span>·</span>
                <span style={{ opacity: 0.7 }}>{featuredArticle.readTime}</span>
              </div>

              {/* Date */}
              <div
                className="mb-6"
                style={{ color: '#212830', opacity: 0.5, fontSize: '12px' }}
              >
                {featuredArticle.date}
              </div>

              {/* CTA */}
              <Link
                href={`/${locale}/blog/${featuredArticle.slug}`}
                className="inline-block rounded-lg transition-all hover:opacity-90 w-fit"
                style={{
                  backgroundColor: '#b7b5fe',
                  color:           '#0E0E12',
                  fontSize:        '15px',
                  fontWeight:      600,
                  padding:         '12px 24px',
                  textDecoration:  'none',
                }}
              >
                Read Article
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ S3 + S4 — CLIENT COMPONENT (BlogClient) ══════════
          Search, category filter, and article grid live inside
          BlogClient above (rendered inside S1 hero container).
          The sections below (S5-S8) are all server-rendered.
      ════════════════════════════════════════════════════════ */}

      {/* ══ S5 GEO ANCHOR STRIP ══════════════════════════════
          Figma: #212830, eyebrow "GO DEEPER"
          3-col grid with md:divide-x rgba(183,181,254,0.2)
          Each cell: route label (11px fw300 opacity 0.5)
                     → h3 + ArrowRight row → rationale body
          Hover: bg → #2E3848
      ════════════════════════════════════════════════════════ */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: '#212830' }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="uppercase text-center mb-10"
            style={{
              color:         '#b7b5fe',
              fontSize:      '12px',
              fontWeight:    500,
              letterSpacing: '0.1em',
            }}
          >
            Go Deeper
          </div>

          {/* 3-col divided grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ borderTop: '1px solid rgba(183,181,254,0.12)' }}
          >
            {GEO_LINKS.map(({ route, title, rationale }) => (
              <Link
                key={route}
                href={`/${locale}${route}`}
                className="group block transition-colors p-6 md:p-8"
                style={{
                  borderRight:     'none',
                  textDecoration:  'none',
                }}
                // Hover bg handled via Tailwind group + CSS — no onMouse needed in server
              >
                <div
                  className="group-hover:bg-[#2E3848] rounded-lg transition-colors p-0"
                >
                  {/* Route slug */}
                  <div
                    style={{
                      textTransform: 'uppercase',
                      fontSize:      '11px',
                      fontWeight:    300,
                      color:         'rgba(240,240,240,0.5)',
                      marginBottom:  '12px',
                      fontFamily:    'var(--font-latin)',
                    }}
                  >
                    {route}
                  </div>

                  {/* Title + arrow */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3
                      style={{
                        color:      '#F0F0F0',
                        fontSize:   '18px',
                        fontWeight: 600,
                        lineHeight: 1.3,
                      }}
                    >
                      {title}
                    </h3>
                    <IconArrowRight
                      className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                      style={{ color: '#b7b5fe', marginTop: '2px' }}
                    />
                  </div>

                  {/* Rationale */}
                  <p
                    style={{
                      color:      'rgba(240,240,240,0.65)',
                      fontSize:   '14px',
                      fontWeight: 400,
                      lineHeight: 1.5,
                    }}
                  >
                    {rationale}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S6 NAVIGATOR PICKS ═══════════════════════════════
          Figma: #F5F5FF, eyebrow "RECOMMENDED BY DR. SARAH CHEN"
          Navigator micro-profile: initials avatar (w-12 h-12 #0E0E12)
          name 15px fw600 #0E0E12 + role 13px fw400 opacity 0.7
          Then same 3-col article card grid (first 3 articles)
      ════════════════════════════════════════════════════════ */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: '#F5F5FF' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Eyebrow */}
          <div
            style={{
              fontFamily:    'var(--font-latin)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight:    500,
              fontSize:      '12px',
              color:         '#b7b5fe',
              marginBottom:  '32px',
            }}
          >
            Recommended by Dr. Sarah Chen
          </div>

          {/* Navigator micro-profile */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{
                width:           '48px',
                height:          '48px',
                backgroundColor: '#0E0E12',
                color:           '#b7b5fe',
                fontSize:        '16px',
                fontWeight:      600,
                fontFamily:      'var(--font-latin)',
              }}
              aria-hidden="true"
            >
              SC
            </div>
            <div>
              <div style={{ color: '#0E0E12', fontSize: '15px', fontWeight: 600 }}>
                Dr. Sarah Chen
              </div>
              <div style={{ color: 'rgba(33,40,48,0.7)', fontSize: '13px', fontWeight: 400 }}>
                Lead Navigator · 15 years in bilingual cognitive development
              </div>
            </div>
          </div>

          {/* 3-col article grid — same card structure, first 3 articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.slice(0, 3).map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-lg overflow-hidden transition-all hover:-translate-y-0.5"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              >
                {/* Cover */}
                <div className="relative bg-[#212830]" style={{ height: '240px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    style={{ display: 'block' }}
                  />
                  <div
                    className="absolute bottom-3 left-3 px-2 py-1 rounded uppercase"
                    style={{
                      backgroundColor: 'rgba(183,181,254,0.15)',
                      color:           '#b7b5fe',
                      fontSize:        '11px',
                      fontWeight:      500,
                      backdropFilter:  'blur(8px)',
                    }}
                  >
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <Link href={`/${locale}/blog/${article.slug}`} className="block p-6 hover:no-underline">
                  <h3
                    className="mb-2 line-clamp-2"
                    style={{
                      color:      '#0E0E12',
                      fontSize:   '18px',
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    className="mb-4 line-clamp-1"
                    style={{
                      color:      'rgba(33,40,48,0.75)',
                      fontSize:   '14px',
                      fontWeight: 400,
                    }}
                  >
                    {article.excerpt}
                  </p>
                  <div
                    className="flex items-center gap-2"
                    style={{ color: '#212830', fontSize: '12px', fontWeight: 500 }}
                  >
                    <span>{article.author}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                    <span>·</span>
                    <span>{article.date}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S7 NEWSLETTER SIGNUP ═════════════════════════════
          Figma: #ffffff, max-w-[480px], centered
          Eyebrow "STAY CURRENT", h2 26px fw600, sub 15px fw400
          Email input → form with label (a11y)
          CTA: #b7b5fe bg button
          Footer note: 12px opacity 0.45
          Note: email input focus state uses globals.css .form-input
                but we inline here to stay consistent with Figma spec
      ════════════════════════════════════════════════════════ */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="max-w-[480px] mx-auto text-center">
          {/* Eyebrow */}
          <div
            style={{
              fontFamily:    'var(--font-latin)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight:    500,
              fontSize:      '12px',
              color:         '#b7b5fe',
              marginBottom:  '24px',
            }}
          >
            Stay Current
          </div>

          <h2
            className="mb-4"
            style={{
              color:       '#0E0E12',
              fontSize:    '26px',
              fontWeight:  600,
              lineHeight:  1.3,
              letterSpacing: '-0.02em',
            }}
          >
            Twice a month. Worth reading.
          </h2>

          <p
            className="mb-8"
            style={{
              color:      '#212830',
              fontSize:   '15px',
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            New articles on bilingual development, Lexile growth, and Navigator
            insights — twice a month.
          </p>

          {/* Newsletter form — a11y: label + input association, no form element issues */}
          <form
            className="max-w-[400px] mx-auto"
            action="/api/newsletter"
            method="POST"
          >
            <label
              htmlFor="newsletter-email"
              className="block text-left mb-2"
              style={{ color: '#212830', fontSize: '13px', fontWeight: 400 }}
            >
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="Your email address"
              autoComplete="email"
              required
              className="w-full h-12 px-4 rounded-lg mb-3 transition-all"
              style={{
                fontFamily:   'var(--font-latin)',
                backgroundColor: '#F5F5FF',
                border:          '1.5px solid rgba(183,181,254,0.4)',
                color:           '#212830',
                fontSize:        '15px',
                fontWeight:      400,
                outline:         'none',
                display:         'block',
                boxSizing:       'border-box',
              }}
            />
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{
                fontFamily:      'var(--font-latin)',
                backgroundColor: '#b7b5fe',
                color:           '#0E0E12',
                fontSize:        '15px',
                fontWeight:      600,
                border:          'none',
                cursor:          'pointer',
              }}
            >
              Get Articles
            </button>
            <p
              className="mt-3"
              style={{
                color:      'rgba(33,40,48,0.45)',
                fontSize:   '12px',
                fontWeight: 400,
              }}
            >
              No promotional emails. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </section>

      {/* ══ S8 CLOSING CTA ═══════════════════════════════════
          Figma: #212830, max-w-[600px], text-center, py-20
          h2: 28px fw700 #b7b5fe lineHeight 1.4
          Gilt button → Link /consult
          Sub: 13px fw400 #b7b5fe
      ════════════════════════════════════════════════════════ */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: '#212830' }}
      >
        <div className="max-w-[600px] mx-auto text-center">
          <h2
            className="mb-8"
            style={{
              color:        '#b7b5fe',
              fontSize:     'clamp(24px, 3vw, 28px)',
              fontWeight:   700,
              lineHeight:   1.4,
              letterSpacing: '-0.02em',
            }}
          >
            You&rsquo;ve read the thinking. The next step is a 20-minute call — where
            we apply it to your child specifically.
          </h2>

          <Link
            href={`/${locale}/consult`}
            className="inline-block rounded-lg transition-all hover:opacity-90 mb-4"
            style={{
              fontFamily:      'var(--font-latin)',
              backgroundColor: '#F5C842',
              color:           '#0E0E12',
              fontSize:        '16px',
              fontWeight:      700,
              padding:         '16px 32px',
              textDecoration:  'none',
            }}
          >
            Book a Diagnostic Call
          </Link>

          <p
            style={{
              color:      '#b7b5fe',
              fontSize:   '13px',
              fontWeight: 400,
              marginTop:  '16px',
            }}
          >
            20 minutes · A Navigator on the call · No obligation
          </p>
        </div>
      </section>

    </div>
  )
}