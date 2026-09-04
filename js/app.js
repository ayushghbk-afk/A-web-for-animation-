/* ============================================================
   Motion Lab — gallery engine
   Mounts every demo inside its own Shadow DOM, lazily.
   ============================================================ */
(function () {
  'use strict';

  var ITEMS = window.MOTION_LAB || [];

  var CATS = [
    { id: 'all',         label: 'Everything' },
    { id: 'loaders',     label: 'Loaders' },
    { id: 'buttons',     label: 'Buttons' },
    { id: 'text',        label: 'Text FX' },
    { id: 'cards',       label: 'Cards & Hover' },
    { id: 'backgrounds', label: 'Backgrounds' },
    { id: 'controls',    label: 'Controls' },
    { id: 'svg',         label: 'SVG & Lines' },
    { id: '3d',          label: '3D' },
    { id: 'motion',      label: 'Interaction' }
  ];

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------- global animation frame pump ---------------- */
  var pump = [];
  var paused = false;
  (function loop() {
    if (!paused) {
      for (var i = 0; i < pump.length; i++) {
        var t = pump[i];
        if (t.alive && t.visible) { try { t.fn(); } catch (e) { t.alive = false; } }
      }
    }
    pump = pump.filter(function (t) { return t.alive; });
    requestAnimationFrame(loop);
  })();

  /* ---------------- mounting ---------------- */
  function mount(item, host) {
    if (host.__inst) return host.__inst;
    return remount(item, host);
  }

  function remount(item, host) {
    if (host.__inst) { host.__inst.destroy(); host.__inst = null; }

    var root = host.shadowRoot || host.attachShadow({ mode: 'open' });
    root.innerHTML = '';

    var style = document.createElement('style');
    style.textContent =
      ':host{display:contents}' +
      ':host(.is-paused) *{animation-play-state:paused !important}' +
      '*{box-sizing:border-box}' +
      ':host,div,span,b,i,em,p,button,input,label,svg,figure,figcaption,h4,nav,output{font-family:"Space Grotesk",system-ui,sans-serif}' +
      item.css;
    root.appendChild(style);

    var wrap = document.createElement('div');
    wrap.className = 'demo-root';
    wrap.style.cssText = 'display:grid;place-items:center;width:100%;';
    wrap.innerHTML = item.html;
    root.appendChild(wrap);

    var inst = { root: root, visible: true, cleanups: [], tasks: [] };

    if (item.js) {
      var api = {
        raf: function (fn) {
          var t = { fn: fn, alive: true, visible: true };
          pump.push(t); inst.tasks.push(t);
        },
        onCleanup: function (fn) { inst.cleanups.push(fn); }
      };
      try {
        new Function('root', 'api', item.js)(root, api);
      } catch (e) {
        console.warn('[motion-lab] demo failed:', item.id, e);
      }
    }

    inst.setVisible = function (v) {
      inst.visible = v;
      inst.tasks.forEach(function (t) { t.visible = v; });
    };
    inst.destroy = function () {
      inst.tasks.forEach(function (t) { t.alive = false; });
      inst.cleanups.forEach(function (f) { try { f(); } catch (e) {} });
    };

    if (paused) host.classList.add('is-paused');
    host.__inst = inst;
    return inst;
  }

  /* ---------------- syntax highlighting ---------------- */
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function hlHtml(s) {
    return esc(s).replace(/(&lt;\/?[\w-]+)|([\w-]+)(?==")|("[^"]*")/g, function (m, tag, attr, str) {
      if (tag) return '<span class="tok-tag">' + tag + '</span>';
      if (attr) return '<span class="tok-attr">' + attr + '</span>';
      return '<span class="tok-str">' + str + '</span>';
    });
  }
  function hlCss(s) {
    return esc(s).replace(/(\/\*[\s\S]*?\*\/)|(@[\w-]+)|([\w-]+)(?=\s*:)|(#[0-9a-fA-F]{3,8})\b|("[^"]*")/g,
      function (m, com, at, prop, hex, str) {
        if (com) return '<span class="tok-com">' + com + '</span>';
        if (at) return '<span class="tok-kw">' + at + '</span>';
        if (prop) return '<span class="tok-prop">' + prop + '</span>';
        if (hex) return '<span class="tok-str">' + hex + '</span>';
        return '<span class="tok-str">' + str + '</span>';
      });
  }
  function hlJs(s) {
    return esc(s).replace(/(\/\/[^\n]*)|("[^"]*"|'[^']*')|\b(var|let|const|function|return|if|else|for|new|this|true|false)\b/g,
      function (m, com, str, kw) {
        if (com) return '<span class="tok-com">' + com + '</span>';
        if (str) return '<span class="tok-str">' + str + '</span>';
        return '<span class="tok-kw">' + kw + '</span>';
      });
  }

  /* ---------------- state ---------------- */
  var favs = {};
  try { favs = JSON.parse(localStorage.getItem('ml-favs') || '{}'); } catch (e) { favs = {}; }
  var state = { cat: 'all', q: '', favOnly: false };

  var grid = $('#grid');
  var chipBox = $('#chips');
  var resultCount = $('#resultCount');
  var emptyMsg = $('#empty');

  /* ---------------- chips ---------------- */
  CATS.forEach(function (c) {
    var n = c.id === 'all' ? ITEMS.length : ITEMS.filter(function (i) { return i.cat === c.id; }).length;
    var b = document.createElement('button');
    b.className = 'chip' + (c.id === 'all' ? ' active' : '');
    b.dataset.cat = c.id;
    b.innerHTML = c.label + '<span class="n">' + n + '</span>';
    b.addEventListener('click', function () {
      state.cat = c.id;
      $$('.chip').forEach(function (x) { x.classList.toggle('active', x === b); });
      render();
    });
    chipBox.appendChild(b);
  });

  /* ---------------- lazy observer ---------------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var host = $('.demo-host', e.target);
      if (!host) return;
      if (e.isIntersecting) {
        var item = ITEMS[+e.target.dataset.idx];
        var inst = mount(item, host);
        inst.setVisible(true);
      } else if (host.__inst) {
        host.__inst.setVisible(false);
      }
    });
  }, { rootMargin: '250px 0px' });

  /* ---------------- card factory ---------------- */
  function cardFor(item, idx, n) {
    var el = document.createElement('article');
    el.className = 'card';
    el.dataset.idx = ITEMS.indexOf(item);
    el.style.animationDelay = Math.min(idx * 22, 420) + 'ms';

    var stage = document.createElement('div');
    stage.className = 'card-stage';
    var host = document.createElement('div');
    host.className = 'demo-host';
    stage.appendChild(host);

    var body = document.createElement('div');
    body.className = 'card-body';
    body.innerHTML =
      '<div class="card-top"><h3 class="card-title"></h3><span class="card-num">' +
        String(n).padStart(3, '0') + '</span></div>' +
      '<div class="card-tags">' +
        '<span class="tag">' + item.cat + '</span>' +
        item.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') +
      '</div>' +
      '<div class="card-actions">' +
        '<button class="mini code">' +
          '<svg viewBox="0 0 24 24"><path d="M8 6l-6 6 6 6M16 6l6 6-6 6"/></svg>Code</button>' +
        '<button class="mini replay flex-none" title="Replay">' +
          '<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/></svg></button>' +
        '<button class="mini fav flex-none" title="Favourite" aria-pressed="false">' +
          '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.7-9.5-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.5 6c-2 4.3-9.5 9-9.5 9z"/></svg></button>' +
      '</div>';
    $('.card-title', body).textContent = item.title;

    el.appendChild(stage);
    el.appendChild(body);

    var favBtn = $('.fav', body);
    favBtn.setAttribute('aria-pressed', favs[item.id] ? 'true' : 'false');
    favBtn.addEventListener('click', function () {
      if (favs[item.id]) { delete favs[item.id]; } else { favs[item.id] = 1; }
      favBtn.setAttribute('aria-pressed', favs[item.id] ? 'true' : 'false');
      localStorage.setItem('ml-favs', JSON.stringify(favs));
      toast(favs[item.id] ? 'Added to favourites' : 'Removed from favourites');
      if (state.favOnly) render();
    });

    $('.code', body).addEventListener('click', function () { openModal(item); });
    $('.replay', body).addEventListener('click', function () { replay(host, item); });

    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });

    io.observe(el);
    return el;
  }

  function replay(host, item) {
    remount(item, host).setVisible(true);
  }

  /* ---------------- rendering ---------------- */
  function matches(item) {
    if (state.cat !== 'all' && item.cat !== state.cat) return false;
    if (state.favOnly && !favs[item.id]) return false;
    if (!state.q) return true;
    var hay = (item.title + ' ' + item.cat + ' ' + item.tags.join(' ') + ' ' + item.id).toLowerCase();
    return state.q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; });
  }

  function render() {
    var list = ITEMS.filter(matches);
    grid.innerHTML = '';
    list.forEach(function (item, i) {
      grid.appendChild(cardFor(item, i, ITEMS.indexOf(item) + 1));
    });
    resultCount.textContent = list.length + ' / ' + ITEMS.length + ' effects shown';
    emptyMsg.hidden = list.length > 0;
  }

  /* ---------------- modal ---------------- */
  var modal = $('#modal');
  var modalPreview = $('#modalPreview');
  var codeOut = $('#codeOut');
  var codeTabs = $('#codeTabs');
  var current = null, currentTab = 'html';

  function tabsFor(item) {
    var t = [['html', 'HTML'], ['css', 'CSS']];
    if (item.js) t.push(['js', 'JS']);
    return t;
  }

  function showTab(k) {
    currentTab = k;
    $$('button', codeTabs).forEach(function (b) { b.classList.toggle('active', b.dataset.k === k); });
    var src = current[k] || '';
    codeOut.innerHTML = k === 'html' ? hlHtml(src) : k === 'css' ? hlCss(src) : hlJs(src);
  }

  function openModal(item) {
    current = item;
    $('#modalTitle').textContent = item.title;
    $('#modalMeta').textContent = item.cat + ' · ' + item.tags.join(' · ') + (item.js ? ' · interactive' : ' · pure css');

    modalPreview.innerHTML = '<div class="demo-host"></div>';
    mount(item, $('.demo-host', modalPreview)).setVisible(true);

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

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    var h = $('.demo-host', modalPreview);
    if (h && h.__inst) h.__inst.destroy();
    modalPreview.innerHTML = '';
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  $$('[data-close]').forEach(function (b) { b.addEventListener('click', closeModal); });

  function fullSnippet(item) {
    return '<!-- ' + item.title + ' — Motion Lab -->\n' +
      '<style>\n' + item.css + '\n</style>\n\n' + item.html +
      (item.js ? '\n\n<script>\n(function(){\n  var root = document;\n  var api = { raf: function(f){ (function l(){ f(); requestAnimationFrame(l); })(); }, onCleanup: function(){} };\n' + item.js + '\n})();\n<\/script>' : '') + '\n';
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
    copy(current[currentTab] || '', currentTab.toUpperCase() + ' copied to clipboard');
  });
  $('#copyAllBtn').addEventListener('click', function () {
    copy(fullSnippet(current), 'Full snippet copied — paste it into any HTML file');
  });
  $('#replayModal').addEventListener('click', function () {
    var h = $('.demo-host', modalPreview);
    if (h) replay(h, current);
  });

  /* ---------------- toast ---------------- */
  var toastEl = $('#toast'), toastId;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastId);
    toastId = setTimeout(function () { toastEl.classList.remove('show'); }, 2400);
  }

  /* ---------------- header controls ---------------- */
  var search = $('#search');
  var deb;
  search.addEventListener('input', function () {
    clearTimeout(deb);
    deb = setTimeout(function () { state.q = search.value.trim(); render(); }, 120);
  });
  $('#clearSearch').addEventListener('click', function () {
    search.value = ''; state.q = ''; state.cat = 'all'; state.favOnly = false;
    $('#favFilter').setAttribute('aria-pressed', 'false');
    $$('.chip').forEach(function (x, i) { x.classList.toggle('active', i === 0); });
    render();
  });

  $('#favFilter').addEventListener('click', function () {
    state.favOnly = !state.favOnly;
    this.setAttribute('aria-pressed', String(state.favOnly));
    render();
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
  var saved = localStorage.getItem('ml-theme');
  if (saved) document.documentElement.dataset.theme = saved;
  themeBtn.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('ml-theme', next);
  });

  $('#randomBtn').addEventListener('click', function () {
    var item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    openModal(item);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== search) { e.preventDefault(); search.focus(); }
    if (e.key === 'Escape') { if (!modal.hidden) closeModal(); else if (document.activeElement === search) search.blur(); }
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
  search.placeholder = 'Search ' + ITEMS.length + ' effects\u2026  (press /)';
  $$('.hero-stats b')[0].dataset.count = ITEMS.length;

  render();
  console.log('%c Motion Lab ', 'background:#7c5cff;color:#fff;border-radius:4px', ITEMS.length + ' effects loaded');
})();
