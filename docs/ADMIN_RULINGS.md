# Admin rulings — the one list

**Maintained:** 2026-09-09 (Windows hub session close) · **Owner:** admin · **Rule:** every open call anyone is waiting on lives here, once, with what is being asked, the recommendation, the default if nothing is said, and where the detail is. Sessions add rows; only the admin closes them. `decision-index.md` § Open mirrors the D-numbered ones.

## A · Rulings that unblock work already drafted

| # | Ruling asked | Recommendation | Default if unruled | Detail |
|---|---|---|---|---|
| A1 | **Blog (R3):** A retire · B prune to the MCT post · C retire `/blog`, re-home the MCT article as an evergreen page · D = C + fold the two Lexile posts into `/lexile` (corrected) | **D** | the scaffold index with five dead links and fictional bylines stays live | `geo-audit-2026-09.md` § Update 2 "R3 elaborated"; `content-review/05-…` § F |
| A2 | **`/assessment` (R4):** repurpose as a second contact page, build the Lexile-baseline explainer (G-1), or `noindex` the shell now (G-2) | **G-2 now, G-1 when copy budget exists**; not a contact page | an under-construction page stays indexable | `content-review/05-…` § G |
| A3 | **F12 — outcome figures not in §11:** "2× writing gain", "10,000+ hours", "8 of 10 continue" on `llms-full` | add to §11 with source and cohort, or drop | they keep shipping unsourced | `geo-audit-2026-09.md` § Frozen register F12 |
| A4 | **Visible FAQ blocks** on `/program`, `/methodology`, `/little-dodo` drawn verbatim from `faq.js` + FAQPage nodes (zero new copy; a layout addition) | approve a before/after preview | invisible-FAQ schema stays deliberately absent (policy) | decision-log D108 "deliberately not done" |
| A5 | **Citability copy pass** on `/methodology`, `/lexile`, `/program`: answer-first openers, question-form H2s | draft for apply, ZH in-session | pages stay narrative-first | `geo-audit-2026-09.md` § Update "Citability" |
| A6 | **Descriptive alts** on meaningful images (hero paintings, Navigator photos) vs D83's decorative `alt=""` | descriptive where the image carries meaning | AEO scanners keep failing 8/12 pages on alt coverage | `geo-audit-2026-09.md` § Update instruments |

## B · Level 2 blog automation — the decisions before it is built

| # | Decision | Recommendation | Detail |
|---|---|---|---|
| B1 | Author of record for the pilot | Janet only; named Navigators opt in later | `blog-automation-level2-method.md` § 10 |
| B2 | Cadence ceiling | two posts a month, every second Monday | same |
| B3 | Images | painted series only, or agent-made editorial art (`mono-color`) allowed | same |
| B4 | Where posts live | blog returns as "Writing" (with A1 = B or D) or pilot posts ship as evergreen pages | same |
| B5 | Routine host | Claude Code scheduled agent (simplest) or GitHub Actions cron | same |
| B6 | Notification channel | Lark (existing client) or email | same |
| B7 | Social repurposing | on by default in plan rows, or off until B8 | same |
| B8 | **XHS assessment CTA vs D29** (open since 2026-08-26) | carve-out or consult-shaped rewrite (both drafted 2026-09-05) | BCG §13 ⚠️ |
| B9 | **Approval to build** Level 2 (week-1 scaffolding, then the three-post Level 1 pilot) | approve after B1–B7 | `blog-automation-level2-method.md` § rollout |

## C · Owner-side accounts and assets (nothing in the repo can do these)

| # | Item | Why it matters | Detail |
|---|---|---|---|
| C1 | **Bing Webmaster Tools verification** (Wave 6 #7, the other half) | unlocks the Copilot AI Performance report; IndexNow is already live | `workflow.md` Tier 1 row E, Open Decision 7 |
| C2 | **Google Search Console + GA4 IDs** (Wave 6 #8) | all measurement | Open Decision 8 |
| C3 | **XHS / WeChat OA profile URLs** for `sameAs` (Wave 6 #9); YouTube is in | entity disambiguation — "Dodo Learning" and 都学 both collide | audit O2/O3 |
| C4 | **Wikidata item** (official website, founded 2020, founder Janet, instance of educational organization) | the cheapest entity anchor an engine reads | audit § brand mentions |
| C5 | XHS / WeChat operator + cadence (Wave 6 #4) · off-site mention channel (Wave 6 #6) | Tier 3 — the dominant work per the May council | `workflow.md` |
| C6 | YouTube IDs for `/demos` (Wave 6 #12) · founder video embed URL for `/compare` · V9 imagery · V4 demo footage | dead-looking media on funnel pages | `completion-plan.md` Wave 6 |
| C7 | Ms. Kimberly's bio verification · WeChat handle (`__PLACEHOLDER__`) | unverified copy live | Wave 7 |
| C8 | D13 leftovers: `/faq` pricing figures re-verification · does §10 reach `/partners` "GPA Navigation" · `/ops` tier naming | pricing is the only public price surface | `decision-index.md` § Open |
| C9 | Home hero `consultHook` visibility (Wave 6 #15) | reported 2026-05-21, never verified on the live site | Open Decision 15 |
| C10 | **Logo lockup:** `logo.svg` reads "DODO LANGUAGE · 都学语言"; the brand's first-mention pair is "DODO Learning · 都学书院". Intentional? | the wordmark is on every page and now on the OG card | flagged 2026-09-09, unanswered |
| C11 | **Tracker capture 2026-09-24** — full v3 matrix, incognito rules; consider the `geo-measurement` panel design first | the only measurement of the whole effort | `llm-citations/2026-08.md` § Capture rules |

## D · Closed today (for the record, not for action)

R1 founding year 2020 (D102) · R2 "degrees" (D103) · R5 areaServed only (D104) · R6 YouTube sameAs (D105) · **R7 OG card = C, light, centred (D109)** · canon guard (D106) · IndexNow (D107) · machine layer (D108) · frozen register F1–F6, F9–F11, F13 · rename remnants (34) · M1 blog canonical.
