/* ============================================================
   Backgrounds — generated families
   Each demo is a bounded "canvas of cloth": a .bg panel the size of the card
   stage, so you can see the pattern tile, and copy it straight into a section.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color, cells = K.cells;
  var C1 = '#7c5cff', C2 = '#22d3ee', C3 = '#ff5c8a';
  var pool = [];
  function push(o) { o.family = o.family || 'bg'; pool.push(o); }

  var shell = `.bg{position:relative;width:var(--w,260px);height:var(--h,150px);border-radius:var(--radius,14px);overflow:hidden;background:#0c0c16;border:1px solid rgba(255,255,255,.08);isolation:isolate}
.bg::after{content:"";position:absolute;inset:0;pointer-events:none}`;
  var STD = [
    range('Width', '--w', 160, 420, 4, 260, 'px'),
    range('Height', '--h', 90, 240, 2, 150, 'px'),
    range('Corner', '--radius', 0, 40, 1, 14, 'px'),
    range('Cycle', '--dur', 2, 40, .5, 12, 's'),
    col('Colour', '--c1', C1), col('Colour B', '--c2', C2)
  ];

  function bgFx(o) {
    push({
      family: 'bg:' + o.name, id: 'bg-' + o.name, title: o.title,
      tags: ['background', o.js ? 'js' : 'css', 'pattern'],
      html: '<div class="bg">' + (o.inner || '') + '</div>',
      css: join([shell, o.css, o.frames || '']),
      js: o.js, cfg: STD.concat(o.cfg || [])
    });
  }

  /* ───────── 1. gradient motion ───────── */
  var gradients = [
    ['linear-shift', 'Sliding Linear', 'linear-gradient(120deg,var(--c1,${C1}),#12121f,var(--c2,${C2}),#12121f,var(--c1,${C1})) 0 0/var(--span,300%) 100%', 'bgslide', 'to{background-position:var(--span,300%) 0}', 'linear'],
    ['mesh-blob', 'Mesh Blobs', 'radial-gradient(40% 50% at 20% 30%,color-mix(in srgb,var(--c1,${C1}) 85%,transparent),transparent 70%),radial-gradient(45% 55% at 80% 20%,color-mix(in srgb,var(--c2,${C2}) 75%,transparent),transparent 70%),radial-gradient(50% 60% at 55% 90%,color-mix(in srgb,var(--c3,${C3}) 70%,transparent),transparent 70%),#0c0c16', 'bgmesh', '0%,100%{background-size:100% 100%,100% 100%,100% 100%,100% 100%;background-position:0 0,0 0,0 0,0 0}50%{background-size:130% 120%,120% 130%,125% 115%,100% 100%;background-position:-10% 6%,8% -6%,-6% -8%,0 0}', 'ease-in-out'],
    ['conic-swirl', 'Conic Swirl', 'conic-gradient(from 0deg at 50% 50%,var(--c1,${C1}),var(--c2,${C2}),var(--c3,${C3}),var(--c1,${C1}))', 'bgspin', 'to{transform:rotate(1turn)}', 'linear'],
    ['duotone-wave', 'Duotone Wave', 'linear-gradient(0deg,color-mix(in srgb,var(--c1,${C1}) 70%,transparent),transparent 60%),repeating-linear-gradient(115deg,color-mix(in srgb,var(--c2,${C2}) 35%,transparent) 0 12px,transparent 12px 34px)', 'bgwave', 'to{background-position:0 0,340px 0}', 'linear'],
    ['spotlight-grid', 'Spotlight Grid', 'radial-gradient(circle 120px at 50% 50%,color-mix(in srgb,var(--c1,${C1}) 55%,transparent),transparent 70%),repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0 1px,transparent 1px 40px),repeating-linear-gradient(0deg,rgba(255,255,255,.07) 0 1px,transparent 1px 40px)', 'bgspot', '0%{background-position:0% 50%,0 0,0 0}50%{background-position:100% 50%,0 0,0 0}100%{background-position:0% 50%,0 0,0 0}', 'ease-in-out'],
    ['ink-bloom', 'Ink Bloom', 'radial-gradient(closest-side at 50% 50%,var(--c1,${C1}),transparent 72%),radial-gradient(closest-side at 22% 78%,var(--c2,${C2}),transparent 68%),#0b0b14', 'bgink', '0%{background-size:0 0,0 0,auto}55%{background-size:150% 150%,120% 120%,auto}100%{background-size:190% 190%,170% 170%,auto}', 'ease-out'],
    ['hue-cycle', 'Hue Cycle', 'linear-gradient(140deg,var(--c1,${C1}),var(--c2,${C2}))', 'bghue', 'to{filter:hue-rotate(360deg)}', 'linear'],
    ['vignette-breath', 'Vignette Breathe', 'radial-gradient(60% 60% at 50% 50%,color-mix(in srgb,var(--c1,${C1}) 45%,transparent),transparent 70%),radial-gradient(120% 120% at 50% 50%,transparent 40%,rgba(0,0,0,.75))', 'bgvig', '0%,100%{background-size:100% 100%,100% 100%}50%{background-size:135% 135%,100% 100%}', 'ease-in-out']
  ];
  gradients.forEach(function (g) {
    bgFx({
      name: g[0], title: g[1],
      css: '.bg{background:' + g[2].replace(/\$\{C(\d)\}/g, function (_, i) { return [C1, C2, C3][i - 1]; }) + ';animation:' + g[3] + ' var(--dur,12s) ' + g[5] + ' infinite}',
      frames: kf(g[3], g[4].replace(/\$\{C(\d)\}/g, function (_, i) { return [C1, C2, C3][i - 1]; })),
      cfg: g[0] === 'linear-shift' || g[0] === 'duotone-wave' ? [range('Span', '--span', 150, 500, 10, 300, '%')] : []
    });
  });

  /* ───────── 2. pattern tiles that scroll ───────── */
  var tiles = [
    ['stripes', 'Candy Stripes', 'repeating-linear-gradient(45deg,color-mix(in srgb,var(--c1,${C1}) 65%,transparent) 0 var(--line,14px),transparent 0 var(--line,14px))', 'to{background-position:calc(var(--line,14px) * 2.83) 0}', [range('Stripe', '--line', 4, 40, 1, 14, 'px')]],
    ['checker', 'Checkerboard Drift', 'repeating-conic-gradient(color-mix(in srgb,var(--c2,${C2}) 30%,transparent) 0 25%,transparent 0 50%) 0 0/var(--tile,36px) var(--tile,36px)', 'to{background-position:var(--tile,36px) var(--tile,36px)}', [range('Tile', '--tile', 12, 80, 2, 36, 'px')]],
    ['dots', 'Polka Dot Drift', 'radial-gradient(circle at 50% 50%,var(--c1,${C1}) 0 var(--dot,4px),transparent 0) 0 0/var(--tile,26px) var(--tile,26px)', 'to{background-position:var(--tile,26px) var(--tile,26px)}', [range('Dot', '--dot', 1, 12, 1, 4, 'px'), range('Tile', '--tile', 12, 60, 2, 26, 'px')]],
    ['gridlines', 'Blueprint Grid', 'linear-gradient(rgba(255,255,255,.09) 0 1px,transparent 1px) 0 0/var(--tile,28px) var(--tile,28px),linear-gradient(90deg,rgba(255,255,255,.09) 0 1px,transparent 1px) 0 0/var(--tile,28px) var(--tile,28px),#0b1a2b', 'to{background-position:var(--tile,28px) 0,0 var(--tile,28px),0 0}', [range('Cell', '--tile', 10, 60, 2, 28, 'px')]],
    ['isogrid', 'Isometric Grid', 'repeating-linear-gradient(60deg,rgba(255,255,255,.09) 0 1px,transparent 1px var(--tile,26px)),repeating-linear-gradient(-60deg,rgba(255,255,255,.09) 0 1px,transparent 1px var(--tile,26px)),repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0 1px,transparent 1px var(--tile,26px))', 'to{background-position:0 var(--tile,26px),0 var(--tile,26px),var(--tile,26px) 0}', [range('Cell', '--tile', 12, 60, 2, 26, 'px')]],
    ['herringbone', 'Herringbone Weave', 'repeating-linear-gradient(45deg,color-mix(in srgb,var(--c1,${C1}) 40%,transparent) 0 6px,transparent 6px 24px),repeating-linear-gradient(-45deg,color-mix(in srgb,var(--c2,${C2}) 34%,transparent) 0 6px,transparent 6px 24px)', 'to{background-position:48px 48px,-48px 48px}', []],
    ['plaid', 'Tartan Plaid', 'repeating-linear-gradient(0deg,rgba(255,255,255,.08) 0 8px,transparent 8px 40px),repeating-linear-gradient(90deg,rgba(255,255,255,.08) 0 8px,transparent 8px 40px),repeating-linear-gradient(0deg,color-mix(in srgb,var(--c1,${C1}) 35%,transparent) 0 3px,transparent 3px 60px),repeating-linear-gradient(90deg,color-mix(in srgb,var(--c2,${C2}) 30%,transparent) 0 3px,transparent 3px 60px),#161027', 'to{background-position:0 60px,60px 0,0 -60px,-60px 0}', []],
    ['chevron', 'Chevron Roll', 'repeating-linear-gradient(135deg,color-mix(in srgb,var(--c1,${C1}) 45%,transparent) 0 10px,transparent 10px 20px),repeating-linear-gradient(45deg,color-mix(in srgb,var(--c2,${C2}) 40%,transparent) 0 10px,transparent 10px 20px)', 'to{background-position:40px 40px,-40px 40px}', []],
    ['zigzag', 'Zigzag March', 'conic-gradient(from 135deg at 50% 0,transparent 0 25%,color-mix(in srgb,var(--c1,${C1}) 55%,transparent) 0 50%,transparent 0) 0 0/var(--tile,28px) var(--tile,28px)', 'to{background-position:var(--tile,28px) 0}', [range('Tile', '--tile', 10, 60, 2, 28, 'px')]],
    ['hexagons', 'Hexagon Honeycomb', 'repeating-conic-gradient(from 30deg,#0000 0 60deg,color-mix(in srgb,var(--c2,${C2}) 22%,transparent) 0 120deg) 0 0/var(--tile,40px) calc(var(--tile,40px) * .58)', 'to{background-position:var(--tile,40px) 0}', [range('Cell', '--tile', 18, 90, 2, 40, 'px')]],
    ['triangles', 'Triangle Field', 'conic-gradient(from 210deg at 50% 60%,transparent 0 120deg,color-mix(in srgb,var(--c1,${C1}) 30%,transparent) 0 240deg,transparent 0) 0 0/var(--tile,40px) var(--tile,40px)', 'to{background-position:calc(var(--tile,40px) * -1) var(--tile,40px)}', [range('Tile', '--tile', 16, 80, 2, 40, 'px')]],
    ['scanlines', 'Broadcast Scanlines', 'repeating-linear-gradient(0deg,rgba(255,255,255,.06) 0 2px,transparent 2px 4px),radial-gradient(100% 70% at 50% 50%,color-mix(in srgb,var(--c1,${C1}) 26%,transparent),transparent 70%)', 'to{background-position:0 8px,0 0}', []],
    ['noise-grain', 'Film Grain', 'repeating-conic-gradient(from 0deg,rgba(255,255,255,.05) 0% 25%,transparent 0 50%) 0 0/4px 4px,#101018', 'bgnoise', []],
    ['carbon', 'Carbon Weave', 'repeating-linear-gradient(45deg,#1b1b26 0 6px,#101018 6px 12px),repeating-linear-gradient(-45deg,#15151f 0 6px,#0c0c14 6px 12px)', 'to{background-position:24px 24px,-24px 24px}', []]
  ];
  tiles.forEach(function (t) {
    var frames = t[3] === 'bgnoise'
      ? kf('bgn', '0%{background-position:0 0}20%{background-position:2px -3px}40%{background-position:-3px 1px}60%{background-position:1px 3px}80%{background-position:-2px -1px}100%{background-position:0 0}')
      : kf('bgm', t[3]);
    bgFx({
      name: t[0], title: t[1],
      css: '.bg{background:' + t[2].replace(/\$\{C(\d)\}/g, function (_, i) { return [C1, C2, C3][i - 1]; }) + ';animation:' + (t[3] === 'bgnoise' ? 'bgn' : 'bgm') + ' var(--dur,12s) ' + (t[0] === 'noise-grain' ? 'steps(5,end)' : 'linear') + ' infinite}',
      frames: frames, cfg: t[4]
    });
  });

  /* ───────── 3. weather ───────── */
  function precip(name, title, count, kind, cfg) {
    var drops = '';
    var rnd = K.rng(count * 7 + kind.length);
    for (var i = 0; i < count; i++) {
      drops += '<i style="--i:' + i + ';--x:' + Math.round(rnd() * 100) + '%;--d:' + (rnd() * 3).toFixed(2) + 's;--s:' + (.6 + rnd() * .8).toFixed(2) + '"></i>';
    }
    var frames = kind === 'rain'
      ? kf('pr', '0%{transform:translateY(-20px) scaleY(var(--s,1));opacity:0}10%{opacity:.85}100%{transform:translateY(var(--h,150px)) scaleY(var(--s,1));opacity:.1}')
      : kind === 'snow'
        ? kf('pr', '0%{transform:translate(-10px,-14px);opacity:0}15%{opacity:.9}50%{transform:translate(10px,calc(var(--h,150px)/2))}100%{transform:translate(-6px,var(--h,150px));opacity:0}')
        : kf('pr', '0%{transform:translate(0,-16px) scale(.6);opacity:0}20%{opacity:1}100%{transform:translate(var(--dx,20px),var(--h,150px)) scale(1);opacity:.2}');
    push({
      family: 'bg:weather', id: 'bg-' + name, title: title, tags: ['background', 'weather', 'css'],
      html: '<div class="bg wx">' + drops + '</div>',
      css: join([
        shell,
        '.wx{background:' + (kind === 'rain' ? 'linear-gradient(180deg,#141a2b,#0b0f1a)' : kind === 'snow' ? 'linear-gradient(180deg,#1b2740,#0d1422)' : 'linear-gradient(180deg,#2a1a3a,#100a1c)') + '}',
        '.wx i{position:absolute;top:0;left:var(--x,50%);width:' + (kind === 'rain' ? '2px;height:16px;border-radius:2px;background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--c2,${C2}) 85%,transparent))'.replace('${C2}', C2) : kind === 'snow' ? '4px;height:4px;border-radius:50%;background:rgba(255,255,255,.85)' : '3px;height:9px;border-radius:99px;background:color-mix(in srgb,var(--c1,' + C1 + ') 80%,transparent)') + ';animation:pr var(--dur,1.6s) linear infinite;animation-delay:calc(var(--d,0s) - var(--dur,1.6s))}',
        kind === 'hail' ? '.wx i{box-shadow:0 0 6px rgba(255,255,255,.5)}' : '',
        frames
      ]),
      cfg: STD.concat(cfg || []).concat([range('Fall', '--dur', .4, 5, .1, kind === 'snow' ? 4 : 1.6, 's')])
    });
  }
  precip('rain-heavy', 'Heavy Rain', 44, 'rain');
  precip('rain-soft', 'Soft Drizzle', 24, 'rain');
  precip('snow-gentle', 'Gentle Snow', 34, 'snow');
  precip('snow-thick', 'Snowstorm', 60, 'snow');
  precip('ash-fall', 'Ash Fall', 40, 'hail', [range('Drift', '--dx', -40, 40, 2, 18, 'px')]);
  precip('petals', 'Falling Petals', 22, 'hail');

  /* ───────── 4. sky & space ───────── */
  var sky = [
    ['starfield', 'Starfield Twinkle', function (n) {
      var rnd = K.rng(31), stars = '';
      for (var i = 0; i < n; i++) stars += '<i style="--x:' + Math.round(rnd() * 100) + '%;--y:' + Math.round(rnd() * 100) + '%;--d:' + (rnd() * 3).toFixed(2) + 's;--s:' + (1 + rnd() * 1.6).toFixed(1) + 'px"></i>';
      return {
        inner: stars,
        css: '.bg{background:radial-gradient(120% 90% at 50% 120%,#141a3a,#05050f 70%)}\n' +
          '.bg i{position:absolute;left:var(--x);top:var(--y);width:var(--s);height:var(--s);border-radius:50%;background:#fff;animation:stw 3s ease-in-out infinite;animation-delay:calc(var(--d) * -1s)}\n' +
          kf('stw', '0%,100%{opacity:.2;transform:scale(.7)}50%{opacity:1;transform:scale(1.3)}'),
        cfg: []
      };
    }],
    ['shooting-stars', 'Shooting Star Field', function (n) {
      var rnd = K.rng(77), m = '';
      for (var i = 0; i < n; i++) m += '<i style="--x:' + Math.round(rnd() * 90) + '%;--y:' + Math.round(rnd() * 55) + '%;--d:' + (rnd() * 4).toFixed(2) + 's"></i>';
      return {
        inner: m,
        css: '.bg{background:linear-gradient(180deg,#05050f,#120c24)}\n' +
          '.bg i{position:absolute;left:var(--x);top:var(--y);width:90px;height:1.5px;border-radius:99px;background:linear-gradient(90deg,transparent,#fff);transform:rotate(-28deg);opacity:0;animation:met var(--dur,3.4s) linear infinite;animation-delay:calc(var(--d) * -1s)}\n' +
          '.bg i::after{content:"";position:absolute;right:0;top:-1.5px;width:5px;height:5px;border-radius:50%;background:#fff;box-shadow:0 0 12px 3px rgba(255,255,255,.6)}\n' +
          kf('met', '0%{opacity:0;transform:rotate(-28deg) translateX(60px) scaleX(.2)}12%{opacity:1}45%,100%{opacity:0;transform:rotate(-28deg) translateX(-160px) scaleX(1.4)}'),
        cfg: []
      };
    }],
    ['galaxy-spin', 'Galaxy Spiral', function (n) {
      var dots = '';
      for (var i = 0; i < n; i++) dots += '<i style="--i:' + i + '"></i>';
      return {
        inner: '<span class="core"></span>' + dots,
        css: '.bg{background:radial-gradient(60% 60% at 50% 50%,#1a1030,#05050f 70%)}\n' +
          '.bg .core{position:absolute;left:50%;top:50%;width:22px;height:22px;margin:-11px;border-radius:50%;background:radial-gradient(circle,#fff,' + C1 + ' 60%,transparent);box-shadow:0 0 30px 8px ' + K.rgba(C1, .55) + '}\n' +
          '.bg i{position:absolute;left:50%;top:50%;width:3px;height:3px;border-radius:50%;background:#fff;opacity:.8;transform-origin:0 0;animation:gspin var(--dur,16s) linear infinite}\n' +
          K.mapJoin(n, function (i) {
            return '.bg i:nth-child(' + (i + 2) + '){transform:rotate(' + (i * 137.5) + 'deg) translateX(' + (i * 2.3) + 'px);animation-delay:' + (-i * .34) + 's}';
          }, '\n') + '\n' +
          K.mapJoin(n, function (i) {
            return '@keyframes gspin' + i + '{}';
          }, '').replace(/@keyframes gspin\d+\{\}/g, '') +
          kf('gspin', 'to{transform:rotate(1turn) translateX(96px)}'),
        cfg: []
      };
    }],
    ['aurora', 'Aurora Veils', function () {
      return {
        inner: cells(4, 'b'),
        css: '.bg{background:linear-gradient(180deg,#03060f,#0a1424 60%,#05070f)}\n' +
          '.bg b{position:absolute;left:-20%;width:140%;height:120%;top:-10%;border-radius:50%;filter:blur(var(--blur,14px));mix-blend-mode:screen;opacity:.7;transform-origin:50% 0;animation:aur var(--dur,9s) ease-in-out infinite;animation-delay:calc(var(--i) * -2.2s)}\n' +
          '.bg b:nth-child(1){background:linear-gradient(180deg,transparent 20%,' + K.rgba(C2, .5) + ',' + K.rgba(C1, .45) + ' 70%,transparent)}\n' +
          '.bg b:nth-child(2){background:linear-gradient(180deg,transparent,#34d3998c 40%,transparent 80%);opacity:.55}\n' +
          '.bg b:nth-child(3){background:linear-gradient(180deg,transparent,#a855f78c 45%,transparent 85%);opacity:.45}\n' +
          '.bg b:nth-child(4){background:linear-gradient(180deg,transparent,#f472b68c 50%,transparent 90%);opacity:.35}\n' +
          kf('aur', '0%,100%{transform:skewX(-8deg) scaleY(1)}50%{transform:skewX(10deg) scaleY(1.18) translateY(-6%)}'),
        cfg: [range('Blur', '--blur', 0, 40, 1, 14, 'px')]
      };
    }],
    ['sunburst', 'Sunburst Rays', function () {
      return {
        inner: '',
        css: '.bg{background:repeating-conic-gradient(from 0deg at 50% 120%,' + K.rgba(C1, .45) + ' 0 4deg,transparent 4deg 14deg),radial-gradient(80% 60% at 50% 120%,' + K.rgba(C3, .55) + ',transparent 70%)}\n' +
          '.bg::before{content:"";position:absolute;inset:-40%;background:repeating-conic-gradient(from 0deg at 50% 120%,transparent 0 6deg,' + K.rgba(C2, .3) + ' 6deg 8deg,transparent 8deg 16deg);animation:sweep var(--dur,26s) linear infinite}\n' +
          kf('sweep', 'to{transform:rotate(1turn)}'),
        cfg: []
      };
    }]
  ];
  sky.forEach(function (b) {
    var spec = b[2](b[0] === 'starfield' ? 44 : b[0] === 'shooting-stars' ? 9 : 40);
    push({
      family: 'bg:sky', id: 'bg-' + b[0], title: b[1], tags: ['background', 'sky', 'css'],
      html: '<div class="bg">' + (spec.inner || '') + '</div>',
      css: join([shell, spec.css]), cfg: STD.concat(spec.cfg || [])
    });
  });

  /* ───────── 5. canvas particle fields (JS) ───────── */
  var fields = [
    ['fireflies', 'Firefly Field', '#0b1418', {
      n: 44, r: 2.4, speed: .5, link: 0, hue: ['#ffd166', '#a7f3d0']
    }],
    ['nebula-dust', 'Nebula Dust', '#0a0718', {
      n: 90, r: 1.7, speed: .28, link: 0, hue: ['#7c5cff', '#22d3ee', '#ff5c8a'], drift: true
    }],
    ['bubble-lamp', 'Lava Lamp Bubbles', '#120b1c', {
      n: 7, r: 26, speed: .35, link: 0, hue: ['#ff5c8a', '#ffd479'], blob: true
    }],
    ['constellation', 'Constellation Lines', '#05070f', {
      n: 34, r: 1.9, speed: .22, link: 74, hue: ['#ffffff']
    }],
    ['swarm', 'Boid Swarm', '#0b1020', {
      n: 60, r: 2.2, speed: .9, link: 0, hue: ['#22d3ee'], steer: true
    }],
    ['snow-drift', 'Drifting Snow Canvas', '#101a2b', {
      n: 80, r: 2.1, speed: .5, link: 0, hue: ['#ffffff'], fall: true
    }]
  ];
  fields.forEach(function (f) {
    var o = f[3];
    push({
      family: 'bg:canvas', id: 'bg-' + f[0], title: f[1], tags: ['background', 'js', 'canvas'],
      html: '<div class="bg"><canvas class="cv"></canvas></div>',
      css: join([
        shell,
        '.bg{background:' + f[1 + 1] + '}\n.cv{display:block;width:100%;height:100%}',
        '.bg{border-color:rgba(255,255,255,.06)}'
      ]),
      js: [
        'var c=root.querySelector(".cv"),g=c.getContext("2d"),P=[],W=0,H=0,D=Math.min(2,window.devicePixelRatio||1);',
        'var N=' + o.n + ',R=' + o.r + ',SP=' + o.speed + ',LINK=' + o.link + ',COLS=' + JSON.stringify(o.hue) + ',BLOB=' + !!o.blob + ',FALL=' + !!o.fall + ',DRIFT=' + !!o.drift + ',STEER=' + !!o.steer + ';',
        'function size(){W=c.clientWidth||260;H=c.clientHeight||150;if(c.width!==Math.round(W*D)||c.height!==Math.round(H*D)){c.width=Math.round(W*D);c.height=Math.round(H*D);}}',
        'function mk(){return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*SP,vy:(Math.random()-.5)*SP,p:Math.random()*6.28,r:(BLOB?.6:1)*(.5+Math.random())*R*D,c:COLS[(Math.random()*COLS.length)|0]}}',
        'size();for(var i=0;i<N;i++)P.push(mk());',
        'api.raf(function(){size();g.clearRect(0,0,c.width,c.height);',
        ' for(var i=0;i<P.length;i++){var p=P[i];p.p+=.02*(1+DRIFT);',
        '  p.x+=p.vx*(1+STEER*Math.sin(p.p))*(FALL?0.2:1)*D;p.y+=(p.vy*(FALL?0:1)+(FALL?0.55:0))*D*(1+DRIFT*.4);',
        '  if(p.x<-20)p.x=W+20;if(p.x>W+20)p.x=-20;if(p.y<-20)p.y=H+20;if(p.y>H+20)p.y=-20;',
        '  g.beginPath();',
        '  if(BLOB){for(var a=0;a<6.3;a+=.6){var rr=p.r*(1+Math.sin(p.p*2+a*2)*.22);g.lineTo(p.x+Math.cos(a)*rr,p.y+Math.sin(a)*rr);}',
        '   g.closePath();g.globalAlpha=.5;g.fillStyle=p.c;g.filter="blur("+(4*D)+"px)";g.fill();g.filter="none";}',
        '  else{g.globalAlpha=.85;g.fillStyle=p.c;g.arc(p.x,p.y,p.r*(DRIFT?.7+Math.abs(Math.sin(p.p))*.6:1),0,6.284);g.fill();}',
        '  if(LINK){for(var j=i+1;j<P.length;j++){var q=P[j],dx=q.x-p.x,dy=q.y-p.y,d2=dx*dx+dy*dy,L=LINK*D;if(d2<L*L){g.globalAlpha=(1-d2/(L*L))*.5;g.strokeStyle="rgba(255,255,255,.7)";g.lineWidth=1;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(q.x,q.y);g.stroke();}}}',
        ' }g.globalAlpha=1;});'
      ].join('\n'),
      cfg: STD
    });
  });

  /* ───────── 6. water, ribbons, cloth ───────── */
  [
    ['waves-layered', 'Layered Waves', function (n) {
      return {
        inner: cells(4, 'b'),
        css: '.bg{background:linear-gradient(180deg,#071726,#0b2233 60%,#08131f)}\n' +
          '.bg b{position:absolute;left:-50%;right:-50%;bottom:calc(var(--i) * -8px);height:70%;border-radius:44% 46% 0 0/100% 100% 0 0;background:color-mix(in srgb,var(--c2,${C2}) calc(30% + var(--i) * 14%),transparent);animation:wv var(--dur,7s) ease-in-out infinite;animation-delay:calc(var(--i) * -1.1s);transform-origin:50% 100%}'.replace('${C2}', C2) + '\n' +
          kf('wv', '0%,100%{transform:translateX(-6%) rotate(-2deg) scaleY(1)}50%{transform:translateX(6%) rotate(2deg) scaleY(1.25)}'),
        cfg: []
      };
    }],
    ['ribbon-flow', 'Ribbons', function () {
      return {
        inner: cells(6, 'b'),
        css: '.bg{background:#0a0a14}\n' +
          '.bg b{position:absolute;left:0;right:0;top:calc(var(--i) * var(--gap,20px) - 10px);height:var(--thick,10px);border-radius:99px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--c1,${C1}) 85%,transparent),color-mix(in srgb,var(--c2,${C2}) 85%,transparent),transparent);filter:blur(var(--blur,2px));animation:rb var(--dur,6s) ease-in-out infinite;animation-delay:calc(var(--i) * -.45s);transform-origin:50% 50%}'.replace('${C1}', C1).replace('${C2}', C2) + '\n' +
          kf('rb', '0%,100%{transform:translateX(-14%) scaleY(.6) skewY(-3deg)}50%{transform:translateX(14%) scaleY(1.5) skewY(3deg)}'),
        cfg: [range('Ribbons', '--gap', 6, 40, 1, 20, 'px'), range('Thick', '--thick', 2, 26, 1, 10, 'px'), range('Blur', '--blur', 0, 12, 1, 2, 'px')]
      };
    }],
    ['curtain', 'Theatre Curtain', function () {
      return {
        inner: cells(14),
        css: '.bg{background:#12060c}\n' +
          '.bg i{position:absolute;top:0;bottom:-20%;width:calc(100% / 14 + 2px);left:calc(var(--i) * (100% / 14));background:linear-gradient(90deg,rgba(0,0,0,.55),var(--c3,${C3}) 45%,rgba(0,0,0,.5));border-radius:0 0 50% 50%/0 0 22% 22%;transform-origin:50% 0;animation:cur var(--dur,6s) ease-in-out infinite;animation-delay:calc(var(--i) * -.16s)}'.replace('${C3}', C3) + '\n' +
          kf('cur', '0%,100%{transform:skewX(-4deg) scaleY(1)}50%{transform:skewX(4deg) scaleY(.92)}'),
        cfg: []
      };
    }],
    ['flag-wave', 'Flag Ripple', function () {
      return {
        inner: cells(22),
        css: '.bg{display:grid;place-items:center;background:#0b0b14}\n' +
          '.bg i{width:calc(var(--w2,150px) / 22);height:var(--h2,90px);background:linear-gradient(180deg,var(--c1,${C1}),var(--c2,${C2}));transform:translateY(calc(sin(var(--i) * 40deg) * 10px));animation:fl var(--dur,2.6s) ease-in-out infinite;animation-delay:calc(var(--i) * -.07s);border-radius:2px}'.replace('${C1}', C1).replace('${C2}', C2) + '\n' +
          '.bg{display:flex;align-items:center;justify-content:center;gap:0}\n' +
          kf('fl', '0%,100%{transform:translateY(-9px) scaleY(.94)}50%{transform:translateY(9px) scaleY(1.06)}'),
        cfg: [range('Flag w', '--w2', 90, 240, 4, 150, 'px'), range('Flag h', '--h2', 40, 140, 2, 90, 'px')]
      };
    }],
    ['smoke', 'Smoke Plumes', function () {
      return {
        inner: cells(7, 'b'),
        css: '.bg{background:linear-gradient(180deg,#101018,#06060b)}\n' +
          '.bg b{position:absolute;bottom:-30%;left:calc(8% + var(--i) * 13%);width:38%;height:120%;border-radius:50%;background:radial-gradient(closest-side,color-mix(in srgb,var(--c1,${C1}) 34%,transparent),transparent 72%);filter:blur(8px);opacity:0;animation:sm var(--dur,7s) ease-out infinite;animation-delay:calc(var(--i) * -1s)}'.replace('${C1}', C1) + '\n' +
          kf('sm', '0%{transform:translateY(20%) scale(.5);opacity:0}25%{opacity:.9}100%{transform:translateY(-60%) translateX(14%) scale(1.5);opacity:0}'),
        cfg: []
      };
    }],
    ['tunnel', 'Endless Tunnel', function () {
      return {
        inner: cells(9),
        css: '.bg{display:grid;place-items:center;background:radial-gradient(closest-side,#0d0d1c,#05050c)}\n' +
          '.bg i{position:absolute;width:var(--sz,26px);height:var(--sz,26px);border:2px solid color-mix(in srgb,var(--c2,${C2}) 70%,transparent);border-radius:calc(var(--sz,26px) / 5);animation:tn var(--dur,3.4s) linear infinite;animation-delay:calc(var(--i) * var(--dur,3.4s) / -9);opacity:0;transform-origin:50% 50%}'.replace('${C2}', C2) + '\n' +
          kf('tn', '0%{transform:scale(.12) rotate(0);opacity:0}15%{opacity:.9}100%{transform:scale(6) rotate(45deg);opacity:0}'),
        cfg: [range('Ring', '--sz', 10, 60, 2, 26, 'px')]
      };
    }],
    ['confetti', 'Confetti Drift', function () {
      var rnd = K.rng(1234), bits = '';
      for (var i = 0; i < 34; i++) {
        bits += '<i style="--x:' + Math.round(rnd() * 100) + '%;--d:' + (rnd() * 4).toFixed(2) + 's;--c:' + K.accent(i) + ';--r:' + Math.round(rnd() * 180) + 'deg"></i>';
      }
      return {
        inner: bits,
        css: '.bg{background:#0c0c16}\n' +
          '.bg i{position:absolute;top:-8%;left:var(--x);width:7px;height:12px;background:var(--c);border-radius:1px;animation:cf var(--dur,3.6s) linear infinite;animation-delay:calc(var(--d) * -1s)}\n' +
          kf('cf', '0%{transform:translateY(0) rotate(var(--r)) ;opacity:0}10%{opacity:1}100%{transform:translateY(calc(var(--h,150px) + 20px)) rotate(calc(var(--r) + 540deg));opacity:.6}'),
        cfg: []
      };
    }],
    ['silk', 'Silk Flow', function () {
      return {
        inner: cells(5, 'b'),
        css: '.bg{background:linear-gradient(140deg,#120c24,#07070f)}\n' +
          '.bg b{position:absolute;inset:-30% -20%;background:repeating-linear-gradient(var(--ang,120deg),color-mix(in srgb,var(--c1,${C1}) 40%,transparent) 0 18px,transparent 18px 44px);filter:blur(10px);mix-blend-mode:screen;opacity:.5;animation:silk var(--dur,11s) ease-in-out infinite;animation-delay:calc(var(--i) * -2s)}'.replace('${C1}', C1) + '\n' +
          kf('silk', '0%,100%{transform:skewY(-4deg) translateX(-6%);filter:blur(10px)}50%{transform:skewY(5deg) translateX(6%);filter:blur(18px)}'),
        cfg: [range('Angle', '--ang', 0, 180, 2, 120, 'deg')]
      };
    }]
  ].forEach(function (b) {
    var spec = b[2]();
    push({
      family: 'bg:cloth', id: 'bg-' + b[0], title: b[1], tags: ['background', 'css', 'layered'],
      html: '<div class="bg">' + (spec.inner || '') + '</div>',
      css: join([shell, spec.css]), cfg: STD.concat(spec.cfg || [])
    });
  });


  /* ───────── 7. more mechanics: grids, optics, screens ───────── */
  [
    ['synthwave-horizon', 'Synthwave Horizon', `.bg{background:linear-gradient(180deg,#1a0b2e 0 46%,#2b0f3a 46% 50%,#06060f 50%)}
.bg::before{content:"";position:absolute;left:-20%;right:-20%;bottom:-30%;height:70%;background:repeating-linear-gradient(90deg,color-mix(in srgb,var(--c2,${C2}) 55%,transparent) 0 2px,transparent 2px 34px),repeating-linear-gradient(0deg,color-mix(in srgb,var(--c1,${C1}) 55%,transparent) 0 2px,transparent 2px 26px);transform:perspective(120px) rotateX(58deg);animation:hz var(--dur,3s) linear infinite}
.bg::after{content:"";position:absolute;left:50%;top:14%;width:64px;height:64px;margin-left:-32px;border-radius:50%;background:linear-gradient(180deg,#ffd479,var(--c3,${C3}));box-shadow:0 0 40px 8px color-mix(in srgb,var(--c3,${C3}) 55%,transparent);animation:sun 6s ease-in-out infinite}
@keyframes hz{to{background-position:0 26px,0 26px}}
@keyframes sun{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(6px) scale(1.06)}}`, [range('Grid', '--dur', .6, 8, .1, 3, 's')]],
    ['laser-grid', 'Laser Intersect', `.bg{background:#05050c}
.bg::before,.bg::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(var(--ang,66deg),transparent 0 calc(var(--gap,26px) - 1px),color-mix(in srgb,var(--c1,${C1}) 80%,transparent) 0 var(--gap,26px));mix-blend-mode:screen;animation:lz var(--dur,7s) linear infinite}
.bg::after{background:repeating-linear-gradient(-66deg,transparent 0 25px,color-mix(in srgb,var(--c2,${C2}) 70%,transparent) 0 26px);animation-direction:reverse}
@keyframes lz{to{background-position:calc(var(--gap,26px) * 4) 0}}`, [range('Gap', '--gap', 8, 60, 1, 26, 'px'), range('Angle', '--ang', 20, 160, 2, 66, 'deg')]],
    ['moire', 'Moiré Rings', `.bg{background:#0b0b14}
.bg::before,.bg::after{content:"";position:absolute;width:180%;aspect-ratio:1;left:-40%;top:-40%;border-radius:50%;background:repeating-radial-gradient(circle,transparent 0 6px,color-mix(in srgb,var(--c2,${C2}) 70%,transparent) 6px 7px);mix-blend-mode:screen;opacity:.6;animation:mr var(--dur,9s) linear infinite}
.bg::after{background:repeating-radial-gradient(circle,transparent 0 7px,color-mix(in srgb,var(--c1,${C1}) 60%,transparent) 7px 8px);animation-direction:reverse;animation-duration:calc(var(--dur,9s) * 1.4)}
@keyframes mr{to{transform:rotate(1turn)}}`, []],
    ['blinds-light', 'Blinds Light Shafts', `.bg{background:linear-gradient(180deg,#0d0f18,#05060a)}
.bg::before{content:"";position:absolute;inset:-30% -20%;background:repeating-linear-gradient(105deg,rgba(255,255,255,.16) 0 12px,transparent 12px 46px);filter:blur(3px);transform-origin:50% 0;animation:bl var(--dur,9s) ease-in-out infinite alternate}
@keyframes bl{0%{transform:skewX(-6deg) translateX(-6%);opacity:.7}100%{transform:skewX(10deg) translateX(6%);opacity:1}}`, []],
    ['led-matrix', 'LED Dot Matrix', `.bg{background:#08080f}
.bg::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.5) 0 1.4px,transparent 1.6px) 0 0/var(--cell,10px) var(--cell,10px);mask-image:linear-gradient(90deg,transparent,#000 30%,#000 70%,transparent);animation:led var(--dur,2.4s) steps(12,end) infinite}
.bg::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--c2,${C2}) 60%,transparent),transparent);width:40%;animation:leds var(--dur,2.4s) steps(12,end) infinite}
@keyframes led{to{background-position:var(--cell,10px) 0}}
@keyframes leds{to{transform:translateX(180%)}}`, [range('Cell', '--cell', 4, 22, 1, 10, 'px')]],
    ['plasma-bands', 'Plasma Bands', `.bg{background:#07070f}
.bg::before{content:"";position:absolute;inset:-20%;background:repeating-radial-gradient(circle at 30% 40%,color-mix(in srgb,var(--c1,${C1}) 45%,transparent) 0 22px,transparent 22px 48px),repeating-radial-gradient(circle at 72% 66%,color-mix(in srgb,var(--c3,${C3}) 40%,transparent) 0 18px,transparent 18px 42px);mix-blend-mode:screen;filter:blur(2px);animation:pl var(--dur,9s) ease-in-out infinite alternate}
@keyframes pl{0%{transform:translate(-6%,-4%) scale(1)}100%{transform:translate(6%,5%) scale(1.16)}}`, []],
    ['hologram', 'Hologram Lines', `.bg{background:linear-gradient(180deg,#04121a,#020a10)}
.bg::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,color-mix(in srgb,var(--c2,${C2}) 28%,transparent) 0 2px,transparent 2px 8px);opacity:.8;animation:hol var(--dur,4s) linear infinite}
.bg::after{content:"";position:absolute;left:0;right:0;height:22%;background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--c2,${C2}) 55%,transparent),transparent);filter:blur(4px);animation:hs 3.2s ease-in-out infinite}
@keyframes hol{to{background-position:0 24px}}
@keyframes hs{0%,100%{transform:translateY(-30%)}50%{transform:translateY(360%)}}`, []],
    ['eq-wall', 'Equaliser Wall', `.bg{display:flex;align-items:flex-end;gap:3px;padding:10px;background:#08080f}
.bg i{flex:1;border-radius:2px 2px 0 0;background:linear-gradient(180deg,var(--c2,${C2}),var(--c1,${C1}));height:20%;animation:eq var(--dur,1.1s) ease-in-out infinite alternate;animation-delay:calc(var(--i) * -.07s)}
@keyframes eq{to{height:96%}}`, []],
    ['dot-warp', 'Warp Dot Field', `.bg{background:#05050c}
.bg::before{content:"";position:absolute;inset:-50%;background:radial-gradient(circle,var(--c2,${C2}) 0 1.5px,transparent 1.7px) 0 0/22px 22px;animation:wp var(--dur,2.6s) linear infinite}
@keyframes wp{0%{transform:scale(.4);opacity:.2}100%{transform:scale(2.4);opacity:0}}`, []],
    ['topo', 'Topographic Lines', `.bg{background:#0a0f0d}
.bg::before{content:"";position:absolute;inset:-30%;background:repeating-radial-gradient(ellipse 60% 40% at 40% 45%,transparent 0 12px,color-mix(in srgb,var(--c1,${C1}) 35%,transparent) 12px 13px),repeating-radial-gradient(ellipse 50% 34% at 74% 62%,transparent 0 10px,color-mix(in srgb,var(--c2,${C2}) 30%,transparent) 10px 11px);animation:tp var(--dur,14s) ease-in-out infinite alternate}
@keyframes tp{0%{transform:scale(1) translate(0,0)}100%{transform:scale(1.14) translate(-4%,3%)}}`, []],
    ['circuit', 'Circuit Traces', `.bg{background:#060a10}
.bg::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,color-mix(in srgb,var(--c2,${C2}) 45%,transparent) 0 1px,transparent 1px 40px) 0 0/40px 40px,linear-gradient(0deg,color-mix(in srgb,var(--c1,${C1}) 30%,transparent) 0 1px,transparent 1px 40px) 0 0/40px 40px;mask-image:conic-gradient(from 0deg at 50% 50%,#000 0 25%,transparent 0 50%,#000 0 75%,transparent 0);opacity:.7}
.bg::after{content:"";position:absolute;inset:0;background:radial-gradient(circle 3px at 20% 30%,#34d399,transparent 4px),radial-gradient(circle 3px at 60% 70%,#34d399,transparent 4px),radial-gradient(circle 3px at 82% 22%,#34d399,transparent 4px);animation:cc var(--dur,3s) steps(3,end) infinite}
@keyframes cc{0%,100%{opacity:.2}50%{opacity:1}}`, []],
    ['rain-glass', 'Rain On Glass', `.bg{background:linear-gradient(180deg,#16233a,#0a1220)}
.bg::before{content:"";position:absolute;inset:0;backdrop-filter:blur(2px);background:radial-gradient(ellipse 6px 10px at 20% 20%,rgba(255,255,255,.55),transparent 60%),radial-gradient(ellipse 4px 7px at 62% 40%,rgba(255,255,255,.45),transparent 60%),radial-gradient(ellipse 8px 14px at 82% 16%,rgba(255,255,255,.5),transparent 60%),radial-gradient(ellipse 5px 9px at 40% 70%,rgba(255,255,255,.4),transparent 60%);animation:rg var(--dur,5s) ease-in-out infinite alternate}
@keyframes rg{0%{transform:translateY(0) scale(1);filter:blur(.4px)}100%{transform:translateY(14px) scale(1.06);filter:blur(1.2px)}}`, []],
    ['caustics', 'Pool Caustics', `.bg{background:linear-gradient(180deg,#06263a,#03131f)}
.bg::before,.bg::after{content:"";position:absolute;inset:-20%;background:repeating-conic-gradient(from 0deg,transparent 0 12deg,color-mix(in srgb,var(--c2,${C2}) 30%,transparent) 12deg 20deg);filter:blur(6px);mix-blend-mode:screen;animation:cs var(--dur,12s) ease-in-out infinite alternate}
.bg::after{animation-duration:calc(var(--dur,12s) * 1.5);animation-direction:reverse;opacity:.6}
@keyframes cs{0%{transform:rotate(0) scale(1)}100%{transform:rotate(24deg) scale(1.2)}}`, []],
    ['kaleido', 'Kaleidoscope', `.bg{background:#0a0714}
.bg::before{content:"";position:absolute;inset:-40%;background:conic-gradient(from 0deg at 50% 50%,var(--c1,${C1}),transparent 12%,var(--c2,${C2}) 22%,transparent 34%,var(--c3,${C3}) 46%,transparent 58%,var(--c1,${C1}) 72%,transparent 86%,var(--c2,${C2}));filter:blur(4px) saturate(1.3);mix-blend-mode:screen;opacity:.75;animation:kl var(--dur,16s) linear infinite}
@keyframes kl{to{transform:rotate(1turn) scale(1.1)}}`, []],
    ['sandstorm', 'Sandstorm Streaks', `.bg{background:linear-gradient(180deg,#2b1d10,#120b06)}
.bg i{position:absolute;top:var(--y,50%);left:-20%;width:var(--len,60px);height:2px;border-radius:2px;background:linear-gradient(90deg,transparent,rgba(255,216,160,.85),transparent);animation:sd var(--dur,1.8s) linear infinite;animation-delay:calc(var(--i) * -.11s)}
@keyframes sd{0%{transform:translateX(0) scaleX(.3);opacity:0}20%{opacity:1}100%{transform:translateX(360px) scaleX(1.6);opacity:0}}`, [range('Streak', '--len', 20, 140, 2, 60, 'px')]]
  ].forEach(function (b, bi) {
    var inner = b[0] === 'eq-wall' ? cells(22) : b[0] === 'sandstorm' ? K.mapJoin(18, function (i) { return '<i style="--i:' + i + ';--y:' + Math.round(K.rng(i + bi + 3)() * 100) + '%"></i>'; }, '') : '';
    push({
      family: 'bg:optics', id: 'bg-' + b[0], title: b[1], tags: ['background', 'css', 'pattern'],
      html: '<div class="bg">' + inner + '</div>',
      css: join([shell, b[2].replace(/\$\{C(\d)\}/g, function (_, i) { return [C1, C2, C3][i - 1]; })]),
      cfg: STD.concat(b[3] || [])
    });
  });


  /* ───────── 8. more pattern mechanics ───────── */
  push({
    family: 'bg:pattern2', id: 'bg-bubbles-rise', title: "Rising Bubbles", tags: ['background', 'css', 'pattern'],
    html: '<div class="bg">' + K.mapJoin(16, function (i) { return '<i style="--i:' + i + ';--x:' + Math.round(K.rng(i + 5)() * 92) + '%"></i>'; }, '') + '</div>',
    css: join([shell, `.bg{background:linear-gradient(180deg,#04121a,#02080f)}
.bg i{position:absolute;bottom:-12%;left:var(--x,20%);width:var(--size,12px);height:var(--size,12px);border-radius:50%;background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.85),rgba(255,255,255,.06) 46%,rgba(34,211,238,.28) 70%);border:1px solid rgba(255,255,255,.28);animation:bu var(--dur,5s) linear infinite;animation-delay:calc(var(--i) * -.5s)}
@keyframes bu{0%{transform:translateY(0) scale(.6);opacity:0}12%{opacity:.9}100%{transform:translateY(calc(var(--h,150px) * -1.2)) translateX(14px) scale(1.15);opacity:0}}`]),
    cfg: STD.concat([range('Bubble', '--size', 4, 30, 1, 12, 'px')])
  });
  push({
    family: 'bg:pattern2', id: 'bg-pulse-rings', title: "Concentric Pulses", tags: ['background', 'css', 'pattern'],
    html: '<div class="bg">' + cells(9) + '</div>',
    css: join([shell, `.bg{background:#07070f;display:grid;place-items:center}
.bg i{position:absolute;width:calc(var(--i) * var(--step,14px) + 20px);height:calc(var(--i) * var(--step,14px) + 20px);border-radius:50%;border:2px solid color-mix(in srgb,var(--c1,${C1}) 60%,transparent);animation:pr2 var(--dur,4s) ease-out infinite;animation-delay:calc(var(--i) * -.28s);opacity:0}
@keyframes pr2{0%{transform:scale(.2);opacity:0}25%{opacity:.85}100%{transform:scale(1.9);opacity:0}}`]),
    cfg: STD.concat([range('Spacing', '--step', 6, 40, 1, 14, 'px')])
  });
  push({
    family: 'bg:pattern2', id: 'bg-dither', title: "Dithered Fade", tags: ['background', 'css', 'pattern'],
    html: '<div class="bg"></div>',
    css: join([shell, `.bg{background:#0b0b14}
.bg::before{content:"";position:absolute;inset:0;background-image:radial-gradient(circle,#fff 0 1px,transparent 1.2px);background-size:var(--cell,7px) var(--cell,7px);mask-image:linear-gradient(120deg,#000 0 20%,transparent 44%,#000 62%,transparent 86%);animation:dh var(--dur,5s) linear infinite;opacity:.55}
@keyframes dh{to{background-position:calc(var(--cell,7px) * 20) 0}}`]),
    cfg: STD.concat([range('Cell', '--cell', 3, 18, 1, 7, 'px')])
  });
  push({
    family: 'bg:pattern2', id: 'bg-bricks', title: "Brick Wall Drift", tags: ['background', 'css', 'pattern'],
    html: '<div class="bg"></div>',
    css: join([shell, `.bg{background:#1a1113}
.bg::before{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.5) 0 2px,transparent 2px var(--h2,18px)),linear-gradient(90deg,rgba(0,0,0,.5) 0 2px,transparent 2px var(--w2,40px));background-size:var(--w2,40px) var(--h2,18px);opacity:.75;animation:bk var(--dur,9s) linear infinite}
.bg::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.5) 0 2px,transparent 2px var(--w2,40px));background-size:var(--w2,40px) var(--h2,18px);background-position:calc(var(--w2,40px)/2) var(--h2,18px);opacity:.5;animation:bk var(--dur,9s) linear infinite}
@keyframes bk{to{background-position:0 var(--h2,18px),calc(var(--w2,40px)/2) calc(var(--h2,18px) * 2)}}`]),
    cfg: STD.concat([range('Brick w', '--w2', 20, 90, 2, 40, 'px'), range('Brick h', '--h2', 8, 40, 1, 18, 'px')])
  });
  push({
    family: 'bg:pattern2', id: 'bg-flowers', title: "Flower Wallpaper", tags: ['background', 'css', 'pattern'],
    html: '<div class="bg"></div>',
    css: join([shell, `.bg{background:#10161d}
.bg::before{content:"";position:absolute;inset:-20%;background:radial-gradient(circle var(--petal,10px) at 50% 30%,color-mix(in srgb,var(--c3,${C3}) 60%,transparent) 0 98%,transparent),radial-gradient(circle var(--petal,10px) at 34% 56%,color-mix(in srgb,var(--c2,${C2}) 50%,transparent) 0 98%,transparent),radial-gradient(circle var(--petal,10px) at 66% 56%,color-mix(in srgb,var(--c1,${C1}) 50%,transparent) 0 98%,transparent);background-size:var(--tile,46px) var(--tile,46px);opacity:.6;animation:flw var(--dur,16s) linear infinite}
@keyframes flw{to{background-position:-46px 46px,-46px -46px,46px -46px}}`]),
    cfg: STD.concat([range('Petal', '--petal', 3, 26, 1, 10, 'px'), range('Tile', '--tile', 24, 90, 2, 46, 'px')])
  });
  push({
    family: 'bg:pattern2', id: 'bg-spiral-lines', title: "Spiral Sweep", tags: ['background', 'css', 'pattern'],
    html: '<div class="bg"></div>',
    css: join([shell, `.bg{background:#08080f}
.bg::before{content:"";position:absolute;inset:-25%;background:conic-gradient(from 0deg,transparent 0 25deg,color-mix(in srgb,var(--c1,${C1}) 55%,transparent) 25deg 30deg,transparent 30deg 55deg,color-mix(in srgb,var(--c2,${C2}) 45%,transparent) 55deg 60deg);border-radius:50%;animation:sp var(--dur,10s) linear infinite}
@keyframes sp{to{transform:rotate(-1turn)}}`]),
    cfg: STD
  });
  push({
    family: 'bg:pattern2', id: 'bg-rainbow-band', title: "Rainbow Band Roll", tags: ['background', 'css', 'pattern'],
    html: '<div class="bg"></div>',
    css: join([shell, `.bg{background:linear-gradient(90deg,#ff5c8a,#ffd479,#34d399,#22d3ee,#7c5cff,#ff5c8a) 0 0/200% 100%;animation:rb2 var(--dur,7s) linear infinite}
.bg::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,.34) 0 3px,transparent 3px 6px)}
@keyframes rb2{to{background-position:-200% 0}}`]),
    cfg: STD
  });
  push({
    family: 'bg:pattern2', id: 'bg-bars-drift', title: "Vertical Bars Drift", tags: ['background', 'css', 'pattern'],
    html: '<div class="bg">' + cells(18) + '</div>',
    css: join([shell, `.bg{background:#0a0a12;display:flex;gap:var(--gap,10px);justify-content:center}
.bg i{width:var(--bw,10px);background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--c1,${C1}) 70%,transparent) 40%,color-mix(in srgb,var(--c2,${C2}) 70%,transparent));animation:bdr var(--dur,3.4s) ease-in-out infinite alternate;animation-delay:calc(var(--i) * -.19s);transform-origin:50% 100%}
@keyframes bdr{0%{transform:scaleY(.25)}100%{transform:scaleY(1)}}`]),
    cfg: STD.concat([range('Bar', '--bw', 3, 30, 1, 10, 'px'), range('Gap', '--gap', 0, 30, 1, 10, 'px')])
  });
  push({
    family: 'bg:pattern2', id: 'bg-checker-warp', title: "Checker Warp", tags: ['background', 'css', 'pattern'],
    html: '<div class="bg"></div>',
    css: join([shell, `.bg{background:#0b0b14}
.bg::before{content:"";position:absolute;inset:-30%;background:repeating-conic-gradient(var(--c1,${C1}) 0 25%,transparent 0 50%) 0 0/var(--tile,32px) var(--tile,32px);transform:perspective(140px) rotateX(58deg);animation:ck var(--dur,4s) linear infinite;opacity:.5}
@keyframes ck{to{background-position:0 var(--tile,32px)}}`]),
    cfg: STD.concat([range('Tile', '--tile', 12, 70, 2, 32, 'px')])
  });
  push({
    family: 'bg:pattern2', id: 'bg-warp-speed', title: "Warp Speed Streaks", tags: ['background', 'css', 'pattern'],
    html: '<div class="bg">' + cells(32) + '</div>',
    css: join([shell, `.bg{background:#04040c;perspective:200px}
.bg i{position:absolute;left:50%;top:50%;width:2px;height:var(--len,36px);background:linear-gradient(180deg,transparent,#fff);transform-origin:50% 0;animation:ws var(--dur,1.6s) cubic-bezier(.4,.1,.6,1) infinite;animation-delay:calc(var(--i) * -.1s)}
@keyframes ws{0%{transform:rotate(calc(var(--i) * 11deg)) translateY(0) scaleY(.2);opacity:0}30%{opacity:1}100%{transform:rotate(calc(var(--i) * 11deg)) translateY(-150px) scaleY(2.4);opacity:0}}`]),
    cfg: STD.concat([range('Streak', '--len', 10, 90, 2, 36, 'px')])
  });

  /* three more, because a collection this size deserves oddballs */
  push({
    family: 'bg:pattern2', id: 'bg-vhs-static', title: 'VHS Static', tags: ['background', 'js', 'canvas'],
    html: '<div class="bg"><canvas class="cv"></canvas></div>',
    css: join([shell, '.bg{background:#0a0a10}\n.cv{display:block;width:100%;height:100%;filter:contrast(1.3) brightness(.9)}']),
    js: 'var c=root.querySelector(".cv"),g=c.getContext("2d"),D=Math.min(2,window.devicePixelRatio||1),t=0;\n' +
        'function size(){var w=c.clientWidth||260,h=c.clientHeight||150;c.width=Math.round(w*D);c.height=Math.round(h*D);}\n' +
        'size();\n' +
        'api.raf(function(){t++;if(t%2===0)size();var w=c.width,h=c.height,img=g.createImageData(w,h),d=img.data;\n' +
        '  for(var i=0;i<d.length;i+=4){var v=(Math.random()*90)|0;d[i]=v;d[i+1]=v;d[i+2]=v+((Math.random()*30)|0);d[i+3]=255;}\n' +
        '  g.putImageData(img,0,0);\n' +
        '  var y=(t*3)%h;g.fillStyle="rgba(255,255,255,.14)";g.fillRect(0,y,w,2*D);\n' +
        '  g.fillStyle="rgba(34,211,238,.1)";g.fillRect(0,(y+h/2)%h,w,10*D);});',
    cfg: STD
  });
  push({
    family: 'bg:pattern2', id: 'bg-retype-lines', title: 'Retype Lines', tags: ['background', 'css', 'text'],
    html: '<div class="bg">' + K.mapJoin(9, function (i) { return '<i style="--i:' + i + '"></i>'; }, '') + '</div>',
    css: join([shell,
      `.bg{background:#07070e;padding:12px;display:grid;align-content:center;gap:7px}
.bg i{display:block;height:7px;border-radius:3px;background:linear-gradient(90deg,color-mix(in srgb,var(--c2,${C2}) 60%,transparent) 0 calc(var(--i) * 9% + 20%),transparent 0);width:calc(52% + var(--i) * 5%);animation:ret var(--dur,4s) steps(24,end) infinite;animation-delay:calc(var(--i) * -.42s)}
@keyframes ret{0%{clip-path:inset(0 100% 0 0)}45%,70%{clip-path:inset(0 0 0 0)}100%{clip-path:inset(0 0 0 100%)}}`]),
    cfg: STD
  });
  push({
    family: 'bg:pattern2', id: 'bg-blur-slugs', title: 'Blur Slugs', tags: ['background', 'css', 'lava'],
    html: '<div class="bg">' + cells(5, 'b') + '</div>',
    css: join([shell,
      `.bg{background:#08060f;filter:saturate(1.2)}
.bg b{position:absolute;left:calc(var(--i) * 18%);top:20%;width:calc(var(--sz,54px) + var(--i) * 8px);height:calc(var(--sz,54px) * 1.6);border-radius:50%;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,${C1}) 75%,transparent),color-mix(in srgb,var(--c3,${C3}) 70%,transparent));filter:blur(var(--blur,14px));animation:lav var(--dur,11s) ease-in-out infinite alternate;animation-delay:calc(var(--i) * -1.7s)}
@keyframes lav{0%{transform:translateY(-26%) scale(1,1.15) rotate(-6deg)}100%{transform:translateY(34%) scale(1.12,.86) rotate(7deg)}}`]),
    cfg: STD.concat([range('Slug', '--sz', 20, 90, 2, 54, 'px'), range('Blur', '--blur', 0, 40, 1, 14, 'px')])
  });

  K.add('backgrounds', pool);
})(window);
