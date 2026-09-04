/* ============================================================
   Motion & interaction — generated families
   Scroll, pointer, drag, spring and physics driven effects.
   Each demo is self-contained: it uses root + api only, so the same
   string you copy out of the modal runs in any page.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color, mapJoin = K.mapJoin, cells = K.cells;
  var C1 = '#7c5cff', C2 = '#22d3ee', C3 = '#ff5c8a';
  var pool = [];

  var STD = [
    range('Distance', '--amp', 4, 90, 2, 28, 'px'),
    range('Stagger', '--stg', 0, .4, .01, .09, 's'),
    range('Corner', '--r', 0, 26, 1, 12, 'px'),
    col('Tint', '--c1', C1), col('Tint B', '--c2', C2)
  ];

  var shell = `.mo{position:relative;width:100%;min-height:132px;display:grid;place-items:center;overflow:hidden;padding:12px;box-sizing:border-box;border-radius:var(--r,12px);background:linear-gradient(160deg,#14141f,#0d0d15);border:1px solid rgba(255,255,255,.08)}
.mo h4{margin:0;font:800 clamp(15px,4.4vw,22px)/1.1 "Plus Jakarta Sans",system-ui;letter-spacing:-.02em;color:#fff}
.mo p{margin:6px 0 0;font-size:11.5px;line-height:1.5;color:#9a9ab0;text-align:center;max-width:26ch}
.mo .btn{padding:8px 14px;border-radius:8px;border:1px solid rgba(255,255,255,.16);background:#191926;color:#e8e8f4;font:600 12px/1 "Plus Jakarta Sans",system-ui;cursor:pointer}`;

  function mk(o) {
    var cfg = (o.cfg || STD).filter(function (c) {
      return [o.html, o.css, o.js].some(function (s) { return s && s.indexOf(c.k) > -1; });
    });
    pool.push({
      family: 'mo:' + o.g, id: 'mo-' + o.name, title: o.title,
      tags: ['motion', o.g].concat(o.tags || ['js']),
      html: o.html, css: join([shell, o.css]), js: o.js, cfg: cfg.length ? cfg : null
    });
  }

  /* play-when-visible glue, reused by every reveal */
  var IO = 'var box=root.querySelector(".mo"),tg=[].slice.call(root.querySelectorAll(".pl"));\n' +
    'function on(el,v){el.classList.toggle("in",v);}\n' +
    'var io=new IntersectionObserver(function(es){es.forEach(function(e){on(e.target,e.isIntersecting);});},{threshold:.35});\n' +
    'tg.forEach(function(el){io.observe(el);});\n' +
    'box.addEventListener("click",function(){tg.forEach(function(el){el.classList.remove("in");setTimeout(function(){on(el,1);},30);});});\n' +
    'api.onCleanup(function(){io.disconnect();});';

  /* ───────── 1. scroll reveals ───────── */
  [
    ['fade-up', 'Reveal Fade Up', `.mo .pl{opacity:0;transform:translateY(var(--amp,28px));transition:opacity var(--dur,.7s) ease,transform var(--dur,.9s) cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--i,0) * var(--stg,.09s))}
.mo .pl.in{opacity:1;transform:none}`],
    ['slide-left', 'Reveal Slide From Left', `.mo .pl{opacity:0;transform:translateX(calc(var(--amp,28px) * -1.6));transition:all var(--dur,.8s) cubic-bezier(.2,.9,.2,1);transition-delay:calc(var(--i,0) * var(--stg,.09s))}
.mo .pl.in{opacity:1;transform:none}`],
    ['clip-wipe', 'Reveal Clip Wipe', `.mo .pl{clip-path:inset(0 100% 0 0);transition:clip-path var(--dur,.9s) cubic-bezier(.5,0,.2,1);transition-delay:calc(var(--i,0) * var(--stg,.09s))}
.mo .pl.in{clip-path:inset(0 0 0 0)}`],
    ['blur-in', 'Reveal Blur In', `.mo .pl{opacity:0;filter:blur(10px);transform:scale(1.06);transition:all var(--dur,.9s) ease;transition-delay:calc(var(--i,0) * var(--stg,.09s))}
.mo .pl.in{opacity:1;filter:blur(0);transform:none}`],
    ['rotate-in', 'Reveal Rotate In', `.mo .pl{opacity:0;transform:rotate(-8deg) translateY(var(--amp,28px)) scale(.94);transition:all var(--dur,.86s) cubic-bezier(.2,1.2,.3,1);transition-delay:calc(var(--i,0) * var(--stg,.09s))}
.mo .pl.in{opacity:1;transform:none}`],
    ['skew-in', 'Reveal Skew Out', `.mo .pl{opacity:0;transform:skewY(var(--amp,28px) * .28) translateY(var(--amp,28px));transition:all var(--dur,.8s) cubic-bezier(.3,.9,.2,1)}
.mo .pl.in{opacity:1;transform:none}`],
    ['line-mask', 'Line Mask Reveal', `.mo .ln{position:relative;overflow:hidden;display:block}
.mo .ln span{display:block;transform:translateY(110%);transition:transform var(--dur,.74s) cubic-bezier(.2,.9,.2,1);transition-delay:calc(var(--i,0) * var(--stg,.09s))}
.mo .ln.in span{transform:none}`],
    ['scale-pop', 'Scale Pop Reveal', `.mo .pl{opacity:0;transform:scale(.4);transition:all var(--dur,.7s) cubic-bezier(.2,1.7,.3,1);transition-delay:calc(var(--i,0) * var(--stg,.09s))}
.mo .pl.in{opacity:1;transform:scale(1)}`],
    ['unfold', 'Unfold Reveal', `.mo .pl{transform-origin:50% 0;transform:perspective(600px) rotateX(-88deg);opacity:.2;transition:all var(--dur,.86s) cubic-bezier(.3,1.1,.3,1);transition-delay:calc(var(--i,0) * var(--stg,.09s))}
.mo .pl.in{transform:none;opacity:1}`],
    ['curtain-up', 'Curtain Up Reveal', `.mo .pl{transform:translateY(calc(var(--amp,28px) * 2.4)) scale(.98);opacity:0;transition:transform var(--dur,1s) cubic-bezier(.16,1,.3,1),opacity .5s}
.mo .pl.in{transform:none;opacity:1}`],
    ['letters-cascade', 'Cascade Letters', `.mo .w2{display:inline-flex;gap:.02em;font:800 clamp(18px,5.4vw,30px)/1 "Plus Jakarta Sans",system-ui;color:#fff}
.mo .w2 i{display:inline-block;transform:translateY(var(--amp,28px)) rotate(9deg);opacity:0;transition:all var(--dur,.6s) cubic-bezier(.2,1.5,.3,1);transition-delay:calc(var(--i) * var(--stg,.09s))}
.mo .w2.in i{transform:none;opacity:1}`],
    ['image-mask-reveal', 'Image Curtain Reveal', `.mo .im{width:min(180px,72%);aspect-ratio:4/3;border-radius:var(--r,12px);background:linear-gradient(140deg,var(--c1,${C1}),var(--c2,${C2}));position:relative;overflow:hidden}
.mo .im::after{content:"";position:absolute;inset:0;background:#0d0d15;transform-origin:0 50%;transition:transform var(--dur,.9s) cubic-bezier(.7,0,.2,1)}
.mo .im.in::after{transform:scaleX(0)}
.mo .im img2{position:absolute;inset:0}`]
  ].forEach(function (v) {
    var inner;
    if (v[0] === 'line-mask') {
      inner = '<div style="display:grid;gap:7px;justify-items:center">' + mapJoin(3, function (i) {
        return '<b class="ln pl" style="--i:' + i + ';font:700 ' + [20, 15, 12][i] + 'px/1.2 "Plus Jakarta Sans",system-ui;color:#fff"><span>' + ['Motion first', 'Sixty frames', 'Zero build'][i] + '</span></b>';
      }, '') + '</div>';
    } else if (v[0] === 'letters-cascade') {
      inner = '<span class="w2 pl">' + K.letters('ANIMATE', 'i') + '</span>';
    } else if (v[0] === 'image-mask-reveal') {
      inner = '<span class="im pl"></span>';
    } else {
      inner = '<div style="display:grid;gap:8px;justify-items:center;width:100%">' +
        '<h4 class="pl" style="--i:0">' + v[1].replace('Reveal ', '') + '</h4>' +
        '<p class="pl" style="--i:1">Scroll the card into view, or click it to replay.</p>' +
        '<button class="btn pl" style="--i:2">Nice</button></div>';
    }
    mk({ g: 'reveal', name: v[0], title: v[1], html: '<div class="mo">' + inner + '</div>', css: v[2], js: IO });
  });

  /* ───────── 2. parallax & pointer ───────── */
  mk({
    g: 'parallax', name: 'parallax-layers', title: 'Pointer Parallax Layers',
    html: '<div class="mo px"><span class="l l0"></span><span class="l l1"></span><span class="l l2"></span><h4>Depth</h4></div>',
    css: `.mo.px{transform-style:preserve-3d;perspective:var(--vp,600px)}
.mo .l{position:absolute;border-radius:50%;filter:blur(2px);transition:transform .2s ease-out}
.mo .l0{left:10%;top:16%;width:54px;height:54px;background:color-mix(in srgb,var(--c1,${C1}) 70%,transparent);--f:6}
.mo .l1{right:14%;top:26%;width:34px;height:34px;background:color-mix(in srgb,var(--c2,${C2}) 70%,transparent);--f:12}
.mo .l2{left:28%;bottom:14%;width:20px;height:20px;background:color-mix(in srgb,var(--c3,${C3}) 85%,transparent);--f:20}
.mo.px h4{position:relative;transition:transform .2s ease-out}`,
    js: 'var mo=root.querySelector(".mo"),ls=[].slice.call(mo.querySelectorAll(".l")),h=mo.querySelector("h4");\n' +
      'mo.addEventListener("pointermove",function(e){var r=mo.getBoundingClientRect();if(!r.width)return;\n' +
      '  var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;\n' +
      '  ls.forEach(function(l){var f=parseFloat(getComputedStyle(l).getPropertyValue("--f"))||8;\n' +
      '    l.style.transform="translate("+(-x*f*2)+"px,"+(-y*f*2)+"px)";});\n' +
      '  h.style.transform="translate("+(x*10)+"px,"+(y*8)+"px)";});\n' +
      'mo.addEventListener("pointerleave",function(){ls.concat(h).forEach(function(l){l.style.transform="";});});'
  });
  mk({
    g: 'parallax', name: 'scroll-parallax', title: 'Scroll Parallax Band',
    html: '<div class="mo sp"><span class="b1">SCROLL ME</span><span class="b2">·  ·  ·  ·  ·  ·</span></div>',
    css: `.mo.sp{display:grid;gap:10px;place-items:center;cursor:ns-resize}
.mo .b1{font:800 clamp(20px,6vw,30px)/1 "Plus Jakarta Sans",system-ui;color:#fff;transform:translateY(var(--y1,0px))}
.mo .b2{font:700 14px/1 "JetBrains Mono",monospace;color:var(--c2,${C2});letter-spacing:.2em;transform:translateY(var(--y2,0px))}`,
    js: 'var mo=root.querySelector(".mo"),y=0,vel=.6;\n' +
      'function paint(){mo.style.setProperty("--y1",(y*-1.1).toFixed(1)+"px");mo.style.setProperty("--y2",(y*.7).toFixed(1)+"px");}\n' +
      'api.raf(function(){y+=vel;if(Math.abs(y)>26)vel*=-1;paint();});\n' +
      'mo.addEventListener("wheel",function(e){e.preventDefault&&e.preventDefault();y+=e.deltaY*.06;},{passive:false});'
  });
  [
    ['cursor-follower', 'Cursor Ring Follower', `.mo{cursor:none}
.mo .cur{position:absolute;left:0;top:0;width:var(--cs,20px);height:var(--cs,20px);margin:calc(var(--cs,20px) / -2);border-radius:50%;border:1.5px solid var(--c2,${C2});transform:translate(var(--cx,50px),var(--cy,50px));pointer-events:none;transition:width .2s,height .2s,margin .2s,background .2s}
.mo.hot .cur{background:color-mix(in srgb,var(--c1,${C1}) 40%,transparent);width:calc(var(--cs,20px) * 2);height:calc(var(--cs,20px) * 2)}
.mo b{font:700 13px/1 "Plus Jakarta Sans",system-ui;color:#fff}`],
    ['cursor-lag', 'Trailing Cursor Chain', `.mo{cursor:none}
.mo .cd{position:absolute;left:0;top:0;width:var(--cs,12px);height:var(--cs,12px);margin:calc(var(--cs,12px) / -2);border-radius:50%;background:var(--c1,${C1});transform:translate(var(--cx,50px),var(--cy,50px));pointer-events:none;opacity:.9}
.mo .cd:nth-child(2){opacity:.66;width:calc(var(--cs,12px) * .82);height:calc(var(--cs,12px) * .82)}
.mo .cd:nth-child(3){opacity:.44;width:calc(var(--cs,12px) * .66);height:calc(var(--cs,12px) * .66)}
.mo .cd:nth-child(4){opacity:.26;width:calc(var(--cs,12px) * .5);height:calc(var(--cs,12px) * .5)}
.mo b{font:700 13px/1 "Plus Jakarta Sans",system-ui;color:#fff}`],
    ['magnetic-icon', 'Magnetic Icon', `.mo{cursor:pointer}
.mo .mg{display:grid;place-items:center;width:62px;height:62px;border-radius:50%;border:1px solid rgba(255,255,255,.16);background:#16161f;transform:translate(var(--dx,0px),var(--dy,0px));transition:transform var(--tt,.4s) cubic-bezier(.2,1.4,.3,1),background .3s,border-color .3s}
.mo .mg svg{width:22px;height:22px;fill:none;stroke:var(--c1,${C1});stroke-width:2;stroke-linecap:round;transition:transform var(--tt,.4s) cubic-bezier(.2,1.4,.3,1)}
.mo:hover .mg{background:color-mix(in srgb,var(--c1,${C1}) 20%,#16161f);border-color:var(--c1,${C1})}
.mo .lbl2{margin-top:8px;font:600 11px/1 "JetBrains Mono",monospace;color:#8b8ba3;letter-spacing:.08em;text-transform:uppercase}`],
    ['hover-stretch', 'Stretch Link', `.mo{gap:14px;display:flex;flex-direction:column;align-items:flex-start}
.mo .lk2{position:relative;font:800 clamp(16px,5vw,24px)/1 "Plus Jakarta Sans",system-ui;color:#fff;text-decoration:none;transform-origin:50% 100%;transition:transform var(--tt,.42s) cubic-bezier(.2,1.5,.3,1)}
.mo .lk2::after{content:"";position:absolute;left:0;bottom:-4px;height:2px;width:var(--lw2,0%);background:var(--c2,${C2});transition:width var(--tt,.4s) cubic-bezier(.2,1,.3,1)}
.mo .lk2:hover{transform:scale(1.06,.92)}
.mo .lk2:hover::after{width:100%}`],
  ].forEach(function (v) {
    var inner = '';
    if (v[0] === 'cursor-follower') inner = '<b>move inside the card</b>';
    if (v[0] === 'cursor-lag') inner = mapJoin(4, function () { return '<i class="cd"></i>'; }, '') + '<b>four dots, one after another</b>';
    if (v[0] === 'magnetic-icon') inner = '<i class="mg"><svg viewBox="0 0 24 24"><path d="M12 4v16M4 12h16"/></svg></i><span class="lbl2">pull me</span>';
    if (v[0] === 'hover-stretch') inner = '<a class="lk2" href="#">Hover me</a><a class="lk2" href="#">or me</a>';
    mk({
      g: 'cursor', name: v[0], title: v[1],
      html: '<div class="mo">' + inner + '</div>',
      css: v[2],
      js: v[0] === 'cursor-follower'
        ? 'var mo=root.querySelector(".mo");\n' +
          'mo.insertAdjacentHTML("beforeend",\'<i class="cur"></i>\');var cur=mo.querySelector(".cur");\n' +
          'var cx=50,cy=50,tx=50,ty=50;\n' +
          'mo.addEventListener("pointermove",function(e){var r=mo.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top;\n' +
          '  mo.classList.toggle("hot",!!(e.target.closest&&e.target.closest("b")));});\n' +
          'api.raf(function(){cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;cur.style.setProperty("--cx",cx+"px");cur.style.setProperty("--cy",cy+"px");});'
        : v[0] === 'cursor-lag'
          ? 'var mo=root.querySelector(".mo"),ds=[].slice.call(mo.querySelectorAll(".cd"));\n' +
            'var tx=50,ty=50,ps=ds.map(function(){return [50,50];});\n' +
            'mo.addEventListener("pointermove",function(e){var r=mo.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top;});\n' +
            'api.raf(function(){var px=tx,py=ty;\n' +
            '  ds.forEach(function(d,i){var p=ps[i];p[0]+=(px-p[0])*.28;p[1]+=(py-p[1])*.28;\n' +
            '    d.style.setProperty("--cx",p[0]+"px");d.style.setProperty("--cy",p[1]+"px");px=p[0];py=p[1];});});'
          : v[0] === 'magnetic-icon'
            ? 'var mo=root.querySelector(".mo"),mg=mo.querySelector(".mg"),ic=mg.querySelector("svg");\n' +
              'mo.addEventListener("pointermove",function(e){var r=mg.getBoundingClientRect();if(!r.width)return;\n' +
              '  var dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);\n' +
              '  mg.style.setProperty("--dx",(dx*.34)+"px");mg.style.setProperty("--dy",(dy*.34)+"px");\n' +
              '  ic.style.transform="translate("+(dx*.12)+"px,"+(dy*.12)+"px)";});\n' +
              'mo.addEventListener("pointerleave",function(){mg.style.setProperty("--dx","0px");mg.style.setProperty("--dy","0px");ic.style.transform="";});'
            : v[0] === 'hover-stretch'
              ? 'var mo=root.querySelector(".mo"),ls=[].slice.call(mo.querySelectorAll(".lk2"));\n' +
                'ls.forEach(function(a){a.addEventListener("pointermove",function(e){var r=a.getBoundingClientRect();\n' +
                '  if(!r.width)return;a.style.setProperty("--lw2",Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100))+"%");});\n' +
                '  a.addEventListener("pointerleave",function(){a.style.setProperty("--lw2","0%")});});'
              : undefined
    });
  });

  /* ───────── 3. drag & gesture ───────── */
  mk({
    g: 'drag', name: 'drag-slider', title: 'Drag Handle Slider',
    html: '<div class="mo dr"><span class="rail"><b class="fill"></b><i class="knob"></i></span><span class="lab">42%</span></div>',
    css: `.mo.dr{display:grid;gap:14px;align-content:center}
.mo .rail{position:relative;height:8px;border-radius:99px;background:#22222f;box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}
.mo .fill{position:absolute;left:0;top:0;height:100%;width:var(--p,42%);border-radius:99px;background:linear-gradient(90deg,var(--c1,${C1}),var(--c2,${C2}))}
.mo .knob{position:absolute;top:50%;left:var(--p,42%);width:var(--ks,22px);height:var(--ks,22px);margin:calc(var(--ks,22px) / -2);border-radius:50%;background:#fff;box-shadow:0 4px 12px -2px #000;cursor:grab;transition:transform .16s}
.mo .knob:active{cursor:grabbing;transform:scale(1.16)}
.mo .lab{font:800 22px/1 "JetBrains Mono",monospace;color:#fff;text-align:center}`,
    js: 'var mo=root.querySelector(".mo"),k=mo.querySelector(".knob"),lab=mo.querySelector(".lab"),p=42,drag=0;\n' +
      'function set(e){var r=mo.getBoundingClientRect();if(!r.width)return;\n' +
      '  p=Math.max(0,Math.min(100,(e.clientX-r.left-12)/Math.max(1,r.width-24)*100));\n' +
      '  mo.style.setProperty("--p",p+"%");lab.textContent=Math.round(p)+"%";}\n' +
      'k.addEventListener("pointerdown",function(e){drag=1;k.setPointerCapture&&k.setPointerCapture(e.pointerId);});\n' +
      'k.addEventListener("pointermove",function(e){if(drag)set(e);});\n' +
      'k.addEventListener("pointerup",function(){drag=0;});\n' +
      'mo.addEventListener("pointerdown",function(e){if(!drag)set(e);});'
  });
  mk({
    g: 'drag', name: 'swipe-dismiss', title: 'Swipe To Dismiss',
    html: '<div class="mo sw"><div class="card2"><b>Notification</b><i>drag me sideways</i></div></div>',
    css: `.mo.sw{overflow:hidden}
.mo .card2{position:relative;width:min(220px,86%);padding:12px 14px;border-radius:var(--r,12px);background:linear-gradient(150deg,#1e1e2c,#141420);border:1px solid rgba(255,255,255,.12);display:grid;gap:4px;cursor:grab;transform:translateX(var(--dx,0px)) rotate(calc(var(--dx,0px) * .04deg));transition:transform var(--tt,.42s) cubic-bezier(.2,1.2,.3,1);touch-action:none;box-shadow:0 18px 30px -24px #000}
.mo .card2:active{cursor:grabbing;transition:none}
.mo .card2.gone{transform:translateX(var(--fly,300px)) rotate(16deg);opacity:0;transition:transform var(--dur,.42s) cubic-bezier(.4,0,.7,1),opacity .3s}
.mo b{font:700 13px/1.2 "Plus Jakarta Sans",system-ui;color:#fff}
.mo i{font:500 11px/1.4 "JetBrains Mono",monospace;font-style:normal;color:#9a9ab0}`,
    js: 'var mo=root.querySelector(".mo"),c=mo.querySelector(".card2"),x=0,sx=0,drag=0;\n' +
      'c.addEventListener("pointerdown",function(e){drag=1;sx=e.clientX;c.setPointerCapture&&c.setPointerCapture(e.pointerId);});\n' +
      'c.addEventListener("pointermove",function(e){if(!drag)return;x=e.clientX-sx;c.style.setProperty("--dx",x+"px");c.style.setProperty("--fly",(x<0?-1:1)*320+"px");});\n' +
      'c.addEventListener("pointerup",function(){drag=0;\n' +
      '  if(Math.abs(x)>78){c.classList.add("gone");setTimeout(function(){c.classList.remove("gone");c.style.setProperty("--dx","0px");x=0;},700);}\n' +
      '  else{c.style.setProperty("--dx","0px");x=0;}});'
  });
  [
    ['drag-snap', 'Snap Grid Drag', `.mo.dg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.mo .cel{position:relative;aspect-ratio:1;border-radius:var(--r,10px);background:linear-gradient(150deg,#20202e,#131320);border:1px solid rgba(255,255,255,.1);display:grid;place-items:center;font:700 13px/1 "JetBrains Mono",monospace;color:#8b8ba3;cursor:grab;touch-action:none;transition:transform var(--tt,.34s) cubic-bezier(.2,1.5,.3,1),background .24s,color .24s,box-shadow .24s}
.mo .cel:hover{color:#fff}
.mo .cel.up{z-index:2;background:color-mix(in srgb,var(--c1,${C1}) 30%,#141420);color:#fff;box-shadow:0 16px 26px -14px #000;transition:none}
.mo .cel.sw{transform:translateX(var(--o,0px))}`,
      'var mo=root.querySelector(".mo"),cs=[].slice.call(mo.querySelectorAll(".cel")),el=null,i0=0,x=0,sx=0,W=60;\n' +
      'cs.forEach(function(c,i){c.addEventListener("pointerdown",function(e){el=c;i0=i;x=0;sx=e.clientX;c.classList.add("up");c.setPointerCapture&&c.setPointerCapture(e.pointerId);});});\n' +
      'mo.addEventListener("pointermove",function(e){if(!el)return;x=e.clientX-sx;var o=Math.max(-1,Math.min(1,x/W));\n' +
      '  el.style.transform="translate("+x+"px,0) scale(1.04)";\n' +
      '  var j=Math.max(0,Math.min(cs.length-1,i0+Math.round(o*1.4)));\n' +
      '  cs.forEach(function(c,i2){if(c!==el)c.style.transform=(i2>i0&&i2<=j)?"translateX(-"+(W*.6)+"px)":((i2<i0&&i2>=j)?"translateX("+(W*.6)+"px)":"");});});\n' +
      'mo.addEventListener("pointerup",function(){if(!el)return;var o=Math.max(-1,Math.min(1,x/W)),j=Math.max(0,Math.min(cs.length-1,i0+Math.round(o*1.4)));\n' +
      '  cs.forEach(function(c){c.style.transform=""});\n' +
      '  if(j!==i0){var p=el.parentNode;if(j>i0)p.insertBefore(el,cs[j].nextSibling);else p.insertBefore(el,cs[j]);}\n' +
      '  el.classList.remove("up");el.style.transform="";el=null;});'],
    ['drawer-drag', 'Draggable Sheet', `.mo.ds{align-items:end;padding:0}
.mo .sh3{position:relative;width:100%;height:var(--shh,64%);border-radius:16px 16px 0 0;background:linear-gradient(180deg,#22222f,#141420);border:1px solid rgba(255,255,255,.1);border-bottom:0;transform:translateY(var(--ty,36%));transition:transform var(--tt,.42s) cubic-bezier(.2,1.1,.3,1);display:grid;gap:7px;padding:10px 14px;box-sizing:border-box;touch-action:none}
.mo .sh3.drag{transition:none}
.mo .sh3::before{content:"";position:absolute;left:50%;top:6px;width:36px;height:4px;margin-left:-18px;border-radius:4px;background:#4a4a60}
.mo .sh3 b{font:700 13px/1.2 "Plus Jakarta Sans",system-ui;color:#fff;margin-top:10px}
.mo .sh3 i{display:block;height:7px;border-radius:5px;background:#2b2b3c}`,
      'var mo=root.querySelector(".mo"),sh=mo.querySelector(".sh3"),y0=0,sy=0,drag=0,pos=36;\n' +
      'sh.addEventListener("pointerdown",function(e){drag=1;sy=e.clientY;sh.classList.add("drag");sh.setPointerCapture&&sh.setPointerCapture(e.pointerId);});\n' +
      'sh.addEventListener("pointermove",function(e){if(!drag)return;var h=mo.getBoundingClientRect().height||140;\n' +
      '  var p=Math.max(0,Math.min(70,pos+(e.clientY-sy)/h*100));sh.style.setProperty("--ty",p+"%");});\n' +
      'sh.addEventListener("pointerup",function(){drag=0;sh.classList.remove("drag");\n' +
      '  var cur=parseFloat(sh.style.getPropertyValue("--ty"))||0;pos=cur>34?70:0;sh.style.setProperty("--ty",pos+"%");});'],
    ['inertia-strip', 'Throw & Friction Strip', `.mo.in2{cursor:grab;overflow:hidden}
.mo.in2:active{cursor:grabbing}
.mo .wp2{display:flex;gap:8px;transform:translateX(var(--x,0px));will-change:transform}
.mo .it2{flex:none;width:64px;height:64px;border-radius:var(--r,12px);background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 70%,#0b0b16),#12121c);border:1px solid rgba(255,255,255,.1);display:grid;place-items:center;font:700 12px/1 "JetBrains Mono",monospace;color:#c9c9dc}`,
      'var mo=root.querySelector(".mo"),wp=mo.querySelector(".wp2"),x=0,v=0,last=0,drag=0,sx=0;\n' +
      'mo.addEventListener("pointerdown",function(e){drag=1;sx=e.clientX;v=0;last=x;});\n' +
      'mo.addEventListener("pointermove",function(e){if(!drag)return;var nx=x+(e.clientX-sx);v=nx-x;x=nx;sx=e.clientX;});\n' +
      'mo.addEventListener("pointerup",function(){drag=0;});\n' +
      'var max=-(6*72-180);\n' +
      'api.raf(function(){if(!drag){x+=v;v*=.93;if(Math.abs(v)<.02)v=0;}\n' +
      '  if(x>0){x*=.55;v*=.4}if(x<max){x=max+(x-max)*.55;v*=.4}\n' +
      '  wp.style.transform="translateX("+x.toFixed(1)+"px)";});',
      true]
  ].forEach(function (v) {
    var inner = '';
    if (v[0] === 'drag-snap') inner = '<div class="mo dg">' + mapJoin(6, function (i) { return '<span class="cel">' + (i + 1) + '</span>'; }, '') + '</div>';
    else if (v[0] === 'drawer-drag') inner = '<div class="mo ds"><div class="sh3"><b>Sheet</b><i></i><i style="width:70%"></i></div></div>';
    else inner = '<div class="mo in2"><div class="wp2">' + mapJoin(6, function (i) { return '<span class="it2">' + ['A', 'B', 'C', 'D', 'E', 'F'][i] + '</span>'; }, '') + '</div></div>';
    mk({ g: 'drag', name: v[0], title: v[1], html: inner, css: v[2], js: v[3], cfg: STD.concat([range('Radius', '--r', 0, 24, 1, 12, 'px')]) });
  });

  /* ───────── 4. spring & physics ───────── */
  mk({
    g: 'spring', name: 'spring-modal', title: 'Spring Modal',
    html: '<div class="mo sm2"><span class="ov"></span><div class="dlg"><h5>Spring in</h5><p>Overshoots once, then settles — a real spring, not a curve.</p><div class="row"><button class="btn">Cancel</button><button class="btn ok">Confirm</button></div></div></div>',
    css: `.mo.sm2{cursor:pointer}
.mo .ov{position:absolute;inset:0;background:rgba(5,5,12,.7);opacity:0;transition:opacity var(--tt,.34s)}
.mo.on .ov{opacity:1}
.mo .dlg{position:relative;width:min(200px,86%);padding:13px;border-radius:var(--r,14px);background:linear-gradient(160deg,#20202e,#12121c);border:1px solid rgba(255,255,255,.14);box-shadow:0 30px 60px -30px #000;transform:scale(.7);opacity:0}
.mo.on .dlg{animation:sprm var(--dur,.8s) cubic-bezier(.16,1.4,.3,1) both}
@keyframes sprm{0%{transform:scale(.62) translateY(18px);opacity:0}40%{opacity:1}60%{transform:scale(1.06) translateY(-5px)}80%{transform:scale(.985) translateY(1px)}100%{transform:scale(1);opacity:1}}
.mo .dlg h5{margin:0 0 5px;font:800 14px/1.1 "Plus Jakarta Sans",system-ui;color:#fff}
.mo .dlg p{margin:0;text-align:left}
.mo .dlg .row{display:flex;gap:6px;margin-top:10px}
.mo .dlg .row .btn{flex:1}
.mo .btn.ok{background:var(--c1,${C1});border-color:transparent;color:#fff}`,
    js: 'var mo=root.querySelector(".mo");\n' +
      'mo.addEventListener("click",function(e){if(e.target.classList.contains("ov")){mo.classList.remove("on");return;}\n' +
      '  mo.classList.add("on");});'
  });
  mk({
    g: 'spring', name: 'spring-toast', title: 'Spring Toast Stack',
    html: '<div class="mo ts2"><div class="stack">' + mapJoin(3, function (i) { return '<b class="tt" style="--i:' + i + '">Saved ' + (i + 1) + '</b>'; }, '') + '</div><button class="btn">Push toast</button></div>',
    css: `.mo.ts2{display:grid;gap:12px;justify-items:center}
.mo .stack{display:flex;flex-direction:column-reverse;gap:6px;align-items:center;min-height:64px}
.mo .tt{padding:8px 12px;border-radius:9px;background:linear-gradient(160deg,color-mix(in srgb,var(--c1,${C1}) 60%,#14141f),#14141f);border:1px solid rgba(255,255,255,.14);font:600 11px/1 "Plus Jakarta Sans",system-ui;color:#fff;box-shadow:0 12px 22px -14px #000}
.mo .tt.in2{animation:tst var(--dur,.7s) cubic-bezier(.2,1.6,.3,1) both}
@keyframes tst{0%{transform:translateY(-24px) scale(.8);opacity:0}45%{transform:translateY(4px) scale(1.04);opacity:1}70%{transform:translateY(-2px) scale(.99)}100%{transform:none}}
.mo .tt.out{animation:tso var(--tt,.34s) ease-in forwards}
@keyframes tso{to{transform:translateX(120%) scale(.9);opacity:0}}`,
    js: 'var mo=root.querySelector(".mo"),st=mo.querySelector(".stack"),n=3;\n' +
      'mo.querySelector(".btn").addEventListener("click",function(){\n' +
      '  st.insertAdjacentHTML("beforeend",\'<b class="tt in2">Saved \'+(++n)+"</b>");\n' +
      '  var all=st.querySelectorAll(".tt");if(all.length>3)all[0].classList.add("out");\n' +
      '  setTimeout(function(){var a=st.querySelectorAll(".out");if(a.length)a[0].remove();},360);});'
  });
  mk({
    g: 'spring', name: 'jelly-card', title: 'Jelly Card Wobble',
    html: '<div class="mo jl2"><div class="jc"><b>Click me</b><i>i wobble</i></div></div>',
    css: `.mo .jc{width:min(170px,80%);padding:14px;border-radius:var(--r,14px);background:linear-gradient(160deg,color-mix(in srgb,var(--c1,${C1}) 55%,#14141f),#14141f);border:1px solid rgba(255,255,255,.14);display:grid;gap:4px;cursor:pointer}
.mo .jc b{font:800 14px/1.1 "Plus Jakarta Sans",system-ui;color:#fff}
.mo .jc i{font:500 11px/1.4 "JetBrains Mono",monospace;font-style:normal;color:#9a9ab0}
.mo .jc.jib{animation:jib var(--dur,.86s) cubic-bezier(.2,.9,.3,1) both}
@keyframes jib{0%{transform:scale(1,1)}18%{transform:scale(1.12,.86) rotate(-1.6deg)}36%{transform:scale(.92,1.1) rotate(1.4deg)}54%{transform:scale(1.05,.96) rotate(-.8deg)}72%{transform:scale(.98,1.02) rotate(.4deg)}100%{transform:none}}`,
    js: 'var c=root.querySelector(".jc");\n' +
      'c.addEventListener("click",function(){c.classList.remove("jib");void c.offsetWidth;c.classList.add("jib");});'
  });
  mk({
    g: 'spring', name: 'spring-tabs', title: 'Spring Tabs',
    html: '<div class="mo stb"><span class="ind"></span>' + mapJoin(3, function (i) { return '<button class="t' + (i === 0 ? ' on' : '') + '" style="--i:' + i + '">' + ['Move', 'Tune', 'Ship'][i] + '</button>'; }, '') + '<p class="pan">Content swaps with the same spring as the indicator.</p></div>',
    css: `.mo.stb{display:grid;gap:10px;justify-items:center;position:relative}
.mo .stb{display:grid;grid-template-columns:repeat(3,auto);justify-content:center;gap:4px;padding:4px;align-content:start}
.mo .stb .ind{grid-column:1/-1;grid-row:1;position:relative;height:100%;width:33.33%;border-radius:9px;background:color-mix(in srgb,var(--c1,${C1}) 40%,transparent);border:1px solid color-mix(in srgb,var(--c1,${C1}) 60%,transparent);transform-origin:0 50%;animation:none}
.mo .stb button{position:relative;z-index:1;padding:7px 12px;border:0;background:transparent;color:#9a9ab0;font:700 12px/1 "Plus Jakarta Sans",system-ui;cursor:pointer;transition:color var(--tt,.3s),transform var(--tt,.4s) cubic-bezier(.2,1.7,.3,1)}
.mo .stb button.on{color:#fff;transform:scale(1.02)}
.mo .pan{grid-column:1/-1;margin:0}`,
    js: 'var mo=root.querySelector(".stb"),bs=[].slice.call(mo.querySelectorAll("button"));\n' +
      'bs.forEach(function(b,i){b.addEventListener("click",function(){\n' +
      '  bs.forEach(function(x){x.classList.remove("on")});b.classList.add("on");b.style.transform="scale(1.14)";\n' +
      '  setTimeout(function(){b.style.transform=""},180);});});'
  });
  [
    {
      name: 'ball-bounce', title: 'Squash Bounce', cls: 'bb',
      inner: '<span class="bb2"></span><span class="grnd"></span>',
      css: `.mo.bb{align-items:end;padding-bottom:16px;display:flex;justify-content:center}
.mo .bb2{width:var(--bs,34px);height:var(--bs,34px);border-radius:50%;background:radial-gradient(circle at 34% 28%,#fff,var(--c1,${C1}) 62%);animation:bb var(--dur,1.1s) cubic-bezier(.3,0,.6,1) infinite alternate;transform-origin:50% 100%}
@keyframes bb{0%{transform:translateY(0) scale(1.16,.84)}12%{transform:translateY(6px) scale(.94,1.06)}100%{transform:translateY(-64px) scale(.98,1.02)}}
.mo .grnd{position:absolute;left:12%;right:12%;bottom:12px;height:2px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)}`,
      cfg: STD.concat([range('Ball', '--bs', 14, 60, 2, 34, 'px')])
    },
    {
      name: 'gravity-drop', title: 'Gravity Drop Row', cls: 'gd',
      inner: mapJoin(6, function (i) { return '<i style="--i:' + i + '"></i>'; }, ''),
      css: `.mo.gd{display:flex;gap:8px;align-items:flex-start;height:100%}
.mo .gd i{width:12px;height:12px;border-radius:50%;background:var(--c2,${C2});animation:gd var(--dur,1.6s) cubic-bezier(.5,0,.7,1) infinite;animation-delay:calc(var(--i) * -.12s)}
@keyframes gd{0%{transform:translateY(0);opacity:0}10%{opacity:1}55%{transform:translateY(84px)}62%{transform:translateY(84px) scale(1.2,.7)}72%{transform:translateY(56px)}86%{transform:translateY(84px)}100%{transform:translateY(84px);opacity:.2}}`
    },
    {
      name: 'spring-chain', title: 'Spring Chain', cls: 'ch2',
      inner: mapJoin(9, function (i) { return '<i style="--i:' + i + '"></i>'; }, ''),
      css: `.mo.ch2{display:flex;align-items:flex-start;justify-content:center;height:100%}
.mo .ch2 i{width:10px;height:10px;border-radius:50%;background:var(--c1,${C1});animation:ch var(--dur,1.7s) cubic-bezier(.36,.06,.24,1) infinite;animation-delay:calc(var(--i) * -.09s);box-shadow:0 0 0 1px #ffffff1a}
@keyframes ch{0%,100%{transform:translateY(18px) scale(.9)}30%{transform:translateY(-16px) scale(1.12)}}`
    },
    {
      name: 'domino-chain', title: 'Domino Chain', cls: 'dz',
      inner: mapJoin(11, function (i) { return '<b style="--i:' + i + '"></b>'; }, ''),
      css: `.mo.dz{display:flex;gap:6px;align-items:flex-end;justify-content:center;height:100%}
.mo .dz b{width:8px;height:34px;border-radius:2px;background:linear-gradient(180deg,#e9e9f5,#a8a8bc);transform-origin:50% 100%;animation:dm2 var(--dur,2.6s) cubic-bezier(.4,0,.6,1) infinite;animation-delay:calc(var(--i) * -.1s)}
@keyframes dm2{0%{transform:rotate(0)}30%,80%{transform:rotate(74deg)}100%{transform:rotate(0)}}`
    },
    {
      name: 'pendulum-clock', title: 'Pendulum Tick', cls: 'pd',
      inner: '<span class="arm"><i></i></span>',
      css: `.mo.pd{display:flex;flex-direction:column;align-items:center;padding-top:10px}
.mo .pd .arm{position:relative;width:2px;height:64px;background:linear-gradient(180deg,#4a4a60,#2a2a3a);transform-origin:50% 0;animation:pd var(--dur,2s) cubic-bezier(.45,0,.55,1) infinite alternate}
.mo .pd .arm i{position:absolute;left:50%;bottom:-11px;width:22px;height:22px;margin-left:-11px;border-radius:50%;background:radial-gradient(circle at 34% 28%,#fff,var(--c1,${C1}) 70%)}
@keyframes pd{0%{transform:rotate(-30deg)}100%{transform:rotate(30deg)}}`
    },
    {
      name: 'wobble-text', title: 'Word Wobble', cls: 'wb',
      inner: '<span class="wv3">' + mapJoin(4, function (i) { return '<b style="--i:' + i + '">' + ['feel', 'the', 'weight', 'now'][i] + '</b>'; }, '') + '</span>',
      css: `.mo .wv3{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.mo .wv3 b{font:800 clamp(14px,4.2vw,20px)/1 "Plus Jakarta Sans",system-ui;color:#fff;animation:wb var(--dur,2.4s) cubic-bezier(.3,1.4,.4,1) infinite;animation-delay:calc(var(--i) * -.18s)}
@keyframes wb{0%,70%,100%{transform:none}20%{transform:translateY(-10px) rotate(-3deg)}40%{transform:translateY(3px) rotate(2deg) scale(1.04)}}`
    }
  ].forEach(function (v) {
    mk({ g: 'spring', name: v.name, title: v.title, cls: v.cls,
      html: '<div class="mo ' + v.cls + '">' + v.inner + '</div>', css: v.css, cfg: v.cfg || STD });
  });

  /* ───────── 5. counters & marquee ───────── */
  mk({
    g: 'text', name: 'count-up-3', title: 'Count Up On View',
    html: '<div class="mo cu">' + mapJoin(3, function (i) {
      return '<span class="n2 pl" data-to="' + [128, 96, 7][i] + '" style="--i:' + i + '"><b>0</b><i>' + ['frames/s', 'effects', 'cats'][i] + '</i></span>';
    }, '') + '</div>',
    css: `.mo.cu{display:flex;gap:14px;align-items:center;justify-content:center}
.mo .n2{display:grid;justify-items:center;opacity:0;transform:translateY(var(--amp,28px));transition:all var(--dur,.6s) cubic-bezier(.2,1,.3,1);transition-delay:calc(var(--i) * var(--stg,.09s))}
.mo .n2.in{opacity:1;transform:none}
.mo .n2 b{font:800 clamp(20px,6vw,30px)/1 "JetBrains Mono",monospace;color:#fff;font-variant-numeric:tabular-nums}
.mo .n2 i{font:600 10px/1 "JetBrains Mono",monospace;font-style:normal;letter-spacing:.08em;text-transform:uppercase;color:#8b8ba3;margin-top:4px}`,
    js: IO + '\nvar ns=[].slice.call(root.querySelectorAll(".n2"));\n' +
      'ns.forEach(function(n){var to=+n.dataset.to,v=0,st=0;\n' +
      '  api.raf(function(){if(!n.classList.contains("in"))return;if(v<to){v=Math.min(to,v+Math.max(1,Math.round(to/28)));n.querySelector("b").textContent=v;}\n' +
      '    else if(st){v=0;n.querySelector("b").textContent=0;st=0;setTimeout(function(){st=1},40);}});st=1;});'
  });
  mk({
    g: 'text', name: 'digit-roll', title: 'Digit Roll Counter',
    html: '<div class="mo dr2">' + mapJoin(4, function (i) { return '<span class="col2" style="--i:' + i + '"><b>' + mapJoin(10, function (d) { return '<s>' + d + '</s>'; }, '') + '</b></span>'; }, '') + '</div>',
    css: `.mo.dr2{display:flex;gap:5px}
.mo .col2{width:var(--cw,26px);height:calc(var(--cw,26px) * 1.3);overflow:hidden;border-radius:7px;background:#0f0f18;border:1px solid rgba(255,255,255,.1)}
.mo .col2 b{display:block;transform:translateY(calc(var(--v,0) * var(--cw,26px) * -1));transition:transform var(--dur,.6s) cubic-bezier(.3,1.2,.3,1)}
.mo .col2 s{display:grid;place-items:center;height:calc(var(--cw,26px) * 1.3);text-decoration:none;font:800 16px/1 "JetBrains Mono",monospace;color:#fff}`,
    js: 'var cols=[].slice.call(root.querySelectorAll(".col2")),t=0;\n' +
      'api.raf(function(){t+=.02;var n=Math.floor(t*10)%10000;\n' +
      '  var s=("0000"+n).split("");cols.forEach(function(c,i){c.style.setProperty("--v",s[i]);});});'
  });
  mk({
    g: 'text', name: 'scramble-decode', title: 'Scramble Reveal',
    html: '<div class="mo sd2"><b class="tx">MOTION LAB</b><i>click to re-decode</i></div>',
    css: `.mo.sd2{display:grid;gap:8px;justify-items:center;cursor:pointer}
.mo .tx{font:800 clamp(18px,5.6vw,28px)/1 "JetBrains Mono",monospace;letter-spacing:.04em;color:#fff;min-height:1.2em}
.mo i{font:600 10px/1 "JetBrains Mono",monospace;font-style:normal;letter-spacing:.1em;text-transform:uppercase;color:#7f7f96}`,
    js: 'var el=root.querySelector(".tx"),full="MOTION LAB",CH="!<>-_[]{}=+*^?#";\n' +
      'function run(){var f=0;\n' +
      '  (function step(){var o="";f++;\n' +
      '    for(var i=0;i<full.length;i++){o+=i<f/3?full[i]:(full[i]===" "?" ":CH[(Math.random()*CH.length)|0]);}\n' +
      '    el.textContent=o;if(f<full.length*3+8)requestAnimationFrame(step);else el.textContent=full;})();}\n' +
      'root.querySelector(".mo").addEventListener("click",run);run();'
  });
  mk({
    g: 'text', name: 'typing-caret', title: 'Typing With Caret',
    html: '<div class="mo ty"><b class="tx2"></b><i class="cr"></i></div>',
    css: `.mo.ty{display:flex;align-items:center;justify-content:center;gap:2px}
.mo .tx2{font:600 clamp(12px,3.6vw,15px)/1.3 "JetBrains Mono",monospace;color:#c9c9dc}
.mo .cr{width:2px;height:1.1em;background:var(--c2,${C2});animation:cr var(--dur,.9s) steps(1,end) infinite}
@keyframes cr{50%{opacity:0}}`,
    js: 'var el=root.querySelector(".tx2"),lines=["ease: cubic-bezier(.2,.9,.2,1)","60fps, no build step","tune every effect live"];var l=0,i=0,del=0,t=0;\n' +
      'api.raf(function(){t++;if(t%3)return;var s=lines[l];\n' +
      '  if(!del){i++;if(i>=s.length){del=1;t=0;}}else{i--;if(i<=0){del=0;l=(l+1)%lines.length;}}\n' +
      '  el.textContent=s.slice(0,i);});'
  });
  [
    ['marquee-tilt', 'Tilted Marquee', `.mo.mq2{display:block;padding:0;background:transparent;border:0}
.mo .strip2{overflow:hidden;transform:rotate(var(--rot,-6deg));width:130%;margin-left:-15%}
.mo .strip2 div{display:flex;gap:14px;width:max-content;animation:mq var(--dur,14s) linear infinite}
.mo .strip2 div span{flex:none;font:800 clamp(16px,4.6vw,22px)/1 "Plus Jakarta Sans",system-ui;color:color-mix(in srgb,var(--c1,${C1}) 40%,#fff);white-space:nowrap;padding-right:14px}
.mo .strip2.r2 div{animation-direction:reverse}
.mo .strip2.r2 div span{color:color-mix(in srgb,var(--c2,${C2}) 34%,#fff)}
@keyframes mq{to{transform:translateX(-50%)}}`],
    ['marquee-mask', 'Fade-Edge Marquee', `.mo.mq3{padding:0}
.mo .strip3{display:flex;gap:10px;width:max-content;animation:mq var(--dur,10s) linear infinite;mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.mo .strip3 b{flex:none;padding:7px 12px;border-radius:99px;border:1px solid rgba(255,255,255,.14);background:#16161f;font:600 11px/1 "Plus Jakarta Sans",system-ui;color:#c4c4d8;white-space:nowrap}
@keyframes mq{to{transform:translateX(-50%)}}`],
    ['ticker-v', 'Vertical Ticker', `.mo.tv{padding:0;overflow:hidden}
.mo .col3{display:grid;gap:6px;width:100%;padding:8px;box-sizing:border-box;animation:tv var(--dur,6s) cubic-bezier(.4,0,.2,1) infinite}
@keyframes tv{0%,12%{transform:translateY(0)}25%,37%{transform:translateY(-33.4%)}50%,62%{transform:translateY(-66.8%)}75%,100%{transform:translateY(-100%)}}
.mo .col3 b{display:flex;align-items:center;gap:7px;font:600 12px/1 "Plus Jakarta Sans",system-ui;color:#dcdce8}
.mo .col3 b i{width:6px;height:6px;border-radius:50%;background:var(--c2,${C2});font-style:normal}`]
  ].forEach(function (v) {
    var inner = '';
    if (v[0] === 'marquee-tilt') {
      var words = '<span>animation · interaction · easing · 60fps · motion design · tokens · </span>';
      inner = '<div class="mo mq2"><div class="strip2"><div>' + words + words + '</div></div><div class="strip2 r2"><div>' + words + words + '</div></div></div>';
    } else if (v[0] === 'marquee-mask') {
      var t = mapJoin(5, function (i) { return '<b>' + ['Scroll', 'Hover', 'Drag', 'Tap', 'Spring'][i] + '</b>'; }, '');
      inner = '<div class="mo mq3"><div class="strip3">' + t + t + '</div></div>';
    } else {
      inner = '<div class="mo tv"><div class="col3">' + mapJoin(12, function (i) {
        return '<b><i></i>' + ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Alpha'][i] + '</b>';
      }, '') + '</div></div>';
    }
    mk({ g: 'text', name: v[0], title: v[1], html: inner, css: v[2] });
  });

  /* ───────── 6. view transitions & sticky ───────── */
  mk({
    g: 'view', name: 'flip-list', title: 'FLIP Reorder',
    html: '<div class="mo fp2"><div class="lst">' + mapJoin(5, function (i) { return '<b class="rw" style="--i:' + i + '">' + ['Intro', 'Build up', 'Loop', 'Break', 'Outro'][i] + '</b>'; }, '') + '</div><button class="btn sh">Shuffle</button></div>',
    css: `.mo.fp2{display:grid;gap:10px;justify-items:center}
.mo .lst{display:grid;gap:5px;width:min(196px,88%)}
.mo .rw{padding:8px 10px;border-radius:9px;background:#191926;border:1px solid rgba(255,255,255,.12);font:600 12px/1 "Plus Jakarta Sans",system-ui;color:#dcdce8;transform-origin:50% 50%}
.mo .rw.mv{transition:transform var(--dur,.5s) cubic-bezier(.3,1.2,.3,1)}
.mo .btn:hover{background:color-mix(in srgb,var(--c1,${C1}) 30%,#191926)}`,
    js: 'var lst=root.querySelector(".lst"),btn=root.querySelector(".btn.sh");\n' +
      'btn.addEventListener("click",function(){\n' +
      '  var rows=[].slice.call(lst.children),first=new Map();\n' +
      '  rows.forEach(function(r){first.set(r,r.getBoundingClientRect().top);});\n' +
      '  for(var i=rows.length-1;i>0;i--){var j=(Math.random()*(i+1))|0;lst.insertBefore(rows[i],rows[j]);}\n' +
      '  var next=[].slice.call(lst.children);\n' +
      '  next.forEach(function(r){var d=first.get(r)-r.getBoundingClientRect().top;\n' +
      '    if(!d)return;r.style.transition="none";r.style.transform="translateY("+d+"px)";});\n' +
      '  requestAnimationFrame(function(){next.forEach(function(r){r.style.transition="";r.style.transform="";});});});'
  });
  mk({
    g: 'view', name: 'shared-element', title: 'Shared Element Expand',
    html: '<div class="mo se"><div class="thumb"><b>→</b></div><div class="big"><h4>Detail</h4><p>The thumbnail morphs into the panel — same element, new geometry.</p></div></div>',
    css: `.mo.se{display:flex;gap:12px;align-items:center}
.mo .thumb{width:56px;height:56px;border-radius:var(--r,12px);background:linear-gradient(150deg,var(--c1,${C1}),color-mix(in srgb,var(--c2,${C2}) 70%,#000));display:grid;place-items:center;color:#0c0c16;font-size:20px;cursor:pointer;transition:transform var(--dur,.5s) cubic-bezier(.3,1.2,.3,1),border-radius .4s;flex:none}
.mo .big{flex:1;min-width:0;opacity:.5;transform:translateX(-6px);transition:opacity var(--tt,.4s),transform var(--tt,.44s) cubic-bezier(.2,1.2,.3,1)}
.mo.on .thumb{transform:translateX(var(--amp,28px)) scale(.8);border-radius:50%}
.mo.on .big{opacity:1;transform:none}
.mo .big h4{margin:0 0 4px;font-size:14px}
.mo .big p{font-size:10.5px;margin:0}`,
    js: 'var mo=root.querySelector(".mo");\n' +
      'mo.addEventListener("click",function(){mo.classList.toggle("on");});'
  });
  mk({
    g: 'view', name: 'clip-expand', title: 'Clip Circle Expand',
    html: '<div class="mo ce"><span class="ov2">expanded</span><button class="btn op">Expand</button></div>',
    css: `.mo.ce{padding:0;overflow:hidden}
.mo .ov2{position:absolute;inset:0;display:grid;place-items:center;background:linear-gradient(140deg,var(--c1,${C1}),var(--c2,${C2}));color:#0b0b16;font:800 15px/1 "Plus Jakarta Sans",system-ui;clip-path:circle(0% at 50% 60%);transition:clip-path var(--dur,.72s) cubic-bezier(.3,1,.3,1)}
.mo.on .ov2{clip-path:circle(130% at 50% 60%)}
.mo .btn{position:relative;z-index:1}`,
    js: 'var mo=root.querySelector(".mo");\n' +
      'mo.querySelector(".btn").addEventListener("click",function(){mo.classList.toggle("on");});'
  });
  mk({
    g: 'view', name: 'morph-box', title: 'Box Morphs To Circle',
    html: '<div class="mo mb"><span class="shp"><b>morph</b></span></div>',
    css: `.mo .shp{width:var(--mw,92px);height:var(--mh,64px);border-radius:var(--mr,12px);background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 85%,#000),color-mix(in srgb,var(--c2,${C2}) 45%,#0b0b16));display:grid;place-items:center;color:#fff;font:700 12px/1 "Plus Jakarta Sans",system-ui;cursor:pointer;transition:width var(--tt,.5s) cubic-bezier(.3,1.3,.4,1),height var(--tt,.5s),border-radius var(--tt,.5s),background .4s;animation:mb var(--dur,4.4s) cubic-bezier(.4,0,.2,1) infinite alternate}
@keyframes mb{0%{width:var(--mw,92px);height:var(--mh,64px);border-radius:var(--mr,12px)}100%{width:var(--mh,64px);height:var(--mh,64px);border-radius:50%}}
.mo .shp:hover{animation-play-state:paused}`,
    cfg: [range('Wide', '--mw', 60, 160, 2, 92, 'px'), range('High', '--mh', 40, 120, 2, 64, 'px'), range('Corner', '--mr', 0, 40, 1, 12, 'px'), col('A', '--c1', C1), col('B', '--c2', C2)]
  });
  [
    ['sticky-stack', 'Sticky Card Stack', `.mo.sks{align-items:start;gap:8px;display:grid;padding:14px}
.mo .sks b{position:sticky;top:var(--stick,10px);padding:12px;border-radius:var(--r,12px);background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 60%,#14141f),#14141f);border:1px solid rgba(255,255,255,.12);font:700 12px/1.2 "Plus Jakarta Sans",system-ui;color:#fff;transform:translateY(var(--o,0px)) scale(var(--s3,1));transition:transform var(--tt,.4s) cubic-bezier(.2,1.2,.3,1),box-shadow .3s;box-shadow:0 -8px 20px -14px #000}
.mo .sks b:nth-child(2){--o:6px;--s3:.985;background:linear-gradient(150deg,color-mix(in srgb,var(--c2,${C2}) 50%,#14141f),#14141f)}
.mo .sks b:nth-child(3){--o:12px;--s3:.97;background:linear-gradient(150deg,color-mix(in srgb,var(--c3,${C3}) 45%,#14141f),#14141f)}
.mo .sks:hover b{--o:0px;--s3:1}`, ''],
    ['pinned-progress', 'Pinned Scroll Progress', `.mo.pp2{display:grid;gap:10px;align-content:center}
.mo .bar2{position:relative;height:6px;border-radius:99px;background:#22222f;overflow:hidden}
.mo .bar2 b{position:absolute;inset:0;width:var(--sp2,0%);background:linear-gradient(90deg,var(--c1,${C1}),var(--c2,${C2}));transition:width .1s linear}
.mo .pct{font:800 26px/1 "JetBrains Mono",monospace;color:#fff;font-variant-numeric:tabular-nums}
.mo .hint{font:600 10px/1 "JetBrains Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:#7f7f96}`, 'js'],
    ['stacked-panels', 'Stacked Panels Slide', `.mo.sps{display:flex;gap:8px;align-items:center}
.mo .sps .pn4{width:var(--pw4,54px);height:70px;border-radius:var(--r,10px);background:#191926;border:1px solid rgba(255,255,255,.12);transform:translateY(var(--o,0));transition:transform var(--tt,.44s) cubic-bezier(.2,1.4,.3,1),background .3s,width var(--tt,.4s)}
.mo .sps:hover .pn4{--o:-10px}
.mo .sps .pn4:nth-child(2){transition-delay:.05s;background:color-mix(in srgb,var(--c1,${C1}) 30%,#191926)}
.mo .sps .pn4:nth-child(3){transition-delay:.1s;background:color-mix(in srgb,var(--c2,${C2}) 30%,#191926)}
.mo .sps .pn4:nth-child(4){transition-delay:.15s;background:color-mix(in srgb,var(--c3,${C3}) 30%,#191926)}`, ''],
    ['nav-dots', 'Scroll Spy Dots', `.mo.nd{display:flex;gap:12px;align-items:center}
.mo .nd .col4{display:grid;gap:5px}
.mo .nd .col4 i{width:10px;height:10px;border-radius:50%;background:#2b2b3c;transition:transform var(--tt,.4s) cubic-bezier(.3,1.6,.4,1),background .3s}
.mo .nd .col4 i.on{background:var(--c1,${C1});transform:scale(1.5)}
.mo .nd .pg{width:110px;height:64px;border-radius:9px;background:#16161f;border:1px solid rgba(255,255,255,.1);display:grid;place-items:center;font:700 12px/1 "JetBrains Mono",monospace;color:#fff;transition:transform var(--tt,.4s) cubic-bezier(.2,1.3,.3,1)}
.mo .nd .pg.s{transform:translateY(var(--amp,28px));opacity:.4}`, 'js']
  ].forEach(function (v) {
    var inner = '';
    if (v[0] === 'sticky-stack') inner = '<div class="mo sks"><b>Section one</b><b>Section two</b><b>Section three</b></div>';
    else if (v[0] === 'pinned-progress') inner = '<div class="mo pp2"><span class="pct">0%</span><span class="bar2"><b></b></span><span class="hint">auto-advances · scroll to scrub</span></div>';
    else if (v[0] === 'stacked-panels') inner = '<div class="mo sps">' + mapJoin(4, function () { return '<span class="pn4"></span>'; }, '') + '</div>';
    else inner = '<div class="mo nd"><span class="col4">' + mapJoin(4, function (i) { return '<i class="' + (i === 0 ? 'on' : '') + '" style="--i:' + i + '"></i>'; }, '') + '</span><span class="pg">01</span></div>';
    mk({
      g: 'view', name: v[0], title: v[1], html: inner, css: v[2],
      js: v[3] === 'js' ? (v[0] === 'pinned-progress'
        ? 'var mo=root.querySelector(".mo"),b=mo.querySelector(".bar2 b"),t=mo.querySelector(".pct"),p=0,d=1;\n' +
          'function set(v){p=Math.max(0,Math.min(100,v));b.style.width=p+"%";t.textContent=Math.round(p)+"%";mo.__r=1;}\n' +
          'mo.addEventListener("wheel",function(e){e.preventDefault&&e.preventDefault();set(p+e.deltaY*.08);},{passive:false});\n' +
          'api.raf(function(){if(!mo.__r)set(p+d*.5);else mo.__r=0;if(p>=100)d=-1;if(p<=0)d=1;});'
        : 'var mo=root.querySelector(".mo"),ds=[].slice.call(mo.querySelectorAll(".col4 i")),pg=mo.querySelector(".pg"),i=0,t=0;\n' +
          'api.raf(function(){t++;if(t%70)return;i=(i+1)%ds.length;\n' +
          '  ds.forEach(function(d,n){d.classList.toggle("on",n===i)});\n' +
          '  pg.classList.add("s");setTimeout(function(){pg.classList.remove("s");pg.textContent="0"+(i+1);},120);});')
        : undefined
    });
  });

  /* ───────── 7. hover motion & gestures ───────── */
  [
    ['zoom-caption', 'Zoom & Caption Slide', `.mo.zc{padding:0}
.mo .fig{position:relative;width:100%;height:100%;min-height:132px;overflow:hidden;border-radius:var(--r,12px);background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 70%,#000),color-mix(in srgb,var(--c2,${C2}) 30%,#0b0b16))}
.mo .fig::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(115deg,rgba(255,255,255,.07) 0 8px,transparent 8px 18px);transition:transform var(--dur,.9s) ease-out}
.mo .fig:hover::before{transform:scale(1.16) rotate(2deg)}
.mo .cap2{position:absolute;left:0;right:0;bottom:0;padding:10px 12px;background:linear-gradient(180deg,transparent,rgba(6,6,14,.86));transform:translateY(101%);transition:transform var(--tt,.44s) cubic-bezier(.2,1.1,.3,1)}
.mo .fig:hover .cap2{transform:none}
.mo .cap2 b{display:block;font:700 13px/1.1 "Plus Jakarta Sans",system-ui;color:#fff;transform:translateY(10px);transition:transform var(--tt,.5s) .05s cubic-bezier(.2,1.2,.3,1)}
.mo .fig:hover .cap2 b{transform:none}`, '<div class="fig"><span class="cap2"><b>Ken Burns + caption</b></span></div>'],
    ['icon-jiggle', 'Icon Jiggle', `.mo.ij{display:flex;gap:14px;align-items:center}
.mo .ij svg{width:26px;height:26px;fill:none;stroke:var(--c1,${C1});stroke-width:2;stroke-linecap:round;cursor:pointer;transition:transform var(--tt,.4s) cubic-bezier(.2,1.7,.3,1),stroke .3s}
.mo .ij svg:hover{animation:jig var(--dur,.5s) ease-in-out;stroke:var(--c2,${C2})}
@keyframes jig{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg) scale(1.14)}45%{transform:rotate(12deg) scale(1.1)}70%{transform:rotate(-6deg) scale(1.04)}}`, '<svg viewBox="0 0 24 24"><path d="M12 3v9M7 8l5-5 5 5"/><path d="M4 15v4h16v-4"/></svg><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg>'],
    ['underline-grow', 'Underline Grow From Center', `.mo.ug{display:grid;gap:10px;justify-items:center}
.mo .ug a{position:relative;font:800 clamp(14px,4.4vw,19px)/1.1 "Plus Jakarta Sans",system-ui;color:#fff;text-decoration:none;padding-bottom:6px}
.mo .ug a::after{content:"";position:absolute;left:50%;bottom:0;width:0;height:2px;background:var(--c2,${C2});transform:translateX(-50%);transition:width var(--tt,.42s) cubic-bezier(.2,1,.3,1)}
.mo .ug a:hover::after{width:100%}
.mo .ug a:nth-child(2)::after{background:var(--c1,${C1});height:8px;opacity:.32;border-radius:4px;bottom:2px}
.mo .ug a:nth-child(3)::after{clip-path:polygon(0 0,100% 0,100% 100%,0 100%);height:2px;background:linear-gradient(90deg,var(--c3,${C3}),var(--c2,${C2}))}`, '<a href="#">Hover for underline</a><a href="#">Highlighter swipe</a><a href="#">Gradient rule</a>'],
    ['border-draw', 'Border Draw On Hover', `.mo.bd{padding:16px}
.mo .box4{position:relative;width:min(196px,86%);height:96px;border-radius:var(--r,10px);display:grid;place-items:center;color:#fff;font:700 13px/1 "Plus Jakarta Sans",system-ui;overflow:hidden}
.mo .box4::before,.mo .box4::after{content:"";position:absolute;width:100%;height:100%;border:2px solid var(--c1,${C1});border-radius:inherit;transition:clip-path var(--dur,.7s) cubic-bezier(.4,0,.2,1)}
.mo .box4::before{clip-path:polygon(0 0,0 0,0 100%,0 100%)}
.mo .box4::after{clip-path:polygon(100% 0,100% 0,100% 100%,100% 100%)}
.mo .box4:hover::before{clip-path:polygon(0 0,100% 0,100% 50%,0 50%)}
.mo .box4:hover::after{clip-path:polygon(100% 50%,0 50%,0 100%,100% 100%)}
.mo .box4 i{position:absolute;inset:0;background:radial-gradient(120% 80% at 50% 120%,color-mix(in srgb,var(--c1,#7c5cff) 30%,transparent),transparent 70%);opacity:0;transition:opacity var(--tt,.4s)}
.mo .box4:hover i{opacity:1}`, '<div class="box4">hover me<i></i></div>'],
    ['ken-burns', 'Ken Burns Pan', `.mo.kb{padding:0}
.mo .kb2{position:absolute;inset:-8%;background:linear-gradient(120deg,color-mix(in srgb,var(--c1,${C1}) 65%,#000),color-mix(in srgb,var(--c2,${C2}) 35%,#0b0b16)),radial-gradient(60% 50% at 30% 30%,#ffffff33,transparent 60%);animation:kb var(--dur,14s) ease-in-out infinite alternate;background-blend-mode:screen}
@keyframes kb{0%{transform:scale(1) translate(0,0)}100%{transform:scale(1.14) translate(-4%,3%)}}
.mo .kb2::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,.16) 0 2px,transparent 2px 4px)}`, '<span class="kb2"></span>'],
    ['shine-move', 'Shine Tracks Cursor', `.mo.sh2{padding:0;overflow:hidden}
.mo .card3{position:relative;width:100%;height:100%;min-height:132px;display:grid;place-items:center;background:linear-gradient(160deg,#1c1c2a,#101018);color:#fff;font:700 13px/1 "Plus Jakarta Sans",system-ui}
.mo .card3::after{content:"";position:absolute;inset:-40%;background:radial-gradient(200px circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,.16),transparent 60%);opacity:0;transition:opacity .3s;pointer-events:none}
.mo .card3:hover::after{opacity:1}`, '<div class="card3">move the cursor</div>']
  ].forEach(function (v) {
    mk({
      g: 'hover', name: v[0], title: v[1],
      html: '<div class="mo ' + v[0].split('-')[0] + '">' + (v[3] || '') + '</div>',
      css: v[2],
      js: v[0] === 'shine-move'
        ? 'var c=root.querySelector(".card3");\n' +
          'c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect();if(!r.width)return;\n' +
          '  c.style.setProperty("--gx",((e.clientX-r.left)/r.width*100).toFixed(1)+"%");\n' +
          '  c.style.setProperty("--gy",((e.clientY-r.top)/r.height*100).toFixed(1)+"%");});'
        : undefined
    });
  });
  [
    ['wheel-rotate', 'Wheel Rotate Dial', `.mo.wd{cursor:ns-resize}
.mo .dial2{position:relative;width:104px;height:104px;border-radius:50%;background:conic-gradient(from 0deg,color-mix(in srgb,var(--c1,${C1}) 85%,#000),color-mix(in srgb,var(--c2,${C2}) 80%,#000) 60%,#14141f 60%);transform:rotate(var(--a,0deg));transition:transform .1s linear;display:grid;place-items:center;box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)}
.mo .dial2::after{content:"";position:absolute;left:50%;top:9px;width:4px;height:16px;margin-left:-2px;border-radius:4px;background:#fff}
.mo .num2{position:absolute;bottom:-2px;padding:3px 8px;border-radius:99px;background:#0d0d16;border:1px solid rgba(255,255,255,.14);font:700 11px/1 "JetBrains Mono",monospace;color:#fff}`,
      'var mo=root.querySelector(".mo"),d=mo.querySelector(".dial2"),n=mo.querySelector(".num2"),a=0;\n' +
      'function set(){d.style.setProperty("--a",a+"deg");n.textContent=Math.round(((a%360)+360)%360)+"\u00b0";}\n' +
      'mo.addEventListener("wheel",function(e){e.preventDefault&&e.preventDefault();a+=e.deltaY*.4;set();},{passive:false});\n' +
      'mo.addEventListener("pointerdown",function(){a+=45;set();});set();'],
    ['long-press', 'Long Press Action', `.mo.lp{cursor:pointer}
.mo .hold{position:relative;width:78px;height:78px;border-radius:50%;background:#191926;border:1px solid rgba(255,255,255,.14);display:grid;place-items:center;color:#c4c4d8;font:700 11px/1 "Plus Jakarta Sans",system-ui;transition:transform var(--tt,.3s) cubic-bezier(.3,1.6,.4,1),background .3s}
.mo .hold::before{content:"";position:absolute;inset:-6px;border-radius:50%;border:3px solid var(--c1,${C1});clip-path:inset(0 0 0 0);transform:rotate(-90deg);opacity:0}
.mo.prg .hold::before{opacity:1;animation:lp var(--dur,1s) linear forwards}
@keyframes lp{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
.mo.done .hold{background:var(--c2,${C2});color:#04131b;transform:scale(1.1)}`,
      'var mo=root.querySelector(".mo"),h=mo.querySelector(".hold"),t=null;\n' +
      'function end(){clearTimeout(t);t=null;mo.classList.remove("prg");}\n' +
      'h.addEventListener("pointerdown",function(){mo.classList.add("prg");t=setTimeout(function(){mo.classList.add("done");mo.classList.remove("prg");\n' +
      '  setTimeout(function(){mo.classList.remove("done")},900);},1000);});\n' +
      'h.addEventListener("pointerup",end);h.addEventListener("pointerleave",end);\n' +
      'api.onCleanup(function(){clearTimeout(t);});'],
    ['dbl-heart', 'Double Tap Heart', `.mo.dt{cursor:pointer}
.mo .ph{position:relative;width:min(190px,86%);height:88px;border-radius:var(--r,12px);background:linear-gradient(150deg,#1d1d2b,#121220);border:1px solid rgba(255,255,255,.1);display:grid;place-items:center;color:#8b8ba3;font:600 11px/1 "JetBrains Mono",monospace}
.mo .ph i{position:absolute;left:50%;top:50%;width:52px;height:52px;margin:-26px;font-size:52px;line-height:1;color:var(--c3,${C3});opacity:0;pointer-events:none;filter:drop-shadow(0 6px 16px rgba(255,92,138,.6))}
.mo.pop .ph i{animation:dt var(--dur,.9s) cubic-bezier(.2,1.5,.3,1) both}
@keyframes dt{0%{opacity:0;transform:scale(.2) rotate(-14deg)}30%{opacity:1;transform:scale(1.25) rotate(4deg)}60%{transform:scale(1)}100%{opacity:0;transform:scale(1.1) translateY(-24px)}}
.mo .ph::after{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(circle at 50% 50%,color-mix(in srgb,var(--c3,${C3}) 40%,transparent),transparent 60%);opacity:0;transition:opacity .3s}
.mo.pop .ph::after{opacity:1}`,
      'var mo=root.querySelector(".mo"),last=0;\n' +
      'mo.addEventListener("click",function(){var t=+new Date();\n' +
      '  if(t-last<400){mo.classList.remove("pop");void mo.offsetWidth;mo.classList.add("pop");}\n' +
      '  last=t;});'],
    ['focus-travel', 'Focus Ring Travel', `.mo.ft{display:flex;gap:8px}
.mo .ft2{position:relative;padding:9px 12px;border-radius:9px;background:#191926;border:1px solid rgba(255,255,255,.1);color:#c4c4d8;font:600 12px/1 "Plus Jakarta Sans",system-ui;cursor:pointer;outline:none;transition:color .2s}
.mo .ft2:hover,.mo .ft2:focus{color:#fff}
.mo .ring3{position:absolute;left:0;top:0;width:0;height:0;border-radius:10px;border:2px solid var(--c2,${C2});pointer-events:none;transition:transform var(--tt,.42s) cubic-bezier(.3,1.2,.3,1),width var(--tt,.42s),height var(--tt,.42s);box-shadow:0 0 14px -2px color-mix(in srgb,var(--c2,${C2}) 70%,transparent)}
.mo .ring3.hid{opacity:0}`,
      'var mo=root.querySelector(".mo"),ring=mo.querySelector(".ring3"),bs=[].slice.call(mo.querySelectorAll(".ft2"));\n' +
      'function to(el){var r=el.getBoundingClientRect(),m=mo.getBoundingClientRect();if(!r.width)return;\n' +
      '  ring.style.width=r.width+"px";ring.style.height=r.height+"px";\n' +
      '  ring.style.transform="translate("+(r.left-m.left)+"px,"+(r.top-m.top)+"px)";ring.classList.remove("hid");}\n' +
      'bs.forEach(function(b){b.addEventListener("focus",function(){to(b)});b.addEventListener("pointerenter",function(){to(b)});});\n' +
      'mo.addEventListener("pointerleave",function(){ring.classList.add("hid")});ring.classList.add("hid");']
  ].forEach(function (v) {
    var inner = '';
    if (v[0] === 'wheel-rotate') inner = '<div class="mo wd"><span class="dial2"></span><span class="num2">0\u00b0</span></div>';
    if (v[0] === 'long-press') inner = '<div class="mo lp"><span class="hold">hold</span></div>';
    if (v[0] === 'dbl-heart') inner = '<div class="mo dt"><div class="ph">double tap<i>\u2665</i></div></div>';
    if (v[0] === 'focus-travel') inner = '<div class="mo ft">' + mapJoin(3, function (i) { return '<button class="ft2">' + ['Tab', 'Next', 'Go'][i] + '</button>'; }, '') + '<span class="ring3"></span></div>';
    mk({ g: 'gesture', name: v[0], title: v[1], html: inner, css: v[2], js: v[3] });
  });

  /* ───────── 8. more reveals, pointer tricks, gestures ───────── */
  var IO2 = 'var mo=root.querySelector(".mo"),t=[].slice.call(root.querySelectorAll(".pl"));\n' +
    'var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle("in",e.isIntersecting);});},{threshold:.3});\n' +
    't.forEach(function(el){io.observe(el);});\n' +
    'mo.addEventListener("click",function(){t.forEach(function(el){el.classList.remove("in");setTimeout(function(){el.classList.add("in")},40);});});\n' +
    'api.onCleanup(function(){io.disconnect();});';
  var REVEAL_BLOCK = '<div style="display:grid;gap:8px;justify-items:center;width:100%">' +
    '<h4 class="pl" style="--i:0">Into view</h4><p class="pl" style="--i:1">Plays as the card scrolls in. Click to replay.</p>' +
    '<button class="btn pl" style="--i:2">Got it</button></div>';

  [
    ['reveal-circle', 'Circle Mask Reveal', `.mo .pl{clip-path:circle(0% at 50% 50%);opacity:.25;transition:clip-path var(--dur,.9s) cubic-bezier(.3,1,.3,1),opacity var(--tt,.5s);transition-delay:calc(var(--i,0) * var(--stg,.09s))}
.mo .pl.in{clip-path:circle(75% at 50% 50%);opacity:1}`, ''],
    ['reveal-flipy', 'Flip In On View', `.mo .pl{transform:perspective(700px) rotateY(-74deg);opacity:0;transition:transform var(--dur,.82s) cubic-bezier(.25,1.2,.3,1),opacity .4s;transition-delay:calc(var(--i,0) * var(--stg,.09s))}
.mo .pl.in{transform:none;opacity:1}`, ''],
    ['reveal-stack', 'Stacked Slide Up', `.mo .pl{transform:translateY(calc(var(--amp,28px) * 1.6)) scale(.96);opacity:0;transition:transform var(--dur,.72s) cubic-bezier(.16,1,.3,1),opacity .5s;transition-delay:calc(var(--i,0) * var(--stg,.09s))}
.mo .pl.in{transform:none;opacity:1}
.mo h4.pl,.mo p.pl,.mo .btn.pl{box-shadow:0 18px 30px -26px #000}`, ''],
    ['reveal-words-wave', 'Word Wave In', `.mo .wv{display:flex;gap:.28em;flex-wrap:wrap;justify-content:center}
.mo .wv i{display:inline-block;font:800 clamp(14px,4.2vw,20px)/1 "Plus Jakarta Sans",system-ui;color:#fff;transform:translateY(var(--amp,28px));opacity:0;transition:transform var(--dur,.7s) cubic-bezier(.2,1.6,.3,1),opacity .4s;transition-delay:calc(var(--i) * var(--stg,.09s))}
.mo .wv.in i{transform:none;opacity:1}`, 'words'],
    ['reveal-stroke', 'Outlined To Filled', `.mo .pl{color:transparent;-webkit-text-stroke:1.4px var(--c1,${C1});transition:color var(--dur,.7s) ease,-webkit-text-stroke-color var(--dur,.7s) ease;transition-delay:calc(var(--i,0) * var(--stg,.09s))}
.mo .pl.in{color:#fff;-webkit-text-stroke-color:transparent}`, ''],
    ['reveal-tilt-drift', 'Drift And Straighten', `.mo .pl{transform:translate(var(--amp,28px),var(--amp,28px)) rotate(6deg);opacity:0;transition:transform var(--dur,.9s) cubic-bezier(.2,1,.3,1),opacity .6s;transition-delay:calc(var(--i,0) * var(--stg,.09s))}
.mo .pl.in{transform:none;opacity:1}`, ''],
    ['reveal-lines-down', 'Line By Line Drop', `.mo .l3{overflow:hidden}
.mo .l3 u{display:block;text-decoration:none;transform:translateY(120%);transition:transform var(--dur,.66s) cubic-bezier(.22,1,.28,1);transition-delay:calc(var(--i,0) * var(--stg,.09s))}
.mo .l3.in u{transform:none}`, 'lines']
  ].forEach(function (v) {
    var inner = REVEAL_BLOCK;
    if (v[3] === 'words') {
      var words = ['Motion', 'lab', 'tunes', 'live'];
      inner = '<span class="wv pl">' + mapJoin(words.length, function (i) { return '<i style="--i:' + i + '">' + words[i] + '</i>'; }, '') + '</span>';
    } else if (v[3] === 'lines') {
      var ls = ['Reveal lines', 'one after the other', 'stagger is a token', 'tune the delay'];
      inner = '<div style="display:grid;gap:6px;justify-items:center;width:100%">' + mapJoin(4, function (i) {
        return '<b class="l3 pl" style="--i:' + i + ';font:700 ' + [19, 14, 12, 11][i] + 'px/1.25 "Plus Jakarta Sans",system-ui;color:#fff"><u>' + ls[i] + '</u></b>';
      }, '') + '</div>';
    }
    mk({ g: 'reveal', name: v[0], title: v[1], html: '<div class="mo">' + inner + '</div>', css: v[2], js: IO2 });
  });

  /* scroll-linked (page driven) */
  var SCROLL_JS = 'var mo=root.querySelector(".mo"),g=root.querySelector(".g");\n' +
    'function upd(){var r=mo.getBoundingClientRect(),vh=window.innerHeight||600;\n' +
    '  var p=(vh-r.top)/Math.max(1,r.height+vh);p=Math.max(0,Math.min(1,p));\n' +
    '  g.style.setProperty("--t",p.toFixed(3));}\n' +
    'window.addEventListener("scroll",upd,{passive:true});window.addEventListener("resize",upd);\n' +
    'api.raf(upd);upd();';
  var SCROLL_CFG = [col('A', '--c1', C1), col('B', '--c2', C2), range('Travel', '--amp', 6, 80, 2, 34, 'px'), range('Radius', '--r', 0, 26, 1, 14, 'px')];
  function scrollItem(name, title, css, inner) {
    mk({
      g: 'scroll', name: name, title: title,
      html: '<div class="mo sc2">' + (inner || '<span class="g"></span>') + '<i class="hint">scroll the page</i></div>',
      css: css, js: SCROLL_JS, cfg: SCROLL_CFG
    });
  }
  scrollItem('scroll-progress-bar', 'Reading Progress Rule', `.mo.sc2{display:grid;gap:14px;align-content:center}
.mo .g{position:relative;width:min(210px,92%);height:8px;border-radius:99px;background:#22222f;overflow:hidden}
.mo .g::after{content:"";position:absolute;inset:0;width:calc(var(--t,0) * 100%);background:linear-gradient(90deg,var(--c1,${C1}),var(--c2,${C2}))}
.mo .hint{font:600 10px/1 "JetBrains Mono",monospace;font-style:normal;letter-spacing:.1em;text-transform:uppercase;color:#7f7f96}`);
  scrollItem('scroll-rotate', 'Scroll Rotate', `.mo.sc2{gap:16px}
.mo .g{width:76px;height:76px;border-radius:var(--r,18px);background:linear-gradient(150deg,var(--c1,${C1}),var(--c2,${C2}));transform:rotate(calc(var(--t,0) * 360deg)) scale(calc(.7 + var(--t,0) * .3));box-shadow:0 20px 30px -20px #000}
.mo .hint{font:600 10px/1 "JetBrains Mono",monospace;font-style:normal;letter-spacing:.1em;text-transform:uppercase;color:#7f7f96}`);
  scrollItem('scroll-letters', 'Letter Spread', `.mo.sc2{gap:8px}
.mo .g{display:flex;justify-content:center;font:800 clamp(16px,5vw,24px)/1 "Plus Jakarta Sans",system-ui;color:#fff;text-transform:uppercase}
.mo .g span{display:inline-block;margin:0 calc(var(--t,0) * .1em);opacity:calc(.3 + var(--t,0) * .7);transform:translateY(calc((.5 - var(--t,0)) * var(--amp,34px) * var(--s,1)))}
.mo .g span:nth-child(2n){--s:-1}
.mo .hint{font:600 10px/1 "JetBrains Mono",monospace;font-style:normal;letter-spacing:.1em;text-transform:uppercase;color:#7f7f96}`,
    '<span class="g"><span>M</span><span>O</span><span>T</span><span>I</span><span>O</span><span>N</span></span>');
  scrollItem('scroll-hue', 'Scroll Colour Shift', `.mo.sc2{gap:12px}
.mo .g{width:min(210px,90%);height:64px;border-radius:var(--r,14px);background:linear-gradient(calc(var(--t,0) * 360deg),hsl(calc(var(--t,0) * 300) 82% 62%),hsl(calc(60 + var(--t,0) * 300) 84% 58%));box-shadow:0 0 calc(var(--t,0) * 40px) -6px hsl(calc(var(--t,0) * 300) 80% 60% / .8)}
.mo .hint{font:600 10px/1 "JetBrains Mono",monospace;font-style:normal;letter-spacing:.1em;text-transform:uppercase;color:#7f7f96}`);
  scrollItem('scroll-layers', 'Three Layer Parallax', `.mo.sc2{display:block;padding:0;overflow:hidden}
.mo .g{position:absolute;inset:0}
.mo .g i{position:absolute;left:var(--x,20%);top:10px;width:var(--w,52px);height:var(--w,52px);border-radius:50%;background:var(--c1,${C1});transform:translateY(calc((var(--t,0) - .5) * var(--amp,34px) * var(--sp,2)))}
.mo .g i:nth-child(2){--x:58%;--w:34px;--sp:-3;background:var(--c2,${C2});opacity:.9}
.mo .g i:nth-child(3){--x:76%;--w:22px;--sp:4.5;background:${C3};opacity:.8}
.mo .g b{position:absolute;left:14px;bottom:12px;font:800 clamp(15px,4.4vw,21px)/1 "Plus Jakarta Sans",system-ui;color:#fff;transform:translateY(calc((var(--t,0) - .5) * -18px))}
.mo .hint{position:absolute;right:10px;top:10px;font:600 9px/1 "JetBrains Mono",monospace;font-style:normal;letter-spacing:.08em;text-transform:uppercase;color:#7f7f96}`,
    '<span class="g"><i></i><i></i><i></i><b>Parallax</b></span>');
  scrollItem('scroll-lines', 'Sticky Note Count', `.mo.sc2{gap:10px}
.mo .g{position:relative;width:min(200px,88%);height:76px;border-radius:var(--r,12px);background:linear-gradient(160deg,#20202e,#141420);border:1px solid rgba(255,255,255,.12);display:grid;place-items:center;transform:translateY(calc((var(--t,0) - .5) * var(--amp,34px) * -.4))}
.mo .g b{font:800 24px/1 "JetBrains Mono",monospace;color:#fff;font-variant-numeric:tabular-nums}
.mo .g i{position:absolute;left:14px;right:14px;height:5px;border-radius:5px;background:#2b2b3c;transform-origin:0 50%}
.mo .g .l1{top:14px;transform:scaleX(var(--t,0))}
.mo .g .l2{bottom:14px;transform:scaleX(calc(1 - var(--t,0)))}
.mo .hint{font:600 10px/1 "JetBrains Mono",monospace;font-style:normal;letter-spacing:.1em;text-transform:uppercase;color:#7f7f96}`,
    '<span class="g"><b>01</b><i class="l1"></i><i class="l2"></i></span>');

  /* pointer extras */
  mk({
    g: 'cursor', name: 'cursor-spotlight', title: 'Masked Spotlight',
    html: '<div class="mo sl"><b>hidden copy</b></div>',
    css: `.mo.sl{cursor:crosshair;background:#0b0b14}
.mo .sl b{position:relative;z-index:1;font:800 clamp(15px,4.6vw,22px)/1.2 "Plus Jakarta Sans",system-ui;color:#fff;-webkit-mask-image:radial-gradient(90px circle at var(--gx,50%) var(--gy,50%),#000 30%,transparent 72%);mask-image:radial-gradient(90px circle at var(--gx,50%) var(--gy,50%),#000 30%,transparent 72%)}
.mo .sl::after{content:"";position:absolute;inset:0;background:radial-gradient(120px circle at var(--gx,50%) var(--gy,50%),color-mix(in srgb,var(--c1,${C1}) 26%,transparent),transparent 70%);pointer-events:none}`
  });
  mk({
    g: 'cursor', name: 'cursor-blend', title: 'Blend Mode Cursor',
    html: '<div class="mo bl"><span class="dot"></span><b>BLEND</b></div>',
    css: `.mo.bl{cursor:none;background:linear-gradient(120deg,#f2f2f8,#c9c9dc)}
.mo .dot{position:absolute;left:0;top:0;width:var(--ds,42px);height:var(--ds,42px);margin:calc(var(--ds,42px) / -2);border-radius:50%;background:var(--c1,${C1});mix-blend-mode:difference;transform:translate(var(--x,50%),var(--y,50%));pointer-events:none;transition:width .3s,height .3s,margin .3s}
.mo.bl:hover .dot{width:calc(var(--ds,42px) * 1.5);height:calc(var(--ds,42px) * 1.5);margin:calc(var(--ds,42px) * -.75)}
.mo.bl b{font:800 clamp(18px,5.4vw,26px)/1 "Plus Jakarta Sans",system-ui;color:#12121c;mix-blend-mode:difference}`,
    js: 'var mo=root.querySelector(".mo"),d=mo.querySelector(".dot");\n' +
      'mo.addEventListener("pointermove",function(e){var r=mo.getBoundingClientRect();if(!r.width)return;\n' +
      '  d.style.setProperty("--x",((e.clientX-r.left)/r.width*100)+"%");d.style.setProperty("--y",((e.clientY-r.top)/r.height*100)+"%");});',
    cfg: [range('Size', '--ds', 18, 90, 2, 42, 'px'), col('Dot', '--c1', C1)]
  });
  mk({
    g: 'cursor', name: 'magnetic-button', title: 'Magnetic Button',
    html: '<div class="mo mg2"><button class="mb">Book a call</button></div>',
    css: `.mo.mg2{padding:22px}
.mo .mb{padding:12px 20px;border-radius:99px;border:1px solid rgba(255,255,255,.18);background:linear-gradient(160deg,var(--c1,${C1}),color-mix(in srgb,var(--c2,${C2}) 55%,#000));color:#fff;font:700 13px/1 "Plus Jakarta Sans",system-ui;cursor:pointer;transform:translate(var(--dx,0px),var(--dy,0px));transition:transform var(--tt,.5s) cubic-bezier(.2,1.6,.3,1),box-shadow .3s;box-shadow:0 14px 26px -18px #000}
.mo .mb:hover{box-shadow:0 20px 34px -16px color-mix(in srgb,var(--c1,#7c5cff) 70%,transparent)}
.mo .mb span{display:inline-block;transform:translate(calc(var(--dx,0px) * -.4),calc(var(--dy,0px) * -.4));transition:transform var(--tt,.5s) cubic-bezier(.2,1.6,.3,1)}`,
    js: 'var mo=root.querySelector(".mo"),b=mo.querySelector(".mb");\n' +
      'if(!b.querySelector("span"))b.insertAdjacentHTML("afterbegin","<span>Book a call</span>");\n' +
      'var sp=b.querySelector("span");\n' +
      'b.addEventListener("pointermove",function(e){var r=b.getBoundingClientRect();if(!r.width)return;\n' +
      '  var dx=(e.clientX-r.left-r.width/2)*.3,dy=(e.clientY-r.top-r.height/2)*.45;\n' +
      '  b.style.setProperty("--dx",dx.toFixed(1)+"px");b.style.setProperty("--dy",dy.toFixed(1)+"px");\n' +
      '  sp.style.setProperty("--dx",dx.toFixed(1)+"px");sp.style.setProperty("--dy",dy.toFixed(1)+"px");});\n' +
      'b.addEventListener("pointerleave",function(){b.style.setProperty("--dx","0px");b.style.setProperty("--dy","0px");\n' +
      '  sp.style.setProperty("--dx","0px");sp.style.setProperty("--dy","0px");});'
  });
  mk({
    g: 'cursor', name: 'grab-to-pan', title: 'Grab, Pan & Zoom',
    html: '<div class="mo gz"><div class="inner"><b>drag to pan · wheel to zoom</b></div></div>',
    css: `.mo.gz{cursor:grab;overflow:hidden;padding:0}
.mo.gz:active{cursor:grabbing}
.mo .inner{position:absolute;inset:-40%;background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 60%,#0f0f18),color-mix(in srgb,var(--c2,${C2}) 22%,#0b0b16)),repeating-linear-gradient(60deg,rgba(255,255,255,.06) 0 2px,transparent 2px 16px);transform:translate(var(--tx,0px),var(--ty,0px)) scale(var(--z,1));transition:transform .12s ease-out;display:grid;place-items:center}
.mo .inner b{font:700 12px/1 "Plus Jakarta Sans",system-ui;color:#e6e6f2;background:#0b0b1488;padding:8px 12px;border-radius:8px;white-space:nowrap}`,
    js: 'var mo=root.querySelector(".mo"),inr=mo.querySelector(".inner"),tx=0,ty=0,z=1,sx=0,sy=0,drag=0;\n' +
      'function paint(){inr.style.setProperty("--tx",tx+"px");inr.style.setProperty("--ty",ty+"px");inr.style.setProperty("--z",z.toFixed(3));}\n' +
      'mo.addEventListener("pointerdown",function(e){drag=1;sx=e.clientX;sy=e.clientY;});\n' +
      'mo.addEventListener("pointermove",function(e){if(!drag)return;tx+=e.clientX-sx;ty+=e.clientY-sy;sx=e.clientX;sy=e.clientY;paint();});\n' +
      'mo.addEventListener("pointerup",function(){drag=0;});\n' +
      'mo.addEventListener("wheel",function(e){e.preventDefault&&e.preventDefault();z=Math.max(.6,Math.min(2.4,z-e.deltaY*.0012));paint();},{passive:false});'
  });
  mk({
    g: 'cursor', name: 'hover-split-text', title: 'Split Line Link',
    html: '<div class="mo spl">' + mapJoin(2, function () { return '<a href="#" class="s2"><span class="u">Read more</span><span class="d">Read more</span></a>'; }, '') + '</div>',
    css: `.mo.spl{display:grid;gap:14px;justify-items:center}
.mo .s2{position:relative;display:inline-block;height:1.25em;overflow:hidden;font:800 clamp(15px,4.6vw,21px)/1.25 "Plus Jakarta Sans",system-ui;color:#fff;text-decoration:none}
.mo .s2 span{display:block;transition:transform var(--tt,.5s) cubic-bezier(.2,1.1,.3,1)}
.mo .s2 .d{color:var(--c2,${C2})}
.mo .s2:hover span{transform:translateY(-100%)}`
  });
  mk({
    g: 'hover', name: 'lift-shadow', title: 'Lift With Layered Shadow',
    html: '<div class="mo ls"><div class="c5"><b>Card</b><i>shadow depth follows the lift</i></div></div>',
    css: `.mo .c5{width:min(184px,84%);padding:14px;border-radius:var(--r,14px);background:#191926;border:1px solid rgba(255,255,255,.12);transition:transform var(--tt,.44s) cubic-bezier(.2,1.3,.3,1),box-shadow var(--tt,.44s) ease}
.mo .c5:hover{transform:translateY(calc(var(--amp,28px) * -.4)) scale(1.02);box-shadow:0 2px 4px -2px #0006,0 10px 18px -8px #0008,0 26px 40px -18px color-mix(in srgb,var(--c1,#7c5cff) 40%,transparent)}
.mo .c5 b{font:800 14px/1.1 "Plus Jakarta Sans",system-ui;color:#fff}
.mo .c5 i{display:block;font:500 11px/1.4 "JetBrains Mono",monospace;font-style:normal;color:#9a9ab0;margin-top:4px}`
  });
  mk({
    g: 'hover', name: 'icon-fill', title: 'Stroke To Fill Icon',
    html: '<div class="mo fi">' + mapJoin(3, function (i) {
      return '<svg viewBox="0 0 24 24"><path d="' + ['M12 20s-7-4.6-7-9.3A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7 2.7C19 15.4 12 20 12 20z', 'M5 12l4.5 4.5L19 7', 'M12 3l2.6 6.1 6.4.6-4.9 4.3 1.5 6.4L12 17l-5.6 3.4 1.5-6.4L3 9.7l6.4-.6z'][i] + '"/></svg>';
    }, '') + '</div>',
    css: `.mo.fi{display:flex;gap:16px;align-items:center}
.mo .fi svg{width:30px;height:30px;fill:transparent;stroke:var(--c1,${C1});stroke-width:1.8;stroke-linejoin:round;cursor:pointer;transition:fill var(--dur,.42s) ease,stroke var(--tt,.3s),transform var(--tt,.5s) cubic-bezier(.2,1.6,.3,1)}
.mo .fi svg:hover{fill:color-mix(in srgb,var(--c1,${C1}) 85%,#fff);stroke:#fff;transform:scale(1.18) rotate(-4deg)}
.mo .fi svg:nth-child(2):hover{stroke:var(--c2,${C2});fill:color-mix(in srgb,var(--c2,#22d3ee) 85%,#fff)}
.mo .fi svg:nth-child(3):hover{stroke:${C3};fill:color-mix(in srgb,${C3} 85%,#fff)}`
  });
  mk({
    g: 'hover', name: 'text-scramble-hover', title: 'Scramble On Hover',
    html: '<div class="mo sc3"><b class="w3">HOVER ME</b><i>text scrambles, then resolves</i></div>',
    css: `.mo.sc3{display:grid;gap:8px;justify-items:center;cursor:pointer}
.mo .w3{font:800 clamp(17px,5.2vw,26px)/1 "JetBrains Mono",monospace;letter-spacing:.06em;color:#fff;min-height:1.2em}
.mo.sc3:hover .w3{color:var(--c2,${C2})}
.mo.sc3 i{font:500 11px/1.4 "JetBrains Mono",monospace;font-style:normal;color:#8b8ba3}`,
    js: 'var mo=root.querySelector(".mo"),el=mo.querySelector(".w3"),full="HOVER ME",CH="ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*",run=0;\n' +
      'function step(){var f=0;\n' +
      '  (function tick(){var o="";f++;\n' +
      '    for(var i=0;i<full.length;i++)o+=i<f/2?full[i]:(full[i]===" "?" ":CH[(Math.random()*CH.length)|0]);\n' +
      '    el.textContent=o;if(f<full.length*2+4&&run)requestAnimationFrame(tick);else el.textContent=full;})();}\n' +
      'mo.addEventListener("pointerenter",function(){run=1;step();});\n' +
      'mo.addEventListener("pointerleave",function(){run=0;el.textContent=full;});'
  });
  mk({
    g: 'gesture', name: 'ripple-click', title: 'Click Ripple',
    html: '<div class="mo rp"><button class="rb">Tap me</button><button class="rb">and me</button></div>',
    css: `.mo.rp{display:flex;gap:10px}
.mo .rb{position:relative;overflow:hidden;padding:12px 18px;border-radius:var(--r,10px);border:1px solid rgba(255,255,255,.16);background:#191926;color:#fff;font:700 12px/1 "Plus Jakarta Sans",system-ui;cursor:pointer}
.mo .rb:hover{background:color-mix(in srgb,var(--c1,${C1}) 26%,#191926)}
.mo .rip{position:absolute;border-radius:50%;transform:translate(-50%,-50%) scale(0);background:radial-gradient(circle,rgba(255,255,255,.6),transparent 70%);pointer-events:none;animation:rip var(--dur,.66s) ease-out forwards}
@keyframes rip{to{transform:translate(-50%,-50%) scale(1);opacity:0}}`,
    js: 'var bs=[].slice.call(root.querySelectorAll(".rb"));\n' +
      'bs.forEach(function(b){b.addEventListener("pointerdown",function(e){var r=b.getBoundingClientRect();\n' +
      '  var d=Math.max(r.width,r.height)*2,x=e.clientX-r.left,y=e.clientY-r.top;\n' +
      '  b.insertAdjacentHTML("beforeend", \'<span class="rip"></span>\');\n' +
      '  var ns=b.querySelectorAll(".rip"),n=ns[ns.length-1];\n' +
      '  n.style.width=n.style.height=d+"px";n.style.left=x+"px";n.style.top=y+"px";\n' +
      '  setTimeout(function(){n.remove()},680);});});',
    cfg: [range('Radius', '--r', 0, 22, 1, 10, 'px'), col('Tint', '--c1', C1)]
  });
  mk({
    g: 'gesture', name: 'confetti-burst', title: 'Confetti Burst',
    html: '<div class="mo cf"><canvas width="260" height="150"></canvas><button class="btn go">Celebrate</button></div>',
    css: `.mo.cf{display:grid;gap:8px;justify-items:center}
.mo .cf canvas{width:100%;height:110px;border-radius:var(--r,10px);background:#101018;border:1px solid rgba(255,255,255,.08)}
.mo .btn.go:hover{background:color-mix(in srgb,var(--c1,${C1}) 30%,#191926)}`,
    js: 'var cv=root.querySelector("canvas"),b=root.querySelector(".btn.go"),mo=root.querySelector(".mo");\n' +
      'var W=cv.width,H=cv.height,ctx=cv.getContext("2d"),ps=[];\n' +
      'function cs(n,d){var v=getComputedStyle(mo).getPropertyValue(n);\n' +
      '  return (v&&v.trim())||d;}\n' +
      'function burst(){for(var i=0;i<46;i++)ps.push({x:W/2,y:H*.7,vx:(Math.random()-.5)*6,vy:-3-Math.random()*5,\n' +
      '  c:i%3===0?"#ffffff":(i%3===1?cs("--c1","#7c5cff"):cs("--c2","#22d3ee")),r:2+Math.random()*3,a:0,va:(Math.random()-.5)*.3});}\n' +
      'b.addEventListener("click",burst);\n' +
      'api.raf(function(){ctx.clearRect(0,0,W,H);\n' +
      '  for(var i=ps.length-1;i>=0;i--){var p=ps[i];p.vy+=.13;p.x+=p.vx;p.y+=p.vy;p.a+=p.va;\n' +
      '    if(p.y>H+8){ps.splice(i,1);continue}\n' +
      '    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.a);ctx.fillStyle=p.c;ctx.globalAlpha=Math.max(0,1-p.y/(H*1.02));\n' +
      '    ctx.fillRect(-p.r,-p.r*.6,p.r*2,p.r*1.2);ctx.restore();}});\n' +
      'burst();'
  });
  mk({
    g: 'gesture', name: 'pinch-scale', title: 'Two-Pointer Scale',
    html: '<div class="mo ps"><div class="t2"><b>two pointers</b></div></div>',
    css: `.mo.ps{touch-action:none;cursor:crosshair}
.mo .t2{width:min(160px,70%);aspect-ratio:1;border-radius:var(--r,16px);background:conic-gradient(from 0deg,var(--c1,${C1}),var(--c2,${C2}),var(--c1,${C1}));display:grid;place-items:center;transform:scale(var(--z,1)) rotate(var(--a,0deg));transition:transform .08s linear;box-shadow:0 22px 34px -24px #000}
.mo .t2 b{font:700 12px/1 "Plus Jakarta Sans",system-ui;color:#0c0c16;background:#ffffffb0;padding:6px 10px;border-radius:8px}`,
    js: 'var mo=root.querySelector(".mo"),t=mo.querySelector(".t2"),pts={};\n' +
      'function apply(){var k=Object.keys(pts);\n' +
      '  if(k.length<2){t.style.setProperty("--z",1);t.style.setProperty("--a","0deg");return;}\n' +
      '  var a=pts[k[0]],b=pts[k[1]],d=Math.sqrt((b.x-a.x)*(b.x-a.x)+(b.y-a.y)*(b.y-a.y));\n' +
      '  var ang=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI;\n' +
      '  t.style.setProperty("--z",Math.max(.5,Math.min(1.9,d/120)).toFixed(3));\n' +
      '  t.style.setProperty("--a",(ang*.35).toFixed(1)+"deg");}\n' +
      'mo.addEventListener("pointerdown",function(e){pts[e.pointerId]={x:e.clientX,y:e.clientY};apply();});\n' +
      'mo.addEventListener("pointermove",function(e){if(pts[e.pointerId]){pts[e.pointerId]={x:e.clientX,y:e.clientY};apply();}});\n' +
      '["pointerup","pointercancel"].forEach(function(k){mo.addEventListener(k,function(e){delete pts[e.pointerId];apply();});});'
  });
  mk({
    g: 'drag', name: 'drag-rotate', title: 'Drag To Rotate',
    html: '<div class="mo dtr"><span class="ring5"><i></i></span><b class="val">0deg</b></div>',
    css: `.mo.dtr{display:grid;gap:10px;justify-items:center;cursor:grab;touch-action:none}
.mo .ring5{position:relative;width:96px;height:96px;border-radius:50%;border:2px dashed rgba(255,255,255,.22);transform:rotate(var(--a,0deg));transition:transform .06s linear}
.mo .ring5 i{position:absolute;left:50%;top:-8px;width:16px;height:16px;margin-left:-8px;border-radius:50%;background:var(--c1,${C1});box-shadow:0 0 16px color-mix(in srgb,var(--c1,#7c5cff) 70%,transparent)}
.mo .val{font:700 13px/1 "JetBrains Mono",monospace;color:#fff;font-variant-numeric:tabular-nums}`,
    js: 'var mo=root.querySelector(".mo"),r=mo.querySelector(".ring5"),v=mo.querySelector(".val"),a=0,prev=0,drag=0;\n' +
      'function ang(e){var b=r.getBoundingClientRect();if(!b.width)return 0;\n' +
      '  return Math.atan2(e.clientY-(b.top+b.height/2),e.clientX-(b.left+b.width/2))*180/Math.PI;}\n' +
      'mo.addEventListener("pointerdown",function(e){drag=1;prev=ang(e);});\n' +
      'mo.addEventListener("pointermove",function(e){if(!drag)return;var n=ang(e),d=n-prev;\n' +
      '  while(d>180)d-=360;while(d<-180)d+=360;\n' +
      '  a+=d;prev=n;r.style.setProperty("--a",a+"deg");v.textContent=Math.round(((a%360)+360)%360)+"deg";});\n' +
      'mo.addEventListener("pointerup",function(){drag=0;});'
  });
  mk({
    g: 'drag', name: 'drag-paint', title: 'Drag To Paint',
    html: '<div class="mo dp"><canvas width="260" height="150"></canvas><button class="btn cl">Clear</button></div>',
    css: `.mo.dp{display:grid;gap:8px;justify-items:center}
.mo .dp canvas{width:100%;height:112px;border-radius:var(--r,10px);background:#0f0f18;border:1px solid rgba(255,255,255,.1);cursor:crosshair;touch-action:none}
.mo .btn.cl:hover{border-color:var(--c2,${C2})}`,
    js: 'var cv=root.querySelector("canvas"),ctx=cv.getContext("2d"),mo=root.querySelector(".dp");\n' +
      'var st=0,lx=0,ly=0;\n' +
      'function pos(e){var r=cv.getBoundingClientRect();if(!r.width)return null;\n' +
      '  return [(e.clientX-r.left)/r.width*cv.width,(e.clientY-r.top)/r.height*cv.height];}\n' +
      'function paint(e){var p=pos(e);if(!p)return;\n' +
      '  var cs=getComputedStyle(mo);\n' +
      '  ctx.strokeStyle=(cs.getPropertyValue("--c1")||"#7c5cff").trim();\n' +
      '  ctx.lineCap="round";ctx.lineWidth=7;\n' +
      '  ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(p[0],p[1]);ctx.stroke();lx=p[0];ly=p[1];}\n' +
      'cv.addEventListener("pointerdown",function(e){st=1;paint(e);});\n' +
      'cv.addEventListener("pointermove",function(e){if(st)paint(e)});\n' +
      'cv.addEventListener("pointerup",function(){st=0});\n' +
      'root.querySelector(".btn.cl").addEventListener("click",function(){ctx.clearRect(0,0,cv.width,cv.height)});'
  });
  mk({
    g: 'spring', name: 'jelly-list', title: 'Jelly List Insert',
    html: '<div class="mo jl3"><div class="rows"></div><button class="btn add">Add row</button></div>',
    css: `.mo.jl3{display:grid;gap:10px;justify-items:center;width:100%}
.mo .rows{display:grid;gap:5px;width:min(200px,92%)}
.mo .rw2{padding:8px 10px;border-radius:9px;background:#191926;border:1px solid rgba(255,255,255,.12);font:600 11px/1 "Plus Jakarta Sans",system-ui;color:#d2d2e2}
.mo .rw2.new{animation:jel var(--dur,.74s) cubic-bezier(.2,1.5,.3,1) both;background:color-mix(in srgb,var(--c1,${C1}) 26%,#191926)}
@keyframes jel{0%{transform:scale(.8,.6);opacity:0}30%{transform:scale(1.06,1.14)}55%{transform:scale(.98,1.02)}100%{transform:none;opacity:1}}`,
    js: 'var rows=root.querySelector(".rows"),b=root.querySelector(".btn.add"),n=0;\n' +
      'function add(fresh){if(rows.children.length>4)rows.removeChild(rows.firstChild);\n' +
      '  rows.insertAdjacentHTML("beforeend", \'<b class="rw2"></b>\');\n' +
      '  var el=rows.lastChild;el.textContent="Row "+(++n);\n' +
      '  if(fresh){el.classList.add("new");setTimeout(function(){el.classList.remove("new")},780);}}\n' +
      'add(0);add(0);b.addEventListener("click",function(){add(1)});',
  });
  mk({
    g: 'spring', name: 'elastic-bar', title: 'Elastic Progress',
    html: '<div class="mo el"><span class="tr2"><b class="fl"></b></span><button class="btn nx">Advance</button></div>',
    css: `.mo.el{display:grid;gap:12px;justify-items:center;width:100%}
.mo .tr2{position:relative;width:min(210px,94%);height:12px;border-radius:99px;background:#22222f;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}
.mo .fl{position:absolute;inset:0;width:26%;border-radius:99px;background:linear-gradient(90deg,var(--c1,${C1}),var(--c2,${C2}));transition:width var(--dur,.9s) cubic-bezier(.2,1.9,.3,1)}`,
    js: 'var f=root.querySelector(".fl"),b=root.querySelector(".btn.nx"),p=26;\n' +
      'b.addEventListener("click",function(){p=p>=100?8:Math.min(100,p+24);f.style.width=p+"%";});'
  });
  mk({
    g: 'view', name: 'crossfade-panel', title: 'Crossfade Panels',
    html: '<div class="mo xf"><div class="p3 on">One</div><div class="p3">Two</div><div class="p3">Three</div><div class="dots"><i class="on"></i><i></i><i></i></div></div>',
    css: `.mo.xf{display:grid;place-items:center;gap:10px}
.mo .p3{grid-area:1/1;width:min(200px,88%);height:82px;border-radius:var(--r,12px);display:grid;place-items:center;font:800 16px/1 "Plus Jakarta Sans",system-ui;color:#fff;opacity:0;transform:scale(.96);transition:opacity var(--tt,.44s),transform var(--dur,.66s) cubic-bezier(.2,1.2,.3,1)}
.mo .p3:nth-child(1){background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 75%,#000),#141420)}
.mo .p3:nth-child(2){background:linear-gradient(150deg,color-mix(in srgb,var(--c2,${C2}) 55%,#000),#141420)}
.mo .p3:nth-child(3){background:linear-gradient(150deg,${C3},#141420)}
.mo .p3.on{opacity:1;transform:none}
.mo .dots{grid-area:2/1;display:flex;gap:5px}
.mo .dots i{width:7px;height:7px;border-radius:50%;background:#3a3a4c;transition:background .3s,transform .3s}
.mo .dots i.on{background:#fff;transform:scale(1.3)}`,
    js: 'var ps=[].slice.call(root.querySelectorAll(".p3")),dots=[].slice.call(root.querySelectorAll(".dots i")),i=0,t=0;\n' +
      'api.raf(function(){t++;if(t%90)return;i=(i+1)%ps.length;\n' +
      '  ps.forEach(function(p,n){p.classList.toggle("on",n===i)});dots.forEach(function(d,n){d.classList.toggle("on",n===i)});});'
  });
  mk({
    g: 'view', name: 'page-slide', title: 'In-Page Slide Transition',
    html: '<div class="mo psl"><span class="vw"><b class="pg3 a">List</b><b class="pg3 b">Detail</b></span><button class="btn nx">Go</button></div>',
    css: `.mo.psl{display:grid;gap:10px;justify-items:center;width:100%}
.mo .vw{position:relative;width:min(210px,92%);height:92px;overflow:hidden;border-radius:var(--r,12px);border:1px solid rgba(255,255,255,.12)}
.mo .pg3{position:absolute;inset:0;display:grid;place-items:center;font:800 14px/1 "Plus Jakarta Sans",system-ui;color:#fff;transition:transform var(--dur,.66s) cubic-bezier(.3,1,.3,1),filter var(--tt,.5s)}
.mo .pg3.a{background:#191926;transform:translateX(0)}
.mo .pg3.b{transform:translateX(100%);background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 60%,#101018),#101018)}
.mo.on .pg3.a{transform:translateX(-100%);filter:blur(3px)}
.mo.on .pg3.b{transform:translateX(0)}`,
    js: 'var mo=root.querySelector(".mo");\n' +
      'mo.querySelector(".btn").addEventListener("click",function(){mo.classList.toggle("on")});'
  });
  mk({
    g: 'view', name: 'accordion-spring', title: 'Spring Accordion',
    html: '<div class="mo ac5">' + mapJoin(3, function (i) {
      return '<b class="q"><span>' + ['What is this?', 'Does it cost anything?', 'Can I copy the code?'][i] + '</span><i>+</i></b><div class="a2"><p>' + ['A gallery of 900 hand-tuned CSS and JS effects.', 'No. Everything is MIT, copy and paste freely.', 'Yes — the modal shows a standalone snippet.'][i] + '</p></div>';
    }, '') + '</div>',
    css: `.mo.ac5{display:grid;gap:6px;width:min(230px,96%);align-content:center}
.mo .q{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:9px 11px;border-radius:9px;background:#191926;border:1px solid rgba(255,255,255,.12);cursor:pointer;font:600 11.5px/1.2 "Plus Jakarta Sans",system-ui;color:#e4e4f0;transition:background .25s}
.mo .q i{font-style:normal;color:var(--c2,${C2});transition:transform var(--tt,.42s) cubic-bezier(.2,1.7,.3,1)}
.mo .q.op i{transform:rotate(135deg)}
.mo .a2{overflow:hidden;max-height:0;transition:max-height var(--dur,.5s) cubic-bezier(.2,1.4,.3,1)}
.mo .a2.op{max-height:80px}
.mo .a2 p{margin:4px 4px 2px;font-size:10.5px;line-height:1.5;color:#9a9ab0;text-align:left}
.mo .q:hover{background:#20202e}`,
    js: 'var qs=[].slice.call(root.querySelectorAll(".q"));\n' +
      'qs.forEach(function(q){q.addEventListener("click",function(){\n' +
      '  var a=q.nextElementSibling,open=q.classList.toggle("op");a.classList.toggle("op",open);});});'
  });
  mk({
    g: 'reveal', name: 'reveal-grid-cells', title: 'Grid Cells Reveal',
    html: '<div class="mo gc">' + mapJoin(12, function (i) { return '<i class="pl" style="--i:' + (i % 7) + '"></i>'; }, '') + '</div>',
    css: `.mo.gc{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;width:min(220px,94%)}
.mo .gc i{height:30px;border-radius:6px;background:#1c1c2a;transform:scale(.4);opacity:.3;transition:transform var(--dur,.6s) cubic-bezier(.2,1.5,.3,1),opacity .4s,background .4s;transition-delay:calc(var(--i,0) * var(--stg,.09s))}
.mo .gc i.in{transform:none;opacity:1;background:linear-gradient(150deg,color-mix(in srgb,var(--c1,${C1}) 70%,#000),color-mix(in srgb,var(--c2,${C2}) 30%,#0b0b16))}`,
    js: IO2
  });
  mk({
    g: 'reveal', name: 'reveal-image-split', title: 'Split Image Reveal',
    html: '<div class="mo is"><span class="h2"></span><span class="h2 b"></span><b class="cap">scroll it in</b></div>',
    css: `.mo.is{gap:6px}
.mo .h2{display:block;width:min(200px,86%);height:58px;background:linear-gradient(150deg,var(--c1,${C1}),color-mix(in srgb,var(--c2,${C2}) 40%,#000));transform:translateX(-104%);transition:transform var(--dur,.86s) cubic-bezier(.3,1,.3,1)}
.mo .h2.b{transform:translateX(104%);background:linear-gradient(-150deg,var(--c2,${C2}),color-mix(in srgb,var(--c1,${C1}) 40%,#000))}
.mo.is.in .h2,.mo.is:hover .h2{transform:none}
.mo .cap{font:700 11px/1 "JetBrains Mono",monospace;color:#9a9ab0}`,
    js: 'var mo=root.querySelector(".mo");\n' +
      'var io=new IntersectionObserver(function(es){es.forEach(function(e){mo.classList.toggle("in",e.isIntersecting);});},{threshold:.4});\n' +
      'io.observe(mo);api.onCleanup(function(){io.disconnect();});'
  });
  mk({
    g: 'view', name: 'morph-nav', title: 'Nav To Sheet Morph',
    html: '<div class="mo mn"><span class="bar5"><i class="l1"></i><i class="l2"></i><i class="l3"></i></span></div>',
    css: `.mo.mn{padding:22px}
.mo .bar5{position:relative;width:150px;height:10px;border-radius:99px;background:#191926;border:1px solid rgba(255,255,255,.14);cursor:pointer;transition:height var(--dur,.52s) cubic-bezier(.2,1.4,.3,1),border-radius var(--dur,.5s),background .3s}
.mo .bar5 i{position:absolute;left:50%;top:50%;width:22px;height:2px;margin:-1px 0 0 -11px;border-radius:2px;background:var(--c2,${C2});transition:transform var(--tt,.44s) cubic-bezier(.2,1.5,.3,1),opacity .3s,width var(--tt,.4s)}
.mo .bar5 .l1{transform:translateY(-5px)}
.mo .bar5 .l3{transform:translateY(5px)}
.mo.on .bar5{height:86px;background:#101018;border-radius:var(--r,14px)}
.mo.on .bar5 .l1{transform:rotate(45deg);width:26px}
.mo.on .bar5 .l3{transform:rotate(-45deg);width:26px}
.mo.on .bar5 .l2{opacity:0}
.mo.on .bar5::after{content:"menu open";position:absolute;left:0;right:0;bottom:12px;text-align:center;font:600 10px/1 "JetBrains Mono",monospace;color:#8b8ba3;letter-spacing:.1em;text-transform:uppercase}`,
    js: 'var mo=root.querySelector(".mo");\n' +
      'mo.querySelector(".bar5").addEventListener("click",function(){mo.classList.toggle("on")});'
  });

  K.add('motion', pool);
})(window);
