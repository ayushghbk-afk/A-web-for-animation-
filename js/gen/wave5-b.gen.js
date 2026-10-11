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

  var M = [];

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

  K.add('buttons', V.matrix('buttons', M, 24, 'w5b'));
})(window);
