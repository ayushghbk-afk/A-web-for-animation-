/* ============================================================
   Motion Lab — After Effects bridge (pure core)
   ------------------------------------------------------------
   Turns an effect data object + its current tuner values into a standalone
   ExtendScript builder. The downloaded .jsx runs inside After Effects and
   recreates the effect with native shape/text layers, expressions and a
   Controls null, then writes .aep / .aepx / .mogrt files as requested.

   This file deliberately has no DOM dependency. It is shared by the browser
   exporter and tools/build-ae-assets.mjs.
   ============================================================ */
(function (global, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else global.MotionLabAECore = api;
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  var VERSION = '1.0.0';
  var ARCHETYPES = ['ring', 'dots', 'bars', 'grid', 'pulse', 'orbit', 'button', 'text', 'card', 'background', 'control', 'line', 'three', 'motion', 'shape'];

  function clamp(n, a, b) { n = Number(n); return isFinite(n) ? Math.max(a, Math.min(b, n)) : a; }
  function slug(s) {
    return String(s || 'effect').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 72) || 'effect';
  }
  function pad(n) { n = String(Math.max(0, Number(n) || 0)); while (n.length < 3) n = '0' + n; return n; }
  function copy(o) {
    var out = {}, k;
    o = o || {};
    for (k in o) if (Object.prototype.hasOwnProperty.call(o, k)) out[k] = o[k];
    return out;
  }
  function stripHtml(s) {
    return String(s || '')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
      .replace(/&#(\d+);/g, function (_, n) { return String.fromCharCode(+n); })
      .replace(/\s+/g, ' ').trim();
  }
  function hex(s, fallback) {
    s = String(s || '').trim();
    var m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(s);
    if (!m) return fallback || '#7c5cff';
    var h = m[1];
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    return '#' + h.toLowerCase();
  }
  function hexRgb(s) {
    s = hex(s, '#7c5cff').slice(1);
    return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
  }
  function rgbHex(rgb) {
    function h(n) { n = Math.round(clamp(n, 0, 255)).toString(16); return n.length < 2 ? '0' + n : n; }
    return '#' + h(rgb[0]) + h(rgb[1]) + h(rgb[2]);
  }
  function rgbHsl(rgb) {
    var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
    var mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, h = 0;
    var l = (mx + mn) / 2, s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
    if (d) {
      if (mx === r) h = 60 * (((g - b) / d) % 6);
      else if (mx === g) h = 60 * ((b - r) / d + 2);
      else h = 60 * ((r - g) / d + 4);
    }
    return [h < 0 ? h + 360 : h, s, l];
  }
  function hslRgb(hsl) {
    var h = ((hsl[0] % 360) + 360) % 360, s = clamp(hsl[1], 0, 1), l = clamp(hsl[2], 0, 1);
    var c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2, q;
    if (h < 60) q = [c, x, 0]; else if (h < 120) q = [x, c, 0]; else if (h < 180) q = [0, c, x];
    else if (h < 240) q = [0, x, c]; else if (h < 300) q = [x, 0, c]; else q = [c, 0, x];
    return [(q[0] + m) * 255, (q[1] + m) * 255, (q[2] + m) * 255];
  }
  function applyLook(col, settings) {
    var hsl = rgbHsl(hexRgb(col));
    hsl[0] += Number(settings.hue) || 0;
    hsl[1] = clamp(hsl[1] * ((Number(settings.sat) || 100) / 100), 0, 1);
    return rgbHex(hslRgb(hsl));
  }
  function valueOf(item, settings, keys, fallback) {
    var cfg = item.cfg || [], vars = settings.vars || {}, i, j, c;
    for (i = 0; i < keys.length; i++) if (vars[keys[i]] !== undefined) return vars[keys[i]];
    for (i = 0; i < keys.length; i++) {
      for (j = 0; j < cfg.length; j++) {
        c = cfg[j];
        if (c.k === keys[i] && c.v !== undefined) return c.v;
      }
    }
    return fallback;
  }
  function durationOf(item, settings, css) {
    var cfg = item.cfg || [], vars = settings.vars || {}, i, c, v;
    for (i = 0; i < cfg.length; i++) {
      c = cfg[i];
      if (c.t !== 'range') continue;
      if (c.unit === 's' && /dur|cycle|speed|orbit|delay|time/i.test(c.k + ' ' + c.label)) {
        v = vars[c.k] !== undefined ? vars[c.k] : c.v;
        if (isFinite(Number(v)) && Number(v) > 0) return clamp(Number(v), .12, 30);
      }
      if (c.unit === 'ms' && /dur|cycle|speed|delay|time/i.test(c.k + ' ' + c.label)) {
        v = vars[c.k] !== undefined ? vars[c.k] : c.v;
        if (isFinite(Number(v)) && Number(v) > 0) return clamp(Number(v) / 1000, .12, 30);
      }
    }
    css = String(css || item.css || '');
    var m = /(?:animation(?:-duration)?\s*:[^;{}]*?|var\(--(?:dur|speed|time)[^,]*,)\s*(\d*\.?\d+)\s*(ms|s)\b/i.exec(css);
    if (!m) m = /\b(\d*\.?\d+)\s*(ms|s)\b/i.exec(css);
    if (!m) return 2;
    return clamp(parseFloat(m[1]) * (m[2].toLowerCase() === 'ms' ? .001 : 1), .12, 30);
  }
  function elementCount(item) {
    var html = String(item.html || ''), m = html.match(/<(?:i|span|b|li|path|circle|rect|button)\b/gi);
    var n = m ? m.length : 1;
    var title = /(\d{1,3})\b/.exec(item.title || '');
    if (title && +title[1] > 1 && +title[1] < 101) n = Math.max(n, +title[1]);
    return clamp(n, 1, 36);
  }
  function archetype(item) {
    var cat = String(item.cat || ''), hay = (item.id + ' ' + item.title + ' ' + (item.tags || []).join(' ') + ' ' + (item.family || '')).toLowerCase();
    if (cat === 'buttons') return 'button';
    if (cat === 'text') return 'text';
    if (cat === 'cards') return 'card';
    if (cat === 'backgrounds') return 'background';
    if (cat === 'controls') return 'control';
    if (cat === 'svg') return 'line';
    if (cat === '3d') return 'three';
    if (cat === 'motion') return 'motion';
    if (/orbit|atom|solar|planet|saturn/.test(hay)) return 'orbit';
    if (/ring|spinner|conic|arc|radial|clock|gauge/.test(hay)) return 'ring';
    if (/dot|bubble|ellipsis|typing/.test(hay)) return 'dots';
    if (/equal|\bbar|bars|meter|waveform|audio|progress/.test(hay)) return 'bars';
    if (/grid|mosaic|matrix|checker|tile/.test(hay)) return 'grid';
    if (/pulse|ripple|beacon|ping|sonar|halo|heartbeat/.test(hay)) return 'pulse';
    if (/text|word|letter|type/.test(hay)) return 'text';
    return 'shape';
  }
  function colorsOf(item, settings, palette) {
    var out = [], seen = {}, vars = settings.vars || {}, cfg = item.cfg || [], i, c, v, h, mapped;
    function add(col) {
      col = applyLook(hex(col, ''), settings);
      if (!/^#[0-9a-f]{6}$/i.test(col) || seen[col]) return;
      seen[col] = 1; out.push(col);
    }
    for (i = 0; i < cfg.length; i++) {
      c = cfg[i];
      if (c.t !== 'color') continue;
      v = vars[c.k] !== undefined ? vars[c.k] : c.v;
      add(v);
    }
    for (i = 0; i < (palette || []).length; i++) {
      c = palette[i];
      mapped = (settings.colors || {})[c.key];
      add(mapped || c.hex);
    }
    var src = String(item.html || '') + '\n' + String(item.css || '') + '\n' + String(item.js || '');
    var re = /#[0-9a-f]{3,6}\b/ig;
    while ((h = re.exec(src)) && out.length < 4) add(h[0]);
    ['#7c5cff', '#22d3ee', '#ff5c8a', '#e8e8f5'].forEach(add);
    return out.slice(0, 4);
  }
  function layerEstimate(kind, count) {
    if (kind === 'ring') return count > 1 ? 4 : 3;
    if (kind === 'dots' || kind === 'bars') return clamp(count, 3, 12) + 2;
    if (kind === 'grid') return Math.pow(clamp(Math.round(Math.sqrt(count || 9)), 3, 5), 2) + 2;
    if (kind === 'pulse') return 5;
    if (kind === 'orbit') return 8;
    if (kind === 'background') return 26;
    if (kind === 'three') return 9;
    return 4;
  }

  function profile(item, opts) {
    opts = opts || {};
    var settings = copy(opts.settings || {});
    settings.colors = copy(settings.colors);
    settings.vars = copy(settings.vars);
    var kind = archetype(item), count = elementCount(item), index = Number(opts.index) || 1;
    var tunedCount = Number(valueOf(item, settings, ['--count', '--n', '--dots', '--bars', '--cells'], NaN));
    if (isFinite(tunedCount) && tunedCount > 1) count = clamp(Math.round(tunedCount), 1, 36);
    var w = clamp(valueOf(item, settings, ['--w', '--width', '--size', '--sz'], 180), 36, 720);
    var h = clamp(valueOf(item, settings, ['--h', '--height'], kind === 'bars' ? 100 : w), 30, 540);
    var elementSize = clamp(valueOf(item, settings, ['--dot', '--cell', '--bar-w'], kind === 'dots' ? 16 : kind === 'grid' ? 18 : 12), 2, 100);
    var gap = clamp(valueOf(item, settings, ['--gap'], 12), 0, 100);
    var strokeWidth = clamp(valueOf(item, settings, ['--thick', '--stroke'], 6), 1, 80);
    var roundness = clamp(valueOf(item, settings, ['--radius', '--corner'], 12), 0, 100);
    /* Keep Cycle and Speed independent in AE. The browser tuner's rewritten CSS
       already divides durations by Speed, so always read authored CSS here to
       avoid applying a universal speed override twice. Per-effect --dur values
       are read from settings.vars above. */
    var cycle = durationOf(item, settings, item.css);
    var label = stripHtml(item.html);
    if (!label || label.length > 42 || /^[\W\d_]+$/.test(label)) label = item.title;
    var cols = colorsOf(item, settings, opts.palette || []);
    var p = {
      schema: 'motion-lab/ae-profile@1',
      bridgeVersion: VERSION,
      id: String(item.id || slug(item.title)),
      index: index,
      fileBase: pad(index) + '-' + slug(item.id || item.title),
      title: String(item.title || item.id || 'Motion Lab Effect'),
      category: String(item.cat || 'effect'),
      tags: (item.tags || []).slice(0, 12),
      archetype: kind,
      label: label.slice(0, 42),
      count: count,
      width: Math.round(w),
      height: Math.round(h),
      elementSize: Math.round(elementSize * 100) / 100,
      gap: Math.round(gap * 100) / 100,
      strokeWidth: Math.round(strokeWidth * 100) / 100,
      roundness: Math.round(roundness * 100) / 100,
      cycle: Math.round(cycle * 1000) / 1000,
      compDuration: Math.round(clamp(cycle * 3, Math.max(6, cycle), 60) * 100) / 100,
      fps: 60,
      speed: clamp(settings.speed === undefined ? 1 : settings.speed, .1, 8),
      masterScale: clamp((settings.size === undefined ? 1 : settings.size) * 100, 10, 400),
      masterRotation: clamp(settings.angle || 0, -720, 720),
      masterOpacity: clamp(settings.op === undefined ? 100 : settings.op, 0, 100),
      direction: settings.dir === 'reverse' ? -1 : 1,
      alternate: settings.dir === 'alternate',
      easing: String(settings.ease || ''),
      amount: Math.round(clamp(Math.max(w, h) * .32, 30, 150)),
      glow: clamp(Math.max(Number(settings.glow) || 0, Number(valueOf(item, settings, ['--glow'], 0)) || 0), 0, 200),
      blur: clamp(settings.blur || 0, 0, 100),
      hue: Number(settings.hue) || 0,
      saturation: Number(settings.sat) || 100,
      tuningVars: copy(settings.vars),
      colors: cols,
      layerEstimate: layerEstimate(kind, count),
      tuned: !!opts.tuned,
      source: 'Motion Lab web effect #' + index,
      license: 'MIT'
    };
    return p;
  }

  function manifest(p) {
    return {
      schema: 'motion-lab/ae-manifest@1',
      generatedBy: 'Motion Lab After Effects Bridge ' + VERSION,
      generatedAt: new Date().toISOString(),
      effect: p,
      outputs: {
        builder: p.fileBase + '.jsx',
        project: p.fileBase + '.aep',
        xmlProject: p.fileBase + '.aepx',
        motionGraphicsTemplate: p.fileBase + '.mogrt',
        preset: 'Select the generated Controls layer, then use Animation > Save Animation Preset.'
      },
      notes: [
        'Run the JSX inside After Effects via File > Scripts > Run Script File.',
        'The builder creates native editable layers; CSS/DOM rendering is not embedded.',
        'AEP and AEPX are written by After Effects itself for format safety.'
      ]
    };
  }

  function expression(p) {
    var ease = String(p.easing || '').toLowerCase(), easeLine = '';
    var steps = /steps\((\d+)/.exec(ease);
    if (steps) easeLine = 'phase = Math.floor(phase * ' + Math.max(1, +steps[1]) + ') / ' + Math.max(1, +steps[1]) + '; // steps\n';
    else if (ease === 'ease-in') easeLine = 'phase = phase * phase; // ease-in\n';
    else if (ease === 'ease-out') easeLine = 'phase = 1 - Math.pow(1 - phase, 2); // ease-out\n';
    else if (ease && ease !== 'linear') easeLine = 'phase = phase * phase * (3 - 2 * phase); // eased\n';
    var head = '// Motion Lab · ' + p.title + '\n' +
      '// Paste on Position (dots/bars/motion), Rotation (rings) or adapt to taste.\n' +
      'var controls = thisComp.layer("Controls");\n' +
      'var speed = controls.effect("Speed")("Slider");\n' +
      'var cycle = Math.max(controls.effect("Cycle")("Slider"), 0.01);\n' +
      'var amount = controls.effect("Amount")("Slider");\n' +
      'var direction = controls.effect("Direction")("Slider");\n' +
      'var phase = time * speed * direction / cycle;\n' +
      'phase = phase - Math.floor(phase);\n' +
      (p.alternate ? 'phase = 1 - Math.abs(1 - 2 * phase); // alternate\n' : '') + easeLine;
    if (p.archetype === 'ring' || p.archetype === 'orbit' || p.archetype === 'three') return head + 'value + phase * 360;\n';
    if (p.archetype === 'pulse' || p.archetype === 'grid' || p.archetype === 'button' || p.archetype === 'card') {
      return head + 'var pulse = 100 + Math.sin(phase * Math.PI * 2 + (index - 1) * 0.45) * amount * 0.12;\n[pulse, pulse];\n';
    }
    return head + 'value + [0, Math.sin(phase * Math.PI * 2 + (index - 1) * 0.55) * amount];\n';
  }

  /* The block below is emitted verbatim as ExtendScript. Keeping the runtime
     here makes browser downloads and batch-generated builders byte-identical. */
  var JSX_RUNTIME = function () {/*
#target aftereffects
(function MotionLabAEBuilder() {
  var PROFILES = __ML_PROFILES__;
  var OPTIONS = __ML_OPTIONS__;
  var comps = [];
  var folders = {};
  var comp, ctrl, rig, P, mogrtProps;

  function rgb(h) {
    h = String(h || '#7c5cff').replace('#', '');
    return [parseInt(h.substr(0, 2), 16) / 255, parseInt(h.substr(2, 2), 16) / 255, parseInt(h.substr(4, 2), 16) / 255];
  }
  function safeName(s) { return String(s || 'effect').replace(/[\\\/:*?"<>|]/g, '-'); }
  function setExpr(prop, text) { try { if (prop && prop.canSetExpression) prop.expression = text; } catch (e) {} }
  function fx(layer, matchName, name, value) {
    var e = layer.property('ADBE Effect Parade').addProperty(matchName);
    e.name = name;
    e.property(1).setValue(value);
    try {
      if (typeof e.property(1).canAddToMotionGraphicsTemplate === 'function' && e.property(1).canAddToMotionGraphicsTemplate(comp)) {
        e.property(1).addToMotionGraphicsTemplateAs(comp, name);
        mogrtProps.push(e.property(1));
      }
    } catch (ignore) {}
    return e.property(1);
  }
  function controls() {
    mogrtProps = [];
    ctrl = comp.layers.addNull();
    ctrl.name = 'Controls';
    ctrl.label = 10;
    ctrl.guideLayer = true;
    ctrl.shy = true;
    fx(ctrl, 'ADBE Slider Control', 'Speed', P.speed);
    fx(ctrl, 'ADBE Slider Control', 'Cycle', P.cycle);
    fx(ctrl, 'ADBE Slider Control', 'Amount', P.amount);
    fx(ctrl, 'ADBE Slider Control', 'Direction', P.direction);
    fx(ctrl, 'ADBE Slider Control', 'Master Scale', P.masterScale);
    fx(ctrl, 'ADBE Angle Control', 'Master Rotation', P.masterRotation);
    fx(ctrl, 'ADBE Slider Control', 'Master Opacity', P.masterOpacity);
    fx(ctrl, 'ADBE Slider Control', 'Glow', P.glow);
    fx(ctrl, 'ADBE Slider Control', 'Blur', P.blur);
    fx(ctrl, 'ADBE Color Control', 'Primary Color', rgb(P.colors[0]));
    fx(ctrl, 'ADBE Color Control', 'Secondary Color', rgb(P.colors[1]));
    fx(ctrl, 'ADBE Color Control', 'Accent Color', rgb(P.colors[2]));
  }
  function makeRig() {
    rig = comp.layers.addNull();
    rig.name = 'Motion Rig';
    rig.label = 11;
    rig.threeDLayer = true;
    rig.property('ADBE Transform Group').property('ADBE Position').setValue([comp.width / 2, comp.height / 2, 0]);
    setExpr(rig.property('ADBE Transform Group').property('ADBE Scale'), 'var c=thisComp.layer("Controls");var s=c.effect("Master Scale")(1);[s,s,s];');
    setExpr(rig.property('ADBE Transform Group').property('ADBE Rotate Z'), 'thisComp.layer("Controls").effect("Master Rotation")(1);');
    setExpr(rig.property('ADBE Transform Group').property('ADBE Opacity'), 'thisComp.layer("Controls").effect("Master Opacity")(1);');
  }
  function colorExpr(slot) { return 'thisComp.layer("Controls").effect("' + slot + ' Color")(1);'; }
  function easeCode() {
    var e = String(P.easing || '').toLowerCase(), m;
    if (!e || e === 'linear') return '';
    if ((m = /steps\((\d+)/.exec(e))) return 'p=Math.floor(p*' + Math.max(1, parseInt(m[1], 10)) + ')/' + Math.max(1, parseInt(m[1], 10)) + ';';
    if (e === 'ease-in') return 'p=p*p;';
    if (e === 'ease-out') return 'p=1-Math.pow(1-p,2);';
    return 'p=p*p*(3-2*p);';
  }
  function phase(off) {
    return 'var c=thisComp.layer("Controls");var sp=c.effect("Speed")(1);var cy=Math.max(c.effect("Cycle")(1),.01);var dr=c.effect("Direction")(1);var p=time*sp*dr/cy+' + (off || 0) + ';p=p-Math.floor(p);' + (P.alternate ? 'p=1-Math.abs(1-2*p);' : '') + easeCode();
  }
  function glow(layer) {
    try {
      var g = layer.property('ADBE Effect Parade').addProperty('ADBE Glo2');
      g.name = 'Glow · Controls';
      if (g.numProperties >= 4) {
        setExpr(g.property(3), 'thisComp.layer("Controls").effect("Glow")(1);');
        g.property(4).setValue(1.25);
      }
    } catch (e) {}
    try {
      var b = layer.property('ADBE Effect Parade').addProperty('ADBE Gaussian Blur 2');
      b.name = 'Blur · Controls';
      setExpr(b.property(1), 'thisComp.layer("Controls").effect("Blur")(1);');
      if (b.numProperties >= 3) b.property(3).setValue(true);
    } catch (ignore) {}
  }
  function ellipse(name, w, h, fillSlot, strokeSlot, sw) {
    var l = comp.layers.addShape();
    l.name = name;
    var root = l.property('ADBE Root Vectors Group');
    var group = root.addProperty('ADBE Vector Group');
    group.name = name;
    var contents = group.property('ADBE Vectors Group');
    var path = contents.addProperty('ADBE Vector Shape - Ellipse');
    path.property('ADBE Vector Ellipse Size').setValue([w, h]);
    if (fillSlot) {
      var fill = contents.addProperty('ADBE Vector Graphic - Fill');
      fill.name = fillSlot + ' Fill';
      setExpr(fill.property('ADBE Vector Fill Color'), colorExpr(fillSlot));
    }
    if (strokeSlot) {
      var stroke = contents.addProperty('ADBE Vector Graphic - Stroke');
      stroke.name = strokeSlot + ' Stroke';
      stroke.property('ADBE Vector Stroke Width').setValue(sw || 6);
      stroke.property('ADBE Vector Stroke Line Cap').setValue(2);
      setExpr(stroke.property('ADBE Vector Stroke Color'), colorExpr(strokeSlot));
    }
    l.property('ADBE Transform Group').property('ADBE Position').setValue([comp.width / 2, comp.height / 2]);
    l.parent = rig;
    glow(l);
    return { layer: l, contents: contents, group: group };
  }
  function rect(name, w, h, roundness, fillSlot, strokeSlot, sw) {
    var l = comp.layers.addShape();
    l.name = name;
    var group = l.property('ADBE Root Vectors Group').addProperty('ADBE Vector Group');
    group.name = name;
    var contents = group.property('ADBE Vectors Group');
    var path = contents.addProperty('ADBE Vector Shape - Rect');
    path.property('ADBE Vector Rect Size').setValue([w, h]);
    path.property('ADBE Vector Rect Roundness').setValue(roundness || 0);
    if (fillSlot) {
      var fill = contents.addProperty('ADBE Vector Graphic - Fill');
      setExpr(fill.property('ADBE Vector Fill Color'), colorExpr(fillSlot));
    }
    if (strokeSlot) {
      var stroke = contents.addProperty('ADBE Vector Graphic - Stroke');
      stroke.property('ADBE Vector Stroke Width').setValue(sw || 4);
      setExpr(stroke.property('ADBE Vector Stroke Color'), colorExpr(strokeSlot));
    }
    l.property('ADBE Transform Group').property('ADBE Position').setValue([comp.width / 2, comp.height / 2]);
    l.parent = rig;
    glow(l);
    return { layer: l, contents: contents, group: group };
  }
  function textLayer(name, text, size, col) {
    var l = comp.layers.addText(text);
    l.name = name;
    var source = l.property('ADBE Text Properties').property('ADBE Text Document');
    var doc = source.value;
    doc.fontSize = size;
    doc.fillColor = rgb(col || P.colors[0]);
    doc.justification = ParagraphJustification.CENTER_JUSTIFY;
    try { doc.font = 'Arial-BoldMT'; } catch (e) {}
    source.setValue(doc);
    l.property('ADBE Transform Group').property('ADBE Position').setValue([comp.width / 2, comp.height / 2 + size * .34]);
    l.parent = rig;
    try {
      var f = l.property('ADBE Effect Parade').addProperty('ADBE Fill');
      setExpr(f.property(1), colorExpr('Primary'));
    } catch (ignore) {}
    glow(l);
    return l;
  }
  function readme() {
    var msg = 'MOTION LAB · ' + P.title + '\r\r' +
      'Controls: Speed, Cycle, Amount, Direction, Scale, Rotation, Opacity, Glow, Blur and three colours.\r' +
      'The comp is transparent and uses native, editable After Effects layers.\r' +
      'To make an .ffx settings preset: select the Controls layer, then Animation > Save Animation Preset.\r\r' +
      'Source: ' + P.source + ' · motion-lab/ae-profile@1 · MIT License';
    var l = comp.layers.addText(msg);
    l.name = 'README · enable for usage notes';
    l.guideLayer = true;
    l.shy = true;
    l.enabled = false;
    l.comment = 'Usage notes and license. Enable this guide layer to read inside the comp.';
  }
  function buildRing() {
    var s = Math.max(120, Math.min(420, Math.max(P.width, P.height) * 1.8));
    var sw = Math.max(4, Math.min(42, P.strokeWidth * 2));
    var track = ellipse('Ring · Track', s, s, null, 'Secondary', sw);
    track.layer.property('ADBE Transform Group').property('ADBE Opacity').setValue(24);
    var arc = ellipse('Ring · Outer', s, s, null, 'Primary', sw);
    var trim = arc.contents.addProperty('ADBE Vector Filter - Trim');
    trim.property('ADBE Vector Trim Start').setValue(4);
    trim.property('ADBE Vector Trim End').setValue(P.count > 1 ? 42 : 30);
    setExpr(trim.property('ADBE Vector Trim Offset'), phase(0) + 'p*360;');
    if (P.count > 1) {
      var inner = ellipse('Ring · Inner counter', s * .66, s * .66, null, 'Accent', Math.max(3, sw * .78));
      var tr2 = inner.contents.addProperty('ADBE Vector Filter - Trim');
      tr2.property('ADBE Vector Trim End').setValue(36);
      setExpr(tr2.property('ADBE Vector Trim Offset'), phase(.25) + '-p*360;');
    }
  }
  function buildDots() {
    var n = Math.max(3, Math.min(12, P.count)), gap = Math.min(100, Math.max(P.gap * 2.2 + P.elementSize * 1.8, P.width / Math.max(n, 3)));
    var dotSize = Math.max(12, Math.min(90, P.elementSize * 2.4));
    for (var i = 0; i < n; i++) {
      var d = ellipse('Dot ' + (i + 1), dotSize, dotSize, i % 3 === 0 ? 'Accent' : i % 2 ? 'Secondary' : 'Primary', null, 0);
      var x = comp.width / 2 + (i - (n - 1) / 2) * gap;
      d.layer.property('ADBE Transform Group').property('ADBE Position').setValue([x, comp.height / 2]);
      setExpr(d.layer.property('ADBE Transform Group').property('ADBE Position'), phase(i / n) + 'var b=value;var a=thisComp.layer("Controls").effect("Amount")(1);[b[0],b[1]-Math.sin(p*Math.PI*2)*a*.55];');
      setExpr(d.layer.property('ADBE Transform Group').property('ADBE Scale'), phase(i / n) + 'var s=78+22*Math.sin(p*Math.PI*2);[s,s];');
    }
  }
  function buildBars() {
    var n = Math.max(4, Math.min(12, P.count)), gap = Math.max(5, Math.min(44, P.gap * 2));
    var bw = Math.max(12, Math.min(52, P.elementSize * 2.3, (Math.max(P.width * 2, 300) - gap * (n - 1)) / n));
    for (var i = 0; i < n; i++) {
      var b = rect('Bar ' + (i + 1), bw, Math.max(150, P.height * 1.7), bw / 2, i % 2 ? 'Secondary' : 'Primary', null, 0);
      var x = comp.width / 2 + (i - (n - 1) / 2) * (bw + gap);
      b.layer.property('ADBE Transform Group').property('ADBE Position').setValue([x, comp.height / 2]);
      setExpr(b.layer.property('ADBE Transform Group').property('ADBE Scale'), phase(i / n) + 'var y=24+76*(.5+.5*Math.sin(p*Math.PI*2));[100,y];');
    }
  }
  function buildGrid() {
    var side = Math.max(3, Math.min(5, Math.round(Math.sqrt(P.count || 9))));
    var cell = Math.max(28, Math.min(96, P.elementSize * 3.2)), gap = Math.max(4, Math.min(42, P.gap * 2));
    for (var y = 0; y < side; y++) for (var x = 0; x < side; x++) {
      var i = y * side + x;
      var q = rect('Tile ' + (i + 1), cell, cell, 12, i % 3 === 0 ? 'Accent' : i % 2 ? 'Secondary' : 'Primary', null, 0);
      q.layer.property('ADBE Transform Group').property('ADBE Position').setValue([comp.width / 2 + (x - (side - 1) / 2) * (cell + gap), comp.height / 2 + (y - (side - 1) / 2) * (cell + gap)]);
      setExpr(q.layer.property('ADBE Transform Group').property('ADBE Scale'), phase((x + y) / (side * 2)) + 'var s=42+58*(.5+.5*Math.sin(p*Math.PI*2));[s,s];');
      setExpr(q.layer.property('ADBE Transform Group').property('ADBE Opacity'), phase((x + y) / (side * 2)) + '35+65*(.5+.5*Math.sin(p*Math.PI*2));');
    }
  }
  function buildPulse() {
    for (var i = 0; i < 3; i++) {
      var q = ellipse('Pulse ' + (i + 1), Math.max(180, P.width * 1.8), Math.max(180, P.height * 1.8), null, i === 2 ? 'Accent' : i ? 'Secondary' : 'Primary', 8);
      setExpr(q.layer.property('ADBE Transform Group').property('ADBE Scale'), phase(i / 3) + 'var s=18+p*105;[s,s];');
      setExpr(q.layer.property('ADBE Transform Group').property('ADBE Opacity'), phase(i / 3) + '100*(1-p);');
    }
    ellipse('Pulse · Core', 42, 42, 'Primary', null, 0);
  }
  function buildOrbit() {
    var s = Math.max(200, Math.min(440, Math.max(P.width, P.height) * 2));
    ellipse('Orbit · Path A', s, s * .52, null, 'Primary', 3).layer.property('ADBE Transform Group').property('ADBE Opacity').setValue(35);
    var pathB = ellipse('Orbit · Path B', s, s * .52, null, 'Secondary', 3);
    pathB.layer.property('ADBE Transform Group').property('ADBE Rotate Z').setValue(60);
    pathB.layer.property('ADBE Transform Group').property('ADBE Opacity').setValue(35);
    ellipse('Orbit · Nucleus', 48, 48, 'Accent', null, 0);
    for (var i = 0; i < 3; i++) {
      var dot = ellipse('Orbit · Moon ' + (i + 1), 28, 28, i === 2 ? 'Accent' : i ? 'Secondary' : 'Primary', null, 0);
      setExpr(dot.layer.property('ADBE Transform Group').property('ADBE Position'), phase(i / 3) + 'var a=p*Math.PI*2;[' + (comp.width / 2) + '+Math.cos(a)*' + (s / 2) + ',' + (comp.height / 2) + '+Math.sin(a)*' + (s * .26) + '];');
    }
  }
  function buildButton() {
    var plate = rect('Button · Surface', 430, 138, Math.max(10, Math.min(69, P.roundness * 2)), 'Primary', 'Secondary', Math.max(2, P.strokeWidth));
    setExpr(plate.layer.property('ADBE Transform Group').property('ADBE Scale'), phase(0) + 'var s=100+Math.sin(p*Math.PI*2)*4;[s,s];');
    var tx = textLayer('Button · Label', P.label || 'BUTTON', 44, P.colors[3]);
    setExpr(tx.property('ADBE Transform Group').property('ADBE Position'), phase(0) + 'var b=value;[b[0],b[1]-Math.sin(p*Math.PI*2)*8];');
  }
  function buildText() {
    var tx = textLayer('Type · ' + P.label, P.label || P.title, Math.max(52, Math.min(104, 760 / Math.max(5, (P.label || P.title).length) * 2.6)), P.colors[0]);
    setExpr(tx.property('ADBE Transform Group').property('ADBE Scale'), phase(0) + 'var s=94+Math.sin(p*Math.PI*2)*8;[s,s];');
    setExpr(tx.property('ADBE Transform Group').property('ADBE Opacity'), phase(0) + '55+45*(.5+.5*Math.sin(p*Math.PI*2));');
    var line = rect('Type · Accent line', Math.max(220, Math.min(700, (P.label || P.title).length * 34)), 7, 4, 'Secondary', null, 0);
    line.layer.property('ADBE Transform Group').property('ADBE Position').setValue([comp.width / 2, comp.height / 2 + 100]);
    setExpr(line.layer.property('ADBE Transform Group').property('ADBE Scale'), phase(.25) + '[20+80*p,100];');
  }
  function buildCard() {
    var corner = Math.max(8, Math.min(80, P.roundness * 2));
    var shadow = rect('Card · Shadow', 560, 350, corner, 'Accent', null, 0);
    shadow.layer.property('ADBE Transform Group').property('ADBE Position').setValue([comp.width / 2 + 22, comp.height / 2 + 28]);
    shadow.layer.property('ADBE Transform Group').property('ADBE Opacity').setValue(22);
    var plate = rect('Card · Surface', 560, 350, corner, 'Primary', 'Secondary', Math.max(2, P.strokeWidth));
    setExpr(plate.layer.property('ADBE Transform Group').property('ADBE Rotate Z'), phase(0) + 'Math.sin(p*Math.PI*2)*4;');
    setExpr(plate.layer.property('ADBE Transform Group').property('ADBE Position'), phase(0) + 'var b=value;[b[0],b[1]-Math.sin(p*Math.PI*2)*24];');
    var tx = textLayer('Card · Title', P.title, 44, P.colors[3]);
    tx.property('ADBE Transform Group').property('ADBE Position').setValue([comp.width / 2, comp.height / 2 + 16]);
  }
  function buildBackground() {
    var n = 24;
    for (var i = 0; i < n; i++) {
      var size = 9 + (i * 13 % 24);
      var d = ellipse('Particle ' + (i + 1), size, size, i % 3 === 0 ? 'Accent' : i % 2 ? 'Secondary' : 'Primary', null, 0);
      var x = 80 + (i * 191 % (comp.width - 160)), y = 60 + (i * 313 % (comp.height - 120));
      d.layer.property('ADBE Transform Group').property('ADBE Position').setValue([x, y]);
      setExpr(d.layer.property('ADBE Transform Group').property('ADBE Position'), 'var c=thisComp.layer("Controls");var sp=c.effect("Speed")(1);var y=(value[1]-time*sp*' + (35 + i % 5 * 14) + ')%thisComp.height;if(y<0)y+=thisComp.height;[value[0]+Math.sin(time*sp+' + i + ')*24,y];');
      d.layer.property('ADBE Transform Group').property('ADBE Opacity').setValue(35 + i % 5 * 12);
    }
  }
  function buildControl() {
    rect('Control · Track', 470, 82, 41, 'Secondary', null, 0).layer.property('ADBE Transform Group').property('ADBE Opacity').setValue(35);
    var knob = ellipse('Control · Knob', 116, 116, 'Primary', 'Accent', 5);
    setExpr(knob.layer.property('ADBE Transform Group').property('ADBE Position'), phase(0) + 'var x=' + (comp.width / 2) + '+Math.sin(p*Math.PI*2)*175;[x,' + (comp.height / 2) + '];');
    setExpr(knob.layer.property('ADBE Transform Group').property('ADBE Rotate Z'), phase(0) + 'p*360;');
  }
  function buildLine() {
    var q = ellipse('Line · Path', Math.max(280, P.width * 2), Math.max(180, P.height * 1.2), null, 'Primary', 8);
    var trim = q.contents.addProperty('ADBE Vector Filter - Trim');
    setExpr(trim.property('ADBE Vector Trim End'), phase(0) + '10+90*(.5-.5*Math.cos(p*Math.PI*2));');
    setExpr(trim.property('ADBE Vector Trim Offset'), phase(0) + 'p*180;');
    ellipse('Line · Endpoint', 24, 24, 'Accent', null, 0);
  }
  function buildThree() {
    var cube = comp.layers.addNull();
    cube.name = '3D · Cube Rig';
    cube.threeDLayer = true;
    cube.property('ADBE Transform Group').property('ADBE Position').setValue([comp.width / 2, comp.height / 2, 0]);
    cube.parent = rig;
    var s = 230;
    var defs = [
      ['Front', [0, 0, s / 2], [0, 0, 0], 'Primary'], ['Back', [0, 0, -s / 2], [0, 180, 0], 'Secondary'],
      ['Right', [s / 2, 0, 0], [0, 90, 0], 'Secondary'], ['Left', [-s / 2, 0, 0], [0, -90, 0], 'Accent'],
      ['Top', [0, -s / 2, 0], [90, 0, 0], 'Accent'], ['Bottom', [0, s / 2, 0], [-90, 0, 0], 'Primary']
    ];
    for (var i = 0; i < defs.length; i++) {
      var f = rect('3D · ' + defs[i][0], s, s, 8, defs[i][3], 'Secondary', 2).layer;
      f.threeDLayer = true;
      f.parent = cube;
      f.property('ADBE Transform Group').property('ADBE Position').setValue(defs[i][1]);
      f.property('ADBE Transform Group').property('ADBE Orientation').setValue(defs[i][2]);
      f.property('ADBE Transform Group').property('ADBE Opacity').setValue(88);
    }
    setExpr(cube.property('ADBE Transform Group').property('ADBE Rotate X'), phase(0) + '20+Math.sin(p*Math.PI*2)*35;');
    setExpr(cube.property('ADBE Transform Group').property('ADBE Rotate Y'), phase(0) + 'p*360;');
  }
  function buildMotion() {
    var mover = rect('Motion · Object', 130, 130, 28, 'Primary', 'Accent', 5);
    setExpr(mover.layer.property('ADBE Transform Group').property('ADBE Position'), phase(0) + 'var e=.5-.5*Math.cos(p*Math.PI*2);[' + (comp.width * .22) + '+e*' + (comp.width * .56) + ',' + (comp.height / 2) + '-Math.sin(p*Math.PI*2)*90];');
    setExpr(mover.layer.property('ADBE Transform Group').property('ADBE Rotate Z'), phase(0) + 'p*360;');
    var path = rect('Motion · Guide', comp.width * .58, 3, 2, 'Secondary', null, 0);
    path.layer.property('ADBE Transform Group').property('ADBE Opacity').setValue(24);
  }
  function buildShape() {
    var q = rect('Shape · Primary', Math.max(130, P.width * 1.25), Math.max(130, P.height * 1.25), 32, 'Primary', 'Secondary', 6);
    setExpr(q.layer.property('ADBE Transform Group').property('ADBE Scale'), phase(0) + 'var s=76+24*(.5+.5*Math.sin(p*Math.PI*2));[s,110-s*.1];');
    setExpr(q.layer.property('ADBE Transform Group').property('ADBE Rotate Z'), phase(0) + 'p*360;');
    ellipse('Shape · Core', 42, 42, 'Accent', null, 0);
  }
  var BUILD = { ring: buildRing, dots: buildDots, bars: buildBars, grid: buildGrid, pulse: buildPulse, orbit: buildOrbit, button: buildButton, text: buildText, card: buildCard, background: buildBackground, control: buildControl, line: buildLine, three: buildThree, motion: buildMotion, shape: buildShape };

  function folderFor(cat) {
    var key = String(cat || 'Effects');
    if (!folders[key]) {
      folders[key] = app.project.items.addFolder('Motion Lab · ' + key.charAt(0).toUpperCase() + key.substr(1));
    }
    return folders[key];
  }
  function makeComp(profile) {
    P = profile;
    comp = app.project.items.addComp(P.fileBase + ' · ' + P.title, 1080, 1080, 1, P.compDuration, P.fps);
    comp.parentFolder = folderFor(P.category);
    comp.bgColor = [0.02, 0.02, 0.04];
    comp.comment = 'Motion Lab AE Bridge ' + P.bridgeVersion + ' · ' + P.id + ' · ' + P.license;
    controls();
    makeRig();
    (BUILD[P.archetype] || buildShape)();
    readme();
    comp.hideShyLayers = true;
    comp.motionGraphicsTemplateName = P.fileBase;
    comps.push(comp);
  }
  function saveOutputs() {
    if (!OPTIONS.aep && !OPTIONS.aepx && !OPTIONS.mogrt) return;
    var out = Folder.selectDialog('Choose a folder for the Motion Lab After Effects files');
    if (!out) return;
    var base = safeName(OPTIONS.baseName || (PROFILES.length === 1 ? PROFILES[0].fileBase : 'motion-lab-ae-bundle'));
    var aep = new File(out.fsName + '/' + base + '.aep');
    var aepx = new File(out.fsName + '/' + base + '.aepx');
    try {
      if (OPTIONS.aep) app.project.save(aep);
      if (OPTIONS.aepx) {
        app.project.save(aepx);
        if (OPTIONS.aep) app.project.save(aep);
      }
    } catch (saveError) {
      alert('The comps were created, but the project could not be saved.\r' + saveError.toString());
    }
    var madeMogrt = 0;
    if (OPTIONS.mogrt) {
      for (var i = 0; i < comps.length; i++) {
        try {
          if (comps[i].exportAsMotionGraphicsTemplate) {
            comps[i].exportAsMotionGraphicsTemplate(true, out.fsName);
            madeMogrt++;
          }
        } catch (mogrtError) {}
      }
    }
    alert('Motion Lab export complete.\r\r' + PROFILES.length + ' editable composition' + (PROFILES.length === 1 ? '' : 's') +
      (OPTIONS.aep ? '\r• ' + base + '.aep' : '') + (OPTIONS.aepx ? '\r• ' + base + '.aepx' : '') +
      (OPTIONS.mogrt ? '\r• ' + madeMogrt + ' .mogrt file(s), when supported by this AE version' : '') +
      '\r\rFor an .ffx settings preset, select the Controls layer and choose Animation > Save Animation Preset.');
  }

  if (!app.project) app.newProject();
  if (app.project.numItems > 0 && !confirm('Add ' + PROFILES.length + ' Motion Lab composition' + (PROFILES.length === 1 ? '' : 's') + ' to the current project?\r\rIf you save outputs, the complete current project is included. Choose Cancel and open a blank project first if that is not what you want.')) return;
  app.beginUndoGroup('Motion Lab · Build for After Effects');
  try {
    for (var i = 0; i < PROFILES.length; i++) makeComp(PROFILES[i]);
  } catch (buildError) {
    alert('Motion Lab stopped while building: ' + buildError.toString() + (buildError.line ? '\rLine ' + buildError.line : ''));
  }
  app.endUndoGroup();
  if (comps.length) comps[0].openInViewer();
  saveOutputs();
})();
*/};

  function runtimeText() {
    var s = JSX_RUNTIME.toString();
    return s.slice(s.indexOf('/*') + 2, s.lastIndexOf('*/')).replace(/^\n|\n$/g, '');
  }
  function generate(profiles, opts) {
    if (!Array.isArray(profiles)) profiles = [profiles];
    opts = opts || {};
    var clean = profiles.filter(function (p) { return p && p.schema === 'motion-lab/ae-profile@1'; });
    if (!clean.length) throw new Error('Motion Lab AE: no valid profiles to export');
    var options = {
      aep: opts.aep !== false,
      aepx: opts.aepx !== false,
      mogrt: opts.mogrt !== false,
      baseName: opts.baseName || (clean.length === 1 ? clean[0].fileBase : 'motion-lab-ae-bundle')
    };
    return runtimeText()
      .replace('__ML_PROFILES__', JSON.stringify(clean))
      .replace('__ML_OPTIONS__', JSON.stringify(options)) + '\n';
  }

  return {
    VERSION: VERSION,
    ARCHETYPES: ARCHETYPES.slice(),
    slug: slug,
    profile: profile,
    manifest: manifest,
    expression: expression,
    generate: generate
  };
});
