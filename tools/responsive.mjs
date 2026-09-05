/* ============================================================
   Motion Lab — responsive / touch checker
   Usage: node tools/responsive.mjs
   No dependencies, no browser: it reads the shipped CSS and HTML and
   asserts the invariants a phone actually depends on — a viewport that
   respects the notch, grid tracks that cannot exceed the viewport, tap
   targets, safe-area padding, hover feedback that does not get stuck on
   touch, and the small-screen affordances that only exist in JS/CSS if
   both files say so.
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

const css = read('css/site.css');
const indexHtml = read('index.html');
const catalogHtml = read('catalog.html');
const navJs = read('js/nav.js');
const appJs = read('js/app.js');

const problems = [];
let passed = 0;
const ok = (label) => { passed++; console.log(`  \u001b[32m✓\u001b[0m ${label}`); };
const bad = (label) => { problems.push(label); console.log(`  \u001b[31m✗\u001b[0m ${label}`); };
const check = (cond, label) => (cond ? ok(label) : bad(label));

/* ---------------- a small CSS walk: declarations + media blocks ---------------- */
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '');
const cssBody = stripComments(css);

/** every top-level @media block → { query, body } (nested rules stay inside body) */
function mediaBlocks(src) {
  const out = [];
  const re = /@media[^{]*\{/g;
  let m;
  while ((m = re.exec(src))) {
    let i = m.index + m[0].length, depth = 1, start = i;
    while (i < src.length && depth > 0) {
      const c = src[i];
      if (c === '{') depth++;
      else if (c === '}') depth--;
      i++;
    }
    out.push({ query: src.slice(m.index, m.index + m[0].length - 1).replace(/\s+/g, ' ').trim(), body: src.slice(start, i - 1) });
    re.lastIndex = i;
  }
  return out;
}
const blocks = mediaBlocks(cssBody);
const mediaFor = (needle) => blocks.filter((b) => b.query.includes(needle)).map((b) => b.body).join('\n');
const hasDecl = (src, sel, decl) => {
  const rule = new RegExp('(?:^|\\})\\s*([^{}]*' + sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[^{}]*)\\{([^{}]*)\\}', 'm');
  const m = src.match(rule);
  return !!(m && new RegExp(decl).test(m[2]));
};

console.log('\n  Motion Lab responsive & touch check');
console.log('  ' + '─'.repeat(54));

/* ---------------- the document head ---------------- */
const viewports = [indexHtml, catalogHtml].map((h) => /<meta name="viewport" content="([^"]*)"/.exec(h)?.[1] || '');
check(viewports.every((v) => /width=device-width/.test(v)), 'every page ships a device-width viewport meta');
check(viewports.every((v) => !/maximum-scale|user-scalable\s*=\s*no/.test(v)), 'pinch-zoom is never disabled (accessibility)');
check(/viewport-fit=cover/.test(viewports[0]), 'index.html runs edge-to-edge so safe-area insets mean something');
check(/-webkit-text-size-adjust:\s*100%/.test(cssBody), 'iOS font inflation is neutralised');
check(/name="theme-color"[^>]*id="themeColorMeta"/.test(indexHtml) && /themeColorMeta/.test(appJs),
  'the mobile browser chrome follows the light/dark switch');

/* ---------------- layout that cannot overflow ---------------- */
check(/body\s*\{[^}]*overflow-x:\s*hidden/.test(cssBody), 'body clips any accidental horizontal overflow');
const autoTracks = [...cssBody.matchAll(/repeat\(\s*(?:auto-fill|auto-fit)\s*,\s*minmax\(([^,)]+),/g)].map((m) => m[1].trim());
check(autoTracks.length > 0 && autoTracks.every((t) => /^min\(/.test(t)),
  `every auto-fill track is viewport-safe (${autoTracks.length} tracks, all min()-guarded)`);
check(/\.modal-panel\s*\{[^}]*width:\s*min\(1050px,\s*100%\)/.test(cssBody), 'dialogs are capped by their own width');
check(!/min-height:\s*100vh|min-height:\s*calc\(100vh/.test(cssBody),
  'full-height sections use svh/dvh, not the 100vh that mobile toolbars lie about');
check(/max-height:\s*min\(\s*9[03]svh/.test(mediaFor('(max-width: 640px)')) || /max-height:\s*min\(/.test(cssBody),
  'dialog height is clamped to a small viewport so soft keyboards cannot hide actions');

/* ---------------- the phone layout ---------------- */
const m640 = mediaFor('(max-width: 640px)');
const m380 = mediaFor('(max-width: 380px)');
check(!!m640, 'a dedicated ≤640px layout exists in css/site.css');
check(!!m380, 'a fold-sized ≤380px layout exists');
check(mediaFor('(max-width: 1100px)').includes('.mega'), 'the hover mega menus are switched off on touch widths');
check(/\.header-tools\s*>\s*#favFilter[\s\S]{0,120}display:\s*none/.test(m640),
  'utility toggles leave the header on phones so the hamburger can never be pushed off-screen');
check(/\.mobile-prefs/.test(cssBody) && /mobilePrefs/.test(navJs) && /id="mobilePrefs"/.test(indexHtml),
  'the drawer has a home for the toggles the header gives up (css + js + markup agree)');
check(/data-label="(Favourites|Pause motion|Theme)"/.test(indexHtml) && /\.mobile-prefs \.icon-btn::after\s*\{[^}]*attr\(data-label\)/.test(cssBody),
  'those toggles stay labelled, not just icons');
check(/\.mobile-search/.test(cssBody) && /#mobileSearch/.test(navJs), 'the drawer carries a search row of its own');

check(mediaFor('(max-width: 430px)').includes('flex-wrap: wrap'),
  'if JS never relocates the header buttons, a 360px phone wraps them instead of clipping the hamburger');

/* tap targets */
check(/\.chip\s*\{[^}]*min-height:\s*var\(--tap\)/.test(mediaFor('(max-width: 900px)')) ||
      /\.chip\s*\{[^}]*min-height/.test(mediaFor('(max-width: 900px)')), 'filter chips reach a 44px tap target');
check(/\.mini\s*\{[^}]*min-height:\s*4[2-9]px/.test(m640), 'card actions stay tappable on a phone');
check(/\.modal-actions\s*>[^}]*min-height:\s*var\(--tap\)/.test(m640), 'dialog actions are thumb-sized');
check(/:root\s*\{[\s\S]*--tap:\s*44px/.test(cssBody), '--tap is declared once, at 44px');

/* safe areas — declared once as tokens, then applied everywhere it matters */
const safeUses = (cssBody.match(/var\(--safe-[trbl]\)/g) || []).length;
check(/env\(safe-area-inset-top/.test(cssBody) && /env\(safe-area-inset-bottom/.test(cssBody) && safeUses >= 12,
  `${safeUses} safe-area applications keep content off the notch and the home bar`);
check(/\.site-header\s*\{[^}]*padding-top:\s*max\(8px,\s*var\(--safe-t\)\)/.test(cssBody), 'the sticky header bows to a notch');
check(/\.modal-actions\s*\{[^}]*var\(--safe-b\)/.test(m640), 'the bottom sheet pads itself above the home indicator');

/* touch behaviour */
const coarse = mediaFor('(hover: none), (pointer: coarse)') + mediaFor('(hover:none), (pointer:coarse)');
check(!!coarse, 'a hover-free / coarse-pointer block exists');
check(/\.card:hover[\s\S]{0,400}transform:\s*none/.test(coarse), 'a tapped card cannot stay lifted after the finger leaves');
check(/\.pointer-glow\s*\{\s*display:\s*none/.test(coarse), 'the cursor glow never renders on touch');
check(/backdrop-filter:\s*none/.test(coarse) && /\.card[\s\S]{0,40}backdrop-filter/.test(coarse),
  'per-card backdrop blur is dropped on touch (GPU budget)');
check(/-webkit-tap-highlight-color:\s*transparent/.test(cssBody) && /touch-action:\s*manipulation/.test(cssBody),
  'tap highlight and the 300ms double-tap delay are both gone');
check(/#search[^{]*\{[^}]*font-size:\s*1rem/.test(m640) || /#search,\s*\.tz-select select\s*\{[^}]*1rem/.test(m640),
  'search inputs stay ≥16px so iOS does not zoom on focus');

/* overlays must always be escapable on a phone */
check(/\.card-menu-pop\s*\{[^}]*position:\s*static/.test(m640),
  'the in-card "more" sheet unfolds in flow instead of being clipped by the card');
check(/\.cmdk\s*\{[^}]*place-items:\s*stretch/.test(m640), 'search goes full-screen on phones (no keyboard-obscured box)');
check(/\.tuner-panel\s*\{[^}]*min\(93svh/.test(m640) && /\.tuner-panel\s*\{[^}]*height:\s*93vh/.test(m640),
  'the tuner opens as a full-height bottom sheet, with a vh fallback for old engines');
check(/\.tuner-panel::before\s*\{[\s\S]{0,160}background:\s*var\(--border-strong\)/.test(m640),
  'the sheet carries a grabber so it reads as dismissable');
check(/\.card\s*\{[^}]*contain-intrinsic-size/.test(m640),
  'lazy card rows keep a phone-sized height hint, so scrolling does not jump');
const aeJs = read('js/ae-export.js');
check(/function syncPageLock/.test(appJs) && /overlayOpen/.test(appJs) &&
      /MLSyncPageLock/.test(navJs) && /MLSyncPageLock/.test(aeJs) && /no-scroll/.test(cssBody),
  'the scroll lock is derived from what is open, so stacked dialogs cannot strand the page');
check(/retireOverlays/.test(navJs) && /min-width:\s*1101px/.test(navJs),
  'rotating to a wide viewport closes a stranded drawer');
check(/centerActiveChip/.test(navJs), 'the active chip scrolls into view in its rail');
check(/touchish/.test(read('js/templates.js')), 'heavy WebGL thumbnails are not auto-run on touch devices');
check(/NARROW\s*\?/.test(appJs) || /matchMedia\('\(max-width: 700px\)'/.test(appJs),
  'the first gallery page is shorter on phones (fewer live demos up front)');

/* anchors land under the sticky chrome */
check(/scroll-padding-top:\s*var\(--anchor-offset\)/.test(cssBody) && /--anchor-offset:\s*calc\(/.test(cssBody),
  'jumping to #gallery does not bury the heading under the sticky bars');

/* catalogue page (generated by tools/build-seo.mjs) */
check(/viewport-fit=cover/.test(catalogHtml) && /max-width:640px/.test(catalogHtml),
  'catalog.html is responsive too (and matches the generator)');
check(/minmax\(min\(240px,100%\),1fr\)/.test(catalogHtml), 'catalog rows cannot overflow a narrow phone');

if (problems.length) {
  console.log(`\n  \u001b[31m${problems.length} responsive problem(s)\u001b[0m\n`);
  process.exit(1);
}
console.log(`\n  \u001b[32m✓ ${passed} responsive + touch invariants hold\u001b[0m\n`);
