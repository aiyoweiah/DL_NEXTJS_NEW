// content/cities.js
//
// City landing pages — local diaspora SEO.
// Migrated from app/[locale]/cities/[city]/page.jsx (2026-05-17).
// 6 city slugs: vancouver | richmond-bc | markham | toronto | san-francisco-bay-area | los-angeles
//
// Schema:
//   cities[slug] = { name, nameCN, region, regionCN, country, en: {...}, zh: {...} }
//   citiesUi[locale]         — shared chrome (eyebrows, CTAs, headings)
//   citiesProofStats[locale] — three stats shown on every city page
//   citiesLoopSteps[locale]  — Read/Think/Speak/Write summary, four entries
//   citiesPhases[locale]     — Week 1 / Week 8 / Week 16 milestones
//
// Translation workflow (per translation/BRAND_CONTENT_GUIDE.md §13):
//   Hand the .en sub-objects to DeepSeek with the brief + glossary, paste the
//   returned same-shape JSON into the matching .zh sub-objects.
//
// ZH translation: DeepSeek run 2026-05-17. Navigator references upgraded to
// 导师（Navigator） per glossary; Richmond ZH context reframed to drop ESL
// anti-dict term; Vancouver ZH sub uses affirmative-only frame.

export const cities = {
  'vancouver': {
    name:       'Vancouver',
    nameCN:     '温哥华',
    region:     'British Columbia',
    regionCN:   '英属哥伦比亚',
    country:    'Canada',
    countryCode: 'CA',
    en: {
      h1:
        'How do Chinese-speaking families in Vancouver build English Thinkers?',
      subheading:
        'Not a tutoring centre. Not an ESL programme. A structured 16-week methodology that trains the full cognitive loop — Read, Think, Speak, Write — in English. Measured by Lexile. Led by a Navigator.',
      context:
        'Metro Vancouver is home to one of the largest Chinese-speaking diaspora communities in North America. DODO Learning serves families across the Lower Mainland — students navigating English-language classrooms while Mandarin or Cantonese remains the language of home. We do not treat bilingualism as a gap. We build on it.',
    },
    zh: {
      h1:
        '温哥华的华语家庭，如何培养英语思维者？',
      subheading:
        '一套结构化的16周方法，训练完整的认知循环——阅读、思考、表达、写作——以英语进行，以Lexile衡量，由导师（Navigator）主导。',
      context:
        '大温哥华地区拥有北美最大的华语社区之一。DODO Learning服务大温地区的家庭——那些在英语课堂学习、而家中仍以普通话或粤语为主的学生。我们不把双语视为不足，而是以此为基础构建。',
    },
  },

  'richmond-bc': {
    name:       'Richmond',
    nameCN:     '列治文',
    region:     'British Columbia',
    regionCN:   '英属哥伦比亚',
    country:    'Canada',
    countryCode: 'CA',
    en: {
      h1:
        'English Thinkers for Richmond BC families — English fluency without losing the first language.',
      subheading:
        'Richmond has the highest concentration of Mandarin-speaking families in Canada. DODO Learning is built for exactly this — students who are fluent at home and need to become precise in English.',
      context:
        'Richmond BC is unique in Canada: a community where Chinese is the first language of the majority, and English is the language of school. DODO Learning serves Richmond students who need more than ESL — they need a methodology that treats bilingualism as a cognitive advantage and trains the full loop every week.',
    },
    zh: {
      h1:
        '列治文华语家庭的英语思维者——英语流利，母语不失。',
      subheading:
        '列治文是加拿大普通话家庭密度最高的城市。DODO Learning正是为此而设——服务在家流利、需要在英语中变得精准的学生。',
      context:
        '列治文在加拿大独一无二：这是一个中文是多数人母语、英语是学校语言的社区。DODO Learning服务列治文学生，他们需要的不仅限于语言层面的支持——而是一套将双语视为认知优势、每周训练完整循环的方法论。',
    },
  },

  'markham': {
    name:       'Markham',
    nameCN:     '万锦',
    region:     'Ontario',
    regionCN:   '安大略',
    country:    'Canada',
    countryCode: 'CA',
    en: {
      h1:
        'English literacy for Chinese-speaking families in Markham — measured by Lexile, not guesswork.',
      subheading:
        'Markham families want measurable results. DODO Learning delivers exactly that — Lexile scores at entry and exit, 6+1 Trait writing assessments, and a Navigator who knows your child\'s voice.',
      context:
        'Markham has one of the fastest-growing Chinese-speaking communities in the Greater Toronto Area. Students here are academically ambitious, and their families expect specificity. DODO Learning does not offer general improvement — we offer a Lexile trajectory, a named framework, and a 16-week commitment with a documented result.',
    },
    zh: {
      h1:
        '万锦华语家庭的英语读写能力——以Lexile衡量，不靠感觉。',
      subheading:
        '万锦家庭需要可量化的成果。DODO Learning正是如此——入学和结业时的Lexile分数、6+1特质写作评估，以及一位了解您孩子声音的导师（Navigator）。',
      context:
        '万锦是大多伦多地区华语社区增长最快的城市之一。这里的学生学业进取，家长期待具体的成果。DODO Learning不提供笼统的提升——我们提供Lexile进展轨迹、有名有据的框架，以及一项16周的承诺与有记录的结果。',
    },
  },

  'toronto': {
    name:       'Toronto',
    nameCN:     '多伦多',
    region:     'Ontario',
    regionCN:   '安大略',
    country:    'Canada',
    countryCode: 'CA',
    en: {
      h1:
        'English Thinkers built in Toronto — The 16-Week Program for Chinese-speaking families.',
      subheading:
        'Toronto\'s Chinese-speaking diaspora is one of the most academically competitive in Canada. DODO Learning develops the edge that matters — reading precision, written argument, and the ability to think in both languages.',
      context:
        'Toronto is home to one of the largest and most academically ambitious Chinese-speaking communities in North America. Students here compete for top schools in Canada and internationally. DODO Learning exists for this context — not to help students keep pace, but to help them lead through English mastery at the highest level.',
    },
    zh: {
      h1:
        '多伦多培养的英语思维者——面向华语家庭的16周课程。',
      subheading:
        '多伦多的华语社区是加拿大学业竞争最激烈的之一。DODO Learning培养真正重要的优势——阅读精准度、书面论证能力，以及在两种语言中思考的能力。',
      context:
        '多伦多拥有北美规模最大、学业进取心最强的华语社区之一。这里的学生在竞争加拿大顶尖学校及国际名校。DODO Learning为此而生——不是帮助学生跟上，而是通过最高水平的英语思维训练，帮助他们建立真正的优势。',
    },
  },

  'san-francisco-bay-area': {
    name:       'San Francisco Bay Area',
    nameCN:     '旧金山湾区',
    region:     'California',
    regionCN:   '加利福尼亚',
    country:    'United States',
    countryCode: 'US',
    en: {
      h1:
        'English literacy development for Bay Area Chinese-speaking families — Lexile-measured, Navigator-led.',
      subheading:
        'The Bay Area\'s Chinese-speaking diaspora includes some of the most educationally driven families in the United States. DODO Learning serves students who need more than fluency — they need precision, argument, and measurable growth.',
      context:
        'The San Francisco Bay Area is home to a large and academically high-achieving Chinese-speaking community. Families here understand measurement and expect it. DODO Learning applies the same rigour — Lexile assessment, 6+1 Trait writing framework, and a 16-week program with a documented result. Live sessions run online with a dedicated Navigator across all 16 weeks.',
    },
    zh: {
      h1:
        '湾区华语家庭的英语读写发展——Lexile衡量，导师（Navigator）主导。',
      subheading:
        '湾区华语社区汇聚了美国教育意识最强的家庭。DODO Learning服务需要的不只是流利——而是精准、论证能力和可量化成长的学生。',
      context:
        '旧金山湾区拥有规模庞大、学业成就突出的华语社区。这里的家庭理解数据、期待数据。DODO Learning同样如此——Lexile评估、6+1特质写作框架，以及一项有记录结果的16周课程。线上直播课程，整个16周由专属导师（Navigator）陪伴。',
    },
  },

  'los-angeles': {
    name:       'Los Angeles',
    nameCN:     '洛杉矶',
    region:     'California',
    regionCN:   '加利福尼亚',
    country:    'United States',
    countryCode: 'US',
    en: {
      h1:
        'English Thinkers for Los Angeles Chinese-speaking families — The 16-Week Program.',
      subheading:
        'Los Angeles is one of the largest Chinese-speaking diaspora communities in the US. DODO Learning builds the English Thinkers that LA families are raising — students who read above grade level, argue precisely, and write with intention.',
      context:
        'The greater Los Angeles area has a large and diverse Chinese-speaking community spanning the San Gabriel Valley and beyond. Students here are preparing for the US university pathway and need English literacy that goes beyond accent or vocabulary. DODO Learning trains the full cognitive loop — the level of English that gets students into competitive programmes.',
    },
    zh: {
      h1:
        '洛杉矶华语家庭的英语思维——16周课程。',
      subheading:
        '洛杉矶是美国最大的华语社区之一。DODO Learning培养洛杉矶家庭正在塑造的英语思维者——阅读能力超越年级，论证精准，写作有目的。',
      context:
        '大洛杉矶地区拥有覆盖圣盖博谷及更广范围的庞大多元华语社区。这里的学生正在备战美国大学升学，需要的英语读写能力超越口音和词汇。DODO Learning训练完整的认知循环——让学生进入竞争性课程的英语能力。',
    },
  },

  // ── Compact city entries (added 2026-05-21 per workflow #11 Option C) ──
  // Same data shape as the 6 rich pages above; shorter h1/subheading/context.
  // Auto-rendered by app/[locale]/cities/[city]/page.jsx via Object.keys(cities).

  'burnaby': {
    name: 'Burnaby', nameCN: '本拿比',
    region: 'British Columbia', regionCN: '英属哥伦比亚',
    country: 'Canada', countryCode: 'CA',
    en: {
      h1: 'DODO Learning in Burnaby — English literacy at the cognitive level.',
      subheading: 'Live, Navigator-led one-on-one. The LCS System curriculum, Lexile-measured. For Burnaby families and across Metro Vancouver.',
      context: 'Burnaby sits at the heart of Metro Vancouver, home to one of the largest Chinese-diaspora communities in North America. DODO Learning serves Burnaby students online — same methodology, same measurement, same Navigator-led intensity as families across the Lower Mainland.',
    },
    zh: {
      h1: '本拿比的家庭——DODO Learning 英语认知深度学习。',
      subheading: '导师一对一实时主导，LCS 教学体系，以 Lexile 衡量。服务本拿比及大温哥华地区的家庭。',
      context: '本拿比位于大温哥华核心地带，是北美最大的华人社区之一。DODO Learning 在线服务本拿比的学生——与温哥华、列治文、高贵林等大温家庭同样的教学方法、同样的测量标准、同样的导师主导强度。',
    },
  },

  'coquitlam': {
    name: 'Coquitlam', nameCN: '高贵林',
    region: 'British Columbia', regionCN: '英属哥伦比亚',
    country: 'Canada', countryCode: 'CA',
    en: {
      h1: 'DODO Learning in Coquitlam — English Thinkers, anywhere in Metro Vancouver.',
      subheading: 'Live, Navigator-led one-on-one. The LCS System curriculum, Lexile-measured. For Coquitlam families and across the Tri-Cities.',
      context: 'Coquitlam, Port Moody, and Port Coquitlam — the Tri-Cities — have a strong and growing Chinese-immigrant community. DODO Learning serves Coquitlam students online — the same methodology delivered to families across Metro Vancouver\'s eastern suburbs.',
    },
    zh: {
      h1: '高贵林的家庭——DODO Learning 英语思维深度训练。',
      subheading: '导师一对一实时主导，LCS 教学体系，以 Lexile 衡量。服务高贵林及三联市地区的家庭。',
      context: '高贵林、满地宝、高贵林港三联市拥有规模可观且持续增长的华人移民社区。DODO Learning 在线服务高贵林的学生——与大温东部地区其他家庭享有完全相同的教学方法。',
    },
  },

  'calgary': {
    name: 'Calgary', nameCN: '卡尔加里',
    region: 'Alberta', regionCN: '阿尔伯塔',
    country: 'Canada', countryCode: 'CA',
    en: {
      h1: 'DODO Learning in Calgary — English literacy for families across Alberta.',
      subheading: 'Live, Navigator-led one-on-one. The LCS System and MCT enriched curriculum, Lexile-measured. For Calgary families and across Alberta.',
      context: 'Calgary hosts Alberta\'s largest Chinese-diaspora community, concentrated in the NW and SE quadrants. DODO Learning serves Calgary students online — the same Loop methodology, the same Navigator-led intensity, available wherever students log in across Western Canada.',
    },
    zh: {
      h1: '卡尔加里的家庭——DODO Learning 英语深度学习。',
      subheading: '导师一对一实时主导，LCS 教学体系与 MCT 课程，以 Lexile 衡量。服务卡尔加里及阿尔伯塔地区的家庭。',
      context: '卡尔加里拥有阿尔伯塔最大的华人社区，主要集中在西北和东南区域。DODO Learning 在线服务卡尔加里学生——相同的 Loop 方法论、相同的导师主导强度，服务整个加拿大西部的学生。',
    },
  },

  'richmond-hill': {
    name: 'Richmond Hill', nameCN: '列治文山',
    region: 'Ontario', regionCN: '安大略',
    country: 'Canada', countryCode: 'CA',
    en: {
      h1: 'English Thinkers in Richmond Hill — English literacy at the cognitive level.',
      subheading: 'Live, Navigator-led one-on-one. The LCS System curriculum, Lexile-measured. For Richmond Hill families and across York Region.',
      context: 'Richmond Hill anchors one of Ontario\'s largest Chinese-immigrant communities, stretching north along Yonge Street from Toronto. DODO Learning serves Richmond Hill students online — the same methodology delivered to families across York Region and the GTA.',
    },
    zh: {
      h1: '列治文山的家庭——DODO Learning 英语深度学习。',
      subheading: '导师一对一实时主导，LCS 教学体系，以 Lexile 衡量。服务列治文山及约克区的家庭。',
      context: '列治文山是安大略最大的华人社区之一，沿央街从多伦多向北延伸。DODO Learning 在线服务列治文山的学生——与约克区及大多伦多其他家庭享有完全相同的教学方法。',
    },
  },

  'mississauga': {
    name: 'Mississauga', nameCN: '密西沙加',
    region: 'Ontario', regionCN: '安大略',
    country: 'Canada', countryCode: 'CA',
    en: {
      h1: 'DODO Learning in Mississauga — English Thinkers across Peel Region.',
      subheading: 'Live, Navigator-led one-on-one. The LCS System curriculum, Lexile-measured. For Mississauga families and across Peel.',
      context: 'Mississauga is Canada\'s sixth-largest city and home to a diverse Chinese-speaking community alongside families from every corner of the world. DODO Learning serves Mississauga students online — same Loop, same measurement, same Navigator across all 16 weeks.',
    },
    zh: {
      h1: '密西沙加的家庭——DODO Learning 英语深度学习。',
      subheading: '导师一对一实时主导，LCS 教学体系，以 Lexile 衡量。服务密西沙加及皮尔区的家庭。',
      context: '密西沙加是加拿大第六大城市，拥有多元的华人社区以及来自世界各地的家庭。DODO Learning 在线服务密西沙加学生——相同的 Loop、相同的测量、同一位导师贯穿全部 16 周。',
    },
  },

  'montreal': {
    name: 'Montreal', nameCN: '蒙特利尔',
    region: 'Quebec', regionCN: '魁北克',
    country: 'Canada', countryCode: 'CA',
    en: {
      h1: 'DODO Learning in Montreal — English literacy at the cognitive level.',
      subheading: 'Live, Navigator-led one-on-one. The LCS System and MCT enriched curriculum, Lexile-measured. For Montreal families navigating English alongside French and Mandarin.',
      context: 'Montreal families navigate a tri-lingual reality — French at school, Mandarin or Cantonese at home, English as the language of cross-Canada opportunity. DODO Learning serves Montreal students online — building English literacy at the cognitive level without compromising the other languages a child carries.',
    },
    zh: {
      h1: '蒙特利尔的家庭——DODO Learning 英语深度学习。',
      subheading: '导师一对一实时主导，LCS 教学体系与 MCT 课程，以 Lexile 衡量。服务蒙特利尔的多语家庭。',
      context: '蒙特利尔的家庭面对三语环境——学校的法语、家中的普通话或粤语、加拿大跨省机会的英语。DODO Learning 在线服务蒙特利尔学生——在不牺牲孩子其他语言的前提下，构建认知深度的英语能力。',
    },
  },

  'san-jose': {
    name: 'San Jose', nameCN: '圣何塞',
    region: 'California', regionCN: '加利福尼亚',
    country: 'United States', countryCode: 'US',
    en: {
      h1: 'DODO Learning in San Jose — English Thinkers across Silicon Valley.',
      subheading: 'Live, Navigator-led one-on-one. The LCS System curriculum, Lexile-measured. For San Jose families and across the South Bay.',
      context: 'San Jose anchors the South Bay\'s Chinese-speaking community, with concentrations in Almaden, Evergreen, and Berryessa. DODO Learning serves San Jose students online — same methodology delivered across Silicon Valley and the broader Bay Area.',
    },
    zh: {
      h1: '圣何塞的家庭——DODO Learning 英语深度学习。',
      subheading: '导师一对一实时主导，LCS 教学体系，以 Lexile 衡量。服务圣何塞及南湾地区的家庭。',
      context: '圣何塞是南湾华人社区的核心，集中在 Almaden、Evergreen、Berryessa 等地区。DODO Learning 在线服务圣何塞的学生——与硅谷及更广湾区其他家庭享有完全相同的教学方法。',
    },
  },

  'cupertino': {
    name: 'Cupertino', nameCN: '库比蒂诺',
    region: 'California', regionCN: '加利福尼亚',
    country: 'United States', countryCode: 'US',
    en: {
      h1: 'DODO Learning in Cupertino — English literacy for Silicon Valley families.',
      subheading: 'Live, Navigator-led one-on-one. The LCS System curriculum, Lexile-measured. For Cupertino families and across the West Bay.',
      context: 'Cupertino is one of the most academically competitive school districts in the US, with a strong Chinese-immigrant community. DODO Learning serves Cupertino students online — preparing them for the depth of analytical reading and academic writing the district\'s high schools demand.',
    },
    zh: {
      h1: '库比蒂诺的家庭——DODO Learning 英语深度学习。',
      subheading: '导师一对一实时主导，LCS 教学体系，以 Lexile 衡量。服务库比蒂诺及西湾地区的家庭。',
      context: '库比蒂诺拥有美国学术竞争最激烈的学区之一，以及规模可观的华人移民社区。DODO Learning 在线服务库比蒂诺学生——为他们准备好该学区高中所要求的分析性阅读深度与学术写作能力。',
    },
  },

  'irvine': {
    name: 'Irvine', nameCN: '尔湾',
    region: 'California', regionCN: '加利福尼亚',
    country: 'United States', countryCode: 'US',
    en: {
      h1: 'DODO Learning in Irvine — English Thinkers across Orange County.',
      subheading: 'Live, Navigator-led one-on-one. The LCS System curriculum, Lexile-measured. For Irvine families and across OC.',
      context: 'Irvine has one of California\'s most established Chinese-immigrant communities, alongside a strong Korean and South Asian presence. DODO Learning serves Irvine students online — methodology built for the academic pathway from Irvine USD into selective US universities.',
    },
    zh: {
      h1: '尔湾的家庭——DODO Learning 英语深度学习。',
      subheading: '导师一对一实时主导，LCS 教学体系，以 Lexile 衡量。服务尔湾及橙县地区的家庭。',
      context: '尔湾拥有加州历史最悠久的华人移民社区之一，以及活跃的韩国与南亚社群。DODO Learning 在线服务尔湾学生——为从尔湾联合学区到顶尖美国大学的学业路径而设的方法论。',
    },
  },

  'bellevue': {
    name: 'Bellevue', nameCN: '贝尔维尤',
    region: 'Washington', regionCN: '华盛顿州',
    country: 'United States', countryCode: 'US',
    en: {
      h1: 'DODO Learning in Bellevue — English literacy at the cognitive level.',
      subheading: 'Live, Navigator-led one-on-one. The LCS System curriculum, Lexile-measured. For Bellevue families and across the Eastside.',
      context: 'Bellevue and the Eastside have one of Washington\'s largest Chinese-speaking communities, anchored by the tech corridor. DODO Learning serves Bellevue students online — building the English literacy that the Bellevue School District\'s IB and AP pathways require.',
    },
    zh: {
      h1: '贝尔维尤的家庭——DODO Learning 英语深度学习。',
      subheading: '导师一对一实时主导，LCS 教学体系，以 Lexile 衡量。服务贝尔维尤及东岸地区的家庭。',
      context: '贝尔维尤及东岸是华盛顿州最大的华人社区之一，依托科技走廊蓬勃发展。DODO Learning 在线服务贝尔维尤学生——构建贝尔维尤学区 IB 与 AP 路径所需的英语深度能力。',
    },
  },

  'new-york': {
    name: 'New York', nameCN: '纽约',
    region: 'New York', regionCN: '纽约州',
    country: 'United States', countryCode: 'US',
    en: {
      h1: 'DODO Learning in New York — English Thinkers across the tri-state area.',
      subheading: 'Live, Navigator-led one-on-one. The LCS System curriculum, Lexile-measured. For New York families across Manhattan, Flushing, and Long Island.',
      context: 'New York has one of the most established Chinese-American communities in the world, spanning Manhattan\'s Chinatown, Flushing in Queens, and the suburbs of Long Island and Westchester. DODO Learning serves New York students online — the same methodology whether the student studies in a public, magnet, or independent school.',
    },
    zh: {
      h1: '纽约的家庭——DODO Learning 英语深度学习。',
      subheading: '导师一对一实时主导，LCS 教学体系，以 Lexile 衡量。服务曼哈顿、法拉盛、长岛的纽约家庭。',
      context: '纽约拥有世界上最成熟的华人社区之一，横跨曼哈顿唐人街、皇后区法拉盛、长岛及威斯特彻斯特郊区。DODO Learning 在线服务纽约学生——无论孩子就读公立、磁校还是独立学校，都是相同的方法论。',
    },
  },

  'boston': {
    name: 'Boston', nameCN: '波士顿',
    region: 'Massachusetts', regionCN: '马萨诸塞',
    country: 'United States', countryCode: 'US',
    en: {
      h1: 'DODO Learning in Boston — English literacy for Greater Boston families.',
      subheading: 'Live, Navigator-led one-on-one. The LCS System curriculum, Lexile-measured. For Boston families across Cambridge, Newton, Lexington, and Brookline.',
      context: 'Greater Boston\'s Chinese-speaking community is concentrated in Cambridge, Newton, Lexington, and Brookline — districts known for academic intensity. DODO Learning serves Boston students online — building the analytical English literacy needed for the region\'s BPS, exam school, and independent school pathways.',
    },
    zh: {
      h1: '波士顿的家庭——DODO Learning 英语深度学习。',
      subheading: '导师一对一实时主导，LCS 教学体系，以 Lexile 衡量。服务剑桥、牛顿、列克星敦、布鲁克莱恩的波士顿家庭。',
      context: '大波士顿地区的华人社区集中在剑桥、牛顿、列克星敦、布鲁克莱恩——以学术强度著称的学区。DODO Learning 在线服务波士顿学生——构建该地区 BPS、考试学校与独立学校路径所需的分析性英语能力。',
    },
  },

  'houston': {
    name: 'Houston', nameCN: '休斯顿',
    region: 'Texas', regionCN: '德克萨斯',
    country: 'United States', countryCode: 'US',
    en: {
      h1: 'DODO Learning in Houston — English Thinkers across Texas.',
      subheading: 'Live, Navigator-led one-on-one. The LCS System curriculum, Lexile-measured. For Houston families across Sugar Land and the West Houston corridor.',
      context: 'Houston has one of the largest Chinese-speaking communities in the southern US, anchored in Sugar Land, West Houston, and the Energy Corridor. DODO Learning serves Houston students online — same methodology, same measurement, available to any family in Texas with a stable internet connection.',
    },
    zh: {
      h1: '休斯顿的家庭——DODO Learning 英语深度学习。',
      subheading: '导师一对一实时主导，LCS 教学体系，以 Lexile 衡量。服务休斯顿及糖城、西休斯顿走廊的家庭。',
      context: '休斯顿拥有美国南部最大的华人社区之一，集中在糖城、西休斯顿、能源走廊地区。DODO Learning 在线服务休斯顿学生——同样的方法论、同样的测量标准，对所有有稳定网络的德州家庭开放。',
    },
  },

  'denver': {
    name: 'Denver', nameCN: '丹佛',
    region: 'Colorado', regionCN: '科罗拉多',
    country: 'United States', countryCode: 'US',
    en: {
      h1: 'DODO Learning in Denver — English literacy for Mountain West families.',
      subheading: 'Live, Navigator-led one-on-one. The LCS System curriculum, Lexile-measured. For Denver families and across the Mountain West.',
      context: 'Denver\'s Chinese-speaking community is growing rapidly, alongside families relocating from coastal hubs. DODO Learning serves Denver students online — the same methodology, available wherever a family has settled in Colorado or the broader Mountain West.',
    },
    zh: {
      h1: '丹佛的家庭——DODO Learning 英语深度学习。',
      subheading: '导师一对一实时主导，LCS 教学体系，以 Lexile 衡量。服务丹佛及山地西部地区的家庭。',
      context: '丹佛的华人社区正在快速增长，许多家庭从沿海城市迁居至此。DODO Learning 在线服务丹佛学生——无论家庭定居在科罗拉多还是更广的山地西部，都是相同的方法论。',
    },
  },
}

export const citiesProofStats = {
  en: [
    { number: '1',    unit: 'grade level',   label: 'average Lexile reading growth across two 16-week cycles' },
    { number: '300+', unit: 'students',      label: 'served since launch · real Lexile growth, verified results' },
    { number: '8/10', unit: '',              label: 'of families continue past the first 16-week cycle' },
  ],
  zh: [
    { number: '1',    unit: '个年级',         label: '两个16周课程周期内的平均Lexile阅读水平增长' },
    { number: '300+', unit: '个学生',         label: '自成立以来真实陪跑——Lexile真实增长，已验证的成果' },
    { number: '8/10', unit: '',              label: '的家庭在第一个16周周期后选择继续' },
  ],
}

export const citiesLoopSteps = {
  en: [
    { number: '01', label: 'Read',  body: 'Texts selected above the student\'s current Lexile level. Vocabulary depth and reading stamina built intentionally.' },
    { number: '02', label: 'Think', body: 'A position is formed before speaking. Both language registers — English and mother tongue — are activated.' },
    { number: '03', label: 'Speak', body: 'Live Socratic exchange with the Navigator. Clarity of thinking in English — not performance, not correction.' },
    { number: '04', label: 'Write', body: 'Thinking committed to the page. Assessed using the 6+1 Trait framework — the same rubric used in Canadian and US classrooms.' },
  ],
  zh: [
    { number: '01', label: '阅读', body: '文本有意选在学生当前Lexile水平之上，刻意培养词汇深度与阅读耐力。' },
    { number: '02', label: '思考', body: '在表达之前先形成观点，同时激活两种语言思维——英语与母语。' },
    { number: '03', label: '表达', body: '与导师（Navigator）进行实时苏格拉底式对话，追求英语思维的清晰度，而非表演或纠错。' },
    { number: '04', label: '写作', body: '将思考落实于纸面，以6+1特质框架评估——与加拿大和美国课堂使用的评分标准完全相同。' },
  ],
}

export const citiesPhases = {
  en: [
    { week: 'Week 1',  label: 'Entrance Assessment', body: 'Lexile baseline and 6+1 Trait writing snapshot. We find out exactly where your child is — not where their school says they are.' },
    { week: 'Week 8',  label: 'Midpoint Check-In',   body: 'Navigator review of Lexile trajectory and writing trait scores. Written progress note to the family. Plan adjusted if needed.' },
    { week: 'Week 16', label: 'Exit Assessment',      body: 'Full Lexile re-measure and 6+1 Trait re-evaluation. Growth is quantified, visible, and documented.' },
  ],
  zh: [
    { week: '第1周',  label: '入学评估', body: 'Lexile基线与6+1特质写作快照。我们确切了解您孩子的水平——而非学校报告所呈现的。' },
    { week: '第8周',  label: '中期检查', body: '导师（Navigator）审查Lexile进展与写作特质分数，向家庭发送书面进度说明，并按需调整计划。' },
    { week: '第16周', label: '结业评估', body: '完整的Lexile重测与6+1特质重评，成长被量化、可见、有据可查。' },
  ],
}

export const citiesUi = {
  en: {
    badge:            'The 16-Week Program',
    ctaPrimary:       'Book Your Consultation',
    ctaSecondary:     'See The Program',
    contextEyebrow:   'Serving This Community',
    loopEyebrow:      'The Methodology',
    loopHeading:      'The Loop runs in every session.',
    loopBody:         'Most English programs drill one skill in isolation. DODO trains the full cognitive sequence — because thinking in a language and performing in a language are not the same thing.',
    loopCta:          'Read the full methodology →',
    structureEyebrow: 'Program Structure',
    structureHeading: 'A beginning, a midpoint, and a measured end.',
    structureBody:    'The 16-Week Program is a commitment — not a subscription. It has a defined arc with three anchor points.',
    charterEyebrow:   'Diagnostic Consultation',
    charterHeading:   'Find out exactly where your child stands.',
    charterBody:      'The consultation is 20 minutes. A Navigator — not a sales call. We measure your child\'s Lexile level and show you what The 16-Week Program looks like for a student exactly like yours.',
    charterCta:       'Book Your Consultation',
    charterNote:      'Free diagnostic assessment included. No obligation.',
  },
  zh: {
    badge:            '16周课程',
    ctaPrimary:       '预约咨询',
    ctaSecondary:     '了解课程',
    contextEyebrow:   '服务本地社区',
    loopEyebrow:      '教学方法',
    loopHeading:      'The Loop（学习循环）贯穿每一节课。',
    loopBody:         '大多数英语项目单独训练某一技能。DODO训练完整的认知序列——因为用一种语言思考和用一种语言表现并不是同一件事。',
    loopCta:          '阅读完整方法论 →',
    structureEyebrow: '课程结构',
    structureHeading: '有开始，有中点，有量化的结局。',
    structureBody:    '16周课程是一项承诺，而非订阅。它有明确的轨迹，包含三个关键节点。',
    charterEyebrow:   '诊断咨询',
    charterHeading:   '了解您的孩子目前真正的水平。',
    charterBody:      '咨询仅需20分钟。接待您的是导师（Navigator），不是销售。我们测量您孩子的Lexile水平，并展示16周课程对于和您孩子情况一样的学生意味着什么。',
    charterCta:       '预约咨询',
    charterNote:      '包含免费诊断评估。无需承诺。',
  },
}
