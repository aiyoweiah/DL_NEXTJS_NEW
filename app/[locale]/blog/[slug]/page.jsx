// app/[locale]/blog/[slug]/page.jsx
//
// Individual blog post page.
// MDX content lives in content/{locale}/blog/{slug}.mdx
// Falls back to EN if ZH file is absent (handled by lib/blog.js).
//
// Rendering: MDX → HTML via remark at build time → dangerouslySetInnerHTML
// No next-mdx-remote — avoids React version conflict with Next.js 16/Turbopack.

import Link         from 'next/link'
import { notFound } from 'next/navigation'

import { isValidLocale, LOCALES } from '@/lib/i18n'
import { buildPostMetadata }       from '@/lib/metadata'
import { articleSchema }           from '@/lib/schema'
import { getAllSlugs, getPost, mdxToHtml } from '@/lib/blog'

import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge          from '@/components/ui/Badge'

// ── Static params ─────────────────────────────────────────────
export function generateStaticParams() {
  const slugs = getAllSlugs()
  return LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

// ── Metadata ──────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { locale, slug } = await params
  const post = getPost(locale, slug)
  if (!post) return {}
  return buildPostMetadata(post.frontmatter, locale)
}

// ── UI copy ───────────────────────────────────────────────────
const UI = {
  en: {
    backLabel:      '← All articles',
    fallbackNotice: 'This article is available in English only.',
    charterEyebrow: 'Charter Enrollment',
    charterHeading: 'Ready to apply this to your child specifically?',
    charterBody:    'The diagnostic consultation is 20 minutes. A Navigator — not a sales call. We find out exactly where your child is and show you what The Loop looks like for a student exactly like yours.',
    charterCta:     'Book Your Consultation',
  },
  zh: {
    backLabel:      '← 所有文章',
    fallbackNotice: '本文暂无中文版本，以下为英文原文。',
    charterEyebrow: 'Charter Enrollment',
    charterHeading: '准备好将这些应用到您孩子身上了吗？',
    charterBody:    '诊断咨询只需20分钟。接待您的是Navigator，不是销售——我们确切地找出您孩子的位置，并展示The Loop对于和您孩子情况一样的学生意味着什么。',
    charterCta:     '预约咨询',
  },
}

// ── Page ──────────────────────────────────────────────────────
export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params

  if (!isValidLocale(locale)) notFound()

  const post = getPost(locale, slug)
  if (!post) notFound()

  const { frontmatter: fm, source, isFallback } = post
  const ui = UI[locale] ?? UI.en

  // Convert MDX → HTML at build time
  const contentHtml = await mdxToHtml(source)

  const dateDisplay = fm.publishedAt
    ? new Date(fm.publishedAt).toLocaleDateString(
        locale === 'zh' ? 'zh-Hans-CN' : 'en-CA',
        { year: 'numeric', month: 'long', day: 'numeric' }
      )
    : null

  const initials = fm.author
    ? fm.author.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : 'DL'

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title:       fm.title,
              description: fm.description,
              slug,
              publishedAt: fm.publishedAt,
              updatedAt:   fm.updatedAt,
              authors:     fm.author ? [fm.author] : undefined,
              ogImage:     fm.ogImage ?? null,
            })
          ),
        }}
      />

      {/* ── 1. Article Header ────────────────────────────── */}
      <SectionWrapper white>
        <div className="py-16 md:py-24 max-w-3xl">

          <Link
            href={`/${locale}/blog`}
            className="inline-block mb-8 text-sm font-medium"
            style={{ color: '#b7b5fe' }}
          >
            {ui.backLabel}
          </Link>

          {isFallback && locale === 'zh' && (
            <div
              className="mb-8 px-4 py-3 rounded-lg text-sm"
              style={{
                background: 'rgba(183,181,254,0.1)',
                border:     '1px solid rgba(183,181,254,0.25)',
                color:      '#7c79e8',
              }}
            >
              {ui.fallbackNotice}
            </div>
          )}

          {fm.category && (
            <Badge className="mb-6">{fm.category}</Badge>
          )}

          <h1 id="post-heading" className="mb-6" style={{ color: '#0E0E12' }}>
            {fm.title}
          </h1>

          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-6"
            style={{ borderTop: '1px solid rgba(14,14,18,0.1)' }}
          >
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{
                width: '36px', height: '36px',
                backgroundColor: '#0E0E12',
                color: '#b7b5fe', fontSize: '12px', fontWeight: 600,
              }}
              aria-hidden="true"
            >
              {initials}
            </div>

            <div>
              <span className="text-sm font-semibold" style={{ color: '#0E0E12' }}>
                {fm.author}
              </span>
              {fm.authorRole && (
                <span className="ml-2 text-sm" style={{ color: '#7B8494' }}>
                  · {fm.authorRole}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-sm ml-auto" style={{ color: '#7B8494' }}>
              {fm.readTime && <span>{fm.readTime}</span>}
              {dateDisplay && fm.readTime && <span aria-hidden="true">·</span>}
              {dateDisplay && <time dateTime={fm.publishedAt}>{dateDisplay}</time>}
            </div>
          </div>

        </div>
      </SectionWrapper>

      {/* ── 2. Article Body ──────────────────────────────── */}
      <section style={{ backgroundColor: '#ffffff' }} aria-labelledby="post-heading">
        <div className="container-section" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
          <article
            className="max-w-3xl prose-dodo"
            style={{
              '--prose-body':    '#3D4452',
              '--prose-heading': '#0E0E12',
            }}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </section>

      {/* ── 3. Author Card ───────────────────────────────── */}
      <SectionWrapper>
        <div
          className="py-10 max-w-3xl"
          style={{ borderTop: '1px solid rgba(14,14,18,0.1)' }}
        >
          <div className="flex items-center gap-5">
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{
                width: '56px', height: '56px',
                backgroundColor: 'rgba(183,181,254,0.12)',
                color: '#b7b5fe', fontSize: '16px', fontWeight: 600,
                border: '1.5px solid rgba(183,181,254,0.3)',
              }}
              aria-hidden="true"
            >
              {initials}
            </div>
            <div>
              <p className="font-semibold" style={{ color: '#0E0E12' }}>{fm.author}</p>
              {fm.authorRole && (
                <p className="text-sm mt-0.5" style={{ color: '#7B8494' }}>
                  {fm.authorRole} · DODO Learning
                </p>
              )}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── 4. Charter CTA ───────────────────────────────── */}
      <SectionWrapper darker>
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-10"
          style={{ paddingTop: 'var(--section-md)', paddingBottom: 'var(--section-md)' }}
        >
          <div className="max-w-xl">
            <p className="eyebrow mb-4" style={{ color: 'rgba(183,181,254,0.6)' }}>
              {ui.charterEyebrow}
            </p>
            <h2 className="mb-5">{ui.charterHeading}</h2>
            <p className="text-lg leading-relaxed" style={{ color: '#94A3B8' }}>
              {ui.charterBody}
            </p>
          </div>
          <div className="shrink-0">
            <Link href={`/${locale}/consult`} className="btn btn-charter text-base px-8 py-4">
              {ui.charterCta}
            </Link>
          </div>
        </div>
      </SectionWrapper>

    </>
  )
}