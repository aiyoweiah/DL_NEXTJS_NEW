// content/zh.js
//
// Central ZH translation file.
// Must mirror content/en.js exactly — same export names, same key structure.
//
// Populate each export alongside its EN counterpart when that page is built.
// Any missing or empty export falls back to EN automatically via lib/i18n.js.
//
// Translation notes:
//   - Brand terms are NOT translated — use them as-is in Chinese copy:
//     Navigators / The Hangar / The Loop / The 16-Week Program /
//     Bilingual Thinker / Charter Enrollment / Lexile / 6+1 Trait
//   - Tagline is always: Think Once. In Both Languages.
//   - Numbers (Lexile scores, weeks, grade levels) are identical to EN.

// ── Program ───────────────────────────────────────────────────
export const program = {
  meta: {
    title: '16周项目',
    description:
      '由Navigator主导的双语思维项目。用英语阅读、思考、表达和写作——以Lexile阅读水平和6+1特质写作框架衡量进步。十六周内提升一个年级水平。',
  },

  hero: {
    eyebrow:      '16周项目',
    heading:      '用两种语言思考、领导，需要什么？',
    subheading:
      '不是更多词汇练习，也不是另一位家教。这是一套结构化的方法，训练完整的认知循环：阅读 → 思考 → 表达 → 写作。从第一天起就有数据衡量。',
    ctaPrimary:   '预约咨询',
    ctaSecondary: '观看示范课',
  },

  proof: {
    stats: [
      {
        id:     'lexile',
        number: '1.2',
        unit:   '个年级',
        label:  '16周内平均Lexile阅读提升',
      },
      {
        id:     'weeks',
        number: '16',
        unit:   '周',
        label:  '从基线评估到结业报告',
      },
      {
        id:     'loop',
        number: '4',
        unit:   '个阶段',
        label:  '每节课：阅读、思考、表达、写作',
      },
    ],
  },

  loop: {
    eyebrow: '教学方法',
    heading: 'The Loop贯穿每一节课。',
    body:
      '大多数英语项目单独训练某一技能。DODO训练完整的认知序列——因为用一种语言思考和用一种语言表现并不是同一件事。',
    steps: [
      {
        id:          'read',
        number:      '01',
        label:       '阅读',
        description:
          '文本有意选在学生当前Lexile水平之上。我们培养词汇深度和阅读耐力，而非表面识别。',
      },
      {
        id:          'think',
        number:      '02',
        label:       '思考',
        description:
          '在表达之前，学生先形成观点。Navigator使用结构化提示，同时激活两种语言的思维——英语和母语。',
      },
      {
        id:          'speak',
        number:      '03',
        label:       '表达',
        description:
          '在结构化的苏格拉底式讨论中阐述想法。Navigator引导，不实时纠错。流利度来自先思考。',
      },
      {
        id:          'write',
        number:      '04',
        label:       '写作',
        description:
          '学生将思考落实到纸面。写作使用6+1特质框架进行评估——与加拿大和美国课堂使用的评分标准相同。',
      },
    ],
  },

  structure: {
    eyebrow: '项目结构',
    heading: '有开始，有中点，有量化的结局。',
    body:
      '16周项目是一项承诺，而非订阅。它有明确的轨迹，三个锚点帮助学生和家庭保持方向感。',
    phases: [
      {
        id:          'entrance',
        week:        '第1周',
        label:       '入学评估',
        description:
          'Lexile基线阅读评估和6+1特质写作快照。在开始之前，我们确切地了解您的孩子在哪里——而不是学校说他们在哪里。',
      },
      {
        id:          'midpoint',
        week:        '第8周',
        label:       '中期检查',
        description:
          'Navigator审查Lexile进展轨迹和写作特质分数。家长收到书面进度说明。如果节奏需要调整，计划随之更新。',
      },
      {
        id:          'exit',
        week:        '第16周',
        label:       '结业评估',
        description:
          '完整的Lexile重新测量和6+1特质重新评估。成长被量化、可见、有记录。然后由您决定下一步。',
      },
    ],
  },

  lexile: {
    eyebrow: '可量化的进步',
    heading: '每一项结果都是数字，而非感觉。',
    body:
      'Lexile水平是北美学校系统使用的同一测量标准。当学生的Lexile提升，意味着具体的、可验证的进步。',
    example: {
      label:   '典型16周成果',
      start:   620,
      end:     820,
      weeks:   16,
      context: '从四年级阅读水平到六年级——四个月内实现一年的成长。',
    },
  },

  navigators: {
    eyebrow: '您孩子的Navigator',
    heading: '不是家教，而是确切知道您孩子目标的向导。',
    body:
      'Navigator是写作、文学和学术写作方面的专家。他们与同一批学生合作16周——没有交接，没有替换。纵向、个性化、专业。',
    credentials: [
      '具有写作、文学和学术写作背景',
      '经过6+1特质写作评估框架培训',
      '经认证的Lexile评估实践者',
      '英语母语或接近母语水平',
      '具有加拿大和美国学术环境中双语学习者的指导经验',
    ],
  },

  hangar: {
    eyebrow: 'The Hangar',
    heading: 'DODO学习者的归属之地。',
    body:
      'The Hangar是DODO社区中心——由Navigator支持的学习课程、同伴讨论，以及正在构建真实能力的学生的共同身份认同。不是作业辅导，是归属感。',
  },

  charter: {
    eyebrow: 'Charter Enrollment',
    heading: 'Charter家庭是DODO最早的信任者。',
    body:
      'Charter Enrollment适合以创始价格承诺完整16周项目的家庭。这不是优惠价格，而是对远见的奖励——现在开放。',
    cta:  '预留您的Charter名额',
    note: '每期名额有限，报名前需完成咨询。',
  },
}

// ── Results ───────────────────────────────────────────────────
export const results = {
  meta: {
    title: '学员成果',
    description:
      'DODO Learning学员的真实Lexile成长数据。具体数字，匿名学生，6+1特质写作进展。十六周内可量化的年级水平提升。',
  },

  hero: {
    eyebrow:    '学员成果',
    heading:    '提升一个年级水平是什么样的？',
    subheading:
      '我们衡量一切。入学、中期和结业时的Lexile水平。前后的6+1特质写作分数。数字是具体的，因为工作是具体的。',
  },

  proof: {
    stats: [
      { id: 'avg',     number: '1.2', unit: '个年级',       label: '每个16周班级的平均阅读提升' },
      { id: 'lexile',  number: '180', unit: 'Lexile分',     label: '所有学生的平均Lexile提升'   },
      { id: 'writing', number: '2→4', unit: '6+1分数',      label: '典型写作特质改善'           },
    ],
  },

  intro: {
    heading: '每一项结果都是数字，而非感觉。',
    body:
      '家长投资的是成果，学生投资的是自信。我们用Lexile水平和6+1特质写作评估来衡量两者，让成长清晰可见。以下所有成果均为真实数据，所有学生均已匿名处理。',
  },

  results: [
    {
      id:           'student-a',
      lexileStart:  580,
      lexileEnd:    760,
      weeks:        16,
      gradeContext: '从三年级阅读水平到五年级，一个项目周期完成。',
      quote:        '到第十周，她开始在课堂上举手发言，这以前从未发生过。',
      quoteSource:  '家长，温哥华班',
    },
    {
      id:           'student-b',
      lexileStart:  690,
      lexileEnd:    890,
      weeks:        16,
      gradeContext: '四年级到六年级——十六周内提升两个年级。',
      quote:        '他的Navigator清楚地知道差距在哪里。第十六周的Lexile数字说明了一切。',
      quoteSource:  '家长，列治文班',
    },
    {
      id:           'student-c',
      lexileStart:  750,
      lexileEnd:    920,
      weeks:        16,
      gradeContext: '入学时处于四年级高水平，结业时达到稳固的六年级。',
      quote:        null,
      quoteSource:  null,
    },
    {
      id:           'student-d',
      lexileStart:  620,
      lexileEnd:    820,
      weeks:        16,
      gradeContext: '四年级阅读水平到六年级——四个月内实现一年的成长。',
      quote:        '我没想到写作会有这么大的变化。结业时的6+1分数比入学时高了整整两分。',
      quoteSource:  '家长，万锦班',
    },
    {
      id:           'student-e',
      lexileStart:  510,
      lexileEnd:    680,
      weeks:        16,
      gradeContext: '低于三年级到稳固四年级——我们追踪到的最大成长幅度。',
      quote:        'The Loop起了关键作用。到第八周，她已经能用英语解释自己的想法了。',
      quoteSource:  '家长，多伦多班',
    },
    {
      id:           'student-f',
      lexileStart:  800,
      lexileEnd:    980,
      weeks:        16,
      gradeContext: '五年级高水平到七年级——进阶班成果。',
      quote:        null,
      quoteSource:  null,
    },
  ],

  writing: {
    eyebrow: '6+1特质写作',
    heading: '写作成长有评分，不只是描述。',
    body:
      '6+1特质框架从七个维度评估写作：想法、组织、声音、用词、句子流畅性、语言规范和呈现。学生在入学和结业时各评分一次。两次分数之间的差距，就是学习成果。',
    traits: [
      { id: 'ideas',   label: '想法',     entryAvg: 2.1, exitAvg: 3.9 },
      { id: 'org',     label: '组织',     entryAvg: 1.9, exitAvg: 3.7 },
      { id: 'voice',   label: '声音',     entryAvg: 2.0, exitAvg: 4.1 },
      { id: 'word',    label: '用词',     entryAvg: 2.3, exitAvg: 4.0 },
      { id: 'fluency', label: '句子流畅', entryAvg: 2.2, exitAvg: 3.8 },
      { id: 'conv',    label: '语言规范', entryAvg: 2.4, exitAvg: 3.6 },
    ],
  },

  methodology: {
    eyebrow: '数字提升的原因',
    heading: '成长不是偶然的，而是设计出来的。',
    body:
      '十六周内Lexile提升150至200分，并非被动英语接触的典型结果。这是结构化超水平阅读、有目的的苏格拉底式讨论和每周基于框架写作评估的成果。The Loop是驱动引擎。',
    cta:     '阅读完整教学方法',
    ctaHref: '/methodology',
  },

  charter: {
    eyebrow: 'Charter Enrollment',
    heading: '您孩子的成果从基线评估开始。',
    body:
      '诊断咨询是第一步。我们建立Lexile基线，找出差距，并向您展示像您孩子这样的学生十六周后的具体情况。',
    cta:     '预约您的咨询',
  },
}


// ── Enroll ────────────────────────────────────────────────────
// TODO: populate when building app/[locale]/enroll/page.jsx
export const enroll = {}

// ── Consult ───────────────────────────────────────────────────
// TODO: populate when building app/[locale]/consult/page.jsx
export const consult = {}

// ── Methodology ───────────────────────────────────────────────
// TODO: populate when building app/[locale]/methodology/page.jsx
export const methodology = {}

// ── FAQ ───────────────────────────────────────────────────────
// TODO: populate when building app/[locale]/faq/page.jsx
export const faq = {}

// ── Navigators ────────────────────────────────────────────────
// TODO: populate when building app/[locale]/navigators/page.jsx
export const navigators = {}

// ── The Hangar ────────────────────────────────────────────────
// TODO: populate when building app/[locale]/the-hangar/page.jsx
export const theHangar = {}

// ── Lexile ────────────────────────────────────────────────────
// TODO: populate when building app/[locale]/lexile/page.jsx
export const lexile = {}

// ── About ─────────────────────────────────────────────────────
// TODO: populate when building app/[locale]/about/page.jsx
export const about = {}

// ── Compare ───────────────────────────────────────────────────
// TODO: populate when building app/[locale]/compare/page.jsx
export const compare = {}

// ── Assessment ────────────────────────────────────────────────
// TODO: populate when building app/[locale]/assessment/page.jsx
export const assessment = {}

// ── Demos ─────────────────────────────────────────────────────
// TODO: populate when building app/[locale]/demos/page.jsx
export const demos = {}