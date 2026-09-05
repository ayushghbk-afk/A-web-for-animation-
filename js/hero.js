/* ============================================================
   Motion Lab — hero + page chrome, animated by the collection
   Mounts live collection effects behind the hero and into How it
   works, After Effects, outro and the inventory thumbs.
   ============================================================ */
(function () {
  'use strict';

  function ready(fn) {
    if (window.MotionLab) { fn(); return; }
    window.addEventListener('ml:ready', fn, { once: true });
  }

  ready(function () {
    var ML = window.MotionLab;
    var byId = {};
    (ML.items || []).forEach(function (it) { byId[it.id] = it; });

    function mountChrome(id, hostId, h) {
      var host = document.getElementById(hostId);
      var item = byId[id];
      if (!host || !item || !ML.mount) return;
      host.classList.add('demo-host');
      if (h) host.style.setProperty('--h', h);
      var inst = ML.mount(item, host, { pin: true });
      if (inst && 'IntersectionObserver' in window) {
        new IntersectionObserver(function (es) {
          inst.setVisible(!!(es[0] && es[0].isIntersecting));
        }, { rootMargin: '80px 0px' }).observe(host);
      }
      return inst;
    }

    /* 1 — pinned live background: a real collection effect (bgauro-0) */
      var bg = window.matchMedia('(max-width: 900px)').matches ? null : document.getElementById('heroBg');
    var bgEl = document.getElementById('heroBg');
    if (!bg && bgEl) { bgEl.remove(); }
    var aurora = byId['bgauro-0'] || byId['bgnb-0'];
    if (bg && aurora && ML.mount) {
      bg.style.setProperty('--h', '100%');
      bg.classList.add('demo-host');
      var inst = ML.mount(aurora, bg, { pin: true });
      requestAnimationFrame(function () {
        if (bg.shadowRoot) {
          var w = bg.shadowRoot.querySelector('.demo-root');
          if (w) { w.style.height = '100%'; w.style.placeItems = 'stretch'; }
        }
      });
      if (inst && 'IntersectionObserver' in window) {
        new IntersectionObserver(function (es) {
          inst.setVisible(!!(es[0] && es[0].isIntersecting));
        }, { rootMargin: '80px 0px' }).observe(bg);
      }
    }

    /* 2 — marquee band: the collection's own family words */
    var A = ['LOADERS', 'BUTTONS', 'TEXT FX', 'CARDS & HOVER', 'BACKGROUNDS', 'CONTROLS', 'SVG & LINES', '3D SCENES', 'INTERACTION'];
    var B = ['MEGA CUBES', 'ISOMETRIC TOWERS', 'AURORA VEILS', 'HUD COCKPIT', 'SOLAR SYSTEM', 'SPLIT-HINGE PRESS', 'CRT SCAN', 'CONFETTI STORM', 'WARP TUNNEL', 'ROTARY DIALS', 'DNA HELIX', 'KANBAN BOARD'];
    function fill(id, words) {
      var el = document.getElementById(id);
      if (!el || !el.firstChild) return;
      var set = words.map(function (w) { return '<b>' + w + '</b><i>✦</i>'; }).join('');
      el.firstChild.innerHTML = set + set;
    }
    fill('bandA', A);
    fill('bandB', B);

    /* 3 — live collection effects in How / AE / outro */
    mountChrome('ring-spinner', 'howLive0');
    mountChrome('btn-neon', 'howLive1');
    mountChrome('d3meca-0', 'howLive2', '100%');
    mountChrome('d3towr-0', 'aeLive', '100%');
    mountChrome('atom-loader', 'outroLive0');
    mountChrome('equalizer', 'outroLive1');
    mountChrome('conic-spinner', 'outroLive2');
    mountChrome('heartbeat', 'outroLive3');
  });
})();
