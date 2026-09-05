# Starter templates

Full-page interactive scenes that ship alongside the 1,800 effects. Each one is a **vendored copy**
of a sibling repository — pulled file-for-file from its `main` branch and left untouched, so what
you read here is byte-for-byte what the author wrote.

| Folder | Template | Source repository | Commit | Files | Lines |
| --- | --- | --- | --- | --- | --- |
| `galaxy-3d/` | Interactive 3D Galaxy | [`ayushghbk-afk/Hi-this-is-time-pass`](https://github.com/ayushghbk-afk/Hi-this-is-time-pass) | `58933f5` | `index.html`, `app.js` | 208 |
| `particle-heart/` | Interactive Geometry Engine | [`ayushghbk-afk/Hart-for-html`](https://github.com/ayushghbk-afk/Hart-for-html) | `a858074` | `index.html`, `style.css`, `script.js` | 238 |

Both are MIT-licensed, have no build step, and pull their libraries (Three.js, OrbitControls,
lil-gui) from public CDNs — so a preview needs a network connection the first time.

## Why vendored rather than just linked?

* The site stays **self-contained**: previews work from any static host, including this repo's own
  GitHub Pages URL, without depending on another deployment being up.
* The source viewer can read the real files (`fetch('templates/galaxy-3d/app.js')`), so *Copy*,
  *Copy every file* and *Download* hand you the actual template — no scraping, no hard-coded
  duplicates drifting out of sync.
* They live in their own directory and run inside sandboxed iframes, so nothing they do can
  collide with the gallery's 1,800 shadow-DOM demos.

## Adding a template

1. Drop the files into `templates/<your-id>/`, with an `index.html` as the entry point.
2. Append an object to the `TEMPLATES` array at the top of `js/templates.js`:

   ```js
   {
     id: 'my-scene',            // matches the folder name
     num: 'T03',
     name: 'Short name',
     title: 'Full title',
     tagline: 'One line, shown under the heading.',
     desc: 'A paragraph: what it does and how it is built.',
     repoName: 'owner/repo',
     repo: 'https://github.com/owner/repo',
     repoFile: 'https://github.com/owner/repo/blob/main/',
     live: 'https://owner.github.io/repo/',
     commit: 'abc1234',
     dir: 'templates/my-scene',
     entry: 'index.html',
     files: [{ p: 'index.html', lang: 'html', lines: 40, note: 'what this file is' }],
     stack: ['Canvas 2D', 'vanilla JS'],
     deps: 'none',
     folders: [{ g: 'Controls', k: ['Speed', 'Colour'] }],
     uses: ['Where you would actually deploy it'],
     a1: '#ffe3a0', a2: '#1932ff',   // poster + accent colours
     icon: '<svg viewBox="0 0 24 24">…</svg>'
   }
   ```

3. Run `node tools/check.mjs`. It audits the catalogue: every declared file must exist, `entry`
   must be one of them, the `lines` numbers must match what is on disk, and the section, overlays
   and `<script>` tag must still be wired into `index.html`.

The card, its live thumbnail, the control inventory, the ⌘K results, the hero counter and the
footer links all update from that one object — nothing else needs touching.
