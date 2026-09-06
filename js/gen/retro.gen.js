/* ============================================================
   Retro & Arcade — 400 nostalgic, pixel-era effects
   CRT scanlines, VHS tracking, pixel sprites, arcade marquees, 8-bit HUDs,
   vaporwave grids, neon signs, cassette reels, dot-matrix boards, film grain,
   flip clocks, glitch bars, terminal boots, chiptune equalisers, space invaders.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit, V = global.MLVary;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color;

  function baseCfg(v, extra) {
    return [
      range('Cycle', '--dur', .1, 8, .05, v.dur, 's'),
      col('Colour', '--c1', v.c1),
      col('Colour B', '--c2', v.c2),
      col('Colour C', '--c3', v.c3)
    ].concat(extra || []);
  }
  function screen(extra) {
    return '.rsc{position:relative;width:var(--w,250px);height:var(--h,160px);border-radius:var(--round,12px);overflow:hidden;background:#080810;' + (extra || '') + '}';
  }

  var WORDS = ['ARCADE', 'INSERT COIN', 'GAME OVER', 'HIGH SCORE', 'PLAYER 1', 'LEVEL UP',
    'RETRO', 'SYSTEM OK', 'READY', 'BONUS', 'CONTINUE?', 'PRESS START'];

  var M = [];

  /* ─── 1. CRT scanline screen ─── */
  M.push({ key: 'crt', title: 'CRT Scanlines', tags: ['retro', 'crt'], build: function (v) {
    var w = WORDS[v.i % WORDS.length];
    return {
      html: '<div class="rsc crt"><b>' + w + '</b><i class="sl"></i><i class="sw"></i></div>',
      css: join([
        screen('box-shadow:inset 0 0 var(--vig,50px) rgba(0,0,0,.9)'),
        '.crt b{position:absolute;inset:0;display:grid;place-items:center;font:700 var(--fs,26px)/1 "JetBrains Mono",monospace;letter-spacing:.16em;color:var(--c1,' + v.c1 + ');text-shadow:0 0 var(--glow,12px) var(--c1,' + v.c1 + ')}',
        '.crt .sl{position:absolute;inset:0;background:repeating-linear-gradient(180deg,rgba(0,0,0,.55) 0 1px,transparent 1px var(--line,3px));pointer-events:none}',
        '.crt .sw{position:absolute;left:0;right:0;height:22%;background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--c2,' + v.c2 + ') 22%,transparent),transparent);animation:rcrt-' + v.i + ' var(--dur,' + (v.dur * 2) + 's) linear infinite;animation-direction:' + v.dir + '}',
        kf('rcrt-' + v.i, '0%{top:-25%}100%{top:105%}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 150, 440, 5, 250, 'px'), range('Height', '--h', 90, 300, 2, 160, 'px'), range('Line pitch', '--line', 2, 12, 1, 3, 'px'), range('Text', '--fs', 10, 52, 1, 26, 'px'), range('Glow', '--glow', 0, 34, 1, 12, 'px'), range('Vignette', '--vig', 0, 120, 2, 50, 'px')])
    };
  } });

  /* ─── 2. VHS tracking glitch ─── */
  M.push({ key: 'vhs', title: 'VHS Tracking', tags: ['retro', 'glitch'], build: function (v) {
    return {
      html: '<div class="rsc vhs"><b>PLAY &#9654;</b><i></i><i></i><u></u></div>',
      css: join([
        screen('background:linear-gradient(160deg,#0d0d1e,#161632)'),
        '.vhs b{position:absolute;top:14px;left:16px;font:700 var(--fs,17px)/1 "JetBrains Mono",monospace;letter-spacing:.2em;color:var(--c1,' + v.c1 + ');animation:rvhb-' + v.i + ' calc(var(--dur,' + v.dur + 's) * 3) steps(2,end) infinite}',
        '.vhs i{position:absolute;left:0;right:0;height:var(--band,10px);background:color-mix(in srgb,var(--c2,' + v.c2 + ') 55%,transparent);mix-blend-mode:screen;filter:blur(1px);animation:rvh-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        '.vhs i:nth-of-type(2){background:color-mix(in srgb,var(--c3,' + v.c3 + ') 45%,transparent);height:calc(var(--band,10px) * .6);animation-delay:calc(var(--dur,' + v.dur + 's) / -2.4)}',
        '.vhs u{position:absolute;inset:0;background:repeating-linear-gradient(180deg,rgba(255,255,255,.045) 0 2px,transparent 2px 4px)}',
        kf('rvh-' + v.i, '0%{top:110%;transform:scaleX(1)}45%{transform:scaleX(1.06)}100%{top:-12%;transform:scaleX(1)}'),
        kf('rvhb-' + v.i, '0%,88%{opacity:1;transform:translateX(0)}90%{opacity:.4;transform:translateX(var(--shift,6px))}94%{transform:translateX(calc(var(--shift,6px) * -1))}100%{opacity:1;transform:translateX(0)}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 150, 440, 5, 250, 'px'), range('Height', '--h', 90, 300, 2, 160, 'px'), range('Band', '--band', 2, 40, 1, 10, 'px'), range('Jitter', '--shift', 0, 24, 1, 6, 'px'), range('Text', '--fs', 9, 34, 1, 17, 'px')])
    };
  } });

  /* ─── 3. pixel sprite walk ─── */
  M.push({ key: 'sprite', title: 'Pixel Sprite', tags: ['retro', 'pixel'], build: function (v) {
    var grid = 6 + (v.i % 4), out = '';
    for (var i = 0; i < grid * grid; i++) {
      var on = ((i * 7 + v.i * 13) % 5) < 2 || (i % grid > 1 && i % grid < grid - 2 && i > grid);
      out += '<i style="--i:' + i + '" class="' + (on ? 'on' : '') + '"></i>';
    }
    return {
      html: '<div class="rpx" style="--g:' + grid + '">' + out + '</div>',
      css: join([
        '.rpx{display:grid;grid-template-columns:repeat(var(--g),var(--px,14px));gap:var(--gap,1px);animation:rpxh-' + v.i + ' var(--dur,' + v.dur + 's) steps(2,end) infinite}',
        '.rpx i{height:var(--px,14px);background:transparent}',
        '.rpx i.on{background:var(--c1,' + v.c1 + ');box-shadow:0 0 var(--glow,6px) color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,transparent);animation:rpx-' + v.i + ' calc(var(--dur,' + v.dur + 's) * 2) steps(3,end) infinite;animation-delay:calc(var(--i) * var(--step,.004s))}',
        kf('rpx-' + v.i, '0%,100%{background:var(--c1,' + v.c1 + ')}50%{background:var(--c3,' + v.c3 + ')}'),
        kf('rpxh-' + v.i, '0%,100%{transform:translateY(0)}50%{transform:translateY(calc(var(--hop,6px) * -1))}')
      ]),
      cfg: baseCfg(v, [range('Pixel', '--px', 4, 34, 1, 14, 'px'), range('Gap', '--gap', 0, 6, 1, 1, 'px'), range('Hop', '--hop', 0, 26, 1, 6, 'px'), range('Glow', '--glow', 0, 22, 1, 6, 'px')])
    };
  } });

  /* ─── 4. arcade marquee bulbs ─── */
  M.push({ key: 'marquee', title: 'Arcade Marquee', tags: ['retro', 'sign'], build: function (v) {
    var n = 16 + (v.i % 10), out = '';
    for (var i = 0; i < n; i++) out += '<u style="--i:' + i + '"></u>';
    return {
      html: '<div class="rmq"><span>' + WORDS[(v.i + 3) % WORDS.length] + '</span><div class="bl">' + out + '</div></div>',
      css: join([
        '.rmq{position:relative;padding:var(--pad,22px) var(--padx,34px);border-radius:var(--round,10px);background:linear-gradient(180deg,#1a1030,#0d0818);border:2px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 45%,transparent)}',
        '.rmq span{display:block;font:700 var(--fs,26px)/1 "Space Grotesk",sans-serif;letter-spacing:.14em;color:var(--c1,' + v.c1 + ');text-shadow:0 0 var(--glow,16px) var(--c1,' + v.c1 + ');animation:rmqt-' + v.i + ' calc(var(--dur,' + v.dur + 's) * 2.4) ' + v.ease + ' infinite}',
        '.rmq .bl{position:absolute;inset:5px;pointer-events:none}',
        '.rmq u{position:absolute;width:var(--bulb,7px);height:var(--bulb,7px);border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 var(--glow,16px) var(--c3,' + v.c3 + ');animation:rmq-' + v.i + ' var(--dur,' + v.dur + 's) steps(1,end) infinite;animation-delay:calc(var(--i) * var(--step,.08s))}',
        '.rmq u:nth-child(-n+8){top:-3px;left:calc(var(--i) * 12.5%)}',
        '.rmq u:nth-child(n+9){bottom:-3px;right:calc((var(--i) - 8) * 12.5%)}',
        kf('rmq-' + v.i, '0%,45%{opacity:1;filter:brightness(1.5)}50%,100%{opacity:.2;filter:brightness(.6)}'),
        kf('rmqt-' + v.i, '0%,100%{filter:brightness(1)}50%{filter:brightness(1.5)}')
      ]),
      cfg: baseCfg(v, [range('Text', '--fs', 12, 52, 1, 26, 'px'), range('Bulb', '--bulb', 3, 18, 1, 7, 'px'), range('Glow', '--glow', 0, 40, 1, 16, 'px'), range('Padding', '--pad', 8, 44, 1, 22, 'px'), range('Stagger', '--step', 0, .4, .01, .08, 's')])
    };
  } });

  /* ─── 5. 8-bit HUD ─── */
  M.push({ key: 'hud', title: '8-bit HUD Bar', tags: ['retro', 'game', 'ui'], build: function (v) {
    var hearts = 3 + (v.i % 3), out = '';
    for (var i = 0; i < hearts; i++) out += '<b style="--i:' + i + '"></b>';
    return {
      html: '<div class="rhd"><div class="hp">' + out + '</div><div class="xp"><i></i></div><span>SCORE ' + (10000 + v.i * 137) + '</span></div>',
      css: join([
        '.rhd{display:grid;gap:var(--gap,9px);width:var(--w,240px);padding:var(--pad,16px);border-radius:var(--round,8px);background:#0c0a1a;border:2px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 40%,transparent);font-family:"JetBrains Mono",monospace}',
        '.rhd .hp{display:flex;gap:6px}',
        '.rhd b{width:var(--heart,16px);height:var(--heart,16px);background:var(--c1,' + v.c1 + ');clip-path:polygon(50% 100%,0 45%,0 20%,25% 0,50% 20%,75% 0,100% 20%,100% 45%);animation:rhd-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite;animation-delay:calc(var(--i) * var(--step,.16s))}',
        '.rhd .xp{height:var(--th,10px);border-radius:2px;background:rgba(150,150,200,.2);overflow:hidden}',
        '.rhd .xp i{display:block;height:100%;background:repeating-linear-gradient(90deg,var(--c2,' + v.c2 + ') 0 6px,var(--c3,' + v.c3 + ') 6px 12px);transform-origin:0 50%;animation:rhdx-' + v.i + ' calc(var(--dur,' + v.dur + 's) * 2.5) ' + v.ease + ' infinite}',
        '.rhd span{font:700 var(--fs,13px)/1 "JetBrains Mono",monospace;letter-spacing:.14em;color:var(--c3,' + v.c3 + ')}',
        kf('rhd-' + v.i, '0%,100%{transform:scale(1)}40%{transform:scale(1.25)}60%{transform:scale(.92)}'),
        kf('rhdx-' + v.i, '0%{transform:scaleX(.05)}100%{transform:scaleX(1)}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 160, 400, 5, 240, 'px'), range('Heart', '--heart', 8, 34, 1, 16, 'px'), range('XP bar', '--th', 4, 26, 1, 10, 'px'), range('Text', '--fs', 8, 24, 1, 13, 'px'), range('Padding', '--pad', 6, 34, 1, 16, 'px')])
    };
  } });

  /* ─── 6. vaporwave grid ─── */
  M.push({ key: 'vapor', title: 'Vaporwave Grid', tags: ['retro', 'synthwave', 'big'], build: function (v) {
    return {
      html: '<div class="rsc vap"><i class="sun"></i><i class="gr"></i><i class="hz"></i></div>',
      css: join([
        screen('background:linear-gradient(180deg,#170a2e 0%,#2a0d3e 45%,#08040f 46%)'),
        '.vap .sun{position:absolute;top:14%;left:50%;width:var(--sun,90px);height:var(--sun,90px);margin-left:calc(var(--sun,90px) / -2);border-radius:50%;background:linear-gradient(180deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));box-shadow:0 0 var(--glow,44px) color-mix(in srgb,var(--c1,' + v.c1 + ') 70%,transparent);-webkit-mask:repeating-linear-gradient(180deg,#000 0 6px,transparent 6px 9px);mask:repeating-linear-gradient(180deg,#000 0 6px,transparent 6px 9px);animation:rvps-' + v.i + ' calc(var(--dur,' + v.dur + 's) * 4) ease-in-out infinite alternate}',
        '.vap .gr{position:absolute;inset:54% -60% -30% -60%;background:repeating-linear-gradient(90deg,color-mix(in srgb,var(--c3,' + v.c3 + ') 70%,transparent) 0 1.5px,transparent 1.5px var(--cell,26px)),repeating-linear-gradient(0deg,color-mix(in srgb,var(--c3,' + v.c3 + ') 70%,transparent) 0 1.5px,transparent 1.5px var(--cell,26px));transform:perspective(var(--persp,180px)) rotateX(72deg);transform-origin:50% 0;animation:rvpg-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite}',
        '.vap .hz{position:absolute;top:53%;left:0;right:0;height:2px;background:var(--c1,' + v.c1 + ');box-shadow:0 0 var(--glow,44px) var(--c1,' + v.c1 + ')}',
        kf('rvpg-' + v.i, '0%{background-position:0 0,0 0}100%{background-position:0 0,0 var(--cell,26px)}'),
        kf('rvps-' + v.i, '0%{transform:translateY(6px)}100%{transform:translateY(-6px)}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 160, 460, 5, 250, 'px'), range('Height', '--h', 110, 320, 2, 160, 'px'), range('Sun', '--sun', 30, 180, 2, 90, 'px'), range('Grid cell', '--cell', 8, 60, 1, 26, 'px'), range('Perspective', '--persp', 60, 420, 5, 180, 'px'), range('Glow', '--glow', 0, 90, 2, 44, 'px')])
    };
  } });

  /* ─── 7. neon sign flicker ─── */
  M.push({ key: 'neon', title: 'Neon Sign', tags: ['retro', 'neon'], build: function (v) {
    var w = WORDS[(v.i + 6) % WORDS.length];
    return {
      html: '<div class="rne"><span>' + w + '</span></div>',
      css: join([
        '.rne{padding:var(--pad,18px) var(--padx,28px);border-radius:var(--round,14px);border:var(--tube,3px) solid var(--c2,' + v.c2 + ');box-shadow:0 0 var(--glow,20px) color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,transparent),inset 0 0 var(--glow,20px) color-mix(in srgb,var(--c2,' + v.c2 + ') 40%,transparent);animation:rneb-' + v.i + ' calc(var(--dur,' + v.dur + 's) * 3.2) steps(1,end) infinite}',
        '.rne span{font:700 var(--fs,30px)/1 "Space Grotesk",sans-serif;letter-spacing:.1em;color:var(--c1,' + v.c1 + ');text-shadow:0 0 6px #fff,0 0 var(--glow,20px) var(--c1,' + v.c1 + '),0 0 calc(var(--glow,20px) * 2.4) var(--c3,' + v.c3 + ');animation:rne-' + v.i + ' var(--dur,' + v.dur + 's) steps(1,end) infinite}',
        kf('rne-' + v.i, '0%,72%,76%,84%,100%{opacity:1}74%{opacity:.25}80%{opacity:.5}92%{opacity:.35}'),
        kf('rneb-' + v.i, '0%,88%,100%{filter:brightness(1)}90%{filter:brightness(.4)}94%{filter:brightness(1.3)}')
      ]),
      cfg: baseCfg(v, [range('Text', '--fs', 12, 60, 1, 30, 'px'), range('Tube', '--tube', 1, 10, .5, 3, 'px'), range('Glow', '--glow', 0, 60, 1, 20, 'px'), range('Padding', '--pad', 6, 44, 1, 18, 'px'), range('Corner', '--round', 0, 40, 1, 14, 'px')])
    };
  } });

  /* ─── 8. cassette reels ─── */
  M.push({ key: 'cassette', title: 'Cassette Reels', tags: ['retro', 'tape'], build: function (v) {
    return {
      html: '<div class="rcs"><i class="r a"></i><i class="r b"></i><u></u></div>',
      css: join([
        '.rcs{position:relative;display:flex;align-items:center;justify-content:space-between;width:var(--w,220px);height:calc(var(--w,220px) * .62);padding:var(--pad,26px);border-radius:var(--round,10px);background:linear-gradient(160deg,#1d1a2c,#0f0d18);border:1px solid rgba(160,160,210,.16)}',
        '.rcs .r{width:var(--reel,58px);height:var(--reel,58px);border-radius:50%;border:var(--tw,7px) solid var(--c1,' + v.c1 + ');background:radial-gradient(circle,transparent 30%,color-mix(in srgb,var(--c3,' + v.c3 + ') 60%,transparent) 32%);animation:rcs-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite;animation-direction:' + v.dir + '}',
        '.rcs .r::after{content:"";position:absolute;width:inherit;height:inherit;border-radius:50%;background:repeating-conic-gradient(var(--c2,' + v.c2 + ') 0 8deg,transparent 8deg 45deg)}',
        '.rcs .b{border-color:var(--c2,' + v.c2 + ');animation-duration:calc(var(--dur,' + v.dur + 's) * 1.35)}',
        '.rcs u{position:absolute;left:50%;top:50%;width:calc(var(--reel,58px) * .9);height:var(--tape,5px);margin:calc(var(--tape,5px) / -2) 0 0 calc(var(--reel,58px) * -.45);background:var(--c3,' + v.c3 + ');opacity:.7}',
        kf('rcs-' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 140, 380, 5, 220, 'px'), range('Reel', '--reel', 24, 100, 2, 58, 'px'), range('Reel wall', '--tw', 2, 18, 1, 7, 'px'), range('Tape', '--tape', 1, 14, 1, 5, 'px'), range('Padding', '--pad', 8, 50, 1, 26, 'px')])
    };
  } });

  /* ─── 9. dot matrix board ─── */
  M.push({ key: 'matrix', title: 'Dot Matrix Board', tags: ['retro', 'display'], build: function (v) {
    var cols = 18 + (v.i % 8), rows = 5, out = '', i;
    for (i = 0; i < cols * rows; i++) out += '<i style="--i:' + i + ';--o:' + (((i * 13 + v.i * 7) % 9) < 4 ? 1 : .12) + '"></i>';
    return {
      html: '<div class="rdm" style="--cols:' + cols + '">' + out + '</div>',
      css: join([
        '.rdm{display:grid;grid-template-columns:repeat(var(--cols),var(--dot,8px));gap:var(--gap,3px);padding:var(--pad,14px);border-radius:var(--round,8px);background:#07070e}',
        '.rdm i{width:var(--dot,8px);height:var(--dot,8px);border-radius:50%;background:var(--c1,' + v.c1 + ');opacity:var(--o);box-shadow:0 0 var(--glow,5px) var(--c2,' + v.c2 + ');animation:rdm-' + v.i + ' var(--dur,' + (v.dur * 2) + 's) linear infinite;animation-delay:calc(var(--i) * var(--step,-.012s))}',
        kf('rdm-' + v.i, '0%,100%{opacity:var(--o)}45%{opacity:calc(1.05 - var(--o))}')
      ]),
      cfg: baseCfg(v, [range('Dot', '--dot', 3, 20, 1, 8, 'px'), range('Gap', '--gap', 0, 10, 1, 3, 'px'), range('Glow', '--glow', 0, 20, 1, 5, 'px'), range('Padding', '--pad', 4, 34, 1, 14, 'px'), range('Stagger', '--step', -.1, 0, .002, -.012, 's')])
    };
  } });

  /* ─── 10. flip clock ─── */
  M.push({ key: 'flipclock', title: 'Flip Clock', tags: ['retro', 'clock'], build: function (v) {
    return {
      html: '<div class="rfc"><span class="c"><b>' + (v.i % 10) + '</b><i></i></span><span class="c d2"><b>' + ((v.i + 4) % 10) + '</b><i></i></span></div>',
      css: join([
        '.rfc{display:flex;gap:var(--gap,8px);perspective:var(--persp,420px)}',
        '.rfc .c{position:relative;width:var(--w,64px);height:var(--h,88px);border-radius:var(--round,8px);background:linear-gradient(180deg,#1b1b2e 0 50%,#12121f 50% 100%);display:grid;place-items:center;box-shadow:0 8px 22px rgba(0,0,0,.5)}',
        '.rfc b{font:700 var(--fs,52px)/1 "JetBrains Mono",monospace;color:var(--c1,' + v.c1 + ')}',
        '.rfc .c::after{content:"";position:absolute;left:0;right:0;top:50%;height:2px;background:#05050c}',
        '.rfc i{position:absolute;inset:0 0 50% 0;border-radius:var(--round,8px) var(--round,8px) 0 0;background:linear-gradient(180deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 30%,#1b1b2e),#151526);transform-origin:50% 100%;backface-visibility:hidden;animation:rfc-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        '.rfc .d2 i{animation-delay:calc(var(--dur,' + v.dur + 's) / -2)}',
        kf('rfc-' + v.i, '0%,55%{transform:rotateX(0)}90%,100%{transform:rotateX(-180deg)}')
      ]),
      cfg: baseCfg(v, [range('Card width', '--w', 30, 130, 2, 64, 'px'), range('Card height', '--h', 40, 180, 2, 88, 'px'), range('Digit', '--fs', 18, 96, 1, 52, 'px'), range('Gap', '--gap', 0, 26, 1, 8, 'px'), range('Perspective', '--persp', 150, 900, 10, 420, 'px')])
    };
  } });

  /* ─── 11. glitch bars ─── */
  M.push({ key: 'glitch', title: 'Glitch Slice Bars', tags: ['retro', 'glitch'], build: function (v) {
    var n = 6 + (v.i % 6), out = '';
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + ';--o:' + ((v.rnd() - .5) * 2).toFixed(2) + '">' + WORDS[(v.i + i) % WORDS.length] + '</i>';
    return {
      html: '<div class="rgl">' + out + '</div>',
      css: join([
        '.rgl{position:relative;width:var(--w,230px);height:var(--h,120px);overflow:hidden;border-radius:var(--round,8px);background:#08080f}',
        '.rgl i{position:absolute;left:0;right:0;top:calc(var(--i) * (100% / 8));height:calc(100% / 8);display:grid;place-items:center;font:700 var(--fs,17px)/1 "JetBrains Mono",monospace;letter-spacing:.2em;color:var(--c1,' + v.c1 + ');background:color-mix(in srgb,var(--c3,' + v.c3 + ') 12%,transparent);animation:rgl-' + v.i + ' var(--dur,' + v.dur + 's) steps(1,end) infinite;animation-delay:calc(var(--i) * var(--step,.05s))}',
        '.rgl i:nth-child(even){color:var(--c2,' + v.c2 + ')}',
        kf('rgl-' + v.i, '0%,70%{transform:translateX(0);opacity:1}72%{transform:translateX(calc(var(--o) * var(--shift,22px)));opacity:.6}78%{transform:translateX(calc(var(--o) * var(--shift,22px) * -.6))}84%,100%{transform:translateX(0);opacity:1}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 150, 420, 5, 230, 'px'), range('Height', '--h', 70, 260, 2, 120, 'px'), range('Text', '--fs', 8, 34, 1, 17, 'px'), range('Slice shift', '--shift', 0, 70, 1, 22, 'px')])
    };
  } });

  /* ─── 12. terminal boot (js) ─── */
  M.push({ key: 'boot', title: 'Terminal Boot', tags: ['retro', 'js', 'terminal'], build: function (v) {
    return {
      html: '<div class="rtb"><pre></pre></div>',
      css: join([
        '.rtb{width:var(--w,280px);height:var(--h,160px);padding:var(--pad,14px);border-radius:var(--round,8px);background:#05070a;border:1px solid color-mix(in srgb,var(--c1,' + v.c1 + ') 30%,transparent);overflow:hidden}',
        '.rtb pre{margin:0;font:500 var(--fs,11px)/1.55 "JetBrains Mono",monospace;color:var(--c1,' + v.c1 + ');text-shadow:0 0 var(--glow,7px) color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,transparent);white-space:pre-wrap}',
        '.rtb pre::after{content:"\\u2588";animation:rtb-' + v.i + ' var(--dur,' + Math.max(.2, v.dur / 2) + 's) steps(1,end) infinite;color:var(--c3,' + v.c3 + ')}',
        kf('rtb-' + v.i, '0%,49%{opacity:1}50%,100%{opacity:0}')
      ]),
      js: 'var pre=root.querySelector("pre"),lines=["BIOS v' + (1 + v.i % 9) + '.0 booting…","MEM CHECK  ' + (256 + v.i * 64) + 'K OK","LOADING KERNEL…","MOUNT /dev/rom0","VIDEO 320x200x8","SOUND CHIP READY","> RUN ARCADE.EXE"],n=0,c=0,t=0,buf="";\napi.raf(function(){t++;if(t%3)return;\n if(n>=lines.length){if(t%240===0){n=0;c=0;buf="";pre.textContent=""}return}\n var L=lines[n];if(c<L.length){buf+=L[c++]}else{buf+="\\n";n++;c=0}\n pre.textContent=buf;});',
      cfg: [range('Cursor blink', '--dur', .1, 3, .05, Math.max(.2, v.dur / 2), 's'), range('Width', '--w', 180, 440, 5, 280, 'px'), range('Height', '--h', 90, 300, 2, 160, 'px'), range('Font', '--fs', 8, 20, 1, 11, 'px'), range('Glow', '--glow', 0, 24, 1, 7, 'px'), range('Padding', '--pad', 4, 32, 1, 14, 'px'), col('Colour', '--c1', v.c1), col('Glow colour', '--c2', v.c2), col('Cursor', '--c3', v.c3)]
    };
  } });

  /* ─── 13. chiptune equaliser ─── */
  M.push({ key: 'chip', title: 'Chiptune Equaliser', tags: ['retro', 'audio'], build: function (v) {
    var n = 8 + (v.i % 10), out = '';
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + ';--v:' + (25 + v.rnd() * 70).toFixed(0) + '"></i>';
    return {
      html: '<div class="rcq">' + out + '</div>',
      css: join([
        '.rcq{display:flex;align-items:flex-end;gap:var(--gap,4px);height:var(--h,120px);padding:var(--pad,10px);border-radius:var(--round,6px);background:#08080f}',
        '.rcq i{width:var(--bw,12px);height:calc(var(--v) * 1%);background:repeating-linear-gradient(0deg,var(--c1,' + v.c1 + ') 0 var(--seg,6px),transparent var(--seg,6px) calc(var(--seg,6px) + 2px));transform-origin:50% 100%;animation:rcq-' + v.i + ' var(--dur,' + v.dur + 's) steps(6,end) infinite alternate;animation-delay:calc(var(--i) * var(--step,.05s))}',
        '.rcq i:nth-child(3n){background:repeating-linear-gradient(0deg,var(--c2,' + v.c2 + ') 0 var(--seg,6px),transparent var(--seg,6px) calc(var(--seg,6px) + 2px))}',
        '.rcq i:nth-child(4n){background:repeating-linear-gradient(0deg,var(--c3,' + v.c3 + ') 0 var(--seg,6px),transparent var(--seg,6px) calc(var(--seg,6px) + 2px))}',
        kf('rcq-' + v.i, '0%{transform:scaleY(.18)}100%{transform:scaleY(1)}')
      ]),
      cfg: baseCfg(v, [range('Bar', '--bw', 4, 34, 1, 12, 'px'), range('Segment', '--seg', 2, 20, 1, 6, 'px'), range('Gap', '--gap', 1, 16, 1, 4, 'px'), range('Height', '--h', 60, 260, 2, 120, 'px')])
    };
  } });

  /* ─── 14. space invaders row ─── */
  M.push({ key: 'invaders', title: 'Invader March', tags: ['retro', 'game'], build: function (v) {
    var n = 4 + (v.i % 4), out = '';
    for (var i = 0; i < n; i++) out += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="riv">' + out + '</div>',
      css: join([
        '.riv{display:flex;gap:var(--gap,16px);animation:rivm-' + v.i + ' calc(var(--dur,' + v.dur + 's) * 3) steps(4,end) infinite alternate}',
        '.riv i{width:var(--sz,34px);height:var(--sz,34px);background:var(--c1,' + v.c1 + ');clip-path:polygon(20% 0,80% 0,80% 20%,100% 20%,100% 60%,80% 60%,80% 80%,100% 80%,100% 100%,70% 100%,70% 80%,30% 80%,30% 100%,0 100%,0 80%,20% 80%,20% 60%,0 60%,0 20%,20% 20%);animation:riv-' + v.i + ' var(--dur,' + v.dur + 's) steps(2,end) infinite;animation-delay:calc(var(--i) * var(--step,.08s));filter:drop-shadow(0 0 var(--glow,8px) var(--c2,' + v.c2 + '))}',
        '.riv i:nth-child(even){background:var(--c3,' + v.c3 + ')}',
        kf('riv-' + v.i, '0%,100%{transform:scale(1) translateY(0)}50%{transform:scale(1.12) translateY(calc(var(--hop,5px) * -1))}'),
        kf('rivm-' + v.i, '0%{transform:translateX(calc(var(--march,26px) * -1))}100%{transform:translateX(var(--march,26px))}')
      ]),
      cfg: baseCfg(v, [range('Sprite', '--sz', 14, 70, 1, 34, 'px'), range('Gap', '--gap', 4, 44, 1, 16, 'px'), range('March', '--march', 0, 80, 2, 26, 'px'), range('Hop', '--hop', 0, 20, 1, 5, 'px'), range('Glow', '--glow', 0, 26, 1, 8, 'px')])
    };
  } });

  /* ─── 15. film grain + countdown ─── */
  M.push({ key: 'film', title: 'Film Leader Countdown', tags: ['retro', 'film'], build: function (v) {
    return {
      html: '<div class="rsc rfl"><b>' + (3 + v.i % 6) + '</b><i class="cr"></i><i class="gn"></i></div>',
      css: join([
        screen('background:#151511'),
        '.rfl b{position:absolute;inset:0;display:grid;place-items:center;font:700 var(--fs,64px)/1 "Space Grotesk",sans-serif;color:var(--c1,' + v.c1 + ');animation:rfl-' + v.i + ' var(--dur,' + v.dur + 's) steps(1,end) infinite}',
        '.rfl .cr{position:absolute;inset:8%;border:var(--tw,2px) solid color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,transparent);border-radius:50%}',
        '.rfl .cr::before,.rfl .cr::after{content:"";position:absolute;background:color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,transparent)}',
        '.rfl .cr::before{left:50%;top:-8%;bottom:-8%;width:var(--tw,2px);transform-origin:50% 50%;animation:rflr-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite}',
        '.rfl .cr::after{top:50%;left:-8%;right:-8%;height:var(--tw,2px)}',
        '.rfl .gn{position:absolute;inset:0;opacity:var(--grain,.16);background-image:repeating-conic-gradient(#fff 0 0.0006turn,#000 0 0.0012turn);animation:rflg-' + v.i + ' .18s steps(3,end) infinite}',
        kf('rfl-' + v.i, '0%,45%{opacity:1;transform:scale(1)}50%{opacity:.2;transform:scale(1.1)}55%,100%{opacity:1;transform:scale(1)}'),
        kf('rflr-' + v.i, 'to{transform:rotate(1turn)}'),
        kf('rflg-' + v.i, '0%{transform:translate(0,0)}33%{transform:translate(-2%,1%)}66%{transform:translate(2%,-1%)}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 150, 420, 5, 250, 'px'), range('Height', '--h', 100, 300, 2, 160, 'px'), range('Digit', '--fs', 24, 130, 2, 64, 'px'), range('Crosshair', '--tw', 1, 8, .5, 2, 'px'), range('Grain', '--grain', 0, .5, .01, .16)])
    };
  } });

  /* ─── 16. seven segment clock ─── */
  M.push({ key: 'seg', title: 'Seven Segment Display', tags: ['retro', 'display'], build: function (v) {
    var out = '';
    for (var d = 0; d < 4; d++) {
      out += '<span class="dg" style="--i:' + d + '">';
      for (var s = 0; s < 7; s++) out += '<i class="s' + s + '"></i>';
      out += '</span>';
    }
    return {
      html: '<div class="rsg">' + out + '</div>',
      css: join([
        '.rsg{display:flex;gap:var(--gap,14px);padding:var(--pad,16px);border-radius:var(--round,8px);background:#07070d}',
        '.rsg .dg{position:relative;width:var(--dw,34px);height:calc(var(--dw,34px) * 1.8)}',
        '.rsg i{position:absolute;background:var(--c1,' + v.c1 + ');box-shadow:0 0 var(--glow,10px) var(--c2,' + v.c2 + ');animation:rsg-' + v.i + ' var(--dur,' + v.dur + 's) steps(1,end) infinite;animation-delay:calc(var(--i) * var(--step,.2s))}',
        '.rsg .s0{top:0;left:12%;right:12%;height:var(--tw,6px)}',
        '.rsg .s1{top:6%;right:0;width:var(--tw,6px);height:40%}',
        '.rsg .s2{bottom:6%;right:0;width:var(--tw,6px);height:40%;animation-delay:calc(var(--i) * var(--step,.2s) + .05s)}',
        '.rsg .s3{bottom:0;left:12%;right:12%;height:var(--tw,6px)}',
        '.rsg .s4{bottom:6%;left:0;width:var(--tw,6px);height:40%;animation-delay:calc(var(--i) * var(--step,.2s) + .1s)}',
        '.rsg .s5{top:6%;left:0;width:var(--tw,6px);height:40%}',
        '.rsg .s6{top:50%;left:12%;right:12%;height:var(--tw,6px);margin-top:calc(var(--tw,6px) / -2);background:var(--c3,' + v.c3 + ')}',
        kf('rsg-' + v.i, '0%,40%{opacity:1}55%,100%{opacity:.12}')
      ]),
      cfg: baseCfg(v, [range('Digit width', '--dw', 16, 70, 1, 34, 'px'), range('Segment', '--tw', 2, 14, 1, 6, 'px'), range('Gap', '--gap', 2, 34, 1, 14, 'px'), range('Glow', '--glow', 0, 30, 1, 10, 'px'), range('Stagger', '--step', 0, .6, .02, .2, 's')])
    };
  } });

  /* ─── 17. jukebox vinyl ─── */
  M.push({ key: 'vinyl', title: 'Spinning Vinyl', tags: ['retro', 'music'], build: function (v) {
    return {
      html: '<div class="rvy"><i class="rec"></i><i class="arm"></i></div>',
      css: join([
        '.rvy{position:relative;width:var(--sz,180px);height:var(--sz,180px);display:grid;place-items:center}',
        '.rvy .rec{width:100%;height:100%;border-radius:50%;background:repeating-radial-gradient(circle,#101019 0 3px,#191926 3px 6px);animation:rvy-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite;animation-direction:' + v.dir + '}',
        '.rvy .rec::after{content:"";position:absolute;top:50%;left:50%;width:var(--lbl,36%);height:var(--lbl,36%);transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,#08080f 12%,var(--c1,' + v.c1 + ') 13%,var(--c2,' + v.c2 + '))}',
        '.rvy .arm{position:absolute;top:8%;right:-2%;width:var(--arm,86px);height:var(--tw,6px);border-radius:99px;background:linear-gradient(90deg,var(--c3,' + v.c3 + '),#c9c9dd);transform-origin:calc(100% - 6px) 50%;animation:rvya-' + v.i + ' calc(var(--dur,' + v.dur + 's) * 12) ease-in-out infinite alternate}',
        kf('rvy-' + v.i, 'to{transform:rotate(1turn)}'),
        kf('rvya-' + v.i, '0%{transform:rotate(22deg)}100%{transform:rotate(42deg)}')
      ]),
      cfg: baseCfg(v, [range('Size', '--sz', 90, 320, 4, 180, 'px'), range('Label', '--lbl', 15, 60, 1, 36, '%'), range('Arm length', '--arm', 40, 160, 2, 86, 'px'), range('Arm width', '--tw', 2, 16, 1, 6, 'px')])
    };
  } });

  /* ─── 18. cartridge insert ─── */
  M.push({ key: 'cart', title: 'Cartridge Insert', tags: ['retro', 'console'], build: function (v) {
    return {
      html: '<div class="rct"><b class="slot"></b><b class="crt2"><s></s><s></s><s></s></b></div>',
      css: join([
        '.rct{position:relative;width:var(--w,190px);height:var(--h,150px);display:grid;justify-items:center;align-items:end;overflow:hidden}',
        '.rct .slot{width:100%;height:var(--slot,26px);border-radius:var(--round,6px);background:linear-gradient(180deg,#1d1d2f,#0d0d18);box-shadow:inset 0 6px 14px rgba(0,0,0,.7)}',
        '.rct .crt2{position:absolute;bottom:var(--slot,26px);width:76%;height:64%;display:grid;align-content:start;gap:6px;padding:10px;border-radius:var(--round,6px) var(--round,6px) 2px 2px;background:linear-gradient(160deg,var(--c1,' + v.c1 + '),color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,#111));animation:rct-' + v.i + ' var(--dur,' + (v.dur * 2) + 's) ' + v.ease + ' infinite}',
        '.rct s{height:8px;border-radius:2px;background:color-mix(in srgb,var(--c3,' + v.c3 + ') 75%,transparent);text-decoration:none}',
        '.rct s:nth-child(2){width:70%}',
        '.rct s:nth-child(3){width:45%}',
        kf('rct-' + v.i, '0%,100%{transform:translateY(calc(var(--lift,-70px) * -1))}45%,70%{transform:translateY(6px)}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 120, 340, 5, 190, 'px'), range('Height', '--h', 100, 280, 2, 150, 'px'), range('Slot', '--slot', 10, 60, 1, 26, 'px'), range('Lift', '--lift', -160, -10, 2, -70, 'px')])
    };
  } });

  /* ─── 19. joystick wiggle ─── */
  M.push({ key: 'joy', title: 'Arcade Joystick', tags: ['retro', 'control'], build: function (v) {
    return {
      html: '<div class="rjy"><i class="base"></i><i class="stick"><b></b></i></div>',
      css: join([
        '.rjy{position:relative;width:var(--sz,150px);height:var(--sz,150px);display:grid;place-items:center}',
        '.rjy .base{position:absolute;bottom:8%;width:70%;height:24%;border-radius:50%;background:radial-gradient(ellipse,#22223a,#0d0d18)}',
        '.rjy .stick{position:absolute;bottom:16%;width:var(--tw,12px);height:46%;border-radius:99px;background:linear-gradient(180deg,#d4d4e6,#6a6a86);transform-origin:50% 100%;animation:rjy-' + v.i + ' var(--dur,' + v.dur + 's) ' + v.ease + ' infinite}',
        '.rjy b{position:absolute;top:calc(var(--ball,38px) / -1 + 6px);left:50%;width:var(--ball,38px);height:var(--ball,38px);margin-left:calc(var(--ball,38px) / -2);border-radius:50%;background:radial-gradient(circle at 34% 30%,color-mix(in srgb,var(--c2,' + v.c2 + ') 80%,#fff),var(--c1,' + v.c1 + '));box-shadow:0 0 var(--glow,18px) color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent)}',
        kf('rjy-' + v.i, '0%,100%{transform:rotate(0)}20%{transform:rotate(calc(var(--throw,20deg) * -1))}55%{transform:rotate(var(--throw,20deg))}80%{transform:rotate(calc(var(--throw,20deg) * -.4))}')
      ]),
      cfg: baseCfg(v, [range('Size', '--sz', 90, 300, 4, 150, 'px'), range('Ball', '--ball', 16, 80, 1, 38, 'px'), range('Shaft', '--tw', 4, 28, 1, 12, 'px'), range('Throw', '--throw', 0, 45, 1, 20, 'deg'), range('Glow', '--glow', 0, 44, 1, 18, 'px')])
    };
  } });

  /* ─── 20. bit-crushed text scroll ─── */
  M.push({ key: 'ticker', title: 'Pixel Ticker', tags: ['retro', 'text'], build: function (v) {
    var w = WORDS[(v.i + 2) % WORDS.length] + ' · ' + WORDS[(v.i + 7) % WORDS.length] + ' · ';
    return {
      html: '<div class="rtk"><div class="tr"><span>' + w + w + '</span><span>' + w + w + '</span></div></div>',
      css: join([
        '.rtk{width:var(--w,250px);overflow:hidden;padding:var(--pad,12px) 0;border-top:2px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 45%,transparent);border-bottom:2px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 45%,transparent);background:#07070f}',
        '.rtk .tr{display:flex;width:max-content;animation:rtk-' + v.i + ' var(--dur,' + (v.dur * 4) + 's) linear infinite;animation-direction:' + v.dir + '}',
        '.rtk span{font:700 var(--fs,18px)/1 "JetBrains Mono",monospace;letter-spacing:.2em;white-space:nowrap;color:var(--c1,' + v.c1 + ');text-shadow:2px 0 var(--c3,' + v.c3 + ')}',
        kf('rtk-' + v.i, 'to{transform:translateX(-50%)}')
      ]),
      cfg: baseCfg(v, [range('Width', '--w', 150, 460, 5, 250, 'px'), range('Text', '--fs', 9, 40, 1, 18, 'px'), range('Padding', '--pad', 2, 32, 1, 12, 'px')])
    };
  } });

  K.add('retro', V.matrix('retro', M, 22, 'ret'));
})(window);
