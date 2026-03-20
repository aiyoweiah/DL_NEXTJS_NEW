'use client'

// components/blog/BlogClient.jsx
//
// Client component — owns ONLY the interactive elements:
//   - Search bar (S1)
//   - Category filter pills (S3)
//   - Filtered article grid (S4) + Load More
//
// Props:
//   articles   array    — article data from blog/page.jsx
//   categories array    — category strings for filter pills
//   locale     string   — 'en' | 'zh', for locale-prefixed hrefs
//   ui         object   — interactive UI strings from BLOG_UI[locale].client

import { useState, useMemo } from 'react'
import Link from 'next/link'

function IconSearch({ style }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" style={style} aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function IconArrowRight({ style, className }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" style={style} className={className} aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function ArticleCard({ article, locale }) {
  return (
    <article className="bg-white rounded-lg overflow-hidden transition-all hover:-translate-y-0.5 article-card-hover"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      <div className="relative bg-[#212830]" style={{ height: '240px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.imageUrl} alt={article.title}
          className="w-full h-full object-cover" style={{ display: 'block' }} />
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded uppercase"
          style={{ backgroundColor: 'rgba(183,181,254,0.15)', color: '#b7b5fe', fontSize: '11px', fontWeight: 500, backdropFilter: 'blur(8px)' }}>
          {article.category}
        </div>
      </div>

      <Link href={`/${locale}/blog/${article.slug ?? article.id}`} className="block p-6 hover:no-underline">
        <h3 className="mb-2 line-clamp-2" style={{ color: '#0E0E12', fontSize: '18px', fontWeight: 600, lineHeight: 1.4 }}>
          {article.title}
        </h3>
        <p className="mb-4 line-clamp-1" style={{ color: 'rgba(33,40,48,0.75)', fontSize: '14px', fontWeight: 400 }}>
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2" style={{ color: '#212830', fontSize: '12px', fontWeight: 500 }}>
          <span>{article.author}</span>
          <span>&middot;</span>
          <span>{article.readTime}</span>
          <span>&middot;</span>
          <span>{article.date}</span>
        </div>
      </Link>
    </article>
  )
}

export default function BlogClient({ articles, categories, locale = 'en', ui }) {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [searchQuery,    setSearchQuery]    = useState('')
  const [visibleCount,   setVisibleCount]   = useState(6)

  // Default UI strings — fallback if not passed
  const t = ui ?? {
    searchPlaceholder: 'Search articles, topics, questions...',
    filterAriaLabel:   'Filter articles by category',
    loadMore:          'Load More Articles',
    noResultsPrefix:   'No articles match \u201c',
    noResultsSuffix:   '\u201d',
    noResultsIn:       ' in ',
  }

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchCat    = activeCategory === categories[0] || a.category === activeCategory
      const q           = searchQuery.trim().toLowerCase()
      const matchSearch = !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [articles, activeCategory, searchQuery, categories])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <>
      {/* Search bar */}
      <div className="max-w-[560px] mx-auto mt-8 px-6 md:px-0">
        <form role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="blog-search" className="sr-only">{t.searchPlaceholder}</label>
          <div className="relative">
            <IconSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#b7b5fe', pointerEvents: 'none' }} />
            <input
              id="blog-search" type="search" value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(6) }}
              placeholder={t.searchPlaceholder}
              className="w-full h-[52px] pl-12 pr-12 rounded-lg bg-white transition-all"
              style={{ border: '1.5px solid rgba(183,181,254,0.4)', color: '#212830', fontSize: '15px', fontWeight: 400, outline: 'none', fontFamily: 'var(--font-latin)' }}
              onFocus={(e)  => { e.target.style.borderColor = '#b7b5fe' }}
              onBlur={(e)   => { e.target.style.borderColor = 'rgba(183,181,254,0.4)' }} />
            <IconArrowRight style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#b7b5fe', pointerEvents: 'none' }} />
          </div>
        </form>
      </div>

      {/* S3 Category filter */}
      <section className="py-8 px-6" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-3 flex-wrap" role="group" aria-label={t.filterAriaLabel}>
            {categories.map((category) => {
              const isActive = activeCategory === category
              return (
                <button key={category}
                  onClick={() => { setActiveCategory(category); setVisibleCount(6) }}
                  aria-pressed={isActive}
                  className="rounded-[20px] transition-all"
                  style={{ fontFamily: 'var(--font-latin)', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                    backgroundColor: isActive ? '#b7b5fe' : 'transparent',
                    color:           isActive ? '#0E0E12' : '#212830',
                    border:          isActive ? 'none' : '1.5px solid rgba(33,40,48,0.3)' }}
                  onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'rgba(183,181,254,0.12)'; e.currentTarget.style.borderColor = 'rgba(183,181,254,0.6)' } }}
                  onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(33,40,48,0.3)' } }}>
                  {category}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* S4 Article grid */}
      <section className="px-6 pb-20" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="max-w-7xl mx-auto">
          {visible.length === 0 && (
            <div className="text-center py-20">
              <p style={{ color: 'rgba(33,40,48,0.5)', fontSize: '16px', fontWeight: 400 }}>
                {t.noResultsPrefix}{searchQuery}{t.noResultsSuffix}
                {activeCategory !== categories[0] ? `${t.noResultsIn}${activeCategory})` : ''}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((article) => (
              <ArticleCard key={article.id} article={article} locale={locale} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-12">
              <button onClick={() => setVisibleCount((n) => n + 6)}
                className="px-8 py-3 rounded-lg font-medium transition-all"
                style={{ fontFamily: 'var(--font-latin)', border: '2px solid #b7b5fe', color: '#212830', backgroundColor: 'transparent', fontSize: '15px', cursor: 'pointer' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(183,181,254,0.1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}>
                {t.loadMore}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}