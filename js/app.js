/* ============================================================
   Motion Lab — gallery engine
   Mounts every demo inside its own Shadow DOM, lazily, and pipes the
   Tune layer (js/tune.js) through it so all 3,400 effects are customisable.

   Lifecycle (per demo host):
     unmounted  →  mounted+ACTIVE (in / near viewport)
                →  PAUSED         (just off-screen; CSS + rAF frozen)
                →  DESTROYED      (far away, or over the mounted cap)
   CSS animations are paused from *inside* the shadow root via :host(.is-offscreen).
   ============================================================ */
(function () {
  'use strict';

  var ITEMS = window.MOTION_LAB || [];
  var T = window.MotionLabTune;

  var ICONS = {
    all:         '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    loaders:     '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 8 8"/></svg>',
    buttons:     '<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="8" rx="4"/><circle cx="9" cy="12" r="1.6"/></svg>',
    text:        '<svg viewBox="0 0 24 24"><path d="M5 6h14M12 6v12M8 18h8"/></svg>',
    cards:       '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="14" height="14" rx="2"/><path d="M8 9h10a2 2 0 0 1 2 2v8"/></svg>',
    backgrounds: '<svg viewBox="0 0 24 24"><circle cx="8" cy="9" r="2.2"/><path d="M4 18l5-6 4 5 3-4 4 5H4z"/></svg>',
    controls:    '<svg viewBox="0 0 24 24"><rect x="3" y="10" width="18" height="4" rx="2"/><circle cx="15" cy="12" r="3"/></svg>',
    svg:         '<svg viewBox="0 0 24 24"><path d="M4 16c4-10 12 10 16 0"/><circle cx="5" cy="16" r="1.4"/><circle cx="19" cy="16" r="1.4"/></svg>',
    '3d':        '<svg viewBox="0 0 24 24"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/></svg>',
    motion:      '<svg viewBox="0 0 24 24"><path d="M4 12h4l3-7 4 14 3-7h2"/></svg>',
    data:        '<svg viewBox="0 0 24 24"><path d="M4 20V10M9 20V4M14 20v-7M19 20v-12"/></svg>',
    nature:      '<svg viewBox="0 0 24 24"><path d="M12 21v-7M12 14c-4 0-6-3-6-7 4 0 6 3 6 7zM12 14c4 0 6-3 6-7-4 0-6 3-6 7z"/></svg>',
    retro:       '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="13" rx="2"/><path d="M7 21h10M9 9h2M10 8v2"/><circle cx="16" cy="10" r="1.2"/></svg>',
    transitions: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="7" height="14" rx="1.5"/><path d="M14 5h7v14h-7M13 12h6M17 9l3 3-3 3"/></svg>'
  };
  window.ML_ICONS = ICONS;

  var CATS = [
    { id: 'all',         label: 'Everything',    desc: 'The full collection',                 demo: null },
    { id: 'loaders',     label: 'Loaders',       desc: 'Spinners, progress, waiting states',  demo: 'ring-spinner' },
    { id: 'buttons',     label: 'Buttons',       desc: 'Press, hover, magnetic CTAs',         demo: 'btn-shine' },
    { id: 'text',        label: 'Text FX',       desc: 'Type, glitch, scramble, kinetic',     demo: 'gradient-text' },
    { id: 'cards',       label: 'Cards & Hover', desc: 'Tilt, foil, flip, spotlight',         demo: 'conic-border' },
    { id: 'backgrounds', label: 'Backgrounds',   desc: 'Particles, aurora, fields',           demo: 'aurora' },
    { id: 'controls',    label: 'Controls',      desc: 'Toggles, knobs, inputs',              demo: 'day-night' },
    { id: 'svg',         label: 'SVG & Lines',   desc: 'Draw, morph, marching ants',          demo: 'stroke-draw' },
    { id: '3d',          label: '3D',            desc: 'Cubes, helix, isometric scenes',      demo: 'd3meca-0' },
    { id: 'motion',      label: 'Interaction',   desc: 'Scroll, drag, spring, confetti',      demo: 'logo-marquee' },
    { id: 'data',        label: 'Data & Charts', desc: 'Bars, donuts, gauges, live metrics',  demo: 'dta-donut-0' },
    { id: 'nature',      label: 'Nature',        desc: 'Rain, fire, waves, stars, weather',   demo: 'nat-rain-0' },
    { id: 'retro',       label: 'Retro & Arcade',desc: 'CRT, VHS, pixels, neon, synthwave',   demo: 'ret-crt-0' },
    { id: 'transitions', label: 'Transitions',   desc: 'Wipes, irises, folds, page reveals',  demo: 'trn-iris-0' }
  ];

  var KINDS = [
    { id: 'all',          label: 'All types' },
    { id: 'original',     label: 'Original' },
    { id: 'generated',    label: 'Generated' },
    { id: 'css',          label: 'CSS only' },
    { id: 'js',           label: 'JavaScript' },
    { id: 'interactive',  label: 'Interactive' },
    { id: '3d',           label: '3D' },
    { id: 'svg',          label: 'SVG' },
    { id: 'canvas',       label: 'Canvas' },
    { id: 'big',          label: 'Big stage' }
  ];

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var src = function (item, k) { return T ? T.srcOf(item)[k] : (item[k] || ''); };

  /* ---------------- classification + indexes ---------------- */
  function flags(item) {
    if (item._flags) return item._flags;
    var tags = (item.tags || []).join(' ').toLowerCase();
    var html = item.html || '';
    var css = item.css || '';
    var js = item.js || '';
    var blob = html + '\n' + css + '\n' + js;
    item._flags = {
      gen: !!item.gen,
      js: !!js,
      css: !js,
      interactive: !!js || /hover|click|drag|press|input|pointer/.test(tags),
      d3: item.cat === '3d' || /(^|\s)3d(\s|$)/.test(tags) || /preserve-3d|perspective\s*\(/i.test(blob),
      canvas: /<canvas[\s>]|getContext\s*\(|webgl/i.test(blob),
      svg: item.cat === 'svg' || /<svg[\s>]/i.test(html),
      big: /(^|\s)big(\s|$)/.test(tags),
      custom: !!(item.cfg && item.cfg.length)
    };
    return item._flags;
  }

  var IDX = {};
  var BY_CAT = { all: ITEMS };
  var KIND_COUNT = {};
  ITEMS.forEach(function (it, i) {
    IDX[it.id] = i;
    (BY_CAT[it.cat] = BY_CAT[it.cat] || []).push(it);
    var f = flags(it);
    it._search = (
      it.title + ' ' + it.cat + ' ' + (it.tags || []).join(' ') + ' ' + it.id + ' ' +
      (it.cfg ? it.cfg.map(function (c) { return c.label; }).join(' ') : '') + ' ' +
      (f.gen ? 'generated procedural' : 'original handmade authored') + ' ' +
      (f.js ? 'javascript js interactive' : 'css-only pure-css') + ' ' +
      (f.d3 ? '3d perspective' : '') + ' ' +
      (f.canvas ? 'canvas webgl' : '') + ' ' +
      (f.svg ? 'svg vector' : '') + ' ' +
      (f.big ? 'big large full-stage wide cinematic' : '') + ' ' +
      (f.custom ? 'customisable knobs' : 'basic tuning')
    ).toLowerCase().replace(/\s+/g, ' ').trim();
  });
  KINDS.forEach(function (k) {
    KIND_COUNT[k.id] = k.id === 'all' ? ITEMS.length : ITEMS.filter(function (it) { return matchKind(it, k.id); }).length;
  });

  function matchKind(item, kind) {
    if (!kind || kind === 'all') return true;
    var f = flags(item);
    if (kind === 'original') return !f.gen;
    if (kind === 'generated') return f.gen;
    if (kind === 'css') return f.css;
    if (kind === 'js') return f.js;
    if (kind === 'interactive') return f.interactive;
    if (kind === '3d') return f.d3;
    if (kind === 'svg') return f.svg;
    if (kind === 'canvas') return f.canvas;
    if (kind === 'big') return f.big;
    return true;
  }

  function itemById(id) {
    var i = IDX[id];
    return i == null ? null : ITEMS[i];
  }
  function firstIn(cat) {
    var list = BY_CAT[cat];
    return list && list[0] ? list[0] : null;
  }

  /* ---------------- global animation frame pump ----------------
     One rAF loop for every JS-driven demo. Each task can be frame-stepped
     (`rate`), which is what makes the Speed control work on JS demos too. */
  var pump = [];
  var paused = false;
  (function loop() {
    if (!paused) {
      for (var i = 0; i < pump.length; i++) {
        var t = pump[i];
        if (!t.alive || !t.visible) continue;
        var rate = t.rate && t.rate !== 1 ? t.rate : 1;
        if (rate === 1) { run(t); continue; }
        t.acc = (t.acc || 0) + rate;
        var steps = Math.floor(t.acc);
        if (steps < 1) continue;
        t.acc -= steps;
        var guard = 0;
        while (steps > 0 && guard++ < 6) { run(t); steps--; }
      }
    }
    pump = pump.filter(function (t) { return t.alive; });
    requestAnimationFrame(loop);
  })();
  function run(t) { try { t.fn(); } catch (e) { t.alive = false; } }

  /* ---------------- mounting + lifecycle ---------------- */
  var MAX_MOUNTED = (window.matchMedia && window.matchMedia('(max-width: 700px)').matches) ? 48 : 96;
  var mounted = [];

  function isPinned(host) {
    if (!host) return false;
    if (host.__pinned) return true;
    try {
      return !!(host.closest && host.closest('#modal, #aeExport, #aePreview'));
    } catch (e) { return false; }
  }

  function remember(host) {
    if (!host || isPinned(host)) return;
    var i = mounted.indexOf(host);
    if (i >= 0) mounted.splice(i, 1);
    mounted.push(host);
    trimMounted();
  }

  function forget(host) {
    var i = mounted.indexOf(host);
    if (i >= 0) mounted.splice(i, 1);
  }

  function trimMounted() {
    if (mounted.length <= MAX_MOUNTED) return;
    var pinned = [], live = [], rest = [], i, h;
    for (i = 0; i < mounted.length; i++) {
      h = mounted[i];
      if (!h || !h.__inst) continue;
      if (isPinned(h)) pinned.push(h);
      else if (h.__inst.visible) live.push(h);
      else rest.push(h);
    }
    var keep = pinned.concat(live);
    while (keep.length < MAX_MOUNTED && rest.length) keep.push(rest.pop());
    for (i = 0; i < rest.length; i++) destroyHost(rest[i]);
    while (keep.length > MAX_MOUNTED) {
      var dropAt = -1;
      for (i = 0; i < keep.length; i++) {
        if (!isPinned(keep[i])) { dropAt = i; break; }
      }
      if (dropAt < 0) break;
      destroyHost(keep.splice(dropAt, 1)[0]);
    }
    mounted = keep;
  }

  function destroyHost(host) {
    if (!host) return;
    if (host.__inst) host.__inst.destroy();
    forget(host);
  }

  function mount(item, host, opts) {
    if (opts && opts.pin) host.__pinned = true;
    else if (isPinned(host)) host.__pinned = true;
    if (host.__inst) return host.__inst;
    host.__item = item;
    return remount(item, host);
  }

  function remount(item, host) {
    if (host.__inst) { host.__inst.destroy(); host.__inst = null; }

    var root = host.shadowRoot || host.attachShadow({ mode: 'open' });
    root.innerHTML = '';

    var style = document.createElement('style');
    style.textContent = T ? T.styleFor(item) : item.css;
    root.appendChild(style);

    var wrap = document.createElement('div');
    wrap.className = 'demo-root';
    wrap.style.cssText = (T && T.WRAP) || 'display:grid;place-items:center;width:100%';
    wrap.innerHTML = src(item, 'html');
    root.appendChild(wrap);

    var inst = { root: root, wrap: wrap, host: host, item: item, visible: true, cleanups: [], tasks: [], styleEl: style };

    var code = src(item, 'js');
    if (code) {
      var api = {
        raf: function (fn) {
          var t = { fn: fn, alive: true, visible: true, rate: T ? T.rate(item) : 1 };
          pump.push(t); inst.tasks.push(t);
        },
        onCleanup: function (fn) { inst.cleanups.push(fn); }
      };
      try {
        /* First-party bundled demo source only. Never eval remote or
           user-submitted code through this path without a sandbox. */
        new Function('root', 'api', code)(root, api);
      } catch (e) {
        console.warn('[motion-lab] demo failed:', item.id, e);
      }
    }

    if (T) T.applyLive(item, inst);

    inst.setVisible = function (v) {
      inst.visible = v;
      inst.tasks.forEach(function (t) { t.visible = v; });
      host.classList.toggle('is-offscreen', !v);
    };
    inst.destroy = function () {
      inst.tasks.forEach(function (t) { t.alive = false; });
      inst.cleanups.forEach(function (f) { try { f(); } catch (e) {} });
      try { root.innerHTML = ''; } catch (e) {}
      host.__inst = null;
      host.classList.remove('is-offscreen');
    };

    if (paused) host.classList.add('is-paused');
    else host.classList.remove('is-paused');
    host.classList.remove('is-offscreen');
    host.__inst = inst;
    remember(host);
    return inst;
  }

  function refresh(id) {
    $$('.demo-host').forEach(function (h) {
      if (!h.__inst) return;
      if (id !== '*' && (!h.__item || h.__item.id !== id)) return;
      if (T.needsRerun(h.__item)) remount(h.__item, h);
      else T.applyLive(h.__item, h.__inst);
      if (h.__item) {
        var card = h.closest('.card');
        if (card) card.classList.toggle('is-tuned', T.isTuned(h.__item.id));
        if (current && current.id === h.__item.id) modalTuneNote();
      }
    });
  }
  if (T) T.on(function (id) { queueRefresh(id); });
  var rq;
  function queueRefresh(id) {
    cancelAnimationFrame(rq);
    rq = requestAnimationFrame(function () { refresh(id); });
  }

  /* ---------------- syntax highlighting ---------------- */
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function hlHtml(s) {
    return esc(s).replace(/(&lt;\/?[\w-]+)|([\w-]+)(?==\")|(\"[^\"]*\")/g, function (m, tag, attr, str) {
      if (tag) return '<span class="tok-tag">' + tag + '</span>';
      if (attr) return '<span class="tok-attr">' + attr + '</span>';
      return '<span class="tok-str">' + str + '</span>';
    });
  }
  function hlCss(s) {
    return esc(s).replace(/(\/\*[\s\S]*?\*\/)|(@[\w-]+)|([\w-]+)(?=\s*:)|(#[0-9a-fA-F]{3,8})\b|(\"[^\"]*\")/g,
      function (m, com, at, prop, hex, str) {
        if (com) return '<span class="tok-com">' + com + '</span>';
        if (at) return '<span class="tok-kw">' + at + '</span>';
        if (prop) return '<span class="tok-prop">' + prop + '</span>';
        if (hex) return '<span class="tok-str">' + hex + '</span>';
        return '<span class="tok-str">' + str + '</span>';
      });
  }
  function hlJs(s) {
    /* strings first so `//` inside a string is not treated as a comment */
    return esc(s).replace(/("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`)|(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)|\b(var|let|const|function|return|if|else|for|new|this|true|false)\b/g,
      function (m, str, com, block, kw) {
        if (str) return '<span class="tok-str">' + str + '</span>';
        if (com) return '<span class="tok-com">' + com + '</span>';
        if (block) return '<span class="tok-com">' + block + '</span>';
        return '<span class="tok-kw">' + kw + '</span>';
      });
  }

  /* ---------------- state ---------------- */
  var favs = {};
  try { favs = JSON.parse(localStorage.getItem('ml-favs') || '{}'); } catch (e) { favs = {}; }
  var recent = [];
  try { recent = JSON.parse(localStorage.getItem('ml-recent') || '[]'); } catch (e) { recent = []; }
  var state = { cat: 'all', q: '', favOnly: false, kind: 'all' };

  var grid = $('#grid');
  var chipBox = $('#chips');
  var kindBox = $('#kinds');
  var resultCount = $('#resultCount');
  var emptyMsg = $('#empty');
  /* 60 live cards at a time on a desktop; a phone gets a shorter first page
     (the rail is one column wide, so 60 is four screens of work up front) */
  var NARROW = window.matchMedia && window.matchMedia('(max-width: 700px)').matches;
  var PAGE = NARROW ? 24 : 60;
  var list = [];
  var shown = 0;

  function pushRecent(id) {
    recent = [id].concat(recent.filter(function (x) { return x !== id; })).slice(0, 16);
    try { localStorage.setItem('ml-recent', JSON.stringify(recent)); } catch (e) {}
  }

  /* ---------------- chips ---------------- */
  function iconFor(id) {
    return (window.ML_ICONS && window.ML_ICONS[id]) || '';
  }
  function setCat(id, scroll) {
    state.cat = id;
    $$('.chip').forEach(function (x) {
      var on = x.dataset.cat === id;
      x.classList.toggle('active', on);
      x.setAttribute('aria-pressed', String(on));
    });
    render(true);
    window.dispatchEvent(new Event('ml:chips'));
    if (scroll) {
      var g = $('#gallery');
      if (g) g.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  CATS.forEach(function (c) {
    var n = c.id === 'all' ? ITEMS.length : (BY_CAT[c.id] || []).length;
    var b = document.createElement('button');
    b.className = 'chip' + (c.id === 'all' ? ' active' : '');
    b.dataset.cat = c.id;
    b.innerHTML = iconFor(c.id) + c.label + '<span class="n">' + n + '</span>';
    b.setAttribute('aria-pressed', c.id === 'all' ? 'true' : 'false');
    b.addEventListener('click', function () { setCat(c.id, false); });
    chipBox.appendChild(b);
  });
  requestAnimationFrame(function () { window.dispatchEvent(new Event('ml:chips')); });

  function setKind(id) {
    state.kind = id;
    if (!kindBox) return;
    $$('.kind-chip', kindBox).forEach(function (x) {
      var on = x.dataset.kind === id;
      x.classList.toggle('active', on);
      x.setAttribute('aria-pressed', String(on));
    });
    render(true);
  }
  if (kindBox) {
    KINDS.forEach(function (k) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'kind-chip' + (k.id === 'all' ? ' active' : '');
      b.dataset.kind = k.id;
      b.setAttribute('aria-pressed', k.id === 'all' ? 'true' : 'false');
      b.innerHTML = k.label + '<span class="n">' + (KIND_COUNT[k.id] || 0) + '</span>';
      b.addEventListener('click', function () { setKind(k.id); });
      kindBox.appendChild(b);
    });
  }

  /* ---------------- lazy observer: ACTIVE / PAUSED / DESTROYED ---------------- */
  var ioNear = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var host = $('.demo-host', e.target);
      if (!host) return;
      var item = host.__item || ITEMS[+e.target.dataset.i];
      if (e.isIntersecting) {
        if (!host.__inst && item) mount(item, host);
        if (host.__inst) host.__inst.setVisible(true);
        remember(host);
      } else if (host.__inst) {
        host.__inst.setVisible(false);
      }
    });
  }, { rootMargin: '280px 0px' });

  var ioFar = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) return;
      var host = $('.demo-host', e.target);
      if (host && host.__inst && !isPinned(host)) destroyHost(host);
    });
  }, { rootMargin: '1600px 0px' });

  function watchCard(el) {
    ioNear.observe(el);
    ioFar.observe(el);
  }
  function unwatchCard(el) {
    ioNear.unobserve(el);
    ioFar.unobserve(el);
  }

  /* infinite scroll for the pages below the fold */
  var sentinel = $('#sentinel');
  var moreBtn = $('#moreBtn');
  var moreIo = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting && shown < list.length) paint();
  }, { rootMargin: '800px 0px' });
  moreIo.observe(sentinel);
  moreBtn.addEventListener('click', function () { paint(); });

  /* ---------------- card factory ---------------- */
  var SHARE_ICO = '<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="2.4"/><circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="19" r="2.4"/><path d="M8.2 13.2l7.5 4.1M8.2 10.8l7.5-4.1"/></svg>';
  var MORE_ICO = '<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="12" cy="19" r="1.7"/></svg>';

  function closeMenus(except) {
    $$('.card-menu-pop').forEach(function (p) {
      if (p !== except) {
        p.hidden = true;
        var btn = p.parentNode && p.parentNode.querySelector('.more-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function cardFor(item, i) {
    var el = document.createElement('article');
    var f = flags(item);
    el.className = 'card' + (T && T.isTuned(item.id) ? ' is-tuned' : '');
    el.dataset.i = i;
    el.dataset.id = item.id;
    el.style.animationDelay = Math.min((i % PAGE) * 22, 420) + 'ms';

    var stage = document.createElement('div');
    stage.className = 'card-stage';
    var host = document.createElement('div');
    host.className = 'demo-host';
    host.__item = item;
    stage.appendChild(host);

    var origin = f.gen ? 'generated' : 'original';
    var engine = f.js ? 'js' : 'css';
    var tuning = f.custom ? 'customisable' : 'basic tuning';
    var extraTags = '';
    extraTags += '<span class="tag origin">' + origin + '</span>';
    extraTags += '<span class="tag engine">' + engine + '</span>';
    if (f.d3 && item.cat !== '3d') extraTags += '<span class="tag">3d</span>';
    if (f.canvas) extraTags += '<span class="tag">canvas</span>';
    extraTags += '<span class="tag tunable">' + tuning + '</span>';

    var body = document.createElement('div');
    body.className = 'card-body';
    body.innerHTML =
      '<div class="card-top"><h3 class="card-title"></h3>' +
        (item.cfg && item.cfg.length ? '<span class="knob-n" title="' + item.cfg.length + ' built-in parameters">' + item.cfg.length + ' knobs</span>' : '') +
        '<span class="card-num">' + String(i + 1).padStart(3, '0') + '</span></div>' +
      '<div class="card-tags">' +
        '<span class="tag">' + item.cat + '</span>' +
        item.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') +
        extraTags +
      '</div>' +
      '<div class="card-actions">' +
        '<button class="mini tune"><svg viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2.2"/><circle cx="8" cy="17" r="2.2"/></svg>' +
          /* two labelled buttons share one row on a phone: a shorter word
             there beats a clipped or wrapped one */
          (NARROW ? 'Tune' : 'Customise') + '</button>' +
        '<button class="mini code">' +
          '<svg viewBox="0 0 24 24"><path d="M8 6l-6 6 6 6M16 6l6 6-6 6"/></svg>Code</button>' +
        '<button class="mini replay flex-none" title="Replay">' +
          '<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/></svg></button>' +
        '<button class="mini fav flex-none" title="Favourite" aria-pressed="false">' +
          '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.7-9.5-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.5 6c-2 4.3-9.5 9-9.5 9z"/></svg></button>' +
        '<button class="mini share flex-none" title="Share">' + SHARE_ICO + '</button>' +
        '<div class="card-menu">' +
          '<button class="mini more-btn flex-none" type="button" title="More" aria-haspopup="true" aria-expanded="false">' + MORE_ICO + '</button>' +
          '<div class="card-menu-pop" hidden>' +
            '<button type="button" data-act="replay">Replay</button>' +
            '<button type="button" data-act="fav">Favourite</button>' +
            '<button type="button" data-act="share">Copy link</button>' +
            '<button type="button" data-act="html">Download HTML</button>' +
            '<button type="button" data-act="ae">After Effects builder</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<button class="mini ae-export" type="button"><span class="ae-btn-mark">Ae</span><span>Generate After Effects builder</span><small>JSX · AE writes .aep</small></button>';
    $('.card-title', body).textContent = item.title;

    el.appendChild(stage);
    el.appendChild(body);

    var favBtn = $('.fav', body);
    favBtn.setAttribute('aria-pressed', favs[item.id] ? 'true' : 'false');
    function toggleFav() {
      if (favs[item.id]) { delete favs[item.id]; } else { favs[item.id] = 1; }
      favBtn.setAttribute('aria-pressed', favs[item.id] ? 'true' : 'false');
      localStorage.setItem('ml-favs', JSON.stringify(favs));
      toast(favs[item.id] ? 'Added to favourites' : 'Removed from favourites');
      if (state.favOnly) render(false);
    }
    favBtn.addEventListener('click', toggleFav);

    $('.code', body).addEventListener('click', function () { openModal(item); });
    $('.replay', body).addEventListener('click', function () { remount(item, host); });
    $('.tune', body).addEventListener('click', function () { openTuner(item); });
    $('.ae-export', body).addEventListener('click', function () { openAE(item); });
    $('.share', body).addEventListener('click', function () { shareItem(item); });

    var moreBtnCard = $('.more-btn', body);
    var pop = $('.card-menu-pop', body);
    moreBtnCard.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = pop.hidden;
      closeMenus(pop);
      pop.hidden = !open;
      moreBtnCard.setAttribute('aria-expanded', String(open));
    });
    pop.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]');
      if (!b) return;
      pop.hidden = true;
      moreBtnCard.setAttribute('aria-expanded', 'false');
      var act = b.dataset.act;
      if (act === 'replay') remount(item, host);
      else if (act === 'fav') toggleFav();
      else if (act === 'share') shareItem(item);
      else if (act === 'html') downloadHtml(item);
      else if (act === 'ae') openAE(item);
    });

    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });

    watchCard(el);
    return el;
  }

  document.addEventListener('click', function () { closeMenus(); });

  /* ---------------- page scroll lock ----------------
     Every overlay (drawer, palette, code dialog, tuner, AE dialog, template
     sheets) hides the page behind it. The lock is derived from "is anything
     open", never toggled by hand, so closing one dialog on top of another
     can never leave the page frozen — a phone with a stuck page is a bug you
     cannot dismiss. */
  var OVERLAYS = ['#cmdk', '#modal', '#tuner', '#aeExport', '#tplPlay', '#tplCode', '#mobileNav'];
  function overlayOpen() {
    return OVERLAYS.some(function (sel) {
      var el = $(sel);
      if (!el) return false;
      /* the drawer slides out first and unmounts ~380ms later, so its real
         state is the `open` class — reading `hidden` there could keep the
         page locked by a drawer that is already gone */
      if (el.id === 'mobileNav') return el.classList.contains('open');
      return !el.hidden;
    });
  }
  function syncPageLock() {
    var on = overlayOpen();
    document.body.classList.toggle('no-scroll', on);
    document.body.style.overflow = on ? 'hidden' : '';
    return on;
  }
  window.MLSyncPageLock = syncPageLock;

  /* ---------------- rendering ---------------- */
  function matches(item) {
    if (state.kind !== 'all' && !matchKind(item, state.kind)) return false;
    if (state.favOnly && !favs[item.id]) return false;
    if (!state.q) return true;
    var words = state.q.toLowerCase().split(/\s+/);
    var hay = item._search || '';
    return words.every(function (w) { return hay.indexOf(w) > -1; });
  }

  function filtered() {
    var pool = state.cat === 'all' ? ITEMS : (BY_CAT[state.cat] || []);
    return pool.filter(matches);
  }

  function clearGrid() {
    var cards = $$('.card', grid);
    for (var i = 0; i < cards.length; i++) {
      unwatchCard(cards[i]);
      var host = $('.demo-host', cards[i]);
      if (host) destroyHost(host);
    }
    mounted = mounted.filter(function (h) { return isPinned(h) && h.__inst; });
    grid.innerHTML = '';
  }

  function render(reset) {
    list = filtered();
    if (reset !== false) { shown = 0; clearGrid(); }
    if (!shown) paint(); else count();
  }

  function paint() {
    var frag = document.createDocumentFragment();
    var stop = Math.min(shown + PAGE, list.length);
    for (var i = shown; i < stop; i++) frag.appendChild(cardFor(list[i], IDX[list[i].id]));
    shown = stop;
    grid.appendChild(frag);
    count();
  }

  function count() {
    var kindNote = state.kind !== 'all' ? ' · ' + state.kind : '';
    resultCount.textContent = (list.length ? 'Showing 1–' + shown : 'Nothing') + ' of ' + list.length +
      (state.cat === 'all' ? '' : ' in ' + state.cat) + kindNote + '  ·  ' + ITEMS.length + ' in the collection';
    emptyMsg.hidden = list.length > 0;
    sentinel.hidden = shown >= list.length;
    if (shown >= list.length) $('#moreBtn').parentNode.hidden = true;
    else $('#moreBtn').parentNode.hidden = false;
    $('#moreBtn').textContent = 'Load ' + Math.min(PAGE, list.length - shown) + ' more';
  }

  /* ---------------- After Effects bridge ---------------- */
  function openAE(item) {
    if (window.MotionLabAE && window.MotionLabAE.open) window.MotionLabAE.open(item);
    else toast('After Effects exporter is not available');
  }

  /* ---------------- share / standalone html ---------------- */
  function effectHash(id) { return '#effect/' + id; }
  function effectUrl(id) {
    var path = location.pathname.replace(/index\.html$/, '');
    return location.origin + path + effectHash(id);
  }
  function readRoute() {
    var h = location.hash || '';
    var m = /^#effect\/([a-z0-9-]+)/i.exec(h);
    if (m) return m[1];
    var q = /(?:\?|&)e=([a-z0-9-]+)/i.exec(location.search);
    return q ? q[1] : null;
  }
  function setRoute(id) {
    var next = effectHash(id);
    if (location.hash !== next) {
      try { history.replaceState(null, '', next); } catch (e) { location.hash = next; }
    }
  }
  function clearRoute() {
    if (!/^#effect\//.test(location.hash || '')) return;
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
  }

  function shareItem(item) {
    setRoute(item.id);
    var url = effectUrl(item.id);
    if (navigator.share) {
      navigator.share({ title: item.title + ' — Motion Lab', text: item.title + ' · ' + item.cat, url: url })
        .then(function () { toast('Shared ' + item.title); })
        .catch(function () { copy(url, 'Link copied'); });
      return;
    }
    copy(url, 'Link copied');
  }

  function standaloneHtml(item) {
    var attrs = T ? T.exportAttrs(item) : ' class="ml-tuned"';
    var css = T ? T.exportCss(item) : item.css;
    var html = src(item, 'html');
    var js = src(item, 'js');
    return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '<title>' + item.title + ' — Motion Lab</title>\n' +
      '<style>\nhtml,body{margin:0;min-height:100%;display:grid;place-items:center;background:#0b0b14;color:#f4f4f8;font-family:system-ui,sans-serif}\n' +
      css + '\n</style>\n</head>\n<body>\n<div' + attrs + '>\n  ' + html + '\n</div>' +
      (js ? '\n<script>\n(function(){\n  var root = document;\n  var api = { raf: function(f){ (function l(){ f(); requestAnimationFrame(l); })(); }, onCleanup: function(){} };\n' +
        js + '\n})();\n<\/script>' : '') +
      '\n</body>\n</html>\n';
  }

  function downloadHtml(item) {
    var text = standaloneHtml(item);
    var url = URL.createObjectURL(new Blob([text], { type: 'text/html;charset=utf-8' }));
    var a = document.createElement('a');
    a.href = url;
    a.download = item.id + '.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1800);
    toast(item.id + '.html downloaded');
  }

  function similarTo(item, n) {
    n = n || 4;
    var tags = item.tags || [];
    var pool = BY_CAT[item.cat] || ITEMS;
    var scored = [];
    for (var i = 0; i < pool.length; i++) {
      var x = pool[i];
      if (x.id === item.id) continue;
      var s = 0, xt = x.tags || [], j;
      for (j = 0; j < tags.length; j++) if (xt.indexOf(tags[j]) >= 0) s++;
      if (!!x.js === !!item.js) s++;
      if (!!x.gen === !!item.gen) s += 0.35;
      scored.push({ x: x, s: s });
    }
    scored.sort(function (a, b) { return b.s - a.s; });
    var out = [];
    for (i = 0; i < scored.length && out.length < n; i++) out.push(scored[i].x);
    return out;
  }

  /* ---------------- modal ---------------- */
  var modal = $('#modal');
  var modalPreview = $('#modalPreview');
  var codeOut = $('#codeOut');
  var codeTabs = $('#codeTabs');
  var similarBox = $('#similar');
  var current = null, currentTab = 'html';

  function tabsFor(item) {
    var t = [['html', 'HTML'], ['css', 'CSS']];
    if (item.js) t.push(['js', 'JS']);
    return t;
  }
  function showTab(k) {
    currentTab = k;
    $$('button', codeTabs).forEach(function (b) { b.classList.toggle('active', b.dataset.k === k); });
    var s = src(current, k);
    codeOut.innerHTML = k === 'html' ? hlHtml(s) : k === 'css' ? hlCss(s) : hlJs(s);
  }
  function modalTuneNote() {
    var n = $('#modalTuned');
    if (!n || !current) return;
    var on = T && T.isTuned(current.id);
    n.hidden = !on;
    if (on) n.textContent = 'showing your customisation';
  }

  function paintSimilar(item) {
    if (!similarBox) return;
    var sims = similarTo(item, 4);
    similarBox.innerHTML = '';
    if (!sims.length) { similarBox.hidden = true; return; }
    similarBox.hidden = false;
    var lab = document.createElement('p');
    lab.className = 'similar-label';
    lab.textContent = 'Similar in ' + item.cat;
    similarBox.appendChild(lab);
    var row = document.createElement('div');
    row.className = 'similar-row';
    sims.forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'similar-item';
      b.innerHTML = '<b></b><small></small>';
      b.querySelector('b').textContent = s.title;
      b.querySelector('small').textContent = (s.gen ? 'generated' : 'original') + ' · ' + (s.js ? 'js' : 'css');
      b.addEventListener('click', function () { openModal(s); });
      row.appendChild(b);
    });
    similarBox.appendChild(row);
  }

  function openModal(item, opts) {
    current = item;
    pushRecent(item.id);
    $('#modalTitle').textContent = item.title;
    var f = flags(item);
    $('#modalMeta').textContent = item.cat + ' · ' + item.tags.join(' · ') +
      (f.js ? ' · javascript' : ' · pure css') +
      (f.gen ? ' · generated' : ' · original') +
      (f.custom ? ' · customisable' : ' · basic tuning');
    modalTuneNote();

    modalPreview.innerHTML = '<div class="demo-host"></div>';
    var mh = $('.demo-host', modalPreview);
    mh.__pinned = true;
    mount(item, mh, { pin: true }).setVisible(true);

    codeTabs.innerHTML = '';
    tabsFor(item).forEach(function (t, i) {
      var b = document.createElement('button');
      b.dataset.k = t[0];
      b.textContent = t[1];
      b.addEventListener('click', function () { showTab(t[0]); });
      codeTabs.appendChild(b);
      if (i === 0) b.classList.add('active');
    });
    showTab('html');
    paintSimilar(item);

    modal.hidden = false;
    syncPageLock();
    if (!opts || !opts.fromPop) setRoute(item.id);
  }

  function closeModal(opts) {
    var h = $('.demo-host', modalPreview);
    if (h && h.__inst) h.__inst.destroy();
    modalPreview.innerHTML = '';
    modal.hidden = true;
    syncPageLock();
    if (!opts || !opts.keepHash) clearRoute();
  }
  $$('[data-close]').forEach(function (b) { b.addEventListener('click', function () { closeModal(); }); });

  function fullSnippet(item) {
    var attrs = T ? T.exportAttrs(item) : ' class="ml-tuned"';
    var tuned = !!T && T.isTuned(item.id);
    return '<!-- ' + item.title + ' — Motion Lab' + (tuned ? ' (customised)' : '') + ' -->\n' +
      '<style>\n' + (T ? T.exportCss(item) : item.css) + '\n</style>\n\n' +
      '<div' + attrs + '>\n  ' + src(item, 'html') + '\n</div>' +
      (src(item, 'js') ? '\n\n<script>\n(function(){\n  var root = document;\n  var api = { raf: function(f){ (function l(){ f(); requestAnimationFrame(l); })(); }, onCleanup: function(){} };\n' + src(item, 'js') + '\n})();\n<\/script>' : '') + '\n';
  }

  function copy(text, msg) {
    var done = function () { toast(msg); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
    } else { fallback(text); done(); }
  }
  function fallback(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    ta.remove();
  }

  $('#copyBtn').addEventListener('click', function () {
    copy(src(current, currentTab), currentTab.toUpperCase() + ' copied to clipboard');
  });
  $('#copyAllBtn').addEventListener('click', function () {
    copy(fullSnippet(current), 'Full snippet copied' + (T && T.isTuned(current.id) ? ' — with your customisation baked in' : ''));
  });
  $('#replayModal').addEventListener('click', function () {
    var h = $('.demo-host', modalPreview);
    if (h) remount(current, h);
  });
  $('#tuneModalBtn').addEventListener('click', function () { openTuner(current, true); });
  $('#aeModalBtn').addEventListener('click', function () { if (current) openAE(current); });
  var shareBtn = $('#shareBtn');
  if (shareBtn) shareBtn.addEventListener('click', function () { if (current) shareItem(current); });
  var dlBtn = $('#downloadHtmlBtn');
  if (dlBtn) dlBtn.addEventListener('click', function () { if (current) downloadHtml(current); });

  /* ---------------- tuner drawer ---------------- */
  var tuner = $('#tuner');
  var tunerBody = $('#tunerBody');
  var tunerFor = null;

  function openTuner(item, fromModal) {
    if (!T) return;
    tunerFor = item;
    $('#tunerTitle').textContent = 'Customise';
    $('#tunerSub').textContent = item.title + ' · #' + (IDX[item.id] + 1);
    $('#tunerAllMode').hidden = !!fromModal;
    T.buildPanel(item, tunerBody, { scope: $('#tunerAllMode').checked ? '*' : item.id, onChange: function () {
      tuner.classList.toggle('is-global', $('#tunerAllMode').checked);
      $('#tunerScope').textContent = $('#tunerAllMode').checked ? 'every effect' : 'this effect only';
      var card = $('.card[data-id="' + item.id + '"]');
      if (card) card.classList.toggle('is-tuned', T.isTuned(item.id));
      if (current && current.id === item.id) modalTuneNote();
    } });
    $('#tunerScope').textContent = $('#tunerAllMode').checked ? 'every effect' : 'this effect only';
    tuner.hidden = false;
    syncPageLock();
    requestAnimationFrame(function () { tuner.classList.add('open'); });
    $('#tunerFav').textContent = favs[item.id] ? '★ Favourited' : '☆ Favourite';
    $('#tunerFav').onclick = function () {
      if (favs[item.id]) delete favs[item.id]; else favs[item.id] = 1;
      localStorage.setItem('ml-favs', JSON.stringify(favs));
      $('#tunerFav').textContent = favs[item.id] ? '★ Favourited' : '☆ Favourite';
      render(false);
    };
    $('#tunerCopy').onclick = function () { copy(fullSnippet(item), 'Customised snippet copied'); };
    $('#tunerCode').onclick = function () { openModal(item); };
    $('#tunerAE').onclick = function () { openAE(item); };
  }
  function closeTuner() {
    tuner.classList.remove('open');
    setTimeout(function () { tuner.hidden = true; syncPageLock(); }, 320);
  }
  $('#tunerClose').addEventListener('click', closeTuner);
  $('#tunerBackdrop').addEventListener('click', closeTuner);
  $('#tunerAllMode').addEventListener('change', function () {
    if (tunerFor) T.buildPanel(tunerFor, tunerBody, { scope: this.checked ? '*' : tunerFor.id });
    tuner.classList.toggle('is-global', this.checked);
    $('#tunerScope').textContent = this.checked ? 'every effect' : 'this effect only';
  });
  $('#tuneAll').addEventListener('click', function () {
    var target = current || list[0] || ITEMS[0];
    openTuner(target, false);
    $('#tunerAllMode').checked = true;
    $('#tunerAllMode').dispatchEvent(new Event('change'));
  });

  /* ---------------- toast ---------------- */
  var toastEl = $('#toast'), toastId;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastId);
    toastId = setTimeout(function () { toastEl.classList.remove('show'); }, 2400);
  }
  window.MotionLabToast = toast;

  /* ---------------- header controls ---------------- */
  var search = $('#search');
  var deb;
  search.addEventListener('input', function () {
    clearTimeout(deb);
    deb = setTimeout(function () { state.q = search.value.trim(); render(true); }, 120);
  });
  $('#clearSearch').addEventListener('click', function () {
    search.value = ''; state.q = ''; state.favOnly = false; state.kind = 'all';
    $('#favFilter').setAttribute('aria-pressed', 'false');
    setKind('all');
    setCat('all', false);
  });

  $('#favFilter').addEventListener('click', function () {
    state.favOnly = !state.favOnly;
    this.setAttribute('aria-pressed', String(state.favOnly));
    render(true);
    if (state.favOnly && !Object.keys(favs).length) toast('No favourites yet — tap the heart on a card');
  });

  $('#motionToggle').addEventListener('click', function () {
    paused = !paused;
    document.body.classList.toggle('paused', paused);
    $$('.demo-host').forEach(function (h) { h.classList.toggle('is-paused', paused); });
    this.setAttribute('aria-pressed', String(paused));
    toast(paused ? 'All animations paused' : 'Animations resumed');
  });

  var themeBtn = $('#themeToggle');
  var themeColor = $('#themeColorMeta');
  function syncThemeColor() {
    if (!themeColor) return;
    themeColor.setAttribute('content',
      document.documentElement.dataset.theme === 'light' ? '#f5f5f8' : '#05050a');
  }
  var saved = localStorage.getItem('ml-theme');
  if (saved) document.documentElement.dataset.theme = saved;
  syncThemeColor();
  themeBtn.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('ml-theme', next);
    syncThemeColor();
  });

  $('#randomBtn').addEventListener('click', function () {
    var pool = list.length ? list : ITEMS;
    openModal(pool[Math.floor(Math.random() * pool.length)]);
  });

  document.addEventListener('keydown', function (e) {
    var cmdk = $('#cmdk');
    if (e.key === 'Escape') {
      if (cmdk && !cmdk.hidden) return;
      if (!modal.hidden) closeModal();
      else if (!tuner.hidden) closeTuner();
    }
  });

  /* ---------------- page chrome ---------------- */
  var header = $('#siteHeader'), bar = $('#scrollProgress');
  function onScroll() {
    var h = document.documentElement;
    var p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1) * 100;
    bar.style.width = p + '%';
    header.classList.toggle('stuck', h.scrollTop > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // hero stat counters
  var statObs = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, target = +el.dataset.count, t0 = null;
      el.textContent = '0';
      requestAnimationFrame(function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / 1200, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      });
      statObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$('.hero-stats b').forEach(function (b) { statObs.observe(b); });

  /* ---------------- go ---------------- */
  var heroCount = $('#counterHero');
  if (heroCount) heroCount.textContent = ITEMS.length;
  var FINE_POINTER = window.matchMedia && window.matchMedia('(pointer:fine)').matches;
  search.placeholder = 'Search ' + ITEMS.length + ' effects & templates…' + (FINE_POINTER ? '  (press /)' : '');
  $$('.hero-stats b')[0].dataset.count = ITEMS.length;
  $$('.hero-stats b')[1].dataset.count = CATS.length - 1;
  var tunedCount = $('#tunedCount');
  if (tunedCount) {
    var n = T ? T.count() : 0;
    tunedCount.textContent = n ? n + ' customised' : 'every effect has a tuner';
  }

  render(true);
  var per = {};
  ITEMS.forEach(function (i) { per[i.cat] = (per[i.cat] || 0) + 1; });
  console.log('%c Motion Lab ', 'background:#8b7dff;color:#fff;border-radius:4px',
    ITEMS.length + ' effects · ' + Object.keys(per).map(function (k) { return k + ' ' + per[k]; }).join(', ') +
    ' · max ' + MAX_MOUNTED + ' live demos');

  /* ---------------- hero stage + bento (mount only while visible) ---------------- */
  function watchHost(host, item, rootEl, destroyWhenHidden) {
    host.__item = item;
    var io = new IntersectionObserver(function (es) {
      var on = es[0] && es[0].isIntersecting;
      if (on) {
        if (!host.__inst) mount(item, host);
        if (host.__inst) host.__inst.setVisible(true);
      } else if (host.__inst) {
        host.__inst.setVisible(false);
        if (destroyWhenHidden) destroyHost(host);
      }
    }, { rootMargin: '120px 0px' });
    io.observe(rootEl || host);
  }

  (function heroStage() {
    var stage = $('#heroStage');
    if (!stage) return;
    var ids = ['ring-spinner', 'equalizer', 'atom-loader', 'conic-spinner', 'd3plnt-0', 'btn-neon', 'd3meca-0'];
    ids.forEach(function (id, i) {
      var item = itemById(id) || ITEMS[i];
      if (!item) return;
      var card = document.createElement('div');
      card.className = 'float-card fc-' + (i + 1);
      var host = document.createElement('div');
      host.className = 'demo-host';
      if (/^d3/.test(id)) card.style.setProperty('--h', '100%');
      card.appendChild(host);
      stage.appendChild(card);
      watchHost(host, item, stage, true);
    });
  })();
  (function bento() {
    var box = $('#bento');
    if (!box) return;
    CATS.filter(function (c) { return c.id !== 'all'; }).forEach(function (c) {
      var n = (BY_CAT[c.id] || []).length;
      var item = (c.demo && itemById(c.demo)) || firstIn(c.id);
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'bento-card';
      b.innerHTML =
        '<span class="count">' + n + '</span>' +
        '<div class="bento-preview"><div class="demo-host"></div></div>' +
        '<h3></h3><p></p>';
      b.querySelector('h3').textContent = c.label;
      b.querySelector('p').textContent = c.desc;
      b.addEventListener('click', function () { setCat(c.id, true); });
      if (FINE_POINTER) {
        b.addEventListener('pointermove', function (e) {
          var r = b.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          b.style.transform = 'perspective(800px) rotateY(' + (x * 9).toFixed(2) + 'deg) rotateX(' + (-y * 9).toFixed(2) + 'deg) translateY(-5px)';
        });
        b.addEventListener('pointerleave', function () { b.style.transform = ''; });
      }
      box.appendChild(b);
      if (item) watchHost($('.demo-host', b), item, b, true);
    });
  })();

  function queryItems(q) {
    q = (q || '').trim().toLowerCase();
    if (!q) {
      var rec = recent.map(itemById).filter(Boolean);
      var seen = {};
      rec.forEach(function (it) { seen[it.id] = 1; });
      var rest = ITEMS.filter(function (it) { return !seen[it.id]; });
      return rec.concat(rest).slice(0, 12);
    }
    var words = q.split(/\s+/);
    return ITEMS.filter(function (item) {
      var hay = item._search || '';
      return words.every(function (w) { return hay.indexOf(w) > -1; });
    });
  }

  function openFromRoute() {
    var id = readRoute();
    if (!id) {
      if (!modal.hidden) closeModal({ keepHash: true });
      return;
    }
    var it = itemById(id);
    if (it) openModal(it, { fromPop: true });
  }
  window.addEventListener('hashchange', openFromRoute);
  openFromRoute();

  window.MotionLab = {
    items: ITEMS,
    cats: CATS,
    kinds: KINDS,
    byCat: BY_CAT,
    count: function (cat) {
      if (!cat || cat === 'all') return ITEMS.length;
      return (BY_CAT[cat] || []).length;
    },
    flags: flags,
    /* shared with js/templates.js so the template source viewer highlights
       code exactly the way the effect modal does */
    hl: { html: hlHtml, css: hlCss, js: hlJs },
    copy: copy,
    filter: function (cat) { setCat(cat, true); },
    filterKind: function (kind) { setKind(kind || 'all'); },
    search: function (q) { state.q = q || ''; if (search) search.value = q || ''; render(true); },
    open: function (id) {
      var it = typeof id === 'string' ? itemById(id) : id;
      if (it) openModal(it);
    },
    share: shareItem,
    download: downloadHtml,
    query: queryItems,
    mount: mount,
    destroy: destroyHost,
    recent: function () { return recent.slice(); },
    random: function () {
      var pool = list.length ? list : ITEMS;
      openModal(pool[Math.floor(Math.random() * pool.length)]);
    }
  };
  window.dispatchEvent(new Event('ml:ready'));
})();

