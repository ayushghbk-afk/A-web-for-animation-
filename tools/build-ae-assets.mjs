#!/usr/bin/env node
/* ============================================================
   Motion Lab — static After Effects asset builder

   Generates one standalone JSX builder + JSON manifest per web effect. The
   JSX must still be run in After Effects: Adobe then creates the real .aep,
   .aepx and optional .mogrt files.

   Examples:
     node tools/build-ae-assets.mjs                 # starter 10
     node tools/build-ae-assets.mjs --all           # all 3,400
     node tools/build-ae-assets.mjs --limit=50
     node tools/build-ae-assets.mjs --all --out=/tmp/ae-assets
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = process.cwd();
const require = createRequire(import.meta.url);
const Core = require(path.join(root, 'js/ae-core.js'));
const args = process.argv.slice(2);
const all = args.includes('--all');
const limitArg = args.find((a) => a.startsWith('--limit='));
const outArg = args.find((a) => a.startsWith('--out='));
const limit = all ? Infinity : Math.max(1, Number(limitArg?.split('=')[1] || 10));
const outDir = path.resolve(root, outArg ? outArg.slice(6) : 'generated/animation-assets');

if (!fs.existsSync(path.join(root, 'js/data')) || !fs.existsSync(path.join(root, 'js/gen'))) {
  console.error('Run this command from the Motion Lab repository root.');
  process.exit(1);
}

const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const win = { window: null };
win.window = win;
win.document = {
  createElement: () => ({ style: { setProperty() {} }, classList: { add() {}, remove() {}, toggle() {} }, appendChild() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [] }),
  querySelector: () => null, querySelectorAll: () => [], addEventListener() {}, documentElement: {}, body: {}
};
win.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
const run = (f) => new Function('window', 'document', 'localStorage', 'globalThis', read(f))(win, win.document, win.localStorage, win);

fs.readdirSync(path.join(root, 'js/data')).filter((f) => f.endsWith('.js')).sort().forEach((f) => run('js/data/' + f));
run('js/gen/kit.js');
run('js/gen/varykit.js');
fs.readdirSync(path.join(root, 'js/gen')).filter((f) => f.endsWith('.gen.js')).sort().forEach((f) => run('js/gen/' + f));
run('js/gen/expand.js');

const items = win.MOTION_LAB || [];
const starterIds = ['ring-spinner', 'dual-ring', 'dots-bounce', 'equalizer', 'square-flip', 'pulse-circle', 'atom-loader', 'btn-shine', 'gradient-text', 'cube-rotate'];
let selected;
if (!all && !limitArg) {
  selected = starterIds.map((id) => items.find((item) => item.id === id)).filter(Boolean);
  for (const item of items) {
    if (selected.length >= 10) break;
    if (!selected.includes(item)) selected.push(item);
  }
} else selected = items.slice(0, Math.min(items.length, limit));
if (!selected.length) {
  console.error('No effects loaded.');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
const catalogue = [];
let bytes = 0;

selected.forEach((item, i) => {
  const sourceIndex = items.indexOf(item) + 1;
  const profile = Core.profile(item, { index: sourceIndex, settings: {} });
  const dir = path.join(outDir, profile.fileBase);
  const jsxName = profile.fileBase + '.jsx';
  const manifestName = 'manifest.json';
  fs.mkdirSync(dir, { recursive: true });
  const jsx = Core.generate(profile, { aep: true, aepx: true, mogrt: true });
  const data = Core.manifest(profile);
  fs.writeFileSync(path.join(dir, jsxName), jsx);
  fs.writeFileSync(path.join(dir, manifestName), JSON.stringify(data, null, 2) + '\n');
  bytes += Buffer.byteLength(jsx) + Buffer.byteLength(JSON.stringify(data));
  catalogue.push({
    id: profile.id,
    index: profile.index,
    title: profile.title,
    category: profile.category,
    archetype: profile.archetype,
    directory: profile.fileBase,
    builder: profile.fileBase + '/' + jsxName,
    manifest: profile.fileBase + '/' + manifestName
  });
});

const bundleProfiles = selected.map((item) => Core.profile(item, { index: items.indexOf(item) + 1, settings: {} }));
const bundleBase = selected.length === items.length ? 'motion-lab-3400-effect-bundle' : 'motion-lab-' + selected.length + '-effect-starter-kit';
const bundle = Core.generate(bundleProfiles, { aep: true, aepx: true, mogrt: selected.length <= 50, baseName: bundleBase });
fs.writeFileSync(path.join(outDir, bundleBase + '.jsx'), bundle);
bytes += Buffer.byteLength(bundle);

const topManifest = {
  schema: 'motion-lab/ae-catalogue@1',
  bridgeVersion: Core.VERSION,
  generatedAt: new Date().toISOString(),
  totalLibraryEffects: items.length,
  generatedEffects: catalogue.length,
  bundle: bundleBase + '.jsx',
  effects: catalogue
};
fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(topManifest, null, 2) + '\n');
fs.writeFileSync(path.join(outDir, 'README.md'), `# Motion Lab · After Effects assets

Generated by \`node tools/build-ae-assets.mjs${all ? ' --all' : ''}\`.

Each numbered folder contains:

- \`<number>-<effect>.jsx\` — standalone ExtendScript builder
- \`manifest.json\` — effect, timing, palette, dimensions and expected outputs

Run a builder from **After Effects → File → Scripts → Run Script File**. The
script creates native shape/text layers, expressions, a Controls null and usage
notes. It then asks for an output folder and has After Effects write the real
\`.aep\`, \`.aepx\` and (when supported) \`.mogrt\` files.

The root \`${bundleBase}.jsx\` builds all ${selected.length} generated effects
into one project. Start with a blank project for a standalone bundle.

> The builders recreate web motion with native AE primitives. They do not embed
> a browser, and complex DOM/canvas/WebGL rendering can differ.
`);

console.log(`\n  Motion Lab AE assets\n  ${'─'.repeat(52)}`);
console.log(`  library effects       ${items.length}`);
console.log(`  builders generated    ${catalogue.length}`);
console.log(`  archetypes            ${new Set(catalogue.map((x) => x.archetype)).size}`);
console.log(`  combined bundle       ${bundleBase}.jsx`);
console.log(`  output                ${path.relative(root, outDir) || '.'}`);
console.log(`  written               ${(bytes / 1024 / 1024).toFixed(2)} MB\n`);
