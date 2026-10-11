/* ============================================================
   Motion Lab — wave 5, DATA (the 1,000-effect expansion)
   21 new mechanic families × 24 variants = 504 candidates.
   Every mechanic is a distinct chart/dashboard behavior new
   to the collection; variants differ in geometry, rhythm,
   easing and palette. House rule: custom properties are only
   ever read with a fallback, never declared in demo CSS.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit, V = global.MLVary;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color, cells = K.cells;

  function D(v, mul) { return Math.round(v.dur * (mul || 1) * 100) / 100; }
  function core(v, extra) {
    return [
      range('Cycle', '--dur', .2, 20, .05, D(v, 1), 's'),
      range('Stagger', '--step', 0, .6, .01, v.step, 's'),
      col('Data A', '--c1', v.c1),
      col('Data B', '--c2', v.c2),
      col('Data C', '--c3', v.c3)
    ].concat(extra || []);
  }
  function stageCss(v) {
    return '.dt5{position:relative;width:100%;display:flex;align-items:center;justify-content:center;padding:10px}.dt5 .panel{width:var(--w,240px);padding:12px 14px;background:rgba(10,10,18,.85);border-radius:12px;border:1px solid rgba(255,255,255,.08);box-shadow:0 14px 30px -18px rgba(0,0,0,.9)}';
  }

  var M = [];

  /* 1. bar race — the columns claim their heights in relay order */
  M.push({ key: 'barrace', title: 'Bar Race', tags: ['data', 'bars'], build: function (v) {
    var d = D(v, 3.2), hs = [62, 88, 40, 74, 52, 96, 30], bars = '';
    for (var i = 0; i < hs.length; i++) bars += '<i style="--i:' + i + ';--h:' + hs[i] + '%"></i>';
    return {
      html: '<div class="dt5"><div class="panel"><div class="br">' + bars + '</div></div></div>',
      css: join([
        stageCss(v),
        '.br{display:flex;align-items:flex-end;gap:7px;height:110px}',
        '.br i{flex:1;height:var(--h,50%);border-radius:4px 4px 0 0;background:linear-gradient(180deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform-origin:50% 100%;animation:br-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.3,1.4,.4,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -1)}',
        kf('br-a' + v.i, '0%,8%{transform:scaleY(.04)}30%,82%{transform:scaleY(1)}94%,100%{transform:scaleY(.04)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 320, 2, 240, 'px')])
    };
  } });

  /* 2. ribbon flow — the stacked ribbon re-balances its shares */
  M.push({ key: 'ribbonflow', title: 'Ribbon Flow', tags: ['data', 'stack'], build: function (v) {
    var d = D(v, 4);
    return {
      html: '<div class="dt5"><div class="panel"><div class="rb"><i class="s1"></i><i class="s2"></i><i class="s3"></i><i class="s4"></i></div></div></div>',
      css: join([
        stageCss(v),
        '.rb{display:flex;width:100%;height:96px;border-radius:8px;overflow:hidden}',
        '.rb i{height:100%;transition:width .4s}',
        '.s1{background:var(--c1,' + v.c1 + ');animation:rb-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.s2{background:var(--c2,' + v.c2 + ');animation:rb-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.s3{background:var(--c3,' + v.c3 + ');animation:rb-c' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.s4{background:rgba(255,255,255,.16);animation:rb-d' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('rb-a' + v.i, '0%,100%{width:34%}50%{width:18%}'),
        kf('rb-b' + v.i, '0%,100%{width:26%}50%{width:44%}'),
        kf('rb-c' + v.i, '0%,100%{width:22%}50%{width:14%}'),
        kf('rb-d' + v.i, '0%,100%{width:18%}50%{width:24%}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 320, 2, 240, 'px')])
    };
  } });

  /* 3. gantt build — the project bars grow one after another */
  M.push({ key: 'gantt', title: 'Gantt Build', tags: ['data', 'schedule'], build: function (v) {
    var d = D(v, 4), rows = [
      [0, 40], [10, 30], [25, 45], [40, 25], [55, 35], [15, 20]
    ], out = '';
    for (var i = 0; i < rows.length; i++) out += '<div class="gr"><i style="--o:' + rows[i][0] + '%;--w:' + rows[i][1] + '%;--i:' + i + '"></i></div>';
    return {
      html: '<div class="dt5"><div class="panel"><div class="gt">' + out + '</div></div></div>',
      css: join([
        stageCss(v),
        '.gt{display:flex;flex-direction:column;gap:6px}',
        '.gr{position:relative;height:12px;background:rgba(255,255,255,.05);border-radius:99px}',
        '.gr i{position:absolute;top:2px;bottom:2px;left:var(--o,0%);width:var(--w,30%);border-radius:99px;background:linear-gradient(90deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform-origin:0 50%;animation:gt-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -1)}',
        kf('gt-a' + v.i, '0%{transform:scaleX(0)}35%,84%{transform:scaleX(1)}96%,100%{transform:scaleX(0)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 320, 2, 240, 'px')])
    };
  } });

  /* 4. box plot — the distribution boxes breathe and their medians flash */
  M.push({ key: 'boxplot', title: 'Box Plot Pulse', tags: ['data', 'stats'], build: function (v) {
    var d = D(v, 3), out = '', i;
    var specs = [[20, 34, 30], [38, 26, 50], [14, 44, 60], [44, 22, 40]];
    for (i = 0; i < specs.length; i++) out += '<div class="bx"><i class="ws" style="--w:' + (specs[i][0] + specs[i][1] + 16) + '%;--o:' + (specs[i][0] - 8) + '%"></i><i class="bx2" style="--w:' + specs[i][1] + '%;--o:' + specs[i][0] + '%;--i:' + i + '"></i><i class="md" style="--o:' + specs[i][2] + '%"></i></div>';
    return {
      html: '<div class="dt5"><div class="panel"><div class="bp">' + out + '</div></div></div>',
      css: join([
        stageCss(v),
        '.bp{display:flex;flex-direction:column;gap:14px}',
        '.bx{position:relative;height:18px}',
        '.bx .ws{position:absolute;top:50%;left:var(--o,0%);width:var(--w,50%);height:2px;margin-top:-1px;background:rgba(255,255,255,.3)}',
        '.bx .bx2{position:absolute;top:0;bottom:0;left:var(--o,0%);width:var(--w,30%);border-radius:5px;background:color-mix(in srgb,var(--c1,' + v.c1 + ') 45%,transparent);border:1.5px solid var(--c1,' + v.c1 + ');transform-origin:50% 50%;animation:bp-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -4)}',
        '.bx .md{position:absolute;top:-3px;bottom:-3px;left:var(--o,50%);width:2.5px;background:var(--c3,' + v.c3 + ');animation:bp-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -4)}',
        kf('bp-a' + v.i, '0%,100%{transform:scaleX(1);opacity:.85}50%{transform:scaleX(1.25);opacity:1}'),
        kf('bp-b' + v.i, '0%,100%{opacity:.7}50%{opacity:1;box-shadow:0 0 10px var(--c3,' + v.c3 + ')}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 320, 2, 240, 'px')])
    };
  } });

  /* 5. calendar heat — the week grid lights up like a contribution map */
  M.push({ key: 'calheat', title: 'Calendar Heat', tags: ['data', 'heatmap'], build: function (v) {
    var d = D(v, 3.4), out = '';
    for (var i = 0; i < 35; i++) out += '<i style="--dl:' + (i % 7 + Math.floor(i / 7)) + '"></i>';
    return {
      html: '<div class="dt5"><div class="panel"><div class="ch">' + out + '</div></div></div>',
      css: join([
        stageCss(v),
        '.ch{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}',
        '.ch i{width:var(--cw,16px);height:var(--cw,16px);border-radius:4px;background:color-mix(in srgb,var(--c1,' + v.c1 + ') 14%,transparent);animation:ch-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--dl,0) * var(--step,' + v.step + 's) * -1.4)}',
        kf('ch-a' + v.i, '0%,100%{background:color-mix(in srgb,var(--c1,' + v.c1 + ') 14%,transparent)}45%{background:var(--c1,' + v.c1 + ');box-shadow:0 0 8px color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent)}')
      ]),
      cfg: core(v, [range('Cell', '--cw', 10, 24, 1, 16, 'px')])
    };
  } });

  /* 6. pictogram — the icon columns count up in turns */
  M.push({ key: 'picto', title: 'Pictogram Fill', tags: ['data', 'pictogram'], build: function (v) {
    var d = D(v, 3.6), out = '';
    var cols = [4, 6, 3, 7];
    for (var c = 0; c < cols.length; c++) {
      var colH = '';
      for (var r = 0; r < 7; r++) colH += '<i style="--i:' + (r + c * 7) + '"></i>';
      out += '<div class="pc">' + colH + '</div>';
    }
    return {
      html: '<div class="dt5"><div class="panel"><div class="pg">' + out + '</div></div></div>',
      css: join([
        stageCss(v),
        '.pg{display:flex;gap:12px;align-items:flex-end}',
        '.pc{display:flex;flex-direction:column-reverse;gap:4px}',
        '.pc i{width:var(--ic,18px);height:var(--ic,18px);border-radius:50%;background:var(--c2,' + v.c2 + ');opacity:.22;animation:pg-a' + v.i + ' var(--dur,' + d + 's) steps(1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -.6)}',
        kf('pg-a' + v.i, '0%,10%{opacity:.22}18%,80%{opacity:1;background:var(--c1,' + v.c1 + ')}88%,100%{opacity:.22;background:var(--c2,' + v.c2 + ')}')
      ]),
      cfg: core(v, [range('Icon', '--ic', 10, 26, 2, 18, 'px')])
    };
  } });

  /* 7. line race — the series line draws itself across the panel */
  M.push({ key: 'linerace', title: 'Line Race', tags: ['data', 'line'], build: function (v) {
    var d = D(v, 3.4);
    return {
      html: '<div class="dt5"><div class="panel"><svg viewBox="0 0 220 100" fill="none" class="lr"><path class="grid" d="M0 25 H220 M0 50 H220 M0 75 H220" opacity=".15"/><path class="ln" d="M6 78 L44 52 L82 64 L120 30 L158 44 L196 12 L214 20"/><circle class="pt1" cx="44" cy="52" r="3.4"/><circle class="pt2" cx="120" cy="30" r="3.4"/><circle class="pt3" cx="196" cy="12" r="3.4"/></svg></div></div>',
      css: join([
        stageCss(v),
        '.lr{width:100%;height:auto;display:block}',
        '.lr .ln{stroke:var(--c1,' + v.c1 + ');stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:240;stroke-dashoffset:240;animation:lr-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.lr .pt1,.lr .pt2,.lr .pt3{fill:var(--c3,' + v.c3 + ');opacity:0;animation:lr-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.lr .pt2{animation-delay:calc(var(--dur,' + d + 's) / -2)}',
        '.lr .pt3{animation-delay:calc(var(--dur,' + d + 's) / -1)}',
        kf('lr-a' + v.i, '0%{stroke-dashoffset:240;opacity:1}55%{stroke-dashoffset:0;opacity:1}82%{stroke-dashoffset:0;opacity:1}94%,100%{stroke-dashoffset:0;opacity:0}'),
        kf('lr-b' + v.i, '0%,30%{opacity:0;transform:scale(.4)}40%,80%{opacity:1;transform:scale(1)}92%,100%{opacity:0;transform:scale(.4)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 320, 2, 240, 'px')])
    };
  } });

  /* 8. sunburst — the rings rotate at offset speeds */
  M.push({ key: 'sunburst', title: 'Sunburst', tags: ['data', 'arc'], build: function (v) {
    var d = D(v, 5);
    return {
      html: '<div class="dt5"><div class="panel"><svg viewBox="0 0 120 120" fill="none" class="sb3"><g class="r1"><circle cx="60" cy="60" r="50" stroke-dasharray="70 22"/></g><g class="r2"><circle cx="60" cy="60" r="36" stroke-dasharray="40 18"/></g><g class="r3"><circle cx="60" cy="60" r="23" stroke-dasharray="26 12"/></g><circle class="hub" cx="60" cy="60" r="9"/></svg></div></div>',
      css: join([
        stageCss(v),
        '.sb3{width:var(--sz,150px);height:var(--sz,150px)}',
        '.sb3 .r1 circle{stroke:var(--c1,' + v.c1 + ');stroke-width:9;stroke-linecap:round}',
        '.sb3 .r2 circle{stroke:var(--c2,' + v.c2 + ');stroke-width:9;stroke-linecap:round}',
        '.sb3 .r3 circle{stroke:var(--c3,' + v.c3 + ');stroke-width:9;stroke-linecap:round}',
        '.sb3 .hub{fill:rgba(255,255,255,.16)}',
        '.sb3 .r1{transform-origin:60px 60px;animation:sb3-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.sb3 .r2{transform-origin:60px 60px;animation:sb3-b' + v.i + ' calc(var(--dur,' + d + 's)/2) linear infinite}',
        '.sb3 .r3{transform-origin:60px 60px;animation:sb3-c' + v.i + ' calc(var(--dur,' + d + 's)/3) linear infinite}',
        kf('sb3-a' + v.i, 'to{transform:rotate(1turn)}'),
        kf('sb3-b' + v.i, 'to{transform:rotate(-1turn)}'),
        kf('sb3-c' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 100, 220, 2, 150, 'px')])
    };
  } });

  /* 9. dumbbell — the pairs stretch to compare two values */
  M.push({ key: 'dumbbell', title: 'Dumbbell Stretch', tags: ['data', 'compare'], build: function (v) {
    var d = D(v, 3.2), out = '', rows = [
      [18, 62], [40, 78], [10, 50], [55, 88]
    ];
    for (var i = 0; i < rows.length; i++) out += '<div class="db" style="--i:' + i + '"><i class="bar" style="--l:' + rows[i][0] + '%;--w:' + (rows[i][1] - rows[i][0]) + '%"></i><b class="p1" style="--x:' + rows[i][0] + '%"></b><b class="p2" style="--x:' + rows[i][1] + '%"></b></div>';
    return {
      html: '<div class="dt5"><div class="panel"><div class="dbp">' + out + '</div></div></div>',
      css: join([
        stageCss(v),
        '.dbp{display:flex;flex-direction:column;gap:14px}',
        '.db{position:relative;height:10px}',
        '.db .bar{position:absolute;top:3px;left:var(--l,10%);width:var(--w,40%);height:4px;border-radius:99px;background:rgba(255,255,255,.28);transform-origin:0 50%;animation:db-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -4)}',
        '.db b{position:absolute;top:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;animation:db-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -4)}',
        '.db .p1{left:var(--x,10%);background:var(--c1,' + v.c1 + ')}',
        '.db .p2{left:var(--x,50%);background:var(--c2,' + v.c2 + ')}',
        kf('db-a' + v.i, '0%,8%{transform:scaleX(0)}30%,84%{transform:scaleX(1)}96%,100%{transform:scaleX(0)}'),
        kf('db-b' + v.i, '0%,8%{transform:scale(.5);opacity:.5}30%,84%{transform:scale(1);opacity:1}96%,100%{transform:scale(.5);opacity:.5}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 320, 2, 240, 'px')])
    };
  } });

  /* 10. slope graph — the connectors re-slope as the values trade */
  M.push({ key: 'slopegraph', title: 'Slope Trade', tags: ['data', 'slope'], build: function (v) {
    var d = D(v, 3.6);
    return {
      html: '<div class="dt5"><div class="panel"><div class="sg"><b class="d l1"></b><b class="d l2"></b><b class="d l3"></b><b class="d r1"></b><b class="d r2"></b><b class="d r3"></b><i class="ln s1"></i><i class="ln s2"></i><i class="ln s3"></i></div></div></div>',
      css: join([
        stageCss(v),
        '.sg{position:relative;width:100%;height:110px}',
        '.sg .d{position:absolute;width:13px;height:13px;border-radius:50%}',
        '.sg .l1{left:6px;top:16px;background:var(--c1,' + v.c1 + ')}',
        '.sg .l2{left:6px;top:54px;background:var(--c2,' + v.c2 + ')}',
        '.sg .l3{left:6px;top:92px;background:var(--c3,' + v.c3 + ')}',
        '.sg .r1{right:6px;top:92px;background:var(--c1,' + v.c1 + ');animation:sg-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.sg .r2{right:6px;top:16px;background:var(--c2,' + v.c2 + ');animation:sg-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.sg .r3{right:6px;top:54px;background:var(--c3,' + v.c3 + ');animation:sg-c' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.sg .ln{position:absolute;left:12px;top:22px;width:calc(100% - 24px);height:2px;background:linear-gradient(90deg,var(--c1,' + v.c1 + '),rgba(255,255,255,.2))}',
        '.sg .s2{top:60px;background:linear-gradient(90deg,var(--c2,' + v.c2 + '),rgba(255,255,255,.2))}',
        '.sg .s3{top:98px;background:linear-gradient(90deg,var(--c3,' + v.c3 + '),rgba(255,255,255,.2))}',
        '.sg .s1{transform-origin:0 50%;animation:sg-d' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.sg .s2{transform-origin:0 50%;animation:sg-e' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.sg .s3{transform-origin:0 50%;animation:sg-f' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('sg-a' + v.i, '0%,100%{top:92px}50%{top:16px}'),
        kf('sg-b' + v.i, '0%,100%{top:16px}50%{top:92px}'),
        kf('sg-c' + v.i, '0%,100%{top:54px}50%{top:54px}'),
        kf('sg-d' + v.i, '0%,100%{transform:rotate(54deg)}50%{transform:rotate(-54deg)}'),
        kf('sg-e' + v.i, '0%,100%{transform:rotate(-54deg)}50%{transform:rotate(54deg)}'),
        kf('sg-f' + v.i, '0%,100%{transform:rotate(0);opacity:.5}50%{transform:rotate(0);opacity:1}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 320, 2, 240, 'px')])
    };
  } });

  /* 11. histogram — the bins swell in a travelling phase */
  M.push({ key: 'histogram', title: 'Histogram Breathe', tags: ['data', 'bins'], build: function (v) {
    var d = D(v, 2.6), hs = [30, 55, 80, 95, 80, 55, 30, 48, 68], bars = '';
    for (var i = 0; i < hs.length; i++) bars += '<i style="--i:' + i + ';--h:' + hs[i] + '%"></i>';
    return {
      html: '<div class="dt5"><div class="panel"><div class="hg">' + bars + '</div></div></div>',
      css: join([
        stageCss(v),
        '.hg{display:flex;align-items:flex-end;gap:5px;height:110px}',
        '.hg i{flex:1;height:var(--h,50%);border-radius:3px;background:var(--c2,' + v.c2 + ');transform-origin:50% 100%;animation:hg-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -9)}',
        kf('hg-a' + v.i, '0%,100%{transform:scaleY(1);background:var(--c2,' + v.c2 + ')}50%{transform:scaleY(1.35);background:var(--c1,' + v.c1 + ')}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 320, 2, 240, 'px')])
    };
  } });

  /* 12. ticker tape — the tape scrolls and the movers flash */
  M.push({ key: 'tickertape', title: 'Ticker Tape', tags: ['data', 'ticker'], build: function (v) {
    var d = D(v, 5);
    return {
      html: '<div class="dt5"><div class="panel"><div class="tk"><div class="tape">' + '<b class="up">▲ 2.4%</b><b class="dn">▼ 1.1%</b><b class="up">▲ 5.2%</b><b class="dn">▼ 0.6%</b><b class="up">▲ 3.8%</b><b class="flat">● 0.0%</b><b class="up">▲ 2.4%</b><b class="dn">▼ 1.1%</b><b class="up">▲ 5.2%</b><b class="dn">▼ 0.6%</b><b class="up">▲ 3.8%</b><b class="flat">● 0.0%</b>' + '</div></div></div></div>',
      css: join([
        stageCss(v),
        '.tk{width:100%;overflow:hidden;white-space:nowrap}',
        '.tape{display:inline-block;animation:tk-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.tape b{display:inline-block;margin:0 10px;font:700 13px ui-monospace,monospace}',
        '.tape .up{color:var(--c1,' + v.c1 + ');animation:tk-b' + v.i + ' calc(var(--dur,' + d + 's)/6) ease-in-out infinite}',
        '.tape .dn{color:var(--c2,' + v.c2 + ');animation:tk-c' + v.i + ' calc(var(--dur,' + d + 's)/6) ease-in-out infinite}',
        '.tape .flat{color:rgba(220,220,240,.55)}',
        kf('tk-a' + v.i, 'to{transform:translateX(-50%)}'),
        kf('tk-b' + v.i, '0%,100%{opacity:1}50%{opacity:.55}'),
        kf('tk-c' + v.i, '0%,100%{opacity:.55}50%{opacity:1}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 320, 2, 240, 'px')])
    };
  } });

  /* 13. alert line — the flatline spikes on the alarm */
  M.push({ key: 'alertline', title: 'Alert Line', tags: ['data', 'line'], build: function (v) {
    var d = D(v, 2.4);
    return {
      html: '<div class="dt5"><div class="panel"><svg viewBox="0 0 220 80" fill="none" class="al"><path class="base" d="M0 40 H220" opacity=".18"/><path class="spk" d="M0 40 H70 L82 12 L94 66 L106 40 H220"/></svg></div></div>',
      css: join([
        stageCss(v),
        '.al{width:100%;height:auto;display:block}',
        '.al .spk{stroke:var(--c3,' + v.c3 + ');stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:260;stroke-dashoffset:260;animation:al-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('al-a' + v.i, '0%{stroke-dashoffset:260;opacity:1}60%{stroke-dashoffset:0;opacity:1}85%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 320, 2, 240, 'px')])
    };
  } });

  /* 14. multi ring — the progress rings fill one after the other */
  M.push({ key: 'multiring', title: 'Multi Ring', tags: ['data', 'progress'], build: function (v) {
    var d = D(v, 3.6);
    return {
      html: '<div class="dt5"><div class="panel"><svg viewBox="0 0 120 120" fill="none" class="mr"><circle class="tk" cx="60" cy="60" r="48" opacity=".12"/><circle class="tk" cx="60" cy="60" r="34" opacity=".12"/><circle class="tk" cx="60" cy="60" r="20" opacity=".12"/><circle class="r1" cx="60" cy="60" r="48"/><circle class="r2" cx="60" cy="60" r="34"/><circle class="r3" cx="60" cy="60" r="20"/></svg></div></div>',
      css: join([
        stageCss(v),
        '.mr{width:var(--sz,150px);height:var(--sz,150px)}',
        '.mr .tk{fill:none;stroke:rgba(255,255,255,.3);stroke-width:7}',
        '.mr .r1,.mr .r2,.mr .r3{fill:none;stroke-width:7;stroke-linecap:round;transform:rotate(-90deg);transform-origin:60px 60px}',
        '.mr .r1{stroke:var(--c1,' + v.c1 + ');stroke-dasharray:302;stroke-dashoffset:302;animation:mr-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.mr .r2{stroke:var(--c2,' + v.c2 + ');stroke-dasharray:214;stroke-dashoffset:214;animation:mr-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.mr .r3{stroke:var(--c3,' + v.c3 + ');stroke-dasharray:126;stroke-dashoffset:126;animation:mr-c' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('mr-a' + v.i, '0%{stroke-dashoffset:302}45%{stroke-dashoffset:60}80%{stroke-dashoffset:60}100%{stroke-dashoffset:302}'),
        kf('mr-b' + v.i, '0%,10%{stroke-dashoffset:214}55%{stroke-dashoffset:43}80%{stroke-dashoffset:43}100%{stroke-dashoffset:214}'),
        kf('mr-c' + v.i, '0%,20%{stroke-dashoffset:126}65%{stroke-dashoffset:13}80%{stroke-dashoffset:13}100%{stroke-dashoffset:126}')
      ]),
      cfg: core(v, [range('Size', '--sz', 100, 220, 2, 150, 'px')])
    };
  } });

  /* 15. bubble chart — the bubbles grow, drift, and trade size */
  M.push({ key: 'bubblechart', title: 'Bubble Trade', tags: ['data', 'scatter'], build: function (v) {
    var d = D(v, 3.4);
    return {
      html: '<div class="dt5"><div class="panel"><svg viewBox="0 0 220 110" fill="none" class="bc3"><circle class="b1" cx="60" cy="60" r="26"/><circle class="b2" cx="120" cy="42" r="18"/><circle class="b3" cx="168" cy="72" r="30"/><circle class="b4" cx="140" cy="92" r="12"/></svg></div></div>',
      css: join([
        stageCss(v),
        '.bc3{width:100%;height:auto;display:block}',
        '.bc3 circle{transform-box:fill-box;transform-origin:center}',
        '.bc3 .b1{fill:color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent);stroke:var(--c1,' + v.c1 + ');animation:bc3-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.bc3 .b2{fill:color-mix(in srgb,var(--c2,' + v.c2 + ') 55%,transparent);stroke:var(--c2,' + v.c2 + ');animation:bc3-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.bc3 .b3{fill:color-mix(in srgb,var(--c3,' + v.c3 + ') 55%,transparent);stroke:var(--c3,' + v.c3 + ');animation:bc3-c' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.bc3 .b4{fill:color-mix(in srgb,var(--c1,' + v.c1 + ') 35%,transparent);stroke:var(--c1,' + v.c1 + ');animation:bc3-d' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('bc3-a' + v.i, '0%,100%{transform:scale(1)}50%{transform:scale(1.3) translate(4px,-6px)}'),
        kf('bc3-b' + v.i, '0%,100%{transform:scale(1.25)}50%{transform:scale(.8) translate(-3px,4px)}'),
        kf('bc3-c' + v.i, '0%,100%{transform:scale(.9)}50%{transform:scale(1.25) translate(-4px,-3px)}'),
        kf('bc3-d' + v.i, '0%,100%{transform:scale(1)}50%{transform:scale(1.5) translate(2px,-4px)}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 320, 2, 240, 'px')])
    };
  } });

  /* 16. waffle — the waffle fills cell by cell, then pours out */
  M.push({ key: 'waffle', title: 'Waffle Fill', tags: ['data', 'waffle'], build: function (v) {
    var d = D(v, 4), out = '';
    for (var i = 0; i < 50; i++) out += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="dt5"><div class="panel"><div class="wf">' + out + '</div></div></div>',
      css: join([
        stageCss(v),
        '.wf{display:grid;grid-template-columns:repeat(10,1fr);gap:3px}',
        '.wf i{width:var(--cw,12px);height:var(--cw,12px);border-radius:3px;background:rgba(255,255,255,.08);animation:wf-a' + v.i + ' var(--dur,' + d + 's) steps(1) infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -50)}',
        kf('wf-a' + v.i, '0%,6%{background:rgba(255,255,255,.08)}12%,78%{background:var(--c1,' + v.c1 + ')}86%,100%{background:rgba(255,255,255,.08)}')
      ]),
      cfg: core(v, [range('Cell', '--cw', 8, 18, 1, 12, 'px')])
    };
  } });

  /* 17. bar + line combo — the bars hold while the trend line races over them */
  M.push({ key: 'barline', title: 'Bar Line Combo', tags: ['data', 'combo'], build: function (v) {
    var d = D(v, 3.4), hs = [40, 66, 48, 80, 58, 72], bars = '';
    for (var i = 0; i < hs.length; i++) bars += '<i style="--i:' + i + ';--h:' + hs[i] + '%"></i>';
    return {
      html: '<div class="dt5"><div class="panel"><div class="blc"><div class="bars">' + bars + '</div><svg viewBox="0 0 220 110" fill="none" class="ov"><path class="ln" d="M18 74 L55 48 L92 62 L129 30 L166 44 L202 22"/></svg></div></div></div>',
      css: join([
        stageCss(v),
        '.blc{position:relative;width:100%;height:110px}',
        '.bars{position:absolute;inset:0;display:flex;align-items:flex-end;gap:8px;padding:0 4px}',
        '.bars i{flex:1;height:var(--h,50%);border-radius:3px 3px 0 0;background:color-mix(in srgb,var(--c2,' + v.c2 + ') 45%,transparent);border:1px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,transparent);transform-origin:50% 100%;animation:blc-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -6)}',
        '.ov{position:absolute;inset:0;width:100%;height:100%}',
        '.ov .ln{stroke:var(--c1,' + v.c1 + ');stroke-width:2.5;stroke-linecap:round;stroke-dasharray:220;stroke-dashoffset:220;animation:blc-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('blc-a' + v.i, '0%,10%{transform:scaleY(.05)}35%,85%{transform:scaleY(1)}100%{transform:scaleY(.05)}'),
        kf('blc-b' + v.i, '0%,12%{stroke-dashoffset:220;opacity:0}20%{opacity:1}60%{stroke-dashoffset:0}85%{stroke-dashoffset:0;opacity:1}96%,100%{stroke-dashoffset:0;opacity:0}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 320, 2, 240, 'px')])
    };
  } });

  /* 18. ring farm — the grid of mini gauges fills in a travelling wave */
  M.push({ key: 'ringfarm', title: 'Ring Farm', tags: ['data', 'progress'], build: function (v) {
    var d = D(v, 2.8), out = '';
    for (var i = 0; i < 12; i++) out += '<span style="--dl:' + (i % 4 + Math.floor(i / 4)) + '"><svg viewBox="0 0 40 40"><circle class="tk" cx="20" cy="20" r="15"/><circle class="fg" cx="20" cy="20" r="15"/></svg></span>';
    return {
      html: '<div class="dt5"><div class="panel"><div class="rf">' + out + '</div></div></div>',
      css: join([
        stageCss(v),
        '.rf{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}',
        '.rf span{width:var(--sz,38px)}',
        '.rf svg{width:100%;height:auto;display:block}',
        '.rf .tk{fill:none;stroke:rgba(255,255,255,.14);stroke-width:5}',
        '.rf .fg{fill:none;stroke:var(--c1,' + v.c1 + ');stroke-width:5;stroke-linecap:round;stroke-dasharray:94;stroke-dashoffset:94;transform:rotate(-90deg);transform-origin:20px 20px;animation:rf-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--dl,0) * var(--step,' + v.step + 's) * -1.2)}',
        kf('rf-a' + v.i, '0%,8%{stroke-dashoffset:94}50%,82%{stroke-dashoffset:12}94%,100%{stroke-dashoffset:94}')
      ]),
      cfg: core(v, [range('Gauge size', '--sz', 26, 52, 2, 38, 'px')])
    };
  } });

  /* 19. pareto — the descending bars and the cumulative line build together */
  M.push({ key: 'pareto', title: 'Pareto Build', tags: ['data', 'pareto'], build: function (v) {
    var d = D(v, 3.8), hs = [92, 68, 46, 30, 18, 9], bars = '';
    for (var i = 0; i < hs.length; i++) bars += '<i style="--i:' + i + ';--h:' + hs[i] + '%"></i>';
    return {
      html: '<div class="dt5"><div class="panel"><div class="pr"><div class="pb">' + bars + '</div><svg viewBox="0 0 220 110" fill="none" class="ov"><path class="cl" d="M22 24 L66 40 L110 56 L154 70 L198 80 L214 86"/></svg></div></div></div>',
      css: join([
        stageCss(v),
        '.pr{position:relative;width:100%;height:110px}',
        '.pb{position:absolute;inset:0;display:flex;align-items:flex-end;gap:8px;padding:0 4px}',
        '.pb i{flex:1;height:var(--h,50%);border-radius:3px 3px 0 0;background:var(--c1,' + v.c1 + ');transform-origin:50% 100%;animation:pr-a' + v.i + ' var(--dur,' + d + 's) ease-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -1)}',
        '.ov{position:absolute;inset:0;width:100%;height:100%}',
        '.ov .cl{stroke:var(--c3,' + v.c3 + ');stroke-width:2.5;stroke-linecap:round;stroke-dasharray:210;stroke-dashoffset:210;animation:pr-b' + v.i + ' var(--dur,' + d + 's) ease-out infinite}',
        kf('pr-a' + v.i, '0%,6%{transform:scaleY(0)}30%,86%{transform:scaleY(1)}96%,100%{transform:scaleY(0)}'),
        kf('pr-b' + v.i, '0%,14%{stroke-dashoffset:210;opacity:0}22%{opacity:1}70%{stroke-dashoffset:0}86%{stroke-dashoffset:0;opacity:1}96%,100%{stroke-dashoffset:0;opacity:0}')
      ]),
      cfg: core(v, [range('Width', '--w', 180, 320, 2, 240, 'px')])
    };
  } });

  /* 20. KPI odometer — the headline number rolls like a slot machine */
  M.push({ key: 'odometerkpi', title: 'KPI Odometer', tags: ['data', 'counter'], build: function (v) {
    var d = D(v, 3);
    function drum(first) {
      var col = '';
      for (var g = 0; g <= 9; g++) col += '<b>' + g + '</b>';
      if (first) col += '<b>1</b><b>2</b><b>3</b><b>4</b><b>5</b>';
      return '<i class="dm">' + col + '</i>';
    }
    return {
      html: '<div class="dt5"><div class="panel"><div class="kp"><u class="lab">MRR</u><div class="odo">' + drum(true) + drum(false) + drum(false) + '</div><b class="pct">▲ 12%</b></div></div></div>',
      css: join([
        stageCss(v),
        '.kp{display:flex;align-items:center;gap:12px}',
        '.kp .lab{font:700 11px system-ui;letter-spacing:.16em;color:rgba(220,220,240,.55)}',
        '.kp .odo{display:flex;gap:3px}',
        '.kp .dm{display:block;width:var(--dw,26px);height:var(--dh,34px);overflow:hidden;border-radius:6px;background:rgba(255,255,255,.07)}',
        '.kp .dm b{display:block;height:var(--dh,34px);line-height:var(--dh,34px);text-align:center;font:800 18px/1 ui-monospace,monospace;color:var(--c1,' + v.c1 + ')}',
        '.kp .dm{animation:odo-a' + v.i + ' var(--dur,' + d + 's) steps(10) infinite}',
        '.kp .dm:nth-child(2){animation-duration:calc(var(--dur,' + d + 's) * 10)}',
        '.kp .dm:nth-child(3){animation-duration:calc(var(--dur,' + d + 's) * 100)}',
        '.kp .pct{font:800 12px ui-monospace,monospace;color:var(--c3,' + v.c3 + ');animation:odo-b' + v.i + ' calc(var(--dur,' + d + 's)/2) ease-in-out infinite}',
        kf('odo-a' + v.i, 'to{transform:translateY(calc(-10 * var(--dh,34px)))}'),
        kf('odo-b' + v.i, '0%,100%{opacity:.6}50%{opacity:1;transform:translateY(-2px)}')
      ]),
      cfg: core(v, [range('Digit width', '--dw', 18, 36, 2, 26, 'px'), range('Digit height', '--dh', 24, 46, 2, 34, 'px')])
    };
  } });

  /* 21. swing gauge — the dial oscillates between two readings */
  M.push({ key: 'swinggauge', title: 'Swing Gauge', tags: ['data', 'gauge'], build: function (v) {
    var d = D(v, 2.6);
    return {
      html: '<div class="dt5"><div class="panel"><div class="sg2"><i class="arc"></i><b class="ndl"></b><u class="lo">MIN</u><u class="hi">MAX</u></div></div></div>',
      css: join([
        stageCss(v),
        '.sg2{position:relative;width:var(--sz,140px);height:calc(var(--sz,140px) * .62)}',
        '.sg2 .arc{position:absolute;left:50%;top:54%;width:calc(var(--sz,140px) * .92);height:calc(var(--sz,140px) * .92);margin:0 0 0 calc(var(--sz,140px) * -.46);border-radius:50%;border:var(--th,9px) solid rgba(255,255,255,.1);border-bottom-color:transparent;border-left-color:transparent}',
        '.sg2 .ndl{position:absolute;left:50%;bottom:46%;width:3px;height:36%;margin-left:-1.5px;border-radius:99px;background:var(--c3,' + v.c3 + ');box-shadow:0 0 8px var(--c3,' + v.c3 + ');transform-origin:50% 100%;animation:sg2-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.45,0,.55,1) infinite}',
        '.sg2 u{position:absolute;bottom:2px;font:700 9px system-ui;letter-spacing:.12em;color:rgba(220,220,240,.5)}',
        '.sg2 .lo{left:8px}.sg2 .hi{right:8px}',
        kf('sg2-a' + v.i, '0%,100%{transform:rotate(-80deg)}50%{transform:rotate(76deg)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 100, 200, 2, 140, 'px'), range('Needle thick', '--th', 5, 16, 1, 9, 'px')])
    };
  } });

  K.add('data', V.matrix('data', M, 24, 'w5dt'));
})(window);
