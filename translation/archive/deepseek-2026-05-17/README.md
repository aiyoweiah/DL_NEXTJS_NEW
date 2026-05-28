# DeepSeek Translation Handoff — 2026-05-17

Drop-in package for the EN → ZH round-trip. Everything DeepSeek needs lives in this folder.

## What's in here

| File | Purpose | Action |
|---|---|---|
| `DEEPSEEK_BRIEF.md` | Translator brief — voice rules, glossary, forbidden words, input format spec | **Attach to every DeepSeek session** (standing context) |
| `dodo-glossary.json` | Canonical EN → ZH term map · do-not-translate list · voice rules · city names | **Attach to every DeepSeek session** (standing context) |
| `marketing.en.js` | Source: all 9 marketing pages — `program`, `about`, `consult`, `compare`, `methodology`, `lexile`, `results`, `navigators`, `demos` | Hand to DeepSeek; save returned file as `content/marketing.zh.js` |
| `faq.js` | Source: 50 Q&As + UI + categories (bilingual nested) | Hand each `.en` block; paste returned object into matching `.zh` slot |
| `cities.js` | Source: 6 city pages + shared UI (bilingual nested) | Hand each city's `.en` block; paste into matching `.zh` block |

## Suggested DeepSeek prompt template

```
You are translating DODO Learning website content from English to Simplified Chinese.

CONTEXT (attached):
- DEEPSEEK_BRIEF.md (voice rules, structural rules, forbidden words)
- dodo-glossary.json (term map, do-not-translate list)

INPUT FILE: [paste marketing.en.js / faq.sections.en / etc. here]

OUTPUT: Return the exact same shape — same exports, same keys, same nesting,
same array order — with English string values replaced by Chinese translations.
Preserve all non-string syntax verbatim (imports, comments, const declarations,
the YOUTUBE_IDS block, brackets, commas, quotes).

Do NOT translate:
- id / href / ctaHref / number / Lexile score values
- JSX placeholders like {name}
- HTML tags like <strong>, <br />
- Pricing in $ (keep verbatim)
- Owned English terms: DODO Learning, MCT, Lexile, MetaMetrics, etc.
- Founder name: Janet Sui
- Example Navigator names: Ms. Jennifer, Ms. Willow
- MCT components: Building Language, Caesar's English, Mud Trilogy, Grammar Island, Sentence Island, Music of the Hemispheres

Apply: confident, warm, precise voice. Affirmative default. No 补习班 / 干预 / 综上所述
/ 毋庸置疑 / 由此可见 / catch-up framing. Use 英语思维者 not 双语学习者.

Return valid JavaScript. No markdown fences around the output.
```

## Round-trip steps

### marketing (the big one)

1. Open DeepSeek with `DEEPSEEK_BRIEF.md` + `dodo-glossary.json` attached.
2. Paste `marketing.en.js` into the prompt. Use the template above.
3. Save the returned file as `content/marketing.zh.js`.
4. **Local merge check** — open the repo:
   ```bash
   cd F:/PC-Documents/DODO_web/DL_NEXTJS_NEW
   diff <(grep -oE "^export const [a-z]+" content/marketing.en.js) \
        <(grep -oE "^export const [a-z]+" content/marketing.zh.js)
   ```
   Should show 0 differences (same 9 exports).
5. `npm run build` — confirms structure parity (Next.js will fail if a key the page expects is missing).
6. Visit `/zh/program`, `/zh/about`, etc. — visual spot-check.

### faq

1. Open `content/faq.js` locally. Copy the `faq.sections.en` array.
2. Hand to DeepSeek with template. Returned ZH array goes into `faq.sections.zh`.
3. Repeat for `faq.ui.en` → `faq.ui.zh` and `faq.categories.en` → `faq.categories.zh`.
4. `npm run build` + visit `/zh/faq`.

### cities

1. Open `content/cities.js`. For each of the 6 cities, copy the `.en` block.
2. Hand each city to DeepSeek; paste returned `.zh` block.
3. Same for `citiesUi`, `citiesProofStats`, `citiesLoopSteps`, `citiesPhases` shared blocks.
4. `npm run build` + visit `/zh/cities/vancouver` etc.

## Post-merge linter checks (forbidden-word screen)

After each merge, grep the new ZH content for anti-dictionary terms:

```bash
grep -E "补习班|干预|强化干预|介入|综上所述|毋庸置疑|由此可见|综合来看|不难发现|值得一提的是|追赶|双语思维者|双语学习者" content/marketing.zh.js content/faq.js content/cities.js
```

Should return 0 matches. If any appear, rewrite those strings before commit.

## EN-only surfaces (not in this handoff)

- `public/llms.txt` and `public/llms-full.txt` — GEO surfaces for English-language LLM citation. No ZH version needed.
- `app/[locale]/blog/` — MDX articles, separate per-article translation workflow.
- `app/[locale]/audiobooks/` — EN-only by design.

## Reference

Full voice + brand context: see `translation/BRAND_CONTENT_GUIDE.md` §13 (EN → ZH Translation Handoff). The brief and glossary in this folder are the operational checklist; the brand guide is the deeper context.
