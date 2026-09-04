/* ============================================================
   Motion Lab — product chrome
   Mega menu, mobile drawer, command palette, magnetic buttons,
   header hide-on-scroll, pointer glow.
   ============================================================ */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var header = $('#siteHeader');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- icons ---------------- */
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
    motion:      '<svg viewBox="0 0 24 24"><path d="M4 12h4l3-7 4 14 3-7h2"/></svg>'
  };

  function lab() { return window.MotionLab || null; }

  /* ---------------- header hide on scroll ---------------- */
  var lastY = 0, ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || 0;
      header.classList.toggle('stuck', y > 8);
      var menuOpen = header.classList.contains('menu-open') || document.body.classList.contains('cmdk-open');
      if (!menuOpen) {
        if (y > lastY && y > 80) header.classList.add('hide');
        else header.classList.remove('hide');
      }
      document.documentElement.classList.toggle('nav-away', header.classList.contains('hide'));
      lastY = y;
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- pointer glow ---------------- */
  var glow = $('#pointerGlow');
  if (glow && !reduce && window.matchMedia('(pointer:fine)').matches) {
    var gx = -999, gy = -999, tx = -999, ty = -999, on = false;
    window.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!on) { on = true; glow.classList.add('on'); }
    }, { passive: true });
    (function loop() {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.transform = 'translate3d(' + gx + 'px,' + gy + 'px,0)';
      requestAnimationFrame(loop);
    })();
  }

  /* ---------------- magnetic buttons ---------------- */
  function magnetic(el, strength) {
    if (!el || reduce || !window.matchMedia('(pointer:fine)').matches) return;
    var s = strength || 0.28;
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var x = e.clientX - r.left - r.width / 2;
      var y = e.clientY - r.top - r.height / 2;
      el.style.transform = 'translate(' + (x * s) + 'px,' + (y * s) + 'px)';
    });
    el.addEventListener('pointerleave', function () { el.style.transform = ''; });
  }
  $$('.mag-btn, .icon-btn, .header-cta, .search-trigger').forEach(function (el) { magnetic(el, 0.22); });

  /* ---------------- nav ink ---------------- */
  var nav = $('#primaryNav');
  var ink = $('#navInk');
  function moveInk(el) {
    if (!ink || !nav || !el) return;
    var nr = nav.getBoundingClientRect();
    var r = el.getBoundingClientRect();
    ink.style.width = r.width + 'px';
    ink.style.transform = 'translateX(' + (r.left - nr.left - 4) + 'px)';
    ink.classList.add('on');
  }
  if (nav && ink) {
    $$('.nav-link', nav).forEach(function (link) {
      link.addEventListener('mouseenter', function () { moveInk(link); });
      link.addEventListener('focus', function () { moveInk(link); });
    });
    nav.addEventListener('mouseleave', function () {
      var open = $('.nav-link[aria-expanded="true"]', nav);
      if (open) moveInk(open); else ink.classList.remove('on');
    });
  }

  /* ---------------- mega menus ---------------- */
  var openMenu = null;
  var closeTimer = 0;

  function closeMegas() {
    $$('.mega').forEach(function (m) {
      m.classList.remove('open');
      setTimeout(function () { if (!m.classList.contains('open')) m.hidden = true; }, 280);
    });
    $$('.nav-link.has-menu').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    header.classList.remove('menu-open');
    openMenu = null;
    if (ink && !nav.matches(':hover')) ink.classList.remove('on');
  }

  function showMega(id, btn) {
    clearTimeout(closeTimer);
    var panel = $('#' + id);
    if (!panel) return;
    $$('.mega').forEach(function (m) {
      if (m !== panel) { m.classList.remove('open'); m.hidden = true; }
    });
    $$('.nav-link.has-menu').forEach(function (b) { b.setAttribute('aria-expanded', String(b === btn)); });
    panel.hidden = false;
    requestAnimationFrame(function () { panel.classList.add('open'); });
    header.classList.add('menu-open');
    header.classList.remove('hide');
    openMenu = id;
    if (btn) moveInk(btn);
  }

  function bindMega(btnId, megaId) {
    var btn = $('#' + btnId);
    var panel = $('#' + megaId);
    if (!btn || !panel) return;
    btn.addEventListener('mouseenter', function () { showMega(megaId, btn); });
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (openMenu === megaId) closeMegas(); else showMega(megaId, btn);
    });
    panel.addEventListener('mouseenter', function () { clearTimeout(closeTimer); });
    panel.addEventListener('mouseleave', function () { closeTimer = setTimeout(closeMegas, 180); });
    btn.addEventListener('mouseleave', function () { closeTimer = setTimeout(closeMegas, 180); });
  }
  bindMega('navProduct', 'megaProduct');
  bindMega('navResources', 'megaResources');
  document.addEventListener('click', function (e) {
    if (openMenu && !e.target.closest('.mega, .has-menu')) closeMegas();
  });

  function fillMega() {
    var L = lab();
    var grid = $('#megaGrid');
    if (!L || !grid) return;
    grid.innerHTML = '';
    L.cats.filter(function (c) { return c.id !== 'all'; }).forEach(function (c) {
      var n = L.items.filter(function (i) { return i.cat === c.id; }).length;
      var a = document.createElement('button');
      a.type = 'button';
      a.className = 'mega-card';
      a.innerHTML =
        '<span class="ico">' + (ICONS[c.id] || ICONS.all) + '</span>' +
        '<span><b>' + c.label + '</b><small>' + (c.desc || '') + '</small><span class="n">' + n + ' effects</span></span>';
      a.addEventListener('click', function () {
        L.filter(c.id);
        closeMegas();
        closeMobile();
        var g = $('#gallery');
        if (g) g.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      });
      grid.appendChild(a);
    });
  }

  var openTune = $('[data-open-tune]');
  if (openTune) openTune.addEventListener('click', function (e) {
    e.preventDefault();
    closeMegas();
    var t = $('#tuneAll');
    if (t) t.click();
  });
  var shortcuts = $('#openShortcuts');
  if (shortcuts) shortcuts.addEventListener('click', function () {
    closeMegas();
    openCmdk();
  });

  /* ---------------- mobile nav ---------------- */
  var mobile = $('#mobileNav');
  var menuBtn = $('#menuToggle');

  function openMobile() {
    if (!mobile) return;
    closeMegas();
    mobile.hidden = false;
    header.classList.add('menu-open');
    menuBtn && menuBtn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(function () { mobile.classList.add('open'); });
    document.body.style.overflow = 'hidden';
  }
  function closeMobile() {
    if (!mobile) return;
    mobile.classList.remove('open');
    header.classList.remove('menu-open');
    menuBtn && menuBtn.setAttribute('aria-expanded', 'false');
    setTimeout(function () { if (!mobile.classList.contains('open')) mobile.hidden = true; }, 380);
    if ($('#cmdk').hidden && $('#modal').hidden) document.body.style.overflow = '';
  }
  if (menuBtn) menuBtn.addEventListener('click', function () {
    if (mobile && !mobile.hidden && mobile.classList.contains('open')) closeMobile();
    else openMobile();
  });
  $$('[data-close-menu]').forEach(function (el) {
    el.addEventListener('click', closeMobile);
  });

  function fillMobile() {
    var L = lab();
    var box = $('#mobileCats');
    if (!L || !box) return;
    box.innerHTML = '';
    L.cats.filter(function (c) { return c.id !== 'all'; }).forEach(function (c, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'mobile-cat';
      b.style.setProperty('--i', i);
      b.innerHTML = (ICONS[c.id] || '') + '<span>' + c.label + '</span>';
      b.addEventListener('click', function () {
        L.filter(c.id);
        closeMobile();
        var g = $('#gallery');
        if (g) g.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      });
      box.appendChild(b);
    });
  }

  /* ---------------- command palette ---------------- */
  var cmdk = $('#cmdk');
  var search = $('#search');
  var results = $('#cmdkResults');
  var cmdIndex = 0;
  var cmdItems = [];

  function openCmdk() {
    if (!cmdk) return;
    closeMegas();
    closeMobile();
    cmdk.hidden = false;
    document.body.classList.add('cmdk-open');
    header.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    paintCmdk();
    requestAnimationFrame(function () { if (search) search.focus(); search && search.select(); });
  }
  function closeCmdk() {
    if (!cmdk) return;
    cmdk.hidden = true;
    document.body.classList.remove('cmdk-open');
    if ($('#modal').hidden) document.body.style.overflow = '';
  }
  function toggleCmdk() { if (cmdk.hidden) openCmdk(); else closeCmdk(); }

  $$('[data-close-cmdk]').forEach(function (el) { el.addEventListener('click', closeCmdk); });
  var trigger = $('#searchTrigger');
  if (trigger) trigger.addEventListener('click', openCmdk);
  var footerSearch = $('#footerSearch');
  if (footerSearch) footerSearch.addEventListener('click', openCmdk);

  function paintCmdk() {
    var L = lab();
    if (!L || !results) return;
    var q = (search && search.value || '').trim();
    var list = L.query(q).slice(0, 12);
    cmdItems = list;
    cmdIndex = 0;
    if (!list.length) {
      results.innerHTML = '<p class="cmdk-empty">No matches. Try a category — loaders, buttons, 3d…</p>';
      return;
    }
    results.innerHTML = '';
    list.forEach(function (item, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cmdk-item' + (i === 0 ? ' active' : '');
      b.setAttribute('role', 'option');
      b.innerHTML =
        '<span class="cat">' + item.cat + '</span>' +
        '<span><b></b><small>' + (item.tags || []).join(' · ') + '</small></span>' +
        '<span class="n" style="font-family:var(--mono);font-size:.7rem;color:var(--muted)">↵</span>';
      b.querySelector('b').textContent = item.title;
      b.addEventListener('click', function () { pick(item); });
      b.addEventListener('mouseenter', function () { setActive(i); });
      results.appendChild(b);
    });
  }
  function setActive(i) {
    cmdIndex = i;
    $$('.cmdk-item', results).forEach(function (el, n) { el.classList.toggle('active', n === i); });
  }
  function pick(item) {
    var L = lab();
    if (!L) return;
    closeCmdk();
    L.open(item.id);
  }
  if (search) search.addEventListener('input', paintCmdk);

  /* ---------------- chip ink ---------------- */
  function placeChipInk() {
    var inkEl = $('#chipInk');
    var active = $('.chip.active');
    if (!inkEl || !active) return;
    inkEl.style.width = active.offsetWidth + 'px';
    inkEl.style.transform = 'translateX(' + active.offsetLeft + 'px)';
  }
  window.addEventListener('ml:chips', placeChipInk);
  window.addEventListener('resize', placeChipInk);

  /* ---------------- footer cat links ---------------- */
  $$('a[data-cat]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var L = lab();
      if (!L) return;
      e.preventDefault();
      L.filter(a.dataset.cat);
      var g = $('#gallery');
      if (g) g.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  /* ---------------- keyboard ---------------- */
  document.addEventListener('keydown', function (e) {
    var meta = e.metaKey || e.ctrlKey;
    if ((meta && e.key.toLowerCase() === 'k') || (e.key === '/' && !isTyping(e) && cmdk.hidden)) {
      e.preventDefault();
      toggleCmdk();
      return;
    }
    if (e.key === 'Escape') {
      if (!cmdk.hidden) { closeCmdk(); return; }
      if (mobile && !mobile.hidden && mobile.classList.contains('open')) { closeMobile(); return; }
      if (openMenu) closeMegas();
      return;
    }
    if (cmdk.hidden) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(Math.min(cmdIndex + 1, cmdItems.length - 1));
      scrollActive();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(Math.max(cmdIndex - 1, 0));
      scrollActive();
    } else if (e.key === 'Enter' && cmdItems[cmdIndex]) {
      e.preventDefault();
      pick(cmdItems[cmdIndex]);
    }
  });
  function isTyping(e) {
    var t = e.target;
    return t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
  }
  function scrollActive() {
    var el = $$('.cmdk-item', results)[cmdIndex];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }

  /* ---------------- boot ---------------- */
  function boot() {
    fillMega();
    fillMobile();
    placeChipInk();
    window.ML_ICONS = ICONS;
  }
  if (lab()) boot();
  else window.addEventListener('ml:ready', boot);
})();
