// app/[locale]/privacy/page.jsx
//
// Privacy Policy — bilingual stub.
// Replaces a long-standing broken-link condition where the footer linked
// /privacy and /terms but no pages existed.
//
// Adapted for K-12 student-data context. Treat as a placeholder until legal
// review approves the final language; commit and ship empty rather than
// leaving the link dead. Update via this file directly — copy lives inline
// (legal boilerplate, not marketing) rather than in content/marketing.[locale].js.

import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'

export function generateStaticParams() {
  return localeParams()
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = {
    en: 'Privacy Policy',
    zh: '隐私政策',
  }
  const descriptions = {
    en: 'How DODO Learning collects, uses, and protects information about students and families — including the data we never store.',
    zh: 'DODO 都学书院如何收集、使用并保护学生和家庭信息 — 包括我们从不存储的数据。',
  }
  return buildMetadata({
    locale,
    path:        '/privacy',
    title:       titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
  })
}

const COPY = {
  en: {
    title:    'Privacy Policy',
    updated:  'Last updated: June 2026',
    intro:
      'DODO Learning provides a live, Navigator-led English literacy program ' +
      'for school-age students. We collect a minimum of personal information ' +
      'necessary to enroll a student, deliver instruction, and measure progress. ' +
      'This page describes what we collect, why, and how families can ask us to ' +
      'change or remove it.',
    sections: [
      {
        h: 'What we collect',
        p: [
          'Parent or guardian contact information (name, email, phone) provided during consultation booking and enrollment.',
          'Student first name, age or grade level, and an English-language baseline (Lexile measurement and a brief writing sample) collected during the diagnostic consultation.',
          'Ongoing learning records — session attendance, Lexile growth, 6+1 Trait writing scores, Navigator notes — generated during the program.',
          'Standard website analytics (page views, country, device class) collected to improve site performance. We do not run third-party advertising trackers.',
        ],
      },
      {
        h: 'What we do not collect',
        p: [
          'We do not sell or share family contact information with advertisers.',
          'We do not store payment card data on our own servers; payments are processed by a third-party provider that meets PCI-DSS requirements.',
          'We do not record live one-on-one sessions for resale, distribution, or model training.',
        ],
      },
      {
        h: 'Why we collect it',
        p: [
          'To match each student with a Navigator who fits their level and goals.',
          'To measure reading and writing growth across each 16-week cycle and report progress to families.',
          'To operate the booking, communication, and billing systems the program requires.',
        ],
      },
      {
        h: 'How long we keep it',
        p: [
          'Active learning records are kept for the duration of enrollment plus two years, in case a family returns for a subsequent program cycle.',
          'Contact information for prospects who did not enroll is removed within twelve months of the last interaction.',
          'Families may request earlier deletion at any time (see below).',
        ],
      },
      {
        h: 'Your rights',
        p: [
          'You can request a copy of your child’s learning records, ask us to correct an error, or ask us to delete them entirely.',
          'You can withdraw consent for any optional communication (newsletter, blog updates) without affecting enrollment.',
          'To exercise any of these rights, contact us at the email below. We respond within thirty days.',
        ],
      },
      {
        h: 'Contact',
        p: [
          'Questions about this policy can go to hello@dodolearning.com. Please include the student’s first name (or your relationship to the student) so we can locate the relevant records.',
        ],
      },
    ],
  },
  zh: {
    title:    '隐私政策',
    updated:  '最近更新：2026 年 6 月',
    intro:
      'DODO 都学书院为学龄学生提供导师亲授、全程直播的英语深读课程。' +
      '我们仅收集为学生注册、授课和衡量进步所必需的最少个人信息。本页面' +
      '说明我们收集哪些信息、为何收集，以及家庭如何要求我们更改或删除。',
    sections: [
      {
        h: '我们收集的信息',
        p: [
          '家长或监护人在预约面谈和正式注册时提供的联系方式（姓名、邮箱、电话）。',
          '学生名（不含姓）、年龄或年级，以及在诊断式面谈中采集的英语基线（Lexile 等级和一份简短写作样本）。',
          '课程期间生成的学习记录 — 出勤、Lexile 增长、6+1 写作维度评分、导师批注。',
          '为优化网站性能采集的常规分析数据（页面访问、国家、设备类型）。我们不部署第三方广告追踪器。',
        ],
      },
      {
        h: '我们不会收集的信息',
        p: [
          '我们不会将家庭联系方式出售或共享给广告商。',
          '我们不会在自有服务器上存储支付卡数据；支付由符合 PCI-DSS 要求的第三方服务商处理。',
          '我们不会为转售、传播或模型训练而录制一对一直播课程。',
        ],
      },
      {
        h: '收集这些信息的目的',
        p: [
          '为每位学生匹配水平与目标相符的导师。',
          '在每个十六周周期内衡量阅读与写作的成长，并向家庭汇报进展。',
          '维持课程所需的预约、沟通与计费系统。',
        ],
      },
      {
        h: '我们保留信息的时长',
        p: [
          '正在进行的学习记录保留至学员入学期间及结束后两年，以便家庭后续报读时延续。',
          '未正式注册的咨询者联系方式将在最后一次互动后十二个月内删除。',
          '家庭可随时提前要求删除（见下文联系方式）。',
        ],
      },
      {
        h: '您的权利',
        p: [
          '您可申请获取孩子的学习记录副本，要求更正错误，或要求完整删除。',
          '您可随时撤回对任何可选通讯（简讯、博客更新）的同意，且不影响入学。',
          '行使上述任一权利，请通过下方邮箱与我们联系。我们将在三十天内回复。',
        ],
      },
      {
        h: '联系方式',
        p: [
          '与本政策相关的问题请发送至 hello@dodolearning.com。请注明学生名（或您与学生的关系）以便我们检索相关记录。',
        ],
      },
    ],
  },
}

export default async function PrivacyPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const c = COPY[locale] ?? COPY.en

  return (
    <article className="container-section py-16 md:py-20">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: '#212830' }}>
          {c.title}
        </h1>
        <p className="mt-3 text-sm" style={{ color: '#7B8494' }}>
          {c.updated}
        </p>
        <p className="mt-6 text-base leading-relaxed" style={{ color: '#3D4452' }}>
          {c.intro}
        </p>
      </header>

      <div className="max-w-2xl space-y-10">
        {c.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold mb-3" style={{ color: '#212830' }}>
              {s.h}
            </h2>
            <div className="space-y-3">
              {s.p.map((para, j) => (
                <p key={j} className="text-base leading-relaxed" style={{ color: '#3D4452' }}>
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}
