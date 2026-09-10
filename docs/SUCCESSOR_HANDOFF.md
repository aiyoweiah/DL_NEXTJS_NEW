# DODO Learning — Successor Handoff

**Rewritten:** 2026-09-03 (docs restructure) · **refreshed 2026-09-09 (session close)** · one page of live pointers. The old
100 KB newest-first history is preserved verbatim at
[`_archive/successor-handoff-2026-09-02.md`](_archive/successor-handoff-2026-09-02.md) —
go there for the deep operational narratives (consult-form backend + env vars, CJK
pipeline corrections, video pipeline, PFP apply log, Little DODO cohesion pass).

## Where things stand (2026-09-09, session close — Windows hub)

- **Site:** bilingual (EN/ZH), static export on Cloudflare Pages, `main` = the last push of
  2026-09-09. **Fifteen guard passes on every build** — the fifteenth, `check-canon`
  (D106), runs first in `prebuild` and **fails on any retired term** listed in
  `translation/dodo-glossary.json → retired_terms`. Any new ZH copy may need
  `npm run fonts:cjk` before the CJK guard passes (D97 keeps WenKai).
- **The 2026-09-09 GEO audit is executed** (`geo-audit-2026-09.md`, three updates):
  D102 founding year 2020 · D103 "degrees" (16 spots) · D104 city schema `areaServed`
  only · D105 `sameAs` YouTube + footer link · D106 canon guard (34 first-run catches
  fixed) · D107 **IndexNow live** — `npm run indexnow` after every deploy (first
  submission accepted 202) · D108 machine layer (`dateModified`, founder as
  author/reviewedBy, `alternateName` 都学书院 + DODO Learning Canada, locale-aware
  Course/FAQ/credentials/city nodes, S1/S2/S3 metadata) · **D109 OG card = candidate C**
  (light, centred, crop-safe) as `og-default.png` / `og-zh.png`, Organization logo = the
  square mark · frozen register F1–F6, F9–F11, F13 applied (research base now in ZH;
  **F12 held**) · M1 blog canonical fixed.
- **GEO tooling (Windows user scope):** `geo-skills` (16 `geo-*` + 5 agents),
  `audit-website-aeo` / `audit-content` / `improve-aeo-geo`, `best-aeo-skill`,
  `writing-dna-skill` + `lieflat-less-ai-tone` (the future EN→ZH path; `dodo-content-writer`
  still says DeepSeek). `claude-seo` recommended as a plugin when Bing WMT work starts.
  The Mac has none of these — see the 2026-09-09 session-close handoff for the copy commands.
- **Blog:** the owner chose **Level 2 automation** (scheduled draft queue behind a human
  gate) as the target — `blog-automation-level2-method.md`, **awaiting approval to build**;
  the blog decision itself (R3, option D recommended) is still the owner's.
- **Every open call is in one place:** [`ADMIN_RULINGS.md`](ADMIN_RULINGS.md) — A
  (unblocks drafted work: blog, `/assessment`, F12, visible FAQ blocks, citability pass,
  alts), B (the seven Level 2 decisions + XHS CTA vs D29), C (owner-side accounts and
  assets: Bing WMT, Search Console, `sameAs` URLs, Wikidata, media, bios, D13 leftovers,
  the logo lockup question, the 2026-09-24 tracker).
- **Next moves, in order:** the admin rules on `ADMIN_RULINGS.md` § A1 and § B → the
  blog change ships as its own commit → Level 2 week-1 scaffolding → Bing WMT verification
  → the citability copy pass → tracker capture 2026-09-24.

## Read in this order

1. [`README.md`](README.md) — the map of every doc and the guard commands.
2. [`completion-plan.md`](completion-plan.md) — the one work queue (waves).
3. [`ADMIN_RULINGS.md`](ADMIN_RULINGS.md) — every open call waiting on the owner, once.
4. [`decision-index.md`](decision-index.md) — status of every D1–D109; check it before
   trusting any rule you read anywhere.
5. The guides: [`../.interface-design/system.md`](../.interface-design/system.md)
   (visual, v7.0) · [`../translation/BRAND_CONTENT_GUIDE.md`](../translation/BRAND_CONTENT_GUIDE.md)
   (content, v6.0, + `.zh.md` mirror).
6. [`architecture-cohesion-proposal.md`](architecture-cohesion-proposal.md) — **§4
   before measuring anything**; §1 before sweeping anything.

## Open rulings (owner)

**All open calls are consolidated in [`ADMIN_RULINGS.md`](ADMIN_RULINGS.md) (2026-09-09)** —
§ A unblocks drafted work (blog A1, `/assessment` A2, F12 outcome figures, visible FAQ
blocks, citability pass, image alts); § B the seven Level 2 blog-automation decisions +
XHS CTA vs D29; § C owner-side accounts and assets (Bing WMT, Search Console, `sameAs`
URLs, Wikidata, media, bios, D13 leftovers, the logo lockup question, the 2026-09-24
tracker). `decision-index.md` § Open mirrors the D-numbered ones. The 2026-09-05 short
list (XHS-vs-D29, `/compare` founder embed URL, Ms. Kimberly's bio, WeChat handle, D13
leftovers) is carried there as B8, C6, C7 and C8 — nothing was dropped.

## Operational facts that bite

- **Repo:** `aiyoweiah/DL_NEXTJS_NEW` → Cloudflare Pages `dl-nextjs-new` →
  dodolearning.com, from `main`. `output: 'export'` — **Next API routes are dead**;
  server endpoints live in `functions/` (Pages Functions).
- **`LARK_APP_ID`/`LARK_APP_SECRET` on CF Pages are shared with Claude_Lark's cron —
  rotating in one place silently breaks the other.** Full env-var table: archive
  § 2026-06-28.
- **Apply-gate:** live copy changes are proposed in chat and applied only on an
  explicit "apply". **Bilingual parity** on every copy change.
- **Instruments:** `npm run conformance` (reports, never fails — read its output) ·
  `npm run type-floor` (rem-aware). Re-run before quoting any number; write the
  predicted figure down first. The three standing measurement lessons: a number that
  improves can be a symptom; a guard can be unfireable; "referenced nowhere" is not
  "dead" (loop report 2026-09-02).
- **Sync:** one `git fetch` per session (SessionStart hook); re-fetch only right
  before a push. Cross-machine protocol: `F:\PC-Documents\DLCW\_handoffs\COORDINATION_PROTOCOL.md`.
- **The canon guard fails builds on words** (`check-canon`, first in `prebuild`, D106): a
  red build naming a retired term means apply the ruling that retired it — never edit
  `translation/dodo-glossary.json → retired_terms` outside a ruling's commit.
  `npm run check:canon -- --report` lists hits without failing.
- **IndexNow runs after the deploy is live, never before** (`npm run indexnow`; Bing fetches
  the key file at the site root). **New ZH copy → `npm run fonts:cjk`** before the build,
  and commit the regenerated `public/fonts/cjk/*`, `styles/cjk-fonts.css`, `lib/cjk-preload.json`.
- **`CONTENT_MODIFIED` in `lib/schema.js`** is the machine-readable freshness date — bump it
  in any content cascade. The schema builders take the locale (`courseSchema(locale)` etc.).
