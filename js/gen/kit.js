/* ============================================================
   Motion Lab — authoring kit
   ----------------------------------------------------------
   Small helpers used by js/gen/*.gen.js. Every helper emits plain
   `html` / `css` / `js` strings, so a generated effect is exactly as
   copy-pasteable as a hand written one.

   RULE OF THE HOUSE
   Never *declare* a custom property inside demo CSS. Always read it with a
   fallback:  width:calc(100% / var(--n, 12))
   That lets the Tune panel set the variable from outside the demo and have it
   win, and it keeps the exported snippet working standalone (fallback) or tuned.
   ============================================================ */
(function (global) {
  'use strict';

  /* -------- palette -------- */
  var ACCENT = ['#7c5cff', '#22d3ee', '#ff5c8a', '#a855f7', '#34d399',
    '#ffd479', '#ff9d5c', '#f472b6', '#7ee787', '#60a5fa', '#e879f9', '#fca5a5'];

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function r2(v) { return Math.round(v * 1000) / 1000; }
  function px(v) { return (Math.round(v * 100) / 100) + 'px'; }

  function hex2rgb(h) {
    h = String(h).replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (h.length < 6) return null;
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function pad2(n) { var s = clamp(Math.round(n), 0, 255).toString(16); return s.length < 2 ? '0' + s : s; }
  function rgb2hex(c) { return '#' + pad2(c[0]) + pad2(c[1]) + pad2(c[2]); }
  function mix(a, b, t) {
    var x = hex2rgb(a) || [0, 0, 0], y = hex2rgb(b) || [255, 255, 255];
    return rgb2hex([x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t]);
  }
  function rgba(h, a) {
    var c = hex2rgb(h);
    return c ? 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + r2(a) + ')' : h;
  }
  function rgb2hsl(c) {
    var r = c[0] / 255, g = c[1] / 255, b = c[2] / 255;
    var mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, h = 0, s = 0, l = (mx + mn) / 2;
    if (d) {
      s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
      h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }
    return [h, s * 100, l * 100];
  }
  function hsl2rgb(h, s, l) {
    h = ((h % 360) + 360) % 360; s = clamp(s, 0, 100) / 100; l = clamp(l, 0, 100) / 100;
    var c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2, t;
    if (h < 60) t = [c, x, 0]; else if (h < 120) t = [x, c, 0]; else if (h < 180) t = [0, c, x];
    else if (h < 240) t = [0, x, c]; else if (h < 300) t = [x, 0, c]; else t = [c, 0, x];
    return [(t[0] + m) * 255, (t[1] + m) * 255, (t[2] + m) * 255];
  }
  function shift(hex, deg, satTo, lightTo) {
    var c = hex2rgb(hex); if (!c) return hex;
    var h = rgb2hsl(c);
    return rgb2hex(hsl2rgb(h[0] + deg, satTo == null ? h[1] : satTo, lightTo == null ? h[2] : lightTo));
  }
  function accent(i) { return ACCENT[((i % ACCENT.length) + ACCENT.length) % ACCENT.length]; }

  /* deterministic pseudo random, so the gallery looks the same on every reload */
  function rng(seed) {
    var s = seed >>> 0 || 1;
    return function () {
      s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0;
      return s / 4294967296;
    };
  }

  /* -------- string / html builders -------- */
  function join(rows) { return rows.filter(Boolean).join('\n'); }
  function mapJoin(n, fn, sep) {
    var out = [];
    for (var i = 0; i < n; i++) out.push(fn(i));
    return out.join(sep == null ? '\n' : sep);
  }
  /* <i style="--i:0"></i><i style="--i:1"></i> … — index driven children */
  function cells(n, tag, attr) {
    var t = tag || 'i';
    return mapJoin(n, function (i) {
      return '<' + t + ' style="--i:' + i + '"' + (attr || '') + '></' + t + '>';
    }, '');
  }
  function cellsText(n, tag, txt, attr) {
    var t = tag || 'i';
    return mapJoin(n, function (i) {
      return '<' + t + ' style="--i:' + i + '"' + (attr || '') + '>' + (typeof txt === 'function' ? txt(i) : txt) + '</' + t + '>';
    }, '');
  }
  /* split a word into <i style="--i:n">letter</i> — used by every text effect */
  function letters(word, tag) {
    var t = tag || 'i', out = '';
    for (var i = 0; i < word.length; i++) {
      var ch = word[i] === ' ' ? '&nbsp;' : word[i]
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      out += '<' + t + ' style="--i:' + i + '">' + ch + '</' + t + '>';
    }
    return out;
  }
  function words(str, tag) {
    var t = tag || 'i';
    return String(str).split(' ').map(function (w, i) {
      return '<' + t + ' style="--i:' + i + '">' + w + '</' + t + '>';
    }).join(' ');
  }
  function keyframes(name, frames) { return '@keyframes ' + name + '{' + frames + '}'; }

  /* -------- Tune panel control descriptors -------- */
  function range(label, k, min, max, step, def, unit) {
    return { t: 'range', label: label, k: k, min: min, max: max, step: step, v: def, unit: unit || '' };
  }
  function colorCtl(label, k, def) { return { t: 'color', label: label, k: k, v: def }; }
  function selectCtl(label, k, opts, def) { return { t: 'select', label: label, k: k, opts: opts, v: def }; }
  function switchCtl(label, k, def) { return { t: 'switch', label: label, k: k, v: !!def }; }

  /* -------- item factory + registry -------- */
  var GEN = global.ML_GEN = global.ML_GEN || {};
  var SEEN = global.ML_SEEN_IDS = global.ML_SEEN_IDS || {};
  var TARGET = global.ML_TARGET = 100;              // 100 effects in every category
  /* the hand written set is already in MOTION_LAB — never reuse one of its ids */
  (global.MOTION_LAB || []).forEach(function (i) { SEEN[i.id] = 1; });
  var CATS = ['loaders', 'buttons', 'text', 'cards', 'backgrounds', 'controls', 'svg', '3d', 'motion'];

  function item_srcHas(o, key) {
    return [o.html, o.css, o.js].some(function (s) { return s && s.indexOf(key) > -1; });
  }
  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function make(cat, o) {
    var id = o.id || slug(o.title);
    var base = id, n = 2;
    while (SEEN[id]) id = base + '-' + (n++);      // never collide with the hand written set
    SEEN[id] = 1;
    var item = {
      id: id,
      title: o.title,
      cat: cat,
      tags: o.tags || ['css'],
      html: o.html || '',
      css: o.css || '',
      /* a control is only kept when the demo really reads that variable — no
         dead knobs, ever */
      cfg: (o.cfg || []).filter(function (c) {
        return item_srcHas(o, c.k);
      })
    };
    if (!item.cfg.length) item.cfg = null;
    if (o.js) item.js = o.js;
    if (o.tune) item.tune = o.tune;                 // { speed: false } etc. to opt out of a control
    if (o.family) item.family = o.family;           // used to interleave families in the grid
    item.gen = true;                                // authored by js/gen/*.gen.js
    return item;
  }

  /* families return arrays; collect() appends them to the category bucket */
  function add(cat, list) {
    var bucket = GEN[cat] || (GEN[cat] = []);
    for (var i = 0; i < list.length; i++) {
      var it = list[i];
      if (!it) continue;
      bucket.push(it.cat ? it : make(cat, it));
    }
    return bucket.length;
  }

  global.MLKit = {
    ACCENT: ACCENT,
    CATS: CATS,
    TARGET: TARGET,
    clamp: clamp, r2: r2, px: px,
    hex2rgb: hex2rgb, rgb2hex: rgb2hex, mix: mix, rgba: rgba, shift: shift, accent: accent,
    rgb2hsl: rgb2hsl, hsl2rgb: hsl2rgb,
    rng: rng,
    join: join, mapJoin: mapJoin, cells: cells, cellsText: cellsText,
    letters: letters, words: words, keyframes: keyframes, slug: slug,
    range: range, color: colorCtl, select: selectCtl, switch: switchCtl,
    make: make, add: add, GEN: GEN
  };
})(window);
