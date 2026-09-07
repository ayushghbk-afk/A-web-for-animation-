/* ============================================================
   Motion Lab — wave 4, part B (cards · backgrounds · controls)
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

  /* ════════════════════════ CARDS ════════════════════════ */
  var CD = [];

  function cardShell(v) {
    return '.wc{position:relative;width:var(--w,214px);border-radius:var(--rad,18px);overflow:hidden;background:#14141f;border:1px solid rgba(255,255,255,.1);display:flex;flex-direction:column}' +
      '.wc .im{position:relative;display:block;height:var(--img,112px);background:linear-gradient(140deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + ') 60%,#0e0e1a);overflow:hidden;flex:none}' +
      '.wc figcaption{padding:11px 14px 13px;display:grid;gap:5px;flex:1}' +
      '.wc h4{margin:0;font:700 .95rem/1.2 "Plus Jakarta Sans",system-ui,sans-serif;color:#f2f2fa;letter-spacing:-.01em}' +
      '.wc p{margin:0;font-size:.74rem;color:#9a9ab0;line-height:1.45}' +
      '.wc .tag{font:600 9px/1 "JetBrains Mono",monospace;letter-spacing:.09em;color:#cfcfe6;border:1px solid rgba(255,255,255,.15);border-radius:5px;padding:4px 6px;text-transform:uppercase;justify-self:start}';
  }
  function cardHtml(t, v, inner, extra) {
    return '<figure class="wc"><span class="im">' + (inner || '') + '</span><figcaption><h4>' + t + '</h4><p>' +
      (extra || 'A looping motion card from wave four.') + '</p><span class="tag">loop</span></figcaption></figure>';
  }
  function cardCfg(v, extra) {
    return [
      range('Width', '--w', 150, 320, 2, 214, 'px'),
      range('Media', '--img', 70, 200, 2, 112, 'px'),
      range('Corner', '--rad', 0, 40, 1, 18, 'px'),
      range('Cycle', '--dur', .4, 24, .1, v.dur, 's'),
      col('Colour', '--c1', v.c1),
      col('Colour B', '--c2', v.c2),
      col('Colour C', '--c3', v.c3)
    ].concat(extra || []);
  }

  /* 1. sweep shine — a gloss stripe keeps polishing the media */
  CD.push({ key: 'shine', title: 'Sweep Shine', tags: ['card', 'css'], build: function (v) {
    return {
      html: cardHtml('Sweep Shine', v, '', 'A gloss stripe polishes the artwork on a loop.'),
      css: join([
        cardShell(v),
        '.wc .im::before{content:"";position:absolute;top:-20%;left:-70%;width:42%;height:140%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.4),transparent);transform:skewX(-18deg);animation:cshn-' + v.i + ' var(--dur,' + D(v, 2) + 's) cubic-bezier(.45,0,.55,1) infinite}',
        kf('cshn-' + v.i, '0%{left:-70%}55%,100%{left:135%}')
      ]),
      cfg: cardCfg(v, [])
    };
  } });

  /* 2. corner curl — the page corner keeps trying to peel away */
  CD.push({ key: 'curl', title: 'Corner Curl', tags: ['card', 'css'], build: function (v) {
    return {
      html: cardHtml('Corner Curl', v, '', 'Watch the bottom corner — it wants to turn the page.'),
      css: join([
        cardShell(v),
        '.wc::after{content:"";position:absolute;right:0;bottom:0;width:0;height:0;border-style:solid;border-width:0 0 var(--notch,26px) var(--notch,26px);border-color:transparent transparent var(--c3,' + v.c3 + ') transparent;filter:drop-shadow(-3px -3px 4px rgba(0,0,0,.4));animation:ccur-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite}',
        kf('ccur-' + v.i, '0%,100%{border-width:0 0 var(--notch,26px) var(--notch,26px)}50%{border-width:0 0 calc(var(--notch,26px) * 1.9) calc(var(--notch,26px) * 1.9)}')
      ]),
      cfg: cardCfg(v, [range('Notch', '--notch', 10, 48, 1, 26, 'px')])
    };
  } });

  /* 3. frame trace — a line traces the card's border forever */
  CD.push({ key: 'frame', title: 'Frame Trace', tags: ['card', 'svg'], build: function (v) {
    return {
      html: '<figure class="wc"><svg class="fr" viewBox="0 0 214 168" preserveAspectRatio="none"><rect x="2.5" y="2.5" width="209" height="163" rx="15"/></svg><span class="im"></span><figcaption><h4>Frame Trace</h4><p>The border draws itself, holds, then fades to start again.</p><span class="tag">svg</span></figcaption></figure>',
      css: join([
        cardShell(v),
        '.wc .fr{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:3}',
        '.wc .fr rect{fill:none;stroke:var(--c3,' + v.c3 + ');stroke-width:2.4;stroke-linecap:round;vector-effect:non-scaling-stroke;stroke-dasharray:744;stroke-dashoffset:744;filter:drop-shadow(0 0 5px var(--c3,' + v.c3 + '));animation:cfra-' + v.i + ' var(--dur,' + D(v, 2.4) + 's) ease-in-out infinite}',
        kf('cfra-' + v.i, '0%{stroke-dashoffset:744;opacity:1}55%{stroke-dashoffset:0;opacity:1}78%{stroke-dashoffset:0;opacity:1}92%,100%{stroke-dashoffset:0;opacity:0}')
      ]),
      cfg: cardCfg(v, [])
    };
  } });

  /* 4. hue flow border — the gradient frame cycles the spectrum */
  CD.push({ key: 'hueframe', title: 'Hue Flow Border', tags: ['card', 'css'], build: function (v) {
    return {
      html: cardHtml('Hue Flow Border', v, '', 'The gradient frame drifts through the spectrum.'),
      css: join([
        cardShell(v),
        '.wc{border:2px solid transparent;background:linear-gradient(#14141f,#14141f) padding-box,conic-gradient(from 0deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + ')) border-box;animation:chue-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite}',
        kf('chue-' + v.i, 'to{filter:hue-rotate(360deg)}')
      ]),
      cfg: cardCfg(v, [])
    };
  } });

  /* 5. pulse stat card — a tiny live chart lives in the media slot */
  CD.push({ key: 'stat', title: 'Pulse Stat Card', tags: ['card', 'data'], build: function (v) {
    var bars = '';
    for (var i2 = 0; i2 < 5; i2++) bars += '<i style="--i:' + i2 + ';--v:' + Math.round(26 + v.rnd() * 70) + '"></i>';
    return {
      html: '<figure class="wc"><span class="im st">' + bars + '</span><figcaption><h4>Pulse Stat Card</h4><p>Weekly actives keep pulsing in the media slot.</p><span class="tag">data</span></figcaption></figure>',
      css: join([
        cardShell(v),
        '.wc .st{display:flex;align-items:flex-end;gap:7px;padding:12px 16px;background:#10101a}',
        '.wc .st i{width:var(--bw,16px);height:calc(var(--v) * 1%);border-radius:5px 5px 2px 2px;background:linear-gradient(180deg,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + '));transform-origin:50% 100%;animation:cbar-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        '.wc .st i:nth-child(3n){background:linear-gradient(180deg,var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '))}',
        kf('cbar-' + v.i, '0%,100%{transform:scaleY(.32);opacity:.5}50%{transform:scaleY(1);opacity:1}')
      ]),
      cfg: cardCfg(v, [range('Bar', '--bw', 8, 30, 1, 16, 'px'), range('Stagger', '--step', 0, .4, .01, v.step, 's')])
    };
  } });

  /* 6. venetian reveal — slats wave open over the artwork */
  CD.push({ key: 'slats', title: 'Venetian Reveal', tags: ['card', 'css'], build: function (v) {
    var u = '';
    for (var i2 = 0; i2 < 5; i2++) u += '<u style="--i:' + i2 + '"></u>';
    return {
      html: cardHtml('Venetian Reveal', v, '<span class="sls">' + u + '</span>', 'Blinds keep waving across the artwork.'),
      css: join([
        cardShell(v),
        '.wc .sls{position:absolute;inset:0;display:flex;flex-direction:column;pointer-events:none}',
        '.wc .sls u{flex:1;background:color-mix(in srgb,var(--c3,' + v.c3 + ') 88%,#06060c);transform-origin:50% 0;animation:cslt-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('cslt-' + v.i, '0%,100%{transform:scaleY(0)}50%{transform:scaleY(1)}')
      ]),
      cfg: cardCfg(v, [range('Stagger', '--step', 0, .4, .01, v.step, 's')])
    };
  } });

  /* 7. avatar fan — teammates fan out when you peek in */
  CD.push({ key: 'fan', title: 'Avatar Fan', tags: ['card', 'hover'], build: function (v) {
    var av = '';
    for (var i2 = 0; i2 < 4; i2++) av += '<i style="--i:' + i2 + '">' + ['A', 'J', 'M', 'S'][i2] + '</i>';
    return {
      html: '<figure class="wc"><span class="im fan">' + av + '</span><figcaption><h4>Avatar Fan</h4><p>Hover the card — the team fans out.</p><span class="tag">hover</span></figcaption></figure>',
      css: join([
        cardShell(v),
        '.wc .fan{display:grid;place-items:center}',
        '.wc .fan i{position:absolute;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font:800 15px/1 "Plus Jakarta Sans",system-ui,sans-serif;color:#fff;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));border:2px solid #14141f;transform:translateX(calc((var(--i) - 1.5) * 14px)) rotate(0);transition:transform var(--tt,.5s) cubic-bezier(.3,1.2,.4,1);animation:cfan-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite;animation-delay:calc(var(--i) * .12s)}',
        '.wc .fan i:nth-child(2){background:linear-gradient(135deg,var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '))}',
        '.wc .fan i:nth-child(4){background:linear-gradient(135deg,var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '))}',
        '.wc:hover .fan i{transform:translateX(calc((var(--i) - 1.5) * 42px)) rotate(calc((var(--i) - 1.5) * 9deg))}',
        '.wc:hover .fan i:nth-child(2),.wc:hover .fan i:nth-child(3){transform:translateX(calc((var(--i) - 1.5) * 42px)) rotate(calc((var(--i) - 1.5) * 9deg)) translateY(-9px)}',
        kf('cfan-' + v.i, '0%,100%{margin-top:0}50%{margin-top:-5px}')
      ]),
      cfg: cardCfg(v, [range('Fan', '--tt', .2, 1.2, .05, .5, 's')])
    };
  } });

  /* 8. chip spring — tags pop in one after another */
  CD.push({ key: 'chips', title: 'Chip Spring', tags: ['card', 'css'], build: function (v) {
    var tags = ['motion', 'css', 'loop', 'wave4'];
    var chips = '';
    tags.forEach(function (t, i2) { chips += '<b style="--i:' + i2 + '">' + t + '</b>'; });
    return {
      html: '<figure class="wc"><span class="im"></span><figcaption><h4>Chip Spring</h4><p>The taxonomy keeps refiling itself.</p><span class="chps">' + chips + '</span></figcaption></figure>',
      css: join([
        cardShell(v),
        '.wc .chps{display:flex;gap:6px;flex-wrap:wrap;margin-top:2px}',
        '.wc .chps b{font:600 9px/1 "JetBrains Mono",monospace;letter-spacing:.08em;text-transform:uppercase;color:#111520;background:var(--c3,' + v.c3 + ');border-radius:99px;padding:5px 8px;transform-origin:0 50%;animation:cchp-' + v.i + ' var(--dur,' + D(v, 2.2) + 's) cubic-bezier(.3,1.4,.4,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        '.wc .chps b:nth-child(2n){background:var(--c2,' + v.c2 + ')}',
        kf('cchp-' + v.i, '0%{transform:scale(0);opacity:0}12%,72%{transform:scale(1);opacity:1}82%,100%{transform:scale(0);opacity:0}')
      ]),
      cfg: cardCfg(v, [range('Stagger', '--step', 0, .4, .01, v.step, 's')])
    };
  } });

  /* 9. ripple rings — sonar rings radiate through the artwork */
  CD.push({ key: 'ripple', title: 'Ripple Rings', tags: ['card', 'css'], build: function (v) {
    return {
      html: cardHtml('Ripple Rings', v, '<i class="r1"></i><i class="r2"></i><i class="r3"></i>', 'Sonar rings radiate from the middle of the art.'),
      css: join([
        cardShell(v),
        '.wc .im i{position:absolute;left:50%;top:50%;width:12px;height:12px;margin:-6px;border-radius:50%;border:2px solid rgba(255,255,255,.85);opacity:0;animation:crip-' + v.i + ' var(--dur,' + D(v, 2) + 's) cubic-bezier(.2,.6,.3,1) infinite;animation-delay:calc(var(--i,0) * var(--step,' + v.step + 's))}',
        '.wc .im .r1{--i:0}.wc .im .r2{--i:1;border-color:var(--c3,' + v.c3 + ')}.wc .im .r3{--i:2}',
        kf('crip-' + v.i, '0%{transform:scale(.4);opacity:.9}100%{transform:scale(var(--grow,7));opacity:0}')
      ]),
      cfg: cardCfg(v, [range('Reach', '--grow', 3, 12, .5, 7, ''), range('Stagger', '--step', 0, .8, .02, v.step, 's')])
    };
  } });

  /* 10. invert flash — the artwork develops like a photo negative */
  CD.push({ key: 'invert', title: 'Invert Flash', tags: ['card', 'css'], build: function (v) {
    return {
      html: cardHtml('Invert Flash', v, '', 'The media flashes between positive and negative.'),
      css: join([
        cardShell(v),
        '.wc .im{animation:cinv-' + v.i + ' var(--dur,' + D(v, 2.4) + 's) steps(1,end) infinite}',
        kf('cinv-' + v.i, '0%,58%,100%{filter:none}66%{filter:invert(1) hue-rotate(160deg) saturate(1.6)}74%{filter:none}80%{filter:invert(1) hue-rotate(160deg) saturate(1.6)}')
      ]),
      cfg: cardCfg(v, [])
    };
  } });

  /* 11. stripe slide — diagonal light bars sweep the media */
  CD.push({ key: 'stripes', title: 'Stripe Slide', tags: ['card', 'css'], build: function (v) {
    return {
      html: cardHtml('Stripe Slide', v, '', 'Light bars keep sweeping the artwork like a scanner.'),
      css: join([
        cardShell(v),
        '.wc .im::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(115deg,transparent 0 14px,color-mix(in srgb,var(--c3,' + v.c3 + ') 38%,transparent) 14px 22px);animation:cstr-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite}',
        kf('cstr-' + v.i, 'to{background-position:72px 0}')
      ]),
      cfg: cardCfg(v, [])
    };
  } });

  /* 12. torch sweep — a searchlight roams the artwork */
  CD.push({ key: 'torch', title: 'Torch Sweep', tags: ['card', 'css'], build: function (v) {
    return {
      html: cardHtml('Torch Sweep', v, '', 'A searchlight roams the scene on its own patrol.'),
      css: join([
        cardShell(v),
        '.wc .im::before{content:"";position:absolute;inset:0;background:radial-gradient(circle var(--beam,52px) at 20% 30%,rgba(255,255,255,.5),transparent 72%);mix-blend-mode:overlay;animation:ctor-' + v.i + ' var(--dur,' + D(v, 3) + 's) ease-in-out infinite alternate}',
        kf('ctor-' + v.i, '0%{background-position:0 0}50%{background-position:120px 40px}100%{background-position:190px -30px}')
      ]),
      cfg: cardCfg(v, [range('Beam', '--beam', 20, 120, 2, 52, 'px')])
    };
  } });

  /* 13. levitate card — the whole card rides a gentle thermal */
  CD.push({ key: 'float', title: 'Levitate Card', tags: ['card', 'css'], build: function (v) {
    return {
      html: cardHtml('Levitate Card', v, '', 'The card rides a thermal — watch its shadow shrink and grow.'),
      css: join([
        cardShell(v),
        '.wc{animation:cflt-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite;box-shadow:0 18px 40px -18px rgba(0,0,0,.8)}',
        kf('cflt-' + v.i, '0%,100%{transform:translateY(0) rotate(var(--roll,.8deg));box-shadow:0 18px 40px -18px rgba(0,0,0,.8)}50%{transform:translateY(calc(var(--lift,12px) * -1)) rotate(0);box-shadow:0 34px 60px -22px rgba(0,0,0,.85)}')
      ]),
      cfg: cardCfg(v, [range('Lift', '--lift', 4, 30, 1, 12, 'px'), range('Roll', '--roll', 0, 3, .1, .8, 'deg')])
    };
  } });

  /* 14. beacon edge — one bright beacon runs the border */
  CD.push({ key: 'beacon', title: 'Beacon Edge', tags: ['card', 'css'], build: function (v) {
    return {
      html: cardHtml('Beacon Edge', v, '', 'A single beacon patrols the bezel.'),
      css: join([
        cardShell(v),
        '.wc{border:2px solid transparent;background:linear-gradient(#14141f,#14141f) padding-box,conic-gradient(from var(--bang,0deg),transparent 0 74%,var(--c3,' + v.c3 + ') 88%,transparent 100%) border-box}',
        '.wc h4,.wc p,.wc .tag{position:relative;z-index:1}'
      ]),
      js: 'var c=root.querySelector(".wc"),a=0;\n' +
        'api.raf(function(){a=(a+1.4)%360;c.style.setProperty("--bang",a.toFixed(1)+"deg");});',
      cfg: cardCfg(v, [])
    };
  } });

  /* 15. frosted plate — the glass caption plate fogs and clears */
  CD.push({ key: 'frost', title: 'Frosted Plate', tags: ['card', 'css'], build: function (v) {
    return {
      html: '<figure class="wc"><span class="im"></span><figcaption class="gl"><h4>Frosted Plate</h4><p>The glass plate fogs over, then clears.</p><span class="tag">glass</span></figcaption></figure>',
      css: join([
        cardShell(v),
        '.wc .gl{position:relative;background:color-mix(in srgb,#14141f 62%,transparent);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);animation:cfro-' + v.i + ' var(--dur,' + D(v, 2.4) + 's) ease-in-out infinite}',
        kf('cfro-' + v.i, '0%,100%{backdrop-filter:blur(1px);-webkit-backdrop-filter:blur(1px);background:color-mix(in srgb,#14141f 55%,transparent)}50%{backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);background:color-mix(in srgb,#14141f 30%,transparent)}')
      ]),
      cfg: cardCfg(v, [])
    };
  } });

  /* 16. spinning badge — the seal of quality never stops turning */
  CD.push({ key: 'badge', title: 'Spinning Badge', tags: ['card', 'css'], build: function (v) {
    return {
      html: '<figure class="wc"><span class="im"><b class="bdg">\u2726</b></span><figcaption><h4>Spinning Badge</h4><p>The seal of quality never stops turning.</p><span class="tag">loop</span></figcaption></figure>',
      css: join([
        cardShell(v),
        '.wc .bdg{position:absolute;top:10px;right:10px;width:var(--bd,38px);height:var(--bd,38px);display:grid;place-items:center;border-radius:50%;background:conic-gradient(var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '));color:#fff;font-size:calc(var(--bd,38px) * .5);box-shadow:0 4px 14px rgba(0,0,0,.5);animation:cbdg-' + v.i + ' var(--dur,' + v.dur + 's) cubic-bezier(.6,0,.4,1) infinite}',
        kf('cbdg-' + v.i, '0%,55%,100%{transform:rotate(0) scale(1)}70%{transform:rotate(1turn) scale(1.12)}85%{transform:rotate(1turn) scale(1)}')
      ]),
      cfg: cardCfg(v, [range('Badge', '--bd', 24, 64, 2, 38, 'px')])
    };
  } });

  K.add('cards', V.matrix('cards', CD, 20, 'w4cd'));

  /* ════════════════════════ BACKGROUNDS ════════════════════════ */
  var BG = [];

  var BGS = '.wbg{position:relative;width:var(--w,264px);height:var(--h,150px);border-radius:var(--rad,14px);overflow:hidden;background:#0c0c16;border:1px solid rgba(255,255,255,.08);isolation:isolate}';
  function bgCfg(v, extra) {
    return [
      range('Width', '--w', 160, 440, 4, 264, 'px'),
      range('Height', '--h', 90, 260, 2, 150, 'px'),
      range('Corner', '--rad', 0, 40, 1, 14, 'px'),
      range('Cycle', '--dur', .6, 40, .2, v.dur, 's'),
      col('Colour', '--c1', v.c1),
      col('Colour B', '--c2', v.c2),
      col('Colour C', '--c3', v.c3)
    ].concat(extra || []);
  }

  /* 1. dot grid pulse — two dot fields trade the beat */
  BG.push({ key: 'dotpulse', title: 'Dot Grid Pulse', tags: ['background', 'css'], build: function (v) {
    return {
      html: '<div class="wbg dgp"></div>',
      css: join([
        BGS,
        '.wbg.dgp{background:#0b0b14}',
        '.wbg.dgp::before,.wbg.dgp::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,var(--c1,' + v.c1 + ') 0 var(--dot,3px),transparent 0) 0 0/var(--tile,24px) var(--tile,24px);animation:bgdp-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite}',
        '.wbg.dgp::after{background:radial-gradient(circle at 50% 50%,var(--c2,' + v.c2 + ') 0 calc(var(--dot,3px) * .7),transparent 0) 0 0/var(--tile,24px) var(--tile,24px);background-position:calc(var(--tile,24px) / 2) calc(var(--tile,24px) / 2);animation-delay:calc(var(--dur,' + D(v, 2) + 's) / -2)}',
        kf('bgdp-' + v.i, '0%,100%{opacity:.25;transform:scale(1)}50%{opacity:1;transform:scale(var(--zoom,1.06))}')
      ]),
      cfg: bgCfg(v, [range('Dot', '--dot', 1, 10, .5, 3, 'px'), range('Tile', '--tile', 12, 60, 2, 24, 'px'), range('Zoom', '--zoom', 1, 1.3, .01, 1.06, '')])
    };
  } });

  /* 2. sunburst rays — a slow carousel of light beams */
  BG.push({ key: 'rays', title: 'Sunburst Rays', tags: ['background', 'css'], build: function (v) {
    return {
      html: '<div class="wbg ray"></div>',
      css: join([
        BGS,
        '.wbg.ray{background:radial-gradient(60% 60% at 50% 50%,color-mix(in srgb,var(--c1,' + v.c1 + ') 30%,transparent),transparent 75%),#0c0a14}',
        '.wbg.ray::before{content:"";position:absolute;inset:-70%;background:repeating-conic-gradient(from 0deg at 50% 50%,color-mix(in srgb,var(--c2,' + v.c2 + ') 30%,transparent) 0 var(--beam,9deg),transparent var(--beam,9deg) calc(var(--beam,9deg) * 2 + 8deg));animation:bgra-' + v.i + ' var(--dur,' + D(v, 4) + 's) linear infinite}',
        '.wbg.ray::after{content:"";position:absolute;left:50%;top:50%;width:12px;height:12px;margin:-6px;border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 var(--glow,26px) var(--c3,' + v.c3 + ')}',
        kf('bgra-' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: bgCfg(v, [range('Beam', '--beam', 4, 30, 1, 9, 'deg'), range('Glow', '--glow', 4, 80, 2, 26, 'px')])
    };
  } });

  /* 3. diagonal drift — endless escalator of light stripes */
  BG.push({ key: 'diag', title: 'Diagonal Drift', tags: ['background', 'css'], build: function (v) {
    return {
      html: '<div class="wbg dg"></div>',
      css: join([
        BGS,
        '.wbg.dg{background:repeating-linear-gradient(115deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 42%,transparent) 0 var(--line,12px),transparent var(--line,12px) calc(var(--line,12px) * 3)),linear-gradient(160deg,#0c0c18,#101024);animation:bgdg-' + v.i + ' var(--dur,' + D(v, 3) + 's) linear infinite ' + v.dir + '}',
        kf('bgdg-' + v.i, 'to{background-position:calc(var(--line,12px) * 3.22) 0,0 0}')
      ]),
      cfg: bgCfg(v, [range('Stripe', '--line', 4, 36, 1, 12, 'px')])
    };
  } });

  /* 4. confetti drift — three grain showers at three tempos */
  BG.push({ key: 'confetti', title: 'Confetti Drift', tags: ['background', 'css'], build: function (v) {
    return {
      html: '<div class="wbg cnf"><i></i><i></i><i></i></div>',
      css: join([
        BGS,
        '.wbg.cnf i{position:absolute;inset:-40px 0 0;background:radial-gradient(circle 2.4px at 14px 12px,var(--c1,' + v.c1 + ') 96%,transparent),radial-gradient(circle 1.8px at 44px 30px,var(--c2,' + v.c2 + ') 96%,transparent),radial-gradient(circle 1.5px at 70px 8px,var(--c3,' + v.c3 + ') 96%,transparent);background-size:86px 60px;animation:bgcf-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite}',
        '.wbg.cnf i:nth-child(2){background-size:64px 48px;background-position:-20px -14px;animation-duration:calc(var(--dur,' + D(v, 2) + 's) * 1.5);opacity:.7}',
        '.wbg.cnf i:nth-child(3){background-size:120px 84px;background-position:-50px -42px;animation-duration:calc(var(--dur,' + D(v, 2) + 's) * 2.3);opacity:.45}',
        kf('bgcf-' + v.i, 'to{background-position:0 60px,0 48px,0 84px}')
      ]),
      cfg: bgCfg(v, [])
    };
  } });

  /* 5. goo blobs — morphing orbs merge and split */
  BG.push({ key: 'goo', title: 'Goo Blobs', tags: ['background', 'css'], build: function (v) {
    return {
      html: '<div class="wbg goo"><i class="a"></i><i class="b"></i><i class="c"></i></div>',
      css: join([
        BGS,
        '.wbg.goo{background:#08080f;filter:blur(1px)}',
        '.wbg.goo i{position:absolute;left:50%;top:50%;width:var(--sz,64px);height:var(--sz,64px);margin:calc(var(--sz,64px) / -2);border-radius:50%;background:radial-gradient(circle at 36% 34%,var(--c1,' + v.c1 + '),color-mix(in srgb,var(--c1,' + v.c1 + ') 30%,transparent) 72%);filter:blur(var(--blur,12px));animation:bggo-' + v.i + ' var(--dur,' + D(v, 2.6) + 's) ease-in-out infinite alternate}',
        '.wbg.goo .b{background:radial-gradient(circle at 36% 34%,var(--c2,' + v.c2 + '),color-mix(in srgb,var(--c2,' + v.c2 + ') 30%,transparent) 72%);animation-duration:calc(var(--dur,' + D(v, 2.6) + 's) * 1.3);animation-delay:-1s}',
        '.wbg.goo .c{background:radial-gradient(circle at 36% 34%,var(--c3,' + v.c3 + '),color-mix(in srgb,var(--c3,' + v.c3 + ') 30%,transparent) 72%);animation-duration:calc(var(--dur,' + D(v, 2.6) + 's) * 1.7);animation-delay:-2s}',
        kf('bggo-' + v.i, '0%{transform:translate(-70%,-40%) scale(1)}50%{transform:translate(30%,20%) scale(1.35)}100%{transform:translate(70%,-30%) scale(.8)}')
      ]),
      cfg: bgCfg(v, [range('Blob', '--sz', 30, 130, 2, 64, 'px'), range('Blur', '--blur', 4, 30, 1, 12, 'px')])
    };
  } });

  /* 6. warp streaks — light streaks bend past the cockpit */
  BG.push({ key: 'warp', title: 'Warp Streaks', tags: ['background', 'css'], build: function (v) {
    return {
      html: '<div class="wbg wrp"></div>',
      css: join([
        BGS,
        '.wbg.wrp{background:radial-gradient(70% 70% at 50% 50%,#0a0a18 20%,#04040a)}',
        '.wbg.wrp::before{content:"";position:absolute;inset:-60%;background:repeating-conic-gradient(from 0deg at 50% 50%,transparent 0 var(--gap,11deg),color-mix(in srgb,var(--c2,' + v.c2 + ') 55%,transparent) calc(var(--gap,11deg) + 1.5deg),transparent calc(var(--gap,11deg) + 3deg));-webkit-mask:radial-gradient(closest-side,transparent 18%,#000 60%);mask:radial-gradient(closest-side,transparent 18%,#000 60%);animation:bgwr-' + v.i + ' var(--dur,' + D(v, 2.4) + 's) linear infinite}',
        kf('bgwr-' + v.i, '0%{transform:rotate(0) scale(1);opacity:.7}50%{transform:rotate(.5turn) scale(1.15);opacity:1}100%{transform:rotate(1turn) scale(1);opacity:.7}')
      ]),
      cfg: bgCfg(v, [range('Gap', '--gap', 6, 24, 1, 11, 'deg')])
    };
  } });

  /* 7. contour lines — a drifting topographic map */
  BG.push({ key: 'contour', title: 'Contour Lines', tags: ['background', 'css'], build: function (v) {
    return {
      html: '<div class="wbg cnt"></div>',
      css: join([
        BGS,
        '.wbg.cnt{background:repeating-radial-gradient(circle var(--ring,340px) at 18% 30%,transparent 0 var(--line,26px),color-mix(in srgb,var(--c1,' + v.c1 + ') 42%,transparent) var(--line,26px) calc(var(--line,26px) + 1.5px)),repeating-radial-gradient(circle var(--ring,340px) at 84% 72%,transparent 0 var(--line,26px),color-mix(in srgb,var(--c2,' + v.c2 + ') 42%,transparent) var(--line,26px) calc(var(--line,26px) + 1.5px)),#0b1016;animation:bgcn-' + v.i + ' var(--dur,' + D(v, 3) + 's) ease-in-out infinite alternate}',
        kf('bgcn-' + v.i, 'to{background-position:24px 14px,-30px -18px,0 0}')
      ]),
      cfg: bgCfg(v, [range('Line gap', '--line', 10, 60, 2, 26, 'px')])
    };
  } });

  /* 8. dither beat — checkerboard pixels breathing in steps */
  BG.push({ key: 'dither', title: 'Dither Beat', tags: ['background', 'css'], build: function (v) {
    return {
      html: '<div class="wbg dth"></div>',
      css: join([
        BGS,
        '.wbg.dth{background:#0a0a12}',
        '.wbg.dth::before{content:"";position:absolute;inset:0;background:repeating-conic-gradient(color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent) 0 25%,transparent 0 50%) 0 0/var(--tile,22px) var(--tile,22px);animation:bgdt-' + v.i + ' var(--dur,' + D(v, 2) + 's) steps(4,end) infinite ' + v.dir + '}',
        '.wbg.dth::after{content:"";position:absolute;inset:0;background:repeating-conic-gradient(color-mix(in srgb,var(--c2,' + v.c2 + ') 35%,transparent) 0 25%,transparent 0 50%) 0 0/calc(var(--tile,22px) * 3) calc(var(--tile,22px) * 3);mix-blend-mode:screen}',
        kf('bgdt-' + v.i, 'to{background-position:calc(var(--tile,22px) * 2) calc(var(--tile,22px) * 2)}')
      ]),
      cfg: bgCfg(v, [range('Tile', '--tile', 8, 60, 2, 22, 'px')])
    };
  } });

  /* 9. scan sweep — a scanner band patrols the grid */
  BG.push({ key: 'scan', title: 'Scan Sweep', tags: ['background', 'css'], build: function (v) {
    return {
      html: '<div class="wbg scn"></div>',
      css: join([
        BGS,
        '.wbg.scn{background:linear-gradient(rgba(255,255,255,.06) 0 1px,transparent 1px) 0 0/100% 24px,linear-gradient(90deg,rgba(255,255,255,.06) 0 1px,transparent 1px) 0 0/24px 100%,#0a0e14}',
        '.wbg.scn::before{content:"";position:absolute;left:0;right:0;top:0;height:var(--band,30%);background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,transparent) 78%,var(--c2,' + v.c2 + '));animation:bgsc-' + v.i + ' var(--dur,' + D(v, 2) + 's) cubic-bezier(.45,0,.55,1) infinite alternate;box-shadow:0 0 var(--glow,20px) color-mix(in srgb,var(--c2,' + v.c2 + ') 55%,transparent)}',
        kf('bgsc-' + v.i, 'to{transform:translateY(calc(100% * var(--h2,3.4)))}')
      ]),
      cfg: bgCfg(v, [range('Band', '--band', 12, 60, 2, 30, '%'), range('Glow', '--glow', 0, 60, 2, 20, 'px'), range('Travel', '--h2', 1, 5, .1, 3.4, '')])
    };
  } });

  /* 10. circuit grid — crossing glow traces on a blueprint */
  BG.push({ key: 'circuit', title: 'Circuit Grid', tags: ['background', 'css'], build: function (v) {
    return {
      html: '<div class="wbg cct"><i class="h"></i><i class="v"></i></div>',
      css: join([
        BGS,
        '.wbg.cct{background:linear-gradient(color-mix(in srgb,var(--c1,' + v.c1 + ') 16%,transparent) 0 1px,transparent 1px) 0 0/var(--cell,30px) var(--cell,30px),linear-gradient(90deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 16%,transparent) 0 1px,transparent 1px) 0 0/var(--cell,30px) var(--cell,30px),radial-gradient(circle 1.6px at 15px 15px,color-mix(in srgb,var(--c1,' + v.c1 + ') 65%,transparent) 97%,transparent) 0 0/var(--cell,30px) var(--cell,30px),#0a1020}',
        '.wbg.cct i{position:absolute;background:linear-gradient(90deg,transparent,var(--c2,' + v.c2 + '),var(--c2,' + v.c2 + '),transparent);opacity:.9;filter:drop-shadow(0 0 6px var(--c2,' + v.c2 + '))}',
        '.wbg.cct .h{left:-20%;right:-20%;top:calc(var(--row,35%) - 1px);height:2px;animation:bgch-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite alternate}',
        '.wbg.cct .v{top:-20%;bottom:-20%;left:calc(var(--col2,62%) - 1px);width:2px;background:linear-gradient(180deg,transparent,var(--c3,' + v.c3 + '),var(--c3,' + v.c3 + '),transparent);animation:bgcv-' + v.i + ' calc(var(--dur,' + D(v, 2) + 's) * 1.4) ease-in-out infinite alternate}',
        kf('bgch-' + v.i, 'to{top:calc(100% - var(--row,35%))}'),
        kf('bgcv-' + v.i, 'to{left:calc(100% - var(--col2,62%))}')
      ]),
      cfg: bgCfg(v, [range('Cell', '--cell', 14, 60, 2, 30, 'px'), range('Row', '--row', 10, 90, 1, 35, '%'), range('Column', '--col2', 10, 90, 1, 62, '%')])
    };
  } });

  /* 11. mosaic flicker — a wall of tiles flickering to life */
  BG.push({ key: 'mosaic', title: 'Mosaic Flicker', tags: ['background', 'css'], build: function (v) {
    return {
      html: '<div class="wbg msc">' + cells(48) + '</div>',
      css: join([
        BGS,
        '.wbg.msc{position:relative;display:grid;grid-template-columns:repeat(8,1fr);grid-auto-rows:1fr;gap:2px;padding:2px;background:#07070d}',
        '.wbg.msc i{border-radius:2px;background:var(--c1,' + v.c1 + ');opacity:.06;animation:bgms-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * 2)}',
        '.wbg.msc i:nth-child(3n){background:var(--c2,' + v.c2 + ');animation-duration:calc(var(--dur,' + D(v, 2) + 's) * 1.4)}',
        '.wbg.msc i:nth-child(7n){background:var(--c3,' + v.c3 + ');animation-duration:calc(var(--dur,' + D(v, 2) + 's) * 1.8)}',
        kf('bgms-' + v.i, '0%,100%{opacity:.06}50%{opacity:var(--peak,.85)}')
      ]),
      cfg: bgCfg(v, [range('Stagger', '--step', 0, .3, .01, v.step, 's'), range('Peak', '--peak', .2, 1, .05, .85, '')])
    };
  } });

  /* 12. fog banks — ground fog rolling over dark water */
  BG.push({ key: 'fog', title: 'Fog Banks', tags: ['background', 'css'], build: function (v) {
    return {
      html: '<div class="wbg fg2"><i></i><i></i></div>',
      css: join([
        BGS,
        '.wbg.fg2{background:linear-gradient(180deg,#0a0d18 30%,#0d141f 70%,#0a0d18)}',
        '.wbg.fg2 i{position:absolute;left:-30%;right:-30%;height:60%;border-radius:50%;filter:blur(var(--blur,14px));background:radial-gradient(60% 100% at 50% 100%,color-mix(in srgb,var(--c2,' + v.c2 + ') 30%,transparent),transparent 75%)}',
        '.wbg.fg2 i:first-child{bottom:8%;animation:bgfg-' + v.i + ' var(--dur,' + D(v, 3) + 's) ease-in-out infinite alternate}',
        '.wbg.fg2 i:last-child{bottom:36%;opacity:.7;animation:bgfg-' + v.i + ' calc(var(--dur,' + D(v, 3) + 's) * 1.5) ease-in-out infinite alternate-reverse}',
        kf('bgfg-' + v.i, 'to{transform:translateX(var(--sway,14%))}')
      ]),
      cfg: bgCfg(v, [range('Blur', '--blur', 4, 34, 1, 14, 'px'), range('Sway', '--sway', 4, 30, 1, 14, '%')])
    };
  } });

  /* 13. spotlight sway — stage beams hunting for the performer */
  BG.push({ key: 'spots', title: 'Spotlight Sway', tags: ['background', 'css'], build: function (v) {
    return {
      html: '<div class="wbg spt"><i></i><i></i></div>',
      css: join([
        BGS,
        '.wbg.spt{background:radial-gradient(80% 60% at 50% 118%,color-mix(in srgb,var(--c3,' + v.c3 + ') 22%,transparent),transparent 70%),#08070f}',
        '.wbg.spt i{position:absolute;top:-58%;width:34%;height:180%;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent),transparent 82%);clip-path:polygon(38% 0,62% 0,100% 100%,0 100%);filter:blur(3px);transform-origin:50% 0;animation:bgsp-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite alternate}',
        '.wbg.spt i:first-child{left:6%;background:linear-gradient(180deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent),transparent 82%)}',
        '.wbg.spt i:last-child{right:6%;background:linear-gradient(180deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 55%,transparent),transparent 82%);animation-duration:calc(var(--dur,' + D(v, 2) + 's) * 1.35);animation-direction:alternate-reverse}',
        kf('bgsp-' + v.i, '0%{transform:rotate(calc(var(--sway,16deg) * -1))}100%{transform:rotate(var(--sway,16deg))}')
      ]),
      cfg: bgCfg(v, [range('Sway', '--sway', 4, 40, 1, 16, 'deg')])
    };
  } });

  /* 14. light rain streaks — thin light drizzle at three speeds */
  BG.push({ key: 'streaks', title: 'Light Rain Streaks', tags: ['background', 'css'], build: function (v) {
    return {
      html: '<div class="wbg stk"><i></i><i></i><i></i></div>',
      css: join([
        BGS,
        '.wbg.stk{background:linear-gradient(180deg,#0b0d16,#0d1020)}',
        '.wbg.stk i{position:absolute;inset:-80px 0 0;background:repeating-linear-gradient(180deg,transparent 0 26px,color-mix(in srgb,var(--c2,' + v.c2 + ') 75%,transparent) 26px 44px,transparent 44px var(--gap,70px)) 0 0/var(--col,46px) 100%;animation:bgrn-' + v.i + ' var(--dur,' + v.dur + 's) linear infinite}',
        '.wbg.stk i:nth-child(2){background:repeating-linear-gradient(180deg,transparent 0 34px,color-mix(in srgb,var(--c1,' + v.c1 + ') 6' + '5%,transparent) 34px 58px,transparent 58px 96px) -22px 0/calc(var(--col,46px) * 1.6) 100%;animation-duration:calc(var(--dur,' + v.dur + 's) * 1.6);opacity:.7}',
        '.wbg.stk i:nth-child(3){background:repeating-linear-gradient(180deg,transparent 0 20px,color-mix(in srgb,var(--c3,' + v.c3 + ') 45%,transparent) 20px 30px,transparent 30px 54px) -38px 0/calc(var(--col,46px) * .7) 100%;animation-duration:calc(var(--dur,' + v.dur + 's) * .7);opacity:.5}',
        kf('bgrn-' + v.i, 'to{background-position:0 200px,0 220px,0 180px}')
      ]),
      cfg: bgCfg(v, [range('Column', '--col', 20, 90, 2, 46, 'px'), range('Gap', '--gap', 40, 140, 2, 70, 'px')])
    };
  } });

  /* 15. bubble rise — soft spheres float to the surface */
  BG.push({ key: 'bubbles', title: 'Bubble Rise', tags: ['background', 'css'], build: function (v) {
    return {
      html: '<div class="wbg bbl">' + cells(6) + '</div>',
      css: join([
        BGS,
        '.wbg.bbl{background:linear-gradient(180deg,#071018,#0a1a26)}',
        '.wbg.bbl i{position:absolute;left:calc(var(--i) * 16% + 4%);bottom:calc(var(--d,18px) * -1);width:var(--d,18px);height:var(--d,18px);border-radius:50%;background:radial-gradient(circle at 34% 30%,rgba(255,255,255,.65),color-mix(in srgb,var(--c2,' + v.c2 + ') 55%,transparent) 60%);opacity:0;animation:bbup-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * 3)}',
        '.wbg.bbl i:nth-child(2n){transform:scale(.6);background:radial-gradient(circle at 34% 30%,rgba(255,255,255,.55),color-mix(in srgb,var(--c1,' + v.c1 + ') 50%,transparent) 60%)}',
        '.wbg.bbl i:nth-child(3n){transform:scale(.35)}',
        kf('bbup-' + v.i, '0%{transform:translateY(0);opacity:0}12%{opacity:.9}100%{transform:translateY(calc(var(--rise,190px) * -1)) translateX(var(--drift,14px));opacity:0}')
      ]),
      cfg: bgCfg(v, [range('Bubble', '--d', 8, 40, 1, 18, 'px'), range('Rise', '--rise', 90, 320, 4, 190, 'px'), range('Drift', '--drift', 0, 40, 1, 14, 'px'), range('Stagger', '--step', 0, .5, .01, v.step, 's')])
    };
  } });

  /* 16. corner radar — rings and a sweep from the far corner */
  BG.push({ key: 'radar', title: 'Corner Radar', tags: ['background', 'css'], build: function (v) {
    return {
      html: '<div class="wbg rdr"><i></i><i></i><i></i></div>',
      css: join([
        BGS,
        '.wbg.rdr{background:radial-gradient(90% 90% at 88% 12%,color-mix(in srgb,var(--c1,' + v.c1 + ') 14%,transparent),transparent 70%),#080b12}',
        '.wbg.rdr::before{content:"";position:absolute;right:-14%;top:-36%;width:58%;aspect-ratio:1;border-radius:50%;background:conic-gradient(from 0deg,transparent 0 82%,color-mix(in srgb,var(--c2,' + v.c2 + ') 65%,transparent) 96%,transparent 100%);animation:bgrd-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite}',
        '.wbg.rdr i{position:absolute;right:-14%;top:-36%;width:calc(30% * (var(--i) + 1));aspect-ratio:1;border:1.5px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 42%,transparent);border-radius:50%;opacity:0;animation:bgrr-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -4)}',
        kf('bgrd-' + v.i, 'to{transform:rotate(1turn)}'),
        kf('bgrr-' + v.i, '0%{transform:scale(.2);opacity:0}25%{opacity:.9}100%{transform:scale(1.6);opacity:0}')
      ]),
      cfg: bgCfg(v, [range('Stagger', '--step', 0, .5, .01, v.step, 's')])
    };
  } });

  K.add('backgrounds', V.matrix('backgrounds', BG, 20, 'w4bg'));

  /* ════════════════════════ CONTROLS ════════════════════════ */
  var CT = [];

  function ctlCfg(v, extra) {
    return [
      range('Cycle', '--dur', .4, 24, .1, v.dur, 's'),
      range('Stagger', '--step', 0, .5, .01, v.step, 's'),
      col('Colour', '--c1', v.c1),
      col('Colour B', '--c2', v.c2),
      col('Colour C', '--c3', v.c3)
    ].concat(extra || []);
  }

  /* 1. traffic stack — red, amber, green take their turn */
  CT.push({ key: 'traffic', title: 'Traffic Stack', tags: ['controls', 'css'], build: function (v) {
    return {
      html: '<div class="tfs"><i class="g"></i><i class="a"></i><i class="r"></i></div>',
      css: join([
        '.tfs{display:grid;gap:8px;padding:12px 13px;border-radius:99px;background:linear-gradient(180deg,#16161f,#0d0d15);box-shadow:inset 0 2px 6px rgba(0,0,0,.7),0 1px 0 rgba(255,255,255,.07)}',
        '.tfs i{width:var(--d,22px);height:var(--d,22px);border-radius:50%;color:var(--c1,' + v.c1 + ');background:var(--c1,' + v.c1 + ');opacity:.14;animation:tfl-' + v.i + ' var(--dur,' + D(v, 3) + 's) linear infinite}',
        '.tfs .a{color:var(--c2,' + v.c2 + ');background:var(--c2,' + v.c2 + ');animation-delay:calc(var(--dur,' + D(v, 3) + 's) / -3)}',
        '.tfs .r{color:var(--c3,' + v.c3 + ');background:var(--c3,' + v.c3 + ');animation-delay:calc(var(--dur,' + D(v, 3) + 's) / -3 * 2)}',
        kf('tfl-' + v.i, '0%,27%{opacity:1;box-shadow:0 0 var(--glow,14px) currentColor}34%,100%{opacity:.14;box-shadow:none}')
      ]),
      cfg: ctlCfg(v, [range('Lamp', '--d', 12, 40, 1, 22, 'px'), range('Glow', '--glow', 0, 40, 1, 14, 'px')])
    };
  } });

  /* 2. segmented slide — the pill keeps sampling its options */
  CT.push({ key: 'segment', title: 'Segmented Slide', tags: ['controls', 'css'], build: function (v) {
    return {
      html: '<div class="sgm"><i class="pl"></i><b>Sync</b><b>Mesh</b><b>Rip</b></div>',
      css: join([
        '.sgm{position:relative;display:flex;width:var(--w,220px);padding:4px;border-radius:12px;background:#101018;box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}',
        '.sgm b{flex:1;position:relative;z-index:1;text-align:center;font:600 11.5px/26px "Plus Jakarta Sans",system-ui,sans-serif;color:#9a9ab0}',
        '.sgm .pl{position:absolute;top:4px;bottom:4px;left:4px;width:calc((100% - 8px) / 3);border-radius:9px;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));animation:sgm-' + v.i + ' var(--dur,' + D(v, 3) + 's) cubic-bezier(.7,0,.3,1) infinite;box-shadow:0 4px 14px -4px var(--c1,' + v.c1 + ')}',
        kf('sgm-' + v.i, '0%,24%{transform:translateX(0)}33%,57%{transform:translateX(100%)}66%,90%{transform:translateX(200%)}100%{transform:translateX(0)}')
      ]),
      cfg: ctlCfg(v, [range('Width', '--w', 140, 320, 2, 220, 'px')])
    };
  } });

  /* 3. star fill row — the review writes itself, five stars over */
  CT.push({ key: 'stars', title: 'Star Fill Row', tags: ['controls', 'css'], build: function (v) {
    var stars = '';
    for (var s = 0; s < 5; s++) stars += '<i class="st" style="--i:' + s + '">\u2605</i>';
    return {
      html: '<div class="str">' + stars + '</div>',
      css: join([
        '.str{display:flex;gap:6px}',
        '.str i{font-style:normal;font-size:var(--fs,30px);color:rgba(255,255,255,.14);animation:stf-' + v.i + ' var(--dur,' + D(v, 2.4) + 's) cubic-bezier(.3,1.3,.4,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('stf-' + v.i, '0%{transform:scale(.7)}12%,70%{transform:scale(1);color:var(--c3,' + v.c3 + ');text-shadow:0 0 var(--glow,12px) var(--c3,' + v.c3 + ')}82%,100%{transform:scale(.7);color:rgba(255,255,255,.14);text-shadow:none}')
      ]),
      cfg: ctlCfg(v, [range('Star', '--fs', 16, 64, 1, 30, 'px'), range('Glow', '--glow', 0, 40, 1, 12, 'px')])
    };
  } });

  /* 4. arc volume — the knob sweeps its scale and settles back */
  CT.push({ key: 'arcvol', title: 'Arc Volume', tags: ['controls', 'css'], build: function (v) {
    return {
      html: '<div class="av"><b class="nb"></b></div>',
      css: join([
        '.av{position:relative;width:var(--sz,104px);height:var(--sz,104px);border-radius:50%;background:repeating-conic-gradient(from 225deg,color-mix(in srgb,var(--c3,' + v.c3 + ') 75%,transparent) 0 2.4deg,transparent 2.4deg 11.25deg);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 9px),#000 0);mask:radial-gradient(farthest-side,transparent calc(100% - 9px),#000 0)}',
        '.av .nb{position:absolute;inset:14%;border-radius:50%;background:linear-gradient(145deg,#1b1b28,#10101a);box-shadow:0 6px 18px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.1)}',
        '.av .nb::before{content:"";position:absolute;left:calc(50% - 2px);top:8%;width:4px;height:30%;border-radius:99px;background:var(--c2,' + v.c2 + ');box-shadow:0 0 8px var(--c2,' + v.c2 + ');transform-origin:50% 140%;animation:avk-' + v.i + ' var(--dur,' + D(v, 2) + 's) cubic-bezier(.55,0,.45,1) infinite}',
        kf('avk-' + v.i, '0%,100%{transform:rotate(calc(var(--swing,120deg) * -1))}50%{transform:rotate(var(--swing,120deg))}')
      ]),
      cfg: ctlCfg(v, [range('Size', '--sz', 60, 180, 2, 104, 'px'), range('Swing', '--swing', 30, 150, 5, 120, 'deg')])
    };
  } });

  /* 5. odometer stepper — a counter that refuses to stop */
  CT.push({ key: 'counter', title: 'Odometer Stepper', tags: ['controls', 'js'], build: function (v) {
    return {
      html: '<div class="odo"><b class="num">00</b><i class="bar"></i></div>',
      css: join([
        '.odo{display:grid;gap:8px;justify-items:center;padding:14px 18px;border-radius:14px;background:#101019;box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}',
        '.odo .num{font:700 var(--fs,30px)/1 "JetBrains Mono",monospace;color:var(--c2,' + v.c2 + ');font-variant-numeric:tabular-nums;text-shadow:0 0 14px color-mix(in srgb,var(--c2,' + v.c2 + ') 55%,transparent)}',
        '.odo .bar{width:var(--w,120px);height:4px;border-radius:99px;background:linear-gradient(90deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform-origin:0 50%;transform:scaleX(calc(var(--p,0) / 100))}'
      ]),
      js: 'var num=root.querySelector(".num"),bar=root.querySelector(".bar"),p=0,t=0;\n' +
        'api.raf(function(){if(++t%5)return;p=(p+1)%100;num.textContent=(p<10?"0":"")+p;bar.style.setProperty("--p",p);});',
      cfg: ctlCfg(v, [range('Digits', '--fs', 16, 60, 1, 30, 'px'), range('Width', '--w', 60, 220, 2, 120, 'px')])
    };
  } });

  /* 6. power pulse — the standby ring breathes, waiting for you */
  CT.push({ key: 'power', title: 'Power Pulse', tags: ['controls', 'css'], build: function (v) {
    return {
      html: '<button class="pwr" type="button" aria-label="power"></button>',
      css: join([
        '.pwr{position:relative;width:var(--sz,76px);height:var(--sz,76px);border:0;cursor:pointer;border-radius:50%;background:radial-gradient(circle at 40% 34%,#1e1e2c,#0e0e16);box-shadow:0 8px 22px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.12)}',
        '.pwr::before{content:"";position:absolute;inset:26%;border-radius:50%;border:4px solid var(--c1,' + v.c1 + ');border-top-color:transparent;transform:rotate(45deg)}',
        '.pwr::after{content:"";position:absolute;left:calc(50% - 2px);top:14%;width:4px;height:30%;border-radius:99px;background:var(--c1,' + v.c1 + ')}',
        '.pwr{animation:pwu-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite}',
        kf('pwu-' + v.i, '0%,100%{box-shadow:0 8px 22px rgba(0,0,0,.55),0 0 0 0 color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent);filter:brightness(1)}50%{box-shadow:0 8px 22px rgba(0,0,0,.55),0 0 0 var(--ring,8px) color-mix(in srgb,var(--c1,' + v.c1 + ') 0%,transparent),inset 0 0 18px color-mix(in srgb,var(--c1,' + v.c1 + ') 35%,transparent);filter:brightness(1.25)}')
      ]),
      cfg: ctlCfg(v, [range('Size', '--sz', 40, 140, 2, 76, 'px'), range('Ring', '--ring', 2, 24, 1, 8, 'px')])
    };
  } });

  /* 7. choice cards — the selection keeps changing its mind */
  CT.push({ key: 'choice', title: 'Choice Cards', tags: ['controls', 'css'], build: function (v) {
    var names = ['Solo', 'Duo', 'Team'];
    var out = '';
    names.forEach(function (n, i2) { out += '<b style="--i:' + i2 + '"><s></s>' + n + '</b>'; });
    return {
      html: '<div class="cho">' + out + '</div>',
      css: join([
        '.cho{display:flex;gap:8px}',
        '.cho b{position:relative;display:grid;gap:7px;justify-items:center;padding:12px 13px 10px;border-radius:12px;background:#101019;border:1.5px solid rgba(255,255,255,.09);font:600 11px/1 "Plus Jakarta Sans",system-ui,sans-serif;color:#9a9ab0;animation:cho-' + v.i + ' var(--dur,' + D(v, 3) + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + D(v, 3) + 's) / 3)}',
        '.cho s{width:15px;height:15px;border-radius:50%;border:2px solid rgba(255,255,255,.25);display:grid;place-items:center}',
        '.cho b::after{content:"";position:absolute;top:14px;left:50%;width:7px;height:7px;margin-left:-3.5px;border-radius:50%;background:var(--c3,' + v.c3 + ');opacity:0;transform:scale(.3);animation:chd-' + v.i + ' var(--dur,' + D(v, 3) + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--dur,' + D(v, 3) + 's) / 3)}',
        kf('cho-' + v.i, '0%{border-color:rgba(255,255,255,.09);color:#9a9ab0;transform:translateY(0)}3%,30%{border-color:var(--c1,' + v.c1 + ');color:#fff;transform:translateY(-3px);box-shadow:0 10px 24px -12px var(--c1,' + v.c1 + ')}37%,100%{border-color:rgba(255,255,255,.09);color:#9a9ab0;transform:translateY(0)}'),
        kf('chd-' + v.i, '0%{opacity:0;transform:scale(.3)}4%,30%{opacity:1;transform:scale(1)}36%,100%{opacity:0;transform:scale(.3)}')
      ]),
      cfg: ctlCfg(v, [])
    };
  } });

  /* 8. sweep slider — the fader scans its whole range */
  CT.push({ key: 'slider', title: 'Sweep Slider', tags: ['controls', 'css'], build: function (v) {
    return {
      html: '<div class="sld"><i class="tk"><b class="fl"></b></i><i class="th"></i></div>',
      css: join([
        '.sld{position:relative;width:var(--w,190px);height:26px}',
        '.sld .tk{position:absolute;left:0;right:0;top:50%;height:var(--tk,6px);transform:translateY(-50%);border-radius:99px;background:#1b1b28;box-shadow:inset 0 1px 3px rgba(0,0,0,.7)}',
        '.sld .fl{position:absolute;inset:0;border-radius:99px;background:linear-gradient(90deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform-origin:0 50%;animation:sld-' + v.i + ' var(--dur,' + D(v, 2) + 's) cubic-bezier(.55,0,.45,1) infinite}',
        '.sld .th{position:absolute;top:50%;left:0;width:var(--tb,18px);height:var(--tb,18px);margin:calc(var(--tb,18px) / -2);border-radius:50%;background:#f2f2fa;box-shadow:0 2px 8px rgba(0,0,0,.6),0 0 0 4px color-mix(in srgb,var(--c2,' + v.c2 + ') 30%,transparent);animation:slth-' + v.i + ' var(--dur,' + D(v, 2) + 's) cubic-bezier(.55,0,.45,1) infinite}',
        kf('sld-' + v.i, '0%,100%{transform:scaleX(.04)}50%{transform:scaleX(1)}'),
        kf('slth-' + v.i, '0%,100%{left:4%}50%{left:100%}')
      ]),
      cfg: ctlCfg(v, [range('Width', '--w', 100, 320, 2, 190, 'px'), range('Track', '--tk', 3, 14, 1, 6, 'px'), range('Thumb', '--tb', 10, 30, 1, 18, 'px')])
    };
  } });

  /* 9. day night switch — the sun and moon trade shifts */
  CT.push({ key: 'daynight', title: 'Day Night Switch', tags: ['controls', 'css'], build: function (v) {
    return {
      html: '<div class="dsw"><i class="kn"><b class="sun"></b><b class="moo"></b></i></div>',
      css: join([
        '.dsw{position:relative;width:var(--w,86px);height:calc(var(--w,86px) * .5);border-radius:99px;overflow:hidden;background:linear-gradient(90deg,var(--c2,' + v.c2 + '),#87ceeb);animation:dsw-' + v.i + ' var(--dur,' + D(v, 3) + 's) ease-in-out infinite}',
        '.dsw .kn{position:absolute;top:8%;left:5%;width:36%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 36% 32%,#fff8,#ffe9a8 60%,#ffd479);animation:dsk-' + v.i + ' var(--dur,' + D(v, 3) + 's) cubic-bezier(.6,0,.4,1) infinite;box-shadow:0 0 14px rgba(255,220,130,.8)}',
        '.dsw .sun,.dsw .moo{position:absolute;inset:22%;border-radius:50%}',
        '.dsw .sun{background:radial-gradient(circle,#fff3 0 40%,#ffb347 70%);animation:dss-' + v.i + ' var(--dur,' + D(v, 3) + 's) linear infinite}',
        '.dsw .moo{background:radial-gradient(circle at 68% 30%,transparent 42%,#e8ecff 46%);opacity:0;animation:dsm-' + v.i + ' var(--dur,' + D(v, 3) + 's) linear infinite}',
        kf('dsw-' + v.i, '0%,40%{background:linear-gradient(90deg,var(--c2,' + v.c2 + '),#87ceeb)}60%,100%{background:linear-gradient(90deg,#101228,#1c1f3e)}'),
        kf('dsk-' + v.i, '0%,40%{transform:translateX(0) rotate(0)}60%,100%{transform:translateX(calc(var(--w,86px) * .48)) rotate(.5turn);background:radial-gradient(circle at 36% 32%,#fff,#dfe6ff 60%,#aab4e8);box-shadow:0 0 10px rgba(200,210,255,.6)}'),
        kf('dss-' + v.i, '0%,40%{opacity:1}60%,100%{opacity:0}'),
        kf('dsm-' + v.i, '0%,40%{opacity:0}60%,100%{opacity:1}')
      ]),
      cfg: ctlCfg(v, [range('Width', '--w', 60, 140, 2, 86, 'px')])
    };
  } });

  /* 10. notch dial — a clicky selector stepping through presets */
  CT.push({ key: 'notch', title: 'Notch Dial', tags: ['controls', 'css'], build: function (v) {
    return {
      html: '<div class="ndl"><i class="pt"></i><b></b></div>',
      css: join([
        '.ndl{position:relative;width:var(--sz,96px);height:var(--sz,96px);border-radius:50%;background:radial-gradient(circle at 42% 34%,#1c1c2a,#0e0e16);box-shadow:0 8px 20px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.1)}',
        '.ndl::before{content:"";position:absolute;inset:4%;border-radius:50%;background:repeating-conic-gradient(color-mix(in srgb,var(--c3,' + v.c3 + ') 8' + '0%,transparent) 0 2.6deg,transparent 2.6deg 36deg);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 8px),#000 0);mask:radial-gradient(farthest-side,transparent calc(100% - 8px),#000 0)}',
        '.ndl .pt{position:absolute;inset:0;animation:ndl-' + v.i + ' var(--dur,' + D(v, 2) + 's) steps(5,end) infinite}',
        '.ndl .pt::before{content:"";position:absolute;left:calc(50% - 2px);top:12%;width:4px;height:26%;border-radius:99px;background:var(--c2,' + v.c2 + ');box-shadow:0 0 8px var(--c2,' + v.c2 + ')}',
        '.ndl b{position:absolute;inset:36%;border-radius:50%;background:linear-gradient(145deg,#22222f,#131320)}',
        kf('ndl-' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: ctlCfg(v, [range('Size', '--sz', 54, 160, 2, 96, 'px')])
    };
  } });

  /* 11. vu meter — led bars dancing to a silent beat */
  CT.push({ key: 'vu', title: 'VU Meter', tags: ['controls', 'css'], build: function (v) {
    return {
      html: '<div class="vu">' + cells(6) + '</div>',
      css: join([
        '.vu{display:flex;align-items:flex-end;gap:5px;height:var(--hh,74px);padding:10px 12px;border-radius:12px;background:#0d0d15;box-shadow:inset 0 0 0 1px rgba(255,255,255,.07)}',
        '.vu i{width:var(--bw,12px);height:100%;border-radius:3px;background:linear-gradient(180deg,var(--c3,' + v.c3 + ') 0 22%,var(--c2,' + v.c2 + ') 22% 55%,var(--c1,' + v.c1 + ') 55%);transform-origin:50% 100%;animation:vu-' + v.i + ' var(--dur,' + v.dur + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -1.7)}',
        '.vu i:nth-child(2n){animation-duration:calc(var(--dur,' + v.dur + 's) * .74)}',
        '.vu i:nth-child(3n){animation-duration:calc(var(--dur,' + v.dur + 's) * 1.3)}',
        kf('vu-' + v.i, '0%,100%{transform:scaleY(.18)}30%{transform:scaleY(.92)}55%{transform:scaleY(.45)}75%{transform:scaleY(.7)}')
      ]),
      cfg: ctlCfg(v, [range('Height', '--hh', 40, 140, 2, 74, 'px'), range('Bar', '--bw', 5, 24, 1, 12, 'px')])
    };
  } });

  /* 12. thermometer fill — the mercury keeps rising and falling */
  CT.push({ key: 'thermo', title: 'Thermometer Fill', tags: ['controls', 'css'], build: function (v) {
    return {
      html: '<div class="thm"><i class="mc"></i><b class="blb"></b></div>',
      css: join([
        '.thm{position:relative;width:30px;height:var(--hh,96px)}',
        '.thm .mc{position:absolute;left:50%;bottom:11px;width:var(--tb,10px);height:calc(100% - 22px);transform:translateX(-50%);border-radius:99px;background:#14141f;box-shadow:inset 0 0 0 2px rgba(255,255,255,.1);overflow:hidden}',
        '.thm .mc::before{content:"";position:absolute;left:0;right:0;bottom:0;height:100%;border-radius:99px;background:linear-gradient(180deg,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + '));transform-origin:50% 100%;animation:thm-' + v.i + ' var(--dur,' + D(v, 2) + 's) cubic-bezier(.5,0,.5,1) infinite}',
        '.thm .blb{position:absolute;left:50%;bottom:0;width:22px;height:22px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle at 36% 30%,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + ') 70%);box-shadow:0 0 var(--glow,10px) color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent)}',
        kf('thm-' + v.i, '0%,100%{transform:scaleY(var(--low,.18))}55%{transform:scaleY(1)}')
      ]),
      cfg: ctlCfg(v, [range('Height', '--hh', 60, 160, 2, 96, 'px'), range('Tube', '--tb', 6, 18, 1, 10, 'px'), range('Low', '--low', .05, .6, .01, .18, ''), range('Glow', '--glow', 0, 30, 1, 10, 'px')])
    };
  } });

  /* 13. toggle ripple — every flip rings a soft bell */
  CT.push({ key: 'toggle', title: 'Toggle Ripple', tags: ['controls', 'css'], build: function (v) {
    return {
      html: '<div class="tg2"><i class="kn"></i></div>',
      css: join([
        '.tg2{position:relative;width:var(--w,78px);height:calc(var(--w,78px) * .52);border-radius:99px;background:#14141f;box-shadow:inset 0 0 0 2px rgba(255,255,255,.1);animation:tgb-' + v.i + ' var(--dur,' + D(v, 2) + 's) ease-in-out infinite}',
        '.tg2 .kn{position:absolute;top:10%;left:7%;width:34%;aspect-ratio:1;border-radius:50%;background:linear-gradient(145deg,#fff,#c8cbe0);box-shadow:0 3px 8px rgba(0,0,0,.5);animation:tgk-' + v.i + ' var(--dur,' + D(v, 2) + 's) cubic-bezier(.5,0,.3,1.3) infinite}',
        '.tg2 .kn::before{content:"";position:absolute;inset:-9px;border-radius:50%;border:2px solid var(--c2,' + v.c2 + ');opacity:0;animation:tgr-' + v.i + ' var(--dur,' + D(v, 2) + 's) linear infinite}',
        kf('tgb-' + v.i, '0%,38%{background:#14141f}52%,100%{background:color-mix(in srgb,var(--c1,' + v.c1 + ') 65%,#14141f)}'),
        kf('tgk-' + v.i, '0%,38%{transform:translateX(0)}52%,100%{transform:translateX(calc(var(--w,78px) * .5))}'),
        kf('tgr-' + v.i, '0%,46%{opacity:0;transform:scale(.6)}50%{opacity:.9}62%,100%{opacity:0;transform:scale(1.5)}')
      ]),
      cfg: ctlCfg(v, [range('Width', '--w', 50, 120, 2, 78, 'px')])
    };
  } });

  /* 14. tab glide — the ink keeps sliding to the next tab */
  CT.push({ key: 'tabs', title: 'Tab Glide', tags: ['controls', 'css'], build: function (v) {
    return {
      html: '<div class="tbs"><i class="ink"></i><b>Feed</b><b>Live</b><b>Shop</b><b>You</b></div>',
      css: join([
        '.tbs{position:relative;display:flex;gap:2px;border-bottom:2px solid rgba(255,255,255,.1)}',
        '.tbs b{padding:10px 13px;font:600 11.5px/1 "Plus Jakarta Sans",system-ui,sans-serif;color:#9a9ab0}',
        '.tbs .ink{position:absolute;left:0;bottom:-2px;height:3px;width:calc(var(--w,224px) / 4);border-radius:3px 3px 0 0;background:linear-gradient(90deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));animation:tbk-' + v.i + ' var(--dur,' + D(v, 3) + 's) cubic-bezier(.7,0,.3,1) infinite;box-shadow:0 0 12px color-mix(in srgb,var(--c1,' + v.c1 + ') 65%,transparent)}',
        kf('tbk-' + v.i, '0%,19%{transform:translateX(0)}25%,44%{transform:translateX(100%)}50%,69%{transform:translateX(200%)}75%,94%{transform:translateX(300%)}100%{transform:translateX(0)}')
      ]),
      cfg: ctlCfg(v, [range('Width', '--w', 140, 360, 2, 224, 'px')])
    };
  } });

  /* 15. combo wheels — three digit wheels spinning out of sync */
  CT.push({ key: 'wheels', title: 'Combo Wheels', tags: ['controls', 'css'], build: function (v) {
    var strip = '<u>0</u><u>1</u><u>2</u><u>3</u><u>4</u><u>5</u><u>6</u><u>7</u><u>8</u><u>9</u><u>0</u>';
    return {
      html: '<div class="cbw"><i><span>' + strip + '</span></i><i><span>' + strip + '</span></i><i><span>' + strip + '</span></i></div>',
      css: join([
        '.cbw{display:flex;gap:7px;padding:10px;border-radius:14px;background:#0d0d15;box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}',
        '.cbw i{position:relative;width:var(--w,34px);height:calc(var(--w,34px) * 1.3);overflow:hidden;border-radius:8px;background:linear-gradient(180deg,#000b,#0000 30%,#0000 70%,#000b),#171722}',
        '.cbw i::after{content:"";position:absolute;left:0;right:0;top:50%;height:1.3em;margin-top:-.65em;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c3,' + v.c3 + ') 45%,transparent);border-radius:5px}',
        '.cbw span{display:flex;flex-direction:column;animation:cbw-' + v.i + ' var(--dur,' + D(v, 2) + 's) steps(10,end) infinite}',
        '.cbw i:nth-child(2) span{animation-duration:calc(var(--dur,' + D(v, 2) + 's) * 1.6)}',
        '.cbw i:nth-child(3) span{animation-duration:calc(var(--dur,' + D(v, 2) + 's) * 2.4)}',
        '.cbw u{display:grid;place-items:center;height:1.3em;font:700 calc(var(--w,34px) * .56)/1.3em "JetBrains Mono",monospace;color:var(--c2,' + v.c2 + ');text-decoration:none}',
        kf('cbw-' + v.i, 'to{transform:translateY(calc(1.3em * -10))}')
      ]),
      cfg: ctlCfg(v, [range('Wheel', '--w', 22, 54, 1, 34, 'px')])
    };
  } });

  /* 16. scrub ring — the playhead loops its own record */
  CT.push({ key: 'scrub', title: 'Scrub Ring', tags: ['controls', 'svg'], build: function (v) {
    return {
      html: '<svg class="scr" viewBox="0 0 120 120"><circle class="tk" cx="60" cy="60" r="42"/><circle class="fl" cx="60" cy="60" r="42"/><circle class="hd" cx="60" cy="18" r="5"/></svg>',
      css: join([
        '.scr{width:var(--sz,110px);height:auto;overflow:visible}',
        '.scr .tk{fill:none;stroke:#1d1d2a;stroke-width:var(--tk,8px);stroke-linecap:round}',
        '.scr .fl{fill:none;stroke:var(--c2,' + v.c2 + ');stroke-width:var(--tk,8px);stroke-linecap:round;stroke-dasharray:264;stroke-dashoffset:264;transform:rotate(-90deg);transform-origin:50% 50%;animation:scf-' + v.i + ' var(--dur,' + D(v, 2) + 's) cubic-bezier(.55,0,.45,1) infinite;filter:drop-shadow(0 0 6px var(--c2,' + v.c2 + '))}',
        '.scr .hd{fill:var(--c3,' + v.c3 + ');transform-origin:60px 60px;animation:schh-' + v.i + ' var(--dur,' + D(v, 2) + 's) cubic-bezier(.55,0,.45,1) infinite}',
        kf('scf-' + v.i, '0%,100%{stroke-dashoffset:264}50%{stroke-dashoffset:13}'),
        kf('schh-' + v.i, '0%,100%{transform:rotate(-90deg)}50%{transform:rotate(252deg)}')
      ]),
      cfg: ctlCfg(v, [range('Size', '--sz', 60, 190, 2, 110, 'px'), range('Track', '--tk', 4, 16, 1, 8, 'px')])
    };
  } });

  K.add('controls', V.matrix('controls', CT, 20, 'w4ct'));
})(window);
