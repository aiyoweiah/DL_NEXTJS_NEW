'use client';

import { useState } from 'react';
import Link from 'next/link';

// ─── GradePills ───────────────────────────────────────────────────────────────
function GradePills({ variant, activeGrade, onGradeChange }) {
  const grades = ['All Grades', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'];

  const isDark = variant === 'dark';

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {grades.map((grade) => {
        const isActive = activeGrade === grade;
        return (
          <button
            key={grade}
            onClick={() => onGradeChange(grade)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 500,
              border: isDark
                ? isActive
                  ? '1.5px solid #b7b5fe'
                  : '1.5px solid rgba(183, 181, 254, 0.3)'
                : isActive
                ? '1.5px solid #212830'
                : '1.5px solid rgba(33, 40, 48, 0.3)',
              backgroundColor: isDark
                ? isActive
                  ? 'rgba(183, 181, 254, 0.15)'
                  : 'transparent'
                : isActive
                ? 'rgba(33, 40, 48, 0.08)'
                : 'transparent',
              color: isDark
                ? isActive
                  ? '#b7b5fe'
                  : 'rgba(183, 181, 254, 0.55)'
                : isActive
                ? '#0E0E12'
                : 'rgba(14, 14, 18, 0.45)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {grade}
          </button>
        );
      })}
    </div>
  );
}

// ─── VideoCard ────────────────────────────────────────────────────────────────
function VideoCard({ variant, grade, badgeLabel, badgeType, title, metaLabel, duration, descriptor }) {
  const [hovered, setHovered] = useState(false);
  const isDark = variant === 'dark';

  // Badge colour by type
  const badgeStyles = {
    phase: {
      backgroundColor: 'rgba(183, 181, 254, 0.18)',
      color: '#b7b5fe',
    },
    trait: {
      backgroundColor: 'rgba(245, 200, 66, 0.15)',
      color: '#c9a200',
    },
    activity: {
      backgroundColor: 'rgba(183, 181, 254, 0.18)',
      color: '#b7b5fe',
    },
  };

  const badge = badgeStyles[badgeType] || badgeStyles.phase;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: isDark ? '#2E3848' : '#FFFFFF',
        border: isDark
          ? hovered
            ? '1px solid rgba(183, 181, 254, 0.4)'
            : '1px solid rgba(183, 181, 254, 0.12)'
          : hovered
          ? '1px solid rgba(183, 181, 254, 0.5)'
          : '1px solid rgba(0,0,0,0.08)',
        boxShadow: isDark
          ? hovered
            ? '0 4px 24px rgba(183, 181, 254, 0.08)'
            : 'none'
          : hovered
          ? '0 4px 20px rgba(0,0,0,0.09)'
          : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'border 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {/* Thumbnail area */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9
          backgroundColor: isDark ? '#1a2130' : '#EEEEf8',
          cursor: 'pointer',
        }}
      >
        {/* Scan-line texture on dark */}
        {isDark && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 5px,
                rgba(183, 181, 254, 0.025) 5px,
                rgba(183, 181, 254, 0.025) 6px
              )`,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Grade pill — top-left */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            padding: '4px 10px',
            borderRadius: '4px',
            backgroundColor: isDark ? 'rgba(14,14,18,0.72)' : 'rgba(255,255,255,0.85)',
            color: isDark ? '#F0F0F0' : '#0E0E12',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            backdropFilter: 'blur(4px)',
          }}
        >
          {grade}
        </div>

        {/* Duration — top-right */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '4px 10px',
            borderRadius: '4px',
            backgroundColor: isDark ? 'rgba(14,14,18,0.72)' : 'rgba(255,255,255,0.85)',
            color: isDark ? 'rgba(240,240,240,0.75)' : '#212830',
            fontSize: '11px',
            fontWeight: 500,
            backdropFilter: 'blur(4px)',
          }}
        >
          {duration}
        </div>

        {/* Play button */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: hovered
                ? isDark
                  ? 'rgba(183, 181, 254, 0.22)'
                  : 'rgba(183, 181, 254, 0.18)'
                : isDark
                ? 'rgba(183, 181, 254, 0.12)'
                : 'rgba(183, 181, 254, 0.12)',
              border: '1.5px solid rgba(183, 181, 254, 0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s ease',
            }}
          >
            {/* Play triangle */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M6 4.5L14 9L6 13.5V4.5Z" fill="#b7b5fe" />
            </svg>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '18px 20px 20px' }}>
        {/* Badge */}
        <div
          style={{
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.05em',
            marginBottom: '10px',
            ...badge,
          }}
        >
          {badgeLabel}
        </div>

        {/* Title */}
        <p
          style={{
            color: isDark ? '#F0F0F0' : '#0E0E12',
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: 1.5,
            marginBottom: '10px',
          }}
        >
          {title}
        </p>

        {/* Meta label (Lexile / score / activity tag) */}
        <div
          style={{
            color: isDark ? 'rgba(183, 181, 254, 0.85)' : '#7c79e8',
            fontSize: '12px',
            fontWeight: 500,
            marginBottom: '10px',
            letterSpacing: '0.03em',
          }}
        >
          {metaLabel}
        </div>

        {/* Descriptor */}
        <p
          style={{
            color: isDark ? 'rgba(240, 240, 240, 0.55)' : '#212830',
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: 1.65,
          }}
        >
          {descriptor}
        </p>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const lsClips = [
  {
    grade: 'GRADE 5',
    gradeNum: 5,
    phase: 'Read → Think',
    lexile: 'Lexile 680',
    duration: '8 min',
    title: "A Grade 5 student encounters a text two levels above their baseline — and doesn't back down",
    descriptor:
      "Watch the Navigator select the text intentionally above comfort — and how the student's reading posture changes over 8 minutes.",
  },
  {
    grade: 'GRADE 7',
    gradeNum: 7,
    phase: 'Think → Speak',
    lexile: 'Lexile 820',
    duration: '12 min',
    title: 'A Grade 7 student takes a position — then defends it when their Navigator pushes back',
    descriptor:
      "Watch how the Navigator introduces the counter-argument — and how the student revises their position without abandoning it.",
  },
  {
    grade: 'GRADE 6',
    gradeNum: 6,
    phase: 'Speak → Write',
    lexile: 'Lexile 740',
    duration: '10 min',
    title: 'The transition moment — a Grade 6 student moves from spoken argument to first written sentence',
    descriptor:
      "Watch how the Navigator bridges the Speak phase into Write — and how the student's first sentence changes once they've spoken it aloud first.",
  },
];

const writingClips = [
  {
    grade: 'GRADE 5',
    gradeNum: 5,
    trait: 'Voice Trait',
    score: 'Voice: 2 → 4',
    duration: '9 min',
    title: 'A Grade 5 student finds the sentence that sounds like them — and the Navigator names exactly why it works',
    descriptor:
      "Watch the Navigator identify the one sentence in the draft that scores a 4 on Voice — and ask the student to write the rest of the paragraph to match it.",
  },
  {
    grade: 'GRADE 7',
    gradeNum: 7,
    trait: 'Organisation',
    score: 'Organisation: 2 → 3',
    duration: '11 min',
    title: "A Grade 7 student's argument falls apart in the middle — and the Navigator shows them exactly where and why",
    descriptor:
      "Watch the Navigator use the 6+1 Organisation rubric to locate the structural gap — and how the student rebuilds the paragraph sequence in real time.",
  },
  {
    grade: 'GRADE 6',
    gradeNum: 6,
    trait: 'Ideas + Word Choice',
    score: 'Ideas: 3 → 4',
    duration: '13 min',
    title: 'The revision session — a Grade 6 student tightens their central claim from two sentences to one',
    descriptor:
      "Watch how the Navigator challenges the student to say the same thing in fewer words — and what happens to the Ideas score when they do.",
  },
];

const hangarClips = [
  {
    grade: 'GRADES 6–7',
    gradeNum: 6,
    activity: 'Peer Discussion',
    activityTag: 'Peer Discussion Thread',
    duration: '20 min',
    title: 'A Navigator-posed question about Animal Farm — and what three students do with it over 20 minutes',
    descriptor:
      "Watch how the Navigator's single question generates three different positions — and how students respond to each other's arguments before the Navigator intervenes.",
  },
  {
    grade: 'GRADE 5',
    gradeNum: 5,
    activity: 'Navigator Feedback',
    activityTag: 'Navigator Async Feedback',
    duration: '7 min',
    title: "A Grade 5 student's first writing draft in The Hangar receives a 6+1 score — and a single sentence of feedback that changes everything",
    descriptor:
      "Watch how the Navigator identifies the one sentence in a Grade 5 draft that scores a 4 on Voice — and what the feedback note asks the student to do next.",
  },
  {
    grade: 'GRADES 7–8',
    gradeNum: 7,
    activity: 'Writing Thread',
    activityTag: 'Writing Revision Thread',
    duration: '15 min',
    title: 'A student posts a revision — peers respond — the Navigator scores the difference',
    descriptor:
      "Watch the Hangar's revision cycle in action: the draft, the peer responses, the Navigator's before/after 6+1 scores, and the student's reaction when they see the numbers move.",
  },
];

// ─── Filter helper ────────────────────────────────────────────────────────────
function filterByGrade(clips, activeGrade) {
  if (activeGrade === 'All Grades') return clips;
  const gradeNum = parseInt(activeGrade.replace('Grade ', ''), 10);
  return clips.filter((clip) => clip.gradeNum === gradeNum);
}

// ─── AnchorPill ───────────────────────────────────────────────────────────────
function AnchorPill({ label, target }) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '6px 14px',
        borderRadius: '20px',
        border: hovered
          ? '1.5px solid rgba(183, 181, 254, 0.8)'
          : '1.5px solid rgba(183, 181, 254, 0.4)',
        backgroundColor: hovered ? 'rgba(183, 181, 254, 0.12)' : 'transparent',
        color: '#b7b5fe',
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      {label} <span style={{ color: 'rgba(183, 181, 254, 0.6)' }}>↓</span>
    </button>
  );
}

// ─── SecondaryButton ──────────────────────────────────────────────────────────
function SecondaryButton({ children, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-block',
        padding: '10px 24px',
        borderRadius: '8px',
        border: hovered ? '1.5px solid #F0F0F0' : '1.5px solid rgba(240, 240, 240, 0.5)',
        backgroundColor: hovered ? 'rgba(240, 240, 240, 0.05)' : 'transparent',
        color: '#F0F0F0',
        fontSize: '15px',
        fontWeight: 500,
        textDecoration: 'none',
        transition: 'all 0.15s ease',
      }}
    >
      {children}
    </Link>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function DemosClient() {
  const [lsActiveGrade, setLsActiveGrade] = useState('All Grades');
  const [writingActiveGrade, setWritingActiveGrade] = useState('All Grades');
  const [hangarActiveGrade, setHangarActiveGrade] = useState('All Grades');

  return (
    <div style={{ fontFamily: 'var(--font-latin, DM Sans, sans-serif)' }}>

      {/* ── S1 HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative px-6 py-20 md:py-32"
        style={{ backgroundColor: '#212830' }}
      >
        {/* Scan-line texture — bottom 40% */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: '40%',
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 5px,
              rgba(183, 181, 254, 0.03) 5px,
              rgba(183, 181, 254, 0.03) 6px
            )`,
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Eyebrow */}
          <div
            className="mb-4 uppercase"
            style={{
              color: '#b7b5fe',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.1em',
            }}
          >
            Demo Classes
          </div>

          {/* H1 */}
          <h1
            className="mb-3"
            style={{
              color: '#F0F0F0',
              fontSize: 'clamp(34px, 5vw, 58px)',
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: '680px',
            }}
          >
            Real sessions. Real students.{' '}
            <span style={{ color: '#b7b5fe' }}>
              See what The Loop looks like in practice.
            </span>
          </h1>

          {/* Subhead */}
          <p
            className="mb-8"
            style={{
              color: 'rgba(240, 240, 240, 0.65)',
              fontSize: '16px',
              fontWeight: 400,
              maxWidth: '520px',
            }}
          >
            Three programs. Grades 5–8. Pick the one that looks most like your
            child's week.
          </p>

          {/* Anchor pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Live Sessions (LS)', target: 'live-sessions' },
              { label: 'Writing', target: 'writing' },
              { label: 'The Hangar', target: 'the-hangar' },
            ].map(({ label, target }) => (
              <AnchorPill key={target} label={label} target={target} />
            ))}
          </div>
        </div>
      </section>

      {/* ── S2 PROGRAM NAVIGATION STRIP ─────────────────────────────────────── */}
      <section
        className="px-6 py-6"
        style={{ backgroundColor: '#0E0E12' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
            {[
              {
                name: 'Live Sessions (LS)',
                character: 'Navigator-led · Read → Think → Speak in one session',
                grade: 'Grades 5–8',
              },
              {
                name: 'Writing',
                character: '6+1 Trait focused · Draft → Score → Revise',
                grade: 'Grades 5–8',
              },
              {
                name: 'The Hangar',
                character: 'Between-session · Peer discussion + Navigator feedback',
                grade: 'Grades 5–8',
              },
            ].map((program, idx) => (
              <div
                key={idx}
                className="text-center md:text-left px-6 py-4 md:py-2"
                style={{
                  borderRight:
                    idx < 2
                      ? '1px solid rgba(183, 181, 254, 0.2)'
                      : 'none',
                  borderBottom:
                    idx < 2
                      ? '1px solid rgba(183, 181, 254, 0.2)'
                      : 'none',
                }}
              >
                <div
                  className="mb-1"
                  style={{ color: '#F0F0F0', fontSize: '16px', fontWeight: 700 }}
                >
                  {program.name}
                </div>
                <div
                  className="mb-2"
                  style={{
                    color: 'rgba(240, 240, 240, 0.55)',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: 1.4,
                  }}
                >
                  {program.character}
                </div>
                <div
                  className="inline-block px-2.5 py-1 rounded"
                  style={{
                    backgroundColor: 'rgba(183, 181, 254, 0.15)',
                    color: '#b7b5fe',
                    fontSize: '11px',
                    fontWeight: 500,
                  }}
                >
                  {program.grade}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S3 LIVE SESSIONS ─────────────────────────────────────────────────── */}
      <section
        id="live-sessions"
        className="px-6 py-20 md:py-24"
        style={{ backgroundColor: '#212830' }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="mb-3 uppercase"
            style={{ color: '#b7b5fe', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em' }}
          >
            Live Sessions
          </div>

          <h2
            className="mb-3"
            style={{ color: '#F0F0F0', fontSize: '30px', fontWeight: 700 }}
          >
            The Navigator. The student. The Loop — in one session.
          </h2>

          <p
            className="mb-4"
            style={{
              color: 'rgba(240, 240, 240, 0.65)',
              fontSize: '15px',
              fontWeight: 400,
              maxWidth: '600px',
            }}
          >
            Each clip is an unedited extract from a real session. Lexile level
            of the text in use is shown. The Loop phase is named at the start
            of each clip.
          </p>

          <GradePills
            variant="dark"
            activeGrade={lsActiveGrade}
            onGradeChange={setLsActiveGrade}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filterByGrade(lsClips, lsActiveGrade).map((clip, idx) => (
              <VideoCard
                key={idx}
                variant="dark"
                grade={clip.grade}
                badgeLabel={clip.phase}
                badgeType="phase"
                title={clip.title}
                metaLabel={clip.lexile}
                duration={clip.duration}
                descriptor={clip.descriptor}
              />
            ))}
          </div>

          {filterByGrade(lsClips, lsActiveGrade).length === 0 && (
            <p
              style={{
                color: 'rgba(240,240,240,0.4)',
                fontSize: '14px',
                paddingTop: '12px',
              }}
            >
              No sessions available for this grade yet.
            </p>
          )}
        </div>
      </section>

      {/* ── S4 WRITING ───────────────────────────────────────────────────────── */}
      <section
        id="writing"
        className="px-6 py-20 md:py-24"
        style={{ backgroundColor: '#F5F5FF' }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="mb-3 uppercase"
            style={{ color: '#b7b5fe', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em' }}
          >
            Writing
          </div>

          <h2
            className="mb-3"
            style={{ color: '#0E0E12', fontSize: '30px', fontWeight: 700 }}
          >
            The 6+1 Trait framework — scored live, explained precisely.
          </h2>

          <p
            className="mb-4"
            style={{
              color: '#212830',
              fontSize: '15px',
              fontWeight: 400,
              maxWidth: '600px',
            }}
          >
            Each clip shows a Navigator scoring a student's writing against a
            specific 6+1 Trait — naming the score, naming the sentence that
            moves it, and naming the revision that would change it.
          </p>

          <GradePills
            variant="light"
            activeGrade={writingActiveGrade}
            onGradeChange={setWritingActiveGrade}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filterByGrade(writingClips, writingActiveGrade).map((clip, idx) => (
              <VideoCard
                key={idx}
                variant="light"
                grade={clip.grade}
                badgeLabel={clip.trait}
                badgeType="trait"
                title={clip.title}
                metaLabel={clip.score}
                duration={clip.duration}
                descriptor={clip.descriptor}
              />
            ))}
          </div>

          {filterByGrade(writingClips, writingActiveGrade).length === 0 && (
            <p
              style={{
                color: 'rgba(14,14,18,0.4)',
                fontSize: '14px',
                paddingTop: '12px',
              }}
            >
              No sessions available for this grade yet.
            </p>
          )}
        </div>
      </section>

      {/* ── S5 THE HANGAR ─────────────────────────────────────────────────────── */}
      <section
        id="the-hangar"
        className="px-6 py-20 md:py-24"
        style={{ backgroundColor: '#0E0E12' }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="mb-3 uppercase"
            style={{ color: '#b7b5fe', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em' }}
          >
            The Hangar
          </div>

          <h2
            className="mb-3"
            style={{ color: '#F0F0F0', fontSize: '30px', fontWeight: 700 }}
          >
            Between sessions — the Loop keeps moving.
          </h2>

          <p
            className="mb-4"
            style={{
              color: 'rgba(240, 240, 240, 0.65)',
              fontSize: '15px',
              fontWeight: 400,
              maxWidth: '600px',
            }}
          >
            These clips show The Hangar as it runs — peer discussion threads,
            Navigator feedback on writing drafts, and the between-session
            momentum that makes 16 weeks feel like a system.
          </p>

          <GradePills
            variant="dark"
            activeGrade={hangarActiveGrade}
            onGradeChange={setHangarActiveGrade}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filterByGrade(hangarClips, hangarActiveGrade).map((clip, idx) => (
              <VideoCard
                key={idx}
                variant="dark"
                grade={clip.grade}
                badgeLabel={clip.activity}
                badgeType="activity"
                title={clip.title}
                metaLabel={clip.activityTag}
                duration={clip.duration}
                descriptor={clip.descriptor}
              />
            ))}
          </div>

          {filterByGrade(hangarClips, hangarActiveGrade).length === 0 && (
            <p
              style={{
                color: 'rgba(240,240,240,0.4)',
                fontSize: '14px',
                paddingTop: '12px',
              }}
            >
              No sessions available for this grade yet.
            </p>
          )}
        </div>
      </section>

      {/* ── S6 WHAT YOU JUST WATCHED ─────────────────────────────────────────── */}
      <section
        className="px-6 py-20 md:py-24"
        style={{ backgroundColor: '#F5F5FF' }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="mb-3 uppercase"
            style={{ color: '#b7b5fe', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em' }}
          >
            What You Observed
          </div>

          <h2
            className="mb-12"
            style={{
              color: '#0E0E12',
              fontSize: '28px',
              fontWeight: 700,
              maxWidth: '600px',
            }}
          >
            Every clip on this page is an extract from a real program session.
            Here is what you were watching for.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
            {[
              {
                program: 'Live Sessions (LS)',
                text: "The Navigator's silence is intentional — not a pause, a technique. When a Navigator holds space after asking for a student's position, they are training the student to think before they speak. Watch how long the student takes before answering. That interval gets shorter over 16 weeks.",
              },
              {
                program: 'Writing',
                text: 'The 6+1 Trait score the Navigator names is not a grade — it is a coordinate. It tells the student exactly where they are on a specific dimension of writing development, and exactly what the next point requires. Watch what the student does with that information.',
              },
              {
                program: 'The Hangar',
                text: "The peer discussion thread is not social time — it is the Think phase running between sessions. When a student defends a position in The Hangar three days before their next session, they arrive at that session having already done the cognitive work. Watch how the thread shapes what the student says in the following clip.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: '10px',
                  padding: '24px',
                  backgroundColor: '#FFFFFF',
                  borderTop: '3px solid #b7b5fe',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}
              >
                <h3
                  className="mb-3"
                  style={{ color: '#0E0E12', fontSize: '15px', fontWeight: 600 }}
                >
                  {card.program}
                </h3>
                <p
                  style={{
                    color: '#212830',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: 1.7,
                  }}
                >
                  {card.text}
                </p>
              </div>
            ))}
          </div>

          <p
            className="text-center mx-auto"
            style={{
              color: '#0E0E12',
              fontSize: '17px',
              fontWeight: 600,
              maxWidth: '560px',
              marginTop: '28px',
            }}
          >
            The 16-Week Program is these three programs, running together, for
            the same student, with the same Navigator.
          </p>
        </div>
      </section>

      {/* ── S7 CLOSING CTA ───────────────────────────────────────────────────── */}
      <section
        className="px-6 py-24"
        style={{ backgroundColor: '#212830' }}
      >
        <div
          className="mx-auto text-center"
          style={{ maxWidth: '580px' }}
        >
          <h2
            style={{
              color: '#b7b5fe',
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: 700,
              lineHeight: 1.3,
              marginBottom: '14px',
            }}
          >
            You've seen the sessions. The next step is a 20-minute call — where
            we show you what these sessions look like for your child specifically.
          </h2>

          <p
            style={{
              color: 'rgba(240, 240, 240, 0.65)',
              fontSize: '16px',
              fontWeight: 400,
              maxWidth: '480px',
              margin: '0 auto 32px',
            }}
          >
            The entrance assessment begins with one diagnostic call. No
            commitment required — just the numbers.
          </p>

          {/* Charter CTA — Gilt, used once */}
          <div className="mb-3">
            <Link
              href="/consult"
              className="inline-block px-8 py-3.5 rounded-lg transition-opacity hover:opacity-90"
              style={{
                backgroundColor: '#F5C842',
                color: '#0E0E12',
                fontSize: '16px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Book a Diagnostic Call
            </Link>
          </div>

          {/* Secondary CTA */}
          <div>
            <SecondaryButton href="/program">See the Full Program</SecondaryButton>
          </div>

          {/* Microcopy */}
          <p
            className="mt-3.5"
            style={{ color: '#b7b5fe', fontSize: '13px', fontWeight: 400 }}
          >
            20 minutes · A Navigator on the call · No obligation
          </p>
        </div>
      </section>

    </div>
  );
}