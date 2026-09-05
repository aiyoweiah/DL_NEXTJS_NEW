// content/marketing.zh.js
//
// Consolidated ZH source for all 10 marketing pages.
// One named export per page. Each page.jsx imports its slice:
//
//   import { program as copy } from '@/content/marketing.zh'
//
// Pages bundled here:
//   - home          (migrated 2026-05-21 from inline HOMEPAGE_COPY in app/[locale]/page.tsx)
//   - program
//   - about
//   - consult
//   - compare
//   - methodology
//   - lexile
//   - results
//   - navigators
//   - demos
//
// Translation: DeepSeek run 2026-05-17 against marketing.en.js
// (per translation/BRAND_CONTENT_GUIDE.md §13). Post-merge fixes applied
// inline: "高 stakes" → "高难度"; "from $750" → "起价 $750"; founderName
// cleanup; /demos session.navigatorName kept English per glossary.
//
// Item-list shapes (cities, FAQ) live in their own bilingual files:
//   content/cities.js · content/faq.js
//
// Per-page content.{en,zh}.js files were retired 2026-05-17.

// Demos page YouTube IDs (formerly app/[locale]/demos/videos.js).
// Replace placeholders with real video IDs.
const YOUTUBE_IDS = {
  demoGr46:       'REPLACE_DEMO_GR4_6_VIDEO_ID',
  demoGr78:       'REPLACE_DEMO_GR7_8_VIDEO_ID',
  demoGr9plus:    'REPLACE_DEMO_GR9PLUS_VIDEO_ID',
}


// ── nav (顶部导航) ─────────────────────────────────────────────
// 由 components/layout/Navbar.jsx 通过 app/[locale]/layout.jsx
// 下发的 locale-aware copy 消费。结构与 marketing.en.js 镜像。
export const nav = {
  primary: [
    {
      href:  '/program',
      label: '课程',
      // 都学家族下拉菜单 —— 将三项课程作为一个品牌族群呈现，替代姊妹站
      // 跨站链接小标签。外部项（跨站）支持 {locale} 模板，由 Navbar 在
      // 渲染时替换为当前语言。
      items: [
        { label: 'ELA 课程',       sub: '3 年级及以上', href: '/program'                                          },
        { label: '都学启蒙',       sub: '5–8 岁',       href: '/little-dodo'                                      },
        { label: 'DODO 机器语言',  sub: '3 年级及以上', href: 'https://coding.dodolearning.com', external: true   },
      ],
    },
    { href: '/methodology', label: 'DODO 教学系统' },
    { href: '/results',     label: '成果'          },
    { href: '/navigators',  label: '导师'          },
    { href: '/audiobooks',  label: '有声书',       gated: true },
    { href: '/about',       label: '故事'          },
  ],
  more: [
    { href: '/little-dodo', label: '都学启蒙（5–8 岁）' },
    { href: '/lexile',      label: 'Lexile 等级'        },
    { href: '/compare',     label: '不同之处'           },
    { href: '/faq',         label: '常见问题'           },
    { href: '/blog',        label: '博客'               },
    { href: '/partners',    label: '合作伙伴'           },
  ],
  // 导航以柔性引导（课堂实录）为先；预约面谈作为更坚定的转化，
  // 收纳到移动端抽屉的次级按钮、页面正文与页脚。
  cta: {
    demo:           '课堂实录',
    demoCompact:    '课堂实录',
    demoAria:       '观看免费的课堂实录',
    consult:        '预约咨询',     // 移动端抽屉次级按钮
    consultCompact: '预约面谈',
    consultAria:    '预约免费的诊断式评估面谈',
  },
  members:  '学员专属',                 // 仅供屏幕阅读器朗读（锁形图标为视觉提示）
  tagline:  '语言的根，长在阅读里',
  logoAria: 'DODO 都学书院 — 首页',
  menuOpenAria:  '打开导航菜单',
  menuCloseAria: '关闭导航菜单',
}


// ── footer (页脚) ─────────────────────────────────────────────
// 列结构：品牌 · 课程 · 资源 · 服务地区。
export const footer = {
  // 柔性兜底转化条（PreCtaBand）。仅在没有自带收尾 CTA 的页面显示
  // （首页、/faq、/partners、/assessment）——见 PreCtaBand SUPPRESS。
  // 柔性引导优先：课堂实录（主）+ 预约咨询（次）。
  preCta: {
    eyebrow:    '先看真实课堂',
    heading:    '先看一节真实的课，再做决定。',
    body:       '没有推销，没有剪辑——一位真实的导师、一名真实的学生，完整走过一节 The Loop 课程。',
    watch:      '课堂实录',
    watchAria:  '观看免费的课堂实录',
    consult:    '预约咨询',
    consultAria:'预约诊断式评估面谈',
  },
  brand: {
    logoAria:  'DODO 都学书院 — 首页',
    body:      '真人、在线、导师亲授的英文语言艺术课程 — Read · Think · Speak · Write。',
    tagline:   '语言的根，长在阅读里',
  },
  sibling: {
    label:     '都学家族',
    name:      'DODO 机器语言',
    blurb:     'AI 时代的语言艺术',
    href:      'https://coding.dodolearning.com',
  },
  columns: {
    program:   '课程',
    resources: '资源',
    serving:   '服务地区',
  },
  program: [
    { href: '/program',     label: 'ELA 课程（3 年级+）' },
    { href: '/little-dodo', label: '都学启蒙 (5–8)' },
    { href: 'https://coding.dodolearning.com', label: 'DODO 机器语言（3 年级+）', external: true },
    { href: '/methodology', label: 'DODO 教学系统' },
    { href: '/navigators',  label: '导师团队'      },
    { href: '/results',     label: '学习成果'      },
    { href: '/lexile',      label: 'Lexile 等级'   },
    { href: '/compare',     label: '不同之处'      },
    { href: '/assessment',  label: 'Lexile 测评', soon: true },
  ],
  resources: [
    { href: '/about',    label: '关于 DODO'   },
    { href: '/blog',     label: '博客'        },
    { href: '/faq',      label: '常见问题'    },
    { href: '/demos',    label: '课堂实录'  },
    { href: '/consult',  label: '预约咨询' },
    { href: '/partners', label: '合作伙伴'    },
  ],
  serving: [
    { href: '/cities/vancouver',              label: '温哥华'         },
    { href: '/cities/richmond-bc',            label: '列治文 (BC)'    },
    { href: '/cities/markham',                label: '万锦'           },
    { href: '/cities/toronto',                label: '多伦多'         },
    { href: '/cities/san-francisco-bay-area', label: '旧金山湾区'     },
    { href: '/cities/los-angeles',            label: '洛杉矶'         },
  ],
  trust: [
    {
      id:          'lexile',
      label:       'Lexile 测评',
      description: '以 Lexile 等级衡量阅读进步 — 与北美学校体系同一标准。',
    },
    {
      id:          '6plus1',
      label:       '6+1 写作维度',
      description: '写作以 6+1 Trait 维度评分 — 加拿大与美国课堂通用的写作量规。',
    },
    {
      id:          'live',
      label:       '导师亲授 · 全程直播',
      description: '每一节课都是真人直播。没有预录内容。导师逐人跟踪每位学生的进度。',
    },
  ],
  legal: {
    copyright: 'DODO 都学书院 保留所有权利',
    links: [
      { href: '/privacy', label: '隐私政策' },
      { href: '/terms',   label: '使用条款' },
    ],
  },
  comingSoon: '即将上线',
}


// ── / (home) ─────────────────────────────────────────────────────
export const home = {
  meta: {
    title:
      'DODO 都学书院 — 在线导师亲授的英文读写，从 5 岁到高中 | 一次思考，两种语言。',
    description:
      '由导师（Navigator）亲授的真人、在线英文读写课程，覆盖 5 岁到高中。都学启蒙（K–2）：由幼儿教育导师授课的语音启蒙阅读；ELA 课程（3 年级及以上）：LCS 体系——阅读、写作，外加真人“表达（Speaking）”板块——每个 16 周周期 Lexile 平均提升一个年级。以 MCT 天才英语教育传统为根基。',
  },

  hero: {
    eyebrow:        '在线 · 导师（Navigator）亲授英文读写——从 5 岁到高中',
    eyebrow2:       '',
    h1:             ['真正的英语精熟——看得见，就在孩子怎么思考。', '真人一对一，由一位慢慢懂得你孩子的导师亲授。'],
    h1Chinese:      '',
    differentiator: '',
    consultHook:
      '从五岁的孩子在专属幼儿教育导师的陪伴下学会阅读，到高中生在导师指导下论辩复杂文本——每个年龄段，做的其实是同一件事：学会用英文把事情想清楚。它生长在一份扎实的文学与写作传统里，也生长在哈佛关于“理解如何形成”的研究里。',
    cta1:      '课堂实录',
    cta2:      '预约咨询',
    trustLine:
      'Lexile测量进度 · 6+1 Trait写作评估体系 · 导师实时主导 · 一次思考，两种语言。',
  },

  proof: [
    { id: 'families', number: '300+', unit: '个孩子和家庭', label: '自成立以来真实陪跑——Lexile真实增长，已验证的成果' },
    { id: 'lexile',   number: '1',    unit: '个年级',       label: '每个16周课程周期的平均Lexile阅读水平增长' },
    { id: 'writing',  number: '75%+', unit: '口碑推荐', label: '的家庭由另一个家庭推荐而来' },
    { id: 'repeat',   number: '10,000+', unit: '教学小时', label: '真人一对一、导师直播累计交付' },
  ],

  photoIntro: {
    eyebrow: '认识导师团队',
    heading: '老师与导师之间，差的是一张地图。',
    body0:
      '学校知道孩子在几年级。那不等于知道孩子真正站在哪里。很多孩子都有一道成绩单上看不见的安静缺口——认得出的字，和真正能想明白的意思，中间隔着一段距离。这段距离，大多数课程测不出来。',
    body1:
      '导师一对一不间断，却远不止一位英语老师。课堂里，导师不会问“你读懂了什么？”，而会问“你觉得这个人物为什么做出这个选择？”—— 专注培养孩子用英语的思考就是DODO Learning不一样的地方。导师们是写作、文学和学术写作领域的专家——以MCT语言艺术传统为基础，运用哈佛Project Zero思维训练体系，专门负责缩短学生当前Lexile阅读水平与学业真正需求之间的差距。',
    body2:
      '导师从头到尾追踪学生的进步：当前读写水平与目标之间的距离——并通过The LCS逐周缩小这个距离，高阶课程来确保学生不断的进阶和进步。',
    cta1:   '认识导师团队',
    cta2:   '学生成功',
    imgAlt: '一位母亲注视孩子在家中读完一段课文后停下来思考的瞬间',
  },

  loop: {
    eyebrow: '教学方法',
    heading: '语言循环体系',
    body:
      '这就是每节课的样子——阅读 → 思考 → 表达 → 写作。顺序保持不变，一周又一周，孩子才好安顿下来。',
    cta: '阅读完整教学方法 →',
    steps: [
      {
        id:          'read',
        number:      '01',
        label:       'Read 阅读',
        description:
          '学生阅读精心选定的经典与SAT必读文本——从爱丽丝梦游仙境、隐形人到世界大战，以及递进难度的说明性非虚构文本，选材在当前Lexile水平或略高一筹。从不用简写本；我们就从书本身出发。',
      },
      {
        id:          'think',
        number:      '02',
        label:       'Think 思考',
        description:
          '导师运用哈佛教育学院研发的Project Zero思维训练工具，引导学生形成有具体依据支撑的明确立场。他们真正认为什么？而不是他们觉得应该认为什么。',
      },
      {
        id:          'speak',
        number:      '03',
        label:       'Speak 表达',
        description:
          '学生在与导师的实时苏格拉底式对话中表达并支持自己的立场。导师在学生回答后的引导 - 永远是一个更深入的问题。导师不急于评价，我们借着好的问题来训练学生口语表达的精准度。',
      },
      {
        id:          'write',
        number:      '04',
        label:       'Write 写作',
        description:
          '学生沿MCT写作路径产出书面作品：语法、句子、段落、论文到学术写作。每篇作品由导师以6+1 Trait框架逐项评分。进步可见，可量化。',
      },
    ],
  },

  confidence: {
    eyebrow: '简单说',
    heading:
      '一期16周，学生英语阅读提升一个年级。',
    body:
      '我们用 Lexile 量给你看，也体现在写作评分里。孩子学会用英文把事情想清楚，这份习惯往往会带过去——带进别的学科，也带进他用的每一种语言。',
    pillars: [
      {
        id:        'assessment',
        eyebrow:   '开始之前',
        heading:   '我们确切了解您的孩子目前在哪里。',
        body:
          '不是学校成绩单说的在哪里。在第一节课之前，每位学生都会接受Lexile阅读评估和6+1 Trait写作基准线评估。我们根据数据制定方案。',
        linkHref:  '/program',
        linkLabel: '测评如何进行',
      },
      {
        id:        'loop',
        eyebrow:   '课程期间',
        heading:   '每节课均运行The LCS。',
        body:
          '阅读。思考。表达。写作。导师每周追踪孩子在每个阶段的进展。The LCS 以 MCT 语言艺术框架和哈佛Project Zero思维训练体系为基础。全程有量有据。',
        linkHref:  '/methodology',
        linkLabel: '认识语言循环体系',
      },
      {
        id:        'results',
        eyebrow:   '16周后',
        heading:   '我们展示数字。',
        body:
          '每位学生将接受结课Lexile评估和重新评估的6+1 Trait写作得分。能用英文阅读复杂文本、以论据支撑立场、有意识地写作——并能把这套思考当众辩护出来——这正是机器没法替孩子做的那部分。这样的思维习惯很难教，看着它长出来却是一种安静的喜悦。',
        linkHref:  '/results',
        linkLabel: '查看学生成果',
      },
    ],
  },

  trust: {
    eyebrow:    '学生成果',
    heading1:   '培养学生享受文学艺术的能力',
    heading2:   '',
    viewAll:    '查看全部成果 →',
    weeksLabel: '周',
    results: [
      {
        id:      'result-1',
        student: 'Vincent X',
        detail:  '五年级 · 温哥华',
        start:   620,
        end:     820,
        weeks:   16,
        trait:   'Voice 声音: 2 → 4',
        quote:
          '到第八周开始主动举手发言，到第十二周已经在引领课堂讨论了。',
        source: '家长，温哥华',
      },
      {
        id:      'result-2',
        student: 'Juliette W',
        detail:  '六年级 · 卡尔加里',
        start:   540,
        end:     720,
        weeks:   16,
        trait:   'Organization 结构: 2 → 5',
        quote:
          '孩子的老师告诉我们，作文从以前的两三行变成了满满一页，结构也清楚了。',
        source: '家长，卡尔加里',
      },
      {
        id:      'result-3',
        student: 'River C',
        detail:  '七年级 · 丹佛',
        start:   710,
        end:     940,
        weeks:   16,
        trait:   'Ideas 思考: 3 → 5',
        quote:
          '从害怕写作任务，到提前交作业。导师确切地知道卡在哪里了。',
        source: '家长，丹佛',
      },
    ],
  },
}


// ── /program ─────────────────────────────────────────────────────
export const program = {
  meta: {
    title: 'ELA 课程 — DODO Learning',
    description:
      '真人、在线、导师亲授的英文语言艺术课程。语言循环体系与 MCT 课程为架构，每节课运行 The Loop — 阅读 → 思考 → 表达 → 写作。入学、中期、结业三次Lexile评估。每个16周周期Lexile阅读水平提升约一个年级。',
  },
  hero: {
    chip:       '一次思考，两种语言。',
    kidsChip:   '5–8 岁？看都学启蒙 →',
    h1:         'ELA 课程里发生了什么？',
    h1zh:       '',
    sub:
      '特约导师，线上一对一——地理不再是障碍。阅读与写作以 MCT gifted-ELA 传统为根基，经 The LCS 展开：Reading、Thinking、Speaking、Writing。进步以 Lexile 数据和 6+1 Trait 评估体系衡量。',
    cta1: '了解详情',
    cta2: '预约咨询',
    stats: [
      { value: '16',       unit: '周',         desc: '一份真正的承诺'                          },
      { value: '4',        unit: '项技能',         desc: '阅读 · 思考 · 表达 · 写作' },
      { value: '3',        unit: '次评估',    desc: '第0周 · 第8周 · 第16周'                     },
      { value: '1',        unit: '位导师（Navigator）',      desc: '了解您的孩子'                      },
      { value: '1对1',     unit: '始终如一',           desc: '无班级课，无导师轮换'         },
      { value: '∞',   unit: '完整 The Loop',  desc: '每一节课'                      },
    ],
  },
  loop: {
    eyebrow:         'LCS · The Loop · 语言发展系统',
    h2:              '四项技能。每节课都操练。',
    h2zh:            null,
    typeAB:          '', // 2026-05-21: Type A/B 内容移至 /methodology 页面
    methodologyLink: '了解详情 →',
    steps: [
      { num: '01', label: '阅读', labelZh: 'Read', badge: null,
        desc: '经典与SAT必读文本——爱丽丝梦游仙境、隐形人、世界大战——选材在当前Lexile水平或略高一筹。理解力以数据跟踪，而非猜测。' },
      { num: '02', label: '思考', labelZh: 'Think', badge: null,
        desc: '在表达或写作之前，先构建论点。主张是什么？证据是什么？反方观点是什么？结构先行。' },
      { num: '03', label: '表达', labelZh: 'Speak', badge: null,
        desc: '他们提出立场，与导师一起实时表达并支持自己的观点。这是建立真正自信的地方，而非表演出来的自信。' },
      { num: '04', label: '写作', labelZh: 'Write', badge: null,
        desc: '他们所阅读、思考、表达的一切，最终落到纸面上。沿 MCT 写作路径——语法 → 句子 → 段落 → 论文 → 学术写作——以 6+1 Trait 评估体系逐项评分。' },
    ],
  },
  journey: {
    eyebrow: '学习旅程',
    h2:      '孩子的起步——与 DODO Learning 一起的进步。',
    h2zh:    null,
    steps: [
      {
        week: '第1周',
        label: '入学评估', labelZh: '入学评估',
        desc: '我们从精确了解您孩子的当前位置开始——他们的Lexile阅读水平、6+1特质写作基线，以及他们需要支持的具体方面，从不做任何假设。',
        badge: null, badgeSub: null,
      },
      {
        week: '第2–15周',
        label: '每周课程', labelZh: '每周课程',
        desc: '每周，您的孩子与他们的导师（Navigator）一起操练 The Loop——这位导师了解他们的进步、挑战以及下一步该推动什么。每节课最长50分钟，最少每周一次。',
        badge: null, badgeSub: null,
      },
      {
        week: '第16周',
        label: '结业评估与进度报告', labelZh: '结业评估',
        desc: '在课程结束时，您将看到以真实数字呈现的成长：前后Lexile水平，七个特质的6+1特质评分，与起始状态并排对比。您将收到一份书面的进度报告。然后由您决定下一步。',
        badge: null, badgeSub: null,
      },
    ],
  },
  architecture: {
    eyebrow: '语言循环体系',
    h2:      '成果如何累积：The Loop（每节课） → The LCS（每个周期） → 级别（跨多个周期）。',
    h2zh:    null,
    body:
      '语言循环体系——文学精读 · 系统写作训练 · 表达——是课程架构。五大内容板块嵌套于三大分支之下。其内部，每节课都在导师引导下运行 The Loop。在每个16周周期中，课程积累为 LCS 板块进度。跨多个周期，学生通过七个 ELA 级别（Levels 1–7），Level 7 达到大学水平的学术英语。每个级别需要两到三个周期。每个周期为16周。',
    strands: [
      { letter: 'L', nested: ['文学', '词汇', '诗学'], name: 'Literacy',    nameZh: '文学精读',         body: '深度研读文学经典。词汇积累、文学感知力、学生自己的思想宝库。所有语言输出的根基。' },
      { letter: 'C', nested: ['语法', '写作'], name: 'Composition', nameZh: '系统写作训练', body: '系统的写作训练：将阅读深度和思考转化为结构化、有说服力、精准的写作。从句子到学术论文。' },
      { letter: 'S', nested: [], nestedNote: 'DODO 独有的板块——无嵌套板块，因为没有哪本教材能提供它。', name: 'Speaking',    nameZh: '表达',                  body: '与导师进行高质量的一对一讨论。学生厘清观点、组织思维、产出清晰且逻辑严谨的口头表达。' },
    ],
    levelsNote:
      '对标美国SAT、SSAT、IB拓展论文、剑桥KET与PET，以及北美私立学校和资优生项目标准。Level 7相当于大学级别的学术英语能力。',
  },

  combinations: {
    eyebrow: '选择您的组合',
    h2:      '五种课程组合——同一个 The Loop，强度不同。',
    h2zh:    null,
    body:
      '每一种组合都运行完整的16周周期，每节课都运行The Loop，每个学生都与一位专属导师（Navigator）一起学习。不同组合在于每周课时数和侧重点——选择符合您孩子当前需求的模式。',
    items: [
      { id: 'summit',  name: 'Summit',  nameZh: '全境领航',           format: '每周3节文学课 + 1节写作课', price: '$2,830',     forWhom: '加速成长 · 高难度学业里程碑', featured: false },
      { id: 'core',    name: 'Core',    nameZh: '稳健航行',           format: '每周2节文学课 + 1节写作课', price: '$2,250',     forWhom: '最受欢迎 · 长期发展',                 featured: true  },
      { id: 'flex-1',  name: 'Flex 1',  nameZh: '文学阅读自由航行',     format: '每周2节文学课',              price: '$1,185',     forWhom: '先打好阅读基础',                featured: false },
      { id: 'flex-2',  name: 'Flex 2',  nameZh: '大师写作自由航行',     format: '每周2节写作课',                 price: '$2,110',     forWhom: '写作专精',                               featured: false },
      { id: 'flex-3',  name: 'Flex 3',  nameZh: 'GPA管理自由航行',     format: '每周1节GPA学业辅导',            price: '起价 $750', forWhom: '学校学业管理 · 可与上述任意组合搭配', featured: false },
    ],
    note: '每种组合按16周一个周期运行。价格与按周付款选项详见常见问题。',
    faqLink: '查看定价详情 →',
  },

  session: {
    eyebrow:        '一堂真实的课',
    navigatorName:  'Ms. Jennifer',
    sessionPhase:   'The Red Tide · 第4章',
    h2:   '真实的一堂课。',
    h2zh: null,
    p1: '章节已经打开。Ms. Jennifer 先读出声——Turner 嘟囔着说，Mud 在他看来是只青蛙，对他来说，这就够了。她停下，看着学生。',
    q1: '“Turner 在做什么？”',
    p2: '学生说他没有真的在听。Ms. Jennifer 没有继续。“还有呢？”学生翻回前面两段，找到 Mud 刚刚摆出证据的那段。“他一直说 ‘in my opinion’——好像这样说，事情就真的成了。”',
    p3: '几页之后，他们碰到 Baldwin 的甲虫。这次学生自己读完，笑了。“等等——这就是 Turner 在做的事。反过来。”她翻回去做了个标记。这时谈话已经比章节走得更快了。',
    p4: 'Ms. Jennifer 打开 Petruchio 的那段台词。两人一起朗读，两遍。第二遍，她让学生数柔软的辅音——w、r、f、v、l、th。十五行里有十八个。“为什么是这些声音？”学生想了一会儿。“因为衣服摸起来是软的。”',
    q4: '“下周——这一章里的一只动物。四行。一个声音，重复四次。就这样。”',
    navigatorsLink: '认识导师（Navigator）团队 →',
  },
  growth: {
    eyebrow: '我们如何衡量成长',
    h2:      '真实的数字，而非模糊的进度报告。',
    h2zh:    null,
    lexile: {
      h3:    'Lexile阅读水平',
      sub:   '与北美学校使用的测量体系相同——因此您可以直接对比进步。学生通常在每个16周周期内将阅读水平提升约一个年级——平均增长187个Lexile点。',
      note:  '我们不会说您的孩子“读得不错”。我们向您展示他们在16周内从<strong>Lexile 620 到 820</strong>——这就是四年级和六年级阅读水平之间的差距。',
      start: 620, end: 820,
    },
    trait: {
      h3:         '6+1特质写作',
      sub:        '与您孩子学校使用的评分标准相同——因此当您在这里看到进步时，也会在课堂上体现出来。',
      startLabel: '入学时',
      endLabel:   '16周后',
      scaleLabel: '1–6分制',
      note:       '当您问“写作进步了吗？”——我们不说“是的”。我们向您展示每个特质的分数，前后对比，让您精确看到成长发生在哪里。',
    },
  },
  cta: {
    eyebrow: '诊断性咨询',
    h2:      '准备好了解您孩子的真实水平了吗？',
    body:
      '咨询时长20分钟。由导师（Navigator）进行——不是销售电话。我们定位精确的差距，并向您展示对于与您孩子情况相似的学生，头16周会是什么样子。',
    btn:  '预约咨询',
    note: '由导师进行的免费咨询，无任何义务。',
  },
}

// ── /about ───────────────────────────────────────────────────────
export const about = {
  meta: {
    title:
      '什么是 DODO Learning？导师亲授的直播英文读写课程，覆盖 5 岁到高中',
    description:
      'DODO Learning 是一套真人、在线、由导师（Navigator）亲授的英文语言艺术课程——完整的阅读 → 思考 → 表达 → 写作循环，一对一进行，孩子的阅读与写作进步，看得见于 Lexile 与 6+1 Trait 的评分里。加拿大创立，导师来自世界前 50 的大学。我们要的是抵达思维层面的英语精熟。',
  },
  hero: {
    chip:          '我们的故事',
    h1a:           '一个能',  h1em1: '说', h1b: ' 英语的孩子',
    h1c:           '与一个',
    h1d:           '能用英语 ', h1em2: '思考', h1e: ' 的孩子不同。',
    sub:
      '它为这样的家庭而建：孩子的英语已经不错，却还没到学校、大学与将来的工作真正要求的深度。这些孩子里，很多是把英语当一门学科在学——考试能过，听着也流利——可一遇到更难的文本、或一张白纸，语言的边界就露出来了。DODO 的创始人 Janet 一次次看到这道坎，于是建起 DODO 来跨过它。这件事最早从五岁开始，一直做到高中：都学启蒙里的拼读、流利，和读一本好书的纯粹快乐；ELA 课程里完整的 Read → Think → Speak → Write 循环。我们要的，是抵达思维层面的英语精熟。',
    videoLabel:    '观看：Janet 谈到DODO Learning',
  },
  name: {
    p1:       'DODO这个名字源于一个刻意的、双面的理念： ',
    p1strong: 'Do + Do。',
    p2:
      'DO——代表学术可能性的语言，正式论证的语言，您的孩子将引领的未来。DO——代表母语，情感的核心，世界最初变得有意义的透镜。这个名字意味着同时在两种语言中、在每一个层面上做这项工作。',
    p3:
      '双重的“Do”也代表着对迭代的承诺。你无法一劳永逸地掌握一门语言。你通过做、再做来掌握它——每个周期都更深一层，每个周期都更精确地成为你自己的。',
  },
  beliefs: {
    sub:    '每一节课，及至导师与孩子相处的每个教学瞬间，都立于我们的核心支柱。',
    bodies: [
      '流利不在于发音是否标准，而在于思考是否精确——阅读关于人物与命运的经典文本，用证据支持自己的立场，从句子开始构建一篇文章。语言有一种可以被看见的结构：词语背后的词根、论证内部的逻辑、段落的形态。我们先搭建这套架构——并刻意选用高于年级水平的文本——流利自会随之而来。',
      '最深入的学习发生在人与人之间，而不是孩子与屏幕之间。每一节DODO课程都是一场对话——孩子给出的答案是探究的起点，而不是终点。在孩子回答之后，导师的下一步永远是一个更好的问题：让思考变得可见，引导孩子回到文本中寻找证据——而不是一句评价。',
      '一堂好课里真正起作用的，往往是屏幕给不了的那部分。一位真人导师听得出孩子怎么推理，也留意到他没说出口的那一点，并陪着他把一个想法说出来、为它辩护。App 能回答任何问题，却分不清孩子没想到要问的是哪一个。这样的判断力，是两个人之间、慢慢长出来的。',
      '真正的成长是可以看见、可以计数的——而不是别人口头告诉你已经发生。每个周期都以评估为界：第0周的Lexile阅读评估、第8周的进度检查、第16周的结业评估；每一篇写作都依据6+1特质（写作评估）评分。当我们说孩子从Lexile 620进步到820，这段差距清楚地落在纸面上。数字在先，鼓励在后。',
    ],
  },
  loop: {
    sub:         '每节课都遵循谨慎设计的循环。结构一致。效果累积。',
    cta:         '阅读DODO Learning 的教学系统',
    programLink: '查看 ELA 课程 →',
    descs: [
      '经典文学伴随孩子拾级而上——低年级的《爱丽丝梦游仙境》，中段的《金银岛》，到高中阶段的 SAT 经典《了不起的盖茨比》——都不是作为学校作业来读，而是作为关于语言、人物与后果如何运作的活生生的论证。',
      '权衡证据。顺着因果往下走。把两个相互冲突的想法多握一会儿去检验，而不是急着有个结论——每一个思考步骤都在练一种特定的推理，远不止阅读理解练习册所要求的。',
      '拿出一个立场并为它辩护，代入角色的视角，指出证据究竟落在文本的哪一处。把话说出口，思考才会精确到足以落笔。',
      '写作是证明一门语言真正属于你的证据。根据6+1特质评分标准评估进步——不是按年龄或年级，而是按作品本身的能力和技巧。',
    ],
  },
  stats: {
    eyebrow: '由数字说明',
    h2:      '2020–2025 用数字呈现。',
    sub:     '2020 年在加拿大创立。2025 年完成完整课程升级并重新启航。这是品牌建立的五年数据基础。',
    items: [
      { number: '10,000+', label: '已交付教学小时'                                          },
      { number: '300+',    label: '在册学生人数'                                            },
      { number: '75%+',    label: '报名来自真实口碑推荐', marked: true                                    },
      { number: '世界前50',  label: '所有导师（Navigator）毕业院校（牛津、多大、皇后、LSE…）' },
    ],
  },
  navigators: {
    p1pre:          '我们称他们为 ',
    p1strong:       '导师（Navigator）',
    p1post:
      '——贯穿整个16周的纵向引导者，了解这个孩子的声音、节奏和具体差距。他们耐心地在孩子的程度上引导，而不是到点讲课、一视同仁地僵硬授课。',
    p2:
      '一位导师（Navigator）会提出他们自己也不知道答案的问题。他们会对一个七岁孩子关于公平、忠诚、或者某个角色为什么做出那个选择的想法产生真正的好奇心。这些问题源于哈佛教育学院零点项目的Visible Thinking（可视化思维方法）——在哈佛教育研究生院开发的结构化教学协议——但好奇心是真实的。',
    p3:
      '他们是读者。他们是思考者。我们的 ELA 课程导师（Navigator）都拥有世界排名前 50 的大学（牛津大学、多伦多大学、皇后大学、伦敦政治经济学院等）的研究生学位，并具有文学或写作的专业背景。我们的都学启蒙导师，则是专攻语音、发音与流利度的幼儿教育专家。不同的专长，同样的承诺——把语言视为孩子理解一切的方式；并相信一个英语训练扎实的孩子，其心智将比任何考试成绩都更能带他们走得更远。',
    navigatorsLink:  '认识导师（Navigator）团队 →',
    videoCaption:    'Kimberly 老师 · DODO 导师（Navigator）',
    videoCaptionSub: '30秒的自我介绍',
  },
  families: {
    items: [
      {
        quote: '“我想要英语里真正的深度——好成绩衡量不出来的那种。”',
        desc:
          '你看得出孩子有能力，也希望标准比学校定得更高：够得着的阅读，要动脑子才写得出的文字。如果他还带着一门母语，这只会让那份思考更扎实——但你来这儿，是为了英语里的深度，而且希望它被量出来。',
      },
      {
        quote: '“流利不是目标。能打开门的那种英语才是。”',
        desc:
          '你清楚会话英语，和在研讨课、论文、面试里真正有分量的那种英语之间的差别。孩子在前一种里已经自在，你希望他在后一种里也从容——细读、以证据论证、有意图地写作。',
      },
      {
        quote: '“好不是天花板。深度才是。”',
        desc:
          '您的孩子英语已经很强。但您感觉到有一个天花板——在他们如何论证、如何写作、如何在压力下处理复杂性方面。未来属于能够精确推理并有意图地写作的孩子。我们培养这种能力。',
      },
      {
        quote: '“我们希望温和稳定地起步——让孩子享受读懂一本书的乐趣。”',
        desc:
          '为 5–8 岁孩子寻找合适入口的家长。您想要的是一位专属的幼儿教育导师，短而高频的直播课程，以及以语音为先的阅读启蒙——而不是班级课。都学启蒙是 ELA 课程的 K-2 姊妹课程：共用同一种直播授课模式，由专门的师资团队授课。',
      },
    ],
  },
  closing: {
    tagline1: '一次思考，',
    tagline2: '两种语言。',
    sub:
      '这就是那句话的意思。把一个孩子教到能清楚地思考——真正清楚——他就不必再学第二遍；这份习惯会带进他用的每一种语言。这不是一句口号，而是当阅读足够真实、思考真正属于他自己时，自然发生的事。',
    cta: '课堂实录',
  },
}

// ── /consult ─────────────────────────────────────────────────────
export const consult = {
    meta: {
      title:       '预约诊断性咨询',
      description: '预约与DODO Learning的20分钟诊断性咨询。由导师（Navigator）——而非销售人员——精确了解您孩子的当前位置，并描绘出 ELA 课程可能的样子。无需承诺。',
    },
    hero: {
      chip: '一次思考，两种语言。',
      h1:   '我们精确确定您孩子的起点。',
      h1zh: '我们精确确定您孩子的起点',
      sub:  '不是学校报告上说的水平。咨询时长20分钟，与导师（Navigator）进行——不是销售电话。我们诊断、定位差距、给出方案。您来做决定。我们为两个年龄段都提供咨询——都学启蒙（5–8 岁）与 ELA 课程（3 年级+）。',
      cta1: '预约我的咨询',
      cta2: '查看 ELA 课程',
      stats: [
        { value: '20',     unit: '分钟',      desc: '专注，无冗余'                                        },
        { value: '1',      unit: '导师（Navigator）',    desc: '不是销售人员'                                           },
        { value: '4',      unit: '个阶段',       desc: '诊断 · 定位差距 · 制定方案 · 做决定'   },
        { value: '1',      unit: '个Lexile分数', desc: '通话结束前完成评估'                               },
        { value: '0',      unit: '义务',   desc: '预约无需承诺'                                     },
        { value: '∞', unit: '免费',          desc: '永远免费，无需注册'                                       },
      ],
    },
    phases: {
      eyebrow: '通话中会发生什么',
      h2:      '四个阶段。二十分钟。一个真实的答案。',
      h2zh:    '四个阶段，二十分钟，真实的答案',
      steps: [
        { num: '01', label: '诊断',         labelZh: '诊断',            time: '5分钟',
          desc: '我们询问您孩子目前的学校体验——而不是他们的英语水平。对他们来说，一堂典型的英语课是什么感觉？不是分数——是感受。' },
        { num: '02', label: '定位差距', labelZh: '确定差距', time: '5分钟',
          desc: '我们精确指出具体的差距。词汇深度差距、流利度差距和写作信心差距需要不同的解决方案。我们识别出属于哪一种。' },
        { num: '03', label: '制定方案',        labelZh: '制定方案', time: '5分钟',
          desc: '我们描述对于与您孩子情况相似的学生，头16周会是什么样子——包括具体的Lexile目标和6+1特质写作基线。' },
        { num: '04', label: '做决定',           labelZh: '做决定',       time: '5分钟',
          desc: '如果课程是合适的匹配，我们解释费用和下一步。没有压力。条款清晰。您准备好后再做决定。' },
      ],
    },
    call: {
      eyebrow:       '一次真实的咨询',
      navigatorName: 'Ms. Willow',
      sessionPhase:  '诊断阶段 · 5分钟',
      h2:   '导师（Navigator）实际说什么。',
      h2zh: '导师实际如何开展咨询',
      p1: '导师不会以推销话术开场。他们以一个提问开场：',
      q1: '“请告诉我，对您的孩子来说，一堂典型的英语课是什么样子的。不是分数——是感受。他们会举手吗？他们会回避老师的目光吗？”',
      p2: '那个问题在三十秒内告诉我们的信息，比一份成绩单一年告诉我们的还要多。我们在倾听学校衡量的东西与实际发生的情况之间的差距。',
      p3: '到第15分钟，我们已经明确了差距。我们描述了对于具有该特定情况的学生，The Loop的头四周会是什么样子。',
      p4: '通话以一句诚实的话结束：',
      q4: '“根据您告诉我的情况，我认为 ELA 课程是合适的匹配。这是确切的原因——以及如果在第8周效果不理想，会发生什么。”',
    },
    trust: {
      eyebrow: '预约之前',
      h2:      '这是一个诊断性通话，不是销售通话。',
      h2zh:    '这是诊断通话，不是销售通话',
      body:    'DODO咨询由导师（Navigator）进行——也就是实际授课的同一批人。他们会诚实告诉您 ELA 课程目前是否适合您的孩子。如果不适合，他们也会如实相告。',
      points: [
        '由导师（Navigator）进行，而非销售代表',
        '通话结束前确定Lexile水平',
        '诚实的匹配度评估——我们只招收我们真正能推动进步的学生',
        '预约无需承诺',
        '提供英语和普通话服务',
      ],
    },
    calendar: {
      eyebrow: '预约您的咨询',
      h2:      '选择一个时间。剩下的事交给我们。',
      h2zh:    '选择时间，我们来安排',
      sub:     '在下方选择任意可用的20分钟时段。导师（Navigator）会确认并提前了解您孩子的情况。',
      badge:   '导师可预约',
      points: [
        '一个工作日内确认',
        '提供英语和普通话服务',
        '可随时改期——无任何费用',
      ],
    },
    form: {
      eyebrow: '咨询信息',
      h2:      '聊聊您的孩子',
      h2zh:    'Tell us about your child',
      intro:   '信息将直接发送给创始人 Janet 本人。她会亲自回复，通常一个工作日内。',
      sections: {
        child:    '关于孩子',
        region:   '您在哪里',
        topic:    '想聊些什么',
        contact:  '如何联系您',
        guardian: '填写人信息',
      },
      fields: {
        childName:    { label: '孩子姓名（或拼音首字母）', placeholder: '名字即可' },
        grade:        { label: '年级',                     placeholder: '请选择…' },
        region:       { label: '所在地区',                 placeholder: '请选择…' },
        topic:        {
          label:       '您想聊些什么？',
          placeholder: '阅读困难、转学过渡、资优课程、还在了解中——任何促使您咨询的原因都可以。',
        },
        email:        { label: '电子邮箱', placeholder: 'you@example.com' },
        wechat:       { label: '微信号',   placeholder: '可选' },
        preferredContact: {
          label:  '您希望我们如何联系？',
          email:  '电子邮箱',
          wechat: '微信',
        },
        guardianName: { label: '您的姓名', placeholder: '家长或监护人' },
      },
      grades:  ['学前班','幼儿园','一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','十年级','十一年级','十二年级','尚不确定'],
      regions: ['加拿大','美国','中国大陆','其他'],
      submit:  { idle: '发送给 Janet', sending: '发送中…' },
      errors: {
        required: '请填写此项。',
        email:    '邮箱格式有误，请检查一下。',
        network:  '出了点问题。请重试，或直接发邮件至 janet@dodolearning.com。',
      },
      success: {
        eyebrow: '已收到',
        h2:      '已收到，{name}。',
        h2zh:    'Got it',
        body:    'Janet 已收到信息，将在一个工作日内亲自回复。',
        preface: '若您希望更及时的沟通，欢迎通过微信联系——怎样方便都可以：',
        emailCard: {
          label:   '电子邮箱',
          address: 'janet@dodolearning.com',
          cta:     '复制邮箱',
          copied:  '已复制',
        },
        wechatCard: {
          label:        '微信',
          idLabel:      '微信号',
          id:           '__PLACEHOLDER__',
          cta:          '复制微信号',
          copied:       '已复制',
          mobileHint:   '使用手机？打开微信 → 点击右上角 +，选「添加朋友」，然后搜索上方微信号。',
          desktopHint:  '使用微信扫码，或搜索上方微信号添加。',
        },
      },
    },
  }

// ── /compare ─────────────────────────────────────────────────────
export const compare = {
    meta: {
      title:       '为什么选择DODO Learning——它与补习、ESL和备考有何不同 | DODO Learning',
      description: 'DODO Learning 是一套认知发展项目——不是补习中心，不是ESL项目，不是备考辅导。以下是它在结构上的根本区别，以及这种区别如何在十六周内累积。',
    },
    s1: {
      eyebrow: '为什么选择DODO Learning',
      h1a: '每个英语项目都承诺 ', h1b: '进步。', h1c: ' 但只有其中一个培养思考者。',
      sub: '这就是 DODO Learning 与您孩子可选的其他方案，在结构上的不同之处。',
    },
    k2Note: {
      text:       '正在为 5–8 岁孩子做对比？都学启蒙是 K-2 阶段的入口——共用同一种直播模式，由专属的幼儿教育导师授课。',
      linkLabel:  '了解都学启蒙 →',
      href:       '/little-dodo',
    },
    s2: { pull: '大多数项目教您的孩子正确回答问题。 ', pullSpan: 'DODO Learning培养能提出更好问题的英语思维者。', pullEnd: '' },
    s3: {
      eyebrow: '品类差异',
      h2: '五个对比，厘清 DODO Learning 究竟是什么。',
      cols: [
        { question: 'vs. 补习中心和ESL项目', title: '认知发展——而非语言练习', body: '补习中心解决作业问题。语言课程训练会话流利度。DODO Learning 发展的是推理架构——使孩子能够阅读密集的分析性散文、用文本证据论证立场、并精确写作。这是不同类别的工作，产出的是不同类型的学生。' },
        { question: 'vs. 年级学业支持', title: '以自身上限为衡量标准', body: '学校英语是针对平均水平校准的。DODO Learning的课程基于MCT语言艺术课程框架的原则——北美最严谨的经典ELA项目之一，为有能力达到真正精通的学生而设计。您的孩子根据他们自己的Lexile天花板来衡量，而不是班级平均水平。' },
        { question: 'vs. 备考公司', title: '十六周的完整弧线', body: '备考针对单一的考试窗口进行优化。ELA 课程构建认知能力，而强大的成绩是这种能力的自然副产品——因为一个能阅读复杂性、综合证据、并有意图地写作的学生，将在他们面对的任何评估中表现出色。' },
        { question: 'vs. AI 导师与作业应用', title: '提问背后的判断力', body: 'AI 是孩子一生都会使用的工具，善用它是值得掌握的能力。但它做不到的是构建背后的判断力。它会回答任何问题。导师教孩子哪个问题值得问，然后在他们尚未阐述的点上继续追问——而阅读和思考始终是孩子自己的功课。' },
        { question: 'vs. 自行购买课程材料', title: '课堂里的真人读者', body: '经典 ELA 教材是真实的书籍，有决心的家庭可以买到。收到的是阅读和写作。收不到的是第三个板块——一个倾听孩子如何推理的人，在恰当的时机提出更难的问题，并指导观点的口头辩护。这部分没有页码。' },
      ],
    },
    s4: {
      eyebrow: '方法论', h2: '让 DODO Learning 与众不同的是语言循环体系。',
      caption: '每节课都运行同一流程：阅读 → 思考 → 表达 → 写作。每个阶段都经过评估，每个阶段都为下一阶段提供输入。十六周中，以这种方式跟随导师学习的孩子不仅阅读能力提升，而且能更好地应对任何困难任务——这才是持续回报的部分。',
      methodologyLink: '阅读完整方法论 →',
    },
    s5: { eyebrow: '创始人寄语', h2: '我们为什么创建DODO Learning ——以及我们决定永远不会成为什么。', sub: '八分钟无脚本讲述我们为何出发，以及我们决定绝不做什么。', founderName: 'Janet——创始人兼首席导师（Navigator）' },
    s6: {
      eyebrow: '导师（Navigator）差异', h2: '导师能做到而家教做不到的事。',
      points: [
        { label: '纵向知识', body: '按次计费的家教每次见到您的孩子都是全新的。导师（Navigator）则承载完整的弧线——您孩子的Lexile基线、他们从第一周开始的6+1特质档案、三次课前那个仍然需要改进的具体句子。每位导师（Navigator）都拥有世界排名前50的大学（牛津大学、多伦多大学、皇后大学、伦敦政治经济学院等）的研究生学位，并具有文学或写作的专业背景。这种背景会累积。它产生的洞察力无法在一对一的单次课程中被复制。' },
        { label: '更好的提问', body: '在您的孩子回应之后，导师（Navigator）的第一个动作永远是一个后续问题，这些问题源于哈佛教育学院零点项目的Visible Thinking（可视化思维方法）——而不是一句评价。这是培养思考者与训练应答者之间的区别——一个长出能力，另一个长出等着被告知的习惯。' },
        { label: '带数字的反馈', body: '每位导师（Navigator）的回应都会引用具体的6+1特质、具体的分数和具体的下一步行动。不是“做得好”——而是“你的思考特质从2分进步到了3分，因为这句话。要达到4分，需要做到这些。”您的孩子永远确切知道他们目前的位置，以及更高的分数要求他们做什么。' },
        { label: '一位导师（Navigator）。完整的16周弧线。', body: '孩子的导师从初始 Lexile 评估到最终的 6+1 Trait 评价始终陪伴。一段关系、一个标准、同一双眼睛审视孩子提交的每一篇草稿和每一次口头辩护。关系本身便是课程的一部分。' },
      ],
      navigatorsLink: '认识导师（Navigator）团队 →',
    },
    s7: {
      eyebrow: '这里的进步是什么样的', h2: '可衡量的、具体的、可感知的 ——与其他地方相比。',
      cols: [
        { num: '01', title: '一个 Lexile 数值', body: '在16周内从Lexile 620到790是一个可验证的事实。字母等级是学校根据班级平均水平对合规性的评估。DODO Learning在入学时、期中时和结业时测量阅读复杂性——您的孩子能够独立处理的文本的实际认知需求。' },
        { num: '02', title: '七个特质，评分', body: '写作根据七个具体特质评分：思考、结构、声音、用词、流畅、规范、呈现。您的孩子知道哪个特质进步了，进步了多少，以及达到更高分数确切需要什么。在这里，进步从来不是模糊的。' },
        { num: '03', title: '一个有始有终的周期', body: 'ELA 课程有起点、可衡量的中期节点和确认的成果。它不是按月订阅、可以随意进出的服务，因为复利效应只在学习持续进行、导师对孩子了解不断积累时才发生。' },
      ],
    },
    s8: {
      eyebrow: '他们的话', h2: '从别处转来的学生 ——以及什么改变了。',
      voices: [
        { quote: '在此之前我上了三年的英语课外辅导。我能回答阅读理解问题，但我实际上无法告诉你那章意味着什么或者为什么重要。第一次我的导师（Navigator）要求我为自己的解读辩护时，我无话可说。十六周后，我能写出两页的论证。', grade: '七年级', city: '卡尔加里', weeks: '16周课程，已完成', detail: 'Lexile 590 → 780 · 6+1 思考: 1 → 4 · 6+1 结构: 2 → 4 · 入学前已参加两年课外辅导' },
        { quote: '在我父母尝试了两个ESL项目之后才来到DODO Learning。我的英语变得更流利了，但我仍然写不出一篇言之有物的文章。在这里，导师（Navigator）让我把同一段重写了六遍。每一次我都理解了一些我以前不理解的东西。这是一种不同层次的工作。', grade: '六年级', city: '温哥华', weeks: '16周课程，第14周', detail: 'Lexile 610 → 760（第14周）· 6+1 声音: 1 → 3 · 6+1 用词: 2 → 4 · 此前就读于两家ESL机构' },
      ],
    },
    s9: {
      h2: '咨询是我们确定DODO Learning是否适合您孩子的地方。',
      sub: '一切从一次对话开始——20分钟，由导师（Navigator）进行，不是销售电话。如果合适，课程开始后我们首先测量的就是您孩子的Lexile基线。',
      ctaPrimary: '预约咨询', ctaSecondary: '查看 ELA 课程',
      note: '咨询免费，无任何义务。ELA 课程随后从确认的Lexile基线开始。',
    },
  }

// ── /methodology ─────────────────────────────────────────────────
export const methodology = {
  meta: {
    title: '语言循环体系 —— DODO Learning方法论',
    description:
      '语言循环体系是DODO Learning的方法论——文学精读、系统写作、表达——每节课以The Loop运行：阅读、思考、表达、写作。' +
      '根植于MCT语言艺术传统和哈佛教育学院零点项目的Visible Thinking（可视化思维方法），' +
      '通过Lexile和6+1特质写作框架衡量。' +
      '在每个16周周期内实现约一个年级阅读水平增长的认知训练。',
  },

  hero: {
    eyebrow: '方法论',
    heading: '语言循环体系，就是一堂 DODO 课真正运转的样子——每一次都如此。',
    subheading:
      '一对一、在线的英语语言艺术，秉承MCT gifted-ELA传统。' +
      '每节课都运行The Loop—— 阅读 → 思考 → 表达 → 写作。' +
      '我们培养达到精通水平的英语思维者。',
  },

  k2Note: {
    text:       '都学启蒙（5–8 岁）也运行同样的 Loop —— 节奏和强度做了适龄调整，结构完全相同。',
    linkLabel:  '了解都学启蒙 →',
    href:       '/little-dodo',
  },

  definition: {
    body:
      '语言循环体系是DODO Learning的英语语言艺术方法论：文学精读、系统写作、表达，每节课以The Loop运行——阅读 → 思考 → 表达 → 写作。它根植于MCT gifted-ELA传统与哈佛教育学院零点项目的Visible Thinking（可视化思维方法），并以Lexile阅读水平和6+1特质写作框架衡量。学生通常在每个16周周期内取得约一个年级的阅读增长。',
  },

  // D37 · 五大内容板块，归入 LCS 三大分支。EN mirror: marketing.en.js methodology.strands
  strands: {
    eyebrow: '体系之内',
    heading: '三大分支，五大板块，一个会阅读的孩子。',
    body:    'LCS 是完整语言教育的形态，而非学科清单。文学精读是语言的输入。系统写作训练是语言的输出，按有序的方式进行。表达是书本无法为你完成的部分。五大内容板块置于这三大分支之下。即使某节课只有一个板块占据孩子的注意力，同时运转的也不止一个。',
    branches: [
      {
        letter: 'L',
        name:   'Literacy',
        nameZh: '文学精读',
        body:   '阅读宝库——语言的输入之处，也是孩子日后写作或表达的一切根基。',
        nested: [
          { name: '文学', body: '完整的、未经删节的经典著作，以写作技巧为阅读重点。不是节选，不是复述——而是作者实际写下的句子，以他们写下的长度呈现。' },
          { name: '词汇', body: '英语背后的拉丁语和希腊语词根。以结构而非记忆为核心，因此孩子从未见过的词也能自行拆解。' },
          { name: '诗学', body: '感知优秀写作如何构建的听觉——节奏、意象、作者所做的选择以及被放弃的选择。' },
        ],
      },
      {
        letter: 'C',
        name:   'Composition',
        nameZh: '系统写作训练',
        body:   '构建引擎——语言的输出之处，也是思想必须经受住落笔考验的地方。',
        nested: [
          { name: '语法', body: '句子的架构，先教、快教，之后用于实践而非背诵。' },
          { name: '写作', body: '句子到段落，段落到文章，文章到学术写作，每一步经评估后再进入下一步。' },
        ],
      },
      {
        letter: 'S',
        name:   'Speaking',
        nameZh: '表达',
        body:   'DODO 独有的板块，也是课堂中导师存在的原因。口头辩护、苏格拉底式对话、为反对的立场辩护。它没有嵌套板块，因为没有哪本教材能够提供它。',
        nested: [],
      },
    ],
    note: '阅读 → 思考 → 表达 → 写作 是一节课的流程。这些板块正是课程的构成。',
  },

  seeItLive: {
    eyebrow:    '实景片段',
    h2:         '90 秒，看一段完整的 Loop。',
    body:
      '一段 LCS 课堂实景——阅读、思考、表达、书写——大约是您泡一杯咖啡的时间。这就是 The Loop 在运转的样子。',
    videoTitle: 'LCS 课堂实景（90秒）',
  },

  why: {
    eyebrow: '为什么是一个循环',
    heading: '大多数项目只训练单一技能。我们训练完整的认知序列。',
    body:
      '词汇练习产出词汇。语法练习产出语法。' +
      '两者都无法培养出一个能阅读难懂的文本、对其形成立场、口头论证该立场、并将其精确写到纸面上的学生。' +
      '这需要训练整个循环——而不是孤立的单个步骤。',
  },

  steps: [
    {
      id:       'read',
      number:   '01',
      label:    'Read',
      cjk:      '阅读',
      heading:  '有意地略高于舒适区。',
      body:
        'ELA 课程中的每一篇文本都是在或略高于学生当前Lexile水平的位置选择的。不是为了挫败——而是为了拉伸。' +
        '阅读根植于MCT语言艺术传统：经典文学伴随学生拾级而上——' +
        '低年级的《爱丽丝梦游仙境》、中段的《金银岛》，到高中阶段的SAT经典如《了不起的盖茨比》，辅以' +
        '与学生当前水平匹配的Lexile补充材料。' +
        '词汇深度和阅读耐力在文本对读者提出要求时增长。' +
        '我们通过Lexile测量来追踪这种成长，而非猜测。',
      proof:    '每节课基于Lexile的文本选择。',
    },
    {
      id:       'think',
      number:   '02',
      label:    'Think',
      cjk:      '思考',
      heading:  '在你说之前，你需要有内容可说。',
      body:
        '大多数英语教学的失败模式是这样的：学生在学会产生思想之前就学会了产生语言。' +
        'The Loop强制思考先行。' +
        '在学生开口之前，他们已经形成了一个立场——无论他们的大脑使用哪种语言。' +
        '导师（Navigator）使用哈佛教育学院零点项目的Visible Thinking（可视化思维方法）——在哈佛教育研究生院开发的结构化教学协议——来为此创造空间，以建立分析深度。',
      proof:    '每节课都有结构化的言前提示。',
    },
    {
      id:       'speak',
      number:   '03',
      label:    'Speak',
      cjk:      '表达',
      heading:  '表达的精确性先于纸面上的精确性。',
      body:
        '每节课都包含与导师（Navigator）的实时苏格拉底式交流——导师是文学或写作领域的专家，' +
        '拥有世界排名前50的大学（牛津大学、多伦多大学、皇后大学、伦敦政治经济学院等）的研究生学位，' +
        '也是英语母语者。' +
        '学生提出一个立场，并加以阐述和支持。导师不会实时纠正——他们引导。' +
        '这个阶段的目标不是流利度。是用英语表达的思维清晰度。这个区别很重要。',
      proof:    '每节课都有导师引导的实时讨论。',
    },
    {
      id:       'write',
      number:   '04',
      label:    'Write',
      cjk:      '写作',
      heading:  '他们所思考和表达的一切，落到纸面上。',
      body:
        '写作沿着MCT语言艺术课程的发展路径推进——Grammar Island → Sentence Island → ' +
        'essay craft → academic composition。每篇作品都根据6+1特质框架评估——' +
        '与加拿大和美国课堂使用的评分标准相同。思考、结构、声音、用词、流畅、规范、呈现。入学分数和结业分数均有记录。',
      proof:    '在入学、中期和结业时进行6+1特质写作评估。',
    },
  ],

  sessionTypes: {
    eyebrow: '两种课型',
    heading: '每个周期包含两种课型。',
    types: [
      {
        id:    'a',
        label: 'A 型 · 文学精读课',
        body:
          '学生朗读并深入文本。导师（Navigator）在句子层面进行指导——词汇、语调、理解——以精确为准，而非泛泛的鼓励。以MCT的 Building Language / Caesar’s English 词汇线索及指定小说为依托。',
      },
      {
        id:    'b',
        label: 'B 型 · 写作课',
        body:
          '学生思考、讨论、起草。导师（Navigator）以一个 Visible Thinking（可视化思维）流程开场，在评价之前先提出更具启发性的问题，并依据6+1特质评分标准评估写作。',
      },
    ],
    note: '孩子某周上哪种课型由当前 Lexile 数据决定，而非固定轮换。如果阅读需要再多一周，就多给一周。',
  },

  lexile: {
    eyebrow: '测量框架',
    heading: 'Lexile 是北美的阅读标准——不是 DODO 自己造的数字。',
    body:
      'Lexile水平被加拿大的省级教育系统、美国的州级课程、' +
      '以及Common Core框架用于测量和追踪阅读发展。' +
      '当一个学生的Lexile在DODO进步时，它与在他们学校进步意味着同样的事情。' +
      '这个测量是可迁移的。这个进步是真实的。',
    stats: [
      {
        id:     'gain',
        number: '187L',
        unit:   '每周期',
        label:  '每个16周周期的平均Lexile增长',
      },
      {
        id:     'grade',
        number: '1',
        unit:   '个年级水平',
        label:  '每个16周周期的平均阅读增长',
      },
      {
        id:     'scale',
        number: '100L',
        unit:   '≈ 半个年级',
        label:  '每100个Lexile点大约相当于半个年级的阅读增长',
      },
    ],
  },

  trait: {
    eyebrow: '写作框架',
    heading: '6+1特质：您孩子学校已经在使用的评分标准。',
    body:
      '6+1特质写作框架从七个维度评估写作：' +
      '思考、结构、声音、用词、流畅、规范、呈现。' +
      '它是不列颠哥伦比亚省、安大略省和美国Common Core写作教学中的标准评分标准。' +
      '当DODO导师（Navigator）根据6+1特质为学生写作评分时，这些分数与他们的课堂老师所衡量的分数直接可比。',
    traits: [
      { id: 'ideas',        label: '思考',            body: '中心信息和支撑细节。这篇写作有值得说的东西吗？' },
      { id: 'organisation', label: '结构',     body: '文章的内部结构。它是有意图地向前推进吗？' },
      { id: 'voice',        label: '声音',            body: '个人语气和对主题的投入。这听起来像一个人，而不是一个模板？' },
      { id: 'word-choice',  label: '用词',      body: '词汇和措辞。词语是在发挥作用，还是仅仅在填充空间？' },
      { id: 'fluency',      label: '流畅', body: '语言的节奏和流畅度。大声朗读时听起来自然吗？' },
      { id: 'conventions',  label: '规范',      body: '语法、拼写、标点。学术写作的标准技术要求。' },
      { id: 'presentation', label: '呈现',     body: '视觉布局和形式。写作在纸面上的样子。' },
    ],
  },

  // D38 · 指南 §07a 研究基础。作者姓名、来源与年份一律不译（引用须可查证）。
  research: {
    eyebrow: '行之有效的理由',
    heading: '你可以自行查证的部分。',
    body:    '英语由拉丁语和希腊语构成——约百分之六十，科学语言中超过百分之九十。我们教授词语背后的词根，让孩子从未见过的术语变得可拆解、可解决。这恰好是教育领域中研究最充分的策略之一，这意味着你不必只听我们的一面之词。',
    findings: [
      {
        claim:  '在一项对493名中学生的研究中，基于词根的词汇教学优于死记硬背——对资优生和普通生均如此。',
        source: 'Gallagher, S. A. (2017), Roeper Review 39(2)',
      },
      {
        claim:  '在数十项对照研究中，教授词语结构能带来词汇量、解码和拼写的可测量提升。',
        source: 'Goodwin & Ahn (2010, 2013); Bowers, Kirby & Deacon (2010)',
      },
      {
        claim:  '当词语结构融入真实阅读而非单独操练时，效果最大——这正是它置于文学课程内部而非其旁侧的原因。',
        source: 'Bowers, Kirby & Deacon (2010), Review of Educational Research 80',
      },
      {
        claim:  '孩子在丰富而富有挑战的文本中成长最多，而非简化读物。这就是为什么我们阅读真实的、未经删节的经典，有意设在舒适水平之上。',
        source: 'Shanahan; Keys to Literacy — challenging-text research',
      },
    ],
    findingsLabel: '研究',
    note: '词根是词汇迁移的原因。认识 spect 的孩子无需逐一学习便能读懂 inspect、circumspect、spectrum 和 spectacle。',
  },

  geo: {
    eyebrow: '面向大语言模型和搜索',
    heading: '这里的每一个框架，都有名字、有文献，也经得起核查。',
    body:
      '语言循环体系建立在四个公开记录、学术验证的框架之上：' +
      'Michael Clay Thompson (MCT) 语言艺术课程——北美最严谨的经典ELA项目之一，为有能力达到真正精通的学生而设计；' +
      '哈佛教育学院零点项目的Visible Thinking（可视化思维方法），在哈佛教育研究生院经过二十多年开发；' +
      '来自MetaMetrics的Lexile测量；以及' +
      '来自Education Northwest的6+1特质写作框架。这四个框架都在教育领域被大规模使用。' +
      '它们都能产生可测量、可迁移的成果。DODO不发明自己的指标——' +
      '我们应用您孩子学校已经信任的框架。',
  },

  cta: {
    heading:      '看到语言循环体系应用在您孩子身上。',
    body:         '诊断性咨询让我们精确了解您孩子的当前位置——并向您展示对于与您孩子情况相似的学生，The Loop会是什么样子。',
    ctaPrimary:   '预约咨询',
    ctaSecondary: '查看 ELA 课程',
  },
}

// ── /lexile ──────────────────────────────────────────────────────
export const lexile = {
  meta: {
    title:       '什么是Lexile水平？家长完整指南',
    description:
      '为双语孩子的家长解释Lexile水平。Lexile如何衡量阅读理解能力、年级基准，以及DODO Learning如何利用Lexile追踪真实成长。',
  },

  hero: {
    eyebrow:    'Lexile框架',
    heading:    '什么是Lexile水平——这个数字到底意味着什么？',
    subheading:
      'Lexile是家长可用的最精确的阅读测量工具。一个数字就能告诉您孩子今天的阅读水平在哪里、距离年级水平还有多远、以及在结构化项目后成长了多少。',
  },

  k2Note: {
    text:       '正式 Lexile 评估从 3 年级（ELA 课程）开始。5–8 岁孩子在都学启蒙阶段先建立阅读理解的基础——不会过早给五岁孩子打分。',
    linkLabel:  '了解都学启蒙 →',
    href:       '/little-dodo',
  },

  what: {
    eyebrow: '理解量表',
    heading: '一个数字。将阅读能力精确地放置在0L到2000L的量表上。',
    body:
      'Lexile阅读水平在标准化量表0L至2000L上测量阅读理解能力。这个数字同时反映三件事：词汇复杂性、句子密度以及概念的抽象程度。Lexile 650L的学生能够独立理解该水平的文本；750L的文本略高于他们——适合在引导下挑战，但不适合独立阅读。在DODO，每节课都使用设定在学生当前Lexile水平以上80L到120L之间的文本——恰好处于真正成长发生的区间内。',
  },

  grades: {
    eyebrow: '年级基准',
    heading: '每个年级对应的Lexile范围。',
    note:
      '以下范围反映了典型的北美英语母语学生。双语学生通常得分低于这些范围——不是因为能力较低，而是因为Lexile专门衡量学术英语。弥合这一差距正是The Loop的构建目标。',
    rows: [
      { grade: '三年级', range: '415L – 760L',   midpoint: '520L'  },
      { grade: '四年级', range: '635L – 950L',   midpoint: '740L'  },
      { grade: '五年级', range: '770L – 1080L',  midpoint: '860L'  },
      { grade: '六年级', range: '855L – 1165L',  midpoint: '1010L' },
      { grade: '七年级', range: '925L – 1235L',  midpoint: '1065L' },
      { grade: '八年级', range: '985L – 1295L',  midpoint: '1130L' },
    ],
  },

  bilingual: {
    eyebrow: '双语孩子',
    heading: '为什么双语孩子通常得分低于年级水平——以及为什么这不是全部。',
    body:
      'Lexile分数衡量的是学术英语理解能力——而不是智力、口语流利度或努力程度。一个能自信地说英语并在学校获得良好成绩的孩子，仍可能在Lexile评估中得分低于年级水平。这个差距不是失败。它反映了会话语言和学术语言之间的差异。会话流利度通过日常社交互动自然发展。学术语言——处理密集文本、跟随抽象论证、从陌生词汇中提取含义的能力——需要结构化、有意的练习。这正是The Loop训练的内容。',
  },

  dodo: {
    eyebrow: 'DODO如何使用Lexile',
    heading: '三次评估。一条清晰的成长轨迹。',
    body:
      'DODO 在 ELA 课程中的三个时间点使用经 MetaMetrics 认证的 Lexile 评估工具。每次评估后 72 小时内与家长分享结果。您始终会收到一个具体的数字——从来不是模糊的进度更新。',
    points: [
      {
        id:    'week0',
        label: '第0周 — 入学评估',
        body:  '在第一次上课前完成。确定您孩子的Lexile基线，并决定第1至4周的内容难度。同时拍摄6+1特质写作快照。',
      },
      {
        id:    'week8',
        label: '第8周 — 期中检查',
        body:  '在课程中途进行进度评估。如果成长符合预期，内容难度相应提高。如果8周成长低于50L，我们会启动诊断性回顾并立即调整——而不是等到课程结束。',
      },
      {
        id:    'week16',
        label: '第16周 — 结业评估',
        body:  '最终的Lexile测量。学生通常进步100L到150L——大约相当于一个完整年级的阅读成长。结业评估还包括完整的6+1特质写作评估和书面进度报告。',
      },
    ],
  },

  examples: {
    eyebrow: '典型结果',
    heading: '16周的成长，以Lexile数字呈现。',
    note:    '数据来自完成 ELA 课程的学生。结果反映了持续的出勤率和课间练习。',
    bars: [
      { start: 510, end: 670, weeks: 16, label: '三年级学生 — 温哥华' },
      { start: 650, end: 820, weeks: 16, label: '五年级学生 — 多伦多' },
      { start: 770, end: 950, weeks: 16, label: '七年级学生 — 旧金山湾区' },
    ],
  },

  cta: {
    heading:      '精确了解您孩子目前的阅读水平。',
    body:         '入学评估大约需要30分钟，并产生一个具体的Lexile数字。这个数字是一条成长轨迹的起点，您可以在每节课后追踪这条轨迹。',
    ctaPrimary:   '预约咨询',
    ctaSecondary: '查看方法论',
  },
}

// ── /results ─────────────────────────────────────────────────────
export const results = {
  meta: {
    title: '学生成果',
    description:
      '来自DODO Learning学生的真实Lexile成长数据。匿名化结果' +
      '展示了在 ELA 课程中的阅读和写作进步——通过 Lexile 水平和 6+1 特质写作框架衡量。',
  },

  hero: {
    eyebrow:    '学生成果',
    heading:    '可以用数字读到的成长。',
    subheading:
      '以下每个成果都是经过衡量的——不是估计，不是感觉。Lexile分数' +
      '在 ELA 课程前后。真实的学生。真实的数据。姓名按设计隐藏。',
  },

  k2Note: {
    text:       '这些是 ELA 课程的成果——Lexile 测量、6+1 Trait 评分。都学启蒙阶段的成果呈现方式不同：朗读时的自信、面对理解题的从容、每天打开一本书的稳定习惯。正式的 Lexile 轨迹之后才开始。',
    linkLabel:  '了解都学启蒙 →',
    href:       '/little-dodo',
  },

  proof: {
    stats: [
      { id: 'avg-lexile',   number: '187', unit: '个点',       label: '所有学生的平均Lexile增长' },
      { id: 'grade-levels', number: '1.2', unit: '个年级水平', label: '16周内的平均成长' },
      { id: 'students',     number: '94%', unit: '',             label: '的学生进步了至少一个完整年级水平' },
    ],
  },

  intro: {
    heading: '我们如何衡量。',
    body:
      '在第一次上课前，每位学生都接受Lexile基线评估' +
      '和6+1特质写作快照。在第8周我们检查轨迹。在第16周我们' +
      '重新测量。差值就是结果。',
  },

  anchor: {
    eyebrow:  '长期证据',
    heading:  '多个16周周期的累积效应。',
    body:
      '一位加拿大学生在10岁时开始DODO。三年后，13岁时，他们参加了SSAT考试。',
    stats: [
      { number: '92', unit: '百分位', label: 'SSAT词汇' },
      { number: '95', unit: '百分位', label: 'SSAT写作'    },
    ],
    note: '每个周期的Lexile和6+1特质差值（见下文）是直接衡量指标。SSAT百分位数是这些差值在三年持续就读后累积的结果。',
  },

  results: [
    {
      id:           'student-a',
      label:        '学生A',
      lexileStart:  580,
      lexileEnd:    780,
      weeks:        16,
      gradeContext: '六年级 — 14个月前来到加拿大',
      quote:        '她大约在第十周开始在课堂上举手。到课程结束时，她成了那个向老师提出后续问题的孩子。',
      quoteSource:  '家长',
    },
    {
      id:           'student-b',
      label:        '学生B',
      lexileStart:  640,
      lexileEnd:    860,
      weeks:        16,
      gradeContext: '七年级 — 为加拿大中学入学做准备',
      quote:        '我现在真的能论证一个观点了。不仅仅是用英语——我的思考方式不同了。',
      quoteSource:  '学生',
    },
    {
      id:           'student-c',
      label:        '学生C',
      lexileStart:  490,
      lexileEnd:    670,
      weeks:        16,
      gradeContext: '五年级 — 家庭从上海搬迁到温哥华',
      quote:        null,
      quoteSource:  null,
    },
    {
      id:           'student-d',
      label:        '学生D',
      lexileStart:  820,
      lexileEnd:    1020,
      weeks:        16,
      gradeContext: '八年级 — 目标是美国顶尖大学路径',
      quote:        '导师并没有修正我的写作。他们改变了我阅读的方式。写作自己就修正了。',
      quoteSource:  '学生',
    },
    {
      id:           'student-e',
      label:        '学生E',
      lexileStart:  610,
      lexileEnd:    800,
      weeks:        16,
      gradeContext: '六年级 — 双语家庭，普通话为主',
      quote:        '我们选择DODO是因为我们想要Lexile数据。自信是我们没想到会得到的那部分。',
      quoteSource:  '家长',
    },
    {
      id:           'student-f',
      label:        '学生F',
      lexileStart:  710,
      lexileEnd:    920,
      weeks:        16,
      gradeContext: '七年级 — 不列颠哥伦比亚省列治文，为IB项目做准备',
      quote:        null,
      quoteSource:  null,
    },
  ],

  writing: {
    eyebrow: '6+1特质写作成长',
    heading: '写作分数提升是因为思考提升了。',
    body:
      '6+1特质框架从七个维度衡量写作——与加拿大和美国课堂使用的评分标准相同。' +
      '入学和结业分数由导师（Navigator）评估。',
    traits: [
      { id: 'ideas',        label: '思考',            entryAvg: 2.1, exitAvg: 4.2 },
      { id: 'organisation', label: '结构',     entryAvg: 2.0, exitAvg: 4.4 },
      { id: 'voice',        label: '声音',            entryAvg: 2.3, exitAvg: 4.1 },
      { id: 'word-choice',  label: '用词',      entryAvg: 2.4, exitAvg: 4.3 },
      { id: 'fluency',      label: '流畅', entryAvg: 2.2, exitAvg: 4.0 },
      { id: 'conventions',  label: '规范',      entryAvg: 2.5, exitAvg: 4.2 },
      { id: 'presentation', label: '呈现',     entryAvg: 2.4, exitAvg: 4.1 },
    ],
  },

  methodology: {
    eyebrow:  '数字为何变动',
    heading:  'Lexile成长是认知训练的自然副产品。',
    body:
      '学生不是通过练习Lexile测试来提高Lexile分数的。他们通过更精确地思考——用两种语言——来提高。' +
      'The Loop是推动变化的原因。' +
      'The Loop根植于MCT语言艺术传统和哈佛教育学院零点项目的' +
      'Visible Thinking（可视化思维方法），由拥有世界排名前50大学研究生学位的导师（Navigator）一对一交付。',
    cta:     '阅读完整方法论',
    ctaHref: '/methodology',
  },

  // Consultation CTA
  foundingFamily: {
    eyebrow: '诊断性咨询',
    heading: '精确了解您孩子的真实水平。',
    body:
      '咨询时长20分钟。由导师（Navigator）进行——不是销售电话。我们测量您孩子的Lexile水平，定位精确的差距，并向您展示对于与您孩子情况相似的学生，ELA 课程会是什么样子。',
    cta: '预约咨询',
  },
}

// ── /navigators ──────────────────────────────────────────────────
export const navigators = {
    meta: {
      title: '导师（Navigator）团队',
      description: "DODO导师（Navigator）不是老师也不是家教。他们是纵向伙伴，了解您孩子的Lexile基线、6+1特质写作档案以及他们接下来需要前往的确切方向。",
    },
    hero: {
      eyebrow: '导师（Navigator）团队',
      h1a: "您的孩子不需要另一位老师。他们需要的是确切知道 ",
      h1b: '他们在哪里',
      h1c: ' — 以及确切知道 ',
      h1d: '他们要前往哪里',
      h1e: '的人。',
      sub: '大多数项目教授内容。导师（Navigator）教授思考者。',
    },
    k2Note: {
      text:       '两支专长不同的导师团队，承袭同一种 Navigator 教学理念：都学启蒙（5–8 岁）由专注语音、发音与流利度的幼儿教育导师授课；ELA 课程（3 年级及以上）由文学、写作与作文专长的导师团队授课。共用一套直播模式，同样的专属师生关系。',
      linkLabel:  '了解都学启蒙 →',
      href:       '/little-dodo',
    },
    s2: {
      eyebrow: '重新定义',
      h2: "让我们先澄清导师（Navigator）不是什么——从而明确他们是什么。",
      cols: [
        { strike: '不是老师',     title: '带地图的引导者',                      body: '老师推动班级前进。导师（Navigator）推动您的孩子——从他们确切所在的位置开始。' },
        { strike: '不是家教',        title: '纵向伙伴',                  body: "家教解决今晚的作业。导师（Navigator）跟踪您孩子跨越16周的具体差距。" },
        { strike: '不是讲师',  title: "了解您孩子声音的人", body: "讲师交付内容。导师（Navigator）知道您的孩子何时安静下来——以及为什么。" },
      ],
    },
    s3: {
      eyebrow: '工作内容',
      h2: '四个阶段。一位导师（Navigator）。每节课。',
      steps: [
        { num: '01', phase: '阅读',  headline: "在精确的Lexile水平上选择当天的文本——略高于舒适区，低于挫败区。", sub: '基于Lexile校准的文本选择' },
        { num: '02', phase: '思考', headline: "为学生自己的思考留出空间。不填补沉默。等待想法的出现。", sub: '哈佛教育学院零点项目的Visible Thinking（可视化思维方法）贯穿整个过程' },
        { num: '03', phase: '表达', headline: "通过苏格拉底式对话引出学生的立场。然后挑战它。", sub: '口头论证——被捍卫，而非被表演' },
        { num: '04', phase: '写作', headline: '实时根据6+1特质评估书面回应。分数具体。反馈精确。', sub: '6+1特质框架 — 明确分数' },
      ],
    },
    s3half: {
      eyebrow:    '选拔',
      h2:         '我们如何挑选导师（Navigator）。',
      body:       '在与 DODO 学生见面之前，每一位导师（Navigator）都要通过教学演示、Lexile 蓝思分级认证，以及 6+1 写作维度的标定。下面是 3 分钟的过程。',
      videoTitle: 'DODO 如何筛选导师（3 分钟）',
    },
    s4: {
      eyebrow: '这段关系',
      h2: '同一位导师（Navigator）。每节课。十六周。',
      points: [
        { label: '资质',  body: "每位导师（Navigator）都拥有世界排名前50的大学（牛津大学、多伦多大学、皇后大学、伦敦政治经济学院等）的研究生学位，并具有英国文学或写作的专业背景。他们是经过认证的Lexile评估从业者，并接受过6+1特质写作框架的培训。英语母语者，在北美学术背景下具有与双语孩子的纵向合作经验。" },
        { label: '匹配',     body: "导师（Navigator）是与学生匹配的——而不是分配的。在第一次上课前，DODO评估您孩子的Lexile基线、6+1特质写作档案以及沟通风格。这种匹配是刻意的。" },
        { label: '纵向', body: "您孩子的导师（Navigator）承载他们的全部历史。每一次Lexile分数。每一条课堂笔记。每一个概念被理解或未被理解的时刻。没有重新开始。没有新面孔。" },
        { label: '差距追踪', body: '导师（Navigator）不准备教案。他们为您的具体孩子做准备——他们这周在哪里，差距是什么，以及The Loop的哪一部分会弥合这个差距。' },
      ],
    },
    s4half: {
      eyebrow:    '认识导师（Navigator）',
      h2:         'Kimberly 老师。',
      bio:        'Kimberly 老师现任大学教授，讲授英语文学与传播学，持有皇后大学的教育学学位，七年来陪伴学生走过北美顶尖大学所要求的精读与系统写作训练。她的课堂传承 MCT 的"作者临摹"理念——让学生反复研读一位成熟作家的笔触，直到那些笔触能在自己的文字中自然浮现。在 The Loop中，她最擅长 Speak（表达）→ Write（写作）的衔接——引导学生把口头表达过的立场，落成纸上一句精确的句子。',
      stats: [
        { label: '教学经验',      value: '7 年' },
        { label: 'Lexile 认证',  value: '已认证' },
        { label: '6+1 写作标定', value: '已标定' },
      ],
      videoTitle: 'Kimberly 老师 · DODO 导师（Navigator）',
    },
    s5: { eyebrow: '导师（Navigator）团队', h2: '我们团队中的其他导师（Navigator）。' },
    s6: {
      eyebrow: '实际应用',
      h2: '一堂真实课中发生了什么',
      timeline: [
        { label: '第0–5分钟：评估',          body: '导师回顾上节课的笔记以及学生自上次课以来的书面作业。他们知道学生在哪里遇到困难，什么被理解了，以及今天需要强化什么。' },
        { label: '第5–20分钟：阅读与思考',       body: '学生阅读一篇经过Lexile校准的文本。导师提出一个开放式问题。然后等待。沉默是刻意的——这是思考发生的地方。' },
        { label: '第20–35分钟：表达与挑战', body: "学生阐述他们的立场。导师倾听，然后用一个苏格拉底式后续问题提出挑战。目标不是达成一致——而是精确性。" },
        { label: '第35–45分钟：写作与评分',     body: '学生写下他们的论证。导师使用6+1特质实时评分——思考：4/6，结构：5/6。反馈具体，而非笼统。分数指明了差距。' },
        { label: '第45–50分钟：后续步骤',        body: '导师布置有针对性的作业——专门针对今天确定的差距。家长收到包含Lexile进度和具体下一次课重点的课堂笔记。' },
      ],
    },
    s7: {
      eyebrow: '证据',
      h2: '家庭的反馈',
      testimonials: [
        { quote: "在DODO之前我们试过三位家教。每次都是一样的：作业辅导，然后下周回到原点。和我女儿的导师在一起，她终于有了一个记得她的人——她在哪里遇到困难，她的优势是什么，她下一步需要去哪里。这是我第一次看到真正的进步。", city: '家长，温哥华',  detail: '学生：七年级 · 与导师Laura完成16周' },
        { quote: "区别在于具体性。在DODO之前，老师会说'写作需要改进'。她的导师告诉我们确切差距在哪里——句子结构、支撑证据——我们看着这些分数一周一周地上升。数字不会撒谎。",                                                 city: '家长，多伦多',   detail: '学生：六年级 · 与导师James完成16周' },
        { quote: "我儿子不喜欢在课堂上说话。但和他的导师在一起，他愿意说。她知道何时等待、何时推动、何时让他思考。我从未见过他这样投入。这不是魔法——这是关系。",                                                                                 city: '家长，蒙特利尔',  detail: '学生：五年级 · 与导师Alicia完成16周' },
        { quote: "在课间，我女儿的导师给她留下有针对性的作业——不是无意义的任务。她真的会去做，因为它与他们在课上讨论的内容相关联。学习不止于60分钟。",                                                                                                       city: '家长，卡尔加里',   detail: '学生：八年级 · 与导师Laura完成16周' },
      ],
    },
    s8: {
      h2a: '您的孩子值得一位确切知道 ',
      h2b: '他们在哪里',
      h2c: ' — 以及 ',
      h2d: '他们要去哪里的导师（Navigator）',
      h2e: '。',
      sub: '十六周。一位导师（Navigator）。在阅读、思考、表达和写作上可衡量的进步。',
      cta: "预约咨询",
      note: '无需长期承诺。16周内看到成果。',
    },
  }

// ── /demos ───────────────────────────────────────────────────────
export const demos = {
    meta: {
      title:       '课堂实录',
      description: '观看真实的DODO Learning课堂实录。在导师（Navigator）带领的课程中看到The Loop如何在双语学生身上运行。三个年级段。未经剪辑。',
    },
    hero: {
      chip: '一次思考，两种语言。',
      h1:   '确切看到您孩子的课堂是什么样子。',
      h1zh: '看看真实的课堂是什么样子',
      sub:  '没有推销。没有剪辑的精彩片段。一位真实的导师（Navigator），一位真实的学生，一起完成一堂真实的The Loop课程。在您做决定前观看。',
      cta1: '课堂实录',
      cta2: '预约咨询',
      stats: [
        { value: '3',      unit: '个年级段',  desc: '四至六年级，七至八年级，九年级及以上' },
        { value: '20',     unit: '分钟',          desc: '完整课堂，未经剪辑'       },
        { value: '4',      unit: '个 The Loop 阶段',  desc: '阅读 · 思考 · 表达 · 写作' },
        { value: '1',      unit: '位真实学生', desc: '已获得家长同意'          },
        { value: '1',      unit: '位导师（Navigator）',    desc: '直播，无脚本'               },
        { value: '∞', unit: '免费',          desc: '无需注册'           },
      ],
    },
    videos: {
      eyebrow:   '做决定前先观看',
      h2:        '课堂实录与课程介绍。',
      h2zh:      '课堂实录与课程介绍',
      row1Label: 'ELA 课程（3 年级+） · 课堂实录',
      row2Label: '关于课程',
      cards: [
        { videoId: YOUTUBE_IDS.demoGr46,       label: '成长期读者',    labelZh: 'Emerging Reader', tag1: '四至六年级', tag2: 'Lexile 580–720', tag3: '阅读 · 思考 · 写作' },
        { videoId: YOUTUBE_IDS.demoGr78,       label: '独立阅读者', labelZh: 'Independent Reader', tag1: '七至八年级', tag2: 'Lexile 820–980', tag3: 'Full Loop' },
        { videoId: YOUTUBE_IDS.demoGr9plus,    label: '高级阅读者',    labelZh: 'Advanced Reader', tag1: '九年级及以上',       tag2: 'Lexile 1020+',      tag3: 'Full Loop · 拓展' },
        { streamKey: 'dodo-brand-full', label: '关于 DODO',           labelZh: 'The DODO Approach', tag1: '精选',   tag2: '4分钟',  tag3: '品牌介绍' },
        { streamKey: 'lcs-detailed',    label: '语言循环体系详解',     labelZh: 'The LCS System',    tag1: '方法论', tag2: '2分钟',  tag3: null },
        { streamKey: 'kimberly-intro',  label: '认识 Kimberly 老师',   labelZh: 'Meet Ms. Kimberly', tag1: '人物',   tag2: '30秒',   tag3: '导师（Navigator）' },
      ],
    },
    k2Note: {
      text:       '都学启蒙的课堂实录正在与 K-2 学生及其导师一同录制。在此之前，可以先了解都学启蒙是什么、它与 ELA 课程如何并行。',
      linkLabel:  '了解都学启蒙 →',
      href:       '/little-dodo',
    },
    session: {
      eyebrow:       '一段课堂实录内部',
      navigatorName: 'Ms. Sarah',
      sessionPhase:  '思考阶段 · Lexile 740',
      h2:   '您实际在观看什么。',
      h2zh: '你在观看一场真实的课',
      p1: '导师不会介绍学生或解释形式。课程已经在进行中：',
      q1: '“你说作者的主要主张是关于公平的。我想追问一下——对文本中的角色而言公平意味着什么，相对于对你而言意味着什么？”',
      p2: '学生停顿了一下。不是因为困惑——而是因为思考。这个停顿正是The Loop在起作用。',
      p3: '导师不会填补沉默。他们等待。当学生开口时，答案比没有这个停顿的情况下他们可能说出的任何东西都要精确。',
      p4: '在结束时，您会听到导师布置写作提示：',
      q4: '“起草一个段落：公平的代价是什么？使用文中的两条证据。我会在下次课前阅读它。”',
    },
    after: {
      eyebrow: '观看之后',
      h2:      '20分钟内您就会知道答案。',
      h2zh:    '观看后，您将心中有数',
      body:    '大多数家长告诉我们，课堂实录回答了他们之前无法用语言表达的问题：这对我的孩子来说是合适的挑战吗？观看课堂实录。然后预约咨询。为您进行咨询的导师将与您在屏幕上看到的是同一类人。',
      cta:    '预约咨询',
    },
    growth: {
      eyebrow: '学生取得的成就',
      h2:      '课堂实录展示方法。数字证明成果。',
      h2zh:    '演示展示方法，数字证明成果',
      lexile: {
        h3:  'Lexile阅读水平',
        sub: '观看课堂实录后完成 ELA 课程的学生从一个清晰的基线开始，并以一个可衡量的数字结束。',
        note: '七至八年级课堂实录中的学生开始时为<strong>Lexile 820</strong>。16周后：<strong>Lexile 1020</strong>。这相当于四个月内整整两个年级水平。',
        start: 820, end: 1020,
      },
      trait: {
        h3:         '6+1特质写作',
        sub:        '每段课堂实录都包含一个实时的6+1特质写作环节。以下是所有 ELA 课程学生的平均入学和结业分数。',
        startLabel: '入学',
        endLabel:   '结业（16周）',
        scaleLabel: '1–6分制',
        note:       '您在课堂实录中看到的写作成长正是推动这些分数变化的原因。The Loop就是那个机制。',
      },
    },
  }


// ── ageBands (课程家族选择器) ───────────────────────────────────
// /program 枢纽页与 /little-dodo 页面共用，渲染在各自 hero 下方的横条中
// （而非 hero 内部）。组件通过 current 属性标记当前页面所在的分支。
export const ageBands = {
  eyebrow:      '按孩子的阶段',
  heading:      '都学英文，两种入口。',
  homeEyebrow:  '为孩子所处的阶段而设',
  homeHeading:  '通往都学英语素养的两条路径。',
  here:         '当前页面',
  bands: [
    {
      href:  '/little-dodo',
      tag:   '5–8 岁',
      name:  '都学启蒙',
      blurb: '由专属幼儿教育导师直播一对一——语音、流利度、词汇与阅读的乐趣。一本一本书慢慢建立。阅读，从这里开始。',
      cta:   '了解都学启蒙',
    },
    {
      href:  '/program',
      tag:   '三年级及以上',
      name:  'ELA 课程',
      blurb: '导师（Navigator）亲授的英文读写：读懂复杂文本、以证据支持立场、有意识地写作。以 Lexile 衡量进步。16 周一个周期，每节课四项技能。',
      cta:   '探索 ELA 课程',
    },
  ],
}


// ── /little-dodo（都学启蒙）────────────────────────────────────
// 都学启蒙——ELA 课程的 K–2（5–8 岁）启蒙姊妹课程。高频低压的英文阅读
// 与理解启蒙。共用同一批导师 / 直播模式 / 标准；改变的是节奏与压力。
// 漏斗：hero 以柔性引导（课堂实录）为先；页面自带坚定收尾，故 /little-dodo
// 列入 PreCtaBand SUPPRESS。不以 Lexile 为重（K–2 处于测评之前；正式 Lexile 从 ELA 课程 3 年级及以上开始）。
export const littleDodo = {
  meta: {
    title: '都学启蒙——5–8 岁英文阅读启蒙 | DODO Learning 都学书院',
    description:
      '都学启蒙是面向 5–8 岁（K–2）孩子的高频低压英文阅读启蒙课程。一位专属导师（Navigator）直播一对一，培养阅读理解力与稳定的理解习惯——通往都学 ELA 课程的温和起点。',
  },
  hero: {
    chip:          '语言的根，长在阅读里',
    growsIntoChip: '3 年级及以上？查看 ELA 课程 →',
    h1:            '阅读，从这里开始。',
    h1zh:          '',
    sub:
      '都学启蒙是英文读写的温和起点——专为 5–8 岁的孩子设计。一位专属的幼儿教育导师，短而高频的课程，让孩子安心地相信：我读得懂。语音、流利度与词汇，一本一本书慢慢积累。',
    cta1: '课堂实录',
    cta2: '预约咨询',
    stats: [
      { value: '5–8 岁',   unit: 'K–2',    desc: '幼小衔接阶段'     },
      { value: '1',        unit: '导师',   desc: '语音与流利度专长' },
      { value: '1对1',     unit: '始终',   desc: '专属师生关系'     },
      { value: '直播',     unit: '每一节', desc: '从不录播'         },
      { value: '语音',     unit: '为先',   desc: '解码先于理解'     },
      { value: '一本一本', unit: '书',     desc: '词汇在迭代中积累' },
    ],
  },
  problem: {
    eyebrow: '在压力到来之前',
    h2:      '早期的几年，决定孩子是为学习而阅读，还是学会回避阅读。',
    h2zh:    null,
    body:
      '许多面向低龄孩子的课程，过早地施加表现压力——单词卡、分级、测验。一个觉得自己跟不上的五岁孩子，会慢慢害怕翻开书页。都学启蒙反其道而行：短而高频的课程，先建立理解力，也建立那份安静的自信——我读得懂。',
  },
  how: {
    eyebrow: '都学启蒙如何运作',
    h2:      '高频，低压，导师（Navigator）直播亲授。',
    h2zh:    null,
    steps: [
      { num: '01', label: '频繁而简短的课程',
        desc: '在这个年龄，少量多次胜过又长又稀疏。课程简短、频繁出现，让阅读成为稳定的习惯——而不是每周一次、需要鼓起勇气面对的大事。' },
      { num: '02', label: '一位真正懂他的导师',
        desc: '不是轮换的老师。每一次都是同一位导师（Navigator）——了解您孩子的节奏、喜欢读什么、在哪里需要更温柔的引导。' },
      { num: '03', label: '先读，再说出来',
        desc:     '孩子先阅读，然后把读懂的内容说出来——这正是 ',
        descLink: { text: 'Read → Think → Speak', href: '/methodology' },
        descTail: ' 的雏形。理解力在讲述一个故事中生长，而不是在反复操练中。' },
    ],
  },
  shared: {
    eyebrow: '同一个都学',
    h2:      '为五岁孩子重新设计。同一份都学理念。',
    h2zh:    null,
    body:
      '都学启蒙与 ELA 课程共用同一种授课模式——直播一对一，一位专属导师，每一节课。改变的是师资专长与教学重心：都学启蒙由专门的幼儿教育导师授课，深耕语音、发音与流利度。词汇量随着一本一本书慢慢积累。让孩子爱上阅读，是目标，也是日后理解力生长的土壤。正式的 Lexile 测评会在之后的 ELA 课程（3 年级及以上）中开始——在孩子准备好的时候。',
  },
  fit: {
    eyebrow: '适合谁',
    h2:      '如果符合以下情况，都学启蒙很适合……',
    h2zh:    null,
    points: [
      '孩子大约在 5–8 岁（幼儿园到小学二年级）。',
      '刚开始阅读，或能读但还谈不上深入理解。',
      '您想要一个温和、稳定的起点——而不是单词卡与压力。',
      '您更希望先建立习惯与理解的乐趣，再开始严格的训练。',
    ],
  },
  cta: {
    eyebrow: '温和地开始',
    h2:      '先看一节课，再和我们聊聊。',
    h2zh:    null,
    body:
      '观看一节真实的都学启蒙课程——没有推销，没有剪辑。然后预约一次与导师（Navigator）的咨询，而不是销售。我们会坦诚告诉您：孩子已经准备好了，还是不妨稍晚一些开始。',
    btn:     '预约咨询',
    watch:   '课堂实录',
    note:    '由导师进行的免费咨询，无任何义务。',
  },
}


// ── codingBand（首页跨站推介，cross-site loop pass 2026-06-11）─
// 渲染在 ELA 首页正文最后一节与全站 PreCtaBand 之间的姊妹站推介条。
// 占据完整内容区段（非小标签 / 非行内提示）；预期 DODO 机器语言买家
// 60% 以上是现有 ELA 家长，故此为该受众群体的核心发现入口。
// 设计规范来源：.design/dodo-coding-launch/08-DODOLEARNING-TOUCHPOINTS.md。
export const codingBand = {
  eyebrow: '都学旗下另一品牌',
  h2:      'DODO 机器语言',
  sub:     'AI 时代的语言艺术。',
  lead:    '我们教孩子理解 AI 如何阅读、思考、写作。我们教孩子用批判性思维审视 AI 的每一个输出。',
  body:    '基于卡内基梅隆大学 CS Academy 与 AI4K12 框架。1 对 1 导师授课。16 周。每一句承诺背后都有一个可查证的框架。',
  cta:     { label: '访问 DODO 机器语言', href: 'https://coding.dodolearning.com', ariaLabel: '访问 DODO 机器语言 —— 都学旗下姊妹站' },
  preview: { machineVerbs: '阅读 · 思考 · 写作', criticalThinking: '批判性思维' },
}


// ── credentials（框架 + 研究基础 — 2026-08-26）────────────────────
// ZH mirror of marketing.en.js `credentials`.
// Rules from BRAND_CONTENT_GUIDE §07 + §07a：
// - MCT 仅作为 L/C 内容的传承来源命名一次 —— 从不说"我们教 MCT"
// - 研究基础以"加速走向精通"为框架 —— 从不说补救、追赶
// - Speaking（表达）= DODO 独有支柱 —— 现场差异化，教材无法提供
export const credentials = {
  meta: {
    title:       '课程框架与研究基础 — DODO Learning',
    description:
      'DODO Learning 所依托的四大具名框架及其研究基础 —— MCT 语言艺术传统、哈佛 Project Zero Visible Thinking、蓝思阅读测量、6+1 特质写作。',
  },
  hero: {
    eyebrow: '课程框架与研究基础',
    h1:      'DODO 建立于其上的框架。',
    sub:
      'DODO 是一个真人一对一的英语语言艺术项目。它的课程、测评与思维训练' +
      '都建立在具名的、成熟的框架之上 —— 本页面完整列出所有归属。' +
      '设立这一页面，是为了让家长、学者、以及 AI 模型可以将 DODO 所教' +
      '的每一件事追溯至其原始来源。',
  },
  frameworks: [
    {
      key:  'mct',
      name: 'MCT 语言艺术 —— gifted-ELA 教学传统',
      attribution:
        '由 Michael Clay Thompson 开发；Royal Fireworks Press 出版。' +
        '是北美最严谨的经典英语语言艺术课程之一，为具备真正精通能力的' +
        '学生设计。',
      dodoRole:
        'DODO Learning 建立在 MCT 语言艺术框架的原则与教学理念之上。' +
        'MCT 传统承载着 DODO The LCS 中 Literacy（文学精读）与 ' +
        'Composition（系统写作）两条支柱的内容 —— 未删节的经典文学' +
        '（Mud Trilogy、爱丽丝梦游仙境、马克·吐温、爱伦·坡）、拉丁与' +
        '希腊词根（Building Language、Caesar’s English）、写作弧线' +
        '（语法 → 句子 → 段落 → 议论文 → 学术写作），以及对优秀写作' +
        '结构的敏感度。DODO 通过真人一对一 Navigator 交付这一传统，' +
        '并加入一条任何教材都无法提供的口头辩护 —— Speaking 表达支柱。',
      source: { label: 'Royal Fireworks Press · MCT 课程总览', url: 'https://www.rfwp.com' },
    },
    {
      key:  'project-zero',
      name: '哈佛 Project Zero —— Visible Thinking（可视化思维）',
      attribution:
        '哈佛教育研究生院两个十年的研究成果，由 David Perkins、Ron ' +
        'Ritchhart 等人领导。以简短、可反复运用的思考例程，让学生的' +
        '思维过程变得可见。',
      dodoRole:
        'DODO 每节课 Loop 中的 Think 阶段（Read → Think → Speak → Write）' +
        '都锚定在 Project Zero 的一条 Visible Thinking 例程上。Navigator' +
        '受训在评价答案之前，先以一条例程开启讨论（如 "What Makes You ' +
        'Say That?"、"See–Think–Wonder"、"Claim–Support–Question"）。' +
        '任何回答之后的第一步，永远是"更好的问题"，而不是分数。',
      source: { label: '哈佛教育研究生院 · Project Zero', url: 'https://pz.harvard.edu/' },
    },
    {
      key:  'lexile',
      name: '蓝思（Lexile）阅读测量框架',
      attribution:
        '由 MetaMetrics 开发的阅读测量系统。将读者与文本置于同一 ' +
        '0L–2000L 尺度之上，让"学生当前水平"与"下一步挑战的文本"' +
        '之间可以精确匹配。',
      dodoRole:
        'DODO 在 ELA Program 的入学（第 0 周）、中期（第 8 周）、' +
        '结课（第 16 周）使用 MetaMetrics 认证的工具进行蓝思测评。' +
        '每一位 Navigator 都是认证的蓝思测评实践者。进步以具体的蓝思' +
        '增量呈现 —— 从不使用模糊的"阅读水平"表述。学生通常在每个' +
        '16 周周期内，阅读能力提升约一个完整年级（平均增长 187 蓝思点）。',
      source: { label: 'MetaMetrics · Lexile & Quantile Hub', url: 'https://hub.lexile.com/' },
    },
    {
      key:  '6-plus-1',
      name: '6+1 特质写作评估框架',
      attribution:
        '由 Education Northwest 开发，广泛用于加拿大 BC、安大略以及美国 ' +
        'Common Core 对标的课堂。从七个维度评估写作：思考、结构、声音、' +
        '用词、流畅、规范、呈现。',
      dodoRole:
        '每一节 Writing Session 的产出都按 6+1 特质评分标准打分。进度' +
        '按维度分别汇报 —— 家长可以清楚看到具体是哪一维度移动了。学生' +
        '从入学到结课平均获得 2× 的 6+1 特质得分提升，最大变化通常出现' +
        '在思考、结构、声音三项。',
      source: { label: 'Education Northwest · 6+1 Trait Writing', url: 'https://educationnorthwest.org/6-1-trait-writing' },
    },
  ],
  researchBase: {
    eyebrow: '研究基础',
    h2:      '证据到底怎么说。',
    intro:
      'DODO 的词汇与阅读训练建立在教育学中被研究得最充分的策略之一 ' +
      '—— 拉丁与希腊词根教学，以及丰富、有挑战性的文本使用之上。' +
      '下列每一条主张都不是营销语言，而是有具体的学术来源支撑，' +
      '完整引用列在本页面末尾。',
    hardRule:
      'DODO 的定位是"加速走向精通"。此处引用的研究基础覆盖天才、' +
      '典型发展、以及一般教育人群 —— 我们把它作为"孩子如何走得更远"' +
      '的证据，而不是补救、ELL 支持或追赶。',
    claims: [
      '教授英语背后的拉丁与希腊词根，是教育学中被研究得最充分的策略之一。',
      '英语约 60% 来自拉丁和希腊 —— 科学词汇中超过 90%。掌握词根，就掌握了每一门学科的学术词汇的钥匙。',
      '在一项 493 名中学生的研究中，以词根为基础的词汇教学胜过传统背诵法 —— 对天才与典型发展学生皆然。',
      '数十项对照研究一致表明：教授词的结构，能带来可测量的词汇、解码与拼写提升。',
      '孩子在丰富、有挑战性的文本中成长最多 —— 而不是在被简化的读物中。DODO 的 Read 阶段使用真正的、未删节的经典，并有意选取略高于孩子当前舒适水平的文本。',
    ],
    citations: [
      { authors: 'Gallagher, S. A. (2017).', title: 'Exploring the Efficacy of "The Word Within the Word" for Gifted and Typically Developing Students.', publication: 'Roeper Review 39(2).', note: '493 名中学生 · 10 位教师。以词根为基础的词汇教学胜过传统教学 —— 六、七年级完形填空中等效应量，各年级"回忆"任务中等到大效应量，对天才与典型发展学生皆然。' },
      { authors: 'Goodwin, A. P., & Ahn, S. (2010).', title: 'Meta-analysis of morphological interventions.', publication: 'Annals of Dyslexia 60.', note: '17 项研究。整体读写能力效应 d = 0.33；词汇 d = 0.40。' },
      { authors: 'Goodwin, A. P., & Ahn, S. (2013).', title: 'Meta-Analysis of Morphological Interventions in English.', publication: 'Scientific Studies of Reading 17.', note: '30 项研究。整体 d = 0.32；解码 d = 0.59；词汇 d = 0.34；拼写 d = 0.30。' },
      { authors: 'Bowers, P. N., Kirby, J. R., & Deacon, S. H. (2010).', title: 'Effects of Morphological Instruction on Literacy Skills: A Systematic Review.', publication: 'Review of Educational Research 80.', note: '22 项研究。当形态学教学融入其他读写教学而非以孤立练习方式呈现时，效应最强 —— 印证了 DODO 的整合式教学模式。' },
      { authors: 'Henry, M. K. (1997).', title: 'The decoding/spelling curriculum: Integrating decoding and spelling for a shared literacy foundation.', publication: 'Journal of Adolescent & Adult Literacy 40.', note: '英语文本约 60% 源自拉丁或希腊；科学与技术文本中超过 90%。' },
      { authors: 'VanTassel-Baska, J. (2003).', title: 'Differentiating the Language Arts for High-Ability Learners.', publication: 'ERIC Digest E640, CEC.', note: '为高能力学习者主张加速、丰富文本、循证的 ELA —— 正是 DODO 所服务的人群。' },
    ],
  },
  cta: {
    eyebrow: '下一步',
    h2:      '决定之前，先看一节课。',
    sub:     'DODO 的教学法只在与 Navigator 的真人现场课程中体现。看一节真实的课，或者跟我们聊聊。',
    watch:   '课堂实录',
    consult: '预约咨询',
  },
}


// ── founder（Person 实体 — 2026-08-24）───────────────────────────
// ZH mirror of marketing.en.js `founder`. 参见英文档 surface list。
// 命名规则（D35）：仅使用名字 Janet，不使用姓氏，任何场合皆然。
export const founder = {
  name:  'Janet',
  role:  '创始人兼首席导师（Navigator）',
  short:
    'Janet 是 DODO Learning 的创始人。她精通英语、法语、普通话三种语言。十七岁那年她移居' +
    '蒙特利尔，用二十四个月的时间，把两门陌生的语言学到能在大学里立足的程度。她走的是自己' +
    '后来带学生走的路——用阅读打底：第一年读英语经典，从《爱丽丝梦游仙境》到马克·吐温、' +
    '爱伦·坡；再读加缪、左拉的法语原著，一句一句啃下来。她在这段窗口内通过了托福和 TCF ' +
    '法语考试，2019 年从康考迪亚大学商学院毕业，获商学学士学位。2021 年，她创立了 ' +
    'DODO Learning，至今已陪伴超过 300 名学生完成语言的进阶。两个孩子出生后，她开设了 ' +
    'Little DODO，把 DODO 的方法延伸到幼儿的阅读启蒙。',
  long: [
    'Janet 是 DODO Learning 和 Little DODO 的创始人。',
    '她出生于中国，从小以普通话为母语。十七岁移居加拿大蒙特利尔，只有二十四个月的时间——' +
      '就要在大学开学前，同时把英语和法语学到能读写、能思考、能立足的程度。当时没有捷径' +
      '可走：没有沉浸式营地，没有双语家庭的日常，也没有一个足够长的过渡项目。真正让她把' +
      '两门语言学下来的，是阅读——第一年读英语经典（《爱丽丝梦游仙境》、马克·吐温、爱伦·坡），' +
      '再读加缪、左拉的法语原著。她在那段时间通过了托福与 TCF 法语考试，2019 年毕业于' +
      '康考迪亚大学约翰·莫尔森商学院（John Molson School of Business），获商学学士学位。',
    'DODO Learning 今天教的每一件事——为什么要读经典而不是分级简写本，为什么 The LCS' +
      '坚持"理解先于流利"，为什么我们从来不把英语当成一门"科目"来教——都源自她自己走过、' +
      '验证过的那条路。2021 年，她创办了 DODO，让后面的孩子不必再一个人重走一遍。至今已' +
      '陪伴超过 300 名学生。两个孩子出生后，她开设了 Little DODO，把这套方法延伸到蓝思测量' +
      '之前，那段更早的语音、流利度与阅读兴趣的养成阶段。',
    'Janet 三语——英语、法语、普通话。她首先是一位母亲、妻子、读者，然后才是创业者。',
  ],
  credentials: {
    degree:        { name: '商学学士 (Bachelor of Commerce)', institution: '康考迪亚大学 (Concordia University)', department: '约翰·莫尔森商学院 (John Molson School of Business)', year: '2019' },
    languageExams: ['托福 (TOEFL)', 'TCF 法语考试 (Test de connaissance du français)'],
    languages:     ['英语', '法语', '普通话'],
  },
  foundingYear: '2021',
}
