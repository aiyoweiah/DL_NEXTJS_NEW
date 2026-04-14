// app/[locale]/compare/page.jsx
//
// Pure server component — no 'use client', zero external dependencies.
// Bilingual EN + ZH — all text driven from COPY object below.
//
// BACKGROUND UPDATE — April 13 2026
//   Hero bg: compare-desk-bg.webp (stormy lake with glowing island, watercolor)
//   objectPosition: 'center 42%' — frames island + water + storm sky
//   Upgraded to 4-stop directional overlay + bottom vignette + teal radial accent
//   (same treatment as program / methodology / results / navigators / about)

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const meta = (COPY[locale] ?? COPY.en).meta
  return buildMetadata({ locale, title: meta.title, description: meta.description, path: '/compare' })
}

function Eyebrow({ children, center = false, dark = false }) {
  return (
    <div style={{ fontFamily: 'var(--font-latin)', fontWeight: 500, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: dark ? '#b7b5fe' : '#5856cc', marginBottom: '16px', textAlign: center ? 'center' : undefined }}>
      {children}
    </div>
  )
}

function StudentVoiceCard({ quote, grade, city, weeksInProgram, hangarDetail }) {
  return (
    <div className="rounded-2xl" style={{ backgroundColor: '#2E3848', border: '1px solid rgba(183,181,254,0.10)', padding: '32px' }}>
      <div aria-hidden="true" style={{ fontFamily: 'var(--font-latin)', fontSize: '48px', fontWeight: 700, color: '#b7b5fe', opacity: 0.25, lineHeight: 1, marginBottom: '12px' }}>&ldquo;</div>
      <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 300, fontSize: '16px', fontStyle: 'italic', color: '#F0F0F0', lineHeight: 1.7, marginBottom: '24px' }}>{quote}</p>
      <div className="flex items-center gap-2" style={{ fontFamily: 'var(--font-latin)', fontSize: '13px', fontWeight: 600, color: '#b7b5fe', marginBottom: '8px' }}>
        <span>{grade}</span><span style={{ opacity: 0.4 }}>·</span><span>{city}</span><span style={{ opacity: 0.4 }}>·</span>
        <span style={{ fontWeight: 400, color: 'rgba(240,240,240,0.5)' }}>{weeksInProgram}</span>
      </div>
      {hangarDetail && <p style={{ fontFamily: 'var(--font-latin)', fontSize: '12px', fontWeight: 400, fontStyle: 'italic', color: 'rgba(183,181,254,0.45)', lineHeight: 1.5 }}>{hangarDetail}</p>}
    </div>
  )
}

function LoopDiagram({ locale = 'en' }) {
  return (
    <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: '1 / 1' }}>
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" aria-label="The Loop: Read, Think, Speak, Write" role="img">
        <circle cx="200" cy="200" r="160" stroke="#b7b5fe" strokeWidth="1.5" opacity="0.2" />
        <circle cx="200" cy="200" r="145" stroke="#b7b5fe" strokeWidth="0.5" opacity="0.08" />
        <path d="M200 40 A160 160 0 0 1 360 200"  stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M360 200 A160 160 0 0 1 200 360" stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M200 360 A160 160 0 0 1 40 200"  stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <path d="M40 200 A160 160 0 0 1 200 40"   stroke="#b7b5fe" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
        <circle cx="200" cy="40"  r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="200" y="37"  textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">READ</text>
        {locale === 'zh' && <text x="200" y="53" textAnchor="middle" fill="#0E0E12" fontSize="9" opacity="0.4" fontFamily="Noto Sans SC, sans-serif">阅读</text>}
        <circle cx="360" cy="200" r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="360" y="197" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">THINK</text>
        {locale === 'zh' && <text x="360" y="213" textAnchor="middle" fill="#0E0E12" fontSize="9" opacity="0.4" fontFamily="Noto Sans SC, sans-serif">思考</text>}
        <circle cx="200" cy="360" r="36" fill="#F5F5FF" stroke="#F5C842" strokeWidth="2" />
        <text x="200" y="357" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">SPEAK</text>
        {locale === 'zh' && <text x="200" y="373" textAnchor="middle" fill="#0E0E12" fontSize="9" opacity="0.4" fontFamily="Noto Sans SC, sans-serif">表达</text>}
        <circle cx="40"  cy="200" r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="40"  y="197" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">WRITE</text>
        {locale === 'zh' && <text x="40"  y="213" textAnchor="middle" fill="#0E0E12" fontSize="9" opacity="0.4" fontFamily="Noto Sans SC, sans-serif">写作</text>}
        <text x="200" y="193" textAnchor="middle" fill="#0E0E12" fontSize="13" fontWeight="700" fontFamily="DM Sans, sans-serif" opacity="0.6">THE LOOP</text>
        {locale === 'zh' && <text x="200" y="210" textAnchor="middle" fill="#b7b5fe" fontSize="10" fontFamily="Noto Sans SC, sans-serif" opacity="0.5">学习闭环</text>}
      </svg>
    </div>
  )
}

const BG = { dark: '#212830', 'void-black': '#0E0E12', whisper: '#F5F5FF' }
function Section({ bg = 'dark', className = '', children, id }) {
  return (
    <section id={id} className={`px-6 py-24 md:py-32 ${className}`} style={{ backgroundColor: BG[bg] }}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}

const COPY = {
  en: {
    meta: {
      title:       'Why DODO Learning — How It Differs From Tutoring, ESL, and Test-Prep | DODO Learning',
      description: 'DODO Learning is a cognitive development program for Chinese immigrant families in Canada and the US — not a tutoring centre, not an ESL program, not test-prep. Here is exactly what makes it structurally different, and why that difference compounds over 16 weeks.',
    },
    s1: {
      eyebrow: 'Why DODO Learning',
      h1a: 'Every English program promises\u00a0', h1b: 'progress.', h1c: '\u00a0One of them builds the thinker.',
      sub: 'For Chinese immigrant families in Canada and the US — this is what makes DODO Learning structurally different from every other option available to your child.',
    },
    s2: { pull: 'Most programs teach your child to answer the question correctly.\u00a0', pullSpan: 'DODO Learning trains them to ask a better one.', pullEnd: '' },
    s3: {
      eyebrow: 'The Category Difference',
      h2: 'Three comparisons that clarify what DODO Learning actually is.',
      cols: [
        { question: 'vs. Tutoring centres & ESL programs', title: 'Cognitive development\u00a0— not language practice', body: 'Tutoring centres fix homework. ESL programs build conversational fluency. DODO Learning develops the reasoning architecture that makes your child capable of reading dense analytical prose, arguing a position with textual evidence, and writing with precision. Different category. Different outcome.' },
        { question: 'vs. Grade-level school support', title: 'Mastery standard\u00a0— not grade compliance', body: 'School English is calibrated to the average. DODO Learning\u2019s program is grounded in the principles of the MCT Language Arts framework\u00a0\u2014 one of the most rigorous classical ELA programs in North America, built for students capable of genuine mastery. Your child is measured against their own Lexile ceiling, not a classroom mean.' },
        { question: 'vs. Test-prep companies', title: 'A 16-week arc\u00a0— not a score for next month', body: 'Test-prep optimises for a single exam window. The 16-Week Program builds the cognitive capacity that produces strong results as a natural byproduct\u00a0\u2014 because a student who can read complexity, synthesise evidence, and write with intention will perform on any assessment they face.' },
      ],
    },
    s4: {
      eyebrow: 'The Methodology', h2: 'What separates DODO Learning is not the curriculum. It\u2019s The Loop.',
      caption: 'Read \u2192 Think \u2192 Speak \u2192 Write. Every session follows this exact sequence. Every stage is assessed. The Loop is not a teaching method\u00a0\u2014 it is a compounding system. A student who runs The Loop with a Navigator across 16 weeks does not simply improve their English. They rebuild how they process complexity. That is the difference that becomes visible a decade later.',
      methodologyLink: 'Read the full methodology \u2192',
    },
    s5: { eyebrow: 'From the Founder', h2: 'Why we built DODO Learning\u00a0\u2014 and what we decided we would never become.', sub: 'Unscripted. Eight minutes. The decision in full.', founderName: 'Sarah Chen \u2014 Founder & Lead Navigator', founderNote: 'Video embed \u2014 replace with production URL' },
    s6: {
      eyebrow: 'The Navigator Difference', h2: 'A Navigator is not a tutor. Here is exactly what that means.',
      points: [
        { label: 'Longitudinal knowledge', body: 'A session-by-session tutor meets your child fresh each time. A Navigator carries the full arc\u00a0\u2014 your child\u2019s Lexile baseline, their 6+1 Trait profile from week one, the specific sentence from three sessions ago that still needs to move. That context compounds. The insight it produces cannot be replicated in a one-off session.' },
        { label: 'A better question\u00a0\u2014 not a faster answer', body: 'The Navigator\u2019s first move after your child responds is always a follow-up question\u00a0\u2014 never an evaluation. This is the structural difference between developing a thinker and training a responder. One builds capacity. The other builds dependence.' },
        { label: 'Calibrated feedback\u00a0\u2014 not general praise', body: 'Every Navigator response references a specific 6+1 Trait, a specific score, and a specific next move. Not \u201cgood job\u201d\u00a0\u2014 \u201cyour Ideas trait moved from a 2 to a 3 because of this sentence. A 4 requires this.\u201d Your child always knows exactly where they are and what a higher score requires of them.' },
        { label: 'One Navigator. The full 16-week arc.', body: 'Your child\u2019s Navigator is with them from initial Lexile assessment to final 6+1 Trait evaluation. One relationship. One standard. One set of eyes on every draft, every oral defence, every argument. The relationship itself is part of the program.' },
      ],
      navigatorsLink: 'Meet the Navigators \u2192',
    },
    s7: {
      eyebrow: 'What Progress Looks Like Here', h2: 'Measurable, specific, and felt\u00a0\u2014 versus everywhere else.',
      cols: [
        { num: '01', title: 'Lexile\u00a0\u2014 not letter grades', body: 'Lexile 620 to Lexile 790 in 16 weeks is a verifiable fact. A letter grade is a school\u2019s assessment of compliance against a class average. DODO Learning measures reading complexity\u00a0\u2014 the actual cognitive demand of the texts your child can independently handle\u00a0\u2014 at entry, at the midpoint, and at completion.' },
        { num: '02', title: '6+1 Traits\u00a0\u2014 not impressions', body: 'Writing is scored across seven specific traits: Ideas, Organization, Voice, Word Choice, Sentence Fluency, Conventions, Presentation. Your child knows which trait moved, by how much, and exactly what a higher score requires. Progress is never vague here.' },
        { num: '03', title: 'A committed arc\u00a0\u2014 not rolling enrolment', body: 'The 16-Week Program has a beginning, a measurable midpoint, and a confirmed result. Not a monthly subscription. Not open enrolment. A structure\u00a0\u2014 because compounding only works when the work is continuous and the Navigator\u2019s knowledge accumulates.' },
      ],
    },
    s8: {
      eyebrow: 'In Their Words', h2: 'Students who came from somewhere else\u00a0\u2014 and what changed.',
      voices: [
        { quote: 'I did three years of English tutoring before this. I could answer the reading comprehension questions but I couldn\u2019t actually tell you what the chapter meant or why it mattered. The first time my Navigator asked me to defend my interpretation, I had nothing. Sixteen weeks later I could argue for two pages.', grade: 'Grade 7', city: 'Calgary', weeks: '16-week program, completed', detail: 'Lexile 590 \u2192 780 \u00b7 6+1 Ideas: 1 \u2192 4 \u00b7 6+1 Organization: 2 \u2192 4 \u00b7 Entered from two-year tutoring programme' },
        { quote: 'My parents tried two ESL programs before DODO Learning. My English got more fluent but I still couldn\u2019t write an essay that said anything. Here the Navigator made me re-write the same paragraph six times. Each time I understood something I hadn\u2019t before. That\u2019s a different kind of work.', grade: 'Grade 6', city: 'Vancouver', weeks: '16-week program, week 14', detail: 'Lexile 610 \u2192 760 at week 14 \u00b7 6+1 Voice: 1 \u2192 3 \u00b7 6+1 Word Choice: 2 \u2192 4 \u00b7 Previously enrolled in two ESL providers' },
      ],
    },
    s9: {
      h2: 'The Lexile assessment is where we find out if DODO Learning is the right fit for your child.',
      sub: 'Every enrollment begins with a free Lexile reading assessment\u00a0\u2014 no commitment, no pressure. A precise starting point, because meaningful progress requires one.',
      ctaPrimary: 'Book a Free Lexile Assessment', ctaSecondary: 'See the Full Program',
      note: 'The assessment is free. The 16-Week Program begins with a confirmed Lexile baseline.',
    },
  },

  zh: {
    meta: {
      title: 'DODO Learning有什么不同——与辅导班、ESL和应试培训的本质区别 | 都学书院',
      description: 'DODO Learning不是英文辅导班，不是ESL项目，不是应试培训。这是一个面向加拿大和美国华人家庭的英语认知发展项目。这里解释它在结构上的不同，以及这种差异如何在16周内形成复利。',
    },
    s1: {
      eyebrow: '为什么是DODO Learning',
      h1a: '每一个英语项目都承诺\u00a0', h1b: '进步。', h1c: '\u00a0其中一个培养真正的思考者。',
      sub: '面向加拿大和美国的华人家庭——这是DODO Learning在结构上与您孩子所能接触到的其他所有选择的根本区别。',
    },
    s2: { pull: '大多数项目教孩子如何正确回答问题。\u00a0', pullSpan: 'DODO Learning训练他们提出更好的问题。', pullEnd: '' },
    s3: {
      eyebrow: '类别差异', h2: '三组对比，说清楚DODO Learning究竟是什么。',
      cols: [
        { question: '对比辅导班和ESL项目', title: '认知发展\u00a0——\u00a0不是语言练习', body: '辅导班解决当天的作业。ESL项目建立日常会话流利度。DODO Learning构建的是推理架构——让孩子能够阅读密度较高的分析性文章、用文本证据为观点辩护、以精准语言完成写作。这是不同的类别，也是不同的结果。' },
        { question: '对比年级水平的学校支持', title: '掌握标准\u00a0——\u00a0不是年级合规', body: '学校英语以平均水平为基准。DODO Learning的课程以MCT语言艺术框架的理念为核心参照——北美最严格的经典ELA课程之一，专为有能力真正掌握语言的学生设计。孩子以自身的Lexile上限为衡量标准，而非班级平均值。' },
        { question: '对比应试培训机构', title: '16周完整弧线\u00a0——\u00a0不是下个月的分数', body: '应试培训为单次考试窗口优化。16周项目构建的认知能力，会自然产生优异的考试成绩——因为一个能读懂复杂文本、综合证据、有意图地写作的学生，面对任何考核都能表现出色。' },
      ],
    },
    s4: {
      eyebrow: '教学方法', h2: '区分DODO Learning的不是课程内容。是The Loop。',
      caption: '阅读 → 思考 → 表达 → 写作。每一节课都遵循这个确切的顺序。每个阶段都有评估。The Loop不是一种教学方法——它是一个复利系统。一个与Navigator共同完成16周The Loop的学生，不只是英语有所提升。他们重建了处理复杂性的方式。这种差异，十年后才真正显现。',
      methodologyLink: '阅读完整教学方法 →',
    },
    s5: { eyebrow: '创始人说', h2: '我们为什么创立DODO Learning\u00a0——\u00a0以及我们决定永远不会成为什么。', sub: '无脚本。八分钟。完整阐述这个决定。', founderName: 'Sarah Chen — 创始人 & 首席Navigator', founderNote: '视频链接——请替换为正式URL' },
    s6: {
      eyebrow: 'Navigator的不同', h2: 'Navigator不是辅导老师。这是确切的区别所在。',
      points: [
        { label: '纵向知识积累', body: '按课时收费的辅导老师每次都从零开始了解你的孩子。Navigator携带的是完整的弧线——孩子的Lexile基线、从第一周起的6+1特质档案、三节课前那个仍需改进的具体句子。这些积累形成复利。它产生的洞察，无法在一次性课程中被复制。' },
        { label: '更好的问题\u00a0——\u00a0而非更快的答案', body: 'Navigator在孩子回答之后的第一个动作，永远是追问——从不是评价。这是培养思考者与训练应答者之间的结构性差异。一个建立能力，另一个建立依赖。' },
        { label: '有针对性的反馈\u00a0——\u00a0而非泛泛的鼓励', body: 'Navigator的每一条回应都指向具体的6+1特质、具体的分数、以及具体的下一步。不是"不错"——而是"你的想法特质从2分升到3分，是因为这个句子。4分要求你做到这个。"孩子永远清楚自己在哪里，以及更高分数需要什么。' },
        { label: '一位Navigator。完整的16周弧线。', body: '孩子的Navigator从最初的Lexile评估陪伴到最终的6+1特质评估。一段关系，一个标准，对每一份草稿、每一次口头表达、每一个论点的全程关注。这段关系本身就是项目的组成部分。' },
      ],
      navigatorsLink: '认识Navigator团队 →',
    },
    s7: {
      eyebrow: '进步在这里意味着什么', h2: '可量化、具体、可感知\u00a0——\u00a0与其他地方截然不同。',
      cols: [
        { num: '01', title: 'Lexile\u00a0——\u00a0不是字母成绩', body: '16周内从Lexile 620到790，是可核实的事实。字母成绩是学校对照班级平均水平的合规评估。DODO Learning衡量的是阅读复杂度——孩子能够独立处理的文本的实际认知难度——在入学时、中期和完成时分别测量。' },
        { num: '02', title: '6+1特质\u00a0——\u00a0不是模糊印象', body: '写作在七个具体特质上评分：想法、组织、声音、词汇选择、句子流畅度、规范性、呈现。孩子知道哪个特质提升了，提升了多少，以及更高分数具体要求什么。这里的进步从不含糊。' },
        { num: '03', title: '有承诺的弧线\u00a0——\u00a0不是滚动报名', body: '16周项目有明确的起点、可量化的中期节点和已确认的结果。不是按月续费。不是随时入学。是一种结构——因为复利只在工作持续进行、Navigator的知识不断积累时才能发挥作用。' },
      ],
    },
    s8: {
      eyebrow: '他们自己说', h2: '曾在其他地方学习过的学生\u00a0——\u00a0以及发生了什么变化。',
      voices: [
        { quote: '在这之前我上了三年英文辅导课。阅读理解题我会答，但我真的不知道那章讲了什么，也不知道为什么重要。第一次Navigator让我为自己的理解辩护，我完全说不出来。十六周后，我能写两页来论证。', grade: '七年级', city: '卡尔加里', weeks: '16周项目，已完成', detail: 'Lexile 590 → 780 · 6+1想法：1 → 4 · 6+1组织：2 → 4 · 入学前参加过两年辅导课' },
        { quote: '我妈给我试过两个ESL项目。英文是流利了，但我还是写不出一篇有观点的文章。在这里Navigator让我把同一段重写了六次。每一次我都理解了之前没理解的东西。那是一种完全不同的工作方式。', grade: '六年级', city: '温哥华', weeks: '16周项目，第14周', detail: 'Lexile 610 → 760（第14周）· 6+1声音：1 → 3 · 6+1词汇选择：2 → 4 · 入学前参加过两家ESL机构' },
      ],
    },
    s9: {
      h2: 'Lexile评估是我们判断DODO Learning是否适合您孩子的起点。',
      sub: '每次入学都从免费Lexile阅读评估开始——无需承诺，没有压力。一个精准的起点，因为有意义的进步需要一个起点。',
      ctaPrimary: '预约免费Lexile评估', ctaSecondary: '查看完整项目',
      note: '评估免费。16周项目在确认Lexile基线后正式开始。',
    },
  },
}

export function generateStaticParams() { return localeParams() }

export default async function ComparePage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en

  return (
    <div className="w-full overflow-hidden" style={{ fontFamily: 'var(--font-latin)' }}>

      {/* ── S1 HERO ──────────────────────────────────────────
          Stormy lake / glowing island watercolor.
          Illustration is naturally very dark (slate sky, deep teal water) —
          the whole left half is already near-void, great for text.
          The luminous island centre-right reads through at 0.28.
          objectPosition 'center 42%' keeps island + waterline in frame.
      */}
      <section
        className="relative flex items-center"
        style={{ backgroundColor: '#212830', minHeight: '100dvh', paddingTop: 'calc(var(--nav-height) + 3.5rem)', paddingBottom: '5rem' }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/compare-desk-bg.webp"
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }}
          />
          {/* Primary directional overlay */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(108deg, rgba(14,14,18,0.98) 0%, rgba(14,14,18,0.97) 35%, rgba(14,14,18,0.80) 58%, rgba(14,14,18,0.28) 100%)' }} />
          {/* Bottom vignette */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,14,18,0.88) 0%, transparent 28%)' }} />
          {/* Teal radial accent — echoes the luminous island greens */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 55% at 65% 50%, rgba(40,160,130,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        </div>

        <div className="container-section relative z-10">
          <div style={{ maxWidth: '700px' }}>
            <Eyebrow dark>{c.s1.eyebrow}</Eyebrow>
            <h1 className="mb-6" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(38px, 5vw, 68px)', lineHeight: 1.2, color: '#F0F0F0', letterSpacing: '-0.03em', textWrap: 'balance' }}>
              {c.s1.h1a}<span style={{ color: '#b7b5fe' }}>{c.s1.h1b}</span>{c.s1.h1c}
            </h1>
            <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '18px', lineHeight: 1.6, color: 'rgba(240,240,240,0.52)', maxWidth: '520px' }}>
              {c.s1.sub}
            </p>
          </div>
        </div>
      </section>

      {/* ── S2 THE REFRAME ───────────────────────────────── */}
      <section className="px-6 py-24 md:py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-center max-w-[860px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(26px, 4vw, 48px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.025em' }}>
            {c.s2.pull}<span style={{ color: '#b7b5fe' }}>{c.s2.pullSpan}</span>{c.s2.pullEnd}
          </p>
        </div>
      </section>

      {/* ── S3 THE CATEGORY DIFFERENCE ───────────────────── */}
      <Section bg="dark">
        <div className="text-center mb-16">
          <Eyebrow dark center>{c.s3.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 42px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s3.h2}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {c.s3.cols.map(({ question, title, body }, i) => (
            <div key={title} className="px-0 md:px-8" style={i > 0 ? { borderLeft: '1px solid rgba(183,181,254,0.2)' } : undefined}>
              <div className="mb-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '13px', fontStyle: 'italic', color: 'rgba(240,240,240,0.45)' }}>{question}</div>
              <h3 className="mb-3" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '22px', color: '#b7b5fe' }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: 'rgba(240,240,240,0.70)', lineHeight: 1.6 }}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── S4 THE LOOP ───────────────────────────────────── */}
      <Section bg="whisper">
        <div className="text-center mb-8">
          <Eyebrow center>{c.s4.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl mx-auto mb-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 42px)', color: '#0E0E12', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s4.h2}</h2>
        </div>
        <LoopDiagram locale={locale} />
        <div className="text-center mt-8">
          <p className="max-w-[640px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '16px', color: '#212830', lineHeight: 1.7 }}>{c.s4.caption}</p>
          <div style={{ marginTop: '1.25rem' }}>
            <Link href={`/${locale}/methodology`} style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '14px', color: '#5856cc', textDecoration: 'none' }}>{c.s4.methodologyLink}</Link>
          </div>
        </div>
      </Section>

      {/* ── S5 FOUNDER VIDEO ──────────────────────────────── */}
      <section className="px-6 py-24 md:py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow dark center>{c.s5.eyebrow}</Eyebrow>
            <h2 className="max-w-[640px] mx-auto mb-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: 'clamp(22px, 3vw, 34px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s5.h2}</h2>
            <p className="max-w-[500px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: 'rgba(240,240,240,0.60)', lineHeight: 1.6 }}>{c.s5.sub}</p>
          </div>
          <figure className="max-w-[800px] mx-auto rounded-2xl overflow-hidden" style={{ aspectRatio: '16 / 9', backgroundColor: '#2E3848', border: '1px solid rgba(183,181,254,0.12)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="flex flex-col items-center gap-4" style={{ pointerEvents: 'none' }}>
              <div className="flex items-center justify-center rounded-full" style={{ width: '72px', height: '72px', backgroundColor: 'rgba(183,181,254,0.15)', border: '1.5px solid rgba(183,181,254,0.3)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#b7b5fe" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '15px', color: '#F0F0F0', marginBottom: '4px' }}>{c.s5.founderName}</p>
                <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 300, fontSize: '12px', color: 'rgba(183,181,254,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.s5.founderNote}</p>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* ── S6 NAVIGATOR DIFFERENCE ───────────────────────── */}
      <Section bg="whisper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1688646545293-2755ea04cd8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80" alt="Navigator providing calibrated, longitudinal feedback on a student draft" className="rounded-lg w-full" style={{ display: 'block' }} />
          </div>
          <div className="order-1 md:order-2">
            <Eyebrow>{c.s6.eyebrow}</Eyebrow>
            <h2 className="mb-8 max-w-[480px]" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 38px)', color: '#0E0E12', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s6.h2}</h2>
            <div className="space-y-5">
              {c.s6.points.map(({ label, body }) => (
                <p key={label} style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '16px', color: '#212830', lineHeight: 1.6 }}>
                  <strong style={{ fontWeight: 600, color: '#0E0E12' }}>{label}:</strong>{' '}{body}
                </p>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <Link href={`/${locale}/navigators`} style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: '14px', color: '#5856cc', textDecoration: 'none' }}>{c.s6.navigatorsLink}</Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ── S7 MEASUREMENT ────────────────────────────────── */}
      <Section bg="dark">
        <div className="text-center mb-16">
          <Eyebrow dark center>{c.s7.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 42px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s7.h2}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {c.s7.cols.map(({ num, title, body }, i) => (
            <div key={num} className="px-0 md:px-8" style={i > 0 ? { borderLeft: '1px solid rgba(183,181,254,0.2)' } : undefined}>
              <div className="mb-3" style={{ fontFamily: 'var(--font-latin)', fontWeight: 300, fontSize: '11px', color: 'rgba(183,181,254,0.40)' }}>{num}</div>
              <h3 className="mb-3" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '20px', color: '#b7b5fe' }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: 'rgba(240,240,240,0.70)', lineHeight: 1.6 }}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── S8 STUDENT VOICE ──────────────────────────────── */}
      <section className="px-6 py-24 md:py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow dark center>{c.s8.eyebrow}</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 42px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s8.h2}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {c.s8.voices.map((v) => (
              <StudentVoiceCard key={v.grade + v.city} quote={v.quote} grade={v.grade} city={v.city} weeksInProgram={v.weeks} hangarDetail={v.detail} />
            ))}
          </div>
        </div>
      </section>

      {/* ── S9 CLOSING CTA ────────────────────────────────── */}
      <Section bg="dark">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="mb-5" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 42px)', color: '#b7b5fe', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s9.h2}</h2>
          <p className="max-w-[520px] mx-auto mb-8" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '16px', color: 'rgba(240,240,240,0.75)', lineHeight: 1.6 }}>{c.s9.sub}</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <Link href={`/${locale}/consult`} className="w-full md:w-auto rounded-lg transition-all hover:opacity-90" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '16px', backgroundColor: '#F5C842', color: '#0E0E12', padding: '16px 32px', textDecoration: 'none', display: 'inline-block', textAlign: 'center', minWidth: '280px' }}>{c.s9.ctaPrimary}</Link>
            <Link href={`/${locale}/program`} className="w-full md:w-auto rounded-lg transition-all hover:border-white" style={{ fontFamily: 'var(--font-latin)', fontWeight: 500, fontSize: '16px', backgroundColor: 'transparent', color: '#F0F0F0', border: '1.5px solid rgba(240,240,240,0.50)', padding: '14px 32px', textDecoration: 'none', display: 'inline-block', textAlign: 'center', minWidth: '280px' }}>{c.s9.ctaSecondary}</Link>
          </div>
          <p className="mt-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '13px', color: '#b7b5fe' }}>{c.s9.note}</p>
        </div>
      </Section>

    </div>
  )
}