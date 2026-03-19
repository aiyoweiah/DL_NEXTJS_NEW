// app/[locale]/cities/[city]/page.jsx
//
// City landing pages — local diaspora SEO (§13).
// One page per city slug, rendered in EN and ZH.
//
// City slugs (6):
//   vancouver | richmond-bc | markham | toronto |
//   san-francisco-bay-area | los-angeles
//
// Content is hardcoded inline — cities do not use getContent() because
// the content volume per city is small and city-specific. The en.js comment
// explicitly marks: "cities (via citySchema, not a content key)".
//
// Sections (top → bottom):
//   1. Hero          — city-specific h1 + dual CTAs
//   2. ProofStrip    — standard three stats
//   3. LocalContext  — city-specific community paragraph
//   4. LoopSection   — brief Loop summary → links to /methodology
//   5. Structure     — 3-phase program arc, condensed
//   6. CharterCTA    — conversion

import Link from 'next/link'
import { notFound } from 'next/navigation'

import { isValidLocale, LOCALES } from '@/lib/i18n'
import { buildCityMetadata }      from '@/lib/metadata'
import { citySchema }             from '@/lib/schema'

import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge          from '@/components/ui/Badge'
import Button         from '@/components/ui/Button'

// ── City data ─────────────────────────────────────────────────
// Single source of truth for all city slugs, display names, and
// locale-specific copy. Add a new city here and it is automatically
// included in generateStaticParams and the schema.

const CITIES = {
  'vancouver': {
    name:       'Vancouver',
    nameCN:     '温哥华',
    region:     'British Columbia',
    regionCN:   '英属哥伦比亚',
    country:    'Canada',
    countryCode: 'CA',
    en: {
      h1:
        'How do Chinese-speaking families in Vancouver build bilingual thinkers?',
      subheading:
        'Not more tutoring. Not ESL catch-up. A structured 16-week methodology that trains the full cognitive loop — Read, Think, Speak, Write — in English. Measured by Lexile. Led by a Navigator.',
      context:
        'Metro Vancouver is home to one of the largest Chinese-speaking diaspora communities in North America. DODO Learning serves families across the Lower Mainland — students navigating English-language classrooms while Mandarin or Cantonese remains the language of home. We do not treat bilingualism as a gap. We build on it.',
    },
    zh: {
      h1:
        '温哥华的华语家庭，如何培养双语思维者？',
      subheading:
        '不是更多补习，不是ESL追赶。这是一套结构化的16周方法，训练完整的认知循环——阅读、思考、表达、写作——以英语进行，以Lexile衡量，由Navigator主导。',
      context:
        '大温哥华地区拥有北美最大的华语社区之一。DODO Learning服务大温地区的家庭——那些在英语课堂学习、而家中仍以普通话或粤语为主的学生。我们不把双语视为不足，而是以此为基础继续构建。',
    },
  },

  'richmond-bc': {
    name:       'Richmond',
    nameCN:     '列治文',
    region:     'British Columbia',
    regionCN:   '英属哥伦比亚',
    country:    'Canada',
    countryCode: 'CA',
    en: {
      h1:
        'Bilingual thinking for Richmond BC families — English fluency without losing the first language.',
      subheading:
        'Richmond has the highest concentration of Mandarin-speaking families in Canada. DODO Learning is built for exactly this — students who are fluent at home and need to become precise in English.',
      context:
        'Richmond BC is unique in Canada: a community where Chinese is the first language of the majority, and English is the language of school. DODO Learning serves Richmond students who need more than ESL — they need a methodology that treats bilingualism as a cognitive advantage and trains the full loop every week.',
    },
    zh: {
      h1:
        '列治文华语家庭的双语思维——英语流利，母语不失。',
      subheading:
        '列治文是加拿大普通话家庭密度最高的城市。DODO Learning正是为此而设——服务在家流利、需要在英语中变得精准的学生。',
      context:
        '列治文在加拿大独一无二：这是一个中文是多数人母语、英语是学校语言的社区。DODO Learning服务列治文学生，他们需要的不只是ESL——而是一套将双语视为认知优势、每周训练完整循环的方法论。',
    },
  },

  'markham': {
    name:       'Markham',
    nameCN:     '万锦',
    region:     'Ontario',
    regionCN:   '安大略',
    country:    'Canada',
    countryCode: 'CA',
    en: {
      h1:
        'English literacy for Chinese-speaking families in Markham — measured by Lexile, not guesswork.',
      subheading:
        'Markham families want measurable results. DODO Learning delivers exactly that — Lexile scores at entry and exit, 6+1 Trait writing assessments, and a Navigator who knows your child\'s voice.',
      context:
        'Markham has one of the fastest-growing Chinese-speaking communities in the Greater Toronto Area. Students here are academically ambitious, and their families expect specificity. DODO Learning does not offer general improvement — we offer a Lexile trajectory, a named framework, and a 16-week commitment with a documented result.',
    },
    zh: {
      h1:
        '万锦华语家庭的英语读写能力——以Lexile衡量，不靠感觉。',
      subheading:
        '万锦家庭需要可量化的成果。DODO Learning正是如此——入学和结业时的Lexile分数、6+1特质写作评估，以及了解您孩子声音的Navigator。',
      context:
        '万锦是大多伦多地区华语社区增长最快的城市之一。这里的学生学业进取，家长期待具体的成果。DODO Learning不提供笼统的提升——我们提供Lexile进展轨迹、有名有据的框架，以及一项16周的承诺与有记录的结果。',
    },
  },

  'toronto': {
    name:       'Toronto',
    nameCN:     '多伦多',
    region:     'Ontario',
    regionCN:   '安大略',
    country:    'Canada',
    countryCode: 'CA',
    en: {
      h1:
        'Bilingual thinkers built in Toronto — The 16-Week Program for Chinese-speaking families.',
      subheading:
        'Toronto\'s Chinese-speaking diaspora is one of the most academically competitive in Canada. DODO Learning develops the edge that matters — reading precision, written argument, and the ability to think in both languages.',
      context:
        'Toronto is home to one of the largest and most academically ambitious Chinese-speaking communities in North America. Students here compete for top schools in Canada and internationally. DODO Learning exists for this context — not to help students catch up, but to help them build a genuine edge through bilingual thinking at the highest level.',
    },
    zh: {
      h1:
        '多伦多培养的双语思维者——面向华语家庭的16周项目。',
      subheading:
        '多伦多的华语社区是加拿大学业竞争最激烈的之一。DODO Learning培养真正重要的优势——阅读精准度、书面论证能力，以及在两种语言中思考的能力。',
      context:
        '多伦多拥有北美规模最大、学业进取心最强的华语社区之一。这里的学生在竞争加拿大顶尖学校及国际名校。DODO Learning为此而生——不是帮助学生追赶，而是通过最高水平的双语思维训练，帮助他们建立真正的优势。',
    },
  },

  'san-francisco-bay-area': {
    name:       'San Francisco Bay Area',
    nameCN:     '旧金山湾区',
    region:     'California',
    regionCN:   '加利福尼亚',
    country:    'United States',
    countryCode: 'US',
    en: {
      h1:
        'English literacy development for Bay Area Chinese-speaking families — Lexile-measured, Navigator-led.',
      subheading:
        'The Bay Area\'s Chinese-speaking diaspora includes some of the most educationally driven families in the United States. DODO Learning serves students who need more than fluency — they need precision, argument, and measurable growth.',
      context:
        'The San Francisco Bay Area is home to a large and academically high-achieving Chinese-speaking community. Families here understand measurement and expect it. DODO Learning applies the same rigour — Lexile assessment, 6+1 Trait writing framework, and a 16-week program with a documented result. Live sessions run online with a dedicated Navigator across all 16 weeks.',
    },
    zh: {
      h1:
        '湾区华语家庭的英语读写发展——Lexile衡量，Navigator主导。',
      subheading:
        '湾区华语社区汇聚了美国教育意识最强的家庭。DODO Learning服务需要的不只是流利——而是精准、论证能力和可量化成长的学生。',
      context:
        '旧金山湾区拥有规模庞大、学业成就突出的华语社区。这里的家庭理解数据、期待数据。DODO Learning同样如此——Lexile评估、6+1特质写作框架，以及一项有记录结果的16周项目。线上直播课程，整个16周由专属Navigator陪伴。',
    },
  },

  'los-angeles': {
    name:       'Los Angeles',
    nameCN:     '洛杉矶',
    region:     'California',
    regionCN:   '加利福尼亚',
    country:    'United States',
    countryCode: 'US',
    en: {
      h1:
        'Bilingual thinking for Los Angeles Chinese-speaking families — The 16-Week Program.',
      subheading:
        'Los Angeles is one of the largest Chinese-speaking diaspora communities in the US. DODO Learning builds the bilingual thinkers that LA families are raising — students who read above grade level, argue precisely, and write with intention.',
      context:
        'The greater Los Angeles area has a large and diverse Chinese-speaking community spanning the San Gabriel Valley and beyond. Students here are preparing for the US university pathway and need English literacy that goes beyond accent or vocabulary. DODO Learning trains the full cognitive loop — the level of English that gets students into competitive programmes.',
    },
    zh: {
      h1:
        '洛杉矶华语家庭的双语思维——16周项目。',
      subheading:
        '洛杉矶是美国最大的华语社区之一。DODO Learning培养洛杉矶家庭正在塑造的双语思维者——阅读能力超越年级，论证精准，写作有目的。',
      context:
        '大洛杉矶地区拥有覆盖圣盖博谷及更广范围的庞大多元华语社区。这里的学生正在备战美国大学升学，需要的英语读写能力超越口音和词汇。DODO Learning训练完整的认知循环——让学生进入竞争性课程的英语能力。',
    },
  },
}

// ── Static params ─────────────────────────────────────────────
// Returns all 12 combos explicitly — 2 locales × 6 cities.
// Explicit enumeration is required for output: 'export' on both
// Cloudflare Pages and Vercel — do not rely on parent param inheritance.
export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    Object.keys(CITIES).map((city) => ({ locale, city }))
  )
}

// ── Metadata ──────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { locale, city } = await params
  const data = CITIES[city]
  if (!data) return {}
  const cityName = locale === 'zh' ? data.nameCN : data.name
  return buildCityMetadata(city, locale, cityName)
}

// ── Proof stats (same across all city pages) ──────────────────
const PROOF_STATS = {
  en: [
    { number: '1.2', unit: 'grade levels', label: 'average Lexile growth in 16 weeks' },
    { number: '187', unit: 'Lexile points', label: 'average gain across all students' },
    { number: '94%', unit: '',             label: 'of students improved at least one full grade level' },
  ],
  zh: [
    { number: '1.2', unit: '个年级',    label: '16周内平均Lexile阅读提升' },
    { number: '187', unit: 'Lexile分',  label: '所有学生的平均提升' },
    { number: '94%', unit: '',          label: '的学生至少提升了一个完整年级' },
  ],
}

// ── Loop steps (condensed for city pages) ─────────────────────
const LOOP_STEPS = {
  en: [
    { number: '01', label: 'Read',  body: 'Texts selected above the student\'s current Lexile level. Vocabulary depth and reading stamina built intentionally.' },
    { number: '02', label: 'Think', body: 'A position is formed before speaking. Both language registers — English and mother tongue — are activated.' },
    { number: '03', label: 'Speak', body: 'Live Socratic exchange with the Navigator. Clarity of thinking in English — not performance, not correction.' },
    { number: '04', label: 'Write', body: 'Thinking committed to the page. Assessed using the 6+1 Trait framework — the same rubric used in Canadian and US classrooms.' },
  ],
  zh: [
    { number: '01', label: '阅读', body: '文本有意选在学生当前Lexile水平之上，刻意培养词汇深度与阅读耐力。' },
    { number: '02', label: '思考', body: '在表达之前先形成观点，同时激活两种语言思维——英语与母语。' },
    { number: '03', label: '表达', body: '与Navigator进行实时苏格拉底式对话，追求英语思维的清晰度，而非表演或纠错。' },
    { number: '04', label: '写作', body: '将思考落实于纸面，以6+1特质框架评估——与加拿大和美国课堂使用的评分标准完全相同。' },
  ],
}

// ── Program phases (condensed) ────────────────────────────────
const PHASES = {
  en: [
    { week: 'Week 1',  label: 'Entrance Assessment', body: 'Lexile baseline and 6+1 Trait writing snapshot. We find out exactly where your child is — not where their school says they are.' },
    { week: 'Week 8',  label: 'Midpoint Check-In',   body: 'Navigator review of Lexile trajectory and writing trait scores. Written progress note to the family. Plan adjusted if needed.' },
    { week: 'Week 16', label: 'Exit Assessment',      body: 'Full Lexile re-measure and 6+1 Trait re-evaluation. Growth is quantified, visible, and documented.' },
  ],
  zh: [
    { week: '第1周',  label: '入学评估', body: 'Lexile基线与6+1特质写作快照。我们确切了解您孩子的水平——而非学校报告所呈现的。' },
    { week: '第8周',  label: '中期检查', body: 'Navigator审查Lexile进展与写作特质分数，向家庭发送书面进度说明，并按需调整计划。' },
    { week: '第16周', label: '结业评估', body: '完整的Lexile重测与6+1特质重评，成长被量化、可见、有据可查。' },
  ],
}

// ── UI copy ───────────────────────────────────────────────────
const UI = {
  en: {
    badge:            'The 16-Week Program',
    ctaPrimary:       'Book Your Consultation',
    ctaSecondary:     'See The Program',
    contextEyebrow:   'Serving This Community',
    loopEyebrow:      'The Methodology',
    loopHeading:      'The Loop runs in every session.',
    loopBody:         'Most English programs drill one skill in isolation. DODO trains the full cognitive sequence — because thinking in a language and performing in a language are not the same thing.',
    loopCta:          'Read the full methodology →',
    structureEyebrow: 'Program Structure',
    structureHeading: 'A beginning, a midpoint, and a measured end.',
    structureBody:    'The 16-Week Program is a commitment — not a subscription. It has a defined arc with three anchor points.',
    charterEyebrow:   'Charter Enrollment',
    charterHeading:   'Charter families believe in DODO early.',
    charterBody:      'Charter Enrollment is for families who commit to the full 16-Week Program at the founding rate. Not a promotional price. A reward for foresight — available now.',
    charterCta:       'Reserve Your Charter Spot',
    charterNote:      'Charter spots are limited per cohort. Consultation required before enrollment.',
  },
  zh: {
    badge:            '16周项目',
    ctaPrimary:       '预约咨询',
    ctaSecondary:     '了解项目',
    contextEyebrow:   '服务本地社区',
    loopEyebrow:      '教学方法',
    loopHeading:      'The Loop贯穿每一节课。',
    loopBody:         '大多数英语项目单独训练某一技能。DODO训练完整的认知序列——因为用一种语言思考和用一种语言表现并不是同一件事。',
    loopCta:          '阅读完整方法论 →',
    structureEyebrow: '项目结构',
    structureHeading: '有开始，有中点，有量化的结局。',
    structureBody:    '16周项目是一项承诺，而非订阅。它有明确的轨迹，三个锚点帮助学生和家庭保持方向感。',
    charterEyebrow:   'Charter Enrollment',
    charterHeading:   'Charter家庭是DODO最早的信任者。',
    charterBody:      'Charter Enrollment适合以创始价格承诺完整16周项目的家庭。这不是优惠价格，而是对远见的奖励——现在开放。',
    charterCta:       '预留您的Charter名额',
    charterNote:      '每期名额有限，报名前需完成咨询。',
  },
}

// ── Page ──────────────────────────────────────────────────────
export default async function CityPage({ params }) {
  const { locale, city } = await params

  if (!isValidLocale(locale)) notFound()

  const data = CITIES[city]
  if (!data) notFound()

  const copy    = data[locale] ?? data.en
  const ui      = UI[locale]  ?? UI.en
  const stats   = PROOF_STATS[locale]  ?? PROOF_STATS.en
  const steps   = LOOP_STEPS[locale]   ?? LOOP_STEPS.en
  const phases  = PHASES[locale]       ?? PHASES.en
  const cityName = locale === 'zh' ? data.nameCN : data.name

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            citySchema({
              name:        data.name,
              slug:        city,
              region:      data.region,
              country:     data.country,
              countryCode: data.countryCode,
            })
          ),
        }}
      />

      {/* ── 1. Hero ──────────────────────────────────────── */}
      <SectionWrapper hero>
        <div className="py-24 md:py-32 max-w-3xl">

          <Badge className="mb-6">{ui.badge}</Badge>

          <h1
            id="city-heading"
            className="mb-6"
          >
            {copy.h1}
          </h1>

          <p className="mb-10 text-lg md:text-xl leading-relaxed max-w-2xl">
            {copy.subheading}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}/consult`}
              className="btn btn-charter text-base px-8 py-4 justify-center"
            >
              {ui.ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/program`}
              className="btn btn-secondary text-base px-8 py-4 justify-center"
            >
              {ui.ctaSecondary}
            </Link>
          </div>

        </div>
      </SectionWrapper>

      {/* ── 2. ProofStrip ────────────────────────────────── */}
      <div className="proof-strip">
        <div className="container-section">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 py-12">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-start sm:items-center sm:text-center">
                <p className="proof-stat-number" aria-label={`${stat.number} ${stat.unit}`}>
                  {stat.number}
                  {stat.unit && (
                    <span className="ml-1.5 text-xl font-medium" style={{ color: 'rgba(183,181,254,0.7)' }}>
                      {stat.unit}
                    </span>
                  )}
                </p>
                <p className="proof-stat-label mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Local Context ─────────────────────────────── */}
      <SectionWrapper white>
        <div className="py-16 md:py-20 max-w-3xl">
          <p className="eyebrow mb-4">{ui.contextEyebrow} — {cityName}</p>
          <p className="text-lg leading-relaxed" style={{ color: '#3D4452' }}>
            {copy.context}
          </p>
        </div>
      </SectionWrapper>

      {/* ── 4. Loop Section ──────────────────────────────── */}
      <SectionWrapper dark>
        <div className="py-16 md:py-20">

          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">{ui.loopEyebrow}</p>
            <h2 className="mb-5">{ui.loopHeading}</h2>
            <p className="text-lg leading-relaxed" style={{ color: '#94A3B8' }}>
              {ui.loopBody}
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
            role="list"
            aria-label="The Loop — Read, Think, Speak, Write"
          >
            {steps.map((step) => (
              <div
                key={step.number}
                role="listitem"
                className="flex flex-col gap-3"
                style={{
                  background:   'rgba(183,181,254,0.05)',
                  border:       '1px solid rgba(183,181,254,0.12)',
                  borderRadius: '0.875rem',
                  padding:      '1.5rem',
                }}
              >
                <div className="loop-step-number" aria-hidden="true">
                  {step.number}
                </div>
                <p
                  className="font-semibold text-sm uppercase tracking-widest"
                  style={{ color: '#b7b5fe' }}
                >
                  {step.label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          <Link
            href={`/${locale}/methodology`}
            className="text-sm font-semibold"
            style={{ color: '#b7b5fe' }}
          >
            {ui.loopCta}
          </Link>

        </div>
      </SectionWrapper>

      {/* ── 5. Structure ─────────────────────────────────── */}
      <SectionWrapper>
        <div className="py-16 md:py-20">

          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-4">{ui.structureEyebrow}</p>
            <h2 className="mb-5">{ui.structureHeading}</h2>
            <p className="text-lg leading-relaxed">{ui.structureBody}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {phases.map((phase, i) => (
              <div
                key={i}
                className="card card-light accent-top p-7 flex flex-col gap-3"
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: '#b7b5fe' }}
                >
                  {phase.week}
                </p>
                <h3 className="text-lg font-semibold" style={{ color: '#0E0E12' }}>
                  {phase.label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#3D4452' }}>
                  {phase.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </SectionWrapper>

      {/* ── 6. Charter CTA ───────────────────────────────── */}
      <SectionWrapper darker>
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-10"
          style={{ paddingTop: 'var(--section-md)', paddingBottom: 'var(--section-md)' }}
        >
          <div className="max-w-xl">
            <p className="eyebrow mb-4" style={{ color: 'rgba(183,181,254,0.6)' }}>
              {ui.charterEyebrow}
            </p>
            <h2 className="mb-5">{ui.charterHeading}</h2>
            <p className="text-lg leading-relaxed mb-4" style={{ color: '#94A3B8' }}>
              {ui.charterBody}
            </p>
            <p className="text-sm" style={{ color: 'rgba(183,181,254,0.45)' }}>
              {ui.charterNote}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href={`/${locale}/consult`}
              className="btn btn-charter text-base px-8 py-4 justify-center"
            >
              {ui.charterCta}
            </Link>
          </div>
        </div>
      </SectionWrapper>

    </>
  )
}