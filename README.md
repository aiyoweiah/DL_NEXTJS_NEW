# DL_NEXTJS_NEW

Bilingual (EN + ZH) Next.js static site, deployed to **dodolearning.com** via **Cloudflare Pages** (`dl-nextjs-new` project).

> Single host as of 2026-06-02. The former `dodoletterhouse.com` / Vercel deploy is retired — that domain now 301-forwards to dodolearning.com at the Cloudflare edge (`ops.dodoletterhouse.com` → the `/ops` tools). See `docs/SUCCESSOR_HANDOFF.md`.

Builds ~62 pages from one source tree via `output: 'export'`. No server runtime in production.

## Start here

**Picking up the project?** Read [`docs/SUCCESSOR_HANDOFF.md`](docs/SUCCESSOR_HANDOFF.md) first — architecture, brand voice, content workflow, what's pending.

**Editing content?** Read [`translation/BRAND_CONTENT_GUIDE.md`](translation/BRAND_CONTENT_GUIDE.md) before touching any user-visible copy.

## Dev

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to ./out
node scripts/content-audit.mjs   # EN/ZH parity + anti-dictionary check
```

## Where things live

| Path | What |
|---|---|
| `content/marketing.{en,zh}.js` | 10 marketing pages, one named export per page |
| `content/faq.js` | 50 Q&As, bilingual nested |
| `content/cities.js` | 20 cities (6 rich + 14 compact), bilingual nested |
| `content/en/blog/` · `content/zh/blog/` | MDX blog posts |
| `content/en/audiobooks/` | EN-only audiobook markdown |
| `app/[locale]/` | Marketing routes |
| `app/ops/` | Internal PDF generators (PIN-gated, noindex) |
| `lib/` | Content loaders, schema, i18n |
| `docs/` | Internal documentation (not deployed) |
| `translation/` | Brand guide + DeepSeek translation workflow |

## Sync rules

The site is also edited via StackBlitz on GitHub. Always check `git status -sb` before editing. Full rules in `../CLAUDE.md`.
