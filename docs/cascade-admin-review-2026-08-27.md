# Customer-site cascade — admin review (2026-08-27)

Self-critique of the v5.1 + §08 rewrite, per page. **Flag key:** 🔴 still reads robotic / salesy / AI-like or not wholly confident — wants an admin decision or a deeper pass · 🟡 recommended addition (net-new content, an admin call) · 🟢 clean / minor-optional. Decisions D45–D50 in `content-style-decisions.md`.

---

## Home — 🟢 (D46 content + D48 voice)
- Re-voiced; no residual robotic tells found.
- 🟡 **Proof stats:** the unverified "2× writing gain" and "8/10 continue" tiles were swapped for §11-verified "75%+ referral" and "10,000+ hours." If you have real source data for a writing-outcome or retention number, hand it over and the outcome tile can come back.

## About — 🟢 (D49)
- Re-voiced; bilingual pillar retired → human/AI moat; closing tagline now locale-aware.
- Note: the **Name / Do+Do** section is legitimately about two languages (it's the name's meaning) — left intact by design.

## Methodology — 🟡 / one 🔴-lite
- Fixed: hero reversal, bilingual tail, geo/lexile heading tells (EN+ZH).
- 🔴 **`geo` section** ("For LLMs and Search") is intentionally keyword-dense; even softened, it still reads more like SEO copy than the rest of the site. Consider whether it should be visible parent-facing copy at all, or moved to a machine surface.
- 🟡 **§07a Research Base "Why this works" block (D38) is not on this page** — the Latin/Greek-roots evidence currently lives only on `/credentials`. Recommended add here.
- 🟡 **Five content strands (D37)** — the page names LCS = Literacy/Composition/Speaking but never names the five strands (Literature · Vocabulary · Poetics · Grammar · Writing). Recommended surface.

## Program — 🟡
- Fixed: **"nine curriculum levels — Starter, Intermediate…" → seven ELA levels (D37)** (was the retired framing, EN+ZH); "worldwide/around the world" dropped (D40); combinations heading de-fragmented.
- 🟡 **Five strands** — `architecture.strands` is the natural home for the five-strand structure (D37); currently only L/C/S branch level. Recommended.
- Note: live **pricing** ($2,830 Summit / $2,250 Core / …) — memory flags the legacy price→combination mapping as an open admin decision; untouched here.
- 🟢 The "A Real Session" narrative (Ms. Jennifer / soft consonants) is exactly the target voice — left as-is.

## Compare — 🔴 (biggest concern)
- Fixed: "globally-mobile families" ×2 (D40); the worst overclaims ("visible a decade later", "builds dependence").
- 🔴 **This page is still the most salesy on the site.** It's a "vs" page, so contrast is its job (§08 permits we-don't/we-do for category clarity) — but it leans heavily on fragment-stacks and "not X — it's Y" reversals throughout (s3/s6/s7). It did not get a full re-voice. **Recommend an admin-reviewed deeper voice pass.**
- 🟡 **D41 additions missing:** the free-AI-tutors and gifted-ELA-books comparison rows aren't present.

## FAQ — 🟡 (strategic decisions needed)
- 🔴/🟡 **"Bilingual Development" category** uses retired framing — "bilingual thinking" vs "bilingual fluency," the "bilingual advantage" research claim, "maintain their Chinese." This is off the D44 strategy (bilingual = by-product, not the lead). Bilingual households are a real segment (§04 keeps them), but the *framing* is old. **Admin call: keep, reframe, or slim this category.**
- 🟡 **Missing entries:** D38 "Is DODO's approach evidence-based?" and D41 "Why not just ChatGPT?" — both are recommended adds from the cascade plan; not yet present.
- Minor: one reversal tell ("These are not language skills. They are cognitive architecture.").

## Lexile — 🟢 (minor)
- No hard conflicts. Bilingual-learner Lexile context is legitimate parent-education (§04).
- Minor optional tells: "One number." fragment; "Closing that gap" is mild deficit language (framed educationally). Optional polish only.

## Results — 🟢
- No hard conflicts; already on-voice ("Growth you can read in a number," "Writing scores move because thinking moves"). "in both languages" appears once as a by-product mention (legit).

## Navigators — 🟢
- No hard conflicts. This is the human-moat page and is already on-strategy for the new Truth 2. It uses the "Not a teacher / Not a tutor" contrast heavily — permitted category clarity, and the bodies are warm. Optional light polish on a couple of fragment-stacks.

## Machine surfaces
- 🟢 **`lib/schema.js` (7×) + `app/layout.jsx` global meta** — FIXED: "globally mobile families" → D40 demographic+desire framing / dropped.
- 🟡 **`public/llms.txt` + `llms-full.txt`** — largely D40-aligned already (line 11 carries the exact "not built around that demographic… built around capable students seeking mastery" framing; bilingual is explicitly labeled by-product). Optional: refresh the lead blockquote to the D43 one-sentence position; §07a research base is only partially seeded. Left intact (consistent with the standing "keep by-product bilingual threads" decision).
- Minor: `components/ui/LoopDiagram.jsx` Think-step says "process meaning in both languages" — a by-product mention, left per the keep-threads decision.

## Verify-only pages — 🟢
- Consult · Assessment · Demos · Audiobooks · Privacy · Terms · Partners · Little DODO · Credentials — swept for hard conflicts (worldwide / bilingual-lead / 9-levels / retired tagline); **none found.** Partners' hardcoded tagline was fixed in Unit 0. These were not given a deep line-by-line voice pass (low copy density / functional pages).

---

## Cross-cutting notes for admin
1. **Robotic/AI-like patterns that remain** are concentrated on **Compare** (by design, but overdone) and pockets of **FAQ** and the **methodology `geo`** block. Everything else reads in the new soft/deep voice.
2. **Net-new content still owed** (not a re-voice, an admin build decision): §07a research block on `/methodology`, five-strands surfacing (Methodology + Program), D41 comparison rows + FAQ entries.
3. **My lower-confidence rewrites** (worth a second read): Program hero.sub "online, so geography stops mattering" (slightly slick); the Compare overclaim replacements (context around them is still salesy); About beliefs pillar-3 (new human/AI framing — check it lands as intended).
