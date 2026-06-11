# Little DODO cohesion pass — copy proposals

**Date:** 2026-06-11
**Status:** ⏸ apply-gated. Source-of-truth for what will land at apply time.
**Companion doc:** `01-FINDINGS.md`

Every proposal is bilingual (EN + ZH). Line numbers reference the current `content/marketing.{en,zh}.js` as of 2026-06-11.

---

## Priority B — `navigators.k2Note` (HIGHEST CORRECTION PRIORITY)

The current string makes a claim that contradicts how the program is actually staffed. Fix first.

### EN — `content/marketing.en.js:1199`

**Current:**
```js
text:       'Navigators teach across both age bands — from the K-2 reader in Little DODO to the Grade 12 SAT/IB candidate in the ELA Program.',
linkLabel:  'Explore Little DODO →',
href:       '/little-dodo',
```

**Proposed:**
```js
text:       'Two specialist teams under one Navigator philosophy: early-childhood educators trained in phonetics, fluency, and pronunciation for Little DODO (ages 5–8); literature, composition, and writing specialists for the ELA Program (Grade 3+). Same live model, same dedicated relationship.',
linkLabel:  'Explore Little DODO →',
href:       '/little-dodo',
```

### ZH — `content/marketing.zh.js:1173`

**Current:**
```js
text:       '导师（Navigator）跨两个年龄段授课——从都学启蒙的 K-2 起步阅读者，到 ELA 课程里的 12 年级 SAT/IB 应试生。',
linkLabel:  '了解都学启蒙 →',
href:       '/little-dodo',
```

**Proposed:**
```js
text:       '两支专长不同的导师团队，承袭同一种 Navigator 教学理念：都学启蒙（5–8 岁）由专注语音、发音与流利度的幼儿教育导师授课；ELA 课程（3 年级及以上）由文学、写作与作文专长的导师团队授课。共用一套直播模式，同样的专属关系。',
linkLabel:  '了解都学启蒙 →',
href:       '/little-dodo',
```

---

## Priority A — `public/llms.txt`

The `>` brand-summary line and line 7 are AI-discovery facing. They currently misrepresent program scope and staffing.

### Line 1 (`>` brand summary)

**Current:**
> One-on-one English language arts program for globally-mobile families, organized as two parallel age-band programs sharing **the same Navigators**, live model, and 16-week cycle structure: **Little DODO** for ages 5–8 (K–2 foundational reading + comprehension, pre-Lexile) and the **English Language Arts (ELA) Program** for Grade 3+ (Lexile-measured reading + 6+1 Trait writing). Built on the MCT gifted-ELA tradition. Each 16-week cycle runs **The LCS System** — Literacy · Composition · Speaking — as the curriculum architecture, with every session executing **The Loop** (Read → Think → Speak → Write) as the per-session phrase. Progress in the ELA Program is measured by Lexile reading levels and the 6+1 Trait writing framework; ELA Program students typically advance one grade level in reading across two 16-week cycles. DODO builds English Thinkers at mastery level; bilingual depth emerges as a natural outcome of cognitive rigor. DODO is also about enabling students to enjoy the arts of language.

**Proposed:**
> One-on-one English language arts program for globally-mobile families, organized as two parallel age-band programs sharing the same live model and 16-week cycle structure, staffed by **two specialist Navigator teams under one philosophy**: **Little DODO** for ages 5–8 (K–2 foundational reading, taught by early-childhood educators specializing in phonetics, fluency, and pronunciation; vocabulary and the love of reading built book by book; pre-Lexile) and the **English Language Arts (ELA) Program** for Grade 3+ (Lexile-measured reading + 6+1 Trait writing, taught by literature, composition, and writing specialists). Built on the MCT gifted-ELA tradition. Each ELA 16-week cycle runs **The LCS System** — Literacy · Composition · Speaking — as the curriculum architecture, with every session executing **The Loop** (Read → Think → Speak → Write) as the per-session phrase. Progress in the ELA Program is measured by Lexile reading levels and the 6+1 Trait writing framework; ELA Program students typically advance one grade level in reading across two 16-week cycles. DODO builds English Thinkers at mastery level; bilingual depth emerges as a natural outcome of cognitive rigor. DODO is also about enabling students to enjoy the arts of language.

### Line 7 (scope paragraph — stale pre-Little-DODO)

**Current:**
> The program serves students in **grades 3 through 8 (ages 7–15+)** worldwide, with concentrations across major Chinese-diaspora hubs in North America — including Metro Vancouver (Vancouver, Richmond, Burnaby, Coquitlam), Calgary, the Greater Toronto Area (Toronto, Markham, Richmond Hill, Mississauga, North York), Montreal, the San Francisco Bay Area (San Jose, Cupertino, Palo Alto, Fremont), Denver, Greater Los Angeles and the San Gabriel Valley, Orange County (Irvine), Seattle and Bellevue, New York City (Flushing, Manhattan), Boston and Cambridge, and Houston. Live sessions are delivered online by dedicated Navigators — graduates of world top-50 universities (Oxford, U of T, Queen's, LSE and others) with specialist backgrounds in English literature or composition, trained in The LCS System methodology and certified in Lexile assessment.

**Proposed:**
> The program serves students **ages 5 through high school** worldwide, with concentrations across major Chinese-diaspora hubs in North America — including Metro Vancouver (Vancouver, Richmond, Burnaby, Coquitlam), Calgary, the Greater Toronto Area (Toronto, Markham, Richmond Hill, Mississauga, North York), Montreal, the San Francisco Bay Area (San Jose, Cupertino, Palo Alto, Fremont), Denver, Greater Los Angeles and the San Gabriel Valley, Orange County (Irvine), Seattle and Bellevue, New York City (Flushing, Manhattan), Boston and Cambridge, and Houston. Live sessions are delivered online. **ELA Program Navigators** are graduates of world top-50 universities (Oxford, U of T, Queen's, LSE and others) with specialist backgrounds in English literature or composition, trained in The LCS System methodology and certified in Lexile assessment. **Little DODO educators** are dedicated early-childhood specialists in phonetics, fluency, and pronunciation, building vocabulary and the love of reading through book-by-book iteration.

### Line 13 (Little DODO entry)

**Current:**
> [Little DODO (ages 5–8)](https://www.dodolearning.com/en/little-dodo/): The K–2 foundational-reading sibling of the ELA Program. High-frequency, low-pressure live one-on-one sessions that build early reading comprehension and the habit of understanding. **Same Navigators and live model**; formal Lexile measurement begins later, in the ELA Program (Grade 3+).

**Proposed:**
> [Little DODO (ages 5–8)](https://www.dodolearning.com/en/little-dodo/): The K–2 foundational-reading sibling of the ELA Program. High-frequency, low-pressure live one-on-one sessions with a dedicated early-childhood educator specializing in phonetics, fluency, and pronunciation. Builds vocabulary and the love of reading, book by book. Same live model as the ELA Program; formal Lexile measurement begins later, in the ELA Program (Grade 3+).

---

## Homepage hero — family-level reframe

### EN — `content/marketing.en.js:189-201`

**Current:**
```js
hero: {
  eyebrow:        'For children who will think and lead in English at the highest levels',
  eyebrow2:       '',
  h1:             ['English mastery at the cognitive level.', 'Bilingual depth as the natural outcome.'],
  h1Chinese:      '',
  differentiator: '',
  consultHook:
    'We train English Thinkers — children who read above grade level, argue with evidence, write with precision. Built on the advanced literature and writing framework and Harvard's thinking science.',
  cta1:      'Watch a Demo Class',
  cta2:      'Book Your Consultation',
  trustLine:
    'Lexile-measured progress · 6+1 Trait writing framework · Live Navigator-led sessions · Think Once. In Both Languages.',
},
```

**Proposed:**
```js
hero: {
  eyebrow:        'Live, Navigator-led English literacy — ages 5 through high school',
  eyebrow2:       '',
  h1:             ['English mastery at the cognitive level.', 'Bilingual depth as the natural outcome.'],
  h1Chinese:      '',
  differentiator: '',
  consultHook:
    'From a five-year-old learning to read with a dedicated early-childhood educator, to a high-schooler arguing complex texts with their Navigator — we train English Thinkers at every stage. Built on the advanced literature and writing framework and Harvard's thinking science.',
  cta1:      'Watch a Demo Class',
  cta2:      'Book Your Consultation',
  trustLine:
    'Lexile-measured progress · 6+1 Trait writing framework · Live Navigator-led sessions · Think Once. In Both Languages.',
},
```

### ZH — `content/marketing.zh.js` (parallel lines)

**Current:**
```js
hero: {
  eyebrow:        '为将在英语世界以最高水准思考与引领的孩子而设',
  ...
  consultHook:
    '我们培养英语思维者——能阅读超出年级水平的文本、以证据论证、精确写作的孩子。以高阶文学与写作框架、哈佛思维科学为根基。',
},
```

**Proposed:**
```js
hero: {
  eyebrow:        '导师（Navigator）亲授英文读写——从 5 岁到高中',
  ...
  consultHook:
    '从五岁的孩子在专属幼儿教育导师的陪伴下学会阅读，到高中生在导师指导下论辩复杂文本——我们在每一个阶段培养英语思维者。以高阶文学与写作框架、哈佛思维科学为根基。',
},
```

(Verify the current ZH eyebrow string against the actual ZH file — included above is a reconstruction; `dodo-content-writer` skill should review the ZH at apply time.)

---

## Homepage meta + ProofStrip

### EN `home.meta` — `content/marketing.en.js:182-186`

**Current title:** *"DODO Learning — English Literacy at the Cognitive Level | Think Once. In Both Languages."*

**Proposed title:** *"DODO Learning — Live, Navigator-led English Literacy, ages 5 through high school | Think Once. In Both Languages."*

**Current description:** *"Navigator-led English literacy program training the full Read→Think→Speak→Write loop. One grade level of Lexile growth in 16 weeks. Built on the MCT Language Arts framework. Bilingual depth emerges from cognitive rigor."*

**Proposed description:** *"Live, Navigator-led English literacy for children ages 5 through high school. Little DODO (K–2): phonetics-led foundational reading with early-childhood educators. ELA Program (Grade 3+): full Read→Think→Speak→Write loop, one grade level of Lexile growth per cycle. Built on the MCT Language Arts framework. Bilingual depth emerges from cognitive rigor."*

### ZH `home.meta` — mirror with appropriate transcreation

(To be drafted at apply time with `dodo-content-writer` lint.)

### ProofStrip — DO NOT change

Decision: proof strip stays ELA-only and the row is implicitly understood as ELA Program results. We are not inventing a K-2 metric. Honest labelling could be added in a later pass if helpful.

---

## AgeBandChooser blurbs — equal-weight substance claims

### EN — `content/marketing.en.js:1377-1392`

**Current:**
```js
bands: [
  {
    href:  '/little-dodo',
    tag:   'Ages 5–8',
    name:  'Little DODO',
    blurb: 'High-frequency, low-pressure reading and comprehension for pre-elementary starters. Where the reader begins.',
    cta:   'Explore Little DODO',
  },
  {
    href:  '/program',
    tag:   'Grade 3+',
    name:  'ELA Program',
    blurb: 'Live, Navigator-led literacy and writing — read complexity, argue with evidence, write with intention. Progress measured in Lexile. A 16-week cycle, four skills every session.',
    cta:   'Explore the ELA Program',
  },
],
```

**Proposed:**
```js
bands: [
  {
    href:  '/little-dodo',
    tag:   'Ages 5–8',
    name:  'Little DODO',
    blurb: 'Live, one-on-one with a dedicated early-childhood educator — phonetics, fluency, vocabulary, and the love of reading. Built book by book. Where the reader begins.',
    cta:   'Explore Little DODO',
  },
  {
    href:  '/program',
    tag:   'Grade 3+',
    name:  'ELA Program',
    blurb: 'Live, Navigator-led literacy and writing — read complexity, argue with evidence, write with intention. Progress measured in Lexile. A 16-week cycle, four skills every session.',
    cta:   'Explore the ELA Program',
  },
],
```

(ELA blurb unchanged. Little DODO blurb now claims its own substance with parallel beat structure: live model / dedicated specialist / what they teach / what builds / where it sits.)

### ZH — `content/marketing.zh.js:1350-1364`

**Current Little DODO blurb:** *"面向幼小衔接阶段的高频低压阅读与理解课程。阅读，从这里开始。"*

**Proposed Little DODO blurb:** *"由专属幼儿教育导师直播一对一——语音、流利度、词汇与阅读的乐趣。一本一本书慢慢建立。阅读，从这里开始。"*

(ELA blurb unchanged.)

---

## `/little-dodo` hero — chip, growsIntoChip, sub, stat rail

### EN — `content/marketing.en.js:1409-1424` + page-level chip addition

**Current `hero`:**
```js
hero: {
  chip: 'Think Once. In Both Languages.',
  h1:   'Where your child's reading begins.',
  h1zh: '阅读，从这里开始。',
  sub:
    'Little DODO is the gentle start to English literacy — for children ages 5–8. A real Navigator, short and frequent sessions, and the quiet confidence that they can understand what they read. High-frequency, low-pressure, by design.',
  cta1: 'Watch a Demo Class',
  cta2: 'Book Your Consultation',
  stats: [
    { value: '5–8',    unit: 'Years',         desc: 'Pre-elementary starters'   },
    { value: '1',      unit: 'Navigator',     desc: 'Who knows your child'       },
    { value: '1-on-1', unit: 'Always',        desc: 'No group rotation'         },
    { value: 'High',   unit: 'Frequency',     desc: 'Short, frequent sessions'  },
    { value: 'Low',    unit: 'Pressure',      desc: 'By design'                 },
    { value: 'Live',   unit: 'Every Session', desc: 'Never pre-recorded'        },
  ],
},
```

**Proposed `hero`:**
```js
hero: {
  chip:          'Where language takes root.',
  growsIntoChip: 'Grade 3+? See the ELA Program →',   // NEW — gold treatment, mirrors /program's kidsChip
  h1:            'Where your child's reading begins.',
  h1zh:          '阅读，从这里开始。',
  sub:
    'Little DODO is the gentle start to English literacy — for children ages 5–8. A dedicated early-childhood educator, short and frequent sessions, and the quiet confidence that they can understand what they read. Phonetics, fluency, and vocabulary built book by book.',
  cta1: 'Watch a Demo Class',
  cta2: 'Book Your Consultation',
  stats: [
    { value: 'Ages 5–8', unit: 'K–2',           desc: 'Pre-elementary starters'           },
    { value: '1',        unit: 'Educator',      desc: 'Phonetics + fluency specialist'    },
    { value: '1-on-1',   unit: 'Always',        desc: 'Dedicated relationship'            },
    { value: 'Live',     unit: 'Every Session', desc: 'Never pre-recorded'                },
    { value: 'Phonetics',unit: 'Led',           desc: 'Decoding before comprehension'     },
    { value: 'Book',     unit: 'By Book',       desc: 'Vocabulary built through iteration'},
  ],
},
```

### ZH — `content/marketing.zh.js:1380-1395`

**Current `hero`:**
```js
hero: {
  chip: '语言的根，长在阅读里',
  h1:   '阅读，从这里开始。',
  ...
  sub:
    '都学启蒙是英文读写的温和起点——专为 5–8 岁的孩子设计。一位真实的导师（Navigator），短而高频的课程，让孩子安心地相信：我读得懂。高频低压，是设计使然。',
  cta1: '课堂实录',
  cta2: '预约咨询',
  stats: [
    { value: '5–8',  unit: '岁',     desc: '幼小衔接阶段'   },
    { value: '1',    unit: '导师',   desc: '懂您孩子的那一位' },
    { value: '1对1', unit: '始终',   desc: '没有大班轮换'   },
    { value: '高频', unit: '节奏',   desc: '短而频繁的课程' },
    { value: '低压', unit: '设计',   desc: '刻意为之'       },
    { value: '直播', unit: '每一节', desc: '从不录播'       },
  ],
},
```

**Proposed `hero`:**
```js
hero: {
  chip:          '语言的根，长在阅读里',           // ZH unchanged
  growsIntoChip: '3 年级及以上？查看 ELA 课程 →', // NEW
  h1:            '阅读，从这里开始。',
  ...
  sub:
    '都学启蒙是英文读写的温和起点——专为 5–8 岁的孩子设计。一位专属的幼儿教育导师，短而高频的课程，让孩子安心地相信：我读得懂。语音、流利度与词汇，一本一本书慢慢积累。',
  cta1: '课堂实录',
  cta2: '预约咨询',
  stats: [
    { value: '5–8 岁',   unit: 'K–2',      desc: '幼小衔接阶段'         },
    { value: '1',        unit: '导师',     desc: '语音与流利度专长'     },
    { value: '1对1',     unit: '始终',     desc: '专属师生关系'         },
    { value: '直播',     unit: '每一节',   desc: '从不录播'             },
    { value: '语音',     unit: '为先',     desc: '解码先于理解'         },
    { value: '一本一本', unit: '书',       desc: '词汇在迭代中积累'     },
  ],
},
```

### Page chrome — `app/[locale]/little-dodo/page.jsx`

Add `growsIntoChip` rendering next to the brand `chip` in `Hero()`. Style mirrors the `kidsChip` on `/program` (gold border + warm amber background, links to `/${locale}/program`). Reference the existing implementation at `app/[locale]/program/page.jsx:222-239` and invert color treatment (gold instead of lavender).

```jsx
{/* Brand chip + growsIntoChip — mirrors /program's chip + kidsChip pair */}
<div className="flex flex-wrap items-center gap-2 mb-7">
  <div
    className="inline-flex items-center gap-2 rounded-full"
    style={{
      padding:         '5px 14px',
      border:          '1px solid rgba(183,181,254,0.18)',
      backgroundColor: 'rgba(183,181,254,0.05)',
    }}
  >
    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#b7b5fe' }} />
    <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#b7b5fe' }}>
      {c.hero.chip}
    </span>
  </div>
  {c.hero.growsIntoChip && (
    <Link
      href={`/${locale}/program`}
      className="inline-flex items-center rounded-full transition-opacity hover:opacity-80"
      style={{
        padding:         '5px 14px',
        border:          '1px solid rgba(245,200,66,0.30)',
        backgroundColor: 'rgba(245,200,66,0.06)',
        fontSize:        '10px',
        fontWeight:      600,
        letterSpacing:   '0.07em',
        textTransform:   'uppercase',
        color:           '#F5C842',
      }}
    >
      {c.hero.growsIntoChip}
    </Link>
  )}
</div>
```

---

## `/little-dodo` "Same DODO" section — K-2-first framing + admin's substance

### EN — `content/marketing.en.js:1446-1452`

**Current:**
```js
shared: {
  eyebrow: 'The Same DODO',
  h2:      'The program your older child would grow into — built for five-year-olds.',
  h2zh:    null,
  body:
    'Little DODO runs on the same machinery as the ELA Program: live sessions, one dedicated Navigator, and Navigators with backgrounds in literature and composition. What changes is the pace and the pressure. Formal Lexile measurement comes later, in the ELA Program (Grade 3+); here the work is the foundation it's built on — comprehension, confidence, and a child who reaches for the next book.',
},
```

**Proposed:**
```js
shared: {
  eyebrow: 'The Same DODO',
  h2:      'Built for five-year-olds. The same DODO philosophy.',
  h2zh:    null,
  body:
    'Little DODO shares the ELA Program's delivery model — live one-on-one with a dedicated Navigator, every session. What changes is the specialist team and what they teach: Little DODO is staffed by early-childhood educators trained in phonetics, fluency, and pronunciation. Vocabulary builds book by book. The love of reading is the goal — and the foundation comprehension is built on. Formal Lexile measurement comes later, in the ELA Program (Grade 3+), when your child is ready for it.',
},
```

### ZH — `content/marketing.zh.js:1417-1423`

**Current:**
```js
shared: {
  eyebrow: '同一个都学',
  h2:      '哥哥姐姐将来会升入的课程——为五岁孩子重新设计。',
  h2zh:    null,
  body:
    '都学启蒙与 ELA 课程共用同一套体系：直播课程、一位专属导师（Navigator），以及拥有文学与写作背景的导师团队。改变的只是节奏与压力。正式的 Lexile 测评会在之后的 ELA 课程（3 年级及以上）中开始；在这里，孩子打下的是它所依托的地基——理解力、自信，以及一个会主动伸手去拿下一本书的孩子。',
},
```

**Proposed:**
```js
shared: {
  eyebrow: '同一个都学',
  h2:      '为五岁孩子重新设计。同一份都学理念。',
  h2zh:    null,
  body:
    '都学启蒙与 ELA 课程共用同一种授课模式——直播一对一，一位专属导师，每一节课。改变的是师资专长与教学重心：都学启蒙由专门的幼儿教育导师授课，深耕语音、发音与流利度。词汇量随着一本一本书慢慢积累。让孩子爱上阅读，是目标，也是日后理解力生长的土壤。正式的 Lexile 测评会在之后的 ELA 课程（3 年级及以上）中开始——在孩子准备好的时候。',
},
```

---

## `/little-dodo` "How it works" step 3 — methodology link

### EN — `content/marketing.en.js:1442-1443`

**Current:**
```js
{ num: '03', label: 'Read, then talk it through',
  desc: 'Your child reads, then says what they understood out loud — the early shape of Read → Think → Speak. Comprehension grows by talking through a story, never by drilling it.' },
```

**Proposed:**
The desc becomes structured so the page can render an inline link to `/methodology` on the phrase "Read → Think → Speak". One way:

```js
{ num: '03', label: 'Read, then talk it through',
  desc: 'Your child reads, then says what they understood out loud — the early shape of how we work.',
  methodologyLink: { phrase: 'how we work', href: '/methodology' } },
```

OR, keep the phrase but link it inline:

```js
{ num: '03', label: 'Read, then talk it through',
  desc: 'Your child reads, then says what they understood out loud — the early shape of ',
  descLink: { text: 'Read → Think → Speak', href: '/methodology' },
  descTail: '. Comprehension grows by talking through a story, never by drilling it.' },
```

(Choose at apply time — depends on whether you want to preserve the Loop vocabulary in K-2 prose with a link, or drop it entirely.)

### ZH equivalent

Apply the same structural treatment in ZH.

---

## /compare — k2 audience description + k2Note

### EN — `content/marketing.en.js:577-582`

**Current k2 audience desc:**
> *"Parents of 5–8-year-olds choosing the right entry point. You want high-frequency, low-pressure reading with a Navigator who knows your child, not a class. Little DODO is the K-2 sibling of the ELA Program — same Navigator model, adapted in pace and pressure."*

**Proposed:**
> *"Parents of 5–8-year-olds choosing the right entry point. You want one dedicated early-childhood educator, short and frequent live sessions, and phonetics-led foundational reading — not a class. Little DODO is the K-2 sibling of the ELA Program: same live delivery model, different specialist team."*

### EN — `content/marketing.en.js:681`

**Current k2Note:**
> *"Comparing for a 5–8-year-old? Little DODO is the K-2 entry point — same Navigator model, adapted in pace and pressure."*

**Proposed:**
> *"Comparing for a 5–8-year-old? Little DODO is the K-2 entry point — same live model, taught by dedicated early-childhood educators."*

### ZH counterparts

Mirror at lines 562-564 and 664.

---

## /about — Navigator paragraph (per decision #7, no separate Little DODO Navigator page)

### EN — `content/marketing.en.js:548-557`

**Current `about.navigators.p3`:**
> *"They are readers. They are thinkers. Every Navigator holds a graduate degree from a world top-50 university (Oxford, U of T, Queen's, LSE and others) with a specialist background in literature or composition. They care about language because it is how they make sense of everything — and because they know that a child trained to reason rigorously in English has a mind that will carry them further than any test score ever could."*

**Proposed:**
> *"They are readers. They are thinkers. Our ELA Program Navigators hold graduate degrees from world top-50 universities (Oxford, U of T, Queen's, LSE and others) with specialist backgrounds in literature or composition. Our Little DODO educators are early-childhood specialists in phonetics, fluency, and pronunciation. Different expertise; the same commitment — to language as the way a child makes sense of everything, and to the long view that a child trained well in English has a mind that will carry them further than any test score ever could."*

(The combined `/navigators` page will surface both groups in one roster with "Little DODO" tags per decision #7. No structural copy change to `/navigators` page is needed beyond the k2Note Priority B fix above and the tagging system — that's an implementation detail handled at the per-Navigator card level.)

### ZH counterpart

Mirror in `marketing.zh.js`.

---

## /about hero — acknowledge Little DODO is the starting point

### EN — `content/marketing.en.js:506`

**Current sub:**
> *"Built for families whose children will lead in English-dominant schools, universities, and boardrooms. Many of these children learn English as a subject — they pass exams, they sound fluent. Ask them to argue a position, read dense analytical prose, or write something original — and the language reaches its limit. DODO's founder, Janet, saw that gap and built DODO to close it. The goal is English mastery at the cognitive level. Bilingual depth is what emerges when that goal is reached."*

**Proposed (one sentence added):**
> *"Built for families whose children will lead in English-dominant schools, universities, and boardrooms. Many of these children learn English as a subject — they pass exams, they sound fluent. Ask them to argue a position, read dense analytical prose, or write something original — and the language reaches its limit. DODO's founder, Janet, saw that gap and built DODO to close it. **The work begins as early as age five and runs through high school: phonetics, fluency, and the love of reading in Little DODO; the full Read → Think → Speak → Write Loop in the ELA Program.** The goal is English mastery at the cognitive level. Bilingual depth is what emerges when that goal is reached."*

### About meta title — `marketing.en.js:496`

**Current:** *"What Is DODO Learning? English Literacy at the Cognitive Level"*

**Proposed:** *"What Is DODO Learning? Live, Navigator-led English Literacy from Age 5 through High School"*

### ZH counterparts

Mirror in `marketing.zh.js`.

---

## `lib/schema.js:324` — Course schema description

### Current (in `littleDodoCourseSchema()`):
> *"the DODO ELA Program. Shares the same Navigators and live model; formal …"*

### Proposed:
> *"the DODO ELA Program. Shares the same live model; staffed by dedicated early-childhood educators specializing in phonetics, fluency, and pronunciation. Formal Lexile measurement begins later, in the ELA Program (Grade 3+)."*

(Read full context at apply time before editing — only the "Same Navigators" claim needs replacement; the surrounding schema fields stay intact.)

---

## `public/llms-full.txt` — audit at apply time

The matching paragraph at `llms-full.txt:80` is currently written for ELA only:

> *"Matching is based on three inputs: baseline Lexile score from the entrance assessment, 6+1 Trait writing entry level, and the parent diagnostic call. Matches are made by cognitive profile, not personality."*

This describes ELA matching. Little DODO matching uses different inputs (no Lexile yet; phonetic readiness instead). At apply time, add a parallel Little DODO matching paragraph OR scope the existing paragraph to the ELA Program explicitly.

Other "Same Navigators" claims in `llms-full.txt` need a sweep at apply time.

---

## Surfaces NOT changed (verify they stay correct)

| Surface | Current state | Why not changed |
|---|---|---|
| `littleDodo.problem` | Already on-register | The "5-year-old who feels behind" framing remains effective |
| `littleDodo.fit` | Already on-register | K-2 fit criteria unchanged |
| `littleDodo.cta` | Already on-register | Funnel-correct firm close |
| `methodology.k2Note` | "Same Loop, adapted in pace and pressure" — true | The Loop pedagogically adapts; admin update doesn't contradict this |
| `lexile.k2Note` | Already accurate | Boundary statement |
| `results.k2Note` | Already accurate | Honest framing of K-2 outcomes |
| `demos.k2Note` | Already accurate | Awaiting real K-2 footage |
| Footer Programs ordering | ELA first, then Little DODO | Coherent with DODO Coding slot 3 reservation |
| AgeBandChooser 2-card structure | Locked | Per system rules + DODO Coding workstream coordination |
| Navbar lineup | 6 flat items, no dropdown | Per system rules |
| PreCtaBand SUPPRESS list | `/little-dodo` still on it | Page owns in-body close |

---

## Notes for the apply-time author

- **Apply Priority B first, in isolation if needed.** The `navigators.k2Note` rewrite is the single highest-priority correction and can ship alone before anything else.
- **Apply Priority A second.** `public/llms.txt` is AI-discovery facing; correcting scope + staffing has outsized leverage per token of edit.
- **Bilingual parity check.** Every EN change has a ZH mirror; both must land in the same apply.
- **Run `npx next build` before locking apply.** `next lint` is broken in this Next version — use `npx eslint <files>` directly.
- **Spot-check pages in browser after apply:** `/`, `/little-dodo`, `/program`, `/navigators`, `/about`, `/compare`.
- **`dodo-content-writer` lint at apply time** for both EN and ZH copy — particularly the ZH transcreations.
- **Update memory** at apply time: revise `project_dodo_chrome.md` to reflect the two-Navigator-team structure (so future sessions don't re-introduce the "same Navigators" line).
- **Update the original handoff** open-task scope: task #1 is no longer "K-2 Navigator profile" as a separate concept; it becomes "tag Little DODO educators on existing /navigators page roster."
