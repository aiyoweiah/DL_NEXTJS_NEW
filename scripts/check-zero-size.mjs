#!/usr/bin/env node
// scripts/check-zero-size.mjs
//
// Geometry guard (D101): a decorative element that is PAINTED but occupies
// ZERO AREA is a defect. Nothing else in this repo can see that.
//
//   npm run check:geometry                verify
//   npm run check:geometry -- --update    bank a deliberate zero
//
// ─────────────────────────────────────────────────────────────────────
// THE FAILURE THIS EXISTS FOR (D100)
//
// The homepage hero's O-glyph watermark rendered 0x0 from 9ef48c0 until
// 97e96fc. Its wrapper was positioned by `top`+`right` alone, so its height
// was content-derived; the glyph inside asked for `height:100%`; a percentage
// against an indefinite parent resolves to zero. The hero shipped for that
// whole period with no figural background.
//
// All fourteen guards stayed green the entire time, and they were right to.
// Every one of them reads colour, type size, token resolution, or class
// inventory. A 0x0 element keeps its classes, resolves its tokens, and still
// counts as one element in every ratchet. It is present in every measure this
// repo takes and absent only on screen.
//
// ─────────────────────────────────────────────────────────────────────
// WHY THIS ONE NEEDS A BROWSER
//
// Nothing in the built HTML is wrong. `top:0; right:0` is a valid rule.
// `height:100%` is a valid rule. The defect exists only once something works
// out what "100%" refers to — and that answer is produced by layout, not
// stored in any file. So this guard cannot read like the others; it has to
// render. That is the whole reason it is expensive, and the whole reason
// (D101) it ships standalone rather than in `postbuild`: headless Chrome would
// otherwise have to install on Windows, the Mac AND Cloudflare's builder, and
// a guard that fails to install in the deploy path turns a healthy site into a
// failed deploy.
//
// It drives a browser already on the machine via puppeteer-core — never a
// bundled Chromium. `subset-font` was this repo's only devDependency and that
// leanness is deliberate. Set CHROME_PATH to override detection.
//
// ─────────────────────────────────────────────────────────────────────
// THE RULE: PAINTED, BUT ZERO AREA
//
//   painted   = checkVisibility({checkOpacity, checkVisibilityCSS})
//   zero area = getBoundingClientRect() is 0 in either axis
//
// `display:none` is DELIBERATE absence and must never be flagged. That single
// exclusion is what keeps the false-positive rate near zero, because
// responsive-hidden elements (`hidden sm:block`, `.sr-only`) resolve to
// display:none rather than to a zero box. checkVisibility() does not consider
// size, so a 0x0 element still reports as visible — which is exactly the
// anomaly we want.
//
// SCOPE (D101): decorative positioned elements only — aria-hidden, <svg>, or a
// background-image. `check-surfaces` and `check-utility-emitted` work because
// their baselines are small enough that a person actually reads the diff. A
// baseline of hundreds gets rubber-stamped, and a rubber-stamped guard reports
// green while seeing nothing.
//
// ─────────────────────────────────────────────────────────────────────
// VALIDATION RECORD — READ BEFORE TRUSTING A GREEN RUN
//
// Green output from an instrument never seen to go red is silence, not
// evidence (cohesion proposal Section 4). This guard was therefore run against
// 9a205a4 — the last build with the collapsed hero — BEFORE it was trusted
// anywhere. The recorded result lives in scripts/ZERO-SIZE-VALIDATION.md.
//
// If you change the detection rule, re-run that validation. A guard that stops
// being able to fail is worse than no guard: it manufactures confidence.

import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import puppeteer from 'puppeteer-core'

const OUT_DIR  = 'out'
const BASELINE = 'scripts/zero-size-baseline.json'
const UPDATE   = process.argv.includes('--update')

// D101: two viewports. They exercise both sides of nearly every responsive
// rule written here. Tablet is added only against a real bug found hiding there.
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'phone',   width: 375,  height: 812 },
]

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)

function findChrome () {
  for (const p of CHROME_CANDIDATES) if (fs.existsSync(p)) return p
  console.error('x zero-size: no Chrome or Edge found. Set CHROME_PATH to a browser executable.')
  process.exit(2)
}

// ── routes ───────────────────────────────────────────────────────────
function routes (dir = OUT_DIR, base = '') {
  const found = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) found.push(...routes(full, base + '/' + e.name))
    else if (e.name === 'index.html') found.push(base + '/')
    else if (e.name.endsWith('.html') && e.name !== '404.html') {
      found.push(base + '/' + e.name.replace(/\.html$/, ''))
    }
  }
  return found
}

// ── static server ────────────────────────────────────────────────────
const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon',
  '.txt': 'text/plain', '.webmanifest': 'application/manifest+json',
}

function serve () {
  const server = http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0])
    let file = path.join(OUT_DIR, p)
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
    if (!fs.existsSync(file)) file = path.join(OUT_DIR, p) + '.html'
    if (!fs.existsSync(file)) { res.writeHead(404); return res.end('not found') }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' })
    fs.createReadStream(file).pipe(res)
  })
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)))
}

// ── the probe, serialised into the page ──────────────────────────────
function probe () {
  const cssPath = (el) => {
    const parts = []
    let n = el
    while (n && n.nodeType === 1 && n.tagName.toLowerCase() !== 'body' && parts.length < 5) {
      let s = n.tagName.toLowerCase()
      const cls = (n.getAttribute('class') || '').trim().split(/\s+/).filter(Boolean).slice(0, 3).join('.')
      if (cls) s += '.' + cls
      const parent = n.parentElement
      if (parent) {
        const sibs = Array.from(parent.children).filter(c => c.tagName === n.tagName)
        if (sibs.length > 1) s += ':nth-of-type(' + (sibs.indexOf(n) + 1) + ')'
      }
      parts.unshift(s)
      n = n.parentElement
    }
    return parts.join('>')
  }

  const hits = []
  for (const el of document.querySelectorAll('*')) {
    const cs = getComputedStyle(el)
    const isSvg = el.tagName.toLowerCase() === 'svg'

    // SCOPE: decorative only
    const decorative = el.getAttribute('aria-hidden') === 'true' || isSvg || cs.backgroundImage !== 'none'
    if (!decorative) continue
    // ...and positioned. An <svg> is in scope wherever it sits.
    if (!isSvg && cs.position === 'static') continue

    // PAINTED? display:none and friends are deliberate absence — skip them.
    let painted
    try {
      painted = el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })
    } catch (e) {
      painted = cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity || '1') > 0
    }
    if (!painted) continue

    const r = el.getBoundingClientRect()
    if (r.width > 0 && r.height > 0) continue

    hits.push({ sel: cssPath(el), w: Math.round(r.width), h: Math.round(r.height) })
  }
  return hits
}

// ── main ─────────────────────────────────────────────────────────────
if (!fs.existsSync(OUT_DIR)) {
  console.error('x zero-size: no out/ directory. Run `npm run build` first.')
  process.exit(2)
}

const chrome = findChrome()
const server = await serve()
const port   = server.address().port
const list   = routes().sort()

const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox'] })
const page    = await browser.newPage()

const found = new Map()
for (const vp of VIEWPORTS) {
  await page.setViewport({ width: vp.width, height: vp.height })
  for (const route of list) {
    await page.goto('http://127.0.0.1:' + port + route, { waitUntil: 'networkidle0', timeout: 30000 })
    for (const hit of await page.evaluate(probe)) {
      found.set(route + ' @' + vp.name + ' :: ' + hit.sel, hit)
    }
  }
}

await browser.close()
server.close()

const banked = fs.existsSync(BASELINE)
  ? new Set(JSON.parse(fs.readFileSync(BASELINE, 'utf8')).zeros)
  : new Set()

const keys     = Array.from(found.keys()).sort()
const isNew    = keys.filter(k => !banked.has(k))
const departed = Array.from(banked).filter(k => !found.has(k)).sort()

if (UPDATE) {
  fs.writeFileSync(BASELINE, JSON.stringify({
    $comment: 'Elements that are painted but occupy zero area, and are accepted. See the header of check-zero-size.mjs. A NEW entry is a failure; bank one only when the zero is deliberate.',
    viewports: VIEWPORTS.map(v => v.width + 'x' + v.height),
    zeros: keys,
  }, null, 2) + '\n')
  console.log('* zero-size: banked ' + keys.length + ' accepted zero(s) across ' + list.length + ' routes.')
  process.exit(0)
}

console.log('  zero-size: ' + list.length + ' routes x ' + VIEWPORTS.length + ' viewports, '
  + keys.length + ' painted-but-zero element(s) found, ' + banked.size + ' banked.')

if (departed.length) {
  console.log('  note: ' + departed.length + ' banked zero(s) no longer occur — re-bank with --update when deliberate:')
  for (const k of departed.slice(0, 10)) console.log('    - ' + k)
}

if (isNew.length) {
  console.error('\nx zero-size: ' + isNew.length + ' element(s) are painted but render at zero area:\n')
  for (const k of isNew) {
    const h = found.get(k)
    console.error('    ' + k)
    console.error('      -> ' + h.w + ' x ' + h.h)
  }
  console.error('\n  A percentage height against a parent with no definite height resolves to zero (D100).')
  console.error('  Give the parent a definite size, or bank the zero with --update if it is deliberate.\n')
  process.exit(1)
}

console.log('* zero-size: no decorative element is painted at zero area.')
