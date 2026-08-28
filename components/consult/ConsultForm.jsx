'use client'

import { useState } from 'react'

const ENDPOINT = '/api/consult-inquiry'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Field error message map → which copy string to use
function validate(values, errors) {
  const out = {}
  if (!values.guardianName.trim()) out.guardianName = errors.required
  if (!values.grade)               out.grade        = errors.required
  if (!values.topic.trim())        out.topic        = errors.required
  if (!values.email.trim())        out.email        = errors.required
  else if (!EMAIL_RE.test(values.email.trim())) out.email = errors.email
  return out
}

export default function ConsultForm({ locale = 'en', c }) {
  // Default preferred-contact by locale: EN→email, ZH→wechat (cultural fit)
  const defaultPreferred = locale === 'zh' ? 'wechat' : 'email'

  const [values, setValues] = useState({
    guardianName:     '',
    childName:        '',
    grade:            '',
    region:           '',
    topic:            '',
    email:            '',
    wechat:           '',
    preferredContact: defaultPreferred,
  })
  const [touched,   setTouched]   = useState({})
  const [submitState, setSubmitState] = useState('idle') // idle | sending | success | error
  const [networkError, setNetworkError] = useState('')
  // Snapshot of submitted values, used by the success view
  const [submitted, setSubmitted] = useState(null)

  const fieldErrors = validate(values, c.errors)
  // Only show an error if the user has touched the field (or attempted submit)
  const showError = (k) => touched[k] && fieldErrors[k]

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
  }
  const touch = (k) => () => setTouched((t) => ({ ...t, [k]: true }))

  const onSubmit = async (e) => {
    e.preventDefault()
    // Force-touch all so errors render
    setTouched({
      guardianName: true, grade: true, topic: true, email: true,
    })
    if (Object.keys(fieldErrors).length > 0) return

    setSubmitState('sending')
    setNetworkError('')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          locale,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || 'request_failed')
      }
      setSubmitted({ ...values })
      setSubmitState('success')
    } catch (err) {
      setSubmitState('error')
      setNetworkError(c.errors.network)
    }
  }

  if (submitState === 'success' && submitted) {
    return <SuccessState locale={locale} c={c.success} submitted={submitted} />
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby="consult-form-heading">
      {/* Header */}
      <p style={S.eyebrow}>{c.eyebrow}</p>
      <h2 id="consult-form-heading" style={S.h2}>{c.h2}</h2>
      <p style={S.h2zh}>{c.h2zh}</p>
      <p style={S.intro}>{c.intro}</p>

      {/* SECTION — child */}
      <SectionLabel>{c.sections.child}</SectionLabel>
      <div style={S.grid2}>
        <Field
          label={c.fields.childName.label}
          name="childName"
        >
          <input
            type="text"
            value={values.childName}
            onChange={set('childName')}
            placeholder={c.fields.childName.placeholder}
            style={S.input}
            autoComplete="off"
          />
        </Field>
        <Field
          label={c.fields.grade.label}
          name="grade"
          required
          error={showError('grade')}
        >
          <select
            value={values.grade}
            onChange={set('grade')}
            onBlur={touch('grade')}
            style={{ ...S.input, color: values.grade ? '#0E0E12' : '#888880' }}
            required
          >
            <option value="">{c.fields.grade.placeholder}</option>
            {c.grades.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </Field>
      </div>

      {/* SECTION — region */}
      <SectionLabel>{c.sections.region}</SectionLabel>
      <Field label={c.fields.region.label} name="region">
        <select
          value={values.region}
          onChange={set('region')}
          style={{ ...S.input, color: values.region ? '#0E0E12' : '#888880' }}
        >
          <option value="">{c.fields.region.placeholder}</option>
          {c.regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </Field>

      {/* SECTION — topic (the soul) */}
      <SectionLabel>{c.sections.topic}</SectionLabel>
      <Field
        label={c.fields.topic.label}
        name="topic"
        required
        error={showError('topic')}
      >
        <textarea
          rows={4}
          value={values.topic}
          onChange={set('topic')}
          onBlur={touch('topic')}
          placeholder={c.fields.topic.placeholder}
          maxLength={500}
          style={{ ...S.input, resize: 'vertical', minHeight: '110px', fontFamily: 'inherit', lineHeight: 1.6 }}
        />
      </Field>

      {/* SECTION — contact */}
      <SectionLabel>{c.sections.contact}</SectionLabel>
      <div style={S.grid2}>
        <Field
          label={c.fields.email.label}
          name="email"
          required
          error={showError('email')}
        >
          <input
            type="email"
            value={values.email}
            onChange={set('email')}
            onBlur={touch('email')}
            placeholder={c.fields.email.placeholder}
            style={S.input}
            autoComplete="email"
            required
          />
        </Field>
        <Field label={c.fields.wechat.label} name="wechat">
          <input
            type="text"
            value={values.wechat}
            onChange={set('wechat')}
            placeholder={c.fields.wechat.placeholder}
            style={S.input}
            autoComplete="off"
          />
        </Field>
      </div>

      {/* Preferred contact toggle */}
      <div style={{ marginBottom: '1.75rem' }}>
        <label style={S.label}>{c.fields.preferredContact.label}</label>
        <PreferredToggle
          value={values.preferredContact}
          onChange={(v) => setValues((s) => ({ ...s, preferredContact: v }))}
          labels={c.fields.preferredContact}
        />
      </div>

      {/* SECTION — guardian */}
      <SectionLabel>{c.sections.guardian}</SectionLabel>
      <Field
        label={c.fields.guardianName.label}
        name="guardianName"
        required
        error={showError('guardianName')}
      >
        <input
          type="text"
          value={values.guardianName}
          onChange={set('guardianName')}
          onBlur={touch('guardianName')}
          placeholder={c.fields.guardianName.placeholder}
          style={S.input}
          autoComplete="name"
          required
        />
      </Field>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitState === 'sending'}
        style={{
          ...S.submit,
          opacity: submitState === 'sending' ? 0.6 : 1,
          cursor:  submitState === 'sending' ? 'wait' : 'pointer',
        }}
      >
        {submitState === 'sending' ? c.submit.sending : c.submit.idle}
      </button>

      {submitState === 'error' && networkError && (
        <p role="alert" style={S.networkError}>{networkError}</p>
      )}
    </form>
  )
}

// ─────────────────────────────────────────────────────────────
// Small composables
// ─────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return <div style={S.sectionLabel}>{children}</div>
}

function Field({ label, name, required, error, children }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor={name} style={S.label}>
        {label}{required && <span style={{ color: 'var(--form-required-color)', marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {error && <p role="alert" style={S.fieldError}>{error}</p>}
    </div>
  )
}

function PreferredToggle({ value, onChange, labels }) {
  const opts = [
    { key: 'email',  label: labels.email },
    { key: 'wechat', label: labels.wechat },
  ]
  return (
    <div role="radiogroup" aria-label={labels.label} style={S.toggleWrap}>
      {opts.map((o) => {
        const active = value === o.key
        return (
          <button
            key={o.key}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.key)}
            style={{
              ...S.toggleOpt,
              color:        active ? '#ffffff' : '#5856cc',
              background:   active ? '#5856cc' : 'transparent',
              fontWeight:   active ? 500 : 400,
            }}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Success state — in-place replacement
// ─────────────────────────────────────────────────────────────

function SuccessState({ locale, c, submitted }) {
  const name = submitted.guardianName.trim().split(/\s+/)[0] || ''
  const h2 = c.h2.replace('{name}', name)
  const preferred = submitted.preferredContact // 'email' | 'wechat'

  return (
    <section aria-live="polite">
      <p style={S.eyebrow}>{c.eyebrow}</p>
      <h2 style={S.h2}>{h2}</h2>
      <p style={S.h2zh}>{c.h2zh}</p>
      <p style={{ ...S.body, marginTop: '1.25rem' }}>{c.body}</p>
      <p style={{ ...S.body, marginTop: '0.75rem', color: 'rgba(61,68,82,0.78)', maxWidth: '32rem' }}>{c.preface}</p>

      <div style={S.cardsGrid}>
        <ContactCard
          icon="✉"
          label={c.emailCard.label}
          value={c.emailCard.address}
          copyText={c.emailCard.address}
          ctaIdle={c.emailCard.cta}
          ctaDone={c.emailCard.copied}
          emphasized={preferred === 'email'}
        />
        <ContactCard
          icon="◆"
          label={c.wechatCard.label}
          valueLabel={c.wechatCard.idLabel}
          value={c.wechatCard.id}
          copyText={c.wechatCard.id}
          ctaIdle={c.wechatCard.cta}
          ctaDone={c.wechatCard.copied}
          emphasized={preferred === 'wechat'}
          mono
        />
      </div>

      <p style={S.mobileHint}>{c.wechatCard.mobileHint}</p>
    </section>
  )
}

function ContactCard({ icon, label, value, valueLabel, copyText, ctaIdle, ctaDone, emphasized, mono }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }
  return (
    <div
      style={{
        background:   '#ffffff',
        borderRadius: '12px',
        padding:      '1.375rem 1.125rem',
        border:       emphasized ? '2px solid #5856cc' : '1px solid rgba(183,181,254,0.25)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span aria-hidden="true" style={{ fontSize: 16, color: '#5856cc' }}>{icon}</span>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5856cc' }}>{label}</span>
      </div>
      {valueLabel && <p style={{ fontSize: 11, color: '#888880', margin: '0 0 4px' }}>{valueLabel}</p>}
      <p style={{
        fontSize:     15,
        fontWeight:   500,
        color:        '#0E0E12',
        margin:       '0 0 16px',
        wordBreak:    'break-all',
        fontFamily:   mono ? 'ui-monospace, SFMono-Regular, Menlo, monospace' : 'inherit',
      }}>{value}</p>
      <button
        type="button"
        onClick={onCopy}
        style={{
          display:      'inline-flex',
          alignItems:   'center',
          gap:          6,
          padding:      '8px 14px',
          fontSize:     12,
          fontWeight:   500,
          color:        '#5856cc',
          background:   'rgba(183,181,254,0.12)',
          border:       '1px solid rgba(183,181,254,0.35)',
          borderRadius: 6,
          cursor:       'pointer',
        }}
      >
        {copied ? ctaDone : ctaIdle}
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Style constants — inline pattern matches the rest of /consult
// ─────────────────────────────────────────────────────────────

const S = {
  eyebrow: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#5856cc',
    margin: '0 0 0.875rem',
  },
  h2: {
    fontSize:      'clamp(1.75rem, 3vw + 0.25rem, 2.75rem)',
    fontWeight:    700,
    lineHeight:    1.15,
    letterSpacing: '-0.025em',
    color:         '#0E0E12',
    textWrap:      'balance',
    margin:        0,
  },
  h2zh: {
    fontFamily: 'var(--font-cjk)',
    fontSize:   '15px',
    fontWeight: 500,
    color:      '#5856cc',
    lineHeight: 1.5,
    margin:     '0.5rem 0 0',
  },
  intro: {
    fontSize:   '1rem',
    lineHeight: 1.75,
    color:      '#3D4452',
    maxWidth:   '30rem',
    margin:     '1.25rem 0 2.25rem',
  },
  body: {
    fontSize:   '1rem',
    lineHeight: 1.75,
    color:      '#3D4452',
    maxWidth:   '32rem',
    margin:     0,
  },
  sectionLabel: {
    fontSize:      '0.625rem',
    fontWeight:    700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color:         'rgba(88,86,204,0.6)',
    margin:        '0 0 0.875rem',
  },
  label: {
    display:    'block',
    fontSize:   '0.8125rem',
    fontWeight: 500,
    color:      '#3D4452',
    marginBottom: '0.375rem',
  },
  input: {
    width:        '100%',
    padding:      '0.625rem 0.75rem',
    fontSize:     '0.875rem',
    background:   '#ffffff',
    border:       '1px solid rgba(183,181,254,0.35)',
    borderRadius: '8px',
    color:        '#0E0E12',
    boxSizing:    'border-box',
  },
  grid2: {
    display:             'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap:                 '0.875rem',
    marginBottom:        '1.5rem',
  },
  fieldError: {
    fontSize:   '0.75rem',
    color:      '#b91c1c',
    margin:     '0.375rem 0 0',
  },
  toggleWrap: {
    display:      'inline-flex',
    padding:      '3px',
    background:   '#ffffff',
    border:       '1px solid rgba(183,181,254,0.35)',
    borderRadius: '999px',
  },
  toggleOpt: {
    padding:      '7px 18px',
    fontSize:     '13px',
    border:       'none',
    cursor:       'pointer',
    borderRadius: '999px',
    fontFamily:   'inherit',
    transition:   'background 120ms ease, color 120ms ease',
  },
  submit: {
    width:         '100%',
    padding:       '14px 24px',
    fontSize:      '14px',
    fontWeight:    700,
    color:         '#ffffff',
    background:    '#5856cc',
    border:        'none',
    borderRadius:  '8px',
    letterSpacing: '0.01em',
    transition:    'background 120ms ease',
  },
  networkError: {
    fontSize:    '0.875rem',
    color:       '#b91c1c',
    margin:      '0.875rem 0 0',
    textAlign:   'center',
  },
  cardsGrid: {
    display:             'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap:                 '0.875rem',
    margin:              '1.5rem 0 0',
  },
  mobileHint: {
    fontSize:   '0.75rem',
    lineHeight: 1.6,
    color:      'var(--text-muted)',
    margin:     '1.125rem 0 0',
    textAlign:  'center',
  },
}
