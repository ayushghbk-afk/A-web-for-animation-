/* ============================================================
   Motion Lab — cinematic UI / 3D showcase wave
   Distinct families (one or two of each) so the expander weaves
   them in at depth 0 and later near-duplicates get pruned.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit;
  var join = K.join, cells = K.cells, kf = K.keyframes;
  var range = K.range, col = K.color;
  var C1 = '#7c5cff', C2 = '#22d3ee', C3 = '#ff5c8a', C4 = '#ffd479', C5 = '#34d399';

  /* ───────── LOADERS ───────── */
  (function () {
    var pool = [];
    pool.push({
      family: 'schud', id: 'sc-hud-radar', title: 'HUD Radar Sweep',
      tags: ['css', 'hud', 'radar', 'loader', 'big'],
      html: '<div class="sc"><i class="ring"></i><i class="ring r2"></i><i class="sweep"></i><b></b><u></u><u class="u2"></u></div>',
      css: join([
        '.sc{position:relative;width:var(--size,140px);height:var(--size,140px);border-radius:50%;background:radial-gradient(circle,#071018 40%,#04060c);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c2,' + C2 + ') 40%,transparent)}',
        '.sc .ring{position:absolute;inset:12%;border-radius:50%;border:1px dashed color-mix(in srgb,var(--c2,' + C2 + ') 55%,transparent);animation:sc-hudr var(--dur,4s) linear infinite}',
        '.sc .r2{inset:28%;animation-direction:reverse;animation-duration:calc(var(--dur,4s)*1.4)}',
        '.sc .sweep{position:absolute;inset:8%;border-radius:50%;background:conic-gradient(from 0deg,transparent 0 78%,color-mix(in srgb,var(--c5,' + C5 + ') 70%,transparent) 88%,transparent 100%);animation:sc-huds var(--dur,2.4s) linear infinite}',
        '.sc b{position:absolute;left:50%;top:50%;width:8px;height:8px;margin:-4px;border-radius:50%;background:var(--c5,' + C5 + ');box-shadow:0 0 10px var(--c5,' + C5 + ')}',
        '.sc u{position:absolute;width:7px;height:7px;border-radius:50%;background:var(--c4,' + C4 + ');left:68%;top:28%;animation:sc-hudb var(--dur,1.8s) ease-in-out infinite}',
        '.sc .u2{left:32%;top:62%;animation-delay:-.7s;background:var(--c3,' + C3 + ')}',
        kf('sc-hudr', 'to{transform:rotate(1turn)}'),
        kf('sc-huds', 'to{transform:rotate(1turn)}'),
        kf('sc-hudb', '0%,100%{opacity:.25;transform:scale(.6)}50%{opacity:1;transform:scale(1.3)}')
      ]),
      cfg: [range('Diameter', '--size', 80, 220, 2, 140, 'px'), range('Cycle', '--dur', .6, 6, .1, 2.4, 's'),
        col('Sweep', '--c5', C5), col('Ring', '--c2', C2), col('Blip', '--c4', C4), col('Blip B', '--c3', C3)]
    });
    pool.push({
      family: 'scdna', id: 'sc-dna-wait', title: 'DNA Helix Wait',
      tags: ['css', '3d', 'helix', 'loader'],
      html: '<div class="sc">' + cells(10, 'i') + '</div>',
      css: join([
        '.sc{position:relative;width:var(--size,72px);height:var(--size,140px);transform-style:preserve-3d;perspective:500px;animation:sc-dnaw var(--dur,5s) linear infinite}',
        '.sc i{position:absolute;left:50%;top:calc(var(--i)*10%);width:10px;height:10px;margin-left:-5px;border-radius:50%;background:var(--c1,' + C1 + ');box-shadow:0 0 8px var(--c1,' + C1 + ');transform:rotateY(calc(var(--i)*36deg)) translateX(28px)}',
        '.sc i:nth-child(even){background:var(--c2,' + C2 + ');box-shadow:0 0 8px var(--c2,' + C2 + ')}',
        kf('sc-dnaw', 'to{transform:rotateY(1turn)}')
      ]),
      cfg: [range('Size', '--size', 48, 160, 2, 72, 'px'), range('Cycle', '--dur', 2, 12, .1, 5, 's'),
        col('Strand A', '--c1', C1), col('Strand B', '--c2', C2)]
    });
    pool.push({
      family: 'sciso', id: 'sc-iso-bricks', title: 'Isometric Brick Stack',
      tags: ['css', '3d', 'isometric', 'loader', 'big'],
      html: '<div class="sc">' + cells(6, 'i') + '</div>',
      css: join([
        '.sc{position:relative;width:160px;height:120px;transform:rotateX(55deg) rotateZ(-45deg);transform-style:preserve-3d}',
        '.sc i{position:absolute;width:36px;height:36px;background:var(--c1,' + C1 + ');left:calc((var(--i)%3)*28px);top:calc((var(--i)/3|0)*28px);box-shadow:18px 0 0 color-mix(in srgb,var(--c1,' + C1 + ') 55%,#000),0 18px 0 color-mix(in srgb,var(--c2,' + C2 + ') 70%,#000);animation:sc-isob var(--dur,1.6s) ease-in-out infinite;animation-delay:calc(var(--i)*-.18s)}',
        kf('sc-isob', '0%,100%{transform:translateZ(0);opacity:.7}50%{transform:translateZ(22px);opacity:1}')
      ]),
      cfg: [range('Cycle', '--dur', .6, 4, .1, 1.6, 's'), col('Brick', '--c1', C1), col('Side', '--c2', C2)]
    });
    pool.push({
      family: 'scarm', id: 'sc-arm-wait', title: 'Robot Arm Wait',
      tags: ['css', '3d', 'robot', 'loader'],
      html: '<div class="sc"><i class="base"></i><i class="a"></i><i class="b"></i><i class="c"></i></div>',
      css: join([
        '.sc{position:relative;width:140px;height:120px}',
        '.sc .base{position:absolute;left:50%;bottom:8px;width:36px;height:10px;margin-left:-18px;border-radius:4px;background:#2a2a3d}',
        '.sc .a,.sc .b,.sc .c{position:absolute;left:50%;bottom:16px;width:10px;border-radius:6px;transform-origin:50% 100%;background:linear-gradient(180deg,var(--c2,' + C2 + '),#1a1a28)}',
        '.sc .a{height:46px;margin-left:-5px;animation:sc-arma var(--dur,2.4s) ease-in-out infinite}',
        '.sc .b{height:36px;margin-left:-5px;bottom:58px;animation:sc-armb var(--dur,2.4s) ease-in-out infinite}',
        '.sc .c{height:16px;width:16px;margin-left:-8px;bottom:90px;border-radius:50%;background:var(--c4,' + C4 + ');animation:sc-armc var(--dur,2.4s) ease-in-out infinite}',
        kf('sc-arma', '0%,100%{transform:rotate(-18deg)}50%{transform:rotate(22deg)}'),
        kf('sc-armb', '0%,100%{transform:rotate(28deg)}50%{transform:rotate(-34deg)}'),
        kf('sc-armc', '0%,100%{transform:translateX(-10px)}50%{transform:translateX(12px)}')
      ]),
      cfg: [range('Cycle', '--dur', .8, 6, .1, 2.4, 's'), col('Arm', '--c2', C2), col('Grip', '--c4', C4)]
    });
    pool.push({
      family: 'scseg', id: 'sc-seg-hud', title: 'Segmented HUD Ring',
      tags: ['css', 'hud', 'ring', 'loader'],
      html: '<div class="sc">' + cells(12) + '</div>',
      css: join([
        '.sc{position:relative;width:var(--size,120px);height:var(--size,120px)}',
        '.sc i{position:absolute;left:50%;top:6px;width:8px;height:18px;margin-left:-4px;border-radius:3px;background:var(--c2,' + C2 + ');transform-origin:50% 54px;transform:rotate(calc(var(--i)*30deg));opacity:.18;animation:sc-seg var(--dur,1.4s) linear infinite;animation-delay:calc(var(--i)*calc(var(--dur,1.4s)/-12))}',
        kf('sc-seg', '0%{opacity:1;box-shadow:0 0 10px var(--c2,' + C2 + ')}100%{opacity:.12;box-shadow:none}')
      ]),
      cfg: [range('Diameter', '--size', 72, 200, 2, 120, 'px'), range('Cycle', '--dur', .4, 4, .05, 1.4, 's'), col('Tick', '--c2', C2)]
    });
    pool.push({
      family: 'scdock', id: 'sc-dock-bounce', title: 'Dock Bounce Loader',
      tags: ['css', 'dock', 'ui', 'loader'],
      html: '<div class="sc">' + cells(5) + '</div>',
      css: join([
        '.sc{display:flex;gap:10px;align-items:flex-end;height:64px}',
        '.sc i{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));animation:sc-dkb var(--dur,1.2s) cubic-bezier(.3,1.4,.4,1) infinite;animation-delay:calc(var(--i)*-.12s)}',
        kf('sc-dkb', '0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-18px) scale(1.08)}')
      ]),
      cfg: [range('Cycle', '--dur', .5, 3, .05, 1.2, 's'), col('A', '--c1', C1), col('B', '--c2', C2)]
    });
    pool.push({
      family: 'sclat', id: 'sc-lat-cube', title: 'Lattice Pulse Cube',
      tags: ['css', '3d', 'lattice', 'loader', 'big'],
      html: '<div class="sc"><i></i><i></i><i></i><i></i></div>',
      css: join([
        '.sc{position:relative;width:90px;height:90px;transform-style:preserve-3d;animation:sc-lat var(--dur,8s) linear infinite}',
        '.sc i{position:absolute;inset:0;border:2px solid var(--c1,' + C1 + ');box-shadow:0 0 12px color-mix(in srgb,var(--c1,' + C1 + ') 50%,transparent)}',
        '.sc i:nth-child(1){transform:translateZ(28px)}',
        '.sc i:nth-child(2){transform:rotateY(90deg) translateZ(28px);border-color:var(--c2,' + C2 + ')}',
        '.sc i:nth-child(3){transform:rotateX(90deg) translateZ(28px);border-color:var(--c3,' + C3 + ')}',
        '.sc i:nth-child(4){transform:rotateY(180deg) translateZ(28px)}',
        kf('sc-lat', 'to{transform:rotateX(1turn) rotateY(.5turn)}')
      ]),
      cfg: [range('Cycle', '--dur', 3, 20, .5, 8, 's'), col('A', '--c1', C1), col('B', '--c2', C2), col('C', '--c3', C3)]
    });
    pool.push({
      family: 'scfilm', id: 'sc-film-sprocket', title: 'Film Sprocket Wait',
      tags: ['css', 'film', 'loader'],
      html: '<div class="sc"><i class="reel"></i><b></b><i class="reel r2"></i></div>',
      css: join([
        '.sc{display:flex;align-items:center;gap:10px}',
        '.sc .reel{width:42px;height:42px;border-radius:50%;border:6px dashed var(--c4,' + C4 + ');animation:sc-film var(--dur,1.6s) linear infinite}',
        '.sc .r2{animation-direction:reverse}',
        '.sc b{width:48px;height:10px;border-radius:3px;background:repeating-linear-gradient(90deg,var(--c3,' + C3 + ') 0 8px,#111 8px 12px);animation:sc-filmt var(--dur,1.2s) linear infinite}',
        kf('sc-film', 'to{transform:rotate(1turn)}'),
        kf('sc-filmt', 'to{background-position:12px 0}')
      ]),
      cfg: [range('Cycle', '--dur', .4, 4, .05, 1.6, 's'), col('Reel', '--c4', C4), col('Tape', '--c3', C3)]
    });
    K.add('loaders', pool);
  })();

  /* ───────── BUTTONS ───────── */
  (function () {
    var pool = [];
    var base = '.mb{display:grid;place-items:center;width:100%}.mb .b{position:relative;border:0;cursor:pointer;padding:16px 28px;font:700 16px system-ui,sans-serif;color:#fff;border-radius:14px;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '))}';
    pool.push({
      family: 'scmac', id: 'sc-mac-dock', title: 'Mac Dock Bounce',
      tags: ['css', 'dock', 'ui', 'hover'],
      html: '<div class="mb dock">' + cells(5, 'i') + '</div>',
      css: join([
        '.dock{display:flex;gap:8px;align-items:flex-end;height:72px}',
        '.dock i{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c3,' + C3 + '));transition:transform .25s cubic-bezier(.3,1.5,.4,1)}',
        '.dock:hover i{transform:translateY(-6px) scale(1.08)}',
        '.dock i:hover{transform:translateY(-16px) scale(1.28)}'
      ]),
      cfg: [col('A', '--c1', C1), col('B', '--c3', C3)]
    });
    pool.push({
      family: 'scbadge', id: 'sc-badge-burst', title: 'Notification Badge Burst',
      tags: ['css', 'badge', 'ui', 'button'],
      html: '<div class="mb"><button class="b">Inbox<i>3</i></button></div>',
      css: join([
        base,
        '.mb .b{padding-right:38px}',
        '.mb i{position:absolute;top:-8px;right:-8px;min-width:22px;height:22px;padding:0 6px;border-radius:99px;background:var(--c3,' + C3 + ');font:800 11px system-ui,sans-serif;display:grid;place-items:center;animation:sc-bdg var(--dur,1.8s) cubic-bezier(.3,1.6,.4,1) infinite}',
        kf('sc-bdg', '0%,70%,100%{transform:scale(1)}80%{transform:scale(1.35)}88%{transform:scale(.9)}')
      ]),
      cfg: [range('Cycle', '--dur', .8, 4, .1, 1.8, 's'), col('A', '--c1', C1), col('B', '--c2', C2), col('Badge', '--c3', C3)]
    });
    pool.push({
      family: 'scsplit', id: 'sc-split-3d', title: 'Split 3D CTA',
      tags: ['css', '3d', 'cta', 'hover'],
      html: '<div class="mb"><button class="b"><span class="l">Launch</span><span class="r">→</span></button></div>',
      css: join([
        '.mb{display:grid;place-items:center;perspective:600px}',
        '.mb .b{display:flex;border:0;cursor:pointer;padding:0;background:transparent;color:#fff;font:700 16px system-ui,sans-serif;transform-style:preserve-3d}',
        '.mb .l,.mb .r{padding:14px 18px;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));transition:transform .4s cubic-bezier(.3,1.2,.4,1)}',
        '.mb .l{border-radius:12px 0 0 12px}',
        '.mb .r{border-radius:0 12px 12px 0;background:var(--c3,' + C3 + ')}',
        '.mb .b:hover .l{transform:rotateY(-18deg) translateZ(8px)}',
        '.mb .b:hover .r{transform:rotateY(18deg) translateZ(8px)}'
      ]),
      cfg: [col('A', '--c1', C1), col('B', '--c2', C2), col('Arrow', '--c3', C3)]
    });
    pool.push({
      family: 'scliq', id: 'sc-liquid-press', title: 'Liquid Morph Press',
      tags: ['css', 'liquid', 'press'],
      html: '<div class="mb"><button class="b"><span>Morph</span></button></div>',
      css: join([
        base,
        '.mb .b{border-radius:40% 60% 55% 45%/50% 40% 60% 50%;animation:sc-liq var(--dur,4s) ease-in-out infinite}',
        kf('sc-liq', '0%,100%{border-radius:40% 60% 55% 45%/50% 40% 60% 50%}50%{border-radius:60% 40% 45% 55%/40% 60% 40% 60%}')
      ]),
      cfg: [range('Cycle', '--dur', 1, 8, .1, 4, 's'), col('A', '--c1', C1), col('B', '--c2', C2)]
    });
    pool.push({
      family: 'scink', id: 'sc-tab-ink', title: 'Tab Ink Slider',
      tags: ['css', 'tabs', 'ui'],
      html: '<div class="mb tabs"><span class="on">One</span><span>Two</span><span>Three</span><i></i></div>',
      css: join([
        '.tabs{position:relative;display:flex;background:rgba(255,255,255,.06);border-radius:12px;padding:4px}',
        '.tabs span{flex:1;text-align:center;padding:10px 12px;font:700 13px system-ui,sans-serif;color:#c6c8dd;position:relative;z-index:1}',
        '.tabs .on{color:#fff}',
        '.tabs i{position:absolute;top:4px;bottom:4px;left:4px;width:calc(33.333% - 3px);border-radius:9px;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));animation:sc-ink var(--dur,3.6s) cubic-bezier(.6,0,.3,1) infinite}',
        kf('sc-ink', '0%,20%{transform:translateX(0)}40%,60%{transform:translateX(100%)}80%,100%{transform:translateX(200%)}')
      ]),
      cfg: [range('Cycle', '--dur', 1.5, 8, .1, 3.6, 's'), col('A', '--c1', C1), col('B', '--c2', C2)]
    });
    pool.push({
      family: 'sctoast', id: 'sc-toast-chip', title: 'Toast Dismiss Chip',
      tags: ['css', 'toast', 'ui'],
      html: '<div class="mb"><div class="toast"><b>Saved</b><i></i></div></div>',
      css: join([
        '.toast{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:12px;background:#171724;border:1px solid rgba(255,255,255,.1);color:#fff;font:700 14px system-ui,sans-serif;animation:sc-tst var(--dur,3.2s) ease-in-out infinite}',
        '.toast i{width:8px;height:8px;border-radius:50%;background:var(--c5,' + C5 + ');box-shadow:0 0 8px var(--c5,' + C5 + ')}',
        kf('sc-tst', '0%,100%{transform:translateY(12px);opacity:0}18%,72%{transform:none;opacity:1}88%{transform:translateX(40px);opacity:0}')
      ]),
      cfg: [range('Cycle', '--dur', 1.5, 7, .1, 3.2, 's'), col('Dot', '--c5', C5)]
    });
    pool.push({
      family: 'scfab', id: 'sc-fab-expand', title: 'FAB Expand Menu',
      tags: ['css', 'fab', 'ui', 'hover'],
      html: '<div class="mb fab"><button class="b">+</button><i></i><i></i><i></i></div>',
      css: join([
        '.fab{position:relative;width:64px;height:64px}',
        '.fab .b{position:absolute;inset:8px;border:0;border-radius:50%;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c3,' + C3 + '));color:#fff;font:800 22px system-ui,sans-serif;cursor:pointer;z-index:2}',
        '.fab i{position:absolute;left:50%;top:50%;width:12px;height:12px;margin:-6px;border-radius:50%;background:var(--c2,' + C2 + ');opacity:0;transition:transform .35s cubic-bezier(.3,1.4,.4,1),opacity .25s}',
        '.fab:hover i{opacity:1}',
        '.fab:hover i:nth-child(2){transform:translate(-28px,-22px)}',
        '.fab:hover i:nth-child(3){transform:translate(0,-34px);background:var(--c4,' + C4 + ')}',
        '.fab:hover i:nth-child(4){transform:translate(28px,-22px);background:var(--c5,' + C5 + ')}'
      ]),
      cfg: [col('A', '--c1', C1), col('B', '--c3', C3), col('Dot', '--c2', C2), col('Dot B', '--c4', C4), col('Dot C', '--c5', C5)]
    });
    pool.push({
      family: 'scpill', id: 'sc-pill-switch', title: 'Pill Segment Switch',
      tags: ['css', 'switch', 'ui'],
      html: '<div class="mb pill"><b></b><span>Off</span><span>On</span></div>',
      css: join([
        '.pill{position:relative;display:flex;width:160px;background:#141422;border-radius:99px;padding:4px}',
        '.pill span{flex:1;text-align:center;padding:8px;font:700 12px system-ui,sans-serif;color:#8f92b3;position:relative;z-index:1}',
        '.pill b{position:absolute;top:4px;bottom:4px;left:4px;width:calc(50% - 4px);border-radius:99px;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));animation:sc-pill var(--dur,2.8s) cubic-bezier(.5,1.3,.4,1) infinite}',
        kf('sc-pill', '0%,40%{transform:translateX(0)}50%,90%{transform:translateX(100%)}')
      ]),
      cfg: [range('Cycle', '--dur', 1, 6, .1, 2.8, 's'), col('A', '--c1', C1), col('B', '--c2', C2)]
    });
    pool.push({
      family: 'scholo', id: 'sc-holo-press', title: 'Hologram Press Plate',
      tags: ['css', 'hologram', '3d', 'press'],
      html: '<div class="mb"><button class="b"><span> hol </span></button></div>',
      css: join([
        base,
        '.mb .b{background:linear-gradient(120deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '),var(--c3,' + C3 + '),var(--c1,' + C1 + '));background-size:220% 100%;animation:sc-holo var(--dur,4s) linear infinite;box-shadow:0 0 22px color-mix(in srgb,var(--c1,' + C1 + ') 50%,transparent);letter-spacing:.2em}',
        kf('sc-holo', 'to{background-position:220% 0}')
      ]),
      cfg: [range('Cycle', '--dur', 1, 8, .1, 4, 's'), col('A', '--c1', C1), col('B', '--c2', C2), col('C', '--c3', C3)]
    });
    K.add('buttons', pool);
  })();

  /* ───────── TEXT ───────── */
  (function () {
    var pool = [];
    pool.push({
      family: 'scextr', id: 'sc-extrude', title: 'Extruded 3D Word',
      tags: ['css', '3d', 'text', 'big'],
      html: '<div class="mb"><span>DEPTH</span></div>',
      css: join([
        '.mb{display:grid;place-items:center;perspective:600px}',
        '.mb span{font:800 var(--fs,52px) system-ui,sans-serif;color:var(--c1,' + C1 + ');text-shadow:1px 1px 0 color-mix(in srgb,var(--c1,' + C1 + ') 70%,#000),2px 2px 0 color-mix(in srgb,var(--c1,' + C1 + ') 55%,#000),3px 3px 0 color-mix(in srgb,var(--c1,' + C1 + ') 40%,#000),4px 4px 0 color-mix(in srgb,var(--c1,' + C1 + ') 25%,#000);animation:sc-ext var(--dur,3s) ease-in-out infinite}',
        kf('sc-ext', '0%,100%{transform:rotateX(12deg) rotateY(-12deg)}50%{transform:rotateX(-8deg) rotateY(16deg)}')
      ]),
      cfg: [range('Font size', '--fs', 24, 80, 2, 52, 'px'), range('Cycle', '--dur', 1, 7, .1, 3, 's'), col('Ink', '--c1', C1)]
    });
    pool.push({
      family: 'schudt', id: 'sc-hud-type', title: 'HUD Typewriter',
      tags: ['js', 'hud', 'typing', 'text'],
      html: '<div class="mb tt"><b></b><i></i></div>',
      css: join([
        '.mb{display:grid;place-items:center}',
        '.tt{font:600 var(--fs,20px) "JetBrains Mono",monospace;color:var(--c5,' + C5 + ');display:flex;gap:4px}',
        '.tt i{width:.5em;height:1.1em;background:var(--c5,' + C5 + ');animation:sc-hudc 1s steps(1) infinite}',
        kf('sc-hudc', '50%{opacity:0}')
      ]),
      js: 'var out=root.querySelector("b"),txt="SYS.READY // MOTION.LAB",i=0,fr=0;\napi.raf(function(){fr++;if(fr%10)return;i++;if(i>txt.length+16){i=0;out.textContent="";}else out.textContent=txt.slice(0,Math.min(i,txt.length));});',
      cfg: [range('Font size', '--fs', 12, 36, 1, 20, 'px'), col('Ink', '--c5', C5)]
    });
    pool.push({
      family: 'scbill', id: 'sc-billboard', title: 'Kinetic Billboard',
      tags: ['css', 'marquee', 'text', 'big'],
      html: '<div class="mb"><div class="row"><span>LIVE · STAGE · MOTION · LIVE · STAGE · MOTION · </span></div></div>',
      css: join([
        '.mb{width:100%;overflow:hidden}',
        '.row span{display:inline-block;white-space:nowrap;font:800 var(--fs,36px) system-ui,sans-serif;letter-spacing:.16em;color:transparent;-webkit-text-stroke:1.5px var(--c2,' + C2 + ');animation:sc-bill var(--dur,8s) linear infinite}',
        kf('sc-bill', 'to{transform:translateX(-50%)}')
      ]),
      cfg: [range('Font size', '--fs', 18, 64, 1, 36, 'px'), range('Cycle', '--dur', 3, 18, .5, 8, 's'), col('Stroke', '--c2', C2)]
    });
    pool.push({
      family: 'scflap', id: 'sc-flap-head', title: 'Split Flap Headline',
      tags: ['css', 'flip', 'text', 'big'],
      html: '<div class="mb fk"><b>L</b><b>A</b><b>B</b></div>',
      css: join([
        '.fk{display:flex;gap:6px;perspective:500px}',
        '.fk b{width:46px;height:58px;border-radius:8px;background:#15151f;display:grid;place-items:center;font:800 28px "JetBrains Mono",monospace;color:var(--c4,' + C4 + ');animation:sc-flp var(--dur,2.2s) ease-in-out infinite;animation-delay:calc(var(--i,0)*-.2s)}',
        '.fk b:nth-child(2){animation-delay:-.3s}.fk b:nth-child(3){animation-delay:-.6s}',
        kf('sc-flp', '0%,100%{transform:rotateX(0)}45%{transform:rotateX(-90deg)}')
      ]),
      cfg: [range('Cycle', '--dur', .8, 5, .1, 2.2, 's'), col('Ink', '--c4', C4)]
    });
    pool.push({
      family: 'sctube', id: 'sc-neon-tube', title: 'Neon Tube Sign',
      tags: ['css', 'neon', 'text', 'big'],
      html: '<div class="mb"><span>OPEN</span></div>',
      css: join([
        '.mb{display:grid;place-items:center}',
        '.mb span{font:800 var(--fs,48px) system-ui,sans-serif;letter-spacing:.28em;color:transparent;-webkit-text-stroke:2px var(--c3,' + C3 + ');text-shadow:0 0 12px var(--c3,' + C3 + '),0 0 32px var(--c3,' + C3 + ');animation:sc-tube var(--dur,2.8s) steps(1,end) infinite}',
        kf('sc-tube', '0%,8%,12%,100%{opacity:1}9%,11%{opacity:.25}')
      ]),
      cfg: [range('Font size', '--fs', 24, 80, 2, 48, 'px'), range('Cycle', '--dur', .8, 6, .1, 2.8, 's'), col('Tube', '--c3', C3)]
    });
    pool.push({
      family: 'sccasc', id: 'sc-persp-cascade', title: 'Perspective Cascade',
      tags: ['css', '3d', 'letters', 'text'],
      html: '<div class="mb cc"><b>S</b><b>C</b><b>E</b><b>N</b><b>E</b></div>',
      css: join([
        '.mb{display:grid;place-items:center;perspective:700px}',
        '.cc{display:flex;gap:4px;transform-style:preserve-3d}',
        '.cc b{font:800 var(--fs,46px) system-ui,sans-serif;color:var(--c1,' + C1 + ');animation:sc-pc var(--dur,2.6s) ease-in-out infinite}',
        '.cc b:nth-child(2){animation-delay:.1s}.cc b:nth-child(3){animation-delay:.2s}.cc b:nth-child(4){animation-delay:.3s}.cc b:nth-child(5){animation-delay:.4s}',
        kf('sc-pc', '0%,100%{transform:translateZ(0) rotateX(0)}50%{transform:translateZ(40px) rotateX(18deg)}')
      ]),
      cfg: [range('Font size', '--fs', 24, 72, 2, 46, 'px'), range('Cycle', '--dur', 1, 6, .1, 2.6, 's'), col('Ink', '--c1', C1)]
    });
    K.add('text', pool);
  })();

  /* ───────── CARDS (UI) ───────── */
  (function () {
    var pool = [];
    var card = '.ck{width:var(--w,250px);background:#15151f;border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:14px;font-family:system-ui,sans-serif;color:#e8e8f2}';
    pool.push({
      family: 'sctoastui', id: 'sc-toast-stack', title: 'Toast Stack UI',
      tags: ['css', 'toast', 'ui', 'big'],
      html: '<div class="ck st">' + [0, 1, 2].map(function (i) { return '<div class="t" style="--i:' + i + '"><b>' + ['Copied', 'Exported', 'Saved'][i] + '</b><i></i></div>'; }).join('') + '</div>',
      css: join([
        card,
        '.st{display:flex;flex-direction:column;gap:8px}',
        '.st .t{display:flex;justify-content:space-between;padding:10px 12px;border-radius:10px;background:rgba(255,255,255,.06);font-size:13px;animation:sc-ts var(--dur,3s) ease-in-out infinite;animation-delay:calc(var(--i)*-.5s)}',
        '.st i{width:8px;height:8px;border-radius:50%;background:var(--c5,' + C5 + ')}',
        kf('sc-ts', '0%,100%{transform:translateX(8px);opacity:.5}30%,70%{transform:none;opacity:1}')
      ]),
      cfg: [range('Width', '--w', 180, 320, 2, 250, 'px'), range('Cycle', '--dur', 1.5, 6, .1, 3, 's'), col('Dot', '--c5', C5)]
    });
    pool.push({
      family: 'scside', id: 'sc-sidebar-nav', title: 'Sidebar Nav UI',
      tags: ['css', 'nav', 'ui', 'big'],
      html: '<div class="ck sb"><div class="row on">Gallery</div><div class="row">Inventory</div><div class="row">Templates</div><div class="row">Export</div><i class="ink"></i></div>',
      css: join([
        card,
        '.sb{position:relative;display:flex;flex-direction:column;gap:4px}',
        '.sb .row{padding:9px 12px;border-radius:10px;font-size:13px;color:#c6c8dd}',
        '.sb .on{color:#fff}',
        '.sb .ink{position:absolute;left:0;top:4px;width:3px;height:28px;border-radius:99px;background:var(--c1,' + C1 + ');animation:sc-sbi var(--dur,4s) cubic-bezier(.6,0,.3,1) infinite}',
        kf('sc-sbi', '0%,20%{top:4px}40%,60%{top:40px}80%,100%{top:76px}')
      ]),
      cfg: [range('Width', '--w', 180, 320, 2, 250, 'px'), range('Cycle', '--dur', 2, 8, .1, 4, 's'), col('Ink', '--c1', C1)]
    });
    pool.push({
      family: 'sccmd', id: 'sc-cmd-palette', title: 'Command Palette UI',
      tags: ['css', 'search', 'ui', 'big'],
      html: '<div class="ck cm"><div class="bar">Search effects…</div><div class="hit on">Aurora Veils</div><div class="hit">Circuit Cube</div><div class="hit">Neon Press</div></div>',
      css: join([
        card,
        '.cm .bar{padding:10px 12px;border-radius:10px;background:rgba(255,255,255,.06);font-size:12px;color:#8f92b3;margin-bottom:8px}',
        '.cm .hit{padding:8px 10px;border-radius:8px;font-size:13px;color:#c6c8dd}',
        '.cm .on{background:color-mix(in srgb,var(--c1,' + C1 + ') 28%,transparent);color:#fff;animation:sc-cmd var(--dur,2.4s) ease-in-out infinite}',
        kf('sc-cmd', '0%,100%{filter:brightness(1)}50%{filter:brightness(1.25)}')
      ]),
      cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', 1, 5, .1, 2.4, 's'), col('Hit', '--c1', C1)]
    });
    pool.push({
      family: 'sckan', id: 'sc-kanban', title: 'Kanban Board UI',
      tags: ['css', 'kanban', 'ui', 'big'],
      html: '<div class="ck kn"><div class="col"><u></u><u></u></div><div class="col"><u></u><u></u><u></u></div><div class="col"><u></u></div></div>',
      css: join([
        card,
        '.kn{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}',
        '.kn .col{display:flex;flex-direction:column;gap:6px;background:rgba(255,255,255,.04);border-radius:10px;padding:8px;min-height:110px}',
        '.kn u{display:block;height:22px;border-radius:6px;background:linear-gradient(90deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));opacity:.85;animation:sc-kan var(--dur,2.8s) ease-in-out infinite}',
        '.kn .col:nth-child(2) u{background:linear-gradient(90deg,var(--c2,' + C2 + '),var(--c5,' + C5 + '));animation-delay:-.4s}',
        '.kn .col:nth-child(3) u{background:linear-gradient(90deg,var(--c3,' + C3 + '),var(--c4,' + C4 + '));animation-delay:-.8s}',
        kf('sc-kan', '0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}')
      ]),
      cfg: [range('Width', '--w', 200, 340, 2, 250, 'px'), range('Cycle', '--dur', 1, 6, .1, 2.8, 's'),
        col('A', '--c1', C1), col('B', '--c2', C2), col('C', '--c3', C3), col('D', '--c4', C4), col('E', '--c5', C5)]
    });
    pool.push({
      family: 'schudpan', id: 'sc-hud-panel', title: 'HUD Instrument Panel',
      tags: ['css', 'hud', 'ui', 'big'],
      html: '<div class="ck hp"><div class="g"><i></i></div><div class="bars">' + cells(8) + '</div><p>SYS 98%</p></div>',
      css: join([
        card,
        '.hp .g{width:54px;height:54px;border-radius:50%;border:4px solid rgba(255,255,255,.1);border-top-color:var(--c2,' + C2 + ');animation:sc-hpg var(--dur,1.4s) linear infinite;margin-bottom:10px}',
        '.hp .bars{display:flex;gap:4px;align-items:flex-end;height:36px}',
        '.hp .bars i{flex:1;background:var(--c5,' + C5 + ');border-radius:2px;animation:sc-hpb var(--dur,1.2s) ease-in-out infinite;animation-delay:calc(var(--i)*-.1s)}',
        '.hp p{margin:8px 0 0;font:600 11px "JetBrains Mono",monospace;color:var(--c2,' + C2 + ')}',
        kf('sc-hpg', 'to{transform:rotate(1turn)}'),
        kf('sc-hpb', '0%,100%{height:20%}50%{height:100%}')
      ]),
      cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', .5, 4, .05, 1.4, 's'),
        col('Ring', '--c2', C2), col('Bar', '--c5', C5)]
    });
    pool.push({
      family: 'scdockg', id: 'sc-app-dock', title: 'App Dock Grid',
      tags: ['css', 'dock', 'ui'],
      html: '<div class="ck dg">' + cells(8) + '</div>',
      css: join([
        card,
        '.dg{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}',
        '.dg i{aspect-ratio:1;border-radius:12px;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));animation:sc-adg var(--dur,2s) ease-in-out infinite;animation-delay:calc(var(--i)*-.15s)}',
        '.dg i:nth-child(even){background:linear-gradient(135deg,var(--c3,' + C3 + '),var(--c4,' + C4 + '))}',
        kf('sc-adg', '0%,100%{transform:scale(1)}50%{transform:scale(1.08)}')
      ]),
      cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', .8, 5, .1, 2, 's'),
        col('A', '--c1', C1), col('B', '--c2', C2), col('C', '--c3', C3), col('D', '--c4', C4)]
    });
    pool.push({
      family: 'scnotif', id: 'sc-notif-center', title: 'Notification Center',
      tags: ['css', 'notification', 'ui', 'big'],
      html: '<div class="ck nc"><div class="n" style="--i:0"><b>Build passed</b><small>now</small></div><div class="n" style="--i:1"><b>New comment</b><small>2m</small></div><div class="n" style="--i:2"><b>Deploy live</b><small>1h</small></div></div>',
      css: join([
        card,
        '.nc .n{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:13px;animation:sc-nc var(--dur,2.2s) ease-out both;animation-delay:calc(var(--i)*.25s)}',
        '.nc small{color:#8f92b3;font-size:11px}',
        kf('sc-nc', '0%{opacity:0;transform:translateY(8px)}100%{opacity:1;transform:none}')
      ]),
      cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', .6, 4, .1, 2.2, 's')]
    });
    pool.push({
      family: 'scsheet', id: 'sc-settings-sheet', title: 'Settings Sheet UI',
      tags: ['css', 'settings', 'ui'],
      html: '<div class="ck sh"><div class="row"><span>Motion</span><i class="sw"></i></div><div class="row"><span>Glow</span><i class="sw on"></i></div><div class="row"><span>Sound</span><i class="sw"></i></div></div>',
      css: join([
        card,
        '.sh .row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;font-size:13px}',
        '.sh .sw{width:36px;height:20px;border-radius:99px;background:#2a2a3d;position:relative}',
        '.sh .sw::after{content:"";position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .3s}',
        '.sh .on{background:var(--c5,' + C5 + ')}',
        '.sh .on::after{left:18px}',
        '.sh .sw{animation:sc-shs var(--dur,3s) ease-in-out infinite}',
        kf('sc-shs', '0%,40%{filter:brightness(1)}50%,90%{filter:brightness(1.3)}')
      ]),
      cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', 1, 6, .1, 3, 's'), col('On', '--c5', C5)]
    });
    pool.push({
      family: 'scnow', id: 'sc-now-playing', title: 'Now Playing Deck',
      tags: ['css', 'player', 'ui', 'music', 'big'],
      html: '<div class="ck np"><div class="art"></div><b>Night Drive</b><small>Neon Avenue</small><div class="eq">' + cells(7) + '</div></div>',
      css: join([
        card,
        '.np .art{height:72px;border-radius:10px;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c3,' + C3 + '));margin-bottom:10px;animation:sc-npa var(--dur,6s) ease-in-out infinite}',
        '.np b{display:block;font-size:14px}',
        '.np small{color:#8f92b3;font-size:11px}',
        '.np .eq{display:flex;gap:3px;align-items:flex-end;height:28px;margin-top:10px}',
        '.np .eq i{flex:1;background:var(--c2,' + C2 + ');border-radius:2px;animation:sc-npe var(--dur,1s) ease-in-out infinite;animation-delay:calc(var(--i)*-.11s)}',
        kf('sc-npa', '0%,100%{filter:hue-rotate(0)}50%{filter:hue-rotate(40deg)}'),
        kf('sc-npe', '0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}')
      ]),
      cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', .5, 8, .1, 1, 's'),
        col('Art A', '--c1', C1), col('Art B', '--c3', C3), col('EQ', '--c2', C2)]
    });
    pool.push({
      family: 'scchatc', id: 'sc-chat-composer', title: 'Chat Composer UI',
      tags: ['css', 'chat', 'ui'],
      html: '<div class="ck cc"><div class="in">Write a message…<i></i></div><button>Send</button></div>',
      css: join([
        card,
        '.cc .in{position:relative;padding:12px;border-radius:12px;background:rgba(255,255,255,.06);font-size:13px;color:#8f92b3;margin-bottom:10px}',
        '.cc .in i{position:absolute;right:12px;top:50%;width:8px;height:8px;margin-top:-4px;border-radius:50%;background:var(--c2,' + C2 + ');animation:sc-cci var(--dur,1.2s) ease-in-out infinite}',
        '.cc button{width:100%;border:0;padding:10px;border-radius:10px;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));color:#fff;font:700 13px system-ui,sans-serif}',
        kf('sc-cci', '0%,100%{opacity:.3}50%{opacity:1}')
      ]),
      cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', .4, 3, .1, 1.2, 's'),
        col('A', '--c1', C1), col('B', '--c2', C2)]
    });
    pool.push({
      family: 'sctree', id: 'sc-file-tree', title: 'File Tree UI',
      tags: ['css', 'tree', 'ui'],
      html: '<div class="ck tr"><div class="r">js/</div><div class="r in">app.js</div><div class="r in on">showcase.gen.js</div><div class="r">css/</div><div class="r in">site.css</div></div>',
      css: join([
        card,
        '.tr .r{font:600 12px "JetBrains Mono",monospace;padding:5px 8px;border-radius:6px;color:#c6c8dd}',
        '.tr .in{padding-left:22px;color:#8f92b3}',
        '.tr .on{background:color-mix(in srgb,var(--c1,' + C1 + ') 24%,transparent);color:#fff;animation:sc-tr var(--dur,2.6s) ease-in-out infinite}',
        kf('sc-tr', '0%,100%{box-shadow:none}50%{box-shadow:inset 2px 0 0 var(--c1,' + C1 + ')}')
      ]),
      cfg: [range('Width', '--w', 190, 320, 2, 250, 'px'), range('Cycle', '--dur', 1, 5, .1, 2.6, 's'), col('Mark', '--c1', C1)]
    });
    K.add('cards', pool);
  })();

  /* ───────── BACKGROUNDS ───────── */
  (function () {
    var pool = [];
    pool.push({
      family: 'sccity3', id: 'sc-iso-city', title: 'Isometric City Fly',
      tags: ['css', '3d', 'city', 'big'],
      html: '<div class="mb"><div class="ct">' + cells(9) + '</div></div>',
      css: join([
        '.mb{width:100%;height:var(--h,210px);overflow:hidden;border-radius:10px;background:#07070f;perspective:500px}',
        '.ct{position:absolute;inset:-20%;transform:rotateX(60deg) rotateZ(-20deg);transform-style:preserve-3d;animation:sc-icf var(--dur,18s) linear infinite}',
        '.ct i{position:absolute;width:18%;height:30%;background:linear-gradient(var(--c1,' + C1 + '),#0a0a14);left:calc((var(--i)%3)*32% + 8%);top:calc((var(--i)/3|0)*32%);box-shadow:0 0 18px color-mix(in srgb,var(--c2,' + C2 + ') 40%,transparent)}',
        kf('sc-icf', 'to{transform:rotateX(60deg) rotateZ(340deg)}')
      ]),
      cfg: [range('Height', '--h', 120, 420, 2, 210, 'px'), range('Cycle', '--dur', 8, 40, 1, 18, 's'),
        col('Tower', '--c1', C1), col('Glow', '--c2', C2)]
    });
    pool.push({
      family: 'scxlat', id: 'sc-crystal-field', title: 'Crystal Lattice Field',
      tags: ['css', 'crystal', '3d', 'big'],
      html: '<div class="mb xf">' + cells(12) + '</div>',
      css: join([
        '.mb{width:100%;height:var(--h,210px);overflow:hidden;border-radius:10px;background:#080812;position:relative}',
        '.xf i{position:absolute;width:18px;height:28px;background:linear-gradient(160deg,var(--c2,' + C2 + '),transparent);clip-path:polygon(50% 0,100% 100%,0 100%);left:calc(8% + var(--i)*7%);top:calc(20% + (var(--i)%4)*12%);opacity:.7;animation:sc-xf var(--dur,4s) ease-in-out infinite;animation-delay:calc(var(--i)*-.2s);filter:drop-shadow(0 0 8px var(--c1,' + C1 + '))}',
        kf('sc-xf', '0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-10px) rotate(6deg)}')
      ]),
      cfg: [range('Height', '--h', 120, 420, 2, 210, 'px'), range('Cycle', '--dur', 1.5, 8, .1, 4, 's'),
        col('Glow', '--c1', C1), col('Shard', '--c2', C2)]
    });
    pool.push({
      family: 'scfog', id: 'sc-vol-fog', title: 'Volumetric Fog Bank',
      tags: ['css', 'fog', 'atmosphere', 'big'],
      html: '<div class="mb fg"><i></i><i></i><i></i></div>',
      css: join([
        '.mb{width:100%;height:var(--h,210px);overflow:hidden;border-radius:10px;background:linear-gradient(180deg,#0a1020,#12182a);position:relative}',
        '.fg i{position:absolute;left:-20%;right:-20%;height:50%;border-radius:50%;filter:blur(28px);background:color-mix(in srgb,var(--c2,' + C2 + ') 28%,transparent);animation:sc-fog var(--dur,9s) ease-in-out infinite}',
        '.fg i:nth-child(2){top:30%;animation-duration:calc(var(--dur,9s)*1.3);background:color-mix(in srgb,var(--c1,' + C1 + ') 22%,transparent)}',
        '.fg i:nth-child(3){top:50%;animation-direction:reverse}',
        kf('sc-fog', '0%,100%{transform:translateX(-8%)}50%{transform:translateX(8%)}')
      ]),
      cfg: [range('Height', '--h', 120, 420, 2, 210, 'px'), range('Cycle', '--dur', 4, 20, .5, 9, 's'),
        col('Fog A', '--c1', C1), col('Fog B', '--c2', C2)]
    });
    pool.push({
      family: 'schudg', id: 'sc-hud-grid', title: 'HUD Grid Overlay',
      tags: ['css', 'hud', 'grid', 'big'],
      html: '<div class="mb hg"><i class="scan"></i></div>',
      css: join([
        '.mb{width:100%;height:var(--h,210px);overflow:hidden;border-radius:10px;background:#05080e;position:relative;background-image:linear-gradient(color-mix(in srgb,var(--c2,' + C2 + ') 22%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--c2,' + C2 + ') 22%,transparent) 1px,transparent 1px);background-size:28px 28px}',
        '.hg .scan{position:absolute;left:0;right:0;height:18%;background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--c5,' + C5 + ') 45%,transparent),transparent);animation:sc-hgs var(--dur,3.4s) linear infinite}',
        kf('sc-hgs', '0%{top:-20%}100%{top:110%}')
      ]),
      cfg: [range('Height', '--h', 120, 420, 2, 210, 'px'), range('Cycle', '--dur', 1.5, 8, .1, 3.4, 's'),
        col('Grid', '--c2', C2), col('Scan', '--c5', C5)]
    });
    pool.push({
      family: 'scconst', id: 'sc-particle-const', title: 'Particle Constellation',
      tags: ['js', 'canvas', 'stars', 'big'],
      html: '<div class="mb"><canvas class="cv"></canvas></div>',
      css: '.cv{display:block;width:100%;height:var(--h,210px);border-radius:10px;background:#07070e}',
      js: 'var c=root.querySelector(".cv"),g=c.getContext("2d"),d=Math.min(2,window.devicePixelRatio||1);c.width=Math.round(c.clientWidth*d);c.height=Math.round(c.clientHeight*d);var t=0,P=[];for(var j=0;j<48;j++)P.push({x:Math.random(),y:Math.random(),ph:Math.random()*6.28});\napi.raf(function(){t+=.016;var w=c.width,h=c.height;g.clearRect(0,0,w,h);g.strokeStyle="rgba(124,92,255,.18)";\nfor(var i=0;i<P.length;i++){var a=P[i],x=(a.x+Math.sin(t*.2+a.ph)*.02)*w,y=(a.y+Math.cos(t*.15+a.ph)*.02)*h;g.fillStyle="rgba(34,211,238,"+(.4+.6*Math.abs(Math.sin(t+a.ph))).toFixed(2)+")";g.beginPath();g.arc(x,y,1.8*d,0,6.28);g.fill();\nfor(var k=i+1;k<P.length;k++){var b=P[k],x2=(b.x+Math.sin(t*.2+b.ph)*.02)*w,y2=(b.y+Math.cos(t*.15+b.ph)*.02)*h,dx=x-x2,dy=y-y2;if(dx*dx+dy*dy<3600*d*d){g.beginPath();g.moveTo(x,y);g.lineTo(x2,y2);g.stroke();}}}});',
      cfg: [range('Height', '--h', 120, 420, 2, 210, 'px')]
    });
    pool.push({
      family: 'scribb', id: 'sc-ribbon-field', title: '3D Ribbon Field',
      tags: ['css', '3d', 'ribbon', 'big'],
      html: '<div class="mb rb"><i></i><i></i><i></i></div>',
      css: join([
        '.mb{width:100%;height:var(--h,210px);overflow:hidden;border-radius:10px;background:#08080f;perspective:500px}',
        '.rb i{position:absolute;left:-10%;right:-10%;height:28%;border-radius:40%;background:linear-gradient(90deg,transparent,var(--c1,' + C1 + '),var(--c2,' + C2 + '),transparent);filter:blur(8px);opacity:.55;animation:sc-rib var(--dur,7s) ease-in-out infinite}',
        '.rb i:nth-child(1){top:18%}',
        '.rb i:nth-child(2){top:42%;animation-delay:-2s;background:linear-gradient(90deg,transparent,var(--c3,' + C3 + '),var(--c1,' + C1 + '),transparent)}',
        '.rb i:nth-child(3){top:66%;animation-delay:-4s}',
        kf('sc-rib', '0%,100%{transform:rotateX(50deg) translateX(-6%)}50%{transform:rotateX(50deg) translateX(6%)}')
      ]),
      cfg: [range('Height', '--h', 120, 420, 2, 210, 'px'), range('Cycle', '--dur', 3, 16, .5, 7, 's'),
        col('A', '--c1', C1), col('B', '--c2', C2), col('C', '--c3', C3)]
    });
    pool.push({
      family: 'scgate', id: 'sc-stargate-dive', title: 'Stargate Dive',
      tags: ['css', 'tunnel', '3d', 'big'],
      html: '<div class="mb sg">' + cells(8) + '</div>',
      css: join([
        '.mb{width:100%;height:var(--h,210px);overflow:hidden;border-radius:10px;background:#04040a;display:grid;place-items:center;perspective:500px}',
        '.sg{position:relative;width:160px;height:160px;transform-style:preserve-3d}',
        '.sg i{position:absolute;inset:0;border-radius:50%;border:3px solid color-mix(in srgb,var(--c2,' + C2 + ') 80%,transparent);animation:sc-sg var(--dur,2.8s) linear infinite;animation-delay:calc(var(--i)*calc(var(--dur,2.8s)/-8))}',
        kf('sc-sg', '0%{transform:translateZ(-400px);opacity:0}20%{opacity:1}100%{transform:translateZ(80px);opacity:0}')
      ]),
      cfg: [range('Height', '--h', 120, 420, 2, 210, 'px'), range('Cycle', '--dur', 1, 7, .1, 2.8, 's'), col('Ring', '--c2', C2)]
    });
    pool.push({
      family: 'scmetal', id: 'sc-liquid-metal', title: 'Liquid Metal Pool',
      tags: ['css', 'metal', 'liquid', 'big'],
      html: '<div class="mb lm"><i></i></div>',
      css: join([
        '.mb{width:100%;height:var(--h,210px);overflow:hidden;border-radius:10px;background:#101018;position:relative}',
        '.lm i{position:absolute;inset:-30%;background:radial-gradient(circle at 30% 40%,#fff 0 8%,var(--c2,' + C2 + ') 18%,#8a90b8 32%,#2a2a3a 55%,#0c0c12 70%);filter:contrast(1.2) saturate(.7);animation:sc-lm var(--dur,8s) ease-in-out infinite}',
        kf('sc-lm', '0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(8%,-6%) scale(1.08)}')
      ]),
      cfg: [range('Height', '--h', 120, 420, 2, 210, 'px'), range('Cycle', '--dur', 3, 16, .5, 8, 's'), col('Sheen', '--c2', C2)]
    });
    K.add('backgrounds', pool);
  })();

  /* ───────── CONTROLS ───────── */
  (function () {
    var pool = [];
    var ctl = '.ct{width:var(--w,240px);background:#15151f;border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:16px;font-family:system-ui,sans-serif;color:#e8e8f2}';
    pool.push({
      family: 'scmix3', id: 'sc-vol-mixer', title: 'Volume Mixer 3D',
      tags: ['css', 'mixer', '3d', 'ui'],
      html: '<div class="ct mx"><div class="tr" style="--i:0"><i></i></div><div class="tr" style="--i:1"><i></i></div><div class="tr" style="--i:2"><i></i></div></div>',
      css: join([
        ctl,
        '.mx{display:flex;gap:22px;justify-content:center;transform:rotateX(18deg)}',
        '.mx .tr{width:16px;height:110px;border-radius:8px;background:#0d0d15;position:relative}',
        '.mx i{position:absolute;left:-6px;right:-6px;height:14px;border-radius:4px;background:linear-gradient(#f2f3fa,#b9bcd8);animation:sc-vm var(--dur,2.4s) ease-in-out infinite;animation-delay:calc(var(--i)*-.4s)}',
        kf('sc-vm', '0%,100%{top:18%}50%{top:62%}')
      ]),
      cfg: [range('Width', '--w', 180, 320, 2, 240, 'px'), range('Cycle', '--dur', 1, 5, .1, 2.4, 's')]
    });
    pool.push({
      family: 'schuds', id: 'sc-hud-sliders', title: 'HUD Slider Bank',
      tags: ['css', 'hud', 'slider', 'ui'],
      html: '<div class="ct hs"><div class="s"><i></i></div><div class="s"><i></i></div><div class="s"><i></i></div></div>',
      css: join([
        ctl,
        '.hs .s{height:8px;border-radius:99px;background:rgba(255,255,255,.08);margin:14px 0;position:relative;overflow:hidden}',
        '.hs i{display:block;height:100%;width:var(--p,62%);border-radius:99px;background:linear-gradient(90deg,var(--c2,' + C2 + '),var(--c5,' + C5 + '));animation:sc-hs var(--dur,2.6s) ease-in-out infinite}',
        '.hs .s:nth-child(2) i{animation-delay:-.6s;width:44%}',
        '.hs .s:nth-child(3) i{animation-delay:-1.1s;width:78%}',
        kf('sc-hs', '0%,100%{transform:scaleX(.7)}50%{transform:scaleX(1)}')
      ]),
      cfg: [range('Width', '--w', 180, 320, 2, 240, 'px'), range('Cycle', '--dur', 1, 6, .1, 2.6, 's'),
        col('A', '--c2', C2), col('B', '--c5', C5)]
    });
    pool.push({
      family: 'scrotc', id: 'sc-rotary-cluster', title: 'Rotary Cluster',
      tags: ['css', 'dial', 'ui'],
      html: '<div class="ct rc"><i></i><i></i><i></i></div>',
      css: join([
        ctl,
        '.rc{display:flex;gap:16px;justify-content:center}',
        '.rc i{width:48px;height:48px;border-radius:50%;background:conic-gradient(var(--c1,' + C1 + ') 0 40%,#1a1a28 0);animation:sc-rc var(--dur,3.4s) linear infinite}',
        '.rc i:nth-child(2){animation-duration:calc(var(--dur,3.4s)*1.3);background:conic-gradient(var(--c2,' + C2 + ') 0 62%,#1a1a28 0)}',
        '.rc i:nth-child(3){animation-direction:reverse;background:conic-gradient(var(--c3,' + C3 + ') 0 28%,#1a1a28 0)}',
        kf('sc-rc', 'to{transform:rotate(1turn)}')
      ]),
      cfg: [range('Width', '--w', 180, 320, 2, 240, 'px'), range('Cycle', '--dur', 1, 8, .1, 3.4, 's'),
        col('A', '--c1', C1), col('B', '--c2', C2), col('C', '--c3', C3)]
    });
    pool.push({
      family: 'sctogrow', id: 'sc-toggle-row', title: 'Toggle Row UI',
      tags: ['css', 'toggle', 'ui'],
      html: '<div class="ct tg"><div class="sw"><b></b></div><div class="sw on"><b></b></div><div class="sw"><b></b></div></div>',
      css: join([
        ctl,
        '.tg{display:flex;flex-direction:column;gap:12px}',
        '.tg .sw{height:28px;width:52px;border-radius:99px;background:#0d0d15;position:relative}',
        '.tg b{position:absolute;top:4px;left:4px;width:20px;height:20px;border-radius:50%;background:#fff;transition:left .3s}',
        '.tg .on{background:var(--c5,' + C5 + ')}',
        '.tg .on b{left:28px}',
        '.tg .sw:nth-child(2){animation:sc-tgr var(--dur,2.8s) ease-in-out infinite}',
        kf('sc-tgr', '0%,40%{filter:brightness(1)}50%,90%{filter:brightness(1.2)}')
      ]),
      cfg: [range('Width', '--w', 180, 280, 2, 240, 'px'), range('Cycle', '--dur', 1, 6, .1, 2.8, 's'), col('On', '--c5', C5)]
    });
    pool.push({
      family: 'scstep', id: 'sc-stepper-hud', title: 'Stepper HUD',
      tags: ['css', 'stepper', 'hud', 'ui'],
      html: '<div class="ct st"><span>−</span><b>08</b><span>+</span></div>',
      css: join([
        ctl,
        '.st{display:flex;align-items:center;justify-content:center;gap:16px}',
        '.st span{width:40px;height:40px;border-radius:10px;display:grid;place-items:center;background:rgba(255,255,255,.07);font:800 18px system-ui,sans-serif}',
        '.st b{font:800 28px "JetBrains Mono",monospace;color:var(--c2,' + C2 + ');animation:sc-sth var(--dur,2s) steps(1) infinite}',
        '.st span:last-child{background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));animation:sc-stp var(--dur,2s) ease-out infinite}',
        kf('sc-sth', '0%{opacity:1}50%{opacity:.4}'),
        kf('sc-stp', '0%,100%{transform:scale(1)}15%{transform:scale(.9)}')
      ]),
      cfg: [range('Width', '--w', 180, 320, 2, 240, 'px'), range('Cycle', '--dur', .8, 5, .1, 2, 's'),
        col('A', '--c1', C1), col('B', '--c2', C2)]
    });
    pool.push({
      family: 'scwheel', id: 'sc-color-wheel', title: 'Color Wheel Dial',
      tags: ['css', 'colour', 'dial', 'ui'],
      html: '<div class="ct wh"><i></i><b></b></div>',
      css: join([
        ctl,
        '.wh{position:relative;width:120px;height:120px;margin:0 auto}',
        '.wh i{position:absolute;inset:0;border-radius:50%;background:conic-gradient(red,yellow,lime,aqua,blue,magenta,red);animation:sc-wh var(--dur,6s) linear infinite}',
        '.wh b{position:absolute;inset:28%;border-radius:50%;background:#15151f}',
        kf('sc-wh', 'to{transform:rotate(1turn)}')
      ]),
      cfg: [range('Width', '--w', 180, 320, 2, 240, 'px'), range('Cycle', '--dur', 2, 14, .1, 6, 's')]
    });
    K.add('controls', pool);
  })();

  /* ───────── SVG ───────── */
  (function () {
    var pool = [];
    var svgB = '.sv{width:var(--w,260px);display:grid;place-items:center}.sv svg{width:100%;overflow:visible}';
    pool.push({
      family: 'scarmp', id: 'sc-arm-path', title: 'Robot Arm Path',
      tags: ['css', 'svg', 'robot', 'draw'],
      html: '<div class="sv"><svg viewBox="0 0 200 100"><path class="ln" d="M20 80 L70 80 L90 40 L140 40 L160 20"/><circle class="j" cx="70" cy="80" r="6"/><circle class="j" cx="90" cy="40" r="6"/><circle class="j e" cx="160" cy="20" r="5"/></svg></div>',
      css: join([
        svgB,
        '.sv .ln{fill:none;stroke:var(--c2,' + C2 + ');stroke-width:4;stroke-linecap:round;stroke-dasharray:240;animation:sc-ap var(--dur,3.4s) ease-in-out infinite}',
        '.sv .j{fill:var(--c1,' + C1 + ')}',
        '.sv .e{fill:var(--c4,' + C4 + ');animation:sc-ape var(--dur,3.4s) ease-in-out infinite}',
        kf('sc-ap', '0%{stroke-dashoffset:240}55%,100%{stroke-dashoffset:0}'),
        kf('sc-ape', '0%,40%{opacity:.3}60%,100%{opacity:1}')
      ]),
      cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', 1.5, 8, .1, 3.4, 's'),
        col('Arm', '--c2', C2), col('Joint', '--c1', C1), col('Tip', '--c4', C4)]
    });
    pool.push({
      family: 'scconsth', id: 'sc-const-hud', title: 'Constellation HUD',
      tags: ['css', 'svg', 'hud', 'stars'],
      html: '<div class="sv"><svg viewBox="0 0 200 100"><path class="ln" d="M30 70 L70 30 L110 55 L150 20 L180 48" fill="none"/><circle cx="30" cy="70" r="3"/><circle cx="70" cy="30" r="3"/><circle cx="110" cy="55" r="3"/><circle cx="150" cy="20" r="3"/><circle cx="180" cy="48" r="3"/></svg></div>',
      css: join([
        svgB,
        '.sv .ln{stroke:var(--c2,' + C2 + ');stroke-width:1.5;stroke-dasharray:220;animation:sc-ch var(--dur,4s) ease-in-out infinite}',
        '.sv circle{fill:var(--c4,' + C4 + ');animation:sc-chs var(--dur,2s) ease-in-out infinite}',
        kf('sc-ch', '0%{stroke-dashoffset:220}50%,100%{stroke-dashoffset:0}'),
        kf('sc-chs', '0%,100%{opacity:.4}50%{opacity:1}')
      ]),
      cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', 1.5, 8, .1, 4, 's'),
        col('Line', '--c2', C2), col('Star', '--c4', C4)]
    });
    pool.push({
      family: 'scecg', id: 'sc-ecg-monitor', title: 'ECG Monitor Line',
      tags: ['css', 'svg', 'ecg', 'hud'],
      html: '<div class="sv"><svg viewBox="0 0 200 70"><path class="beat" d="M0 35 H30 L40 35 L48 12 L58 58 L66 8 L74 40 L84 35 H200" fill="none"/></svg></div>',
      css: join([
        svgB,
        '.sv .beat{stroke:var(--c3,' + C3 + ');stroke-width:2.4;stroke-linejoin:round;stroke-dasharray:420;animation:sc-ecg var(--dur,2.4s) linear infinite;filter:drop-shadow(0 0 6px var(--c3,' + C3 + '))}',
        kf('sc-ecg', '0%{stroke-dashoffset:420}70%,100%{stroke-dashoffset:0}')
      ]),
      cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', .8, 5, .1, 2.4, 's'), col('Trace', '--c3', C3)]
    });
    pool.push({
      family: 'sccirc', id: 'sc-circuit-trace', title: 'Circuit Board Trace',
      tags: ['css', 'svg', 'circuit'],
      html: '<div class="sv"><svg viewBox="0 0 200 90"><path class="base" d="M10 45 H50 V20 H100 V70 H150 V45 H190" fill="none"/><path class="pulse" d="M10 45 H50 V20 H100 V70 H150 V45 H190" fill="none"/></svg></div>',
      css: join([
        svgB,
        '.sv .base{stroke:rgba(255,255,255,.12);stroke-width:3;stroke-linecap:round}',
        '.sv .pulse{stroke:var(--c5,' + C5 + ');stroke-width:3;stroke-dasharray:24 180;animation:sc-ct var(--dur,2s) linear infinite;filter:drop-shadow(0 0 5px var(--c5,' + C5 + '))}',
        kf('sc-ct', 'to{stroke-dashoffset:-204}')
      ]),
      cfg: [range('Width', '--w', 180, 340, 2, 260, 'px'), range('Cycle', '--dur', .6, 5, .1, 2, 's'), col('Pulse', '--c5', C5)]
    });
    pool.push({
      family: 'scglyph', id: 'sc-morph-glyph', title: 'Morphing Glyph',
      tags: ['css', 'svg', 'morph'],
      html: '<div class="sv"><svg viewBox="0 0 100 100"><polygon class="g" points="50,8 90,90 10,90"/></svg></div>',
      css: join([
        svgB,
        '.sv .g{fill:none;stroke:var(--c1,' + C1 + ');stroke-width:3;animation:sc-mg var(--dur,3s) ease-in-out infinite}',
        kf('sc-mg', '0%,100%{transform:rotate(0) scale(1)}50%{transform:rotate(180deg) scale(.85)}')
      ]),
      cfg: [range('Width', '--w', 140, 280, 2, 200, 'px'), range('Cycle', '--dur', 1, 7, .1, 3, 's'), col('Glyph', '--c1', C1)]
    });
    pool.push({
      family: 'scrads', id: 'sc-radar-svg', title: 'Radar Sweep SVG',
      tags: ['css', 'svg', 'radar', 'hud'],
      html: '<div class="sv"><svg viewBox="0 0 100 100"><circle class="r" cx="50" cy="50" r="40" fill="none"/><circle class="r" cx="50" cy="50" r="24" fill="none"/><line class="sw" x1="50" y1="50" x2="50" y2="10"/><circle class="bl" cx="68" cy="32" r="3"/></svg></div>',
      css: join([
        svgB,
        '.sv .r{stroke:color-mix(in srgb,var(--c2,' + C2 + ') 50%,transparent);stroke-width:1.4}',
        '.sv .sw{stroke:var(--c5,' + C5 + ');stroke-width:2;transform-origin:50px 50px;animation:sc-rs var(--dur,2.2s) linear infinite}',
        '.sv .bl{fill:var(--c4,' + C4 + ');animation:sc-rsb var(--dur,2.2s) ease-in-out infinite}',
        kf('sc-rs', 'to{transform:rotate(1turn)}'),
        kf('sc-rsb', '0%,100%{opacity:.2}40%{opacity:1}')
      ]),
      cfg: [range('Width', '--w', 140, 280, 2, 200, 'px'), range('Cycle', '--dur', .8, 5, .1, 2.2, 's'),
        col('Ring', '--c2', C2), col('Sweep', '--c5', C5), col('Blip', '--c4', C4)]
    });
    K.add('svg', pool);
  })();

  /* ───────── 3D ───────── */
  (function () {
    var pool = [];
    var d3 = '.d3{width:100%;height:var(--h,260px);display:grid;place-items:center;perspective:900px;background:radial-gradient(80% 90% at 50% 30%,#121222,#07070d);border-radius:12px;overflow:hidden}';
    pool.push({
      family: 'scsol', id: 'sc-solar-stage', title: 'Solar System Stage',
      tags: ['css', '3d', 'planet', 'big'],
      html: '<div class="d3"><div class="sol"><i class="sun"></i><i class="p p1"></i><i class="p p2"></i><i class="p p3"></i></div></div>',
      css: join([
        d3,
        '.sol{position:relative;width:180px;height:180px;transform-style:preserve-3d;animation:sc-sol var(--dur,16s) linear infinite}',
        '.sol .sun{position:absolute;left:50%;top:50%;width:28px;height:28px;margin:-14px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,var(--c4,' + C4 + '));box-shadow:0 0 24px var(--c4,' + C4 + ')}',
        '.sol .p{position:absolute;left:50%;top:50%;width:10px;height:10px;margin:-5px;border-radius:50%}',
        '.sol .p1{background:var(--c2,' + C2 + ');animation:sc-orp 4s linear infinite}',
        '.sol .p2{background:var(--c3,' + C3 + ');width:14px;height:14px;margin:-7px;animation:sc-orp 7s linear infinite}',
        '.sol .p3{background:var(--c1,' + C1 + ');animation:sc-orp 11s linear infinite}',
        kf('sc-sol', 'to{transform:rotateX(62deg) rotateZ(1turn)}'),
        kf('sc-orp', '0%{transform:rotate(0) translateX(40px)}100%{transform:rotate(360deg) translateX(40px)}')
      ]),
      cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 6, 40, .5, 16, 's'),
        col('Sun', '--c4', C4), col('A', '--c2', C2), col('B', '--c3', C3), col('C', '--c1', C1)]
    });
    pool.push({
      family: 'scrbt', id: 'sc-robot-scene', title: 'Robot Arm Scene',
      tags: ['css', '3d', 'robot', 'big'],
      html: '<div class="d3"><div class="ra"><i class="base"></i><i class="seg s1"></i><i class="seg s2"></i><i class="claw"></i></div></div>',
      css: join([
        d3,
        '.ra{position:relative;width:160px;height:180px;transform-style:preserve-3d}',
        '.ra .base{position:absolute;left:50%;bottom:16px;width:54px;height:14px;margin-left:-27px;border-radius:6px;background:#2a2a3d}',
        '.ra .s1{position:absolute;left:50%;bottom:28px;width:14px;height:70px;margin-left:-7px;background:linear-gradient(var(--c2,' + C2 + '),#1a1a28);transform-origin:50% 100%;border-radius:8px;animation:sc-ras1 var(--dur,3s) ease-in-out infinite}',
        '.ra .s2{position:absolute;left:50%;bottom:92px;width:12px;height:54px;margin-left:-6px;background:linear-gradient(var(--c1,' + C1 + '),#1a1a28);transform-origin:50% 100%;border-radius:8px;animation:sc-ras2 var(--dur,3s) ease-in-out infinite}',
        '.ra .claw{position:absolute;left:50%;bottom:140px;width:22px;height:12px;margin-left:-11px;background:var(--c4,' + C4 + ');border-radius:3px;animation:sc-rac var(--dur,3s) ease-in-out infinite}',
        kf('sc-ras1', '0%,100%{transform:rotate(-16deg)}50%{transform:rotate(18deg)}'),
        kf('sc-ras2', '0%,100%{transform:rotate(24deg)}50%{transform:rotate(-28deg)}'),
        kf('sc-rac', '0%,100%{transform:translateX(-8px)}50%{transform:translateX(10px)}')
      ]),
      cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 1.2, 7, .1, 3, 's'),
        col('A', '--c2', C2), col('B', '--c1', C1), col('Claw', '--c4', C4)]
    });
    pool.push({
      family: 'sciso2', id: 'sc-iso-work', title: 'Isometric Workstation',
      tags: ['css', '3d', 'isometric', 'ui', 'big'],
      html: '<div class="d3"><div class="ws"><i class="desk"></i><i class="mon"></i><i class="kb"></i></div></div>',
      css: join([
        d3,
        '.ws{position:relative;width:180px;height:140px;transform:rotateX(55deg) rotateZ(-35deg);transform-style:preserve-3d;animation:sc-ws var(--dur,10s) ease-in-out infinite}',
        '.ws .desk{position:absolute;left:10%;right:10%;bottom:20%;height:18px;background:#2a2a3d}',
        '.ws .mon{position:absolute;left:30%;bottom:38%;width:40%;height:48%;background:linear-gradient(var(--c2,' + C2 + '),var(--c1,' + C1 + '));box-shadow:0 0 18px var(--c1,' + C1 + ');animation:sc-wsm var(--dur,3s) ease-in-out infinite}',
        '.ws .kb{position:absolute;left:28%;bottom:8%;width:44%;height:10px;background:#3a3a50;border-radius:2px}',
        kf('sc-ws', '0%,100%{transform:rotateX(55deg) rotateZ(-35deg)}50%{transform:rotateX(55deg) rotateZ(-25deg)}'),
        kf('sc-wsm', '0%,100%{filter:brightness(1)}50%{filter:brightness(1.35)}')
      ]),
      cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 4, 20, .5, 10, 's'),
        col('Screen A', '--c1', C1), col('Screen B', '--c2', C2)]
    });
    pool.push({
      family: 'sccock', id: 'sc-hud-cockpit', title: 'HUD Cockpit',
      tags: ['css', '3d', 'hud', 'big'],
      html: '<div class="d3 ck"><i class="s1"></i><i class="s2"></i><i class="s3"></i><b></b></div>',
      css: join([
        d3,
        '.ck{transform-style:preserve-3d}',
        '.ck i{position:absolute;border:1px solid color-mix(in srgb,var(--c2,' + C2 + ') 50%,transparent);background:rgba(10,18,28,.65);border-radius:8px}',
        '.ck .s1{width:90px;height:60px;transform:translate(-80px,10px) rotateY(28deg);animation:sc-ck var(--dur,4s) ease-in-out infinite}',
        '.ck .s2{width:110px;height:70px;transform:translate(0,-10px)}',
        '.ck .s3{width:90px;height:60px;transform:translate(80px,10px) rotateY(-28deg);animation:sc-ck var(--dur,4s) ease-in-out infinite reverse}',
        '.ck b{position:absolute;width:24px;height:24px;border:2px solid var(--c5,' + C5 + ');transform:rotate(45deg);animation:sc-ckc var(--dur,2s) linear infinite}',
        kf('sc-ck', '0%,100%{filter:brightness(1)}50%{filter:brightness(1.4)}'),
        kf('sc-ckc', 'to{transform:rotate(405deg)}')
      ]),
      cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 1.5, 8, .1, 4, 's'),
        col('Frame', '--c2', C2), col('Cross', '--c5', C5)]
    });
    pool.push({
      family: 'scxlat3', id: 'sc-crystal-3d', title: 'Crystal Lattice 3D',
      tags: ['css', '3d', 'crystal', 'big'],
      html: '<div class="d3"><div class="cl">' + cells(6) + '</div></div>',
      css: join([
        d3,
        '.cl{position:relative;width:140px;height:140px;transform-style:preserve-3d;animation:sc-cl3 var(--dur,12s) linear infinite}',
        '.cl i{position:absolute;width:36px;height:52px;left:calc(20% + (var(--i)%3)*22%);top:calc(18% + (var(--i)/3|0)*28%);background:linear-gradient(160deg,var(--c2,' + C2 + '),transparent);clip-path:polygon(50% 0,100% 100%,0 100%);filter:drop-shadow(0 0 10px var(--c1,' + C1 + '))}',
        kf('sc-cl3', 'to{transform:rotateY(1turn) rotateX(12deg)}')
      ]),
      cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 4, 24, .5, 12, 's'),
        col('Glow', '--c1', C1), col('Shard', '--c2', C2)]
    });
    pool.push({
      family: 'scfly', id: 'sc-city-fly', title: 'City Flythrough',
      tags: ['css', '3d', 'city', 'big'],
      html: '<div class="d3"><div class="fly">' + cells(8) + '</div></div>',
      css: join([
        d3,
        '.fly{position:relative;width:220px;height:160px;transform-style:preserve-3d;transform:rotateX(62deg);animation:sc-fly var(--dur,10s) linear infinite}',
        '.fly i{position:absolute;width:22px;background:linear-gradient(var(--c1,' + C1 + '),#0a0a14);left:calc(var(--i)*12% + 4%);bottom:10%;height:calc(40px + var(--i)*8px);box-shadow:0 0 12px color-mix(in srgb,var(--c2,' + C2 + ') 40%,transparent)}',
        kf('sc-fly', '0%{transform:rotateX(62deg) translateZ(0)}100%{transform:rotateX(62deg) translateZ(80px)}')
      ]),
      cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 4, 20, .5, 10, 's'),
        col('Tower', '--c1', C1), col('Glow', '--c2', C2)]
    });
    pool.push({
      family: 'schuds3', id: 'sc-float-huds', title: 'Floating HUD Screens',
      tags: ['css', '3d', 'hud', 'ui', 'big'],
      html: '<div class="d3"><div class="fs"><i></i><i></i><i></i></div></div>',
      css: join([
        d3,
        '.fs{position:relative;width:200px;height:140px;transform-style:preserve-3d;animation:sc-fs var(--dur,14s) linear infinite}',
        '.fs i{position:absolute;width:70px;height:44px;border-radius:8px;border:1px solid var(--c2,' + C2 + ');background:rgba(12,20,36,.7);box-shadow:0 0 16px color-mix(in srgb,var(--c2,' + C2 + ') 40%,transparent)}',
        '.fs i:nth-child(1){transform:translate3d(-50px,-10px,20px) rotateY(22deg)}',
        '.fs i:nth-child(2){transform:translate3d(10px,8px,-10px)}',
        '.fs i:nth-child(3){transform:translate3d(54px,-6px,16px) rotateY(-22deg)}',
        kf('sc-fs', 'to{transform:rotateY(1turn)}')
      ]),
      cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 6, 28, .5, 14, 's'), col('Frame', '--c2', C2)]
    });
    pool.push({
      family: 'scgyro', id: 'sc-gyro-cluster', title: 'Gyro Sphere Cluster',
      tags: ['css', '3d', 'gyroscope', 'big'],
      html: '<div class="d3"><div class="gy"><i></i><i></i><i></i><b></b></div></div>',
      css: join([
        d3,
        '.gy{position:relative;width:130px;height:130px;transform-style:preserve-3d}',
        '.gy i{position:absolute;inset:0;border-radius:50%;border:3px solid var(--c1,' + C1 + ')}',
        '.gy i:nth-child(1){animation:sc-gyx var(--dur,6s) linear infinite}',
        '.gy i:nth-child(2){border-color:var(--c2,' + C2 + ');animation:sc-gyy var(--dur,4.5s) linear infinite}',
        '.gy i:nth-child(3){border-color:var(--c3,' + C3 + ');inset:12px;animation:sc-gyz var(--dur,3.2s) linear infinite}',
        '.gy b{position:absolute;left:50%;top:50%;width:16px;height:16px;margin:-8px;border-radius:50%;background:var(--c4,' + C4 + ');box-shadow:0 0 16px var(--c4,' + C4 + ')}',
        kf('sc-gyx', 'to{transform:rotateX(1turn)}'),
        kf('sc-gyy', 'to{transform:rotateY(1turn)}'),
        kf('sc-gyz', 'to{transform:rotateX(1turn) rotateY(1turn)}')
      ]),
      cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 2, 14, .1, 6, 's'),
        col('A', '--c1', C1), col('B', '--c2', C2), col('C', '--c3', C3), col('Core', '--c4', C4)]
    });
    pool.push({
      family: 'scbook', id: 'sc-book-flip', title: 'Book Flip Stage',
      tags: ['css', '3d', 'book', 'big'],
      html: '<div class="d3"><div class="bk"><i class="pg"></i><i class="pg p2"></i></div></div>',
      css: join([
        d3,
        '.bk{position:relative;width:90px;height:120px;transform-style:preserve-3d;transform:rotateX(8deg)}',
        '.bk .pg{position:absolute;inset:0;border-radius:0 8px 8px 0;background:linear-gradient(90deg,#f7f7ff,#d9dcf0);transform-origin:left center;box-shadow:0 10px 24px rgba(0,0,0,.4)}',
        '.bk .p2{background:linear-gradient(90deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));animation:sc-bk var(--dur,3.6s) ease-in-out infinite}',
        kf('sc-bk', '0%,20%{transform:rotateY(0)}50%,70%{transform:rotateY(-160deg)}100%{transform:rotateY(0)}')
      ]),
      cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 1.5, 8, .1, 3.6, 's'),
        col('A', '--c1', C1), col('B', '--c2', C2)]
    });
    pool.push({
      family: 'scdice', id: 'sc-dice-roll', title: 'Dice Roll Scene',
      tags: ['css', '3d', 'dice', 'big'],
      html: '<div class="d3"><div class="dc"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>',
      css: join([
        d3,
        '.dc{position:relative;width:70px;height:70px;transform-style:preserve-3d;animation:sc-dc var(--dur,5s) linear infinite}',
        '.dc i{position:absolute;inset:0;background:#f4f4fa;border:1px solid #ccc;display:grid;place-items:center;font:800 22px system-ui,sans-serif;color:#222}',
        '.dc i:nth-child(1){transform:translateZ(35px)}',
        '.dc i:nth-child(2){transform:rotateY(180deg) translateZ(35px)}',
        '.dc i:nth-child(3){transform:rotateY(90deg) translateZ(35px)}',
        '.dc i:nth-child(4){transform:rotateY(-90deg) translateZ(35px)}',
        '.dc i:nth-child(5){transform:rotateX(90deg) translateZ(35px)}',
        '.dc i:nth-child(6){transform:rotateX(-90deg) translateZ(35px)}',
        kf('sc-dc', '0%{transform:rotateX(0) rotateY(0)}100%{transform:rotateX(360deg) rotateY(420deg)}')
      ]),
      cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 2, 12, .1, 5, 's')]
    });
    pool.push({
      family: 'scgim', id: 'sc-camera-gimbal', title: 'Camera Gimbal',
      tags: ['css', '3d', 'camera', 'big'],
      html: '<div class="d3"><div class="gm"><i class="o"></i><i class="m"></i><b></b></div></div>',
      css: join([
        d3,
        '.gm{position:relative;width:140px;height:140px;transform-style:preserve-3d}',
        '.gm .o{position:absolute;inset:0;border-radius:50%;border:4px solid var(--c1,' + C1 + ');animation:sc-gmx var(--dur,5s) linear infinite}',
        '.gm .m{position:absolute;inset:18px;border-radius:50%;border:4px solid var(--c2,' + C2 + ');animation:sc-gmy var(--dur,3.6s) linear infinite}',
        '.gm b{position:absolute;left:50%;top:50%;width:28px;height:20px;margin:-10px -14px;border-radius:4px;background:#222;border:2px solid var(--c4,' + C4 + ')}',
        kf('sc-gmx', 'to{transform:rotateX(1turn)}'),
        kf('sc-gmy', 'to{transform:rotateY(1turn)}')
      ]),
      cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 2, 12, .1, 5, 's'),
        col('A', '--c1', C1), col('B', '--c2', C2), col('Body', '--c4', C4)]
    });
    pool.push({
      family: 'scstat', id: 'sc-station-ring', title: 'Space Station Ring',
      tags: ['css', '3d', 'space', 'big'],
      html: '<div class="d3"><div class="ss"><i class="ring"></i><i class="hub"></i><i class="sp"></i></div></div>',
      css: join([
        d3,
        '.ss{position:relative;width:160px;height:160px;transform-style:preserve-3d;animation:sc-ss var(--dur,14s) linear infinite}',
        '.ss .ring{position:absolute;inset:8px;border-radius:50%;border:10px solid color-mix(in srgb,var(--c2,' + C2 + ') 80%,transparent);box-shadow:0 0 20px var(--c2,' + C2 + ')}',
        '.ss .hub{position:absolute;left:50%;top:50%;width:22px;height:22px;margin:-11px;border-radius:50%;background:var(--c4,' + C4 + ');box-shadow:0 0 16px var(--c4,' + C4 + ')}',
        '.ss .sp{position:absolute;left:50%;top:50%;width:2px;height:70px;margin:-35px -1px;background:rgba(255,255,255,.35)}',
        kf('sc-ss', '0%{transform:rotateX(68deg) rotateZ(0)}100%{transform:rotateX(68deg) rotateZ(360deg)}')
      ]),
      cfg: [range('Scene height', '--h', 180, 420, 2, 260, 'px'), range('Cycle', '--dur', 6, 30, .5, 14, 's'),
        col('Ring', '--c2', C2), col('Hub', '--c4', C4)]
    });
    K.add('3d', pool);
  })();

  /* ───────── INTERACTION ───────── */
  (function () {
    var pool = [];
    var mo = '.mo{width:100%;height:var(--h,240px);border-radius:12px;background:radial-gradient(90% 100% at 50% 20%,#10101c,#07070d);overflow:hidden;position:relative}';
    pool.push({
      family: 'scmdock', id: 'sc-mag-dock', title: 'Magnetic Dock',
      tags: ['js', 'magnetic', 'pointer', 'ui'],
      html: '<div class="mo dk">' + cells(5) + '<p class="hint">hover the dock</p></div>',
      css: join([
        mo,
        '.dk{display:flex;align-items:flex-end;justify-content:center;gap:10px;padding:40px 12px 28px}',
        '.dk i{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));transition:transform .2s}',
        '.hint{position:absolute;bottom:10px;left:0;right:0;text-align:center;font:600 10px system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.35)}'
      ]),
      js: 'var host=root.querySelector(".mo"),K=Array.prototype.slice.call(root.querySelectorAll("i"));\nvar go=function(e){var r=host.getBoundingClientRect();K.forEach(function(el){var b=el.getBoundingClientRect(),dx=e.clientX-(b.left+b.width/2),dy=e.clientY-(b.top+b.height/2),d=Math.hypot(dx,dy),s=Math.max(1,1.45-d/140);el.style.transform="translateY("+(-18*(s-1)).toFixed(1)+"px) scale("+s.toFixed(2)+")";});};\nvar off=function(){K.forEach(function(el){el.style.transform="";});};\nhost.addEventListener("pointermove",go);host.addEventListener("pointerleave",off);\napi.onCleanup(function(){host.removeEventListener("pointermove",go);host.removeEventListener("pointerleave",off);});',
      cfg: [range('Scene height', '--h', 140, 360, 2, 240, 'px'), col('A', '--c1', C1), col('B', '--c2', C2)]
    });
    pool.push({
      family: 'sctilt', id: 'sc-tilt-card', title: 'Pointer Tilt Stage',
      tags: ['js', 'tilt', '3d', 'pointer'],
      html: '<div class="mo"><div class="tc"><b>TILT</b></div></div>',
      css: join([
        mo,
        '.tc{position:absolute;left:50%;top:50%;width:140px;height:90px;margin:-45px 0 0 -70px;border-radius:14px;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c3,' + C3 + '));display:grid;place-items:center;font:800 22px system-ui,sans-serif;color:#fff;transform-style:preserve-3d;will-change:transform}'
      ]),
      js: 'var host=root.querySelector(".mo"),c=root.querySelector(".tc");\nvar go=function(e){var r=host.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform="rotateY("+(x*18).toFixed(1)+"deg) rotateX("+(-y*18).toFixed(1)+"deg)";};\nvar off=function(){c.style.transform="";};\nhost.addEventListener("pointermove",go);host.addEventListener("pointerleave",off);\napi.onCleanup(function(){host.removeEventListener("pointermove",go);host.removeEventListener("pointerleave",off);});',
      cfg: [range('Scene height', '--h', 140, 360, 2, 240, 'px'), col('A', '--c1', C1), col('B', '--c3', C3)]
    });
    pool.push({
      family: 'scdraw', id: 'sc-spring-drawer', title: 'Spring Drawer',
      tags: ['css', 'drawer', 'ui', 'hover'],
      html: '<div class="mo"><div class="dr"><b>Pull</b><p>spring sheet</p></div></div>',
      css: join([
        mo,
        '.dr{position:absolute;left:12%;right:12%;bottom:-46%;padding:16px;border-radius:16px 16px 0 0;background:#171724;border:1px solid rgba(255,255,255,.1);transition:transform .5s cubic-bezier(.3,1.4,.4,1)}',
        '.mo:hover .dr{transform:translateY(-70%)}',
        '.dr b{display:block;font:800 14px system-ui,sans-serif;color:#fff}',
        '.dr p{margin:6px 0 0;font-size:12px;color:#8f92b3}'
      ]),
      cfg: [range('Scene height', '--h', 140, 360, 2, 240, 'px')]
    });
    pool.push({
      family: 'scspot', id: 'sc-cursor-spot', title: 'Cursor Spotlight HUD',
      tags: ['js', 'spotlight', 'pointer', 'hud'],
      html: '<div class="mo"><div class="sp"></div><p class="hint">move your cursor</p></div>',
      css: join([
        mo,
        '.sp{position:absolute;width:140px;height:140px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--c2,' + C2 + ') 55%,transparent),transparent 70%);pointer-events:none;transform:translate(-50%,-50%);mix-blend-mode:screen}',
        '.hint{position:absolute;bottom:10px;left:0;right:0;text-align:center;font:600 10px system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.35)}'
      ]),
      js: 'var host=root.querySelector(".mo"),sp=root.querySelector(".sp");\nvar go=function(e){var r=host.getBoundingClientRect();sp.style.left=(e.clientX-r.left)+"px";sp.style.top=(e.clientY-r.top)+"px";};\nhost.addEventListener("pointermove",go);\napi.onCleanup(function(){host.removeEventListener("pointermove",go);});',
      cfg: [range('Scene height', '--h', 140, 360, 2, 240, 'px'), col('Spot', '--c2', C2)]
    });
    pool.push({
      family: 'scprog', id: 'sc-scroll-ring', title: 'Scroll Progress Ring',
      tags: ['css', 'progress', 'hud'],
      html: '<div class="mo"><div class="rg"><i></i><b>64%</b></div></div>',
      css: join([
        mo,
        '.rg{position:absolute;left:50%;top:50%;width:90px;height:90px;margin:-45px;border-radius:50%;background:conic-gradient(var(--c2,' + C2 + ') 0 var(--p,230deg),rgba(255,255,255,.08) 0);display:grid;place-items:center;animation:sc-spr var(--dur,4s) ease-in-out infinite}',
        '.rg i{position:absolute;inset:10px;border-radius:50%;background:#10101c}',
        '.rg b{position:relative;font:800 16px "JetBrains Mono",monospace;color:#fff}',
        kf('sc-spr', '0%,100%{filter:hue-rotate(0)}50%{filter:hue-rotate(40deg)}')
      ]),
      cfg: [range('Scene height', '--h', 140, 320, 2, 240, 'px'), range('Cycle', '--dur', 1.5, 8, .1, 4, 's'), col('Arc', '--c2', C2)]
    });
    pool.push({
      family: 'scsnap', id: 'sc-drag-snap', title: 'Drag Snap Grid',
      tags: ['js', 'drag', 'grid', 'ui'],
      html: '<div class="mo"><i class="tile"></i><p class="hint">drag the tile</p></div>',
      css: join([
        mo,
        '.mo{background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:32px 32px}',
        '.tile{position:absolute;width:48px;height:48px;border-radius:10px;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));left:40%;top:35%;cursor:grab}',
        '.hint{position:absolute;bottom:10px;left:0;right:0;text-align:center;font:600 10px system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.35)}'
      ]),
      js: 'var host=root.querySelector(".mo"),t=root.querySelector(".tile"),drag=false,dx=0,dy=0;\nhost.addEventListener("pointerdown",function(e){if(e.target!==t)return;drag=true;var r=host.getBoundingClientRect();dx=e.clientX-r.left-t.offsetLeft;dy=e.clientY-r.top-t.offsetTop;t.setPointerCapture(e.pointerId);});\nhost.addEventListener("pointermove",function(e){if(!drag)return;var r=host.getBoundingClientRect();var x=e.clientX-r.left-dx,y=e.clientY-r.top-dy;x=Math.round(x/32)*32;y=Math.round(y/32)*32;t.style.left=x+"px";t.style.top=y+"px";});\nhost.addEventListener("pointerup",function(){drag=false;});',
      cfg: [range('Scene height', '--h', 140, 360, 2, 240, 'px'), col('A', '--c1', C1), col('B', '--c2', C2)]
    });
    pool.push({
      family: 'sciner', id: 'sc-inertia-slider', title: 'Inertia Slider',
      tags: ['js', 'slider', 'pointer', 'ui'],
      html: '<div class="mo"><div class="track"><b></b></div></div>',
      css: join([
        mo,
        '.track{position:absolute;left:12%;right:12%;top:50%;height:10px;margin-top:-5px;border-radius:99px;background:rgba(255,255,255,.1)}',
        '.track b{position:absolute;top:-8px;width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));cursor:grab;left:30%}'
      ]),
      js: 'var host=root.querySelector(".mo"),kn=root.querySelector("b"),track=root.querySelector(".track"),x=0.3,vx=0,down=false;\nvar onDown=function(e){down=true;kn.setPointerCapture(e.pointerId);};\nvar onMove=function(e){if(!down)return;var r=track.getBoundingClientRect();x=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));};\nvar onUp=function(){down=false;};\nkn.addEventListener("pointerdown",onDown);kn.addEventListener("pointermove",onMove);kn.addEventListener("pointerup",onUp);\napi.raf(function(){if(!down){vx+=(0.5-x)*0.02;vx*=0.92;x+=vx;if(x<0){x=0;vx*=-0.4;}if(x>1){x=1;vx*=-0.4;}}kn.style.left=(x*100).toFixed(1)+"%";});\napi.onCleanup(function(){kn.removeEventListener("pointerdown",onDown);kn.removeEventListener("pointermove",onMove);kn.removeEventListener("pointerup",onUp);});',
      cfg: [range('Scene height', '--h', 140, 320, 2, 240, 'px'), col('A', '--c1', C1), col('B', '--c2', C2)]
    });
    pool.push({
      family: 'scplay', id: 'sc-parallax-hud', title: 'Parallax HUD Layers',
      tags: ['js', 'parallax', 'hud', 'pointer', 'big'],
      html: '<div class="mo ph"><i class="a"></i><i class="b"></i><i class="c"></i><p class="hint">move your cursor</p></div>',
      css: join([
        mo,
        '.ph i{position:absolute;border:1px solid color-mix(in srgb,var(--c2,' + C2 + ') 40%,transparent);border-radius:8px}',
        '.ph .a{inset:18% 22%;}',
        '.ph .b{inset:28% 30%;border-color:color-mix(in srgb,var(--c1,' + C1 + ') 50%,transparent)}',
        '.ph .c{inset:40% 42%;background:color-mix(in srgb,var(--c5,' + C5 + ') 18%,transparent)}',
        '.hint{position:absolute;bottom:10px;left:0;right:0;text-align:center;font:600 10px system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.35)}'
      ]),
      js: 'var host=root.querySelector(".mo"),ls=[].slice.call(host.querySelectorAll("i")),depth=[18,10,4],tx=0,ty=0,cx=0,cy=0;\nvar onMove=function(e){var r=host.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;};\nvar onLeave=function(){tx=0;ty=0;};\nhost.addEventListener("pointermove",onMove);host.addEventListener("pointerleave",onLeave);\napi.raf(function(){cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;for(var i=0;i<ls.length;i++)ls[i].style.transform="translate("+(cx*depth[i]).toFixed(1)+"px,"+(cy*depth[i]).toFixed(1)+"px)";});\napi.onCleanup(function(){host.removeEventListener("pointermove",onMove);host.removeEventListener("pointerleave",onLeave);});',
      cfg: [range('Scene height', '--h', 140, 360, 2, 240, 'px'),
        col('A', '--c1', C1), col('B', '--c2', C2), col('C', '--c5', C5)]
    });
    K.add('motion', pool);
  })();
})(window);
