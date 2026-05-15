# Navigators — setup guide

The navigator-private site lives at `navigators.dodolearning.com`,
served from its own repo (`../DL_NAVIGATORS`) on a separate
Cloudflare Pages project. Code, content, and CI are independent
from the marketing site this repo serves — see that repo's
`CLAUDE.md` for its own conventions.

This guide is the one-time setup runbook (Pages project, R2
bucket, Cloudflare Access app). For per-phase content uploads,
see `DL_NAVIGATORS/CLAUDE.md`.

---

## 1. One-time setup

You only do these steps once.

### 1.1 GitHub repo

1. Create a new GitHub repo: **`aiyoweiah/DL_NAVIGATORS`** (private).
   Empty — no README, no .gitignore, no license. Claude will commit
   the scaffold from your local folder and push.
2. Confirm the repo is reachable at
   `https://github.com/aiyoweiah/DL_NAVIGATORS`.

### 1.2 Cloudflare Pages — new project

In the Cloudflare dashboard:

1. **Workers & Pages → Create → Pages → Connect to Git**.
2. Pick the new `DL_NAVIGATORS` repo. Authorise GitHub access if
   prompted.
3. Project name: `dodolearning-navigators` (Cloudflare uses this in
   the default `*.pages.dev` URL — the custom domain will mask it).
4. Production branch: `main`.
5. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**.
   - Build command: `npm run build`.
   - Build output directory: `out`.
   - Root directory: leave blank.
6. Environment variables: **none required.** Unlike the marketing
   site, the navigator site does NOT use `NEXT_PUBLIC_SITE` — the
   subdomain itself is the deployment target, no per-host gating.
7. Click **Save and Deploy**. The first build takes 2–4 minutes.
8. Once green, visit the auto-generated `*.pages.dev` URL and
   confirm the placeholder home loads. (At this stage the site is
   public — Access gating is added in step 1.4.)

### 1.3 Custom domain

In the Pages project → **Custom domains → Set up a custom domain**:

1. Enter `navigators.dodolearning.com`.
2. Cloudflare auto-creates the CNAME record in the
   `dodolearning.com` zone for you (since the zone is on the same
   account).
3. Wait for the green checkmark (usually under a minute).
4. Visit `https://navigators.dodolearning.com` — the placeholder
   home should load. (Still public until Access is added.)

### 1.4 Cloudflare Access — new application

In **Zero Trust → Access → Applications → Add an application →
Self-hosted**:

| Field | Value |
|---|---|
| Application name | `DODO Navigators` |
| Session duration | `1 month` (or whatever feels right — same as audiobooks) |
| Application domain | `navigators.dodolearning.com` `*` |

**Add policies → Add a policy**:

| Field | Value |
|---|---|
| Policy name | `Allowed navigators` |
| Action | `Allow` |
| Include | `Emails` → paste the list of allowed addresses |

Save. Now visit `https://navigators.dodolearning.com` in a
logged-out browser — Access should intercept and prompt for an
email, send a one-time PIN, and let you in.

> **Why a separate Access app from audiobooks?** Different
> audiences. Audiobook listeners are typically families;
> navigators are teaching staff. Independent allowlists, clean
> removal — fire a navigator, no risk to audiobook access.

### 1.5 R2 bucket

In the Cloudflare dashboard:

1. **R2 → Create bucket** → name it **`dodo-navigators`**. Default
   settings, no public access toggle (we want it private).
2. Open the bucket → **Settings → Custom Domains → Connect Domain**
   → enter `assets.navigators.dodolearning.com`. Cloudflare
   auto-creates the DNS record.
3. Wait for the green checkmark.

The bucket is now reachable at
`https://assets.navigators.dodolearning.com/<path>` — but it's
also publicly accessible until step 1.6 gates it.

### 1.6 Extend Access to the assets subdomain

Same Access app, add a second domain:

1. Zero Trust → Access → Applications → **DODO Navigators** → Edit.
2. **Application domain** section → **Add a domain**.
3. Add `assets.navigators.dodolearning.com` `*`.
4. Save.

Now both the website pages and the asset URLs require the same
login. The browser sends the Access cookie automatically when the
site references images at `assets.navigators.dodolearning.com/...`,
so PNG/PDF requests "just work" for logged-in navigators and 401
for everyone else.

### 1.7 Smoke test

In a clean (incognito) browser:

1. Visit `https://navigators.dodolearning.com` → Access login appears.
2. Enter your email → receive PIN by email → enter PIN → land on
   the placeholder home page. Build marker visible:
   `navigators-shell-v0`.
3. Drop a test PNG into the R2 bucket via the dashboard. Visit
   `https://assets.navigators.dodolearning.com/<filename>.png` →
   the same Access cookie carries you through and the file loads.
4. Open a new incognito window → visit the same URL → Access
   login appears (proves the gate is working from a cold session).

If all four pass, the chain is verified end-to-end. Real content
extraction can begin.

---

## 2. Adding a phase of content

Per-phase. Run after DLCW emits a phase's outputs.

> Detailed runbook: `../DL_NAVIGATORS/CLAUDE.md` and `…/README.md`.
> The short version is below.

### 2.1 Run the extraction script

In `DL_NAVIGATORS/`:

```bash
npm run extract -- --project lit_L1_MudTrilogy --phase 1
```

This produces:

- Text files under `content/programs/<project>/<phase>/...` —
  ready to commit.
- Binary files under `dist/r2/programs/<project>/<phase>/...` —
  ready to upload.

### 2.2 Upload binaries to R2

Two options:

**Drag-drop:** R2 dashboard → `dodo-navigators` → navigate to
the `programs/<project>/<phase>/` path (create folders as needed)
→ drop the contents of `dist/r2/programs/<project>/<phase>/` in.

**CLI:** install `wrangler` once (`npm install -g wrangler`) and
authenticate (`wrangler login`), then from `DL_NAVIGATORS/`:

```bash
wrangler r2 object put dodo-navigators/programs/lit_L1_MudTrilogy/phase1/ \
  --recursive --file dist/r2/programs/lit_L1_MudTrilogy/phase1/
```

(Exact wrangler invocation may vary by version — check
`wrangler r2 object --help` if the above errors.)

### 2.3 Commit the text + push

```bash
cd DL_NAVIGATORS
git add content/
git commit -m "Add lit_L1_MudTrilogy phase 1 content"
git push
```

Cloudflare Pages auto-builds on push. Watch the deployment in the
dashboard (usually green in 2–3 minutes) then hard-refresh the
site to confirm the new content appears.

### 2.4 If something looks wrong

- **Image 404s on the gallery.** Check the R2 path matches what
  the site expects: `assets.navigators.dodolearning.com/programs/<project>/<phase>/source/<book>/p<NNN>.png`.
- **Cross-ref click 404s.** Check the lesson HTML's `ocr-anchor`
  spans have both `data-book` and `data-page` attributes (they
  should — the DLCW workflow change shipped 2026-05-14).
- **Build fails on Pages.** Read the Pages build log; usually a
  Node version mismatch or a missing dependency. Reproduce locally
  with `npm run build`.

---

## 3. Removing access for a navigator

Cloudflare Zero Trust → Access → Applications → **DODO
Navigators** → Edit → **Allowed navigators** policy → remove the
email from the Include list → Save. Their existing session is
revoked the next time their browser checks in (usually within a
few minutes).

---

## 4. Adding a navigator

Same path: Edit the **Allowed navigators** policy → paste their
email at the bottom of the Include list → Save. Tell them to
check their inbox (and spam folder — Cloudflare PIN emails
sometimes land there on first delivery).
