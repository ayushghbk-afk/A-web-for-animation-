/* ============================================================
   Motion Lab — hero, animated by the collection itself
   Mounts a pinned, live "Aurora Veils" background from the
   backgrounds family behind the hero, and fills the marquee
   band with real family names from the collection.
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

    /* 1 — pinned live background: a real collection effect (bgauro-0) */
    var bg = document.getElementById('heroBg');
    var aurora = byId['bgauro-0'] || byId['bgnb-0'];
    if (bg && aurora && ML.mount) {
      bg.style.setProperty('--h', '100%');
      var inst = ML.mount(aurora, bg, { pin: true });
      /* the shadow demo-root is auto-height; give it a definite box so the
         100% height of the background demo resolves */
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
    var B = ['MEGA CUBES', 'ISOMETRIC TOWERS', 'AURORA VEILS', 'CYBER RAIN', 'SPLIT-HINGE PRESS', 'CRT SCAN', 'CONFETTI STORM', 'WARP TUNNEL', 'ROTARY DIALS', 'ODOMETERS', 'DNA HELIX', 'FLIP GRIDS'];
    function fill(id, words) {
      var el = document.getElementById(id);
      if (!el) return;
      var set = words.map(function (w) { return '<b>' + w + '</b><i>✦</i>'; }).join('');
      el.firstChild.innerHTML = set + set;
    }
    fill('bandA', A);
    fill('bandB', B);
  });
})();
