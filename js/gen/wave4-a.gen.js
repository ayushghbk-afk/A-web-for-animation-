/* ============================================================
   Motion Lab — wave 4, part A (loaders · buttons · text)
   Sixteen new mechanic families per category, rendered through the
   same MECHANIC × VARIANT matrix as the deep categories (20 variants
   per mechanic). Every variant differs in geometry, timing, easing,
   palette and rhythm — and every variable it exposes becomes a knob.
   House rule honoured: custom properties are only ever read with a
   fallback, never declared inside demo CSS.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit, V = global.MLVary;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color;
  var cells = K.cells, letters = K.letters;

  function D(v, mul) { return Math.round(v.dur * (mul || 1) * 100) / 100; }

  /* the knob row most loader/text variants share */
  function core(v, extra) {
    return [
      range('Cycle', '--dur', .2, 20, .05, v.dur, 's'),
      range('Stagger', '--step', 0, .6, .01, v.step, 's'),
      col('Colour', '--c1', v.c1),
      col('Colour B', '--c2', v.c2),
      col('Colour C', '--c3', v.c3)
    ].concat(extra || []);
  }

  /* ════════════════════════ LOADERS ════════════════════════ */
  var LD = [];

  /* 1. hourglass — glass tumbles half a turn while sand drains */
  LD.push({ key: 'hourglass', title: 'Hourglass Sand', tags: ['loader', 'css'], build: function (v) {
    var d = D(v, 1.6);
    return {
      html: '<div class="hg"><i class="t"></i><i class="b"></i></div>',
      css: join([
        '.hg{position:relative;width:var(--sz,62px);height:var(--sz,62px);animation:hou-' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.65,0,.35,1) infinite}',
        '.hg::before{content:"";position:absolute;inset:0;border-radius:8px;clip-path:polygon(0 0,100% 0,58% 50%,100% 100%,0 100%,42% 50%);background:color-mix(in srgb,var(--c3,' + v.c3 + ') 14%,transparent);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--c3,' + v.c3 + ') 65%,transparent)}',
        '.hg i{position:absolute;left:26%;width:48%;background:linear-gradient(180deg,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + '))}',
        '.hg .t{top:14%;height:28%;clip-path:polygon(0 0,100% 0,50% 100%);transform-origin:50% 0;animation:hos-' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.hg .b{bottom:14%;height:28%;clip-path:polygon(50% 0,100% 100%,0 100%);transform-origin:50% 100%;animation:hob-' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('hou-' + v.i, '0%,42%{transform:rotate(0)}50%,92%{transform:rotate(180deg)}100%{transform:rotate(360deg)}'),
        kf('hos-' + v.i, '0%{transform:scaleY(1)}40%,50%{transform:scaleY(.06)}55%{transform:scaleY(1)}90%,100%{transform:scaleY(.06)}'),
        kf('hob-' + v.i, '0%{transform:scaleY(.06)}40%,50%{transform:scaleY(1)}55%{transform:scaleY(.06)}90%,100%{transform:scaleY(1)}')
      ]),
      cfg: [range('Size', '--sz', 36, 120, 2, 62, 'px'), range('Cycle', '--dur', .5, 20, .1, d, 's'), col('Sand', '--c1', v.c1), col('Sand B', '--c2', v.c2), col('Glass', '--c3', v.c3)]
    };
  } });

  /* 2. newton cradle — end balls trade momentum */
  LD.push({ key: 'cradle', title: 'Newton Cradle', tags: ['loader', 'css'], build: function (v) {
    var a = 24 + (v.i % 5) * 3;
    return {
      html: '<div class="nc">' + cells(5) + '</div>',
      css: join([
        '.nc{display:flex;justify-content:center;gap:3px;padding-top:2px}',
        '.nc i{position:relative;width:var(--bw,15px);height:var(--hh,84px);transform-origin:50% 0}',
        '.nc i::before{content:"";position:absolute;left:calc(50% - .5px);top:0;width:1px;height:calc(100% - var(--bw,15px));background:rgba(190,190,215,.45)}',
        '.nc i::after{content:"";position:absolute;bottom:0;left:0;width:var(--bw,15px);height:var(--bw,15px);border-radius:50%;background:radial-gradient(circle at 34% 28%,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + ') 72%);box-shadow:0 4px 10px rgba(0,0,0,.45)}',
        '.nc i:first-child{animation:nca-' + v.i + ' var(--dur,' + v.dur + 's) var(--ease,cubic-bezier(.5,0,.5,1)) infinite}',
        '.nc i:last-child{animation:ncb-' + v.i + ' var(--dur,' + v.dur + 's) var(--ease,cubic-bezier(.5,0,.5,1)) infinite}',
        kf('nca-' + v.i, '0%,10%{transform:rotate(' + a + 'deg)}25%,55%{transform:rotate(0)}70%,80%{transform:rotate(' + a + 'deg)}95%,100%{transform:rotate(0)}'),
        kf('ncb-' + v.i, '0%,25%{transform:rotate(0)}40%,48%{transform:rotate(' + -a + 'deg)}65%,100%{transform:rotate(0)}')
      ]),
      cfg: core(v, [range('Ball', '--bw', 8, 30, 1, 15, 'px'), range('Height', '--hh', 40, 140, 2, 84, 'px'), K.select('Swing ease', '--ease', ['cubic-bezier(.5,0,.5,1)', 'ease-in-out', 'cubic-bezier(.6,0,.4,1)'], 'cubic-bezier(.5,0,.5,1)')])
    };
  } });

  /* 3. battery — cells charge in a row, then drain */
  LD.push({ key: 'battery', title: 'Charge Cells', tags: ['loader', 'css'], build: function (v) {
    var n = 3 + (v.i % 3);
    return {
      html: '<div class="bt">' + cells(n) + '<s class="tip"></s></div>',
      css: join([
        '.bt{display:flex;align-items:center;gap:3px;padding:4px 5px;border:2px solid color-mix(in srgb,var(--c3,' + v.c3 + ') 60%,transparent);border-radius:9px;background:rgba(10,10,20,.4)}',
        '.bt .tip{width:5px;height:15px;border-radius:0 4px 4px 0;background:color-mix(in srgb,var(--c3,' + v.c3 + ') 60%,transparent)}',
        '.bt i{width:var(--cw,16px);height:var(--ch,30px);border-radius:3px;background:linear-gradient(180deg,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + '));transform-origin:0 50%;animation:bat-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('bat-' + v.i, '0%,12%{transform:scaleX(.05);opacity:.2}58%,74%{transform:scaleX(1);opacity:1}100%{transform:scaleX(.05);opacity:.2}')
      ]),
      cfg: core(v, [range('Cell width', '--cw', 8, 34, 1, 16, 'px'), range('Cell height', '--ch', 14, 64, 2, 30, 'px')])
    };
  } });

  /* 4. hop dots — dots hop down the line with a squash landing */
  LD.push({ key: 'hopdots', title: 'Hop Dots', tags: ['loader', 'css'], build: function (v) {
    var n = 3 + (v.i % 3);
    return {
      html: '<div class="hd">' + cells(n) + '</div>',
      css: join([
        '.hd{display:flex;align-items:flex-end;gap:9px;height:var(--hh,64px);border-bottom:2px solid rgba(150,150,190,.25);padding-bottom:6px}',
        '.hd i{width:var(--d,13px);height:var(--d,13px);border-radius:50%;background:var(--c1,' + v.c1 + ');animation:hop-' + v.i + ' var(--dur,' + v.dur + 's) var(--ease,cubic-bezier(.4,0,.6,1)) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        '.hd i:nth-child(2n){background:var(--c2,' + v.c2 + ')}',
        '.hd i:nth-child(3n){background:var(--c3,' + v.c3 + ')}',
        kf('hop-' + v.i, '0%,100%{transform:translateY(0) scale(1.14,.84)}12%{transform:translateY(0) scale(1)}38%{transform:translateY(calc(var(--hop,30px) * -1)) scale(.92,1.1)}62%{transform:translateY(0) scale(1.05,.95)}72%{transform:translateY(calc(var(--hop,30px) * -.3)) scale(.96,1.04)}82%{transform:translateY(0) scale(1)}')
      ]),
      cfg: core(v, [range('Dot', '--d', 6, 26, 1, 13, 'px'), range('Hop', '--hop', 10, 60, 2, 30, 'px'), K.select('Hop ease', '--ease', ['cubic-bezier(.4,0,.6,1)', 'ease-in-out', 'cubic-bezier(.3,.7,.4,1)'], 'cubic-bezier(.4,0,.6,1)')])
    };
  } });

  /* 5. fold grid — four tiles fold away in sequence */
  LD.push({ key: 'foldgrid', title: 'Folding Grid', tags: ['loader', 'css'], build: function (v) {
    return {
      html: '<div class="fg">' + cells(4) + '</div>',
      css: join([
        '.fg{display:grid;grid-template-columns:repeat(2,var(--c,34px));grid-auto-rows:var(--c,34px);gap:4px;perspective:280px}',
        '.fg i{border-radius:6px;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform-origin:50% 100%;animation:fold-' + v.i + ' var(--dur,' + D(v, 1.4) + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        '.fg i:nth-child(3){background:linear-gradient(135deg,var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '))}',
        '.fg i:nth-child(2){background:linear-gradient(135deg,var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '))}',
        kf('fold-' + v.i, '0%,55%,100%{transform:rotateX(0);opacity:1}28%{transform:rotateX(-92deg);opacity:.1}')
      ]),
      cfg: [range('Tile', '--c', 18, 68, 2, 34, 'px'), range('Cycle', '--dur', .5, 12, .1, D(v, 1.4), 's'), range('Stagger', '--step', 0, .6, .01, v.step, 's'), col('Colour', '--c1', v.c1), col('Colour B', '--c2', v.c2), col('Colour C', '--c3', v.c3)]
    };
  } });

  /* 6. liquid tank — two wave crests slosh inside a round tank */
  LD.push({ key: 'liquid', title: 'Liquid Tank', tags: ['loader', 'css'], build: function (v) {
    return {
      html: '<div class="lq"></div>',
      css: join([
        '.lq{position:relative;width:var(--sz,86px);height:var(--sz,86px);border-radius:50%;background:color-mix(in srgb,var(--c1,' + v.c1 + ') 8%,transparent);box-shadow:inset 0 0 0 3px color-mix(in srgb,var(--c3,' + v.c3 + ') 55%,transparent),0 0 var(--glow,20px) color-mix(in srgb,var(--c1,' + v.c1 + ') 30%,transparent);overflow:hidden}',
        '.lq::before,.lq::after{content:"";position:absolute;left:50%;top:calc(100% - var(--lvl,58%));width:340%;aspect-ratio:1;margin-left:-170%;border-radius:44%;background:color-mix(in srgb,var(--c1,' + v.c1 + ') 78%,transparent);animation:liq-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite}',
        '.lq::after{border-radius:47%;background:color-mix(in srgb,var(--c2,' + v.c2 + ') 52%,transparent);animation-duration:calc(var(--dur,' + v.dur + 's) * 1.7);animation-direction:' + v.dir + '}',
        kf('liq-' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: [range('Size', '--sz', 44, 150, 2, 86, 'px'), range('Fill level', '--lvl', 18, 92, 1, 58, '%'), range('Cycle', '--dur', .5, 16, .1, v.dur, 's'), range('Glow', '--glow', 0, 60, 2, 20, 'px'), col('Liquid', '--c1', v.c1), col('Liquid B', '--c2', v.c2), col('Tank', '--c3', v.c3)]
    };
  } });

  /* 7. tri-ring chase — three rings spin dots at different tempos */
  LD.push({ key: 'rings', title: 'Tri-Ring Chase', tags: ['loader', 'css'], build: function (v) {
    return {
      html: '<div class="rs"><i class="a"></i><i class="b"></i><i class="c"></i></div>',
      css: join([
        '.rs{position:relative;width:var(--sz,96px);height:var(--sz,96px)}',
        '.rs i{position:absolute;border-radius:50%;border:1px solid rgba(160,160,200,.16)}',
        '.rs .a{inset:0;animation:rra-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite}',
        '.rs .b{inset:18%;animation:rra-' + v.i + ' calc(var(--dur,' + v.dur + 's) * 1.45) linear infinite ' + v.dir + '}',
        '.rs .c{inset:36%;animation:rra-' + v.i + ' calc(var(--dur,' + v.dur + 's) * 2.1) linear infinite}',
        '.rs i::after{content:"";position:absolute;top:calc(var(--d,12px) / -2);left:calc(50% - var(--d,12px) / 2);width:var(--d,12px);height:var(--d,12px);border-radius:50%;background:var(--c1,' + v.c1 + ');box-shadow:0 0 var(--glow,12px) var(--c1,' + v.c1 + ')}',
        '.rs .b::after{background:var(--c2,' + v.c2 + ');box-shadow:0 0 var(--glow,12px) var(--c2,' + v.c2 + ')}',
        '.rs .c::after{background:var(--c3,' + v.c3 + ');box-shadow:0 0 var(--glow,12px) var(--c3,' + v.c3 + ')}',
        kf('rra-' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: [range('Size', '--sz', 50, 170, 2, 96, 'px'), range('Dot', '--d', 5, 24, 1, 12, 'px'), range('Cycle', '--dur', .5, 12, .1, v.dur, 's'), range('Glow', '--glow', 0, 42, 1, 12, 'px'), col('Outer', '--c1', v.c1), col('Middle', '--c2', v.c2), col('Inner', '--c3', v.c3)]
    };
  } });

  /* 8. morph blob — shape melts between blob and circle while spinning */
  LD.push({ key: 'morph', title: 'Morph Blob', tags: ['loader', 'css'], build: function (v) {
    return {
      html: '<div class="mp"></div>',
      css: join([
        '.mp{width:var(--sz,72px);height:var(--sz,72px);background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + ') 60%,var(--c3,' + v.c3 + '));border-radius:62% 38% 54% 46%/48% 60% 40% 52%;box-shadow:0 0 var(--glow,26px) color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent);animation:mor-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite}',
        kf('mor-' + v.i, '0%,100%{border-radius:62% 38% 54% 46%/48% 60% 40% 52%;transform:rotate(0) scale(1)}33%{border-radius:38% 62% 40% 60%/62% 38% 62% 38%;transform:rotate(.33turn) scale(var(--sqz,.86))}66%{border-radius:50% 50% 38% 62%/58% 46% 54% 42%;transform:rotate(.66turn) scale(1)}')
      ]),
      cfg: [range('Size', '--sz', 36, 140, 2, 72, 'px'), range('Squash', '--sqz', .6, 1, .02, .86, ''), range('Cycle', '--dur', .5, 14, .1, v.dur, 's'), range('Glow', '--glow', 0, 70, 2, 26, 'px'), col('Colour', '--c1', v.c1), col('Colour B', '--c2', v.c2), col('Colour C', '--c3', v.c3)]
    };
  } });

  /* 9. tick clock — hand snaps around a masked tick ring */
  LD.push({ key: 'clock', title: 'Tick Clock', tags: ['loader', 'css'], build: function (v) {
    return {
      html: '<div class="ck"><i></i><b></b></div>',
      css: join([
        '.ck{position:relative;width:var(--sz,84px);height:var(--sz,84px);border-radius:50%;background:radial-gradient(circle at 50% 42%,#15151f,#0b0b13);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--c3,' + v.c3 + ') 55%,transparent)}',
        '.ck::before{content:"";position:absolute;inset:5%;border-radius:50%;background:repeating-conic-gradient(color-mix(in srgb,var(--c3,' + v.c3 + ') 70%,transparent) 0 1.6deg,transparent 1.6deg 30deg);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 7px),#000 0);mask:radial-gradient(farthest-side,transparent calc(100% - 7px),#000 0)}',
        '.ck i{position:absolute;left:calc(50% - var(--hand,3px) / 2);bottom:50%;width:var(--hand,3px);height:36%;border-radius:99px;background:linear-gradient(0deg,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + '));transform-origin:50% 100%;animation:clk-' + v.i + ' var(--dur,' + v.dur + 's) steps(12,end) infinite}',
        '.ck b{position:absolute;left:50%;top:50%;width:10%;height:10%;transform:translate(-50%,-50%);border-radius:50%;background:var(--c3,' + v.c3 + ')}',
        kf('clk-' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: [range('Size', '--sz', 44, 150, 2, 84, 'px'), range('Hand', '--hand', 1, 10, .5, 3, 'px'), range('Lap', '--dur', .5, 20, .1, v.dur, 's'), col('Hand A', '--c1', v.c1), col('Hand B', '--c2', v.c2), col('Ticks', '--c3', v.c3)]
    };
  } });

  /* 10. twin helix — two dot streams weave through each other */
  LD.push({ key: 'helix', title: 'Twin Helix', tags: ['loader', 'css'], build: function (v) {
    var n = 6 + (v.i % 5);
    return {
      html: '<div class="hl">' + cells(n) + '</div>',
      css: join([
        '.hl{position:relative;width:calc(var(--amp,24px) * 2 + var(--d,10px));height:calc(' + n + ' * (var(--d,10px) + var(--gap,5px)))}',
        '.hl i{position:absolute;left:calc(50% - var(--d,10px) / 2);top:calc(var(--i) * (var(--d,10px) + var(--gap,5px)));width:var(--d,10px);height:var(--d,10px);border-radius:50%;background:var(--c1,' + v.c1 + ');animation:hlx-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + (v.step * 1.4).toFixed(3) + 's) * -1)}',
        '.hl i:nth-child(even){background:var(--c2,' + v.c2 + ')}',
        kf('hlx-' + v.i, '0%,100%{transform:translateX(calc(var(--amp,24px) * -1)) scale(.62);opacity:.45}50%{transform:translateX(var(--amp,24px)) scale(1);opacity:1}')
      ]),
      cfg: [range('Spread', '--amp', 10, 60, 2, 24, 'px'), range('Dot', '--d', 5, 20, 1, 10, 'px'), range('Gap', '--gap', 2, 14, 1, 5, 'px'), range('Cycle', '--dur', .5, 12, .1, v.dur, 's'), range('Phase', '--step', 0, .4, .01, Math.round(v.step * 1.4 * 1000) / 1000, 's'), col('Colour', '--c1', v.c1), col('Colour B', '--c2', v.c2)]
    };
  } });

  /* 11. pocket planet — striped sphere spins under a tilted ring */
  LD.push({ key: 'planet', title: 'Pocket Planet', tags: ['loader', 'css'], build: function (v) {
    return {
      html: '<div class="pp"><i class="o"></i></div>',
      css: join([
        '.pp{position:relative;width:var(--sz,74px);height:var(--sz,74px);border-radius:50%;background:radial-gradient(circle at 32% 28%,color-mix(in srgb,var(--c2,' + v.c2 + ') 85%,#fff),var(--c1,' + v.c1 + ') 55%,color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,#000));overflow:visible}',
        '.pp::before{content:"";position:absolute;inset:0;border-radius:50%;background:repeating-linear-gradient(0deg,transparent 0 7px,rgba(0,0,0,.18) 7px 10px);animation:ppb-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite}',
        '.pp::after{content:"";position:absolute;left:50%;top:50%;width:170%;height:44%;transform:translate(-50%,-50%) rotate(-18deg);border:2px solid color-mix(in srgb,var(--c3,' + v.c3 + ') 80%,transparent);border-radius:50%;pointer-events:none}',
        '.pp .o{position:absolute;inset:-34%;animation:ppo-' + v.i + ' calc(var(--dur,' + v.dur + 's) * 1.3) linear infinite}',
        '.pp .o::before{content:"";position:absolute;left:50%;top:0;width:var(--moon,10px);height:var(--moon,10px);margin-left:calc(var(--moon,10px) / -2);border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 8px var(--c3,' + v.c3 + ')}',
        kf('ppb-' + v.i, 'to{background-position:0 20px}'),
        kf('ppo-' + v.i, 'to{transform:rotate(-1turn)}')
      ]),
      cfg: [range('Size', '--sz', 40, 130, 2, 74, 'px'), range('Moon', '--moon', 5, 18, 1, 10, 'px'), range('Cycle', '--dur', .5, 16, .1, v.dur, 's'), col('Planet', '--c1', v.c1), col('Lit', '--c2', v.c2), col('Ring', '--c3', v.c3)]
    };
  } });

  /* 12. warp tunnel — rings rush outward one after another */
  LD.push({ key: 'tunnel', title: 'Warp Tunnel', tags: ['loader', 'css'], build: function (v) {
    return {
      html: '<div class="tn">' + cells(5) + '</div>',
      css: join([
        '.tn{position:relative;width:var(--sz,96px);height:var(--sz,96px)}',
        '.tn i{position:absolute;inset:0;border:2px solid var(--c1,' + v.c1 + ');border-radius:50%;opacity:0;animation:tun-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite;animation-delay:calc(var(--i) * var(--dur,' + D(v, 2) + 's) / -5)}',
        '.tn i:nth-child(even){border-color:var(--c2,' + v.c2 + ')}',
        '.tn i:nth-child(3n){border-color:var(--c3,' + v.c3 + ')}',
        kf('tun-' + v.i, '0%{transform:scale(.08);opacity:0}18%{opacity:.95}100%{transform:scale(1.05);opacity:0}')
      ]),
      cfg: [range('Size', '--sz', 50, 170, 2, 96, 'px'), range('Cycle', '--dur', .6, 20, .1, D(v, 2), 's'), col('Ring', '--c1', v.c1), col('Ring B', '--c2', v.c2), col('Ring C', '--c3', v.c3)]
    };
  } });

  /* 13. squash bounce — classic ball bounce with a matching shadow */
  LD.push({ key: 'bounce', title: 'Squash Bounce', tags: ['loader', 'css'], build: function (v) {
    return {
      html: '<div class="bn"><i class="bl"></i><i class="sh"></i></div>',
      css: join([
        '.bn{position:relative;width:var(--w,110px);height:var(--hh,110px)}',
        '.bn .bl{position:absolute;left:calc(50% - var(--r,13px));bottom:12px;width:calc(var(--r,13px) * 2);height:calc(var(--r,13px) * 2);border-radius:50%;background:radial-gradient(circle at 34% 28%,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + ') 70%);animation:bnc-' + v.i + ' var(--dur,' + v.dur + 's) cubic-bezier(.42,0,.58,1) infinite}',
        '.bn .sh{position:absolute;left:50%;bottom:4px;width:calc(var(--r,13px) * 2.4);height:9px;margin-left:calc(var(--r,13px) * -1.2);border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.6),transparent);animation:bns-' + v.i + ' var(--dur,' + v.dur + 's) cubic-bezier(.42,0,.58,1) infinite}',
        kf('bnc-' + v.i, '0%,100%{transform:translateY(0) scale(1.16,.8)}8%{transform:translateY(0) scale(1)}45%,55%{transform:translateY(calc(var(--hop,58px) * -1)) scale(.92,1.06)}92%{transform:translateY(0) scale(1)}'),
        kf('bns-' + v.i, '0%,100%{transform:scaleX(1.15);opacity:.75}45%,55%{transform:scaleX(.55);opacity:.3}')
      ]),
      cfg: [range('Ball', '--r', 6, 26, 1, 13, 'px'), range('Hop height', '--hop', 20, 90, 2, 58, 'px'), range('Cycle', '--dur', .4, 8, .1, v.dur, 's'), col('Ball', '--c1', v.c1), col('Lit', '--c2', v.c2)]
    };
  } });

  /* 14. magnet merge — poles snap together, spark, then recoil */
  LD.push({ key: 'magnet', title: 'Magnet Merge', tags: ['loader', 'css'], build: function (v) {
    return {
      html: '<div class="mg"><i class="a"></i><s class="sp"></s><i class="b"></i></div>',
      css: join([
        '.mg{position:relative;display:flex;align-items:center;justify-content:space-between;width:var(--w,120px);height:var(--d,26px)}',
        '.mg i{width:var(--d,26px);height:var(--d,26px);border-radius:50%}',
        '.mg .a{background:radial-gradient(circle at 34% 30%,#fff3,var(--c1,' + v.c1 + ') 60%);animation:mga-' + v.i + ' var(--dur,' + D(v, 1.6) + 's) cubic-bezier(.6,0,.4,1) infinite}',
        '.mg .b{background:radial-gradient(circle at 34% 30%,#fff3,var(--c2,' + v.c2 + ') 60%);animation:mgb-' + v.i + ' var(--dur,' + D(v, 1.6) + 's) cubic-bezier(.6,0,.4,1) infinite}',
        '.mg .sp{position:absolute;left:calc(50% - 7px);top:50%;width:14px;height:14px;margin-top:-7px;border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 16px 4px var(--c3,' + v.c3 + ');opacity:0;animation:msp-' + v.i + ' var(--dur,' + D(v, 1.6) + 's) linear infinite}',
        kf('mga-' + v.i, '0%,18%,82%,100%{transform:translateX(0)}46%,58%{transform:translateX(calc(var(--w,120px) / 2 - var(--d,26px) / 2)) scale(1.12)}'),
        kf('mgb-' + v.i, '0%,18%,82%,100%{transform:translateX(0)}46%,58%{transform:translateX(calc((var(--w,120px) / 2 - var(--d,26px) / 2) * -1)) scale(1.12)}'),
        kf('msp-' + v.i, '0%,47%{opacity:0;transform:scale(.2)}51%{opacity:1;transform:scale(1.25)}58%,100%{opacity:0;transform:scale(.2)}')
      ]),
      cfg: [range('Span', '--w', 70, 190, 2, 120, 'px'), range('Pole', '--d', 12, 44, 1, 26, 'px'), range('Cycle', '--dur', .6, 14, .1, D(v, 1.6), 's'), col('Pole A', '--c1', v.c1), col('Pole B', '--c2', v.c2), col('Spark', '--c3', v.c3)]
    };
  } });

  /* 15. pulse matrix — 3×3 dots breathe from the edges inward */
  LD.push({ key: 'matrix', title: 'Pulse Matrix', tags: ['loader', 'css'], build: function (v) {
    return {
      html: '<div class="gx">' + cells(9) + '</div>',
      css: join([
        '.gx{display:grid;grid-template-columns:repeat(3,var(--d,15px));grid-auto-rows:var(--d,15px);gap:8px}',
        '.gx i{border-radius:var(--rad,50%);background:var(--c1,' + v.c1 + ');animation:pmx-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite;animation-delay:calc(max(calc(4 - var(--i)),calc(var(--i) - 4)) * var(--step,' + v.step + 's))}',
        '.gx i:nth-child(even){background:var(--c2,' + v.c2 + ')}',
        '.gx i:nth-child(5){background:var(--c3,' + v.c3 + ')}',
        kf('pmx-' + v.i, '0%,100%{transform:scale(.42);opacity:.35}50%{transform:scale(1);opacity:1}')
      ]),
      cfg: core(v, [range('Dot', '--d', 7, 26, 1, 15, 'px'), range('Corner dot', '--rad', 0, 50, 1, 50, '%')])
    };
  } });

  /* 16. typing bubble — chat dots bouncing in a gradient speech bubble */
  LD.push({ key: 'typing', title: 'Typing Bubble', tags: ['loader', 'css'], build: function (v) {
    return {
      html: '<div class="tp">' + cells(3) + '</div>',
      css: join([
        '.tp{display:flex;gap:6px;align-items:center;padding:12px 15px;border-radius:var(--rad,18px) var(--rad,18px) var(--rad,18px) 5px;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));box-shadow:0 10px 24px -12px color-mix(in srgb,var(--c1,' + v.c1 + ') 80%,transparent)}',
        '.tp i{width:var(--d,8px);height:var(--d,8px);border-radius:50%;background:var(--ink,#fff);animation:typ-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('typ-' + v.i, '0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(calc(var(--hop,6px) * -1));opacity:1}')
      ]),
      cfg: core(v, [range('Dot', '--d', 4, 16, 1, 8, 'px'), range('Hop', '--hop', 3, 16, 1, 6, 'px'), range('Corner', '--rad', 6, 32, 1, 18, 'px')])
    };
  } });

  K.add('loaders', V.matrix('loaders', LD, 20, 'w4ld'));

  /* ════════════════════════ BUTTONS ════════════════════════ */
  var BT = [];

  function btnBase(v, cls) {
    return '.wb{position:relative;border:0;cursor:pointer;display:inline-grid;place-items:center;padding:var(--py,14px) var(--px,34px);font:700 var(--fs,15px)/1 "Plus Jakarta Sans",system-ui,sans-serif;color:#fff;letter-spacing:.02em;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));border-radius:var(--rad,14px)}' +
      '.wb span{position:relative;z-index:1}';
  }
  function btnCfg(v, extra) {
    return [
      range('Pad Y', '--py', 8, 28, 1, 14, 'px'),
      range('Pad X', '--px', 16, 70, 1, 34, 'px'),
      range('Corner', '--rad', 0, 42, 1, 14, 'px'),
      range('Font', '--fs', 11, 24, 1, 15, 'px'),
      range('Cycle', '--dur', .4, 20, .1, v.dur, 's'),
      col('Colour', '--c1', v.c1),
      col('Colour B', '--c2', v.c2),
      col('Colour C', '--c3', v.c3)
    ].concat(extra || []);
  }

  /* 1. split reveal — label halves part, an icon pops through */
  BT.push({ key: 'split', title: 'Split Reveal', tags: ['button', 'hover'], build: function (v) {
    return {
      html: '<button class="wb spl" type="button"><span class="hl">Hover</span><span class="hr">Me</span><b class="ic">\u2726</b></button>',
      css: join([
        btnBase(v),
        '.wb.spl{overflow:hidden;grid-auto-flow:column;gap:3px;animation:shim-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite}',
        '.wb.spl .hl,.wb.spl .hr{display:inline-block;transition:transform var(--tt,.4s) cubic-bezier(.4,0,.2,1)}',
        '.wb.spl .ic{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(0);font-size:1.2em;color:var(--c3,' + v.c3 + ');transition:transform var(--tt,.4s) cubic-bezier(.3,1.5,.4,1);z-index:1}',
        '.wb.spl:hover .hl{transform:translateX(-170%)}',
        '.wb.spl:hover .hr{transform:translateX(170%)}',
        '.wb.spl:hover .ic{transform:translate(-50%,-50%) scale(1.4) rotate(120deg)}',
        kf('shim-' + v.i, '0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}')
      ]),
      cfg: btnCfg(v, [range('Slide', '--tt', .1, 1.2, .05, .4, 's')])
    };
  } });

  /* 2. cursor lens — letters grow as the pointer sweeps past */
  BT.push({ key: 'lens', title: 'Cursor Lens', tags: ['button', 'js'], build: function (v) {
    return {
      html: '<button class="wb lns" type="button">' + letters('Pinch Potion') + '</button>',
      css: join([
        btnBase(v),
        '.wb.lns{grid-auto-flow:column;gap:0}',
        '.wb.lns i{display:inline-block;font-style:normal;white-space:pre;will-change:transform}'
      ]),
      js: 'var b=root.querySelector(".wb"),L=b.querySelectorAll("i"),mx=1e9,my=0,cx=1e9,cy=0,grow=.9;\n' +
        'b.addEventListener("pointermove",function(e){var r=b.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;});\n' +
        'b.addEventListener("pointerleave",function(){mx=1e9;});\n' +
        'api.raf(function(){cx+=(mx-cx)*.16;cy+=(my-cy)*.16;var g=parseFloat(getComputedStyle(b).getPropertyValue("--grow"))||grow;\n' +
        'var br=b.getBoundingClientRect();\n' +
        'for(var i=0;i<L.length;i++){var lr=L[i].getBoundingClientRect();\n' +
        'var dx=lr.left+lr.width/2-(br.left+cx),dy=lr.top+lr.height/2-(br.top+cy);\n' +
        'var d=Math.sqrt(dx*dx+dy*dy),s=1+Math.max(0,1-d/110)*g;\n' +
        'L[i].style.transform="scale("+s.toFixed(3)+")";}});',
      cfg: btnCfg(v, [range('Grow', '--grow', .2, 2, .1, .9, '')])
    };
  } });

  /* 3. word rotator — the button's promise keeps changing */
  BT.push({ key: 'rotator', title: 'Word Rotator', tags: ['button', 'css'], build: function (v) {
    var WORDS = ['Build', 'Ship', 'Measure', 'Grow'];
    var rows = '', p = 0, frames = '';
    WORDS.forEach(function (w) { rows += '<b>' + w + '</b>'; });
    rows += '<b>' + WORDS[0] + '</b>';
    for (var i2 = 0; i2 < WORDS.length; i2++) {
      var at = i2 * 25;
      frames += at + '%,' + (at + 18) + '%{transform:translateY(-' + (i2 * 25) + '%)}';
    }
    frames += '96%,100%{transform:translateY(-100%)}';
    return {
      html: '<button class="wb wcy" type="button"><span class="win"><span class="col">' + rows + '</span></span></button>',
      css: join([
        btnBase(v),
        '.wb.wcy .win{display:inline-block;height:1.3em;overflow:hidden}',
        '.wb.wcy .col{display:flex;flex-direction:column;align-items:center;animation:wrot-' + v.i + ' var(--dur,' + D(v, 3) + 's) cubic-bezier(.7,0,.3,1) infinite}',
        '.wb.wcy b{display:inline-block;height:1.3em;line-height:1.3em;font-weight:800;color:#fff}',
        '.wb.wcy b:nth-child(even){color:var(--c3,' + v.c3 + ')}',
        kf('wrot-' + v.i, frames)
      ]),
      cfg: btnCfg(v, [])
    };
  } });

  /* 4. ant circuit — a dashed frame keeps marching around the button */
  BT.push({ key: 'ants', title: 'Ant Circuit', tags: ['button', 'svg'], build: function (v) {
    return {
      html: '<button class="wb dsh" type="button"><svg viewBox="0 0 100 32" preserveAspectRatio="none"><rect x="1" y="1" width="98" height="30" rx="12"/></svg><span>Ants</span></button>',
      css: join([
        btnBase(v),
        '.wb.dsh svg{position:absolute;inset:0;width:100%;height:100%}',
        '.wb.dsh rect{fill:none;stroke:var(--c3,' + v.c3 + ');stroke-width:2.4;stroke-linecap:round;stroke-dasharray:20 40;vector-effect:non-scaling-stroke;animation:drna-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite}',
        kf('drna-' + v.i, 'to{stroke-dashoffset:-240}')
      ]),
      cfg: btnCfg(v, [])
    };
  } });

  /* 5. chunky press — an arcade button with a real travel distance */
  BT.push({ key: 'press3d', title: 'Chunky Press', tags: ['button', 'css'], build: function (v) {
    return {
      html: '<button class="wb p3" type="button"><span>Press</span></button>',
      css: join([
        btnBase(v),
        '.wb.p3{box-shadow:0 var(--dp,7px) 0 color-mix(in srgb,var(--c1,' + v.c1 + ') 38%,rgba(0,0,0,.55)),0 calc(var(--dp,7px) + 9px) 24px rgba(0,0,0,.45);transition:transform .12s ease-out,box-shadow .12s ease-out;animation:p3b-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite}',
        '.wb.p3:active{transform:translateY(var(--dp,7px));box-shadow:0 0 0 color-mix(in srgb,var(--c1,' + v.c1 + ') 38%,rgba(0,0,0,.55)),0 3px 8px rgba(0,0,0,.4)}',
        kf('p3b-' + v.i, '0%,100%{filter:brightness(1)}50%{filter:brightness(1.13)}')
      ]),
      cfg: btnCfg(v, [range('Travel', '--dp', 2, 16, 1, 7, 'px')])
    };
  } });

  /* 6. rising tide — liquid waves climb the button on hover */
  BT.push({ key: 'tide', title: 'Rising Tide', tags: ['button', 'hover'], build: function (v) {
    return {
      html: '<button class="wb tid" type="button"><span>Tide In</span></button>',
      css: join([
        btnBase(v),
        '.wb.tid{overflow:hidden;isolation:isolate}',
        '.wb.tid::before,.wb.tid::after{content:"";position:absolute;left:50%;top:142%;width:340%;aspect-ratio:1;margin-left:-170%;border-radius:42%;background:color-mix(in srgb,var(--c3,' + v.c3 + ') 85%,transparent);animation:tide-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite;transition:top .75s cubic-bezier(.3,.8,.3,1);z-index:0}',
        '.wb.tid::after{border-radius:47%;background:color-mix(in srgb,var(--c2,' + v.c2 + ') 65%,transparent);animation-duration:calc(var(--dur,' + v.dur + 's) * 1.6);animation-direction:reverse;transition-duration:.9s}',
        '.wb.tid:hover::before{top:24%}',
        '.wb.tid:hover::after{top:32%}',
        kf('tide-' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: btnCfg(v, [])
    };
  } });

  /* 7. click sparks — every press pops a little firework */
  BT.push({ key: 'sparks', title: 'Click Sparks', tags: ['button', 'js'], build: function (v) {
    return {
      html: '<button class="wb brs" type="button"><span>Pop sparks</span></button>',
      css: join([
        btnBase(v),
        '.wb.brs{overflow:hidden}',
        '.wb.brs s{position:absolute;width:var(--conf,7px);height:var(--conf,7px);border-radius:2px;background:var(--c3,' + v.c3 + ');pointer-events:none;z-index:2}',
        '.wb.brs::after{content:"";position:absolute;top:0;left:-70%;width:38%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.32),transparent);transform:skewX(-18deg);animation:brsh-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite}',
        kf('brsh-' + v.i, '0%{left:-70%}60%,100%{left:130%}')
      ]),
      js: 'var b=root.querySelector(".wb");\n' +
        'b.addEventListener("pointerdown",function(e){\n' +
        'var r=b.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;\n' +
        'for(var i=0;i<9;i++){var s=document.createElement("s");s.style.left=x+"px";s.style.top=y+"px";b.appendChild(s);\n' +
        'var a=Math.random()*6.283,d=22+Math.random()*30;\n' +
        's.animate([{transform:"translate(0,0) rotate(0deg)",opacity:1},{transform:"translate("+(Math.cos(a)*d).toFixed(1)+"px,"+(Math.sin(a)*d+16).toFixed(1)+"px) rotate("+(a*57).toFixed(0)+"deg)",opacity:0}],{duration:480+Math.random()*240,easing:"cubic-bezier(.2,.7,.3,1)"}).onfinish=function(){s.remove();};}});',
      cfg: btnCfg(v, [range('Spark', '--conf', 4, 14, 1, 7, 'px')])
    };
  } });

  /* 8. sketch wobble — hand-drawn frame that never sits still */
  BT.push({ key: 'sketch', title: 'Sketch Wobble', tags: ['button', 'css'], build: function (v) {
    return {
      html: '<button class="wb skt" type="button"><span>Rough Draft</span></button>',
      css: join([
        btnBase(v),
        '.wb.skt{border:2.5px solid var(--c3,' + v.c3 + ');box-shadow:2px 3px 0 color-mix(in srgb,var(--c3,' + v.c3 + ') 55%,transparent);animation:skw-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite}',
        kf('skw-' + v.i, '0%,100%{border-radius:var(--rad,14px) 20px 16px 22px/22px 15px 21px 16px;transform:rotate(-.5deg)}50%{border-radius:20px 15px 22px 13px/15px 21px 14px 20px;transform:rotate(.5deg)}')
      ]),
      cfg: btnCfg(v, [])
    };
  } });

  /* 9. tube flicker — a neon tube that sputters awake */
  BT.push({ key: 'tube', title: 'Tube Flicker', tags: ['button', 'css'], build: function (v) {
    return {
      html: '<button class="wb flk" type="button"><span>Vacancy</span></button>',
      css: join([
        btnBase(v),
        '.wb.flk{background:#101019;border:1px solid color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent);color:var(--c3,' + v.c3 + ');text-shadow:0 0 6px var(--c3,' + v.c3 + '),0 0 var(--glow,20px) var(--c1,' + v.c1 + ');box-shadow:0 0 var(--glow,20px) color-mix(in srgb,var(--c1,' + v.c1 + ') 40%,transparent),inset 0 0 14px color-mix(in srgb,var(--c1,' + v.c1 + ') 26%,transparent);animation:tfk-' + v.i + ' var(--dur,' + D(v, 1.6) + 's) linear infinite}',
        kf('tfk-' + v.i, '0%,6.5%,8.5%,42%,44%,76%,100%{opacity:1}7%,43%,63%{opacity:.3}')
      ]),
      cfg: btnCfg(v, [range('Glow', '--glow', 4, 60, 2, 20, 'px')])
    };
  } });

  /* 10. pulse halo — sonar rings keep radiating from the button */
  BT.push({ key: 'halo', title: 'Pulse Halo', tags: ['button', 'css'], build: function (v) {
    return {
      html: '<button class="wb hlo" type="button"><span>Beacon</span></button>',
      css: join([
        btnBase(v),
        '.wb.hlo::before,.wb.hlo::after{content:"";position:absolute;inset:0;border-radius:inherit;border:2px solid var(--c3,' + v.c3 + ');opacity:0;pointer-events:none;animation:halo-' + v.i + ' var(--dur,' + v.dur + 's) cubic-bezier(.2,.6,.3,1) infinite}',
        '.wb.hlo::after{animation-delay:calc(var(--dur,' + v.dur + 's) / -2)}',
        kf('halo-' + v.i, '0%{transform:scale(1);opacity:.85}100%{transform:scale(var(--grow,1.75));opacity:0}')
      ]),
      cfg: btnCfg(v, [range('Reach', '--grow', 1.2, 3, .1, 1.75, '')])
    };
  } });

  /* 11. morph to orb — the button folds itself into a round icon */
  BT.push({ key: 'orb', title: 'Morph To Orb', tags: ['button', 'hover'], build: function (v) {
    return {
      html: '<button class="wb orb" type="button"><i>\u2708</i><span>Launch</span></button>',
      css: join([
        btnBase(v),
        '.wb.orb{grid-auto-flow:column;gap:9px;overflow:hidden;transition:padding var(--tt,.45s) cubic-bezier(.4,0,.2,1),border-radius var(--tt,.45s) cubic-bezier(.4,0,.2,1);animation:orbf-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite}',
        '.wb.orb i{font-style:normal;display:grid;place-items:center;width:0;opacity:0;transform:scale(.3) rotate(-70deg);transition:all var(--tt,.45s) cubic-bezier(.3,1.3,.4,1)}',
        '.wb.orb:hover{padding:var(--py,14px);border-radius:50%}',
        '.wb.orb:hover i{width:1.25em;opacity:1;transform:scale(1.25) rotate(0)}',
        '.wb.orb:hover span{max-width:0;opacity:0}',
        '.wb.orb span{display:inline-block;max-width:8em;overflow:hidden;white-space:nowrap;transition:all var(--tt,.45s) cubic-bezier(.4,0,.2,1)}',
        kf('orbf-' + v.i, '0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}')
      ]),
      cfg: btnCfg(v, [range('Morph', '--tt', .1, 1.2, .05, .45, 's')])
    };
  } });

  /* 12. fracture face — the face splits into sliding shards on hover */
  BT.push({ key: 'fracture', title: 'Fracture Face', tags: ['button', 'hover'], build: function (v) {
    return {
      html: '<button class="wb shd" type="button"><span>Fracture</span></button>',
      css: join([
        btnBase(v),
        '.wb.shd{overflow:hidden;isolation:isolate;animation:shdh-' + v.i + ' var(--dur,' + D(v, 3) + 's) linear infinite}',
        '.wb.shd::before,.wb.shd::after{content:"";position:absolute;inset:0;z-index:0;opacity:0;pointer-events:none;transition:transform var(--tt,.4s) cubic-bezier(.4,0,.2,1),opacity .3s}',
        '.wb.shd::before{clip-path:polygon(0 0,56% 0,36% 100%,0 100%);background:linear-gradient(135deg,var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '))}',
        '.wb.shd::after{clip-path:polygon(100% 0,62% 0,82% 100%,100% 100%);background:linear-gradient(135deg,var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '))}',
        '.wb.shd:hover::before{opacity:.95;transform:translateX(-9%) skewX(-7deg)}',
        '.wb.shd:hover::after{opacity:.95;transform:translateX(9%) skewX(7deg)}',
        kf('shdh-' + v.i, 'to{filter:hue-rotate(360deg)}')
      ]),
      cfg: btnCfg(v, [range('Crack', '--tt', .1, 1.2, .05, .4, 's')])
    };
  } });

  /* 13. conic shine — a light beam orbits under the face */
  BT.push({ key: 'conic', title: 'Conic Shine', tags: ['button', 'css'], build: function (v) {
    return {
      html: '<button class="wb shn" type="button"><span>Beam</span></button>',
      css: join([
        btnBase(v),
        '.wb.shn{overflow:hidden;isolation:isolate}',
        '.wb.shn::before{content:"";position:absolute;inset:-55%;background:conic-gradient(from 0deg,transparent 0 72%,color-mix(in srgb,var(--c3,' + v.c3 + ') 90%,#fff) 84%,transparent 96%);animation:shn-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite;opacity:.9}',
        kf('shn-' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: btnCfg(v, [])
    };
  } });

  /* 14. sprinkle fall — confetti grain keeps raining through the face */
  BT.push({ key: 'sprinkle', title: 'Sprinkle Fall', tags: ['button', 'css'], build: function (v) {
    return {
      html: '<button class="wb spf" type="button"><span>Sprinkle</span></button>',
      css: join([
        btnBase(v),
        '.wb.spf{overflow:hidden;isolation:isolate}',
        '.wb.spf::before,.wb.spf::after{content:"";position:absolute;inset:0;background:radial-gradient(circle 2.6px at 9px 9px,var(--c3,' + v.c3 + ') 97%,transparent),radial-gradient(circle 1.8px at 24px 20px,rgba(255,255,255,.85) 96%,transparent);background-size:36px 30px;animation:spf-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite;opacity:.85}',
        '.wb.spf::after{background-size:52px 42px;background-position:-14px -18px;animation-duration:calc(var(--dur,' + v.dur + 's) * 1.9);opacity:.5}',
        kf('spf-' + v.i, 'to{background-position:0 30px,0 30px}')
      ]),
      cfg: btnCfg(v, [])
    };
  } });

  /* 15. cube flip label — the label is a cube; hover turns it over */
  BT.push({ key: 'cubeflip', title: 'Cube Flip Label', tags: ['button', '3d', 'hover'], build: function (v) {
    return {
      html: '<button class="wb cbf" type="button"><span class="cu"><span class="f1">Hover up</span><span class="f2">Let go</span></span></button>',
      css: join([
        btnBase(v),
        '.wb.cbf{perspective:420px;overflow:visible;animation:cbfr-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite}',
        '.wb.cbf .cu{position:relative;display:block;transform-style:preserve-3d;transition:transform var(--tt,.5s) cubic-bezier(.5,0,.2,1)}',
        '.wb.cbf .f1{display:block;transform:translateZ(.62em)}',
        '.wb.cbf .f2{position:absolute;inset:0;display:grid;place-items:center;white-space:nowrap;transform:rotateX(-90deg) translateZ(.62em);color:var(--c3,' + v.c3 + ')}',
        '.wb.cbf:hover .cu{transform:rotateX(90deg) translateZ(.62em)}',
        kf('cbfr-' + v.i, '0%,100%{transform:rotateX(0)}50%{transform:rotateX(-5deg)}')
      ]),
      cfg: btnCfg(v, [range('Flip', '--tt', .1, 1.4, .05, .5, 's')])
    };
  } });

  /* 16. hatch fill — a hatched curtain sweeps across on hover */
  BT.push({ key: 'hatch', title: 'Hatch Fill', tags: ['button', 'hover'], build: function (v) {
    return {
      html: '<button class="wb htc" type="button"><span>Warm up</span></button>',
      css: join([
        btnBase(v),
        '.wb.htc{overflow:hidden;isolation:isolate}',
        '.wb.htc::before{content:"";position:absolute;inset:0;z-index:0;background:repeating-linear-gradient(45deg,color-mix(in srgb,var(--c3,' + v.c3 + ') 88%,transparent) 0 7px,transparent 7px 13px);transform:scaleX(.001);transform-origin:0 50%;transition:transform var(--tt,.5s) cubic-bezier(.4,0,.2,1)}',
        '.wb.htc:hover::before{transform:scaleX(1)}',
        '.wb.htc span{display:inline-block;animation:htcb-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite}',
        kf('htcb-' + v.i, '0%,100%{transform:translateY(0)}50%{transform:translateY(-2.5px)}')
      ]),
      cfg: btnCfg(v, [range('Fill', '--tt', .1, 1.2, .05, .5, 's')])
    };
  } });

  K.add('buttons', V.matrix('buttons', BT, 20, 'w4bu'));

  /* ════════════════════════ TEXT ════════════════════════ */
  var TX = [];

  function txtBase(v, word) {
    return '<p class="wt" style="font-size:var(--fs,' + (26 + (v.i % 3) * 6) + 'px)">' + letters(word) + '</p>';
  }
  var TXT = function () {
    return '.wt{display:flex;align-items:center;margin:0;font:800 1em/1.15 "Plus Jakarta Sans",system-ui,sans-serif;color:var(--ink,#f2f2fa);letter-spacing:.03em}' +
      '.wt i{display:inline-block;font-style:normal;white-space:pre}';
  };
  function txtCfg(v, extra) {
    return [
      range('Font', '--fs', 16, 64, 1, 26 + (v.i % 3) * 6, 'px'),
      range('Cycle', '--dur', .4, 20, .1, v.dur, 's'),
      range('Stagger', '--step', 0, .5, .01, v.step, 's'),
      col('Ink', '--ink', '#f2f2fa'),
      col('Colour', '--c1', v.c1),
      col('Colour B', '--c2', v.c2),
      col('Colour C', '--c3', v.c3)
    ].concat(extra || []);
  }

  /* 1. sine bob — the word rides a gentle wave */
  TX.push({ key: 'bob', title: 'Sine Bob', tags: ['text', 'css'], build: function (v) {
    return {
      html: txtBase(v, 'RIPPLES'),
      css: join([
        TXT(),
        '.wt i{animation:tbob-' + v.i + ' var(--dur,' + v.dur + 's) var(--ease,ease-in-out) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('tbob-' + v.i, '0%,100%{transform:translateY(0)}50%{transform:translateY(calc(var(--amp,10px) * -1)) rotate(var(--tilt,4deg))}')
      ]),
      cfg: txtCfg(v, [range('Amplitude', '--amp', 3, 30, 1, 10, 'px'), range('Tilt', '--tilt', 0, 14, 1, 4, 'deg'), K.select('Curve', '--ease', ['ease-in-out', 'cubic-bezier(.3,.7,.3,1)', 'cubic-bezier(.6,0,.4,1)'], 'ease-in-out')])
    };
  } });

  /* 2. focus pull — letters sharpen out of a blur, one by one */
  TX.push({ key: 'focus', title: 'Focus Pull', tags: ['text', 'css'], build: function (v) {
    return {
      html: txtBase(v, 'FOCUS'),
      css: join([
        TXT(),
        '.wt i{animation:tfoc-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('tfoc-' + v.i, '0%,100%{filter:blur(var(--blur,7px));opacity:.3;transform:scale(1.1)}45%,60%{filter:blur(0);opacity:1;transform:scale(1)}')
      ]),
      cfg: txtCfg(v, [range('Blur', '--blur', 1, 20, 1, 7, 'px')])
    };
  } });

  /* 3. curtain rise — letters enter through masks and exit over the top */
  TX.push({ key: 'rise', title: 'Curtain Rise', tags: ['text', 'css'], build: function (v) {
    var word = 'CURTAIN';
    var html = '';
    for (var i2 = 0; i2 < word.length; i2++) {
      html += '<b class="mk"><i style="--i:' + i2 + '">' + word[i2] + '</i></b>';
    }
    return {
      html: '<p class="wt" style="font-size:var(--fs,' + (26 + (v.i % 3) * 6) + 'px)">' + html + '</p>',
      css: join([
        TXT(),
        '.wt b.mk{display:inline-block;overflow:hidden;padding-bottom:.08em}',
        '.wt b.mk i{display:inline-block;animation:tris-' + v.i + ' var(--dur,' + D(v, 2.4) + 's) cubic-bezier(.7,0,.3,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('tris-' + v.i, '0%{transform:translateY(118%) rotate(7deg)}14%,58%{transform:none}70%,100%{transform:translateY(-118%) rotate(-6deg)}')
      ]),
      cfg: txtCfg(v, [])
    };
  } });

  /* 4. flip flap — a split-flap board clacking through letters */
  TX.push({ key: 'flap', title: 'Flip Flap', tags: ['text', 'css'], build: function (v) {
    return {
      html: txtBase(v, 'PLATFORM 9'),
      css: join([
        TXT(),
        '.wt{gap:.1em;perspective:520px}',
        '.wt i{background:linear-gradient(180deg,#1c1c28,#12121c);border:1px solid #2b2b3d;border-radius:.14em;padding:.1em .18em;box-shadow:inset 0 -.08em 0 rgba(255,255,255,.05),0 .1em 0 #05050a;transform-origin:50% 62%;animation:tfla-' + v.i + ' var(--dur,' + D(v, 2.4) + 's) cubic-bezier(.5,0,.5,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('tfla-' + v.i, '0%,66%,100%{transform:rotateX(0)}74%{transform:rotateX(84deg)}82%{transform:rotateX(-14deg)}90%{transform:rotateX(6deg)}')
      ]),
      cfg: txtCfg(v, [])
    };
  } });

  /* 5. tracking breath — letter-spacing inhales and exhales */
  TX.push({ key: 'track', title: 'Tracking Breath', tags: ['text', 'css'], build: function (v) {
    return {
      html: txtBase(v, 'TRACKING'),
      css: join([
        TXT(),
        '.wt{animation:ttrk-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite}',
        kf('ttrk-' + v.i, '0%,100%{letter-spacing:var(--t0,.03em);opacity:.8;filter:saturate(.8)}50%{letter-spacing:var(--t1,.3em);opacity:1;filter:saturate(1.4)}'),
        '.wt i{color:var(--c2,' + v.c2 + ')}',
        '.wt i:nth-child(2n){color:var(--ink,#f2f2fa)}'
      ]),
      cfg: txtCfg(v, [range('Tight', '--t0', 0, .16, .005, .03, 'em'), range('Loose', '--t1', .1, .6, .01, .3, 'em')])
    };
  } });

  /* 6. neon tube sputter — bar sign flickering letter to letter */
  TX.push({ key: 'tube', title: 'Neon Tube Sputter', tags: ['text', 'css'], build: function (v) {
    return {
      html: txtBase(v, 'GLOW BAR'),
      css: join([
        TXT(),
        '.wt i{color:var(--c3,' + v.c3 + ');text-shadow:0 0 4px var(--c3,' + v.c3 + '),0 0 var(--glow,16px) var(--c1,' + v.c1 + '),0 0 calc(var(--glow,16px) * 2.4) var(--c1,' + v.c1 + ');animation:tneo-' + v.i + ' var(--dur,' + D(v, 1.6) + 's) linear infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * .5)}',
        kf('tneo-' + v.i, '0%,6%,8%,46%,48%,100%{opacity:1}7%,47%,70%{opacity:.28}')
      ]),
      cfg: txtCfg(v, [range('Glow', '--glow', 4, 60, 2, 16, 'px')])
    };
  } });

  /* 7. colour chase — three colours run through the word */
  TX.push({ key: 'chase', title: 'Colour Chase', tags: ['text', 'css'], build: function (v) {
    return {
      html: txtBase(v, 'CHROMA'),
      css: join([
        TXT(),
        '.wt i{animation:tcol-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('tcol-' + v.i, '0%,100%{color:var(--c1,' + v.c1 + ')}33%{color:var(--c2,' + v.c2 + ')}67%{color:var(--c3,' + v.c3 + ')}')
      ]),
      txtCfg: null,
      cfg: txtCfg(v, [])
    };
  } });

  /* 8. extrude stack — a 3D shadow extrusion that breathes deeper */
  TX.push({ key: 'extrude', title: 'Extrude Stack', tags: ['text', 'css'], build: function (v) {
    var s1 = 'text-shadow:1px 1px 0 ' + v.c2 + ',2px 2px 0 color-mix(in srgb,var(--c2,' + v.c2 + ') 78%,#000),3px 3px 0 color-mix(in srgb,var(--c2,' + v.c2 + ') 56%,#000)';
    var s2 = 'text-shadow:2px 2px 0 var(--c2,' + v.c2 + '),4px 4px 0 color-mix(in srgb,var(--c2,' + v.c2 + ') 78%,#000),7px 7px 0 color-mix(in srgb,var(--c2,' + v.c2 + ') 56%,#000),10px 10px 0 color-mix(in srgb,var(--c2,' + v.c2 + ') 36%,#000),14px 14px 0 color-mix(in srgb,var(--c2,' + v.c2 + ') 20%,#000)';
    return {
      html: txtBase(v, 'EXTRUDE'),
      css: join([
        TXT(),
        '.wt i{color:var(--c1,' + v.c1 + ');animation:text-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('text-' + v.i, '0%,100%{' + s1 + ';transform:translate(0)}50%{' + s2 + ';transform:translate(-2px,-2px)}')
      ]),
      cfg: txtCfg(v, [])
    };
  } });

  /* 9. elastic letters — each glyph boings like jelly */
  TX.push({ key: 'elastic', title: 'Elastic Letters', tags: ['text', 'css'], build: function (v) {
    return {
      html: txtBase(v, 'BOING'),
      css: join([
        TXT(),
        '.wt i{animation:telas-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('telas-' + v.i, '0%,55%,100%{transform:scale(1,1)}66%{transform:scale(var(--sqx,.78),var(--sqy,1.28))}78%{transform:scale(calc(2 - var(--sqx,.78) - .9),calc(2 - var(--sqy,1.28)))}88%{transform:scale(.96,1.04)}')
      ]),
      cfg: txtCfg(v, [range('Squash X', '--sqx', .5, 1, .02, .78, ''), range('Stretch Y', '--sqy', 1, 1.6, .02, 1.28, '')])
    };
  } });

  /* 10. axis roll — the word tumbles forward letter by letter */
  TX.push({ key: 'roll', title: 'Axis Roll', tags: ['text', '3d'], build: function (v) {
    return {
      html: txtBase(v, 'TUMBLE'),
      css: join([
        TXT(),
        '.wt{perspective:560px}',
        '.wt i{animation:trol-' + v.i + ' var(--dur,' + D(v, 2.2) + 's) cubic-bezier(.55,0,.45,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('trol-' + v.i, '0%,50%,100%{transform:rotateX(0)}70%,80%{transform:rotateX(1turn)}')
      ]),
      cfg: txtCfg(v, [])
    };
  } });

  /* 11. titanium sheen — machined metal with a roaming highlight */
  TX.push({ key: 'sheen', title: 'Titanium Sheen', tags: ['text', 'css'], build: function (v) {
    return {
      html: txtBase(v, 'TITANIUM'),
      css: join([
        TXT(),
        '.wt{background:linear-gradient(100deg,color-mix(in srgb,var(--ink,#f2f2fa) 62%,#666) 0 38%,#fff 50%,color-mix(in srgb,var(--ink,#f2f2fa) 62%,#666) 62% 100%),linear-gradient(180deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));background-size:260% 100%,100% 100%;-webkit-background-clip:text,none;background-clip:text;color:transparent;animation:tshe-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite}',
        kf('tshe-' + v.i, '0%{background-position:130% 0,0 0}100%{background-position:-130% 0,0 0}')
      ]),
      cfg: txtCfg(v, [])
    };
  } });

  /* 12. pop cascade — letters pop in, party, and pop out */
  TX.push({ key: 'pop', title: 'Pop Cascade', tags: ['text', 'css'], build: function (v) {
    return {
      html: txtBase(v, 'CONFETTI'),
      css: join([
        TXT(),
        '.wt i{animation:tpop-' + v.i + ' var(--dur,' + D(v, 2.2) + 's) cubic-bezier(.3,1.35,.4,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('tpop-' + v.i, '0%{transform:scale(0);opacity:0}12%{transform:scale(var(--pop,1.3));opacity:1}18%,72%{transform:scale(1)}80%,100%{transform:scale(0);opacity:0}')
      ]),
      cfg: txtCfg(v, [range('Overshoot', '--pop', 1, 1.8, .05, 1.3, '')])
    };
  } });

  /* 13. hop squash — pogo letters stomping along the baseline */
  TX.push({ key: 'hop', title: 'Hop Squash', tags: ['text', 'css'], build: function (v) {
    return {
      html: txtBase(v, 'HOPSCOTCH'),
      css: join([
        TXT(),
        '.wt i{animation:thop-' + v.i + ' var(--dur,' + D(v, 1.8) + 's) cubic-bezier(.45,0,.55,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('thop-' + v.i, '0%,50%,100%{transform:translateY(0) scale(1)}58%{transform:translateY(calc(var(--hop,15px) * -1)) scale(.94,1.08)}66%{transform:translateY(0) scale(1.12,.84)}76%{transform:translateY(0) scale(1)}'),
        '.wt i:nth-child(3n){color:var(--c2,' + v.c2 + ')}'
      ]),
      cfg: txtCfg(v, [range('Hop', '--hop', 6, 40, 1, 15, 'px')])
    };
  } });

  /* 14. glow run — a halo chases itself through the letters */
  TX.push({ key: 'glowrun', title: 'Glow Run', tags: ['text', 'css'], build: function (v) {
    return {
      html: txtBase(v, 'BEACON'),
      css: join([
        TXT(),
        '.wt i{animation:tglr-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('tglr-' + v.i, '0%,100%{text-shadow:0 0 0 transparent;opacity:.7;transform:translateY(0)}50%{text-shadow:0 0 var(--glow,18px) var(--c2,' + v.c2 + '),0 0 calc(var(--glow,18px) * 1.8) var(--c1,' + v.c1 + ');opacity:1;transform:translateY(-2px)}')
      ]),
      cfg: txtCfg(v, [range('Glow', '--glow', 4, 60, 2, 18, 'px')])
    };
  } });

  /* 15. block wipe — a colour bar sweeps the word into view */
  TX.push({ key: 'wipe', title: 'Block Wipe', tags: ['text', 'css'], build: function (v) {
    return {
      html: '<span class="ww" style="font-size:var(--fs,' + (26 + (v.i % 3) * 6) + 'px)"><span class="wd">VELOUR</span></span>',
      css: join([
        '.ww{position:relative;display:inline-block;overflow:hidden;padding:.08em .14em;font:800 1em/1.15 "Plus Jakarta Sans",system-ui,sans-serif;color:var(--ink,#f2f2fa);letter-spacing:.06em}',
        '.ww::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform:scaleX(.001);transform-origin:0 50%;animation:twib-' + v.i + ' var(--dur,' + D(v, 2.2) + 's) cubic-bezier(.72,0,.28,1) infinite}',
        '.ww .wd{position:relative;z-index:1;opacity:0;animation:twiw-' + v.i + ' var(--dur,' + D(v, 2.2) + 's) linear infinite}',
        kf('twib-' + v.i, '0%{transform:scaleX(.001);transform-origin:0 50%}42%,58%{transform:scaleX(1);transform-origin:0 50%}42.1%,57.9%{transform:scaleX(1);transform-origin:100% 50%}100%{transform:scaleX(.001);transform-origin:100% 50%}'),
        kf('twiw-' + v.i, '0%,42%{opacity:0}52%,88%{opacity:1}100%{opacity:0}')
      ]),
      cfg: txtCfg(v, [])
    };
  } });

  /* 16. sky drop — letters fall from above and stick the landing */
  TX.push({ key: 'drop', title: 'Sky Drop', tags: ['text', 'css'], build: function (v) {
    return {
      html: txtBase(v, 'SKYFALL'),
      css: join([
        TXT(),
        '.wt{overflow:hidden;padding:.2em .1em}',
        '.wt i{animation:tdrp-' + v.i + ' var(--dur,' + D(v, 2.2) + 's) cubic-bezier(.5,0,.6,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('tdrp-' + v.i, '0%{transform:translateY(calc(var(--fall,86px) * -1));opacity:0}10%{opacity:1}22%{transform:translateY(0)}28%{transform:translateY(calc(var(--fall,86px) * -.13))}34%,82%{transform:translateY(0)}84%{opacity:1}96%,100%{opacity:0;transform:translateY(0)}'),
        '.wt i:nth-child(even){color:var(--c2,' + v.c2 + ')}'
      ]),
      cfg: txtCfg(v, [range('Fall', '--fall', 30, 160, 2, 86, 'px')])
    };
  } });

  K.add('text', V.matrix('text', TX, 20, 'w4tx'));
})(window);
