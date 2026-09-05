/* ============================================================
   Motion Lab — starter templates
   Effects are building blocks; templates are whole rooms. Each one is a
   full-page interactive scene vendored byte-for-byte from a sibling repo
   into ./templates/<id>/, previewed live in a sandboxed iframe, launchable
   full screen, and readable / copyable / downloadable file by file.
   Zero dependencies, no build step — like everything else here.
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- the catalogue ---------------- */
  var TEMPLATES = [
    {
      id: 'galaxy-3d',
      num: 'T01',
      name: 'Spiral Galaxy',
      title: 'Interactive 3D Galaxy',
      tagline: '100 000 GPU points, three spiral arms, orbit controls.',
      desc: 'A Three.js particle galaxy: spiral arms, additive blending, a warm-core to cool-edge colour ramp, exponential fog and OrbitControls with damping. Every structural parameter is wired to a lil-gui panel and regenerates the buffer geometry in place — old geometry and material are disposed first, so dragging a slider never leaks.',
      repoName: 'ayushghbk-afk/Hi-this-is-time-pass',
      repo: 'https://github.com/ayushghbk-afk/Hi-this-is-time-pass',
      repoFile: 'https://github.com/ayushghbk-afk/Hi-this-is-time-pass/blob/main/',
      live: 'https://ayushghbk-afk.github.io/Hi-this-is-time-pass/',
      commit: '58933f5',
      dir: 'templates/galaxy-3d',
      entry: 'index.html',
      files: [
        { p: 'index.html', lang: 'html', lines: 61, note: 'page shell + the three CDN <script> tags' },
        { p: 'app.js', lang: 'js', lines: 147, note: 'scene, galaxy generator, control panel, resize, loop' }
      ],
      stack: ['Three.js r128', 'WebGL points', 'OrbitControls', 'lil-gui', 'vanilla JS'],
      deps: '3 CDN scripts',
      folders: [
        { g: 'Stars Layout', k: ['Star Count', 'Star Size'] },
        { g: 'Galaxy Structure', k: ['Radius', 'Arms / Branches', 'Arm Twist (Spin)', 'Scatter Distribution', 'Core Density'] },
        { g: 'Colours & Motion', k: ['Core Color', 'Outer Color', 'Rotation Speed'] }
      ],
      uses: ['Full-page WebGL hero or landing background', 'A "generative art" screen behind a menu', 'Teaching buffer geometry, vertex colours and dispose()'],
      hint: 'drag to orbit · scroll to zoom · the panel rebuilds the galaxy live',
      a1: '#ffe3a0',
      a2: '#1932ff',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="1.7"/><path d="M12.6 11.2c1.6-2.6 4.4-3.6 7-2.6 1.7.7 2.4 2.6 1.4 4"/><path d="M11.4 12.8c-1.6 2.6-4.4 3.6-7 2.6-1.7-.7-2.4-2.6-1.4-4"/><path d="M12.9 12.6c2.9.7 4.9 2.9 4.8 5.6-.1 1.8-1.6 3-3.2 2.5"/><path d="M11.1 11.4C8.2 10.7 6.2 8.5 6.3 5.8c.1-1.8 1.6-3 3.2-2.5"/></svg>'
    },
    {
      id: 'particle-heart',
      num: 'T02',
      name: 'Neon Particle Heart',
      title: 'Interactive Geometry Engine',
      tagline: 'Parametric curves drawn by 600 neon particles on a drifting starfield.',
      desc: 'A canvas 2D engine that marches particles along a parametric curve — heart, star, infinity or butterfly — with eased interpolation, motion trails from a translucent clear, and a parallax starfield drifting underneath. One settings object drives both engines and the lil-gui panel, so every knob is live.',
      repoName: 'ayushghbk-afk/Hart-for-html',
      repo: 'https://github.com/ayushghbk-afk/Hart-for-html',
      repoFile: 'https://github.com/ayushghbk-afk/Hart-for-html/blob/main/',
      live: 'https://ayushghbk-afk.github.io/Hart-for-html/',
      commit: 'a858074',
      dir: 'templates/particle-heart',
      entry: 'index.html',
      files: [
        { p: 'index.html', lang: 'html', lines: 14, note: 'canvas + lil-gui CDN' },
        { p: 'style.css', lang: 'css', lines: 35, note: 'cosmic gradient + themed control panel' },
        { p: 'script.js', lang: 'js', lines: 189, note: 'starfield, particle engine, shapes, GUI, render loop' }
      ],
      stack: ['Canvas 2D', 'parametric curves', 'lil-gui', 'vanilla JS'],
      deps: '1 CDN script',
      folders: [
        { g: 'Shape Properties', k: ['Active Shape', 'Count', 'Interpolation Speed', 'Particle Size', 'Neon Glow', 'Motion Trail', 'Shape Color'] },
        { g: 'Space Background', k: ['Star Density', 'Cosmic Drift Speed'] }
      ],
      uses: ['A greeting / dedication page that actually says something', 'Full-screen background behind a title or a login card', 'Teaching parametric equations, easing and canvas trails'],
      hint: 'particles re-form the moment you switch shape · try Motion Trail at 0.02',
      a1: '#ff2a5f',
      a2: '#7c5cff',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.2s-7.3-4.5-7.3-9.6A4.2 4.2 0 0 1 12 8.1a4.2 4.2 0 0 1 7.3 2.5c0 5.1-7.3 9.6-7.3 9.6z"/><circle cx="9.1" cy="10.4" r=".85"/><circle cx="14.9" cy="10.4" r=".85"/><circle cx="12" cy="14.6" r=".85"/></svg>'
    }
  ];

  /* exported first so `node tools/check.mjs` can audit the catalogue
     without ever touching a DOM */
  window.ML_TEMPLATES = TEMPLATES;

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var grid = $('#templateGrid');
  var play = $('#tplPlay');
  var code = $('#tplCode');
  if (!grid || !play || !code) return;                       /* headless run — stop here */

  var L = window.MotionLab || {};
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var toast = function (m) { if (window.MotionLabToast) window.MotionLabToast(m); };
  /* thumbnails render the whole page into a fixed 960x540 viewport and are
     scaled to *cover* the stage: a small framebuffer (cheap for WebGL) that
     still fills the card, and these scenes are centred so the crop is free */
  var VW = 960, VH = 540;
  var SRC = {};                                              /* fetched file cache */
  var recs = {};                                             /* per-template preview state */

  function byId(id) {
    for (var i = 0; i < TEMPLATES.length; i++) if (TEMPLATES[i].id === id) return TEMPLATES[i];
    return null;
  }
  function knobs(t) {
    return t.folders.reduce(function (n, f) { return n + f.k.length; }, 0);
  }
  function lines(t) {
    return t.files.reduce(function (n, f) { return n + f.lines; }, 0);
  }

  /* ---------------- highlighting (borrowed from the gallery engine) ---------------- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function paint(text, lang) {
    var hl = L.hl || {};
    if (lang === 'html' && hl.html) return hl.html(text);
    if (lang === 'css' && hl.css) return hl.css(text);
    if (lang === 'js' && hl.js) return hl.js(text);
    return esc(text);
  }

  /* ---------------- cards ---------------- */
  function cardFor(t) {
    var el = document.createElement('article');
    el.className = 'tpl-card';
    el.dataset.tpl = t.id;
    el.style.setProperty('--a1', t.a1);
    el.style.setProperty('--a2', t.a2);

    var stage = document.createElement('div');
    stage.className = 'tpl-stage';
    stage.innerHTML =
      '<div class="tpl-poster" aria-hidden="true"><span class="tpl-star"></span><span class="tpl-star s2"></span><span class="tpl-star s3"></span></div>' +
      '<span class="tpl-live-badge"><i></i>live preview</span>' +
      '<span class="tpl-hint">loading the scene — it pulls its libraries from a CDN</span>' +
      '<span class="tpl-paused">paused — press play in the header</span>' +
      '<span class="tpl-open" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24"><path d="M8 5l9 7-9 7z"/></svg>' +
        '<b>Open live preview</b><small>interactive · full screen</small>' +
      '</span>';
    var frame = document.createElement('iframe');
    frame.className = 'tpl-frame';
    frame.title = t.title + ' — live preview';
    frame.setAttribute('sandbox', 'allow-scripts allow-pointer-lock');
    frame.setAttribute('loading', 'lazy');
    frame.setAttribute('tabindex', '-1');
    frame.setAttribute('scrolling', 'no');
    stage.appendChild(frame);

    var body = document.createElement('div');
    body.className = 'tpl-body';
    body.innerHTML =
      '<div class="tpl-head">' +
        '<span class="tpl-ico">' + t.icon + '</span>' +
        '<span class="tpl-heading"><h3></h3><p class="tpl-sub"></p></span>' +
        '<span class="tpl-num">' + t.num + '</span>' +
      '</div>' +
      '<p class="tpl-tag"></p>' +
      '<p class="tpl-desc"></p>' +
      '<ul class="tpl-uses">' + t.uses.map(function (u) { return '<li></li>'; }).join('') + '</ul>' +
      '<ul class="tpl-stats">' +
        '<li><b>' + t.files.length + '</b><span>files</span></li>' +
        '<li><b>' + lines(t) + '</b><span>lines</span></li>' +
        '<li><b>' + knobs(t) + '</b><span>live controls</span></li>' +
        '<li><b>' + t.deps + '</b><span>dependencies</span></li>' +
      '</ul>' +
      '<div class="tpl-knobs" id="tplKnobs-' + t.id + '"></div>' +
      '<div class="tpl-tags">' + t.stack.map(function (s) { return '<span class="tag">' + s + '</span>'; }).join('') + '</div>' +
      '<div class="tpl-actions">' +
        '<button class="btn-primary sm" type="button" data-act="play">Launch preview</button>' +
        '<a class="btn-ghost sm" href="' + t.dir + '/' + t.entry + '" target="_blank" rel="noopener">Open full page ' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg></a>' +
        '<button class="btn-ghost sm" type="button" data-act="source">Source</button>' +
        '<a class="btn-ghost sm tpl-gh" href="' + t.repo + '" target="_blank" rel="noopener" title="' + t.repoName + '">' +
          '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.6-1.3-1.4-1.7-1.4-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.7 4.8 18.7 5 18.7 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"/></svg>' +
          'Fork</a>' +
      '</div>';
    $('h3', body).textContent = t.title;
    $('.tpl-sub', body).textContent = t.name + ' · ' + t.repoName;
    $('.tpl-tag', body).textContent = t.tagline;
    $('.tpl-desc', body).textContent = t.desc;
    $$('.tpl-uses li', body).forEach(function (li, i) { li.textContent = t.uses[i]; });

    /* the control-panel inventory, as chips grouped by folder */
    var kb = $('#tplKnobs-' + t.id, body);
    t.folders.forEach(function (f) {
      var row = document.createElement('div');
      row.className = 'tpl-knob-row';
      row.innerHTML = '<em>' + f.g + '</em><span>' + f.k.join('</span><span>') + '</span>';
      kb.appendChild(row);
    });

    el.appendChild(stage);
    el.appendChild(body);

    /* interactions */
    stage.addEventListener('click', function () { openPlay(t); });
    stage.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPlay(t); }
    });
    stage.setAttribute('role', 'button');
    stage.setAttribute('tabindex', '0');
    stage.setAttribute('aria-label', 'Open a live, interactive preview of ' + t.title);
    $$('[data-act]', body).forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.dataset.act === 'play') openPlay(t);
        else openCode(t, t.files[0].p);
      });
    });

    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });

    var rec = { tpl: t, stage: stage, iframe: frame, el: el, loaded: false, wanted: false, to: 0 };
    recs[t.id] = rec;
    frame.addEventListener('load', function () {
      if (!rec.loaded) return;                 /* about:blank loads must not fake a preview */
      rec.stage.classList.remove('loading');
      rec.stage.classList.add('ready');
    });
    sizeFrame(rec);
    return el;
  }

  /* ---------------- thumbnail previews ---------------- */
  function sizeFrame(rec) {
    var w = rec.stage.clientWidth, h = rec.stage.clientHeight;
    if (!w || !h) return;
    rec.iframe.style.setProperty('--s', Math.max(w / VW, h / VH).toFixed(4));
  }

  function loadPreview(rec) {
    if (rec.loaded || document.body.classList.contains('paused')) return;
    rec.loaded = true;
    rec.stage.classList.remove('slow');
    rec.stage.classList.add('loading');
    rec.iframe.src = rec.tpl.dir + '/' + rec.tpl.entry;
    /* the scenes pull Three.js / lil-gui from a CDN — say so if that is slow */
    clearTimeout(rec.to);
    rec.to = setTimeout(function () { if (!rec.stage.classList.contains('ready')) rec.stage.classList.add('slow'); }, 7000);
  }

  function unloadPreview(rec) {
    if (!rec.loaded) return;
    clearTimeout(rec.to);
    rec.loaded = false;
    rec.stage.classList.remove('ready', 'loading', 'slow');
    rec.iframe.src = 'about:blank';
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var rec = recs[e.target.dataset.tpl];
      if (!rec) return;
      rec.wanted = e.isIntersecting;
      if (e.isIntersecting) { sizeFrame(rec); if (!reduce) loadPreview(rec); }
      else unloadPreview(rec);
    });
  }, { rootMargin: '260px 0px' });

  TEMPLATES.forEach(function (t) {
    var el = cardFor(t);
    grid.appendChild(el);
    io.observe(el);
  });
  requestAnimationFrame(function () {
    Object.keys(recs).forEach(function (k) { sizeFrame(recs[k]); });
  });

  window.addEventListener('resize', function () {
    Object.keys(recs).forEach(function (k) { sizeFrame(recs[k]); });
  });

  /* the header's global pause button stops the whole site — templates included */
  var pauseBtn = $('#motionToggle');
  if (pauseBtn) pauseBtn.addEventListener('click', function () {
    setTimeout(function () {
      var off = document.body.classList.contains('paused');
      Object.keys(recs).forEach(function (k) {
        var rec = recs[k];
        if (off) unloadPreview(rec);
        else if (rec.wanted && !reduce) loadPreview(rec);
      });
      if (off && !play.hidden) closePlay();
    }, 0);
  });

  /* ---------------- focus bookkeeping ---------------- */
  var lastFocus = null;
  function rememberFocus() { lastFocus = document.activeElement; }
  function restoreFocus() {
    var el = lastFocus; lastFocus = null;
    if (!el || !el.focus || !document.contains(el)) return;
    try { el.focus(); } catch (e) {}
  }

  /* ---------------- live preview overlay ---------------- */
  var playFrame = $('#tplPlayFrame');
  var playTpl = null;

  function openPlay(t) {
    if (play.hidden) rememberFocus();
    playTpl = t;
    $('#tplPlayTitle').textContent = t.title;
    $('#tplPlayMeta').textContent = t.name + ' · ' + t.stack.join(' · ');
    $('#tplPlayNew').href = t.dir + '/' + t.entry;
    $('#tplPlayRepo').href = t.repo;
    $('#tplPlayLive').href = t.live;
    $('#tplPlayNote').textContent = knobs(t) + ' live controls · ' + (t.hint || '') + ' · ' + t.dir + '/' + t.entry;
    play.hidden = false;
    document.body.classList.add('tpl-open');
    requestAnimationFrame(function () { play.classList.add('open'); });
    playFrame.src = t.dir + '/' + t.entry;
  }
  function closePlay() {
    play.classList.remove('open');
    playFrame.src = 'about:blank';
    playTpl = null;
    setTimeout(function () {
      play.hidden = true;
      if (code.hidden) { document.body.classList.remove('tpl-open'); restoreFocus(); }
    }, 260);
  }
  $('#tplPlayReload').addEventListener('click', function () {
    if (playTpl) playFrame.src = playTpl.dir + '/' + playTpl.entry;
  });
  $('#tplPlaySrc').addEventListener('click', function () {
    if (playTpl) openCode(playTpl, playTpl.files[0].p);
  });

  /* ---------------- source overlay ---------------- */
  var codeTpl = null, codeFile = null;

  function fileText(t, p, cb) {
    var key = t.dir + '/' + p;
    if (SRC[key]) return cb(SRC[key]);
    if (!window.fetch) return cb(null);
    fetch(key, { cache: 'force-cache' }).then(function (r) {
      if (!r.ok) throw new Error(String(r.status));
      return r.text();
    }).then(function (txt) { SRC[key] = txt; cb(txt); }, function () { cb(null); });
  }

  function openCode(t, p) {
    if (code.hidden) rememberFocus();
    codeTpl = t;
    codeFile = p;
    $('#tplCodeTitle').textContent = t.title + ' — source';
    $('#tplCodeMeta').textContent = t.repoName + ' @ ' + t.commit + ' · ' + t.files.length + ' files · ' + lines(t) + ' lines';
    $('#tplCodeGit').href = t.repoFile + p;
    $('#tplCodeAll').href = t.repo;

    var tabs = $('#tplTabs');
    tabs.innerHTML = '';
    t.files.forEach(function (f) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = f.p;
      b.className = f.p === p ? 'active' : '';
      b.addEventListener('click', function () { showFile(t, f.p); });
      tabs.appendChild(b);
    });

    code.hidden = false;
    document.body.classList.add('tpl-open');
    requestAnimationFrame(function () { code.classList.add('open'); });
    showFile(t, p);
  }

  function showFile(t, p) {
    codeTpl = t; codeFile = p;
    var out = $('#tplCodeOut');
    var meta = $('#tplFileNote');
    var f = t.files.filter(function (x) { return x.p === p; })[0] || { lang: 'js', lines: 0 };
    $$('#tplTabs button').forEach(function (b) { b.classList.toggle('active', b.textContent === p); });
    $('#tplCodeGit').href = t.repoFile + p;
    meta.textContent = f.note ? p + ' · ' + f.lines + ' lines · ' + f.note : p + ' · ' + f.lines + ' lines';
    out.innerHTML = '<span class="tok-com">loading ' + p + '…</span>';
    fileText(t, p, function (txt) {
      if (txt === null) {
        out.innerHTML = '<span class="tok-com">Could not read ' + esc(t.dir + '/' + p) + '.\n' +
          'Opening the site over http(s) (python3 -m http.server) fixes this —\n' +
          'or read it on GitHub: ' + esc(t.repoFile + p) + '</span>';
        return;
      }
      out.innerHTML = paint(txt, f.lang);
    });
  }

  function closeCode() {
    code.classList.remove('open');
    setTimeout(function () {
      code.hidden = true;
      if (play.hidden) { document.body.classList.remove('tpl-open'); restoreFocus(); }
    }, 260);
  }

  $('#tplCopyFile').addEventListener('click', function () {
    if (!codeTpl) return;
    fileText(codeTpl, codeFile, function (txt) {
      if (txt === null) return toast('Nothing to copy — see the note in the panel');
      (L.copy || localCopy)(txt, codeFile + ' copied');
    });
  });
  $('#tplCopyAll').addEventListener('click', function () {
    if (!codeTpl) return;
    var t = codeTpl, left = t.files.length, bundle = '', missing = 0;
    t.files.forEach(function (f) {
      fileText(t, f.p, function (txt) {
        var bar = '===== ' + f.p + ' =====';
        bundle += '\n\n' + (f.lang === 'html' ? '<!-- ' + bar + ' -->' : '/* ' + bar + ' */') + '\n\n' +
          (txt === null ? (missing++, '(could not read this file)') : txt);
        if (--left === 0) {
          if (missing === t.files.length) return toast('Nothing to copy — are you opening this over http?');
          (L.copy || localCopy)(bundle.trim() + '\n', 'All ' + t.files.length + ' files copied');
        }
      });
    });
  });
  $('#tplDownload').addEventListener('click', function () {
    if (!codeTpl) return;
    fileText(codeTpl, codeFile, function (txt) {
      if (txt === null) return toast('Nothing to download — see the note in the panel');
      var url = URL.createObjectURL(new Blob([txt], { type: 'text/plain' }));
      var a = document.createElement('a');
      a.href = url; a.download = codeFile;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      toast(codeFile + ' downloaded');
    });
  });
  $('#tplPlayThis').addEventListener('click', function () {
    if (!codeTpl) return;
    var t = codeTpl;
    code.hidden = true;                        /* swap, do not stack: the code panel paints on top */
    openPlay(t);
  });

  function localCopy(text, msg) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast(msg); } catch (e) { toast('Copy failed — select the code manually'); }
    ta.remove();
  }

  /* ---------------- closing ---------------- */
  $$('[data-tpl-close]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (!code.hidden) closeCode(); else if (!play.hidden) closePlay();
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!code.hidden) { closeCode(); return; }
    if (!play.hidden) { closePlay(); }
  });

  /* ---------------- counters ---------------- */
  var n = $('#tplCount');
  if (n) {
    n.textContent = TEMPLATES.length + ' full-page templates · ' +
      TEMPLATES.reduce(function (a, t) { return a + t.files.length; }, 0) + ' files · ' +
      TEMPLATES.reduce(function (a, t) { return a + lines(t); }, 0) + ' lines · ' +
      TEMPLATES.reduce(function (a, t) { return a + knobs(t); }, 0) + ' live controls';
  }
  var hero = $('#tplHeroStat');
  if (hero) hero.dataset.count = TEMPLATES.length;

  /* ---------------- public API ---------------- */
  window.MotionLabTemplates = {
    list: TEMPLATES,
    byId: byId,
    open: function (id) { var t = byId(id); if (t) openPlay(t); },
    source: function (id) { var t = byId(id); if (t) openCode(t, t.files[0].p); },
    query: function (q) {
      q = (q || '').trim().toLowerCase();
      if (!q) return TEMPLATES.slice();
      return TEMPLATES.filter(function (t) {
        var hay = (t.title + ' ' + t.name + ' ' + t.id + ' ' + t.tagline + ' ' + t.repoName + ' ' +
          t.stack.join(' ') + ' template ' + t.folders.map(function (f) { return f.k.join(' '); }).join(' ')).toLowerCase();
        return q.split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; });
      });
    }
  };
  window.dispatchEvent(new Event('ml:templates'));
})();
