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
  // TODO: populate when building app/[locale]/results/page.jsx
  export const results = {}
  
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