/* ============================================================
   Motion Lab — collection stats
   Usage: node tools/stats.mjs
   Prints the numbers the README quotes: effects per category, how many are
   customisable, how many knobs that adds up to, and the biggest families.
   Zero dependencies, zero build.
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

const win = {};
win.window = win;
win.ML_ROOT = root;
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
run('js/gen/kit.js');
genFiles.filter((f) => f.endsWith('.gen.js')).sort().forEach((f) => run('js/gen/' + f));
run('js/gen/expand.js');
run('js/tune.js');

const ITEMS = win.MOTION_LAB;
const KIT = win.MLKit;
const T = win.MotionLabTune || {};
const BASE = T.BASE ? Object.keys(T.BASE).length : 10;
const CATS = KIT.CATS;
const TARGET = KIT.TARGET;
const LABEL = {
  loaders: 'Loaders', buttons: 'Buttons', text: 'Text FX', cards: 'Cards & Hover',
  backgrounds: 'Backgrounds', controls: 'Controls', svg: 'SVG & Lines', '3d': '3D', motion: 'Interaction'
};

const pad = (v, n) => String(v) + ' '.repeat(Math.max(0, n - String(v).length));
const per = {};
ITEMS.forEach((i) => { (per[i.cat] = per[i.cat] || []).push(i); });

let extra = 0;
let tuned = 0;
const families = new Map();
const tagged = ITEMS.filter((i) => i.cfg && i.cfg.length).length;

console.log(`\n  Motion Lab collection\n  ${'─'.repeat(56)}`);
console.log(`  ${'category'.padEnd(18)}${'hand'.padStart(5)}${'gen'.padStart(6)}${'total'.padStart(7)}${'knobs'.padStart(7)}`);
CATS.forEach((c) => {
  const list = per[c] || [];
  const hand = list.filter((i) => !i.gen).length;
  const k = list.reduce((n, i) => n + ((i.cfg && i.cfg.length) ? i.cfg.length : 0), 0);
  extra += k;
  tuned += list.filter((i) => i.cfg && i.cfg.length).length;
  list.forEach((i) => {
    const fam = i.tags && i.tags[1] ? i.tags[1] : 'hand';
    families.set(c + ' · ' + fam, (families.get(c + ' · ' + fam) || 0) + 1);
  });
  console.log(`  ${(LABEL[c] || c).padEnd(18)}${String(hand).padStart(5)}${String(list.length - hand).padStart(6)}${String(list.length).padStart(7)}${String(k).padStart(7)}`);
});
console.log(`  ${'─'.repeat(56)}`);
console.log(`  ${'TOTAL'.padEnd(18)}${String(ITEMS.filter((i) => !i.gen).length).padStart(5)}${String(ITEMS.filter((i) => i.gen).length).padStart(6)}${String(ITEMS.length).padStart(7)}${String(extra).padStart(7)}`);
console.log('\n  every effect answers ' + BASE + ' shared knobs: speed, size, angle, hue,');
console.log('  saturation, glow, blur, opacity, direction, easing');
console.log(`  ${tagged} of ${ITEMS.length} effects also carry their own parameters — ${extra} in total, ${(extra / ITEMS.length).toFixed(1)} average per effect`);
const byCat = new Map();
[...families.entries()].forEach(([k]) => {
  const c = k.split(' · ')[0];
  byCat.set(c, (byCat.get(c) || 0) + 1);
});
console.log(`  ${families.size} mechanic families — ${CATS.map((c) => (LABEL[c] || c) + ' ' + (byCat.get(c) || 1)).join(', ')}\n`);
