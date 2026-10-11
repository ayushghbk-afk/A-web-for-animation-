/* ============================================================
   Motion Lab — wave 5, NATURE (the 1,000-effect expansion)
   21 new mechanic families × 24 variants = 504 candidates.
   Every mechanic is a distinct natural phenomenon new to the
   collection; variants differ in geometry, rhythm, easing and
   palette. House rule: custom properties are only ever read
   with a fallback, never declared in demo CSS.
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
      col('Nature A', '--c1', v.c1),
      col('Nature B', '--c2', v.c2),
      col('Nature C', '--c3', v.c3)
    ].concat(extra || []);
  }
  function stageCss(v) {
    return '.nt5{position:relative;width:100%;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,color-mix(in srgb,var(--c3,' + v.c3 + ') 8%,transparent),transparent 40%)}';
  }

  var M = [];

  /* 1. rainbow arc — the bands draw on in a chord */
  M.push({ key: 'rainbowarc', title: 'Rainbow Arc', tags: ['nature', 'sky'], build: function (v) {
    var d = D(v, 4), bands = [46, 38, 30, 22, 14], colors = ['var(--c1,' + v.c1 + ')', 'var(--c2,' + v.c2 + ')', 'var(--c3,' + v.c3 + ')', 'rgba(255,255,255,.75)', 'rgba(255,255,255,.5)'], out = '';
    for (var i = 0; i < bands.length; i++) out += '<circle class="rb" style="--i:' + i + ';--c:' + colors[i] + '" cx="100" cy="110" r="' + bands[i] + '"/>';
    return {
      html: '<div class="nt5"><svg viewBox="0 0 200 120" fill="none" class="rw2">' + out + '</svg></div>',
      css: join([
        stageCss(v),
        '.rw2{width:min(100%,300px);height:auto}',
        '.rw2 .rb{stroke:var(--c,var(--c1,' + v.c1 + '));stroke-width:7;stroke-linecap:round;stroke-dasharray:146;stroke-dashoffset:146;animation:rw2-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -1)}',
        kf('rw2-a' + v.i, '0%,6%{stroke-dashoffset:146;opacity:1}40%,80%{stroke-dashoffset:0;opacity:1}94%,100%{stroke-dashoffset:0;opacity:0}')
      ]),
      cfg: core(v)
    };
  } });

  /* 2. bolt draw — the lightning carves, flashes, and re-carves */
  M.push({ key: 'boltdraw', title: 'Bolt Draw', tags: ['nature', 'storm'], build: function (v) {
    var d = D(v, 2.8);
    return {
      html: '<div class="nt5"><svg viewBox="0 0 200 120" fill="none" class="bl"><path class="flash" d="M0 0 H200 V120 H0 Z"/><path class="bolt" d="M104 8 L76 52 L98 54 L70 112 L132 44 L106 42 L128 8 Z"/></svg></div>',
      css: join([
        stageCss(v),
        '.bl{width:min(100%,300px);height:auto}',
        '.bl .flash{fill:var(--c3,' + v.c3 + ');opacity:0;animation:bl-a' + v.i + ' var(--dur,' + d + 's) steps(1) infinite}',
        '.bl .bolt{stroke:var(--c1,' + v.c1 + ');stroke-width:3;stroke-linejoin:round;fill:color-mix(in srgb,var(--c2,' + v.c2 + ') 30%,transparent);stroke-dasharray:340;stroke-dashoffset:340;filter:drop-shadow(0 0 8px var(--c1,' + v.c1 + '));animation:bl-b' + v.i + ' var(--dur,' + d + 's) steps(6) infinite}',
        kf('bl-a' + v.i, '0%,18%{opacity:0}22%{opacity:.18}26%,38%{opacity:0}42%{opacity:.22}48%,100%{opacity:0}'),
        kf('bl-b' + v.i, '0%{stroke-dashoffset:340}45%{stroke-dashoffset:0}80%{stroke-dashoffset:0;opacity:1}92%,100%{stroke-dashoffset:0;opacity:0}')
      ]),
      cfg: core(v)
    };
  } });

  /* 3. dandelion — the seeds take off and drift across the field */
  M.push({ key: 'dandelion', title: 'Dandelion Drift', tags: ['nature', 'seeds'], build: function (v) {
    var d = D(v, 4.4), seeds = '';
    for (var i = 0; i < 9; i++) seeds += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="nt5"><div class="dn"><div class="head"></div>' + seeds + '</div></div>',
      css: join([
        stageCss(v),
        '.dn{position:relative;width:260px;height:140px}',
        '.dn .head{position:absolute;left:24px;top:56px;width:26px;height:26px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--c3,' + v.c3 + ') 50%,#fff) 0 30%,transparent 60%),radial-gradient(circle,transparent 0 34%,color-mix(in srgb,var(--c3,' + v.c3 + ') 40%,transparent) 36% 60%,transparent 62%);box-shadow:0 0 14px color-mix(in srgb,var(--c3,' + v.c3 + ') 30%,transparent)}',
        '.dn i{position:absolute;left:37px;top:69px;width:7px;height:7px;border-radius:50%;background:radial-gradient(circle,#fff 0 28%,color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent) 30% 60%,transparent 62%);box-shadow:0 0 6px rgba(255,255,255,.5);animation:dn-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.3,.5,.6,1) infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -9)}',
        kf('dn-a' + v.i, '0%{transform:translate(0,0) scale(.6);opacity:0}12%{opacity:1;transform:translate(24px,-14px) scale(1)}100%{transform:translate(190px,calc(-30px + var(--i) * 7px)) scale(.8);opacity:0}')
      ]),
      cfg: core(v)
    };
  } });

  /* 4. foam edge — the surf line throws foam that pops and reforms */
  M.push({ key: 'foamedge', title: 'Foam Edge', tags: ['nature', 'water'], build: function (v) {
    var d = D(v, 3), bubbles = '';
    var pts = [[30, 96], [58, 90], [86, 98], [118, 92], [148, 99], [176, 93]];
    for (var i = 0; i < pts.length; i++) bubbles += '<i style="--i:' + i + ';--x:' + pts[i][0] + 'px;--y:' + pts[i][1] + 'px"></i>';
    return {
      html: '<div class="nt5"><div class="fe"><div class="sea"></div><div class="line"></div>' + bubbles + '</div></div>',
      css: join([
        stageCss(v),
        '.fe{position:relative;width:var(--w,240px);height:140px;overflow:hidden;border-radius:12px;background:linear-gradient(180deg,transparent 55%,color-mix(in srgb,var(--c1,' + v.c1 + ') 30%,transparent) 56%,color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent))}',
        '.fe .line{position:absolute;left:-10%;right:-10%;top:55%;height:6px;border-radius:99px;background:rgba(255,255,255,.75);filter:blur(1px);animation:fe-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.fe i{position:absolute;left:var(--x,40px);top:var(--y,90px);width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.85);box-shadow:0 0 8px rgba(255,255,255,.6);animation:fe-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -6)}',
        kf('fe-a' + v.i, '0%,100%{transform:translateX(-14px) scaleY(1)}50%{transform:translateX(14px) scaleY(1.6)}'),
        kf('fe-b' + v.i, '0%,12%{transform:scale(0);opacity:0}30%,60%{transform:scale(1);opacity:.9}80%,100%{transform:scale(1.5);opacity:0}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 320, 2, 240, 'px')])
    };
  } });

  /* 5. drop fall — the drop falls, strikes, and the rings ripple out */
  M.push({ key: 'dropfall', title: 'Drop Fall', tags: ['nature', 'water'], build: function (v) {
    var d = D(v, 2.4);
    return {
      html: '<div class="nt5"><div class="df"><i class="drop"></i><i class="ring"></i><i class="ring"></i><i class="pool"></i></div></div>',
      css: join([
        stageCss(v),
        '.df{position:relative;width:180px;height:140px}',
        '.df .drop{position:absolute;left:50%;top:10%;width:9px;height:14px;margin-left:-4.5px;border-radius:50% 50% 60% 60%;background:var(--c2,' + v.c2 + ');box-shadow:0 0 10px color-mix(in srgb,var(--c2,' + v.c2 + ') 60%,transparent);animation:df-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.55,0,.85,.5) infinite}',
        '.df .ring{position:absolute;left:50%;top:74%;width:12px;height:5px;margin:-2.5px 0 0 -6px;border-radius:50%;border:2px solid var(--c2,' + v.c2 + ');opacity:0;animation:df-b' + v.i + ' var(--dur,' + d + 's) ease-out infinite}',
        '.df .ring:nth-of-type(2){animation-delay:calc(var(--dur,' + d + 's) / -2)}',
        '.df .pool{position:absolute;left:15%;right:15%;top:74%;height:8px;border-radius:50%;background:color-mix(in srgb,var(--c1,' + v.c1 + ') 30%,transparent)}',
        kf('df-a' + v.i, '0%,8%{transform:translateY(0) scale(1);opacity:1}34%{transform:translateY(72px) scale(1);opacity:1}40%{transform:translateY(76px) scale(.4,1.4);opacity:0}100%{transform:translateY(0) scale(1);opacity:0}'),
        kf('df-b' + v.i, '0%,36%{transform:scale(.4);opacity:0}44%{opacity:.9}78%,100%{transform:scale(6);opacity:0}')
      ]),
      cfg: core(v)
    };
  } });

  /* 6. mist drift — the fog banks slide past each other */
  M.push({ key: 'mistdrift', title: 'Mist Drift', tags: ['nature', 'fog'], build: function (v) {
    var d = D(v, 6);
    return {
      html: '<div class="nt5"><div class="ms"><i class="m1"></i><i class="m2"></i><i class="m3"></i><i class="m4"></i></div></div>',
      css: join([
        stageCss(v),
        '.ms{position:relative;width:100%;height:120px}',
        '.ms i{position:absolute;border-radius:99px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--c3,' + v.c3 + ') 34%,#fff) 30% 70%,transparent);filter:blur(6px)}',
        '.m1{left:-20%;top:14%;width:70%;height:18px;animation:ms-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.m2{left:30%;top:40%;width:80%;height:22px;opacity:.8;animation:ms-b' + v.i + ' calc(var(--dur,' + d + 's)/1.5) linear infinite}',
        '.m3{left:-30%;top:64%;width:65%;height:16px;opacity:.6;animation:ms-c' + v.i + ' calc(var(--dur,' + d + 's)/2.2) linear infinite}',
        '.m4{left:45%;top:84%;width:75%;height:20px;opacity:.5;animation:ms-d' + v.i + ' calc(var(--dur,' + d + 's)/1.2) linear infinite}',
        kf('ms-a' + v.i, 'from{transform:translateX(0)}to{transform:translateX(180%)}'),
        kf('ms-b' + v.i, 'from{transform:translateX(0)}to{transform:translateX(-160%)}'),
        kf('ms-c' + v.i, 'from{transform:translateX(0)}to{transform:translateX(200%)}'),
        kf('ms-d' + v.i, 'from{transform:translateX(0)}to{transform:translateX(-150%)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 7. wind lines — the streamlines run and undulate in the breeze */
  M.push({ key: 'windlines', title: 'Wind Lines', tags: ['nature', 'wind'], build: function (v) {
    var d = D(v, 2.4);
    return {
      html: '<div class="nt5"><svg viewBox="0 0 200 120" fill="none" class="wl"><path class="w1" d="M-20 30 C40 18 60 42 120 30 C160 22 180 34 220 28"/><path class="w2" d="M-20 62 C40 50 70 76 130 62 C170 52 190 66 220 60"/><path class="w3" d="M-20 94 C50 84 70 106 130 92 C170 84 190 98 220 92"/></svg></div>',
      css: join([
        stageCss(v),
        '.wl{width:min(100%,320px);height:auto}',
        '.wl path{stroke:var(--c1,' + v.c1 + ');stroke-width:2.5;stroke-linecap:round;stroke-dasharray:26 18;animation:wl-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.wl .w2{stroke:var(--c2,' + v.c2 + ');animation-duration:calc(var(--dur,' + d + 's)/1.4)}',
        '.wl .w3{stroke:var(--c3,' + v.c3 + ');animation-duration:calc(var(--dur,' + d + 's)/.8)}',
        kf('wl-a' + v.i, 'to{stroke-dashoffset:-88}')
      ]),
      cfg: core(v)
    };
  } });

  /* 8. lily bob — the pads tilt and bob on the water */
  M.push({ key: 'lilybob', title: 'Lily Bob', tags: ['nature', 'water'], build: function (v) {
    var d = D(v, 2.8), pads = '';
    var pts = [[40, 40], [110, 64], [160, 36], [74, 86]];
    for (var i = 0; i < pts.length; i++) pads += '<i style="--i:' + i + ';--x:' + pts[i][0] + 'px;--y:' + pts[i][1] + 'px"></i>';
    return {
      html: '<div class="nt5"><div class="lb">' + pads + '</div></div>',
      css: join([
        stageCss(v),
        '.lb{position:relative;width:var(--w,230px);height:130px}',
        '.lb i{position:absolute;left:var(--x,40px);top:var(--y,40px);width:44px;height:38px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(circle at 50% 45%,color-mix(in srgb,var(--c3,' + v.c3 + ') 40%,var(--c1,' + v.c1 + ')) 0 18%,transparent 20%),linear-gradient(160deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));box-shadow:inset 0 -6px 10px rgba(0,0,0,.25);transform-origin:50% 80%;animation:lb-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -4)}',
        kf('lb-a' + v.i, '0%,100%{transform:rotate(-4deg) translateY(0)}50%{transform:rotate(5deg) translateY(-5px)}')
      ]),
      cfg: core(v, [range('Width', '--w', 170, 300, 2, 230, 'px')])
    };
  } });

  /* 9. butterfly — the wings beat while the body weaves the air */
  M.push({ key: 'butterfly', title: 'Butterfly', tags: ['nature', 'wing'], build: function (v) {
    var d = D(v, 1.6);
    return {
      html: '<div class="nt5"><div class="bf"><i class="wl"></i><i class="wr"></i><b class="bd"></b></div></div>',
      css: join([
        stageCss(v),
        '.bf{position:relative;width:120px;height:110px;animation:bf-a' + v.i + ' calc(var(--dur,' + d + 's) * 6) ease-in-out infinite}',
        '.bf .wl,.bf .wr{position:absolute;top:26px;width:52px;height:62px;background:linear-gradient(200deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));box-shadow:inset 0 0 18px rgba(255,255,255,.35)}',
        '.bf .wl{left:6px;border-radius:90% 10% 60% 40%/80% 10% 70% 30%;transform-origin:100% 50%;animation:bf-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.bf .wr{right:6px;border-radius:10% 90% 40% 60%/10% 80% 30% 70%;transform-origin:0 50%;animation:bf-c' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.bf .bd{position:absolute;left:50%;top:22%;width:8px;height:64px;margin-left:-4px;border-radius:99px;background:rgba(24,24,36,.9)}',
        kf('bf-a' + v.i, '0%,100%{transform:translate(-14px,6px) rotate(-6deg)}50%{transform:translate(14px,-8px) rotate(6deg)}'),
        kf('bf-b' + v.i, '0%,100%{transform:rotateY(0)}50%{transform:rotateY(64deg)}'),
        kf('bf-c' + v.i, '0%,100%{transform:rotateY(0)}50%{transform:rotateY(-64deg)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 10. flock — the V-formation flaps across the sky */
  M.push({ key: 'flock', title: 'Flock', tags: ['nature', 'birds'], build: function (v) {
    var d = D(v, 4), birds = '';
    var pts = [[0, 0], [16, -14], [32, -28], [-16, -14], [-32, -28], [16, 14], [-16, 14]];
    for (var i = 0; i < pts.length; i++) birds += '<i style="--i:' + i + ';--x:' + pts[i][0] + 'px;--y:' + pts[i][1] + 'px"></i>';
    return {
      html: '<div class="nt5"><div class="fl">' + birds + '</div></div>',
      css: join([
        stageCss(v),
        '.fl{position:relative;width:120px;height:100px;animation:fl-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite alternate}',
        '.fl i{position:absolute;left:calc(50% + var(--x,0px));top:calc(50% + var(--y,0px));width:16px;height:6px;margin:-3px;background:transparent;animation:fl-b' + v.i + ' calc(var(--dur,' + d + 's)/6) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -12)}',
        '.fl i::before,.fl i::after{content:"";position:absolute;top:2px;width:9px;height:2.5px;border-radius:99px;background:var(--c3,' + v.c3 + ')}',
        '.fl i::before{left:0;transform-origin:100% 50%;transform:rotate(-24deg)}',
        '.fl i::after{right:0;transform-origin:0 50%;transform:rotate(24deg)}',
        kf('fl-a' + v.i, 'from{transform:translate(-24px,6px)}to{transform:translate(24px,-6px)}'),
        kf('fl-b' + v.i, '0%,100%{transform:scaleY(1)}50%{transform:scaleY(.25)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 11. fish school — the shoal swims its lane and turns */
  M.push({ key: 'fishschool', title: 'Fish School', tags: ['nature', 'fish'], build: function (v) {
    var d = D(v, 3.6), fish = '';
    var pts = [[0, 0], [22, -12], [24, 12], [46, -2], [44, 16], [68, 8]];
    for (var i = 0; i < pts.length; i++) fish += '<i style="--i:' + i + ';--x:' + pts[i][0] + 'px;--y:' + pts[i][1] + 'px"></i>';
    return {
      html: '<div class="nt5"><div class="fs">' + fish + '</div></div>',
      css: join([
        stageCss(v),
        '.fs{position:relative;width:140px;height:90px;animation:fs-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite alternate}',
        '.fs i{position:absolute;left:var(--x,0px);top:calc(50% + var(--y,0px));width:26px;height:11px;border-radius:50% 60% 60% 50%;background:linear-gradient(90deg,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + '));animation:fs-b' + v.i + ' calc(var(--dur,' + d + 's)/3) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -6)}',
        '.fs i::after{content:"";position:absolute;right:-7px;top:50%;width:10px;height:10px;margin-top:-5px;background:var(--c1,' + v.c1 + ');clip-path:polygon(100% 50%,0 0,0 100%)}',
        kf('fs-a' + v.i, 'from{transform:translateX(-18px) rotate(3deg)}to{transform:translateX(18px) rotate(-3deg)}'),
        kf('fs-b' + v.i, '0%,100%{transform:scaleX(1)}50%{transform:scaleX(.82)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 12. moon phases — the disc waxes through the cycle */
  M.push({ key: 'moonphases', title: 'Moon Phases', tags: ['nature', 'sky'], build: function (v) {
    var d = D(v, 6);
    return {
      html: '<div class="nt5"><div class="mp"><i class="moon"></i><i class="shade"></i></div></div>',
      css: join([
        stageCss(v),
        '.mp{position:relative;width:var(--sz,84px);height:var(--sz,84px)}',
        '.mp .moon{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 38% 34%,#f5f2e6,#cfc8ae 70%);box-shadow:0 0 24px rgba(245,242,230,.35)}',
        '.mp .shade{position:absolute;inset:0;border-radius:50%;background:#07070d;animation:mp-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('mp-a' + v.i, '0%{transform:translateX(0)}50%{transform:translateX(102%)}100%{transform:translateX(0)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 56, 140, 2, 84, 'px')])
    };
  } });

  /* 13. eclipse — the moon slides across the sun and the corona blooms */
  M.push({ key: 'eclipse', title: 'Eclipse', tags: ['nature', 'sky'], build: function (v) {
    var d = D(v, 7);
    return {
      html: '<div class="nt5"><div class="ec"><i class="corona"></i><i class="sun"></i><i class="moon"></i></div></div>',
      css: join([
        stageCss(v),
        '.ec{position:relative;width:var(--sz,120px);height:var(--sz,120px)}',
        '.ec .sun{position:absolute;inset:18%;border-radius:50%;background:radial-gradient(circle,var(--c3,' + v.c3 + ') 0 40%,color-mix(in srgb,var(--c3,' + v.c3 + ') 45%,transparent) 70%,transparent 72%)}',
        '.ec .moon{position:absolute;inset:20%;border-radius:50%;background:#0a0a12;animation:ec-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.ec .corona{position:absolute;inset:10%;border-radius:50%;border:2px solid var(--c1,' + v.c1 + ');opacity:0;animation:ec-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('ec-a' + v.i, '0%,18%{transform:translateX(-70%)}42%,58%{transform:translateX(0)}82%,100%{transform:translateX(70%)}'),
        kf('ec-b' + v.i, '0%,38%{opacity:0;transform:scale(.7)}46%,54%{opacity:.9;transform:scale(1.05)}62%,100%{opacity:0;transform:scale(.7)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 80, 180, 2, 120, 'px')])
    };
  } });

  /* 14. bloom open — the petals unfold around the bud */
  M.push({ key: 'bloomopen', title: 'Bloom Open', tags: ['nature', 'flower'], build: function (v) {
    var d = D(v, 4), petals = '';
    for (var i = 0; i < 6; i++) petals += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="nt5"><div class="bo">' + petals + '<b class="core2"></b></div></div>',
      css: join([
        stageCss(v),
        '.bo{position:relative;width:120px;height:110px}',
        '.bo i{position:absolute;left:50%;top:50%;width:26px;height:52px;margin:-52px 0 0 -13px;border-radius:50% 50% 42% 42%/70% 70% 30% 30%;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 80%,#fff),var(--c1,' + v.c1 + '));transform-origin:50% 100%;transform:rotate(calc(var(--i) * 60deg)) scaleY(.2);animation:bo-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -1)}',
        '.bo .core2{position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-9px;border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 12px color-mix(in srgb,var(--c3,' + v.c3 + ') 60%,transparent);animation:bo-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('bo-a' + v.i, '0%,10%{transform:rotate(calc(var(--i) * 60deg)) scale(.2)}45%,80%{transform:rotate(calc(var(--i) * 60deg)) scale(1)}95%,100%{transform:rotate(calc(var(--i) * 60deg)) scale(.2)}'),
        kf('bo-b' + v.i, '0%,10%{transform:scale(.5)}45%,80%{transform:scale(1.25)}95%,100%{transform:scale(.5)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 15. sprout — the stem rises and the leaves unfurl */
  M.push({ key: 'sprout', title: 'Sprout', tags: ['nature', 'plant'], build: function (v) {
    var d = D(v, 3.6);
    return {
      html: '<div class="nt5"><div class="sp"><i class="stem"></i><i class="lf2"></i><i class="lf3"></i></div></div>',
      css: join([
        stageCss(v),
        '.sp{position:relative;width:120px;height:120px}',
        '.sp .stem{position:absolute;left:50%;bottom:12px;width:5px;height:64px;margin-left:-2.5px;border-radius:99px;background:linear-gradient(180deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform-origin:50% 100%;transform:scaleY(0);animation:sp-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.3,1.3,.5,1) infinite}',
        '.sp .lf2{position:absolute;left:calc(50% - 2px);bottom:58px;width:30px;height:16px;border-radius:0 100% 0 100%;background:var(--c1,' + v.c1 + ');transform-origin:0 50%;transform:rotate(-18deg) scale(0);animation:sp-b' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.3,1.3,.5,1) infinite}',
        '.sp .lf3{position:absolute;left:calc(50% + 2px);bottom:72px;width:30px;height:16px;border-radius:100% 0 100% 0;background:var(--c2,' + v.c2 + ');transform-origin:100% 50%;transform:rotate(18deg) scale(0);animation:sp-c' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.3,1.3,.5,1) infinite}',
        kf('sp-a' + v.i, '0%{transform:scaleY(0)}30%,86%{transform:scaleY(1)}100%{transform:scaleY(0)}'),
        kf('sp-b' + v.i, '0%,26%{transform:rotate(-18deg) scale(0)}48%,86%{transform:rotate(-18deg) scale(1)}100%{transform:rotate(-18deg) scale(0)}'),
        kf('sp-c' + v.i, '0%,34%{transform:rotate(18deg) scale(0)}58%,86%{transform:rotate(18deg) scale(1)}100%{transform:rotate(18deg) scale(0)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 16. funnel — the particles pour through the narrowing bands */
  M.push({ key: 'funnel', title: 'Funnel Pour', tags: ['nature', 'flow'], build: function (v) {
    var d = D(v, 3), parts = '';
    for (var i = 0; i < 8; i++) parts += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="nt5"><div class="fn2"><i class="f1"></i><i class="f2"></i><i class="f3"></i>' + parts + '<b class="out"></b></div></div>',
      css: join([
        stageCss(v),
        '.fn2{position:relative;width:200px;height:130px}',
        '.fn2 .f1,.fn2 .f2,.fn2 .f3{position:absolute;left:50%;border-radius:6px;background:color-mix(in srgb,var(--c2,' + v.c2 + ') 30%,transparent);border:1px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 55%,transparent)}',
        '.fn2 .f1{top:6px;width:170px;height:34px;margin-left:-85px}',
        '.fn2 .f2{top:50px;width:110px;height:30px;margin-left:-55px}',
        '.fn2 .f3{top:90px;width:56px;height:26px;margin-left:-28px}',
        '.fn2 i{position:absolute;left:50%;top:0;width:6px;height:6px;margin-left:-3px;border-radius:50%;background:var(--c1,' + v.c1 + ');box-shadow:0 0 6px color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent);animation:fn2-a' + v.i + ' var(--dur,' + d + 's) ease-in infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -8)}',
        '.fn2 .out{position:absolute;left:50%;bottom:-6px;width:8px;height:14px;margin-left:-4px;border-radius:0 0 99px 99px;background:var(--c1,' + v.c1 + ');opacity:0;animation:fn2-b' + v.i + ' var(--dur,' + d + 's) steps(8) infinite}',
        kf('fn2-a' + v.i, '0%{transform:translate(-40px,0) scale(1);opacity:0}10%{opacity:1}30%{transform:translate(-26px,48px) scale(.9)}55%{transform:translate(-12px,86px) scale(.8)}80%{transform:translate(0,124px) scale(.7);opacity:1}100%{transform:translate(0,124px) scale(.7);opacity:0}'),
        kf('fn2-b' + v.i, '0%,74%{opacity:0}82%,90%{opacity:.85;transform:scaleY(1.4)}100%{opacity:0}')
      ]),
      cfg: core(v)
    };
  } });

  /* 17. crystal — the shard facets and turns in its cage of light */
  M.push({ key: 'crystal', title: 'Crystal', tags: ['nature', 'mineral'], build: function (v) {
    var d = D(v, 5);
    return {
      html: '<div class="nt5"><div class="cr"><i class="shard"></i><i class="glint"></i></div></div>',
      css: join([
        stageCss(v),
        '.cr{position:relative;width:var(--sz,84px);height:calc(var(--sz,84px) * 1.25)}',
        '.cr .shard{position:absolute;inset:0;background:linear-gradient(160deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 85%,#fff) 0 12%,var(--c1,' + v.c1 + ') 12% 44%,color-mix(in srgb,var(--c2,' + v.c2 + ') 80%,#000) 44% 78%,var(--c3,' + v.c3 + ') 78%);clip-path:polygon(50% 0,92% 30%,78% 100%,22% 100%,8% 30%);transform-origin:50% 60%;animation:cr-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.cr .glint{position:absolute;inset:0;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.65) 46%,transparent 58%);clip-path:polygon(50% 0,92% 30%,78% 100%,22% 100%,8% 30%);animation:cr-b' + v.i + ' calc(var(--dur,' + d + 's)/2) ease-in-out infinite}',
        kf('cr-a' + v.i, '0%,100%{transform:rotateY(0) scale(1)}50%{transform:rotateY(40deg) scale(1.06)}'),
        kf('cr-b' + v.i, '0%,100%{opacity:0;transform:translateX(-30%)}50%{opacity:1;transform:translateX(30%)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 56, 140, 2, 84, 'px')])
    };
  } });

  /* 18. waterfall — the streaks cascade and the pool splashes */
  M.push({ key: 'waterfall', title: 'Waterfall', tags: ['nature', 'water'], build: function (v) {
    var d = D(v, 1.2), streaks = '';
    for (var i = 0; i < 7; i++) streaks += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="nt5"><div class="wf2"><div class="lip"></div><div class="fall">' + streaks + '</div><div class="pool"></div></div></div>',
      css: join([
        stageCss(v),
        '.wf2{position:relative;width:var(--w,150px);height:140px}',
        '.wf2 .lip{position:absolute;top:8px;left:0;right:0;height:10px;border-radius:0 0 12px 12px;background:rgba(160,160,180,.35)}',
        '.wf2 .fall{position:absolute;top:16px;left:8%;right:8%;bottom:26px;overflow:hidden}',
        '.wf2 .fall i{position:absolute;top:-30%;left:calc(var(--i) * 14% + 2%);width:5px;height:55%;border-radius:99px;background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--c2,' + v.c2 + ') 75%,#fff));animation:wf2-a' + v.i + ' var(--dur,' + d + 's) linear infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -7)}',
        '.wf2 .pool{position:absolute;left:-6%;right:-6%;bottom:6px;height:18px;border-radius:50%;background:color-mix(in srgb,var(--c1,' + v.c1 + ') 40%,transparent);animation:wf2-b' + v.i + ' calc(var(--dur,' + d + 's)*2) ease-in-out infinite}',
        kf('wf2-a' + v.i, 'to{transform:translateY(260%)}'),
        kf('wf2-b' + v.i, '0%,100%{transform:scaleX(1)}50%{transform:scaleX(1.08)}')
      ]),
      cfg: core(v, [range('Width', '--w', 110, 220, 2, 150, 'px')])
    };
  } });

  /* 19. steam vent — the plumes rise, wobble, and thin out */
  M.push({ key: 'steamvent', title: 'Steam Vent', tags: ['nature', 'steam'], build: function (v) {
    var d = D(v, 3.4), puffs = '';
    for (var i = 0; i < 6; i++) puffs += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="nt5"><div class="sv"><b class="vent"></b>' + puffs + '</div></div>',
      css: join([
        stageCss(v),
        '.sv{position:relative;width:160px;height:140px}',
        '.sv .vent{position:absolute;left:50%;bottom:0;width:64px;height:12px;margin-left:-32px;border-radius:99px;background:rgba(120,120,140,.5)}',
        '.sv i{position:absolute;left:50%;bottom:8px;width:var(--ps,26px);height:var(--ps,26px);margin-left:calc(var(--ps,26px)/-2);border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--c3,' + v.c3 + ') 55%,#fff) 0 30%,transparent 70%);filter:blur(2px);animation:sv-a' + v.i + ' var(--dur,' + d + 's) ease-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -6)}',
        kf('sv-a' + v.i, '0%{transform:translate(0,0) scale(.5);opacity:0}18%{opacity:.8}100%{transform:translate(calc(var(--i) * 9px - 20px),-110px) scale(2.2);opacity:0}')
      ]),
      cfg: core(v, [range('Puff size', '--ps', 16, 44, 2, 26, 'px')])
    };
  } });

  /* 20. meteor — the streaks burn across the field on stagger */
  M.push({ key: 'meteor', title: 'Meteor', tags: ['nature', 'sky'], build: function (v) {
    var d = D(v, 2.6), meteors = '';
    for (var i = 0; i < 3; i++) meteors += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="nt5"><div class="me">' + meteors + '</div></div>',
      css: join([
        stageCss(v),
        '.me{position:relative;width:240px;height:120px}',
        '.me i{position:absolute;top:calc(18% + var(--i) * 22%);left:0;width:74px;height:3px;border-radius:99px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--c3,' + v.c3 + ') 70%,#fff) 70%,#fff);box-shadow:0 0 10px color-mix(in srgb,var(--c3,' + v.c3 + ') 60%,transparent);transform:rotate(16deg);animation:me-a' + v.i + ' var(--dur,' + d + 's) ease-in infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -3)}',
        kf('me-a' + v.i, '0%{transform:translate(-40px,0) rotate(16deg);opacity:0}10%{opacity:1}70%{opacity:1}100%{transform:translate(250px,86px) rotate(16deg);opacity:0}')
      ]),
      cfg: core(v)
    };
  } });

  /* 21. coral — the branches sway from their base in the current */
  M.push({ key: 'coral', title: 'Coral Sway', tags: ['nature', 'sea'], build: function (v) {
    var d = D(v, 3.4), branches = '';
    var specs = [[30, 60, 0], [60, 46, 1], [92, 66, 2], [118, 40, 3], [142, 56, 4]];
    for (var i = 0; i < specs.length; i++) branches += '<i style="--i:' + i + ';--h:' + specs[i][1] + 'px;--x:' + specs[i][0] + 'px"></i>';
    return {
      html: '<div class="nt5"><div class="co">' + branches + '<b class="bed"></b></div></div>',
      css: join([
        stageCss(v),
        '.co{position:relative;width:var(--w,180px);height:130px}',
        '.co i{position:absolute;left:var(--x,30px);bottom:12px;width:8px;height:var(--h,60px);border-radius:99px 99px 4px 4px;background:linear-gradient(180deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform-origin:50% 100%;animation:co-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -5)}',
        '.co i::before{content:"";position:absolute;top:32%;left:-7px;width:8px;height:16px;border-radius:99px 0 0 99px;background:var(--c1,' + v.c1 + ')}',
        '.co i::after{content:"";position:absolute;top:56%;right:-7px;width:8px;height:14px;border-radius:0 99px 99px 0;background:var(--c2,' + v.c2 + ')}',
        '.co .bed{position:absolute;left:4%;right:4%;bottom:0;height:12px;border-radius:99px;background:rgba(120,120,140,.4)}',
        kf('co-a' + v.i, '0%,100%{transform:rotate(-5deg)}50%{transform:rotate(6deg)}')
      ]),
      cfg: core(v, [range('Width', '--w', 140, 240, 2, 180, 'px')])
    };
  } });

  K.add('nature', V.matrix('nature', M, 24, 'w5nt'));
})(window);
