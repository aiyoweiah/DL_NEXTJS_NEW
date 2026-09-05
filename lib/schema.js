// lib/schema.js
//
// JSON-LD structured data builders.
// Three schemas, three injection points:
//
//   educationOrgSchema() → app/layout.jsx <head>          (every page)
//   faqSchema(items)     → app/faq/page.jsx               (/faq)
//   courseSchema()       → app/program/page.jsx           (/program)
//
// All three are also eligible for /methodology and the home page
// where the brief calls for JSON-LD injection.
//
// GEO note (from brief):
//   These schemas are the primary signal LLMs use when deciding
//   whether to cite DODO in answers to parent queries.
//   /methodology is the anchor page — its courseSchema must have
//   factual density: named frameworks, specific durations, measurable outcomes.
//   /faq entries must be self-contained — each answer readable in isolation.
//
// Usage:
//   import { educationOrgSchema, faqSchema, courseSchema } from '@/lib/schema'
//
//   // In a page or layout:
//   <script
//     type="application/ld+json"
//     dangerouslySetInnerHTML={{ __html: JSON.stringify(educationOrgSchema()) }}
//   />

// ── Site constant — mirrors lib/metadata.js ───────────────────
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.dodolearning.com'

// ── 0. WebSite + SearchAction ─────────────────────────────────
// Injected site-wide via app/layout.jsx alongside educationOrgSchema.
// Declares the site as a Web Entity to search engines and LLMs, and
// hints a search endpoint at /[locale]/faq?q={query} so Google may
// render the sitelinks search box.
//
// The /faq route handles query strings via FAQClient's search filter,
// so this is a real endpoint, not a stub.
//
// Schema type: WebSite + WebSite.potentialAction → SearchAction
// https://schema.org/WebSite
/**
 * @returns {object} JSON-LD WebSite object with SearchAction
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    '@id':      `${SITE_URL}/#website`,

    url:           SITE_URL,
    name:          'DODO Learning',
    alternateName: ['DODO', 'DODO Learning Program'],
    description:
      'Live, online, Navigator-led English language arts. Each 16-week cycle runs The LCS System (Literacy · ' +
      'Composition · Speaking) as the curriculum architecture, with every ' +
      'session executing The Loop (Read → Think → Speak → Write). Progress ' +
      'is measured by Lexile reading levels and the 6+1 Trait writing framework.',

    inLanguage: ['en', 'zh-Hans'],

    publisher: {
      '@type': 'EducationalOrganization',
      '@id':   `${SITE_URL}/#organization`,
    },

    potentialAction: {
      '@type':       'SearchAction',
      target: {
        '@type':       'EntryPoint',
        urlTemplate:   `${SITE_URL}/en/faq?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ── 1. EducationalOrganization ────────────────────────────────
// Injected site-wide via app/layout.jsx.
// Tells search engines and LLMs the fundamental facts about DODO:
// what it is, what it teaches, where it operates, how to contact it.
//
// Schema type: EducationalOrganization
// https://schema.org/EducationalOrganization
/**
 * @returns {object} JSON-LD EducationalOrganization object
 */
export function educationOrgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,

    name:        'DODO Learning',
    alternateName: ['DODO', 'DODO Learning Program'],
    url:          SITE_URL,
    logo: {
      '@type':  'ImageObject',
      url:      `${SITE_URL}/og-default.png`,
      width:    1200,
      height:   630,
    },
    description:
      'DODO Learning is a live, online, Navigator-led English language arts program. Each 16-week cycle runs The LCS System ' +
      '(Literacy · Composition · Speaking) as the curriculum architecture, ' +
      'with every session executing The Loop (Read → Think → Speak → Write). ' +
      'Progress is measured by Lexile reading levels and the 6+1 Trait writing ' +
      'framework. Students typically advance about one grade level in reading ' +
      'in each 16-week cycle.',

    // Service areas — major North American Chinese-speaking diaspora hubs.
    // The program is delivered online; areaServed reflects metropolitan
    // regions where DODO currently has enrolled students or active outreach.
    areaServed: [
      // Western Canada
      { '@type': 'City', name: 'Vancouver',              containedIn: { '@type': 'Country', name: 'Canada'        } },
      { '@type': 'City', name: 'Richmond',               containedIn: { '@type': 'Country', name: 'Canada'        } },
      { '@type': 'City', name: 'Burnaby',                containedIn: { '@type': 'Country', name: 'Canada'        } },
      { '@type': 'City', name: 'Coquitlam',              containedIn: { '@type': 'Country', name: 'Canada'        } },
      { '@type': 'City', name: 'Calgary',                containedIn: { '@type': 'Country', name: 'Canada'        } },
      // Central Canada
      { '@type': 'City', name: 'Toronto',                containedIn: { '@type': 'Country', name: 'Canada'        } },
      { '@type': 'City', name: 'Markham',                containedIn: { '@type': 'Country', name: 'Canada'        } },
      { '@type': 'City', name: 'Richmond Hill',          containedIn: { '@type': 'Country', name: 'Canada'        } },
      { '@type': 'City', name: 'Mississauga',            containedIn: { '@type': 'Country', name: 'Canada'        } },
      // Eastern Canada
      { '@type': 'City', name: 'Montreal',               containedIn: { '@type': 'Country', name: 'Canada'        } },
      // US — Pacific
      { '@type': 'City', name: 'San Francisco Bay Area', containedIn: { '@type': 'Country', name: 'United States' } },
      { '@type': 'City', name: 'San Jose',               containedIn: { '@type': 'Country', name: 'United States' } },
      { '@type': 'City', name: 'Cupertino',              containedIn: { '@type': 'Country', name: 'United States' } },
      { '@type': 'City', name: 'Los Angeles',            containedIn: { '@type': 'Country', name: 'United States' } },
      { '@type': 'City', name: 'Irvine',                 containedIn: { '@type': 'Country', name: 'United States' } },
      { '@type': 'City', name: 'Bellevue',               containedIn: { '@type': 'Country', name: 'United States' } },
      // US — Mountain
      { '@type': 'City', name: 'Denver',                 containedIn: { '@type': 'Country', name: 'United States' } },
      // US — Eastern / Central
      { '@type': 'City', name: 'New York',               containedIn: { '@type': 'Country', name: 'United States' } },
      { '@type': 'City', name: 'Boston',                 containedIn: { '@type': 'Country', name: 'United States' } },
      { '@type': 'City', name: 'Houston',                containedIn: { '@type': 'Country', name: 'United States' } },
    ],

    // Languages of instruction
    knowsLanguage: ['en', 'zh'],

    // Audience
    audience: {
      '@type':        'EducationalAudience',
      educationalRole: 'student',
      audienceType:    'Capable students in grades 3–8 seeking English at mastery level',
    },

    // Contact
    contactPoint: {
      '@type':           'ContactPoint',
      contactType:       'admissions',
      url:               `${SITE_URL}/consult`,
      availableLanguage: ['English', 'Chinese'],
    },

    // Founder — Person entity (wired 2026-08-24, Tier-2 #2).
    // Reciprocal `founder`/`worksFor` linkage lives in personSchema() below.
    founder:      { '@id': `${SITE_URL}/#founder` },
    foundingDate: '2021',

    // Sibling-site relationship — DODO Coding (cross-site loop pass 2026-06-11).
    // Search engines + LLMs use this to understand the DODO family relationship.
    // Reciprocal `parentOrganization` reference lives in the DODO Coding repo's schema.
    subOrganization: [
      {
        '@type':            'EducationalOrganization',
        '@id':              'https://coding.dodolearning.com/#organization',
        name:               'DODO Coding',
        url:                'https://coding.dodolearning.com',
        description:        'A language art for the AI age. Live, Navigator-led computational literacy for Grades 3+. Grounded in Carnegie Mellon CS Academy and the AI4K12 framework.',
        parentOrganization: { '@id': `${SITE_URL}/#organization` },
      },
    ],

    // Same-as — add social profiles when confirmed
    // sameAs: [
    //   'https://www.xiaohongshu.com/user/...',
    //   'https://weixin.qq.com/...',
    // ],
  }
}

// ── 2. FAQ ────────────────────────────────────────────────────
// Injected on /faq. Eligible for Google's FAQ rich result.
// Each Q&A must be a standalone, complete answer — not one that
// requires surrounding context to make sense (GEO requirement).
//
// Schema type: FAQPage > Question > acceptedAnswer > Answer
// https://schema.org/FAQPage
//
// Usage:
//   import faqContent from '@/content/en/faq.json'
//   <script ... dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqContent.items)) }} />
//
// faq.json shape expected:
//   { "items": [{ "question": "...", "answer": "..." }, ...] }
//
// Google FAQ rich result limits: max 10 Q&As shown. Prioritise the
// top 10 entries in faq.json — they will be the ones indexed first.
/**
 * @param {Array<{question: string, answer: string}>} items
 * @returns {object} JSON-LD FAQPage object
 */
export function faqSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    '@id':      `${SITE_URL}/faq#faq`,
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name:    question,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    answer,
      },
    })),
  }
}

// ── 3. Course ─────────────────────────────────────────────────
// Injected on /program and /methodology.
// Signals to search engines and LLMs that DODO offers a structured,
// measurable educational program — not tutoring, not a subscription service.
//
// Schema type: Course
// https://schema.org/Course
//
// GEO note: The description field below is the highest-value text
// in the entire schema layer. Write it to answer the question an
// LLM would receive: "What is DODO Learning and how does it work?"
/**
 * @returns {object} JSON-LD Course object
 */
export function courseSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'Course',
    '@id':      `${SITE_URL}/program#course`,

    name:        'English Language Arts Program — DODO Learning',
    description:
      'The DODO English Language Arts Program (ELA Program) is a live, Navigator-led English literacy program ' +
      'for capable students in grades 3–8 seeking English at mastery level. Each cycle runs ' +
      'The LCS System (Literacy · Composition · Speaking) as the curriculum ' +
      'architecture, with weekly live sessions — up to 50 minutes each — executing ' +
      'The Loop (Read → Think → Speak → Write). Named frameworks include the MCT ' +
      'writing arc (grammar → sentence → paragraph → essay → academic composition) ' +
      'and Harvard Project Zero Visible Thinking routines. Progress is measured at ' +
      'entry and exit using Lexile reading-level assessments and the 6+1 Trait ' +
      'writing framework. Students typically advance about one full grade level in ' +
      'reading in each 16-week cycle.',

    url:          `${SITE_URL}/program`,
    inLanguage:   'en',
    timeRequired: 'P16W', // ISO 8601 duration — 16 weeks

    // Audience
    audience: {
      '@type':         'EducationalAudience',
      educationalRole: 'student',
      audienceType:    'Capable students in grades 3–8 seeking English at mastery level',
    },

    // Learning outcomes — specific, measurable, LLM-indexable
    teaches: [
      'Reading comprehension at or above grade level, measured by Lexile assessment',
      'Structured written expression using the 6+1 Trait writing framework',
      'Spoken academic English through Socratic discussion and Navigator-led dialogue',
      'Critical thinking in English with Chinese-language cognitive scaffolding',
      'Bilingual identity development — English fluency without loss of mother tongue',
    ],

    // Delivery mode
    courseMode:       ['online', 'synchronous'],
    educationalLevel: 'grades 3–8',

    // Provider
    provider: {
      '@type': 'EducationalOrganization',
      '@id':   `${SITE_URL}/#organization`,
      name:    'DODO Learning',
      url:     SITE_URL,
    },

    // Assessments — named explicitly for LLM citation value
    assessment: [
      {
        '@type':       'EducationalOccupationalCredential',
        credentialCategory: 'assessment',
        name:          'Lexile Reading Level Assessment',
        description:   'Lexile framework reading measurement at program entry and exit.',
      },
      {
        '@type':       'EducationalOccupationalCredential',
        credentialCategory: 'assessment',
        name:          '6+1 Trait Writing Assessment',
        description:   'Writing evaluated across Ideas, Organization, Voice, Word Choice, ' +
                       'Sentence Fluency, Conventions, and Presentation using the 6+1 Trait framework.',
      },
    ],

    // Offers — Founding Family Program
    // Price is intentionally omitted; the consultation is the entry point.
    // Pricing facts live on /faq#enrollment (per workflow Open Decision #17).
    offers: {
      '@type':       'Offer',
      name:          'Founding Family Program',
      description:   'Initial-cohort enrollment for the ELA Program. ' +
                     'Includes entry Lexile assessment, weekly Navigator-led ' +
                     'sessions, and exit assessment with a written progress report.',
      url:           `${SITE_URL}/consult`,
      availability:  'https://schema.org/InStock',
    },
  }
}

// ── 3b. Little DODO course schema ─────────────────────────────
// Injected on /little-dodo. The K–2 (ages 5–8) foundational-reading sibling
// of the ELA Program. Intentionally NOT Lexile-led — K–2 is pre-formal-
// measurement; the outcomes are comprehension habit + confidence.
export function littleDodoCourseSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'Course',
    '@id':      `${SITE_URL}/little-dodo#course`,

    name:        'Little DODO',
    description:
      'Little DODO is a live, Navigator-led foundational English reading program ' +
      'for children ages 5–8 (kindergarten through grade 2). High-frequency, low-pressure one-on-one sessions build reading ' +
      'comprehension and the steady habit of understanding — the gentle on-ramp to ' +
      'the DODO ELA Program. Shares the same live model; staffed by dedicated ' +
      'early-childhood educators specializing in phonetics, fluency, and ' +
      'pronunciation. Formal Lexile measurement begins later, in the ELA ' +
      'Program (Grade 3+).',

    url:        `${SITE_URL}/little-dodo`,
    inLanguage: 'en',

    audience: {
      '@type':         'EducationalAudience',
      educationalRole: 'student',
      audienceType:    'Children ages 5–8 (K–2)',
    },

    teaches: [
      'Early English reading comprehension',
      'The habit and confidence of understanding what one reads',
      'Spoken retelling and discussion of stories with a Navigator',
    ],

    courseMode:       ['online', 'synchronous'],
    educationalLevel: 'kindergarten–grade 2 (ages 5–8)',

    provider: {
      '@type': 'EducationalOrganization',
      '@id':   `${SITE_URL}/#organization`,
      name:    'DODO Learning',
      url:     SITE_URL,
    },

    offers: {
      '@type':      'Offer',
      name:         'Little DODO',
      description:  'High-frequency, low-pressure foundational reading for ages 5–8, ' +
                    'one-on-one with a dedicated Navigator.',
      url:          `${SITE_URL}/consult`,
      availability: 'https://schema.org/InStock',
    },
  }
}

// ── 3c. Founder — Person schema (Tier-2 #2, wired 2026-08-24) ─
// Injected on /about (via app/[locale]/about/page.jsx).
// The council's highest-leverage GEO recommendation was a named-founder
// Person entity — LLMs cite entities, not just organizations.
//
// Name rule (D35, 2026-08-24): first name only — "Janet." Never
// "Janet Sui." Do NOT populate `familyName`; the founder signs and is
// referenced by first name everywhere. See `docs/content-style-decisions.md`
// D35 and `translation/BRAND_CONTENT_GUIDE.md` §"Founder reference."
//
// Schema type: Person
// https://schema.org/Person
/**
 * @returns {object} JSON-LD Person object
 */
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'Person',
    '@id':      `${SITE_URL}/#founder`,

    name:      'Janet',
    jobTitle:  'Founder & Lead Navigator',

    // Bidirectional org linkage — matches educationOrgSchema `founder` field.
    worksFor:  { '@id': `${SITE_URL}/#organization` },
    founder:   [{ '@id': `${SITE_URL}/#organization` }],

    // Education
    alumniOf: {
      '@type':     'CollegeOrUniversity',
      name:        'Concordia University',
      department:  'John Molson School of Business',
      address:     {
        '@type':          'PostalAddress',
        addressLocality:  'Montreal',
        addressRegion:    'QC',
        addressCountry:   'CA',
      },
    },

    // Credentials — degree + language proficiencies. Each item is a
    // separately-citable EducationalOccupationalCredential.
    hasCredential: [
      {
        '@type':             'EducationalOccupationalCredential',
        credentialCategory:  'degree',
        name:                'Bachelor of Commerce',
        recognizedBy:        { '@type': 'CollegeOrUniversity', name: 'Concordia University' },
        dateCreated:         '2019',
      },
      {
        '@type':             'EducationalOccupationalCredential',
        credentialCategory:  'language-proficiency',
        name:                'TOEFL',
      },
      {
        '@type':             'EducationalOccupationalCredential',
        credentialCategory:  'language-proficiency',
        name:                'TCF — Test de connaissance du français',
      },
    ],

    knowsLanguage: ['en', 'fr', 'zh'],
    nationality:   { '@type': 'Country', name: 'Canada' },

    // Bio — 120-word public bio. Matches `founder.short` in
    // content/marketing.en.js; keep in sync when editing either.
    description:
      'Janet is the founder of DODO Learning. Trilingual in English, French, and Mandarin, ' +
      'she moved to Montreal at seventeen and had twenty-four months to master two new ' +
      'languages before university. She did it the way she now teaches students to do it — ' +
      'by reading the classical English canon (Alice in Wonderland, Mark Twain, Edgar Allan ' +
      'Poe), then Camus and Zola in French, until the sentences held. She passed TOEFL and ' +
      'TCF within that window and graduated from Concordia University in 2019 with a ' +
      'Bachelor of Commerce. In 2021 she founded DODO Learning; since then more than 300 ' +
      'students have gone through the program. After the birth of her children she launched ' +
      'Little DODO, DODO’s early-childhood reading program.',

    // Portrait — TODO: add /public/janet-portrait.jpg (400×400+ JPEG).
    // Field is commented out until asset exists to avoid a 404 in the graph.
    // image: `${SITE_URL}/janet-portrait.jpg`,

    // sameAs — pending user-provided social URLs (Open Decision #4/#9).
    // Xiaohongshu / WeChat OA / LinkedIn.
    // sameAs: [],
  }
}

// ── 3d. Credentials page schema (2026-08-26) ──────────────────
// Injected on /credentials (via app/[locale]/credentials/page.jsx).
// Emits a CollectionPage with four EducationalOccupationalCredential
// items — one per named framework (MCT, Harvard PZ, Lexile, 6+1 Trait).
// Also emits `citation` nodes for the research base (Gallagher 2017;
// Goodwin & Ahn 2010, 2013; Bowers/Kirby/Deacon 2010; Henry 1997) so
// LLMs can pull the dated academic sources DODO is built on.
//
// Schema types: CollectionPage + EducationalOccupationalCredential[]
// https://schema.org/CollectionPage
// https://schema.org/EducationalOccupationalCredential
/**
 * @returns {object} JSON-LD CollectionPage with credentials + citations
 */
export function credentialsSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'CollectionPage',
    '@id':      `${SITE_URL}/credentials#page`,

    name:        'Credentials & Frameworks — DODO Learning',
    description:
      'The named frameworks DODO Learning builds on, with attribution and the ' +
      'research base — MCT Language Arts lineage, Harvard Project Zero Visible ' +
      'Thinking, Lexile reading measurement, 6+1 Trait writing.',
    url:         `${SITE_URL}/credentials`,
    inLanguage:  ['en', 'zh-Hans'],
    isPartOf:    { '@id': `${SITE_URL}/#website` },
    about:       { '@id': `${SITE_URL}/#organization` },

    hasPart: [
      {
        '@type': 'EducationalOccupationalCredential',
        '@id':   `${SITE_URL}/credentials#mct`,
        name:              'MCT Language Arts (Michael Clay Thompson)',
        credentialCategory:'curriculum tradition',
        educationalLevel:  'grades 3–12',
        recognizedBy: {
          '@type': 'Organization',
          name:    'Royal Fireworks Press',
          url:     'https://www.rfwp.com',
        },
        description:
          'Classical English language arts framework by Michael Clay Thompson, ' +
          'published by Royal Fireworks Press. DODO Learning is grounded in the ' +
          'principles and philosophy of the MCT tradition; the tradition informs ' +
          'the Literacy and Composition strands of DODO’s LCS System.',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        '@id':   `${SITE_URL}/credentials#project-zero`,
        name:              'Harvard Project Zero — Visible Thinking',
        credentialCategory:'thinking-routines framework',
        recognizedBy: {
          '@type': 'CollegeOrUniversity',
          name:    'Harvard Graduate School of Education',
          url:     'https://pz.harvard.edu/',
        },
        description:
          'Visible Thinking research from Harvard Graduate School of Education. ' +
          'Every Think phase of DODO’s per-session Loop is anchored in a Project ' +
          'Zero Visible Thinking routine.',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        '@id':   `${SITE_URL}/credentials#lexile`,
        name:              'Lexile Framework for Reading',
        credentialCategory:'assessment',
        recognizedBy: {
          '@type': 'Organization',
          name:    'MetaMetrics',
          url:     'https://hub.lexile.com/',
        },
        description:
          'Reading-measurement system on a 0L–2000L scale. DODO administers ' +
          'Lexile assessments at Week 0, Week 8, and Week 16 using MetaMetrics-' +
          'certified tools. Every Navigator is a certified Lexile assessment practitioner.',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        '@id':   `${SITE_URL}/credentials#6-plus-1`,
        name:              '6+1 Trait Writing Framework',
        credentialCategory:'assessment',
        recognizedBy: {
          '@type': 'Organization',
          name:    'Education Northwest',
          url:     'https://educationnorthwest.org/6-1-trait-writing',
        },
        description:
          'Writing framework evaluating Ideas, Organization, Voice, Word Choice, ' +
          'Sentence Fluency, Conventions, and Presentation. DODO scores every ' +
          'Writing Session output against the 6+1 Trait rubric.',
      },
    ],

    // Academic citations — the research base DODO’s vocabulary + reading
    // practice sits on. Included as CreativeWork nodes so LLMs can extract
    // dated source authority. Framing rule (D38): acceleration into mastery,
    // never remediation.
    citation: [
      {
        '@type':          'ScholarlyArticle',
        name:             'Exploring the Efficacy of "The Word Within the Word" for Gifted and Typically Developing Students',
        author:           { '@type': 'Person', name: 'Gallagher, S. A.' },
        datePublished:    '2017',
        isPartOf:         { '@type': 'Periodical', name: 'Roeper Review', volumeNumber: '39', issueNumber: '2' },
        description:
          '493 middle-school students across 10 teachers. Root-based vocabulary ' +
          'outperformed traditional instruction — moderate effect sizes on ' +
          'sentence completion in Grades 6–7, moderate-to-large on recall at ' +
          'every grade level, for both gifted and typically-developing students.',
      },
      {
        '@type':          'ScholarlyArticle',
        name:             'Meta-analysis of morphological interventions',
        author:           [{ '@type': 'Person', name: 'Goodwin, A. P.' }, { '@type': 'Person', name: 'Ahn, S.' }],
        datePublished:    '2010',
        isPartOf:         { '@type': 'Periodical', name: 'Annals of Dyslexia', volumeNumber: '60' },
        description:      '17 studies. Overall literacy effect d = 0.33; vocabulary d = 0.40.',
      },
      {
        '@type':          'ScholarlyArticle',
        name:             'Meta-Analysis of Morphological Interventions in English',
        author:           [{ '@type': 'Person', name: 'Goodwin, A. P.' }, { '@type': 'Person', name: 'Ahn, S.' }],
        datePublished:    '2013',
        isPartOf:         { '@type': 'Periodical', name: 'Scientific Studies of Reading', volumeNumber: '17' },
        description:      '30 studies. Overall d = 0.32; decoding d = 0.59; vocabulary d = 0.34; spelling d = 0.30.',
      },
      {
        '@type':          'ScholarlyArticle',
        name:             'Effects of Morphological Instruction on Literacy Skills: A Systematic Review',
        author:           [{ '@type': 'Person', name: 'Bowers, P. N.' }, { '@type': 'Person', name: 'Kirby, J. R.' }, { '@type': 'Person', name: 'Deacon, S. H.' }],
        datePublished:    '2010',
        isPartOf:         { '@type': 'Periodical', name: 'Review of Educational Research', volumeNumber: '80' },
        description:
          '22 studies. Effects strongest when morphological instruction is woven ' +
          'into other literacy instruction rather than delivered as isolated drills.',
      },
      {
        '@type':          'ScholarlyArticle',
        name:             'The decoding/spelling curriculum: Integrating decoding and spelling for a shared literacy foundation',
        author:           { '@type': 'Person', name: 'Henry, M. K.' },
        datePublished:    '1997',
        isPartOf:         { '@type': 'Periodical', name: 'Journal of Adolescent & Adult Literacy', volumeNumber: '40' },
        description:      'About 60% of English text is Latin or Greek in origin; over 90% in science and technology.',
      },
    ],
  }
}

// ── 4. City page schema ───────────────────────────────────────
// Injected on /cities/[city] pages.
// LocalBusiness + EducationalOrganization composite.
// Boosts local SEO for diaspora city searches.
//
// Schema type: EducationalOrganization with locality
// https://schema.org/EducationalOrganization
/**
 * @param {object} city
 * @param {string} city.name      - Display name, e.g. 'Vancouver'
 * @param {string} city.slug      - URL slug, e.g. 'vancouver'
 * @param {string} city.region    - Province/state, e.g. 'British Columbia'
 * @param {string} city.country   - Country name, e.g. 'Canada'
 * @param {string} [city.countryCode] - ISO code, e.g. 'CA'
 * @returns {object} JSON-LD EducationalOrganization object with locality
 */
export function citySchema({ name, slug, region, country, countryCode = 'CA' }) {
  return {
    '@context': 'https://schema.org',
    '@type':    ['EducationalOrganization', 'LocalBusiness'],
    '@id':      `${SITE_URL}/cities/${slug}#organization`,

    name:        `DODO Learning — ${name}`,
    url:         `${SITE_URL}/cities/${slug}`,
    description:
      `DODO Learning serves Chinese-speaking families in ${name}, ${region}. ` +
      `Live, Navigator-led English literacy program for students grades 3–8. ` +
      `Progress measured by Lexile levels and the 6+1 Trait writing framework.`,

    address: {
      '@type':           'PostalAddress',
      addressLocality:   name,
      addressRegion:     region,
      addressCountry:    countryCode,
    },

    areaServed: {
      '@type': 'City',
      name,
      containedIn: { '@type': 'Country', name: country },
    },

    parentOrganization: {
      '@type': 'EducationalOrganization',
      '@id':   `${SITE_URL}/#organization`,
      name:    'DODO Learning',
      url:     SITE_URL,
    },

    contactPoint: {
      '@type':           'ContactPoint',
      contactType:       'admissions',
      url:               `${SITE_URL}/consult`,
      availableLanguage: ['English', 'Chinese'],
    },
  }
}

// ── 5. Blog post / Article schema ─────────────────────────────
// Injected on /blog/[slug] pages.
// Schema type: Article
// https://schema.org/Article
//
// Locale: pass the page's locale so inLanguage emits the correct BCP 47
// tag. ZH posts must declare 'zh-Hans' or LLMs and search engines will
// mis-cluster them with English content.
/**
 * @param {object} post
 * @param {string} post.title
 * @param {string} post.description
 * @param {string} post.slug
 * @param {string} post.publishedAt   - ISO date string
 * @param {string} [post.updatedAt]   - ISO date string
 * @param {string[]} [post.authors]
 * @param {string} [post.ogImage]     - Absolute URL to OG image
 * @param {string} [post.locale]      - 'en' | 'zh'. Defaults to 'en'.
 * @returns {object} JSON-LD Article object
 */
export function articleSchema(post) {
  const locale       = post.locale === 'zh' ? 'zh' : 'en'
  const inLanguage   = locale === 'zh' ? 'zh-Hans' : 'en'
  const localePath   = `/${locale}/blog/${post.slug}`

  return {
    '@context': 'https://schema.org',
    '@type':    'Article',
    '@id':      `${SITE_URL}${localePath}#article`,

    headline:        post.title,
    description:     post.description,
    url:             `${SITE_URL}${localePath}`,
    datePublished:   post.publishedAt,
    dateModified:    post.updatedAt ?? post.publishedAt,

    author: (post.authors ?? ['DODO Learning']).map((name) => ({
      '@type': 'Person',
      name,
    })),

    publisher: {
      '@type': 'EducationalOrganization',
      '@id':   `${SITE_URL}/#organization`,
      name:    'DODO Learning',
      url:     SITE_URL,
    },

    image: post.ogImage
      ? { '@type': 'ImageObject', url: post.ogImage }
      : { '@type': 'ImageObject', url: `${SITE_URL}/og-default.png` },

    inLanguage,
    isPartOf:      { '@type': 'WebSite', url: SITE_URL, name: 'DODO Learning' },
  }
}
