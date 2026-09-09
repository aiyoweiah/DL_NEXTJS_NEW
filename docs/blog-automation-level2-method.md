# Level 2 — the scheduled draft queue behind a human gate: detailed method

**Written:** 2026-09-09 · **Status:** proposal for the owner's approval; nothing here is built yet · **Parent:** [`blog-automation-proposal.md`](blog-automation-proposal.md) (the three levels and why Level 2) · **Ruling needed from:** the owner, on the seven decisions in § 10

The target: **every second Monday a finished, proof-packed, bilingual draft is waiting in a pull request; nothing publishes until a named person has read it and put their name on it.** Agents guarantee dated, cited, specific and fresh. A human supplies authorship. The machinery below exists to make the human step short (≤ 45 minutes) and impossible to skip.

---

## 1 · Roles

| Role | Who | Does |
|---|---|---|
| **Owner** | admin | approves the quarterly plan; rules on decisions; can switch the routine off |
| **Author of record** | Janet, or a named Navigator who has agreed to read and sign | reads EN + ZH, edits, approves the PR (or rejects). Their name is the byline; no one else's ever is |
| **ZH reader** | a Chinese-reading reviewer (may be the author) | reads the ZH twin before merge |
| **Drafting routine** | a Claude Code scheduled agent (or a GitHub Actions cron running Claude Code) | everything in § 4, in a worktree, on a branch — never on `main`, never a merge, never a push to `main` |
| **Guards** | `check-canon`, `check-post` (new), `content-audit`, `audit-content`, the fourteen existing guards | fail the build or the PR on structural and factual defects |

## 2 · Repository layout (new pieces in bold)

```
content/
  en/blog/<slug>.mdx            published EN (existing)
  zh/blog/<slug>.mdx            published ZH (existing)
  **_drafts/<slug>/**           the queue — never built, always canon-scanned
    **en.mdx  zh.mdx**          the drafts, full frontmatter
    **fact-sheet.md**           every claim → its source (path, line, or URL + access date)
    **proof-pack.md**           audit-content report · citability score · guard outputs · ZH parity · link check
    **social.md**               XHS post · WeChat lede · YouTube script (transcript-first) — apply-gated separately
    **meta.json**               plan row id · targeted prompts · author candidate · run id · model + skill versions
docs/geo/
  **prompts.csv**               tracker prompts + fan-out sub-queries + research (geo-content-research schema)
  **plan.csv**                  the quarter's page plan (geo-content-planning schema) — owner-approved
  **authors.json**              the allowlist: { name, role, locale_reads, real: true, since }
  **AUTOMATION.md**             the routine's contract + the kill switch (`enabled: false` stops the next run)
scripts/
  **check-post.mjs**            prebuild guard: frontmatter, author allowlist, sources, no drafts in build
  **promote-post.mjs**          moves an approved draft into place, stamps dates, bumps CONTENT_MODIFIED, appends llms.txt
  **post-deploy.mjs**           waits for the deploy, then runs IndexNow for the new URLs
app/
  **feed.xml/route.js**         RSS, static, newest-first (the AEO audit's "no feed" fix)
.github/
  **PULL_REQUEST_TEMPLATE/draft-post.md**   the human-gate checklist
```

## 3 · The contract: what a post must be before it can merge

| Requirement | Enforced by | Where |
|---|---|---|
| Author ∈ `authors.json`, `real: true`; banned names (Dr. Sarah Chen, Michael Torres, Li Wei, Jennifer Park, Dr. Maria Rodriguez, 陈博士) rejected | `check-post` | build |
| `publishedAt`, `updatedAt` ISO dates; `updatedAt ≥ publishedAt` | `check-post` | build |
| `sources: []` non-empty; each `{ label, ref }` where `ref` is a DLCW path, a guide anchor (`BCG §07a·3`), or a URL with `accessed` | `check-post` (structure) · `audit-content` (URLs live, claims match) | build · PR |
| Every statistic in the body appears in `fact-sheet.md` with its source line quoted verbatim | `audit-content` + the human read | PR |
| No retired term, no anti-dictionary term | `check-canon` (fails) · `content-audit` (reports) | build |
| Citability ≥ 70 (answer block ≤ 60 words after the H1; ≥ 2 standalone quotable paragraphs; one table or list; 3 FAQ items verbatim from `faq.js`) | `geo-citability` | proof pack |
| ZH twin present with section parity, `lieflat` pass done, §10 screen clean | proof pack · ZH reader | PR |
| Length 900–1,400 words EN; H2s in question form where a parent would ask it | proof pack | PR |
| At least one **DLCW artifact** cited (the specificity rule) | `check-post` (a `sources[].ref` matching `DLCW/`) | build |
| Closes at `/consult` (firm close, D27); no assessment CTA (D29); no CTA voice in body (§08) | `dodo-content-writer` lint · human read | PR |
| Article schema: `author` = the byline Person, `datePublished`, `dateModified`, `citation[]` from `sources` | `articleSchema()` (extend to accept `citation`) | build |

## 4 · The routine, step by step (one run = one draft)

Runs every second Monday, 09:00 America/Vancouver, or on demand (`/draft-post <plan_id>` in Level 1). Budget: ≤ 25 minutes, ≤ 1 draft. Hard rules: worktree only; branch `draft/YYYY-MM-DD-<slug>`; never `main`; never merge; never publish; stop on any gate failure and report.

| # | Step | Skill / tool | Output | Stop condition |
|---|---|---|---|---|
| 0 | `git fetch`; read `docs/geo/AUTOMATION.md` — if `enabled: false`, exit | — | — | disabled |
| 1 | Pick the next `plan.csv` row with `status = queued` (owner-approved), oldest first | Read | `meta.json` | none queued → exit, notify "plan empty" |
| 2 | **Ground.** Open the row's DLCW artifacts (`firecrawl-parse` for PDFs, Read for HTML/JSON); pull the §07a / §11 lines the row names; write `fact-sheet.md`: one line per claim, source quoted verbatim | `firecrawl-parse` · Read | fact sheet | an artifact is missing → mark row `blocked`, notify |
| 3 | **Draft EN.** Structure: H1 → 40–60-word answer block → observer-POV scene from the artifact (§12a) → the substance (table or list) → two quotable paragraphs → 3 FAQ items verbatim from `faq.js` → "this week at home" → `/consult` close. Voice and lint per `dodo-content-writer`; citations formatted per `content-research-writer`; only facts from the fact sheet | `dodo-content-writer` · `anthropic-skills:content-research-writer` | `en.mdx` | — |
| 4 | **Score.** `geo-citability` on the draft; if < 70, one revision pass; if still < 70, tag `needs-human` | `geo-citability` | score in proof pack | — |
| 5 | **Draft ZH.** Translate with `DEEPSEEK_BRIEF.md` + `dodo-glossary.json` as context; `lieflat-less-ai-tone`; §10 screen; section parity check | `dodo-content-writer` · `lieflat-less-ai-tone` | `zh.mdx` | parity or screen fails → tag `needs-human` |
| 6 | **Verify.** `audit-content` on EN and ZH against `BRAND_CONTENT_GUIDE.md` (fabricated stats, dead links, misattributions, contradictions); `check-canon`; `check-post`; `content-audit`; link check on every `sources[].url` | `audit-content` · guards | `proof-pack.md` | any critical → **no PR**; open an issue with the report |
| 7 | **Repurpose (optional, flag in plan row).** XHS post (§13 register), WeChat lede, YouTube script (transcript-first, chapters, verbatim-query title) | `anthropic-skills:content-engine` · `geo-youtube` | `social.md` | — |
| 8 | Commit to the branch; push the branch; open the PR from the template with the proof pack summary in the body; label `draft`, `author-candidate:<name>` | `gh` | PR | — |
| 9 | Notify: Lark message (the `Claude_Lark` client) or email to the author candidate with the PR link and the read-time estimate | Lark | — | — |

Everything the routine writes is text in a branch. It has no path to production.

## 5 · The human gate (the PR)

The template (`.github/PULL_REQUEST_TEMPLATE/draft-post.md`):

```
## Draft post · <slug>  ·  plan <id>  ·  targets: <prompts>

**Read time:** ~<n> min EN + ~<n> min ZH  ·  **Citability:** <score>  ·  **audit-content:** <0 critical / n warnings>

### Before you approve (the author of record ticks every box)
- [ ] I have read the English draft in full and edited it where it is not how I would say it
- [ ] Every number and every named source in it appears in fact-sheet.md, and I checked two at random
- [ ] The Chinese draft has been read by <name>
- [ ] The byline will be **my** name; I am content to be quoted from this piece
- [ ] The DLCW lesson it describes is one we actually teach as described

### Reject if
- any claim you cannot trace · any sentence that sounds like a pitch (§08) · any "student" or "parent" who is not real (D5)
```

Approval = the author applies the label `approved-by:<name>` and merges (or asks a Claude session to run the promotion). **Rejection with a reason** goes back to the plan row as `notes`; the routine re-drafts once, then marks `needs-human`.

Time budget for the human: 30 minutes to read EN + ZH, 15 minutes of edits. If reviews consistently exceed 45 minutes, the routine is producing the wrong drafts — fix the plan row, not the reviewer.

## 6 · Promotion and publish

`npm run post:promote <slug>` (run by the author's session, or by the routine on the `approved-by:` label):

1. Move `content/_drafts/<slug>/en.mdx` → `content/en/blog/<slug>.mdx` and `zh.mdx` → `content/zh/blog/<slug>.mdx`; set `publishedAt` = today, `updatedAt` = today, `author` = the approved name.
2. Bump `CONTENT_MODIFIED` in `lib/schema.js`.
3. Append the post to `public/llms.txt` § Writing (title, date, author, URL) — the F11 line.
4. `npm run fonts:cjk` if the ZH twin introduced characters (the CJK guard tells you), then `npm run build` (all fifteen).
5. Commit `content: publish <slug> (author: <name>)`, merge to `main`, push.

After the deploy: `node scripts/post-deploy.mjs <slug>` waits for the new URL to return 200 on the live origin, then runs `npm run indexnow` with the two post URLs plus `/feed.xml`. RSS updates on its own (the route reads the posts). The Article schema carries author, both dates and the citations.

## 7 · Measurement and maintenance (monthly and quarterly routines)

| Cadence | What | Skill | Output |
|---|---|---|---|
| Monthly (with the tracker, 24th) | fixed prompt panel per engine; share-of-citation; delta vs last month for the prompts each post targets | `geo-measurement` · `geo-compare` | `docs/llm-citations/YYYY-MM.md` |
| Quarterly | re-run `audit-content` on every published post (links rot, sources move); re-score citability; posts with no citation in two quarters → rewrite or fold into an evergreen page | `audit-content` · `geo-citability` | issue per post |
| Quarterly | refresh `prompts.csv` / `plan.csv` from the tracker's misses (a prompt DODO keeps losing is a topic) | `geo-fanout` · `geo-content-research` · `geo-content-planning` | owner review |
| Continuous | competitor content moves on the co-citation set (Wukong ELA, ivyGoal, Reading Town, LWL) | `firecrawl-monitor` | alert |

## 8 · Failure modes and the response the routine is told to take

| Failure | Response |
|---|---|
| Artifact missing or unreadable | row → `blocked`; notify; no draft |
| Citability < 70 after one revision | PR still opens, labelled `needs-human`, with the score — a human decides whether structure or topic is wrong |
| `audit-content` critical (fabrication, dead URL, contradiction) | **no PR**; issue with the report; row → `blocked` |
| ZH parity or §10 screen fails | PR opens EN-only with `zh-pending`; ZH re-drafted in the author's session |
| Guard fails in the worktree build | no PR; issue |
| Review time > 45 min for two posts running | routine paused by the owner; plan re-cut |
| Two consecutive rejections on the same row | row → `retired`; the topic was wrong |

## 9 · Rollout

| Week | Milestone | Effort |
|---|---|---|
| 1 | Scaffolding: `_drafts/`, `authors.json`, `AUTOMATION.md`, `check-post.mjs` in prebuild, `promote-post.mjs`, `post-deploy.mjs`, `feed.xml` route, PR template, `articleSchema` `citation` support; install the gtm research/planning/writer skills (word count and brand-block defaults adapted) | ~1 day |
| 1 | `prompts.csv` + first `plan.csv` from Tier B / LD prompts and `geo-fanout`; owner approves six rows (§ 11) | ~2 h + review |
| 2–7 | **Level 1 pilot**: three posts, each produced by running the § 4 routine prompt by hand in a session, each through the full gate, each with Janet as author | 3 × (25 min agent + ≤ 45 min review) |
| 8 | Review: review times, edits per post, audit-content warnings, citability, the first tracker delta | 1 h |
| 9 | Switch the schedule on (Level 2); first unattended run opens PR #4 | 1 h |
| 12+ | Monthly and quarterly routines live; consider named Navigators as additional authors | — |

Go/no-go for Level 2 after the pilot: all three posts merged with a real read; median review ≤ 45 min; zero critical audit findings reached a PR; at least one edit per post by the author (a post with no edits is a signal the human read did not happen).

## 10 · Decisions the owner holds

1. **Author of record** — Janet only for the pilot; named Navigators later, each opting in.
2. **Cadence ceiling** — two posts a month (every second Monday) proposed.
3. **Images** — the painted series only, or agent-made editorial art (`mono-color`) permitted as a post-hero option.
4. **Where posts live** — the blog returns as "Writing" (R3 option B or D-then-return), or the pilot posts ship as evergreen pages until the cadence is proven.
5. **Host for the routine** — Claude Code scheduled agent (simplest, keeps repo rules) or GitHub Actions cron (visible to both machines when neither is on).
6. **Notification channel** — Lark (existing client) or email.
7. **Social repurposing** — on by default in the plan rows, or off until the XHS CTA vs D29 ruling lands.

## 11 · The first six plan rows (proposed)

| # | Working title | Grounded on | Targets (tracker) | Author |
|---|---|---|---|---|
| 1 | What a Grade 5 literacy session actually does with *The Red Tide*, chapter 4 | `lit_L1_MudTrilogy` lesson guide (already the `/program` "A Real Session") | A5 · B9 | Janet |
| 2 | Why word roots beat word lists: what 493 students showed | §07a claims 1–4, Gallagher 2017, Goodwin & Ahn | B14 · A6 | Janet |
| 3 | What a K–2 reading session builds before Lexile can measure it | `ld_PV1_MyFirstReading` home reviews | LD1 · LD2 · LD4 | Janet |
| 4 | From fluent speaker to academic writer: what changes in a Writing Session | `writ_L1_Foundations` lesson guide | B12 · B9 | Janet |
| 5 | How DODO measures a Lexile baseline, and what a parent gets back in 72 hours | assessment cadence (§11), `/lexile` | A7 (also the R4 explainer, if G-1 is chosen) | Janet |
| 6 | Reading an unabridged classic at ten: what the first chapter costs and pays | `lit_L2_Town` lesson guide | B14 · B11 | Janet |

Each row names the artifact before a word is drafted. That is the whole difference between this blog and the one it replaces.
