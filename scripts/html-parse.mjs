// scripts/html-parse.mjs
//
// A small, dependency-free HTML parser, shared by the build-output guards.
//
// WHY THIS EXISTS
//
// The architecture-cohesion retrospective (docs/architecture-cohesion-proposal.md)
// traced nine defects to one shape: every escapee was hand-rolled, and every sweep
// matched ONE SPELLING of one shape. The instance worth naming here is D70/D71 — a
// sweep declared "46 pills → 0", and it was wrong, because its detector was a regex
// that assumed the pill's text was a DIRECT CHILD of the rounded element. Six pills
// nested their text one level down and survived a run that reported completion.
//
// So the rule for every guard that reads built output is: PARSE, DO NOT REGEX.
// A regex cannot answer "is this element inside a control", "what classes does this
// node carry after everything composed", or "what text does this subtree actually
// contain". Those are the questions the guards keep needing, and getting wrong.
//
// WHY NOT A LIBRARY
//
// `out/` is our own static export: well-formed, no user-authored markup, no
// document.write, no legacy quirks. That is a far smaller problem than the general
// web, and it is worth ~200 lines to keep `prebuild`/`postbuild` free of an install
// step. The build runs on Cloudflare Pages with nothing but what package.json pins.
//
// This is NOT a spec-compliant HTML5 tree builder. It does no implied-end-tag
// handling, no foster parenting, no adoption agency. If markup needing those ever
// reaches `out/`, something else has gone wrong first.

const VOID = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
])

// Elements whose content is text, not markup. Everything up to the matching close
// tag is taken verbatim — otherwise a `<` inside a script body starts a bogus tag.
const RAW = new Set(['script', 'style', 'textarea'])

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }

function decode(s) {
  if (!s.includes('&')) return s
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, body) => {
    if (body[0] === '#') {
      const code = body[1] === 'x' || body[1] === 'X'
        ? parseInt(body.slice(2), 16)
        : parseInt(body.slice(1), 10)
      return Number.isFinite(code) ? String.fromCodePoint(code) : m
    }
    return ENTITIES[body.toLowerCase()] ?? m
  })
}

/**
 * Parse an HTML document into a tree.
 *
 * Node shapes:
 *   element  { type:'element', tag, attrs:{}, children:[], parent, line }
 *   text     { type:'text', value, parent }
 *
 * The root is a synthetic element with tag '#root'.
 */
export function parse(html) {
  const root = { type: 'element', tag: '#root', attrs: {}, children: [], parent: null, line: 1 }
  const stack = [root]
  const top = () => stack[stack.length - 1]

  // Line numbers are wanted in guard output, and counting newlines per node is
  // quadratic on a 400 KB page. Advance a cursor once instead.
  let lineNo = 1
  let seen = 0
  const lineAt = (index) => {
    while (seen < index) {
      if (html.charCodeAt(seen) === 10) lineNo++
      seen++
    }
    return lineNo
  }

  const pushText = (raw) => {
    if (!raw) return
    top().children.push({ type: 'text', value: decode(raw), parent: top() })
  }

  let i = 0
  while (i < html.length) {
    const lt = html.indexOf('<', i)
    if (lt === -1) { pushText(html.slice(i)); break }
    if (lt > i) pushText(html.slice(i, lt))

    if (html.startsWith('<!--', lt)) {
      const end = html.indexOf('-->', lt + 4)
      i = end === -1 ? html.length : end + 3
      continue
    }
    if (html.startsWith('<!', lt) || html.startsWith('<?', lt)) {
      const end = html.indexOf('>', lt)
      i = end === -1 ? html.length : end + 1
      continue
    }
    if (html.startsWith('</', lt)) {
      const end = html.indexOf('>', lt)
      if (end === -1) { i = html.length; continue }
      const name = html.slice(lt + 2, end).trim().toLowerCase()
      // Pop to the nearest matching open tag. An unmatched close tag is stray —
      // drop it rather than unwinding the whole document.
      for (let d = stack.length - 1; d > 0; d--) {
        if (stack[d].tag === name) { stack.length = d; break }
      }
      i = end + 1
      continue
    }
    // A bare `<` in text, e.g. "a < b"
    if (!/[a-zA-Z]/.test(html[lt + 1] ?? '')) { pushText('<'); i = lt + 1; continue }

    const { tag, attrs, selfClosing, end } = readTag(html, lt)
    const node = { type: 'element', tag, attrs, children: [], parent: top(), line: lineAt(lt) }
    top().children.push(node)
    i = end

    if (selfClosing || VOID.has(tag)) continue

    if (RAW.has(tag)) {
      const close = html.toLowerCase().indexOf('</' + tag, i)
      const stop = close === -1 ? html.length : close
      if (stop > i) node.children.push({ type: 'text', value: html.slice(i, stop), parent: node })
      const gt = close === -1 ? html.length : html.indexOf('>', close)
      i = gt === -1 ? html.length : gt + 1
      continue
    }

    stack.push(node)
  }

  return root
}

function readTag(html, start) {
  let i = start + 1
  const nameStart = i
  while (i < html.length && /[^\s/>]/.test(html[i])) i++
  const tag = html.slice(nameStart, i).toLowerCase()
  const attrs = {}

  while (i < html.length) {
    while (i < html.length && /\s/.test(html[i])) i++
    if (i >= html.length) break
    if (html[i] === '>') return { tag, attrs, selfClosing: false, end: i + 1 }
    if (html[i] === '/' && html[i + 1] === '>') return { tag, attrs, selfClosing: true, end: i + 2 }

    const attrStart = i
    while (i < html.length && /[^\s=/>]/.test(html[i])) i++
    // A lone `/` among the attributes is noise; step over it.
    if (i === attrStart) { i++; continue }
    const name = html.slice(attrStart, i).toLowerCase()

    while (i < html.length && /\s/.test(html[i])) i++
    if (html[i] !== '=') { attrs[name] = ''; continue }
    i++
    while (i < html.length && /\s/.test(html[i])) i++

    const q = html[i]
    if (q === '"' || q === "'") {
      const end = html.indexOf(q, i + 1)
      const stop = end === -1 ? html.length : end
      attrs[name] = decode(html.slice(i + 1, stop))
      i = stop + 1
    } else {
      const vs = i
      while (i < html.length && /[^\s>]/.test(html[i])) i++
      attrs[name] = decode(html.slice(vs, i))
    }
  }
  return { tag, attrs, selfClosing: false, end: i }
}

/** Depth-first walk over every element node (text nodes skipped). */
export function walk(node, fn) {
  for (const child of node.children ?? []) {
    if (child.type !== 'element') continue
    fn(child)
    walk(child, fn)
  }
}

/** Every element matching a predicate, in document order. */
export function findAll(root, pred) {
  const out = []
  walk(root, (el) => { if (pred(el)) out.push(el) })
  return out
}

/** Classes on an element. */
export function classList(el) {
  return (el.attrs.class || '').split(/\s+/).filter(Boolean)
}

/**
 * The element's inline `style` as a Map of property → value. Declarations split on
 * top-level `;` only, so `background:url(data:…;base64,…)` survives intact.
 */
export function styleMap(el) {
  const out = new Map()
  const css = el.attrs.style
  if (!css) return out
  let depth = 0
  let buf = ''
  const flush = () => {
    const decl = buf.trim()
    buf = ''
    if (!decl) return
    const c = decl.indexOf(':')
    if (c === -1) return
    out.set(decl.slice(0, c).trim().toLowerCase(), decl.slice(c + 1).trim())
  }
  for (const ch of css) {
    if (ch === '(') depth++
    else if (ch === ')') depth--
    if (ch === ';' && depth === 0) { flush(); continue }
    buf += ch
  }
  flush()
  return out
}

/** All text in the subtree, whitespace-collapsed. */
export function text(el) {
  let out = ''
  const rec = (n) => {
    for (const c of n.children ?? []) {
      if (c.type === 'text') out += c.value
      else if (!RAW.has(c.tag)) rec(c)
    }
  }
  rec(el)
  return out.replace(/\s+/g, ' ').trim()
}

/** The nearest ancestor satisfying a predicate, or null. */
export function closest(el, pred) {
  let n = el.parent
  while (n && n.tag !== '#root') {
    if (pred(n)) return n
    n = n.parent
  }
  return null
}

/** A short, stable description of a node, for guard output. */
export function describe(el) {
  const id = el.attrs.id ? '#' + el.attrs.id : ''
  const classes = classList(el)
  const cls = classes.slice(0, 3).map((c) => '.' + c).join('')
  return '<' + el.tag + id + cls + (classes.length > 3 ? '…' : '') + '>'
}
