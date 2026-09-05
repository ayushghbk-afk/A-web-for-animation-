/* ============================================================
   Motion Lab — touch & small-screen behaviour test
   Usage: QA_DIR=/tmp/qa node tools/touch.mjs   (or after `npm i --no-save jsdom`)
   Goes where the CSS linter cannot: it boots the *whole* page inside jsdom
   at a phone width and at a desktop width, then drives the chrome the way a
   thumb does — hamburger, drawer search, relocated toggles, dialog stacking,
   theme flip — and asserts the page is left in a state you can still scroll.
   Dev-only dependency (the site itself has none): jsdom.
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = process.cwd();
const require = createRequire(import.meta.url);

let JSDOM, VirtualConsole;
try {
  ({ JSDOM, VirtualConsole } = require('jsdom'));
} catch {
  try {
    const alt = createRequire(path.join(process.env.QA_DIR || '/home/user/qa', 'noop.js'));
    ({ JSDOM, VirtualConsole } = alt('jsdom'));
  } catch {
    console.log('\n  \u001b[33mjsdom not installed — skipping the touch behaviour test\u001b[0m');
    console.log('  npm i --no-save --prefix /tmp/qa jsdom   →   QA_DIR=/tmp/qa node tools/touch.mjs\n');
    process.exit(0);
  }
}

const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const results = [];
const check = (label, cond) => {
  results.push({ label, ok: !!cond });
  console.log(`   ${cond ? '\u001b[32m✓\u001b[0m' : '\u001b[31m✗\u001b[0m'} ${label}`);
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* every `<script src>` is inlined: jsdom will not fetch the page's own files */
function pageSource() {
  let html = read('index.html');
  html = html.replace(/<script src="([^"]+)"><\/script>/g, (m, src) => {
    const rel = src.replace(/^\.\//, '');
    if (!fs.existsSync(path.join(root, rel))) throw new Error(`index.html references a missing file: ${rel}`);
    return '<scr' + 'ipt>' + read(rel) + '</scr' + 'ipt>';
  });
  return html;
}

/* matchMedia is the only thing that tells the page which device it is on, so
   that is exactly what we emulate — plus the observers jsdom does not ship. */
const SHIM = (narrow) => `
(function () {
  var narrow = ${!!narrow};
  window.IntersectionObserver = function (cb) {
    this.observe = function (el) { cb([{ isIntersecting: true, target: el }], this); };
    this.unobserve = this.disconnect = function () {};
  };
  window.ResizeObserver = function () { this.observe = this.unobserve = this.disconnect = function () {}; };
  window.scrollTo = function () {};
  Element.prototype.scrollIntoView = function () {};
  window.matchMedia = function (q) {
    var max = /max-width:\\s*(\\d+)px/.exec(q), min = /min-width:\\s*(\\d+)px/.exec(q);
    var matches;
    if (max) matches = narrow && +max[1] >= 380;
    else if (min) matches = !narrow;
    else if (/pointer:\\s*fine/.test(q)) matches = !narrow;
    else if (/pointer:\\s*coarse/.test(q) || /hover:\\s*none/.test(q)) matches = narrow;
    else matches = false;
    return { matches: matches, media: q, addEventListener: function () {}, removeEventListener: function () {},
             addListener: function () {}, removeListener: function () {} };
  };
})();
`;

async function boot(narrow) {
  const html = pageSource().replace('</head>', `<script>${SHIM(narrow)}</script></head>`);
  const vc = new VirtualConsole();
  const noise = [];
  vc.on('jsdomError', (e) => {
    const msg = String((e && e.detail) || (e && e.message) || e);
    // canvas/webgl are simply not in jsdom; the demos are covered by tools/smoke.mjs
    if (!/getContext|Not implemented/.test(msg)) noise.push(msg.split('\n')[0]);
  });
  const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://example.test/index.html', virtualConsole: vc });
  const w = dom.window;
  w.addEventListener('error', (e) => noise.push(e.message || String(e.error)));
  await wait(600);
  return { w, d: w.document, noise };
}

const click = (w, el) => el.dispatchEvent(new w.Event('click', { bubbles: true, cancelable: true }));
const esc = (w, d) => d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));

console.log('\n  Motion Lab touch & small-screen behaviour\n  ' + '─'.repeat(54));

/* ------------------------------ phone ------------------------------ */
console.log('\n  \u001b[1mat 640px and below (phone)\u001b[0m');
{
  const { w, d, noise } = await boot(true);
  const cardCount = d.querySelectorAll('#grid .card').length;
  check(`a short first page of live cards (${cardCount}, capped at 30)`, cardCount > 0 && cardCount <= 30);
  check('every card carries its own demo host', d.querySelectorAll('#grid .card .demo-host').length === cardCount);
  const tune = d.querySelector('#grid .card .mini.tune');
  check(`card action is labelled "${tune && tune.textContent.trim()}" so two fit one row`, tune && tune.textContent.trim() === 'Tune');
  check('the in-card overflow menu still holds every other action',
    d.querySelector('#grid .card').querySelectorAll('.card-menu-pop button').length === 5);
  check('the search placeholder does not mention a keyboard', !/press|⌘/.test(d.getElementById('search').placeholder));

  const parentOf = (id) => (d.getElementById(id).parentNode || {}).id;
  check('favourites / pause / theme move out of the header',
    parentOf('favFilter') === 'mobilePrefs' && parentOf('motionToggle') === 'mobilePrefs' && parentOf('themeToggle') === 'mobilePrefs');
  check('…and each keeps a readable label', ['favFilter', 'motionToggle', 'themeToggle'].every((id) => !!d.getElementById(id).dataset.label));
  check('search, tune and the hamburger stay in the header',
    ['searchTrigger', 'tuneAll', 'menuToggle'].every((id) => parentOf(id) === 'headerTools'));

  const nav = d.getElementById('mobileNav');
  check('the drawer starts closed', nav.hidden === true);
  click(w, d.getElementById('menuToggle'));
  await wait(60);
  check('the hamburger opens the drawer', !nav.hidden && nav.classList.contains('open'));
  check('aria-expanded tracks it', d.getElementById('menuToggle').getAttribute('aria-expanded') === 'true');
  check('the page behind it is locked', d.body.style.overflow === 'hidden' && d.body.classList.contains('no-scroll'));
  click(w, d.getElementById('mobileSearch'));
  await wait(60);
  check('the drawer search row opens the palette and shuts the drawer',
    d.getElementById('cmdk').hidden === false && !nav.classList.contains('open'));
  check('the page stays locked because the palette is open', d.body.style.overflow === 'hidden');
  esc(w, d);
  await wait(440);                 // the drawer unhooks on its own 380ms timer
  check('esc closes the palette and hands the page back',
    d.getElementById('cmdk').hidden === true && d.body.style.overflow === '' && !d.body.classList.contains('no-scroll'));

  click(w, d.getElementById('favFilter'));
  check('the relocated favourites toggle is still wired', d.getElementById('favFilter').getAttribute('aria-pressed') === 'true');
  check('an empty favourites filter explains itself instead of showing a blank page',
    d.querySelectorAll('#grid .card').length === 0 && d.getElementById('empty').hidden === false);
  click(w, d.getElementById('favFilter'));
  await wait(30);
  check('…and turns back off', d.querySelectorAll('#grid .card').length > 0);
  click(w, d.getElementById('motionToggle'));
  check('the relocated pause toggle stops the whole site', d.body.classList.contains('paused'));
  click(w, d.getElementById('themeToggle'));
  check('the relocated theme toggle repaints the mobile browser chrome',
    d.documentElement.dataset.theme === 'light' && d.getElementById('themeColorMeta').getAttribute('content') === '#f5f5f8');

  click(w, d.querySelector('#grid .card .mini.code'));
  check('the code dialog opens over a locked page', d.getElementById('modal').hidden === false && d.body.style.overflow === 'hidden');
  check('the "similar" rail is populated inside the preview column', d.getElementById('similar').hidden === false && !!d.querySelector('.similar-item'));
  click(w, d.getElementById('tuneModalBtn'));
  click(w, d.getElementById('aeModalBtn'));
  check('the AE dialog opens on top of the others', d.getElementById('aeExport').hidden === false);
  esc(w, d);
  await wait(320);
  check('closing the top dialog keeps the lock for the ones under it', d.body.style.overflow === 'hidden');
  esc(w, d); await wait(80);      // modal
  esc(w, d); await wait(400);     // tuner (releases on its own 320ms timer)
  check('…and the last one to close always gives the scroll back',
    d.getElementById('modal').hidden && d.getElementById('tuner').hidden && d.body.style.overflow === '');
  check('no unexpected page errors', noise.length === 0 || (console.log('     ' + noise.slice(0, 3).join('\n     ')), false));
}

/* ------------------------------ desktop ------------------------------ */
console.log('\n  \u001b[1mabove the breakpoint (desktop)\u001b[0m');
{
  const { w, d } = await boot(false);
  check('the full page of cards is rendered', d.querySelectorAll('#grid .card').length > 30);
  const tune = d.querySelector('#grid .card .mini.tune');
  check(`the card action keeps its long label ("${tune && tune.textContent.trim()}")`, tune && tune.textContent.trim() === 'Customise');
  check('nothing is moved out of the header',
    ['favFilter', 'motionToggle', 'themeToggle'].every((id) => (d.getElementById(id).parentNode || {}).id === 'headerTools'));
  check('the header order is unchanged',
    [...d.querySelectorAll('#headerTools > *')].map((el) => el.id || 'cta').join(',') ===
    'searchTrigger,tuneAll,favFilter,motionToggle,themeToggle,cta,menuToggle');
  check('the drawer prefs slot stays empty', d.getElementById('mobilePrefs').children.length === 0);
  check('the keyboard hint is back in the placeholder', /press \//.test(d.getElementById('search').placeholder));
}

const bad = results.filter((r) => !r.ok).length;
console.log(`\n  ${bad ? '\u001b[31m' + bad + ' behaviour problem(s)\u001b[0m' : '\u001b[32m✓ ' + results.length + ' touch behaviours hold on both layouts\u001b[0m'}\n`);
process.exit(bad ? 1 : 0);
