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
      'Live, Navigator-led English literacy program for globally mobile ' +
      'Chinese-speaking families. The 16-Week Program develops students who ' +
      'read, think, speak, and write in English — measured by Lexile levels ' +
      'and the 6+1 Trait writing framework.',

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
      'DODO Learning is a live, Navigator-led English literacy program for ' +
      'globally mobile Chinese-speaking families in Canada and the United States. ' +
      'The 16-Week Program develops students who read, think, speak, and write ' +
      'in English through The Loop methodology, with progress measured by ' +
      'Lexile levels and the 6+1 Trait writing framework.',

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
      // US — Pacific
      { '@type': 'City', name: 'San Francisco Bay Area', containedIn: { '@type': 'Country', name: 'United States' } },
      { '@type': 'City', name: 'San Jose',               containedIn: { '@type': 'Country', name: 'United States' } },
      { '@type': 'City', name: 'Cupertino',              containedIn: { '@type': 'Country', name: 'United States' } },
      { '@type': 'City', name: 'Los Angeles',            containedIn: { '@type': 'Country', name: 'United States' } },
      { '@type': 'City', name: 'Irvine',                 containedIn: { '@type': 'Country', name: 'United States' } },
      { '@type': 'City', name: 'Bellevue',               containedIn: { '@type': 'Country', name: 'United States' } },
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
      audienceType:    'Bilingual students grades 3–8, Chinese-speaking diaspora families',
    },

    // Contact
    contactPoint: {
      '@type':           'ContactPoint',
      contactType:       'admissions',
      url:               `${SITE_URL}/consult`,
      availableLanguage: ['English', 'Chinese'],
    },

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

    name:        'The 16-Week Bilingual Thinking Program',
    description:
      'The DODO Learning 16-Week Program is a live, Navigator-led English literacy ' +
      'development program for Chinese-speaking students in grades 3–8. ' +
      'Students progress through The Loop — Read, Think, Speak, Write — in weekly ' +
      'live sessions with a dedicated Navigator. Progress is measured at entry and ' +
      'exit using Lexile level assessments and the 6+1 Trait writing framework. ' +
      'Students typically advance one full grade level in reading within 16 weeks. ' +
      'The program serves globally mobile Chinese-speaking diaspora families ' +
      'across Metro Vancouver, the Greater Toronto Area, Calgary, the San Francisco ' +
      'Bay Area, Greater Los Angeles, Orange County, Seattle/Bellevue, New York, ' +
      'Boston, and Houston.',

    url:          `${SITE_URL}/program`,
    inLanguage:   'en',
    timeRequired: 'P16W', // ISO 8601 duration — 16 weeks

    // Audience
    audience: {
      '@type':         'EducationalAudience',
      educationalRole: 'student',
      audienceType:    'Students grades 3–8 from Chinese-speaking diaspora families',
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

    // Offers — Charter Enrollment
    // Price is intentionally omitted; consultation is the entry point
    offers: {
      '@type':       'Offer',
      name:          'Charter Enrollment',
      description:   'Founding family enrollment rate for the 16-week program. ' +
                     'Includes entry assessment, 16 weekly Navigator-led sessions, ' +
                     'and exit assessment with written progress report.',
      url:           `${SITE_URL}/enroll`,
      availability:  'https://schema.org/LimitedAvailability',
      validFrom:     new Date().toISOString().split('T')[0], // today's date at build time
    },
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
