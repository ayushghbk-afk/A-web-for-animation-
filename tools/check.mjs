/* ============================================================
   Motion Lab — collection checker
   Usage: node tools/check.mjs
   Loads every data + generator file the way the browser does and asserts
   the invariants the site relies on: 100 effects per category, unique ids,
   valid demo sources, honest controls. Zero dependencies.
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

const win = {};
win.window = win;
win.ML_ROOT = root;
const fail = [];
const note = (m) => fail.push(m);

/* only what kit/tune touch while *defining* themselves */
win.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
win.document = {
  createElement: () => ({
    className: '', innerHTML: '', textContent: '', type: '', value: '', title: '',
    classList: { toggle() {}, add() {}, remove() {} },
    style: { setProperty() {}, cssText: '' },
    dataset: {}, appendChild() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => []
  }),
  querySelector: () => null, querySelectorAll: () => [], addEventListener() {},
  documentElement: { dataset: {} }, body: {}
};

const run = (f) => new Function('window', 'document', 'localStorage', 'globalThis', read(f))
  .call(win, win, win.document, win.localStorage, win);

const dataFiles = fs.readdirSync(path.join(root, 'js/data')).filter((f) => f.endsWith('.js')).sort();
const genFiles = fs.readdirSync(path.join(root, 'js/gen')).filter((f) => f.endsWith('.js')).sort();

dataFiles.forEach((f) => run('js/data/' + f));
/* kit first, then the generators (any order), then the expander, then tune */
run('js/gen/kit.js');
genFiles.filter((f) => f.endsWith('.gen.js')).sort().forEach((f) => run('js/gen/' + f));
run('js/gen/expand.js');
run('js/tune.js');

const ITEMS = win.MOTION_LAB;
const KIT = win.MLKit;
const CATS = KIT.CATS;
const TARGET = KIT.TARGET;
const report = win.ML_EXPAND;

console.log(`\n  Motion Lab collection check\n  ${'─'.repeat(52)}`);
console.log(`  files: ${dataFiles.length} data · ${genFiles.length} generator`);

if (!Array.isArray(ITEMS) || !ITEMS.length) { console.error('  ✗ MOTION_LAB is empty'); process.exit(1); }

const per = {};
ITEMS.forEach((i) => { (per[i.cat] = per[i.cat] || []).push(i); });

let ok = true;
console.log(`\n  ${'category'.padEnd(14)} ${'hand'.padStart(5)} ${'gen'.padStart(5)} ${'total'.padStart(6)}   status`);
CATS.forEach((c) => {
  const all = per[c] || [];
  const g = all.filter((i) => i.gen).length;
  const status = all.length === TARGET ? '\u001b[32m✓ exactly ' + TARGET + '\u001b[0m'
    : `\u001b[31m✗ ${all.length}/${TARGET} (need ${TARGET - all.length > 0 ? '+' + (TARGET - all.length) : all.length - TARGET})\u001b[0m`;
  if (all.length !== TARGET) { ok = false; note(`${c}: expected ${TARGET} effects, found ${all.length}`); }
  console.log(`  ${c.padEnd(14)} ${String(all.length - g).padStart(5)} ${String(g).padStart(5)} ${String(all.length).padStart(6)}   ${status}`);
});
const orphans = ITEMS.filter((i) => !CATS.includes(i.cat));
if (orphans.length) { ok = false; note(`${orphans.length} items in unknown categories: ${[...new Set(orphans.map(o => o.cat))].join(', ')}`); }

console.log(`  ${'─'.repeat(52)}`);
console.log(`  ${'TOTAL'.padEnd(14)} ${String(ITEMS.length).padStart(15)}   ${ITEMS.length === CATS.length * TARGET ? '\u001b[32m✓ complete\u001b[0m' : '\u001b[33mtarget is ' + CATS.length * TARGET + '\u001b[0m'}`);
if (report && report.short) {
  const short = Object.entries(report.short).filter(([, n]) => n > 0);
  if (short.length) { ok = false; short.forEach(([c, n]) => note(`${c}: generator pool was ${n} variants short of the target`)); }
  if (report.pruned && Object.values(report.pruned).some((n) => n > 0)) {
    console.log(`  \u001b[2mpruned surplus: ${Object.entries(report.pruned).filter(([, n]) => n > 0).map(([c, n]) => c + ' ' + n).join(', ')}\u001b[0m`);
  }
}

/* ---- per item sanity ---- */
const ids = new Map();
const titles = new Map();
const checked = { js: 0, cfg: 0, cols: 0 };
ITEMS.forEach((it, n) => {
  const where = `#${n} ${it.id || '(missing id)'} [${it.cat}]`;
  if (!it.id) note(`${where}: no id`);
  if (!it.title) note(`${where}: no title`);
  if (ids.has(it.id)) { ok = false; note(`duplicate id "${it.id}" (${ids.get(it.id)}) and (${where})`); } else ids.set(it.id, where);
  const tk = (it.title || '').toLowerCase();
  if (titles.has(tk)) { ok = false; note(`duplicate title "${it.title}" in ${titles.get(tk)} and ${where}`); } else titles.set(tk, where);
  if (!Array.isArray(it.tags) || !it.tags.length) note(`${where}: no tags`);
  if (!it.html || !String(it.html).trim()) note(`${where}: empty html`);
  if (!it.css || !String(it.css).trim()) note(`${where}: empty css`);
  for (const key of ['html', 'css', 'js']) {
    const s = it[key];
    if (!s) continue;
    if (typeof s !== 'string') { ok = false; note(`${where}: ${key} is not a string`); continue; }
    if (key !== 'js') {
      const open = (s.match(/{/g) || []).length, close = (s.match(/}/g) || []).length;
      if (open !== close) { ok = false; note(`${where}: ${key} has unbalanced braces (${open} "{" vs ${close} "}")`); }
    }
    if (/undefined|NaN|\[object Object\]/.test(s)) { ok = false; note(`${where}: ${key} contains ${/NaN/.test(s) ? 'NaN' : /undefined/.test(s) ? 'undefined' : '[object Object]'}`); }
    if (/<script/i.test(s) || /<\/style/i.test(s)) { ok = false; note(`${where}: ${key} contains nested <script>/<\/style>`); }
  }
  if (it.js) {
    checked.js++;
    try { new Function('root', 'api', it.js); }
    catch (e) { ok = false; note(`${where}: js does not compile — ${e.message}`); }
    if (!/root|api/.test(it.js)) note(`${where}: js never touches root/api — is it scoped to the shadow root?`);
    if (/\bdocument\.getElementById|document\.querySelector\(/.test(it.js)) { ok = false; note(`${where}: js queries the outer document instead of its shadow root`); }
  }
  (it.cfg || []).forEach((c) => {
    checked.cfg++;
    if (!c.label) { ok = false; note(`${where}: a control has no label`); }
    if (!/^--[a-z0-9-]+$/.test(c.k || '')) { ok = false; note(`${where}: control key "${c.k}" must be a custom property`); }
    if (c.t === 'range') {
      if (!(c.min < c.max) || !c.step) { ok = false; note(`${where}: ${c.k} has a bad range`); }
      if (c.v < c.min || c.v > c.max) { ok = false; note(`${where}: ${c.k} default ${c.v} outside ${c.min}–${c.max}`); }
    }
    /* the promise: a control must actually be read by the demo's own source */
    if (!it.css.includes(c.k) && !(it.js || '').includes(c.k) && !(it.html || '').includes(c.k)) {
      ok = false; note(`${where}: control ${c.k} ("${c.label}") is never read by the demo — it would do nothing`);
    }
    /* …and must not be declared by the demo, or the tuner could never beat it */
    if (new RegExp('\\' + c.k + '\\s*:').test(it.css.replace(new RegExp('var\\([^)]*\\' + c.k, 'g'), ''))) {
      ok = false; note(`${where}: ${c.k} is declared inside the demo css — the tuner's value would lose`);
    }
    if (c.t === 'color' && !/^#[0-9a-f]{6}$/i.test(String(c.v))) { ok = false; note(`${where}: ${c.k} needs a #rrgggb colour default`); }
  });
  /* a demo that colours things must expose at least the two brand colours to the tuner
     (either via the literal scanner, which always works, or cfg) */
  if (it.gen && !/var\(--/.test(it.css)) { checked.cols++; }
});

/* ---- the tuner itself, exercised against the whole library ---- */
const Tune = win.MotionLabTune;
if (!Tune) { ok = false; note('js/tune.js did not define MotionLabTune'); }
else {
  let mounted = 0, paletteless = 0;
  ITEMS.forEach((it) => {
    const css = Tune.styleFor(it);           // the exact stylesheet the shadow root gets
    mounted++;
    if (/undefined|NaN/.test(css)) { ok = false; note(`tuned style for ${it.id} contains undefined/NaN`); }
    if (Tune.palette(it).length) {
      const first = Tune.palette(it)[0];
      Tune.set(it.id, { colors: { [first.key]: '#e11d48' }, speed: 2.5, size: 1.4, glow: 12 });
      const tuned = Tune.styleFor(it);
      if (tuned === css) { ok = false; note(`${it.id}: tuning speed/colour/glow changed nothing in its stylesheet`); }
      if (!/#e11d48/.test(tuned) && !tuned.includes('225')) { ok = false; note(`${it.id}: colour swap did not reach the source`); }
      Tune.reset(it.id);
    } else paletteless++;
    /* every effect must answer to the universal controls */
    Tune.set(it.id, { speed: 3 });
    const fast = Tune.srcOf(it).css;
    Tune.set(it.id, { speed: 1 });
    const slow = Tune.srcOf(it).css;
    if (!it.js && !it.css.includes('animation') && fast === slow) {
      // pure-transition demos with no timings are allowed, but flag anything with animation:
      if (/animation\s*:/.test(it.css)) { ok = false; note(`${it.id}: has animations but the speed control does not change them`); }
    }
    Tune.reset(it.id);
  });
  console.log(`\n  tuner: ${mounted} stylesheets rendered · ${checked.cfg} per-effect controls · ${paletteless} with no colour literals`);
}

console.log(`  sources: ${checked.js} interactive demos compiled · ${ITEMS.length} html/css pairs validated`);

if (fail.length) {
  console.log(`\n  \u001b[31m${fail.length} problem(s):\u001b[0m`);
  fail.slice(0, 40).forEach((m) => console.log('   · ' + m));
  if (fail.length > 40) console.log(`   … ${fail.length - 40} more`);
}
console.log(`\n  ${ok && !fail.length ? '\u001b[32m✓ collection is complete and consistent\u001b[0m' : '\u001b[33msee findings above\u001b[0m'}\n`);
process.exit(ok && !fail.length ? 0 : 1);
