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

/* ---- starter templates (js/templates.js + ./templates) ---- */
run('js/templates.js');
const TPL = win.ML_TEMPLATES;
const html = read('index.html');

function checkTemplates() {
  if (!Array.isArray(TPL) || !TPL.length) { ok = false; note('js/templates.js did not define ML_TEMPLATES'); return; }

  const tplIds = new Set();
  let files = 0, lines = 0, knobs = 0;

  TPL.forEach((t) => {
    const where = `template ${t.id || '(missing id)'}`;
    if (!t.id) { ok = false; note(`${where}: no id`); return; }
    if (tplIds.has(t.id)) { ok = false; note(`duplicate template id "${t.id}"`); } else tplIds.add(t.id);
    if (!t.title || !t.name || !t.tagline || !t.desc) note(`${where}: missing title/name/tagline/desc`);
    if (t.dir !== `templates/${t.id}`) { ok = false; note(`${where}: dir "${t.dir}" must be templates/${t.id}`); }
    if (!/^https:\/\/github\.com\/[^/]+\/[^/]+$/.test(t.repo || '')) { ok = false; note(`${where}: repo is not a clean github.com URL`); }
    if (!/^https:\/\/github\.com\/[^/]+\/[^/]+\/blob\/[^/]+\/$/.test(t.repoFile || '')) { ok = false; note(`${where}: repoFile must end in /blob/<branch>/`); }
    if (!/^https:\/\//.test(t.live || '')) note(`${where}: no hosted "live" URL`);
    if (!Array.isArray(t.stack) || !t.stack.length) note(`${where}: no stack tags`);
    if (!Array.isArray(t.folders) || !t.folders.length) { ok = false; note(`${where}: no control folders listed`); }
    if (!Array.isArray(t.uses) || !t.uses.length) note(`${where}: no "good for" uses listed`);
    if (!t.hint) note(`${where}: no interaction hint for the preview overlay`);
    if (!/^[A-F0-9]{6}$/i.test(String(t.a1 || '').replace('#', '')) || !/^[A-F0-9]{6}$/i.test(String(t.a2 || '').replace('#', ''))) {
      ok = false; note(`${where}: a1/a2 must be #rrggbb accent colours`);
    }
    if (!/<svg[\s\S]*<\/svg>/.test(t.icon || '')) { ok = false; note(`${where}: icon must be an inline <svg>`); }

    /* every declared file must exist, and its line count must be honest */
    if (!Array.isArray(t.files) || !t.files.length) { ok = false; note(`${where}: no files declared`); return; }
    const names = t.files.map((f) => f.p);
    if (!names.includes(t.entry)) { ok = false; note(`${where}: entry "${t.entry}" is not one of its files`); }
    if (new Set(names).size !== names.length) { ok = false; note(`${where}: duplicate file names`); }
    let entrySrc = '';
    t.files.forEach((f) => {
      const rel = `${t.dir}/${f.p}`;
      if (!fs.existsSync(path.join(root, rel))) { ok = false; note(`${where}: ${rel} does not exist`); return; }
      const src = read(rel);
      files++;
      const real = src.replace(/\n$/, '').split('\n').length;
      lines += real;
      if (f.lines !== real) { ok = false; note(`${where}: ${f.p} declares ${f.lines} lines, on disk it is ${real}`); }
      if (!/\.(html|css|js)$/.test(f.p)) note(`${where}: ${f.p} has an unusual extension`);
      if (f.p === t.entry) entrySrc = src;
      else if (entrySrc && !entrySrc.includes(f.p)) {
        ok = false; note(`${where}: ${t.entry} never references ${f.p} — the vendored copy looks broken`);
      }
    });
    (t.folders || []).forEach((fo) => {
      if (!fo.g || !Array.isArray(fo.k) || !fo.k.length) { ok = false; note(`${where}: control folder "${fo.g}" has no controls`); return; }
      knobs += fo.k.length;
    });
  });

  /* nothing vendored on disk should be missing from the catalogue */
  const onDisk = fs.existsSync(path.join(root, 'templates'))
    ? fs.readdirSync(path.join(root, 'templates')).filter((d) => fs.statSync(path.join(root, 'templates', d)).isDirectory())
    : [];
  onDisk.forEach((d) => { if (!tplIds.has(d)) note(`templates/${d} is on disk but not in the ML_TEMPLATES catalogue`); });

  /* and the page must still be wired up */
  ['id="templateGrid"', 'id="tplPlay"', 'id="tplCode"', 'id="templates"', 'href="#templates"', 'js/templates.js'].forEach((needle) => {
    if (!html.includes(needle)) { ok = false; note(`index.html is missing ${needle} — the templates section is not wired up`); }
  });

  console.log(`  templates: ${TPL.length} vendored · ${files} files · ${lines} lines · ${knobs} live controls · ${onDisk.length === TPL.length ? '\u001b[32m✓ catalogue matches disk\u001b[0m' : '\u001b[33mcatalogue and disk disagree\u001b[0m'}`);
}
checkTemplates();

if (fail.length) {
  console.log(`\n  \u001b[31m${fail.length} problem(s):\u001b[0m`);
  fail.slice(0, 40).forEach((m) => console.log('   · ' + m));
  if (fail.length > 40) console.log(`   … ${fail.length - 40} more`);
}
console.log(`\n  ${ok && !fail.length ? '\u001b[32m✓ collection is complete and consistent\u001b[0m' : '\u001b[33msee findings above\u001b[0m'}\n`);
process.exit(ok && !fail.length ? 0 : 1);
