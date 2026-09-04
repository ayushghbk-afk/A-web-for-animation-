# ⚡ Motion Lab — 116 web animations & UI elements

A zero-dependency, static showcase of **116 hand-written web animations**: loaders, buttons,
text effects, cards, backgrounds, controls, SVG line art, 3D scenes and interaction patterns.
Every demo is live, isolated, and one click away from your clipboard.

Built to be dropped straight onto **GitHub Pages** — no build step, no bundler, no npm install.

---

## ✨ What's inside

| Category | Count | Examples |
| --- | --- | --- |
| Loaders | 18 | conic spinner, equalizer, atom orbitals, hourglass, infinity trace |
| Buttons | 16 | magnetic pull, material ripple, liquid blob, cyber clip, loading state |
| Text FX | 14 | typewriter, glitch, scramble decode, split-flap board, neon flicker |
| Cards & Hover | 14 | 3D tilt, holographic foil, cursor spotlight, flip card, fanning stack |
| Backgrounds | 12 | particle network, matrix rain, aurora, synthwave grid, lava lamp |
| Controls | 12 | day/night toggle, tick-draw checkbox, heart burst, icon tab bar |
| SVG & Lines | 10 | self-drawing path, progress ring, radar sweep, chart draw, gooey blobs |
| 3D | 10 | rotating cube, 3D carousel, unfolding box, isometric tower, dot sphere |
| Interaction | 10 | scroll reveal, count-up, toast, spring modal, smooth accordion |
| **Total** | **116** | |

## 🧠 How it works

* Every effect is a plain data object — `{ id, title, cat, tags, html, css, js? }` — living in
  `js/data/*.js`.
* `js/app.js` renders a card per effect and mounts each demo inside its **own Shadow DOM**, so
  116 independent stylesheets can coexist without a single class-name collision.
* Demos are **lazily mounted** as they scroll into view, and JS-driven demos share one global
  `requestAnimationFrame` pump that pauses whenever a demo is off-screen — so the page stays
  smooth even with a hundred things moving.
* `prefers-reduced-motion` is respected, and the header has a global pause button.

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
  css:  '.mine{transition:transform .3s}\n.mine:hover{transform:scale(1.1)}',
  js:   'root.querySelector(".mine").addEventListener("click", function(){ /* ... */ });'
}
```

Inside `js` you get two locals:

* `root` — the demo's shadow root (use it instead of `document`)
* `api.raf(fn)` — a frame loop that auto-pauses off-screen; `api.onCleanup(fn)` for teardown

The card, tag chips, search index and counters all update automatically.

## ⌨️ Shortcuts

| Key | Action |
| --- | --- |
| `/` | focus search |
| `Esc` | close the code viewer |

## 📄 Licence

MIT — take anything you like, no attribution needed.
