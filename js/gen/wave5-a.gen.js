/* ============================================================
   Motion Lab — wave 5, LOADERS (the 1,000-effect expansion)
   21 new mechanic families × 24 variants = 504 candidates.
   Every mechanic is a distinct loading mechanism that does not
   exist earlier in the collection; each of its 24 variants
   differs in geometry, counts, rhythm, easing and palette.
   House rule: custom properties are only ever read with a
   fallback, never declared inside demo CSS.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit, V = global.MLVary;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color;
  var cells = K.cells, sel = K.selectCtl;

  function D(v, mul) { return Math.round(v.dur * (mul || 1) * 100) / 100; }
  function core(v, extra) {
    return [
      range('Cycle', '--dur', .2, 20, .05, D(v, 1), 's'),
      range('Stagger', '--step', 0, .6, .01, v.step, 's'),
      col('Colour', '--c1', v.c1),
      col('Colour B', '--c2', v.c2),
      col('Colour C', '--c3', v.c3)
    ].concat(extra || []);
  }

  var M = [];

  /* 1. metronome — pendulum swings, tick lights flash at the extremes */
  M.push({ key: 'metro', title: 'Metronome Tick', tags: ['loader', 'pendulum'], build: function (v) {
    var d = D(v, 1.4), a = 26 + (v.i % 4) * 4;
    return {
      html: '<div class="wt"><i class="arm"><u></u></i><b class="t1"></b><b class="t2"></b></div>',
      css: join([
        '.wt{position:relative;width:var(--sz,84px);height:var(--sz,84px)}',
        '.wt::before{content:"";position:absolute;left:15%;right:15%;bottom:8%;height:58%;clip-path:polygon(0 100%,100% 100%,78% 0,22% 0);background:color-mix(in srgb,var(--c3,' + v.c3 + ') 22%,transparent);border-top:2px solid color-mix(in srgb,var(--c3,' + v.c3 + ') 70%,transparent)}',
        '.wt .arm{position:absolute;left:calc(50% - 1.5px);top:16%;width:3px;height:44%;background:linear-gradient(180deg,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + '));border-radius:2px;transform-origin:50% 0;animation:a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.45,0,.55,1) infinite}',
        '.wt .arm u{position:absolute;left:50%;bottom:var(--wt,55%);width:11px;height:7px;margin-left:-5.5px;background:var(--c3,' + v.c3 + ');border-radius:2px}',
        '.wt .t1,.wt .t2{position:absolute;top:10%;width:5px;height:5px;border-radius:50%;background:var(--c1,' + v.c1 + ');opacity:.15}',
        '.wt .t1{left:12%;animation:b' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.wt .t2{right:12%;animation:c' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('a' + v.i, '0%,100%{transform:rotate(' + -a + 'deg)}50%{transform:rotate(' + a + 'deg)}'),
        kf('b' + v.i, '0%,8%{opacity:1;box-shadow:0 0 8px var(--c1,' + v.c1 + ')}16%,100%{opacity:.15}'),
        kf('c' + v.i, '50%,58%{opacity:1;box-shadow:0 0 8px var(--c1,' + v.c1 + ')}66%,100%{opacity:.15}0%{opacity:.15}')
      ]),
      cfg: core(v, [range('Size', '--sz', 48, 140, 2, 84, 'px'), range('Weight', '--wt', 10, 90, 1, 55, '%')])
    };
  } });

  /* 2. domino cascade — a row of tiles tips one after another */
  M.push({ key: 'domino', title: 'Domino Cascade', tags: ['loader', 'chain'], build: function (v) {
    var n = 6 + (v.i % 6), d = D(v, 1.8);
    return {
      html: '<div class="dm">' + cells(n) + '</div>',
      css: join([
        '.dm{display:flex;align-items:flex-end;gap:var(--gap,5px);height:96px}',
        '.dm i{width:var(--tw,14px);height:var(--th,64px);border-radius:3px;background:linear-gradient(180deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform-origin:50% 100%;animation:a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.55,.06,.68,.19) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('a' + v.i, '0%,8%{transform:rotate(0)}30%,44%{transform:rotate(74deg)}58%,100%{transform:rotate(0)}')
      ]),
      cfg: core(v, [range('Tile width', '--tw', 8, 24, 1, 14, 'px'), range('Tile height', '--th', 36, 100, 2, 64, 'px'), range('Gap', '--gap', 2, 14, 1, 5, 'px')])
    };
  } });

  /* 3. tachometer — a needle sweeps the arc and settles with a bounce */
  M.push({ key: 'tach', title: 'Tachometer Needle', tags: ['loader', 'gauge'], build: function (v) {
    var d = D(v, 2);
    return {
      html: '<div class="tc"><i class="ndl"></i><u></u></div>',
      css: join([
        '.tc{position:relative;width:var(--sz,110px);height:calc(var(--sz,110px) * .62);overflow:hidden;border-radius:8px}',
        '.tc::before{content:"";position:absolute;left:50%;top:50%;width:calc(var(--sz,110px) * .92);height:calc(var(--sz,110px) * .92);transform:translate(-50%,-42%);border-radius:50%;border:var(--th,7px) solid color-mix(in srgb,var(--c3,' + v.c3 + ') 35%,transparent);border-bottom-color:transparent;border-left-color:transparent}',
        '.tc u{position:absolute;left:50%;top:50%;width:26%;height:var(--th,7px);transform:translate(-50%,-50%) rotate(' + (28 + (v.i % 4) * 8) + 'deg);transform-origin:0 50%;background:var(--c2,' + v.c2 + ');border-radius:99px;opacity:.8}',
        '.tc .ndl{position:absolute;left:50%;bottom:50%;width:3px;height:38%;margin-left:-1.5px;background:var(--c1,' + v.c1 + ');border-radius:99px;transform-origin:50% 100%;box-shadow:0 0 6px var(--c1,' + v.c1 + ');animation:a' + v.i + ' var(--dur,' + d + 's) ' + (v.i % 2 ? 'cubic-bezier(.3,1.4,.5,1)' : 'cubic-bezier(.5,0,.3,1.3)') + ' infinite}',
        kf('a' + v.i, '0%{transform:rotate(-118deg)}55%{transform:rotate(96deg)}72%{transform:rotate(' + (80 + (v.i % 3) * 10) + 'deg)}100%{transform:rotate(-118deg)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 70, 170, 2, 110, 'px'), range('Needle thick', '--th', 3, 14, 1, 7, 'px')])
    };
  } });

  /* 4. barcode scan — a scan line combs across a field of bars */
  M.push({ key: 'barcode', title: 'Barcode Scan', tags: ['loader', 'scan'], build: function (v) {
    var d = D(v, 1.6), w = 4 + (v.i % 5);
    return {
      html: '<div class="bc"><i class="ln"></i><i class="gl"></i></div>',
      css: join([
        '.bc{position:relative;width:var(--w,170px);height:var(--h,64px);border-radius:6px;background:repeating-linear-gradient(90deg,var(--c1,' + v.c1 + ') 0 3px,transparent 3px 7px,var(--c1,' + v.c1 + ') 7px ' + (7 + w) + 'px,transparent ' + (7 + w) + 'px ' + (14 + w) + 'px);opacity:.85;overflow:hidden}',
        '.bc .ln{position:absolute;top:0;bottom:0;left:-30%;width:3px;background:var(--c2,' + v.c2 + ');box-shadow:0 0 10px var(--c2,' + v.c2 + '),0 0 22px var(--c2,' + v.c2 + ');animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.bc .gl{position:absolute;top:0;bottom:0;left:-70%;width:52%;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--c2,' + v.c2 + ') 30%,transparent),transparent);animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('a' + v.i, '0%{left:' + -32 + '%}55%,100%{left:104%}')
      ]),
      cfg: core(v, [range('Width', '--w', 100, 240, 2, 170, 'px'), range('Height', '--h', 40, 110, 2, 64, 'px')])
    };
  } });

  /* 5. ladder climb — steps light bottom to top as a dot climbs */
  M.push({ key: 'ladder', title: 'Ladder Climb', tags: ['loader', 'steps'], build: function (v) {
    var n = 5 + (v.i % 5), d = D(v, 2.2);
    return {
      html: '<div class="ld">' + cells(n) + '<i class="d"></i></div>',
      css: join([
        '.ld{position:relative;width:calc(var(--sw,26px) * ' + n + ');height:var(--sh,84px)}',
        '.ld i{position:absolute;bottom:calc(var(--i) * var(--rh,13px));left:calc(var(--i) * var(--sw,26px));width:var(--sw,26px);height:6px;border-radius:3px;background:color-mix(in srgb,var(--c3,' + v.c3 + ') 40%,transparent);animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / ' + n + ' * -1)}',
        '.ld .d{position:absolute;bottom:calc(var(--rh,13px) / 2 - 1px);left:calc(var(--sw,26px) / 2 - 4px);width:8px;height:8px;border-radius:50%;background:var(--c1,' + v.c1 + ');box-shadow:0 0 8px var(--c1,' + v.c1 + ');animation:b' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('a' + v.i, '0%{background:var(--c1,' + v.c1 + ');box-shadow:0 0 10px var(--c1,' + v.c1 + ')}18%,100%{background:color-mix(in srgb,var(--c3,' + v.c3 + ') 40%,transparent);box-shadow:none}'),
        kf('b' + v.i, '0%{transform:translate(0,0);opacity:0}4%{opacity:1}88%{transform:translate(calc((' + (n - 1) + ') * var(--sw,26px)),calc(-' + (n - 1) + ' * var(--rh,13px)));opacity:1}96%,100%{transform:translate(calc((' + (n - 1) + ') * var(--sw,26px)),calc(-' + (n - 1) + ' * var(--rh,13px)));opacity:0}')
      ]),
      cfg: core(v, [range('Step width', '--sw', 14, 40, 1, 26, 'px'), range('Step height', '--sh', 50, 120, 2, 84, 'px'), range('Row height', '--rh', 8, 20, 1, 13, 'px')])
    };
  } });

  /* 6. crossing pendulums — two arms swing from opposite corners */
  M.push({ key: 'pendgate', title: 'Crossing Pendulums', tags: ['loader', 'pendulum'], build: function (v) {
    var d = D(v, 1.6), a = 40 + (v.i % 4) * 6;
    return {
      html: '<div class="pg"><i class="l"></i><i class="r"></i></div>',
      css: join([
        '.pg{position:relative;width:var(--sz,104px);height:var(--sz,104px)}',
        '.pg i{position:absolute;top:8%;width:3px;height:78%;border-radius:99px;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent),var(--c1,' + v.c1 + '));animation:a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.45,0,.55,1) infinite}',
        '.pg i::after{content:"";position:absolute;bottom:-4px;left:50%;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:radial-gradient(circle at 35% 30%,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + ') 70%)}',
        '.pg .l{left:10%;transform-origin:50% 0}',
        '.pg .r{right:10%;transform-origin:50% 0;animation-delay:calc(var(--dur,' + d + 's) / -2)}',
        kf('a' + v.i, '0%,100%{transform:rotate(' + -a + 'deg)}50%{transform:rotate(' + a + 'deg)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 60, 160, 2, 104, 'px')])
    };
  } });

  /* 7. coin flip ring — a ring of squares flips over one after another */
  M.push({ key: 'coinring', title: 'Coin Flip Ring', tags: ['loader', 'ring'], build: function (v) {
    var n = 8 + (v.i % 4), d = D(v, 2);
    return {
      html: '<div class="cr">' + cells(n) + '</div>',
      css: join([
        '.cr{position:relative;width:var(--sz,100px);height:var(--sz,100px)}',
        '.cr i{position:absolute;inset:18%;transform:rotate(calc(var(--i) * ' + Math.round(360 / n) + 'deg)) translate(0,calc(-50% + var(--off,0px)))}',
        '.cr i::after{content:"";position:absolute;left:50%;top:0;width:var(--cs,12px);height:var(--cs,12px);margin-left:calc(var(--cs,12px) / -2);border-radius:3px;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));animation:a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.4,0,.2,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('a' + v.i, '0%,15%{transform:rotateY(0)}40%,60%{transform:rotateY(180deg)}85%,100%{transform:rotateY(360deg)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 64, 160, 2, 100, 'px'), range('Coin size', '--cs', 6, 22, 1, 12, 'px')])
    };
  } });

  /* 8. vital thump — a cross pulses in a double-beat heartbeat */
  M.push({ key: 'vital', title: 'Vital Thump', tags: ['loader', 'pulse'], build: function (v) {
    var d = D(v, 1.5);
    return {
      html: '<div class="vt"><i></i><b class="r1"></b><b class="r2"></b></div>',
      css: join([
        '.vt{position:relative;width:var(--sz,72px);height:var(--sz,72px)}',
        '.vt i{position:absolute;left:50%;top:50%;width:22%;height:64%;margin:-32% 0 0 -11%;border-radius:6px;background:linear-gradient(180deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '))}',
        '.vt i::after{content:"";position:absolute;top:50%;left:50%;width:64%;height:22%;margin:-11% 0 0 -32%;border-radius:6px;background:linear-gradient(90deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '))}',
        '.vt b{position:absolute;inset:0;border:2px solid var(--c1,' + v.c1 + ');border-radius:50%;opacity:0;animation:a' + v.i + ' var(--dur,' + d + 's) ease-out infinite}',
        '.vt .r2{animation-delay:calc(var(--dur,' + d + 's) * .22)}',
        kf('a' + v.i, '0%,18%{transform:scale(.4);opacity:.9}60%,100%{transform:scale(1.5);opacity:0}')
      ]) + '\n' + join([
        '.vt i{animation:b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('b' + v.i, '0%,100%{transform:scale(1)}8%{transform:scale(1.22)}16%{transform:scale(1)}24%{transform:scale(1.12)}34%{transform:scale(1)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 44, 130, 2, 72, 'px')])
    };
  } });

  /* 9. meshed gears — two dashed-border gears turn in opposite directions */
  M.push({ key: 'gears', title: 'Meshed Gears', tags: ['loader', 'gear'], build: function (v) {
    var d = D(v, 1.8), g1 = 54 + (v.i % 4) * 8, g2 = Math.round(g1 * .62);
    return {
      html: '<div class="gr"><i class="a"></i><i class="b"></i></div>',
      css: join([
        '.gr{position:relative;width:var(--sz,110px);height:var(--sz,110px)}',
        '.gr i{position:absolute;border-radius:50%;border:calc(var(--gt,10px) / 2) dashed var(--c1,' + v.c1 + ')}',
        '.gr i::after{content:"";position:absolute;inset:30%;border-radius:50%;border:2px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 80%,transparent)}',
        '.gr .a{left:0;top:8%;width:' + g1 + 'px;height:' + g1 + 'px;animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.gr .b{right:0;bottom:4%;width:' + g2 + 'px;height:' + g2 + 'px;border-color:var(--c2,' + v.c2 + ');animation:b' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('a' + v.i, 'to{transform:rotate(1turn)}'),
        kf('b' + v.i, 'to{transform:rotate(-1turn)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 80, 180, 2, 110, 'px'), range('Gear teeth', '--gt', 6, 18, 1, 10, 'px')])
    };
  } });

  /* 10. sine wave bars — bars oscillate in travelling phase */
  M.push({ key: 'sinbars', title: 'Sine Wave Bars', tags: ['loader', 'wave'], build: function (v) {
    var n = 7 + (v.i % 6), d = D(v, 1.4);
    return {
      html: '<div class="sw">' + cells(n) + '</div>',
      css: join([
        '.sw{display:flex;align-items:center;gap:var(--gap,4px);height:var(--h,72px)}',
        '.sw i{width:var(--bw,9px);height:100%;border-radius:99px;background:linear-gradient(180deg,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + '));transform-origin:50% 50%;animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / ' + n + ' * -' + (v.i % 3 === 0 ? '1' : (v.i % 3 === 1 ? '.5' : '.25')) + ')}',
        kf('a' + v.i, '0%,100%{transform:scaleY(.25);opacity:.4}50%{transform:scaleY(1);opacity:1}')
      ]),
      cfg: core(v, [range('Height', '--h', 44, 120, 2, 72, 'px'), range('Bar width', '--bw', 4, 16, 1, 9, 'px'), range('Gap', '--gap', 2, 12, 1, 4, 'px')])
    };
  } });

  /* 11. step bounce — a dot bounces down a staircase */
  M.push({ key: 'stepbounce', title: 'Step Bounce', tags: ['loader', 'bounce'], build: function (v) {
    var n = 4 + (v.i % 4), d = D(v, 2.2), frames = '';
    for (var i = 0; i < n; i++) {
      var p0 = (i / (n + .5) * 100).toFixed(1), p1 = ((i + .55) / (n + .5) * 100).toFixed(1);
      frames += p0 + '%{transform:translate(0,0);animation-timing-function:cubic-bezier(.5,0,1,1)}' +
        p1 + '%{transform:translate(calc(var(--sx,24px) * ' + (i + 1) + '),calc(var(--sy,18px) * ' + (i + 1) + '));animation-timing-function:cubic-bezier(0,0,.5,1)}';
      if (i < n - 1) frames += ((i + .58) / (n + .5) * 100).toFixed(1) + '%{transform:translate(calc(var(--sx,24px) * ' + (i + 1) + '),calc(var(--sy,18px) * ' + (i + 1) + '))}';
    }
    frames += '97%,100%{transform:translate(calc(var(--sx,24px) * ' + n + '),calc(var(--sy,18px) * ' + n + '));opacity:0}98%{opacity:0}99%{opacity:1}';
    var steps = '';
    for (i = 0; i < n; i++) steps += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="sb">' + steps + '<b class="dot"></b></div>',
      css: join([
        '.sb{position:relative;width:calc(var(--sx,24px) * var(--n,' + n + '));height:calc(var(--sy,18px) * var(--n,' + n + '))}',
        '.sb i{position:absolute;top:calc(var(--i) * var(--sy,18px));left:0;width:calc(var(--sx,24px) * ' + (i + 1) + ');height:4px;border-radius:2px;background:color-mix(in srgb,var(--c3,' + v.c3 + ') 55%,transparent)}',
        '.sb .dot{position:absolute;top:2px;left:calc(var(--sx,24px) / 2 - 4px);width:8px;height:8px;border-radius:50%;background:var(--c1,' + v.c1 + ');box-shadow:0 0 8px var(--c1,' + v.c1 + ');animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('a' + v.i, frames)
      ]),
      cfg: core(v, [range('Step x', '--sx', 14, 40, 1, 24, 'px'), range('Step y', '--sy', 10, 30, 1, 18, 'px')])
    };
  } });

  /* 12. ferry dots — dots shuttle between two columns */
  M.push({ key: 'ferry', title: 'Ferry Dots', tags: ['loader', 'transfer'], build: function (v) {
    var n = 4 + (v.i % 4), d = D(v, 1.4);
    return {
      html: '<div class="fy"><i class="col l"></i><i class="col r"></i><b class="row">' + cells(n, 'u') + '</b></div>',
      css: join([
        '.fy{position:relative;width:var(--w,90px);height:var(--h,70px)}',
        '.fy .col{position:absolute;top:0;bottom:0;width:8px;border-radius:4px;background:color-mix(in srgb,var(--c3,' + v.c3 + ') 50%,transparent)}',
        '.fy .col.l{left:6%}.fy .col.r{right:6%}',
        '.fy .row{position:absolute;inset:0}',
        '.fy u{position:absolute;left:10%;top:calc(var(--i) * (100% / ' + (n - 1) + '));width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -1)}',
        kf('a' + v.i, '0%,12%{transform:translateX(0)}42%,58%{transform:translateX(var(--tr,56px))}88%,100%{transform:translateX(0)}')
      ]),
      cfg: core(v, [range('Width', '--w', 60, 150, 2, 90, 'px'), range('Height', '--h', 44, 110, 2, 70, 'px'), range('Travel', '--tr', 30, 110, 2, 56, 'px')])
    };
  } });

  /* 13. spiral draw — an svg spiral draws itself, then fades */
  M.push({ key: 'spiraldraw', title: 'Snail Spiral', tags: ['loader', 'svg'], build: function (v) {
    var turns = 2 + (v.i % 3), pts = [], T = 64, i;
    for (i = 0; i <= 120; i++) {
      var t = i / 120, a = t * turns * Math.PI * 2, r = 4 + t * (50 - 6);
      pts.push((50 + Math.cos(a) * r).toFixed(1) + ',' + (50 + Math.sin(a) * r).toFixed(1));
    }
    var d = D(v, 1.8);
    return {
      html: '<svg class="sp" viewBox="0 0 100 100" width="' + (T + 20) + '" height="' + (T + 20) + '"><path d="M' + pts.join(' L') + '"/></svg>',
      css: join([
        '.sp{overflow:visible}',
        '.sp path{fill:none;stroke:var(--c1,' + v.c1 + ');stroke-width:var(--th,4);stroke-linecap:round;stroke-dasharray:900;stroke-dashoffset:900;filter:drop-shadow(0 0 4px var(--c2,' + v.c2 + '));animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('a' + v.i, '0%{stroke-dashoffset:900;opacity:1}62%{stroke-dashoffset:0;opacity:1}82%{stroke-dashoffset:0;opacity:.25}100%{stroke-dashoffset:900;opacity:0}83%{stroke-dashoffset:900;opacity:0}')
      ]),
      cfg: core(v, [range('Stroke', '--th', 1, 8, .5, 4, 'px')])
    };
  } });

  /* 14. infinity draw — a lemniscate with a bright comet chasing it */
  M.push({ key: 'infinity', title: 'Infinity Draw', tags: ['loader', 'svg'], build: function (v) {
    var d = D(v, 1.6);
    return {
      html: '<svg class="in" viewBox="0 0 120 60" width="150" height="76"><path class="base" d="M30,30 C30,12 55,12 60,30 C65,48 90,48 90,30 C90,12 65,12 60,30 C55,48 30,48 30,30 Z"/><path class="cm" d="M30,30 C30,12 55,12 60,30 C65,48 90,48 90,30 C90,12 65,12 60,30 C55,48 30,48 30,30 Z"/></svg>',
      css: join([
        '.in .base{fill:none;stroke:color-mix(in srgb,var(--c3,' + v.c3 + ') 55%,transparent);stroke-width:var(--th,4);stroke-linecap:round}',
        '.in .cm{fill:none;stroke:var(--c1,' + v.c1 + ');stroke-width:var(--th,4);stroke-linecap:round;stroke-dasharray:36 244;filter:drop-shadow(0 0 5px var(--c1,' + v.c1 + '));animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('a' + v.i, '0%{stroke-dashoffset:280}100%{stroke-dashoffset:0}')
      ]),
      cfg: core(v, [range('Stroke', '--th', 1, 8, .5, 4, 'px')])
    };
  } });

  /* 15. segmented wheel — a broken conic ring spins over a dashed core */
  M.push({ key: 'segwheel', title: 'Segmented Wheel', tags: ['loader', 'ring'], build: function (v) {
    var n = 6 + (v.i % 5), d = D(v, 1.8), seg = (360 / n).toFixed(1), stops = [];
    for (var i = 0; i < n; i++) {
      var a0 = (i * 360 / n).toFixed(1), a1 = (i * 360 / n + seg * .62).toFixed(1);
      stops.push('var(--c' + (i % 3 === 0 ? 1 : i % 3 === 1 ? 2 : 3) + ',' + v.c1 + ' ' + a0 + '% ' + a1 + '%,transparent ' + a1 + '%)');
    }
    return {
      html: '<div class="sg"><i></i><u></u></div>',
      css: join([
        '.sg{position:relative;width:var(--sz,96px);height:var(--sz,96px)}',
        '.sg i{position:absolute;inset:0;border-radius:50%;background:conic-gradient(' + stops.join(',') + ');-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - var(--th,9px)),#000 0);mask:radial-gradient(farthest-side,transparent calc(100% - var(--th,9px)),#000 0);animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.sg u{position:absolute;inset:22%;border-radius:50%;border:2px dashed color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,transparent);animation:b' + v.i + ' calc(var(--dur,' + d + 's) * 2.4) linear infinite reverse}',
        kf('a' + v.i, 'to{transform:rotate(1turn)}'),
        kf('b' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 56, 160, 2, 96, 'px'), range('Ring thick', '--th', 4, 18, 1, 9, 'px')])
    };
  } });

  /* 16. flip card row — a row of tiles flips over in sequence */
  M.push({ key: 'fliprow', title: 'Flip Card Row', tags: ['loader', 'cards'], build: function (v) {
    var n = 4 + (v.i % 4), d = D(v, 1.8);
    return {
      html: '<div class="fr">' + cells(n) + '</div>',
      css: join([
        '.fr{display:flex;gap:var(--gap,6px)}',
        '.fr i{width:var(--cs,30px);height:var(--cs,30px);border-radius:6px;background:var(--c1,' + v.c1 + ');border:1px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 60%,transparent);animation:a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.45,0,.55,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('a' + v.i, '0%,18%{transform:rotateY(0);background:var(--c1,' + v.c1 + ')}45%,60%{transform:rotateY(180deg);background:var(--c2,' + v.c2 + ')}88%,100%{transform:rotateY(360deg);background:var(--c1,' + v.c1 + ')}')
      ]),
      cfg: core(v, [range('Tile', '--cs', 16, 52, 2, 30, 'px'), range('Gap', '--gap', 2, 14, 1, 6, 'px')])
    };
  } });

  /* 17. checkmark draw — a circle draws, then a tick pops in */
  M.push({ key: 'checkdraw', title: 'Checkmark Draw', tags: ['loader', 'svg'], build: function (v) {
    var d = D(v, 1.9);
    return {
      html: '<svg class="ck" viewBox="0 0 100 100" width="92" height="92"><circle cx="50" cy="50" r="42"/><path d="M30,52 L45,66 L72,36"/></svg>',
      css: join([
        '.ck circle{fill:none;stroke:var(--c1,' + v.c1 + ');stroke-width:var(--th,6);stroke-linecap:round;stroke-dasharray:264;stroke-dashoffset:264;animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.ck path{fill:none;stroke:var(--c2,' + v.c2 + ');stroke-width:var(--th,7);stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:64;stroke-dashoffset:64;filter:drop-shadow(0 0 5px var(--c2,' + v.c2 + '));animation:b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('a' + v.i, '0%{stroke-dashoffset:264}55%,86%{stroke-dashoffset:0}96%,100%{stroke-dashoffset:264}'),
        kf('b' + v.i, '0%,40%{stroke-dashoffset:64}70%,86%{stroke-dashoffset:0}96%,100%{stroke-dashoffset:64}71%{transform:scale(1)}75%{transform:scale(1.06)}')
      ]),
      cfg: core(v, [range('Stroke', '--th', 2, 10, .5, 6, 'px')])
    };
  } });

  /* 18. echo squares — nested squares sonar out from the centre */
  M.push({ key: 'echosq', title: 'Echo Squares', tags: ['loader', 'pulse'], build: function (v) {
    var d = D(v, 1.8);
    return {
      html: '<div class="es"><i class="e1"></i><i class="e2"></i><i class="e3"></i><b></b></div>',
      css: join([
        '.es{position:relative;width:var(--sz,92px);height:var(--sz,92px)}',
        '.es i{position:absolute;inset:0;border:2px solid var(--c1,' + v.c1 + ');border-radius:var(--round,10px);opacity:0;animation:a' + v.i + ' var(--dur,' + d + 's) ease-out infinite}',
        '.es .e2{animation-delay:calc(var(--dur,' + d + 's) / -3);border-color:var(--c2,' + v.c2 + ')}.es .e3{animation-delay:calc(var(--dur,' + d + 's) / -1.5);border-color:var(--c3,' + v.c3 + ')}',
        '.es b{position:absolute;left:50%;top:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:var(--c2,' + v.c2 + ');animation:b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('a' + v.i, '0%{transform:scale(.2);opacity:.9}80%{transform:scale(1);opacity:0}100%{transform:scale(1);opacity:0}'),
        kf('b' + v.i, '0%,100%{transform:scale(1)}12%{transform:scale(1.5)}24%{transform:scale(1)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 56, 160, 2, 92, 'px'), range('Corner', '--round', 0, 40, 1, 10, 'px')])
    };
  } });

  /* 19. orbiting triangles — triangles ride the circle while spinning */
  M.push({ key: 'triorbit', title: 'Orbiting Triangles', tags: ['loader', 'orbit'], build: function (v) {
    var n = 2 + (v.i % 3), d = D(v, 1.7), tris = '';
    for (var i = 0; i < n; i++) tris += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="tr">' + tris + '<b></b></div>',
      css: join([
        '.tr{position:relative;width:var(--sz,104px);height:var(--sz,104px)}',
        '.tr i{position:absolute;inset:0;animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite;animation-delay:calc(var(--dur,' + d + 's) * var(--i) / -' + n + ')}',
        '.tr i::after{content:"";position:absolute;left:50%;top:calc(var(--rr,32%));width:16px;height:14px;margin-left:-8px;clip-path:polygon(50% 0,100% 100%,0 100%);background:var(--c' + (1 + (i % 3)) + ',' + v.c1 + ');animation:b' + v.i + ' calc(var(--dur,' + d + 's) * 1.6) linear infinite reverse}',
        '.tr b{position:absolute;left:50%;top:50%;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 8px var(--c3,' + v.c3 + ')}',
        kf('a' + v.i, 'to{transform:rotate(1turn)}'),
        kf('b' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 64, 170, 2, 104, 'px'), range('Radius', '--rr', 10, 46, 1, 32, '%')])
    };
  } });

  /* 20. swinging key — a key swings on its bow like a pendulum */
  M.push({ key: 'swingkey', title: 'Swinging Key', tags: ['loader', 'pendulum'], build: function (v) {
    var d = D(v, 1.5), a = 34 + (v.i % 4) * 5;
    return {
      html: '<div class="ky"><i class="k"></i></div>',
      css: join([
        '.ky{position:relative;width:var(--sz,90px);height:var(--sz,90px)}',
        '.ky::before{content:"";position:absolute;left:50%;top:6%;width:10px;height:10px;margin-left:-5px;border-radius:50%;background:var(--c3,' + v.c3 + ')}',
        '.ky .k{position:absolute;left:50%;top:10%;width:14px;height:64%;margin-left:-7px;transform-origin:50% 0;animation:a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.45,0,.55,1) infinite}',
        '.ky .k::before{content:"";position:absolute;top:0;left:-4px;width:22px;height:22px;border-radius:50%;border:7px solid var(--c1,' + v.c1 + ');box-shadow:0 0 8px color-mix(in srgb,var(--c1,' + v.c1 + ') 70%,transparent)}',
        '.ky .k::after{content:"";position:absolute;top:22px;left:2px;width:6px;bottom:0;background:var(--c1,' + v.c1 + ');border-radius:0 0 3px 3px}',
        kf('a' + v.i, '0%,100%{transform:rotate(' + -a + 'deg)}50%{transform:rotate(' + a + 'deg)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 56, 150, 2, 90, 'px')])
    };
  } });

  /* 21. spiral particles — canvas particles spiral inward and respawn */
  M.push({ key: 'dotspiral', title: 'Spiral Particles', tags: ['loader', 'canvas', 'js'], build: function (v) {
    var n = 26 + (v.i % 5) * 4, d = D(v, 2.4);
    return {
      html: '<canvas class="cv" width="240" height="150"></canvas>',
      css: join([
        '.cv{width:var(--w,240px);height:var(--h,150px);animation:b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('b' + v.i, '0%,100%{opacity:.85}50%{opacity:1}')
      ]),
      js: 'var c=root.querySelector(".cv"),g=c.getContext&&c.getContext("2d");if(!g)return;var N=' + n + ',P=[],t=0;for(var i=0;i<N;i++)P.push({a:Math.random()*6.283,r:Math.random()*110,sp:.4+Math.random()*.8});api.raf(function(){t+=.016;g.clearRect(0,0,240,150);g.fillStyle="' + v.c1 + '";for(var i=0;i<N;i++){var p=P[i];p.a+=.02*p.sp;p.r-=.35*p.sp;if(p.r<3){p.r=110;p.a=Math.random()*6.283}var x=120+Math.cos(p.a)*p.r,y=75+Math.sin(p.a)*p.r*.62;g.globalAlpha=Math.max(.12,1-p.r/115);g.beginPath();g.arc(x,y,2.1,0,6.283);g.fill();}g.globalAlpha=1;});',
      cfg: core(v, [range('Width', '--w', 150, 320, 2, 240, 'px'), range('Height', '--h', 90, 210, 2, 150, 'px')])
    };
  } });

  K.add('loaders', V.matrix('loaders', M, 24, 'w5l'));
})(window);
