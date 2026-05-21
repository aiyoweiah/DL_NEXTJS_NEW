'use client'

// components/faq/FAQClient.jsx
//
// Pure renderer for the FAQ page. Receives:
//   props.locale     — 'en' | 'zh'
//   props.ui         — strings (eyebrow, h1, searchCount fn, …)
//   props.categories — [{ label, anchor }]
//   props.sections   — [{ id, label, heading, variant, bg, items: [{ question, answer, searchText? }] }]
//
// Answer strings use markdown-lite syntax:
//   [link text](/relative/path)  — rendered as <Link href={`/${locale}/relative/path`}>
//   **bold text**                 — rendered as <strong>
// Anything else renders as plain text. No JSX inside answer strings.

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { faq } from '@/content/faq'

// ─── Markdown-lite renderer ─────────────────────────────────
// Parses [text](href) and **text** inside an answer string.
// Returns an array of strings and React elements suitable for {...} children.
function renderMarkdownLite(text, locale) {
  if (typeof text !== 'string') return text // already JSX/array — pass through
  const parts = []
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g
  let last = 0; let m; let i = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1] != null) {
      // Link: [text](href). Prepend /<locale> if href starts with '/'
      const raw = m[2]
      const href = raw.startsWith('/') ? `/${locale}${raw}` : raw
      parts.push(
        <Link key={`l${i++}`} href={href} style={{ color: '#b7b5fe', fontWeight: 500 }}>
          {m[1]}
        </Link>
      )
    } else if (m[3] != null) {
      parts.push(
        <strong key={`b${i++}`} style={{ fontWeight: 600, color: '#F0F0F0' }}>
          {m[3]}
        </strong>
      )
    }
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts.length === 1 ? parts[0] : parts
}

// ─── Icons ──────────────────────────────────────────────────
function IconSearch({ style }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" style={style} aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  )
}
function IconArrowRight({ style }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
function IconChevron({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 220ms cubic-bezier(0.4,0,0.2,1)', flexShrink: 0 }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

// ─── Small visual primitives ────────────────────────────────
function Eyebrow({ children, dark = false }) {
  return (
    <div style={{ fontFamily: 'var(--font-latin)', fontSize: '12px', fontWeight: 500,
      letterSpacing: '0.1em', textTransform: 'uppercase', color: dark ? '#b7b5fe' : '#5856cc', marginBottom: '12px' }}>
      {children}
    </div>
  )
}
function SectionH2({ children, dark = false }) {
  return (
    <h2 style={{ fontFamily: 'var(--font-latin)', fontSize: '28px', fontWeight: 700,
      color: dark ? '#F0F0F0' : '#0E0E12', marginBottom: '32px',
      letterSpacing: '-0.02em', lineHeight: 1.3 }}>
      {children}
    </h2>
  )
}

// ─── Accordion ──────────────────────────────────────────────
function AccordionItem({ question, answer, locale, open, onToggle, variant = 'light', id }) {
  const isDark = variant === 'dark'
  return (
    <div style={{ borderBottom: isDark ? '1px solid rgba(183,181,254,0.15)' : '1px solid rgba(0,0,0,0.08)' }}>
      <button
        id={`faq-btn-${id}`} aria-expanded={open} aria-controls={`faq-panel-${id}`}
        onClick={onToggle}
        className="w-full text-left flex items-start justify-between gap-4"
        style={{ fontFamily: 'var(--font-latin)', fontSize: '17px', fontWeight: 600,
          color: isDark ? '#F0F0F0' : '#0E0E12', lineHeight: 1.45,
          background: 'none', border: 'none', cursor: 'pointer', padding: '20px 0' }}
      >
        <span style={{ flex: 1 }}>{question}</span>
        <span style={{ color: isDark ? '#b7b5fe' : '#5856cc', marginTop: '2px' }}><IconChevron open={open} /></span>
      </button>
      <div id={`faq-panel-${id}`} role="region" aria-labelledby={`faq-btn-${id}`}
        style={{ overflow: 'hidden', maxHeight: open ? '1200px' : '0px',
          transition: 'max-height 280ms cubic-bezier(0.4,0,0.2,1)' }}>
        <div style={{ fontFamily: 'var(--font-latin)', fontSize: '16px', fontWeight: 400,
          color: isDark ? 'rgba(240,240,240,0.75)' : '#212830', lineHeight: 1.7, paddingBottom: '20px' }}>
          {renderMarkdownLite(answer, locale)}
        </div>
      </div>
    </div>
  )
}

function AccordionGroup({ items, variant, groupId, locale }) {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = useCallback((i) => setOpenIndex((prev) => (prev === i ? null : i)), [])
  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem key={i} id={`${groupId}-${i}`} question={item.question}
          answer={item.answer} locale={locale} variant={variant} open={openIndex === i}
          onToggle={() => toggle(i)} />
      ))}
    </div>
  )
}

// ─── Category bar ───────────────────────────────────────────
function CategoryBar({ active, onSelect, categories }) {
  const scrollTo = (anchor) => {
    onSelect(anchor)
    const el = document.getElementById(anchor)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 64 - 60 - 16
    window.scrollTo({ top, behavior: 'smooth' })
  }
  return (
    <div style={{ backgroundColor: '#0E0E12', borderBottom: '1px solid rgba(183,181,254,0.10)',
      position: 'sticky', top: '64px', zIndex: 50, overflowX: 'auto' }}>
      <div className="max-w-7xl mx-auto" style={{ display: 'flex', gap: '4px', padding: '10px 24px' }}>
        {categories.map(({ label, anchor }) => {
          const isActive = active === anchor
          return (
            <button key={anchor} onClick={() => scrollTo(anchor)} style={{
              fontFamily: 'var(--font-latin)', fontSize: '13px',
              fontWeight: isActive ? 600 : 400, whiteSpace: 'nowrap',
              padding: '6px 14px', borderRadius: '9999px',
              backgroundColor: isActive ? '#b7b5fe' : 'transparent',
              color: isActive ? '#0E0E12' : 'rgba(240,240,240,0.6)',
              border: isActive ? 'none' : '1px solid rgba(183,181,254,0.15)',
              cursor: 'pointer', transition: 'all 150ms ease' }}>
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Search results pane ────────────────────────────────────
function SearchResults({ results, query, ui, locale }) {
  const [openIndex, setOpenIndex] = useState(null)
  if (results.length === 0) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-20 text-center"
        style={{ backgroundColor: '#F5F5FF', minHeight: '400px' }}>
        <p style={{ fontFamily: 'var(--font-latin)', fontSize: '16px', color: 'rgba(14,14,18,0.45)' }}>
          {ui.noResults(query)}
        </p>
      </div>
    )
  }
  return (
    <div style={{ backgroundColor: '#F5F5FF' }}>
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <p style={{ fontFamily: 'var(--font-latin)', fontSize: '13px', fontWeight: 500,
          color: '#5856cc', marginBottom: '24px', letterSpacing: '0.05em' }}>
          {ui.searchCount(results.length, query)}
        </p>
        {results.map((item, i) => (
          <div key={i}>
            <div style={{ marginBottom: '4px', fontSize: '11px', color: 'rgba(183,181,254,0.5)',
              fontFamily: 'var(--font-latin)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {item._category}
            </div>
            <AccordionItem id={`search-${i}`} question={item.question} answer={item.answer}
              locale={locale} variant="light" open={openIndex === i}
              onToggle={() => setOpenIndex((p) => (p === i ? null : i))} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main export ────────────────────────────────────────────
export default function FAQClient({ locale = 'en' }) {
  const [searchQuery,    setSearchQuery]    = useState('')
  const [activeCategory, setActiveCategory] = useState('')

  const ui         = faq.ui[locale]         ?? faq.ui.en
  const categories = faq.categories[locale] ?? faq.categories.en
  const sections   = faq.sections[locale]   ?? faq.sections.en

  const allItems = useMemo(
    () => sections.flatMap((s) => s.items.map((item) => ({ ...item, _category: s.label, _sectionId: s.id }))),
    [sections]
  )

  const trimmed = searchQuery.trim().toLowerCase()
  const searchResults = useMemo(() => {
    if (!trimmed) return []
    return allItems.filter((item) => {
      const q = item.question.toLowerCase()
      // Answers are strings; if the item supplied searchText (for items with markdown formatting),
      // use that instead for full-text search.
      const a = (item.searchText ?? item.answer ?? '').toLowerCase()
      return q.includes(trimmed) || a.includes(trimmed)
    })
  }, [trimmed, allItems])

  const isSearching = trimmed.length > 0

  return (
    <div className="w-full overflow-hidden" style={{ fontFamily: 'var(--font-latin)' }}>

      {/* ── HERO + SEARCH ──────────────────────────────────── */}
      <section style={{ backgroundColor: '#212830' }}>
        <div className="max-w-[680px] mx-auto text-center px-6"
          style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', paddingBottom: '64px' }}>
          <div style={{ fontFamily: 'var(--font-latin)', fontSize: '12px', fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b7b5fe', marginBottom: '24px' }}>
            {ui.eyebrow}
          </div>
          <h1 style={{ fontFamily: 'var(--font-latin)', fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2, letterSpacing: '-0.03em', marginBottom: '16px' }}>
            {ui.h1}
          </h1>
          <p className="max-w-[520px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontSize: '16px',
            fontWeight: 400, color: 'rgba(240,240,240,0.60)', lineHeight: 1.6, marginBottom: '20px' }}>
            {ui.subhead}
          </p>
          <form role="search" className="max-w-[560px] mx-auto mt-5" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="faq-search" className="sr-only">{ui.placeholder}</label>
            <div className="relative">
              <IconSearch style={{ position: 'absolute', left: '16px', top: '50%',
                transform: 'translateY(-50%)', color: '#b7b5fe', pointerEvents: 'none' }} />
              <input id="faq-search" type="search" value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={ui.placeholder}
                className="w-full h-[52px] pl-12 pr-12 rounded-lg transition-colors"
                style={{ fontFamily: 'var(--font-latin)', fontSize: '16px', fontWeight: 400,
                  backgroundColor: '#2E3848', border: '1.5px solid rgba(183,181,254,0.30)',
                  color: '#F0F0F0', outline: 'none' }}
                onFocus={(e) => { e.target.style.borderColor = '#b7b5fe' }}
                onBlur={(e)  => { e.target.style.borderColor = 'rgba(183,181,254,0.30)' }} />
              <IconArrowRight style={{ position: 'absolute', right: '16px', top: '50%',
                transform: 'translateY(-50%)', color: '#b7b5fe', pointerEvents: 'none' }} />
            </div>
          </form>
        </div>
      </section>

      {/* ── CATEGORY NAV ──────────────────────────────────── */}
      <CategoryBar active={activeCategory} onSelect={setActiveCategory} categories={categories} />

      {/* ── SEARCH RESULTS or SECTIONED LAYOUT ─────────────── */}
      {isSearching ? (
        <SearchResults results={searchResults} query={trimmed} ui={ui} locale={locale} />
      ) : (
        <>
          {sections.map((section) => {
            const isDark = section.variant === 'dark'
            return (
              <section key={section.id} id={section.id} className="px-6 py-16"
                style={{ backgroundColor: section.bg }}>
                <div className="max-w-[800px] mx-auto">
                  <Eyebrow dark={isDark}>{section.label}</Eyebrow>
                  <SectionH2 dark={isDark}>{section.heading}</SectionH2>
                  <AccordionGroup items={section.items} variant={section.variant} groupId={section.id} locale={locale} />
                </div>
              </section>
            )
          })}
        </>
      )}

      {/* ── STILL HAVE A QUESTION ─────────────────────────── */}
      <section className="px-6" style={{ backgroundColor: '#F5F5FF', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-[560px] mx-auto text-center">
          <Eyebrow>{ui.stillEyebrow}</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-latin)', fontSize: '32px', fontWeight: 700,
            color: '#0E0E12', letterSpacing: '-0.02em', marginBottom: '16px' }}>
            {ui.stillH2}
          </h2>
          <p className="max-w-[480px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontSize: '17px',
            fontWeight: 400, color: '#212830', lineHeight: 1.6, marginBottom: '28px' }}>
            {ui.stillSub}
          </p>
          <Link href={`/${locale}/consult`} className="inline-block rounded-lg transition-all hover:opacity-90"
            style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '16px',
              backgroundColor: '#F5C842', color: '#0E0E12', padding: '16px 32px', textDecoration: 'none' }}>
            {ui.ctaButton}
          </Link>
          <div style={{ marginTop: '14px' }}>
            <a href="mailto:hello@dodolearning.com"
              style={{ fontFamily: 'var(--font-latin)', fontSize: '14px', fontWeight: 400, color: '#5856cc' }}>
              {ui.emailLink}
            </a>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ───────────────────────────────────── */}
      <section className="px-6" style={{ backgroundColor: '#212830', paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="max-w-[580px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontSize: '32px',
            fontWeight: 700, color: '#b7b5fe', lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            {ui.closingH2}
          </h2>
          <p className="max-w-[480px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontSize: '16px',
            fontWeight: 400, color: 'rgba(240,240,240,0.70)', lineHeight: 1.6, marginBottom: '32px' }}>
            {ui.closingSub}
          </p>
          <Link href={`/${locale}/consult`} className="inline-block rounded-lg transition-all hover:opacity-90"
            style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '16px',
              backgroundColor: '#F5C842', color: '#0E0E12', padding: '16px 32px', textDecoration: 'none' }}>
            {ui.ctaButton}
          </Link>
          <p style={{ fontFamily: 'var(--font-latin)', fontSize: '13px', fontWeight: 400,
            color: '#b7b5fe', marginTop: '14px' }}>
            {ui.closingMicro}
          </p>
        </div>
      </section>

    </div>
  )
}
