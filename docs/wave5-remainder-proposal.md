# Wave 5 remainder — proposal (copy → apply gate)

Covers the five items left in Wave 5 after `/faq` (D91) closed:
D38 research block, D37 five strands ×2 surfaces, D41 `/compare` rows,
D14 Type A/B caption, and the `/compare` voice pass.

**Nothing here is applied.** Live copy files are untouched. This is the
chat/dump proposal the 2026-08-27 cascade method requires.

Three surfaces, three units. `/methodology` takes three of the five items,
so it is one page pass rather than three.

---

## Findings first — four things the scan turned up

### 1 · D14 did not just go missing, it went missing *and* got contradicted

`program.loop.typeAB` was emptied on 2026-05-21 with the comment
*"Type A/B caption moved to /methodology per program review Q6"*. Most of it
did move — `methodology.sessionTypes.types` carries both descriptions
faithfully. One sentence did not:

> "Type assignment is driven by the student's current Lexile data, not a fixed rotation."

And the heading it moved under says the opposite:

> `sessionTypes.heading`: "Every cycle **alternates** two kinds of session."

A fixed alternation is exactly what the retired sentence denied. So the page
now asserts the thing the original copy went out of its way to rule out. D14
is not a rehoming chore; it is a live factual contradiction.

### 2 · `/compare` is built on the one rhythm §10 names as forbidden

§10's tone-tells band lists *"not X — but Y" reversals* and *fragment-stacking*
as strip-on-sight. `/compare`'s entire title system is that reversal, ten times:

| Where | Titles |
|---|---|
| `s3.cols` | "Cognitive development — not language practice" · "Mastery standard — not grade compliance" · "A 16-week arc — not a score for next month" |
| `s6.points` | "A better question — not a faster answer" · "Calibrated feedback — not general praise" |
| `s7.cols` | "Lexile — not letter grades" · "6+1 Traits — not impressions" · "A committed arc — not rolling enrolment" |
| `s4.caption` | "The Loop is not a teaching method — it is a compounding system" |
| `s6.h2` | "A Navigator is not a tutor. Here is exactly what that means." |

Plus fragment-stacking in four places: "Different category. Different outcome." ·
"Unscripted. Eight minutes. The decision in full." · "One relationship. One
standard. One set of eyes on every draft, every oral defence, every argument." ·
"Not a monthly subscription. Not open enrolment. A structure —".

This is why the cascade plan marked the page 🔴. A comparison page has to
contrast — that is its job. The problem is the *formula*, run without variation
until it reads as a pitch. The fix below keeps the contrast in the body, where
it is actually argued, and lets the titles state DODO's position plainly.

### 3 · `/compare` breaches the §06 Loop/LCS override

§06 (2026-05-21 override): The Loop is **the per-session phrase, inside body
copy**. Forbidden: *"using 'The Loop' as a section header or named system on
brand surfaces (use LCS for that)."*

`/compare` uses "The Loop" 3× and "LCS" **0×**, including as the named
differentiator in a section header:

> `s4.h2`: "What separates DODO Learning is not the curriculum. It's The Loop."

That is the clearest canon breach on the page and it sits on a conversion
surface. Fixed in unit C below.

### 4 · Two things I am flagging, not fixing

- **MCT is named 4× on `/methodology`** (`definition.body`, step 01, step 04,
  `geo.body`). §07 permits every one of those phrasings on this page, but §06
  says MCT is named **once**, as the lineage of the L/C content. The two rules
  disagree about this page. It needs your call, so I have left all four alone
  and written the new sections without adding a fifth.
- **`compare.s8.voices`** are two attributed student testimonials carrying
  specific Lexile deltas, grades and cities (Calgary, Vancouver). Same shape as
  the Wave 7 items flagged verify-before-push. Not a voice problem — a
  provenance question. Untouched here.

---

# Unit A · `/methodology` — one page pass, three items

Current section order: hero → definition → seeItLive → why → steps(4) →
sessionTypes → lexile → trait → geo → cta.

Two new sections and one repair. Placement reasoning is in each.

## A1 · D37 — the five strands *(new `methodology.strands`)*

**Where:** immediately after `definition`, before `seeItLive`.

**Why there:** the strands say *what is taught*; the Loop steps say *how a
session runs*. §06 makes LCS the per-cycle umbrella and the Loop the
per-session phrase, so the strands have to land before the four steps or the
page explains the sequence before it has said what the sequence is made of.
Today the page never shows the branch structure at all — that only exists on
`/program`.

**§06 compliance:** LCS stays the named umbrella; strands are in DODO's own
words, never a booklist; MCT is not named again; the Loop stays the
per-session phrase (`note` below does that work explicitly).

```js
strands: {
  eyebrow:  'Inside the System',
  heading:  'Three branches, five strands, one reading child.',
  body:     'LCS is the shape of a whole language education, not a list of subjects. Literacy is where language goes in. Composition is where it comes back out, in an order that holds. Speaking is the part a book cannot do for you. Five content strands sit under those branches, and more than one of them is running in any given session even when only one has your child’s attention.',
  branches: [
    {
      letter: 'L',
      name:   'Literacy',
      nameZh: '文学精读',
      body:   'The reading treasury — where language goes in, and the root of everything a child later writes or says.',
      nested: [
        { name: 'Literature', body: 'Whole, unabridged classics, read for craft. Not excerpts and not retellings — the sentences the writer actually wrote, at the length they wrote them.' },
        { name: 'Vocabulary', body: 'The Latin and Greek roots beneath English. Structure rather than memorization, so a word your child has never met becomes one they can take apart.' },
        { name: 'Poetics',    body: 'The ear for how good writing is built — rhythm, image, the choice a writer made and the one they turned down.' },
      ],
    },
    {
      letter: 'C',
      name:   'Composition',
      nameZh: '系统写作训练',
      body:   'The construction engine — where language comes out, and where thinking has to survive being written down.',
      nested: [
        { name: 'Grammar', body: 'The architecture of the sentence, taught first and taught quickly, then used rather than recited.' },
        { name: 'Writing', body: 'Sentence to paragraph to essay to academic composition, each step assessed before the next one is asked for.' },
      ],
    },
    {
      letter: 'S',
      name:   'Speaking',
      nameZh: '表达',
      body:   'DODO’s own strand, and the reason there is a Navigator in the room at all. Oral defence, Socratic dialogue, taking the side you disagree with. It has no nested strand because nothing in a curriculum of books supplies it.',
      nested: [],
    },
  ],
  note: 'Read → Think → Speak → Write is how one session runs. The strands are what the sessions are made of.',
},
```

> ⚠️ **This is the Wave 3 trigger the completion plan warned about.** Five
> nested strand names need a label treatment, and there is no home for one —
> whoever builds this will hand-roll a fifth private label unless Wave 3's
> label vocabulary lands first. The plan says *"Sequence 5 → 3 if D37 moves
> first."* It has. Recommend the label component before this section is built,
> or it becomes the sixth D57-shaped defect.

## A2 · D38 — the research block *(new `methodology.research`)*

**Where:** after `trait`, before `geo`.

**Why there:** `geo` is the "for LLMs and search" block that names the four
frameworks. The research block is the evidence *under* one of them, and §07a
names `/methodology` "Why this works" + `llms-full.txt` + schema `citation`
nodes as its deployment set. Putting it directly above `geo` lets the citation
nodes sit next to the framework list they support.

**Hard rule observed:** §07a says the evidence is strongest in
ELL / struggling-reader / dyslexia populations and **must never be deployed
that way**. Nothing below uses a remediation register. One consequence: I have
dropped the journal name *Annals of Dyslexia* from the Goodwin & Ahn (2010)
citation and given author + year only. The full journal string belongs in
`llms-full.txt` and the schema node, where no parent reads it as a category
signal. That is a deliberate split, not an omission — flagging it because it
differs from the guide's drop-in list.

**Body is 71 words** (§07a asks 40–80).

```js
research: {
  eyebrow:  'Why This Works',
  heading:  'The part of this you can go and check.',
  body:     'English is built out of Latin and Greek — about sixty percent of it, and over ninety percent of the language of science. We teach the roots beneath the words, so a term your child has never seen becomes one they can take apart and solve. It happens to be one of the most-researched strategies in education, which means you do not have to take our word for any of it.',
  findings: [
    {
      claim:  'In a study of 493 middle-school students, root-based vocabulary teaching outperformed memorization — for gifted and typically-developing students alike.',
      source: 'Gallagher, S. A. (2017), Roeper Review 39(2)',
    },
    {
      claim:  'Across dozens of controlled studies, teaching the structure of words produces measurable gains in vocabulary, decoding and spelling.',
      source: 'Goodwin & Ahn (2010, 2013); Bowers, Kirby & Deacon (2010)',
    },
    {
      claim:  'The gains are largest when word structure is woven into real reading rather than drilled on its own — which is why it lives inside the literature here, not beside it.',
      source: 'Bowers, Kirby & Deacon (2010), Review of Educational Research 80',
    },
    {
      claim:  'Children grow most on rich, challenging text rather than simplified readers. That is why we read real, unabridged classics, set a step above the comfortable level on purpose.',
      source: 'Shanahan; Keys to Literacy — challenging-text research',
    },
  ],
  note: 'Roots are the reason the vocabulary transfers. A child who knows spect reads their way into inspect, circumspect, spectrum and spectacle without being taught a single one of them.',
},
```

**On the five permitted claims:** §07a licenses five. Four are above. The
fifth — *"about 60% of English comes from Latin and Greek, over 90% in
science"* — is in `body` rather than the list, because stacking five numbered
claims is the stacked-tricolon rhythm §10 strips on sight, and §08 says depth
shows through one precise true detail rather than a number in every sentence.
All five claims are present; one is prose. If you would rather have the flat
five-claim list for GEO extraction, say so and I will invert it — the citation
pairs are the extractable asset either way.

## A3 · D14 — the Type A/B repair *(edit `methodology.sessionTypes`)*

Restores the sentence lost on 2026-05-21 and removes the contradiction it
created.

```js
// heading — was: 'Every cycle alternates two kinds of session.'
heading: 'Every cycle runs two kinds of session.',

// note — NEW key, renders under the two type cards
note: 'Which kind your child gets in a given week follows their current Lexile data, not a fixed rotation. If the reading needs another week, it gets another week.',
```

`sessionTypes.types[0]` and `[1]` are already faithful to the original caption
and need no change.

---

# Unit B · `/program` — D37, the lighter half

`program.architecture.strands` already carries L / C / S with a body each. It
is missing the nesting. `/methodology` is the deep surface; `/program` should
name the five and stop — so this is an addition to the existing three entries
plus one sentence in `architecture.body`.

```js
// architecture.body — append one sentence to the existing text, after
// "…is the curriculum architecture."
'Five content strands nest under those three branches.'

// architecture.strands[0] — Literacy: add
nested: ['Literature', 'Vocabulary', 'Poetics'],

// architecture.strands[1] — Composition: add
nested: ['Grammar', 'Writing'],

// architecture.strands[2] — Speaking: add
nested: [],
nestedNote: 'DODO’s own strand — no nested strand, because no book supplies it.',
```

Existing `body` text on all three stays as it is. Same Wave 3 label dependency
as A1 applies.

---

# Unit C · `/compare` — D41 rows + the voice pass

## C1 · D41 — two new rows in `s3.cols` (3 → 5)

§01b is the canonical home for the AI rebuttal and says elsewhere should
*reference* it, not restate it. So row 4 is the compressed version; the full
answer now lives on `/faq` (D91, `program.ai`) and in §01b.

```js
// s3.cols[3] — the AI row
{
  question: 'vs. AI tutors and homework apps',
  title:    'The judgment behind the question',
  body:     'AI is a tool your child will use for the rest of their life, and using it well is a skill worth having. What it cannot do is build the judgment underneath. It will answer whatever it is asked. A Navigator teaches your child which question is worth asking, then presses on the point they have not made yet — and the reading and the reasoning stay your child’s own work.',
},

// s3.cols[4] — the gifted-ELA-books row
{
  question: 'vs. buying the curriculum yourself',
  title:    'A live reader in the room',
  body:     'The classical ELA materials are real books, and a determined family can buy them. What arrives is the reading and the writing. What cannot arrive is the third strand — someone who hears how your child reasons, asks the harder question at the moment it would land, and coaches the spoken defence of an idea. That part has no page.',
},
```

Both avoid the reversal formula. Row 5 references the Speaking strand, which
ties `/compare` to the D37 work in units A and B — currently `/compare` never
mentions it.

## C2 · The voice pass

### C2a · The §06 breach — `s4`

```js
// h2 — was: 'What separates DODO Learning is not the curriculum. It’s The Loop.'
h2: 'What separates DODO Learning is the LCS System.',

// caption — was the 4-sentence version with "compounding system" and "simply" twice
caption: 'Inside every session the same sequence runs: Read → Think → Speak → Write. Each stage is assessed, and each one feeds the next. Over sixteen weeks a child working this way with a Navigator does not only read better. They get better at working through anything difficult, which is the part that keeps paying.',
```

"The Loop" now appears once, in body copy, as the sequence — which is exactly
what §06 permits. "LCS System" appears for the first time on the page.

### C2b · The reversal formula — titles

Contrast moves into the body, where it is argued. Titles state the position.

| Key | Was | Proposed |
|---|---|---|
| `s3.cols[0].title` | Cognitive development — not language practice | Cognitive development, not language practice *(keep — the body earns it)* |
| `s3.cols[1].title` | Mastery standard — not grade compliance | Measured against their own ceiling |
| `s3.cols[2].title` | A 16-week arc — not a score for next month | A sixteen-week arc |
| `s6.points[1].label` | A better question — not a faster answer | A better question |
| `s6.points[2].label` | Calibrated feedback — not general praise | Feedback with a number attached |
| `s7.cols[0].title` | Lexile — not letter grades | A Lexile number |
| `s7.cols[1].title` | 6+1 Traits — not impressions | Seven traits, scored |
| `s7.cols[2].title` | A committed arc — not rolling enrolment | A cycle with a beginning and an end |

One reversal survives, in `s3.cols[0]` — the page's opening claim, where the
contrast *is* the argument and the body immediately does the work. Nine become
statements. That is the variation §10 is asking for; stripping all ten would
flatten the page's actual purpose.

### C2c · Fragment-stacking — four repairs

```js
// s3.cols[0].body — drop the trailing two fragments
// was: '…and writing with precision. Different category. Different outcome.'
'…and writing with precision. It is a different category of work, and it produces a different kind of student.'

// s5.sub — was: 'Unscripted. Eight minutes. The decision in full.'
'Eight unscripted minutes on why we started, and what we decided we would never do.'

// s6.points[3].body — closing sentence was:
//   'One relationship. One standard. One set of eyes on every draft, every oral defence, every argument.'
'One relationship, one standard, and the same set of eyes on every draft and every oral defence your child gives.'

// s7.cols[2].body — was:
//   '…and a confirmed result. Not a monthly subscription. Not open enrolment. A structure — because compounding only works when the work is continuous and the Navigator’s knowledge accumulates.'
'…and a confirmed result. It is not a monthly subscription you drift in and out of, because the compounding only happens when the work is continuous and the Navigator’s knowledge of your child keeps accumulating.'
```

### C2d · `s6.h2`

```js
// was: 'A Navigator is not a tutor. Here is exactly what that means.'
h2: 'What a Navigator does that a tutor cannot.',
```

Same claim, without the reversal-plus-throat-clear.

---

## What this does not cover

- **ZH.** Every string above is EN. On apply, the new and changed keys go into
  a `pending-en.json` extract for the DeepSeek round, same as D91. Roughly 40
  translatable keys across the three surfaces.
- **New JSX.** A1 and A2 are new sections on `/methodology` and need markup,
  not just content keys. B and C are content-only.
- **The Wave 3 label dependency** (A1, B). Recommend sequencing 3 before the
  build of those two.
- **The MCT-count question** and **the `s8.voices` provenance question** — both
  need your call, both left untouched.

## Applying

Say **apply**, and optionally which units. Default order if you just say
apply: **C → B → A**, cheapest first — `/compare` is content-only and carries
a live canon breach, `/program` is a small addition, `/methodology` is the one
that needs new markup and the label decision.
