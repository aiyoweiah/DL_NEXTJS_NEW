// scripts/indexnow-submit.mjs — push the sitemap's URLs to IndexNow (Bing, Yandex, Seznam, Naver share the endpoint).
//
// Why: ChatGPT's browse and Copilot read the Bing index. Bing recrawled the homepage slowly enough
// that the retired tagline was still in its title two weeks after D45. IndexNow tells Bing which URLs
// changed at deploy time instead of waiting for a crawl. It needs no Webmaster Tools account — only the
// key file served at the site root (public/<key>.txt), which Bing fetches to verify ownership.
//
// Usage (after a deploy has gone live, never before — the key file must be reachable):
//   node scripts/indexnow-submit.mjs                 # every <loc> in out/sitemap.xml (build first)
//   node scripts/indexnow-submit.mjs /en/ /zh/       # specific paths
//   node scripts/indexnow-submit.mjs --dry-run       # print the payload, send nothing
//
// The key lives in scripts/indexnow.json ({ "key": "<32 hex>" }) and the same value is the file name
// and the content of public/<key>.txt. Rotating the key means regenerating both.

import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const ROOT = resolve(process.cwd())
const HOST = 'www.dodolearning.com'
const ENDPOINT = 'https://api.indexnow.org/indexnow'

const cfg = JSON.parse(readFileSync(resolve(ROOT, 'scripts/indexnow.json'), 'utf8'))
const key = cfg.key
if (!/^[a-f0-9]{32}$/.test(key)) { console.error('x indexnow: scripts/indexnow.json key must be 32 hex chars'); process.exit(2) }
const keyFile = resolve(ROOT, 'public', `${key}.txt`)
if (!existsSync(keyFile) || readFileSync(keyFile, 'utf8').trim() !== key) {
  console.error(`x indexnow: public/${key}.txt is missing or does not contain the key`); process.exit(2)
}

const args = process.argv.slice(2)
const dry = args.includes('--dry-run')
const paths = args.filter(a => a.startsWith('/'))

let urls
if (paths.length) {
  urls = paths.map(p => `https://${HOST}${p}`)
} else {
  const sitemapPath = resolve(ROOT, 'out/sitemap.xml')
  if (!existsSync(sitemapPath)) { console.error('x indexnow: out/sitemap.xml not found — run npm run build first, or pass paths'); process.exit(2) }
  const xml = readFileSync(sitemapPath, 'utf8')
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim())
  // the sitemap lists /en/ primaries; IndexNow should also learn the ZH alternates
  const zh = urls.map(u => u.replace(`https://${HOST}/en`, `https://${HOST}/zh`)).filter(u => !urls.includes(u))
  urls = [...urls, ...zh, `https://${HOST}/llms.txt`, `https://${HOST}/llms-full.txt`, `https://${HOST}/llms-full.zh.txt`]
}
urls = [...new Set(urls)].slice(0, 10000)

const payload = { host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList: urls }
console.log(`indexnow: ${urls.length} URL(s) → ${ENDPOINT}${dry ? ' (dry run)' : ''}`)
if (dry) { console.log(JSON.stringify(payload, null, 2)); process.exit(0) }

const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(payload) })
// 200 OK · 202 Accepted (key validation pending) · 400 bad request · 403 key not valid · 422 URLs not on host · 429 too many
console.log(`indexnow: HTTP ${res.status} ${res.statusText}`)
if (res.status >= 400) { console.log(await res.text()); process.exit(1) }
console.log('✓ indexnow: submitted. Bing verifies the key file asynchronously; a 202 is normal on the first call.')
