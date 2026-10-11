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

  /* -------- structural sanity ------------------------------------------------
     A demo is only worth shipping when its own markup and stylesheet agree.
     These checks parse the html into a small tree, parse the css into rules,
     and ask four questions a visitor would otherwise answer by eye:

       1. does a control (button/input) get a skin from its own css, or does it
          fall back to the browser's default widget on a dark card?
       2. is there a decorative part whose class no rule matches — a hole?
       3. does the demo paint anything at all?
       4. does a geometry property read a custom property that nothing in the
          demo, its controls or the tuner can ever supply?

     Anything that fails is rejected by add() instead of reaching the gallery.
     ----------------------------------------------------------------------- */
  var VOID_TAGS = { br: 1, hr: 1, img: 1, input: 1, meta: 1, link: 1, source: 1, area: 1, col: 1, embed: 1, track: 1, wbr: 1 };
  /* a wrapper with no rule of its own is harmless — it just holds children */
  var WRAPPER_TAGS = {
    div: 1, section: 1, nav: 1, figure: 1, figcaption: 1, ul: 1, ol: 1, li: 1, main: 1, header: 1,
    footer: 1, article: 1, aside: 1, form: 1, label: 1, table: 1, tbody: 1, thead: 1, tr: 1, td: 1,
    th: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, picture: 1, details: 1, summary: 1, dl: 1, dt: 1,
    dd: 1, output: 1, fieldset: 1, blockquote: 1, pre: 1, code: 1
  };
  var CONTROL_RE = /^(button|input|select|textarea)$/;
  var SVG_RE = /^(svg|g|defs|path|circle|rect|line|polygon|polyline|ellipse|text|tspan|animate|animateTransform|stop|use|clipPath|linearGradient|radialGradient|filter|feGaussianBlur|feTurbulence|feDisplacementMap|image|foreignObject|marker|pattern|symbol)$/;
  var PAINT_SHAPE_RE = /^(path|circle|rect|line|polygon|polyline|ellipse|text)$/;
  /* what takes the browser's default widget chrome off a control: a background,
     an appearance override or a real border — not a radius, not a font */
  var SKIN_RE = /(^|[;\s{])(background(-image|-color)?|appearance|border(-(top|right|bottom|left))?)\s*:/;
  var VISUAL_RE = /(^|[;\s{])(background(-[a-z]+)?|border(-[a-z]+)?|box-shadow|outline|fill|stroke|filter|backdrop-filter|content|mask(-[a-z]+)?)\s*:/;
  var GEOM_RE = /^(width|height|min-width|min-height|max-width|max-height|inset|top|left|right|bottom|transform|translate|scale|rotate|opacity|aspect-ratio|grid-template|flex)/;

  function parseHtml(html) {
    var root = { tag: '#root', cls: [], attrs: {}, kids: [], text: '' };
    var stack = [root];
    var re = /<(\/?)([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>|([^<]+)/g;
    var m;
    while ((m = re.exec(String(html)))) {
      if (m[5] !== undefined) { stack[stack.length - 1].text += m[5]; continue; }
      var t = m[2].toLowerCase();
      if (m[1]) {
        for (var i = stack.length - 1; i > 0; i--) if (stack[i].tag === t) { stack.length = i; break; }
        continue;
      }
      var attrs = {}, are = /([-\w:]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g, a;
      while ((a = are.exec(m[3]))) attrs[a[1].toLowerCase()] = a[2] !== undefined ? a[2] : (a[3] !== undefined ? a[3] : (a[4] || ''));
      var el = {
        tag: t,
        cls: (attrs['class'] || '').split(/\s+/).filter(Boolean),
        attrs: attrs, kids: [], text: ''
      };
      stack[stack.length - 1].kids.push(el);
      if (!m[4] && !VOID_TAGS[t]) stack.push(el);
    }
    return root;
  }
  function flatten(node, out) {
    out = out || [];
    for (var i = 0; i < node.kids.length; i++) { out.push(node.kids[i]); flatten(node.kids[i], out); }
    return out;
  }
  function deepText(el) {
    var s = el.text;
    for (var i = 0; i < el.kids.length; i++) s += deepText(el.kids[i]);
    return s.replace(/\s+/g, '');
  }
  function cssRules(css) {
    var out = [], s = String(css), i = 0;
    while (i < s.length) {
      if (s.charAt(i) === '@') {
        var brace = s.indexOf('{', i), semi = s.indexOf(';', i);
        if (semi > -1 && (brace === -1 || semi < brace)) { i = semi + 1; continue; }
        if (brace === -1) break;
        var name = (s.slice(i).match(/^@([\w-]+)/) || [])[1] || '';
        var d = 0, j = brace;
        for (; j < s.length; j++) { if (s.charAt(j) === '{') d++; else if (s.charAt(j) === '}' && !--d) break; }
        if (/^(media|supports|container|layer)$/.test(name)) out = out.concat(cssRules(s.slice(brace + 1, j)));
        i = j + 1; continue;
      }
      var ob = s.indexOf('{', i);
      if (ob === -1) break;
      var depth = 0, end = ob;
      for (; end < s.length; end++) { if (s.charAt(end) === '{') depth++; else if (s.charAt(end) === '}' && !--depth) break; }
      var sel = s.slice(i, ob).replace(/^\s+|\s+$/g, '');
      if (sel) out.push({ sel: sel, body: s.slice(ob + 1, end) });
      i = end + 1;
    }
    return out;
  }
  /* does the subject (last compound) of this selector address this element? */
  function subjectMatches(sel, el) { return matchSubject(sel, el, false); }
  /* …and does it style the element itself rather than a ::pseudo-element of it? */
  function stylesSelf(sel, el) { return matchSubject(sel, el, true); }
  function matchSubject(sel, el, selfOnly) {
    var parts = sel.split(',');
    for (var p = 0; p < parts.length; p++) {
      var last = parts[p].replace(/^\s+|\s+$/g, '').split(/[\s>+~]+/).pop() || '';
      if (selfOnly && /::/.test(last)) continue;
      var compound = last.replace(/::?[-\w]+(\([^)]*\))?/g, '');
      var simple = compound.match(/^[a-zA-Z][\w-]*|\.[-\w]+|#[-\w]+|\[[^\]]*\]/g) || [];
      if (!simple.length) continue;
      var ok = true;
      for (var q = 0; q < simple.length; q++) {
        var t = simple[q];
        if (t.charAt(0) === '.') { if (el.cls.indexOf(t.slice(1)) === -1) { ok = false; break; } }
        else if (t.charAt(0) === '#') { if (el.attrs.id !== t.slice(1)) { ok = false; break; } }
        else if (t.charAt(0) === '[') { if (!(t.slice(1, -1).split('=')[0] in el.attrs)) { ok = false; break; } }
        else if (el.tag !== t.toLowerCase()) { ok = false; break; }
      }
      if (ok) return true;
    }
    return false;
  }

  /* why an effect cannot ship — [] when it is sound */
  function defects(o) {
    var html = String(o.html || ''), css = String(o.css || ''), js = String(o.js || '');
    var out = [];
    var rs = cssRules(css);
    var els = flatten(parseHtml(html));
    var i, j, m;

    function matchOf(el) {
      var list = [];
      for (var k = 0; k < rs.length; k++) if (subjectMatches(rs[k].sel, el)) list.push(rs[k]);
      return list;
    }
    /* rules that style the element itself (a ::before overlay is not the element) */
    function ownRules(el) {
      var list = [];
      for (var k = 0; k < rs.length; k++) if (stylesSelf(rs[k].sel, el)) list.push(rs[k]);
      return list;
    }
    function pseudoPaints(el) {
      for (var k = 0; k < rs.length; k++) {
        if (!VISUAL_RE.test(rs[k].body)) continue;
        var subs = rs[k].sel.split(',');
        for (var s = 0; s < subs.length; s++) {
          if (!/:{1,2}(before|after)/.test(subs[s])) continue;
          if (subjectMatches(subs[s].replace(/:{1,2}(before|after)/g, ''), el)) return true;
        }
      }
      return false;
    }

    /* markup the demo script creates counts as present */
    var created = {}, builds = /createElement|innerHTML|insertAdjacentHTML|appendChild|\.append\(/.test(js);
    var ce = /createElement\(\s*["'`](\w+)["'`]/g;
    while ((m = ce.exec(js))) created[m[1].toLowerCase()] = 1;
    var iah = /(innerHTML|insertAdjacentHTML)\s*[=(][^;]{0,500}/g;
    while ((m = iah.exec(js))) {
      var made = m[0].match(/<(\w+)/g) || [];
      for (var t = 0; t < made.length; t++) created[made[t].slice(1).toLowerCase()] = 1;
    }

    var unskinned = [], holes = [];
    for (i = 0; i < els.length; i++) {
      var el = els[i];
      if (SVG_RE.test(el.tag) || !el.cls.length) continue;
      var match = matchOf(el);
      if (CONTROL_RE.test(el.tag)) {
        /* a ::before overlay does not take the browser's chrome off the control
           itself — the control's own rule has to do that */
        var skinned = false, own = ownRules(el);
        for (j = 0; j < own.length; j++) if (SKIN_RE.test(own[j].body)) { skinned = true; break; }
        if (!skinned) unskinned.push(el.cls.join('.'));
        continue;
      }
      if (match.length || pseudoPaints(el) || WRAPPER_TAGS[el.tag]) continue;
      if (created[el.tag] && html.indexOf('class="' + el.cls.join(' ') + '"') === -1) continue;
      /* an empty, unstyled part is invisible anyway — only a part a visitor can
         actually see (it carries text) counts as a hole in the composition */
      if (!deepText(el)) continue;
      /* a class the demo script itself drives is not a hole */
      var driven = false;
      for (j = 0; j < el.cls.length; j++) {
        if (new RegExp('[.]"?' + el.cls[j] + '"?[\\s\'"`]|classList[^;]*' + el.cls[j]).test(js)) { driven = true; break; }
      }
      if (!driven) holes.push(el.cls.join('.'));
    }
    if (unskinned.length) out.push('control with no style of its own: ' + uniq(unskinned).join(', '));
    if (holes.length) out.push('part no rule addresses: ' + uniq(holes).join(', '));

    /* paints nothing at all? */
    if (!builds) {
      var painted = false;
      for (i = 0; i < els.length; i++) {
        var e2 = els[i], mm = matchOf(e2);
        for (j = 0; j < mm.length; j++) if (VISUAL_RE.test(mm[j].body)) { painted = true; break; }
        if (painted || pseudoPaints(e2) || e2.attrs.fill || e2.attrs.stroke || deepText(e2)) { painted = true; break; }
      }
      if (!painted) {
        var canvas = false, shape = false;
        for (i = 0; i < els.length; i++) {
          if (els[i].tag === 'canvas' && js) canvas = true;
          if (PAINT_SHAPE_RE.test(els[i].tag)) shape = true;
        }
        if (!canvas && !shape) out.push('paints nothing: ' + html.replace(/\s+/g, ' ').slice(0, 60));
      }
    }

    /* a geometry property reading a variable nothing can supply */
    var supplied = {};
    var dRe = /(--[\w-]+)\s*:/g;
    while ((m = dRe.exec(css + html + js))) supplied[m[1]] = 1;
    var spRe = /setProperty\(\s*["'`](--[\w-]+)/g;
    while ((m = spRe.exec(js + html))) supplied[m[1]] = 1;
    var inlRe = /style\s*=\s*["']([^"']*)["']/g;
    while ((m = inlRe.exec(html + js))) {
      var d2 = /(--[\w-]+)\s*:/g, x;
      while ((x = d2.exec(m[1]))) supplied[x[1]] = 1;
    }
    (o.cfg || []).forEach(function (c) { supplied[c.k] = 1; });
    var hanging = [];
    for (i = 0; i < rs.length; i++) {
      var decls = rs[i].body.split(';');
      for (j = 0; j < decls.length; j++) {
        var kv = decls[j].split(':');
        if (kv.length < 2) continue;
        var prop = kv[0].replace(/^\s+|\s+$/g, '').toLowerCase();
        if (!GEOM_RE.test(prop)) continue;
        var vRe = /var\(\s*(--[\w-]+)\s*\)/g, v;
        while ((v = vRe.exec(kv.slice(1).join(':')))) {
          if (!supplied[v[1]] && hanging.indexOf(v[1] + ' in ' + prop) === -1) hanging.push(v[1] + ' in ' + prop);
        }
      }
    }
    if (hanging.length) out.push('unreachable variable: ' + hanging.join(', '));
    return out;
  }
  function uniq(list) {
    var seen = {}, out = [];
    list.forEach(function (x) { if (!seen[x]) { seen[x] = 1; out.push(x); } });
    return out;
  }
  /* two effects are the same animation when their sources are the same */
  function srcKey(o) {
    return [o.html, o.css, o.js || ''].map(function (s) {
      return String(s || '').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
    }).join('\u0000');
  }

  /* -------- item factory + registry -------- */
  var GEN = global.ML_GEN = global.ML_GEN || {};
  var SEEN = global.ML_SEEN_IDS = global.ML_SEEN_IDS || {};
  var SEEN_SRC = global.ML_SEEN_SRC = global.ML_SEEN_SRC || {};
  var REJECTED = global.ML_REJECTED = global.ML_REJECTED || { broken: [], repeated: [] };
  var TARGET = global.ML_TARGET = 1000;             // 1,000 effects in every category
  /* Ten categories carry the full 1,000. Buttons, cards and motion carry every
     distinct effect their generators can honestly produce: the repeats and the
     demos that could not render were removed rather than padded back out, so
     these three targets are the real size of their pools — 12,301 in total. */
  var TARGETS = global.ML_TARGETS = {
    loaders: 1000, buttons: 587, text: 1000, cards: 998, backgrounds: 1000,
    controls: 1000, svg: 1000, '3d': 1000, motion: 716,
    data: 1000, nature: 1000, retro: 1000, transitions: 1000
  };
  function targetFor(cat) { return TARGETS[cat] || TARGET; }
  /* the hand written set is already in MOTION_LAB — never reuse one of its ids,
     and never ship a generated effect that is the same animation as one of them */
  (global.MOTION_LAB || []).forEach(function (i) { SEEN[i.id] = 1; SEEN_SRC[srcKey(i)] = i.id; });
  var CATS = ['loaders', 'buttons', 'text', 'cards', 'backgrounds', 'controls', 'svg', '3d', 'motion',
    'data', 'nature', 'retro', 'transitions'];

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

  /* families return arrays; collect() appends them to the category bucket.
     Two things never make it into a bucket: an effect whose own source cannot
     render it (defects), and an effect whose source is the same animation as
     one already in the collection (a repeat wearing a different title). */
  function add(cat, list) {
    var bucket = GEN[cat] || (GEN[cat] = []);
    for (var i = 0; i < list.length; i++) {
      var it = list[i];
      if (!it) continue;
      var why = defects(it);
      if (why.length) {
        REJECTED.broken.push({ cat: cat, id: it.id || it.title, why: why });
        continue;
      }
      var key = srcKey(it);
      if (SEEN_SRC[key]) {
        REJECTED.repeated.push({ cat: cat, id: it.id || it.title, same: SEEN_SRC[key] });
        continue;
      }
      SEEN_SRC[key] = it.id || it.title;
      bucket.push(it.cat ? it : make(cat, it));
    }
    return bucket.length;
  }

  global.MLKit = {
    ACCENT: ACCENT,
    CATS: CATS,
    TARGET: TARGET,
    TARGETS: TARGETS,
    targetFor: targetFor,
    clamp: clamp, r2: r2, px: px,
    hex2rgb: hex2rgb, rgb2hex: rgb2hex, mix: mix, rgba: rgba, shift: shift, accent: accent,
    rgb2hsl: rgb2hsl, hsl2rgb: hsl2rgb,
    rng: rng,
    join: join, mapJoin: mapJoin, cells: cells, cellsText: cellsText,
    letters: letters, words: words, keyframes: keyframes, slug: slug,
    range: range, color: colorCtl, select: selectCtl, switch: switchCtl,
    make: make, add: add, GEN: GEN,
    defects: defects, sane: function (o) { return !defects(o).length; },
    srcKey: srcKey, REJECTED: REJECTED
  };
})(window);
