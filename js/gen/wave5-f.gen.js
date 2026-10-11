/* ============================================================
   Motion Lab — wave 5, CONTROLS (the 1,000-effect expansion)
   21 new mechanic families × 24 variants = 504 candidates.
   Every mechanic is a distinct control widget new to the
   collection; variants differ in geometry, rhythm, easing and
   palette. House rule: custom properties are only ever read
   with a fallback, never declared in demo CSS.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit, V = global.MLVary;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color;
  var cells = K.cells;

  function D(v, mul) { return Math.round(v.dur * (mul || 1) * 100) / 100; }
  function core(v, extra) {
    return [
      range('Cycle', '--dur', .2, 20, .05, D(v, 1), 's'),
      range('Stagger', '--step', 0, .6, .01, v.step, 's'),
      col('Control A', '--c1', v.c1),
      col('Control B', '--c2', v.c2),
      col('Control C', '--c3', v.c3)
    ].concat(extra || []);
  }
  function stageCss(v, extra) {
    return '.ct5{position:relative;width:100%;display:flex;align-items:center;justify-content:center;padding:10px;' + (extra || '') + '}';
  }

  var M = [];

  /* 1. piano play — the keys press through a little melody */
  M.push({ key: 'piano', title: 'Piano Play', tags: ['control', 'keys'], build: function (v) {
    var d = D(v, 3), keys = '';
    for (var i = 0; i < 7; i++) keys += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="ct5"><div class="pi">' + keys + '</div></div>',
      css: join([
        stageCss(v),
        '.pi{display:flex;gap:4px;padding:8px 10px 10px;background:rgba(10,10,18,.85);border-radius:12px;border:1px solid rgba(255,255,255,.08)}',
        '.pi i{width:var(--kw,22px);height:var(--kh,84px);border-radius:0 0 5px 5px;background:linear-gradient(180deg,#f4f4f8 0 88%,#d8d8e6 88%);box-shadow:0 3px 0 rgba(0,0,0,.35);animation:a' + v.i + ' var(--dur,' + d + 's) steps(1) infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / 7 * -1)}',
        kf('a' + v.i, '0%{background:linear-gradient(180deg,var(--c1,' + v.c1 + ') 0 88%,var(--c2,' + v.c2 + ') 88%);transform:translateY(2px);box-shadow:0 1px 0 rgba(0,0,0,.35)}14.3%,100%{background:linear-gradient(180deg,#f4f4f8 0 88%,#d8d8e6 88%);transform:translateY(0);box-shadow:0 3px 0 rgba(0,0,0,.35)}')
      ]),
      cfg: core(v, [range('Key width', '--kw', 14, 34, 1, 22, 'px'), range('Key height', '--kh', 56, 120, 2, 84, 'px')])
    };
  } });

  /* 2. drum pads — the pads hit a rhythm in sequence */
  M.push({ key: 'drumpads', title: 'Drum Pads', tags: ['control', 'pads'], build: function (v) {
    var d = D(v, 2);
    return {
      html: '<div class="ct5"><div class="dp">' + cells(6) + '</div></div>',
      css: join([
        stageCss(v),
        '.dp{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px;background:rgba(10,10,18,.85);border-radius:12px;border:1px solid rgba(255,255,255,.08)}',
        '.dp i{width:var(--pw,44px);height:var(--ph2,44px);border-radius:9px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);box-shadow:inset 0 -3px 0 rgba(0,0,0,.4);animation:a' + v.i + ' var(--dur,' + d + 's) steps(1) infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / 6 * -1)}',
        kf('a' + v.i, '0%{background:var(--c1,' + v.c1 + ');box-shadow:0 0 18px color-mix(in srgb,var(--c1,' + v.c1 + ') 70%,transparent),inset 0 -3px 0 rgba(0,0,0,.4);transform:scale(.94)}16.6%,100%{background:rgba(255,255,255,.07);box-shadow:inset 0 -3px 0 rgba(0,0,0,.4);transform:scale(1)}')
      ]),
      cfg: core(v, [range('Pad width', '--pw', 30, 64, 2, 44, 'px'), range('Pad height', '--ph2', 30, 64, 2, 44, 'px')])
    };
  } });

  /* 3. step sequencer — a playhead combs a grid of live cells */
  M.push({ key: 'stepseq', title: 'Step Sequencer', tags: ['control', 'sequencer'], build: function (v) {
    var d = D(v, 2.4), n = 8, r = 4, out = '', c, rr;
    for (rr = 0; rr < r; rr++) for (c = 0; c < n; c++) {
      var on = ((c * 3 + rr * 5 + v.i) % 7) < 3;
      out += '<i style="--i:' + c + ';--r:' + rr + '" class="' + (on ? 'on' : '') + '"></i>';
    }
    return {
      html: '<div class="ct5"><div class="sq"><i class="ph"></i><div class="gd">' + out + '</div></div></div>',
      css: join([
        stageCss(v),
        '.sq{position:relative;padding:10px;background:rgba(10,10,18,.85);border-radius:12px;border:1px solid rgba(255,255,255,.08)}',
        '.sq .gd{display:grid;grid-template-columns:repeat(' + n + ',1fr);gap:4px}',
        '.sq .gd i{width:var(--cw,16px);height:var(--ch2,12px);border-radius:3px;background:rgba(255,255,255,.09)}',
        '.sq .gd i.on{background:color-mix(in srgb,var(--c1,' + v.c1 + ') 45%,transparent)}',
        '.sq .gd i.on{animation:aq' + v.i + ' var(--dur,' + d + 's) steps(1) infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / ' + n + ')}',
        '.sq .ph{position:absolute;top:6px;bottom:6px;left:calc(10px + var(--i,0) * (var(--cw,16px) + 4px));width:var(--cw,16px);border-radius:3px;background:transparent;box-shadow:0 0 0 1.5px var(--c2,' + v.c2 + '),0 0 14px color-mix(in srgb,var(--c2,' + v.c2 + ') 60%,transparent);animation:ap' + v.i + ' var(--dur,' + d + 's) steps(' + n + ',end) infinite}',
        kf('aq' + v.i, '0%{background:var(--c2,' + v.c2 + ');box-shadow:0 0 12px var(--c2,' + v.c2 + ')}12.5%,100%{background:color-mix(in srgb,var(--c1,' + v.c1 + ') 45%,transparent);box-shadow:none}'),
        kf('ap' + v.i, '0%{--i:0}12.5%{--i:1}25%{--i:2}37.5%{--i:3}50%{--i:4}62.5%{--i:5}75%{--i:6}87.5%{--i:7}')
      ]),
      cfg: core(v, [range('Cell width', '--cw', 10, 26, 1, 16, 'px'), range('Cell height', '--ch2', 8, 20, 1, 12, 'px')])
    };
  } });

  /* 4. encoder tick — a knob detents through the ticks one notch at a time */
  M.push({ key: 'encodertick', title: 'Encoder Tick', tags: ['control', 'knob'], build: function (v) {
    var d = D(v, 2.6), ticks = '';
    for (var i = 0; i < 8; i++) ticks += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="ct5"><div class="en">' + ticks + '<b class="knob"><u></u></b></div></div>',
      css: join([
        stageCss(v),
        '.en{position:relative;width:var(--sz,96px);height:var(--sz,96px)}',
        '.en i{position:absolute;inset:0;transform:rotate(calc(var(--i) * 45deg))}',
        '.en i::after{content:"";position:absolute;left:50%;top:2px;width:2.5px;height:8px;margin-left:-1.25px;border-radius:2px;background:rgba(200,200,225,.4);animation:et-a' + v.i + ' var(--dur,' + d + 's) steps(1) infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -8)}',
        '.en .knob{position:absolute;inset:16%;border-radius:50%;background:radial-gradient(circle at 34% 30%,#3a3a50,#191926 70%);border:1px solid rgba(255,255,255,.14);box-shadow:0 10px 20px -10px rgba(0,0,0,.8);animation:et-b' + v.i + ' var(--dur,' + d + 's) steps(8) infinite}',
        '.en .knob u{position:absolute;left:50%;top:8%;width:4px;height:32%;margin-left:-2px;border-radius:2px;background:var(--c1,' + v.c1 + ');box-shadow:0 0 8px var(--c1,' + v.c1 + ')}',
        kf('et-a' + v.i, '0%{background:var(--c3,' + v.c3 + ');box-shadow:0 0 10px var(--c3,' + v.c3 + ')}12.5%,100%{background:rgba(200,200,225,.4);box-shadow:none}'),
        kf('et-b' + v.i, 'from{transform:rotate(0)}to{transform:rotate(450deg)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 64, 150, 2, 96, 'px')])
    };
  } });

  /* 5. ladder faders — a bank of vertical faders ride different phases */
  M.push({ key: 'ladderfader', title: 'Ladder Faders', tags: ['control', 'fader'], build: function (v) {
    var d = D(v, 2.2), fads = '';
    for (var i = 0; i < 5; i++) fads += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="ct5"><div class="lf">' + fads + '</div></div>',
      css: join([
        stageCss(v),
        '.lf{display:flex;gap:var(--gap,10px);align-items:flex-end;height:var(--h,110px);padding:12px 16px;background:rgba(10,10,18,.85);border-radius:12px;border:1px solid rgba(255,255,255,.08)}',
        '.lf i{position:relative;width:6px;height:100%;border-radius:99px;background:rgba(255,255,255,.12)}',
        '.lf i::after{content:"";position:absolute;left:50%;bottom:var(--lo,20%);width:var(--cap,22px);height:12px;margin-left:calc(var(--cap,22px)/-2);border-radius:4px;background:linear-gradient(180deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));box-shadow:0 4px 10px rgba(0,0,0,.5);animation:lf-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -5 * ' + (v.i % 2 ? '1' : '-1') + ')}',
        kf('lf-a' + v.i, '0%,100%{transform:translateY(0)}50%{transform:translateY(calc(-1 * var(--tr,34px)))}')
      ]),
      cfg: core(v, [range('Travel', '--tr', 16, 70, 2, 34, 'px'), range('Cap', '--cap', 14, 34, 2, 22, 'px'), range('Gap', '--gap', 6, 20, 1, 10, 'px')])
    };
  } });

  /* 6. paddle flip — the paddles trade up and down in pairs */
  M.push({ key: 'paddleflip', title: 'Paddle Flip', tags: ['control', 'flip'], build: function (v) {
    var d = D(v, 2);
    return {
      html: '<div class="ct5"><div class="pf">' + cells(4) + '</div></div>',
      css: join([
        stageCss(v),
        '.pf{display:flex;gap:8px;perspective:500px;padding:12px;background:rgba(10,10,18,.85);border-radius:12px;border:1px solid rgba(255,255,255,.08)}',
        '.pf i{width:var(--pw,34px);height:var(--ph2,52px);border-radius:6px;transform-style:preserve-3d;animation:pf-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.6,0,.3,1) infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -4)}',
        '.pf i::before,.pf i::after{content:"";position:absolute;inset:0;border-radius:6px;backface-visibility:hidden;-webkit-backface-visibility:hidden}',
        '.pf i::before{background:linear-gradient(180deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '))}',
        '.pf i::after{background:linear-gradient(180deg,var(--c3,' + v.c3 + '),rgba(20,20,32,.9));transform:rotateX(180deg)}',
        kf('pf-a' + v.i, '0%,42%{transform:rotateX(0)}58%,92%{transform:rotateX(180deg)}100%{transform:rotateX(360deg)}')
      ]),
      cfg: core(v, [range('Paddle width', '--pw', 22, 52, 2, 34, 'px'), range('Paddle height', '--ph2', 34, 72, 2, 52, 'px')])
    };
  } });

  /* 7. key bounce — the keycaps press in a travelling wave */
  M.push({ key: 'keybounce', title: 'Key Bounce', tags: ['control', 'keys'], build: function (v) {
    var d = D(v, 2.4), keys = '';
    for (var i = 0; i < 9; i++) keys += '<i style="--dl:' + (i % 3 + Math.floor(i / 3)) + '"></i>';
    return {
      html: '<div class="ct5"><div class="kb">' + keys + '</div></div>',
      css: join([
        stageCss(v),
        '.kb{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;padding:12px;background:rgba(10,10,18,.85);border-radius:12px;border:1px solid rgba(255,255,255,.08)}',
        '.kb i{width:var(--kw,30px);height:var(--kh,30px);border-radius:7px;background:linear-gradient(180deg,#2c2c40,#1a1a28);border:1px solid rgba(255,255,255,.1);box-shadow:0 4px 0 rgba(0,0,0,.45);display:grid;place-items:center;font:700 11px ui-monospace,monospace;color:rgba(220,220,240,.7);animation:kb-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--dl,0) * var(--step,' + v.step + 's) * -1)}',
        kf('kb-a' + v.i, '0%,100%{transform:translateY(0);box-shadow:0 4px 0 rgba(0,0,0,.45);border-color:rgba(255,255,255,.1)}45%{transform:translateY(4px);box-shadow:0 0 0 rgba(0,0,0,.45);border-color:var(--c1,' + v.c1 + ');color:var(--c2,' + v.c2 + ')}')
      ]),
      cfg: core(v, [range('Key width', '--kw', 20, 44, 2, 30, 'px'), range('Key height', '--kh', 20, 44, 2, 30, 'px')])
    };
  } });

  /* 8. ballistic needle — the needle hunts between detents with a spring */
  M.push({ key: 'ballistic', title: 'Ballistic Needle', tags: ['control', 'gauge'], build: function (v) {
    var d = D(v, 3);
    return {
      html: '<div class="ct5"><div class="bn"><i class="arc"></i><b class="ndl"></b></div></div>',
      css: join([
        stageCss(v),
        '.bn{position:relative;width:var(--sz,130px);height:calc(var(--sz,130px) * .58);overflow:hidden}',
        '.bn .arc{position:absolute;left:50%;top:52%;width:calc(var(--sz,130px) * .9);height:calc(var(--sz,130px) * .9);margin:0 0 0 calc(var(--sz,130px) * -.45);border-radius:50%;border:var(--th,8px) solid rgba(255,255,255,.1);border-bottom-color:transparent;border-left-color:transparent}',
        '.bn .ndl{position:absolute;left:50%;bottom:50%;width:3px;height:40%;margin-left:-1.5px;border-radius:99px;background:var(--c3,' + v.c3 + ');box-shadow:0 0 8px var(--c3,' + v.c3 + ');transform-origin:50% 100%;animation:bn-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.3,1.5,.4,1) infinite}',
        kf('bn-a' + v.i, '0%{transform:rotate(-100deg)}20%{transform:rotate(20deg)}38%{transform:rotate(-40deg)}58%{transform:rotate(88deg)}78%{transform:rotate(10deg)}100%{transform:rotate(-100deg)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 90, 190, 2, 130, 'px'), range('Needle thick', '--th', 4, 16, 1, 8, 'px')])
    };
  } });

  /* 9. toggle wave — a wall of mini switches flips in a diagonal wave */
  M.push({ key: 'togglewave', title: 'Toggle Wave', tags: ['control', 'switch'], build: function (v) {
    var d = D(v, 2.6), out = '';
    for (var i = 0; i < 15; i++) out += '<i style="--i:' + (i % 5) + ';--r:' + Math.floor(i / 5) + '"></i>';
    return {
      html: '<div class="ct5"><div class="tw">' + out + '</div></div>',
      css: join([
        stageCss(v),
        '.tw{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;padding:12px;background:rgba(10,10,18,.85);border-radius:12px;border:1px solid rgba(255,255,255,.08)}',
        '.tw i{position:relative;width:var(--sw,22px);height:var(--sh2,12px);border-radius:99px;background:rgba(255,255,255,.14)}',
        '.tw i::after{content:"";position:absolute;top:2px;left:2px;width:8px;height:8px;border-radius:50%;background:#e8e8f2;transition:transform .2s;animation:tw-a' + v.i + ' var(--dur,' + d + 's) steps(1) infinite;animation-delay:calc((var(--i) + var(--r)) * var(--step,' + v.step + 's) * -2)}',
        kf('tw-a' + v.i, '0%{transform:translateX(0)}50%,100%{transform:translateX(10px)}'),
        '.tw i{animation:tw-b' + v.i + ' var(--dur,' + d + 's) steps(1) infinite;animation-delay:calc((var(--i) + var(--r)) * var(--step,' + v.step + 's) * -2)}',
        kf('tw-b' + v.i, '0%{background:rgba(255,255,255,.14)}50%,100%{background:var(--c1,' + v.c1 + ')}')
      ]),
      cfg: core(v, [range('Switch width', '--sw', 16, 32, 1, 22, 'px'), range('Switch height', '--sh2', 8, 18, 1, 12, 'px')])
    };
  } });

  /* 10. notch wheel — the notched ring clicks past the pointer */
  M.push({ key: 'notchwheel', title: 'Notch Wheel', tags: ['control', 'wheel'], build: function (v) {
    var d = D(v, 2.4), ticks = '';
    for (var i = 0; i < 12; i++) ticks += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="ct5"><div class="nw">' + ticks + '<b class="pt"></b></div></div>',
      css: join([
        stageCss(v),
        '.nw{position:relative;width:var(--sz,110px);height:var(--sz,110px);animation:nw-a' + v.i + ' var(--dur,' + d + 's) steps(12) infinite}',
        '.nw i{position:absolute;inset:0;transform:rotate(calc(var(--i) * 30deg))}',
        '.nw i::after{content:"";position:absolute;left:50%;top:6px;width:3px;height:10px;margin-left:-1.5px;border-radius:2px;background:color-mix(in srgb,var(--c1,' + v.c1 + ') 80%,transparent)}',
        '.nw::after{content:"";position:absolute;inset:24%;border-radius:50%;border:1px solid rgba(255,255,255,.15);background:radial-gradient(circle at 35% 30%,#2c2c42,#15151f 75%)}',
        '.nw .pt{position:absolute;left:50%;top:-3px;width:0;height:0;margin-left:-5px;border-left:5px solid transparent;border-right:5px solid transparent;border-top:9px solid var(--c3,' + v.c3 + ');filter:drop-shadow(0 0 5px var(--c3,' + v.c3 + '))}',
        kf('nw-a' + v.i, 'from{transform:rotate(0)}to{transform:rotate(300deg)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 72, 160, 2, 110, 'px')])
    };
  } });

  /* 11. crossfader — two caps trade the track while the meters follow */
  M.push({ key: 'crossfader', title: 'Crossfader', tags: ['control', 'fader'], build: function (v) {
    var d = D(v, 2.4);
    return {
      html: '<div class="ct5"><div class="xf"><div class="mk"><b class="ll">L</b><b class="rr">R</b></div><div class="tr"><i class="cl"></i><i class="cr"></i></div></div></div>',
      css: join([
        stageCss(v),
        '.xf{width:var(--w,190px);display:flex;flex-direction:column;gap:10px;padding:14px;background:rgba(10,10,18,.85);border-radius:12px;border:1px solid rgba(255,255,255,.08)}',
        '.xf .mk{display:flex;gap:6px}',
        '.xf .mk b{flex:1;height:6px;border-radius:99px;transform-origin:0 50%;animation:xf-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.xf .ll{background:linear-gradient(90deg,var(--c1,' + v.c1 + '),transparent)}',
        '.xf .rr{background:linear-gradient(270deg,var(--c2,' + v.c2 + '),transparent);transform-origin:100% 50%;animation:xf-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.xf .tr{position:relative;height:10px;border-radius:99px;background:rgba(255,255,255,.12)}',
        '.xf .tr i{position:absolute;top:50%;width:22px;height:18px;margin-top:-9px;border-radius:4px;background:linear-gradient(180deg,#e8e8f2,#b9b9cf);box-shadow:0 4px 8px rgba(0,0,0,.5)}',
        '.xf .cl{animation:xf-c' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.xf .cr{animation:xf-d' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('xf-a' + v.i, '0%,100%{transform:scaleX(1)}50%{transform:scaleX(.15)}'),
        kf('xf-b' + v.i, '0%,100%{transform:scaleX(.15)}50%{transform:scaleX(1)}'),
        kf('xf-c' + v.i, '0%,100%{left:2%}50%{left:68%}'),
        kf('xf-d' + v.i, '0%,100%{left:68%}50%{left:2%}')
      ]),
      cfg: core(v, [range('Width', '--w', 140, 240, 2, 190, 'px')])
    };
  } });

  /* 12. knob trio — three knobs sweep their ranges in relay */
  M.push({ key: 'knobtrio', title: 'Knob Trio', tags: ['control', 'knob'], build: function (v) {
    var d = D(v, 3);
    return {
      html: '<div class="ct5"><div class="kt"><i class="k1"><u></u></i><i class="k2"><u></u></i><i class="k3"><u></u></i></div></div>',
      css: join([
        stageCss(v),
        '.kt{display:flex;gap:var(--gap,14px);padding:14px;background:rgba(10,10,18,.85);border-radius:12px;border:1px solid rgba(255,255,255,.08)}',
        '.kt i{position:relative;width:var(--sz,44px);height:var(--sz,44px);border-radius:50%;background:radial-gradient(circle at 34% 30%,#33334a,#17171f 72%);border:1px solid rgba(255,255,255,.14);box-shadow:0 8px 16px -8px rgba(0,0,0,.8)}',
        '.kt u{position:absolute;left:50%;top:9%;width:4px;height:36%;margin-left:-2px;border-radius:2px;background:var(--c1,' + v.c1 + ');box-shadow:0 0 6px var(--c1,' + v.c1 + ')}',
        '.kt .k1{animation:kt-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.kt .k2{animation:kt-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--dur,' + d + 's) / -3)}',
        '.kt .k3{animation:kt-c' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--dur,' + d + 's) / -1.5)}',
        kf('kt-a' + v.i, '0%,100%{transform:rotate(-120deg)}50%{transform:rotate(120deg)}'),
        kf('kt-b' + v.i, '0%,100%{transform:rotate(120deg)}50%{transform:rotate(-60deg)}'),
        kf('kt-c' + v.i, '0%,100%{transform:rotate(-60deg)}50%{transform:rotate(60deg)}')
      ]),
      cfg: core(v, [range('Knob size', '--sz', 30, 64, 2, 44, 'px'), range('Gap', '--gap', 8, 26, 1, 14, 'px')])
    };
  } });

  /* 13. cube switch — a 3D cube rotates through its four states */
  M.push({ key: 'cubeswitch', title: 'Cube Switch', tags: ['control', '3d'], build: function (v) {
    var d = D(v, 3.6);
    return {
      html: '<div class="ct5"><div class="cs"><div class="cube"><i class="f1"></i><i class="f2"></i><i class="f3"></i><i class="f4"></i></div></div></div>',
      css: join([
        stageCss(v),
        '.cs{perspective:460px}',
        '.cs .cube{position:relative;width:var(--sz,64px);height:var(--sz,64px);transform-style:preserve-3d;animation:cs-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.7,0,.2,1) infinite}',
        '.cs i{position:absolute;inset:0;display:grid;place-items:center;font:800 20px system-ui;color:rgba(255,255,255,.92);backface-visibility:hidden;-webkit-backface-visibility:hidden;border:1px solid rgba(255,255,255,.25);border-radius:10px}',
        '.cs .f1{background:var(--c1,' + v.c1 + ');transform:rotateY(0) translateZ(calc(var(--sz,64px)/2))}',
        '.cs .f2{background:var(--c2,' + v.c2 + ');transform:rotateY(90deg) translateZ(calc(var(--sz,64px)/2))}',
        '.cs .f3{background:var(--c3,' + v.c3 + ');transform:rotateY(180deg) translateZ(calc(var(--sz,64px)/2))}',
        '.cs .f4{background:rgba(30,30,46,.95);transform:rotateY(270deg) translateZ(calc(var(--sz,64px)/2))}',
        kf('cs-a' + v.i, '0%,20%{transform:rotateY(0)}30%,50%{transform:rotateY(-90deg)}60%,80%{transform:rotateY(-180deg)}90%,100%{transform:rotateY(-270deg)}100%{transform:rotateY(-360deg)}')
      ]),
      cfg: core(v, [range('Cube size', '--sz', 40, 96, 2, 64, 'px')])
    };
  } });

  /* 14. speedometer — the needle and the digits agree on a looping speed */
  M.push({ key: 'speedo', title: 'Speedometer', tags: ['control', 'gauge', 'js'], build: function (v) {
    return {
      html: '<div class="ct5"><div class="sp2"><i class="arc"></i><b class="ndl"></b><div class="dig"><u class="dg">000</u><s>km/h</s></div></div></div>',
      css: join([
        stageCss(v),
        '.sp2{position:relative;width:var(--sz,150px);height:calc(var(--sz,150px) * .6);background:rgba(10,10,18,.85);border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.08)}',
        '.sp2 .arc{position:absolute;left:50%;top:54%;width:calc(var(--sz,150px) * .94);height:calc(var(--sz,150px) * .94);margin:0 0 0 calc(var(--sz,150px) * -.47);border-radius:50%;border:var(--th,9px) solid rgba(255,255,255,.1);border-bottom-color:transparent;border-left-color:transparent}',
        '.sp2 .ndl{position:absolute;left:50%;bottom:46%;width:3px;height:34%;margin-left:-1.5px;border-radius:99px;background:var(--c3,' + v.c3 + ');box-shadow:0 0 8px var(--c3,' + v.c3 + ');transform-origin:50% 100%;transform:rotate(-90deg)}',
        '.sp2 .dig{position:absolute;left:0;right:0;bottom:8px;text-align:center}',
        '.sp2 .dg{font:800 20px/1 ui-monospace,monospace;color:var(--c1,' + v.c1 + ');letter-spacing:.06em}',
        '.sp2 s{font:600 9px system-ui;color:rgba(220,220,240,.55);text-decoration:none;letter-spacing:.14em}',
        '.sp2{animation:sp2-a' + v.i + ' var(--dur,' + D(v, 4) + 's) ease-in-out infinite}',
        kf('sp2-a' + v.i, '0%,100%{box-shadow:inset 0 0 0 0 transparent}50%{box-shadow:inset 0 0 24px -12px color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent)}')
      ]),
      js: 'var ndl=root.querySelector(".sp2 .ndl"),dg=root.querySelector(".sp2 .dg"),t=0;api.raf(function(){t+=.016;var cyc=6.4,m=t%cyc,ph=m/cyc;var v=Math.sin(ph*3.1416);var speed=Math.round(v*240);ndl.style.transform="rotate("+(-90+v*180)+"deg)";dg.textContent=String(speed).padStart(3,"0");});',
      cfg: core(v, [range('Size', '--sz', 110, 220, 2, 150, 'px'), range('Needle thick', '--th', 5, 16, 1, 9, 'px')])
    };
  } });

  /* 15. tap tempo — the pad taps itself and the pulse rings keep time */
  M.push({ key: 'taptempo', title: 'Tap Tempo', tags: ['control', 'tempo', 'js'], build: function (v) {
    return {
      html: '<div class="ct5"><div class="tp"><i class="ring"></i><i class="ring"></i><b class="pad"></b><u class="bpm">120</u></div></div>',
      css: join([
        stageCss(v),
        '.tp{position:relative;width:120px;height:120px;display:grid;place-items:center}',
        '.tp .pad{width:74px;height:74px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#34344c,#15151d 74%);border:1px solid rgba(255,255,255,.16);box-shadow:0 12px 24px -12px rgba(0,0,0,.8);z-index:2;animation:tp-a' + v.i + ' calc(var(--dur,' + D(v, 1) + 's)) ease-in-out infinite}',
        '.tp .ring{position:absolute;inset:0;border:2px solid var(--c1,' + v.c1 + ');border-radius:50%;opacity:0}',
        '.tp .ring:nth-of-type(2){animation-delay:calc(var(--dur,' + D(v, 1) + 's) / -2)}',
        '.tp .bpm{position:absolute;bottom:-24px;font:800 15px ui-monospace,monospace;color:var(--c2,' + v.c2 + ');letter-spacing:.1em}',
        kf('tp-a' + v.i, '0%{transform:scale(1)}12%{transform:scale(.9);box-shadow:0 0 22px -2px color-mix(in srgb,var(--c3,' + v.c3 + ') 70%,transparent)}40%,100%{transform:scale(1)}')
      ]),
      js: 'var tp=root.querySelector(".tp"),rings=tp.querySelectorAll(".ring"),t=0;var period=60/120;api.raf(function(){t+=.016;if(t<period)return;t-=period;for(var i=0;i<rings.length;i++){(function(r,dl){setTimeout(function(){if(r.animate)r.animate([{transform:"scale(.62)",opacity:.9},{transform:"scale(1.55)",opacity:0}],{duration:650,easing:"ease-out"});},dl);})(rings[i],i*320);}});',
      cfg: core(v, [range('Cycle', '--dur', .2, 20, .05, 1, 's')])
    };
  } });

  /* 16. stereo levels — L and R LED stacks bounce to their own groove */
  M.push({ key: 'stereolevel', title: 'Stereo Levels', tags: ['control', 'meter'], build: function (v) {
    var d = D(v, 1.2), out = '';
    for (var i = 0; i < 5; i++) out += '<i class="l" style="--i:' + i + '"></i>';
    var outR = '';
    for (i = 0; i < 5; i++) outR += '<i class="r" style="--i:' + i + '"></i>';
    return {
      html: '<div class="ct5"><div class="sl2"><div class="mch">' + out + '</div><div class="mch">' + outR + '</div><b class="lab">L</b><b class="lab">R</b></div></div>',
      css: join([
        stageCss(v),
        '.sl2{display:flex;gap:26px;align-items:flex-end;padding:14px;background:rgba(10,10,18,.85);border-radius:12px;border:1px solid rgba(255,255,255,.08)}',
        '.sl2 .mch{display:flex;flex-direction:column-reverse;gap:4px}',
        '.sl2 i{width:var(--mw,26px);height:var(--mh,9px);border-radius:3px;background:rgba(255,255,255,.1);animation:sl2-a' + v.i + ' var(--dur,' + d + 's) steps(1) infinite}',
        '.sl2 .l i{animation-delay:calc(var(--i) * var(--dur,' + d + 's) / 5 * -1)}',
        '.sl2 .r i{animation-delay:calc(var(--i) * var(--dur,' + d + 's) / 5 * -1 * 3)}',
        '.sl2 .lab{position:absolute;bottom:-22px;font:800 11px system-ui;color:rgba(220,220,240,.6)}',
        '.sl2{position:relative}',
        '.sl2 .lab:first-of-type{left:34px}',
        '.sl2 .lab:last-of-type{right:34px}',
        kf('sl2-a' + v.i, '0%{background:var(--c1,' + v.c1 + ');box-shadow:0 0 8px color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent)}20%,100%{background:var(--c3,' + v.c3 + ');box-shadow:none}')
      ]),
      cfg: core(v, [range('Segment width', '--mw', 16, 40, 2, 26, 'px'), range('Segment height', '--mh', 6, 14, 1, 9, 'px')])
    };
  } });

  /* 17. wave dial — the dial turns and the wave rides its amplitude */
  M.push({ key: 'wavedial', title: 'Wave Dial', tags: ['control', 'dial'], build: function (v) {
    var d = D(v, 2.6), bars = '';
    for (var i = 0; i < 9; i++) bars += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="ct5"><div class="wd"><div class="bars">' + bars + '</div><i class="dk"><u></u></i></div></div>',
      css: join([
        stageCss(v),
        '.wd{display:flex;gap:18px;align-items:center;padding:14px;background:rgba(10,10,18,.85);border-radius:12px;border:1px solid rgba(255,255,255,.08)}',
        '.wd .bars{display:flex;align-items:center;gap:4px;height:64px}',
        '.wd .bars i{width:5px;height:100%;border-radius:99px;background:linear-gradient(180deg,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + '));transform-origin:50% 50%;animation:wd-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -9)}',
        '.wd .dk{position:relative;width:var(--sz,52px);height:var(--sz,52px);border-radius:50%;background:radial-gradient(circle at 34% 30%,#33334a,#17171f 72%);border:1px solid rgba(255,255,255,.14);animation:wd-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.wd .dk u{position:absolute;left:50%;top:9%;width:4px;height:36%;margin-left:-2px;border-radius:2px;background:var(--c3,' + v.c3 + ')}',
        kf('wd-a' + v.i, '0%,100%{transform:scaleY(.15)}50%{transform:scaleY(1)}'),
        kf('wd-b' + v.i, '0%,100%{transform:rotate(-130deg)}50%{transform:rotate(130deg)}')
      ]),
      cfg: core(v, [range('Dial size', '--sz', 36, 80, 2, 52, 'px')])
    };
  } });

  /* 18. vote paddles — the crowd flips paddles up and down in turns */
  M.push({ key: 'votepaddles', title: 'Vote Paddles', tags: ['control', 'flip'], build: function (v) {
    var d = D(v, 2.2);
    return {
      html: '<div class="ct5"><div class="vp">' + cells(5) + '</div></div>',
      css: join([
        stageCss(v),
        '.vp{display:flex;gap:8px;align-items:flex-end;padding:14px;background:rgba(10,10,18,.85);border-radius:12px;border:1px solid rgba(255,255,255,.08);perspective:400px}',
        '.vp i{position:relative;width:var(--pw,24px);height:var(--ph2,60px);border-radius:5px 5px 2px 2px;transform-origin:50% 100%;animation:vp-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -2)}',
        '.vp i::before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(180deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '))}',
        '.vp i::after{content:"";position:absolute;bottom:-8px;left:50%;width:4px;height:8px;margin-left:-2px;background:rgba(200,200,225,.5)}',
        kf('vp-a' + v.i, '0%,40%{transform:rotateX(0)}55%,95%{transform:rotateX(-74deg)}100%{transform:rotateX(-360deg)}')
      ]),
      cfg: core(v, [range('Paddle width', '--pw', 16, 36, 1, 24, 'px'), range('Paddle height', '--ph2', 40, 84, 2, 60, 'px')])
    };
  } });

  /* 19. chase sliders — two thumbs hunt each other around the track */
  M.push({ key: 'chasesliders', title: 'Chase Sliders', tags: ['control', 'slider'], build: function (v) {
    var d = D(v, 3);
    return {
      html: '<div class="ct5"><div class="ch2"><i class="fill"></i><b class="t1"></b><b class="t2"></b></div></div>',
      css: join([
        stageCss(v),
        '.ch2{position:relative;width:var(--w,190px);height:12px;border-radius:99px;background:rgba(255,255,255,.12)}',
        '.ch2 .fill{position:absolute;top:0;bottom:0;left:0;border-radius:99px;background:linear-gradient(90deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));animation:ch2-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.ch2 b{position:absolute;top:50%;width:20px;height:20px;margin-top:-10px;border-radius:50%;background:#e8e8f2;box-shadow:0 4px 10px rgba(0,0,0,.5)}',
        '.ch2 .t1{animation:ch2-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.ch2 .t2{background:var(--c3,' + v.c3 + ');animation:ch2-c' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('ch2-b' + v.i, '0%,100%{left:2%}50%{left:76%}'),
        kf('ch2-c' + v.i, '0%,100%{left:76%}50%{left:2%}'),
        kf('ch2-a' + v.i, '0%,100%{width:74%;border-radius:99px}50%{width:74%}')
      ]),
      cfg: core(v, [range('Width', '--w', 130, 240, 2, 190, 'px')])
    };
  } });

  /* 20. strobe beacon — the beacon flashes its aviation pattern */
  M.push({ key: 'strobe', title: 'Strobe Beacon', tags: ['control', 'beacon'], build: function (v) {
    var d = D(v, 1.8);
    return {
      html: '<div class="ct5"><div class="sb"><i class="lens"></i><b class="bulb"></b></div></div>',
      css: join([
        stageCss(v),
        '.sb{position:relative;width:var(--sz,84px);height:var(--sz,84px);display:grid;place-items:center;padding:12px;background:rgba(10,10,18,.85);border-radius:12px;border:1px solid rgba(255,255,255,.08)}',
        '.sb .lens{position:absolute;inset:0;border-radius:12px;background:repeating-conic-gradient(from 0deg,color-mix(in srgb,var(--c3,' + v.c3 + ') 16%,transparent) 0 14deg,transparent 14deg 45deg);animation:sb-a' + v.i + ' calc(var(--dur,' + d + 's) * 2) linear infinite;opacity:.5}',
        '.sb .bulb{position:relative;width:34px;height:34px;border-radius:50%;background:var(--c3,' + v.c3 + ');z-index:1;animation:sb-b' + v.i + ' var(--dur,' + d + 's) steps(1) infinite}',
        kf('sb-a' + v.i, 'to{transform:rotate(1turn)}'),
        kf('sb-b' + v.i, '0%,14%{background:var(--c3,' + v.c3 + ');box-shadow:0 0 26px 6px color-mix(in srgb,var(--c3,' + v.c3 + ') 80%,transparent)}20%,32%{background:rgba(60,60,80,.6);box-shadow:none}38%,52%{background:var(--c3,' + v.c3 + ');box-shadow:0 0 26px 6px color-mix(in srgb,var(--c3,' + v.c3 + ') 80%,transparent)}58%,100%{background:rgba(60,60,80,.6);box-shadow:none}')
      ]),
      cfg: core(v, [range('Size', '--sz', 60, 130, 2, 84, 'px')])
    };
  } });

  /* 21. odometer — the digit drums roll to the next value in relay */
  M.push({ key: 'odometer', title: 'Odometer Drum', tags: ['control', 'counter'], build: function (v) {
    var d = D(v, 2.6), drums = '';
    for (var k = 0; k < 3; k++) {
      var col = '';
      for (var g = 0; g <= 9; g++) col += '<b>' + g + '</b>';
      drums += '<i class="dm">' + col + '</i>';
    }
    return {
      html: '<div class="ct5"><div class="od">' + drums + '</div></div>',
      css: join([
        stageCss(v),
        '.od{display:flex;gap:5px;padding:12px;background:rgba(10,10,18,.85);border-radius:12px;border:1px solid rgba(255,255,255,.08)}',
        '.od .dm{display:block;width:var(--dw,30px);height:var(--dh,40px);overflow:hidden;border-radius:7px;background:linear-gradient(180deg,rgba(0,0,0,.5),transparent 30% 70%,rgba(0,0,0,.5)),rgba(255,255,255,.07)}',
        '.od .dm b{display:block;height:var(--dh,40px);line-height:var(--dh,40px);text-align:center;font:800 20px/1 ui-monospace,monospace;color:var(--c1,' + v.c1 + ')}',
        '.od .dm{animation:od-a' + v.i + ' var(--dur,' + d + 's) steps(10) infinite}',
        '.od .dm:nth-child(2){animation-duration:calc(var(--dur,' + d + 's) * 10);animation-direction:reverse}',
        '.od .dm:nth-child(3){animation-duration:calc(var(--dur,' + d + 's) * 100)}',
        kf('od-a' + v.i, 'to{transform:translateY(calc(-10 * var(--dh,40px)))}')
      ]),
      cfg: core(v, [range('Drum width', '--dw', 22, 44, 2, 30, 'px'), range('Drum height', '--dh', 28, 56, 2, 40, 'px')])
    };
  } });

  K.add('controls', V.matrix('controls', M, 24, 'w5ct'));
})(window);
