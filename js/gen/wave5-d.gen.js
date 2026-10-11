/* ============================================================
   Motion Lab — wave 5, CARDS & HOVER (the 1,000-effect expansion)
   21 new mechanic families × 24 variants = 504 candidates.
   Every mechanic is a distinct card interaction new to the
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
      col('Card A', '--c1', v.c1),
      col('Card B', '--c2', v.c2),
      col('Card C', '--c3', v.c3)
    ].concat(extra || []);
  }
  function cardBase(v, extra) {
    return join([
      '.cd2{position:relative;width:var(--w,206px);background:rgba(13,13,23,.86);border:1px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 22%,rgba(255,255,255,.09));border-radius:var(--rad,16px);padding:13px;box-shadow:0 18px 34px -20px rgba(0,0,0,.8)}',
      '.cd2 .ph{height:var(--ph,72px);border-radius:10px;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));position:relative;overflow:hidden}',
      '.cd2 .ph::after{content:"";position:absolute;top:0;bottom:0;left:-70%;width:45%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.35),transparent);transform:skewX(-16deg);animation:cd2-a' + v.i + ' var(--dur,' + D(v, 2.6) + 's) ease-in-out infinite}',
      kf('cd2-a' + v.i, '0%{left:-70%}55%,100%{left:135%}'),
      '.cd2 .tt{display:block;margin:10px 0 3px;font:700 15px/1.2 system-ui,sans-serif;color:#f2f2f8}',
      '.cd2 .st{display:block;font:500 11.5px/1.4 system-ui,sans-serif;color:rgba(200,200,222,.65)}',
      '.cd2 .ch{display:inline-block;margin-top:10px;padding:6px 14px;border-radius:99px;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));font:700 11px/1 system-ui,sans-serif;color:#fff;letter-spacing:.04em}',
      (extra || '')
    ]);
  }

  var M = [];

  /* 1. follow spot — a light mask tracks the pointer across the card */
  M.push({ key: 'followspot', title: 'Follow Spot', tags: ['card', 'pointer', 'js'], build: function (v) {
    return {
      html: '<div class="cd2"><i class="fl"></i><div class="ph"></div><b class="tt">Spotlit</b><s class="st">Light follows your pointer</s><u class="ch">OPEN</u></div>',
      css: join([
        cardBase(v),
        '.cd2 .fl{position:absolute;inset:0;border-radius:inherit;background:radial-gradient(150px circle at var(--mx,50%) var(--my,50%),color-mix(in srgb,var(--c3,' + v.c3 + ') 34%,transparent),transparent 68%);pointer-events:none;animation:fl-a' + v.i + ' var(--dur,' + D(v, 2.4) + 's) ease-in-out infinite}',
        kf('fl-a' + v.i, '0%,100%{opacity:.55}50%{opacity:.95}')
      ]),
      js: 'var c=root.querySelector(".cd2");c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect();if(!r.width||!r.height)return;c.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%");c.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%");});',
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 206, 'px'), range('Corner', '--rad', 8, 28, 1, 16, 'px')])
    };
  } });

  /* 2. layer parallax — content layers shift at different depths */
  M.push({ key: 'layerpar', title: 'Layer Parallax', tags: ['card', 'parallax', 'js'], build: function (v) {
    return {
      html: '<div class="cd2 plx"><div class="ph" data-d="6"></div><b class="tt" data-d="14">Parallax</b><s class="st" data-d="22">Layers move at different rates</s><u class="ch" data-d="18">MOVE IT</u></div>',
      css: join([
        cardBase(v),
        '.plx .ph,.plx .tt,.plx .st,.plx .ch{will-change:transform;transition:transform .3s ease-out}',
        '.plx{animation:plx-a' + v.i + ' var(--dur,' + D(v, 2.8) + 's) ease-in-out infinite}',
        kf('plx-a' + v.i, '0%,100%{transform:translate(0,0)}50%{transform:translate(0,-3px)}')
      ]),
      js: 'var c=root.querySelector(".cd2"),ls=Array.prototype.slice.call(c.querySelectorAll("[data-d]"));c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect();if(!r.width||!r.height)return;var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;for(var i=0;i<ls.length;i++){var d=parseFloat(ls[i].getAttribute("data-d"));ls[i].style.transform="translate("+(x*d)+"px,"+(y*d)+"px)";}});c.addEventListener("pointerleave",function(){for(var i=0;i<ls.length;i++)ls[i].style.transform="";});',
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 206, 'px')])
    };
  } });

  /* 3. tilt hud — the card tilts in 3D and reports the angles */
  M.push({ key: 'tilthud', title: 'Tilt HUD', tags: ['card', 'tilt', 'js'], build: function (v) {
    return {
      html: '<div class="cd2 tld"><div class="ph"></div><b class="tt">Tilt HUD</b><s class="st"><i class="rd">0.0&deg; / 0.0&deg;</i></s><u class="ch">TILT</u></div>',
      css: join([
        cardBase(v),
        '.tld{transition:transform .25s ease-out;transform-style:preserve-3d}',
        '.tld .rd{font:700 11px ui-monospace,monospace;color:var(--c3,' + v.c3 + ')}',
        '.tld{animation:tld-a' + v.i + ' var(--dur,' + D(v, 3) + 's) ease-in-out infinite}',
        kf('tld-a' + v.i, '0%,100%{transform:rotateX(0) rotateY(0)}50%{transform:rotateX(3deg) rotateY(-3deg)}')
      ]),
      js: 'var c=root.querySelector(".cd2"),rd=c.querySelector(".rd");c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect();if(!r.width||!r.height)return;var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform="rotateX("+(y*-16)+"deg) rotateY("+(x*16)+"deg)";rd.textContent=(y*-16).toFixed(1)+"\u00b0 / "+(x*16).toFixed(1)+"\u00b0";});c.addEventListener("pointerleave",function(){c.style.transform="";rd.textContent="0.0\u00b0 / 0.0\u00b0";});',
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 206, 'px')])
    };
  } });

  M.push({ key: 'sparktrail', title: 'Spark Trail', tags: ['card', 'pointer', 'js'], build: function (v) {
    return {
      html: '<div class="cd2 spk"><div class="ph"></div><b class="tt">Spark Trail</b><s class="st">Move across the card</s><u class="ch">WANDER</u></div>',
      css: join([
        cardBase(v),
        '.spk .sp{position:absolute;width:7px;height:7px;border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 8px var(--c3,' + v.c3 + ');pointer-events:none;transform:translate(-50%,-50%);animation:spk-a' + v.i + ' .8s ease-out forwards}',
        kf('spk-a' + v.i, 'to{transform:translate(-50%,-50%) scale(.1);opacity:0}')
      ]),
      js: 'var c=root.querySelector(".cd2"),last=0;c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect();if(!r.width||!r.height)return;var x=e.clientX-r.left,y=e.clientY-r.top,now=Date.now();if(now-last<40)return;last=now;if(c.querySelectorAll(".sp").length>26)return;var s=document.createElement("i");s.className="sp";s.style.left=x+"px";s.style.top=y+"px";s.addEventListener("animationend",function(){s.remove()});c.appendChild(s);});',
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 206, 'px')])
    };
  } });

  /* 6. image swap — a second scene slides over the first on hover */
  M.push({ key: 'imageswap', title: 'Image Swap', tags: ['card', 'hover'], build: function (v) {
    return {
      html: '<div class="cd2 isw"><div class="phw"><i class="p1"></i><i class="p2"></i></div><b class="tt">Before / After</b><s class="st">Hover to slide the scene</s><u class="ch">SWAP</u></div>',
      css: join([
        cardBase(v),
        '.isw .phw{height:var(--ph,72px);border-radius:10px;overflow:hidden;position:relative}',
        '.isw .p1{position:absolute;inset:0;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c3,' + v.c3 + '))}',
        '.isw .p2{position:absolute;inset:0;background:linear-gradient(315deg,var(--c2,' + v.c2 + '),var(--c1,' + v.c1 + '));transform:translateX(101%);transition:transform .6s cubic-bezier(.6,0,.2,1)}',
        '.isw:hover .p2{transform:translateX(0)}',
        '.isw .p2::after{content:"";position:absolute;top:0;bottom:0;left:-70%;width:45%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.4),transparent);transform:skewX(-16deg);animation:isw-a' + v.i + ' var(--dur,' + D(v, 2.4) + 's) ease-in-out infinite}',
        kf('isw-a' + v.i, '0%{left:-70%}55%,100%{left:135%}')
      ]),
      cfg: core(v, [range('Photo height', '--ph', 48, 110, 2, 72, 'px')])
    };
  } });

  /* 7. quadrant expand — one cell of the grid swells on hover */
  M.push({ key: 'quadrant', title: 'Quadrant Expand', tags: ['card', 'grid', 'hover'], build: function (v) {
    var q = v.i % 4;
    return {
      html: '<div class="cd2 qd"><div class="qs"><i class="q1"><b>01</b></i><i class="q2"><b>02</b></i><i class="q3"><b>03</b></i><i class="q4"><b>04</b></i></div><b class="tt">Quadrant</b><s class="st">Hover to expand a cell</s></div>',
      css: join([
        cardBase(v),
        '.qd .qs{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:5px;height:96px}',
        '.qd .qs i{display:grid;place-items:center;border-radius:8px;font:800 15px system-ui;cursor:pointer;transition:transform .45s cubic-bezier(.4,0,.2,1.3),box-shadow .45s ease}',
        '.qd .q1{background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '))}',
        '.qd .q2{background:linear-gradient(135deg,var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '))}',
        '.qd .q3{background:linear-gradient(135deg,var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '))}',
        '.qd .q4{background:linear-gradient(135deg,rgba(255,255,255,.14),rgba(255,255,255,.05))}',
        '.qd:hover .q' + (q + 1) + '{transform:scale(1.22);z-index:2;box-shadow:0 12px 26px -10px rgba(0,0,0,.75)}',
        '.qd .qs i{animation:qd-a' + v.i + ' var(--dur,' + D(v, 2.6) + 's) ease-in-out infinite;animation-delay:calc(var(--i,0) * var(--step,' + v.step + 's))}',
        '.qd .q2{--i:1}.qd .q3{--i:2}.qd .q4{--i:3}',
        kf('qd-a' + v.i, '0%,100%{filter:brightness(1)}50%{filter:brightness(1.22)}')
      ]),
      cfg: core(v, [range('Cycle', '--dur', .2, 20, .05, D(v, 2.6), 's'), col('Card A', '--c1', v.c1), col('Card B', '--c2', v.c2), col('Card C', '--c3', v.c3)])
    };
  } });

  /* 8. list rise — the rows lift and reveal arrows on hover */
  M.push({ key: 'listrise', title: 'List Rise', tags: ['card', 'list', 'hover'], build: function (v) {
    return {
      html: '<div class="cd2 lr2"><b class="tt">List Rise</b><div class="rl"><i class="r"><u>Alpha module</u><b class="ar">&rarr;</b></i><i class="r"><u>Beta module</u><b class="ar">&rarr;</b></i><i class="r"><u>Gamma module</u><b class="ar">&rarr;</b></i></div><s class="st">Hover to lift the rows</s></div>',
      css: join([
        cardBase(v),
        '.lr2 .rl{display:flex;flex-direction:column;gap:6px;margin:8px 0 6px}',
        '.lr2 .r{display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.06);border-radius:9px;padding:8px 11px;font:600 12px system-ui;color:#dcdcec;transition:transform .35s ease,background .35s ease,border-color .35s ease}',
        '.lr2 .r u{text-decoration:none}',
        '.lr2 .ar{color:var(--c3,' + v.c3 + ');opacity:0;transform:translateX(-6px);transition:all .35s ease}',
        '.lr2 .r:nth-child(2){transition-delay:.06s}.lr2 .r:nth-child(3){transition-delay:.12s}',
        '.lr2:hover .r{transform:translateX(7px);background:color-mix(in srgb,var(--c1,' + v.c1 + ') 14%,rgba(255,255,255,.05));border-color:color-mix(in srgb,var(--c2,' + v.c2 + ') 40%,transparent)}',
        '.lr2:hover .ar{opacity:1;transform:translateX(0)}',
        '.lr2{animation:lr2-a' + v.i + ' var(--dur,' + D(v, 2.8) + 's) ease-in-out infinite}',
        kf('lr2-a' + v.i, '0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}')
      ]),
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 206, 'px')])
    };
  } });

  /* 9. side drawer — a panel slides out from the card's edge */
  M.push({ key: 'sidedrawer', title: 'Side Drawer', tags: ['card', 'drawer', 'hover'], build: function (v) {
    return {
      html: '<div class="cd2 sd2"><div class="dr"><b class="hd">DETAILS</b><i></i><i></i><i></i></div><b class="tt">Drawer Card</b><s class="st">Hover to pull the panel</s><u class="ch">PULL</u></div>',
      css: join([
        cardBase(v),
        '.sd2 .dr{position:absolute;top:0;right:0;bottom:0;width:46%;border-radius:0 var(--rad,16px) var(--rad,16px) 0;background:linear-gradient(160deg,var(--c1,' + v.c1 + '),var(--c3,' + v.c3 + '));transform:translateX(101%);transition:transform .55s cubic-bezier(.5,0,.2,1);padding:14px;display:flex;flex-direction:column;gap:8px;justify-content:center}',
        '.sd2 .dr .hd{font:800 10px system-ui;letter-spacing:.14em;color:rgba(255,255,255,.85)}',
        '.sd2 .dr i{height:8px;border-radius:99px;background:rgba(255,255,255,.4)}',
        '.sd2 .dr i:nth-child(3){width:70%}.sd2 .dr i:nth-child(4){width:45%}',
        '.sd2:hover .dr{transform:translateX(0)}',
        '.sd2{animation:sd2-a' + v.i + ' var(--dur,' + D(v, 3) + 's) ease-in-out infinite}',
        kf('sd2-a' + v.i, '0%,100%{box-shadow:0 18px 34px -20px rgba(0,0,0,.8)}50%{box-shadow:0 20px 40px -16px color-mix(in srgb,var(--c1,' + v.c1 + ') 40%,rgba(0,0,0,.8))}')
      ]),
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 206, 'px')])
    };
  } });

  /* 10. flip x — the card flips around its vertical axis to a back */
  M.push({ key: 'flipx', title: 'Flip X', tags: ['card', 'flip', 'hover'], build: function (v) {
    return {
      html: '<div class="fx"><div class="face f1"><b class="tt">FRONT</b><s class="st">Hover to flip the card around</s><u class="ch">FLIP</u></div><div class="face f2"><b class="tt">BACK</b><s class="st">Secret side of the card</s><i class="pd"></i></div></div>',
      css: join([
        '.fx{width:var(--w,206px);height:150px;perspective:900px}',
        '.fx .face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:var(--rad,16px);padding:16px;background:rgba(13,13,23,.92);border:1px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 25%,rgba(255,255,255,.09));box-shadow:0 18px 34px -20px rgba(0,0,0,.8);display:flex;flex-direction:column;transition:transform .8s cubic-bezier(.5,0,.2,1)}',
        '.fx .f1{transform:rotateY(0)}',
        '.fx .f2{transform:rotateY(180deg);background:linear-gradient(140deg,var(--c1,' + v.c1 + '),var(--c3,' + v.c3 + '))}',
        '.fx:hover .f1{transform:rotateY(-180deg)}',
        '.fx:hover .f2{transform:rotateY(0)}',
        '.fx .tt{font:700 16px system-ui;color:#f2f2f8;margin:8px 0 4px}',
        '.fx .st{font:500 11.5px system-ui;color:rgba(230,230,244,.7)}',
        '.fx .ch{margin-top:auto;padding:6px 14px;align-self:flex-start;border-radius:99px;background:linear-gradient(135deg,var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '));font:700 11px system-ui;color:#fff}',
        '.fx .pd{margin-top:auto;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.25);animation:fx-a' + v.i + ' var(--dur,' + D(v, 1.6) + 's) ease-in-out infinite}',
        kf('fx-a' + v.i, '0%,100%{transform:scale(1)}50%{transform:scale(1.25)}')
      ]),
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 206, 'px'), range('Corner', '--rad', 8, 28, 1, 16, 'px')])
    };
  } });

  /* 11. magnetic icon — the icon is pulled toward the pointer */
  M.push({ key: 'magnetico', title: 'Magnetic Icon', tags: ['card', 'pointer', 'js'], build: function (v) {
    return {
      html: '<div class="cd2 mg2"><div class="ph"></div><div class="icw"><i class="ico"><u></u><u></u></i></div><b class="tt">Magnetic Icon</b><s class="st">The badge chases your pointer</s></div>',
      css: join([
        cardBase(v),
        '.mg2 .icw{position:absolute;top:44px;right:16px;width:44px;height:44px;display:grid;place-items:center}',
        '.mg2 .ico{width:38px;height:38px;border-radius:12px;background:linear-gradient(135deg,var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '));display:grid;place-items:center;transition:transform .25s cubic-bezier(.3,1.2,.4,1);box-shadow:0 10px 20px -10px rgba(0,0,0,.7)}',
        '.mg2 .ico u{width:12px;height:3px;border-radius:2px;background:#fff}',
        '.mg2 .ico u + u{transform:rotate(90deg)}',
        '.mg2 .ico{animation:mg2-a' + v.i + ' var(--dur,' + D(v, 2.2) + 's) ease-in-out infinite}',
        kf('mg2-a' + v.i, '0%,100%{transform:translate(0,0)}50%{transform:translate(0,-3px)}')
      ]),
      js: 'var c=root.querySelector(".cd2"),ico=c.querySelector(".ico");c.addEventListener("pointermove",function(e){var r=ico.getBoundingClientRect();if(!r.width)return;var cr=c.getBoundingClientRect();var x=(e.clientX-cr.left)-(r.left+r.width/2),y=(e.clientY-cr.top)-(r.top+r.height/2);var dist=Math.sqrt(x*x+y*y)||1,pull=Math.min(16,(200-dist)/14);if(pull<0)pull=0;ico.style.transform="translate("+(x/dist*pull)+"px,"+(y/dist*pull)+"px)";});c.addEventListener("pointerleave",function(){ico.style.transform="";});',
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 206, 'px')])
    };
  } });

  /* 12. border draw — an svg frame draws itself around the card */
  M.push({ key: 'borddraw', title: 'Border Draw', tags: ['card', 'border'], build: function (v) {
    return {
      html: '<div class="cd2 bd2"><svg class="fr" viewBox="0 0 206 150" preserveAspectRatio="none"><rect x="1.5" y="1.5" width="203" height="147" rx="15"/></svg><div class="ph"></div><b class="tt">Border Draw</b><s class="st">The frame draws itself</s><u class="ch">TRACE</u></div>',
      css: join([
        cardBase(v),
        '.bd2 .fr{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}',
        '.bd2 .fr rect{fill:none;stroke:var(--c3,' + v.c3 + ');stroke-width:2.5;stroke-linecap:round;stroke-dasharray:700;filter:drop-shadow(0 0 5px color-mix(in srgb,var(--c3,' + v.c3 + ') 70%,transparent));animation:bd2-a' + v.i + ' var(--dur,' + D(v, 3.4) + 's) ease-in-out infinite}',
        kf('bd2-a' + v.i, '0%{stroke-dashoffset:700;opacity:0}8%{opacity:1}55%{stroke-dashoffset:0;opacity:1}78%{stroke-dashoffset:0;opacity:.4}100%{stroke-dashoffset:700;opacity:0}')
      ]),
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 206, 'px')])
    };
  } });

  /* 13. orbit icon — a badge rides the card's rim */
  M.push({ key: 'orbitico', title: 'Orbit Icon', tags: ['card', 'orbit'], build: function (v) {
    var d = D(v, 5);
    return {
      html: '<div class="cd2 oi2"><i class="orb"><b class="ob2"></b></i><div class="ph"></div><b class="tt">Orbit Icon</b><s class="st">The badge circles the card</s></div>',
      css: join([
        cardBase(v),
        '.oi2{overflow:visible}',
        '.oi2 .orb{position:absolute;left:50%;top:50%;width:0;height:0;animation:oi2-a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.oi2 .ob2{position:absolute;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:9px;background:linear-gradient(135deg,var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '));box-shadow:0 8px 16px -8px rgba(0,0,0,.8);animation:oi2-b' + v.i + ' var(--dur,' + d + 's) linear infinite reverse}',
        '.oi2 .ob2::after{content:"";position:absolute;left:9px;top:9px;width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.85)}',
        kf('oi2-a' + v.i, 'from{transform:rotate(0) translateX(var(--or,120px))}to{transform:rotate(1turn) translateX(var(--or,120px))}'),
        kf('oi2-b' + v.i, 'from{transform:rotate(0)}to{transform:rotate(-1turn)}')
      ]),
      cfg: core(v, [range('Orbit', '--or', 70, 170, 2, 120, 'px')])
    };
  } });

  /* 14. tag float — the tags bob gently in and out of place */
  M.push({ key: 'tagfloat', title: 'Tag Float', tags: ['card', 'float'], build: function (v) {
    return {
      html: '<div class="cd2 tg2"><div class="ph"></div><b class="tt">Tag Float</b><div class="tgs"><i class="t1">design</i><i class="t2">motion</i><i class="t3">lab</i></div><s class="st">Tags drift in zero gravity</s></div>',
      css: join([
        cardBase(v),
        '.tg2 .tgs{display:flex;gap:6px;flex-wrap:wrap;margin:9px 0 6px}',
        '.tg2 .tgs i{padding:5px 10px;border-radius:99px;font:600 10.5px system-ui;color:#fff;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));animation:tg2-a' + v.i + ' var(--dur,' + D(v, 2.6) + 's) ease-in-out infinite}',
        '.tg2 .t2{animation-delay:calc(var(--dur,' + D(v, 2.6) + 's) / -3);background:linear-gradient(135deg,var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '))}',
        '.tg2 .t3{animation-delay:calc(var(--dur,' + D(v, 2.6) + 's) / -1.5);background:linear-gradient(135deg,var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '))}',
        kf('tg2-a' + v.i, '0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-5px) rotate(2deg)}')
      ]),
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 206, 'px')])
    };
  } });

  /* 15. count sweep — a number counts up while the bar sweeps */
  M.push({ key: 'countsweep', title: 'Count Sweep', tags: ['card', 'counter', 'js'], build: function (v) {
    return {
      html: '<div class="cd2 cs2"><div class="num"><b class="n">0</b><s>%</s></div><div class="bar"><i class="fl2"></i></div><b class="tt">Count Sweep</b><s class="st">The meter climbs, then resets</s></div>',
      css: join([
        cardBase(v),
        '.cs2 .num{display:flex;align-items:baseline;gap:3px;margin:4px 0 8px}',
        '.cs2 .num .n{font:800 40px/1 ui-monospace,monospace;color:var(--c1,' + v.c1 + ');min-width:2ch;text-align:right}',
        '.cs2 .num s{font:700 15px ui-monospace,monospace;color:var(--c2,' + v.c2 + ');text-decoration:none}',
        '.cs2 .bar{height:9px;border-radius:99px;background:rgba(255,255,255,.09);overflow:hidden}',
        '.cs2 .fl2{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '))}',
        '.cs2{animation:cs2-a' + v.i + ' var(--dur,' + D(v, 3) + 's) ease-in-out infinite}',
        kf('cs2-a' + v.i, '0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}')
      ]),
      js: 'var n=root.querySelector(".cs2 .n"),fl=root.querySelector(".cs2 .fl2"),acc=0,cyc=4.2;api.raf(function(){acc+=.016;if(acc>cyc)acc=0;var p=acc/cyc,ease=1-Math.pow(1-p,3);n.textContent=Math.round(ease*100);fl.style.transform="scaleX("+ease+")";fl.style.transformOrigin="0 50%";});',
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 206, 'px')])
    };
  } });

  /* 16. split view — the card is a diptych that re-splits on hover */
  M.push({ key: 'splitview', title: 'Split View', tags: ['card', 'split', 'hover'], build: function (v) {
    return {
      html: '<div class="cd2 sv2"><div class="sv"><i class="pa">A</i><i class="dv"></i><i class="pb">B</i></div><b class="tt">Split View</b><s class="st">Hover to shift the divider</s></div>',
      css: join([
        cardBase(v),
        '.sv2 .sv{display:flex;height:92px;border-radius:10px;overflow:hidden}',
        '.sv2 .pa{flex:0 0 50%;display:grid;place-items:center;font:800 20px system-ui;color:rgba(255,255,255,.92);background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transition:flex-basis .6s cubic-bezier(.5,0,.2,1)}',
        '.sv2 .pb{flex:1;display:grid;place-items:center;font:800 20px system-ui;color:rgba(255,255,255,.92);background:linear-gradient(135deg,var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '))}',
        '.sv2 .dv{width:3px;background:rgba(255,255,255,.65);box-shadow:0 0 10px rgba(255,255,255,.5)}',
        '.sv2:hover .pa{flex-basis:' + (68 + (v.i % 4) * 4) + '%}',
        '.sv2 .pa{animation:sv2-a' + v.i + ' var(--dur,' + D(v, 3) + 's) ease-in-out infinite}',
        kf('sv2-a' + v.i, '0%,100%{filter:brightness(1)}50%{filter:brightness(1.18)}')
      ]),
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 206, 'px')])
    };
  } });

  /* 17. lid open — a 3D lid opens the card like a box */
  M.push({ key: 'lidopen', title: 'Lid Open', tags: ['card', '3d'], build: function (v) {
    var d = D(v, 3.2);
    return {
      html: '<div class="cd2 lo2"><i class="lid"><b>LID</b></i><div class="in"><i></i><i></i><i></i></div><b class="tt">Lid Open</b><s class="st">The top flips on its hinge</s></div>',
      css: join([
        cardBase(v),
        '.lo2{perspective:600px}',
        '.lo2 .ph{background:rgba(255,255,255,.06)}',
        '.lo2 .lid{position:absolute;top:13px;left:13px;right:13px;height:72px;border-radius:10px;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));transform-origin:50% 0;display:grid;place-items:center;transition:none;animation:lo2-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.6,0,.2,1) infinite;backface-visibility:hidden}',
        '.lo2 .lid b{font:800 11px system-ui;letter-spacing:.2em;color:rgba(255,255,255,.85)}',
        '.lo2 .in{position:absolute;top:13px;left:13px;right:13px;height:72px;border-radius:10px;background:rgba(8,8,14,.9);display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:8px}',
        '.lo2 .in i{border-radius:6px;background:linear-gradient(180deg,var(--c3,' + v.c3 + '),color-mix(in srgb,var(--c3,' + v.c3 + ') 40%,#000));transform:scaleY(0);transform-origin:50% 100%;animation:lo2-b' + v.i + ' var(--dur,' + d + 's) ease-out infinite;animation-delay:calc(var(--i) * .12s)}',
        '.lo2 .in i:nth-child(2){--i:1}.lo2 .in i:nth-child(3){--i:2}',
        kf('lo2-a' + v.i, '0%,18%{transform:rotateX(0)}45%,62%{transform:rotateX(-108deg)}88%,100%{transform:rotateX(0)}'),
        kf('lo2-b' + v.i, '0%,30%{transform:scaleY(0)}50%,78%{transform:scaleY(1)}95%,100%{transform:scaleY(0)}')
      ]),
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 206, 'px')])
    };
  } });

  /* 18. ping card — the avatar pings like a live status */
  M.push({ key: 'pingcard', title: 'Ping Card', tags: ['card', 'pulse'], build: function (v) {
    var d = D(v, 2);
    return {
      html: '<div class="cd2 pg2"><div class="av"><i class="pg"></i><i class="pg"></i><b class="avb">ML</b><u class="on"></u></div><b class="tt">Live Status</b><s class="st">Pinging from the avatar</s><u class="ch">ONLINE</u></div>',
      css: join([
        cardBase(v),
        '.pg2 .av{position:relative;width:52px;height:52px;margin-bottom:9px}',
        '.pg2 .avb{position:absolute;inset:0;border-radius:50%;display:grid;place-items:center;font:800 15px system-ui;color:#fff;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '))}',
        '.pg2 .pg{position:absolute;inset:0;border:2px solid var(--c3,' + v.c3 + ');border-radius:50%;opacity:0;animation:pg2-a' + v.i + ' var(--dur,' + d + 's) ease-out infinite}',
        '.pg2 .pg:nth-of-type(2){animation-delay:calc(var(--dur,' + d + 's) / -2)}',
        '.pg2 .on{position:absolute;right:1px;bottom:1px;width:12px;height:12px;border-radius:50%;background:#3ddc84;border:2px solid rgba(13,13,23,.95);animation:pg2-b' + v.i + ' calc(var(--dur,' + d + 's) * 1.4) ease-in-out infinite}',
        kf('pg2-a' + v.i, '0%{transform:scale(.9);opacity:.8}70%,100%{transform:scale(1.7);opacity:0}'),
        kf('pg2-b' + v.i, '0%,100%{transform:scale(1)}50%{transform:scale(1.25)}')
      ]),
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 206, 'px')])
    };
  } });

  /* 19. type caption — the caption types itself in a loop */
  M.push({ key: 'typecaption', title: 'Type Caption', tags: ['card', 'typewriter', 'js'], build: function (v) {
    var w = ['ships motion', 'zero deps', 'pure css', 'tune it all'][v.i % 4];
    return {
      html: '<div class="cd2 tc2"><div class="ph"></div><b class="tt">Typed Card</b><s class="st"><i class="cap"></i><u class="ccr"></u></s></div>',
      css: join([
        cardBase(v),
        '.tc2 .cap{font:600 12px ui-monospace,monospace;color:var(--c3,' + v.c3 + ')}',
        '.tc2 .ccr{display:inline-block;width:6px;height:10px;background:var(--c3,' + v.c3 + ');margin-left:2px;vertical-align:-1px;animation:tc2-a' + v.i + ' calc(var(--dur,' + D(v, 3) + 's) / 9) steps(2,jump-none) infinite}',
        kf('tc2-a' + v.i, '0%,100%{opacity:1}50%{opacity:0}')
      ]),
      js: 'var el=root.querySelector(".tc2 .cap"),W="' + w + '",t=0,hold=0;api.raf(function(){t+=.016;if(hold>0){hold-=.016;if(hold>0)return}var total=W.length;if(t>=total+2.2){t=0;el.textContent="";return}el.textContent=W.slice(0,Math.min(total,Math.floor(t/.11)+1));});',
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 206, 'px')])
    };
  } });

  /* 20. focus zoom — the photo zooms toward the pointer */
  M.push({ key: 'focuszoom', title: 'Focus Zoom', tags: ['card', 'zoom', 'js'], build: function (v) {
    return {
      html: '<div class="cd2 fz2"><div class="phz"><i class="im"></i></div><b class="tt">Focus Zoom</b><s class="st">Hover — the image dives under the cursor</s><u class="ch">DIVE</u></div>',
      css: join([
        cardBase(v),
        '.fz2 .phz{height:var(--ph,84px);border-radius:10px;overflow:hidden;position:relative}',
        '.fz2 .im{position:absolute;inset:-12%;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '));background-size:160% 160%;transition:transform .5s cubic-bezier(.4,0,.2,1);animation:fz2-a' + v.i + ' var(--dur,' + D(v, 4) + 's) ease-in-out infinite}',
        '.fz2:hover .im{transform:scale(1.45)}',
        kf('fz2-a' + v.i, '0%,100%{background-position:0% 50%}50%{background-position:100% 50%}')
      ]),
      js: 'var c=root.querySelector(".fz2"),im=c.querySelector(".im");c.addEventListener("pointermove",function(e){var r=c.querySelector(".phz").getBoundingClientRect();if(!r.width||!r.height)return;im.style.transformOrigin=((e.clientX-r.left)/r.width*100)+"% "+((e.clientY-r.top)/r.height*100)+"%";});',
      cfg: core(v, [range('Photo height', '--ph', 56, 120, 2, 84, 'px')])
    };
  } });

  /* 21. check cascade — the tasks tick themselves one by one */
  M.push({ key: 'checkcasc', title: 'Check Cascade', tags: ['card', 'list'], build: function (v) {
    var d = D(v, 3);
    return {
      html: '<div class="cd2 ck2"><b class="tt">Check Cascade</b><div class="tk"><i><svg class="ck" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/><path d="M6,10.5 L9,13.5 L14.5,7"/></svg><u>Design</u></i><i><svg class="ck" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/><path d="M6,10.5 L9,13.5 L14.5,7"/></svg><u>Motion</u></i><i><svg class="ck" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/><path d="M6,10.5 L9,13.5 L14.5,7"/></svg><u>Ship</u></i></div><s class="st">Tasks tick in sequence</s></div>',
      css: join([
        cardBase(v),
        '.ck2 .tk{display:flex;flex-direction:column;gap:7px;margin:8px 0 6px}',
        '.ck2 .tk i{display:flex;align-items:center;gap:9px;font:600 12px system-ui;color:#dcdcec}',
        '.ck2 .tk i u{text-decoration:none}',
        '.ck2 .ck{width:19px;height:19px;flex:0 0 auto}',
        '.ck2 .ck circle{fill:none;stroke:var(--c2,' + v.c2 + ');stroke-width:1.8;stroke-dasharray:51;animation:ck2-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * 2)}',
        '.ck2 .ck path{fill:none;stroke:var(--c3,' + v.c3 + ');stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:16;animation:ck2-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * 2)}',
        '.ck2 .tk i:nth-child(2){--i:1}.ck2 .tk i:nth-child(3){--i:2}',
        kf('ck2-a' + v.i, '0%,10%{stroke-dashoffset:51;opacity:.35}35%,80%{stroke-dashoffset:0;opacity:1}95%,100%{stroke-dashoffset:51;opacity:.35}'),
        kf('ck2-b' + v.i, '0%,26%{stroke-dashoffset:16}44%,80%{stroke-dashoffset:0}95%,100%{stroke-dashoffset:16}45%{stroke-dashoffset:16}')
      ]),
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 206, 'px')])
    };
  } });

  K.add('cards', V.matrix('cards', M, 24, 'w5c'));
})(window);
