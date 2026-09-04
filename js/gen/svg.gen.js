/* ============================================================
   SVG — generated families
   Everything here is inline SVG: paths, strokes, masks, filters.
   Two tricks carry most of the family: pathLength="1" (so dash maths are
   resolution independent) and transform-box:fill-box (so each shape rotates
   around its own centre).
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color, mapJoin = K.mapJoin;
  var C1 = '#7c5cff', C2 = '#22d3ee', C3 = '#ff5c8a';
  var pool = [];

  var STD = [
    range('Size', '--s', 60, 210, 2, 132, 'px'),
    range('Line', '--lw', .5, 9, .5, 2.5, 'px'),
    col('Stroke', '--c1', C1), col('Stroke B', '--c2', C2),
    range('Fill', '--fo', 0, 100, 5, 0, '%')
  ];
  var shell = `.w{display:block;width:var(--s,132px);height:var(--s,132px);overflow:visible}
.w *{transform-box:fill-box;transform-origin:50% 50%}
.w [stroke]{stroke-linecap:round;stroke-linejoin:round}`;

  function svgItem(o) {
    pool.push({
      family: 'svg:' + o.g,
      id: 'svg-' + o.name,
      title: o.title,
      tags: ['svg', o.g].concat(o.tags || ['css']),
      html: '<svg class="w" viewBox="' + (o.vb || '0 0 100 100') + '" fill="none" aria-hidden="true">' + o.inner + '</svg>',
      css: join([shell, o.css]),
      js: o.js,
      cfg: (o.cfg || STD).filter(function (c) {
        return [o.html, o.css, o.js].some(function (s) { return s && s.indexOf(c.k) > -1; });
      })
    });
    var last = pool[pool.length - 1];
    if (!last.cfg.length) last.cfg = null;
  }

  /* ───────── 1. stroke draw (pathLength + dasharray) ───────── */
  var drawKf = kf('svdraw', '0%{stroke-dashoffset:1}42%,58%{stroke-dashoffset:0}100%{stroke-dashoffset:-1}');
  var shapes = [
    ['check', 'Draw Check', '<path pathLength="1" d="M24 54l18 18 36-40"/>'],
    ['heart', 'Draw Heart', '<path pathLength="1" d="M50 82C22 62 14 46 22 34c7-10 21-9 28 2 7-11 21-12 28-2 8 12 0 28-28 48z"/>'],
    ['star', 'Draw Star', '<path pathLength="1" d="M50 14l11 23 25 3-18 17 5 25-23-13-23 13 5-25-18-17 25-3z"/>'],
    ['arrow', 'Draw Arrow', '<path pathLength="1" d="M14 50h62"/><path pathLength="1" d="M56 30l20 20-20 20"/>'],
    ['mail', 'Draw Envelope', '<path pathLength="1" d="M14 28h72v44H14z"/><path pathLength="1" d="M14 30l36 26 36-26"/>'],
    ['pin', 'Draw Map Pin', '<path pathLength="1" d="M50 88C34 68 26 57 26 44a24 24 0 0 1 48 0c0 13-8 24-24 44z"/><path pathLength="1" d="M50 44m-8 0a8 8 0 1 0 16 0 8 8 0 1 0-16 0"/>'],
    ['home', 'Draw House', '<path pathLength="1" d="M16 50L50 20l34 30"/><path pathLength="1" d="M26 48v34h48V48"/>'],
    ['bolt', 'Draw Bolt', '<path pathLength="1" d="M56 12L28 56h16l-6 32 30-46H52z"/>'],
    ['cloud', 'Draw Cloud', '<path pathLength="1" d="M28 70a16 16 0 0 1 2-31 22 22 0 0 1 41 6 13 13 0 0 1-3 25z"/>'],
    ['moon', 'Draw Moon', '<path pathLength="1" d="M62 18a34 34 0 1 0 20 60 30 30 0 0 1-20-60z"/>'],
    ['sun', 'Draw Sun', '<circle pathLength="1" cx="50" cy="50" r="18"/><path pathLength="1" d="M50 12v10M50 78v10M12 50h10M78 50h10M24 24l7 7M69 69l7 7M76 24l-7 7M31 69l-7 7"/>'],
    ['leaf', 'Draw Leaf', '<path pathLength="1" d="M20 80C14 44 40 18 82 18c0 42-26 66-62 62z"/><path pathLength="1" d="M24 76C40 60 54 46 74 26"/>'],
    ['spiral', 'Draw Spiral', '<path pathLength="1" d="M50 50a8 8 0 1 1 8-8 18 18 0 1 1-18-18 30 30 0 1 1 30 30 42 42 0 1 1-42-42"/>'],
    ['wave', 'Draw Wave', '<path pathLength="1" d="M6 60c10-16 20-16 30 0s20 16 30 0 20-16 28 0"/>'],
    ['guitar', 'Draw Guitar Pick', '<path pathLength="1" d="M50 88C26 74 18 52 24 30c4-14 44-16 52 0 6 22-2 44-26 58z"/>'],
    ['diamond', 'Draw Diamond', '<path pathLength="1" d="M50 14l28 22-28 50-28-50z"/><path pathLength="1" d="M22 36h56M50 14l-14 22 14 50 14-50z"/>']
  ];
  shapes.forEach(function (v, i) {
    var n = (v[2].match(/<(path|circle)/g) || []).length;
    svgItem({
      g: 'draw', name: v[0], title: v[1], inner: v[2],
      css: `.w path,.w circle{stroke:var(--c1,${C1});stroke-width:var(--lw,2.5);stroke-dasharray:1;stroke-dashoffset:1;
animation:svdraw var(--dur,3s) cubic-bezier(.5,0,.3,1) infinite;animation-delay:${(-i * .1).toFixed(2)}s}`.replace(/\n/g, '') +
        (n > 1 ? '\n' + mapJoin(n, function (j) { return '.w :nth-child(' + (j + 1) + '){animation-delay:' + (j * .28) + 's}'; }, '\n') : '') +
        '\n' + drawKf
    });
  });

  /* ───────── 2. marching ants ───────── */
  [
    ['ants-rect', 'Marching Rect', '<rect x="16" y="24" width="68" height="52" rx="12"/>', 10, 'dash'],
    ['ants-circle', 'Marching Circle', '<circle cx="50" cy="50" r="34"/>', 8, 'dash'],
    ['ants-ellipse', 'Marching Ellipse', '<ellipse cx="50" cy="50" rx="40" ry="24"/>', 12, 'dash2'],
    ['ants-triangle', 'Marching Triangle', '<path d="M50 16 84 78H16z"/>', 9, 'dash'],
    ['ants-blob', 'Marching Blob', '<path d="M50 12c22 0 38 14 36 34S70 88 48 86 12 70 14 48 28 12 50 12z"/>', 14, 'dash3'],
    ['ants-squiggle', 'Marching Squiggle', '<path d="M6 64c8-24 18-24 26 0s18 24 26 0 18-24 26 0"/>', 11, 'dash'],
    ['ants-grid', 'Marching Grid Box', '<rect x="14" y="14" width="72" height="72" rx="6"/><rect x="30" y="30" width="40" height="40" rx="4"/>', 6, 'dash'],
    ['ants-arc', 'Arc Progress Ants', '<circle cx="50" cy="50" r="34" stroke-dasharray="4 6"/><path d="M50 16a34 34 0 0 1 0 68"/>', 20, 'dash4']
  ].forEach(function (v) {
    svgItem({
      g: 'ants', name: v[0], title: v[1], inner: v[2],
      cfg: STD.concat([range('Dash', '--da', 2, 26, 1, v[3], '')]),
      css: `.w path,.w rect,.w circle,.w ellipse{stroke:var(--c1,${C1});stroke-width:var(--lw,2.5);stroke-dasharray:var(--da,${v[3]}) var(--da,${v[3]})}
.w>*{animation:ants var(--dur,${(v[4] === 'dash2' ? 1.4 : 2.2) + 's'}) linear infinite;transform-origin:50% 50%}
.w>*:nth-child(2){animation-direction:reverse}
${kf('ants', 'to{stroke-dashoffset:calc(var(--da,' + v[3] + ') * -2)}')}`
    });
  });

  /* ───────── 3. rotating geometry ───────── */
  function poly(n, r, cx, cy, rot) {
    var pts = [];
    for (var i = 0; i < n; i++) {
      var a = (rot || -90) * Math.PI / 180 + i * 2 * Math.PI / n;
      pts.push((cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1));
    }
    return pts.join(' ');
  }
  [
    ['spin-tri', 'Triangle Whirl', 3, 30, kf('svspin', 'to{transform:rotate(1turn)}')],
    ['spin-square', 'Spinning Square', 4, 28, kf('svspin', 'to{transform:rotate(1turn)}')],
    ['spin-pent', 'Pentagon Wobble', 5, 30, kf('svwob', '0%,100%{transform:rotate(-18deg) scale(1)}50%{transform:rotate(18deg) scale(1.06)}')],
    ['spin-hex', 'Hex Roll', 6, 30, kf('svspin', 'to{transform:rotate(1turn)}')],
    ['spin-oct', 'Octagon Pump', 8, 30, kf('svpump', '0%,100%{transform:rotate(0) scale(1)}50%{transform:rotate(22.5deg) scale(.86)}')],
    ['spin-star5', 'Star Twirl', 5, 34, kf('svtwirl', '0%{transform:rotate(0) scale(1)}50%{transform:rotate(180deg) scale(.7)}100%{transform:rotate(1turn) scale(1)}')],
    ['spin-diamond', 'Diamond Flip', 4, 32, kf('svflip', '0%{transform:rotate(0) scaleX(1)}50%{transform:rotate(180deg) scaleX(-1)}100%{transform:rotate(1turn) scaleX(1)}')]
  ].forEach(function (v) {
    svgItem({
      g: 'geometry', name: v[0], title: v[1],
      inner: '<polygon points="' + poly(v[2], v[3], 50, 50) + '"/>',
      css: `.w polygon{stroke:var(--c1,${C1});stroke-width:var(--lw,2.5);fill:color-mix(in srgb,var(--c1,${C1}) var(--fo,8%),transparent)}
.w polygon{animation:g2 var(--dur,3.4s) cubic-bezier(.5,.05,.5,.95) infinite}
${v[4].replace('@keyframes svspin', '@keyframes g2').replace('@keyframes svwob', '@keyframes g2').replace('@keyframes svpump', '@keyframes g2').replace('@keyframes svtwirl', '@keyframes g2').replace('@keyframes svflip', '@keyframes g2')}`
    });
  });
  [
    ['nested-spin', 'Nested Counter-Spin', [30, 22, 14]],
    ['poly-cycle', 'Polygon Cycle', [3, 4, 5, 6]],
    ['orbit-squares', 'Orbit Squares', [8, 8, 8, 8]],
    ['tick-dial', 'Tick Dial', [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]]
  ].forEach(function (v) {
    var inner = '';
    if (v[0] === 'nested-spin') {
      inner = mapJoin(v[2].length, function (i) { return '<polygon points="' + poly(6, v[2][i], 50, 50) + '" style="--i:' + i + '"/>'; }, '');
    } else if (v[0] === 'poly-cycle') {
      inner = mapJoin(v[2].length, function (i) { return '<polygon points="' + poly(v[2][i], 28, 50, 50) + '" style="--i:' + i + '"/>'; }, '');
    } else if (v[0] === 'orbit-squares') {
      inner = mapJoin(v[2].length, function (i) { return '<rect x="46" y="46" width="8" height="8" rx="2" style="--i:' + i + '" transform="rotate(' + (i * 45) + ' 50 16)"/>'; }, '') + '<circle cx="50" cy="16" r="2.5"/>';
    } else {
      inner = mapJoin(12, function (i) { return '<line x1="50" y1="12" x2="50" y2="' + (i % 3 === 0 ? 22 : 18) + '" style="--i:' + i + '" transform="rotate(' + (i * 30) + ' 50 50)"/>'; }, '');
    }
    var css = v[0] === 'nested-spin'
      ? `.w polygon{stroke:var(--c1,${C1});stroke-width:var(--lw,2.5);fill:none;animation:nsp var(--dur,4.6s) linear infinite;animation-direction:alternate;animation-delay:calc(var(--i) * -.42s)}
${kf('nsp', '0%{transform:rotate(0) scale(1)}100%{transform:rotate(1turn) scale(.82)}')}`
      : v[0] === 'poly-cycle'
        ? `.w polygon{stroke:var(--c1,${C1});stroke-width:var(--lw,2.5);fill:none;opacity:0;animation:poly2 var(--dur,3.6s) ease-in-out infinite}
${kf('poly2', '0%,20%{opacity:0;transform:scale(.6) rotate(-40deg)}30%,45%{opacity:1;transform:none}60%,100%{opacity:0;transform:scale(1.2) rotate(40deg)}')}
${mapJoin(4, function (i) { return '.w polygon:nth-child(' + (i + 1) + '){animation-delay:' + (i * .9) + 's}'; }, '\n')}`
        : v[0] === 'orbit-squares'
          ? `.w rect{fill:var(--c1,${C1});opacity:.85}
.w circle{fill:var(--c2,${C2})}
.w rect{animation:orb var(--dur,3.2s) ease-in-out infinite;animation-delay:calc(var(--i) * -.12s)}
${kf('orb', '0%,100%{transform:none}50%{transform:translateY(-6px) scale(1.5);fill:var(--c2,#22d3ee)}')}`
          : `.w line{stroke:var(--c1,${C1});stroke-width:var(--lw,2.5)}
.w line{animation:tk var(--dur,2.4s) ease-in-out infinite;animation-delay:calc(var(--i) * -.14s)}
${kf('tk', '0%,60%,100%{opacity:.25;transform:scaleY(1)}20%{opacity:1;transform:scaleY(1.7)}')}`;
    svgItem({ g: 'geometry', name: v[0], title: v[1], inner: inner, css: css });
  });

  /* ───────── 4. radar, sonar, scope ───────── */
  svgItem({
    g: 'radar', name: 'radar-sweep', title: 'Radar Blips',
    inner: '<circle cx="50" cy="50" r="38" stroke="#ffffff1f" stroke-width="1"/><circle cx="50" cy="50" r="24" stroke="#ffffff1a" stroke-width="1"/><line x1="50" y1="10" x2="50" y2="90" stroke="#ffffff14" stroke-width="1"/><line x1="10" y1="50" x2="90" y2="50" stroke="#ffffff14" stroke-width="1"/>' +
      '<g class="sw"><path d="M50 50 50 12A38 38 0 0 1 82 30z" class="wg"/><path d="M50 50 50 12A38 38 0 0 1 66 20z" class="wg2"/></g>' +
      '<circle class="blip" cx="70" cy="34" r="3" fill="var(--c2,#22d3ee)"/><circle class="blip b2" cx="34" cy="66" r="2.5" fill="var(--c1,#7c5cff)"/>' +
      '',
    css: `.w .wg{fill:color-mix(in srgb,var(--c1,${C1}) 34%,transparent)}
.w .wg2{fill:color-mix(in srgb,var(--c1,${C1}) 70%,transparent)}
.w .sw{animation:rad var(--dur,4s) linear infinite;transform-origin:50% 50%;transform-box:view-box}
${kf('rad', 'to{transform:rotate(1turn)}')}
.w .blip{opacity:0;animation:blip var(--dur,4s) linear infinite}
.w .b2{animation-delay:-2.4s}
${kf('blip', '0%,55%{opacity:0;transform:scale(.4)}62%{opacity:1;transform:scale(1.6)}100%{opacity:0;transform:scale(1)}')}`
  });
  [
    ['sonar', 'Sonar Pings', `<circle class="src" cx="50" cy="50" r="6" fill="var(--c1,${C1})"/>` +
      mapJoin(3, function (i) { return '<circle class="rg" cx="50" cy="50" r="10" style="--i:' + i + '" stroke="var(--c2,#22d3ee)" stroke-width="2"/>'; }, ''),
      `.w .rg{fill:none;transform-origin:50% 50%;animation:sg var(--dur,2.6s) ease-out infinite;animation-delay:calc(var(--i) * -.86s)}
${kf('sg', '0%{transform:scale(.3);opacity:.9}100%{transform:scale(4.4);opacity:0}')}
.w .src{animation:sp var(--dur,2.6s) ease-in-out infinite}
${kf('sp', '0%,100%{transform:scale(1)}25%{transform:scale(1.5)}')}`],
    ['scope', 'Oscilloscope Trace', '<line x1="8" y1="50" x2="92" y2="50" stroke="#ffffff17" stroke-width="1"/><path class="tr2" d="M8 50" stroke="var(--c1,#7c5cff)" stroke-width="2.4"/>',
      `.w .tr2{animation:scf var(--dur,2.4s) ease-in-out infinite}
@keyframes scf{0%,100%{opacity:.45}50%{opacity:1}}`, 1],
    ['waveform', 'Waveform Bars', mapJoin(22, function (i) {
      return '<rect x="' + (8 + i * 3.9) + '" y="50" width="2.4" height="4" rx="1.2" fill="var(--c1,#7c5cff)" style="--i:' + i + '"/>';
    }, ''), `.w rect{transform-origin:50% 50%;animation:wb var(--dur,1.6s) ease-in-out infinite alternate;animation-delay:calc(var(--i) * -.07s)}
${kf('wb', '0%{transform:scaleY(1)}100%{transform:scaleY(9)}')}`],
    ['equalizer-bars', 'Equalizer Ring', mapJoin(16, function (i) {
      return '<rect x="48.6" y="12" width="2.8" height="12" rx="1.4" fill="var(--c1,#7c5cff)" style="--i:' + i + '" transform="rotate(' + (i * 22.5) + ' 50 50)"/>';
    }, ''), `.w rect{transform-box:view-box;transform-origin:50% 50%;animation:eq var(--dur,1.8s) ease-in-out infinite alternate;animation-delay:calc(var(--i) * -.11s);transform-origin:50% 50px}
.w rect{transform-box:fill-box}
${kf('eq', '0%{transform:scaleY(.5)}100%{transform:scaleY(1.9)}')}`],
    ['scanline', 'Scanline Reveal', '<rect x="14" y="14" width="72" height="72" rx="10" stroke="var(--c1,#7c5cff)" stroke-width="1.5"/><g class="sl"><rect x="14" y="14" width="72" height="6" fill="var(--c2,#22d3ee)"/></g>' +
      mapJoin(4, function (i) { return '<line x1="20" y1="' + (30 + i * 14) + '" x2="' + (46 + i * 10) + '" y2="' + (30 + i * 14) + '" stroke="#ffffff33" stroke-width="2"/>'; }, ''),
      `.w .sl{animation:sc var(--dur,2.6s) cubic-bezier(.4,0,.6,1) infinite alternate}
${kf('sc', '0%{transform:translateY(0)}100%{transform:translateY(66px)}')}
.w .sl rect{filter:drop-shadow(0 0 6px var(--c2,#22d3ee))}`]
  ].forEach(function (v) {
    svgItem({ g: 'radar', name: v[0], title: v[1], inner: v[2], css: v[3],
      js: v[0] === 'scope' ? 'var p=root.querySelector(".tr2"),t=0;\n' +
        'api.raf(function(){t+=.05;var d="M8 50";for(var x=8;x<=92;x+=2){var y=50+Math.sin((x*.14)+t*3)*16*Math.sin(t*.6+x*.02);d+=" L"+x+" "+y.toFixed(2);}\n' +
        '  p.setAttribute("d",d);});' : undefined });
  });

  /* ───────── 5. clip-path wipes ───────── */
  [
    ['shine-wipe', 'Shine Sweep Icon', `<path class="st2" d="M50 14l11 23 25 3-18 17 5 25-23-13-23 13 5-25-18-17 25-3z" fill="var(--c1,${C1})"/>
<rect class="sh" x="-30" y="-30" width="14" height="160" fill="#ffffff" opacity=".5" transform="rotate(18 50 50)"/>`,
      `.w .sh{animation:swp var(--dur,2.4s) cubic-bezier(.4,0,.2,1) infinite;mix-blend-mode:screen}
.w{clip-path:polygon(50% 14%,61% 37%,86% 40%,68% 57%,73% 82%,50% 69%,27% 82%,32% 57%,14% 40%,39% 37%)}
@keyframes swp{0%{transform:translateX(0) rotate(18deg)}60%,100%{transform:translateX(150px) rotate(18deg)}}`],
    ['curtain', 'Curtain Wipe Fill', `<circle cx="50" cy="50" r="34" stroke="var(--c2,${C2})" stroke-width="2"/>
<circle class="cn" cx="50" cy="50" r="34" fill="var(--c1,${C1})"/>`,
      `.w .cn{clip-path:inset(0 100% 0 0);animation:cw var(--dur,2.6s) cubic-bezier(.5,0,.2,1) infinite alternate}
@keyframes cw{0%{clip-path:inset(0 100% 0 0)}100%{clip-path:inset(0 0 0 0)}}`],
    ['circle-reveal', 'Circle Reveal', `<rect x="12" y="12" width="76" height="76" rx="16" fill="var(--c1,${C1})" class="rv"/>
<rect x="12" y="12" width="76" height="76" rx="16" stroke="var(--c2,${C2})" stroke-width="2"/>`,
      `.w .rv{animation:cr var(--dur,3s) cubic-bezier(.3,1,.3,1) infinite}
@keyframes cr{0%{clip-path:circle(0% at 50% 50%)}45%,70%{clip-path:circle(72% at 50% 50%)}100%{clip-path:circle(0% at 50% 50%)}}`],
    ['blinds', 'Blinds Fill', `<circle cx="50" cy="50" r="36" fill="color-mix(in srgb,var(--c1,${C1}) 18%,transparent)"/>` +
      mapJoin(10, function (i) { return '<rect class="bd" x="' + (14 + i * 7.2) + '" y="6" width="4.6" height="88" rx="2.3" fill="var(--c1,#7c5cff)" style="--i:' + i + '"/>'; }, ''),
      `.w .bd{transform-box:view-box;transform-origin:50% 50px;animation:bb var(--dur,2.2s) ease-in-out infinite;animation-delay:calc(var(--i) * -.08s)}
@keyframes bb{0%,100%{transform:scaleY(.05)}50%{transform:scaleY(1)}}
.w{clip-path:circle(38% at 50% 50%)}`],
    ['duotone-grid', 'Duotone Row Sweep', mapJoin(10, function (i) {
      return '<g style="--i:' + i + '">' + mapJoin(10, function (j) {
        return '<rect x="' + (j * 9.4 + 5) + '" y="' + (i * 9.4 + 5) + '" width="var(--cs,5px)" height="var(--cs,5px)" rx="1.6"/>';
      }, '') + '</g>';
    }, ''), `.w g rect{fill:var(--c1,${C1});opacity:.18}
.w g{animation:dw var(--dur,3.4s) linear infinite;animation-delay:calc(var(--i) * -.14s)}
@keyframes dw{0%,10%{opacity:.2}30%{opacity:1}70%,100%{opacity:.2}}`,
      [range('Size', '--s', 80, 220, 2, 140, 'px'), range('Cell', '--cs', 3, 8, 1, 5, 'px'), col('A', '--c1', C1)]],
    ['hatch-reveal', 'Hatch Reveal', `<path class="hp" d="M50 18 82 78H18z" stroke="var(--c1,${C1})" stroke-width="2"/>
<path class="hf" d="M50 18 82 78H18z" fill="var(--c2,${C2})"/>`,
      `.w .hf{opacity:.9;clip-path:inset(0 0 100% 0);animation:hr var(--dur,3.4s) cubic-bezier(.4,0,.2,1) infinite alternate}
@keyframes hr{0%{clip-path:inset(0 0 100% 0)}100%{clip-path:inset(0 0 0 0)}}
.w .hp{stroke-dasharray:2 4;animation:ants2 var(--dur,6s) linear infinite}
@keyframes ants2{to{stroke-dashoffset:-24}}`]
  ].forEach(function (v) {
    svgItem({ g: 'wipe', name: v[0], title: v[1], inner: v[2], css: v[3], cfg: v[4] || STD });
  });

  /* ───────── 6. progress rings & gauges (JS) ───────── */
  [
    {
      name: 'ring-count', title: 'Counting Progress Ring', g: 'ring',
      inner: `<circle cx="50" cy="50" r="var(--rr,38)" stroke="color-mix(in srgb,var(--c1,${C1}) 20%,transparent)" stroke-width="var(--lw,6)"/>
<circle class="pg" cx="50" cy="50" r="var(--rr,38)" stroke="var(--c1,${C1})" stroke-width="var(--lw,6)" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" transform="rotate(-90 50 50)"/>
<text class="pc" x="50" y="50" text-anchor="middle" dominant-baseline="central" fill="#fff" font-size="18" font-family="JetBrains Mono,monospace" font-weight="700">0%</text>`,
      css: `.w .pg{transition:stroke-dashoffset .18s linear}
.w .pc{letter-spacing:-.04em}`,
      js: 'var pg=root.querySelector(".pg"),tx=root.querySelector(".pc"),p=0,d=1;\n' +
        'api.raf(function(){p+=d*.9;if(p>=100){p=100;d=-1;}if(p<=0){p=0;d=1;}\n' +
        '  pg.style.strokeDashoffset=(1-p/100)+"";tx.textContent=Math.round(p)+"%";});',
      cfg: [range('Size', '--s', 80, 220, 2, 140, 'px'), range('Ring', '--lw', 2, 16, 1, 6, 'px'), range('Radius', '--rr', 20, 46, 1, 38, 'px'), col('Ring', '--c1', C1)]
    },
    {
      name: 'ring-indeterminate', title: 'Indeterminate Arc', g: 'ring',
      inner: '<circle class="ia" cx="50" cy="50" r="34" stroke="var(--c1,#7c5cff)" stroke-width="var(--lw,6)" pathLength="1" stroke-dasharray=".28 1"/>',
      css: `.w .ia{animation:rir var(--dur,1.6s) cubic-bezier(.5,.15,.5,.85) infinite,arot var(--dur,2.2s) linear infinite;transform-box:view-box;transform-origin:50% 50%}
${kf('rir', '0%{stroke-dasharray:.04 1;stroke-dashoffset:0}50%{stroke-dasharray:.42 1;stroke-dashoffset:-.12}100%{stroke-dasharray:.04 1;stroke-dashoffset:-.98}')}
${kf('arot', 'to{transform:rotate(1turn)}')}`
    },
    {
      name: 'dual-ring', title: 'Dual Ring Sync', g: 'ring',
      inner: '<circle cx="50" cy="50" r="38" stroke="#ffffff14" stroke-width="4"/><circle class="d1" cx="50" cy="50" r="38" stroke="var(--c1,#7c5cff)" stroke-width="4" pathLength="1" transform="rotate(-90 50 50)"/>' +
        '<circle cx="50" cy="50" r="27" stroke="#ffffff10" stroke-width="4"/><circle class="d2" cx="50" cy="50" r="27" stroke="var(--c2,#22d3ee)" stroke-width="4" pathLength="1" transform="rotate(-90 50 50)"/>',
      css: `.w .d1{stroke-dasharray:1 1;animation:dr1 var(--dur,3.4s) cubic-bezier(.4,0,.2,1) infinite}
.w .d2{stroke-dasharray:1 1;animation:dr1 var(--dur,3.4s) cubic-bezier(.4,0,.2,1) infinite reverse}
${kf('dr1', '0%{stroke-dashoffset:1}45%,55%{stroke-dashoffset:.18}100%{stroke-dashoffset:1}')}`
    },
    {
      name: 'gauge-needle', title: 'Gauge Needle', g: 'ring',
      inner: '<path d="M16 66a38 38 0 0 1 68 0" stroke="#ffffff1f" stroke-width="var(--lw,7)" stroke-linecap="round"/>' +
        '<path class="ga" d="M16 66a38 38 0 0 1 68 0" stroke="var(--c1,#7c5cff)" stroke-width="var(--lw,7)" pathLength="1" stroke-linecap="round"/>' +
        '<g class="nd"><line x1="50" y1="66" x2="50" y2="34" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="50" cy="66" r="4" fill="var(--c2,#22d3ee)"/></g>' +
        mapJoin(9, function (i) { return '<line x1="50" y1="12" x2="50" y2="17" stroke="#ffffff2e" stroke-width="2" transform="rotate(' + (-112.5 + i * 22.5) + ' 50 66)"/>'; }, ''),
      css: `.w .ga{stroke-dasharray:1 1;stroke-dashoffset:calc(1 - var(--gp,.6));transition:stroke-dashoffset .2s ease}
.w .nd{transform-origin:50px 66px;transform-box:view-box;animation:nd var(--dur,4.4s) cubic-bezier(.34,1.4,.4,1) infinite alternate}
${kf('nd', '0%{transform:rotate(-92deg)}100%{transform:rotate(92deg)}')}`,
      js: 'var ga=root.querySelector(".ga"),t=0;\n' +
        'api.raf(function(){t+=.012;ga.style.strokeDashoffset=(1-(.5+Math.sin(t)*.5))+"";});'
    },
    {
      name: 'seg-dial', title: 'Segmented Dial', g: 'ring',
      inner: mapJoin(12, function (i) {
        return '<rect class="sg" x="47.6" y="10" width="4.8" height="14" rx="2.4" fill="var(--c1,#7c5cff)" transform="rotate(' + (i * 30) + ' 50 50)" style="--i:' + i + '"/>';
      }, '') + '<circle cx="50" cy="50" r="4" fill="#fff"/>',
      css: `.w .sg{opacity:.18;animation:sd var(--dur,1.9s) steps(1,end) infinite;animation-delay:calc(var(--i) * -.158s)}
${kf('sd', '0%,8.4%{opacity:1}8.5%,100%{opacity:.18}')}`
    },
    {
      name: 'countdown-arc', title: 'Countdown Arc', g: 'ring',
      inner: '<circle cx="50" cy="50" r="36" stroke="#ffffff14" stroke-width="5"/><circle class="cd" cx="50" cy="50" r="36" pathLength="1" stroke="var(--c3,#ff5c8a)" stroke-width="5" transform="rotate(-90 50 50)"/>' +
        '<text class="ct" x="50" y="52" text-anchor="middle" fill="#fff" font-size="20" font-weight="700" font-family="JetBrains Mono,monospace">10</text>',
      css: `.w .cd{stroke-dasharray:1 1;transition:stroke-dashoffset .25s linear}
.w .ct{font-variant-numeric:tabular-nums}`,
      js: 'var cd=root.querySelector(".cd"),tx=root.querySelector(".ct"),n=10,f=0;\n' +
        'api.raf(function(){f+=.016;if(f>=1){f=0;n=n<=1?10:n-1;}\n' +
        '  cd.style.strokeDashoffset=(1-(n-1+f)/10)+"";tx.textContent=n;});'
    }
  ].forEach(svgItem);

  /* ───────── 7. charts ───────── */
  [
    {
      name: 'bars-grow', title: 'Bar Chart Grow', g: 'chart',
      inner: mapJoin(8, function (i) {
        var h = [22, 40, 30, 58, 46, 66, 36, 50][i];
        return '<rect class="br" x="' + (10 + i * 11) + '" y="' + (82 - h) + '" width="7.5" height="' + h + '" rx="2.6" fill="var(--c1,#7c5cff)" style="--h:' + h + ';--i:' + i + '"/>';
      }, '') + '<line x1="6" y1="84" x2="94" y2="84" stroke="#ffffff22" stroke-width="1.5"/>',
      css: `.w .br{transform-box:fill-box;transform-origin:50% 100%;animation:bg2 var(--dur,2.8s) cubic-bezier(.3,1.3,.4,1) infinite;animation-delay:calc(var(--i) * -.09s)}
${kf('bg2', '0%{transform:scaleY(.02)}30%,70%{transform:scaleY(1)}100%{transform:scaleY(.02)}')}`
    },
    {
      name: 'line-dots', title: 'Line Chart With Dots', g: 'chart',
      inner: '<path class="lp" pathLength="1" d="M8 70 22 52 36 60 50 32 64 44 78 20 92 30" stroke="var(--c1,#7c5cff)" stroke-width="2.6"/>' +
        '<path class="ar" d="M8 70 22 52 36 60 50 32 64 44 78 20 92 30 92 86 8 86z" fill="color-mix(in srgb,var(--c1,#7c5cff) 22%,transparent)"/>' +
        mapJoin(7, function (i) { return '<circle class="dt" cx="' + (8 + i * 14) + '" cy="' + [70, 52, 60, 32, 44, 20, 30][i] + '" r="3" fill="var(--c2,#22d3ee)" style="--i:' + i + '"/>'; }, ''),
      css: `.w .lp{stroke-dasharray:1;stroke-dashoffset:1;animation:ld var(--dur,3.4s) cubic-bezier(.4,0,.2,1) infinite}
${kf('ld', '0%{stroke-dashoffset:1}45%,75%{stroke-dashoffset:0}100%{stroke-dashoffset:1}')}
.w .dt{opacity:0;animation:dp var(--dur,3.4s) cubic-bezier(.3,1.7,.4,1) infinite;animation-delay:calc(var(--i) * .12s + .4s)}
${kf('dp', '0%,10%{opacity:0;transform:scale(.2)}22%{opacity:1;transform:scale(1.5)}35%,80%{opacity:1;transform:none}100%{opacity:0}')}
.w .ar{opacity:0;animation:ar2 var(--dur,3.4s) ease-out infinite}
${kf('ar2', '0%,20%{opacity:0;transform:translateY(10px)}50%,78%{opacity:1;transform:none}100%{opacity:0}')}`
    },
    {
      name: 'donut', title: 'Donut Slices', g: 'chart',
      inner: mapJoin(4, function (i) {
        return '<circle class="ds" cx="50" cy="50" r="32" pathLength="1" stroke="' + [C1, C2, C3, '#ffd479'][i] + '" stroke-width="14" stroke-dasharray=".26 .74" transform="rotate(' + (i * 90 - 90) + ' 50 50)" style="--i:' + i + '"/>';
      }, ''),
      css: `.w .ds{fill:none;transform-box:view-box;transform-origin:50% 50%;animation:dn var(--dur,4s) cubic-bezier(.4,1.1,.3,1) infinite;animation-delay:calc(var(--i) * -.16s)}
${kf('dn', '0%{stroke-dashoffset:1;opacity:0}25%,70%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:-1;opacity:0}')}
.w .ds:nth-child(odd){animation-direction:normal}`
    },
    {
      name: 'sparkline', title: 'Live Sparkline', g: 'chart',
      inner: '<path class="sk" d="M6 60" stroke="var(--c1,#7c5cff)" stroke-width="2.4" stroke-linecap="round"/>' +
        '<path class="sa" d="M6 60" fill="color-mix(in srgb,var(--c1,#7c5cff) 18%,transparent)"/>',
      css: '.w .sk,.w .sa{transition:none}',
      js: 'var ln=root.querySelector(".sk"),ar=root.querySelector(".sa"),N=30,v=[];\n' +
        'for(var i=0;i<N;i++)v.push(50);\n' +
        'var t=0;\n' +
        'api.raf(function(){t+=.08;v.shift();v.push(50+Math.sin(t)*22+Math.sin(t*2.7)*8);\n' +
        '  var d="",n=v.length;\n' +
        '  for(var i2=0;i2<n;i2++){var x=6+i2*(88/(n-1)),y=90-Math.max(4,Math.min(86,v[i2]));d+=(i2?" L":"M")+x.toFixed(1)+" "+y.toFixed(1);}\n' +
        '  ln.setAttribute("d",d);ar.setAttribute("d",d+" L94 94 L6 94 Z");});'
    },
    {
      name: 'stacked-rows', title: 'Stacked Bar Rows', g: 'chart',
      inner: mapJoin(4, function (i) {
        return '<g class="sr2" style="--i:' + i + '"><rect x="10" y="' + (16 + i * 18) + '" width="' + [54, 38, 62, 30][i] + '" height="9" rx="4.5" fill="var(--c1,#7c5cff)"/>' +
          '<rect x="' + (10 + [54, 38, 62, 30][i]) + '" y="' + (16 + i * 18) + '" width="' + [22, 30, 14, 26][i] + '" height="9" rx="4.5" fill="var(--c2,#22d3ee)"/></g>';
      }, ''),
      css: `.w .sr2{transform-box:view-box;transform-origin:10px 50%;animation:sr var(--dur,3.2s) cubic-bezier(.3,1.2,.4,1) infinite;animation-delay:calc(var(--i) * -.2s)}
${kf('sr', '0%{transform:scaleX(.02)}35%,75%{transform:scaleX(1)}100%{transform:scaleX(.02)}')}`
    },
    {
      name: 'scatter-pop', title: 'Scatter Pop In', g: 'chart',
      inner: '<line x1="10" y1="90" x2="94" y2="90" stroke="#ffffff20" stroke-width="1.5"/><line x1="10" y1="90" x2="10" y2="6" stroke="#ffffff20" stroke-width="1.5"/>' +
        mapJoin(16, function (i) {
          var rnd = K.rng(i * 7 + 3);
          return '<circle class="pt" cx="' + (16 + rnd() * 72).toFixed(1) + '" cy="' + (14 + rnd() * 70).toFixed(1) + '" r="' + (2.4 + rnd() * 3).toFixed(1) + '" fill="var(--c1,#7c5cff)" style="--i:' + i + '"/>';
        }, ''),
      css: `.w .pt{transform-box:fill-box;transform-origin:50% 50%;opacity:.85;animation:spt var(--dur,3.6s) cubic-bezier(.3,1.7,.4,1) infinite;animation-delay:calc(var(--i) * -.19s)}
${kf('spt', '0%{transform:scale(0);opacity:0}12%{transform:scale(1.6);opacity:1}24%{transform:scale(1)}80%{transform:scale(1);opacity:.85}100%{transform:scale(.2);opacity:0}')}`
    },
    {
      name: 'bullet', title: 'Bullet Bars With Target', g: 'chart',
      inner: mapJoin(3, function (i) {
        return '<g class="bu" style="--i:' + i + '"><rect x="10" y="' + (20 + i * 22) + '" width="76" height="10" rx="5" fill="#ffffff12"/>' +
          '<rect class="ff" x="10" y="' + (20 + i * 22) + '" width="' + [58, 40, 68][i] + '" height="10" rx="5" fill="var(--c1,#7c5cff)"/>' +
          '<line x1="' + [64, 52, 74][i] + '" y1="' + (17 + i * 22) + '" x2="' + [64, 52, 74][i] + '" y2="' + (33 + i * 22) + '" stroke="#fff" stroke-width="2.4"/></g>';
      }, ''),
      css: `.w .ff{transform-box:fill-box;transform-origin:0 50%;animation:bl var(--dur,3s) cubic-bezier(.4,1,.3,1) infinite;animation-delay:calc(var(--i) * -.22s)}
${kf('bl', '0%{transform:scaleX(.05)}40%,80%{transform:scaleX(1)}100%{transform:scaleX(.05)}')}`
    },
    {
      name: 'heat-cells', title: 'Heat Map Cells', g: 'chart',
      inner: mapJoin(7, function (i) {
        return mapJoin(10, function (j) {
          var v = Math.round((Math.sin(i * 1.3 + j * .7) + 1) * 50);
          return '<rect class="hc" x="' + (j * 9.4 + 4) + '" y="' + (i * 13 + 6) + '" width="8" height="11" rx="2.4" fill="var(--c1,#7c5cff)" opacity="' + (v / 100).toFixed(2) + '" style="--i:' + ((i + j) % 14) + '"/>';
        }, '');
      }, ''),
      css: `.w .hc{animation:hc var(--dur,3.2s) ease-in-out infinite;animation-delay:calc(var(--i) * -.16s)}
${kf('hc', '0%,100%{opacity:.16}45%{opacity:1}')}`
    }
  ].forEach(svgItem);

  /* ───────── 8. offset-path travel ───────── */
  [
    ['heart-run', 'Dot On A Heart Path', 'M50 82C22 62 14 46 22 34c7-10 21-9 28 2 7-11 21-12 28-2 8 12 0 28-28 48z', 'circle', 8, 'var(--c1,${C1})'],
    ['arc-ball', 'Ball Along An Arc', 'M8 74C28 22 72 22 92 74', 'circle', 9, 'var(--c2,${C2})'],
    ['loop-plane', 'Plane On A Loop', 'M14 50c0-20 22-30 36-16s-4 40-20 40S6 34 20 20s38-8 46 10', 'plane', 11, 'var(--c1,${C1})'],
    ['wave-bead', 'Bead On A Wave', 'M4 60c12-26 20-26 32 0s20 26 32 0 16-20 26 0', 'circle', 7, 'var(--c3,${C3})'],
    ['figure-eight', 'Figure Eight', 'M50 50c14-24 40-16 34 6S56 74 50 50 14 26 16 56s20 18 34-6', 'circle', 8, 'var(--c2,${C2})'],
    ['star-outline', 'Sparkle On A Star', 'M50 14l11 23 25 3-18 17 5 25-23-13-23 13 5-25-18-17 25-3z', 'circle', 6, '#fff']
  ].forEach(function (v) {
    var pth = 'path("' + v[2] + '")';
    svgItem({
      g: 'offset', name: v[0], title: v[1],
      inner: '<path d="' + v[2] + '" stroke="color-mix(in srgb,var(--c1,${C1}) 26%,transparent)" stroke-width="2" stroke-dasharray="3 5"/>' +
        (v[3] === 'plane'
          ? '<path class="mv" d="M0 -7 5 6 0 3 -5 6z" fill="var(--c1,#7c5cff)"/>'
          : '<circle class="mv" r="' + v[4] / 3 + '" fill="' + v[5] + '"/>') +
        '<circle class="mv sh" r="' + (v[4] / 2 + 1) + '" fill="none" stroke="var(--c2,#22d3ee)" stroke-width="1.6" opacity=".5"/>',
      css: `.w .mv{transform-box:view-box;offset-path:${pth};offset-rotate:auto;animation:otr var(--dur,3.2s) linear infinite}
.w .sh{animation:otr var(--dur,3.2s) linear infinite reverse;opacity:.28}
${kf('otr', 'to{offset-distance:100%}')}`
    });
  });

  /* ───────── 9. icon micro-interactions (hover / click) ───────── */
  [
    {
      name: 'ic-burger', title: 'Burger To Arrow', g: 'icon',
      inner: '<line class="l1" x1="22" y1="34" x2="78" y2="34"/><line class="l2" x1="22" y1="50" x2="70" y2="50"/><line class="l3" x1="22" y1="66" x2="78" y2="66"/>',
      css: `.w line{stroke:var(--c1,${C1});stroke-width:var(--lw,6);transition:transform var(--tt,.44s) cubic-bezier(.3,1.5,.4,1),opacity var(--tt,.24s),x2 var(--tt,.4s)}
.w:hover .l1{transform:translateY(16px) rotate(45deg)}
.w:hover .l2{opacity:0;transform:translateX(-24px)}
.w:hover .l3{transform:translateY(-16px) rotate(-45deg)}`
    },
    {
      name: 'ic-search', title: 'Search To Close', g: 'icon',
      inner: '<circle class="mg" cx="44" cy="44" r="20"/><line class="hd" x1="60" y1="60" x2="78" y2="78"/>',
      css: `.w circle,.w line{stroke:var(--c1,${C1});stroke-width:var(--lw,6);transition:transform var(--tt,.46s) cubic-bezier(.3,1.5,.4,1),opacity .3s}
.w:hover .mg{transform:rotate(45deg) scale(1.02)}
.w:hover .hd{transform:rotate(90deg) translate(-14px,14px) scaleX(1.35)}
.w:active .mg{transform:rotate(45deg) scale(.8)}`
    },
    {
      name: 'ic-heart', title: 'Heart Fill Pop', g: 'icon',
      inner: '<path class="ht" d="M50 82C22 62 14 46 22 34c7-10 21-9 28 2 7-11 21-12 28-2 8 12 0 28-28 48z"/>',
      css: `.w .ht{stroke:var(--c3,${C3});stroke-width:var(--lw,5);fill:var(--c3,${C3});fill-opacity:0;transition:fill-opacity var(--tt,.4s),transform var(--tt,.42s) cubic-bezier(.3,1.8,.4,1);transform-origin:50% 60%}
.w:hover .ht{fill-opacity:.28;transform:scale(1.06)}
.w:active .ht{fill-opacity:1;transform:scale(.9)}
.w.on .ht{fill-opacity:1;animation:hb2 var(--dur,.6s) cubic-bezier(.3,1.6,.4,1)}
@keyframes hb2{0%{transform:scale(.7)}45%{transform:scale(1.3)}100%{transform:none}}`
    },
    {
      name: 'ic-bell', title: 'Bell Swing', g: 'icon',
      inner: '<path class="bl2" d="M50 18a20 20 0 0 1 20 20v14l6 10H24l6-10V38a20 20 0 0 1 20-20z"/><path class="cl" d="M42 68a8 8 0 0 0 16 0"/>',
      css: `.w path{stroke:var(--c1,${C1});stroke-width:var(--lw,5)}
.w .bl2{transform-origin:50% 12%;transform-box:view-box}
.w:hover .bl2{animation:bell var(--dur,1.1s) cubic-bezier(.36,.07,.19,.97) 2}
.w:hover .cl{animation:clg var(--dur,1.1s) ease-in-out 2}
${kf('bell', '0%,100%{transform:rotate(0)}12%{transform:rotate(15deg)}28%{transform:rotate(-13deg)}45%{transform:rotate(9deg)}62%{transform:rotate(-6deg)}80%{transform:rotate(3deg)}')}
${kf('clg', '0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}')}`
    },
    {
      name: 'ic-download', title: 'Download Bounce', g: 'icon',
      inner: '<path class="ar2" d="M50 20v40"/><path class="hd2" d="M32 44l18 18 18-18"/><path class="tr" d="M20 76h60"/>',
      css: `.w path{stroke:var(--c1,${C1});stroke-width:var(--lw,6)}
.w .ar2,.w .hd2{transition:transform var(--tt,.4s) cubic-bezier(.3,1.6,.4,1),opacity .3s}
.w:hover .ar2{transform:translateY(10px);opacity:.35}
.w:hover .hd2{transform:translateY(10px)}
.w:hover .tr{stroke:var(--c2,${C2});animation:tr2 var(--dur,.7s) ease-out 2}
${kf('tr2', '0%,100%{transform:scaleX(1)}40%{transform:scaleX(.72)}')}`
    },
    {
      name: 'ic-refresh', title: 'Refresh Spin', g: 'icon',
      inner: '<path class="rf" pathLength="1" d="M78 50a28 28 0 1 1-9-20"/><path class="ah" d="M74 16v16H58"/>',
      css: `.w path{stroke:var(--c1,${C1});stroke-width:var(--lw,6)}
.w .rf{transform-box:view-box;transform-origin:50% 50%}
.w:hover .rf{animation:rfs var(--dur,.9s) cubic-bezier(.5,.1,.5,.9) infinite}
.w:hover .ah{animation:rfs var(--dur,.9s) cubic-bezier(.5,.1,.5,.9) infinite;transform-box:view-box;transform-origin:50% 50%}
${kf('rfs', 'to{transform:rotate(1turn)}')}`
    },
    {
      name: 'ic-trash', title: 'Trash Lid Tilt', g: 'icon',
      inner: '<path class="lid" d="M26 34h48M42 34v-6h16v6"/><path d="M32 34l4 46h28l4-46"/>',
      css: `.w path{stroke:var(--c1,${C1});stroke-width:var(--lw,5)}
.w .lid{transform-origin:50% 100%;transition:transform var(--tt,.4s) cubic-bezier(.3,1.7,.4,1)}
.w:hover .lid{transform:translateY(-6px) rotate(-16deg)}
.w:active .lid{transform:translateY(2px) rotate(8deg)}`
    },
    {
      name: 'ic-plus', title: 'Plus To Minus', g: 'icon',
      inner: '<line class="h" x1="24" y1="50" x2="76" y2="50"/><line class="v" x1="50" y1="24" x2="50" y2="76"/><circle cx="50" cy="50" r="34" stroke="#ffffff18" stroke-width="3"/>',
      css: `.w line{stroke:var(--c1,${C1});stroke-width:var(--lw,6);transition:transform var(--tt,.44s) cubic-bezier(.3,1.5,.4,1),stroke .3s}
.w:hover .v{transform:rotate(90deg) scaleX(.2)}
.w.on .v{transform:rotate(90deg)}
.w:hover .h{stroke:var(--c2,${C2})}`
    },
    {
      name: 'ic-mail', title: 'Envelope Open', g: 'icon',
      inner: '<path d="M16 30h68v44H16z"/><path class="fl" d="M16 32l34 24 34-24"/>',
      css: `.w path{stroke:var(--c1,${C1});stroke-width:var(--lw,5)}
.w .fl{transform-origin:50% 30%;transform-box:view-box;transition:transform var(--tt,.5s) cubic-bezier(.3,1.5,.4,1)}
.w:hover .fl{transform:rotateX(150deg) translateY(-6px)}
.w:hover path:first-child{stroke:var(--c2,${C2})}`
    },
    {
      name: 'ic-bookmark', title: 'Bookmark Wipe', g: 'icon',
      inner: '<path class="bm" d="M30 18h40v64l-20-14-20 14z"/>',
      css: `.w .bm{stroke:var(--c1,${C1});stroke-width:var(--lw,5);fill:var(--c1,${C1});clip-path:inset(100% 0 0 0);transition:clip-path var(--tt,.5s) cubic-bezier(.4,1,.3,1),transform var(--tt,.4s) cubic-bezier(.3,1.7,.4,1)}
.w:hover .bm{clip-path:inset(0 0 0 0);transform:translateY(-3px)}
.w.on .bm{clip-path:inset(0 0 0 0);stroke:var(--c2,${C2});fill:var(--c2,${C2})}`
    },
    {
      name: 'ic-lock', title: 'Lock Shackle Lift', g: 'icon',
      inner: '<rect x="26" y="46" width="48" height="34" rx="8"/><path class="sh2" d="M36 46V34a14 14 0 0 1 28 0v12"/><circle cx="50" cy="62" r="4" fill="var(--c1,#7c5cff)" stroke="none"/>',
      css: `.w rect,.w path{stroke:var(--c1,${C1});stroke-width:var(--lw,5)}
.w .sh2{transform-origin:20% 100%;transform-box:view-box;transition:transform var(--tt,.5s) cubic-bezier(.3,1.6,.4,1)}
.w:hover .sh2{transform:rotate(-24deg) translateY(-6px)}
.w:hover rect{stroke:var(--c2,${C2})}`
    },
    {
      name: 'ic-wifi', title: 'Wifi Stagger', g: 'icon',
      inner: mapJoin(3, function (i) {
        return '<path class="wf2" d="M' + (50 - 14 - i * 13) + ' ' + (56 - i * 8) + 'a' + (18 + i * 16) + ' ' + (18 + i * 16) + ' 0 0 1 ' + (28 + i * 26) + ' 0" style="--i:' + i + '"/>';
      }, '') + '<circle cx="50" cy="68" r="5" fill="var(--c1,#7c5cff)" stroke="none"/>',
      css: `.w .wf2{stroke:var(--c1,${C1});stroke-width:var(--lw,6);opacity:.3;animation:wfi var(--dur,2.2s) ease-in-out infinite;animation-delay:calc(var(--i) * -.24s)}
${kf('wfi', '0%,60%,100%{opacity:.24}30%{opacity:1;stroke:var(--c2,#22d3ee)}')}
.w circle{animation:wfi var(--dur,2.2s) ease-in-out infinite}`
    },
    {
      name: 'ic-send', title: 'Send Plane', g: 'icon',
      inner: '<path class="pl" d="M14 50 86 18 62 84 50 58z"/><path class="ln2" d="M50 58 86 18"/>',
      css: `.w path{stroke:var(--c1,${C1});stroke-width:var(--lw,5);transition:transform var(--tt,.44s) cubic-bezier(.3,1.4,.4,1)}
.w:hover .pl{transform:translate(10px,-6px) rotate(-6deg)}
.w:hover .ln2{stroke-dasharray:60;stroke-dashoffset:60;animation:send var(--tt,.6s) ease-out forwards}
${kf('send', '0%{stroke-dashoffset:60;opacity:1}60%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:-60;opacity:0}')}`
    },
    {
      name: 'ic-mic', title: 'Mic Mute Wave', g: 'icon',
      inner: '<rect x="42" y="14" width="16" height="36" rx="8"/><path d="M30 44a20 20 0 0 0 40 0"/><line x1="50" y1="64" x2="50" y2="80"/>' +
        mapJoin(2, function (i) { return '<path class="wv2" d="M' + (20 - i * 6) + ' 38a' + (16 + i * 8) + ' 16 0 0 0 0 24" style="--i:' + i + '"/>'; }, '') +
        '<line class="m2" x1="24" y1="26" x2="76" y2="74"/>',
      css: `.w rect,.w path,.w line{stroke:var(--c1,${C1});stroke-width:var(--lw,5)}
.w .wv2{opacity:0;transform-origin:100% 50%;transform-box:view-box}
.w:hover .wv2{animation:mwv var(--dur,1.4s) ease-out infinite;animation-delay:calc(var(--i) * -.18s)}
${kf('mwv', '0%{opacity:1;transform:scale(.6)}100%{opacity:0;transform:scale(1.5)}')}
.w .m2{stroke:var(--c3,${C3});stroke-dasharray:80;stroke-dashoffset:80;transition:stroke-dashoffset var(--tt,.4s) .1s}
.w:hover .m2{stroke-dashoffset:0}`
    }
  ].forEach(function (v) {
    svgItem({
      g: 'icon', name: v.name, title: v.title,
      inner: v.inner,
      css: v.css,
      js: v.name === 'ic-heart' || v.name === 'ic-plus' || v.name === 'ic-bookmark'
        ? 'var w=root.querySelector(".w");\n' +
          'w.addEventListener("click",function(){w.classList.toggle("on");});\n' +
          'w.style.cursor="pointer";'
        : undefined
    });
  });

  /* ───────── 10. logo-ish loops ───────── */
  [
    {
      name: 'infinity-travel', title: 'Infinity Loop Travel', g: 'logo',
      inner: '<path class="ip" pathLength="1" d="M28 50c0-14 12-14 22 0s22 14 22 0-12-14-22 0-22 14-22 0z"/>' +
        '<circle class="it" r="5" fill="var(--c2,#22d3ee)"/>',
      css: `.w .ip{stroke:var(--c1,${C1});stroke-width:var(--lw,5);stroke-dasharray:.6 .4;animation:ants3 var(--dur,3s) linear infinite}
${kf('ants3', 'to{stroke-dashoffset:-1}')}
.w .it{offset-path:path("M28 50c0-14 12-14 22 0s22 14 22 0-12-14-22 0-22 14-22 0z");offset-rotate:0deg;animation:itr var(--dur,3s) linear infinite;filter:drop-shadow(0 0 6px var(--c2,#22d3ee))}
${kf('itr', 'to{offset-distance:100%}')}`
    },
    {
      name: 'hex-assemble', title: 'Hexagon Assemble', g: 'logo',
      inner: mapJoin(6, function (i) {
        return '<polygon class="hx" points="0,-14 12,7 -12,7" transform="translate(' + (50 + 22 * Math.cos(i * Math.PI / 3 - Math.PI / 2)).toFixed(1) + ' ' + (50 + 22 * Math.sin(i * Math.PI / 3 - Math.PI / 2)).toFixed(1) + ')" style="--i:' + i + '"/>';
      }, ''),
      css: `.w .hx{fill:var(--c1,${C1});transform-box:fill-box;transform-origin:50% 50%;animation:hxa var(--dur,3.2s) cubic-bezier(.3,1.4,.4,1) infinite;animation-delay:calc(var(--i) * -.12s)}
${kf('hxa', '0%{opacity:0;transform:translate(0,0) scale(.2)}30%,70%{opacity:1;transform:scale(1)}100%{opacity:0;transform:translate(0,-30px) scale(.4) rotate(60deg)}')}`
    },
    {
      name: 'orbit-mark', title: 'Orbit Mark', g: 'logo',
      inner: '<circle cx="50" cy="50" r="9" fill="var(--c1,#7c5cff)"/>' +
        '<g class="ob"><ellipse cx="50" cy="50" rx="38" ry="16" stroke="#ffffff26" stroke-width="2"/><circle cx="88" cy="50" r="5" fill="var(--c2,#22d3ee)"/></g>' +
        '<g class="ob2"><ellipse cx="50" cy="50" rx="16" ry="38" stroke="#ffffff1a" stroke-width="2"/><circle cx="50" cy="12" r="4" fill="var(--c3,#ff5c8a)"/></g>',
      css: `.w .ob,.w .ob2{transform-box:view-box;transform-origin:50% 50%}
.w .ob{animation:orb2 var(--dur,5s) linear infinite}
.w .ob2{animation:orb2 var(--dur,7s) linear infinite reverse}
${kf('orb2', 'to{transform:rotate(1turn)}')}`
    },
    {
      name: 'monogram', title: 'Monogram Draw + Shine', g: 'logo',
      inner: '<path class="mn2" pathLength="1" d="M26 74V26l24 30 24-30v48"/><rect class="shn" x="-40" y="0" width="26" height="100" fill="#fff" opacity=".22" transform="skewX(-16)"/>',
      css: `.w .mn2{stroke:var(--c1,${C1});stroke-width:var(--lw,7);stroke-dasharray:1;stroke-dashoffset:1;animation:mn var(--dur,4s) cubic-bezier(.4,0,.2,1) infinite}
${kf('mn', '0%{stroke-dashoffset:1}30%,70%{stroke-dashoffset:0}100%{stroke-dashoffset:-1}')}
.w .shn{animation:shn var(--dur,4s) ease-in-out infinite;mix-blend-mode:screen}
${kf('shn', '0%,25%{transform:skewX(-16deg) translateX(0)}75%,100%{transform:skewX(-16deg) translateX(150px)}')}`
    },
    {
      name: 'pulse-mark', title: 'Pulse Mark', g: 'logo',
      inner: '<circle class="pm" cx="50" cy="50" r="12" fill="var(--c1,#7c5cff)"/>' +
        mapJoin(3, function (i) { return '<circle class="pr" cx="50" cy="50" r="12" stroke="var(--c1,#7c5cff)" stroke-width="2" style="--i:' + i + '"/>'; }, ''),
      css: `.w .pr{transform-box:view-box;transform-origin:50% 50%;animation:prm var(--dur,2.4s) cubic-bezier(.2,.8,.3,1) infinite;animation-delay:calc(var(--i) * -.8s)}
${kf('prm', '0%{transform:scale(1);opacity:.7}100%{transform:scale(3.4);opacity:0}')}
.w .pm{animation:pm2 var(--dur,2.4s) ease-in-out infinite}
${kf('pm2', '0%,100%{transform:scale(1)}18%{transform:scale(1.3)}')}
.w .pr2{fill:none}`
    },
    {
      name: 'tri-fold', title: 'Trifold Mark', g: 'logo',
      inner: mapJoin(3, function (i) {
        return '<polygon class="tf" points="' + poly(3, 30, 50, 50, -90 + i * 120) + '" style="--i:' + i + '"/>';
      }, ''),
      css: `.w .tf{stroke:var(--c1,${C1});stroke-width:2.5;fill:color-mix(in srgb,var(--c1,${C1}) 30%,transparent);transform-box:view-box;transform-origin:50% 50%;animation:tf2 var(--dur,3.4s) cubic-bezier(.4,1.1,.3,1) infinite;animation-delay:calc(var(--i) * -.28s)}
${kf('tf2', '0%,100%{transform:none;opacity:.35}45%{transform:scale(1.28) rotate(12deg);opacity:1}')}`
    }
  ].forEach(svgItem);

  /* ───────── 11. generative curves (JS) ───────── */
  [
    ['lissajous', 'Lissajous Curve', 1.4, 1, 3, 2],
    ['rose', 'Rose Curve', 1.4, 1, 4, 7],
    ['epicycle', 'Epicycle Sum', 1.4, 1, 5, 3],
    ['butterfly', 'Butterfly Curve', 1.4, 1, 6, 5],
    ['superformula', 'Superformula Blob', 1.4, 1, 2, 7],
    ['harmonograph', 'Harmonograph Decay', 1.4, 1, 8, 4]
  ].forEach(function (v) {
    svgItem({
      g: 'math', name: v[0], title: v[1],
      inner: '<path class="mp" d="M50 50" stroke="var(--c1,#7c5cff)" stroke-width="2" stroke-linecap="round"/><circle class="tip" r="3" fill="var(--c2,#22d3ee)"/>',
      css: '.w .mp{opacity:.9;filter:drop-shadow(0 0 6px color-mix(in srgb,var(--c1,${C1}) 55%,transparent))}\n.w .tip{transition:none}',
      js: 'var p=root.querySelector(".mp"),tip=root.querySelector(".tip"),N=260,pts=[],t=0;\n' +
        'var A=' + v[2] + ',B=' + v[3] + ',a=' + v[4] + ',b=' + v[5] + ';\n' +
        'function xy(k){var s=k*.05,t2;\n' +
        (v[0] === 'lissajous' ? '  return [50+Math.sin(a*s+B)*34,50+Math.sin(b*s)*34];\n' : '') +
        (v[0] === 'rose' ? '  var r=Math.cos(a*s)*36;return [50+r*Math.cos(s),50+r*Math.sin(s)];\n' : '') +
        (v[0] === 'epicycle' ? '  var x=0,y=0;for(var j=1;j<=a;j++){x+=Math.cos(s*j*2)/j;y+=Math.sin(s*j*2)/j;}\n  return [50+x*26,50+y*26];\n' : '') +
        (v[0] === 'butterfly' ? '  var f=Math.exp(Math.cos(s))-2*Math.cos(s*4)+Math.pow(Math.sin(s/5),5);\n  return [50+Math.sin(s*a)*f*11,50+Math.cos(s*b)*f*11];\n' : '') +
        (v[0] === 'superformula' ? '  var m=a,n1=.6,n2=1.4,n3=1.4,r0=Math.pow(Math.pow(Math.abs(Math.cos(m*s/4)),n2)+Math.pow(Math.abs(Math.sin(m*s/4)),n3),-1/n1);\n  return [50+r0*Math.cos(s)*30,50+r0*Math.sin(s)*30];\n' : '') +
        (v[0] === 'harmonograph' ? '  var d=Math.exp(-s*.04);\n  return [50+Math.sin(s*a+1)*36*d,50+Math.sin(s*b)*36*d];\n' : '') +
        '}\n' +
        'api.raf(function(){for(var i=0;i<3;i++){t++;var q=xy(t);pts.push(q);if(pts.length>N)pts.shift();}\n' +
        '  var d2="";for(var j=0;j<pts.length;j++)d2+=(j?" L":"M")+pts[j][0].toFixed(2)+" "+pts[j][1].toFixed(2);\n' +
        '  p.setAttribute("d",d2);tip.setAttribute("cx",pts[pts.length-1][0]);tip.setAttribute("cy",pts[pts.length-1][1]);});'
    });
  });

  /* ───────── 12. glow, flicker, pulse ───────── */
  [
    ['neon-flicker', 'Neon Flicker', `<path class="nf" d="M20 74h60M30 26h40M26 50h48" stroke="var(--c1,${C1})" stroke-width="var(--lw,7)"/>`,
      `.w .nf{animation:nf2 var(--dur,3.4s) steps(1,end) infinite;filter:drop-shadow(0 0 8px var(--c1,${C1}))}
${kf('nf2', '0%,18%{opacity:1}20%{opacity:.18}22%{opacity:1}24%{opacity:.3}26%,64%{opacity:1}66%{opacity:.1}70%{opacity:1}100%{opacity:1}')}`],
    ['glow-pulse', 'Glow Pulse Ring', `<circle class="gp" cx="50" cy="50" r="30" stroke="var(--c1,${C1})" stroke-width="var(--lw,5)"/><circle cx="50" cy="50" r="30" stroke="#ffffff20" stroke-width="2"/>`,
      `.w .gp{animation:glp var(--dur,2.2s) ease-in-out infinite}
${kf('glp', '0%,100%{filter:drop-shadow(0 0 2px var(--c1,#7c5cff));transform:scale(1)}50%{filter:drop-shadow(0 0 16px var(--c1,#7c5cff));transform:scale(1.06)}')}`],
    ['strobe-cross', 'Strobe Cross', `<path d="M50 16v68M16 50h68" stroke="var(--c2,${C2})" stroke-width="var(--lw,6)"/>`,
      `.w path{transform-box:view-box;transform-origin:50% 50%;animation:stb var(--dur,1.6s) cubic-bezier(.3,1.6,.4,1) infinite}
${kf('stb', '0%{transform:scale(.3) rotate(0);opacity:0}30%{opacity:1}60%{transform:scale(1) rotate(45deg);opacity:.5}100%{transform:scale(1.3) rotate(90deg);opacity:0}')}`],
    ['ping-dots', 'Ping Chain', mapJoin(5, function (i) { return '<circle class="pd" cx="' + (18 + i * 16) + '" cy="50" r="6" fill="var(--c1,#7c5cff)" style="--i:' + i + '"/>'; }, ''),
      `.w .pd{transform-box:fill-box;transform-origin:50% 50%;animation:png var(--dur,1.5s) ease-in-out infinite;animation-delay:calc(var(--i) * -.14s)}
${kf('png', '0%,60%,100%{transform:scale(1);fill:var(--c1,#7c5cff)}25%{transform:scale(1.8);fill:var(--c2,#22d3ee)}')}`],
    ['shadow-morph', 'Soft Shadow Morph', `<rect class="sm" x="26" y="26" width="48" height="48" rx="14" fill="var(--c1,${C1})"/>`,
      `.w .sm{animation:sh2 var(--dur,4s) ease-in-out infinite;filter:drop-shadow(0 6px 10px color-mix(in srgb,var(--c1,${C1}) 45%,transparent))}
${kf('sh2', '0%,100%{transform:rotate(0) scale(1);border-radius:14px}33%{transform:rotate(20deg) scale(.9)}66%{transform:rotate(-14deg) scale(1.08)}')}`],
    ['duotone-split', 'Duotone Split Disc', `<circle cx="50" cy="50" r="32" fill="var(--c1,${C1})"/><path class="sp2" d="M50 18a32 32 0 0 1 0 64z" fill="var(--c2,${C2})"/>`,
      `.w .sp2{transform-box:view-box;transform-origin:50% 50%;animation:sp3 var(--dur,3.4s) cubic-bezier(.5,0,.3,1) infinite}
${kf('sp3', '0%,100%{transform:rotate(0)}50%{transform:rotate(180deg) scale(1.02)}')}`],
    ['ekg', 'EKG Trace', `<path class="ek" pathLength="1" d="M4 60h16l6-8 8 26 8-40 8 30 6-8h32" stroke="var(--c3,${C3})" stroke-width="3"/>`,
      `.w .ek{stroke-dasharray:.18 .82;animation:ekg var(--dur,2.2s) linear infinite;filter:drop-shadow(0 0 6px var(--c3,${C3}))}
${kf('ekg', 'to{stroke-dashoffset:-1}')}`],
  ].forEach(function (v) {
    svgItem({ g: 'glow', name: v[0], title: v[1], inner: v[2], css: v[3] });
  });

  K.add('svg', pool);
})(window);
