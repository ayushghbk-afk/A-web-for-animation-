# ⚡ Motion Lab — 900 web animations & UI elements

A zero-dependency, static showcase of **900 live web animations**: exactly **100 in each of nine
categories** — loaders, buttons, text effects, cards & hover, backgrounds, controls, SVG line art,
3D scenes and interaction patterns. 204 are hand-written, 696 were generated as distinct mechanics
(not colour swaps) through the same pipeline.

**Every single one is customisable.** Each demo ships a tuner — speed, size, glow, hue, easing and
direction plus per-effect parameters — that animates live *and* bakes your numbers into the snippet
you copy out.

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

Run `node tools/stats.mjs` to reprint that table.

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

## 🧠 How it works

* A hand-written effect is a plain data object — `{ id, title, cat, tags, html, css, js? }` —
  in `js/data/*.js`.
* A generated family lives in `js/gen/<category>.gen.js` and uses `js/gen/kit.js` (colour maths,
  `cells()`, `letters()`, `keyframes()`, `range()` / `color()` / `select()` knob builders, seeded
  `rng()`). `js/gen/expand.js` pads or prunes every category to exactly 100 and keeps ids unique
  against the hand-written set.
* `js/app.js` renders a card per effect and mounts each demo inside its **own Shadow DOM**, so
  900 independent stylesheets coexist without a single class-name collision.
* Demos are **lazily mounted** as they scroll in (60 at a time, with a "load more" sentinel), and
  JS-driven demos share one global `requestAnimationFrame` pump that rate-steps and pauses
  off-screen demos — which is also what makes the Speed knob work on scripted animations.
* `prefers-reduced-motion` is respected, and the header has a global pause button.

## ✅ Verify it

```bash
node tools/check.mjs     # 100 per category, unique ids, honest knobs, 900 stylesheets compiled
node tools/stats.mjs     # the table above

# deeper QA (needs two dev-only packages, the site itself has none):
npm i --no-save --prefix /tmp/qa jsdom css-tree
QA_DIR=/tmp/qa node tools/smoke.mjs   # boots all 900 demos, fires 330 interactions
```

`check.mjs` refuses duplicate ids/titles, `@keyframes` that no longer exist, knobs a demo never
reads, effects that cannot be stopped or re-run, and CSS that will not parse. `smoke.mjs` renders
every demo in jsdom, drives clicks and pointer moves, and reports anything that throws.

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
| `Esc` | close the tuner, then the code viewer |

## 📄 Licence

MIT — take anything you like, no attribution needed.
