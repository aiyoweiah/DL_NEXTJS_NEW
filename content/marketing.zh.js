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
  featured:       'REPLACE_FEATURED_VIDEO_ID',
  demoGr46:       'REPLACE_DEMO_GR4_6_VIDEO_ID',
  demoGr78:       'REPLACE_DEMO_GR7_8_VIDEO_ID',
  demoGr9plus:    'REPLACE_DEMO_GR9PLUS_VIDEO_ID',
  brandLoop:      'REPLACE_BRAND_LOOP_VIDEO_ID',
  brandNavigator: 'REPLACE_BRAND_NAVIGATOR_VIDEO_ID',
}


// ── / (home) ─────────────────────────────────────────────────────
export const home = {
  meta: {
    title:
      'DODO都学语言 — 英文认知深度，保护两种语言',
    description:
      '导师主导的英语深度学习课程，训练完整的阅读→思考→表达→写作闭环。16周内Lexile阅读测验平均提升一个年级。',
  },

  hero: {
    eyebrow:        '为五年后能在英语环境里侃侃而谈的孩子',
    eyebrow2:       '',
    h1:             ['以原版文学精读为起点，用写作锤炼思维，用表达释放声音。', ''],
    h1Chinese:      '',
    differentiator: '',
    consultHook:
      '我们培养英语思维者——能阅读超出年级水平的文本、以证据论证、精确写作的孩子。以高阶文学与写作框架、哈佛思维科学为根基。',
    cta1:      '预约能力评估',
    cta2:      '探索16周课程',
    trustLine:
      'Lexile测量进度 · 6+1 Trait写作评估体系 · 导师实时主导 · Think Once. In Both Languages.',
  },

  proof: [
    { id: 'families', number: '300+', unit: '个孩子和家庭', label: '自成立以来真实陪跑——Lexile真实增长，已验证的成果' },
    { id: 'lexile',   number: '1',    unit: '个年级',       label: '两个16周课程周期内的平均Lexile阅读水平增长' },
    { id: 'writing',  number: '2×', unit: '写作评分增长', label: '入学至结课6+1 Trait平均得分增长' },
    { id: 'repeat',   number: '8/10', unit: '16周后继续',   label: '家庭看到成果，主动选择继续' },
  ],

  photoIntro: {
    eyebrow: '认识导师团队',
    heading: '外教不代表会教：我们只用文学写作专家。',
    body0:
      '学校知道孩子在几年级。那不等于知道孩子真正站在哪里。很多华人家庭的孩子，都有一个成绩单上看不见的阅读差距——能认出的词，和能真正思考的内容，中间隔着一段距离。这段距离，大多数课程测不出来。',
    body1:
      '导师一对一不间断。英语是他们的母语，却远不止外教。课堂里，导师不会问“你读懂了什么？”，而会问“你觉得这个人物为什么做出这个选择？”—— 专注培养孩子用英语的思考就是DODO Learning不一样的地方。导师们是写作、文学和学术写作领域的专家——以MCT语言艺术传统为基础，运用哈佛Project Zero思维训练体系，专门负责缩短学生当前Lexile阅读水平与学业真正需求之间的差距。',
    body2:
      '导师从头到尾追踪学生的进步：当前读写水平与目标之间的距离——并通过The LCS逐周缩小这个距离，高阶课程来确保学生不断的进阶和进步。',
    cta1:   '认识导师团队',
    cta2:   '学生成功',
    imgAlt: '一位母亲注视孩子在家中读完一段课文后停下来思考的瞬间',
  },

  loop: {
    eyebrow: '教学方法',
    heading: 'LCS 教学理念',
    body:
      '每一节课，每一周，坚持高频低压的建立语言习惯。阅读 → 思考 → 表达 → 写作是我们课程每节课练习的。',
    cta: '阅读完整教学方法 →',
    steps: [
      {
        id:          'read',
        number:      '01',
        label:       'Read 阅读',
        description:
          '学生阅读精心选定的经典与SAT必读文本——从爱丽丝梦游仙境、隐形人到世界大战，以及递进难度的说明性非虚构文本，选材在当前Lexile水平或略高一筹。原文，没有简化版。文本是原材料。',
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
      '以Lexile测量。写作评分可见。当孩子学会用英文精确思考，这种认知训练迁移到每一门学科、每一次考试、到他们使用的每一种语言。',
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
        linkLabel: '认识 The LCS 系统',
      },
      {
        id:        'results',
        eyebrow:   '16周后',
        heading:   '我们展示数字。',
        body:
          '每位学生将接受结课Lexile评估和重新评估的6+1 Trait写作得分。能用英文阅读复杂文本、以论据支撑立场、有意识地写作——同时也在中文里思考——让孩子拥有AI替代不了的能力。这是真正的竞争优势。',
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
          '她到了第八周开始主动举手发言。到第十二周时，她已经在引领课堂讨论了。',
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
          '孩子的老师告诉我们，他的作文从以前的两三行变成了满满一页，结构也清楚了。',
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
          '她从害怕写作任务，到提前交作业。导师确切地知道她卡在哪里了。',
        source: '家长，丹佛',
      },
    ],
  },
}


// ── /program ─────────────────────────────────────────────────────
export const program = {
  meta: {
    title: '16周课程的内部安排 — DODO Learning',
    description:
      '面向加拿大和美国的华人家庭，由导师（Navigator）带领的直播课程，训练阅读 → 思考 → 表达 → 写作。入学与结业均进行Lexile评估。一整个年级水平的可测量成长。',
  },
  hero: {
    chip: '一次思考。两种语言。',
    h1:   '16周课程内部是怎样的？',
    h1zh: '',
    sub:
      '专为加拿大和美国的华人家庭设计。每节课都运行The Loop（学习循环）——阅读 → 思考 → 表达 → 写作——由一位专属导师（Navigator）引导。我们培养达到精通水平的英语思维者。',
    cta1: '了解运作方式',
    cta2: '预约咨询',
    stats: [
      { value: '16',       unit: '周',         desc: '一份真正的承诺'                          },
      { value: '4',        unit: '项技能',         desc: '阅读 · 思考 · 表达 · 写作' },
      { value: '2',        unit: '次评估',    desc: '入学前 + 结业后'                            },
      { value: '1',        unit: '位导师（Navigator）',      desc: '了解您的孩子'                      },
      { value: '1对1',     unit: '始终如一',           desc: '无班级课，无导师轮换'         },
      { value: '∞',   unit: '完整学习循环',  desc: '每一节课'                      },
    ],
  },
  loop: {
    eyebrow:         'The Loop（学习循环）的运作方式',
    h2:              '四项技能。每节课都涉及。',
    h2zh:            null,
    typeAB:
      '每节课交替两种类型。A型课 — Literacy Session（文学课）：学生大声朗读，导师在句子层面进行指导（词汇、语调、理解力），以MCT的Building Language和Caesar’s English词汇体系为锚点。B型课 — Writing Session（写作课）：学生思考、讨论并起草；导师以哈佛教育学院零点项目的Visible Thinking（可视化思维方法）开场，并按照6+1特质评分体系评估输出内容。课程类型的分配由学生当前的Lexile数据驱动，而非固定轮换。',
    methodologyLink: '阅读完整方法论 →',
    steps: [
      { num: '01', label: '阅读', labelZh: 'Read', badge: null,
        desc: '所选文本略高于他们的舒适区——刚好足以产生拉伸。理解力通过Lexile水平跟踪，而非猜测。' },
      { num: '02', label: '思考', labelZh: 'Think', badge: null,
        desc: '在表达或写作之前，先构建论点。主张是什么？证据是什么？反方观点是什么？结构先行。' },
      { num: '03', label: '表达', labelZh: 'Speak', badge: null,
        desc: '他们提出立场并为之辩护——实时进行，与导师一起。这是建立真正自信的地方，而非表演出来的自信。' },
      { num: '04', label: '写作', labelZh: 'Write', badge: null,
        desc: '他们所阅读、思考、表达的一切，最终落到纸面上。从草稿到修改——每次都有可衡量的进步。' },
    ],
  },
  journey: {
    eyebrow: '学习旅程',
    h2:      '您的孩子从哪里开始——又将到达哪里。',
    h2zh:    null,
    steps: [
      {
        week: '第1周',
        label: '入学评估', labelZh: '入学评估',
        desc: '我们从精确了解您孩子的当前位置开始——他们的Lexile阅读水平、6+1特质写作基线，以及他们需要支持的具体方面。不做任何假设。',
        badge: null, badgeSub: null,
      },
      {
        week: '第2–15周',
        label: '每周课程', labelZh: '每周课程',
        desc: '每周，您的孩子与他们的导师（Navigator）一起完成The Loop（学习循环）——这位导师了解他们的进步、挑战以及下一步该推动什么。每节课90分钟，每周一次。',
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
    eyebrow: '体系架构',
    h2:      '成果如何累积：The Loop（每节课） → The LCS（每个周期） → 级别（跨多个周期）。',
    h2zh:    null,
    body:
      '每节课运行The Loop（学习循环）——阅读 → 思考 → 表达 → 写作——由您孩子的导师（Navigator）引导。' +
      '在每个16周周期内，每节课汇总到LCS教学体系中。' +
      '跨越多个周期，学生逐步进阶九个课程级别——Starter、Intermediate以及Levels 1–7。' +
      '每个级别需要两到三个周期。每个周期为16周。',
    strands: [
      { letter: 'L', name: 'Literacy',    nameZh: '文学精读',         body: '深度研读文学经典。词汇积累、文学感知力、学生自己的思想宝库。所有语言输出的根基。' },
      { letter: 'C', name: 'Composition', nameZh: '系统写作训练', body: '系统的写作训练：将阅读深度和思考转化为结构化、有说服力、精准的写作。从句子到学术论文。' },
      { letter: 'S', name: 'Speaking',    nameZh: '表达',                  body: '与导师进行高质量的一对一讨论。学生厘清观点、组织思维、产出清晰且逻辑严谨的口头表达。' },
    ],
    levelsNote:
      '对标美国SAT、SSAT、IB拓展论文、剑桥KET与PET，以及北美私立学校和资优生项目标准。Level 7相当于大学级别的学术英语能力。',
  },

  combinations: {
    eyebrow: '选择您的组合',
    h2:      '五种课程组合。相同的The Loop（学习循环）。不同的强度。',
    h2zh:    null,
    body:
      '每一种组合都运行完整的16周周期，每节课都运行The Loop（学习循环），每个学生都与一位专属导师（Navigator）一起学习。不同组合在于每周课时数和侧重点——选择符合您孩子当前需求的模式。',
    items: [
      { id: 'summit',  name: 'Summit',  nameZh: '全境领航',           format: '每周3节文学课 + 1节写作课', price: '$2,830',     forWhom: '加速成长 · 高难度学业里程碑', featured: false },
      { id: 'core',    name: 'Core',    nameZh: '稳健航行',           format: '每周2节文学课 + 1节写作课', price: '$2,250',     forWhom: '最受欢迎 · 长期发展',                 featured: true  },
      { id: 'flex-1',  name: 'Flex 1',  nameZh: '文学阅读自由航行',     format: '每周2节文学课',              price: '$1,185',     forWhom: '先打好阅读基础',                featured: false },
      { id: 'flex-2',  name: 'Flex 2',  nameZh: '大师写作自由航行',     format: '每周2节写作课',                 price: '$2,110',     forWhom: '写作专精',                               featured: false },
      { id: 'flex-3',  name: 'Flex 3',  nameZh: 'GPA管理自由航行',     format: '每周1节GPA学业辅导',            price: '起价 $750', forWhom: '学校学业管理 · 可与上述任意组合搭配', featured: false },
    ],
    note: '价格为每16周周期。可按周付款选项——请参阅常见问题了解详情。',
    faqLink: '查看定价详情 →',
  },

  session: {
    eyebrow:        '一堂真实的课',
    navigatorName:  'Ms. Jennifer',
    sessionPhase:   '阅读阶段 · Lexile 740',
    h2:   '一个典型的周二是什么样子的。',
    h2zh: null,
    p1: '导师首先说明本节课的阶段：',
    q1: '“今天我们处于阅读阶段。你的文本Lexile是740——比你上周高8个点。我们来看看你能做到什么。”',
    p2: '二十分钟的结构化阅读。不是默读——而是一起批注、提问、讨论。',
    p3: '接着进入思考阶段。导师问：作者的主张是什么？你同意吗？最强的反方论点是什么？',
    p4: '课程以展望下次结束：',
    q4: '“下周是表达阶段。你将口头为自己的立场辩护。现在开始准备。”',
    navigatorsLink: '认识导师（Navigator）团队 →',
  },
  growth: {
    eyebrow: '我们如何衡量成长',
    h2:      '真实的数字，而非模糊的进度报告。',
    h2zh:    null,
    lexile: {
      h3:    'Lexile阅读水平',
      sub:   '与北美学校使用的测量体系相同——因此您可以直接对比进步。学生通常在两个16周周期内将阅读水平提升一个年级，每个周期的Lexile增长约在100L–150L范围。',
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
      '咨询时长20分钟。由导师（Navigator）进行——不是销售电话。我们测量您孩子的Lexile水平，定位精确的差距，并向您展示对于与您孩子情况相似的学生，头16周会是什么样子。',
    btn:  '预约咨询',
    note: '包含免费诊断性评估。无任何义务。',
  },
  charter: {
    badge: '诊断性咨询',
    h2:    '准备好与您孩子的导师（Navigator）见面了吗？',
    sub:   '诊断性咨询让我们精确了解您孩子目前的真实水平——而不是学校说的水平。',
    btn1:  '预约咨询',
    btn2:  '阅读方法论',
  },
}

// ── /about ───────────────────────────────────────────────────────
export const about = {
  meta: {
    title:
      '什么是DODO Learning？面向加拿大和美国华人家庭的认知级英语读写教育',
    description:
      'DODO Learning是为加拿大和美国的华人家庭提供的、由导师（Navigator）带领的直播英语读写项目——基于完整的阅读 → 思考 → 表达 → 写作循环进行训练，通过Lexile水平和6+1特质写作框架进行衡量。我们培养达到精通水平的英语思维者。双语深度从这种严谨性中自然涌现。',
  },
  hero: {
    chip:          '我们的故事',
    h1a:           '一个能',  h1em1: '说', h1b: ' 英语的孩子',
    h1c:           '与一个',
    h1d:           '能用英语 ', h1em2: '思考', h1e: ' 的孩子不同。',
    sub:
      '专为加拿大和美国的华人家庭打造——这些家庭的孩子将在英语主导的学校、大学和职场中成为引领者。这些家庭中的大多数孩子把英语当作一门学科来学——他们能通过考试，听起来流利。但让他们论证一个观点、阅读密集的分析性散文、或写出有原创性的东西——语言就达到了极限。我们的创始人看到了这个差距，并建立了DODO来弥合它。目标是在认知层面达到英语精通。双语深度是达到这一目标后自然产生的结果。',
    videoLabel:    '观看：DODO为何存在',
    videoDuration: '3分钟',
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
    sub:    '每节课都建立在相同的四个信念之上。',
    bodies: [
      '流利不是关于发音正确。而是关于精确思考——阅读复杂的论点、用证据捍卫立场、有意地写作。这是我们努力达到的标准。语言是思想的架构。我们先建立架构；流利随之而来。',
      '最好的学习发生在人与人之间，而不是孩子与屏幕之间。每一节DODO课程都是一场对话。在孩子回答之后，导师的第一个动作永远是一个更好的问题——而不是一句评价。',
      '英语中的认知深度会保护两种语言的思考能力。您的孩子用英语推理越精确，他们在使用的每一种语言中的思考就越精妙。双语能力是智力严谨性的自然证据——而不是一个需要单独管理的目标。',
      '真正的成长是你可以看到和计数的东西，而不是老师向你保证发生过的事情。每个周期都有入学Lexile阅读评估、期中检查和结业阅读评估。每一篇写作都根据6+1特质框架评分。当我们说您的孩子从Lexile 620进步到820时，差距就在纸面上。数字优先；鼓励在后。',
    ],
  },
  loop: {
    sub:         '每节课都遵循相同的循环。结构一致。效果累积。',
    cta:         '探索方法论',
    programLink: '查看16周课程 →',
    descs: [
      '经典文学作品和精心挑选的文本——《爱丽丝梦游仙境》《金银岛》、爱伦·坡——不是作为学校作业来阅读，而是作为关于语言、人物和后果如何运作的活生生的论证。',
      '结构化证据。映射因果关系。同时持有两个竞争性想法而不急于解决。每一个思考步骤都针对特定类型的推理——不是阅读技巧，不是阅读理解练习册。',
      '捍卫一个立场。代入角色的视角。精确说明证据在文本中的哪个位置。表达不是输出——它是使思考精确到足以写作的方式。',
      '写作是证明一门语言真正属于你的证据。根据6+1特质评分标准评估进步——不是按年龄或年级，而是按作品本身的质量和技艺。',
    ],
  },
  stats: {
    eyebrow: '由数字说明',
    h2:      '2020–2025 用数字呈现。',
    sub:     '2020 年在加拿大创立。2025 年完成完整课程升级并重新启航。这是品牌建立的五年数据基础。',
    items: [
      { number: '10,000+', label: '已交付教学小时'                                          },
      { number: '300+',    label: '在册学生人数'                                            },
      { number: '90%+',    label: '报名来自真实口碑推荐'                                    },
      { number: '世界前50',  label: '所有导师（Navigator）毕业院校（牛津、多大、皇后、LSE…）' },
    ],
  },
  navigators: {
    chipNot:        '不是老师。',
    chipAre:        '是导师（Navigator）。',
    p1pre:          '我们称他们为 ',
    p1strong:       '导师（Navigator）',
    p1post:
      '——贯穿整个16周的纵向引导者，了解这个孩子的声音、节奏和具体差距。他们坐在孩子旁边引导。他们不会站在前面讲课。',
    p2:
      '一位导师（Navigator）会提出他们自己也不知道答案的问题。他们会对一个七岁孩子关于公平、忠诚、或者某个角色为什么做出那个选择的想法产生真正的好奇心。这些问题源于哈佛教育学院零点项目的Visible Thinking（可视化思维方法）——在哈佛教育研究生院开发的结构化教学协议——但好奇心是真实的。',
    p3:
      '他们是读者。他们是思考者。每位导师（Navigator）都拥有世界排名前50的大学（牛津大学、多伦多大学、皇后大学、伦敦政治经济学院等）的研究生学位，并具有文学或写作的专业背景。他们在意语言，因为语言是他们理解一切的方式——也因为他们知道，一个被训练用英语严谨推理的孩子，其心智将比任何考试成绩都更能带他们走得更远。',
    navigatorsLink: '认识导师（Navigator）团队 →',
  },
  families: {
    items: [
      {
        quote: '“我们的孩子将用英语引领。两种语言都会因此更强。”',
        desc:
          '您明白，英语精通和中文深度并非相互竞争的目标。一个被训练用一门语言精确思考的孩子，会将这种精确性带入两门语言。您希望标准定得高——并且可以被衡量。',
      },
      {
        quote: '“我们在不同世界之间穿行。孩子的英语需要匹配这种复杂性。”',
        desc:
          '您已经驾驭了不止一种文化。您知道会话英语与那种在大学、董事会和领导会议室中打开大门的英语之间的区别。您希望您的孩子属于后一类。',
      },
      {
        quote: '“好不是天花板。深度才是。”',
        desc:
          '您的孩子英语已经很强。但您感觉到有一个天花板——在他们如何论证、如何写作、如何在压力下处理复杂性方面。未来属于能够精确推理并有意图地写作的孩子。我们培养这种能力。',
      },
    ],
  },
  closing: {
    sub:
      '不是一句口号。是一种哲学。真正的双语深度不是通过平行翻译或语言维护项目实现的。它是在一个孩子被训练在最高认知水平上用英语精确思考时涌现出来的——阅读复杂性、用证据论证、有意图地写作。这种智力严谨性会迁移。它强化每一种语言的思考。两种语言都变得更强，因为心智首先变得更强。',
    cta: '开启您孩子的旅程',
  },
}

// ── /consult ─────────────────────────────────────────────────────
export const consult = {
    meta: {
      title:       '预约诊断性咨询',
      description: '预约与DODO Learning的20分钟诊断性咨询。由导师（Navigator）——而非销售人员——精确了解您孩子的当前位置，并描绘出16周课程可能的样子。无需承诺。',
    },
    hero: {
      chip: '一次思考。两种语言。',
      h1:   '我们精确确定您孩子的起点。',
      h1zh: '我们精确确定您孩子的起点',
      sub:  '不是学校报告上说的水平。咨询时长20分钟，与导师（Navigator）进行——不是销售电话。我们诊断、定位差距、给出方案。您来做决定。',
      cta1: '预约我的咨询',
      cta2: '了解课程',
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
      p3: '到第15分钟，我们已经明确了差距。我们描述了对于具有该特定情况的学生，The Loop（学习循环）的头四周会是什么样子。',
      p4: '通话以一句诚实的话结束：',
      q4: '“根据您告诉我的情况，我认为16周课程是合适的匹配。这是确切的原因——以及如果在第8周效果不理想，会发生什么。”',
    },
    trust: {
      eyebrow: '预约之前',
      h2:      '这是一个诊断性通话，不是销售通话。',
      h2zh:    '这是诊断通话，不是销售通话',
      body:    'DODO咨询由导师（Navigator）进行——也就是实际授课的同一批人。他们会诚实告诉您16周课程目前是否适合您的孩子。如果不适合，他们也会如实相告。',
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
    charter: {
      badge: '16周课程',
      h2:    '通话后准备好开始了吗？',
      sub:   '每位学生都从一位导师（Navigator）开始，这位导师了解他们的Lexile基线、6+1特质写作档案，以及他们接下来需要前往的确切方向。',
      btn1:  '预约咨询',
      btn2:  '了解课程',
    },
  }

// ── /compare ─────────────────────────────────────────────────────
export const compare = {
    meta: {
      title:       '为什么选择DODO Learning——它与补习、ESL和备考有何不同 | DODO Learning',
      description: 'DODO Learning是为加拿大和美国的华人移民家庭设计的认知发展项目——不是补习中心，不是ESL项目，不是备考辅导。以下是它在结构上的根本区别，以及这种区别如何在16周内产生累积效应。',
    },
    s1: {
      eyebrow: '为什么选择DODO Learning',
      h1a: '每个英语项目都承诺 ', h1b: '进步。', h1c: ' 但只有其中一个培养思考者。',
      sub: '对于加拿大和美国的华人移民家庭——这就是DODO Learning与您孩子可获得的任何其他选择在结构上的不同之处。',
    },
    s2: { pull: '大多数项目教您的孩子正确回答问题。 ', pullSpan: 'DODO Learning培养能提出更好问题的英语思维者。', pullEnd: '' },
    s3: {
      eyebrow: '品类差异',
      h2: '三个对比，阐明DODO Learning到底是什么。',
      cols: [
        { question: 'vs. 补习中心和ESL项目', title: '认知发展 ——而非语言练习', body: '补习中心解决作业问题。ESL项目培养会话流利度。DODO Learning发展推理架构，使您的孩子能够阅读密集的分析性散文、用文本证据论证观点、并精确写作。不同的品类。不同的结果。' },
        { question: 'vs. 年级学业支持', title: '精通标准 ——而非年级达标', body: '学校英语是针对平均水平校准的。DODO Learning的课程基于MCT语言艺术课程框架的原则——北美最严谨的经典ELA项目之一，为有能力达到真正精通的学生而设计。您的孩子根据他们自己的Lexile天花板来衡量，而不是班级平均水平。' },
        { question: 'vs. 备考公司', title: '16周的完整弧线 ——而非下个月的分数', body: '备考针对单一的考试窗口进行优化。16周课程构建认知能力，而强大的成绩是这种能力的自然副产品——因为一个能阅读复杂性、综合证据、并有意图地写作的学生，将在他们面对的任何评估中表现出色。' },
      ],
    },
    s4: {
      eyebrow: '方法论', h2: '区分DODO Learning的不是课程本身。而是The Loop（学习循环）。',
      caption: '阅读 → 思考 → 表达 → 写作。每节课都遵循这个精确的顺序。每个阶段都被评估。The Loop（学习循环）不是一种教学方法 ——它是一个累积系统。一个与导师（Navigator）一起运行The Loop（学习循环）16周的学生，不仅仅是提高了英语水平。他们重建了自己处理复杂性的方式。这就是十年后变得可见的差异。',
      methodologyLink: '阅读完整方法论 →',
    },
    s5: { eyebrow: '创始人寄语', h2: '我们为什么创建DODO Learning ——以及我们决定永远不会成为什么。', sub: '无脚本。八分钟。完整的决策过程。', founderName: 'Janet Sui——创始人兼首席导师（Navigator）', founderNote: '视频嵌入 — 替换为生产环境URL' },
    s6: {
      eyebrow: '导师（Navigator）差异', h2: '导师（Navigator）不是家教。以下是这具体意味着什么。',
      points: [
        { label: '纵向知识', body: '按次计费的家教每次见到您的孩子都是全新的。导师（Navigator）则承载完整的弧线——您孩子的Lexile基线、他们从第一周开始的6+1特质档案、三次课前那个仍然需要改进的具体句子。每位导师（Navigator）都拥有世界排名前50的大学（牛津大学、多伦多大学、皇后大学、伦敦政治经济学院等）的研究生学位，并具有文学或写作的专业背景。这种背景会累积。它产生的洞察力无法在一对一的单次课程中被复制。' },
        { label: '更好的问题 ——而非更快的答案', body: '在您的孩子回应之后，导师（Navigator）的第一个动作永远是一个后续问题，这些问题源于哈佛教育学院零点项目的Visible Thinking（可视化思维方法）——而不是一句评价。这是培养思考者和训练应答者之间的结构性差异。一个构建能力。另一个培养依赖。' },
        { label: '校准的反馈 ——而非泛泛的表扬', body: '每位导师（Navigator）的回应都会引用具体的6+1特质、具体的分数和具体的下一步行动。不是“做得好”——而是“你的思考特质从2分进步到了3分，因为这句话。要达到4分，需要做到这些。”您的孩子永远确切知道他们目前的位置，以及更高的分数要求他们做什么。' },
        { label: '一位导师（Navigator）。完整的16周弧线。', body: '您孩子的导师（Navigator）从最初的Lexile评估到最终的6+1特质评估，全程陪伴他们。一段关系。一个标准。一双眼睛看着每一篇草稿、每一次口头辩护、每一个论点。这种关系本身就是课程的一部分。' },
      ],
      navigatorsLink: '认识导师（Navigator）团队 →',
    },
    s7: {
      eyebrow: '这里的进步是什么样的', h2: '可衡量的、具体的、可感知的 ——与其他地方相比。',
      cols: [
        { num: '01', title: 'Lexile ——而非字母等级', body: '在16周内从Lexile 620到790是一个可验证的事实。字母等级是学校根据班级平均水平对合规性的评估。DODO Learning在入学时、期中时和结业时测量阅读复杂性——您的孩子能够独立处理的文本的实际认知需求。' },
        { num: '02', title: '6+1特质 ——而非印象', body: '写作根据七个具体特质评分：思考、结构、声音、用词、流畅、规范、呈现。您的孩子知道哪个特质进步了，进步了多少，以及达到更高分数确切需要什么。在这里，进步从来不是模糊的。' },
        { num: '03', title: '一个承诺的弧线 ——而非滚动入学', body: '16周课程有一个开始、一个可衡量的中点和一个确认的结果。不是月度订阅。不是开放式入学。一个结构 ——因为累积只有在工作持续且导师（Navigator）的知识不断积累时才有效。' },
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
      h2: 'Lexile评估是我们确定DODO Learning是否适合您孩子的地方。',
      sub: '每次报名都从一次免费的Lexile阅读评估开始——无承诺，无压力。一个精确的起点，因为有意义的进步需要一个精确的起点。',
      ctaPrimary: '预约免费Lexile评估', ctaSecondary: '查看完整课程',
      note: '评估是免费的。16周课程从确认的Lexile基线开始。',
    },
  }

// ── /methodology ─────────────────────────────────────────────────
export const methodology = {
  meta: {
    title: 'The Loop（学习循环）—— DODO Learning方法论',
    description:
      'The Loop（学习循环）是DODO Learning的方法论：阅读、思考、表达、写作。' +
      '根植于MCT语言艺术传统和哈佛教育学院零点项目的Visible Thinking（可视化思维方法），' +
      '通过Lexile和6+1特质写作框架衡量。' +
      '16周内实现一个年级阅读水平增长的认知训练。',
  },

  hero: {
    eyebrow: '方法论',
    heading: 'The Loop（学习循环）不是我们讲授的框架。而是我们所做的事。',
    subheading:
      '一对一英语语言艺术，秉承MCT gifted-ELA传统。' +
      '每节课都运行The Loop（学习循环）—— 阅读 → 思考 → 表达 → 写作。' +
      '我们培养达到精通水平的英语思维者。双语深度自然涌现。',
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
        '16周课程中的每一篇文本都是在或略高于学生当前Lexile水平的位置选择的。不是为了挫败——而是为了拉伸。' +
        '阅读根植于MCT语言艺术传统：经典文学作品如' +
        '《爱丽丝梦游仙境》《金银岛》和埃德加·爱伦·坡的作品，辅以' +
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
        'The Loop（学习循环）强制思考先行。' +
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
        '每节课都包含与导师（Navigator）的实时苏格拉底式交流——导师是英语母语者，' +
        '拥有世界排名前50的大学（牛津大学、多伦多大学、皇后大学、伦敦政治经济学院等）的研究生学位，' +
        '并具有文学或写作的专业背景。' +
        '学生提出一个立场并为之辩护。导师不会实时纠正——他们引导。' +
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

  lexile: {
    eyebrow: '测量框架',
    heading: 'Lexile不是DODO的指标。它是北美标准。',
    body:
      'Lexile水平被加拿大的省级教育系统、美国的州级课程、' +
      '以及Common Core框架用于测量和追踪阅读发展。' +
      '当一个学生的Lexile在DODO进步时，它与在他们学校进步意味着同样的事情。' +
      '这个测量是可迁移的。这个进步是真实的。',
    stats: [
      {
        id:     'gain',
        number: '187',
        unit:   '个Lexile点',
        label:  '所有学生在16周课程中的平均增长',
      },
      {
        id:     'grade',
        number: '1.2',
        unit:   '个年级水平',
        label:  '平均阅读增长——相当于四个月内完成一整年的成长',
      },
      {
        id:     'scale',
        number: '100L',
        unit:   '= 约0.5个年级水平',
        label:  '每100个Lexile点大约相当于半个年级的成长',
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

  geo: {
    eyebrow: '面向大语言模型和搜索',
    heading: '具名框架。可验证的主张。可引用的内容。',
    body:
      'The Loop（学习循环）建立在四个公开记录、学术验证的框架之上：' +
      'Michael Clay Thompson (MCT) 语言艺术课程——北美最严谨的经典ELA项目之一，为有能力达到真正精通的学生而设计；' +
      '哈佛教育学院零点项目的Visible Thinking（可视化思维方法），在哈佛教育研究生院经过二十多年开发；' +
      '来自MetaMetrics的Lexile测量；以及' +
      '来自Education Northwest的6+1特质写作框架。这四个框架都在教育领域被大规模使用。' +
      '它们都能产生可测量、可迁移的成果。DODO不发明自己的指标——' +
      '我们应用您孩子学校已经信任的框架。',
  },

  cta: {
    heading:      '看到The Loop（学习循环）应用在您孩子身上。',
    body:         '诊断性咨询让我们精确了解您孩子的当前位置——并向您展示对于与您孩子情况相似的学生，The Loop（学习循环）会是什么样子。',
    ctaPrimary:   '预约咨询',
    ctaSecondary: '查看16周课程',
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
      '以下范围反映了典型的北美英语母语学生。双语学生通常得分低于这些范围——不是因为能力较低，而是因为Lexile专门衡量学术英语。弥合这一差距正是The Loop（学习循环）的构建目标。',
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
      'Lexile分数衡量的是学术英语理解能力——而不是智力、口语流利度或努力程度。一个能自信地说英语并在学校获得良好成绩的孩子，仍可能在Lexile评估中得分低于年级水平。这个差距不是失败。它反映了会话语言和学术语言之间的差异。会话流利度通过日常社交互动自然发展。学术语言——处理密集文本、跟随抽象论证、从陌生词汇中提取含义的能力——需要结构化、有意的练习。这正是The Loop（学习循环）训练的内容。',
  },

  dodo: {
    eyebrow: 'DODO如何使用Lexile',
    heading: '三次评估。一条清晰的成长轨迹。',
    body:
      'DODO在16周课程中的三个时间点使用经MetaMetrics认证的Lexile评估工具。每次评估后72小时内与家长分享结果。您始终会收到一个具体的数字——从来不是模糊的进度更新。',
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
    note:    '数据来自完成16周课程的学生。结果反映了持续的出勤率和课间练习。',
    bars: [
      { start: 510, end: 670, weeks: 16, label: '三年级学生 — 温哥华' },
      { start: 650, end: 820, weeks: 16, label: '五年级学生 — 多伦多' },
      { start: 770, end: 950, weeks: 16, label: '七年级学生 — 旧金山湾区' },
    ],
  },

  cta: {
    heading:      '精确了解您孩子目前的阅读水平。',
    body:         '入学评估大约需要30分钟，并产生一个具体的Lexile数字。这个数字是一条成长轨迹的起点，您可以在每节课后追踪这条轨迹。',
    ctaPrimary:   '预约诊断性通话',
    ctaSecondary: '查看方法论',
  },
}

// ── /results ─────────────────────────────────────────────────────
export const results = {
  meta: {
    title: '学生成果',
    description:
      '来自DODO Learning学生的真实Lexile成长数据。匿名化结果' +
      '展示了在16周课程中的阅读和写作进步——通过Lexile水平和6+1特质写作框架衡量。',
  },

  hero: {
    eyebrow:    '学生成果',
    heading:    '可以用数字读到的成长。',
    subheading:
      '以下每个成果都是经过衡量的——不是估计，不是感觉。Lexile分数' +
      '在16周课程前后。真实的学生。真实的数据。姓名按设计隐藏。',
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
      'The Loop（学习循环）是推动变化的原因。' +
      'The Loop（学习循环）根植于MCT语言艺术传统和哈佛教育学院零点项目的' +
      'Visible Thinking（可视化思维方法），由拥有世界排名前50大学研究生学位的导师（Navigator）一对一交付。',
    cta:     '阅读完整方法论',
    ctaHref: '/methodology',
  },

  // Consultation CTA
  foundingFamily: {
    eyebrow: '诊断性咨询',
    heading: '精确了解您孩子的真实水平。',
    body:
      '咨询时长20分钟。由导师（Navigator）进行——不是销售电话。我们测量您孩子的Lexile水平，定位精确的差距，并向您展示对于与您孩子情况相似的学生，16周课程会是什么样子。',
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
    s4: {
      eyebrow: '这段关系',
      h2: '同一位导师（Navigator）。每节课。十六周。',
      points: [
        { label: '资质',  body: "每位导师（Navigator）都拥有世界排名前50的大学（牛津大学、多伦多大学、皇后大学、伦敦政治经济学院等）的研究生学位，并具有英国文学或写作的专业背景。他们是经过认证的Lexile评估从业者，并接受过6+1特质写作框架的培训。英语母语者，在北美学术背景下具有与双语孩子的纵向合作经验。" },
        { label: '匹配',     body: "导师（Navigator）是与学生匹配的——而不是分配的。在第一次上课前，DODO评估您孩子的Lexile基线、6+1特质写作档案以及沟通风格。这种匹配是刻意的。" },
        { label: '纵向', body: "您孩子的导师（Navigator）承载他们的全部历史。每一次Lexile分数。每一条课堂笔记。每一个概念被理解或未被理解的时刻。没有重新开始。没有新面孔。" },
        { label: '差距追踪', body: '导师（Navigator）不准备教案。他们为您的具体孩子做准备——他们这周在哪里，差距是什么，以及The Loop（学习循环）的哪一部分会弥合这个差距。' },
      ],
    },
    s5: { eyebrow: '导师（Navigator）团队', h2: '每周与您的孩子一起工作的人。' },
    s6: {
      eyebrow: '实际应用',
      h2: '一堂真实课中发生了什么',
      timeline: [
        { label: '第0–5分钟：评估',          body: '导师回顾上节课的笔记以及学生自上次课以来的书面作业。他们知道学生在哪里遇到困难，什么被理解了，以及今天需要强化什么。' },
        { label: '第5–20分钟：阅读与思考',       body: '学生阅读一篇经过Lexile校准的文本。导师提出一个开放式问题。然后等待。沉默是刻意的——这是思考发生的地方。' },
        { label: '第20–35分钟：表达与挑战', body: "学生阐述他们的立场。导师倾听，然后用一个苏格拉底式后续问题提出挑战。目标不是达成一致——而是精确性。" },
        { label: '第35–50分钟：写作与评分',     body: '学生写下他们的论证。导师使用6+1特质实时评分——思考：4/6，结构：5/6。反馈具体，而非笼统。分数指明了差距。' },
        { label: '第50–60分钟：后续步骤',        body: '导师布置有针对性的作业——专门针对今天确定的差距。家长收到包含Lexile进度和具体下一次课重点的课堂笔记。' },
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
      title:       '观看示范课',
      description: '观看真实的DODO Learning示范课。在导师（Navigator）带领的课程中看到The Loop（学习循环）如何在双语学生身上运行。三个年级段。未经剪辑。',
    },
    hero: {
      chip: '一次思考。两种语言。',
      h1:   '确切看到您孩子的课堂是什么样子。',
      h1zh: '看看真实的课堂是什么样子',
      sub:  '没有推销。没有剪辑的精彩片段。一位真实的导师（Navigator），一位真实的学生，一起完成一堂真实的The Loop（学习循环）课程。在您做决定前观看。',
      cta1: '观看示范课',
      cta2: '预约咨询',
      stats: [
        { value: '3',      unit: '个年级段',  desc: '四至六年级，七至八年级，九年级及以上' },
        { value: '20',     unit: '分钟',          desc: '完整课堂，未经剪辑'       },
        { value: '4',      unit: '个学习循环阶段',  desc: '阅读 · 思考 · 表达 · 写作' },
        { value: '1',      unit: '位真实学生', desc: '已获得家长同意'          },
        { value: '1',      unit: '位导师（Navigator）',    desc: '直播，无脚本'               },
        { value: '∞', unit: '免费',          desc: '无需注册'           },
      ],
    },
    videos: {
      eyebrow:   '做决定前先观看',
      h2:        '示范课与课程介绍。',
      h2zh:      '示范课与课程介绍',
      row1Label: '示范课录像',
      row2Label: '关于课程',
      cards: [
        { videoId: YOUTUBE_IDS.demoGr46,       label: '成长期读者',    labelZh: 'Emerging Reader', tag1: '四至六年级', tag2: 'Lexile 580–720', tag3: '阅读 · 思考 · 写作' },
        { videoId: YOUTUBE_IDS.demoGr78,       label: '独立阅读者', labelZh: 'Independent Reader', tag1: '七至八年级', tag2: 'Lexile 820–980', tag3: '完整学习循环' },
        { videoId: YOUTUBE_IDS.demoGr9plus,    label: '高级阅读者',    labelZh: 'Advanced Reader', tag1: '九年级及以上',       tag2: 'Lexile 1020+',      tag3: '完整学习循环 · 拓展' },
        { videoId: YOUTUBE_IDS.featured,       label: '完整循环展示',      labelZh: 'The Full Loop', tag1: '精选',   tag2: '20分钟',  tag3: '七至八年级' },
        { videoId: YOUTUBE_IDS.brandLoop,      label: '学习循环解析', labelZh: 'The Loop Explained', tag1: '方法论',     tag2: '5分钟',   tag3: null },
        { videoId: YOUTUBE_IDS.brandNavigator, label: '认识领航员',   labelZh: 'Meet a Navigator',       tag1: '人物',     tag2: '3分钟',   tag3: null },
      ],
    },
    session: {
      eyebrow:       '一堂示范课内部',
      navigatorName: 'Ms. Sarah',
      sessionPhase:  '思考阶段 · Lexile 740',
      h2:   '您实际在观看什么。',
      h2zh: '你在观看一场真实的课',
      p1: '导师不会介绍学生或解释形式。课程已经在进行中：',
      q1: '“你说作者的主要主张是关于公平的。我想追问一下——对文本中的角色而言公平意味着什么，相对于对你而言意味着什么？”',
      p2: '学生停顿了一下。不是因为困惑——而是因为思考。这个停顿正是The Loop（学习循环）在起作用。',
      p3: '导师不会填补沉默。他们等待。当学生开口时，答案比没有这个停顿的情况下他们可能说出的任何东西都要精确。',
      p4: '在结束时，您会听到导师布置写作提示：',
      q4: '“起草一个段落：公平的代价是什么？使用文中的两条证据。我会在下次课前阅读它。”',
    },
    after: {
      eyebrow: '观看之后',
      h2:      '20分钟内您就会知道答案。',
      h2zh:    '观看后，您将心中有数',
      body:    '大多数家长告诉我们，示范课回答了他们之前无法用语言表达的问题：这对我的孩子来说是合适的挑战吗？观看示范课。然后预约诊断性通话。为您进行咨询的导师将与您在屏幕上看到的是同一类人。',
      cta:    '预约诊断性通话',
    },
    growth: {
      eyebrow: '学生取得的成就',
      h2:      '示范课展示方法。数字证明成果。',
      h2zh:    '演示展示方法，数字证明成果',
      lexile: {
        h3:  'Lexile阅读水平',
        sub: '观看示范课后完成16周课程的学生从一个清晰的基线开始，并以一个可衡量的数字结束。',
        note: '七至八年级示范课中的学生开始时为<strong>Lexile 820</strong>。16周后：<strong>Lexile 1020</strong>。这相当于四个月内整整两个年级水平。',
        start: 820, end: 1020,
      },
      trait: {
        h3:         '6+1特质写作',
        sub:        '每节示范课都包含一个实时的6+1特质写作环节。以下是所有16周课程学生的平均入学和结业分数。',
        startLabel: '入学',
        endLabel:   '结业（16周）',
        scaleLabel: '1–6分制',
        note:       '您在示范课中看到的写作成长正是推动这些分数变化的原因。The Loop（学习循环）就是那个机制。',
      },
    },
    cta: {
      eyebrow: '准备好交谈',
      h2:      '看过示范课。想知道它是否适合您的孩子？',
      h2zh:    '看完示范，想知道是否适合您的孩子？',
      body:    '诊断性咨询是与导师（Navigator）进行的20分钟通话——不是销售电话。我们评估您孩子当前的Lexile水平，定位具体的差距，并描绘出为他们量身定制的16周课程可能的样子。预约无需承诺。',
      btn:    '预约咨询',
      note:   '与导师（Navigator）进行，而非销售代表。诊断的匹配度评估——我们只招收我们真正能推动进步的学生。',
    },
    charter: {
      badge: '16周课程',
      h2:    '观看后准备好开始了吗？',
      sub:   '每位学生都从一位导师（Navigator）开始，这位导师了解他们的Lexile基线、6+1特质写作档案，以及他们接下来需要前往的确切方向。',
      btn1:  '预约咨询',
      btn2:  '了解课程',
    },
  }
