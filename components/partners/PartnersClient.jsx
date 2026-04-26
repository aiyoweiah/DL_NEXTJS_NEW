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

import { useState, useEffect } from 'react'

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
        { num: '90%+',    label: 'Arrive through genuine referrals' },
      ],
    },

    s2: {
      eyebrow: 'Programs',
      h2:      'Three programs. Each scoped to the demands your clients actually face.',
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
      chip:        "Let\u2019s Talk",
      h2:          'We work with a small number of partners.',
      sub:         'DODO Learning does not have a sales team. Partnership conversations begin the same way student consultations do: with an honest diagnostic conversation about fit.\n\nIf you serve students who need what we build, we\u2019d like to talk.',
      formHeading: 'Submit a Partner Inquiry',
      fields: {
        name:        'Full name',
        agency:      'Agency / Organization name',
        website:     'Agency website',
        region:      'Country / Region of operation',
        profile:     'Primary student profile (2\u20133 sentences)',
        programs:    'Program interest',
        referral:    'How you heard about DODO Learning (optional)',
        submit:      'Send Inquiry',
        confirm:     'Thank you. A member of the DODO Learning team will be in touch within 3 business days.',
      },
      programOptions: [
        'College Readiness Preparation',
        'Professional Writing Development',
        'GPA Navigation',
        'Not sure yet',
      ],
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
      h1a:  'For the agencies who build futures.',
      h1b:  '\u00a0We handle the part that',
      h1c:  '\u00a0makes everything else possible.',
      sub:  'Your clients come to you with an outcome in mind \u2014 the right school, the right program, the competitive edge. What stands between most students and that outcome isn\u2019t strategy. It\u2019s the literacy gap.\n\nDODO Learning closes that gap.',
      stats: [
        { num: '10,000+', label: '\u6388\u8bfe\u603b\u65f6\u6570'          },
        { num: '300+',    label: '\u5df2\u670d\u52a1\u5b66\u751f'          },
        { num: '90%+',    label: '\u901a\u8fc7\u53e3\u7891\u8f6c\u4ecb\u800c\u6765' },
      ],
    },

    s2: {
      eyebrow: '\u8bfe\u7a0b\u914d\u7f6e',
      h2:      'Three programs. Each scoped to the demands your clients actually face.',
      sub:     'Partner-referred students have access to program configurations not available to the general public.',
      programs: [
        {
          grade:       'Grade 9\u201312',
          title:       'College Readiness Preparation',
          body:        'The students your agencies work with face a specific challenge: they may be academically capable, but their writing hasn\u2019t yet reached the register that competitive college admissions requires.\n\nCollege Readiness Preparation is a focused 16-week program for students in Grades 9\u201312.',
          suitability: 'Suitable for: Grade 9\u201312 students preparing for North American or international college applications.',
          accent:      '#b7b5fe',
        },
        {
          grade:       'Grade 10\u201312',
          title:       'Professional Writing Development',
          body:        'Academic writing at the college level is a fundamentally different mode of thinking on paper.\n\nProfessional Writing Development is designed for students in Grades 10\u201312 preparing for IB Extended Essays, college application personal statements, and university entrance writing assessments.',
          suitability: 'Suitable for: Grade 10\u201312 students with IB, AP, or pre-university writing demands.',
          accent:      '#F5C842',
        },
        {
          grade:       '\u5404\u5e74\u7ea7',
          title:       'GPA Navigation',
          body:        'When a student\u2019s GPA is under pressure \u2014 from course difficulty, a difficult transition, or a gap in foundational skills \u2014 the entire consulting engagement is at risk.\n\nGPA Navigation provides targeted, Navigator-led academic support designed to stabilize and strengthen a student\u2019s performance.',
          suitability: 'Suitable for: Students at any grade level experiencing academic performance pressure.',
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
          headline: 'A Navigator who is actively in the lecture hall.',
          body:     'Every DODO Learning student works with a dedicated Navigator \u2014 one person, for the full program. Our Navigators are working educators: active faculty with current experience in post-secondary academic writing, literary analysis, and analytical composition.\n\nThey know what universities and selective institutions are demanding of students right now \u2014 because they are in those lecture halls.',
          color:    '#b7b5fe',
        },
        {
          label:    'Gifted Program Navigation',
          headline: 'Built for the standard selective programs actually use.',
          body:     'DODO Learning\u2019s curriculum is grounded in the Michael Clay Thompson Language Arts framework \u2014 one of the most widely used ELA curricula across North America\u2019s gifted and honors programs.\n\nStudents arrive at university entrance assessments, IB coursework, and AP seminars having already worked at that register.',
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
      chip:        '\u7acb\u5373\u6c9f\u901a',
      h2:          '\u6211\u4eec\u4e0e\u5c11\u6570\u4f18\u8d28\u4f19\u4f34\u5408\u4f5c\u3002',
      sub:         'DODO Learning\u6ca1\u6709\u9500\u552e\u56e2\u961f\u3002\u5408\u4f5c\u6d3d\u8be2\u4e0e\u5b66\u751f\u8bc4\u4f30\u7684\u5f00\u59cb\u65b9\u5f0f\u76f8\u540c\uff1a\u4e00\u6b21\u5bf9\u5408\u9002\u6027\u7684\u8bda\u5b9e\u8bc4\u4f30\u3002\n\n\u5982\u679c\u60a8\u670d\u52a1\u7684\u5b66\u751f\u9700\u8981\u6211\u4eec\u6240\u6784\u5efa\u7684\u80fd\u529b\uff0c\u6211\u4eec\u671f\u5f85\u4e0e\u60a8\u6c9f\u901a\u3002',
      formHeading: '\u63d0\u4ea4\u5408\u4f5c\u6d3d\u8be2',
      fields: {
        name:        '\u59d3\u540d',
        agency:      '\u673a\u6784\u540d\u79f0',
        website:     '\u673a\u6784\u7f51\u7ad9',
        region:      '\u6240\u5728\u56fd\u5bb6\uff0f\u5730\u533a',
        profile:     '\u4e3b\u8981\u5b66\u751f\u7fa4\u4f53\u63cf\u8ff0\uff082\u20133\u53e5\uff09',
        programs:    '\u611f\u5174\u8da3\u7684\u8bfe\u7a0b',
        referral:    '\u5982\u4f55\u4e86\u89e3DODO Learning\uff08\u9009\u586b\uff09',
        submit:      '\u53d1\u9001\u6d3d\u8be2',
        confirm:     '\u611f\u8c22\u3002DODO Learning\u56e2\u961f\u5c06\u57283\u4e2a\u5de5\u4f5c\u65e5\u5185\u4e0e\u60a8\u8054\u7cfb\u3002',
      },
      programOptions: [
        'College Readiness Preparation',
        'Professional Writing Development',
        'GPA Navigation',
        '\u6682\u4e0d\u786e\u5b9a',
      ],
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

// ── Partner Inquiry Form ──────────────────────────────────────
function PartnerInquiryForm({ fields, programOptions, locale }) {
  const f = font(locale)
  const [name,     setName]     = useState('')
  const [agency,   setAgency]   = useState('')
  const [website,  setWebsite]  = useState('')
  const [region,   setRegion]   = useState('')
  const [profile,  setProfile]  = useState('')
  const [programs, setPrograms] = useState([])
  const [referral, setReferral] = useState('')
  const [sent,     setSent]     = useState(false)

  const toggleProgram = (p) =>
    setPrograms((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p])

  const handleSubmit = () => {
    const body = [
      `Full Name: ${name}`,
      `Agency: ${agency}`,
      `Website: ${website}`,
      `Region: ${region}`,
      `Student Profile: ${profile}`,
      `Program Interest: ${programs.join(', ') || 'Not specified'}`,
      `How you heard: ${referral || 'Not specified'}`,
    ].join('\n\n')

    window.location.href =
      `mailto:janet@dodolearning.com?subject=${encodeURIComponent('Partner Inquiry \u2014 DODO Learning')}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const inputStyle = {
    display:         'block',
    width:           '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border:          '1px solid rgba(183,181,254,0.2)',
    borderRadius:    '10px',
    padding:         '13px 16px',
    fontSize:        '15px',
    fontWeight:      400,
    color:           '#F0F0F0',
    fontFamily:      f,
    boxSizing:       'border-box',
    outline:         'none',
    transition:      'border-color 0.2s, box-shadow 0.2s',
  }

  const labelStyle = {
    display:       'block',
    fontSize:      '12px',
    fontWeight:    500,
    color:         'rgba(240,240,240,0.45)',
    marginBottom:  '8px',
    letterSpacing: '0.05em',
    fontFamily:    f,
  }

  if (sent) {
    return (
      <div style={{
        backgroundColor: 'rgba(183,181,254,0.08)',
        border:          '1px solid rgba(183,181,254,0.2)',
        borderRadius:    '16px',
        padding:         '56px 40px',
        textAlign:       'center',
      }}>
        <div style={{ fontSize: '32px', marginBottom: '16px', color: '#b7b5fe' }}>✓</div>
        <p style={{ fontSize: '17px', fontWeight: 500, color: '#F0F0F0', lineHeight: 1.6, fontFamily: f }}>
          {fields.confirm}
        </p>
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: '#161820',
      border:          '1px solid rgba(183,181,254,0.12)',
      borderRadius:    '20px',
      padding:         '40px',
    }}>
      <style>{`
        .partner-input:focus { border-color: rgba(183,181,254,0.5) !important; box-shadow: 0 0 0 3px rgba(183,181,254,0.1); }
        .prog-btn:hover { border-color: rgba(183,181,254,0.5) !important; }
        .form-submit:hover { background-color: #c8c6ff; }
        .form-submit:active { transform: scale(0.98); }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '24px' }}>
        <div>
          <label style={labelStyle}>{fields.name}</label>
          <input className="partner-input" type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{fields.agency}</label>
          <input className="partner-input" type="text" value={agency} onChange={(e) => setAgency(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{fields.website}</label>
          <input className="partner-input" type="url" value={website} onChange={(e) => setWebsite(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{fields.region}</label>
          <input className="partner-input" type="text" value={region} onChange={(e) => setRegion(e.target.value)} style={inputStyle} />
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={labelStyle}>{fields.profile}</label>
        <textarea
          className="partner-input"
          rows={3}
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={labelStyle}>{fields.programs}</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {programOptions.map((p) => {
            const checked = programs.includes(p)
            return (
              <button
                key={p}
                className="prog-btn"
                onClick={() => toggleProgram(p)}
                style={{
                  fontFamily:      f,
                  fontSize:        '13px',
                  fontWeight:      500,
                  color:           checked ? '#0E0E12' : 'rgba(240,240,240,0.7)',
                  backgroundColor: checked ? '#b7b5fe' : 'transparent',
                  border:          `1px solid ${checked ? '#b7b5fe' : 'rgba(183,181,254,0.25)'}`,
                  borderRadius:    '8px',
                  padding:         '8px 16px',
                  cursor:          'pointer',
                  transition:      'all 0.15s',
                }}
              >
                {p}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <label style={labelStyle}>{fields.referral}</label>
        <input className="partner-input" type="text" value={referral} onChange={(e) => setReferral(e.target.value)} style={inputStyle} />
      </div>

      <button
        className="form-submit"
        onClick={handleSubmit}
        style={{
          display:         'block',
          width:           '100%',
          backgroundColor: '#b7b5fe',
          color:           '#0E0E12',
          fontSize:        '16px',
          fontWeight:      600,
          fontFamily:      f,
          padding:         '16px 24px',
          borderRadius:    '12px',
          border:          'none',
          cursor:          'pointer',
          transition:      'background-color 0.15s, transform 0.1s',
        }}
      >
        {fields.submit}
      </button>
    </div>
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

          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b7b5fe', marginBottom: '20px', fontFamily: 'var(--font-latin)' }}>
            {c.s6.formHeading}
          </div>

          <PartnerInquiryForm
            fields={c.s6.fields}
            programOptions={c.s6.programOptions}
            locale={locale}
          />

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