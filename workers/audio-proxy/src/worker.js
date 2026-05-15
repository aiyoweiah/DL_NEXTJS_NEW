// workers/audio-proxy/src/worker.js
//
// Cloudflare Worker — audio proxy for dodo-audiobooks R2 bucket.
//
// Routes:
//   OPTIONS *         → CORS preflight (for fetch() calls from dodolearning.com)
//   POST /auth        → validate PASSWORD secret, issue signed session cookie
//   GET  /auth        → check if current cookie is still valid
//   GET  /<key>       → validate cookie, proxy object from R2 (range-aware)
//   HEAD /<key>       → same, no body
//
// Secrets required (set via wrangler secret put):
//   PASSWORD          → the shared access code users enter
//   COOKIE_SECRET     → 32-byte hex string used to sign session cookies
//
// Cookie: dodo_ab_session=<expiry_ms>.<hmac_base64>
//   HttpOnly + Secure + SameSite=Lax + 30-day Max-Age
//   dodolearning.com and audio.dodolearning.com share the same eTLD+1,
//   so Lax cookies from audio.* are sent on requests from the main site.

const COOKIE_NAME      = 'dodo_ab_session'
const SESSION_SECONDS  = 60 * 60 * 24 * 30   // 30 days
const ALLOWED_ORIGIN   = 'https://dodolearning.com'

export default {
  async fetch(request, env) {
    const { method } = request
    const pathname   = new URL(request.url).pathname

    if (method === 'OPTIONS')                        return preflight()
    if (pathname === '/auth' && method === 'GET')    return checkSession(request, env)
    if (pathname === '/auth' && method === 'POST')   return createSession(request, env)
    if (method === 'GET' || method === 'HEAD')       return proxyAudio(request, env)

    return new Response('Method not allowed', { status: 405 })
  },
}

// ── POST /auth ────────────────────────────────────────────────
// Validates the submitted password against the PASSWORD secret.
// On success, sets a signed HttpOnly session cookie.
async function createSession(request, env) {
  let body
  try { body = await request.json() } catch {
    return addCors(new Response('Bad request', { status: 400 }))
  }

  if (!body?.password || body.password !== env.PASSWORD) {
    return addCors(jsonResponse({ ok: false }, 401))
  }

  const expiry = Date.now() + SESSION_SECONDS * 1000
  const mac    = await hmac(String(expiry), env.COOKIE_SECRET)
  const cookie = [
    `${COOKIE_NAME}=${expiry}.${mac}`,
    `Path=/`,
    `Max-Age=${SESSION_SECONDS}`,
    `HttpOnly`,
    `Secure`,
    `SameSite=Lax`,
  ].join('; ')

  return addCors(jsonResponse({ ok: true }, 200, { 'Set-Cookie': cookie }))
}

// ── GET /auth ─────────────────────────────────────────────────
// Returns 200 if cookie is valid, 401 if missing/expired/invalid.
// Called by AudiobooksGate on mount to decide whether to skip the form.
async function checkSession(request, env) {
  const valid = await isValidSession(request, env)
  return addCors(jsonResponse({ ok: valid }, valid ? 200 : 401))
}

// ── GET|HEAD /<key> ───────────────────────────────────────────
// Validates session cookie, then proxies the R2 object.
// Passes through Range headers so the audio player can seek.
async function proxyAudio(request, env) {
  if (!(await isValidSession(request, env))) {
    return new Response('Unauthorized', { status: 401 })
  }

  const key = new URL(request.url).pathname.slice(1)
  if (!key) return new Response('Not found', { status: 404 })

  // Parse Range header (browsers send this for audio seeking)
  const rangeHeader = request.headers.get('Range')
  let rangeOption
  if (rangeHeader) {
    const m = rangeHeader.match(/^bytes=(\d+)-(\d*)$/)
    if (m) {
      rangeOption = m[2]
        ? { offset: +m[1], length: +m[2] - +m[1] + 1 }
        : { offset: +m[1] }
    }
  }

  const object = await env.AUDIO_BUCKET.get(key, rangeOption ? { range: rangeOption } : undefined)
  if (!object) return new Response('Not found', { status: 404 })

  const headers = new Headers()
  object.writeHttpMetadata(headers)   // sets Content-Type and any stored metadata
  headers.set('ETag', object.httpEtag)
  headers.set('Accept-Ranges', 'bytes')
  headers.set('Cache-Control', 'private, max-age=3600')

  let status = 200
  if (rangeOption && object.range) {
    const { offset, length } = object.range
    headers.set('Content-Range', `bytes ${offset}-${offset + length - 1}/${object.size}`)
    headers.set('Content-Length', String(length))
    status = 206
  }

  return new Response(request.method === 'HEAD' ? null : object.body, { status, headers })
}

// ── Session validation ────────────────────────────────────────
async function isValidSession(request, env) {
  const raw = getCookie(request.headers.get('Cookie') ?? '', COOKIE_NAME)
  if (!raw) return false

  const dot = raw.lastIndexOf('.')
  if (dot === -1) return false

  const expiry = raw.slice(0, dot)
  const mac    = raw.slice(dot + 1)

  if (Date.now() > Number(expiry)) return false

  const expected = await hmac(expiry, env.COOKIE_SECRET)
  return mac === expected
}

// ── HMAC-SHA256 (base64) ──────────────────────────────────────
async function hmac(data, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
}

// ── Cookie parsing ────────────────────────────────────────────
function getCookie(header, name) {
  for (const part of header.split(';')) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim()
  }
  return null
}

// ── CORS helpers ──────────────────────────────────────────────
// Only /auth needs CORS headers — audio requests from <audio src> and
// <a download> are no-CORS and send cookies automatically (same-site).
function preflight() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin':      ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods':     'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers':     'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age':           '86400',
    },
  })
}

function addCors(response) {
  const r = new Response(response.body, response)
  r.headers.set('Access-Control-Allow-Origin',      ALLOWED_ORIGIN)
  r.headers.set('Access-Control-Allow-Credentials', 'true')
  return r
}

function jsonResponse(body, status, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  })
}
