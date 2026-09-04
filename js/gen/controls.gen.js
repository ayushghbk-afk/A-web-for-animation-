/* ============================================================
   Controls & micro-interactions — generated families
   Real <input>/<button> elements inside the demo, so every one of these
   actually works: you can click it, drag it, type in it.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color, cells = K.cells;
  var mapJoin = K.mapJoin, cellsText = K.cellsText;
  var C1 = '#7c5cff', C2 = '#22d3ee', C3 = '#ff5c8a';
  var pool = [];
  function push(o) { o.family = o.family || 'ctl'; pool.push(o); }

  var STD = [
    range('Size', '--sc2', .7, 2, .05, 1, '\u00d7'),
    range('Speed', '--tt', .08, .9, .02, .3, 's'),
    col('Accent', '--c1', C1), col('Accent B', '--c2', C2)
  ];

  /* the shared chrome every control sits in */
  var shell = `.ctl{position:relative;display:inline-flex;align-items:center;gap:10px;font:500 13px/1.25 "Plus Jakarta Sans",system-ui,sans-serif;color:#dcdce8;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;transform:scale(var(--sc2,1));transform-origin:50% 50%}
.ctl input{position:absolute;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none}
.ctl .cap{font:600 11px/1 "JetBrains Mono",monospace;letter-spacing:.08em;text-transform:uppercase;color:#8b8ba3}`;

  function ctl(o) {
    push({
      family: 'ctl:' + o.g, id: 'ctl-' + o.name, title: o.title,
      tags: ['control', o.g].concat(o.tags || ['css']),
      html: o.html, css: join([shell, o.css]), js: o.js, cfg: o.cfg || STD
    });
  }

  /* ───────── switches ───────── */
  var track = `.sw{width:var(--w,46px);height:var(--h,26px);border-radius:99px;background:#22222f;border:1px solid rgba(255,255,255,.14);position:relative;flex:none;transition:background var(--tt,.3s) ease,border-color var(--tt,.3s) ease,box-shadow var(--tt,.3s)}
.sw::after{content:"";position:absolute;left:3px;top:50%;width:calc(var(--h,26px) - 8px);height:calc(var(--h,26px) - 8px);margin-top:calc((var(--h,26px) - 8px) / -2);border-radius:50%;background:#e9e9f5;transition:transform var(--tt,.3s) cubic-bezier(.3,1.4,.5,1),background var(--tt,.3s);will-change:transform}
.ctl input:checked+.sw{background:var(--c1,${C1});border-color:transparent}
.ctl input:checked+.sw::after{transform:translateX(calc(var(--w,46px) - var(--h,26px)))}
.ctl input:focus-visible+.sw{outline:2px solid var(--c2,${C2});outline-offset:2px}
.ctl:active .sw::after{width:calc(var(--h,26px) - 4px)}`;

  [
    ['pill', 'Pill Switch', '', '', []],
    ['bounce', 'Bouncy Switch', '.sw::after{transition-timing-function:cubic-bezier(.34,1.9,.41,1)}', '', []],
    ['neon', 'Neon Switch', `.sw{background:#0c0c16;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1)}
.ctl input:checked+.sw{box-shadow:0 0 16px 2px color-mix(in srgb,var(--c1,${C1}) 60%,transparent),inset 0 0 12px color-mix(in srgb,var(--c1,${C1}) 45%,transparent);background:#12121f}`, '', []],
    ['liquid', 'Liquid Switch', `.sw::after{border-radius:44% 56% 52% 48%/50% 46% 54% 50%;transition:transform var(--tt,.3s) cubic-bezier(.5,1.6,.4,1),border-radius .35s}
.ctl:hover .sw::after{border-radius:56% 44% 48% 52%/46% 54% 46% 54%}
.ctl input:checked+.sw::after{border-radius:50%}`, '', []],
    ['outline', 'Outline Switch', `.sw{background:transparent}
.ctl input:checked+.sw{background:transparent;border-color:var(--c1,${C1})}
.ctl input:checked+.sw::after{background:var(--c1,${C1});box-shadow:0 0 10px color-mix(in srgb,var(--c1,${C1}) 70%,transparent)}`, '', []],
    ['skeleton', 'Skeuomorphic Switch', `.sw{background:linear-gradient(180deg,#0e0e18,#1c1c2a);box-shadow:inset 0 2px 6px rgba(0,0,0,.7),0 1px 0 rgba(255,255,255,.06)}
.sw::after{background:linear-gradient(180deg,#fbfbff,#c9c9d8);box-shadow:0 2px 4px rgba(0,0,0,.5)}
.ctl input:checked+.sw{background:linear-gradient(180deg,color-mix(in srgb,var(--c1,${C1}) 80%,#000),var(--c1,${C1}))}`, '', []],
    ['icon', 'Icon Morph Switch', `.sw{width:52px}
.sw i{position:absolute;top:50%;margin-top:-7px;width:14px;height:14px;transition:opacity var(--tt,.3s),transform var(--tt,.3s) cubic-bezier(.3,1.5,.4,1)}
.sw i:before,.sw i:after{content:"";position:absolute;left:50%;top:50%;width:12px;height:2px;border-radius:2px;background:#9c9cb4;transform:translate(-50%,-50%)}
.sw i.y{left:6px;opacity:0;transform:scale(.4) rotate(-90deg)}
.sw i.y:before{transform:translate(-50%,-50%) rotate(45deg);width:6px;left:3px}
.sw i.y:after{transform:translate(-50%,-50%) rotate(-45deg);width:9px;left:1px}
.sw i.n{right:6px}
.sw i.n:before{transform:translate(-50%,-50%) rotate(45deg)}
.sw i.n:after{transform:translate(-50%,-50%) rotate(-45deg)}
.ctl input:checked+.sw i.y{opacity:1;transform:none}
.ctl input:checked+.sw i.n{opacity:0;transform:scale(.4) rotate(90deg)}
.ctl input:checked+.sw::after{background:#fff}`, '<span class="sw"><i class="y"></i><i class="n"></i></span>', []],
    ['daynight', 'Day / Night Switch', `.sw{width:56px;background:linear-gradient(180deg,#8ec5ff,#cfe6ff)}
.sw::after{background:radial-gradient(circle at 35% 35%,#fff8d0,#ffd479);left:4px}
.ctl input:checked+.sw{background:linear-gradient(180deg,#0b1030,#241a4a)}
.ctl input:checked+.sw::after{background:radial-gradient(circle at 62% 38%,transparent 0 46%,#e6e6ff 47%)}
.sw i{position:absolute;width:2px;height:2px;border-radius:50%;background:#fff;opacity:0;transition:opacity var(--tt,.3s) var(--d,0s)}
.ctl input:checked+.sw i{opacity:.9}`, '<span class="sw"><i style="left:9px;top:7px"></i><i style="left:16px;top:16px"></i><i style="left:24px;top:9px"></i><i style="left:31px;top:19px"></i></span>', []],
    ['textslide', 'On / Off Text Switch', `.sw{width:74px}
.sw b{position:absolute;top:50%;margin-top:-6px;font:700 9px/1 "JetBrains Mono",monospace;letter-spacing:.12em;color:#77778c;transition:transform var(--tt,.3s) cubic-bezier(.3,1.3,.4,1),opacity var(--tt,.3s)}
.sw b.on{left:9px;opacity:0;transform:translateX(-8px)}
.sw b.off{right:9px}
.ctl input:checked+.sw b.on{opacity:1;transform:none}
.ctl input:checked+.sw b.off{opacity:0;transform:translateX(8px)}
.ctl input:checked+.sw::after{background:#fff}`, '<span class="sw"><b class="on">ON</b><b class="off">OFF</b></span>', []],
    ['rocker', 'Rocker Switch', `.sw{width:44px;height:30px;border-radius:8px;background:linear-gradient(180deg,#101018,#26263a)}
.sw::after{left:3px;top:3px;margin:0;width:18px;height:24px;border-radius:5px;background:linear-gradient(180deg,#f2f2fa,#b9b9c9);transition:transform var(--tt,.24s) cubic-bezier(.5,1.5,.5,1);transform-origin:50% 100%}
.ctl input:checked+.sw{background:linear-gradient(180deg,color-mix(in srgb,var(--c1,${C1}) 40%,#101018),color-mix(in srgb,var(--c1,${C1}) 70%,#101018))}
.ctl input:checked+.sw::after{transform:translateX(20px)}
.ctl:active .sw::after{width:18px}`, '', []],
    ['glow-bar', 'Glow Bar Switch', `.sw{width:70px;height:12px;border-radius:99px;background:#181824;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1)}
.sw::after{top:-5px;width:22px;height:22px;margin:0;background:#4a4a60;box-shadow:0 0 0 3px #0d0d16}
.ctl input:checked+.sw::after{background:var(--c1,${C1});box-shadow:0 0 0 3px #0d0d16,0 0 18px 4px color-mix(in srgb,var(--c1,${C1}) 70%,transparent)}
.ctl input:checked+.sw{background:linear-gradient(90deg,color-mix(in srgb,var(--c1,${C1}) 40%,transparent),transparent)}
.sw b{position:absolute;left:0;top:0;height:100%;width:50%;border-radius:99px;background:linear-gradient(90deg,var(--c1,${C1}),transparent);transition:width var(--tt,.3s);z-index:-1}
.ctl input:checked+.sw b{width:100%}`, '<span class="sw"><b></b></span>', []],
    ['confirm', 'Hold To Confirm Switch', `.sw{width:120px;height:30px;border-radius:8px;background:#181826;overflow:hidden}
.sw::after{content:"";position:absolute;inset:0;width:0;background:linear-gradient(90deg,color-mix(in srgb,var(--c1,${C1}) 80%,#000),var(--c1,${C1}));border:0;margin:0;border-radius:0;transition:width .1s linear;opacity:.9}
.ctl input:checked+.sw::after{width:100%;transition:width var(--tt,.3s)}
.ctl input:checked+.sw::after{border-radius:8px}
.sw b{position:absolute;inset:0;display:grid;place-items:center;font:700 10px/1 "JetBrains Mono",monospace;letter-spacing:.14em;color:#9d9db4;text-transform:uppercase;z-index:1}`, '<span class="sw"><b>tap to arm</b></span>', []]
  ].forEach(function (v) {
    ctl({
      g: 'switch', name: v[0], title: v[1],
      html: '<label class="ctl"><input type="checkbox"' + (v[0] === 'pill' ? ' checked' : '') + '><span>' +
        (v[3] || '<span class="sw"></span>') + '</span><span class="cap">' + (v[0] === 'pill' ? 'Wi-Fi' : 'Toggle') + '</span></label>',
      css: track + v[2]
    });
  });

  /* ───────── checkboxes ───────── */
  var box = `.cb{position:relative;width:24px;height:24px;border-radius:7px;flex:none;background:#15151f;border:1.5px solid rgba(255,255,255,.22);transition:background var(--tt,.24s) ease,border-color var(--tt,.24s),transform var(--tt,.24s) cubic-bezier(.3,1.6,.4,1),box-shadow .24s}
.ctl input:checked+.cb{background:var(--c1,${C1});border-color:var(--c1,${C1});box-shadow:0 4px 14px -4px color-mix(in srgb,var(--c1,${C1}) 90%,transparent)}
.ctl:active .cb{transform:scale(.86)}
.ctl input:focus-visible+.cb{outline:2px solid var(--c2,${C2});outline-offset:2px}`;

  var cbs = [
    { name: 'draw', title: 'Stroke Draw Checkbox', inner: '<svg viewBox="0 0 24 24"><path d="M4 13l5 5 11-11"/></svg>',
      css: `.cb svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.cb path{fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:26;stroke-dashoffset:26;transition:stroke-dashoffset var(--tt,.3s) ease .05s}
.ctl input:checked+.cb path{stroke-dashoffset:0}` },
    { name: 'pop', title: 'Pop Checkbox',
      css: `.cb::after{content:"";position:absolute;left:8px;top:4px;width:6px;height:11px;border:2px solid #fff;border-top:0;border-left:0;transform:rotate(45deg) scale(.2);opacity:0;transition:transform var(--tt,.3s) cubic-bezier(.2,1.9,.4,1),opacity .12s}
.ctl input:checked+.cb::after{transform:rotate(45deg) scale(1);opacity:1}` },
    { name: 'confetti', title: 'Confetti Checkbox',
      inner: mapJoin(8, function (i) { return '<i style="--a:' + (i * 45) + 'deg"></i>'; }, ''),
      cap: 'Bookmark',
      css: `.cb::after{content:"";position:absolute;left:8px;top:4px;width:6px;height:11px;border:2px solid #fff;border-top:0;border-left:0;transform:rotate(45deg) scale(0);opacity:0}
.cb i{position:absolute;left:50%;top:50%;width:4px;height:4px;border-radius:50%;background:var(--c2,${C2});opacity:0;pointer-events:none}
.ctl input:checked+.cb::after{transform:rotate(45deg) scale(1);opacity:1;animation:cbpop var(--tt,.4s) cubic-bezier(.2,1.8,.4,1)}
.ctl input:checked+.cb i{animation:cbdust var(--tt,.6s) ease-out backwards}
.ctl input:checked+.cb i:nth-child(2){animation-delay:.02s}
.ctl input:checked+.cb i:nth-child(4){animation-delay:.04s}
.ctl input:checked+.cb i:nth-child(6){animation-delay:.06s}
@keyframes cbpop{0%{transform:rotate(45deg) scale(0)}60%{transform:rotate(45deg) scale(1.3)}100%{transform:rotate(45deg) scale(1)}}
@keyframes cbdust{0%{opacity:1;transform:translate(-50%,-50%) rotate(var(--a,0deg)) translateX(0) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) rotate(var(--a,0deg)) translateX(22px) scale(.2)}}` },
    { name: 'todo', title: 'Todo Strike Checkbox', cap: 'Buy milk',
      css: `.cb{width:20px;height:20px;border-radius:50%}
.cb::after{content:"";position:absolute;left:-2px;top:50%;width:0;height:2px;border-radius:2px;background:#fff;transition:width var(--tt,.3s) cubic-bezier(.2,1,.3,1)}
.ctl input:checked+.cb{background:transparent;border-color:#4a4a5e}
.ctl input:checked+.cb::after{width:150%}
.cap{transition:color var(--tt,.3s),opacity var(--tt,.3s);position:relative}
.ctl input:checked~.cap{color:#6f6f85}` },
    { name: 'cross', title: 'Cross-out Checkbox',
      css: `.cb::before,.cb::after{content:"";position:absolute;left:4px;top:10px;width:17px;height:2.5px;border-radius:2px;background:#fff;transform:rotate(-45deg) scaleX(0);transition:transform var(--tt,.3s) cubic-bezier(.2,1.4,.4,1)}
.cb::after{transform:rotate(45deg) scaleX(0)}
.ctl input:checked+.cb{background:var(--c3,${C3});border-color:var(--c3,${C3});box-shadow:0 4px 14px -4px color-mix(in srgb,var(--c3,${C3}) 90%,transparent)}
.ctl input:checked+.cb::before{transform:rotate(-45deg) scaleX(1)}
.ctl input:checked+.cb::after{transform:rotate(45deg) scaleX(1)}` },
    { name: 'wipe', title: 'Wipe Fill Checkbox',
      css: `.cb{overflow:hidden}
.cb::before{content:"";position:absolute;inset:0;background:var(--c1,${C1});transform:translate(-100%,-100%);transition:transform var(--tt,.36s) cubic-bezier(.4,0,.2,1)}
.cb::after{content:"";position:absolute;left:8px;top:4px;width:6px;height:11px;border:2px solid #fff;border-top:0;border-left:0;transform:rotate(45deg) scale(.3);opacity:0;transition:transform .2s .12s,opacity .2s .12s}
.ctl input:checked+.cb{background:#15151f;border-color:var(--c1,${C1})}
.ctl input:checked+.cb::before{transform:none}
.ctl input:checked+.cb::after{transform:rotate(45deg) scale(1);opacity:1}` },
    { name: 'stamp', title: 'Stamp Checkbox',
      css: `.cb::after{content:"\\2713";position:absolute;inset:0;display:grid;place-items:center;color:#fff;font:700 15px/1 system-ui;transform:scale(2.4);opacity:0;transition:transform var(--tt,.3s) cubic-bezier(.2,1.6,.4,1),opacity .1s}
.ctl input:checked+.cb::after{transform:scale(1);opacity:1}
.ctl input:checked+.cb{animation:stmp var(--tt,.4s) ease-out}
@keyframes stmp{0%{transform:scale(.7)}55%{transform:scale(1.12)}100%{transform:scale(1)}}` },
    { name: 'slide-tick', title: 'Sliding Tick Checkbox', inner: '<i></i>',
      css: `.cb{border-radius:6px;overflow:hidden}
.cb::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,var(--c1,${C1}),color-mix(in srgb,var(--c1,${C1}) 55%,#000));transform:translateY(101%);transition:transform var(--tt,.34s) cubic-bezier(.4,1.3,.4,1)}
.cb i{position:absolute;left:8px;top:4px;width:6px;height:11px;border:2px solid #fff;border-top:0;border-left:0;transform:rotate(45deg) translateY(22px);transition:transform var(--tt,.34s) cubic-bezier(.4,1.3,.4,1);z-index:1}
.ctl input:checked+.cb{border-color:var(--c1,${C1})}
.ctl input:checked+.cb::after{transform:none}
.ctl input:checked+.cb i{transform:rotate(45deg) translateY(0)}` },
    { name: 'radio-dot', title: 'Radio Dot', cap: 'Selected',
      css: `.cb{border-radius:50%}
.cb::after{content:"";position:absolute;inset:4px;border-radius:50%;background:var(--c1,${C1});transform:scale(0);transition:transform var(--tt,.3s) cubic-bezier(.2,1.8,.4,1)}
.ctl input:checked+.cb{border-color:var(--c1,${C1});background:#15151f;box-shadow:none}
.ctl input:checked+.cb::after{transform:scale(1)}` },
    { name: 'ring-draw', title: 'Radio Ring Draw', inner: '<svg viewBox="0 0 28 28"><circle cx="14" cy="14" r="12"/></svg>', cap: 'Airplane mode',
      css: `.cb{border-radius:50%;background:transparent}
.cb svg{position:absolute;inset:-2px;transform:rotate(-90deg);width:calc(100% + 4px);height:calc(100% + 4px)}
.cb circle{fill:none;stroke:var(--c1,${C1});stroke-width:2.5;stroke-dasharray:76;stroke-dashoffset:76;transition:stroke-dashoffset var(--tt,.5s) cubic-bezier(.4,0,.2,1)}
.cb::after{content:"";position:absolute;inset:6px;border-radius:50%;background:var(--c1,${C1});transform:scale(0);transition:transform var(--tt,.3s) .1s cubic-bezier(.2,1.7,.4,1);box-shadow:none}
.ctl input:checked+.cb{border-color:rgba(255,255,255,.2);box-shadow:none}
.ctl input:checked+.cb circle{stroke-dashoffset:0}
.ctl input:checked+.cb::after{transform:scale(1)}` }
  ];
  cbs.forEach(function (v) {
    ctl({
      g: 'checkbox', name: v.name, title: v.title,
      html: '<label class="ctl"><input type="checkbox" checked><span class="cb">' + (v.inner || '') +
        '</span><span class="cap">' + (v.cap || 'Label') + '</span></label>',
      css: box + (v.css || '')
    });
  });

  /* ───────── ratings ───────── */
  var rt = `.rt{display:inline-flex;align-items:center;gap:var(--gap,5px);transform:scale(var(--sc2,1))}
.rt i{width:var(--is,24px);height:var(--is,24px);display:grid;place-items:center;cursor:pointer;color:#3a3a4c;font-size:calc(var(--is,24px) * .8);transition:color var(--tt,.22s),transform var(--tt,.3s) cubic-bezier(.3,1.7,.4,1);flex:none}
.rt i.on{color:var(--c1,${C1});text-shadow:0 0 12px color-mix(in srgb,var(--c1,${C1}) 55%,transparent)}
.rt i.hit{animation:rtp var(--tt,.42s) cubic-bezier(.3,1.7,.4,1)}
@keyframes rtp{0%{transform:scale(.6)}45%{transform:scale(1.35) rotate(-6deg)}100%{transform:none}}
.rt .num{margin-left:6px;font:700 12px/1 "JetBrains Mono",monospace;color:#c9c9dc;min-width:26px}
.rt .bar{position:relative;height:8px;width:var(--bw,120px);border-radius:99px;background:#22222f;overflow:hidden}
.rt .bar b{position:absolute;inset:0;width:0;border-radius:99px;background:linear-gradient(90deg,var(--c1,${C1}),var(--c2,${C2}));transition:width var(--tt,.4s) cubic-bezier(.3,1.2,.4,1)}
.rt .face{font-size:26px;line-height:1;transition:transform var(--tt,.3s) cubic-bezier(.3,1.7,.4,1)}`;
  function starHtml(n, ch) {
    return '<span class="ctl rt">' + mapJoin(n, function (i) { return '<i data-v="' + (i + 1) + '">' + ch + '</i>'; }, '') + '<span class="num">0</span></span>';
  }
  var RTJS = 'var rt=root.querySelector(".rt"),ns=[].slice.call(rt.querySelectorAll("i")),num=rt.querySelector(".num"),cur=0;\n' +
    'function paint(n,animate){ns.forEach(function(s,i){var on=i<n;s.classList.toggle("on",on);\n' +
    '  if(on&&animate){s.classList.remove("hit");void s.offsetWidth;s.style.animationDelay=(i*.045)+"s";s.classList.add("hit");}});\n' +
    '  num.textContent=n?n+"/"+ns.length:"rate";}\n' +
    'rt.addEventListener("pointermove",function(e){var t=e.target.closest?e.target.closest("i"):null;if(t)paint(+t.dataset.v);});\n' +
    'rt.addEventListener("pointerleave",function(){paint(cur);});\n' +
    'rt.addEventListener("click",function(e){var t=e.target.closest?e.target.closest("i"):null;if(!t)return;cur=+t.dataset.v;paint(cur,1);});\n' +
    'paint(0);';
  [
    ['stars', 'Star Rate', 5, '★', RTJS, [range('Star', '--is', 14, 40, 1, 24, 'px')]],
    ['hearts', 'Heart Rating', 5, '&#9829;', RTJS, []],
    ['flame', 'Flame Rating', 4, '&#9679;', RTJS, []],
    ['bars', 'Bar Rating', 0, '', 'var rt=root.querySelector(".rt"),bar=rt.querySelector(".bar b"),ns=[].slice.call(rt.querySelectorAll("i")),num=rt.querySelector(".num");\n' +
      '[].forEach.call(ns,function(s){s.addEventListener("click",function(){var v=+s.dataset.v;bar.style.width=(v/ns.length*100)+"%";num.textContent=v+".0";\n' +
      '  ns.forEach(function(t,i){t.classList.toggle("on",i<v);});});});\n' +
      'num.textContent="0.0";', []],
    ['emoji', 'Mood Picker', 0, '', 'var rt=root.querySelector(".rt"),f=rt.querySelector(".face"),ns=[].slice.call(rt.querySelectorAll("i"));\n' +
      '[].forEach.call(ns,function(s){s.addEventListener("click",function(){ns.forEach(function(t){t.classList.remove("on");});s.classList.add("on");\n' +
      '  f.textContent=s.dataset.f;f.style.transform="scale(.5)";setTimeout(function(){f.style.transform="";},90);});});', []],
    ['thumb', 'Thumbs Toggle', 0, '', 'var rt=root.querySelector(".rt"),ns=[].slice.call(rt.querySelectorAll("i"));\n' +
      '[].forEach.call(ns,function(s){s.addEventListener("click",function(){ns.forEach(function(t){if(t!==s)t.classList.remove("on");});\n' +
      '  s.classList.toggle("on");});});', []]
  ].forEach(function (v) {
    var inner = v[0] === 'bars'
      ? '<span class="ctl rt"><span class="bar"><b></b></span>' + mapJoin(5, function (i) { return '<i data-v="' + (i + 1) + '">&#9646;</i>'; }, '') + '<span class="num">0.0</span></span>'
      : v[0] === 'emoji'
        ? '<span class="ctl rt"><span class="face">&#128529;</span>' + mapJoin(5, function (i) { return '<i data-v="' + (i + 1) + '" data-f="' + ['&#128545;', '&#128533;', '&#128528;', '&#128524;', '&#128525;'][i] + '">&#9679;</i>'; }, '') + '</span>'
        : v[0] === 'thumb'
          ? '<span class="ctl rt"><i data-v="1" style="font-size:22px">&#128077;</i><i data-v="2" style="font-size:22px">&#128078;</i></span>'
          : starHtml(v[2], v[3]);
    ctl({
      g: 'rating', name: v[0], title: v[1], html: inner,
      css: join([rt, v[0] === 'emoji' ? '.rt i{width:16px;height:16px;font-size:9px;border-radius:50%;background:#1c1c28}' : '']),
      js: v[4], cfg: STD.concat(v[5])
    });
  });

  /* ───────── tabs & accordions ───────── */
  ctl({
    g: 'tabs', name: 'underline-tabs', title: 'Measured Underline Tabs',
    html: '<div class="ctl tb"><span class="bar"><b class="ind"></b></span>' +
      mapJoin(4, function (i) { return '<button data-i="' + i + '"' + (i === 1 ? ' class="on"' : '') + '>' + ['Overview', 'Motion', 'Tokens', 'Notes'][i] + '</button>'; }, '') + '</div>',
    css: join([shell, `.tb{display:grid;gap:0;width:min(280px,92%)}
.tb button{-webkit-appearance:none;appearance:none;border:0;background:transparent;cursor:pointer;padding:9px 12px;font:600 12px/1 "Plus Jakarta Sans",system-ui;color:#8b8ba3;transition:color var(--tt,.28s),transform var(--tt,.28s) cubic-bezier(.3,1.5,.4,1)}
.tb button.on{color:#fff}
.tb button:active{transform:translateY(1px)}
.tb .bar{position:relative;height:2px;background:#1e1e2c;border-radius:2px;display:flex}
.tb .ind{position:absolute;left:0;top:0;height:100%;width:25%;border-radius:2px;background:linear-gradient(90deg,var(--c1,${C1}),var(--c2,${C2}));box-shadow:0 0 12px color-mix(in srgb,var(--c1,${C1}) 70%,transparent);transition:transform var(--tt,.42s) cubic-bezier(.4,1.2,.4,1),width var(--tt,.42s) cubic-bezier(.4,1.2,.4,1)}
.tb .pan{position:relative;height:44px;overflow:hidden}
.tb .pan p{position:absolute;inset:0;margin:0;padding:10px 2px;font-size:12px;color:#9a9ab0;opacity:0;transform:translateY(8px);transition:opacity var(--tt,.3s),transform var(--tt,.34s) cubic-bezier(.3,1.3,.4,1)}
.tb .pan p.on{opacity:1;transform:none}`]),
    js: 'var tb=root.querySelector(".tb"),ind=tb.querySelector(".ind"),bs=[].slice.call(tb.querySelectorAll("button"));\n' +
      'var ps=[].slice.call(tb.querySelectorAll(".pan p"));\n' +
      'function sel(i){bs.forEach(function(b,n){b.classList.toggle("on",n===i);});ps.forEach(function(p,n){p.classList.toggle("on",n===i);});\n' +
      '  var r=bs[i].getBoundingClientRect(),b0=bs[0].getBoundingClientRect();\n' +
      '  ind.style.width=Math.max(20,r.width||60)+"px";ind.style.transform="translateX("+Math.max(0,r.left-b0.left)+"px)";tb.__r=1;}\n' +
      'bs.forEach(function(b,i){b.addEventListener("click",function(){sel(i);});});sel(1);\n' +
      'tb.addEventListener("keydown",function(e){var i=0;bs.forEach(function(b,n){if(b.classList.contains("on"))i=n;});\n' +
      '  if(e.key==="ArrowRight")sel(Math.min(bs.length-1,i+1));\n' +
      '  if(e.key==="ArrowLeft")sel(Math.max(0,i-1));});',
    cfg: STD
  });
  ctl({
    g: 'tabs', name: 'pill-tabs', title: 'Pill Tabs (CSS only)',
    html: '<div class="ctl g2">' + mapJoin(3, function (i) {
      return '<label><input type="radio" name="t"' + (i === 0 ? ' checked' : '') + '><span>' + ['Design', 'Build', 'Ship'][i] + '</span></label>';
    }, '') + '<b class="pill"></b></div>',
    css: join([shell, `.g2{position:relative;display:inline-flex;padding:4px;border-radius:99px;background:#12121c;border:1px solid rgba(255,255,255,.1)}
.g2 label{position:relative;z-index:1;padding:7px 14px;border-radius:99px;font:600 11px/1 "JetBrains Mono",monospace;letter-spacing:.05em;text-transform:uppercase;color:#8f8fa6;cursor:pointer;transition:color var(--tt,.3s)}
.g2 input{position:absolute;opacity:0;width:1px;height:1px}
.g2 .pill{position:absolute;z-index:0;left:4px;top:4px;height:calc(100% - 8px);width:calc((100% - 8px) / 3);border-radius:99px;background:linear-gradient(180deg,var(--c1,${C1}),color-mix(in srgb,var(--c1,${C1}) 70%,#000));box-shadow:0 6px 16px -8px var(--c1,${C1});transition:transform var(--tt,.42s) cubic-bezier(.4,1.35,.4,1)}
.g2 label:nth-of-type(2):has(input:checked)~.pill{transform:translateX(100%)}
.g2 label:nth-of-type(3):has(input:checked)~.pill{transform:translateX(200%)}
.g2 label:has(input:checked){color:#fff}`]),
    cfg: STD
  });
  [
    ['flip', 'Flip Tabs', `.fl{position:relative;width:150px;height:38px;perspective:400px}
.fl .card{position:absolute;inset:0;border-radius:10px;transform-style:preserve-3d;transition:transform var(--dur,.6s) cubic-bezier(.4,1.1,.3,1)}
.fl .card b{position:absolute;inset:0;display:grid;place-items:center;border-radius:10px;font:700 12px/1 "JetBrains Mono",monospace;letter-spacing:.1em;text-transform:uppercase;backface-visibility:hidden}
.fl .card b.f{background:linear-gradient(180deg,#22222f,#15151f);color:#c9c9dc}
.fl .card b.k{transform:rotateX(180deg);background:linear-gradient(180deg,var(--c1,${C1}),color-mix(in srgb,var(--c1,${C1}) 65%,#000));color:#fff}
.fl .nav{position:absolute;bottom:-24px;left:0;right:0;display:flex;justify-content:center;gap:8px}
.fl .nav i{width:7px;height:7px;border-radius:50%;background:#33334a;cursor:pointer;transition:background .3s,transform var(--tt,.3s) cubic-bezier(.3,1.7,.4,1)}
.fl .nav i.on{background:var(--c2,${C2});transform:scale(1.4)}`,
      'var fl=root.querySelector(".fl"),cd=fl.querySelector(".card"),ns=[].slice.call(fl.querySelectorAll(".nav i")),i=0,flip=0;\n' +
      'function go(n){i=n;cd.style.transform="rotateX("+(180*++flip)+"deg)";ns.forEach(function(d,k){d.classList.toggle("on",k===n);});}\n' +
      'ns.forEach(function(d,n){d.addEventListener("click",function(){go(n);});});go(0);'],
    ['accordion', 'Accordion', `.ac{width:min(240px,94%);display:grid;gap:6px}
.ac details{border:1px solid rgba(255,255,255,.1);border-radius:10px;background:#12121c;overflow:hidden}
.ac summary{list-style:none;cursor:pointer;padding:10px 12px;font:600 12px/1 "Plus Jakarta Sans",system-ui;color:#dcdce8;display:flex;justify-content:space-between;align-items:center;gap:8px}
.ac summary::-webkit-details-marker{display:none}
.ac summary i{width:9px;height:9px;border-right:2px solid var(--c1,${C1});border-bottom:2px solid var(--c1,${C1});transform:rotate(45deg);transition:transform var(--tt,.34s) cubic-bezier(.3,1.5,.4,1);flex:none}
.ac details[open] summary i{transform:rotate(-135deg)}
.ac p{margin:0;padding:0 12px 12px;font-size:11.5px;line-height:1.5;color:#9a9ab0;animation:acin var(--tt,.4s) ease both}
@keyframes acin{from{opacity:0;transform:translateY(-6px)}to{opacity:1}}`,
      'var ac=root.querySelector(".ac");\n' +
      'ac.addEventListener("toggle",function(e){if(!e.target.open)return;\n' +
      '  [].forEach.call(ac.querySelectorAll("details"),function(d){if(d!==e.target)d.open=false;});});'],
    ['disclosure', 'Height-Morph Disclosure', `.ds{width:min(230px,94%);border-radius:var(--r,12px);background:#12121c;border:1px solid rgba(255,255,255,.1);overflow:hidden}
.ds .hd2{display:flex;align-items:center;gap:8px;padding:11px 12px;cursor:pointer;font:600 12px/1 "Plus Jakarta Sans",system-ui;color:#e8e8f4}
.ds .hd2 i{width:14px;height:14px;position:relative;flex:none}
.ds .hd2 i::before,.ds .hd2 i::after{content:"";position:absolute;left:0;top:6px;width:14px;height:2px;border-radius:2px;background:var(--c2,${C2});transition:transform var(--tt,.36s) cubic-bezier(.3,1.5,.4,1)}
.ds .hd2 i::after{transform:rotate(90deg)}
.ds.open .hd2 i::after{transform:rotate(0)}
.ds .bd{height:0;transition:height var(--dur,.42s) cubic-bezier(.4,1,.3,1)}
.ds .bd div{padding:0 12px 12px;font-size:11.5px;line-height:1.55;color:#9a9ab0}`,
      'var ds=root.querySelector(".ds"),bd=ds.querySelector(".bd"),inr=bd.firstElementChild;\n' +
      'ds.querySelector(".hd2").addEventListener("click",function(){var open=ds.classList.toggle("open");\n' +
      '  bd.style.height=(inr.scrollHeight||60)+"px";if(!open)setTimeout(function(){bd.style.height="0px";},10);});']
  ].forEach(function (v) {
    var inner = v[0] === 'flip'
      ? '<div class="ctl fl"><span class="card"><b class="f">Details</b><b class="k">Specs</b></span><span class="nav"><i class="on"></i><i></i><i></i></span></div>'
      : v[0] === 'accordion'
        ? '<div class="ctl ac">' + mapJoin(3, function (i) {
          return '<details' + (i === 0 ? ' open' : '') + '><summary>' + ['What is this?', 'Does it work offline?', 'Can I copy it?'][i] + '<i></i></summary><p>' + ['A demo you can paste anywhere.', 'Yes — no build step, no CDN.', 'Every snippet is plain HTML + CSS.'][i] + '</p></details>';
        }, '') + '</div>'
        : '<div class="ctl ds"><div class="hd2"><i></i>Shipping &amp; returns</div><div class="bd"><div>Free returns for 30 days. Ships from the warehouse next morning, tracked.</div></div></div>';
    ctl({ g: 'tabs', name: v[0], title: v[1], html: inner, css: join([shell, v[2]]), js: v[3] });
  });

  /* ───────── knobs & dials ───────── */
  ctl({
    g: 'knob', name: 'rotary', title: 'Drag Knob',
    html: '<div class="ctl kn"><span class="dial"><b class="ptr"></b></span><span class="ticks">' +
      mapJoin(11, function (i) { return '<i style="--a:' + (-135 + i * 27) + 'deg"></i>'; }, '') +
      '</span><span class="kv">50</span><svg viewBox="0 0 104 104"><circle class="arc" cx="52" cy="52" r="46"/></svg></div>',
    css: join([shell, `.kn{position:relative;display:grid;place-items:center;width:104px;height:104px}
.kn .dial{position:relative;width:58px;height:58px;border-radius:50%;background:radial-gradient(120% 120% at 50% 0%,#2b2b3c,#101018);border:1px solid rgba(255,255,255,.12);cursor:grab;box-shadow:0 8px 20px -8px #000,inset 0 -3px 6px rgba(0,0,0,.6);transition:box-shadow .25s}
.kn .dial:active{cursor:grabbing}
.kn .ptr{position:absolute;left:50%;top:6px;width:3px;height:14px;margin-left:-1.5px;border-radius:3px;background:var(--c1,${C1});box-shadow:0 0 10px color-mix(in srgb,var(--c1,${C1}) 80%,transparent);transform-origin:50% 23px}
.kn .ticks{position:absolute;inset:0}
.kn .ticks i{position:absolute;left:50%;top:50%;width:2px;height:6px;margin:-3px 0 0 -1px;border-radius:2px;background:#33334a;transform:rotate(var(--a,0deg)) translateY(-42px);transition:background .2s}
.kn .kv{position:absolute;bottom:-2px;font:700 13px/1 "JetBrains Mono",monospace;color:#fff}
.kn svg{position:absolute;inset:0;width:104px;height:104px;transform:rotate(-90deg)}
.kn circle{fill:none;stroke-width:3;stroke-linecap:round}
.kn .arc{stroke:var(--c2,${C2});stroke-dasharray:var(--dash,289);stroke-dashoffset:calc(var(--dash,289) - var(--fill,144))}`]),
    js: 'var kn=root.querySelector(".kn"),dial=kn.querySelector(".dial"),arc=kn.querySelector(".arc"),v=kn.querySelector(".kv");\n' +
      'var val=50,drag=0,y0=0,v0=0;\n' +
      'function paint(){var a=(val-50)/50*135;dial.style.transform="rotate("+a+"deg)";\n' +
      '  var C=289;kn.style.setProperty("--fill",(C*val/100)+"");v.textContent=Math.round(val);}\n' +
      'dial.addEventListener("pointerdown",function(e){drag=1;y0=e.clientY;v0=val;dial.setPointerCapture&&dial.setPointerCapture(e.pointerId);});\n' +
      'dial.addEventListener("pointermove",function(e){if(!drag)return;val=Math.max(0,Math.min(100,v0+(y0-e.clientY)*.6));paint();});\n' +
      'dial.addEventListener("pointerup",function(){drag=0;});\n' +
      'dial.addEventListener("wheel",function(e){e.preventDefault&&e.preventDefault();val=Math.max(0,Math.min(100,val+(e.deltaY<0?2:-2)));paint();},{passive:false});\n' +
      'dial.addEventListener("dblclick",function(){val=50;paint();});paint();',
    cfg: STD.concat([range('Ring', '--dash', 120, 400, 1, 289, 'px')])
  });
  [
    ['fader', 'Fader Bank', `.fb{display:grid;gap:8px;width:150px}
.fb .row{display:grid;grid-template-columns:26px 1fr;align-items:center;gap:8px;font:600 9px/1 "JetBrains Mono",monospace;color:#7f7f96}
.fb input{-webkit-appearance:none;appearance:none;height:26px;background:transparent;cursor:ns-resize;writing-mode:vertical-lr;direction:rtl;margin:0}
.fb input::-webkit-slider-runnable-track{width:var(--th,5px);border-radius:99px;background:linear-gradient(0deg,var(--c2,${C2}) 0 var(--p,40%),#22222f var(--p,40%))}
.fb input::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:10px;border-radius:3px;background:linear-gradient(180deg,#f2f2fa,#b0b0c4);box-shadow:0 2px 6px rgba(0,0,0,.6);transition:transform var(--tt,.2s)}
.fb input:active::-webkit-slider-thumb{transform:scaleX(1.15)}
.fb input::-moz-range-track{width:var(--th,5px);border-radius:99px;background:#22222f}
.fb .mtr{height:4px;border-radius:99px;background:#181824;overflow:hidden}
.fb .mtr b{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--c2,${C2}),var(--c1,${C1}));transition:width .2s ease}`,
      'var fb=root.querySelector(".fb");\n' +
      '[].forEach.call(fb.querySelectorAll("input"),function(inp,n){var m=fb.querySelectorAll(".mtr b")[n];\n' +
      '  function u(){var p=(inp.value-inp.min)/(inp.max-inp.min)*100;inp.parentNode.style.setProperty("--p",p+"%");if(m)m.style.width=p+"%";fb.__r=1;}\n' +
      '  inp.addEventListener("input",u);u();});\n' +
      'api.raf(function(){if(fb.__r){fb.__r=0;[].forEach.call(fb.querySelectorAll("input"),function(inp,n){var m=fb.querySelectorAll(".mtr b")[n];var p=(inp.value-inp.min)/(inp.max-inp.min)*100;inp.parentNode.style.setProperty("--p",p+"%");if(m)m.style.width=p+"%";});}});',
      [range('Track', '--th', 2, 12, 1, 5, 'px')]
    ],
    ['dialv', 'Volume Dial', `.vd{position:relative;width:92px;height:92px;display:grid;place-items:center;cursor:pointer}
.vd svg{position:absolute;inset:0;width:92px;height:92px}
.vd circle{fill:none;stroke-linecap:round}
.vd .bg2{stroke:#1e1e2c;stroke-width:8}
.vd .fg{stroke:var(--c1,${C1});stroke-width:8;stroke-dasharray:var(--dash,180);stroke-dashoffset:var(--off,90);transition:stroke-dashoffset var(--tt,.35s) cubic-bezier(.3,1.3,.4,1),stroke .3s}
.vd .ic{position:relative;font-size:20px;color:#e8e8f4;transition:transform var(--tt,.3s) cubic-bezier(.3,1.7,.4,1)}
.vd.mute .ic{transform:scale(.85);color:#6f6f85}
.vd .pct{position:absolute;bottom:-4px;font:700 11px/1 "JetBrains Mono",monospace;color:#c9c9dc}`,
      'var vd=root.querySelector(".vd"),fg=vd.querySelector(".fg"),pct=vd.querySelector(".pct"),lvl=60,C=180;\n' +
      'function paint(){fg.style.strokeDashoffset=(C-C*lvl/100)+"px";pct.textContent=vd.classList.contains("mute")?"muted":lvl+"%";}\n' +
      'vd.addEventListener("pointerdown",function(e){var r=vd.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;\n' +
      '  function mv(ev){var dx=ev.clientX-cx,dy=ev.clientY-cy;var a=Math.atan2(dx,-dy)*180/Math.PI;lvl=Math.max(0,Math.min(100,(a+180)/360*100));paint();}\n' +
      '  mv(e);var up=function(){window.removeEventListener("pointermove",mv);window.removeEventListener("pointerup",up);};\n' +
      '  window.addEventListener("pointermove",mv);window.addEventListener("pointerup",up);});\n' +
      'vd.addEventListener("dblclick",function(){vd.classList.toggle("mute");paint();});paint();',
      [range('Ring', '--dash', 80, 260, 2, 180, '')]
    ],
    ['encoder', 'Endless Encoder', `.en{position:relative;width:74px;height:74px;border-radius:50%;background:conic-gradient(from -90deg,#2b2b3c,#101018 60%,#2b2b3c);border:1px solid rgba(255,255,255,.12);cursor:grab;display:grid;place-items:center;transition:box-shadow .3s}
.en:hover{box-shadow:0 0 0 4px color-mix(in srgb,var(--c1,${C1}) 18%,transparent)}
.en .knurl{position:absolute;inset:6px;border-radius:50%;background:repeating-conic-gradient(from 0deg,#ffffff14 0 3deg,transparent 3deg 9deg);animation:none}
.en .dot{position:absolute;left:50%;top:8px;width:6px;height:6px;margin-left:-3px;border-radius:50%;background:var(--c2,${C2});box-shadow:0 0 10px var(--c2,${C2})}
.en .num{position:relative;font:700 16px/1 "JetBrains Mono",monospace;color:#fff;text-shadow:0 2px 8px #000}
.en .ring{position:absolute;inset:-6px;border-radius:50%;border:1px dashed rgba(255,255,255,.14);transition:transform var(--tt,.5s) linear}`,
      'var en=root.querySelector(".en"),num=en.querySelector(".num"),d=0,rot=0,drag=0,a0=0;\n' +
      'function ang(e){var r=en.getBoundingClientRect();return Math.atan2(e.clientY-(r.top+r.height/2),e.clientX-(r.left+r.width/2))*180/Math.PI;}\n' +
      'en.addEventListener("pointerdown",function(e){drag=1;a0=ang(e);en.setPointerCapture&&en.setPointerCapture(e.pointerId);});\n' +
      'en.addEventListener("pointermove",function(e){if(!drag)return;var a=ang(e);var da=a-a0;if(da>180)da-=360;if(da<-180)da+=360;a0=a;rot+=da;d+=da/12;\n' +
      '  en.style.transform="rotate("+rot+"deg)";num.textContent=Math.round(d);});\n' +
      'en.addEventListener("pointerup",function(){drag=0;});en.style.transition="none";',
      []
    ]
  ].forEach(function (v) {
    var inner = v[0] === 'fader'
      ? '<div class="ctl fb">' + mapJoin(4, function (i) {
        return '<span class="row"><span>' + ['HI', 'MID', 'LOW', 'VOL'][i] + '</span><input type="range" min="0" max="100" value="' + [70, 45, 85, 30][i] + '"></span><span class="mtr"><b></b></span>';
      }, '') + '</div>'
      : v[0] === 'dialv'
        ? '<div class="ctl vd"><svg viewBox="0 0 92 92"><circle class="bg2" cx="46" cy="46" r="38" transform="rotate(135 46 46)"/><circle class="fg" cx="46" cy="46" r="38" transform="rotate(135 46 46)"/></svg><span class="ic">&#9835;</span><span class="pct">60%</span></div>'
        : '<div class="ctl en"><span class="knurl"></span><span class="ring"></span><span class="dot"></span><span class="num">0</span></div>';
    ctl({ g: 'knob', name: v[0], title: v[1], html: inner, css: join([shell, v[2].replace(/\n {1}vd\{ \}\n/, '\n')]), js: v[3], cfg: STD.concat(v[4]) });
  });

  /* ───────── menus, popovers & pickers ───────── */
  var mn = `.mn{position:relative;display:block;min-width:var(--mw,150px)}
.mn .btn2{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;padding:9px 12px;border-radius:var(--r,10px);background:#15151f;border:1px solid rgba(255,255,255,.12);color:#e8e8f4;font:600 12px/1 "Plus Jakarta Sans",system-ui;cursor:pointer;transition:border-color var(--tt,.25s),box-shadow var(--tt,.25s)}
.mn.open .btn2{border-color:var(--c1,${C1});box-shadow:0 0 0 3px color-mix(in srgb,var(--c1,${C1}) 22%,transparent)}
.mn .arw{width:8px;height:8px;border-right:2px solid #9a9ab0;border-bottom:2px solid #9a9ab0;transform:rotate(45deg) translateY(-2px);transition:transform var(--tt,.3s) cubic-bezier(.3,1.6,.4,1),border-color .25s}
.mn.open .arw{transform:rotate(-135deg) translateY(-2px);border-color:var(--c1,${C1})}
.mn .list{position:absolute;left:0;right:0;top:calc(100% + 6px);padding:5px;border-radius:calc(var(--r,10px) + 2px);background:#15151f;border:1px solid rgba(255,255,255,.12);box-shadow:0 18px 40px -18px #000;list-style:none;margin:0;z-index:3;opacity:0;transform:translateY(-8px) scale(.96);transform-origin:50% 0;pointer-events:none;transition:opacity var(--tt,.24s),transform var(--tt,.3s) cubic-bezier(.3,1.4,.4,1)}
.mn.open .list{opacity:1;transform:none;pointer-events:auto}
.mn .list li{padding:7px 9px;border-radius:6px;font:500 12px/1.2 "Plus Jakarta Sans",system-ui;color:#c4c4d8;cursor:pointer;opacity:0;transform:translateX(-8px);transition:background .18s,color .18s,opacity .24s,transform .24s}
.mn.open .list li{opacity:1;transform:none;transition-delay:calc(var(--i,0) * .035s)}
.mn .list li:hover{background:color-mix(in srgb,var(--c1,${C1}) 26%,transparent);color:#fff}
.mn .list li.sel{color:#fff}
.mn .list li.sel::after{content:"\\2713";float:right;color:var(--c2,${C2})}`;
  var MNJS = 'var mn=root.querySelector(".mn"),btn=mn.querySelector(".btn2"),cur=mn.querySelector(".cur");\n' +
    'mn.addEventListener("click",function(e){var li=e.target.closest?e.target.closest("li"):null;\n' +
    '  if(li){[].forEach.call(mn.querySelectorAll("li"),function(x){x.classList.remove("sel")});li.classList.add("sel");if(cur)cur.textContent=li.textContent.trim();mn.classList.add("open");return;}\n' +
    '  if(e.target===btn||btn.contains(e.target)){mn.classList.toggle("open");return;}\n' +
    '  if(!mn.contains(e.target))mn.classList.remove("open");});\n' +
    'root.addEventListener("pointerdown",function(e){if(!mn.contains(e.target))mn.classList.remove("open");});';
  [
    ['select', 'Dropdown Select', ['Small', 'Medium', 'Large'], 'Medium', ''],
    ['size-pick', 'Dropdown With Prices', ['Free', 'Pro — $9', 'Team — $29'], 'Pro — $9', ''],
    ['sort2', 'Sort Menu', ['Newest', 'Oldest', 'Trending', 'Random'], 'Newest', ''],
    ['multi', 'Multi Select Chips', ['Motion', 'Type', 'Color', 'Layout', 'Icons'], '2 selected', ''],
    ['nested', 'Cascade Menu', ['Export PNG', 'Export SVG', 'Copy JSON'], 'Export', '']
  ].forEach(function (v) {
    ctl({
      g: 'menu', name: v[0], title: v[1],
      html: '<div class="ctl mn"><button class="btn2"><span class="cur">' + v[3] + '</span><span class="arw"></span></button>' +
        '<ul class="list">' + mapJoin(v[2].length, function (i) {
          return '<li style="--i:' + i + '"' + (v[2][i] === v[3] ? ' class="sel"' : '') + '>' + v[2][i] + '</li>';
        }, '') + '</ul></div>',
      css: join([mn, v[0] === 'multi' ? `.mn .list li::before{content:"";display:inline-block;width:12px;height:12px;margin-right:7px;border-radius:4px;border:1.5px solid #4a4a5e;vertical-align:-2px;transition:background .2s,border-color .2s,transform var(--tt,.24s) cubic-bezier(.3,1.7,.4,1)}
.mn .list li.sel::before{background:var(--c1,${C1});border-color:var(--c1,${C1});transform:scale(1.15)}
.mn .list li.sel::after{content:""}` : '']),
      js: MNJS + (v[0] === 'multi' ? '\nvar cur2=mn.querySelector(".cur");\n' +
        'mn.addEventListener("click",function(){var n=mn.querySelectorAll("li.sel").length;cur2.textContent=n?n+" selected":"none";});' : ''),
      cfg: STD.concat([range('Menu', '--mw', 110, 220, 2, 150, 'px')])
    });
  });
  [
    ['tooltip', 'Tooltip Pop', `.tp{position:relative;display:grid;place-items:center;padding:26px 34px;border-radius:10px;background:#191926;color:#e8e8f4;font:600 12px/1 "Plus Jakarta Sans",system-ui;cursor:help;border:1px solid rgba(255,255,255,.1)}
.tp .tip{position:absolute;bottom:calc(100% - 6px);left:50%;padding:6px 9px;border-radius:7px;background:var(--c1,${C1});color:#fff;font:600 11px/1 "JetBrains Mono",monospace;white-space:nowrap;opacity:0;transform:translate(-50%,6px) scale(.86);transition:opacity var(--tt,.22s),transform var(--tt,.3s) cubic-bezier(.3,1.6,.4,1);pointer-events:none}
.tp .tip::after{content:"";position:absolute;left:50%;top:100%;width:8px;height:8px;margin-left:-4px;background:var(--c1,${C1});clip-path:polygon(0 0,100% 0,50% 100%)}
.tp:hover .tip,.tp:focus-visible .tip{opacity:1;transform:translate(-50%,-2px) scale(1)}
.tp kbd{display:inline-block;margin-left:6px;padding:2px 5px;border-radius:4px;background:#0e0e18;border:1px solid rgba(255,255,255,.14);font:600 9px/1 "JetBrains Mono",monospace;color:#9a9ab0}`,
      ''],
    ['popover', 'Click Popover', `.po{position:relative}
.po .btn3{padding:8px 14px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:#15151f;color:#e8e8f4;font:600 12px/1 "Plus Jakarta Sans",system-ui;cursor:pointer;transition:background .25s,transform var(--tt,.2s)}
.po .btn3:active{transform:scale(.96)}
.po .pop{position:absolute;left:50%;bottom:calc(100% + 10px);width:var(--pw,168px);padding:11px;border-radius:12px;background:#15151f;border:1px solid rgba(255,255,255,.12);box-shadow:0 20px 44px -18px #000;opacity:0;transform:translate(-50%,10px) scale(.9);transform-origin:50% 100%;pointer-events:none;transition:opacity var(--tt,.24s),transform var(--tt,.34s) cubic-bezier(.3,1.4,.4,1)}
.po.open .pop{opacity:1;transform:translate(-50%,0) scale(1);pointer-events:auto}
.po .pop::after{content:"";position:absolute;left:50%;top:100%;width:10px;height:10px;margin-left:-5px;background:#15151f;border-right:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);transform:translateY(-5px) rotate(45deg)}
.po h5{margin:0 0 5px;font:700 12px/1.2 "Plus Jakarta Sans",system-ui;color:#fff}
.po p{margin:0;font-size:11px;line-height:1.5;color:#9a9ab0}
.po .act{display:flex;gap:6px;margin-top:9px}
.po .act button{flex:1;padding:6px 0;border-radius:7px;border:1px solid rgba(255,255,255,.12);background:transparent;color:#c4c4d8;font:600 11px/1 "Plus Jakarta Sans",system-ui;cursor:pointer;transition:background .2s,color .2s}
.po .act button.go{background:var(--c1,${C1});border-color:transparent;color:#fff}
.po .act button:hover{background:color-mix(in srgb,var(--c1,${C1}) 30%,transparent)}`,
      'var po=root.querySelector(".po");\n' +
      'po.addEventListener("click",function(e){if(e.target.closest&&e.target.closest(".act")){po.classList.remove("open");return;}po.classList.toggle("open");});'],
    ['palette', 'Command Palette', `.cp{width:min(216px,94%);display:grid;gap:6px}
.cp .in2{display:flex;align-items:center;gap:7px;padding:8px 10px;border-radius:10px;background:#15151f;border:1px solid rgba(255,255,255,.14);transition:border-color .25s,box-shadow .25s}
.cp .in2:focus-within{border-color:var(--c2,${C2});box-shadow:0 0 0 3px color-mix(in srgb,var(--c2,${C2}) 20%,transparent)}
.cp .in2 i{width:11px;height:11px;border:2px solid #8b8ba3;border-radius:50%;position:relative;flex:none}
.cp .in2 i::after{content:"";position:absolute;left:9px;top:9px;width:5px;height:2px;background:#8b8ba3;transform:rotate(45deg);border-radius:2px}
.cp input{flex:1;min-width:0;background:transparent;border:0;outline:none;color:#fff;font:500 12px/1 "JetBrains Mono",monospace}
.cp ul{list-style:none;margin:0;padding:0;display:grid;gap:3px;max-height:var(--mh,112px);overflow:hidden}
.cp li{display:flex;justify-content:space-between;gap:8px;padding:6px 8px;border-radius:7px;font:500 11.5px/1 "Plus Jakarta Sans",system-ui;color:#b6b6ca;background:#101018;transform-origin:50% 0;animation:cpin var(--tt,.32s) cubic-bezier(.3,1.3,.4,1) both;animation-delay:calc(var(--i,0) * .03s)}
.cp li.hide{display:none}
.cp li kbd{font:600 9px/1 "JetBrains Mono",monospace;color:#7f7f96}
.cp li:hover{background:color-mix(in srgb,var(--c1,${C1}) 30%,transparent);color:#fff}
@keyframes cpin{from{opacity:0;transform:translateY(-7px) scale(.97)}to{opacity:1}}`,
      'var cp=root.querySelector(".cp"),inp=cp.querySelector("input"),lis=[].slice.call(cp.querySelectorAll("li"));\n' +
      'function filt(){var q=inp.value.toLowerCase(),n=0;\n' +
      '  lis.forEach(function(li){var hit=li.textContent.toLowerCase().indexOf(q)>-1;li.classList.toggle("hide",!hit);if(hit){li.style.animation="none";void li.offsetWidth;li.style.animation="";li.style.setProperty("--i",n++);}});}\n' +
      'inp.addEventListener("input",filt);filt();'],
    ['drawer', 'Slide Over Panel', `.dw{position:relative;width:min(230px,96%);height:120px;border-radius:12px;overflow:hidden;background:#101018;border:1px solid rgba(255,255,255,.1)}
.dw .handle{position:absolute;left:10px;top:10px;padding:6px 10px;border-radius:8px;background:#191926;border:1px solid rgba(255,255,255,.12);color:#e8e8f4;font:600 11px/1 "Plus Jakarta Sans",system-ui;cursor:pointer;z-index:2;transition:opacity var(--tt,.3s)}
.dw .panel{position:absolute;inset:0 0 0 auto;width:64%;padding:12px;background:linear-gradient(180deg,#1b1b28,#12121c);border-left:1px solid rgba(255,255,255,.12);transform:translateX(101%);transition:transform var(--dur,.44s) cubic-bezier(.3,1.1,.3,1);box-shadow:-18px 0 40px -20px #000}
.dw.open .panel{transform:none}
.dw .scrim{position:absolute;inset:0;background:rgba(4,4,10,.6);opacity:0;transition:opacity var(--tt,.34s);pointer-events:none}
.dw.open .scrim{opacity:1}
.dw h6{margin:0 0 6px;font:700 12px/1 "Plus Jakarta Sans",system-ui;color:#fff}
.dw p{margin:0;font-size:11px;line-height:1.5;color:#9a9ab0}
.dw .frow{display:grid;gap:5px;margin-top:9px}
.dw .frow i{height:7px;border-radius:4px;background:#2a2a3c;transform-origin:0 50%;animation:dwsh var(--dur,1.6s) ease-in-out infinite alternate;animation-delay:calc(var(--i) * -.2s)}
@keyframes dwsh{from{transform:scaleX(.5)}to{transform:scaleX(1)}}`,
      'var dw=root.querySelector(".dw");\n' +
      'dw.addEventListener("click",function(){dw.classList.toggle("open");});']
  ].forEach(function (v) {
    var inner = '';
    if (v[0] === 'tooltip') inner = '<div class="ctl tp">Hover me<span class="tip">Tooltips are just CSS</span></div>';
    if (v[0] === 'popover') inner = '<div class="ctl po"><button class="btn3">Invite team</button><div class="pop"><h5>Invite by email</h5><p>They get a magic link — no password, no signup flow.</p><div class="act"><button>Cancel</button><button class="go">Send</button></div></div></div>';
    if (v[0] === 'palette') inner = '<div class="ctl cp"><div class="in2"><i></i><input value="ani" placeholder="Type a command"></div><ul>' +
      mapJoin(6, function (i) { return '<li style="--i:' + i + '">' + ['Animate in', 'Animate out', 'New layer', 'Duplicate', 'Add easing', 'Add preset'][i] + '<kbd>\u2318' + (i + 1) + '</kbd></li>'; }, '') + '</ul></div>';
    if (v[0] === 'drawer') inner = '<div class="ctl dw"><button class="handle">Panel</button><div class="scrim"></div><div class="panel"><h6>Layers</h6><p>Drag to reorder.</p><div class="frow">' + mapJoin(4, function (i) { return '<i style="--i:' + i + '"></i>'; }, '') + '</div></div></div>';
    ctl({ g: 'menu', name: v[0], title: v[1], html: inner, css: join([shell, v[2]]), js: v[3] });
  });

  /* ───────── colour pickers ───────── */
  ctl({
    g: 'color', name: 'swatches', title: 'Swatch Picker',
    html: '<div class="ctl sw-pick">' + mapJoin(8, function (i) {
      return '<label><input type="radio" name="sw"' + (i === 3 ? ' checked' : '') + '><i style="background:' + K.accent(i) + '"></i></label>';
    }, '') + '</div>',
    css: join([shell, `.sw-pick{gap:6px}
.sw-pick label{position:relative;display:grid;place-items:center;width:22px;height:22px;border-radius:50%;cursor:pointer}
.sw-pick i{display:block;width:100%;height:100%;border-radius:50%;box-shadow:0 0 0 1px rgba(255,255,255,.16) inset;transition:transform var(--tt,.34s) cubic-bezier(.3,1.8,.4,1),box-shadow .24s}
.sw-pick label:hover i{transform:scale(1.16)}
.sw-pick label:has(input:checked) i{transform:scale(1.2);box-shadow:0 0 0 2px #0d0d16,0 0 0 4px currentColor,0 8px 18px -6px currentColor}
.sw-pick label:has(input:checked)::after{content:"\\2713";position:absolute;color:#0d0d16;font:700 11px/1 system-ui;animation:swp var(--tt,.36s) cubic-bezier(.3,1.7,.4,1)}
@keyframes swp{0%{transform:scale(0) rotate(-40deg)}100%{transform:none}}`]),
    cfg: STD.concat([range('Dot', '--dot', 12, 34, 1, 22, 'px')])
  });
  ctl({
    g: 'color', name: 'pad', title: 'Saturation / Value Pad',
    html: '<div class="ctl padw"><span class="pad"><b class="knob"></b></span><span class="hue"></span></div>',
    css: join([shell, `.padw{display:grid;gap:8px;width:var(--pw,150px)}
.padw .pad{position:relative;height:var(--ph,96px);border-radius:10px;cursor:crosshair;background:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,var(--huec,${C1}));box-shadow:inset 0 0 0 1px rgba(255,255,255,.14)}
.padw .knob{position:absolute;left:var(--px,68%);top:var(--py,32%);width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px #0008,0 4px 10px -2px #000;transition:transform var(--tt,.18s)}
.padw .pad:active .knob{transform:scale(1.25)}
.padw .hue{height:10px;border-radius:99px;background:linear-gradient(90deg,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00);box-shadow:inset 0 0 0 1px rgba(255,255,255,.18);position:relative}
.padw .hue::after{content:"";position:absolute;left:var(--hx,70%);top:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#fff;box-shadow:0 0 0 2px #0006,0 2px 6px #000}`]),
    js: 'var padw=root.querySelector(".padw"),pad=padw.querySelector(".pad"),hue=padw.querySelector(".hue"),kn=padw.querySelector(".knob");\n' +
      'function set(e){var r=pad.getBoundingClientRect();if(!r.width)return;\n' +
      '  var x=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),y=Math.max(0,Math.min(1,(e.clientY-r.top)/r.height));\n' +
      '  pad.style.setProperty("--px",(x*100)+"%");pad.style.setProperty("--py",(y*100)+"%");kn.style.left=(x*100)+"%";kn.style.top=(y*100)+"%";}\n' +
      'pad.addEventListener("pointerdown",function(e){pad.setPointerCapture&&pad.setPointerCapture(e.pointerId);set(e);});\n' +
      'pad.addEventListener("pointermove",function(e){if(e.buttons)set(e);});\n' +
      'hue.addEventListener("pointerdown",function(e){var r=hue.getBoundingClientRect();if(!r.width)return;\n' +
      '  var x=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));padw.style.setProperty("--hx",(x*100)+"%");});',
    cfg: STD.concat([range('Pad', '--ph', 60, 150, 2, 96, 'px')])
  });

  /* ───────── text inputs ───────── */
  var inp = `.in{position:relative;display:grid;gap:4px;width:var(--iw,168px)}
.in .fld{position:relative}
.in input,.in textarea{width:100%;padding:var(--ip,11px) 12px;border-radius:var(--r,10px);background:#13131d;border:1px solid rgba(255,255,255,.13);color:#fff;font:500 13px/1.2 "Plus Jakarta Sans",system-ui;outline:none;transition:border-color var(--tt,.24s),box-shadow var(--tt,.24s),background .24s}
.in input:focus,.in textarea:focus{border-color:var(--c1,${C1});box-shadow:0 0 0 3px color-mix(in srgb,var(--c1,${C1}) 20%,transparent)}
.in .lb{position:absolute;left:12px;top:50%;transform:translateY(-50%);font:500 12px/1 "Plus Jakarta Sans",system-ui;color:#8b8ba3;pointer-events:none;transform-origin:0 50%;transition:transform var(--tt,.28s) cubic-bezier(.3,1.3,.4,1),color var(--tt,.28s),letter-spacing .2s}
.in .fld:focus-within .lb,.in .fld.has .lb{transform:translateY(-165%) scale(.74);color:var(--c2,${C2});letter-spacing:.06em;text-transform:uppercase}
.in .u2{position:absolute;left:0;bottom:0;height:2px;width:0;background:linear-gradient(90deg,var(--c1,${C1}),var(--c2,${C2}));transition:width var(--tt,.4s) cubic-bezier(.4,1,.3,1);border-radius:2px}
.in .fld:focus-within .u2{width:100%}
.in.bad input{border-color:var(--c3,${C3});animation:inshake var(--tt,.4s)}
.in.bad .msg{color:var(--c3,${C3});opacity:1}
.in .msg{font:600 10px/1.4 "JetBrains Mono",monospace;color:#7f7f96;opacity:.75;transition:color .24s,opacity .24s}
@keyframes inshake{0%,100%{transform:none}20%{transform:translateX(-6px)}40%{transform:translateX(5px)}60%{transform:translateX(-3px)}80%{transform:translateX(2px)}}`;
  var INJS = 'var inw=root.querySelector(".in"),f=inw.querySelector("input")||inw.querySelector("textarea");\n' +
    'function u(){inw.classList.toggle("has",!!(f&&f.value));}\n' +
    'if(f){f.addEventListener("input",u);f.addEventListener("blur",u);}u();';
  [
    ['float', 'Floating Label Input', '.in{}', ''],
    ['underline', 'Underline Input', `.in .fld input{border:0;border-radius:0;background:transparent;padding-left:0;padding-right:0;box-shadow:none}
.in .fld:focus-within input{box-shadow:none}`, ''],
    ['valid', 'Live Validating Input', `.in .tick{position:absolute;right:10px;top:50%;width:16px;height:16px;margin-top:-8px;border-radius:50%;display:grid;place-items:center;background:#22222f;color:transparent;font:700 10px/1 system-ui;transition:background var(--tt,.3s),color var(--tt,.3s),transform var(--tt,.36s) cubic-bezier(.3,1.8,.4,1)}
.in.ok .tick{background:var(--c2,${C2});color:#05121a;transform:scale(1.1)}
.in.ok .tick::after{content:"\\2713"}`,
      'var inw=root.querySelector(".in"),f=inw.querySelector("input");\n' +
      'function u(){var v=f.value.trim();inw.classList.toggle("ok",/^[^@\\s]+@[^@\\s]+\\.[a-z]{2,}$/i.test(v));inw.classList.toggle("bad",v.length>3&&!inw.classList.contains("ok"));\n' +
      '  inw.querySelector(".msg").textContent=inw.classList.contains("ok")?"looks good":(v.length?"needs an @ and a dot":"we never store it");inw.classList.toggle("has",!!v);}\n' +
      'f.addEventListener("input",u);u();'],
    ['password', 'Password Strength Meter', `.pw{position:relative}
.pw .eye{position:absolute;right:8px;top:50%;margin-top:-11px;width:26px;height:22px;border:0;border-radius:6px;background:transparent;cursor:pointer;display:grid;place-items:center;padding:0}
.pw .eye i{position:relative;display:block;width:16px;height:11px;border:2px solid #8b8ba3;border-radius:80%/100%;transition:border-color .24s}
.pw .eye i::after{content:"";position:absolute;left:50%;top:50%;width:5px;height:5px;margin:-2.5px 0 0 -2.5px;border-radius:50%;background:#8b8ba3;transition:transform var(--tt,.3s)}
.pw .eye:hover i,.pw .eye:hover i::after{border-color:#fff;background:#fff}
.pw.show .eye i::after{transform:scaleX(0)}
.pw .bars{display:flex;gap:3px;margin-top:6px}
.pw .bars b{flex:1;height:3px;border-radius:3px;background:#26263a;transition:background var(--tt,.3s) calc(var(--i) * .05s)}
.pw .bars b.on{background:var(--c2,${C2})}
.pw .bars b.mid{background:#ffd479}
.pw .bars b.low{background:var(--c3,${C3})}`,
      'var pw=root.querySelector(".pw"),f=pw.querySelector("input"),bs=[].slice.call(pw.querySelectorAll(".bars b"));\n' +
      'pw.querySelector(".eye").addEventListener("click",function(){pw.classList.toggle("show");f.type=pw.classList.contains("show")?"text":"password";});\n' +
      'f.addEventListener("input",function(){var v=f.value,s=0;\n' +
      '  if(v.length>5)s++;if(v.length>9)s++;if(/[A-Z]/.test(v)&&/[0-9]/.test(v))s++;if(/[^a-zA-Z0-9]/.test(v))s++;\n' +
      '  bs.forEach(function(b,i){b.className=i<s?(s<2?"on low":(s<3?"mid":"on")):"";});});'],
    ['search', 'Expanding Search Field', `.sr{position:relative;display:flex;align-items:center;justify-content:flex-end;width:var(--sw2,42px);height:38px;padding:4px;border-radius:99px;background:#15151f;border:1px solid rgba(255,255,255,.13);transition:width var(--dur,.46s) cubic-bezier(.3,1.15,.3,1),border-color .28s,background .28s;overflow:hidden}
.sr.open{width:var(--sw,184px);border-color:var(--c1,${C1})}
.sr input{flex:1;min-width:0;border:0;background:transparent;color:#fff;font:500 12px/1 "JetBrains Mono",monospace;outline:none;padding:0 8px;opacity:0;transform:translateX(10px);transition:opacity var(--tt,.24s) .1s,transform var(--tt,.34s) .06s cubic-bezier(.3,1.3,.4,1)}
.sr.open input{opacity:1;transform:none}
.sr .mag{flex:none;width:30px;height:30px;border:0;border-radius:50%;background:transparent;cursor:pointer;position:relative}
.sr .mag i{position:absolute;left:8px;top:8px;width:10px;height:10px;border:2px solid #c4c4d8;border-radius:50%;transition:transform var(--dur,.4s) cubic-bezier(.3,1.4,.4,1),border-color .25s}
.sr .mag i::after{content:"";position:absolute;left:10px;top:10px;width:6px;height:2px;border-radius:2px;background:#c4c4d8;transform:rotate(45deg)}
.sr.open .mag i{transform:rotate(90deg);border-color:var(--c1,${C1})}`,
      'var sr=root.querySelector(".sr");\n' +
      'sr.querySelector(".mag").addEventListener("click",function(){sr.classList.add("open");var f=sr.querySelector("input");f.focus&&f.focus();});\n' +
      'sr.addEventListener("pointerleave",function(){if(!sr.querySelector("input").value)sr.classList.remove("open");});\n' +
      'sr.querySelector("input").addEventListener("input",function(e){if(!e.target.value)sr.classList.remove("open");});'],
    ['tag', 'Tag Chips Input', `.tg{display:flex;flex-wrap:wrap;gap:5px;padding:7px;border-radius:var(--r,10px);background:#13131d;border:1px solid rgba(255,255,255,.13);min-height:38px;align-items:center;transition:border-color .24s,box-shadow .24s}
.tg:focus-within{border-color:var(--c2,${C2});box-shadow:0 0 0 3px color-mix(in srgb,var(--c2,${C2}) 18%,transparent)}
.tg b{display:inline-flex;align-items:center;gap:5px;padding:4px 7px;border-radius:7px;background:color-mix(in srgb,var(--c1,${C1}) 26%,#13131d);border:1px solid color-mix(in srgb,var(--c1,${C1}) 45%,transparent);color:#efeffa;font:600 11px/1 "JetBrains Mono",monospace;animation:tgin var(--tt,.34s) cubic-bezier(.3,1.6,.4,1) both}
.tg b i{cursor:pointer;color:#9a9ab0;text-decoration:none;font-size:12px;transition:color .2s,transform var(--tt,.22s)}
.tg b i:hover{color:#fff;transform:scale(1.25)}
.tg input{flex:1;min-width:52px;border:0;background:transparent;color:#fff;font:500 12px/1 "Plus Jakarta Sans",system-ui;outline:none}
@keyframes tgin{from{opacity:0;transform:translateY(6px) scale(.9)}to{opacity:1}}
.tg b.out{animation:tgout var(--tt,.24s) ease-in forwards}
@keyframes tgout{to{opacity:0;transform:scale(.6) translateY(-6px);margin-left:-30px}}`,
      'var tg=root.querySelector(".tg"),f=tg.querySelector("input"),proto=tg.querySelector("b");\n' +
      'function add(t){var b=proto.cloneNode(true);b.firstChild.nodeValue=t+" ";b.classList.remove("out");\n' +
      '  tg.insertBefore(b,f);f.value="";}\n' +
      'tg.addEventListener("click",function(e){var s=e.target.closest?e.target.closest("i"):null;\n' +
      '  if(s){var b=s.parentNode;b.classList.add("out");setTimeout(function(){if(b.remove)b.remove();},240);}});\n' +
      'f.addEventListener("keydown",function(e){if(e.key==="Enter"&&f.value.trim())add(f.value.trim());\n' +
      '  if(e.key==="Backspace"&&!f.value){var l=tg.querySelectorAll("b");if(l.length)l[l.length-1].classList.add("out");}});'],
    ['clear', 'Clearable Field', `.in .clr{position:absolute;right:8px;top:50%;width:18px;height:18px;margin-top:-9px;border:0;border-radius:50%;background:#26263a;color:#c4c4d8;font:700 11px/1 system-ui;cursor:pointer;opacity:0;transform:scale(.5);transition:opacity var(--tt,.22s),transform var(--tt,.28s) cubic-bezier(.3,1.7,.4,1),background .2s}
.in.has .clr{opacity:1;transform:none}
.in .clr:hover{background:var(--c3,${C3});color:#fff}`,
      'var inw=root.querySelector(".in"),f=inw.querySelector("input"),c=inw.querySelector(".clr");\n' +
      'function u(){inw.classList.toggle("has",!!f.value);}\n' +
      'f.addEventListener("input",u);c.addEventListener("click",function(){f.value="";u();f.focus&&f.focus();});u();'],
    ['pin', 'PIN Auto-Advance', `.pin{display:flex;gap:7px}
.pin input{width:var(--pw2,34px);height:var(--ph2,42px);text-align:center;border-radius:9px;background:#13131d;border:1px solid rgba(255,255,255,.13);color:#fff;font:700 16px/1 "JetBrains Mono",monospace;outline:none;transition:border-color .2s,box-shadow .2s,transform var(--tt,.24s) cubic-bezier(.3,1.6,.4,1)}
.pin input:focus{border-color:var(--c1,${C1});box-shadow:0 0 0 3px color-mix(in srgb,var(--c1,${C1}) 22%,transparent);transform:translateY(-2px)}
.pin input.full{border-color:var(--c2,${C2});background:color-mix(in srgb,var(--c2,${C2}) 12%,#13131d)}
.pin.done input{animation:pinok var(--tt,.5s) cubic-bezier(.3,1.5,.4,1) both;animation-delay:calc(var(--i) * .05s)}
@keyframes pinok{0%{transform:translateY(0)}45%{transform:translateY(-8px) scale(1.06)}100%{transform:none}}`,
      'var pin=root.querySelector(".pin"),ins=[].slice.call(pin.querySelectorAll("input"));\n' +
      'ins.forEach(function(inp,i){inp.addEventListener("input",function(){inp.value=inp.value.replace(/\\D/g,"").slice(0,1);\n' +
      '  inp.classList.toggle("full",!!inp.value);if(inp.value&&ins[i+1])ins[i+1].focus&&ins[i+1].focus();\n' +
      '  if(ins.every(function(x){return x.value;}))pin.classList.add("done");else pin.classList.remove("done");});\n' +
      '  inp.addEventListener("keydown",function(e){if(e.key==="Backspace"&&!inp.value&&ins[i-1]){ins[i-1].value="";ins[i-1].classList.remove("full");ins[i-1].focus&&ins[i-1].focus();}});});'],
    ['autosize', 'Autosize Textarea', `.in textarea{resize:none;overflow:hidden;min-height:var(--mh2,34px);font-family:"Plus Jakarta Sans",system-ui}
.in .cnt{justify-self:end;font:600 10px/1 "JetBrains Mono",monospace;color:#7f7f96;transition:color .2s}
.in .cnt.hot{color:var(--c3,${C3})}`,
      'var inw=root.querySelector(".in"),t=inw.querySelector("textarea"),c=inw.querySelector(".cnt");\n' +
      'function u(){t.style.height="0px";t.style.height=Math.max(34,t.scrollHeight||40)+"px";\n' +
      '  var n=t.value.length;c.textContent=n+" / 240";c.classList.toggle("hot",n>200);}\n' +
      't.addEventListener("input",u);u();'],
    ['scramble', 'Scramble Placeholder', `.in .fld input::placeholder{color:#5d5d74;letter-spacing:.04em}
.in .fld input{letter-spacing:.02em}
.in.spin .fld{animation:inspin var(--tt,.5s) ease}
@keyframes inspin{50%{transform:translateY(-2px)}}`,
      'var inw=root.querySelector(".in"),f=inw.querySelector("input"),CH="!<>-_\\/[]{}—=+*^?#________",msg=root.querySelector(".msg");\n' +
      'var txt="focus to decode",t=0,raf=0;\n' +
      'function scramble(){var out="";for(var i=0;i<txt.length;i++)out+=i<t/2?txt[i]:CH[(Math.random()*CH.length)|0];\n' +
      '  f.placeholder=out;if(t<txt.length*2){raf=requestAnimationFrame(function(){t++;scramble();});}else{msg.textContent="dec \u2713";}}\n' +
      'f.addEventListener("focus",function(){t=0;scramble();});\n' +
      'api.onCleanup(function(){if(raf)cancelAnimationFrame(raf);});']
  ].forEach(function (v) {
    var inner;
    if (v[0] === 'pin') inner = '<div class="ctl pin">' + mapJoin(4, function (i) { return '<input style="--i:' + i + '" maxlength="1" inputmode="numeric" aria-label="digit ' + (i + 1) + '">'; }, '') + '</div>';
    else if (v[0] === 'search') inner = '<div class="ctl sr"><input placeholder="search effects"><button class="mag" aria-label="search"><i></i></button></div>';
    else if (v[0] === 'tag') inner = '<div class="ctl tg"><b>design <i>\u00d7</i></b><b>motion <i>\u00d7</i></b><input placeholder="+ add"></div>';
    else if (v[0] === 'password') inner = '<div class="ctl in pw"><span class="fld"><span class="lb">Password</span><input type="password" value="hunter2"><button class="eye" aria-label="reveal"><i></i></button><b class="u2"></b></span><span class="bars">' + mapJoin(4, function (i) { return '<b style="--i:' + i + '"></b>'; }, '') + '</span></div>';
    else if (v[0] === 'autosize') inner = '<div class="ctl in"><span class="fld"><textarea rows="1">Motion notes \u2014 type and watch it grow.</textarea></span><span class="cnt">0 / 240</span></div>';
    else inner = '<div class="ctl in"><span class="fld"><span class="lb">' + (v[0] === 'valid' ? 'Email' : 'Field') + '</span><input placeholder="' + (v[0] === 'scramble' ? '' : ' ') + '"' + (v[0] === 'valid' ? ' value="hi@motion.dev"' : '') + '>' +
      (v[0] === 'valid' ? '<span class="tick"></span>' : '') + (v[0] === 'clear' ? '<button class="clr" aria-label="clear">\u2715</button>' : '') + '<b class="u2"></b></span><span class="msg">' + (v[0] === 'valid' ? 'needs an @' : 'optional') + '</span></div>';
    ctl({ g: 'input', name: v[0], title: v[1], html: inner, css: join([shell, inp, v[2]]), js: v[3] ? (v[0] === 'float' || v[0] === 'underline' ? INJS : v[3]) : INJS });
  });

  /* ───────── action buttons & stateful controls ───────── */
  var act = `.ac2{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:8px;min-width:var(--bs2,88px);height:var(--bh,38px);padding:0 14px;border-radius:var(--r,12px);border:1px solid rgba(255,255,255,.13);background:#15151f;color:#e8e8f4;font:600 12px/1 "Plus Jakarta Sans",system-ui;cursor:pointer;transform:scale(var(--sc2,1));transition:background var(--tt,.26s),border-color var(--tt,.26s),color var(--tt,.26s),transform var(--tt,.24s) cubic-bezier(.3,1.5,.4,1);user-select:none;-webkit-tap-highlight-color:transparent}
.ac2:active{transform:scale(.94)}
.ac2 svg{width:16px;height:16px;flex:none;overflow:visible}
.ac2 svg *{transition:fill var(--tt,.3s),stroke var(--tt,.3s),transform var(--tt,.34s) cubic-bezier(.3,1.7,.4,1);transform-origin:50% 50%}
.hrt{fill:none;stroke:currentColor;stroke-width:1.8}
.ac2.on{border-color:transparent;background:color-mix(in srgb,var(--c3,${C3}) 22%,#15151f);color:var(--c3,${C3})}
.ac2.on .hrt{fill:var(--c3,${C3});stroke:var(--c3,${C3})}`;
  ctl({
    g: 'action', name: 'like-heart', title: 'Like Tap Burst',
    html: '<button class="ac2 lk"><svg viewBox="0 0 24 24"><path class="hrt" d="M12 20s-7-4.6-7-9.4A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.6C19 15.4 12 20 12 20z"/></svg><span class="c">0</span></button>',
    css: join([act, `.lk{overflow:visible}
.lk.pop svg{animation:hbeat var(--tt,.55s) cubic-bezier(.3,1.6,.4,1)}
@keyframes hbeat{0%{transform:scale(.7)}45%{transform:scale(1.35)}70%{transform:scale(.95)}100%{transform:none}}
.lk i{position:absolute;left:50%;top:50%;width:4px;height:4px;border-radius:50%;background:var(--c3,${C3});opacity:0;pointer-events:none}
.lk.pop i{animation:hspk var(--tt,.7s) cubic-bezier(.25,.9,.4,1) forwards}
@keyframes hspk{0%{opacity:1;transform:translate(-50%,-50%) rotate(var(--a,0deg)) translateX(4px) scale(.4)}70%{opacity:1}100%{opacity:0;transform:translate(-50%,-50%) rotate(var(--a,0deg)) translateX(30px) scale(0)}}`]),
    js: 'var b=root.querySelector(".lk"),c=b.querySelector(".c"),n=0;\n' +
      'b.addEventListener("click",function(){var on=b.classList.toggle("on");n+=on?1:0;c.textContent=n;\n' +
      '  b.classList.remove("pop");void b.offsetWidth;b.classList.add("pop");});',
    cfg: STD.concat([range('Button', '--bs2', 60, 140, 2, 88, 'px')])
  });
  [
    ['save', 'Save / Saved Toggle',
      `.sv{position:relative}
.sv svg{stroke:#9a9ab0;fill:none;stroke-width:1.8}
.sv.on{background:color-mix(in srgb,var(--c1,${C1}) 24%,#15151f);border-color:transparent;color:#fff}
.sv.on svg{stroke:var(--c1,${C1});fill:var(--c1,${C1});transform:translateY(-1px)}
.sv .lbl2{position:relative;height:14px;overflow:hidden;display:grid}
.sv .lbl2 b{font:600 12px/14px "Plus Jakarta Sans",system-ui;transition:transform var(--tt,.34s) cubic-bezier(.3,1.4,.4,1)}
.sv.on .lbl2 b:first-child{transform:translateY(-110%)}
.sv .lbl2 b:last-child{color:#fff}`,
      'var b=root.querySelector(".sv");\n' +
      'b.addEventListener("click",function(){b.classList.toggle("on");});', 116],
    ['vote', 'Up / Down Vote', `.vt{display:grid;gap:4px;align-items:center;padding:6px 10px;border-radius:14px;background:#12121c;border:1px solid rgba(255,255,255,.1);min-width:0}
.vt .rb{display:flex;flex-direction:column;gap:4px}
.vt button{width:28px;height:22px;border:0;border-radius:7px;background:transparent;color:#8b8ba3;cursor:pointer;display:grid;place-items:center;transition:background .2s,color .2s,transform var(--tt,.26s) cubic-bezier(.3,1.7,.4,1)}
.vt button:hover{background:#1e1e2c;color:#fff}
.vt button:active{transform:scale(.85)}
.vt button.on{color:var(--c1,${C1});background:color-mix(in srgb,var(--c1,${C1}) 22%,transparent)}
.vt .num{font:700 13px/1 "JetBrains Mono",monospace;color:#fff;min-width:34px;text-align:center}
.vt .num.flip{animation:vtf var(--tt,.36s) cubic-bezier(.3,1.5,.4,1)}
@keyframes vtf{0%{transform:translateY(var(--d,-6px));opacity:.2}100%{transform:none;opacity:1}}
.vt svg{width:14px;height:14px;fill:currentColor}`,
      'var vt=root.querySelector(".vt"),num=vt.querySelector(".num"),v=128,mode=0;\n' +
      '[].forEach.call(vt.querySelectorAll("button"),function(b){b.addEventListener("click",function(){\n' +
      '  var up=b.dataset.u==="1";var next=mode===(up?1:-1)?0:(up?1:-1);mode=next;\n' +
      '  vt.querySelector("[data-u=\\"1\\"]").classList.toggle("on",next===1);\n' +
      '  vt.querySelector("[data-u=\\"0\\"]").classList.toggle("on",next===-1);\n' +
      '  num.textContent=v+next;num.style.setProperty("--d",next===-1?"6px":"-6px");\n' +
      '  num.classList.remove("flip");void num.offsetWidth;num.classList.add("flip");});});', 130],
    ['copy', 'Copy With Feedback', `.cp2{position:relative;overflow:hidden}
.cp2 .a,.cp2 .b{display:inline-flex;align-items:center;gap:7px;transition:transform var(--tt,.4s) cubic-bezier(.3,1.3,.4,1),opacity var(--tt,.3s)}
.cp2 .b{position:absolute;inset:0;justify-content:center;transform:translateY(120%);opacity:0;color:#05130c}
.cp2.done{background:var(--c2,${C2});border-color:transparent}
.cp2.done .a{transform:translateY(-120%);opacity:0}
.cp2.done .b{transform:none;opacity:1}
.cp2 .a svg{stroke:#9a9ab0;fill:none;stroke-width:1.7}
.cp2.done .a svg{stroke:#05130c}`,
      'var b=root.querySelector(".cp2");\n' +
      'b.addEventListener("click",function(){b.classList.add("done");setTimeout(function(){b.classList.remove("done");},1600);});', 132],
    ['mute', 'Mute Icon Morph', `.mu{width:44px;min-width:0;padding:0}
.mu .wv{stroke:var(--c2,${C2});fill:none;stroke-width:1.8;stroke-linecap:round;transform-origin:14px 12px}
.mu .wv path{stroke-dasharray:22;stroke-dashoffset:0;transition:stroke-dashoffset var(--tt,.4s) ease}
.mu.off .wv path{stroke-dashoffset:22}
.mu .x{stroke:var(--c3,${C3});stroke-width:2;opacity:0;transform:scale(.4) rotate(-40deg);transform-origin:50% 50%}
.mu.off .x{opacity:1;transform:none}
.mu .body{fill:#c4c4d8;transition:fill var(--tt,.3s)}
.mu.off .body{fill:#6f6f85}
.mu .slash{stroke:var(--c3,${C3});stroke-width:2;stroke-linecap:round;stroke-dasharray:30;stroke-dashoffset:30;transition:stroke-dashoffset var(--tt,.34s) .05s}
.mu.off .slash{stroke-dashoffset:0}`,
      'var b=root.querySelector(".mu");\n' +
      'b.addEventListener("click",function(){b.classList.toggle("off");});', 110]
  ].forEach(function (v) {
    var inner = '';
    if (v[0] === 'save') inner = '<button class="ac2 sv"><svg viewBox="0 0 24 24"><path d="M6 4h12v16l-6-4-6 4z"/></svg><span class="lbl2"><b>Save</b><b>Saved</b></span></button>';
    if (v[0] === 'vote') inner = '<div class="ctl vt"><span class="rb"><button data-u="1" aria-label="up"><svg viewBox="0 0 24 24"><path d="M12 5l7 8H5z"/></svg></button><button data-u="0" aria-label="down"><svg viewBox="0 0 24 24"><path d="M12 19l-7-8h14z"/></svg></button></span><span class="num">128</span></div>';
    if (v[0] === 'copy') inner = '<button class="ac2 cp2"><span class="a"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="10" height="10" rx="2"/><path d="M15 5H6a2 2 0 0 0-2 2v9"/></svg>Copy</span><span class="b">Copied</span></button>';
    if (v[0] === 'mute') inner = '<button class="ac2 mu"><svg viewBox="0 0 24 24"><path class="body" d="M4 9h3l4-4v14l-4-4H4z"/><g class="wv"><path d="M15 9c1.6 1.6 1.6 4.4 0 6"/></g><path class="slash" d="M4 20L20 4"/></svg></button>';
    ctl({ g: 'action', name: v[0], title: v[1], html: inner, css: join([act, v[2]]), js: v[3], cfg: STD.concat([range('Width', '--bs2', 60, v[4], 2, 88, 'px')]) });
  });

  [
    ['lock', 'Wrong Password Shake', `.lk2{position:relative;display:grid;gap:7px;padding:12px;border-radius:14px;background:#12121c;border:1px solid rgba(255,255,255,.1);width:min(180px,92%)}
.lk2 .sh{display:flex;align-items:center;gap:8px}
.lk2 .pad2{position:relative;width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.14);background:#15151f;color:#c4c4d8;cursor:pointer;display:grid;place-items:center;transition:transform var(--tt,.3s) cubic-bezier(.3,1.6,.4,1),background .25s,color .25s,box-shadow .25s}
.lk2 .pad2 svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.8}
.lk2 .pad2 .cl{opacity:0;position:absolute}
.lk2.open .pad2{background:var(--c2,${C2});border-color:transparent;color:#04121a}
.lk2.open .pad2 .op{opacity:0}
.lk2.open .pad2 .cl{opacity:1;animation:lockdrop var(--dur,.5s) cubic-bezier(.3,1.5,.4,1)}
.lk2 .dots{display:flex;gap:5px}
.lk2 .dots i{width:7px;height:7px;border-radius:50%;background:#2b2b3c;transition:background var(--tt,.24s),transform var(--tt,.3s) cubic-bezier(.3,1.8,.4,1)}
.lk2 .dots i.on{background:var(--c1,${C1});transform:scale(1.25)}
.lk2.err{animation:lkshake var(--tt,.44s)}
.lk2.err .dots i.on{background:var(--c3,${C3})}
@keyframes lkshake{0%,100%{transform:none}20%{transform:translateX(-7px)}45%{transform:translateX(6px)}70%{transform:translateX(-3px)}}
@keyframes lockdrop{0%{transform:translateY(-14px) rotate(-20deg)}100%{transform:none}}`,
      'var lk=root.querySelector(".lk2"),ds=[].slice.call(lk.querySelectorAll(".dots i")),n=0;\n' +
      'lk.querySelector(".pad2").addEventListener("click",function(){\n' +
      '  if(lk.classList.contains("open")){lk.classList.remove("open");n=0;ds.forEach(function(d){d.classList.remove("on")});return;}\n' +
      '  n++;if(n<3){ds[n-1].classList.add("on");}else{n=0;ds.forEach(function(d){d.classList.remove("on")});lk.classList.add("open");}});\n' +
      'lk.querySelector(".dots").addEventListener("pointerdown",function(e){if(e.target.tagName==="I")lk.classList.add("err");});\n' +
      'lk.addEventListener("animationend",function(){lk.classList.remove("err");});'],
    ['hold', 'Hold To Record', `.hr{position:relative;display:grid;place-items:center;width:64px;height:64px;border-radius:50%;border:1px solid rgba(255,255,255,.14);background:#15151f;cursor:pointer;transform:scale(var(--sc2,1))}
.hr b{width:26px;height:26px;border-radius:50%;background:var(--c3,${C3});transition:transform var(--tt,.4s) cubic-bezier(.3,1.4,.4,1),border-radius var(--tt,.4s)}
.hr.rec b{transform:scale(.7);border-radius:6px}
.hr .ring2{position:absolute;inset:-4px;border-radius:50%;border:2px solid var(--c3,${C3});opacity:0}
.hr.rec .ring2{animation:hrr var(--dur,1.6s) ease-out infinite}
@keyframes hrr{0%{opacity:.8;transform:scale(.85)}100%{opacity:0;transform:scale(1.5)}}
.hr .wf{position:absolute;inset:-16px;pointer-events:none;display:flex;align-items:center;justify-content:center;gap:2px;opacity:0;transition:opacity var(--tt,.3s)}
.hr.rec .wf{opacity:1}
.hr .wf i{width:2px;height:6px;border-radius:2px;background:var(--c3,${C3});transform-origin:50% 50%;animation:hww var(--tt,.7s) ease-in-out infinite alternate;animation-delay:calc(var(--i) * -.07s)}
@keyframes hww{to{transform:scaleY(3.4)}}`,
      'var hr=root.querySelector(".hr"),t=null;\n' +
      'function stop(){clearTimeout(t);t=null;hr.classList.remove("rec");}\n' +
      'hr.addEventListener("pointerdown",function(){t=setTimeout(function(){hr.classList.add("rec");},260);});\n' +
      'hr.addEventListener("pointerup",stop);hr.addEventListener("pointerleave",stop);\n' +
      'api.onCleanup(stop);'],
    ['follow', 'Follow / Following', `.fw{position:relative;overflow:hidden;min-width:112px}
.fw .l1,.fw .l2{display:block;transition:transform var(--tt,.4s) cubic-bezier(.3,1.3,.4,1),opacity var(--tt,.3s)}
.fw .l2{position:absolute;inset:0;display:grid;place-items:center;transform:translateY(120%)}
.fw.on{background:transparent;border-color:rgba(255,255,255,.18);color:#9a9ab0}
.fw.on .l1{transform:translateY(-120%);opacity:0}
.fw.on .l2{transform:none;opacity:1}
.fw::after{content:"";position:absolute;inset:0;background:var(--c1,${C1});transform:scaleX(0);transform-origin:0 50%;transition:transform var(--tt,.4s) cubic-bezier(.4,1,.3,1);z-index:-1}
.fw:hover::after{transform:scaleX(1)}
.fw span{position:relative;z-index:1}`,
      'var b=root.querySelector(".fw");\n' +
      'b.addEventListener("click",function(e){e.preventDefault();b.classList.toggle("on");});'],
    ['play', 'Play / Pause Morph', `.pp{width:46px;min-width:0;height:46px;padding:0;border-radius:50%;background:var(--c1,${C1});border:0}
.pp svg{width:20px;height:20px;fill:#fff}
.pp .tri{transform-origin:50% 50%;transition:transform var(--tt,.42s) cubic-bezier(.4,1.4,.4,1),opacity var(--tt,.3s)}
.pp .b1,.pp .b2{opacity:0;transform:scaleX(.3)}
.pp .b1,.pp .b2{transform-origin:50% 50%}
.pp.on .tri{opacity:0;transform:scaleX(.3)}
.pp.on .b1,.pp.on .b2{opacity:1;transform:none}
.pp .b1{transform:translateX(-4px) scaleX(.3)}
.pp.on .b1{transform:translateX(-3px) scaleX(1)}
.pp .b2{transform:translateX(4px) scaleX(.3)}
.pp.on .b2{transform:translateX(3px) scaleX(1)}
.pp::before{content:"";position:absolute;inset:0;border-radius:50%;border:1px solid var(--c1,${C1});opacity:0;transition:transform var(--dur,.6s),opacity var(--dur,.6s)}
.pp:active::before{transform:scale(1.5);opacity:.5}`,
      'var b=root.querySelector(".pp");\n' +
      'b.addEventListener("click",function(){b.classList.toggle("on");});'],
    ['bell', 'Notification Bell', `.bl{position:relative;width:44px;min-width:0;padding:0}
.bl svg{stroke:#c4c4d8;fill:none;stroke-width:1.7;transform-origin:50% 4px}
.bl.ring svg{animation:bring var(--dur,.9s) cubic-bezier(.36,.07,.19,.97) 2}
.bl .dot{position:absolute;right:9px;top:8px;min-width:15px;height:15px;border-radius:99px;background:var(--c3,${C3});color:#fff;font:700 9px/15px "JetBrains Mono",monospace;text-align:center;transform:scale(0);transition:transform var(--tt,.4s) cubic-bezier(.3,1.8,.4,1)}
.bl.has .dot{transform:scale(1)}
.bl .cl{stroke:var(--c3,${C3});transform-origin:50% 3px}
@keyframes bring{0%,100%{transform:rotate(0)}15%{transform:rotate(14deg)}30%{transform:rotate(-12deg)}45%{transform:rotate(8deg)}60%{transform:rotate(-6deg)}80%{transform:rotate(2deg)}}`,
      'var bl=root.querySelector(".bl"),dot=bl.querySelector(".dot"),n=0;\n' +
      'bl.addEventListener("click",function(){n=0;dot.textContent="";bl.classList.remove("has");});\n' +
      'api.raf(function(){if(bl.__n){n+=bl.__n;bl.__n=0;dot.textContent=n;bl.classList.add("has");bl.classList.remove("ring");void bl.offsetWidth;bl.classList.add("ring");}});\n' +
      'bl.addEventListener("pointerenter",function(){bl.__n=1;});'],
    ['trash', 'Swipe To Delete', `.sd{width:min(210px,96%);border-radius:12px;overflow:hidden;background:#12121c;border:1px solid rgba(255,255,255,.1);position:relative}
.sd .u2{position:absolute;inset:0;background:linear-gradient(90deg,var(--c3,${C3}),color-mix(in srgb,var(--c3,${C3}) 60%,#000));display:flex;align-items:center;justify-content:flex-end;gap:8px;padding:0 14px;color:#fff;font:700 11px/1 "JetBrains Mono",monospace;letter-spacing:.06em;text-transform:uppercase}
.sd .it{position:relative;display:flex;align-items:center;gap:9px;padding:11px 12px;background:#15151f;touch-action:pan-y;cursor:grab;transform:translateX(var(--dx,0px));transition:transform var(--tt,.4s) cubic-bezier(.3,1.2,.4,1)}
.sd .it.drag{transition:none;cursor:grabbing}
.sd .it.gone{transform:translateX(-105%);opacity:0;transition:transform var(--dur,.42s) cubic-bezier(.4,0,.6,1),opacity .3s .18s}
.sd .av{width:26px;height:26px;border-radius:50%;background:linear-gradient(140deg,var(--c1,${C1}),var(--c2,${C2}));flex:none}
.sd .ln{display:grid;gap:4px;flex:1}
.sd .ln b{font:600 12px/1 "Plus Jakarta Sans",system-ui;color:#eeeef6}
.sd .ln i{font:500 10px/1 "JetBrains Mono",monospace;color:#8b8ba3;font-style:normal}`,
      'var sd=root.querySelector(".sd"),it=sd.querySelector(".it"),dx=0,sx=0,drag=0;\n' +
      'it.addEventListener("pointerdown",function(e){drag=1;sx=e.clientX;it.classList.add("drag");it.setPointerCapture&&it.setPointerCapture(e.pointerId);});\n' +
      'it.addEventListener("pointermove",function(e){if(!drag)return;dx=Math.max(-120,Math.min(0,e.clientX-sx));it.style.setProperty("--dx",dx+"px");});\n' +
      'it.addEventListener("pointerup",function(){drag=0;it.classList.remove("drag");\n' +
      '  if(dx<-70){it.classList.add("gone");}else{it.style.setProperty("--dx","0px");}dx=0;});'],
    ['dragdrop', 'Drag To Reorder', `.rq{display:grid;gap:6px;width:min(200px,96%)}
.rq li{display:flex;align-items:center;gap:9px;padding:9px 10px;border-radius:10px;background:#15151f;border:1px solid rgba(255,255,255,.1);font:600 12px/1 "Plus Jakarta Sans",system-ui;color:#dcdce8;list-style:none;cursor:grab;touch-action:none;transition:transform var(--tt,.36s) cubic-bezier(.3,1.2,.4,1),box-shadow .25s,background .25s,opacity .25s}
.rq li b{width:12px;height:12px;border-radius:3px;background:var(--c1,${C1});flex:none;opacity:.75}
.rq li .hd2{display:grid;gap:2px;flex:none}
.rq li .hd2 i{width:10px;height:2px;border-radius:2px;background:#5b5b72}
.rq li.drag{position:relative;z-index:2;box-shadow:0 16px 30px -14px #000;background:color-mix(in srgb,var(--c1,${C1}) 26%,#15151f);transition:none;cursor:grabbing}
.rq li.hint{transform:translateY(var(--hy,0px))}`,
      'var rq=root.querySelector(".rq"),lis=[].slice.call(rq.querySelectorAll("li")),el2=null,startY=0,i0=0;\n' +
      'lis.forEach(function(li,i){li.addEventListener("pointerdown",function(e){el2=li;startY=e.clientY;i0=i;li.classList.add("drag");\n' +
      '  li.style.transform="translateY(0)";li.setPointerCapture&&li.setPointerCapture(e.pointerId);});});\n' +
      'var dy=0;\n' +
      'rq.addEventListener("pointermove",function(e){if(!el2)return;dy=e.clientY-startY;el2.style.transform="translateY("+dy+"px) scale(1.02)";\n' +
      '  var h=Math.round(dy/34);lis.forEach(function(li,i){var hy=0;if(i>i0&&i<=i0+h)hy=-34;if(i<i0&&i>=i0+h)hy=34;\n' +
      '    if(li!==el2){li.classList.toggle("hint",hy!==0);li.style.setProperty("--hy",hy+"px");}});});\n' +
      'rq.addEventListener("pointerup",function(){if(!el2)return;var h=Math.max(-3,Math.min(3,Math.round(dy/34)));dy=0;\n' +
      '  var j=Math.max(0,Math.min(lis.length-1,i0+h));var p=el2.parentNode;\n' +
      '  if(j>i0)p.insertBefore(el2,lis[j].nextSibling);else if(j<i0)p.insertBefore(el2,lis[j]);else p.insertBefore(el2,lis[i0]);\n' +
      '  el2.classList.remove("drag");el2.style.transform="";lis.forEach(function(li){li.classList.remove("hint");li.style.setProperty("--hy","0px")});el2=null;});']
  ].forEach(function (v) {
    var inner = '';
    if (v[0] === 'lock') inner = '<div class="ctl lk2"><div class="sh"><button class="pad2" aria-label="unlock"><svg class="op" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0"/><path d="M17 4l3 3"/></svg><svg class="cl" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></button><span class="dots"><i class="on"></i><i></i><i></i></span></div><span class="cap">tap dots 3\u00d7</span></div>';
    if (v[0] === 'hold') inner = '<div class="ctl hr"><span class="ring2"></span><span class="wf">' + mapJoin(13, function (i) { return '<i style="--i:' + i + '"></i>'; }, '') + '</span><b></b></div>';
    if (v[0] === 'follow') inner = '<button class="ac2 fw"><span class="l1">Follow</span><span class="l2">Following</span></button>';
    if (v[0] === 'play') inner = '<button class="ac2 pp"><svg viewBox="0 0 24 24"><path class="tri" d="M8 5l11 7-11 7z"/><rect class="b1" x="6" y="5" width="4" height="14" rx="1.4"/><rect class="b2" x="14" y="5" width="4" height="14" rx="1.4"/></svg></button>';
    if (v[0] === 'bell') inner = '<button class="ac2 bl"><svg viewBox="0 0 24 24"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2H4.5z"/><path class="cl" d="M10 21a2.2 2.2 0 0 0 4 0"/></svg><span class="dot"></span></button>';
    if (v[0] === 'trash') inner = '<div class="ctl sd"><div class="u2">Delete</div><div class="it"><span class="av"></span><span class="ln"><b>Design sync</b><i>swipe me left</i></span></div></div>';
    if (v[0] === 'dragdrop') inner = '<ul class="ctl rq">' + mapJoin(4, function (i) { return '<li><b></b>' + ['Intro', 'Loop', 'Outro', 'Sting'][i] + '<span class="hd2"><i></i><i></i><i></i></span></li>'; }, '') + '</ul>';
    ctl({ g: 'action', name: v[0], title: v[1], html: inner, css: join([act, v[2]]), js: v[3] });
  });

  /* ───────── odds & ends ───────── */
  ctl({
    g: 'action', name: 'hamburger', title: 'Hamburger Morph',
    html: '<label class="ctl hb"><input type="checkbox"><span class="bx"><i></i><i></i><i></i></span><span class="cap">Menu</span></label>',
    css: join([shell, `.hb .bx{position:relative;width:30px;height:24px;display:block}
.hb i{position:absolute;left:0;width:100%;height:2.5px;border-radius:3px;background:#e8e8f4;transition:transform var(--tt,.4s) cubic-bezier(.3,1.5,.4,1),width var(--tt,.3s),opacity .2s}
.hb i:nth-child(1){top:4px}
.hb i:nth-child(2){top:11px;width:72%}
.hb i:nth-child(3){top:18px}
.hb:hover i:nth-child(2){width:100%}
.hb input:checked~.bx i:nth-child(1){transform:translateY(7px) rotate(45deg)}
.hb input:checked~.bx i:nth-child(2){opacity:0;transform:translateX(-14px)}
.hb input:checked~.bx i:nth-child(3){transform:translateY(-7px) rotate(-45deg)}`]),
    cfg: STD.concat([range('Bar', '--bw2', 16, 46, 1, 30, 'px')])
  });
  ctl({
    g: 'action', name: 'tri-state', title: 'Tri-State Checkbox',
    html: '<div class="ctl ts"><button class="b"><span class="mk"></span></button><span class="lbl3">0 of 3</span></div>',
    css: join([shell, `.ts{gap:9px}
.ts .b{width:26px;height:26px;border-radius:8px;border:1.5px solid rgba(255,255,255,.24);background:#15151f;cursor:pointer;display:grid;place-items:center;padding:0;transition:background var(--tt,.26s),border-color var(--tt,.26s),transform var(--tt,.26s) cubic-bezier(.3,1.6,.4,1)}
.ts .b:active{transform:scale(.88)}
.ts .mk{position:relative;width:14px;height:14px;display:block}
.ts .mk::before,.ts .mk::after{content:"";position:absolute;border-radius:3px;background:#fff;transition:transform var(--tt,.34s) cubic-bezier(.3,1.6,.4,1),opacity .2s,width var(--tt,.3s)}
.ts .mk::before{left:0;top:6px;width:0;height:2.5px;transform:rotate(-45deg)}
.ts .mk::after{left:4px;top:8px;width:0;height:2.5px;transform:rotate(45deg)}
.ts.s1 .b{background:var(--c2,${C2});border-color:transparent}
.ts.s1 .mk::before{width:12px}
.ts.s1 .mk::after{width:6px}
.ts.s2 .b{background:#33334a;border-color:#4a4a5e}
.ts.s2 .mk::before{width:12px;height:3px;top:5.5px;left:1px;transform:none}
.ts.s2 .mk::after{width:0}
.ts .lbl3{font:600 11px/1 "JetBrains Mono",monospace;color:#8b8ba3}`]),
    js: 'var ts=root.querySelector(".ts"),b=ts.querySelector(".b"),n=0,lbl=ts.querySelector(".lbl3");\n' +
      'b.addEventListener("click",function(){n=(n+1)%3;ts.classList.remove("s1","s2");if(n===1)ts.classList.add("s1");if(n===2)ts.classList.add("s2");\n' +
      '  lbl.textContent=(n===2?"some":n===1?"all":"none")+" \u00b7 3 items";});',
    cfg: STD
  });
  ctl({
    g: 'action', name: 'dropzone', title: 'File Drop Zone',
    html: '<div class="ctl dz"><span class="in3"><span class="ic2"></span><b>Drop files</b><i>or click to browse</i></span><ul class="fl"></ul></div>',
    css: join([shell, `.dz{width:min(210px,96%);display:grid;gap:7px}
.dz .in3{display:grid;place-items:center;gap:5px;padding:16px 12px;border-radius:14px;border:1.5px dashed rgba(255,255,255,.22);background:#101018;color:#c4c4d8;text-align:center;cursor:pointer;transition:border-color var(--tt,.3s),background var(--tt,.3s),transform var(--tt,.3s) cubic-bezier(.3,1.4,.4,1)}
.dz .in3 b{font:700 12px/1 "Plus Jakarta Sans",system-ui;color:#fff}
.dz .in3 i{font:500 10px/1 "JetBrains Mono",monospace;font-style:normal;color:#7f7f96}
.dz.hot .in3{border-color:var(--c2,${C2});background:color-mix(in srgb,var(--c2,${C2}) 12%,#101018);transform:scale(1.02)}
.dz .ic2{width:26px;height:26px;border-radius:8px;background:linear-gradient(160deg,var(--c1,${C1}),var(--c2,${C2}));position:relative;animation:dzbob var(--dur,2.6s) ease-in-out infinite}
.dz .ic2::after{content:"";position:absolute;left:50%;top:50%;width:9px;height:9px;margin:-4.5px 0 0 -4.5px;border-left:2px solid #0c0c16;border-bottom:2px solid #0c0c16;transform:rotate(-135deg)}
@keyframes dzbob{50%{transform:translateY(-4px) rotate(-6deg)}}
.dz .fl{list-style:none;margin:0;padding:0;display:grid;gap:4px}
.dz .fl li{display:flex;align-items:center;gap:7px;padding:6px 8px;border-radius:9px;background:#15151f;font:600 11px/1 "JetBrains Mono",monospace;color:#c4c4d8;animation:dzin var(--tt,.42s) cubic-bezier(.3,1.5,.4,1) both}
.dz .fl li::before{content:"";width:8px;height:10px;border-radius:2px;background:var(--c2,${C2});flex:none}
.dz .fl li s{margin-left:auto;color:#6f6f85;text-decoration:none;cursor:pointer;transition:color .2s}
.dz .fl li s:hover{color:var(--c3,${C3})}
@keyframes dzin{from{opacity:0;transform:translateY(-8px) scale(.94)}to{opacity:1}}`]),
    js: 'var dz=root.querySelector(".dz"),ul=dz.querySelector(".fl"),nm=["clip.mp4","poster.png","spec.json","audio.wav"],k=0;\n' +
      'function hit(on){dz.classList.toggle("hot",on);}\n' +
      '["dragenter","dragover"].forEach(function(t){dz.addEventListener(t,function(e){e.preventDefault&&e.preventDefault();hit(1);});});\n' +
      '["dragleave","drop"].forEach(function(t){dz.addEventListener(t,function(e){e.preventDefault&&e.preventDefault();hit(0);if(t==="drop")add();});});\n' +
      'function add(){var li=document.createElement("li");li.textContent=nm[k++%nm.length];var s=document.createElement("s");s.textContent="\u00d7";\n' +
      '  s.addEventListener("click",function(){li.remove&&li.remove();});li.appendChild(s);ul.appendChild(li);}\n' +
      'dz.querySelector(".in3").addEventListener("click",add);',
    cfg: STD
  });
  ctl({
    g: 'action', name: 'captcha', title: 'Drag To Verify',
    html: '<div class="ctl cv"><span class="tr2"><b class="fill"></b><b class="kb">hold</b></span><span class="ok2">verified</span></div>',
    css: join([shell, `.cv{display:grid;gap:7px;width:min(200px,94%)}
.cv .tr2{position:relative;height:34px;border-radius:99px;background:#13131d;border:1px solid rgba(255,255,255,.13);overflow:hidden}
.cv .fill{position:absolute;inset:0;width:calc(var(--pn,0) * 100%);background:linear-gradient(90deg,color-mix(in srgb,var(--c1,${C1}) 55%,transparent),var(--c2,${C2}));transition:width .06s linear}
.cv .kb{position:absolute;left:0;top:3px;width:var(--kw,28px);height:28px;border-radius:50%;background:linear-gradient(180deg,#f4f4fb,#b6b6c8);box-shadow:0 3px 10px -2px #000;cursor:grab;display:grid;place-items:center;font:700 9px/1 "JetBrains Mono",monospace;color:#15151f;transform:translateX(calc((100% - var(--kw,28px)) * var(--pn,0)));transition:transform .06s linear}
.cv .ok2{font:600 10px/1 "JetBrains Mono",monospace;letter-spacing:.08em;text-transform:uppercase;color:#6f6f85;transition:color var(--tt,.3s)}
.cv.done .ok2{color:var(--c2,${C2})}
.cv.done .kb{background:var(--c2,${C2});cursor:default}
.cv.shake .tr2{animation:cvs var(--tt,.4s)}
@keyframes cvs{0%,100%{transform:none}25%{transform:translateX(-6px)}60%{transform:translateX(5px)}}`]),
    js: 'var cv=root.querySelector(".cv"),tr=cv.querySelector(".tr2"),kb=cv.querySelector(".kb"),p=0,drag=0,x0=0,p0=0,W=200;\n' +
      'function set(v){p=Math.max(0,Math.min(100,v));cv.style.setProperty("--pn",p/100+"");cv.classList.toggle("done",p>=99);}\n' +
      'kb.addEventListener("pointerdown",function(e){drag=1;x0=e.clientX;p0=p;kb.setPointerCapture&&kb.setPointerCapture(e.pointerId);});\n' +
      'kb.addEventListener("pointermove",function(e){if(!drag)return;var w=tr.getBoundingClientRect().width||W;set(p0+(e.clientX-x0)/w*100);});\n' +
      'kb.addEventListener("pointerup",function(){drag=0;if(p<99)set(0);else{p=100;set(100);}});\n' +
      'set(0);',
    cfg: STD
  });

  /* ───────── last batch: composite controls ───────── */
  ctl({
    g: 'group', name: 'toggle-list', title: 'Settings Rows',
    html: '<div class="ctl tls">' + mapJoin(4, function (i) {
      return '<label style="--i:' + i + '"><span>' + ['Push notifications', 'Auto-play video', 'Reduced motion', 'Weekly digest'][i] + '</span><input type="checkbox"' + (i !== 3 ? ' checked' : '') + '><i class="tr"></i></label>';
    }, '') + '</div>',
    css: join([shell, `.tls{display:grid;width:min(220px,96%);gap:3px}
.tls label{position:relative;display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:10px;font:500 12px/1.2 "Plus Jakarta Sans",system-ui;color:#c4c4d8;cursor:pointer;transition:background .22s,transform var(--tt,.3s);animation:tlsin var(--dur,.6s) cubic-bezier(.3,1.2,.4,1) both;animation-delay:calc(var(--i) * .07s)}
@keyframes tlsin{from{opacity:0;transform:translateX(-12px)}to{opacity:1}}
.tls label:hover{background:#16161f}
.tls span{flex:1}
.tls input{position:absolute;opacity:0;width:1px;height:1px}
.tls .tr{position:relative;width:34px;height:20px;border-radius:99px;background:#26263a;flex:none;transition:background var(--tt,.3s)}
.tls .tr::after{content:"";position:absolute;left:3px;top:3px;width:14px;height:14px;border-radius:50%;background:#e9e9f5;transition:transform var(--tt,.34s) cubic-bezier(.3,1.5,.4,1)}
.tls label:has(input:checked) .tr{background:var(--c1,${C1})}
.tls label:has(input:checked) .tr::after{transform:translateX(14px)}
.tls label:has(input:checked){color:#fff}`]),
    cfg: STD
  });
  ctl({
    g: 'group', name: 'emoji-grid', title: 'Emoji Picker',
    html: '<div class="ctl em"><div class="cats">' + mapJoin(3, function (i) { return '<button class="c' + (i === 0 ? ' on' : '') + '">' + ['Smileys', 'Gestures', 'Hearts'][i] + '</button>'; }, '') + '</div><div class="gd"></div><div class="rec">Recent:</div></div>',
    css: join([shell, `.em{display:grid;gap:7px;width:min(206px,96%);padding:9px;border-radius:14px;background:#12121c;border:1px solid rgba(255,255,255,.1)}
.em .cats{display:flex;gap:4px}
.em .cats button{border:0;background:transparent;padding:4px 8px;border-radius:7px;font:600 10px/1 "JetBrains Mono",monospace;letter-spacing:.04em;color:#8b8ba3;cursor:pointer;transition:background .2s,color .2s}
.em .cats button.on{background:#1e1e2c;color:#fff}
.em .gd{display:grid;grid-template-columns:repeat(6,1fr);gap:2px}
.em .gd button{border:0;background:transparent;font-size:17px;line-height:1;padding:4px 0;border-radius:8px;cursor:pointer;transition:transform var(--tt,.28s) cubic-bezier(.3,1.8,.4,1),background .2s}
.em .gd button:hover{background:#1e1e2c;transform:scale(1.35) translateY(-2px)}
.em .gd button:active{transform:scale(.95)}
.em.anim .gd button{animation:emin var(--tt,.42s) cubic-bezier(.3,1.4,.4,1) both;animation-delay:calc(var(--j) * .022s)}
@keyframes emin{from{opacity:0;transform:scale(.5) translateY(8px)}to{opacity:1}}
.em .rec{font:600 10px/1 "JetBrains Mono",monospace;color:#7f7f96;display:flex;gap:4px;align-items:center}
.em .rec i{font-size:14px;font-style:normal;animation:emin var(--tt,.4s) both}`]),
    js: 'var em=root.querySelector(".em"),gd=em.querySelector(".gd");\n' +
      'var sets=[["\u{1F600}","\u{1F60D}","\u{1F929}","\u{1F60E}","\u{1F973}","\u{1F62D}","\u{1F644}","\u{1F914}","\u{1F607}","\u{1F92F}","\u{1F635}","\u{1F928}"],\n' +
      '  ["\u{1F44D}","\u{1F44E}","\u{1F64F}","\u{1F44F}","\u{1F91D}","\u{1F4AA}","\u{1F44B}","\u{1F918}","\u{270C}","\u{1F91E}","\u{1F447}","\u{1F449}"],\n' +
      '  ["\u2764","\u{1F49B}","\u{1F49A}","\u{1F499}","\u{1F49C}","\u{1F90D}","\u{1F493}","\u{1F495}","\u{1F49E}","\u{1F498}","\u{1F49D}","\u{1F496}"]];\n' +
      'var cs=[].slice.call(em.querySelectorAll(".cats button"));\n' +
      'function fill(n){gd.innerHTML="";var j=0;\n' +
      '  sets[n].forEach(function(e){gd.insertAdjacentHTML("beforeend",\'<button style="--j:\'+(j++)+\'">\'+e+"</button>");});\n' +
      '  em.classList.remove("anim");void em.offsetWidth;em.classList.add("anim");}\n' +
      'cs.forEach(function(b,n){b.addEventListener("click",function(){cs.forEach(function(x){x.classList.remove("on")});b.classList.add("on");fill(n);});});\n' +
      'gd.addEventListener("click",function(e){var b=e.target.closest?e.target.closest("button"):null;\n' +
      '  if(b){var r=em.querySelector(".rec");r.insertAdjacentHTML("beforeend","<i>"+b.textContent+"</i>");if(r.querySelectorAll("i").length>4)r.querySelector("i").remove();}});\n' +
      'fill(0);',
    cfg: STD
  });
  ctl({
    g: 'group', name: 'plan-cards', title: 'Radio Plan Cards',
    html: '<div class="ctl pc">' + mapJoin(3, function (i) {
      return '<label><input type="radio" name="p"' + (i === 1 ? ' checked' : '') + '><b>' + ['Starter', 'Pro', 'Studio'][i] + '</b><s>' + ['$0', '$9', '$29'][i] + '/mo</s><i class="ck"></i></label>';
    }, '') + '</div>',
    css: join([shell, `.pc{display:grid;grid-auto-flow:column;gap:7px}
.pc label{position:relative;display:grid;gap:5px;padding:11px 12px;border-radius:14px;background:#13131d;border:1px solid rgba(255,255,255,.11);cursor:pointer;min-width:var(--pw3,64px);transition:border-color var(--tt,.3s),transform var(--tt,.36s) cubic-bezier(.3,1.5,.4,1),background var(--tt,.3s),box-shadow var(--tt,.3s)}
.pc label:hover{transform:translateY(-3px)}
.pc input{position:absolute;opacity:0;width:1px;height:1px}
.pc b{font:700 12px/1 "Plus Jakarta Sans",system-ui;color:#e8e8f4}
.pc s{text-decoration:none;font:600 10px/1 "JetBrains Mono",monospace;color:#8b8ba3}
.pc .ck{position:absolute;right:9px;top:9px;width:14px;height:14px;border-radius:50%;border:1.5px solid #3a3a4c;display:grid;place-items:center;transition:border-color var(--tt,.3s),background var(--tt,.3s)}
.pc .ck::after{content:"";width:6px;height:6px;border-radius:50%;background:#fff;transform:scale(0);transition:transform var(--tt,.34s) cubic-bezier(.3,1.9,.4,1)}
.pc label:has(input:checked){border-color:var(--c1,${C1});background:color-mix(in srgb,var(--c1,${C1}) 16%,#13131d);box-shadow:0 10px 26px -14px var(--c1,${C1})}
.pc label:has(input:checked) .ck{border-color:var(--c1,${C1});background:var(--c1,${C1})}
.pc label:has(input:checked) .ck::after{transform:scale(1)}
.pc label:has(input:checked) s{color:#cfcfe6}`]),
    cfg: STD.concat([range('Card', '--pw3', 52, 110, 2, 64, 'px')])
  });
  ctl({
    g: 'group', name: 'steps', title: 'Step Progress',
    html: '<div class="ctl sp2"><span class="rail"><b class="go"></b></span><span class="dots">' +
      mapJoin(4, function (i) { return '<i data-i="' + i + '"><s>' + (i + 1) + '</s>' + ['Cart', 'Ship', 'Pay', 'Done'][i] + '</i>'; }, '') +
      '</span><button class="nx">Next step</button></div>',
    css: join([shell, `.sp2{display:grid;gap:9px;width:min(230px,96%);padding:11px;border-radius:14px;background:#12121c;border:1px solid rgba(255,255,255,.1)}
.sp2 .rail{position:relative;height:3px;border-radius:3px;background:#22222f;overflow:hidden}
.sp2 .go{position:absolute;inset:0;width:0;border-radius:3px;background:linear-gradient(90deg,var(--c1,${C1}),var(--c2,${C2}));transition:width var(--dur,.5s) cubic-bezier(.4,1,.3,1)}
.sp2 .dots{display:flex;justify-content:space-between}
.sp2 .dots i{display:grid;justify-items:center;gap:5px;font:600 9.5px/1 "JetBrains Mono",monospace;color:#6f6f85;transition:color var(--tt,.3s)}
.sp2 .dots s{width:22px;height:22px;border-radius:50%;background:#191926;border:1px solid rgba(255,255,255,.16);display:grid;place-items:center;text-decoration:none;font:700 10px/1 "JetBrains Mono",monospace;color:#9a9ab0;transition:background var(--tt,.3s),color var(--tt,.3s),transform var(--tt,.4s) cubic-bezier(.3,1.7,.4,1),border-color .3s}
.sp2 .dots i.on{color:#fff}
.sp2 .dots i.on s{background:var(--c1,${C1});border-color:transparent;color:#fff;transform:scale(1.1)}
.sp2 .dots i.done s{background:var(--c2,${C2});border-color:transparent;color:#05130c}
.sp2 .nx{justify-self:start;padding:7px 12px;border-radius:9px;border:1px solid rgba(255,255,255,.14);background:#191926;color:#e8e8f4;font:600 11px/1 "Plus Jakarta Sans",system-ui;cursor:pointer;transition:background .2s,transform var(--tt,.24s) cubic-bezier(.3,1.5,.4,1)}
.sp2 .nx:hover{background:var(--c1,${C1});border-color:transparent}
.sp2 .nx:active{transform:scale(.94)}`]),
    js: 'var sp=root.querySelector(".sp2"),go=sp.querySelector(".go"),ns=[].slice.call(sp.querySelectorAll(".dots i")),i=0;\n' +
      'function paint(){go.style.width=(i/(ns.length-1)*100)+"%";\n' +
      '  ns.forEach(function(n2,x){n2.classList.toggle("on",x===i);n2.classList.toggle("done",x<i);\n' +
      '    n2.querySelector("s").textContent=x<i?"\\u2713":(x+1);});\n' +
      '  sp.querySelector(".nx").textContent=i>=ns.length-1?"Restart":"Next step";}\n' +
      'sp.querySelector(".nx").addEventListener("click",function(){i=i>=ns.length-1?0:i+1;paint();});\n' +
      'ns.forEach(function(n2,x){n2.addEventListener("click",function(){i=x;paint();});});paint();',
    cfg: STD
  });
  ctl({
    g: 'group', name: 'keycap', title: 'Keyboard Key Press',
    html: '<div class="ctl kc">' + mapJoin(5, function (i) { return '<b style="--i:' + i + '">' + ['M', 'L', 'A', 'B', 'B'][i] + '</b>'; }, '') + '</div>',
    css: join([shell, `.kc{display:flex;gap:var(--kg,5px)}
.kc b{width:var(--kw2,32px);height:var(--kh,36px);display:grid;place-items:center;border-radius:8px;background:linear-gradient(180deg,#2a2a3a,#191926);color:#eef;border:1px solid rgba(255,255,255,.14);box-shadow:0 var(--kk,4px) 0 -1px #0a0a12,0 calc(var(--kk,4px) + 3px) 10px -4px #000;font:700 13px/1 "JetBrains Mono",monospace;transform:translateY(0);transition:transform .09s ease,box-shadow .09s ease,background .2s,border-color .2s}
.kc b.hit{transform:translateY(var(--kk,4px));box-shadow:0 0 0 -1px #0a0a12,0 0 12px -2px var(--c1,${C1});background:linear-gradient(180deg,var(--c1,${C1}),color-mix(in srgb,var(--c1,${C1}) 60%,#000));border-color:transparent;color:#fff;animation:kpulse var(--tt,.5s) ease-out}
.kc b::after{content:"";position:absolute}
@keyframes kpulse{0%{filter:brightness(1.6)}100%{filter:none}}
.kc{position:relative}
.kc .wv{position:absolute;left:50%;top:-14px;width:0;height:0;border-radius:50%;border:1px solid var(--c2,${C2});transform:translateX(-50%);opacity:0}
.kc.hit2 .wv{animation:kwv var(--tt,.6s) ease-out}
@keyframes kwv{0%{opacity:.9;width:8px;height:8px}100%{opacity:0;width:60px;height:60px}}`]),
    js: 'var kc=root.querySelector(".kc"),bs=[].slice.call(kc.querySelectorAll("b"));\n' +
      'kc.insertAdjacentHTML("beforeend",\'<span class="wv"></span>\');\n' +
      'function tap(i){var b=bs[i];if(!b)return;b.classList.add("hit");kc.classList.add("hit2");\n' +
      '  setTimeout(function(){b.classList.remove("hit");kc.classList.remove("hit2");},200);}\n' +
      'bs.forEach(function(b,i){b.addEventListener("pointerdown",function(){tap(i);});});\n' +
      'var t=setInterval(function(){tap((Math.random()*bs.length)|0);},1400);\n' +
      'api.onCleanup(function(){clearInterval(t);});',
    cfg: STD.concat([range('Key', '--kw2', 22, 48, 1, 32, 'px'), range('Depth', '--kk', 1, 9, 1, 4, 'px')])
  });
  ctl({
    g: 'group', name: 'combo', title: 'Konami Style Combo',
    html: '<div class="ctl cb"><span class="seq">' + mapJoin(5, function (i) { return '<i>' + ['\u2191', '\u2191', '\u2193', '\u2193', '\u2715'][i] + '</i>'; }, '') + '</span><span class="ms2">press the arrows \u00b7 \u2191\u2191\u2193\u2193 then \u2715</span></div>',
    css: join([shell, `.cb{display:grid;gap:8px;justify-items:center}
.cb .seq{display:flex;gap:5px}
.cb i{width:26px;height:26px;display:grid;place-items:center;border-radius:8px;background:#15151f;border:1px solid rgba(255,255,255,.14);color:#8b8ba3;font:700 13px/1 system-ui;transition:transform var(--tt,.3s) cubic-bezier(.3,1.8,.4,1),background var(--tt,.3s),color var(--tt,.3s),border-color .3s,box-shadow .3s}
.cb i.hit{background:var(--c2,${C2});border-color:transparent;color:#04131b;transform:translateY(-4px) scale(1.08);box-shadow:0 6px 16px -6px var(--c2,${C2})}
.cb i.miss{background:var(--c3,${C3});border-color:transparent;color:#fff;animation:cbsh var(--tt,.4s)}
@keyframes cbsh{0%,100%{transform:none}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
.cb.win i{background:linear-gradient(180deg,var(--c1,${C1}),var(--c3,${C3}));border-color:transparent;color:#fff;animation:cbwin var(--dur,.9s) cubic-bezier(.3,1.5,.4,1) both;animation-delay:calc(var(--j,0) * .05s)}
.cb .ms2{font:600 10px/1.4 "JetBrains Mono",monospace;color:#7f7f96;text-align:center;transition:color .3s}
.cb.win .ms2{color:#fff}
@keyframes cbwin{0%{transform:scale(.6) rotate(-8deg)}60%{transform:scale(1.2)}100%{transform:none}}`]),
    js: 'var cb=root.querySelector(".cb"),ns=[].slice.call(cb.querySelectorAll("i")),k=0;\n' +
      'ns.forEach(function(n2,x){n2.style.setProperty("--j",x);});\n' +
      'function key(e){var want=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","Enter"][k];var got=e.key;\n' +
      '  if(got===want){ns[k].classList.add("hit");k++;}\n' +
      '  else{if(ns[k])ns[k].classList.add("miss");setTimeout(function(){ns.forEach(function(x2){x2.classList.remove("miss")})},420);k=0;}\n' +
      '  if(k>=ns.length){cb.classList.add("win");cb.querySelector(".ms2").textContent="combo complete \\u2728";}}\n' +
      'root.addEventListener("keydown",key);cb.addEventListener("pointerdown",function(){k=0;ns.forEach(function(x2){x2.classList.remove("hit")});cb.classList.remove("win");});',
    cfg: STD
  });
  ctl({
    g: 'group', name: 'avatars', title: 'Avatar Stack Spread',
    html: '<div class="ctl av"><b class="f"></b>' + mapJoin(6, function (i) { return '<i style="background:' + K.accent(i + 4) + '">' + String.fromCharCode(65 + i) + '</i>'; }, '') + '</div>',
    css: join([shell, `.av{position:relative;display:flex;align-items:center;padding-left:0}
.av i{position:relative;width:var(--as,30px);height:var(--as,30px);border-radius:50%;display:grid;place-items:center;font:700 11px/1 system-ui;color:#0b0b14;margin-left:calc(var(--as,30px) / -2.4);box-shadow:0 0 0 2px #0d0d16;transition:transform var(--tt,.4s) cubic-bezier(.3,1.5,.4,1),margin var(--tt,.4s) cubic-bezier(.3,1.4,.4,1);cursor:pointer}
.av:hover i{margin-left:3px}
.av i:hover{transform:translateY(-5px) scale(1.12);z-index:2}
.av .f{position:absolute;right:calc(100% + 6px);padding:4px 7px;border-radius:7px;background:#191926;border:1px solid rgba(255,255,255,.14);font:600 10px/1 "JetBrains Mono",monospace;color:#c4c4d8;white-space:nowrap;transition:transform var(--tt,.34s) cubic-bezier(.3,1.5,.4,1),border-color .3s;transform-origin:100% 50%}
.av .f::after{content:"";position:absolute;left:100%;top:50%;width:7px;height:7px;margin-top:-3.5px;background:#191926;clip-path:polygon(0 0,100% 50%,0 100%)}
.av:hover .f{transform:scale(1.05);border-color:var(--c2,${C2})}`]),
    cfg: STD.concat([range('Avatar', '--as', 18, 46, 1, 30, 'px')])
  });
  ctl({
    g: 'group', name: 'type-size', title: 'Type Size Control',
    html: '<div class="ctl ts2"><span class="pv">Aa</span><div class="opts">' + mapJoin(5, function (i) { return '<label><input type="radio" name="sz"><b>' + ['S', 'M', 'L', 'XL', 'XXL'][i] + '</b></label>'; }, '') + '</div></div>',
    css: join([shell, `.ts2{display:grid;gap:9px;justify-items:center;width:min(190px,94%);padding:11px;border-radius:14px;background:#12121c;border:1px solid rgba(255,255,255,.1)}
.ts2 .pv{font:700 var(--fs,17px)/1.15 "Plus Jakarta Sans",system-ui;color:#fff;transition:font-size var(--tt,.4s) cubic-bezier(.3,1.5,.4,1),color .3s;letter-spacing:-.01em;text-align:center}
.ts2 .opts{display:flex;gap:4px}
.ts2 label{position:relative;cursor:pointer}
.ts2 input{position:absolute;opacity:0;width:1px;height:1px}
.ts2 b{display:grid;place-items:center;min-width:var(--ow,30px);height:24px;border-radius:7px;background:#191926;border:1px solid rgba(255,255,255,.12);font:700 10px/1 "JetBrains Mono",monospace;color:#9a9ab0;transition:transform var(--tt,.32s) cubic-bezier(.3,1.7,.4,1),background var(--tt,.3s),color var(--tt,.3s),border-color .3s}
.ts2 label:hover b{transform:translateY(-2px)}
.ts2 label:has(input:checked) b{background:var(--c1,${C1});border-color:transparent;color:#fff;transform:translateY(-3px) scale(1.06);box-shadow:0 8px 18px -10px var(--c1,${C1})}`]),
    js: 'var ts=root.querySelector(".ts2"),lb=[].slice.call(ts.querySelectorAll("label")),pv=ts.querySelector(".pv");\n' +
      'var sizes=[13,17,22,28,34];\n' +
      'lb.forEach(function(l,i){l.addEventListener("click",function(){lb.forEach(function(x){x.querySelector("input").checked=false});\n' +
      '  l.querySelector("input").checked=true;pv.style.setProperty("font-size",sizes[i]+"px");\n' +
      '  pv.style.color=i>2?"var(--c2,#22d3ee)":"#fff";});});',
    cfg: STD.concat([range('Option', '--ow', 22, 48, 2, 30, 'px')])
  });

  K.add('controls', pool);
})(window);
