/* ============================================================
   Motion Lab — wave 5, RETRO (the 1,000-effect expansion)
   21 new mechanic families × 24 variants = 504 candidates.
   Every mechanic is a distinct vintage-machine behavior new
   to the collection; variants differ in geometry, rhythm,
   easing and palette. House rule: custom properties are only
   ever read with a fallback, never declared in demo CSS.
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
      col('Retro A', '--c1', v.c1),
      col('Retro B', '--c2', v.c2),
      col('Retro C', '--c3', v.c3)
    ].concat(extra || []);
  }
  function stageCss(v) {
    return '.rt5{position:relative;width:100%;display:flex;align-items:center;justify-content:center;padding:10px;background:repeating-linear-gradient(0deg,rgba(255,255,255,.025) 0 2px,transparent 2px 4px)}';
  }
  function panel(v) {
    return 'background:#101018;border:2px solid #2c2c3c;border-radius:10px;box-shadow:0 12px 26px -14px rgba(0,0,0,.9),inset 0 0 0 2px rgba(255,255,255,.04)';
  }

  var M = [];

  /* 1. cabinet glow — the arcade marquee blinks its logo */
  M.push({ key: 'cabinetglow', title: 'Cabinet Glow', tags: ['retro', 'arcade'], build: function (v) {
    var d = D(v, 2.6);
    return {
      html: '<div class="rt5"><div class="cab" style="' + panel(v) + '"><div class="marq"><b>MOTION</b></div><div class="scr"><i class="star"></i></div></div></div>',
      css: join([
        stageCss(v),
        '.cab{width:var(--w,190px);padding:10px 12px 14px}',
        '.marq{height:34px;border-radius:7px;background:linear-gradient(90deg,#1a1a28,#22222f,#1a1a28);border:1px solid #34344a;display:grid;place-items:center;margin-bottom:10px}',
        '.marq b{font:800 13px ui-monospace,monospace;letter-spacing:.34em;color:var(--c1,' + v.c1 + ');text-shadow:0 0 10px var(--c1,' + v.c1 + ');animation:cg-a' + v.i + ' var(--dur,' + d + 's) steps(2) infinite}',
        '.scr{height:64px;border-radius:6px;background:radial-gradient(ellipse at 50% 45%,color-mix(in srgb,var(--c2,' + v.c2 + ') 14%,#06060c),#06060c);display:grid;place-items:center}',
        '.star{width:14px;height:14px;background:var(--c3,' + v.c3 + ');clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);animation:cg-b' + v.i + ' calc(var(--dur,' + d + 's)/2) steps(1) infinite}',
        kf('cg-a' + v.i, '0%,100%{opacity:1}50%{opacity:.45}'),
        kf('cg-b' + v.i, '0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.7);opacity:.7}')
      ]),
      cfg: core(v, [range('Width', '--w', 150, 240, 2, 190, 'px')])
    };
  } });

  /* 2. coin in — the coin flips into the slot */
  M.push({ key: 'coinin', title: 'Coin In', tags: ['retro', 'arcade'], build: function (v) {
    var d = D(v, 2.2);
    return {
      html: '<div class="rt5"><div class="ci" style="' + panel(v) + '"><u class="slot"></u><i class="coin"></i></div></div>',
      css: join([
        stageCss(v),
        '.ci{width:150px;height:110px;display:grid;place-items:center;position:relative}',
        '.slot{position:absolute;bottom:14px;left:50%;width:34px;height:8px;margin-left:-17px;border-radius:4px;background:#000;box-shadow:inset 0 2px 4px rgba(0,0,0,.9),0 0 0 2px #2c2c3c}',
        '.coin{width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 36% 32%,#ffe9a8,#e8b23a 60%,#9c6b14);border:2px solid #7c530f;animation:ci-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.4,0,.6,1) infinite}',
        kf('ci-a' + v.i, '0%{transform:translate(46px,-40px) rotate(0) scale(.8);opacity:0}12%{opacity:1}55%{transform:translate(0,18px) rotate(720deg) scale(1);opacity:1}70%{transform:translate(0,26px) rotate(720deg) scale(.4);opacity:0}100%{transform:translate(46px,-40px) rotate(720deg) scale(.8);opacity:0}')
      ]),
      cfg: core(v)
    };
  } });

  /* 3. score roll — the score digits spin up */
  M.push({ key: 'scoreroll', title: 'Score Roll', tags: ['retro', 'arcade'], build: function (v) {
    var d = D(v, 1.8);
    function drum() {
      var colH = '';
      for (var g = 0; g <= 9; g++) colH += '<b>' + g + '</b>';
      return '<i class="dm">' + colH + '</i>';
    }
    return {
      html: '<div class="rt5"><div class="sr" style="' + panel(v) + '"><u class="lab">SCORE</u><div class="odo">' + drum() + drum() + drum() + '</div></div></div>',
      css: join([
        stageCss(v),
        '.sr{width:190px;padding:12px 14px;display:flex;align-items:center;gap:12px}',
        '.sr .lab{font:800 10px ui-monospace,monospace;letter-spacing:.2em;color:rgba(220,220,240,.5)}',
        '.sr .odo{display:flex;gap:4px}',
        '.sr .dm{display:block;width:26px;height:34px;overflow:hidden;border-radius:4px;background:#05050a;border:1px solid #2c2c3c}',
        '.sr .dm b{display:block;height:34px;line-height:34px;text-align:center;font:800 18px/1 ui-monospace,monospace;color:var(--c1,' + v.c1 + ');text-shadow:0 0 8px color-mix(in srgb,var(--c1,' + v.c1 + ') 70%,transparent)}',
        '.sr .dm{animation:sr-a' + v.i + ' var(--dur,' + d + 's) steps(10) infinite}',
        '.sr .dm:nth-child(2){animation-duration:calc(var(--dur,' + d + 's) * 10)}',
        '.sr .dm:nth-child(3){animation-duration:calc(var(--dur,' + d + 's) * 100)}',
        kf('sr-a' + v.i, 'to{transform:translateY(-340px)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 4. pong — the paddle chases the ball across the floor */
  M.push({ key: 'pong', title: 'Pong', tags: ['retro', 'arcade'], build: function (v) {
    var d = D(v, 2.8);
    return {
      html: '<div class="rt5"><div class="pn" style="' + panel(v) + '"><i class="net"></i><i class="ball"></i><i class="pad"></i></div></div>',
      css: join([
        stageCss(v),
        '.pn{position:relative;width:var(--w,200px);height:110px;overflow:hidden}',
        '.pn .net{position:absolute;left:50%;top:8px;bottom:8px;width:0;border-left:2px dashed rgba(255,255,255,.25)}',
        '.pn .ball{position:absolute;top:50%;left:50%;width:8px;height:8px;margin:-4px;border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 8px var(--c3,' + v.c3 + ');animation:pn-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.pn .pad{position:absolute;bottom:10px;left:50%;width:30px;height:8px;margin-left:-15px;border-radius:4px;background:var(--c1,' + v.c1 + ');box-shadow:0 0 10px color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent);animation:pn-b' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('pn-a' + v.i, '0%{transform:translate(-70px,-28px)}25%{transform:translate(0,10px)}50%{transform:translate(70px,-26px)}75%{transform:translate(0,12px)}100%{transform:translate(-70px,-28px)}'),
        kf('pn-b' + v.i, '0%,100%{transform:translateX(-70px)}25%,75%{transform:translateX(0)}50%{transform:translateX(70px)}')
      ]),
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 200, 'px')])
    };
  } });

  /* 5. brick smash — the row of bricks pops down in order */
  M.push({ key: 'bricksmash', title: 'Brick Smash', tags: ['retro', 'arcade'], build: function (v) {
    var d = D(v, 3.2), bricks = '';
    var rows = [6, 6], colors = ['var(--c1,' + v.c1 + ')', 'var(--c2,' + v.c2 + ')'];
    var k = 0;
    for (var r = 0; r < 2; r++) for (var c = 0; c < 6; c++) bricks += '<i style="--i:' + k++ + ';--c:' + colors[r] + '"></i>';
    return {
      html: '<div class="rt5"><div class="bs" style="' + panel(v) + '"><div class="bw">' + bricks + '</div><i class="pk"></i></div></div>',
      css: join([
        stageCss(v),
        '.bs{width:var(--w,200px);height:120px;padding:12px;display:flex;flex-direction:column;justify-content:space-between}',
        '.bw{display:grid;grid-template-columns:repeat(6,1fr);gap:5px}',
        '.bw i{height:14px;border-radius:3px;background:var(--c,var(--c1,' + v.c1 + '));animation:bs-a' + v.i + ' var(--dur,' + d + 's) ease-in infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -12)}',
        '.pk{width:10px;height:10px;border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 10px var(--c3,' + v.c3 + ');margin:0 auto;animation:bs-b' + v.i + ' var(--dur,' + d + 's) ease-in infinite}',
        kf('bs-a' + v.i, '0%,6%{transform:translateY(0) scale(1);opacity:1}12%{transform:translateY(34px) scale(.3);opacity:0}90%,100%{transform:translateY(34px) scale(.3);opacity:0}'),
        kf('bs-b' + v.i, '0%{transform:translateX(-70px)}25%{transform:translateX(0)}50%{transform:translateX(70px)}75%{transform:translateX(0)}100%{transform:translateX(-70px)}')
      ]),
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 200, 'px')])
    };
  } });

  /* 6. shooter — the blaster fires while the enemy wiggles */
  M.push({ key: 'shooter', title: 'Shooter', tags: ['retro', 'arcade'], build: function (v) {
    var d = D(v, 2.4);
    return {
      html: '<div class="rt5"><div class="sh" style="' + panel(v) + '"><i class="en"></i><i class="b1"></i><i class="b2"></i><i class="sp"></i></div></div>',
      css: join([
        stageCss(v),
        '.sh{position:relative;width:160px;height:120px;overflow:hidden}',
        '.en{position:absolute;top:12px;left:50%;width:22px;height:14px;margin-left:-11px;background:var(--c2,' + v.c2 + ');clip-path:polygon(0 0,100% 0,100% 70%,78% 100%,50% 78%,22% 100%,0 70%);animation:sh-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite alternate}',
        '.b1,.b2{position:absolute;bottom:30px;left:50%;width:3px;height:8px;margin-left:-1.5px;background:var(--c3,' + v.c3 + ');animation:sh-b' + v.i + ' calc(var(--dur,' + d + 's)/2) linear infinite}',
        '.b2{animation-delay:calc(var(--dur,' + d + 's) / -4)}',
        '.sp{position:absolute;bottom:8px;left:50%;width:26px;height:14px;margin-left:-13px;background:var(--c1,' + v.c1 + ');clip-path:polygon(50% 0,100% 100%,0 100%)}',
        kf('sh-a' + v.i, 'from{transform:translateX(-40px)}to{transform:translateX(40px)}'),
        kf('sh-b' + v.i, '0%{transform:translateY(0);opacity:1}85%{transform:translateY(-64px);opacity:1}100%{transform:translateY(-70px);opacity:0}')
      ]),
      cfg: core(v)
    };
  } });

  /* 7. pixel boom — the sprite detonates into its own blocks */
  M.push({ key: 'pixelboom', title: 'Pixel Boom', tags: ['retro', 'arcade'], build: function (v) {
    var d = D(v, 2.6), blocks = '';
    var pts = [[0, 0], [10, 0], [0, 10], [10, 10], [5, -8], [5, 18], [-8, 5], [18, 5]];
    for (var i = 0; i < pts.length; i++) blocks += '<i style="--i:' + i + ';--dx:' + pts[i][0] + 'px;--dy:' + pts[i][1] + 'px"></i>';
    return {
      html: '<div class="rt5"><div class="pb" style="' + panel(v) + '"><div class="px">' + blocks + '</div></div></div>',
      css: join([
        stageCss(v),
        '.pb{width:150px;height:130px;display:grid;place-items:center}',
        '.px{position:relative;width:20px;height:20px}',
        '.px i{position:absolute;width:10px;height:10px;background:var(--c1,' + v.c1 + ');animation:pb-a' + v.i + ' var(--dur,' + d + 's) steps(6) infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -8)}',
        kf('pb-a' + v.i, '0%,10%{transform:translate(0,0);opacity:1}14%{transform:translate(var(--dx,0px),var(--dy,0px));opacity:1}70%{transform:translate(calc(var(--dx,0px)*3),calc(var(--dy,0px)*3 + 18px));opacity:1}80%,100%{transform:translate(calc(var(--dx,0px)*3),calc(var(--dy,0px)*3 + 22px));opacity:0}')
      ]),
      cfg: core(v)
    };
  } });

  /* 8. modem — the dial-up lights chase and the sync bar fills */
  M.push({ key: 'modem', title: 'Modem Sync', tags: ['retro', 'computer'], build: function (v) {
    var d = D(v, 2.8), leds = '';
    for (var i = 0; i < 5; i++) leds += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="rt5"><div class="md" style="' + panel(v) + '"><div class="leds">' + leds + '</div><div class="bar"><b></b></div><u class="txt">CONNECTING…</u></div></div>',
      css: join([
        stageCss(v),
        '.md{width:190px;padding:12px 14px;display:flex;flex-direction:column;gap:9px}',
        '.leds{display:flex;gap:8px}',
        '.leds i{width:12px;height:12px;border-radius:2px;background:#20202e;border:1px solid #34344a;animation:md-a' + v.i + ' var(--dur,' + d + 's) steps(1) infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -5)}',
        '.bar{height:8px;border-radius:4px;background:#05050a;border:1px solid #2c2c3c;overflow:hidden}',
        '.bar b{display:block;height:100%;width:100%;background:repeating-linear-gradient(90deg,var(--c1,' + v.c1 + ') 0 8px,transparent 8px 12px);transform-origin:0 50%;transform:scaleX(0);animation:md-b' + v.i + ' var(--dur,' + d + 's) steps(24) infinite}',
        '.txt{font:700 9px ui-monospace,monospace;letter-spacing:.18em;color:rgba(220,220,240,.55);animation:md-c' + v.i + ' calc(var(--dur,' + d + 's)/2) steps(1) infinite}',
        kf('md-a' + v.i, '0%,18%{background:var(--c3,' + v.c3 + ');box-shadow:0 0 8px var(--c3,' + v.c3 + ')}20%,100%{background:#20202e;box-shadow:none}'),
        kf('md-b' + v.i, '0%{transform:scaleX(0)}70%{transform:scaleX(1)}88%{transform:scaleX(1)}100%{transform:scaleX(0)}'),
        kf('md-c' + v.i, '0%,100%{opacity:1}50%{opacity:.4}')
      ]),
      cfg: core(v)
    };
  } });

  /* 9. radio tuner — the needle sweeps the dial and stations ping */
  M.push({ key: 'radiotuner', title: 'Radio Tuner', tags: ['retro', 'radio'], build: function (v) {
    var d = D(v, 3.6), marks = '';
    for (var i = 0; i < 9; i++) marks += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="rt5"><div class="rn" style="' + panel(v) + '"><div class="dial">' + marks + '<b class="ndl"></b></div><div class="eq"><i></i><i></i><i></i><i></i><i></i></div></div></div>',
      css: join([
        stageCss(v),
        '.rn{width:var(--w,200px);padding:14px;display:flex;flex-direction:column;gap:12px}',
        '.dial{position:relative;height:26px;border-radius:6px;background:#05050a;border:1px solid #2c2c3c}',
        '.dial i{position:absolute;left:calc(6% + var(--i) * 11%);top:50%;width:2px;height:10px;margin-top:-5px;background:rgba(220,220,240,.4)}',
        '.ndl{position:absolute;top:-4px;bottom:-4px;left:6%;width:3px;border-radius:2px;background:var(--c1,' + v.c1 + ');box-shadow:0 0 8px var(--c1,' + v.c1 + ');animation:rn-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.eq{display:flex;gap:4px;align-items:flex-end;height:20px}',
        '.eq i{flex:1;height:100%;border-radius:2px 2px 0 0;background:var(--c3,' + v.c3 + ');transform-origin:50% 100%;animation:rn-b' + v.i + ' calc(var(--dur,' + d + 's)/5) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -10)}',
        kf('rn-a' + v.i, '0%,100%{left:6%}28%{left:30%}55%{left:62%}82%{left:88%}'),
        kf('rn-b' + v.i, '0%,100%{transform:scaleY(.2)}50%{transform:scaleY(1)}')
      ]),
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 200, 'px')])
    };
  } });

  /* 10. button punch — the arcade button takes the hit */
  M.push({ key: 'buttonpunch', title: 'Button Punch', tags: ['retro', 'arcade'], build: function (v) {
    var d = D(v, 1.8);
    return {
      html: '<div class="rt5"><div class="bp" style="' + panel(v) + '"><div class="btn"><i class="cap"></i><i class="ring"></i></div><u class="lab">START</u></div></div>',
      css: join([
        stageCss(v),
        '.bp{width:150px;height:120px;display:grid;place-items:center;grid-template-rows:1fr auto}',
        '.btn{position:relative;width:64px;height:64px}',
        '.cap{position:absolute;inset:8px;border-radius:50%;background:radial-gradient(circle at 36% 30%,color-mix(in srgb,var(--c1,' + v.c1 + ') 70%,#fff),var(--c1,' + v.c1 + ') 55%,color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,#000));box-shadow:0 8px 0 color-mix(in srgb,var(--c1,' + v.c1 + ') 45%,#000),0 12px 16px rgba(0,0,0,.5);animation:bp-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.5,0,.5,1) infinite}',
        '.ring{position:absolute;inset:0;border-radius:50%;border:3px solid var(--c3,' + v.c3 + ');opacity:0;animation:bp-b' + v.i + ' var(--dur,' + d + 's) ease-out infinite}',
        '.lab{font:800 11px ui-monospace,monospace;letter-spacing:.3em;color:rgba(220,220,240,.5);margin-top:10px}',
        kf('bp-a' + v.i, '0%,100%{transform:translateY(0)}18%{transform:translateY(6px)}30%{transform:translateY(2px)}44%{transform:translateY(0)}'),
        kf('bp-b' + v.i, '0%,16%{opacity:0;transform:scale(.6)}24%{opacity:.8}55%,100%{opacity:0;transform:scale(1.5)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 11. slot reels — the three reels spin and stop in sequence */
  M.push({ key: 'slotreels', title: 'Slot Reels', tags: ['retro', 'casino'], build: function (v) {
    var d = D(v, 3.4);
    function reel(sym) {
      var colH = '';
      for (var r = 0; r < 10; r++) colH += '<b>' + (r % 10) + '</b>';
      return '<div class="rl"><i class="spin">' + colH + '</i></div>';
    }
    return {
      html: '<div class="rt5"><div class="sl3" style="' + panel(v) + '"><div class="row">' + reel() + reel() + reel() + '</div></div></div>',
      css: join([
        stageCss(v),
        '.sl3{width:190px;padding:14px}',
        '.row{display:flex;gap:8px}',
        '.rl{width:44px;height:52px;overflow:hidden;border-radius:6px;background:#05050a;border:2px solid #2c2c3c}',
        '.rl .spin{display:block;animation:sl3-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.15,.9,.3,1) infinite}',
        '.rl:nth-child(2) .spin{animation-duration:calc(var(--dur,' + d + 's) * 1.35)}',
        '.rl:nth-child(3) .spin{animation-duration:calc(var(--dur,' + d + 's) * 1.7)}',
        '.rl b{display:block;height:52px;line-height:52px;text-align:center;font:800 24px/1 ui-monospace,monospace;color:var(--c1,' + v.c1 + ');text-shadow:0 0 10px color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent)}',
        kf('sl3-a' + v.i, '0%{transform:translateY(0)}82%{transform:translateY(-468px)}100%{transform:translateY(-468px)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 12. flap board — the split-flap tiles flip through the word */
  M.push({ key: 'flapboard', title: 'Flap Board', tags: ['retro', 'display'], build: function (v) {
    var d = D(v, 3.2), W = 'DEP', tiles = '';
    for (var i = 0; i < W.length; i++) {
      var chars = '<b>0</b><b>' + W[i] + '</b><b>A</b><b>Z</b>';
      tiles += '<div class="tl">' + chars + '</div>';
    }
    return {
      html: '<div class="rt5"><div class="fb" style="' + panel(v) + '"><div class="row2">' + tiles + '</div></div></div>',
      css: join([
        stageCss(v),
        '.fb{width:170px;padding:14px}',
        '.row2{display:flex;gap:7px}',
        '.tl{width:34px;height:44px;overflow:hidden;border-radius:5px;background:#05050a;border:1px solid #2c2c3c;position:relative}',
        '.tl b{position:absolute;inset:0;display:grid;place-items:center;font:800 20px/1 ui-monospace,monospace;color:var(--c1,' + v.c1 + ')}',
        '.tl{animation:fb-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -2)}',
        '.row2 .tl:nth-child(1){--i:0}.row2 .tl:nth-child(2){--i:1}.row2 .tl:nth-child(3){--i:2}',
        kf('fb-a' + v.i, '0%,18%{transform:translateY(0)}30%,72%{transform:translateY(-44px)}84%,100%{transform:translateY(0)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 13. light cycle — the two trails run the border and trade the lead */
  M.push({ key: 'lightcycle', title: 'Light Cycle', tags: ['retro', 'arcade'], build: function (v) {
    var d = D(v, 3);
    return {
      html: '<div class="rt5"><div class="lc" style="' + panel(v) + '"><i class="t1"></i><i class="t2"></i></div></div>',
      css: join([
        stageCss(v),
        '.lc{position:relative;width:var(--w,190px);height:120px;border-radius:8px;overflow:hidden;background:#05050a}',
        '.lc i{position:absolute;width:34px;height:4px;border-radius:99px}',
        '.t1{background:var(--c1,' + v.c1 + ');box-shadow:0 0 10px var(--c1,' + v.c1 + ');animation:lc-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.t2{background:var(--c2,' + v.c2 + ');box-shadow:0 0 10px var(--c2,' + v.c2 + ');animation:lc-b' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('lc-a' + v.i, '0%{transform:translate(0,0) rotate(0deg)}25%{transform:translate(0,104px) rotate(90deg)}50%{transform:translate(152px,104px) rotate(180deg)}75%{transform:translate(152px,0) rotate(270deg)}100%{transform:translate(0,0) rotate(360deg)}'),
        kf('lc-b' + v.i, '0%{transform:translate(152px,0) rotate(0deg)}25%{transform:translate(152px,104px) rotate(-90deg)}50%{transform:translate(0,104px) rotate(-180deg)}75%{transform:translate(0,0) rotate(-270deg)}100%{transform:translate(152px,0) rotate(-360deg)}')
      ]),
      cfg: core(v, [range('Width', '--w', 150, 240, 2, 190, 'px')])
    };
  } });

  /* 14. test card — the broadcast bars hold and the iris closes */
  M.push({ key: 'testcard', title: 'Test Card', tags: ['retro', 'television'], build: function (v) {
    var d = D(v, 4), bars = '';
    for (var i = 0; i < 7; i++) bars += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="rt5"><div class="tc" style="' + panel(v) + '"><div class="tb">' + bars + '</div><i class="iris"></i></div></div>',
      css: join([
        stageCss(v),
        '.tc{position:relative;width:var(--w,190px);height:110px;overflow:hidden;display:grid;place-items:center}',
        '.tb{position:absolute;inset:0;display:flex}',
        '.tb i{flex:1;animation:tc-a' + v.i + ' var(--dur,' + d + 's) steps(7) infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -7)}',
        '.tb i:nth-child(1){background:#d8d8d8}.tb i:nth-child(2){background:#d8d860}.tb i:nth-child(3){background:#60d8d8}.tb i:nth-child(4){background:#60d860}.tb i:nth-child(5){background:#d860d8}.tb i:nth-child(6){background:#d86060}.tb i:nth-child(7){background:#6060d8}',
        '.iris{position:absolute;left:50%;top:50%;width:10px;height:10px;margin:-5px;border-radius:50%;box-shadow:0 0 0 0 #0a0a12;animation:tc-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('tc-a' + v.i, '0%,100%{filter:brightness(1)}50%{filter:brightness(.85)}'),
        kf('tc-b' + v.i, '0%,55%{box-shadow:0 0 0 0 #0a0a12}75%,88%{box-shadow:0 0 0 130px #0a0a12}100%{box-shadow:0 0 0 0 #0a0a12}')
      ]),
      cfg: core(v, [range('Width', '--w', 150, 240, 2, 190, 'px')])
    };
  } });

  /* 15. pixel cursor — the blocky caret hops its grid and blinks */
  M.push({ key: 'pixelcursor', title: 'Pixel Cursor', tags: ['retro', 'computer'], build: function (v) {
    var d = D(v, 2.2);
    return {
      html: '<div class="rt5"><div class="pc" style="' + panel(v) + '"><i class="cur"></i><i class="ln l1"></i><i class="ln l2"></i><i class="ln l3"></i></div></div>',
      css: join([
        stageCss(v),
        '.pc{width:180px;height:110px;padding:16px;display:flex;flex-direction:column;gap:12px;position:relative}',
        '.pc .ln{height:6px;border-radius:2px;background:rgba(255,255,255,.14)}',
        '.pc .l1{width:70%}.pc .l2{width:46%}.pc .l3{width:58%}',
        '.cur{position:absolute;left:24px;top:22px;width:10px;height:16px;background:var(--c1,' + v.c1 + ');box-shadow:0 0 8px var(--c1,' + v.c1 + ');animation:pc-a' + v.i + ' var(--dur,' + d + 's) steps(4) infinite,pc-b' + v.i + ' calc(var(--dur,' + d + 's)/4) steps(1) infinite}',
        kf('pc-a' + v.i, '0%{left:24px;top:22px}25%{left:64px;top:22px}50%{left:24px;top:46px}75%{left:58px;top:70px}'),
        kf('pc-b' + v.i, '0%,100%{opacity:1}50%{opacity:0}')
      ]),
      cfg: core(v)
    };
  } });

  /* 16. retro speedo — the chunky segment gauge sweeps its range */
  M.push({ key: 'retspeedo', title: 'Retro Speedo', tags: ['retro', 'gauge'], build: function (v) {
    var d = D(v, 2.8), segs = '';
    for (var i = 0; i < 9; i++) segs += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="rt5"><div class="rs" style="' + panel(v) + '"><div class="arc">' + segs + '</div><b class="ndl"></b><u class="dgt">0</u></div></div>',
      css: join([
        stageCss(v),
        '.rs{position:relative;width:150px;height:104px}',
        '.arc{position:absolute;left:12px;right:12px;top:6px;height:84px;overflow:hidden}',
        '.arc i{position:absolute;left:50%;top:50%;width:9px;height:34px;margin:-34px 0 0 -4.5px;border-radius:3px;background:var(--c2,' + v.c2 + ');transform:rotate(calc(var(--i) * 20deg - 80deg)) translateY(-30px);opacity:.3;animation:rs-a' + v.i + ' var(--dur,' + d + 's) steps(9) infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -9)}',
        '.ndl{position:absolute;left:50%;bottom:46px;width:4px;height:40px;margin-left:-2px;border-radius:3px;background:var(--c3,' + v.c3 + ');transform-origin:50% 100%;animation:rs-b' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.6,0,.4,1) infinite}',
        '.dgt{position:absolute;left:0;right:0;bottom:0;text-align:center;font:800 14px ui-monospace,monospace;color:var(--c1,' + v.c1 + ')}',
        kf('rs-a' + v.i, '0%,10%{opacity:.3}18%,88%{opacity:1;background:var(--c1,' + v.c1 + ')}96%,100%{opacity:.3}'),
        kf('rs-b' + v.i, '0%,100%{transform:rotate(-80deg)}50%{transform:rotate(80deg)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 17. beat EQ — the four pads light the grid on the beat */
  M.push({ key: 'biteq', title: 'Beat EQ', tags: ['retro', 'music'], build: function (v) {
    var d = D(v, 1.2), pads = '';
    for (var i = 0; i < 16; i++) pads += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="rt5"><div class="be" style="' + panel(v) + '"><div class="grid">' + pads + '</div></div></div>',
      css: join([
        stageCss(v),
        '.be{width:180px;padding:12px}',
        '.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}',
        '.grid i{width:30px;height:30px;border-radius:6px;background:#05050a;border:1px solid #2c2c3c;animation:be-a' + v.i + ' var(--dur,' + d + 's) steps(1) infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -16)}',
        kf('be-a' + v.i, '0%,12%{background:var(--c1,' + v.c1 + ');box-shadow:0 0 12px color-mix(in srgb,var(--c1,' + v.c1 + ') 70%,transparent);border-color:var(--c1,' + v.c1 + ')}14%,100%{background:#05050a;box-shadow:none;border-color:#2c2c3c}')
      ]),
      cfg: core(v)
    };
  } });

  /* 18. dot trail — the 8-bit runner leaves a dotted wake */
  M.push({ key: 'dottrail', title: 'Dot Trail', tags: ['retro', 'arcade'], build: function (v) {
    var d = D(v, 3), dots = '';
    for (var i = 0; i < 8; i++) dots += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="rt5"><div class="dt" style="' + panel(v) + '"><div class="trail">' + dots + '</div><b class="hero"></b></div></div>',
      css: join([
        stageCss(v),
        '.dt{position:relative;width:200px;height:110px;overflow:hidden}',
        '.hero{position:absolute;left:140px;top:46px;width:20px;height:20px;background:var(--c1,' + v.c1 + ');box-shadow:inset -4px -4px 0 rgba(0,0,0,.3);animation:dt-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.trail{position:absolute;left:0;top:0}',
        '.trail i{position:absolute;left:150px;top:52px;width:6px;height:6px;background:var(--c3,' + v.c3 + ');animation:dt-b' + v.i + ' var(--dur,' + d + 's) linear infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -8)}',
        kf('dt-a' + v.i, '0%{transform:translateX(0);opacity:1}88%{transform:translateX(-160px);opacity:1}100%{transform:translateX(-160px);opacity:0}'),
        kf('dt-b' + v.i, '0%{transform:translateX(0);opacity:0}10%{opacity:.8}85%{transform:translateX(-160px);opacity:.8}100%{transform:translateX(-160px);opacity:0}')
      ]),
      cfg: core(v)
    };
  } });

  /* 19. rotary phone — the dial spins past the finger hook */
  M.push({ key: 'rotaryphone', title: 'Rotary Phone', tags: ['retro', 'phone'], build: function (v) {
    var d = D(v, 3.2), holes = '';
    for (var i = 0; i < 8; i++) holes += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="rt5"><div class="rp2" style="' + panel(v) + '"><div class="dl">' + holes + '<b class="hook"></b><u class="hub"></u></div></div></div>',
      css: join([
        stageCss(v),
        '.rp2{width:160px;height:120px;display:grid;place-items:center}',
        '.dl{position:relative;width:88px;height:88px;border-radius:50%;background:radial-gradient(circle at 38% 32%,#34344a,#14141e 70%);animation:rp2-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.6,0,.4,1) infinite}',
        '.dl i{position:absolute;inset:0;transform:rotate(calc(var(--i) * 45deg))}',
        '.dl i::after{content:"";position:absolute;left:50%;top:9px;width:12px;height:16px;margin-left:-6px;border-radius:6px;background:#05050a}',
        '.dl .hook{position:absolute;left:50%;top:-8px;width:10px;height:20px;margin-left:-5px;border-radius:4px;background:var(--c3,' + v.c3 + ')}',
        '.dl .hub{position:absolute;left:50%;top:50%;width:22px;height:22px;margin:-11px;border-radius:50%;background:var(--c1,' + v.c1 + ')}',
        kf('rp2-a' + v.i, '0%,12%{transform:rotate(0)}30%,55%{transform:rotate(-135deg)}70%,88%{transform:rotate(-90deg)}100%{transform:rotate(0)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 20. arcade border — the ball bounces between the paddles in the border */
  M.push({ key: 'atariborder', title: 'Arcade Border', tags: ['retro', 'arcade'], build: function (v) {
    var d = D(v, 2.4);
    return {
      html: '<div class="rt5"><div class="ab" style="' + panel(v) + '"><i class="pt"></i><i class="pb2"></i><i class="ball2"></i></div></div>',
      css: join([
        stageCss(v),
        '.ab{position:relative;width:var(--w,190px);height:110px}',
        '.pt,.pb2{position:absolute;width:34px;height:7px;border-radius:4px;background:var(--c1,' + v.c1 + ');box-shadow:0 0 8px color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent)}',
        '.pt{top:8px;left:50%;margin-left:-17px;animation:ab-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.pb2{bottom:8px;left:50%;margin-left:-17px;animation:ab-b' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.ball2{position:absolute;left:50%;top:50%;width:7px;height:7px;margin:-3.5px;border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 8px var(--c3,' + v.c3 + ');animation:ab-c' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('ab-a' + v.i, '0%,100%{transform:translateX(-52px)}50%{transform:translateX(52px)}'),
        kf('ab-b' + v.i, '0%,100%{transform:translateX(52px)}50%{transform:translateX(-52px)}'),
        kf('ab-c' + v.i, '0%{transform:translate(-50px,-34px)}25%{transform:translate(0,0)}50%{transform:translate(50px,34px)}75%{transform:translate(0,0)}100%{transform:translate(-50px,-34px)}')
      ]),
      cfg: core(v, [range('Width', '--w', 150, 240, 2, 190, 'px')])
    };
  } });

  /* 21. alarm bell — the twin bells ring while the digits blink */
  M.push({ key: 'alarmbell', title: 'Alarm Bell', tags: ['retro', 'alarm'], build: function (v) {
    var d = D(v, 1.6);
    return {
      html: '<div class="rt5"><div class="al2" style="' + panel(v) + '"><div class="clock"><i class="bell bl"></i><i class="bell br2"></i><b class="digit">7:00</b></div></div></div>',
      css: join([
        stageCss(v),
        '.al2{width:180px;height:110px;display:grid;place-items:center}',
        '.clock{position:relative;width:120px;height:80px}',
        '.bell{position:absolute;top:0;width:26px;height:22px;border-radius:50% 50% 6px 6px;background:linear-gradient(180deg,var(--c3,' + v.c3 + '),color-mix(in srgb,var(--c3,' + v.c3 + ') 55%,#000))}',
        '.bl{left:14px;transform-origin:50% 100%;animation:al2-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.br2{right:14px;transform-origin:50% 100%;animation:al2-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.digit{position:absolute;left:0;right:0;bottom:0;text-align:center;font:800 22px ui-monospace,monospace;color:var(--c1,' + v.c1 + ');text-shadow:0 0 10px color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent);animation:al2-c' + v.i + ' calc(var(--dur,' + d + 's)/2) steps(1) infinite}',
        kf('al2-a' + v.i, '0%,100%{transform:rotate(-22deg)}50%{transform:rotate(0)}'),
        kf('al2-b' + v.i, '0%,100%{transform:rotate(22deg)}50%{transform:rotate(0)}'),
        kf('al2-c' + v.i, '0%,100%{opacity:1}50%{opacity:.3}')
      ]),
      cfg: core(v)
    };
  } });

  K.add('retro', V.matrix('retro', M, 24, 'w5rt'));
})(window);
