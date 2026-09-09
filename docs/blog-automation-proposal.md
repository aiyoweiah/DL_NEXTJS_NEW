# Can agents run the blog? — automation proposal for authored, dated, cited, fresh long-form

**Written:** 2026-09-09 · **Status:** proposal, not a decision · **Companion to:** `geo-audit-2026-09.md` § Update 2 (R3 elaborated), `workflow.md` Tier 3 ("1 pillar post every 2 weeks — the cadence never started")

## 1 · The premise, restated as requirements

A blog earns GEO value only when every post is **authored** (a real person with standing), **dated** (published and modified), **cited** (linked primary sources, statistics with provenance), **specific** (facts an engine cannot find elsewhere), and **fresh** (a cadence that holds). The instruments installed on 2026-09-09 score exactly these; the current blog fails all of them, and the March posts subtract. So the question is not "can an agent write posts" — it can, cheaply, and that is the problem. The question is **which of the five requirements an agent can guarantee, which it can only assist, and which it must never fake.**

| Requirement | Agent can guarantee | Agent can assist | Agent must never |
|---|---|---|---|
| Authored | — | draft in the author's voice (Writing DNA), prepare the byline block | invent an author, or publish under a person who has not read the piece |
| Dated | ✅ `datePublished` / `dateModified`, sitemap `lastmod`, RSS `pubDate`, `CONTENT_MODIFIED` bump | — | backdate |
| Cited | ✅ refuse to ship an unlinked statistic; verify every URL; restrict sources to an allowlist | find sources, format citations | estimate a number, paraphrase a source it has not opened |
| Specific | ✅ pull facts from DODO's own curriculum artifacts and canon | shape them into narrative | generalise from the open web into a piece any competitor could publish |
| Fresh | ✅ open a draft PR on schedule; flag decay; re-verify links quarterly | — | publish on schedule without a human read |

The one requirement an agent cannot supply is the first, and it is the one the placeholder-author incident already cost this site. Everything below is built around that constraint: **agents produce drafts and proofs; a named human produces authorship.**

## 2 · What DODO has that makes agent drafting *specific* rather than generic

The usual failure of automated blogs is sameness: the agent researches the open web and writes what everyone else wrote. DODO has a source no competitor has — the curriculum pipeline (`F:\PC-Documents\DLCW\projects\*\outputs\phase*\`): per-lesson guides (HTML), home reviews (PDF + JSON), parent guides and phase-prep guides for `lit_L1_MudTrilogy`, `lit_L2_Town`, `writ_L1_Foundations`, `writ_L2_Town`, `ld_PV1_MyFirstReading`, `ld_PV3_AdvancedPictureReaders`. `/program`'s "A Real Session" (§12a observer-POV pattern) is already built from one of these. A drafting agent that reads a lesson guide and writes "what a Grade 5 child actually does with *The Red Tide*, chapter 4" produces text that is true, checkable against the source, and unavailable anywhere else. Pair that with §07a (the five licensed research claims with citations) and §11 (the numbers), and the fact-space an agent is allowed to draw from is closed, verifiable and distinctive.

**Rule proposed:** a post may state only facts traceable to (a) a named DLCW artifact, (b) §07a / §11 canon, or (c) an external primary source that is linked inline and was opened during drafting. Nothing else. `audit-content` enforces (c); a frontmatter `sources:` list enforces (a) and (b) at review.

## 3 · Three levels of automation — pros and cons

| | Level 1 · Agent-assisted editorial | Level 2 · Scheduled draft queue, human gate | Level 3 · Autonomous publish |
|---|---|---|---|
| **Shape** | Every two weeks a Claude Code session (owner-triggered) runs the pipeline end-to-end and hands the author a finished draft + proof pack; the author edits and says "apply". | A scheduled routine runs the pipeline unattended, opens a PR with the draft + proof pack + ZH twin + repurposed social copy, and notifies Lark. Merge is the human gate; nothing merges without a named author's approval. | The routine merges and deploys on schedule. |
| **Cadence guarantee** | none — depends on the owner opening the session | drafts arrive on schedule; publishing still depends on a 30-minute human read | fully guaranteed |
| **Authorship** | genuine — the author reads and signs every piece | genuine if the gate is honoured; the PR template forces the byline choice | **fake** — a byline without a reader is the placeholder incident again |
| **Fabrication risk** | low — `audit-content` + the source allowlist + a human read | low — same gates, plus a strict frontmatter check in CI | medium — the gates catch dead links and unverifiable stats, not subtle over-claiming |
| **Sameness risk** | low — DLCW-grounded topics; author's edits add voice | low–medium — the queue tempts "approve and move on"; mitigated by the Writing-DNA pass and a hard rule that every post cites a DLCW artifact | high |
| **Policy / GEO risk** | none | none while volume stays at 2/month and every post is human-approved | Google's scaled-content-abuse policy; every instrument penalises anonymous, undated, uncited volume — the plan would score itself down |
| **Cost per post** | ~20 min agent time + 30–60 min author time | ~20 min agent time (unattended) + 30 min review | ~20 min agent time |
| **Cross-machine / repo hygiene** | fits the apply-gate exactly | fits: PR = proposal, merge = apply; the routine works in a worktree, never on `main` | breaks the apply-gate |
| **Fit with the brand brief** | full | full, with the gates | conflicts — the guide's growth-lever directive is authority and referral, not volume |
| **Verdict** | **start here for the first three posts** | **target state** once the first three have proven the pipeline | rejected |

## 4 · The pipeline, stage by stage — which skill, existing or new

| Stage | What happens | Skill / tool | Status | Gate |
|---|---|---|---|---|
| **0 · Topic source of truth** | The tracker's Tier B help-intent prompts (writing improvement, IB/AP, SSAT, vocabulary through classics, bilingual → academic writing) + Tier LD (K–2) are the demand side; `geo-fanout` maps each into its sub-query cluster; `geo-content-research` mines Reddit/PAA/Quora for the parent phrasing and scores citability × competition × tier into `prompts.csv`. | `geo-fanout` (installed) · `geo-content-research` (gtm, **install**) · `firecrawl-search` for source discovery | quarterly, owner-reviewed | owner approves the quarter's `plan.csv` |
| **1 · Plan** | `geo-content-planning` turns prompts into a `plan.csv` (page type, target prompts, required sections). For DODO the page types collapse to two: *definition/how-it-works* (Lexile, MCT, LCS strands, 6+1 traits) and *use-case* (a real lesson, a real family situation). No "money" pages — the funnel already owns those. | `geo-content-planning` (gtm, **install**) · `brief-to-tasks` | quarterly | same |
| **2 · Ground** | For the chosen topic the agent pulls the DLCW artifacts (lesson guide, parent guide) and the §07a/§11 lines it will use, and writes a **fact sheet** first: every claim with its source path. No prose yet. | `firecrawl-parse` (PDF → markdown) · repo `Read` | per post | fact sheet has zero unsourced lines |
| **3 · Draft EN** | 900–1,400 words (not the 2,500 the gtm writer defaults to — this brand's register is precision, not bulk): a 40–60-word answer block after the H1, one observer-POV scene (§12a), one table or list an engine can lift, two standalone quotable paragraphs, 3 FAQ items drawn verbatim from `faq.js`, linked citations, a "what to do this week" close that ends at `/consult` (firm close, D27). Voice via `dodo-content-writer`; citations via `content-research-writer`; Janet's Writing DNA distilled from her own pieces (the MCT post, `/about`, any XHS she wrote) once ≥ 20 exist — until then, the brand guide is the DNA. | `dodo-content-writer` · `anthropic-skills:content-research-writer` · `writing-dna-skill` (later) · `geo-citability` (score ≥ 70 before review) | per post | citability ≥ 70; anti-dictionary 0 hits; `check-canon` clean |
| **4 · Draft ZH** | In-session translation with the brief + glossary as context, then `lieflat-less-ai-tone`, then the §10 screen. Not DeepSeek. | `dodo-content-writer` · `lieflat-less-ai-tone` | per post | parity of every section; forbidden-word screen |
| **5 · Verify** | `audit-content`: fabricated statistics, dead URLs, misattributed sources, brand-DNA contradictions (it reads `BRAND_CONTENT_GUIDE.md` as the DNA file). A new `scripts/check-post.mjs` in `prebuild`: frontmatter complete (`author` from an allowlist of real people, `publishedAt`, `sources[]` non-empty, every source URL returns 200), no post ships from `content/_drafts/`. | `audit-content` (installed) · `check-post` (**build**, ~60 lines, same idiom as `check-canon`) | per post | both green |
| **6 · Human gate** | The named author reads the EN and ZH, edits freely, and either signs (byline) or rejects. Level 1: "apply" in chat. Level 2: PR review. Non-negotiable: **no byline without a read.** | PR template · Lark notification (the `Claude_Lark` client already exists) | per post | author's approval |
| **7 · Publish** | Merge → Cloudflare Pages → `npm run indexnow` → RSS (`feed.xml`, **build**: a static route emitting the posts newest-first; the AEO audit fails the site on its absence) → Article schema already carries author/dates; `CONTENT_MODIFIED` bumped. | existing pipeline · `feed.xml` route (**build**) | per post | 15 guards green |
| **8 · Repurpose** | One source → XHS post (parent-friend register, §13 rules, the D29 CTA question still open), WeChat long-form, a YouTube script (transcript-first, chapters, verbatim-query title — `geo-youtube`: YouTube is the strongest single citation signal measured). The founder records; the agent never fakes a voice. | `anthropic-skills:content-engine` · `geo-youtube` (installed) · `mono-color` for an editorial image if the imagery ruling allows agent-made art | per post, optional | social copy is apply-gated separately |
| **9 · Measure** | Monthly: the fixed prompt panel (`geo-measurement`), share-of-citation per engine, `geo-compare` delta against the previous month; quarterly: link re-verification and decay check on every post; posts that never earn a citation in two quarters are rewritten or folded into an evergreen page. | `geo-measurement` · `geo-compare` · `audit-content` (re-run) · `firecrawl-monitor` for competitor moves | monthly / quarterly | — |

**Orchestration for Level 2.** Two viable hosts: a Claude Code scheduled routine (the `schedule` skill in this environment) running stages 2–5 in an isolated worktree every second Monday and opening the PR; or a GitHub Actions cron invoking Claude Code, the pattern `Claude_Lark` already uses for its five-minute backfill. Routine is simpler and keeps the repo rules (SessionStart fetch, worktree, no push to `main`); Actions is better if the Mac and Windows both need to see runs without a machine being on. Either way the routine never touches `main` directly.

## 5 · What to install or build

| Item | Effort | Why |
|---|---|---|
| Install `geo-content-research`, `geo-content-planning`, `write-seo-geo-content`, `create-geo-charts` from the already-vetted `onvoyage-ai/gtm-engineer-skills` (MIT, no dependencies) | 10 min | the research → plan → write chain is exactly the pipeline; the writer's rules ("Never estimate numbers. If you can't verify a stat, don't use it.") match DODO's canon discipline. Adapt two of its defaults: word count (900–1,400, not 2,500+) and drop its "Brand Mention Block" (CTA-voice in body copy is a §08 tell). |
| `scripts/check-post.mjs` in `prebuild` | ~1 h | frontmatter allowlist + sources + live URLs; the guard that makes the placeholder incident impossible to repeat |
| `app/feed.xml` static route | ~1 h | RSS is the freshness channel every AEO instrument checks; absent today |
| `content/_drafts/` (excluded from `getAllSlugs`) + PR template with the byline choice and the fact-sheet checklist | 30 min | the queue and the gate |
| Janet's Writing DNA (`writing-dna-skill`) | after ~20 pieces exist | until then the brand guide is the voice; do not distill from DeepSeek output |
| Scheduled routine (Level 2) | 1 h, after three Level-1 posts | cadence without a person remembering |

## 6 · Risks the automation itself introduces, and the mitigation for each

- **Sameness.** Every post cites a DLCW artifact or it does not ship — the specificity rule is structural, not stylistic.
- **Over-claiming inside the allowed sources** (an agent stretching a §07a effect size). The fact sheet quotes the source line verbatim next to the claim; the human read compares them.
- **Reviewer fatigue → rubber-stamping.** Cadence capped at two posts a month; a post the author has not edited at least once is a signal to slow down, not a success.
- **Register drift in ZH.** `lieflat` is whitelist-only and cannot introduce vocabulary; the §10 screen runs after it; the ZH twin is read by a Chinese reader before merge.
- **The "AI blog" perception.** Human byline, real dates, linked sources, a real lesson in every piece, and no volume. Google's policy and every instrument reward the same four things.
- **Cross-machine collisions.** The routine works in a worktree and opens PRs; `_drafts/` is git-tracked so both machines see the queue; protocol §3 unchanged.

## 7 · Recommendation and the decisions it needs

Run **Level 1 for three posts** starting from the DLCW artifacts (Mud Trilogy lesson → "what a real Grade 5 literacy session does"; a Little DODO home review → "what a K–2 reading session builds"; the §07a roots claim → "why word roots beat word lists"), each through the full gate chain, each with Janet as author of record. If all three ship inside six weeks and the review time settles under 45 minutes, promote to **Level 2**. Never Level 3.

Decisions the owner holds: (1) author of record — Janet only, or named Navigators who agree to read and sign; (2) cadence — two a month is the ceiling proposed; (3) whether agent-made editorial images (`mono-color`) are permitted or the painted series stays the only imagery; (4) whether the blog returns as "Writing" (options B/D in R3) or the first posts ship as evergreen pages until the cadence is proven; (5) Level 2 host — Claude Code routine or GitHub Actions.
