/* ============================================================
   Text FX — generated families
   Letter/word level effects driven by --i, so stagger, size, weight and
   tracking stay live controls. Mechanics differ per variant: different
   transform origins, clip paths, background-clip wipes, filters and easing.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color, sel = K.select;
  var C1 = '#7c5cff', C2 = '#22d3ee', C3 = '#ff5c8a';
  var pool = [];
  function push(o) { o.family = o.family || 'letters'; pool.push(o); }

  var WORDS = ['Motion', 'Animate', 'Sticky', 'Hello', 'Bold Type', 'Nitro', 'Reveal', 'Kinetic'];

  /* ─────────────── per-letter mechanics ─────────────── */
  var mech = [
    ['wave', 'Wave', '0%,100%{transform:translateY(0)}50%{transform:translateY(-34%)}', 1.4, .07, 'ease-in-out', '50% 100%'],
    ['bounce', 'Bounce', '0%,100%{transform:translateY(0) scale(1,.86)}30%{transform:translateY(-42%) scale(.96,1.06)}55%{transform:translateY(0) scale(1.08,.92)}70%{transform:translateY(-12%) scale(1)}', 1.1, .09, 'cubic-bezier(.3,.6,.3,1)', '50% 100%'],
    ['drop-in', 'Drop In', '0%{transform:translateY(-130%) scale(.5);opacity:0}28%,72%{transform:translateY(0) scale(1);opacity:1}100%{transform:translateY(130%) scale(.5);opacity:0}', 2.2, .06, 'cubic-bezier(.5,.05,.3,1)', '50% 50%'],
    ['rise-fade', 'Rise & Fade', '0%{transform:translateY(70%);opacity:0}35%,65%{transform:translateY(0);opacity:1}100%{transform:translateY(-70%);opacity:0}', 2, .08, 'ease-in-out', '50% 50%'],
    ['blur-focus', 'Blur Focus', '0%,100%{filter:blur(10px);opacity:.1;transform:scale(1.12)}45%{filter:blur(0);opacity:1;transform:scale(1)}', 2.4, .07, 'ease-in-out', '50% 50%'],
    ['flip-x', 'Flip X', '0%{transform:perspective(300px) rotateX(90deg);opacity:0}30%,70%{transform:perspective(300px) rotateX(0);opacity:1}100%{transform:perspective(300px) rotateX(-90deg);opacity:0}', 2, .07, 'cubic-bezier(.6,0,.3,1)', '50% 0'],
    ['flip-y', 'Flip Y', '0%,100%{transform:perspective(320px) rotateY(90deg)}25%,75%{transform:perspective(320px) rotateY(0)}50%{transform:perspective(320px) rotateY(-90deg)}', 2.6, .1, 'cubic-bezier(.5,0,.4,1)', '50% 50%'],
    ['swing', 'Swing', '0%,100%{transform:rotate(-16deg)}50%{transform:rotate(16deg)}', 1.6, .05, 'cubic-bezier(.45,0,.55,1)', '50% 0'],
    ['jitter', 'Jitter', '0%,100%{transform:translate(0,0)}20%{transform:translate(-2px,2px)}40%{transform:translate(3px,-1px)}60%{transform:translate(-1px,-3px)}80%{transform:translate(2px,1px)}', .6, .03, 'steps(1,end)', '50% 50%'],
    ['pop-scale', 'Pop Scale', '0%,100%{transform:scale(.72);opacity:.45}45%{transform:scale(1.28);opacity:1}', 1.5, .06, 'cubic-bezier(.3,.7,.2,1.4)', '50% 50%'],
    ['skew-shift', 'Skew Shift', '0%,100%{transform:skewX(0) translateX(0)}30%{transform:skewX(-16deg) translateX(-6px)}65%{transform:skewX(12deg) translateX(6px)}', 2, .05, 'ease-in-out', '50% 100%'],
    ['roll-out', 'Roll Out', '0%{transform:translateX(-40%) rotate(-120deg);opacity:0}35%,65%{transform:translateX(0) rotate(0);opacity:1}100%{transform:translateX(40%) rotate(120deg);opacity:0}', 2.4, .05, 'cubic-bezier(.55,.05,.35,1)', '50% 50%'],
    ['elastic', 'Elastic Stretch', '0%,100%{transform:scaleX(1.45) scaleY(.6)}30%{transform:scaleX(.7) scaleY(1.3)}55%{transform:scaleX(1.15) scaleY(.85)}75%{transform:scale(1)}', 1.8, .06, 'cubic-bezier(.2,.9,.2,1)', '50% 50%'],
    ['neon-breath', 'Neon Breath', '0%,100%{text-shadow:0 0 2px var(--c1,' + C1 + '),0 0 10px transparent}50%{text-shadow:0 0 6px var(--c1,' + C1 + '),0 0 26px var(--c1,' + C1 + '),0 0 46px color-mix(in srgb,var(--c1,' + C1 + ') 55%,transparent)}', 2.2, .04, 'ease-in-out', '50% 50%'],
    ['depth-drop', 'Depth Drop', '0%,100%{transform:translateY(0);text-shadow:2px 2px 0 var(--c2,' + C2 + '),4px 4px 0 color-mix(in srgb,var(--c2,' + C2 + ') 55%,transparent)}50%{transform:translateY(-8px);text-shadow:6px 12px 0 var(--c2,' + C2 + '),10px 20px 22px rgba(0,0,0,.45)}', 1.9, .05, 'cubic-bezier(.3,.7,.3,1)', '50% 50%'],
    ['spin-hue', 'Spin & Hue', '0%{transform:rotateY(0);color:var(--c1,' + C1 + ')}50%{transform:rotateY(180deg);color:var(--c2,' + C2 + ')}100%{transform:rotateY(360deg);color:var(--c1,' + C1 + ')}', 2.6, .08, 'linear', '50% 50%'],
    ['type-slide', 'Slide Reveal', '0%,100%{transform:translateX(-110%);opacity:0}25%,75%{transform:translateX(0);opacity:1}', 2.2, .06, 'cubic-bezier(.6,0,.3,1)', '50% 50%'],
    ['wobble', 'Wobble', '0%,100%{transform:rotate(0) translateX(0)}20%{transform:rotate(-8deg) translateX(-3px)}40%{transform:rotate(7deg) translateX(3px)}60%{transform:rotate(-5deg) translateX(-2px)}80%{transform:rotate(3deg) translateX(1px)}', 1.3, .05, 'ease-out', '50% 100%'],
    ['zoom-blur', 'Zoom Blur', '0%,100%{transform:scale(2.1);filter:blur(12px);opacity:0}40%{transform:scale(1);filter:blur(0);opacity:1}70%{opacity:1}', 2.6, .07, 'cubic-bezier(.2,.7,.2,1)', '50% 50%'],
    ['float-drift', 'Float Drift', '0%,100%{transform:translateY(4px) rotate(-2deg)}50%{transform:translateY(-8px) rotate(2deg)}', 3, .12, 'ease-in-out', '50% 50%'],
    ['stomp', 'Stomp', '0%{transform:translateY(-140%) scale(1.5);opacity:0}20%{transform:translateY(0) scale(.9,.8);opacity:1}30%{transform:translateY(0) scale(1)}100%{transform:translateY(0) scale(1);opacity:1}', 1.6, .09, 'cubic-bezier(.6,0,.2,1)', '50% 100%'],
    ['unfurl', 'Unfurl', '0%,100%{transform:scaleY(.06) rotate(6deg);opacity:.25}45%{transform:scaleY(1) rotate(0);opacity:1}', 2, .06, 'cubic-bezier(.3,1.4,.4,1)', '50% 0'],
    ['orbit-letter', 'Orbit Letters', '0%{transform:rotate(0) translateX(14px) rotate(0)}100%{transform:rotate(360deg) translateX(14px) rotate(-360deg)}', 2.4, .1, 'linear', '50% 50%'],
    ['shadow-sweep', 'Shadow Sweep', '0%,100%{text-shadow:-14px 0 12px color-mix(in srgb,var(--c3,' + C3 + ') 70%,transparent)}50%{text-shadow:14px 0 12px color-mix(in srgb,var(--c2,' + C2 + ') 70%,transparent)}', 2.2, .06, 'ease-in-out', '50% 50%'],
    ['split-shift', 'Split Shift', '0%,100%{transform:translateY(0);color:var(--c1,' + C1 + ')}25%{transform:translateY(-6px);color:var(--c2,' + C2 + ')}75%{transform:translateY(6px);color:var(--c3,' + C3 + ')}', 1.8, .07, 'cubic-bezier(.4,.1,.3,1)', '50% 50%'],
    ['crush', 'Crush', '0%,100%{transform:scaleX(2.6);letter-spacing:.3em;opacity:.2}50%{transform:scaleX(1);opacity:1}', 2.4, .05, 'cubic-bezier(.7,0,.2,1)', '50% 50%']
  ];
  /* ─────────────── the clean letter builder ─────────────── */
  function letterFx(o) {
    var word = o.word || 'Motion Lab';
    push({
      family: 'letter:' + o.fam + ':' + o.name,
      id: 'txt-' + o.name + (o.suffix ? '-' + o.suffix : ''),
      title: o.title,
      tags: ['text', 'css'].concat(o.tags || ['letters']),
      html: '<div class="tx' + (o.cls ? ' ' + o.cls : '') + '">' + (o.split === 'word' ? K.words(word) : K.letters(word)) + '</div>',
      css: join([
        '.tx{display:flex;gap:var(--gap,.02em);font:var(--weight,700) var(--size,' + (o.size || 46) + 'px)/1.05 "' + (o.font || 'Space Grotesk') + '",sans-serif;letter-spacing:var(--track,.02em);text-transform:' + (o.case || 'uppercase') + ';justify-content:center;' + (o.boxCss || '') + '}',
        '.tx i{display:inline-block;position:relative;transform-origin:var(--origin,' + (o.origin || '50% 50%') + ');color:var(--c1,' + C1 + ');' + (o.base || '') + 'animation:tx-' + o.name + ' var(--dur,' + (o.dur || 1.8) + 's) ' + (o.ease || 'cubic-bezier(.2,.8,.2,1)') + ' infinite;animation-delay:calc(var(--i) * var(--step,-' + (o.step || .07) + 's))' + (o.tail || '') + '}',
        (o.rules || []).join('\n'),
        kf('tx-' + o.name, o.frames)
      ]),
      cfg: [range('Size', '--size', 16, 92, 1, o.size || 46, 'px'), range('Weight', '--weight', 300, 900, 100, 700),
        range('Tracking', '--track', -.06, .5, .01, .02, 'em'), range('Gap', '--gap', 0, .3, .01, .02, 'em'),
        range('Cycle', '--dur', .05, 6, .05, o.dur || 1.8, 's'), range('Stagger', '--step', -.4, -.01, .005, -(o.step || .07), 's'),
        col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
        .concat(o.cfg || [])
    });
  }

  /* every mechanic, as a big display type demo */
  mech.forEach(function (m) {
    letterFx({
      name: m[0], fam: m[0], title: null,
      word: WORDS[Math.abs(m[0].length) % WORDS.length],
      size: 46, dur: m[3], step: m[4], ease: m[5], origin: m[6], frames: m[2],
      title: (m[1] === 'Wave' ? 'Wave Letters · Display' : m[1] + ' Letters')
    });
  });

  /* second pass: same mechanics, different words / cases / fonts so the
     effect reads differently in situ */
  [
    { name: 'wave-soft', title: 'Soft Wave Line', fam: 'wave', word: 'breathe with me', case: 'none', font: 'JetBrains Mono', size: 26, dur: 2.6, step: .05,
      frames: '0%,100%{transform:translateY(0)}50%{transform:translateY(-18%)}', tags: ['text', 'calm'],
      cfg: [col('Colour B', '--c2', C2)] },
    { name: 'stagger-mask', title: 'Wipe Mask Reveal', fam: 'mask', word: 'REVEAL', size: 62, dur: 3, step: 0,
      base: 'background:linear-gradient(90deg,var(--c1,' + C1 + ') 0 50%,rgba(160,160,200,.16) 50%) 0 0/200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;',
      frames: '0%{background-position:100% 0}45%,100%{background-position:0 0}', ease: 'cubic-bezier(.6,0,.2,1)',
      rules: ['.tx i{animation-timing-function:cubic-bezier(.6,0,.2,1)}'], tail: '',
      cfg: [range('Wipe', '--gap', 0, .2, .01, .02, 'em')] },
    { name: 'stroke-fill', title: 'Outline Fills In', fam: 'stroke', word: 'STROKE', size: 66, dur: 2.8,
      base: '-webkit-text-stroke:var(--sw,2px) var(--c1,' + C1 + ');color:transparent;text-shadow:0 0 0 transparent;',
      frames: '0%,100%{color:transparent}45%,60%{color:var(--c1,' + C1 + ')}',
      cfg: [range('Stroke', '--sw', .5, 6, .5, 2, 'px')] },
    { name: 'letter-rotate-stack', title: 'Cylinder Roll', fam: '3d', word: 'CYLINDER', size: 40, dur: 3.2, ease: 'linear', step: .09,
      origin: '50% 50%',
      boxCss: 'perspective:520px;',
      frames: '0%{transform:rotateX(0) translateZ(0)}50%{transform:rotateX(-90deg) translateZ(24px)}100%{transform:rotateX(-180deg) translateZ(0)}' },
    { name: 'rainbow-roll', title: 'Rainbow Roll', fam: 'colour', word: 'SPECTRUM', size: 44, dur: 3, step: .07,
      base: 'color:hsl(calc(var(--i) * var(--spread,26deg)) var(--sat,85%) 62%);',
      frames: '0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-26%) rotate(8deg)}',
      cfg: [range('Hue spread', '--spread', 4, 60, 1, 26, 'deg'), range('Saturation', '--sat', 20, 100, 1, 85, '%')] },
    { name: 'letter-hover-pop', title: 'Hover Pop Letters', fam: 'hover', word: 'HOVER ME', size: 44, dur: .35, step: 0,
      base: 'transition:transform .3s cubic-bezier(.3,1.6,.4,1),color .3s;',
      frames: '', rules: ['.tx i:hover{transform:translateY(-16px) scale(1.2) rotate(-4deg);color:var(--c2,' + C2 + ')}'],
      tags: ['text', 'hover'] },
    { name: 'letter-hover-cascade', title: 'Hover Cascade', fam: 'hover', word: 'CASCADE', size: 44, step: 0,
      base: 'transition:transform .4s cubic-bezier(.2,.9,.2,1) calc(var(--i) * .04s),color .4s calc(var(--i) * .04s),opacity .4s calc(var(--i) * .04s);',
      rules: ['.tx:hover i{transform:translateY(-24px) rotate(6deg);color:var(--c1,' + C1 + ');opacity:.85}'],
      frames: '', tags: ['text', 'hover'] },
    { name: 'per-word-rise', title: 'Words Rise', fam: 'words', word: 'every word rises on its own time', case: 'none', split: 'word', size: 30, dur: 2.6, step: .16,
      frames: '0%,100%{transform:translateY(120%);opacity:0}30%,70%{transform:translateY(0);opacity:1}',
      boxCss: 'flex-wrap:wrap;max-width:340px;',
      rules: ['.tx{display:flex;flex-wrap:wrap;gap:.35em}'] },
    { name: 'per-word-flip', title: 'Words Flip 3D', fam: 'words', word: 'flip each word in space', case: 'none', split: 'word', size: 28, dur: 3, step: .18,
      boxCss: 'perspective:600px;flex-wrap:wrap;gap:.3em;max-width:340px;',
      origin: '50% 100%',
      frames: '0%,100%{transform:rotateX(80deg);opacity:0}35%,65%{transform:rotateX(0);opacity:1}' },
    { name: 'letter-swap-up', title: 'Slot Machine Letters', fam: 'slot', word: 'JACKPOT', size: 46, dur: 2.4, step: 0,
      base: 'height:1.05em;overflow:hidden;',
      rules: ['.tx i::after{content:attr(data-a);position:absolute;left:0;top:0}',
        '.tx i{display:inline-grid;grid-auto-flow:row;animation:none}',
        '.tx s{display:block;animation:tx-letter-swap-up var(--dur,2.4s) steps(1,end) infinite;animation-delay:calc(var(--i) * -.13s)}',
        kf('tx-letter-swap-up', '0%{transform:translateY(0)}33%{transform:translateY(-100%)}66%{transform:translateY(-200%)}100%{transform:translateY(0)}')],
      frames: ''
    }
  ].forEach(letterFx);

  /* generic pass: every mechanic in the table gets a clean variant too */
  mech.forEach(function (m) {
    if (m[0] === 'neon-breath' || m[0] === 'depth-drop') return;
    letterFx({
      name: m[0] + '-v2', fam: m[0], title: m[1] + ' · Mono', word: WORDS[(m[0].length + 3) % WORDS.length],
      font: 'JetBrains Mono', size: 30, case: 'none', dur: m[3], step: m[4], ease: m[5], origin: m[6], frames: m[2]
    });
  });

  /* ─────────────── gradient / shine / glitch / marquee families ─────────────── */
  var gradientFams = [
    ['grad-slide', 'Sliding Gradient', 'background:linear-gradient(90deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '),var(--c3,' + C3 + '),var(--c1,' + C1 + ')) 0 0/var(--span,300%) 100%;-webkit-background-clip:text;background-clip:text;color:transparent;', 'gsslide', 'to{background-position:var(--span,300%) 0}',
      [range('Span', '--span', 120, 500, 5, 300, '%')] ],
    ['grad-spotlight', 'Cursor Spotlight Text', 'background:radial-gradient(circle var(--r,120px) at var(--mx,50%) var(--my,50%),var(--c2,' + C2 + '),var(--c1,' + C1 + ') 60%) 0 0/100% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;', 'gsspot', 'to{filter:brightness(1.15)}',
      [] ],
    ['grad-hue', 'Hue Cycle Text', 'background:linear-gradient(120deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));-webkit-background-clip:text;background-clip:text;color:transparent;filter:saturate(1.2);', 'gshue', 'to{filter:hue-rotate(360deg) saturate(1.2)}', [] ],
    ['grad-shine', 'Shine Sweep Text', 'background:linear-gradient(100deg,rgba(160,160,200,.35) 0 38%,var(--c1,' + C1 + ') 50%,rgba(160,160,200,.35) 62% 100%) 0 0/var(--span,260%) 100%;-webkit-background-clip:text;background-clip:text;color:transparent;', 'gsshine', '0%{background-position:-160% 0}100%{background-position:260% 0}',
      [range('Span', '--span', 160, 460, 5, 260, '%')] ],
    ['grad-fill-up', 'Liquid Fill Text', 'background:linear-gradient(0deg,var(--c1,' + C1 + ') 0 50%,rgba(160,160,200,.22) 50%) 0 0/100% 200%;-webkit-background-clip:text;background-clip:text;color:transparent;', 'gsfill', '0%{background-position:0 100%}100%{background-position:0 0}', [] ],
    ['grad-outline-duo', 'Two Tone Outline', '-webkit-text-stroke:var(--sw,2px) var(--c1,' + C1 + ');color:transparent;background:linear-gradient(90deg,var(--c1,' + C1 + ') 50%,transparent 0) 0 0/var(--span,200%) 100% no-repeat;background-clip:text;', 'gsduo', 'to{background-position:var(--span,200%) 0}', [] ]
  ];
  gradientFams.forEach(function (g) {
    push({
      family: 'gradient', id: g[0], title: g[1], tags: ['text', 'css', 'gradient'],
      html: '<div class="gx">GRADIENT</div>',
      css: join([
        '.gx{font:700 var(--size,52px)/1.05 "Space Grotesk",sans-serif;letter-spacing:var(--track,.01em);text-transform:uppercase;text-align:center;' + g[2] + 'animation:' + g[3] + ' var(--dur,4s) linear infinite}',
        kf(g[3], g[4])
      ]),
      cfg: [range('Size', '--size', 20, 96, 2, 52, 'px'), range('Cycle', '--dur', 1, 12, .1, 4, 's'),
        range('Stroke', '--sw', 1, 6, .5, 2, 'px'), col('Colour', '--c1', C1), col('Colour B', '--c2', C2), col('Colour C', '--c3', C3)].concat(g[5])
    });
  });

  /* glitch: layered pseudo copies with clip-path slices */
  [['glitch-rgb', 'RGB Split Glitch', '.g2{color:var(--c2,' + C2 + ')}', 'glrgb'],
   ['glitch-slices', 'Slice Glitch', '.g2{color:var(--c3,' + C3 + ')}', 'glslice'],
   ['glitch-jerk', 'Hard Jerk Glitch', '.g2{color:var(--c2,' + C2 + ')}', 'gljerk'],
   ['glitch-vhs', 'VHS Tear', '.g2{color:#a7f3d0}', 'glvhs'],
   ['glitch-scan', 'Scanline Glitch', '.g2{color:var(--c1,' + C1 + ')}', 'glscan'],
   ['glitch-soft', 'Ghost Drift', '.g2{color:color-mix(in srgb,var(--c2,' + C2 + ') 70%,transparent)}', 'glsoft']
  ].forEach(function (g, i) {
    push({
      family: 'glitch', id: g[0], title: g[1], tags: ['text', 'css', 'glitch'],
      html: '<div class="gl" data-text="GLITCH"><span>GLITCH</span><b class="g1" aria-hidden="true">GLITCH</b><b class="g2" aria-hidden="true">GLITCH</b></div>',
      css: join([
        '.gl{position:relative;font:700 var(--size,50px)/1 "Space Grotesk",sans-serif;letter-spacing:var(--track,.04em);color:var(--tx,#eef)}',
        '.gl b{position:absolute;inset:0;pointer-events:none;clip-path:inset(var(--from,0%) 0 var(--to,70%) 0)}',
        '.gl .g1{color:var(--c1,' + C1 + ');animation:' + g[3] + 'a var(--dur,2.4s) steps(12,end) infinite}',
        g[2],
        '.gl .g2{animation:' + g[3] + 'b var(--dur,2.4s) steps(12,end) infinite}',
        kf(g[3] + 'a', '0%,100%{transform:translate(0);clip-path:inset(0 0 82% 0)}20%{transform:translate(calc(var(--jerk,6px) * -1),2px);clip-path:inset(18% 0 60% 0)}40%{transform:translate(var(--jerk,6px),-2px);clip-path:inset(52% 0 22% 0)}60%{transform:translate(-3px,1px);clip-path:inset(72% 0 6% 0)}80%{transform:translate(4px,0);clip-path:inset(4% 0 88% 0)}'),
        kf(g[3] + 'b', '0%,100%{transform:translate(0);clip-path:inset(70% 0 6% 0)}25%{transform:translate(var(--jerk,6px),-3px);clip-path:inset(34% 0 42% 0)}50%{transform:translate(calc(var(--jerk,6px) * -1),2px);clip-path:inset(8% 0 78% 0)}75%{transform:translate(3px,1px);clip-path:inset(56% 0 20% 0)}'),
        i % 2 ? '.gl::after{content:"";position:absolute;inset:-6% -3%;background:repeating-linear-gradient(180deg,rgba(255,255,255,.07) 0 2px,transparent 2px 4px);mix-blend-mode:screen;pointer-events:none}' : ''
      ]),
      cfg: [range('Size', '--size', 20, 90, 2, 50, 'px'), range('Cycle', '--dur', .6, 6, .1, 2.4, 's'),
        range('Jerk', '--jerk', 0, 18, 1, 6, 'px'), range('Tracking', '--track', -.02, .3, .01, .04, 'em'),
        col('Glitch A', '--c1', C1), col('Glitch B', '--c2', C2)]
    });
  });

  /* marquee / ticker family */
  [['mq-linear', 'Infinite Ticker', 'to{transform:translateX(-50%)}', 'linear', false],
   ['mq-reverse', 'Reverse Ticker', 'to{transform:translateX(50%)}', 'linear', false],
   ['mq-pause', 'Ticker Pauses On Hover', 'to{transform:translateX(-50%)}', 'linear', true],
   ['mq-3d', 'Curved Ticker', 'to{transform:translateX(-50%) rotateX(0)}', 'linear', false],
   ['mq-vert', 'Vertical Marquee', 'to{transform:translateY(-50%)}', 'linear', false],
   ['mq-duo', 'Counter Scrolling Rows', 'to{transform:translateX(-50%)}', 'linear', false],
   ['mq-accel', 'Accelerating Ticker', '0%{transform:translateX(0)}100%{transform:translateX(-50%)}', 'cubic-bezier(.6,0,.4,1)', false],
   ['mq-steps', 'Stop-Motion Ticker', 'to{transform:translateX(-50%)}', 'steps(28,end)', false]
  ].forEach(function (m) {
    var strip = '<span>ALWAYS BOLD</span><span>NEVER BORING</span>';
    push({
      family: 'marquee', id: m[0], title: m[1], tags: ['text', 'css', 'marquee'],
      html: '<div class="mq"><div class="mq2">' + strip + strip + strip + strip + '</div>' +
        (m[0] === 'mq-duo' ? '<div class="mq2 r">' + strip + strip + strip + strip + '</div>' : '') + '</div>',
      css: join([
        '.mq{width:var(--w,280px);overflow:hidden;' + (m[0] === 'mq-vert' ? 'height:var(--h,120px);' : '') + (m[0] === 'mq-3d' ? 'perspective:340px;' : '') + 'mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}',
        '.mq2{display:flex;gap:var(--gap,28px);width:max-content;animation:mq' + m[0] + ' var(--dur,9s) ' + m[3] + ' infinite;' + (m[0] === 'mq-vert' ? 'flex-direction:column;' : '') + (m[0] === 'mq-3d' ? 'transform-style:preserve-3d;' : '') + '}',
        '.mq2 span{font:700 var(--size,30px)/1 "Space Grotesk",sans-serif;letter-spacing:.06em;color:var(--c1,' + C1 + ');white-space:nowrap;text-transform:uppercase}',
        m[0] === 'mq-3d' ? '.mq2 span{transform:rotateX(calc(var(--i,0) * 6deg))}' : '',
        m[2] ? '.mq:hover .mq2{animation-play-state:paused}' : '',
        m[0] === 'mq-duo' ? '.mq2.r{animation-direction:reverse;color:var(--c2,' + C2 + ')}.mq2.r span{color:var(--c2,' + C2 + ')}' : '',
        kf('mq' + m[0], m[2])
      ]),
      cfg: [range('Width', '--w', 160, 420, 4, 280, 'px'), range('Text', '--size', 14, 54, 1, 30, 'px'),
        range('Gap', '--gap', 6, 80, 2, 28, 'px'), range('Loop', '--dur', 2, 30, .5, 9, 's'), col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
    });
  });

  /* ─────────────── JS text effects ─────────────── */
  var jsFx = [
    ['js-typewriter', 'Typewriter Loop',
      '<div class="jy"><span class="out"></span><i class="cur"></i></div>',
      '.jy{font:500 var(--size,24px)/1.3 "JetBrains Mono",monospace;color:var(--c1,' + C1 + ')}\n.jy .cur{display:inline-block;width:.55ch;height:1.05em;background:var(--c2,' + C2 + ');vertical-align:-.16em;animation:blink var(--blink,.9s) steps(1,end) infinite}\n' + kf('blink', '50%{opacity:0}'),
      'var o=root.querySelector(".out"),lines=["const motion = art;","type: \\"keyframes\\";","// copy me anywhere"];\nvar li=0,ci=0,dir=1,t=0;\napi.raf(function(){\n  if(++t % 6) return;\n  var s=lines[li];\n  ci+=dir;\n  if(ci>s.length+4){dir=-1;ci=s.length+4}\n  if(ci<0){dir=1;ci=0;li=(li+1)%lines.length}\n  o.textContent=s.slice(0,Math.max(0,ci));\n});' ],
    ['js-scramble', 'Scramble Decode Loop',
      '<div class="jsc">DECODE ME</div>',
      '.jsc{font:700 var(--size,34px)/1 "JetBrains Mono",monospace;letter-spacing:.1em;color:var(--c1,' + C1 + ')}',
      'var el=root.querySelector(".jsc"),words=["DECODE ME","SIGNAL LOCK","MAKE IT MOVE"],w=0,t=0;\napi.raf(function(){\n  t++;var s=words[w],out="",hold=Math.floor(t/2);\n  for(var i=0;i<s.length;i++){\n    if(i<hold){out+=s[i]}\n    else if(s[i]===" "){out+=" "}\n    else{out+=String.fromCharCode(33+Math.floor(Math.random()*90))}\n  }\n  el.textContent=out;\n  if(hold>s.length+10){t=0;w=(w+1)%words.length}\n});' ],
    ['js-counter-roll', 'Rolling Counter',
      '<div class="jco"><b>0000</b></div>',
      '.jco b{font:700 var(--size,54px)/1 "JetBrains Mono",monospace;color:var(--c1,' + C1 + ');font-variant-numeric:tabular-nums;text-shadow:0 0 var(--glow,18px) color-mix(in srgb,var(--c1,' + C1 + ') 55%,transparent)}',
      'var b=root.querySelector("b"),v=0,d=1;\napi.raf(function(){v+=d*13;if(v>9999){v=9999;d=-1}if(v<0){v=0;d=1}b.textContent=("0000"+Math.floor(v)).slice(-4);});' ],
    ['js-count-up', 'Count Up To Target',
      '<div class="jcu"><b>0</b><span>views</span></div>',
      '.jcu{display:grid;justify-items:center}\n.jcu b{font:700 var(--size,58px)/1 "Space Grotesk",sans-serif;color:var(--c1,' + C1 + ')}\n.jcu span{font:500 12px "JetBrains Mono",monospace;letter-spacing:.3em;color:#8f8fa8;text-transform:uppercase}',
      'var b=root.querySelector("b"),t0=null,T=2400;\nfunction ease(p){return 1-Math.pow(1-p,3)}\napi.raf(function(){\n  var now=performance.now();if(t0===null)t0=now;\n  var p=Math.min((now-t0)/' + '2400' + ',1);b.textContent=Math.round(ease(p)*102487).toLocaleString("en-US");\n  if(p>=1)t0=now;\n});' ],
    ['js-morph-words', 'Word Height Morph',
      '<div class="jmw">I <em>love</em> motion</div>',
      '.jmw{font:700 var(--size,32px)/1.2 "Space Grotesk",sans-serif;color:#e8e8f5}\n.jmw em{font-style:normal;color:var(--c1,' + C1 + ');display:inline-block;min-width:5ch;text-align:center;border-bottom:2px solid var(--c2,' + C2 + ')}',
      'var e=root.querySelector("em"),ws=["love","feel","chase","steal","ship"],i=0,t=0;\napi.raf(function(){\n  t++;var p=(t%70)/70;\n  e.style.transform="translateY("+(-Math.sin(p*3.1416)*8).toFixed(1)+"px)";\n  if(t%70===0){i=(i+1)%ws.length;e.textContent=ws[i]}\n});' ],
    ['js-kinetic-scale', 'Kinetic Type Scroll',
      '<div class="jk2"><b>SCROLL</b></div>',
      '.jk2{width:var(--w,240px);height:110px;overflow:auto;scrollbar-width:none}\n.jk2 b{display:block;font:700 40px/1 "Space Grotesk",sans-serif;color:var(--c1,' + C1 + ')}\n.jk2 i{display:block;height:var(--h,420px)}',
      'var box=root.querySelector(".jk2"),b=root.querySelector("b");\nbox.innerHTML="<b>SCROLL</b><i></i>";box.addEventListener("scroll",function(){var p=box.scrollTop/(box.scrollHeight-box.clientHeight||1);b.style.transform="scale("+(1+p*.9).toFixed(3)+") rotate("+(p*10-5).toFixed(2)+"deg)";b.style.letterSpacing=(p*.3).toFixed(3)+"em"},{passive:true});' ],
    ['js-tilt-letters', 'Cursor Tilt Letters',
      '<div class="jt2">' + K.letters('TILT') + '</div>',
      '.jt2{display:flex;gap:var(--gap,4px);font:700 var(--size,58px)/1 "Space Grotesk",sans-serif;perspective:400px}\n.jt2 i{display:inline-block;transition:transform .35s cubic-bezier(.2,.9,.2,1),color .35s;color:var(--c1,' + C1 + ')}',
      'var w=root.querySelector(".jt2"),L=w.querySelectorAll("i");\nw.addEventListener("pointermove",function(e){var r=w.getBoundingClientRect();\n  for(var i=0;i<L.length;i++){var b=L[i].getBoundingClientRect(),dx=(e.clientX-(b.left+b.width/2))/60,dy=(e.clientY-(b.top+b.height/2))/60;\n  L[i].style.transform="perspective(300px) rotateY("+(dx*6).toFixed(2)+"deg) rotateX("+(-dy*6).toFixed(2)+"deg) translateZ("+Math.max(0,14-Math.abs(dx)*4).toFixed(1)+"px)";L[i].style.color=Math.abs(dx)<.6?"var(--c2,#22d3ee)":""}});\nw.addEventListener("pointerleave",function(){for(var i=0;i<L.length;i++)L[i].style.transform=""});' ]
  ];
  jsFx.forEach(function (j) {
    push({
      family: 'jstext', id: j[0], title: j[1], tags: ['text', 'js'], html: j[2], css: j[3], js: j[4],
      cfg: [range('Size', '--size', 14, 76, 1, 34, 'px'), col('Colour', '--c1', C1), col('Colour B', '--c2', C2)]
    });
  });

  K.add('text', pool);
})(window);
