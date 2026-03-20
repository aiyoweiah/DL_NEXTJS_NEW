// app/[locale]/navigators/page.jsx
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
  return buildMetadata({ locale, title: meta.title, description: meta.description, path: '/navigators' })
}

function Eyebrow({ children, center = false }) {
  return (
    <div style={{ fontFamily: 'var(--font-latin)', fontWeight: 500, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b7b5fe', marginBottom: '16px', textAlign: center ? 'center' : undefined }}>
      {children}
    </div>
  )
}

function Badge({ children }) {
  return (
    <span style={{ display: 'inline-block', fontFamily: 'var(--font-latin)', fontSize: '12px', fontWeight: 500, color: '#b7b5fe', backgroundColor: 'rgba(183,181,254,0.15)', borderRadius: '9999px', padding: '4px 12px', marginRight: '8px', marginBottom: '8px' }}>
      {children}
    </span>
  )
}

const COPY = {
  en: {
    meta: {
      title: 'The Navigators',
      description: "DODO Navigators are not teachers or tutors. They are longitudinal partners who know your child's Lexile baseline, their 6+1 Trait writing profile, and exactly where they need to go next.",
    },
    hero: {
      eyebrow: 'The Navigators',
      h1a: "Your child doesn\u2019t need another teacher. They need someone who knows exactly\u00a0",
      h1b: 'where they are',
      h1c: ' \u2014 and exactly\u00a0',
      h1d: "where they\u2019re going",
      h1e: '.',
      sub: 'Most programs teach the content. A Navigator teaches the thinker.',
    },
    s2: {
      eyebrow: 'Reframe',
      h2: "Let\u2019s clear up what a Navigator is \u2014 by starting with what they\u2019re not.",
      cols: [
        { strike: 'Not a teacher',     title: 'A guide with a map',                      body: 'Teachers move the class forward. A Navigator moves your child \u2014 from exactly where they are.' },
        { strike: 'Not a tutor',        title: 'A longitudinal partner',                  body: "Tutors fix tonight\u2019s homework. A Navigator tracks your child\u2019s specific gaps across 16 weeks." },
        { strike: 'Not an instructor',  title: "Someone who knows your child\u2019s voice", body: "Instructors deliver content. A Navigator knows when your child goes quiet \u2014 and why." },
      ],
    },
    s3: {
      eyebrow: 'The Work',
      h2: 'Four phases. One Navigator. Every session.',
      steps: [
        { num: '01', phase: 'READ',  headline: "Selects the day\u2019s text at precisely the right Lexile \u2014 above comfort, below frustration.", sub: 'Lexile-calibrated text selection' },
        { num: '02', phase: 'THINK', headline: "Holds space for the student\u2019s own thinking. Does not fill the silence. Waits for the idea.", sub: 'Socratic silence \u2014 not lecture' },
        { num: '03', phase: 'SPEAK', headline: "Draws out the student\u2019s position through Socratic dialogue. Then challenges it.", sub: 'Spoken argument \u2014 defended, not performed' },
        { num: '04', phase: 'WRITE', headline: 'Assesses the written response live against 6+1 Traits. Scores are specific. Feedback is precise.', sub: '6+1 Trait framework \u2014 named scores' },
      ],
    },
    s4: {
      eyebrow: 'The Relationship',
      h2: 'The same Navigator. Every session. Sixteen weeks.',
      points: [
        { label: 'Matching',     body: "Navigators are matched to students \u2014 not assigned. Before the first session, DODO assesses your child\u2019s Lexile baseline, their 6+1 Trait writing profile, and their communication style. The match is intentional." },
        { label: 'Longitudinal', body: "Your child\u2019s Navigator carries their full history. Every Lexile score. Every session note. Every moment where a concept clicked or didn\u2019t. There is no starting over. There is no new face." },
        { label: 'Gap tracking', body: 'A Navigator does not prepare a lesson plan. They prepare for your specific child \u2014 where they are this week, what the gap is, and which part of The Loop will close it.' },
        { label: 'The Hangar',  body: "Between sessions, The Hangar extends the relationship \u2014 Navigator-supported, student-driven. The work doesn\u2019t stop when the screen closes." },
      ],
    },
    s5: { eyebrow: 'The Navigators', h2: 'The person your child works with, every week.' },
    s6: {
      eyebrow: 'In Practice',
      h2: 'What happens in a real session',
      timeline: [
        { label: 'Minute 0\u20135: Assessment',          body: "Navigator reviews last session\u2019s notes and The Hangar activity. They know where the student struggled, what clicked, and what needs reinforcement today." },
        { label: 'Minute 5\u201320: Read & Think',       body: 'Student reads a Lexile-calibrated text. Navigator asks one open question. Then waits. The silence is intentional \u2014 this is where thinking happens.' },
        { label: 'Minute 20\u201335: Speak & Challenge', body: "Student articulates their position. Navigator listens, then challenges with a Socratic follow-up. The goal isn\u2019t agreement \u2014 it\u2019s precision." },
        { label: 'Minute 35\u201350: Write & Score',     body: 'Student writes their argument. Navigator scores live using 6+1 Traits \u2014 Ideas: 4/6, Organization: 5/6. Feedback is specific, not generic. The score names the gap.' },
        { label: 'Minute 50\u201360: Next Steps',        body: 'Navigator assigns work in The Hangar \u2014 targeted to the gap identified today. Parent receives session notes with Lexile progress and specific next-session focus.' },
      ],
    },
    s7: {
      eyebrow: 'Evidence',
      h2: 'What families say',
      testimonials: [
        { quote: "We tried three tutors before DODO. Every time, it was the same: homework help, then back to square one next week. With her Navigator, my daughter finally has someone who remembers her \u2014 what she struggles with, what she\u2019s good at, where she needs to go next. It\u2019s the first time I\u2019ve seen actual progress.", city: 'Parent, Vancouver',  detail: 'Student: Grade 7 \u00b7 16 weeks with Navigator Laura' },
        { quote: "The difference is specificity. Before DODO, teachers would say \u2018needs improvement in writing.\u2019 His Navigator told us exactly where the gap was \u2014 sentence structure, supporting evidence \u2014 and we watched those scores go up week by week. Numbers don\u2019t lie.",                                                 city: 'Parent, Toronto',   detail: 'Student: Grade 6 \u00b7 16 weeks with Navigator James' },
        { quote: "My son doesn\u2019t like talking in class. But with his Navigator, he talks. She knows when to wait, when to push, when to let him think. I\u2019ve never seen him engage like this. It\u2019s not magic \u2014 it\u2019s the relationship.",                                                                                 city: 'Parent, Montreal',  detail: 'Student: Grade 5 \u00b7 16 weeks with Navigator Alicia' },
        { quote: "The Hangar was the surprise. Between sessions, my daughter\u2019s Navigator leaves her targeted work \u2014 not busywork. She actually does it because it\u2019s connected to what they talked about. The learning doesn\u2019t stop at 60 minutes.",                                                                          city: 'Parent, Calgary',   detail: 'Student: Grade 8 \u00b7 16 weeks with Navigator Laura' },
      ],
    },
    s8: {
      h2a: 'Your child deserves a Navigator who knows\u00a0',
      h2b: 'exactly where they are',
      h2c: ' \u2014 and\u00a0',
      h2d: "exactly where they\u2019re going",
      h2e: '.',
      sub: 'Sixteen weeks. One Navigator. Measurable progress in reading, thinking, speaking, and writing.',
      cta: "Start Your Child\u2019s Charter",
      note: 'No long-term commitment. See results in 16 weeks.',
    },
  },
  zh: {
    meta: {
      title: 'Navigators',
      description: 'DODO Navigator不是教师，也不是家教。他们是纵向陪伴的伙伴——了解您孩子的Lexile基线、6+1特质写作档案，以及下一步确切需要去向何处。',
    },
    hero: {
      eyebrow: 'Navigators',
      h1a: '您的孩子不需要又一位老师。他们需要一个确切知道\u00a0',
      h1b: '他们在哪里',
      h1c: '\u00a0——以及确切知道\u00a0',
      h1d: '他们将去向何处',
      h1e: '\u00a0的人。',
      sub: '大多数项目教授内容。Navigator教授的是思考者本身。',
    },
    s2: {
      eyebrow: '重新认识',
      h2: '让我们弄清楚Navigator是什么——从他们不是什么开始。',
      cols: [
        { strike: '不是教师',   title: '拥有地图的向导',     body: '教师推动全班前进。Navigator推动您的孩子——从他们确切所在的位置出发。' },
        { strike: '不是家教',   title: '纵向陪伴的伙伴',     body: '家教解决今晚的作业。Navigator追踪您孩子在16周内的具体差距。' },
        { strike: '不是辅导员', title: '了解您孩子声音的人', body: '辅导员传授内容。Navigator知道您的孩子何时沉默——以及为什么。' },
      ],
    },
    s3: {
      eyebrow: '实际工作',
      h2: '四个阶段。一位Navigator。每节课。',
      steps: [
        { num: '01', phase: '阅读', headline: '以精确的Lexile水平选择当天的文本——高于舒适区，低于挫败点。', sub: 'Lexile校准的文本选择' },
        { num: '02', phase: '思考', headline: '为学生自己的思考留出空间。不填补沉默。等待想法的出现。',       sub: '苏格拉底式沉默——而非讲授' },
        { num: '03', phase: '表达', headline: '通过苏格拉底式对话引出学生的立场，然后挑战它。',               sub: '口述论点——捍卫，而非表演' },
        { num: '04', phase: '写作', headline: '实时对照6+1特质框架评估书面回答。分数具体，反馈精准。',       sub: '6+1特质框架——具名评分' },
      ],
    },
    s4: {
      eyebrow: '这段关系',
      h2: '同一位Navigator。每节课。十六周。',
      points: [
        { label: '匹配',       body: 'Navigator与学生是匹配的，而非随机分配的。在第一节课之前，DODO评估您孩子的Lexile基线、6+1特质写作档案以及沟通风格。这次匹配是有意为之的。' },
        { label: '纵向陪伴',   body: '您孩子的Navigator承载着他们的完整历史。每一个Lexile分数，每一条课程笔记，每一个概念突破或未能突破的瞬间。没有重新开始，没有陌生的面孔。' },
        { label: '差距追踪',   body: 'Navigator不准备课程计划。他们为您的具体孩子做准备——他们本周在哪里，差距是什么，The Loop的哪个部分能弥合它。' },
        { label: 'The Hangar', body: '在课程之间，The Hangar延伸了这段关系——由Navigator支持，由学生主导。当屏幕关闭时，学习不会停止。' },
      ],
    },
    s5: { eyebrow: 'Navigators', h2: '每周与您孩子共事的那个人。' },
    s6: {
      eyebrow: '实际情况',
      h2: '真实课程中发生了什么',
      timeline: [
        { label: '第0–5分钟：评估',       body: 'Navigator回顾上节课的笔记和The Hangar的活动。他们知道学生在哪里挣扎、什么已经理解，以及今天需要强化什么。' },
        { label: '第5–20分钟：阅读与思考', body: '学生阅读Lexile校准的文本。Navigator提出一个开放性问题，然后等待。沉默是有意为之的——这是思考发生的地方。' },
        { label: '第20–35分钟：表达与挑战', body: '学生阐明自己的立场。Navigator倾听，然后以苏格拉底式追问提出挑战。目标不是达成共识——而是精准。' },
        { label: '第35–50分钟：写作与评分', body: '学生写出论点。Navigator使用6+1特质框架实时评分——想法：4/6，组织：5/6。反馈具体，不笼统。分数指明差距所在。' },
        { label: '第50–60分钟：下一步',   body: 'Navigator在The Hangar中布置作业——针对今天发现的差距。家长收到包含Lexile进展和具体下节课重点的课程笔记。' },
      ],
    },
    s7: {
      eyebrow: '家长的话',
      h2: '家庭怎么说',
      testimonials: [
        { quote: '在DODO之前，我们试过三位家教。每次都一样：解决作业，然后下周重头再来。有了她的Navigator，我的女儿终于有了一个记得她的人——记得她挣扎的地方、她擅长的地方、她下一步需要去的地方。这是我第一次看到真正的进步。', city: '家长，温哥华', detail: '学生：七年级 · 与Navigator Laura共事16周' },
        { quote: '区别在于具体性。在DODO之前，老师会说"写作需要提高"。他的Navigator告诉我们确切的差距在哪里——句子结构、支撑论据——我们看着那些分数一周一周地上升。数字不会说谎。', city: '家长，多伦多', detail: '学生：六年级 · 与Navigator James共事16周' },
        { quote: '我的儿子不喜欢在课堂上发言。但和他的Navigator在一起时，他会说话。她知道什么时候等待，什么时候推动，什么时候让他思考。我从未见过他如此投入。这不是魔法——是这段关系。', city: '家长，蒙特利尔', detail: '学生：五年级 · 与Navigator Alicia共事16周' },
        { quote: 'The Hangar是意外之喜。在课程之间，我女儿的Navigator给她留有针对性的作业——不是无意义的练习。她确实去做，因为那与他们讨论的内容相关联。学习不在60分钟时停止。', city: '家长，卡尔加里', detail: '学生：八年级 · 与Navigator Laura共事16周' },
      ],
    },
    s8: {
      h2a: '您的孩子值得拥有一位确切知道\u00a0',
      h2b: '他们在哪里',
      h2c: '\u00a0——以及确切知道\u00a0',
      h2d: '他们将去向何处',
      h2e: '\u00a0的Navigator。',
      sub: '十六周。一位Navigator。在阅读、思考、表达和写作上可量化的进步。',
      cta: '开始您孩子的Charter',
      note: '无长期承诺。16周内见证成果。',
    },
  },
}

const NAVIGATORS = [
  {
    name: 'Laura Mitchell',
    photo: 'https://images.unsplash.com/photo-1758685848001-0396a85ba84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    alt: 'Laura Mitchell — Navigator',
    result: 'Student, Grade 6 · Vancouver', lexile: 'Lexile 660 → 810 · 16 weeks',
    badges: ['Lexile Specialist', '6+1 Certified'],
    en: { bio: 'Background in composition and academic writing — taught at secondary and post-secondary level.', quote: "I\u2019m most interested in the moment before the student writes \u2014 the thinking they haven\u2019t found words for yet." },
    zh: { bio: '写作与学术写作背景——曾在中学和大学层级任教。', quote: '我最感兴趣的是学生动笔之前的那一刻——那些他们尚未找到语言表达的思考。' },
  },
  {
    name: 'James Chen',
    photo: 'https://images.unsplash.com/photo-1771050889377-b68415885c64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    alt: 'James Chen — Navigator',
    result: 'Student, Grade 8 · Toronto', lexile: 'Lexile 720 → 920 · 16 weeks',
    badges: ['Lexile Specialist', '6+1 Certified'],
    en: { bio: 'Specialized in critical reading and argumentation — extensive work with multilingual learners.', quote: 'The Loop is where the student discovers they already know how to think \u2014 they just needed structure to see it.' },
    zh: { bio: '专注于批判性阅读与论证——与多语言学习者有大量合作经验。', quote: 'The Loop是学生发现自己已经懂得如何思考的地方——他们只是需要一个结构来看见它。' },
  },
]

export function generateStaticParams() {
  return localeParams()
}

export default async function NavigatorsPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en

  return (
    <div className="w-full overflow-hidden" style={{ fontFamily: 'var(--font-latin)' }}>

      {/* S1 HERO */}
      <section className="flex items-center justify-center px-6 py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, #2E3848 0%, #212830 60%)', minHeight: '100dvh', paddingTop: 'calc(var(--nav-height-md) + 3rem)', paddingBottom: '5rem' }}>
        <div className="absolute bottom-0 right-0 select-none pointer-events-none" aria-hidden="true"
          style={{ fontSize: '280px', fontWeight: 700, color: '#b7b5fe', opacity: 0.04, lineHeight: 1, transform: 'translateX(15%)' }}>
          NAVIGATOR
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Eyebrow center>{c.hero.eyebrow}</Eyebrow>
          <h1 className="mb-8 mx-auto"
            style={{ fontSize: 'clamp(38px, 5vw, 68px)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2, maxWidth: '760px' }}>
            {c.hero.h1a}<span style={{ color: '#b7b5fe' }}>{c.hero.h1b}</span>{c.hero.h1c}<span style={{ color: '#b7b5fe' }}>{c.hero.h1d}</span>{c.hero.h1e}
          </h1>
          <p className="mx-auto" style={{ fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 400, color: '#F0F0F0', opacity: 0.8, maxWidth: '580px', lineHeight: 1.6 }}>
            {c.hero.sub}
          </p>
        </div>
      </section>

      {/* S2 WHAT A NAVIGATOR IS NOT */}
      <section className="px-6 py-24" style={{ backgroundColor: '#0E0E12' }}>
        <div className="container-section">
          <Eyebrow center>{c.s2.eyebrow}</Eyebrow>
          <h2 className="text-center mb-16" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 600, color: '#F0F0F0', lineHeight: 1.3 }}>
            {c.s2.h2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
            {c.s2.cols.map(({ strike, title, body }, i) => (
              <div key={i} className={i === 0 ? 'md:pr-12 md:border-r' : i === 1 ? 'md:px-12 md:border-r' : 'md:pl-12'}
                style={{ borderColor: 'rgba(183,181,254,0.2)' }}>
                <div className="mb-3 line-through" style={{ fontSize: '13px', fontWeight: 500, color: '#F0F0F0', opacity: 0.5 }}>{strike}</div>
                <div className="mb-4" style={{ fontSize: '20px', fontWeight: 700, color: '#b7b5fe' }}>{title}</div>
                <p style={{ fontSize: '15px', fontWeight: 400, color: '#F0F0F0', opacity: 0.7, lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S3 WHAT A NAVIGATOR DOES */}
      <section className="px-6 py-24" style={{ backgroundColor: '#212830' }}>
        <div className="container-section">
          <Eyebrow center>{c.s3.eyebrow}</Eyebrow>
          <h2 className="text-center mb-16" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 600, color: '#F0F0F0', lineHeight: 1.3 }}>
            {c.s3.h2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {c.s3.steps.map(({ num, phase, headline, sub }) => (
              <div key={num}>
                <div className="mb-2" style={{ fontSize: '14px', fontWeight: 300, color: '#b7b5fe', opacity: 0.5 }}>{num}</div>
                <div className="mb-6" style={{ borderTop: '3px solid #b7b5fe', width: '100%' }} />
                <div className="mb-4" style={{ fontSize: '22px', fontWeight: 700, color: '#b7b5fe' }}>{phase}</div>
                <p className="mb-3" style={{ fontSize: '16px', fontWeight: 600, color: '#F0F0F0', lineHeight: 1.5 }}>{headline}</p>
                <p style={{ fontSize: '14px', fontWeight: 400, color: '#F0F0F0', opacity: 0.65, lineHeight: 1.5 }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S4 THE NAVIGATOR RELATIONSHIP */}
      <section className="px-6 py-24" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="container-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1673515335586-f9f662c01482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80"
                alt="Navigator and student in a live online session" className="w-full h-auto rounded-lg" style={{ display: 'block' }} />
            </div>
            <div className="order-1 md:order-2">
              <Eyebrow>{c.s4.eyebrow}</Eyebrow>
              <h2 className="mb-8" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#0E0E12', lineHeight: 1.3, maxWidth: '480px' }}>
                {c.s4.h2}
              </h2>
              <div className="space-y-5">
                {c.s4.points.map(({ label, body }) => (
                  <p key={label} style={{ fontSize: '16px', fontWeight: 400, color: '#212830', lineHeight: 1.6 }}>
                    <strong style={{ fontWeight: 600, color: '#0E0E12' }}>{label}:</strong>{' '}{body}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S5 NAVIGATOR PROFILES */}
      <section className="px-6 py-24" style={{ backgroundColor: '#0E0E12' }}>
        <div className="container-section">
          <Eyebrow center>{c.s5.eyebrow}</Eyebrow>
          <h2 className="text-center mb-16" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 600, color: '#F0F0F0', lineHeight: 1.3 }}>
            {c.s5.h2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {NAVIGATORS.map((nav) => {
              const loc = nav[locale] ?? nav.en
              return (
                <div key={nav.name} className="rounded-lg" style={{ backgroundColor: '#2E3848', borderTop: '3px solid #b7b5fe', padding: '32px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={nav.photo} alt={nav.alt} className="rounded-lg object-cover mb-6" style={{ width: '96px', height: '96px', display: 'block' }} />
                  <div className="mb-2" style={{ fontSize: '18px', fontWeight: 600, color: '#F0F0F0' }}>{nav.name}</div>
                  <p className="mb-4" style={{ fontSize: '14px', fontWeight: 400, color: '#F0F0F0', opacity: 0.7, lineHeight: 1.5 }}>{loc.bio}</p>
                  <p className="mb-4" style={{ fontSize: '14px', fontWeight: 400, fontStyle: 'italic', color: '#b7b5fe', lineHeight: 1.5 }}>&ldquo;{loc.quote}&rdquo;</p>
                  <div className="mb-4 flex flex-wrap">{nav.badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: '#F0F0F0', lineHeight: 1.5 }}>{nav.result}<br />{nav.lexile}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* S6 A REAL SESSION */}
      <section className="px-6 py-24" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="max-w-5xl mx-auto px-0 md:px-6">
          <Eyebrow center>{c.s6.eyebrow}</Eyebrow>
          <h2 className="text-center mb-12" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#0E0E12', lineHeight: 1.3 }}>{c.s6.h2}</h2>
          <div className="rounded-lg" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(14,14,18,0.1)', padding: '40px' }}>
            <div className="space-y-6">
              {c.s6.timeline.map(({ label, body }) => (
                <div key={label}>
                  <div className="mb-2" style={{ fontSize: '14px', fontWeight: 600, color: '#b7b5fe', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                  <p style={{ fontSize: '16px', fontWeight: 400, color: '#212830', lineHeight: 1.6 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S7 WHAT FAMILIES SAY */}
      <section className="px-6 py-24" style={{ backgroundColor: '#212830' }}>
        <div className="container-section">
          <Eyebrow center>{c.s7.eyebrow}</Eyebrow>
          <h2 className="text-center mb-16" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 600, color: '#F0F0F0', lineHeight: 1.3 }}>{c.s7.h2}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {c.s7.testimonials.map(({ quote, city, detail }) => (
              <div key={city + detail} className="rounded-lg" style={{ backgroundColor: '#2E3848', padding: '32px' }}>
                <p className="mb-6" style={{ fontSize: '16px', fontWeight: 400, color: '#F0F0F0', lineHeight: 1.7, fontStyle: 'italic' }}>&ldquo;{quote}&rdquo;</p>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#b7b5fe' }}>{city}</div>
                <div style={{ fontSize: '13px', fontWeight: 400, color: '#F0F0F0', opacity: 0.6 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S8 CLOSING CTA */}
      <section className="px-6 py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6" style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2 }}>
            {c.s8.h2a}<span style={{ color: '#b7b5fe' }}>{c.s8.h2b}</span>{c.s8.h2c}<span style={{ color: '#b7b5fe' }}>{c.s8.h2d}</span>{c.s8.h2e}
          </h2>
          <p className="mb-10 mx-auto" style={{ fontSize: '18px', fontWeight: 400, color: '#F0F0F0', opacity: 0.75, lineHeight: 1.6, maxWidth: '600px' }}>{c.s8.sub}</p>
          <Link href={`/${locale}/consult`} className="inline-block transition-all hover:scale-105 active:scale-95 rounded-lg"
            style={{ backgroundColor: '#F5C842', color: '#0E0E12', fontSize: '18px', fontWeight: 600, padding: '16px 40px', boxShadow: '0 4px 20px rgba(245,200,66,0.3)', textDecoration: 'none' }}>
            {c.s8.cta}
          </Link>
          <p className="mt-6" style={{ fontSize: '14px', fontWeight: 400, color: '#F0F0F0', opacity: 0.5 }}>{c.s8.note}</p>
        </div>
      </section>

    </div>
  )
}