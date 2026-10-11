/* ============================================================
   Motion Lab — wave 5, BACKGROUNDS (the 1,000-effect expansion)
   21 new mechanic families × 24 variants = 504 candidates.
   Every mechanic is a distinct atmosphere new to the collection;
   variants differ in geometry, density, rhythm, easing and
   palette. House rule: custom properties are only ever read
   with a fallback, never declared in demo CSS.
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
      col('Field A', '--c1', v.c1),
      col('Field B', '--c2', v.c2),
      col('Field C', '--c3', v.c3)
    ].concat(extra || []);
  }
  function stageCss(v, extra) {
    return '.bg5{position:relative;width:100%;height:var(--h,170px);overflow:hidden;border-radius:12px;background:radial-gradient(120% 140% at 50% 0%,rgba(16,16,30,.9),rgba(6,6,12,.96));' + (extra || '') + '}';
  }

  var M = [];

  /* 1. hex ripple — a honeycomb lit by a wandering pool of light */
  M.push({ key: 'hexripple', title: 'Hex Ripple', tags: ['background', 'pattern'], build: function (v) {
    var d = D(v, 5);
    return {
      html: '<div class="bg5 hx"><svg class="hp" preserveAspectRatio="xMidYMid slice" width="100%" height="100%"><defs><pattern id="hxp' + v.i + '" width="28" height="49" patternUnits="userSpaceOnUse"><path d="M14 0 L28 8.5 L28 25.5 L14 34 L0 25.5 L0 8.5 Z M14 34 L14 49" fill="none" stroke="var(--c2,' + v.c2 + ')" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#hxp' + v.i + ')"/></svg><i class="pool"></i></div>',
      css: join([
        stageCss(v),
        '.hx .hp{position:absolute;inset:0;opacity:.5}',
        '.hx .pool{position:absolute;inset:-30%;background:radial-gradient(46% 60% at var(--px,30%) var(--py,60%),color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent),transparent 70%);animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('a' + v.i, '0%,100%{transform:translate(0,0)}25%{transform:translate(52%,-30%)}55%{transform:translate(8%,34%)}80%{transform:translate(-30%,-8%)}')
      ]),
      cfg: core(v, [range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 2. cross scan — a vertical and a horizontal beam comb the grid */
  M.push({ key: 'crossscan', title: 'Cross Scan', tags: ['background', 'scan'], build: function (v) {
    var d = D(v, 3.2);
    return {
      html: '<div class="bg5 cs"><i class="vx"></i><i class="hz"></i><b class="ix"></b></div>',
      css: join([
        stageCss(v, 'background-image:repeating-linear-gradient(0deg,rgba(140,140,190,.13) 0 1px,transparent 1px 26px),repeating-linear-gradient(90deg,rgba(140,140,190,.13) 0 1px,transparent 1px 26px);background-color:rgba(6,6,13,.96)'),
        '.cs .vx{position:absolute;top:0;bottom:0;width:2px;background:linear-gradient(180deg,transparent,var(--c1,' + v.c1 + '),transparent);box-shadow:0 0 12px var(--c1,' + v.c1 + ');animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.cs .hz{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--c2,' + v.c2 + '),transparent);box-shadow:0 0 12px var(--c2,' + v.c2 + ');animation:b' + v.i + ' calc(var(--dur,' + d + 's) * 1.3) linear infinite}',
        '.cs .ix{position:absolute;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 16px var(--c3,' + v.c3 + ');animation:c' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('a' + v.i, '0%{left:-2%}100%{left:102%}'),
        kf('b' + v.i, '0%{top:102%}100%{top:-2%}'),
        kf('c' + v.i, '0%{left:0;top:100%}25%{left:33%;top:100%}50%{left:100%;top:100%}51%{left:100%;top:0}75%{left:66%;top:0}100%{left:0;top:100%}')
      ]),
      cfg: core(v, [range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 3. matrix pings — a dot grid where random nodes ping */
  M.push({ key: 'matrixpings', title: 'Matrix Pings', tags: ['background', 'dots', 'js'], build: function (v) {
    return {
      html: '<canvas class="cv" width="300" height="170"></canvas>',
      css: join([
        '.cv{width:100%;height:var(--h,170px);display:block;border-radius:12px;background:rgba(6,6,13,.96);animation:b' + v.i + ' var(--dur,' + D(v, 4) + 's) ease-in-out infinite}',
        kf('b' + v.i, '0%,100%{opacity:.9}50%{opacity:1}')
      ]),
      js: 'var c=root.querySelector(".cv"),g=c.getContext&&c.getContext("2d");if(!g)return;var W=300,H=170,GX=15,GY=9,P=[],t=0;for(var i=0;i<22;i++)P.push({x:Math.random(),y:Math.random(),r:0,sp:1.2+Math.random()*1.6});api.raf(function(){t+=.016;g.clearRect(0,0,W,H);g.fillStyle="rgba(150,150,200,.22)";for(var x=0;x<GX;x++)for(var y=0;y<GY;y++){g.beginPath();g.arc(12+x*(W-24)/(GX-1),12+y*(H-24)/(GY-1),1.1,0,6.283);g.fill();}for(var i=0;i<P.length;i++){var p=P[i];p.r+=.012*p.sp;if(p.r>1){p.x=Math.random();p.y=Math.random();p.r=0}var rr=p.r*30;g.strokeStyle="' + v.c2 + '";g.globalAlpha=Math.max(0,1-p.r);g.lineWidth=1.6;g.beginPath();g.arc(12+p.x*(W-24),12+p.y*(H-24),rr,0,6.283);g.stroke();g.globalAlpha=Math.max(0,(1-p.r)*.5);g.beginPath();g.arc(12+p.x*(W-24),12+p.y*(H-24),rr*.55,0,6.283);g.stroke();}g.globalAlpha=1;});',
      cfg: core(v, [range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 4. floor drive — a perspective grid rushes toward the viewer */
  M.push({ key: 'floordrive', title: 'Floor Drive', tags: ['background', 'perspective'], build: function (v) {
    var d = D(v, 1.6), sp = 4 + (v.i % 4);
    return {
      html: '<div class="bg5 fd"><i class="floor"></i><b class="hor"></b></div>',
      css: join([
        stageCss(v, 'background:linear-gradient(180deg,rgba(8,8,16,.98) 0 46%,rgba(6,6,12,.99) 46%)'),
        '.fd .floor{position:absolute;left:-40%;right:-40%;bottom:-78%;top:44%;background:repeating-linear-gradient(0deg,color-mix(in srgb,var(--c1,' + v.c1 + ') 70%,transparent) 0 2px,transparent 2px ' + (sp * 4) + 'px),repeating-linear-gradient(90deg,color-mix(in srgb,var(--c2,' + v.c2 + ') 70%,transparent) 0 2px,transparent 2px 64px);transform:perspective(300px) rotateX(62deg);transform-origin:50% 0;animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite;mask-image:linear-gradient(180deg,transparent 0,#000 42%);-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 42%)}',
        '.fd .hor{position:absolute;left:8%;right:8%;top:46%;height:2px;background:linear-gradient(90deg,transparent,var(--c3,' + v.c3 + '),transparent);box-shadow:0 0 14px var(--c3,' + v.c3 + ');animation:b' + v.i + ' calc(var(--dur,' + d + 's) * 2.2) ease-in-out infinite}',
        kf('a' + v.i, '0%{background-position:0 0,0 0}100%{background-position:0 ' + (sp * 4) + 'px,0 0}'),
        kf('b' + v.i, '0%,100%{opacity:.5}50%{opacity:1}')
      ]),
      cfg: core(v, [range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 5. light leak — warm camera leaks drift across the frame */
  M.push({ key: 'lightleak', title: 'Light Leak', tags: ['background', 'leak'], build: function (v) {
    var d = D(v, 4.4);
    return {
      html: '<div class="bg5 ll"><i class="b1"></i><i class="b2"></i><i class="b3"></i></div>',
      css: join([
        stageCss(v, 'background:#08080f'),
        '.ll i{position:absolute;width:70%;height:90%;filter:blur(26px);mix-blend-mode:screen;border-radius:50%}',
        '.ll .b1{left:-12%;top:-18%;background:radial-gradient(closest-side,color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent),transparent);animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.ll .b2{right:-16%;bottom:-24%;background:radial-gradient(closest-side,color-mix(in srgb,var(--c3,' + v.c3 + ') 55%,transparent),transparent);animation:b' + v.i + ' calc(var(--dur,' + d + 's) * 1.3) ease-in-out infinite}',
        '.ll .b3{left:24%;top:8%;width:44%;height:56%;background:radial-gradient(closest-side,color-mix(in srgb,var(--c2,' + v.c2 + ') 40%,transparent),transparent);animation:c' + v.i + ' calc(var(--dur,' + d + 's) * .8) ease-in-out infinite}',
        kf('a' + v.i, '0%,100%{transform:translate(0,0) scale(1);opacity:.5}50%{transform:translate(24%,14%) scale(1.25);opacity:.85}'),
        kf('b' + v.i, '0%,100%{transform:translate(0,0) scale(1.1);opacity:.45}50%{transform:translate(-26%,-12%) scale(.9);opacity:.8}'),
        kf('c' + v.i, '0%,100%{transform:translate(0,0);opacity:.3}50%{transform:translate(-14%,18%) scale(1.3);opacity:.6}')
      ]),
      cfg: core(v, [range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 6. converge — particles stream in from the edges to the core */
  M.push({ key: 'converge', title: 'Converge', tags: ['background', 'particles', 'js'], build: function (v) {
    var n = 40 + (v.i % 4) * 8;
    return {
      html: '<canvas class="cv" width="300" height="170"></canvas>',
      css: join([
        '.cv{width:100%;height:var(--h,170px);display:block;border-radius:12px;background:rgba(6,6,13,.96);animation:b' + v.i + ' var(--dur,' + D(v, 3) + 's) ease-in-out infinite}',
        kf('b' + v.i, '0%,100%{opacity:.9}50%{opacity:1}')
      ]),
      js: 'var c=root.querySelector(".cv"),g=c.getContext&&c.getContext("2d");if(!g)return;var W=300,H=170,P=[],N=' + n + ';for(var i=0;i<N;i++){var a=Math.random()*6.283,R=90+Math.random()*70;P.push({x:150+Math.cos(a)*R*1.6,y:85+Math.sin(a)*R,s:1+Math.random()*1.6});}api.raf(function(){g.clearRect(0,0,W,H);for(var i=0;i<N;i++){var p=P[i];var dx=150-p.x,dy=85-p.y,dist=Math.sqrt(dx*dx+dy*dy)||1;p.x+=dx/dist*p.s;p.y+=dy/dist*p.s;if(dist<7){var a=Math.random()*6.283,R=90+Math.random()*70;p.x=150+Math.cos(a)*R*1.6;p.y=85+Math.sin(a)*R;}g.fillStyle="' + v.c2 + '";g.globalAlpha=Math.min(1,dist/40);g.beginPath();g.arc(p.x,p.y,1.5,0,6.283);g.fill();}g.globalAlpha=1;g.fillStyle="' + v.c1 + '";g.shadowColor="' + v.c1 + '";g.shadowBlur=14;g.beginPath();g.arc(150,85,3.4,0,6.283);g.fill();g.shadowBlur=0;});',
      cfg: core(v, [range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 7. mouse parallax — three depth layers follow the pointer */
  M.push({ key: 'mousepar', title: 'Mouse Parallax', tags: ['background', 'parallax', 'js'], build: function (v) {
    var d = D(v, 6), stars = '';
    for (var i = 0; i < 14; i++) stars += '<i style="--i:' + i + ';--x:' + (6 + (i * 137) % 88) + ';--y:' + (10 + (i * 211) % 74) + '"></i>';
    return {
      html: '<div class="bg5 mp"><div class="l1">' + stars + '</div><div class="l2"><i class="s1"></i><i class="s2"></i><i class="s3"></i></div><i class="l3"></i></div>',
      css: join([
        stageCss(v),
        '.mp .l1{position:absolute;inset:0}',
        '.mp .l1 i{position:absolute;left:calc(var(--x) * 1%);top:calc(var(--y) * 1%);width:2px;height:2px;border-radius:50%;background:rgba(220,220,245,.7);animation:mp-tw' + v.i + ' calc(var(--dur,' + d + 's) / 3) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        '.mp .l2{position:absolute;inset:0}',
        '.mp .l2 i{position:absolute;border:1.5px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 55%,transparent);border-radius:6px}',
        '.mp .s1{left:16%;top:24%;width:34px;height:34px;transform:rotate(14deg)}',
        '.mp .s2{left:62%;top:52%;width:24px;height:24px;transform:rotate(-8deg);border-color:color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent)}',
        '.mp .s3{left:40%;top:12%;width:18px;height:18px;border-radius:50%;border-color:color-mix(in srgb,var(--c3,' + v.c3 + ') 55%,transparent)}',
        '.mp .l3{position:absolute;inset:-20%;background:radial-gradient(40% 52% at 70% 30%,color-mix(in srgb,var(--c1,' + v.c1 + ') 26%,transparent),transparent 70%)}',
        '.mp .l1,.mp .l2,.mp .l3{transition:transform .4s ease-out}',
        kf('mp-tw' + v.i, '0%,100%{opacity:.25}50%{opacity:.9}')
      ]),
      js: 'var c=root.querySelector(".mp"),l1=c.querySelector(".l1"),l2=c.querySelector(".l2"),l3=c.querySelector(".l3");c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect();if(!r.width||!r.height)return;var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;l1.style.transform="translate("+(x*-6)+"px,"+(y*-4)+"px)";l2.style.transform="translate("+(x*-16)+"px,"+(y*-11)+"px)";l3.style.transform="translate("+(x*22)+"px,"+(y*15)+"px)";});',
      cfg: core(v, [range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 8. banner wave — a string of pennants ripples in the breeze */
  M.push({ key: 'bannerwave', title: 'Banner Wave', tags: ['background', 'banners'], build: function (v) {
    var n = 8 + (v.i % 3), d = D(v, 1.8), pennants = '';
    for (var i = 0; i < n; i++) pennants += '<i style="--i:' + i + '"></i>';
    return {
      html: '<div class="bg5 bw"><div class="str"></div><div class="pn">' + pennants + '</div></div>',
      css: join([
        stageCss(v, 'background:linear-gradient(180deg,rgba(10,10,20,.96),rgba(6,6,12,.99))'),
        '.bw .str{position:absolute;left:2%;right:2%;top:calc(var(--sy,24%) - 2px);height:2px;background:rgba(200,200,225,.4);border-radius:2px}',
        '.bw .pn{position:absolute;left:2%;right:2%;top:var(--sy,24%)}',
        '.bw .pn i{position:absolute;left:calc(var(--i) * (100% / var(--n,' + n + ')));top:0;width:calc(100% / var(--n,' + n + ') * .82);height:var(--ph,26px);clip-path:polygon(0 0,100% 0,50% 100%);background:var(--c' + (1 + (i % 3)) + ',' + v.c1 + ');transform-origin:50% 0;animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -1)}',
        kf('a' + v.i, '0%,100%{transform:skewX(' + (v.i % 2 ? 6 : -6) + 'deg) scaleY(1)}50%{transform:skewX(' + (v.i % 2 ? -6 : 6) + 'deg) scaleY(1.12)}')
      ]),
      cfg: core(v, [range('String height', '--sy', 8, 50, 1, 24, '%'), range('Pennant height', '--ph', 14, 44, 2, 26, 'px')])
    };
  } });

  /* 9. galaxy spin — counter-rotating conic arms over a starfield */
  M.push({ key: 'galaxyspin', title: 'Galaxy Spin', tags: ['background', 'galaxy'], build: function (v) {
    var d = D(v, 7);
    return {
      html: '<div class="bg5 gx"><i class="st"></i><i class="arm a1"></i><i class="arm a2"></i><b class="core"></b></div>',
      css: join([
        stageCss(v),
        '.gx .st{position:absolute;inset:0;background-image:radial-gradient(1.5px 1.5px at 18% 30%,rgba(230,230,250,.8),transparent 60%),radial-gradient(1.5px 1.5px at 62% 14%,rgba(230,230,250,.6),transparent 60%),radial-gradient(1px 1px at 78% 62%,rgba(230,230,250,.7),transparent 60%),radial-gradient(1.5px 1.5px at 34% 74%,rgba(230,230,250,.5),transparent 60%),radial-gradient(1px 1px at 90% 30%,rgba(230,230,250,.6),transparent 60%);animation:gx-t' + v.i + ' calc(var(--dur,' + d + 's) / 4) ease-in-out infinite}',
        '.gx .arm{position:absolute;left:50%;top:50%;width:var(--sz,190px);height:var(--sz,190px);margin:calc(var(--sz,190px)/-2) 0 0 calc(var(--sz,190px)/-2);border-radius:50%;filter:blur(3px);opacity:.8}',
        '.gx .a1{background:conic-gradient(from 0deg,transparent 8%,var(--c1,' + v.c1 + ') 22%,transparent 44%,var(--c2,' + v.c2 + ') 60%,transparent 82%);animation:gx-s' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.gx .a2{width:calc(var(--sz,190px) * .62);height:calc(var(--sz,190px) * .62);margin:calc(var(--sz,190px) / -2 * .62) 0 0 calc(var(--sz,190px) / -2 * .62);background:conic-gradient(from 120deg,transparent 10%,var(--c3,' + v.c3 + ') 30%,transparent 55%,var(--c1,' + v.c1 + ') 74%,transparent 92%);animation:gx-s' + v.i + ' calc(var(--dur,' + d + 's) * 1.5) linear infinite reverse}',
        '.gx .core{position:absolute;left:50%;top:50%;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;background:radial-gradient(circle,#fff,var(--c2,' + v.c2 + ') 60%,transparent);box-shadow:0 0 24px var(--c2,' + v.c2 + ');animation:gx-c' + v.i + ' calc(var(--dur,' + d + 's) / 2.6) ease-in-out infinite}',
        kf('gx-s' + v.i, 'to{transform:rotate(1turn)}'),
        kf('gx-c' + v.i, '0%,100%{transform:scale(1)}50%{transform:scale(1.3)}'),
        kf('gx-t' + v.i, '0%,100%{opacity:.5}50%{opacity:.95}')
      ]),
      cfg: core(v, [range('Galaxy size', '--sz', 120, 260, 4, 190, 'px'), range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 10. cell storm — a grid of cells flashes like a weather system */
  M.push({ key: 'cellstorm', title: 'Cell Storm', tags: ['background', 'cells', 'js'], build: function (v) {
    return {
      html: '<canvas class="cv" width="300" height="170"></canvas>',
      css: join([
        '.cv{width:100%;height:var(--h,170px);display:block;border-radius:12px;background:rgba(6,6,13,.96);animation:b' + v.i + ' var(--dur,' + D(v, 3.4) + 's) ease-in-out infinite}',
        kf('b' + v.i, '0%,100%{opacity:.9}50%{opacity:1}')
      ]),
      js: 'var c=root.querySelector(".cv"),g=c.getContext&&c.getContext("2d");if(!g)return;var W=300,H=170,CW=20,CH=20,C=[],t=0;for(var i=0;i<60;i++)C.push({x:Math.floor(Math.random()*15),y:Math.floor(Math.random()*8),ph:0,sp:1+Math.random()*2});api.raf(function(){t+=.016;g.clearRect(0,0,W,H);g.strokeStyle="rgba(140,140,190,.1)";for(var x=0;x<=15;x++){g.beginPath();g.moveTo(x*CW,0);g.lineTo(x*CW,H);g.stroke();}for(var y=0;y<=8;y++){g.beginPath();g.moveTo(0,y*CH);g.lineTo(W,y*CH);g.stroke();}for(var i=0;i<C.length;i++){var p=C[i];p.ph+=.03*p.sp;if(p.ph>1)p.ph=0;var a=Math.sin(p.ph*3.1416);g.fillStyle="' + v.c1 + '";g.globalAlpha=a*.85;g.fillRect(p.x*CW+2,p.y*CH+2,CW-4,CH-4);}g.globalAlpha=1;});',
      cfg: core(v, [range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 11. ring axle — tilted rings turn on different axes */
  M.push({ key: 'ringaxle', title: 'Ring Axle', tags: ['background', 'rings', '3d'], build: function (v) {
    var d = D(v, 4);
    return {
      html: '<div class="bg5 ra"><div class="ax"><i class="r1"></i><i class="r2"></i><i class="r3"></i><i class="r4"></i></div></div>',
      css: join([
        stageCss(v, 'perspective:500px'),
        '.ra .ax{position:absolute;left:50%;top:50%;width:0;height:0}',
        '.ra i{position:absolute;left:50%;top:50%;width:var(--sz,150px);height:calc(var(--sz,150px) * .5);border:2px solid var(--c1,' + v.c1 + ');border-radius:50%;margin:calc(var(--sz,150px) * -.25) 0 0 calc(var(--sz,150px)/-2)}',
        '.ra .r1{transform:rotateX(70deg);animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.ra .r2{width:calc(var(--sz,150px) * .8);height:calc(var(--sz,150px) * .4);margin:calc(var(--sz,150px) * -.2) 0 0 calc(var(--sz,150px) / -2 * .8);border-color:var(--c2,' + v.c2 + ');animation:b' + v.i + ' calc(var(--dur,' + d + 's) * 1.3) linear infinite reverse}',
        '.ra .r3{width:calc(var(--sz,150px) * .6);height:calc(var(--sz,150px) * .3);margin:calc(var(--sz,150px) * -.15) 0 0 calc(var(--sz,150px) / -2 * .6);border-color:var(--c3,' + v.c3 + ');transform:rotateY(70deg);animation:c' + v.i + ' calc(var(--dur,' + d + 's) * .8) linear infinite}',
        '.ra .r4{width:calc(var(--sz,150px) * .76);height:calc(var(--sz,150px) * .38);margin:calc(var(--sz,150px) * -.19) 0 0 calc(var(--sz,150px) / -2 * .76);border-style:dashed;animation:d' + v.i + ' calc(var(--dur,' + d + 's) * 1.7) linear infinite}',
        kf('a' + v.i, 'from{transform:rotateX(70deg) rotateZ(0)}to{transform:rotateX(70deg) rotateZ(1turn)}'),
        kf('b' + v.i, 'from{transform:rotateX(64deg) rotateZ(0)}to{transform:rotateX(64deg) rotateZ(-1turn)}'),
        kf('c' + v.i, 'from{transform:rotateY(70deg) rotateX(40deg) rotateZ(0)}to{transform:rotateY(70deg) rotateX(40deg) rotateZ(1turn)}'),
        kf('d' + v.i, 'from{transform:rotateX(58deg) rotateZ(0)}to{transform:rotateX(58deg) rotateZ(1turn)}')
      ]),
      cfg: core(v, [range('Ring size', '--sz', 90, 240, 4, 150, 'px'), range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 12. fireworks — rockets climb and burst on a loop */
  M.push({ key: 'fireworks', title: 'Fireworks', tags: ['background', 'burst', 'js'], build: function (v) {
    return {
      html: '<canvas class="cv" width="300" height="170"></canvas>',
      css: join([
        '.cv{width:100%;height:var(--h,170px);display:block;border-radius:12px;background:linear-gradient(180deg,#07070f,#0b0a16);animation:b' + v.i + ' var(--dur,' + D(v, 3) + 's) ease-in-out infinite}',
        kf('b' + v.i, '0%,100%{opacity:.92}50%{opacity:1}')
      ]),
      js: 'var c=root.querySelector(".cv"),g=c.getContext&&c.getContext("2d");if(!g)return;var W=300,H=170,R=[],B=[],t=0,nc=0;var COL=["' + v.c1 + '","' + v.c2 + '","' + v.c3 + '"];api.raf(function(){t+=.016;if(nc%36===0){var x=40+Math.random()*(W-80);R.push({x:x,y:H+6,vy:-(2.4+Math.random()*1.4),c:COL[nc%3],burstAt:20+Math.random()*(H-70)});}nc++;g.clearRect(0,0,W,H);for(var i=R.length-1;i>=0;i--){var r=R[i];r.y+=r.vy;r.vy+=.02;g.fillStyle=r.c;g.shadowColor=r.c;g.shadowBlur=8;g.beginPath();g.arc(r.x,r.y,1.8,0,6.283);g.fill();g.shadowBlur=0;if(r.y<=r.burstAt){R.splice(i,1);var n=22+Math.floor(Math.random()*10);for(var j=0;j<n;j++){var a=j/n*6.283,sp=1+Math.random()*1.6;B.push({x:r.x,y:r.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1,c:r.c});}}}for(var k=B.length-1;k>=0;k--){var p=B[k];p.x+=p.vx;p.y+=p.vy;p.vy+=.045;p.life-=.022;if(p.life<=0){B.splice(k,1);continue;}g.globalAlpha=p.life;g.fillStyle=p.c;g.beginPath();g.arc(p.x,p.y,1.5,0,6.283);g.fill();}g.globalAlpha=1;});',
      cfg: core(v, [range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 13. balloon drift — balloons sway up out of the frame */
  M.push({ key: 'balloondrift', title: 'Balloon Drift', tags: ['background', 'float', 'js'], build: function (v) {
    var n = 6 + (v.i % 4);
    return {
      html: '<canvas class="cv" width="300" height="170"></canvas>',
      css: join([
        '.cv{width:100%;height:var(--h,170px);display:block;border-radius:12px;background:linear-gradient(180deg,rgba(9,9,18,.97),rgba(12,10,22,.98));animation:b' + v.i + ' var(--dur,' + D(v, 4) + 's) ease-in-out infinite}',
        kf('b' + v.i, '0%,100%{opacity:.92}50%{opacity:1}')
      ]),
      js: 'var c=root.querySelector(".cv"),g=c.getContext&&c.getContext("2d");if(!g)return;var W=300,H=170,P=[],N=' + n + ';var COL=["' + v.c1 + '","' + v.c2 + '","' + v.c3 + '"];for(var i=0;i<N;i++)P.push({x:Math.random()*W,y:Math.random()*H,r:9+Math.random()*9,v:.25+Math.random()*.5,ph:Math.random()*6.28,c:COL[i%3]});api.raf(function(){g.clearRect(0,0,W,H);for(var i=0;i<N;i++){var p=P[i];p.y-=p.v;p.ph+=.02;var x=p.x+Math.sin(p.ph)*7;if(p.y<-p.r*2){p.y=H+p.r*2;p.x=Math.random()*W;}g.strokeStyle="rgba(220,220,240,.35)";g.beginPath();g.moveTo(x,p.y+p.r);g.quadraticCurveTo(x+3,p.y+p.r+8,x-1,p.y+p.r+15);g.stroke();g.fillStyle=p.c;g.globalAlpha=.88;g.beginPath();g.ellipse(x,p.y,p.r*.82,p.r,0,0,6.283);g.fill();g.globalAlpha=1;g.fillStyle="rgba(255,255,255,.3)";g.beginPath();g.ellipse(x-p.r*.3,p.y-p.r*.35,p.r*.2,p.r*.3,0,0,6.283);g.fill();}});',
      cfg: core(v, [range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 14. shape drift — mixed shapes wander at their own pace */
  M.push({ key: 'shapedrift', title: 'Shape Drift', tags: ['background', 'drift'], build: function (v) {
    var d = D(v, 5);
    return {
      html: '<div class="bg5 sd3"><i class="p1"></i><i class="p2"></i><i class="p3"></i><i class="p4"></i><i class="p5"></i><i class="p6"></i><i class="p7"></i></div>',
      css: join([
        stageCss(v),
        '.sd3 i{position:absolute;border:2px solid var(--c1,' + v.c1 + ')}',
        '.sd3 .p1{left:10%;top:18%;width:40px;height:40px;border-radius:50%;animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.sd3 .p2{left:58%;top:56%;width:26px;height:26px;border-radius:6px;border-color:var(--c2,' + v.c2 + ');animation:b' + v.i + ' calc(var(--dur,' + d + 's) * 1.3) ease-in-out infinite}',
        '.sd3 .p3{left:76%;top:16%;width:0;height:0;border:0;border-left:14px solid transparent;border-right:14px solid transparent;border-bottom:24px solid var(--c3,' + v.c3 + ');animation:c' + v.i + ' calc(var(--dur,' + d + 's) * .8) ease-in-out infinite}',
        '.sd3 .p4{left:32%;top:64%;width:52px;height:18px;border-radius:99px;border-color:var(--c2,' + v.c2 + ');animation:d' + v.i + ' calc(var(--dur,' + d + 's) * 1.5) ease-in-out infinite}',
        '.sd3 .p5{left:46%;top:22%;width:16px;height:16px;border-radius:3px;transform:rotate(45deg);border-color:var(--c1,' + v.c1 + ');animation:e' + v.i + ' calc(var(--dur,' + d + 's) * .9) ease-in-out infinite}',
        '.sd3 .p6{left:8%;top:66%;width:30px;height:30px;border-radius:50%;border-style:dashed;border-color:var(--c3,' + v.c3 + ');animation:f' + v.i + ' calc(var(--dur,' + d + 's) * 1.1) linear infinite}',
        '.sd3 .p7{left:84%;top:60%;width:20px;height:20px;border-radius:50% 50% 50% 0;border-color:var(--c1,' + v.c1 + ');transform:rotate(-45deg);animation:g' + v.i + ' calc(var(--dur,' + d + 's) * 1.7) ease-in-out infinite}',
        kf('a' + v.i, '0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(26px,-20px) rotate(120deg)}'),
        kf('b' + v.i, '0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(-22px,-26px) rotate(-90deg)}'),
        kf('c' + v.i, '0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(18px,22px) rotate(180deg)}'),
        kf('d' + v.i, '0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-14px) rotate(8deg)}'),
        kf('e' + v.i, '0%,100%{transform:rotate(45deg) translate(0,0)}50%{transform:rotate(225deg) translate(10px,-18px)}'),
        kf('f' + v.i, 'from{transform:rotate(0)}to{transform:rotate(1turn)}'),
        kf('g' + v.i, '0%,100%{transform:rotate(-45deg)}50%{transform:rotate(-45deg) translate(-16px,-20px)}')
      ]),
      cfg: core(v, [range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 15. pulse rings — concentric rings sonar out from the core */
  M.push({ key: 'pulserings', title: 'Pulse Rings', tags: ['background', 'pulse'], build: function (v) {
    var d = D(v, 2.6);
    return {
      html: '<div class="bg5 pr"><i class="e1"></i><i class="e2"></i><i class="e3"></i><i class="e4"></i><b class="co"></b></div>',
      css: join([
        stageCss(v),
        '.pr i{position:absolute;left:50%;top:50%;width:var(--sz,120px);height:var(--sz,120px);margin:calc(var(--sz,120px)/-2) 0 0 calc(var(--sz,120px)/-2);border:2px solid var(--c1,' + v.c1 + ');border-radius:50%;opacity:0;animation:a' + v.i + ' var(--dur,' + d + 's) ease-out infinite}',
        '.pr .e2{animation-delay:calc(var(--dur,' + d + 's) / -4);border-color:var(--c2,' + v.c2 + ')}',
        '.pr .e3{animation-delay:calc(var(--dur,' + d + 's) / -2);border-color:var(--c3,' + v.c3 + ')}',
        '.pr .e4{animation-delay:calc(var(--dur,' + d + 's) * -3 / 4);border-color:var(--c1,' + v.c1 + ')}',
        '.pr .co{position:absolute;left:50%;top:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:var(--c2,' + v.c2 + ');box-shadow:0 0 18px var(--c2,' + v.c2 + ');animation:b' + v.i + ' calc(var(--dur,' + d + 's) / 2) ease-in-out infinite}',
        kf('a' + v.i, '0%{transform:scale(.15);opacity:.9}75%,100%{transform:scale(1);opacity:0}'),
        kf('b' + v.i, '0%,100%{transform:scale(1)}50%{transform:scale(1.4)}')
      ]),
      cfg: core(v, [range('Ring size', '--sz', 70, 220, 4, 120, 'px')])
    };
  } });

  /* 16. grid wave — a band of light sweeps a fine grid */
  M.push({ key: 'gridwave', title: 'Grid Wave', tags: ['background', 'grid'], build: function (v) {
    var d = D(v, 3);
    return {
      html: '<div class="bg5 gw"><i class="band"></i></div>',
      css: join([
        stageCss(v, 'background-image:repeating-linear-gradient(0deg,rgba(150,150,200,.14) 0 1px,transparent 1px 18px),repeating-linear-gradient(90deg,rgba(150,150,200,.14) 0 1px,transparent 1px 18px);background-color:rgba(6,6,13,.97)'),
        '.gw .band{position:absolute;top:-30%;bottom:-30%;left:-40%;width:34%;background:linear-gradient(100deg,transparent,color-mix(in srgb,var(--c1,' + v.c1 + ') 42%,transparent) 45%,color-mix(in srgb,var(--c2,' + v.c2 + ') 34%,transparent) 60%,transparent);transform:skewX(-14deg);filter:blur(2px);animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('a' + v.i, '0%{transform:translateX(0) skewX(-14deg)}100%{transform:translateX(420%) skewX(-14deg)}')
      ]),
      cfg: core(v, [range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 17. checker fade — a soft pool dissolves the checkerboard */
  M.push({ key: 'checkerfade', title: 'Checker Fade', tags: ['background', 'checker'], build: function (v) {
    var d = D(v, 4.2), s = 18 + (v.i % 3) * 6;
    return {
      html: '<div class="bg5 cf2"><i class="pool"></i></div>',
      css: join([
        stageCss(v, 'background-color:rgba(6,6,13,.97)'),
        '.cf2{background-image:repeating-conic-gradient(color-mix(in srgb,var(--c1,' + v.c1 + ') 26%,transparent) 0% 25%,transparent 0% 50%);background-size:' + s + 'px ' + s + 'px}',
        '.cf2 .pool{position:absolute;inset:-40%;background:radial-gradient(38% 50% at 50% 50%,color-mix(in srgb,var(--c3,' + v.c3 + ') 70%,transparent),transparent 72%);mix-blend-mode:screen;filter:blur(6px);animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('a' + v.i, '0%,100%{transform:translate(-24%,8%) scale(1)}33%{transform:translate(16%,-14%) scale(1.25)}66%{transform:translate(26%,10%) scale(.85)}')
      ]),
      cfg: core(v, [range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 18. star trails — dashed orbits turn at long exposure */
  M.push({ key: 'startrails', title: 'Star Trails', tags: ['background', 'trails'], build: function (v) {
    var d = D(v, 9);
    return {
      html: '<div class="bg5 st2"><i class="t1"></i><i class="t2"></i><i class="t3"></i><b class="hub"></b></div>',
      css: join([
        stageCss(v),
        '.st2 i{position:absolute;left:50%;top:50%;border-radius:50%}',
        '.st2 .t1{width:var(--sz,150px);height:var(--sz,150px);margin:calc(var(--sz,150px)/-2) 0 0 calc(var(--sz,150px)/-2);border:1.5px dashed color-mix(in srgb,var(--c1,' + v.c1 + ') 80%,transparent);animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.st2 .t2{width:calc(var(--sz,150px) * .72);height:calc(var(--sz,150px) * .72);margin:calc(var(--sz,150px) / -2 * .72) 0 0 calc(var(--sz,150px) / -2 * .72);border:1.5px dotted color-mix(in srgb,var(--c2,' + v.c2 + ') 85%,transparent);animation:b' + v.i + ' calc(var(--dur,' + d + 's) * 1.4) linear infinite reverse}',
        '.st2 .t3{width:calc(var(--sz,150px) * .46);height:calc(var(--sz,150px) * .46);margin:calc(var(--sz,150px) / -2 * .46) 0 0 calc(var(--sz,150px) / -2 * .46);border:2px dashed color-mix(in srgb,var(--c3,' + v.c3 + ') 80%,transparent);animation:a' + v.i + ' calc(var(--dur,' + d + 's) * .6) linear infinite}',
        '.st2 .hub{position:absolute;left:50%;top:50%;width:7px;height:7px;margin:-3.5px 0 0 -3.5px;border-radius:50%;background:#fff;box-shadow:0 0 12px var(--c2,' + v.c2 + ')}',
        kf('a' + v.i, 'to{transform:rotate(1turn)}'),
        kf('b' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: core(v, [range('Orbit size', '--sz', 90, 240, 4, 150, 'px')])
    };
  } });

  /* 19. haze bands — soft fog layers roll at different speeds */
  M.push({ key: 'hazebands', title: 'Haze Bands', tags: ['background', 'fog'], build: function (v) {
    var d = D(v, 6);
    return {
      html: '<div class="bg5 hb"><i class="h1"></i><i class="h2"></i><i class="h3"></i><i class="h4"></i><i class="h5"></i></div>',
      css: join([
        stageCss(v, 'background:linear-gradient(180deg,#0a0a14,#07070d)'),
        '.hb i{position:absolute;left:-60%;right:-60%;height:26%;border-radius:99px;filter:blur(14px)}',
        '.hb .h1{top:6%;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--c1,' + v.c1 + ') 30%,transparent),transparent);animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.hb .h2{top:26%;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--c2,' + v.c2 + ') 24%,transparent),transparent);animation:b' + v.i + ' calc(var(--dur,' + d + 's) * 1.5) linear infinite reverse}',
        '.hb .h3{top:46%;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--c3,' + v.c3 + ') 28%,transparent),transparent);animation:c' + v.i + ' calc(var(--dur,' + d + 's) * .7) linear infinite}',
        '.hb .h4{top:66%;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--c1,' + v.c1 + ') 20%,transparent),transparent);animation:b' + v.i + ' calc(var(--dur,' + d + 's) * 2) linear infinite}',
        '.hb .h5{top:84%;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--c2,' + v.c2 + ') 26%,transparent),transparent);animation:a' + v.i + ' calc(var(--dur,' + d + 's) * 1.2) linear infinite reverse}',
        kf('a' + v.i, '0%{transform:translateX(-12%)}100%{transform:translateX(12%)}'),
        kf('b' + v.i, '0%{transform:translateX(14%)}100%{transform:translateX(-14%)}'),
        kf('c' + v.i, '0%,100%{transform:translateX(-8%)}50%{transform:translateX(8%)}')
      ]),
      cfg: core(v, [range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 20. dot drizzle — two parallax layers of falling dots */
  M.push({ key: 'dotdrizzle', title: 'Dot Drizzle', tags: ['background', 'rain'], build: function (v) {
    var d = D(v, 1.2), s1 = 8 + (v.i % 3) * 2, s2 = Math.round(s1 * 1.9);
    return {
      html: '<div class="bg5 dd"><i class="n1"></i><i class="n2"></i></div>',
      css: join([
        stageCss(v, 'background:linear-gradient(180deg,rgba(10,10,20,.97),rgba(7,7,13,.99))'),
        '.dd i{position:absolute;inset:-10% -20%}',
        '.dd .n1{background-image:radial-gradient(1.6px 1.6px at 8px 8px,color-mix(in srgb,var(--c1,' + v.c1 + ') 80%,transparent),transparent 60%);background-size:' + s2 + 'px ' + s2 + 'px;opacity:.5;animation:a' + v.i + ' calc(var(--dur,' + d + 's) * 2.6) linear infinite}',
        '.dd .n2{background-image:radial-gradient(2.2px 2.2px at 12px 12px,color-mix(in srgb,var(--c2,' + v.c2 + ') 85%,transparent),transparent 60%);background-size:' + s1 + 'px ' + s1 + 'px;animation:b' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('a' + v.i, '0%{background-position:0 0}100%{background-position:0 ' + (s2 * 12) + 'px}'),
        kf('b' + v.i, '0%{background-position:0 0}100%{background-position:0 ' + (s1 * 12) + 'px}')
      ]),
      cfg: core(v, [range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  /* 21. searchlight — a single beam sweeps from the corner */
  M.push({ key: 'searchlight', title: 'Searchlight', tags: ['background', 'beam'], build: function (v) {
    var d = D(v, 4.6);
    return {
      html: '<div class="bg5 sl"><i class="beam"></i><i class="dust"></i></div>',
      css: join([
        stageCss(v, 'background:linear-gradient(180deg,#0a0912,#060509)'),
        '.sl .beam{position:absolute;left:12%;bottom:-12%;width:170%;height:170%;background:conic-gradient(from 0deg at 12% 100%,transparent calc(var(--wa,26) * 1deg),color-mix(in srgb,var(--c1,' + v.c1 + ') 34%,transparent) calc(var(--wa,26) * 1deg + 9deg),color-mix(in srgb,var(--c2,' + v.c2 + ') 30%,transparent) calc(var(--wa,26) * 1deg + 20deg),transparent calc(var(--wa,26) * 1deg + 30deg));transform-origin:12% 100%;filter:blur(2px);animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.sl .dust{position:absolute;inset:0;background-image:radial-gradient(1.4px 1.4px at 20% 30%,rgba(230,230,250,.5),transparent 60%),radial-gradient(1.2px 1.2px at 64% 22%,rgba(230,230,250,.4),transparent 60%),radial-gradient(1.4px 1.4px at 82% 56%,rgba(230,230,250,.45),transparent 60%),radial-gradient(1px 1px at 40% 70%,rgba(230,230,250,.35),transparent 60%);animation:b' + v.i + ' calc(var(--dur,' + d + 's) / 2.4) ease-in-out infinite}',
        kf('a' + v.i, '0%,100%{transform:rotate(' + (v.i % 2 ? 0 : 40) + 'deg)}50%{transform:rotate(' + (v.i % 2 ? 40 : 0) + 'deg)}'),
        kf('b' + v.i, '0%,100%{opacity:.35}50%{opacity:.8}')
      ]),
      cfg: core(v, [range('Beam angle', '--wa', 10, 60, 1, 26, 'deg'), range('Height', '--h', 110, 260, 2, 170, 'px')])
    };
  } });

  K.add('backgrounds', V.matrix('backgrounds', M, 24, 'w5bg'));
})(window);
