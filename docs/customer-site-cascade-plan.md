# Customer-Site Content Update — v5 Guide Cascade Plan

**Created:** 2026-08-27 · **Supersedes & absorbs:** `docs/pending-guide-cascade.md` (the earlier D36–D42 queue is folded in below, per-page).
**Goal:** bring **every customer-facing surface** into line with Brand Guide **v5 (D36–D44)** — the new one-sentence position (D43), the redesigned Three Brand Truths (D44), the retired tagline (D36), the positioning shift (D40), LCS/five-strands/7-levels (D37), the research base (D38), objections/AI rebuttal (D41), and marketing direction (D42).

**Method (user-set 2026-08-27):** **one surface at a time.** Scan a page → fully rework it → verify → log → only then move to the next. No parallel half-edits across pages.

**Apply-gate:** for each page, propose the reworked copy in chat first; touch live files only on an explicit **"apply"** ([[feedback_about_review_apply_gate]]).

---

## Per-page workflow (repeat for every unit below)

1. **Scan** — read the page's live copy (its `content/marketing.{en,zh}.js` slice + `app/[locale]/<page>/page.*` structure + its `meta`/schema). Snapshot the current state and list every guide-conflict found.
2. **Diagnose** — check the page against the v5 checklist:
   - **D43** position · **D44** three truths · **D36** tagline · **D40** drop "globally-mobile/worldwide/面向全球" headline, add local/settled · **D37** LCS + five strands + 7 levels (no "9 levels/Poodle") · **D38** research base where it fits · **D41** objections + AI rebuttal (canonical home = §01b, reference it) · **D42** direction · **§10** anti-dictionary · **§08** voice · **§12** page voice-cue.
   - Apply marketing skills up front (`copywriting`, `copy-editing`, `marketing-psychology`, `cro` as fits).
3. **Propose** — full reworked copy, **EN + ZH**, in chat.
4. **Apply** (on user's go) — edit `marketing.{en,zh}.js` (EN+ZH parity), page `meta`, any page-specific schema. Numbers only from **§11** (never invent; edit centrally).
5. **Verify** — `npm run build` clean; browser visual diff EN + `/zh`; console/network clean.
6. **Log + check off** — record decision(s) in `content-style-decisions.md`; tick the page here; move to the next.

**Standing guardrails:** EN+ZH parity on every surface · numbers only from §11 · no discount/deficit/urgency/**remediation** language (frame all research/proof as *acceleration into mastery*) · keep **Little DODO separate / non-MCT** · sync-check (`git fetch && git status -sb`) only immediately before a push.

---

## Unit 0 · Foundations (global chrome + mechanical swaps) — do first, unblocks all pages

- [x] **Tagline swap (D36)** — *verified 2026-08-29: 0 occurrences of the old string in live code.* — replace `Think Once. In Both Languages.` → `Think once, in two languages.` (ZH: 一次思考，两种语言。) in the **global** slots: `marketing.en.js` `cta.tagline` (L90), `brand.tagline` (L124); `app/layout.jsx` (L34); ZH equivalents. *(Per-page `meta`/`chip` taglines — L196, L212, L366, L611, L1362, zh L178/L194 — are swapped inside each page's unit below.)*
- [ ] ⚠️ **`dodo-content-writer` skill lint** *(cannot be verified from this repo — the skill is registered at user scope, not under `.agents/skills/` here. Confirm separately.)* — add the retired-tagline guard (same mechanism as the "Think Twice" guard) + flag "globally-mobile / students around the world / 面向全球家庭" as headline framing to retire.
- [x] Footer/nav copy audit for any position/tagline drift. — *verified 2026-08-29: 0 occurrences of `globally-mobile` in live code.*

---

## Page queue (in order)

### Tier 1 — Strategic spine

**1 · Home (`/`)** — highest leverage; everything ladders from here.
- Old tagline ×3 in meta/chip (L196, L212 + zh). Bilingual-lead **H1** (L204 "English mastery… / Bilingual depth as the natural outcome.") and loop body (L230). "globally mobile families" body (L123 brand.body). Rework hero to new **position (D43)**; thread **Truth 2** (human/AI moat) + **Truth 1**; demote bilingual to by-product; drop "globally mobile" headline (D40).

**2 · About (`/about`)** — the strategic spine (positioning statement + truths + founder).
- Heavy bilingual framing (L510, L518, L534, L599, L823) and "families worldwide" (L510). Seat the **canonical positioning statement (D40/§01)**; carry the **three truths (D44)** as the page's spine; keep Janet first-name (§11); reframe the bilingual sections as by-product; add local/settled framing.

**3 · Methodology (`/methodology`)** — LCS + research base.
- "students worldwide / around the world" (L363, L371). Add the **§07a research "Why this works" block (D38)** (40–80-word GEO-ready + the 5 permitted claims); surface **LCS umbrella + five strands + Speaking-as-differentiator (D37)**; enforce acceleration-not-remediation.

### Tier 2 — Conversion & proof

**4 · Program (`/program`)** — product architecture.
- Drop "globally mobile / students around the world" (L363, L371); confirm **7-level ELA ladder (D37)**, no "9 levels/Poodle"; align the **5 Programme Combinations**; LCS naming.

**5 · Compare (`/compare`)** — objections & differentiation.
- "globally-mobile families" (L745, L750). Add **free-AI-tutors + gifted-ELA-books rows (D41)**; seed the **AI rebuttal** (reference §01b, don't restate whole); switching-anxiety answers.

**6 · FAQ (`/faq`, `content/faq.js`)** — objection matrix.
- Add **"Is DODO's approach evidence-based?" (D38)** entry (EN+ZH); add the **AI-question** rebuttal (D41); align objections to §01b.

**7 · Lexile (`/lexile`)** — proof / Truth 3.
- Bilingual-learner context is legitimate here — keep, but frame as *acceleration* (no "below grade / gap" as deficit). Tie to new **Truth 3 "growth on paper."**

**8 · Results (`/results`)** — outcome proof.
- Align case-card conventions to §11; Truth 3 accountability framing; build toward the **proof-depth directive (D42)**.

**9 · Navigators (`/navigators`)** — the human moat.
- This is **Truth 2's** home surface — lead with the credentialed-Navigator relationship + **Speaking strand** as the work no book/app/AI can do.

### Tier 3 — Verify-only / peripheral

**10 · Credentials (`/credentials`)** — **already built** (D37/D38 cascade). Verify only against D43/D44 wording; likely light.
**11 · Little DODO (`/little-dodo`)** — **parked**. Tagline swap + confirm it stays **separate / non-MCT / pre-Lexile**. No positioning rework.
**12 · Partners (`/partners`)** — referral-engine framing (D42); tagline.
**13 · Consult (`/consult`)** — form-page copy check; tagline/meta.
**14 · Assessment · Demos · Audiobooks** — voice + tagline/meta pass; low copy density.
**15 · Privacy · Terms** — tagline/meta only.

### Tier 4 — Machine-readable surfaces (after human pages — they summarize them)

**16 · `public/llms.txt` + `llms-full.txt`** — lead position → new one-sentence (D43); drop "worldwide/globally-mobile" **headline**, keep worldwide service **implicit** (D40); research base already partly seeded (D38).
**17 · Global schema** — Organization/Course nodes align to new position; `credentialsSchema()` citation nodes already shipped — verify only.
**18 · Per-page SEO `meta`** — handled inside each page's unit (Tiers 1–3), audited here for global consistency.

---

## Progress log
*(tick pages as completed; record the decision id from `content-style-decisions.md`)*

- [x] Unit 0 · Foundations — **done 2026-08-27 (D45)**; tagline purged from all live code (13 occ. across 8 files), lint corrected + D40 guard added
- [x] 1 · Home — **done 2026-08-27 (D46 content + D48 re-voice)**; hero/meta/brand/photoIntro/confidence/loop reworked EN+ZH, 2 unverified stats softened, results pronouns fixed, re-voiced to §08 (soft/deep), build clean
- [x] 2 · About — **done 2026-08-27 (D49)**; meta/hero/beliefs/families/closing reworked EN+ZH to v5.1 + §08 voice; bilingual pillar-3 retired → human/AI moat; **hardcoded retired tagline in about/page.jsx** fixed → locale-aware closing tagline; build clean
- [x] 3 · Methodology — **done (D50)**; hero reversal, bilingual tail, geo/lexile tells fixed EN+ZH. 🟡 owed: §07a research block (D38), five-strands (D37) — see admin-review doc
- [x] 4 · Program — **done (D50)**; **9→7 levels (D37)**, worldwide dropped (D40), combinations de-fragmented EN+ZH. 🟡 five-strands
- [x] 5 · Compare — **partial (D50)**; D40 + worst overclaims fixed. 🔴 deeper voice pass + 🟡 D41 rows owed (admin-review doc)
- [ ] 6 · FAQ — 🟡 not rewritten; bilingual-dev category + missing D38/D41 entries flagged for admin
- [x] 7 · Lexile — **reviewed (D50)**; no hard conflicts, on-voice, optional polish only
- [x] 8 · Results — **reviewed (D50)**; no hard conflicts, on-voice
- [x] 9 · Navigators — **reviewed (D50)**; no hard conflicts, already human-moat/on-strategy
- [x] 10 · Credentials — swept, no hard conflicts
- [x] 11 · Little DODO — swept, no hard conflicts (parked; tagline done in Unit 0)
- [x] 12 · Partners — tagline done (Unit 0); no other hard conflicts
- [x] 13 · Consult — swept, no hard conflicts
- [x] 14 · Assessment / Demos / Audiobooks — swept, no hard conflicts
- [x] 15 · Privacy / Terms — swept, no hard conflicts
- [~] 16 · llms.txt / llms-full.txt — reviewed; already D40-aligned, left intact (optional lead refresh flagged)
- [x] 17 · Global schema — **done (D50)**; `lib/schema.js` ×7 + `app/layout.jsx` globally-mobile → D40 framing
- [x] 18 · Per-page meta — audited during each page; global meta (layout.jsx) fixed

**Admin review:** self-critique + owed items in `docs/cascade-admin-review-2026-08-27.md`.
