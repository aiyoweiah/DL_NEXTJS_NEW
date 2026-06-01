'use client'

// components/partners/PartnersClient.jsx
//
// Partners portal — invite-only access for college readiness consultants,
// IECs, and academic advising agencies.
//
// Access mechanism: client-side PIN gate (social access control, not security).
// PIN persisted in localStorage so partners don't re-enter on refresh.
// Content: EN fully rebuilt v2.0. ZH gate content preserved — full ZH
// translation pass pending (use DeepSeek pipeline, same as navigators).
//
// Sections:
//   Hero → Programs (3) → Who Fits → Methodology (4 cards) → What Partners Get → Inquiry CTA
//
// Owned vocabulary discipline:
//   "The Loop", "Navigator", "Lexile", "6+1 Traits", "MCT", "Harvard Project Zero"
//   always rendered in var(--font-latin) regardless of locale.
//
// PIN: dodopartners
// Storage key: dodo_partners_unlocked
// Inquiry email: janet@dodolearning.com

import { useState, useEffect, useRef } from 'react'

// ── Access constants ──────────────────────────────────────────
const CORRECT_PIN = 'dodopartners'
const STORAGE_KEY = 'dodo_partners_unlocked'

// ── Bilingual content ─────────────────────────────────────────
const COPY = {
  en: {
    gate: {
      label:       'Partner Portal',
      body:        'This page is for invited partners.\nEnter your access code to continue.',
      placeholder: 'Access code',
      submit:      'Access Partner Content',
      error:       "That code doesn\u2019t match. Check with your contact at DODO.",
      footer:      "Don\u2019t have a code? Reach out to\u00a0",
    },

    hero: {
      chip: 'Invited Partners',
      h1a:  'For the agencies who build futures.',
      h1b:  '\u00a0We handle the part that',
      h1c:  '\u00a0makes everything else possible.',
      sub:  'Your clients come to you with an outcome in mind \u2014 the right school, the right program, the competitive edge. What stands between most students and that outcome isn\u2019t strategy. It\u2019s the literacy gap: the inability to read dense analytical prose, to argue a position with evidence, to write with the precision that college admissions and academic coursework demand.\n\nDODO Learning closes that gap. We are not a tutoring center. We are a cognitive development program that builds the English thinking capacity your clients\u2019 students need to compete at the highest level.',
      stats: [
        { num: '10,000+', label: 'Hours of instruction delivered'  },
        { num: '300+',    label: 'Students served'                 },
        { num: '75%+',    label: 'Arrive through genuine referrals' },
      ],
    },

    s2: {
      eyebrow: 'Programs',
      h2:      '三大课程方向。精准应对您客户的实际需求。',
      sub:     'Partner-referred students have access to program configurations not available to the general public. Every program includes priority assessment, a dedicated Navigator, and progress reporting at structured intervals.',
      programs: [
        {
          grade:       'Grade 9\u201312',
          title:       'College Readiness Preparation',
          body:        'The students your agencies work with face a specific challenge: they may be academically capable, but their writing hasn\u2019t yet reached the register that competitive college admissions requires.\n\nCollege Readiness Preparation is a focused 16-week program for students in Grades 9\u201312. Working with a dedicated Navigator, students develop the analytical reading and writing capacity that selective admissions actually tests \u2014 not through essay coaching or template writing, but through the deep intellectual work that makes a student\u2019s thinking distinctive and their voice authentic.\n\nBy the end of the program, students can read complex analytical texts with precision, construct evidence-based arguments with clarity, and write across the registers college coursework demands \u2014 from personal narrative to academic prose. Progress is documented. Lexile levels track reading growth. The 6+1 Trait rubric tracks writing development across every dimension. You can show families exactly what changed.',
          suitability: 'Suitable for: Grade 9\u201312 students preparing for North American or international college applications. Particularly effective for students targeting schools with writing-intensive applications or IB/AP coursework requirements.',
          accent:      '#b7b5fe',
        },
        {
          grade:       'Grade 10\u201312',
          title:       'Professional Writing Development',
          body:        'Academic writing at the college level is a different discipline \u2014 not harder versions of high school essays, but a fundamentally different mode of thinking on paper.\n\nProfessional Writing Development is designed for students in Grades 10\u201312 preparing for the writing demands that determine outcomes: IB Extended Essays, college application personal statements, university entrance writing assessments, and the academic prose required from day one of post-secondary study.\n\nThe program builds command over extended argumentation \u2014 the ability to manage a complex claim across multiple pages, to engage with source material analytically rather than decoratively, and to write with the register and precision that admissions committees and university professors recognize immediately. Working with a dedicated Navigator, students move through sustained engagement with serious literary and analytical texts, with every session following the Read \u2192 Think \u2192 Speak \u2192 Write sequence. This is the program for students who are close \u2014 who have the ideas, the intelligence, the ambition \u2014 but whose writing has not yet caught up with their thinking.',
          suitability: 'Suitable for: Grade 10\u201312 students with IB, AP, or pre-university writing demands. Particularly effective for students whose application profile or academic program requires writing that demonstrates original, well-developed thinking.',
          accent:      '#F5C842',
        },
        {
          grade:       'All grades',
          title:       'GPA Navigation',
          body:        'Sustained academic performance is the foundation on which every other element of a college profile rests. When a student\u2019s GPA is under pressure \u2014 from course difficulty, a difficult transition, or a gap in foundational skills \u2014 the entire consulting engagement is at risk.\n\nGPA Navigation provides targeted, Navigator-led academic support designed to stabilize and strengthen a student\u2019s performance in specific subjects, with a particular focus on English coursework and writing-intensive classes. This is not general tutoring. The Navigator works from the student\u2019s actual coursework, identifying where the underlying literacy or composition gaps are creating the performance gap \u2014 and building the specific capabilities that close it. Progress is tracked and reportable.\n\nGPA Navigation is available as a standalone program or in combination with College Readiness Preparation for agencies managing students across multiple areas of need.',
          suitability: 'Suitable for: Students at any grade level experiencing academic performance pressure, particularly in English, Humanities, or writing-intensive coursework.',
          accent:      '#7EC8A0',
        },
      ],
    },

    s3: {
      eyebrow:   'Who Fits',
      h2a:       'We work with partners who',
      h2b:       'think in years, not terms.',
      p1:        'DODO Learning\u2019s partnership program is designed for independent educational consultants, college admission agencies, academic advising firms, and study-abroad placement consultants whose clients are making serious, long-term commitments to academic positioning.',
      p2:        'Partners who understand the fit criteria refer better. Their clients arrive with the right expectations and leave with measurable results. When a client asks \u201cwhere did you find this?\u201d at their six-month check-in \u2014 they\u2019ll say your name first.',
      goodLabel: '\u2713 Right Partner Profile',
      goodItems: [
        'Your consulting work already touches academic readiness \u2014 not just school placement strategy',
        'Your clients ask for evidence and expect to see exactly what changed',
        'You work with students who have genuine capacity but need to close a specific gap',
        'Your agency\u2019s reputation depends on outcomes, not promises',
        'You serve families based in Canada, the US, or preparing for study abroad',
      ],
      notLabel: 'Not the right fit',
      notItems: [
        'Agencies whose primary focus is visa processing or immigration logistics',
        'Test-prep or exam coaching referrals',
        'Students requiring individualized learning support (IEP)',
      ],
    },

    s4: {
      eyebrow: 'Methodology',
      h2:      'When you refer DODO, you co-sign an outcome. Here\u2019s what makes it defensible.',
      sub:     'Every framework below is named, researched, and attributable. Your clients can look it up. Their institutions will recognize it. That\u2019s what makes the referral worth making.',
      cards: [
        {
          label:    'One-on-One Guidance',
          headline: 'A Navigator who is actively in the lecture hall.',
          body:     'Every DODO Learning student works with a dedicated Navigator \u2014 one person, for the full program. What distinguishes our Navigators from the tutoring market is that they are working educators: active faculty with current experience in post-secondary academic writing, literary analysis, and analytical composition.\n\nThey are not teaching from memory. They know what universities and selective institutions are demanding of students right now \u2014 because they are in those lecture halls. For the students your agency works with, that currency matters.',
          color:    '#b7b5fe',
        },
        {
          label:    'Gifted Program Navigation',
          headline: 'Built for the standard selective programs actually use.',
          body:     'DODO Learning\u2019s curriculum is grounded in the Michael Clay Thompson Language Arts framework \u2014 one of the most widely used ELA curricula across North America\u2019s gifted and honors programs. Students who complete a DODO cycle arrive at university entrance assessments, IB coursework, and AP seminars having already worked at that register.\n\nThis is not enrichment. It is preparation at the exact intellectual standard selective institutions are using to evaluate your clients\u2019 students.',
          color:    '#F5C842',
        },
        {
          label:    'Measurable Skill Improvement',
          headline: 'A number before. A number after. Every cycle.',
          body:     'Progress is not reported through impressions or general feedback. Every student\u2019s reading level is tracked using the Lexile Framework \u2014 the same metric used across North American universities and school systems \u2014 with a documented before/after at the close of every 16-week cycle.\n\nWriting is assessed through the 6+1 Trait rubric across all seven dimensions: Ideas, Organization, Voice, Word Choice, Sentence Fluency, Conventions, and Presentation. You will have specific, reportable data to present to your clients at every advising checkpoint.',
          color:    '#7EC8A0',
        },
        {
          label:    'Harvard\u2019s Visible Thinking',
          headline: 'Thinking made visible before writing begins.',
          body:     'Every DODO session is structured around Harvard Project Zero\u2019s Visible Thinking routines \u2014 research-based protocols developed at the Harvard Graduate School of Education and used in university-level academic programs worldwide.\n\nStudents build evidence chains, map inferences, take opposing perspectives, and defend positions in structured oral discussion \u2014 before a single word of their written response is drafted. The writing that results is not a summary. It is a demonstrated academic argument, developed to the standard post-secondary coursework demands.',
          color:    '#b7b5fe',
        },
      ],
    },

    s5: {
      eyebrow: 'For Partners',
      h2:      'A referral relationship built on outcomes, not commission structures.',
      points: [
        {
          label: 'Priority diagnostic assessment',
          body:  'Every referred student receives a free Lexile baseline assessment before enrollment. No obligation. This gives your client a concrete starting point \u2014 and you a proof point to report back.',
        },
        {
          label: 'Progress reporting at structured intervals',
          body:  'Written Lexile progress reports and 6+1 Trait writing assessment summaries at the 8-week and 16-week marks. You\u2019ll know exactly how the referral performed, in time for your next advising conversation.',
        },
        {
          label: 'Partner materials on request',
          body:  'A one-page partner brief, a printable client overview, and a slide deck for client presentations are available on request. Use them in your own consulting workflow.',
        },
        {
          label: 'Direct access',
          body:  'Submit a partner inquiry below. Initial conversations cover your client base, fit criteria, and what the referral relationship looks like in practice.',
        },
      ],
      toolkitLabel: 'Partner toolkit',
      pills: [
        'Free Lexile Assessment',  'Written Progress Reports',
        'Partner Brief (PDF)',     'Slide Deck Available',
        '6+1 Trait Summaries',    'Co-presentation Support',
        'Direct Founder Access',  'EN + ZH Materials',
      ],
      citiesLabel: 'Cities currently served',
      cities:      'Toronto \u00b7 Vancouver \u00b7 Calgary \u00b7 Montreal \u00b7 Richmond BC \u00b7 Markham',
      citiesSub:   'Online delivery \u2014 no geographic constraint',
    },

    s6: {
      chip:    "Let\u2019s Talk",
      h2:      'We work with a small number of partners.',
      sub:     'DODO Learning does not have a sales team. Partnership conversations begin the same way student consultations do: with an honest diagnostic conversation about fit.\n\nIf you serve students who need what we build, we\u2019d like to talk.',
      tagline: 'Think Once. In Both Languages.',
    },
  },

  // ── ZH — gate content preserved. Full content translation pass pending.
  // Use DeepSeek pipeline (same as navigators). Structure mirrors EN exactly.
  zh: {
    gate: {
      label:       '\u5408\u4f5c\u4f19\u4f34\u4e13\u533a',
      body:        '\u6b64\u9875\u9762\u4ec5\u9650\u53d7\u9080\u5408\u4f5c\u4f19\u4f34\u8bbf\u95ee\u3002\n\u8bf7\u8f93\u5165\u8bbf\u95ee\u7801\u4ee5\u7ee7\u7eed\u3002',
      placeholder: '\u8bbf\u95ee\u7801',
      submit:      '\u8fdb\u5165\u5408\u4f5c\u4f19\u4f34\u4e13\u533a',
      error:       '\u8bbf\u95ee\u7801\u4e0d\u5339\u914d\uff0c\u8bf7\u5411\u60a8\u7684DODO\u8054\u7cfb\u4eba\u786e\u8ba4\u3002',
      footer:      '\u6ca1\u6709\u8bbf\u95ee\u7801\uff1f\u8bf7\u8054\u7cfb\u00a0',
    },

    hero: {
      chip: '\u53d7\u9080\u5408\u4f5c\u4f19\u4f34',
      h1a:  '为那些真正在塑造未来的机构。',
      h1b:  '而我们负责的那个部分，',
      h1c:  '让其他一切成为现实。',
      sub:  '您的客户带着明确的目标找到您——心仪的学校、合适的课程、足够竞争优势。而阻碍大多数学生达成这个目标的，并非策略。真正的障碍是读写能力差距：他们读不懂逻辑严密的分析性文章，无法基于证据论证观点，也达不到大学录取和学术课程所要求的写作精度。\n\nDODO Learning 正是弥合这一差距的方案。我们不是英语培训班。我们是一套认知能力发展课程，旨在构建您客户的学生在顶尖学术赛道上竞争所需的英文思维力。',
      stats: [
        { num: '10,000+', label: '\u6388\u8bfe\u603b\u65f6\u6570'          },
        { num: '300+',    label: '\u5df2\u670d\u52a1\u5b66\u751f'          },
        { num: '75%+',    label: '\u901a\u8fc7\u53e3\u7891\u8f6c\u4ecb\u800c\u6765' },
      ],
    },

    s2: {
      eyebrow: '\u8bfe\u7a0b\u914d\u7f6e',
      h2:      '三大课程方向。精准应对您客户的实际需求。',
      sub:     '经合作伙伴转介的学生，将获得非公开的课程配置方案。每个课程均包含优先评估、一位专属的Navigator，以及定期结构化进度报告。',
      programs: [
        {
          grade:       '9–12年级',
          title:       'College Readiness Preparation',
          body:        '您的机构所服务的学生面临一个特定的难题：他们学业上或许很有能力，但写作水准尚未达到顶尖大学录取所要求的学术层次。\n\nCollege Readiness Preparation 是一个为期16周的集中课程，面向9–12年级学生。在专属Navigator的指导下，学生将逐步发展出精英院校招生官真正考察的分析性读写能力——这不是通过申请文书的套路训练或模板化写作，而是通过深度的思维训练，使学生的思考具有独到见解，表达真实而有个人色彩。\n\n课程结束时，学生能够精准阅读复杂的分析性文本，清晰构建基于证据的论点，并驾驭大学课程所要求的各种写作类型——从个人叙事到学术论文。学习进展有据可查：Lexile水平追踪阅读能力的成长，6+1 Trait评分体系记录写作能力的各维度提升。您可以向家庭清晰展示孩子的具体变化。',
          suitability: '适合人群：准备申请北美或国际大学的9–12年级学生。对于目标院校申请材料中写作要求较高、或涉及IB/AP课程的学生，效果尤其显著。',
          accent:      '#b7b5fe',
        },
        {
          grade:       '10–12年级',
          title:       'Professional Writing Development',
          body:        '大学阶段的学术写作是一种不同的技能——它不是高中作文的升级版，而是一种根本不同的纸上思维方式。\n\nProfessional Writing Development 专为10–12年级学生设计，帮助他们迎战决定录取结果的写作任务：IB Extended Essay、大学申请主文书、大学入学写作评估，以及进入大学第一天就需要的学术论文能力。\n\n本课程培养学生掌握长篇论述能力——能够跨多页篇幅发展一个复杂的论点，分析性地运用资料而非仅作装饰性引用，并以招生委员会和大学教授一眼就能识别的学术层次和精准度进行写作。在专属Navigator的带领下，学生持续浸入严肃的文学和分析性文本，每节课都遵循 Read → Think → Speak → Write 的顺序。这套课程是为那些“只差一步”的学生准备的：他们有想法、有才智、有雄心，只是写作尚未追上他们的思考。',
          suitability: '适合人群：有IB、AP或大学预科阶段写作任务的10–12年级学生。对于申请材料或学术项目要求体现具有独到见解且论述完整的思考的学生，效果尤其显著。',
          accent:      '#F5C842',
        },
        {
          grade:       '\u5404\u5e74\u7ea7',
          title:       'GPA Navigation',
          body:        '持续的学业表现是所有大学申请要素的基石。当学生GPA因课程难度、阶段过渡不顺或基础能力缺口而承压时，整个顾问委托关系都会面临风险。\n\nGPA Navigation 提供由Navigator主导的针对性学术支持，旨在稳定并强化学生在具体科目上的表现，尤其聚焦于英语课程和写作要求较高的科目。这不是泛泛的技能培训。Navigator会从学生实际的课业入手，精准定位底层的读写或写作能力缺口如何导致成绩差距，并构建缩小差距所需的特定能力。学习进展全程可追踪、可汇报。\n\nGPA Navigation 可作为独立课程，也可与 College Readiness Preparation 组合使用，便于机构管理那些需要多方位支持的学生。',
          suitability: '适合人群：各年级中面临学业表现压力的学生，尤其是在英语、人文学科或写作要求较高的课程方面。',
          accent:      '#7EC8A0',
        },
      ],
    },

    s3: {
      eyebrow:   '\u9002\u5408\u5408\u4f5c\u7684\u4f19\u4f34',
      h2a:       '\u6211\u4eec\u4e0e\u4ee5\u5e74\u4e3a\u5355\u4f4d',
      h2b:       '\u601d\u8003\u7684\u4f19\u4f34\u5408\u4f5c\u3002',
      p1:        'DODO Learning\u7684\u5408\u4f5c\u9879\u76ee\u9762\u5411\u72ec\u7acb\u6559\u80b2\u987e\u95ee\u3001\u5927\u5b66\u7533\u8bf7\u673a\u6784\u3001\u5b66\u672f\u987e\u95ee\u516c\u53f8\u4ee5\u53ca\u5c31\u8bfb\u5916\u56fd\u987e\u95ee\u516c\u53f8\u3002',
      p2:        '\u7cbe\u51c6\u8f6c\u4ecb\u7684\u4f19\u4f34\u8f6c\u4ecb\u66f4\u597d\u3002\u5f53\u5ba2\u6237\u5728\u516d\u4e2a\u6708\u540e\u95ee\u8d77\u201c\u8fd9\u4e2a\u9879\u76ee\u4f60\u662f\u600e\u4e48\u627e\u5230\u7684\u201d\u2014\u2014\u4ed6\u4eec\u4f1a\u7b2c\u4e00\u4e2a\u63d0\u5230\u60a8\u7684\u540d\u5b57\u3002',
      goodLabel: '\u2713 \u9002\u5408\u5408\u4f5c\u7684\u4f19\u4f34',
      goodItems: [
        '\u60a8\u7684\u987e\u95ee\u5de5\u4f5c\u5df2\u6d89\u53ca\u5b66\u672f\u51c6\u5907\uff0c\u800c\u975e\u4ec5\u9650\u4e8e\u5b66\u6821\u5b89\u7f6e\u7b56\u7565',
        '\u60a8\u7684\u5ba2\u6237\u9700\u8981\u770b\u5230\u5177\u4f53\u6539\u53d8\u7684\u8bc1\u636e',
        '\u60a8\u670d\u52a1\u7684\u5b66\u751f\u6709\u771f\u5b9e\u80fd\u529b\uff0c\u9700\u8981\u5f25\u8865\u67d0\u4e00\u5177\u4f53\u5dee\u8ddd',
        '\u60a8\u673a\u6784\u7684\u58f0\u8a89\u53d6\u51b3\u4e8e\u6210\u679c\u800c\u975e\u627f\u8bfa',
        '\u60a8\u670d\u52a1\u4f4d\u4e8e\u52a0\u62ff\u5927\u3001\u7f8e\u56fd\u6216\u51c6\u5907\u5c31\u8bfb\u6d77\u5916\u7684\u5bb6\u5ead',
      ],
      notLabel: '\u4e0d\u9002\u5408\u5408\u4f5c\u7684\u60c5\u51b5',
      notItems: [
        '\u4ee5\u7b7e\u8bc1\u529e\u7406\u6216\u79fb\u6c11\u4e8b\u52a1\u4e3a\u4e3b\u8981\u4e1a\u52a1\u7684\u673a\u6784',
        '\u8003\u8bd5\u5907\u8003\u6216\u5e94\u8bd5\u8f85\u5bfc\u8f6c\u4ecb',
        '\u9700\u8981\u4e2a\u6027\u5316\u5b66\u4e60\u652f\u6301\u8ba1\u5212\uff08IEP\uff09\u7684\u5b66\u751f',
      ],
    },

    s4: {
      eyebrow: '\u65b9\u6cd5\u8bba\u4f9d\u636e',
      h2:      '\u5f53\u60a8\u8f6c\u4ecbDODO\uff0c\u60a8\u5728\u4e3a\u4e00\u4e2a\u7ed3\u679c\u80cc\u4e66\u3002\u4ee5\u4e0b\u662f\u8fd9\u4e2a\u80cc\u4e66\u7684\u5e95\u6c14\u6240\u5728\u3002',
      sub:     '\u4ee5\u4e0b\u6bcf\u4e2a\u6846\u67b6\u90fd\u6709\u540d\u79f0\u3001\u6709\u7814\u7a76\u652f\u6491\u3001\u53ef\u6eba\u6e90\u67e5\u8bc1\u3002\u60a8\u7684\u5ba2\u6237\u53ef\u4ee5\u81ea\u884c\u67e5\u9605\u3002',
      cards: [
        {
          label:    'One-on-One Guidance',
          headline: 'Navigator 就在课堂一线。',
          body:     '每位 DODO Learning 的学生都拥有一位专属的 Navigator——全程一对一，始终是同一个人。我们的Navigator与市面上一般的英语课外教师的根本区别在于，他们是真正的在职教育工作者：活跃于一线的高校教师，具备当前大学及以上阶段学术写作、文学分析和分析性写作的实战经验。\n\n他们不是凭记忆教学。他们清楚当下大学和精英院校对学生要求的是什么——因为他们就在那些课堂里。对于您机构所服务的学生而言，这份实时、真切的现实感，至关重要。',
          color:    '#b7b5fe',
        },
        {
          label:    'Gifted Program Navigation',
          headline: '匹配优才项目的真实标准。',
          body:     'DODO Learning 的课程基于 Michael Clay Thompson Language Arts 框架——这是北美英才及荣誉课程中使用最广泛的英语语言艺术课程之一。完成 DODO 课程周期的学生，在参加大学入学测评、IB课程和AP研讨班之前，就已经达到了相应的学术写作层次。\n\n这不是兴趣拓展。这是直接对标精英院校用于评估您客户学生的智力标准，所做的前置准备。',
          color:    '#F5C842',
        },
        {
          label:    'Measurable Skill Improvement',
          headline: 'A number before. A number after. Every cycle.',
          body:     '\u6bcf\u4e2a\u5b66\u751f\u7684\u9605\u8bfb\u6c34\u5e73\u5747\u901a\u8fc7Lexile\u6846\u67b6\u8fdb\u884c\u8ffd\u8e2a\uff0c\u5728\u6bcf\u4e2a16\u5468\u5468\u671f\u7ed3\u675f\u65f6\u63d0\u4f9b\u524d\u540e\u5bf9\u6bd4\u3002\u5199\u4f5c\u8fdb\u5ea6\u901a\u8fc76+1 Trait\u8bc4\u4f30\u5168\u9762\u8bb0\u5f55\u3002\u60a8\u5c06\u62e5\u6709\u53ef\u5411\u5ba2\u6237\u62a5\u544a\u7684\u5177\u4f53\u6570\u636e\u3002',
          color:    '#7EC8A0',
        },
        {
          label:    'Harvard\u2019s Visible Thinking',
          headline: 'Thinking made visible before writing begins.',
          body:     '\u6bcf\u8282DODO\u8bfe\u7a0b\u5747\u56f4\u7ed5Harvard Project Zero\u7684Visible Thinking\u534f\u5f0f\u5c55\u5f00\u2014\u2014\u7531\u54c8\u4f5b\u6559\u80b2\u7814\u7a76\u751f\u9662\u7814\u53d1\u7684\u5faa\u8bc1\u601d\u7ef4\u534f\u8bae\u3002\u5b66\u751f\u5728\u5199\u4f5c\u5f00\u59cb\u524d\u5c31\u5b8c\u6210\u8bba\u8bc1\u94fe\u6784\u5efa\u548c\u5f00\u653e\u6027\u8bba\u8ff0\u8bad\u7ec3\u3002',
          color:    '#b7b5fe',
        },
      ],
    },

    s5: {
      eyebrow: '\u5408\u4f5c\u4f19\u4f34\u652f\u6301',
      h2:      '\u4ee5\u6210\u679c\u4e3a\u57fa\u7840\u7684\u5408\u4f5c\u5173\u7cfb\uff0c\u800c\u975e\u4ee5\u4f63\u91d1\u7ed3\u6784\u4e3a\u57fa\u7840\u3002',
      points: [
        {
          label: '\u4f18\u5148\u8bc4\u4f30',
          body:  '\u6bcf\u4e2a\u88ab\u8f6c\u4ecb\u7684\u5b66\u751f\u5728\u5165\u5b66\u524d\u5747\u53ef\u514d\u8d39\u8fdb\u884cLexile\u57fa\u7ebf\u8bc4\u4f30\u3002\u8fd9\u4e3a\u60a8\u7684\u5ba2\u6237\u63d0\u4f9b\u4e86\u660e\u786e\u7684\u8d77\u70b9\uff0c\u4e5f\u4e3a\u60a8\u63d0\u4f9b\u4e86\u53ef\u5f15\u7528\u7684\u4f9d\u636e\u3002',
        },
        {
          label: '\u7ed3\u6784\u5316\u8fdb\u5ea6\u62a5\u544a',
          body:  '\u5728\u7b2c8\u5468\u548c\u7b2c16\u5468\u63d0\u4f9b\u4e66\u9762\u7684Lexile\u8fdb\u5c55\u62a5\u544a\u548c6+1 Trait\u5199\u4f5c\u8bc4\u4f30\u6458\u8981\u3002\u60a8\u5c06\u786e\u5207\u4e86\u89e3\u8fd9\u6b21\u8f6c\u4ecb\u7684\u6210\u6548\u3002',
        },
        {
          label: '\u53ef\u6309\u9700\u63d0\u4f9b\u6750\u6599',
          body:  '\u4e00\u9875\u7eb8\u5408\u4f5c\u4f19\u4f34\u7b80\u4ecb\u3001\u53ef\u6253\u5370\u7684\u5ba2\u6237\u6982\u89c8\uff0c\u4ee5\u53ca\u7528\u4e8e\u5ba2\u6237\u6f14\u793a\u7684\u5e7b\u706f\u7247\u3002\u4ee5\u60a8\u4e60\u60ef\u7684\u8bed\u8a00\u4f7f\u7528\u3002',
        },
        {
          label: '\u76f4\u63a5\u8054\u7cfb',
          body:  '\u901a\u8fc7\u4e0b\u65b9\u8868\u5355\u63d0\u4ea4\u5408\u4f5c\u6d3d\u8be2\u3002\u521d\u59cb\u6c9f\u901a\u5185\u5bb9\u5305\u62ec\u60a8\u7684\u5ba2\u6237\u7fa4\u4f53\u3001\u5339\u914d\u6807\u51c6\u4ee5\u53ca\u5408\u4f5c\u5173\u7cfb\u7684\u5177\u4f53\u5f62\u5f0f\u3002',
        },
      ],
      toolkitLabel: '\u5408\u4f5c\u4f19\u4f34\u5de5\u5177\u5305',
      pills: [
        '\u514d\u8d39Lexile\u8bc4\u4f30',         '\u4e66\u9762\u8fdb\u5c55\u62a5\u544a',
        '\u5408\u4f5c\u7b80\u4ecb\uff08PDF\uff09',  '\u53ef\u63d0\u4f9b\u5e7b\u706f\u7247',
        '6+1 Trait\u8bc4\u4f30\u6458\u8981',      '\u8054\u5408\u6f14\u793a\u652f\u6301',
        '\u76f4\u63a5\u8054\u7cfb\u521b\u59cb\u4eba', '\u4e2d\u82f1\u53cc\u8bed\u6750\u6599',
      ],
      citiesLabel: '\u5f53\u524d\u670d\u52a1\u57ce\u5e02',
      cities:      '\u591a\u4f26\u591a \u00b7 \u6e29\u54e5\u534e \u00b7 \u5361\u5c14\u52a0\u91cc \u00b7 \u8499\u7279\u5229\u5c14 \u00b7 \u5217\u6cbb\u6587 \u00b7 \u9a6c\u514b\u6c49',
      citiesSub:   '\u7ebf\u4e0a\u6388\u8bfe\u2014\u2014\u4e0d\u53d7\u5730\u57df\u9650\u5236',
    },

    s6: {
      chip:    '\u7acb\u5373\u6c9f\u901a',
      h2:      '\u6211\u4eec\u4e0e\u5c11\u6570\u4f18\u8d28\u4f19\u4f34\u5408\u4f5c\u3002',
      sub:     'DODO Learning\u6ca1\u6709\u9500\u552e\u56e2\u961f\u3002\u5408\u4f5c\u6d3d\u8be2\u4e0e\u5b66\u751f\u8bc4\u4f30\u7684\u5f00\u59cb\u65b9\u5f0f\u76f8\u540c\uff1a\u4e00\u6b21\u5bf9\u5408\u9002\u6027\u7684\u8bda\u5b9e\u8bc4\u4f30\u3002\n\n\u5982\u679c\u60a8\u670d\u52a1\u7684\u5b66\u751f\u9700\u8981\u6211\u4eec\u6240\u6784\u5efa\u7684\u80fd\u529b\uff0c\u6211\u4eec\u671f\u5f85\u4e0e\u60a8\u6c9f\u901a\u3002',
      tagline: '\u4e00\u6b21\u601d\u8003\uff0c\u53cc\u8bed\u7686\u901a\u3002',
    },
  },
}

// ── Font helper ───────────────────────────────────────────────
const font = (locale) => locale === 'zh' ? 'var(--font-cjk)' : 'var(--font-latin)'

// ── Sub-components ────────────────────────────────────────────
function Eyebrow({ children, center = false, dark = false, locale = 'en' }) {
  return (
    <div style={{
      fontFamily:    font(locale),
      fontWeight:    500,
      fontSize:      '12px',
      letterSpacing: locale === 'zh' ? '0.06em' : '0.1em',
      textTransform: 'uppercase',
      color:         dark ? '#b7b5fe' : '#5856cc',
      marginBottom:  '16px',
      textAlign:     center ? 'center' : undefined,
    }}>
      {children}
    </div>
  )
}

function Pill({ children, locale = 'en' }) {
  return (
    <span style={{
      display:         'inline-block',
      fontFamily:      font(locale),
      fontSize:        '12px',
      fontWeight:      500,
      color:           '#b7b5fe',
      backgroundColor: 'rgba(183,181,254,0.12)',
      border:          '1px solid rgba(183,181,254,0.25)',
      borderRadius:    '9999px',
      padding:         '4px 12px',
      marginRight:     '8px',
      marginBottom:    '8px',
    }}>
      {children}
    </span>
  )
}

// ── Gate view (locked) ────────────────────────────────────────
function GateView({ g, locale, input, setInput, onSubmit, onKeyDown, error, shake }) {
  return (
    <div style={{
      minHeight:       '100dvh',
      display:         'flex',
      flexDirection:   'column',
      alignItems:      'center',
      justifyContent:  'center',
      backgroundColor: '#0E0E12',
      padding:         '2rem',
      fontFamily:      font(locale),
    }}>
      <style>{`
        @keyframes gate-shake {
          0%   { transform: translateX(0);    }
          15%  { transform: translateX(-7px); }
          30%  { transform: translateX(7px);  }
          45%  { transform: translateX(-5px); }
          60%  { transform: translateX(5px);  }
          75%  { transform: translateX(-3px); }
          90%  { transform: translateX(3px);  }
          100% { transform: translateX(0);    }
        }
        .gate-shake { animation: gate-shake 0.55s ease; }
        .gate-input:focus {
          outline:      none;
          border-color: #b7b5fe;
          box-shadow:   0 0 0 3px rgba(183,181,254,0.15);
        }
        .gate-btn:hover  { background-color: #c8c6ff; }
        .gate-btn:active { transform: scale(0.97); }
      `}</style>

      <div style={{ marginBottom: '48px', opacity: 0.9 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-dark.svg" alt="DODO Learning" width={120} height={40} style={{ display: 'block' }} />
      </div>

      <div
        className={shake ? 'gate-shake' : ''}
        style={{
          width:           '100%',
          maxWidth:        '400px',
          backgroundColor: '#161820',
          border:          '1px solid rgba(183,181,254,0.18)',
          borderRadius:    '16px',
          padding:         '40px 36px',
          boxShadow:       '0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b7b5fe', marginBottom: '12px', textAlign: 'center' }}>
          {g.label}
        </div>
        <p style={{ fontSize: '15px', fontWeight: 400, color: 'rgba(240,240,240,0.6)', lineHeight: 1.6, textAlign: 'center', marginBottom: '32px', whiteSpace: 'pre-line' }}>
          {g.body}
        </p>
        <input
          className="gate-input"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder={g.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          style={{
            display:         'block',
            width:           '100%',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border:          `1px solid ${error ? 'rgba(255,100,100,0.5)' : 'rgba(183,181,254,0.25)'}`,
            borderRadius:    '10px',
            padding:         '14px 16px',
            fontSize:        '15px',
            fontWeight:      400,
            color:           '#F0F0F0',
            fontFamily:      font(locale),
            letterSpacing:   '0.08em',
            marginBottom:    error ? '10px' : '20px',
            transition:      'border-color 0.2s, box-shadow 0.2s',
            boxSizing:       'border-box',
          }}
        />
        {error && (
          <p style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(255,120,120,0.85)', textAlign: 'center', marginBottom: '16px', lineHeight: 1.4 }}>
            {g.error}
          </p>
        )}
        <button
          className="gate-btn"
          onClick={onSubmit}
          style={{
            display:         'block',
            width:           '100%',
            backgroundColor: '#b7b5fe',
            color:           '#0E0E12',
            fontSize:        '15px',
            fontWeight:      600,
            fontFamily:      font(locale),
            padding:         '14px 24px',
            borderRadius:    '10px',
            border:          'none',
            cursor:          'pointer',
            transition:      'background-color 0.15s, transform 0.1s',
          }}
        >
          {g.submit}
        </button>
      </div>

      <p style={{ marginTop: '32px', fontSize: '13px', fontWeight: 400, color: 'rgba(240,240,240,0.25)', textAlign: 'center', lineHeight: 1.5 }}>
        {g.footer}
        <a href="mailto:janet@dodolearning.com" style={{ color: 'rgba(183,181,254,0.6)', textDecoration: 'none' }}>
          janet@dodolearning.com
        </a>
      </p>
    </div>
  )
}

// ── Partner Cal.com Embed ─────────────────────────────────────
// Mirrors ConsultCalEmbed pattern. Namespace 'partner' is distinct
// from 'consult' so both can coexist in the same browser session.
// calLink: 'dodo-learning/consult' — update if a dedicated partner
// booking link is created on Cal.com.
function PartnerCalEmbed() {
  const initialised = useRef(false)

  useEffect(() => {
    if (initialised.current) return
    initialised.current = true

    ;(function (C, A, L) {
      const p = (a, ar) => { a.q.push(ar) }
      const d = C.document
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal
          const ar  = arguments
          if (!cal.loaded) {
            cal.ns  = {}
            cal.q   = cal.q || []
            const s = d.createElement('script')
            s.src   = A
            d.head.appendChild(s)
            cal.loaded = true
          }
          if (ar[0] === L) {
            const api       = function () { p(api, arguments) }
            const namespace = ar[1]
            api.q = api.q || []
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api
              p(cal.ns[namespace], ar)
              p(cal, ['initNamespace', namespace])
            } else {
              p(cal, ar)
            }
            return
          }
          p(cal, ar)
        }
    })(window, 'https://app.cal.com/embed/embed.js', 'init')

    Cal('init', 'partner', { origin: 'https://app.cal.com' })

    Cal.ns.partner('inline', {
      elementOrSelector: '#my-cal-inline-partner',
      config: {
        layout:                    'week_view',
        useSlotsViewOnSmallScreen: 'true',
      },
      calLink: 'dodo-learning/consult',
    })

    Cal.ns.partner('ui', {
      cssVarsPerTheme: {
        light: { 'cal-brand': '#F5F5FF' },
        dark:  { 'cal-brand': '#b7b5fe' },
      },
      hideEventTypeDetails: false,
      layout:               'week_view',
    })
  }, [])

  return (
    <div
      id="my-cal-inline-partner"
      style={{ width: '100%', height: '700px', overflow: 'scroll', borderRadius: '1rem' }}
    />
  )
}

// ── Unlocked content ──────────────────────────────────────────
function PartnersContent({ c, locale }) {
  const f = font(locale)

  return (
    <div style={{ fontFamily: f, width: '100%', overflow: 'hidden' }}>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section style={{
        minHeight:       'min(90dvh, 780px)',
        display:         'flex',
        flexDirection:   'column',
        justifyContent:  'flex-end',
        position:        'relative',
        overflow:        'hidden',
        backgroundColor: '#0E0E12',
        paddingTop:      'calc(var(--nav-height) + 4rem)',
        paddingBottom:   '5rem',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bg-partners-hero.webp"
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 55%', display: 'block' }}
        />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(108deg, rgba(14,14,18,0.97) 0%, rgba(14,14,18,0.93) 32%, rgba(14,14,18,0.70) 58%, rgba(14,14,18,0.30) 100%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,14,18,0.90) 0%, transparent 32%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 50% at 15% 62%, rgba(183,181,254,0.10) 0%, transparent 65%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '-40px', right: '-40px', fontSize: '320px', fontWeight: 700, color: '#b7b5fe', opacity: 0.028, lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none', pointerEvents: 'none', fontFamily: 'var(--font-latin)' }}>
          PARTNER
        </div>

        <div className="px-6 relative z-10" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(183,181,254,0.1)', border: '1px solid rgba(183,181,254,0.25)', borderRadius: '9999px', padding: '5px 14px', marginBottom: '32px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '9999px', backgroundColor: '#b7b5fe', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#b7b5fe', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.hero.chip}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.15, maxWidth: '820px', marginBottom: '28px', fontFamily: 'var(--font-latin)' }}>
            {c.hero.h1a}<span style={{ color: '#b7b5fe' }}>{c.hero.h1b}</span>{c.hero.h1c}
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 400, color: 'rgba(240,240,240,0.55)', lineHeight: 1.7, maxWidth: '640px', marginBottom: '48px', whiteSpace: 'pre-line' }}>
            {c.hero.sub}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
            {c.hero.stats.map(({ num, label }) => (
              <div key={label}>
                <div style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 700, color: '#b7b5fe', lineHeight: 1, fontFamily: 'var(--font-latin)' }}>{num}</div>
                <div style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(240,240,240,0.45)', marginTop: '5px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S2 PROGRAMS ───────────────────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: '#212830' }}>
        <div className="container-section">
          <Eyebrow dark center locale={locale}>{c.s2.eyebrow}</Eyebrow>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.25, maxWidth: '760px', margin: '0 auto 16px', textAlign: 'center', fontFamily: 'var(--font-latin)' }}>
            {c.s2.h2}
          </h2>
          <p style={{ fontSize: '16px', fontWeight: 400, color: 'rgba(240,240,240,0.5)', lineHeight: 1.65, maxWidth: '600px', margin: '0 auto 56px', textAlign: 'center' }}>
            {c.s2.sub}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
            {c.s2.programs.map(({ grade, title, body, suitability, accent }) => (
              <div key={title} style={{ backgroundColor: '#2E3848', borderRadius: '16px', overflow: 'hidden', borderLeft: `4px solid ${accent}` }}>
                <div style={{ padding: '36px 40px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2, fontFamily: 'var(--font-latin)', margin: 0 }}>
                      {title}
                    </h3>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: accent, backgroundColor: `${accent}18`, border: `1px solid ${accent}40`, borderRadius: '9999px', padding: '4px 14px', whiteSpace: 'nowrap', fontFamily: 'var(--font-latin)' }}>
                      {grade}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                    {body.split('\n\n').map((para, i) => (
                      <p key={i} style={{ fontSize: '15px', fontWeight: 400, color: 'rgba(240,240,240,0.7)', lineHeight: 1.7, margin: 0, fontFamily: f }}>
                        {para}
                      </p>
                    ))}
                  </div>
                  <p style={{ fontSize: '13px', fontStyle: 'italic', color: `${accent}CC`, lineHeight: 1.55, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px', margin: 0, fontFamily: 'var(--font-latin)' }}>
                    {suitability}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S3 WHO FITS ───────────────────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: '#F5F5FF' }}>
        <div className="container-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <Eyebrow locale={locale}>{c.s3.eyebrow}</Eyebrow>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0E0E12', lineHeight: 1.25, marginBottom: '24px', fontFamily: 'var(--font-latin)' }}>
                {c.s3.h2a}<br /><span style={{ color: '#5856cc' }}>{c.s3.h2b}</span>
              </h2>
              <p style={{ fontSize: '16px', fontWeight: 400, color: '#3D4452', lineHeight: 1.65, marginBottom: '20px' }}>{c.s3.p1}</p>
              <p style={{ fontSize: '16px', fontWeight: 400, color: '#3D4452', lineHeight: 1.65 }}>{c.s3.p2}</p>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid rgba(14,14,18,0.1)', overflow: 'hidden' }}>
              <div style={{ padding: '28px 32px', borderBottom: '1px solid rgba(14,14,18,0.08)' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7EC8A0', marginBottom: '16px' }}>{c.s3.goodLabel}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {c.s3.goodItems.map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ color: '#7EC8A0', fontWeight: 700, marginTop: '2px', flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: '15px', fontWeight: 400, color: '#212830', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: '28px 32px', backgroundColor: '#FAFAFA' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(14,14,18,0.4)', marginBottom: '16px' }}>{c.s3.notLabel}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {c.s3.notItems.map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ color: 'rgba(14,14,18,0.3)', fontWeight: 700, marginTop: '2px', flexShrink: 0 }}>—</span>
                      <span style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(14,14,18,0.45)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S4 METHODOLOGY ────────────────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: '#0E0E12' }}>
        <div className="container-section">
          <Eyebrow dark center locale={locale}>{c.s4.eyebrow}</Eyebrow>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.25, maxWidth: '720px', margin: '0 auto 16px', textAlign: 'center', fontFamily: 'var(--font-latin)' }}>
            {c.s4.h2}
          </h2>
          <p style={{ fontSize: '16px', fontWeight: 400, color: 'rgba(240,240,240,0.5)', lineHeight: 1.65, maxWidth: '560px', margin: '0 auto 56px', textAlign: 'center' }}>
            {c.s4.sub}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.s4.cards.map(({ label, headline, body, color }) => (
              <div key={label} style={{ backgroundColor: '#1A1C24', borderRadius: '16px', padding: '36px', border: '1px solid rgba(255,255,255,0.07)', borderTop: `3px solid ${color}` }}>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color, opacity: 0.85, marginBottom: '12px', fontFamily: 'var(--font-latin)' }}>
                  {label}
                </div>
                <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.3, marginBottom: '20px', fontFamily: 'var(--font-latin)' }}>
                  {headline}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {body.split('\n\n').map((para, i) => (
                    <p key={i} style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(240,240,240,0.6)', lineHeight: 1.7, margin: 0, fontFamily: f }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S5 WHAT PARTNERS GET ──────────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: '#212830' }}>
        <div className="container-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <Eyebrow dark locale={locale}>{c.s5.eyebrow}</Eyebrow>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.25, marginBottom: '28px', fontFamily: 'var(--font-latin)' }}>
                {c.s5.h2}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {c.s5.points.map(({ label, body }) => (
                  <div key={label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: '#b7b5fe', marginTop: '8px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: '#F0F0F0', marginBottom: '4px' }}>{label}</div>
                      <p style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(240,240,240,0.6)', lineHeight: 1.65, margin: 0 }}>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: '#2E3848', borderRadius: '20px', padding: '40px 36px', border: '1px solid rgba(183,181,254,0.12)' }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(240,240,240,0.4)', marginBottom: '20px', letterSpacing: '0.05em' }}>
                {c.s5.toolkitLabel}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '32px' }}>
                {c.s5.pills.map((tag) => <Pill key={tag} locale={locale}>{tag}</Pill>)}
              </div>
              <div style={{ borderTop: '1px solid rgba(183,181,254,0.12)', paddingTop: '28px' }}>
                <div style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(240,240,240,0.4)', marginBottom: '4px' }}>{c.s5.citiesLabel}</div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: 'rgba(240,240,240,0.75)', lineHeight: 1.6 }}>{c.s5.cities}</div>
                <div style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(240,240,240,0.35)', marginTop: '4px' }}>{c.s5.citiesSub}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S6 PARTNER INQUIRY ────────────────────────────── */}
      <section className="px-6 py-32" style={{ backgroundColor: '#0E0E12' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(183,181,254,0.08)', border: '1px solid rgba(183,181,254,0.2)', borderRadius: '9999px', padding: '5px 16px', marginBottom: '32px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#b7b5fe', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#b7b5fe', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.s6.chip}</span>
          </div>

          <h2 style={{ fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.2, marginBottom: '20px', fontFamily: 'var(--font-latin)' }}>
            {c.s6.h2}
          </h2>
          <p style={{ fontSize: '18px', fontWeight: 400, color: 'rgba(240,240,240,0.55)', lineHeight: 1.7, marginBottom: '52px', whiteSpace: 'pre-line' }}>
            {c.s6.sub}
          </p>

          <PartnerCalEmbed />

          <p style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(240,240,240,0.2)', marginTop: '32px', textAlign: 'center' }}>
            {c.s6.tagline}
          </p>
        </div>
      </section>

    </div>
  )
}

// ── Main export ───────────────────────────────────────────────
export default function PartnersClient({ locale }) {
  const c = COPY[locale] ?? COPY.en

  const [input,    setInput]    = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error,    setError]    = useState(false)
  const [shake,    setShake]    = useState(false)
  const [mounted,  setMounted]  = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') setUnlocked(true)
    } catch {}
  }, [])

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === CORRECT_PIN) {
      try { localStorage.setItem(STORAGE_KEY, '1') } catch {}
      setError(false)
      setUnlocked(true)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSubmit() }

  if (!mounted) return <div style={{ minHeight: '100dvh', backgroundColor: '#0E0E12' }} />

  if (!unlocked) {
    return (
      <GateView
        g={c.gate}
        locale={locale}
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        error={error}
        shake={shake}
      />
    )
  }

  return <PartnersContent c={c} locale={locale} />
}