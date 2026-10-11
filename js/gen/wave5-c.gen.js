/* ============================================================
   Motion Lab — wave 5, TEXT FX (the 1,000-effect expansion)
   21 new mechanic families × 24 variants = 504 candidates.
   Every mechanic is a distinct text-motion mechanism new to
   the collection; variants differ in word, geometry, rhythm,
   easing and palette. House rule: custom properties are only
   ever read with a fallback, never declared in demo CSS.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit, V = global.MLVary;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color;
  var letters = K.letters;

  function D(v, mul) { return Math.round(v.dur * (mul || 1) * 100) / 100; }
  function core(v, extra) {
    return [
      range('Cycle', '--dur', .2, 20, .05, D(v, 1), 's'),
      range('Stagger', '--step', 0, .6, .01, v.step, 's'),
      col('Ink', '--c1', v.c1),
      col('Accent', '--c2', v.c2),
      col('Glow', '--c3', v.c3)
    ].concat(extra || []);
  }
  var WORDS = ['MOTION', 'GALAXY', 'SPARKS', 'PIXELS', 'SIGNAL', 'TUNING', 'GLOW', 'LAB'];

  var M = [];

  /* 1. staircase — letters ride staggered baselines in a travelling wave */
  M.push({ key: 'staircase', title: 'Staircase', tags: ['text', 'wave'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], d = D(v, 1.8), flip = v.i % 2 ? -1 : 1;
    return {
      html: '<div class="sc">' + letters(w) + '</div>',
      css: join([
        '.sc{display:flex;gap:var(--gap,3px);font:800 var(--fs,34px)/1 system-ui,sans-serif;letter-spacing:.03em}',
        '.sc i{display:inline-block;color:var(--c1,' + v.c1 + ');text-shadow:0 0 16px color-mix(in srgb,var(--c3,' + v.c3 + ') 45%,transparent);animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('a' + v.i, '0%,100%{transform:translateY(calc(var(--i) * ' + flip * 5 + 'px))}50%{transform:translateY(calc(var(--i) * ' + flip * 5 + 'px - ' + flip * (10 + (v.i % 4) * 3) + 'px))}')
      ]),
      cfg: core(v, [range('Font', '--fs', 20, 52, 1, 34, 'px'), range('Gap', '--gap', 0, 12, 1, 3, 'px')])
    };
  } });

  /* 2. rain letters — the word keeps falling through the line */
  M.push({ key: 'rainletters', title: 'Rain Letters', tags: ['text', 'fall'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], d = D(v, 1.9);
    return {
      html: '<div class="rn">' + letters(w) + '</div>',
      css: join([
        '.rn{display:flex;gap:var(--gap,2px);height:var(--lh,64px);align-items:center;overflow:visible;font:800 var(--fs,32px)/1 system-ui,sans-serif}',
        '.rn i{display:inline-block;color:var(--c2,' + v.c2 + ');text-shadow:0 0 12px color-mix(in srgb,var(--c2,' + v.c2 + ') 60%,transparent);animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * -1)}',
        kf('a' + v.i, '0%{transform:translateY(-130%);opacity:0}18%{opacity:1}52%{transform:translateY(0);opacity:1}68%{transform:translateY(130%);opacity:0}100%{transform:translateY(130%);opacity:0}')
      ]),
      cfg: core(v, [range('Font', '--fs', 20, 52, 1, 32, 'px'), range('Line height', '--lh', 44, 110, 2, 64, 'px')])
    };
  } });

  /* 3. type & erase — the word types on, holds, erases, repeats */
  M.push({ key: 'typeback', title: 'Type & Erase', tags: ['text', 'typewriter', 'js'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], d = D(v, 2.6);
    return {
      html: '<div class="tb"><span class="tx2"></span><i class="cr"></i></div>',
      css: join([
        '.tb{display:inline-flex;align-items:center;font:700 var(--fs,30px)/1 ui-monospace,Menlo,Consolas,monospace;color:var(--c1,' + v.c1 + ')}',
        '.tb .tx2{display:inline-block;min-width:' + w.length + 'ch}',
        '.tb .cr{width:3px;height:1em;background:var(--c3,' + v.c3 + ');margin-left:3px;animation:a' + v.i + ' calc(var(--dur,' + d + 's) / 6) steps(2,jump-none) infinite}',
        kf('a' + v.i, '0%,100%{opacity:1}50%{opacity:0}')
      ]),
      js: 'var el=root.querySelector(".tx2"),W="' + w + '",t=0;var per=.14,hold=1.2,erp=per*.55;var total=W.length*per,cycle=total+hold+total*.55+hold;api.raf(function(){t+=.016;var m=t%cycle,n;if(m<total){n=Math.min(W.length,Math.floor(m/per)+1)}else if(m<total+hold){n=W.length}else if(m<total+hold+total*.55){n=Math.max(0,W.length-Math.floor((m-total-hold)/erp))}else{n=0}el.textContent=W.slice(0,n);});',
      cfg: core(v, [range('Font', '--fs', 18, 44, 1, 30, 'px')])
    };
  } });

  /* 4. letter shuffle — two letters swap seats with a spring slide */
  M.push({ key: 'lettershuffle', title: 'Letter Shuffle', tags: ['text', 'swap', 'js'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], d = D(v, 2.4);
    var html = '';
    for (var i = 0; i < w.length; i++) html += '<i style="--i:' + i + '">' + w[i] + '</i>';
    return {
      html: '<div class="sh2">' + html + '</div>',
      css: join([
        '.sh2{display:flex;font:800 var(--fs,30px)/1 ui-monospace,Menlo,Consolas,monospace;color:var(--c1,' + v.c1 + ')}',
        '.sh2 i{display:inline-block;width:1ch;text-align:center;transition:transform .5s cubic-bezier(.3,1.4,.4,1);animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * .5)}',
        kf('a' + v.i, '0%,100%{color:var(--c1,' + v.c1 + ')}50%{color:var(--c2,' + v.c2 + ')}')
      ]),
      js: 'var box=root.querySelector(".sh2"),sp=Array.prototype.slice.call(box.children),N=sp.length;var rnd=function(s){var f=function(){s=(s*1103515245+12345)>>>0;return s/4294967296};f();return f};var r=rnd(' + (v.i + 3) + ');var busy=false,acc=0;api.raf(function(dt){acc+=dt||.016;if(busy||acc<1.5)return;busy=true;acc=0;var a=Math.floor(r()*N),b;do{b=Math.floor(r()*N)}while(b===a);sp[a].style.transform="translateX(" + (b - a) + "ch)";sp[b].style.transform="translateX(" + (a - b) + "ch)";setTimeout(function(){box.insertBefore(sp[b],sp[a]);sp[a].style.transform="";sp[b].style.transform="";sp=Array.prototype.slice.call(box.children);busy=false;},560);});',
      cfg: core(v, [range('Font', '--fs', 18, 44, 1, 30, 'px')])
    };
  } });

  /* 5. flip reveal — letters flip in from above, hold, flip away */
  M.push({ key: 'flipreveal', title: 'Flip Reveal', tags: ['text', 'flip'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], d = D(v, 2.6);
    return {
      html: '<div class="fr2">' + letters(w) + '</div>',
      css: join([
        '.fr2{display:flex;gap:var(--gap,3px);font:800 var(--fs,34px)/1 system-ui,sans-serif;perspective:400px}',
        '.fr2 i{display:inline-block;color:var(--c1,' + v.c1 + ');transform-origin:50% 100%;text-shadow:0 0 14px color-mix(in srgb,var(--c3,' + v.c3 + ') 40%,transparent);animation:a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.4,.1,.3,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('a' + v.i, '0%{transform:rotateX(95deg);opacity:0}22%,58%{transform:rotateX(0);opacity:1}85%,100%{transform:rotateX(-95deg);opacity:0}')
      ]),
      cfg: core(v, [range('Font', '--fs', 20, 52, 1, 34, 'px'), range('Gap', '--gap', 0, 12, 1, 3, 'px')])
    };
  } });

  /* 6. word roll — a stack of words rolls up one at a time */
  M.push({ key: 'wordroll', title: 'Word Roll', tags: ['text', 'carousel'], build: function (v) {
    var set = [WORDS[v.i % WORDS.length], WORDS[(v.i + 2) % WORDS.length], WORDS[(v.i + 5) % WORDS.length], WORDS[(v.i + 7) % WORDS.length]];
    var d = D(v, 3.2), rows = '';
    for (var i = 0; i < 5; i++) rows += '<b>' + set[i % 4] + '</b>';
    return {
      html: '<div class="wr"><div class="col">' + rows + '</div></div>',
      css: join([
        '.wr{height:calc(var(--fs,40px) * 1.3);overflow:hidden;font:800 var(--fs,40px)/1.3 system-ui,sans-serif}',
        '.wr .col b{display:block;text-align:center;color:var(--c1,' + v.c1 + ');text-shadow:0 0 18px color-mix(in srgb,var(--c3,' + v.c3 + ') 40%,transparent);animation:a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.6,0,.2,1) infinite}',
        kf('a' + v.i, '0%,16%{transform:translateY(0)}25%,41%{transform:translateY(-1.3em)}50%,66%{transform:translateY(-2.6em)}75%,91%{transform:translateY(-3.9em)}100%{transform:translateY(-5.2em)}')
      ]),
      cfg: core(v, [range('Font', '--fs', 24, 60, 2, 40, 'px')])
    };
  } });

  /* 7. half split — each letter tears into top and bottom halves */
  M.push({ key: 'halfsplit', title: 'Half Split', tags: ['text', 'split'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], d = D(v, 2), html = '';
    for (var i = 0; i < w.length; i++) {
      html += '<i style="--i:' + i + '"><b class="h">' + w[i] + '</b><b class="g">' + w[i] + '</b></i>';
    }
    return {
      html: '<div class="hs">' + html + '</div>',
      css: join([
        '.hs{display:flex;gap:var(--gap,3px);font:800 var(--fs,34px)/1 system-ui,sans-serif}',
        '.hs i{display:grid}',
        '.hs b{grid-area:1/1;width:100%;text-align:center;color:var(--c1,' + v.c1 + ')}',
        '.hs b.h{-webkit-clip-path:inset(-2px 0 50% 0);clip-path:inset(-2px 0 50% 0);animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        '.hs b.g{-webkit-clip-path:inset(50% 0 -2px 0);clip-path:inset(50% 0 -2px 0);color:var(--c2,' + v.c2 + ');animation:b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('a' + v.i, '0%,100%{transform:translate(0,0)}50%{transform:translate(' + (3 + v.i % 4) + 'px,calc(-1 * ' + (2 + v.i % 3) + 'px))}'),
        kf('b' + v.i, '0%,100%{transform:translate(0,0)}50%{transform:translate(-' + (3 + v.i % 4) + 'px,' + (2 + v.i % 3) + 'px)}')
      ]),
      cfg: core(v, [range('Font', '--fs', 20, 52, 1, 34, 'px'), range('Gap', '--gap', 0, 12, 1, 3, 'px')])
    };
  } });

  /* 8. bubble pop — letters inflate and pop in a stagger */
  M.push({ key: 'bubblepop', title: 'Bubble Pop', tags: ['text', 'scale'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], d = D(v, 1.6);
    return {
      html: '<div class="bp">' + letters(w) + '</div>',
      css: join([
        '.bp{display:flex;gap:var(--gap,2px);font:900 var(--fs,34px)/1 system-ui,sans-serif}',
        '.bp i{display:inline-block;color:var(--c1,' + v.c1 + ');text-shadow:0 0 12px color-mix(in srgb,var(--c1,' + v.c1 + ') 55%,transparent),0 0 30px color-mix(in srgb,var(--c3,' + v.c3 + ') 35%,transparent);animation:a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.3,1.5,.4,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('a' + v.i, '0%,100%{transform:scale(1)}45%{transform:scale(1.28)}60%{transform:scale(.94)}')
      ]),
      cfg: core(v, [range('Font', '--fs', 20, 52, 1, 34, 'px'), range('Gap', '--gap', 0, 12, 1, 2, 'px')])
    };
  } });

  /* 9. line split — the word parts into two halves that drift apart */
  M.push({ key: 'linesplit', title: 'Line Split', tags: ['text', 'split'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], n = Math.ceil(w.length / 2), d = D(v, 2.4);
    return {
      html: '<div class="ls"><span class="a">' + w.slice(0, n) + '</span><span class="b">' + w.slice(n) + '</span></div>',
      css: join([
        '.ls{display:flex;gap:var(--gap,2px);font:800 var(--fs,34px)/1 system-ui,sans-serif}',
        '.ls span{display:inline-block;color:var(--c1,' + v.c1 + ')}',
        '.ls .b{color:var(--c2,' + v.c2 + ')!important}',
        '.ls .a{animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        '.ls .b{animation:b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('a' + v.i, '0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(calc(-1 * var(--dr,18px)),calc(var(--dy,6px) * -1)) rotate(-4deg)}'),
        kf('b' + v.i, '0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(var(--dr,18px),var(--dy,6px)) rotate(4deg)}')
      ]),
      cfg: core(v, [range('Font', '--fs', 20, 52, 1, 34, 'px'), range('Drift', '--dr', 6, 40, 1, 18, 'px'), range('Drift Y', '--dy', 0, 20, 1, 6, 'px')])
    };
  } });

  /* 10. underline run — a bar grows under each letter in sequence */
  M.push({ key: 'underlinerun', title: 'Underline Run', tags: ['text', 'underline'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], d = D(v, 2.4);
    return {
      html: '<div class="ur">' + letters(w) + '</div>',
      css: join([
        '.ur{display:flex;gap:var(--gap,4px);font:800 var(--fs,32px)/1 system-ui,sans-serif;padding-bottom:14px}',
        '.ur i{position:relative;display:inline-block;color:var(--c1,' + v.c1 + ')}',
        '.ur i::after{content:"";position:absolute;left:0;right:0;bottom:-10px;height:var(--uh,5px);border-radius:99px;background:linear-gradient(90deg,var(--c2,' + v.c2 + '),var(--c3,' + v.c3 + '));transform:scaleX(0);transform-origin:0 50%;animation:a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.5,0,.2,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('a' + v.i, '0%,8%{transform:scaleX(0)}40%,62%{transform:scaleX(1)}92%,100%{transform:scaleX(0);transform-origin:100% 50%}63%{transform-origin:0 50%}')
      ]),
      cfg: core(v, [range('Font', '--fs', 20, 52, 1, 32, 'px'), range('Bar height', '--uh', 2, 10, 1, 5, 'px'), range('Gap', '--gap', 0, 14, 1, 4, 'px')])
    };
  } });

  /* 11. highlighter — a marker sweep paints the word */
  M.push({ key: 'highlighter', title: 'Highlighter', tags: ['text', 'sweep'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], d = D(v, 2.8), slant = v.i % 3 === 0 ? '100deg' : '180deg';
    return {
      html: '<div class="hl">' + w + '</div>',
      css: join([
        '.hl{font:800 var(--fs,34px)/1.2 system-ui,sans-serif;color:var(--c1,' + v.c1 + ');padding:6px 10px;background:linear-gradient(' + slant + ',color-mix(in srgb,var(--c3,' + v.c3 + ') 60%,transparent),color-mix(in srgb,var(--c2,' + v.c2 + ') 45%,transparent)) no-repeat;background-size:0% 55%;background-position:0 78%;animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('a' + v.i, '0%{background-size:0% 55%}48%,72%{background-size:100% 55%}100%{background-size:0% 55%;background-position:100% 78%}73%{background-position:0 78%}')
      ]),
      cfg: core(v, [range('Font', '--fs', 20, 52, 1, 34, 'px')])
    };
  } });

  /* 12. word wheel — the word rides a rotating ring */
  M.push({ key: 'wordwheel', title: 'Word Wheel', tags: ['text', 'orbit'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], L = w.length, d = D(v, 6), html = '';
    for (var i = 0; i < L; i++) html += '<i style="--i:' + i + '">' + w[i] + '</i>';
    return {
      html: '<div class="ww"><div class="ring">' + html + '</div></div>',
      css: join([
        '.ww{width:var(--sz,120px);height:var(--sz,120px);display:grid;place-items:center}',
        '.ww .ring{position:relative;width:100%;height:100%;animation:a' + v.i + ' var(--dur,' + d + 's) linear infinite}',
        '.ww .ring i{position:absolute;left:50%;top:50%;font:800 var(--fs,20px)/1 system-ui,sans-serif;color:var(--c2,' + v.c2 + ');text-shadow:0 0 10px color-mix(in srgb,var(--c3,' + v.c3 + ') 50%,transparent);transform:rotate(calc(var(--i) * ' + Math.round(360 / L) + 'deg)) translateY(calc(-1 * var(--rr,46px))) rotate(180deg)}',
        '.ww .ring::before{content:"";position:absolute;inset:calc(50% - var(--rr,46px) + 6px);border:1.5px dashed color-mix(in srgb,var(--c3,' + v.c3 + ') 45%,transparent);border-radius:50%}',
        kf('a' + v.i, 'to{transform:rotate(1turn)}')
      ]),
      cfg: core(v, [range('Size', '--sz', 84, 180, 2, 120, 'px'), range('Radius', '--rr', 26, 70, 1, 46, 'px'), range('Font', '--fs', 12, 30, 1, 20, 'px')])
    };
  } });

  /* 13. echo trail — the word leaves a layered echo that stretches */
  M.push({ key: 'echotrail', title: 'Echo Trail', tags: ['text', 'shadow'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], d = D(v, 1.8);
    return {
      html: '<div class="et">' + w + '</div>',
      css: join([
        '.et{font:900 var(--fs,38px)/1 system-ui,sans-serif;color:var(--c1,' + v.c1 + ');animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('a' + v.i, '0%,100%{text-shadow:' + (2 + (v.i % 3)) + 'px ' + (2 + (v.i % 3)) + 'px 0 color-mix(in srgb,var(--c3,' + v.c3 + ') 85%,transparent),' + (5 + (v.i % 3) * 2) + 'px ' + (5 + (v.i % 3) * 2) + 'px 0 color-mix(in srgb,var(--c2,' + v.c2 + ') 55%,transparent),' + (9 + (v.i % 3) * 2) + 'px ' + (9 + (v.i % 3) * 2) + 'px 0 color-mix(in srgb,var(--c2,' + v.c2 + ') 30%,transparent)}50%{text-shadow:' + (8 + v.i % 4) + 'px ' + (8 + v.i % 4) + 'px 0 color-mix(in srgb,var(--c3,' + v.c3 + ') 85%,transparent),' + (16 + v.i % 4) + 'px ' + (16 + v.i % 4) + 'px 0 color-mix(in srgb,var(--c2,' + v.c2 + ') 55%,transparent),' + (24 + v.i % 4) + 'px ' + (24 + v.i % 4) + 'px 0 color-mix(in srgb,var(--c2,' + v.c2 + ') 30%,transparent)}')
      ]),
      cfg: core(v, [range('Font', '--fs', 24, 60, 2, 38, 'px')])
    };
  } });

  /* 14. water mirror — the word and its rippling reflection */
  M.push({ key: 'watermirror', title: 'Water Mirror', tags: ['text', 'reflect'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], d = D(v, 2.2);
    return {
      html: '<div class="wm"><div class="top">' + letters(w) + '</div><div class="mir">' + letters(w) + '</div></div>',
      css: join([
        '.wm{display:flex;flex-direction:column;align-items:center;font:800 var(--fs,32px)/1 system-ui,sans-serif;gap:4px}',
        '.wm .top i{display:inline-block;color:var(--c1,' + v.c1 + ');animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * .4)}',
        '.wm .mir{transform:scaleY(-1);opacity:.4;-webkit-mask-image:linear-gradient(0deg,transparent 25%,#000 95%);mask-image:linear-gradient(0deg,transparent 25%,#000 95%)}',
        '.wm .mir i{display:inline-block;color:var(--c2,' + v.c2 + ');animation:b' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * .4)}',
        kf('a' + v.i, '0%,100%{transform:skewX(0)}50%{transform:skewX(6deg)}'),
        kf('b' + v.i, '0%,100%{transform:skewX(0) translateY(0)}50%{transform:skewX(-6deg) translateY(2px)}')
      ]),
      cfg: core(v, [range('Font', '--fs', 20, 52, 1, 32, 'px')])
    };
  } });

  /* 15. slot decode — letters tumble through glyphs before locking */
  M.push({ key: 'slotdecode', title: 'Slot Decode', tags: ['text', 'decode', 'js'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], d = D(v, 2.8), html = '';
    for (var i = 0; i < w.length; i++) html += '<i style="--i:' + i + '">A</i>';
    return {
      html: '<div class="sd">' + html + '</div>',
      css: join([
        '.sd{display:flex;gap:var(--gap,2px);font:800 var(--fs,30px)/1 ui-monospace,Menlo,Consolas,monospace}',
        '.sd i{display:inline-block;width:1ch;text-align:center;color:var(--c3,' + v.c3 + ');opacity:.55;animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * .3)}',
        '.sd i.lock{color:var(--c1,' + v.c1 + ')!important;opacity:1;text-shadow:0 0 12px color-mix(in srgb,var(--c1,' + v.c1 + ') 60%,transparent)}',
        kf('a' + v.i, '0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}')
      ]),
      js: 'var box=root.querySelector(".sd"),sp=Array.prototype.slice.call(box.children),W="' + w + '",CH="ABCDEFGHJKLMNPQRSTUVWXYZ#$%&@*";var tick=0,ph=0,acc=0;api.raf(function(dt){acc+=dt||.016;if(acc<.09)return;acc=0;tick++;if(tick%4===0){ph=Math.min(sp.length,ph+1)}if(tick%70===0){ph=0}for(var i=0;i<sp.length;i++){if(i<ph){if(!sp[i].classList.contains("lock")){sp[i].textContent=W[i];sp[i].classList.add("lock")}}else{sp[i].classList.remove("lock");sp[i].textContent=CH[Math.floor(Math.random()*CH.length)]}}});',
      cfg: core(v, [range('Font', '--fs', 18, 44, 1, 30, 'px'), range('Gap', '--gap', 0, 10, 1, 2, 'px')])
    };
  } });

  /* 16. karaoke — a highlight walks across the lyric word by word */
  M.push({ key: 'karaoke', title: 'Karaoke', tags: ['text', 'highlight'], build: function (v) {
    var d = D(v, 2.8), nw = 5, html = '';
    for (var i = 0; i < nw; i++) html += '<i style="--i:' + i + '">' + ['MOTION', 'IS', 'PURE', 'KINETIC', 'ENERGY'][i] + '</i>';
    return {
      html: '<div class="ka">' + html + '</div>',
      css: join([
        '.ka{display:flex;gap:var(--gap,8px);font:800 var(--fs,26px)/1 system-ui,sans-serif}',
        '.ka i{display:inline-block;color:var(--c1,' + v.c1 + ');opacity:.35;animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * 5)}',
        kf('a' + v.i, '0%,14%{opacity:.35;transform:scale(1)}22%,34%{opacity:1;transform:scale(1.08);color:var(--c2,' + v.c2 + ')}44%,100%{opacity:.35;transform:scale(1);color:var(--c1,' + v.c1 + ')}')
      ]),
      cfg: core(v, [range('Font', '--fs', 16, 40, 1, 26, 'px'), range('Gap', '--gap', 4, 18, 1, 8, 'px')])
    };
  } });

  /* 17. terminal type — a mini terminal prints its boot lines */
  M.push({ key: 'terminaltype', title: 'Terminal Type', tags: ['text', 'terminal', 'js'], build: function (v) {
    var d = D(v, 3.4);
    return {
      html: '<div class="tm"><b class="l l1"></b><b class="l l2"></b><b class="l l3"></b><i class="cur"></i></div>',
      css: join([
        '.tm{width:var(--w,210px);font:600 13px/1.7 ui-monospace,Menlo,Consolas,monospace;color:var(--c1,' + v.c1 + ');background:rgba(8,8,16,.7);border:1px solid color-mix(in srgb,var(--c2,' + v.c2 + ') 35%,transparent);border-radius:8px;padding:10px 12px;box-shadow:inset 0 0 18px rgba(0,0,0,.5)}',
        '.tm .l::before{content:"> ";color:var(--c2,' + v.c2 + ')}',
        '.tm .cur{display:inline-block;width:8px;height:12px;background:var(--c3,' + v.c3 + ');vertical-align:-2px;animation:a' + v.i + ' calc(var(--dur,' + d + 's) / 8) steps(2,jump-none) infinite}',
        kf('a' + v.i, '0%,100%{opacity:1}50%{opacity:0}')
      ]),
      js: 'var L=["boot motion lab","load 1000 effects","ready in 0.42s"],el=root.querySelectorAll(".tm .l"),t=0,li=0,ci=0,hold=0;api.raf(function(){t+=.016;if(hold>0){hold-=.016;if(hold>0)return}if(li>=L.length){t=0;li=0;ci=0;for(var k=0;k<3;k++)el[k].textContent="";hold=1.2;return}var line=L[li];if(ci<line.length){if(t>.06){t=0;ci++;el[li].textContent=line.slice(0,ci)}}else{li++;ci=0;hold=.55}});',
      cfg: core(v, [range('Width', '--w', 150, 280, 2, 210, 'px')])
    };
  } });

  /* 18. sweep fill — outline letters fill in one by one */
  M.push({ key: 'sweepfill', title: 'Sweep Fill', tags: ['text', 'fill'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], d = D(v, 2.6);
    return {
      html: '<div class="sf">' + letters(w) + '</div>',
      css: join([
        '.sf{display:flex;gap:var(--gap,3px);font:800 var(--fs,36px)/1 system-ui,sans-serif}',
        '.sf i{display:inline-block;color:transparent;-webkit-text-stroke:1.6px var(--c2,' + v.c2 + ');animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('a' + v.i, '0%,18%{color:transparent}45%,70%{color:var(--c1,' + v.c1 + ')}96%,100%{color:transparent}')
      ]),
      cfg: core(v, [range('Font', '--fs', 22, 56, 2, 36, 'px'), range('Gap', '--gap', 0, 12, 1, 3, 'px')])
    };
  } });

  /* 19. diagonal drift — the word stretches along a diagonal */
  M.push({ key: 'diagdrift', title: 'Shear Stagger', tags: ['text', 'stagger'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], d = D(v, 2.2), sx = v.i % 2 ? 1 : -1;
    return {
      html: '<div class="dg">' + letters(w) + '</div>',
      css: join([
        '.dg{display:flex;gap:var(--gap,2px);font:800 var(--fs,32px)/1 system-ui,sans-serif}',
        '.dg i{display:inline-block;color:var(--c1,' + v.c1 + ');text-shadow:0 0 12px color-mix(in srgb,var(--c3,' + v.c3 + ') 40%,transparent);animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's) * .6)}',
        kf('a' + v.i, '0%,100%{transform:translate(0,0)}50%{transform:translate(calc(var(--i) * ' + sx * 4 + 'px),calc(var(--i) * ' + (v.i % 3 === 0 ? -4 : 4) + 'px))}')
      ]),
      cfg: core(v, [range('Font', '--fs', 20, 52, 1, 32, 'px'), range('Gap', '--gap', 0, 12, 1, 2, 'px')])
    };
  } });

  /* 20. bounce loop — letters bounce continuously with a squash */
  M.push({ key: 'bounceloop', title: 'Bounce Loop', tags: ['text', 'bounce'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], d = D(v, 1.3);
    return {
      html: '<div class="bl2">' + letters(w) + '</div>',
      css: join([
        '.bl2{display:flex;gap:var(--gap,2px);font:800 var(--fs,32px)/1 system-ui,sans-serif;padding-bottom:8px}',
        '.bl2 i{display:inline-block;transform-origin:50% 100%;color:var(--c1,' + v.c1 + ');animation:a' + v.i + ' var(--dur,' + d + 's) cubic-bezier(.4,0,.5,1) infinite;animation-delay:calc(var(--i) * var(--step,' + v.step + 's))}',
        kf('a' + v.i, '0%,100%{transform:translateY(0) scale(1,1)}30%{transform:translateY(calc(-1 * var(--bh,16px))) scale(1.04,.96)}45%{transform:translateY(0) scale(.94,1.08)}60%{transform:translateY(calc(-1 * var(--bh,16px) / 2)) scale(1)}')
      ]),
      cfg: core(v, [range('Font', '--fs', 20, 52, 1, 32, 'px'), range('Bounce height', '--bh', 6, 30, 1, 16, 'px')])
    };
  } });

  /* 21. long shadow — a long shadow stretches and contracts */
  M.push({ key: 'longshadow', title: 'Long Shadow', tags: ['text', 'shadow'], build: function (v) {
    var w = WORDS[v.i % WORDS.length], d = D(v, 2.4), o = v.i % 2 ? 1 : -1;
    return {
      html: '<div class="lg">' + w + '</div>',
      css: join([
        '.lg{font:900 var(--fs,40px)/1 system-ui,sans-serif;color:var(--c1,' + v.c1 + ');animation:a' + v.i + ' var(--dur,' + d + 's) ease-in-out infinite}',
        kf('a' + v.i, '0%,100%{text-shadow:' + o * 2 + 'px ' + o * 2 + 'px 0 color-mix(in srgb,var(--c3,' + v.c3 + ') 90%,transparent),' + o * 4 + 'px ' + o * 4 + 'px 0 color-mix(in srgb,var(--c3,' + v.c3 + ') 70%,transparent),' + o * 6 + 'px ' + o * 6 + 'px 0 color-mix(in srgb,var(--c2,' + v.c2 + ') 50%,transparent),' + o * 8 + 'px ' + o * 8 + 'px 0 color-mix(in srgb,var(--c2,' + v.c2 + ') 35%,transparent)}50%{text-shadow:' + o * 6 + 'px ' + o * 6 + 'px 0 color-mix(in srgb,var(--c3,' + v.c3 + ') 90%,transparent),' + o * 12 + 'px ' + o * 12 + 'px 0 color-mix(in srgb,var(--c3,' + v.c3 + ') 70%,transparent),' + o * 18 + 'px ' + o * 18 + 'px 0 color-mix(in srgb,var(--c2,' + v.c2 + ') 50%,transparent),' + o * 24 + 'px ' + o * 24 + 'px 0 color-mix(in srgb,var(--c2,' + v.c2 + ') 35%,transparent)}')
      ]),
      cfg: core(v, [range('Font', '--fs', 26, 64, 2, 40, 'px')])
    };
  } });

  K.add('text', V.matrix('text', M, 24, 'w5t'));
})(window);
