// Content audit — Pass A (EN/ZH key parity) + Pass B (anti-dictionary scan).
// Run from DL_NEXTJS_NEW: node scripts/content-audit.mjs

import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const ROOT = resolve(process.cwd())
const glossary = JSON.parse(
  readFileSync(resolve(ROOT, 'translation/dodo-glossary.json'), 'utf8'),
)

// ── helpers ─────────────────────────────────────────────────────────
function walkKeys(obj, prefix = '', out = []) {
  if (obj == null) return out
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => walkKeys(v, `${prefix}[${i}]`, out))
    return out
  }
  if (typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      const path = prefix ? `${prefix}.${k}` : k
      out.push(path)
      walkKeys(obj[k], path, out)
    }
  }
  return out
}

function walkStrings(obj, prefix = '', out = []) {
  if (obj == null) return out
  if (typeof obj === 'string') {
    out.push({ path: prefix, value: obj })
    return out
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => walkStrings(v, `${prefix}[${i}]`, out))
    return out
  }
  if (typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      const path = prefix ? `${prefix}.${k}` : k
      walkStrings(obj[k], path, out)
    }
  }
  return out
}

// ── load content modules ────────────────────────────────────────────
async function load(rel) {
  return await import(pathToFileURL(resolve(ROOT, rel)).href)
}

const en = await load('content/marketing.en.js')
const zh = await load('content/marketing.zh.js')
const faq = await load('content/faq.js')
const cities = await load('content/cities.js')

// ════════════════════════════════════════════════════════════════════
// PASS A — EN/ZH key parity
// ════════════════════════════════════════════════════════════════════
console.log('━'.repeat(72))
console.log('PASS A · EN/ZH key parity (marketing.en.js vs marketing.zh.js)')
console.log('━'.repeat(72))

const enExports = Object.keys(en).filter((k) => k !== 'default')
const zhExports = Object.keys(zh).filter((k) => k !== 'default')

const onlyEn = enExports.filter((k) => !zhExports.includes(k))
const onlyZh = zhExports.filter((k) => !enExports.includes(k))
console.log(`\nExports only in EN: ${onlyEn.length ? onlyEn.join(', ') : 'none'}`)
console.log(`Exports only in ZH: ${onlyZh.length ? onlyZh.join(', ') : 'none'}`)

const sharedExports = enExports.filter((k) => zhExports.includes(k))

let totalMissingZh = 0
let totalMissingEn = 0
for (const exp of sharedExports) {
  const enKeys = new Set(walkKeys(en[exp]))
  const zhKeys = new Set(walkKeys(zh[exp]))
  const missingInZh = [...enKeys].filter((k) => !zhKeys.has(k))
  const missingInEn = [...zhKeys].filter((k) => !enKeys.has(k))
  if (missingInZh.length || missingInEn.length) {
    console.log(`\n  ${exp}:`)
    if (missingInZh.length) {
      console.log(`    missing in ZH (${missingInZh.length}):`)
      missingInZh.slice(0, 12).forEach((k) => console.log(`      - ${k}`))
      if (missingInZh.length > 12) console.log(`      … +${missingInZh.length - 12} more`)
    }
    if (missingInEn.length) {
      console.log(`    extra in ZH / missing in EN (${missingInEn.length}):`)
      missingInEn.slice(0, 12).forEach((k) => console.log(`      - ${k}`))
      if (missingInEn.length > 12) console.log(`      … +${missingInEn.length - 12} more`)
    }
    totalMissingZh += missingInZh.length
    totalMissingEn += missingInEn.length
  }
}
if (totalMissingZh === 0 && totalMissingEn === 0) {
  console.log('\n  ✓ All keys aligned across shared exports.')
}

// faq.js — already bilingual within one file; check shape
console.log('\n  faq.js shape:')
const faqMod = faq.default || faq
for (const k of Object.keys(faqMod).filter((k) => k !== 'default')) {
  console.log(`    export "${k}" — ${typeof faqMod[k] === 'object' ? 'object' : typeof faqMod[k]}`)
}

console.log('\n  cities.js shape:')
const citiesMod = cities.default || cities
for (const k of Object.keys(citiesMod).filter((k) => k !== 'default')) {
  console.log(`    export "${k}" — ${typeof citiesMod[k] === 'object' ? 'object' : typeof citiesMod[k]}`)
}

// ════════════════════════════════════════════════════════════════════
// PASS B — Anti-dictionary + glossary scan
// ════════════════════════════════════════════════════════════════════
console.log('\n' + '━'.repeat(72))
console.log('PASS B · Anti-dictionary + glossary compliance')
console.log('━'.repeat(72))

const forbiddenZh = glossary.forbidden_zh_words
// EN anti-dictionary derived from BRAND_CONTENT_GUIDE.md §10
const forbiddenEn = [
  { phrase: /\benglish tutoring\b/i, why: 'Positions DODO as remedial' },
  { phrase: /\bESL\b/, why: 'Deficit language' },
  { phrase: /\bEFL\b/, why: 'Deficit language' },
  { phrase: /\baffordable\b/i, why: 'Destroys price anchor' },
  { phrase: /\bdiscounted\b/i, why: 'Destroys price anchor' },
  { phrase: /charter enrollment/i, why: 'Use "Founding Family Program"' },
  { phrase: /\bnative[- ]speaker teachers?\b/i, why: 'Table stakes — says nothing' },
  { phrase: /\bnative[- ]speaking teachers?\b/i, why: 'Table stakes — says nothing' },
  { phrase: /\bcritical thinking\b/i, why: 'Most overused phrase in education' },
  { phrase: /\bwe (use|teach) MCT\b/i, why: 'Product-resale framing' },
  { phrase: /\bour MCT course\b/i, why: 'Product-resale framing' },
  { phrase: /\bcatch up\b/i, why: 'Deficit framing' },
  { phrase: /don'?t worry about chinese/i, why: 'Dismissive — reframe' },
  { phrase: /\bsupplement\b/i, why: 'Dependent framing' },
  { phrase: /\bbilingual thinkers?\b/i, why: 'Retired — use "English Thinker"' },
  { phrase: /think twice/i, why: 'Source typo — never appear' },
  { phrase: /\bthe hangar\b/i, why: 'Removed from program (2026-04)' },
]

// Glossary terms that should appear with their canonical ZH (informational, not error)
const ownedTerms = glossary.owned_terms

function scanStrings(label, strings, locale) {
  const hits = []
  for (const { path, value } of strings) {
    if (locale === 'zh') {
      for (const word of forbiddenZh) {
        if (value.includes(word)) hits.push({ path, value, hit: word, why: 'glossary.forbidden_zh_words' })
      }
    } else {
      for (const { phrase, why } of forbiddenEn) {
        const m = value.match(phrase)
        if (m) hits.push({ path, value, hit: m[0], why })
      }
    }
  }
  console.log(`\n  ${label} (${strings.length} strings) — ${hits.length} hit${hits.length === 1 ? '' : 's'}`)
  for (const h of hits) {
    console.log(`    [${h.hit}] ${h.why}`)
    console.log(`      at ${h.path}`)
    const snippet = h.value.length > 120 ? h.value.slice(0, 117) + '…' : h.value
    console.log(`      "${snippet}"`)
  }
  return hits.length
}

let totalHits = 0
for (const exp of enExports) {
  totalHits += scanStrings(`marketing.en :: ${exp}`, walkStrings(en[exp]), 'en')
}
for (const exp of zhExports) {
  totalHits += scanStrings(`marketing.zh :: ${exp}`, walkStrings(zh[exp]), 'zh')
}

// faq.js — strings keyed by locale within objects; scan by detecting CJK
const faqStrings = walkStrings(faqMod)
const faqEn = faqStrings.filter((s) => !/[一-鿿]/.test(s.value))
const faqZh = faqStrings.filter((s) => /[一-鿿]/.test(s.value))
totalHits += scanStrings('faq.js (EN strings)', faqEn, 'en')
totalHits += scanStrings('faq.js (ZH strings)', faqZh, 'zh')

const cityStrings = walkStrings(citiesMod)
const cityEn = cityStrings.filter((s) => !/[一-鿿]/.test(s.value))
const cityZh = cityStrings.filter((s) => /[一-鿿]/.test(s.value))
totalHits += scanStrings('cities.js (EN strings)', cityEn, 'en')
totalHits += scanStrings('cities.js (ZH strings)', cityZh, 'zh')

// llms.txt files
for (const file of ['public/llms.txt', 'public/llms-full.txt']) {
  const text = readFileSync(resolve(ROOT, file), 'utf8')
  const lines = text.split('\n').map((line, i) => ({ path: `${file}:${i + 1}`, value: line }))
  totalHits += scanStrings(file, lines, 'en')
}

console.log('\n' + '━'.repeat(72))
console.log(`SUMMARY · parity gaps: ${totalMissingZh + totalMissingEn} · anti-dictionary hits: ${totalHits}`)
console.log('━'.repeat(72))
