// Thin Lark Open API client for the consult inquiry endpoint.
// Runs in the Cloudflare Workers runtime — fetch + globals only, no Node APIs.

let cachedToken = null
let cachedExp   = 0

async function tenantToken(env) {
  const now = Math.floor(Date.now() / 1000)
  if (cachedToken && cachedExp - 60 > now) return cachedToken

  const r = await fetch(`${env.LARK_DOMAIN}/open-apis/auth/v3/tenant_access_token/internal`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body:    JSON.stringify({ app_id: env.LARK_APP_ID, app_secret: env.LARK_APP_SECRET }),
  })
  const data = await r.json()
  if (data.code !== 0) {
    throw new Error(`Lark token error ${data.code}: ${data.msg}`)
  }
  cachedToken = data.tenant_access_token
  cachedExp   = now + (data.expire ?? 1800)
  return cachedToken
}

async function larkPost(env, path, body) {
  const token = await tenantToken(env)
  const r = await fetch(`${env.LARK_DOMAIN}${path}`, {
    method:  'POST',
    headers: {
      Authorization:  `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  })
  const data = await r.json()
  if (data.code !== 0) {
    throw new Error(`Lark API ${path} error ${data.code}: ${data.msg}`)
  }
  return data.data ?? {}
}

// ─────────────────────────────────────────────────────────────
// Public
// ─────────────────────────────────────────────────────────────

/**
 * Create a Consultation & Lead record.
 * Returns { record_id, recordUrl }.
 */
export async function createLeadRecord(env, inquiry) {
  const fields = buildFields(inquiry)
  const path   = `/open-apis/bitable/v1/apps/${env.LARK_BASE_TOKEN}/tables/${env.LARK_LEADS_TABLE_ID}/records`
  const data   = await larkPost(env, path, { fields })
  const record_id = data?.record?.record_id
  const recordUrl = record_id
    ? `https://kjplgrv3thz4.jp.larksuite.com/base/${env.LARK_BASE_TOKEN}?table=${env.LARK_LEADS_TABLE_ID}&record=${record_id}`
    : null
  return { record_id, recordUrl }
}

/**
 * Post an interactive card to Lead Pulse summarising the inquiry.
 */
export async function postLeadCard(env, { inquiry, recordUrl }) {
  const card = buildCard(inquiry, recordUrl)
  const path = `/open-apis/im/v1/messages?receive_id_type=chat_id`
  await larkPost(env, path, {
    receive_id: env.LARK_TRIAGE_CHAT_ID,
    msg_type:   'interactive',
    content:    JSON.stringify(card),
  })
}

// ─────────────────────────────────────────────────────────────
// Internal — field mapping + card construction
// ─────────────────────────────────────────────────────────────

function buildFields(i) {
  // The form sends preferredContact='email'|'wechat' and locale='en'|'zh'.
  // Lark's single-selects expect the canonical option names.
  const preferred = i.preferredContact === 'wechat' ? 'WeChat' : 'Email'
  const localeOpt = i.locale === 'zh' ? 'ZH' : 'EN'

  // Prepend source-page tag to the topic so sales sees where the inquiry came in.
  const notes = [
    i.sourcePage ? `[${i.sourcePage}]` : '',
    i.topic?.trim() || '',
  ].filter(Boolean).join(' ')

  const fields = {
    'Guardian Name':     i.guardianName?.trim() || '',
    'Email':             i.email?.trim() || '',
    'Notes':             notes,
    'Lead Source':       'Website',
    'Funnel Stage':      'Inquiry',
    'Lead Temperature':  'Interested',
    'Preferred Contact': preferred,
    'Locale':            localeOpt,
  }

  // Optional fields — only set when populated, so Lark doesn't store empty strings.
  if (i.childName?.trim()) fields['Student Full Name'] = i.childName.trim()
  if (i.wechat?.trim())    fields['WeChat ID']         = i.wechat.trim()
  if (i.grade)             fields['Grade Level']       = i.grade
  if (i.region)            fields['Geography']         = i.region

  // Strip empty values so Lark doesn't reject the request.
  return Object.fromEntries(
    Object.entries(fields).filter(([_, v]) => v !== '' && v != null)
  )
}

function buildCard(i, recordUrl) {
  const lines = []
  lines.push(`**${i.guardianName || '—'}**${i.childName ? `  ·  parent of *${i.childName}*` : ''}`)
  if (i.grade)  lines.push(`Grade: **${i.grade}**${i.region ? `  ·  ${i.region}` : ''}`)
  lines.push('')
  lines.push(`> ${(i.topic || '').slice(0, 400).replace(/\n/g, '\n> ')}`)
  lines.push('')
  const contactBits = []
  if (i.email)  contactBits.push(`✉ ${i.email}`)
  if (i.wechat) contactBits.push(`💬 ${i.wechat}`)
  if (contactBits.length) lines.push(contactBits.join('   '))
  lines.push(`_Prefers:_ **${i.preferredContact === 'wechat' ? 'WeChat' : 'Email'}**  ·  _Locale:_ ${i.locale?.toUpperCase() || 'EN'}`)

  const elements = [
    { tag: 'markdown', content: lines.join('\n') },
  ]
  if (recordUrl) {
    elements.push({
      tag: 'action',
      actions: [{
        tag:  'button',
        text: { tag: 'plain_text', content: 'Open in Base' },
        type: 'primary',
        url:  recordUrl,
      }],
    })
  }

  return {
    config: { wide_screen_mode: true },
    header: {
      template: 'blue',
      title:    { tag: 'plain_text', content: '📥 New Consultation Inquiry' },
    },
    elements,
  }
}
