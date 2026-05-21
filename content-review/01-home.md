# Home page review · `app/[locale]/page.tsx`

**Status:** ✅ **Round 1 (Fix A/B/C/D) + Round 2 (33-edit granular pass) both applied 2026-05-21.**

The brand guide, glossary, dodo-content-writer skill, and a new `content-style-decisions.md` log were all updated to record the active style decisions that emerged from this review. See the changelog at the bottom.

---

## Round 2 — applied edits (33 changes)

### §0 SEO meta
- ZH description: `阅读水平` → `阅读测验`; dropped trailing "双语能力是认知深度的自然结果。"

### §1 Hero
- ZH eyebrow: "全英文课堂" → "英语环境里"
- ZH H1 line 1: replaced with brand sub-tagline "以原版文学精读为起点，用写作锤炼思维，用表达释放声音。"
- ZH H1 line 2: set to empty
- EN/ZH consultHook: unchanged this round (already updated in Round 1)

### §3 PhotoIntro
- ZH H2: "外教不代表会教：我们只用文学写作专家。"
- ZH body1: restructured with two-sentence punch opener "导师一对一不间断。 英语是他们的母语，却远不止外教。" + rest of paragraph
- EN body2: "current Lexile level" → "current literacy & writing level"; "The Loop" → "The LCS System"; combined Bilingual-depth sentence into "...never taught separately."
- ZH body2: "导师从头到尾追踪学生的进步：当前读写水平与目标之间的距离——并通过The LCS逐周缩小这个距离，高阶课程来确保学生不断的进阶和进步。"
- EN/ZH secondary CTA: "See Student Results" → "See Student Improvements"; "查看学生成果" → "学生成功"

### §4 Loop Section → now LCS
- EN H2: "The Loop" → "The LCS System"
- ZH H2: "The Loop" → "LCS 教学理念"
- ZH section body: rewritten with 高频低压 frame
- EN Read description: SAT-must-read books (Alice + Invisible Man + War of the Worlds)
- ZH Read description: ZH book titles 爱丽丝梦游仙境、隐形人、世界大战
- EN Think: subject pivot to "Navigators are trained to utilize..." + "form precise discussions" + "beyond general impression"
- ZH Think: subject pivot to "导师运用...引导学生..."
- EN Speak: "a better question" → "a more thought provoking question"
- ZH Speak: "捍卫" → "表达并支持"; rearranged closing with "导师不急于评价，我们借着好的问题来训练学生口语表达的精准度。"
- EN Write: rewritten — "MCT writing arc: Grammar, sentence, paragraph, essay to academic composition" + "scored against the 6+1 Trait rubric"
- ZH Write: "学生沿MCT写作路径产出书面作品：语法、句子、段落、论文到学术写作。每篇作品由导师以6+1 Trait框架逐项评分。"

### §5 ConfidenceSection
- ZH eyebrow: "如何运作" → "简单说"
- EN H2: dropped trailing "Every claim is a number we can prove."
- ZH H2: "一期16周，学生英语阅读提升一个年级。"
- ZH body: added "到" before "他们使用的每一种语言"
- ZH Pillar 1 body: dropped trailing "而不是猜测"
- ZH Pillar 1 link: "了解评估如何进行" → "测评如何进行"
- EN Pillar 2 heading: "The Loop" → "The LCS"
- ZH Pillar 2 heading: "The Loop" → "The LCS"
- EN Pillar 2 body: "The Loop" → "The LCS system"
- ZH Pillar 2 body: T1 typo fixed → "The LCS 以 MCT 语言艺术框架..."; dropped "没有猜测"
- EN Pillar 2 link: "Understand The Loop" → "Understand The LCS"
- ZH Pillar 2 link: "理解The Loop" → "认识 The LCS 系统"
- ZH Pillar 3 body: em-dash reflow + "这才是真正" → "这是真正"

### §6 ParentTrust
- EN H2: "The numbers speak first. / Then the parents." → "Enabling students to enjoy the arts of language" (line 2 empty)
- ZH H2: "数字先说话。 / 然后是家长。" → "培养学生享受文学艺术的能力" (line 2 empty)
- Result card 1: "Student A" → "Vincent X"
- Result card 2: "Student B" → "Juliette W"; city "Markham" → "Calgary" (EN + ZH detail + source)
- Result card 3: "Student C" → "River C"; city "Bay Area" → "Denver" (EN + ZH detail + source)

---

## Style decisions promoted upward

The brand guide + glossary + skill + new style-decisions log were updated to capture nine active decisions:

| # | Decision | Lives in |
|---|---|---|
| D1 | LCS = parent-facing methodology name; Loop = per-session phrase | `BRAND_CONTENT_GUIDE.md` §06 + §09; skill lint rule |
| D2 | MCT direct naming permitted in Write step | `BRAND_CONTENT_GUIDE.md` §07 |
| D3 | ZH H1 = brand sub-tagline (on home) | `BRAND_CONTENT_GUIDE.md` §12 |
| D4 | Six ZH-specific voice patterns | `BRAND_CONTENT_GUIDE.md` §08; skill lint rules |
| D5 | Testimonial: First-name + last-initial; primary city pool with Denver | `BRAND_CONTENT_GUIDE.md` §11; skill lint rule |
| D6 | "Enjoy the arts of language" humanistic frame | `BRAND_CONTENT_GUIDE.md` §09 |
| D7 | Name specific book titles in Read step | `BRAND_CONTENT_GUIDE.md` §12 |
| D8 | Lexile canon: 1 grade level / 2 cycles | `BRAND_CONTENT_GUIDE.md` §11 (from Round 1) |
| D9 | ZH 6+1 trait canon: 思考、结构、声音、用词、流畅、规范、呈现 | `dodo-glossary.json` (cascaded across 5 files; from Round 1) |

Full log: `docs/content-style-decisions.md`.

---

## Outstanding TODOs

### consultHook visibility (§1.3 user flag)
You flagged "I actually don't see this on live site." Confirmed it IS in JSX at `page.tsx:444`. Suspected causes (ranked):

1. **Live site stale** — local changes not yet pushed/deployed. Check `git log origin/main..HEAD` and your last Cloudflare/Vercel deploy.
2. **Browser cache** — try hard refresh / incognito.
3. **Color contrast** — `color: '#5856cc'` (purple) on the lavender radial-gradient backdrop. May be readable but visually subtle. If the issue is "too subtle to notice" rather than "missing", we can darken to `#3d3baa` (the hover state used elsewhere).
4. **Mobile viewport overflow** — Hero is constrained to `100dvh`. On small screens with the long ZH H1, the consultHook may push the trustLine below fold but the consultHook itself should still appear.

**Recommended diagnostic:** check on local dev (`npm run dev`) at `/en` and `/zh`. If visible locally but not on production, it's a deploy gap.

### Inline copy migration (Open Decision #13 in workflow.md)
Still pending. `HOMEPAGE_COPY` should move to `content/marketing.{en,zh}.js` `home` exports to match the 9-page pattern. Would also bring the audit script into coverage of the home page.

---

## Files touched in Round 2

| File | What changed |
|---|---|
| `app/[locale]/page.tsx` | 33 content edits across hero / photoIntro / loop (now LCS) / confidence / trust |
| `translation/BRAND_CONTENT_GUIDE.md` | §06 Loop-vs-LCS note · §07 MCT writing arc permitted · §08 ZH voice patterns table · §09 new owned terms (外教, 高频低压, "arts of language") · §11 testimonial style table · §12 home row updated |
| `.claude/skills/dodo-content-writer/SKILL.md` | Lint workflow extended with 6 new rules (Loop/LCS check · ZH combat metaphor · EN abstract evaluative · ZH reassurance tail · placeholder name · city pool) |
| `docs/content-style-decisions.md` | NEW — active style-decisions log feeding back into the brand guide |

---

## Next move

Pick one:

1. **Investigate consultHook visibility** — quick diagnostic on `npm run dev`, report findings.
2. **Inline copy migration** (workflow Open Decision #13) — extract `HOMEPAGE_COPY` to `marketing.{en,zh}.js`. ~30 min.
3. **Next page review** — recommend `/program` per §12 priority (it's the conversion-critical surface after home).
4. **Promote the home content elsewhere** — e.g., update `public/llms.txt` to reflect the new LCS-forward methodology framing.

Tell me which.
