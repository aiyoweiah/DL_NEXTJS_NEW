// app/[locale]/the-hangar/page.jsx
//
// Pure server component — no 'use client', zero external dependencies.
// Bilingual EN + ZH — all text driven from COPY object below.

import Link from 'next/link'
import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const meta = (COPY[locale] ?? COPY.en).meta
  return buildMetadata({ locale, title: meta.title, description: meta.description, path: '/the-hangar' })
}

// ─────────────────────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────────────────────
function Eyebrow({ children, center = false }) {
  return (
    <div style={{ fontFamily: 'var(--font-latin)', fontWeight: 500, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b7b5fe', marginBottom: '16px', textAlign: center ? 'center' : undefined }}>
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

function LoopDiagram() {
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
        <text x="200" y="53"  textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC, sans-serif">阅读</text>
        <circle cx="360" cy="200" r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="360" y="197" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">THINK</text>
        <text x="360" y="213" textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC, sans-serif">思考</text>
        <circle cx="200" cy="360" r="36" fill="#F5F5FF" stroke="#F5C842" strokeWidth="2" />
        <text x="200" y="357" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">SPEAK</text>
        <text x="200" y="373" textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC, sans-serif">表达</text>
        <circle cx="40"  cy="200" r="36" fill="#F5F5FF" stroke="#b7b5fe" strokeWidth="2" />
        <text x="40"  y="197" textAnchor="middle" fill="#0E0E12" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">WRITE</text>
        <text x="40"  y="213" textAnchor="middle" fill="#0E0E12" fontSize="9"  opacity="0.4"  fontFamily="Noto Sans SC, sans-serif">写作</text>
        <text x="200" y="193" textAnchor="middle" fill="#0E0E12" fontSize="13" fontWeight="700" fontFamily="DM Sans, sans-serif" opacity="0.6">THE LOOP</text>
        <text x="200" y="210" textAnchor="middle" fill="#b7b5fe" fontSize="10" fontFamily="Noto Sans SC, sans-serif" opacity="0.5">学习闭环</text>
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

// ─────────────────────────────────────────────────────────────
// BILINGUAL CONTENT
// ─────────────────────────────────────────────────────────────
const COPY = {
  en: {
    meta: {
      title: 'The Hangar \u2014 Between-Session Community',
      description: 'The Hangar is where DODO learners continue The Loop between sessions \u2014 Navigator-supported, cohort-driven, and built to turn 16 weeks into a compounding system. Not homework help. The environment.',
    },
    s1: {
      eyebrow: 'The Hangar',
      h1a: 'Where the work continues \u2014 and the people who\u00a0',
      h1b: 'get it',
      h1c: '\u00a0are already there.',
      sub: 'Not homework help. Not a study hall. The environment where The Loop becomes a habit.',
    },
    s2: {
      pull: 'The Hangar is not where students go when they are stuck. It is where students go when they are\u00a0',
      pullSpan: 'ready to go further',
      pullEnd: '.',
    },
    s3: {
      eyebrow: 'What It Is',
      h2: "Three things The Hangar is \u2014 that nothing else in your child\u2019s week is.",
      cols: [
        { question: 'What actually happens here?',    title: 'Navigator-supported sessions',     body: 'Structured, not supervised. A Navigator poses the question \u2014 students do the thinking. Nothing is passive.' },
        { question: 'Who else is in The Hangar?',     title: 'A cohort at the same Loop stage',  body: 'Every student in the room is navigating two languages and the same phase of The Loop. The shared context is the point.' },
        { question: 'What does it produce?',           title: 'Between-session momentum',         body: 'The Hangar is what turns 16 weeks into a system instead of a schedule. It is where the compounding begins.' },
      ],
    },
    s4: {
      eyebrow: 'The Methodology',
      h2: 'The Loop runs in sessions. The Hangar keeps it running between them.',
      caption: 'A student who only works The Loop during sessions will plateau at the pace of one session per week. A student who lives inside The Hangar between sessions compounds. The Loop becomes instinct, not instruction.',
    },
    s5: {
      eyebrow: 'From the Founder',
      h2: 'Why The Hangar exists \u2014 and why nothing else does what it does.',
      sub: 'Unscripted. Eight minutes. The concept in full.',
      founderName: 'Sarah Chen \u2014 Founder & Lead Navigator',
      founderNote: 'Video embed \u2014 replace with production URL',
    },
    s6: {
      eyebrow: 'Navigator Presence',
      h2: 'The same Navigator. In The Hangar. Knowing exactly where your child is.',
      points: [
        { label: 'Same Navigator',      body: "The Navigator in The Hangar is not a moderator or a support assistant. It is the same Navigator from your child\u2019s session \u2014 with the same Lexile baseline, the same 6+1 Trait profile, the same session notes." },
        { label: 'Calibrated feedback', body: "Every comment in The Hangar references where that specific student is in The Loop. Not generic encouragement \u2014 a named trait, a specific score, a precise next move." },
        { label: 'Not generic',         body: "A Navigator does not copy and paste feedback. When they respond to a student\u2019s writing draft in The Hangar, they are responding to that draft \u2014 the specific sentence that needs to move, the specific score that changes if it does." },
        { label: 'Response time',       body: 'Hangar responses are delivered within 6 hours on session days and 12 hours on off days.' },
      ],
    },
    s7: {
      eyebrow: 'The Cohort',
      h2: "Who else is in The Hangar \u2014 and why it matters that they\u2019re there.",
      cols: [
        { num: '01', title: 'Same stage, not same age',  body: 'Cohorts are grouped by Loop phase and Lexile level \u2014 not by school year. A Grade 5 and a Grade 7 student at the same Lexile are in the same conversation.' },
        { num: '02', title: 'Bilingual by design',       body: 'Every student in the cohort is navigating two languages simultaneously. The shared experience is not incidental \u2014 it is the foundation of what they build together.' },
        { num: '03', title: 'Belonging before performance', body: 'The Hangar is not a place to prove yourself. It is a place to build yourself \u2014 in a room where everyone else is doing the same thing, in the same two languages.' },
      ],
    },
    s8: {
      eyebrow: 'Student Voice',
      h2: 'In their words \u2014 not ours.',
      voices: [
        { quote: "I used to think I had to wait until my session to ask questions. Now I post my draft in The Hangar and get feedback before the session even starts. It\u2019s like having an extra session every week except it\u2019s on my schedule.", grade: 'Grade 6', city: 'Shanghai',  weeks: '8 weeks in program',  detail: 'Posted a writing draft at 10pm, received calibrated feedback by morning' },
        { quote: "There\u2019s this kid in my cohort who\u2019s in Grade 9 but we\u2019re at the same Lexile. We both struggle with the same stuff and help each other. Nobody at my school gets what it\u2019s like doing this in two languages.",          grade: 'Grade 7', city: 'Beijing',   weeks: '12 weeks in program', detail: 'Participated in a peer review exchange in The Hangar between sessions' },
      ],
    },
    s9: {
      h2: 'The Hangar is included in every 16-Week Program enrollment. It is not an add-on. It is the environment.',
      sub: 'When your child enrolls in The 16-Week Program, The Hangar is where the program lives between sessions. One Navigator. One cohort. One continuous loop.',
      ctaPrimary:   'Book a Diagnostic Call',
      ctaSecondary: 'See the Full Program',
      note: 'The Hangar is included in every 16-Week Program enrollment. It is not an add-on.',
    },
  },

  zh: {
    meta: {
      title: 'The Hangar \u2014 课程间的社区',
      description: 'The Hangar是DODO学习者在课程之间继续The Loop的地方——由Navigator支持，以同伴群体为驱动，将16周变成一个复利系统。不是作业辅导，是学习环境本身。',
    },
    s1: {
      eyebrow: 'The Hangar',
      h1a: '学习在这里继续——而那些\u00a0',
      h1b: '真正理解的人',
      h1c: '\u00a0早已在场。',
      sub: '不是作业辅导，不是自习室。这是让The Loop成为习惯的环境。',
    },
    s2: {
      pull: 'The Hangar不是学生遇到困难时去的地方。它是学生\u00a0',
      pullSpan: '准备好走得更远时',
      pullEnd: '\u00a0去的地方。',
    },
    s3: {
      eyebrow: '它是什么',
      h2: 'The Hangar拥有三种特质——您孩子一周中的其他任何地方都没有。',
      cols: [
        { question: '这里实际上发生什么？',     title: 'Navigator支持的学习',   body: '有结构，而非监督。Navigator提出问题——学生完成思考。没有被动环节。' },
        { question: 'The Hangar里还有谁？',    title: '处于同一Loop阶段的同伴', body: '房间里的每位学生都在同时驾驭两种语言，处于The Loop的同一阶段。共同的背景就是意义所在。' },
        { question: '它能产生什么？',           title: '课程间的持续动力',       body: 'The Hangar将16周变成一个系统，而非一个日程表。复利就从这里开始。' },
      ],
    },
    s4: {
      eyebrow: '教学方法',
      h2: 'The Loop在课程中运行。The Hangar让它在课程之间持续运行。',
      caption: '只在课程期间进行The Loop的学生，会以每周一节课的节奏停滞不前。而活跃在The Hangar中的学生则会实现复利增长。The Loop从指令变成本能。',
    },
    s5: {
      eyebrow: '创始人说',
      h2: 'The Hangar为何存在——以及为什么没有其他事物能做到它所做的事。',
      sub: '无脚本。八分钟。完整阐述这个概念。',
      founderName: 'Sarah Chen — 创始人 & 首席Navigator',
      founderNote: '视频链接——请替换为正式URL',
    },
    s6: {
      eyebrow: 'Navigator的存在',
      h2: '同一位Navigator。在The Hangar中。确切知道您的孩子在哪里。',
      points: [
        { label: '同一位Navigator',   body: 'The Hangar中的Navigator不是主持人或支持助手。他是您孩子课程中同一位Navigator——带着同样的Lexile基线、同样的6+1特质档案、同样的课程笔记。' },
        { label: '有针对性的反馈',   body: 'The Hangar中的每条评论都指向该学生在The Loop中的具体位置。不是泛泛的鼓励——而是具名的特质、具体的分数、精准的下一步。' },
        { label: '非模板化',         body: 'Navigator不会复制粘贴反馈。当他们在The Hangar中回应学生的写作草稿时，他们在回应那份具体的草稿——需要改动的那个具体句子，以及改动后会变化的那个具体分数。' },
        { label: '响应时间',         body: '在课程当天，Hangar的反馈在6小时内送达；非课程日则在12小时内。' },
      ],
    },
    s7: {
      eyebrow: '同伴群体',
      h2: 'The Hangar里还有谁——以及他们在场为什么重要。',
      cols: [
        { num: '01', title: '同一阶段，而非同一年龄', body: '同伴群体按Loop阶段和Lexile水平分组——而非按学年。五年级和七年级的学生如果Lexile相同，就在同一段对话中。' },
        { num: '02', title: '双语由设计而生',         body: '群体中的每位学生都在同时驾驭两种语言。这种共同经历并非偶然——它是他们共同构建的基础。' },
        { num: '03', title: '归属感先于表现',         body: 'The Hangar不是一个证明自己的地方。它是一个建构自己的地方——在一个所有人都在做同样事情、用同样两种语言的房间里。' },
      ],
    },
    s8: {
      eyebrow: '学生的声音',
      h2: '用他们自己的话——不是我们的。',
      voices: [
        { quote: '我以前以为必须等到课程才能提问。现在我把草稿发到The Hangar，课程开始之前就能收到反馈。就像每周多了一节课，只是按我自己的时间安排。', grade: '六年级', city: '上海',  weeks: '已完成8周',  detail: '晚上10点发布写作草稿，次日清晨收到针对性反馈' },
        { quote: '我的群体里有个九年级的学生，但我们Lexile相同。我们在同样的地方挣扎，互相帮助。我学校里没有人能理解用两种语言学习是什么感觉。',       grade: '七年级', city: '北京',  weeks: '已完成12周', detail: '在课程之间参与了The Hangar中的同伴互评' },
      ],
    },
    s9: {
      h2: 'The Hangar包含在每一项16周项目注册中。它不是附加项目。它是学习环境本身。',
      sub: '当您的孩子注册16周项目时，The Hangar就是课程之间项目所在的地方。一位Navigator，一个同伴群体，一个持续的闭环。',
      ctaPrimary:   '预约诊断咨询',
      ctaSecondary: '查看完整项目',
      note: 'The Hangar包含在每一项16周项目注册中。它不是附加项目。',
    },
  },
}

export function generateStaticParams() {
  return localeParams()
}

export default async function TheHangarPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en

  return (
    <div className="w-full overflow-hidden" style={{ fontFamily: 'var(--font-latin)' }}>

      {/* S1 HERO */}
      <section className="relative flex items-center justify-center px-6 md:px-12" style={{ backgroundColor: '#212830', minHeight: '100dvh', paddingTop: 'calc(var(--nav-height-md) + 3rem)', paddingBottom: '5rem' }}>
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1758270705317-3ef6142d306f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80" alt="" aria-hidden="true" className="w-full h-full object-cover" style={{ display: 'block' }} />
          <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(to right, rgba(14,14,18,0.85) 0%, rgba(14,14,18,0.55) 50%, rgba(14,14,18,0.30) 100%)' }} />
          <div className="absolute inset-0 md:hidden" style={{ backgroundColor: 'rgba(14,14,18,0.72)' }} />
        </div>
        <div className="relative z-10 max-w-[700px]">
          <Eyebrow>{c.s1.eyebrow}</Eyebrow>
          <h1 className="mb-6" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(38px, 5vw, 68px)', lineHeight: 1.2, color: '#F0F0F0', letterSpacing: '-0.03em', maxWidth: '700px' }}>
            {c.s1.h1a}<span style={{ color: '#b7b5fe' }}>{c.s1.h1b}</span>{c.s1.h1c}
          </h1>
          <p style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '18px', lineHeight: 1.6, color: 'rgba(240,240,240,0.75)', maxWidth: '520px' }}>{c.s1.sub}</p>
        </div>
      </section>

      {/* S2 THE ONE REFRAME */}
      <section className="px-6 py-24 md:py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-center max-w-[860px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(26px, 4vw, 48px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.025em' }}>
            {c.s2.pull}<span style={{ color: '#b7b5fe' }}>{c.s2.pullSpan}</span>{c.s2.pullEnd}
          </p>
        </div>
      </section>

      {/* S3 WHAT THE HANGAR IS */}
      <Section bg="dark">
        <div className="text-center mb-16">
          <Eyebrow center>{c.s3.eyebrow}</Eyebrow>
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

      {/* S4 INSIDE THE LOOP */}
      <Section bg="whisper">
        <div className="text-center mb-8">
          <Eyebrow center>{c.s4.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl mx-auto mb-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 42px)', color: '#0E0E12', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s4.h2}</h2>
        </div>
        <LoopDiagram />
        <div className="text-center mt-8">
          <p className="max-w-[640px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '16px', color: '#212830', lineHeight: 1.7 }}>{c.s4.caption}</p>
        </div>
      </Section>

      {/* S5 FOUNDER VIDEO */}
      <section className="px-6 py-24 md:py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow center>{c.s5.eyebrow}</Eyebrow>
            <h2 className="max-w-[640px] mx-auto mb-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: 'clamp(22px, 3vw, 34px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s5.h2}</h2>
            <p className="max-w-[500px] mx-auto" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '15px', color: 'rgba(240,240,240,0.60)', lineHeight: 1.6 }}>{c.s5.sub}</p>
          </div>
          <figure className="max-w-[800px] mx-auto rounded-2xl overflow-hidden"
            style={{ aspectRatio: '16 / 9', backgroundColor: '#2E3848', border: '1px solid rgba(183,181,254,0.12)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="flex flex-col items-center gap-4" style={{ pointerEvents: 'none' }}>
              <div className="flex items-center justify-center rounded-full"
                style={{ width: '72px', height: '72px', backgroundColor: 'rgba(183,181,254,0.15)', border: '1.5px solid rgba(183,181,254,0.3)' }}>
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

      {/* S6 NAVIGATOR PRESENCE */}
      <Section bg="whisper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1688646545293-2755ea04cd8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80"
              alt="Navigator providing personalised feedback on a student's writing" className="rounded-lg w-full" style={{ display: 'block' }} />
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
          </div>
        </div>
      </Section>

      {/* S7 THE COHORT */}
      <Section bg="dark">
        <div className="text-center mb-16">
          <Eyebrow center>{c.s7.eyebrow}</Eyebrow>
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

      {/* S8 STUDENT VOICE */}
      <section className="px-6 py-24 md:py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow center>{c.s8.eyebrow}</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-latin)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 42px)', color: '#F0F0F0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s8.h2}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {c.s8.voices.map((v) => (
              <StudentVoiceCard key={v.grade + v.city} quote={v.quote} grade={v.grade} city={v.city} weeksInProgram={v.weeks} hangarDetail={v.detail} />
            ))}
          </div>
        </div>
      </section>

      {/* S9 CLOSING CTA */}
      <Section bg="dark">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="mb-5" style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 42px)', color: '#b7b5fe', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.s9.h2}</h2>
          <p className="max-w-[520px] mx-auto mb-8" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '16px', color: 'rgba(240,240,240,0.75)', lineHeight: 1.6 }}>{c.s9.sub}</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <Link href={`/${locale}/consult`} className="w-full md:w-auto rounded-lg transition-all hover:opacity-90"
              style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: '16px', backgroundColor: '#F5C842', color: '#0E0E12', padding: '16px 32px', textDecoration: 'none', display: 'inline-block', textAlign: 'center', minWidth: '280px' }}>
              {c.s9.ctaPrimary}
            </Link>
            <Link href={`/${locale}/program`} className="w-full md:w-auto rounded-lg transition-all hover:border-white"
              style={{ fontFamily: 'var(--font-latin)', fontWeight: 500, fontSize: '16px', backgroundColor: 'transparent', color: '#F0F0F0', border: '1.5px solid rgba(240,240,240,0.50)', padding: '14px 32px', textDecoration: 'none', display: 'inline-block', textAlign: 'center', minWidth: '280px' }}>
              {c.s9.ctaSecondary}
            </Link>
          </div>
          <p className="mt-4" style={{ fontFamily: 'var(--font-latin)', fontWeight: 400, fontSize: '13px', color: '#b7b5fe' }}>{c.s9.note}</p>
        </div>
      </Section>

    </div>
  )
}