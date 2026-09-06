/* ============================================================
   Transitions & Reveals — 400 page/element transition effects
   Wipes, curtains, irises, shutters, morphs, page turns, blinds, dissolves,
   slice reveals, mask sweeps, ripple reveals, zoom-throughs, split screens,
   staggered tiles, letterbox bars, circle expands, skeleton→content swaps.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit, V = global.MLVary;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color;

  function stageCss(extra) {
    return '.tst{position:relative;width:var(--w,250px);height:var(--h,160px);border-radius:var(--round,14px);overflow:hidden;background:linear-gradient(135deg,var(--c1,#7c5cff),var(--c2,#22d3ee));' + (extra || '') + '}';
  }
  function baseCfg(v, extra) {
    return [
      range('Cycle', '--dur', .2, 9, .05, v.dur, 's'),
      range('Width', '--w', 140, 460, 5, 250, 'px'),
      range('Height', '--h', 90, 320, 2, 160, 'px'),
      range('Corner', '--round', 0, 34, 1, 14, 'px'),
      col('Colour', '--c1', v.c1),
      col('Colour B', '--c2', v.c2),
      col('Overlay', '--c3', v.c3)
    ].concat(extra || []);
  }
  var CONTENT = '<b class="ct"><s></s><s></s><s></s></b>';
  var CONTENT_CSS = [
    '.ct{position:absolute;inset:0;display:grid;align-content:center;gap:9px;padding:var(--pad,22px)}',
    '.ct s{height:11px;border-radius:99px;background:rgba(255,255,255,.85);text-decoration:none}',
    '.ct s:nth-child(2){width:72%;opacity:.7}',
    '.ct s:nth-child(3){width:45%;opacity:.5}'
  ];

  var M = [];

  /* ─── 1. directional wipe ─── */
  M.push({ key: 'wipe', title: 'Directional Wipe', tags: ['transition', 'wipe'], build: function (v) {
    var angles = ['to right', 'to left', 'to bottom', 'to top', '135deg', '45deg'];
    var a = angles[v.i % angles.length];
    return {
      html: '<div class="tst twp">' + CONTENT + '<i></i></div>',
      css: join([
        stageCss(), CONTENT_CSS.join('\n'),
        '.twp i{position:absolute;inset:0;background:linear-gradient(' + a + ',var(--c3,' + v.c3 + ') 50%,transparent 50%);background-size:calc(200% + var(--feather,0px)) 100%;animation:twp-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        kf('twp-' + v.i, '0%,10%{background-position:100% 0}55%,100%{background-position:-100% 0}')
      ]),
      cfg: baseCfg(v, [range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 2. curtain split ─── */
  M.push({ key: 'curtain', title: 'Curtain Split', tags: ['transition', 'split'], build: function (v) {
    var vert = v.i % 2 === 0;
    return {
      html: '<div class="tst tcu">' + CONTENT + '<i class="a"></i><i class="b"></i></div>',
      css: join([
        stageCss(), CONTENT_CSS.join('\n'),
        '.tcu i{position:absolute;background:var(--c3,' + v.c3 + ');animation:tcu-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        vert
          ? '.tcu .a{inset:0 50% 0 0;transform-origin:0 50%}\n.tcu .b{inset:0 0 0 50%;transform-origin:100% 50%}'
          : '.tcu .a{inset:0 0 50% 0;transform-origin:50% 0}\n.tcu .b{inset:50% 0 0 0;transform-origin:50% 100%}',
        kf('tcu-' + v.i, '0%,12%{transform:scale' + (vert ? 'X' : 'Y') + '(1)}58%,100%{transform:scale' + (vert ? 'X' : 'Y') + '(0)}')
      ]),
      cfg: baseCfg(v, [range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 3. iris circle ─── */
  M.push({ key: 'iris', title: 'Iris Reveal', tags: ['transition', 'mask'], build: function (v) {
    var ox = [50, 20, 80, 50, 12, 88][v.i % 6], oy = [50, 30, 70, 12, 88, 50][v.i % 6];
    return {
      html: '<div class="tst tir">' + CONTENT + '</div>',
      css: join([
        stageCss(), CONTENT_CSS.join('\n'),
        '.tir{-webkit-mask:radial-gradient(circle at var(--ox,' + ox + '%) var(--oy,' + oy + '%),#000 var(--r,0%),transparent calc(var(--r,0%) + var(--feather,4%)));mask:radial-gradient(circle at var(--ox,' + ox + '%) var(--oy,' + oy + '%),#000 var(--r,0%),transparent calc(var(--r,0%) + var(--feather,4%)));animation:tir-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        kf('tir-' + v.i, '0%,8%{--r:0%}55%,100%{--r:130%}')
      ]),
      cfg: baseCfg(v, [range('Origin X', '--ox', 0, 100, 1, ox, '%'), range('Origin Y', '--oy', 0, 100, 1, oy, '%'), range('Feather', '--feather', 0, 40, 1, 4, '%'), range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 4. shutter blinds ─── */
  M.push({ key: 'blinds', title: 'Shutter Blinds', tags: ['transition', 'slats'], build: function (v) {
    var n = 5 + (v.i % 8), out = '', vert = v.i % 3 === 0;
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="tst tbl" style="--n:' + n + '">' + CONTENT + out + '</div>',
      css: join([
        stageCss(), CONTENT_CSS.join('\n'),
        '.tbl i{position:absolute;background:var(--c3,' + v.c3 + ');animation:tbl-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        vert
          ? '.tbl i{top:0;bottom:0;left:calc(var(--i) * (100% / var(--n)));width:calc(100% / var(--n));transform-origin:50% 0}'
          : '.tbl i{left:0;right:0;top:calc(var(--i) * (100% / var(--n)));height:calc(100% / var(--n));transform-origin:0 50%}',
        kf('tbl-' + v.i, '0%,10%{transform:scale' + (vert ? 'Y' : 'X') + '(1)}60%,100%{transform:scale' + (vert ? 'Y' : 'X') + '(0)}')
      ]),
      cfg: baseCfg(v, [range('Stagger', '--step', 0, .4, .01, v.step, 's'), range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 5. tile grid reveal ─── */
  M.push({ key: 'tiles', title: 'Tile Grid Reveal', tags: ['transition', 'grid'], build: function (v) {
    var cols = 4 + (v.i % 5), rows = 3 + (v.i % 3), out = '', i;
    for (i = 0; i < cols * rows; i++) out += '<i style="--i:' + i + ';--d:' + ((i % cols) + Math.floor(i / cols)) + '"></i>';
    return {
      html: '<div class="tst ttl" style="--cols:' + cols + ';--rows:' + rows + '">' + CONTENT + '<div class="gd">' + out + '</div></div>',
      css: join([
        stageCss(), CONTENT_CSS.join('\n'),
        '.ttl .gd{position:absolute;inset:0;display:grid;grid-template-columns:repeat(var(--cols),1fr);grid-template-rows:repeat(var(--rows),1fr)}',
        '.ttl i{background:var(--c3,' + v.c3 + ');animation:ttl-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--d) * var(--step,' + v.step + 's))}',
        kf('ttl-' + v.i, '0%,10%{transform:scale(1) rotate(0);opacity:1}62%,100%{transform:scale(var(--shrink,0)) rotate(var(--spin,0deg));opacity:0}')
      ]),
      cfg: baseCfg(v, [range('Stagger', '--step', 0, .3, .005, v.step, 's'), range('Shrink to', '--shrink', 0, .8, .02, 0), range('Spin', '--spin', -180, 180, 5, 0, 'deg'), range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 6. page turn ─── */
  M.push({ key: 'pageturn', title: 'Page Turn', tags: ['transition', '3d'], build: function (v) {
    return {
      html: '<div class="tpg"><div class="pg">' + CONTENT + '<i></i></div></div>',
      css: join([
        '.tpg{perspective:var(--persp,760px);width:var(--w,240px);height:var(--h,170px)}',
        stageCss().replace('.tst', '.pg'), CONTENT_CSS.join('\n'),
        '.pg{width:100%;height:100%;transform-origin:0 50%;transform-style:preserve-3d;animation:tpg-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-direction:' + v.dir + '}',
        '.pg i{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.5),transparent 40%);opacity:0;animation:tpgs-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        kf('tpg-' + v.i, '0%,12%{transform:rotateY(0)}62%,100%{transform:rotateY(var(--flip,-165deg))}'),
        kf('tpgs-' + v.i, '0%,12%{opacity:0}40%{opacity:.9}62%,100%{opacity:0}')
      ]),
      cfg: baseCfg(v, [range('Perspective', '--persp', 200, 1600, 20, 760, 'px'), range('Flip', '--flip', -180, 180, 5, -165, 'deg'), range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 7. slice shift ─── */
  M.push({ key: 'slices', title: 'Slice Shift Reveal', tags: ['transition', 'slice'], build: function (v) {
    var n = 4 + (v.i % 7), out = '';
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + ';--s:' + (i % 2 ? 1 : -1) + '"></i>';
    return {
      html: '<div class="tst tsl" style="--n:' + n + '">' + CONTENT + out + '</div>',
      css: join([
        stageCss(), CONTENT_CSS.join('\n'),
        '.tsl i{position:absolute;top:0;bottom:0;left:calc(var(--i) * (100% / var(--n)));width:calc(100% / var(--n) + 1px);background:var(--c3,' + v.c3 + ');animation:tsl-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('tsl-' + v.i, '0%,10%{transform:translateY(0);opacity:1}60%,100%{transform:translateY(calc(var(--s) * var(--travel,110%)));opacity:.2}')
      ]),
      cfg: baseCfg(v, [range('Travel', '--travel', 20, 200, 5, 110, '%'), range('Stagger', '--step', 0, .3, .01, v.step, 's'), range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 8. dissolve pixels ─── */
  M.push({ key: 'dissolve', title: 'Pixel Dissolve', tags: ['transition', 'dissolve'], build: function (v) {
    var cols = 10 + (v.i % 8), rows = 7 + (v.i % 5), out = '', i;
    for (i = 0; i < cols * rows; i++) out += '<i style="--d:' + (v.rnd() * 1.4).toFixed(2) + '"></i>';
    return {
      html: '<div class="tst tds" style="--cols:' + cols + ';--rows:' + rows + '">' + CONTENT + '<div class="gd">' + out + '</div></div>',
      css: join([
        stageCss(), CONTENT_CSS.join('\n'),
        '.tds .gd{position:absolute;inset:0;display:grid;grid-template-columns:repeat(var(--cols),1fr);grid-template-rows:repeat(var(--rows),1fr)}',
        '.tds i{background:var(--c3,' + v.c3 + ');animation:tds-' + v.i + ' var(--dur,' + v.dur + 's) steps(1,end) infinite;animation-delay:calc(var(--d) * var(--spread,-1s))}',
        kf('tds-' + v.i, '0%,45%{opacity:1}55%,100%{opacity:0}')
      ]),
      cfg: baseCfg(v, [range('Spread', '--spread', -3, 0, .05, -1, 's'), range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 9. zoom through ─── */
  M.push({ key: 'zoom', title: 'Zoom Through', tags: ['transition', 'zoom'], build: function (v) {
    return {
      html: '<div class="tzm"><div class="tst a">' + CONTENT + '</div><div class="tst b">' + CONTENT + '</div></div>',
      css: join([
        '.tzm{position:relative;width:var(--w,250px);height:var(--h,160px);perspective:var(--persp,600px)}',
        stageCss('position:absolute;inset:0;'), CONTENT_CSS.join('\n'),
        '.tzm .a{animation:tzma-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        '.tzm .b{background:linear-gradient(135deg,var(--c3,' + v.c3 + '),var(--c2,' + v.c2 + '));animation:tzmb-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        kf('tzma-' + v.i, '0%{transform:scale(1);opacity:1}55%,100%{transform:scale(var(--push,2.4));opacity:0}'),
        kf('tzmb-' + v.i, '0%{transform:scale(var(--pull,.35));opacity:0}55%,100%{transform:scale(1);opacity:1}')
      ]),
      cfg: baseCfg(v, [range('Push out', '--push', 1.1, 5, .1, 2.4, '×'), range('Pull in', '--pull', .05, .95, .05, .35, '×'), range('Perspective', '--persp', 200, 1400, 20, 600, 'px'), range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 10. letterbox bars ─── */
  M.push({ key: 'letterbox', title: 'Letterbox Bars', tags: ['transition', 'cinema'], build: function (v) {
    return {
      html: '<div class="tst tlb">' + CONTENT + '<i class="t"></i><i class="b"></i></div>',
      css: join([
        stageCss(), CONTENT_CSS.join('\n'),
        '.tlb i{position:absolute;left:0;right:0;height:var(--bar,50%);background:var(--c3,' + v.c3 + ');animation:tlb-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        '.tlb .t{top:0;transform-origin:50% 0}',
        '.tlb .b{bottom:0;transform-origin:50% 100%}',
        kf('tlb-' + v.i, '0%,10%{transform:scaleY(1)}55%,100%{transform:scaleY(var(--rest,.16))}')
      ]),
      cfg: baseCfg(v, [range('Bar depth', '--bar', 10, 60, 1, 50, '%'), range('Resting', '--rest', 0, .8, .02, .16), range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 11. ripple reveal ─── */
  M.push({ key: 'ripple', title: 'Ripple Reveal', tags: ['transition', 'ripple'], build: function (v) {
    var n = 3 + (v.i % 3), out = '';
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="tst trp">' + CONTENT + '<span class="ov"></span>' + out + '</div>',
      css: join([
        stageCss(), CONTENT_CSS.join('\n'),
        '.trp .ov{position:absolute;inset:0;background:var(--c3,' + v.c3 + ');animation:trpo-' + v.i + ' var(--dur,' + v.dur + 's) steps(1,end) infinite}',
        '.trp i{position:absolute;top:50%;left:50%;width:var(--sz,20px);height:var(--sz,20px);margin:calc(var(--sz,20px) / -2);border-radius:50%;border:var(--tw,3px) solid rgba(255,255,255,.85);animation:trp-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('trp-' + v.i, '0%{transform:scale(.2);opacity:1}55%,100%{transform:scale(var(--grow,18));opacity:0}'),
        kf('trpo-' + v.i, '0%,42%{opacity:1}50%,100%{opacity:0}')
      ]),
      cfg: baseCfg(v, [range('Ring', '--sz', 6, 60, 1, 20, 'px'), range('Ring width', '--tw', 1, 12, .5, 3, 'px'), range('Grow', '--grow', 3, 40, 1, 18, '×'), range('Stagger', '--step', 0, .5, .01, v.step, 's'), range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 12. skeleton to content ─── */
  M.push({ key: 'skeleton', title: 'Skeleton To Content', tags: ['transition', 'ui'], build: function (v) {
    return {
      html: '<div class="tsk"><div class="row"><b class="av"></b><div class="ln"><s></s><s></s></div></div><div class="ln big"><s></s><s></s><s></s></div><i class="sh"></i></div>',
      css: join([
        '.tsk{position:relative;width:var(--w,260px);padding:var(--pad,20px);border-radius:var(--round,16px);background:rgba(150,150,200,.08);border:1px solid rgba(160,160,210,.16);overflow:hidden;display:grid;gap:14px}',
        '.tsk .row{display:flex;gap:12px;align-items:center}',
        '.tsk .av{width:var(--av,40px);height:var(--av,40px);border-radius:50%;background:var(--c1,' + v.c1 + ');animation:tsk-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        '.tsk .ln{display:grid;gap:7px;flex:1}',
        '.tsk s{height:9px;border-radius:99px;background:var(--c2,' + v.c2 + ');text-decoration:none;animation:tsk-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        '.tsk .ln s:nth-child(2){width:60%;animation-delay:calc(var(--step,' + v.step + 's) * 1)}',
        '.tsk .big s:nth-child(2){width:88%;animation-delay:calc(var(--step,' + v.step + 's) * 2)}',
        '.tsk .big s:nth-child(3){width:52%;animation-delay:calc(var(--step,' + v.step + 's) * 3)}',
        '.tsk .sh{position:absolute;top:0;bottom:0;left:-40%;width:40%;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--c3,' + v.c3 + ') 45%,transparent),transparent);animation:tskh-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite}',
        kf('tsk-' + v.i, '0%,45%{opacity:.25;filter:saturate(0)}70%,100%{opacity:1;filter:saturate(1)}'),
        kf('tskh-' + v.i, '0%{left:-40%}100%{left:120%}')
      ]),
      cfg: [range('Cycle', '--dur', .3, 8, .05, v.dur, 's'), range('Stagger', '--step', 0, .5, .01, v.step, 's'), range('Width', '--w', 170, 420, 5, 260, 'px'), range('Avatar', '--av', 18, 72, 1, 40, 'px'), range('Padding', '--pad', 8, 42, 1, 20, 'px'), range('Corner', '--round', 0, 34, 1, 16, 'px'), col('Colour', '--c1', v.c1), col('Colour B', '--c2', v.c2), col('Shimmer', '--c3', v.c3)]
    };
  } });

  /* ─── 13. clip-path morph ─── */
  M.push({ key: 'morph', title: 'Clip Path Morph', tags: ['transition', 'clip'], build: function (v) {
    var shapes = [
      ['polygon(0 0,100% 0,100% 100%,0 100%)', 'polygon(50% 0,100% 50%,50% 100%,0 50%)'],
      ['circle(60% at 50% 50%)', 'circle(18% at 50% 50%)'],
      ['polygon(0 0,100% 0,100% 100%,0 100%)', 'polygon(20% 8%,86% 20%,74% 92%,12% 76%)'],
      ['inset(0 0 0 0 round 8px)', 'inset(22% 18% 22% 18% round 50%)'],
      ['polygon(50% 0,100% 100%,0 100%)', 'polygon(50% 100%,100% 0,0 0)'],
      ['ellipse(60% 60% at 50% 50%)', 'ellipse(24% 46% at 50% 50%)']
    ];
    var s = shapes[v.i % shapes.length];
    return {
      html: '<div class="tst tmp">' + CONTENT + '</div>',
      css: join([
        stageCss(), CONTENT_CSS.join('\n'),
        '.tmp{clip-path:' + s[0] + ';animation:tmp-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite alternate}',
        kf('tmp-' + v.i, '0%{clip-path:' + s[0] + '}100%{clip-path:' + s[1] + '}')
      ]),
      cfg: baseCfg(v, [range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 14. cube face swap ─── */
  M.push({ key: 'cube', title: 'Cube Face Swap', tags: ['transition', '3d'], build: function (v) {
    var axis = v.i % 2 ? 'X' : 'Y';
    return {
      html: '<div class="tcb"><div class="bx"><div class="fc f1">' + CONTENT + '</div><div class="fc f2">' + CONTENT + '</div></div></div>',
      css: join([
        '.tcb{perspective:var(--persp,760px);width:var(--w,240px);height:var(--h,160px)}',
        CONTENT_CSS.join('\n'),
        '.tcb .bx{position:relative;width:100%;height:100%;transform-style:preserve-3d;animation:tcb-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        '.tcb .fc{position:absolute;inset:0;border-radius:var(--round,14px);backface-visibility:hidden;overflow:hidden}',
        '.tcb .f1{background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform:translateZ(calc(var(--' + (axis === 'Y' ? 'w' : 'h') + ',' + (axis === 'Y' ? '240px' : '160px') + ') / 2))}',
        '.tcb .f2{background:linear-gradient(135deg,var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '));transform:rotate' + axis + '(90deg) translateZ(calc(var(--' + (axis === 'Y' ? 'w' : 'h') + ',' + (axis === 'Y' ? '240px' : '160px') + ') / 2))}',
        kf('tcb-' + v.i, '0%,20%{transform:rotate' + axis + '(0)}70%,100%{transform:rotate' + axis + '(-90deg)}')
      ]),
      cfg: baseCfg(v, [range('Perspective', '--persp', 200, 1600, 20, 760, 'px'), range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 15. text mask sweep ─── */
  M.push({ key: 'textmask', title: 'Text Mask Sweep', tags: ['transition', 'text'], build: function (v) {
    var words = ['REVEAL', 'ENTER', 'LOADING', 'WELCOME', 'MOTION', 'NEXT', 'BEGIN', 'STORY'];
    return {
      html: '<div class="ttm"><span>' + words[v.i % words.length] + '</span></div>',
      css: join([
        '.ttm{position:relative;overflow:hidden;padding:var(--pad,14px) var(--padx,10px)}',
        '.ttm span{display:block;font:700 var(--fs,44px)/1 "Space Grotesk",sans-serif;letter-spacing:.05em;background:linear-gradient(90deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '));-webkit-background-clip:text;background-clip:text;color:transparent;background-size:var(--spread,300%) 100%;-webkit-mask:linear-gradient(90deg,#000 var(--m,0%),transparent calc(var(--m,0%) + var(--soft,18%)));mask:linear-gradient(90deg,#000 var(--m,0%),transparent calc(var(--m,0%) + var(--soft,18%)));animation:ttm-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        kf('ttm-' + v.i, '0%,8%{--m:0%;background-position:0 0}60%,100%{--m:110%;background-position:100% 0}')
      ]),
      cfg: [range('Cycle', '--dur', .2, 8, .05, v.dur, 's'), range('Text', '--fs', 16, 92, 1, 44, 'px'), range('Mask softness', '--soft', 2, 60, 1, 18, '%'), range('Gradient spread', '--spread', 100, 600, 10, 300, '%'), range('Padding', '--pad', 2, 40, 1, 14, 'px'), col('Colour', '--c1', v.c1), col('Colour B', '--c2', v.c2), col('Colour C', '--c3', v.c3)]
    };
  } });

  /* ─── 16. stacked card deal ─── */
  M.push({ key: 'deal', title: 'Card Deal Stack', tags: ['transition', 'cards'], build: function (v) {
    var n = 3 + (v.i % 3), out = '';
    for (var i = 0; i < n; i++) out += '<div class="cd" style="--i:' + i + '">' + CONTENT + '</div>';
    return {
      html: '<div class="tdl" style="--n:' + n + '">' + out + '</div>',
      css: join([
        '.tdl{position:relative;width:var(--w,230px);height:var(--h,150px)}',
        CONTENT_CSS.join('\n'),
        '.tdl .cd{position:absolute;inset:0;border-radius:var(--round,14px);overflow:hidden;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));box-shadow:0 12px 30px rgba(0,0,0,.4);animation:tdl-' + v.i + ' var(--dur,' + (v.dur * 2) + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,' + Math.max(.1, v.step * 4).toFixed(2) + 's))}',
        '.tdl .cd:nth-child(even){background:linear-gradient(135deg,var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '))}',
        kf('tdl-' + v.i, '0%{transform:translate(0,0) rotate(0);opacity:0}15%{opacity:1}45%{transform:translate(var(--fan,26px),calc(var(--fan,26px) * -.5)) rotate(var(--tilt,8deg))}80%,100%{transform:translate(0,0) rotate(0);opacity:0}')
      ]),
      cfg: baseCfg(v, [range('Fan', '--fan', 0, 90, 2, 26, 'px'), range('Tilt', '--tilt', -30, 30, 1, 8, 'deg'), range('Stagger', '--step', 0, 1.2, .05, +Math.max(.1, v.step * 4).toFixed(2), 's'), range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 17. split screen slide ─── */
  M.push({ key: 'split', title: 'Split Screen Slide', tags: ['transition', 'split'], build: function (v) {
    return {
      html: '<div class="tsp"><div class="hf a">' + CONTENT + '</div><div class="hf b">' + CONTENT + '</div><i class="sm"></i></div>',
      css: join([
        '.tsp{position:relative;width:var(--w,250px);height:var(--h,160px);border-radius:var(--round,14px);overflow:hidden}',
        CONTENT_CSS.join('\n'),
        '.tsp .hf{position:absolute;top:0;bottom:0;width:50%;overflow:hidden}',
        '.tsp .a{left:0;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));animation:tspa-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        '.tsp .b{right:0;background:linear-gradient(225deg,var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '));animation:tspb-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        '.tsp .sm{position:absolute;top:0;bottom:0;left:50%;width:var(--seam,3px);margin-left:calc(var(--seam,3px) / -2);background:rgba(255,255,255,.85);box-shadow:0 0 var(--glow,16px) rgba(255,255,255,.6)}',
        kf('tspa-' + v.i, '0%,12%{transform:translateY(0)}58%,100%{transform:translateY(var(--travel,-105%))}'),
        kf('tspb-' + v.i, '0%,12%{transform:translateY(0)}58%,100%{transform:translateY(calc(var(--travel,-105%) * -1))}')
      ]),
      cfg: baseCfg(v, [range('Travel', '--travel', -200, -20, 5, -105, '%'), range('Seam', '--seam', 0, 14, 1, 3, 'px'), range('Glow', '--glow', 0, 40, 1, 16, 'px'), range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 18. accordion fold ─── */
  M.push({ key: 'fold', title: 'Accordion Fold', tags: ['transition', '3d'], build: function (v) {
    var n = 4 + (v.i % 4), out = '';
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="tfd" style="--n:' + n + '">' + out + '</div>',
      css: join([
        '.tfd{display:flex;width:var(--w,250px);height:var(--h,160px);perspective:var(--persp,700px);border-radius:var(--round,12px);overflow:hidden}',
        '.tfd i{flex:1;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform-origin:0 50%;animation:tfd-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        '.tfd i:nth-child(even){background:linear-gradient(135deg,var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '));transform-origin:100% 50%}',
        kf('tfd-' + v.i, '0%,12%{transform:rotateY(0);filter:brightness(1)}60%,100%{transform:rotateY(var(--angle,72deg));filter:brightness(var(--dim,.35))}')
      ]),
      cfg: baseCfg(v, [range('Fold angle', '--angle', 0, 90, 1, 72, 'deg'), range('Shade', '--dim', .1, 1, .05, .35), range('Perspective', '--persp', 200, 1400, 20, 700, 'px'), range('Stagger', '--step', 0, .4, .01, v.step, 's')])
    };
  } });

  /* ─── 19. gooey blob transition ─── */
  M.push({ key: 'goo', title: 'Gooey Blob Wipe', tags: ['transition', 'organic'], build: function (v) {
    var n = 5 + (v.i % 4), out = '';
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + ';--x:' + ((i + .5) * (100 / n)).toFixed(1) + '"></i>';
    return {
      html: '<div class="tst tgo">' + CONTENT + '<div class="bl">' + out + '<u></u></div></div>',
      css: join([
        stageCss(), CONTENT_CSS.join('\n'),
        '.tgo .bl{position:absolute;inset:0;filter:blur(var(--goo,10px)) contrast(22)}',
        '.tgo i{position:absolute;bottom:-30%;left:calc(var(--x) * 1%);width:var(--blob,60px);height:var(--blob,60px);margin-left:calc(var(--blob,60px) / -2);border-radius:50%;background:var(--c3,' + v.c3 + ');animation:tgo-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        '.tgo u{position:absolute;left:0;right:0;bottom:-40%;height:60%;background:var(--c3,' + v.c3 + ');animation:tgou-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        kf('tgo-' + v.i, '0%,10%{transform:translateY(0) scale(1)}60%,100%{transform:translateY(-190%) scale(1.4)}'),
        kf('tgou-' + v.i, '0%,10%{transform:translateY(0)}60%,100%{transform:translateY(-180%)}')
      ]),
      cfg: baseCfg(v, [range('Blob', '--blob', 20, 140, 2, 60, 'px'), range('Gooeyness', '--goo', 2, 26, 1, 10, 'px'), range('Stagger', '--step', 0, .4, .01, v.step, 's'), range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 20. barn door + flash ─── */
  M.push({ key: 'barn', title: 'Barn Door Flash', tags: ['transition', 'cinema'], build: function (v) {
    return {
      html: '<div class="tst tbn">' + CONTENT + '<i class="l"></i><i class="r"></i><b class="fl"></b></div>',
      css: join([
        stageCss(), CONTENT_CSS.join('\n'),
        '.tbn i{position:absolute;top:0;bottom:0;width:50%;background:linear-gradient(90deg,var(--c3,' + v.c3 + '),color-mix(in srgb,var(--c3,' + v.c3 + ') 65%,#000));animation:tbn-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        '.tbn .l{left:0;transform-origin:0 50%}',
        '.tbn .r{right:0;transform-origin:100% 50%}',
        '.tbn .fl{position:absolute;inset:0;background:#fff;opacity:0;mix-blend-mode:screen;animation:tbnf-' + v.i + ' var(--dur,' + v.dur + 's) steps(1,end) infinite}',
        kf('tbn-' + v.i, '0%,12%{transform:scaleX(1) skewY(0)}58%,100%{transform:scaleX(0) skewY(var(--skew,0deg))}'),
        kf('tbnf-' + v.i, '0%,14%{opacity:0}16%{opacity:var(--flash,.55)}26%,100%{opacity:0}')
      ]),
      cfg: baseCfg(v, [range('Skew', '--skew', -20, 20, 1, 0, 'deg'), range('Flash', '--flash', 0, 1, .05, .55), range('Content pad', '--pad', 6, 50, 1, 22, 'px')])
    };
  } });

  K.add('transitions', V.matrix('transitions', M, 22, 'trn'));
})(window);
