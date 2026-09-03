# Content style decisions log

**Purpose:** Date-stamped log of active brand/voice decisions made during page-by-page content reviews. Decisions promoted from this log into `translation/BRAND_CONTENT_GUIDE.md` when stable. Living doc — append, never delete.

**How to read:** Each entry includes (1) the decision, (2) what it overrides if anything, (3) where it lives now (brand guide section, glossary entry, skill lint rule), and (4) the trigger (which review surfaced it).

**Status lives elsewhere.** This log is append-only and records what was *decided*; [`docs/decision-index.md`](decision-index.md) records what is still *true* — every D across both logs, with Live / Superseded / Fulfilled / Open and the guard that enforces it. Check the index before assuming an entry here is current.

---

## 2026-05-21 · Home page review (first granular pass)

### D1 · LCS promoted to parent-facing methodology name
- **Decision:** On brand surfaces (dodolearning.com), the named methodology system is **"The LCS System"** (EN) / **"LCS 教学理念"** (ZH). "The Loop" is preserved as the per-session phrase Read → Think → Speak → Write that lives inside body copy. Never use "The Loop" as a section header / pillar heading on brand surfaces.
- **Overrides:** Prior §06 framing where The Loop was the dominant named surface.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §06 (Loop vs LCS naming convention note, 2026-05-21); §09 owned-vocabulary rows updated; `dodo-content-writer` skill lint rule added.
- **Trigger:** User edits to home `LoopSection` (EN H2 → "The LCS System", ZH H2 → "LCS 教学理念") and Pillar 2 heading/body/link.

### D2 · MCT direct naming permitted in Write step
- **Decision:** When describing the actual writing arc students follow, MCT may be named directly using the construction *"the MCT writing arc: Grammar → sentence → paragraph → essay → academic composition"*. This is in addition to the existing soft-distancing phrasings.
- **Overrides:** Prior §07 restriction that MCT only appeared with soft-distancing phrasings.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §07 MCT row permitted-phrasings column.
- **Trigger:** User Write-step EN edit replacing 6+1 Trait framework reference with MCT writing-arc progression. 6+1 retained as the scoring rubric for the same step.

### D3 · ZH H1 = brand sub-tagline
> **⤴ SUPERSEDED by D48** — the home hero H1 was rewritten in EN and ZH (D46, re-voiced D48). Kept for provenance.
- **Decision:** On the home hero, the ZH H1 is the brand sub-tagline: **"以原版文学精读为起点，用写作锤炼思维，用表达释放声音。"** (Master Brand Guide v3.1 origin.) ZH H1 line 2 left empty.
- **Overrides:** Prior poetic two-line ZH H1 ("孩子的英文根基..."). The sub-tagline replaces it as the H1 source.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §12 home row (H1 = brand sub-tagline in ZH).
- **Trigger:** User edit to `hero.h1` in `app/[locale]/page.tsx`.

### D4 · ZH voice patterns (six rules)
- **Decision:** Six ZH-specific voice patterns recorded in §08:
  1. Positioning over poetic abstraction in headlines
  2. Two-sentence punch openers for body paragraphs
  3. Avoid combat metaphors (捍卫 → 表达并支持; 战胜 → 引导)
  4. Use four-character idiomatic frames (高频低压, 可见可量化)
  5. Drop reassurance tails (而不是猜测 / 我们承诺 / 我们保证)
  6. Use 外教 only as contrast term, never as DODO self-positioning
- **Overrides:** Nothing — additive. Codifies patterns implicit in the brand voice but not previously written down.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §08 ZH-specific voice patterns table; `dodo-content-writer` skill lint rules; glossary §09 (外教, 高频低压).
- **Trigger:** User ZH edits across §3.2 H2, §3.4 body1, §4.6 Speak step, §5.4 Pillar 1 body.

### D5 · Testimonial style: First name + last initial, primary city pool
- **Decision:** Result-card students get realistic first names + last initial (Vincent X · Juliette W · River C). Placeholder "Student A/B/C" forbidden in production. Cities rotate through the primary pool: Vancouver · Calgary · Toronto · Montreal · San Francisco Bay Area · **Denver** (new addition 2026-05-21). Markham retired from primary pool in favor of Calgary.
- **Overrides:** Prior placeholder convention.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §11 testimonial/result-card style table; `dodo-content-writer` skill lint rules.
- **Trigger:** User updated all three result cards on home with named students and revised cities.

### D6 · Humanistic frame: "Enjoy the arts of language"
- **Decision:** The phrase **"Enabling students to enjoy the arts of language" / "培养学生享受文学艺术的能力"** is the humanistic positioning that pairs with cognitive-rigor language. Used as section H2 on trust/results surfaces. Recognises that rigor and joy are not opposites.
- **Overrides:** Replaced "The numbers speak first / Then the parents" as the home parent-trust section H2.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §09 owned vocabulary; appears in §11 implicitly as a positioning phrase.
- **Trigger:** User §6.2 H2 edit on home.
- **Watch:** This may be a candidate 4th brand truth (joy/arts pairing with rigor). Re-evaluate after /about and /program reviews.

### D7 · Specific book titles over genre labels
- **Decision:** In Read-step copy, name specific SAT-recognized classics (Alice in Wonderland, The Invisible Man, The War of the Worlds) over generic descriptors ("analytical non-fiction").
- **Overrides:** Prior Read step on home which used "Alice + Treasure Island + Poe + analytical non-fiction".
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §12 home row must-include adds "one specific book title in Read step".
- **Trigger:** User Read-step EN edit on home.

### D8 · Canonical Lexile claim — one grade level over two 16-week cycles
- **Decision:** The canonical Lexile gain claim is **"one grade level over two 16-week cycles"** — supersedes prior "187 points / 1.2 grade levels / 16 weeks" figure. Re-verify against latest cohort data before quoting tighter numbers.
- **Overrides:** §11 prior canonical figure.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §11 Typical Lexile gain row.
- **Trigger:** User Fix C admin-set-truth override during initial home review.

### D9 · ZH 6+1 trait canon updated
- **Decision:** New ZH canon for 6+1 traits: **思考、结构、声音、用词、流畅、规范、呈现**. Note: collides with "Think 思考" (Loop step 2) — accepted trade-off.
- **Overrides:** Prior `想法、结构、声音、用词、句子流畅度、规范性、呈现`.
- **Where it lives now:** `translation/dodo-glossary.json`; cascaded across `content/marketing.zh.js`, `content/faq.js`, `translation/DEEPSEEK_BRIEF.md`, `content/zh/blog/lexile-asymmetry-bilingual-children.mdx`.
- **Trigger:** User Fix A admin override during initial home review.

---

## Promotion checklist (review before each guide release)

For each decision above, ask: has this stabilized across 2+ surface reviews? If yes, lock into brand guide as canonical rule and drop from this log's "active" set. Decisions older than 90 days that haven't been promoted should be re-examined.

---

## Open observations (not yet decisions)

- **Em-dash style in ZH** — `——` (double em-dash, no space) vs `— ` (single em-dash + space). User edit on §5.6 mixed both. Worth a style call after 1–2 more page reviews.
- **"Improvements" vs "Results"** in soft CTAs — pattern emerging; need a second data point before codifying.
- **"高阶课程" phrasing** — user introduced it once. May be a candidate owned ZH phrase if it recurs.

---

## 2026-05-21 (later) · /program review Round 2 + audience pivot

### D10 · Audience pivot to global positioning (Q1)
> **⤴ SUPERSEDED by D40** (2026-08-26) — explicit international targeting retired; see also D26, purged by D45.
- **Decision:** Drop "Chinese immigrant families in Canada and the US" framing from positioning surfaces. Use "globally-mobile families" / "面向全球家庭" on `/program`, `/about`, home PhotoIntro body0, `/compare`, and `llms.txt` lead blockquote. Preserve Chinese-diaspora references where authentically operational (FAQ city coverage, bilingual cognitive-system descriptions).
- **Overrides:** Prior brand guide §04 NA-Chinese-immigrant scoping.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §04 dual-market block; cascaded across `/program`, `/about`, `/home`, `/compare`, llms files. Workflow #16 marked done.
- **Trigger:** User Q1 answer "Option B full calibration" during /program review.
- **Watch:** Core market remains Chinese diaspora (90%+ of current cohort). Voice and product language untouched — only surface positioning broadened. If future cohort data shifts substantially, re-evaluate §04.

### D11 · Canonical session length updated (Q2)
- **Decision:** "Sessions run up to 50 minutes, minimum once per week" (replaces "90 minutes, once per week"). Aligns with the variable-intensity Summit/Core/Flex combinations.
- **Where it lives now:** `marketing.{en,zh}.js` /program §3 Journey · `llms-full.txt` What DODO Is section · brand guide §05 implied via combination cadence.
- **Trigger:** User Q2 confirmation during /program review.

### D12 · Loop/LCS asymmetry permitted in EN/ZH within the same section (Q3 answer A)
- **Decision:** When EN and ZH copy in the same element describe per-session work, the choice between naming "The LCS" (architecture) or "The Loop" (per-session phrase) can be made independently per locale. Example: /program §3.4 EN says "works through The LCS" while ZH says "操练 The Loop" — both pass.
- **Reasoning:** ZH carries more rhythmic / per-session emotional weight via "操练 The Loop". EN reads cleaner with "The LCS". Both honor the brand-architecture distinction.
- **Where it lives now:** `marketing.{en,zh}.js` /program §3.4 · noted in `02-program-content-dump.md`.
- **Trigger:** User Q3 explicit answer A.

### D13 · Pricing display: hidden on /program, surfaced on /faq (Q7)
- **Decision:** Combination card price field hidden on /program via JSX conditional `{item.price && false && (...)}`. Item.price data preserved. Pricing facts live on `/faq#enrollment` as the only public source. Combinations `note` rewritten to remove "Pricing per 16-week cycle" framing and instead direct to FAQ.
- **Overrides:** Brand guide §12 /program "must include · pricing" — pricing is now via FAQ link, not directly displayed.
- **Where it lives now:** `app/[locale]/program/page.jsx` CombinationsSection · `marketing.{en,zh}.js` /program note. Workflow #17 marks "verify FAQ pricing current" as pending.
- **Trigger:** User Q7 answer A.
- **Future re-enable:** Delete `&& false` in the JSX conditional.

### D14 · Type A/B caption moved to /methodology (Q6 — deferred)
- **Decision:** Type A (Literacy Session) / Type B (Writing Session) caption removed from /program §2 (`loop.typeAB: ''` both locales). Content moves to /methodology when that page is reviewed. **Apply during /methodology review** — workflow #18 logged as deferred.
- **Where it lives now:** Cleared from `marketing.{en,zh}.js` /program loop.typeAB · workflow #18 pending · brand guide §05 still has the Type A/B definition (untouched).
- **Trigger:** User Q6 answer B.

### D15 · Observer-POV session pattern (Q8)
- **Decision:** "Real session" sections on conversion pages are written as third-person observer POV from an actual DLCW curriculum lesson. No marketing voice ("we build", "where confidence is built"), no timing notations, no slogan-branded Visible Thinking routine names. Real characters, real source quotes, cognitive discovery in the student's voice. First reference implementation: `/program §6` = Mud Trilogy Phase 2 Lesson 04 "The Red Tide" Ch. 4.
- **Where it lives now:** New brand guide section **§12a · The observer-POV session pattern**. Reference implementation at `marketing.{en,zh}.js` `program.session` (commit `6ced09c`). Reusable for /methodology, /about, /results when those surfaces want a "what does a real session look like" element.
- **Trigger:** User rejected the marketing-voice and gimmicky drafts; provided source curriculum path for grounding.

### Observations promoted to decisions
- **Pronoun disambiguation** in narrative scenes — when same-gender Navigator and student both appear, use explicit subjects ("Ms. Jennifer", "the student") for the subject who'd otherwise pronoun-collide. Applied in /program §6 EN+ZH. Now part of §12a observer-POV pattern.

### Still-open observations
- **EN/ZH semantic asymmetry tolerance** — D12 explicitly permits within one element; broader tolerance (sections deliberately diverging in their POV) hasn't been tested. Watch as more pages get reviewed.
- **Lexile data display strategy** — `/program` §6 dropped Lexile from the q1 dialogue. Whether this generalizes (Lexile signals stay in section chips + ProofStrip stats, not in narrative dialogue) needs another page test.

---

## 2026-06-01 · /about review

### D16 · "What We Believe" → "DODO Learning's Pillars"
- **Decision:** The /about beliefs section is reframed as **"DODO Learning's Pillars" / "DODO Learning 的核心支柱"**. Four numbered statements kept; wrapper language moved from belief/conviction → pillar. Internal: `BELIEFS_BASE` → `PILLARS_BASE`, aria `Belief N` → `Pillar N`. Sub ties the pillars to "every session — and every teaching moment a Navigator shares."
- **Where it lives now:** `app/[locale]/about/page.jsx` · `marketing.{en,zh}.js` `about.beliefs`. Bodies rewritten to weave (unnamed) MCT structure-of-language + Project Zero dialogic/visible-thinking philosophy.
- **Trigger:** User /about dump markup §3.

### D17 · Referral rate 90%+ → 75%+ (site-wide)
- **Decision:** Canonical referral figure is **75%+ from genuine word-of-mouth**, supersedes 90%+. Cascaded /about (EN+ZH), partners page (EN+ZH), llms-full.txt.
- **Overrides:** §11 prior 90%+.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §11 referral row.
- **Trigger:** User C-2.

### D18 · Top-50 university credential retained (top-30 rejected)
- **Decision:** Navigator credential stays **world top-50**. A proposed top-30 was rejected: the named pool (Oxford · U of T · Queen's · LSE) is not all top-30, so the tighter claim is unverifiable and fails the skeptical-parent fact-check (§04 profile).
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §11 credentials row (do-not-downgrade note).
- **Trigger:** User C-1.

### D19 · LCS ZH section header = 语言循环体系
- **Decision:** Canonical ZH section header for the LCS system is **"语言循环体系"**. Supersedes the prior three-way drift: D1's "LCS 教学理念" (§09), glossary "LCS 教学体系" (§15). EN unchanged ("The LCS System").
- **Overrides:** D1 ZH rendering; glossary LCS entries.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §09 + §15 · `dodo-glossary.json` LCS entries · `about/page.jsx` §4 heading.
- **Trigger:** User C-4.

### D20 · 领航员 forbidden as Navigator translation
- **Decision:** **领航员** (literal "navigator") is forbidden — Navigator is always **导师（Navigator）**. Purged from /about heading, /consult h2zh (also fixed typo 咋询→咨询), demos labels (EN+ZH).
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §09 Navigators row + §10 anti-dictionary · `dodo-glossary.json` voice_rules.
- **Trigger:** User /about dump §5 remark.

### D21 · Mother-tongue framing over Chinese-specific
- **Decision:** In globalized body copy, the child's first language is **"mother tongue" / "母语"**, not "Chinese / 中文" — except on intentionally core-market surfaces. Applied to /about Pillar 03 + Family 1.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §04 (2026-06-01 note). Operationalizes D10's "cascade pending".
- **Trigger:** User C-5.

### D22 · Founder named on /about; closing uses poetic ZH sub-tagline
> **⤴ SUPERSEDED — (a) by D35** (Janet, first name only, everywhere) **and (b) by D49** (the closing stamp is now the locale-aware tagline).
- **Decision:** (a) The founder is named on /about as **Janet** (first name — warm conversion register), in the hero sub + video label (founder identity, §12 must-include). **~~Full "Janet Sui" is reserved for formal credits (/compare "From the Founder" byline), legal signatory (AgreementTool), and the pending Person schema.~~ RETIRED 2026-08-24 — see D-latest below: Janet is the only permitted form in every surface, including formal credits, legal signatory, and Person schema.** (b) The closing-stamp ZH H2 switches from the literal "一次思考，两种语言。" to the canonical poetic sub-tagline **"语言的根，长在阅读里"** (§00). EN tagline unchanged.
- **Where it lives now:** `marketing.{en,zh}.js` `about.hero` · `about/page.jsx` ClosingStamp.
- **Trigger:** User C-3, C-6.

### Reinforced (not new)
- **ZH combat-metaphor lint** caught **捍卫** in the /about Speak step + Pillar 01 body — replaced with 阐明并支持 / 支持自己的立场. Lint rule already in §08 + skill; this is a recurrence flag.
- **Affirmative voice** — removed the oppositional "Not teachers. / Navigators." chip pair from /about §5 (render deleted; orphan `chipNot`/`chipAre` content keys left harmless).

---

## 2026-06-01 (later) · Chrome overhaul (navbar + footer)

Scope: redesign navbar + footer for simplicity, fix tablet UX cliff, kill nav/footer redundancy, fix EN-hardcoded-chrome translation bug, ship Privacy + Terms stubs, reserve a slot for the future DODO Coding sibling site. Plan file: `~/.claude/plans/study-the-current-navbar-sharded-sundae.md`. Commit: `03f1131`.

### D23 · "The Method" as cold-traffic nav label for /methodology
> **⤴ SUPERSEDED by D30** — the nav label is **DODO Method** (ZH DODO 教学系统 per D34).
- **Decision:** The global nav uses **"The Method" / "方法"** as the top-level label for `/methodology`. Brand-owned term **"The Loop"** is preserved inside the page body (hero, anchors, JSON-LD) and across the broader methodology vocabulary. The nav label is the cold-traffic translation; the page itself still names "The Loop" and "The LCS System" per D1/D19.
- **Reasoning:** "The Loop" reads as in-group vocabulary to a parent landing on the site for the first time. "The Method" is unambiguous in chrome; the owned term carries weight inside the page where the parent has committed to reading.
- **Where it lives now:** `content/marketing.{en,zh}.js` `nav.primary` array · `components/layout/Navbar.jsx` (label only — href unchanged at `/methodology`).
- **Trigger:** User direction during plan-mode review of the chrome overhaul.

### D24 · "Reading Companion" as cold-traffic UI label for /audiobooks
- **Decision:** The UI label for the gated `/audiobooks` library is **"Reading Companion" (EN) / "有声书" (ZH, per D34)** wherever it appears in chrome and member-facing surfaces. The URL `/audiobooks` is unchanged for routing / back-compat / sitemap / hreflang stability. Cloudflare Access gate is unchanged — the nav item is a members-area entry point, not a marketing surface; rendered with a lock glyph + "members" / "学员专属" micro-tag (visible at `lg+`, omitted at `md` to save horizontal width).
- **Reasoning:** "Audiobooks" describes the file format; "Reading Companion" describes the role the library plays in a student's program. Aligns the label with the value proposition rather than the medium. **ZH side adopts the descriptive form 有声书 (per D34, 2026-06-02)** — EN retains the branded "Reading Companion" for the role framing; ZH chose the descriptive form for clarity on a gated entry-point label. Bilingual asymmetry is intentional and recorded in `translation/dodo-glossary.json`.
- **Where it lives now:** `content/marketing.{en,zh}.js` `nav.primary[4].label` · `Navbar.jsx` renders the lock glyph and `members` tag · `app/[locale]/terms/page.jsx` ZH prose now uses `「有声书」内容库` (rewritten to avoid the redundant `「有声书」有声书库`).
- **Trigger:** User direction during plan-mode review; ZH locked 2026-06-02 per D34.
- **History:** ZH was provisionally "阅读伴" through 2026-06-02; D34 locks it as 有声书.

### D25 · Chrome i18n pattern — copy passed as prop from server layout
- **Decision:** Navbar and Footer no longer hardcode EN labels in component constants. Both consume a `copy` prop resolved once per request in `app/[locale]/layout.jsx` (which imports both `nav`/`footer` exports from `marketing.en.js` and `marketing.zh.js` and selects by locale). Pattern keeps the client-side Navbar from bundling both locale modules and matches the existing per-page convention.
- **Overrides:** Prior pattern where `PRIMARY_LINKS` / `NAV_PROGRAM` etc. were const arrays inside the component files, EN-only. Fixed a silent correctness bug where `/zh/*` pages rendered Chinese page bodies wrapped in English nav + footer chrome.
- **Where it lives now:** New namespaces `nav` + `footer` at the top of `content/marketing.en.js` and `content/marketing.zh.js`. `app/[locale]/layout.jsx` imports both and passes the resolved object to `<Navbar copy={...} />` / `<Footer copy={...} />`.
- **Trigger:** Chrome overhaul scope; flagged in plan as "the single biggest correctness bug the redesign should fix."

### D26 · Audience cue — "globally mobile families" on chrome surfaces
> **⤴ SUPERSEDED by D40**, executed by **D45** — 0 occurrences of `globally-mobile` in live code, verified 2026-08-29.
- **Decision:** The brand-blurb sentence rendered in the footer Brand column reads **"A live, Navigator-led English literacy program for globally mobile families."** in EN and the ZH-equivalent in `marketing.zh.js` `footer.brand.body`. Aligns with D10 (audience pivot to globally-mobile positioning) on a chrome surface where the brand blurb appears on every page.
- **Where it lives now:** `content/marketing.{en,zh}.js` `footer.brand.body`.
- **Trigger:** Audit of footer copy during the rebucket; existing chrome copy still said "Chinese-speaking" pre-D10. Now cascaded to chrome.

---

## Observations from chrome overhaul (not yet decisions)

- **"Live · Navigator-led" micro-label under desktop CTA** — drafted but pulled at build time because absolute-positioning overlapped page hero. Worth re-adding as a properly-positioned tooltip in v1.5 if first-glance trust at the nav level becomes a stated need. The brand-truth signal (Lexile · 6+1 · Live) already lives in the footer trust strip and on `/methodology`.
- **Hub-page secondary nav (Surface 6)** — planned but deferred. Sticky in-page nav on `/program`, `/results`, `/about` linking to absorbed sub-pages (Lexile, The Difference, FAQ etc.). Documentation-site pattern. Defer until first content owner asks for it; without it, demoted items still retain 3 surfaces (footer + in-page links + sitemap), which clears the floor set in the plan's net-visibility check.
- **DODO Coding cross-link copy** — `footer.sibling.blurb` is "Coming soon" / "即将上线". When sibling site ships, replace with one-line program description (TBD) and flip `NEXT_PUBLIC_SHOW_CODING=true`.

---

## 2026-06-02 · Funnel swap (v6.0) — chrome + CTA UX

Scope: realign the whole visitor funnel around a soft→firm commitment ladder, kill duplicate consult CTAs, and reframe assessment. Shipped in commit `140a7a5`. Design reference written to `.interface-design/system.md` (read it before touching chrome/CTAs). EN + ZH parity; `next build` clean.

**The funnel model (the spine of all CTA decisions):**
`See → Talk → [enroll] → Assess`. Watch a Demo Class = soft close (cold surfaces). Book Your Consultation = firm close (warm surfaces). The Lexile assessment is **post-enrollment and informational only** — never a lead-capture CTA.

### D27 · Watch Demo Class is the soft close; consult is demoted to the firm close
- **Decision:** The navbar primary CTA, the home hero primary, and the `/about` closing all lead with **Watch a Demo Class (EN) / 课堂实录 (ZH, per D34)** (zero-commitment, "free, no sign-up"). **Book Your Consultation** is demoted to the firm close — mobile-drawer ghost, deep-page bodies, and the footer band. Cold/high-traffic surfaces lead soft; warm surfaces (post-content, post-video) close firm.
- **Overrides:** Chrome-overhaul state where Book Your Consultation was the single primary CTA on every cold surface (navbar + hero + footer) and Watch was demoted.
- **Where it lives now:** `nav.cta` (demo-first), `home.hero.cta1/cta2`, `about.closing.cta`; `Navbar.jsx` (desktop button + drawer order swapped, hides Watch on `/demos`); `page.tsx`/`about/page.jsx` hrefs realigned.
- **Trigger:** User funnel-redesign direction — "replace booking consultation with watch demo class as top-of-page soft closer; consult is the firmer close on the demo page."

### D28 · One conversion moment per page — charter bands removed, PreCtaBand is path-aware
> **⤴ SUPERSEDED by D33** — the band is a soft fallback, suppressed where a page owns its close. The `/consult` swap and `footer.preCtaWatch` are gone. The one-conversation-moment *principle* survives; this implementation does not.
- **Decision:** No page renders the dark consult panel twice. The per-page `charter` bands (duplicates of the global footer band) were **deleted from `/program`, `/demos`, `/consult`** plus the duplicate `BookCall` on `/demos`. The global pre-footer band was extracted to a client component **`PreCtaBand.jsx`** that is **path-aware**: firm consult close on every page, but on `/consult` itself it swaps to a soft "Watch a Demo Class" offer (`footer.preCtaWatch`) so it never links back to the page you're on. Default-band ghost changed `See The Program → Watch a Class`.
- **Overrides:** The additive pattern where most pages stacked an in-body `cta` band + a near-identical `charter` band + the global footer band (up to 3–4 consult asks in a row).
- **Where it lives now:** `components/layout/PreCtaBand.jsx` (new) + `Footer.jsx`; `footer.preCta` (ghost→watch) + new `footer.preCtaWatch`; charter sections removed from the 3 page files.
- **Follow-up:** Even at one in-body CTA + one footer band, the band still sat directly under a page's own closing CTA on content pages → "two CTAs in a row." **Resolved by D33 (band as fallback).**

### D29 · Assessment reframe — consult before assess
- **Decision:** Families are **consulted before being assessed.** The consultation decides fit; the Lexile baseline is measured only after enrollment (Week 0/8/16). All "Book a Free Lexile Assessment"-style entry CTAs removed. `compare.s9` reframed (the *consultation* decides fit, not the assessment). Footer Program-column label `Free Assessment → The Lexile Assessment / Lexile 测评` (informational, still `soon`).
- **Where it lives now:** `compare.s9` (h2/sub/cta/note), `footer.program` assessment row, `program.cta.note` (dropped "assessment included"); `/assessment` + `/lexile` remain informational explainers.
- **Trigger:** User — "Assessment page won't act as a second step in the closing process. We want to consult families before assessing them."

### D30 · CTA label standardization + nav renames (ELA Program, DODO Method)
- **Decision:** One action, one label. EN: **Book Your Consultation** (firm), **Watch a Demo Class** (soft), **See The 16-Week Program** (secondary). ZH consult standardized to **预约咨询** — deliberately dropping 评估 (assessment) from the consult CTA to reinforce D29. Exception: the `/consult` hero keeps first-person **Book My Consultation / 预约我的咨询**. Nav renames: **The Program → ELA Program / ELA 课程**, **The Method → DODO Method / DODO 教学系统 (ZH per D34)**.
- **Overrides:** D23 (`/methodology` label "The Method/方法" → "DODO Method"; ZH locked to 教学系统 by D34). Replaced the 4–5 drifting consult labels ("Book a Diagnostic Call", "Book a Free Lexile Assessment", etc.) and 4 secondary-label variants.
- **Where it lives now:** `nav.primary`, all page `cta`/`ctaPrimary`/`ctaSecondary` in `marketing.{en,zh}.js`.
- **Trigger:** User renames + site-wide CTA audit.

### D31 · Gated nav item — lock glyph only, "members" tag → sr-only
- **Decision:** The gated `/audiobooks` (Reading Companion) nav item shows the **lock glyph only**; the visible "· members / · 学员专属" micro-tag is removed and the gating word is now **`sr-only`** (still announced to screen readers via `copy.members`).
- **Overrides:** D24's visible `lg+` "members" micro-tag.
- **Where it lives now:** `Navbar.jsx` (Desktop + Mobile NavLink render `<span className="sr-only">`); `nav.members` repurposed as the sr-only string.
- **Trigger:** User — "Remove the wording of members on the navbar, keep the lock icon only."

### D32 · Little DODO — forthcoming K–2 ELA sub-program (positioning recorded; page not yet built)
- **Decision (direction):** The ELA Program is being extended with a sibling program, **Little DODO**, targeting **K–2 / pre-elementary starters** — a **high-frequency, low-pressure** reading + comprehension program. Operationally it shares the main program's pillars: **tuition, environment, frequency, and Navigators are all similar.** What differs is **marketing/packaging emphasis and target audience** — early foundational literacy, reading habit + confidence, and comprehension basics, *not* the older program's "argue with evidence / write with intention / Lexile-rigour" register.
- **Status:** A dedicated marketing page is planned (Task 3 — "eventually build"). Ground rule from user: **strictly follow the design framework (`.interface-design/system.md`) while showing thoughtfulness to the K–2 target audience.** Full positioning + page plan in `docs/little-dodo-plan.md`.
- **IA + naming (decided 2026-06-02):** Route **`/little-dodo`** (top-level). Nav = **Option I**: flat nav unchanged (no 7th item, no dropdown); **`/program` becomes the program-family hub** with an age-band chooser branching to Little DODO (K–2) + The 16-Week Program (Gr 4+), plus a footer Program-column link. `/little-dodo` joins the `PreCtaBand` SUPPRESS list (it owns its close). **EN name "Little DODO" / ZH name "都学启蒙"** (transcreation; lint via `dodo-content-writer`; no 启蒙-redundant descriptor). Age label **EN "Ages 5–8" / ZH "5–8 岁"** (幼小衔接 as supporting ZH framing).
- **SHIPPED 2026-06-02.** Page at `app/[locale]/little-dodo/` (hero soft-close → /demos; own firm close → /consult; on PreCtaBand SUPPRESS). New `littleDodo` + `ageBands` exports (EN+ZH); shared `components/ui/AgeBandChooser.jsx` rendered below the hero on `/program` (current=/program) and `/little-dodo` (current=/little-dodo); footer Program-column link; sitemap + `llms.txt` + `littleDodoCourseSchema()`. Voice: K–2-warm, English-mastery-primary, NOT Lexile-heavy. Anti-dictionary clean; `next build` clean.
- **Trigger:** User — program-extension briefing 2026-06-02; IA + ZH-name direction confirmed same day.

### D33 · Pre-footer band is a soft fallback, not a peer panel (resolves #19)
- **Decision:** Option A. The global `PreCtaBand` now yields **one conversion moment per page**: it is **suppressed** on every page that already owns an in-body closing CTA (about, program, methodology, lexile, results, navigators, compare, demos, consult, blog, cities, audiobooks, privacy, terms) and **shown only as a soft fallback** on pages without one (home, `/faq`, `/partners`, `/assessment`). Where shown it leads **soft** — Watch a Demo Class (primary) + Book Your Consultation (ghost) — matching the cold-surface = soft-close rule.
- **Overrides:** D28's path-aware-swap implementation. The `/consult`-only swap and the `footer.preCtaWatch` block are removed (consult now suppresses the band entirely). `footer.preCta` reframed from the firm "Ready to meet your Navigator?" to the soft "See a real class before you decide."
- **Where it lives now:** `components/layout/PreCtaBand.jsx` (`SUPPRESS` prefix list + soft render); `footer.preCta` in `marketing.{en,zh}.js` (reframed soft; `preCtaWatch` deleted).
- **Trigger:** User — "the section just above the footer is almost always redundant to the section above it." Chose Option A from the 2026-06-02 proposal.

### D34 · Navbar ZH refresh — descriptive over branded (2026-06-02)
- **Decision:** Four ZH labels lock to user-given source-of-truth substitutions:
  1. **`DODO 教学法` → `DODO 教学系统`** (global ZH) — descriptor shifts from "method/pedagogy" to "system." Applies to nav, faq.js sections, all prose.
  2. **`阅读伴` → `有声书`** (global ZH) — moves from the branded short-form to the descriptive "audiobook." Applies to nav + terms-page prose (the latter rewritten to `「有声书」内容库` to avoid `「有声书」有声书库` redundancy).
  3. **`关于` → `故事`** (navbar primary ONLY) — `nav.primary[5].label` only. All other 关于 occurrences (footer `关于 DODO`, demos `关于课程` / `关于 DODO` card, prose use of 关于) remain untouched. Recorded as `context_specific_overrides` in `translation/dodo-glossary.json`.
  4. **`观看示范课` → `课堂实录`** (global ZH) — repositions the soft-close from "demo class" framing to "real classroom recording." Applies to: navbar CTA, footer PreCtaBand, all page `cta1`/`watch` keys, demos page hero + meta, prose uses of standalone 示范课 (grammar adjusted — counter shifts 一堂→一段, 每节→每段; `示范课录像` collapses to `课堂实录`).
- **EN side:** **Unchanged.** EN retains "DODO Method," "Reading Companion," "About," "Watch a Demo Class." Bilingual asymmetry is intentional — ZH side reframes brand vocabulary; EN side keeps the existing soft-close + branded forms.
- **Where it lives now:** `content/marketing.zh.js` (~32 strings across nav, footer, home, about closing, demos, little-dodo) · `content/faq.js` (3 strings) · `app/[locale]/terms/page.jsx` ZH prose (1) · `translation/dodo-glossary.json` (3 new `owned_terms` entries + `context_specific_overrides` section) · `.interface-design/system.md` line 44 · `docs/SUCCESSOR_HANDOFF.md` (cross-refs).
- **Trigger:** User direction 2026-06-02 — "navbar ZH translation source of truth."
- **Rule going forward:** Future ZH additions follow the descriptive form. `教学法`/`阅读伴`/`观看示范课`/`示范课` should not reappear in ZH copy unless explicitly justified (e.g., historical quote, archived doc).

---

## 2026-08-24 · Founder reference — first name only, everywhere

### D35 · "Janet Sui" retired — Janet in every surface, no last name

- **Decision:** The founder is **Janet** — first name only — in every context, without exception: conversion-page prose, formal credits (`/compare` "From the Founder" byline), legal signatory blocks (`components/ops/AgreementTool.jsx`), `Person` schema `name` field, `sameAs` labels, workflow docs, translation glossary, internal handoff docs. No last name appears anywhere.
- **Overrides:** **D22(a)** (the earlier "Janet in warm register; Janet Sui in formal credits / legal / Person schema" convention). That two-form convention is retired. *(Corrected 2026-08-30: this line read "D18" from 2026-08-24 to 2026-08-30. D18 is the top-50 university credential decision and is untouched by D35 — it remains Live.)*
- **Where it lives now:** `content/marketing.{en,zh}.js` `/compare` s5 (already stripped 2026-08-24 in the prior session), `components/ops/AgreementTool.jsx:618` signatoryName default + placeholder, `translation/dodo-glossary.json` `owned_terms.Janet`, `translation/BRAND_CONTENT_GUIDE.md` §"Founder reference" row + §"Owned vocabulary", `translation/DEEPSEEK_BRIEF.md` glossary table, `docs/workflow.md` (all mentions), `docs/SUCCESSOR_HANDOFF.md` (all mentions).
- **Rule going forward:** Never write "Janet Sui" or any last-name form. If a formal byline calls for "Janet Sui — Founder," use "Janet — Founder." When wiring `Person` schema, `name: "Janet"` — do not populate `familyName`. When drafting legal documents, the founder signs as "Janet." Recorded in Claude Code memory (feedback rule) for cross-session enforcement.
- **Trigger:** User direction 2026-08-24 — "Strip last name from all files & mentions. Be on the lookout going forward."

---

## 2026-08-26 · MCT research + brand-guide amendment (approved)

Scope: incorporate an MCT research pull + refine positioning after the marketing-skills install. Analysis in `docs/_archive/mct-research-and-brand-review-2026-08-26.md`; approved draft in `docs/_archive/brand-guide-refresh-draft-2026-08-26.md`. **Applied to the internal guide only** (`translation/BRAND_CONTENT_GUIDE.md` + new ZH mirror + glossary). **Customer-facing surface cascade (site copy, llms.txt, faq, schema) still awaits an explicit "apply."**

### D36 · Tagline → "Think once, in two languages."
- **Decision:** EN tagline updated from **"Think Once. In Both Languages."** to **"Think once, in two languages."** (sentence case; "two languages"). Role clarified: brand **signature**, not the positioning line — conversion heroes lead with the English-mastery + thinking proposition. ZH sub-tagline (语言的根，长在阅读里) unchanged; the EN-tagline ZH rendering shifts 一次思考。两种语言。 → **一次思考，两种语言。** (comma).
- **Overrides:** §00 prior tagline; glossary tagline entry; §16 checklist.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §00/§09/§16 · `BRAND_CONTENT_GUIDE.zh.md` · `dodo-glossary.json` (old string marked retired).
- **Pending cascade (needs "apply"):** home hero, `about` ClosingStamp, any surface with the old string, `dodo-content-writer` lint rule.
- **Trigger:** User — "adapt brand tagline to 'Think once, in two languages.'"

### D37 · Five Strands nested under LCS + ELA = 7 levels (Poodle retired)
- **Decision:** (a) The **MCT Five Strands** (Grammar, Vocabulary, Writing, Poetics, Literature) are described in DODO's own words and **nested under the fitting LCS branch** — **L**: Literature · Vocabulary · Poetics; **C**: Grammar · Writing; **S**: Speaking (DODO's own, no book-curriculum equivalent — the live differentiator). LCS remains the named umbrella. (b) ELA is a **seven-level** ladder (L1 Island → L7 Lens III; L1 = Grade 3+; L7 = college-tier). **Poodle/preliminary is not adapted**; **Little DODO** (separate, non-MCT, ages 5–8) occupies the early-starter slot. Retires the "9 levels / Starter / DODO Poodle" framing.
- **Overrides:** §06 LCS 3-row table + "9 Curriculum Levels" table.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §06 + §16 · ZH mirror §06/§16 · review + refresh docs.
- **Trigger:** User — "five strands will live under LCS… incorporate under the fitting branch"; "not adapting Poodle, use Little DODO in its place… L1 Island → L7 Lens III is true."

### D38 · New §07a "The Research Base"
- **Decision:** New guide section §07a gives writers dated, citation-backed facts (Gallagher 2017 *Roeper Review*; Goodwin & Ahn 2010/2013 meta-analyses; Bowers/Kirby/Deacon 2010; Henry 1997 60%/90%; challenging-text research) as five permitted claims + a drop-in citation list + original-voice reference sentences. **Hard rule:** frame as *acceleration into mastery*, never ELL/remediation/catch-up. Rationale: GEO — citing sources/statistics/quotations is the highest-leverage citation booster.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §07a + §16 · ZH mirror §07a/§16.
- **Pending cascade (needs "apply"):** `/methodology` "why this works" block, `llms-full.txt`, one `/faq`, `schema` `citation` nodes.
- **Trigger:** User — "the research base contain enough text reference to be practical in the marketing guide."

### D39 · ZH guide mirror + §17 Branded Vocabulary reference
- **Decision:** A full ZH mirror of the operator guide now exists at `translation/BRAND_CONTENT_GUIDE.zh.md`, current with D36–D38, and adds a **§17 品牌词汇表** (branded EN↔ZH vocabulary as a single readable translation/copywriting reference, sourced from `dodo-glossary.json` + §09). Conflicts resolve to the newest D-number.
- **Where it lives now:** `translation/BRAND_CONTENT_GUIDE.zh.md`.
- **Trigger:** User — "draft an identical zh version of the guide… add the branded vocabulary list as translation and copywriting reference."

---

## 2026-08-26 (later) · Positioning shift + critique applied at guide level

Scope: apply the strategic critique (`docs/_archive/brand-guide-critique-2026-08-26.md`) at the guide level and execute a major positioning change. Applied to `BRAND_CONTENT_GUIDE.md` + `.zh.md`. **Customer-surface cascade still gated** — see `docs/_archive/pending-guide-cascade.md`.

### D40 · Target by demographic + desire (supersedes D10 global positioning)
- **Decision:** DODO **no longer targets international / globally-mobile families explicitly** — that dimension is now **implicit** (served worldwide; carried by the bilingual EN/ZH site). Targeting is **demographic + aspiration-based: any family that fits the profile and wants to refine their child's language arts to mastery — including local, settled families**, not only relocating/diaspora. Retire "globally-mobile families" / "students around the world" / "面向全球家庭" as headline framing. International stays true and available, just not the headline. §04 family table reworked around situation+desire with **Local & settled** as a new explicit focus row.
- **Overrides:** D10 (2026-05-21 global positioning) and its cascade targets.
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §04 + §12 llms row · ZH mirror §04 + §12.
- **Pending cascade (needs "apply"):** the old D10 surfaces — `/program`, `/about`, home PhotoIntro, `/compare`, `llms.txt` lead — plus SEO meta. Re-verify each; drop "globally-mobile/around the world/面向全球" headline framing, keep international as implicit.
- **Trigger:** User — "no longer targeting international families explicitly, only implicitly… also targeting local families… all who fit the demographic and desire to refine their language arts skills."

### D41 · Critique recommendations applied at guide level
- **Decision:** Added to §01/§01b: (a) **canonical positioning statement** (single assembled position); (b) sharpened competitor lines — new rows for **gifted-ELA books (MCT/homeschool)** and **free AI tutors**; (c) **objection→response matrix** incl. the **AI question** ("why not just use ChatGPT?"); (d) **switching-anxiety** (JTBD Anxiety force); (e) **anti-persona** (who DODO is NOT for).
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §01 + new §01b · ZH mirror §01 + §01b.
- **Trigger:** User — "apply the recommendation from critique."

### D42 · New §04a "Marketing Direction & Directives" — guide now carries strategy
- **Decision:** The guide is confirmed as primarily a copy-production manual **and** now carries a strategic layer. New §04a: category to own ("English language arts at mastery level"), the AI-age signature thesis, market-forces awareness (AI substitute; high buyer power / low switching cost → retention as positioning; category white space), growth-lever directives (referral engine, research-base authority/GEO, community, cultivate local demand), a proof directive, and a guardrail (no discount/deficit/urgency/remediation).
- **Where it lives now:** `BRAND_CONTENT_GUIDE.md` §04a · ZH mirror §04a.
- **Trigger:** User — "the brand guide… should also include key marketing direction/directive."

---

## 2026-08-26 (consolidation) · Guide promoted to v5

- **Guide version bumped v4.1 → v5** (`BRAND_CONTENT_GUIDE.md` + `.zh.md` headers), consolidated **through D42**. Header now carries a v5 summary of what changed since v4.1 and the current cascade status. The locked sections already carry every stabilized decision; this log remains the append-only provenance trail (never pruned).
- **Reconciled with upstream:** founder is **Janet — first name only, everywhere** (upstream D35); my session decisions were renumbered **D35–D41 → D36–D42** on push to avoid colliding with upstream's D35.
- **Cascade progress (D38 research base + D37 five-strands), shipped by peer 2026-08-26 (commit `334d8de`):** new **`/credentials`** bilingual reference page (canonical attribution surface) + **MCT-anchored pillar blog** (`content/en/blog/mct-language-arts-in-a-live-one-on-one-program.mdx`) + `credentialsSchema()` (CollectionPage + 4 `EducationalOccupationalCredential` + 5 academic `citation` nodes) + `llms-full.txt` seeding. Remaining cascade (tagline D36, `/methodology` block, `/faq` entry, positioning D40 surfaces) tracked in `docs/_archive/pending-guide-cascade.md`.
- **Repo state:** local `main` in sync with `origin/main` at consolidation time. Peer's unrelated uncommitted work (`.design/dodo-coding-launch/` reorg, `content-review/03–04`, `ElaReportTool.jsx` in `stash@{0}`) left untouched per user.

---

## 2026-08-27 · Position + Brand Truths revision (marketing-skills pass)

Applied at guide level to `BRAND_CONTENT_GUIDE.md` + `.zh.md` (§00 five-second, §01 position + IS/NOT table, §02 truths, §04 mother-tongue note). Skills applied up front: `copywriting`, `marketing-psychology`, `copy-editing`.

### D43 · One-sentence position revamped — LCS/five-strands + online, bilingualism out
- **Decision:** §01 one-sentence position rewritten to: *"DODO Learning is a live, online, one-on-one English language arts program that builds English mastery through the LCS System — the five strands of a complete language education across Literacy and Composition, plus a live Speaking strand no book or app can teach — with a credentialed Navigator in every session."*
- **Rationale:** (1) add the **online / live** delivery model (also pre-empts the AI/app substitute right in the line); (2) **LCS + five strands replace Lexile + 6+1** in the statement — the system is the *offer* (proprietary, category-defining); Lexile/6+1 are third-party *proof*, relocated to Truth 3; (3) **bilingualism removed** from the statement. Accuracy note preserved: LCS = 3 branches; the five strands nest under L & C; **Speaking is the differentiator, not one of the five.**
- **Also updated:** §00 five-second positioning (dropped "Bilingual depth emerges."; added "Live, online"); §01 IS/NOT table — retired the "language-maintenance / bilingual depth emerges" row.
- **Trigger:** User — "Add the fact DODO is online/virtual. The 5 strands and LCS should replace Lexile and 6+1… Remove bilingualism. Revamp completely."

### D44 · Three Brand Truths redesigned — retire bilingual truth, add human/AI moat, strengthen proof
- **Decision:** §02 truths redesigned. **Truth 1 kept** (English mastery at the cognitive level; light polish). **Truth 2 retired** (bilingual-capacity-as-outcome) and **replaced** with *"Mastery is taught by a person, not delivered by a product"* — the credentialed-Navigator + Speaking-strand moat and the work no book/app/AI can do. **Truth 3 redesigned** from the weak *"progress must be visible/measurable/felt / we show numbers"* to *"We put the growth on paper"* — measurement against outside standards (Lexile, 6+1) at Week 0/8/16, framed as **accountability** (regret-aversion: parents see the change before they renew).
- **Rationale:** New arc = the goal → the uniquely human method/moat → the proof. New Truth 2 absorbs the Speaking differentiator + the AI-age thesis; it makes the §04a *"Truth 2 is the seed"* cross-ref **more** accurate. Lexile/6+1 land in Truth 3 (proof), which is why they leave the position statement (D43).
- **Ripple reconciliations (same apply):** §04 mother-tongue note — repointed the "(Truth 2)" reference to "bilingual-depth by-product (downstream of Truth 1)" (EN + ZH); §04a "Truth 2 is the seed" left as-is (now more accurate); wider by-product bilingual threads (§10, §16, "English Thinker" identity) **kept as-is per user** — already English-first.
- **Trigger:** User — "Truth 1 is okay. Truth 2 should be retired. Truth 3 is weak. Completely redesign."

## 2026-08-27 · Customer-site cascade — Unit 0 (Foundations)

### D45 · Global tagline swap (D36 executed on live surfaces) + lint update
- **Decision:** retired string `Think Once. In Both Languages.` purged from all **live** code. Replaced with **`Think once, in two languages.`** in EN surfaces and **`一次思考，两种语言。`** in the two ZH-locale meta strings (`marketing.zh.js` L178/L194). Live files touched: `content/marketing.en.js` (7×), `content/marketing.zh.js` (2×), `app/layout.jsx`, `lib/metadata.js` (2×, global OG/title), `components/UnderConstruction.jsx`, `components/partners/PartnersClient.jsx`, `components/ops/ElaReportTool.jsx`, `components/ops/AssessmentTool.jsx`. **Left as-is:** `translation/archive/deepseek-2026-05-17/*` (frozen snapshot); guide/log/lint refs that intentionally cite the retired string.
- **`dodo-content-writer` lint updated** (`.claude/skills/dodo-content-writer/SKILL.md`): the guard that *enforced* the retired tagline was corrected → now rejects both retired forms and enforces the new one; added a **D40 guard** rejecting "globally-mobile / students around the world / 面向全球家庭" as headline framing.
- **Note:** `PartnersClient.jsx` carries a hardcoded tagline (not sourced from central content) — smell flagged for the Partners page unit (#12).
- **Trigger:** User — "start #0."

## 2026-08-27 · Customer-site cascade — Page 1 (Home)

### D46 · Home reworked to v5 (position/truths/positioning + proof integrity)
- **Applied to `content/marketing.{en,zh}.js` home slice + brand chrome.** Guide-conflicts fixed:
  - **A · hero.h1** — retired the bilingual co-headline ("Bilingual depth as the natural outcome.") → line 2 now the human moat: *"Live, one-on-one, with a Navigator no book or app can replace."* (D43/D44). ZH mirrored (the prior ZH literary line — the §00 sub-tagline — retired from the H1; still available in guide §00 if wanted elsewhere).
  - **B · confidence results pillar** — reframed the AI payoff off "who also thinks in Chinese" → *"then defend that thinking out loud … the judgment AI cannot replace"* (surfaces Speaking; D44). EN + ZH.
  - **C · brand.body** (footer chrome) — dropped "globally mobile families" / "面向全球华人家庭" → "live, online … English language arts program" (D40). EN + ZH.
  - **D · meta** — dropped "Bilingual depth emerges" tail; added **online** + **LCS/Speaking**; MCT → "gifted-ELA tradition." EN + ZH (+ title gains "Online" / "在线").
  - **E · photoIntro.body2** (EN) — removed the bilingual tail (ZH already lacked it → parity restored).
  - **F · ZH photoIntro** — de-**外教**/母语: heading mirrors EN ("老师与导师之间，差的是一张地图。"); body1 lead → "导师一对一不间断，却远不止一位英语老师。" (§10).
  - **Polish:** eyebrow/title gain "online" (D43); `utilize`→`use` (§08).
- **Flag 1 — unverified proof softened:** the two homepage proof tiles not in the §11 registry — **"2× writing gain"** and **"8/10 continue"** — replaced with **§11-verified** facts: **"75%+ word-of-mouth referral"** and **"10,000+ teaching hours."** Story shifts reach/reading/**referral**/**hours**. *If source data exists for the 2× writing gain and ~80% retention, add to §11 and we can restore those tiles verbatim.*
- **Flag 2 — results-card pronoun mismatch fixed:** quotes used pronouns that didn't match the card name (Vincent X→"She", Juliette W→"His"/他, River C→"She"). **Neutralized** all three parent quotes (EN + ZH) — no name-based pronoun inference.
- **Found (routed, not fixed here):** `/program` ZH hero chip uses "一次思考。两种语言。" (periods) — should be the approved "一次思考，两种语言。" (comma). Logged for the **Program unit (#4)**.
- **Trigger:** User — approved the Home scan/proposal + both flags; "Apply."

### Pending (position/truths pass)
- **Item 3 — redundancy/refine pass** (Rule of One): dedupe the AI rebuttal (canonical home = §01b), the "acceleration into mastery" guardrail (→ §10), and the "Lexile with a number" rule; other sections cross-reference. Run next, on top of D43/D44.
- Customer-surface cascade of D43/D44 (position + truths) — **not started**; add to `docs/_archive/pending-guide-cascade.md` when greenlit.

## 2026-08-27 · Voice / persona rewrite (§08 + §10 tone)

### D47 · §08 rewritten — "soft in tone, deep in knowledge"; anti-greasy / anti-AI-cadence standard
- **Decision:** retired the old §08 default ("affirmative, confident, forward-facing · trust-then-convert · two-sentence punch openers"). **New persona:** DODO's best Navigator talking to a parent across a kitchen table — deeply literate, warm, unhurried, quietly confident, a little delighted by language; never salesy. New §08 carries: persona statement · 4 principles (let sentences breathe · wear expertise lightly · care without selling · a little delight) · 4 dimensions (**Warm · Well-read · Unhurried · Quietly confident**) · a **"strip on sight"** list of register tells (rule-of-three on repeat, em-dash drumroll, "not X — but Y" reversal, fragment-stacking, superlative certainty, landing-page voice in body, importance-inflation) · **before→after** un-greasing examples built from the real Home lines shipped in D46.
- **Reconciled inside §08:** retired the ZH "two-sentence punch opener" rule and the "positioning over poetic abstraction" absolute → "clarity first, warmth alongside" (a legible warm image is welcome; matches the D46 Home ZH heading); softened the funnel-stage CTA intensity (Strong → confident-not-pushy) and the channel rule ("numbers in every section" → "one real number where it earns trust").
- **§10** gained a **"Tone tells — strip on sight"** band — a forbidden *rhythm*, not words. EN + ZH.
- **Files:** `BRAND_CONTENT_GUIDE.md` §08 + §10 · `.zh.md` §08 + §10.
- **Trigger:** User — the shipped copy "tastes greasy / robotic AI"; wants soft tone + deep knowledge, creative/fun/caring, not pitchy. Approved the proposed rewrite.
- **Next (pending user go):** re-run **Unit 0–1** — redo the Home copy in this voice; the D46 lines are the first to un-grease.

### D48 · Home re-voiced to §08 (D47) — un-greased, EN + ZH
- **Applied to `content/marketing.{en,zh}.js` home slice.** Un-greased the D46 lines against the new voice:
  - **hero.h1** → warm: EN *"Real English mastery — the kind you can see in how a child thinks." / "Taught live and one-to-one, by a Navigator who gets to know your child."* (retired "no book or app can replace"). ZH mirrored.
  - **loop.body** — retired the fragment-stack + "is not a framework we teach about — it is what we do" reversal → *"This is the shape of every session — Read → Think → Speak → Write. We keep the order steady, week to week, so a child can settle into it."*
  - **confidence results pillar** — retired "built for what comes next / the judgment AI cannot replace" → *"…is building something a machine can't do for them. That habit of mind is hard to teach, and a quiet joy to watch grow."* (keeps the AI point, calm register).
  - **confidence.heading/body** — de-fragmented ("Sixteen weeks." → "in a sixteen-week cycle"; "Measured by Lexile. Shown in writing scores." → connected sentences; dropped the every-subject/exam/language triad).
  - **hero.consultHook** — de-jargoned ("we train English Thinkers at every stage" → "at every age the work is really the same…").
  - **photoIntro.body0** + **loop Read-step** — warmed ("reading gap" → "quiet gap"; "No simplified versions. The text is the raw material." → "Never simplified versions; the book itself is what we work from.").
- **§09 consistency fix:** the §08 before→after example wrongly used "teacher" for a Navigator → corrected to **Navigator** in both guides (§09 owns the term).
- **Build gotcha caught:** the pillar edit first used a straight apostrophe ("can't") inside a single-quoted JS string → broke the build; the `npm run build 2>&1 | tail` pipe **masked the real exit code** (reported 0). Fixed to curly `’`; re-verified with a redirect (real `EXIT=0`). *Lesson: use curly apostrophes in these files; don't trust a piped build's exit code.*
- **Verified:** build clean (real EXIT=0); `/en` + `/zh` render the re-voiced copy; only pre-existing console noise.
- **Found (not in scope):** the shared **ageBands** "ELA Program" blurb still carries a "read complexity, argue with evidence, write with intention" triad — route to a chrome/ageBands pass.
- **Trigger:** User — "Warm on H1, apply."

## 2026-08-27 · Customer-site cascade — Page 2 (About)

### D49 · About reworked to v5.1 (D40/D43/D44 + §08 voice) — EN + ZH
- **Applied to `content/marketing.{en,zh}.js` about slice + `app/[locale]/about/page.jsx`.**
  - **A · meta.description** — dropped "families worldwide" (D40) + "Bilingual depth emerges" tail (D44); added online / LCS framing.
  - **B · hero.sub** — dropped worldwide + "boardrooms/lead" flex + bilingual tail; kept the Janet founding story; warmed. (hero.h1 "*speaks* vs *thinks*" kept — it's excellent.)
  - **C · beliefs pillar 3** — was the old bilingual Truth 2 → replaced with the **human/Navigator/Speaking + AI-judgment moat** (new Truth 2, D44). Also fixed the pillar-3 **heading** in the jsx (`PILLARS_BASE`) — "A rigorous English mind is a bilingual mind…" → "The things that matter most are the ones a machine can't hand you." + **pillar-4 heading** "Progress must be visible, measurable, and felt" → "We put the growth on paper…" (new Truth 3). *(Belief headings were hardcoded in the jsx, not the content slice — a miss Unit 0/D46 would not have caught.)*
  - **D · families #1 & #2** — reframed off bilingual-lead / mobility-lead → depth + aspiration (D40/D44). #3 ("Good isn't the ceiling. Depth is.") + #4 (Little DODO) kept.
  - **E · closing** — the tagline was **hardcoded in `about/page.jsx`** as the retired "Think Once." / "In Both Languages." (Unit 0 missed it). Made **locale-aware**: added `closing.tagline1/tagline2` to both content slices (EN "Think once," / "in two languages."; ZH "一次思考，" / "两种语言。") and wired the two gradient `<h2>`s + aria-label to them. Rewrote the bilingual-philosophy + greasy `closing.sub` ("Not a tagline. A philosophy.") to a warm gloss of the signature.
  - **F · loop Think/Speak** — de-fragmented (§08).
  - **Polish:** varied pillar-3 body opening so it doesn't echo its heading.
- **Verified:** real `EXIT=0` build; `/en/about` + `/zh/about` render correctly; locale-aware closing tagline confirmed (EN Latin / ZH 一次思考，两种语言。); JS sweep shows **no** stale strings (Think Once / In Both Languages / worldwide / 面向全球 / 双语深度…涌现 / 机器无法取代); only pre-existing console noise.
- **Trigger:** User — approved the About scan/proposal + "(ii) locale-aware" + "Apply."

## 2026-08-27 · Customer-site cascade — pages 3–18 (batch run)

### D50 · Methodology, Program, Compare + machine surfaces reworked to v5.1 + §08 (EN + ZH)
- **Authorized batch run** (user: "complete the rewrite by page… flag problematic areas… sync/commit/push at end"). Full self-critique in `docs/_archive/cascade-admin-review-2026-08-27.md`.
- **Methodology** — hero reversal → plain; bilingual tail dropped + "online" added; `geo` + `lexile` heading fragment/reversal tells softened (EN+ZH).
- **Program** — **retired "nine curriculum levels — Starter, Intermediate…" → seven ELA levels (D37)** (EN+ZH); "students worldwide / around the world" dropped (D40); combinations heading de-fragmented.
- **Compare** — "globally-mobile families" ×2 dropped (D40); worst overclaims softened ("decade later", "builds dependence"). Flagged 🔴 for a deeper admin voice pass + missing D41 rows.
- **ZH tagline chips** — 3 chips using "一次思考。两种语言。" (periods) → the approved comma form (D36). Unit 0 missed these (ZH rendering, not the English string).
- **Machine surfaces** — `lib/schema.js` (7×) + `app/layout.jsx` global meta: "globally mobile families" → D40 demographic+desire framing / dropped. `llms.txt`/`llms-full.txt` left intact (already D40-aligned; bilingual explicitly by-product).
- **Lexile / Results / Navigators** — swept, **no hard conflicts**; already on-voice (Navigators is the human-moat page). Left as-is with optional-polish flags.
- **Verify-only pages** (Consult/Assessment/Demos/Audiobooks/Privacy/Terms/Partners/Little DODO/Credentials) — swept, no hard conflicts.
- **Verified:** full `npm run build` REAL_EXIT=0, all routes prerendered.
- **Owed (admin decisions, not done):** §07a research block on /methodology; five-strands surfacing (Methodology+Program); D41 comparison rows + FAQ entries; FAQ "Bilingual Development" category reframe; Compare deep voice pass. All in the admin-review doc.

### D91 · /faq reworked to v5 — the last unit of the cascade (2026-09-01)

- **Decision:** `/faq` EN brought onto Brand Guide v5. Seventeen edits across four sections, plus the two owed entries. **The Loop is the per-session sequence** (admin ruling 2026-09-01) — the FAQ had described it as a four-phase progression across the 16 weeks ("Read: weeks 1–4… Think: weeks 5–8"), which is a different product from the one §05/§06 describe. Six answers rebuilt on the corrected model.
- **What was stale, and how it read:**
  - The FAQ **contradicted itself on price**: the Program section said "Two enrollment options — Full Program / Literacy Foundation" while the Enrollment section below it listed the current five combinations.
  - "Grades 3 through 8" capped a **seven-level ladder** four levels early (D37: L1 at Grade 3+, L7 college-tier, Little DODO separate at ages 5–8).
  - **"The Loop" was a section header** in EN and ZH, and in the jump-nav — against the 2026-05-21 override that LCS is the named system and The Loop is body-copy only. The nav labels were a second copy of the same string and were missed on the first pass.
  - Bilingualism led in three answers, including "the critical range where bilingual thinking either consolidates or fragments."
  - "After age 14, cognitive patterns are largely fixed" — unsourced, and it contradicted a ladder ending at college tier. Removed.
  - An uncited executive-function claim about bilingual performance. Replaced by the D38 entry, which cites real studies.
- **Bilingual Development kept, re-voiced** (admin ruling): the category answers a real parental worry and §10 forbids dismissing it. Now framed as **"cognitive depth protects both languages"** — the heading already said this; the answers underneath had drifted.
- **D38 shipped** — "Is DODO's approach evidence-based?" into Results + Measurement, using four of §07a's five licensed claims with citations, in the acceleration frame (no gap/remediation register).
- **D41 shipped** — "Why not just use ChatGPT?" into The Program, referencing §01b rather than restating it, and closing on the Speaking strand.
- **Where it lives now:** `content/faq.js` sections.en + the EN/ZH jump-nav labels.
- **ZH is deliberately behind.** `translation/pending-en.json` holds the 31 changed strings for the DeepSeek handoff per §15. ⚠️ Until that lands, the ZH FAQ still says 两种报名选项 — a **pricing fact** that disagrees with EN, not a voice difference. Priority item in the handoff.
- **Trigger:** Wave 5, the only unit of the v5 cascade never done.

### D92 · Wave 5 remainder — and two rulings the work forced (2026-09-02)

- **Decision:** the last five Wave 5 items shipped EN (`fde04cf`) then ZH (`2bccb55`).
  D37 five strands on `/methodology` + `/program`, D38 §07a research block, D41's two
  `/compare` rows, D14's Type A/B caption, and the `/compare` voice pass. The v5 cascade
  is now **18/18**.
- **D14 was a live contradiction, not an owed chore.** The caption emptied out of
  `program.loop.typeAB` on 2026-05-21 "moved to /methodology" mostly did move — but the
  sentence *"Type assignment is driven by the student's current Lexile data, not a fixed
  rotation"* did not, and the heading it landed under read *"Every cycle **alternates**
  two kinds of session."* The page asserted the thing the retired sentence ruled out, for
  three months. Heading → "runs"; sentence restored as `sessionTypes.note`.
- **RULING · `/compare`'s problem was a rhythm, not its claims.** The `not X — but Y`
  reversal §10 names as strip-on-sight ran **ten times** — every `s3`, `s6` and `s7`
  title, plus `s4.caption` and `s6.h2` — with fragment-stacking in four more places.
  Nine became statements. **One survives, deliberately**, in `s3.cols[0]`: the page's
  opening claim, where the contrast *is* the argument and the body immediately earns it.
  Stripping all ten would flatten what a comparison page is for. The tell is the
  unvaried formula, not the device.
- **§06 breach fixed on a conversion page.** `/compare` used "The Loop" as the named
  system in a section header — forbidden on brand surfaces since the 2026-05-21 override
  — and "LCS" appeared **zero** times. Now inverted.
- **RULING · the ZH name for LCS.** §09's 2026-06-01 admin set makes **语言循环体系**
  canonical and supersedes **both** `LCS 教学体系` and `LCS 教学理念`. Neither reference
  file had followed: `DEEPSEEK_BRIEF.md` still said 教学体系 and the generated
  `pending-en.json` reminder said 教学理念 — either would have steered all 52 keys of the
  batch to a retired term. Both corrected in `c77c8d1` before the handoff went out.
  ⚠️ **Six instances remain in `content/marketing.zh.js`** (教学理念 ×2, 教学系统 ×2,
  教学体系 ×1, `LCS 系统` ×1). Not swept, because §09 is finer than a find-replace:
  语言循环体系 is the canonical **ZH section header**, body copy uses **"The LCS"**.
  Which of the six are headers is an open call.
- **The ZH return needed two owned terms fixed.** `脉络` ×10 — invented; the guide's ZH
  for a content strand is **板块** (15 uses in the ZH guide, `脉络` zero). And
  `LCS 教学体系` ×2, the very term corrected upstream hours earlier. Also `普通教师` →
  `家教` (EN says *tutor*; "ordinary teacher" is a different and more arrogant claim, and
  shipped ZH uses 家教 ×9).
- **Wave 3 was NOT forced, against the plan's prediction.** The completion plan expected
  D37 to produce a hand-rolled fifth label and said to sequence 3 before 5. It did not:
  on `/methodology` the nested strands are a term plus a definition, so a real `<dl>`;
  on `/program` they are bare taxonomy values, which is what `TagRun` (D70) already
  exists for. Nothing private was invented. Wave 3 drops from blocker to tidy-up.
- **Where it lives:** `content/marketing.{en,zh}.js` — `methodology.strands`,
  `methodology.research`, `methodology.sessionTypes.note`, `program.architecture`,
  `compare.s3–s7`; `app/[locale]/{methodology,program}/page.jsx`; `.font-cjk` added to
  the utilities layer in `styles/globals.css`.
- **Trigger:** Wave 5, the remainder after D91.

### D93 · MCT may be named four times on `/methodology` — stated exception (2026-09-02)

- **The conflict.** §07 lists `/methodology` as a permitted surface for four MCT
  phrasings and licenses each one used there. §06 says MCT is named **once**, as the
  lineage of the L/C content. Both rules are current; they disagree about this page.
- **Decision (admin, 2026-09-02): the §07 reading wins on `/methodology`, as a stated
  exception.** The four live namings stand — `definition.body` ("the MCT gifted-ELA
  tradition"), step 01 ("the MCT Language Arts tradition"), step 04 ("the MCT Language
  Arts progression"), and `geo.body` (the four-framework list).
- **Why it holds.** §06's "named once" rule exists to stop MCT reading as the *source of
  each line* — the product-resale framing §07 forbids. On `/methodology` each naming does
  a different job: lineage, reading provenance, the writing arc, and a GEO framework
  list. None of them says "we teach MCT."
- **Scope — this is not a licence elsewhere.** The exception is for `/methodology` only,
  because it is the one page whose job is to explain the method in full. §06's single
  naming still governs `/program`, `/compare`, `/about`, `/faq` and every machine
  surface. A fifth naming on `/methodology` is not covered either — D92's new `strands`
  and `research` sections were deliberately written without one.
- **Trigger:** flagged during D92's page pass; the two rules could not both be followed.
