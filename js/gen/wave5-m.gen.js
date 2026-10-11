/* ============================================================
   Motion Lab — wave 5, TRANSITIONS (the 1,000-effect
   expansion)
   21 new mechanic families × 24 variants = 504 candidates.
   Every mechanic is a distinct screen-wipe behavior new to
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
      col('Screen A', '--c1', v.c1),
      col('Screen B', '--c2', v.c2),
      col('Wipe', '--c3', v.c3)
    ].concat(extra || []);
  }
  function stageCss(v) {
    return '.tx5{position:relative;width:100%;display:flex;align-items:center;justify-content:center;padding:10px}.tx5 .stg{position:relative;width:var(--w,230px);height:130px;border-radius:10px;overflow:hidden;box-shadow:0 16px 34px -18px rgba(0,0,0,.9);background:#0a0a12}.tx5 .old,.tx5 .new{position:absolute;inset:0;display:grid;place-items:center;font:800 34px ui-monospace,monospace;letter-spacing:.08em}.tx5 .old{background:linear-gradient(160deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 34%,#10101a),#10101a);color:color-mix(in srgb,var(--c1,' + v.c1 + ') 80%,#fff)}.tx5 .new{background:linear-gradient(160deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,#10101a),#10101a);color:color-mix(in srgb,var(--c2,' + v.c2 + ') 80%,#fff)}';
  }
  function stg(v, cls, inner) {
    return '<div class="stg ' + (cls || '') + '"><div class="new">B</div><div class="old">A</div>' + (inner || '') + '</div>';
  }

  var M = [];

  /* 1. diamond wipe — the diamond grows from the center */
  M.push({ key: 'diamondwipe', title: 'Diamond Wipe', tags: ['transition', 'wipe'], build: function (v) {
    var d = D(v, 1.8);
    return {
      html: '<div class="tx5">' + stg(v, '', '<i class="wip"></i>') + '</div>',
      css: join([
        stageCss(v),
        '.old{z-index:1}',
        '.wip{position:absolute;inset:0;z-index:2;background:linear-gradient(160deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,#10101a),#10101a);clip-path:polygon(50% 50%,50% 50%,50% 50%,50% 50%);animation:dw-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite alternate}',
        kf('dw-a' + v.i, '0%{clip-path:polygon(50% 50%,50% 50%,50% 50%,50% 50%)}100%{clip-path:polygon(50% -80%,180% 50%,50% 180%,-80% 50%)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 2. star wipe — the star bloom covers the screen */
  M.push({ key: 'starwipe', title: 'Star Wipe', tags: ['transition', 'wipe'], build: function (v) {
    var d = D(v, 2);
    var star0 = '50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%';
    var star1 = '50% -30%,57% 33%,93% 17%,67% 50%,93% 83%,57% 67%,50% 130%,43% 67%,7% 83%,33% 50%';
    return {
      html: '<div class="tx5">' + stg(v, '', '<i class="wip"></i>') + '</div>',
      css: join([
        stageCss(v),
        '.old{z-index:1}',
        '.wip{position:absolute;inset:0;z-index:2;background:linear-gradient(160deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,#10101a),#10101a);clip-path:polygon(' + star0 + ');animation:sw-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite alternate}',
        kf('sw-a' + v.i, '0%{clip-path:polygon(' + star0 + ');transform:rotate(0)}100%{clip-path:polygon(' + star1 + ');transform:rotate(18deg)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 3. hex wipe — the hexagon scales over the frame */
  M.push({ key: 'hexwipe', title: 'Hex Wipe', tags: ['transition', 'wipe'], build: function (v) {
    var d = D(v, 1.9);
    return {
      html: '<div class="tx5">' + stg(v, '', '<i class="wip"></i>') + '</div>',
      css: join([
        stageCss(v),
        '.old{z-index:1}',
        '.wip{position:absolute;inset:0;z-index:2;background:linear-gradient(160deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,#10101a),#10101a);clip-path:polygon(50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%);animation:hx-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite alternate}',
        kf('hx-a' + v.i, '0%{clip-path:polygon(50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%)}100%{clip-path:polygon(50% -70%,145% 5%,145% 95%,50% 170%,-45% 95%,-45% 5%)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 4. clock wipe — the half-disc sweeps the frame like a clock hand */
  M.push({ key: 'clockwipe', title: 'Clock Wipe', tags: ['transition', 'wipe'], build: function (v) {
    var d = D(v, 1.8);
    return {
      html: '<div class="tx5">' + stg(v, '', '<i class="wip"><b></b></i>') + '</div>',
      css: join([
        stageCss(v),
        '.old{z-index:1}',
        '.wip{position:absolute;left:50%;top:50%;width:340px;height:340px;margin:-170px;z-index:2;overflow:hidden;animation:ck-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite alternate}',
        '.wip b{position:absolute;inset:0;background:linear-gradient(90deg,transparent 0 50%,color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,#10101a) 50%)}',
        kf('ck-a' + v.i, 'from{transform:rotate(0)}to{transform:rotate(180deg)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 5. spiral open — the square quarters rotate and bloom */
  M.push({ key: 'spiraloopen', title: 'Spiral Open', tags: ['transition', 'wipe'], build: function (v) {
    var d = D(v, 2);
    return {
      html: '<div class="tx5">' + stg(v, '', '<i class="wip"></i>') + '</div>',
      css: join([
        stageCss(v),
        '.old{z-index:1}',
        '.wip{position:absolute;inset:0;z-index:2;background:linear-gradient(160deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,#10101a),#10101a);transform-origin:0 0;animation:so-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.6,0,.3,1) infinite alternate}',
        kf('so-a' + v.i, '0%{transform:rotate(-24deg) scale(.05);border-radius:0}55%{transform:rotate(0) scale(1.02);border-radius:0}100%{transform:rotate(0) scale(1.02);border-radius:14px}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 6. door swing — the panel swings open on its hinge */
  M.push({ key: 'doorswing', title: 'Door Swing', tags: ['transition', 'door'], build: function (v) {
    var d = D(v, 2.2);
    return {
      html: '<div class="tx5">' + stg(v, 'persp', '<i class="wip"><u>DOOR</u></i>') + '</div>',
      css: join([
        stageCss(v),
        '.stg.persp{perspective:700px;background:linear-gradient(160deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,#10101a),#10101a)}',
        '.new{display:none}',
        '.old{z-index:1}',
        '.wip{position:absolute;inset:0;z-index:2;background:linear-gradient(115deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 44%,#10101a) 0 46%,color-mix(in srgb,var(--c1,' + v.c1 + ') 30%,#10101a) 46% 54%,color-mix(in srgb,var(--c1,' + v.c1 + ') 44%,#10101a) 54%);transform-origin:0 50%;transform-style:preserve-3d;animation:ds-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite alternate}',
        '.wip u{position:absolute;right:8px;top:50%;width:5px;height:16px;margin-top:-8px;border-radius:3px;background:color-mix(in srgb,var(--c3,' + v.c3 + ') 80%,#fff)}',
        kf('ds-a' + v.i, '0%{transform:rotateY(0)}12%{transform:rotateY(-8deg)}88%,100%{transform:rotateY(-108deg)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 7. blind flip — the vertical slats flip over like a venetian blind */
  M.push({ key: 'blindflip', title: 'Blind Flip', tags: ['transition', 'slats'], build: function (v) {
    var d = D(v, 2.4), slats = '';
    for (var i = 0; i < 6; i++) slats += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="tx5">' + stg(v, 'persp', '<div class="bl">' + slats + '</div>') + '</div>',
      css: join([
        stageCss(v),
        '.stg.persp{perspective:600px;background:linear-gradient(160deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,#10101a),#10101a)}',
        '.new{display:none}',
        '.bl{position:absolute;inset:0;z-index:2;display:flex}',
        '.bl i{flex:1;transform-origin:50% 0;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 40%,#10101a),color-mix(in srgb,var(--c1,' + v.c1 + ') 24%,#10101a));border-right:1px solid rgba(0,0,0,.35);animation:bf-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -2.2)}',
        kf('bf-a' + v.i, '0%,18%{transform:rotateX(0)}55%,82%{transform:rotateX(178deg)}100%{transform:rotateX(360deg)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 8. wave wipe — the wave crest rolls across the frame */
  M.push({ key: 'wavewipe', title: 'Wave Wipe', tags: ['transition', 'wipe'], build: function (v) {
    var d = D(v, 2.2);
    return {
      html: '<div class="tx5">' + stg(v, '', '<svg class="wip" viewBox="0 0 230 130" preserveAspectRatio="none"><path d="M40 0 C10 20 34 46 8 66 C-14 84 22 108 -6 130 L230 130 L230 0 Z"/></svg>') + '</div>',
      css: join([
        stageCss(v),
        '.old{z-index:1}',
        '.wip{position:absolute;inset:0;width:100%;height:100%;z-index:2;fill:color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,#10101a);transform:translateX(-104%);animation:ww-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.55,.05,.35,1) infinite alternate}',
        kf('ww-a' + v.i, '0%{transform:translateX(-104%)}100%{transform:translateX(2%)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 9. pixel scatter — the new screen assembles cell by cell */
  M.push({ key: 'pixelscatter', title: 'Pixel Scatter', tags: ['transition', 'mosaic'], build: function (v) {
    var d = D(v, 2.4), cells = '';
    for (var i = 0; i < 24; i++) cells += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="tx5">' + stg(v, '', '<div class="px">' + cells + '</div>') + '</div>',
      css: join([
        stageCss(v),
        '.old{z-index:2}',
        '.px{position:absolute;inset:0;z-index:3;display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(4,1fr);pointer-events:none}',
        '.px i{background:color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,#10101a);transform:scale(0);animation:px-a' + v.i + ' var(--dur,' + d + 's) ease-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -1.9)}',
        kf('px-a' + v.i, '0%{transform:scale(0)}30%,86%{transform:scale(1)}100%{transform:scale(0)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 10. mosaic flip — the tiles flip over to the new screen */
  M.push({ key: 'mosaicflip', title: 'Mosaic Flip', tags: ['transition', 'mosaic'], build: function (v) {
    var d = D(v, 2.6), tiles = '';
    for (var i = 0; i < 12; i++) tiles += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="tx5">' + stg(v, 'persp', '<div class="ms">' + tiles + '</div>') + '</div>',
      css: join([
        stageCss(v),
        '.stg.persp{perspective:700px;background:linear-gradient(160deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,#10101a),#10101a)}',
        '.new{display:none}',
        '.ms{position:absolute;inset:0;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(3,1fr)}',
        '.ms i{transform-origin:0 50%;background:linear-gradient(90deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 36%,#10101a),color-mix(in srgb,var(--c1,' + v.c1 + ') 22%,#10101a));border:1px solid rgba(0,0,0,.3);animation:ms-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -2.4)}',
        kf('ms-a' + v.i, '0%,16%{transform:rotateY(0)}52%,80%{transform:rotateY(-178deg)}100%{transform:rotateY(-360deg)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 11. tear wipe — the torn edge rips across the frame */
  M.push({ key: 'tearwipe', title: 'Tear Wipe', tags: ['transition', 'wipe'], build: function (v) {
    var d = D(v, 2);
    return {
      html: '<div class="tx5">' + stg(v, '', '<i class="wip"></i>') + '</div>',
      css: join([
        stageCss(v),
        '.old{z-index:1}',
        '.wip{position:absolute;inset:0;z-index:2;background:linear-gradient(160deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,#10101a),#10101a);clip-path:polygon(-4% 0,-4% 0,-4% 25%,10% 25%,2% 45%,16% 55%,4% 75%,14% 100%,-4% 100%);animation:tw-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.6,0,.3,1) infinite alternate}',
        kf('tw-a' + v.i, '0%{clip-path:polygon(-4% 0,-4% 0,-4% 25%,10% 25%,2% 45%,16% 55%,4% 75%,14% 100%,-4% 100%)}100%{clip-path:polygon(-4% 0,104% 0,118% 25%,104% 45%,116% 55%,102% 75%,114% 100%,104% 100%,-4% 100%)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 12. curtain wave — the slats drop from the top in a wave */
  M.push({ key: 'curtainwave', title: 'Curtain Wave', tags: ['transition', 'curtain'], build: function (v) {
    var d = D(v, 2.6), slats = '';
    for (var i = 0; i < 8; i++) slats += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="tx5">' + stg(v, '', '<div class="cu">' + slats + '</div>') + '</div>',
      css: join([
        stageCss(v),
        '.old{z-index:2}',
        '.cu{position:absolute;inset:0;z-index:3;display:flex;pointer-events:none}',
        '.cu i{flex:1;background:color-mix(in srgb,var(--c1,' + v.c1 + ') 34%,#10101a);transform:translateY(-102%);animation:cu-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.5,0,.3,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -2.6)}',
        kf('cu-a' + v.i, '0%{transform:translateY(-102%)}38%,84%{transform:translateY(0)}100%{transform:translateY(102%)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 13. slant slices — the skewed bars slice the frame apart */
  M.push({ key: 'slantslices', title: 'Slant Slices', tags: ['transition', 'slices'], build: function (v) {
    var d = D(v, 2.2), bars = '';
    for (var i = 0; i < 4; i++) bars += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="tx5">' + stg(v, '', '<div class="sl">' + bars + '</div>') + '</div>',
      css: join([
        stageCss(v),
        '.old{z-index:2}',
        '.sl{position:absolute;inset:0;z-index:3;display:flex;pointer-events:none}',
        '.sl i{flex:1;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 40%,#10101a),color-mix(in srgb,var(--c3,' + v.c3 + ') 26%,#10101a));transform:translateX(-112%) skewX(-14deg);animation:sl-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.65,0,.25,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -2.4)}',
        kf('sl-a' + v.i, '0%{transform:translateX(-112%) skewX(-14deg)}40%,80%{transform:translateX(0) skewX(-14deg)}100%{transform:translateX(112%) skewX(-14deg)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 14. dot pop grid — the lattice pops over the screen */
  M.push({ key: 'dotpopgrid', title: 'Dot Pop Grid', tags: ['transition', 'dots'], build: function (v) {
    var d = D(v, 2.4), dots = '';
    for (var i = 0; i < 30; i++) dots += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="tx5">' + stg(v, '', '<div class="dg">' + dots + '</div>') + '</div>',
      css: join([
        stageCss(v),
        '.old{z-index:2}',
        '.dg{position:absolute;inset:0;z-index:3;display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(5,1fr);pointer-events:none}',
        '.dg i{display:grid;place-items:center}',
        '.dg i::after{content:"";width:62%;height:62%;border-radius:50%;background:var(--c1,' + v.c1 + ');transform:scale(0);animation:dg-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.3,1.5,.4,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -1.9)}',
        kf('dg-a' + v.i, '0%{transform:scale(0)}34%,82%{transform:scale(1)}100%{transform:scale(0)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 15. fan slats — the slats swing open from the middle like a fan */
  M.push({ key: 'fanslats', title: 'Fan Slats', tags: ['transition', 'slats'], build: function (v) {
    var d = D(v, 2.6), slats = '';
    for (var i = 0; i < 6; i++) slats += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="tx5">' + stg(v, 'persp', '<div class="fn">' + slats + '</div>') + '</div>',
      css: join([
        stageCss(v),
        '.stg.persp{perspective:600px;background:linear-gradient(160deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,#10101a),#10101a)}',
        '.new{display:none}',
        '.fn{position:absolute;inset:0;z-index:2;display:flex}',
        '.fn i{flex:1;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 38%,#10101a),color-mix(in srgb,var(--c1,' + v.c1 + ') 24%,#10101a));border-right:1px solid rgba(0,0,0,.3);transform-origin:100% 100%;transform:rotate(0);animation:fn-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -2.6)}',
        kf('fn-a' + v.i, '0%,14%{transform:rotate(0)}55%,80%{transform:rotate(46deg)}100%{transform:rotate(0)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 16. wedge wipe — the triangle sweeps the frame edge to edge */
  M.push({ key: 'wedgewipe', title: 'Wedge Wipe', tags: ['transition', 'wipe'], build: function (v) {
    var d = D(v, 2);
    return {
      html: '<div class="tx5">' + stg(v, '', '<i class="wip"></i>') + '</div>',
      css: join([
        stageCss(v),
        '.old{z-index:1}',
        '.wip{position:absolute;inset:0;z-index:2;background:linear-gradient(160deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,#10101a),#10101a);clip-path:polygon(-20% 0,-20% 100%,26% 50%);animation:wg-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.6,0,.3,1) infinite alternate}',
        kf('wg-a' + v.i, '0%{clip-path:polygon(-20% 0,-20% 100%,26% 50%)}100%{clip-path:polygon(-20% 0,130% 100%,176% 50%)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 17. maze veil — the veil unravels in a stepped maze */
  M.push({ key: 'mazerveal', title: 'Maze Veil', tags: ['transition', 'maze'], build: function (v) {
    var d = D(v, 2.8);
    return {
      html: '<div class="tx5">' + stg(v, '', '<i class="wip"></i>') + '</div>',
      css: join([
        stageCss(v),
        '.old{z-index:1}',
        '.wip{position:absolute;inset:0;z-index:2;background:color-mix(in srgb,var(--c1,' + v.c1 + ') 30%,#10101a);clip-path:polygon(0 0,100% 0,100% 100%,0 100%,0 0,0 0,0 0);animation:mv-a' + v.i + ' var(--dur,' + d + 's) steps(1) infinite}',
        kf('mv-a' + v.i, '0%,12%{clip-path:polygon(0 0,100% 0,100% 100%,0 100%,0 0,0 0,0 0)}26%,38%{clip-path:polygon(0 0,100% 0,100% 100%,0 100%,34% 100%,34% 66%,0 66%)}52%,64%{clip-path:polygon(0 0,100% 0,100% 100%,0 100%,34% 100%,34% 66%,62% 66%)}78%,88%{clip-path:polygon(0 0,100% 0,100% 100%,0 100%,34% 100%,34% 66%,62% 66%,62% 30%)}100%{clip-path:polygon(0 0,100% 0,100% 100%,0 100%,34% 100%,34% 66%,62% 66%,62% 30%)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 18. bolt split — the frame splits and the halves part */
  M.push({ key: 'boltsplit', title: 'Bolt Split', tags: ['transition', 'split'], build: function (v) {
    var d = D(v, 2.2);
    return {
      html: '<div class="tx5">' + stg(v, '', '<i class="hl"></i><i class="hr"></i><b class="seam"></b>') + '</div>',
      css: join([
        stageCss(v),
        '.old{z-index:1}',
        '.hl,.hr{position:absolute;top:0;bottom:0;width:50%;z-index:2;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 36%,#10101a),color-mix(in srgb,var(--c1,' + v.c1 + ') 22%,#10101a))}',
        '.hl{left:0;border-right:2px solid var(--c3,' + v.c3 + ');transform:skewX(0);animation:bs-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.6,0,.3,1) infinite}',
        '.hr{right:0;border-left:2px solid var(--c3,' + v.c3 + ');animation:bs-b' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.6,0,.3,1) infinite}',
        '.seam{position:absolute;left:50%;top:0;bottom:0;width:3px;margin-left:-1.5px;background:var(--c3,' + v.c3 + ');box-shadow:0 0 12px var(--c3,' + v.c3 + ');opacity:0;animation:bs-c' + v.i + ' var(--dur,' + d + 's) steps(1) infinite;z-index:3}',
        kf('bs-a' + v.i, '0%,10%{transform:translateX(0)}55%,78%{transform:translateX(-104%)}100%{transform:translateX(-104%)}'),
        kf('bs-b' + v.i, '0%,10%{transform:translateX(0)}55%,78%{transform:translateX(104%)}100%{transform:translateX(104%)}'),
        kf('bs-c' + v.i, '0%,8%{opacity:0}12%,46%{opacity:1}52%,100%{opacity:0}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 19. bubble burst — the bubble swells from the corner and pops */
  M.push({ key: 'bubbleburst', title: 'Bubble Burst', tags: ['transition', 'bubble'], build: function (v) {
    var d = D(v, 2.4);
    return {
      html: '<div class="tx5">' + stg(v, '', '<i class="wip"></i>') + '</div>',
      css: join([
        stageCss(v),
        '.old{z-index:1}',
        '.wip{position:absolute;inset:0;z-index:2;background:linear-gradient(160deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,#10101a),#10101a);clip-path:circle(0% at 0% 100%);animation:bb-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.5,0,.3,1) infinite alternate}',
        kf('bb-a' + v.i, '0%{clip-path:circle(0% at 0% 100%)}70%{clip-path:circle(135% at 0% 100%)}88%{clip-path:circle(140% at 0% 100%)}100%{clip-path:circle(142% at 0% 100%)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 20. roll up — the screen rolls up like a blind to reveal the next */
  M.push({ key: 'rollup', title: 'Roll Up', tags: ['transition', 'scroll'], build: function (v) {
    var d = D(v, 2.2);
    return {
      html: '<div class="tx5"><div class="stg"><div class="new">B</div><div class="old">A</div></div></div>',
      css: join([
        stageCss(v),
        '.stg{background:linear-gradient(160deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,#10101a),#10101a)}',
        '.new{display:none}',
        '.old{z-index:2;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 40%,#10101a),color-mix(in srgb,var(--c1,' + v.c1 + ') 24%,#10101a));transform-origin:50% 0;animation:ru-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite alternate}',
        kf('ru-a' + v.i, '0%,10%{transform:scaleY(1)}88%,100%{transform:scaleY(.02)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  /* 21. pixel melt — the lattice melts away and reveals the new screen */
  M.push({ key: 'pixelmelt', title: 'Pixel Melt', tags: ['transition', 'mosaic'], build: function (v) {
    var d = D(v, 2.8), cells = '';
    for (var i = 0; i < 30; i++) cells += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="tx5">' + stg(v, '', '<div class="pm">' + cells + '</div>') + '</div>',
      css: join([
        stageCss(v),
        '.old{z-index:2}',
        '.pm{position:absolute;inset:0;z-index:3;display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(5,1fr);pointer-events:none}',
        '.pm i{background:color-mix(in srgb,var(--c1,' + v.c1 + ') 26%,#10101a);animation:pm-a' + v.i + ' var(--dur,' + d + 's) ease-in infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -2)}',
        kf('pm-a' + v.i, '0%{clip-path:inset(0 0 0 0)}34%,84%{clip-path:inset(0 0 101% 0)}100%{clip-path:inset(0 0 101% 0)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 300, 2, 230, 'px')])
    };
  } });

  K.add('transitions', V.matrix('transitions', M, 24, 'w5tx'));
})(window);
