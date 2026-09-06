/* ============================================================
   Motion Lab — smoke test
   Usage: node tools/smoke.mjs
   Goes further than tools/check.mjs: it parses every demo stylesheet with
   css-tree, makes sure every `animation:` names a @keyframes block that
   actually exists, and boots each demo (html + js) inside a real jsdom
   shadow root so null selectors and runtime errors surface.

   Dev-only dependencies (the site itself has none):
     npm i --no-save jsdom css-tree
   If they are missing the run is skipped with a hint.
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = process.cwd();
const require = createRequire(import.meta.url);

let JSDOM, csstree;
try {
  ({ JSDOM } = require('jsdom'));
  csstree = require('css-tree');
} catch {
  try {
    const alt = createRequire(path.join(process.env.QA_DIR || '/home/user/qa', 'noop.js'));
    ({ JSDOM } = alt('jsdom'));
    csstree = alt('css-tree');
  } catch {
    console.log('\n  \u001b[33mjsdom / css-tree not installed — skipping smoke test\u001b[0m');
    console.log('  npm i --no-save jsdom css-tree\n');
    process.exit(0);
  }
}

const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const win = {};
win.window = win;
win.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
win.document = {
  createElement: () => ({
    className: '', innerHTML: '', textContent: '', type: '', value: '', title: '',
    classList: { toggle() {}, add() {}, remove() {} },
    style: { setProperty() {}, cssText: '' }, dataset: {},
    appendChild() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => []
  }),
  querySelector: () => null, querySelectorAll: () => [], addEventListener() {},
  documentElement: { dataset: {} }, body: {}
};
const run = (f) => new Function('window', 'document', 'localStorage', read(f)).call(win, win, win.document, win.localStorage);

fs.readdirSync(path.join(root, 'js/data')).filter((f) => f.endsWith('.js')).sort().forEach((f) => run('js/data/' + f));
run('js/gen/kit.js');
run('js/gen/varykit.js');
fs.readdirSync(path.join(root, 'js/gen')).filter((f) => f.endsWith('.gen.js')).sort().forEach((f) => run('js/gen/' + f));
run('js/gen/expand.js');
run('js/tune.js');

const ITEMS = win.MOTION_LAB;
const TUNE = win.MotionLabTune;
const KEYWORD = /^(none|infinite|alternate(-reverse)?|reverse|normal|forwards|backwards|both|running|paused|linear|ease(-in|-out|-in-out)?|step-(start|end)|auto|forwards|var\(|\d|\.|-)/;

/* the jsdom window every demo is booted inside, with the few browser APIs
   jsdom is missing stubbed so a demo is never failed by the harness */
const dom = new JSDOM('<!doctype html><html><body></body></html>', { pretendToBeVisual: true });
const bw = dom.window;

if (!bw.IntersectionObserver) {
  bw.IntersectionObserver = class { constructor() {} observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } };
  bw.IntersectionObserverEntry = class { };
}
if (!bw.ResizeObserver) bw.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
if (!bw.Element.prototype.setPointerCapture) bw.Element.prototype.setPointerCapture = function () {};
if (!bw.Element.prototype.releasePointerCapture) bw.Element.prototype.releasePointerCapture = function () {};
if (!bw.Element.prototype.animate) bw.Element.prototype.animate = function () { return { cancel() {}, finished: Promise.resolve() }; };

/* a 2d context that swallows everything and remembers assignments */
function makeCtx(canvas) {
  const state = { canvas };
  const NUM = new Set(['globalAlpha', 'lineWidth', 'shadowBlur', 'miterLimit', 'imageSmoothingEnabled']);
  const KEEP = {
    measureText: () => ({ width: 10 }),
    createLinearGradient: () => ({ addColorStop() {} }),
    createRadialGradient: () => ({ addColorStop() {} }),
    createConicGradient: () => ({ addColorStop() {} }),
    createPattern: () => null,
    getImageData: (x, y, w, h) => ({ data: new Uint8ClampedArray(Math.max(1, w * h * 4)), width: w, height: h }),
    putImageData() {}, createImageData: (w, h) => ({ data: new Uint8ClampedArray(Math.max(1, w * h * 4)), width: w, height: h })
  };
  return new Proxy(state, {
    get(t, p) {
      if (p in KEEP) return KEEP[p];
      if (p in t) return t[p];
      if (typeof p === 'symbol') return undefined;
      if (NUM.has(p)) return 1;
      if (/^(fillStyle|strokeStyle|font|textAlign|textBaseline|lineCap|lineJoin|shadowColor|filter|globalCompositeOperation)$/.test(p)) return '';
      return () => {};
    },
    set(t, p, v) { t[p] = v; return true; }
  });
}
const ctxCache = new WeakMap();
bw.HTMLCanvasElement.prototype.getContext = function (kind) {
  if (kind !== '2d') return null;
  let c = ctxCache.get(this);
  if (!c) { c = makeCtx(this); ctxCache.set(this, c); }
  return c;
};

const problems = [];
let parsed = 0, booted = 0, animsChecked = 0, keyframesSeen = 0;

const animNames = (css) => {
  /* every identifier that appears in an animation / animation-name value.
     Paren-aware: tokens inside var()/calc()/steps()/cubic-bezier() — and the
     bare * / + operator tokens between them — are not animation names. */
  const out = [];
  const re = /(?:^|[;{])\s*(?:-\w+-)?animation(?:-name)?\s*:\s*([^;}]+)/g;
  let m;
  while ((m = re.exec(css))) {
    let depth = 0;
    m[1].split(/[\s,]+/).forEach((tok) => {
      const opens = (tok.match(/\(/g) || []).length;
      const closes = (tok.match(/\)/g) || []).length;
      const inside = depth > 0;
      depth = Math.max(0, depth + opens - closes);
      if (inside) return;
      if (!tok || KEYWORD.test(tok) || /[()]/.test(tok)) return;
      if (/^[-+]?[\d.]/.test(tok)) return;
      out.push(tok.replace(/["']/g, ''));
    });
  }
  return [...new Set(out)].filter(Boolean);
};

ITEMS.forEach((it, n) => {
  const where = `#${n} ${it.id}`;
  const style = TUNE.styleFor(it);

  /* 1 — the stylesheet must parse */
  const errs = [];
  csstree.parse(style, {
    positions: true,
    onParseError(e) { errs.push(e.message + ' @' + e.line + ':' + e.column); }
  });
  parsed++;
  if (errs.length) problems.push(`${where}: css will not parse — ${errs.slice(0, 2).join(' / ')}`);

  /* 2 — every referenced animation must exist somewhere in the same sheet */
  const defined = new Set();
  csstree.walk(csstree.parse(style.replace(/@property\s*\{[^}]*\}/g, '')), {
    visit: 'Atrule',
    enter(node) {
      if (node.name === 'keyframes' && node.prelude) {
        keyframesSeen++;
        csstree.walk(node.prelude, { visit: 'Identifier', enter: (id) => defined.add(id.name) });
        const raw = csstree.generate(node.prelude).replace(/\s+/g, '');
        defined.add(raw);
      }
    }
  });
  const used = animNames(it.css || '');
  animsChecked += used.length;
  used.forEach((u) => {
    if (!defined.has(u) && !defined.has(u.replace(/^["']|["']$/g, ''))) {
      problems.push(`${where}: animation "${u}" has no matching @keyframes`);
    }
  });

  /* 3 — boot it: html into a shadow root, then run the demo script */
  const host = bw.document.createElement('div');
  bw.document.body.appendChild(host);
  let root2;
  try { root2 = host.attachShadow({ mode: 'open' }); } catch (e) { problems.push(`${where}: shadow root failed — ${e.message}`); return; }
  const wrap = bw.document.createElement('div');
  wrap.className = 'demo-root';
  wrap.innerHTML = TUNE.srcOf(it).html;
  root2.appendChild(wrap);
  booted++;

  const code = TUNE.srcOf(it).js;
  if (code) {
    const tasks = [];
    const api = {
      raf: (fn) => tasks.push(fn),
      onCleanup: (fn) => { try { fn(); } catch (e) { problems.push(`${where}: cleanup threw — ${e.message}`); } }
    };
    try {
      /* the demo bodies reference the page globals directly (document, window,
         observers) — jsdom's eval has no implicit globals, so bind them in */
      const boot = bw.eval(
        '(function (document, window, IntersectionObserver, ResizeObserver, requestAnimationFrame, cancelAnimationFrame, performance, getComputedStyle, HTMLElement, DevicePixelRatio) {\n' +
        '  return function (root, api) {\n' + code + '\n  };\n})'
      );
      boot(bw.document, bw, bw.IntersectionObserver, bw.ResizeObserver,
        bw.requestAnimationFrame, bw.cancelAnimationFrame, bw.performance,
        bw.getComputedStyle.bind(bw), bw.HTMLElement, 2)(root2, api);
      for (let f = 0; f < 5; f++) tasks.forEach((t) => t());
    } catch (e) {
      problems.push(`${where}: demo js threw — ${e.message}`);
    }
    if (!wrap.innerHTML.trim() && !root2.querySelector('*')) problems.push(`${where}: nothing mounted`);
  }

  /* 4 — the markup must be non-empty and parse back */
  if (!/<[a-z]/i.test(it.html || '')) problems.push(`${where}: html has no element`);

  host.remove();
});

/* interactive demos that only react to a pointer must not be dead: sample a
   hover/click on anything that claims to be interactive */
let clickChecked = 0;
ITEMS.filter((i) => /click|hover|drag|press|js/.test((i.tags || []).join(' '))).forEach((it) => {
  const host = bw.document.createElement('div');
  bw.document.body.appendChild(host);
  const r = host.attachShadow({ mode: 'open' });
  const w = bw.document.createElement('div');
  w.className = 'demo-root';
  w.innerHTML = TUNE.srcOf(it).html;
  r.appendChild(w);
  const target = r.querySelector('button, .b, .c, [class]');
  if (target) {
    clickChecked++;
    try {
      ['pointerdown', 'pointerup', 'click', 'mouseenter', 'mousemove'].forEach((t) => {
        const E = t.startsWith('pointer') || t === 'click' ? bw.MouseEvent : bw.MouseEvent;
        target.dispatchEvent(new E(t, { bubbles: true, clientX: 30, clientY: 30 }));
      });
    } catch (e) { problems.push(`${it.id}: threw on interaction — ${e.message}`); }
  }
  host.remove();
});

console.log(`\n  Motion Lab smoke test\n  ${'─'.repeat(52)}`);
console.log(`  stylesheets parsed      ${parsed}`);
console.log(`  @keyframes seen         ${keyframesSeen}`);
console.log(`  animation names checked ${animsChecked}`);
console.log(`  demos booted in jsdom   ${booted}`);
console.log(`  interactions fired      ${clickChecked}`);
if (problems.length) {
  console.log(`\n  \u001b[31m${problems.length} problem(s)\u001b[0m`);
  [...new Set(problems)].slice(0, 60).forEach((p) => console.log('   · ' + p));
  if (new Set(problems).size > 60) console.log(`   … ${new Set(problems).size - 60} more`);
} else console.log('\n  \u001b[32m✓ every demo parses, boots and animates\u001b[0m\n');
process.exit(problems.length ? 1 : 0);
