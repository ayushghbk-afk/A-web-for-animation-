/* ============================================================
   Motion Lab — SEO pages
   Usage:
     node tools/build-seo.mjs            # catalog.html + sitemap + robots.txt
     node tools/build-seo.mjs --pages    # also write effects/<id>.html (deploy)

   Zero dependencies. Loads the collection the same way tools/check.mjs does.
   Effect pages are generated at deploy time so git stays small; the catalog
   is committed so crawlers (and no-JS visitors) always have a full index.
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const WRITE_PAGES = process.argv.includes('--pages') || process.env.ML_SEO_PAGES === '1';
const SITE = (process.env.ML_SITE || 'https://ayushghbk-afk.github.io/A-web-for-animation-').replace(/\/$/, '');

const win = {};
win.window = win;
win.ML_ROOT = root;
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
const run = (f) => new Function('window', 'document', 'localStorage', 'globalThis', read(f))
  .call(win, win, win.document, win.localStorage, win);

fs.readdirSync(path.join(root, 'js/data')).filter((f) => f.endsWith('.js')).sort().forEach((f) => run('js/data/' + f));
run('js/gen/kit.js');
fs.readdirSync(path.join(root, 'js/gen')).filter((f) => f.endsWith('.gen.js')).sort().forEach((f) => run('js/gen/' + f));
run('js/gen/expand.js');

const ITEMS = win.MOTION_LAB;
if (!Array.isArray(ITEMS) || !ITEMS.length) {
  console.error('MOTION_LAB is empty');
  process.exit(1);
}

const LABEL = {
  loaders: 'Loaders', buttons: 'Buttons', text: 'Text FX', cards: 'Cards & Hover',
  backgrounds: 'Backgrounds', controls: 'Controls', svg: 'SVG & Lines', '3d': '3D', motion: 'Interaction'
};
const CATS = win.MLKit ? win.MLKit.CATS : Object.keys(LABEL);

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function originOf(it) { return it.gen ? 'generated' : 'original'; }
function engineOf(it) { return it.js ? 'JavaScript' : 'CSS'; }
function descOf(it) {
  const knobs = it.cfg && it.cfg.length ? `, ${it.cfg.length} dedicated knobs` : ', global speed/colour tuner';
  return `${it.title} — a ${engineOf(it)} ${LABEL[it.cat] || it.cat} animation in Motion Lab (${originOf(it)}${knobs}). Copy the snippet, retune it, or generate an After Effects builder.`;
}

const byCat = {};
ITEMS.forEach((it) => { (byCat[it.cat] = byCat[it.cat] || []).push(it); });

/* ---------------- catalog.html ---------------- */
const catalogCss = `
:root{--bg:#05050a;--text:#f4f4f8;--muted:#8b8b9f;--accent:#8b7dff;--border:rgba(255,255,255,.08);--panel:rgba(255,255,255,.035);--safe-b:env(safe-area-inset-bottom,0px);--safe-t:env(safe-area-inset-top,0px)}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%;scroll-padding-top:12px}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif;overflow-x:hidden}
a{color:var(--accent);-webkit-tap-highlight-color:transparent}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:6px}
header{padding:48px 20px 24px;max-width:1100px;margin:0 auto;padding-top:calc(48px + var(--safe-t))}
header p{color:var(--muted);max-width:62ch;overflow-wrap:anywhere}
h1{margin:0 0 8px;font-size:clamp(1.8rem,4vw,2.8rem);letter-spacing:-.04em;text-wrap:balance}
.kicker{font:600 .72rem/1 ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--accent)}
nav.toc{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0 0}
nav.toc a{display:inline-flex;gap:6px;align-items:center;min-height:40px;padding:6px 13px;border:1px solid var(--border);border-radius:999px;text-decoration:none;color:var(--text);font-size:.85rem}
nav.toc a:hover{border-color:var(--accent)}
nav.toc span{font:500 .7rem ui-monospace,monospace;color:var(--muted)}
section{max-width:1100px;margin:0 auto;padding:12px 20px 28px;scroll-margin-top:12px}
section h2{margin:0 0 12px;font-size:1.35rem;letter-spacing:-.03em}
ol{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(240px,100%),1fr));gap:8px}
li a{display:block;padding:12px 12px;border:1px solid var(--border);border-radius:12px;background:var(--panel);text-decoration:none;color:inherit;min-height:44px}
li a:hover{border-color:rgba(139,125,255,.5)}
li b{display:block;font-size:.92rem;letter-spacing:-.02em}
li small{display:block;color:var(--muted);font:500 .68rem ui-monospace,monospace;margin-top:2px;overflow-wrap:anywhere}
footer{max-width:1100px;margin:0 auto;padding:8px 20px calc(48px + var(--safe-b));color:var(--muted);font-size:.85rem}
@media (max-width:640px){
header{padding:30px 16px 18px;padding-top:calc(30px + var(--safe-t))}
section{padding:10px 16px 22px}
footer{padding:8px 16px calc(40px + var(--safe-b));font-size:.8rem}
nav.toc a{font-size:.8rem;padding:8px 12px}
li a{padding:11px 12px}
}
@media (max-width:380px){
h1{font-size:1.55rem}
ol{grid-template-columns:1fr}
nav.toc{gap:6px}
}
`;

let catalog = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Motion Lab catalog — 900 web animations</title>
<meta name="description" content="A crawlable index of all 900 Motion Lab animations across nine categories. Open any effect in the live lab, or read this page with JavaScript disabled.">
<link rel="canonical" href="${SITE}/catalog.html">
<meta name="robots" content="index,follow">
<style>${catalogCss.trim()}</style>
</head>
<body>
<header>
  <p class="kicker">Motion Lab</p>
  <h1>${ITEMS.length} animations, listed.</h1>
  <p>A static catalog of every effect in the lab — ${CATS.map((c) => (LABEL[c] || c).toLowerCase()).join(', ')}.
     The <a href="./index.html">live gallery</a> needs JavaScript; this page does not.</p>
  <nav class="toc" aria-label="Categories">
    ${CATS.map((c) => `<a href="#${c}">${esc(LABEL[c] || c)} <span>${(byCat[c] || []).length}</span></a>`).join('\n    ')}
  </nav>
</header>
`;

CATS.forEach((c) => {
  const list = byCat[c] || [];
  catalog += `<section id="${c}">
  <h2>${esc(LABEL[c] || c)} <small style="color:var(--muted);font-weight:500">${list.length}</small></h2>
  <ol>
    ${list.map((it) => `<li><a data-id="${esc(it.id)}" href="./index.html#effect/${esc(it.id)}"><b>${esc(it.title)}</b><small>${esc(it.id)} · ${originOf(it)} · ${engineOf(it).toLowerCase()}</small></a></li>`).join('\n    ')}
  </ol>
</section>
`;
});

catalog += `<footer>
  <p><a href="./index.html">Open the live lab</a> · MIT licence · ${ITEMS.length} effects · 0 dependencies</p>
</footer>
</body>
</html>
`;
fs.writeFileSync(path.join(root, 'catalog.html'), catalog);
console.log(`  wrote catalog.html (${ITEMS.length} effects)`);

/* ---------------- robots + sitemap ---------------- */
const robots = `User-agent: *
Allow: /
Sitemap: ${SITE}/sitemap.xml
`;
fs.writeFileSync(path.join(root, 'robots.txt'), robots);

const urls = [
  { loc: `${SITE}/`, pri: '1.0', freq: 'weekly' },
  { loc: `${SITE}/catalog.html`, pri: '0.9', freq: 'weekly' },
  { loc: `${SITE}/index.html`, pri: '0.8', freq: 'weekly' }
];
if (WRITE_PAGES) {
  ITEMS.forEach((it) => {
    urls.push({ loc: `${SITE}/effects/${it.id}.html`, pri: '0.6', freq: 'monthly' });
  });
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><changefreq>${u.freq}</changefreq><priority>${u.pri}</priority></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(root, 'robots.txt'), robots);
console.log(`  wrote sitemap.xml (${urls.length} urls) and robots.txt`);

/* ---------------- per-effect pages (deploy only) ---------------- */
if (WRITE_PAGES) {
  const dir = path.join(root, 'effects');
  fs.mkdirSync(dir, { recursive: true });
  let n = 0;
  ITEMS.forEach((it) => {
    const live = `../index.html#effect/${it.id}`;
    const jsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: it.title,
      programmingLanguage: engineOf(it),
      codeSampleType: 'snippet',
      isPartOf: { '@type': 'CreativeWork', name: 'Motion Lab', url: SITE },
      url: `${SITE}/effects/${it.id}.html`,
      description: descOf(it)
    });
    const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(it.title)} — ${engineOf(it)} ${esc(LABEL[it.cat] || it.cat)} | Motion Lab</title>
<meta name="description" content="${esc(descOf(it))}">
<link rel="canonical" href="${SITE}/effects/${esc(it.id)}.html">
<meta property="og:title" content="${esc(it.title)} — Motion Lab">
<meta property="og:description" content="${esc(descOf(it))}">
<meta property="og:type" content="article">
<script type="application/ld+json">${jsonLd}</script>
<style>
  html,body{margin:0;background:#05050a;color:#f4f4f8;font:16px/1.5 system-ui,sans-serif;-webkit-text-size-adjust:100%}
  body{overflow-x:hidden}
  main{max-width:720px;margin:0 auto;padding:32px 18px calc(64px + env(safe-area-inset-bottom,0px))}
  a{color:#8b7dff}
  .preview{display:grid;place-items:center;min-height:240px;margin:18px 0 22px;border:1px solid rgba(255,255,255,.08);border-radius:18px;background:#0b0b14;overflow:hidden;padding:10px}
  h1,p{overflow-wrap:anywhere}
  @media (max-width:640px){main{padding:20px 14px calc(48px + env(safe-area-inset-bottom,0px))}.preview{min-height:200px;border-radius:14px}h1{font-size:1.5rem}}
  .meta{color:#8b8b9f;font:500 .78rem ui-monospace,monospace}
  h1{margin:8px 0 6px;letter-spacing:-.03em}
</style>
</head>
<body>
<main>
  <p class="meta">${esc(LABEL[it.cat] || it.cat)} · ${originOf(it)} · ${engineOf(it).toLowerCase()}</p>
  <h1>${esc(it.title)}</h1>
  <p>${esc(descOf(it))}</p>
  <div class="preview">
    <style>${it.css || ''}</style>
    ${it.html || ''}
  </div>
  <p>${it.js ? 'This effect is interactive (JavaScript). ' : 'This effect is pure CSS. '}
     <a href="${live}">Open the live, tunable version in Motion Lab</a>.</p>
  <p><a href="../catalog.html">All ${ITEMS.length} effects</a> · <a href="../index.html">Gallery</a></p>
</main>
<script>location.replace(${JSON.stringify(live)});</script>
</body>
</html>
`;
    fs.writeFileSync(path.join(dir, it.id + '.html'), page);
    n++;
  });
  console.log(`  wrote ${n} effect pages in effects/`);
} else {
  console.log('  skipped effects/*.html (pass --pages to generate them)');
}

console.log('  seo build done\n');
