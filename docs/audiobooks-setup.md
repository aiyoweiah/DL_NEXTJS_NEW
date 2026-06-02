# Audiobooks — setup guide

This page lives at `/[locale]/audiobooks` and `/[locale]/audiobooks/[slug]`.
It's served on **dodolearning.com** (Cloudflare Pages) and gated at runtime
by the **AudiobooksGate access-code component**. *(Single host since
2026-06-02 — the former Vercel / dodoletterhouse.com build is retired; that
domain now 301-forwards to dodolearning.com. The old build-time
`NEXT_PUBLIC_SITE` guard was removed at the same time — no env var needed.)*

---

## 1. One-time setup

You only do these steps once.

### 1.1 Create the R2 bucket

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

**Build time:** nothing special — the audiobooks routes render in the normal
Cloudflare Pages build. *(The old `NEXT_PUBLIC_SITE !== 'dodolearning'` →
`notFound()` build guard was removed 2026-06-02 when the second host
(dodoletterhouse.com / Vercel) went away.)*

**Runtime — page gate.** The library and player are wrapped by the
`AudiobooksGate` component, which requires an access code before the titles
or player are revealed.

**Runtime — media.** Audio and download URLs point at the audio host
(`audio.dodolearning.com`), which enforces its own access control.

> ⚠️ Verify the exact runtime gating against the live Cloudflare config
> before relying on it. **Cloudflare Access in front of the `/audiobooks`
> HTML pages was removed** (see the note in `public/_redirects`); the
> access-code `AudiobooksGate` and the audio host's protection are what
> remain.

---

## 4. Local development

Just run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000/en/audiobooks/`. The page renders (no env var
needed — the build guard was removed). Audio file URLs may not load locally
depending on the audio host's access control; for local-only testing, swap
the `audioUrl` in the sample content file to a publicly-hosted test MP3.

---

## 5. Removing access for a user

> ⚠️ **May be stale** — this assumes Cloudflare Access still gates the pages,
> but Access was removed from `/audiobooks` (see §3). If the current gate is
> the access-code `AudiobooksGate`, "removing access" means rotating the
> shared code. Verify against the live config before relying on the steps
> below.

Cloudflare dashboard → Zero Trust → Access → Applications → DODO
Audiobooks → Policies → Allowed listeners → remove their email from the
Include list and **Save**. Their existing session is revoked the next time
their browser checks in (usually within a few minutes; sooner if they
close the tab).
