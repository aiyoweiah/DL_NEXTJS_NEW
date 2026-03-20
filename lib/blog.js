// lib/blog.js
//
// Server-only blog utility — uses Node fs/path at build time.
// Safe in output: 'export' because all calls happen during static generation
// (generateStaticParams, generateMetadata, page render).
// NEVER import this in a 'use client' file.
//
// MDX files live in:
//   content/en/blog/{slug}.mdx
//   content/zh/blog/{slug}.mdx   ← optional; falls back to EN if absent
//
// Frontmatter shape (gray-matter):
//   title:       string  (required)
//   description: string  (required — used for <meta> and card excerpts)
//   publishedAt: string  ISO date e.g. "2026-03-10"
//   updatedAt:   string  ISO date (optional; defaults to publishedAt)
//   author:      string  e.g. "Dr. Sarah Chen"
//   authorRole:  string  e.g. "Lead Navigator"
//   readTime:    string  e.g. "8 min read"
//   category:    string  e.g. "Bilingual Development"
//   ogImage:     string  absolute URL (optional; defaults to /og-default.png)

import fs   from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

// ── Internal helpers ──────────────────────────────────────────

function blogDir(locale) {
  return path.join(CONTENT_ROOT, locale, 'blog')
}

function exists(filePath) {
  try { fs.accessSync(filePath); return true }
  catch { return false }
}

// ── getAllSlugs ───────────────────────────────────────────────
// Returns all slugs from content/en/blog/ — EN is canonical.
// ZH routes are generated for every EN slug regardless of whether
// a ZH file exists (ZH falls back to EN content if missing).
//
// @returns {string[]}
export function getAllSlugs() {
  const dir = blogDir('en')
  if (!exists(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

// ── getPost ───────────────────────────────────────────────────
// Reads a single MDX post for the given locale + slug.
// Falls back to EN if the locale-specific file does not exist.
// Returns null if neither file exists (slug not found).
//
// @param {'en'|'zh'} locale
// @param {string}    slug
// @returns {{ slug, locale, isFallback, source, frontmatter } | null}
export function getPost(locale, slug) {
  const localePath = path.join(blogDir(locale), `${slug}.mdx`)
  const enPath     = path.join(blogDir('en'),     `${slug}.mdx`)

  let filePath   = localePath
  let isFallback = false

  if (!exists(localePath)) {
    if (!exists(enPath)) return null
    filePath   = enPath
    isFallback = true
  }

  const raw                    = fs.readFileSync(filePath, 'utf8')
  const { data: fm, content }  = matter(raw)

  return {
    slug,
    locale,
    isFallback,
    source: content, // MDX body without frontmatter — passed to compileMDX
    frontmatter: {
      title:       fm.title       ?? '',
      description: fm.description ?? '',
      publishedAt: fm.publishedAt ?? '',
      updatedAt:   fm.updatedAt   ?? fm.publishedAt ?? '',
      author:      fm.author      ?? 'DODO Learning',
      authorRole:  fm.authorRole  ?? 'Navigator',
      readTime:    fm.readTime    ?? '',
      category:    fm.category    ?? '',
      ogImage:     fm.ogImage     ?? null,
    },
  }
}

// ── getAllPosts ───────────────────────────────────────────────
// Returns all posts for a locale, sorted newest-first.
// Used by the blog index page to build the article list.
//
// @param {'en'|'zh'} locale
// @returns {Array<ReturnType<getPost>>}
export function getAllPosts(locale = 'en') {
  return getAllSlugs()
    .map((slug) => getPost(locale, slug))
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt) - new Date(a.frontmatter.publishedAt)
    )
}