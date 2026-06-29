// Transactional email via Resend, sent from janet@dodolearning.com.
// Two messages per inquiry: parent confirmation + team notification.

const RESEND_URL = 'https://api.resend.com/emails'

async function resendSend(env, { to, subject, text, replyTo }) {
  const payload = {
    from:    env.INQUIRY_FROM_EMAIL,
    to:      Array.isArray(to) ? to : [to],
    subject,
    text,
  }
  if (replyTo) payload.reply_to = replyTo

  const r = await fetch(RESEND_URL, {
    method:  'POST',
    headers: {
      Authorization:  `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!r.ok) {
    const detail = await r.text().catch(() => '')
    throw new Error(`Resend ${r.status}: ${detail.slice(0, 200)}`)
  }
  return r.json()
}

// ─────────────────────────────────────────────────────────────
// Parent acknowledgment — handwritten-feel plain text
// ─────────────────────────────────────────────────────────────

export async function sendParentConfirmation(env, inquiry) {
  const firstName = (inquiry.guardianName || '').trim().split(/\s+/)[0]
  const child = (inquiry.childName || '').trim()
  const wechatId = env.WECHAT_HANDLE || '(WeChat ID coming soon)'
  const text = inquiry.locale === 'zh'
    ? zhParentText({ firstName, child, wechatId })
    : enParentText({ firstName, child, wechatId })
  const subject = inquiry.locale === 'zh'
    ? '已收到您的咨询 — Janet'
    : `Got your note${child ? ` about ${child}` : ''} — Janet`

  return resendSend(env, { to: inquiry.email, subject, text })
}

function enParentText({ firstName, child, wechatId }) {
  const greeting = firstName ? `Hi ${firstName},` : 'Hi,'
  const re       = child ? `about ${child}` : 'about your inquiry'
  return [
    greeting,
    ``,
    `Got your note ${re} — thanks for reaching out. I'll write back personally within one business day.`,
    ``,
    `If anything urgent comes up before then, WeChat (ID: ${wechatId}) is the fastest way to reach me.`,
    ``,
    `— Janet`,
    `DODO Learning`,
  ].join('\n')
}

function zhParentText({ firstName, child, wechatId }) {
  const greeting = firstName ? `${firstName}，您好，` : '您好，'
  const re       = child ? `关于 ${child} 的咨询` : '您的咨询信息'
  return [
    greeting,
    ``,
    `已收到${re}，感谢您的来信。我会在一个工作日内亲自回复您。`,
    ``,
    `如有更紧急的事项，欢迎通过微信联系我（微信号：${wechatId}），通常回复更快。`,
    ``,
    `— Janet`,
    `都学书院（DODO Learning）`,
  ].join('\n')
}

// ─────────────────────────────────────────────────────────────
// Team notification — inquiry digest
// ─────────────────────────────────────────────────────────────

export async function sendTeamNotification(env, { inquiry, recordUrl }) {
  const subject = `[Consult] ${inquiry.guardianName || '—'}${inquiry.childName ? ` (parent of ${inquiry.childName})` : ''}`
  const text = [
    `New consultation inquiry`,
    `──────────────────────────────`,
    `Parent:     ${inquiry.guardianName || '—'}`,
    `Child:      ${inquiry.childName || '—'}`,
    `Grade:      ${inquiry.grade || '—'}`,
    `Region:     ${inquiry.region || '—'}`,
    ``,
    `Email:      ${inquiry.email}`,
    `WeChat:     ${inquiry.wechat || '—'}`,
    `Prefers:    ${inquiry.preferredContact === 'wechat' ? 'WeChat' : 'Email'}`,
    `Locale:     ${(inquiry.locale || 'en').toUpperCase()}`,
    ``,
    `What's on their mind:`,
    inquiry.topic || '(empty)',
    ``,
    recordUrl ? `Open in Lark Base:\n${recordUrl}` : '',
  ].filter(Boolean).join('\n')

  return resendSend(env, {
    to:       env.INQUIRY_TEAM_EMAIL,
    subject,
    text,
    replyTo:  inquiry.email,
  })
}
