// lib/audiobooks.js
//
// Server-only audiobook content loader — uses Node fs/path at build time.
// Safe in output: 'export' because all calls happen during static generation.
// NEVER import this in a 'use client' file.
//
// Mirrors lib/blog.js: gray-matter frontmatter + remark → HTML for the
// long-form description, plus a structured `chapters` array straight from
// the frontmatter (no remark pass on chapters — they're plain data).
//
// Content lives at content/en/audiobooks/*.md. EN-only by design — the
// audiobooks themselves are English; only the page chrome is bilingual.

import fs    from 'fs'
import path  from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm  from 'remark-gfm'
import remarkHtml from 'remark-html'

const AUDIOBOOK_DIR = path.join(process.cwd(), 'content', 'en', 'audiobooks')

function exists(filePath) {
  try { fs.accessSync(filePath); return true }
  catch { return false }
}

async function mdToHtml(source) {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(source)
  return String(result)
}

// All audiobook slugs from content/en/audiobooks/.
export function getAllAudiobookSlugs() {
  if (!exists(AUDIOBOOK_DIR)) return []
  return fs
    .readdirSync(AUDIOBOOK_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

// Returns one audiobook. `withHtml: false` skips the remark pass for the
// library page (faster — we only need the cover/title/duration there).
export async function getAudiobook(slug, { withHtml = true } = {}) {
  const filePath = path.join(AUDIOBOOK_DIR, `${slug}.md`)
  if (!exists(filePath)) return null

  const raw                   = fs.readFileSync(filePath, 'utf8')
  const { data: fm, content } = matter(raw)

  return {
    slug,
    descriptionHtml: withHtml ? await mdToHtml(content) : '',
    frontmatter: {
      title:       fm.title       ?? '',
      author:      fm.author      ?? '',
      narrator:    fm.narrator    ?? '',
      cover:       fm.cover       ?? '',          // path under /public or a full URL
      durationSec: fm.durationSec ?? 0,           // sum of all chapter durations
      summary:     fm.summary     ?? '',          // one-line tagline for cards
      publishedAt: fm.publishedAt ?? '',
      chapters:    Array.isArray(fm.chapters) ? fm.chapters : [],
      // Each chapter: { title, durationSec, audioUrl, startSec? }
      // audioUrl is a fully-qualified URL on the R2 custom domain
      // (e.g. https://audio.dodolearning.com/<slug>/ch01.mp3).
    },
  }
}

// All audiobooks, sorted newest-first. Used by the library grid.
// Skips the description-HTML pass for performance.
export async function getAllAudiobooks() {
  const slugs = getAllAudiobookSlugs()
  const books = await Promise.all(
    slugs.map((slug) => getAudiobook(slug, { withHtml: false }))
  )
  return books
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt) - new Date(a.frontmatter.publishedAt)
    )
}
