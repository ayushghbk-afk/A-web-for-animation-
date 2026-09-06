/* ============================================================
   Nature & Weather — 400 organic, atmospheric effects
   Rain, snow, fire, smoke, clouds, leaves, waves, lightning, fireflies,
   bubbles, growing vines, sun/moon cycles, ripples, dust, blossoms.
   Same matrix approach: one mechanic, many genuinely different variants.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit, V = global.MLVary;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color;

  function stage(extra) {
    return '.nst{position:relative;width:var(--w,250px);height:var(--h,170px);border-radius:var(--round,16px);overflow:hidden;' + (extra || '') + '}';
  }
  function baseCfg(v, extra) {
    return [
      range('Cycle', '--dur', .2, 10, .05, v.dur, 's'),
      range('Width', '--w', 140, 460, 5, 250, 'px'),
      range('Height', '--h', 90, 320, 2, 170, 'px'),
      range('Corner', '--round', 0, 34, 1, 16, 'px'),
      col('Colour', '--c1', v.c1),
      col('Colour B', '--c2', v.c2),
      col('Colour C', '--c3', v.c3)
    ].concat(extra || []);
  }
  function drops(n, r, cls) {
    var out = '';
    for (var i = 0; i < n; i++) {
      out += '<i class="' + cls + '" style="--i:' + i + ';--x:' + (r() * 100).toFixed(1) + ';--d:' + (r() * 2.4).toFixed(2) + ';--s:' + (.5 + r() * 1.2).toFixed(2) + '"></i>';
    }
    return out;
  }

  var M = [];

  /* ─── 1. rainfall ─── */
  M.push({ key: 'rain', title: 'Rainfall', tags: ['nature', 'weather'], build: function (v) {
    var n = 26 + (v.i % 22);
    return {
      html: '<div class="nst rain">' + drops(n, v.rnd, 'd') + '</div>',
      css: join([
        stage('background:linear-gradient(180deg,color-mix(in srgb,var(--c3,' + v.c3 + ') 22%,#0b0b18),#0b0b18)'),
        '.rain .d{position:absolute;top:-18%;left:calc(var(--x) * 1%);width:var(--tw,2px);height:calc(var(--len,16px) * var(--s));border-radius:99px;background:linear-gradient(180deg,transparent,var(--c1,' + v.c1 + '));animation:nrain-' + v.i + ' calc(var(--dur,' + v.dur + 's) / var(--s)) linear infinite;animation-delay:calc(var(--d) * -1s);transform:rotate(var(--tilt,8deg))}',
        kf('nrain-' + v.i, 'to{transform:translateY(150%) rotate(var(--tilt,8deg))}')
      ]),
      cfg: baseCfg(v, [range('Drop length', '--len', 6, 46, 1, 16, 'px'), range('Drop width', '--tw', 1, 8, .5, 2, 'px'), range('Tilt', '--tilt', -30, 30, 1, 8, 'deg')])
    };
  } });

  /* ─── 2. snowfall ─── */
  M.push({ key: 'snow', title: 'Snowfall', tags: ['nature', 'weather'], build: function (v) {
    var n = 22 + (v.i % 20);
    return {
      html: '<div class="nst snow">' + drops(n, v.rnd, 'f') + '</div>',
      css: join([
        stage('background:linear-gradient(180deg,#101024,color-mix(in srgb,var(--c2,' + v.c2 + ') 18%,#0b0b18))'),
        '.snow .f{position:absolute;top:-10%;left:calc(var(--x) * 1%);width:calc(var(--flake,7px) * var(--s));height:calc(var(--flake,7px) * var(--s));border-radius:50%;background:var(--c1,' + v.c1 + ');filter:blur(calc(var(--soft,.6px) * var(--s)));opacity:var(--fade,.85);animation:nsnow-' + v.i + ' calc(var(--dur,' + (v.dur * 3) + 's) / var(--s)) linear infinite;animation-delay:calc(var(--d) * -2s)}',
        kf('nsnow-' + v.i, '0%{transform:translate(0,0)}50%{transform:translate(calc(var(--drift,18px) * 1),90px)}100%{transform:translate(0,190px)}')
      ]),
      cfg: baseCfg(v, [range('Flake', '--flake', 2, 18, .5, 7, 'px'), range('Drift', '--drift', -60, 60, 2, 18, 'px'), range('Softness', '--soft', 0, 4, .1, .6, 'px'), range('Opacity', '--fade', .2, 1, .05, .85)])
    };
  } });

  /* ─── 3. campfire ─── */
  M.push({ key: 'fire', title: 'Flame Tongue', tags: ['nature', 'fire'], build: function (v) {
    var n = 4 + (v.i % 5), out = '';
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + ';--o:' + ((i - n / 2) * 8).toFixed(0) + '"></i>';
    return {
      html: '<div class="nfi">' + out + '<u></u></div>',
      css: join([
        '.nfi{position:relative;width:var(--w,140px);height:var(--h,170px);display:grid;place-items:end center}',
        '.nfi i{position:absolute;bottom:14px;left:50%;width:calc(var(--fw,46px) - var(--i) * 6px);height:calc(var(--fh,120px) - var(--i) * 16px);margin-left:calc(var(--o) * 1px - var(--fw,46px) / 2);border-radius:50% 50% 44% 44% / 68% 68% 32% 32%;background:radial-gradient(ellipse at 50% 85%,var(--c1,' + v.c1 + '),color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,transparent) 62%,transparent 78%);filter:blur(var(--soft,3px));mix-blend-mode:screen;transform-origin:50% 100%;animation:nfi-' + v.i + ' calc(var(--dur,' + v.dur + 's) + var(--i) * .12s) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * -.15s)}',
        '.nfi u{position:absolute;bottom:0;width:var(--fw,46px);height:12px;border-radius:99px;background:var(--c3,' + v.c3 + ');filter:blur(6px)}',
        kf('nfi-' + v.i, '0%,100%{transform:translateY(0) scale(1,1) skewX(0)}25%{transform:translateY(-6px) scale(.92,1.1) skewX(5deg)}55%{transform:translateY(-2px) scale(1.06,.94) skewX(-6deg)}80%{transform:translateY(-8px) scale(.96,1.06) skewX(3deg)}')
      ]),
      cfg: [range('Cycle', '--dur', .2, 5, .05, v.dur, 's'), range('Flame width', '--fw', 20, 100, 2, 46, 'px'), range('Flame height', '--fh', 50, 220, 2, 120, 'px'), range('Softness', '--soft', 0, 12, .5, 3, 'px'), range('Stage width', '--w', 90, 300, 5, 140, 'px'), range('Stage height', '--h', 100, 300, 5, 170, 'px'), col('Colour', '--c1', v.c1), col('Colour B', '--c2', v.c2), col('Ember', '--c3', v.c3)]
    };
  } });

  /* ─── 4. drifting smoke ─── */
  M.push({ key: 'smoke', title: 'Drifting Smoke', tags: ['nature', 'atmosphere'], build: function (v) {
    var n = 5 + (v.i % 5), out = '';
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + ';--x:' + ((v.rnd() - .5) * 40).toFixed(0) + '"></i>';
    return {
      html: '<div class="nsm">' + out + '</div>',
      css: join([
        '.nsm{position:relative;width:var(--w,180px);height:var(--h,200px);overflow:hidden}',
        '.nsm i{position:absolute;bottom:-10%;left:50%;width:var(--puff,58px);height:var(--puff,58px);margin-left:calc(var(--puff,58px) / -2);border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent),transparent 70%);filter:blur(var(--soft,8px));animation:nsm-' + v.i + ' calc(var(--dur,' + (v.dur * 3) + 's)) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,-.7s))}',
        kf('nsm-' + v.i, '0%{transform:translate(0,0) scale(.4);opacity:0}20%{opacity:var(--fade,.8)}100%{transform:translate(calc(var(--x) * 1px),-190px) scale(2.4);opacity:0}')
      ]),
      cfg: [range('Cycle', '--dur', 1, 14, .1, v.dur * 3, 's'), range('Puff size', '--puff', 20, 130, 2, 58, 'px'), range('Softness', '--soft', 0, 26, 1, 8, 'px'), range('Opacity', '--fade', .1, 1, .05, .8), range('Stagger', '--step', -2, -.05, .05, -.7, 's'), range('Width', '--w', 100, 340, 5, 180, 'px'), range('Height', '--h', 110, 340, 5, 200, 'px'), col('Smoke', '--c1', v.c1)]
    };
  } });

  /* ─── 5. rolling clouds ─── */
  M.push({ key: 'clouds', title: 'Rolling Clouds', tags: ['nature', 'sky'], build: function (v) {
    var n = 3 + (v.i % 4), out = '';
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + ';--y:' + (10 + v.rnd() * 60).toFixed(0) + ';--s:' + (.6 + v.rnd() * .9).toFixed(2) + '"></i>';
    return {
      html: '<div class="nst ncl">' + out + '<b class="sun"></b></div>',
      css: join([
        stage('background:linear-gradient(180deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 45%,#0d1024),color-mix(in srgb,var(--c3,' + v.c3 + ') 25%,#0d1024))'),
        '.ncl i{position:absolute;top:calc(var(--y) * 1%);left:-30%;width:calc(var(--cw,84px) * var(--s));height:calc(var(--cw,84px) * var(--s) * .38);border-radius:99px;background:var(--c1,' + v.c1 + ');opacity:var(--fade,.55);filter:blur(var(--soft,4px));animation:ncl-' + v.i + ' calc(var(--dur,' + (v.dur * 5) + 's) / var(--s)) linear infinite;animation-delay:calc(var(--i) * -2.4s)}',
        '.ncl i::before{content:"";position:absolute;top:-42%;left:22%;width:52%;height:110%;border-radius:50%;background:inherit}',
        '.ncl .sun{position:absolute;top:16%;right:14%;width:var(--sun,42px);height:var(--sun,42px);border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 var(--glow,34px) var(--c3,' + v.c3 + ')}',
        kf('ncl-' + v.i, 'to{transform:translateX(400px)}')
      ]),
      cfg: baseCfg(v, [range('Cloud width', '--cw', 40, 200, 2, 84, 'px'), range('Softness', '--soft', 0, 18, .5, 4, 'px'), range('Opacity', '--fade', .1, 1, .05, .55), range('Sun', '--sun', 0, 90, 2, 42, 'px'), range('Glow', '--glow', 0, 70, 2, 34, 'px')])
    };
  } });

  /* ─── 6. falling leaves ─── */
  M.push({ key: 'leaves', title: 'Falling Leaves', tags: ['nature', 'autumn'], build: function (v) {
    var n = 10 + (v.i % 12);
    return {
      html: '<div class="nst nlv">' + drops(n, v.rnd, 'l') + '</div>',
      css: join([
        stage('background:linear-gradient(180deg,#0e0d1a,color-mix(in srgb,var(--c3,' + v.c3 + ') 14%,#0e0d1a))'),
        '.nlv .l{position:absolute;top:-14%;left:calc(var(--x) * 1%);width:calc(var(--leaf,14px) * var(--s));height:calc(var(--leaf,14px) * var(--s) * .62);border-radius:0 100% 0 100%;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));animation:nlv-' + v.i + ' calc(var(--dur,' + (v.dur * 4) + 's) / var(--s)) ' + v.ease + ' infinite;animation-delay:calc(var(--d) * -1.6s)}',
        kf('nlv-' + v.i, '0%{transform:translate(0,0) rotate(0)}35%{transform:translate(calc(var(--sway,30px) * 1),70px) rotate(140deg)}70%{transform:translate(calc(var(--sway,30px) * -1),140px) rotate(280deg)}100%{transform:translate(0,215px) rotate(420deg)}')
      ]),
      cfg: baseCfg(v, [range('Leaf', '--leaf', 5, 34, 1, 14, 'px'), range('Sway', '--sway', 0, 90, 2, 30, 'px')])
    };
  } });

  /* ─── 7. ocean waves ─── */
  M.push({ key: 'waves', title: 'Ocean Waves', tags: ['nature', 'water'], build: function (v) {
    return {
      html: '<div class="nst nwv"><i></i><i></i><i></i></div>',
      css: join([
        stage('background:linear-gradient(180deg,#0b1024,color-mix(in srgb,var(--c1,' + v.c1 + ') 30%,#0b1024))'),
        '.nwv i{position:absolute;left:-50%;bottom:calc(var(--lift,0px) + 0%);width:200%;height:var(--amp,60px);border-radius:44%;background:color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent);animation:nwv-' + v.i + ' var(--dur,' + (v.dur * 3) + 's) linear infinite;animation-direction:' + v.dir + '}',
        '.nwv i:nth-child(2){bottom:calc(var(--lift,0px) - 12px);background:color-mix(in srgb,var(--c2,' + v.c2 + ') 45%,transparent);animation-duration:calc(var(--dur,' + (v.dur * 3) + 's) * 1.4);animation-direction:reverse}',
        '.nwv i:nth-child(3){bottom:calc(var(--lift,0px) - 26px);background:color-mix(in srgb,var(--c3,' + v.c3 + ') 40%,transparent);animation-duration:calc(var(--dur,' + (v.dur * 3) + 's) * 1.9)}',
        kf('nwv-' + v.i, '0%{transform:translateX(0) rotate(0)}100%{transform:translateX(25%) rotate(360deg)}')
      ]),
      cfg: baseCfg(v, [range('Amplitude', '--amp', 20, 180, 2, 60, 'px'), range('Water line', '--lift', -60, 80, 2, 0, 'px')])
    };
  } });

  /* ─── 8. lightning storm ─── */
  M.push({ key: 'storm', title: 'Lightning Storm', tags: ['nature', 'weather'], build: function (v) {
    return {
      html: '<div class="nst nlt"><svg viewBox="0 0 100 120"><path d="M56 6 34 62h18l-8 52 32-66H56l12-42z"/></svg><b></b></div>',
      css: join([
        stage('background:linear-gradient(180deg,#0a0a16,#12122a)'),
        '.nlt svg{position:absolute;top:50%;left:50%;width:var(--bolt,64px);transform:translate(-50%,-50%)}',
        '.nlt path{fill:var(--c1,' + v.c1 + ');filter:drop-shadow(0 0 var(--glow,18px) var(--c2,' + v.c2 + '));animation:nlt-' + v.i + ' var(--dur,' + (v.dur * 1.6) + 's) ' + v.ease + ' infinite}',
        '.nlt b{position:absolute;inset:0;background:var(--c3,' + v.c3 + ');mix-blend-mode:screen;opacity:0;animation:nltf-' + v.i + ' var(--dur,' + (v.dur * 1.6) + 's) steps(1,end) infinite}',
        kf('nlt-' + v.i, '0%,72%,100%{opacity:0;transform:translate(-50%,-50%) scale(.9)}74%,78%{opacity:1;transform:translate(-50%,-50%) scale(1)}80%{opacity:.15}84%{opacity:.95}88%{opacity:0}'),
        kf('nltf-' + v.i, '0%,73%,100%{opacity:0}74%{opacity:var(--flash,.28)}77%{opacity:0}84%{opacity:calc(var(--flash,.28) * .7)}86%{opacity:0}')
      ]),
      cfg: baseCfg(v, [range('Bolt', '--bolt', 24, 150, 2, 64, 'px'), range('Glow', '--glow', 0, 60, 2, 18, 'px'), range('Flash', '--flash', 0, .8, .02, .28)])
    };
  } });

  /* ─── 9. fireflies ─── */
  M.push({ key: 'fireflies', title: 'Fireflies', tags: ['nature', 'night'], build: function (v) {
    var n = 12 + (v.i % 14), out = '';
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + ';--x:' + (v.rnd() * 92).toFixed(1) + ';--y:' + (v.rnd() * 88).toFixed(1) + ';--d:' + (v.rnd() * 3).toFixed(2) + ';--s:' + (.6 + v.rnd()).toFixed(2) + '"></i>';
    return {
      html: '<div class="nst nff">' + out + '</div>',
      css: join([
        stage('background:radial-gradient(120% 90% at 50% 100%,color-mix(in srgb,var(--c3,' + v.c3 + ') 22%,#080a14),#060610)'),
        '.nff i{position:absolute;left:calc(var(--x) * 1%);top:calc(var(--y) * 1%);width:calc(var(--dot,7px) * var(--s));height:calc(var(--dot,7px) * var(--s));border-radius:50%;background:var(--c1,' + v.c1 + ');box-shadow:0 0 var(--glow,14px) var(--c2,' + v.c2 + ');animation:nff-' + v.i + ' calc(var(--dur,' + (v.dur * 2.4) + 's) * var(--s)) ' + v.ease + ' infinite;animation-delay:calc(var(--d) * -1s)}',
        kf('nff-' + v.i, '0%,100%{opacity:0;transform:translate(0,0) scale(.5)}30%{opacity:1;transform:translate(calc(var(--rove,16px) * 1),calc(var(--rove,16px) * -.6)) scale(1)}60%{opacity:.4;transform:translate(calc(var(--rove,16px) * -.8),calc(var(--rove,16px) * .5)) scale(.8)}')
      ]),
      cfg: baseCfg(v, [range('Dot', '--dot', 2, 20, .5, 7, 'px'), range('Glow', '--glow', 0, 40, 1, 14, 'px'), range('Roam', '--rove', 0, 70, 2, 16, 'px')])
    };
  } });

  /* ─── 10. rising bubbles ─── */
  M.push({ key: 'bubbles', title: 'Rising Bubbles', tags: ['nature', 'water'], build: function (v) {
    var n = 14 + (v.i % 14);
    return {
      html: '<div class="nst nbb">' + drops(n, v.rnd, 'b') + '</div>',
      css: join([
        stage('background:linear-gradient(180deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 16%,#08101c),#050a14)'),
        '.nbb .b{position:absolute;bottom:-12%;left:calc(var(--x) * 1%);width:calc(var(--bub,13px) * var(--s));height:calc(var(--bub,13px) * var(--s));border-radius:50%;border:var(--tw,1.5px) solid var(--c2,' + v.c2 + ');background:radial-gradient(circle at 32% 30%,color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent),transparent 62%);animation:nbb-' + v.i + ' calc(var(--dur,' + (v.dur * 3) + 's) / var(--s)) ' + v.ease + ' infinite;animation-delay:calc(var(--d) * -1.5s)}',
        kf('nbb-' + v.i, '0%{transform:translate(0,0);opacity:0}12%{opacity:var(--fade,.9)}50%{transform:translate(calc(var(--sway,14px) * 1),-100px)}100%{transform:translate(calc(var(--sway,14px) * -1),-210px);opacity:0}')
      ]),
      cfg: baseCfg(v, [range('Bubble', '--bub', 4, 40, 1, 13, 'px'), range('Wall', '--tw', .5, 5, .25, 1.5, 'px'), range('Sway', '--sway', 0, 50, 1, 14, 'px'), range('Opacity', '--fade', .2, 1, .05, .9)])
    };
  } });

  /* ─── 11. growing vine ─── */
  M.push({ key: 'vine', title: 'Growing Vine', tags: ['nature', 'svg', 'plant'], build: function (v) {
    var bend = 20 + (v.i % 9) * 6;
    return {
      html: '<svg class="nvn" viewBox="0 0 120 160"><path class="st" d="M60 158C60 120 ' + (60 - bend) + ' 108 60 78S' + (60 + bend) + ' 34 60 8"/><circle class="lf" cx="46" cy="112" r="9"/><circle class="lf" cx="76" cy="82" r="8"/><circle class="lf" cx="48" cy="52" r="7"/><circle class="lf" cx="70" cy="24" r="6"/></svg>',
      css: join([
        '.nvn{width:var(--w,150px);height:auto}',
        '.nvn .st{fill:none;stroke:var(--c1,' + v.c1 + ');stroke-width:var(--thick,4px);stroke-linecap:round;stroke-dasharray:230;animation:nvn-' + v.i + ' var(--dur,' + (v.dur * 2) + 's) ' + v.ease + ' infinite}',
        '.nvn .lf{fill:var(--c2,' + v.c2 + ');transform-origin:60px 90px;animation:nvnl-' + v.i + ' var(--dur,' + (v.dur * 2) + 's) ' + v.ease + ' infinite}',
        '.nvn .lf:nth-of-type(2){fill:var(--c3,' + v.c3 + ');animation-delay:calc(var(--step,' + v.step + 's) * 3)}',
        '.nvn .lf:nth-of-type(3){animation-delay:calc(var(--step,' + v.step + 's) * 6)}',
        '.nvn .lf:nth-of-type(4){fill:var(--c3,' + v.c3 + ');animation-delay:calc(var(--step,' + v.step + 's) * 9)}',
        kf('nvn-' + v.i, '0%{stroke-dashoffset:230}55%,100%{stroke-dashoffset:0}'),
        kf('nvnl-' + v.i, '0%,25%{transform:scale(0)}60%,100%{transform:scale(1)}')
      ]),
      cfg: [range('Cycle', '--dur', .4, 10, .05, v.dur * 2, 's'), range('Stagger', '--step', 0, .5, .01, v.step, 's'), range('Width', '--w', 80, 300, 5, 150, 'px'), range('Stroke', '--thick', 1, 12, .5, 4, 'px'), col('Stem', '--c1', v.c1), col('Leaf', '--c2', v.c2), col('Leaf B', '--c3', v.c3)]
    };
  } });

  /* ─── 12. sun / moon cycle ─── */
  M.push({ key: 'cycle', title: 'Day & Night Cycle', tags: ['nature', 'sky'], build: function (v) {
    return {
      html: '<div class="nst ncy"><b class="s"></b><b class="m"></b><i class="hz"></i></div>',
      css: join([
        stage('background:linear-gradient(180deg,#0a0a1c,#121228);'),
        '.ncy b{position:absolute;top:50%;left:50%;width:var(--orb,38px);height:var(--orb,38px);margin:calc(var(--orb,38px) / -2);border-radius:50%;animation:ncy-' + v.i + ' var(--dur,' + (v.dur * 4) + 's) linear infinite}',
        '.ncy .s{background:var(--c1,' + v.c1 + ');box-shadow:0 0 var(--glow,34px) var(--c1,' + v.c1 + ')}',
        '.ncy .m{background:var(--c2,' + v.c2 + ');box-shadow:0 0 calc(var(--glow,34px) * .6) var(--c2,' + v.c2 + ');animation-delay:calc(var(--dur,' + (v.dur * 4) + 's) / -2)}',
        '.ncy .hz{position:absolute;inset:auto 0 0 0;height:38%;background:linear-gradient(180deg,color-mix(in srgb,var(--c3,' + v.c3 + ') 45%,transparent),var(--c3,' + v.c3 + '))}',
        kf('ncy-' + v.i, '0%{transform:rotate(0) translateX(var(--orbit,74px)) rotate(0)}100%{transform:rotate(360deg) translateX(var(--orbit,74px)) rotate(-360deg)}')
      ]),
      cfg: baseCfg(v, [range('Orb', '--orb', 12, 80, 1, 38, 'px'), range('Orbit', '--orbit', 30, 160, 2, 74, 'px'), range('Glow', '--glow', 0, 70, 2, 34, 'px')])
    };
  } });

  /* ─── 13. water ripple rings ─── */
  M.push({ key: 'ripple', title: 'Pond Ripples', tags: ['nature', 'water'], build: function (v) {
    var n = 3 + (v.i % 4), out = '';
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="nrp">' + out + '</div>',
      css: join([
        '.nrp{position:relative;width:var(--sz,170px);height:var(--sz,170px);display:grid;place-items:center}',
        '.nrp i{position:absolute;width:100%;height:100%;border-radius:50%;border:var(--tw,2px) solid var(--c1,' + v.c1 + ');animation:nrp-' + v.i + ' var(--dur,' + (v.dur * 2) + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,' + (v.dur / n).toFixed(2) + 's))}',
        '.nrp i:nth-child(even){border-color:var(--c2,' + v.c2 + ')}',
        kf('nrp-' + v.i, '0%{transform:scale(.06);opacity:1;border-width:var(--tw,2px)}100%{transform:scale(1);opacity:0;border-width:1px}')
      ]),
      cfg: [range('Cycle', '--dur', .3, 8, .05, v.dur * 2, 's'), range('Stagger', '--step', .05, 2, .05, +(v.dur / n).toFixed(2), 's'), range('Size', '--sz', 80, 320, 4, 170, 'px'), range('Stroke', '--tw', .5, 10, .5, 2, 'px'), col('Colour', '--c1', v.c1), col('Colour B', '--c2', v.c2)]
    };
  } });

  /* ─── 14. dust motes in light ─── */
  M.push({ key: 'dust', title: 'Sunbeam Dust', tags: ['nature', 'atmosphere'], build: function (v) {
    var n = 20 + (v.i % 18);
    return {
      html: '<div class="nst ndu"><u></u>' + drops(n, v.rnd, 'm') + '</div>',
      css: join([
        stage('background:#07070f'),
        '.ndu u{position:absolute;top:-30%;left:20%;width:var(--beam,70px);height:180%;background:linear-gradient(180deg,color-mix(in srgb,var(--c3,' + v.c3 + ') 32%,transparent),transparent);transform:rotate(var(--tilt,16deg));filter:blur(6px)}',
        '.ndu .m{position:absolute;top:calc(var(--x) * 1%);left:calc(var(--d) * 40%);width:calc(var(--mote,4px) * var(--s));height:calc(var(--mote,4px) * var(--s));border-radius:50%;background:var(--c1,' + v.c1 + ');opacity:var(--fade,.7);animation:ndu-' + v.i + ' calc(var(--dur,' + (v.dur * 5) + 's) / var(--s)) linear infinite;animation-delay:calc(var(--d) * -3s)}',
        kf('ndu-' + v.i, '0%{transform:translate(0,0);opacity:0}25%{opacity:var(--fade,.7)}100%{transform:translate(60px,-70px);opacity:0}')
      ]),
      cfg: baseCfg(v, [range('Mote', '--mote', 1, 14, .5, 4, 'px'), range('Beam width', '--beam', 20, 180, 2, 70, 'px'), range('Beam tilt', '--tilt', -40, 40, 1, 16, 'deg'), range('Opacity', '--fade', .1, 1, .05, .7)])
    };
  } });

  /* ─── 15. cherry blossom ─── */
  M.push({ key: 'blossom', title: 'Blossom Drift', tags: ['nature', 'spring'], build: function (v) {
    var n = 12 + (v.i % 12);
    return {
      html: '<div class="nst nbl">' + drops(n, v.rnd, 'p') + '</div>',
      css: join([
        stage('background:linear-gradient(180deg,#120c1a,color-mix(in srgb,var(--c1,' + v.c1 + ') 12%,#120c1a))'),
        '.nbl .p{position:absolute;top:-12%;left:calc(var(--x) * 1%);width:calc(var(--pet,12px) * var(--s));height:calc(var(--pet,12px) * var(--s));border-radius:50% 0 50% 50%;background:linear-gradient(140deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));opacity:var(--fade,.9);animation:nbl-' + v.i + ' calc(var(--dur,' + (v.dur * 4) + 's) / var(--s)) ' + v.ease + ' infinite;animation-delay:calc(var(--d) * -2s)}',
        kf('nbl-' + v.i, '0%{transform:translate(0,0) rotate(0) scale(1)}50%{transform:translate(calc(var(--sway,34px) * 1),110px) rotate(200deg) scale(.9)}100%{transform:translate(calc(var(--sway,34px) * -.5),220px) rotate(400deg) scale(1)}')
      ]),
      cfg: baseCfg(v, [range('Petal', '--pet', 4, 30, 1, 12, 'px'), range('Sway', '--sway', 0, 90, 2, 34, 'px'), range('Opacity', '--fade', .2, 1, .05, .9)])
    };
  } });

  /* ─── 16. aurora curtain ─── */
  M.push({ key: 'aurora', title: 'Aurora Curtain', tags: ['nature', 'sky', 'big'], build: function (v) {
    return {
      html: '<div class="nst nau"><i></i><i></i><i></i><b></b></div>',
      css: join([
        stage('background:radial-gradient(120% 80% at 50% 110%,#0b1226,#05060f)'),
        '.nau i{position:absolute;inset:-20% -30%;background:linear-gradient(100deg,transparent,color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent),transparent 70%);filter:blur(var(--soft,22px));mix-blend-mode:screen;animation:nau-' + v.i + ' var(--dur,' + (v.dur * 4) + 's) ' + v.ease + ' infinite;animation-direction:' + v.dir + '}',
        '.nau i:nth-child(2){background:linear-gradient(80deg,transparent,color-mix(in srgb,var(--c2,' + v.c2 + ') 50%,transparent),transparent 62%);animation-duration:calc(var(--dur,' + (v.dur * 4) + 's) * 1.5);animation-direction:reverse}',
        '.nau i:nth-child(3){background:linear-gradient(120deg,transparent,color-mix(in srgb,var(--c3,' + v.c3 + ') 45%,transparent),transparent 58%);animation-duration:calc(var(--dur,' + (v.dur * 4) + 's) * 2.1)}',
        '.nau b{position:absolute;inset:auto 0 0 0;height:26%;background:linear-gradient(180deg,transparent,rgba(4,6,14,.9))}',
        kf('nau-' + v.i, '0%,100%{transform:translateX(-14%) skewX(-8deg) scaleY(1)}50%{transform:translateX(14%) skewX(10deg) scaleY(1.25)}')
      ]),
      cfg: baseCfg(v, [range('Softness', '--soft', 4, 60, 1, 22, 'px')])
    };
  } });

  /* ─── 17. mountain parallax ─── */
  M.push({ key: 'mountains', title: 'Mountain Parallax', tags: ['nature', 'landscape', 'big'], build: function (v) {
    return {
      html: '<div class="nst nmt"><svg class="l3" viewBox="0 0 240 90" preserveAspectRatio="none"><path d="M0 90 60 26 108 66 152 18 200 62 240 34V90Z"/></svg><svg class="l2" viewBox="0 0 240 90" preserveAspectRatio="none"><path d="M0 90 44 44 96 78 140 40 190 74 240 50V90Z"/></svg><svg class="l1" viewBox="0 0 240 90" preserveAspectRatio="none"><path d="M0 90 52 62 104 86 158 60 208 84 240 68V90Z"/></svg></div>',
      css: join([
        stage('background:linear-gradient(180deg,color-mix(in srgb,var(--c3,' + v.c3 + ') 30%,#0a0a18),#0a0a18)'),
        '.nmt svg{position:absolute;inset:auto -20% 0 -20%;width:140%;height:70%}',
        '.nmt .l3 path{fill:color-mix(in srgb,var(--c1,' + v.c1 + ') 32%,#0a0a18)}',
        '.nmt .l2 path{fill:color-mix(in srgb,var(--c2,' + v.c2 + ') 40%,#0a0a18)}',
        '.nmt .l1 path{fill:#0d0d1c}',
        '.nmt .l3{animation:nmt-' + v.i + ' calc(var(--dur,' + (v.dur * 6) + 's) * 2.4) ease-in-out infinite alternate}',
        '.nmt .l2{animation:nmt-' + v.i + ' calc(var(--dur,' + (v.dur * 6) + 's) * 1.5) ease-in-out infinite alternate}',
        '.nmt .l1{animation:nmt-' + v.i + ' var(--dur,' + (v.dur * 6) + 's) ease-in-out infinite alternate}',
        kf('nmt-' + v.i, '0%{transform:translateX(calc(var(--drift,26px) * -1))}100%{transform:translateX(var(--drift,26px))}')
      ]),
      cfg: baseCfg(v, [range('Parallax', '--drift', 0, 90, 2, 26, 'px')])
    };
  } });

  /* ─── 18. jellyfish ─── */
  M.push({ key: 'jelly', title: 'Drifting Jellyfish', tags: ['nature', 'ocean'], build: function (v) {
    var n = 5 + (v.i % 5), out = '';
    for (var i = 0; i < n; i++) out += '<u style="--i:' + i + '"></u>';
    return {
      html: '<div class="njf"><b></b>' + out + '</div>',
      css: join([
        '.njf{position:relative;width:var(--w,140px);height:var(--h,200px);display:grid;justify-items:center;animation:njfd-' + v.i + ' calc(var(--dur,' + (v.dur * 3) + 's) * 1.7) ease-in-out infinite alternate}',
        '.njf b{width:var(--bell,74px);height:calc(var(--bell,74px) * .72);border-radius:50% 50% 42% 42%;background:radial-gradient(circle at 50% 30%,var(--c1,' + v.c1 + '),color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,transparent));box-shadow:0 0 var(--glow,26px) color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent);animation:njf-' + v.i + ' var(--dur,' + (v.dur * 3) + 's) ' + v.ease + ' infinite}',
        '.njf u{position:absolute;top:calc(var(--bell,74px) * .6);left:calc(50% + (var(--i) - 2) * 11px);width:2.5px;height:var(--tent,80px);border-radius:99px;background:linear-gradient(180deg,var(--c2,' + v.c2 + '),transparent);transform-origin:50% 0;animation:njft-' + v.i + ' var(--dur,' + (v.dur * 3) + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,.09s))}',
        kf('njf-' + v.i, '0%,100%{transform:scale(1,1)}45%{transform:scale(.86,1.18)}'),
        kf('njft-' + v.i, '0%,100%{transform:rotate(-9deg) scaleY(1)}50%{transform:rotate(9deg) scaleY(1.16)}'),
        kf('njfd-' + v.i, '0%{transform:translateY(10px)}100%{transform:translateY(-10px)}')
      ]),
      cfg: [range('Cycle', '--dur', .3, 14, .05, v.dur * 3, 's'), range('Bell', '--bell', 30, 150, 2, 74, 'px'), range('Tentacle', '--tent', 20, 180, 2, 80, 'px'), range('Glow', '--glow', 0, 60, 2, 26, 'px'), range('Stagger', '--step', 0, .4, .01, .09, 's'), col('Colour', '--c1', v.c1), col('Colour B', '--c2', v.c2)]
    };
  } });

  /* ─── 19. wind grass ─── */
  M.push({ key: 'grass', title: 'Wind Through Grass', tags: ['nature', 'field'], build: function (v) {
    var n = 14 + (v.i % 14), out = '';
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + ';--h:' + (40 + v.rnd() * 60).toFixed(0) + '"></i>';
    return {
      html: '<div class="ngr">' + out + '</div>',
      css: join([
        '.ngr{display:flex;align-items:flex-end;gap:var(--gap,6px);height:var(--h,150px)}',
        '.ngr i{width:var(--bw,4px);height:calc(var(--h) * 1%);border-radius:99px 99px 2px 2px;background:linear-gradient(180deg,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + '));transform-origin:50% 100%;animation:ngr-' + v.i + ' var(--dur,' + (v.dur * 2) + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,.06s))}',
        kf('ngr-' + v.i, '0%,100%{transform:rotate(calc(var(--bend,14deg) * -.4)) scaleY(1)}50%{transform:rotate(var(--bend,14deg)) scaleY(.94)}')
      ]),
      cfg: [range('Cycle', '--dur', .3, 8, .05, v.dur * 2, 's'), range('Blade width', '--bw', 1, 14, .5, 4, 'px'), range('Gap', '--gap', 1, 20, 1, 6, 'px'), range('Height', '--h', 70, 280, 2, 150, 'px'), range('Bend', '--bend', 0, 45, 1, 14, 'deg'), range('Stagger', '--step', 0, .3, .01, .06, 's'), col('Colour', '--c1', v.c1), col('Tip', '--c2', v.c2)]
    };
  } });

  /* ─── 20. starfield twinkle ─── */
  M.push({ key: 'stars', title: 'Twinkling Starfield', tags: ['nature', 'space'], build: function (v) {
    var n = 34 + (v.i % 26), out = '';
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + ';--x:' + (v.rnd() * 99).toFixed(1) + ';--y:' + (v.rnd() * 99).toFixed(1) + ';--d:' + (v.rnd() * 4).toFixed(2) + ';--s:' + (.4 + v.rnd() * 1.4).toFixed(2) + '"></i>';
    return {
      html: '<div class="nst nsf">' + out + '</div>',
      css: join([
        stage('background:radial-gradient(90% 70% at 50% 40%,#0d1030,#04040c)'),
        '.nsf i{position:absolute;left:calc(var(--x) * 1%);top:calc(var(--y) * 1%);width:calc(var(--star,3px) * var(--s));height:calc(var(--star,3px) * var(--s));border-radius:50%;background:var(--c1,' + v.c1 + ');box-shadow:0 0 var(--glow,7px) var(--c2,' + v.c2 + ');animation:nsf-' + v.i + ' calc(var(--dur,' + (v.dur * 2) + 's) * var(--s)) ' + v.ease + ' infinite;animation-delay:calc(var(--d) * -1s)}',
        kf('nsf-' + v.i, '0%,100%{opacity:.15;transform:scale(.6)}50%{opacity:1;transform:scale(1.4)}')
      ]),
      cfg: baseCfg(v, [range('Star', '--star', 1, 12, .5, 3, 'px'), range('Glow', '--glow', 0, 26, 1, 7, 'px')])
    };
  } });

  K.add('nature', V.matrix('nature', M, 22, 'nat'));
})(window);
