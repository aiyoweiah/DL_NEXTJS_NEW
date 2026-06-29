// Transactional email via Resend, sent from janet@dodolearning.com.
// Two messages per inquiry: parent confirmation + team notification.
//
// Voice: the parent ack is intentionally plain text, signed by Janet
// personally. The job of this email is to read like a real note from the
// founder, not a marketing acknowledgment — so no HTML chrome, no header
// logo. See docs/SUCCESSOR_HANDOFF.md § "2026-06-28" for the rationale.

const RESEND_URL = 'https://api.resend.com/emails'

// WECHAT_HANDLE values that should suppress the WeChat paragraph (so we
// don't surface "WeChat ID: pending" in a personally-signed email).
const PLACEHOLDER_WECHAT = /^(pending|placeholder|tbd|todo|unset|coming\s*soon)$/i

async function resendSend(env, { to, subject, text, replyTo }) {
  const fromName  = (env.INQUIRY_FROM_NAME || '').trim()
  const fromEmail = env.INQUIRY_FROM_EMAIL
  const from = fromName ? `${fromName} <${fromEmail}>` : fromEmail

  const payload = {
    from,
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

function realWechatId(env) {
  const v = (env.WECHAT_HANDLE || '').trim()
  if (!v) return ''
  if (PLACEHOLDER_WECHAT.test(v)) return ''
  return v
}

// ─────────────────────────────────────────────────────────────
// Parent acknowledgment — handwritten-feel plain text
// ─────────────────────────────────────────────────────────────

export async function sendParentConfirmation(env, inquiry) {
  const firstName = (inquiry.guardianName || '').trim().split(/\s+/)[0]
  const child     = (inquiry.childName || '').trim()
  const wechatId  = realWechatId(env)

  const isZh    = inquiry.locale === 'zh'
  const subject = isZh
    ? zhSubject({ firstName, child })
    : enSubject({ firstName, child })
  const text = isZh
    ? zhParentText({ firstName, child, wechatId })
    : enParentText({ firstName, child, wechatId })

  return resendSend(env, { to: inquiry.email, subject, text })
}

// ─── Subjects ──────────────────────────────────────────────

function enSubject({ firstName, child }) {
  if (child)     return `Got your note about ${child} — Janet`
  if (firstName) return `Got your note, ${firstName} — Janet`
  return 'Got your note — Janet'
}

function zhSubject({ firstName, child }) {
  if (child)     return `已收到关于 ${child} 的咨询 — Janet`
  if (firstName) return `${firstName}，已收到您的咨询 — Janet`
  return '已收到您的咨询 — Janet'
}

// ─── Bodies ────────────────────────────────────────────────

function enParentText({ firstName, child, wechatId }) {
  const greeting = firstName ? `Hi ${firstName},` : 'Hi,'
  const re       = child ? `about ${child}` : 'about your inquiry'
  const wechatLine = wechatId
    ? `If you prefer WeChat for the back-and-forth, my ID is ${wechatId} — go ahead and add me there too.`
    : ''
  return [
    greeting,
    ``,
    `Got your note ${re} — thanks for reaching out. I'll write back myself within one business day, usually sooner.`,
    wechatLine ? `` : null,
    wechatLine || null,
    ``,
    child
      ? `When I do, I'll ask a couple of quick questions about ${child}'s reading right now, then point you toward the right starting place — whether that's the ELA Program, Little DODO, or just a longer conversation.`
      : `When I do, I'll ask a couple of quick questions about where your child is right now, then point you toward the right starting place — whether that's the ELA Program, Little DODO, or just a longer conversation.`,
    ``,
    `If you don't hear from me within two business days, please reply to this email — once in a while a message slips into spam.`,
    ``,
    `— Janet`,
    `Founder, DODO Learning`,
  ].filter((l) => l !== null).join('\n')
}

function zhParentText({ firstName, child, wechatId }) {
  const greeting = firstName ? `${firstName}，您好，` : '您好，'
  const re       = child ? `关于 ${child} 的咨询` : '您的咨询信息'
  const wechatLine = wechatId
    ? `如果您更习惯用微信沟通，可以加我的微信号 ${wechatId}。`
    : ''
  return [
    greeting,
    ``,
    `已收到${re}，感谢您的来信。我会在一个工作日内亲自回信，通常更快。`,
    wechatLine ? `` : null,
    wechatLine || null,
    ``,
    child
      ? `回信时我会简单了解一下 ${child} 目前的阅读情况，然后建议从哪里开始最合适——是 ELA 课程、都学启蒙，还是先继续聊一聊。`
      : `回信时我会简单了解一下孩子目前的阅读情况，然后建议从哪里开始最合适——是 ELA 课程、都学启蒙，还是先继续聊一聊。`,
    ``,
    `如果两个工作日内您还没收到我的回复，烦请直接回复这封邮件——偶尔会有信件误入垃圾邮箱。`,
    ``,
    `— Janet`,
    `都学书院 创始人`,
  ].filter((l) => l !== null).join('\n')
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
