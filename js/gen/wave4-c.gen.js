/* ============================================================
   Motion Lab — wave 4, part C (svg · 3d · motion)
   Sixteen new mechanic families per category, rendered through the
   same MECHANIC × VARIANT matrix as the deep categories.
   House rule honoured: custom properties are only ever read with a
   fallback, never declared inside demo CSS.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit, V = global.MLVary;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color;
  var cells = K.cells;

  function D(v, mul) { return Math.round(v.dur * (mul || 1) * 100) / 100; }
  function baseCfg(v, extra) {
    return [
      range('Cycle', '--dur', .4, 24, .1, v.dur, 's'),
      range('Stagger', '--step', 0, .5, .01, v.step, 's'),
      col('Colour', '--c1', v.c1),
      col('Colour B', '--c2', v.c2),
      col('Colour C', '--c3', v.c3)
    ].concat(extra || []);
  }

  /* ════════════════════════ SVG & LINES ════════════════════════ */
  var SV = [];

  function svgCfg(v, extra) {
    return [
      range('Width', '--w', 120, 380, 4, 230, 'px'),
      range('Stroke', '--tk', 1, 12, .5, 3, 'px'),
      range('Cycle', '--dur', .4, 24, .1, v.dur, 's'),
      range('Glow', '--glow', 0, 30, 1, 8, 'px'),
      col('Colour', '--c1', v.c1),
      col('Colour B', '--c2', v.c2),
      col('Colour C', '--c3', v.c3)
    ].concat(extra || []);
  }

  /* 1. path train — three dots coupled on a hand-drawn curve */
  SV.push({ key: 'train', title: 'Path Train', tags: ['svg', 'css'], build: function (v) {
    var d = 'M12 64 Q58 10 104 48 T196 36';
    return {
      html: '<svg class="spt" viewBox="0 0 208 86"><path class="ln" d="' + d + '"/><circle class="d1" r="5"/><circle class="d2" r="4"/><circle class="d3" r="3"/></svg>',
      css: join([
        '.spt{width:var(--w,230px);height:auto;overflow:visible}',
        '.spt .ln{fill:none;stroke:color-mix(in srgb,var(--c2,' + v.c2 + ') 40%,transparent);stroke-width:var(--tk,3px);stroke-linecap:round;stroke-dasharray:2 7}',
        '.spt circle{fill:var(--c1,' + v.c1 + ');offset-path:path("' + d + '");animation:svtr-' + v.i + ' var(--dur,' + D(v, 1.6) + 's) linear infinite;filter:drop-shadow(0 0 var(--glow,8px) var(--c1,' + v.c1 + '))}',
        '.spt .d2{fill:var(--c2,' + v.c2 + ');animation-delay:calc(var(--dur,' + D(v, 1.6) + 's) / -3)}',
        '.spt .d3{fill:var(--c3,' + v.c3 + ');animation-delay:calc(var(--dur,' + D(v, 1.6) + 's) / -3 * 2)}',
        kf('svtr-' + v.i, 'from{offset-distance:0%}to{offset-distance:100%}')
      ]),
      cfg: svgCfg(v, [])
    };
  } });

  /* 2. dash ring trio — three dotted rings gearbox around a core */
  SV.push({ key: 'rings', title: 'Dash Ring Trio', tags: ['svg', 'css'], build: function (v) {
    return {
      html: '<svg class="sdr" viewBox="0 0 130 130"><circle class="r1" cx="65" cy="65" r="52"/><circle class="r2" cx="65" cy="65" r="36"/><circle class="r3" cx="65" cy="65" r="20"/><circle class="core" cx="65" cy="65" r="6"/></svg>',
      css: join([
        '.sdr{width:var(--w,150px);height:auto;overflow:visible}',
        '.sdr circle{fill:none;stroke-linecap:round;transform-origin:65px 65px}',
        '.sdr .r1{stroke:var(--c1,' + v.c1 + ');stroke-width:var(--tk,3px);stroke-dasharray:4 12;animation:svdr-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite}',
        '.sdr .r2{stroke:var(--c2,' + v.c2 + ');stroke-width:calc(var(--tk,3px) * .8);stroke-dasharray:14 8;animation:svdr-' + v.i + ' calc(var(--dur,' + D(v, 2) + 's) * .7) linear infinite reverse}',
        '.sdr .r3{stroke:var(--c3,' + v.c3 + ');stroke-width:calc(var(--tk,3px) * 1.4);stroke-dasharray:2 9;animation:svdr-' + v.i + ' calc(var(--dur,' + D(v, 2) + 's) * 1.4) linear infinite}',
        '.sdr .core{fill:var(--c3,' + v.c3 + ');stroke:none;filter:drop-shadow(0 0 var(--glow,8px) var(--c3,' + v.c3 + '))}',
        kf('svdr-' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: svgCfg(v, [])
    };
  } });

  /* 3. crosshair lock — the reticle tightens, blips and holds */
  SV.push({ key: 'crosshair', title: 'Crosshair Lock', tags: ['svg', 'css'], build: function (v) {
    return {
      html: '<svg class="sch" viewBox="0 0 130 130"><path class="tick" d="M65 8v20M65 102v20M8 65h20M102 65h20"/><rect class="bx" x="40" y="40" width="50" height="50" rx="4"/><circle class="bl" cx="65" cy="65" r="5"/></svg>',
      css: join([
        '.sch{width:var(--w,150px);height:auto;overflow:visible}',
        '.sch .tick{stroke:var(--c2,' + v.c2 + ');stroke-width:var(--tk,3px);stroke-linecap:round;fill:none}',
        '.sch .bx{fill:none;stroke:var(--c1,' + v.c1 + ');stroke-width:var(--tk,3px);stroke-dasharray:50 150;stroke-linecap:round;transform-origin:65px 65px;animation:svch-' + v.i + ' var(--dur,' + D(v, 1.6) + 's) ease-in-out infinite}',
        '.sch .bl{fill:var(--c3,' + v.c3 + ');filter:drop-shadow(0 0 var(--glow,8px) var(--c3,' + v.c3 + '));animation:svbl-' + v.i + ' var(--dur,' + D(v, 1.6) + 's) linear infinite}',
        kf('svch-' + v.i, '0%,100%{transform:scale(1.3) rotate(0);opacity:.55}45%,60%{transform:scale(1) rotate(45deg);opacity:1}'),
        kf('svbl-' + v.i, '0%,40%,80%,100%{opacity:1}45%,70%{opacity:.2}')
      ]),
      cfg: svgCfg(v, [])
    };
  } });

  /* 4. treadmill wave — a drawn sine that never stops marching */
  SV.push({ key: 'wave', title: 'Treadmill Wave', tags: ['svg', 'css'], build: function (v) {
    var q = 15 + (v.i % 4) * 5;
    var d = 'M-120 40 q15 -' + q + ' 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0';
    return {
      html: '<svg class="stw" viewBox="0 0 120 80"><clipPath id="stwc' + v.i + '"><rect x="0" y="0" width="120" height="80"/></clipPath><g class="mv" clip-path="url(#stwc' + v.i + ')"><path d="' + d + '"/></g></svg>',
      css: join([
        '.stw{width:var(--w,230px);height:auto;overflow:visible}',
        '.stw path{fill:none;stroke:var(--c1,' + v.c1 + ');stroke-width:var(--tk,3px);stroke-linecap:round;filter:drop-shadow(0 0 var(--glow,8px) var(--c2,' + v.c2 + '))}',
        '.stw .mv{animation:svtw-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite}',
        kf('svtw-' + v.i, 'to{transform:translateX(-120px)}')
      ]),
      cfg: svgCfg(v, [])
    };
  } });

  /* 5. bracket lock — four corners squeeze onto the mark */
  SV.push({ key: 'brackets', title: 'Bracket Lock', tags: ['svg', 'css'], build: function (v) {
    return {
      html: '<svg class="sbr" viewBox="0 0 130 130"><path class="b tl" d="M34 46V34H46"/><path class="b tr" d="M84 34h12v12"/><path class="b bl" d="M46 96H34V84"/><path class="b br" d="M96 84v12H84"/><circle class="mk" cx="65" cy="65" r="4"/></svg>',
      css: join([
        '.sbr{width:var(--w,150px);height:auto;overflow:visible}',
        '.sbr .b{fill:none;stroke:var(--c2,' + v.c2 + ');stroke-width:var(--tk,3px);stroke-linecap:round;transform-origin:65px 65px;animation:svbk-' + v.i + ' var(--dur,' + D(v, 1.6) + 's) cubic-bezier(.5,0,.5,1) infinite}',
        '.sbr .mk{fill:var(--c3,' + v.c3 + ');animation:svmk-' + v.i + ' var(--dur,' + D(v, 1.6) + 's) ease-in-out infinite}',
        kf('svbk-' + v.i, '0%,100%{transform:scale(1.5);opacity:.4}55%,75%{transform:scale(1);opacity:1}'),
        kf('svmk-' + v.i, '0%,50%{opacity:.25}60%,95%{opacity:1}')
      ]),
      cfg: svgCfg(v, [])
    };
  } });

  /* 6. sonar rings — a ping keeps radiating off the origin */
  SV.push({ key: 'sonar', title: 'Sonar Rings', tags: ['svg', 'css'], build: function (v) {
    return {
      html: '<svg class="ssn" viewBox="0 0 130 130"><circle class="p1" cx="65" cy="65" r="8"/><circle class="p2" cx="65" cy="65" r="8"/><circle class="p3" cx="65" cy="65" r="8"/><circle class="org" cx="65" cy="65" r="6"/></svg>',
      css: join([
        '.ssn{width:var(--w,150px);height:auto;overflow:visible}',
        '.ssn circle{fill:none;stroke:var(--c1,' + v.c1 + ');stroke-width:var(--tk,3px);transform-origin:65px 65px;opacity:0;animation:svsn-' + v.i + ' var(--dur,' + D(v, 2) + 's) cubic-bezier(.2,.6,.3,1) infinite}',
        '.ssn .p2{stroke:var(--c2,' + v.c2 + ');animation-delay:calc(var(--dur,' + D(v, 2) + 's) / -3)}',
        '.ssn .p3{stroke:var(--c3,' + v.c3 + ');animation-delay:calc(var(--dur,' + D(v, 2) + 's) / -3 * 2)}',
        '.ssn .org{fill:var(--c1,' + v.c1 + ');stroke:none;opacity:1;animation:none;filter:drop-shadow(0 0 var(--glow,8px) var(--c1,' + v.c1 + '))}',
        kf('svsn-' + v.i, '0%{transform:scale(.3);opacity:.9}100%{transform:scale(6.4);opacity:0}')
      ]),
      cfg: svgCfg(v, [])
    };
  } });

  /* 7. spiral draw — the spiral inks itself in */
  SV.push({ key: 'spiral', title: 'Spiral Draw', tags: ['svg', 'css'], build: function (v) {
    var pts = [], turns = 3 + (v.i % 2);
    for (var s = 0; s <= 60; s++) {
      var t = s / 60 * turns * 6.283;
      var r = 5 + s / 60 * 48;
      pts.push((65 + Math.cos(t + v.i) * r).toFixed(1) + ',' + (65 + Math.sin(t + v.i) * r).toFixed(1));
    }
    return {
      html: '<svg class="ssp" viewBox="0 0 130 130"><path d="M' + pts.join(' L') + '"/></svg>',
      css: join([
        '.ssp{width:var(--w,150px);height:auto;overflow:visible}',
        '.ssp path{fill:none;stroke:var(--c1,' + v.c1 + ');stroke-width:var(--tk,3px);stroke-linecap:round;stroke-dasharray:640;stroke-dashoffset:640;filter:drop-shadow(0 0 var(--glow,8px) var(--c2,' + v.c2 + '));animation:svsp-' + v.i + ' var(--dur,' + D(v, 2.4) + 's) ease-in-out infinite}',
        kf('svsp-' + v.i, '0%{stroke-dashoffset:640;opacity:1}55%{stroke-dashoffset:0;opacity:1}80%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}')
      ]),
      cfg: svgCfg(v, [])
    };
  } });

  /* 8. barcode laser — the checkout scanner keeps scanning */
  SV.push({ key: 'barcode', title: 'Barcode Laser', tags: ['svg', 'css'], build: function (v) {
    var bars = '', x = 8;
    while (x < 108) {
      var bw = 2 + Math.floor(v.rnd() * 5);
      if (x + bw > 112) bw = 112 - x;
      bars += '<rect x="' + x + '" y="14" width="' + bw + '" height="46" rx="1"/>';
      x += bw + 2 + Math.floor(v.rnd() * 4);
    }
    return {
      html: '<svg class="sbc" viewBox="0 0 120 74"><g class="bars">' + bars + '</g><rect class="lz" x="0" y="8" width="4" height="58" rx="2"/></svg>',
      css: join([
        '.sbc{width:var(--w,190px);height:auto;overflow:visible;padding:8px 12px;border-radius:10px;background:#f4f4f8}',
        '.sbc .bars rect{fill:#14141c}',
        '.sbc .lz{fill:var(--c3,' + v.c3 + ');opacity:.85;filter:drop-shadow(0 0 var(--glow,8px) var(--c3,' + v.c3 + '));animation:svbc-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite alternate ' + v.dir + '}',
        kf('svbc-' + v.i, 'to{transform:translateX(112px)}')
      ]),
      cfg: svgCfg(v, [])
    };
  } });

  /* 9. flatline — the monitor traces a beat and rides with it */
  SV.push({ key: 'ecg', title: 'Flatline', tags: ['svg', 'css'], build: function (v) {
    var d = 'M0 40 H30 l6 -14 l7 30 l6 -46 l7 34 l5 -16 H90 l6 -12 l7 26 l6 -38 l6 26 H150';
    return {
      html: '<svg class="sec" viewBox="0 0 150 80"><path class="tr" d="' + d + '"/><circle class="hd" r="4"/></svg>',
      css: join([
        '.sec{width:var(--w,220px);height:auto;overflow:visible;border-radius:10px;background:linear-gradient(180deg,#0b0d14,#0d1018)}',
        '.sec .tr{fill:none;stroke:var(--c2,' + v.c2 + ');stroke-width:var(--tk,3px);stroke-linejoin:round;stroke-linecap:round;filter:drop-shadow(0 0 var(--glow,8px) var(--c2,' + v.c2 + '))}',
        '.sec .hd{fill:var(--c3,' + v.c3 + ');offset-path:path("' + d + '");animation:svec-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite;filter:drop-shadow(0 0 7px var(--c3,' + v.c3 + '))}',
        kf('svec-' + v.i, 'from{offset-distance:0%}to{offset-distance:100%}')
      ]),
      cfg: svgCfg(v, [])
    };
  } });

  /* 10. hex dash runner — dashes race around the hexagon */
  SV.push({ key: 'hexrun', title: 'Hex Dash Runner', tags: ['svg', 'css'], build: function (v) {
    return {
      html: '<svg class="shx" viewBox="0 0 130 130"><path class="hx" d="M65 10 L112 37 L112 93 L65 120 L18 93 L18 37 Z"/><path class="tri" d="M65 48 L80 74 H50 Z"/></svg>',
      css: join([
        '.shx{width:var(--w,150px);height:auto;overflow:visible}',
        '.shx .hx{fill:none;stroke:var(--c1,' + v.c1 + ');stroke-width:var(--tk,3px);stroke-linecap:round;stroke-dasharray:16 10;animation:svhx-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite;filter:drop-shadow(0 0 var(--glow,8px) var(--c1,' + v.c1 + '))}',
        '.shx .tri{fill:color-mix(in srgb,var(--c3,' + v.c3 + ') 70%,transparent);transform-origin:65px 68px;animation:svti-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite}',
        kf('svhx-' + v.i, 'to{stroke-dashoffset:-312}'),
        kf('svti-' + v.i, '0%,100%{transform:rotate(0) scale(.9);opacity:.7}50%{transform:rotate(120deg) scale(1.06);opacity:1}')
      ]),
      cfg: svgCfg(v, [])
    };
  } });

  /* 11. ellipse convoy — comets circling on a tilted orbit */
  SV.push({ key: 'convoy', title: 'Ellipse Convoy', tags: ['svg', 'css'], build: function (v) {
    var d = 'M14 65 a51 30 0 1 1 102 0 a51 30 0 1 1 -102 0';
    return {
      html: '<svg class="sev" viewBox="0 0 130 130" style="transform:rotate(-14deg)"><path class="ob" d="' + d + '"/><circle class="c1x" r="5"/><circle class="c2x" r="4"/><circle class="c3x" r="3"/></svg>',
      css: join([
        '.sev{width:var(--w,160px);height:auto;overflow:visible}',
        '.sev .ob{fill:none;stroke:color-mix(in srgb,var(--c2,' + v.c2 + ') 45%,transparent);stroke-width:1.6;stroke-dasharray:3 6}',
        '.sev circle{offset-path:path("' + d + '");animation:svcv-' + v.i + ' var(--dur,' + D(v, 1.6) + 's) linear infinite}',
        '.sev .c1x{fill:var(--c1,' + v.c1 + ');filter:drop-shadow(0 0 var(--glow,8px) var(--c1,' + v.c1 + '))}',
        '.sev .c2x{fill:var(--c2,' + v.c2 + ');animation-delay:calc(var(--dur,' + D(v, 1.6) + 's) / -3)}',
        '.sev .c3x{fill:var(--c3,' + v.c3 + ');animation-delay:calc(var(--dur,' + D(v, 1.6) + 's) / -3 * 2)}',
        kf('svcv-' + v.i, 'from{offset-distance:0%}to{offset-distance:100%}')
      ]),
      cfg: svgCfg(v, [])
    };
  } });

  /* 12. pendulum arc — the needle swings on a printed scale */
  SV.push({ key: 'needle', title: 'Pendulum Arc', tags: ['svg', 'css'], build: function (v) {
    return {
      html: '<svg class="spn" viewBox="0 0 130 90"><path class="arc" d="M15 78 A54 54 0 0 1 115 78"/><path class="nd" d="M65 78 L65 30"/><circle class="hb" cx="65" cy="78" r="7"/></svg>',
      css: join([
        '.spn{width:var(--w,180px);height:auto;overflow:visible}',
        '.spn .arc{fill:none;stroke:color-mix(in srgb,var(--c3,' + v.c3 + ') 60%,transparent);stroke-width:var(--tk,3px);stroke-linecap:round;stroke-dasharray:2 8}',
        '.spn .nd{stroke:var(--c1,' + v.c1 + ');stroke-width:calc(var(--tk,3px) * 1.2);stroke-linecap:round;transform-origin:65px 78px;animation:svnd-' + v.i + ' var(--dur,' + v.dur + 's) cubic-bezier(.45,0,.55,1) infinite alternate ' + v.dir + ';filter:drop-shadow(0 0 var(--glow,8px) var(--c1,' + v.c1 + '))}',
        '.spn .hb{fill:var(--c2,' + v.c2 + ')}',
        kf('svnd-' + v.i, 'from{transform:rotate(calc(var(--swing,52deg) * -1))}to{transform:rotate(var(--swing,52deg))}')
      ]),
      cfg: svgCfg(v, [range('Swing', '--swing', 16, 84, 2, 52, 'deg')])
    };
  } });

  /* 13. pin drop — the marker keeps landing on the map */
  SV.push({ key: 'pin', title: 'Pin Drop', tags: ['svg', 'css'], build: function (v) {
    return {
      html: '<svg class="spd" viewBox="0 0 130 130"><ellipse class="rg" cx="65" cy="102" rx="16" ry="5"/><path class="pn" d="M65 96 c-12 -10 -18 -19 -18 -29 A18 18 0 1 1 83 67 c0 10 -6 19 -18 29 Z"/><circle class="hl" cx="65" cy="65" r="6"/></svg>',
      css: join([
        '.spd{width:var(--w,140px);height:auto;overflow:visible}',
        '.spd .rg{fill:color-mix(in srgb,var(--c2,' + v.c2 + ') 45%,transparent);transform-origin:65px 102px;animation:svrg-' + v.i + ' var(--dur,' + v.dur + 's) ease-out infinite}',
        '.spd .pn{fill:var(--c1,' + v.c1 + ');stroke:color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,#000);stroke-width:1.4;filter:drop-shadow(0 6px 6px rgba(0,0,0,.4));animation:svpn-' + v.i + ' var(--dur,' + v.dur + 's) cubic-bezier(.3,1.2,.4,1) infinite}',
        '.spd .hl{fill:#fff;animation:svpn2-' + v.i + ' var(--dur,' + v.dur + 's) cubic-bezier(.3,1.2,.4,1) infinite}',
        kf('svpn-' + v.i, '0%{transform:translateY(-46px);opacity:0}14%{opacity:1}30%,80%{transform:translateY(0);opacity:1}92%,100%{transform:translateY(0);opacity:0}'),
        kf('svpn2-' + v.i, '0%{transform:translateY(-46px);opacity:0}14%{opacity:1}30%,80%{transform:translateY(0);opacity:1}92%,100%{transform:translateY(0);opacity:0}'),
        kf('svrg-' + v.i, '0%{transform:scale(.3);opacity:0}30%{transform:scale(.4);opacity:0}42%{transform:scale(.6);opacity:.9}80%{transform:scale(1.25);opacity:0}100%{transform:scale(.3);opacity:0}')
      ]),
      cfg: svgCfg(v, [])
    };
  } });

  /* 14. wire cube trace — an isometric cube drawn edge by edge */
  SV.push({ key: 'cube', title: 'Wire Cube Trace', tags: ['svg', 'css'], build: function (v) {
    return {
      html: '<svg class="swc" viewBox="0 0 130 130"><g class="eg"><path d="M40 50 L90 50"/><path d="M90 50 L90 100"/><path d="M90 100 L40 100"/><path d="M40 100 L40 50"/><path d="M65 25 L115 25"/><path d="M115 25 L115 75"/><path d="M115 75 L90 100"/><path d="M115 25 L90 50"/><path d="M40 50 L65 25"/><path d="M65 25 L65 75"/><path d="M65 75 L40 100"/><path d="M65 75 L115 75"/></g></svg>',
      css: join([
        '.swc{width:var(--w,150px);height:auto;overflow:visible}',
        '.swc .eg path{fill:none;stroke:var(--c2,' + v.c2 + ');stroke-width:var(--tk,3px);stroke-linecap:round;stroke-dasharray:56;stroke-dashoffset:56;animation:svec2-' + v.i + ' var(--dur,' + D(v, 3) + 's) ease-in-out infinite;animation-delay:calc(var(--i,0) * var(--step,' + (v.step * 2).toFixed(3) + 's));filter:drop-shadow(0 0 var(--glow,8px) var(--c2,' + v.c2 + '))}',
        '.swc .eg path:nth-child(3n){stroke:var(--c1,' + v.c1 + ')}',
        '.swc .eg path:nth-child(4n){stroke:var(--c3,' + v.c3 + ')}',
        '.swc .eg path:nth-child(1){--i:0}.swc .eg path:nth-child(2){--i:1}.swc .eg path:nth-child(3){--i:2}.swc .eg path:nth-child(4){--i:3}.swc .eg path:nth-child(5){--i:4}.swc .eg path:nth-child(6){--i:5}.swc .eg path:nth-child(7){--i:6}.swc .eg path:nth-child(8){--i:7}.swc .eg path:nth-child(9){--i:8}.swc .eg path:nth-child(10){--i:9}.swc .eg path:nth-child(11){--i:10}.swc .eg path:nth-child(12){--i:11}',
        kf('svec2-' + v.i, '0%{stroke-dashoffset:56;opacity:1}24%,82%{stroke-dashoffset:0;opacity:1}96%,100%{stroke-dashoffset:0;opacity:0}')
      ]),
      cfg: svgCfg(v, [range('Stagger', '--step', 0, .3, .01, Math.round(v.step * 2 * 1000) / 1000, 's')])
    };
  } });

  /* 15. infinity ride — a comet laps the lemniscate */
  SV.push({ key: 'lemni', title: 'Infinity Ride', tags: ['svg', 'css'], build: function (v) {
    var d = 'M65 65 C65 35 105 35 105 65 C105 95 65 95 65 65 C65 35 25 35 25 65 C25 95 65 95 65 65';
    return {
      html: '<svg class="slm" viewBox="0 0 130 130"><path class="lm" d="' + d + '"/><circle class="cm" r="5"/></svg>',
      css: join([
        '.slm{width:var(--w,160px);height:auto;overflow:visible}',
        '.slm .lm{fill:none;stroke:var(--c1,' + v.c1 + ');stroke-width:var(--tk,3px);stroke-linecap:round;stroke-dasharray:14 10;animation:svlm-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite;opacity:.75}',
        '.slm .cm{fill:var(--c3,' + v.c3 + ');offset-path:path("' + d + '");animation:svcm-' + v.i + ' var(--dur,' + D(v, 1.6) + 's) linear infinite;filter:drop-shadow(0 0 var(--glow,8px) var(--c3,' + v.c3 + '))}',
        kf('svlm-' + v.i, 'to{stroke-dashoffset:-480}'),
        kf('svcm-' + v.i, 'from{offset-distance:0%}to{offset-distance:100%}')
      ]),
      cfg: svgCfg(v, [])
    };
  } });

  /* 16. signal arcs — wifi arcs firing from the dish */
  SV.push({ key: 'signal', title: 'Signal Arcs', tags: ['svg', 'css'], build: function (v) {
    return {
      html: '<svg class="ssg" viewBox="0 0 130 110"><path class="a1" d="M51 86 A14 14 0 0 1 79 86"/><path class="a2" d="M39 74 A34 34 0 0 1 91 74"/><path class="a3" d="M27 62 A54 54 0 0 1 103 62"/><circle class="dt" cx="65" cy="92" r="6"/></svg>',
      css: join([
        '.ssg{width:var(--w,160px);height:auto;overflow:visible}',
        '.ssg path{fill:none;stroke-linecap:round;stroke-width:calc(var(--tk,3px) * 1.6);opacity:.16;animation:svsg-' + v.i + ' var(--dur,' + D(v, 1.8) + 's) ease-in-out infinite}',
        '.ssg .a1{stroke:var(--c1,' + v.c1 + ')}',
        '.ssg .a2{stroke:var(--c2,' + v.c2 + ');animation-delay:calc(var(--dur,' + D(v, 1.8) + 's) / -3)}',
        '.ssg .a3{stroke:var(--c3,' + v.c3 + ');animation-delay:calc(var(--dur,' + D(v, 1.8) + 's) / -3 * 2)}',
        '.ssg .dt{fill:var(--c1,' + v.c1 + ');filter:drop-shadow(0 0 var(--glow,8px) var(--c1,' + v.c1 + '))}',
        kf('svsg-' + v.i, '0%,28%{opacity:.16}45%,72%{opacity:1}90%,100%{opacity:.16}')
      ]),
      cfg: svgCfg(v, [])
    };
  } });

  K.add('svg', V.matrix('svg', SV, 20, 'w4sv'));

  /* ════════════════════════ 3D ════════════════════════ */
  var TD = [];

  var D3S = '.wd3{position:relative;width:var(--sz,124px);height:var(--sz,124px);perspective:var(--pers,660px);display:grid;place-items:center;transform-style:preserve-3d}';
  function d3Cfg(v, extra) {
    return [
      range('Stage', '--sz', 80, 220, 2, 124, 'px'),
      range('Perspective', '--pers', 320, 1400, 20, 660, 'px'),
      range('Cycle', '--dur', .5, 24, .1, v.dur, 's'),
      col('Colour', '--c1', v.c1),
      col('Colour B', '--c2', v.c2),
      col('Colour C', '--c3', v.c3)
    ].concat(extra || []);
  }

  /* 1. tri prism — a glass prism turning in the light */
  TD.push({ key: 'prism', title: 'Tri Prism', tags: ['3d', 'css'], build: function (v) {
    return {
      html: '<div class="wd3"><div class="pri"><i class="f1"></i><i class="f2"></i><i class="f3"></i></div></div>',
      css: join([
        D3S,
        '.pri{position:absolute;left:50%;top:50%;width:0;height:0;transform-style:preserve-3d;animation:tdpr-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite}',
        '.pri i{position:absolute;left:-30px;top:-46px;width:60px;height:92px;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent),color-mix(in srgb,var(--c2,' + v.c2 + ') 30%,transparent));border:1.5px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 80%,transparent);box-shadow:0 0 18px -6px color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent)}',
        '.pri .f2{transform:rotateY(120deg) translateZ(18px)}',
        '.pri .f3{transform:rotateY(240deg) translateZ(18px)}',
        '.pri .f1{transform:translateZ(18px)}',
        kf('tdpr-' + v.i, 'from{transform:rotateX(-12deg) rotateY(0)}to{transform:rotateX(-12deg) rotateY(1turn)}')
      ]),
      cfg: d3Cfg(v, [])
    };
  } });

  /* 2. pyramid spin — four faces lean to a glowing apex */
  TD.push({ key: 'pyramid', title: 'Pyramid Spin', tags: ['3d', 'css'], build: function (v) {
    return {
      html: '<div class="wd3"><div class="pyr"><i class="f1"></i><i class="f2"></i><i class="f3"></i><i class="f4"></i><b class="pc"></b></div></div>',
      css: join([
        D3S,
        '.pyr{position:absolute;left:50%;top:56%;width:0;height:0;transform-style:preserve-3d;animation:tdpy-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite}',
        '.pyr i{position:absolute;left:-29px;bottom:0;width:58px;height:52px;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 70%,transparent),color-mix(in srgb,var(--c2,' + v.c2 + ') 35%,transparent));clip-path:polygon(50% 0,100% 100%,0 100%);transform-origin:50% 100%;opacity:.92}',
        '.pyr .f1{transform:translateZ(15px) rotateX(30deg)}',
        '.pyr .f2{transform:rotateY(90deg) translateZ(15px) rotateX(30deg)}',
        '.pyr .f3{transform:rotateY(180deg) translateZ(15px) rotateX(30deg)}',
        '.pyr .f4{transform:rotateY(270deg) translateZ(15px) rotateX(30deg)}',
        '.pyr .pc{position:absolute;left:-15px;top:-15px;width:30px;height:30px;border-radius:50%;background:radial-gradient(circle,var(--c3,' + v.c3 + ') 0 32%,transparent 70%);transform:translateZ(0);animation:tdpc-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite}',
        kf('tdpy-' + v.i, 'to{transform:rotateY(1turn)}'),
        kf('tdpc-' + v.i, '0%,100%{opacity:.5}50%{opacity:1}')
      ]),
      cfg: d3Cfg(v, [])
    };
  } });

  /* 3. coin toss — heads, tails, heads again */
  TD.push({ key: 'coin', title: 'Coin Toss', tags: ['3d', 'css'], build: function (v) {
    return {
      html: '<div class="wd3"><div class="cnw"><i class="cn hd">\u2726</i><i class="cn tl">\u25c6</i></div></div>',
      css: join([
        D3S,
        '.cnw{position:absolute;left:50%;top:50%;width:0;height:0;transform-style:preserve-3d;animation:tdcn-' + v.i + ' var(--dur,' + v.dur + 's) cubic-bezier(.5,0,.5,1) infinite}',
        '.cn{position:absolute;left:calc(var(--coin,72px) / -2);top:calc(var(--coin,72px) / -2);width:var(--coin,72px);height:var(--coin,72px);display:grid;place-items:center;border-radius:50%;font-size:calc(var(--coin,72px) * .44);color:#fff8;backface-visibility:hidden;background:radial-gradient(circle at 34% 30%,color-mix(in srgb,var(--c3,' + v.c3 + ') 90%,#fff),var(--c1,' + v.c1 + ') 62%,color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,#000));border:3px solid color-mix(in srgb,var(--c3,' + v.c3 + ') 65%,#0005);box-shadow:inset 0 0 0 5px color-mix(in srgb,var(--c2,' + v.c2 + ') 40%,transparent)}',
        '.cn.tl{transform:rotateY(180deg)}',
        kf('tdcn-' + v.i, '0%{transform:rotateY(0) translateY(0)}50%{transform:rotateY(2turn) translateY(calc(var(--hop,16px) * -1))}100%{transform:rotateY(2turn) translateY(0)}')
      ]),
      cfg: d3Cfg(v, [range('Coin', '--coin', 40, 120, 2, 72, 'px'), range('Hop', '--hop', 0, 46, 2, 16, 'px')])
    };
  } });

  /* 4. corkscrew rise — bars climbing an invisible pole */
  TD.push({ key: 'corkscrew', title: 'Corkscrew Rise', tags: ['3d', 'css'], build: function (v) {
    var n = 8 + (v.i % 4);
    return {
      html: '<div class="wd3"><div class="crk">' + cells(n) + '</div></div>',
      css: join([
        D3S,
        '.crk{position:absolute;left:50%;top:50%;width:0;height:0;transform-style:preserve-3d;animation:tdck-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite}',
        '.crk i{position:absolute;left:calc(var(--bar,56px) / -2);top:-4px;width:var(--bar,56px);height:8px;border-radius:99px;background:linear-gradient(90deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform:rotateY(calc(var(--i) * var(--twist,33deg))) translateY(calc(var(--i) * var(--lift,-11px) + ' + Math.round(n / 2 * 11) + 'px));box-shadow:0 0 10px -3px var(--c1,' + v.c1 + ')}',
        '.crk i:nth-child(2n){background:linear-gradient(90deg,var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '))}',
        kf('tdck-' + v.i, 'to{transform:rotateY(1turn)}')
      ]),
      cfg: d3Cfg(v, [range('Bar', '--bar', 30, 100, 2, 56, 'px'), range('Twist', '--twist', 15, 60, 1, 33, 'deg'), range('Lift', '--lift', -20, -4, 1, -11, 'px')])
    };
  } });

  /* 5. gyroscope — nested gimbal rings hunting for balance */
  TD.push({ key: 'gyro', title: 'Gyroscope', tags: ['3d', 'css'], build: function (v) {
    return {
      html: '<div class="wd3"><div class="gyr"><i class="g1"></i><i class="g2"></i><i class="g3"></i><b class="cr"></b></div></div>',
      css: join([
        D3S,
        '.gyr{position:absolute;left:50%;top:50%;width:0;height:0;transform-style:preserve-3d}',
        '.gyr i{position:absolute;left:-46px;top:-46px;width:92px;height:92px;border:3px solid var(--c1,' + v.c1 + ');border-radius:50%;transform-style:preserve-3d;box-shadow:0 0 12px -4px var(--c1,' + v.c1 + ')}',
        '.gyr .g1{animation:tdgx-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite}',
        '.gyr .g2{left:-36px;top:-36px;width:72px;height:72px;border-color:var(--c2,' + v.c2 + ');animation:tdgy-' + v.i + ' calc(var(--dur,' + v.dur + 's) * 1.4) linear infinite}',
        '.gyr .g3{left:-26px;top:-26px;width:52px;height:52px;border-color:var(--c3,' + v.c3 + ');animation:tdgz-' + v.i + ' calc(var(--dur,' + v.dur + 's) * 1.9) linear infinite}',
        '.gyr .cr{position:absolute;left:-7px;top:-7px;width:14px;height:14px;border-radius:50%;background:radial-gradient(circle at 36% 30%,#fff8,var(--c2,' + v.c2 + ') 65%)}',
        kf('tdgx-' + v.i, 'to{transform:rotateX(1turn)}'),
        kf('tdgy-' + v.i, 'to{transform:rotateY(1turn)}'),
        kf('tdgz-' + v.i, 'to{transform:rotateX(1turn) rotateY(1turn)}')
      ]),
      cfg: d3Cfg(v, [])
    };
  } });

  /* 6. page turner — a restless book keeps riffling its pages */
  TD.push({ key: 'book', title: 'Page Turner', tags: ['3d', 'css'], build: function (v) {
    return {
      html: '<div class="wd3"><div class="bok"><i class="cov"></i><i class="pg p1"></i><i class="pg p2"></i><i class="pg p3"></i></div></div>',
      css: join([
        D3S,
        '.bok{position:absolute;left:-58px;top:-40px;width:116px;height:80px;transform-style:preserve-3d;transform:rotateX(24deg)}',
        '.bok .cov{position:absolute;inset:0;border-radius:4px 10px 10px 4px;background:linear-gradient(90deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 75%,#000),var(--c1,' + v.c1 + ') 50%,color-mix(in srgb,var(--c2,' + v.c2 + ') 80%,#000));box-shadow:0 14px 26px -12px rgba(0,0,0,.75)}',
        '.bok .pg{position:absolute;left:50%;top:5%;width:45%;height:90%;border-radius:0 7px 7px 0;background:linear-gradient(90deg,#efe9da,#d8d0bb);transform-origin:0 50%;animation:tdbk-' + v.i + ' var(--dur,' + D(v, 3) + 's) cubic-bezier(.5,0,.5,1) infinite;box-shadow:inset -2px 0 6px rgba(0,0,0,.12)}',
        '.bok .p2{animation-delay:calc(var(--dur,' + D(v, 3) + 's) * .16)}',
        '.bok .p3{animation-delay:calc(var(--dur,' + D(v, 3) + 's) * .32)}',
        kf('tdbk-' + v.i, '0%,22%{transform:rotateY(0)}52%,86%{transform:rotateY(-172deg)}100%{transform:rotateY(0)}')
      ]),
      cfg: d3Cfg(v, [])
    };
  } });

  /* 7. holo idol — a projector casts a spinning diamond */
  TD.push({ key: 'holo', title: 'Holo Idol', tags: ['3d', 'css'], build: function (v) {
    return {
      html: '<div class="wd3"><i class="bs"></i><i class="bm"></i><div class="idl"><u class="t"></u><u class="b"></u></div></div>',
      css: join([
        D3S,
        '.wd3 .bs{position:absolute;left:50%;bottom:12%;width:76px;height:16px;margin-left:-38px;border-radius:50%;background:radial-gradient(closest-side,color-mix(in srgb,var(--c2,' + v.c2 + ') 90%,#fff),color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,#000));box-shadow:0 0 20px -2px var(--c2,' + v.c2 + ');transform:rotateX(66deg)}',
        '.wd3 .bm{position:absolute;left:50%;bottom:16%;width:56px;height:70px;margin-left:-28px;background:linear-gradient(0deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 40%,transparent),transparent 80%);clip-path:polygon(36% 100%,64% 100%,100% 0,0 0);transform-origin:50% 100%;animation:tdbm-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite}',
        '.wd3 .idl{position:absolute;left:50%;top:16%;width:0;height:0;transform-style:preserve-3d;animation:tdhl-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite}',
        '.wd3 .idl u{position:absolute;left:-16px;top:-16px;width:32px;height:32px;display:block;border-radius:4px;background:linear-gradient(135deg,color-mix(in srgb,var(--c3,' + v.c3 + ') 75%,transparent),color-mix(in srgb,var(--c1,' + v.c1 + ') 45%,transparent));border:1.5px solid color-mix(in srgb,var(--c3,' + v.c3 + ') 90%,transparent);box-shadow:0 0 16px -3px var(--c3,' + v.c3 + ')}',
        '.wd3 .idl .b{transform:rotateY(90deg)}',
        kf('tdbm-' + v.i, '0%,92%,100%{opacity:.8}95%{opacity:.35}'),
        kf('tdhl-' + v.i, '0%{transform:rotateY(0) rotateZ(0)}100%{transform:rotateY(1turn) rotateZ(0)}')
      ]),
      cfg: d3Cfg(v, [])
    };
  } });

  /* 8. satellite tumble — a little relay tumbling through orbit */
  TD.push({ key: 'satellite', title: 'Satellite Tumble', tags: ['3d', 'css'], build: function (v) {
    return {
      html: '<div class="wd3"><div class="sat"><i class="bd"></i><i class="pn l"></i><i class="pn r"></i><i class="ds"></i></div></div>',
      css: join([
        D3S,
        '.sat{position:absolute;left:50%;top:50%;width:0;height:0;transform-style:preserve-3d;animation:tdst-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite}',
        '.sat .bd{position:absolute;left:-15px;top:-11px;width:30px;height:22px;border-radius:4px;background:linear-gradient(145deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 80%,#fff),var(--c1,' + v.c1 + '));box-shadow:0 0 14px -4px var(--c2,' + v.c2 + ')}',
        '.sat .pn{position:absolute;top:-8px;width:26px;height:16px;border-radius:2px;background:repeating-linear-gradient(90deg,color-mix(in srgb,var(--c3,' + v.c3 + ') 85%,#000) 0 5px,color-mix(in srgb,var(--c1,' + v.c1 + ') 90%,#000) 5px 7px);border:1px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 60%,transparent)}',
        '.sat .l{left:-43px}.sat .r{left:17px}',
        '.sat .ds{position:absolute;left:-6px;top:12px;width:12px;height:12px;border-radius:50%;background:radial-gradient(circle at 36% 30%,#fff6,var(--c2,' + v.c2 + ') 70%)}',
        kf('tdst-' + v.i, '0%{transform:rotateX(0) rotateY(0)}100%{transform:rotateX(1turn) rotateY(.5turn)}')
      ]),
      cfg: d3Cfg(v, [])
    };
  } });

  /* 9. tumbler die — a full die rolling through the air */
  TD.push({ key: 'die', title: 'Tumbler Die', tags: ['3d', 'css'], build: function (v) {
    var P = ['50% 50%', '12% 12%,88% 88%', '12% 12%,50% 50%,88% 88%', '12% 12%,88% 12%,12% 88%,88% 88%', '12% 12%,88% 12%,50% 50%,12% 88%,88% 88%', '12% 12%,88% 12%,12% 50%,88% 50%,12% 88%,88% 88%'];
    var TR = ['translateZ(30px)', 'rotateX(90deg) translateZ(30px)', 'rotateX(-90deg) translateZ(30px)', 'rotateY(90deg) translateZ(30px)', 'rotateY(-90deg) translateZ(30px)', 'rotateY(180deg) translateZ(30px)'];
    var faces = '';
    for (var f = 0; f < 6; f++) {
      faces += '<i class="f' + f + '" style="background-image:' + P[f].split(',').map(function (pp) {
        return 'radial-gradient(circle 4.5px at ' + pp + ',' + v.c3 + ' 26%,transparent 30%)';
      }).join(',') + '"></i>';
    }
    var faceCss = TR.map(function (t, f2) { return '.die .f' + f2 + '{transform:' + t + '}'; }).join('\n');
    return {
      html: '<div class="wd3"><div class="die">' + faces + '</div></div>',
      css: join([
        D3S,
        '.die{position:absolute;left:50%;top:50%;width:0;height:0;transform-style:preserve-3d;animation:tddi-' + v.i + ' var(--dur,' + D(v, 2) + 's) cubic-bezier(.45,0,.55,1) infinite}',
        '.die i{position:absolute;left:-30px;top:-30px;width:60px;height:60px;border-radius:11px;background-color:color-mix(in srgb,var(--c1,' + v.c1 + ') 88%,#0c0c14);border:1.5px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 75%,transparent);box-shadow:inset 0 0 14px color-mix(in srgb,var(--c2,' + v.c2 + ') 30%,transparent)}',
        faceCss,
        kf('tddi-' + v.i, '0%{transform:rotateX(-24deg) rotateY(24deg)}50%{transform:rotateX(156deg) rotateY(-156deg) translateY(calc(var(--hop,20px) * -1))}100%{transform:rotateX(336deg) rotateY(384deg)}')
      ]),
      cfg: d3Cfg(v, [range('Hop', '--hop', 0, 50, 2, 20, 'px')])
    };
  } });

  /* 10. ferris pods — the wheel turns, the pods stay level */
  TD.push({ key: 'ferris', title: 'Ferris Pods', tags: ['3d', 'css'], build: function (v) {
    var arms = '';
    for (var a = 0; a < 4; a++) arms += '<i class="arm a' + a + '"><b class="pod"></b></i>';
    return {
      html: '<div class="wd3"><div class="fer">' + arms + '<b class="hub"></b></div></div>',
      css: join([
        D3S,
        '.fer{position:absolute;left:50%;top:50%;width:0;height:0;transform-style:preserve-3d;animation:tdfe-' + v.i + ' var(--dur,' + D(v, 2.4) + 's) linear infinite}',
        '.fer .arm{position:absolute;left:0;top:0;width:2px;height:var(--spoke,56px);transform-origin:0 0;background:color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,transparent)}',
        '.fer .a0{transform:rotate(0)}.fer .a1{transform:rotate(90deg)}.fer .a2{transform:rotate(180deg)}.fer .a3{transform:rotate(270deg)}',
        '.fer .pod{position:absolute;left:-10px;top:calc(var(--spoke,56px) - 8px);width:20px;height:20px;border-radius:6px;background:linear-gradient(145deg,var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '));box-shadow:0 0 12px -3px var(--c3,' + v.c3 + ');animation:tdpd-' + v.i + ' var(--dur,' + D(v, 2.4) + 's) linear infinite reverse}',
        '.fer .a1 .pod{background:linear-gradient(145deg,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + '))}',
        '.fer .a3 .pod{background:linear-gradient(145deg,var(--c1,' + v.c1 + '),var(--c3,' + v.c3 + '))}',
        '.fer .hub{position:absolute;left:-8px;top:-8px;width:16px;height:16px;border-radius:50%;background:radial-gradient(circle at 36% 30%,#fff7,var(--c2,' + v.c2 + ') 70%)}',
        kf('tdfe-' + v.i, 'to{transform:rotate(1turn)}'),
        kf('tdpd-' + v.i, 'to{transform:rotate(-1turn)}')
      ]),
      cfg: d3Cfg(v, [range('Spoke', '--spoke', 34, 88, 2, 56, 'px')])
    };
  } });

  /* 11. cube satellites — three moons around an invisible planet */
  TD.push({ key: 'moons', title: 'Cube Satellites', tags: ['3d', 'css'], build: function (v) {
    var sats = '';
    for (var s2 = 0; s2 < 3; s2++) sats += '<div class="arm" style="--i:' + s2 + '"><i class="moon"></i></div>';
    return {
      html: '<div class="wd3"><div class="sys">' + sats + '<b class="pl"></b></div></div>',
      css: join([
        D3S,
        '.sys{position:absolute;left:50%;top:50%;width:0;height:0;transform-style:preserve-3d;transform:rotateX(-18deg)}',
        '.sys .arm{position:absolute;left:0;top:0;transform-style:preserve-3d;animation:tdmn-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite;animation-delay:calc(var(--i) * var(--dur,' + D(v, 2) + 's) / -3)}',
        '.sys .moon{position:absolute;left:calc(var(--orb,58px) - 8px);top:-8px;width:16px;height:16px;border-radius:4px;display:block;background:linear-gradient(135deg,var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '));box-shadow:0 0 10px -2px var(--c2,' + v.c2 + ');animation:tdms-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite reverse;animation-delay:calc(var(--i) * var(--dur,' + D(v, 2) + 's) / -3)}',
        '.sys .pl{position:absolute;left:-19px;top:-19px;width:38px;height:38px;border-radius:50%;background:radial-gradient(circle at 34% 30%,color-mix(in srgb,var(--c2,' + v.c2 + ') 85%,#fff),var(--c1,' + v.c1 + ') 66%)}',
        kf('tdmn-' + v.i, 'to{transform:rotateY(1turn)}'),
        kf('tdms-' + v.i, 'to{transform:rotateY(-1turn)}')
      ]),
      cfg: d3Cfg(v, [range('Orbit', '--orb', 34, 96, 2, 58, 'px')])
    };
  } });

  /* 12. wire sphere — rings of light fuse into a globe */
  TD.push({ key: 'wiresphere', title: 'Wire Sphere', tags: ['3d', 'css'], build: function (v) {
    return {
      html: '<div class="wd3"><div class="wsp">' + cells(5) + '</div></div>',
      css: join([
        D3S,
        '.wsp{position:absolute;left:50%;top:50%;width:0;height:0;transform-style:preserve-3d;animation:tdws-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite}',
        '.wsp i{position:absolute;left:calc(var(--globe,92px) / -2);top:calc(var(--globe,92px) / -2);width:var(--globe,92px);height:var(--globe,92px);border:2px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 60%,transparent);border-radius:50%;transform:rotateY(calc(var(--i) * 36deg))}',
        '.wsp i:nth-child(2n){border-color:color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent)}',
        '.wsp i:nth-child(3n){border-color:color-mix(in srgb,var(--c3,' + v.c3 + ') 55%,transparent)}',
        kf('tdws-' + v.i, 'from{transform:rotateX(14deg) rotateY(0)}to{transform:rotateX(14deg) rotateY(1turn)}')
      ]),
      cfg: d3Cfg(v, [range('Globe', '--globe', 50, 150, 2, 92, 'px')])
    };
  } });

  /* 13. pennant wave — the flag ripples in 3D */
  TD.push({ key: 'pennant', title: 'Pennant Wave', tags: ['3d', 'css'], build: function (v) {
    var n = 6 + (v.i % 3);
    var slats = '';
    for (var s3 = 0; s3 < n; s3++) slats += '<i style="--i:' + s3 + '"></i>';
    return {
      html: '<div class="wd3"><b class="pole"></b><div class="flg">' + slats + '</div></div>',
      css: join([
        D3S,
        '.wd3 .pole{position:absolute;left:26px;top:6px;bottom:6px;width:4px;border-radius:99px;background:linear-gradient(180deg,#d8d8e8,#77778f)}',
        '.flg{position:absolute;left:32px;top:16px;height:64px;transform-style:preserve-3d;perspective:400px}',
        '.flg i{position:absolute;left:calc(var(--i) * var(--sw,13px));top:0;width:var(--sw,13px);height:100%;background:linear-gradient(180deg,var(--c1,' + v.c1 + ') 0 33%,var(--c2,' + v.c2 + ') 33% 66%,var(--c3,' + v.c3 + ') 66%);transform-origin:0 50%;animation:tdfl-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -1)}',
        kf('tdfl-' + v.i, '0%,100%{transform:rotateY(calc(var(--wave,22deg) * -1)) scale(.96)}50%{transform:rotateY(var(--wave,22deg)) scale(1.03)}')
      ]),
      cfg: d3Cfg(v, [range('Wave', '--wave', 8, 44, 2, 22, 'deg'), range('Slat', '--sw', 8, 22, 1, 13, 'px'), range('Stagger', '--step', 0, .4, .01, v.step, 's')])
    };
  } });

  /* 14. key turn — the key courts the lock */
  TD.push({ key: 'key', title: 'Key Turn', tags: ['3d', 'css'], build: function (v) {
    return {
      html: '<div class="wd3"><b class="lkh"></b><i class="ky"><u class="hd"></u><u class="t1"></u><u class="t2"></u></i></div>',
      css: join([
        D3S,
        '.wd3 .lkh{position:absolute;left:calc(50% + 16px);top:50%;width:46px;height:46px;margin:-23px;border-radius:50%;background:radial-gradient(circle at 38% 32%,#23232f,#101018);box-shadow:0 8px 20px rgba(0,0,0,.55),inset 0 0 0 3px color-mix(in srgb,var(--c3,' + v.c3 + ') 45%,transparent)}',
        '.wd3 .lkh::after{content:"";position:absolute;left:calc(50% - 8px);top:calc(50% - 16px);width:16px;height:32px;border-radius:8px 8px 3px 3px;background:#05050a}',
        '.ky{position:absolute;left:calc(50% - 62px);top:50%;height:12px;margin-top:-6px;width:56px;border-radius:3px;background:linear-gradient(180deg,var(--c2,' + v.c2 + '),color-mix(in srgb,var(--c2,' + v.c2 + ') 65%,#000));transform-origin:100% 50%;animation:tdky-' + v.i + ' var(--dur,' + D(v, 2) + 's) cubic-bezier(.6,0,.4,1) infinite}',
        '.ky .hd{position:absolute;left:-16px;top:-7px;width:22px;height:26px;border-radius:7px;background:linear-gradient(180deg,var(--c1,' + v.c1 + '),color-mix(in srgb,var(--c1,' + v.c1 + ') 65%,#000))}',
        '.ky .t1,.ky .t2{position:absolute;bottom:-7px;width:7px;height:7px;background:linear-gradient(180deg,var(--c2,' + v.c2 + '),color-mix(in srgb,var(--c2,' + v.c2 + ') 65%,#000))}',
        '.ky .t1{right:8px}.ky .t2{right:18px}',
        kf('tdky-' + v.i, '0%,30%,100%{transform:rotate(0)}45%,55%{transform:rotate(calc(var(--turn,42deg) * -1))}70%{transform:rotate(0)}')
      ]),
      cfg: d3Cfg(v, [range('Turn', '--turn', 20, 90, 2, 42, 'deg')])
    };
  } });

  /* 15. bloom core — petals unfold from the heart */
  TD.push({ key: 'bloom', title: 'Bloom Core', tags: ['3d', 'css'], build: function (v) {
    var petals = '';
    for (var p = 0; p < 6; p++) petals += '<i style="--i:' + p + '"></i>';
    return {
      html: '<div class="wd3"><div class="blm">' + petals + '<b class="crt"></b></div></div>',
      css: join([
        D3S,
        '.blm{position:absolute;left:50%;top:50%;width:0;height:0;transform-style:preserve-3d;transform:rotateX(-16deg)}',
        '.blm i{position:absolute;left:-14px;top:-48px;width:28px;height:48px;border-radius:50% 50% 46% 46%/60% 60% 40% 40%;background:linear-gradient(180deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + ') 80%);transform-origin:50% 100%;opacity:.95;animation:tdbl-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite;animation-delay:calc(var(--i) * .08s)}',
        '.blm i:nth-child(2n){background:linear-gradient(180deg,var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + ') 80%)}',
        kf('tdbl-' + v.i, '0%,100%{transform:rotate(calc(var(--i) * 60deg)) rotateX(calc(var(--open,64deg) * -1))}50%{transform:rotate(calc(var(--i) * 60deg)) rotateX(calc(var(--open,64deg) * -.22))}'),
        '.blm .crt{position:absolute;left:-11px;top:-11px;width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 36% 30%,#fff7,var(--c3,' + v.c3 + ') 68%);box-shadow:0 0 14px -3px var(--c3,' + v.c3 + ')}'
      ]),
      cfg: d3Cfg(v, [range('Open', '--open', 20, 84, 2, 64, 'deg')])
    };
  } });

  /* 16. loop de loop — a paper plane flying its favourite trick */
  TD.push({ key: 'plane', title: 'Loop De Loop', tags: ['3d', 'css'], build: function (v) {
    return {
      html: '<div class="wd3"><div class="loop"><i class="pln"></i></div></div>',
      css: join([
        D3S,
        '.loop{position:absolute;left:50%;top:50%;width:0;height:0;transform-style:preserve-3d;animation:tdlp-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite ' + v.dir + '}',
        '.loop .pln{position:absolute;left:-13px;top:calc(var(--rad,52px) * -1 - 8px);width:26px;height:16px;background:linear-gradient(135deg,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + '));clip-path:polygon(0 20%,100% 50%,0 80%,22% 50%);filter:drop-shadow(0 0 8px color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,transparent))}',
        '.loop::before{content:"";position:absolute;left:-2px;top:calc(var(--rad,52px) * -1);width:4px;height:calc(var(--rad,52px) * 1);background:linear-gradient(0deg,color-mix(in srgb,var(--c3,' + v.c3 + ') 55%,transparent),transparent);transform-origin:0 100%}',
        kf('tdlp-' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: d3Cfg(v, [range('Radius', '--rad', 30, 80, 2, 52, 'px')])
    };
  } });

  K.add('3d', V.matrix('3d', TD, 20, 'w4d3'));

  /* ════════════════════════ MOTION / INTERACTION ════════════════════════ */
  var MO = [];

  var MOS = '.wm4{position:relative;width:var(--w,240px);height:var(--h,150px);border-radius:var(--rad,14px);background:linear-gradient(160deg,#14141f,#0d0d15);border:1px solid rgba(255,255,255,.09);overflow:hidden;user-select:none;touch-action:none}';
  function moCfg(v, extra) {
    return [
      range('Width', '--w', 160, 400, 4, 240, 'px'),
      range('Height', '--h', 100, 260, 2, 150, 'px'),
      range('Corner', '--rad', 0, 40, 1, 14, 'px'),
      col('Colour', '--c1', v.c1),
      col('Colour B', '--c2', v.c2),
      col('Colour C', '--c3', v.c3)
    ].concat(extra || []);
  }

  /* 1. scroll fill bar — scroll the panel, fill the bar */
  MO.push({ key: 'scrollfill', title: 'Scroll Fill Bar', tags: ['motion', 'scroll'], build: function (v) {
    var lines = '';
    for (var p = 0; p < 14; p++) lines += '<p>Section ' + (p + 1) + ' — keep scrolling to fill the bar.</p>';
    return {
      html: '<div class="wm4 sfb2"><i class="barb"><b></b></i><div class="scr">' + lines + '</div></div>',
      css: join([
        MOS,
        '.wm4 .barb{position:absolute;left:0;right:0;top:0;height:5px;background:rgba(255,255,255,.09);z-index:2}',
        '.wm4 .barb b{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));box-shadow:0 0 10px var(--c2,' + v.c2 + ')}',
        '.wm4 .scr{position:absolute;inset:5px 0 0;overflow-y:auto;padding:14px 16px;box-sizing:border-box;overscroll-behavior:contain}',
        '.wm4 .scr p{margin:0 0 14px;font:500 12px/1.5 "Plus Jakarta Sans",system-ui,sans-serif;color:#9a9ab0}'
      ]),
      js: 'var sc=root.querySelector(".scr"),b=root.querySelector(".barb b");\n' +
        'api.raf(function(){var m=sc.scrollHeight-sc.clientHeight,p=m>0?sc.scrollTop/m:0;\n' +
        'b.style.width=(p*100).toFixed(1)+"%";});',
      cfg: moCfg(v, [])
    };
  } });

  /* 2. cursor magnet — the orb cannot stay away */
  MO.push({ key: 'magnet', title: 'Cursor Magnet', tags: ['motion', 'pointer'], build: function (v) {
    return {
      html: '<div class="wm4 mgx"><i class="orb"></i><span class="hint">move your cursor</span></div>',
      css: join([
        MOS,
        '.wm4 .orb{position:absolute;left:calc(50% - var(--d,22px) / 2);top:calc(50% - var(--d,22px) / 2);width:var(--d,22px);height:var(--d,22px);border-radius:50%;background:radial-gradient(circle at 34% 30%,#fff5,var(--c1,' + v.c1 + ') 60%);box-shadow:0 0 18px -3px var(--c1,' + v.c1 + ');will-change:transform}',
        '.wm4 .hint{position:absolute;left:0;right:0;bottom:10px;text-align:center;font:600 10px/1 "JetBrains Mono",monospace;letter-spacing:.14em;text-transform:uppercase;color:#77778f;animation:mnh-' + v.i + ' 2.2s ease-in-out infinite}',
        kf('mnh-' + v.i, '0%,100%{opacity:.4}50%{opacity:1}')
      ]),
      js: 'var bx=root.querySelector(".wm4"),o=root.querySelector(".orb"),tx=0,ty=0,x=0,y=0;\n' +
        'bx.addEventListener("pointermove",function(e){var r=bx.getBoundingClientRect();tx=e.clientX-r.left-r.width/2;ty=e.clientY-r.top-r.height/2;});\n' +
        'api.raf(function(){x+=(tx-x)*.12;y+=(ty-y)*.12;\n' +
        'o.style.transform="translate("+x.toFixed(1)+"px,"+y.toFixed(1)+"px) scale("+(1+Math.min(.3,(Math.abs(tx-x)+Math.abs(ty-y))/300)).toFixed(3)+")";});',
      cfg: moCfg(v, [range('Orb', '--d', 10, 46, 1, 22, 'px')])
    };
  } });

  /* 3. lag chain — a snake of dots chasing the pointer */
  MO.push({ key: 'chain', title: 'Lag Chain', tags: ['motion', 'pointer'], build: function (v) {
    return {
      html: '<div class="wm4 chn">' + cells(6) + '</div>',
      css: join([
        MOS,
        '.wm4.chn i{position:absolute;left:50%;top:50%;width:var(--d,16px);height:var(--d,16px);margin:calc(var(--d,16px) / -2);border-radius:50%;background:var(--c1,' + v.c1 + ');will-change:transform}',
        '.wm4.chn i:nth-child(2){background:var(--c1,' + v.c1 + ');opacity:.9;width:calc(var(--d,16px) * .86);height:calc(var(--d,16px) * .86)}',
        '.wm4.chn i:nth-child(3){background:var(--c2,' + v.c2 + ');width:calc(var(--d,16px) * .72);height:calc(var(--d,16px) * .72)}',
        '.wm4.chn i:nth-child(4){background:var(--c2,' + v.c2 + ');opacity:.85;width:calc(var(--d,16px) * .6);height:calc(var(--d,16px) * .6)}',
        '.wm4.chn i:nth-child(5){background:var(--c3,' + v.c3 + ');width:calc(var(--d,16px) * .46);height:calc(var(--d,16px) * .46)}',
        '.wm4.chn i:nth-child(6){background:var(--c3,' + v.c3 + ');opacity:.7;width:calc(var(--d,16px) * .34);height:calc(var(--d,16px) * .34)}'
      ]),
      js: 'var bx=root.querySelector(".wm4"),D6=root.querySelectorAll("i"),tx=0,ty=0;\n' +
        'var ps=[];for(var i=0;i<D6.length;i++)ps.push({x:0,y:0});\n' +
        'bx.addEventListener("pointermove",function(e){var r=bx.getBoundingClientRect();tx=e.clientX-r.left-r.width/2;ty=e.clientY-r.top-r.height/2;});\n' +
        'api.raf(function(){var lx=tx,ly=ty;\n' +
        'for(var i=0;i<ps.length;i++){var p=ps[i];p.x+=(lx-p.x)*.22;p.y+=(ly-p.y)*.22;lx=p.x;ly=p.y;\n' +
        'D6[i].style.transform="translate("+p.x.toFixed(1)+"px,"+p.y.toFixed(1)+"px)";}});',
      cfg: moCfg(v, [range('Head', '--d', 8, 30, 1, 16, 'px')])
    };
  } });

  /* 4. parallax trio — three layers, three worlds */
  MO.push({ key: 'trio', title: 'Parallax Trio', tags: ['motion', 'pointer'], build: function (v) {
    return {
      html: '<div class="wm4 plx"><i class="L1"></i><i class="L2"></i><i class="L3"></i><b class="core">\u2726</b></div>',
      css: join([
        MOS,
        '.wm4 .L1{position:absolute;inset:-10%;background:radial-gradient(50% 50% at 50% 50%,color-mix(in srgb,var(--c1,' + v.c1 + ') 22%,transparent),transparent 70%)}',
        '.wm4 .L2{position:absolute;inset:18%;border:1.5px dashed color-mix(in srgb,var(--c2,' + v.c2 + ') 60%,transparent);border-radius:50%}',
        '.wm4 .L3{position:absolute;inset:34%;background:conic-gradient(from 0deg,var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));opacity:.25;border-radius:50%;filter:blur(2px)}',
        '.wm4 .core{position:absolute;left:50%;top:50%;width:38px;height:38px;margin:-19px;display:grid;place-items:center;border-radius:50%;background:radial-gradient(circle at 36% 30%,#fff6,var(--c3,' + v.c3 + ') 68%);color:#fff;font-size:16px;box-shadow:0 0 18px -2px var(--c3,' + v.c3 + ')}',
        '.wm4.plx i,.wm4.plx b{will-change:transform}'
      ]),
      js: 'var bx=root.querySelector(".wm4"),L1=root.querySelector(".L1"),L2=root.querySelector(".L2"),L3=root.querySelector(".L3"),C=root.querySelector(".core"),tx=0,ty=0,cx=0,cy=0;\n' +
        'bx.addEventListener("pointermove",function(e){var r=bx.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;});\n' +
        'api.raf(function(){cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;\n' +
        'var X=(cx*100).toFixed(1),Y=(cy*100).toFixed(1);\n' +
        'L1.style.transform="translate("+(cx*-14).toFixed(1)+"px,"+(cy*-10).toFixed(1)+"px)";\n' +
        'L2.style.transform="translate("+(cx*22).toFixed(1)+"px,"+(cy*16).toFixed(1)+"px) rotate("+(cx*10).toFixed(1)+"deg)";\n' +
        'L3.style.transform="translate("+(cx*38).toFixed(1)+"px,"+(cy*26).toFixed(1)+"px) rotate("+(cx*-14).toFixed(1)+"deg)";\n' +
        'C.style.transform="translate("+(cx*54).toFixed(1)+"px,"+(cy*36).toFixed(1)+"px)";});',
      cfg: moCfg(v, [])
    };
  } });

  /* 5. tap ripples — every tap rings the surface */
  MO.push({ key: 'ripples', title: 'Tap Ripples', tags: ['motion', 'pointer'], build: function (v) {
    return {
      html: '<div class="wm4 trp"><span class="hint">click to ripple</span></div>',
      css: join([
        MOS,
        '.wm4 .hint{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);text-align:center;font:600 10px/1 "JetBrains Mono",monospace;letter-spacing:.14em;text-transform:uppercase;color:#77778f;pointer-events:none;animation:mnh2-' + v.i + ' 2.2s ease-in-out infinite}',
        '.wm4 .rp{position:absolute;width:14px;height:14px;margin:-7px;border-radius:50%;border:2px solid var(--c3,' + v.c3 + ');pointer-events:none}',
        kf('mnh2-' + v.i, '0%,100%{opacity:.4}50%{opacity:1}')
      ]),
      js: 'var bx=root.querySelector(".wm4");\n' +
        'bx.addEventListener("pointerdown",function(e){var r=bx.getBoundingClientRect();\n' +
        'var s=document.createElement("i");s.className="rp";s.style.left=(e.clientX-r.left)+"px";s.style.top=(e.clientY-r.top)+"px";bx.appendChild(s);\n' +
        's.animate([{transform:"scale(.4)",opacity:1},{transform:"scale(7.5)",opacity:0}],{duration:760,easing:"cubic-bezier(.2,.6,.3,1)"}).onfinish=function(){s.remove();};});',
      cfg: moCfg(v, [])
    };
  } });

  /* 6. inertia dial — spin it and let physics coast */
  MO.push({ key: 'dial', title: 'Inertia Dial', tags: ['motion', 'drag'], build: function (v) {
    return {
      html: '<div class="wm4 idl"><div class="dl2"><i class="pt"></i><b class="hb"></b></div><span class="lab">drag to spin</span></div>',
      css: join([
        MOS.replace(':none', ':none'),
        '.wm4.idl{display:grid;place-items:center}',
        '.wm4 .dl2{position:relative;width:86px;height:86px;border-radius:50%;background:radial-gradient(circle at 40% 32%,#20202e,#12121c);box-shadow:0 10px 26px rgba(0,0,0,.55),inset 0 0 0 3px color-mix(in srgb,var(--c3,' + v.c3 + ') 40%,transparent);cursor:grab}',
        '.wm4 .dl2:active{cursor:grabbing}',
        '.wm4 .pt{position:absolute;left:calc(50% - 2px);top:9%;width:4px;height:26%;border-radius:99px;background:var(--c2,' + v.c2 + ');box-shadow:0 0 8px var(--c2,' + v.c2 + ');transform-origin:50% 160%}',
        '.wm4 .hb{position:absolute;inset:34%;border-radius:50%;background:linear-gradient(145deg,#1d1d2c,#0e0e16)}',
        '.wm4 .lab{position:absolute;bottom:10px;left:0;right:0;text-align:center;font:600 10px/1 "JetBrains Mono",monospace;letter-spacing:.14em;text-transform:uppercase;color:#77778f}'
      ]),
      js: 'var dl=root.querySelector(".dl2"),a=0,va=1.2,last=null,drag=false;\n' +
        'dl.addEventListener("pointerdown",function(e){drag=true;last=e.clientX;va=0;try{dl.setPointerCapture(e.pointerId);}catch(_){}});\n' +
        'dl.addEventListener("pointermove",function(e){if(!drag||last==null)return;var dx=e.clientX-last;last=e.clientX;a+=dx*.7;va=dx*.7;});\n' +
        'dl.addEventListener("pointerup",function(){drag=false;last=null;});\n' +
        'api.raf(function(){if(!drag){a+=va;va*=.965;}dl.style.transform="rotate("+a.toFixed(1)+"deg)";});',
      cfg: moCfg(v, [])
    };
  } });

  /* 7. cursor tag — a live readout tailing your cursor */
  MO.push({ key: 'tag', title: 'Cursor Tag', tags: ['motion', 'pointer'], build: function (v) {
    return {
      html: '<div class="wm4 ctag"><i class="tg"><b>0, 0</b></i></div>',
      css: join([
        MOS,
        '.wm4 .tg{position:absolute;left:20px;top:20px;padding:6px 9px;border-radius:8px;background:var(--c1,' + v.c1 + ');color:#fff;font:600 11px/1 "JetBrains Mono",monospace;box-shadow:0 8px 20px -8px var(--c1,' + v.c1 + ');will-change:transform}',
        '.wm4 .tg::after{content:"";position:absolute;left:-4px;top:50%;margin-top:-4px;border:4px solid transparent;border-right-color:var(--c1,' + v.c1 + ')}'
      ]),
      js: 'var bx=root.querySelector(".wm4"),tg=root.querySelector(".tg"),tx=20,ty=20,x=20,y=20;\n' +
        'bx.addEventListener("pointermove",function(e){var r=bx.getBoundingClientRect();tx=e.clientX-r.left+10;ty=e.clientY-r.top-14;});\n' +
        'api.raf(function(){x+=(tx-x)*.16;y+=(ty-y)*.16;\n' +
        'tg.style.transform="translate("+x.toFixed(1)+"px,"+y.toFixed(1)+"px)";\n' +
        'tg.firstElementChild.textContent=Math.round(x)+", "+Math.round(y);});',
      cfg: moCfg(v, [])
    };
  } });

  /* 8. brake marquee — the ticker slows to read when you hover */
  MO.push({ key: 'brake', title: 'Brake Marquee', tags: ['motion', 'pointer'], build: function (v) {
    var words = ['motion', 'easing', 'spring', 'inertia', 'physics', 'velocity', 'friction', 'momentum'];
    var row = '';
    for (var r = 0; r < 2; r++) words.forEach(function (w) { row += '<b>' + w + '</b>'; });
    return {
      html: '<div class="wm4 brk"><div class="strip">' + row + '</div></div>',
      css: join([
        MOS,
        '.wm4.brk{display:grid;align-content:center}',
        '.wm4 .strip{display:flex;gap:22px;width:max-content;will-change:transform}',
        '.wm4 .strip b{font:800 22px/1 "Plus Jakarta Sans",system-ui,sans-serif;color:color-mix(in srgb,var(--c2,' + v.c2 + ') 80%,#fff);white-space:nowrap}',
        '.wm4 .strip b:nth-child(3n){color:var(--c3,' + v.c3 + ')}',
        '.wm4 .strip b:nth-child(4n){color:var(--c1,' + v.c1 + ')}'
      ]),
      js: 'var st=root.querySelector(".strip"),bx=root.querySelector(".wm4"),x=0,sp=1.1,half=0;\n' +
        'bx.addEventListener("pointerenter",function(){bx.dataset.h=1;});\n' +
        'bx.addEventListener("pointerleave",function(){bx.dataset.h=0;});\n' +
        'api.raf(function(){half=half||st.scrollWidth/2;var v=bx.dataset.h?sp*.14:sp;x-=v;\n' +
        'if(half&&-x>=half)x+=half;st.style.transform="translateX("+x.toFixed(1)+"px)";});',
      cfg: moCfg(v, [])
    };
  } });

  /* 9. heat grid — the floor remembers where you walked */
  MO.push({ key: 'heat', title: 'Heat Grid', tags: ['motion', 'pointer'], build: function (v) {
    return {
      html: '<div class="wm4 htg">' + cells(48) + '</div>',
      css: join([
        MOS,
        '.wm4.htg{position:relative;display:grid;grid-template-columns:repeat(8,1fr);grid-auto-rows:1fr;gap:2px;padding:2px}',
        '.wm4.htg i{border-radius:3px;background:color-mix(in srgb,var(--c1,' + v.c1 + ') 12%,transparent);transition:background-color .5s,box-shadow .5s}',
        '.wm4.htg i.hot{background:var(--c3,' + v.c3 + ');box-shadow:0 0 12px -2px var(--c3,' + v.c3 + ');transition:none}'
      ]),
      js: 'var bx=root.querySelector(".wm4"),CL=root.querySelectorAll("i"),hs=[];\n' +
        'for(var h=0;h<CL.length;h++)hs.push(0);\n' +
        'bx.addEventListener("pointermove",function(e){var r=bx.getBoundingClientRect();\n' +
        'var cx=Math.floor((e.clientX-r.left)/r.width*8),cy=Math.floor((e.clientY-r.top)/r.height*6);\n' +
        'if(cx>=0&&cx<8&&cy>=0&&cy<6){var k=cy*8+cx;hs[k]=Date.now();\n' +
        'for(var d=0;d<4;d++){var k2=k+[1,-1,8,-8][d];if(k2>=0&&k2<48&&!hs[k2])hs[k2]=Date.now()-220;}}});\n' +
        'api.raf(function(){var n=Date.now();for(var i=0;i<48;i++){var hot=hs[i]&&(n-hs[i]<650);CL[i].classList.toggle("hot",hot);}});',
      cfg: moCfg(v, [])
    };
  } });

  /* 10. scroll reveal rail — items earn their place as you scroll */
  MO.push({ key: 'revealrail', title: 'Scroll Reveal Rail', tags: ['motion', 'scroll'], build: function (v) {
    var items = '';
    for (var p = 0; p < 9; p++) items += '<b class="pl">Row ' + (p + 1) + '</b>';
    return {
      html: '<div class="wm4 rvl"><div class="scr">' + items + '</div></div>',
      css: join([
        MOS,
        '.wm4 .scr{position:absolute;inset:0;overflow-y:auto;padding:14px 16px;box-sizing:border-box;display:grid;gap:10px;align-content:start;overscroll-behavior:contain}',
        '.wm4 .pl{display:block;padding:11px 13px;border-radius:10px;background:color-mix(in srgb,var(--c1,' + v.c1 + ') 18%,#15151f);border:1px solid rgba(255,255,255,.08);font:600 11.5px/1 "Plus Jakarta Sans",system-ui,sans-serif;color:#cfcfe6;opacity:0;transform:translateY(16px) scale(.97);transition:opacity .5s cubic-bezier(.2,.8,.2,1),transform .55s cubic-bezier(.2,.8,.2,1)}',
        '.wm4 .pl.in{opacity:1;transform:none;border-color:color-mix(in srgb,var(--c2,' + v.c2 + ') 45%,transparent)}'
      ]),
      js: 'var sc=root.querySelector(".scr"),IT=root.querySelectorAll(".pl");\n' +
        'api.raf(function(){var sr=sc.getBoundingClientRect();\n' +
        'for(var i=0;i<IT.length;i++){var r=IT[i].getBoundingClientRect();\n' +
        'IT[i].classList.toggle("in",r.top<sr.top+sr.height*.92&&r.bottom>sr.top-8);}});',
      cfg: moCfg(v, [])
    };
  } });

  /* 11. spring chase — a ball on an invisible rubber band */
  MO.push({ key: 'spring', title: 'Spring Chase', tags: ['motion', 'pointer', 'physics'], build: function (v) {
    return {
      html: '<div class="wm4 spc"><i class="ball"></i><span class="hint">tug the spring</span></div>',
      css: join([
        MOS,
        '.wm4 .ball{position:absolute;left:calc(50% - var(--d,20px) / 2);top:calc(50% - var(--d,20px) / 2);width:var(--d,20px);height:var(--d,20px);border-radius:50%;background:radial-gradient(circle at 34% 30%,#fff5,var(--c2,' + v.c2 + ') 62%);box-shadow:0 0 16px -3px var(--c2,' + v.c2 + ');will-change:transform}',
        '.wm4 .hint{position:absolute;left:0;right:0;bottom:10px;text-align:center;font:600 10px/1 "JetBrains Mono",monospace;letter-spacing:.14em;text-transform:uppercase;color:#77778f}'
      ]),
      js: 'var bx=root.querySelector(".wm4"),b=root.querySelector(".ball"),tx=0,ty=0,x=0,y=0,vx=0,vy=0;\n' +
        'bx.addEventListener("pointermove",function(e){var r=bx.getBoundingClientRect();tx=e.clientX-r.left-r.width/2;ty=e.clientY-r.top-r.height/2;});\n' +
        'api.raf(function(){vx+=(tx-x)*.045+0;vy+=(ty-y)*.045;vx*=.9;vy*=.9;x+=vx;y+=vy;\n' +
        'b.style.transform="translate("+x.toFixed(1)+"px,"+y.toFixed(1)+"px) scale("+(1+Math.min(.4,Math.abs(vx)/30)).toFixed(3)+","+(1-Math.min(.3,Math.abs(vx)/44)).toFixed(3)+")";});',
      cfg: moCfg(v, [range('Ball', '--d', 10, 44, 1, 20, 'px')])
    };
  } });

  /* 12. tilt board — the panel leans into your cursor */
  MO.push({ key: 'tilt', title: 'Tilt Board', tags: ['motion', 'pointer'], build: function (v) {
    return {
      html: '<div class="wm4 tlt"><div class="pnl"><b>Balance</b><p>tilt board — pointer steers</p><i class="dot"></i></div></div>',
      css: join([
        MOS,
        '.wm4.tlt{display:grid;place-items:center;perspective:600px}',
        '.wm4 .pnl{position:relative;width:62%;height:64%;display:grid;place-content:center;gap:6px;text-align:center;border-radius:14px;background:linear-gradient(150deg,#1a1a28,#101018);border:1px solid rgba(255,255,255,.12);box-shadow:0 20px 44px -18px rgba(0,0,0,.85);transform-style:preserve-3d;will-change:transform}',
        '.wm4 .pnl b{font:800 17px/1 "Plus Jakarta Sans",system-ui,sans-serif;color:#fff;transform:translateZ(24px)}',
        '.wm4 .pnl p{margin:0;font:500 10px/1.4 "JetBrains Mono",monospace;color:#8b8b9f;transform:translateZ(12px)}',
        '.wm4 .dot{position:absolute;right:10px;top:10px;width:10px;height:10px;border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 10px var(--c3,' + v.c3 + ')}'
      ]),
      js: 'var bx=root.querySelector(".wm4"),pn=root.querySelector(".pnl"),tx=0,ty=0,cx=0,cy=0;\n' +
        'bx.addEventListener("pointermove",function(e){var r=bx.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;});\n' +
        'api.raf(function(){cx+=(tx-cx)*.1;cy+=(ty-cy)*.1;\n' +
        'pn.style.transform="rotateY("+(cx*26).toFixed(2)+"deg) rotateX("+(-cy*22).toFixed(2)+"deg)";});',
      cfg: moCfg(v, [])
    };
  } });

  /* 13. click shake — poke it and it shivers */
  MO.push({ key: 'shake', title: 'Click Shake', tags: ['motion', 'pointer'], build: function (v) {
    return {
      html: '<div class="wm4 shk"><button class="tgt" type="button">Do not poke</button></div>',
      css: join([
        MOS,
        '.wm4.shk{display:grid;place-items:center}',
        '.wm4 .tgt{border:0;cursor:pointer;padding:13px 22px;border-radius:12px;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));color:#fff;font:700 14px/1 "Plus Jakarta Sans",system-ui,sans-serif;box-shadow:0 10px 26px -12px var(--c1,' + v.c1 + ')}'
      ]),
      js: 'var b=root.querySelector(".tgt");\n' +
        'b.addEventListener("click",function(){b.animate([\n' +
        '{transform:"translateX(0) rotate(0)"},{transform:"translateX(-9px) rotate(-2deg)"},{transform:"translateX(8px) rotate(2deg)"},\n' +
        '{transform:"translateX(-6px) rotate(-1.4deg)"},{transform:"translateX(4px) rotate(1deg)"},{transform:"translateX(-2px)"},{transform:"translateX(0) rotate(0)"}\n' +
        '],{duration:520,easing:"ease-out"});});',
      cfg: moCfg(v, [])
    };
  } });

  /* 14. confetti pop — celebrate wherever you click */
  MO.push({ key: 'confpop', title: 'Confetti Pop', tags: ['motion', 'pointer'], build: function (v) {
    return {
      html: '<div class="wm4 cnp"><span class="hint">click to celebrate</span></div>',
      css: join([
        MOS,
        '.wm4 .hint{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);text-align:center;font:600 10px/1 "JetBrains Mono",monospace;letter-spacing:.14em;text-transform:uppercase;color:#77778f;pointer-events:none}',
        '.wm4 .cf{position:absolute;width:var(--cp,7px);height:calc(var(--cp,7px) * 1.5);margin:calc(var(--cp,7px) / -2);border-radius:1.5px;pointer-events:none}'
      ]),
      js: 'var bx=root.querySelector(".wm4"),CL=["' + v.c1 + '","' + v.c2 + '","' + v.c3 + '","#f2f2fa"];\n' +
        'bx.addEventListener("pointerdown",function(e){var r=bx.getBoundingClientRect();\n' +
        'for(var i=0;i<15;i++){var s=document.createElement("i");s.className="cf";s.style.background=CL[i%4];\n' +
        's.style.left=(e.clientX-r.left)+"px";s.style.top=(e.clientY-r.top)+"px";bx.appendChild(s);\n' +
        'var a=Math.random()*6.283,d=28+Math.random()*52,t=640+Math.random()*420;\n' +
        's.animate([{transform:"translate(0,0) rotate(0deg)",opacity:1},\n' +
        '{transform:"translate("+(Math.cos(a)*d).toFixed(1)+"px,"+(Math.sin(a)*d+34).toFixed(1)+"px) rotate("+((Math.random()*720-360)|0)+"deg)",opacity:0}\n' +
        '],{duration:t,easing:"cubic-bezier(.2,.7,.3,1)"}).onfinish=(function(el){return function(){el.remove();};})(s);}});',
      cfg: moCfg(v, [range('Piece', '--cp', 4, 14, 1, 7, 'px')])
    };
  } });

  /* 15. drag strip — a film strip you can throw */
  MO.push({ key: 'strip', title: 'Drag Strip', tags: ['motion', 'drag'], build: function (v) {
    var fr = '';
    for (var f = 1; f <= 7; f++) fr += '<b>' + f + '</b>';
    return {
      html: '<div class="wm4 dst"><div class="rail">' + fr + '</div></div>',
      css: join([
        MOS,
        '.wm4.dst{display:grid;align-content:center}',
        '.wm4 .rail{display:flex;gap:10px;padding:0 16px;width:max-content;will-change:transform}',
        '.wm4 .rail b{display:grid;place-items:center;width:var(--card,64px);height:calc(var(--card,64px) * 1.3);border-radius:10px;background:linear-gradient(150deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 30%,#1b1b28),#12121c);border:1px solid rgba(255,255,255,.12);font:800 20px/1 "Plus Jakarta Sans",system-ui,sans-serif;color:var(--c2,' + v.c2 + ')}',
        '.wm4 .rail b:nth-child(2n){color:var(--c3,' + v.c3 + ')}'
      ]),
      js: 'var rl=root.querySelector(".rail"),bx=root.querySelector(".wm4"),x=0,vx=0,last=null,drag=false,min=0;\n' +
        'bx.addEventListener("pointerdown",function(e){drag=true;last=e.clientX;vx=0;try{bx.setPointerCapture(e.pointerId);}catch(_){}});\n' +
        'bx.addEventListener("pointermove",function(e){if(!drag||last==null)return;var dx=e.clientX-last;last=e.clientX;x+=dx;vx=dx;});\n' +
        'bx.addEventListener("pointerup",function(){drag=false;last=null;});\n' +
        'api.raf(function(){min=Math.min(0,bx.clientWidth-rl.scrollWidth-16);\n' +
        'if(!drag){x+=vx;vx*=.94;if(x>0){x+= (0-x)*.16;vx=0;}if(x<min){x+=(min-x)*.16;vx=0;}}\n' +
        'if(x>0)x=Math.min(60,x);if(x<min)x=Math.max(min-60,x);\n' +
        'rl.style.transform="translateX("+x.toFixed(1)+"px)";});',
      cfg: moCfg(v, [range('Frame', '--card', 44, 110, 2, 64, 'px')])
    };
  } });

  /* 16. spotlight type — the cursor carries the only lantern */
  MO.push({ key: 'lantern', title: 'Spotlight Type', tags: ['motion', 'pointer'], build: function (v) {
    return {
      html: '<div class="wm4 lnt"><b class="dim">HIDDEN</b><b class="lit">HIDDEN</b></div>',
      css: join([
        MOS,
        '.wm4.lnt{display:grid;place-items:center}',
        '.wm4.lnt b{grid-area:1/1;font:900 var(--fs,44px)/1 "Plus Jakarta Sans",system-ui,sans-serif;letter-spacing:.04em}',
        '.wm4.lnt .dim{color:rgba(255,255,255,.12)}',
        '.wm4.lnt .lit{color:transparent;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));-webkit-background-clip:text;background-clip:text;-webkit-mask:radial-gradient(circle var(--beam,64px) at var(--mx,50%) var(--my,50%),#000 30%,transparent 72%);mask:radial-gradient(circle var(--beam,64px) at var(--mx,50%) var(--my,50%),#000 30%,transparent 72%)}'
      ]),
      js: 'var bx=root.querySelector(".wm4"),lit=root.querySelector(".lit"),tx=120,ty=75,x=120,y=75;\n' +
        'bx.addEventListener("pointermove",function(e){var r=bx.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top;});\n' +
        'api.raf(function(){x+=(tx-x)*.2;y+=(ty-y)*.2;\n' +
        'lit.style.setProperty("--mx",x.toFixed(1)+"px");lit.style.setProperty("--my",y.toFixed(1)+"px");});',
      cfg: moCfg(v, [range('Beam', '--beam', 30, 140, 2, 64, 'px'), range('Font', '--fs', 24, 90, 1, 44, 'px')])
    };
  } });

  K.add('motion', V.matrix('motion', MO, 20, 'w4mo'));
})(window);
