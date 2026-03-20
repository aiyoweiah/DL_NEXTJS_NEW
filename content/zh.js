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
    title: '学生成果',
    description:
      'DODO Learning学生的真实Lexile成长数据。匿名成果展示16周项目中的阅读和写作进步——以Lexile阅读水平和6+1特质写作框架衡量。',
  },

  hero: {
    eyebrow:    '学生成果',
    heading:    '成长，用数字来证明。',
    subheading:
      '以下每一项成果都经过测量——不是估计，不是感觉。16周项目前后的Lexile分数。真实学生，真实数据。姓名不予披露。',
  },

  proof: {
    stats: [
      { id: 'avg-lexile',   number: '187', unit: '分',       label: '所有学生的平均Lexile提升' },
      { id: 'grade-levels', number: '1.2', unit: '个年级',   label: '16周内平均成长' },
      { id: 'students',     number: '94%', unit: '',         label: '的学生至少提升了一个完整年级' },
    ],
  },

  intro: {
    heading: '我们如何衡量。',
    body:
      '在第一节课之前，每位学生都会进行Lexile基线评估和6+1特质写作快照。第8周检查进展轨迹。第16周重新测量。差值就是成果。',
  },

  results: [
    {
      id:           'student-a',
      label:        '学生 A',
      lexileStart:  580,
      lexileEnd:    780,
      weeks:        16,
      gradeContext: '六年级——14个月前抵达加拿大',
      quote:        '大约在第十周，她开始在课堂上举手。到最后，她已经是那个向老师提出追问的学生了。',
      quoteSource:  '家长',
    },
    {
      id:           'student-b',
      label:        '学生 B',
      lexileStart:  640,
      lexileEnd:    860,
      weeks:        16,
      gradeContext: '七年级——准备入读加拿大中学',
      quote:        '我现在真的能够论证一个观点了。不仅是用英语——我的思维方式变了。',
      quoteSource:  '学生',
    },
    {
      id:           'student-c',
      label:        '学生 C',
      lexileStart:  490,
      lexileEnd:    670,
      weeks:        16,
      gradeContext: '五年级——家庭从上海迁往温哥华',
      quote:        null,
      quoteSource:  null,
    },
    {
      id:           'student-d',
      label:        '学生 D',
      lexileStart:  820,
      lexileEnd:    1020,
      weeks:        16,
      gradeContext: '八年级——目标顶尖美国大学升学路径',
      quote:        'Navigator没有修改我的写作。他们改变了我阅读的方式。写作自己就好了。',
      quoteSource:  '学生',
    },
    {
      id:           'student-e',
      label:        '学生 E',
      lexileStart:  610,
      lexileEnd:    800,
      weeks:        16,
      gradeContext: '六年级——双语家庭，普通话为主',
      quote:        '我们选择DODO是因为我们想要Lexile数据。自信心的提升是我们没有预料到的。',
      quoteSource:  '家长',
    },
    {
      id:           'student-f',
      label:        '学生 F',
      lexileStart:  710,
      lexileEnd:    920,
      weeks:        16,
      gradeContext: '七年级——列治文，准备IB课程',
      quote:        null,
      quoteSource:  null,
    },
  ],

  writing: {
    eyebrow: '6+1特质写作成长',
    heading: '写作分数的提升，是思维能力提升的结果。',
    body:
      '6+1特质框架从七个维度衡量写作——与加拿大和美国课堂使用的评分标准相同。入学和结业分数均由Navigator评估。',
    traits: [
      { id: 'ideas',        label: '想法',       entryAvg: 2.1, exitAvg: 4.2 },
      { id: 'organisation', label: '组织',       entryAvg: 2.0, exitAvg: 4.4 },
      { id: 'voice',        label: '声音',       entryAvg: 2.3, exitAvg: 4.1 },
      { id: 'word-choice',  label: '用词',       entryAvg: 2.4, exitAvg: 4.3 },
      { id: 'fluency',      label: '句子流畅度', entryAvg: 2.2, exitAvg: 4.0 },
      { id: 'conventions',  label: '规范',       entryAvg: 2.5, exitAvg: 4.2 },
    ],
  },

  methodology: {
    eyebrow:  '为什么数字会变化',
    heading:  'Lexile成长是认知训练的副产品。',
    body:
      '学生不是通过练习Lexile测试来提高分数的。他们通过更精确的思考来提高——用两种语言。The Loop就是推动这一变化的原因。',
    cta:     '阅读完整方法论',
    ctaHref: '/methodology',
  },

  charter: {
    eyebrow: 'Charter Enrollment',
    heading: 'Charter家庭是DODO最早的信任者。',
    body:
      'Charter Enrollment适合以创始价格承诺完整16周项目的家庭。这不是优惠价格，而是对远见的奖励——现在开放。',
    cta: '预留您的Charter名额',
  },
}

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
export const lexile = {
  meta: {
    title:       'Lexile阅读水平是什么？家长完整指南',
    description:
      '为双语家庭家长解析Lexile阅读水平：Lexile如何衡量阅读理解能力、各年级对应的参考区间，以及DODO Learning如何用Lexile追踪孩子的成长。',
  },

  hero: {
    eyebrow:    'Lexile 阅读框架',
    heading:    'Lexile阅读水平是什么——这个数字究竟告诉了您什么？',
    subheading:
      'Lexile是目前最精准的阅读能力测量工具。一个数字，清晰呈现孩子当前的阅读水平、与年级标准的差距，以及经过系统学习后取得的成长。',
  },

  what: {
    eyebrow: '量表说明',
    heading: '一个数字，将阅读能力精准定位在0L至2000L的量表上。',
    body:
      'Lexile阅读水平在0L至2000L的标准化量表上衡量阅读理解能力。这个数字同时反映三个维度：词汇复杂度、句子密度，以及概念的抽象程度。一位Lexile 650L的学生能够独立理解同等难度的文本；750L的文章对他们而言略超出当前水平——适合有指导下的挑战，但不适合独立阅读。DODO的每一节课都将文本难度设定在学生当前Lexile水平加80L至120L的区间内，精准落在让成长真实发生的"最优挑战区"。',
  },

  grades: {
    eyebrow: '年级参考区间',
    heading: '各年级对应的Lexile水平。',
    note:
      '以下数据为北美英语母语学生的典型区间。双语学生的Lexile分数通常低于这些区间——这并非能力不足，而是因为Lexile专门衡量学术英语能力。这正是The Loop着力弥合的差距。',
    rows: [
      { grade: '三年级', range: '415L – 760L', midpoint: '520L' },
      { grade: '四年级', range: '635L – 950L', midpoint: '740L' },
      { grade: '五年级', range: '770L – 1080L', midpoint: '860L' },
      { grade: '六年级', range: '855L – 1165L', midpoint: '1010L' },
      { grade: '七年级', range: '925L – 1235L', midpoint: '1065L' },
      { grade: '八年级', range: '985L – 1295L', midpoint: '1130L' },
    ],
  },

  bilingual: {
    eyebrow: '双语学习者的特殊情境',
    heading: '为什么双语孩子的Lexile分数往往低于实际能力。',
    body:
      'Lexile分数衡量的是学术英语理解能力——而非智力、口语流利度或努力程度。一个英语口语流利、学校成绩优异的孩子，在Lexile评估中可能仍然低于年级标准水平。这不是失败，而是会话语言与学术语言之间差异的体现。会话流利通过日常社交互动自然发展；而学术语言——理解密集文本、跟随抽象论证、从陌生词汇中提取意义的能力——需要系统、有结构的专项训练。这正是The Loop所训练的核心内容。',
  },

  dodo: {
    eyebrow: 'DODO 如何使用 Lexile',
    heading: '三次评估，一条清晰的成长轨迹。',
    body:
      'DODO在16周课程的三个节点使用MetaMetrics认证的Lexile评估工具。每次评估结果将在72小时内与家长分享。您收到的永远是一个具体的数字——不是模糊的进度反馈。',
    points: [
      {
        id:    'week0',
        label: '第0周 — 入学评估',
        body:  '在第一节课前进行，建立孩子的Lexile基础分，并据此确定前四周的内容难度。同时完成6+1特质写作的入门水平评估。',
      },
      {
        id:    'week8',
        label: '第8周 — 中期检测',
        body:  '课程进行至中途时的进度评估。如果成长符合预期，内容难度将相应提升。如果8周增长低于50L，我们会立即启动诊断审查并调整方案——而不是等到课程结束才处理。',
      },
      {
        id:    'week16',
        label: '第16周 — 结课评估',
        body:  '最终的Lexile测量。学生通常提升100L至150L——约相当于一个年级的阅读成长。结课评估还包含完整的6+1特质写作测评和书面进度报告。',
      },
    ],
  },

  examples: {
    eyebrow: '典型成果',
    heading: '16周的成长，用Lexile数字呈现。',
    note:    '以下数据来自16周课程的学员。成果反映了规律的课程出勤和The Hangar的持续参与。',
    bars: [
      { start: 510, end: 670, weeks: 16, label: '三年级学生 — 温哥华' },
      { start: 650, end: 820, weeks: 16, label: '五年级学生 — 多伦多' },
      { start: 770, end: 950, weeks: 16, label: '七年级学生 — 旧金山湾区' },
    ],
  },

  cta: {
    heading:      '了解您孩子现在的精确阅读水平。',
    body:         '入学评估需时约30分钟，即可获得一个精确的Lexile分数。这个数字，是一条您可以在每节课后持续追踪的成长轨迹的起点。',
    ctaPrimary:   '预约诊断通话',
    ctaSecondary: '了解教学方法',
  },
}

// ── About ─────────────────────────────────────────────────────
// TODO: populate when building app/[locale]/about/page.jsx
export const about = {}

// ── Compare ───────────────────────────────────────────────────
export const compare = {
  meta: {
    title: 'DODO Learning vs. 其他英语学习方式',
    description: 'DODO Learning与私人补习、公文式教育（Kumon）、课外英语班和阅读App的对比。了解各类方式的本质区别，为双语孩子做出最适合的选择。',
  },
  hero: {
    eyebrow: '对比参考',
    heading: '每位家长在报名前都会问的问题。',
    subheading: '为双语孩子选择英语项目的家长，面对的是本质完全不同的几种选择。这个页面精确解释各类方式的差异——不贬低其他选择，只是帮您看清孩子真正需要什么。',
  },
  intro: {
    heading: '大多数项目解决的不是核心问题。',
    body: '私人补习尽决具体知识漏洞。公文式教育（Kumon）通过重复练习建立程序性流利度。阅读类应用提供文本访问渠道。课外英语班培养会话自信心。每一种方式都能解决真实存在的问题，但没有一种能够构建双语学术表现所需的核心认知架构：能够阅读复杂文本、进行推理、论证立场并用英语精确表达——这正是DODO所构建的能力。',
  },
  alternatives: [
    {
      id: 'tutoring',
      label: '私人补习',
      what: '老师与孩子一对一工作，针对具体的作业、考试准备或学科知识漏洞进行计划性辅导。',
      strength: '对于明确、具体的问题有立竿见影的效果。当知识漏洞范围小、问题清晰时，补习是最合适的工具。',
      limit: '补习是被动应对的，它在问题出现后才发挥作用，而非建立预防漏洞的结构性能力。一个靠补习度过五年级英语的孩子，内在的学习挑战在六年级同样会再度出现。',
      dodo: 'DODO不是补习，而是构建认知基础架构——阅读深度、分析推理和结构化写作——从源头预防补习所要尽决的问题。',
    },
    {
      id: 'kumon',
      label: '公文式教育（Kumon）',
      what: '以自主进度、工作表为基础的项目，通过每日重复练习建立阅读和数学的程序性流利度。',
      strength: '培养规律的每日练习习惯。对于小学低年级学生在解码流利度和基础理解方面效果较好。',
      limit: '公文式的阅读项目主要应对词汇识别和句子层面的理解，不具备训练分析性推理、论证写作或处理高密度学术文本的能力。完成公文式阅读课程的学生，学术英语水平往往仍低于年级标准。',
      dodo: 'DODO从公文式到达的终点开始。The Loop在段落和论证层面训练阅读理解，而非句子层面——再通过口头推理和结构化写作进一步建构。',
    },
    {
      id: 'after-school',
      label: '课外英语班',
      what: '以英语会话、语法或通用读写为内容的小组教学，通常每周一至两节课。',
      strength: '建立会话自信心和社交词汇。能够降低孩子在英语环境中的紧张感。',
      limit: '会话英语与学术英语是不同的认知任务。一个英语口语流利、学校成绩优异的孩子，在阅读复杂文本、写作结构性论证或分析陌生段落时，也可能完全依赖中文思维。集体课程往往缺乏移动学业表现所需的强度和测量指标。',
      dodo: 'DODO针对的是学术语言，而非会话语言。The Loop训练阅读理解、结构化口头推理和学术写作——全程以Lexile和6+1特质框架进行量化衡量。',
    },
    {
      id: 'reading-apps',
      label: '阅读类应用和平台',
      what: '提供分级阅读内容的数字工具，通常配备理解测验和进度跟踪功能。',
      strength: '可及性强、价格亲民、进度自主。对于建立持续独立阅读习惯和词汇积累有一定价值。',
      limit: 'App提供内容，但无法提供指导。它不能判断学生在具体文本上的特定技旁原因，不能示范熟练阅读者的思维过程，也无法对书面推理给予反馈。学生在应用上的成长受限于其自身的认知上限。',
      dodo: 'DODO提供App无法替代的东西：一位能诊断学生思维方式而非仅识别解码能力的导师。The Hangar补充实时课程的成果——而非替代它。',
    },
    {
      id: 'school',
      label: '学校英语课程',
      what: '孩子在加拿大或美国学校接受的常规英语课程。',
      strength: '提供持续的年级内容接触、同伴讨论机会和老师反馈，帮助孩子在学术环境中建立英语语感。',
      limit: '学校课程以单语认知为默认前提，没有为同时在两种语言中发展学术熟练度的学生专门设计。双语学生的英语成绩可能A级，但Lexile评估显示实际阅读水平仍低于年级标准一到两个年级。',
      dodo: 'DODO不是学校课程的替代，而是建立学校无法解决的双语认知层：在不丢失中文作为认知锚定的前提下，能够用英语进行学术思维、推理和写作。',
    },
  ],
  decision: {
    eyebrow: '核心问题',
    heading: '问题不在于哪种方式更好，而在于孩子真正需要什么。',
    rows: [
      {
        need: '针对具体作业或考试的专项辅导',
        answer: '私人补习是最合适的工具。',
      },
      {
        need: '建立每日阅读习惯和解码流利度',
        answer: '公文式或阅读类 App 能起到帮助。',
      },
      {
        need: '提升英语会话自信心',
        answer: '课外英语班是合适的选择。',
      },
      {
        need: '建立双语基础上的英语学术阅读、推理与写作能力',
        answer: '这正是DODO所构建的。',
      },
    ],
  },
  cta: {
    heading: '不确定孩子需要什么？入学评估会给出答案。',
    body: '入学评估需时30分钟，即可获得一个Lexile分数和6+1特质写作快照。这些数据能够明确告诉我们和您：什么样的支持方式才能带来可量化的成长。',
    ctaPrimary: '预约诊断通话',
    ctaSecondary: '了解我们的测量方式',
  },
}


// ── Assessment ────────────────────────────────────────────────
// TODO: populate when building app/[locale]/assessment/page.jsx
export const assessment = {}

// ── Demos ─────────────────────────────────────────────────────
// TODO: populate when building app/[locale]/demos/page.jsx
export const demos = {}