/* ============================================================
   3D — generated families (pure CSS transforms, no WebGL)
   Layout rule for every item:
     .pv  = perspective viewport      .bx = the fixed camera tilt (--rx/--ry)
     .sp  = the animated stage        .fc = one face
   All sizes derive from --sz so the Tune panel can scale geometry live,
   including translateZ, which is what actually makes these 3D.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color, mapJoin = K.mapJoin;
  var C1 = '#7c5cff', C2 = '#22d3ee', C3 = '#ff5c8a';
  var pool = [];

  var STD = [
    range('Size', '--sz', 40, 170, 2, 106, 'px'),
    range('Depth', '--vp', 220, 1600, 20, 620, 'px'),
    range('Tilt X', '--rx', -80, 80, 1, -20, 'deg'),
    range('Turn', '--ry', -180, 180, 1, -26, 'deg'),
    col('Face A', '--c1', C1), col('Face B', '--c2', C2)
  ];

  var shell = `.pv{display:grid;place-items:center;perspective:var(--vp,620px);padding:6px}
.bx{position:relative;transform-style:preserve-3d;transform:rotateX(var(--rx,-20deg)) rotateY(var(--ry,-26deg))}
.sp{position:relative;width:var(--sz,106px);height:var(--sz,106px);transform-style:preserve-3d}
.fc{position:absolute;inset:0;border-radius:var(--fr,4px);background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 80%,#000),color-mix(in srgb,var(--c1,${C1}) 34%,#0b0b16));border:1px solid color-mix(in srgb,var(--c2,${C2}) 55%,transparent);box-shadow:inset 0 0 24px -8px color-mix(in srgb,var(--c2,${C2}) 60%,transparent)}`;

  /* six faces around a cube of edge --sz */
  var FACE_T = ['translateZ(1)', 'rotateY(180deg) translateZ(-1)', 'rotateY(90deg)', 'rotateY(-90deg)', 'rotateX(90deg)', 'rotateX(-90deg)'];
  function cubeFaces(extra) {
    var h = 'calc(var(--sz,106px) / 2)';
    var tr = ['translateZ(' + h + ')', 'rotateY(180deg) translateZ(' + h + ')', 'rotateY(90deg) translateZ(' + h + ')',
      'rotateY(-90deg) translateZ(' + h + ')', 'rotateX(90deg) translateZ(' + h + ')', 'rotateX(-90deg) translateZ(' + h + ')'];
    return mapJoin(6, function (i) {
      return '<div class="fc f' + (i + 1) + '" style="transform:' + tr[i] + (extra || '') + '"></div>';
    }, '');
  }
  function facesCss(n) {
    return mapJoin(n, function (i) {
      return '.f' + (i + 1) + '{background:linear-gradient(150deg,color-mix(in srgb,var(--c' + ((i % 2) ? 2 : 1) + ',#' + ((i % 2) ? C2 : C1) + ') 78%,#000),color-mix(in srgb,var(--c' + ((i % 2) ? 1 : 2) + ',#' + ((i % 2) ? C1 : C2) + ') 30%,#0b0b16))}';
    }, '\n');
  }

  /* build-time geometry for the "generated markup" demos, so the shipped
     demo js stays tiny and free of authoring-time helpers */
  function sphereMarkup(R, L, r) {
    var h = '';
    for (var i = 0; i < R; i++) {
      var lat = Math.asin(-1 + 2 * i / (R - 1));
      var n = Math.max(1, Math.round(L * Math.cos(lat)));
      for (var j = 0; j < n; j++) {
        var lon = j / n * 2 * Math.PI;
        var x = Math.cos(lat) * Math.cos(lon), y = Math.sin(lat), z = Math.cos(lat) * Math.sin(lon);
        var deg = (Math.atan2(-z, x) * 180 / Math.PI).toFixed(1);
        h += '<i style="transform:rotateY(' + deg + 'deg) translateZ(' + r + 'px) translateY(' + (y * r).toFixed(1) + 'px) rotateY(-' + deg + 'deg)"></i>';
      }
    }
    return h;
  }
  var SPHERE = sphereMarkup(13, 15, 52);
  var WARP = mapJoin(46, function (i) {
    var rnd = K.rng(i * 17 + 3), a = i / 46 * 6.283, r = 60 + rnd() * 240;
    return '<i style="--x:' + (Math.cos(a) * r).toFixed(1) + 'px;--y:' + (Math.sin(a) * r).toFixed(1) + 'px;--a:' + (rnd() * 3.4).toFixed(2) + '"></i>';
  }, '');
  var CLOTH = (function () {
    var h = '', n = 11;
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) {
      h += '<i style="left:' + (x * 9.1).toFixed(1) + '%;top:' + (y * 9.1).toFixed(1) + '%;animation-delay:-' + ((x + y) * .09).toFixed(2) + 's"></i>';
    }
    return h;
  })();

  function item3(o) {
    var cfg = (o.cfg || STD).filter(function (c) {
      return [o.html, o.css, o.js].some(function (s) { return s && s.indexOf(c.k) > -1; });
    });
    pool.push({
      family: '3d:' + o.g, id: 'd-' + o.name, title: o.title,
      tags: ['3d', o.g].concat(o.tags || ['css']),
      html: o.html, css: join([shell, o.css]), js: o.js, cfg: cfg.length ? cfg : null
    });
  }

  /* ───────── 1. cube variants ───────── */
  [
    ['cube-spin', 'Spinning Cube', kf('cspin', '0%{transform:rotateX(0) rotateY(0)}100%{transform:rotateX(360deg) rotateY(360deg)}'), 'cspin var(--dur,9s) linear infinite', ''],
    ['cube-tumble', 'Tumbling Cube', kf('ctum', '0%{transform:rotate3d(1,1,0,0deg)}50%{transform:rotate3d(1,1,0,360deg) scale(.9)}100%{transform:rotate3d(1,1,0,720deg)}'), 'ctum var(--dur,7s) ease-in-out infinite', ''],
    ['cube-breathe', 'Breathing Cube', kf('cbr', '0%,100%{transform:rotateY(0) scale3d(1,1,1)}50%{transform:rotateY(180deg) scale3d(1.14,1.14,1.14)}'), 'cbr var(--dur,4.6s) cubic-bezier(.4,0,.3,1) infinite', ''],
    ['cube-explode', 'Exploding Cube', kf('cex', '0%,10%,100%{transform:rotateY(0)}45%,60%{transform:rotateY(180deg)}'), 'cex var(--dur,6s) cubic-bezier(.4,1.2,.3,1) infinite', '.fc{transition:transform var(--tt,.5s) cubic-bezier(.3,1.6,.4,1)}\n.sp:hover .f1{transform:rotateY(0) translateZ(calc(var(--sz,106px) / 2 + 26px))}'],
    ['cube-wire', 'Wireframe Cube', kf('cspin', '0%{transform:rotateX(0) rotateY(0)}100%{transform:rotateX(360deg) rotateY(360deg)}'), 'cspin var(--dur,11s) linear infinite', '.fc{background:none;border:1px solid color-mix(in srgb,var(--c2,#22d3ee) 70%,transparent);box-shadow:0 0 12px -2px color-mix(in srgb,var(--c2,#22d3ee) 45%,transparent)}'],
    ['cube-glass', 'Glass Cube', kf('ctum', '0%{transform:rotate3d(1,.6,0,0deg)}100%{transform:rotate3d(1,.6,0,360deg)}'), 'ctum var(--dur,8s) linear infinite', '.fc{background:linear-gradient(140deg,rgba(255,255,255,.16),color-mix(in srgb,var(--c1,#7c5cff) 22%,transparent));backdrop-filter:blur(3px);border-color:rgba(255,255,255,.28)}'],
    ['cube-checker', 'Checker Cube', kf('cspin', '0%{transform:rotateX(0) rotateY(0)}100%{transform:rotateX(360deg) rotateY(360deg)}'), 'cspin var(--dur,10s) linear infinite', '.fc{background-image:repeating-conic-gradient(color-mix(in srgb,var(--c2,#22d3ee) 70%,#000) 0 25%,#0d0d16 0 50%);background-size:calc(var(--sz,106px) / 4) calc(var(--sz,106px) / 4);border-color:rgba(255,255,255,.2)}'],
    ['cube-stripes', 'Striped Cube', kf('cspin2', '0%{transform:rotateX(-12deg) rotateY(0)}100%{transform:rotateX(-12deg) rotateY(360deg)}'), 'cspin2 var(--dur,6.5s) linear infinite', '.fc{background-image:repeating-linear-gradient(115deg,color-mix(in srgb,var(--c1,#7c5cff) 85%,#000) 0 6px,#0c0c16 6px 13px)}'],
    ['cube-shadow', 'Cube With Floor Shadow', kf('cfloat', '0%,100%{transform:translateY(-6px) rotateY(0)}50%{transform:translateY(6px) rotateY(180deg)}'), 'cfloat var(--dur,5s) ease-in-out infinite', '.pv::after{content:"";position:absolute;width:calc(var(--sz,106px) * .9);height:calc(var(--sz,106px) * .18);border-radius:50%;background:radial-gradient(ellipse,color-mix(in srgb,var(--c1,#7c5cff) 45%,transparent),transparent 70%);transform:translateY(calc(var(--sz,106px) * .72)) scaleX(var(--sxs,1));animation:shd var(--dur,5s) ease-in-out infinite}\n@keyframes shd{0%,100%{opacity:.9}50%{opacity:.35}}'],
    ['cube-morph', 'Cube To Octahedron', kf('cmorph', '0%,100%{transform:rotateY(0)}50%{transform:rotateY(180deg)}'), 'cmorph var(--dur,6s) cubic-bezier(.5,0,.3,1) infinite', '.fc{clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%)}'],
    ['cube-grid-face', 'Graph Paper Cube', kf('ctum', '0%{transform:rotate3d(1,1,0,0deg)}100%{transform:rotate3d(1,1,0,360deg)}'), 'ctum var(--dur,12s) linear infinite', '.fc{background-image:linear-gradient(color-mix(in srgb,var(--c2,#22d3ee) 40%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--c2,#22d3ee) 40%,transparent) 1px,transparent 1px);background-size:calc(var(--sz,106px) / 6) calc(var(--sz,106px) / 6)}'],
    ['cube-stack', 'Cube Tower Stack', kf('cst', '0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-8px) rotate(10deg)}'), 'cst var(--dur,3.4s) ease-in-out infinite', '']
  ].forEach(function (v) {
    var html;
    if (v[0] === 'cube-stack') {
      html = '<div class="pv"><div class="bx"><div class="st2">' + mapJoin(4, function (i) {
        return '<span class="lv" style="--i:' + i + '"></span>';
      }, '') + '</div></div></div>';
    } else {
      html = '<div class="pv"><div class="bx"><div class="sp">' + cubeFaces() + '</div></div></div>';
    }
    item3({
      g: 'cube', name: v[0], title: v[1], html: html,
      css: `.sp{animation:${v[3]}}
${v[2]}
${v[4]}
${v[0] === 'cube-stack' ? `.st2{display:grid;gap:6px;transform-style:preserve-3d}
.st2 .lv{width:var(--sz,106px);height:calc(var(--sz,106px) / 3.2);border-radius:4px;background:linear-gradient(160deg,color-mix(in srgb,var(--c1,${C1}) 80%,#000),color-mix(in srgb,var(--c2,${C2}) 40%,#0c0c16));border:1px solid rgba(255,255,255,.16);transform:translateZ(calc(var(--i) * var(--sz,106px) / 6)) rotateY(calc(var(--i) * 12deg));animation:cst var(--dur,3.4s) ease-in-out infinite;animation-delay:calc(var(--i) * -.16s)}
@keyframes cst{0%,100%{transform:translateZ(calc(var(--i) * var(--sz,106px) / 6)) rotateY(calc(var(--i) * 12deg))}50%{transform:translateZ(calc(var(--i) * var(--sz,106px) / 6 + 10px)) rotateY(calc(var(--i) * 18deg))}}` : facesCss(6)}`
    });
  });

  /* ───────── 2. other solids ───────── */
  item3({
    g: 'solid', name: 'pyramid', title: 'Pyramid',
    html: '<div class="pv"><div class="bx"><div class="sp py">' + mapJoin(4, function (i) {
      return '<div class="fc face" style="transform:rotateY(' + (i * 90) + 'deg) translateZ(calc(var(--sz,106px) / 2)) skewY(0)"></div>';
    }, '') + '<div class="fc base" style="transform:rotateX(90deg) translateZ(calc(var(--sz,106px) / 2))"></div></div></div></div>',
    css: `.sp{animation:pyr var(--dur,8s) linear infinite}
${kf('pyr', 'to{transform:rotateY(360deg)}')}
.py .face{clip-path:polygon(50% 0,100% 100%,0 100%);transform-origin:50% 100%;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,${C1}) 85%,#000),#0b0b16)}
.py .base{background:color-mix(in srgb,var(--c2,${C2}) 22%,#0b0b16)}`
  });
  item3({
    g: 'solid', name: 'prism', title: 'Triangular Prism',
    html: '<div class="pv"><div class="bx"><div class="sp">' +
      '<div class="fc e1" style="transform:translateZ(calc(var(--sz,106px) / 2))"></div>' +
      '<div class="fc e2" style="transform:translateZ(calc(var(--sz,106px) / -2))"></div>' +
      '<div class="fc s1" style="transform:rotateX(-30deg) translateZ(calc(var(--sz,106px) * .36))"></div>' +
      '<div class="fc s2" style="transform:rotateX(210deg) translateZ(calc(var(--sz,106px) * .36))"></div>' +
      '<div class="fc s3" style="transform:rotateX(90deg) translateZ(0)"></div></div></div></div>',
    css: `.sp{animation:prm var(--dur,7s) linear infinite}
${kf('prm', '0%{transform:rotateX(0) rotateY(0)}100%{transform:rotateX(360deg) rotateY(180deg)}')}
.e1,.e2{clip-path:polygon(50% 0,100% 100%,0 100%);background:linear-gradient(180deg,color-mix(in srgb,var(--c2,${C2}) 80%,#000),#0b0b16)}
.s1,.s2,.s3{height:calc(var(--sz,106px) / 2);top:25%}`
  });
  [
    ['octa', 'Octahedron', 8, '.fc{clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%)}'],
    ['tetra', 'Tetrahedron', 4, '.fc{clip-path:polygon(50% 0,100% 100%,0 100%)}'],
    ['cross', '3D Cross', 6, '.fc{clip-path:polygon(35% 0,65% 0,65% 35%,100% 35%,100% 65%,65% 65%,65% 100%,35% 100%,35% 65%,0 65%,0 35%,35% 35%)}']
  ].forEach(function (v) {
    item3({
      g: 'solid', name: v[0], title: v[1],
      html: '<div class="pv"><div class="bx"><div class="sp">' + mapJoin(v[2], function (i) {
        return '<div class="fc" style="transform:rotateY(' + (i * 360 / v[2]) + 'deg) rotateX(' + (i % 2 ? 45 : -45) + 'deg) translateZ(calc(var(--sz,106px) / 2.6))"></div>';
      }, '') + '</div></div></div>',
      css: `.sp{animation:oc${v[2]} var(--dur,6s) linear infinite}
${kf('oc' + v[2], 'to{transform:rotateY(360deg) rotateX(12deg)}')}
${v[3]}
.fc{background:linear-gradient(140deg,color-mix(in srgb,var(--c1,${C1}) 82%,#000),color-mix(in srgb,var(--c2,${C2}) 30%,#0b0b16))}`
    });
  });
  item3({
    g: 'solid', name: 'three-plates', title: 'Crossed Plates',
    html: '<div class="pv"><div class="bx"><div class="sp">' + mapJoin(3, function (i) {
      return '<div class="fc" style="transform:rotateY(' + (i * 60) + 'deg)"></div>';
    }, '') + '</div></div></div>',
    css: `.sp{animation:tp var(--dur,5.4s) cubic-bezier(.5,0,.5,1) infinite}
${kf('tp', '0%{transform:rotateY(0) rotateX(0)}50%{transform:rotateY(180deg) rotateX(24deg)}100%{transform:rotateY(360deg) rotateX(0)}')}
.fc{background:linear-gradient(160deg,color-mix(in srgb,var(--c1,${C1}) 70%,#000),transparent);border-color:color-mix(in srgb,var(--c2,${C2}) 60%,transparent)}`
  });

  /* ───────── 3. cylinders, coins, drums ───────── */
  item3({
    g: 'cylinder', name: 'cylinder', title: 'Spinning Cylinder',
    html: '<div class="pv"><div class="bx"><div class="sp cyl">' + mapJoin(18, function (i) {
      return '<div class="fc sd" style="--i:' + i + '"></div>';
    }, '') + '<div class="fc cap t"></div><div class="fc cap bt"></div></div></div></div>',
    css: `.cyl{animation:cyl var(--dur,7s) linear infinite}
${kf('cyl', 'to{transform:rotateY(360deg)}')}
.cyl .sd{position:absolute;left:50%;top:0;width:calc(var(--sz,106px) * .35);height:var(--sz,106px);margin-left:calc(var(--sz,106px) * -.175);transform-origin:50% 50%;transform:rotateY(calc(var(--i) * 20deg)) translateZ(calc(var(--sz,106px) * .53));background:linear-gradient(90deg,color-mix(in srgb,var(--c1,${C1}) 88%,#000),color-mix(in srgb,var(--c1,${C1}) 26%,#0b0b16));border:0;border-inline:1px solid rgba(255,255,255,.08)}
.cyl .cap{width:var(--sz,106px);height:var(--sz,106px);border-radius:50%;background:color-mix(in srgb,var(--c2,${C2}) 30%,#0d0d18);left:0;top:0}
.cyl .t{transform:rotateX(90deg) translateZ(calc(var(--sz,106px) / 2))}
.cyl .bt{transform:rotateX(-90deg) translateZ(calc(var(--sz,106px) / 2))}`
  });
  item3({
    g: 'cylinder', name: 'coin-flip', title: 'Flipping Coin',
    html: '<div class="pv"><div class="bx"><div class="sp cn"><div class="fc hd a"></div><div class="fc hd b"></div><div class="edg"></div></div></div></div>',
    css: `.cn{animation:cn var(--dur,3.2s) cubic-bezier(.5,.05,.5,.95) infinite}
${kf('cn', '0%{transform:rotateY(0) translateY(0)}45%{transform:rotateY(360deg) translateY(-34px)}55%{transform:rotateY(360deg) translateY(-34px)}100%{transform:rotateY(720deg) translateY(0)}')}
.cn .hd{border-radius:50%;background:radial-gradient(circle at 38% 34%,color-mix(in srgb,var(--c2,${C2}) 90%,#fff),color-mix(in srgb,var(--c1,${C1}) 80%,#000) 70%);display:grid;place-items:center;font:700 calc(var(--sz,106px) * .4)/1 system-ui;color:#0b0b16}
.cn .a{transform:translateZ(4px)}.cn .b{transform:rotateY(180deg) translateZ(4px)}
.cn .a::after{content:"$";margin-top:-6px}
.cn .b::after{content:"\u2715";font-size:calc(var(--sz,106px) * .34)}
.cn .edg{position:absolute;left:50%;top:50%;width:8px;height:calc(var(--sz,106px) * .98);margin-left:-4px;border-radius:6px;background:linear-gradient(90deg,#0a0a12,color-mix(in srgb,var(--c1,${C1}) 60%,#000),#0a0a12);transform-origin:50% 50%}`
  });
  item3({
    g: 'cylinder', name: 'drum-stripes', title: 'Striped Drum',
    html: '<div class="pv"><div class="bx"><div class="sp dm">' + mapJoin(24, function (i) {
      return '<div class="fc" style="--i:' + i + '"></div>';
    }, '') + '</div></div></div>',
    css: `.dm{animation:dm var(--dur,9s) linear infinite}
${kf('dm', '0%{transform:rotateY(0) rotateX(8deg)}100%{transform:rotateY(360deg) rotateX(8deg)}')}
.dm .fc{position:absolute;left:50%;top:calc(var(--sz,106px) * .12);width:calc(var(--sz,106px) * .27);height:calc(var(--sz,106px) * .76);margin-left:calc(var(--sz,106px) * -.135);transform:rotateY(calc(var(--i) * 15deg)) translateZ(calc(var(--sz,106px) * .48));background:repeating-linear-gradient(0deg,color-mix(in srgb,var(--c2,${C2}) 85%,#000) 0 4px,#0b0b16 4px 11px);border:0;box-shadow:none}
.dm .fc:nth-child(odd){opacity:.8}`
  });

  /* ───────── 4. hover tilt & parallax ───────── */
  item3({
    g: 'tilt', name: 'tilt-card', title: 'Cursor Tilt Card',
    html: '<div class="pv"><div class="bx"><div class="card tl"><span class="gl"></span><b>Hover me</b><i>the light follows the cursor</i></div></div></div>',
    css: `.tl{position:relative;width:calc(var(--sz,106px) * 1.5);height:var(--sz,106px);border-radius:var(--fr,14px);background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 55%,#101018),#0c0c16);border:1px solid rgba(255,255,255,.16);display:grid;place-content:center;gap:4px;text-align:center;transform-style:preserve-3d;transform:rotateX(var(--tx,0deg)) rotateY(var(--ty,0deg)) translateY(var(--tz,0px));transition:transform .18s ease-out,box-shadow .3s;box-shadow:0 18px 40px -24px #000}
.tl b{font:700 15px/1 "Plus Jakarta Sans",system-ui;color:#fff;transform:translateZ(26px)}
.tl i{font:500 10px/1.4 "JetBrains Mono",monospace;font-style:normal;color:#9a9ab0;transform:translateZ(14px)}
.tl .gl{position:absolute;inset:0;border-radius:inherit;background:radial-gradient(180px circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,.3),transparent 60%);opacity:0;transition:opacity .3s}
.tl:hover .gl{opacity:1}`,
    js: 'var c=root.querySelector(".tl");\n' +
      'c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect();if(!r.width)return;\n' +
      '  var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;\n' +
      '  c.style.setProperty("--ty",(x*26)+"deg");c.style.setProperty("--tx",(-y*22)+"deg");\n' +
      '  c.style.setProperty("--tz","-8px");c.style.setProperty("--gx",(x*100+50)+"%");c.style.setProperty("--gy",(y*100+50)+"%");});\n' +
      'c.addEventListener("pointerleave",function(){c.style.setProperty("--ty","0deg");c.style.setProperty("--tx","0deg");c.style.setProperty("--tz","0px");});',
    cfg: STD.concat([range('Radius', '--fr', 0, 30, 1, 14, 'px')])
  });
  item3({
    g: 'tilt', name: 'parallax-depth', title: 'Parallax Depth Card',
    html: '<div class="pv"><div class="bx pd"><span class="l l1"></span><span class="l l2"></span><span class="l l3"></span><b class="l l4">Depth</b></div></div>',
    css: `.pd{position:relative;width:calc(var(--sz,106px) * 1.3);height:var(--sz,106px);transform-style:preserve-3d;transform:rotateX(var(--tx,0deg)) rotateY(var(--ty,0deg));transition:transform .2s ease-out}
.pd .l{position:absolute;border-radius:12px;transform:translateZ(var(--z,0px));transition:transform .2s ease-out}
.pd .l1{inset:0;background:linear-gradient(160deg,#181824,#0c0c14);border:1px solid rgba(255,255,255,.1);--z:0px}
.pd .l2{left:8%;top:14%;width:44%;height:38%;background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 90%,#000),color-mix(in srgb,var(--c1,${C1}) 30%,#0b0b16));--z:26px}
.pd .l3{right:10%;bottom:16%;width:36%;height:26%;background:color-mix(in srgb,var(--c2,${C2}) 70%,#0b0b16);--z:48px}
.pd b{position:absolute;left:10%;bottom:12%;font:700 14px/1 "Plus Jakarta Sans",system-ui;color:#fff;--z:74px}`,
    js: 'var p=root.querySelector(".pd");\n' +
      'p.addEventListener("pointermove",function(e){var r=p.getBoundingClientRect();if(!r.width)return;\n' +
      '  p.style.setProperty("--ty",((e.clientX-r.left)/r.width-.5)*20+"deg");\n' +
      '  p.style.setProperty("--tx",-((e.clientY-r.top)/r.height-.5)*18+"deg");});\n' +
      'p.addEventListener("pointerleave",function(){p.style.setProperty("--ty","0deg");p.style.setProperty("--tx","0deg");});'
  });
  item3({
    g: 'tilt', name: 'extrude-text', title: 'Extruded Type',
    html: '<div class="pv"><div class="bx ex"><span class="w2">DEPTH</span></div></div>',
    css: `.ex{transform-style:preserve-3d;animation:ex var(--dur,7s) cubic-bezier(.5,0,.5,1) infinite}
${kf('ex', '0%,100%{transform:rotateY(-22deg) rotateX(6deg)}50%{transform:rotateY(22deg) rotateX(-6deg)}')}
.ex .w2{font:800 calc(var(--sz,106px) * .46)/1 "Plus Jakarta Sans",system-ui;letter-spacing:-.04em;color:color-mix(in srgb,var(--c1,${C1}) 92%,#fff);text-shadow:var(--sh,0 0 #000)}
.ex:hover .w2{color:var(--c2,${C2})}`,
    js: 'var w=root.querySelector(".w2"),s=[];\n' +
      'for(var i=1;i<=18;i++)s.push(i*.9+"px "+i*.9+"px 0 color-mix(in srgb,var(--c1,#7c5cff) "+Math.max(18,100-i*5)+"%,#05050c)");\n' +
      'w.style.setProperty("--sh",s.join(","));'
  });

  /* ───────── 5. flip cards ───────── */
  [
    ['flip-h', 'Horizontal Flip Card', 'flipH', 'rotateY'],
    ['flip-v', 'Vertical Flip Card', 'flipV', 'rotateX'],
    ['flip-squash', 'Squash Flip Card', 'flipS', 'rotateY']
  ].forEach(function (v) {
    item3({
      g: 'flip', name: v[0], title: v[1],
      html: '<div class="pv"><div class="bx"><div class="fp"><div class="fc fa">Front</div><div class="fc fb">Back</div></div></div></div>',
      css: `.fp{position:relative;width:calc(var(--sz,106px) * 1.2);height:var(--sz,106px);transform-style:preserve-3d;animation:${v[2]} var(--dur,4.4s) cubic-bezier(.5,.05,.3,1) infinite}
${kf(v[2], v[0] === 'flip-squash'
  ? '0%,12%{transform:' + v[3] + '(0) scale(1,1)}50%{transform:' + v[3] + '(180deg) scale(.86,1.06)}88%,100%{transform:' + v[3] + '(360deg) scale(1,1)}'
  : '0%,14%{transform:' + v[3] + '(0)}50%,64%{transform:' + v[3] + '(180deg)}100%{transform:' + v[3] + '(360deg)}')}
.fp .fc{position:absolute;inset:0;display:grid;place-items:center;border-radius:var(--fr,16px);font:700 14px/1 "Plus Jakarta Sans",system-ui;backface-visibility:hidden;color:#fff}
.fp .fa{background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 85%,#000),#101020)}
.fp .fb{background:linear-gradient(150deg,color-mix(in srgb,var(--c2,${C2}) 70%,#000),#0b1420);transform:` + v[3] + `(180deg)}`,
      cfg: STD.concat([range('Radius', '--fr', 0, 30, 1, 16, 'px')])
    });
  });
  item3({
    g: 'flip', name: 'flip-list', title: 'Flip List Lines',
    html: '<div class="pv"><div class="bx fl"><span class="row" style="--i:0">' + mapJoin(2, function (i) { return '<b class="r' + i + '">' + ['Design', 'Ship fast'][i] + '</b>'; }, '') + '</span>' +
      '<span class="row">' + mapJoin(2, function (i) { return '<b class="r' + i + '">' + ['Motion', 'No build'][i] + '</b>'; }, '') + '</span>' +
      '<span class="row">' + mapJoin(2, function (i) { return '<b class="r' + i + '">' + ['Tune', 'Copy code'][i] + '</b>'; }, '') + '</span></div></div>',
    css: `.fl{display:grid;gap:8px;transform-style:preserve-3d}
.fl .row{position:relative;height:26px;perspective:var(--vp,620px);transform-style:preserve-3d}
.fl b{position:absolute;inset:0;display:grid;place-items:center;padding:0 14px;border-radius:8px;font:600 12px/1 "Plus Jakarta Sans",system-ui;backface-visibility:hidden;transform-style:preserve-3d}
.fl .r0{background:#181824;border:1px solid rgba(255,255,255,.1);color:#dcdce8}
.fl .r1{background:color-mix(in srgb,var(--c1,${C1}) 80%,#000);color:#fff;transform:rotateX(90deg)}
.fl .row{animation:fr var(--dur,3.6s) cubic-bezier(.4,1.1,.3,1) infinite;animation-delay:calc(var(--i) * .2s)}
.fl .row:nth-child(2){animation-delay:.3s}.fl .row:nth-child(3){animation-delay:.6s}
@keyframes fr{0%,30%{transform:rotateX(0)}55%,80%{transform:rotateX(-90deg)}100%{transform:rotateX(-180deg)}}`
  });
  item3({
    g: 'flip', name: 'cube-menu', title: 'Cube Menu Rollover',
    html: '<div class="pv"><div class="bx cm"><div class="sp3">' +
      mapJoin(4, function (i) { return '<span class="face2 f' + i + '">' + ['Home', 'Work', 'About', 'Mail'][i] + '</span>'; }, '') + '</div></div></div>',
    css: `.cm{transform-style:preserve-3d}
.cm .sp3{position:relative;width:calc(var(--sz,106px) * 1.4);height:34px;transform-style:preserve-3d;transform:rotateX(0)}
.cm .face2{position:absolute;inset:0;display:grid;place-items:center;border-radius:9px;font:700 12px/1 "Plus Jakarta Sans",system-ui;color:#fff;border:1px solid rgba(255,255,255,.14)}
.cm .f0{background:#1b1b28;transform:rotateX(0) translateZ(17px)}
.cm .f1{background:color-mix(in srgb,var(--c1,${C1}) 85%,#000);transform:rotateX(-90deg) translateZ(17px)}
.cm .f2{background:color-mix(in srgb,var(--c2,${C2}) 75%,#000);transform:rotateX(-180deg) translateZ(17px)}
.cm .f3{background:color-mix(in srgb,var(--c3,${C3}) 75%,#000);transform:rotateX(-270deg) translateZ(17px)}
.cm:hover .sp3{animation:cms var(--dur,4.4s) steps(1,end) infinite}
@keyframes cms{0%{transform:rotateX(0)}25%{transform:rotateX(90deg)}50%{transform:rotateX(180deg)}75%{transform:rotateX(270deg)}}`
  });

  /* ───────── 6. swings & pendulums ───────── */
  item3({
    g: 'swing', name: 'pendulum', title: '3D Pendulum',
    html: '<div class="pv"><div class="bx pn"><span class="arm"><i class="bob"></i></span><span class="arm a2"><i class="bob"></i></span></div></div>',
    css: `.pn{transform-style:preserve-3d}
.pn .arm{position:relative;width:4px;height:calc(var(--sz,106px) * .9);border-radius:4px;background:linear-gradient(180deg,#4a4a60,#22222f);transform-origin:50% 0;animation:pn var(--dur,2.2s) cubic-bezier(.45,0,.55,1) infinite alternate}
.pn .bob{position:absolute;left:50%;bottom:-16px;width:22px;height:22px;margin-left:-11px;border-radius:50%;background:radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--c2,${C2}) 95%,#fff),color-mix(in srgb,var(--c1,${C1}) 70%,#000) 70%);box-shadow:0 8px 18px -8px var(--c1,${C1})}
.pn .a2{transform:translateZ(-30px);opacity:.5;animation-delay:-.12s}
@keyframes pn{0%{transform:rotateZ(-38deg)}100%{transform:rotateZ(38deg)}}
.pv{transform-style:preserve-3d}`
  });
  item3({
    g: 'swing', name: 'sign-swing', title: 'Hanging Sign',
    html: '<div class="pv"><div class="bx sg"><span class="bar"></span><span class="ch c1"></span><span class="ch c2"></span><span class="bd">open</span></div></div>',
    css: `.sg{position:relative;width:calc(var(--sz,106px) * 1.4);height:calc(var(--sz,106px) * 1.1);transform-style:preserve-3d}
.sg .bar{position:absolute;left:0;right:0;top:0;height:5px;border-radius:4px;background:linear-gradient(90deg,#3a3a4e,#22222f)}
.sg .ch{position:absolute;top:5px;width:2px;height:calc(var(--sz,106px) * .3);background:#3a3a4e;transform-origin:50% 0;animation:ch var(--dur,3.6s) cubic-bezier(.4,0,.5,1) infinite alternate}
.sg .c1{left:16%}.sg .c2{right:16%}
.sg .bd{position:absolute;left:10%;right:10%;top:calc(var(--sz,106px) * .3 + 5px);height:calc(var(--sz,106px) * .42);border-radius:10px;display:grid;place-items:center;font:800 calc(var(--sz,106px) * .17)/1 "Plus Jakarta Sans",system-ui;letter-spacing:.1em;text-transform:uppercase;color:#fff;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,${C1}) 88%,#000),color-mix(in srgb,var(--c1,${C1}) 40%,#0b0b16));border:1px solid rgba(255,255,255,.16);transform-origin:50% 0;animation:sg var(--dur,3.6s) cubic-bezier(.4,0,.5,1) infinite alternate;box-shadow:0 16px 26px -18px #000}
@keyframes ch{0%{transform:rotate(-12deg)}100%{transform:rotate(12deg)}}
@keyframes sg{0%{transform:rotateX(10deg) rotateY(-8deg)}100%{transform:rotateX(-10deg) rotateY(8deg)}}`
  });
  item3({
    g: 'swing', name: 'cradle', title: "Newton's Cradle",
    html: '<div class="pv"><div class="bx nc">' + mapJoin(5, function (i) { return '<span class="b2" style="--i:' + i + '"><i></i></span>'; }, '') + '</div></div>',
    css: `.nc{position:relative;display:flex;gap:calc(var(--sz,106px) * .01);align-items:flex-start;transform-style:preserve-3d}
.nc .b2{position:relative;width:calc(var(--sz,106px) * .2);height:calc(var(--sz,106px) * .72);transform-origin:50% 0;animation:nc var(--dur,2.4s) cubic-bezier(.4,0,.6,1) infinite}
.nc .b2 i{position:absolute;bottom:0;left:0;width:100%;height:calc(var(--sz,106px) * .2);border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,color-mix(in srgb,var(--c1,${C1}) 70%,#000) 70%);box-shadow:0 6px 14px -8px var(--c1,${C1})}
.nc .b2::before{content:"";position:absolute;left:50%;top:0;width:1.5px;height:calc(100% - var(--sz,106px) * .1);background:#55556c;margin-left:-.75px}
.nc .b2:first-child{animation-name:ncA}
.nc .b2:last-child{animation-name:ncB}
@keyframes nc{0%,100%{transform:rotate(0)}}
@keyframes ncA{0%,50%{transform:rotate(-34deg)}25%{transform:rotate(0)}100%{transform:rotate(-34deg)}}
@keyframes ncB{0%,50%{transform:rotate(0)}75%{transform:rotate(34deg)}100%{transform:rotate(0)}}`
  });
  item3({
    g: 'swing', name: 'jelly', title: 'Jelly Cube',
    html: '<div class="pv"><div class="bx jl"><div class="sp">' + cubeFaces() + '</div></div></div>',
    css: `.sp{animation:jl var(--dur,2.4s) cubic-bezier(.3,.7,.3,1) infinite}
@keyframes jl{0%{transform:scale3d(1,1,1) translateY(0)}25%{transform:scale3d(1.16,.84,1.16) translateY(10px)}45%{transform:scale3d(.9,1.14,.9) translateY(-16px)}70%{transform:scale3d(1.06,.96,1.06) translateY(2px)}100%{transform:scale3d(1,1,1)}}
.fc{background:linear-gradient(150deg,color-mix(in srgb,var(--c3,${C3}) 80%,#000),color-mix(in srgb,var(--c1,${C1}) 30%,#0b0b16));border-color:color-mix(in srgb,var(--c3,${C3}) 60%,transparent)}`
  });

  /* ───────── 7. helix, coils, spheres ───────── */
  item3({
    g: 'helix', name: 'dna', title: 'DNA Helix',
    html: '<div class="pv"><div class="bx dx"><div class="sp hx">' + mapJoin(16, function (i) {
      return '<span class="rung" style="--i:' + i + '"><b></b><i></i><b class="s2"></b></span>';
    }, '') + '</div></div></div>',
    css: `.hx{animation:hx var(--dur,6s) linear infinite;transform-style:preserve-3d}
@keyframes hx{to{transform:rotateY(360deg)}}
.hx .rung{position:absolute;left:50%;top:calc(var(--i) * var(--st,13px) - var(--sz,106px) * .95);width:calc(var(--sz,106px) * .78);height:4px;margin-left:calc(var(--sz,106px) * -.39);transform:rotateY(calc(var(--i) * 24deg));transform-style:preserve-3d;display:flex;justify-content:space-between}
.hx .rung b{width:11px;height:11px;border-radius:50%;background:var(--c1,${C1});box-shadow:0 0 10px color-mix(in srgb,var(--c1,${C1}) 70%,transparent)}
.hx .rung .s2{background:var(--c2,${C2});box-shadow:0 0 10px color-mix(in srgb,var(--c2,${C2}) 70%,transparent)}
.hx .rung i{position:absolute;left:11px;right:11px;top:1.5px;height:1.5px;background:linear-gradient(90deg,var(--c1,${C1}),var(--c2,${C2}));opacity:.5}
.sp{height:calc(var(--sz,106px) * 1.9);width:var(--sz,106px)}`,
    cfg: [range('Size', '--sz', 40, 130, 2, 96, 'px'), range('Spacing', '--st', 6, 22, 1, 13, 'px'), range('Depth', '--vp', 300, 1400, 20, 700, 'px'), col('A', '--c1', C1), col('B', '--c2', C2)]
  });
  item3({
    g: 'helix', name: 'spring', title: 'Spring Coil',
    html: '<div class="pv"><div class="bx spr">' + mapJoin(20, function (i) { return '<span class="rn" style="--i:' + i + '"></span>'; }, '') + '</div></div>',
    css: `.spr{position:relative;width:calc(var(--sz,106px) * .9);height:calc(var(--sz,106px) * 1.3);transform-style:preserve-3d;animation:spr var(--dur,3.2s) cubic-bezier(.4,0,.4,1) infinite alternate}
@keyframes spr{0%{transform:scaleY(1) rotateX(12deg)}100%{transform:scaleY(.62) rotateX(24deg)}}
.spr .rn{position:absolute;left:0;width:100%;height:calc(var(--sz,106px) * .18);border-radius:50%;border:3px solid color-mix(in srgb,var(--c2,${C2}) 80%,#fff);border-top-color:transparent;transform:translateY(calc(var(--i) * var(--st,8px))) rotateX(72deg);box-shadow:0 0 10px -4px var(--c2,${C2})}
.spr{transform-origin:50% 0}`,
    cfg: [range('Size', '--sz', 50, 150, 2, 100, 'px'), range('Coil', '--st', 3, 16, 1, 8, 'px'), range('Depth', '--vp', 300, 1400, 20, 620, 'px'), col('Coil', '--c2', C2)]
  });
  item3({
    g: 'sphere', name: 'dotted-sphere', title: 'Pointillist Sphere',
    html: '<div class="pv"><div class="bx"><div class="sp sph"></div></div></div>',
    css: `.sph{transform-style:preserve-3d;animation:sph var(--dur,10s) linear infinite}
@keyframes sph{to{transform:rotateY(360deg) rotateX(12deg)}}
.sph i{position:absolute;left:50%;top:50%;width:var(--dt,5px);height:var(--dt,5px);margin:calc(var(--dt,5px) / -2);border-radius:50%;background:color-mix(in srgb,var(--c2,${C2}) 80%,#fff);box-shadow:0 0 8px -1px color-mix(in srgb,var(--c1,${C1}) 90%,transparent)}`,
    html: '<div class="pv"><div class="bx"><div class="sp sph">' + SPHERE + '</div></div></div>',
    cfg: [range('Size', '--sz', 60, 160, 2, 116, 'px'), range('Dot', '--dt', 2, 10, 1, 5, 'px'), range('Depth', '--vp', 300, 1400, 20, 700, 'px'), col('A', '--c1', C1), col('B', '--c2', C2)]
  });
  [
    ['globe', 'Wireframe Globe', 6, 'ring'],
    ['meridians', 'Meridian Spin', 8, 'ring2'],
    ['saturn', 'Saturn Ring', 1, 'saturn'],
    ['atom', 'Atom Orbits', 3, 'atom']
  ].forEach(function (v) {
    var inner = '';
    if (v[3] === 'ring' || v[3] === 'ring2') {
      inner = mapJoin(v[2], function (i) {
        return '<span class="rg" style="--i:' + i + ';transform:rotateY(' + (i * 180 / v[2]) + 'deg)"></span>';
      }, '') + (v[3] === 'ring2' ? mapJoin(4, function (i) { return '<span class="lt l' + i + '" style="--i:' + i + '"></span>'; }, '') : '');
    } else if (v[3] === 'saturn') {
      inner = '<span class="pl2"></span><span class="rn2"></span><span class="rn2 r3"></span>';
    } else {
      inner = '<span class="nu"></span>' + mapJoin(3, function (i) { return '<span class="or" style="--i:' + i + '"><b class="el"></b></span>'; }, '');
    }
    item3({
      g: 'sphere', name: v[0], title: v[1],
      html: '<div class="pv"><div class="bx"><div class="sp ' + v[3] + '">' + inner + '</div></div></div>',
      css: v[3] === 'ring' || v[3] === 'ring2'
        ? `.sp{transform-style:preserve-3d;animation:gl var(--dur,9s) linear infinite}
@keyframes gl{to{transform:rotateY(360deg) rotateX(var(--tx,14deg))}}
.sp .rg{position:absolute;inset:0;border:1px solid color-mix(in srgb,var(--c1,${C1}) 60%,transparent);border-radius:50%}
.sp .lt{position:absolute;left:50%;top:50%;width:var(--sz,106px);height:6px;margin-top:-3px;margin-left:calc(var(--sz,106px) / -2);border-top:1px solid color-mix(in srgb,var(--c2,${C2}) 45%,transparent);transform:translateY(calc((var(--i) - 1.5) * 26px)) rotateX(78deg);border-radius:50%}`
        : v[3] === 'saturn'
          ? `.sp{transform-style:preserve-3d;animation:sa var(--dur,12s) linear infinite}
@keyframes sa{to{transform:rotateY(360deg)}}
.sp .pl2{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 34% 30%,color-mix(in srgb,var(--c2,${C2}) 90%,#fff),color-mix(in srgb,var(--c1,${C1}) 60%,#000) 70%);box-shadow:inset -10px -12px 26px -10px #000}
.sp .rn2,.sp .r3{position:absolute;left:-30%;top:38%;width:160%;height:22%;border-radius:50%;border:calc(var(--sz,106px) * .05) solid color-mix(in srgb,var(--c3,${C3}) 60%,transparent);transform:rotateX(74deg);opacity:.85}
.sp .r3{left:-18%;top:30%;width:136%;height:38%;border-width:calc(var(--sz,106px) * .02);opacity:.5}`
          : `.sp{transform-style:preserve-3d;animation:at var(--dur,7s) linear infinite}
@keyframes at{to{transform:rotateZ(360deg)}}
.sp .nu{position:absolute;left:50%;top:50%;width:22px;height:22px;margin:-11px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,var(--c3,${C3}) 70%);box-shadow:0 0 18px 2px color-mix(in srgb,var(--c3,${C3}) 60%,transparent)}
.sp .or{position:absolute;inset:0;border:1px solid color-mix(in srgb,var(--c1,${C1}) 55%,transparent);border-radius:50%;transform:rotateY(calc(var(--i) * 60deg)) rotateX(66deg)}
.sp .el{position:absolute;left:50%;top:-4px;width:8px;height:8px;margin-left:-4px;border-radius:50%;background:var(--c2,${C2});box-shadow:0 0 10px 2px color-mix(in srgb,var(--c2,${C2}) 80%,transparent);animation:el var(--dur,2.2s) linear infinite}
@keyframes el{to{transform:rotate(360deg) translateX(calc(var(--sz,106px) / 2)) rotate(-360deg)}}`
    });
  });

  /* ───────── 8. carousels (JS) ───────── */
  item3({
    g: 'carousel', name: 'carousel3d', title: '3D Carousel Ring',
    html: '<div class="pv"><div class="bx cr"><div class="sp2">' + mapJoin(8, function (i) {
      return '<span class="cd2" style="--i:' + i + '"><b>' + (i + 1) + '</b></span>';
    }, '') + '</div></div></div>',
    css: `.cr .sp2{position:relative;width:var(--cw,120px);height:var(--ch,80px);transform-style:preserve-3d;transform:rotateY(var(--a,0deg));transition:transform .3s ease-out;animation:cr var(--dur,16s) linear infinite}
@keyframes cr{to{transform:rotateY(360deg)}}
.cr .cd2{position:absolute;inset:0;border-radius:12px;background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 85%,#000),color-mix(in srgb,var(--c2,${C2}) 25%,#0b0b16));border:1px solid rgba(255,255,255,.16);display:grid;place-items:center;transform:rotateY(calc(var(--i) * 45deg)) translateZ(var(--rr,150px));backface-visibility:var(--bv,visible)}
.cr .cd2 b{font:800 22px/1 "Plus Jakarta Sans",system-ui;color:#fff}
.cr:hover .sp2{animation-play-state:paused}`,
    js: 'var s=root.querySelector(".sp2"),a=0,vel=.6;\n' +
      'api.raf(function(){a+=vel*.4;s.style.transform="rotateY("+a+"deg)";});',
    cfg: [range('Card', '--cw', 60, 190, 2, 120, 'px'), range('Card h', '--ch', 40, 130, 2, 80, 'px'), range('Radius', '--rr', 90, 260, 2, 150, 'px'), range('Depth', '--vp', 300, 1400, 20, 800, 'px'), col('A', '--c1', C1), col('B', '--c2', C2)]
  });
  item3({
    g: 'carousel', name: 'coverflow', title: 'Coverflow',
    html: '<div class="pv"><div class="bx cf">' + mapJoin(5, function (i) { return '<span class="cd2" style="--i:' + i + '"><b>' + ['one', 'two', 'three', 'four', 'five'][i] + '</b></span>'; }, '') + '</div></div>',
    css: `.cf{position:relative;width:calc(var(--sz,106px) * 2.4);height:var(--sz,106px);transform-style:preserve-3d}
.cf .cd2{position:absolute;left:50%;top:0;width:calc(var(--sz,106px) * .9);height:100%;margin-left:calc(var(--sz,106px) * -.45);border-radius:12px;background:linear-gradient(160deg,color-mix(in srgb,var(--c1,${C1}) 70%,#000),#0c0c16);border:1px solid rgba(255,255,255,.14);display:grid;place-items:center;font:700 12px/1 "Plus Jakarta Sans",system-ui;color:#fff;transform:translateX(calc((var(--i) - var(--n,2)) * var(--sp,64px))) rotateY(calc((var(--i) - var(--n,2)) * -38deg)) scale(calc(1 - (var(--i) - var(--n,2)) * (var(--i) - var(--n,2)) * .11));transition:transform var(--tt,.5s) cubic-bezier(.3,1.2,.4,1);box-shadow:0 20px 30px -22px #000}
@keyframes nudge{0%,40%{opacity:1}60%,100%{opacity:1}}`,
    js: 'var cf=root.querySelector(".cf"),n=2;\n' +
      'cf.addEventListener("pointerdown",function(){n=n>=4?0:n+1;cf.style.setProperty("--n",n);});\n' +
      'api.raf(function(){cf.style.setProperty("--n",n);});'
  });
  item3({
    g: 'carousel', name: 'flip-strip', title: 'Infinite 3D Strip',
    html: '<div class="pv"><div class="bx fs"><div class="wp">' + (function () {
      var w = ['Motion', 'Cards', 'Toggles', 'Rings', 'Cubes'];
      var out = '';
      for (var i = 0; i < 10; i++) out += '<span class="wd" style="--i:' + i + '">' + w[i % 5] + '</span>';
      return out;
    })() + '</div></div></div>',
    css: `.fs{overflow:hidden;width:calc(var(--sz,106px) * 1.8);padding:6px 0;transform-style:preserve-3d}
.fs .wp{display:flex;gap:10px;width:max-content;transform-style:preserve-3d;animation:fstrip var(--dur,9s) linear infinite}
@keyframes fstrip{0%{transform:translateZ(-40px) rotateX(8deg) translateX(0)}100%{transform:translateZ(-40px) rotateX(8deg) translateX(calc(var(--sz,106px) * -1.55))}}
.fs .wd{padding:7px 12px;border-radius:9px;background:#15151f;border:1px solid rgba(255,255,255,.12);font:700 12px/1 "Plus Jakarta Sans",system-ui;color:#dcdce8;white-space:nowrap;transform:rotateY(calc((var(--i) - 4) * -4deg))}
.fs .wd:nth-child(odd){background:color-mix(in srgb,var(--c1,${C1}) 26%,#12121c);color:#fff}`
  });

  /* ───────── 9. isometric ───────── */
  item3({
    g: 'iso', name: 'iso-room', title: 'Isometric Room',
    html: '<div class="pv"><div class="bx ir"><span class="fl2"></span><span class="wl wl1"></span><span class="wl wl2"></span>' +
      mapJoin(3, function (i) { return '<span class="ft f' + i + '"></span>'; }, '') + '</div></div>',
    css: `.ir{position:relative;width:calc(var(--sz,106px) * 1.5);height:calc(var(--sz,106px) * 1.2);transform:rotateX(58deg) rotateZ(-45deg);transform-style:preserve-3d}
.ir .fl2{position:absolute;inset:0;background:linear-gradient(140deg,#16161f,#0d0d15);border:1px solid rgba(255,255,255,.08);background-image:linear-gradient(color-mix(in srgb,var(--c2,${C2}) 22%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--c2,${C2}) 22%,transparent) 1px,transparent 1px);background-size:calc(var(--sz,106px) / 5) calc(var(--sz,106px) / 5)}
.ir .wl{position:absolute;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,${C1}) 40%,#101018),#0b0b12);transform-origin:0 100%}
.ir .wl1{left:0;top:0;width:100%;height:calc(var(--sz,106px) * .4);transform:rotateX(90deg)}
.ir .wl2{left:0;top:0;width:calc(var(--sz,106px) * .4);height:100%;transform:rotateY(-90deg)}
.ir .ft{position:absolute;border-radius:3px;background:color-mix(in srgb,var(--c2,${C2}) 70%,#000);box-shadow:0 0 0 1px rgba(255,255,255,.12);transform:translateZ(var(--z,20px));animation:ift var(--dur,4.2s) cubic-bezier(.4,0,.3,1) infinite alternate;animation-delay:calc(var(--i) * -.6s)}
.ir .f0{left:22%;top:30%;width:26%;height:22%;--z:16px}
.ir .f1{left:58%;top:20%;width:18%;height:26%;--z:28px;background:color-mix(in srgb,var(--c1,${C1}) 80%,#000)}
.ir .f2{left:40%;top:62%;width:30%;height:16%;--z:10px;background:color-mix(in srgb,var(--c3,${C3}) 60%,#000)}
@keyframes ift{to{transform:translateZ(calc(var(--z,20px) + 18px))}}`
  });
  item3({
    g: 'iso', name: 'iso-stairs', title: 'Isometric Stairs',
    html: '<div class="pv"><div class="bx ist">' + mapJoin(8, function (i) { return '<span class="st3" style="--i:' + i + '"></span>'; }, '') + '</div></div>',
    css: `.ist{position:relative;width:calc(var(--sz,106px) * 1.5);height:calc(var(--sz,106px) * 1.5);transform:rotateX(56deg) rotateZ(-42deg);transform-style:preserve-3d}
.ist .st3{position:absolute;left:calc(var(--i) * var(--sw,13px));top:calc(var(--i) * var(--sw,13px));width:calc(var(--sz,106px) * .5);height:calc(var(--sz,106px) * .5);background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 70%,#000),color-mix(in srgb,var(--c1,${C1}) 16%,#0b0b16));border:1px solid rgba(255,255,255,.12);transform:translateZ(calc(var(--i) * var(--sh,10px)));animation:istp var(--dur,3.6s) cubic-bezier(.4,1.2,.3,1) infinite;animation-delay:calc(var(--i) * -.12s)}
@keyframes istp{0%,100%{transform:translateZ(calc(var(--i) * var(--sh,10px)))}50%{transform:translateZ(calc(var(--i) * var(--sh,10px) + 14px))}}`,
    cfg: [range('Step w', '--sw', 6, 26, 1, 13, 'px'), range('Step h', '--sh', 3, 22, 1, 10, 'px'), range('Size', '--sz', 60, 150, 2, 100, 'px'), range('Depth', '--vp', 300, 1400, 20, 700, 'px'), col('A', '--c1', C1)]
  });
  item3({
    g: 'iso', name: 'iso-city', title: 'Iso City Blocks',
    html: '<div class="pv"><div class="bx ic">' + mapJoin(16, function (i) {
      var rnd = K.rng(i * 13 + 5);
      return '<span class="bld" style="--i:' + i + ';--x:' + (i % 4) * 25 + '%;--y:' + Math.floor(i / 4) * 25 + '%;--h:' + (12 + Math.round(rnd() * 42)) + 'px"></span>';
    }, '') + '</div></div>',
    css: `.ic{position:relative;width:calc(var(--sz,106px) * 1.6);height:calc(var(--sz,106px) * 1.6);transform:rotateX(56deg) rotateZ(-45deg);transform-style:preserve-3d}
.ic .bld{position:absolute;left:var(--x,0%);top:var(--y,0%);width:20%;height:20%;background:linear-gradient(150deg,color-mix(in srgb,var(--c2,${C2}) 50%,#0f0f1a),#0b0b13);border:1px solid rgba(255,255,255,.1);transform:translateZ(var(--h,20px));box-shadow:inset 0 0 0 1px rgba(255,255,255,.04);animation:icp var(--dur,4.6s) cubic-bezier(.3,1.3,.4,1) infinite alternate;animation-delay:calc(var(--i) * -.09s)}
.ic .bld::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.14) 0 2px,transparent 2px 7px);transform:translateZ(calc(var(--h,20px) * -1 + 1px))}
@keyframes icp{to{transform:translateZ(calc(var(--h,20px) * 1.5))}}`
  });
  item3({
    g: 'iso', name: 'iso-cards', title: 'Card Deck Deal',
    html: '<div class="pv"><div class="bx dc">' + mapJoin(5, function (i) { return '<span class="pc2" style="--i:' + i + '"><b>' + (i + 1) + '</b></span>'; }, '') + '</div></div>',
    css: `.dc{position:relative;width:calc(var(--sz,106px) * .8);height:var(--sz,106px);transform-style:preserve-3d;transform:rotateX(50deg) rotateZ(-30deg)}
.dc .pc2{position:absolute;inset:0;border-radius:10px;background:linear-gradient(160deg,#f4f4fb,#c9c9dc);border:1px solid rgba(0,0,0,.3);display:grid;place-items:center;transform:translateZ(calc(var(--i) * var(--th,7px))) translateX(calc(var(--i) * var(--dx,14px))) rotate(calc(var(--i) * -3deg));animation:dc var(--dur,3.4s) cubic-bezier(.3,1.3,.4,1) infinite alternate}
.dc .pc2 b{font:800 18px/1 system-ui;color:#1b1b28}
@keyframes dc{to{transform:translateZ(calc(var(--i) * var(--th,7px) + 24px)) translateX(calc(var(--i) * var(--dx,14px) * 1.4)) rotate(calc(var(--i) * 6deg))}}`,
    cfg: [range('Thickness', '--th', 1, 20, 1, 7, 'px'), range('Spread', '--dx', 0, 40, 1, 14, 'px'), range('Size', '--sz', 50, 150, 2, 100, 'px'), range('Depth', '--vp', 300, 1400, 20, 700, 'px')]
  });

  /* ───────── 10. dice (click to roll) ───────── */
  item3({
    g: 'dice', name: 'dice', title: 'Dice Roll',
    html: '<div class="pv"><div class="bx di"><div class="sp dc2">' + mapJoin(6, function (i) {
      var pips = [[4], [0, 8], [0, 4, 8], [0, 2, 6, 8], [0, 2, 4, 6, 8], [0, 2, 3, 5, 6, 8]][i];
      var dots = '';
      for (var d = 0; d < 9; d++) dots += '<i class="' + (pips.indexOf(d) > -1 ? 'on' : '') + '"></i>';
      return '<div class="fc d' + (i + 1) + '">' + dots + '</div>';
    }, '') + '</div></div></div>',
    css: `.dc2{animation:dc2 var(--dur,5s) cubic-bezier(.4,1.1,.3,1) infinite}
@keyframes dc2{0%{transform:rotateX(0) rotateY(0)}20%{transform:rotateX(120deg) rotateY(80deg)}45%{transform:rotateX(240deg) rotateY(160deg)}70%{transform:rotateX(360deg) rotateY(240deg)}100%{transform:rotateX(360deg) rotateY(360deg)}}
.dc2 .fc{display:grid;grid-template-columns:repeat(3,1fr);padding:16%;gap:6%;border-radius:var(--fr,18px);background:linear-gradient(150deg,#f6f6fd,#c8c8dc);border:1px solid rgba(0,0,0,.25)}
.dc2 i{border-radius:50%;background:transparent}
.dc2 i.on{background:#14141f;box-shadow:inset 0 -1px 1px rgba(255,255,255,.4)}
.d1{transform:translateZ(calc(var(--sz,106px) / 2))}
.d2{transform:rotateY(180deg) translateZ(calc(var(--sz,106px) / 2))}
.d3{transform:rotateY(90deg) translateZ(calc(var(--sz,106px) / 2))}
.d4{transform:rotateY(-90deg) translateZ(calc(var(--sz,106px) / 2))}
.d5{transform:rotateX(90deg) translateZ(calc(var(--sz,106px) / 2))}
.d6{transform:rotateX(-90deg) translateZ(calc(var(--sz,106px) / 2))}`,
    js: 'var b=root.querySelector(".bx"),sp=root.querySelector(".dc2");\n' +
      'b.addEventListener("click",function(){sp.style.animation="none";void sp.offsetWidth;\n' +
      '  var rx=Math.round((Math.random()*4+2)*90),ry=Math.round((Math.random()*4+2)*90);\n' +
      '  sp.animate?sp.animate([{transform:"rotateX(0) rotateY(0)"},{transform:"rotateX("+rx+"deg) rotateY("+ry+"deg)"}],{duration:900,easing:"cubic-bezier(.2,.8,.2,1)"}):0;});',
    cfg: [range('Size', '--sz', 50, 150, 2, 100, 'px'), range('Corner', '--fr', 2, 40, 1, 18, 'px'), range('Depth', '--vp', 300, 1400, 20, 700, 'px')]
  });

  /* ───────── 11. tunnels & depth ───────── */
  item3({
    g: 'tunnel', name: 'tunnel-rings', title: 'Tunnel Rings',
    html: '<div class="pv"><div class="bx tu">' + mapJoin(10, function (i) { return '<span class="rg2" style="--i:' + i + '"></span>'; }, '') + '</div></div>',
    css: `.tu{position:relative;width:var(--sz,106px);height:var(--sz,106px);transform-style:preserve-3d}
.tu .rg2{position:absolute;inset:0;border:calc(var(--lw,3px)) solid color-mix(in srgb,var(--c1,${C1}) 80%,transparent);border-radius:22%;animation:tu var(--dur,4s) linear infinite;animation-delay:calc(var(--i) * -.4s);opacity:0}
@keyframes tu{0%{transform:translateZ(-1200px) scale(.4);opacity:0}20%{opacity:1}100%{transform:translateZ(180px) scale(1.3);opacity:0}}
.pv{perspective-origin:50% 50%}`,
    cfg: [range('Size', '--sz', 60, 190, 2, 130, 'px'), range('Line', '--lw', 1, 10, 1, 3, 'px'), range('Depth', '--vp', 200, 900, 10, 420, 'px'), col('A', '--c1', C1)]
  });
  item3({
    g: 'tunnel', name: 'floor-grid', title: 'Perspective Floor',
    html: '<div class="pv"><div class="bx gf"><span class="grid"></span><span class="hor"></span></div></div>',
    css: `.gf{position:relative;width:calc(var(--sz,106px) * 2);height:var(--sz,106px);overflow:hidden;border-radius:10px;background:linear-gradient(180deg,#05050c,#0d0a1e 55%,#14102a)}
.gf .grid{position:absolute;left:-50%;right:-50%;bottom:-10%;height:120%;background-image:linear-gradient(color-mix(in srgb,var(--c1,${C1}) 70%,transparent) 1.5px,transparent 1.5px),linear-gradient(90deg,color-mix(in srgb,var(--c1,${C1}) 70%,transparent) 1.5px,transparent 1.5px);background-size:var(--gs,22px) var(--gs,22px);transform:perspective(var(--vp,620px)) rotateX(72deg);transform-origin:50% 100%;animation:gf var(--dur,2.4s) linear infinite;mask-image:linear-gradient(180deg,transparent,#000 40%)}
@keyframes gf{to{background-position:0 var(--gs,22px),0 0}}
.gf .hor{position:absolute;left:0;right:0;top:36%;height:2px;background:linear-gradient(90deg,transparent,var(--c2,${C2}),transparent);box-shadow:0 0 22px 4px color-mix(in srgb,var(--c2,${C2}) 50%,transparent)}`,
    cfg: [range('Size', '--sz', 60, 170, 2, 110, 'px'), range('Grid', '--gs', 10, 50, 1, 22, 'px'), range('Depth', '--vp', 200, 1200, 20, 500, 'px'), col('Grid', '--c1', C1), col('Sky', '--c2', C2)]
  });
  item3({
    g: 'tunnel', name: 'warp3d', title: 'Star Warp (3D)',
    html: '<div class="pv"><div class="bx wp"><div class="sp wz"></div></div></div>',
    css: `.wz{position:absolute;inset:0;transform-style:preserve-3d}
.wz i{position:absolute;left:50%;top:50%;width:2px;height:2px;border-radius:50%;background:#fff;box-shadow:0 0 6px 1px color-mix(in srgb,var(--c2,${C2}) 80%,transparent);animation:wz var(--dur,3.4s) linear infinite;animation-delay:calc(var(--a) * -1s)}
@keyframes wz{0%{transform:translate3d(calc(var(--x,0px) * .1),calc(var(--y,0px) * .1),-1400px);opacity:0}20%{opacity:1}100%{transform:translate3d(var(--x,0px),var(--y,0px),420px);opacity:0}}`,
    html: '<div class="pv"><div class="bx wp"><div class="sp wz">' + WARP + '</div></div></div>',
    cfg: [range('Size', '--sz', 60, 190, 2, 140, 'px'), range('Depth', '--vp', 300, 1400, 20, 700, 'px'), col('A', '--c1', C1), col('B', '--c2', C2)]
  });

  /* ───────── 12. cloth & flags ───────── */
  item3({
    g: 'cloth', name: 'flag-wave', title: 'Flag Wave',
    html: '<div class="pv"><div class="bx fg"><span class="pole"></span><div class="cl">' + mapJoin(14, function (i) { return '<span style="--i:' + i + '"></span>'; }, '') + '</div></div></div>',
    css: `.fg{position:relative;display:flex;height:var(--sz,106px);transform-style:preserve-3d}
.fg .pole{width:4px;border-radius:3px;background:linear-gradient(90deg,#4a4a60,#22222f)}
.fg .cl{display:flex;transform-style:preserve-3d;transform-origin:0 50%}
.fg .cl span{width:calc(var(--sz,106px) * .11);height:calc(var(--sz,106px) * .62);background:linear-gradient(180deg,color-mix(in srgb,var(--c1,${C1}) 90%,#000),color-mix(in srgb,var(--c2,${C2}) 70%,#000));border-right:1px solid rgba(0,0,0,.25);transform-origin:0 50%;transform:rotateY(calc(var(--i) * var(--tw,3deg)));animation:fg var(--dur,2.6s) ease-in-out infinite;animation-delay:calc(var(--i) * -.08s)}
@keyframes fg{0%,100%{transform:rotateY(calc(var(--i) * var(--tw,3deg)))}50%{transform:rotateY(calc(var(--i) * var(--tw,3deg) * -1.4))}}`,
    cfg: [range('Size', '--sz', 60, 170, 2, 110, 'px'), range('Twist', '--tw', 0, 9, .5, 3, 'deg'), col('A', '--c1', C1), col('B', '--c2', C2)]
  });
  item3({
    g: 'cloth', name: 'cloth-grid', title: 'Cloth Grid',
    html: '<div class="pv"><div class="bx cl2">' + CLOTH + '</div></div>',
    css: `.cl2{position:relative;width:calc(var(--sz,106px) * 1.6);height:calc(var(--sz,106px) * 1.6);transform-style:preserve-3d;transform:rotateX(62deg)}
.cl2 i{position:absolute;width:var(--c,9px);height:var(--c,9px);border-radius:2px;background:color-mix(in srgb,var(--c1,${C1}) 70%,#000);box-shadow:0 0 0 1px rgba(255,255,255,.06);animation:cl var(--dur,2.8s) ease-in-out infinite}
@keyframes cl{0%,100%{transform:translateZ(0)}50%{transform:translateZ(var(--amp,18px))}}`,
    cfg: [range('Size', '--sz', 60, 170, 2, 110, 'px'), range('Cell', '--c', 4, 16, 1, 9, 'px'), range('Wave', '--amp', 2, 40, 1, 18, 'px'), col('A', '--c1', C1)]
  });

  /* ───────── 13. dominoes, drops, springs ───────── */
  item3({
    g: 'phys', name: 'dominoes', title: 'Domino Fall',
    html: '<div class="pv"><div class="bx dm2">' + mapJoin(9, function (i) { return '<span style="--i:' + i + '"><b></b></span>'; }, '') + '<i class="gr"></i></div></div>',
    css: `.dm2{position:relative;width:calc(var(--sz,106px) * 2);height:var(--sz,106px);transform-style:preserve-3d;transform:rotateX(14deg) rotateZ(-6deg)}
.dm2 span{position:absolute;bottom:0;left:calc(var(--i) * var(--sp,16px));width:calc(var(--sp,16px) * .34);height:calc(var(--sz,106px) * .7);transform-origin:50% 100%;transform-style:preserve-3d;animation:dm var(--dur,3.4s) cubic-bezier(.5,0,.7,1) infinite;animation-delay:calc(var(--i) * .11s)}
.dm2 b{position:absolute;inset:0;border-radius:3px;background:linear-gradient(160deg,#f2f2fa,#bcbccc);box-shadow:inset 0 0 0 1px rgba(0,0,0,.25);transform-style:preserve-3d}
.dm2 b::after{content:"";position:absolute;left:50%;top:26%;width:5px;height:5px;margin-left:-2.5px;border-radius:50%;background:var(--c1,${C1});box-shadow:0 calc(var(--sz,106px) * .22) 0 var(--c2,${C2})}
.dm2 .gr{position:absolute;left:-6%;right:-6%;bottom:-2px;height:2px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)}
@keyframes dm{0%,6%{transform:rotateX(0)}40%{transform:rotateX(-84deg)}55%,100%{transform:rotateX(-84deg)}}`
  });
  item3({
    g: 'phys', name: 'bounce-shadow', title: 'Bounce & Shadow',
    html: '<div class="pv"><div class="bx bs"><span class="ball"></span><span class="shd"></span><span class="steps">' + mapJoin(6, function (i) { return '<i style="--i:' + i + '"></i>'; }, '') + '</span></div></div>',
    css: `.bs{position:relative;width:calc(var(--sz,106px) * 1.1);height:var(--sz,106px);transform-style:preserve-3d}
.bs .ball{position:absolute;left:50%;top:0;width:var(--br,26px);height:var(--br,26px);margin-left:calc(var(--br,26px) / -2);border-radius:50%;background:radial-gradient(circle at 34% 28%,#fff,color-mix(in srgb,var(--c1,${C1}) 85%,#000) 62%);animation:bs var(--dur,1.5s) cubic-bezier(.3,0,.6,1) infinite alternate;animation-timing-function:cubic-bezier(.5,.05,.6,.95)}
@keyframes bs{0%{transform:translateY(calc(var(--sz,106px) - var(--br,26px))) scale(1.08,.86)}100%{transform:translateY(0) scale(.96,1.06)}}
.bs .shd{position:absolute;left:50%;bottom:-6px;width:var(--br,26px);height:calc(var(--br,26px) * .3);margin-left:calc(var(--br,26px) / -2);border-radius:50%;background:radial-gradient(ellipse,color-mix(in srgb,var(--c2,${C2}) 50%,transparent),transparent 70%);animation:shd2 var(--dur,1.5s) cubic-bezier(.5,.05,.6,.95) infinite alternate}
@keyframes shd2{0%{transform:scale(2.2);opacity:.22}100%{transform:scale(1);opacity:.9}}`
  });
  item3({
    g: 'phys', name: 'drop-in', title: 'Drop In With Squash',
    html: '<div class="pv"><div class="bx dp"><span class="bx2"></span><span class="grd"></span></div></div>',
    css: `.dp{position:relative;width:calc(var(--sz,106px) * 1.2);height:var(--sz,106px);transform-style:preserve-3d}
.dp .bx2{position:absolute;left:50%;top:0;width:46px;height:46px;margin-left:-23px;border-radius:10px;background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 90%,#000),color-mix(in srgb,var(--c1,${C1}) 25%,#0b0b16));animation:dp var(--dur,2.6s) cubic-bezier(.2,.7,.3,1) infinite;transform-origin:50% 100%}
@keyframes dp{0%{transform:translateY(-90px) rotateX(30deg) scale(.9)}35%{transform:translateY(calc(var(--sz,106px) - 48px)) scale(1.3,.7)}48%{transform:translateY(calc(var(--sz,106px) - 70px)) scale(.94,1.08)}62%,100%{transform:translateY(calc(var(--sz,106px) - 48px)) scale(1)}}
.dp .grd{position:absolute;left:0;right:0;bottom:calc(var(--sz,106px) - 48px + 46px - var(--sz,106px));height:2px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.24),transparent)}`
  });
  item3({
    g: 'phys', name: 'orbit-ball', title: 'Orbiting Ball In A Box',
    html: '<div class="pv"><div class="bx ob2"><div class="cage"></div><span class="orb"></span></div></div>',
    css: `.ob2{position:relative;width:var(--sz,106px);height:var(--sz,106px);transform-style:preserve-3d;animation:ob2 var(--dur,6s) linear infinite}
@keyframes ob2{to{transform:rotateY(360deg) rotateX(20deg)}}
.ob2 .cage{position:absolute;inset:0;border:1px solid rgba(255,255,255,.16);border-radius:var(--fr,10px);box-shadow:inset 0 0 30px -12px color-mix(in srgb,var(--c1,${C1}) 80%,transparent)}
.ob2 .orb{position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-9px;border-radius:50%;background:radial-gradient(circle at 34% 30%,#fff,var(--c2,${C2}) 65%);animation:orb3 var(--dur,2.4s) ease-in-out infinite alternate;transform:translate3d(0,0,0)}
@keyframes orb3{0%{transform:translate3d(calc(var(--sz,106px) * -.32),calc(var(--sz,106px) * -.3),0)}100%{transform:translate3d(calc(var(--sz,106px) * .3),calc(var(--sz,106px) * .3),0)}}`
  });

  /* ───────── 14. 3D charts & UI ───────── */
  item3({
    g: 'chart3d', name: 'bars3d', title: 'Extruded Bar Chart',
    html: '<div class="pv"><div class="bx b3">' + mapJoin(6, function (i) {
      return '<span class="col" style="--i:' + i + ';--h:' + [30, 54, 40, 68, 46, 58][i] + '%"><b class="fr2"></b><b class="tp"></b></span>';
    }, '') + '</div></div>',
    css: `.b3{position:relative;display:flex;align-items:flex-end;gap:calc(var(--sz,106px) * .06);height:var(--sz,106px);padding-bottom:2px;transform-style:preserve-3d;transform:rotateX(56deg) rotateZ(-38deg)}
.b3 .col{position:relative;width:calc(var(--sz,106px) * .2);height:var(--h,50%);background:linear-gradient(180deg,color-mix(in srgb,var(--c1,${C1}) 90%,#000),color-mix(in srgb,var(--c1,${C1}) 30%,#0b0b16));transform-style:preserve-3d;animation:b3 var(--dur,3.4s) cubic-bezier(.3,1.3,.4,1) infinite alternate;animation-delay:calc(var(--i) * -.2s)}
.b3 .fr2{position:absolute;inset:0;background:inherit;transform:translateZ(calc(var(--sz,106px) * .1))}
.b3 .tp{position:absolute;left:0;right:0;top:0;height:calc(var(--sz,106px) * .1);background:color-mix(in srgb,var(--c2,${C2}) 70%,#0f0f1a);transform:rotateX(90deg);transform-origin:50% 100%}
@keyframes b3{to{height:calc(var(--h,50%) * .45)}}`
  });
  item3({
    g: 'chart3d', name: 'pie3d', title: 'Pie Extrude',
    html: '<div class="pv"><div class="bx p3">' + mapJoin(4, function (i) {
      return '<span class="sl2" style="--i:' + i + ';--sp:' + [30, 25, 20, 25][i] + '"></span>';
    }, '') + '</div></div>',
    css: `.p3{position:relative;width:var(--sz,106px);height:var(--sz,106px);transform-style:preserve-3d;transform:rotateX(64deg) rotateZ(calc(var(--i) * 0deg));animation:p3 var(--dur,7s) linear infinite}
@keyframes p3{to{transform:rotateX(64deg) rotateZ(360deg)}}
.p3 .sl2{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from calc(var(--i) * 90deg),color-mix(in srgb,var(--c1,${C1}) calc(var(--sp) * 3%),#0b0b16) 0 var(--sp,25%),transparent 0);box-shadow:0 0 0 1px rgba(255,255,255,.06)}
.p3 .sl2:nth-child(2){background:conic-gradient(from 90deg,color-mix(in srgb,var(--c2,${C2}) 80%,#000) 0 25%,transparent 0)}
.p3 .sl2:nth-child(3){background:conic-gradient(from 180deg,color-mix(in srgb,var(--c3,${C3}) 75%,#000) 0 20%,transparent 0)}
.p3 .sl2:nth-child(4){background:conic-gradient(from 252deg,#ffd47988 0 25%,transparent 0);transform:translateZ(14px)}`
  });
  item3({
    g: 'ui3d', name: 'modal3d', title: 'Modal Fly In',
    html: '<div class="pv"><div class="bx md"><div class="sheet"><h5>3D modal</h5><p>Rises in on the Z axis while the scrim darkens.</p><div class="row2"><button>Cancel</button><button class="go">Go</button></div></div><span class="sc"></span></div></div>',
    css: `.md{position:relative;width:calc(var(--sz,106px) * 1.7);height:calc(var(--sz,106px) * 1.15);display:grid;place-items:center;transform-style:preserve-3d}
.md .sc{position:absolute;inset:0;border-radius:12px;background:rgba(4,4,12,.7);animation:sc2 var(--dur,3.6s) ease-in-out infinite}
@keyframes sc2{0%,8%{opacity:0}26%,80%{opacity:1}100%{opacity:0}}
.md .sheet{position:relative;width:82%;padding:12px;border-radius:12px;background:linear-gradient(160deg,#1c1c2a,#111119);border:1px solid rgba(255,255,255,.14);box-shadow:0 30px 50px -24px #000;animation:sheet var(--dur,3.6s) cubic-bezier(.3,1.3,.4,1) infinite;transform-style:preserve-3d}
@keyframes sheet{0%,6%{transform:translateZ(-260px) rotateX(26deg) scale(.86);opacity:0}30%,78%{transform:none;opacity:1}100%{transform:translateZ(-160px) rotateX(-14deg) scale(.94);opacity:0}}
.md h5{margin:0 0 5px;font:800 13px/1.1 "Plus Jakarta Sans",system-ui;color:#fff}
.md p{margin:0;font-size:11px;line-height:1.5;color:#9a9ab0}
.md .row2{display:flex;gap:6px;margin-top:9px}
.md button{flex:1;padding:6px 0;border-radius:7px;border:1px solid rgba(255,255,255,.14);background:transparent;color:#c4c4d8;font:600 11px/1 "Plus Jakarta Sans",system-ui;cursor:pointer}
.md .go{background:var(--c1,${C1});border-color:transparent;color:#fff}`
  });
  item3({
    g: 'ui3d', name: 'cube-tabs', title: 'Cube Tabs',
    html: '<div class="pv"><div class="bx ct">' + mapJoin(3, function (i) { return '<span class="side s' + i + '"><b>' + ['Left', 'Front', 'Right'][i] + '</b></span>'; }, '') + '</div></div>',
    css: `.ct{position:relative;width:calc(var(--sz,106px) * .9);height:34px;transform-style:preserve-3d;animation:ct var(--dur,6s) steps(1,end) infinite}
@keyframes ct{0%{transform:rotateY(0)}33%{transform:rotateY(-120deg)}66%{transform:rotateY(120deg)}}
.ct .side{position:absolute;inset:0;display:grid;place-items:center;border-radius:9px;font:700 12px/1 "Plus Jakarta Sans",system-ui;color:#fff;backface-visibility:hidden;border:1px solid rgba(255,255,255,.14)}
.ct .s0{transform:rotateY(0) translateZ(calc(var(--sz,106px) * .52));background:linear-gradient(180deg,color-mix(in srgb,var(--c1,${C1}) 88%,#000),#0c0c16)}
.ct .s1{transform:rotateY(120deg) translateZ(calc(var(--sz,106px) * .52));background:linear-gradient(180deg,color-mix(in srgb,var(--c2,${C2}) 80%,#000),#0c0c16)}
.ct .s2{transform:rotateY(-120deg) translateZ(calc(var(--sz,106px) * .52));background:linear-gradient(180deg,color-mix(in srgb,var(--c3,${C3}) 80%,#000),#0c0c16)}`
  });
  item3({
    g: 'ui3d', name: 'tilt-form', title: 'Tilted Form Panel',
    html: '<div class="pv"><div class="bx tf2"><div class="pn2"><i></i><i></i><b>Sign in</b></div></div></div>',
    css: `.tf2{transform-style:preserve-3d;animation:tf2 var(--dur,7s) ease-in-out infinite alternate}
@keyframes tf2{0%{transform:rotateY(-18deg) rotateX(8deg)}100%{transform:rotateY(18deg) rotateX(-6deg)}}
.tf2 .pn2{position:relative;width:calc(var(--sz,106px) * 1.5);padding:14px;border-radius:14px;background:linear-gradient(160deg,#1d1d2c,#101018);border:1px solid rgba(255,255,255,.14);display:grid;gap:8px;transform-style:preserve-3d;box-shadow:0 26px 40px -26px #000}
.tf2 i{display:block;height:11px;border-radius:6px;background:#24242f;transform:translateZ(6px)}
.tf2 i:first-child{width:70%;background:linear-gradient(90deg,color-mix(in srgb,var(--c1,${C1}) 70%,#000),#24242f)}
.tf2 b{font:800 13px/1 "Plus Jakarta Sans",system-ui;color:#fff;transform:translateZ(14px)}
.tf2 .pn2::after{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(120deg,transparent 40%,rgba(255,255,255,.12) 50%,transparent 60%);transform:translateZ(20px);animation:shine var(--dur,3.6s) ease-in-out infinite}
@keyframes shine{0%,40%{transform:translateX(-60%) translateZ(20px)}80%,100%{transform:translateX(60%) translateZ(20px)}}`
  });

  /* ───────── 15. misc 3D one-offs ───────── */
  item3({
    g: 'misc', name: 'roll-hex', title: 'Rolling Hexagon',
    html: '<div class="pv"><div class="bx rh"><div class="body"></div><div class="lid l"></div><div class="lid r"></div></div></div>',
    css: `.rh{position:relative;width:var(--sz,106px);height:calc(var(--sz,106px) * .5);transform-style:preserve-3d;animation:rh var(--dur,4.4s) cubic-bezier(.4,0,.4,1) infinite}
@keyframes rh{0%{transform:translateX(-60px) rotateZ(0)}100%{transform:translateX(60px) rotateZ(360deg)}}
.rh .body{position:absolute;inset:0;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,${C1}) 85%,#000),color-mix(in srgb,var(--c1,${C1}) 30%,#0b0b16));border-radius:8px}
.rh .lid{position:absolute;top:0;width:50%;height:100%;background:inherit;border:1px solid rgba(255,255,255,.12)}
.rh .l{left:0;transform-origin:100% 50%;transform:rotateY(28deg)}
.rh .r{right:0;transform-origin:0 50%;transform:rotateY(-28deg)}`
  });
  item3({
    g: 'misc', name: 'screw', title: 'Screw Thread',
    html: '<div class="pv"><div class="bx sc"><span class="core"></span>' + mapJoin(18, function (i) { return '<span class="thr" style="--i:' + i + '"></span>'; }, '') + '</div></div>',
    css: `.sc{position:relative;width:var(--sz,106px);height:var(--sz,106px);transform-style:preserve-3d}
.sc .core{position:absolute;left:50%;top:0;width:calc(var(--sz,106px) * .28);height:100%;margin-left:calc(var(--sz,106px) * -.14);border-radius:6px;background:linear-gradient(90deg,#0d0d16,#4a4a60 40%,#0d0d16)}
.sc .thr{position:absolute;left:50%;top:calc(var(--i) * var(--st,5.6px));width:calc(var(--sz,106px) * .78);height:calc(var(--st,5.6px) * .8);margin-left:calc(var(--sz,106px) * -.39);border-radius:99px;background:linear-gradient(90deg,color-mix(in srgb,var(--c2,${C2}) 90%,#000),#0b0b16);transform:rotateX(70deg) rotateZ(calc(var(--i) * var(--tw,24deg)));animation:sc var(--dur,2.6s) linear infinite;animation-delay:calc(var(--i) * -.06s)}
@keyframes sc{to{transform:rotateX(70deg) rotateZ(calc(var(--i) * var(--tw,24deg) + 360deg))}}`,
    cfg: [range('Size', '--sz', 60, 150, 2, 100, 'px'), range('Pitch', '--st', 3, 12, .2, 5.6, 'px'), range('Twist', '--tw', 8, 40, 1, 24, 'deg'), col('B', '--c2', C2)]
  });
  item3({
    g: 'misc', name: 'roll-window', title: 'Blinds Open',
    html: '<div class="pv"><div class="bx bl">' + mapJoin(8, function (i) { return '<span class="sl3" style="--i:' + i + '"><i>' + (i + 1) + '</i></span>'; }, '') + '</div></div>',
    css: `.bl{position:relative;width:calc(var(--sz,106px) * 1.5);height:var(--sz,106px);border-radius:10px;overflow:hidden;background:linear-gradient(160deg,color-mix(in srgb,var(--c1,${C1}) 45%,#0b0b16),color-mix(in srgb,var(--c2,${C2}) 30%,#0b0b16));transform-style:preserve-3d}
.bl .sl3{position:absolute;left:0;right:0;top:calc(var(--i) * 12.5%);height:12.5%;background:linear-gradient(180deg,#26263a,#141420);transform-origin:50% 0;animation:bl var(--dur,4.2s) cubic-bezier(.4,1,.3,1) infinite alternate;animation-delay:calc(var(--i) * -.06s);display:grid;place-items:center}
.bl .sl3 i{font:700 9px/1 "JetBrains Mono",monospace;color:#8b8ba3;opacity:.7}
@keyframes bl{0%{transform:rotateX(0)}100%{transform:rotateX(-76deg)}}`
  });
  item3({
    g: 'misc', name: 'spin-cube-grid', title: 'Rotating Cube Field',
    html: '<div class="pv"><div class="bx cg">' + mapJoin(25, function (i) { return '<span style="--i:' + i + ';--x:' + (i % 5) + ';--y:' + Math.floor(i / 5) + '"></span>'; }, '') + '</div></div>',
    css: `.cg{position:relative;width:calc(var(--sz,106px) * 1.7);height:calc(var(--sz,106px) * 1.7);transform-style:preserve-3d;transform:rotateX(58deg) rotateZ(-45deg)}
.cg span{position:absolute;left:calc(var(--x) * 20%);top:calc(var(--y) * 20%);width:18%;height:18%;border-radius:4px;background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 85%,#000),color-mix(in srgb,var(--c1,${C1}) 20%,#0b0b16));border:1px solid rgba(255,255,255,.1);transform:translateZ(0);animation:cg var(--dur,3.2s) cubic-bezier(.3,1.4,.4,1) infinite;animation-delay:calc((var(--x) + var(--y)) * -.14s)}
@keyframes cg{0%,100%{transform:translateZ(0) scale(1)}50%{transform:translateZ(var(--amp,26px)) scale(.9)}}`
  });
  item3({
    g: 'misc', name: 'flip-book', title: 'Flipbook Pages',
    html: '<div class="pv"><div class="bx fbk">' + mapJoin(6, function (i) { return '<span class="pg" style="--i:' + i + '"><b>' + (i + 1) + '</b></span>'; }, '') + '<span class="bkk"></span></div></div>',
    css: `.fbk{position:relative;width:calc(var(--sz,106px) * 1.4);height:var(--sz,106px);transform-style:preserve-3d}
.fbk .bkk{position:absolute;inset:0;border-radius:8px;background:#191926;box-shadow:0 18px 30px -20px #000}
.fbk .pg{position:absolute;inset:0;border-radius:6px;background:linear-gradient(90deg,#f4f4fb,#d8d8e6);transform-origin:0 50%;animation:pg var(--dur,5.4s) cubic-bezier(.4,1,.3,1) infinite;animation-delay:calc(var(--i) * -.62s);display:grid;place-items:center;border:1px solid rgba(0,0,0,.2)}
.fbk .pg b{font:800 16px/1 system-ui;color:#14141f}
@keyframes pg{0%{transform:rotateY(0)}30%,100%{transform:rotateY(-178deg)}}`
  });
  item3({
    g: 'misc', name: 'layer-stack', title: 'Layer Stack Explode',
    html: '<div class="pv"><div class="bx ls">' + mapJoin(5, function (i) { return '<span style="--i:' + i + '">' + ['bg', 'grid', 'type', 'img', 'fx'][i] + '</span>'; }, '') + '</div></div>',
    css: `.ls{position:relative;width:calc(var(--sz,106px) * 1.2);height:calc(var(--sz,106px) * 1.2);transform-style:preserve-3d;transform:rotateX(58deg) rotateZ(-40deg);animation:ls var(--dur,5s) cubic-bezier(.4,1.1,.3,1) infinite alternate}
@keyframes ls{0%{transform:rotateX(58deg) rotateZ(-40deg) scale(.94)}100%{transform:rotateX(48deg) rotateZ(-24deg) scale(1)}}
.ls span{position:absolute;inset:0;border-radius:10px;display:grid;place-items:center;font:700 10px/1 "JetBrains Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:#04121a;transform:translateZ(calc(var(--i) * var(--ex,22px)));transition:transform .3s;background:color-mix(in srgb,var(--c2,${C2}) calc(90% - var(--i) * 15%),#0b0b16);border:1px solid rgba(255,255,255,.14)}
.ls span:nth-child(odd){background:color-mix(in srgb,var(--c1,${C1}) calc(85% - var(--i) * 12%),#0b0b16);color:#fff}`,
    cfg: [range('Size', '--sz', 60, 150, 2, 100, 'px'), range('Explode', '--ex', 4, 60, 2, 22, 'px'), range('Depth', '--vp', 300, 1400, 20, 700, 'px'), col('A', '--c1', C1), col('B', '--c2', C2)]
  });
  item3({
    g: 'misc', name: 'tilt-table', title: '3D Data Table',
    html: '<div class="pv"><div class="bx tt">' + mapJoin(4, function (i) {
      return '<span class="r2" style="--i:' + i + '">' + mapJoin(3, function (j) { return '<b>' + ['Alpha', 'Beta', 'Gamma', 'Delta'][i] + '</b>'.replace('Alpha|Beta|Gamma|Delta', '') + (j === 0 ? ['Alpha', 'Beta', 'Gamma', 'Delta'][i] : (i * 3 + j) * 12 + '%') + '</b>'; }, '') + '</span>';
    }, '') + '</div></div>',
    css: `.tt{display:grid;gap:5px;transform-style:preserve-3d;transform:rotateX(var(--rx2,22deg)) rotateZ(-8deg);animation:tt var(--dur,6s) ease-in-out infinite alternate}
@keyframes tt{0%{transform:rotateX(24deg) rotateZ(-10deg)}100%{transform:rotateX(8deg) rotateZ(6deg)}}
.tt .r2{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;transform:translateZ(calc(var(--i) * 8px))}
.tt b{padding:7px 9px;border-radius:7px;background:#15151f;border:1px solid rgba(255,255,255,.1);font:600 10px/1 "JetBrains Mono",monospace;color:#c4c4d8;text-align:center}
.tt b:first-child{text-align:left;background:color-mix(in srgb,var(--c1,${C1}) 26%,#12121c);color:#fff}
.tt .r2:first-child b:first-child{background:color-mix(in srgb,var(--c2,${C2}) 30%,#12121c)}`
  });
  item3({
    g: 'misc', name: 'wheel-3d', title: 'Prism Wheel',
    html: '<div class="pv"><div class="bx wh">' + mapJoin(12, function (i) {
      return '<span style="--i:' + i + ';background:' + K.accent(i) + '33;border-color:' + K.accent(i) + '99"></span>';
    }, '') + '</div></div>',
    css: `.wh{position:relative;width:var(--sz,106px);height:var(--sz,106px);transform-style:preserve-3d;animation:wh var(--dur,8s) linear infinite}
@keyframes wh{to{transform:rotateY(360deg)}}
.wh span{position:absolute;inset:0;border-radius:var(--fr,6px);border:1px solid;background:color-mix(in srgb,var(--c1,${C1}) 30%,#0b0b16);transform:rotateY(calc(var(--i) * 30deg)) translateZ(calc(var(--sz,106px) * .52));box-shadow:inset 0 0 18px -6px var(--c2,${C2})}`
  });
  item3({
    g: 'misc', name: 'fan-cards', title: 'Card Fan',
    html: '<div class="pv"><div class="bx fn">' + mapJoin(6, function (i) { return '<span style="--i:' + i + '"></span>'; }, '') + '</div></div>',
    css: `.fn{position:relative;width:calc(var(--sz,106px) * 1.5);height:var(--sz,106px);transform-style:preserve-3d}
.fn span{position:absolute;left:50%;bottom:0;width:calc(var(--sz,106px) * .48);height:calc(var(--sz,106px) * .74);margin-left:calc(var(--sz,106px) * -.24);border-radius:10px;background:linear-gradient(160deg,#f2f2fa,#c6c6d8);border:1px solid rgba(0,0,0,.3);transform-origin:50% 100%;transform:rotate(calc((var(--i) - 2.5) * var(--fan,10deg))) translateY(var(--ly,0px));transition:transform var(--tt,.44s) cubic-bezier(.3,1.4,.4,1);box-shadow:0 14px 24px -18px #000}
.fn:hover span{transform:rotate(calc((var(--i) - 2.5) * var(--fan,10deg) * 2)) translateY(calc(var(--i) * -4px))}
.fn span:nth-child(odd){background:linear-gradient(160deg,color-mix(in srgb,var(--c1,${C1}) 80%,#fff),color-mix(in srgb,var(--c1,${C1}) 30%,#0b0b16))}`,
    cfg: [range('Size', '--sz', 60, 160, 2, 106, 'px'), range('Fan', '--fan', 2, 26, 1, 10, 'deg'), col('A', '--c1', C1)]
  });
  item3({
    g: 'misc', name: 'scroll-z', title: 'Z-Scroll Gallery',
    html: '<div class="pv"><div class="bx zr">' + mapJoin(7, function (i) { return '<span class="fr3" style="--i:' + i + '"><b>' + (i + 1) + '</b></span>'; }, '') + '</div></div>',
    css: `.zr{position:relative;width:calc(var(--sz,106px) * 1.3);height:var(--sz,106px);transform-style:preserve-3d;overflow:hidden;border-radius:12px;background:#08080f}
.zr .fr3{position:absolute;left:8%;right:8%;top:12%;height:60%;border-radius:10px;border:1px solid rgba(255,255,255,.16);background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 70%,#000),#0d0d18);display:grid;place-items:center;animation:zr var(--dur,5.4s) linear infinite;animation-delay:calc(var(--i) * -.77s);opacity:0}
.zr .fr3 b{font:800 22px/1 "Plus Jakarta Sans",system-ui;color:#fff}
@keyframes zr{0%{transform:translateZ(calc(var(--vp,620px) * -.8)) scale(.4);opacity:0}15%{opacity:1}85%{transform:translateZ(60px) scale(1);opacity:1}100%{transform:translateZ(calc(var(--vp,620px) * .5)) scale(1.6);opacity:0}}`
  });

  /* ───────── 16. rings, vases, letters in a circle ───────── */
  item3({
    g: 'lathe', name: 'vase', title: 'Spinning Vase',
    html: '<div class="pv"><div class="bx vs">' + mapJoin(14, function (i) {
      return '<span class="rn" style="--i:' + i + ';--w:' + (46 + Math.sin(i / 13 * Math.PI) * 46).toFixed(1) + '%"></span>';
    }, '') + '</div></div>',
    css: `.vs{position:relative;width:var(--sz,106px);height:var(--sz,106px);transform-style:preserve-3d;animation:vs var(--dur,7s) linear infinite}
@keyframes vs{to{transform:rotateY(360deg)}}
.vs .rn{position:absolute;left:50%;width:var(--w,60%);height:calc(100% / 14);margin-left:calc(var(--w,60%) / -2);top:calc(var(--i) * (100% / 14));border-radius:50%;border:2px solid color-mix(in srgb,var(--c2,${C2}) 70%,transparent);background:color-mix(in srgb,var(--c1,${C1}) 12%,transparent);transform:rotateX(84deg)}
.vs .rn:nth-child(odd){border-color:color-mix(in srgb,var(--c1,${C1}) 70%,transparent)}`
  });
  item3({
    g: 'lathe', name: 'ring-pop', title: 'Ring Pop Stack',
    html: '<div class="pv"><div class="bx rp">' + mapJoin(6, function (i) { return '<span style="--i:' + i + '"></span>'; }, '') + '</div></div>',
    css: `.rp{position:relative;width:var(--sz,106px);height:var(--sz,106px);transform-style:preserve-3d;transform:rotateX(64deg)}
.rp span{position:absolute;inset:calc(var(--i) * 6%);border-radius:50%;border:3px solid color-mix(in srgb,var(--c1,${C1}) 85%,transparent);animation:rp var(--dur,3s) cubic-bezier(.3,1.4,.4,1) infinite;animation-delay:calc(var(--i) * -.16s)}
.rp span:nth-child(even){border-color:color-mix(in srgb,var(--c2,${C2}) 80%,transparent)}
@keyframes rp{0%,100%{transform:translateZ(0) scale(1);opacity:.55}45%{transform:translateZ(34px) scale(.9);opacity:1}}`
  });
  item3({
    g: 'lathe', name: 'helix-text', title: 'Text On A Cylinder',
    html: '<div class="pv"><div class="bx ht">' + mapJoin(12, function (i) {
      return '<span style="--i:' + i + ';transform:rotateY(' + (i * 30) + 'deg) translateZ(var(--rr,86px))">' + 'MOTIONLAB!!!'[i] + '</span>';
    }, '') + '</div></div>',
    css: `.ht{position:relative;width:var(--sz,106px);height:var(--sz,106px);transform-style:preserve-3d;animation:ht var(--dur,9s) linear infinite}
@keyframes ht{0%{transform:rotateX(-8deg) rotateY(0)}100%{transform:rotateX(-8deg) rotateY(360deg)}}
.ht span{position:absolute;left:50%;top:50%;font:800 calc(var(--sz,106px) * .24)/1 "Plus Jakarta Sans",system-ui;color:#fff;margin:-.5em 0 0 -.35em;backface-visibility:visible;text-shadow:0 6px 18px rgba(0,0,0,.6)}
.ht:hover{animation-direction:reverse}`
  });
  item3({
    g: 'lathe', name: 'cylinder-ticker', title: 'Cylinder Ticker',
    html: '<div class="pv"><div class="bx ct2"><div class="wp">' + (function () {
      var out = '';
      for (var i = 0; i < 18; i++) out += '<span style="--i:' + i + '">' + ['60 fps', 'zero build', 'tune it', 'copy code', 'MIT'][i % 5] + '</span>';
      return out;
    })() + '</div></div></div>',
    css: `.ct2{position:relative;width:calc(var(--sz,106px) * 1.5);height:calc(var(--sz,106px) * .5);overflow:hidden;transform-style:preserve-3d;perspective:var(--vp,620px)}
.ct2 .wp{position:absolute;inset:0;transform-style:preserve-3d;animation:ct2 var(--dur,9s) linear infinite}
@keyframes ct2{to{transform:rotateX(-360deg)}}
.ct2 span{position:absolute;left:0;right:0;top:50%;height:calc(var(--sz,106px) * .5);margin-top:calc(var(--sz,106px) * -.25);display:grid;place-items:center;font:700 13px/1 "JetBrains Mono",monospace;letter-spacing:.04em;color:#fff;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,${C1}) 60%,#0b0b16),#0b0b16);transform:rotateX(calc(var(--i) * -20deg)) translateZ(calc(var(--sz,106px) * .48));backface-visibility:hidden}
.ct2:hover{animation-play-state:paused}`
  });
  item3({
    g: 'ui3d', name: 'accordion3d', title: 'Folding Accordion',
    html: '<div class="pv"><div class="bx fa2">' + mapJoin(4, function (i) { return '<span class="pn3" style="--i:' + i + '"><b>' + ['One', 'Two', 'Three', 'Four'][i] + '</b></span>'; }, '') + '</div></div>',
    css: `.fa2{display:grid;gap:5px;transform-style:preserve-3d;transform:rotateX(18deg)}
.fa2 .pn3{position:relative;height:calc(var(--sz,106px) * .34);border-radius:9px;background:linear-gradient(160deg,#1e1e2c,#111119);border:1px solid rgba(255,255,255,.12);display:grid;place-items:center;transform-origin:50% 0;transform-style:preserve-3d;animation:fa var(--dur,4.6s) cubic-bezier(.4,1,.3,1) infinite;animation-delay:calc(var(--i) * -.32s)}
.fa2 .pn3 b{font:700 12px/1 "Plus Jakarta Sans",system-ui;color:#fff}
@keyframes fa{0%,30%{transform:rotateX(0);opacity:1}55%{transform:rotateX(-72deg);opacity:.55}80%,100%{transform:rotateX(0);opacity:1}}`
  });
  item3({
    g: 'ui3d', name: 'folder-open', title: 'Folder Opens',
    html: '<div class="pv"><div class="bx fo"><span class="bk"></span><span class="pp p1"></span><span class="pp p2"></span><span class="lid2"></span></div></div>',
    css: `.fo{position:relative;width:calc(var(--sz,106px) * 1.2);height:var(--sz,106px);transform-style:preserve-3d;transform:rotateX(22deg) rotateY(-14deg);cursor:pointer}
.fo .bk{position:absolute;inset:22% 0 0 0;border-radius:8px 12px 8px 8px;background:linear-gradient(170deg,color-mix(in srgb,var(--c1,${C1}) 75%,#000),#101018);box-shadow:0 18px 30px -20px #000}
.fo .pp{position:absolute;left:8%;right:8%;height:52%;top:26%;border-radius:6px 6px 0 0;background:#e9e9f3;transform-origin:50% 100%;transition:transform var(--tt,.5s) cubic-bezier(.3,1.3,.4,1)}
.fo .p1{transform:translateY(0) rotate(-3deg)}
.fo .p2{transform:translateY(-8px) rotate(4deg);background:#c9c9dc}
.fo .lid2{position:absolute;inset:34% 0 0 0;border-radius:6px 10px 10px 10px;background:linear-gradient(180deg,color-mix(in srgb,var(--c2,${C2}) 70%,#0b0b16),color-mix(in srgb,var(--c2,${C2}) 22%,#0b0b16));transform-origin:50% 100%;transform:rotateX(0);transition:transform var(--tt,.55s) cubic-bezier(.4,1.2,.3,1);backface-visibility:hidden}
.fo:hover .lid2{transform:rotateX(-118deg)}
.fo:hover .p1{transform:translateY(-14px) rotate(-6deg)}
.fo:hover .p2{transform:translateY(-22px) rotate(7deg)}`
  });
  item3({
    g: 'ui3d', name: 'switch3d', title: '3D Flip Switch',
    html: '<div class="pv"><div class="bx s3"><label class="tg2"><input type="checkbox"><span class="cub"><b class="on2">on</b><b class="of2">off</b></span></label></div></div>',
    css: `.s3{transform-style:preserve-3d}
.tg2{display:block;width:var(--sw,74px);height:calc(var(--sw,74px) * .46);perspective:var(--vp,620px);cursor:pointer}
.tg2 input{position:absolute;opacity:0;width:1px;height:1px}
.tg2 .cub{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateX(0);transition:transform var(--tt,.52s) cubic-bezier(.4,1.3,.3,1);border-radius:calc(var(--sw,74px) * .14)}
.tg2 .cub b{position:absolute;inset:0;display:grid;place-items:center;border-radius:inherit;font:700 11px/1 "JetBrains Mono",monospace;letter-spacing:.1em;text-transform:uppercase;backface-visibility:hidden}
.tg2 .on2{background:linear-gradient(180deg,color-mix(in srgb,var(--c2,${C2}) 80%,#000),#0b0b16);color:#04131b;transform:rotateX(-90deg) translateZ(calc(var(--sw,74px) * .23))}
.tg2 .of2{background:linear-gradient(180deg,#24242f,#111119);color:#9a9ab0;transform:translateZ(calc(var(--sw,74px) * .23))}
.tg2 input:checked+.cub{transform:rotateX(90deg)}`
  });
  item3({
    g: 'phys', name: 'pendulum-wave', title: 'Pendulum Wave Rails',
    html: '<div class="pv"><div class="bx pwl">' + mapJoin(12, function (i) { return '<span style="--i:' + i + ';--h:' + (56 + i * 4) + '%"><i></i></span>'; }, '') + '</div></div>',
    css: `.pwl{position:relative;display:flex;gap:calc(var(--sz,106px) * .03);align-items:flex-start;width:calc(var(--sz,106px) * 1.6);height:var(--sz,106px);transform-style:preserve-3d;transform:rotateX(12deg)}
.pwl span{position:relative;flex:1;height:var(--h,60%);transform-origin:50% 0;animation:pwl var(--dur,2.6s) cubic-bezier(.45,0,.55,1) infinite alternate;animation-delay:calc(var(--i) * -.11s)}
.pwl span::before{content:"";position:absolute;left:50%;top:0;width:1.5px;height:100%;margin-left:-.75px;background:#3c3c50}
.pwl i{position:absolute;left:50%;bottom:-9px;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:radial-gradient(circle at 34% 30%,#fff,color-mix(in srgb,var(--c1,${C1}) 80%,#000) 70%);box-shadow:0 0 12px -2px color-mix(in srgb,var(--c2,${C2}) 80%,transparent)}
@keyframes pwl{0%{transform:rotate(-26deg)}100%{transform:rotate(26deg)}}`
  });
  item3({
    g: 'phys', name: 'hourglass', title: 'Sand Timer Flip',
    html: '<div class="pv"><div class="bx hg"><span class="g2"></span><span class="g2 g2b"></span><span class="snd"></span></div></div>',
    css: `.hg{position:relative;width:calc(var(--sz,106px) * .8);height:var(--sz,106px);transform-style:preserve-3d;animation:hg var(--dur,4.4s) cubic-bezier(.4,1.2,.3,1) infinite}
@keyframes hg{0%,42%{transform:rotateZ(0)}60%,100%{transform:rotateZ(180deg)}}
.hg .g2{position:absolute;left:0;right:0;top:0;height:48%;background:linear-gradient(180deg,color-mix(in srgb,var(--c2,${C2}) 40%,#0b0b16),transparent);clip-path:polygon(0 0,100% 0,55% 100%,45% 100%);border-top:3px solid color-mix(in srgb,var(--c1,${C1}) 80%,#000)}
.hg .g2b{top:auto;bottom:0;transform:rotate(180deg)}
.hg .snd{position:absolute;left:50%;top:8%;width:6px;height:6px;margin-left:-3px;border-radius:50%;background:#ffd479;animation:hg2 var(--dur,1.1s) linear infinite;opacity:.9}
@keyframes hg2{0%{transform:translateY(0);opacity:1}70%{transform:translateY(calc(var(--sz,106px) * .38));opacity:1}100%{transform:translateY(calc(var(--sz,106px) * .42));opacity:0}}`
  });
  item3({
    g: 'misc', name: 'cube-trio', title: 'Three Cubes Orbit',
    html: '<div class="pv"><div class="bx tr3"><span class="mt"></span>' + mapJoin(3, function (i) { return '<span class="cb" style="--i:' + i + '">' + mapJoin(6, function (i) {
        var t = ['translateZ(HH)', 'rotateY(180deg) translateZ(HH)', 'rotateY(90deg) translateZ(HH)',
          'rotateY(-90deg) translateZ(HH)', 'rotateX(90deg) translateZ(HH)', 'rotateX(-90deg) translateZ(HH)'];
        return '<i style="transform:' + t[i].split('HH').join("calc(var(--sz,106px) * .17)") + '"></i>';
      }, '') + '</span>'; }, '') + '</div></div>',
    css: `.tr3{position:relative;width:var(--sz,106px);height:var(--sz,106px);transform-style:preserve-3d;animation:tr3 var(--dur,8s) linear infinite}
@keyframes tr3{to{transform:rotateY(360deg) rotateX(14deg)}}
.tr3 .mt{position:absolute;left:50%;top:50%;width:26px;height:26px;margin:-13px;border-radius:50%;background:radial-gradient(circle at 34% 30%,#fff,var(--c1,${C1}) 70%);box-shadow:0 0 20px 2px color-mix(in srgb,var(--c1,${C1}) 60%,transparent)}
.tr3 .cb{position:absolute;left:50%;top:50%;width:calc(var(--sz,106px) * .34);height:calc(var(--sz,106px) * .34);margin:calc(var(--sz,106px) * -.17);transform-style:preserve-3d;transform:rotateY(calc(var(--i) * 120deg)) translateX(calc(var(--sz,106px) * .5))}
.tr3 .cb i{position:absolute;inset:0;border-radius:3px;background:linear-gradient(150deg,color-mix(in srgb,var(--c2,${C2}) 80%,#000),#0b0b16);border:1px solid rgba(255,255,255,.14)}`
  });
  item3({
    g: 'misc', name: 'tilt-gallery', title: 'Tilt Gallery Grid',
    html: '<div class="pv"><div class="bx g3">' + mapJoin(4, function (i) { return '<span class="tl2" style="--i:' + i + '"><b></b></span>'; }, '') + '</div></div>',
    css: `.g3{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:calc(var(--sz,106px) * 1.5);transform-style:preserve-3d;transform:rotateX(var(--gx,14deg)) rotateY(var(--gy,-12deg));transition:transform .2s ease-out}
.g3 .tl2{position:relative;aspect-ratio:1;border-radius:10px;background:linear-gradient(150deg,#1c1c2a,#0d0d15);border:1px solid rgba(255,255,255,.12);transform-style:preserve-3d;transform:translateZ(0);transition:transform var(--tt,.4s) cubic-bezier(.3,1.4,.4,1)}
.g3 .tl2 b{position:absolute;inset:18%;border-radius:6px;background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 85%,#000),color-mix(in srgb,var(--c2,${C2}) 45%,#0b0b16));transform:translateZ(12px);transition:transform var(--tt,.4s)}
.g3 .tl2:hover{transform:translateZ(22px)}
.g3 .tl2:hover b{transform:translateZ(30px) scale(1.04)}`,
    js: 'var g=root.querySelector(".g3");\n' +
      'g.addEventListener("pointermove",function(e){var r=g.getBoundingClientRect();if(!r.width)return;\n' +
      '  g.style.setProperty("--gy",((e.clientX-r.left)/r.width-.5)*-26+"deg");\n' +
      '  g.style.setProperty("--gx",((e.clientY-r.top)/r.height-.5)*22+"deg");});\n' +
      'g.addEventListener("pointerleave",function(){g.style.setProperty("--gy","-12deg");g.style.setProperty("--gx","14deg");});'
  });
  item3({
    g: 'misc', name: 'prism-splits', title: 'Prism Split',
    html: '<div class="pv"><div class="bx ps"><span class="beam"></span>' + mapJoin(5, function (i) { return '<span class="ray" style="--i:' + i + '"></span>'; }, '') + '<span class="tri"></span></div></div>',
    css: `.ps{position:relative;width:calc(var(--sz,106px) * 1.7);height:var(--sz,106px);transform-style:preserve-3d;transform:rotateX(12deg)}
.ps .tri{position:absolute;left:42%;top:22%;width:0;height:0;border-left:calc(var(--sz,106px) * .28) solid transparent;border-right:calc(var(--sz,106px) * .28) solid transparent;border-bottom:calc(var(--sz,106px) * .5) solid color-mix(in srgb,var(--c1,${C1}) 30%,#0b0b16);filter:drop-shadow(0 0 12px color-mix(in srgb,var(--c1,${C1}) 45%,transparent));animation:psi var(--dur,5s) ease-in-out infinite alternate}
@keyframes psi{to{transform:rotateY(28deg) rotateX(-10deg)}}
.ps .beam{position:absolute;left:0;top:52%;width:44%;height:3px;background:linear-gradient(90deg,transparent,#fff);box-shadow:0 0 12px 1px #ffffff55}
.ps .ray{position:absolute;left:58%;top:52%;width:42%;height:2px;transform-origin:0 50%;transform:rotate(calc((var(--i) - 2) * 9deg));background:linear-gradient(90deg,color-mix(in srgb,var(--c2,${C2}) 90%,#fff),transparent);animation:ray var(--dur,3.4s) ease-in-out infinite alternate;animation-delay:calc(var(--i) * -.2s);opacity:.85}
@keyframes ray{to{transform:rotate(calc((var(--i) - 2) * 15deg)) scaleX(1.15);opacity:1}}`
  });
  item3({
    g: 'misc', name: 'stack-flip-deck', title: 'Rotating Card Deck',
    html: '<div class="pv"><div class="bx rd">' + mapJoin(5, function (i) { return '<span class="cd3" style="--i:' + i + '"><b>' + ['01', '02', '03', '04', '05'][i] + '</b></span>'; }, '') + '</div></div>',
    css: `.rd{position:relative;width:calc(var(--sz,106px) * 1.2);height:var(--sz,106px);transform-style:preserve-3d}
.rd .cd3{position:absolute;inset:0;border-radius:14px;background:linear-gradient(150deg,#1f1f2e,#0e0e17);border:1px solid rgba(255,255,255,.14);display:grid;place-items:center;transform-origin:50% 100%;transform:translateZ(calc(var(--i) * var(--sp,10px))) rotateX(calc(var(--i) * -3deg));animation:rd var(--dur,4.6s) cubic-bezier(.4,1.1,.3,1) infinite;animation-delay:calc(var(--i) * -.18s);box-shadow:0 22px 34px -24px #000}
.rd .cd3 b{font:800 20px/1 "JetBrains Mono",monospace;color:color-mix(in srgb,var(--c2,${C2}) 90%,#fff)}
@keyframes rd{0%,100%{transform:translateZ(calc(var(--i) * var(--sp,10px))) rotateX(calc(var(--i) * -3deg))}50%{transform:translateZ(calc((4 - var(--i)) * var(--sp,10px))) rotateX(calc((4 - var(--i)) * -3deg))}}`
  });
  item3({
    g: 'misc', name: 'roll-in-text', title: 'Roll In Type',
    html: '<div class="pv"><div class="bx rt">' + mapJoin(7, function (i) {
      return '<span class="ch" style="--i:' + i + '"><b>' + 'MOTION'.charAt(i % 6) + '</b><b>' + 'MOTION'.charAt(i % 6) + '</b></span>';
    }, '') + '</div></div>',
    css: `.rt{display:flex;gap:4px;transform-style:preserve-3d}
.rt .ch{position:relative;width:calc(var(--sz,106px) * .26);height:calc(var(--sz,106px) * .34);transform-style:preserve-3d;transform-origin:50% 50%;animation:rt var(--dur,3.4s) cubic-bezier(.4,1.1,.3,1) infinite;animation-delay:calc(var(--i) * -.1s)}
@keyframes rt{0%,10%{transform:rotateX(0)}45%,60%{transform:rotateX(-180deg)}100%{transform:rotateX(-360deg)}}
.rt b{position:absolute;inset:0;display:grid;place-items:center;border-radius:6px;font:800 calc(var(--sz,106px) * .2)/1 "Plus Jakarta Sans",system-ui;backface-visibility:hidden;color:#fff}
.rt b:first-child{background:linear-gradient(180deg,color-mix(in srgb,var(--c1,${C1}) 85%,#000),#101020)}
.rt b:last-child{background:linear-gradient(180deg,color-mix(in srgb,var(--c2,${C2}) 75%,#000),#0b1420);transform:rotateX(180deg)}`
  });

  K.add('3d', pool);
})(window);
