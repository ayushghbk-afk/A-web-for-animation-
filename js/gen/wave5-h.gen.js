/* ============================================================
   Motion Lab — wave 5, 3D (the 1,000-effect expansion)
   21 new mechanic families × 24 variants = 504 candidates.
   Every mechanic is a distinct depth/transform behavior new
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
      col('Face A', '--c1', v.c1),
      col('Face B', '--c2', v.c2),
      col('Face C', '--c3', v.c3)
    ].concat(extra || []);
  }
  function stageCss(v) {
    return '.d35{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;perspective:var(--pers,620px);background:radial-gradient(ellipse at 50% 78%,color-mix(in srgb,var(--c1,' + v.c1 + ') 12%,transparent),transparent 62%)}';
  }

  var M = [];

  /* 1. dot morus — a bead sphere spins on two tilted axes at once */
  M.push({ key: 'dottomorus', title: 'Dot Morus', tags: ['3d', 'sphere'], build: function (v) {
    var d = D(v, 5), dots = '';
    for (var i = 0; i < 12; i++) {
      var a = i * 30;
      dots += '<i style="--a:' + a + 'deg"></i>';
    }
    return {
      html: '<div class="d35"><div class="dr"><div class="eq">' + dots + '</div><div class="px" style="--tilt:60deg">' + dots + '</div><div class="px" style="--tilt:-60deg">' + dots + '</div></div></div>',
      css: join([
        stageCss(v),
        '.dr{position:relative;width:100%;height:100%;transform-style:preserve-3d;animation:dm-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.eq,.px{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateX(var(--tilt,0deg))}',
        '.eq i,.px i{position:absolute;left:50%;top:50%;width:7px;height:7px;margin:-3.5px;border-radius:50%;background:var(--c3,' + v.c3 + ');transform:rotate(var(--a)) translateZ(var(--rad,44px))}',
        '.dr i,.eq i,.px i{box-shadow:0 0 6px color-mix(in srgb,var(--c3,' + v.c3 + ') 70%,transparent)}',
        kf('dm-a' + v.i, 'from{transform:rotateX(-12deg) rotateY(0)}to{transform:rotateX(-12deg) rotateY(1turn)}')
      ]),
      cfg: core(v, [range('Radius', '--rad', 24, 80, 2, 44, 'px')])
    };
  } });

  /* 2. ico frame — two hex frames counter-rotate to fake an icosahedron */
  M.push({ key: 'icoframe', title: 'Ico Frame', tags: ['3d', 'geometry'], build: function (v) {
    var d = D(v, 6);
    return {
      html: '<div class="d35"><div class="ic"><i class="h1"></i><i class="h2"></i><i class="h3"></i></div></div>',
      css: join([
        stageCss(v),
        '.ic{position:relative;width:100%;height:100%;transform-style:preserve-3d;animation:if-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.ic i{position:absolute;left:50%;top:50%;width:var(--sz,84px);height:calc(var(--sz,84px) * .87);margin:calc(var(--sz,84px) * -.435) 0 0 calc(var(--sz,84px)/-2);clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);background:conic-gradient(from 0deg,transparent 0 6deg,var(--c1,' + v.c1 + ') 6deg 10deg,transparent 10deg 51deg,var(--c2,' + v.c2 + ') 51deg 55deg,transparent 55deg 101deg,var(--c1,' + v.c1 + ') 101deg 105deg,transparent 105deg 151deg,var(--c2,' + v.c2 + ') 151deg 155deg,transparent 155deg 201deg,var(--c1,' + v.c1 + ') 201deg 205deg,transparent 205deg 251deg,var(--c2,' + v.c2 + ') 251deg 255deg,transparent 255deg 301deg,var(--c1,' + v.c1 + ') 301deg 305deg,transparent 305deg 351deg,var(--c2,' + v.c2 + ') 351deg 355deg,transparent 355deg 1turn)}',
        '.h2{transform:rotateY(60deg)}',
        '.h3{transform:rotateY(120deg)}',
        kf('if-a' + v.i, 'from{transform:rotateX(18deg) rotateY(0)}to{transform:rotateX(18deg) rotateY(1turn)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 56, 140, 2, 84, 'px')])
    };
  } });

  /* 3. cube grid — a 2×2×2 lattice of cubes tumbles together */
  M.push({ key: 'cubegrid', title: 'Cube Grid', tags: ['3d', 'lattice'], build: function (v) {
    var d = D(v, 6), cubes = '';
    var pos = [[-1, -1, 0], [1, -1, 0], [-1, 1, 0], [1, 1, 0]];
    for (var i = 0; i < pos.length; i++) {
      cubes += '<b class="cu" style="--tx:' + pos[i][0] + ';--ty:' + pos[i][1] + ';--i:' + i + '"><i class="f f1"></i><i class="f f2"></i><i class="f f3"></i><i class="f f4"></i></b>';
    }
    return {
      html: '<div class="d35"><div class="cg">' + cubes + '</div></div>',
      css: join([
        stageCss(v),
        '.cg{position:relative;width:100%;height:100%;transform-style:preserve-3d;animation:cg-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.cu{position:absolute;left:50%;top:50%;width:var(--cs,34px);height:var(--cs,34px);margin:calc(var(--cs,34px)/-2);transform-style:preserve-3d;transform:translate3d(calc(var(--tx) * var(--gap,46px)),calc(var(--ty) * var(--gap,46px)),0);animation:cg-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -8)}',
        '.cu .f{position:absolute;inset:0;border:1.5px solid var(--c1,' + v.c1 + ');background:color-mix(in srgb,var(--c2,' + v.c2 + ') 16%,transparent)}',
        '.f1{transform:translateZ(calc(var(--cs,34px)/2))}',
        '.f2{transform:rotateY(90deg) translateZ(calc(var(--cs,34px)/2))}',
        '.f3{transform:rotateY(180deg) translateZ(calc(var(--cs,34px)/2));border-color:var(--c3,' + v.c3 + ')}',
        '.f4{transform:rotateY(270deg) translateZ(calc(var(--cs,34px)/2))}',
        kf('cg-a' + v.i, '0%,100%{transform:rotateX(-16deg) rotateY(-30deg)}50%{transform:rotateX(-16deg) rotateY(150deg)}'),
        kf('cg-b' + v.i, '0%,100%{transform:translate3d(calc(var(--tx) * var(--gap,46px)),calc(var(--ty) * var(--gap,46px)),0) rotate(0)}50%{transform:translate3d(calc(var(--tx) * var(--gap,46px)),calc(var(--ty) * var(--gap,46px)),0) rotate(90deg)}')
      ]),
      cfg: core(v, [range('Cube size', '--cs', 22, 52, 2, 34, 'px'), range('Gap', '--gap', 34, 74, 2, 46, 'px')])
    };
  } });

  /* 4. cone spiral — a helix of flat cones climbs while the tower spins */
  M.push({ key: 'conespiral', title: 'Cone Spiral', tags: ['3d', 'helix'], build: function (v) {
    var d = D(v, 5), cones = '';
    for (var i = 0; i < 8; i++) {
      cones += '<i style="--i:' + i + ';--a:' + (i * 45) + 'deg;--y:' + (i * 9 - 27) + 'px"></i>';
    }
    return {
      html: '<div class="d35"><div class="cs2">' + cones + '</div></div>',
      css: join([
        stageCss(v),
        '.cs2{position:relative;width:100%;height:100%;transform-style:preserve-3d;transform:rotateX(24deg);animation:cp-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.cs2 i{position:absolute;left:50%;top:50%;width:0;height:0;margin:-9px 0 0 -11px;border-left:11px solid transparent;border-right:11px solid transparent;border-bottom:18px solid var(--c1,' + v.c1 + ');transform:translateY(var(--y)) rotate(var(--a)) translateZ(var(--rad,40px)) rotateX(60deg);animation:cp-b' + v.i + ' var(--dur,' + d + 's) linear infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -8)}',
        kf('cp-a' + v.i, 'to{transform:rotateX(24deg) rotateY(1turn)}'),
        kf('cp-b' + v.i, '0%,100%{border-bottom-color:var(--c1,' + v.c1 + ')}50%{border-bottom-color:var(--c3,' + v.c3 + ')}')
      ]),
      cfg: core(v, [range('Radius', '--rad', 20, 70, 2, 40, 'px')])
    };
  } });

  /* 5. möbius — the tile band twists half a turn and re-forms */
  M.push({ key: 'mobius', title: 'Möbius Band', tags: ['3d', 'ribbon'], build: function (v) {
    var d = D(v, 5.6), tiles = '';
    for (var i = 0; i < 12; i++) tiles += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="d35"><div class="mb">' + tiles + '</div></div>',
      css: join([
        stageCss(v),
        '.mb{position:relative;width:100%;height:100%;transform-style:preserve-3d;transform:rotateX(18deg);animation:mb-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.mb i{position:absolute;left:50%;top:50%;width:var(--tw,26px);height:34px;margin:-17px 0 0 -13px;border-radius:5px;background:linear-gradient(180deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform:rotate(calc(var(--i) * 30deg)) translateZ(var(--rad,46px)) rotateY(calc(var(--i) * 30deg * -1)) rotateX(calc(var(--i) * 15deg));animation:mb-b' + v.i + ' calc(var(--dur,' + d + 's)/4) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -12)}',
        kf('mb-a' + v.i, 'to{transform:rotateX(18deg) rotateY(1turn)}'),
        kf('mb-b' + v.i, '0%,100%{opacity:.85}50%{opacity:1;box-shadow:0 0 14px color-mix(in srgb,var(--c3,' + v.c3 + ') 60%,transparent)}')
      ]),
      cfg: core(v, [range('Tile width', '--tw', 16, 40, 2, 26, 'px'), range('Radius', '--rad', 28, 84, 2, 46, 'px')])
    };
  } });

  /* 6. double pendulum — two arms swing out of phase, like a metronome duo */
  M.push({ key: 'doublepend', title: 'Double Pendulum', tags: ['3d', 'physics'], build: function (v) {
    var d = D(v, 2.2);
    return {
      html: '<div class="d35"><div class="pd"><div class="arm1"><i class="bob1"></i><div class="arm2"><i class="bob2"></i></div></div></div></div>',
      css: join([
        stageCss(v),
        '.pd{position:relative;width:4px;height:var(--l1,64px);background:var(--c3,' + v.c3 + ');transform-origin:50% 0;margin-top:calc(var(--l1,64px)/-2);transform-style:preserve-3d;animation:dp-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.arm1{position:absolute;left:50%;top:100%;width:4px;height:var(--l2,52px);margin-left:-2px;background:var(--c3,' + v.c3 + ');transform-origin:50% 0;transform-style:preserve-3d;animation:dp-b' + v.i + ' calc(var(--dur,' + d + 's)/2) ease-in-out infinite}',
        '.bob1{position:absolute;left:50%;bottom:-7px;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:var(--c1,' + v.c1 + ');box-shadow:0 0 12px color-mix(in srgb,var(--c1,' + v.c1 + ') 70%,transparent)}',
        '.bob2{position:absolute;left:50%;bottom:-8px;width:16px;height:16px;margin-left:-8px;border-radius:50%;background:var(--c2,' + v.c2 + ');box-shadow:0 0 14px color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,transparent)}',
        kf('dp-a' + v.i, '0%,100%{transform:rotateX(var(--rx,20deg)) rotateZ(-28deg)}50%{transform:rotateX(var(--rx,20deg)) rotateZ(28deg)}'),
        kf('dp-b' + v.i, '0%,100%{transform:rotateZ(34deg)}50%{transform:rotateZ(-34deg)}')
      ]),
      cfg: core(v, [range('Upper arm', '--l1', 40, 90, 2, 64, 'px'), range('Lower arm', '--l2', 32, 80, 2, 52, 'px')])
    };
  } });

  /* 7. mesh gears 3D — two toothed rings mesh on tilted planes */
  M.push({ key: 'meshgears3d', title: 'Mesh Gears 3D', tags: ['3d', 'mechanism'], build: function (v) {
    var d = D(v, 4.5);
    return {
      html: '<div class="d35"><div class="mg"><i class="g1"></i><i class="g2"></i></div></div>',
      css: join([
        stageCss(v),
        '.mg{position:relative;width:100%;height:100%;transform-style:preserve-3d;transform:rotateX(30deg)}',
        '.mg i{position:absolute;left:50%;top:50%;width:var(--sz,74px);height:var(--sz,74px);margin:calc(var(--sz,74px)/-2);border-radius:50%;background:repeating-conic-gradient(from 0deg,transparent 0 12deg,var(--c1,' + v.c1 + ') 12deg 24deg);border:3px dashed var(--c1,' + v.c1 + ');transform-style:preserve-3d}',
        '.g1{transform:translateX(-34px) rotateY(18deg);animation:mg-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.g2{transform:translateX(34px) rotateY(18deg);border-color:var(--c2,' + v.c2 + ');background:repeating-conic-gradient(from 6deg,transparent 0 12deg,var(--c2,' + v.c2 + ') 12deg 24deg);animation:mg-b' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('mg-a' + v.i, 'from{transform:translateX(-34px) rotateY(18deg) rotate(0)}to{transform:translateX(-34px) rotateY(18deg) rotate(1turn)}'),
        kf('mg-b' + v.i, 'from{transform:translateX(34px) rotateY(18deg) rotate(0)}to{transform:translateX(34px) rotateY(18deg) rotate(-1turn)}')
      ]),
      cfg: core(v, [range('Gear size', '--sz', 48, 120, 2, 74, 'px')])
    };
  } });

  /* 8. unfold — the cube flattens into a cross, folds back, and keeps time */
  M.push({ key: 'unfold', title: 'Unfold', tags: ['3d', 'cube'], build: function (v) {
    var d = D(v, 5.6);
    return {
      html: '<div class="d35"><div class="uf"><i class="f c"></i><i class="f t"></i><i class="f b"></i><i class="f l"></i><i class="f r"></i></div></div>',
      css: join([
        stageCss(v),
        '.uf{position:relative;width:var(--cs,52px);height:var(--cs,52px);transform-style:preserve-3d;transform:rotateX(-24deg) rotateY(-32deg)}',
        '.uf .f{position:absolute;inset:0;border:2px solid var(--c1,' + v.c1 + ');background:color-mix(in srgb,var(--c2,' + v.c2 + ') 22%,transparent)}',
        '.c{transform:translateZ(calc(var(--cs,52px)/2))}',
        '.t{transform-origin:50% 0;transform:rotateX(90deg) translateZ(calc(var(--cs,52px)/2))}',
        '.b{transform-origin:50% 100%;transform:rotateX(-90deg) translateZ(calc(var(--cs,52px)/2))}',
        '.l{transform-origin:0 50%;transform:rotateY(-90deg) translateZ(calc(var(--cs,52px)/2))}',
        '.r{transform-origin:100% 50%;transform:rotateY(90deg) translateZ(calc(var(--cs,52px)/2))}',
        '.t{animation:uf-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.b{animation:uf-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.l{animation:uf-c' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.r{animation:uf-d' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('uf-a' + v.i, '0%,18%{transform:rotateX(90deg) translateZ(calc(var(--cs,52px)/2))}38%,62%{transform:rotateX(180deg) translateZ(calc(var(--cs,52px)/2))}82%,100%{transform:rotateX(90deg) translateZ(calc(var(--cs,52px)/2))}'),
        kf('uf-b' + v.i, '0%,18%{transform:rotateX(-90deg) translateZ(calc(var(--cs,52px)/2))}38%,62%{transform:rotateX(0) translateZ(calc(var(--cs,52px)/2))}82%,100%{transform:rotateX(-90deg) translateZ(calc(var(--cs,52px)/2))}'),
        kf('uf-c' + v.i, '0%,22%{transform:rotateY(-90deg) translateZ(calc(var(--cs,52px)/2))}42%,62%{transform:rotateY(-180deg) translateZ(calc(var(--cs,52px)/2))}82%,100%{transform:rotateY(-90deg) translateZ(calc(var(--cs,52px)/2))}'),
        kf('uf-d' + v.i, '0%,22%{transform:rotateY(90deg) translateZ(calc(var(--cs,52px)/2))}42%,62%{transform:rotateY(0) translateZ(calc(var(--cs,52px)/2))}82%,100%{transform:rotateY(90deg) translateZ(calc(var(--cs,52px)/2))}')
      ]),
      cfg: core(v, [range('Cube size', '--cs', 34, 84, 2, 52, 'px')])
    };
  } });

  /* 9. wave grid 3D — a lattice of studs ripples in depth */
  M.push({ key: 'wavegrid3d', title: 'Wave Grid 3D', tags: ['3d', 'lattice'], build: function (v) {
    var d = D(v, 2.8), studs = '', i = 0;
    for (var gx = 0; gx < 6; gx++) for (var gy = 0; gy < 5; gy++) {
      studs += '<i style="--i:' + i + ';--tx:' + (gx - 2.5) + ';--ty:' + (gy - 2) + '"></i>';
      i++;
    }
    return {
      html: '<div class="d35"><div class="wg">' + studs + '</div></div>',
      css: join([
        stageCss(v),
        '.wg{position:relative;width:100%;height:100%;transform-style:preserve-3d;transform:rotateX(56deg)}',
        '.wg i{position:absolute;left:50%;top:50%;width:8px;height:8px;margin:-4px;border-radius:50%;background:var(--c3,' + v.c3 + ');transform:translate3d(calc(var(--tx) * var(--gap,26px)),calc(var(--ty) * var(--gap,26px)),0);animation:wg-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc((var(--tx) + var(--ty)) * var(--step,' + v.step + 's) * -1.6)}',
        kf('wg-a' + v.i, '0%,100%{transform:translate3d(calc(var(--tx) * var(--gap,26px)),calc(var(--ty) * var(--gap,26px)),0);background:var(--c3,' + v.c3 + ')}50%{transform:translate3d(calc(var(--tx) * var(--gap,26px)),calc(var(--ty) * var(--gap,26px)),26px);background:var(--c1,' + v.c1 + ')}')
      ]),
      cfg: core(v, [range('Gap', '--gap', 18, 38, 1, 26, 'px')])
    };
  } });

  /* 10. tesseract — the hypercube turns: inner cube counter-rotates */
  M.push({ key: 'tesseract', title: 'Tesseract', tags: ['3d', 'geometry'], build: function (v) {
    var d = D(v, 7);
    function cube(cls, s) {
      return '<div class="' + cls + '"><i class="f f1"></i><i class="f f2"></i><i class="f f3"></i><i class="f f4"></i><i class="f f5"></i><i class="f f6"></i></div>';
    }
    return {
      html: '<div class="d35"><div class="tc">' + cube('outer', 1) + cube('inner', 1) + '</div></div>',
      css: join([
        stageCss(v),
        '.tc{position:relative;width:100%;height:100%;transform-style:preserve-3d;animation:tc-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.outer,.inner{position:absolute;left:50%;top:50%;width:var(--cs,84px);height:var(--cs,84px);margin:calc(var(--cs,84px)/-2);transform-style:preserve-3d}',
        '.inner{width:calc(var(--cs,84px)*.45);height:calc(var(--cs,84px)*.45);margin:calc(var(--cs,84px)*-.225);animation:tc-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.f{position:absolute;inset:0;border:2px solid var(--c1,' + v.c1 + ');background:color-mix(in srgb,var(--c2,' + v.c2 + ') 8%,transparent)}',
        '.inner .f{border-color:var(--c3,' + v.c3 + ');background:color-mix(in srgb,var(--c3,' + v.c3 + ') 14%,transparent)}',
        '.f1{transform:translateZ(calc(var(--cs,84px)/2))}',
        '.f2{transform:rotateY(90deg) translateZ(calc(var(--cs,84px)/2))}',
        '.f3{transform:rotateY(180deg) translateZ(calc(var(--cs,84px)/2))}',
        '.f4{transform:rotateY(270deg) translateZ(calc(var(--cs,84px)/2))}',
        '.f5{transform:rotateX(90deg) translateZ(calc(var(--cs,84px)/2))}',
        '.f6{transform:rotateX(-90deg) translateZ(calc(var(--cs,84px)/2))}',
        kf('tc-a' + v.i, '0%,100%{transform:rotateX(-14deg) rotateY(-24deg)}50%{transform:rotateX(-14deg) rotateY(156deg)}'),
        kf('tc-b' + v.i, '0%,100%{transform:rotateY(0)}50%{transform:rotateY(-180deg)}')
      ]),
      cfg: core(v, [range('Cube size', '--cs', 56, 130, 2, 84, 'px')])
    };
  } });

  /* 11. blade spin — the pinwheel blades flap in a travelling ripple */
  M.push({ key: 'bladespin', title: 'Blade Spin', tags: ['3d', 'rotor'], build: function (v) {
    var d = D(v, 4);
    return {
      html: '<div class="d35"><div class="bl"><i class="b1"></i><i class="b2"></i><i class="b3"></i><i class="b4"></i><b class="hub"></b></div></div>',
      css: join([
        stageCss(v),
        '.bl{position:relative;width:100%;height:100%;transform-style:preserve-3d;transform:rotateX(28deg);animation:bl-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.bl i{position:absolute;left:50%;top:50%;width:var(--bw,18px);height:var(--bl,64px);margin:0 0 0 -9px;border-radius:9px;background:linear-gradient(180deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform-origin:50% 100%;transform:translateY(-100%) rotate(var(--a,0deg));animation:bl-b' + v.i + ' calc(var(--dur,' + d + 's)/2) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -8)}',
        '.b1{--a:0deg;--i:0}.b2{--a:90deg;--i:1}.b3{--a:180deg;--i:2}.b4{--a:270deg;--i:3}',
        '.hub{position:absolute;left:50%;top:50%;width:16px;height:16px;margin:-8px;border-radius:50%;background:var(--c3,' + v.c3 + ')}',
        kf('bl-a' + v.i, 'to{transform:rotateX(28deg) rotateZ(1turn)}'),
        kf('bl-b' + v.i, '0%,100%{transform:translateY(-100%) rotate(var(--a,0deg)) rotateZ(0)}50%{transform:translateY(-100%) rotate(var(--a,0deg)) rotateZ(38deg)}')
      ]),
      cfg: core(v, [range('Blade width', '--bw', 10, 30, 2, 18, 'px'), range('Blade length', '--bl', 40, 90, 2, 64, 'px')])
    };
  } });

  /* 12. coin stack — the coins spin, lift, and land back in the pile */
  M.push({ key: 'coinstack', title: 'Coin Stack', tags: ['3d', 'stack'], build: function (v) {
    var d = D(v, 4.4), coins = '';
    for (var i = 0; i < 5; i++) coins += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="d35"><div class="cs3">' + coins + '</div></div>',
      css: join([
        stageCss(v),
        '.cs3{position:relative;width:var(--sz,64px);height:var(--sz,64px);transform-style:preserve-3d;transform:rotateX(58deg) rotateZ(-20deg)}',
        '.cs3 i{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 38% 34%,color-mix(in srgb,var(--c3,' + v.c3 + ') 60%,#fff 0),var(--c3,' + v.c3 + ') 40%,var(--c2,' + v.c2 + ') 75%);border:2px solid color-mix(in srgb,var(--c3,' + v.c3 + ') 50%,#fff);transform:translateZ(calc(var(--i) * 7px));animation:co-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -5)}',
        kf('co-a' + v.i, '0%,100%{transform:translateZ(calc(var(--i) * 7px)) rotateY(0)}45%{transform:translateZ(calc(var(--i) * 7px + 26px)) rotateY(1turn)}65%{transform:translateZ(calc(var(--i) * 7px)) rotateY(1turn)}')
      ]),
      cfg: core(v, [range('Coin size', '--sz', 40, 100, 2, 64, 'px')])
    };
  } });

  /* 13. cube pyramid — the tiers of the pyramid turn as one */
  M.push({ key: 'cubepyramid', title: 'Cube Pyramid', tags: ['3d', 'stack'], build: function (v) {
    var d = D(v, 6), cs = '';
    var tiers = [4, 3, 2, 1];
    for (var t = 0; t < tiers.length; t++) {
      for (var k = 0; k < tiers[t]; k++) {
        var x = k - (tiers[t] - 1) / 2;
        cs += '<i style="--x:' + x.toFixed(2) + ';--t:' + t + '"></i>';
      }
    }
    return {
      html: '<div class="d35"><div class="py">' + cs + '</div></div>',
      css: join([
        stageCss(v),
        '.py{position:relative;width:100%;height:100%;transform-style:preserve-3d;transform:rotateX(-26deg);animation:py-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.py i{position:absolute;left:50%;top:50%;width:var(--cs,24px);height:var(--cs,24px);margin:calc(var(--cs,24px)/-2);transform:translate3d(calc(var(--x) * var(--cs,24px) + var(--x) * 4px),calc(var(--t) * -30px),calc(var(--t) * 10px));animation:py-b' + v.i + ' calc(var(--dur,' + d + 's)/2) ease-in-out infinite;animation-delay:calc((var(--x) + var(--t)) * var(--dur,' + d + 's) / -16)}',
        '.py i::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));border:1px solid rgba(255,255,255,.25);border-radius:3px}',
        kf('py-a' + v.i, 'to{transform:rotateX(-26deg) rotateY(1turn)}'),
        kf('py-b' + v.i, '0%,100%{opacity:.85}50%{opacity:1;box-shadow:0 0 12px color-mix(in srgb,var(--c3,' + v.c3 + ') 55%,transparent)}')
      ]),
      cfg: core(v, [range('Cube size', '--cs', 16, 36, 2, 24, 'px')])
    };
  } });

  /* 14. solid morph — the cube hands off to the cross and back */
  M.push({ key: 'solidmorph', title: 'Solid Morph', tags: ['3d', 'morph'], build: function (v) {
    var d = D(v, 4.8);
    return {
      html: '<div class="d35"><div class="sm"><div class="sol cube"><i class="f f1"></i><i class="f f2"></i><i class="f f3"></i><i class="f f4"></i></div><div class="sol cross"><i></i><i></i><i></i></div></div></div>',
      css: join([
        stageCss(v),
        '.sm{position:relative;width:100%;height:100%;transform-style:preserve-3d;transform:rotateX(-20deg)}',
        '.sol{position:absolute;left:50%;top:50%;width:var(--cs,56px);height:var(--cs,56px);margin:calc(var(--cs,56px)/-2);transform-style:preserve-3d}',
        '.cube{animation:sm-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.cross{animation:sm-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.cube .f{position:absolute;inset:0;border:2px solid var(--c1,' + v.c1 + ');background:color-mix(in srgb,var(--c1,' + v.c1 + ') 14%,transparent)}',
        '.f1{transform:translateZ(calc(var(--cs,56px)/2))}',
        '.f2{transform:rotateY(90deg) translateZ(calc(var(--cs,56px)/2))}',
        '.f3{transform:rotateY(180deg) translateZ(calc(var(--cs,56px)/2))}',
        '.f4{transform:rotateY(270deg) translateZ(calc(var(--cs,56px)/2))}',
        '.cross i{position:absolute;inset:0;border-radius:6px;background:linear-gradient(180deg,var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '));border:1px solid rgba(255,255,255,.3)}',
        '.cross i:nth-child(1){transform:rotateX(90deg)}',
        '.cross i:nth-child(2){transform:rotateY(90deg)}',
        '.cross i:nth-child(3){transform:translateZ(0)}',
        kf('sm-a' + v.i, '0%,40%{opacity:1;transform:rotateY(0) scale(1)}52%,88%{opacity:0;transform:rotateY(180deg) scale(.2)}100%{opacity:0;transform:rotateY(360deg) scale(.2)}'),
        kf('sm-b' + v.i, '0%,42%{opacity:0;transform:rotateY(0) scale(.2)}54%,86%{opacity:1;transform:rotateY(180deg) scale(1)}100%{opacity:0;transform:rotateY(360deg) scale(.2)}')
      ]),
      cfg: core(v, [range('Size', '--cs', 36, 88, 2, 56, 'px')])
    };
  } });

  /* 15. fan 3D — the cards fan open and sweep around the hinge */
  M.push({ key: 'fan3d', title: 'Fan 3D', tags: ['3d', 'cards'], build: function (v) {
    var d = D(v, 5.2), cards = '';
    for (var i = 0; i < 5; i++) cards += '<i style="--i:' + i + ';--r:' + ((i - 2) * 16) + 'deg"></i>';
    return {
      html: '<div class="d35"><div class="fn">' + cards + '<b class="hinge"></b></div></div>',
      css: join([
        stageCss(v),
        '.fn{position:relative;width:var(--cw,54px);height:var(--ch,74px);transform-style:preserve-3d;transform:rotateX(14deg);animation:fn-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.fn i{position:absolute;inset:0;border-radius:8px;background:linear-gradient(160deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 80%,#fff) 0 12%,color-mix(in srgb,var(--c1,' + v.c1 + ') 30%,#fff) 12% 26%,color-mix(in srgb,var(--c2,' + v.c2 + ') 55%,#fff));border:1px solid rgba(255,255,255,.6);box-shadow:0 10px 18px -8px rgba(0,0,0,.5);transform-origin:50% 115%;transform:rotate(var(--r,0deg)) rotateY(0);animation:fn-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.hinge{position:absolute;left:50%;top:115%;width:8px;height:8px;margin-left:-4px;border-radius:50%;background:var(--c3,' + v.c3 + ')}',
        kf('fn-a' + v.i, '0%,100%{transform:rotateX(14deg) rotateZ(0)}50%{transform:rotateX(14deg) rotateZ(36deg)}'),
        kf('fn-b' + v.i, '0%,100%{transform:rotate(var(--r,0deg)) rotateY(0)}50%{transform:rotate(calc(var(--r,0deg) * .25)) rotateY(14deg)}')
      ]),
      cfg: core(v, [range('Card width', '--cw', 36, 72, 2, 54, 'px'), range('Card height', '--ch', 50, 100, 2, 74, 'px')])
    };
  } });

  /* 16. deck shuffle — the deck riffles: each card flips over to the back */
  M.push({ key: 'deckshuffle', title: 'Deck Shuffle', tags: ['3d', 'cards'], build: function (v) {
    var d = D(v, 3.2);
    return {
      html: '<div class="d35"><div class="dk"><i class="c c3"></i><i class="c c2"></i><i class="c c1"></i></div></div>',
      css: join([
        stageCss(v),
        '.dk{position:relative;width:var(--cw,58px);height:var(--ch,78px);transform-style:preserve-3d;transform:rotateX(18deg)}',
        '.dk .c{position:absolute;inset:0;border-radius:7px;transform-style:preserve-3d;animation:dk-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.c1{animation-delay:0s}',
        '.c2{animation-delay:calc(var(--dur,' + d + 's) / -3)}',
        '.c3{animation-delay:calc(var(--dur,' + d + 's) / -1.5)}',
        '.dk .c::before,.dk .c::after{content:"";position:absolute;inset:0;border-radius:7px;backface-visibility:hidden;-webkit-backface-visibility:hidden;border:1px solid rgba(255,255,255,.4)}',
        '.dk .c::before{background:linear-gradient(160deg,var(--c1,' + v.c1 + '),color-mix(in srgb,var(--c1,' + v.c1 + ') 40%,#000))}',
        '.dk .c::after{background:repeating-linear-gradient(45deg,var(--c2,' + v.c2 + ') 0 6px,color-mix(in srgb,var(--c2,' + v.c2 + ') 50%,#000) 6px 12px);transform:rotateY(180deg)}',
        kf('dk-a' + v.i, '0%,30%{transform:translateY(0) rotateY(0)}55%,75%{transform:translateY(-26px) rotateY(180deg)}100%{transform:translateY(-26px) rotateY(540deg)}')
      ]),
      cfg: core(v, [range('Card width', '--cw', 40, 80, 2, 58, 'px'), range('Card height', '--ch', 54, 104, 2, 78, 'px')])
    };
  } });

  /* 17. ring tower — the rings stack, spiral up, and pour back */
  M.push({ key: 'ringtower', title: 'Ring Tower', tags: ['3d', 'stack'], build: function (v) {
    var d = D(v, 4.6), rings = '';
    for (var i = 0; i < 6; i++) rings += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="d35"><div class="rt">' + rings + '</div></div>',
      css: join([
        stageCss(v),
        '.rt{position:relative;width:var(--sz,74px);height:var(--sz,74px);transform-style:preserve-3d;transform:rotateX(60deg)}',
        '.rt i{position:absolute;inset:0;border-radius:50%;border:5px solid var(--c1,' + v.c1 + ');transform:translateZ(calc(var(--i) * 12px));animation:rt-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -6)}',
        kf('rt-a' + v.i, '0%,100%{transform:translateZ(calc(var(--i) * 12px)) rotateZ(0);border-color:var(--c1,' + v.c1 + ')}45%{transform:translateZ(84px) rotateZ(1turn);border-color:var(--c3,' + v.c3 + ')}65%{transform:translateZ(calc(var(--i) * 12px)) rotateZ(1turn)}')
      ]),
      cfg: core(v, [range('Ring size', '--sz', 48, 120, 2, 74, 'px')])
    };
  } });

  /* 18. dice tumble — the pip cube rolls face to face */
  M.push({ key: 'dicetumble', title: 'Dice Tumble', tags: ['3d', 'dice'], build: function (v) {
    var d = D(v, 5.4);
    function face(cls, pips) {
      var s = '';
      for (var i = 0; i < pips.length; i++) s += '<b style="left:' + pips[i][0] + '%;top:' + pips[i][1] + '%"></b>';
      return '<i class="f ' + cls + '">' + s + '</i>';
    }
    return {
      html: '<div class="d35"><div class="dc">' + face('f1', [[50, 50]]) + face('f2', [[25, 25], [75, 75]]) + face('f3', [[25, 25], [50, 50], [75, 75]]) + face('f4', [[25, 25], [75, 25], [25, 75], [75, 75]]) + face('f5', [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]]) + face('f6', [[25, 25], [75, 25], [25, 50], [75, 50], [25, 75], [75, 75]]) + '</div></div>',
      css: join([
        stageCss(v),
        '.dc{position:relative;width:var(--cs,54px);height:var(--cs,54px);transform-style:preserve-3d;transform:translateY(calc(var(--cs,54px)/-2));animation:dc-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.dc .f{position:absolute;inset:0;background:color-mix(in srgb,#fff 88%,var(--c1,' + v.c1 + ') 12%);border-radius:8px;border:1px solid rgba(0,0,0,.12)}',
        '.dc b{position:absolute;width:12%;height:12%;transform:translate(-50%,-50%);border-radius:50%;background:var(--c2,' + v.c2 + ')}',
        '.f1{transform:translateZ(calc(var(--cs,54px)/2))}',
        '.f2{transform:rotateY(90deg) translateZ(calc(var(--cs,54px)/2))}',
        '.f3{transform:rotateY(180deg) translateZ(calc(var(--cs,54px)/2))}',
        '.f4{transform:rotateY(270deg) translateZ(calc(var(--cs,54px)/2))}',
        '.f5{transform:rotateX(90deg) translateZ(calc(var(--cs,54px)/2))}',
        '.f6{transform:rotateX(-90deg) translateZ(calc(var(--cs,54px)/2))}',
        kf('dc-a' + v.i, '0%{transform:translateY(calc(var(--cs,54px)/-2)) rotateX(0) rotateZ(0)}16%{transform:translateY(calc(var(--cs,54px)/-2 - 14px)) rotateX(180deg) rotateZ(0)}33%{transform:translateY(calc(var(--cs,54px)/-2)) rotateX(180deg) rotateZ(0)}50%{transform:translateY(calc(var(--cs,54px)/-2 - 14px)) rotateX(180deg) rotateZ(90deg)}66%{transform:translateY(calc(var(--cs,54px)/-2)) rotateX(180deg) rotateZ(90deg)}83%{transform:translateY(calc(var(--cs,54px)/-2 - 14px)) rotateX(360deg) rotateZ(90deg)}100%{transform:translateY(calc(var(--cs,54px)/-2)) rotateX(360deg) rotateZ(0)}')
      ]),
      cfg: core(v, [range('Die size', '--cs', 36, 80, 2, 54, 'px')])
    };
  } });

  /* 19. spiral stair — the steps turn on the helix, lit by a climbing band */
  M.push({ key: 'spiralstair', title: 'Spiral Stair', tags: ['3d', 'helix'], build: function (v) {
    var d = D(v, 5), steps = '';
    for (var i = 0; i < 10; i++) {
      steps += '<i style="--i:' + i + ';--a:' + (i * 36) + 'deg;--z:' + (i * 7 - 28) + 'px"></i>';
    }
    return {
      html: '<div class="d35"><div class="ss">' + steps + '</div></div>',
      css: join([
        stageCss(v),
        '.ss{position:relative;width:100%;height:100%;transform-style:preserve-3d;transform:rotateX(46deg);animation:ss-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.ss i{position:absolute;left:50%;top:50%;width:var(--sw,34px);height:8px;margin:-4px 0 0 -17px;border-radius:3px;background:linear-gradient(90deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform:translateZ(var(--z)) rotate(var(--a)) translateX(var(--rad,34px));animation:ss-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -10)}',
        kf('ss-a' + v.i, 'to{transform:rotateX(46deg) rotateZ(1turn)}'),
        kf('ss-b' + v.i, '0%,100%{opacity:.55}30%,70%{opacity:1;box-shadow:0 0 10px color-mix(in srgb,var(--c3,' + v.c3 + ') 60%,transparent)}')
      ]),
      cfg: core(v, [range('Step width', '--sw', 22, 50, 2, 34, 'px'), range('Radius', '--rad', 20, 56, 2, 34, 'px')])
    };
  } });

  /* 20. pulse sphere — the wire cage breathes while a ring scans it */
  M.push({ key: 'pulsesphere', title: 'Pulse Sphere', tags: ['3d', 'sphere'], build: function (v) {
    var d = D(v, 3);
    return {
      html: '<div class="d35"><div class="ps"><i class="w1"></i><i class="w2"></i><i class="w3"></i><i class="w4"></i><b class="scan"></b></div></div>',
      css: join([
        stageCss(v),
        '.ps{position:relative;width:var(--sz,92px);height:var(--sz,92px);transform-style:preserve-3d;animation:ps-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.ps i{position:absolute;inset:0;border-radius:50%;border:2px solid color-mix(in srgb,var(--c1,' + v.c1 + ') 75%,transparent)}',
        '.w1{transform:rotateY(0)}',
        '.w2{transform:rotateY(60deg)}',
        '.w3{transform:rotateY(120deg)}',
        '.w4{transform:rotateX(90deg);border-color:var(--c2,' + v.c2 + ')}',
        '.scan{position:absolute;left:50%;top:50%;width:0;height:0;margin:-5px;border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 16px 4px color-mix(in srgb,var(--c3,' + v.c3 + ') 75%,transparent);animation:ps-b' + v.i + ' calc(var(--dur,' + d + 's)/2) ease-in-out infinite}',
        kf('ps-a' + v.i, 'from{transform:rotateX(16deg) rotateY(0)}to{transform:rotateX(16deg) rotateY(1turn)}'),
        kf('ps-b' + v.i, '0%,100%{transform:translateZ(calc(var(--sz,92px)/2)) scale(1)}50%{transform:translateZ(calc(var(--sz,92px)/-2)) scale(.7)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 60, 150, 2, 92, 'px')])
    };
  } });

  /* 21. type 3D — the letters bob on depth layers like a wave of monogram cards */
  M.push({ key: 'type3d', title: 'Type 3D Wave', tags: ['3d', 'type'], build: function (v) {
    var d = D(v, 3.4), words = ['A', 'K', 'L', 'O', 'B'], chars = '';
    for (var i = 0; i < words.length; i++) chars += '<i style="--i:' + i + '"><b>' + words[i] + '</b></i>';
    return {
      html: '<div class="d35"><div class="ty">' + chars + '</div></div>',
      css: join([
        stageCss(v),
        '.ty{display:flex;gap:var(--gap,14px);transform-style:preserve-3d;transform:rotateX(12deg)}',
        '.ty i{display:block;width:var(--tw,54px);height:var(--th,64px);border-radius:9px;background:linear-gradient(165deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 70%,#fff),color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,#fff));border:1px solid rgba(255,255,255,.5);box-shadow:0 14px 22px -10px rgba(0,0,0,.55);display:grid;place-items:center;animation:ty-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -5)}',
        '.ty b{font:800 30px system-ui;color:rgba(255,255,255,.95);text-shadow:0 2px 0 color-mix(in srgb,var(--c3,' + v.c3 + ') 60%,transparent),0 4px 0 color-mix(in srgb,var(--c3,' + v.c3 + ') 30%,transparent),0 6px 8px rgba(0,0,0,.35)}',
        kf('ty-a' + v.i, '0%,100%{transform:translateZ(0) rotateY(0)}50%{transform:translateZ(34px) rotateY(16deg)}')
      ]),
      cfg: core(v, [range('Tile width', '--tw', 38, 72, 2, 54, 'px'), range('Tile height', '--th', 46, 84, 2, 64, 'px'), range('Gap', '--gap', 8, 24, 2, 14, 'px')])
    };
  } });

  K.add('3d', V.matrix('3d', M, 24, 'w5d3'));
})(window);
