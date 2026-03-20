// lib/blog.js
//
// Server-only blog utility — uses Node fs/path at build time.
// Safe in output: 'export' because all calls happen during static generation.
// NEVER import this in a 'use client' file.
//
// MDX rendering:
//   Uses remark → remark-gfm → remark-html to produce HTML at build time.
//   Avoids next-mdx-remote which causes a React version conflict with
//   Next.js 16 + Turbopack (next-mdx-remote v5 bundles its own React copy).

import fs    from 'fs'
import path  from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm  from 'remark-gfm'
import remarkHtml from 'remark-html'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

function blogDir(locale) {
  return path.join(CONTENT_ROOT, locale, 'blog')
}

function exists(filePath) {
  try { fs.accessSync(filePath); return true }
  catch { return false }
}

// Converts MDX/Markdown source to an HTML string at build time.
// sanitize: false — we control the content, no user input here.
export async function mdxToHtml(source) {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(source)
  return String(result)
}

// Returns all slugs from content/en/blog/ — EN is canonical.
export function getAllSlugs() {
  const dir = blogDir('en')
  if (!exists(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

// Reads a single post. Falls back to EN if locale file is absent.
// Returns null if neither file exists.
export function getPost(locale, slug) {
  const localePath = path.join(blogDir(locale), `${slug}.mdx`)
  const enPath     = path.join(blogDir('en'),    `${slug}.mdx`)

  let filePath   = localePath
  let isFallback = false

  if (!exists(localePath)) {
    if (!exists(enPath)) return null
    filePath   = enPath
    isFallback = true
  }

  const raw                   = fs.readFileSync(filePath, 'utf8')
  const { data: fm, content } = matter(raw)

  return {
    slug,
    locale,
    isFallback,
    source: content,
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

// Returns all posts for a locale, sorted newest-first.
export function getAllPosts(locale = 'en') {
  return getAllSlugs()
    .map((slug) => getPost(locale, slug))
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt) - new Date(a.frontmatter.publishedAt)
    )
}