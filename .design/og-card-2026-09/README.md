# OG card candidates — R7 (2026-09-09)

**Why:** `public/og-default.png` is a uniform `#0E0E12` rectangle (1200 × 630, committed 2026-03-20 in `83830ea`); it ships as `og:image` / `twitter:image` on all 120 routes, as `Organization.logo`, and as the fallback `Article.image` (audit M3). The owner confirmed it is a placeholder (ruling R7).

**How these were made:** rendered headless from the built site served locally, so every asset is the site's own — `public/logo.svg` / `logo-dark.svg`, the LXGW WenKai GB subset from `public/fonts/cjk/` (D62) via `styles/cjk-fonts.css`, Source Sans 3 (D59). 1200 × 630 at 1×. Renderer: a scratch script (not committed) using the same `puppeteer-core` + Chrome path detection as `scripts/check-zero-size.mjs`.

**Copy on the card** is limited to locked strings — the wordmark, the §16 first-mention pair "DODO Learning · 都学书院" as an eyebrow with the lead-in quote (D54), the D36 tagline per locale, and the domain. No new copy was authored.

| File | Locale | Ground |
|---|---|---|
| `og-en-light.png` | EN | Whisper `#F5F5FF` |
| `og-zh-light.png` | ZH | Whisper |
| `og-en-dark.png` | EN | Void Black `#0E0E12` |
| `og-zh-dark.png` | ZH | Void Black |

**Recommendation:** the light pair. Whisper is the site's ground, and link cards are rendered on both white and dark chat UIs where a dark card reads as a black block — the failure this replaces.

**Wiring after the pick** — rows H1–H4 in `content-review/05-geo-rulings-2026-09-09.md`: overwrite `og-default.png` with the EN pick (keeps cached external references valid), add `og-zh.png`, per-locale `OG_IMAGE_DEFAULT` in `lib/metadata.js`, and `Organization.logo` → the square `web-app-manifest-512x512.png`.

If the owner wants a different composition (photograph from the painted hero series, a per-page variant for the top six routes — `workflow.md:241`), that is a design pass under `.interface-design/system.md`, not a re-render of these.


---

**Ruled 2026-09-09 (owner): candidate C — light, centred.** Shipped as `public/og-default.png` (EN) and `public/og-zh.png` (ZH); `Organization.logo` → the square 512 px mark; per-locale `OG_IMAGE_DEFAULT` in `lib/metadata.js`; Article fallback image per locale. Decision D109. The other four candidates stay here for provenance.
