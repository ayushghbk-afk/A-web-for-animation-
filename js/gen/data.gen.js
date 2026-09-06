/* ============================================================
   Data & Charts — 400 animated data-visualisation effects
   Bars, lines, donuts, sparklines, gauges, heatmaps, funnels, candlesticks,
   KPI tiles, radars, waterfalls, treemaps, sankeys, bullet charts, dot plots…
   Each mechanic is rendered as a matrix of variants: different series counts,
   easing, direction, palette, geometry and rhythm.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit, V = global.MLVary;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color;

  function pct(r, lo, hi) { return Math.round(lo + r() * (hi - lo)); }
  function seriesHtml(n, cls, r, lo, hi) {
    var out = '';
    for (var i = 0; i < n; i++) out += '<i class="' + cls + '" style="--i:' + i + ';--v:' + pct(r, lo, hi) + '"></i>';
    return out;
  }
  function baseCfg(v, extra) {
    return [
      range('Cycle', '--dur', .2, 8, .05, v.dur, 's'),
      range('Stagger', '--step', 0, .4, .01, v.step, 's'),
      col('Colour', '--c1', v.c1),
      col('Colour B', '--c2', v.c2),
      col('Colour C', '--c3', v.c3)
    ].concat(extra || []);
  }

  var M = [];

  /* ─── 1. growing bar chart ─── */
  M.push({ key: 'bars', title: 'Growth Bar Chart', tags: ['data', 'chart', 'bars'], build: function (v) {
    var n = 5 + (v.i % 8);
    return {
      html: '<div class="dbar">' + seriesHtml(n, 'b', v.rnd, 22, 100) + '</div>',
      css: join([
        '.dbar{display:flex;align-items:flex-end;gap:var(--gap,7px);height:var(--h,132px);padding:0 4px;border-bottom:2px solid rgba(150,150,190,.25)}',
        '.dbar .b{width:var(--bw,16px);border-radius:var(--round,' + v.round + 'px) var(--round,' + v.round + 'px) 2px 2px;background:linear-gradient(180deg,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + '));height:calc(var(--v) * 1%);transform-origin:50% 100%;animation:dbar-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's));animation-direction:' + v.dir + '}',
        kf('dbar-' + v.i, '0%,100%{transform:scaleY(.08);opacity:.35}45%,65%{transform:scaleY(1);opacity:1}')
      ]),
      cfg: baseCfg(v, [range('Bar width', '--bw', 5, 40, 1, 16, 'px'), range('Gap', '--gap', 1, 20, 1, 7, 'px'), range('Height', '--h', 60, 240, 2, 132, 'px'), range('Corner', '--round', 0, 20, 1, Math.min(v.round, 20), 'px')])
    };
  } });

  /* ─── 2. stacked columns ─── */
  M.push({ key: 'stack', title: 'Stacked Column', tags: ['data', 'chart'], build: function (v) {
    var n = 4 + (v.i % 6), out = '';
    for (var i = 0; i < n; i++) {
      out += '<i style="--i:' + i + '"><s style="--v:' + pct(v.rnd, 20, 48) + '"></s><s style="--v:' + pct(v.rnd, 14, 34) + '"></s><s style="--v:' + pct(v.rnd, 8, 26) + '"></s></i>';
    }
    return {
      html: '<div class="dstk">' + out + '</div>',
      css: join([
        '.dstk{display:flex;align-items:flex-end;gap:var(--gap,10px);height:var(--h,140px)}',
        '.dstk i{display:flex;flex-direction:column-reverse;width:var(--bw,22px);gap:2px;animation:dstk-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's));transform-origin:50% 100%}',
        '.dstk s{display:block;height:calc(var(--v) * 1px);border-radius:3px;background:var(--c1,' + v.c1 + ')}',
        '.dstk s:nth-child(2){background:var(--c2,' + v.c2 + ')}',
        '.dstk s:nth-child(3){background:var(--c3,' + v.c3 + ')}',
        kf('dstk-' + v.i, '0%,100%{transform:scaleY(.12)}50%{transform:scaleY(1)}')
      ]),
      cfg: baseCfg(v, [range('Column width', '--bw', 8, 48, 1, 22, 'px'), range('Gap', '--gap', 2, 26, 1, 10, 'px'), range('Height', '--h', 70, 240, 2, 140, 'px')])
    };
  } });

  /* ─── 3. animated donut ─── */
  M.push({ key: 'donut', title: 'Donut Fill', tags: ['data', 'chart', 'radial'], build: function (v) {
    var end = 120 + (v.i % 10) * 22;
    return {
      html: '<div class="ddo"><span></span><b>' + Math.round(end / 3.6) + '%</b></div>',
      css: join([
        '.ddo{position:relative;width:var(--sz,138px);height:var(--sz,138px);display:grid;place-items:center}',
        '.ddo span{position:absolute;inset:0;border-radius:50%;background:conic-gradient(var(--c1,' + v.c1 + ') 0deg,var(--c2,' + v.c2 + ') var(--end,' + end + 'deg),rgba(140,140,190,.16) var(--end,' + end + 'deg));-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - var(--thick,15px)),#000 0);mask:radial-gradient(farthest-side,transparent calc(100% - var(--thick,15px)),#000 0);animation:ddo-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-direction:' + v.dir + '}',
        '.ddo b{font:700 var(--fs,26px)/1 "Space Grotesk",sans-serif;color:var(--c3,' + v.c3 + ')}',
        kf('ddo-' + v.i, '0%,100%{transform:rotate(0) scale(.94);filter:saturate(.7)}50%{transform:rotate(180deg) scale(1);filter:saturate(1.3)}')
      ]),
      cfg: baseCfg(v, [range('Size', '--sz', 70, 240, 2, 138, 'px'), range('Thickness', '--thick', 4, 40, 1, 15, 'px'), range('Sweep', '--end', 20, 360, 5, end, 'deg'), range('Label size', '--fs', 10, 46, 1, 26, 'px')])
    };
  } });

  /* ─── 4. sparkline draw ─── */
  M.push({ key: 'spark', title: 'Sparkline Draw', tags: ['data', 'svg', 'line'], build: function (v) {
    var pts = [], n = 8 + (v.i % 8);
    for (var i = 0; i < n; i++) pts.push((i * (200 / (n - 1))).toFixed(1) + ',' + pct(v.rnd, 8, 62));
    var d = 'M' + pts.join(' L');
    return {
      html: '<svg class="dsp" viewBox="0 0 200 70"><path class="grid" d="M0 35H200"/><path class="ln" d="' + d + '"/><circle class="hd" r="4"><animateMotion dur="' + (v.dur * 2) + 's" repeatCount="indefinite" path="' + d + '"/></circle></svg>',
      css: join([
        '.dsp{width:var(--w,230px);height:auto;overflow:visible}',
        '.dsp .grid{stroke:rgba(150,150,190,.22);stroke-width:1;stroke-dasharray:3 5}',
        '.dsp .ln{fill:none;stroke:var(--c1,' + v.c1 + ');stroke-width:var(--thick,3px);stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:600;filter:drop-shadow(0 0 var(--glow,7px) var(--c2,' + v.c2 + '));animation:dsp-' + v.i + ' var(--dur,' + (v.dur * 2) + 's) ' + v.ease + ' infinite}',
        '.dsp .hd{fill:var(--c3,' + v.c3 + ')}',
        kf('dsp-' + v.i, '0%{stroke-dashoffset:600}55%,100%{stroke-dashoffset:0}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 120, 420, 5, 230, 'px'), range('Stroke', '--thick', 1, 10, .5, 3, 'px'), range('Glow', '--glow', 0, 26, 1, 7, 'px')])
    };
  } });

  /* ─── 5. radial gauge ─── */
  M.push({ key: 'gauge', title: 'Arc Gauge', tags: ['data', 'svg', 'gauge'], build: function (v) {
    var val = 25 + (v.i % 12) * 6;
    return {
      html: '<div class="dga"><svg viewBox="0 0 120 70"><path class="t" d="M10 62a50 50 0 0 1 100 0"/><path class="f" d="M10 62a50 50 0 0 1 100 0"/></svg><b>' + val + '</b></div>',
      css: join([
        '.dga{position:relative;width:var(--sz,200px);display:grid;place-items:center}',
        '.dga svg{width:100%;overflow:visible}',
        '.dga .t{fill:none;stroke:rgba(150,150,190,.2);stroke-width:var(--thick,10px);stroke-linecap:round}',
        '.dga .f{fill:none;stroke:var(--c1,' + v.c1 + ');stroke-width:var(--thick,10px);stroke-linecap:round;stroke-dasharray:158;filter:drop-shadow(0 0 var(--glow,8px) var(--c2,' + v.c2 + '));animation:dga-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite alternate}',
        '.dga b{position:absolute;bottom:2px;font:700 var(--fs,28px)/1 "JetBrains Mono",monospace;color:var(--c3,' + v.c3 + ')}',
        kf('dga-' + v.i, '0%{stroke-dashoffset:158}100%{stroke-dashoffset:' + (158 - val * 1.4).toFixed(0) + '}')
      ]),
      cfg: baseCfg(v, [range('Size', '--sz', 110, 360, 5, 200, 'px'), range('Thickness', '--thick', 3, 26, 1, 10, 'px'), range('Glow', '--glow', 0, 30, 1, 8, 'px'), range('Value size', '--fs', 12, 48, 1, 28, 'px')])
    };
  } });

  /* ─── 6. heatmap grid ─── */
  M.push({ key: 'heat', title: 'Heatmap Grid', tags: ['data', 'grid'], build: function (v) {
    var cols = 7 + (v.i % 6), rows = 4 + (v.i % 4), out = '', i;
    for (i = 0; i < cols * rows; i++) out += '<i style="--i:' + i + ';--o:' + (v.rnd() * .9 + .1).toFixed(2) + '"></i>';
    return {
      html: '<div class="dhm" style="--cols:' + cols + '">' + out + '</div>',
      css: join([
        '.dhm{display:grid;grid-template-columns:repeat(var(--cols),var(--cell,20px));gap:var(--gap,4px)}',
        '.dhm i{height:var(--cell,20px);border-radius:var(--round,4px);background:color-mix(in srgb,var(--c1,' + v.c1 + ') calc(var(--o) * 100%),var(--c3,' + v.c3 + '));animation:dhm-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,.03s))}',
        kf('dhm-' + v.i, '0%,100%{opacity:calc(var(--o) * .35);transform:scale(.86)}50%{opacity:1;transform:scale(1)}')
      ]),
      cfg: baseCfg(v, [range('Cell', '--cell', 8, 42, 1, 20, 'px'), range('Gap', '--gap', 0, 12, 1, 4, 'px'), range('Corner', '--round', 0, 14, 1, 4, 'px')])
    };
  } });

  /* ─── 7. progress rows ─── */
  M.push({ key: 'rows', title: 'Metric Bar Rows', tags: ['data', 'ui'], build: function (v) {
    var n = 3 + (v.i % 4), out = '', names = ['Sessions', 'Signups', 'Revenue', 'Churn', 'Retention', 'Latency'];
    for (var i = 0; i < n; i++) out += '<div class="r" style="--i:' + i + ';--v:' + pct(v.rnd, 32, 96) + '"><span>' + names[(i + v.i) % names.length] + '</span><em><b></b></em></div>';
    return {
      html: '<div class="drw">' + out + '</div>',
      css: join([
        '.drw{display:grid;gap:var(--gap,12px);width:var(--w,260px)}',
        '.drw .r{display:grid;gap:5px}',
        '.drw span{font:600 11px "JetBrains Mono",monospace;letter-spacing:.14em;text-transform:uppercase;color:#9a9ab5}',
        '.drw em{display:block;height:var(--th,10px);border-radius:99px;background:rgba(150,150,190,.18);overflow:hidden}',
        '.drw b{display:block;height:100%;width:calc(var(--v) * 1%);border-radius:99px;background:linear-gradient(90deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform-origin:0 50%;animation:drw-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('drw-' + v.i, '0%,100%{transform:scaleX(.05)}45%,70%{transform:scaleX(1)}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 160, 420, 5, 260, 'px'), range('Track', '--th', 4, 26, 1, 10, 'px'), range('Row gap', '--gap', 4, 28, 1, 12, 'px')])
    };
  } });

  /* ─── 8. candlestick ticker ─── */
  M.push({ key: 'candle', title: 'Candlestick Ticker', tags: ['data', 'finance'], build: function (v) {
    var n = 9 + (v.i % 8), out = '';
    for (var i = 0; i < n; i++) {
      var up = v.rnd() > .45;
      out += '<i class="' + (up ? 'u' : 'd') + '" style="--i:' + i + ';--h:' + pct(v.rnd, 22, 78) + ';--t:' + pct(v.rnd, 6, 22) + '"></i>';
    }
    return {
      html: '<div class="dcd">' + out + '</div>',
      css: join([
        '.dcd{display:flex;align-items:center;gap:var(--gap,7px);height:var(--h,140px)}',
        '.dcd i{position:relative;width:var(--bw,11px);height:calc(var(--h) * 1%);border-radius:2px;background:var(--c1,' + v.c1 + ');animation:dcd-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        '.dcd i.d{background:var(--c3,' + v.c3 + ')}',
        '.dcd i::before,.dcd i::after{content:"";position:absolute;left:50%;width:2px;height:calc(var(--t) * 1px);background:inherit;transform:translateX(-50%)}',
        '.dcd i::before{bottom:100%}',
        '.dcd i::after{top:100%}',
        kf('dcd-' + v.i, '0%,100%{transform:scaleY(.35) translateY(6px);opacity:.5}50%{transform:scaleY(1) translateY(0);opacity:1}')
      ]),
      cfg: baseCfg(v, [range('Candle width', '--bw', 4, 26, 1, 11, 'px'), range('Gap', '--gap', 2, 20, 1, 7, 'px'), range('Height', '--h', 70, 240, 2, 140, 'px')])
    };
  } });

  /* ─── 9. KPI tile ─── */
  M.push({ key: 'kpi', title: 'KPI Tile', tags: ['data', 'ui', 'card'], build: function (v) {
    var val = (2 + v.i % 9) + '.' + (v.i % 10) + 'k', delta = (v.i % 3 ? '+' : '−') + (4 + v.i % 20) + '%';
    return {
      html: '<div class="dkp"><span>Active users</span><b>' + val + '</b><em>' + delta + '</em><u></u></div>',
      css: join([
        '.dkp{position:relative;display:grid;gap:6px;width:var(--w,210px);padding:var(--pad,20px);border-radius:var(--round,16px);background:linear-gradient(160deg,rgba(150,150,200,.12),rgba(150,150,200,.04));border:1px solid rgba(160,160,210,.18);overflow:hidden}',
        '.dkp span{font:600 10px "JetBrains Mono",monospace;letter-spacing:.18em;text-transform:uppercase;color:#9a9ab5}',
        '.dkp b{font:700 var(--fs,38px)/1 "Space Grotesk",sans-serif;color:var(--c1,' + v.c1 + ');animation:dkp-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        '.dkp em{justify-self:start;font:600 12px/1 "JetBrains Mono",monospace;font-style:normal;padding:4px 8px;border-radius:99px;color:var(--c2,' + v.c2 + ');background:color-mix(in srgb,var(--c2,' + v.c2 + ') 18%,transparent)}',
        '.dkp u{position:absolute;inset:auto 0 0 0;height:3px;background:linear-gradient(90deg,var(--c1,' + v.c1 + '),var(--c3,' + v.c3 + '));transform-origin:0 50%;animation:dkpb-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        kf('dkp-' + v.i, '0%,100%{opacity:.55;transform:translateY(5px)}50%{opacity:1;transform:translateY(0)}'),
        kf('dkpb-' + v.i, '0%,100%{transform:scaleX(.1)}55%{transform:scaleX(1)}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 150, 340, 5, 210, 'px'), range('Padding', '--pad', 10, 40, 1, 20, 'px'), range('Value size', '--fs', 20, 64, 1, 38, 'px'), range('Corner', '--round', 0, 30, 1, 16, 'px')])
    };
  } });

  /* ─── 10. radar chart ─── */
  M.push({ key: 'radar', title: 'Radar Sweep Chart', tags: ['data', 'svg', 'radial'], build: function (v) {
    var n = 5 + (v.i % 4), pts = [], i, a, r;
    for (i = 0; i < n; i++) {
      a = (i / n) * Math.PI * 2 - Math.PI / 2; r = 20 + v.rnd() * 34;
      pts.push((60 + Math.cos(a) * r).toFixed(1) + ',' + (60 + Math.sin(a) * r).toFixed(1));
    }
    return {
      html: '<svg class="drd" viewBox="0 0 120 120"><circle class="g" cx="60" cy="60" r="55"/><circle class="g" cx="60" cy="60" r="36"/><circle class="g" cx="60" cy="60" r="18"/><polygon class="p" points="' + pts.join(' ') + '"/><path class="sw" d="M60 60L60 5A55 55 0 0 1 107 33Z"/></svg>',
      css: join([
        '.drd{width:var(--sz,180px);height:var(--sz,180px)}',
        '.drd .g{fill:none;stroke:rgba(150,150,195,.2);stroke-width:1}',
        '.drd .p{fill:color-mix(in srgb,var(--c1,' + v.c1 + ') 35%,transparent);stroke:var(--c1,' + v.c1 + ');stroke-width:var(--thick,2px);animation:drd-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;transform-origin:50% 50%}',
        '.drd .sw{fill:color-mix(in srgb,var(--c2,' + v.c2 + ') 26%,transparent);transform-origin:50% 50%;animation:drds-' + v.i + ' calc(var(--dur,' + v.dur + 's) * 2) linear infinite;animation-direction:' + v.dir + '}',
        kf('drd-' + v.i, '0%,100%{transform:scale(.7);opacity:.55}50%{transform:scale(1);opacity:1}'),
        kf('drds-' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: baseCfg(v, [range('Size', '--sz', 100, 320, 4, 180, 'px'), range('Stroke', '--thick', 1, 8, .5, 2, 'px')])
    };
  } });

  /* ─── 11. funnel ─── */
  M.push({ key: 'funnel', title: 'Conversion Funnel', tags: ['data', 'chart'], build: function (v) {
    var n = 4 + (v.i % 3), out = '';
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + ';--w:' + (100 - i * (60 / n)).toFixed(0) + '"></i>';
    return {
      html: '<div class="dfn">' + out + '</div>',
      css: join([
        '.dfn{display:grid;gap:var(--gap,7px);justify-items:center;width:var(--w,240px)}',
        '.dfn i{width:calc(var(--w) * 1%);height:var(--rh,26px);border-radius:var(--round,6px);background:linear-gradient(90deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform-origin:50% 50%;animation:dfn-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('dfn-' + v.i, '0%,100%{transform:scaleX(.12);opacity:.4}50%{transform:scaleX(1);opacity:1}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 150, 400, 5, 240, 'px'), range('Row height', '--rh', 12, 54, 1, 26, 'px'), range('Gap', '--gap', 2, 22, 1, 7, 'px'), range('Corner', '--round', 0, 20, 1, 6, 'px')])
    };
  } });

  /* ─── 12. area chart wave ─── */
  M.push({ key: 'area', title: 'Area Chart Wave', tags: ['data', 'svg'], build: function (v) {
    return {
      html: '<svg class="dar" viewBox="0 0 240 90" preserveAspectRatio="none"><path class="a" d="M0 70Q30 30 60 52T120 44T180 60T240 34V90H0Z"/><path class="a b" d="M0 78Q40 52 80 66T160 50T240 62V90H0Z"/></svg>',
      css: join([
        '.dar{width:var(--w,250px);height:var(--h,100px)}',
        '.dar .a{fill:color-mix(in srgb,var(--c1,' + v.c1 + ') 45%,transparent);stroke:var(--c1,' + v.c1 + ');stroke-width:var(--thick,2px);animation:dar-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite alternate;transform-origin:50% 100%}',
        '.dar .b{fill:color-mix(in srgb,var(--c2,' + v.c2 + ') 38%,transparent);stroke:var(--c2,' + v.c2 + ');animation-delay:calc(var(--step,' + v.step + 's) * -4)}',
        kf('dar-' + v.i, '0%{transform:scaleY(.45) translateY(6px)}100%{transform:scaleY(1) translateY(0)}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 150, 420, 5, 250, 'px'), range('Height', '--h', 60, 220, 2, 100, 'px'), range('Stroke', '--thick', 0, 8, .5, 2, 'px')])
    };
  } });

  /* ─── 13. dot plot scatter ─── */
  M.push({ key: 'scatter', title: 'Scatter Cloud', tags: ['data', 'plot'], build: function (v) {
    var n = 16 + (v.i % 14), out = '';
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + ';--x:' + pct(v.rnd, 3, 95) + ';--y:' + pct(v.rnd, 5, 92) + ';--s:' + (.5 + v.rnd() * 1.3).toFixed(2) + '"></i>';
    return {
      html: '<div class="dsc">' + out + '</div>',
      css: join([
        '.dsc{position:relative;width:var(--w,220px);height:var(--h,150px);border-left:1px solid rgba(150,150,195,.28);border-bottom:1px solid rgba(150,150,195,.28)}',
        '.dsc i{position:absolute;left:calc(var(--x) * 1%);bottom:calc(var(--y) * 1%);width:calc(var(--dot,10px) * var(--s));height:calc(var(--dot,10px) * var(--s));margin:calc(var(--dot,10px) / -2);border-radius:50%;background:var(--c1,' + v.c1 + ');box-shadow:0 0 var(--glow,8px) var(--c2,' + v.c2 + ');animation:dsc-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,.04s))}',
        kf('dsc-' + v.i, '0%,100%{transform:scale(0);opacity:0}20%,70%{transform:scale(1);opacity:.95}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 140, 400, 5, 220, 'px'), range('Height', '--h', 90, 280, 2, 150, 'px'), range('Dot', '--dot', 3, 24, 1, 10, 'px'), range('Glow', '--glow', 0, 26, 1, 8, 'px')])
    };
  } });

  /* ─── 14. waterfall ─── */
  M.push({ key: 'waterfall', title: 'Waterfall Steps', tags: ['data', 'chart'], build: function (v) {
    var n = 5 + (v.i % 5), out = '', y = 20;
    for (var i = 0; i < n; i++) { y = Math.max(6, Math.min(70, y + (v.rnd() - .4) * 34)); out += '<i style="--i:' + i + ';--y:' + y.toFixed(0) + ';--h:' + pct(v.rnd, 12, 30) + '"></i>'; }
    return {
      html: '<div class="dwf">' + out + '</div>',
      css: join([
        '.dwf{position:relative;display:flex;align-items:flex-end;gap:var(--gap,8px);width:var(--w,240px);height:var(--h,140px)}',
        '.dwf i{flex:1;height:calc(var(--h) * 1%);margin-bottom:calc(var(--y) * 1%);border-radius:var(--round,4px);background:linear-gradient(180deg,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + '));animation:dwf-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('dwf-' + v.i, '0%,100%{opacity:.25;transform:translateY(14px) scaleY(.5)}45%,72%{opacity:1;transform:translateY(0) scaleY(1)}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 150, 420, 5, 240, 'px'), range('Height', '--h', 80, 240, 2, 140, 'px'), range('Gap', '--gap', 2, 22, 1, 8, 'px'), range('Corner', '--round', 0, 14, 1, 4, 'px')])
    };
  } });

  /* ─── 15. treemap ─── */
  M.push({ key: 'treemap', title: 'Treemap Blocks', tags: ['data', 'grid'], build: function (v) {
    var out = '', spans = [[3, 2], [2, 2], [1, 1], [2, 1], [1, 2], [1, 1], [2, 1], [1, 1]];
    for (var i = 0; i < 8; i++) out += '<i style="--i:' + i + ';--cs:' + spans[(i + v.i) % 8][0] + ';--rs:' + spans[(i + v.i) % 8][1] + '"></i>';
    return {
      html: '<div class="dtm">' + out + '</div>',
      css: join([
        '.dtm{display:grid;grid-template-columns:repeat(5,var(--cell,34px));grid-auto-rows:var(--cell,34px);gap:var(--gap,4px);grid-auto-flow:dense}',
        '.dtm i{grid-column:span var(--cs);grid-row:span var(--rs);border-radius:var(--round,6px);background:color-mix(in srgb,var(--c1,' + v.c1 + ') calc(35% + var(--i) * 7%),var(--c2,' + v.c2 + '));animation:dtm-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('dtm-' + v.i, '0%,100%{transform:scale(.72);opacity:.4}50%{transform:scale(1);opacity:1}')
      ]),
      cfg: baseCfg(v, [range('Cell', '--cell', 16, 70, 1, 34, 'px'), range('Gap', '--gap', 0, 14, 1, 4, 'px'), range('Corner', '--round', 0, 18, 1, 6, 'px')])
    };
  } });

  /* ─── 16. live counter tile (js) ─── */
  M.push({ key: 'counter', title: 'Live Counter Readout', tags: ['data', 'js'], build: function (v) {
    var top = 1200 + v.i * 731;
    return {
      html: '<div class="dct"><span>Requests / min</span><b>0</b><em></em></div>',
      css: join([
        '.dct{display:grid;gap:6px;justify-items:center;padding:var(--pad,18px) var(--padx,26px);border-radius:var(--round,14px);background:rgba(150,150,200,.08);border:1px solid rgba(160,160,210,.18)}',
        '.dct span{font:600 10px "JetBrains Mono",monospace;letter-spacing:.2em;text-transform:uppercase;color:#9a9ab5}',
        '.dct b{font:700 var(--fs,40px)/1 "JetBrains Mono",monospace;color:var(--c1,' + v.c1 + ');font-variant-numeric:tabular-nums;text-shadow:0 0 var(--glow,16px) color-mix(in srgb,var(--c2,' + v.c2 + ') 60%,transparent)}',
        '.dct em{width:var(--w,140px);height:4px;border-radius:99px;background:linear-gradient(90deg,var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '));transform-origin:0 50%;animation:dct-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        kf('dct-' + v.i, '0%{transform:scaleX(0)}100%{transform:scaleX(1)}')
      ]),
      js: 'var b=root.querySelector("b"),t=0,top=' + top + ';\napi.raf(function(){t+=0.014;var p=(t%1);var e=1-Math.pow(1-p,3);b.textContent=Math.round(e*top).toLocaleString("en-US");});',
      cfg: [range('Cycle', '--dur', .3, 8, .05, v.dur, 's'), range('Value size', '--fs', 16, 64, 1, 40, 'px'), range('Bar width', '--w', 60, 280, 5, 140, 'px'), range('Glow', '--glow', 0, 34, 1, 16, 'px'), range('Padding', '--pad', 8, 40, 1, 18, 'px'), col('Colour', '--c1', v.c1), col('Colour B', '--c2', v.c2), col('Colour C', '--c3', v.c3)]
    };
  } });

  /* ─── 17. bullet chart ─── */
  M.push({ key: 'bullet', title: 'Bullet Target Chart', tags: ['data', 'chart'], build: function (v) {
    var val = 40 + (v.i % 12) * 4, tgt = 55 + (v.i % 9) * 4;
    return {
      html: '<div class="dbu"><em><b></b><u style="left:' + tgt + '%"></u></em><span>' + val + ' / ' + tgt + '</span></div>',
      css: join([
        '.dbu{display:grid;gap:8px;width:var(--w,260px)}',
        '.dbu em{position:relative;display:block;height:var(--th,18px);border-radius:var(--round,5px);background:repeating-linear-gradient(90deg,rgba(150,150,200,.16) 0 25%,rgba(150,150,200,.09) 25% 50%)}',
        '.dbu b{position:absolute;inset:4px auto 4px 0;width:' + val + '%;border-radius:3px;background:linear-gradient(90deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform-origin:0 50%;animation:dbu-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        '.dbu u{position:absolute;top:-3px;bottom:-3px;width:3px;background:var(--c3,' + v.c3 + ');box-shadow:0 0 var(--glow,10px) var(--c3,' + v.c3 + ')}',
        '.dbu span{font:600 11px "JetBrains Mono",monospace;color:#9a9ab5}',
        kf('dbu-' + v.i, '0%,100%{transform:scaleX(.05)}50%,80%{transform:scaleX(1)}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 160, 420, 5, 260, 'px'), range('Track', '--th', 8, 40, 1, 18, 'px'), range('Glow', '--glow', 0, 26, 1, 10, 'px')])
    };
  } });

  /* ─── 18. sankey ribbons ─── */
  M.push({ key: 'sankey', title: 'Sankey Ribbons', tags: ['data', 'svg'], build: function (v) {
    var out = '';
    for (var i = 0; i < 3 + (v.i % 3); i++) {
      var y0 = 20 + i * 26, y1 = 14 + ((i * 37 + v.i * 13) % 90);
      out += '<path style="--i:' + i + '" d="M6 ' + y0 + 'C70 ' + y0 + ' 90 ' + y1 + ' 174 ' + y1 + '"/>';
    }
    return {
      html: '<svg class="dsk" viewBox="0 0 180 120"><g class="rb">' + out + '</g><rect class="nd" x="0" y="10" width="7" height="100" rx="3"/><rect class="nd b" x="173" y="10" width="7" height="100" rx="3"/></svg>',
      css: join([
        '.dsk{width:var(--w,230px);height:auto}',
        '.dsk .rb path{fill:none;stroke:color-mix(in srgb,var(--c1,' + v.c1 + ') 65%,transparent);stroke-width:var(--thick,12px);stroke-linecap:round;stroke-dasharray:260;animation:dsk-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        '.dsk .rb path:nth-child(even){stroke:color-mix(in srgb,var(--c2,' + v.c2 + ') 65%,transparent)}',
        '.dsk .nd{fill:var(--c1,' + v.c1 + ')}',
        '.dsk .nd.b{fill:var(--c3,' + v.c3 + ')}',
        kf('dsk-' + v.i, '0%{stroke-dashoffset:260;opacity:.2}55%,100%{stroke-dashoffset:0;opacity:1}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 150, 400, 5, 230, 'px'), range('Ribbon', '--thick', 3, 26, 1, 12, 'px')])
    };
  } });

  /* ─── 19. pie slices ─── */
  M.push({ key: 'pie', title: 'Exploding Pie', tags: ['data', 'radial'], build: function (v) {
    var a = 90 + (v.i % 8) * 22, b = a + 70 + (v.i % 6) * 20;
    return {
      html: '<div class="dpi"><span></span></div>',
      css: join([
        '.dpi{width:var(--sz,150px);height:var(--sz,150px);display:grid;place-items:center}',
        '.dpi span{width:100%;height:100%;border-radius:50%;background:conic-gradient(var(--c1,' + v.c1 + ') 0 var(--a,' + a + 'deg),var(--c2,' + v.c2 + ') var(--a,' + a + 'deg) var(--b,' + b + 'deg),var(--c3,' + v.c3 + ') var(--b,' + b + 'deg) 360deg);animation:dpi-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-direction:' + v.dir + ';box-shadow:0 0 var(--glow,22px) color-mix(in srgb,var(--c1,' + v.c1 + ') 45%,transparent)}',
        kf('dpi-' + v.i, '0%,100%{transform:rotate(0) scale(.9)}50%{transform:rotate(200deg) scale(1.04)}')
      ]),
      cfg: baseCfg(v, [range('Size', '--sz', 80, 280, 2, 150, 'px'), range('Slice A', '--a', 10, 340, 5, a, 'deg'), range('Slice B', '--b', 20, 355, 5, Math.min(b, 355), 'deg'), range('Glow', '--glow', 0, 50, 1, 22, 'px')])
    };
  } });

  /* ─── 20. terminal log stream (js) ─── */
  M.push({ key: 'stream', title: 'Live Log Stream', tags: ['data', 'js', 'terminal'], build: function (v) {
    return {
      html: '<div class="dls"><ul></ul></div>',
      css: join([
        '.dls{width:var(--w,270px);height:var(--h,150px);overflow:hidden;padding:var(--pad,12px);border-radius:var(--round,12px);background:rgba(10,10,22,.6);border:1px solid color-mix(in srgb,var(--c1,' + v.c1 + ') 30%,transparent)}',
        '.dls ul{list-style:none;margin:0;padding:0;display:grid;gap:4px}',
        '.dls li{font:500 var(--fs,11px)/1.4 "JetBrains Mono",monospace;color:var(--c2,' + v.c2 + ');animation:dls-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' 1}',
        '.dls li b{color:var(--c1,' + v.c1 + ')}',
        '.dls li i{color:var(--c3,' + v.c3 + ');font-style:normal}',
        kf('dls-' + v.i, 'from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}')
      ]),
      js: 'var ul=root.querySelector("ul"),n=0,t=0,codes=[200,201,204,301,404,500],paths=["/api/users","/api/orders","/health","/v1/metrics","/auth/token","/api/cart"];\napi.raf(function(){t++;if(t%26)return;n++;var li=document.createElement("li");\nli.innerHTML="<b>"+String(n).padStart(4,"0")+"</b> "+paths[n%paths.length]+" <i>"+codes[n%codes.length]+"</i> "+(8+(n*7)%240)+"ms";\nul.appendChild(li);while(ul.children.length>8)ul.removeChild(ul.firstChild);});',
      cfg: [range('Fade in', '--dur', .1, 3, .05, Math.min(v.dur, 3), 's'), range('Width', '--w', 180, 430, 5, 270, 'px'), range('Height', '--h', 90, 300, 2, 150, 'px'), range('Font', '--fs', 8, 20, 1, 11, 'px'), range('Padding', '--pad', 4, 30, 1, 12, 'px'), col('Colour', '--c1', v.c1), col('Colour B', '--c2', v.c2), col('Colour C', '--c3', v.c3)]
    };
  } });

  K.add('data', V.matrix('data', M, 22, 'dta'));
})(window);
