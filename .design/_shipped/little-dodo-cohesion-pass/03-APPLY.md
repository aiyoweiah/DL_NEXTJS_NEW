# Apply log — Little DODO cohesion pass

**Applied:** 2026-06-11
**Branch:** main (uncommitted at time of write — see "Next steps")
**Verification:** `npx next build` clean; browser spot-check `/en` + `/en/little-dodo` on dev server confirmed all changes render as designed.

---

## What landed

Order applied matched `01-FINDINGS.md` §"Apply sequencing":

### Round 1 — Priority B + A
- **`content/marketing.en.js:1199`** `navigators.k2Note.text` — false "teach across both bands" claim replaced with two-team philosophy
- **`content/marketing.zh.js:1173`** ZH mirror of the above
- **`public/llms.txt:1`** brand-summary line — "same Navigators" dropped; reframed as two specialist teams under one philosophy
- **`public/llms.txt:7`** stale "grades 3 through 8 (ages 7–15+)" scope → "ages 5 through high school"; Navigator paragraph split into ELA Program Navigators + Little DODO educators
- **`public/llms.txt:13`** Little DODO entry — "Same Navigators" dropped; phonetics/fluency/pronunciation + book-by-book added

### Round 2 — Little DODO substance batch
- **`content/marketing.en.js:1382`** + **ZH:1355** AgeBandChooser Little DODO blurb — equal-weight substance claim with phonetics/fluency/vocabulary/love-of-reading/book-by-book
- **`content/marketing.en.js:581`** + **ZH:564** compare s1 K-2 audience desc — "same Navigator model" → "same live delivery model, different specialist team"
- **`content/marketing.en.js:681`** + **ZH:664** compare.k2Note — same correction
- **`content/marketing.en.js:1448-1451`** + **ZH:1419-1422** `littleDodo.shared.h2` + body — K-2-first framing; admin's substance (early-childhood educators, phonetics/fluency/pronunciation, vocabulary book by book, love of reading); preserved Lexile-boundary statement
- **`lib/schema.js:324`** `littleDodoCourseSchema` description — "same Navigators" dropped; early-childhood specialist language added

### Round 3 — Stat rail + chips + methodology link + page chrome
- **`content/marketing.en.js:1409-1424`** + **ZH:1380-1395** `littleDodo.hero` block:
  - `chip` EN: "Think Once. In Both Languages." → "Where language takes root."
  - `chip` ZH: 语言的根，长在阅读里 (unchanged, per decision)
  - NEW `growsIntoChip` EN: "Grade 3+? See the ELA Program →"
  - NEW `growsIntoChip` ZH: "3 年级及以上？查看 ELA 课程 →"
  - `sub` rewrite (EN + ZH) — early-childhood educator + phonetics/fluency/vocabulary book by book
  - `stats` 6-tile rewrite (EN + ZH) — Ages 5–8 / 1 Educator / 1-on-1 / Live / Phonetics-Led / Book By Book; **no "16 books" number per user decision**
- **`content/marketing.en.js:1442-1444`** + **ZH:1413-1415** `littleDodo.how.steps[2]` — restructured into `desc` + `descLink {text,href}` + `descTail` for inline `/methodology` link on "Read → Think → Speak" phrase
- **`app/[locale]/little-dodo/page.jsx`** — three structural changes:
  1. `Hero()` chip block wrapped with `flex flex-wrap` container; `growsIntoChip` rendered as gold-treatment `<Link>` mirror of /program's `kidsChip`
  2. `HowSection({ c })` → `HowSection({ locale, c })`; step desc rendering extended to support `descLink` inline link
  3. Page export updated to pass `locale` to `HowSection`

### Round 4 — Home + about family-level reframe
- **`content/marketing.en.js:184-186`** + **ZH:165-168** `home.meta.title` + `description` — family-level scope; "Cognitive Level" dropped from title (kept in body)
- **`content/marketing.en.js:190`** + **ZH:172** `home.hero.eyebrow` — "For children who will think and lead in English at the highest levels" → "Live, Navigator-led English literacy — ages 5 through high school"
- **`content/marketing.en.js:196-197`** + **ZH:178** `home.hero.consultHook` — now spans both age bands explicitly
- **`content/marketing.en.js:496`** + **ZH:479** `about.meta.title` — drop "Cognitive Level"; family-level scope
- **`content/marketing.en.js:506`** + **ZH:489** `about.hero.sub` — added sentence acknowledging Little DODO is the starting point
- **`content/marketing.en.js:555-556`** + **ZH:538-539** `about.navigators.p3` — restructured into ELA Navigators + Little DODO educators as two specialist teams under one commitment

**Total surfaces touched:** 19 distinct string locations + 1 JSX structural change.

---

## H1 unchanged (per decision)

`home.hero.h1` (`['English mastery at the cognitive level.', 'Bilingual depth as the natural outcome.']`) was intentionally NOT modified. The family-level eyebrow now does the K-2 inclusivity job; the H1 remains as the brand-destination promise. This is per user-confirmed decision before apply.

---

## ProofStrip unchanged (per decision)

`home.proof[]` (the 300+/1 grade level/2× writing/8/10 stats) is still ELA-only. Decision was: honest labelling (or future K-2 metric addition) is a separate pass, not this one. No fabricated Little DODO metrics.

---

## Verification performed

1. **`npx next build`** — completed cleanly. All routes prerendered for both EN and ZH locales including `/[locale]/little-dodo`, `/[locale]/program`, `/[locale]/about`, `/[locale]/navigators`, `/[locale]/compare`. No errors, no failed pages.
2. **Browser spot-check on dev server** (`http://localhost:3000`):
   - `/en` — confirmed family-level eyebrow + new consultHook render correctly; H1 unchanged; AgeBandChooser shows new Little DODO substance blurb
   - `/en/little-dodo` — confirmed new chip ("WHERE LANGUAGE TAKES ROOT."), growsIntoChip ("GRADE 3+? SEE THE ELA PROGRAM →") in gold treatment, new hero sub with phonetics/fluency/book-by-book language, all 6 new stat tiles, AgeBandChooser self-card shows "YOU'RE HERE" badge, and full page meta title reflects "Foundational English Reading for Ages 5–8 | DODO Learning" (unchanged — already on-brief)
3. **Dev server stopped** after verification.

---

## Notable seam fixes during apply

- **`marketing.zh.js:1173`** initially shipped without the closing `',` (caught immediately on next read and repaired in the same round — no broken JS reached the build). Cause: the Edit `new_string` didn't include the closing punctuation in the replacement, but the `old_string` did. Lesson: when replacing a string-literal-with-trailing-`,`, always include the closing `',` in both sides of the diff. Caught fast, fixed fast.

---

## Files NOT yet updated — follow-up items

Updated 2026-06-11 post-doc-review:

- ~~**`public/llms-full.txt`** — audit for "Same Navigators" + Lexile-only matching language.~~ ✅ **Done in Round 5.** §"Who Navigators are" rewritten into two specialist-team profiles (ELA Program Navigators / Little DODO educators) with two parallel matching paragraphs.
- ~~**`content/faq.js`** Little DODO Q+A staffing language~~ ✅ **Done in Round 5.** All 4 affected answers (EN+ZH) updated.
- **`/navigators` page card-level tagging** — Little DODO educator profiles need profile cards alongside ELA Navigators with a "Little DODO" tag. This is a per-card data addition + tiny presentation change owned by the original handoff's open-task #1 (scope reduced — see "Handoff updates" below). **Still open.**
- **Little DODO ProofStrip on home** — currently honest-by-omission (the 4-tile strip is ELA-only metrics). Could add a K-2 stat tile if/when one becomes meaningful. **Still open, low priority.**

---

## Memory updates

- **`project_dodo_chrome.md`** — needs a single-line update to reflect the two-Navigator-team structure so future sessions don't re-introduce the "same Navigators" line. Pending in this same task; see below.

---

## Handoff updates

The original handoff (`docs/HANDOFF_LITTLE_DODO_PARALLEL_2026-06-10.md`) open-task #1 scope changes:

- **Before:** "K-2 Navigator profile — `/navigators` — add a Navigator card with K-2 competency tag, OR add a K-2 sub-section..."
- **After:** "Tag Little DODO educators on existing `/navigators` page roster. Educators are NOT the same humans as ELA Navigators — they're a dedicated early-childhood specialist team. Add their profile cards alongside ELA Navigators with a 'Little DODO' tag for filtering/clarity."

Updated in the handoff file in this same apply.

---

## Round 5 — post-doc-review missed ripples (added 2026-06-11)

While updating handoff docs after Round 4, a `grep` for `same Navigator` surfaced three live-content surfaces that had been missed in the original ripple inventory and were still actively misleading on the live site:

| File | Line | Was | Now |
|---|---|---|---|
| `content/faq.js` | 203 EN | "Live, one-on-one with **the same Navigator team**." | "Live, one-on-one with a **dedicated early-childhood educator specializing in phonetics, fluency, and pronunciation**." |
| `content/faq.js` | 205 EN | "It uses **the same Navigator model**…" | "It uses the same live, one-on-one delivery model as the ELA Program, but a different specialist team: dedicated early-childhood educators trained in phonetics, fluency, and pronunciation, rather than literature and composition." |
| `content/faq.js` | 328 ZH | "同样由导师（Navigator）团队亲授" | "由专属的幼儿教育导师 1 对 1 直播亲授，深耕语音、发音与流利度" |
| `content/faq.js` | 330 ZH | "它沿用同样的导师模式" | "它沿用 ELA 课程同样的直播 1 对 1 授课模式，但师资团队不同：是深耕语音、发音与流利度的幼儿教育导师，而非文学与写作专长的导师" |
| `public/llms-full.txt` | 76-80 | §"Who Navigators are" claimed "Every Navigator holds a graduate degree from a world top-50 university… specialist background in English literature or composition" — universally applied, including K-2 | Rewritten into **two specialist-team profiles** under one philosophy. ELA Program Navigators paragraph kept verbatim except scoped. Little DODO educators paragraph added. Matching paragraph split into ELA + Little DODO matching, each describing their own inputs. |

Round 5 applied directly (the same correction the user approved 7 times in earlier rounds; mechanical extension). Build re-verified clean. Browser DOM scan confirmed "same Navigator team" is gone from `/en/faq#little-dodo`.

What was left as ELA-only continuity claims (intentionally untouched):
- `content/faq.js:123` — "Will my child have the same Navigator for all 16 weeks?" — about within-ELA continuity
- `content/cities.js:248` — Mississauga "same Navigator across all 16 weeks" — within-ELA continuity
- `components/assessment/AssessmentClient.jsx:228` — entrance↔exit assessment continuity within ELA
- `public/llms-full.txt:80` continuity sentence about Lexile matching → kept; matched cleanly to ELA Program scope in the rewrite

---

## Next steps

1. **Commit + push** when user gives the trigger. Suggested commit message:
   > Apply Little DODO cohesion pass: family-level homepage eyebrow, two-Navigator-team correction, phonetics-led substance update across content/marketing, faq, llms.txt, llms-full.txt, schema, /little-dodo page chrome (EN + ZH)
2. The DODO Coding workstream parallel session has NO collision — verified pre-apply against the reservations list in `01-FINDINGS.md` §"Coordination."
3. Documented downstream — `docs/SUCCESSOR_HANDOFF.md` has a new 2026-06-11 decision-log block; `docs/HANDOFF_LITTLE_DODO_PARALLEL_2026-06-10.md` top-of-doc state update + open-task #4 scope reduced; `docs/little-dodo-plan.md` Navigators row marked superseded with an addendum.
