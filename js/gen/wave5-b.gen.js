/* ============================================================
   Motion Lab — wave 5, BUTTONS (the 1,000-effect expansion)
   21 new mechanic families × 24 variants = 504 candidates.
   Every mechanic is a distinct button interaction that does not
   exist earlier in the collection; variants differ in geometry,
   rhythm, easing and palette. House rule: custom properties are
   only ever read with a fallback, never declared in demo CSS.
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
      col('Colour', '--c1', v.c1),
      col('Colour B', '--c2', v.c2),
      col('Colour C', '--c3', v.c3)
    ].concat(extra || []);
  }
  function shell(extra) {
    return '.wb{position:relative;border:0;cursor:pointer;padding:var(--pad,15px) var(--padx,34px);font:700 var(--fs,17px) system-ui,-apple-system,sans-serif;color:#fff;letter-spacing:.02em;background:linear-gradient(135deg,var(--c1,' + (extra || '') + '),var(--c2,' + (extra || '') + '));border-radius:var(--rad,99px);box-shadow:0 10px 24px -12px rgba(0,0,0,.6)}';
  }
  var WORDS = ['MOTION', 'GALAXY', 'SPARKS', 'PULSES', 'PIXELS', 'SIGNAL'];

  var M = [];

  /* 1. type label — the label types itself out and erases, on loop */
  M.push({ key: 'typelabel', title: 'Type Label', tags: ['button', 'text'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], L = w.length, d = D(v, 2.2);
    return {
      html: '<button class="ty"><span class="lb">' + w + '</span><i class="cr"></i></button>',
      css: join([
        shell(),
        '.ty{font-family:ui-monospace,Menlo,Consolas,monospace;min-width:calc(var(--fs,17px) * ' + L + ' + 1.2em)}',
        '.ty .lb{display:inline-block;overflow:hidden;white-space:nowrap;vertical-align:bottom;animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.ty .cr{display:inline-block;width:2px;height:1.05em;margin-left:2px;background:var(--c3,' + v.c3 + ');vertical-align:-2px;animation:b' + v.i + ' calc(var(--dur,' + d + 's) / 4) steps(2,jump-none) infinite}',
        kf('a' + v.i, '0%{width:0;animation-timing-function:steps(' + L + ',end)}58%{width:' + L + 'ch;animation-timing-function:linear}82%{width:' + L + 'ch}100%{width:0}'),
        kf('b' + v.i, '0%,100%{opacity:1}50%{opacity:0}')
      ]),
      cfg: core(v, [range('Font', '--fs', 12, 26, 1, 17, 'px'), range('Corner', '--rad', 0, 99, 1, 99, 'px')])
    };
  } });

  /* 2. stepper — minus / plus caps update the value with a pop */
  M.push({ key: 'stepper', title: 'Stepper', tags: ['button', 'count', 'js'], build: function (v) {
    var d = D(v, 1.6);
    return {
      html: '<div class="stp"><button class="mn" type="button">&minus;</button><b class="val">3</b><button class="pl" type="button">+</button></div>',
      css: join([
        '.stp{display:flex;align-items:center;gap:10px}',
        '.stp button{width:44px;height:44px;border:0;border-radius:var(--rad,14px);font:700 22px/1 system-ui;color:#fff;background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));cursor:pointer;box-shadow:0 8px 18px -10px rgba(0,0,0,.7);transition:transform .15s ease}',
        '.stp button:active{transform:scale(.9)}',
        '.stp .val{min-width:52px;text-align:center;font:800 26px/1 ui-monospace,monospace;color:var(--c3,' + v.c3 + ');background:rgba(10,10,20,.55);border:1px solid color-mix(in srgb,var(--c3,' + v.c3 + ') 40%,transparent);border-radius:var(--rad,14px);padding:11px 10px;animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('a' + v.i, '0%,100%{box-shadow:0 0 0 0 color-mix(in srgb,var(--c3,' + v.c3 + ') 0%,transparent)}50%{box-shadow:0 0 16px 0 color-mix(in srgb,var(--c3,' + v.c3 + ') 35%,transparent)}')
      ]),
      js: 'var v=root.querySelector(".val"),mn=root.querySelector(".mn"),pl=root.querySelector(".pl");function set(n){n=Math.max(1,Math.min(9,n));v.textContent=n;v.classList.remove("pop");void v.offsetWidth;v.classList.add("pop");}pl.addEventListener("click",function(){set(parseInt(v.textContent,10)+1)});mn.addEventListener("click",function(){set(parseInt(v.textContent,10)-1)});',
      cfg: core(v, [range('Corner', '--rad', 0, 22, 1, 14, 'px')])
    };
  } });

  /* 3. latch — a latching button that stays lit until clicked again */
  M.push({ key: 'latch', title: 'Latch Button', tags: ['button', 'state', 'js'], build: function (v) {
    var d = D(v, 1.8);
    return {
      html: '<button class="lb2"><i class="led"></i><span>POWER</span></button>',
      css: join([
        shell(),
        '.lb2 i{display:inline-block;width:10px;height:10px;margin-right:10px;border-radius:50%;background:var(--c3,' + v.c3 + ');vertical-align:1px;animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.lb2.on i{background:var(--c1,' + v.c1 + ');box-shadow:0 0 12px var(--c1,' + v.c1 + '),0 0 26px var(--c1,' + v.c1 + ');animation:none}',
        '.lb2.on{background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));box-shadow:0 0 24px -4px color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent)}',
        kf('a' + v.i, '0%,100%{opacity:.25}50%{opacity:.6}')
      ]),
      js: 'var b=root.querySelector(".lb2");b.addEventListener("click",function(){b.classList.toggle("on")});',
      cfg: core(v, [range('Corner', '--rad', 0, 99, 1, 99, 'px')])
    };
  } });

  /* 4. ink ripple — a material ink blob blooms from the click point */
  M.push({ key: 'inkr', title: 'Ink Ripple', tags: ['button', 'ripple', 'js'], build: function (v) {
    var d = D(v, 1.4);
    return {
      html: '<button class="ik">PRESS</button>',
      css: join([
        shell(),
        '.ik{overflow:hidden}',
        '.ik::before{content:"";position:absolute;top:0;bottom:0;left:-70%;width:50%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.4),transparent);transform:skewX(-18deg);animation:a' + v.i + ' calc(var(--dur,' + d + 's) * 2.4) ease-in-out infinite}',
        '.ik .ink{position:absolute;border-radius:50%;background:color-mix(in srgb,var(--c3,' + v.c3 + ') 55%,transparent);transform:scale(0);pointer-events:none;animation:b' + v.i + ' .9s ease-out forwards}',
        kf('a' + v.i, '0%{left:-70%}60%,100%{left:130%}'),
        kf('b' + v.i, 'to{transform:scale(14);opacity:0}')
      ]),
      js: 'var b=root.querySelector(".ik");b.addEventListener("pointerdown",function(e){var r=b.getBoundingClientRect(),s=document.createElement("i");s.className="ink";var sz=Math.max(r.width,r.height);s.style.width=s.style.height=sz+"px";s.style.left=(e.clientX-r.left-sz/2)+"px";s.style.top=(e.clientY-r.top-sz/2)+"px";s.addEventListener("animationend",function(){s.remove()});b.appendChild(s);});',
      cfg: core(v, [range('Corner', '--rad', 0, 99, 1, 99, 'px')])
    };
  } });

  /* 5. swing sign — a hanging sign that sways on its straps */
  M.push({ key: 'swingsign', title: 'Swing Sign', tags: ['button', 'swing'], build: function (v) {
    var d = D(v, 1.7), a = 5 + (v.i % 3) * 2;
    return {
      html: '<div class="sgn"><i class="bar"></i><button class="sgb">OPEN</button></div>',
      css: join([
        '.sgn{position:relative;padding-top:26px}',
        '.sgn .bar{position:absolute;top:18px;left:12%;right:12%;height:3px;border-radius:2px;background:rgba(200,200,225,.5)}',
        '.sgn .bar::before,.sgn .bar::after{content:"";position:absolute;top:0;width:2px;height:20px;background:rgba(200,200,225,.5)}',
        '.sgn .bar::before{left:16%}.sgn .bar::after{right:16%}',
        '.sgb{transform-origin:50% -22px;animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        shell(),
        '.sgb{border-radius:var(--rad,12px)}',
        kf('a' + v.i, '0%,100%{transform:rotate(' + -a + 'deg)}50%{transform:rotate(' + a + 'deg)}')
      ]),
      cfg: core(v, [range('Corner', '--rad', 0, 24, 1, 12, 'px')])
    };
  } });

  /* 6. checker drift — a checkerboard surface drifts under the label */
  M.push({ key: 'checkdrift', title: 'Checker Drift', tags: ['button', 'pattern'], build: function (v) {
    var d = D(v, 2.6), s = 14 + (v.i % 4) * 4;
    return {
      html: '<button class="cd">CHECK</button>',
      css: join([
        shell(),
        '.cd{background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + ')),repeating-conic-gradient(color-mix(in srgb,#fff 26%,transparent) 0% 25%,transparent 0% 50%);background-size:100% 100%,' + s + 'px ' + s + 'px;border-radius:var(--rad,14px);animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('a' + v.i, '0%{background-position:0 0,0 0}100%{background-position:0 0,' + (s * 4) + 'px ' + (s * 4) + 'px}')
      ]),
      cfg: core(v, [range('Corner', '--rad', 0, 40, 1, 14, 'px')])
    };
  } });

  /* 7. task button — click runs a progress fill, then lands a check */
  M.push({ key: 'taskbtn', title: 'Task Button', tags: ['button', 'progress', 'js'], build: function (v) {
    var d = D(v, 1.6);
    return {
      html: '<button class="tk"><span class="fill"></span><span class="lb">RUN TASK</span><span class="ok">&#10003;</span></button>',
      css: join([
        shell(),
        '.tk{overflow:hidden;min-width:170px}',
        '.tk .fill{position:absolute;inset:0;background:linear-gradient(90deg,var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '));transform:scaleX(0);transform-origin:0 50%;opacity:.9}',
        '.tk.run .fill{animation:a' + v.i + ' calc(var(--dur,' + d + 's) * 1.6) cubic-bezier(.25,.6,.3,1) forwards}',
        '.tk .ok{position:absolute;inset:0;display:grid;place-items:center;font-size:26px;opacity:0;transform:scale(.4)}',
        '.tk.done .ok{opacity:1;transform:scale(1);transition:all .3s cubic-bezier(.3,1.6,.5,1)}',
        '.tk .lb{transition:opacity .2s}',
        '.tk.done .lb{opacity:0}',
        '.tk .fill{animation:none}',
        '.tk{animation:b' + v.i + ' calc(var(--dur,' + d + 's) * 3) ease-in-out infinite}',
        kf('a' + v.i, 'to{transform:scaleX(1)}'),
        kf('b' + v.i, '0%,100%{box-shadow:0 10px 24px -12px rgba(0,0,0,.6)}50%{box-shadow:0 10px 30px -8px color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent)}')
      ]),
      js: 'var b=root.querySelector(".tk");var busy=false;b.addEventListener("click",function(){if(busy)return;busy=true;b.classList.remove("done");b.classList.add("run");b.querySelector(".fill").addEventListener("animationend",function(){b.classList.remove("run");b.classList.add("done");setTimeout(function(){b.classList.remove("done");busy=false;},1400);},{once:true});});',
      cfg: core(v, [range('Corner', '--rad', 0, 99, 1, 99, 'px')])
    };
  } });

  /* 8. orbit dots — two dots ride the button's rim */
  M.push({ key: 'orbitdots', title: 'Orbit Dots', tags: ['button', 'orbit'], build: function (v) {
    var d = D(v, 2);
    return {
      html: '<div class="orb"><i class="o1"></i><i class="o2"></i><button class="ob">ORBIT</button></div>',
      css: join([
        '.orb{position:relative;display:inline-block;padding:14px}',
        '.orb i{position:absolute;left:50%;top:50%;width:var(--dd,9px);height:var(--dd,9px);margin:calc(var(--dd,9px)/-2) 0 0 calc(var(--dd,9px)/-2);border-radius:50%;animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.orb i::before{content:"";position:absolute;inset:0;border-radius:50%;background:var(--c3,' + v.c3 + ');box-shadow:0 0 8px var(--c3,' + v.c3 + ')}',
        '.orb .o2{animation-direction:reverse;animation-duration:calc(var(--dur,' + d + 's) * 1.4)}',
        '.orb .o2::before{background:var(--c2,' + v.c2 + ');box-shadow:0 0 8px var(--c2,' + v.c2 + ')}',
        shell(),
        kf('a' + v.i, 'from{transform:rotate(0) translateX(var(--or,84px))}to{transform:rotate(1turn) translateX(var(--or,84px))}')
      ]),
      cfg: core(v, [range('Orbit', '--or', 40, 130, 2, 84, 'px'), range('Dot', '--dd', 4, 16, 1, 9, 'px')])
    };
  } });

  /* 9. click ring — a ring detonates from the click point */
  M.push({ key: 'clickring', title: 'Click Ring', tags: ['button', 'burst', 'js'], build: function (v) {
    var d = D(v, 1.6);
    return {
      html: '<button class="cr2">PING</button>',
      css: join([
        shell(),
        '.cr2{animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.cr2 .rg{position:absolute;border:2px solid var(--c3,' + v.c3 + ');border-radius:50%;width:12px;height:12px;margin:-6px 0 0 -6px;pointer-events:none;transform:scale(.4);opacity:.9;animation:b' + v.i + ' .7s ease-out forwards}',
        kf('a' + v.i, '0%,100%{box-shadow:0 10px 24px -12px rgba(0,0,0,.6)}50%{box-shadow:0 0 22px -2px color-mix(in srgb,var(--c3,' + v.c3 + ') 55%,transparent)}'),
        kf('b' + v.i, 'to{transform:scale(16);opacity:0}')
      ]),
      js: 'var b=root.querySelector(".cr2");b.addEventListener("pointerdown",function(e){var r=b.getBoundingClientRect(),s=document.createElement("i");s.className="rg";s.style.left=(e.clientX-r.left)+"px";s.style.top=(e.clientY-r.top)+"px";s.addEventListener("animationend",function(){s.remove()});b.appendChild(s);});',
      cfg: core(v, [range('Corner', '--rad', 0, 99, 1, 99, 'px')])
    };
  } });

  /* 10. music bars — a mini equalizer dances inside the label */
  M.push({ key: 'musbars', title: 'Music Bars', tags: ['button', 'equalizer'], build: function (v) {
    var d = D(v, .9), bars = '';
    for (var i = 0; i < 4; i++) bars += '<i style="--i:' + i + '"></i>';
    return {
      html: '<button class="mu"><span class="eq">' + bars + '</span><span>PLAY</span></button>',
      css: join([
        shell(),
        '.mu .eq{display:inline-flex;align-items:flex-end;gap:3px;height:16px;margin-right:10px}',
        '.mu .eq i{width:3px;height:100%;border-radius:2px;background:var(--c3,' + v.c3 + ');transform-origin:50% 100%;animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        '.mu:hover .eq i{animation-duration:calc(var(--dur,' + d + 's) / 1.8)}',
        kf('a' + v.i, '0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}')
      ]),
      cfg: core(v, [range('Corner', '--rad', 0, 99, 1, 99, 'px')])
    };
  } });

  /* 11. typing dots — three dots bounce in sequence */
  M.push({ key: 'typingdots', title: 'Typing Dots', tags: ['button', 'dots'], build: function (v) {
    var d = D(v, 1.3);
    return {
      html: '<button class="td"><span>LOADING</span><i class="d1"></i><i class="d2"></i><i class="d3"></i></button>',
      css: join([
        shell(),
        '.td i{display:inline-block;width:5px;height:5px;margin-left:5px;border-radius:50%;background:var(--c3,' + v.c3 + ');vertical-align:2px;animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.td .d2{animation-delay:calc(var(--dur,' + d + 's) / -3)}.td .d3{animation-delay:calc(var(--dur,' + d + 's) / -1.5)}',
        kf('a' + v.i, '0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-6px);opacity:1}')
      ]),
      cfg: core(v, [range('Corner', '--rad', 0, 99, 1, 99, 'px')])
    };
  } });

  /* 12. dual peek — a second button breathes behind and slides on hover */
  M.push({ key: 'dualpeek', title: 'Dual Peek', tags: ['button', 'stack'], build: function (v) {
    var d = D(v, 2.2);
    return {
      html: '<div class="dp"><button class="bk">BACK</button><button class="ft">FRONT</button></div>',
      css: join([
        '.dp{position:relative;padding:10px 14px 20px}',
        '.dp button{position:absolute;inset:0 14px 20px 14px;border:0;cursor:pointer;font:700 15px system-ui;color:#fff;padding:14px 30px;border-radius:var(--rad,16px)}',
        '.dp .bk{background:linear-gradient(135deg,var(--c3,' + v.c3 + '),var(--c2,' + v.c2 + '));animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;transition:transform .45s cubic-bezier(.3,1.2,.4,1)}',
        '.dp .ft{background:linear-gradient(135deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '));box-shadow:0 14px 26px -12px rgba(0,0,0,.7);transition:transform .45s cubic-bezier(.3,1.2,.4,1)}',
        '.dp:hover .bk{transform:translate(-12px,-10px) rotate(-5deg)}',
        '.dp:hover .ft{transform:translate(10px,4px) rotate(2deg)}',
        kf('a' + v.i, '0%,100%{transform:translate(6px,6px) rotate(1.5deg)}50%{transform:translate(-4px,2px) rotate(-1deg)}')
      ]),
      cfg: core(v, [range('Corner', '--rad', 0, 30, 1, 16, 'px')])
    };
  } });

  /* 13. pixel fill — a grid of pixels pulses in a travelling wave */
  M.push({ key: 'pixelfill', title: 'Pixel Fill', tags: ['button', 'grid'], build: function (v) {
    var d = D(v, 1.8), px = '';
    for (var i = 0; i < 24; i++) px += '<i style="--dl:' + (i % 8 + Math.floor(i / 8)) + '"></i>';
    return {
      html: '<button class="pf"><span class="gd">' + px + '</span><span class="lb2">PIXEL</span></button>',
      css: join([
        shell(),
        '.pf{overflow:hidden;padding:20px 34px}',
        '.pf .gd{position:absolute;inset:0;display:grid;grid-template-columns:repeat(8,1fr);grid-template-rows:repeat(3,1fr);gap:2px;padding:4px}',
        '.pf .gd i{background:color-mix(in srgb,var(--c3,' + v.c3 + ') 75%,#fff);animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--dl,0) * var(--step,' + v.step + 's) * -1)}',
        '.pf .lb2{position:relative;z-index:1;text-shadow:0 2px 8px rgba(0,0,0,.55)}',
        kf('a' + v.i, '0%,100%{opacity:.12}50%{opacity:.55}')
      ]),
      cfg: core(v, [range('Corner', '--rad', 0, 99, 1, 99, 'px')])
    };
  } });

  /* 14. arrow nudge — the arrow bobs, then lunges on hover */
  M.push({ key: 'arrowslide', title: 'Arrow Nudge', tags: ['button', 'icon'], build: function (v) {
    var d = D(v, 1.2);
    return {
      html: '<button class="an"><span>CONTINUE</span><span class="ar">&rarr;</span></button>',
      css: join([
        shell(),
        '.an{display:inline-flex;align-items:center;gap:12px}',
        '.an .ar{display:inline-block;animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.an .lb2,.an span:first-child{transition:transform .3s ease}',
        '.an:hover .ar{animation-duration:calc(var(--dur,' + d + 's) / 2.5)}',
        '.an:hover span:first-child{transform:translateX(-2px)}',
        kf('a' + v.i, '0%,100%{transform:translateX(0)}50%{transform:translateX(6px)}')
      ]),
      cfg: core(v, [range('Corner', '--rad', 0, 99, 1, 99, 'px')])
    };
  } });

  /* 15. like burst — hearts pop out of the button on click */
  M.push({ key: 'likeburst', title: 'Like Burst', tags: ['button', 'burst', 'js'], build: function (v) {
    var d = D(v, 1.1);
    return {
      html: '<button class="lk"><span class="h">&#9829;</span>LIKE</button>',
      css: join([
        shell(),
        '.lk .h{display:inline-block;margin-right:8px;color:#fff;font-size:19px;animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.lk .hh{position:absolute;font-size:14px;color:var(--c3,' + v.c3 + ');pointer-events:none;animation:b' + v.i + ' .9s ease-out forwards}',
        kf('a' + v.i, '0%,100%{transform:scale(1)}50%{transform:scale(1.25)}'),
        kf('b' + v.i, 'to{transform:translate(var(--dx,20px),var(--dy,-40px)) scale(.4) rotate(var(--rt,30deg));opacity:0}')
      ]),
      js: 'var b=root.querySelector(".lk");b.addEventListener("click",function(e){var r=b.getBoundingClientRect();for(var i=0;i<6;i++){var s=document.createElement("span");s.className="hh";s.innerHTML="&#9829;";var a=(-90+(i-2.5)*24+Math.random()*18)*Math.PI/180;s.style.setProperty("--dx",Math.cos(a)*(30+Math.random()*26)+"px");s.style.setProperty("--dy",Math.sin(a)*(34+Math.random()*22)+"px");s.style.setProperty("--rt",(Math.random()*90-45)+"deg");s.style.left=(e.clientX-r.left)+"px";s.style.top=(e.clientY-r.top-8)+"px";s.addEventListener("animationend",function(){s.remove()});b.appendChild(s);}});',
      cfg: core(v, [range('Corner', '--rad', 0, 99, 1, 99, 'px')])
    };
  } });

  /* 16. cursor glow — a glow follows the pointer across the face */
  M.push({ key: 'cursorglow', title: 'Cursor Glow', tags: ['button', 'pointer', 'js'], build: function (v) {
    var d = D(v, 2);
    return {
      html: '<button class="cg"><span class="gl"></span>GLOW</button>',
      css: join([
        shell(),
        '.cg{overflow:hidden}',
        '.cg .gl{position:absolute;inset:-40%;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),color-mix(in srgb,#fff 55%,transparent) 0 12%,transparent 34%);opacity:.55;animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;pointer-events:none}',
        kf('a' + v.i, '0%,100%{opacity:.4}50%{opacity:.75}')
      ]),
      js: 'var b=root.querySelector(".cg");b.addEventListener("pointermove",function(e){var r=b.getBoundingClientRect();b.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%");b.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%");});',
      cfg: core(v, [range('Corner', '--rad', 0, 99, 1, 99, 'px')])
    };
  } });

  /* 17. morse label — H and I blink their real morse patterns */
  M.push({ key: 'morselabel', title: 'Morse Label', tags: ['button', 'blink'], build: function (v) {
    var d = D(v, 2);
    return {
      html: '<button class="ms"><b>H</b><b>I</b></button>',
      css: join([
        shell(),
        '.ms{font-family:ui-monospace,Menlo,monospace;letter-spacing:.35em}',
        '.ms b{font-weight:800;animation:a' + v.i + ' var(--dur,' + d + 's) steps(1) infinite}',
        '.ms b:nth-child(2){animation:b' + v.i + ' var(--dur,' + d + 's) steps(1) infinite}',
        kf('a' + v.i, '0%,6%{opacity:1}12%,20%{opacity:.15}26%,32%{opacity:1}38%,46%{opacity:.15}52%,60%{opacity:1}66%,74%{opacity:.15}80%,100%{opacity:1}'),
        kf('b' + v.i, '0%,58%{opacity:.55}62%,70%{opacity:1}76%,84%{opacity:.15}90%,100%{opacity:1}')
      ]),
      cfg: core(v, [range('Corner', '--rad', 0, 99, 1, 99, 'px')])
    };
  } });

  /* 18. two step — first click asks, second confirms, then resets */
  M.push({ key: 'twostep', title: 'Two Step', tags: ['button', 'state', 'js'], build: function (v) {
    var d = D(v, 2.2);
    return {
      html: '<button class="ts"><span class="l1">DELETE</span><span class="l2">SURE?</span><span class="l3">GONE &#10003;</span></button>',
      css: join([
        shell(),
        '.ts{min-width:180px;text-align:center}',
        '.ts span{grid-area:1/1;transition:opacity .25s,transform .25s}',
        '.ts{display:grid;place-items:center}',
        '.ts .l2,.ts .l3{opacity:0;transform:translateY(8px)}',
        '.ts.q .l1,.ts.d .l1{opacity:0;transform:translateY(-8px)}',
        '.ts.q .l2{opacity:1;transform:none}',
        '.ts.d .l2{opacity:0;transform:translateY(-8px)}',
        '.ts.d .l3{opacity:1;transform:none}',
        '.ts.d{background:linear-gradient(135deg,var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '))}',
        '.ts::before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.28) 50%,transparent 70%);background-size:220% 100%;animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        kf('a' + v.i, '0%{background-position:130% 0}100%{background-position:-90% 0}')
      ]),
      js: 'var b=root.querySelector(".ts");var st=0,tm=null;b.addEventListener("click",function(){if(st===0){st=1;b.classList.add("q");tm=setTimeout(function(){st=0;b.classList.remove("q");},1600);}else if(st===1){st=2;b.classList.remove("q");b.classList.add("d");tm=setTimeout(function(){st=0;b.classList.remove("d");},1600);}});',
      cfg: core(v, [range('Corner', '--rad', 0, 99, 1, 99, 'px')])
    };
  } });

  /* 19. shake reject — the button shakes its head on click */
  M.push({ key: 'shakereject', title: 'Shake Reject', tags: ['button', 'shake', 'js'], build: function (v) {
    var d = D(v, 1.8);
    return {
      html: '<button class="sh">DENIED</button>',
      css: join([
        shell(),
        '.sh{animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.sh.no{animation:b' + v.i + ' .45s ease-in-out 1;background:linear-gradient(135deg,#ff5c7a,#c2334d)}',
        kf('a' + v.i, '0%,100%{box-shadow:0 10px 24px -12px rgba(0,0,0,.6)}50%{box-shadow:0 10px 30px -8px color-mix(in srgb,var(--c1,' + v.c1 + ') 50%,transparent)}'),
        kf('b' + v.i, '0%,100%{transform:translateX(0)}15%{transform:translateX(-9px) rotate(-2deg)}35%{transform:translateX(8px) rotate(2deg)}55%{transform:translateX(-6px)}75%{transform:translateX(5px)}')
      ]),
      js: 'var b=root.querySelector(".sh");b.addEventListener("click",function(){b.classList.remove("no");void b.offsetWidth;b.classList.add("no");b.addEventListener("animationend",function h(){b.classList.remove("no");b.removeEventListener("animationend",h);});});',
      cfg: core(v, [range('Corner', '--rad', 0, 99, 1, 99, 'px')])
    };
  } });

  /* 20. confetti pop — confetti blasts on every click */
  M.push({ key: 'confpop', title: 'Party Blaster', tags: ['button', 'burst', 'js'], build: function (v) {
    var d = D(v, 2);
    return {
      html: '<button class="cf">CELEBRATE</button>',
      css: join([
        shell(),
        '.cf{overflow:visible}',
        '.cf::before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(120deg,var(--c1,' + v.c1 + '),var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '),var(--c1,' + v.c1 + '));background-size:300% 100%;animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.cf span{color:#fff;position:relative}',
        '.cf i{position:absolute;left:50%;top:50%;width:8px;height:12px;border-radius:2px;pointer-events:none;animation:b' + v.i + ' .95s cubic-bezier(.2,.7,.4,1) forwards}',
        kf('a' + v.i, 'to{background-position:300% 0}'),
        kf('b' + v.i, '0%{transform:translate(0,0) rotate(0);opacity:1}100%{transform:translate(var(--dx,40px),var(--dy,-70px)) rotate(var(--rt,200deg));opacity:0}')
      ]),
      js: 'var b=root.querySelector(".cf");var C=["' + v.c1 + '","' + v.c2 + '","' + v.c3 + '","#ffd479","#ffffff"];b.addEventListener("click",function(e){var r=b.getBoundingClientRect();for(var i=0;i<12;i++){var s=document.createElement("i");var a=Math.random()*6.283,sp=34+Math.random()*44;s.style.setProperty("--dx",Math.cos(a)*sp+"px");s.style.setProperty("--dy",(Math.sin(a)*sp-26)+"px");s.style.setProperty("--rt",(Math.random()*540-270)+"deg");s.style.background=C[i%C.length];s.addEventListener("animationend",function(){s.remove()});b.appendChild(s);}});',
      cfg: core(v, [range('Corner', '--rad', 0, 99, 1, 99, 'px')])
    };
  } });

  /* 21. idea bulb — click lights the bulb, the filament flickers in */
  M.push({ key: 'bulb', title: 'Idea Bulb', tags: ['button', 'light', 'js'], build: function (v) {
    var d = D(v, 1.4);
    return {
      html: '<button class="bl"><i class="bulb"><u></u></i>IDEA</button>',
      css: join([
        shell(),
        '.bl .bulb{position:relative;display:inline-block;width:20px;height:24px;margin-right:10px;vertical-align:-4px}',
        '.bl .bulb::before{content:"";position:absolute;top:0;left:2px;width:16px;height:16px;border-radius:50%;background:color-mix(in srgb,var(--c3,' + v.c3 + ') 30%,#20202c);box-shadow:inset 0 0 4px rgba(0,0,0,.5)}',
        '.bl .bulb::after{content:"";position:absolute;bottom:0;left:6px;width:8px;height:6px;border-radius:0 0 3px 3px;background:#9a9ab0}',
        '.bl .bulb u{position:absolute;top:5px;left:7px;width:6px;height:7px;border:1.5px solid var(--c3,' + v.c3 + ');border-top:0;border-radius:0 0 4px 4px;opacity:.5}',
        '.bl .bulb{animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.bl.on .bulb::before{background:var(--c3,' + v.c3 + ');box-shadow:0 0 14px var(--c3,' + v.c3 + '),0 0 34px color-mix(in srgb,var(--c3,' + v.c3 + ') 60%,transparent)}',
        '.bl.on .bulb u{opacity:1;animation:b' + v.i + ' .5s steps(2) 1}',
        '.bl.on{box-shadow:0 10px 30px -8px color-mix(in srgb,var(--c3,' + v.c3 + ') 65%,transparent)}',
        kf('a' + v.i, '0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}'),
        kf('b' + v.i, '0%{opacity:.2}50%{opacity:1}100%{opacity:.85}')
      ]),
      js: 'var b=root.querySelector(".bl");b.addEventListener("click",function(){b.classList.toggle("on")});',
      cfg: core(v, [range('Corner', '--rad', 0, 99, 1, 99, 'px')])
    };
  } });

  K.add('buttons', V.matrix('buttons', M, 24, 'w5b'));
})(window);
