# Audiobooks — setup guide

This page lives at `/[locale]/audiobooks` and `/[locale]/audiobooks/[slug]`.
It's served on **dodolearning.com** (Cloudflare Pages) and gated by the
**AudiobooksGate access-code component**. A build-time guard
(`NEXT_PUBLIC_SITE === 'dodolearning'`) renders the route only on the
production build. *(Single host since 2026-06-02 — the former Vercel /
dodoletterhouse.com build is retired; that domain now 301-forwards to
dodolearning.com.)*

---

## 1. One-time setup

You only do these steps once.

### 1.1 Cloudflare Pages — env var

In the Cloudflare dashboard:

1. Workers & Pages → your dodolearning Pages project → **Settings → Environment
   variables**.
2. Add `NEXT_PUBLIC_SITE=dodolearning` to both **Production** and **Preview**.

This is what flips the audiobooks route on at build time. Without it, the
page renders as a 404. **Keep `NEXT_PUBLIC_SITE=dodolearning` set** on the
Pages project, or the library 404s. *(This guard is vestigial — it once hid
the library on the retired Vercel build; with a single host it can be
simplified away later.)*

### 1.3 Create the R2 bucket

In the Cloudflare dashboard:

1. **R2** → **Create bucket** → name it `dodo-audiobooks`. Default settings.
2. Open the bucket → **Settings → Custom Domains** → add
   `audio.dodolearning.com`. Cloudflare will create the necessary DNS record
   in the `dodolearning.com` zone for you.
3. Wait for the green checkmark (usually under a minute).

The bucket is now reachable at `https://audio.dodolearning.com/<path>`.

### 1.4 Create the Cloudflare Access application

In the Cloudflare dashboard → **Zero Trust → Access → Applications →
Add an application → Self-hosted**:

| Field | Value |
|---|---|
| Application name | `DODO Audiobooks` |
| Session duration | `1 month` (or whatever feels right) |
| Application domain | `dodolearning.com` `/audiobooks*` |
| Additional domains | `dodolearning.com` `/en/audiobooks*` |
|                    | `dodolearning.com` `/zh/audiobooks*` |
|                    | `audio.dodolearning.com` `*` |

**Why all three website paths matter.** The bare `/audiobooks` path
redirects to the locale-prefixed URL (`/en/audiobooks/`) via
`public/_redirects`. If only `/audiobooks*` is gated, the redirect lands
the user on `/en/audiobooks/` — which is **unprotected** — and they see
the library without ever logging in. Gating all three paths (bare,
`/en/...`, `/zh/...`) plugs that hole. The same Allow policy applies to
all destinations on the app; you only configure the email list once.

Then **Policies → Add a policy**:

| Field | Value |
|---|---|
| Policy name | `Allowed listeners` |
| Action | `Allow` |
| Include | `Emails` → paste the list of allowed addresses |

That's it. The same login unlocks both the website pages and the audio file
URLs. No signed URLs, no Worker code.

**To add a new user later:** edit the policy and paste their email at the
bottom of the Include list.

---

## 2. Adding a new audiobook

Per book, you do these three things:

### 2.1 Upload the MP3s to R2

1. Cloudflare dashboard → R2 → `dodo-audiobooks` → **Upload**.
2. Create a folder named after the slug (e.g. `the-little-prince/`) and
   drop the chapter files inside:
   ```
   the-little-prince/
     ch01.mp3
     ch02.mp3
     ...
   ```
   File names can be anything — `chapter-01.mp3`, `01-intro.mp3` — but keep
   them URL-safe (lowercase, hyphens, no spaces).

### 2.2 Add a cover image

Put it in the repo at `public/audiobooks/covers/<slug>.jpg`. Square (1:1) at
800×800 or larger looks best.

### 2.3 Create the content file

Add `content/en/audiobooks/<slug>.md` with this frontmatter:

```markdown
---
title: "The Little Prince"
author: "Antoine de Saint-Exupéry"
narrator: "Sarah Chen"
cover: "/audiobooks/covers/the-little-prince.jpg"
summary: "A short paragraph for the library card."
durationSec: 7320              # sum of all chapter durations
publishedAt: "2026-05-11"
chapters:
  - title: "Chapter 1 — The Drawing"
    durationSec: 240
    audioUrl: "https://audio.dodolearning.com/the-little-prince/ch01.mp3"
  - title: "Chapter 2 — The Asteroid B-612"
    durationSec: 420
    audioUrl: "https://audio.dodolearning.com/the-little-prince/ch02.mp3"
---

Optional long-form description. Renders as HTML on the detail page —
**bold**, _italic_, lists, links all work.
```

Push to GitHub. Cloudflare Pages rebuilds and the new book appears in the
library on dodolearning.com.

---

## 3. How the gating works

Two independent layers protect the audiobooks:

**Layer 1 — Build-time route exclusion.** Each page file starts with:

```js
if (process.env.NEXT_PUBLIC_SITE !== 'dodolearning') notFound()
```

`NEXT_PUBLIC_SITE` is inlined at build time. With any value other than
`dodolearning`, every audiobook route bakes a 404 HTML; the production
Cloudflare Pages build sets `dodolearning` and renders normally. *(This
layer's original purpose — keeping audiobook HTML off the retired Vercel /
dodoletterhouse build — is now moot with a single host; it remains a build
guard. See the note in `app/[locale]/audiobooks/page.jsx`.)*

**Layer 2 — Cloudflare Access.** Sits in front of:
  - `dodolearning.com/audiobooks/*` — the HTML pages
  - `audio.dodolearning.com/*` — the MP3 files

Unauthenticated visitors are redirected to a Cloudflare-hosted login. They
enter their email; Cloudflare sends a one-time code; they paste it; the
Access session cookie is set for the duration you configured. From then on
both the pages and the file URLs load transparently for that user.

When the player calls `<audio src="https://audio.dodolearning.com/...">`,
the browser sends the Access cookie alongside the request and the file
streams. Download links work the same way — `<a download>` carries the
cookie, the browser saves the file.

---

## 4. Local development

You can build the audiobooks page locally by setting:

```bash
# Windows PowerShell
$env:NEXT_PUBLIC_SITE = 'dodolearning'
npm run dev
```

Open `http://localhost:3000/en/audiobooks/`. The page renders, but the
audio file URLs will 401 against Cloudflare Access since you're not
authenticated. For local-only testing, swap the `audioUrl` in the sample
content file to a publicly-hosted test MP3.

---

## 5. Removing access for a user

Cloudflare dashboard → Zero Trust → Access → Applications → DODO
Audiobooks → Policies → Allowed listeners → remove their email from the
Include list and **Save**. Their existing session is revoked the next time
their browser checks in (usually within a few minutes; sooner if they
close the tab).
