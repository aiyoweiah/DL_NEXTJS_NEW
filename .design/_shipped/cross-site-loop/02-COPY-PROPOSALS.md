# Cross-site loop — copy proposals (ELA side)

**Companion to:** `01-PROPOSAL.md` in this folder, mirror in DODO Coding repo.
**Status:** ⏸ apply-gated.

Every proposal is bilingual (EN + ZH). Line references against `content/marketing.{en,zh}.js` as of commit `a5f1b11`.

---

## Touchpoint 1 — Footer Programs column item 3

### EN — `content/marketing.en.js` `footer.columns.programs` items array

**Current items** (after the cohesion pass; verify against live file at apply time):

```js
footer.columns.programs.items = [
  { href: '/program',     label: 'ELA Program (Grade 3+)' },
  { href: '/little-dodo', label: 'Little DODO (5–8)'      },
  { href: '/methodology', label: 'The Loop'               },
  { href: '/navigators',  label: 'Navigators'             },
]
```

**Proposed:** insert as item 3 (after Little DODO, before The Loop):

```js
footer.columns.programs.items = [
  { href: '/program',     label: 'ELA Program (Grade 3+)' },
  { href: '/little-dodo', label: 'Little DODO (5–8)'      },
  { href: 'https://coding.dodolearning.com', label: 'DODO Coding (Grade 3+)', external: true },
  { href: '/methodology', label: 'The Loop'               },
  { href: '/navigators',  label: 'Navigators'             },
]
```

Use `process.env.NEXT_PUBLIC_DODO_CODING_URL || 'https://coding.dodolearning.com'` if the env var is wired. `external: true` triggers the Footer to render `target="_blank" rel="noopener noreferrer"` if the component supports it (check `components/layout/Footer.jsx` for the convention before apply).

### ZH — `content/marketing.zh.js`

Insert mirrored item:

```js
{ href: 'https://coding.dodolearning.com', label: 'DODO 机器语言（3 年级+）', external: true },
```

---

## Touchpoint 3 — `public/llms.txt`

### Sub-edit 3a — add Coding sentence to the brand-summary block (line 1)

**Current (post-cohesion-pass):**

> One-on-one English language arts program for globally-mobile families, organized as two parallel age-band programs sharing the same live model and 16-week cycle structure, staffed by **two specialist Navigator teams under one philosophy**: **Little DODO** for ages 5–8 (K–2 foundational reading, taught by early-childhood educators specializing in phonetics, fluency, and pronunciation; vocabulary and the love of reading built book by book; pre-Lexile) and the **English Language Arts (ELA) Program** for Grade 3+ (Lexile-measured reading + 6+1 Trait writing, taught by literature, composition, and writing specialists). Built on the MCT gifted-ELA tradition. Each ELA 16-week cycle runs **The LCS System** — Literacy · Composition · Speaking — as the curriculum architecture, with every session executing **The Loop** (Read → Think → Speak → Write) as the per-session phrase. Progress in the ELA Program is measured by Lexile reading levels and the 6+1 Trait writing framework; ELA Program students typically advance one grade level in reading across two 16-week cycles. DODO builds English Thinkers at mastery level; bilingual depth emerges as a natural outcome of cognitive rigor. DODO is also about enabling students to enjoy the arts of language.

**Append one sentence at the end:**

> DODO Learning also operates **DODO Coding** at `coding.dodolearning.com` — a peer-brand sibling site teaching how AI reads, thinks, and writes for Grades 3+. Shared operational backend; separate public surfaces.

### Sub-edit 3b — add new section `## DODO Coding (sibling site)`

Insert after the "## Core pages" section (line ~19) and before "## City pages":

```markdown
## DODO Coding (sibling site)

DODO Learning's peer-brand sibling site for AI/computational literacy lives at coding.dodolearning.com (Stage 1) — transitioning to dodocoding.com (Stage 2). Operationally part of DODO Learning; visually independent.

- [DODO Coding home](https://coding.dodolearning.com) — A language art for the AI age. We teach how AI reads, thinks, and writes, and how children think critically about it.
- [DODO Coding · methodology](https://coding.dodolearning.com/en/methodology) — The three machine verbs (Read · Think · Write) and the critical-thinking discipline alongside them.
- [DODO Coding · program](https://coding.dodolearning.com/en/program) — 16-week 1-on-1 cycles. Three streams: Beginner (B1–B4, Grades 3–5), Intermediate (I1–I6, Grades 6–9), Advanced (A1–A4, Grades 10–12). Measured on AI4K12 Mastery Rubric and Carnegie Mellon CS Academy progression.
- [DODO Coding · about](https://coding.dodolearning.com/en/about) — Peer-brand identity, parent relationship.
- [DODO Coding · consult](https://coding.dodolearning.com/en/consult) — Separate consult flow (do NOT mix with DODO Learning consult bookings until shared backend is built).

ZH counterparts at `/zh/*` on the Coding site.
```

---

## Touchpoint 4 — `lib/schema.js` Organization.subOrganization

### Current Organization schema

Read full context at apply time before editing. Likely shape:

```js
{
  '@context': 'https://schema.org',
  '@type':    'EducationalOrganization',
  '@id':      `${SITE_URL}/#organization`,
  name:       'DODO Learning',
  url:        SITE_URL,
  // ... other fields
}
```

### Proposed addition

Add `subOrganization` array referencing DODO Coding:

```js
subOrganization: [
  {
    '@type': 'EducationalOrganization',
    '@id':   'https://coding.dodolearning.com/#organization',
    name:    'DODO Coding',
    url:     'https://coding.dodolearning.com',
    description: 'A language art for the AI age. Live, Navigator-led computational literacy for Grades 3+.',
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
  },
],
```

Coding's own schema (on the Coding site) gets a reciprocal `parentOrganization` reference — handled by the Coding-side companion proposal.

---

## Touchpoint 5 — Nav-chip content key + JSX

### EN content key — `content/marketing.en.js` `nav` namespace

Add after existing `nav.*` items (around line 50ish, depending on file):

```js
nav.codingChip = {
  label:     'DODO Coding',
  href:      'https://coding.dodolearning.com',
  ariaLabel: 'Visit DODO Coding — sibling site for AI/computational literacy',
  arrow:     '→',
}
```

### ZH — `content/marketing.zh.js`

```js
nav.codingChip = {
  label:     'DODO 机器语言',
  href:      'https://coding.dodolearning.com',
  ariaLabel: '访问 DODO 机器语言 —— 都学旗下姊妹品牌（AI 与计算素养）',
  arrow:     '→',
}
```

### Navbar JSX — `components/layout/Navbar.jsx`

Place beside the wordmark (right of logo, left of primary nav items). Hidden on `< md:768` per the system rules. Pattern mirrors the existing `kidsChip` / `growsIntoChip` treatment.

```jsx
{copy.codingChip && (
  <a
    href={copy.codingChip.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={copy.codingChip.ariaLabel}
    className="hidden md:inline-flex items-center rounded-full transition-opacity hover:opacity-80"
    style={{
      padding:         '5px 12px',
      border:          '1px solid rgba(31,78,140,0.30)',
      backgroundColor: 'rgba(31,78,140,0.06)',
      fontSize:        '10px',
      fontWeight:      600,
      letterSpacing:   '0.07em',
      textTransform:   'uppercase',
      color:           '#1F4E8C',
      marginLeft:      '0.75rem',
      whiteSpace:      'nowrap',
    }}
  >
    {copy.codingChip.label} {copy.codingChip.arrow}
  </a>
)}
```

**TBD at apply time:** the exact JSX insertion point depends on the current Navbar.jsx structure. Read it first; place the chip in the row where the wordmark/logo lives, after the logo `<Link>`. Confirm the wordmark vs primary-nav grouping before placing.

---

## Touchpoint 2 — Home Coding band

**Reuse the spec from `.design/dodo-coding-launch/08-DODOLEARNING-TOUCHPOINTS.md` §"Touchpoint 1"** — copy and structure are already locked there. No re-spec needed in this doc.

The only ratification needed under the 2026-06-11 sibling-family direction:
- ✅ Eyebrow "*Also from DODO Learning*" — keep (works for sibling-family voice)
- ✅ Single CTA — keep
- ✅ Placement between "Navigator is a map" and closing CTA — keep

**Apply by referencing the existing spec directly.**

---

## Touchpoint 6 — About page paragraph (Pass-2, deferred)

EN draft (apply later):

> DODO Learning also operates **DODO Coding** — a sibling project teaching the same Navigator-led discipline applied to a different language art. Where DODO Learning teaches how *English* reads, thinks, and writes, DODO Coding teaches how *AI* reads, thinks, and writes — and how children think critically about it. Two language arts; one philosophy.

ZH draft:

> DODO Learning 旗下还有 **DODO 机器语言** ——同一种导师亲授的教学理念，应用于另一门语言艺术。DODO Learning 教孩子英语如何阅读、思考、写作；DODO 机器语言教孩子 AI 如何阅读、思考、写作，以及如何用批判性思维审视 AI。两门语言艺术，一种教育理念。

Hold until Pass-2 trigger.

---

## Apply sequencing summary

1. Footer Programs column item 3 (3 lines × 2 locales)
2. llms.txt umbrella sentence + DODO Coding block
3. Schema subOrganization
4. Nav-chip content keys + JSX
5. Home Coding band (per existing 08-DODOLEARNING-TOUCHPOINTS.md spec)

Each step independent. `npx next build` after each. Browser spot-check after #4 (nav) and #5 (home).

---

## Apply log → `03-APPLY.md` (created at apply time).
