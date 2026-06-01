// app/[locale]/terms/page.jsx
//
// Terms of Use — bilingual stub.
// Replaces a long-standing broken-link condition where the footer linked
// /privacy and /terms but no pages existed.
//
// Adapted for K-12 student-data context. Treat as a placeholder until legal
// review approves the final language; commit and ship rather than leaving
// the footer link dead. Update via this file directly — copy lives inline
// (legal boilerplate, not marketing).

import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'

export function generateStaticParams() {
  return localeParams()
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = {
    en: 'Terms of Use',
    zh: '使用条款',
  }
  const descriptions = {
    en: 'The terms that govern your use of the DODO Learning website and the 16-Week Program. Plain-language summary plus the operative clauses.',
    zh: 'DODO 都学书院网站及十六周课程的使用条款 — 通俗摘要与正式条款。',
  }
  return buildMetadata({
    locale,
    path:        '/terms',
    title:       titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
  })
}

const COPY = {
  en: {
    title:   'Terms of Use',
    updated: 'Last updated: June 2026',
    intro:
      'These terms govern your use of dodolearning.com and the DODO Learning ' +
      '16-Week Program. By booking a consultation, enrolling a student, or ' +
      'creating an account, you agree to the terms below.',
    sections: [
      {
        h: 'Who we are',
        p: [
          'DODO Learning is operated by DODO Learning Inc., incorporated in Canada. We provide a live, Navigator-led English literacy program to school-age students worldwide.',
        ],
      },
      {
        h: 'Eligibility',
        p: [
          'Enrollment requires a parent or legal guardian to book the diagnostic consultation, complete intake, and authorize payment for any cycle the student attends.',
          'Students under 18 use the service through their parent or guardian; the parent or guardian is the account holder.',
        ],
      },
      {
        h: 'The diagnostic consultation',
        p: [
          'The diagnostic consultation is free. It is not a sales call — it is an honest fit assessment. We only enroll students we can demonstrably help.',
          'Booking a consultation does not create any obligation to enroll.',
        ],
      },
      {
        h: 'Enrollment and payment',
        p: [
          'The 16-Week Program is billed by cycle. Pricing and the payment schedule are presented in writing before any payment is taken.',
          'Refund eligibility, mid-cycle pauses, and cycle-to-cycle continuation are handled per the enrollment agreement we issue at the start of each cycle.',
          'We reserve the right to decline or end an enrollment when continuing would not serve the student — for example, when the program is not a good fit for their needs.',
        ],
      },
      {
        h: 'Use of the website and gated content',
        p: [
          'Public pages on dodolearning.com may be used freely for personal, non-commercial reference.',
          'Gated content — including the Reading Companion audiobook library, partner materials, and any member-only resources — is licensed for use by enrolled students and their immediate family during the period of enrollment. Sharing access credentials or redistributing gated content is not permitted.',
          'You may not scrape, mirror, or train machine learning models on our content without our written permission.',
        ],
      },
      {
        h: 'Intellectual property',
        p: [
          'All curriculum materials, Navigator notes, lesson recordings (where created), assessments, and copy on this site are the intellectual property of DODO Learning Inc. or our licensors.',
          'Student-produced work belongs to the student; DODO Learning may use anonymized excerpts to illustrate program outcomes (for example, anonymized writing samples on /results) unless the family opts out in writing.',
        ],
      },
      {
        h: 'Disclaimers',
        p: [
          'We measure progress in Lexile and 6+1 Trait scores and report it honestly. We do not guarantee a specific test score, admissions outcome, or grade-level placement.',
          'The site is provided as-is. We work to keep it available but do not guarantee uninterrupted access.',
        ],
      },
      {
        h: 'Changes to these terms',
        p: [
          'We may update these terms from time to time. The "Last updated" date above reflects the current version. Material changes will be communicated to active families by email before they take effect.',
        ],
      },
      {
        h: 'Contact',
        p: [
          'Questions about these terms can go to hello@dodolearning.com.',
        ],
      },
    ],
  },
  zh: {
    title:   '使用条款',
    updated: '最近更新：2026 年 6 月',
    intro:
      '本条款约束您对 dodolearning.com 网站及 DODO 都学书院十六周课程的使用。' +
      '预约面谈、为学生注册或创建账户即视为您同意以下条款。',
    sections: [
      {
        h: '关于我们',
        p: [
          'DODO 都学书院由在加拿大注册的 DODO Learning Inc. 运营。我们为全球学龄学生提供导师亲授、全程直播的英语深读课程。',
        ],
      },
      {
        h: '资格',
        p: [
          '注册需由家长或法定监护人预约诊断式面谈、完成入学手续，并为学生所参加的任一周期授权付款。',
          '未满 18 周岁的学生须由家长或监护人代为使用本服务；账户持有人为家长或监护人。',
        ],
      },
      {
        h: '诊断式面谈',
        p: [
          '诊断式面谈免费。这并非销售电话 — 而是一次诚实的匹配评估。我们只录取我们能确实帮助到的学生。',
          '预约面谈不构成任何注册义务。',
        ],
      },
      {
        h: '注册与付款',
        p: [
          '十六周课程按周期计费。价格与付款日程将在收取任何款项前以书面形式呈现。',
          '退款资格、周期中暂停以及周期之间的衔接，按每个周期开始时签订的入学协议处理。',
          '若继续课程无益于学生（例如课程与其需求不匹配），我们保留拒绝或终止注册的权利。',
        ],
      },
      {
        h: '网站与受保护内容的使用',
        p: [
          'dodolearning.com 上的公开页面可供您个人非商业性查阅。',
          '受保护内容 — 包括「阅读伴」有声书库、合作伙伴材料及任何学员专属资源 — 仅授权在校学员及其直系家庭于入学期间使用。共享访问凭据或转载受保护内容均不允许。',
          '未经书面许可，您不得对本网站内容进行抓取、镜像，或用于训练机器学习模型。',
        ],
      },
      {
        h: '知识产权',
        p: [
          '所有课程材料、导师批注、课堂录像（如制作）、评估及本站文案均为 DODO Learning Inc. 或其授权方的知识产权。',
          '学生作品归学生所有；除非家庭书面声明退出，DODO 都学书院可使用匿名节选用于展示课程成效（例如 /results 页面上的匿名写作样本）。',
        ],
      },
      {
        h: '免责声明',
        p: [
          '我们以 Lexile 等级和 6+1 写作维度衡量进展，并据实汇报。我们不承诺任何特定考试成绩、录取结果或年级安置。',
          '本网站按现状提供。我们努力保持其可用性，但不保证不中断访问。',
        ],
      },
      {
        h: '条款变更',
        p: [
          '本条款可能不时更新。上方「最近更新」日期反映当前版本。重大变更将在生效前通过邮件通知在校家庭。',
        ],
      },
      {
        h: '联系方式',
        p: [
          '与本条款相关的问题请发送至 hello@dodolearning.com。',
        ],
      },
    ],
  },
}

export default async function TermsPage({ params }) {
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
