# DODO Learning — Successor Handoff

**Authored:** 2026-05-17 (end of session)
**Repo:** `aiyoweiah/DL_NEXTJS_NEW` · deploys to dodolearning.com (Cloudflare Pages) + dodoletterhouse.com (Vercel) from the same `main` branch
**Status:** Bilingual site fully shipped. Content + architecture work complete. Tier 2/3 SEO+GEO + business decisions pending.

This doc is **your entry point if you're picking up this work cold.** Read this first. Then `docs/workflow.md` for the longer-running SEO+GEO context.

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
  marketing.en.js   ← 9 marketing pages, EN. One named export per page.
  marketing.zh.js   ← Same 9 exports, ZH.
  faq.js            ← Bilingual nested. faq.{sections,ui,categories}.{en,zh}.
  cities.js         ← Bilingual nested. 6 cities + citiesUi/citiesProofStats/citiesLoopSteps/citiesPhases.
  en/blog/          ← MDX articles, per-article EN
  zh/blog/          ← MDX articles, per-article ZH
  en/audiobooks/    ← Markdown, EN-only by design
```

### Page imports look like this

```js
// app/[locale]/program/page.jsx
import { program as copyEn } from '@/content/marketing.en'
import { program as copyZh } from '@/content/marketing.zh'

const COPY = { en: copyEn, zh: copyZh }
// then: const c = COPY[locale] ?? COPY.en
```

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
| **The Loop** | Always `Read → Think → Speak → Write`, exact phrase, exact order |
| **Navigators** | Never teachers/tutors/instructors/老师/辅导老师 |
| **English Thinker** | Current owned identity term. `Bilingual Thinker` / `双语思维者` / `双语学习者` are **retired** |
| **The Hangar** | Retired 2026-04. Strip on sight. |
| **Frameworks** | MCT with distancing language ("grounded in" / "aligned with"). Harvard Project Zero nameable in body, never name specific routines in hero/image copy. |
| **Lexile** | Always cite a specific number ("620 to 820 in 16 weeks") |
| **Founding Family Program** | Positioning signal, never discount/limited-time |
| **English mastery → bilingual depth** | In that order. Never reverse. |

**Anti-dictionary** (must NOT appear in content, per §10): EN — `tutoring`, `ESL` (in DODO description), `catch up`, `Charter Enrollment`, `affordable`, `Think Twice`. ZH — `补习班`, `干预`, `综上所述`, `毋庸置疑`, `由此可见`, `追赶`, `双语思维者`, `双语学习者`, `母语老师`.

**Owned vocabulary table** is in §09 of the brand guide. New terms locked this session and now in `dodo-glossary.json`: LCS, Summit, Core, Flex 1-3, Literacy/Writing Session, Visible Thinking, Janet Sui, Ms. Jennifer / Willow / Sarah, MCT components.

---

## 3. Product taxonomy (locked 2026-05-17)

The site presents the **LCS + 9 Levels + 5 Combinations** architecture from brand guide §06. Pricing on `/program` and `/faq`:

| Tier | Format | 16-week | Weekly |
|---|---|---|---|
| **Summit** 全境领航 | 3× literature + 1× writing | $2,830 | $177 |
| **Core** 稳健航行 *(most popular)* | 2× literature + 1× writing | $2,250 | $140 |
| **Flex 1** 文学阅读自由航行 | 2× literature | $1,185 | $74 |
| **Flex 2** 大师写作自由航行 | 2× writing | $2,110 | $132 |
| **Flex 3** GPA管理自由航行 | 1× GPA tutoring | from $750 | ~$47 |

Old "Full Program / Literacy Foundation" naming is retired site-wide. If you find any old references, replace with the new taxonomy.

---

## 4. DeepSeek translation workflow

When marketing-page EN copy changes, ZH needs to be regenerated:

1. Open DeepSeek. **Attach as standing context:** `translation/DEEPSEEK_BRIEF.md` + `translation/dodo-glossary.json`.
2. **Hand the changed source file:**
   - For 9 marketing pages: `content/marketing.en.js` (whole file)
   - For FAQ: `faq.sections.en` / `faq.ui.en` / `faq.categories.en` (each `.en` block)
   - For cities: per-city `.en` block × 6 + each shared block (`citiesUi`, `citiesProofStats`, `citiesLoopSteps`, `citiesPhases`)
3. Prompt template is in `translation/deepseek-handoff-2026-05-17/README.md` (also covers post-merge checks).
4. **Post-merge linter** (grep one-liner in the README): scan returned ZH for forbidden words; fix if any.
5. `npm run build` after merge — Next.js will fail if a key the page expects is missing.

The handoff folder (`translation/deepseek-handoff-2026-05-17/`) is a snapshot from the last round-trip. When you do another round, copy the latest source files into a new dated folder.

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
| `translation/BRAND_CONTENT_GUIDE.md` | **Master brand + content guide (v4.1)**. Read first for any content work. Also `.docx` for sharing. |
| `translation/DEEPSEEK_BRIEF.md` | DeepSeek translation brief (v1.1). Standing context for every translation session. |
| `translation/dodo-glossary.json` | Canonical EN ↔ ZH term map. Updated this session with LCS / Summit-Core-Flex / Janet Sui / etc. |
| `translation/deepseek-handoff-2026-05-17/` | Last DeepSeek round-trip staging folder + README with prompt template. |
| `content/marketing.{en,zh}.js` | 9 marketing pages, one named export per page |
| `content/faq.js` | 50 Q&As + UI + categories, bilingual nested |
| `content/cities.js` | 6 cities + shared chrome, bilingual nested |
| `public/llms.txt` / `llms-full.txt` | GEO surfaces for LLM citation. EN-only. Rewrite when site voice changes. |
| `lib/schema.js` | JSON-LD schemas (EducationalOrganization, WebSite, FAQPage, courseSchema, citySchema). |
| `lib/i18n.js` | Locale primitives only (LOCALES, isValidLocale, toggleLocale, localeParams). `getContent` removed 2026-05-17. |
| `components/faq/FAQClient.jsx` | Pure renderer + markdown-lite parser. Imports `faq` from content/faq.js directly. |
| `docs/workflow.md` | SEO+GEO running doc — Open Decisions, session log, Tier 1-3 plan. |
| `docs/llm-citations/` | Monthly citation tracker. Same 8 prompts × 4 LLMs (TBD prompts in decision #5). |
| `.claude/skills/dodo-content-writer/` | Project-local skill for DODO content tasks. |

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

- **Static export** (`output: 'export'`). No API routes. No middleware (see `docs/proxy.example.js` for the dormant blueprint). Must work on Cloudflare Pages + Vercel from the same artifact.
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

Good luck.
