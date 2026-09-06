/* ============================================================
   Motion Lab — variation kit (shared by the 400-per-category generators)
   ----------------------------------------------------------
   The four deep categories (Data, Nature, Retro, Transitions) are built as
   MECHANIC × VARIANT matrices. A mechanic owns the markup and the keyframes;
   a variant changes counts, palette, easing, direction, geometry and rhythm,
   so no two cards share a motion curve *and* a layout.

   Every builder keeps the house rule: read custom properties with a fallback,
   never declare them, so the Tune panel always wins.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit;

  /* 20 palettes — each variant index maps to a different colour triad */
  var PALETTES = [
    ['#7c5cff', '#22d3ee', '#ff5c8a'],
    ['#22d3ee', '#34d399', '#7c5cff'],
    ['#ff9d5c', '#ffd479', '#ff5c8a'],
    ['#34d399', '#7ee787', '#22d3ee'],
    ['#f472b6', '#a855f7', '#60a5fa'],
    ['#60a5fa', '#7c5cff', '#e879f9'],
    ['#ffd479', '#ff9d5c', '#34d399'],
    ['#e879f9', '#f472b6', '#22d3ee'],
    ['#7ee787', '#ffd479', '#60a5fa'],
    ['#fca5a5', '#ff9d5c', '#a855f7'],
    ['#a855f7', '#60a5fa', '#7ee787'],
    ['#22d3ee', '#e879f9', '#ffd479'],
    ['#ff5c8a', '#7c5cff', '#34d399'],
    ['#60a5fa', '#22d3ee', '#f472b6'],
    ['#7c5cff', '#ffd479', '#7ee787'],
    ['#34d399', '#60a5fa', '#ff9d5c'],
    ['#f472b6', '#ffd479', '#22d3ee'],
    ['#a855f7', '#ff5c8a', '#7ee787'],
    ['#7ee787', '#22d3ee', '#e879f9'],
    ['#ffd479', '#7c5cff', '#fca5a5']
  ];

  var EASES = [
    'cubic-bezier(.2,.8,.2,1)', 'ease-in-out', 'cubic-bezier(.6,0,.35,1)',
    'cubic-bezier(.3,.7,.3,1.4)', 'linear', 'cubic-bezier(.5,.05,.3,1)',
    'cubic-bezier(.16,1,.3,1)', 'cubic-bezier(.7,0,.2,1)',
    'cubic-bezier(.34,1.56,.64,1)', 'cubic-bezier(.45,0,.55,1)',
    'steps(9,end)', 'cubic-bezier(.22,.61,.36,1)'
  ];

  /* the variant label vocabulary — keeps every generated title unique */
  var LABELS = [
    'Aurora', 'Ember', 'Cobalt', 'Verdant', 'Orchid', 'Azure', 'Amber', 'Fuchsia',
    'Lime', 'Coral', 'Violet', 'Cyan', 'Rose', 'Sapphire', 'Gold', 'Mint',
    'Blossom', 'Magenta', 'Jade', 'Sunbeam', 'Cinder', 'Frost', 'Dusk', 'Nova',
    'Slate', 'Peach', 'Ion', 'Prism', 'Halo', 'Quartz', 'Vapor', 'Onyx'
  ];

  /* deterministic per (mechanic, index) variant descriptor */
  function variant(seed, i) {
    var rnd = K.rng((seed * 7919 + i * 104729) >>> 0);
    var pal = PALETTES[(seed * 3 + i * 5) % PALETTES.length];
    var ease = EASES[(seed + i * 3) % EASES.length];
    return {
      i: i,
      label: LABELS[i % LABELS.length],
      c1: pal[0], c2: pal[1], c3: pal[2],
      ease: ease,
      dir: i % 2 ? 'reverse' : 'normal',
      dur: Math.round((1.1 + (i % 7) * .38 + rnd() * .5) * 100) / 100,
      step: Math.round((.04 + (i % 5) * .022) * 1000) / 1000,
      n: 5 + (i % 9),
      big: i % 6 === 0,
      round: [4, 8, 12, 999, 2, 18][i % 6],
      rnd: rnd
    };
  }

  /* a mechanic emits { html, css, js?, cfg?, tags? } from a variant */
  function matrix(cat, mechanics, count, prefix) {
    var pool = [];
    mechanics.forEach(function (m, mi) {
      var per = m.count || count;
      for (var i = 0; i < per; i++) {
        var v = variant(mi + 1, i);
        var built = m.build(v, i);
        if (!built) continue;
        pool.push({
          family: cat + ':' + m.key,
          id: prefix + '-' + m.key + '-' + i,
          title: (m.title || m.key) + ' — ' + v.label + (i >= LABELS.length ? ' ' + (i + 1) : ''),
          tags: ['css', m.key].concat(m.tags || [], built.tags || []),
          html: built.html,
          css: built.css,
          js: built.js,
          cfg: built.cfg
        });
      }
    });
    return pool;
  }

  global.MLVary = {
    PALETTES: PALETTES, EASES: EASES, LABELS: LABELS,
    variant: variant, matrix: matrix
  };
})(window);
