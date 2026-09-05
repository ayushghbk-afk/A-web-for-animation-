/* ============================================================
   Motion Lab — mega collection (the second 200-per-category wave)
   ----------------------------------------------------------
   The original generators fill the first family-set. This
   file adds a second wave of distinct mechanics so every category
   reaches 200. The standouts are the BIG ones — full-stage 3D
   scenes, wide UI compositions and cinematic backgrounds, all
   tagged `big` so the gallery can filter them.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit;
  var join = K.join, cells = K.cells, cellsText = K.cellsText, kf = K.keyframes;
  var range = K.range, col = K.color, sel = K.selectCtl;
  var C1 = '#7c5cff', C2 = '#22d3ee', C3 = '#ff5c8a', C4 = '#ffd479', C5 = '#34d399';

  /* shared scaffold for the big CTA / button stage */
  var kb = function () {
    return join([
      '.mb{display:grid;place-items:center;width:100%;perspective:800px}',
      '.mb .b{position:relative;border:0;cursor:pointer;padding:calc(var(--pad,20px) * var(--padscale,1)) calc(var(--padx,42px) * var(--padscale,1));font:700 var(--fs,22px) system-ui,sans-serif;color:#fff;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));border-radius:var(--rad,99px);letter-spacing:.02em;transition:transform .25s cubic-bezier(.3,.7,.3,1.4)}',
      '.mb .b:hover{transform:translateY(-3px)}'
    ]);
  };

  /* ══════════════════════════════ BUTTONS (104) ══════════════════════════════ */
  (function () {
    var pool = [];
    var btnBase = kb();

    /* ---- 1. big CTA platforms (10) ---- */
    [
      ['orbit', 'Orbit CTA Platform', 1,
        '.b::before,.b::after{content:"";position:absolute;inset:calc(var(--ringin,-14px));border-radius:inherit;border:2px dashed color-mix(in srgb,var(--c2,' + C2 + ') 80%,transparent);animation:mb-orbit var(--dur,7s) linear infinite}',
        '.b::after{inset:calc(var(--ringin,-26px));border-style:dotted;border-color:color-mix(in srgb,var(--c1,' + C1 + ') 70%,transparent);animation-direction:reverse;animation-duration:calc(var(--dur,7s) * 1.4)}',
        kf('mb-orbit', 'to{transform:rotate(1turn)}')],
      ['beam', 'Beam Sweep CTA', 1,
        '.b{overflow:hidden}',
        '.b::before{content:"";position:absolute;top:0;bottom:0;left:-60%;width:45%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.5),transparent);transform:skewX(-18deg);animation:mb-beam var(--dur,2.8s) ease-in-out infinite}',
        kf('mb-beam', '0%{left:-60%}55%,100%{left:120%}')],
      ['pulse', 'Pulse Halo CTA', 1,
        '.b::before,.b::after{content:"";position:absolute;inset:0;border-radius:inherit;border:2px solid var(--c1,' + C1 + ');animation:mb-pulse var(--dur,2.2s) ease-out infinite}',
        '.b::after{animation-delay:calc(var(--dur,2.2s) / -2)}',
        kf('mb-pulse', '0%{transform:scale(1);opacity:.8}100%{transform:scale(1.35);opacity:0}')],
      ['corners', 'Corner Bracket CTA', 0,
        '.b::before,.b::after{content:"";position:absolute;width:calc(var(--cl,16px));height:calc(var(--cl,16px));border:3px solid var(--c4,' + C4 + ');animation:mb-corners var(--dur,3s) ease-in-out infinite}',
        '.b::before{top:-8px;left:-8px;border-right:0;border-bottom:0;border-top-left-radius:8px}',
        '.b::after{bottom:-8px;right:-8px;border-left:0;border-top:0;border-bottom-right-radius:8px;animation-delay:calc(var(--dur,3s) / -2)}',
        kf('mb-corners', '0%,100%{transform:scale(.6);opacity:.35}50%{transform:scale(1.15);opacity:1}')],
      ['ring', 'Conic Ring CTA', 1,
        '.b::before{content:"";position:absolute;inset:-10px;border-radius:inherit;background:conic-gradient(from 0deg,transparent 10%,var(--c2,' + C2 + ') 30%,transparent 50%,var(--c3,' + C3 + ') 70%,transparent 90%);animation:mb-spin var(--dur,3s) linear infinite;z-index:-1;filter:blur(6px)}',
        kf('mb-spin', 'to{transform:rotate(1turn)}')],
      ['sweep', 'Border Sweep CTA', 0,
        '.b{background:linear-gradient(#141422,#141422) padding-box,linear-gradient(90deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '),var(--c3,' + C3 + '),var(--c1,' + C1 + ')) border-box;border:3px solid transparent;background-size:100% 100%,300% 100%;animation:mb-borders var(--dur,4s) linear infinite}',
        kf('mb-borders', 'to{background-position:0 0,300% 0}')],
      ['glow', 'Breathing Glow CTA', 0,
        '.b{box-shadow:0 0 var(--glow,26px) color-mix(in srgb,var(--c1,' + C1 + ') 70%,transparent);animation:mb-glow var(--dur,2.6s) ease-in-out infinite}',
        kf('mb-glow', '0%,100%{box-shadow:0 0 12px color-mix(in srgb,var(--c1,' + C1 + ') 40%,transparent);filter:brightness(1)}50%{box-shadow:0 0 var(--glow,26px) color-mix(in srgb,var(--c2,' + C2 + ') 80%,transparent);filter:brightness(1.15)}')],
      ['wave', 'Wave Underscore CTA', 0,
        '.b{border-radius:14px}',
        '.b::after{content:"";position:absolute;left:12%;right:12%;bottom:-12px;height:6px;border-radius:99px;background:repeating-linear-gradient(90deg,var(--c4,' + C4 + ') 0 14px,transparent 14px 24px);animation:mb-wave var(--dur,1.2s) linear infinite}',
        kf('mb-wave', 'to{background-position:24px 0}')],
      ['spark', 'Sparkle CTA', 0,
        '.b{border-radius:16px}',
        '.b::before,.b::after{content:"";position:absolute;width:12px;height:12px;background:var(--c4,' + C4 + ');clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%);animation:mb-spark var(--dur,1.8s) ease-in-out infinite}',
        '.b::before{top:-6px;right:14%}',
        '.b::after{bottom:-6px;left:16%;animation-delay:calc(var(--dur,1.8s) / -2);background:var(--c2,' + C2 + ')}',
        kf('mb-spark', '0%,100%{transform:scale(.2) rotate(0);opacity:.2}50%{transform:scale(1.25) rotate(120deg);opacity:1}')],
      ['dots', 'Dot March CTA', 0,
        '.b{border-radius:16px}',
        '.b::before{content:"";position:absolute;inset:-8px;border-radius:inherit;background:radial-gradient(circle, var(--c2,' + C2 + ') 0 3px, transparent 4px) 0 0/18px 18px,radial-gradient(circle, var(--c3,' + C3 + ') 0 3px, transparent 4px) 9px 9px/18px 18px;animation:mb-dots var(--dur,1s) linear infinite}',
        kf('mb-dots', 'to{background-position:18px 0, 27px 9px}')]
    ].forEach(function (v) {
      pool.push({
        family: 'mbcta', id: 'mbcta-' + v[0], title: v[1],
        tags: ['css', 'cta', 'big'].filter(function (t, i, a) { return a.indexOf(t) === i && (v[2] ? true : t !== 'big'); }),
        html: '<div class="mb"><button class="b"><span>' + (v[2] ? 'Liftoff' : 'Take off') + '</span></button></div>',
        css: join([btnBase].concat(v.slice(3))),
        cfg: [range('Font size', '--fs', 14, 34, 1, 22, 'px'), range('Cycle', '--dur', .6, 6, .1, 2.4, 's'),
          range('Corner', '--rad', 0, 99, 1, 99, 'px'), range('Halo', '--glow', 4, 60, 1, 26, 'px'),
          col('Colour', '--c1', C1), col('Colour B', '--c2', C2), col('Accent', '--c4', C4)]
      });
    });

    /* ---- 2. 3D press plates (8) ---- */
    [
      ['depth', 'Deep Press Plate', 0,
        '.b{border-radius:16px;box-shadow:0 7px 0 color-mix(in srgb,var(--c1,' + C1 + ') 55%,#000),0 14px 24px rgba(0,0,0,.45);transition:transform .08s,box-shadow .08s}',
        '.b:hover{transform:translateY(3px);box-shadow:0 4px 0 color-mix(in srgb,var(--c1,' + C1 + ') 55%,#000),0 8px 14px rgba(0,0,0,.4)}',
        '.b:active{transform:translateY(7px);box-shadow:0 0 0 color-mix(in srgb,var(--c1,' + C1 + ') 55%,#000),0 2px 6px rgba(0,0,0,.4)}'],
      ['neon3d', 'Neon Press Plate', 0,
        '.b{border-radius:16px;box-shadow:0 6px 0 #1b1440,0 0 var(--glow,22px) var(--c1,' + C1 + '),inset 0 0 14px rgba(255,255,255,.14);transition:transform .08s,box-shadow .08s}',
        '.b:hover{transform:translateY(2px)}',
        '.b:active{transform:translateY(6px);box-shadow:0 0 0 #1b1440,0 0 8px var(--c1,' + C1 + '),inset 0 0 14px rgba(255,255,255,.1)}'],
      ['jelly', 'Jelly Squish Button', 0,
        '.b{border-radius:22px;animation:mb-jelly var(--dur,3s) ease-in-out infinite}',
        kf('mb-jelly', '0%,100%{transform:scale(1,1)}25%{transform:scale(1.06,.92)}50%{transform:scale(.95,1.06)}75%{transform:scale(1.03,.97)}')],
      ['chrome', 'Chrome Bevel Button', 0,
        '.b{border-radius:14px;background:linear-gradient(180deg,#fdfdff 0%,#c9cbe8 34%,#8f92c9 50%,#d9dbf5 52%,#9fa3d8 100%);color:#23244d;background-size:100% var(--shimmer,260%);animation:mb-chrome var(--dur,4s) ease-in-out infinite}',
        kf('mb-chrome', '0%,100%{background-position:0 0}50%{background-position:0 100%}')],
      ['stripe', 'Racing Stripe Plate', 0,
        '.b{border-radius:14px;background:linear-gradient(90deg,var(--c1,' + C1 + ') 0 78%,var(--c2,' + C2 + ') 78% 84%,var(--c3,' + C3 + ') 84% 100%);background-size:var(--stripe,300%) 100%;animation:mb-stripe var(--dur,3s) linear infinite;box-shadow:0 5px 0 rgba(0,0,0,.35)}',
        kf('mb-stripe', 'to{background-position:-300% 0}')],
      ['magnet', 'Magnetic Plate (drag)', 0,
        '',
        '',
        '',
        'var b=root.querySelector(".mb .b"),stage=root.querySelector(".mb");\n' +
        'var go=function(e){var r=b.getBoundingClientRect();var x=(e.clientX-(r.left+r.width/2))*.24,y=(e.clientY-(r.top+r.height/2))*.24;b.style.transform="translate("+x.toFixed(1)+"px,"+(y-2).toFixed(1)+"px)";};\n' +
        'var off=function(){b.style.transform="";};\n' +
        'stage.addEventListener("pointermove",go);stage.addEventListener("pointerleave",off);\n' +
        'api.onCleanup(function(){stage.removeEventListener("pointermove",go);stage.removeEventListener("pointerleave",off);});'
      ],
      ['split', 'Split Hinge Button', 0,
        '.b{display:flex;background:transparent;color:#fff;overflow:visible}',
        '.b span{position:relative;padding:calc(var(--pad,20px)) calc(var(--padx,42px));background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));transition:transform .35s cubic-bezier(.3,1.4,.4,1)}',
        '.b span::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,var(--c3,' + C3 + '),var(--c4,' + C4 + '));transition:opacity .35s;opacity:0}.b:hover span{transform:scaleY(1.06)}.b:hover span::before{opacity:.55}'],
      ['stairs', 'Staircase Shadow Button', 0,
        '.b{border-radius:14px;box-shadow:4px 4px 0 color-mix(in srgb,var(--c2,' + C2 + ') 80%,#000),8px 8px 0 color-mix(in srgb,var(--c3,' + C3 + ') 60%,#000),12px 12px 0 color-mix(in srgb,var(--c4,' + C4 + ') 45%,#000);transition:box-shadow .2s,transform .2s}',
        '.b:hover{transform:translate(3px,3px);box-shadow:1px 1px 0 color-mix(in srgb,var(--c2,' + C2 + ') 80%,#000)}']
    ].forEach(function (v) {
      pool.push({
        family: 'mb3d', id: 'mb3d-' + v[0], title: v[1],
        tags: ['css', '3d', 'press'],
        html: '<div class="mb"><button class="b"><span>' + (v[0] === 'split' ? 'Open' : 'Press me') + '</span></button></div>',
        css: join([btnBase, v[3], v[4] || '', v[5] || '']),
        js: v[6] || undefined,
        cfg: [range('Font size', '--fs', 14, 34, 1, 22, 'px'), range('Cycle', '--dur', .6, 6, .1, 3, 's'),
          range('Halo', '--glow', 4, 60, 1, 22, 'px'), range('Stripe', '--stripe', 150, 500, 10, 300, '%'),
          col('Colour', '--c1', C1), col('Colour B', '--c2', C2), col('Accent', '--c3', C3)]
      });
    });

    /* ---- 3. gate / door reveals (8) ---- */
    [
      ['doors', 'Double Door Gate', 0,
        '.b{overflow:hidden;background:#191927}',
        '.b span{position:relative;z-index:1;mix-blend-mode:difference;transition:color .3s}',
        '.b::before,.b::after{content:"";position:absolute;inset:0;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));transition:transform .55s cubic-bezier(.7,0,.2,1)}',
        '.b::before{transform-origin:left}',
        '.b::after{transform-origin:right;background:linear-gradient(315deg,var(--c3,' + C3 + '),var(--c2,' + C2 + '))}',
        '.b:hover::before{transform:scaleX(0)}',
        '.b:hover::after{transform:scaleX(0)}'],
      ['curtain', 'Curtain Pull', 0,
        '.b{overflow:hidden;background:#191927}',
        '.b::before,.b::after{content:"";position:absolute;top:0;bottom:0;width:51%;background:repeating-linear-gradient(90deg,var(--c1,' + C1 + ') 0 12px,color-mix(in srgb,var(--c1,' + C1 + ') 60%,#000) 12px 24px);transition:transform .6s cubic-bezier(.8,0,.2,1)}',
        '.b::before{left:0}',
        '.b::after{right:0;background:repeating-linear-gradient(90deg,var(--c2,' + C2 + ') 0 12px,color-mix(in srgb,var(--c2,' + C2 + ') 60%,#000) 12px 24px)}',
        '.b:hover::before{transform:translateX(-100%)}',
        '.b:hover::after{transform:translateX(100%)}'],
      ['shutter', 'Roller Shutter', 0,
        '.b{overflow:hidden;background:#14141f}',
        '.b::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(180deg,var(--c1,' + C1 + ') 0 10px,#0f0f1a 10px 16px);transition:transform .5s steps(12,end)}',
        '.b:hover::before{transform:translateY(-100%)}'],
      ['iris', 'Iris Aperture', 0,
        '.b{overflow:hidden;background:#101018;clip-path:circle(46% at 50% 50%);transition:clip-path .5s ease-in-out}',
        '.b::before{content:"";position:absolute;inset:0;background:conic-gradient(var(--c1,' + C1 + '),var(--c2,' + C2 + '),var(--c3,' + C3 + '),var(--c1,' + C1 + '));animation:mb-spin var(--dur,4s) linear infinite}',
        '.b:hover{clip-path:circle(75% at 50% 50%)}',
        kf('mb-spin', 'to{transform:rotate(1turn) scale(1.3)}')],
      ['vault', 'Vault Turn Button', 0,
        '.b{border-radius:50%;aspect-ratio:1;animation:mb-vault var(--dur,6s) linear infinite}',
        '.b span{display:inline-block;animation:mb-vault var(--dur,6s) linear infinite reverse}',
        kf('mb-vault', 'to{transform:rotate(1turn)}')],
      ['hatch', 'Hatch Lift', 0,
        '.b{overflow:visible}',
        '.b::before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(160deg,var(--c1,' + C1 + '),color-mix(in srgb,var(--c1,' + C1 + ') 40%,#000));transform-origin:top;transition:transform .5s cubic-bezier(.6,0,.3,1.4);z-index:-1}',
        '.b:hover::before{transform:perspective(400px) rotateX(-38deg)}'],
      ['blinds', 'Blinds Reveal', 0,
        '.b{overflow:hidden;background:#171722}',
        '.b span{position:relative;z-index:1}',
        '.b::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(180deg,transparent 0 8px,var(--c1,' + C1 + ') 8px 18px);animation:mb-blinds var(--dur,3.4s) ease-in-out infinite alternate}',
        kf('mb-blinds', 'to{background-position:0 -26px;opacity:.4}')],
      ['gate', 'Swing Gate', 0,
        '.b{overflow:hidden;background:#141420}',
        '.b::before{content:"";position:absolute;inset:0;background:linear-gradient(100deg,var(--c3,' + C3 + '),var(--c1,' + C1 + '));transform:translateX(-102%);transition:transform .55s cubic-bezier(.7,0,.2,1)}',
        '.b:hover::before{transform:translateX(0)}']
    ].forEach(function (v) {
      pool.push({
        family: 'mbdoor', id: 'mbdoor-' + v[0], title: v[1],
        tags: ['css', 'hover', 'gate'],
        html: '<div class="mb"><button class="b"><span>' + (v[0] === 'vault' ? 'Open' : 'Reveal') + '</span></button></div>',
        css: join([btnBase].concat(v.slice(3).filter(Boolean))),
        cfg: [range('Font size', '--fs', 14, 30, 1, 22, 'px'), range('Cycle', '--dur', 1, 8, .1, 5, 's'),
          col('Colour', '--c1', C1), col('Colour B', '--c2', C2), col('Accent', '--c3', C3)]
      });
    });

    /* ---- 4. magnetic clusters (6, JS) ---- */
    [
      ['mags', 'Satellite Magnet', 7, 'mags'],
      ['magr', 'Ring Magnet', 9, 'magr'],
      ['magl', 'Line Pull', 8, 'magl'],
      ['magg', 'Grid Magnet', 10, 'magg'],
      ['mago', 'Orbit Capture', 8, 'mago'],
      ['magsw', 'Swarm Magnet', 12, 'magsw']
    ].forEach(function (v, vi) {
      var n = v[2];
      pool.push({
        family: 'mbmag', id: 'mbmag-' + v[0], title: v[1].replace(' Magnet', '') + ' Magnet Cluster',
        tags: ['js', 'magnetic', 'pointer'],
        html: '<div class="mb"><button class="b"><span>Pull</span></button>' + cells(n, 'i') + '</div>',
        css: join([
          btnBase,
          '.mb .b{border-radius:16px}',
          '.mb i{position:absolute;left:50%;top:50%;width:10px;height:10px;margin:-5px;border-radius:' + (vi % 2 ? '3px' : '50%') + ';background:var(--c' + (2 + (vi % 3)) + ',' + [C2, C3, C4][vi % 3] + ')}'
        ]),
        js: 'var stage=root.querySelector(".mb"),b=root.querySelector(".b"),K=Array.prototype.slice.call(root.querySelectorAll("i")),t=' + vi + ';\n' +
          'function go(e){var r=stage.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;\n' +
          '  for(var i=0;i<K.length;i++){var a=t+i*6.283/K.length,rr=' + (58 + vi * 8) + '+Math.sin(t*2+i)*8,dx=e.clientX-cx,dy=e.clientY-cy,p=Math.min(1,Math.hypot(dx,dy)/rr);\n' +
          '    var x=Math.cos(a)*rr*(1-p*.8)+dx*p*.7,y=Math.sin(a)*rr*(1-p*.8)+dy*p*.7;\n' +
          '    K[i].style.transform="translate("+x.toFixed(1)+"px,"+y.toFixed(1)+"px) scale("+(1-p*.4).toFixed(2)+")";}b.style.transform="translate("+(e.clientX-cx)*.08+"px,"+(e.clientY-cy)*.08+"px)";}\n' +
          'function rest(){for(var i=0;i<K.length;i++){var a=t+i*6.283/K.length,rr=' + (58 + vi * 8) + ';\n' +
          '  K[i].style.transform="translate("+(Math.cos(a)*rr).toFixed(1)+"px,"+(Math.sin(a)*rr).toFixed(1)+"px)";}b.style.transform="";}\n' +
          'stage.addEventListener("pointermove",go);stage.addEventListener("pointerleave",rest);\n' +
          'api.raf(function(){t+=.03;rest();});api.onCleanup(function(){stage.removeEventListener("pointermove",go);stage.removeEventListener("pointerleave",rest);});',
        cfg: [col('Colour', '--c2', C2), col('Colour B', '--c3', C3), col('Accent', '--c4', C4)]
      });
    });

    /* ---- 5. split-flap boards (6) ---- */
    var flapWords = [['DEP', 'Departure'], ['ARR', 'Arrival'], ['NOW', 'On time'], ['GO', 'Ready'], ['LAB', 'Motion Lab'], ['HI', 'Hello']];
    flapWords.forEach(function (w, wi) {
      var cols = w[0].length, rows = 2;
      pool.push({
        family: 'mbflap', id: 'mbflap-' + wi, title: w[1] + ' Flap Board',
        tags: ['css', 'flip', 'board', 'big'],
        html: '<div class="mb"><div class="fl">' + (function () { var s = '', row0 = w[0], row1 = (w[1].replace(/ /g, '') + w[0]).slice(0, cols); for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) s += '<b style="--i:' + (r * cols + c) + '">' + (r ? row1[c] : row0[c]) + '</b>'; return s; })() + '</div></div>',
        css: join([
          '.mb{display:grid;place-items:center}',
          '.fl{display:grid;grid-template-columns:repeat(' + cols + ',var(--cw,58px));grid-auto-rows:var(--ch,42px);gap:6px;perspective:700px}',
          '.fl b{position:relative;background:#171725;border-radius:8px;box-shadow:inset 0 -14px 18px rgba(0,0,0,.5);display:grid;place-items:center;overflow:hidden;color:var(--c4,' + C4 + ');font:800 calc(var(--ch,42px) * .48) \"JetBrains Mono\",monospace;animation:mb-flap var(--dur,2.6s) ease-in-out infinite;animation-delay:calc(var(--i) * -.13s)}',
          '.fl b::before{content:"" ;position:absolute;left:0;right:0;top:0;bottom:50%;background:linear-gradient(180deg,#23233a,#151522);border-radius:8px 8px 0 0;transform-origin:bottom;animation:mb-flapc var(--dur,2.6s) ease-in-out infinite;animation-delay:calc(var(--i) * -.13s)}',
          '.fl b::after{content:"";position:absolute;left:8%;right:8%;top:50%;height:2px;background:rgba(0,0,0,.55)}',
          kf('mb-flap', '0%,100%{transform:rotateX(0)}45%,55%{transform:rotateX(-6deg)}'),
          kf('mb-flapc', '0%,44%{transform:rotateX(0)}50%,94%{transform:rotateX(-180deg)}100%{transform:rotateX(-360deg)}')
        ]),
        cfg: [range('Cell', '--cw', 34, 90, 2, 58, 'px'), range('Height', '--ch', 26, 70, 2, 42, 'px'),
          range('Cycle', '--dur', 1, 6, .1, 2.6, 's'), col('Ink', '--c4', C4)]
      });
    });

    /* ---- 6. neon signboards (8) ---- */
    [
      ['OPEN', 'Open Signboard'], ['LAB', 'Lab Signboard'], ['NEO', 'Neo Signboard'],
      ['24H', '24H Signboard'], ['BAR', 'Bar Signboard'], ['CAF', 'Cafe Signboard'],
      ['OK', 'OK Signboard'], ['RUN', 'Run Signboard']
    ].forEach(function (v, vi) {
      pool.push({
        family: 'mbneon', id: 'mbneon-' + vi, title: v[1],
        tags: ['css', 'neon', 'signboard', 'big'],
        html: '<div class="mb"><div class="ns"><i></i><span>' + v[0] + '</span></div></div>',
        css: join([
          '.mb{display:grid;place-items:center}',
          '.ns{position:relative;padding:var(--pad,18px) var(--padx,34px);border:3px solid var(--c3,' + C3 + ');border-radius:18px;color:var(--c3,' + C3 + ');font:800 var(--fs,40px) system-ui,sans-serif;letter-spacing:.18em;background:rgba(10,10,18,.65);box-shadow:0 0 var(--glow,24px) color-mix(in srgb,var(--c3,' + C3 + ') 55%,transparent),inset 0 0 var(--glow,24px) color-mix(in srgb,var(--c3,' + C3 + ') 35%,transparent);animation:mb-neon' + vi + ' var(--dur,3.2s) steps(1,end) infinite}',
          '.ns i{position:absolute;top:6px;right:8px;width:9px;height:9px;border-radius:50%;background:var(--c2,' + C2 + ');box-shadow:0 0 10px var(--c2,' + C2 + ');animation:mb-neondot var(--dur,3.2s) steps(1,end) infinite}',
          kf('mb-neon' + vi, '0%,7%,9%,13%,52%,56%,100%{opacity:1;filter:brightness(1.15)}8%,11%,54%{opacity:.42;filter:brightness(.7)}'),
          kf('mb-neondot', '0%,49%{opacity:1}50%,100%{opacity:.2}')
        ]),
        cfg: [range('Font size', '--fs', 20, 64, 1, 40, 'px'), range('Cycle', '--dur', 1, 6, .1, 3.2, 's'),
          range('Halo', '--glow', 4, 60, 1, 24, 'px'), col('Tube', '--c3', C3), col('Dot', '--c2', C2)]
      });
    });

    /* ---- 7. power switch CTAs (8) ---- */
    [
      ['ring', 'Power Ring Toggle', 1,
        '.b{border-radius:50%;aspect-ratio:1;background:#151522;color:var(--c5,' + C5 + ');box-shadow:inset 0 0 0 3px color-mix(in srgb,var(--c5,' + C5 + ') 60%,transparent);transition:box-shadow .3s,background .3s}',
        '.b::before{content:"";position:absolute;left:50%;top:16%;width:4px;height:34%;margin-left:-2px;border-radius:4px;background:currentColor;box-shadow:0 0 12px currentColor}',
        '.b:hover{box-shadow:inset 0 0 0 3px var(--c5,' + C5 + '),0 0 22px color-mix(in srgb,var(--c5,' + C5 + ') 60%,transparent)}'],
      ['switch', 'Big Switch Flip', 0,
        '.b{border-radius:14px;background:#1a1a28;color:#8b8ba3;display:flex;align-items:center;justify-content:center;gap:12px;min-width:150px;transition:color .3s}',
        '.b::after{content:"";width:58%;height:58%;border-radius:12px;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));transform:scale(.55);transition:transform .35s cubic-bezier(.5,1.6,.4,1)}',
        '.b:hover{color:#fff}',
        '.b:hover::after{transform:scale(.92)}'],
      ['lever', 'Lever CTA', 0,
        '.b{border-radius:14px;background:linear-gradient(180deg,#20202f,#14141f);display:flex;gap:14px;align-items:center;min-width:150px}',
        '.b::before{content:"";width:44px;height:22px;border-radius:99px;background:#0c0c14;box-shadow:inset 0 2px 6px rgba(0,0,0,.8);position:relative}',
        '.b::after{content:"";position:absolute;width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 34% 30%,#fff,#b9bce0 60%,#7e82b3);left:calc(50% - 22px + 12px);top:50%;margin-top:-13px;transition:left .3s cubic-bezier(.5,1.5,.4,1),transform .3s}',
        '.b:hover::after{left:calc(50% - 22px - 26px);transform:scale(1.08)}'],
      ['key', 'Key Turn CTA', 0,
        '.b{border-radius:50%;aspect-ratio:1;background:#151522;transition:transform .4s cubic-bezier(.5,1.5,.4,1)}',
        '.b::before{content:"";position:absolute;inset:30%;border-radius:50%;background:conic-gradient(var(--c2,' + C2 + ') 0 25%,#1a1a28 0 50%,var(--c2,' + C2 + ') 0 75%,#1a1a28 0);transition:transform .4s cubic-bezier(.5,1.5,.4,1)}',
        '.b:hover{transform:rotate(-20deg)}',
        '.b:hover::before{transform:rotate(90deg)}'],
      ['boot', 'Boot Sequence CTA', 0,
        '.b{border-radius:14px;background:#0c1310;overflow:hidden}',
        '.b::after{content:"";position:absolute;inset:auto 0 0 0;height:5px;background:repeating-linear-gradient(90deg,var(--c5,' + C5 + ') 0 12px,transparent 12px 22px);animation:mb-boot var(--dur,1.4s) linear infinite}',
        kf('mb-boot', 'to{background-position:22px 0}')],
      ['fuse', 'Fuse Pull CTA', 0,
        '.b{border-radius:14px;background:#1c1a16;min-width:170px}',
        '.b::after{content:"";position:absolute;right:14px;top:50%;width:18px;height:34px;margin-top:-17px;border-radius:6px;background:linear-gradient(180deg,var(--c4,' + C4 + '),#8a6a1f);transition:transform .35s cubic-bezier(.5,1.8,.4,1)}',
        '.b:hover::after{transform:translateY(-14px) rotate(-12deg)}'],
      ['gate2', 'Deadman Gate', 0,
        '.b{border-radius:14px;background:linear-gradient(180deg,#231522,#160d16);box-shadow:0 6px 0 #0b0710;transition:transform .08s,box-shadow .08s}',
        '.b:hover{transform:translateY(3px);box-shadow:0 3px 0 #0b0710}',
        '.b:active{transform:translateY(6px);box-shadow:0 0 0 #0b0710}'],
      ['toggle', 'Neon Toggle Bar', 0,
        '.b{border-radius:99px;background:#14141f;min-width:160px;display:flex;justify-content:center}',
        '.b span{position:relative;z-index:1;mix-blend-mode:difference}',
        '.b::after{content:"";position:absolute;inset:5px;border-radius:99px;background:linear-gradient(90deg,var(--c1,' + C1 + '),var(--c3,' + C3 + '));transform:translateX(-6%);transition:transform .4s cubic-bezier(.6,0,.3,1.3)}',
        '.b:hover::after{transform:translateX(6%)}']
    ].forEach(function (v) {
      pool.push({
        family: 'mbpower', id: 'mbpower-' + v[0], title: v[1],
        tags: ['css', 'switch', 'power'],
        html: '<div class="mb"><button class="b"><span>' + (v[0] === 'ring' ? '' : 'Power') + '</span></button></div>',
        css: join([btnBase].concat(v.slice(3))),
        cfg: [range('Cycle', '--dur', .5, 4, .1, 1.6, 's'), col('Colour', '--c1', C1), col('Colour B', '--c2', C2),
          col('Accent', '--c3', C3), col('Green', '--c5', C5), col('Amber', '--c4', C4)]
      });
    });

    /* ---- 8. echo ripple buttons (8) ---- */
    var echoSpecs = [
      ['Soft Echo', 1.4, 'solid', 3], ['Halo Echo', 1.85, 'solid', 4],
      ['Dash Echo', 1.55, 'dashed', 3], ['Glow Echo', 1.7, 'solid', 5],
      ['Offset Echo', 1.35, 'solid', 3], ['Hard Pulse Echo', 2.1, 'solid', 3],
      ['Inset Echo', 1.25, 'double', 3], ['Triple Halo Echo', 1.95, 'dotted', 4]
    ];
    echoSpecs.forEach(function (spec, vi) {
      var c = [[C1, C2], [C2, C3], [C3, C4], [C4, C5], [C5, C1], [C1, C3], [C2, C4], [C3, C5]][vi];
      pool.push({
        family: 'mbecho', id: 'mbecho-' + vi, title: spec[0],
        tags: ['css', 'ripple', 'hover'],
        html: '<div class="mb"><button class="b"><span>' + spec[0].split(' ')[0] + '</span></button>' + cells(spec[3], 'i') + '</div>',
        css: join([
          btnBase,
          '.mb .b{border-radius:16px}',
          '.mb i{position:absolute;inset:' + (-4 - vi) + 'px;border-radius:' + (12 + vi) + 'px;border:2px ' + spec[2] + ' ' + c[0] + ';opacity:0;pointer-events:none;box-shadow:' + (vi === 3 ? '0 0 14px ' + c[0] : 'none') + '}',
          '.mb:hover i{animation:mb-echo' + vi + ' var(--dur,1.2s) ease-out infinite}',
          '.mb i:nth-child(3){border-color:' + c[1] + ';animation-delay:calc(var(--dur,1.2s) / -3)}',
          '.mb i:nth-child(4){animation-delay:calc(var(--dur,1.2s) / -2)}',
          kf('mb-echo' + vi, '0%{transform:scale(1);opacity:.7}100%{transform:scale(' + spec[1] + ');opacity:0}')
        ]),
        cfg: [range('Cycle', '--dur', .5, 3, .1, 1.2, 's'), col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
      });
    });

    /* ---- 9. holo plates (8) ---- */
    [
      ['holoA', 'Holographic Foil A', '120deg,#ff9de2,#9db4ff,#9affe3,#ffd29d,#ff9de2'],
      ['holoB', 'Holographic Foil B', '180deg,#a6c1ff,#ffd7a1,#ffa1e0,#a6c1ff'],
      ['holoC', 'Chrome Holo Plate', '45deg,#e8e8ff,#9aa2ff,#fff5d6,#7c5cff,#e8e8ff'],
      ['holoD', 'Oil Slick Plate', '200deg,#5cf2c7,#4f8bff,#b04fff,#ff4f9e,#5cf2c7'],
      ['holoE', 'Pearl Plate', '160deg,#fff2f8,#dfe6ff,#f6ffe0,#fff2f8'],
      ['holoF', 'Aurora Plate', '90deg,#61e0ff,#7c5cff,#ff5c8a,#61e0ff'],
      ['holoG', 'Rainbow Sheen', '100deg,#ff5c5c,#ffd45c,#5cff8f,#5cc4ff,#c05cff,#ff5c5c'],
      ['holoH', 'Violet Mesh', '140deg,#8b5cf6,#22d3ee,#f472b6,#8b5cf6']
    ].forEach(function (v) {
      pool.push({
        family: 'mbholo', id: 'mbholo-' + v[0], title: v[1],
        tags: ['css', 'holographic', 'sheen'],
        html: '<div class="mb"><button class="b"><span>Holo</span></button></div>',
        css: join([
          btnBase,
          '.mb .b{border-radius:16px;background:linear-gradient(' + v[2] + ');background-size:var(--sh,260%) 100%;color:#10101c;animation:mb-holo var(--dur,5s) ease-in-out infinite}',
          kf('mb-holo', '0%,100%{background-position:0% 50%}50%{background-position:100% 50%}')
        ]),
        cfg: [range('Cycle', '--dur', 1, 9, .1, 5, 's'), range('Sheen', '--sh', 120, 400, 5, 260, '%')]
      });
    });

    /* ---- 10. count flyout buttons (6, JS) ---- */
    [
      ['fly', 'Fly-Out Counter'], ['stack', 'Stacking Counter'], ['burst', 'Burst Counter'],
      ['orb', 'Orbit Counter'], ['rain', 'Rain Counter'], ['spiral', 'Spiral Counter']
    ].forEach(function (v, vi) {
      pool.push({
        family: 'mbcount', id: 'mbcount-' + v[0], title: v[1],
        tags: ['js', 'counter', 'click'],
        html: '<div class="mb"><button class="b"><span>Add</span><em>0</em></button></div>',
        css: join([
          btnBase,
          '.mb .b{border-radius:16px;display:flex;gap:12px;align-items:center}',
          '.mb em{position:relative;font:800 var(--fs,22px) "JetBrains Mono",monospace;background:rgba(0,0,0,.28);padding:2px 12px;border-radius:99px;font-style:normal}',
          '.mb em i{position:absolute;left:50%;top:0;font-style:normal;color:var(--c4,' + C4 + ');animation:mb-fly var(--dur,.9s) ease-out forwards;pointer-events:none}',
          kf('mb-fly', '0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translate(var(--fx,0px),-38px)}')
        ]),
        js: [
          'var b=root.querySelector(".b"),em=b.querySelector("em"),n=0;\nb.addEventListener("click",function(){n++;em.textContent=n;var i=document.createElement("i");i.textContent="+1";em.appendChild(i);setTimeout(function(){i.remove()},950);});',
          'var b=root.querySelector(".b"),em=b.querySelector("em"),n=0;\nb.addEventListener("click",function(){n++;em.textContent=n;var i=document.createElement("i");i.textContent="+"+n;i.style.transform="translateY(-6px) scale(1.15)";em.appendChild(i);setTimeout(function(){i.remove()},950);});',
          'var b=root.querySelector(".b"),em=b.querySelector("em"),n=0;\nb.addEventListener("click",function(){n++;em.textContent=n;for(var k=0;k<5;k++){(function(k){var i=document.createElement("i");i.textContent="+1";i.style.setProperty("--fx",((k-2)*18)+"px");em.appendChild(i);setTimeout(function(){i.remove()},950);})(k);}});',
          'var b=root.querySelector(".b"),em=b.querySelector("em"),n=0;\nb.addEventListener("click",function(){n++;em.textContent=n;var i=document.createElement("i");i.textContent="+1";i.style.animation="mb-fly var(--dur,.9s) ease-out forwards";i.style.transform="rotate("+((n%8)*45)+"deg) translateY(-28px)";em.appendChild(i);setTimeout(function(){i.remove()},950);});',
          'var b=root.querySelector(".b"),em=b.querySelector("em"),n=0;\nb.addEventListener("click",function(){n++;em.textContent=n;var i=document.createElement("i");i.textContent="+1";i.style.setProperty("--fx",(Math.random()*70-35).toFixed(0)+"px");i.style.filter="blur(0.4px)";em.appendChild(i);setTimeout(function(){i.remove()},950);});',
          'var b=root.querySelector(".b"),em=b.querySelector("em"),n=0;\nb.addEventListener("click",function(){n++;em.textContent=n;var i=document.createElement("i");i.textContent="+"+n;i.style.setProperty("--fx",(Math.sin(n)*36).toFixed(0)+"px");em.appendChild(i);setTimeout(function(){i.remove()},950);});'
        ][vi],
        cfg: [range('Font size', '--fs', 14, 32, 1, 22, 'px'), range('Cycle', '--dur', .4, 2, .1, .9, 's'), col('Accent', '--c4', C4), col('Colour', '--c1', C1)]
      });
    });

    /* ---- 11. crossing beams (6) ---- */
    [
      ['b1', 'X-Beam Cross'], ['b2', 'X-Beam Slash'], ['b3', 'X-Beam Lattice'],
      ['b4', 'X-Beam Shear'], ['b5', 'X-Beam Scissor'], ['b6', 'X-Beam Grid']
    ].forEach(function (v, vi) {
      pool.push({
        family: 'mbbeam', id: 'mbbeam-' + v[0], title: v[1],
        tags: ['css', 'beam', 'hover'],
        html: '<div class="mb"><button class="b"><span>Beam</span></button></div>',
        css: join([
          btnBase,
          '.mb .b{border-radius:16px;overflow:hidden}',
          '.mb .b::before,.mb .b::after{content:"";position:absolute;width:140%;height:2px;top:50%;left:-20%;background:linear-gradient(90deg,transparent,var(--c2,' + C2 + '),transparent);opacity:0}',
          '.mb .b::before{transform:rotate(' + (-18 + vi * 3) + 'deg)}',
          '.mb .b::after{transform:rotate(' + (18 - vi * 3) + 'deg);background:linear-gradient(90deg,transparent,var(--c3,' + C3 + '),transparent)}',
          '.mb .b:hover::before{opacity:1;animation:mb-bmsweep var(--dur,1.1s) linear infinite}',
          '.mb .b:hover::after{opacity:1;animation:mb-bmsweep var(--dur,1.1s) linear infinite reverse}',
          kf('mb-bmsweep', '0%{left:-20%}100%{left:40%}')
        ]),
        cfg: [range('Cycle', '--dur', .4, 3, .1, 1.1, 's'), col('Colour', '--c2', C2), col('Colour B', '--c3', C3)]
      });
    });
    kf('mb-bmsweep', '0%{left:-20%}100%{left:100%}');

    /* ---- 12. stamp slams (6) ---- */
    [
      ['stampA', 'Approved Stamp'], ['stampB', 'Shipped Stamp'], ['stampC', 'Paid Stamp'],
      ['stampD', 'Done Stamp'], ['stampE', 'Yes Stamp'], ['stampF', 'Go Stamp']
    ].forEach(function (v, vi) {
      pool.push({
        family: 'mbstamp', id: 'mbstamp-' + v[0], title: v[1],
        tags: ['css', 'stamp', 'press'],
        html: '<div class="mb"><button class="b"><span>' + ['APPROVED', 'SHIPPED', 'PAID', 'DONE', 'YES', 'GO'][vi] + '</span></button></div>',
        css: join([
          btnBase,
          '.mb .b{border-radius:14px;border:3px solid var(--c3,' + C3 + ');background:transparent;color:var(--c3,' + C3 + ');letter-spacing:.22em;transform:rotate(-3deg);transition:transform .12s,background .2s,color .2s}',
          '.mb .b:hover{transform:rotate(-3deg) scale(1.04)}',
          '.mb .b:active{transform:rotate(-3deg) scale(.92);background:var(--c3,' + C3 + ');color:#fff;box-shadow:0 0 0 6px color-mix(in srgb,var(--c3,' + C3 + ') 25%,transparent)}'
        ]),
        cfg: [range('Font size', '--fs', 12, 30, 1, 22, 'px'), col('Ink', '--c3', C3)]
      });
    });

    /* ---- 13. orbit gate (6) ---- */
    [
      ['og1', 'Orbit Gate Tight'], ['og2', 'Orbit Gate Wide'], ['og3', 'Orbit Gate Fast'],
      ['og4', 'Orbit Gate Slow'], ['og5', 'Orbit Gate Amber'], ['og6', 'Orbit Gate Cyan']
    ].forEach(function (v, vi) {
      pool.push({
        family: 'mbgate', id: 'mbgate-' + v[0], title: v[1],
        tags: ['css', 'orbit', 'cta'],
        html: '<div class="mb"><button class="b"><span>Enter</span></button>' + cells(6, 'i') + '</div>',
        css: join([
          btnBase,
          '.mb .b{border-radius:16px}',
          '.mb i{position:absolute;left:50%;top:50%;width:9px;height:9px;margin:-4.5px;border-radius:50%;background:var(--c' + (2 + vi % 3) + ',' + [C2, C3, C4][vi % 3] + ');animation:mb-ogat var(--dur,2.6s) linear infinite;animation-delay:calc(var(--i) * calc(var(--dur,2.6s) / -6))}',
          kf('mb-ogat', '0%{transform:rotate(0) translateX(' + (92 + vi * 10) + 'px) scale(.5);opacity:.2}30%{opacity:1;transform:rotate(120deg) translateX(' + (92 + vi * 10) + 'px) scale(1)}100%{transform:rotate(360deg) translateX(' + (92 + vi * 10) + 'px) scale(.5);opacity:.2}')
        ]),
        cfg: [range('Cycle', '--dur', .8, 6, .1, 2.6, 's'), col('Colour', '--c2', C2), col('Colour B', '--c3', C3), col('Accent', '--c4', C4)]
      });
    });

    /* ---- 14. JS liquid fill (4) ---- */
    [
      ['liq1', 'Hold-to-Fill Horizontal'], ['liq2', 'Hold-to-Fill Vertical'], ['liq3', 'Hold-to-Fill Left'], ['liq4', 'Hold-to-Fill Down']
    ].forEach(function (v, vi) {
      pool.push({
        family: 'mbfill', id: 'mbfill-' + v[0], title: v[1],
        tags: ['js', 'hold', 'fill'],
        html: '<div class="mb"><button class="b"><i></i><span>Hold</span></button></div>',
        css: join([
          btnBase,
          '.mb .b{border-radius:16px;overflow:hidden;background:#181826;color:#a9abc8}',
          '.mb .b i{position:absolute;inset:0;background:linear-gradient(' + (vi % 2 ? '180deg' : '90deg') + ',var(--c1,' + C1 + '),var(--c2,' + C2 + '));transform-origin:' + (vi % 2 ? 'top' : 'left') + ';transform:' + (vi % 2 ? 'scaleY(0)' : 'scaleX(0)') + ';transition:transform .12s}',
          '.mb .b span{position:relative;z-index:1;mix-blend-mode:difference;color:#fff}'
        ]),
        js: 'var b=root.querySelector(".b"),i=b.querySelector("i"),sp=b.querySelector("span"),p=0,tick,dir=' + JSON.stringify(vi % 2 ? 'scaleY' : 'scaleX') + ';\n' +
          'function setp(){i.style.transform=dir+"("+p/100+")";}\n' +
          'function up(){tick=setInterval(function(){p=Math.min(100,p+3.4);setp();if(p>=100){clearInterval(tick);sp.textContent="Done";setTimeout(function(){sp.textContent="Hold";p=0;setp();},1600);}},45);}\n' +
          'function down(){clearInterval(tick);p=0;setp();sp.textContent="Hold";}\n' +
          'b.addEventListener("pointerdown",up);window.addEventListener("pointerup",down);\n' +
          'api.onCleanup(function(){window.removeEventListener("pointerup",down);clearInterval(tick);});',
        cfg: [col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
      });
    });

    /* ---- 15. gradient border wave (6) ---- */
    [
      ['gw1', 'Conic Border Wave'], ['gw2', 'Cyan Border Wave'], ['gw3', 'Rose Border Wave'],
      ['gw4', 'Amber Border Wave'], ['gw5', 'Mint Border Wave'], ['gw6', 'Violet Border Wave']
    ].forEach(function (v, vi) {
      pool.push({
        family: 'mbwave2', id: 'mbwave2-' + v[0], title: v[1],
        tags: ['css', 'gradient', 'border'],
        html: '<div class="mb"><button class="b"><span>Wave</span></button></div>',
        css: join([
          btnBase,
          '.mb .b{border-radius:16px;background:#131320 padding-box,conic-gradient(from ' + vi * 30 + 'deg,' + [C1, C2, C3, C4, C5, C1][vi] + ',' + [C2, C3, C4, C5, C1, C2][vi] + ',' + [C3, C4, C5, C1, C2, C3][vi] + ',' + [C1, C2, C3, C4, C5, C1][vi] + ') border-box;border:3px solid transparent;animation:mb-gw' + vi + ' var(--dur,4s) linear infinite}',
          kf('mb-gw' + vi, '0%{filter:hue-rotate(0deg) saturate(1)}50%{filter:hue-rotate(' + (180 + vi * 20) + 'deg) saturate(1.3)}100%{filter:hue-rotate(360deg) saturate(1)}')
        ]),
        cfg: [range('Cycle', '--dur', 1, 9, .1, 4, 's'), range('Font size', '--fs', 14, 30, 1, 22, 'px')]
      });
    });

    K.add('buttons', pool);
  })();

  /* ══════════════════════════════ TEXT FX (94) ══════════════════════════════ */
  (function () {
    var pool = [];

    /* ---- 1. kinetic word walls (8) ---- */
    var wallSets = [
      ['ANIMATE · MOTION · FLUID ·', 'KINETIC · TYPE · WAVE ·', 'GLIDE · DRIFT · SWING ·'],
      ['SHINE · GLOW · PULSE ·', 'SPARK · BLOOM · FLARE ·', 'NEON · TUBE · WIRE ·'],
      ['DEEP · SPACE · ORBIT ·', 'PLANET · RING · NOVA ·', 'COMET · DUST · LIGHT ·'],
      ['TYPE · GRID · MASK ·', 'REVEAL · STAGGER · POP ·', 'SLIDE · FILL · INK ·'],
      ['PRESS · PLATE · SLAB ·', 'CLICK · HOLD · DROP ·', 'PUSH · PULL · SPIN ·'],
      ['LINE · CURVE · PATH ·', 'STROKE · DASH · RING ·', 'ARC · WEB · NODE ·'],
      ['FIELD · CLOUD · MIST ·', 'RAIN · SNOW · STORM ·', 'EMBER · DUST · SMOKE ·'],
      ['CUBE · GRID · PRISM ·', 'TOWER · HELIX · SPHERE ·', 'TORUS · PYRAMID ·']
    ];
    wallSets.forEach(function (rows, wi) {
      pool.push({
        family: 'ktwall', id: 'ktwall-' + wi, title: ['Motion Kinetic Wall', 'Shine Kinetic Wall', 'Space Kinetic Wall', 'Type Kinetic Wall', 'Press Kinetic Wall', 'Path Kinetic Wall', 'Field Kinetic Wall', 'Cube Kinetic Wall'][wi],
        tags: ['css', 'marquee', 'wall', 'big'],
        html: '<div class="mb tw">' + rows.map(function (r, ri) { return '<div class="row' + (ri % 2 ? ' rev' : '') + '"><span>' + r + r + '</span></div>'; }).join('') + '</div>',
        css: join([
          '.mb{width:100%;display:grid;gap:10px;overflow:hidden;padding:8px 0}',
          '.tw .row{white-space:nowrap;overflow:hidden}',
          '.tw .row span{display:inline-block;font:800 var(--fs,30px) system-ui,sans-serif;letter-spacing:.14em;color:var(--c1,' + C1 + ');animation:mb-twm var(--dur,9s) linear infinite;opacity:var(--op,.9)}',
          '.tw .row.rev span{animation-direction:reverse;color:var(--c2,' + C2 + ')}',
          '.tw .row:nth-child(2) span{font-size:calc(var(--fs,30px) * 1.25);-webkit-text-stroke:1px var(--c1,' + C1 + ');color:transparent}',
          kf('mb-twm', 'to{transform:translateX(-50%)}')
        ]),
        cfg: [range('Font size', '--fs', 16, 48, 1, 30, 'px'), range('Cycle', '--dur', 3, 24, .5, 9, 's'),
          range('Opacity', '--op', 20, 100, 1, 90, '%'), col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
      });
    });

    /* ---- 2. mask split reveals (8) ---- */
    var revealWords = [['MOTION'], ['LAB'], ['ANIMATE'], ['FLUID'], ['KINETIC'], ['DEEP'], ['BOLD'], ['SOFT']];
    revealWords.forEach(function (w, wi) {
      var style = [
        '.r i{display:inline-block;overflow:hidden;vertical-align:top}.r i b{display:inline-block;transform:translateY(110%);animation:mb-rv' + wi + ' var(--dur,1.4s) cubic-bezier(.3,.9,.2,1) infinite;animation-delay:calc(var(--i) * var(--st,.07s))}',
        '.r i{display:inline-block;overflow:hidden;vertical-align:top}.r i b{display:inline-block;transform:translateY(-110%);animation:mb-rv' + wi + ' var(--dur,1.4s) cubic-bezier(.3,.9,.2,1) infinite;animation-delay:calc(var(--i) * var(--st,.07s))}',
        '.r i{display:inline-block;animation:mb-rv' + wi + ' var(--dur,1s) cubic-bezier(.3,.9,.2,1) both;animation-delay:calc(var(--i) * var(--st,.09s));transform-origin:bottom}',
        '.r i{display:inline-block;overflow:hidden;vertical-align:top}.r i b{display:inline-block;transform:scaleY(0);transform-origin:bottom;animation:mb-rv' + wi + ' var(--dur,1s) ease-out infinite;animation-delay:calc(var(--i) * var(--st,.06s))}',
        '.r i{display:inline-block;animation:mb-rv' + wi + ' var(--dur,1.2s) cubic-bezier(.6,0,.2,1.4) both;animation-delay:calc(var(--i) * var(--st,.08s))}',
        '.r i{display:inline-block;overflow:hidden;vertical-align:top}.r i b{display:inline-block;transform:translateX(110%);animation:mb-rv' + wi + ' var(--dur,1s) ease-out infinite;animation-delay:calc(var(--i) * var(--st,.05s))}',
        '.r i{display:inline-block;overflow:hidden;vertical-align:top}.r i b{display:inline-block;transform:translateX(-110%);animation:mb-rv' + wi + ' var(--dur,1s) ease-out infinite;animation-delay:calc(var(--i) * var(--st,.05s))}',
        '.r i{display:inline-block;animation:mb-rv' + wi + ' var(--dur,1.3s) ease-in-out both;animation-delay:calc(var(--i) * var(--st,.07s))}'
      ][wi];
      var frames = [
        '0%{transform:translateY(110%)}100%{transform:translateY(0)}',
        '0%{transform:translateY(-110%)}100%{transform:translateY(0)}',
        '0%{transform:rotateX(-90deg);opacity:0}60%{opacity:1}100%{transform:rotateX(0)}',
        '0%{transform:scaleY(0)}100%{transform:scaleY(1)}',
        '0%{transform:scale(.3) translateY(40%);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}',
        '0%{transform:translateX(110%)}100%{transform:translateX(0)}',
        '0%{transform:translateX(-110%)}100%{transform:translateX(0)}',
        '0%{transform:translateY(30%) rotate(8deg);opacity:0}60%{transform:translateY(-6%);opacity:1}100%{transform:none}'
      ][wi];
      pool.push({
        family: 'ktreveal', id: 'ktreveal-' + wi, title: w[0] + ' — ' + ['Rise Mask', 'Fall Mask', 'Flip Mask', 'Grow Mask', 'Pop Mask', 'Slide In', 'Slide Back', 'Tumble In'][wi],
        tags: ['css', 'reveal', 'letters'],
        html: '<div class="mb r" style="perspective:600px">' + (function () { var s = ''; for (var i = 0; i < w[0].length; i++) s += '<i><b style="--i:' + i + '">' + w[0][i] + '</b></i>'; return s; })() + '</div>',
        css: join([
          '.mb{display:grid;place-items:center}',
          '.r{font:800 var(--fs,52px) system-ui,sans-serif;color:var(--c1,' + C1 + ');letter-spacing:.06em}',
          style,
          kf('mb-rv' + wi, frames)
        ]),
        cfg: [range('Font size', '--fs', 24, 80, 2, 52, 'px'), range('Cycle', '--dur', .5, 3, .1, 1.4, 's'),
          range('Stagger', '--st', .02, .3, .01, .07, 's'), col('Colour', '--c1', C1)]
      });
    });

    /* ---- 3. neon mega (8) ---- */
    ['GLOW', 'NEON', 'ZAP', 'VOLT', 'PULSE', 'FLUX', 'ION', 'WAVE'].forEach(function (word, wi) {
      pool.push({
        family: 'ktneon', id: 'ktneon-' + wi, title: word + ' Neon Mega',
        tags: ['css', 'neon', 'big'],
        html: '<div class="mb nn"><span>' + word + '</span></div>',
        css: join([
          '.mb{display:grid;place-items:center}',
          '.nn span{font:800 var(--fs,64px) system-ui,sans-serif;letter-spacing:.2em;color:#fff;text-shadow:0 0 6px var(--c1,' + C1 + '),0 0 18px var(--c1,' + C1 + '),0 0 42px var(--c1,' + C1 + '),0 0 80px var(--c2,' + C2 + ');animation:mb-nn' + wi + ' var(--dur,2.4s) ' + ['ease-in-out', 'steps(1,end)', 'ease-in-out', 'ease-in-out', 'steps(2,end)', 'ease-in-out', 'ease-in-out', 'ease-in-out'][wi] + ' infinite}',
          kf('mb-nn' + wi, [
            '0%,100%{opacity:1}50%{opacity:.55}',
            '0%,4%,8%,42%,46%,100%{opacity:1}5%,7%,43%,45%{opacity:.3}',
            '0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.03);opacity:.8}',
            '0%,100%{text-shadow:0 0 6px var(--c1,' + C1 + '),0 0 18px var(--c1,' + C1 + '),0 0 42px var(--c1,' + C1 + '),0 0 80px var(--c2,' + C2 + ')}50%{text-shadow:0 0 14px var(--c1,' + C1 + '),0 0 34px var(--c1,' + C1 + '),0 0 70px var(--c1,' + C1 + '),0 0 110px var(--c2,' + C2 + ')}',
            '0%,49%{opacity:1}50%,100%{opacity:.72}',
            '0%,100%{opacity:1;letter-spacing:.2em}50%{opacity:.9;letter-spacing:.26em}',
            '0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}',
            '0%,100%{opacity:1;filter:saturate(1)}50%{opacity:.85;filter:saturate(1.5)}'
          ][wi])
        ]),
        cfg: [range('Font size', '--fs', 30, 110, 2, 64, 'px'), range('Cycle', '--dur', .5, 6, .1, 2.4, 's'),
          col('Tube', '--c1', C1), col('Outer', '--c2', C2)]
      });
    });

    /* ---- 4. CRT text (8) ---- */
    ['CRT', 'SIGNAL', 'PIXEL', 'BUFFER', 'SYSTEM', 'PIXEL8', 'GLITCH', 'RENDER'].forEach(function (word, wi) {
      pool.push({
        family: 'ktcrt', id: 'ktcrt-' + wi, title: word + ' CRT Text',
        tags: ['css', 'crt', 'retro', 'big'],
        html: '<div class="mb ct"><span>' + word + '</span></div>',
        css: join([
          '.mb{display:grid;place-items:center}',
          '.ct{position:relative;padding:10px 22px;border-radius:8px;background:rgba(8,14,10,.75);overflow:hidden}',
          '.ct span{font:700 var(--fs,44px) "JetBrains Mono",monospace;color:var(--c5,' + C5 + ');letter-spacing:.12em;animation:mb-ct' + wi + ' var(--dur,3s) linear infinite}',
          '.ct::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(180deg,rgba(0,0,0,.35) 0 2px,transparent 2px 5px);pointer-events:none}',
          '.ct span{text-shadow:0 0 12px color-mix(in srgb,var(--c5,' + C5 + ') 70%,transparent)}',
          kf('mb-ct' + wi, [
            '0%,100%{transform:translateY(0) skewX(0)}8%{transform:translateY(-3px) skewX(6deg)}16%,100%{transform:translateY(0) skewX(0)}',
            '0%{clip-path:inset(0 0 0 0)}30%{clip-path:inset(30% 0 40% 0)}34%{clip-path:inset(10% 0 20% 0)}40%,100%{clip-path:inset(0 0 0 0)}',
            '0%,100%{filter:blur(0)}50%{filter:blur(2px)}',
            '0%,100%{opacity:1}92%,96%{opacity:.2}94%{opacity:1}',
            '0%{transform:translateX(0)}45%{transform:translateX(0)}50%{transform:translateX(6px)}55%{transform:translateX(-4px)}60%,100%{transform:translateX(0)}',
            '0%,100%{color:var(--c5,' + C5 + ')}50%{color:var(--c2,' + C2 + ')}',
            '0%,100%{transform:scale(1)}50%{transform:scale(1.02,1.08)}',
            '0%,100%{filter:hue-rotate(0deg)}50%{filter:hue-rotate(60deg)}'
          ][wi])
        ]),
        cfg: [range('Font size', '--fs', 20, 72, 2, 44, 'px'), range('Cycle', '--dur', 1, 7, .1, 3, 's'),
          col('Phosphor', '--c5', C5), col('Alt', '--c2', C2)]
      });
    });

    /* ---- 5. terminal typing (6, JS) ---- */
    ['LOADING MOTION LAB…', 'RENDERING SCENE…', 'PARSING KEYFRAMES…', 'BUILDING GALLERY…', 'TUNING EFFECTS…', 'EXPORTING SNIPPET…'].forEach(function (line, wi) {
      pool.push({
        family: 'kttype', id: 'kttype-' + wi, title: ['Loading Terminal', 'Rendering Terminal', 'Parsing Terminal', 'Gallery Terminal', 'Tuning Terminal', 'Export Terminal'][wi],
        tags: ['js', 'terminal', 'typing'],
        html: '<div class="mb tt"><i></i><b></b></div>',
        css: join([
          '.mb{display:grid;place-items:center}',
          '.tt{font:600 var(--fs,24px) "JetBrains Mono",monospace;color:var(--c2,' + C2 + ');display:flex;gap:4px;min-height:1.4em}',
          '.tt i{width:.55em;height:1.1em;background:var(--c2,' + C2 + ');animation:mb-tt' + wi + ' 1s steps(1,end) infinite}',
          kf('mb-tt' + wi, '0%,100%{opacity:1}50%{opacity:0}')
        ]),
        js: 'var out=root.querySelector("b"),txt=' + JSON.stringify(line) + ',i=0,fr=' + (wi * 7) + ';\n' +
          'api.raf(function(){fr++;if(fr%12)return;i++;if(i>txt.length+14){i=0;out.textContent="";}else{out.textContent=txt.slice(0,Math.min(i,txt.length));}});',
        cfg: [range('Font size', '--fs', 12, 40, 1, 24, 'px'), col('Ink', '--c2', C2)]
      });
    });

    /* ---- 6. 3D letter cascades (8) ---- */
    ['CASC', 'TOWER', 'STACK', 'RIDGE', 'WEDGE', 'BLOOM', 'CHAIN', 'DRUM'].forEach(function (word, wi) {
      pool.push({
        family: 'ktcascade', id: 'ktcascade-' + wi, title: word + ' Cascade ' + (['3D', 'Flip', 'Roll', 'Spiral', 'Stomp', 'Bloom', 'Wave', 'Drum'][wi]),
        tags: ['css', '3d', 'letters', 'big'],
        html: '<div class="mb cc">' + (function () { var s = ''; for (var i = 0; i < word.length; i++) s += '<b style="--i:' + i + '">' + word[i] + '</b>'; return s; })() + '</div>',
        css: join([
          '.mb{display:grid;place-items:center;perspective:800px}',
          '.cc{display:flex;gap:4px;transform-style:preserve-3d}',
          '.cc b{font:800 var(--fs,54px) system-ui,sans-serif;color:var(--c1,' + C1 + ');animation:mb-cc' + wi + ' var(--dur,2.4s) cubic-bezier(.4,.1,.3,1) infinite;animation-delay:calc(var(--i) * var(--st,.12s));text-shadow:0 8px 22px color-mix(in srgb,var(--c1,' + C1 + ') 50%,transparent)}',
          kf('mb-cc' + wi, [
            '0%,100%{transform:translateY(0) rotateX(0)}30%{transform:translateY(-22px) rotateX(40deg)}60%{transform:translateY(4px) rotateX(-8deg)}',
            '0%,100%{transform:rotateY(0)}50%{transform:rotateY(180deg)}',
            '0%,100%{transform:rotateX(0)}50%{transform:rotateX(-360deg)}',
            '0%,100%{transform:rotateZ(0) translateY(0)}50%{transform:rotateZ(14deg) translateY(-12px)}',
            '0%,55%,100%{transform:translateY(0)}30%{transform:translateY(-26px)}42%{transform:translateY(0);scale:1 .8}50%{scale:1}',
            '0%,100%{transform:scale(1)}50%{transform:scale(1.25) translateY(-8px)}',
            '0%,100%{transform:translateX(0) rotateY(0)}25%{transform:translateX(6px) rotateY(20deg)}75%{transform:translateX(-6px) rotateY(-20deg)}',
            '0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}'
          ][wi])
        ]),
        cfg: [range('Font size', '--fs', 28, 90, 2, 54, 'px'), range('Cycle', '--dur', .8, 5, .1, 2.4, 's'),
          range('Stagger', '--st', .02, .4, .01, .12, 's'), col('Colour', '--c1', C1)]
      });
    });

    /* ---- 7. hue walls (6) ---- */
    ['HUE', 'TINT', 'TONE', 'MIX', 'BLEN', 'GLOW'].forEach(function (word, wi) {
      pool.push({
        family: 'ktrainbow', id: 'ktrainbow-' + wi, title: word + ' Hue Roll',
        tags: ['css', 'hue', 'colour'],
        html: '<div class="mb hw">' + (function () { var s = ''; for (var i = 0; i < word.length; i++) s += '<b style="--i:' + i + '">' + word[i] + '</b>'; return s; })() + '</div>',
        css: join([
          '.mb{display:grid;place-items:center}',
          '.hw{display:flex;gap:6px}',
          '.hw b{font:800 var(--fs,58px) system-ui,sans-serif;color:hsl(calc(var(--i) * ' + (200 / word.length) + ' + var(--h0,0deg)) ' + ['92%', '88%'][wi % 2] + ' ' + ['62%', '58%'][wi % 2] + ');animation:mb-hw' + wi + ' var(--dur,4s) linear infinite;animation-delay:calc(var(--i) * -.14s)}',
          kf('mb-hw' + wi, [
            '0%{transform:translateY(0)}25%{transform:translateY(-10px)}50%{transform:translateY(0)}75%{transform:translateY(6px)}100%{transform:translateY(0)}',
            '0%,100%{transform:scale(1)}50%{transform:scale(1.12)}',
            '0%{opacity:1}50%{opacity:.45}100%{opacity:1}',
            '0%,100%{transform:skewX(0)}50%{transform:skewX(-12deg)}',
            '0%,100%{transform:rotate(0)}50%{transform:rotate(8deg) scale(.94)}',
            '0%,100%{filter:brightness(1)}50%{filter:brightness(1.35)}'
          ][wi])
        ]),
        cfg: [range('Font size', '--fs', 30, 100, 2, 58, 'px'), range('Cycle', '--dur', 1, 8, .1, 4, 's'), range('Hue offset', '--h0', 0, 360, 5, 0, 'deg')]
      });
    });

    /* ---- 8. letterpress (6) ---- */
    ['PRESS', 'PLATE', 'INK', 'DEEP', 'EMBOSS', 'STAMP'].forEach(function (word, wi) {
      pool.push({
        family: 'ktpress', id: 'ktpress-' + wi, title: word + ' Letterpress',
        tags: ['css', 'letterpress'],
        html: '<div class="mb lp"><span>' + word + '</span></div>',
        css: join([
          '.mb{display:grid;place-items:center}',
          '.lp{background:var(--paper,#efe6d8);padding:16px 30px;border-radius:10px;box-shadow:0 14px 30px rgba(0,0,0,.35)}',
          '.lp span{font:800 var(--fs,48px) system-ui,sans-serif;letter-spacing:.1em;color:var(--ink,#2a2118);animation:mb-lp' + wi + ' var(--dur,2.2s) ease-in-out infinite}',
          kf('mb-lp' + wi, [
            '0%,100%{transform:scale(1);text-shadow:0 1px 0 rgba(255,255,255,.5)}50%{transform:scale(1.02);text-shadow:0 0 0 rgba(255,255,255,0)}',
            '0%,100%{opacity:1}50%{opacity:.75;transform:translateY(1px)}',
            '0%,100%{letter-spacing:.1em}50%{letter-spacing:.16em}',
            '0%,100%{transform:skewX(0)}50%{transform:skewX(-4deg)}',
            '0%,100%{filter:contrast(1)}50%{filter:contrast(1.3)}',
            '0%,100%{transform:rotate(0)}50%{transform:rotate(-2deg) scale(1.01)}'
          ][wi])
        ]),
        cfg: [range('Font size', '--fs', 24, 72, 2, 48, 'px'), range('Cycle', '--dur', .8, 5, .1, 2.2, 's'),
          col('Ink', '--ink', '#2a2118'), col('Paper', '--paper', '#efe6d8')]
      });
    });

    /* ---- 9. outline → fill (8) ---- */
    ['STROKE', 'FILL', 'EDGE', 'LINE', 'VOID', 'ETCH', 'GRID', 'GHOST'].forEach(function (word, wi) {
      pool.push({
        family: 'ktstroke', id: 'ktstroke-' + wi, title: word + ' Outline Fill',
        tags: ['css', 'stroke', 'fill'],
        html: '<div class="mb os"><span>' + word + '</span><span class="f">' + word + '</span></div>',
        css: join([
          '.mb{display:grid;place-items:center}',
          '.os{position:relative;font:800 var(--fs,56px) system-ui,sans-serif;letter-spacing:.08em}',
          '.os span{color:transparent;-webkit-text-stroke:2px var(--c1,' + C1 + ');animation:mb-os' + wi + ' var(--dur,3s) ease-in-out infinite}',
          '.os .f{position:absolute;left:0;top:0;color:var(--c1,' + C1 + ');-webkit-text-stroke:0;clip-path:inset(100% 0 0 0);animation:mb-osf' + wi + ' var(--dur,3s) ease-in-out infinite}',
          kf('mb-osf' + wi, [
            '0%,100%{clip-path:inset(100% 0 0 0)}50%{clip-path:inset(0 0 0 0)}',
            '0%,100%{clip-path:inset(0 100% 0 0)}50%{clip-path:inset(0 0 0 0)}',
            '0%,100%{clip-path:inset(0 0 100% 0)}50%{clip-path:inset(0 0 0 0)}',
            '0%{clip-path:inset(100% 0 0 0)}50%,100%{clip-path:inset(0 0 0 0)}',
            '0%,100%{clip-path:inset(50% 0 50% 0)}50%{clip-path:inset(0 0 0 0)}',
            '0%,100%{clip-path:inset(0 0 0 100%)}50%{clip-path:inset(0 0 0 0)}',
            '0%,100%{clip-path:circle(0 at 50% 50%)}50%{clip-path:circle(75% at 50% 50%)}',
            '0%,100%{clip-path:polygon(0 0,0 0,0 100%,0 100%)}50%{clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}'
          ][wi]),
          kf('mb-os' + wi, '0%,100%{opacity:.5}50%{opacity:1}')
        ]),
        cfg: [range('Font size', '--fs', 28, 84, 2, 56, 'px'), range('Cycle', '--dur', 1, 7, .1, 3, 's'), col('Ink', '--c1', C1)]
      });
    });

    /* ---- 10. flip clock letters (6, JS) ---- */
    ['01:24', '9:41', 'A+B', 'OK!', '128', '4:3:2'].forEach(function (word, wi) {
      pool.push({
        family: 'ktflap', id: 'ktflap-' + wi, title: word + ' Flip Clock',
        tags: ['js', 'flip', 'clock'],
        html: '<div class="mb fk">' + (function () { var s = ''; for (var i = 0; i < word.length; i++) s += '<b style="--i:' + i + '">' + word[i] + '</b>'; return s; })() + '</div>',
        css: join([
          '.mb{display:grid;place-items:center}',
          '.fk{display:flex;gap:5px;perspective:600px}',
          '.fk b{position:relative;width:var(--cw,46px);height:var(--ch,60px);border-radius:8px;background:#15151f;box-shadow:0 6px 14px rgba(0,0,0,.4);display:grid;place-items:center;font:800 var(--fs,34px) "JetBrains Mono",monospace;color:var(--c2,' + C2 + ');backface-visibility:hidden}',
          '.fk b::before{content:"";position:absolute;left:0;right:0;top:50%;height:2px;background:rgba(0,0,0,.55)}',
          '.fk b::after{content:"";position:absolute;inset:0 0 auto 0;height:50%;background:linear-gradient(180deg,rgba(255,255,255,.07),transparent);pointer-events:none}'
        ]),
        js: 'var K=Array.prototype.slice.call(root.querySelectorAll("b")),t=0,phase=' + (wi * .37) + ';\n' +
          'api.raf(function(){t+=.016;\n' +
          '  for(var i=0;i<K.length;i++){var ph=((t*1.1)+i*.23+phase)%1;var a=Math.abs(Math.cos(ph*Math.PI));\n' +
          '    K[i].style.transform="rotateX("+(-88*a).toFixed(1)+"deg)";\n' +
          '    K[i].style.opacity=(.5+.5*Math.abs(Math.sin(ph*Math.PI))).toFixed(2);\n' +
          '  }});',
        cfg: [range('Cell', '--cw', 26, 72, 2, 46, 'px'), range('Height', '--ch', 34, 90, 2, 60, 'px'),
          range('Cycle', '--dur', .6, 5, .1, 2, 's'), range('Font size', '--fs', 16, 52, 1, 34, 'px'), col('Ink', '--c2', C2)]
      });
    });

    /* ---- 11. banner wave (6) ---- */
    ['BAN', 'RIBBON', 'FLAG', 'BAND', 'STREAM', 'TAPES'].forEach(function (word, wi) {
      pool.push({
        family: 'ktbanner', id: 'ktbanner-' + wi, title: word + ' Banner Wave',
        tags: ['css', 'banner', 'flag'],
        html: '<div class="mb bn"><i></i><span>' + word + '</span></div>',
        css: join([
          '.mb{display:grid;place-items:center}',
          '.bn{position:relative;padding:10px 34px;background:var(--c1,' + C1 + ');color:#fff;font:800 var(--fs,40px) system-ui,sans-serif;letter-spacing:.2em;animation:mb-bn' + wi + ' var(--dur,3s) ease-in-out infinite}',
          '.bn i{position:absolute;top:0;bottom:0;left:0;right:0;background:repeating-linear-gradient(90deg,transparent 0 26px,rgba(0,0,0,.18) 26px 32px);animation:mb-bni var(--dur,3s) linear infinite}',
          [
            '0%,100%{transform:skewY(0)}50%{transform:skewY(-3deg)}',
            '0%,100%{border-radius:0 40px 0 40px}50%{border-radius:40px 0 40px 0}',
            '0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.12)}',
            '0%,100%{transform:rotate(0)}25%{transform:rotate(1.5deg)}75%{transform:rotate(-1.5deg)}',
            '0%,100%{box-shadow:0 10px 24px rgba(0,0,0,.3)}50%{box-shadow:0 18px 34px rgba(0,0,0,.45)}',
            '0%,100%{transform:translateX(0)}50%{transform:translateX(8px)}'
          ][wi],
          kf('mb-bn' + wi, [
            '0%,100%{transform:skewY(0)}50%{transform:skewY(-3deg)}',
            '0%,100%{border-radius:0 40px 0 40px}50%{border-radius:40px 0 40px 0}',
            '0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.12)}',
            '0%,100%{transform:rotate(0)}25%{transform:rotate(1.5deg)}75%{transform:rotate(-1.5deg)}',
            '0%,100%{box-shadow:0 10px 24px rgba(0,0,0,.3)}50%{box-shadow:0 18px 34px rgba(0,0,0,.45)}',
            '0%,100%{transform:translateX(0)}50%{transform:translateX(8px)}'
          ][wi]),
          kf('mb-bni', 'to{background-position:32px 0}')
        ]),
        cfg: [range('Font size', '--fs', 20, 64, 1, 40, 'px'), range('Cycle', '--dur', 1, 7, .1, 3, 's'), col('Cloth', '--c1', C1)]
      });
    });

    /* ---- 12. scanline reveal (6) ---- */
    ['SCAN', 'SWEEP', 'PULSE', 'RASTER', 'LIDAR', 'PING'].forEach(function (word, wi) {
      pool.push({
        family: 'ktscan', id: 'ktscan-' + wi, title: word + ' Scanline',
        tags: ['css', 'scan', 'reveal'],
        html: '<div class="mb sc"><span>' + word + '</span></div>',
        css: join([
          '.mb{display:grid;place-items:center}',
          '.sc{position:relative;padding:12px 26px;font:800 var(--fs,46px) system-ui,sans-serif;letter-spacing:.16em;color:var(--c2,' + C2 + ');clip-path:' + ['inset(0 0 100% 0)', 'inset(100% 0 0 0)', 'inset(0 100% 0 0)', 'inset(50% 0 50% 0)', 'inset(0 0 0 100%)', 'polygon(0 0,0 0,0 100%,0 100%)'][wi] + ';animation:mb-sc' + wi + ' var(--dur,2.8s) ' + ['ease-out', 'ease-out', 'ease-out', 'ease-in-out', 'ease-out', 'ease-in-out'][wi] + ' infinite}',
          '.sc::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(255,255,255,.35),transparent);height:3px;top:-8%;animation:mb-scl' + wi + ' var(--dur,2.8s) linear infinite}',
          kf('mb-sc' + wi, [
            '0%{clip-path:inset(0 0 100% 0)}55%,100%{clip-path:inset(0 0 0 0)}',
            '0%{clip-path:inset(100% 0 0 0)}55%,100%{clip-path:inset(0 0 0 0)}',
            '0%{clip-path:inset(0 100% 0 0)}55%,100%{clip-path:inset(0 0 0 0)}',
            '0%,100%{clip-path:inset(50% 0 50% 0)}50%{clip-path:inset(0 0 0 0)}',
            '0%{clip-path:inset(0 0 0 100%)}55%,100%{clip-path:inset(0 0 0 0)}',
            '0%,100%{clip-path:polygon(0 0,0 0,0 100%,0 100%)}50%{clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}'
          ][wi]),
          kf('mb-scl' + wi, [
            '0%{top:-8%}70%,100%{top:104%}',
            '0%{top:104%}70%,100%{top:-8%}',
            '0%{left:-8%;top:auto;bottom:0;right:auto;width:3px;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)}70%,100%{left:104%}',
            '0%,100%{transform:translateY(-60%)}50%{transform:translateY(60%)}',
            '0%{top:-8%}70%,100%{top:104%}',
            '0%,100%{opacity:.3}50%{opacity:1}'
          ][wi])
        ]),
        cfg: [range('Font size', '--fs', 24, 72, 2, 46, 'px'), range('Cycle', '--dur', 1, 6, .1, 2.8, 's'), col('Ink', '--c2', C2)]
      });
    });

    /* ---- 13. two-line offset (5) ---- */
    [['UP', 'DOWN'], ['LEFT', 'RIGHT'], ['IN', 'OUT'], ['BIG', 'LITTLE'], ['NOW', 'LATER']].forEach(function (w, wi) {
      pool.push({
        family: 'ktsplit', id: 'ktsplit-' + wi, title: w[0] + '/' + w[1] + ' Split Line',
        tags: ['css', 'split', 'duo'],
        html: '<div class="mb sl"><span class="a">' + w[0] + '</span><span class="b">' + w[1] + '</span></div>',
        css: join([
          '.mb{display:grid;place-items:center}',
          '.sl{display:flex;flex-direction:column;font:800 var(--fs,44px) system-ui,sans-serif;line-height:1.1;letter-spacing:.08em}',
          '.sl .a{color:var(--c1,' + C1 + ');animation:mb-sl' + wi + 'a var(--dur,2.6s) ease-in-out infinite}',
          '.sl .b{color:var(--c2,' + C2 + ');animation:mb-sl' + wi + 'b var(--dur,2.6s) ease-in-out infinite}',
          kf('mb-sl' + wi + 'a', '0%,100%{transform:translateX(0)}50%{transform:translateX(14px)}'),
          kf('mb-sl' + wi + 'b', '0%,100%{transform:translateX(0)}50%{transform:translateX(-14px)}')
        ]),
        cfg: [range('Font size', '--fs', 22, 68, 2, 44, 'px'), range('Cycle', '--dur', 1, 6, .1, 2.6, 's'),
          col('Top', '--c1', C1), col('Bottom', '--c2', C2)]
      });
    });

    /* ---- 14. neon blink word (5) ---- */
    ['BLINK', 'FLASH', 'STROBE', 'SIGNAL', 'PULSE'].forEach(function (word, wi) {
      pool.push({
        family: 'ktblink', id: 'ktblink-' + wi, title: word + ' Blink Word',
        tags: ['css', 'blink', 'neon'],
        html: '<div class="mb bl"><span>' + word + '</span></div>',
        css: join([
          '.mb{display:grid;place-items:center}',
          '.bl span{font:800 var(--fs,48px) system-ui,sans-serif;letter-spacing:.22em;color:var(--c1,' + C1 + ');text-shadow:0 0 16px var(--c1,' + C1 + ');animation:mb-bl' + wi + ' var(--dur,1.6s) ' + ['steps(2,end)', 'steps(1,end)', 'steps(1,end)', 'steps(3,end)', 'ease-in-out'][wi] + ' infinite}',
          kf('mb-bl' + wi, [
            '0%,100%{opacity:1}50%{opacity:0}',
            '0%,100%{opacity:1}50%{opacity:.15}',
            '0%,24%{opacity:1}25%,49%{opacity:.2}50%,74%{opacity:1}75%,100%{opacity:.2}',
            '0%,100%{opacity:1}33%{opacity:.4}66%{opacity:.85}',
            '0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.04)}'
          ][wi])
        ]),
        cfg: [range('Font size', '--fs', 24, 80, 2, 48, 'px'), range('Cycle', '--dur', .4, 4, .1, 1.6, 's'), col('Tube', '--c1', C1)]
      });
    });

    K.add('text', pool);
  })();

  /* ══════════════════════════════ CARDS & HOVER (86) ══════════════════════════════ */
  (function () {
    var pool = [];
    var cardBase = join([
      '.ck{position:relative;width:var(--w,250px);background:var(--panel,#15151f);border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:14px;overflow:hidden;font-family:system-ui,sans-serif;color:#e8e8f2}',
      '.ck h4{margin:0 0 10px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8f92b3;display:flex;justify-content:space-between;align-items:center}',
      '.ck h4 em{font-style:normal;font-size:10px;color:var(--c2,' + C2 + ')}'
    ]);

    /* ---- 1. stat dashboards (8) ---- */
    var dashCharts = [
      ['bars', 'Spark Bar Stat Card', '.ck .chart i{flex:1;border-radius:4px 4px 0 0;background:linear-gradient(var(--c1,' + C1 + '),var(--c2,' + C2 + '));animation:ck-b1 var(--dur,1.8s) ease-in-out infinite;animation-delay:calc(var(--i) * -.16s)}', kf('ck-b1', '0%,100%{height:22%}50%{height:var(--h,' + [40, 70, 55, 90, 62, 78, 48, 84][0] + '%)}')],
      ['dots', 'Dot Field Stat Card', '.ck .chart{display:flex;gap:5px;align-items:flex-end;height:52px}', '.ck .chart i{flex:1;aspect-ratio:1;border-radius:50%;background:var(--c1,' + C1 + ');animation:ck-d1 var(--dur,1.6s) ease-in-out infinite;animation-delay:calc(var(--i) * -.13s)}', kf('ck-d1', '0%,100%{transform:scale(.4);opacity:.35}50%{transform:scale(1);opacity:1}')],
      ['wave', 'Wave Line Stat Card', '.ck .chart i{flex:1;border-radius:4px;background:var(--c2,' + C2 + ');transform-origin:bottom;animation:ck-w1 var(--dur,1.4s) ease-in-out infinite;animation-delay:calc(var(--i) * -.11s)}', kf('ck-w1', '0%,100%{transform:scaleY(.2)}50%{transform:scaleY(1)}')],
      ['ring', 'Ring Gauge Stat Card', '.ck .chart{display:grid;place-items:center;height:56px}', '.ck .chart i{width:46px;height:46px;border-radius:50%;border:5px solid rgba(255,255,255,.08);border-top-color:var(--c1,' + C1 + ');border-right-color:var(--c2,' + C2 + ');animation:ck-spin var(--dur,1.6s) linear infinite}', kf('ck-spin', 'to{transform:rotate(1turn)}')],
      ['area', 'Area Chart Stat Card', '.ck .chart{display:flex;gap:3px;align-items:flex-end;height:52px}', '.ck .chart i{flex:1;background:linear-gradient(180deg,var(--c1,' + C1 + '),transparent);border-radius:4px 4px 0 0;animation:ck-a1 var(--dur,2s) ease-in-out infinite;animation-delay:calc(var(--i) * -.18s)}', kf('ck-a1', '0%,100%{height:12%}50%{height:var(--h,70%)}')],
      ['step', 'Step Chart Stat Card', '.ck .chart i{flex:1;background:var(--c5,' + C5 + ');border-radius:3px;animation:ck-s1 var(--dur,2.4s) steps(1,end) infinite;animation-delay:calc(var(--i) * -.3s)}', kf('ck-s1', '0%,12%{height:80%;background:var(--c5,' + C5 + ')}14%,100%{height:14%;background:rgba(255,255,255,.12)}')],
      ['pie', 'Pie Slice Stat Card', '.ck .chart{display:grid;place-items:center;height:56px}', '.ck .chart i{width:46px;height:46px;border-radius:50%;background:conic-gradient(var(--c1,' + C1 + ') 0 var(--deg,220deg),var(--c2,' + C2 + ') 0 calc(var(--deg,220deg) + 90deg),rgba(255,255,255,.08) 0);animation:ck-p1 var(--dur,3s) ease-in-out infinite}', kf('ck-p1', '0%,100%{--deg:120deg}50%{--deg:300deg}')],
      ['pulse', 'Pulse Dot Stat Card', '.ck .chart{display:flex;gap:6px;align-items:center;height:52px}', '.ck .chart i{width:10px;height:10px;border-radius:50%;background:var(--c3,' + C3 + ');animation:ck-u1 var(--dur,1.8s) ease-out infinite;animation-delay:calc(var(--i) * -.22s)}', kf('ck-u1', '0%{transform:scale(.4);opacity:1}100%{transform:scale(2.4);opacity:0}')],
      ['line', 'Lift Line Stat Card', '.ck .chart i{flex:1;background:linear-gradient(var(--c2,' + C2 + '),var(--c5,' + C5 + '));border-radius:4px;transform-origin:bottom;animation:ck-l1 var(--dur,2s) cubic-bezier(.5,.1,.3,1) infinite;animation-delay:calc(var(--i) * -.14s)}', kf('ck-l1', '0%,100%{transform:scaleY(.15)}45%{transform:scaleY(var(--hs,1))}')]
    ];
    dashCharts.forEach(function (v, vi) {
      var hs = [55, 85, 62, 95, 70, 58, 88, 40, 76][vi];
      var css = join([cardBase,
        '.ck .num{display:block;font:800 26px "JetBrains Mono",monospace;color:#fff;margin-bottom:10px}',
        '.ck .dlt{margin:10px 0 0;font-size:11px;color:#8f92b3}',
        '.ck .chart{display:flex;gap:4px;align-items:flex-end;height:52px}',
        v[3], v[4] || '', v[5] || '']
      ).replace('var(--h,40%)', 'var(--h,' + hs + '%)').replace('var(--hs,1)', 'var(--hs,' + (hs / 100).toFixed(2) + ')');
      pool.push({
        family: 'ckdash', id: 'ckdash-' + v[0], title: v[1],
        tags: ['css', 'dashboard', 'ui', 'stat', 'big'],
        html: '<div class="ck"><h4>' + ['Revenue', 'Sessions', 'Uptime', 'Latency', 'Storage', 'Jobs', 'Traffic', 'Signal', 'Velocity'][vi] + ' <em>live</em></h4><b class="num">' + ['$24.8k', '12,940', '99.98%', '42 ms', '72 GB', '1,204', '8.4k', 'A+', '$96.2k'][vi] + '</b><div class="chart">' + cells(7) + '</div><p class="dlt">' + ['+12.4%', '+3.1%', '+0.2%', '-8.9%', '+6.7%', '+21.0%', '-1.4%', '+9.8%', '+2.1%'][vi] + ' vs last week</p></div>',
        css: css,
        cfg: [range('Width', '--w', 180, 320, 2, 250, 'px'), range('Cycle', '--dur', .6, 4, .1, 1.8, 's'),
          col('Colour', '--c1', C1), col('Colour B', '--c2', C2), col('Accent', '--c3', C3), col('Green', '--c5', C5)]
      });
    });

    /* ---- 2. media player cards (8) ---- */
    [
      ['wave', 'Waveform Player Card', '.ck .bars i{flex:1;background:var(--c1,' + C1 + ');border-radius:3px;transform-origin:bottom;animation:ck-mp1 var(--dur,1.1s) ease-in-out infinite;animation-delay:calc(var(--i) * -.09s)}', kf('ck-mp1', '0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}')],
      ['spectrum', 'Spectrum Player Card', '.ck .bars i{flex:1;background:linear-gradient(180deg,var(--c2,' + C2 + '),var(--c1,' + C1 + '));border-radius:3px;transform-origin:bottom;animation:ck-mp2 var(--dur,1.4s) ease-in-out infinite;animation-delay:calc(var(--i) * -.12s)}', kf('ck-mp2', '0%,100%{transform:scaleY(.15)}40%{transform:scaleY(1)}80%{transform:scaleY(.4)}')],
      ['vinyl', 'Vinyl Player Card', '.ck .disc{width:74px;height:74px;border-radius:50%;background:repeating-radial-gradient(circle,#111 0 3px,#1c1c26 3px 5px);border:4px solid #0a0a10;display:grid;place-items:center;animation:ck-spin var(--dur,4s) linear infinite}', '.ck .disc b{width:22px;height:22px;border-radius:50%;background:var(--c3,' + C3 + ')}', kf('ck-spin', 'to{transform:rotate(1turn)}')],
      ['radio', 'Radio Player Card', '.ck .bars i{flex:1;background:var(--c5,' + C5 + ');border-radius:3px;animation:ck-mp4 var(--dur,1.6s) ease-in-out infinite;animation-delay:calc(var(--i) * -.15s)}', kf('ck-mp4', '0%,100%{height:16%}50%{height:88%}')],
      ['tape', 'Tape Player Card', '.ck .reels i{width:34px;height:34px;border-radius:50%;border:5px dashed var(--c2,' + C2 + ');animation:ck-spin var(--dur,3s) linear infinite}', '.ck .reels i:last-child{animation-direction:reverse}', kf('ck-spin', 'to{transform:rotate(1turn)}')],
      ['kass', 'Cassette Player Card', '.ck .tape i{position:absolute;inset:0;border-radius:8px;background:repeating-linear-gradient(90deg,var(--c1,' + C1 + ') 0 14px,transparent 14px 22px);animation:ck-mp6 var(--dur,1.2s) linear infinite}', kf('ck-mp6', 'to{background-position:22px 0}')],
      ['podcast', 'Podcast Player Card', '.ck .bars i{flex:1;background:var(--c3,' + C3 + ');border-radius:3px;transform-origin:center;animation:ck-mp7 var(--dur,1.3s) ease-in-out infinite;animation-delay:calc(var(--i) * -.1s)}', kf('ck-mp7', '0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1.15)}')],
      ['dj', 'DJ Deck Player Card', '.ck .bars{position:relative}', '.ck .bars i{position:absolute;left:0;right:0;top:50%;height:3px;border-radius:3px;background:var(--c1,' + C1 + ');transform-origin:left;animation:ck-mp8 var(--dur,1.8s) ease-in-out infinite;animation-delay:calc(var(--i) * -.4s)}', kf('ck-mp8', '0%,100%{transform:scaleX(.15)}50%{transform:scaleX(1)}')]
    ].forEach(function (v, vi) {
      pool.push({
        family: 'ckplayer', id: 'ckplayer-' + v[0], title: v[1],
        tags: ['css', 'player', 'ui', 'music', 'big'],
        html: '<div class="ck"><h4>Now playing <em>' + (vi % 2 ? '0:42' : '1:57') + '</em></h4>' +
          (v[0] === 'vinyl'
            ? '<div class="disc"><b></b></div>'
            : v[0] === 'tape'
              ? '<div class="reels"><i></i><i></i></div>'
              : v[0] === 'kass'
                ? '<div class="tapebox"><div class="tape"><i></i></div></div>'
                : '<div class="bars">' + cells(12) + '</div>') +
          '<div class="prog"><i></i></div><p class="meta">' + ['Night Drive — Neon Avenue', 'Slow Orbit — Satellite FM', 'Groove 09 — Deep Cut', 'Morning Static — Radio Lab', 'Loop City — Tape Club', 'Magnet — Kasset 3000', 'Field Notes — Pod 44', 'Crossfade — Deck B'][vi] + '</p></div>',
        css: join([cardBase,
          '.ck .bars{display:flex;align-items:flex-end;gap:3px;height:56px;margin:6px 0 10px}',
          '.ck .prog{height:5px;border-radius:99px;background:rgba(255,255,255,.1);overflow:hidden;margin-bottom:8px}',
          '.ck .prog i{display:block;height:100%;width:var(--p,64%);border-radius:99px;background:linear-gradient(90deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '))}',
          '.ck .meta{margin:0;font-size:11px;color:#8f92b3}',
          '.ck .disc{display:grid;place-items:center;height:88px;margin:4px 0 12px}',
          '.ck .reels{display:flex;justify-content:space-between;height:88px;margin:4px 6px 12px;align-items:center}',
          '.ck .tapebox{display:grid;place-items:center;height:88px;margin:4px 0 12px}',
          '.ck .tapebox .tape{position:relative;width:150px;height:44px;border-radius:10px;background:#10101a;border:1px solid rgba(255,255,255,.12);overflow:hidden}',
          v[2], v[3] || '', v[4] || '']
        ),
        cfg: [range('Width', '--w', 180, 320, 2, 250, 'px'), range('Cycle', '--dur', .5, 5, .1, 1.6, 's'), range('Progress', '--p', 5, 95, 1, 64, '%'),
          col('Colour', '--c1', C1), col('Colour B', '--c2', C2), col('Accent', '--c3', C3), col('Green', '--c5', C5)]
      });
    });

    /* ---- 3. chat bubble cards (8) ---- */
    [
      ['left', 'Bubble Chat Card A'], ['right', 'Bubble Chat Card B'], ['typing', 'Typing Chat Card'],
      ['group', 'Group Chat Card'], ['voice', 'Voice Note Chat Card'], ['image', 'Image Chat Card'],
      ['react', 'Reaction Chat Card'], ['system', 'System Chat Card']
    ].forEach(function (v, vi) {
      pool.push({
        family: 'ckchat', id: 'ckchat-' + v[0], title: v[1],
        tags: ['css', 'chat', 'ui', 'message'],
        html: '<div class="ck ch"><h4>Chat <em>3 online</em></h4>' +
          '<div class="msg a" style="--i:0">' + (vi === 5 ? '<i class="img"></i>' : 'Hey! The new 3D scenes landed 🚀') + '</div>' +
          '<div class="msg b" style="--i:1">' + (vi === 4 ? '<i class="vo"></i><b class="vob"></b>' : 'Wait — the torus one is huge') + '</div>' +
          '<div class="msg a" style="--i:2">' + (vi === 6 ? '🔥 <span class="rx">+2</span>' : (vi === 7 ? '<i class="sys">— scene updated —</i>' : 'Try the Big filter ✨')) + '</div>' +
          '<div class="msg b typing"><i></i><i></i><i></i></div></div>',
        css: join([cardBase,
          '.ch{display:flex;flex-direction:column;gap:8px}',
          '.ch .msg{max-width:82%;padding:8px 11px;border-radius:14px;font-size:12px;line-height:1.45;animation:ck-ch' + vi + ' var(--dur,3.2s) ease-out both}',
          '.ch .msg.a{align-self:flex-start;background:rgba(255,255,255,.08);border-bottom-left-radius:4px;animation-delay:calc(var(--i) * .5s)}',
          '.ch .msg.b{align-self:flex-end;background:var(--c1,' + C1 + ');border-bottom-right-radius:4px;animation-delay:calc(var(--i) * .5s + .25s)}',
          '.ch .msg.a:nth-of-type(2){animation-delay:.9s}.ch .msg.b:nth-of-type(2){animation-delay:1.15s}.ch .msg.a:nth-of-type(3){animation-delay:1.6s}',
          '.ch .typing{display:flex;gap:4px;padding:10px 12px;animation-delay:2.1s}',
          '.ch .typing i{width:6px;height:6px;border-radius:50%;background:#fff;animation:ck-typ var(--tdur,1s) ease-in-out infinite;animation-delay:calc(var(--i) * -.2s)}',
          '.ch .rx{display:inline-block;margin-left:6px;font-size:10px;background:rgba(0,0,0,.25);padding:1px 6px;border-radius:99px;animation:ck-rx var(--dur,3.2s) ease-out both;animation-delay:1.9s}',
          '.ch .img{display:block;width:100%;height:44px;border-radius:8px;background:linear-gradient(120deg,var(--c2,' + C2 + '),var(--c3,' + C3 + '))}',
          '.ch .vo{display:inline-block;width:6px;height:6px;border-radius:50%;background:#fff;margin-right:8px}',
          '.ch .vob{display:inline-block;width:64px;height:6px;border-radius:99px;background:rgba(255,255,255,.5);vertical-align:middle;animation:ck-vob var(--tdur,1.2s) ease-in-out infinite}',
          '.ch .sys{font-size:10px;opacity:.7;letter-spacing:.05em}',
          kf('ck-ch' + vi, '0%{opacity:0;transform:translateY(10px) scale(.92)}60%,100%{opacity:1;transform:none}'),
          kf('ck-typ', '0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(-4px);opacity:1}'),
          kf('ck-rx', '0%,80%{transform:scale(0)}90%{transform:scale(1.3)}100%{transform:scale(1)}'),
          kf('ck-vob', '0%,100%{transform:scaleX(1)}50%{transform:scaleX(1.6)}')
        ]),
        cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', 1.5, 6, .1, 3.2, 's'), range('Typing', '--tdur', .4, 2, .1, 1, 's'),
          col('Colour', '--c1', C1), col('Colour B', '--c2', C2), col('Accent', '--c3', C3)]
      });
    });

    /* ---- 4. menu list cards (8) ---- */
    var menuLabels = [['Home', 'Gallery', 'Inventory', 'Templates'], ['Dashboard', 'Analytics', 'Reports', 'Alerts'],
      ['Profile', 'Settings', 'Privacy', 'Logout'], ['Inbox', 'Starred', 'Sent', 'Archive'],
      ['Library', 'Recents', 'Downloads', 'Trash'], ['Team', 'Roles', 'Billing', 'API keys'],
      ['Projects', 'Branches', 'Issues', 'CI'], ['Music', 'Playlists', 'Queue', 'Radio']];
    menuLabels.forEach(function (items, vi) {
      pool.push({
        family: 'ckmenu', id: 'ckmenu-' + vi, title: items[0] + ' Menu Card',
        tags: ['css', 'menu', 'ui', 'list'],
        html: '<div class="ck mn"><h4>' + (vi < 4 ? 'Workspace' : 'Account') + ' <em>⌘K</em></h4>' +
          items.map(function (t, i) { return '<div class="row' + (i === 1 ? ' on' : '') + '" style="--i:' + i + '"><i>' + (i % 2 ? '◆' : '●') + '</i><span>' + t + '</span><em></em></div>'; }).join('') + '</div>',
        css: join([cardBase,
          '.mn .row{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;font-size:13px;color:#c6c8dd;animation:ck-mn' + vi + ' var(--dur,1.2s) ease-out both;animation-delay:calc(var(--i) * var(--st,.12s))}',
          '.mn .row i{width:22px;height:22px;border-radius:7px;display:grid;place-items:center;font-size:10px;background:rgba(255,255,255,.07);color:var(--c1,' + C1 + ')}',
          '.mn .row em{margin-left:auto;font-style:normal;opacity:0;font-size:11px;color:var(--c2,' + C2 + ');transition:opacity .3s}',
          '.mn .row.on{background:linear-gradient(90deg,color-mix(in srgb,var(--c1,' + C1 + ') 26%,transparent),transparent)}',
          '.mn .row.on em{opacity:1}',
          '.mn .row:hover{background:rgba(255,255,255,.06)}',
          kf('ck-mn' + vi, [
            '0%{opacity:0;transform:translateX(-16px)}100%{opacity:1;transform:none}',
            '0%{opacity:0;transform:translateX(16px)}100%{opacity:1;transform:none}',
            '0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:none}',
            '0%{opacity:0;transform:scale(.9)}60%{transform:scale(1.02)}100%{opacity:1;transform:scale(1)}'
          ][vi % 4])
        ]),
        cfg: [range('Width', '--w', 180, 320, 2, 250, 'px'), range('Cycle', '--dur', .4, 2.5, .1, 1.2, 's'), range('Stagger', '--st', .03, .35, .01, .12, 's'),
          col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
      });
    });

    /* ---- 5. form cards (8) ---- */
    [
      ['login', 'Login Form Card'], ['signup', 'Signup Form Card'], ['search', 'Search Form Card'],
      ['checkout', 'Checkout Form Card'], ['comment', 'Comment Form Card'], ['subscribe', 'Subscribe Form Card'],
      ['otp', 'OTP Form Card'], ['filter', 'Filter Form Card']
    ].forEach(function (v, vi) {
      pool.push({
        family: 'ckform', id: 'ckform-' + v[0], title: v[1],
        tags: ['css', 'form', 'ui', 'input'],
        html: '<div class="ck fm"><h4>' + ['Sign in', 'Create account', 'Search', 'Payment', 'Leave a note', 'Newsletter', 'Verify code', 'Refine'][vi] + ' <em>⌫</em></h4>' +
          (vi === 6
            ? '<div class="code">' + '<i>7</i><i>2</i><i>•</i><i>•</i><i>•</i></div>'
            : '<div class="fld"><span>' + (vi === 2 ? 'Find an effect…' : (vi === 3 ? 'Card number' : 'Your ' + (vi === 1 ? 'name' : 'email'))) + '</span><i></i></div>' +
              (vi === 1 || vi === 3 ? '<div class="fld"><span>' + (vi === 3 ? 'Expiry · CVC' : 'Password') + '</span><i></i></div>' : '') +
              (vi === 7 ? '<div class="chips"><i class="on">3D</i><i>Big</i><i>Canvas</i></div>' : '')) +
          '<button class="go"><span>' + ['Enter', 'Join', 'Search', 'Pay $24', 'Post', 'Subscribe', 'Verify', 'Apply'][vi] + '</span></button></div>',
        css: join([cardBase,
          '.fm .fld{position:relative;margin-bottom:10px}',
          '.fm .fld span{display:block;font-size:11px;color:#8f92b3;margin-bottom:4px}',
          '.fm .fld i{display:block;height:32px;border-radius:9px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);position:relative;overflow:hidden}',
          '.fm .fld i::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--c1,' + C1 + ');transform:scaleX(0);transform-origin:left;animation:ck-fm' + vi + ' var(--dur,2.4s) ease-in-out infinite}',
          '.fm .chips{display:flex;gap:6px;margin-bottom:10px}',
          '.fm .chips i{font-style:normal;font-size:11px;padding:5px 10px;border-radius:99px;background:rgba(255,255,255,.07);animation:ck-chp var(--dur,2.4s) ease-in-out infinite;animation-delay:calc(var(--i) * -.5s)}',
          '.fm .code{display:flex;gap:8px;margin-bottom:12px}',
          '.fm .code i{width:38px;height:44px;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);display:grid;place-items:center;font:800 18px "JetBrains Mono",monospace;animation:ck-otp var(--dur,2.4s) ease-in-out infinite;animation-delay:calc(var(--i) * -.3s)}',
          '.fm .go{width:100%;border:0;cursor:pointer;padding:11px;border-radius:10px;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));color:#fff;font:700 13px system-ui,sans-serif;position:relative;overflow:hidden}',
          '.fm .go span{position:relative;z-index:1}',
          '.fm .go::after{content:"";position:absolute;inset:0;background:linear-gradient(100deg,transparent,rgba(255,255,255,.35),transparent);transform:translateX(-110%);animation:ck-goshine var(--dur,2.4s) ease-in-out infinite}',
          kf('ck-fm' + vi, '0%,100%{transform:scaleX(0)}40%,70%{transform:scaleX(1)}'),
          kf('ck-chp', '0%,100%{transform:scale(1)}50%{transform:scale(1.06);background:rgba(255,255,255,.12)}'),
          kf('ck-otp', '0%,100%{transform:scale(1);border-color:rgba(255,255,255,.1)}50%{transform:scale(1.08);border-color:var(--c1,' + C1 + ')}'),
          kf('ck-goshine', '0%{transform:translateX(-110%)}55%,100%{transform:translateX(110%)}')
        ]),
        cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', .8, 5, .1, 2.4, 's'),
          col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
      });
    });

    /* ---- 6. gallery grid cards (8) ---- */
    [
      ['grid', 'Mosaic Gallery Card'], ['pan', 'Ken Burns Gallery Card'], ['duo', 'Duotone Gallery Card'],
      ['stack', 'Stacked Gallery Card'], ['film', 'Filmstrip Gallery Card'], ['focus', 'Focus Gallery Card'],
      ['tile', 'Tile Flip Gallery Card'], ['frame', 'Framed Gallery Card']
    ].forEach(function (v, vi) {
      pool.push({
        family: 'ckgallery', id: 'ckgallery-' + v[0], title: v[1],
        tags: ['css', 'gallery', 'ui', 'photo'],
        html: '<div class="ck gl"><h4>Scenes <em>08</em></h4><div class="ph">' +
          (v[0] === 'stack'
            ? '<i class="s1"></i><i class="s2"></i><i class="s3"></i>'
            : '<i class="p1"></i><i class="p2"></i><i class="p3"></i><i class="p4"></i>') +
          '</div></div>',
        css: join([cardBase,
          '.gl .ph{position:relative;height:120px;border-radius:10px;overflow:hidden;background:#0d0d15}',
          '.gl .ph i{position:absolute;border-radius:8px}',
          v[0] === 'stack'
            ? join([
                '.gl .s1{inset:12% 26% 12% 6%;background:linear-gradient(135deg,var(--c2,' + C2 + '),var(--c3,' + C3 + '));animation:ck-st var(--dur,3s) ease-in-out infinite}',
                '.gl .s2{inset:6% 14% 6% 14%;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c4,' + C4 + '));animation:ck-st2 var(--dur,3s) ease-in-out infinite}',
                '.gl .s3{inset:0;background:linear-gradient(135deg,var(--c3,' + C3 + '),var(--c5,' + C5 + '));animation:ck-st3 var(--dur,3s) ease-in-out infinite}',
                kf('ck-st', '0%,100%{transform:rotate(-6deg)}50%{transform:rotate(3deg)}'),
                kf('ck-st2', '0%,100%{transform:rotate(4deg)}50%{transform:rotate(-4deg)}'),
                kf('ck-st3', '0%,100%{transform:scale(1)}50%{transform:scale(1.03)}')
              ])
            : join([
                '.gl .p1{inset:0 50% 50% 0;background:linear-gradient(135deg,var(--c1,' + C1 + '),transparent 70%)}',
                '.gl .p2{inset:0 0 50% 50%;background:linear-gradient(225deg,var(--c2,' + C2 + '),transparent 70%)}',
                '.gl .p3{inset:50% 50% 0 0;background:linear-gradient(315deg,var(--c3,' + C3 + '),transparent 70%)}',
                '.gl .p4{inset:50% 0 0 50%;background:linear-gradient(45deg,var(--c4,' + C4 + '),transparent 70%)}',
                [
                  '.gl .p1{animation:ck-g1 var(--dur,3.4s) ease-in-out infinite}.gl .p2{animation:ck-g1 var(--dur,3.4s) ease-in-out infinite reverse}',
                  '.gl .ph{animation:ck-kb var(--dur,7s) ease-in-out infinite}',
                  '.gl .p1,.gl .p2,.gl .p3,.gl .p4{animation:ck-duo var(--dur,4s) ease-in-out infinite}',
                  '.gl .p1,.gl .p3{transform:scale(1)}',
                  '.gl .p2,.gl .p4{transform:scale(1)}',
                  '.gl .p1,.gl .p2,.gl .p3,.gl .p4{animation:ck-flp var(--dur,4s) ease-in-out infinite;animation-delay:calc(var(--i) * -.9s)}',
                  '.gl .p1,.gl .p2,.gl .p3,.gl .p4{animation:ck-fr var(--dur,3.2s) ease-in-out infinite;animation-delay:calc(var(--i) * -.4s)}'
                ][vi % 6]
              ]),
          kf('ck-g1', '0%,100%{opacity:.5}50%{opacity:1}'),
          kf('ck-kb', '0%,100%{transform:scale(1)}50%{transform:scale(1.12)}'),
          kf('ck-duo', '0%,100%{filter:saturate(1)}50%{filter:saturate(1.8) brightness(1.15)}'),
          kf('ck-flp', '0%,42%,100%{transform:scale(1)}50%{transform:scale(1.08)}'),
          kf('ck-fr', '0%,100%{opacity:.55}50%{opacity:1}')
        ]),
        cfg: [range('Width', '--w', 180, 320, 2, 250, 'px'), range('Cycle', '--dur', 1, 8, .1, 4, 's'),
          col('Colour', '--c1', C1), col('Colour B', '--c2', C2), col('Accent', '--c3', C3), col('Amber', '--c4', C4), col('Green', '--c5', C5)]
      });
    });

    /* ---- 7. receipt / invoice (6) ---- */
    [
      ['cafe', 'Café Receipt Card'], ['club', 'Gym Receipt Card'], ['ticket', 'Ticket Stub Card'],
      ['shop', 'Shop Receipt Card'], ['freight', 'Freight Invoice Card'], ['lab', 'Lab Invoice Card']
    ].forEach(function (v, vi) {
      var rows = [['Latte ×2', '$5.40', 'Oreos', '$3.10'], ['Membership', '$39.00', 'Day pass', '$9.00'],
        ['Seat 12', '$78.00', 'Tax', '$9.36'], ['Mech kit', '$129.00', 'Shipping', '$8.00'],
        ['Cargo 40kg', '$310.00', 'Fuel', '$42.00'], ['Rig test', '$88.00', 'Calibration', '$12.00']][vi];
      pool.push({
        family: 'ckinvoice', id: 'ckinvoice-' + v[0], title: v[1],
        tags: ['css', 'receipt', 'ui', 'invoice'],
        html: '<div class="ck rc"><h4>' + ['Order #4821', 'Bill · Aug', 'Gate B · 14:30', 'Order #774', 'Invoice 0092', 'Report ML-9'][vi] + ' <em>paid</em></h4>' +
          rows.map(function (r, i) { return '<div class="l" style="--i:' + i + '"><span>' + r[0] + '</span><b>' + r[1] + '</b></div>'; }).join('') +
          '<div class="tot" style="--i:2"><span>Total</span><b>' + ['$8.50', '$48.00', '$87.36', '$137.00', '$352.00', '$100.00'][vi] + '</b></div>' +
          '<div class="tear"></div></div>',
        css: join([cardBase,
          '.rc{background:repeating-linear-gradient(180deg,rgba(255,255,255,.025) 0 2px,transparent 2px 6px),var(--panel,#15151f)}',
          '.rc .l{display:flex;justify-content:space-between;font-size:12px;color:#c6c8dd;padding:5px 0;border-bottom:1px dashed rgba(255,255,255,.08);animation:ck-rc var(--dur,1.1s) ease-out both;animation-delay:calc(var(--i) * var(--st,.22s))}',
          '.rc .l b{font-family:"JetBrains Mono",monospace;color:#fff}',
          '.rc .tot{display:flex;justify-content:space-between;font:800 15px "JetBrains Mono",monospace;padding:9px 0 4px;color:var(--c2,' + C2 + ')}',
          '.rc .tear{height:8px;margin-top:8px;background:radial-gradient(circle at 6px -2px,transparent 6px,rgba(255,255,255,.09) 6px) 0 0/14px 8px;animation:ck-tear var(--dur,1.1s) ease-out both;animation-delay:calc(var(--i,2) * var(--st,.22s) + .5s)}',
          kf('ck-rc', '0%{opacity:0;transform:translateY(8px)}100%{opacity:1;transform:none}'),
          kf('ck-tear', '0%{opacity:0}100%{opacity:1}')
        ]),
        cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', .4, 2.5, .1, 1.1, 's'), range('Stagger', '--st', .05, .5, .01, .22, 's'),
          col('Ink', '--c2', C2)]
      });
    });

    /* ---- 8. profile boards (6) ---- */
    ['Astronaut', 'DJ Nova', 'Robot', 'Wizard', 'Racer', 'Diver'].forEach(function (name, vi) {
      pool.push({
        family: 'ckprofile', id: 'ckprofile-' + vi, title: name + ' Profile Card',
        tags: ['css', 'profile', 'ui', 'avatar'],
        html: '<div class="ck pf"><div class="ava"><i></i><b>' + name[0] + '</b></div>' +
          '<h4>' + name + ' <em>pro</em></h4>' +
          '<p class="bio">' + ['Shooting stars', 'Spinning decks', 'Making noise', 'Casting spells', 'Chasing laps', 'Finding reefs'][vi] + '</p>' +
          '<div class="stat"><span>Fans</span><i style="--i:0"></i><b>12.4k</b></div>' +
          '<div class="stat"><span>Follow</span><i style="--i:1"></i><b>318</b></div>' +
          '<button class="flw">Follow</button></div>',
        css: join([cardBase,
          '.pf .ava{position:relative;width:64px;height:64px;margin-bottom:10px}',
          '.pf .ava i{position:absolute;inset:0;border-radius:50%;background:conic-gradient(var(--c1,' + C1 + '),var(--c2,' + C2 + '),var(--c3,' + C3 + '),var(--c1,' + C1 + '));animation:ck-spin var(--dur,4s) linear infinite}',
          '.pf .ava b{position:absolute;inset:4px;border-radius:50%;background:#1a1a28;display:grid;place-items:center;font:800 24px system-ui,sans-serif;color:#fff}',
          '.pf .bio{margin:-4px 0 10px;font-size:12px;color:#8f92b3}',
          '.pf .stat{display:flex;align-items:center;gap:8px;font-size:12px;color:#c6c8dd;padding:3px 0}',
          '.pf .stat span{width:56px}',
          '.pf .stat i{flex:1;height:5px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden;position:relative}',
          '.pf .stat i::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));transform-origin:left;animation:ck-pf' + vi + ' var(--dur,2.6s) ease-in-out infinite;animation-delay:calc(var(--i) * -.7s)}',
          '.pf .flw{width:100%;margin-top:10px;border:0;cursor:pointer;padding:9px;border-radius:10px;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c3,' + C3 + '));color:#fff;font:700 12px system-ui,sans-serif;animation:ck-pfbtn var(--dur,2.6s) ease-in-out infinite}',
          kf('ck-spin', 'to{transform:rotate(1turn)}'),
          kf('ck-pf' + vi, '0%,100%{transform:scaleX(' + [.3, .45][vi % 2] + ')}50%{transform:scaleX(1)}'),
          kf('ck-pfbtn', '0%,100%{transform:scale(1)}50%{transform:scale(1.035)}')
        ]),
        cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', 1, 6, .1, 2.8, 's'),
          col('Colour', '--c1', C1), col('Colour B', '--c2', C2), col('Accent', '--c3', C3)]
      });
    });

    /* ---- 9. timelines (6) ---- */
    ['Build', 'Launch', 'Sprint', 'Deploy', 'Research', 'Release'].forEach(function (name, vi) {
      pool.push({
        family: 'cktline', id: 'cktline-' + vi, title: name + ' Timeline Card',
        tags: ['css', 'timeline', 'ui'],
        html: '<div class="ck tl"><h4>' + name + ' <em>' + (vi + 2) + ' steps</em></h4>' +
          [0, 1, 2].map(function (i) { return '<div class="step" style="--i:' + i + '"><i></i><div><b>' + ['Plan', 'Build', 'Ship'][i] + ' ' + (i + 1) + '</b><span>' + (i === 2 ? 'done in 2 days' : 'in progress') + '</span></div></div>'; }).join('') + '</div>',
        css: join([cardBase,
          '.tl .step{position:relative;display:flex;gap:10px;padding:0 0 12px 2px;animation:ck-tl var(--dur,2.2s) ease-out both;animation-delay:calc(var(--i) * .45s)}',
          '.tl .step::before{content:"";position:absolute;left:7px;top:16px;bottom:-2px;width:2px;background:rgba(255,255,255,.1)}',
          '.tl .step:last-child::before{display:none}',
          '.tl .step i{width:16px;height:16px;border-radius:50%;background:var(--c1,' + C1 + ');box-shadow:0 0 10px color-mix(in srgb,var(--c1,' + C1 + ') 70%,transparent);flex:none;animation:ck-tld var(--dur,2.2s) ease-in-out infinite;animation-delay:calc(var(--i) * .45s)}',
          '.tl .step b{display:block;font-size:13px}',
          '.tl .step span{font-size:11px;color:#8f92b3}',
          kf('ck-tl', '0%{opacity:0;transform:translateX(-12px)}100%{opacity:1;transform:none}'),
          kf('ck-tld', '0%,100%{transform:scale(1)}50%{transform:scale(1.35)}')
        ]),
        cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', 1, 5, .1, 2.2, 's'), col('Colour', '--c1', C1)]
      });
    });

    /* ---- 10. table / spreadsheet (6) ---- */
    ['Tasks', 'Budget', 'Tracks', 'Servers', 'Scores', 'Queue'].forEach(function (name, vi) {
      pool.push({
        family: 'cktable', id: 'cktable-' + vi, title: name + ' Table Card',
        tags: ['css', 'table', 'ui', 'data'],
        html: '<div class="ck tb"><h4>' + name + ' <em>live</em></h4>' +
          [0, 1, 2, 3].map(function (i) { return '<div class="tr" style="--i:' + i + ';--bw:' + ['82', '64', '91', '47'][i] + '%"><span>' + ['A', 'B', 'C', 'D'][i] + '</span><i><b></b></i><em>' + ['82%', '64%', '91%', '47%'][i] + '</em></div>'; }).join('') + '</div>',
        css: join([cardBase,
          '.tb .tr{display:flex;align-items:center;gap:8px;padding:7px 0;font-size:12px;color:#c6c8dd;animation:ck-tb' + vi + ' var(--dur,1.4s) ease-out both;animation-delay:calc(var(--i) * var(--st,.18s))}',
          '.tb .tr span{width:16px;font-weight:700;color:#8f92b3}',
          '.tb .tr i{flex:1;height:7px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden}',
          '.tb .tr b{display:block;height:100%;width:var(--bw,50%);border-radius:99px;background:linear-gradient(90deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));animation:ck-tbb var(--dur,1.4s) ease-out both;animation-delay:calc(var(--i) * var(--st,.18s) + .2s)}',
          '.tb .tr em{width:34px;text-align:right;font-style:normal;font-family:"JetBrains Mono",monospace}',
          kf('ck-tb' + vi, '0%{opacity:0;transform:translateX(-14px)}100%{opacity:1;transform:none}'),
          kf('ck-tbb', '0%{transform:scaleX(0)}100%{transform:scaleX(1)}')
        ]),
        cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', .5, 3, .1, 1.4, 's'), range('Stagger', '--st', .04, .4, .01, .18, 's'),
          col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
      });
    });

    /* ---- 11. calendars (4) ---- */
    ['Sept', 'Q4', 'Week', 'Lunar'].forEach(function (name, vi) {
      pool.push({
        family: 'ckcal', id: 'ckcal-' + vi, title: name + ' Calendar Card',
        tags: ['css', 'calendar', 'ui', 'dates'],
        html: '<div class="ck cl"><h4>' + name + ' <em>4 events</em></h4><div class="days">' +
          (function () { var s = ''; for (var i = 0; i < 14; i++) s += '<i style="--i:' + i + '"' + ([2, 5, 8, 12].indexOf(i) > -1 ? ' class="ev"' : '') + '>' + (vi === 3 ? ['✶', '✧', '·', '·', '·', '✶', '·', '·', '·', '·', '·', '✧', '·', '✶'][i] : (i + 2)) + '</i>'; return s; })() +
          '</div></div>',
        css: join([cardBase,
          '.cl .days{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}',
          '.cl .days i{aspect-ratio:1;border-radius:8px;display:grid;place-items:center;font:600 11px "JetBrains Mono",monospace;color:#8f92b3;background:rgba(255,255,255,.04);animation:ck-cl' + vi + ' var(--dur,3s) ease-in-out infinite;animation-delay:calc(var(--i) * .1s)}',
          '.cl .days i.ev{background:var(--c1,' + C1 + ');color:#fff;box-shadow:0 0 12px color-mix(in srgb,var(--c1,' + C1 + ') 60%,transparent)}',
          kf('ck-cl' + vi, [
            '0%,100%{transform:scale(1)}50%{transform:scale(1.12)}',
            '0%,100%{opacity:.6}50%{opacity:1}',
            '0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}',
            '0%,100%{border-radius:8px}50%{border-radius:50%}'
          ][vi])
        ]),
        cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', 1, 6, .1, 3, 's'), col('Mark', '--c1', C1)]
      });
    });

    /* ---- 12. bank cards (4) ---- */
    ['Platinum', 'Neon', 'Obsidian', 'Aurora'].forEach(function (name, vi) {
      pool.push({
        family: 'ckbank', id: 'ckbank-' + vi, title: name + ' Bank Card',
        tags: ['css', 'bank', 'ui', 'card', 'big'],
        html: '<div class="ck bk"><i class="chip"></i><b class="no">•••• •••• •••• ' + [1984, 2077, 31, 4412][vi] + '</b>' +
          '<div class="row"><span>' + name + '</span><em>VISA</em></div><i class="shine"></i></div>',
        css: join([cardBase,
          '.bk{width:var(--w,270px);height:170px;border-radius:18px;padding:16px;background:' +
            [
              'linear-gradient(120deg,#e8e9f5,#b9bcd8 55%,#dcdff2)',
              'linear-gradient(135deg,#171430,#31205e 60%,#171430)',
              'linear-gradient(135deg,#0c0c12,#1d1d2a 60%,#0c0c12)',
              'linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + ') 55%,var(--c3,' + C3 + '))'
            ][vi] +
            ';color:' + (vi === 0 ? '#1c1c2e' : '#fff') + ';overflow:hidden;position:relative;animation:ck-bk' + vi + ' var(--dur,5s) ease-in-out infinite}',
          '.bk .chip{width:38px;height:28px;border-radius:6px;background:linear-gradient(135deg,#f5d67b,#c9992e);position:relative}',
          '.bk .chip::after{content:"";position:absolute;inset:5px 6px;border:1px solid rgba(0,0,0,.3);border-radius:3px}',
          '.bk .no{position:absolute;left:16px;bottom:44px;font:600 15px "JetBrains Mono",monospace;letter-spacing:.12em}',
          '.bk .row{position:absolute;left:16px;bottom:14px;display:flex;justify-content:space-between;width:calc(100% - 32px);font-size:11px;letter-spacing:.14em}',
          '.bk .row em{font-style:italic;font-weight:800}',
          '.bk .shine{position:absolute;top:0;bottom:0;left:-70%;width:50%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.4),transparent);transform:skewX(-18deg);animation:ck-bks var(--dur,5s) ease-in-out infinite}',
          kf('ck-bk' + vi, [
            '0%,100%{transform:rotate(0) scale(1)}50%{transform:rotate(-2deg) scale(1.02)}',
            '0%,100%{box-shadow:0 10px 26px rgba(0,0,0,.4)}50%{box-shadow:0 16px 40px rgba(0,0,0,.55)}',
            '0%,100%{transform:scale(1)}50%{transform:scale(1.015)}',
            '0%,100%{filter:hue-rotate(0deg)}50%{filter:hue-rotate(60deg)}'
          ][vi]),
          kf('ck-bks', '0%{left:-70%}60%,100%{left:130%}')
        ]),
        cfg: [range('Width', '--w', 200, 340, 2, 270, 'px'), range('Cycle', '--dur', 2, 9, .1, 5, 's'),
          col('Colour', '--c1', C1), col('Colour B', '--c2', C2), col('Accent', '--c3', C3)]
      });
    });

    /* ---- 13. map cards (3) ---- */
    ['City', 'Trail', 'Star'].forEach(function (name, vi) {
      pool.push({
        family: 'ckmap', id: 'ckmap-' + vi, title: name + ' Map Card',
        tags: ['css', 'map', 'ui', 'pins'],
        html: '<div class="ck mp"><h4>' + name + ' map <em>' + [3, 2, 4][vi] + ' pins</em></h4><div class="map">' +
          '<i class="p1" style="--i:0"></i><i class="p2" style="--i:1"></i><i class="p3" style="--i:2"></i></div></div>',
        css: join([cardBase,
          '.mp .map{position:relative;height:130px;border-radius:10px;overflow:hidden;background:' +
            (vi === 2 ? 'radial-gradient(circle at 70% 30%, #1a1440 0, #0a0a16 60%)' : 'linear-gradient(135deg,#101018,#181828)') +
            ';background-image:' + (vi === 0 ? 'linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)' : '') +
            (vi === 0 ? ',linear-gradient(135deg,#101018,#181828)' : (vi === 2 ? ',radial-gradient(circle at 20% 70%,#241c52 0 3px,transparent 4px),radial-gradient(circle at 80% 80%,#241c52 0 2px,transparent 3px)' : 'repeating-linear-gradient(30deg,transparent 0 26px,rgba(255,255,255,.05) 26px 27px)')) + ';background-size:22px 22px,auto}',
          '.mp .map i{position:absolute;width:14px;height:14px;border-radius:50% 50% 50% 0;background:var(--c' + (1 + vi % 3) + ',' + [C1, C2, C3][vi] + ');transform:rotate(-45deg);animation:ck-mp' + vi + ' var(--dur,2.4s) cubic-bezier(.3,.7,.3,1.4) infinite;animation-delay:calc(var(--i) * var(--st,.6s))}',
          '.mp .p1{left:22%;top:34%}',
          '.mp .p2{left:52%;top:56%}',
          '.mp .p3{left:74%;top:26%}',
          kf('ck-mp' + vi, '0%,100%{transform:rotate(-45deg) scale(1);opacity:1}30%{transform:rotate(-45deg) scale(1.5)}50%{transform:rotate(-45deg) scale(.9);opacity:.7}')
        ]),
        cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', 1, 5, .1, 2.4, 's'), range('Stagger', '--st', .1, 1.5, .05, .6, 's'),
          col('Pin A', '--c1', C1), col('Pin B', '--c2', C2), col('Pin C', '--c3', C3)]
      });
    });

    /* ---- 14. weather cards (3) ---- */
    ['Sunny', 'Stormy', 'Foggy'].forEach(function (name, vi) {
      pool.push({
        family: 'ckwx', id: 'ckwx-' + vi, title: name + ' Weather Card',
        tags: ['css', 'weather', 'ui'],
        html: '<div class="ck wx"><h4>' + ['Lisbon', 'Reykjavik', 'London'][vi] + ' <em>now</em></h4>' +
          '<div class="sky">' +
          (vi === 0 ? '<i class="sun"></i>' : vi === 1 ? '<i class="cloud"></i><i class="bolt"></i>' : '<i class="fog f1"></i><i class="fog f2"></i>') +
          '</div><b class="temp">' + ['24°', '3°', '11°'][vi] + '</b><p class="desc">' + [name, name, name][vi] + '</p></div>',
        css: join([cardBase,
          '.wx .sky{position:relative;height:80px;border-radius:10px;overflow:hidden;margin-bottom:10px;background:linear-gradient(180deg,#1b2440,#2c3a63)}',
          vi === 1 && '.wx .sky{background:linear-gradient(180deg,#14141f,#232338)}',
          vi === 2 && '.wx .sky{background:linear-gradient(180deg,#1d2026,#2a2e36)}',
          '.wx .sun{position:absolute;left:50%;top:42%;width:40px;height:40px;margin-left:-20px;border-radius:50%;background:radial-gradient(circle,#fff3b0,#ffb52e 70%);box-shadow:0 0 30px rgba(255,190,60,.7);animation:ck-sun var(--dur,4s) ease-in-out infinite}',
          '.wx .cloud{position:absolute;left:30%;top:30%;width:52px;height:20px;border-radius:99px;background:#c9cde0;box-shadow:14px -8px 0 -4px #aab0c8,28px 2px 0 -6px #c9cde0;animation:ck-cloud var(--dur,3.4s) ease-in-out infinite}',
          '.wx .bolt{position:absolute;left:52%;top:52%;width:10px;height:22px;background:var(--c4,' + C4 + ');clip-path:polygon(60% 0,100% 0,45% 55%,80% 55%,20% 100%,40% 48%,0 48%);animation:ck-bolt var(--dur,2.8s) steps(1,end) infinite}',
          '.wx .fog{position:absolute;left:-30%;right:-30%;height:14px;border-radius:99px;background:rgba(220,224,235,.28);filter:blur(4px)}',
          '.wx .f1{top:34%;animation:ck-fog var(--dur,5s) ease-in-out infinite}',
          '.wx .f2{top:56%;animation:ck-fog var(--dur,5s) ease-in-out infinite reverse}',
          '.wx .temp{font:800 30px "JetBrains Mono",monospace;display:block}',
          '.wx .desc{margin:2px 0 0;font-size:12px;color:#8f92b3}',
          kf('ck-sun', '0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}'),
          kf('ck-cloud', '0%,100%{transform:translateX(0)}50%{transform:translateX(10px)}'),
          kf('ck-bolt', '0%,72%,78%,100%{opacity:0}73%,77%{opacity:1}'),
          kf('ck-fog', '0%,100%{transform:translateX(0)}50%{transform:translateX(40px)}')
        ]),
        cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', 1.5, 8, .1, 4, 's'), col('Bolt', '--c4', C4)]
      });
    });

    K.add('cards', pool);
  })();

  /* ══════════════════════════════ BACKGROUNDS (104) ══════════════════════════════ */
  (function () {
    var pool = [];
    var cvCss = '.cv{display:block;width:100%;height:var(--h,210px);border-radius:10px;background:#0a0a12}';
    var cvCfg = function (extra) {
      return [range('Height', '--h', 120, 420, 2, 210, 'px')].concat(extra || []);
    };
    var cvJs = function (body) {
      return 'var c=root.querySelector(".cv"),g=c.getContext("2d"),d=Math.min(2,window.devicePixelRatio||1);' +
        'c.width=Math.round(c.clientWidth*d);c.height=Math.round(c.clientHeight*d);' +
        'var t=0,w=c.width,h=c.height;\n' +
        'api.raf(function(){t+=.016;\n' + body + '\n});';
    };

    /* ---- 1. nebula canvas (8) ---- */
    [
      ['Deep', 16, '#7c5cff', '#22d3ee'], ['Rose', 14, '#ff5c8a', '#a855f7'],
      ['Teal', 18, '#22d3ee', '#34d399'], ['Violet', 15, '#a855f7', '#7c5cff'],
      ['Amber', 13, '#ffd479', '#ff9d5c'], ['Mint', 17, '#34d399', '#7ee787'],
      ['Indigo', 16, '#60a5fa', '#7c5cff'], ['Magenta', 14, '#f472b6', '#a855f7']
    ].forEach(function (v, vi) {
      pool.push({
        family: 'bgnb', id: 'bgnb-' + vi, title: v[0] + ' Nebula',
        tags: ['js', 'canvas', 'nebula', 'big'],
        html: '<div class="mb"><canvas class="cv"></canvas></div>',
        css: cvCss,
        js: cvJs(
          'w=c.width;h=c.height;g.globalCompositeOperation="source-over";g.clearRect(0,0,w,h);' +
          'var P=S.p||(S.p=[]);if(!P.length){for(var j=0;j<' + v[1] + ';j++){P.push({x:Math.random(),y:Math.random(),r:.14+Math.random()*.34,ph:Math.random()*6.28,sp:.12+Math.random()*.4});}}' +
          'g.globalCompositeOperation="lighter";' +
          'for(var i=0;i<P.length;i++){var b=P[i],x=(b.x+Math.cos(t*b.sp+b.ph)*.07)*w,y=(b.y+Math.sin(t*b.sp*.8+b.ph)*.07)*h,r=b.r*Math.min(w,h);' +
          'var gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,i%2?"' + v[2] + '":"' + v[3] + '");gr.addColorStop(1,"rgba(0,0,0,0)");' +
          'g.globalAlpha=.16+Math.abs(Math.sin(t*.4+b.ph))*.2;g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,6.284);g.fill();}'
        ).replace('var t=0', 'var t=0,S={}', 1),
        cfg: cvCfg()
      });
    });

    /* ---- 2. city skyline canvas (8) ---- */
    [
      ['Neon', 0], ['Dusk', 1], ['Rain', 2], ['Tokyo', 3], ['Port', 4], ['Sky', 5], ['Grid', 6], ['Fog', 7]
    ].forEach(function (v, vi) {
      pool.push({
        family: 'bgcity', id: 'bgcity-' + vi, title: v[0] + ' Skyline',
        tags: ['js', 'canvas', 'city', 'big'],
        html: '<div class="mb"><canvas class="cv"></canvas></div>',
        css: cvCss,
        js: cvJs(
          'w=c.width;h=c.height;var B=S.b||(S.b=[]);' +
          'if(!B.length){for(var j=0;j<26;j++){B.push({x:j/26,w:.028+((j*37+7)%10)/160,h:.25+((j*53+' + vi * 11 + ')%70)/100,c:(j*31)%4});}}' +
          'var sky=g.createLinearGradient(0,0,0,h);sky.addColorStop(0,"#' + ['131328', '1a1030', '0d1520', '201028', '101828', '151225', '0f0f1e', '16121e'][vi] + '");sky.addColorStop(1,"#' + ['05050c', '0a0616', '04080d', '0e0616', '050a12', '080614', '050510', '09070c'][vi] + '");' +
          'g.fillStyle=sky;g.fillRect(0,0,w,h);' +
          'for(var i=0;i<B.length;i++){var b=B[i],bw=b.w*w,bx=b.x*w,bh=b.h*h,by=h-bh-14*d;' +
          'g.fillStyle="#07070d";g.fillRect(bx,by,bw,bh);' +
          'var rows=Math.floor(bh/(14*d)),cols=Math.max(2,Math.floor(bw/(9*d)));' +
          'for(var r=0;r<rows;r++)for(var cc=0;cc<cols;cc++){if(((i*7+r*13+cc*5)%9)<2){' +
          'var tw=.4+.6*Math.abs(Math.sin(t*(1+((i+r+cc)%3)*.5)+i+r+cc));' +
          'g.fillStyle="' + ['#22d3ee', '#ffd479', '#7c5cff', '#ff5c8a', '#34d399', '#f472b6', '#60a5fa', '#a855f7'][vi] + '";g.globalAlpha=.25+tw*.6;g.fillRect(bx+3*d+cc*9*d,by+4*d+r*14*d,4*d,6*d);}}}' +
          'g.globalAlpha=1;var car=((t*(.12+' + vi * .015 + '))%1)*w;g.fillStyle="#fff";g.fillRect(car,h-10*d,10*d,3*d);g.fillStyle="#ff5c5c";g.fillRect(w-car-10*d,h-10*d,10*d,3*d)'
        ).replace('var t=0', 'var t=0,S={}', 1),
        cfg: cvCfg()
      });
    });

    /* ---- 3. aurora veils CSS (8) ---- */
    [
      ['Boreal Curtain', '180deg'], ['Polar Veil', '200deg'], ['Ion Stream', '160deg'],
      ['Night Lights', '220deg'], ['Green Ribbon Sky', '190deg'], ['Magenta Sky Veil', '240deg'],
      ['Cyan Drift Veil', '170deg'], ['Violet Drape', '210deg']
    ].forEach(function (v, vi) {
      var hue = vi * 45;
      pool.push({
        family: 'bgauro', id: 'bgauro-' + vi, title: v[0],
        tags: ['css', 'aurora', 'big'],
        html: '<div class="mb au"><i class="l1"></i><i class="l2"></i><i class="l3"></i></div>',
        css: join([
          '.mb{width:100%;overflow:hidden;height:var(--h,210px);border-radius:10px;background:linear-gradient(' + v[1] + ',#060614,#0b0b1e 60%,#060614);position:relative}',
          '.au i{position:absolute;left:-30%;right:-30%;height:60%;filter:blur(26px);opacity:.55;border-radius:45% 55% 55% 45%/60% 40% 60% 40%}',
          '.au .l1{top:8%;background:linear-gradient(90deg,transparent,hsl(' + hue + ' 90% 60% / .8),hsl(' + (hue + 60) + ' 90% 55% / .8),transparent);animation:au' + vi + 'a var(--dur,9s) ease-in-out infinite alternate}',
          '.au .l2{top:34%;background:linear-gradient(90deg,transparent,hsl(' + (hue + 90) + ' 90% 60% / .7),hsl(' + (hue + 150) + ' 90% 55% / .7),transparent);animation:au' + vi + 'b var(--dur,12s) ease-in-out infinite alternate}',
          '.au .l3{top:58%;background:linear-gradient(90deg,transparent,hsl(' + (hue + 200) + ' 90% 60% / .6),transparent);animation:au' + vi + 'a var(--dur,7s) ease-in-out infinite alternate-reverse}',
          kf('au' + vi + 'a', '0%{transform:translateX(-8%) skewY(' + (vi % 2 ? 3 : -3) + 'deg)}100%{transform:translateX(8%) skewY(' + (vi % 2 ? -3 : 3) + 'deg)}'),
          kf('au' + vi + 'b', '0%{transform:translateX(6%) skewY(-2deg) scaleY(1.05)}100%{transform:translateX(-6%) skewY(2deg) scaleY(.95)}')
        ]),
        cfg: [range('Height', '--h', 120, 420, 2, 210, 'px'), range('Cycle', '--dur', 4, 24, .5, 10, 's')]
      });
    });

    /* ---- 4. parallax starfields canvas (8) ---- */
    [
      ['Drift', .02], ['Fast', .06], ['Deep', .015], ['Cross', .03],
      ['Twinkle', .025], ['Spiral', .04], ['Nebular', .02], ['Warp', .05]
    ].forEach(function (v, vi) {
      pool.push({
        family: 'bgstar', id: 'bgstar-' + vi, title: v[0] + ' Starfield',
        tags: ['js', 'canvas', 'stars', 'big'],
        html: '<div class="mb"><canvas class="cv"></canvas></div>',
        css: cvCss,
        js: cvJs(
          'w=c.width;h=c.height;var P=S.p||(S.p=[]);' +
          'if(!P.length){for(var j=0;j<110;j++){P.push({x:Math.random(),y:Math.random(),z:(j%5+1)/5,ph:Math.random()*6.28});}}' +
          'g.fillStyle="rgba(6,6,14,.5)";g.fillRect(0,0,w,h);' +
          'var sp=' + v[1] + '*(1+(t*.01));' +
          'for(var i=0;i<P.length;i++){var s=P[i];s.x+=sp*s.z;if(s.x>1){s.x=0;s.y=Math.random();}' +
          'var x=s.x*w,y=' + (vi === 3 ? '(s.y+Math.sin(s.x*6.28)*.12)' : 's.y') + '*h,r=s.z*2.4*d;' +
          'g.globalAlpha=.35+.65*Math.abs(Math.sin(t*1.4+s.ph));g.fillStyle=i%7?"#cfd6ff":"' + (vi % 2 ? '#9ae8ff' : '#d9c9ff') + '";' +
          (vi === 5 ? 'g.globalAlpha=.5+.5*Math.abs(Math.sin(t*2+i*.3));g.beginPath();g.arc(x,y,r*1.4,0,6.284);g.fill();' :
            (vi === 7 ? 'g.fillRect(x,y,sp*s.z*w*.12,r);' : 'g.beginPath();g.arc(x,y,r,0,6.284);g.fill();')) +
          '}'
        ).replace('var t=0', 'var t=0,S={}', 1),
        cfg: cvCfg()
      });
    });

    /* ---- 5. cyber rain canvas (8) ---- */
    [
      ['Cyber Rain', 0], ['Data Fall', 1], ['Signal Storm', 2], ['Bit Drizzle', 3],
      ['Hex Downpour', 4], ['Code Cascade', 5], ['Binary Sheet', 6], ['Glitch Storm', 7]
    ].forEach(function (v, vi) {
      var glyphs = vi === 6 ? '01' : vi === 4 ? '0123456789abcdef' : 'アイウエオカキクケコサシスセソ';
      pool.push({
        family: 'bgcybr', id: 'bgcybr-' + vi, title: v[0],
        tags: ['js', 'canvas', 'rain', 'big'],
        html: '<div class="mb"><canvas class="cv"></canvas></div>',
        css: cvCss,
        js: cvJs(
          'w=c.width;h=c.height;var N=' + (34 + vi * 4) + ',Y=S.y||(S.y=[]);' +
          'if(!Y.length){for(var j=0;j<N;j++){Y.push({y:Math.random()*h,sp:1.2+Math.random()*2.6,glow:(j%5===0)});}}' +
          'g.fillStyle="rgba(5,10,8,.16)";g.fillRect(0,0,w,h);' +
          'g.font=(9*d)+"px monospace";' +
          'for(var i=0;i<N;i++){var col=Math.floor(i/(N/w/(11*d))),x=col*11*d+5*d,y=Y[i].y;Y[i].y+=Y[i].sp*d;if(Y[i].y>h+20){Y[i].y=-20;Y[i].sp=1.2+Math.random()*2.6;}' +
          'var ch=' + JSON.stringify(glyphs) + '[(i*7+Math.floor(t*8))% ' + glyphs.length + '];' +
          'g.fillStyle="' + (vi === 1 ? '#7c5cff' : vi === 2 ? '#22d3ee' : vi === 3 ? '#34d399' : vi === 4 ? '#a855f7' : vi === 5 ? '#60a5fa' : vi === 7 ? '#ff5c8a' : '#34d399') + '";' +
          'g.globalAlpha=Y[i].glow?1:.55;g.fillText(ch,x,y);g.globalAlpha=1;}'
        ).replace('var t=0', 'var t=0,S={}', 1),
        cfg: cvCfg()
      });
    });

    /* ---- 6. fireflies canvas (8) ---- */
    [
      ['Firefly Meadow', 26], ['Lantern Night', 18], ['Moth Cloud', 30], ['Dusk Glow', 22],
      ['Garden Lights', 24], ['Swamp Wisp', 20], ['Star Lilies', 28], ['Ember Dusk', 25]
    ].forEach(function (v, vi) {
      pool.push({
        family: 'bgfire', id: 'bgfire-' + vi, title: v[0],
        tags: ['js', 'canvas', 'glow', 'big'],
        html: '<div class="mb"><canvas class="cv"></canvas></div>',
        css: cvCss,
        js: cvJs(
          'w=c.width;h=c.height;var P=S.p||(S.p=[]);' +
          'if(!P.length){for(var j=0;j<' + v[1] + ';j++){P.push({x:Math.random(),y:Math.random(),a:Math.random()*6.28,r:.4+Math.random()*.8,ph:Math.random()*6.28});}}' +
          'g.fillStyle="#07070d";g.fillRect(0,0,w,h);g.globalCompositeOperation="lighter";' +
          'var warm=' + vi % 2 + ';' +
          'for(var i=0;i<P.length;i++){var b=P[i];b.a+=.004+b.r*.004;var x=(b.x+Math.sin(t*b.r+b.ph)*.06)*w,y=(b.y+Math.cos(t*b.r*.8+b.ph)*.05)*h;' +
          'var gl=.25+.75*Math.pow(Math.abs(Math.sin(t*.8+b.ph)),2),r=(4+b.r*5)*d*gl;' +
          'g.fillStyle="rgba("+(warm?"' + (vi % 4 === 0 ? '255,196,92' : '255,120,90') + '":"150,255,190")+","+gl.toFixed(2)+")";' +
          'g.beginPath();g.arc(x,y,r,0,6.284);g.fill();}' +
          'g.globalCompositeOperation="source-over"'
        ).replace('var t=0', 'var t=0,S={}', 1),
        cfg: cvCfg()
      });
    });

    /* ---- 7. warp tunnel canvas (8) ---- */
    [
      ['Warp Tunnel Tight', 90], ['Warp Tunnel Wide', 140], ['Hyper Lane', 120], ['Speed Ring', 100],
      ['Dive Beam', 80], ['Slipstream', 150], ['Event Horizon', 110], ['Boost Gate', 130]
    ].forEach(function (v, vi) {
      pool.push({
        family: 'bgwarp', id: 'bgwarp-' + vi, title: v[0],
        tags: ['js', 'canvas', 'warp', 'big'],
        html: '<div class="mb"><canvas class="cv"></canvas></div>',
        css: cvCss,
        js: cvJs(
          'w=c.width;h=c.height;var L=S.l||(S.l=[]);' +
          'if(!L.length){for(var j=0;j<' + v[1] + ';j++){L.push({a:Math.random()*6.28,r:Math.random(),sp:.002+Math.random()*.004});}}' +
          'g.fillStyle="rgba(4,4,10,.4)";g.fillRect(0,0,w,h);var cx=w/2,cy=h/2,mx=Math.max(w,h);' +
          'for(var i=0;i<L.length;i++){var o=L[i];o.r+=o.sp*(1+' + vi * .06 + ');if(o.r>1){o.r=0;o.a=Math.random()*6.28;}' +
          'var p1=o.r*o.r,p2=(o.r+o.sp*6)*(o.r+o.sp*6),al=(1-o.r)*.8;' +
          'g.strokeStyle=i%4===0?"rgba(34,211,238,"+al.toFixed(2)+")":i%3===0?"rgba(255,92,138,"+al.toFixed(2)+")":"rgba(180,170,255,"+al.toFixed(2)+")";' +
          'g.lineWidth=(1+o.r*2.4)*d;g.beginPath();' +
          'g.moveTo(cx+Math.cos(o.a)*p1*mx*.62,cy+Math.sin(o.a)*p1*mx*.38);' +
          'g.lineTo(cx+Math.cos(o.a)*p2*mx*.62,cy+Math.sin(o.a)*p2*mx*.38);g.stroke();}'
        ).replace('var t=0', 'var t=0,S={}', 1),
        cfg: cvCfg()
      });
    });

    /* ---- 8. 3D wave floor CSS (8) ---- */
    [
      ['Synth Floor Grid', 0], ['Deep Grid Floor', 60], ['Cyan Floor Sweep', 120], ['Magenta Floor Sweep', 180],
      ['Amber Floor Sweep', 240], ['Mint Floor Sweep', 300], ['Indigo Floor Sweep', 30], ['Rose Floor Sweep', 150]
    ].forEach(function (v, vi) {
      pool.push({
        family: 'bgwave3d', id: 'bgwave3d-' + vi, title: v[0],
        tags: ['css', '3d', 'grid', 'big'],
        html: '<div class="mb wf"><i></i><b></b></div>',
        css: join([
          '.mb{width:100%;height:var(--h,210px);overflow:hidden;border-radius:10px;background:linear-gradient(180deg,#05050e 0%,#' + (['0a0a20', '100a20', '0a1420', '140a1a', '0a0a24', '120a24', '0e0a1e', '160e1e'][vi]) + ' 100%);position:relative;perspective:420px}',
          '.wf i{position:absolute;left:-60%;right:-60%;top:52%;bottom:-70%;background:repeating-linear-gradient(180deg,transparent 0 34px,hsl(' + (265 + v[1]) + ' 90% 65% / .8) 34px 36px),repeating-linear-gradient(90deg,transparent 0 34px,hsl(' + (265 + v[1]) + ' 90% 65% / .5) 34px 36px);transform:rotateX(62deg);animation:wf' + vi + ' var(--dur,3.2s) linear infinite;filter:drop-shadow(0 0 12px hsl(' + (265 + v[1]) + ' 90% 60% / .8))}',
          '.wf b{position:absolute;left:0;right:0;top:46%;height:14%;background:linear-gradient(180deg,transparent,hsl(' + (265 + v[1]) + ' 95% 60% / .35));filter:blur(10px);animation:wf' + vi + 'b var(--dur,3.2s) ease-in-out infinite}',
          kf('wf' + vi, 'to{background-position:0 36px,0 0}'),
          kf('wf' + vi + 'b', '0%,100%{opacity:.5}50%{opacity:1}')
        ]),
        cfg: [range('Height', '--h', 120, 420, 2, 210, 'px'), range('Cycle', '--dur', 1, 8, .1, 3.2, 's')]
      });
    });

    /* ---- 9. bokeh canvas (8) ---- */
    [
      ['Bokeh Night', 22], ['Bokeh Garden', 18], ['Bokeh Stage', 26], ['Bokeh Rain', 20],
      ['Bokeh Dusk', 24], ['Bokeh Party', 30], ['Bokeh Sea', 19], ['Bokeh Snow', 21]
    ].forEach(function (v, vi) {
      pool.push({
        family: 'bgbok', id: 'bgbok-' + vi, title: v[0],
        tags: ['js', 'canvas', 'bokeh', 'big'],
        html: '<div class="mb"><canvas class="cv"></canvas></div>',
        css: cvCss,
        js: cvJs(
          'w=c.width;h=c.height;var P=S.p||(S.p=[]);' +
          'if(!P.length){for(var j=0;j<' + v[1] + ';j++){P.push({x:Math.random(),y:Math.random(),r:.04+Math.random()*.14,ph:Math.random()*6.28,sp:.05+Math.random()*.2,c:(j*13)%3});}}' +
          'g.fillStyle="rgba(6,7,14,.55)";g.fillRect(0,0,w,h);g.globalCompositeOperation="lighter";' +
          'for(var i=0;i<P.length;i++){var b=P[i];var x=(b.x+Math.sin(t*b.sp+b.ph)*.04)*w,y=(b.y+Math.cos(t*b.sp*.7+b.ph)*.03)*h,r=b.r*Math.min(w,h);' +
          'var a=.1+.22*Math.abs(Math.sin(t*.5+b.ph));var cs=["124,92,255","34,211,238","255,92,138"][b.c];' +
          'var gr=g.createRadialGradient(x,y,r*.2,x,y,r);gr.addColorStop(0,"rgba("+cs+","+(a*1.6).toFixed(2)+")");gr.addColorStop(.8,"rgba("+cs+","+(a*.5).toFixed(2)+")");gr.addColorStop(1,"rgba("+cs+",0)");' +
          'g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,6.284);g.fill();}' +
          'g.globalCompositeOperation="source-over"'
        ).replace('var t=0', 'var t=0,S={}', 1),
        cfg: cvCfg()
      });
    });

    /* ---- 10. infinite grids CSS (6) ---- */
    [
      ['Synth Floor', 300], ['Cyber Plaza', 190], ['Neon Alley', 330],
      ['Data Field', 250], ['Holo Deck', 170], ['Star Gate Grid', 275]
    ].forEach(function (v, vi) {
      pool.push({
        family: 'bggrid2', id: 'bggrid2-' + vi, title: v[0],
        tags: ['css', 'grid', 'synthwave', 'big'],
        html: '<div class="mb ig"><i class="fl"></i><i class="sky"></i></div>',
        css: join([
          '.mb{width:100%;height:var(--h,210px);overflow:hidden;border-radius:10px;background:linear-gradient(180deg,#04040a,#0b0b22 48%,#04040a 50%);position:relative}',
          '.ig .sky{position:absolute;inset:0 0 50% 0;background:radial-gradient(60% 90% at 50% 100%,hsl(' + v[1] + ' 90% 60% / .5),transparent 70%)}',
          '.ig .fl{position:absolute;left:-100%;right:-100%;top:50%;bottom:-120%;transform:perspective(300px) rotateX(58deg);transform-origin:top;background:repeating-linear-gradient(180deg,hsl(' + v[1] + ' 95% 65% / .85) 0 2px,transparent 2px 30px),repeating-linear-gradient(90deg,hsl(' + v[1] + ' 95% 65% / .85) 0 2px,transparent 2px 30px);animation:ig' + vi + ' var(--dur,2.4s) linear infinite}',
          kf('ig' + vi, 'to{background-position:0 30px,0 0}')
        ]),
        cfg: [range('Height', '--h', 120, 420, 2, 210, 'px'), range('Cycle', '--dur', .6, 6, .1, 2.4, 's')]
      });
    });

    /* ---- 11. plasma canvas (6) ---- */
    ['Plasma Reef', 'Plasma Core', 'Plasma Tide', 'Plasma Nebula', 'Plasma Flux', 'Plasma Drift'].forEach(function (v, vi) {
      pool.push({
        family: 'bgplas', id: 'bgplas-' + vi, title: v,
        tags: ['js', 'canvas', 'plasma', 'big'],
        html: '<div class="mb"><canvas class="cv"></canvas></div>',
        css: cvCss,
        js: 'var c=root.querySelector(".cv"),g=c.getContext("2d"),d=Math.min(2,window.devicePixelRatio||1);' +
          'c.width=Math.round(c.clientWidth*d);c.height=Math.round(c.clientHeight*d);' +
          'var oc=document.createElement("canvas"),ow=64,oh=36;oc.width=ow;oc.height=oh;var og=oc.getContext("2d"),img=og.createImageData(ow,oh);' +
          'var t=0,off=' + (vi * 40) + ';\n' +
          'api.raf(function(){t+=.02;\n' +
          'var w=c.width,h=c.height,n=ow*oh;' +
          'for(var i=0;i<n;i++){var x=i%ow,y=(i/ow)|0;' +
          'var v=Math.sin(x*.35+t+off*.01)+Math.sin(y*.4-t*.8)+Math.sin((x+y)*.25+t*.5)+Math.sin(Math.sqrt((x-ow/2)*(x-ow/2)+(y-oh/2)*(y-oh/2))*.6-t*1.2);' +
          'var hue=(' + (180 + vi * 30) + '+v*40+t*20)%360,hue2=hue<0?hue+360:hue,lit=42+v*9;' +
          'var rgb=hsl2rgb(hue2,0.85,Math.max(.08,Math.min(.8,lit/100)));' +
          'img.data[i*4]=rgb[0];img.data[i*4+1]=rgb[1];img.data[i*4+2]=rgb[2];img.data[i*4+3]=255;}' +
          'og.putImageData(img,0,0);g.imageSmoothingEnabled=true;g.clearRect(0,0,w,h);g.drawImage(oc,0,0,w,h);\n' +
          'function hsl2rgb(hh,s,l){var c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((hh/60)%2-1)),m=l-c/2,tv;if(hh<60)tv=[c,x,0];else if(hh<120)tv=[x,c,0];else if(hh<180)tv=[0,c,x];else if(hh<240)tv=[0,x,c];else if(hh<300)tv=[x,0,c];else tv=[c,0,x];return[(tv[0]+m)*255|0,(tv[1]+m)*255|0,(tv[2]+m)*255|0];}\n});',
        cfg: cvCfg()
      });
    });

    /* ---- 12. sunset scenes CSS (6) ---- */
    [
      ['Amber Sunset', 15], ['Rose Sunset', 335], ['Coral Sunset', 20], ['Magenta Sunset', 315], ['Gold Sunset', 45], ['Crimson Sunset', 355]
    ].forEach(function (v, vi) {
      pool.push({
        family: 'bgsuns', id: 'bgsuns-' + vi, title: v[0],
        tags: ['css', 'sunset', 'scene', 'big'],
        html: '<div class="mb ss"><i class="sun"></i><i class="cl c1"></i><i class="cl c2"></i><i class="sea"></i></div>',
        css: join([
          '.mb{width:100%;height:var(--h,210px);overflow:hidden;border-radius:10px;background:linear-gradient(180deg,hsl(' + (v[1] + 200) + ' 60% 8%) 0%,hsl(' + (v[1] + 20) + ' 80% 35%) 55%,hsl(' + v[1] + ' 95% 60%) 78%);position:relative}',
          '.ss .sun{position:absolute;left:50%;top:52%;width:44%;aspect-ratio:1;margin-left:-22%;border-radius:50%;background:radial-gradient(circle,hsl(' + v[1] + ' 100% 85%),hsl(' + v[1] + ' 95% 60%) 70%);box-shadow:0 0 60px hsl(' + v[1] + ' 95% 60% / .9);animation:ss' + vi + ' var(--dur,7s) ease-in-out infinite}',
          '.ss .cl{position:absolute;height:8%;border-radius:99px;background:rgba(10,8,24,.55);filter:blur(2px)}',
          '.ss .c1{top:30%;left:-20%;right:30%;animation:ss' + vi + 'c 11s linear infinite}',
          '.ss .c2{top:42%;left:20%;right:-20%;animation:ss' + vi + 'c 15s linear infinite reverse}',
          '.ss .sea{position:absolute;left:0;right:0;bottom:0;height:24%;background:repeating-linear-gradient(90deg,rgba(255,255,255,.06) 0 8px,transparent 8px 16px),linear-gradient(180deg,hsl(' + v[1] + ' 90% 45% / .8),hsl(' + (v[1] + 200) + ' 70% 10%));animation:ss' + vi + 's 3s linear infinite}',
          kf('ss' + vi, '0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}'),
          kf('ss' + vi + 'c', '0%{transform:translateX(0)}50%{transform:translateX(40px)}100%{transform:translateX(0)}'),
          kf('ss' + vi + 's', 'to{background-position:16px 0,0 0}')
        ]),
        cfg: [range('Height', '--h', 120, 420, 2, 210, 'px'), range('Cycle', '--dur', 3, 16, .5, 7, 's')]
      });
    });

    /* ---- 13. dust drift canvas (4) ---- */
    ['Dust Drift', 'Pollen Air', 'Ash Float', 'Mote Field'].forEach(function (v, vi) {
      pool.push({
        family: 'bgdust', id: 'bgdust-' + vi, title: v,
        tags: ['js', 'canvas', 'particles'],
        html: '<div class="mb"><canvas class="cv"></canvas></div>',
        css: cvCss,
        js: cvJs(
          'w=c.width;h=c.height;var P=S.p||(S.p=[]);' +
          'if(!P.length){for(var j=0;j<70;j++){P.push({x:Math.random(),y:Math.random(),r:.5+Math.random()*1.8,sp:.02+Math.random()*.05,ph:Math.random()*6.28});}}' +
          'g.clearRect(0,0,w,h);' +
          'for(var i=0;i<P.length;i++){var b=P[i];b.x+=b.sp*.016;if(b.x>1)b.x=0;var x=b.x*w,y=(b.y+Math.sin(t*.6+b.ph)*.03)*h;' +
          'g.globalAlpha=.14+.3*Math.abs(Math.sin(t+b.ph));g.fillStyle="' + (vi % 2 ? '#d9c9a8' : '#aab4d8') + '";' +
          'g.beginPath();g.arc(x,y,b.r*d,0,6.284);g.fill();}g.globalAlpha=1'
        ).replace('var t=0', 'var t=0,S={}', 1),
        cfg: cvCfg()
      });
    });

    /* ---- 14. ocean CSS (4) ---- */
    ['Calm Ocean', 'Choppy Sea', 'Mist Harbor', 'Deep Tide'].forEach(function (v, vi) {
      pool.push({
        family: 'bgocea', id: 'bgocea-' + vi, title: v,
        tags: ['css', 'ocean', 'waves', 'big'],
        html: '<div class="mb oc"><i class="w1"></i><i class="w2"></i><i class="w3"></i><i class="shine"></i></div>',
        css: join([
          '.mb{width:100%;height:var(--h,210px);overflow:hidden;border-radius:10px;background:linear-gradient(180deg,' + (['#06182e', '#0a1420', '#0c1a26', '#051018'][vi]) + ',' + (['#0a3a5c', '#0e2a44', '#12324a', '#082030'][vi]) + ');position:relative}',
          '.oc i{position:absolute;left:-40%;right:-40%;border-radius:45% 55% 0 0}',
          '.oc .w1{bottom:-12%;height:52%;background:radial-gradient(120% 190% at 50% 0%,transparent 41%,#' + (['1b7fae', '1e5f8e', '2a6f9a', '14507a'][vi]) + ' 42%);opacity:.9;animation:oc' + vi + 'a var(--dur,8s) ease-in-out infinite}',
          '.oc .w2{bottom:-18%;height:44%;background:radial-gradient(120% 190% at 50% 0%,transparent 40%,#' + (['155f8e', '174a74', '215c82', '0f3d5e'][vi]) + ' 41%);animation:oc' + vi + 'b var(--dur,11s) ease-in-out infinite}',
          '.oc .w3{bottom:-22%;height:36%;background:radial-gradient(120% 190% at 50% 0%,transparent 39%,#' + (['0e4268', '113a5a', '184a6e', '0a2c46'][vi]) + ' 40%);animation:oc' + vi + 'a var(--dur,6s) ease-in-out infinite reverse}',
          '.oc .shine{bottom:26%;height:2px;width:30%;left:10%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent);animation:oc' + vi + 's var(--dur,5s) ease-in-out infinite}',
          kf('oc' + vi + 'a', '0%,100%{transform:translateX(-2%)}50%{transform:translateX(2%)}'),
          kf('oc' + vi + 'b', '0%,100%{transform:translateX(2.5%)}50%{transform:translateX(-2.5%)}'),
          kf('oc' + vi + 's', '0%,100%{opacity:.2;transform:translateX(0)}50%{opacity:.8;transform:translateX(180px)}')
        ]),
        cfg: [range('Height', '--h', 120, 420, 2, 210, 'px'), range('Cycle', '--dur', 3, 16, .5, 8, 's')]
      });
    });

    /* ---- 15. light beams CSS (6) ---- */
    [
      ['Amber Beam Storm', 25], ['Cyan Beam Storm', 200], ['Green Beam Storm', 130],
      ['Magenta Beam Storm', 300], ['Rose Beam Storm', 330], ['Blue Beam Storm', 90]
    ].forEach(function (v, vi) {
      pool.push({
        family: 'bgbeam', id: 'bgbeam-' + vi, title: v[0],
        tags: ['css', 'light', 'beams', 'big'],
        html: '<div class="mb lb">' + [0, 1, 2, 3, 4, 5].map(function (i) { return '<i style="--i:' + i + '"></i>'; }).join('') + '</div>',
        css: join([
          '.mb{width:100%;height:var(--h,210px);overflow:hidden;border-radius:10px;background:radial-gradient(120% 120% at 50% 0%,#0b0b1c,#04040a 70%);position:relative}',
          '.lb i{position:absolute;top:-40%;bottom:-40%;left:calc(5% + var(--i) * 16%);width:9%;transform-origin:top center;background:linear-gradient(180deg,hsl(' + v[1] + ' 95% 65% / .55),transparent 78%);filter:blur(6px);animation:lb' + vi + ' var(--dur,6s) ease-in-out infinite;animation-delay:calc(var(--i) * -' + (1 + vi * .15).toFixed(2) + 's)}',
          kf('lb' + vi, '0%,100%{transform:rotate(' + (vi % 2 ? -1 : 1) + (12 + vi * 4) + 'deg);opacity:.5}50%{transform:rotate(' + (vi % 2 ? 1 : -1) + (12 + vi * 4) + 'deg);opacity:.95}')
        ]),
        cfg: [range('Height', '--h', 120, 420, 2, 210, 'px'), range('Cycle', '--dur', 3, 14, .5, 6, 's')]
      });
    });

    K.add('backgrounds', pool);
  })();

  /* ══════════════════════════════ CONTROLS (100) ══════════════════════════════ */
  (function () {
    var pool = [];
    var ctlBase = '.ct{position:relative;width:var(--w,240px);background:var(--panel,#15151f);border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:16px;font-family:system-ui,sans-serif;color:#e8e8f2}';

    /* ---- 1. fader banks (8) ---- */
    var faderNames = ['Mix Desk Left', 'Mix Desk Right', 'Echo Console', 'Reverb Bank', 'Compressor Rack', 'EQ Strip A', 'EQ Strip B', 'Master Fader'];
    faderNames.forEach(function (name, vi) {
      var n = 4 + (vi % 3) * 2;
      pool.push({
        family: 'ctfader', id: 'ctfader-' + vi, title: name,
        tags: ['css', 'fader', 'mixer', 'ui'],
        html: '<div class="ct fd"><h4>' + name + ' <em>dB</em></h4><div class="tracks">' +
          Array.apply(null, { length: n }).map(function (_, i) { return '<div class="tr" style="--i:' + i + '"><i class="rail"></i><i class="knob"></i><b>' + [12, 8, -3, 0, 5, -6, 2, 9][i] + '</b></div>'; }).join('') + '</div></div>',
        css: join([
          ctlBase,
          '.ct h4{margin:0 0 12px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8f92b3;display:flex;justify-content:space-between}',
          '.ct h4 em{font-style:normal;color:var(--c2,' + C2 + ')}',
          '.fd .tracks{display:flex;gap:14px;justify-content:center}',
          '.fd .tr{position:relative;width:26px}',
          '.fd .rail{display:block;height:110px;border-radius:99px;background:rgba(255,255,255,.09);margin:0 auto;position:relative}',
          '.fd .rail::after{content:"";position:absolute;left:50%;top:0;bottom:0;width:2px;margin-left:-1px;background:linear-gradient(180deg,var(--c1,' + C1 + '),transparent 60%);transform-origin:top;transform:scaleY(var(--fill,' + [.7, .4, .85, .55, .65, .3, .75, .5][vi] + '))}',
          '.fd .knob{position:absolute;top:calc((1 - var(--fill,' + [.7, .4, .85, .55, .65, .3, .75, .5][vi] + ')) * 110px);left:50%;width:22px;height:12px;margin-left:-11px;border-radius:4px;background:linear-gradient(180deg,#f2f3fa,#b9bcd8);box-shadow:0 3px 8px rgba(0,0,0,.5);animation:ct-fd' + vi + ' var(--dur,2.6s) ease-in-out infinite;animation-delay:calc(var(--i) * var(--st,.3s))}',
          '.fd b{position:absolute;bottom:-18px;left:0;right:0;text-align:center;font:600 10px "JetBrains Mono",monospace;color:#8f92b3}',
          kf('ct-fd' + vi, [
            '0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}',
            '0%,100%{transform:translateY(-12px)}50%{transform:translateY(6px)}',
            '0%,40%,100%{transform:translateY(0)}20%,60%{transform:translateY(-24px)}80%{transform:translateY(4px)}',
            '0%,100%{transform:translateY(-6px)}25%{transform:translateY(-20px)}50%{transform:translateY(2px)}75%{transform:translateY(-14px)}'
          ][vi % 4])
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 240, 'px'), range('Cycle', '--dur', 1, 6, .1, 2.6, 's'), range('Stagger', '--st', .05, .8, .05, .3, 's'),
          col('Fill', '--c1', C1), col('Label', '--c2', C2)]
      });
    });

    /* ---- 2. joysticks (6, JS) ---- */
    ['Flight Stick', 'Tank Yoke', 'Game Pad', 'Sail Helm', 'Probe Arm', 'Turret'].forEach(function (name, vi) {
      pool.push({
        family: 'ctstick', id: 'ctstick-' + vi, title: name,
        tags: ['js', 'joystick', 'pointer', 'ui'],
        html: '<div class="ct js"><h4>' + name + ' <em>XY</em></h4><div class="base"><i class="stick"><b></b></i></div><p class="rd">0, 0</p></div>',
        css: join([
          ctlBase,
          '.ct h4{margin:0 0 10px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8f92b3;display:flex;justify-content:space-between}',
          '.ct h4 em{font-style:normal;color:var(--c2,' + C2 + ')}',
          '.js .base{position:relative;width:150px;height:110px;margin:6px auto;border-radius:14px;background:radial-gradient(circle at 50% 40%,#1d1d2c,#101018);border:1px solid rgba(255,255,255,.08);touch-action:none}',
          '.js .stick{position:absolute;left:50%;top:50%;width:24px;height:24px;margin:-12px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#9ea3c9 65%,#6d719c);box-shadow:0 6px 14px rgba(0,0,0,.6);cursor:grab}',
          '.js .rd{margin:10px 0 0;font:600 11px "JetBrains Mono",monospace;color:#8f92b3;text-align:center}'
        ]),
        js: 'var base=root.querySelector(".base"),st=root.querySelector(".stick"),rd=root.querySelector(".rd");\n' +
          'function move(e){var r=base.getBoundingClientRect();var mx=r.width/2-14,my=r.height/2-12;var x=(e.clientX-r.left-mx)/mx,y=(e.clientY-r.top-my)/my;\n' +
          'var m=Math.hypot(x,y);if(m>1){x/=m;y/=m;}\n' +
          'st.style.transform="translate("+(x*mx).toFixed(1)+"px,"+(y*my).toFixed(1)+"px)";rd.textContent=Math.round(x*100)+", "+Math.round(y*100);}\n' +
          'function rest(){st.style.transform="";rd.textContent="0, 0";}\n' +
          'st.addEventListener("pointerdown",function(e){st.setPointerCapture(e.pointerId);st.addEventListener("pointermove",move);st.addEventListener("pointerup",function up(){st.removeEventListener("pointermove",move);rest();st.removeEventListener("pointerup",up);});});\n' +
          'api.onCleanup(function(){rest();});',
        cfg: [range('Width', '--w', 190, 340, 2, 240, 'px'), col('Label', '--c2', C2)]
      });
    });

    /* ---- 3. rotary dials (8) ---- */
    ['Gain Dial', 'Tone Dial', 'Speed Dial', 'Power Dial', 'Focus Dial', 'Zoom Dial', 'Temp Dial', 'Rate Dial'].forEach(function (name, vi) {
      pool.push({
        family: 'ctdial', id: 'ctdial-' + vi, title: name,
        tags: ['css', 'dial', 'rotary', 'ui'],
        html: '<div class="ct dl"><h4>' + name + ' <em>' + [0, 25, 50, 75, 100, 33, 66, 12][vi] + '%</em></h4>' +
          '<div class="dial"><i class="face"><b></b></i><svg viewBox="0 0 100 100" class="arc">' +
          Array.apply(null, { length: 11 }).map(function (_, i) { var a = -135 + i * 27; var r = Math.PI * a / 180; var x1 = 50 + Math.cos(r) * 40, y1 = 50 + Math.sin(r) * 40, x2 = 50 + Math.cos(r) * 46, y2 = 50 + Math.sin(r) * 46; return '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '"/>'; }).join('') +
          '</svg></div></div>',
        css: join([
          ctlBase,
          '.ct h4{margin:0 0 10px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8f92b3;display:flex;justify-content:space-between}',
          '.ct h4 em{font-style:normal;color:var(--c2,' + C2 + ')}',
          '.dl .dial{position:relative;width:120px;height:120px;margin:0 auto}',
          '.dl .arc{position:absolute;inset:0;stroke:rgba(255,255,255,.25);stroke-width:3}',
          '.dl .face{position:absolute;inset:14%;border-radius:50%;background:radial-gradient(circle at 35% 30%,#2a2a3d,#15151f 70%);border:1px solid rgba(255,255,255,.1);animation:ct-dl' + vi + ' var(--dur,5s) ease-in-out infinite}',
          '.dl .face b{position:absolute;left:50%;top:8%;width:4px;height:34%;margin-left:-2px;border-radius:4px;background:var(--c1,' + C1 + ');box-shadow:0 0 10px var(--c1,' + C1 + ')}',
          kf('ct-dl' + vi, [
            '0%,100%{transform:rotate(-135deg)}50%{transform:rotate(135deg)}',
            '0%,100%{transform:rotate(45deg)}50%{transform:rotate(-90deg)}',
            '0%,100%{transform:rotate(0deg)}25%{transform:rotate(120deg)}50%{transform:rotate(-60deg)}75%{transform:rotate(60deg)}',
            '0%,100%{transform:rotate(-135deg)}10%,90%{transform:rotate(135deg)}',
            '0%,100%{transform:rotate(-40deg)}50%{transform:rotate(40deg)}',
            '0%,100%{transform:rotate(90deg)}50%{transform:rotate(-45deg)}',
            '0%,45%,100%{transform:rotate(-135deg)}50%,95%{transform:rotate(135deg)}',
            '0%,100%{transform:rotate(0deg)}50%{transform:rotate(360deg)}'
          ][vi])
        ]),
        cfg: [range('Width', '--w', 180, 320, 2, 240, 'px'), range('Cycle', '--dur', 1.5, 10, .1, 5, 's'),
          col('Pointer', '--c1', C1), col('Label', '--c2', C2)]
      });
    });

    /* ---- 4. breaker boards (8) ---- */
    var breakerNames = ['Main Breaker', 'Panel A', 'Panel B', 'Server Rack', 'Stage Power', 'Substation', 'Fuse Board', 'Kill Switch'];
    breakerNames.forEach(function (name, vi) {
      var n = 4 + (vi % 3) * 2;
      pool.push({
        family: 'ctbrkr', id: 'ctbrkr-' + vi, title: name,
        tags: ['css', 'switch', 'breaker', 'ui'],
        html: '<div class="ct bk"><h4>' + name + ' <em>ON/OFF</em></h4><div class="board">' +
          Array.apply(null, { length: n }).map(function (_, i) { return '<div class="sw' + ((i + vi) % 3 ? ' on' : '') + '" style="--i:' + i + '"><i></i></div>'; }).join('') + '</div></div>',
        css: join([
          ctlBase,
          '.ct h4{margin:0 0 12px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8f92b3;display:flex;justify-content:space-between}',
          '.ct h4 em{font-style:normal;color:var(--c2,' + C2 + ')}',
          '.bk .board{display:flex;gap:12px;justify-content:center}',
          '.bk .sw{position:relative;width:26px;height:58px;border-radius:9px;background:#0d0d15;border:1px solid rgba(255,255,255,.08)}',
          '.bk .sw i{position:absolute;left:4px;right:4px;height:24px;border-radius:6px;background:linear-gradient(180deg,#3a3a50,#22222f);transition:none}',
          '.bk .sw i{animation:ct-bk' + vi + ' var(--dur,3s) ease-in-out infinite;animation-delay:calc(var(--i) * var(--st,.5s))}',
          '.bk .sw.on i{background:linear-gradient(180deg,var(--c5,' + C5 + '),#1f7a55)}',
          kf('ct-bk' + vi, [
            '0%,100%{top:4px}50%{top:30px}',
            '0%,100%{top:30px}50%{top:4px}',
            '0%,45%,100%{top:4px}50%,95%{top:30px}',
            '0%,100%{top:4px}20%,60%{top:30px}80%{top:4px}'
          ][vi % 4])
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 240, 'px'), range('Cycle', '--dur', 1, 6, .1, 3, 's'), range('Stagger', '--st', .1, 1.5, .05, .5, 's'),
          col('On', '--c5', C5), col('Label', '--c2', C2)]
      });
    });

    /* ---- 5. big segmented controls (6) ---- */
    [['Day', 'Night', 'Auto'], ['Fast', 'Med', 'Slow'], ['A', 'B', 'C', 'D'], ['In', 'Out', 'Loop'], ['Lo', 'Mid', 'Hi'], ['1', '2', '3', '4', '5']].forEach(function (opts, vi) {
      pool.push({
        family: 'ctseg', id: 'ctseg-' + vi, title: opts.join(' / ') + ' Segment',
        tags: ['css', 'segmented', 'tabs', 'ui'],
        html: '<div class="ct sg"><h4>Mode <em>auto</em></h4><div class="seg">' +
        opts.map(function (o, i) { return '<span' + (i === 0 ? ' class="on"' : '') + ' style="--i:' + i + '">' + o + '</span>'; }).join('') +
        '<i class="pill" style="--n:' + opts.length + '"></i></div></div>',
        css: join([
          ctlBase,
          '.ct h4{margin:0 0 12px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8f92b3;display:flex;justify-content:space-between}',
          '.ct h4 em{font-style:normal;color:var(--c2,' + C2 + ')}',
          '.sg .seg{position:relative;display:flex;background:rgba(255,255,255,.05);border-radius:12px;padding:4px}',
          '.sg .seg span{flex:1;text-align:center;padding:8px 4px;font-size:12px;color:#8f92b3;border-radius:9px;position:relative;z-index:1}',
          '.sg .seg .on{color:#fff}',
          '.sg .pill{position:absolute;top:4px;bottom:4px;left:4px;width:calc((100% - 8px) / var(--n,3));border-radius:9px;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));animation:ct-sg' + vi + ' var(--dur,4s) cubic-bezier(.6,0,.3,1) infinite}',
          kf('ct-sg' + vi, Array.apply(null, { length: opts.length }).map(function (_, i) { return (i / (opts.length - 1 || 1) * 100).toFixed(1) + '%{transform:translateX(' + (i * 100) + '%)}'; }).join(' '))
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 240, 'px'), range('Cycle', '--dur', 1.5, 9, .1, 4, 's'),
          col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
      });
    });

    /* ---- 6. colour mixers (8) ---- */
    [
      ['Coral Blend', C1, C3], ['Sea Blend', C2, C5], ['Dusk Blend', C3, C2],
      ['Candy Blend', C3, C4], ['Forest Blend', C5, C2], ['Royal Blend', C1, C2],
      ['Sunset Blend', C4, C3], ['Mint Blend', C5, C1]
    ].forEach(function (v, vi) {
      pool.push({
        family: 'ctmix', id: 'ctmix-' + vi, title: v[0],
        tags: ['css', 'colour', 'mixer', 'ui'],
        html: '<div class="ct mx"><h4>' + v[0] + ' <em>mix</em></h4>' +
          '<div class="slide"><i class="a" style="background:' + v[1] + '"></i><i class="b" style="background:' + v[2] + '"></i></div>' +
          '<div class="well"><b></b></div><p class="lab">' + v[1] + ' + ' + v[2] + '</p></div>',
        css: join([
          ctlBase,
          '.ct h4{margin:0 0 12px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8f92b3;display:flex;justify-content:space-between}',
          '.ct h4 em{font-style:normal;color:var(--c2,' + C2 + ')}',
          '.mx .slide{position:relative;height:44px;border-radius:10px;overflow:hidden;display:flex}',
          '.mx .slide i{flex:1;transition:width var(--dur,2.4s) ease-in-out;animation:ct-mx' + vi + ' var(--dur,2.4s) ease-in-out infinite}',
          '.mx .well{height:10px;border-radius:99px;margin-top:10px;background:linear-gradient(90deg,' + v[1] + ',' + v[2] + ');background-size:var(--sh,200%) 100%;animation:ct-mxw' + vi + ' var(--dur,2.4s) ease-in-out infinite}',
          '.mx .lab{margin:8px 0 0;font:600 10px "JetBrains Mono",monospace;color:#8f92b3}',
          kf('ct-mx' + vi, '0%,100%{width:var(--wa,30%)}50%{width:var(--wb,70%)}'),
          kf('ct-mxw' + vi, '0%,100%{background-position:0% 0}50%{background-position:100% 0}')
        ]),
        cfg: [range('Width', '--w', 190, 340, 2, 240, 'px'), range('Cycle', '--dur', .8, 6, .1, 2.4, 's'), col('Label', '--c2', C2)]
      });
    });

    /* ---- 7. channel strips (8) ---- */
    var stripNames = ['Strip 1', 'Strip 2', 'Strip 3', 'Strip 4', 'Strip 5', 'Strip 6', 'Strip 7', 'Strip 8'];
    stripNames.forEach(function (name, vi) {
      pool.push({
        family: 'ctstrip', id: 'ctstrip-' + vi, title: name + ' Channel',
        tags: ['css', 'fader', 'led', 'ui'],
        html: '<div class="ct ch"><h4>' + name + ' <em>-' + (vi + 1) + 'dB</em></h4><div class="strip">' +
          '<div class="leds">' + Array.apply(null, { length: 6 }).map(function (_, i) { return '<i style="--i:' + i + '"></i>'; }).join('') + '</div>' +
          '<div class="fl"><i class="rail"></i><i class="cap"></i></div></div></div>',
        css: join([
          ctlBase,
          '.ct h4{margin:0 0 12px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8f92b3;display:flex;justify-content:space-between}',
          '.ct h4 em{font-style:normal;color:var(--c2,' + C2 + ')}',
          '.ch .strip{display:flex;gap:18px;align-items:center;justify-content:center}',
          '.ch .leds{display:flex;flex-direction:column;gap:5px}',
          '.ch .leds i{width:12px;height:8px;border-radius:3px;background:rgba(255,255,255,.08);animation:ct-ch' + vi + ' var(--dur,1.6s) steps(1,end) infinite;animation-delay:calc(var(--i) * -.18s)}',
          '.ch .leds i:nth-child(n+4){animation-name:ct-ch' + vi + 'r}',
          '.ch .fl{position:relative;width:20px}',
          '.ch .rail{display:block;width:4px;height:120px;border-radius:99px;background:rgba(255,255,255,.1);margin:0 auto;position:relative}',
          '.ch .rail::after{content:"";position:absolute;left:50%;bottom:0;top:calc((1 - var(--fill,' + [.6, .3, .8, .45, .7, .2, .55, .35][vi] + ')) * 100%);width:2px;margin-left:-1px;border-radius:99px;background:var(--c1,' + C1 + ')}',
          '.ch .cap{position:absolute;left:50%;top:calc((1 - var(--fill,' + [.6, .3, .8, .45, .7, .2, .55, .35][vi] + ')) * 120px);width:20px;height:10px;margin-left:-10px;border-radius:3px;background:linear-gradient(180deg,#f2f3fa,#b9bcd8);box-shadow:0 3px 8px rgba(0,0,0,.5);animation:ct-chc' + vi + ' var(--dur,2.8s) ease-in-out infinite}',
          kf('ct-ch' + vi, '0%,100%{background:rgba(255,255,255,.08);box-shadow:none}50%{background:var(--c5,' + C5 + ');box-shadow:0 0 8px var(--c5,' + C5 + ')}'),
          kf('ct-ch' + vi + 'r', '0%,100%{background:rgba(255,255,255,.08)}50%{background:var(--c3,' + C3 + ');box-shadow:0 0 8px var(--c3,' + C3 + ')}'),
          kf('ct-chc' + vi, '0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}')
        ]),
        cfg: [range('Width', '--w', 180, 320, 2, 240, 'px'), range('Cycle', '--dur', .6, 5, .1, 2, 's'),
          col('Fill', '--c1', C1), col('LED', '--c5', C5), col('Peak', '--c3', C3), col('Label', '--c2', C2)]
      });
    });

    /* ---- 8. keypads (8) ---- */
    var padNames = ['PIN Pad', 'Code Pad', 'Number Pad', 'Dial Pad', 'Vault Pad', 'Grid Pad', 'Hex Pad', 'Star Pad'];
    padNames.forEach(function (name, vi) {
      var keys = vi === 6 ? ['A', 'B', 'C', 'D', 'E', 'F'] : vi === 7 ? ['1', '2', '3', '4', '5', '6', '7', '8', '*'] : ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      pool.push({
        family: 'ctkey', id: 'ctkey-' + vi, title: name,
        tags: ['css', 'keypad', 'ui'],
        html: '<div class="ct kp"><h4>' + name + ' <em>press</em></h4><div class="grid">' +
          keys.map(function (k, i) { return '<i class="key" style="--i:' + i + '">' + k + '</i>'; }).join('') + '</div></div>',
        css: join([
          ctlBase,
          '.ct h4{margin:0 0 12px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8f92b3;display:flex;justify-content:space-between}',
          '.ct h4 em{font-style:normal;color:var(--c2,' + C2 + ')}',
          '.kp .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}',
          '.kp .key{position:relative;height:40px;border-radius:9px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);display:grid;place-items:center;font:700 14px "JetBrains Mono",monospace;color:#c6c8dd;animation:ct-kp' + vi + ' var(--dur,2.6s) ease-out infinite;animation-delay:calc(var(--i) * var(--st,.28s))}',
          kf('ct-kp' + vi, [
            '0%,100%{transform:scale(1);background:rgba(255,255,255,.06)}8%{transform:scale(.92);background:var(--c1,' + C1 + ');color:#fff}16%{transform:scale(1)}',
            '0%,100%{transform:translateY(0)}8%{transform:translateY(3px)}16%{transform:translateY(0)}',
            '0%,100%{filter:brightness(1)}8%{filter:brightness(1.8);transform:scale(.94)}16%{filter:brightness(1)}',
            '0%,100%{transform:scale(1)}8%{transform:scale(1.06)}16%{transform:scale(1)}'
          ][vi % 4])
        ]),
        cfg: [range('Width', '--w', 180, 320, 2, 240, 'px'), range('Cycle', '--dur', 1, 6, .1, 2.6, 's'), range('Stagger', '--st', .05, .6, .01, .28, 's'),
          col('Press', '--c1', C1), col('Label', '--c2', C2)]
      });
    });

    /* ---- 9. typing key rows (8) ---- */
    var typeWords = [['M', 'O', 'T', 'I', 'O', 'N'], ['L', 'A', 'B'], ['C', 'S', 'S'], ['J', 'S'], ['H', 'T', 'M', 'L'], ['G', 'I', 'T'], ['A', 'E', 'S'], ['U', 'I']];
    typeWords.forEach(function (keys, vi) {
      pool.push({
        family: 'cttype', id: 'cttype-' + vi, title: keys.join('') + ' Typing Keys',
        tags: ['css', 'keys', 'typing', 'ui'],
        html: '<div class="ct ty"><h4>Typing <em>' + keys.join('') + '</em></h4><div class="keys">' +
          keys.map(function (k, i) { return '<i style="--i:' + i + '">' + k + '</i>'; }).join('') + '</div></div>',
        css: join([
          ctlBase,
          '.ct h4{margin:0 0 12px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8f92b3;display:flex;justify-content:space-between}',
          '.ct h4 em{font-style:normal;color:var(--c2,' + C2 + ')}',
          '.ty .keys{display:flex;gap:8px;justify-content:center}',
          '.ty .keys i{width:38px;height:44px;border-radius:8px;background:linear-gradient(180deg,#232336,#171724);border:1px solid rgba(255,255,255,.1);box-shadow:0 4px 0 #0c0c14;display:grid;place-items:center;font:800 16px system-ui,sans-serif;color:#c6c8dd;animation:ct-ty' + vi + ' var(--dur,2s) cubic-bezier(.4,0,.4,1) infinite;animation-delay:calc(var(--i) * var(--st,.24s))}',
          kf('ct-ty' + vi, [
            '0%,12%,100%{transform:translateY(0);box-shadow:0 4px 0 #0c0c14}6%{transform:translateY(4px);box-shadow:0 0 0 #0c0c14;color:#fff}',
            '0%,100%{transform:translateY(0)}8%{transform:translateY(4px) rotate(-1deg);color:#fff}16%{transform:translateY(0)}',
            '0%,100%{filter:brightness(1)}8%{filter:brightness(1.6);transform:translateY(3px)}16%{filter:brightness(1)}',
            '0%,100%{transform:translateY(0) scale(1)}8%{transform:translateY(3px) scale(.96);color:var(--c2,' + C2 + ')}16%{transform:none}'
          ][vi % 4])
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 240, 'px'), range('Cycle', '--dur', .8, 5, .1, 2, 's'), range('Stagger', '--st', .05, .6, .01, .24, 's'),
          col('Key', '--c2', C2)]
      });
    });

    /* ---- 10. big steppers (6) ---- */
    ['Count', 'Price', 'Level', 'Zoom', 'Temp', 'Speed'].forEach(function (name, vi) {
      pool.push({
        family: 'ctstep', id: 'ctstep-' + vi, title: name + ' Stepper',
        tags: ['css', 'stepper', 'ui'],
        html: '<div class="ct st"><h4>' + name + ' <em>units</em></h4>' +
          '<button class="btn m">−</button><div class="mid"><b class="v">0' + vi + '</b><i></i></div><button class="btn p">+</button></div>',
        css: join([
          ctlBase,
          '.ct h4{margin:0 0 12px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8f92b3;display:flex;justify-content:space-between}',
          '.ct h4 em{font-style:normal;color:var(--c2,' + C2 + ')}',
          '.st{display:flex;gap:10px;align-items:center;justify-content:center}',
          '.st .btn{width:48px;height:48px;border-radius:12px;border:0;cursor:pointer;background:rgba(255,255,255,.07);color:#fff;font:800 20px system-ui,sans-serif;animation:ct-st' + vi + ' var(--dur,2.4s) ease-out infinite}',
          '.st .btn.p{animation-delay:calc(var(--dur,2.4s) / -2);background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '))}',
          '.st .mid{position:relative;width:64px;height:64px;border-radius:12px;background:#0d0d15;border:1px solid rgba(255,255,255,.08);display:grid;place-items:center;overflow:hidden}',
          '.st .mid b{font:800 24px "JetBrains Mono",monospace;animation:ct-stv' + vi + ' var(--dur,2.4s) steps(1,end) infinite}',
          kf('ct-st' + vi, '0%,100%{transform:scale(1)}10%{transform:scale(.9)}20%{transform:scale(1)}'),
          kf('ct-stv' + vi, '0%{transform:translateY(0)}8%{transform:translateY(-100%)}20%,100%{transform:translateY(0)}')
        ]),
        cfg: [range('Width', '--w', 190, 340, 2, 240, 'px'), range('Cycle', '--dur', 1, 6, .1, 2.4, 's'),
          col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
      });
    });

    /* ---- 11. arc meters (8) ---- */
    ['RPM Gauge', 'Signal Meter', 'Pressure Arc', 'Throttle Arc', 'Charge Arc', 'Volume Arc', 'Stress Arc', 'Power Arc'].forEach(function (name, vi) {
      pool.push({
        family: 'ctarc', id: 'ctarc-' + vi, title: name,
        tags: ['css', 'gauge', 'arc', 'ui'],
        html: '<div class="ct ar"><h4>' + name + ' <em>' + [82, 45, 67, 30, 91, 55, 74, 20][vi] + '%</em></h4>' +
          '<div class="gauge"><svg viewBox="0 0 100 60" class="gbg"><path d="M10 55 A40 40 0 0 1 90 55" fill="none"/></svg>' +
          '<svg viewBox="0 0 100 60" class="gval"><path d="M10 55 A40 40 0 0 1 90 55" fill="none"/></svg>' +
          '<i class="needle"></i></div></div>',
        css: join([
          ctlBase,
          '.ct h4{margin:0 0 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8f92b3;display:flex;justify-content:space-between}',
          '.ct h4 em{font-style:normal;color:var(--c2,' + C2 + ')}',
          '.ar .gauge{position:relative;width:170px;height:105px;margin:0 auto}',
          '.ar svg{position:absolute;inset:0;width:100%;height:100%}',
          '.ar .gbg path{stroke:rgba(255,255,255,.1);stroke-width:9;stroke-linecap:round}',
          '.ar .gval path{stroke:' + (vi % 3 === 0 ? 'var(--c1,' + C1 + ')' : vi % 3 === 1 ? 'var(--c2,' + C2 + ')' : 'var(--c5,' + C5 + ')') + ';stroke-width:9;stroke-linecap:round;stroke-dasharray:126;stroke-dashoffset:126;animation:ct-ar' + vi + ' var(--dur,3s) cubic-bezier(.5,.1,.3,1) infinite}',
          '.ar .needle{position:absolute;left:50%;bottom:5px;width:3px;height:42px;margin-left:-1.5px;border-radius:3px;background:#fff;transform-origin:50% 100%;animation:ct-ar' + vi + 'n var(--dur,3s) cubic-bezier(.5,.1,.3,1) infinite}',
          kf('ct-ar' + vi, '0%,100%{stroke-dashoffset:' + (126 - 126 * [.82, .45, .67, .3, .91, .55, .74, .2][vi]).toFixed(0) + '}50%{stroke-dashoffset:' + (126 - 126 * [.35, .8, .2, .7, .4, .95, .3, .85][vi]).toFixed(0) + '}'),
          kf('ct-ar' + vi + 'n', '0%,100%{transform:rotate(' + (-90 + 180 * [.82, .45, .67, .3, .91, .55, .74, .2][vi]).toFixed(0) + 'deg)}50%{transform:rotate(' + (-90 + 180 * [.35, .8, .2, .7, .4, .95, .3, .85][vi]).toFixed(0) + 'deg)}')
        ]),
        cfg: [range('Width', '--w', 190, 340, 2, 240, 'px'), range('Cycle', '--dur', 1, 8, .1, 3, 's'),
          col('Arc', '--c1', C1), col('Arc B', '--c2', C2), col('Arc C', '--c5', C5)]
      });
    });

    /* ---- 12. thermostats (4) ---- */
    ['Heat', 'Cool', 'Smart', 'Eco'].forEach(function (name, vi) {
      pool.push({
        family: 'ctthermo', id: 'ctthermo-' + vi, title: name + ' Thermostat',
        tags: ['css', 'dial', 'temperature', 'ui'],
        html: '<div class="ct th"><div class="ring"><b>' + (16 + vi * 2) + '°</b><i></i></div>' +
        '<p class="mode">' + name + ' mode</p><div class="ticks">' + Array.apply(null, { length: 5 }).map(function (_, i) { return '<i style="--i:' + i + '"></i>'; }).join('') + '</div></div>',
        css: join([
          ctlBase,
          '.th .ring{position:relative;width:130px;height:130px;margin:0 auto;border-radius:50%;background:conic-gradient(from 210deg,var(--c3,' + C3 + ') 0 var(--deg,' + (40 + vi * 30) + 'deg),rgba(255,255,255,.08) var(--deg,' + (40 + vi * 30) + 'deg));animation:ct-th' + vi + ' var(--dur,6s) ease-in-out infinite;display:grid;place-items:center}',
          '.th .ring b{position:absolute;width:88%;height:88%;border-radius:50%;background:#15151f;display:grid;place-items:center;font:800 26px "JetBrains Mono",monospace}',
          '.th .ring i{position:absolute;inset:10%;border-radius:50%;border:2px dashed rgba(255,255,255,.12);animation:ct-thin' + vi + ' var(--dur,12s) linear infinite}',
          '.th .mode{margin:12px 0 8px;text-align:center;font-size:12px;color:#8f92b3;letter-spacing:.08em;text-transform:uppercase}',
          '.th .ticks{display:flex;gap:8px;justify-content:center}',
          '.th .ticks i{width:22px;height:5px;border-radius:99px;background:rgba(255,255,255,.1);animation:ct-tht' + vi + ' var(--dur,2.6s) ease-in-out infinite;animation-delay:calc(var(--i) * -.4s)}',
          kf('ct-th' + vi, '0%,100%{--deg:' + (20 + vi * 10) + 'deg;filter:brightness(1)}50%{--deg:' + (120 + vi * 40) + 'deg;filter:brightness(1.15)}'),
          kf('ct-thin' + vi, 'to{transform:rotate(1turn)}'),
          kf('ct-tht' + vi, '0%,100%{background:rgba(255,255,255,.1)}50%{background:var(--c3,' + C3 + ')}')
        ]),
        cfg: [range('Width', '--w', 190, 320, 2, 240, 'px'), range('Cycle', '--dur', 2, 12, .1, 6, 's'), col('Heat', '--c3', C3)]
      });
    });

    /* ---- 13. big switches (8) ---- */
    var swNames = ['Neon Toggle', 'Day / Night', 'Power Gate', 'Slab Switch', 'Orbit Toggle', 'Wave Toggle', 'Gate Switch', 'Beam Toggle'];
    swNames.forEach(function (name, vi) {
      pool.push({
        family: 'ctsw2', id: 'ctsw2-' + vi, title: name,
        tags: ['css', 'toggle', 'switch', 'ui'],
        html: '<div class="ct tg"><h4>' + name + ' <em>state</em></h4><div class="sw"><i class="track"><b></b></i></div></div>',
        css: join([
          ctlBase,
          '.ct h4{margin:0 0 14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8f92b3;display:flex;justify-content:space-between}',
          '.ct h4 em{font-style:normal;color:var(--c2,' + C2 + ')}',
          '.tg .sw{display:grid;place-items:center}',
          '.tg .track{position:relative;width:110px;height:56px;border-radius:99px;background:#0d0d15;border:1px solid rgba(255,255,255,.1);animation:ct-tg' + vi + 't var(--dur,3s) ease-in-out infinite}',
          '.tg .track b{position:absolute;top:6px;left:6px;width:44px;height:44px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#c3c6e4 60%,#8e92c2);box-shadow:0 4px 12px rgba(0,0,0,.5);animation:ct-tg' + vi + ' var(--dur,3s) cubic-bezier(.5,1.4,.4,1) infinite}',
          kf('ct-tg' + vi, [
            '0%,45%,100%{transform:translateX(0)}55%,95%{transform:translateX(54px)}',
            '0%,45%,100%{transform:translateX(54px)}55%,95%{transform:translateX(0)}',
            '0%,100%{transform:translateX(0)}50%{transform:translateX(54px)}',
            '0%,100%{transform:translateX(0) scale(1)}20%{transform:translateX(20px) scale(1.1)}45%{transform:translateX(54px) scale(1)}',
            '0%,100%{transform:translate(0,0)}50%{transform:translate(54px,-2px) rotate(180deg)}',
            '0%,100%{transform:translateX(0)}25%{transform:translateX(54px)}75%{transform:translateX(0)}',
            '0%,100%{transform:translateX(0)}50%{transform:translateX(54px) scaleY(.86)}',
            '0%,100%{transform:translateX(0)}50%{transform:translateX(54px) scaleX(1.06)}'
          ][vi]),
          kf('ct-tg' + vi + 't', [
            '0%,45%,100%{background:#0d0d15}55%,95%{background:color-mix(in srgb,var(--c5,' + C5 + ') 30%,#0d0d15)}',
            '0%,45%,100%{background:color-mix(in srgb,var(--c1,' + C1 + ') 30%,#0d0d15)}55%,95%{background:#0d0d15}',
            '0%,100%{background:#0d0d15;box-shadow:none}50%{background:color-mix(in srgb,var(--c2,' + C2 + ') 34%,#0d0d15);box-shadow:0 0 18px color-mix(in srgb,var(--c2,' + C2 + ') 40%,transparent)}',
            '0%,100%{background:#0d0d15}50%{background:color-mix(in srgb,var(--c3,' + C3 + ') 32%,#0d0d15)}',
            '0%,100%{background:#0d0d15}50%{background:color-mix(in srgb,var(--c4,' + C4 + ') 30%,#0d0d15)}',
            '0%,100%{background:#0d0d15}25%,75%{background:color-mix(in srgb,var(--c5,' + C5 + ') 26%,#0d0d15)}',
            '0%,100%{background:#0d0d15}50%{background:color-mix(in srgb,var(--c1,' + C1 + ') 30%,#0d0d15)}',
            '0%,100%{background:#0d0d15}50%{background:color-mix(in srgb,var(--c2,' + C2 + ') 30%,#0d0d15)}'
          ][vi])
        ]),
        cfg: [range('Width', '--w', 180, 320, 2, 240, 'px'), range('Cycle', '--dur', 1, 8, .1, 3, 's'),
          col('A', '--c1', C1), col('B', '--c2', C2), col('C', '--c3', C3), col('D', '--c4', C4), col('E', '--c5', C5)]
      });
    });

    /* ---- 14. lever switches (6) ---- */
    ['Master Lever', 'Engine Lever', 'Signal Lever', 'Bridge Lever', 'Gate Lever', 'Vault Lever'].forEach(function (name, vi) {
      pool.push({
        family: 'ctlever', id: 'ctlever-' + vi, title: name,
        tags: ['css', 'lever', 'switch', 'ui'],
        html: '<div class="ct lv"><h4>' + name + ' <em>ON/OFF</em></h4><div class="slot"><i class="base"></i><i class="arm"><b></b></i></div></div>',
        css: join([
          ctlBase,
          '.ct h4{margin:0 0 12px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8f92b3;display:flex;justify-content:space-between}',
          '.ct h4 em{font-style:normal;color:var(--c2,' + C2 + ')}',
          '.lv .slot{position:relative;width:140px;height:96px;margin:0 auto}',
          '.lv .base{position:absolute;left:50%;bottom:14px;width:64px;height:14px;margin-left:-32px;border-radius:8px;background:linear-gradient(180deg,#2a2a3d,#14141f);box-shadow:inset 0 2px 6px rgba(0,0,0,.6)}',
          '.lv .arm{position:absolute;left:50%;bottom:22px;width:10px;height:64px;margin-left:-5px;transform-origin:50% 100%;border-radius:6px 6px 4px 4px;background:linear-gradient(180deg,#f2f3fa,#8e92c2);animation:ct-lv' + vi + ' var(--dur,2.6s) cubic-bezier(.55,.1,.3,1.2) infinite}',
          '.lv .arm b{position:absolute;top:-16px;left:50%;width:26px;height:26px;margin-left:-13px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,var(--c1,' + C1 + ') 65%);box-shadow:0 0 12px var(--c1,' + C1 + ')}',
          kf('ct-lv' + vi, [
            '0%,40%,100%{transform:rotate(-32deg)}55%,85%{transform:rotate(32deg)}',
            '0%,40%,100%{transform:rotate(32deg)}55%,85%{transform:rotate(-32deg)}',
            '0%,100%{transform:rotate(-32deg)}50%{transform:rotate(32deg)}',
            '0%,100%{transform:rotate(-42deg)}50%{transform:rotate(42deg)}',
            '0%,55%,100%{transform:rotate(-32deg)}40%,70%{transform:rotate(32deg)}',
            '0%,100%{transform:rotate(-28deg)}50%{transform:rotate(28deg) scaleY(1.02)}'
          ][vi])
        ]),
        cfg: [range('Width', '--w', 190, 340, 2, 240, 'px'), range('Cycle', '--dur', 1.2, 6, .1, 2.6, 's'),
          col('Knob', '--c1', C1), col('Label', '--c2', C2)]
      });
    });

    K.add('controls', pool);
  })();

  /* ══════════════════════════════ SVG & LINES (86) ══════════════════════════════ */
  (function () {
    var pool = [];
    var svgBase = '.sv{width:var(--w,260px);display:grid;place-items:center}' +
      '.sv svg{width:100%;height:auto;display:block;overflow:visible}';

    /* ---- 1. constellations (8) ---- */
    var consts = [
      ['Drake', 'M20 40 L45 25 L70 35 L95 18 L120 30 L150 15 L175 28', [[20, 40], [45, 25], [70, 35], [95, 18], [120, 30], [150, 15], [175, 28]]],
      ['Lyra', 'M60 20 L95 35 L110 70 L80 85 L45 70 L30 40 Z', [[60, 20], [95, 35], [110, 70], [80, 85], [45, 70], [30, 40]]],
      ['Comet', 'M30 80 L60 60 L90 45 L130 30', [[30, 80], [60, 60], [90, 45], [130, 30]]],
      ['Bridge', 'M20 60 L50 40 L80 55 L110 35 L140 50 L170 30', [[20, 60], [50, 40], [80, 55], [110, 35], [140, 50], [170, 30]]],
      ['Sail', 'M60 85 L60 25 L115 60 L60 60', [[60, 85], [60, 25], [115, 60], [60, 60]]],
      ['Crown', 'M35 70 L55 35 L80 60 L100 30 L120 60 L140 40', [[35, 70], [55, 35], [80, 60], [100, 30], [120, 60], [140, 40]]],
      ['Orbit', 'M30 50 L70 25 L120 35 L155 60 L110 80 L60 75', [[30, 50], [70, 25], [120, 35], [155, 60], [110, 80], [60, 75]]],
      ['Spark', 'M85 20 L85 80 M45 40 L125 60 M125 40 L45 60', [[85, 20], [85, 80], [45, 40], [125, 60], [125, 40], [45, 60]]]
    ];
    consts.forEach(function (v, vi) {
      pool.push({
        family: 'svconst', id: 'svconst-' + vi, title: v[0] + ' Constellation',
        tags: ['css', 'svg', 'constellation', 'big'],
        html: '<div class="sv"><svg viewBox="0 0 200 100">' +
          '<path class="ln" d="' + v[1] + '" fill="none"/>' +
          v[2].map(function (p, i) { return '<circle class="st" style="--i:' + i + '" cx="' + p[0] + '" cy="' + p[1] + '" r="' + (2 + (i % 3)) + '"/>'; }).join('') +
          '</svg></div>',
        css: join([
          svgBase,
          '.sv .ln{stroke:var(--c2,' + C2 + ');stroke-width:1.4;opacity:.55;stroke-dasharray:300;stroke-dashoffset:300;animation:sv-cn' + vi + 'l var(--dur,4s) ease-in-out infinite}',
          '.sv .st{fill:var(--c1,' + C1 + ');transform-box:fill-box;transform-origin:center;animation:sv-cn' + vi + 's var(--dur,4s) ease-in-out infinite;animation-delay:calc(var(--i) * .22s)}',
          kf('sv-cn' + vi + 'l', '0%{stroke-dashoffset:300}45%,100%{stroke-dashoffset:0}'),
          kf('sv-cn' + vi + 's', '0%,100%{opacity:.4;transform:scale(1)}30%,70%{opacity:1;transform:scale(1.5)}')
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', 1.5, 8, .1, 4, 's'),
          col('Star', '--c1', C1), col('Line', '--c2', C2)]
      });
    });

    /* ---- 2. multi-line waves (8) ---- */
    var waveCols = [[C1, C2], [C2, C3], [C3, C4], [C4, C5], [C5, C1], [C1, C3], [C2, C4], [C3, C5]];
    waveCols.forEach(function (c, vi) {
      pool.push({
        family: 'svwavel', id: 'svwavel-' + vi, title: ['Tide Lines Violet', 'Tide Lines Cyan', 'Tide Lines Rose', 'Tide Lines Amber', 'Tide Lines Mint', 'Tide Lines Magenta', 'Tide Lines Dual', 'Tide Lines Hot'][vi],
        tags: ['css', 'svg', 'wave'],
        html: '<div class="sv"><svg viewBox="0 0 200 90">' +
          [0, 1, 2, 3, 4].map(function (r) {
            var y = 18 + r * 14;
            var d = 'M-10 ' + y;
            for (var x = 0; x <= 220; x += 20) d += ' Q ' + (x + 10) + ' ' + (y - (8 + vi * 2)) + ' ' + (x + 20) + ' ' + y;
            return '<path class="w' + r + '" d="' + d + '" fill="none"/>';
          }).join('') +
          '</svg></div>',
        css: join([
          svgBase,
          '.sv .w0{stroke:' + c[0] + ';stroke-width:2.4;stroke-dasharray:14 10;animation:sv-wv' + vi + ' var(--dur,2.4s) linear infinite}',
          '.sv .w1{stroke:' + c[1] + ';stroke-width:2;stroke-dasharray:10 8;opacity:.8;animation:sv-wv' + vi + ' var(--dur,2.4s) linear infinite reverse}',
          '.sv .w2{stroke:' + c[0] + ';stroke-width:1.6;stroke-dasharray:6 6;opacity:.6;animation:sv-wv2 var(--dur,3.4s) linear infinite}',
          '.sv .w3{stroke:' + c[1] + ';stroke-width:1.3;stroke-dasharray:4 5;opacity:.45;animation:sv-wv3 var(--dur,3.4s) linear infinite reverse}',
          '.sv .w4{stroke:' + c[0] + ';stroke-width:1;stroke-dasharray:3 4;opacity:.3;animation:sv-wv4 var(--dur,4.6s) linear infinite}',
          kf('sv-wv' + vi, 'to{transform:translateX(-40px)}'),
          kf('sv-wv2', 'to{transform:translateX(-40px)}'),
          kf('sv-wv3', 'to{transform:translateX(-40px)}'),
          kf('sv-wv4', 'to{transform:translateX(-40px)}')
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', .8, 6, .1, 2.4, 's')]
      });
    });

    /* ---- 3. gear trains (8) ---- */
    var gearNames = ['Clockworks', 'Turbine', 'Engine Deck', 'Winch', 'Transmission', 'Chrono', 'Mill', 'Turbo'];
    gearNames.forEach(function (name, vi) {
      var teeth = 10 + (vi % 3) * 2;
      var d1 = (2 * 34 * Math.PI / teeth / 2).toFixed(2);
      var d2 = (2 * 24 * Math.PI / 12 / 2).toFixed(2);
      var d3 = (2 * 14 * Math.PI / 8 / 2).toFixed(2);
      pool.push({
        family: 'svgear', id: 'svgear-' + vi, title: name + ' Gears',
        tags: ['css', 'svg', 'gear', 'big'],
        html: '<div class="sv"><svg viewBox="0 0 200 110">' +
          '<g class="g1" transform="translate(70,55)"><circle r="34" fill="none" stroke-width="12" stroke-dasharray="' + d1 + ' ' + d1 + '"/><circle r="34" fill="none" stroke-width="2"/><circle r="10" fill="none" stroke-width="3"/></g>' +
          '<g class="g2" transform="translate(128,55)"><circle r="24" fill="none" stroke-width="10" stroke-dasharray="' + d2 + ' ' + d2 + '"/><circle r="24" fill="none" stroke-width="2"/><circle r="8" fill="none" stroke-width="3"/></g>' +
          (vi % 2 ? '<g class="g3" transform="translate(70,20)"><circle r="14" fill="none" stroke-width="7" stroke-dasharray="' + d3 + ' ' + d3 + '"/><circle r="4" fill="none" stroke-width="2"/></g>' : '') +
          '</svg></div>',
        css: join([
          svgBase,
          '.sv .g1 circle:first-child{stroke:var(--c1,' + C1 + ')}.sv .g1 circle:nth-child(2){stroke:rgba(255,255,255,.2)}.sv .g1 circle:last-child{stroke:var(--c1,' + C1 + ')}',
          '.sv .g2 circle:first-child{stroke:var(--c2,' + C2 + ')}.sv .g2 circle:nth-child(2){stroke:rgba(255,255,255,.2)}.sv .g2 circle:last-child{stroke:var(--c2,' + C2 + ')}',
          vi % 2 ? '.sv .g3 circle:first-child{stroke:var(--c3,' + C3 + ')}.sv .g3 circle:last-child{stroke:var(--c3,' + C3 + ')}' : '',
          '.sv .g1{animation:sv-gr' + vi + ' var(--dur,6s) linear infinite;transform-origin:70px 55px}',
          '.sv .g2{animation:sv-gr' + vi + 'b var(--dur,6s) linear infinite reverse;transform-origin:128px 55px}',
          vi % 2 ? '.sv .g3{animation:sv-gr' + vi + 'b var(--dur,3s) linear infinite;transform-origin:70px 20px}' : '',
          kf('sv-gr' + vi, 'to{transform:rotate(1turn)}'),
          kf('sv-gr' + vi + 'b', 'to{transform:rotate(1turn)}')
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', 2, 14, .1, 6, 's'),
          col('Gear A', '--c1', C1), col('Gear B', '--c2', C2), col('Gear C', '--c3', C3)]
      });
    });

    /* ---- 4. blueprint drawings (8) ---- */
    var bpShapes = [
      ['Turbine Blueprint', 'M30 80 L70 30 L110 80 Z M50 80 A20 20 0 0 1 90 80 M30 80 L110 80'],
      ['Bridge Blueprint', 'M20 70 L180 70 M40 70 L40 40 M160 70 L160 40 M40 40 Q100 10 160 40 M60 70 L60 55 M80 70 L80 50 M100 70 L100 50 M120 70 L120 55 M140 70 L140 55'],
      ['Rocket Blueprint', 'M100 20 Q120 45 115 75 L85 75 Q80 45 100 20 M85 75 L70 90 M115 75 L130 90 M85 75 L115 75'],
      ['Valve Blueprint', 'M20 55 L70 55 M130 55 L180 55 M70 35 L130 75 M70 75 L130 35 M100 20 L100 35'],
      ['Crane Blueprint', 'M30 90 L30 30 L140 30 M30 30 L140 55 M30 30 L140 42 M140 30 L140 60 M140 60 L128 60 M128 60 L140 74 M140 60 L152 60'],
      ['Heli Blueprint', 'M55 70 L145 70 A18 12 0 0 0 145 46 L60 46 A20 12 0 0 0 55 70 M100 46 L100 30 M60 30 L140 30 M145 70 L170 78'],
      ['Dam Blueprint', 'M40 90 L40 30 L120 30 M40 30 Q95 35 100 90 M120 30 L120 90 M40 90 L170 90 M60 90 L60 55 M80 90 L80 45'],
      ['Antenna Blueprint', 'M100 90 L100 40 M80 90 L100 60 L120 90 M100 40 A18 18 0 0 1 118 52 M100 40 A18 18 0 0 0 82 52 M100 40 A28 28 0 0 1 128 58 M100 40 A28 28 0 0 0 72 58']
    ];
    bpShapes.forEach(function (v, vi) {
      pool.push({
        family: 'svblue', id: 'svblue-' + vi, title: v[0],
        tags: ['css', 'svg', 'blueprint', 'draw', 'big'],
        html: '<div class="sv bp"><svg viewBox="0 0 200 100">' +
          '<rect class="fr" x="6" y="4" width="188" height="92" rx="6" fill="none"/>' +
          '<path class="ln" d="' + v[1] + '" fill="none"/>' +
          '<circle class="dot" cx="20" cy="18" r="2.4"/><circle class="dot" style="--i:1" cx="180" cy="82" r="2.4"/>' +
          '</svg></div>',
        css: join([
          svgBase,
          '.bp{background:linear-gradient(180deg,#0a1220,#0c1526);border:1px solid rgba(90,140,220,.25);border-radius:12px;padding:10px}',
          '.bp .fr{stroke:rgba(90,140,220,.35);stroke-width:1;stroke-dasharray:4 4}',
          '.bp .ln{stroke:var(--c2,' + C2 + ');stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:640;stroke-dashoffset:640;animation:sv-bp' + vi + ' var(--dur,5s) ease-in-out infinite;filter:drop-shadow(0 0 6px color-mix(in srgb,var(--c2,' + C2 + ') 70%,transparent))}',
          '.bp .dot{fill:var(--c4,' + C4 + ');animation:sv-bpd var(--dur,5s) ease-in-out infinite;animation-delay:calc(var(--i,0) * -.8s)}',
          kf('sv-bp' + vi, '0%{stroke-dashoffset:640}55%,88%{stroke-dashoffset:0}100%{stroke-dashoffset:-640}'),
          kf('sv-bpd', '0%,100%{opacity:.4}50%{opacity:1}')
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', 2, 10, .1, 5, 's'),
          col('Ink', '--c2', C2), col('Dot', '--c4', C4)]
      });
    });

    /* ---- 5. circuit traces (8) ---- */
    var circNames = ['Data Line', 'Power Trace', 'Logic Path', 'Bus Route', 'Clock Net', 'Signal Pair', 'Memory Loop', 'IO Route'];
    var circPaths = [
      'M15 50 H70 V30 H130 V50 H185',
      'M15 30 H50 V70 H110 V30 H150 V70 H185',
      'M15 50 H60 L80 30 H120 L140 50 H185',
      'M15 25 H185 M15 50 H185 M15 75 H185 M60 25 V75 M140 25 V75',
      'M15 50 Q60 10 100 50 T185 50',
      'M15 35 H90 V50 H185 M15 65 H90 V50',
      'M15 50 H60 V25 H140 V75 H80 V50 H185',
      'M15 50 H50 V20 H120 V80 H170 V50 H185'
    ];
    circNames.forEach(function (name, vi) {
      pool.push({
        family: 'svcirc', id: 'svcirc-' + vi, title: name,
        tags: ['css', 'svg', 'circuit'],
        html: '<div class="sv ci"><svg viewBox="0 0 200 100">' +
          '<path class="base" d="' + circPaths[vi] + '" fill="none"/>' +
          '<path class="pulse" d="' + circPaths[vi] + '" fill="none"/>' +
          '<circle class="n1" cx="15" cy="' + (circPaths[vi].indexOf('V20') > -1 ? 50 : circPaths[vi].indexOf('25 H185') > -1 ? 50 : 50) + '" r="4"/>' +
          '<circle class="n2" cx="185" cy="50" r="4"/>' +
          '</svg></div>',
        css: join([
          svgBase,
          '.ci .base{stroke:rgba(255,255,255,.12);stroke-width:3;stroke-linecap:round}',
          '.ci .pulse{stroke:var(--c2,' + C2 + ');stroke-width:3;stroke-linecap:round;stroke-dasharray:26 190;animation:sv-ci' + vi + ' var(--dur,2.6s) linear infinite;filter:drop-shadow(0 0 5px color-mix(in srgb,var(--c2,' + C2 + ') 80%,transparent))}',
          '.ci .n1{fill:var(--c1,' + C1 + ');transform-box:fill-box;transform-origin:center;animation:sv-cin var(--dur,2.6s) ease-in-out infinite}',
          '.ci .n2{fill:var(--c3,' + C3 + ');transform-box:fill-box;transform-origin:center;animation:sv-cin var(--dur,2.6s) ease-in-out infinite;animation-delay:calc(var(--dur,2.6s) / -2)}',
          kf('sv-ci' + vi, 'to{stroke-dashoffset:-216}'),
          kf('sv-cin', '0%,100%{transform:scale(1)}50%{transform:scale(1.6)}')
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', .8, 6, .1, 2.6, 's'),
          col('Node A', '--c1', C1), col('Pulse', '--c2', C2), col('Node B', '--c3', C3)]
      });
    });

    /* ---- 6. topography (6) ---- */
    var topoNames = ['Contour Ridge', 'Contour Valley', 'Island Topo', 'Valley Topo', 'Peak Topo', 'Plateau Topo'];
    topoNames.forEach(function (name, vi) {
      var rings = 5;
      var cxs = [100, 95, 105, 92, 108][vi % 5];
      pool.push({
        family: 'svtopo', id: 'svtopo-' + vi, title: name,
        tags: ['css', 'svg', 'contour'],
        html: '<div class="sv tp"><svg viewBox="0 0 200 100">' +
          Array.apply(null, { length: rings }).map(function (_, i) {
            var rx = 14 + i * 13, ry = 8 + i * 7.5, rot = (i * 13 + vi * 7) % 30 - 15;
            return '<ellipse class="r' + i + '" style="--i:' + i + '" cx="' + (cxs + Math.sin(i * 2 + vi) * 4).toFixed(0) + '" cy="' + (50 + Math.cos(i * 1.5 + vi) * 3).toFixed(0) + '" rx="' + rx + '" ry="' + ry + '" transform="rotate(' + rot + ' ' + cxs + ' 50)"/>';
          }).join('') +
          '</svg></div>',
        css: join([
          svgBase,
          '.tp ellipse{fill:none;stroke:var(--c1,' + C1 + ');stroke-width:1.4;opacity:.2;animation:sv-tp' + vi + ' var(--dur,5s) ease-in-out infinite;animation-delay:calc(var(--i) * -.5s)}',
          kf('sv-tp' + vi, '0%,100%{opacity:.12}50%{opacity:.85;stroke:var(--c2,' + C2 + ')}')
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', 2, 10, .1, 5, 's'),
          col('Line', '--c1', C1), col('Line B', '--c2', C2)]
      });
    });

    /* ---- 7. compass roses (6) ---- */
    ['North Rose', 'Port Rose', 'Star Compass', 'Wind Rose', 'Sea Compass', 'Gold Compass'].forEach(function (name, vi) {
      pool.push({
        family: 'svcomp', id: 'svcomp-' + vi, title: name,
        tags: ['css', 'svg', 'compass', 'big'],
        html: '<div class="sv cp"><svg viewBox="0 0 200 110">' +
          '<circle cx="100" cy="55" r="44" fill="none" class="rim"/>' +
          '<circle cx="100" cy="55" r="36" fill="none" class="rim2"/>' +
          Array.apply(null, { length: 16 }).map(function (_, i) { var a = i * 22.5; return '<line class="tk' + (i % 4 === 0 ? ' big' : '') + '" x1="100" y1="11" x2="100" y2="' + (i % 4 === 0 ? '20' : '16') + '" transform="rotate(' + a + ' 100 55)"/>'; }).join('') +
          '<path class="nd" d="M100 22 L107 55 L100 88 L93 55 Z"/>' +
          '<circle class="hub" cx="100" cy="55" r="4"/>' +
          '</svg></div>',
        css: join([
          svgBase,
          '.cp .rim{stroke:var(--c1,' + C1 + ');stroke-width:2;opacity:.7}',
          '.cp .rim2{stroke:rgba(255,255,255,.15);stroke-width:1;stroke-dasharray:3 5}',
          '.cp .tk{stroke:rgba(255,255,255,.4);stroke-width:1.4}',
          '.cp .tk.big{stroke:var(--c4,' + C4 + ');stroke-width:2.4}',
          '.cp .nd{fill:var(--c3,' + C3 + ');transform-box:fill-box;transform-origin:center;animation:sv-cp' + vi + ' var(--dur,7s) ease-in-out infinite}',
          '.cp .hub{fill:#fff}',
          kf('sv-cp' + vi, [
            '0%,100%{transform:rotate(0)}50%{transform:rotate(360deg)}',
            '0%,100%{transform:rotate(-40deg)}50%{transform:rotate(320deg)}',
            '0%,100%{transform:rotate(0)}25%{transform:rotate(90deg)}50%{transform:rotate(90deg)}75%{transform:rotate(450deg)}',
            '0%,100%{transform:rotate(-15deg)}25%{transform:rotate(15deg)}50%{transform:rotate(-25deg)}75%{transform:rotate(10deg)}',
            '0%,100%{transform:rotate(0)}50%{transform:rotate(-360deg)}',
            '0%,100%{transform:rotate(0)}12%,88%{transform:rotate(360deg)}'
          ][vi])
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', 2, 16, .1, 7, 's'),
          col('Rim', '--c1', C1), col('Needle', '--c3', C3), col('Tick', '--c4', C4)]
      });
    });

    /* ---- 8. flow charts (8) ---- */
    var flowNames = ['Deploy Flow', 'Data Flow', 'Order Flow', 'Signal Flow', 'Build Flow', 'Audit Flow', 'Sync Flow', 'Route Flow'];
    flowNames.forEach(function (name, vi) {
      pool.push({
        family: 'svflow', id: 'svflow-' + vi, title: name,
        tags: ['css', 'svg', 'flowchart'],
        html: '<div class="sv fl"><svg viewBox="0 0 200 90">' +
          '<rect class="bx b1" x="12" y="34" width="40" height="22" rx="6" fill="none"/>' +
          '<path class="ln l1" d="M52 45 H80" fill="none"/>' +
          '<path class="bx b2" d="M100 22 L122 45 L100 68 L78 45 Z" fill="none"/>' +
          '<path class="ln l2" d="M122 45 H150" fill="none"/>' +
          '<rect class="bx b3" x="150" y="34" width="40" height="22" rx="6" fill="none"/>' +
          (vi % 2 ? '<path class="ln l3" d="M100 68 V80 H32 V56" fill="none"/>' : '') +
          '</svg></div>',
        css: join([
          svgBase,
          '.fl .bx{stroke:var(--c1,' + C1 + ');stroke-width:2}',
          '.fl .b2{stroke:var(--c2,' + C2 + ')}.fl .b3{stroke:var(--c3,' + C3 + ')}',
          '.fl .ln{stroke:rgba(255,255,255,.4);stroke-width:2;stroke-dasharray:6 5;animation:sv-fl' + vi + ' var(--dur,1.6s) linear infinite}',
          '.fl .l3{stroke:var(--c4,' + C4 + ');stroke-dasharray:4 6;animation-duration:calc(var(--dur,1.6s) * 2)}',
          '.fl .b1{animation:sv-flb var(--dur,3.2s) ease-in-out infinite}',
          '.fl .b2{animation:sv-flb var(--dur,3.2s) ease-in-out infinite;animation-delay:.4s}',
          '.fl .b3{animation:sv-flb var(--dur,3.2s) ease-in-out infinite;animation-delay:.8s}',
          kf('sv-fl' + vi, 'to{stroke-dashoffset:-22}'),
          kf('sv-flb', '0%,100%{opacity:.5}50%{opacity:1}')
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', .6, 4, .1, 1.6, 's'),
          col('Node A', '--c1', C1), col('Node B', '--c2', C2), col('Node C', '--c3', C3), col('Loop', '--c4', C4)]
      });
    });

    /* ---- 9. rulers (6) ---- */
    ['Ruler Sweep', 'Tape Measure', 'Caliper', 'Scale Ruler', 'Meter Bar', 'Graduate'].forEach(function (name, vi) {
      var ticks = '';
      for (var i = 0; i <= 16; i++) {
        var x = 20 + i * 10;
        var h = i % 4 === 0 ? 18 : i % 2 === 0 ? 12 : 7;
        ticks += '<line class="tk' + (i % 4 === 0 ? ' big' : '') + '" style="--i:' + i + '" x1="' + x + '" y1="60" x2="' + x + '" y2="' + (60 - h) + '"/>';
      }
      pool.push({
        family: 'svruler', id: 'svruler-' + vi, title: name,
        tags: ['css', 'svg', 'ruler'],
        html: '<div class="sv rl"><svg viewBox="0 0 200 90">' +
          ticks +
          '<rect x="20" y="60" width="160" height="14" rx="4" class="bar" fill="none"/>' +
          '<line class="mk" x1="40" y1="14" x2="40" y2="78"/>' +
          '</svg></div>',
        css: join([
          svgBase,
          '.rl .tk{stroke:rgba(255,255,255,.4);stroke-width:1.4;animation:sv-rl' + vi + ' var(--dur,4s) ease-in-out infinite;animation-delay:calc(var(--i) * .1s)}',
          '.rl .tk.big{stroke:var(--c2,' + C2 + ');stroke-width:2.2}',
          '.rl .bar{stroke:rgba(255,255,255,.2);stroke-width:1.4}',
          '.rl .mk{stroke:var(--c3,' + C3 + ');stroke-width:3;stroke-linecap:round;animation:sv-rlm var(--dur,4s) ease-in-out infinite;filter:drop-shadow(0 0 6px color-mix(in srgb,var(--c3,' + C3 + ') 70%,transparent))}',
          kf('sv-rl' + vi, '0%,100%{opacity:.35}50%{opacity:1}'),
          kf('sv-rlm', '0%,100%{transform:translateX(0)}50%{transform:translateX(120px)}')
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', 1.5, 8, .1, 4, 's'),
          col('Tick', '--c2', C2), col('Marker', '--c3', C3)]
      });
    });

    /* ---- 10. solar maps (6) ---- */
    ['Inner System', 'Outer System', 'Binary Map', 'Triple Map', 'Ringed Map', 'Cluster Map'].forEach(function (name, vi) {
      var orbs = [
        [[46, C2], [72, C3], [98, C4]],
        [[50, C1], [80, C5], [105, C3]],
        [[40, C2], [64, C1], [88, C3], [110, C4]],
        [[44, C3], [70, C4], [96, C2]],
        [[48, C5], [76, C1], [102, C3]],
        [[42, C4], [66, C2], [90, C1], [114, C5]]
      ][vi];
      pool.push({
        family: 'svorbit', id: 'svorbit-' + vi, title: name,
        tags: ['css', 'svg', 'orbit', 'big'],
        html: '<div class="sv sm"><svg viewBox="0 0 200 110">' +
          orbs.map(function (o) { return '<ellipse class="orb" cx="100" cy="55" rx="' + o[0] + '" ry="' + (o[0] * .42).toFixed(0) + '"/>'; }).join('') +
          '<circle class="sun" cx="100" cy="55" r="9"/>' +
          orbs.map(function (o, i) {
            var r = o[0];
            return '<g class="tilt"><circle class="pl p' + i + '" r="' + (3.5 + (i % 3)) + '" fill="' + o[1] + '"><animateMotion dur="' + (2 + i * 1.3).toFixed(1) + 's" repeatCount="indefinite" path="M ' + r + ' 0 A ' + r + ' ' + r + ' 0 1 1 ' + (-r) + ' 0 A ' + r + ' ' + r + ' 0 1 1 ' + r + ' 0"/></animateMotion></circle></g>';
          }).join('') +
          '</svg></div>',
        css: join([
          svgBase,
          '.sm .orb{fill:none;stroke:rgba(255,255,255,.14);stroke-width:1}',
          '.sm .sun{fill:var(--c4,' + C4 + ');transform-box:fill-box;transform-origin:center;animation:sv-sm' + vi + ' var(--dur,3s) ease-in-out infinite}',
          '.sm .tilt{transform:translate(100px,55px) scale(1,.42)}',
          kf('sv-sm' + vi, '0%,100%{transform:scale(1)}50%{transform:scale(1.15)}')
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', 1, 6, .1, 3, 's'), col('Sun', '--c4', C4)]
      });
    });

    /* ---- 11. tree drawings (4) ---- */
    ['Rooted Tree', 'Branch Tree', 'Coral Branch', 'Vine Tree'].forEach(function (name, vi) {
      pool.push({
        family: 'svtree', id: 'svtree-' + vi, title: name,
        tags: ['css', 'svg', 'tree', 'draw'],
        html: '<div class="sv tr"><svg viewBox="0 0 200 100">' +
          '<path class="tr1" d="M100 95 V45" fill="none"/>' +
          '<path class="tr2" d="M100 60 Q70 45 58 22" fill="none"/>' +
          '<path class="tr3" d="M100 52 Q130 38 142 16" fill="none"/>' +
          '<path class="tr4" d="M100 45 Q85 30 92 12" fill="none"/>' +
          '<circle class="lf" cx="58" cy="20" r="4"/>' +
          '<circle class="lf" style="--i:1" cx="142" cy="14" r="4"/>' +
          '<circle class="lf" style="--i:2" cx="92" cy="10" r="4"/>' +
          '</svg></div>',
        css: join([
          svgBase,
          '.tr .tr1,.tr .tr2,.tr .tr3,.tr .tr4{stroke:var(--c1,' + C1 + ');stroke-width:2.6;stroke-linecap:round;stroke-dasharray:120;stroke-dashoffset:120;animation:sv-tr' + vi + ' var(--dur,5s) ease-in-out infinite}',
          '.tr .tr2{animation-delay:.3s}.tr .tr3{animation-delay:.6s}.tr .tr4{animation-delay:.9s}',
          '.tr .lf{fill:var(--c2,' + C2 + ');transform-box:fill-box;transform-origin:center;opacity:0;animation:sv-trl' + vi + ' var(--dur,5s) ease-out infinite;animation-delay:calc(1.4s + var(--i,0) * .3s)}',
          kf('sv-tr' + vi, '0%{stroke-dashoffset:120}40%,100%{stroke-dashoffset:0}'),
          kf('sv-trl' + vi, '0%,30%{opacity:0;transform:scale(0)}45%,100%{opacity:1;transform:scale(1)}')
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', 2, 10, .1, 5, 's'),
          col('Branch', '--c1', C1), col('Leaf', '--c2', C2)]
      });
    });

    /* ---- 12. pulse waves (5) ---- */
    ['ECG Trace', 'Pulse Wave', 'Heart Signal', 'Bio Rhythm', 'Vital Line'].forEach(function (name, vi) {
      pool.push({
        family: 'svpulse', id: 'svpulse-' + vi, title: name,
        tags: ['css', 'svg', 'pulse', 'ecg'],
        html: '<div class="sv pu"><svg viewBox="0 0 200 70">' +
          '<path class="grid" d="M0 10 H200 M0 35 H200 M0 60 H200 M25 0 V70 M75 0 V70 M125 0 V70 M175 0 V70" fill="none"/>' +
          '<path class="beat" d="M0 35 H40 L52 35 L60 18 L70 52 L78 8 L86 44 L96 35 H140 L150 35 L158 20 L168 50 L176 12 L184 40 L192 35 H200" fill="none"/>' +
          '<circle class="dot" r="3.4"><animateMotion dur="3s" repeatCount="indefinite" path="M0 35 H40 L52 35 L60 18 L70 52 L78 8 L86 44 L96 35 H140 L150 35 L158 20 L168 50 L176 12 L184 40 L192 35 H200"/></circle>' +
          '</svg></div>',
        css: join([
          svgBase,
          '.pu .grid{stroke:rgba(255,255,255,.07);stroke-width:1}',
          '.pu .beat{stroke:var(--c3,' + C3 + ');stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:420;stroke-dashoffset:420;animation:sv-pu' + vi + ' var(--dur,3s) linear infinite;filter:drop-shadow(0 0 6px color-mix(in srgb,var(--c3,' + C3 + ') 80%,transparent))}',
          '.pu .dot{fill:#fff;filter:drop-shadow(0 0 6px color-mix(in srgb,var(--c3,' + C3 + ') 90%,transparent))}',
          kf('sv-pu' + vi, '0%{stroke-dashoffset:420}60%,100%{stroke-dashoffset:0}')
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', 1, 7, .1, 3, 's'), col('Line', '--c3', C3)]
      });
    });

    /* ---- 13. mazes (5) ---- */
    ['Garden Maze', 'Labyrinth', 'Data Maze', 'Runestone', 'Warp Maze'].forEach(function (name, vi) {
      var paths = [
        'M20 80 H70 V40 H110 V70 H150 V30 H180',
        'M20 20 V60 H60 V30 H100 V70 H140 V40 H180',
        'M20 50 H50 V20 H90 V80 H130 V30 H160 V60 H180',
        'M20 30 H60 V70 H100 V20 H140 V70 H180 V40',
        'M20 70 H40 V30 H80 V50 H120 V20 H150 V60 H180'
      ][vi];
      pool.push({
        family: 'svmaze', id: 'svmaze-' + vi, title: name,
        tags: ['css', 'svg', 'maze', 'path'],
        html: '<div class="sv mz"><svg viewBox="0 0 200 100">' +
          '<path class="walls" d="' + paths + '" fill="none"/>' +
          '<circle class="walker" r="4.5"/>' +
          '</svg></div>',
        css: join([
          svgBase,
          '.mz .walls{stroke:rgba(255,255,255,.25);stroke-width:5;stroke-linecap:round;stroke-linejoin:round}',
          '.mz .walker{fill:var(--c2,' + C2 + ');filter:drop-shadow(0 0 8px color-mix(in srgb,var(--c2,' + C2 + ') 90%,transparent));offset-path:path("' + paths + '");animation:sv-mz' + vi + ' var(--dur,5s) ease-in-out infinite}',
          kf('sv-mz' + vi, '0%{offset-distance:0%}100%{offset-distance:100%}')
        ]),
        cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', 2, 10, .1, 5, 's'), col('Walker', '--c2', C2)]
      });
    });

    K.add('svg', pool);
  })();

  /* ══════════════════════════════ 3D SCENES (102) ══════════════════════════════ */
  (function () {
    var pool = [];
    var d3Base = '.d3{width:100%;height:var(--h,260px);display:grid;place-items:center;perspective:900px;background:radial-gradient(80% 90% at 50% 30%,#121222,#07070d);border-radius:12px;overflow:hidden}';

    /* ---- 1. mega cubes (8) ---- */
    var cubeFaces = [
      ['Circuit Cube', 'repeating-linear-gradient(90deg,rgba(34,211,238,.5) 0 2px,transparent 2px 18px),repeating-linear-gradient(0deg,rgba(34,211,238,.5) 0 2px,transparent 2px 18px)'],
      ['Holo Cube', 'linear-gradient(135deg,rgba(124,92,255,.5),rgba(34,211,238,.5))'],
      ['Window Cube', 'repeating-linear-gradient(0deg,rgba(255,212,121,.55) 0 8px,transparent 8px 16px),repeating-linear-gradient(90deg,rgba(255,212,121,.35) 0 8px,transparent 8px 16px)'],
      ['Vine Cube', 'repeating-radial-gradient(circle at 0 0,rgba(52,211,153,.4) 0 2px,transparent 2px 14px)'],
      ['Storm Cube', 'repeating-linear-gradient(45deg,rgba(255,92,138,.35) 0 6px,transparent 6px 16px)'],
      ['Map Cube', 'repeating-linear-gradient(90deg,rgba(255,255,255,.14) 0 1px,transparent 1px 22px),repeating-linear-gradient(0deg,rgba(255,255,255,.14) 0 1px,transparent 1px 22px)'],
      ['Flame Cube', 'radial-gradient(circle at 50% 100%,rgba(255,157,92,.7),transparent 70%)'],
      ['Frost Cube', 'repeating-linear-gradient(135deg,rgba(96,165,250,.4) 0 3px,transparent 3px 12px)']
    ];
    cubeFaces.forEach(function (v, vi) {
      var size = 90 + (vi % 3) * 14;
      pool.push({
        family: 'd3meca', id: 'd3meca-' + vi, title: v[0],
        tags: ['css', '3d', 'cube', 'big'],
        html: '<div class="d3"><div class="cube" style="--sz:' + size + 'px">' +
          ['f', 'b', 'l', 'r', 't', 'd'].map(function (f) { return '<i class="face ' + f + '"></i>'; }).join('') + '</div></div>',
        css: join([
          d3Base,
          '.cube{position:relative;width:var(--sz,90px);height:var(--sz,90px);transform-style:preserve-3d;animation:d3-me' + vi + ' var(--dur,12s) linear infinite}',
          '.cube .face{position:absolute;inset:0;border:1px solid color-mix(in srgb,var(--c2,' + C2 + ') 55%,transparent);background:' + v[1] + ',rgba(10,10,20,.6);backface-visibility:visible;opacity:.92}',
          '.cube .f{transform:translateZ(calc(var(--sz,90px)/2))}',
          '.cube .b{transform:rotateY(180deg) translateZ(calc(var(--sz,90px)/2))}',
          '.cube .l{transform:rotateY(-90deg) translateZ(calc(var(--sz,90px)/2))}',
          '.cube .r{transform:rotateY(90deg) translateZ(calc(var(--sz,90px)/2))}',
          '.cube .t{transform:rotateX(90deg) translateZ(calc(var(--sz,90px)/2))}',
          '.cube .d{transform:rotateX(-90deg) translateZ(calc(var(--sz,90px)/2))}',
          kf('d3-me' + vi, [
            '0%{transform:rotateX(-18deg) rotateY(0)}100%{transform:rotateX(-18deg) rotateY(360deg)}',
            '0%{transform:rotateX(0) rotateY(-25deg) rotateZ(0)}100%{transform:rotateX(360deg) rotateY(-25deg) rotateZ(0)}',
            '0%{transform:rotateX(-18deg) rotateY(45deg)}50%{transform:rotateX(-18deg) rotateY(225deg) scale(1.06)}100%{transform:rotateX(-18deg) rotateY(405deg)}',
            '0%{transform:rotateX(-20deg) rotateY(0) rotateZ(0)}33%{transform:rotateX(-20deg) rotateY(120deg) rotateZ(90deg)}66%{transform:rotateX(-20deg) rotateY(240deg) rotateZ(180deg)}100%{transform:rotateX(-20deg) rotateY(360deg) rotateZ(270deg)}',
            '0%{transform:rotateX(-15deg) rotateY(0)}100%{transform:rotateX(-15deg) rotateY(-360deg)}',
            '0%,100%{transform:rotateX(-18deg) rotateY(0)}50%{transform:rotateX(-18deg) rotateY(180deg) rotateZ(90deg)}',
            '0%{transform:rotateX(10deg) rotateY(0) translateY(0)}50%{transform:rotateX(10deg) rotateY(180deg) translateY(-10px)}100%{transform:rotateX(10deg) rotateY(360deg) translateY(0)}',
            '0%{transform:rotateX(-18deg) rotateY(0) scale(1)}25%{transform:rotateX(-18deg) rotateY(90deg) scale(1.1)}50%{transform:rotateX(-18deg) rotateY(180deg) scale(1)}75%{transform:rotateX(-18deg) rotateY(270deg) scale(1.1)}100%{transform:rotateX(-18deg) rotateY(360deg) scale(1)}'
          ][vi])
        ]),
        cfg: [range('Scene height', '--h', 160, 400, 2, 260, 'px'), range('Cycle', '--dur', 4, 30, .5, 12, 's'), col('Edge', '--c2', C2)]
      });
    });

    /* ---- 2. isometric towers (8) ---- */
    var towerNames = ['Neon District', 'Glass Quarter', 'Old Town', 'Sky Gardens', 'Data Spires', 'Port City', 'Night Market', 'Cloud Deck'];
    towerNames.forEach(function (name, vi) {
      var heights = [
        [150, 90, 120, 70, 180], [180, 110, 80, 140, 100], [90, 160, 110, 130, 60],
        [120, 140, 90, 160, 100], [200, 80, 150, 110, 130], [100, 170, 90, 150, 120],
        [130, 100, 190, 80, 140], [160, 130, 100, 170, 90]
      ][vi];
      var cols = [C1, C2, C3, C4, C5];
      pool.push({
        family: 'd3towr', id: 'd3towr-' + vi, title: name,
        tags: ['css', '3d', 'isometric', 'city', 'big'],
        html: '<div class="d3"><div class="city">' +
          heights.map(function (h, i) { return '<div class="bd" style="--i:' + i + ';--bh:' + h + 'px;--c:' + cols[i] + '"><i class="top"></i><i class="side f"></i><i class="side s"></i></div>'; }).join('') + '</div></div>',
        css: join([
          d3Base,
          '.city{position:relative;width:240px;height:190px;transform-style:preserve-3d;transform:rotateX(55deg) rotateZ(-45deg);animation:d3-tw' + vi + ' var(--dur,26s) linear infinite}',
          '.bd{position:absolute;left:50%;top:50%;width:44px;height:44px;margin:-22px;transform-style:preserve-3d}',
          '.bd:nth-child(1){transform:translate(-70px,-70px)}',
          '.bd:nth-child(2){transform:translate(8px,-70px)}',
          '.bd:nth-child(3){transform:translate(56px,-70px)}',
          '.bd:nth-child(4){transform:translate(-31px,8px)}',
          '.bd:nth-child(5){transform:translate(17px,8px)}',
          '.bd .top{position:absolute;inset:0;background:var(--c);opacity:.85;box-shadow:0 0 18px color-mix(in srgb,var(--c) 60%,transparent);animation:d3-tw' + vi + 'l var(--dur,4s) ease-in-out infinite;animation-delay:calc(var(--i) * -.7s)}',
          '.bd .side{position:absolute;background:color-mix(in srgb,var(--c) 42%,#0a0a14);opacity:.96}',
          '.bd .f{left:0;right:0;top:100%;height:var(--bh,120px);transform-origin:top;transform:rotateX(-90deg);background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.28) 0 3px,transparent 3px 12px)}',
          '.bd .s{top:0;bottom:0;left:100%;width:var(--bh,120px);transform-origin:left;transform:rotateY(90deg);background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.18) 0 3px,transparent 3px 12px)}',
          kf('d3-tw' + vi + 'a', '0%,100%{transform:rotateX(55deg) rotateZ(-45deg)}50%{transform:rotateX(55deg) rotateZ(-45deg) translateZ(14px)}'),
          kf('d3-tw' + vi + 'l', '0%,100%{opacity:.65}50%{opacity:1}'),
          kf('d3-tw' + vi, '0%{transform:rotateX(55deg) rotateZ(-45deg)}100%{transform:rotateX(55deg) rotateZ(315deg)}')
        ]),
        cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 10, 60, 1, 26, 's')]
      });
    });

    /* ---- 3. mega helix (8) ---- */
    var helixNames = ['Gene Spiral', 'Helix A', 'Helix B', 'Double Chain', 'Base Pairs', 'Code Helix', 'Twist Field', 'Ladder'];
    helixNames.forEach(function (name, vi) {
      var n = 14 + (vi % 3) * 2;
      var rungs = '';
      for (var i = 0; i < n; i++) {
        rungs += '<i class="rn" style="--i:' + i + ';--t:' + (i / (n - 1)) + '"><b></b><u></u></i>';
      }
      pool.push({
        family: 'd3hlx', id: 'd3hlx-' + vi, title: name,
        tags: ['css', '3d', 'helix', 'big'],
        html: '<div class="d3"><div class="hx" style="--n:' + n + '">' + rungs + '</div></div>',
        css: join([
          d3Base,
          '.hx{position:relative;width:120px;height:220px;transform-style:preserve-3d;animation:d3-hx' + vi + ' var(--dur,8s) linear infinite}',
          '.hx .rn{position:absolute;left:50%;top:calc(var(--t) * 100% - 4px);width:120px;height:8px;margin-left:-60px;transform-style:preserve-3d;transform:rotateY(calc(var(--i) * 360deg / var(--n,' + n + ') * 1.6))}',
          '.hx .rn b,.hx .rn u{position:absolute;top:0;width:14px;height:14px;border-radius:50%;background:var(--c1,' + C1 + ');box-shadow:0 0 12px color-mix(in srgb,var(--c1,' + C1 + ') 80%,transparent)}',
          '.hx .rn u{background:var(--c2,' + C2 + ');box-shadow:0 0 12px color-mix(in srgb,var(--c2,' + C2 + ') 80%,transparent)}',
          '.hx .rn b{left:0}',
          '.hx .rn u{right:0}',
          '.hx .rn::after{content:"";position:absolute;left:7px;right:7px;top:3px;height:2px;background:color-mix(in srgb,var(--c4,' + C4 + ') 55%,transparent)}',
          kf('d3-hx' + vi, 'to{transform:rotateY(1turn)}')
        ]),
        cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 3, 20, .5, 8, 's'),
          col('Strand A', '--c1', C1), col('Strand B', '--c2', C2), col('Base', '--c4', C4)]
      });
    });

    /* ---- 4. torus rings (8) ---- */
    var torusNames = ['Torus Gate', 'Ring Stack', 'Halo Field', 'Orbit Torus', 'Vortex', 'Aster Gate', 'Nebula Ring', 'Core Ring'];
    torusNames.forEach(function (name, vi) {
      var rings = '';
      var nr = 7;
      for (var i = 0; i < nr; i++) rings += '<i style="--i:' + i + '"></i>';
      pool.push({
        family: 'd3trus', id: 'd3trus-' + vi, title: name,
        tags: ['css', '3d', 'torus', 'big'],
        html: '<div class="d3"><div class="ts">' + rings + '</div></div>',
        css: join([
          d3Base,
          '.ts{position:relative;width:170px;height:170px;transform-style:preserve-3d;animation:d3-ts' + vi + ' var(--dur,9s) linear infinite}',
          '.ts i{position:absolute;inset:0;border-radius:50%;border:3px solid color-mix(in srgb,var(--c' + (1 + vi % 3) + ',' + [C1, C2, C3][vi % 3] + ') 85%,transparent);transform:rotateY(calc(var(--i) * 360deg / ' + nr + '));box-shadow:0 0 14px color-mix(in srgb,var(--c1,' + C1 + ') 35%,transparent);animation:d3-ts' + vi + 'p var(--dur,3s) ease-in-out infinite;animation-delay:calc(var(--i) * -.4s)}',
          kf('d3-ts' + vi, [
            '0%{transform:rotateX(60deg) rotateZ(0)}100%{transform:rotateX(60deg) rotateZ(360deg)}',
            '0%{transform:rotateX(70deg) rotateY(0)}100%{transform:rotateX(70deg) rotateY(360deg)}',
            '0%{transform:rotateX(55deg) rotateY(0) rotateZ(0)}50%{transform:rotateX(55deg) rotateY(180deg) rotateZ(90deg)}100%{transform:rotateX(55deg) rotateY(360deg) rotateZ(180deg)}',
            '0%{transform:rotateX(65deg) rotateY(0)}100%{transform:rotateX(65deg) rotateY(-360deg)}',
            '0%{transform:rotateX(80deg) rotateZ(0) scale(1)}50%{transform:rotateX(80deg) rotateZ(180deg) scale(1.08)}100%{transform:rotateX(80deg) rotateZ(360deg) scale(1)}',
            '0%{transform:rotateX(60deg) rotateY(0) rotateZ(0)}100%{transform:rotateX(60deg) rotateY(360deg) rotateZ(360deg)}',
            '0%{transform:rotateX(50deg) rotateY(0)}100%{transform:rotateX(50deg) rotateY(720deg)}',
            '0%{transform:rotateX(62deg) rotateY(0) rotateZ(0)}100%{transform:rotateX(62deg) rotateY(360deg) rotateZ(-360deg)}'
          ][vi]),
          kf('d3-ts' + vi + 'p', '0%,100%{opacity:.45;transform:rotateY(calc(var(--i) * 360deg / ' + nr + ')) scale(1)}50%{opacity:1;transform:rotateY(calc(var(--i) * 360deg / ' + nr + ')) scale(1.05)}')
        ]),
        cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 3, 24, .5, 9, 's'),
          col('Ring', '--c1', C1), col('Ring B', '--c2', C2), col('Ring C', '--c3', C3)]
      });
    });

    /* ---- 5. planet systems (8) ---- */
    var planetNames = ['Red World', 'Blue Giant', 'Green World', 'Gold World', 'Ice World', 'Dusk World', 'Twin World', 'Storm World'];
    planetNames.forEach(function (name, vi) {
      var pc = [[C3, C4], [C2, C1], [C5, C2], [C4, C3], [C2, '#e8f4ff'], [C1, C3], [C3, C2], [C5, C1]][vi];
      pool.push({
        family: 'd3plnt', id: 'd3plnt-' + vi, title: name,
        tags: ['css', '3d', 'planet', 'big'],
        html: '<div class="d3"><div class="pl">' +
          '<i class="body"><u></u></i>' +
          (vi === 6 ? '<i class="moon m1"></i>' : '<i class="moon"></i>') +
          (vi % 3 === 2 ? '<i class="ring"></i>' : '') +
          '</div></div>',
        css: join([
          d3Base,
          '.pl{position:relative;width:120px;height:120px;transform-style:preserve-3d;animation:d3-pl' + vi + ' var(--dur,14s) linear infinite}',
          '.pl .body{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 32% 28%,color-mix(in srgb,' + pc[0] + ' 80%,#fff),' + pc[0] + ' 45%,color-mix(in srgb,' + pc[0] + ' 30%,#000) 85%);box-shadow:0 0 40px color-mix(in srgb,' + pc[0] + ' 55%,transparent),inset -14px -10px 30px rgba(0,0,0,.55)}',
          '.pl .body u{position:absolute;inset:0;border-radius:50%;background:repeating-linear-gradient(' + (vi % 2 ? '0deg' : '15deg') + ',transparent 0 14px,color-mix(in srgb,' + pc[1] + ' 40%,transparent) 14px 22px);mix-blend-mode:screen;opacity:.5}',
          '.pl .ring{position:absolute;inset:-34% -50%;border-radius:50%;border:3px solid color-mix(in srgb,' + pc[1] + ' 65%,transparent);transform:rotateX(72deg)}',
          '.pl .moon{position:absolute;inset:0;transform-style:preserve-3d}',
          '.pl .moon::after{content:"";position:absolute;top:50%;left:50%;width:16px;height:16px;margin:-8px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,color-mix(in srgb,' + pc[1] + ' 70%,#555) 70%);transform:rotateY(0) translateX(96px);animation:d3-plm' + vi + ' calc(var(--dur,14s) / 3) linear infinite}',
          vi === 6 ? '.pl .m1::after{animation-duration:calc(var(--dur,14s) / 5);background:radial-gradient(circle at 35% 30%,#fff,' + pc[0] + ' 70%);width:10px;height:10px;margin:-5px}' : '',
          kf('d3-pl' + vi, 'to{transform:rotateY(1turn)}'),
          kf('d3-plm' + vi, '0%{transform:rotateY(0) translateX(96px)}100%{transform:rotateY(360deg) translateX(96px)}')
        ]),
        cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 6, 40, .5, 14, 's')]
      });
    });

    /* ---- 6. casino card fans (8) ---- */
    var fanNames = ['Royal Fan', 'Neon Fan', 'Poker Fan', 'Trio Fan', 'Crown Fan', 'Midnight Fan', 'Gold Fan', 'Arcade Fan'];
    fanNames.forEach(function (name, vi) {
      var cards = vi % 2 === 0 ? 5 : 3;
      var suits = ['♠', '♥', '♦', '♣', '★'];
      pool.push({
        family: 'd3cnst', id: 'd3cnst-' + vi, title: name,
        tags: ['css', '3d', 'cards', 'big'],
        html: '<div class="d3"><div class="fan" style="--cards:' + cards + '">' +
        Array.apply(null, { length: cards }).map(function (_, i) {
          return '<i class="cd" style="--i:' + i + '"><b>' + suits[i % 5] + '</b></i>';
        }).join('') + '</div></div>',
        css: join([
          d3Base,
          '.fan{position:relative;width:90px;height:130px;transform-style:preserve-3d;transform:rotateX(18deg);animation:d3-fn' + vi + ' var(--dur,6s) ease-in-out infinite}',
          '.fan .cd{position:absolute;inset:0;border-radius:12px;background:linear-gradient(160deg,#f7f8ff,#d9dcf2);border:1px solid rgba(0,0,0,.15);box-shadow:0 14px 30px rgba(0,0,0,.45);display:grid;place-items:center;transform-origin:50% 105%;transform:rotateY(calc((var(--i) - calc(var(--cards,' + cards + ') / 2 - .5)) * ' + (60 / cards) + 'deg)) translateZ(4px);animation:d3-fnc' + vi + ' var(--dur,6s) ease-in-out infinite;animation-delay:calc(var(--i) * -.3s)}',
          '.fan .cd b{font:800 44px system-ui,sans-serif;color:' + (vi % 3 === 0 ? C3 : vi % 3 === 1 ? C1 : C4) + ';text-shadow:0 2px 0 rgba(255,255,255,.6)}',
          kf('d3-fn' + vi, [
            '0%,100%{transform:rotateX(18deg) translateZ(0)}50%{transform:rotateX(18deg) translateZ(34px)}',
            '0%,100%{transform:rotateX(18deg) rotateY(0)}50%{transform:rotateX(18deg) rotateY(10deg)}',
            '0%,100%{transform:rotateX(18deg) scale(1)}50%{transform:rotateX(18deg) scale(1.07)}',
            '0%,100%{transform:rotateX(8deg)}50%{transform:rotateX(30deg)}',
            '0%,100%{transform:rotateX(18deg) rotateZ(0)}50%{transform:rotateX(18deg) rotateZ(6deg)}',
            '0%,100%{transform:rotateX(18deg) translateZ(0)}50%{transform:rotateX(18deg) translateZ(-20px)}',
            '0%,100%{transform:rotateX(18deg)}50%{transform:rotateX(18deg) rotateY(-8deg)}',
            '0%,100%{transform:rotateX(24deg) scale(1)}50%{transform:rotateX(12deg) scale(1.05)}'
          ][vi]),
          kf('d3-fnc' + vi, '0%,100%{transform:rotateY(calc((var(--i) - calc(var(--cards,' + cards + ') / 2 - .5)) * ' + (60 / cards) + 'deg)) translateZ(4px) translateY(0)}50%{transform:rotateY(calc((var(--i) - calc(var(--cards,' + cards + ') / 2 - .5)) * ' + (60 / cards) + 'deg)) translateZ(4px) translateY(-12px)}')
        ]),
        cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 2, 12, .5, 6, 's')]
      });
    });

    /* ---- 7. prism fields (8) ---- */
    var prismNames = ['Prism Field Cool', 'Prism Field Warm', 'Shard Cluster', 'Crystal Cave', 'Light Shards', 'Gem Field', 'Refraction', 'Facet Storm'];
    prismNames.forEach(function (name, vi) {
      var shards = vi < 4 ? 3 : 4;
      pool.push({
        family: 'd3pris', id: 'd3pris-' + vi, title: name,
        tags: ['css', '3d', 'prism', 'big'],
        html: '<div class="d3"><div class="pf">' +
        Array.apply(null, { length: shards }).map(function (_, i) {
          var s = 70 + (i * 23 + vi * 11) % 40;
          return '<i class="sh" style="--i:' + i + ';--s:' + s + 'px"></i>';
        }).join('') + '</div></div>',
        css: join([
          d3Base,
          '.pf{position:relative;width:260px;height:180px;transform-style:preserve-3d;animation:d3-pf' + vi + ' var(--dur,10s) linear infinite}',
          '.pf .sh{position:absolute;left:calc(15% + var(--i) * 22%);top:calc(30% - var(--i) * 8%);width:var(--s,80px);height:calc(var(--s,80px) * 1.4);background:linear-gradient(160deg,color-mix(in srgb,var(--c' + (1 + vi % 3) + ',' + [C1, C2, C3][vi % 3] + ') 75%,transparent),color-mix(in srgb,var(--c2,' + C2 + ') 30%,transparent));clip-path:polygon(50% 0,100% 100%,0 100%);border:0;filter:drop-shadow(0 0 14px color-mix(in srgb,var(--c1,' + C1 + ') 45%,transparent));animation:d3-pfs' + vi + ' var(--dur,5s) ease-in-out infinite;animation-delay:calc(var(--i) * -.9s)}',
          kf('d3-pf' + vi, [
            '0%{transform:rotateX(0) rotateY(0)}100%{transform:rotateX(0) rotateY(360deg)}',
            '0%{transform:rotateX(12deg) rotateY(0)}100%{transform:rotateX(12deg) rotateY(-360deg)}',
            '0%{transform:rotateX(0) rotateY(0) scale(1)}50%{transform:rotateX(0) rotateY(180deg) scale(1.06)}100%{transform:rotateX(0) rotateY(360deg) scale(1)}',
            '0%{transform:rotateX(8deg) rotateY(0) translateY(0)}50%{transform:rotateX(8deg) rotateY(180deg) translateY(12px)}100%{transform:rotateX(8deg) rotateY(360deg) translateY(0)}',
            '0%{transform:rotateX(0) rotateY(0) rotateZ(0)}100%{transform:rotateX(0) rotateY(720deg) rotateZ(180deg)}',
            '0%{transform:rotateX(-6deg) rotateY(0)}100%{transform:rotateX(-6deg) rotateY(360deg)}',
            '0%{transform:rotateX(10deg) rotateY(0) scale(1.04)}100%{transform:rotateX(10deg) rotateY(-360deg) scale(1.04)}',
            '0%{transform:rotateX(0) rotateY(0)}50%{transform:rotateX(360deg) rotateY(180deg)}100%{transform:rotateX(720deg) rotateY(360deg)}'
          ][vi]),
          kf('d3-pfs' + vi, '0%,100%{transform:translateY(0) rotate(0);opacity:.8}50%{transform:translateY(-14px) rotate(4deg);opacity:1}')
        ]),
        cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 4, 20, .5, 10, 's'),
          col('Prism', '--c1', C1), col('Prism B', '--c2', C2), col('Prism C', '--c3', C3)]
      });
    });

    /* ---- 8. floating stairs (8) ---- */
    var stairNames = ['Sky Stairs', 'Helix Steps', 'Floating Deck', 'Rooftop Steps', 'Cloud Ladder', 'Neon Stair', 'Void Steps', 'Ascension'];
    stairNames.forEach(function (name, vi) {
      var steps = 5;
      pool.push({
        family: 'd3star', id: 'd3star-' + vi, title: name,
        tags: ['css', '3d', 'stairs', 'big'],
        html: '<div class="d3"><div class="stc">' +
        Array.apply(null, { length: steps }).map(function (_, i) {
          return '<i class="st" style="--i:' + i + '"><u class="topf"></u><u class="frontf"></u></i>';
        }).join('') + '</div></div>',
        css: join([
          d3Base,
          '.stc{position:relative;width:180px;height:160px;transform-style:preserve-3d;transform:rotateX(58deg) rotateZ(-45deg);animation:d3-st' + vi + ' var(--dur,20s) linear infinite}',
          '.st{position:absolute;left:calc(var(--i) * 26px);top:calc(var(--i) * 26px);width:52px;height:52px;transform-style:preserve-3d;animation:d3-stb' + vi + ' var(--dur,4s) ease-in-out infinite;animation-delay:calc(var(--i) * -.5s)}',
          '.st .topf{position:absolute;inset:0;background:color-mix(in srgb,var(--c' + (1 + vi % 3) + ',' + [C1, C2, C3][vi % 3] + ') 80%,#fff 0%);opacity:.95;box-shadow:0 0 16px color-mix(in srgb,var(--c1,' + C1 + ') 55%,transparent)}',
          '.st .frontf{position:absolute;left:0;right:0;top:100%;height:calc(26px + var(--i) * 10px);transform-origin:top;transform:rotateX(-90deg);background:color-mix(in srgb,var(--c1,' + C1 + ') 35%,#0a0a14)}',
          kf('d3-st' + vi, [
            '0%{transform:rotateX(58deg) rotateZ(-45deg)}100%{transform:rotateX(58deg) rotateZ(315deg)}',
            '0%,100%{transform:rotateX(58deg) rotateZ(-45deg) translateZ(0)}50%{transform:rotateX(58deg) rotateZ(-45deg) translateZ(18px)}',
            '0%{transform:rotateX(58deg) rotateZ(-45deg) scale(1)}50%{transform:rotateX(58deg) rotateZ(-45deg) scale(1.08)}100%{transform:rotateX(58deg) rotateZ(-45deg) scale(1)}',
            '0%{transform:rotateX(58deg) rotateZ(-45deg)}100%{transform:rotateX(58deg) rotateZ(315deg)}'
          ][vi % 4]),
          kf('d3-stb' + vi, '0%,100%{transform:translateZ(0)}50%{transform:translateZ(16px)}')
        ]),
        cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 8, 40, 1, 20, 's'),
          col('Step', '--c1', C1), col('Step B', '--c2', C2), col('Step C', '--c3', C3)]
      });
    });

    /* ---- 9. pyramid clusters (6) ---- */
    var pyrNames = ['Sun Pyramid', 'Twin Pyramids', 'Triple Peaks', 'Sand Dunes', 'Night Pyramids', 'Crystal Pyramids'];
    pyrNames.forEach(function (name, vi) {
      var pirs = vi === 0 ? 1 : vi === 1 ? 2 : 3;
      pool.push({
        family: 'd3pyrd', id: 'd3pyrd-' + vi, title: name,
        tags: ['css', '3d', 'pyramid', 'big'],
        html: '<div class="d3"><div class="py">' +
        Array.apply(null, { length: pirs }).map(function (_, i) {
          var s = 120 - i * 30;
          return '<i class="pyd" style="--i:' + i + ';--ps:' + s + 'px"><u></u><u></u><u></u><u></u></i>';
        }).join('') + '</div></div>',
        css: join([
          d3Base,
          '.py{position:relative;width:200px;height:170px;transform-style:preserve-3d;animation:d3-py' + vi + ' var(--dur,16s) linear infinite}',
          '.pyd{position:absolute;left:calc(50% - var(--ps,120px)/2 + var(--i) * 18px);bottom:8px;width:var(--ps,120px);height:var(--ps,120px);transform-style:preserve-3d}',
          '.pyd u{position:absolute;inset:0;background:linear-gradient(180deg,color-mix(in srgb,var(--c4,' + C4 + ') 85%,#fff),color-mix(in srgb,var(--c4,' + C4 + ') 40%,#1a1206) 80%);clip-path:polygon(50% 0,100% 100%,0 100%);backface-visibility:visible;opacity:.96}',
          '.pyd u:nth-child(1){transform:rotateY(0deg) translateZ(calc(var(--ps,120px)/4)) skewY(0deg) scale(.86,.96)}',
          '.pyd u:nth-child(2){transform:rotateY(90deg) translateZ(calc(var(--ps,120px)/4)) scale(.86,.96);filter:brightness(.8)}',
          '.pyd u:nth-child(3){transform:rotateY(180deg) translateZ(calc(var(--ps,120px)/4)) scale(.86,.96);filter:brightness(.65)}',
          '.pyd u:nth-child(4){transform:rotateY(270deg) translateZ(calc(var(--ps,120px)/4)) scale(.86,.96);filter:brightness(.88)}',
          kf('d3-py' + vi, 'to{transform:rotateY(1turn)}')
        ]),
        cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 6, 30, .5, 16, 's'), col('Stone', '--c4', C4)]
      });
    });

    /* ---- 10. cube matrices (6) ---- */
    var matNames = ['Cube Matrix Cool', 'Cube Matrix Warm', 'Wave Matrix', 'Pulse Matrix', 'Spin Matrix', 'Breath Matrix'];
    matNames.forEach(function (name, vi) {
      var cubes = '';
      for (var i = 0; i < 4; i++) for (var j = 0; j < 3; j++) cubes += '<i class="cub" style="--i:' + i + ';--j:' + j + '"></i>';
      pool.push({
        family: 'd3mtrx', id: 'd3mtrx-' + vi, title: name,
        tags: ['css', '3d', 'matrix', 'big'],
        html: '<div class="d3"><div class="mtx">' + cubes + '</div></div>',
        css: join([
          d3Base,
          '.mtx{position:relative;width:200px;height:130px;transform-style:preserve-3d;transform:rotateX(-18deg) rotateY(32deg);animation:d3-mt' + vi + ' var(--dur,14s) linear infinite}',
          '.mtx .cub{position:absolute;width:40px;height:40px;left:calc(var(--i) * 50px + 10px);top:calc(var(--j) * 45px + 10px);background:color-mix(in srgb,var(--c' + (1 + vi % 2) + ',' + (vi % 2 ? C2 : C1) + ') 70%,#0a0a14);border:1px solid color-mix(in srgb,var(--c2,' + C2 + ') 60%,transparent);box-shadow:0 0 10px color-mix(in srgb,var(--c1,' + C1 + ') 35%,transparent);animation:d3-mtc' + vi + ' var(--dur,3s) ease-in-out infinite;animation-delay:calc((var(--i) + var(--j)) * var(--st,.35s))}',
          kf('d3-mt' + vi, [
            '0%{transform:rotateX(-18deg) rotateY(32deg)}100%{transform:rotateX(-18deg) rotateY(392deg)}',
            '0%,100%{transform:rotateX(-18deg) rotateY(32deg)}50%{transform:rotateX(-18deg) rotateY(42deg) translateZ(20px)}',
            '0%{transform:rotateX(-24deg) rotateY(32deg)}100%{transform:rotateX(-12deg) rotateY(392deg)}',
            '0%,100%{transform:rotateX(-18deg) rotateY(32deg) scale(1)}50%{transform:rotateX(-18deg) rotateY(32deg) scale(1.06)}',
            '0%{transform:rotateX(-18deg) rotateY(32deg) rotateZ(0)}100%{transform:rotateX(-18deg) rotateY(32deg) rotateZ(360deg)}',
            '0%,100%{transform:rotateX(-18deg) rotateY(32deg) translateZ(0)}50%{transform:rotateX(-18deg) rotateY(32deg) translateZ(-24px)}'
          ][vi]),
          kf('d3-mtc' + vi, [
            '0%,100%{transform:scale(1);opacity:.75}50%{transform:scale(1.12);opacity:1}',
            '0%,100%{transform:translateZ(0)}50%{transform:translateZ(22px)}',
            '0%,100%{transform:rotateZ(0)}50%{transform:rotateZ(45deg)}',
            '0%,100%{transform:scale(1)}50%{transform:scale(.88)}'
          ][vi % 4])
        ]),
        cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 6, 30, .5, 14, 's'), range('Stagger', '--st', .05, .8, .05, .35, 's'),
          col('Cube', '--c1', C1), col('Cube B', '--c2', C2)]
      });
    });

    /* ---- 11. gyroscopes (6) ---- */
    var gyroNames = ['Gyro Slow', 'Gyro Fast', 'Triple Gyro', 'Quad Gyro', 'Slow Gyro', 'Storm Gyro'];
    gyroNames.forEach(function (name, vi) {
      var rings = 3 + (vi % 2);
      pool.push({
        family: 'd3gyro', id: 'd3gyro-' + vi, title: name,
        tags: ['css', '3d', 'gyroscope', 'big'],
        html: '<div class="d3"><div class="gy">' +
        Array.apply(null, { length: rings }).map(function (_, i) { return '<i style="--i:' + i + '"></i>'; }).join('') +
        '<b class="core"></b></div></div>',
        css: join([
          d3Base,
          '.gy{position:relative;width:150px;height:150px;transform-style:preserve-3d;animation:d3-gy' + vi + ' var(--dur,12s) linear infinite}',
          '.gy i{position:absolute;inset:calc(var(--i) * -14px);border-radius:50%;border:3px solid color-mix(in srgb,var(--c' + (1 + vi % 3) + ',' + [C1, C2, C3][vi % 3] + ') 80%,transparent);box-shadow:0 0 16px color-mix(in srgb,var(--c1,' + C1 + ') 40%,transparent)}',
          '.gy i:nth-child(1){animation:d3-gyr' + vi + 'a var(--dur,8s) linear infinite}',
          '.gy i:nth-child(2){animation:d3-gyr' + vi + 'b var(--dur,6s) linear infinite}',
          '.gy i:nth-child(3){animation:d3-gyr' + vi + 'c var(--dur,4s) linear infinite}',
          '.gy i:nth-child(4){animation:d3-gyr' + vi + 'd var(--dur,3s) linear infinite}',
          '.gy .core{position:absolute;left:50%;top:50%;width:22px;height:22px;margin:-11px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,var(--c4,' + C4 + ') 60%,#7a5a14);box-shadow:0 0 22px var(--c4,' + C4 + ');animation:d3-gyc var(--dur,2s) ease-in-out infinite}',
          kf('d3-gy' + vi, 'to{transform:rotateZ(1turn)}'),
          kf('d3-gyr' + vi + 'a', 'to{transform:rotateX(1turn)}'),
          kf('d3-gyr' + vi + 'b', 'to{transform:rotateY(1turn)}'),
          kf('d3-gyr' + vi + 'c', 'to{transform:rotateX(1turn) rotateY(1turn)}'),
          kf('d3-gyr' + vi + 'd', 'to{transform:rotateY(1turn) rotateZ(1turn)}'),
          kf('d3-gyc', '0%,100%{transform:scale(1)}50%{transform:scale(1.25)}')
        ]),
        cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 4, 24, .5, 12, 's'),
          col('Ring', '--c1', C1), col('Ring B', '--c2', C2), col('Core', '--c4', C4)]
      });
    });

    /* ---- 12. 3D doors (6) ---- */
    var doorNames = ['Vault Door', 'Portal Door', 'Grand Door', 'Hatch Door', 'Gate Door', 'Lift Door'];
    doorNames.forEach(function (name, vi) {
      pool.push({
        family: 'd3door', id: 'd3door-' + vi, title: name,
        tags: ['css', '3d', 'door', 'big'],
        html: '<div class="d3"><div class="dr"><i class="frame"></i><div class="panel"><i class="dface"></i></div><i class="glow"></i></div></div>',
        css: join([
          d3Base,
          '.dr{position:relative;width:120px;height:170px;transform-style:preserve-3d;transform:rotateY(-24deg)}',
          '.dr .frame{position:absolute;inset:-10px;border:8px solid #23233a;border-radius:6px}',
          '.dr .panel{position:absolute;inset:0;transform-style:preserve-3d;transform-origin:left;animation:d3-dr' + vi + ' var(--dur,5s) cubic-bezier(.6,0,.3,1) infinite}',
          '.dr .dface{position:absolute;inset:0;background:' +
            [
              'linear-gradient(135deg,#3a3a55,#23233a 60%,#2e2e48)',
              'linear-gradient(135deg,color-mix(in srgb,var(--c1,' + C1 + ') 65%,#0a0a14),#14142a)',
              'linear-gradient(180deg,#4a3a2a,#2a2018)',
              'linear-gradient(135deg,#2c3444,#1a2030)',
              'linear-gradient(135deg,color-mix(in srgb,var(--c5,' + C5 + ') 40%,#141420),#10101c)',
              'linear-gradient(135deg,#333350,#1c1c30)'
            ][vi] +
            ';border-radius:4px;box-shadow:inset 0 0 0 3px rgba(255,255,255,.06);display:grid;place-items:center}',
          '.dr .dface::after{content:"";width:14px;height:14px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#8a8aa8 70%);box-shadow:0 0 14px rgba(255,255,255,.5)}',
          '.dr .glow{position:absolute;inset:0;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--c2,' + C2 + ') 35%,transparent));opacity:0;animation:d3-drg' + vi + ' var(--dur,5s) ease-in-out infinite}',
          kf('d3-dr' + vi, [
            '0%,35%{transform:rotateY(0)}55%,85%{transform:rotateY(-105deg)}100%{transform:rotateY(0)}',
            '0%,100%{transform:rotateY(0)}45%,60%{transform:rotateY(115deg)}',
            '0%,40%{transform:rotateY(0)}55%,70%{transform:rotateY(-130deg)}85%,100%{transform:rotateY(0)}',
            '0%,100%{transform:rotateY(0) translateZ(0)}50%{transform:rotateY(0) translateZ(30px) rotateY(-120deg)}',
            '0%,30%{transform:rotateY(0)}50%,70%{transform:rotateY(-90deg)}90%,100%{transform:rotateY(0)}',
            '0%,100%{transform:rotateY(0) translateY(0)}50%{transform:rotateY(0) translateY(-26px) rotateY(-100deg)}'
          ][vi]),
          kf('d3-drg' + vi, '0%,35%{opacity:0}50%,75%{opacity:1}90%,100%{opacity:0}')
        ]),
        cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 2, 10, .5, 5, 's'), col('Glow', '--c2', C2), col('Tint', '--c1', C1), col('Tint B', '--c5', C5)]
      });
    });

    /* ---- 13. 3D clocks (6) ---- */
    ['Clockwork', 'Neon Clock', 'Retro Clock', 'Atomic Clock', 'Night Clock', 'Solar Clock'].forEach(function (name, vi) {
      pool.push({
        family: 'd3clk', id: 'd3clk-' + vi, title: name,
        tags: ['css', '3d', 'clock', 'big'],
        html: '<div class="d3"><div class="clk">' +
        Array.apply(null, { length: 12 }).map(function (_, i) { return '<i class="tk" style="--i:' + i + '"></i>'; }).join('') +
        '<i class="hh"></i><i class="mm"></i><i class="ss"></i><b class="hub"></b></div></div>',
        css: join([
          d3Base,
          '.clk{position:relative;width:150px;height:150px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#232338,#12121e 75%);border:4px solid color-mix(in srgb,var(--c1,' + C1 + ') 70%,transparent);box-shadow:0 0 30px color-mix(in srgb,var(--c1,' + C1 + ') 45%,transparent),inset 0 0 24px rgba(0,0,0,.6);transform:rotateX(26deg);transform-style:preserve-3d}',
          '.clk .tk{position:absolute;left:50%;top:6px;width:3px;height:10px;margin-left:-1.5px;border-radius:3px;background:rgba(255,255,255,.5);transform-origin:50% 69px;transform:rotate(calc(var(--i) * 30deg))}',
          '.clk .hh,.clk .mm,.clk .ss{position:absolute;left:50%;bottom:50%;transform-origin:50% 100%;border-radius:99px}',
          '.clk .hh{width:6px;height:36px;margin-left:-3px;background:#e8e8f5;animation:d3-ck' + vi + 'h 72s linear infinite}',
          '.clk .mm{width:4px;height:52px;margin-left:-2px;background:#e8e8f5;animation:d3-ck' + vi + 'm 12s linear infinite}',
          '.clk .ss{width:2px;height:58px;margin-left:-1px;background:var(--c3,' + C3 + ');animation:d3-ck' + vi + 's 3s linear infinite}',
          '.clk .hub{position:absolute;left:50%;top:50%;width:12px;height:12px;margin:-6px;border-radius:50%;background:var(--c2,' + C2 + ');box-shadow:0 0 12px var(--c2,' + C2 + ')}',
          kf('d3-ck' + vi + 'h', 'to{transform:rotate(360deg)}'),
          kf('d3-ck' + vi + 'm', 'to{transform:rotate(360deg)}'),
          kf('d3-ck' + vi + 's', 'to{transform:rotate(360deg)}')
        ]),
        cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'),
          col('Rim', '--c1', C1), col('Hub', '--c2', C2), col('Second', '--c3', C3)]
      });
    });

    /* ---- 14. arches (8) ---- */
    var archNames = ['Grand Arch', 'Neon Arch', 'Stone Arch', 'Light Arch', 'Ribbon Arch', 'Portal Arch', 'Wave Arch', 'Star Arch'];
    archNames.forEach(function (name, vi) {
      var segs = 8;
      pool.push({
        family: 'd3arch', id: 'd3arch-' + vi, title: name,
        tags: ['css', '3d', 'arch', 'big'],
        html: '<div class="d3"><div class="ac">' +
        Array.apply(null, { length: segs }).map(function (_, i) {
          var a = 180 - (i + .5) * (180 / segs);
          return '<i class="sg" style="--i:' + i + ';--a:' + a.toFixed(1) + 'deg"></i>';
        }).join('') + '<u class="floor"></u></div></div>',
        css: join([
          d3Base,
          '.ac{position:relative;width:170px;height:170px;transform-style:preserve-3d;transform:rotateX(30deg);animation:d3-ac' + vi + ' var(--dur,14s) linear infinite}',
          '.ac .sg{position:absolute;left:50%;top:50%;width:14px;height:70px;margin-left:-7px;transform-origin:50% 0;transform:translateY(-70px) rotateZ(calc(var(--a) - 90deg)) rotateX(0deg);background:linear-gradient(180deg,color-mix(in srgb,var(--c' + (1 + vi % 3) + ',' + [C1, C2, C3][vi % 3] + ') 85%,#fff),color-mix(in srgb,var(--c1,' + C1 + ') 45%,#0a0a14));border-radius:4px;box-shadow:0 0 12px color-mix(in srgb,var(--c2,' + C2 + ') 40%,transparent);animation:d3-acs' + vi + ' var(--dur,3s) ease-in-out infinite;animation-delay:calc(var(--i) * -.28s)}',
          '.ac .floor{position:absolute;left:50%;top:50%;width:190px;height:190px;margin:-95px;border-radius:50%;border:2px dashed color-mix(in srgb,var(--c4,' + C4 + ') 45%,transparent);transform:rotateX(90deg)}',
          kf('d3-ac' + vi, [
            '0%{transform:rotateX(30deg) rotateZ(0)}100%{transform:rotateX(30deg) rotateZ(360deg)}',
            '0%,100%{transform:rotateX(30deg) rotateZ(0)}50%{transform:rotateX(30deg) rotateZ(14deg)}',
            '0%{transform:rotateX(30deg) rotateZ(0) scale(1)}50%{transform:rotateX(30deg) rotateZ(180deg) scale(1.05)}100%{transform:rotateX(30deg) rotateZ(360deg) scale(1)}',
            '0%{transform:rotateX(30deg) rotateZ(0)}100%{transform:rotateX(30deg) rotateZ(-360deg)}',
            '0%,100%{transform:rotateX(30deg) rotateZ(0) translateZ(0)}50%{transform:rotateX(30deg) rotateZ(180deg) translateZ(16px)}',
            '0%{transform:rotateX(30deg) rotateZ(0)}100%{transform:rotateX(30deg) rotateZ(360deg)}',
            '0%,100%{transform:rotateX(24deg) rotateZ(0)}50%{transform:rotateX(36deg) rotateZ(180deg)}',
            '0%{transform:rotateX(30deg) rotateZ(0) rotateY(0)}100%{transform:rotateX(30deg) rotateZ(360deg) rotateY(360deg)}'
          ][vi]),
          kf('d3-acs' + vi, '0%,100%{opacity:.55}50%{opacity:1;box-shadow:0 0 20px color-mix(in srgb,var(--c2,' + C2 + ') 80%,transparent)}')
        ]),
        cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 6, 26, .5, 14, 's'),
          col('Arch', '--c1', C1), col('Glow', '--c2', C2), col('Arch C', '--c3', C3), col('Floor', '--c4', C4)]
      });
    });

    K.add('3d', pool);
  })();

  /* ══════════════════════════════ INTERACTION (94) ══════════════════════════════ */
  (function () {
    var pool = [];
    var moBase = '.mo{width:100%;height:var(--h,240px);border-radius:12px;background:radial-gradient(90% 100% at 50% 20%,#10101c,#07070d);overflow:hidden;position:relative}';

    /* ---- 1. parallax layers (8, JS) ---- */
    ['Star Parallax', 'Cloud Parallax', 'City Parallax', 'Forest Parallax', 'Snow Parallax', 'Lava Parallax', 'Holo Parallax', 'Deep Parallax'].forEach(function (name, vi) {
      pool.push({
        family: 'mopar', id: 'mopar-' + vi, title: name,
        tags: ['js', 'parallax', 'pointer', 'big'],
        html: '<div class="mo"><i class="l3"></i><i class="l2"></i><i class="l1"></i><i class="l0"></i><p class="hint">move your cursor</p></div>',
        css: join([
          moBase,
          '.mo .l0,.mo .l1,.mo .l2,.mo .l3{position:absolute;inset:-20%;will-change:transform}',
          '.mo .l3{background:radial-gradient(circle at 20% 30%,color-mix(in srgb,var(--c1,' + C1 + ') 60%,transparent) 0 2px,transparent 3px),radial-gradient(circle at 70% 60%,color-mix(in srgb,var(--c1,' + C1 + ') 50%,transparent) 0 2px,transparent 3px),radial-gradient(circle at 45% 80%,color-mix(in srgb,var(--c1,' + C1 + ') 55%,transparent) 0 2px,transparent 3px),radial-gradient(circle at 85% 20%,color-mix(in srgb,var(--c1,' + C1 + ') 45%,transparent) 0 2px,transparent 3px);background-size:90px 90px}',
          '.mo .l2{background:radial-gradient(circle at 30% 40%,color-mix(in srgb,var(--c2,' + C2 + ') 40%,transparent) 0 26px,transparent 27px),radial-gradient(circle at 75% 70%,color-mix(in srgb,var(--c2,' + C2 + ') 35%,transparent) 0 40px,transparent 41px);filter:blur(6px)}',
          '.mo .l1{background:radial-gradient(ellipse at 25% 65%,color-mix(in srgb,var(--c3,' + C3 + ') 30%,transparent) 0 60px,transparent 61px),radial-gradient(ellipse at 70% 30%,color-mix(in srgb,var(--c3,' + C3 + ') 25%,transparent) 0 80px,transparent 81px);filter:blur(10px)}',
          '.mo .l0{background:radial-gradient(circle at 50% 50%,color-mix(in srgb,var(--c4,' + C4 + ') 22%,transparent) 0 120px,transparent 121px);filter:blur(18px)}',
          '.mo .hint{position:absolute;bottom:10px;left:0;right:0;text-align:center;font:600 10px system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.35)}'
        ]),
        js: 'var host=root.querySelector(".mo"),ls=[].slice.call(host.querySelectorAll("i")),depth=[26,16,9,4];\n' +
          'var tx=0,ty=0,cx=0,cy=0;\n' +
          'var onMove=function(e){var r=host.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;};\n' +
          'var onLeave=function(){tx=0;ty=0;};\n' +
          'host.addEventListener("pointermove",onMove);\n' +
          'host.addEventListener("pointerleave",onLeave);\n' +
          'api.raf(function(){cx+=(tx-cx)*.06;cy+=(ty-cy)*.06;\n' +
          '  for(var i=0;i<ls.length;i++){ls[i].style.transform="translate3d("+(cx*depth[i]).toFixed(1)+"px,"+(cy*depth[i]).toFixed(1)+"px,0)";}\n' +
          '});\napi.onCleanup(function(){host.removeEventListener("pointermove",onMove);host.removeEventListener("pointerleave",onLeave);});',
        cfg: [range('Scene height', '--h', 140, 420, 2, 240, 'px'),
          col('Layer A', '--c1', C1), col('Layer B', '--c2', C2), col('Layer C', '--c3', C3), col('Layer D', '--c4', C4)]
      });
    });

    /* ---- 2. marquee walls (8) ---- */
    var marqSets = [
      ['MOTION', 'LAB', 'CSS', 'JS'], ['ANIMATE', 'EVERYTHING', 'SHIP', 'IT'],
      ['BIG', 'BOLD', 'BRIGHT', 'FAST'], ['CLICK', 'HOVER', 'DRAG', 'DROP'],
      ['TYPE', 'GRID', 'MASK', 'REVEAL'], ['SPIN', 'GLIDE', 'PULSE', 'WAVE'],
      ['DRAW', 'MORPH', 'FLIP', 'ROLL'], ['SCROLL', 'ZOOM', 'PAN', 'TILT']
    ];
    marqSets.forEach(function (words, vi) {
      pool.push({
        family: 'momar', id: 'momar-' + vi, title: words[0] + ' Marquee Wall',
        tags: ['css', 'marquee', 'wall', 'big'],
        html: '<div class="mo mq">' +
        [0, 1, 2, 3].map(function (r) {
          var line = words.map(function (w) { return '<b>' + w + '</b><i>✦</i>'; }).join('');
          return '<div class="row' + (r % 2 ? ' rev' : '') + '" style="--r:' + r + '"><span>' + line + line + '</span></div>';
        }).join('') + '</div>',
        css: join([
          moBase,
          '.mq{display:grid;grid-template-rows:repeat(4,1fr);gap:6px;padding:10px}',
          '.mq .row{overflow:hidden;display:flex}',
          '.mq .row span{display:inline-flex;align-items:center;gap:18px;white-space:nowrap;animation:mq-r' + vi + ' var(--dur,10s) linear infinite;font:800 var(--fs,30px) system-ui,sans-serif;color:var(--c' + (1 + vi % 3) + ',' + [C1, C2, C3][vi % 3] + ');opacity:var(--op,.85)}',
          '.mq .row.rev span{animation-direction:reverse;opacity:.55}',
          '.mq .row i{font-style:normal;font-size:.5em;color:var(--c2,' + C2 + ')}',
          '.mq .row:nth-child(2) span{font-size:calc(var(--fs,30px) * 1.2);-webkit-text-stroke:1px var(--c1,' + C1 + ');color:transparent}',
          kf('mq-r' + vi, 'to{transform:translateX(-50%)}')
        ]),
        cfg: [range('Scene height', '--h', 140, 420, 2, 240, 'px'), range('Font size', '--fs', 16, 52, 1, 30, 'px'), range('Cycle', '--dur', 3, 24, .5, 10, 's'),
          col('Ink', '--c1', C1), col('Star', '--c2', C2), col('Ink C', '--c3', C3)]
      });
    });

    /* ---- 3. cursor trails (8, JS) ---- */
    ['Dot Trail', 'Ring Trail', 'Spark Trail', 'Ghost Trail', 'Bubble Trail', 'Star Trail', 'Comet Trail', 'Petal Trail'].forEach(function (name, vi) {
      pool.push({
        family: 'motrail', id: 'motrail-' + vi, title: name,
        tags: ['js', 'cursor', 'trail', 'pointer'],
        html: '<div class="mo"><p class="hint">move your cursor</p></div>',
        css: join([
          moBase,
          '.mo .hint{position:absolute;bottom:10px;left:0;right:0;text-align:center;font:600 10px system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.35);z-index:2}',
          '.mo i{position:absolute;left:0;top:0;pointer-events:none;will-change:transform,opacity}',
          '.mo i.d{width:10px;height:10px;border-radius:50%;background:var(--c1,' + C1 + ');box-shadow:0 0 12px var(--c1,' + C1 + ')}',
          '.mo i.r{width:26px;height:26px;border:2px solid var(--c2,' + C2 + ');border-radius:50%}',
          '.mo i.s{width:12px;height:12px;background:var(--c4,' + C4 + ');clip-path:polygon(50% 0,61% 39%,100% 50%,61% 61%,50% 100%,39% 61%,0 50%,39% 39%)}',
          '.mo i.g{width:30px;height:30px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--c3,' + C3 + ') 50%,transparent),transparent 70%)}',
          '.mo i.b{width:18px;height:18px;border-radius:50%;background:transparent;border:2px solid color-mix(in srgb,var(--c2,' + C2 + ') 70%,transparent)}',
          '.mo i.t{width:14px;height:14px;background:var(--c2,' + C2 + ');clip-path:polygon(50% 0,63% 36%,100% 38%,70% 59%,80% 100%,50% 76%,20% 100%,30% 59%,0 38%,37% 36%)}',
          '.mo i.c{width:20px;height:20px;border-radius:50%;background:radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--c1,' + C1 + ') 80%,#fff),var(--c1,' + C1 + ') 60%,transparent);filter:blur(1px)}',
          '.mo i.p{width:16px;height:16px;border-radius:50% 50% 50% 0;background:var(--c3,' + C3 + ');transform:rotate(45deg)}'
        ]),
        js: 'var host=root.querySelector(".mo"),N=14,parts=[],t=0,started=false;\n' +
          'for(var i=0;i<N;i++){var p=document.createElement("i");p.className="' + ['d', 'r', 's', 'g', 'b', 't', 'c', 'p'][vi] + '";p.style.opacity=0;host.appendChild(p);parts.push({el:p,x:-100,y:-100});}\n' +
          'var tx=0,ty=0,px=0,py=0;\n' +
          'var onMove=function(e){var r=host.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top;px=tx;py=ty;started=true;};\n' +
          'host.addEventListener("pointermove",onMove);\n' +
          'api.raf(function(){t+=.016;\n' +
          '  if(!started)return;\n' +
          '  px+=(tx-px)*.4;py+=(ty-py)*.4;\n' +
          '  for(var i=parts.length-1;i>0;i--){parts[i].x=parts[i-1].x;parts[i].y=parts[i-1].y;}\n' +
          '  parts[0].x=px;parts[0].y=py;\n' +
          '  for(var j=0;j<parts.length;j++){var k=1-j/parts.length;parts[j].el.style.transform="translate("+(parts[j].x-6).toFixed(1)+"px,"+(parts[j].y-6).toFixed(1)+"px) scale("+(.3+k*.7).toFixed(2)+")";parts[j].el.style.opacity=(k*.9).toFixed(2);}\n' +
          '});\napi.onCleanup(function(){host.removeEventListener("pointermove",onMove);});',
        cfg: [range('Scene height', '--h', 140, 420, 2, 240, 'px'),
          col('A', '--c1', C1), col('B', '--c2', C2), col('C', '--c3', C3), col('D', '--c4', C4)]
      });
    });

    /* ---- 4. drag boards (8, JS) ---- */
    var dragNames = ['Tile Board', 'Puzzle Grid', 'Block Yard', 'Card Table', 'Chip Field', 'Patch Bay', 'Brick Wall', 'Tile Loft'];
    dragNames.forEach(function (name, vi) {
      var n = 6;
      pool.push({
        family: 'modrag', id: 'modrag-' + vi, title: name,
        tags: ['js', 'drag', 'pointer', 'ui'],
        html: '<div class="mo"><p class="hint">drag the pieces</p></div>',
        css: join([
          moBase,
          '.mo .hint{position:absolute;bottom:10px;left:0;right:0;text-align:center;font:600 10px system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.35);z-index:1}',
          '.mo i{position:absolute;width:52px;height:52px;border-radius:' + (vi % 2 ? '12px' : '50%') + ';background:linear-gradient(135deg,var(--c' + (1 + vi % 3) + ',' + [C1, C2, C3][vi % 3] + '),color-mix(in srgb,var(--c2,' + C2 + ') 60%,#000));box-shadow:0 8px 18px rgba(0,0,0,.5);cursor:grab;transition:box-shadow .2s;will-change:transform}',
          '.mo i:active{cursor:grabbing;box-shadow:0 16px 30px rgba(0,0,0,.65)}'
        ]),
        js: 'var host=root.querySelector(".mo"),pieces=[];\n' +
          'for(var i=0;i<' + n + ';i++){var p=document.createElement("i");\n' +
          '  p.style.left=(20+Math.random()*70)+"%";p.style.top=(15+Math.random()*60)+"%";\n' +
          '  host.appendChild(p);pieces.push(p);}\n' +
          'var drag=null,dx=0,dy=0;\n' +
          'host.addEventListener("pointerdown",function(e){var t=e.target;if(t.tagName!=="I")return;drag=t;var r=host.getBoundingClientRect();dx=e.clientX-r.left-t.offsetLeft;dy=e.clientY-r.top-t.offsetTop;t.style.zIndex=10;t.setPointerCapture(e.pointerId);});\n' +
          'host.addEventListener("pointermove",function(e){if(!drag)return;var r=host.getBoundingClientRect();drag.style.left=(e.clientX-r.left-dx)+"px";drag.style.top=(e.clientY-r.top-dy)+"px";});\n' +
          'host.addEventListener("pointerup",function(){if(drag){drag.style.zIndex="";drag=null;}});\n' +
          'api.onCleanup(function(){host.removeEventListener("pointerdown",arguments.callee);});',
        cfg: [range('Scene height', '--h', 140, 420, 2, 240, 'px'), col('A', '--c1', C1), col('B', '--c2', C2), col('C', '--c3', C3)]
      });
    });

    /* ---- 5. confetti storms (8, JS) ---- */
    var confNames = ['Confetti Storm', 'Celebration Burst', 'Party Rain', 'Gold Confetti', 'Raindrop Party', 'Star Shower', 'Bubble Pop', 'Ribbon Fall'];
    confNames.forEach(function (name, vi) {
      pool.push({
        family: 'moconf', id: 'moconf-' + vi, title: name,
        tags: ['js', 'confetti', 'click', 'big'],
        html: '<div class="mo"><p class="hint">click to burst</p></div>',
        css: join([
          moBase,
          '.mo .hint{position:absolute;bottom:10px;left:0;right:0;text-align:center;font:600 10px system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.35);z-index:2}',
          '.mo i{position:absolute;width:8px;height:12px;pointer-events:none}',
          '.mo i.sq{background:var(--c1,' + C1 + ')}',
          '.mo i.ct{width:10px;height:10px;border-radius:50%;background:var(--c2,' + C2 + ')}',
          '.mo i.st{background:var(--c4,' + C4 + ');clip-path:polygon(50% 0,61% 39%,100% 50%,61% 61%,50% 100%,39% 61%,0 50%,39% 39%)}',
          '.mo i.rb{width:4px;height:16px;background:var(--c3,' + C3 + ');border-radius:2px}'
        ]),
        js: 'var host=root.querySelector(".mo"),cols=["#7c5cff","#22d3ee","#ff5c8a","#ffd479","#34d399"];\n' +
          'function burst(x,y){var r=host.getBoundingClientRect();var bx=x==null?r.width/2:x-r.left,by=y==null?r.height/2:y-r.top;\n' +
          '  for(var i=0;i<26;i++){var p=document.createElement("i");p.className=["sq","ct","st","rb"][i%4];\n' +
          '    p.style.left=bx+"px";p.style.top=by+"px";p.style.background=cols[i%cols.length];\n' +
          '    host.appendChild(p);var a=Math.random()*6.283,v=60+Math.random()*130,rot=Math.random()*720-360;\n' +
          '    p.animate([{transform:"translate(0,0) rotate(0)",opacity:1},{transform:"translate("+(Math.cos(a)*v).toFixed(0)+"px,"+(Math.sin(a)*v*1.3+90).toFixed(0)+"px) rotate("+rot+"deg)",opacity:0}],{duration:900+Math.random()*500,easing:"cubic-bezier(.2,.6,.3,1)"}).onfinish=function(){p.remove();}}}\n' +
          'var onDown=function(e){burst(e.clientX,e.clientY);};\n' +
          'host.addEventListener("pointerdown",onDown);\n' +
          'var iv=setInterval(function(){burst();},2200);\n' +
          'api.onCleanup(function(){clearInterval(iv);host.removeEventListener("pointerdown",onDown);});',
        cfg: [range('Scene height', '--h', 140, 420, 2, 240, 'px'), col('Square', '--c1', C1), col('Dot', '--c2', C2), col('Ribbon', '--c3', C3), col('Star', '--c4', C4)]
      });
    });

    /* ---- 6. sticky boards (6) ---- */
    ['Idea Board', 'Task Wall', 'Mood Board', 'Meeting Notes', 'Sprint Wall', 'Dream Board'].forEach(function (name, vi) {
      pool.push({
        family: 'mostky', id: 'mostky-' + vi, title: name,
        tags: ['css', 'sticky', 'board', 'ui'],
        html: '<div class="mo"><div class="board">' +
        [0, 1, 2, 3].map(function (i) {
          return '<i class="note n' + i + '" style="--i:' + i + ';--r:' + (((vi * 3 + i * 11) % 24) - 12) + 'deg"><b>✦</b><u></u><u></u></i>';
        }).join('') + '</div></div>',
        css: join([
          moBase,
          '.board{position:absolute;inset:16px}',
          '.note{position:absolute;width:86px;height:86px;padding:10px;border-radius:4px;box-shadow:0 10px 20px rgba(0,0,0,.4);transform:rotate(var(--r,0deg));animation:mk-b' + vi + ' var(--dur,4s) ease-in-out infinite;animation-delay:calc(var(--i) * var(--st,.7s))}',
          '.note.n0{background:' + ['#ffe66d', '#7bdff2', '#ff9ecb', '#b8ff9e'][(vi + 0) % 4] + '}',
          '.note.n1{background:' + ['#ffe66d', '#7bdff2', '#ff9ecb', '#b8ff9e'][(vi + 1) % 4] + '}',
          '.note.n2{background:' + ['#ffe66d', '#7bdff2', '#ff9ecb', '#b8ff9e'][(vi + 2) % 4] + '}',
          '.note.n3{background:' + ['#ffe66d', '#7bdff2', '#ff9ecb', '#b8ff9e'][(vi + 3) % 4] + '}',
          '.note b{display:block;font-size:15px;color:#26221a;margin-bottom:4px}',
          '.note u{display:block;height:6px;border-radius:99px;background:rgba(0,0,0,.22);margin:5px 0}',
          '.note u:last-child{width:60%}',
          '.note:nth-child(1){left:8%;top:12%}',
          '.note:nth-child(2){left:48%;top:6%}',
          '.note:nth-child(3){left:12%;top:52%}',
          '.note:nth-child(4){left:52%;top:48%}',
          kf('mk-b' + vi, [
            '0%,100%{transform:rotate(var(--r,0deg)) translateY(0)}50%{transform:rotate(var(--r,0deg)) translateY(-8px)}',
            '0%,100%{transform:rotate(var(--r,0deg))}25%{transform:rotate(calc(var(--r,0deg) + 2deg))}75%{transform:rotate(calc(var(--r,0deg) - 2deg))}',
            '0%,100%{transform:rotate(var(--r,0deg)) scale(1)}50%{transform:rotate(var(--r,0deg)) scale(1.05)}',
            '0%,100%{transform:rotate(var(--r,0deg)) translateY(0);opacity:1}50%{transform:rotate(var(--r,0deg)) translateY(4px);opacity:.9}'
          ][vi % 4])
        ]),
        cfg: [range('Scene height', '--h', 140, 420, 2, 240, 'px'), range('Cycle', '--dur', 1.5, 8, .1, 4, 's'), range('Stagger', '--st', .1, 2, .05, .7, 's')]
      });
    });

    /* ---- 7. odometers (8) ---- */
    var odoNames = ['Odometer Classic', 'Mile Counter', 'Score Tally', 'Revenue Odo', 'Count-Up Wall', 'Ticker Odo', 'Pace Counter', 'Level Odo'];
    odoNames.forEach(function (name, vi) {
      pool.push({
        family: 'moodo', id: 'moodo-' + vi, title: name,
        tags: ['css', 'odometer', 'counter'],
        html: '<div class="mo"><div class="odo">' +
        [0, 1, 2, 3].map(function (i) {
          return '<div class="d"><i class="reel" style="--i:' + i + '">' +
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (n) { return '<b>' + n + '</b>'; }).join('') +
            '</i></div>';
        }).join('') + '</div><p class="cap">' + ['km travelled', 'sessions', 'points', 'revenue $', 'requests', 'messages', 'pace bpm', 'level up'][vi] + '</p></div>',
        css: join([
          moBase,
          '.odo{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);display:flex;gap:8px}',
          '.odo .d{width:52px;height:64px;border-radius:10px;background:#0c0c16;border:1px solid rgba(255,255,255,.1);overflow:hidden;box-shadow:inset 0 -18px 20px rgba(0,0,0,.65)}',
          '.odo .reel{animation:od-r' + vi + ' var(--dur,' + (1 + vi * .4).toFixed(1) + 's) steps(10,end) infinite;animation-delay:calc(var(--i) * -' + (vi % 5) + '.4s)}',
          '.odo .reel b{display:grid;place-items:center;height:64px;font:800 30px "JetBrains Mono",monospace;color:var(--c2,' + C2 + ')}',
          '.cap{position:absolute;bottom:14px;left:0;right:0;text-align:center;font:600 10px system-ui,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:rgba(255,255,255,.4)}',
          kf('od-r' + vi, 'to{transform:translateY(-640px)}')
        ]),
        cfg: [range('Scene height', '--h', 140, 320, 2, 240, 'px'), range('Cycle', '--dur', .8, 4, .1, 1 + vi * .4, 's'), col('Digit', '--c2', C2)]
      });
    });

    /* ---- 8. departure boards (8, JS) ---- */
    var depNames = ['Departure Board', 'Arr Board', 'Gate Board', 'Platform Board', 'Terminal Board', 'Night Board', 'Cargo Board', 'Orbit Board'];
    depNames.forEach(function (name, vi) {
      var rows = [['LIS', '14:20', 'GATE B'], ['OSL', '15:05', 'GATE A'], ['JFK', '16:40', 'GATE C']];
      pool.push({
        family: 'moboard', id: 'moboard-' + vi, title: name,
        tags: ['js', 'board', 'splitflap', 'big'],
        html: '<div class="mo"><div class="db">' +
        rows.map(function (r) { return '<div class="row"><span class="cd" data-ch="' + r[0] + '"></span><span class="cd" data-ch="' + r[1] + '"></span><span class="st" data-ch="' + r[2] + '"></span></div>'; }).join('') +
        '</div></div>',
        css: join([
          moBase,
          '.db{position:absolute;inset:24px;display:flex;flex-direction:column;justify-content:center;gap:12px}',
          '.db .row{display:flex;gap:12px}',
          '.db .cd,.db .st{display:flex;gap:3px}',
          '.db .st{margin-left:auto}',
          '.db b{display:grid;place-items:center;width:30px;height:40px;border-radius:5px;background:#13131d;font:800 18px "JetBrains Mono",monospace;color:var(--c4,' + C4 + ');box-shadow:0 3px 8px rgba(0,0,0,.5);position:relative}',
          '.db b::after{content:"";position:absolute;left:4px;right:4px;top:50%;height:1.5px;background:rgba(0,0,0,.5)}',
          '.db b.flip{animation:db-f var(--fdur,.5s) ease-in-out}',
          kf('db-f', '0%,100%{transform:rotateX(0)}50%{transform:rotateX(-80deg)}')
        ]),
        js: 'var K=Array.prototype.slice.call(root.querySelectorAll("[data-ch]")),chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",acc=0;\n' +
          'K.forEach(function(el){var orig=el.getAttribute("data-ch");\n' +
          '  for(var i=0;i<orig.length;i++){var n=document.createElement("b");n.textContent=orig[i];el.appendChild(n);}});\n' +
          'api.raf(function(){acc+=.016;if(acc<1.2)return;acc=0;\n' +
          '  var el=K[Math.floor(Math.random()*K.length)],cells=el.children,keep=el.getAttribute("data-ch");\n' +
          '  if(!cells.length)return;\n' +
          '  var c=Math.floor(Math.random()*cells.length),f=0,ticks=6;\n' +
          '  var iv=setInterval(function(){f++;\n' +
          '    cells[c].textContent=f>=ticks?(keep.charAt(c)||"·"):chars[Math.floor(Math.random()*chars.length)];\n' +
          '    cells[c].classList.remove("flip");void cells[c].offsetWidth;cells[c].classList.add("flip");\n' +
          '    if(f>=ticks)clearInterval(iv);},80);});',
        cfg: [range('Scene height', '--h', 140, 420, 2, 240, 'px'), range('Flip', '--fdur', .2, 1.2, .05, .5, 's'), col('Ink', '--c4', C4)]
      });
    });

    /* ---- 9. card decks (8, JS) ---- */
    var deckNames = ['Classic Deck', 'Poker Deck', 'Oracle Deck', 'Star Deck', 'Runes Deck', 'Signal Deck', 'Gem Deck', 'Wave Deck'];
    deckNames.forEach(function (name, vi) {
      pool.push({
        family: 'modeck', id: 'modeck-' + vi, title: name,
        tags: ['js', 'deck', 'click', '3d'],
        html: '<div class="mo"><div class="deck"><i class="back"></i></div><p class="hint">click to draw</p></div>',
        css: join([
          moBase,
          '.deck{position:absolute;left:50%;top:44%;width:84px;height:120px;margin-left:-42px;transform-style:preserve-3d;cursor:pointer}',
          '.deck .back{position:absolute;inset:0;border-radius:12px;background:repeating-linear-gradient(45deg,var(--c1,' + C1 + ') 0 8px,color-mix(in srgb,var(--c1,' + C1 + ') 55%,#000) 8px 16px);box-shadow:0 14px 26px rgba(0,0,0,.5);border:3px solid rgba(255,255,255,.7)}',
          '.deck .card{position:absolute;inset:0;border-radius:12px;background:linear-gradient(160deg,#fbfbff,#dcdff2);border:1px solid rgba(0,0,0,.15);box-shadow:0 16px 30px rgba(0,0,0,.5);display:grid;place-items:center;font:800 40px system-ui,sans-serif;color:var(--c3,' + C3 + ')}',
          '.hint{position:absolute;bottom:10px;left:0;right:0;text-align:center;font:600 10px system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.35)}'
        ]),
        js: 'var deck=root.querySelector(".deck"),suits=["♠","♥","♦","♣"],vals=["A","K","Q","J","10","9","8","7"],n=0;\n' +
          'deck.addEventListener("click",function(){var c=document.createElement("i");c.className="card";c.textContent=suits[n%4]+vals[n%8];\n' +
          '  var x=(n%5-2)*44,y=Math.floor(n/5)*10-10;\n' +
          '  deck.appendChild(c);c.style.transform="rotate(0) translate(0,0)";\n' +
          '  c.animate([{transform:"rotate(0deg) translate(0,0)",zIndex:5},{transform:"rotate("+((n%5-2)*8)+"deg) translate("+x+"px,"+(y-46)+"px)",zIndex:1+n%9}],{duration:520,easing:"cubic-bezier(.3,.9,.3,1.1)"});\n' +
          '  n++;if(n>9){n=0;[].slice.call(deck.querySelectorAll(".card")).forEach(function(el){el.remove();});}});',
        cfg: [range('Scene height', '--h', 140, 420, 2, 240, 'px'), col('Back', '--c1', C1), col('Ink', '--c3', C3)]
      });
    });

    /* ---- 10. zoom tunnels (6) ---- */
    ['Zoom Tunnel Square', 'Zoom Tunnel Round', 'Ring Tunnel', 'Gate Tunnel', 'Depth Tunnel', 'Warp Tunnel'].forEach(function (name, vi) {
      pool.push({
        family: 'mozoom', id: 'mozoom-' + vi, title: name,
        tags: ['css', 'tunnel', 'zoom', 'big'],
        html: '<div class="mo"><div class="zn">' +
        [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { return '<i style="--i:' + i + '"></i>'; }).join('') + '</div></div>',
        css: join([
          moBase,
          '.zn{position:absolute;inset:0;display:grid;place-items:center;perspective:600px}',
          '.zn i{position:absolute;left:50%;top:50%;margin:-110px 0 0 -110px;width:220px;height:220px;border-radius:' + (vi % 2 ? '50%' : '28px') + ';border:3px solid color-mix(in srgb,var(--c' + (1 + vi % 3) + ',' + [C1, C2, C3][vi % 3] + ') 85%,transparent);animation:zn-z' + vi + ' var(--dur,3s) linear infinite;animation-delay:calc(var(--i) * calc(var(--dur,3s) / -8))}',
          kf('zn-z' + vi, '0%{transform:translateZ(-500px);opacity:0}15%{opacity:1}100%{transform:translateZ(120px);opacity:0}')
        ]),
        cfg: [range('Scene height', '--h', 140, 420, 2, 240, 'px'), range('Cycle', '--dur', 1, 7, .1, 3, 's'),
          col('Ring', '--c1', C1), col('Ring B', '--c2', C2), col('Ring C', '--c3', C3)]
      });
    });

    /* ---- 11. physics balls (6, JS) ---- */
    ['Bounce Field', 'Marble Yard', 'Super Ball', 'Jelly Ball', 'Glow Ball', 'Multi Ball'].forEach(function (name, vi) {
      pool.push({
        family: 'mobnc', id: 'mobnc-' + vi, title: name,
        tags: ['js', 'physics', 'bounce'],
        html: '<div class="mo"><i class="ball"></i></div>',
        css: join([
          moBase,
          '.mo .ball{position:absolute;width:' + (vi === 3 ? 46 : 30) + 'px;height:' + (vi === 3 ? 46 : 30) + 'px;border-radius:50%;background:radial-gradient(circle at 32% 28%,#fff,color-mix(in srgb,var(--c1,' + C1 + ') 75%,#fff) 30%,var(--c1,' + C1 + ') 70%);box-shadow:0 0 18px color-mix(in srgb,var(--c1,' + C1 + ') 70%,transparent),0 14px 20px rgba(0,0,0,.5)}'
        ]),
        js: 'var ball=root.querySelector(".ball"),host=root.querySelector(".mo"),g=1500,x=60,y=20,vx=' + (80 + vi * 24) + ',vy=0;\n' +
          'api.raf(function(){var dt=.016;vy+=g*dt;x+=vx*dt;y+=vy*dt;\n' +
          '  var w=host.clientWidth-30,h=host.clientHeight-30;\n' +
          '  if(y>h){y=h;vy*=-.82;vx*=.995;}\n' +
          '  if(x<0){x=0;vx*=-.86;}\n' +
          '  if(x>w){x=w;vx*=-.86;}\n' +
          '  if(Math.abs(vy)<40&&y>=h-1){vy=-' + (420 + vi * 40) + ';}\n' +
          '  ball.style.transform="translate("+x.toFixed(1)+"px,"+y.toFixed(1)+"px)";\n' +
          '});',
        cfg: [range('Scene height', '--h', 140, 420, 2, 240, 'px'), col('Ball', '--c1', C1)]
      });
    });

    /* ---- 12. ripple clicks (5, JS) ---- */
    ['Ripple Pool', 'Echo Click', 'Pulse Click', 'Shock Click', 'Ring Click'].forEach(function (name, vi) {
      pool.push({
        family: 'morip', id: 'morip-' + vi, title: name,
        tags: ['js', 'ripple', 'click'],
        html: '<div class="mo"><p class="hint">click anywhere</p></div>',
        css: join([
          moBase,
          '.mo .hint{position:absolute;bottom:10px;left:0;right:0;text-align:center;font:600 10px system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.35);z-index:2}',
          '.mo i{position:absolute;border-radius:50%;pointer-events:none;border:3px solid var(--c2,' + C2 + ');transform:translate(-50%,-50%) scale(0)}'
        ]),
        js: 'var host=root.querySelector(".mo"),SC=[1,1.9,2.8];\n' +
          'host.addEventListener("pointerdown",function(e){var r=host.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;\n' +
          '  for(var k=0;k<3;k++){(function(kk){var p=document.createElement("i");p.style.left=x+"px";p.style.top=y+"px";host.appendChild(p);\n' +
          '    p.animate([{transform:"translate(-50%,-50%) scale(0)",opacity:.9},{transform:"translate(-50%,-50%) scale("+SC[kk]+")",opacity:0}],{duration:700+kk*220,delay:kk*90,easing:"cubic-bezier(.2,.6,.3,1)"}).onfinish=function(){p.remove();};})(k);}});',
        cfg: [range('Scene height', '--h', 140, 420, 2, 240, 'px'), col('Ring', '--c2', C2)]
      });
    });

    /* ---- 13. flip grids (5) ---- */
    ['Flip Grid X', 'Flip Grid Y', 'Coin Grid', 'Door Grid', 'Panel Grid'].forEach(function (name, vi) {
      pool.push({
        family: 'moflip', id: 'moflip-' + vi, title: name,
        tags: ['css', 'flip', 'grid', '3d'],
        html: '<div class="mo"><div class="fg">' +
        (function () { var s = ''; for (var i = 0; i < 5; i++) for (var j = 0; j < 4; j++) s += '<i style="--i:' + (i * 4 + j) + ';--o:' + (i + j) / 8 + '"></i>'; return s; })() +
        '</div></div>',
        css: join([
          moBase,
          '.fg{position:absolute;inset:0;display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(4,1fr);gap:8px;padding:20px;perspective:700px}',
          '.fg i{background:linear-gradient(160deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));border-radius:8px;transform-origin:center;animation:fg-f' + vi + ' var(--dur,2.6s) ease-in-out infinite;animation-delay:calc(var(--o) * var(--st,-.22s))}',
          kf('fg-f' + vi, [
            '0%,100%{transform:rotateX(0)}50%{transform:rotateX(180deg)}',
            '0%,100%{transform:rotateY(0)}50%{transform:rotateY(180deg)}',
            '0%,100%{transform:rotateY(0) scale(1)}25%{transform:rotateY(90deg) scale(.6)}75%{transform:rotateY(270deg) scale(.6)}',
            '0%,100%{transform:scale(1)}50%{transform:scale(.15)}',
            '0%,100%{transform:rotateZ(0)}50%{transform:rotateZ(180deg)}'
          ][vi])
        ]),
        cfg: [range('Scene height', '--h', 140, 420, 2, 240, 'px'), range('Cycle', '--dur', 1, 6, .1, 2.6, 's'), range('Stagger', '--st', -.6, .6, .02, -.22, 's'),
          col('A', '--c1', C1), col('B', '--c2', C2)]
      });
    });

    K.add('motion', pool);
  })();

  /* ══════════════════════════════ LOADERS (+12 buffer) ══════════════════════════════ */
  (function () {
    var pool = [];
    var ringNames = ['Triple Orbit Ring', 'Counter Spiral Ring', 'Stepped Halo Ring', 'Ease Bloom Ring', 'Inset Chase Ring', 'Reverse Halo Ring', 'Scale Pulse Ring', 'Backspin Ring', 'Conic Triple Ring', 'Staggered Orbit Ring', 'Cubic Ease Ring', 'Mirrored Halo Ring'];
    ringNames.forEach(function (name, vi) {
      pool.push({
        family: 'ldmgra', id: 'ldmgra-' + vi, title: name,
        tags: ['css', 'ring', 'loader', 'big'],
        html: '<div class="lgr"><i></i><i></i><i></i></div>',
        css: join([
          '.lgr{position:relative;width:var(--size,150px);height:var(--size,150px)}',
          '.lgr i{position:absolute;border-radius:50%;border:3px solid transparent}',
          '.lgr i:nth-child(1){inset:0;border-top-color:var(--c1,' + C1 + ');border-right-color:var(--c1,' + C1 + ');animation:lg-s' + vi + ' var(--dur,1.6s) ' + ['linear', 'ease-in-out', 'steps(6,end)', 'cubic-bezier(.6,0,.3,1)'][vi % 4] + ' infinite}',
          '.lgr i:nth-child(2){inset:14%;border-top-color:var(--c2,' + C2 + ');animation:lg-s' + vi + ' var(--dur,1.6s) linear infinite reverse}',
          '.lgr i:nth-child(3){inset:28%;border-top-color:var(--c3,' + C3 + ');border-left-color:var(--c3,' + C3 + ');animation:lg-s' + vi + ' calc(var(--dur,1.6s) * .7) linear infinite}',
          kf('lg-s' + vi, [
            'to{transform:rotate(1turn)}',
            '0%{transform:rotate(0)}50%{transform:rotate(200deg)}100%{transform:rotate(360deg)}',
            'to{transform:rotate(1turn) scale(' + (0.9 + (vi % 3) * .04) + ')}',
            '0%,100%{transform:rotate(0)}50%{transform:rotate(-200deg)}'
          ][vi % 4])
        ]),
        cfg: [range('Diameter', '--size', 80, 220, 2, 150, 'px'), range('Cycle', '--dur', .4, 4, .05, 1.6, 's'),
          col('Ring A', '--c1', C1), col('Ring B', '--c2', C2), col('Ring C', '--c3', C3)]
      });
    });
    K.add('loaders', pool);
  })();
})(window);
