// app/[locale]/blog/page.jsx
// Pure server component — all static sections.
// Interactive S3 (category filter) + S4 (article grid) + search bar
// are delegated to components/blog/BlogClient.jsx ('use client').
//
// Bilingual: all static UI strings switch via BLOG_UI[locale].
// Article data (titles, excerpts) stays EN for now — migrates to
// content/en/blog/index.json + content/zh/blog/index.json when ready.
// BlogClient receives locale + ui props for interactive string switching
// and locale-prefixed hrefs.
//
// Section map (8 sections):
//   S1  Hero + Search     — #F5F5FF, dot grid, h1 + subhead + search (client)
//   S2  Featured Article  — #F5F5FF, white card, border-l-4 #b7b5fe, 45/55 split
//   S3  Category Filter   — #F5F5FF, pill buttons — CLIENT (BlogClient)
//   S4  Article Grid      — #F5F5FF, 3-col, hover borderTop — CLIENT (BlogClient)
//   S5  GEO Anchor Strip  — #212830, 3-col divided links
//   S6  Navigator Picks   — #F5F5FF, micro-profile + 3-col article grid
//   S7  Newsletter        — #ffffff, centered form
//   S8  Closing CTA       — #212830, gilt button

import Link        from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import BlogClient from '@/components/blog/BlogClient'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const ui = BLOG_UI[locale] ?? BLOG_UI.en
  return buildMetadata({
    locale,
    title:       ui.meta.title,
    description: ui.meta.description,
    path: '/blog',
  })
}

// ─────────────────────────────────────────────────────────────
// UI STRINGS — all static text switched by locale
// ─────────────────────────────────────────────────────────────
const BLOG_UI = {
  en: {
    meta: {
      title:       'Blog \u2014 Thinking Tools for Bilingual Families',
      description:
        'Articles by DODO Navigators and researchers on Lexile growth, ' +
        'bilingual development, and what good writing actually looks like. ' +
        'For Chinese-speaking diaspora families in Canada and the US.',
    },
    // S1
    eyebrow:      'The DODO Blog',
    h1a:          'Thinking tools for families who are\u00a0',
    h1highlight:  'raising bilingual minds',
    h1b:          '.',
    subhead:
      'Articles by DODO Navigators and researchers \u2014 on Lexile growth, bilingual development, and what good writing actually looks like.',
    // S2
    featuredLabel:    'Featured',
    readArticle:      'Read Article',
    // S5
    goDeeperEyebrow:  'Go Deeper',
    geoLinks: [
      { route: '/methodology', title: 'The Loop Explained',         rationale: 'The deepest content on the site \u2014 how Read \u2192 Think \u2192 Speak \u2192 Write works in practice.' },
      { route: '/lexile',      title: 'What Is a Lexile Level?',    rationale: 'The question parents search most. The answer DODO gives with specific numbers.' },
      { route: '/compare',     title: 'DODO vs. The Alternatives',  rationale: 'The question LLMs get asked most \u2014 answered directly, without attacking alternatives.' },
    ],
    // S6
    navigatorPicksEyebrow: 'Recommended by Dr. Sarah Chen',
    navigatorName:         'Dr. Sarah Chen',
    navigatorRole:         'Lead Navigator \u00b7 15 years in bilingual cognitive development',
    // S7
    newsletterEyebrow: 'Stay Current',
    newsletterHeading: 'Twice a month. Worth reading.',
    newsletterSub:
      'New articles on bilingual development, Lexile growth, and Navigator insights \u2014 twice a month.',
    emailLabel:   'Email address',
    emailPlaceholder: 'Your email address',
    subscribeBtn: 'Get Articles',
    newsletterNote: 'No promotional emails. Unsubscribe anytime.',
    // S8
    ctaHeading:
      'You\u2019ve read the thinking. The next step is a 20-minute call \u2014 where we apply it to your child specifically.',
    ctaButton: 'Book a Diagnostic Call',
    ctaSub:    '20 minutes \u00b7 A Navigator on the call \u00b7 No obligation',
    // BlogClient interactive strings
    client: {
      searchPlaceholder: 'Search articles, topics, questions...',
      filterAriaLabel:   'Filter articles by category',
      loadMore:          'Load More Articles',
      noResultsPrefix:   'No articles match \u201c',
      noResultsSuffix:   '\u201d',
      noResultsIn:       ' in ',
    },
  },
  zh: {
    meta: {
      title:       '\u535a\u5ba2 \u2014 \u53cc\u8bed\u5bb6\u5ead\u7684\u601d\u7ef4\u5de5\u5177',
      description:
        'DODO\u5bfc\u5e08\u548c\u7814\u7a76\u8005\u64b0\u5199\u7684\u6587\u7ae0\uff0c\u6d89\u53ceLexile\u9605\u8bfb\u589e\u957f\u3001\u53cc\u8bed\u53d1\u5c55\u4ee5\u53ca\u4f18\u79c0\u5199\u4f5c\u7684\u672c\u8d28\u3002' +
        '\u9762\u5411\u52a0\u62ff\u5927\u548c\u7f8e\u56fd\u7684\u534e\u8bed\u79fb\u6c11\u5bb6\u5ead\u3002',
    },
    // S1
    eyebrow:      'DODO \u535a\u5ba2',
    h1a:          '\u4e3a\u57f9\u517b\u53cc\u8bed\u601d\u7ef4\u7684\u5bb6\u5ead\uff0c\u63d0\u4f9b\u601d\u7ef4\u5de5\u5177',
    h1highlight:  '',
    h1b:          '',
    subhead:
      'DODO\u5bfc\u5e08\u548c\u7814\u7a76\u8005\u64b0\u5199\u2014\u2014\u5173\u4e8eLexile\u9605\u8bfb\u589e\u957f\u3001\u53cc\u8bed\u53d1\u5c55\uff0c\u4ee5\u53ca\u4f18\u79c0\u5199\u4f5c\u771f\u6b63\u7684\u6837\u5b50\u3002',
    // S2
    featuredLabel: '\u7cbe\u9009\u6587\u7ae0',
    readArticle:   '\u9605\u8bfb\u6587\u7ae0',
    // S5
    goDeeperEyebrow: '\u6df1\u5165\u4e86\u89e3',
    geoLinks: [
      { route: '/methodology', title: 'The Loop \u6559\u5b66\u6cd5\u8be6\u89e3',     rationale: '\u7ad9\u5185\u5185\u5bb9\u6df1\u5ea6\u6700\u9ad8\u7684\u9875\u9762\u2014\u2014Read \u2192 Think \u2192 Speak \u2192 Write\u5982\u4f55\u5728\u5b9e\u8df5\u4e2d\u8fd0\u4f5c\u3002' },
      { route: '/lexile',      title: 'Lexile\u6c34\u5e73\u662f\u4ec0\u4e48\uff1f',   rationale: '\u5bb6\u957f\u641c\u7d22\u6700\u591a\u7684\u95ee\u9898\u3002DODO\u7528\u5177\u4f53\u6570\u5b57\u7ed9\u51fa\u7b54\u6848\u3002' },
      { route: '/compare',     title: 'DODO vs. \u5176\u4ed6\u65b9\u5f0f',            rationale: 'LLM\u6700\u5e38\u88ab\u95ee\u5230\u7684\u95ee\u9898\u2014\u2014\u76f4\u63a5\u89e3\u7b54\uff0c\u4e0d\u8d2c\u4f4e\u5176\u4ed6\u9009\u62e9\u3002' },
    ],
    // S6
    navigatorPicksEyebrow: 'Dr. Sarah Chen \u63a8\u8350',
    navigatorName:         'Dr. Sarah Chen',
    navigatorRole:         '\u9996\u5e2d\u5bfc\u5e08 \u00b7 15\u5e74\u53cc\u8bed\u8ba4\u77e5\u53d1\u5c55\u7814\u7a76',
    // S7
    newsletterEyebrow:    '\u4fdd\u6301\u66f4\u65b0',
    newsletterHeading:    '\u6bcf\u6708\u4e24\u7bc7\u3002\u503c\u5f97\u4e00\u8bfb\u3002',
    newsletterSub:
      '\u53cc\u8bed\u53d1\u5c55\u3001Lexile\u589e\u957f\u548c\u5bfc\u5e08\u89c6\u89d2\u7684\u65b0\u6587\u7ae0\u2014\u2014\u6bcf\u6708\u4e24\u7bc7\u3002',
    emailLabel:       '\u7535\u5b50\u90ae\u4ef6\u5730\u5740',
    emailPlaceholder: '\u60a8\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740',
    subscribeBtn:     '\u8ba2\u9605\u6587\u7ae0',
    newsletterNote:   '\u65e0\u63a8\u5e7f\u90ae\u4ef6\u3002\u968f\u65f6\u53ef\u53d6\u6d88\u8ba2\u9605\u3002',
    // S8
    ctaHeading:
      '\u60a8\u5df2\u9605\u8bfb\u4e86\u601d\u8003\u3002\u4e0b\u4e00\u6b65\u662f\u4e00\u4e2a20\u5206\u949f\u7684\u901a\u8bdd\u2014\u2014\u6211\u4eec\u5c06\u5176\u5e94\u7528\u5230\u60a8\u5b69\u5b50\u7684\u5177\u4f53\u60c5\u51b5\u3002',
    ctaButton: '\u9884\u7ea6\u8bca\u65ad\u901a\u8bdd',
    ctaSub:    '20\u5206\u949f \u00b7 \u5bfc\u5e08\u5168\u7a0b\u964d\u670d \u00b7 \u65e0\u4efb\u4f55\u7ec4\u62f9',
    // BlogClient interactive strings
    client: {
      searchPlaceholder: '\u641c\u7d22\u6587\u7ae0\u3001\u4e3b\u9898\u3001\u95ee\u9898\u2026',
      filterAriaLabel:   '\u6309\u5206\u7c7b\u7b5b\u9009\u6587\u7ae0',
      loadMore:          '\u52a0\u8f7d\u66f4\u591a\u6587\u7ae0',
      noResultsPrefix:   '\u672a\u627e\u5230\u4e0e\u201c',
      noResultsSuffix:   '\u201d\u76f8\u5173\u7684\u6587\u7ae0\u3002',
      noResultsIn:       '\uff08',
    },
  },
}

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
// ARTICLE DATA
// TODO: migrate to content/en/blog/index.json + content/zh/blog/index.json
// Titles and excerpts are EN for now; locale switching of article metadata
// happens at that migration point.
// ─────────────────────────────────────────────────────────────
const featuredArticle = {
  slug:      'lexile-asymmetry-bilingual-children',
  category:  'Bilingual Development',
  title:     'What does it mean when a bilingual child reads above grade level in one language but not the other?',
  excerpt:   "Lexile asymmetry is normal in bilingual development. Here\u2019s why it happens \u2014 and when to intervene.",
  author:    'Dr. Sarah Chen',
  role:      'Lead Navigator',
  readTime:  '8 min read',
  date:      'March 10, 2026',
  imageUrl:  'https://images.unsplash.com/photo-1666198259234-f7033c78b94e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
}

const ARTICLES = [
  { id: 1, slug: 'what-does-lexile-score-mean',              category: 'Lexile + Reading',        title: "What does my child\u2019s Lexile score actually mean \u2014 and how do we move it?",                              excerpt: "A parent\u2019s guide to understanding Lexile measurements and creating actionable growth plans.",          author: 'Michael Torres',    readTime: '6 min', date: 'March 8, 2026',    imageUrl: 'https://images.unsplash.com/photo-1620679860338-aa1053541b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80' },
  { id: 2, slug: 'complex-stories-english-simple-sentences-mandarin', category: 'Writing + 6+1 Traits', title: 'Why does my 7-year-old write complex stories in English but struggle with simple sentences in Mandarin?', excerpt: "Writing development doesn\u2019t transfer equally across languages. Here\u2019s what shapes the gap.",      author: 'Li Wei',            readTime: '7 min', date: 'March 5, 2026',    imageUrl: 'https://images.unsplash.com/photo-1646032539375-2ecd919356ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80' },
  { id: 3, slug: 'three-moments-bilingual-plan-not-working', category: 'Navigator Insights',      title: "The three moments when parents realize their bilingual plan isn\u2019t working",                               excerpt: 'Pattern recognition from 500+ diagnostic calls \u2014 and what intervention looks like at each stage.',   author: 'Dr. Sarah Chen',    readTime: '9 min', date: 'March 1, 2026',    imageUrl: 'https://images.unsplash.com/photo-1673515334717-da4d85aaf38b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80' },
  { id: 4, slug: 'bilingual-education-san-francisco',        category: 'City Guides',             title: 'Bilingual education options in San Francisco: What the data shows',                                          excerpt: 'Comparative analysis of Mandarin immersion programs, dual-language schools, and private options.',         author: 'Jennifer Park',     readTime: '11 min', date: 'Feb 28, 2026',   imageUrl: 'https://images.unsplash.com/photo-1706528010331-0f12582db334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80' },
  { id: 5, slug: 'code-switching-bilingual-children',        category: 'Parent Q+A',              title: 'Should I be worried if my child mixes languages in the same sentence?',                                       excerpt: "Code-switching is a sign of linguistic competence, not confusion. Here\u2019s what the research says.",   author: 'Dr. Maria Rodriguez', readTime: '5 min', date: 'Feb 25, 2026',  imageUrl: 'https://images.unsplash.com/photo-1769794371007-9bf419217727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80' },
  { id: 6, slug: 'when-bilingual-children-start-reading',    category: 'Bilingual Development',   title: 'When do bilingual children start reading? What to expect by age and language',                                excerpt: "Timeline expectations for literacy emergence in two languages \u2014 and why they don\u2019t always align.", author: 'Michael Torres',    readTime: '8 min', date: 'Feb 22, 2026',   imageUrl: 'https://images.unsplash.com/photo-1666198259234-f7033c78b94e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80' },
]

const CATEGORIES = [
  'All', 'Bilingual Development', 'Lexile + Reading',
  'Writing + 6+1 Traits', 'Navigator Insights', 'City Guides', 'Parent Q+A',
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
  const ui = BLOG_UI[locale] ?? BLOG_UI.en

  return (
    <div className="w-full overflow-hidden" style={{ fontFamily: 'var(--font-latin)' }}>

      {/* ══ S1 HERO ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle, #b7b5fe 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.08 }} />

        <div className="relative max-w-7xl mx-auto px-6 text-center" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
          <div style={{ fontFamily: 'var(--font-latin)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, fontSize: '12px', color: '#b7b5fe', marginBottom: '24px' }}>
            {ui.eyebrow}
          </div>

          <h1 className="mb-6 max-w-[720px] mx-auto"
            style={{ color: '#0E0E12', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            {ui.h1a}
            {ui.h1highlight ? <span style={{ color: '#b7b5fe' }}>{ui.h1highlight}</span> : null}
            {ui.h1b}
          </h1>

          <p className="mb-8 max-w-[540px] mx-auto"
            style={{ color: '#212830', fontSize: '18px', fontWeight: 400, lineHeight: 1.6 }}>
            {ui.subhead}
          </p>

          <BlogClient articles={ARTICLES} categories={CATEGORIES} locale={locale} ui={ui.client} />
        </div>
      </section>

      {/* ══ S2 FEATURED ARTICLE ══════════════════════════════ */}
      <section className="py-16 px-6" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden flex flex-col md:flex-row"
            style={{ borderLeft: '4px solid #b7b5fe', boxShadow: '0 4px 24px rgba(183,181,254,0.15)' }}>

            <div className="md:w-[45%] bg-[#212830] flex items-center justify-center overflow-hidden" style={{ minHeight: '300px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featuredArticle.imageUrl} alt={featuredArticle.title}
                className="w-full h-full object-cover" style={{ minHeight: '300px', display: 'block' }} />
            </div>

            <div className="md:w-[55%] flex flex-col justify-center" style={{ padding: '40px' }}>
              <div className="inline-block rounded w-fit mb-4"
                style={{ backgroundColor: 'rgba(183,181,254,0.15)', color: '#b7b5fe', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', padding: '4px 12px', letterSpacing: '0.06em' }}>
                {ui.featuredLabel}
              </div>

              <h2 className="mb-4 max-w-[480px]"
                style={{ color: '#0E0E12', fontSize: '30px', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.02em' }}>
                {featuredArticle.title}
              </h2>

              <p className="mb-4" style={{ color: '#212830', fontSize: '15px', fontWeight: 400, lineHeight: 1.6 }}>
                {featuredArticle.excerpt}
              </p>

              <div className="flex items-center gap-2 mb-6" style={{ color: '#212830', fontSize: '13px', fontWeight: 500 }}>
                <span>{featuredArticle.author}</span><span>\u00b7</span>
                <span style={{ opacity: 0.7 }}>{featuredArticle.role}</span><span>\u00b7</span>
                <span style={{ opacity: 0.7 }}>{featuredArticle.readTime}</span>
              </div>

              <div className="mb-6" style={{ color: '#212830', opacity: 0.5, fontSize: '12px' }}>
                {featuredArticle.date}
              </div>

              <Link href={`/${locale}/blog/${featuredArticle.slug}`}
                className="inline-block rounded-lg transition-all hover:opacity-90 w-fit"
                style={{ backgroundColor: '#b7b5fe', color: '#0E0E12', fontSize: '15px', fontWeight: 600, padding: '12px 24px', textDecoration: 'none' }}>
                {ui.readArticle}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* S3 + S4 rendered inside BlogClient above */}

      {/* ══ S5 GEO ANCHOR STRIP ══════════════════════════════ */}
      <section className="py-16 px-6" style={{ backgroundColor: '#212830' }}>
        <div className="max-w-7xl mx-auto">
          <div className="uppercase text-center mb-10"
            style={{ color: '#b7b5fe', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em' }}>
            {ui.goDeeperEyebrow}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: '1px solid rgba(183,181,254,0.12)' }}>
            {ui.geoLinks.map(({ route, title, rationale }) => (
              <Link key={route} href={`/${locale}${route}`}
                className="group block transition-colors p-6 md:p-8" style={{ textDecoration: 'none' }}>
                <div className="group-hover:bg-[#2E3848] rounded-lg transition-colors p-0">
                  <div style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: 300, color: 'rgba(240,240,240,0.5)', marginBottom: '12px', fontFamily: 'var(--font-latin)' }}>
                    {route}
                  </div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 style={{ color: '#F0F0F0', fontSize: '18px', fontWeight: 600, lineHeight: 1.3 }}>{title}</h3>
                    <IconArrowRight className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: '#b7b5fe', marginTop: '2px' }} />
                  </div>
                  <p style={{ color: 'rgba(240,240,240,0.65)', fontSize: '14px', fontWeight: 400, lineHeight: 1.5 }}>{rationale}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S6 NAVIGATOR PICKS ═══════════════════════════════ */}
      <section className="py-16 px-6" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="max-w-7xl mx-auto">
          <div style={{ fontFamily: 'var(--font-latin)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, fontSize: '12px', color: '#b7b5fe', marginBottom: '32px' }}>
            {ui.navigatorPicksEyebrow}
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{ width: '48px', height: '48px', backgroundColor: '#0E0E12', color: '#b7b5fe', fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-latin)' }}
              aria-hidden="true">SC</div>
            <div>
              <div style={{ color: '#0E0E12', fontSize: '15px', fontWeight: 600 }}>{ui.navigatorName}</div>
              <div style={{ color: 'rgba(33,40,48,0.7)', fontSize: '13px', fontWeight: 400 }}>{ui.navigatorRole}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.slice(0, 3).map((article) => (
              <article key={article.id} className="bg-white rounded-lg overflow-hidden transition-all hover:-translate-y-0.5"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div className="relative bg-[#212830]" style={{ height: '240px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" style={{ display: 'block' }} />
                  <div className="absolute bottom-3 left-3 px-2 py-1 rounded uppercase"
                    style={{ backgroundColor: 'rgba(183,181,254,0.15)', color: '#b7b5fe', fontSize: '11px', fontWeight: 500, backdropFilter: 'blur(8px)' }}>
                    {article.category}
                  </div>
                </div>
                <Link href={`/${locale}/blog/${article.slug}`} className="block p-6 hover:no-underline">
                  <h3 className="mb-2 line-clamp-2" style={{ color: '#0E0E12', fontSize: '18px', fontWeight: 600, lineHeight: 1.4 }}>{article.title}</h3>
                  <p className="mb-4 line-clamp-1" style={{ color: 'rgba(33,40,48,0.75)', fontSize: '14px', fontWeight: 400 }}>{article.excerpt}</p>
                  <div className="flex items-center gap-2" style={{ color: '#212830', fontSize: '12px', fontWeight: 500 }}>
                    <span>{article.author}</span><span>\u00b7</span>
                    <span>{article.readTime}</span><span>\u00b7</span>
                    <span>{article.date}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S7 NEWSLETTER SIGNUP ═════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-[480px] mx-auto text-center">
          <div style={{ fontFamily: 'var(--font-latin)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, fontSize: '12px', color: '#b7b5fe', marginBottom: '24px' }}>
            {ui.newsletterEyebrow}
          </div>
          <h2 className="mb-4" style={{ color: '#0E0E12', fontSize: '26px', fontWeight: 600, lineHeight: 1.3, letterSpacing: '-0.02em' }}>
            {ui.newsletterHeading}
          </h2>
          <p className="mb-8" style={{ color: '#212830', fontSize: '15px', fontWeight: 400, lineHeight: 1.6 }}>
            {ui.newsletterSub}
          </p>
          <form className="max-w-[400px] mx-auto" action="/api/newsletter" method="POST">
            <label htmlFor="newsletter-email" className="block text-left mb-2" style={{ color: '#212830', fontSize: '13px', fontWeight: 400 }}>
              {ui.emailLabel}
            </label>
            <input id="newsletter-email" name="email" type="email" placeholder={ui.emailPlaceholder}
              autoComplete="email" required
              className="w-full h-12 px-4 rounded-lg mb-3 transition-all"
              style={{ fontFamily: 'var(--font-latin)', backgroundColor: '#F5F5FF', border: '1.5px solid rgba(183,181,254,0.4)', color: '#212830', fontSize: '15px', fontWeight: 400, outline: 'none', display: 'block', boxSizing: 'border-box' }} />
            <button type="submit" className="w-full px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{ fontFamily: 'var(--font-latin)', backgroundColor: '#b7b5fe', color: '#0E0E12', fontSize: '15px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
              {ui.subscribeBtn}
            </button>
            <p className="mt-3" style={{ color: 'rgba(33,40,48,0.45)', fontSize: '12px', fontWeight: 400 }}>
              {ui.newsletterNote}
            </p>
          </form>
        </div>
      </section>

      {/* ══ S8 CLOSING CTA ═══════════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: '#212830' }}>
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="mb-8"
            style={{ color: '#b7b5fe', fontSize: 'clamp(24px, 3vw, 28px)', fontWeight: 700, lineHeight: 1.4, letterSpacing: '-0.02em' }}>
            {ui.ctaHeading}
          </h2>
          <Link href={`/${locale}/consult`}
            className="inline-block rounded-lg transition-all hover:opacity-90 mb-4"
            style={{ fontFamily: 'var(--font-latin)', backgroundColor: '#F5C842', color: '#0E0E12', fontSize: '16px', fontWeight: 700, padding: '16px 32px', textDecoration: 'none' }}>
            {ui.ctaButton}
          </Link>
          <p style={{ color: '#b7b5fe', fontSize: '13px', fontWeight: 400, marginTop: '16px' }}>
            {ui.ctaSub}
          </p>
        </div>
      </section>

    </div>
  )
}