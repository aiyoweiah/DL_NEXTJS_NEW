# DODO Learning — SEO + GEO Workflow

**Created:** 2026-05-11
**Status:** Tier 1 ✅ shipped. Tier 2 ready to start.
**Repo:** `aiyoweiah/DL_NEXTJS_NEW` (deploys to dodolearning.com via Cloudflare Pages + dodoletterhouse.com via Vercel from the same `main` branch)

This doc is the source of truth for the SEO + AI-crawl (GEO) initiative. Update it after every working session.

---

## 👋 Successor handoff — start here

If you're picking this up cold:

1. **Read this whole file** (it's short).
2. **Read the LLM Council session output** in the transcript that produced this plan (2026-05-11) — it explains why the plan is shaped this way. Key insight: the council called DODO's bottleneck "no off-site mention graph," not technical SEO. Tier 1 technical fixes are hygiene; Tier 3 off-site mention work is where the real lift comes from.
3. **Read the baseline:** `docs/llm-citations/2026-05-baseline.md` — DODO is currently uncited across all queried LLMs for premium bilingual-English-program queries. That's the measurable problem we're solving.
4. **Check `Open Decisions` below** — the user still needs to resolve several of these before Tier 2 work can proceed.
5. **Tier 2 work order is in this doc** — but don't start it until the user re-runs the citation baseline and confirms the strategic decisions.

**Important context not obvious from code:**
- The site uses `output: 'export'` and deploys the same artifact to both Cloudflare Pages and Vercel. Anything you build must work statically (no API routes, no middleware — see `docs/proxy.example.js` for the dormant proxy/middleware blueprint).
- `content/faq-en.js` and `content/faq-zh.js` are **duplicated** from `components/faq/FAQClient.jsx` (which holds the JSX-rich UI version with inline links). This duplication is intentional Tier 1 tech debt. Tier 2 should consolidate using markdown-link syntax + a small client renderer so there's a single source of truth. Sync risk until then: if pricing or copy changes, update BOTH files.
- The ZH FAQ had 9 typos (`的N周` for `第N周`, plus 邐 and 硈 wrong chars) that were live to users until 2026-05-11. Be vigilant about ZH typos elsewhere on the site — translator brief is at `translation/DEEPSEEK_BRIEF.md`.
- The user's GitHub identity is `aiyoweiah` / `hsinkwu@gmail.com`. Git config is NOT set globally — use `git -c user.email=hsinkwu@gmail.com -c user.name=aiyoweiah` for commits, or ask the user to configure their git.

---

## Goal & Measurement

**Goal:** By **2026-09-01**, DODO Learning is named in the answer when these 8 parent-shopping prompts are asked of ChatGPT / Claude / Perplexity / Gemini.

**The 8 prompts:** _TBD by user — see "Open decisions" below._

**Measurement cadence:** Monthly. Screenshots stored in `docs/llm-citations/YYYY-MM.md`.

---

## Baseline (2026-05-11)

A multi-LLM survey was run against 6+ parent-shopping prompts covering Vancouver (EN), Vancouver (ZH), Toronto, and online-only premium English programs for Chinese-speaking families with Grade 3–9 children.

**Source:** `C:\Users\hsink\Documents\DODO_web\GEO Survey Result.txt` (1,013 lines)

**Finding:** **DODO Learning is mentioned 0 times across all responses.**

Competitors named (incomplete list):
- **Vancouver EN:** Reading Town, Gaines Writing Institute, LWL Education, Mulgrave School, Oxford Learning, IH Vancouver, UBC Extended Learning
- **Vancouver ZH:** Yan Yuan (燕园), Wise House, Native English Ltd, Zhong Xiao (中小学英语), Pear Tree, GVE, LingoAce, Oxford C&W, Walawala, EIC, Write Edge, 伊莱英语 (Elan)
- **Toronto:** Power Of Words, Write Up Your Alley, Centauri Arts, Lumia, Moca International, The Literacy Academy
- **Online:** Learn To Write Now (+ others past line 600)

**Implication:** This validates the council's strongest critique — the bottleneck is not technical SEO. It's that DODO has no off-site mention graph. LLMs don't cite entities they've never seen referenced by third parties. The technical fixes are still worth shipping (they remove friction once mentions exist), but the dominant work is entity-building.

---

## Plan Structure

Three tiers, restructured per LLM Council session (2026-05-11):

- **Tier 1 — Ship this week (~4 hrs).** Technical hygiene. Independent of strategic question.
- **Tier 2 — 2–4 weeks.** Verification + entity-building. Restructured around branded-search SERPs.
- **Tier 3 — Ongoing.** Content velocity (pillar pieces, not high-frequency thin posts) + off-site mention graph.

**Cut from the plan:**
- ❌ Baidu / Sogou / 360 Search (40-hour project, requires dedicated ZH operator + ICP filing).
- ❌ Wiring all 110 FAQ Q&As to schema (curate to top 20).
- ❌ 14 blog posts in 12 weeks (replaced by 6 pillar pieces + one programmatic batch launch).

---

## Tier 1 — This Week

### Claude Code's part

| ID | Action | Status |
|---|---|---|
| A | Wire FAQ schema — pass full Q&A list (50 EN + 50 ZH) to `faqSchema(items)` for both locales | ✅ done. `content/faq-en.js` + `content/faq-zh.js` server-safe data modules created. 50 Questions emit on each locale's FAQ page. (User overrode council recommendation to curate to top 20 — wired the full list as instructed.) |
| B | Fix `articleSchema` locale — accept `locale` param, emit correct `inLanguage` for `/zh/blog/*` | ✅ done |
| C | Add `WebSite` + `SearchAction` schema site-wide | ✅ done |
| D | Draft `public/llms.txt` and `public/llms-full.txt` — user reviews | ✅ drafted, awaiting user review before push |
| E | Add IndexNow API key file to `public/` | ⏸ blocked on user Bing registration |
| F | Populate `sameAs` in `educationOrgSchema` with social URLs | ⏸ blocked on user-provided URLs |
| G | Set up citation tracker (`docs/llm-citations/`) — baseline `2026-05-baseline.md` captured | ✅ done |
| H | Build `Person` schema for founder/Navigator + add to `/about` author entity | ⏸ blocked on founder bio decision |
| I | Final clean-build verification + push readiness | ✅ build clean at 2026-05-11 |

### User's part

| ID | Action | Status |
|---|---|---|
| 1 | Citation baseline | ✅ done (see `GEO Survey Result.txt`) |
| 2 | Answer strategic question: **verification (premium, fewer-better leads) vs discovery (volume-of-leads)** | ⬜ pending |
| 3 | Register Bing Webmaster Tools, submit sitemap | ⬜ pending |
| 4 | Verify Google Search Console for both domains | ⬜ pending |
| 5 | Confirm GA4 is running on both domains, note measurement IDs | ⬜ pending |
| 6 | Provide social profile URLs (Xiaohongshu, WeChat, IG, LinkedIn) — or "skip" | ⬜ pending |
| 7 | Decide founder-authorship strategy + send name/bio/credentials if individual | ⬜ pending |
| 8 | Define the 8 baseline parent-shopping prompts for monthly tracking | ⬜ pending |
| 9 | Push the cleanup commit `d89fb77` (or wait for Tier 1 to bundle in one push) | ⬜ pending |

---

## Tier 2 — Weeks 2–4

**Updated 2026-05-11:** Tier 2 has been restructured around what Tier 1 + council session surfaced. The original "curate top 20 FAQ" task was overridden — the user chose to wire the full 50 EN + 50 ZH (already shipped). New top priority: founder Person entity (council called it the highest-leverage missing piece).

### Claude Code's part (in priority order)

1. **Refactor FAQ duplication** — `content/faq-en.js` + `content/faq-zh.js` currently duplicate `components/faq/FAQClient.jsx` data. Use markdown-style inline link syntax in the data files + small client renderer in FAQClient. Single source of truth.
2. **Founder/Navigator Person schema** — wire `Person` schema for the named expert (pending user decision; see Open Decisions). Add `author` field to every blog post + a richer `/about` author block. Council's top-leverage recommendation.
3. **Credentials page** — `/about/credentials` (or new `/credentials`). MCT directly attributed to Michael Clay Thompson; Harvard PZ (HGSE); 6+1 Trait (Education Northwest). Each as structured `EducationalOccupationalCredential`.
4. **6 verification-search city pages** — `DODO Learning [City]` post-referral search targets. Distinct from existing `/cities/[city]` (which target discovery). Pick 6 of the 18 cities now in `areaServed`; user picks which.
5. **4 comparison pages** — `/vs/private-tutor`, `/vs/outschool`, `/vs/kumon`, `/vs/eye-level`. Honest tradeoff tables, schema'd as standalone Articles.
6. **AEO snippets** — 40–80-word standalone definitions at top of `/methodology`, `/lexile`, `/faq`. Designed for verbatim LLM lift.
7. **Internal linking audit** — methodology ↔ lexile ↔ results cross-links; every page → /faq + /consult.
8. **City pages for the new cities** in `areaServed` (Burnaby, Coquitlam, Calgary, Mississauga, Richmond Hill, San Jose, Cupertino, Irvine, Bellevue, NYC, Boston, Houston) — only if user wants them. Otherwise the cities stay in service-area schema only.
9. **One-shot programmatic launch**: 36 city × grade pages (6 cities × 6 grades, ages 3–8). Council flagged thin-content risk — must be genuinely differentiated, not template-substituted.
10. **Self-containment audit** on all 50 EN + 50 ZH FAQ answers (council requirement). Each must read in isolation.

### User's part

- **Re-run the citation baseline** at end of week 4 — same 8 prompts × 4 LLMs. Compare to `docs/llm-citations/2026-05-baseline.md`. Has DODO started appearing? Logged as `docs/llm-citations/2026-06.md`.
- **Approve drafts** of city-verification pages and comparison pages.
- **Decide on Xiaohongshu / WeChat strategy and operator** — until this is decided, the diaspora-Chinese-parent channel stays unaddressed.
- **Provide per-page OG images** (or approve text-based fallbacks) for top 6 pages + each city.
- **Resolve remaining Open Decisions** below.

---

## Tier 3 — Ongoing

- Monthly LLM citation review (user) — same 8 prompts × 4 LLMs, log in `docs/llm-citations/`
- 1 pillar blog post every 2 weeks (NOT 1/week) — 2,000+ words, named author, full Article schema
- Xiaohongshu content cadence (per operator decision)
- **Off-site mention building** — the council's strongest critique. Pick a channel: parenting-newsletter sponsorships / podcast guest appearances / school-counselor outreach / education-directory listings / Reddit r/asianamerican / r/Parenting engagement. Claude Code can prep outreach templates.

---

## Open Decisions

These block downstream work. Updated 2026-05-11.

| # | Decision | Status |
|---|---|---|
| 1 | Verification vs Discovery — strategy | ✅ Hybrid (premium with quota per cohort; quality > volume) |
| 2 | Price point — locked? | ✅ Full $2,250 / Starter $1,185 / weekly from $74 |
| 3 | Founder/Navigator named-expert identity (Person schema) | ❌ Pending — needs name + bio + credentials, or "skip" |
| 4 | Xiaohongshu / WeChat operator + cadence | ❌ Pending |
| 5 | The 8 monthly-tracked prompts | ❌ Pending — Claude proposed 8 in Tier 1 session; awaiting confirmation |
| 6 | Off-site mention channel for Tier 3 | ❌ Pending — newsletters / podcast guesting / school-counselor outreach / education directories / Reddit |
| 7 | Bing Webmaster Tools registration | ❌ Pending — blocks IndexNow integration |
| 8 | Google Search Console verification + GA4 IDs | ❌ Pending |
| 9 | Social profile URLs for `sameAs` | ❌ Pending |
| 10 | Cities list approval (18 cities now in `areaServed`) | ❌ Pending — user said "expand," Claude proposed 18; needs explicit OK or edits |
| 11 | City pages for new cities — build or just list? | ❌ Pending |

---

## Operating Rules

- This workflow doc is the single source of truth. Update statuses after each session.
- All technical changes ship in `main` and auto-deploy to both Cloudflare Pages and Vercel. Both hosts must remain compatible (`output: 'export'`).
- Voice: never imply tutoring / ESL / remediation (per `translation/DEEPSEEK_BRIEF.md`).
- LLM citation tracker entries go in `docs/llm-citations/YYYY-MM.md` with screenshots.

---

## Reference Docs

- Council session output: in the conversation transcript that produced this plan (2026-05-11)
- Baseline survey (raw): `C:\Users\hsink\Documents\DODO_web\GEO Survey Result.txt` (outside the repo, user-side workspace)
- Baseline summary: `docs/llm-citations/2026-05-baseline.md`
- Translation/voice brief: `translation/DEEPSEEK_BRIEF.md`
- Dormant middleware (when moving to server runtime): `docs/proxy.example.js`

---

## Session Log

### 2026-05-11 — Initial setup + Tier 1 ship

**Did:**
- Cloned `DL_NEXTJS_NEW` to local dev. Set up Node/npm; verified `npm run dev` boots.
- Cleanup commit `d89fb77`: moved `proxy.js` → `docs/proxy.example.js` to silence Next.js 16 middleware warning; removed unused `app/globals.css`; mirrored Vercel `/en/the-hangar/` + `/zh/the-hangar/` 301s; corrected stale `middleware.js` doc references to `proxy.js`; dropped stale `./pages/**/*` from tailwind config; adopted Next.js 16 auto-applied tsconfig changes.
- Audited SEO + GEO state. Validated against an LLM Council session.
- Ran citation baseline review (user's `GEO Survey Result.txt` — DODO 0/6+ queries).
- **Tier 1 ship commit** (this one): FAQ schema wired with 50 EN + 50 ZH; WebSite schema; articleSchema locale fix; llms.txt + llms-full.txt; expanded `areaServed` to 18 cities; pricing copy updated for new tiers ($2,250 / $1,185 / weekly from $74); 9 ZH typos fixed.

**Did NOT do (intentionally — Tier 2 work):**
- Founder Person schema (pending user decision on named expert).
- Refactor `content/faq-*.js` duplication with `FAQClient.jsx` (deferred to Tier 2 to ship Tier 1 faster; sync risk noted).
- Verification-search city pages, comparison pages, AEO snippets, credentials page, programmatic city × grade launch.
- Bing Webmaster / GSC / GA4 setup (requires user account access).
- IndexNow API key file (requires Bing key from user).
- `sameAs` social profile URLs (pending user input).

**For next session, start by checking:** Open Decisions table above. Resolve at least #3 (founder identity) before starting Tier 2 work item 2 (Person schema).
