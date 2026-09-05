# ⚡ Motion Lab — 900 web animations & UI elements

A zero-dependency, static showcase of **900 live web animations**: exactly **100 in each of nine
categories** — loaders, buttons, text effects, cards & hover, backgrounds, controls, SVG line art,
3D scenes and interaction patterns. 204 are hand-written, 696 were generated as distinct mechanics
(not colour swaps) through the same pipeline. Two **full-page starter templates** ship alongside
them: a Three.js galaxy and a neon particle geometry engine — preview them inline, launch them,
copy them out, fork them.

**Every single one has a tuner.** Shared speed, size, glow, hue, easing and direction controls
drive the whole library; effects that expose their own parameters get a **customisable** badge and
dedicated knobs. Settings animate live and bake into the web snippet or the downloadable
**After Effects JSX builder** (After Effects itself then writes `.aep` / `.aepx` / `.mogrt`).

Built to be dropped straight onto **GitHub Pages** — no build step, no bundler, no npm install.

---

## ✨ What's inside

| Category | Count | Examples |
| --- | --- | --- |
| Loaders | 100 | conic spinner, equalizer, atom orbitals, metronome tick, domino chain, odometer digits |
| Buttons | 100 | magnetic pull, material ripple, liquid blob, shine sweep, hold-to-confirm, confetti press |
| Text FX | 100 | typewriter, glitch, scramble decode, neon breath, per-word mask reveal, split-slide links |
| Cards & Hover | 100 | 3D tilt, holographic foil, cursor spotlight, concert ticket, stacked deck, flip card |
| Backgrounds | 100 | particle network, meteor shower, lightning storm, warp speed, aurora veils, canvas rain |
| Controls | 100 | day/night toggle, PIN code, password meter, rotary knob, fader bank, drag-drop zone |
| SVG & Lines | 100 | self-drawing path, progress ring, marching ants, radar blips, morphing blob, line chart |
| 3D | 100 | rotating cube, 3D carousel, dice, DNA helix, isometric city, cloth sim, lathe & vase |
| Interaction | 100 | scroll reveal, parallax, cursor follower, drag-to-sort, spring modal, confetti, ticker |
| **Total** | **900** | *170 distinct mechanic families* |

```
  category           hand   gen  total  knobs
  Loaders              27    73    100    377
  Buttons              26    74    100    479
  Text FX              23    77    100    504
  Cards & Hover        23    77    100    479
  Backgrounds          26    74    100    398
  Controls             22    78    100    301
  SVG & Lines          19    81    100     98
  3D                   18    82    100    234
  Interaction          20    80    100    134
  ────────────────────────────────────────────────────────
  TOTAL               204   696    900   3004
```

Run `node tools/stats.mjs` to reprint that table — it prints the template shelf too.

---

## 📦 Starter templates

Effects are building blocks; templates are finished rooms. Two full-page interactive scenes live in
[`templates/`](templates), vendored **file-for-file and unmodified** from sibling repositories:

| Template | What it is | Files | Lines | Live controls | Source |
| --- | --- | --- | --- | --- | --- |
| **Interactive 3D Galaxy** | 100 000 Three.js points in spiral arms, additive blending, OrbitControls, warm-core → cool-edge colour ramp | 2 | 208 | 10 | [`Hi-this-is-time-pass`](https://github.com/ayushghbk-afk/Hi-this-is-time-pass) |
| **Interactive Geometry Engine** | 600 neon particles marching a parametric curve (heart / star / infinity / butterfly) over a parallax starfield | 3 | 238 | 9 | [`Hart-for-html`](https://github.com/ayushghbk-afk/Hart-for-html) |

They get their own section (`#templates`, straight after the gallery), and every card can:

* **preview live** — a sandboxed iframe renders the *real* page scaled to fill the card. It is
  loaded only when it scrolls into view, unloaded when it scrolls away, honours
  `prefers-reduced-motion` (poster instead of autoplay) and obeys the header's global pause.
* **launch** — an interactive full-screen overlay, the page in a new tab, or the original
  github.io deployment.
* **read, copy, download** — a source viewer with one tab per file: copy this file, copy every
  file, download one, or open that exact file on GitHub.

Templates are wired into the rest of the site too: the ⌘K palette (search `galaxy`, `heart`,
`three.js`, `template`…), a nav link with a count pill, the Resources mega menu, the mobile drawer,
the footer and a hero stat.

Adding a third is one folder plus one object in the `TEMPLATES` array of
[`js/templates.js`](js/templates.js) — `node tools/check.mjs` then audits it: declared files must
exist, `entry` must be one of them, the line counts must match what is on disk, the entry page must
really reference its siblings, and nothing vendored may be missing from the catalogue. Details in
[`templates/README.md`](templates/README.md).

---

## 🎛️ Customising an effect

Every card has a **tune** button; the modal has one too. The drawer that opens has four groups:

* **Motion** — speed, size, angle, direction, easing. Speed rewrites every `Xs` / `Xms` in the
  demo, so a `setInterval` spinner and a CSS keyframe both respond.
* **Look** — hue, saturation, glow, blur, opacity.
* **Colours** — per-effect colour pickers plus one-click palette presets.
* **Parameters** — whatever makes that effect *itself* (spoke count on a loader, FOV on a carousel,
  squash on a flip, particle density on rain …). **3 004 of them in total**, ~3.3 per effect.

Plus three buttons: **Randomise**, **Apply to all** (stores a global default that every untuned
effect inherits) and **Reset**.

Under the hood every effect is written against custom properties — `var(--sz, 106px)`,
`var(--glow, 0)` — so the tuner is just a live property sheet. That has two nice side effects:

1. Settings **persist per effect** in `localStorage` (`ml-tune-v2`), and the card shows a badge with
   the number of knobs you touched.
2. **The copied snippet is yours, not the default.** The modal bakes your values into the CSS, the
   inline `style` attribute and the `<script>` before you copy it.

---

## 🎬 After Effects export

Every animation card also has **Download for After Effects**. It profiles the effect's mechanism,
current timing, palette, dimensions and tuner values, then downloads a standalone ExtendScript
builder (`.jsx`). Run that file from **After Effects → File → Scripts → Run Script File**.

The builder creates:

* a transparent 1080 × 1080, 60 fps composition;
* named, editable shape/text layers organized by effect mechanism;
* a **Controls** null with Speed, Cycle, Amount, Direction, Scale, Rotation, Opacity, Glow, Blur and
  three Color Controls;
* expressions wired to those controls and a hidden README guide layer containing usage and license;
* real `.aep` and `.aepx` projects written by After Effects itself, plus `.mogrt` when the installed
  version exposes the Motion Graphics Template export API.

This is intentionally a bridge rather than a fake converter: After Effects has no DOM, CSS, canvas
or WebGL runtime. The generated comp maps the web effect's primary motion, timing, palette and
customisation to native AE primitives; complex browser-only rendering can differ. `.ffx` is
preset-ready but remains a manual **Animation → Save Animation Preset** step because Adobe's preset
format is binary.

The browser can generate a 10-effect starter kit or one builder containing all 900 comps. For a
static release folder with one builder and manifest per effect:

```bash
node tools/build-ae-assets.mjs            # curated starter 10
node tools/build-ae-assets.mjs --all      # all 900 in generated/animation-assets/
node tools/build-ae-assets.mjs --limit=50 --out=/tmp/ae-assets
```

`js/ae-core.js` is the shared, DOM-free profiler/generator; `js/ae-export.js` is only the browser UI.
The real Adobe project formats are never fabricated in JavaScript—the JSX asks After Effects to save
them, which keeps the output compatible and structurally valid.

---

## 🧠 How it works

* `js/templates.js` holds the template catalogue and its UI (cards, live previews, the launch and
  source overlays). The vendored pages themselves stay untouched in `templates/<id>/`, so the
  source viewer always shows the real files.
* A hand-written effect is a plain data object — `{ id, title, cat, tags, html, css, js? }` —
  in `js/data/*.js`.
* A generated family lives in `js/gen/<category>.gen.js` and uses `js/gen/kit.js` (colour maths,
  `cells()`, `letters()`, `keyframes()`, `range()` / `color()` / `select()` knob builders, seeded
  `rng()`). `js/gen/expand.js` pads or prunes every category to exactly 100 and keeps ids unique
  against the hand-written set.
* `js/app.js` renders a card per effect and mounts each demo inside its **own Shadow DOM**, so
  900 independent stylesheets coexist without a single class-name collision.
* Demos follow a real lifecycle — **unmounted → active → paused → destroyed**. They mount as they
  scroll in (60 cards at a time, 24 on a phone), JS work shares one `requestAnimationFrame` pump, CSS
  animations
  pause from inside the shadow root (`:host(.is-offscreen)`), and far-away instances are torn down
  so exploring all 900 does not keep hundreds of shadow trees alive. A hard cap (96 desktop / 48
  mobile) is the backstop.
* Search and category filters use a **precomputed index** (`item._search`, `BY_CAT`) instead of
  rebuilding haystacks on every keypress.
* Deep links (`#effect/ring-spinner`), a **share** button, **download standalone HTML**, and a
  no-JS [`catalog.html`](catalog.html) make effects addressable. Deploy runs
  `node tools/build-seo.mjs --pages` to emit crawlable `effects/<id>.html` files.
* `prefers-reduced-motion` is respected, and the header has a global pause button.

## 📱 Mobile, touch and small screens

The layout is desktop-first with one dedicated responsive block at the end of `css/site.css`
(`Mobile · touch · small screens`). Breakpoints: **1100** folds the nav into a drawer, **900 / 860 /
760** tighten the rails, **640** switches to the phone layout, **520** goes single-column, **380**
covers fold-cover screens.

| What a phone gets | Where |
| --- | --- |
| Header that cannot overflow: search, tune, hamburger only — favourites / pause / theme move into the drawer (same nodes, so state and listeners survive) | `js/nav.js` → `placePrefs()` |
| `viewport-fit=cover` plus `env(safe-area-inset-*)` on the header, dialogs, sheets, toast and footer — nothing hides under a notch or a home bar | `--safe-t/r/b/l` tokens |
| Dialogs and the tuner open as **bottom sheets** (`svh`-clamped, safe-area padded, 44px controls, sticky action row); search goes full-screen so a soft keyboard can't bury it | `@media (max-width: 640px)` |
| The in-card **⋯** menu unfolds in flow instead of being clipped by the card, and carries the actions the small row drops (replay, favourite, share, standalone HTML, AE builder) | `.card-menu-pop` |
| No stuck hover: on `(hover: none)` lift/glow transforms are neutralised; tap highlight and the 300ms double-tap delay are removed; grid tracks use `minmax(min(…, 100%))` so a 320px screen cannot overflow | end of `css/site.css` |
| Cheaper paint: per-card `backdrop-filter`, the noise/grid overlays, the cursor glow and two of four blurred orbs drop out on coarse pointers; the first gallery page is 24 cards, and the 100k-point template thumbnails are not auto-run (tap to launch instead) | `@media (hover: none), (pointer: coarse)` |
| Anchors land *below* the sticky header + filter rail (`scroll-padding-top`), `prefers-reduced-transparency` swaps translucent chrome for solid panels, `theme-color` follows the light/dark switch | `--anchor-offset`, `#themeColorMeta` |

## ✅ Verify it

```bash
node tools/check.mjs        # 100 per category, unique ids, honest knobs, 900 stylesheets compiled,
                            # all AE profiles / rig builders, plus the template catalogue vs disk
node tools/responsive.mjs   # mobile/touch invariants: viewport + safe areas, viewport-proof grid
                            # tracks, 44px targets, sheet geometry, hover-free behaviour
node tools/stats.mjs        # the table above, and the template shelf
node tools/build-seo.mjs    # catalog.html + sitemap.xml (add --pages for effects/*.html)

# deeper QA (needs two dev-only packages, the site itself has none):
npm i --no-save --prefix /tmp/qa jsdom css-tree
QA_DIR=/tmp/qa node tools/smoke.mjs   # boots all 900 demos, fires 330 interactions
QA_DIR=/tmp/qa node tools/touch.mjs   # boots the whole page at phone + desktop width and drives
                                      # the drawer, relocated toggles, dialog stacking, scroll locks
```

`check.mjs` refuses duplicate ids/titles, `@keyframes` that no longer exist, knobs a demo never
reads, effects that cannot be stopped or re-run, CSS that will not parse, and templates whose
declared files, line counts or wiring do not match reality. `smoke.mjs` renders every demo in
jsdom, drives clicks and pointer moves, and reports anything that throws.

## 🚀 Deploy to GitHub Pages

The repo ships with `.github/workflows/deploy.yml`.

1. Go to **Settings → Pages** and set **Source: GitHub Actions**.
2. Merge this branch into `main` (or run the workflow manually from the **Actions** tab).
3. Your site goes live at `https://<username>.github.io/<repo>/`.

> Prefer the classic method? **Settings → Pages → Deploy from a branch → `main` / `root`**
> works too — the `.nojekyll` file is already there so the `js/` and `css/` folders are served
> as-is.

## 🛠️ Run it locally

Nothing to install — it's static files:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## ➕ Adding your own effect

Append an object to any file in `js/data/` (or make a new one and add a `<script>` tag to
`index.html`):

```js
{
  id: 'my-effect',                 // unique
  title: 'My Effect',
  cat: 'buttons',                  // loaders|buttons|text|cards|backgrounds|controls|svg|3d|motion
  tags: ['hover', 'css'],
  html: '<button class="mine">Hi</button>',
  css:  '.mine{transition:transform .3s}\\n.mine:hover{transform:scale(1.1)}',
  js:   'root.querySelector(".mine").addEventListener("click", function(){ /* ... */ });',
  cfg: [ /* optional — your own knobs, see below */ ]
}
```

Inside `js` you get two locals:

* `root` — the demo's shadow root (use it instead of `document`)
* `api.raf(fn)` — a frame loop that auto-pauses off-screen; `api.onCleanup(fn)` for teardown

To make it tunable, read the knobs as custom properties **with a fallback** —
`width:var(--sz,96px)` — and never declare `--sz` yourself:

```js
cfg: [
  { t: 'range',  label: 'Size', k: '--sz',   min: 40, max: 160, step: 2, v: 96, unit: 'px' },
  { t: 'color',  label: 'Tint', k: '--c1',   v: '#7c5cff' },
  { t: 'select', label: 'Mode', k: '--mode', opts: ['fade', 'slide'], v: 'fade' },
  { t: 'switch', label: 'Loop', k: '--loop', v: true }
]
```

Anything you add there shows up in the drawer, in the copied snippet and in the exported
`style`/attribute strings. `js/gen/kit.js` exposes the same builders as `range()`, `color()`,
`select()`, `switch()`.

The card, tag chips, search index, tuner and counters all update automatically.

## ⌨️ Shortcuts

| Key | Action |
| --- | --- |
| `/` | focus search |
| `⌘K` / `Ctrl+K` | command palette |
| `Esc` | close the tuner, then the code viewer |

Shareable URL for any effect: `index.html#effect/<id>` (also `?e=<id>`).

## 📄 Licence

MIT — take anything you like, no attribution needed.
