/* ============================================================
   Motion Lab — Tune
   Customisation for every single effect, with no per-effect authoring.
   ------------------------------------------------------------
   How a control becomes real for an arbitrary demo:
   • Speed      every duration/delay in the demo's CSS is rescaled, and JS
                demos are frame-stepped by the shared rAF pump.
   • Colours    every colour literal in the demo's html/css/js is found, grouped
                by RGB triple and remapped — so #7c5cff and rgba(124,92,255,.7)
                change together.
   • Size/Angle/Glow/Blur/Saturation/Opacity/Direction/Easing
                wrapper level transform + filter, so it works on anything
                (canvas, SVG, DOM).
   • Parameters  anything a demo reads as var(--x, fallback) automatically shows
                up as its own slider/colour/select control (item.cfg).
   Settings are stored per effect in localStorage, plus a "*" entry that styles
   the whole collection at once.
   ============================================================ */
(function (global) {
  'use strict';

  var KEY = 'ml-tune-v2';
  var ALL = '*';
  var BASE = { speed: 1, size: 1, angle: 0, hue: 0, sat: 100, glow: 0, blur: 0, op: 100, dir: 'normal', ease: '' };
  var store = {};
  store[ALL] = {};
  try {
    var raw = JSON.parse(global.localStorage.getItem(KEY) || '{}');
    if (raw && typeof raw === 'object') for (var k in raw) store[k] = raw[k];
    if (!store[ALL]) store[ALL] = {};
  } catch (e) { /* private mode — tune in memory only */ }

  var saveId;
  function save() {
    clearTimeout(saveId);
    saveId = setTimeout(function () {
      try { global.localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {}
    }, 250);
  }

  /* ---------------- colour parsing ---------------- */
  var CRE = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\([^()]*\)/g;
  function num(v, max) {
    if (v == null) return null;
    v = String(v).trim();
    var pct = /%$/.test(v);
    v = parseFloat(v.replace('%', ''));
    if (isNaN(v)) return null;
    return pct ? v / 100 * max : v;
  }
  function h2(n) { n = Math.round(Math.max(0, Math.min(255, n))).toString(16); return n.length < 2 ? '0' + n : n; }
  function parseColor(str) {
    str = String(str).trim();
    if (str[0] === '#') {
      var h = str.slice(1);
      if (h.length === 3 || h.length === 4) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2] + (h[3] ? h[3] + h[3] : '');
      if (h.length !== 6 && h.length !== 8) return null;
      if (/[^0-9a-fA-F]/.test(h)) return null;
      return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1 };
    }
    var m = /^(rgba|rgb|hsla|hsl)\(([^()]*)\)$/i.exec(str);
    if (!m) return null;
    var fn = m[1].toLowerCase(), sep = /,/.test(m[2]) ? ',' : ' ', alpha = null;
    var body = m[2];
    var slash = body.split('/');
    if (slash.length > 1) { body = slash[0]; alpha = num(slash[1], 1); }
    var p = body.split(sep === ',' ? /,\s*/ : /\s+/).filter(function (x) { return x !== ''; });
    if (p.length < 3) return null;
    if (alpha == null && p.length > 3) alpha = num(p[3], 1);
    if (fn.indexOf('hsl') === 0) {
      var hu = parseFloat(p[0]) || 0, s = num(p[1], 100), l = num(p[2], 100);
      if (s == null || l == null) return null;
      var c = hsl2rgb(hu, s, l);
      return { r: c[0], g: c[1], b: c[2], a: alpha == null ? 1 : alpha };
    }
    var r = num(p[0], 255), g = num(p[1], 255), b = num(p[2], 255);
    if (r == null || g == null || b == null) return null;
    return { r: r, g: g, b: b, a: alpha == null ? 1 : alpha };
  }
  function rgb2hsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, h = 0, s = 0, l = (mx + mn) / 2;
    if (d) {
      s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
      h = (mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4) * 60;
    }
    return [h, s * 100, l * 100];
  }
  function hsl2rgb(h, s, l) {
    h = ((h % 360) + 360) % 360; s = Math.max(0, Math.min(100, s)) / 100; l = Math.max(0, Math.min(100, l)) / 100;
    var c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2, t;
    if (h < 60) t = [c, x, 0]; else if (h < 120) t = [x, c, 0]; else if (h < 180) t = [0, c, x];
    else if (h < 240) t = [0, x, c]; else if (h < 300) t = [x, 0, c]; else t = [c, 0, x];
    return [(t[0] + m) * 255, (t[1] + m) * 255, (t[2] + m) * 255];
  }
  function hexOf(c) { return '#' + h2(c.r) + h2(c.g) + h2(c.b); }
  /* write the replacement back in the notation the author used */
  function emitColor(c, orig) {
    var a = c.a < 1 ? c.a : (parseColor(orig) || { a: 1 }).a;
    if (orig[0] === '#') {
      var hex = hexOf(c);
      return (orig.length === 9 || orig.length === 5) ? hex + h2(a * 255) : hex;
    }
    var fn = (/^(rgba|rgb|hsla|hsl)/i.exec(orig) || ['rgb'])[0].toLowerCase();
    var commas = /,/.test(orig.slice(orig.indexOf('(')));
    var r = Math.round(c.r), g = Math.round(c.g), b = Math.round(c.b);
    if (fn.indexOf('hsl') === 0) {
      var hs = rgb2hsl(c.r, c.g, c.b);
      var H = Math.round(hs[0]), S = Math.round(hs[1] * 10) / 10, L = Math.round(hs[2] * 10) / 10;
      if (a < 1) return commas ? 'hsla(' + H + ', ' + S + '%, ' + L + '%, ' + Math.round(a * 100) / 100 + ')'
                               : 'hsl(' + H + 'deg ' + S + '% ' + L + '% / ' + Math.round(a * 100) / 100 + ')';
      return commas ? 'hsl(' + H + ', ' + S + '%, ' + L + '%)' : 'hsl(' + H + 'deg ' + S + '% ' + L + '%)';
    }
    if (a < 1) return commas ? 'rgba(' + r + ', ' + g + ', ' + b + ', ' + Math.round(a * 100) / 100 + ')'
                             : 'rgb(' + r + ' ' + g + ' ' + b + ' / ' + Math.round(a * 100) / 100 + ')';
    return commas ? 'rgb(' + r + ', ' + g + ', ' + b + ')' : 'rgb(' + r + ' ' + g + ' ' + b + ')';
  }
  function keyOf(c) { return Math.round(c.r) + ',' + Math.round(c.g) + ',' + Math.round(c.b); }

  /* ---------------- source rewriters ---------------- */
  var TIME_PROPS = /((?:animation|transition)(?:-duration|-delay|-delay-before|-delay-after)?\s*:\s*)([^;{}"']*)/g;
  function scaleTimes(src, speed) {
    if (!speed || speed === 1) return src;
    return src.replace(TIME_PROPS, function (m, head, val) {
      return head + val.replace(/(\d*\.?\d+)(ms|s)(?![\w(-])/g, function (mm, n, u) {
        var ms = (u === 's' ? parseFloat(n) * 1000 : parseFloat(n)) / speed;
        if (!isFinite(ms) || ms <= 0) return mm;
        return ms >= 1000 ? (Math.round(ms / 10) / 100) + 's' : Math.max(1, Math.round(ms)) + 'ms';
      });
    });
  }
  function recolor(src, map) {
    var n = 0;
    for (var x in map) n++;
    if (!src || !n) return src;
    return src.replace(CRE, function (m) {
      var c = parseColor(m);
      if (!c) return m;
      var to = map[keyOf(c)];
      if (!to) return m;
      var t = parseColor(to);
      if (!t) return m;
      return emitColor(t, m);
    });
  }

  /* ---------------- palette discovery ---------------- */
  function palette(item) {
    if (item._pal) return item._pal;
    var src = (item.html || '') + '\n' + (item.css || '') + '\n' + (item.js || '');
    var found = {}, order = [], m, re = new RegExp(CRE);
    while ((m = re.exec(src))) {
      var c = parseColor(m[0]);
      if (!c || /transparent|currentcolor/i.test(m[0])) continue;
      var key = keyOf(c);
      if (!found[key]) {
        found[key] = { key: key, hex: hexOf(c), r: c.r, g: c.g, b: c.b, n: 0, chroma: Math.max(c.r, c.g, c.b) - Math.min(c.r, c.g, c.b), light: (c.r + c.g + c.b) / 765 };
        order.push(key);
      }
      found[key].n++;
    }
    var all = order.map(function (k) { return found[k]; });
    var bright = all.filter(function (c) { return c.chroma > 26 && c.light > .08 && c.light < .96; })
      .sort(function (a, b) { return b.n - a.n; });
    var extra = all.filter(function (c) { return bright.indexOf(c) < 0 }).sort(function (a, b) { return b.n - a.n; });
    var slots = bright.slice(0, 3).concat(extra.slice(0, bright.length < 3 ? 3 - bright.length : 1));
    var labels = ['Primary', 'Secondary', 'Accent', 'Ink / surface'];
    item._pal = slots.map(function (c, i) {
      return { key: c.key, label: labels[i] || 'Colour ' + (i + 1), hex: c.hex, uses: c.n };
    });
    return item._pal;
  }

  /* ---------------- settings ---------------- */
  function merge(id) {
    var out = {}, k;
    var g = store[ALL] || {};
    for (k in BASE) out[k] = BASE[k];
    for (k in g) if (k !== 'colors' && k !== 'vars') out[k] = g[k];
    var s = store[id] || {};
    for (k in s) if (k !== 'colors' && k !== 'vars') out[k] = s[k];
    out.colors = {};
    for (k in (g.colors || {})) out.colors[k] = g.colors[k];
    for (k in (s.colors || {})) out.colors[k] = s.colors[k];
    out.vars = {};
    for (k in (g.vars || {})) out.vars[k] = g.vars[k];
    for (k in (s.vars || {})) out.vars[k] = s.vars[k];
    return out;
  }
  var memo = {};
  function get(id) { if (!memo[id]) memo[id] = merge(id); return memo[id]; }
  function dirty(id) { memo[id] = null; }

  function isTuned(id) {
    var s = store[id];
    if (!s) return false;
    for (var k in s) {
      if (k === 'colors' || k === 'vars') { if (Object.keys(s[k] || {}).length) return true; continue; }
      if (s[k] !== BASE[k]) return true;
    }
    return false;
  }
  function set(id, patch) {
    if (!store[id]) store[id] = {};
    for (var k in patch) {
      if (k === 'colors' || k === 'vars') {
        if (!store[id][k]) store[id][k] = {};
        for (var j in patch[k]) {
          if (patch[k][j] === null || patch[k][j] === '') delete store[id][k][j];
          else store[id][k][j] = patch[k][j];
        }
      } else if (patch[k] === null || patch[k] === BASE[k]) {
        delete store[id][k];
      } else store[id][k] = patch[k];
    }
    dirty(id);
    save();
    emit(id);
  }
  function reset(id) { delete store[id]; dirty(id); save(); emit(id); }
  function clearAll() { store = {}; store[ALL] = {}; memo = {}; save(); emit(ALL, true); }

  var subs = [];
  function emit(id, all) { for (var i = 0; i < subs.length; i++) subs[i](id, all); }

  /* ---------------- tuned source for a given effect ---------------- */
  function srcOf(item) {
    if (item._tuned && item._tuned.key === tuneKey(item)) return item._tuned;
    var s = get(item.id);
    var map = s.colors;
    item._tuned = {
      key: tuneKey(item),
      css: recolor(scaleTimes(item.css || '', s.speed), map),
      html: recolor(item.html || '', map),
      js: recolor(item.js || '', map)
    };
    return item._tuned;
  }
  function tuneKey(item) {
    var s = get(item.id);
    try { return JSON.stringify([s.speed, s.colors, s.vars]); } catch (e) { return String(Math.random()); }
  }
  function allows(item, k) { return !(item.tune && item.tune[k] === false); }

  /* wrapper rules produced by the tuner — reused by the exporter */
  function wrapperDecls(item) {
    var s = get(item.id), d = [];
    if (allows(item, 'size') && s.size !== 1) d.push('transform:scale(' + r(s.size) + ')');
    if (allows(item, 'angle') && s.angle) d.push('rotate(' + s.angle + 'deg)');
    if (!d.length && allows(item, 'size')) d.push('transform:none');
    var f = [];
    if (allows(item, 'hue') && s.hue) f.push('hue-rotate(' + s.hue + 'deg)');
    if (allows(item, 'sat') && s.sat !== 100) f.push('saturate(' + r(s.sat / 100) + ')');
    if (allows(item, 'blur') && s.blur) f.push('blur(' + s.blur + 'px)');
    if (allows(item, 'glow') && s.glow) f.push('drop-shadow(0 0 ' + s.glow + 'px ' + glowColor(item) + ')');
    if (f.length) d.push('filter:' + f.join(' '));
    if (allows(item, 'op') && s.op !== 100) d.push('opacity:' + r(s.op / 100));
    return d;
  }
  function r(v) { return Math.round(v * 1000) / 1000; }
  function glowColor(item) {
    var s = get(item.id), p = palette(item);
    var k = p[0] && p[0].key;
    var c = k && s.colors[k] ? parseColor(s.colors[k]) : (k ? { r: +k.split(',')[0], g: +k.split(',')[1], b: +k.split(',')[2], a: 1 } : null);
    if (!c) return 'rgba(124,92,255,.8)';
    return 'rgba(' + Math.round(c.r) + ',' + Math.round(c.g) + ',' + Math.round(c.b) + ',.75)';
  }
  function varDecls(item) {
    var s = get(item.id), out = '';
    for (var k in s.vars) {
      var v = s.vars[k];
      var cfg = cfgFor(item, k);
      if (cfg && cfg.unit && typeof v === 'number') v = v + cfg.unit;
      out += k + ':' + v + ';';
    }
    return out;
  }
  function cfgFor(item, k) {
    if (!item.cfg) return null;
    for (var i = 0; i < item.cfg.length; i++) if (item.cfg[i].k === k) return item.cfg[i];
    return null;
  }

  /* the full stylesheet handed to the shadow root */
  var PREFIX =
    ':host{display:contents}' +
    ':host(.is-paused) *{animation-play-state:paused !important}' +
    '*{box-sizing:border-box}' +
    ':host,div,span,b,i,em,p,button,input,label,svg,figure,figcaption,h4,nav,output{font-family:"Space Grotesk",system-ui,sans-serif}';
  function styleFor(item) {
    var s = get(item.id), css = srcOf(item).css;
    var extra = [];
    var wd = wrapperDecls(item);
    if (wd.length) extra.push('.demo-root{' + wd.join(';') + ';transition:transform .2s ease,filter .2s ease,opacity .2s ease}');
    if (s.dir !== 'normal') extra.push('.demo-root *{animation-direction:' + s.dir + ' !important}');
    if (s.ease) extra.push('.demo-root *{animation-timing-function:' + s.ease + ' !important}');
    var vars = varDecls(item);
    if (vars) extra.push('.demo-root{' + vars + '}');
    return PREFIX + css + (extra.length ? '\n' + extra.join('\n') : '');
  }
  /* exported snippet: the demo, already carrying the user's settings */
  function exportCss(item) {
    var s = get(item.id), out = srcOf(item).css, extra = [];
    var wd = wrapperDecls(item);
    if (wd.length) extra.push('.ml-tuned{' + wd.join(';') + '}');
    if (s.dir !== 'normal') extra.push('.ml-tuned *{animation-direction:' + s.dir + '}');
    if (s.ease) extra.push('.ml-tuned *{animation-timing-function:' + s.ease + '}');
    return out + (extra.length ? '\n' + extra.join('\n') : '');
  }
  function exportAttrs(item) {
    var vars = varDecls(item);
    return ' class="ml-tuned"' + (vars ? ' style="' + vars + '"' : '');
  }

  function rate(item) { return allows(item, 'speed') ? get(item.id).speed : 1; }

  /* the wrapper inline style every demo host gets */
  var WRAP = 'display:grid;place-items:center;width:100%;transform-origin:50% 50%';
  /* live update of an already mounted instance — no remount, so JS demos keep
     their state and CSS animations keep their phase */
  function applyLive(item, inst) {
    if (!inst || !inst.wrap) return;
    inst.styleEl.textContent = styleFor(item);
    inst.wrap.setAttribute('style', WRAP + (varDecls(item) ? ';' + varDecls(item) : ''));
    for (var i = 0; i < inst.tasks.length; i++) inst.tasks[i].rate = rate(item);
  }
  /* colour literals also live inside the demo's JS, so those demos need a re-run */
  function needsRerun(item) {
    if (!item.js) return false;
    var c = get(item.id).colors;
    for (var k in c) if (c[k]) return true;
    return false;
  }

  /* ---------------- panel ---------------- */
  var UNIVERSAL = [
    { t: 'range', label: 'Speed', k: 'speed', min: .1, max: 4, step: .05, unit: '×', helps: 'rescales every duration & delay' },
    { t: 'range', label: 'Scale', k: 'size', min: .35, max: 2.6, step: .05, unit: '×' },
    { t: 'range', label: 'Rotate', k: 'angle', min: -180, max: 180, step: 1, unit: '°' },
    { t: 'range', label: 'Hue shift', k: 'hue', min: 0, max: 360, step: 1, unit: '°' },
    { t: 'range', label: 'Saturation', k: 'sat', min: 0, max: 250, step: 1, unit: '%' },
    { t: 'range', label: 'Glow', k: 'glow', min: 0, max: 40, step: 1, unit: 'px' },
    { t: 'range', label: 'Blur', k: 'blur', min: 0, max: 12, step: .5, unit: 'px' },
    { t: 'range', label: 'Opacity', k: 'op', min: 15, max: 100, step: 1, unit: '%' },
    { t: 'select', label: 'Direction', k: 'dir', opts: [['normal', 'Forward'], ['reverse', 'Reverse'], ['alternate', 'Alternate']] },
    { t: 'select', label: 'Easing', k: 'ease', opts: [['', 'As authored'], ['linear', 'linear'], ['ease', 'ease'], ['ease-in-out', 'ease-in-out'], ['cubic-bezier(.34,1.56,.64,1)', 'springy'], ['cubic-bezier(.7,0,.3,1)', 'dramatic'], ['steps(6,end)', 'stop-motion'], ['steps(16,end)', 'stop-motion fine']] }
  ];

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function fmtVal(c, v) {
    if (c.k === 'speed') return (Math.round(v * 100) / 100) + '\u00d7';
    if (c.unit === '\u00b0' || c.unit === '%') return Math.round(v) + c.unit;
    if (c.unit === 'px') return (Math.round(v * 10) / 10) + 'px';
    if (c.unit === '\u00d7') return (Math.round(v * 100) / 100) + '\u00d7';
    return '' + (Math.round(v * 100) / 100) + (c.unit || '');
  }

  /* one control row. `c` is a descriptor, `cur` its current value, `set` the sink */
  function buildRow(c, cur, onChange) {
    if (c.t === 'select') {
      var s = el('label', 'tz tz-select');
      s.innerHTML = '<span class="tz-l">' + c.label + '</span><select>' + c.opts.map(function (o) {
        return '<option value="' + o[0] + '"' + (String(cur == null ? '' : cur) === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
      }).join('') + '</select>';
      s.querySelector('select').addEventListener('change', function (e) { onChange(e.target.value); });
      return s;
    }
    if (c.t === 'switch') {
      var w = el('label', 'tz tz-switch');
      w.innerHTML = '<span class="tz-l">' + c.label + '</span><input type="checkbox"' + (cur ? ' checked' : '') + '>';
      w.querySelector('input').addEventListener('change', function (e) { onChange(e.target.checked); });
      return w;
    }
    if (c.t === 'color') {
      var cr = el('label', 'tz tz-color');
      cr.innerHTML = '<span class="tz-l">' + c.label + '</span><span class="tz-sw"><input type="color" title="' + c.label + '"><button class="tz-x" type="button" title="Back to the authored colour">\u21ba</button></span>';
      var pick = cr.querySelector('input'), sw = cr.querySelector('.tz-sw');
      var start = /^#[0-9a-fA-F]{6}$/.test(cur || '') ? cur : (c.v || '#ffffff');
      pick.value = start;
      sw.style.setProperty('--sw', start);
      pick.addEventListener('input', function () { sw.style.setProperty('--sw', pick.value); onChange(pick.value); });
      cr.querySelector('.tz-x').addEventListener('click', function () { sw.style.setProperty('--sw', c.v || '#ffffff'); onChange(null); });
      return cr;
    }
    var row = el('label', 'tz');
    row.innerHTML = '<span class="tz-l">' + c.label + '</span><output class="tz-v"></output>' +
      '<input type="range" min="' + c.min + '" max="' + c.max + '" step="' + c.step + '" aria-label="' + c.label + '">';
    var input = row.querySelector('input'), out = row.querySelector('output');
    var def = c.k === 'speed' || c.k === 'size' ? 1 : c.k === 'sat' || c.k === 'op' ? 100 : c.v;
    if (cur == null) cur = def;
    input.value = cur;
    out.textContent = fmtVal(c, +cur);
    input.addEventListener('input', function () { out.textContent = fmtVal(c, +input.value); onChange(+input.value); });
    input.addEventListener('dblclick', function () { input.value = def; out.textContent = fmtVal(c, def); onChange(def); });
    return row;
  }

  /* builds the whole panel into `host` for one effect (or for "*" = every effect) */
  function buildPanel(item, host, opts) {
    opts = opts || {};
    host.innerHTML = '';
    var id = opts.scope || item.id;
    var all = id === ALL;
    var s = get(id);

    function patch(key, val) {
      var p = {};
      if (key.slice(0, 6) === 'color:') p.colors = {}, p.colors[key.slice(6)] = val;
      else if (key.slice(0, 4) === 'var:') p.vars = {}, p.vars[key.slice(4)] = val;
      else p[key] = val;
      set(id, p);
      if (opts.onChange) opts.onChange();
    }
    function section(title, note) {
      host.appendChild(el('div', 'tz-sec', '<h4>' + title + '</h4>' + (note ? '<p>' + note + '</p>' : '')));
    }
    function group(rows) {
      var box = el('div', 'tz-grid');
      rows.forEach(function (r) { if (r) box.appendChild(r); });
      host.appendChild(box);
    }

    /* motion */
    var motion = UNIVERSAL.filter(function (c) { return ['speed', 'dir', 'ease'].indexOf(c.k) > -1 && allows(item, c.k); })
      .map(function (c) { return buildRow(c, s[c.k], function (v) { patch(c.k, v); }); });
    section('Motion', all ? 'applies to every effect in the lab' : 'speed rewrites the real timings of this demo');
    group(motion);

    /* look */
    var look = UNIVERSAL.filter(function (c) { return ['size', 'angle', 'hue', 'sat', 'glow', 'blur', 'op'].indexOf(c.k) > -1 && allows(item, c.k); })
      .map(function (c) { return buildRow(c, s[c.k], function (v) { patch(c.k, v); }); });
    section('Look', 'wrapper level, so it works on DOM, SVG and canvas demos alike');
    group(look);

    /* colours found in the demo */
    var pal = palette(item);
    if (pal.length) {
      section('Colours', pal.length + ' colour' + (pal.length > 1 ? 's' : '') + ' found in this source \u2014 swap one and every place it appears follows');
      group(pal.map(function (p) {
        return buildRow({ t: 'color', label: p.label + ' <em>' + p.hex + ' \u00b7 ' + p.uses + '\u00d7</em>', k: 'color:' + p.key, v: p.hex }, s.colors[p.key] || p.hex, function (v) { patch('color:' + p.key, v); });
      }).concat([presetStrip(item, pal, function (map) {
        var p = { colors: map };
        set(id, p);
        if (opts.onChange) opts.onChange();
        buildPanel(item, host, opts);
      })]));
    }

    /* parameters the demo exposes */
    if (item.cfg && item.cfg.length) {
      section('Parameters', item.cfg.length + ' knob' + (item.cfg.length > 1 ? 's' : '') + ' this demo exposes itself');
      group(item.cfg.map(function (c) {
        var cur = s.vars[c.k] !== undefined ? s.vars[c.k] : c.v;
        return buildRow({ t: c.t === 'color' ? 'color' : c.t === 'select' ? 'select' : c.t === 'switch' ? 'switch' : 'range', label: c.label, k: c.k, v: c.v, min: c.min, max: c.max, step: c.step, unit: c.unit, opts: c.opts }, cur, function (v) { patch('var:' + c.k, v); });
      }));
    } else {
      section('Parameters', 'no extra knobs on this one \u2014 the controls above still drive it');
    }

    /* footer */
    var bar = el('div', 'tz-foot');
    bar.innerHTML =
      '<button class="btn-ghost sm" data-a="rand" type="button">Randomise \u2726</button>' +
      (all ? '<button class="btn-ghost sm" data-a="clear" type="button">Clear every override</button>'
           : '<button class="btn-ghost sm" data-a="all" type="button">Apply to all</button>') +
      '<button class="btn-ghost sm" data-a="reset" type="button">Reset</button>';
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.a === 'rand') { randomise(id, item, null); buildPanel(item, host, opts); }
      if (b.dataset.a === 'all') { broadcast(id); if (global.MotionLabToast) global.MotionLabToast('Copied to every effect in the collection'); }
      if (b.dataset.a === 'clear') { clearAll(); buildPanel(item, host, opts); if (global.MotionLabToast) global.MotionLabToast('All overrides cleared'); }
      if (b.dataset.a === 'reset') { reset(id); buildPanel(item, host, opts); }
    });
    host.appendChild(bar);
  }

  function presetStrip(item, pal, apply) {
    var presets = [
      ['#7c5cff', '#22d3ee', '#ff5c8a'], ['#34d399', '#a7f3d0', '#0891b2'],
      ['#f59e0b', '#ef4444', '#fde68a'], ['#60a5fa', '#c084fc', '#f0abfc'],
      ['#f8fafc', '#94a3b8', '#334155'], ['#ff4d8d', '#ffd166', '#06d6a0']
    ];
    var box = el('div', 'tz-presets');
    box.appendChild(el('span', 'tz-pl', 'Presets'));
    presets.forEach(function (p, i) {
      var b = el('button', 'tz-preset');
      b.type = 'button';
      b.title = 'Palette ' + (i + 1);
      b.innerHTML = p.map(function (c) { return '<span style="background:' + c + '"></span>'; }).join('');
      b.addEventListener('click', function () {
        var map = {};
        pal.forEach(function (slot, j) {
          var to = parseColor(p[j % p.length]), from = parseColor(slot.hex);
          if (to && from) map[slot.key] = hexOf({ r: to.r, g: to.g, b: to.b, a: 1 });
        });
        apply(map);
      });
      box.appendChild(b);
    });
    return box;
  }

  function randomise(id, item, done) {
    var s = get(id), patch = { speed: Math.round((.5 + Math.random() * 1.7) * 20) / 20, size: Math.round((.85 + Math.random() * .5) * 20) / 20, hue: Math.round(Math.random() * 360), sat: Math.round(80 + Math.random() * 120), glow: Math.random() < .5 ? 0 : Math.round(Math.random() * 26), angle: 0, blur: 0, op: 100, dir: Math.random() < .2 ? 'alternate' : 'normal', colors: {} };
    palette(item).forEach(function (p) {
      var c = parseColor(s.colors[p.key] || p.hex);
      if (!c) return;
      var h = rgb2hsl(c.r, c.g, c.b);
      var n = hsl2rgb(h[0] + (Math.random() * 160 - 80), Math.max(35, h[1] * (.7 + Math.random() * .6)), Math.max(30, Math.min(78, h[2] * (.8 + Math.random() * .5))));
      patch.colors[p.key] = hexOf({ r: n[0], g: n[1], b: n[2], a: 1 });
    });
    if (item.cfg) {
      patch.vars = {};
      item.cfg.forEach(function (c) {
        if (c.t === 'range') patch.vars[c.k] = Math.round((c.min + Math.random() * (c.max - c.min)) / (c.step || 1)) * (c.step || 1);
        else if (c.t === 'color') patch.vars[c.k] = accent(Math.floor(Math.random() * 12));
      });
    }
    set(id, patch);
    if (done) done();
  }
  function accent(i) { return (global.MLKit && global.MLKit.ACCENT[i % global.MLKit.ACCENT.length]) || '#7c5cff'; }

  function broadcast(id) {
    if (id === ALL) { emit(ALL, true); return; }
    var s = store[id];
    if (!s) return;
    store[ALL] = JSON.parse(JSON.stringify(s));
    memo = {};
    save();
    emit(ALL, true);
  }

  /* ---------------- public ---------------- */
  global.MotionLabTune = {
    BASE: BASE,
    get: get, set: set, reset: reset, isTuned: isTuned, clearAll: clearAll,
    palette: palette, rate: rate, applyLive: applyLive, needsRerun: needsRerun, WRAP: WRAP, varDecls: varDecls,
    styleFor: styleFor, srcOf: srcOf, exportCss: exportCss, exportAttrs: exportAttrs,
    buildPanel: buildPanel, randomise: randomise, broadcast: broadcast,
    on: function (cb) { subs.push(cb); },
    count: function () { return Object.keys(store).filter(function (k) { return k !== ALL && Object.keys(store[k]).length; }).length; },
    store: function () { return store; }
  };
})(window);
