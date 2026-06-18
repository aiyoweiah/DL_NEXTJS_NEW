'use client'

// components/ops/AgreementTool.jsx
// DODO Learning — Teacher Service Agreement PDF Generator  v1.4.1-ops
//
// v1.4.1 — page layout rebalanced after the v1.4 legal pass made
// pages 2 and 3 too dense:
//   * Page 2 now: Preamble + Schedule A + Sections 1, 2, 3
//     (Section 4 moved off to page 3)
//   * Page 3 now: Sections 4, 5, 6, 7, 8
//     (Section 9 moved off to page 4)
//   * Page 4 now: Section 9 + Section 10 + Notes + signatures
//     (Section 9 added at the top; extra vertical room kept before
//     Notes so handwritten or typed notes don't crowd the page)
//
// v1.4 — legal-writing pass across the full contract. Every clause
// rewritten to use canonical legal phrasing while preserving the
// plain-English voice. Highlights:
//   * Preamble: "as of" -> "with effect from"
//   * Section 1: added no-employment/partnership/JV/agency disclaimer
//   * Sections 2-3: tightened obligations ("with care" -> "professional
//     competence and diligence"; specified personal-contact carve-outs;
//     "for hours actually taught"; "remain logged in and available")
//   * Section 4: "represent and warrant" + "indemnify and hold harmless"
//     + "perpetual, royalty-free" license language
//   * Section 5: "in recognition of" softer phrasing; "material breach"
//     + "including but not limited to"
//   * Section 6: added "worldwide, non-exclusive" + carve-out for
//     uses commenced before withdrawal
//   * Section 7: added child abuse + child pornography to offense list;
//     "represent and warrant"; added ongoing duty to disclose (3rd bullet)
//   * Section 8: "directly or indirectly" + "through third parties"
//     closes the friend-as-proxy loophole
//   * Section 9: added three standard provisions — Governing Law,
//     Assignment, Survival. Now 5 bullets total.
//   * Section 10: added "had the opportunity to obtain independent
//     legal advice"
//
// v1.3 — restore Immediate Termination clause + full "the Company"
// sweep across contract text:
//   * Section 5 gains a 4th bullet: "Immediate Termination for Breach"
//     — DODO Learning may end the agreement immediately for serious
//     breaches including Code of Conduct violations (no notice or
//     further pay). Tighter than the v1.1 wording.
//   * "the Company" replaced with "DODO Learning" everywhere in the
//     contract body (Section 5 bullet 2 was the only remaining usage
//     after v1.2). Preamble parenthetical (the "Company") dropped
//     since the shorthand isn't used elsewhere.
//   * Page 4 signature block headings simplified: "DODO Learning"
//     (was 'DODO Learning (the "Company")') and "The Teacher" (was
//     'The Teacher (the "Contractor")') — symmetric, no parentheticals.
//   * Operator UI labels switched too: "Company Signatory & Dates"
//     -> "DODO Learning Signatory & Dates", etc.
//
// v1.2 — contract language updates:
//   * Body text uses "DODO Learning" everywhere (was "DODO" in some
//     sections — sections 2, 4, 6, 8). Brand-identity instances
//     (logo alt, header strip, form labels) unchanged.
//   * Section 5 (Termination & Schedule Changes) rewritten per spec:
//     - Commitment to Term Duration: company can withhold last pay
//       period if teacher departs early
//     - Extraordinary Notice (21+ days): individual arrangement on
//       the day notice is submitted
//     - Insufficient Notice (under 21 days): no final-period pay
//     The prior Immediate-Termination-for-breach clause was removed
//     by this rewrite. Breaches of Sections 4 (IP), 7 (Safety), 8
//     (Non-Solicitation) and the Code of Conduct still empower the
//     Company under those sections' own terms.
//
// Same html2canvas + jsPDF recipe as the other ops tools:
//   - hidden 794x1123 page divs are rasterized at scale 2
//   - each canvas is placed on an A4 page via pdf.addImage
//
// Page layout (4 pages):
//   1. Welcome letter with cursive signature
//   2. Preamble + Schedule A table + Schedule B sections 1–4
//   3. Schedule B sections 5–9
//   4. Section 10 Execution + Company/Teacher signature blocks + Notes
//
// AcroForm fillable fields are overlaid on page 4 for Teacher
// Signature / Print Name / Date / GST# — Print Name and GST# are
// pre-filled from form data when known.
//
// Brand fonts: DM Sans + Noto Sans SC (matches lib/fonts.js).
// Cursive signature font: Dancing Script (loaded from Google Fonts).

import { useState, useEffect, useMemo, memo } from 'react'
import { jsPDF, AcroFormTextField } from 'jspdf'
import html2canvas from 'html2canvas'
import { LOGO_B64 } from '@/components/ops/opsAssets'

// ─── BRAND ─────────────────────────────────────────────────────────────
const B = {
  cream:     '#F5F5FF',
  white:     '#FFFFFF',
  ink:       '#212830',
  voidBlack: '#0E0E12',
  muted:     '#5E6879',
  border:    '#DCDCF5',
  borderInk: 'rgba(46,56,72,0.55)',
  platinum:  '#F0F0F0',
  gilt:      '#F5C842',
  giltSoft:  '#FBF1D2',
  headerBar: '#ECECF3',
  lavender:  '#B7B5FE',
}

const D = {
  card:   '#FFFFFF',
  border: '#DCDCF5',
  text:   '#212830',
  muted:  '#5E6879',
  accent: '#F5C842',
  bgPage: '#F5F5FF',
}

const F        = 'var(--font-latin), var(--font-cjk), sans-serif'
const CURSIVE  = '"Dancing Script", "Apple Chancery", cursive'
const PW       = 794
const PH       = 1123
const PAD      = 56

// ─── DEFAULT COPY ───────────────────────────────────────────────────────
const DEFAULT_PAY_INTERVAL = 'Payments are processed on the 15th of every month'
const DEFAULT_SCOPE        = 'N/A'

// ─── FORM STYLES (module-scope so Field can live outside the component) ─
const INP_STYLE = {
  width: '100%', padding: '8px 10px', border: `1.5px solid ${D.border}`,
  borderRadius: 6, fontSize: 14, fontFamily: 'inherit', background: D.card,
  color: D.text, outline: 'none', boxSizing: 'border-box',
}
const LBL_STYLE = {
  fontSize: 10, letterSpacing: 1, textTransform: 'uppercase',
  color: D.muted, fontWeight: 700, marginBottom: 4, display: 'block',
}

// Field lives at module scope (not inside AgreementTool) so React keeps a
// stable component identity across re-renders. Otherwise every keystroke
// would remount the underlying <input>, which is what causes typing lag.
const Field = memo(function Field({ label, type = 'text', placeholder, span = 1, value, onChange }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gridColumn: `span ${span}` }}>
      <span style={LBL_STYLE}>{label}</span>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={INP_STYLE} />
    </label>
  )
})

// ─── SHARED CHROME ──────────────────────────────────────────────────────
function PDFHeader() {
  return (
    <div style={{
      background: B.headerBar,
      padding: '22px 36px 22px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      height: 110,
      boxSizing: 'border-box',
    }}>
      {/* Logo + DODO LANGUAGE label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <img src={LOGO_B64} alt="DODO" style={{ height: 52, width: 'auto' }} />
        <div style={{
          fontSize: 7.5, letterSpacing: 1.2, color: B.ink,
          lineHeight: 1.15, fontFamily: F, fontWeight: 700,
        }}>
          DODO<br />LANGUAGE
        </div>
      </div>

      {/* Gilt accent bar */}
      <div style={{
        width: 12, alignSelf: 'stretch', background: B.gilt,
        marginLeft: 22, marginRight: 24, borderRadius: 2,
      }} />

      {/* Title block */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 10, letterSpacing: 4, color: B.ink,
          fontFamily: F, fontWeight: 600, marginBottom: 6,
        }}>
          DODO LEARNING
        </div>
        <div style={{
          fontSize: 26, color: B.gilt, fontFamily: F, fontWeight: 700,
          letterSpacing: 0.3, lineHeight: 1.05, whiteSpace: 'nowrap',
        }}>
          Teacher Service Agreement
        </div>
      </div>
    </div>
  )
}

function Watermark() {
  return (
    <div style={{
      position: 'absolute',
      left: '50%', top: '52%',
      transform: 'translate(-50%, -50%)',
      opacity: 0.045,
      pointerEvents: 'none',
      userSelect: 'none',
    }}>
      <img src={LOGO_B64} alt="" style={{ width: 360, height: 'auto' }} />
    </div>
  )
}

// Cursive signature rendering — used wherever a "signed" name should appear
function CursiveSig({ name, size = 32 }) {
  return (
    <span style={{
      fontFamily: CURSIVE,
      fontSize: size,
      fontWeight: 600,
      color: B.ink,
      lineHeight: 1,
      letterSpacing: 0.3,
      whiteSpace: 'nowrap',
    }}>
      {name}
    </span>
  )
}

// ─── PAGE 1: WELCOME LETTER ─────────────────────────────────────────────
function PDFPage1Impl({ info }) {
  const firstName  = (info.teacherFirstName || '').trim() || 'Teacher'
  const signatory  = (info.signatoryName    || '').trim() || ''
  return (
    <div id="pdf-tsa-p1" style={{
      width: PW, height: PH, background: B.cream, fontFamily: F,
      color: B.ink, boxSizing: 'border-box', overflow: 'hidden',
      position: 'relative',
    }}>
      <PDFHeader />
      <Watermark />
      <div style={{ position: 'relative', padding: `100px ${PAD}px 0`, zIndex: 1 }}>
        <div style={{ fontSize: 13, color: B.ink, marginBottom: 18 }}>
          Dear {firstName},
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: B.ink, margin: '0 0 14px' }}>
          We are absolutely delighted to officially welcome you to <strong>DODO Learning</strong>!
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: B.ink, margin: '0 0 14px', textAlign: 'justify' }}>
          After our recent discussions, we are confident that your expertise and passion for education will be a wonderful addition to our team. At DODO Learning, we believe that every lesson is an opportunity to inspire, and we are thrilled to have you join us in creating a nurturing and dynamic environment for our students.
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: B.ink, margin: '0 0 14px', textAlign: 'justify' }}>
          As an independent contractor, you are joining a community of dedicated professionals who value artistic excellence and student-centered growth. We are here to support you as you settle in and prepare for your upcoming sessions on ClassIN.
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: B.ink, margin: '0 0 14px', textAlign: 'justify' }}>
          Attached, you will find your <strong>Teacher Service Agreement</strong>. Please review the details, including our technical requirements and protocols. Once you have had a chance to look it over, please sign and return a copy to us.
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: B.ink, margin: '0 0 14px', textAlign: 'justify' }}>
          We are so excited to see the incredible impact you will have on our students and our community. Welcome aboard — let&rsquo;s make this an amazing journey together!
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: B.ink, margin: '0 0 8px' }}>
          Warmest regards,
        </p>

        {/* Signature — right-aligned, sits below "Warmest regards" in the letter flow */}
        <div style={{ paddingRight: 24, textAlign: 'right', marginTop: 20 }}>
          {signatory ? <CursiveSig name={signatory} size={38} /> : null}
        </div>
      </div>
    </div>
  )
}

// ─── SECTION HELPERS (shared by pages 2 + 3) ────────────────────────────
function Section({ n, title, items, dense = false }) {
  const gap = dense ? 1 : 3
  return (
    <div style={{ marginTop: 6, marginBottom: 6 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: B.ink, marginBottom: 3 }}>
        {n}. {title}
      </div>
      <ul style={{
        margin: 0, padding: 0, listStyle: 'none',
      }}>
        {items.map(([label, body]) => (
          <li key={label} style={{
            position: 'relative',
            paddingLeft: 16,
            fontSize: 11, lineHeight: 1.55, color: B.ink,
            marginBottom: gap,
          }}>
            <span style={{
              position: 'absolute', left: 4, top: 0,
              color: B.ink, fontWeight: 700,
            }}>·</span>
            <strong>{label}.</strong> {body}
          </li>
        ))}
      </ul>
    </div>
  )
}

const PDFPage1 = memo(PDFPage1Impl, (a, b) =>
  a.info.teacherFirstName === b.info.teacherFirstName &&
  a.info.signatoryName    === b.info.signatoryName
)

// ─── PAGE 2: PREAMBLE + SCHEDULE A + SCHEDULE B (1–4) ───────────────────
function PDFPage2Impl({ info }) {
  return (
    <div id="pdf-tsa-p2" style={{
      width: PW, height: PH, background: B.cream, fontFamily: F,
      color: B.ink, boxSizing: 'border-box', overflow: 'hidden',
      position: 'relative',
    }}>
      <PDFHeader />
      <Watermark />
      <div style={{ position: 'relative', padding: `26px ${PAD}px 26px`, zIndex: 1 }}>

        {/* Preamble */}
        <div style={{ fontSize: 12, lineHeight: 1.7, color: B.ink, marginBottom: 18 }}>
          This Agreement is made between DODO Learning and{' '}
          <span style={{ fontWeight: 600, color: B.ink }}>{info.teacherFullName || '________________'}</span>
          {' '}(the &ldquo;Teacher&rdquo;) with effect from{' '}
          <span style={{ fontWeight: 600, color: B.ink }}>{info.effectiveDate || '____________'}</span>.
        </div>

        {/* Schedule A: Service Scope — clean two-column layout, no underlines */}
        <div style={{ fontSize: 13, fontWeight: 700, color: B.ink, marginBottom: 8 }}>
          Schedule A: Service Scope
        </div>
        <div style={{
          border: `1px solid ${B.borderInk}`,
          borderRadius: 4,
          overflow: 'hidden',
          marginBottom: 18,
        }}>
          {[
            ['Subject Taught',                  info.subjectTaught],
            ['Scope of Lesson Development',     info.scope || DEFAULT_SCOPE],
            ['Term Duration (Weeks)',           info.termWeeks ? String(info.termWeeks) : ''],
            ['Pay Interval',                    info.payInterval || DEFAULT_PAY_INTERVAL],
            ['Payment Email Address',           info.paymentEmail],
            ['Professional Fee per Hour (CAD)', info.hourlyFee ? `$${info.hourlyFee}` : ''],
          ].map(([label, value], i, arr) => (
            <div key={label} style={{
              display: 'grid',
              gridTemplateColumns: '42% 58%',
              borderBottom: i < arr.length - 1 ? `1px solid ${B.borderInk}` : 'none',
              background: B.giltSoft,
            }}>
              <div style={{
                padding: '8px 14px',
                fontSize: 11.5,
                fontWeight: 700,
                color: B.ink,
                borderRight: `1px solid ${B.borderInk}`,
              }}>
                {label}
              </div>
              <div style={{
                padding: '8px 14px',
                fontSize: 11.5,
                color: B.ink,
              }}>
                {value || ' '}
              </div>
            </div>
          ))}
        </div>

        {/* Schedule B: Collaboration Agreement */}
        <div style={{ fontSize: 13, fontWeight: 700, color: B.ink, marginBottom: 4 }}>
          Schedule B: Collaboration Agreement
        </div>

        <Section n={1} title="Relationship of Parties" items={[
          ['Independent contractor', 'You are engaged as an independent contractor under the laws of the Province of Ontario. Nothing in this Agreement creates an employment, partnership, joint venture, or agency relationship between you and DODO Learning.'],
          ['You control your methods', 'You retain control over the teaching methods, materials, and pacing used to meet course objectives. DODO Learning may provide curriculum guidelines and standards.'],
          ['You handle your own taxes', 'You are responsible for filing and paying your own federal and provincial income tax, CPP, and any applicable GST/HST.'],
          ['You provide your own setup', 'A reliable computer, high-speed Internet connection, and a quiet, professional remote workspace are your responsibility.'],
        ]} />

        <Section n={2} title="Service Delivery & Professionalism" items={[
          ['Quality teaching', 'You will deliver each lesson with professional competence and diligence, prepare adequately, and maintain a welcoming and inclusive classroom environment.'],
          ['Punctuality', 'You will log in at least 5 minutes before each scheduled session to verify your setup and resolve any technical issues.'],
          ['Communication channels', 'All communication with students and their families must occur exclusively through ClassIN or the DODO Learning platform. You may not share personal contact information (phone numbers, email addresses, social-media handles, or messaging IDs) with students or families.'],
        ]} />

        <Section n={3} title="Compensation" items={[
          ['Hourly rate', 'You will be compensated at the hourly rate set out in Schedule A, for hours actually taught.'],
          ['Invoicing', 'Payment is made following submission of a teaching log or invoice, in accordance with the Pay Interval set out in Schedule A.'],
          ['Teacher no-show', 'If you fail to attend a scheduled class without providing at least 48 hours’ written notice, that session will not be compensated, and a service-disruption fee of $50 CAD may be deducted from your next pay period.'],
          ['Student no-show', 'If a student fails to attend a scheduled class without prior notice, you must remain logged in and available for at least 15 minutes from the scheduled start time. After 15 minutes, you may end the session and will receive 50% of the standard session fee.'],
        ]} />

      </div>
    </div>
  )
}

const PDFPage2 = memo(PDFPage2Impl, (a, b) =>
  a.info.teacherFullName === b.info.teacherFullName &&
  a.info.effectiveDate   === b.info.effectiveDate   &&
  a.info.subjectTaught   === b.info.subjectTaught   &&
  a.info.scope           === b.info.scope           &&
  a.info.termWeeks       === b.info.termWeeks       &&
  a.info.payInterval     === b.info.payInterval     &&
  a.info.paymentEmail    === b.info.paymentEmail    &&
  a.info.hourlyFee       === b.info.hourlyFee
)

// ─── PAGE 3: SCHEDULE B (5–9) ──────────────────────────────────────────
function PDFPage3Impl({ info }) {
  return (
    <div id="pdf-tsa-p3" style={{
      width: PW, height: PH, background: B.cream, fontFamily: F,
      color: B.ink, boxSizing: 'border-box', overflow: 'hidden',
      position: 'relative',
    }}>
      <PDFHeader />
      <Watermark />
      <div style={{ position: 'relative', padding: `26px ${PAD}px 26px`, zIndex: 1 }}>

        <Section n={4} title="Confidentiality & Intellectual Property" items={[
          ['DODO Learning materials', 'All curriculum materials, lesson plans, assessments, and proprietary content provided by DODO Learning remain the exclusive property of DODO Learning. Materials you create in the course of teaching DODO Learning classes are licensed to DODO Learning on a perpetual, royalty-free basis for ongoing instructional use.'],
          ['Third-party content', 'You represent and warrant that you hold all necessary rights to any third-party material you incorporate into your teaching. You agree to indemnify and hold DODO Learning harmless from any third-party intellectual-property claim arising from your use of such material.'],
          ['Student data privacy', 'You will handle all student personal information in strict compliance with Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA), which governs private-sector personal data in Ontario. You may not collect, store, or share student data beyond what is necessary for DODO Learning instructional purposes.'],
        ]} />

        <Section n={5} title="Termination & Schedule Changes" items={[
          ['Commitment to Term Duration', 'You agree to complete teaching for the full Term Duration set out in Schedule A. If you depart before the term is complete, DODO Learning reserves the right to withhold the final pay period’s compensation in recognition of the disruption to enrolled students.'],
          ['Extraordinary Notice (21 days or more)', 'DODO Learning recognizes that personal circumstances may change. If you provide written notice no less than 21 days in advance of your intended departure date, DODO Learning will negotiate the final pay arrangement with you on an individual basis, with terms agreed in writing on the date your notice is submitted.'],
          ['Insufficient Notice (under 21 days)', 'A resignation submitted with less than 21 days’ written notice will be treated as a resignation without notice. In such cases, no compensation will be owed for the final pay period.'],
          ['Immediate Termination for Breach', 'DODO Learning may terminate this Agreement immediately, without notice and without further compensation, for material breach by the Teacher, including but not limited to violations of the DODO Learning Code of Conduct.'],
        ]} />

        <Section n={6} title="Marketing & Media Consent" items={[
          ['License grant', 'You grant DODO Learning a worldwide, non-exclusive, royalty-free license to use your name, likeness, image, and voice (including audio and video from recorded sessions) for marketing and promotional purposes.'],
          ['Right to withdraw', 'You may withdraw this consent at any time by written notice. Withdrawal does not affect uses commenced before DODO Learning received your written notice.'],
          ['Effect of withdrawal', 'Upon receipt of written withdrawal, DODO Learning will cease using your name, image, and voice in new marketing within 7 business days. You acknowledge that content already published, shared, or printed prior to the withdrawal may not be fully retractable.'],
        ]} />

        <Section n={7} title="Safety & Background Representations" items={[
          ['Criminal record', 'You represent and warrant that you have never been convicted of, and are not currently charged with, any offense involving sexual interference, sexual exploitation, child abuse, child pornography, or any other offense involving the safety or welfare of minors.'],
          ['Registry status', 'You represent and warrant that you are not currently listed on any sex offender or child-abuse registry in Canada (federal, provincial, or territorial) or in your country of primary residence or citizenship.'],
          ['Ongoing duty to disclose', 'You agree to notify DODO Learning in writing immediately if your status under either of the above representations changes during the term of this Agreement.'],
        ]} />

        <Section n={8} title="Non-Solicitation of Students" items={[
          ['During and after the term', 'During the term of this Agreement and for 12 months following its end, you agree not to directly or indirectly solicit any DODO Learning student or their family for private tutoring services, competing educational services, or referrals to other providers. This restriction includes direct outreach, social-media contact, and any form of solicitation through third parties.'],
          ['Unsolicited contact', 'This restriction does not prevent you from accepting an unsolicited inquiry that originates independently from a former DODO Learning student or family. If such an inquiry occurs, you agree to notify DODO Learning in writing within 30 days.'],
        ]} />

      </div>
    </div>
  )
}

// Page 3 has no dynamic content — render once and never again.
const PDFPage3 = memo(PDFPage3Impl, () => true)

// ─── PAGE 4: EXECUTION + SIGNATURES + NOTES ─────────────────────────────
function PDFPage4Impl({ info }) {
  const signatory = (info.signatoryName || '').trim()
  return (
    <div id="pdf-tsa-p4" style={{
      width: PW, height: PH, background: B.cream, fontFamily: F,
      color: B.ink, boxSizing: 'border-box', overflow: 'hidden',
      position: 'relative',
    }}>
      <PDFHeader />
      <Watermark />
      <div style={{ position: 'relative', padding: `26px ${PAD}px 26px`, zIndex: 1 }}>

        <Section n={9} title="General Provisions" items={[
          ['Severability', 'If any provision of this Agreement is held to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions will continue in full force and effect.'],
          ['Entire agreement', 'This Agreement constitutes the entire agreement between DODO Learning and the Teacher with respect to its subject matter, and supersedes all prior conversations, correspondence, drafts, and representations. Any amendment must be made in writing and signed by both parties.'],
          ['Governing law', 'This Agreement is governed by the laws of the Province of Ontario and the applicable laws of Canada. Any disputes arising under this Agreement will be resolved in the courts of Ontario.'],
          ['Assignment', 'The Teacher may not assign or transfer this Agreement, in whole or in part, without DODO Learning’s prior written consent.'],
          ['Survival', 'Sections 4 (Confidentiality & Intellectual Property), 7 (Safety & Background Representations), and 8 (Non-Solicitation of Students) survive termination of this Agreement.'],
        ]} />

        {/* Section 10: Execution */}
        <div style={{ fontSize: 12, fontWeight: 700, color: B.ink, marginTop: 14, marginBottom: 6 }}>
          10. Execution and Acceptance
        </div>
        <p style={{ fontSize: 11.5, lineHeight: 1.6, color: B.ink, margin: '0 0 18px' }}>
          By signing below, each party confirms they have read this Agreement, had the opportunity to obtain independent legal advice, understood its terms, and accepted them as of the Effective Date.
        </p>

        {/* Notes section — sits above the signature block */}
        {info.notes && info.notes.trim() ? (
          <div style={{ marginTop: 4, marginBottom: 24 }}>
            <div style={{
              fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
              color: B.muted, fontWeight: 700, marginBottom: 6,
            }}>
              Notes
            </div>
            <div style={{
              background: B.white,
              border: `1px solid ${B.border}`,
              borderRadius: 6,
              padding: '12px 14px',
              fontSize: 11,
              lineHeight: 1.6,
              color: B.ink,
              whiteSpace: 'pre-wrap',
            }}>
              {info.notes}
            </div>
          </div>
        ) : null}

        {/* Two-column signature block */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
          marginTop: 8,
        }}>
          {/* DODO Learning column */}
          <SigColumn
            heading={'DODO Learning'}
            sigContent={signatory ? <CursiveSig name={signatory} size={24} /> : null}
            printName={signatory}
            date={info.directorDate}
          />

          {/* Teacher column */}
          <SigColumn
            heading={'The Teacher'}
            sigFieldId="tsa-field-sig"
            printNameFieldId="tsa-field-name"
            dateFieldId="tsa-field-date"
            gstFieldId="tsa-field-gst"
          />
        </div>
      </div>
    </div>
  )
}

// teacherFullName / teacherGST aren't rendered into the page 4 HTML — they
// only feed AcroForm field values at generate time. So they don't need to
// be in the comparator.
const PDFPage4 = memo(PDFPage4Impl, (a, b) =>
  a.info.signatoryName === b.info.signatoryName &&
  a.info.directorDate  === b.info.directorDate  &&
  a.info.notes         === b.info.notes
)

function SigColumn({ heading, sigContent, printName, date, sigFieldId, printNameFieldId, dateFieldId, gstFieldId }) {
  return (
    <div>
      <div style={{ fontStyle: 'italic', fontSize: 12, color: B.ink, marginBottom: 14 }}>
        {heading}
      </div>
      <SigRow label="Signature"  content={sigContent} fieldId={sigFieldId} tall />
      <SigRow label="Print Name" content={printName ? <span style={{ fontSize: 12 }}>{printName}</span> : null} fieldId={printNameFieldId} />
      <SigRow label="Date"       content={date ? <span style={{ fontSize: 12 }}>{date}</span> : null} fieldId={dateFieldId} />
      {gstFieldId ? (
        <SigRow label="GST# (if applicable)" fieldId={gstFieldId} />
      ) : null}
    </div>
  )
}

function SigRow({ label, content, fieldId, tall }) {
  // Tall rows host the cursive signature, whose "J" descender drops ~25–30%
  // of font-size below the line-box. paddingBottom 18 gives the descender
  // 6–8px of clearance above the underline so it doesn't look like the
  // signature is cutting through the line.
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 9.5, letterSpacing: 1.5, textTransform: 'uppercase', color: B.muted, fontWeight: 700, marginBottom: 6 }}>
        {label}
      </div>
      <div
        id={fieldId}
        style={{
          width: '100%',
          height: tall ? 52 : 24,
          borderBottom: `1.2px solid ${B.borderInk}`,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          paddingBottom: tall ? 18 : 4,
          paddingLeft: 6,
          boxSizing: 'border-box',
          overflow: 'visible',
        }}
      >
        {content || null}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════

const todayISO = () => new Date().toISOString().split('T')[0]
const toUS = (iso) => {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${m}/${d}/${y}`
}

export default function AgreementTool() {
  const [info, setInfo] = useState({
    teacherFirstName: '',
    teacherFullName:  '',
    teacherGST:       '',
    signatoryName:    'Janet Sui',
    effectiveDateISO: todayISO(),
    subjectTaught:    '',
    scope:            DEFAULT_SCOPE,
    termWeeks:        '',
    payInterval:      DEFAULT_PAY_INTERVAL,
    paymentEmail:     '',
    hourlyFee:        '',
    directorDateISO:  todayISO(),
    notes:            '',
  })
  const [generating, setGenerating] = useState(false)
  const [fontsReady, setFontsReady] = useState(false)
  const [status, setStatus] = useState('')

  const pdfInfo = {
    ...info,
    effectiveDate: toUS(info.effectiveDateISO),
    directorDate:  toUS(info.directorDateISO),
  }

  useEffect(() => {
    // Brand fonts (DM Sans + Noto Sans SC) are self-hosted via next/font and
    // exposed as --font-latin / --font-cjk by app/layout.jsx. Only the cursive
    // signature face (Dancing Script) still needs loading from the CDN.
    const link = document.createElement('link')
    link.rel  = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600;700&display=swap'
    document.head.appendChild(link)
    document.fonts.ready.then(() => setFontsReady(true))
  }, [])

  // Build per-field onChange handlers ONCE on mount. Stable identity means
  // <Field> with memo() can skip re-render when its own value didn't change.
  const handlers = useMemo(() => {
    const keys = [
      'teacherFirstName', 'teacherFullName', 'teacherGST', 'signatoryName',
      'effectiveDateISO', 'subjectTaught', 'scope', 'termWeeks',
      'payInterval', 'paymentEmail', 'hourlyFee', 'directorDateISO', 'notes',
    ]
    const out = {}
    for (const k of keys) {
      out[k] = (e) => setInfo(prev => ({ ...prev, [k]: e.target.value }))
    }
    return out
  }, [])

  const generatePDF = async () => {
    if (generating) return
    setGenerating(true)
    setStatus('Rendering agreement…')
    try {
      await document.fonts.ready
      await new Promise(r => setTimeout(r, 150))

      const capture = async (id) => {
        const el = document.getElementById(id)
        if (!el) throw new Error(`#${id} not found`)
        return html2canvas(el, { scale: 2, useCORS: true, backgroundColor: B.cream, logging: false })
      }

      const pdf = new jsPDF('p', 'mm', 'a4')
      const PAGE_W_MM = 210
      const PAGE_H_MM = 297
      const pxToMmX = PAGE_W_MM / PW
      const pxToMmY = PAGE_H_MM / PH

      const pages = ['pdf-tsa-p1', 'pdf-tsa-p2', 'pdf-tsa-p3', 'pdf-tsa-p4']
      for (let i = 0; i < pages.length; i++) {
        setStatus(`Capturing page ${i + 1} of ${pages.length}…`)
        const canvas = await capture(pages[i])
        if (i > 0) pdf.addPage()
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.94), 'JPEG', 0, 0, PAGE_W_MM, PAGE_H_MM)
      }

      // Overlay AcroForm fields on page 4 (1-indexed: 4)
      setStatus('Adding fillable fields…')
      pdf.setPage(4)
      const pageEl   = document.getElementById('pdf-tsa-p4')
      const pageRect = pageEl.getBoundingClientRect()
      const fieldSpec = [
        { id: 'tsa-field-sig',  name: 'TeacherSignature', tooltip: 'Sign here (use your reader’s Fill & Sign)', value: '' },
        { id: 'tsa-field-name', name: 'TeacherPrintName', tooltip: 'Print your full name',                          value: info.teacherFullName || '' },
        { id: 'tsa-field-date', name: 'TeacherDate',      tooltip: 'Date signed (e.g. MM/DD/YYYY)',                 value: '' },
        { id: 'tsa-field-gst',  name: 'TeacherGST',       tooltip: 'GST number, if applicable',                     value: info.teacherGST || '' },
      ]
      for (const spec of fieldSpec) {
        const el = document.getElementById(spec.id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        const x = (r.left - pageRect.left) * pxToMmX
        const y = (r.top  - pageRect.top)  * pxToMmY
        const w = r.width  * pxToMmX
        const h = Math.max(r.height * pxToMmY, 5)
        const tf = new AcroFormTextField()
        tf.Rect = [x, y - 1, w, h + 2]
        tf.fieldName = spec.name
        tf.fontSize = 11
        tf.value = spec.value
        tf.alternateName = spec.tooltip
        pdf.addField(tf)
      }

      const safeName = (info.teacherFullName || info.teacherFirstName || 'Teacher').trim().replace(/\s+/g, '_')
      const fileName = `DodoTeacherAgreement_${safeName}_${info.effectiveDateISO}.pdf`
      pdf.save(fileName)
      setStatus(`✓ Saved: ${fileName}`)
    } catch (err) {
      console.error(err)
      setStatus(`Error: ${err.message}`)
    } finally {
      setGenerating(false)
    }
  }

  // Note: Field + INP_STYLE + LBL_STYLE now live at module scope (above).

  return (
    <div style={{ fontFamily: F, minHeight: '100vh', background: D.bgPage }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px 80px' }}>

        {/* Form header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, paddingBottom: 16, borderBottom: `2px solid ${D.accent}` }}>
          <img src={LOGO_B64} alt="DODO" style={{ height: 40 }} />
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: D.muted }}>DODO Learning</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: D.text }}>Teacher Service Agreement Generator</div>
          </div>
        </div>

        {/* Teacher block */}
        <Card title="Teacher">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            <Field value={info.teacherFirstName} onChange={handlers.teacherFirstName} label="First Name (greeting on letter)" placeholder="e.g. Melanie" />
            <Field value={info.teacherFullName}  onChange={handlers.teacherFullName}  label="Full Legal Name (on agreement)"  placeholder="e.g. Melanie Close" />
            <Field value={info.teacherGST}       onChange={handlers.teacherGST}       label="Teacher GST# (optional, pre-fills page 4)" placeholder="leave blank if N/A" span={2} />
          </div>
        </Card>

        {/* Schedule A block */}
        <Card title="Schedule A — Service Scope">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            <Field value={info.subjectTaught} onChange={handlers.subjectTaught} label="Subject Taught" placeholder="e.g. Literacy & Writing" />
            <Field value={info.scope}         onChange={handlers.scope}         label='Scope of Lesson Development (default "N/A")' placeholder="N/A" />
            <Field value={info.termWeeks}     onChange={handlers.termWeeks}     label="Term Duration (Weeks)" type="number" placeholder="e.g. 24" />
            <Field value={info.hourlyFee}     onChange={handlers.hourlyFee}     label="Professional Fee per Hour (CAD, number only)" type="number" placeholder="e.g. 30" />
            <Field value={info.paymentEmail}  onChange={handlers.paymentEmail}  label="Payment Email Address" type="email" placeholder="teacher@example.com" />
            <Field value={info.payInterval}   onChange={handlers.payInterval}   label="Pay Interval" placeholder={DEFAULT_PAY_INTERVAL} />
          </div>
        </Card>

        {/* DODO Learning signatory + dates */}
        <Card title="DODO Learning Signatory & Dates">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            <Field value={info.signatoryName}    onChange={handlers.signatoryName}    label="Signatory Name (renders as cursive signature)" placeholder="e.g. Janet Sui" span={2} />
            <Field value={info.effectiveDateISO} onChange={handlers.effectiveDateISO} label="Effective Date (page 2 preamble)" type="date" />
            <Field value={info.directorDateISO}  onChange={handlers.directorDateISO}  label="DODO Learning Signing Date (page 4)" type="date" />
          </div>
        </Card>

        {/* Notes */}
        <Card title="Notes (optional, appears on page 4)">
          <textarea
            value={info.notes}
            onChange={handlers.notes}
            placeholder="Add any custom notes — onboarding reminders, special conditions, training session times, etc."
            style={{ ...INP_STYLE, minHeight: 96, lineHeight: 1.6, fontSize: 14, resize: 'vertical' }}
          />
        </Card>

        {/* Generate */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 6 }}>
          <button
            onClick={generatePDF}
            disabled={generating || !fontsReady}
            style={{
              padding: '14px 30px',
              background: generating ? D.muted : D.accent,
              color: generating ? D.bgPage : '#1F1B12',
              border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700,
              fontFamily: 'inherit', cursor: generating ? 'wait' : 'pointer',
              boxShadow: '0 3px 12px rgba(0,0,0,0.15)',
              opacity: fontsReady ? 1 : 0.5, transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {!fontsReady ? 'Loading fonts…' : generating ? 'Generating…' : 'Generate Agreement PDF'}
          </button>
          {status && (
            <span style={{
              fontSize: 13,
              color: status.startsWith('✓') ? '#5AAA82'
                   : status.startsWith('Error') ? '#C0504D'
                   : D.muted,
            }}>
              {status}
            </span>
          )}
        </div>

        <p style={{ fontSize: 12, color: D.muted, marginTop: 16, lineHeight: 1.6 }}>
          The DODO Learning signature on pages 1 and 4 is rendered from the typed Signatory Name in a cursive script font (Dancing Script).
          Page 4 has fillable form fields for the Teacher: <strong>Print Name</strong> is pre-filled from &ldquo;Full Legal Name&rdquo;,
          <strong> GST#</strong> is pre-filled if provided, and <strong>Signature</strong> + <strong>Date</strong> stay blank for the
          teacher to complete in any PDF reader (Adobe Reader, macOS Preview, Chrome / Edge built-in viewer).
        </p>
      </div>

      {/* ═══ HIDDEN 4-PAGE PDF TEMPLATES ═══ */}
      <div style={{ position: 'fixed', left: -9999, top: 0, zIndex: -1, opacity: 1, pointerEvents: 'none' }}>
        <PDFPage1 info={pdfInfo} />
        <PDFPage2 info={pdfInfo} />
        <PDFPage3 info={pdfInfo} />
        <PDFPage4 info={pdfInfo} />
      </div>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div style={{
      background: D.card, borderRadius: 10, padding: 18, marginBottom: 16,
      border: `1px solid ${D.border}`,
    }}>
      <div style={{
        fontSize: 12, fontWeight: 700, color: D.text,
        textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}
