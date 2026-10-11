/* ============================================================
   Motion Lab — wave 5, MOTION (the 1,000-effect expansion)
   21 new mechanic families × 24 variants = 504 candidates.
   Cursor-tracking, spring, and physics behaviors — many new
   to the collection; variants differ in geometry, rhythm,
   easing and palette. House rule: custom properties are only
   ever read with a fallback, never declared in demo CSS.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit, V = global.MLVary;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color;

  function D(v, mul) { return Math.round(v.dur * (mul || 1) * 100) / 100; }
  function core(v, extra) {
    return [
      range('Cycle', '--dur', .2, 20, .05, D(v, 1), 's'),
      range('Stagger', '--step', 0, .6, .01, v.step, 's'),
      col('Trail A', '--c1', v.c1),
      col('Trail B', '--c2', v.c2),
      col('Trail C', '--c3', v.c3)
    ].concat(extra || []);
  }
  function stageCss(v, extra) {
    return '.mt5{position:relative;width:100%;height:100%;overflow:hidden;background:radial-gradient(ellipse at 50% 120%,color-mix(in srgb,var(--c1,' + v.c1 + ') 10%,transparent),transparent 60%);' + (extra || '') + '}';
  }
  /* shared pointer tracker: follows the pointer, else an auto lissajous */
  function ptrJS(prefix) {
    return 'var P={x:.5,y:.5,lx:.5,ly:.5,has:false},t=0;' +
      'function auto(){t+=.016;P.x=.5+Math.sin(t*.7)*.34;P.y=.5+Math.sin(t*1.3+1.2)*.26;}' +
      'root.addEventListener("pointermove",function(e){var r=root.getBoundingClientRect();if(!r.width||!r.height)return;P.x=(e.clientX-r.left)/r.width;P.y=(e.clientY-r.top)/r.height;P.has=true;});';
  }

  var M = [];

  /* 1. shockwave — the cursor detonates expanding rings */
  M.push({ key: 'shockwave', title: 'Shockwave Rings', tags: ['motion', 'cursor', 'js'], build: function (v) {
    return {
      html: '<div class="mt5"><i class="rw"></i><i class="rw"></i><i class="rw"></i><i class="rw"></i></div>',
      css: join([
        stageCss(v),
        '.rw{position:absolute;left:50%;top:50%;width:var(--sz,44px);height:var(--sz,44px);margin:calc(var(--sz,44px)/-2);border-radius:50%;border:2px solid var(--c1,' + v.c1 + ');opacity:0;pointer-events:none;animation:rw-idle' + v.i + ' var(--dur,1.1s) ease-in-out infinite}',
        kf('rw-idle' + v.i, '0%,100%{box-shadow:none}50%{box-shadow:0 0 12px -6px var(--c1,' + v.c1 + ')}')
      ]),
      js: (function (vv) {
        var base = 'var rings=root.querySelectorAll(".rw"),t=0,beat=0;api.raf(function(){t+=.016;if(!rings.length)return;';
        base += 'var per=1.1;if(t>=per){t-=per;beat++;for(var i=0;i<rings.length;i++){(function(r,dl){setTimeout(function(){if(r.animate)r.animate([{transform:"scale(.2)",opacity:.95},{transform:"scale(4)",opacity:0}],{duration:1100,easing:"cubic-bezier(.2,.6,.3,1)"});},dl);})(rings[i],i*180);}}';
        base += 'for(var i=0;i<rings.length;i++){var r=rings[i];r.style.transform="translate(" + (P.x*100) + "%," + (P.y*100) + "%)";}});';
        return ptrJS('sw') + base;
      })(v),
      cfg: core(v, [range('Ring size', '--sz', 24, 80, 2, 44, 'px')])
    };
  } });

  /* 2. attractor — the dot field leans into the cursor */
  M.push({ key: 'attractor', title: 'Attractor Field', tags: ['motion', 'cursor', 'js'], build: function (v) {
    var dots = '', i = 0;
    for (var gx = 0; gx < 8; gx++) for (var gy = 0; gy < 5; gy++) dots += '<i style="--x:' + (gx * 12.5).toFixed(1) + '%;--y:' + gy * 25 + '%"></i>';
    return {
      html: '<div class="mt5"><div class="at">' + dots + '</div></div>',
      css: join([
        stageCss(v),
        '.at{position:absolute;inset:14%}',
        '.at i{position:absolute;left:var(--x,0%);top:var(--y,0%);width:7px;height:7px;margin:-3.5px;border-radius:50%;background:var(--c3,' + v.c3 + ');transition:transform .35s cubic-bezier(.2,.9,.3,1.2),background .35s}'
      ]),
      js: ptrJS('at') + 'var dots=root.querySelectorAll(".at i");api.raf(function(){for(var i=0;i<dots.length;i++){var el=dots[i];var lx=(i%8+0.5)/8,ly=(Math.floor(i/8)+0.5)/5;var dx=P.x-lx,dy=P.y-ly,dist=Math.sqrt(dx*dx+dy*dy);var f=Math.max(0,1-dist*1.8);el.style.transform="translate(" + (dx*90*f) + "%," + (dy*90*f) + "%) scale(" + (1+f*.8) + ")";el.style.background=f>.4?"var(--c1,' + v.c1 + ')":"";}});',
      cfg: core(v)
    };
  } });

  /* 3. magnet dots — a tight grid stretches toward the pointer like iron filings */
  M.push({ key: 'magnetdots', title: 'Magnet Dots', tags: ['motion', 'cursor', 'js'], build: function (v) {
    var dots = '', i = 0;
    for (var gx = 0; gx < 9; gx++) for (var gy = 0; gy < 6; gy++) dots += '<i style="--x:' + (gx * 11.11).toFixed(1) + '%;--y:' + (gy * 18.18).toFixed(1) + '%"></i>';
    return {
      html: '<div class="mt5"><div class="md">' + dots + '</div></div>',
      css: join([
        stageCss(v),
        '.md{position:absolute;inset:16%}',
        '.md i{position:absolute;left:var(--x,0%);top:var(--y,0%);width:5px;height:5px;margin:-2.5px;border-radius:50%;background:var(--c2,' + v.c2 + ');transition:transform .2s ease-out,background .2s,width .2s,height .2s}'
      ]),
      js: ptrJS('md') + 'var dots=root.querySelectorAll(".md i");api.raf(function(){for(var i=0;i<dots.length;i++){var el=dots[i];var lx=(i%9+0.5)/9,ly=(Math.floor(i/9)+0.5)/6;var dx=P.x-lx,dy=P.y-ly,dist=Math.sqrt(dx*dx+dy*dy);var f=Math.max(0,1-dist*1.6);el.style.transform="translate(" + (dx*120*f) + "%," + (dy*120*f) + "%)";el.style.background=f>.5?"var(--c1,' + v.c1 + ')":"";}});',
      cfg: core(v)
    };
  } });

  /* 4. slot drop — the ball falls into the sliding gate on every cycle */
  M.push({ key: 'slotdrop', title: 'Slot Drop', tags: ['motion', 'timing'], build: function (v) {
    var d = D(v, 2.4);
    return {
      html: '<div class="mt5"><div class="sl"><i class="gate"></i><i class="ball"></i><i class="floor"></i></div></div>',
      css: join([
        stageCss(v),
        '.sl{position:relative;width:var(--w,170px);height:var(--h,130px);background:rgba(10,10,18,.55);border:1px solid rgba(255,255,255,.1);border-radius:10px}',
        '.sl .gate{position:absolute;top:58%;width:30px;height:7px;border-radius:4px;background:var(--c2,' + v.c2 + ');box-shadow:0 0 10px color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,transparent);animation:sd-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.sl .ball{position:absolute;top:8%;left:50%;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 12px var(--c3,' + v.c3 + ');animation:sd-b' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.5,0,.9,.6) infinite}',
        '.sl .floor{position:absolute;left:10%;right:10%;bottom:12%;height:5px;border-radius:4px;background:rgba(255,255,255,.14)}',
        kf('sd-a' + v.i, '0%,100%{left:12%}40%,62%{left:56%}'),
        kf('sd-b' + v.i, '0%,38%{top:8%;opacity:1}50%{top:74%;opacity:1}58%{top:70%;opacity:1}66%{top:74%;opacity:1}74%,100%{top:8%;opacity:0}')
      ]),
      cfg: core(v, [range('Width', '--w', 130, 220, 2, 170, 'px'), range('Height', '--h', 100, 160, 2, 130, 'px')])
    };
  } });

  /* 5. flick inertia — the puck slides, stops, and flicks again */
  M.push({ key: 'flickinertia', title: 'Flick Inertia', tags: ['motion', 'flick'], build: function (v) {
    var d = D(v, 2.2);
    return {
      html: '<div class="mt5"><div class="fk"><i class="puck"></i><i class="trail"></i></div></div>',
      css: join([
        stageCss(v),
        '.fk{position:relative;width:var(--w,200px);height:60px}',
        '.fk .trail{position:absolute;top:50%;left:0;width:100%;height:3px;margin-top:-1.5px;border-radius:99px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--c2,' + v.c2 + ') 55%,transparent));transform-origin:0 50%;animation:fk-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.16,1,.3,1) infinite}',
        '.fk .puck{position:absolute;top:50%;left:0;width:18px;height:18px;margin-top:-9px;border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 14px color-mix(in srgb,var(--c3,' + v.c3 + ') 75%,transparent);animation:fk-b' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.16,1,.3,1) infinite}',
        kf('fk-a' + v.i, '0%{transform:scaleX(0)}12%{transform:scaleX(1)}55%,100%{transform:scaleX(1);opacity:0}'),
        kf('fk-b' + v.i, '0%{left:0}40%{left:calc(100% - 18px)}60%,92%{left:calc(100% - 18px)}100%{left:0}')
      ]),
      cfg: core(v, [range('Width', '--w', 140, 260, 2, 200, 'px')])
    };
  } });

  /* 6. ball clash — two balls bounce and trade momentum at the center */
  M.push({ key: 'ballclash', title: 'Ball Clash', tags: ['motion', 'bounce'], build: function (v) {
    var d = D(v, 1.8);
    return {
      html: '<div class="mt5"><div class="bc"><i class="b1"></i><i class="b2"></i><i class="spark"></i></div></div>',
      css: join([
        stageCss(v),
        '.bc{position:relative;width:var(--w,200px);height:var(--h,70px);border-radius:10px;background:rgba(10,10,18,.55);border:1px solid rgba(255,255,255,.1)}',
        '.bc i{position:absolute;top:50%;width:16px;height:16px;margin-top:-8px;border-radius:50%}',
        '.b1{background:var(--c1,' + v.c1 + ');box-shadow:0 0 12px color-mix(in srgb,var(--c1,' + v.c1 + ') 70%,transparent);animation:bc-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.6,0,.4,1) infinite}',
        '.b2{background:var(--c2,' + v.c2 + ');box-shadow:0 0 12px color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,transparent);animation:bc-b' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.6,0,.4,1) infinite}',
        '.spark{left:50%;top:50%;width:26px;height:26px;margin:-13px;border-radius:50%;background:radial-gradient(circle,var(--c3,' + v.c3 + ') 0 20%,transparent 65%);opacity:0;animation:bc-c' + v.i + ' var(--dur,' + d + 's) ease-out infinite}',
        kf('bc-a' + v.i, '0%{left:4%;transform:scale(1)}48%{left:42%;transform:scale(1.15)}52%{left:42%;transform:scale(.9)}100%{left:4%;transform:scale(1)}'),
        kf('bc-b' + v.i, '0%{left:80%;transform:scale(1)}48%{left:54%;transform:scale(1.15)}52%{left:54%;transform:scale(.9)}100%{left:80%;transform:scale(1)}'),
        kf('bc-c' + v.i, '0%,47%{opacity:0;transform:scale(.3)}52%{opacity:1;transform:scale(1)}70%,100%{opacity:0;transform:scale(2)}')
      ]),
      cfg: core(v, [range('Width', '--w', 150, 260, 2, 200, 'px'), range('Height', '--h', 50, 100, 2, 70, 'px')])
    };
  } });

  /* 7. letter push — the word shuffles as a wave pushes each glyph */
  M.push({ key: 'letterpush', title: 'Letter Push', tags: ['motion', 'type'], build: function (v) {
    var d = D(v, 2.8), W = 'PUSH', chars = '';
    for (var i = 0; i < W.length; i++) chars += '<i style="--i:' + i + '">' + W[i] + '</i>';
    return {
      html: '<div class="mt5"><div class="lp">' + chars + '</div></div>',
      css: join([
        stageCss(v),
        '.lp{display:flex;gap:6px}',
        '.lp i{display:block;width:44px;height:52px;border-radius:8px;background:linear-gradient(160deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 65%,#fff),color-mix(in srgb,var(--c2,' + v.c2 + ') 65%,#fff));display:grid;place-items:center;font:800 24px system-ui;color:rgba(255,255,255,.95);box-shadow:0 10px 18px -8px rgba(0,0,0,.5);animation:lp-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.5,1.6,.4,1) infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -5)}',
        kf('lp-a' + v.i, '0%,55%,100%{transform:translateY(0) rotate(0)}25%{transform:translateY(-14px) rotate(-6deg)}35%{transform:translateY(2px) rotate(1deg)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 8. hover ring — a cursor halo orbits its dot with a dashed tether */
  M.push({ key: 'hoverring', title: 'Hover Ring', tags: ['motion', 'cursor'], build: function (v) {
    var d = D(v, 2.6);
    return {
      html: '<div class="mt5"><div class="hr"><i class="orbit"></i><i class="halo"></i><i class="dot"></i></div></div>',
      css: join([
        stageCss(v),
        '.hr{position:relative;width:110px;height:110px;animation:hr-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite alternate}',
        '.hr .dot{position:absolute;left:50%;top:50%;width:10px;height:10px;margin:-5px;border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 12px var(--c3,' + v.c3 + ')}',
        '.hr .orbit{position:absolute;inset:0;border-radius:50%;border:2px dashed color-mix(in srgb,var(--c1,' + v.c1 + ') 70%,transparent);animation:hr-b' + v.i + ' calc(var(--dur,' + d + 's)/2) linear infinite}',
        '.hr .halo{position:absolute;inset:22%;border-radius:50%;background:radial-gradient(circle,transparent 55%,color-mix(in srgb,var(--c2,' + v.c2 + ') 45%,transparent) 70%,transparent 85%);animation:hr-c' + v.i + ' calc(var(--dur,' + d + 's)/4) ease-in-out infinite}',
        kf('hr-a' + v.i, 'from{transform:translate(-34px,-20px)}to{transform:translate(34px,20px)}'),
        kf('hr-b' + v.i, 'to{transform:rotate(1turn)}'),
        kf('hr-c' + v.i, '0%,100%{transform:scale(.8);opacity:.5}50%{transform:scale(1.15);opacity:1}')
      ]),
      cfg: core(v)
    };
  } });

  /* 9. snap board — the tile docks to each corner in sequence */
  M.push({ key: 'snapboard', title: 'Snap Board', tags: ['motion', 'snap'], build: function (v) {
    var d = D(v, 3.2);
    return {
      html: '<div class="mt5"><div class="sb2"><i class="tile"></i><b class="d1"></b><b class="d2"></b><b class="d3"></b><b class="d4"></b></div></div>',
      css: join([
        stageCss(v),
        '.sb2{position:relative;width:var(--w,190px);height:var(--h,130px)}',
        '.sb2 .tile{position:absolute;width:44px;height:44px;border-radius:9px;background:linear-gradient(150deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));box-shadow:0 12px 20px -8px rgba(0,0,0,.6);animation:sb2-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.7,-.2,.3,1.3) infinite}',
        '.sb2 b{position:absolute;width:12px;height:12px;border-radius:4px;background:rgba(255,255,255,.16)}',
        '.d1{left:6px;top:6px}.d2{right:6px;top:6px}.d3{left:6px;bottom:6px}.d4{right:6px;bottom:6px}',
        kf('sb2-a' + v.i, '0%,20%{left:6px;top:6px;transform:rotate(0)}30%,48%{left:140px;top:6px;transform:rotate(90deg)}58%,76%{left:140px;top:80px;transform:rotate(180deg)}86%,100%{left:6px;top:80px;transform:rotate(270deg)}')
      ]),
      cfg: core(v, [range('Width', '--w', 150, 240, 2, 190, 'px'), range('Height', '--h', 100, 170, 2, 130, 'px')])
    };
  } });

  /* 10. heat trail — a heat map smears behind a roaming hot point */
  M.push({ key: 'heattrail', title: 'Heat Trail', tags: ['motion', 'canvas', 'js'], build: function (v) {
    return {
      html: '<div class="mt5"><canvas class="cv" width="300" height="170"></canvas></div>',
      css: join([
        stageCss(v),
        '.mt5 .cv{width:100%;height:100%;display:block;animation:ht-vig' + v.i + ' var(--dur,3s) ease-in-out infinite}',
        kf('ht-vig' + v.i, '0%,100%{filter:brightness(.96)}50%{filter:brightness(1.06)}')
      ]),
      js: 'var c=root.querySelector(".cv"),g=c.getContext&&c.getContext("2d");if(!g)return;var W=300,H=170,t=0;api.raf(function(){t+=.016;g.fillStyle="rgba(4,4,10,.16)";g.fillRect(0,0,W,H);var x=W/2+Math.sin(t*.9)*W*.38+Math.sin(t*2.3)*14,y=H/2+Math.sin(t*1.4+1)*H*.33;var r=13;var gr=g.createRadialGradient(x,y,1,x,y,r);gr.addColorStop(0,"rgba(255,80,120,.9)");gr.addColorStop(.5,"rgba(255,150,60,.35)");gr.addColorStop(1,"rgba(255,150,60,0)");g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,6.283);g.fill();});',
      cfg: core(v)
    };
  } });

  /* 11. sticker drag — the sticker wobbles while a hand peels and re-sticks it */
  M.push({ key: 'stickerdrag', title: 'Sticker Drag', tags: ['motion', 'drag'], build: function (v) {
    var d = D(v, 3.6);
    return {
      html: '<div class="mt5"><div class="sd2"><i class="stick"></i><i class="hand"></i></div></div>',
      css: join([
        stageCss(v),
        '.sd2{position:relative;width:150px;height:130px}',
        '.sd2 .stick{position:absolute;left:34px;top:22px;width:64px;height:64px;border-radius:12px;background:linear-gradient(150deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));box-shadow:0 10px 16px -6px rgba(0,0,0,.5);display:grid;place-items:center;font-size:28px;animation:sd2-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.sd2 .stick::after{content:"";position:absolute;inset:0;border-radius:12px;background:radial-gradient(circle at 30% 25%,rgba(255,255,255,.45),transparent 55%)}',
        '.sd2 .hand{position:absolute;left:90px;top:64px;width:26px;height:34px;border-radius:10px 10px 14px 14px;background:rgba(230,230,245,.9);box-shadow:0 6px 10px rgba(0,0,0,.35);animation:sd2-b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('sd2-a' + v.i, '0%,20%{transform:rotate(-3deg)}40%,55%{transform:translate(18px,-26px) rotate(14deg)}75%,90%{transform:translate(2px,-4px) rotate(-8deg)}100%{transform:rotate(-3deg)}'),
        kf('sd2-b' + v.i, '0%,22%{transform:translate(0,0)}42%,58%{transform:translate(-40px,-26px)}80%,100%{transform:translate(0,0)}')
      ]),
      cfg: core(v)
    };
  } });

  /* 12. spin wheel — the prize wheel spins up and the ball orbits */
  M.push({ key: 'spinwheel', title: 'Spin Wheel', tags: ['motion', 'wheel'], build: function (v) {
    var d = D(v, 4.4);
    return {
      html: '<div class="mt5"><div class="sw2"><i class="face"></i><b class="pin"></b><i class="orb"><u></u></i></div></div>',
      css: join([
        stageCss(v),
        '.sw2{position:relative;width:var(--sz,110px);height:var(--sz,110px)}',
        '.sw2 .face{position:absolute;inset:8%;border-radius:50%;background:conic-gradient(var(--c1,' + v.c1 + ') 0 60deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,#fff) 60deg 120deg,var(--c1,' + v.c1 + ') 120deg 180deg,color-mix(in srgb,var(--c3,' + v.c3 + ') 70%,#fff) 180deg 240deg,var(--c1,' + v.c1 + ') 240deg 300deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,#fff) 300deg 1turn);border:3px solid rgba(255,255,255,.7);animation:sw2-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.15,.85,.25,1) infinite}',
        '.sw2 .pin{position:absolute;left:50%;top:-4px;width:10px;height:14px;margin-left:-5px;border-radius:3px 3px 6px 6px;background:var(--c3,' + v.c3 + ')}',
        '.sw2 .orb{position:absolute;inset:0;animation:sw2-b' + v.i + ' calc(var(--dur,' + d + 's)/3) linear infinite}',
        '.sw2 .orb u{position:absolute;left:50%;top:0;width:8px;height:8px;margin-left:-4px;border-radius:50%;background:#fff;box-shadow:0 0 8px rgba(255,255,255,.9)}',
        kf('sw2-a' + v.i, '0%{transform:rotate(0)}100%{transform:rotate(1080deg)}'),
        kf('sw2-b' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 70, 150, 2, 110, 'px')])
    };
  } });

  /* 13. swipe zones — the card swipes right, resets, swipes left */
  M.push({ key: 'swipezones', title: 'Swipe Zones', tags: ['motion', 'swipe'], build: function (v) {
    var d = D(v, 3.4);
    return {
      html: '<div class="mt5"><div class="swz"><i class="zr"></i><i class="zl"></i><b class="card"></b></div></div>',
      css: join([
        stageCss(v),
        '.swz{position:relative;width:var(--w,190px);height:var(--h,120px)}',
        '.swz .zr{position:absolute;right:0;top:0;bottom:0;width:34%;border-radius:0 10px 10px 0;background:color-mix(in srgb,var(--c1,' + v.c1 + ') 18%,transparent);opacity:.5}',
        '.swz .zl{position:absolute;left:0;top:0;bottom:0;width:34%;border-radius:10px 0 0 10px;background:color-mix(in srgb,var(--c2,' + v.c2 + ') 18%,transparent);opacity:.5}',
        '.swz .card{position:absolute;left:50%;top:12%;width:58px;height:76px;margin-left:-29px;border-radius:9px;background:linear-gradient(160deg,color-mix(in srgb,var(--c3,' + v.c3 + ') 55%,#fff),var(--c3,' + v.c3 + '));box-shadow:0 12px 20px -8px rgba(0,0,0,.55);animation:swz-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.4,1.3,.5,1) infinite}',
        kf('swz-a' + v.i, '0%,14%{left:50%;transform:rotate(0);opacity:1}34%{left:88%;transform:rotate(14deg);opacity:1}40%,58%{left:110%;opacity:0;transform:rotate(14deg)}64%,72%{left:-10%;opacity:0;transform:rotate(-14deg)}80%{left:12%;transform:rotate(-14deg);opacity:1}92%,100%{left:50%;transform:rotate(0);opacity:1}')
      ]),
      cfg: core(v, [range('Width', '--w', 150, 240, 2, 190, 'px'), range('Height', '--h', 90, 150, 2, 120, 'px')])
    };
  } });

  /* 14. rope pull — the flag slides the rope as both sides trade the win */
  M.push({ key: 'ropepull', title: 'Rope Pull', tags: ['motion', 'tug'], build: function (v) {
    var d = D(v, 3.2);
    return {
      html: '<div class="mt5"><div class="rp"><i class="rope"></i><b class="flag"></b><i class="tl"></i><i class="tr"></i></div></div>',
      css: join([
        stageCss(v),
        '.rp{position:relative;width:var(--w,210px);height:80px}',
        '.rp .rope{position:absolute;left:0;right:0;top:50%;height:4px;margin-top:-2px;border-radius:99px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.75) 0 8px,rgba(255,255,255,.4) 8px 16px)}',
        '.rp .flag{position:absolute;top:50%;left:50%;width:16px;height:26px;margin:-18px 0 0 -8px;clip-path:polygon(0 0,100% 25%,50% 50%,100% 75%,0 100%);background:var(--c3,' + v.c3 + ');box-shadow:0 0 10px color-mix(in srgb,var(--c3,' + v.c3 + ') 60%,transparent);animation:rp-a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.rp .tl,.rp .tr{position:absolute;top:50%;width:12px;height:12px;margin-top:-6px;border-radius:50%}',
        '.rp .tl{left:2px;background:var(--c1,' + v.c1 + ')}.rp .tr{right:2px;background:var(--c2,' + v.c2 + ')}',
        kf('rp-a' + v.i, '0%,100%{left:24%}30%,45%{left:72%}70%,85%{left:24%}')
      ]),
      cfg: core(v, [range('Width', '--w', 160, 260, 2, 210, 'px')])
    };
  } });

  /* 15. cursor orbit — two cursors trade places on a tether */
  M.push({ key: 'cursororbit', title: 'Cursor Orbit', tags: ['motion', 'cursor', 'js'], build: function (v) {
    return {
      html: '<div class="mt5"><i class="ca1"></i><i class="ca2"></i><b class="line"></b></div>',
      css: join([
        stageCss(v),
        '.ca1,.ca2{position:absolute;width:14px;height:14px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);pointer-events:none}',
        '.ca1{background:var(--c1,' + v.c1 + ');box-shadow:0 0 10px color-mix(in srgb,var(--c1,' + v.c1 + ') 70%,transparent)}',
        '.ca2{background:var(--c2,' + v.c2 + ');box-shadow:0 0 10px color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,transparent)}',
        '.line{position:absolute;width:2px;background:linear-gradient(180deg,var(--c3,' + v.c3 + '),transparent);opacity:.5;transform-origin:0 50%;animation:co-lp' + v.i + ' var(--dur,2s) ease-in-out infinite}',
        kf('co-lp' + v.i, '0%,100%{opacity:.3}50%{opacity:.75}')
      ]),
      js: ptrJS('co') + 'var a=root.querySelector(".ca1"),b=root.querySelector(".ca2"),ln=root.querySelector(".line"),t=0;api.raf(function(){t+=.016;var cx=P.x,cy=P.y;var ang=t*2.2,r=34+Math.sin(t*1.3)*10;var x1=cx*100+Math.cos(ang)*r/9,y1=cy*100+Math.sin(ang)*r/9;var x2=cx*100+Math.cos(ang+3.1416)*r/9,y2=cy*100+Math.sin(ang+3.1416)*r/9;a.style.left=x1+"%";a.style.top=y1+"%";b.style.left=x2+"%";b.style.top=y2+"%";ln.style.left=Math.min(x1,x2)+"%";ln.style.top=Math.min(y1,y2)+"%";var dx=Math.abs(x1-x2),dy=Math.abs(y1-y2);ln.style.width=Math.max(2,dx)+"px";ln.style.height=Math.max(2,dy)+"px";});',
      cfg: core(v)
    };
  } });

  /* 16. net warp — the dot net bows toward the cursor */
  M.push({ key: 'netwarp', title: 'Net Warp', tags: ['motion', 'cursor', 'js'], build: function (v) {
    var nx = 10, ny = 6, nodes = '';
    for (var gx = 0; gx < nx; gx++) for (var gy = 0; gy < ny; gy++) nodes += '<i style="--x:' + (gx * 11.11).toFixed(1) + '%;--y:' + (gy * 18.75).toFixed(1) + '%"></i>';
    return {
      html: '<div class="mt5"><div class="nw">' + nodes + '</div></div>',
      css: join([
        stageCss(v),
        '.nw{position:absolute;inset:15%}',
        '.nw i{position:absolute;left:var(--x,0%);top:var(--y,0%);width:4px;height:4px;margin:-2px;border-radius:50%;background:var(--c2,' + v.c2 + ');transition:transform .18s ease-out,background .18s,box-shadow .18s}'
      ]),
      js: ptrJS('nw') + 'var ns=root.querySelectorAll(".nw i");api.raf(function(){for(var i=0;i<ns.length;i++){var el=ns[i];var lx=(i%10+0.5)/10,ly=(Math.floor(i/10)+0.5)/6;var dx=P.x-lx,dy=P.y-ly,dist=Math.sqrt(dx*dx+dy*dy);var f=Math.max(0,1-dist*1.7);el.style.transform="translate(" + (dx*110*f) + "%," + (dy*110*f) + "%)";el.style.background=f>.45?"var(--c1,' + v.c1 + ')":"";el.style.boxShadow=f>.45?"0 0 8px var(--c1,' + v.c1 + ')":"";}});',
      cfg: core(v)
    };
  } });

  /* 17. grid ripple — a corner ripple sweeps the lattice on a loop */
  M.push({ key: 'gridripple', title: 'Grid Ripple', tags: ['motion', 'ripple'], build: function (v) {
    var d = D(v, 3), dots = '', i = 0;
    for (var gx = 0; gx < 8; gx++) for (var gy = 0; gy < 5; gy++) {
      var dist = (gx * .8 + gy * .6).toFixed(2);
      dots += '<i style="--x:' + (gx * 14.29).toFixed(1) + '%;--y:' + gy * 25 + '%;--d:' + dist + '"></i>';
      i++;
    }
    return {
      html: '<div class="mt5"><div class="gr">' + dots + '</div></div>',
      css: join([
        stageCss(v),
        '.gr{position:absolute;inset:16%}',
        '.gr i{position:absolute;left:var(--x,0%);top:var(--y,0%);width:7px;height:7px;margin:-3.5px;border-radius:50%;background:var(--c2,' + v.c2 + ');animation:gr-a' + v.i + ' var(--dur,' + d + 's) ease-out infinite;animation-delay:calc(var(--d) * var(--dur,' + d + 's) / -10)}',
        kf('gr-a' + v.i, '0%{transform:scale(1);background:var(--c2,' + v.c2 + ')}12%{transform:scale(2.1);background:var(--c1,' + v.c1 + ');box-shadow:0 0 10px var(--c1,' + v.c1 + ')}30%,100%{transform:scale(1);background:var(--c2,' + v.c2 + ')}')
      ]),
      cfg: core(v)
    };
  } });

  /* 18. type click — the caret types, holds, and deletes in a loop */
  M.push({ key: 'typeclick', title: 'Type Click', tags: ['motion', 'type'], build: function (v) {
    var d = D(v, 3.8), W = 'HELLO', bars = '';
    for (var i = 0; i < W.length; i++) bars += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="mt5"><div class="tc2">' + bars + '<b class="caret"></b></div></div>',
      css: join([
        stageCss(v),
        '.tc2{display:flex;gap:5px;align-items:center}',
        '.tc2 i{width:26px;height:34px;border-radius:6px;background:linear-gradient(160deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,#fff),color-mix(in srgb,var(--c2,' + v.c2 + ') 60%,#fff));transform-origin:50% 100%;animation:tc2-a' + v.i + ' var(--dur,' + d + 's) steps(1) infinite;animation-delay:calc(var(--i) * var(--dur,' + d + 's) / -20)}',
        '.tc2 .caret{width:3px;height:38px;border-radius:2px;background:var(--c3,' + v.c3 + ');animation:tc2-b' + v.i + ' calc(var(--dur,' + d + 's)/4) steps(1) infinite}',
        kf('tc2-a' + v.i, '0%,5%{transform:scaleY(0)}8%,78%{transform:scaleY(1)}84%,93%{transform:scaleY(0)}100%{transform:scaleY(0)}'),
        kf('tc2-b' + v.i, '0%,49%{opacity:1}50%,100%{opacity:0}')
      ]),
      cfg: core(v)
    };
  } });

  /* 19. gravity well — the particles spiral into the singularity */
  M.push({ key: 'gravitywell', title: 'Gravity Well', tags: ['motion', 'canvas', 'js'], build: function (v) {
    return {
      html: '<div class="mt5"><canvas class="cv" width="300" height="170"></canvas></div>',
      css: join([
        stageCss(v),
        '.mt5 .cv{width:100%;height:100%;display:block;animation:gw-b' + v.i + ' var(--dur,4s) ease-in-out infinite}',
        kf('gw-b' + v.i, '0%,100%{filter:brightness(.95) saturate(.95)}50%{filter:brightness(1.08) saturate(1.15)}')
      ]),
      js: 'var c=root.querySelector(".cv"),g=c.getContext&&c.getContext("2d");if(!g)return;var W=300,H=170,P=[],CX=150,CY=85;function spawn(){var a=Math.random()*6.283;P.push({x:CX+Math.cos(a)*130,y:CY+Math.sin(a)*85,ph:Math.random()*6.283});}for(var i=0;i<40;i++)spawn();api.raf(function(){g.fillStyle="rgba(4,4,10,.25)";g.fillRect(0,0,W,H);for(var i=0;i<P.length;i++){var p=P[i];var dx=CX-p.x,dy=CY-p.y,dist=Math.sqrt(dx*dx+dy*dy)||1;var s=Math.min(2.4,60/dist);p.x+=dx/dist*s+(-dy/dist)*.8;p.y+=dy/dist*s+(dx/dist)*.8;if(dist<8){P.splice(i,1);spawn();i--;}g.beginPath();g.arc(p.x,p.y,1.4,0,6.283);g.fillStyle="rgba(160,200,255,.8)";g.fill();}g.beginPath();g.arc(CX,CY,4,0,6.283);g.fillStyle="rgba(255,255,255,.95)";g.shadowColor="rgba(140,180,255,.9)";g.shadowBlur=16;g.fill();g.shadowBlur=0;});',
      cfg: core(v)
    };
  } });

  /* 20. snap knob — the dial detents through four stops with overshoot */
  M.push({ key: 'snapknob', title: 'Snap Knob', tags: ['motion', 'knob'], build: function (v) {
    var d = D(v, 3);
    return {
      html: '<div class="mt5"><div class="nk"><i class="arc"></i><b class="kn"><u></u></b></div></div>',
      css: join([
        stageCss(v),
        '.nk{position:relative;width:var(--sz,96px);height:var(--sz,96px)}',
        '.nk .arc{position:absolute;inset:6%;border-radius:50%;border:3px solid rgba(255,255,255,.12);border-top-color:var(--c3,' + v.c3 + ');transform:rotate(-135deg)}',
        '.nk .kn{position:absolute;inset:24%;border-radius:50%;background:radial-gradient(circle at 34% 30%,#3a3a52,#17171f 72%);border:1px solid rgba(255,255,255,.14);animation:nk-a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.5,-.3,.3,1.4) infinite}',
        '.nk u{position:absolute;left:50%;top:9%;width:4px;height:34%;margin-left:-2px;border-radius:2px;background:var(--c1,' + v.c1 + ');box-shadow:0 0 8px var(--c1,' + v.c1 + ')}',
        kf('nk-a' + v.i, '0%,16%{transform:rotate(-135deg)}25%,40%{transform:rotate(-45deg)}48%,62%{transform:rotate(45deg)}70%,84%{transform:rotate(135deg)}100%{transform:rotate(45deg)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 64, 150, 2, 96, 'px')])
    };
  } });

  /* 21. echo cursor — the pointer leaves three lagging ghosts */
  M.push({ key: 'echocursor', title: 'Echo Cursor', tags: ['motion', 'cursor', 'js'], build: function (v) {
    return {
      html: '<div class="mt5"><i class="e0"></i><i class="e1"></i><i class="e2"></i><i class="e3"></i></div>',
      css: join([
        stageCss(v),
        '.e0,.e1,.e2,.e3{position:absolute;width:12px;height:12px;margin:-6px;border-radius:50%;pointer-events:none}',
        '.e0{background:var(--c3,' + v.c3 + ');box-shadow:0 0 10px var(--c3,' + v.c3 + ');animation:ec-b' + v.i + ' var(--dur,1.6s) ease-in-out infinite}',
        kf('ec-b' + v.i, '0%,100%{transform:scale(1)}50%{transform:scale(1.35)}'),
        '.e1{background:var(--c1,' + v.c1 + ');opacity:.55}',
        '.e2{background:var(--c2,' + v.c2 + ');opacity:.35}',
        '.e3{background:var(--c1,' + v.c1 + ');opacity:.18}'
      ]),
      js: ptrJS('ec') + 'var es=[root.querySelector(".e0"),root.querySelector(".e1"),root.querySelector(".e2"),root.querySelector(".e3")],L=[{x:.5,y:.5},{x:.5,y:.5},{x:.5,y:.5},{x:.5,y:.5}],f=[.5,.22,.1,.05];api.raf(function(){for(var i=0;i<4;i++){L[i].x+=(P.x-L[i].x)*f[i];L[i].y+=(P.y-L[i].y)*f[i];es[i].style.left=(L[i].x*100)+"%";es[i].style.top=(L[i].y*100)+"%";}});',
      cfg: core(v)
    };
  } });

  K.add('motion', V.matrix('motion', M, 24, 'w5mo'));
})(window);
