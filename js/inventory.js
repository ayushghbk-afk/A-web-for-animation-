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

    /* ---------------- 1. what this site itself animates ---------------- */
    var SITE = [
      { sec: 'Document chrome', id: 'top', el: [
        { t: 'Skip-to-collection link (focus reveal)' },
        { t: 'Scroll-progress bar at the top of the viewport' },
        { t: 'Pointer glow that tracks the cursor' },
        { t: 'Four drifting background orbs' },
        { t: 'Perspective grid overlay' },
        { t: 'Film-grain noise overlay' }
      ] },
      { sec: 'Header', id: 'siteHeader', el: [
        { t: 'Brand mark — spinning rings + orbiting dot' },
        { t: 'Sliding nav-ink under the active link' },
        { t: 'Product mega-menu (category grid + live counts)' },
        { t: 'Resources mega-menu (inventory, how, AE, catalog)' },
        { t: 'Search trigger with ⌘K hint' },
        { t: 'Tune / favourites / pause / theme icon buttons' },
        { t: 'Magnetic “Open the lab” CTA' },
        { t: 'Hamburger that morphs into an X' }
      ] },
      { sec: 'Hero', id: 'top', el: [
        { t: 'Aurora Veils — live collection background', id: 'bgauro-0' },
        { t: 'Circuit Cube — live 3D showcase card', id: 'd3meca-0' },
        { t: 'Red World — live 3D planet float card', id: 'd3plnt-0' },
        { t: 'Ring spinner float card', id: 'ring-spinner' },
        { t: 'Equalizer float card', id: 'equalizer' },
        { t: 'Atom loader float card', id: 'atom-loader' },
        { t: 'Conic spinner float card', id: 'conic-spinner' },
        { t: 'Neon press button float card', id: 'btn-neon' },
        { t: 'Orbit rings, glow field, scroll cue' },
        { t: 'Gradient hero title + live pulse dot' },
        { t: 'Magnetic Browse / Surprise CTAs' },
        { t: 'Count-up stats (effects, categories, tuner %)' }
      ] },
      { sec: 'Marquee band', id: 'top', el: [
        { t: 'Dual opposing marquees of family names (Kinetic Word Wall mechanic)' }
      ] },
      { sec: 'How it works', id: 'how', el: [
        { t: 'Staggered step reveals (per-step CSS delay)' },
        { t: 'Live ring spinner on step 01', id: 'ring-spinner' },
        { t: 'Live neon press on step 02', id: 'btn-neon' },
        { t: 'Live circuit cube on step 03', id: 'd3meca-0' }
      ] },
      { sec: 'Product bento', id: 'product', el: [
        { t: 'Nine bento tiles, each mounting a live demo of its family' },
        { t: '3D pointer-tilt on fine pointers (collection tilt-card mechanic)' },
        { t: 'Hover lift, count badges, icon glyphs' }
      ] },
      { sec: 'Filters', id: 'filters', el: [
        { t: 'Category chips with a sliding ink indicator' },
        { t: 'Kind chips: Original · Generated · CSS · JS · Interactive · 3D · SVG · Canvas · Big stage' }
      ] },
      { sec: 'Gallery', id: 'gallery', el: [
        { t: '1,800 shadow-DOM demo cards with infinite scroll + load-more' },
        { t: 'Pointer-follow spotlight on each card' },
        { t: 'Tuner panel, favourites, deep links, copy & download' },
        { t: 'After Effects builder button on every card' }
      ] },
      { sec: 'Inventory', id: 'inventory', el: [
        { t: 'Live thumbs of every collection effect mounted on this page' },
        { t: 'Section-by-section map of site chrome' },
        { t: 'Full 1,800-effect index, linked into the lab' }
      ] },
      { sec: 'After Effects', id: 'after-effects', el: [
        { t: 'Live isometric city stage', id: 'd3towr-0' },
        { t: 'Workflow cards, 10-effect starter kit, all-1,800 bundle builders' },
        { t: 'Format board (.aep / .aepx / .mogrt / .ffx)' }
      ] },
      { sec: 'Templates', id: 'templates', el: [
        { t: 'Two vendored full-page templates (3D galaxy, particle heart)' },
        { t: 'Sandboxed live iframes, launch overlay, source viewer' }
      ] },
      { sec: 'Outro', id: 'top', el: [
        { t: 'Live atom loader', id: 'atom-loader' },
        { t: 'Live equalizer', id: 'equalizer' },
        { t: 'Live conic spinner', id: 'conic-spinner' },
        { t: 'Live heartbeat', id: 'heartbeat' }
      ] },
      { sec: 'Overlays', id: 'top', el: [
        { t: '⌘K command palette with live result list' },
        { t: 'Mobile nav drawer' },
        { t: 'Code viewer modal with live preview' },
        { t: 'Customise drawer (tuner)' },
        { t: 'After Effects export dialog' },
        { t: 'Toast notifications' }
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
            a.href = '#effect/' + e.id;
            a.textContent = e.t;
            a.addEventListener('click', function (ev) {
              ev.preventDefault();
              if (ML.open) ML.open(e.id);
            });
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

    /* ---------------- live thumbs of collection effects on this page ---------------- */
    var LIVE = [
      ['bgauro-0', 'Hero aurora'],
      ['d3meca-0', 'Hero cube'],
      ['d3plnt-0', 'Hero planet'],
      ['ring-spinner', 'How · browse'],
      ['btn-neon', 'How · tune'],
      ['d3towr-0', 'AE city'],
      ['atom-loader', 'Outro'],
      ['equalizer', 'Outro'],
      ['conic-spinner', 'Outro'],
      ['heartbeat', 'Outro']
    ];
    var liveBox = document.getElementById('invLive');
    if (liveBox && ML.mount) {
      LIVE.forEach(function (row) {
        var item = byId[row[0]];
        if (!item) return;
        var thumb = document.createElement('a');
        thumb.className = 'inv-thumb';
        thumb.href = '#effect/' + row[0];
        thumb.title = item.title;
        var host = document.createElement('div');
        host.className = 'demo-host';
        host.style.setProperty('--h', '100%');
        thumb.appendChild(host);
        var cap = document.createElement('span');
        cap.textContent = row[1];
        thumb.appendChild(cap);
        thumb.addEventListener('click', function (ev) {
          ev.preventDefault();
          if (ML.open) ML.open(row[0]);
        });
        liveBox.appendChild(thumb);
        ML.mount(item, host, { pin: true });
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
          a.href = '#effect/' + it.id;
          a.textContent = it.title;
          if (ML.flags && ML.flags(it).big) a.className = 'big';
          a.addEventListener('click', function (ev) {
            ev.preventDefault();
            if (ML.open) ML.open(it.id);
          });
          ol.appendChild(a);
        });
        d.appendChild(ol);
        catsBox.appendChild(d);
      });
    }
  });
})();
