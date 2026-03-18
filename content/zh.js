// Results section — add this to content/zh.js
// Replace the existing `export const results = {}` stub with this.

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