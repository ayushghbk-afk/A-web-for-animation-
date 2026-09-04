/* ============================================================
   Loaders & spinners — generated families
   Every item is real, standalone html/css(/js). Geometry, timing and masks
   differ per variant; whatever a variant exposes as var(--x, fallback) turns
   into a control in the Customise panel automatically.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit;
  var join = K.join, cells = K.cells, kf = K.keyframes, range = K.range, col = K.color;
  var C1 = '#7c5cff', C2 = '#22d3ee', C3 = '#ff5c8a';

  var pool = [];
  function push(o) { o.family = o.family || 'misc'; pool.push(o); }

  /* ═══════════════ 1. spoke rings — n bars radiating from a hub ═══════════════ */
  var spokeMech = {
    tail: {
      rule: '.sp i::after{opacity:.15;animation:sp-a var(--dur,.9s) linear infinite;animation-delay:calc(var(--i) * var(--dur,.9s) / -1 * 12 / var(--n,12))}',
      frames: kf('sp-a', '0%{opacity:1;transform:scaleY(1.35)}40%{opacity:.5}100%{opacity:.12;transform:scaleY(1)}')
    },
    pulse: {
      rule: '.sp i::after{animation:sp-b var(--dur,1.1s) var(--ease,cubic-bezier(.3,.7,.3,1)) infinite;animation-delay:calc(var(--i) * -.09s)}',
      frames: kf('sp-b', '0%,100%{transform:scaleY(.35);opacity:.35}45%{transform:scaleY(1);opacity:1}')
    },
    chase: {
      rule: '.sp i::after{animation:sp-c var(--dur,1.4s) steps(1,end) infinite;animation-delay:calc(var(--i) * var(--dur,1.4s) / var(--n,12) * -1)}',
      frames: kf('sp-c', '0%{opacity:1;box-shadow:0 0 var(--glow,14px) var(--c1,' + C1 + ')}25%{opacity:.12;box-shadow:none}100%{opacity:.12}')
    },
    squeeze: {
      rule: '.sp i::after{transform-origin:50% 100%;animation:sp-d var(--dur,1.6s) cubic-bezier(.5,0,.5,1) infinite;animation-delay:calc(var(--i) * -.07s)}',
      frames: kf('sp-d', '0%,100%{transform:translateY(0) scaleY(.4)}50%{transform:translateY(-14%) scaleY(1.1)}')
    },
    rainbow: {
      rule: '.sp i::after{background:hsl(calc(var(--i) * var(--spread,300deg) / var(--n,12)) var(--sat,90%) 62%);animation:sp-e var(--dur,1.2s) ease-in-out infinite;animation-delay:calc(var(--i) * -.06s)}',
      frames: kf('sp-e', '0%,100%{opacity:.25;transform:scaleY(.5)}50%{opacity:1;transform:scaleY(1.2)}')
    }
  };
  [6, 8, 10, 12, 16, 20, 24].forEach(function (n) {
    Object.keys(spokeMech).forEach(function (mech) {
      if (n !== 12 && n !== 8 && n !== 16 && n !== 20 && mech === 'rainbow') return;
      var m = spokeMech[mech];
      var step = (360 / n);
      push({
        family: 'spokes',
        id: 'spoke-' + mech + '-' + n,
        title: ({ tail: 'Comet Tail', pulse: 'Pulse Spokes', chase: 'Step Chase', squeeze: 'Squeeze Spokes', rainbow: 'Spectrum Spokes' })[mech] + ' ' + n,
        tags: ['css', 'radial', 'spinner'],
        html: '<div class="sp">' + cells(n) + '</div>',
        css: join([
          '.sp{position:relative;width:var(--size,88px);height:var(--size,88px)}',
          '.sp i{position:absolute;inset:0;transform:rotate(calc(var(--i) * ' + step + 'deg))}',
          '.sp i::after{content:"";position:absolute;left:calc(50% - var(--w,5px)/2);top:0;width:var(--w,5px);height:var(--len,30%);border-radius:99px;background:var(--c1,' + C1 + ');transform-origin:50% 50%}',
          m.rule.replace(/var\(--n,12\)/g, 'var(--n,' + n + ')'),
          m.frames
        ]),
        cfg: [range('Diameter', '--size', 40, 140, 2, 88, 'px'), range('Bar width', '--w', 2, 16, 1, 5, 'px'),
          range('Bar length', '--len', 8, 48, 1, 30, '%'), range('Cycle', '--dur', .3, 3, .05, mech === 'tail' ? .9 : 1.2, 's'),
          col('Colour', '--c1', C1)].concat(mech === 'rainbow' ? [range('Hue spread', '--spread', 60, 360, 5, 300, 'deg'), range('Saturation', '--sat', 20, 100, 1, 90, '%')] : [])
      });
    });
  });

  /* ═══════════════ 2. conic arcs & masked rings ═══════════════ */
  var arcs = [
    ['conic-sweep', 'Conic Sweep', '.cg i{-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - var(--thick,8px)),#000 0);mask:radial-gradient(farthest-side,transparent calc(100% - var(--thick,8px)),#000 0);background:conic-gradient(from 0deg,transparent 8%,var(--c1,' + C1 + ') 92%);animation:cg var(--dur,1s) linear infinite}'],
    ['conic-tri', 'Triple Arc Conic', '.cg i{-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - var(--thick,7px)),#000 0);mask:radial-gradient(farthest-side,transparent calc(100% - var(--thick,7px)),#000 0);background:conic-gradient(var(--c1,' + C1 + ') 0 30%,transparent 30% 36%,var(--c2,' + C2 + ') 36% 66%,transparent 66% 72%,var(--c3,' + C3 + ') 72% 100%);animation:cg var(--dur,1.6s) cubic-bezier(.5,.1,.4,.9) infinite}'],
    ['border-quarter', 'Quarter Border Spin', '.cg i{border:var(--thick,6px) solid transparent;border-top-color:var(--c1,' + C1 + ');border-right-color:var(--c2,' + C2 + ');animation:cg var(--dur,.8s) linear infinite}'],
    ['dashed-ring', 'Dashed Ring March', '.cg i{border:var(--thick,4px) dashed var(--c1,' + C1 + ');animation:cg var(--dur,6s) linear infinite}'],
    ['dot-ring', 'Dot Ring Orbit', '.cg i{border:0;background:radial-gradient(circle at 50% 4%,var(--c1,' + C1 + ') 0 var(--dot,7px),transparent 0) 50% 50%/100% 100% no-repeat;animation:cg var(--dur,1.2s) linear infinite}'],
    ['gap-ring', 'Broken Ring Close', '.cg i{border:var(--thick,7px) solid var(--c1,' + C1 + ');border-radius:50%;clip-path:inset(0 0 0 0);animation:cgaps var(--dur,1.8s) cubic-bezier(.6,0,.3,1) infinite}'],
    ['ring-stack', 'Two Tone Stack', '.cg i:nth-child(1){border:var(--thick,5px) solid var(--c1,' + C1 + ');border-bottom-color:transparent;border-top-color:transparent;animation:cg var(--dur,1.4s) linear infinite}.cg i:nth-child(2){inset:16%;border-color:transparent var(--c2,' + C2 + ');animation-duration:.9s;animation-direction:reverse}'],
    ['notch-ring', 'Notched Orbit', '.cg i{background:conic-gradient(from 0deg,var(--c1,' + C1 + ') 0 88%,transparent 88% 100%);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - var(--thick,9px)),#000 0);mask:radial-gradient(farthest-side,transparent calc(100% - var(--thick,9px)),#000 0);animation:cg var(--dur,1.1s) steps(8,end) infinite}'],
    ['mask-eat', 'Being Eaten Ring', '.cg i{background:var(--c1,' + C1 + ');-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - var(--thick,10px)),#000 0),conic-gradient(#000 0 var(--p,200deg),transparent 0);mask:radial-gradient(farthest-side,transparent calc(100% - var(--thick,10px)),#000 0);animation:cg var(--dur,2.4s) ease-in-out infinite alternate}'],
    ['arc-slingshot', 'Slingshot Arc', '.cg i{border:var(--thick,6px) solid var(--c1,' + C1 + ');border-radius:50%;border-left-color:transparent;border-bottom-color:transparent;animation:cgsl var(--dur,1.3s) cubic-bezier(.6,-0.3,.4,1.4) infinite}']
  ];
  arcs.forEach(function (a, i) {
    var multi = a[0] === 'ring-stack' || a[0] === 'mask-eat';
    push({
      family: 'arcs',
      id: a[0] + '-' + i,
      title: a[1],
      tags: ['css', 'ring', 'mask'],
      html: '<div class="cg">' + cells(multi ? 2 : 1, 'i', ' class="r"') + '</div>',
      css: join([
        '.cg{position:relative;width:var(--size,84px);height:var(--size,84px)}',
        '.cg i{position:absolute;inset:0;border-radius:50%}',
        a[2],
        kf('cg', 'to{transform:rotate(1turn)}'),
        kf('cgaps', '0%{transform:rotate(0);clip-path:inset(46% 0 46% 0 round 50%)}50%{clip-path:inset(0 0 0 0 round 50%)}100%{transform:rotate(1turn);clip-path:inset(46% 0 46% 0 round 50%)}'),
        kf('cgsl', '0%{transform:rotate(0) scale(1)}50%{transform:rotate(200deg) scale(.82)}100%{transform:rotate(360deg) scale(1)}')
      ]),
      cfg: [range('Diameter', '--size', 40, 150, 2, 84, 'px'), range('Thickness', '--thick', 2, 20, 1, 7, 'px'),
        range('Cycle', '--dur', .3, 4, .05, 1.1, 's'), col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
    });
  });

  /* ═══════════════ 3. dot lines & clusters ═══════════════ */
  var dotFx = [
    ['bounce', 'Bouncing Dots', '0%,100%{transform:translateY(0) scale(1,.72)}35%{transform:translateY(-20px) scale(.94,1.06)}55%{transform:translateY(-24px) scale(1)}'],
    ['wave', 'Wave Dots', '0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}'],
    ['squish', 'Squish Dots', '0%,100%{transform:scale(1,1)}25%{transform:scale(1.35,.7)}60%{transform:scale(.75,1.3)}'],
    ['fade-slide', 'Fading Conveyer', '0%{opacity:0;transform:translateX(-12px)}30%,70%{opacity:1;transform:translateX(0)}100%{opacity:0;transform:translateX(12px)}'],
    ['flip', 'Tumbling Dots', '0%{transform:rotateY(0) rotateX(0)}50%{transform:rotateY(180deg) rotateX(90deg)}100%{transform:rotateY(360deg) rotateX(0)}'],
    ['stack', 'Stacking Dots', '0%,100%{transform:translateY(0)}40%{transform:translateY(-18px)}60%{transform:translateY(4px) scale(1.1)}'],
    ['orbit-dot', 'Dot Orbit', '0%{transform:rotate(0) translateX(18px) rotate(0)}100%{transform:rotate(360deg) translateX(18px) rotate(-360deg)}'],
    ['spread', 'Split & Merge', '0%,100%{transform:translateX(0);opacity:1}50%{transform:translateX(calc(var(--i) * 12px - 24px));opacity:.4}'],
    ['blink', 'Typing Blink', '0%,100%{opacity:.15;transform:scale(.8)}40%{opacity:1;transform:scale(1.15)}'],
    ['arc-jump', 'Arc Jump', '0%,100%{transform:translate(0,0)}25%{transform:translate(6px,-16px)}50%{transform:translate(14px,0)}75%{transform:translate(6px,10px)}'],
    ['grow', 'Elastic Grow', '0%,100%{transform:scale(.4);opacity:.4}50%{transform:scale(1);opacity:1}'],
    ['color-pop', 'Colour Pop', '0%,100%{background:var(--c1,' + C1 + ');transform:scale(.85)}50%{background:var(--c2,' + C2 + ');transform:scale(1.25)}']
  ];
  dotFx.forEach(function (d) {
    [3, 4, 5, 7].forEach(function (n) {
      if (n > 5 && ['arc-jump', 'spread', 'orbit-dot'].indexOf(d[0]) > -1) return;
      push({
        family: 'dots',
        id: 'dots-' + d[0] + '-' + n,
        title: n + ' ' + d[1],
        tags: ['css', 'dots'],
        html: '<div class="dt">' + cells(n) + '</div>',
        css: join([
          '.dt{display:flex;gap:var(--gap,12px);align-items:center}',
          '.dt i{width:var(--dot,16px);height:var(--dot,16px);border-radius:var(--radius,50%);background:var(--c1,' + C1 + ');animation:dt' + d[0] + ' var(--dur,1s) var(--ease,cubic-bezier(.3,.6,.3,1)) infinite;animation-delay:calc(var(--i) * var(--step,-.12s));box-shadow:0 0 var(--glow,0px) var(--c1,' + C1 + ')}',
          kf('dt' + d[0], d[2])
        ]),
        cfg: [range('Dots', '--dot', 6, 30, 1, 16, 'px'), range('Gap', '--gap', 2, 28, 1, 12, 'px'),
          range('Corner', '--radius', 0, 50, 1, 50, '%'), range('Cycle', '--dur', .3, 3, .05, 1, 's'),
          range('Stagger', '--step', -.4, -.02, .01, -.12, 's'), col('Colour', '--c1', C1), col('Colour B', '--c2', C2),
          range('Halo', '--glow', 0, 26, 1, 0, 'px')]
      });
    });
  });

  /* ═══════════════ 4. square grids ═══════════════ */
  [[3, 'flip', 'Flip Grid', '.g i{animation:gf var(--dur,1.5s) cubic-bezier(.5,0,.4,1) infinite;animation-delay:calc((var(--i) - var(--j)) * -.12s)}'],
   [3, 'ripple', 'Ripple Grid', '.g i{animation:gr var(--dur,1.6s) ease-out infinite;animation-delay:calc((var(--i) + var(--j)) * -.14s)}'],
   [4, 'snake', 'Snake Grid', '.g i{animation:gs var(--dur,1.8s) steps(1,end) infinite;animation-delay:calc((var(--i) + var(--j) * 4) * -.12s)}'],
   [4, 'diagonal', 'Diagonal Sweep Grid', '.g i{animation:gd var(--dur,1.4s) ease-in-out infinite alternate;animation-delay:calc((var(--i) - var(--j)) * -.1s)}'],
   [5, 'checker', 'Checker Pulse Grid', '.g i{animation:gc var(--dur,1.2s) ease-in-out infinite;animation-delay:calc(mod(var(--i) + var(--j),2) * -.6s)}'],
   [3, 'spiral', 'Spiral Grid', '.g i{animation:gsp var(--dur,1.9s) cubic-bezier(.4,.1,.3,1) infinite;animation-delay:calc(var(--o) * -.19s)}'],
   [4, 'fade', 'Fade Mosaic', '.g i{animation:gf2 var(--dur,2.2s) ease-in-out infinite;animation-delay:calc(var(--o) * -.16s)}'],
   [5, 'scale', 'Breathing Mosaic', '.g i{animation:gsc var(--dur,1.6s) var(--ease,ease-in-out) infinite;animation-delay:calc(var(--o) * -.08s)}']
  ].forEach(function (g) {
    var n = g[0], css = g[3];
    var tiles = [];
    for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) {
      var o = Math.abs(i - (n - 1) / 2) + Math.abs(j - (n - 1) / 2) + (i < (n - 1) / 2 ? 0 : .5) + (j < (n - 1) / 2 ? 0 : .25);
      tiles.push('<i style="--i:' + i + ';--j:' + j + ';--o:' + (Math.round(o * 100) / 100) + '"></i>');
    }
    push({
      family: 'grid', id: 'grid-' + g[1] + '-' + n, title: g[1][0].toUpperCase() + g[1].slice(1) + ' Grid ' + n + '×' + n,
      tags: ['css', 'grid'],
      html: '<div class="g">' + tiles.join('') + '</div>',
      css: join([
        '.g{display:grid;grid-template-columns:repeat(' + n + ',var(--cell,18px));gap:var(--gap,6px)}',
        '.g i{aspect-ratio:1;border-radius:var(--radius,4px);background:linear-gradient(140deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));transform-style:preserve-3d}',
        css,
        kf('gf', '0%,20%{transform:rotateX(0)}70%,100%{transform:rotateX(180deg);opacity:.35}'),
        kf('gr', '0%,70%,100%{transform:scale(1);opacity:.35}25%{transform:scale(1.28);opacity:1}'),
        kf('gs', '0%,12%{background:var(--c1,' + C1 + ')}30%,100%{background:rgba(140,140,180,.22)}'),
        kf('gd', '0%{transform:translateY(-6px) scale(.8);opacity:.35}100%{transform:translateY(6px) scale(1.1);opacity:1}'),
        kf('gc', '0%,100%{transform:scale(.55);opacity:.35}50%{transform:scale(1);opacity:1}'),
        kf('gsp', '0%,100%{transform:scale(.5) rotate(0);opacity:.4}45%{transform:scale(1.15) rotate(140deg);opacity:1}'),
        kf('gf2', '0%,100%{opacity:.18}50%{opacity:1}'),
        kf('gsc', '0%,100%{transform:scale(.7)}50%{transform:scale(1.06)}')
      ]),
      cfg: [range('Cell', '--cell', 8, 34, 1, 18, 'px'), range('Gap', '--gap', 0, 18, 1, 6, 'px'),
        range('Corner', '--radius', 0, 12, 1, 4, 'px'), range('Cycle', '--dur', .5, 4, .05, 1.5, 's'),
        col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
    });
  });

  /* ═══════════════ 5. equalizer bars ═══════════════ */
  [['eq-rise', 'Rising Bars', '0%,100%{transform:scaleY(.18)}50%{transform:scaleY(1)}', 'flex-end'],
   ['eq-mirror', 'Mirror Bars', '0%,100%{transform:scaleY(.1)}50%{transform:scaleY(1)}', 'center'],
   ['eq-scramble', 'Scramble Bars', '0%{transform:scaleY(.3)}20%{transform:scaleY(1)}40%{transform:scaleY(.55)}60%{transform:scaleY(.95)}80%{transform:scaleY(.4)}100%{transform:scaleY(.3)}', 'flex-end'],
   ['eq-slide', 'Sliding Bars', '0%{transform:translateX(-30%) scaleY(.4)}50%{transform:translateX(0) scaleY(1)}100%{transform:translateX(30%) scaleY(.4)}', 'center'],
   ['eq-wave', 'Wave Bars', '0%,100%{transform:scaleY(.25) translateY(0)}50%{transform:scaleY(1) translateY(-6px)}', 'flex-end'],
   ['eq-fade', 'Fading Bars', '0%,100%{opacity:.2}50%{opacity:1}', 'stretch'],
   ['eq-spread', 'Spreading Bars', '0%,100%{transform:scaleY(.2) scaleX(.6)}50%{transform:scaleY(1) scaleX(1.05)}', 'center'],
   ['eq-hue', 'Rainbow Bars', '0%,100%{transform:scaleY(.2);filter:brightness(.7)}50%{transform:scaleY(1);filter:brightness(1.2)}', 'flex-end']
  ].forEach(function (e) {
    [5, 7, 9, 12].forEach(function (n) {
      push({
        family: 'eq', id: e[0] + '-' + n, title: e[1] + ' ' + n, tags: ['css', 'bars', 'audio'],
        html: '<div class="eq">' + cells(n) + '</div>',
        css: join([
          '.eq{display:flex;align-items:' + (e[3] === 'stretch' ? 'stretch' : e[3]) + ';gap:var(--gap,5px);height:var(--h,64px);width:calc(var(--n,' + n + ') * var(--w,9px) + (var(--n,' + n + ') - 1) * var(--gap,5px))}',
          '.eq i{flex:1;border-radius:var(--radius,99px);background:var(--bar,linear-gradient(' + (e[3] === 'center' ? '180deg' : 'to top') + ',var(--c1,' + C1 + '),var(--c2,' + C2 + ')));height:100%;transform-origin:' + (e[3] === 'center' ? 'center' : 'bottom') + ';animation:' + e[0] + ' var(--dur,.9s) var(--ease,ease-in-out) infinite;animation-delay:calc(var(--i) * var(--step,-.11s))}' +
          (e[0] === 'eq-hue' ? '.eq i{background:hsl(calc(var(--i) * 26) 90% 60%)}' : ''),
          kf(e[0], e[2])
        ]),
        cfg: [range('Bars', '--w', 4, 20, 1, 9, 'px'), range('Height', '--h', 28, 120, 2, 64, 'px'),
          range('Gap', '--gap', 1, 16, 1, 5, 'px'), range('Corner', '--radius', 0, 12, 1, 8, 'px'),
          range('Cycle', '--dur', .3, 3, .05, .9, 's'), range('Stagger', '--step', -.4, -.02, .01, -.11, 's'),
          col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
      });
    });
  });

  /* ═══════════════ 6. orbits ═══════════════ */
  [['orbit-tilt', 'Tilted Orbits', '.ob i{transform:rotateX(var(--tilt,70deg)) rotate(calc(var(--i) * 60deg));animation-duration:calc(var(--dur,4s) * (1 + var(--i) * .35))}'],
   ['orbit-flat', 'Flat Orbit Ring', '.ob i{transform:rotate(calc(var(--i) * 45deg));animation-duration:calc(var(--dur,3s) + var(--i) * .4s);border-style:solid;border-color:color-mix(in srgb,var(--c1,' + C1 + ') 35%,transparent)}'],
   ['orbit-atom', 'Atom Nucleus', '.ob i{border-style:dashed;transform:rotateX(66deg) rotateY(calc(var(--i) * 40deg));animation-duration:calc(var(--dur,5s) * (1 + var(--i) * .25))}'],
   ['orbit-eclipse', 'Eclipse', '.ob i{border-color:transparent;transform:rotate(calc(var(--i) * 90deg));animation-duration:var(--dur,3.2s)}'],
   ['orbit-saturn', 'Saturn Rings', '.ob i{transform:rotateX(74deg);border-width:calc(var(--thick,2px) + var(--i) * 1px);animation-duration:calc(var(--dur,6s) - var(--i) * .8s);border-color:color-mix(in srgb,var(--c2,' + C2 + ') 60%,transparent)}'],
   ['orbit-cross', 'Crossed Paths', '.ob i{transform:rotate(calc(var(--i) * 60deg)) rotateX(60deg);animation-direction:' + 'alternate' + ';animation-duration:calc(var(--dur,2.6s) + var(--i) * .3s)}']
  ].forEach(function (o) {
    [3, 4, 6].forEach(function (n) {
      var kids = '';
      for (var i = 0; i < n; i++) kids += '<i style="--i:' + i + '"><b></b></i>';
      push({
        family: 'orbit', id: o[0] + '-' + n, title: o[1] + ' ' + n, tags: ['css', 'orbit', '3d'],
        html: '<div class="ob">' + kids + '</div>',
        css: join([
          '.ob{position:relative;width:var(--size,110px);height:var(--size,110px);perspective:700px;transform-style:preserve-3d}',
          '.ob i{position:absolute;border-radius:50%;border:1px dashed color-mix(in srgb,var(--c1,' + C1 + ') 30%,transparent);animation:obspin var(--dur,4s) linear infinite}',
          '.ob i b{position:absolute;top:calc(var(--moon,11px) / -2);left:calc(50% - var(--moon,11px) / 2);width:var(--moon,11px);height:var(--moon,11px);border-radius:50%;background:var(--c1,' + C1 + ');box-shadow:0 0 var(--glow,12px) var(--c1,' + C1 + ')}',
          '.ob i:nth-child(1){inset:0}.ob i:nth-child(2){inset:16%}.ob i:nth-child(3){inset:32%}.ob i:nth-child(4){inset:44%}.ob i:nth-child(5){inset:52%}.ob i:nth-child(6){inset:58%}',
          '.ob i:nth-child(2) b{background:var(--c2,' + C2 + ')}',
          '.ob i:nth-child(3) b{background:var(--c3,' + C3 + ')}',
          o[2],
          kf('obspin', 'to{transform:rotate(calc(var(--i,0) * 60deg) rotate(1turn))}')
        ]),
        cfg: [range('Diameter', '--size', 60, 160, 2, 110, 'px'), range('Moon', '--moon', 4, 22, 1, 11, 'px'),
          range('Tilt', '--tilt', 0, 84, 1, 70, 'deg'), range('Orbit', '--dur', 1, 12, .1, 4, 's'),
          range('Halo', '--glow', 0, 30, 1, 12, 'px'), col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
      });
    });
  });

  /* ═══════════════ 7. progress-style loaders (some JS) ═══════════════ */
  [
    ['prog-stripes', 'Stripes March', false, '.ps i{background:repeating-linear-gradient(115deg,var(--c1,' + C1 + ') 0 10px,transparent 10px 20px);animation:psm var(--dur,1s) linear infinite}', '.ps{width:var(--w,220px);height:var(--h,14px);border-radius:99px;background:rgba(140,140,180,.2);overflow:hidden;position:relative}.ps i{position:absolute;inset:0;border-radius:99px}', 'Cycle', 1],
    ['prog-fill', 'Fill To End', false, '.ps i{animation:psf var(--dur,2.4s) var(--ease,cubic-bezier(.5,.1,.3,1)) infinite}', '.ps{width:var(--w,220px);height:var(--h,14px);border-radius:99px;background:rgba(140,140,180,.2);overflow:hidden;position:relative}.ps i{position:absolute;inset:0 auto 0 0;border-radius:99px;background:linear-gradient(90deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '))}', 'Cycle', 2.4],
    ['prog-buffer', 'Buffer + Load', false, '.ps i{animation:psf var(--dur,2.6s) ease-out infinite}.ps b{animation:psb var(--dur,2.6s) ease-out infinite}', '.ps{width:var(--w,220px);height:var(--h,16px);border-radius:99px;background:rgba(140,140,180,.18);overflow:hidden;position:relative}.ps i,.ps b{position:absolute;inset:0 auto 0 0;border-radius:99px}.ps b{background:rgba(255,255,255,.18)}.ps i{background:var(--c1,' + C1 + ')}', 'Cycle', 2.6],
    ['prog-ticks', 'Tick Meter', false, '.ps{width:var(--w,220px);height:var(--h,26px);display:flex;gap:3px;align-items:flex-end}.ps i{flex:1;background:rgba(140,140,180,.25);border-radius:2px;height:40%;animation:pst var(--dur,1.6s) steps(1,end) infinite;animation-delay:calc(var(--i) * -.12s)}', '.ps i{background:var(--c1,' + C1 + ')}' + kf('pst', '0%,10%{height:100%;background:var(--c1,' + C1 + ')}11%,100%{height:38%;background:rgba(140,140,180,.3)}'), 'Cycle', 1.6],
    ['prog-percent', 'Percent Counter', true, '.pp{position:relative;width:var(--size,110px);height:var(--size,110px);border-radius:50%;display:grid;place-items:center;background:conic-gradient(var(--c1,' + C1 + ') calc(var(--p,0) * 1%),rgba(140,140,180,.18) 0)}\n.pp b{position:relative;font:700 20px "JetBrains Mono",monospace;color:#e8e8f5}\n.pp::after{content:"";position:absolute;inset:12%;border-radius:50%;background:#0c0c16}', '', 'Cycle', 0],
    ['prog-steps', 'Step Dots', false, '.ps{display:flex;gap:var(--gap,10px);align-items:center}.ps i{width:var(--dot,12px);height:var(--dot,12px);border-radius:50%;background:rgba(140,140,180,.3);animation:pss var(--dur,2s) steps(1,end) infinite;animation-delay:calc(var(--i) * -.4s)}.ps i:not(:last-child)::after{content:"";position:absolute;left:calc(var(--dot,12px) + 2px);top:calc(var(--dot,12px)/2 - 1px);width:var(--gap,10px);height:2px;background:rgba(140,140,180,.3)}', '.ps{display:flex;gap:var(--gap,10px);align-items:center}', 'Cycle', 2]
  ].forEach(function (p) {
    var n = p[0] === 'prog-ticks' ? 12 : p[0] === 'prog-steps' ? 4 : 2;
    var item = {
      family: 'progress', id: p[0], title: p[1], tags: p[2] ? ['js', 'progress'] : ['css', 'progress'],
      html: p[0] === 'prog-percent' ? '<div class="pp"><b>0%</b></div>'
        : '<div class="' + 'ps' + '">' + (p[0] === 'prog-buffer' ? cells(1) + '<b></b>' : cells(n)) + '</div>',
      css: join([p[3], p[4], kf('psm', 'to{background-position:40px 0}'), kf('psf', '0%{width:2%}70%,100%{width:100%}'), kf('psb', '0%{width:8%}85%,100%{width:100%;opacity:0}'), kf('pss', '0%,24%{background:var(--c1,' + C1 + ');transform:scale(1.25)}25%,100%{background:rgba(140,140,180,.3);transform:scale(1)}')]),
      cfg: [range('Speed', '--dur', .4, 5, .05, p[6], 's'), col('Colour', '--c1', C1), col('Colour B', '--c2', C2),
        range('Width', '--w', 120, 320, 4, 220, 'px'), range('Height', '--h', 6, 30, 1, 14, 'px')]
    };
    if (p[2]) {
      item.css = p[3];
      item.js = 'var el=root.querySelector(".pp"),t=0;' +
        'api.raf(function(){t=(t+.7)%101;el.style.setProperty("--p",t.toFixed(1));el.querySelector("b").textContent=Math.floor(t)+"%";});';
    }
    push(item);
  });

  /* ═══════════════ 8. shape mechanics ═══════════════ */
  [['sh-flip', 'Flip Card Square', '.sq{width:var(--size,64px);height:var(--size,64px);border-radius:var(--radius,12px);background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));animation:sqf var(--dur,2s) cubic-bezier(.5,0,.4,1) infinite}', 'sqf', '0%{transform:perspective(300px) rotateY(0) rotateX(0)}50%{transform:perspective(300px) rotateY(180deg) rotateX(0)}100%{transform:perspective(300px) rotateY(180deg) rotateX(180deg)}'],
   ['sh-pacman', 'Pac-Man Chomp', '.sq{width:0;height:0;border:var(--size,32px) solid transparent;border-right-color:var(--c1,' + C1 + ');border-radius:50%;animation:sqp var(--dur,.7s) ease-in-out infinite alternate}', 'sqp', '0%{transform:rotate(0)}100%{transform:rotate(-24deg)}'],
   ['sh-hourglass', 'Turned Hourglass', '.sq{width:var(--size,46px);height:calc(var(--size,46px) * 1.5);background:conic-gradient(from 45deg,var(--c1,' + C1 + ') 0 90deg,transparent 90deg 180deg,var(--c1,' + C1 + ') 180deg 270deg,transparent 270deg);clip-path:polygon(0 0,100% 0,50% 50%,100% 100%,0 100%,50% 50%);animation:sqh var(--dur,2s) cubic-bezier(.7,0,.3,1) infinite}', 'sqh', '0%,45%{transform:rotate(0)}60%,100%{transform:rotate(180deg)}'],
   ['sh-blob', 'Morphing Blob Loader', '.sq{width:var(--size,80px);height:var(--size,80px);background:radial-gradient(circle at 30% 30%,var(--c2,' + C2 + '),var(--c1,' + C1 + '));border-radius:50%;animation:sqb var(--dur,4s) ease-in-out infinite}', 'sqb', '0%,100%{border-radius:50% 50% 50% 50%/50% 50% 50% 50%;transform:rotate(0)}25%{border-radius:62% 38% 46% 54%/55% 60% 40% 45%;transform:rotate(60deg) scale(1.06)}50%{border-radius:40% 60% 65% 35%/45% 38% 62% 55%;transform:rotate(140deg)}75%{border-radius:55% 45% 35% 65%/60% 45% 55% 40%;transform:rotate(220deg) scale(.95)}'],
   ['sh-triangle', 'Triangle Pivot', '.sq{width:0;height:0;border-left:var(--size,32px) solid transparent;border-right:var(--size,32px) solid transparent;border-bottom:calc(var(--size,32px) * 1.7) solid var(--c1,' + C1 + ');animation:sqt var(--dur,2.6s) cubic-bezier(.6,0,.4,1) infinite}', 'sqt', '0%{transform:rotate(0) scale(1)}50%{transform:rotate(180deg) scale(.8)}100%{transform:rotate(360deg) scale(1)}'],
   ['sh-cube-3', 'Corner Cube Stack', '.sq{position:relative;width:var(--size,44px);height:var(--size,44px);transform-style:preserve-3d;animation:sq3 var(--dur,4s) linear infinite}.sq i{position:absolute;inset:0;background:var(--c1,' + C1 + ');opacity:.9}.sq i:nth-child(1){transform:translateZ(calc(var(--size,44px)/2))}.sq i:nth-child(2){transform:rotateY(90deg) translateZ(calc(var(--size,44px)/2));background:var(--c2,' + C2 + ')}.sq i:nth-child(3){transform:rotateX(90deg) translateZ(calc(var(--size,44px)/2));background:var(--c3,' + C3 + ')}', 'sq3', '0%{transform:rotateX(-20deg) rotateY(0)}100%{transform:rotateX(-20deg) rotateY(360deg)}'],
   ['sh-bars-twist', 'Twisting Bars', '.sq{display:flex;gap:3px;align-items:center}.sq i{width:var(--w,6px);height:var(--h,54px);background:var(--c1,' + C1 + ');border-radius:3px;animation:sqtw var(--dur,1.4s) ease-in-out infinite;animation-delay:calc(var(--i) * -.08s)}', 'sqtw', '0%,100%{transform:rotateY(0) scaleY(.4)}50%{transform:rotateY(180deg) scaleY(1)}'],
   ['sh-ring-drop', 'Ring Drop', '.sq{position:relative;width:var(--size,70px);height:var(--size,70px)}.sq i{position:absolute;inset:0;border-radius:50%;border:var(--thick,4px) solid var(--c1,' + C1 + ');animation:sqd var(--dur,1.8s) cubic-bezier(.3,.7,.3,1) infinite;animation-delay:calc(var(--i) * -.6s)}', 'sqd', '0%{transform:translateY(-70%) scale(.5);opacity:0}30%{opacity:1}100%{transform:translateY(70%) scale(1);opacity:0}'],
   ['sh-atom', 'Atom Shells', '.sq{position:relative;width:var(--size,96px);height:var(--size,96px)}.sq i{position:absolute;inset:0;border:2px solid var(--c1,' + C1 + ');border-radius:50%;transform:rotate(calc(var(--i) * 60deg)) scaleY(.42);animation:sqa var(--dur,2.4s) linear infinite}.sq i::after{content:"";position:absolute;width:10px;height:10px;border-radius:50%;background:var(--c2,' + C2 + ');top:-5px;left:calc(50% - 5px)}', 'sqa', '0%{transform:rotate(calc(var(--i) * 60deg)) scaleY(.42)}100%{transform:rotate(calc(var(--i) * 60deg + 360deg)) scaleY(.42)}'],
   ['sh-squares-in', 'Nested Squares In', '.sq{position:relative;width:var(--size,84px);height:var(--size,84px)}.sq i{position:absolute;inset:0;border:var(--thick,3px) solid var(--c1,' + C1 + ');border-radius:var(--radius,10px);animation:sqn var(--dur,2s) cubic-bezier(.5,0,.4,1) infinite;animation-delay:calc(var(--i) * -.24s)}', 'sqn', '0%{transform:scale(1.1) rotate(0);opacity:0}40%{opacity:1}100%{transform:scale(.05) rotate(90deg);opacity:0}']
  ].forEach(function (s, i) {
    var kids = ['sh-cube-3', 'sh-bars-twist', 'sh-ring-drop', 'sh-atom', 'sh-squares-in'].indexOf(s[0]) > -1
      ? cells(s[0] === 'sh-bars-twist' ? 7 : s[0] === 'sh-atom' ? 3 : s[0] === 'sh-squares-in' ? 4 : 3) : '';
    push({
      family: 'shapes', id: s[0], title: s[1], tags: ['css', 'shape'],
      html: '<div class="sq">' + kids + '</div>',
      css: join([s[2], kf(s[3], s[4])]),
      cfg: [range('Size', '--size', 30, 130, 2, 70, 'px'), range('Cycle', '--dur', .4, 4, .05, 1.8, 's'),
        range('Corner', '--radius', 0, 26, 1, 12, 'px'), range('Stroke', '--thick', 1, 12, 1, 4, 'px'),
        col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
    });
  });

  /* ═══════════════ 9. skeleton loaders ═══════════════ */
  [['skel-lines', 'Shimmer Lines', 3, '.sk2 i{height:var(--h,12px);border-radius:99px}', '0%,100%{background-position:-140% 0}50%,100%{background-position:240% 0}'],
   ['skel-card', 'Card Placeholder', 0, '.sk2{width:var(--w,220px);border-radius:var(--radius,14px);padding:14px;display:grid;gap:10px;background:rgba(140,140,180,.1)}', '', ''],
   ['skel-avatar', 'Profile Row', 0, '.sk2{display:flex;gap:12px;align-items:center}', '', ''],
   ['skel-list', 'List Rows', 5, '.sk2{display:grid;gap:9px}', '', ''],
   ['skel-image', 'Image Block', 0, '.sk2{width:var(--w,200px);height:var(--h,120px);border-radius:var(--radius,12px)}', '', ''],
   ['skel-wave', 'Wave Sweep', 8, '.sk2{display:flex;gap:6px;align-items:flex-end;height:var(--h,54px)}.sk2 i{flex:1;border-radius:4px}', '', '']
  ].forEach(function (s) {
    var body;
    if (s[0] === 'skel-card') body = '<div class="sk2"><i style="--i:0;width:60%"></i><i style="--i:1;width:100%"></i><i style="--i:2;width:85%"></i></div>';
    else if (s[0] === 'skel-avatar') body = '<div class="sk2"><b style="--i:0"></b><i style="--i:1"></i><i style="--i:2"></i></div>';
    else if (s[0] === 'skel-image') body = '<div class="sk2"></div>';
    else body = '<div class="sk2">' + cells(s[2] || 3) + '</div>';
    var shimmer = 'background:linear-gradient(90deg,rgba(140,140,180,.14) 0 38%,color-mix(in srgb,var(--c1,' + C1 + ') 55%,rgba(140,140,180,.2)) 50%,rgba(140,140,180,.14) 62% 100%) 0 0 / 260% 100%;animation:sksh var(--dur,1.7s) ease-in-out infinite;animation-delay:calc(var(--i) * -.09s)';
    push({
      family: 'skeleton', id: s[0], title: s[1] + ' Skeleton', tags: ['css', 'skeleton'],
      html: body,
      css: join([
        '.sk2{width:var(--w,220px);display:flex;flex-direction:column;gap:9px}',
        '.sk2 i,.sk2 b{display:block;height:var(--h,13px);border-radius:var(--radius,7px);' + shimmer + ';background:linear-gradient(90deg,rgba(140,140,180,.16) 0 38%,color-mix(in srgb,var(--c1,' + C1 + ') 60%,rgba(140,140,180,.2)) 50%,rgba(140,140,180,.16) 62% 100%) 0 0/260% 100%}',
        '.sk2 b{width:52px;height:52px;border-radius:50%}',
        '.sk2 i:nth-child(2){width:82%}.sk2 i:nth-child(3){width:64%}',
        kf('sksh', '0%{background-position:-160% 0}100%{background-position:260% 0}')
      ]),
      cfg: [range('Width', '--w', 120, 320, 4, 220, 'px'), range('Line', '--h', 6, 26, 1, 13, 'px'),
        range('Corner', '--radius', 0, 26, 1, 7, 'px'), range('Cycle', '--dur', .6, 4, .05, 1.7, 's'), col('Shine', '--c1', C1)]
    });
  });

  /* ═══════════════ 10. ripples, beacons, pulses ═══════════════ */
  [['rip-double', 'Double Ripple', 2, '.rp i{animation:rp var(--dur,2s) cubic-bezier(0,.2,.8,1) infinite;animation-delay:calc(var(--i) * var(--dur,2s) / -2)}'],
   ['rip-triple', 'Triple Ripple', 3, '.rp i{animation:rp var(--dur,2.4s) cubic-bezier(0,.2,.8,1) infinite;animation-delay:calc(var(--i) * -.8s)}'],
   ['rip-square', 'Square Ripple', 3, '.rp i{border-radius:var(--radius,12px);animation:rps var(--dur,2.2s) ease-out infinite;animation-delay:calc(var(--i) * -.7s)}'],
   ['beacon', 'Sonar Beacon', 3, '.rp i{animation:bkc var(--dur,2.2s) ease-out infinite;animation-delay:calc(var(--i) * -.7s);border-color:var(--c2,' + C2 + ')}'],
   ['pulse-core', 'Pulsing Core', 1, '.rp i{animation:pcc var(--dur,1.4s) ease-in-out infinite;background:var(--c1,' + C1 + ');border:0}'],
   ['heartbeat', 'Heartbeat Rings', 2, '.rp i{animation:hbt var(--dur,1.5s) cubic-bezier(.2,.8,.3,1) infinite;animation-delay:calc(var(--i) * -.18s)}'],
   ['ping-dot', 'Ping & Dot', 2, '.rp i:first-child{animation:ping var(--dur,1.8s) ease-out infinite}.rp i:nth-child(2){inset:38%;background:var(--c1,' + C1 + ');border:0;animation:pingdot var(--dur,1.8s) ease-out infinite}'],
   ['halo-breathe', 'Halo Breathe', 4, '.rp i{animation:hlb var(--dur,3s) ease-in-out infinite;animation-delay:calc(var(--i) * -.7s);border-style:solid;border-color:color-mix(in srgb,var(--c1,' + C1 + ') 70%,transparent)}'],
   ['sonar-sweep', 'Sonar Sweep', 1, '.rp i{background:conic-gradient(from 0deg,transparent 0 250deg,color-mix(in srgb,var(--c2,' + C2 + ') 75%,transparent) 320deg,var(--c2,' + C2 + ') 360deg);border:0;animation:swp var(--dur,2.6s) linear infinite;opacity:.7}'],
   ['ripple-lines', 'Ripple Lines', 5, '.rp{display:grid;gap:6px;place-items:center}.rp i{width:var(--size,90px);height:3px;border:0;border-radius:2px;background:var(--c1,' + C1 + ');animation:rl var(--dur,1.8s) ease-in-out infinite;animation-delay:calc(var(--i) * -.15s)}']
  ].forEach(function (r) {
    push({
      family: 'ripple', id: r[0], title: r[1], tags: ['css', 'pulse'],
      html: '<div class="rp">' + cells(r[2], 'i', ' class="rg"') + '</div>',
      css: join([
        '.rp{position:relative;width:var(--size,90px);height:var(--size,90px);display:grid;place-items:center}',
        '.rp i{position:absolute;inset:0;border:var(--thick,3px) solid var(--c1,' + C1 + ');border-radius:50%}',
        r[3],
        kf('rp', '0%{transform:scale(.18);opacity:1}100%{transform:scale(1);opacity:0}'),
        kf('rps', '0%{transform:scale(.2) rotate(0);opacity:1}100%{transform:scale(1) rotate(45deg);opacity:0}'),
        kf('bkc', '0%{transform:scale(.1);opacity:.9}70%{opacity:.15}100%{transform:scale(1.15);opacity:0}'),
        kf('pcc', '0%,100%{transform:scale(.75);opacity:.65}50%{transform:scale(1.05);opacity:1}'),
        kf('hbt', '0%{transform:scale(.2);opacity:1}18%{transform:scale(.42)}30%{transform:scale(.3)}55%,100%{transform:scale(1);opacity:0}'),
        kf('ping', '0%{transform:scale(.3);opacity:.85}80%,100%{transform:scale(1.1);opacity:0}'),
        kf('pingdot', '0%,60%,100%{transform:scale(1)}30%{transform:scale(1.25)}'),
        kf('hlb', '0%,100%{transform:scale(.55);opacity:.15}50%{transform:scale(1);opacity:.75}'),
        kf('swp', 'to{transform:rotate(1turn)}'),
        kf('rl', '0%,100%{transform:scaleX(.25);opacity:.3}50%{transform:scaleX(1);opacity:1}')
      ]),
      cfg: [range('Size', '--size', 40, 150, 2, 90, 'px'), range('Ring', '--thick', 1, 12, 1, 3, 'px'),
        range('Cycle', '--dur', .6, 5, .05, 2, 's'), range('Corner', '--radius', 0, 40, 1, 12, 'px'),
        col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
    });
  });

  /* ═══════════════ 11. JS-driven loaders (canvas + physics) ═══════════════ */
  var jsLoaders = [
    { id: 'js-canvas-orbit', title: 'Canvas Orbit Field',
      html: '<canvas class="cv"></canvas>',
      css: '.cv{display:block;width:var(--size,170px);height:var(--size,170px)}',
      js: 'var c=root.querySelector(".cv"),g=c.getContext("2d"),d=Math.min(2,window.devicePixelRatio||1),t=0,N=48;\n' +
          'c.width=Math.round(c.clientWidth*d);c.height=Math.round(c.clientHeight*d);\n' +
          'api.raf(function(){\n' +
          '  t+=.02;var w=c.width,h=c.height;g.clearRect(0,0,w,h);\n' +
          '  for(var i=0;i<N;i++){var a=t+i*.62,rr=(i%4+1)*17*d;\n' +
          '    g.beginPath();g.arc(w/2+Math.cos(a)*rr,h/2+Math.sin(a)*rr*(i%2?.62:.96),2.3*d,0,6.284);\n' +
          '    g.fillStyle=i%3?"#22d3ee":"#7c5cff";g.globalAlpha=.3+.7*Math.abs(Math.sin(a));g.fill();}\n' +
          '});',
      cfg: [range('Size', '--size', 80, 260, 2, 170, 'px')] },

    { id: 'js-count-up', title: 'Percent Count Up',
      html: '<div class="jc"><b>0</b><i></i></div>',
      css: '.jc{position:relative;width:var(--size,120px);height:var(--size,120px);border-radius:50%;background:conic-gradient(var(--c1,' + C1 + ') calc(var(--p,0) * 1%),rgba(140,140,180,.18) 0);display:grid;place-items:center}\n' +
           '.jc::after{content:"";position:absolute;inset:14%;border-radius:50%;background:#0c0c16}\n' +
           '.jc b{position:relative;font:700 22px "JetBrains Mono",monospace;color:#e8e8f5}',
      js: 'var el=root.querySelector(".jc"),b=root.querySelector("b"),v=0;\n' +
          'api.raf(function(){v+=1.1;if(v>100)v=0;b.textContent=Math.floor(v);el.style.setProperty("--p",v.toFixed(1));});',
      cfg: [range('Size', '--size', 80, 200, 2, 120, 'px'), col('Colour', '--c1', C1)] },

    { id: 'js-bar-breathe', title: 'Auto Breathe Bar',
      html: '<div class="jb"><i></i></div>',
      css: '.jb{width:var(--size,220px);height:var(--h,12px);border-radius:99px;background:rgba(140,140,180,.2);overflow:hidden}\n' +
           '.jb i{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '))}',
      js: 'var b=root.querySelector(".jb i"),p=0,d=1;\n' +
          'api.raf(function(){p+=d*1.4;if(p>=100){p=100;d=-1}if(p<=0){p=0;d=1}b.style.width=p+"%";});',
      cfg: [range('Width', '--size', 120, 320, 2, 220, 'px'), range('Height', '--h', 4, 28, 1, 12, 'px'), col('Colour', '--c1', C1), col('Colour B', '--c2', C2)] },

    { id: 'js-trail', title: 'Comet Trail Dots',
      html: '<div class="jw">' + cells(9) + '</div>',
      css: '.jw{position:relative;width:var(--size,140px);height:var(--size,90px);display:grid;place-items:center}\n' +
           '.jw i{position:absolute;width:var(--dot,11px);height:var(--dot,11px);border-radius:50%;background:var(--c1,' + C1 + ')}\n' +
           '.jw i:nth-child(2n){background:var(--c2,' + C2 + ')}',
      js: 'var K=root.querySelectorAll(".jw i"),t=0;\n' +
          'api.raf(function(){t+=.045;\n' +
          '  for(var i=0;i<K.length;i++){var a=t-i*.3;\n' +
          '    K[i].style.transform="translate("+(Math.cos(a)*58).toFixed(1)+"px,"+(Math.sin(a*1.5)*24).toFixed(1)+"px) scale("+(1-i/K.length*.7).toFixed(2)+")";\n' +
          '    K[i].style.opacity=(1-i/K.length*.85).toFixed(2);}\n' +
          '});',
      cfg: [range('Width', '--size', 90, 220, 2, 140, 'px'), range('Dot', '--dot', 4, 20, 1, 11, 'px'), col('Colour', '--c1', C1), col('Colour B', '--c2', C2)] },

    { id: 'js-pendulum-wave', title: 'Pendulum Wave',
      html: '<div class="jp">' + cells(12) + '</div>',
      css: '.jp{display:flex;gap:var(--gap,9px);align-items:flex-start;height:var(--size,110px)}\n' +
           '.jp i{position:relative;width:var(--dot,8px);height:100%;background:linear-gradient(var(--c1,' + C1 + '),transparent 68%);transform-origin:50% 0;border-radius:99px}\n' +
           '.jp i::after{content:"";position:absolute;bottom:-2px;left:50%;width:calc(var(--dot,8px) * 1.8);height:calc(var(--dot,8px) * 1.8);margin-left:calc(var(--dot,8px) * -.9);border-radius:50%;background:var(--c2,' + C2 + ')}',
      js: 'var K=root.querySelectorAll(".jp i"),t=0;\n' +
          'api.raf(function(){t+=.03;\n' +
          '  for(var i=0;i<K.length;i++){K[i].style.transform="rotate("+(Math.sin(t*(.55+i*.05)*3.2)*36).toFixed(2)+"deg)";}\n' +
          '});',
      cfg: [range('Length', '--size', 60, 170, 2, 110, 'px'), range('Bob', '--dot', 4, 16, 1, 8, 'px'), range('Gap', '--gap', 2, 20, 1, 9, 'px'), col('Colour', '--c1', C1), col('Colour B', '--c2', C2)] },

    { id: 'js-metronome', title: 'Metronome Swing',
      html: '<div class="jm"><span class="arm"><b></b></span></div>',
      css: '.jm{position:relative;width:var(--size,130px);height:var(--size,120px);display:grid;place-items:end center}\n' +
           '.jm .arm{position:relative;display:block;width:4px;height:100%;border-radius:4px;background:linear-gradient(var(--c1,' + C1 + '),var(--c2,' + C2 + '));transform-origin:50% 100%}\n' +
           '.jm .arm b{position:absolute;left:50%;top:22%;width:20px;height:20px;margin-left:-10px;border-radius:50%;background:var(--c2,' + C2 + ');box-shadow:0 0 var(--glow,12px) var(--c2,' + C2 + ')}\n' +
           '.jm::after{content:"";position:absolute;bottom:0;left:50%;width:64px;height:5px;margin-left:-32px;border-radius:99px;background:rgba(140,140,180,.3)}',
      js: 'var n=root.querySelector(".jm .arm"),b=root.querySelector("b"),t=0;\n' +
          'api.raf(function(){t+=.035;var a=Math.sin(t)*32;n.style.transform="rotate("+a.toFixed(2)+"deg)";\n' +
          '  if(Math.abs(a)<.8&&!n.beat){n.beat=1;b.style.transform="scale(1.5)";setTimeout(function(){n.beat=0;b.style.transform="";},90);}});',
      cfg: [range('Size', '--size', 80, 200, 2, 130, 'px'), range('Halo', '--glow', 0, 30, 1, 12, 'px'), col('Colour', '--c1', C1), col('Colour B', '--c2', C2)] },

    { id: 'js-gears', title: 'Two Gear Clock',
      html: '<div class="jk"><i class="g1"></i><i class="g2"></i></div>',
      css: '.jk{position:relative;width:var(--size,130px);height:var(--size,130px)}\n' +
           '.jk i{position:absolute;border-radius:50%;border:var(--thick,4px) dashed var(--c1,' + C1 + ')}\n' +
           '.jk .g1{width:56%;height:56%;top:4%;left:2%}\n' +
           '.jk .g2{width:44%;height:44%;bottom:6%;right:6%;border-color:var(--c2,' + C2 + ')}\n' +
           '.jk::after{content:"";position:absolute;inset:38% 42%;border-radius:50%;background:rgba(140,140,180,.25)}',
      js: 'var a=root.querySelector(".g1"),b=root.querySelector(".g2"),t=0;\n' +
          'api.raf(function(){t+=1.1;a.style.transform="rotate("+t+"deg)";b.style.transform="rotate("+(-t*1.42)+"deg)";});',
      cfg: [range('Size', '--size', 80, 200, 2, 130, 'px'), range('Teeth', '--thick', 2, 12, 1, 4, 'px'), col('Colour', '--c1', C1), col('Colour B', '--c2', C2)] },

    { id: 'js-orbit-cluster', title: 'Depth Orbit Cluster',
      html: '<div class="jo">' + cells(9) + '</div>',
      css: '.jo{position:relative;width:var(--size,120px);height:var(--size,120px);display:grid;place-items:center}\n' +
           '.jo i{position:absolute;width:var(--dot,11px);height:var(--dot,11px);border-radius:50%;background:var(--c1,' + C1 + ')}\n' +
           '.jo i:nth-child(2n){background:var(--c2,' + C2 + ')}.jo i:nth-child(3n){background:var(--c3,' + C3 + ')}',
      js: 'var K=root.querySelectorAll(".jo i"),t=0;\n' +
          'api.raf(function(){t+=.03;\n' +
          '  for(var i=0;i<K.length;i++){var a=t+i*(6.283/K.length),r=36+Math.sin(t*2+i)*10,d=1+Math.sin(a)*.45;\n' +
          '    K[i].style.transform="translate("+(Math.cos(a)*r).toFixed(1)+"px,"+(Math.sin(a)*r*.62).toFixed(1)+"px) scale("+d.toFixed(2)+")";\n' +
          '    K[i].style.zIndex=Math.round(50+Math.sin(a)*50);}\n' +
          '});',
      cfg: [range('Size', '--size', 70, 190, 2, 120, 'px'), range('Dot', '--dot', 4, 20, 1, 11, 'px'), col('Colour', '--c1', C1), col('Colour B', '--c2', C2)] }
  ];
  jsLoaders.forEach(function (j) {
    push({ family: 'js', id: j.id, title: j.title, tags: ['js', 'loader'], html: j.html, css: j.css, js: j.js, cfg: j.cfg });
  });

  K.add('loaders', pool);
})(window);
