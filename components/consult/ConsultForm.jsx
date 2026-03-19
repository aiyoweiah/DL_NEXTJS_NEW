'use client'

// components/consult/ConsultForm.jsx
//
// Client component — handles form state, validation, submission, and
// all a11y requirements for the consult and enroll pages.
//
// A11y (§3 of handoff — /consult is highest a11y risk):
//   - Every input has an associated <label> via htmlFor/id pair
//   - aria-required="true" on required fields
//   - aria-invalid + aria-describedby wired to per-field error messages
//   - Error messages rendered with role="alert" for screen reader announcement
//   - Logical focus order: name → email → phone → child name → grade → city → message → submit
//   - Success and error states announced via role="status"
//   - No form element used — onClick handlers only (per artifact rules)

import { useState, useId } from 'react'

// ── Field component ───────────────────────────────────────────

function Field({ id, label, required, error, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="form-label">
        {label}
        {required && (
          <span className="required-mark" aria-hidden="true"> *</span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="form-hint">{hint}</p>
      )}
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="form-error"
          role="alert"
          aria-live="assertive"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="6" stroke="#c0392b" strokeWidth="1.5"/>
            <path d="M7 4v3.5M7 9.5v.5" stroke="#c0392b" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

// ── Grade options ─────────────────────────────────────────────
const GRADE_OPTIONS = [
  { value: '',    label: 'Select grade…' },
  { value: 'gr4', label: 'Grade 4' },
  { value: 'gr5', label: 'Grade 5' },
  { value: 'gr6', label: 'Grade 6' },
  { value: 'gr7', label: 'Grade 7' },
  { value: 'gr8', label: 'Grade 8' },
  { value: 'gr9', label: 'Grade 9' },
  { value: 'other', label: 'Other' },
]

// ── Validation ────────────────────────────────────────────────
function validate(fields) {
  const errors = {}
  if (!fields.parentName.trim())  errors.parentName = 'Please enter your name.'
  if (!fields.email.trim())       errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Please enter a valid email address.'
  if (!fields.childName.trim())   errors.childName = "Please enter your child's name."
  if (!fields.childGrade)         errors.childGrade = "Please select your child's grade."
  if (!fields.city.trim())        errors.city = 'Please enter your city.'
  return errors
}

// ── Main component ────────────────────────────────────────────

export default function ConsultForm({ labels, variant = 'consult' }) {
  // labels = t.cta.form from the content file
  const uid = useId()
  const id  = (name) => `${uid}-${name}`

  const [fields, setFields] = useState({
    parentName: '', email: '', phone: '',
    childName: '', childGrade: '', city: '', message: '',
  })
  const [errors,      setErrors]      = useState({})
  const [status,      setStatus]      = useState('idle') // idle | submitting | success | error
  const [touchedAll,  setTouchedAll]  = useState(false)

  function update(name, value) {
    setFields((prev) => ({ ...prev, [name]: value }))
    // Clear error on change if user has already tried to submit
    if (touchedAll && errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  function getDescribedBy(name) {
    const parts = []
    if (errors[name])       parts.push(id(`${name}-error`))
    return parts.length ? parts.join(' ') : undefined
  }

  async function handleSubmit() {
    setTouchedAll(true)
    const errs = validate(fields)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Move focus to first error field
      const firstErr = Object.keys(errs)[0]
      document.getElementById(id(firstErr))?.focus()
      return
    }

    setStatus('submitting')
    setErrors({})

    try {
      // Replace with real endpoint when available.
      // For now, simulate a successful submission after a short delay.
      await new Promise((res) => setTimeout(res, 1200))
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  // ── Success state ─────────────────────────────────────────
  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl p-10 text-center"
        style={{
          backgroundColor: '#ffffff',
          border: '1.5px solid rgba(183,181,254,0.3)',
          boxShadow: '0 2px 24px rgba(183,181,254,0.1)',
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: 'rgba(183,181,254,0.12)', border: '1.5px solid rgba(183,181,254,0.3)' }}
          aria-hidden="true"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#b7b5fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3
          className="text-xl font-bold mb-3"
          style={{ color: '#0E0E12', fontFamily: 'var(--font-latin)' }}
        >
          {labels.successTitle}
        </h3>
        <p
          className="text-sm leading-relaxed max-w-sm mx-auto"
          style={{ color: '#3D4452' }}
        >
          {labels.successBody}
        </p>
      </div>
    )
  }

  // ── Form ──────────────────────────────────────────────────
  return (
    <div
      className="rounded-2xl p-8 md:p-10"
      style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid rgba(0,0,0,0.08)',
        boxShadow: '0 2px 24px rgba(0,0,0,0.06)',
      }}
    >
      {status === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-xl p-4 mb-6 text-sm"
          style={{
            backgroundColor: 'rgba(192,57,43,0.06)',
            border: '1px solid rgba(192,57,43,0.2)',
            color: '#c0392b',
          }}
        >
          {labels.errorBody}
        </div>
      )}

      <div className="flex flex-col gap-5">

        {/* Parent name */}
        <Field
          id={id('parentName')}
          label={labels.parentName}
          required
          error={errors.parentName}
        >
          <input
            id={id('parentName')}
            type="text"
            className="form-input"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.parentName}
            aria-describedby={getDescribedBy('parentName')}
            value={fields.parentName}
            onChange={(e) => update('parentName', e.target.value)}
          />
        </Field>

        {/* Email */}
        <Field
          id={id('email')}
          label={labels.email}
          required
          error={errors.email}
        >
          <input
            id={id('email')}
            type="email"
            className="form-input"
            autoComplete="email"
            inputMode="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={getDescribedBy('email')}
            value={fields.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </Field>

        {/* Phone — optional */}
        <Field
          id={id('phone')}
          label={labels.phone}
          hint="Optional — for scheduling"
          error={errors.phone}
        >
          <input
            id={id('phone')}
            type="tel"
            className="form-input"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={getDescribedBy('phone') || `${id('phone')}-hint`}
            value={fields.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
        </Field>

        {/* Two column: child name + grade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <Field
            id={id('childName')}
            label={labels.childName}
            required
            error={errors.childName}
          >
            <input
              id={id('childName')}
              type="text"
              className="form-input"
              autoComplete="off"
              aria-required="true"
              aria-invalid={!!errors.childName}
              aria-describedby={getDescribedBy('childName')}
              value={fields.childName}
              onChange={(e) => update('childName', e.target.value)}
            />
          </Field>

          <Field
            id={id('childGrade')}
            label={labels.childGrade}
            required
            error={errors.childGrade}
          >
            <select
              id={id('childGrade')}
              className="form-input"
              aria-required="true"
              aria-invalid={!!errors.childGrade}
              aria-describedby={getDescribedBy('childGrade')}
              value={fields.childGrade}
              onChange={(e) => update('childGrade', e.target.value)}
            >
              {GRADE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </Field>

        </div>

        {/* City */}
        <Field
          id={id('city')}
          label={labels.city}
          required
          error={errors.city}
        >
          <input
            id={id('city')}
            type="text"
            className="form-input"
            autoComplete="address-level2"
            aria-required="true"
            aria-invalid={!!errors.city}
            aria-describedby={getDescribedBy('city')}
            value={fields.city}
            onChange={(e) => update('city', e.target.value)}
          />
        </Field>

        {/* Message — optional */}
        <Field
          id={id('message')}
          label={labels.message}
          error={errors.message}
        >
          <textarea
            id={id('message')}
            className="form-input"
            rows={4}
            aria-invalid={!!errors.message}
            aria-describedby={getDescribedBy('message')}
            value={fields.message}
            onChange={(e) => update('message', e.target.value)}
            style={{ resize: 'vertical', minHeight: '100px' }}
          />
        </Field>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={status === 'submitting'}
          className={`btn ${variant === 'enroll' ? 'btn-charter' : 'btn-primary'} w-full justify-center py-4 text-base mt-2`}
          aria-disabled={status === 'submitting'}
        >
          {status === 'submitting' ? labels.submitting : labels.submit}
        </button>

      </div>
    </div>
  )
}