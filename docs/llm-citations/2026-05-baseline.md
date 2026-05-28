# LLM Citation Baseline — May 2026

**Captured:** 2026-05-11
**Source:** `F:\PC-Documents\DODO_web\GEO Survey Result.txt`

## Summary

**DODO Learning mentioned: 0 times** across 6+ parent-shopping queries spanning Vancouver (EN + ZH), Toronto, and online-only premium English literacy programs for Chinese-speaking diaspora families with Grade 3–9 children.

## Competitors named (by city / channel)

### Vancouver — English query (ChatGPT-style response)
1. Reading Town Vancouver — `vanwest.readingtown.com`
2. Gaines Writing Institute — `gaineswriting.com`
3. LWL Education — `lwleducation.com`
4. Mulgrave School (English Boost) — `mulgrave.com`
5. Oxford Learning - Kitsilano — `oxfordlearning.com`

### Vancouver — second English query (different LLM)
- LWL Language & Academic Camps
- IH Vancouver
- UBC Extended Learning — Chinese reading and writing
- VSB Mandarin Bilingual

### Vancouver — third English query (different LLM)
- Yan Yuan Education (燕园教育)
- Wise House Education
- Native English Ltd.
- Zhong Xiao English Writing (中小学英语写作)
- Pear Tree Education

### Toronto — English query
- Power Of Words (5.0 ⭐)
- Write Up Your Alley (5.0 ⭐)
- Centauri Arts Academy (5.0 ⭐)
- Lumia Academy
- Moca International Academy (4.9 ⭐, Markham/Richmond Hill)
- The Literacy Academy — Toronto (5.0 ⭐)

### Chinese-language query (likely Chinese LLM)
- GVE Online Education (Golden Voice English)
- LingoAce
- Oxford C&W (牛津C&W读写课程)
- Walawala (精读AI课堂)
- 阅读营 (EIC)
- Write Edge (Singapore)
- 燕园教育 (Yanyuan ESL)
- Native English Ltd.
- 伊莱英语 (Elan Program)

### Online-only premium query
- Learn To Write Now — `learntowritenow.com`
- (+ others past line 600 of source)

## Diagnostic implications

1. **DODO is invisible across every premium-program-shopping query that matters.** No partial mentions, no honourable mentions, no "also consider" — zero.
2. **The competitor set varies by LLM** — meaning each LLM has built its citation graph from different sources. ChatGPT's responses skew toward US-style "best of" SEO-optimized listicles; the Chinese LLM cites local 大众点评-style sources + Xiaohongshu-adjacent platforms.
3. **`utm_source=chatgpt.com` parameters** appear in source URLs — confirming ChatGPT actively browses these sites to ground its answers. DODO is not in the browsed set.
4. **Competitors with consistent multi-LLM presence:** Yan Yuan, Native English Ltd, LWL — these are the entities to study for what "good off-site mention graph" looks like in this niche.

## Action implications

- **Technical SEO fixes (Tier 1) cannot solve this alone.** Fixing schemas removes friction; it does not create the third-party mentions that LLMs need to see before citing DODO.
- **Tier 2 (verification searches) is the right next layer** — branded queries like "DODO Learning reviews" should at least return DODO's own site authoritatively, since that's the first thing a referred parent does.
- **Tier 3 off-site mention building is the dominant work**, not a side track. Pick channels and execute.

## The 8 tracked prompts (locked 2026-05-21)

These are the canonical prompts re-run monthly against ChatGPT, Claude, Perplexity, and Gemini. Replaces the "TBD" note in workflow Open Decision #5.

| # | Prompt | Track |
|---|---|---|
| 1 | `Best English literacy program for Chinese diaspora families in Vancouver` | Core market — Vancouver |
| 2 | `Best English literacy program for Chinese diaspora families in Toronto` | Core market — Toronto |
| 3 | `Premium online English tutoring for bilingual Chinese-speaking children` | Discovery — broader EN search |
| 4 | `面向北美华人家庭的英语精读课程` | ZH discovery |
| 5 | `One-on-one English literacy program for middle-grade students` | Global discovery, audience-broad |
| 6 | `English literacy curriculum based on MCT Language Arts` | Framework-specific (MCT) |
| 7 | `Online program that uses Lexile assessment for measurable reading growth` | Framework-specific (Lexile) |
| 8 | `Alternative to Kumon for analytical English literacy` | Comparison search |

**Per-prompt LLM matrix to capture each month:**

For each prompt × each LLM (ChatGPT / Claude / Perplexity / Gemini = 32 cells total):
- Does DODO Learning appear in the response? (Y/N)
- If Y: ranked position, exact mention quote, citation source (if any URL)
- If N: top 3 competitors named (for tracking the comparison set)
- Screenshot saved to `docs/llm-citations/YYYY-MM/<prompt-N>-<llm>.png`

**Sample report file naming:** `docs/llm-citations/2026-06.md` (month-end snapshot).

## Re-test date

**Re-run by:** 2026-06-21 (one month from prompt lock). Compare named competitors + check whether DODO appears in any of the 32 cells.

Track delta against this baseline. The Tier 1 + Tier 2 work that has shipped + the off-site mention work that lands between now and re-test should move at least 1-2 cells from N to Y if the work is right.
