/* ============================================================
   Motion Lab — inventory ("All" section)
   1. Maps every animation and UI element this site itself uses,
      section by section.
   2. Indexes the complete collection — all 1,800 effects, grouped
      by section, each linked straight into the live lab.
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
    function title(id) { var it = byId[id]; return it ? it.title : id; }

    /* ---------------- 1. what this site itself animates ---------------- */
    var SITE = [
      { sec: 'Hero', id: 'top', el: [
        { t: 'Aurora Veils A — live collection background', id: 'bgauro-0' },
        { t: 'Circuit Cube — live 3D showcase card', id: 'd3meca-0' },
        { t: 'Six live demo float cards (spinner, equalizer, atom orbit, conic, heartbeat, neon press)' },
        { t: 'Orbit rings, glow field, scroll cue, magnetic buttons, count-up stats' }
      ] },
      { sec: 'How it works', id: 'how', el: [
        { t: 'Staggered step reveals (per-step CSS delay)' }
      ] },
      { sec: 'Product bento', id: 'product', el: [
        { t: 'Nine bento tiles, each mounting a live demo of its family' },
        { t: 'Hover lift, count badges, icon glyphs' }
      ] },
      { sec: 'Filters', id: 'filters', el: [
        { t: 'Category chips with a sliding ink indicator' },
        { t: 'Kind chips: Original · Generated · CSS · JS · Interactive · 3D · SVG · Canvas · Big stage' }
      ] },
      { sec: 'Gallery', id: 'gallery', el: [
        { t: '1,800 shadow-DOM demo cards with infinite scroll + load-more' },
        { t: 'Tuner panel, favourites, deep links, copy & download' }
      ] },
      { sec: 'Inventory', id: 'inventory', el: [
        { t: 'This section — site map + full collection index' }
      ] },
      { sec: 'After Effects', id: 'after-effects', el: [
        { t: 'Workflow cards, 10-effect starter kit, all-1,800 bundle builders' }
      ] },
      { sec: 'Templates', id: 'templates', el: [
        { t: 'Two vendored full-page templates (3D galaxy, particle heart)' }
      ] },
      { sec: 'Chrome', id: 'top', el: [
        { t: 'Scroll progress bar, pointer glow, ⌘K command palette, theme toggle, mobile nav drawer, toasts' }
      ] }
    ];

    var siteBox = document.getElementById('invSite');
    if (siteBox) {
      SITE.forEach(function (row) {
        var card = document.createElement('article');
        card.className = 'inv-card';
        var h = document.createElement('h4');
        h.textContent = row.sec;
        card.appendChild(h);
        var ul = document.createElement('ul');
        row.el.forEach(function (e) {
          var li = document.createElement('li');
          if (e.id && byId[e.id]) {
            var a = document.createElement('a');
            a.href = '#' + e.id;
            a.textContent = e.t;
            li.appendChild(a);
          } else {
            li.textContent = e.t;
          }
          ul.appendChild(li);
        });
        card.appendChild(ul);
        siteBox.appendChild(card);
      });
    }

    /* ---------------- 2. the full collection index ---------------- */
    var CATS = [
      ['loaders', 'Loaders'], ['buttons', 'Buttons'], ['text', 'Text FX'],
      ['cards', 'Cards & Hover'], ['backgrounds', 'Backgrounds'], ['controls', 'Controls'],
      ['svg', 'SVG & Lines'], ['3d', '3D'], ['motion', 'Interaction']
    ];
    var catsBox = document.getElementById('invCats');
    if (catsBox) {
      CATS.forEach(function (c, ci) {
        var list = ML.byCat && ML.byCat[c[0]] ? ML.byCat[c[0]] : (ML.items || []).filter(function (it) { return it.cat === c[0]; });
        var d = document.createElement('details');
        d.className = 'inv-cat';
        if (ci === 0) d.open = true;
        var s = document.createElement('summary');
        s.innerHTML = '<b></b><small>' + list.length + ' effects</small>';
        s.querySelector('b').textContent = c[1];
        d.appendChild(s);
        var ol = document.createElement('div');
        ol.className = 'inv-list';
        list.forEach(function (it) {
          var a = document.createElement('a');
          a.href = '#' + it.id;
          a.textContent = it.title;
          if (ML.flags && ML.flags(it).big) a.className = 'big';
          ol.appendChild(a);
        });
        d.appendChild(ol);
        catsBox.appendChild(d);
      });
    }
  });
})();
