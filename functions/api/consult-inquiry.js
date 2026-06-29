// Cloudflare Pages Function — POST /api/consult-inquiry
// Handles the consult-form submission: writes to Lark Base, posts to Lead Pulse,
// sends parent confirmation + team notification emails.
//
// Lark write GATES the success response. IM card + emails fire in parallel and
// log on failure but don't fail the request — we'd rather have the inquiry
// captured with a missing email than lose it entirely.
//
// Required env vars (set in Cloudflare Pages → Settings → Environment variables):
//   LARK_DOMAIN            https://open.larksuite.com
//   LARK_APP_ID            cli_...   (reuse Claude_Lark's existing app)
//   LARK_APP_SECRET        ...
//   LARK_BASE_TOKEN        NU1ibehBKanCRksN2rQjpLZ4pkd
//   LARK_LEADS_TABLE_ID    tblXJZXEN9FDlRV2
//   LARK_TRIAGE_CHAT_ID    oc_c64846eee6852c3123c51e551ed42870  (Lead Pulse)
//   RESEND_API_KEY         re_...
//   INQUIRY_FROM_EMAIL     janet@dodolearning.com  (must be a verified domain in Resend)
//   INQUIRY_TEAM_EMAIL     janet@dodolearning.com
//   WECHAT_HANDLE          (the WeChat ID surfaced in the parent confirmation email)

import { createLeadRecord, postLeadCard }                  from '../_lib/lark.js'
import { sendParentConfirmation, sendTeamNotification }    from '../_lib/email.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function onRequestPost({ request, env }) {
  // 1. Parse + shape body
  let body
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400)
  }

  // 2. Validate
  const inquiry = {
    guardianName:     str(body.guardianName),
    childName:        str(body.childName),
    grade:            str(body.grade),
    region:           str(body.region),
    topic:            str(body.topic),
    email:            str(body.email),
    wechat:           str(body.wechat),
    preferredContact: body.preferredContact === 'wechat' ? 'wechat' : 'email',
    locale:           body.locale === 'zh' ? 'zh' : 'en',
    sourcePage:       str(body.sourcePage),
  }
  const missing = []
  if (!inquiry.guardianName) missing.push('guardianName')
  if (!inquiry.grade)        missing.push('grade')
  if (!inquiry.topic)        missing.push('topic')
  if (!inquiry.email)        missing.push('email')
  else if (!EMAIL_RE.test(inquiry.email)) missing.push('email')
  if (missing.length) {
    return json({ ok: false, error: 'validation_failed', fields: missing }, 400)
  }

  // 3. Lark Base write — gates the response
  let recordId, recordUrl
  try {
    const result = await createLeadRecord(env, inquiry)
    recordId  = result.record_id
    recordUrl = result.recordUrl
  } catch (err) {
    console.error('lark_record_create_failed', err?.message || err)
    return json({ ok: false, error: 'storage_unavailable' }, 503)
  }

  // 4. Side-effects in parallel — failures logged, not fatal
  const results = await Promise.allSettled([
    postLeadCard(env, { inquiry, recordUrl }),
    sendParentConfirmation(env, inquiry),
    sendTeamNotification(env, { inquiry, recordUrl }),
  ])
  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      const label = ['lead_pulse_card', 'parent_email', 'team_email'][i]
      console.error(`${label}_failed`, r.reason?.message || r.reason)
    }
  })

  return json({ ok: true, recordId })
}

// 405 anything that isn't POST so we don't leak the route to bots
export async function onRequest({ request }) {
  if (request.method === 'POST') return // delegates to onRequestPost
  return new Response('Method Not Allowed', {
    status:  405,
    headers: { Allow: 'POST' },
  })
}

// ─────────────────────────────────────────────────────────────
// Tiny helpers
// ─────────────────────────────────────────────────────────────

function str(v) {
  return typeof v === 'string' ? v.trim() : ''
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type':  'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
