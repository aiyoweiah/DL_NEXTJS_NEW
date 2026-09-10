# GEO audit — machine surfaces, structured data, blog authority, visual signals

**Date:** 2026-09-09 · **Against:** `main` = `ed9f266` (tree clean, level with origin) and the live origin `www.dodolearning.com` · **Author:** Windows hub session
**Instruments:** every built route in `out/` parsed (120 pages: title, description, h1, JSON-LD, hreflang, canonical, alt, word counts) · live origin fetched and diffed against the repo · Cloudflare zone config read through the API (not inferred) · 18 crawler user-agents probed · Bing-backed index sampled · pixel statistics on the OG image.
**Companion to:** `workflow.md` (the SEO + GEO source of truth — session log entry added), `llm-citations/2026-08.md` (last capture), `.design/visual-review-2026-09/DESIGN_REVIEW.md` (the visual review this does not repeat).
**Hard constraint honoured in the first pass:** no copy, code or asset was changed. Everything below is a finding with a proposed fix; live changes go through the apply-gate as usual. **Status 2026-09-09 evening:** R1/R2/R5/R6 applied as D102–D105 + M1; D106 canon guard, D107 IndexNow, D108 machine layer and the frozen register F1–F6/F9–F11/F13 applied (§ Update 2); R3 elaborated with option D, R4 open, R7 ruling sheet published — owner's picks pending.

---

## Summary

The site's GEO plumbing is in better shape than the tracker results suggest: AI crawlers are not blocked anywhere (verified at the Cloudflare zone, not just in `robots.txt`), the three `llms*.txt` files on the live origin are byte-identical to the repo, every one of 120 pages carries valid JSON-LD, hreflang alternates are emitted in both the HTML and the sitemap, and the FAQ emits 58 clean, self-contained Q&As. Nothing in the machine layer is silently broken in the way the 2026-08 tracker feared.

The defects cluster in four places, and three of them are the kind that quietly cost citations:

1. **Every blog post declares a canonical of a page that does not exist** (`/en/blog/undefined/`), and the blog index links five articles that 404 while the one real pillar post — the MCT article the tracker identified as the highest-leverage GEO asset — is not linked from the index at all. The pillar post is effectively orphaned, and the index reads as a scaffold with invented authors.
2. **The social/knowledge-graph image is a blank rectangle.** `og-default.png` is a uniform `#0E0E12` field. It is the `og:image` on all 120 routes, the `Organization.logo`, and the `Article.image` on every post.
3. **Machine-readable claims disagree with the human pages and with each other:** grades 3–8 in five schema fields against "ages 5 through high school" on the pages; a founding year of 2021 in schema and llms files against 2020 in the brand guide; "graduate degrees" in `llms-full` against "degrees" in §11; and `llms-full.zh.txt` still carrying the 9-level/Poodle architecture, a third variant of the LCS name, a retired Loop gloss, and a banned word — all of which the completion plan already queues as "machine surfaces, post-Wave-6". This audit itemises that queue to the line.
4. **The index is stale and the entity is ambiguous.** Bing-backed results still show the retired tagline in the homepage title two weeks after D45 purged it, and "Dodo Learning" in those same results is also an unrelated corporate LMS app. Both point at Wave 6 items 7 and 9 (Bing Webmaster + `sameAs`), where a real DODO YouTube channel is already discoverable and unlinked.

| | Count |
|---|---|
| Must fix — code only, no copy | 4 |
| Should fix — code / schema | 7 |
| Frozen register — copy, apply-gated | 13 rows across `llms.txt`, `llms-full.txt`, `llms-full.zh.txt` |
| Rulings requested (admin) | 7 |
| Verified healthy — do not re-check | 9 |

---

## Verified healthy — recorded so nobody re-measures it

| # | Surface | What was checked | Result |
|---|---|---|---|
| H1 | Cloudflare zone `dodolearning.com` (Free plan) | `GET /zones/{id}/bot_management` via the API | `ai_bots_protection: disabled` · `crawler_protection: disabled` · `is_robots_txt_managed: false` · `fight_mode: false` · `cf_robots_variant: off`. Nothing at the edge blocks or taxes AI crawlers. `browser_check: on`, `security_level: medium` are the Free-plan defaults and do not challenge verified bots. |
| H2 | `robots.txt` | live vs `out/robots.txt` | Identical. Allow all, disallow `/api/ /preview/ /_next/`, sitemap declared. |
| H3 | 18 crawler user-agents (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Perplexity-User, Google-Extended, Googlebot, Bingbot, Applebot, Bytespider, Baiduspider, CCBot, meta-externalagent, Amazonbot, DuckAssistBot, plain curl) | `/en/` and `/llms.txt` | 200 for every agent. *Caveat:* probes came from a residential IP, so a 200 does not prove verified-bot IPs are admitted — H1 is the authoritative check; H3 only rules out user-agent blocking. |
| H4 | `llms.txt` · `llms-full.txt` · `llms-full.zh.txt` | live vs repo | Identical once CRLF is ignored (the repo checks out with CRLF on Windows; the edge serves LF — a byte diff shows every line changed; `diff --strip-trailing-cr` shows zero). Served as `text/plain; charset=utf-8`. |
| H5 | Structured data | all 120 built pages parsed | 0 JSON-LD parse errors. Types emitted: EducationalOrganization + WebSite on every page; Course on `/program` `/methodology` `/little-dodo`; FAQPage on `/faq`; Person on `/about`; CollectionPage + 5 ScholarlyArticle citations on `/credentials`; Article on 6 blog pages; EducationalOrganization+LocalBusiness on 40 city pages. |
| H6 | FAQPage | `/en/faq` built output | **58** questions (workflow says 50 — count drift only). Answers carry no markdown-lite artefacts (`**`, `[](`) and no HTML — each is a clean standalone string. |
| H7 | hreflang | HTML head + sitemap | Every page: `en` · `zh-Hans` · `x-default`. Sitemap: 38 URLs × 3 alternates. `og:locale` `en_CA` / `zh_Hans`. |
| H8 | Text availability | word counts on built HTML | Static export; all copy is in the HTML (home 1,136 EN words; `/faq` 3,540; `/methodology` 1,777). No client-rendered content for crawlers to miss. |
| H9 | Alt text | 120 pages | 0 `<img>` without an `alt` attribute (empty alts only on decorative media). |

---

## Must fix — code only, no copy involved

### M1 · Every blog post's canonical, hreflang and `og:url` point at `/blog/undefined/`

**Evidence.** Built and live: `out/en/blog/mct-language-arts-in-a-live-one-on-one-program/index.html` carries
`<link rel="canonical" href="https://www.dodolearning.com/en/blog/undefined/">`, the three hreflang links to `/en/blog/undefined/` and `/zh/blog/undefined/`, and `og:url` the same. All six blog pages (3 EN + 3 ZH) are affected. The `Article` JSON-LD on the same page has the *correct* `@id` and `url` because it receives `slug` separately.

**Cause.** `app/[locale]/blog/[slug]/page.jsx:34` calls `buildPostMetadata(post.frontmatter, locale)`, but `getPost()` in `lib/blog.js` returns `slug` at the top level of the post object, not inside `frontmatter`. `buildPostMetadata()` in `lib/metadata.js` reads `post.slug` → `undefined`.

**Why it matters for GEO.** A canonical pointing at a 404 tells Google and Bing the real URL is not the preferred copy. Blog posts are the sitemap's priority-0.65 entries and the pillar-content strategy's whole delivery vehicle; the MCT post is the tracker's named unblock for prompts A6 and A8.

**Fix (one line).** `return buildPostMetadata({ ...post.frontmatter, slug: post.slug }, locale)`. Then confirm on the built output that canonical equals the Article `url`.

### M2 · The blog index ships six scaffold articles — five are dead links — and does not link the real pillar post

**Evidence.** `app/[locale]/blog/page.jsx:185` declares a hard-coded `ARTICLES` array (rendered at `:331` via `ARTICLES.slice(0, 3)`) plus a hard-coded featured article at `:178` (`author: 'Dr. Sarah Chen'`). Built `/en/blog/` links:

| Linked slug | Exists? |
|---|---|
| `what-does-lexile-score-mean` | yes |
| `lexile-asymmetry-bilingual-children` | yes |
| `complex-stories-english-simple-sentences-mandarin` | **404 on live** (verified) |
| `three-moments-bilingual-plan-not-working` | **404** |
| `bilingual-education-san-francisco` | **404** |
| `code-switching-bilingual-children` | **404** |
| `when-bilingual-children-start-reading` | **404** |
| `mct-language-arts-in-a-live-one-on-one-program` (the pillar post, 2026-08-26, by Janet) | **not linked anywhere on the index** |

The page also hotlinks 31 `images.unsplash.com` files, names five authors who appear nowhere else on the site (Dr. Sarah Chen, Michael Torres, Li Wei, Jennifer Park, Dr. Maria Rodriguez — plus 陈博士 on the ZH twin), and carries an unverified proof claim in an excerpt ("Pattern recognition from 500+ diagnostic calls"). `/en/blog/` is in the sitemap at priority 0.7.

**Why it matters.** This is the page an LLM or a referred parent lands on when checking whether DODO publishes real expertise. Today it reads as a template with fictional bylines and broken links, and it hides the one article written to be cited. E-E-A-T-wise this is the single worst page on the site.

**Fix.** Render the index from `getAllPosts(locale)` (already exported by `lib/blog.js`) instead of the `ARTICLES` constant; drop the Unsplash hotlinks (use the painted-series art or no image); feature the newest post. Zero copy is authored by this change — the three real posts already carry their own titles and excerpts. **Author names are a ruling (R3).**

### M3 · The OG image is a blank rectangle, and it is also the Organization logo

**Evidence.** `public/og-default.png`: 1200 × 630, 3,160 bytes, committed 2026-03-20 (`83830ea`, "0320exp"). Pixel sample of 21,000 points: mean luminance 14, min 14, max 14 — one flat value, ≈ `#0E0E12`. It is referenced as `og:image` and `twitter:image` on all 120 routes (`lib/metadata.js` `OG_IMAGE_DEFAULT`), as `EducationalOrganization.logo` (`lib/schema.js` ~`:118`), and as the fallback `Article.image`.

**Why it matters.** Every link shared into WeChat, Xiaohongshu, iMessage, LinkedIn, Slack or a Google Doc renders a black card. Knowledge-graph builders and LLM retrieval that pull `Organization.logo` get a black square. The 09-03 visual review did not look at this asset because it never renders on the site itself.

**Fix.** Two assets: (a) a real 1200 × 630 OG card — logo on Whisper ground, tagline "Think once, in two languages." / 一次思考，两种语言。, no other copy, exported per locale or bilingual; (b) a square logo for `Organization.logo` (the 512 px manifest icon already exists at `public/web-app-manifest-512x512.png`, or rasterise `logo_icon.svg`). Both are asset work under the interface guide; the copy on the card is the locked tagline, so no new copy is authored.

### M4 · `<html lang>` is set only by JavaScript

**Evidence.** `out/zh/index.html` opens `<html class="… font-cjk-subset" style="…">` — no `lang`. `app/[locale]/layout.jsx` injects `document.documentElement.lang="zh-Hans"` in an inline script because the root layout owns `<html>`. Crawlers that do not execute scripts (most LLM crawlers; Bing's first pass) see 120 pages with no declared language; the only language signals left are hreflang links, `og:locale`, and JSON-LD `inLanguage` — and the Course/FAQ schemas say `en` on the ZH pages (S6).

**Fix.** Set `lang` server-side. The idiomatic route in App Router with a `[locale]` segment is to move `<html>`/`<body>` into `app/[locale]/layout.jsx` (and the non-locale `/ops` tree gets its own minimal root), or keep the root layout and read the locale from `headers()`/the pathname at render time. Either way, the inline script becomes unnecessary. This touches layout structure, so it should ship alone with the 14 guards, not inside a content batch.

---

## Should fix — code and schema

| # | Where | Finding | Proposed fix |
|---|---|---|---|
| S1 | `lib/schema.js:153` `:251` `:269` `:283` `:646` | `grades 3–8` in `audienceType` (×2), the Course description, `educationalLevel`, and the city description — against "ages 5 through high school" (home title/description), "Grade 3+ … college-tier Level 7" (llms), and the June program-family rework. The JSON says a narrower program than the pages do. | Align to the canon: ELA "Grade 3 through high school"; Little DODO "ages 5–8"; Organization audience "capable K–12 students". One pass, five fields. |
| S2 | `lib/metadata.js:207–214` (`buildCityMetadata`) · `lib/schema.js:636–668` (`citySchema`) | 40 city pages: (a) description names **"The 16-Week Program"** — the retired name (§16: never as a program name); (b) the description is English on all 20 ZH pages and the ZH title mixes languages ("DODO Learning in 温哥华"); (c) `@type: ['EducationalOrganization','LocalBusiness']` with a `PostalAddress` in each of 20 cities claims a physical presence the program does not have — Google's LocalBusiness guidance requires a real location, and 20 identical addresses-with-no-street is the pattern that gets structured data ignored or flagged. (d) "serves Chinese-speaking families" — permitted by D40 on *local* surfaces, so not a breach; noting it so the D40 line is checked deliberately. | (a)+(b) localise the helper: EN/ZH description pairs, drop the retired name, ZH title `DODO Learning · 温哥华`. (c) **Ruling R5** — drop `LocalBusiness` and `PostalAddress`, keep `areaServed` (my recommendation), or keep LocalBusiness only where a real address exists. |
| S3 | `app/[locale]/faq/page.jsx:30` | `/faq` description: "before enrolling in the DODO Learning **16-Week Program**" — retired name, and the same English string ships on `/zh/faq`. | Localise the meta; name the program "ELA Program / ELA 课程". |
| S4 | `app/sitemap.js:61` + `STATIC_PAGES` | `lastModified` = build time for all 38 URLs (live: every entry `2026-09-06T06:57:22Z`) — a lastmod that changes for every URL on every deploy is a lastmod crawlers learn to ignore. `/en/demos/` (indexable, 662 words) and `/en/assessment/` (indexable) are not in the sitemap; both are index/follow. | Blog entries: use `publishedAt`/`updatedAt` from frontmatter. Static pages: a per-route date constant bumped on content change, or omit lastmod for static routes. Add `/demos`. `/assessment` is **ruling R4** (D29 says no assessment entry — index it, noindex it, or leave it in limbo; today it is in limbo). |
| S5 | `/zh/blog/mct-language-arts-in-a-live-one-on-one-program/` | Only 2 of 3 posts have ZH files; the pillar post's ZH route renders the English article (1,724 EN words / 431 CJK chars) under a `zh-Hans` `inLanguage` and an English title — a mislabelled-language page in the ZH tree, and the sitemap advertises it as the ZH alternate. | Either translate the pillar post (the GEO-correct answer: it is the highest-leverage article and the ZH tracker cells are the emptiest), or on fallback pages set canonical → the EN URL and `inLanguage: 'en'`. |
| S6 | `lib/schema.js` Course (`inLanguage: 'en'`), FAQPage (`@id` `…/faq#faq`) | Course and FAQ schemas are not localised: `/zh/program` and `/zh/methodology` emit English Course descriptions with `inLanguage: 'en'`; `/en/faq` and `/zh/faq` share one `@id`, so the two FAQPage nodes collide in any graph that merges by `@id`. | Pass `locale` into `courseSchema()`/`faqSchema()`: locale-scoped `@id`s, `inLanguage` `zh-Hans` on ZH, and a ZH description drawn from the existing ZH meta (no new copy). While there: `Course` lacks `hasCourseInstance` and a priced `offers`, which Google requires for Course rich results — optional; LLMs read the node regardless. |
| S7 | `content/marketing.en.js:196` (home `meta.title`, 120 chars) · descriptions on `/` (350) `/about` (337) `/methodology` (388) `/program` `/little-dodo` (262) · `/en/blog/lexile-asymmetry…` title 115 · ZH blog descriptions 29–41 chars | Titles truncate at ~60 chars in results; descriptions at ~155–160. LLMs are not hurt by length; humans clicking from Bing/ChatGPT source cards are. | Copy — **frozen**; if the admin wants it, a 60/155 pass on the seven pages is a single apply. Not urgent. |

---

## Frozen register — machine-surface copy that has drifted from canon (apply-gated)

The completion plan already queues "the machine surfaces (`llms-full.txt` and especially `llms-full.zh.txt`, last touched 2026-08-24 — before the entire v5 cascade)" as the next move after Wave 6. This is that job, itemised. Nothing here is applied. Line numbers are against `ed9f266`.

| # | File:line | Live text (abridged) | Conflicts with | Proposed |
|---|---|---|---|---|
| F1 | `public/llms-full.txt:44–49` · `llms-full.zh.txt:43–48` | "Programme Architecture: **9 levels**, 5 combinations" · "Intermediate — **DODO Poodle**" · "Starter — Little DODO … Ages **5–9** (NA 5–6)" | D37 (ELA = 7 levels, Poodle not adapted, Little DODO a separate program); §06b; Little DODO is "ages 5–8" on every other surface | Rewrite the section as §06 states it: the ELA Level Ladder (L1 → L7, Level 7 = college-tier), Little DODO as the separate K–2 program, five combinations unchanged. |
| F2 | `llms-full.zh.txt:19` `:21` `:37` `:193` | "**LCS 教学系统**" | D19 / glossary: LCS → **语言循环体系** (the file carries a *third* variant — neither the canon nor the two superseded forms) | Replace all four; the ZH `/methodology` meta already uses the canon and can be the reference. |
| F3 | `llms-full.zh.txt:3` | lead blockquote: "面向**全球流动家庭**的…" | D40 (the "globally-mobile families" headline framing is retired; international is implicit) | Mirror the EN lead: 面向有能力的 K–12 学生的真人一对一英语语言艺术课程. |
| F4 | `llms-full.zh.txt:3` `:21` | The Loop glossed "读→思→说→写" | glossary: The Loop stays English, no gloss; the per-session phrase is 阅读 → 思考 → 表达 → 写作 | Use the canonical phrase or no gloss. |
| F5 | `llms-full.zh.txt:30` | Type A: "导师在句子层面进行**辅导**" | §10 anti-dictionary (辅导 banned; reaffirmed in the Flex 3 ruling) — this one describes DODO's own session, not a contrast | "导师在句子层面逐句指导" (or 引导). `:181` "对比私人辅导" is a named alternative and stays. |
| F6 | `llms-full.zh.txt:9` | "面向 **3–8 年级**（约 7–15 岁）学生" | EN twin `:9` says capable K–12, ages 5 through high school | Mirror the EN sentence. |
| F7 ✅ applied 2026-09-09 (D103, 16 spots incl. pages) | `llms-full.txt:9` `:83` · `llms-full.zh.txt:82` | "a **graduate-degree** holder" · "hold **graduate degrees** from world top-50 universities" · "持有…**研究生学位**" | §11 / D18: "**Degrees** from world top-50 universities" — the guide deliberately does not say graduate | **Ruling R2.** If the canon is "degrees", downgrade all three; if every ELA Navigator does hold a graduate degree, promote §11 instead. The site pages were not swept for this word in this audit. |
| F8 ✅ applied 2026-09-09 (D102) | `llms.txt:65` · `llms-full.txt:206` `:210` · `llms-full.zh.txt:189` · `lib/schema.js:167` (`foundingDate: '2021'`) `:456` | "founded in **2021** by Janet" | §11: "Founded **2020** in Canada · relaunched 2025" | **Ruling R1.** One year, everywhere. Until ruled, LLMs will meet both. |
| F9 | `llms-full.zh.txt` (whole file) | No §07a research base section; EN has it since `334d8de` | §07a is "our strongest GEO asset"; the ZH tracker cells are the emptiest | Port the EN "research base" section (five licensed claims + citations) — this is a translation job, the first candidate for the new ZH tooling (§ Tooling). |
| F10 | both `llms-full` files | The Five Strands (Literature · Vocabulary · Poetics · Grammar · Writing under L/C/S) are absent | D37 "five-strands surfacing owed" (decision-index) | Add one short paragraph under the LCS section in each file. |
| F11 | `public/llms.txt` § Core pages | No blog links; `/demos`, `/consult` absent; no "last updated" line | The MCT pillar post is the article written to be cited | Add a "Writing" block with the three posts (dated, authored), `/consult`, and a `Last updated: YYYY-MM-DD` line at the top (llms.txt convention; also lets the monthly tracker record which version an LLM saw). |
| F12 | `llms-full.txt` § Outcomes | "Average **2× gain** in 6+1 Trait writing score" · "**10,000+** teaching hours" · "**8 out of 10** families continue" | §11 lists hours, students, referral rate and the Lexile set — the 2× writing gain and 8/10 continuation are not in §11 | Either add them to §11 (with the source) or drop them from the machine surface. Numbers are load-bearing (§02 Truth 3). |
| F13 | `llms-full.txt` "Founding Family Program: Families who enroll during a **new city's launch**" | Positions the program as city-cohort launches | Program is delivered online; cohorts are not city-launched anywhere else | Reword to the §10 canon ("recognises early commitment; not a discount"). |

---

## Off-site, index and entity findings

| # | Finding | Evidence | What it points at |
|---|---|---|---|
| O1 | **The index still carries the retired tagline.** Bing-backed results for `/en/` and `/zh/` show titles ending "Think Once. In Both Languages." — retired 2026-08-26 (D36/D45). The live `<title>` is correct ("Think once, in two languages." / 一次思考，两种语言。); the retired form appears nowhere in the repo or live HTML. So the homepage has not been re-crawled by Bing in at least two weeks. ChatGPT's browse is Bing-backed. | WebSearch + DuckDuckGo (Bing index) result titles, 2026-09-09; repo grep clean | Wave 6 #7 (Bing Webmaster Tools → IndexNow). Nothing in-repo fixes crawl frequency. |
| O2 | **Entity ambiguity.** In the same result set, "Dodo Learning" is also `play.google.com/…/com.ispringlearn.dodobrands` — Dodo Brands' corporate LMS app. An LLM resolving "Dodo Learning" has two entities and only one of them has `sameAs`, a Wikidata item or third-party mentions. | DDG results for "DODO Learning" 英语 | `sameAs` (Wave 6 #9), consistent `alternateName` 都学书院 in schema (present in prose, absent from `alternateName`), and the off-site mention graph (Tier 3). |
| O3 | **A real social profile exists and is unlinked.** `youtube.com/@DODO-Learning` ("DODO Learning Canada", channel `UCUTdsHg4VHnquYGBDQm7M1A`) is indexed. The site never links it; `sameAs` is still commented out in `lib/schema.js`. | live YouTube title; repo grep | **Ruling R6** (confirm ownership) → first `sameAs` entry, footer link, and a `VideoObject` opportunity for the `/demos` footage once it exists. |
| O4 | **No footer social links, no `email`/`telephone` in schema.** `hello@dodolearning.com` and `janet@dodolearning.com` exist in content; the Organization `contactPoint` has only a URL. | repo grep | Adding `email` to the contactPoint is cheap entity signal; spam exposure is the trade — admin call, folded into R6. |
| O5 | **Tracker cadence.** The August capture ran 8 of 112 cells; the September pass is due **2026-09-24** (workflow §Re-test). The v3 prompt set is defined; capture rules (incognito everywhere) are written. | `llm-citations/2026-08.md` | User-run, by design. This audit did not run LLM probes: the protocol requires the owner's accounts in incognito mode and screenshots, and a partial run from a different account would pollute the series. |

---

## Rulings requested — admin

> **Rulings received 2026-09-09 (owner, in chat):** R1 → **2020** (D102) · R2 → **degrees** (D103; the apply-time sweep found ten more spots on customer pages) · R3 → the March bylines are **placeholders**; retire-vs-prune evaluated, option C recommended · R4 → evaluated, repurposing recommended against · R5 → **`areaServed` only** (D104) · R6 → **yes**, first `sameAs` (D105) · R7 → **placeholder confirmed**, four candidates in `.design/og-card-2026-09/`. Cascade staged in [`../content-review/05-geo-rulings-2026-09-09.md`](../content-review/05-geo-rulings-2026-09-09.md) — **apply-gated, awaiting "apply"**.

| # | Question | Default if unruled |
|---|---|---|
| R1 | **Founding year: 2020 (brand guide §11) or 2021 (schema, llms, bio)?** | The machine surfaces keep saying 2021 and the guide says 2020; every LLM that reads both will pick one. |
| R2 | **"Degrees" or "graduate degrees" from world top-50?** §11 says degrees; `llms-full` EN/ZH says graduate degrees. | F7 stays as an overclaim relative to the guide. |
| R3 | **Are "Dr. Sarah Chen", "Michael Torres" (and 陈博士) real DODO Navigators?** They exist only in two March blog posts and the scaffold index. If not real, re-attribute the two posts to Janet or to "DODO Learning" (the `Article` schema already falls back to that) before the blog index is rebuilt. | M2's rebuild ships with invented bylines. |
| R4 | **`/assessment` — index it, `noindex` it, or remove it?** D29 says no assessment entry CTAs; the page is live, indexable, and in no sitemap. | Stays in limbo; LLMs can still land on it. |
| R5 | **City pages: drop `LocalBusiness` + `PostalAddress` (keep `areaServed`)?** | 20 addressless LocalBusiness nodes keep shipping. |
| R6 | **Confirm `youtube.com/@DODO-Learning` is DODO's channel** → first `sameAs`, footer link. Also: XHS / WeChat OA URLs (Wave 6 #9). | `sameAs` stays empty; O2 ambiguity persists. |
| R7 | **OG card brief** — bilingual card or per-locale? Tagline only, or tagline + "Live, Navigator-led English literacy, ages 5 through high school"? | M3's fix waits on a one-line answer; the tagline-only version needs no new copy. |

---

## Tooling decisions made this session

### GEOFlow (`github.com/yaojingang/GEOFlow`) — **not installed, and not applicable as a skill**

It is not a Claude Code skill. It is a self-hosted content-operations platform — Laravel 12 / PHP 8.3+, PostgreSQL with pgvector, Redis, Docker Compose, AGPL-3.0 — for enterprises that generate, quality-gate, review and distribute AI-written articles across many sites, with a browser extension for assisted publishing. The one skill it bundles (`.agents/skills/geoflow`) exists to *develop and operate GEOFlow itself* (its Laravel routes, admin UI, CLI and theme contracts). Its "AI quality inspection" is a claim-vs-knowledge-base consistency gate for generated articles; its "atomic facts" work is a benchmark of that gate. None of it audits a third-party static site, and DODO's brief forbids the thing GEOFlow is built for (volume AI content). Running it would add a four-service Docker stack to a project whose production surface is a static export.

What *is* worth borrowing is the idea, not the software: **a claim-consistency guard over the machine surfaces.** DODO already holds canon by hand (§11 + apply-gated cascades); F1–F13 above are what hand-holding misses. Proposed as **G-1 · `check-canon`** — a 15th source guard in the repo's own idiom: a small list of retired strings (`16-Week Program`, `Poodle`, `9 levels`, `LCS 教学系统`, `学习循环`, `全球流动`, `Think Once. In Both`, `Janet Sui`, `grades 3–8`) grepped across `public/llms*.txt`, `lib/schema.js`, `lib/metadata.js`, `app/**/page.*` on `prebuild`; fails on any hit; the list is edited in the same commit as the ruling that retires a term. It would have caught S2, S3, F1, F2 and F3 at build time.

### `writing-dna-skill` + `lieflat-less-ai-tone` — **installed (user scope, Windows)**

Source `github.com/larashero3-dotcom/writing-dna-skill`, commit `ee3d97e`, MIT. Inspected before install: markdown, YAML, JSON and two PNGs; no scripts, no network calls, no credentials. Installed at `~/.claude/skills/writing-dna-skill/` (full copy, `INSTALLED_FROM.md` records provenance) and `~/.claude/skills/lieflat-less-ai-tone/` (the nested sub-skill copied to top level, because Claude Code only discovers `~/.claude/skills/*/SKILL.md`). Both appear in the session's skill list. **Windows-local** — the Mac needs the same two copies if it wants them.

What they are, precisely: `writing-dna-skill` is a *style distiller*, not a translator. Given 20+ complete articles by one author or brand it produces a six-layer `Writing-DNA.md` (language, structure, topic logic, source strategy, cognitive frame, visual style) and then writes to that DNA. `lieflat-less-ai-tone` is a whitelist-only rewriter that removes Chinese AI-writing tells (翻案腔 "不是…而是…", 顿号 list stacking, same-shape adjacent sentences, and so on) without touching structure or facts — its rule 1 is the same "not X — but Y" reversal §10 already strips on sight, so the two systems agree.

How they replace the DeepSeek paste-out, when the owner is ready:

1. EN locked → Claude translates in-session with `dodo-content-writer` + `DEEPSEEK_BRIEF.md` + `dodo-glossary.json` as the standing context (the brief was written for DeepSeek but every rule in it is model-agnostic; rename it when the switch is made).
2. Run `lieflat-less-ai-tone` on the ZH output. It is whitelist-only, so it cannot introduce vocabulary; the §10 forbidden-word screen still runs after it.
3. Optionally distill a **DODO-ZH Writing DNA** so ZH voice stays consistent across sessions. Caveat: today's ZH corpus (`marketing.zh.js`, `faq.js` ZH, `llms-full.zh.txt`, two ZH posts, the ZH guide) is DeepSeek output — distilling from it would encode DeepSeek's register, tells included. Distill after the first human-reviewed Claude batch, or from the admin's own ZH writing (XHS drafts, WeChat posts) if that exists.
4. First job for the new path: **F9** (port the research-base section into `llms-full.zh.txt`) — small, high-value, easy to review.

The `dodo-content-writer` skill's "EN → ZH handoff" section still says "paste into DeepSeek"; it was left unchanged this session because the switch is the owner's call. Two lines change when it is made.

---

## Next moves, in order

1. **Ship M1 + M2 together** (blog canonical + index from `getAllPosts`) — one PR, no copy authored, guards green; R3 decides the bylines before push. This is the highest-leverage code change in the audit: it un-orphans the pillar post the tracker is waiting on.
2. **M3 assets** (OG card + square logo) after R7 — asset work, guide-bound.
3. **S1 + S3 + S6 schema/meta pass** — one PR; S2 with R5.
4. **M4 `<html lang>`** — alone, structural.
5. **Frozen register F1–F13** — one apply-gated cascade after R1/R2, EN first, ZH via the new tooling (F9 as the pilot).
6. **G-1 `check-canon`** — build after the cascade lands, seeded with the terms it retired.
7. **Wave 6 stays the critical path** (Bing Webmaster → IndexNow; `sameAs` with the YouTube channel first; XHS/WeChat operator). O1 and O2 do not move without it.
8. **Tracker capture 2026-09-24** — full v3 matrix, incognito rules, `llm-citations/2026-09.md`.

---

## Method and traps (for the next person)

- **Measure the built output and the live origin, not the source.** Every count above comes from `out/` or `www.dodolearning.com`; source greps were used only to locate causes. §4 of `architecture-cohesion-proposal.md` applies.
- **CRLF is not drift.** The repo's text files carry CRLF on a Windows checkout; Cloudflare serves LF. A plain `diff` of `llms.txt` shows all 71 lines changed. Use `diff --strip-trailing-cr` (or compare byte sizes minus line count) before reporting drift.
- **User-agent probes do not prove verified-bot access.** Cloudflare's AI-crawler controls key on verified-bot categories, not UA strings. Read `bot_management` through the API (`ai_bots_protection`, `crawler_protection`, `is_robots_txt_managed`); the UA sweep only rules out UA-based blocking.
- **The sitemap's only live-vs-local difference is `lastmod`** (Cloudflare's build minute vs the local one) — which is itself finding S4.
- **`hrefLang` in the HTML is React's attribute casing**, valid and parsed fine; a case-sensitive grep for `hreflang=` on the HTML returns 0 and will scare you. The sitemap uses lowercase.
- **The git clone target must be a short path on this machine.** The session scratchpad is ~330 characters; `git clone` into it fails with "Filename too long". A short directory under `%LOCALAPPDATA%/Temp/claude/` works.

---

## Update · 2026-09-09 afternoon — rulings applied, instruments added, visual protocol, tooling

### Applied

Rulings R1, R2, R5, R6 were applied on the owner's "apply" as **D102–D105**, plus **M1** (the blog canonical). Build green — all fourteen guards; `content-audit` parity 0, anti-dictionary 19 (the known baseline). The post-apply sweep found **three D103 spots the staged table had missed** (`/compare` "Longitudinal knowledge" row EN+ZH, `llms-full.zh.txt:9`), so D103 is **16 spots**, not 13 — the same lesson as D99: a truncated grep is not a sweep. Committed locally as the content commit; not pushed. Frozen-register rows **F7 and F8 are closed**. **R3 (blog) and R4 (`/assessment`) stay open by the owner's decision until the GEO-skills pass below has been read; R7 (OG card) awaits the light/dark pick.**

| Built-output check | Result |
|---|---|
| city pages: `LocalBusiness` / `PostalAddress` in JSON-LD | 0 |
| home + ZH home: `youtube.com/@DODO-Learning` (schema + footer) | present, both locales |
| blog post canonical | `/en/blog/mct-language-arts-in-a-live-one-on-one-program/` (was `/blog/undefined/`) |
| `foundingDate` / bio / llms | 2020 everywhere; no `2021 she founded` survivor |
| "graduate degree" / 研究生学位 in built pages | 0 pages |

### Visual audit at the visual level — was it done, when it should be, how

**Honest status.** The first pass did not audit the visual side through a browser. It parsed built HTML, pixel-sampled the OG file, and read the live origin with `curl`. That is the right instrument for canonicals, schema and crawler access, and it found the blank card — but it cannot show how a link *renders* in a chat app, whether a rich result *displays*, or what a text-only agent *sees* versus a human. The 2026-09-03 design review (`.design/visual-review-2026-09/`) covered the human-facing visual system; this section defines the **GEO-facing** visual pass, which is a different instrument.

**Done today, through the in-app browser pane:**

- **Link-preview rendering** (opengraph.xyz, Facebook tab, `/en/`): a solid black card; the inspector flags the image ("no headline or CTA detected"), the 120-character `og:title` (X and LinkedIn truncate at ~60) and the 350-character description (~125 shown on mobile). This is M3 + S7 as a parent will actually see them.
- **Pane-as-instrument check** (live `/en/`, 1280×720): `color-scheme: light`, body and hero background `rgb(245,245,255)` = Whisper, `lang="en"`, two JSON-LD nodes — with the host preferring dark. **The 09-03 note that the pane force-darkens pages is no longer true after D98**; the pane is usable for GEO-visual work, colours confirmed by computed-style probe rather than by eye.

**When it is ideal to run (three moments):**

1. **After every deploy that touches `<head>`, OG, schema, fonts or `lang`** — a live-origin pass, because this failure class (blank OG since March, JS-only `lang`, canonical `/undefined/`) is invisible to source review and to all fourteen guards.
2. **Before/after any visual-facing GEO change, as the ruling instrument** — the OG card (R7) and the blog decision (R3) are the two pending ones; the Wave-4 practice of ruling from before/after previews applies unchanged.
3. **Monthly, alongside the citation tracker (next 2026-09-24)** — because what an engine renders drifts independently of what the repo contains (O1: Bing still shows the retired tagline).

**How (the GEO-visual protocol, ~30 minutes per pass, in-app pane unless noted):**

| # | Check | Instrument | Pass criterion |
|---|---|---|---|
| V1 | Link previews for the top six routes × 2 locales | opengraph.xyz tabs (FB, X, LinkedIn, WhatsApp, Discord); **WeChat and XHS cannot be simulated — owner shares a link in a WeChat chat and screenshots it** | card image renders, title ≤ 60 chars, description ≤ 125 |
| V2 | Rich-result and entity rendering | Google Rich Results Test on `/en/faq`, `/en/program`, `/en/credentials`, `/en/about`; `validator.schema.org`; Bing Webmaster URL inspection once #7 exists | FAQPage / Course / Person / Organization detected, no errors; screenshot kept |
| V3 | What a text-only agent sees | pane `get_page_text` and `curl` raw HTML vs the rendered page | the growth canon, prices, framework names and the founder appear in raw HTML **within the first 30% of the page** (SE Ranking: ~44% of AI citations come from that region) |
| V4 | Rendered-page probes, desktop 1280 and mobile 375 | computed-style probe: `lang`, `color-scheme`, loaded fonts (WenKai on ZH, no tofu), `og:image` `naturalWidth` > 0, `npm run check:geometry` for zero-size decoratives | all true; geometry guard 0 findings |
| V5 | Media citability | alt text **quality** (not presence — the AEO scanner failed 8/12 pages on `alt=""` decoratives), captions on stat tiles and charts, burned-in text on video thumbnails (V11 of the design review), transcripts on `/demos` footage once the YouTube IDs land | every meaningful image has a descriptive alt; every video has a transcript |
| V6 | Locale rendering of the entity | `/zh/` in the pane: title, first-mention pair 都学书院, footer YouTube link, ZH card (after R7) | ZH surfaces name the same entity the EN ones do |

### GEO auditing and optimization skills — evaluated, installed, and how to use them

Searched the official plugin catalog (nothing for GEO), the claude.ai skills directory (nothing), and GitHub. Cloned and inspected four candidates: structure, licence, scripts, external hosts, credentials, risky patterns.

| Candidate | What it is | Verdict |
|---|---|---|
| **`TheSmokeDev/geo-skills`** (MIT, last commit 2026-09-03) | 29 Agent Skills + 5 orchestrator subagents + optional Python CLI. GEO-native: index/access gates, crawlers, citability rubric, brand-mention scoring, measurement (share-of-citation panels), llms.txt, schema, platform optimizer, YouTube playbook, report. Its `ai-seo`/`seo-audit`/`schema-markup` are the marketingskills set pruned on 09-05. | **Installed — 16 `geo-*` skills + 5 agents only.** Marketing/programmatic/fleet skills deliberately skipped. |
| **`onvoyage-ai/gtm-engineer-skills`** (MIT, 2026-06-07) | `audit-website-aeo` — a Node-only crawler with 16 deterministic checks + a 6-dimension rubric; `improve-aeo-geo` — framework-aware code fixes; `audit-content` — truthfulness, fabricated-statistic and dead-link vetting for articles. | **Installed — those three.** No dependencies; `SERPAPI_KEY` only for the keyword skill (not installed). |
| **`metawhisp/best-aeo-skill`** (MIT, 2026-05-02) | 4-vector GEO Score (Technical/Citability/Schema/Entity), 12 Python evidence collectors (stdlib only, fetch the audited site), 100 rules traced to the Princeton KDD 2024 GEO paper; confidence-labelled findings. | **Installed.** Runs with `py -3 ~/.claude/skills/best-aeo-skill/scripts/audit.py --url <url> --format markdown`. |
| **`AgriciDaniel/claude-seo`** (MIT, 2026-08-26) | The heavyweight: 25 sub-skills, 18 subagents, 53 Python scripts, Google API + Bing Webmaster + IndexNow extensions, PDF/Excel reports. AI-search-first framing ("GEO is SEO fundamentals on AI surfaces", per Google's AI Optimization Guide). | **Not installed — recommended as a plugin when Wave 6 #7 starts.** It installs a `PostToolUse` hook on every Edit/Write (Python schema validator) and a Python runtime (playwright, weasyprint, google-ads…). The clean path is `/plugin marketplace add AgriciDaniel/claude-seo` then `/plugin install claude-seo@agricidaniel-claude-seo` — the owner's call, because it changes every session, not just this project. Its `seo-bing` + `indexnow_submit.py` are the exact tooling #7 needs. |
| **GEOFlow** | (unchanged) a content-ops platform, not a skill. | Not installed. |

Provenance notes (`INSTALLED_FROM.md`, commit SHAs) sit in `~/.claude/skills/geo/`, `audit-website-aeo/`, `best-aeo-skill/`. All Windows-local; the Mac needs its own copies. Entry points: `/geo audit https://www.dodolearning.com` (full orchestration — spawns five subagents; not run this session), `/geo-ai-index-access`, `/geo-citability <url>`, `/geo-brand-mentions`, `/geo-measurement` (redesign the tracker as a fixed 60–100-prompt panel with share-of-citation per engine), `/audit-website-aeo`, `/audit-content` (vet any post before it ships — the blog problem, mechanised), `/improve-aeo-geo` (code fixes; the apply-gate still governs).

### What the new instruments found (run today against the live origin)

**`audit-website-aeo` (deterministic, 12 pages):** foundational **89/100**, 14/16 checks; provisional grade **B+**.

| Failed / weak | Detail | Read |
|---|---|---|
| Image alt coverage — 4/12 pages pass | the checker wants a non-empty `alt` on every `<img>`; the site's decoratives carry `alt=""` by design (D83) | not a defect, but every AEO scanner will score it — give meaningful images descriptive alts (hero paintings, Navigator photos) and keep `alt=""` only for true ornament |
| No RSS/Atom feed | `/feed.xml`, `/rss.xml`, `/atom.xml` all 404 | only worth building if the blog survives with a cadence (R3) |
| Freshness 45/100 | 0% of pages carry a date signal; no `dateModified` anywhere except the citation nodes on `/credentials` | add `dateModified` (ISO-8601) to the WebSite/Course/Article nodes from a content-version constant bumped on cascades — copy-free |
| Answer readiness 68/100 | 17% of pages have question-form headings; 75% lead with definitions | see citability below |
| Evidence density 72/100 | 92% of pages carry numbers; **0% author attribution** | Person exists only on `/about`; add `author`/`reviewedBy` = Janet (`#founder`) to the methodology, Lexile and credentials nodes — copy-free |

**`best-aeo-skill` (4-vector, per page):** `/en/` **79/100**, `/en/methodology/` **79**, `/en/faq/` **84** — Technical 100 · Citability 83 · Schema 50 (75 on FAQ) · Entity 80. Findings, confidence-labelled: FAQPage schema only on `/faq` (Rule 36: FAQ blocks are the highest-citation surface; `/program`, `/methodology`, `/little-dodo` each have natural Q&As); no author markup on content pages (Rule 41, "anonymous authorship reduces citation rate ~60%"); Organization `sameAs` without Wikidata/Wikipedia (Rule 42 — YouTube is now in; a Wikidata item is the next entity anchor); no `dateModified` (Rule 17); **"452 statistics but 4 external citations"** on the home page (Rule 12: Perplexity filters uncited statistics — the counter is crude, but §11's proof numbers carry no provenance line: cohort size, dates, instrument).

**Index + access gates (`geo-ai-index-access`):**

| Gate | Status | Evidence |
|---|---|---|
| 1 Bing indexation + IndexNow | **partial** | Bing `site:` returns "about 1,750 results" (inflated by variants — the site has 120 routes, 38 in the sitemap), so indexed; Webmaster Tools verification unknown from here and IndexNow absent — Wave 6 #7 |
| 2 AI crawler access | pass | H1 (Cloudflare API) + H3 |
| 3 Preview control | pass | no `nosnippet`, `max-snippet` or stray `noindex` on citable pages (built HTML grep) |
| 4 Server-rendered HTML | pass | static export; key claims in raw HTML (H8) |
| 5 Google side | pass, unverified in Console | pages appear in search; Search Console is Wave 6 #8 |

The skill caps the score at 40 while Gate 1 is not fully passed — its ordering matches the May council: **Bing Webmaster + IndexNow before any more content work.**

**Citability (rubric applied to built EN pages):** definition-pattern openers exist (methodology 11, about 9, compare 8, faq 7); question-form H2s are almost absent outside the FAQ (0–1 per page); standalone 40–170-word paragraphs per page: 3–14. Proposal (copy → apply-gated, and a first job for the ZH tooling): on `/methodology`, `/lexile` and `/program`, open each H2 with a 40–60-word answer-first paragraph and rephrase two or three H2s per page as the question a parent asks. Structure and voice rules in §08 already permit this; it is the "citation block" pattern every one of the four skills converges on.

**Brand mentions / entity (rubric from `geo-brand-mentions`, web-search sweep):**

| Platform | Found | Rubric band |
|---|---|---|
| YouTube | channel exists, unlinked until today; third-party mentions 0 | 30–49 |
| Reddit | 0 | 0–9 |
| Wikipedia / Wikidata | 0 | 0–9 |
| LinkedIn | no company page found | 0–9 |
| 小红书 / 微信 / 知乎 | none found through web search (walled platforms — owner to check directly) | unknown |
| Reviews / directories | 0; only job-board scrapes of a DODO teacher posting (expertini.com) | 0–9 |

Composite well under 20/100. **Entity collisions are worse than the audit's O2 stated:** "Dodo Learning" is also Dodo Brands' iSpring LMS *and* a knomary HCM app; **都学** is Doxue (都学课堂, an MBA-prep brand) in every ZH result; "The Dodo" is an animal-media site. Both names DODO owns are already occupied in their respective indexes. Consequences: (a) `alternateName` on the Organization node should carry `都学书院` and `DODO Learning Canada` (the YouTube channel's name); (b) a Wikidata item with `official website`, `founded 2020`, `founder Janet`, `instance of: educational organization` is the cheapest disambiguation anchor; (c) every off-site profile should use the identical pair "DODO Learning · 都学书院".

### `check-canon` — what already exists

**A partial function exists: `scripts/content-audit.mjs`.** Pass A checks EN/ZH key parity of `marketing.{en,zh}.js`; Pass B scans `marketing.*`, `faq.js`, `cities.js`, `public/llms.txt` and `public/llms-full.txt` against the ZH forbidden list in `dodo-glossary.json` and a hard-coded EN anti-dictionary (§10). It **reports and never fails**, is **not in `prebuild`** (run by hand: `node scripts/content-audit.mjs`; the README says so), and today returns 19 hits that are all accepted strategic contrasts. It does **not** scan `public/llms-full.zh.txt`, `lib/schema.js`, `lib/metadata.js`, page metadata under `app/`, or the blog MDX — the surfaces where every drift in this audit lived — and it has **no retired-terms list** (16-Week Program, Poodle, 9 levels, LCS 教学系统, 学习循环, 全球流动, Think Once. In Both, Janet Sui, graduate degree, 2021 she founded, grades 3–8). Nothing else in the toolchain does this (no `vale`, `textlint` or `cspell` in `node_modules`); of the installed skills, `audit-content` vets a *draft* against a brand file — useful for posts, not a build guard.

**So G-1 is an extension, not a new script:** add a `retired_terms` block (EN + ZH) to `dodo-glossary.json` as the single source; add Pass C over the machine surfaces and MDX; add `--strict` that fails on any retired-term hit while anti-dictionary hits stay informational; wire `npm run check:canon` into `prebuild` as the 15th guard. Seed the list with the terms retired by D99, D102–D105 and the Flex 3 ruling. It would have caught S2, S3, F1–F3, F7 and F8 at build time.

### Next moves, revised

1. **R7 pick** (light or dark card) → wire H1–H4; re-run V1 (opengraph.xyz) to verify — the first item on the visual protocol.
2. **R3 and R4** — the owner reads this section, then picks; `audit-content` becomes the gate for any future post.
3. **Copy-free schema pass** (one PR): `dateModified` on the page-level nodes, `author`/`reviewedBy` → `#founder` on methodology/lexile/credentials, `alternateName` += 都学书院 + DODO Learning Canada, FAQPage nodes on `/program`, `/methodology`, `/little-dodo` drawn from the existing FAQ data. Then S1/S3/S6 from the first pass.
4. **Wave 6 #7 first** (Bing Webmaster + IndexNow), then #8, then the Wikidata item and the XHS/WeChat profiles for `sameAs`.
5. **G-1 `check-canon`** as an extension of `content-audit.mjs`.
6. **Citability copy pass** on `/methodology`, `/lexile`, `/program` (apply-gated; ZH through the new tooling).
7. **Tracker 2026-09-24** — consider `geo-measurement`'s panel design (fixed 60–100 prompts, repeated runs, share-of-citation per engine) before the capture.
8. Descriptive alts on meaningful images; RSS only if the blog keeps a cadence.

---

## Update 2 · 2026-09-09 evening — "proceed as proposed" executed; R7 ruling sheet; R3 elaborated

### What shipped (build green, fifteen guards)

| Item | What | Record |
|---|---|---|
| **Canon guard** — G-1 | `scripts/check-canon.mjs`, retired-terms list in the glossary (EN 21 · ZH 15), first in `prebuild`. **Caught 34 survivors on its first run** — 14 compact-city ZH subheadings on the superseded "LCS 教学体系", the ZH FAQ and both Terms pages still naming "16周课程 / 十六周课程 / 16-Week Program", two aria-labels, two stat labels, two testimonial quotes, one placeholder bio — all fixed. | D106 |
| **IndexNow** — half of Wave 6 #7 | key file at the site root, `npm run indexnow` posts the sitemap + ZH alternates + llms files after a deploy. First submission after the next push goes live. Bing Webmaster verification stays with the owner. | D107 |
| **Copy-free machine layer** | `dateModified` on page nodes · founder as `author` / `reviewedBy` · `alternateName` += 都学书院, DODO Learning Canada · Course/FAQ/credentials/city nodes locale-aware with ZH names from existing meta · S1 grade band · S2 city metadata localised (retired name gone) · S3 FAQ metadata localised. FAQPage nodes on pages without visible Q&A **not** added (policy). | D108 |
| **Frozen register** F1–F6, F9–F11, F13 | llms-full EN+ZH re-canonised; **research base ported to ZH** (F9, the first in-session ZH surface); llms.txt last-updated + `/consult`. **F12 held** — three outcome figures are not in §11. | decision-log § Frozen register |
| **R7 ruling sheet** | three compositions × two locales, rendered as WeChat chat card, Moments thumbnail, LinkedIn/Facebook, X dark, iMessage — the WeChat 1:1 centre-crop is the decisive frame. A centred candidate (C) was added because A and B lose the wordmark and the start of the tagline in that crop. | `.design/og-card-2026-09/` + the ruling artifact |

### R7 — what the mock-up shows

WeChat and Moments crop the `og:image` to a centre square. Candidates A and B place the wordmark top-left and the tagline bottom-left, so the crop keeps only the middle of the eyebrow and a fragment of the tagline. Candidate C keeps everything inside the centre 600 px and survives every frame whole. Full-width cards (LinkedIn, Facebook, X, iMessage) render all three well; B reads as a dark block on dark chat UIs, which is the failure being replaced. **Recommendation: C for both locales.** After the pick: H1–H4 wiring, then V1 (opengraph.xyz re-scan and one link shared in WeChat).

### R3 elaborated — the blog decision

**What the posts actually contain (checked 2026-09-09).**

| Post | Byline | Words | External links | Sources named | Register | Accuracy |
|---|---|---|---|---|---|---|
| `lexile-asymmetry-bilingual-children` (2026-03-10, EN+ZH) | "Dr. Sarah Chen" / 陈博士 — fictional | 955 | **0** | none | "intervene/intervention" ×8, "ESL support" framing; ZH 干预 ×7 | generic; no data |
| `what-does-lexile-score-mean` (2026-03-08, EN+ZH) | "Michael Torres" — fictional | 809 | **0** | none | "intervention" ×4; ZH 干预 ×5 | **states the stretch zone as 50–100L *above* the reader's measure; MetaMetrics defines the reader's range as 100L below to 50L above** — the post inverts the framework it explains |
| `mct-language-arts-in-a-live-one-on-one-program` (2026-08-26, EN only) | Janet | 1,878 | **0** | Gallagher 2017, Goodwin & Ahn 2010/2013, Bowers 2010, Henry 1997 — named, not linked | on-brand, §07a frame | sound; the citations are the guide's own |

Plus the index page: five dead links, a "Navigator picks" persona, 31 stock hotlinks, an unverified "500+ diagnostic calls". No blog URL appeared in the Bing-backed or web-search samples; `/en/lexile/` did. The cadence planned in May ("one pillar post every two weeks") never started.

**What a blog buys in GEO terms, and only under conditions.** Three things: topical authority for the help-intent prompts (Tier B: writing improvement, IB/AP readiness, SSAT, vocabulary through classics, bilingual-to-academic writing); citable, dated, authored long-form that an engine can quote; and freshness signals. Every instrument installed today scores exactly these dimensions, and the blog fails all of them as it stands — 0% date signals, 0% author attribution outside `/about`, statistics without citations. A shell with one real post delivers none of the three and signals abandonment; the March posts subtract, because an engine that finds an inverted Lexile definition on the domain has a reason to distrust the domain for Lexile queries (tracker A7).

**Four options, with consequences.**

| | A · Retire everything | B · Prune to the MCT post | C · Retire `/blog`, re-home MCT as an evergreen page | D · C plus consolidation into `/lexile` |
|---|---|---|---|---|
| MCT asset (A6/A8) | **lost** | kept, index links it | kept at `/en/mct-language-arts/`, linked from `/credentials` + `/methodology`, citations linked, `dateModified` | same as C |
| Lexile posts | deleted, 301 → `/lexile/` | deleted, 301 → `/lexile/` | deleted, 301 → `/lexile/` | **substance salvaged**: two rewritten sections on `/lexile/` — bilingual asymmetry; what a score means and how it moves, with the stretch zone corrected — 301s to the matching anchors |
| Fabricated layer | gone | gone | gone | gone |
| Tracker A7 (Lexile) | — | — | — | **`/lexile/` becomes the parent-intent Lexile answer**, on the one page already earning search presence |
| Freshness signal | none | a dated blog with March/August entries reads dormant | evergreen page, `dateModified`, no cadence implied | same |
| ZH | — | MCT post has no ZH; fallback notice | same; first ZH job after F9 | same, plus the two `/lexile/` sections translated through the new tooling |
| Copy authored | none | none | none (labels removed) | **two sections of new copy** — apply-gated; a natural pilot for `audit-content` and the ZH path |
| Effort | 1–2 h | ~2 h | ~3 h | ~4–5 h |

**Recommendation: D.** It keeps the only real article, removes the fabricated layer, corrects a factual error that is live today, and strengthens the page that already earns visibility instead of splitting Lexile authority across three thin URLs. It also removes the "Blog" promise from the chrome until a cadence exists.

**When to bring the blog back.** When a post ships every two weeks for a quarter, each passed through `audit-content` (fabricated statistics, dead links, brand-DNA contradictions) and carrying a real author (Janet or a named Navigator), `datePublished`/`dateModified`, linked sources and an RSS feed. Name it "Writing" rather than "Blog". Until then, the evergreen pages carry the authority.

**Decision tree for the owner.**

1. Will a post ship every two weeks for the next quarter? **Yes → B** (keep the route, prune, add RSS, dates, authors). **No → C or D.**
2. Are the two Lexile topics worth keeping? **Yes → D. No → C.**
3. Either way: M1 is already shipped; under C/D the nav and footer "Blog" links come off; `audit-content` gates any future post; the ZH MCT translation is the first job after F9.

**R4 stays open** as ruled; nothing above depends on it. The `/assessment` shell is unaffected by any of A–D.

### Next moves, revised again

1. **R7 pick** from the ruling sheet → H1–H4 → V1.
2. **R3 pick** (A/B/C/D above; D recommended) → the blog change as its own commit; **R4** stays open.
3. **Push** the pending commits; then `npm run indexnow` once the deploy is live; then verify on opengraph.xyz and by sharing one link in WeChat.
4. **Bing Webmaster Tools verification** (owner) — unlocks the Copilot AI Performance report; **Search Console** next.
5. **Visible FAQ blocks** on `/program`, `/methodology`, `/little-dodo` drawn verbatim from `faq.js` (+ FAQPage nodes) — before/after preview for a ruling; zero new copy.
6. **Citability copy pass** on `/methodology`, `/lexile`, `/program` — answer-first openers, question-form H2s; drafted for apply, ZH through the in-session path.
7. **Wikidata item** + XHS/WeChat profiles for `sameAs` (owner-side accounts).
8. **Tracker 2026-09-24**, with the `geo-measurement` panel design.

## Update 3 · 2026-09-09 session close — R7 ruled and wired; the one list; handoff to the Mac

### R7 → D109, wired (H1–H4)

Owner's ruling: **white, centred** = candidate C for both locales. Shipped: `public/og-default.png` is the EN card (old name kept so cached references update), `public/og-zh.png` the ZH card; `OG_IMAGE_DEFAULT` per locale in `lib/metadata.js` with `image = ogImage ?? OG_IMAGE_DEFAULT[locale]`; `Organization.logo` → `web-app-manifest-512x512.png` (512 × 512); `articleSchema`'s fallback image follows the locale. Fifteen guards green. **M3 closed.**

**V1 (post-deploy, 2026-09-09 late):** verified from the live origin, not through a third-party scanner — opengraph.xyz was rate-limiting (HTTP 429) and the in-app browser pane refused external navigation this session. Verified: `/en/` and `/zh/` serve `og:image` → `og-default.png` / `og-zh.png` with per-locale `og:image:alt` and `twitter:image`; inner pages (`/en/methodology/`, `/zh/faq/`) follow the locale; both PNGs return 200 `image/png` and are byte-identical to the repo (sha1 `60b53cb…` EN, `1795632…` ZH); the served images, inspected: light ground, centred lockup, eyebrow pair, tagline per locale, domain — candidate C as ruled. The live Organization `logo` is the 512 px mark. IndexNow re-submitted after the deploy (79 URLs, HTTP 200). **Still the owner's:** share one `/en/` and one `/zh/` link in WeChat (chat + Moments) and re-scan both on opengraph.xyz once it stops rate-limiting; WeChat's cached card can take up to a day to refresh.

### The one list

Every open call now lives in [`ADMIN_RULINGS.md`](ADMIN_RULINGS.md) — § A unblocks drafted work (blog A1, `/assessment` A2, F12, visible FAQ blocks, citability pass, image alts), § B the seven Level 2 decisions + XHS CTA vs D29, § C owner-side accounts and assets (Bing WMT, Search Console, `sameAs` URLs, Wikidata, media, bios, D13 leftovers, the logo lockup question, the 2026-09-24 tracker). The "Next moves" lists above are superseded by it.

### Handoff

Windows is out of the repo after this push. The cross-machine handoff is `DLCW/_handoffs/2026-09-09_windows-to-mac_session-close-geo.md` (what changed on `main`, six things that bite, skill copy commands with pinned commits, sync state); `docs/SUCCESSOR_HANDOFF.md` is refreshed; `_handoffs/TODO.md` carries the three cross-machine items (skills parity optional, Level 2 not approved to build, IndexNow/CJK routine).
