# ⏳ PENDING — customer-facing cascade (do NOT start until guide-level edits are fully approved)

**Created:** 2026-08-26 · **Gate:** implement only after **all** guide-level edits (D36–D39 + any critique-driven revisions) are approved by the user. Per the standing apply-gate ([[feedback_about_review_apply_gate]]): propose at the guide/dump level; touch live customer surfaces only on an explicit "apply."

**Source of the approved guide-level changes:** `translation/BRAND_CONTENT_GUIDE.md` (§00, §06, §07a, §09, §16), `translation/BRAND_CONTENT_GUIDE.zh.md`, logged as D36–D39 in `docs/content-style-decisions.md`.

## Cascade checklist (per surface)

### D36 · Tagline "Think once, in two languages."
- [ ] Home hero (EN + ZH) — `content/marketing.{en,zh}.js` / `app/[locale]/page.tsx` (`hero`)
- [ ] `/about` ClosingStamp (EN + ZH)
- [ ] Any other surface carrying the old string `Think Once. In Both Languages.` — grep site-wide first
- [ ] `dodo-content-writer` skill lint: retire old tagline → new (same mechanism as the "Think Twice" guard)
- [ ] ZH rendering: 一次思考，两种语言。(comma) wherever the EN-tagline ZH form appears

### D38 · Research Base (§07a) seeding
- [ ] `/methodology` — "Why this works" block (40–80-word GEO-ready + the 5 permitted claims, EN + ZH)
- [ ] `public/llms-full.txt` — mirror the citation list + claims (EN only)
- [ ] One `/faq` entry — "Is DODO's approach evidence-based?" (EN + ZH, `content/faq.js`)
- [ ] `schema` — `Course`/`EducationalOccupationalProgram` with `citation` nodes (hand to `schema` skill)
- [ ] Enforce the hard rule everywhere: **acceleration into mastery**, never ELL/remediation/catch-up

### D37 · Five-Strands-under-LCS + 7-level ELA (if surfaced)
- [ ] `/methodology` — optional "comprehensive approach" section (LCS umbrella + nested strands + Speaking-as-differentiator)
- [ ] Verify no live surface still implies the retired "9 levels / Poodle" ELA framing
- [ ] Confirm Little DODO surfaces stay separate / non-MCT

### D40 · Positioning shift — drop explicit international, add local, target by demographic + desire
- [ ] `/program` — remove "globally-mobile" / "students around the world" headline framing (EN + ZH)
- [ ] `/about` — same; reframe audience as aspiration-defined (local + international implicit)
- [ ] Home PhotoIntro body + `/compare` — same
- [ ] `public/llms.txt` + `llms-full.txt` lead blockquote — drop "globally-mobile" headline; keep worldwide service as implicit
- [ ] SEO meta (per-page) — audit for global-headline framing
- [ ] Add local/settled-family framing where a surface addresses audience
- [ ] `dodo-content-writer` lint: flag "globally-mobile / students around the world / 面向全球家庭" as headline framing to retire

### D41 · Positioning statement + objections + AI rebuttal + anti-persona
- [ ] Consider surfacing the canonical positioning statement on `/about` (strategic spine)
- [ ] Seed the AI-question rebuttal + key objections into `/faq` and `/compare` (EN + ZH)
- [ ] Add the free-AI-tutors + gifted-ELA-books comparison rows to `/compare`

### D42 · Marketing direction (mostly internal — selective surfacing)
- [ ] AI-age thesis threaded on home / `/about` / `/methodology` where it fits (don't duplicate DODO Coding)
- [ ] GTM levers (referral engine, community, lead magnet) are program decisions — route to `referrals` / `community-marketing` / `lead-magnets` skills when greenlit, not a copy cascade

## Build discipline
- [ ] EN + ZH parity on every surface touched
- [ ] `npm run build` clean; visual diff `/zh/*`
- [ ] Log completion back into `docs/content-style-decisions.md` (mark D36/D38 cascade done)
- [ ] Sync check before any push (per `CLAUDE.md` — re-fetch only at push time)
