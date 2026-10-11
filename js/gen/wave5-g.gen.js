/* ============================================================
   Motion Lab — wave 5, SVG (the 1,000-effect expansion)
   21 new mechanic families × 24 variants = 504 candidates.
   Every mechanic is a distinct vector-drawing behavior new to
   the collection; variants differ in geometry, rhythm, easing
   and palette. House rule: custom properties are only ever
   read with a fallback, never declared in demo CSS.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit, V = global.MLVary;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color;

  function D(v, mul) { return Math.round(v.dur * (mul || 1) * 100) / 100; }
  function core(v, extra) {
    return [
      range('Cycle', '--dur', .2, 20, .05, D(v, 1), 's'),
      range('Stagger', '--step', 0, .6, .01, v.step, 's'),
      col('Ink A', '--c1', v.c1),
      col('Ink B', '--c2', v.c2),
      col('Ink C', '--c3', v.c3)
    ].concat(extra || []);
  }
  function stageCss(v) {
    return '.sv5{position:relative;width:100%;display:flex;align-items:center;justify-content:center;padding:10px;background:radial-gradient(ellipse at 50% 60%,color-mix(in srgb,var(--c3,' + v.c3 + ') 10%,transparent),transparent 70%)}.sv5 svg{width:min(100%,340px);height:auto;display:block}';
  }
  function svgOpen(cls) { return '<svg class="' + cls + '" viewBox="0 0 200 120" fill="none">'; }

  var M = [];

  /* 1. blob morph — two blobs breathe and crossfade, spinning opposite */
  M.push({ key: 'blobmorph', title: 'Blob Morph', tags: ['svg', 'organic'], build: function (v) {
    var d = D(v, 2.8);
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none"><g class="b1"><path d="M100 30 C132 24 158 48 150 74 C143 98 108 106 84 94 C60 82 52 56 68 42 C80 32 90 33 100 30 Z"/></g><g class="b2"><path d="M100 26 C140 30 156 60 142 84 C128 108 84 108 66 86 C48 64 60 38 86 32 C92 30 96 26 100 26 Z"/></g></svg></div>',
      css: join([
        stageCss(v),
        '.b1 path,.b2 path{stroke:var(--c1,' + v.c1 + ');stroke-width:2.5;fill:color-mix(in srgb,var(--c1,' + v.c1 + ') 12%,transparent)}',
        '.b1{transform-origin:100px 66px;animation:bm-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.b2{transform-origin:100px 66px;opacity:.55;animation:bm-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.b2 path{stroke:var(--c2,' + v.c2 + ')}',
        kf('bm-a' + v.i, '0%,100%{transform:rotate(0) scale(1)}50%{transform:rotate(160deg) scale(.92)}'),
        kf('bm-b' + v.i, '0%,100%{transform:rotate(0) scale(.94);opacity:.5}50%{transform:rotate(-150deg) scale(1.05);opacity:.12}')
      ]),
      cfg: core(v)
    };
  } });

  /* 2. lissajous — a bead rides the figure from two offset sine laws */
  M.push({ key: 'lissajous', title: 'Lissajous Bead', tags: ['svg', 'math'], build: function (v) {
    var d = D(v, 3);
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none"><path class="fig" d="M100 60 C160 10 160 110 100 60 C40 10 40 110 100 60"/><g class="ox"><g class="oy"><circle cx="0" cy="0" r="4"/></g></g></svg></div>',
      css: join([
        stageCss(v),
        '.fig{stroke:color-mix(in srgb,var(--c1,' + v.c1 + ') 40%,transparent);stroke-width:1.5}',
        '.ox circle{fill:var(--c2,' + v.c2 + ');filter:drop-shadow(0 0 6px var(--c2,' + v.c2 + '))}',
        '.ox{animation:lj-x' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite alternate}',
        '.oy{animation:lj-y' + v.i + ' calc(var(--dur,' + d + 's)/2) ease-in-out infinite alternate}',
        kf('lj-x' + v.i, 'from{transform:translateX(40px)}to{transform:translateX(160px)}'),
        kf('lj-y' + v.i, 'from{transform:translateY(20px)}to{transform:translateY(100px)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 3. rose curve — petals open around the center and the bloom rotates */
  M.push({ key: 'rosecurve', title: 'Rose Curve', tags: ['svg', 'math'], build: function (v) {
    var d = D(v, 4), petals = '';
    for (var i = 0; i < 6; i++) petals += '<ellipse class="pt" style="--i:' + i + '" cx="100" cy="38" rx="9" ry="22" transform="rotate(' + (i * 60) + ' 100 60)"/>';
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none"><g class="rs">' + petals + '<circle class="cst" cx="100" cy="60" r="6"/></g></svg></div>',
      css: join([
        stageCss(v),
        '.rs{transform-origin:100px 60px;animation:rc-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.pt{fill:color-mix(in srgb,var(--c1,' + v.c1 + ') 30%,transparent);stroke:var(--c1,' + v.c1 + ');stroke-width:1.5;transform-origin:100px 60px;animation:rc-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -6)}',
        '.cst{transform-box:fill-box;transform-origin:center;fill:var(--c3,' + v.c3 + ');animation:rc-c' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('rc-a' + v.i, 'to{transform:rotate(1turn)}'),
        kf('rc-b' + v.i, '0%,100%{transform:rotate(0) scale(.35)}50%{transform:rotate(0) scale(1)}'),
        kf('rc-c' + v.i, '0%,100%{transform:scale(1)}50%{transform:scale(1.6)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 4. phyllotaxis — the golden spiral seeds pop in with a travelling delay */
  M.push({ key: 'phyllotox', title: 'Phyllotaxis', tags: ['svg', 'math'], build: function (v) {
    var d = D(v, 3.2), dots = '';
    for (var i = 0; i < 28; i++) {
      var a = i * 2.39996, r = 3.4 * Math.sqrt(i);
      var x = (100 + r * Math.cos(a)).toFixed(1), y = (60 + r * Math.sin(a) * .95).toFixed(1);
      dots += '<circle class="sd" style="--i:' + i + '" cx="' + x + '" cy="' + y + '" r="' + (1.4 + i * .06).toFixed(1) + '"/>';
    }
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none">' + dots + '</svg></div>',
      css: join([
        stageCss(v),
        '.sd{transform-box:fill-box;transform-origin:center;fill:var(--c1,' + v.c1 + ');animation:ph-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -1)}',
        kf('ph-a' + v.i, '0%,100%{transform:scale(.4);opacity:.35}30%,70%{transform:scale(1);opacity:1}')
      ]),
      cfg: core(v)
    };
  } });

  /* 5. standing wave — a comb of bars swells from its nodal points */
  M.push({ key: 'standingwave', title: 'Standing Wave', tags: ['svg', 'wave'], build: function (v) {
    var d = D(v, 1.4), bars = '';
    for (var i = 0; i < 21; i++) bars += '<rect class="br" style="--i:' + i + '" x="' + (24 + i * 7.5) + '" y="30" width="3.4" height="60" rx="1.7"/>';
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none">' + bars + '</svg></div>',
      css: join([
        stageCss(v),
        '.br{transform-box:fill-box;transform-origin:center;fill:var(--c2,' + v.c2 + ');transform-origin:center 60px;animation:sw-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -21)}',
        kf('sw-a' + v.i, '0%,100%{transform:scaleY(.18)}50%{transform:scaleY(1)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 6. pulse net — nodes breathe while the links flash signal pulses */
  M.push({ key: 'pulsenet', title: 'Pulse Net', tags: ['svg', 'network'], build: function (v) {
    var d = D(v, 2.4);
    var pts = [[40, 30], [100, 22], [160, 34], [30, 84], [92, 68], [150, 88], [110, 100]];
    var links = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5], [4, 6], [5, 6], [1, 5]];
    var ls = '', ns = '';
    for (var i = 0; i < links.length; i++) ls += '<line class="lk" style="--i:' + i + '" x1="' + pts[links[i][0]][0] + '" y1="' + pts[links[i][0]][1] + '" x2="' + pts[links[i][1]][0] + '" y2="' + pts[links[i][1]][1] + '"/>';
    for (i = 0; i < pts.length; i++) ns += '<circle class="nd" style="--i:' + i + '" cx="' + pts[i][0] + '" cy="' + pts[i][1] + '" r="5"/>';
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none">' + ls + ns + '</svg></div>',
      css: join([
        stageCss(v),
        '.lk{stroke:color-mix(in srgb,var(--c1,' + v.c1 + ') 45%,transparent);stroke-width:1.4;stroke-dasharray:7 9;animation:pn-a' + v.i + ' var(--dur,' + d + 's) linear infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -10)}',
        '.nd{transform-box:fill-box;transform-origin:center;fill:var(--c2,' + v.c2 + ');animation:pn-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -7)}',
        kf('pn-a' + v.i, 'to{stroke-dashoffset:-64}'),
        kf('pn-b' + v.i, '0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.7);opacity:1;filter:drop-shadow(0 0 6px var(--c3,' + v.c3 + '))}')
      ]),
      cfg: core(v)
    };
  } });

  /* 7. orbit trail — a comet sweeps a wobble ring with its tail */
  M.push({ key: 'orbittrail', title: 'Orbit Trail', tags: ['svg', 'orbital'], build: function (v) {
    var d = D(v, 2.2);
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none"><circle class="orb" cx="100" cy="60" r="38" stroke-dasharray="4 7"/><g class="tail"><path d="M100 22 A38 38 0 0 1 128 32"/><circle cx="138" cy="34" r="4.5"/></g></svg></div>',
      css: join([
        stageCss(v),
        '.orb{stroke:color-mix(in srgb,var(--c1,' + v.c1 + ') 40%,transparent);stroke-width:1.5;animation:ot-a' + v.i + ' calc(var(--dur,' + d + 's) * 4) linear infinite}',
        '.tail{transform-origin:100px 60px;animation:ot-b' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.tail path{stroke:var(--c2,' + v.c2 + ');stroke-width:3;stroke-linecap:round}',
        '.tail circle{fill:var(--c3,' + v.c3 + ');filter:drop-shadow(0 0 8px var(--c3,' + v.c3 + '))}',
        kf('ot-a' + v.i, 'to{stroke-dashoffset:-88}'),
        kf('ot-b' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 8. path ride — a little vehicle follows the loop and bobs on it */
  M.push({ key: 'pathride', title: 'Path Rider', tags: ['svg', 'motion'], build: function (v) {
    var d = D(v, 3.4);
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none"><path class="trk" d="M30 84 C30 40 80 30 100 60 C120 90 170 80 170 44 C170 20 60 16 60 40 C60 58 86 70 100 88"/><g class="veh"><rect x="-7" y="-5" width="14" height="10" rx="3"/><circle cx="-4" cy="6" r="2.6"/><circle cx="4" cy="6" r="2.6"/></g></svg></div>',
      css: join([
        stageCss(v),
        '.trk{stroke:color-mix(in srgb,var(--c1,' + v.c1 + ') 50%,transparent);stroke-width:2;stroke-dasharray:2 6;stroke-linecap:round;animation:pr-a' + v.i + ' calc(var(--dur,' + d + 's) * 3) linear infinite}',
        '.veh rect{fill:var(--c2,' + v.c2 + ')}',
        '.veh circle{fill:rgba(20,20,32,.9)}',
        '.veh{animation:pr-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite alternate,pr-c' + v.i + ' calc(var(--dur,' + d + 's)/6) ease-in-out infinite}',
        kf('pr-a' + v.i, 'to{stroke-dashoffset:-32}'),
        kf('pr-b' + v.i, '0%{transform:translate(30px,84px)}25%{transform:translate(100px,60px)}50%{transform:translate(170px,44px)}75%{transform:translate(60px,40px)}100%{transform:translate(100px,88px)}'),
        kf('pr-c' + v.i, '0%,100%{margin-top:0}50%{margin-top:-2px}')
      ]),
      cfg: core(v)
    };
  } });

  /* 9. dash dance — three dashed rings chase each other */
  M.push({ key: 'dashdance', title: 'Dash Dance', tags: ['svg', 'ring'], build: function (v) {
    var d = D(v, 3);
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none"><circle class="r1" cx="100" cy="60" r="44"/><circle class="r2" cx="100" cy="60" r="32"/><circle class="r3" cx="100" cy="60" r="20"/></svg></div>',
      css: join([
        stageCss(v),
        '.r1{stroke:var(--c1,' + v.c1 + ');stroke-width:2.5;stroke-dasharray:16 10;animation:dd-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.r2{stroke:var(--c2,' + v.c2 + ');stroke-width:2.5;stroke-dasharray:10 8;animation:dd-b' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.r3{stroke:var(--c3,' + v.c3 + ');stroke-width:2.5;stroke-dasharray:6 6;animation:dd-c' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('dd-a' + v.i, 'to{stroke-dashoffset:-260}'),
        kf('dd-b' + v.i, 'to{stroke-dashoffset:200}'),
        kf('dd-c' + v.i, 'to{stroke-dashoffset:-126}')
      ]),
      cfg: core(v)
    };
  } });

  /* 10. side morph — the plate walks square to circle to diamond */
  M.push({ key: 'sidemorph', title: 'Side Morph', tags: ['svg', 'morph'], build: function (v) {
    var d = D(v, 3.2);
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none"><rect class="m1" x="72" y="32" width="56" height="56" rx="0"/><circle class="m2" cx="100" cy="60" r="30"/><rect class="m3" x="79" y="39" width="42" height="42" rx="4"/></svg></div>',
      css: join([
        stageCss(v),
        '.m1,.m3{fill:color-mix(in srgb,var(--c1,' + v.c1 + ') 26%,transparent);stroke:var(--c1,' + v.c1 + ');stroke-width:2.5}',
        '.m2{fill:color-mix(in srgb,var(--c2,' + v.c2 + ') 26%,transparent);stroke:var(--c2,' + v.c2 + ');stroke-width:2.5}',
        '.m1{animation:sm-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.m2{animation:sm-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.m3{animation:sm-c' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('sm-a' + v.i, '0%,28%{opacity:1;transform:rotate(0) scale(1)}36%,60%{opacity:0;transform:rotate(45deg) scale(.2)}100%{opacity:0;transform:rotate(90deg) scale(.2)}'),
        kf('sm-b' + v.i, '0%,30%{opacity:0;transform:scale(.4)}40%,58%{opacity:1;transform:scale(1)}66%,100%{opacity:0;transform:scale(.4)}'),
        kf('sm-c' + v.i, '0%,60%{opacity:0;transform:rotate(0) scale(.2)}70%,94%{opacity:1;transform:rotate(45deg) scale(1)}100%{opacity:0;transform:rotate(90deg) scale(.2)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 11. wave field — a dot lattice ripples out from the center */
  M.push({ key: 'wavefield', title: 'Wave Field', tags: ['svg', 'lattice'], build: function (v) {
    var d = D(v, 2.6), dots = '', i = 0;
    for (var gx = 0; gx < 9; gx++) for (var gy = 0; gy < 6; gy++) {
      var x = 20 + gx * 20, y = 16 + gy * 19;
      var dist = Math.sqrt(Math.pow((x - 100) / 90, 2) + Math.pow((y - 60) / 52, 2));
      dots += '<circle class="wf" style="--i:' + i + ';--dl:' + (dist * 10).toFixed(1) + '" cx="' + x + '" cy="' + y + '" r="3.2"/>';
      i++;
    }
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none">' + dots + '</svg></div>',
      css: join([
        stageCss(v),
        '.wf{transform-box:fill-box;transform-origin:center;fill:var(--c1,' + v.c1 + ');animation:wf-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--dl) * var(--step,' + v.step + 's) * -.35)}',
        kf('wf-a' + v.i, '0%,100%{transform:scale(.5);opacity:.4}50%{transform:scale(1.5);opacity:1;fill:var(--c3,' + v.c3 + ')}')
      ]),
      cfg: core(v)
    };
  } });

  /* 12. counter reticle — the crosshair arcs counter-rotate around the target */
  M.push({ key: 'counterreticle', title: 'Counter Reticle', tags: ['svg', 'reticle'], build: function (v) {
    var d = D(v, 3.6);
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none"><g class="ra"><path d="M100 14 A46 46 0 0 1 146 60"/></g><g class="rb"><path d="M100 106 A46 46 0 0 1 54 60"/></g><g class="rc"><path d="M62 60 A38 38 0 0 1 100 22"/><path d="M138 60 A38 38 0 0 1 100 98"/></g><circle class="tgt" cx="100" cy="60" r="4"/><line x1="100" y1="40" x2="100" y2="50"/><line x1="100" y1="70" x2="100" y2="80"/><line x1="80" y1="60" x2="90" y2="60"/><line x1="110" y1="60" x2="120" y2="60"/></svg></div>',
      css: join([
        stageCss(v),
        '.ra,.rb,.rc{transform-origin:100px 60px}',
        '.ra path,.rb path{stroke:var(--c1,' + v.c1 + ');stroke-width:3;stroke-linecap:round}',
        '.rc path{stroke:var(--c2,' + v.c2 + ');stroke-width:2;stroke-linecap:round}',
        '.ra{animation:cr-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.rb{animation:cr-b' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.rc{animation:cr-c' + v.i + ' calc(var(--dur,' + d + 's)/2) linear infinite}',
        '.tgt{transform-box:fill-box;transform-origin:center;fill:var(--c3,' + v.c3 + ');animation:cr-d' + v.i + ' calc(var(--dur,' + d + 's)/4) ease-in-out infinite}',
        'line{stroke:var(--c3,' + v.c3 + ');stroke-width:2;stroke-linecap:round}',
        kf('cr-a' + v.i, 'to{transform:rotate(1turn)}'),
        kf('cr-b' + v.i, 'to{transform:rotate(-1turn)}'),
        kf('cr-c' + v.i, 'to{transform:rotate(1turn)}'),
        kf('cr-d' + v.i, '0%,100%{transform:scale(1)}50%{transform:scale(1.8)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 13. star morph — star becomes diamond becomes cross in sequence */
  M.push({ key: 'starmorph', title: 'Star Morph', tags: ['svg', 'morph'], build: function (v) {
    var d = D(v, 3.6);
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none"><path class="st1" d="M100 26 L109 51 L136 51 L114 67 L122 93 L100 77 L78 93 L86 67 L64 51 L91 51 Z"/><path class="st2" d="M100 30 L130 60 L100 90 L70 60 Z"/><g class="st3"><rect x="96" y="30" width="8" height="60" rx="3"/><rect x="70" y="56" width="60" height="8" rx="3"/></g></svg></div>',
      css: join([
        stageCss(v),
        '.st1,.st2,.st3 rect{fill:color-mix(in srgb,var(--c1,' + v.c1 + ') 30%,transparent);stroke:var(--c1,' + v.c1 + ');stroke-width:2}',
        '.st2{stroke:var(--c2,' + v.c2 + ');fill:color-mix(in srgb,var(--c2,' + v.c2 + ') 30%,transparent)}',
        '.st3 rect{stroke:var(--c3,' + v.c3 + ');fill:color-mix(in srgb,var(--c3,' + v.c3 + ') 30%,transparent)}',
        '.st1,.st2,.st3{transform-origin:100px 60px}',
        '.st1{animation:smo-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.st2{animation:smo-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.st3{animation:smo-c' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('smo-a' + v.i, '0%,26%{opacity:1;transform:rotate(0) scale(1)}34%,72%{opacity:0;transform:rotate(90deg) scale(.1)}80%,100%{opacity:0;transform:rotate(180deg) scale(.1)}'),
        kf('smo-b' + v.i, '0%,30%{opacity:0;transform:rotate(-45deg) scale(.1)}40%,62%{opacity:1;transform:rotate(0) scale(1)}70%,100%{opacity:0;transform:rotate(45deg) scale(.1)}'),
        kf('smo-c' + v.i, '0%,64%{opacity:0;transform:rotate(0) scale(.1)}74%,96%{opacity:1;transform:rotate(90deg) scale(1)}100%{opacity:0;transform:rotate(180deg) scale(.1)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 14. draw sequence — the spiral draws itself, segment by segment */
  M.push({ key: 'drawseq', title: 'Draw Sequence', tags: ['svg', 'draw'], build: function (v) {
    var d = D(v, 3.2);
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none"><path class="d1" d="M100 60 C104 54 112 56 112 64 C112 76 96 78 88 68 C78 54 98 40 116 48 C138 58 132 88 104 90 C70 92 56 56 82 36"/><path class="d2" d="M100 60 C98 66 92 66 92 60 C92 52 104 50 110 58"/></svg></div>',
      css: join([
        stageCss(v),
        '.d1{stroke:var(--c1,' + v.c1 + ');stroke-width:2.5;stroke-linecap:round;stroke-dasharray:420;stroke-dashoffset:420;animation:ds-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.d2{stroke:var(--c2,' + v.c2 + ');stroke-width:2.5;stroke-linecap:round;stroke-dasharray:90;stroke-dashoffset:90;animation:ds-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('ds-a' + v.i, '0%{stroke-dashoffset:420;opacity:1}45%{stroke-dashoffset:0}70%{stroke-dashoffset:0;opacity:1}92%,100%{stroke-dashoffset:0;opacity:0}'),
        kf('ds-b' + v.i, '0%,30%{stroke-dashoffset:90;opacity:0}55%{stroke-dashoffset:0;opacity:1}70%{stroke-dashoffset:0;opacity:1}92%,100%{stroke-dashoffset:0;opacity:0}')
      ]),
      cfg: core(v)
    };
  } });

  /* 15. flow dots — the beads stream along an S-curve via motion paths */
  M.push({ key: 'flowdots', title: 'Flow Dots', tags: ['svg', 'flow'], build: function (v) {
    var d = D(v, 3.4), lanes = '';
    for (var l = 0; l < 3; l++) {
      var dy = l * 16;
      var dots = '';
      for (var i = 0; i < 6; i++) dots += '<circle class="fd" style="--i:' + i + '" cx="0" cy="0" r="3"/>';
      lanes += '<g class="ln" style="--l:' + l + '">' + dots + '</g>';
    }
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none"><path class="gl" d="M10 30 C70 30 70 60 130 60 C170 60 185 44 192 40" opacity=".25"/>' + lanes + '</svg></div>',
      css: join([
        stageCss(v),
        '.gl{stroke:var(--c3,' + v.c3 + ');stroke-width:1.5;stroke-dasharray:3 6}',
        '.ln{animation:fd-a' + v.i + ' var(--dur,' + d + 's) linear infinite;animation-delay:calc(var(--l) * var(--dur,' + d + 's) / -6)}',
        '.fd{fill:var(--c1,' + v.c1 + ');offset-path:path("M10 30 C70 30 70 60 130 60 C170 60 185 44 192 40");offset-rotate:0deg;animation:fd-b' + v.i + ' var(--dur,' + d + 's) linear infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -6)}',
        '.ln{transform:translateY(calc(var(--l) * 16px))}',
        kf('fd-a' + v.i, 'from{opacity:0}8%,92%{opacity:1}100%{opacity:0}'),
        kf('fd-b' + v.i, 'from{offset-distance:0%}to{offset-distance:100%}')
      ]),
      cfg: core(v)
    };
  } });

  /* 16. phase trio — three bars a third wave apart, like a 3-phase grid */
  M.push({ key: 'phasetrio', title: 'Phase Trio', tags: ['svg', 'wave'], build: function (v) {
    var d = D(v, 1.8), bars = '';
    for (var i = 0; i < 15; i++) {
      var ph = i % 3;
      bars += '<rect class="pt" style="--i:' + i + ';--ph:' + ph + '" x="' + (30 + i * 9.4) + '" y="34" width="4" height="52" rx="2"/>';
    }
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none">' + bars + '</svg></div>',
      css: join([
        stageCss(v),
        '.pt{transform-box:fill-box;transform-origin:center;animation:pt-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc((var(--i) / 15 + var(--ph) / 3) * var(--dur,' + d + 's) * -1)}',
        '.pt[style*="--ph:0"]{fill:var(--c1,' + v.c1 + ')}',
        '.pt[style*="--ph:1"]{fill:var(--c2,' + v.c2 + ')}',
        '.pt[style*="--ph:2"]{fill:var(--c3,' + v.c3 + ')}',
        kf('pt-a' + v.i, '0%,100%{transform:scaleY(.12)}50%{transform:scaleY(1)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 17. hex tide — hexagons counter-rotate while the core ebb and flows */
  M.push({ key: 'hextide', title: 'Hex Tide', tags: ['svg', 'geometry'], build: function (v) {
    var d = D(v, 4);
    function hex(r, rot) {
      var p = '';
      for (var i = 0; i < 6; i++) {
        var a = (rot + i * 60) * Math.PI / 180;
        p += (i ? 'L' : 'M') + (100 + r * Math.cos(a)).toFixed(1) + ' ' + (60 + r * Math.sin(a)).toFixed(1);
      }
      return p + 'Z';
    }
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none"><path class="hx1" d="' + hex(44, 0) + '"/><path class="hx2" d="' + hex(30, 30) + '"/><path class="hx3" d="' + hex(16, 0) + '"/></svg></div>',
      css: join([
        stageCss(v),
        '.hx1{stroke:var(--c1,' + v.c1 + ');stroke-width:2.5;transform-origin:100px 60px;animation:ht-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.hx2{stroke:var(--c2,' + v.c2 + ');stroke-width:2.5;transform-origin:100px 60px;animation:ht-b' + v.i + ' calc(var(--dur,' + d + 's)/2) ease-in-out infinite}',
        '.hx3{stroke:var(--c3,' + v.c3 + ');stroke-width:2.5;fill:color-mix(in srgb,var(--c3,' + v.c3 + ') 22%,transparent);transform-origin:100px 60px;animation:ht-c' + v.i + ' calc(var(--dur,' + d + 's)/3) ease-in-out infinite}',
        kf('ht-a' + v.i, '0%,100%{transform:rotate(0) scale(1)}50%{transform:rotate(180deg) scale(.88)}'),
        kf('ht-b' + v.i, '0%,100%{transform:rotate(0) scale(1)}50%{transform:rotate(-180deg) scale(1.1)}'),
        kf('ht-c' + v.i, '0%,100%{transform:scale(1)}50%{transform:scale(.7) rotate(90deg)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 18. circle pack — packed circles breathe in a radial ripple */
  M.push({ key: 'circlepack', title: 'Circle Pack', tags: ['svg', 'packing'], build: function (v) {
    var d = D(v, 2.8), cs = '';
    var packs = [[100, 60, 26], [62, 44, 13], [140, 46, 15], [66, 84, 12], [138, 84, 13], [100, 30, 10], [100, 92, 11], [38, 64, 9], [164, 62, 9]];
    for (var i = 0; i < packs.length; i++) {
      var p = packs[i];
      var dist = Math.sqrt(Math.pow((p[0] - 100) / 70, 2) + Math.pow((p[1] - 60) / 46, 2));
      cs += '<circle class="cp" style="--dl:' + (dist * 8).toFixed(1) + '" cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '"/>';
    }
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none">' + cs + '</svg></div>',
      css: join([
        stageCss(v),
        '.cp{stroke:var(--c1,' + v.c1 + ');stroke-width:2;fill:color-mix(in srgb,var(--c2,' + v.c2 + ') 18%,transparent);transform-box:fill-box;transform-origin:center;animation:cp-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--dl) * var(--step,' + v.step + 's) * -.3)}',
        kf('cp-a' + v.i, '0%,100%{transform:scale(1)}50%{transform:scale(1.14);stroke:var(--c3,' + v.c3 + ')}')
      ]),
      cfg: core(v)
    };
  } });

  /* 19. maze solve — the route carves through the maze and holds, then resets */
  M.push({ key: 'mazesolve', title: 'Maze Solve', tags: ['svg', 'maze'], build: function (v) {
    var d = D(v, 4.2);
    var walls = '<path d="M20 20 H180 V100 H20 Z M40 20 V50 H70 M40 60 V40 H20 M60 100 V70 H90 M110 100 V80 H140 V100 M110 60 H90 V40 H110 M150 20 V50 M150 70 V100 M160 60 H180 M100 40 V20 M70 80 H60 V100 M120 60 V40 H135" stroke-width="2"/>';
    var route = '<path class="rt" d="M24 96 H56 V66 H78 V44 H104 V64 H124 V84 H152 V44 H172" stroke-width="3"/>';
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none"><g class="wl">' + walls + '</g>' + route + '</svg></div>',
      css: join([
        stageCss(v),
        '.wl path{stroke:color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent);stroke-linecap:round}',
        '.rt{stroke:var(--c2,' + v.c2 + ');stroke-linecap:round;stroke-dasharray:330;stroke-dashoffset:330;filter:drop-shadow(0 0 5px var(--c2,' + v.c2 + '));animation:ms-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('ms-a' + v.i, '0%{stroke-dashoffset:330;opacity:0}6%{opacity:1}42%{stroke-dashoffset:0;opacity:1}86%{stroke-dashoffset:0;opacity:1}96%,100%{stroke-dashoffset:0;opacity:0}')
      ]),
      cfg: core(v)
    };
  } });

  /* 20. galaxy lines — the spokes stream outward like a spiral galaxy */
  M.push({ key: 'galaxylines', title: 'Galaxy Lines', tags: ['svg', 'spiral'], build: function (v) {
    var d = D(v, 2.4), spokes = '';
    for (var i = 0; i < 14; i++) {
      spokes += '<line class="sp" style="--i:' + i + '" x1="100" y1="60" x2="100" y2="16" transform="rotate(' + (i * (360 / 14)).toFixed(1) + ' 100 60)"/>';
    }
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none"><g class="gy">' + spokes + '</g><circle class="gc" cx="100" cy="60" r="5"/></svg></div>',
      css: join([
        stageCss(v),
        '.gy{transform-origin:100px 60px;animation:gl-a' + v.i + ' calc(var(--dur,' + d + 's) * 6) linear infinite}',
        '.sp{stroke:var(--c1,' + v.c1 + ');stroke-width:2;stroke-linecap:round;stroke-dasharray:10 14;animation:gl-b' + v.i + ' var(--dur,' + d + 's) linear infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -14)}',
        '.gc{transform-box:fill-box;transform-origin:center;fill:var(--c3,' + v.c3 + ');filter:drop-shadow(0 0 8px var(--c3,' + v.c3 + '));animation:gl-c' + v.i + ' calc(var(--dur,' + d + 's)/3) ease-in-out infinite}',
        kf('gl-a' + v.i, 'to{transform:rotate(1turn)}'),
        kf('gl-b' + v.i, 'from{stroke-dashoffset:48}to{stroke-dashoffset:0}'),
        kf('gl-c' + v.i, '0%,100%{transform:scale(1)}50%{transform:scale(1.5)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 21. constellation — the stars wink while the lines draw between them */
  M.push({ key: 'consttwinkle', title: 'Constellation', tags: ['svg', 'stars'], build: function (v) {
    var d = D(v, 3.6);
    var pts = [[44, 34], [80, 26], [118, 40], [150, 30], [166, 66], [128, 84], [84, 92], [52, 70]];
    var stars = '', links = '';
    for (var i = 0; i < pts.length; i++) stars += '<circle class="st" style="--i:' + i + '" cx="' + pts[i][0] + '" cy="' + pts[i][1] + '" r="2.6"/>';
    for (i = 0; i < pts.length - 1; i++) links += '<line class="cl" style="--i:' + i + '" x1="' + pts[i][0] + '" y1="' + pts[i][1] + '" x2="' + pts[i + 1][0] + '" y2="' + pts[i + 1][1] + '"/>';
    return {
      html: '<div class="sv5"><svg viewBox="0 0 200 120" fill="none">' + links + stars + '</svg></div>',
      css: join([
        stageCss(v),
        '.cl{stroke:color-mix(in srgb,var(--c2,' + v.c2 + ') 60%,transparent);stroke-width:1.4;stroke-dasharray:60;stroke-dashoffset:60;animation:ct-a' + v.i + ' var(--dur,' + d + 's) linear infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -7)}',
        '.st{transform-box:fill-box;transform-origin:center;fill:var(--c3,' + v.c3 + ');animation:ct-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -2)}',
        kf('ct-a' + v.i, '0%,8%{stroke-dashoffset:60;opacity:0}18%,80%{stroke-dashoffset:0;opacity:1}90%,100%{stroke-dashoffset:0;opacity:0}'),
        kf('ct-b' + v.i, '0%,100%{transform:scale(1);opacity:.75}50%{transform:scale(2);opacity:1;filter:drop-shadow(0 0 5px var(--c3,' + v.c3 + '))}')
      ]),
      cfg: core(v)
    };
  } });

  K.add('svg', V.matrix('svg', M, 24, 'w5sv'));
})(window);
