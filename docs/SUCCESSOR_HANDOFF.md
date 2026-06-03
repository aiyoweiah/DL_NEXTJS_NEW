# DODO Learning — Successor Handoff

**Authored:** 2026-05-17 (end of session)
**Last updated:** 2026-06-02 — funnel swap (v6.0): Watch Demo soft-close, consult firm-close, duplicate CTA bands removed, assessment reframed (consult-before-assess), CTA labels standardized, ELA Program / DODO Method renames. **Same day: Navbar ZH refresh (D34)** — ZH side adopts descriptive forms: `DODO 教学系统` · `有声书` · `故事` (navbar-only) · `课堂实录`. EN unchanged. Design reference: `.interface-design/system.md`. Commit `140a7a5`. New program **Little DODO** (K–2) briefed — page not yet built (`docs/little-dodo-plan.md`). See "2026-06-02 · Funnel swap (v6.0)" in the decisions log.
**Repo:** `aiyoweiah/DL_NEXTJS_NEW` · deploys to dodolearning.com via **Cloudflare Pages** (`dl-nextjs-new`) from `main`. *(2026-06-02: dodoletterhouse.com / Vercel retired — that domain now 301-forwards to www.dodolearning.com at the Cloudflare edge; `ops.dodoletterhouse.com` → the `/ops` tools. www.dodolearning.com is now a Pages custom domain too. Single host.)*
**Status:** Bilingual site fully shipped. Home + /program + /about rewritten through granular review. Chrome + funnel overhauled (v5 chrome 2026-06-01, v6 funnel 2026-06-02; pre-footer band → soft fallback v6.1, D33). /methodology rewrite in progress. **Open:** Little DODO page build + IA (#20). Tier 2/3 SEO+GEO + business decisions pending.

This doc is **your entry point if you're picking up this work cold.** Read this first. Then:
1. `docs/content-style-decisions.md` — **active style decisions log** (date-stamped, append-only). The most recent voice / vocabulary / architectural decisions live here before they roll into the brand guide.
2. `.interface-design/system.md` — **interface design system** (chrome, funnel ladder, CTA rules, color tokens). Read before touching navbar/footer/CTAs.
3. `docs/workflow.md` Open Decisions table — the running list of pending items.
4. `translation/BRAND_CONTENT_GUIDE.md` — the locked brand truth for content surfaces.

---

## Recent decisions log — 2026-06-02 (Vercel offboarding · single host)

The site is now **Cloudflare Pages only**. dodoletterhouse.com / Vercel is retired. Commits: `b5dcbd7` (repo de-Vercel), + the audiobooks gate removal.

**Infra (done on Cloudflare, verified live):**
- `dodoletterhouse.com` nameservers moved off Vercel (`*.vercel-dns.com`) → Cloudflare (`dalary`/`phil.ns.cloudflare.com`). Zone Active.
- **Cloudflare Redirect Rules** now do all edge redirects (they replaced `vercel.json`):
  - `dodoletterhouse.com/*` → **301** → `https://www.dodolearning.com` + path (preserve query).
  - `ops.dodoletterhouse.com` → `ops.dodolearning.com` (placed *First*, above the catch-all; needed a proxied `ops` A→192.0.2.1 record).
  - `ops.dodolearning.com` → `https://www.dodolearning.com/ops` + path.
- **`www.dodolearning.com` 522 fixed:** the self-referential `www → apex` CNAME was replaced by adding `www` as a custom domain on the `dl-nextjs-new` Pages project (`www → dl-nextjs-new.pages.dev`). www is the canonical host (matches `SITE_URL` in lib/metadata + lib/schema) and now serves + has SSL.

**Repo (done):**
- Deleted `vercel.json`; stripped Vercel from `next.config.js`, `README.md`, `.gitignore`, and docs (workflow, audiobooks-setup/add-new, proxy.example, this file).
- **Removed the `NEXT_PUBLIC_SITE` audiobooks build guard** entirely (it only existed to hide the library on the retired letterhouse build). Audiobooks now render in the normal build; runtime gating is the `AudiobooksGate` access-code component. **No `NEXT_PUBLIC_SITE` env var needed anymore.**
- AssessmentTool PDF footer `www.dodoletterhouse.com` → `都学书院`.

**Vercel teardown — ✅ done (2026-06-02):** the domains were removed from the Vercel `dodoreadinghouse` project and its Git integration disconnected. `main` no longer builds on Vercel; Cloudflare is the sole host.

**Obsolete assets — ✅ deleted (2026-06-02):** the 10 unused hero `.jpg` masters + `@0.5x` variants in `public/` (~2.8 MB, zero code refs) were removed. The site renders only the `.webp` heroes (no `<picture>`/srcset), which remain.

**⚠️ Verify (separate from this migration):** the audiobooks runtime gate. `_redirects` notes Cloudflare Access was removed from `/audiobooks`; confirm whether the access-code `AudiobooksGate` + the audio host's protection are the full story (see `docs/audiobooks-setup.md` §3/§5 caveats).

---

## Recent decisions log — 2026-06-02 (funnel swap · v6.0)

Full detail in `docs/content-style-decisions.md` (D27–D32) and `.interface-design/system.md`. Commit: `140a7a5`.

**Funnel model (the spine of CTA decisions):** `See → Talk → [enroll] → Assess`. **Watch a Demo Class** = soft close on cold/high-traffic surfaces (navbar primary, home hero, /about close). **Book Your Consultation** = firm close on warm surfaces (deep-page bodies, post-video, footer band). The **Lexile assessment is post-enrollment and informational only** — never a lead-capture CTA (consult-before-assess).

- **Navbar (D27, D30, D31, D34):** primary CTA → **Watch Demo Class** (EN) / **课堂实录** (ZH, per D34); hides on /demos; consult demoted to mobile-drawer ghost. Renames **The Program → ELA Program / ELA 课程**, **The Method → DODO Method / DODO 教学系统 (ZH per D34)**. Gated Reading Companion (EN) / **有声书** (ZH per D34) item = lock glyph only; "members" tag now `sr-only`. Navbar `/about` label is **About (EN) / 故事 (ZH, navbar-only per D34)**.
- **CTAs / pages (D28, D30):** one conversion moment per page. Deleted the per-page `charter` bands on /program, /demos, /consult + the duplicate `BookCall` on /demos. Labels standardized (EN "Book Your Consultation" / ZH **预约咨询**, dropping 评估; secondary "See The 16-Week Program").
- **Footer (D28 → D33):** pre-CTA band extracted to client `components/layout/PreCtaBand.jsx`. Now a **soft fallback (v6.1, D33):** suppressed on every page that owns an in-body close; shown soft-first (Watch primary + Consult ghost) only on pages without one (home, /faq, /partners, /assessment). `footer.preCta` reframed soft; `footer.preCtaWatch` removed.
- **Assessment (D29):** `compare.s9` reframed (consultation decides fit, not assessment); footer label `Free Assessment → The Lexile Assessment / Lexile 测评`.
- **Little DODO (D32):** K–2 ELA sub-program briefed; positioning + page plan in `docs/little-dodo-plan.md`. Page build deferred (Task 3).

---

## Recent decisions log — 2026-06-01 (chrome overhaul)

Full detail in `docs/content-style-decisions.md` (D23–D26). Plan: `~/.claude/plans/study-the-current-navbar-sharded-sundae.md`. Commit: `03f1131`.

### Why this happened
The chrome was built additively as pages shipped: 10 links duplicated between navbar and footer, two-tier navbar (primary + secondary), Company column overloaded with 7 links, `/privacy` and `/terms` linked but 404, primary CTA hidden below `md`, all nav/footer copy EN-hardcoded (so `/zh/*` pages rendered Chinese bodies wrapped in English chrome — a silent correctness bug). Audience research said "won't read >25 words in hero" — chrome had to match that.

### Navbar (D23, D25)
- Collapsed two-tier rows → **single flat row of 6**: The Program · The Method · Results · Navigators · Reading Companion 🔒 · About.
- Desktop breakpoint shifted **`lg:1024` → `md:768`** (was a tablet cliff where iPad portrait got the mobile drawer + wrong CTA visible).
- Single primary CTA: **Book Your Consultation** at `lg+`, **Book Consultation** at `md` (compact label preserves footprint headroom). "Watch Demo Class" demoted from desktop bar (still in mobile drawer + footer Resources).
- Mobile drawer order rebuilt: CTAs pinned **at top** (fixes the hidden-CTA bug), primary 6 links, More group (Lexile · Difference · FAQ · Blog · Partners), locale switcher, tagline.
- All labels resolved from `nav.*` namespace in `content/marketing.{en,zh}.js` — passed as `copy` prop from `app/[locale]/layout.jsx`. Chrome now translates.

### Footer (D25, D26)
- 4 columns rebucketed to **Brand · Program · Resources · Serving** (renamed Company → Resources; moved The Difference to Program; absorbed Watch a Class + Book a Consultation into Resources).
- Grid `grid-cols-1 sm:grid-cols-2 md:grid-cols-4` (was `sm:2 lg:4`) — fixes the awkward 2+1+1+1 tablet layout.
- Brand column reserves a **sibling-site cross-link** ("Also from DODO · DODO Coding · Coming soon") gated by `process.env.NEXT_PUBLIC_SHOW_CODING === 'true'`. Hidden until the Coding site ships; flip the env var to reveal.
- Brand-blurb sentence updated to "globally mobile families" (D26, cascades D10 into chrome).
- "Free Assessment" listed under Program with a `Coming soon` badge until `/assessment` is built (reserves the slot, no broken link).
- All labels via `footer.*` namespace; same locale-aware prop pattern.

### Naming (D23, D24)
- **/methodology nav label = "The Method"** (clearer to cold traffic). Page body still names "The Loop" and "The LCS System" per D1/D19.
- **/audiobooks UI label = "Reading Companion" (EN) / "有声书" (ZH, per D34)**. URL unchanged (back-compat, sitemap, hreflang). Cloudflare Access gate unchanged — nav item is a members-area entry point, rendered with lock glyph + "members" / "学员专属" micro-tag.

### New pages
- **`app/[locale]/privacy/page.jsx`** + **`app/[locale]/terms/page.jsx`** — minimal bilingual stubs, K-12 student-data context. Resolves the long-standing broken-link condition in the footer legal strip. Copy lives inline in each page file (legal boilerplate, not marketing) rather than in `marketing.*.js`. Treat as placeholders pending legal review. Listed in `sitemap.js` at priority 0.3.

### Viewport
- Explicit `viewport` export added in `app/layout.jsx` with `maximumScale: 5` (WCAG 1.4.4 — never disables pinch-zoom). Replaces reliance on Next.js defaults.

### Architectural consequence — chrome i18n pattern
`Navbar.jsx` (`'use client'`) and `Footer.jsx` (server) both now accept a `copy` prop. The server layout (`app/[locale]/layout.jsx`) imports both `nav`/`footer` from `marketing.en.js` AND `marketing.zh.js`, resolves the right one by `locale`, passes the object down. Pattern keeps the client Navbar from bundling both locales and matches the per-page convention.

### Carried forward (out of v1 scope)
- **Surface 6** — sticky in-page secondary nav on `/program`, `/results`, `/about` hub pages, linking to absorbed sub-pages (Lexile, The Difference, FAQ etc.). Deferred to v1.5. Without it, demoted items still retain 3 surfaces (footer + in-page links + sitemap).
- **"Live · Navigator-led" CTA micro-label** — drafted but pulled at build time (absolute positioning overlapped page hero). Re-add as a properly-positioned tooltip if first-glance trust at the nav level becomes a stated need.
- **`/audiobooks` index as public marketing landing** — proposed in the plan, rejected by direction ("leave access gate as is"). If the audiobook library ever wants to double as a public value/trust signal, the path is a new public route (e.g. `/library`) that previews the catalog and links to the gated `/audiobooks`.
- **DODO Coding sibling site** — slot is reserved, copy is "Coming soon". When sibling ships, replace `footer.sibling.blurb` with a one-line program description and set `NEXT_PUBLIC_SHOW_CODING=true`.

---

## Recent decisions log — 2026-05-21 (post-original-handoff)

These are the changes since 2026-05-17. Full detail in `docs/content-style-decisions.md` (D1–D9) and `docs/workflow.md` Open Decisions #13–#18.

### Brand-level pivots
- **D1 · LCS surfaces as the named methodology** on dodolearning.com. **The Loop** is preserved as the per-session phrase (`Read → Think → Speak → Write`) inside body copy. Never use "The Loop" as a section header or pillar heading on brand surfaces. Internal Navigator materials may still use "The Loop" as the methodology label.
- **D2 · MCT direct naming permitted in the Write step.** Permitted phrasing: *"the MCT writing arc: Grammar → sentence → paragraph → essay → academic composition"*. Soft-distancing rules still apply elsewhere.
- **D8 · Lexile canon updated** to *"one grade level over two 16-week cycles"* (supersedes prior `187 points / 1.2 grade levels / 16 weeks`). Per-cycle Lexile gains in the 100L–150L range.
- **D9 · ZH 6+1 trait canon updated** to `思考、结构、声音、用词、流畅、规范、呈现` (replacing `想法、结构、声音、用词、句子流畅度、规范性、呈现`). Cascaded across all surfaces. **Note: 思考 now overlaps with The Loop's step-2 label — accepted trade-off.**
- **Audience pivot to global positioning (workflow #16)** — brand guide §04 broadened from "Chinese immigrant parents in NA" → "globally-mobile families". Applied to `/program`, `/about`, `/home` PhotoIntro body0, `/compare`, `llms.txt` + `llms-full.txt`. FAQ city coverage answers + bilingual cognitive-system references kept as authentic operational/factual content.
- **Session length canon** — now "up to 50 minutes, minimum once per week" (was "90 minutes, once per week"). Applied across /program and `llms-full.txt`.

### Voice / style additions
- **D4 · Six ZH-specific voice patterns** added to brand guide §08:
  1. Positioning over poetic abstraction in headlines
  2. Two-sentence punch openers
  3. Avoid combat metaphors (捍卫 → 表达并支持)
  4. Four-character idiomatic frames (`高频低压`)
  5. Drop reassurance tails (`而不是猜测` / `我们承诺`)
  6. Use `外教` only as contrast term, never DODO self-positioning
- **D6 · "Enjoy the arts of language / 培养学生享受文学艺术的能力"** — humanistic positioning that pairs with cognitive-rigor language. Used as section H2 on home Parent-Trust section. Candidate 4th brand truth to track.
- **D5 · Testimonial style** — First-name + last-initial format (Vincent X · Juliette W · River C); primary city pool now Vancouver / Calgary / Toronto / Montreal / Bay Area / **Denver** (Markham retired from primary pool).
- **D7 · Specific book titles in Read step** — name SAT-must-read classics (Alice in Wonderland, The Invisible Man, The War of the Worlds) over generic descriptors. /program Read step now references the Mud Trilogy *The Red Tide* novel.

### Surface changes
- **Home page migrated** out of inline `HOMEPAGE_COPY` in `app/[locale]/page.tsx` into `home` exports in `content/marketing.{en,zh}.js`. **Now 10 marketing pages**, not 9. Audit script covers home.
- **/program review applied (Q1–Q8)**:
  - §6 Session section rewritten as observer POV (no marketing voice). Scene from Phase 2 Lesson 04 of Mud Trilogy curriculum. Real Visible Thinking routine "What Makes You Say That?" enacted in dialogue. Anchored in actual lesson guide content from `DLCW/projects/lit_L1_MudTrilogy/outputs/phase2`.
  - Pricing hidden on §5 combinations cards via JSX conditional `{item.price && false && (...)}`. Data preserved for re-enable. Pricing facts still in `faq.js #enrollment`.
  - Type A/B caption removed from /program §2 (`loop.typeAB: ''`). **Workflow #18 deferred** — port to /methodology when that page is reviewed.
  - LCS-forward methodology naming, MCT writing arc, Latin/Greek root references, session-length canon.
- **llms.txt + llms-full.txt** refreshed — lead blockquote globalized; Lexile canon; LCS-forward; Speak step "a better question" → "a more thought-provoking question"; cities pool updated (Montreal + Denver added).

### New tooling
- **`scripts/content-audit.mjs`** — EN/ZH parity + anti-dictionary scan across all content surfaces. Run via `node scripts/content-audit.mjs`. Run after any content change.
- **`docs/content-style-decisions.md`** — date-stamped active style-decisions log. Append decisions here as they emerge; promote to brand guide once stable.
- **`content-review/` folder** — page-by-page review artifacts. Each page review produces a content dump (`NN-page-content-dump.md`) + an applied-state record (`NN-page.md`). Pattern: user marks up the dump → "apply review" → I apply marks to source and refresh dump.
- **`.claude/skills/dodo-content-writer/SKILL.md`** — 6 new lint rules added (Loop/LCS surface check · ZH combat-metaphor · EN abstract-evaluative · ZH reassurance-tail · placeholder name · primary-city-pool).

### Recent commits
- `24dc688` — home + program review · LCS-forward methodology · 6+1 ZH canon cascade (2026-05-21)
- `fe4fe84` — /program review Q1-Q8 + global positioning cascade
- `6ced09c` — /program §6 session narrative as observer POV (anchored in Mud Trilogy Lesson 04)

---

## 60-second orientation

DODO Learning is an English literacy program for Chinese immigrant families in Canada + US. The site is bilingual (EN + ZH), Next.js static export, builds 62 pages, deploys two domains from one repo.

In May 2026 we ran a full review and rewrite:
- **Authored a Brand + Content Guide v4.1** (`translation/BRAND_CONTENT_GUIDE.md` · 390 lines · also exported `.docx`).
- **Consolidated content architecture** — 9 marketing pages now read from one EN file + one ZH file. FAQ + cities are bilingual nested. No more per-page content files.
- **Rewrote content** across all surfaces per the brand guide. Translated to ZH via DeepSeek using a staged handoff package.
- **Locked decisions** (workflow.md Open Decisions): pricing restructured to 5 combinations (Summit/Core/Flex 1-3), founder identity = Janet Sui.

Build verifies clean. Site is in known-good state.

---

## 1. Architecture (read first)

### Content lives in 4 places

```
content/
  marketing.en.js   ← 10 marketing pages, EN. One named export per page.
                     home / program / about / consult / compare /
                     methodology / lexile / results / navigators / demos
  marketing.zh.js   ← Same 10 exports, ZH.
  faq.js            ← Bilingual nested. faq.{sections,ui,categories}.{en,zh}.
  cities.js         ← Bilingual nested. 6 cities + citiesUi/citiesProofStats/citiesLoopSteps/citiesPhases.
  en/blog/          ← MDX articles, per-article EN
  zh/blog/          ← MDX articles, per-article ZH
  en/audiobooks/    ← Markdown, EN-only by design
```

**Home was migrated 2026-05-21** from inline `HOMEPAGE_COPY` in `app/[locale]/page.tsx` to `marketing.{en,zh}.js` `home` export. `page.tsx` now imports `home as homeEn` / `home as homeZh` and wires them into a 5-line locale switch.

### Page imports look like this

```js
// app/[locale]/program/page.jsx
import { program as copyEn } from '@/content/marketing.en'
import { program as copyZh } from '@/content/marketing.zh'

const COPY = { en: copyEn, zh: copyZh }
// then: const c = COPY[locale] ?? COPY.en
```

### Chrome imports look like this *(added 2026-06-01)*

Navbar and Footer don't pick their own locale — the server layout resolves it once and passes the copy object down. This keeps the client Navbar from bundling both locale modules.

```js
// app/[locale]/layout.jsx (excerpt)
import { nav as navEn, footer as footerEn } from '@/content/marketing.en'
import { nav as navZh, footer as footerZh } from '@/content/marketing.zh'

const navCopy    = locale === 'zh' ? navZh    : navEn
const footerCopy = locale === 'zh' ? footerZh : footerEn

<Navbar locale={locale} copy={navCopy} />
<Footer locale={locale} copy={footerCopy} />
```

The `nav.*` and `footer.*` namespaces live at the **top** of both `marketing.en.js` and `marketing.zh.js` (above the 10 per-page exports). Editing chrome labels = edit those namespaces in both files; Navbar/Footer code rarely changes.

### Why one file per locale (not per page)

DeepSeek round-trip is one paste in, one paste out per language. 9 pages × 2 langs = 18 files would have been 18 separate DeepSeek sessions. Consolidating to 2 files made the workflow mechanical. See `translation/BRAND_CONTENT_GUIDE.md` §13.

### Exceptions

- **FAQ** and **cities** use bilingual nested (`{ en, zh }` inside one file) — they're item-list shapes (50 Q&As, 6 cities) where the same file is the most natural mental model.
- **`/demos`** has a `YOUTUBE_IDS` const inlined at the top of `marketing.{en,zh}.js`. Replace placeholder strings with real video IDs when ready.
- **`app/[locale]/program/page.jsx`** and **`app/[locale]/demos/page.jsx`** define a local `TRAITS` array (the 6+1 Trait visualization data). This is locale-shaped (`en`/`zh` per row) and lives in the page because the visualization is page-specific.

---

## 2. Brand voice — every content edit must respect this

**Single source:** `translation/BRAND_CONTENT_GUIDE.md` (operator-grade, 14 sections, table-heavy).

The non-negotiables, in 30 seconds:

| Rule | What it means |
|---|---|
| **Tagline** | `Think Once. In Both Languages.` · ZH: `语言的根，长在阅读里` · Never "Think Twice" (typo) |
| **First mention** | `DODO Learning / 都学书院` (both); subsequent mentions either is fine |
| **LCS = named system; The Loop = per-session phrase** *(updated 2026-05-21)* | On brand surfaces, "The LCS System" / "LCS 教学理念" is the methodology name in headers / pillar headings. "The Loop" (`Read → Think → Speak → Write`) lives inside body copy as the per-session phrase. Never use "The Loop" as a section header on dodolearning.com. |
| **Navigators** | Never teachers/tutors/instructors/老师/辅导老师 |
| **English Thinker** | Current owned identity term. `Bilingual Thinker` / `双语思维者` / `双语学习者` are **retired** |
| **The Hangar** | Retired 2026-04. Strip on sight. |
| **MCT** | Soft-distancing in most contexts ("grounded in" / "aligned with"). **Direct naming permitted in the Write step** *(updated 2026-05-21)*: "the MCT writing arc: Grammar → sentence → paragraph → essay → academic composition". |
| **Harvard Project Zero** | Nameable in body, never name specific routines in hero/image copy. *(In observer-POV body narrative — e.g., /program §6 session — the routine can be enacted; just don't slogan-brand it in hero or image overlays.)* |
| **Lexile canon** *(updated 2026-05-21)* | "One grade level over two 16-week cycles" — per-cycle Lexile gains in the 100L–150L range. Old "187 points / 1.2 grade levels / 16 weeks" superseded. |
| **6+1 Trait ZH canon** *(updated 2026-05-21)* | `思考、结构、声音、用词、流畅、规范、呈现` (replacing old `想法、句子流畅度、规范性`). 思考 overlaps with Loop step 2 — accepted trade-off. |
| **Audience** *(updated 2026-05-21)* | Globally-mobile families on positioning surfaces (`/program`, `/about`, home hero, `/compare`, `llms.txt`). Chinese-diaspora references preserved where authentically operational (FAQ city coverage, bilingual cognitive-system references). |
| **Founding Family Program** | Positioning signal, never discount/limited-time |
| **English mastery → bilingual depth** | In that order. Never reverse. |
| **"Arts of language"** *(new 2026-05-21)* | The humanistic positioning that pairs with cognitive-rigor: "Enabling students to enjoy the arts of language / 培养学生享受文学艺术的能力". Used as section H2 on home Parent-Trust section. |

**Anti-dictionary** (must NOT appear in content, per §10): EN — `tutoring`, `ESL` (in DODO description), `catch up`, `Charter Enrollment`, `affordable`, `Think Twice`. ZH — `补习班`, `干预`, `综上所述`, `毋庸置疑`, `由此可见`, `追赶`, `双语思维者`, `双语学习者`, `母语老师`.

**ZH-specific lints added 2026-05-21** (per §08 ZH voice patterns + dodo-content-writer skill):
- Combat metaphors: `捍卫`, `战胜`, `搏斗`, `较量`, `攻克` → replace with collaborative/depth verbs (`表达并支持`, `更深入`, `引导`)
- Reassurance tails: `而不是猜测`, `我们说的每一个主张，都有数据支撑`, `我们承诺`, `我们保证` → prune
- `外教` allowed ONLY as contrast term ("外教不代表会教") — never DODO self-positioning

**Owned vocabulary table** is in §09 of the brand guide. Terms now in `dodo-glossary.json`: LCS, Summit, Core, Flex 1-3, Literacy/Writing Session, Visible Thinking, Janet Sui, Ms. Jennifer / Willow / Sarah, MCT components. **Added 2026-05-21**: `外教` (ZH contrast term), `高频低压` (4-char frame), "Enabling students to enjoy the arts of language" (humanistic positioning).

---

## 3. Product taxonomy (locked 2026-05-17)

The site presents the **LCS + 9 Levels + 5 Combinations** architecture from brand guide §06. Pricing canonical:

| Tier | Format | 16-week | Weekly |
|---|---|---|---|
| **Summit** 全境领航 | 3× literature + 1× writing | $2,830 | $177 |
| **Core** 稳健航行 *(most popular)* | 2× literature + 1× writing | $2,250 | $140 |
| **Flex 1** 文学阅读自由航行 | 2× literature | $1,185 | $74 |
| **Flex 2** 大师写作自由航行 | 2× writing | $2,110 | $132 |
| **Flex 3** GPA管理自由航行 | 1× GPA tutoring | from $750 | ~$47 |

**Pricing display surfaces** (updated 2026-05-21):
- **`/program` combinations cards** — **prices HIDDEN** via JSX conditional `{item.price && false && (...)}` in `app/[locale]/program/page.jsx`. Item.price data preserved in `marketing.{en,zh}.js`. Future re-enable: delete the `&& false` in the JSX. Note + faqLink rewritten to point at FAQ for pricing.
- **`/faq` `#enrollment` section** — full pricing matrix. **Primary public source of pricing facts.** Verify accuracy before any pricing-related question (workflow #17).

Old "Full Program / Literacy Foundation" naming is retired site-wide. If you find any old references, replace with the new taxonomy.

---

## 4. DeepSeek translation workflow

When marketing-page EN copy changes, ZH needs to be regenerated:

1. Open DeepSeek. **Attach as standing context:** `translation/DEEPSEEK_BRIEF.md` + `translation/dodo-glossary.json`.
2. **Hand the changed source file:**
   - For 9 marketing pages: `content/marketing.en.js` (whole file)
   - For FAQ: `faq.sections.en` / `faq.ui.en` / `faq.categories.en` (each `.en` block)
   - For cities: per-city `.en` block × 6 + each shared block (`citiesUi`, `citiesProofStats`, `citiesLoopSteps`, `citiesPhases`)
3. Prompt template is in `translation/archive/deepseek-2026-05-17/README.md` (last round-trip's frozen snapshot — also covers post-merge checks).
4. **Post-merge linter** (grep one-liner in the README): scan returned ZH for forbidden words; fix if any.
5. `npm run build` after merge — Next.js will fail if a key the page expects is missing.

The last round-trip's snapshot lives at `translation/archive/deepseek-2026-05-17/`. When you do another round, create a new dated folder under `translation/archive/` (e.g. `deepseek-2026-08-12/`) and copy the latest brief + glossary + source files into it. Older snapshots stay frozen — they're useful as audit trail for what the source state was at each handoff.

---

## 5. Project skill that helps

`.claude/skills/dodo-content-writer/SKILL.md` — auto-triggers when editing files under `content/`, `app/[locale]/`, or `public/llms*.txt`. Loads brand guide before drafting; runs anti-dictionary screen before output. Use it. If it's not triggering, invoke it manually.

---

## 6. Site sync — CLAUDE.md rules

This is in the project's `CLAUDE.md` and is critical because the user round-trips edits via StackBlitz too. **Before any file edit under `DL_NEXTJS_NEW/`:**

1. The SessionStart hook auto-runs `git fetch && git status -sb`. Read its output.
2. If "behind" > 0: `git pull --ff-only` before editing.
3. If diverged (both ahead + behind): STOP and report. **Never auto-merge.**
4. Clean or only-ahead: proceed normally.

Only re-fetch mid-session for one reason: before a `git push`. Otherwise trust the session-start hook.

---

## 7. Key file index

| Path | What it is |
|---|---|
| `translation/BRAND_CONTENT_GUIDE.md` | **Master brand + content guide (v4.1)**. Read first for any content work. Sections updated 2026-05-21: §04 audience pivot, §06 LCS/Loop convention, §07 MCT writing arc, §08 ZH voice patterns table, §09 owned vocab additions, §11 Lexile canon + testimonial style, §12 home row updates. Also `.docx` for sharing. |
| `translation/DEEPSEEK_BRIEF.md` | DeepSeek translation brief (v1.1). Standing context for every translation session. 6+1 ZH canon updated 2026-05-21. |
| `translation/dodo-glossary.json` | Canonical EN ↔ ZH term map. Updated 2026-05-21 with new 6+1 trait canon (`思考、结构、声音、用词、流畅、规范、呈现`). |
| `translation/archive/deepseek-2026-05-17/` | Last DeepSeek round-trip staging folder + README with prompt template. **Frozen — do not edit. Create new dated folder under `translation/archive/` for next round-trip.** |
| `content/marketing.{en,zh}.js` | **10 marketing pages + chrome**. Named exports: `nav`, `footer` (chrome, added 2026-06-01), then `home`, `program`, `about`, `consult`, `compare`, `methodology`, `lexile`, `results`, `navigators`, `demos` (one per page). |
| `components/layout/Navbar.jsx` | Global navbar. Single flat row of 6, `md:768` desktop breakpoint, CTA-first mobile drawer. Accepts `copy` prop from locale layout — no EN hardcoding. |
| `components/layout/Footer.jsx` | Global footer. 4 columns (Brand · Program · Resources · Serving), `sm:2 md:4` grid. Sibling-site cross-link gated by `NEXT_PUBLIC_SHOW_CODING`. Accepts `copy` prop. |
| `app/[locale]/layout.jsx` | Locale shell. Resolves nav/footer copy from `marketing.{en,zh}.js` and passes to chrome components. Sets `<html lang>` via inline script. |
| `app/[locale]/privacy/page.jsx` / `terms/page.jsx` | **NEW 2026-06-01.** Bilingual stubs. K-12 student-data context. Copy inline (legal boilerplate, not marketing). Replaces broken footer links. Listed in sitemap at priority 0.3. |
| `app/layout.jsx` | Root layout. Owns `<html>` + `<body>`. Site-wide metadata + JSON-LD. Explicit `viewport` export (`maximumScale: 5`, preserves user zoom). |
| `content/faq.js` | 50 Q&As + UI + categories, bilingual nested |
| `content/cities.js` | 6 cities + shared chrome, bilingual nested |
| `public/llms.txt` / `llms-full.txt` | GEO surfaces for LLM citation. EN-only. Refreshed 2026-05-21 (LCS-forward + global positioning + new Lexile canon). |
| `lib/schema.js` | JSON-LD schemas (EducationalOrganization, WebSite, FAQPage, courseSchema, citySchema). |
| `lib/i18n.js` | Locale primitives only (LOCALES, isValidLocale, toggleLocale, localeParams). `getContent` removed 2026-05-17. |
| `app/[locale]/page.tsx` | Home page. Imports `home` from `marketing.{en,zh}.js`. Old inline `HOMEPAGE_COPY` retired 2026-05-21. |
| `app/[locale]/program/page.jsx` | /program page. `TRAITS` array (6+1 ZH labels) and `LEXILE_SCALE` array live here as page-specific static data. Combinations card price hidden via `{item.price && false && (...)}` conditional. |
| `components/faq/FAQClient.jsx` | Pure renderer + markdown-lite parser. Imports `faq` from content/faq.js directly. |
| `docs/workflow.md` | SEO+GEO running doc — Open Decisions (#1–#18), session log, Tier 1-3 plan. |
| `docs/content-style-decisions.md` | **NEW 2026-05-21.** Date-stamped active style-decisions log. D1–D9 captured to date. Promote to brand guide when stable. |
| `docs/llm-citations/` | Monthly citation tracker. Same 8 prompts × 4 LLMs (TBD prompts in decision #5). |
| `content-review/` | **NEW 2026-05-21.** Page-by-page review artifacts: `01-home.md` + `01-home-content-dump.md` (home), `02-program.md` + `02-program-content-dump.md` (/program). Pattern: user marks up the dump → "apply review" → applied state recorded in the sibling .md. |
| `scripts/content-audit.mjs` | **NEW 2026-05-21.** EN/ZH parity + anti-dictionary scan across `marketing.{en,zh}.js`, `faq.js`, `cities.js`, `public/llms*.txt`. Run `node scripts/content-audit.mjs` after any content change. Expects clean output (0 parity gaps; 19 baseline strategic-ESL contrast hits are pre-existing, not regressions). |
| `.claude/skills/dodo-content-writer/` | Project-local skill for DODO content tasks. Lint rules expanded 2026-05-21 with Loop/LCS · ZH combat-metaphor · EN abstract-evaluative · ZH reassurance-tail · placeholder-name · primary-city-pool checks. |

---

## 8. What's pending

### Blocked on user decisions (`docs/workflow.md` Open Decisions)

- **#4** Xiaohongshu / WeChat operator + cadence
- **#5** The 8 monthly-tracked LLM citation prompts (Claude proposed 8 in Tier 1 session; awaiting confirmation)
- **#6** Off-site mention channel for Tier 3 (newsletters / podcast / school-counselor / Reddit etc.)
- **#7** Bing Webmaster Tools registration (blocks IndexNow)
- **#8** Google Search Console + GA4 IDs
- **#9** Social profile URLs for `sameAs` schema
- **#10/11** Cities expansion strategy (18 cities in `areaServed`, 6 have dedicated pages, 12 don't)
- **#12** YouTube video IDs for `/demos` (`YOUTUBE_IDS` const has placeholders)
- **#15** Home hero `consultHook` not visible on live site (reported 2026-05-21) — verify post-deploy of `24dc688`/`fe4fe84`/`6ced09c`. Likely was just deploy lag; if still missing → contrast or `overflow-hidden` clipping diagnosis steps in workflow.md.
- **#17** Verify FAQ pricing is current (Summit $2,830 · Core $2,250 · Flex 1 $1,185 · Flex 2 $2,110 · Flex 3 from $750). Pricing now hidden on /program (workflow #17), so /faq is the only public surface.
- **#18** Type A/B caption needs to land on /methodology — caption was cleared from /program (`loop.typeAB: ''`) and needs to live in `methodology` export of `marketing.{en,zh}.js`. **Apply during /methodology page review** (deferred per user 2026-05-21).

### Tier 2 work items (from workflow.md, not yet done)

- **Founder Person schema** — JSON-LD `Person` for Janet Sui. Needs bio + credentials beyond just the name.
- **Sample Navigator bios** on `/navigators` (still flagged "pending" per brand v4.1 §12).
- **Credentials page** (`/about/credentials` or `/credentials`) — MCT, Harvard PZ, 6+1 Trait as `EducationalOccupationalCredential` schema.
- **6 verification-search city pages** (post-referral search targets, distinct from current `/cities/[city]` discovery pages).
- **4 comparison pages** (`/vs/private-tutor`, `/vs/outschool`, `/vs/kumon`, `/vs/eye-level`).
- **AEO snippets** (40-80 word GEO definitions at top of `/methodology`, `/lexile`, `/faq`).
- **Internal linking audit** — methodology ↔ lexile ↔ results cross-links.

### Tier 3 (ongoing)

- Monthly LLM citation review (user-side).
- 1 pillar blog post every 2 weeks.
- Off-site mention building (blocked on #6).

### Smaller deferred items

- Update workflow.md after every working session (operating rule).
- Re-export `BRAND_CONTENT_GUIDE.docx` whenever the `.md` changes (`node translation/.build_docx.js`).

---

## 9. Known constraints

- **Static export** (`output: 'export'`). No API routes. No middleware (see `docs/proxy.example.js` for the dormant blueprint). Targets **Cloudflare Pages** (single host since 2026-06-02; Vercel retired).
- **No Windows symlinks.** Per-page content files were retired partly for this reason.
- **Git config not set globally.** Use `git -c user.email=hsinkwu@gmail.com -c user.name=aiyoweiah` for commits, or ask the user to configure.
- **External image fetch warnings** during build (Unsplash hero backgrounds) — pre-existing, not from this session's work. 91 warnings × runs. Ignorable.
- **Brand voice rules > everything.** If a content change conflicts with the brand guide, the brand guide wins. Surface the conflict; don't auto-decide.

---

## 10. Quick smoke test

After any content change, run this to verify health:

```bash
cd DL_NEXTJS_NEW
npm run build 2>&1 | grep -E "Error|✓|Failed" | head
# Expect: ✓ Compiled successfully · ✓ Generating static pages using N workers (62/62)
```

Then spot-check a representative page:
```bash
grep -c "Hangar\|Bilingual Thinker\|双语思维者\|双语学习者\|追赶\|Think Twice" out/en/*/index.html out/zh/*/index.html
# Expect: all 0
```

Then visit `/en/program`, `/zh/program`, `/en/faq`, `/zh/faq` locally (`npm run dev`) — eyeball the 5-tier pricing matrix + the Loop / LCS sections + the SSAT anchor on `/results`.

---

## 11. If you're rewriting content

1. Read brand guide §07 (frameworks) + §08 (voice) + §09 (owned vocab) + §10 (anti-dictionary) + §12 (the row for the page you're touching).
2. Edit `content/marketing.{en}.js` (or `faq.js` / `cities.js`).
3. Build. Spot-check rendered HTML.
4. Hand the ZH part to DeepSeek; merge response back; build + spot-check `/zh/*`.
5. If you touch >1 page, update `docs/workflow.md` session log + this handoff if architecture changed.

---

## 12. If you're stuck

- Voice questions → `BRAND_CONTENT_GUIDE.md`, especially §12 (per-page voice cues).
- Architecture questions → this doc, §1.
- Translation questions → `DEEPSEEK_BRIEF.md` + `dodo-glossary.json`.
- Decision blockers → `docs/workflow.md` Open Decisions.
- SEO/GEO strategy → `docs/workflow.md` Tier 1/2/3 plan.
- Recent voice / vocab decisions → `docs/content-style-decisions.md`.

---

## 13. Page-by-page review pattern (NEW 2026-05-21)

When the user wants to deeply review a page (versus apply a small spot-fix), use this rhythm:

1. **Generate a content dump**: dump all visible strings of the page into `content-review/NN-<page>-content-dump.md`, organized by section (`§0` SEO meta → `§N` final section) with EN ↔ ZH paired and labeled by element type (eyebrow / H1 / sub / CTA / body / etc.). Pull the data from the source file (`marketing.{en,zh}.js` or wherever the page imports its copy) — not from rendered HTML.
2. **User marks up the dump** — strikethroughs, replacement text inline below original, "keep" markers, comments.
3. **You read the marked-up dump** and produce a catalogue of changes needing approval. Surface judgment calls (factual shifts, brand-architecture changes, removals) as Q1, Q2, ... with options + recommendations.
4. **User answers Qs.** Apply all decisions, plus typo fixes and pure style edits inline.
5. **Re-run audit** (`node scripts/content-audit.mjs`). Verify 0 parity gaps + same baseline anti-dictionary hits.
6. **Refresh the dump** with the post-applied state for the next round if needed.
7. **Record applied state** in sibling file `content-review/NN-<page>.md` — what was applied, what's pending, links to relevant brand-guide / workflow entries.
8. **Promote any emergent style decisions** to `docs/content-style-decisions.md` (D-numbered) and update brand guide sections if stable.
9. **Commit + push** with a descriptive message that links source files + brand-guide sections updated.

Pages completed via this pattern as of 2026-05-21: `/` (home) Round 1+2, `/program` Round 1+2 (F1–F7 + Q1–Q8 + session rewrite).

Pages remaining in §12 priority order: `/about` → `/methodology` (apply workflow #18 Type A/B port here) → `/results` → `/faq` audit → `/compare` voice pass → `/lexile` AEO snippet → `/navigators` → `/consult`.

---

Good luck.
