'use client'

// components/ops/ElaReportTool.jsx
// DODO ELA — Parent-facing Assessment Report  ·  v0.2 (skeleton · bilingual)
//
// Built per DLCW docs/assessments_design_v2.0.md §13–§14. The DODO ELA
// program is the MCT-anchored English Language Arts track piloted in DLCW
// (Island → Lens III). This generator turns a navigator's scoring of an
// entrance assessment into a parent-facing bilingual PDF.
//
// DESIGN CONTRACT
//   • Manual navigator entry (no auto-grading) — mirrors the Little DODO
//     tool. The navigator scores the quiz / paper / oral, then enters the
//     per-strand ratings + picks the placement bucket here.
//   • Parent-facing: internal MCT band names (island / lens3) are NEVER
//     printed (design §2). The admin picks the internal target level to
//     drive the §13.2 placement suggestion; the PDF shows only plain,
//     age-appropriate language.
//   • The component state mirrors the §14.1 output schema
//     (headline.level_placement_recommendation, per_strand_mastery,
//     per_band_subscores, legacy_pillars) so a future `dodo --build-report`
//     JSON can populate it without a rewrite.
//   • Brand-font-native from creation: var(--font-latin)/var(--font-cjk),
//     self-hosted via next/font (app/layout.jsx). No CDN font link.
//
// SKELETON STATUS (v0.2 · bilingual)
//   Structure + flow complete and bilingual (EN + 中文 in one block, matching
//   the Little DODO COMMENT_POOL template). Placement narratives, strand
//   names/descriptions, and per-level rating notes carry zh from the DeepSeek
//   pass (see ela_i18n/). Reading/Oral rating notes auto-fill from a generic
//   per-level pool the navigator edits; richer per-strand × per-level pools
//   are a later expansion.
//
// Design tokens (B / RATING_*) mirror AssessmentTool.jsx for now; a later
// cleanup can hoist the shared kit. Kept local here to leave the live
// Little DODO engine untouched.

import { useState, useEffect, useRef, memo } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { LOGO_B64 } from "@/components/ops/opsAssets";

// ─── BRAND (mirror of AssessmentTool.jsx v3.5.0) ────────────────────────
const B = {
  cream:      "#F5F5FF",
  white:      "#FFFFFF",
  ink:        "#212830",
  voidBlack:  "#0E0E12",
  muted:      "#5E6879",
  border:     "#DCDCF5",
  platinum:   "#F0F0F0",
  gilt:       "#F5C842",
  lavender:      "#B7B5FE",
  lavenderLight: "#EEEEFF",
  softGreen:     "#7EC8A0",
  softGreenLight:"#E6F6EE",
  midnight:      "#2E3848",
  midnightLight: "#E8EAF0",
};

// Brand typefaces — self-hosted via next/font, exposed on <html> by
// app/layout.jsx as --font-latin (DM Sans) / --font-cjk (Noto Sans SC).
const F = "var(--font-latin), var(--font-cjk), sans-serif";

// A4 at 96dpi; html2canvas captures at 2x.
const PW = 794;
const PH = 1123;
const PAD = 30;
const SKILL_ROW_H = 78;

const RATING_LABELS = { 0: "Did Not Test", 1: "Beginning", 2: "Developing", 3: "Approaching", 4: "Proficient", 5: "Advanced" };
const RATING_COLORS = {
  0: { bg: "#EEEEFF", text: "#5E6879", dot: "#B7B5FE" },
  1: { bg: "#fde8e8", text: "#7a2020", dot: "#c0504d" },
  2: { bg: "#fef3e2", text: "#7a4f10", dot: "#d4874e" },
  3: { bg: "#E6F6EE", text: "#1A4D35", dot: "#7EC8A0" },
  4: { bg: "#D4EEDF", text: "#14392A", dot: "#5AAA82" },
  5: { bg: "#EBEBFF", text: "#3535A0", dot: "#B7B5FE" },
};

// ─── INTERNAL TARGET LEVELS (admin-only; never printed to the parent) ───
// Drives the §13.2 placement suggestion. Mirrors propose_assessment.py
// LEVEL_ORDER / LEVEL_BAND. Piloted bands first.
const TARGET_LEVELS = [
  { value: "island", label: "Island · Grades 3–4 (piloted)" },
  { value: "lens3",  label: "Lens III · Grades 9–11 (piloted)" },
  { value: "town",   label: "Town · Grades 4–5" },
  { value: "voyage", label: "Voyage · Grades 5–6" },
];

// ─── PLACEMENT HEADLINE POOL (parent-safe; §13.2 buckets, no band names) ─
// Keys map to the internal §13.2 recommendations:
//   ready_above        ← ready_for_{target+1}
//   on_track           ← ready_for_{target}_on_track
//   consolidate_current← consolidate_{target}_prerequisites
//   consolidate_prior  ← consolidate_{target-1}_first
//   diagnose_prior     ← diagnose_at_{target-1}
const ELA_PLACEMENT = {
  ready_above: {
    en_head: "Ready to Advance",
    zh_head: "准备进阶",
    en_body: "Your child performs with confidence across current-level material and into more advanced work. They are ready to move up to the next stage.",
    zh_body: "您的孩子能够自信地应对当前阶段的学习内容，并已开始接触更深入的挑战。他们已经准备好进入下一阶段。",
    accent: B.softGreen,
  },
  on_track: {
    en_head: "On Track",
    zh_head: "稳步推进",
    en_body: "Your child meets the current level securely. The foundations are solid; the next phase consolidates and extends them.",
    zh_body: "您的孩子已扎实地达到当前阶段的要求。基础稳固，下一阶段将在此基础上巩固与拓展。",
    accent: B.lavender,
  },
  consolidate_current: {
    en_head: "Consolidating Foundations",
    zh_head: "巩固基础",
    en_body: "Your child is working within the current level and benefits from consolidating a few core foundations before advancing. A focused start will close the gap.",
    zh_body: "您的孩子正处于当前阶段的学习中，在进阶之前，巩固几项核心基础将更有助益。有针对性的起步能帮助缩小差距。",
    accent: B.gilt,
  },
  consolidate_prior: {
    en_head: "Strengthening Prior Foundations",
    zh_head: "强化前期基础",
    en_body: "Your child will progress fastest by first strengthening foundations from the preceding stage. We recommend beginning there to build durable confidence.",
    zh_body: "您的孩子通过先强化前一阶段的基础，能够取得最快的进步。我们建议从此处开始，以建立持久的信心。",
    accent: B.gilt,
  },
  diagnose_prior: {
    en_head: "Foundational Diagnostic Recommended",
    zh_head: "建议进行基础诊断",
    en_body: "We recommend a short foundational diagnostic at the preceding stage so we can place your child precisely and build from a secure starting point.",
    zh_body: "我们建议在前一阶段进行一次简短的基础诊断，以便精准定位孩子的起点，并确保从稳固的基础开始。",
    accent: B.midnight,
  },
};
const PLACEMENT_OPTIONS = [
  { value: "", label: "— Select placement —" },
  { value: "ready_above",         label: "Ready to Advance" },
  { value: "on_track",            label: "On Track" },
  { value: "consolidate_current", label: "Consolidating Foundations" },
  { value: "consolidate_prior",   label: "Strengthening Prior Foundations" },
  { value: "diagnose_prior",      label: "Foundational Diagnostic Recommended" },
];

// §13.2 suggestion from per-band sub-scores (0–100). Suggestion only; the
// navigator confirms/overrides. Mirrors assessments_design_v2.0 §13.2.
function suggestPlacement({ below, target, above }) {
  const t = Number(target), a = Number(above), b = Number(below);
  if ([t, a, b].some(v => Number.isNaN(v))) return "";
  if (t >= 70 && a >= 60) return "ready_above";
  if (t >= 70) return "on_track";
  if (t >= 50 && b >= 70) return "consolidate_current";
  if (t < 50 && b >= 70) return "consolidate_prior";
  if (t < 50) return "diagnose_prior";
  return "consolidate_current";
}

// Bilingual placement narrative (EN + 中文 in one block, matching the Little
// DODO COMMENT_POOL template). Auto-fills the editable narrative field.
function placementNarrative(key) {
  const p = key ? ELA_PLACEMENT[key] : null;
  if (!p) return "";
  return p.zh_body ? `${p.en_body} ${p.zh_body}` : p.en_body;
}

// ─── STRAND MODELS ──────────────────────────────────────────────────────
// Reading & Language strands = quiz primary_skills seen in the pilots'
// rubric.json. Each carries a one-line "what this measures" line.
const READING_STRANDS = [
  { id: "comprehension",  en: "Reading Comprehension & Analysis", zh: "阅读理解与分析", desc: "Literal + inferential understanding, theme, and textual evidence.", descZh: "字面与推断理解、主题分析及文本证据。" },
  { id: "vocabulary",     en: "Vocabulary & Word Study",          zh: "词汇与词源研究", desc: "Word meaning, roots/etymology, and precision in context.", descZh: "词义、词根与词源，以及在语境中的精确用词。" },
  { id: "grammar",        en: "Grammar & Sentence Structure",     zh: "语法与句子结构", desc: "Parts of speech, sentence analysis, and grammatical control.", descZh: "词性、句子分析与语法掌控。" },
  { id: "readingFluency", en: "Reading Fluency & Prosody",        zh: "阅读流畅度与韵律", desc: "Pace, phrasing, and rhythm in reading aloud.", descZh: "朗读时的语速、停顿与节奏。" },
  { id: "creative",       en: "Poetics & Literary Craft",         zh: "文学修辞与手法", desc: "Sound devices, figurative language, and authorial craft.", descZh: "音韵手法、比喻性语言及作者创作技巧。" },
  { id: "organization",   en: "Writing Organization",             zh: "文章结构", desc: "Paragraph and argument structure on the quiz items.", descZh: "测验中的段落与论证结构。" },
];

// Writing = AW3A 7-skill (Paradigm B). Descriptors are the real English
// rating_descriptors from lens3_rubric.json (band-agnostic at this layer).
const WRITING_SKILLS = [
  { id: "essay_structure", en: "Essay Structure",  zh: "文章结构", desc: "Thesis, topic sentences, evidence + analysis, synthesizing conclusion.", descZh: "论点、主题句、证据与分析，以及综合结论。" },
  { id: "ideas",           en: "Ideas",            zh: "内容与立意", desc: "Originality, depth, and genuine engagement with the prompt.", descZh: "原创性、深度及对题目的真诚回应。" },
  { id: "style",           en: "Style",            zh: "风格", desc: "Voice, sentence variety, word choice, rhetorical control.", descZh: "语气、句式多样性、用词与修辞掌控。" },
  { id: "grammar",         en: "Grammar",          zh: "语法", desc: "Agreement, tense, pronoun reference, parallel structure.", descZh: "主谓一致、时态、代词指代及平行结构。" },
  { id: "punctuation",     en: "Punctuation",      zh: "标点", desc: "Commas, semicolons, colons, dashes, apostrophes, quotation marks.", descZh: "逗号、分号、冒号、破折号、撇号与引号。" },
  { id: "usage",           en: "Usage",            zh: "词汇用法", desc: "Vocabulary precision, idiom, register, word-form accuracy.", descZh: "词汇准确度、惯用语、语体及词形准确性。" },
  { id: "mla_format",      en: "MLA Format",        zh: "MLA格式", desc: "Heading block, in-text citations, works cited, MLA conventions.", descZh: "标题栏、文内引用、参考文献列表及MLA规范。" },
];

// Oral & Listening strands (from the oral_assessment artifact).
const ORAL_STRANDS = [
  { id: "listening", en: "Listening Comprehension", zh: "听力理解", desc: "Following a spoken passage; retell, inference, and detail.", descZh: "理解口语段落；复述、推断与细节把握。" },
  { id: "speaking",  en: "Spoken Response & Fluency", zh: "口语表达与流利度", desc: "Read-aloud, open response, and spoken vocabulary.", descZh: "朗读、开放性回答与口语词汇。" },
];

// Bilingual per-level note (EN + 中文 in one block, matching the Little DODO
// COMMENT_POOL template). Auto-fills the editable note; the navigator may edit.
const RATING_NOTE_EN = {
  0: "This area was not assessed in this session.",
  1: "Beginning — foundational skills are still forming; this is the Navigator's first focus.",
  2: "Developing — the building blocks are emerging and growing more consistent.",
  3: "Approaching — solid working command, with the next layer of nuance in view.",
  4: "Proficient — reliable, consistent control with only minor lapses.",
  5: "Advanced — confident mastery, applied flexibly across new material.",
};
const RATING_NOTE_ZH = {
  0: "此领域在本轮评估中未作考察。",
  1: "起步阶段——基础技能正在形成中；这将是教学导航员的首要关注点。",
  2: "发展中——基础要素正在显现并趋于稳定。",
  3: "接近熟练——已具备扎实的运用能力，下一步将关注细微之处。",
  4: "熟练——可靠且稳定的掌控，仅偶有小疏漏。",
  5: "高级——自信掌握，并能灵活应用于新内容。",
};
function genericNote(level) {
  const en = RATING_NOTE_EN[level];
  if (en === undefined) return "";
  const zh = RATING_NOTE_ZH[level];
  return zh ? `${en} ${zh}` : en;
}

// ═══════════════════════════════════════════════════════════════════════
// PDF PRIMITIVES (hidden off-screen, captured by html2canvas)
// ═══════════════════════════════════════════════════════════════════════

function ElaHeader({ info }) {
  return (
    <div style={{ background: B.cream, padding: `18px ${PAD}px 12px`, borderBottom: `3px solid ${B.lavender}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <img src={LOGO_B64} alt="DODO" style={{ height: 40, width: "auto" }} />
        <div style={{ borderLeft: `1.5px solid rgba(183,181,254,0.45)`, paddingLeft: 14 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", opacity: 0.65, fontFamily: F, fontWeight: 500 }}>DODO Learning · 都学书院</div>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: F, marginTop: 1 }}>
            English Language Arts — Assessment Report
            <span style={{ fontSize: 11, fontWeight: 400, opacity: 0.72, marginLeft: 8 }}>英语语言艺术评估报告</span>
          </div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right", fontSize: 10, fontFamily: F, color: B.muted }}>
          {info.phase && <div>{info.phase}</div>}
          <div>{info.date}</div>
        </div>
      </div>
    </div>
  );
}

function ElaFooter() {
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 44,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: `0 ${PAD}px`, borderTop: `1px solid ${B.border}`,
      background: B.cream, fontFamily: F,
    }}>
      <span style={{ fontSize: 8, color: B.muted, letterSpacing: 0.2 }}>www.dodolearning.com</span>
      <span style={{ fontSize: 8.5, fontWeight: 700, color: B.lavender, letterSpacing: 1.5, textTransform: "uppercase" }}>Think Once. In Both Languages.</span>
      <span style={{ fontSize: 8, color: B.muted, letterSpacing: 0.2 }}>都学书院</span>
    </div>
  );
}

// Placement headline card — the focal point of page 1.
function PlacementCard({ placementKey, narrative }) {
  const p = placementKey ? ELA_PLACEMENT[placementKey] : null;
  const accent = p ? p.accent : B.lavender;
  return (
    <div style={{ background: B.white, borderRadius: 10, overflow: "hidden", border: `1px solid ${B.border}` }}>
      <div style={{ background: accent, color: B.voidBlack, padding: "14px 18px" }}>
        <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", opacity: 0.65, marginBottom: 3 }}>Placement · 入学定位</div>
        <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1 }}>{p ? p.en_head : "—"}</div>
        {p && p.zh_head ? <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.82, marginTop: 2 }}>{p.zh_head}</div> : null}
      </div>
      <div style={{ background: B.white, padding: "14px 18px" }}>
        <div style={{ fontSize: 11.5, lineHeight: 1.65, color: B.ink }}>{(narrative || (p ? `${p.en_body} ${p.zh_body}` : "")) || ""}</div>
      </div>
    </div>
  );
}

// Strand table — strand | rating | what it means. Mirrors PillarTable.
function StrandTable({ title, titleZh, accent, headerTextColor, strands, ratings, comments }) {
  return (
    <div style={{ background: B.white, borderRadius: 8, overflow: "hidden", border: `1px solid ${B.border}` }}>
      <div style={{ background: accent, color: headerTextColor || B.platinum, padding: "10px 16px" }}>
        <div style={{ fontSize: 8, letterSpacing: 2, textTransform: "uppercase", opacity: 0.6, marginBottom: 2 }}>Strand · 能力维度</div>
        <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.15 }}>{title}</div>
        <div style={{ fontSize: 10, opacity: 0.8, marginTop: 1 }}>{titleZh}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "150px 130px 1fr", background: B.white, borderBottom: `1.5px solid ${B.border}` }}>
        {[["Strand", "维度"], ["Rating", "等级"], ["What this means", "这意味着什么"]].map(([en, zh]) => (
          <div key={en} style={{ padding: "8px 12px" }}>
            <div style={{ fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: B.ink, fontWeight: 700 }}>{en}</div>
            <div style={{ fontSize: 8, color: B.muted, marginTop: 2 }}>{zh}</div>
          </div>
        ))}
      </div>
      {strands.map((s, idx) => {
        const r = ratings[s.id];
        const rc = (r !== undefined && r !== null) ? RATING_COLORS[r] : null;
        return (
          <div key={s.id} style={{
            display: "grid", gridTemplateColumns: "150px 130px 1fr",
            borderBottom: idx < strands.length - 1 ? `1px solid ${B.border}` : "none",
            alignItems: "flex-start", minHeight: SKILL_ROW_H,
          }}>
            <div style={{ padding: "8px 10px", borderRight: `1px solid ${B.border}` }}>
              <div style={{ fontSize: 11, fontWeight: 600 }}>{s.en}</div>
              {s.zh ? <div style={{ fontSize: 9, color: B.muted, marginTop: 1 }}>{s.zh}</div> : null}
              <div style={{ fontSize: 8.5, color: B.muted, marginTop: 3, lineHeight: 1.4 }}>{s.desc}</div>
              {s.descZh ? <div style={{ fontSize: 8.5, color: B.muted, lineHeight: 1.4 }}>{s.descZh}</div> : null}
            </div>
            <div style={{ padding: "8px 10px", borderRight: `1px solid ${B.border}` }}>
              {(r !== undefined && r !== null) ? (
                <div style={{ fontSize: 11, fontWeight: 700, color: rc.text, whiteSpace: "nowrap" }}>
                  {r} – {RATING_LABELS[r]}
                </div>
              ) : <span style={{ fontSize: 11, color: B.border }}>—</span>}
            </div>
            <div style={{ padding: "8px 10px" }}>
              <div style={{ fontSize: 9.5, lineHeight: 1.55, color: B.ink, wordBreak: "break-word" }}>{comments[s.id] || ""}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Below / At / Above grade-level challenge strip (parent-safe per-band view).
function BandStrip({ band }) {
  const ROWS = [
    { id: "below",  en: "Below grade-level challenge", zh: "低于年级难度", color: B.softGreen },
    { id: "target", en: "At grade-level challenge",    zh: "符合年级难度", color: B.lavender },
    { id: "above",  en: "Above grade-level challenge", zh: "高于年级难度", color: B.midnight },
  ];
  return (
    <div style={{ background: B.white, borderRadius: 8, overflow: "hidden", border: `1px solid ${B.border}` }}>
      <div style={{ background: B.lavender, color: B.voidBlack, padding: "10px 16px" }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>Performance by Challenge Level</div>
        <div style={{ fontSize: 10, opacity: 0.8, marginTop: 1 }}>按难度层级的表现</div>
      </div>
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {ROWS.map(row => {
          const pct = Math.max(0, Math.min(100, Number(band[row.id]) || 0));
          return (
            <div key={row.id}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: B.ink }}>{row.en} · <span style={{ color: B.muted }}>{row.zh}</span></span>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: row.color }}>{band[row.id] === "" || band[row.id] === undefined ? "—" : `${pct}%`}</span>
              </div>
              <div style={{ height: 9, background: B.cream, borderRadius: 99, overflow: "hidden", border: `1px solid ${B.border}` }}>
                <div style={{ width: `${pct}%`, height: "100%", background: row.color, borderRadius: 99 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AutoResizeTextarea({ value, onChange, placeholder, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [value]);
  return (
    <textarea ref={ref} value={value} onChange={onChange} placeholder={placeholder}
      style={{ ...style, resize: "none", overflow: "hidden" }} />
  );
}

// ═══════════════════════════════════════════════════════════════════════
// PDF PAGE TEMPLATES
// ═══════════════════════════════════════════════════════════════════════

const PageShell = ({ id, children }) => (
  <div id={id} style={{ width: PW, height: PH, background: B.cream, fontFamily: F, color: B.ink, boxSizing: "border-box", overflow: "hidden", position: "relative" }}>
    {children}
  </div>
);

// PAGE 1 — student info + placement headline
const ElaPage1 = memo(function ElaPage1({ info, placementKey, narrative }) {
  return (
    <PageShell id="ela-p1">
      <ElaHeader info={info} />
      <div style={{ padding: `14px ${PAD}px 0`, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ background: B.white, borderRadius: 8, padding: "16px 16px 18px", border: `1px solid ${B.border}` }}>
          <div style={{ marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${B.border}` }}>
            <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: B.lavender, fontWeight: 700 }}>Student Information </span>
            <span style={{ fontSize: 11, color: B.muted }}>学生信息</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, rowGap: 16 }}>
            {[["Student Name 学生姓名", info.name], ["Age 年龄", info.age], ["Date 评估日期", info.date],
              ["Evaluator 评估师", info.evaluator], ["Assessment Phase 评估阶段", info.phase], ["Assessment 评估", "Entrance · 入学评估"]].map(([lbl, val]) => (
              <div key={lbl}>
                <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: B.muted, fontWeight: 700, marginBottom: 5 }}>{lbl}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: B.ink, minHeight: 20, borderBottom: `1.5px solid ${B.border}`, paddingBottom: 4 }}>{val || "—"}</div>
              </div>
            ))}
          </div>
        </div>
        <PlacementCard placementKey={placementKey} narrative={narrative} />
      </div>
      <ElaFooter />
    </PageShell>
  );
});

// PAGE 2 — Reading & Language strands
const ElaPage2 = memo(function ElaPage2({ readingRatings, readingComments }) {
  return (
    <PageShell id="ela-p2">
      <ElaHeaderSpacer />
      <div style={{ padding: `14px ${PAD}px 0`, paddingBottom: 52 }}>
        <StrandTable title="Reading & Language" titleZh="阅读与语言" accent={B.lavender} headerTextColor={B.voidBlack}
          strands={READING_STRANDS} ratings={readingRatings} comments={readingComments} />
      </div>
      <ElaFooter />
    </PageShell>
  );
});

// PAGE 3 — Writing (AW3A 7) + Oral & Listening
const ElaPage3 = memo(function ElaPage3({ writingRatings, writingComments, oralRatings, oralComments }) {
  return (
    <PageShell id="ela-p3">
      <ElaHeaderSpacer />
      <div style={{ padding: `14px ${PAD}px 0`, paddingBottom: 52, display: "flex", flexDirection: "column", gap: 14 }}>
        <StrandTable title="Writing" titleZh="写作" accent={B.midnight} headerTextColor={B.platinum}
          strands={WRITING_SKILLS} ratings={writingRatings} comments={writingComments} />
        <StrandTable title="Oral & Listening" titleZh="口语与听力" accent={B.softGreen} headerTextColor={B.voidBlack}
          strands={ORAL_STRANDS} ratings={oralRatings} comments={oralComments} />
      </div>
      <ElaFooter />
    </PageShell>
  );
});

// PAGE 4 — challenge-level strip + navigator notes
const ElaPage4 = memo(function ElaPage4({ band, notes }) {
  return (
    <PageShell id="ela-p4">
      <ElaHeaderSpacer />
      <div style={{ padding: `14px ${PAD}px 0`, paddingBottom: 52, display: "flex", flexDirection: "column", gap: 14 }}>
        <BandStrip band={band} />
        {notes ? (
          <div style={{ background: B.white, borderRadius: 8, padding: 14, border: `1px solid ${B.border}` }}>
            <div style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: B.lavender }}>{"Navigator's Notes "}</span>
              <span style={{ fontSize: 11, color: B.muted }}>领航员备注</span>
            </div>
            <div style={{ fontSize: 11, lineHeight: 1.7, color: B.ink, whiteSpace: "pre-wrap" }}>{notes}</div>
          </div>
        ) : null}
      </div>
      <ElaFooter />
    </PageShell>
  );
});

// Header is repeated per page; pages 2–4 use a plain header (no info bar).
function ElaHeaderSpacer() {
  return (
    <div style={{ background: B.cream, padding: `18px ${PAD}px 12px`, borderBottom: `3px solid ${B.lavender}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <img src={LOGO_B64} alt="DODO" style={{ height: 40, width: "auto" }} />
        <div style={{ borderLeft: `1.5px solid rgba(183,181,254,0.45)`, paddingLeft: 14 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", opacity: 0.65, fontFamily: F, fontWeight: 500 }}>DODO Learning · 都学书院</div>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: F, marginTop: 1 }}>
            English Language Arts — Assessment Report
            <span style={{ fontSize: 11, fontWeight: 400, opacity: 0.72, marginLeft: 8 }}>英语语言艺术评估报告</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN ENGINE — INPUT FORM + PDF GENERATION
// ═══════════════════════════════════════════════════════════════════════

export default function ElaReportTool() {
  const [info, setInfo] = useState({ name: "", age: "", date: new Date().toISOString().split("T")[0], evaluator: "", phase: "Entrance Assessment · 入学评估" });
  const [targetLevel, setTargetLevel] = useState("");        // internal — never printed
  const [placement, setPlacement] = useState("");
  const [narrative, setNarrative] = useState("");
  const [band, setBand] = useState({ below: "", target: "", above: "" });

  const [readingRatings, setReadingRatings] = useState({});
  const [readingComments, setReadingComments] = useState({});
  const [writingRatings, setWritingRatings] = useState({});
  const [writingComments, setWritingComments] = useState({});
  const [oralRatings, setOralRatings] = useState({});
  const [oralComments, setOralComments] = useState({});
  const [notes, setNotes] = useState("");

  const [generating, setGenerating] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Brand fonts are self-hosted via next/font (app/layout.jsx). Gate PDF
    // generation on the faces being loaded so html2canvas captures glyphs.
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  const makeSetRating = (setRatings, setComments) => (id, val) => {
    if (val === "" || val === null) {
      setRatings(r => { const n = { ...r }; delete n[id]; return n; });
      setComments(c => { const n = { ...c }; delete n[id]; return n; });
      return;
    }
    const n = parseInt(val, 10);
    if (Number.isNaN(n) || n < 0 || n > 5) return;
    setRatings(r => ({ ...r, [id]: n }));
    setComments(c => ({ ...c, [id]: genericNote(n) }));
  };
  // Setters from useState are stable, so these closures need no memoization.
  const setReadingRating = makeSetRating(setReadingRatings, setReadingComments);
  const setWritingRating = makeSetRating(setWritingRatings, setWritingComments);
  const setOralRating = makeSetRating(setOralRatings, setOralComments);

  const suggestion = suggestPlacement(band);

  const generatePDF = async () => {
    setGenerating(true);
    try {
      await document.fonts.ready;
      await new Promise(r => setTimeout(r, 100));
      const capture = async (id) => {
        const el = document.getElementById(id);
        if (!el) throw new Error(`#${id} not found`);
        return html2canvas(el, { scale: 2, useCORS: true, backgroundColor: B.cream, logging: false });
      };
      const pdf = new jsPDF("p", "mm", "a4");
      const pageW = 210, pageH = 297;
      const pages = ["ela-p1", "ela-p2", "ela-p3", "ela-p4"];
      for (let i = 0; i < pages.length; i++) {
        setStatus(`Capturing page ${i + 1} of ${pages.length}…`);
        const canvas = await capture(pages[i]);
        if (i > 0) pdf.addPage();
        const imgW = pageW;
        const imgH = (canvas.height * imgW) / canvas.width;
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, imgW, Math.min(imgH, pageH));
      }
      const fileName = `DodoELA_${(info.name || "Student").replace(/\s+/g, "_")}_${info.date}.pdf`;
      pdf.save(fileName);
      setStatus(`✓ Saved: ${fileName}`);
    } catch (err) {
      console.error(err);
      setStatus(`Error: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const inp = { width: "100%", padding: "8px 10px", border: `1.5px solid ${B.border}`, borderRadius: 6, fontSize: 14, fontFamily: "inherit", background: B.white, color: B.ink, outline: "none", boxSizing: "border-box" };
  const lbl = { fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: B.muted, fontWeight: 700, marginBottom: 4, display: "block" };

  const RatingBlock = ({ strands, ratings, comments, setRating, setComments }) => (
    <>
      {strands.map((s, idx) => {
        const r = ratings[s.id];
        const rc = (r !== undefined && r !== null) ? RATING_COLORS[r] : null;
        return (
          <div key={s.id} style={{ marginBottom: idx < strands.length - 1 ? 14 : 0, paddingBottom: idx < strands.length - 1 ? 14 : 0, borderBottom: idx < strands.length - 1 ? `1px solid ${B.border}` : "none" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{s.en}{s.zh ? <span style={{ color: B.muted, fontWeight: 400 }}>{"  ·  "}{s.zh}</span> : null}</div>
                <div style={{ fontSize: 11, color: B.muted }}>{s.desc}{s.descZh ? `  ${s.descZh}` : ""}</div>
              </div>
              <select value={r !== undefined && r !== null ? r : ""} onChange={e => setRating(s.id, e.target.value)}
                style={{ ...inp, width: 180, fontWeight: 700, cursor: "pointer", background: rc ? rc.bg : B.white, color: rc ? rc.text : B.muted, border: `2px solid ${rc ? rc.dot : B.border}` }}>
                <option value="">— Rate 0-5 —</option>
                {[0, 1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} – {RATING_LABELS[n]}</option>)}
              </select>
            </div>
            <AutoResizeTextarea value={comments[s.id] || ""} onChange={e => setComments(c => ({ ...c, [s.id]: e.target.value }))}
              placeholder="Select a rating to auto-fill, or type a custom note…"
              style={{ ...inp, minHeight: 64, lineHeight: 1.6, fontSize: 13, background: B.cream }} />
          </div>
        );
      })}
    </>
  );

  const cardWrap = { background: B.white, borderRadius: 10, padding: 18, marginBottom: 16, border: `1px solid ${B.border}` };
  const cardTitle = { fontSize: 12, fontWeight: 700, color: B.ink, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 };

  return (
    <div style={{ fontFamily: F, minHeight: "100vh", background: B.cream }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px 80px" }}>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, paddingBottom: 16, borderBottom: `2px solid ${B.lavender}` }}>
          <img src={LOGO_B64} alt="DODO" style={{ height: 40 }} />
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: B.muted }}>DODO Learning · DODO ELA</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: B.ink }}>ELA Assessment Report Generator</div>
          </div>
          <span style={{ marginLeft: "auto", fontSize: 11, color: B.muted, border: `1px solid ${B.border}`, borderRadius: 99, padding: "3px 10px" }}>v0.2 skeleton · 中/EN</span>
        </div>

        {/* Student info */}
        <div style={cardWrap}>
          <div style={cardTitle}>Student Information 学生信息</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {[["name", "Student Name 学生姓名", "text"], ["age", "Age 年龄", "number"], ["evaluator", "Evaluator 评估师", "text"]].map(([k, label, type]) => (
              <label key={k} style={{ display: "flex", flexDirection: "column" }}>
                <span style={lbl}>{label}</span>
                <input type={type} value={info[k]} onChange={e => setInfo(i => ({ ...i, [k]: e.target.value }))} style={inp} />
              </label>
            ))}
            <label style={{ display: "flex", flexDirection: "column" }}>
              <span style={lbl}>Date 评估日期</span>
              <input type="date" value={info.date} onChange={e => setInfo(i => ({ ...i, date: e.target.value }))} style={inp} />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              <span style={lbl}>Internal Target Level <span style={{ textTransform: "none", color: B.gilt }}>(not printed)</span></span>
              <select value={targetLevel} onChange={e => setTargetLevel(e.target.value)} style={{ ...inp, cursor: "pointer" }}>
                <option value="">— Select —</option>
                {TARGET_LEVELS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </label>
          </div>
        </div>

        {/* Placement */}
        <div style={cardWrap}>
          <div style={cardTitle}>Placement 入学定位</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 12 }}>
            {[["below", "Below grade-level %"], ["target", "At grade-level %"], ["above", "Above grade-level %"]].map(([k, label]) => (
              <label key={k} style={{ display: "flex", flexDirection: "column" }}>
                <span style={lbl}>{label}</span>
                <input type="number" min="0" max="100" value={band[k]} onChange={e => setBand(b => ({ ...b, [k]: e.target.value }))} style={inp} placeholder="0–100" />
              </label>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <label style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 240 }}>
              <span style={lbl}>Placement Recommendation</span>
              <select value={placement} onChange={e => { setPlacement(e.target.value); setNarrative(placementNarrative(e.target.value)); }} style={{ ...inp, cursor: "pointer" }}>
                {PLACEMENT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
            {suggestion && (
              <button type="button" onClick={() => { setPlacement(suggestion); setNarrative(placementNarrative(suggestion)); }}
                style={{ alignSelf: "flex-end", padding: "9px 14px", borderRadius: 7, border: `1.5px solid ${B.lavender}`, background: B.lavenderLight, color: B.ink, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                §13.2 suggests: {ELA_PLACEMENT[suggestion].en_head} →
              </button>
            )}
          </div>
          <label style={{ display: "flex", flexDirection: "column", marginTop: 12 }}>
            <span style={lbl}>Narrative (parent-facing; auto-fills from placement)</span>
            <AutoResizeTextarea value={narrative} onChange={e => setNarrative(e.target.value)}
              placeholder={placement ? placementNarrative(placement) : "Select a placement to auto-fill…"}
              style={{ ...inp, minHeight: 64, lineHeight: 1.6, fontSize: 13, background: B.cream }} />
          </label>
        </div>

        {/* Reading & Language */}
        <div style={cardWrap}>
          <div style={cardTitle}>Reading &amp; Language 阅读与语言</div>
          <RatingBlock strands={READING_STRANDS} ratings={readingRatings} comments={readingComments} setRating={setReadingRating} setComments={setReadingComments} />
        </div>

        {/* Writing */}
        <div style={cardWrap}>
          <div style={cardTitle}>Writing 写作 · AW3A 7-skill</div>
          <RatingBlock strands={WRITING_SKILLS} ratings={writingRatings} comments={writingComments} setRating={setWritingRating} setComments={setWritingComments} />
        </div>

        {/* Oral & Listening */}
        <div style={cardWrap}>
          <div style={cardTitle}>Oral &amp; Listening 口语与听力</div>
          <RatingBlock strands={ORAL_STRANDS} ratings={oralRatings} comments={oralComments} setRating={setOralRating} setComments={setOralComments} />
        </div>

        {/* Notes */}
        <div style={cardWrap}>
          <div style={cardTitle}>{"Navigator's Notes 领航员备注"}</div>
          <AutoResizeTextarea value={notes} onChange={e => setNotes(e.target.value)}
            placeholder="Add personalized notes, next steps, or parent communication points…"
            style={{ ...inp, minHeight: 100, lineHeight: 1.7, fontSize: 14, background: B.cream }} />
        </div>

        {/* Generate */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={generatePDF} disabled={generating || !fontsReady}
            style={{ padding: "14px 36px", background: generating ? B.muted : B.gilt, color: generating ? B.cream : B.voidBlack, border: "none", borderRadius: 10, fontSize: 16, fontWeight: 700, fontFamily: "inherit", cursor: generating ? "wait" : "pointer", boxShadow: "0 3px 12px rgba(0,0,0,0.15)", opacity: fontsReady ? 1 : 0.5 }}>
            {!fontsReady ? "Loading fonts…" : generating ? "⏳ Generating…" : "📄 Generate ELA PDF"}
          </button>
          {status && <span style={{ fontSize: 13, color: status.startsWith("✓") ? B.softGreen : status.startsWith("Error") ? "#c0504d" : B.muted }}>{status}</span>}
        </div>
      </div>

      {/* ═══ HIDDEN PDF TEMPLATES ═══ */}
      <div style={{ position: "fixed", left: -9999, top: 0, zIndex: -1, opacity: 1, pointerEvents: "none" }}>
        <ElaPage1 info={info} placementKey={placement} narrative={narrative} />
        <ElaPage2 readingRatings={readingRatings} readingComments={readingComments} />
        <ElaPage3 writingRatings={writingRatings} writingComments={writingComments} oralRatings={oralRatings} oralComments={oralComments} />
        <ElaPage4 band={band} notes={notes} />
      </div>
    </div>
  );
}
