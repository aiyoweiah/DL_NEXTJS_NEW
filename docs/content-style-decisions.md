# Content style decisions log

**Purpose:** Date-stamped log of active brand/voice decisions made during page-by-page content reviews. Decisions promoted from this log into `translation/BRAND_CONTENT_GUIDE.md` when stable. Living doc — append, never delete.

**How to read:** Each entry includes (1) the decision, (2) what it overrides if anything, (3) where it lives now (brand guide section, glossary entry, skill lint rule), and (4) the trigger (which review surfaced it).

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
- **Decision:** (a) The founder is named on /about as **Janet** (first name — warm conversion register), in the hero sub + video label (founder identity, §12 must-include). Full **"Janet Sui"** is reserved for formal credits (/compare "From the Founder" byline), legal signatory (AgreementTool), and the pending Person schema. (b) The closing-stamp ZH H2 switches from the literal "一次思考，两种语言。" to the canonical poetic sub-tagline **"语言的根，长在阅读里"** (§00). EN tagline unchanged.
- **Where it lives now:** `marketing.{en,zh}.js` `about.hero` · `about/page.jsx` ClosingStamp.
- **Trigger:** User C-3, C-6.

### Reinforced (not new)
- **ZH combat-metaphor lint** caught **捍卫** in the /about Speak step + Pillar 01 body — replaced with 阐明并支持 / 支持自己的立场. Lint rule already in §08 + skill; this is a recurrence flag.
- **Affirmative voice** — removed the oppositional "Not teachers. / Navigators." chip pair from /about §5 (render deleted; orphan `chipNot`/`chipAre` content keys left harmless).

---

## 2026-06-01 (later) · Chrome overhaul (navbar + footer)

Scope: redesign navbar + footer for simplicity, fix tablet UX cliff, kill nav/footer redundancy, fix EN-hardcoded-chrome translation bug, ship Privacy + Terms stubs, reserve a slot for the future DODO Coding sibling site. Plan file: `~/.claude/plans/study-the-current-navbar-sharded-sundae.md`. Commit: `03f1131`.

### D23 · "The Method" as cold-traffic nav label for /methodology
- **Decision:** The global nav uses **"The Method" / "方法"** as the top-level label for `/methodology`. Brand-owned term **"The Loop"** is preserved inside the page body (hero, anchors, JSON-LD) and across the broader methodology vocabulary. The nav label is the cold-traffic translation; the page itself still names "The Loop" and "The LCS System" per D1/D19.
- **Reasoning:** "The Loop" reads as in-group vocabulary to a parent landing on the site for the first time. "The Method" is unambiguous in chrome; the owned term carries weight inside the page where the parent has committed to reading.
- **Where it lives now:** `content/marketing.{en,zh}.js` `nav.primary` array · `components/layout/Navbar.jsx` (label only — href unchanged at `/methodology`).
- **Trigger:** User direction during plan-mode review of the chrome overhaul.

### D24 · "Reading Companion" as cold-traffic UI label for /audiobooks
- **Decision:** The UI label for the gated `/audiobooks` library is **"Reading Companion" / "阅读伴"** wherever it appears in chrome and member-facing surfaces. The URL `/audiobooks` is unchanged for routing / back-compat / sitemap / hreflang stability. Cloudflare Access gate is unchanged — the nav item is a members-area entry point, not a marketing surface; rendered with a lock glyph + "members" / "学员专属" micro-tag (visible at `lg+`, omitted at `md` to save horizontal width).
- **Reasoning:** "Audiobooks" describes the file format; "Reading Companion" describes the role the library plays in a student's program. Aligns the label with the value proposition rather than the medium. The ZH rendering "阅读伴" is the proposed short form — confirm with brand voice before locking; alternatives in play: 共读伙伴, 阅读伴侣.
- **Where it lives now:** `content/marketing.{en,zh}.js` `nav.primary[4].label` · `Navbar.jsx` renders the lock glyph and `members` tag · all marketing references to "the library" should follow this rename.
- **Trigger:** User direction during plan-mode review.
- **Watch:** ZH translation 阅读伴 is provisional. If brand voice prefers 共读伙伴 or 阅读伴侣, swap in `marketing.zh.js` only — no other surface depends on the string.

### D25 · Chrome i18n pattern — copy passed as prop from server layout
- **Decision:** Navbar and Footer no longer hardcode EN labels in component constants. Both consume a `copy` prop resolved once per request in `app/[locale]/layout.jsx` (which imports both `nav`/`footer` exports from `marketing.en.js` and `marketing.zh.js` and selects by locale). Pattern keeps the client-side Navbar from bundling both locale modules and matches the existing per-page convention.
- **Overrides:** Prior pattern where `PRIMARY_LINKS` / `NAV_PROGRAM` etc. were const arrays inside the component files, EN-only. Fixed a silent correctness bug where `/zh/*` pages rendered Chinese page bodies wrapped in English nav + footer chrome.
- **Where it lives now:** New namespaces `nav` + `footer` at the top of `content/marketing.en.js` and `content/marketing.zh.js`. `app/[locale]/layout.jsx` imports both and passes the resolved object to `<Navbar copy={...} />` / `<Footer copy={...} />`.
- **Trigger:** Chrome overhaul scope; flagged in plan as "the single biggest correctness bug the redesign should fix."

### D26 · Audience cue — "globally mobile families" on chrome surfaces
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
- **Decision:** The navbar primary CTA, the home hero primary, and the `/about` closing all lead with **Watch a Demo Class / 观看示范课** (zero-commitment, "free, no sign-up"). **Book Your Consultation** is demoted to the firm close — mobile-drawer ghost, deep-page bodies, and the footer band. Cold/high-traffic surfaces lead soft; warm surfaces (post-content, post-video) close firm.
- **Overrides:** Chrome-overhaul state where Book Your Consultation was the single primary CTA on every cold surface (navbar + hero + footer) and Watch was demoted.
- **Where it lives now:** `nav.cta` (demo-first), `home.hero.cta1/cta2`, `about.closing.cta`; `Navbar.jsx` (desktop button + drawer order swapped, hides Watch on `/demos`); `page.tsx`/`about/page.jsx` hrefs realigned.
- **Trigger:** User funnel-redesign direction — "replace booking consultation with watch demo class as top-of-page soft closer; consult is the firmer close on the demo page."

### D28 · One conversion moment per page — charter bands removed, PreCtaBand is path-aware
- **Decision:** No page renders the dark consult panel twice. The per-page `charter` bands (duplicates of the global footer band) were **deleted from `/program`, `/demos`, `/consult`** plus the duplicate `BookCall` on `/demos`. The global pre-footer band was extracted to a client component **`PreCtaBand.jsx`** that is **path-aware**: firm consult close on every page, but on `/consult` itself it swaps to a soft "Watch a Demo Class" offer (`footer.preCtaWatch`) so it never links back to the page you're on. Default-band ghost changed `See The Program → Watch a Class`.
- **Overrides:** The additive pattern where most pages stacked an in-body `cta` band + a near-identical `charter` band + the global footer band (up to 3–4 consult asks in a row).
- **Where it lives now:** `components/layout/PreCtaBand.jsx` (new) + `Footer.jsx`; `footer.preCta` (ghost→watch) + new `footer.preCtaWatch`; charter sections removed from the 3 page files.
- **Follow-up:** Even at one in-body CTA + one footer band, the band still sat directly under a page's own closing CTA on content pages → "two CTAs in a row." **Resolved by D33 (band as fallback).**

### D29 · Assessment reframe — consult before assess
- **Decision:** Families are **consulted before being assessed.** The consultation decides fit; the Lexile baseline is measured only after enrollment (Week 0/8/16). All "Book a Free Lexile Assessment"-style entry CTAs removed. `compare.s9` reframed (the *consultation* decides fit, not the assessment). Footer Program-column label `Free Assessment → The Lexile Assessment / Lexile 测评` (informational, still `soon`).
- **Where it lives now:** `compare.s9` (h2/sub/cta/note), `footer.program` assessment row, `program.cta.note` (dropped "assessment included"); `/assessment` + `/lexile` remain informational explainers.
- **Trigger:** User — "Assessment page won't act as a second step in the closing process. We want to consult families before assessing them."

### D30 · CTA label standardization + nav renames (ELA Program, DODO Method)
- **Decision:** One action, one label. EN: **Book Your Consultation** (firm), **Watch a Demo Class** (soft), **See The 16-Week Program** (secondary). ZH consult standardized to **预约咨询** — deliberately dropping 评估 (assessment) from the consult CTA to reinforce D29. Exception: the `/consult` hero keeps first-person **Book My Consultation / 预约我的咨询**. Nav renames: **The Program → ELA Program / ELA 课程**, **The Method → DODO Method / DODO 教学法**.
- **Overrides:** D23 (`/methodology` label "The Method/方法" → now "DODO Method/DODO 教学法"). Replaced the 4–5 drifting consult labels ("Book a Diagnostic Call", "Book a Free Lexile Assessment", etc.) and 4 secondary-label variants.
- **Where it lives now:** `nav.primary`, all page `cta`/`ctaPrimary`/`ctaSecondary` in `marketing.{en,zh}.js`.
- **Trigger:** User renames + site-wide CTA audit.

### D31 · Gated nav item — lock glyph only, "members" tag → sr-only
- **Decision:** The gated `/audiobooks` (Reading Companion) nav item shows the **lock glyph only**; the visible "· members / · 学员专属" micro-tag is removed and the gating word is now **`sr-only`** (still announced to screen readers via `copy.members`).
- **Overrides:** D24's visible `lg+` "members" micro-tag.
- **Where it lives now:** `Navbar.jsx` (Desktop + Mobile NavLink render `<span className="sr-only">`); `nav.members` repurposed as the sr-only string.
- **Trigger:** User — "Remove the wording of members on the navbar, keep the lock icon only."

### D32 · Little DODO — forthcoming K–2 ELA sub-program (positioning recorded; page not yet built)
- **Decision (direction):** The ELA Program is being extended with a sibling program, **Little DODO**, targeting **K–2 / pre-elementary starters** — a **high-frequency, low-pressure** reading + comprehension program. Operationally it shares the main program's pillars: **tuition, environment, frequency, and Navigators are all similar.** What differs is **marketing/packaging emphasis and target audience** — early foundational literacy, reading habit + confidence, and comprehension basics, *not* the older program's "argue with evidence / write with intention / Lexile-rigour" register.
- **Status:** A dedicated marketing page is planned (Task 3 — "eventually build"). Ground rule from user: **strictly follow the design framework (`.interface-design/system.md`) while showing thoughtfulness to the K–2 target audience.** Full positioning + page plan in `docs/little-dodo-plan.md`. IA decision (URL, how it relates to the "ELA Program" nav item) is OPEN — see workflow.md #20.
- **Trigger:** User — program-extension briefing, 2026-06-02.

### D33 · Pre-footer band is a soft fallback, not a peer panel (resolves #19)
- **Decision:** Option A. The global `PreCtaBand` now yields **one conversion moment per page**: it is **suppressed** on every page that already owns an in-body closing CTA (about, program, methodology, lexile, results, navigators, compare, demos, consult, blog, cities, audiobooks, privacy, terms) and **shown only as a soft fallback** on pages without one (home, `/faq`, `/partners`, `/assessment`). Where shown it leads **soft** — Watch a Demo Class (primary) + Book Your Consultation (ghost) — matching the cold-surface = soft-close rule.
- **Overrides:** D28's path-aware-swap implementation. The `/consult`-only swap and the `footer.preCtaWatch` block are removed (consult now suppresses the band entirely). `footer.preCta` reframed from the firm "Ready to meet your Navigator?" to the soft "See a real class before you decide."
- **Where it lives now:** `components/layout/PreCtaBand.jsx` (`SUPPRESS` prefix list + soft render); `footer.preCta` in `marketing.{en,zh}.js` (reframed soft; `preCtaWatch` deleted).
- **Trigger:** User — "the section just above the footer is almost always redundant to the section above it." Chose Option A from the 2026-06-02 proposal.
