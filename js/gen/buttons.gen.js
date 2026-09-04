/* ============================================================
   Buttons — generated families
   Real micro-interactions: fills, draws, state machines, ripples, magnets.
   Anything a variant reads as var(--x, fallback) becomes a control.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color, letters = K.letters;
  var C1 = '#7c5cff', C2 = '#22d3ee', C3 = '#ff5c8a';
  var pool = [];
  function push(o) { o.family = o.family || 'btn'; pool.push(o); }

  /* a family's `extra` may be either loose declarations (leading ';') or whole
     rules — splice declarations into the open block so the sheet stays valid */
  function withBase(block, extra) {
    var e = (extra || '').trim();
    if (!e) return block;
    if (e[0] !== ';') return block + '\n' + e;
    var nl = e.indexOf('\n');                       /* decls go inside, rules stay outside */
    var decls = nl === -1 ? e : e.slice(0, nl);
    var rest = nl === -1 ? '' : e.slice(nl + 1);
    return block.slice(0, block.lastIndexOf('}')) + decls + '}' + (rest ? '\n' + rest : '');
  }

  var STD = [
    range('Width', '--padx', 12, 52, 1, 30, 'px'),
    range('Height', '--pad', 6, 28, 1, 15, 'px'),
    range('Corner', '--radius', 0, 40, 1, 12, 'px'),
    range('Text', '--fs', 11, 24, 1, 15, 'px'),
    range('Border', '--bw', 0, 6, .5, 0, 'px'),
    range('Spring', '--tt', .05, .9, .01, .35, 's'),
    col('Base', '--c1', C1),
    col('Hover', '--c2', C2),
    col('Text', '--ct', '#ffffff')
  ];

  function btn(o) {
    return {
      family: 'btn:' + o.name,
      id: 'btn-' + o.name,
      title: o.title,
      tags: ['button'].concat(o.tags || ['hover', 'css']),
      html: o.html || '<button class="b">' + (o.label || 'Hover me') + '</button>',
      css: join([
        withBase('.b{position:relative;padding:var(--pad,15px) var(--padx,30px);border:var(--bw,0) solid var(--c2,' + C2 + ');border-radius:var(--radius,12px);background:var(--bg,' + C1 + ');color:var(--ct,#fff);font:600 var(--fs,15px)/1 "Space Grotesk",sans-serif;letter-spacing:var(--track,.01em);cursor:pointer;overflow:hidden;z-index:0;transition:transform var(--tt,.35s) var(--te,cubic-bezier(.2,.9,.2,1)),box-shadow var(--tt,.35s),color var(--tt,.35s),background var(--tt,.35s);isolation:isolate}', o.base),
        '.b:hover{transform:translateY(var(--lift,-2px))' + (o.hoverExtra || '') + '}',
        '.b:active{transform:translateY(1px) scale(.98)}',
        o.ink || '',
        o.frames || ''
      ]),
      js: o.js,
      cfg: STD.filter(function (c) { return o.skip ? o.skip.indexOf(c.k) < 0 : true })
        .filter(function (c) { return c.k === '--bw' ? (o.base || '').indexOf('--bw') > -1 : true })
        .concat(o.cfg || [])
    };
  }

  /* ───────── 1. fill wipes ───────── */
  var fills = {
    left: ['scaleX(0)', 'transform-origin:left', 'left'],
    right: ['scaleX(0)', 'transform-origin:right', 'right'],
    top: ['scaleY(0)', 'transform-origin:top', 'top'],
    bottom: ['scaleY(0)', 'transform-origin:bottom', 'bottom'],
    centre: ['scale(0)', 'transform-origin:50% 50%', 'center'],
    diagonal: ['scaleX(0) skewX(-20deg)', 'transform-origin:left', 'left'],
    curtain: ['scaleY(0)', 'transform-origin:top;border-radius:0 0 50% 50%/0 0 18px 18px', 'top']
  };
  Object.keys(fills).forEach(function (dir) {
    var f = fills[dir];
    push(btn({
      name: 'fill-' + dir, title: 'Wipe Fill \u00b7 ' + dir[0].toUpperCase() + dir.slice(1),
      base: ';--bg:transparent;color:var(--c1,' + C1 + ');border-width:2px;border-color:var(--c1,' + C1 + ')',
      ink: '.b::before{content:"";position:absolute;inset:0;background:var(--c1,' + C1 + ');z-index:-1;transform:' + f[0] + ';' + f[1] + ';transition:transform var(--tt,.42s) cubic-bezier(.65,0,.35,1)}' +
        '.b:hover{color:var(--ct,#fff)}.b:hover::before{transform:' + (dir === 'centre' ? 'scale(1)' : dir === 'diagonal' ? 'scaleX(1) skewX(0)' : f[0].indexOf('X') > -1 ? 'scaleX(1)' : 'scaleY(1)') + '}',
      skip: ['--bw']
    }));
  });

  /* ───────── 2. borders that draw themselves ───────── */
  [['border-draw-svg', 'Border Draw (SVG)', '<button class="b bd2"><span>Draw border</span><svg viewBox="0 0 200 60" preserveAspectRatio="none"><rect x="2" y="2" width="196" height="56" rx="var(--rx,26)"/></svg></button>',
    '.bd2{width:200px;height:60px;padding:0;background:transparent;border:0;color:var(--ct,#e8e8f5)}\n.bd2 svg{position:absolute;inset:0;width:100%;height:100%;fill:none;stroke:var(--c1,' + C1 + ');stroke-width:var(--bw,3);stroke-dasharray:var(--dash,80) 460;transition:stroke-dasharray .6s cubic-bezier(.65,0,.35,1),stroke-dashoffset .6s;pointer-events:none}\n.bd2:hover svg{stroke-dasharray:520 0;stroke-dashoffset:-80}'],
   ['border-trail', 'Travelling Border Trail', '<button class="b bd2"><span>Trail</span><svg viewBox="0 0 200 60" preserveAspectRatio="none"><rect x="2" y="2" width="196" height="56" rx="var(--rx,26)"/></svg></button>',
    '.bd2{width:200px;height:60px;padding:0;background:rgba(140,140,180,.1);border:0;color:var(--ct,#e8e8f5)}\n.bd2 svg{position:absolute;inset:0;width:100%;height:100%;fill:none;stroke:var(--c1,' + C1 + ');stroke-width:var(--bw,3);stroke-dasharray:44 466;animation:bdtr 3.4s linear infinite;pointer-events:none}\n@keyframes bdtr{to{stroke-dashoffset:-510}}'],
   ['border-offset', 'Offset Frame Grow', null,
    ';--bg:transparent;color:var(--c1,' + C1 + ')\n.b::after{content:"";position:absolute;inset:0;border:2px solid var(--c1,' + C1 + ');border-radius:var(--radius,12px);transform:translate(0,0);transition:transform .3s cubic-bezier(.2,.9,.2,1),opacity .3s;opacity:0}\n.b:hover::after{transform:translate(7px,7px);opacity:1}'],
   ['border-double', 'Double Border Slide', null,
    ';--bg:transparent;color:var(--c1,' + C1 + ')\n.b::before{content:"";position:absolute;inset:var(--inset,-6px);border:2px solid var(--c2,' + C2 + ');border-radius:calc(var(--radius,12px) + 6px);opacity:0;transform:scale(.86);transition:.34s cubic-bezier(.2,.9,.2,1)}\n.b::after{content:"";position:absolute;inset:0;border:2px solid var(--c1,' + C1 + ');border-radius:var(--radius,12px);transition:.34s}\n.b:hover::before{opacity:1;transform:scale(1)}\n.b:hover{background:color-mix(in srgb,var(--c1,' + C1 + ') 14%,transparent)}'],
   ['border-thickness', 'Border Swells', null,
    ';--bg:transparent;color:var(--c1,' + C1 + ');border:var(--bw,1px) solid var(--c1,' + C1 + ')\n.b:hover{border-width:var(--bwh,7px);color:var(--ct,#fff)}'],
   ['corner-brackets-btn', 'Corner Brackets Snap', null,
    ';--bg:transparent;color:var(--c1,' + C1 + ')\n.b::before,.b::after{content:"";position:absolute;width:14px;height:14px;border:2px solid var(--c2,' + C2 + ');opacity:0;transition:.3s cubic-bezier(.2,.9,.2,1)}\n.b::before{top:-3px;left:-3px;border-right:0;border-bottom:0;border-radius:var(--radius,12px) 0 0 0}\n.b::after{bottom:-3px;right:-3px;border-left:0;border-top:0;border-radius:0 0 var(--radius,12px) 0}\n.b:hover::before,.b:hover::after{opacity:1;transform:translate(2px,2px)}']
  ].forEach(function (b) {
    push({
      family: 'btn:' + b[0], id: b[0], title: b[1], tags: ['button', 'hover', 'css'],
      html: b[2] || '<button class="b">' + b[1] + '</button>',
      css: join([
        withBase('.b{position:relative;padding:var(--pad,15px) var(--padx,30px);border:0;border-radius:var(--radius,12px);background:var(--bg,' + C1 + ');color:var(--ct,#fff);font:600 var(--fs,15px)/1 "Space Grotesk",sans-serif;cursor:pointer;transition:all var(--tt,.3s) cubic-bezier(.2,.9,.2,1);overflow:' + (b[2] ? 'visible' : 'hidden') + '}', b[3]),
        '.b:hover{transform:translateY(-2px)}'
      ]),
      cfg: [range('Width', '--padx', 12, 52, 1, 30, 'px'), range('Height', '--pad', 6, 28, 1, 15, 'px'),
        range('Corner', '--radius', 0, 30, 1, 12, 'px'), range('Stroke', '--bw', 1, 8, .5, 3, 'px'),
        range('Inset', '--inset', -14, 6, 1, -6, 'px'), col('Base', '--c1', C1), col('Hover', '--c2', C2)]
    });
  });

  /* ───────── 3. shine & glare ───────── */
  [['shine-single', 'One Pass Shine', 1], ['shine-double', 'Double Flash', 2],
   ['shine-wide', 'Wide Glare', 1], ['shine-thin', 'Laser Line', 1], ['shine-slant', 'Slanted Glare', 1]
  ].forEach(function (sh, i) {
    var w = sh[0] === 'shine-wide' ? '120%' : sh[0] === 'shine-thin' ? '14%' : '58%';
    var skew = sh[0] === 'shine-slant' ? '-34deg' : '-20deg';
    push({
      family: 'btn:' + sh[0], id: sh[0], title: sh[1] + ' Button', tags: ['button', 'hover', 'css'],
      html: '<button class="b">' + (sh[2] === 2 ? 'Hover twice' : 'Hover me') + '</button>',
      css: join([
        '.b{position:relative;padding:var(--pad,16px) var(--padx,34px);border:0;border-radius:var(--radius,14px);background:linear-gradient(120deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));color:var(--ct,#fff);font:600 var(--fs,15px)/1 "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;transition:transform var(--tt,.3s) cubic-bezier(.2,.9,.2,1),box-shadow .3s;box-shadow:0 10px 26px -12px var(--c1,' + C1 + ')}',
        '.b::after{content:"";position:absolute;top:0;left:-140%;width:' + w + ';height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,' + (sh[0] === 'shine-thin' ? .9 : .5) + '),transparent);transform:skewX(' + skew + ');transition:left .7s cubic-bezier(.4,.1,.3,1)' + (sh[2] === 2 ? ';transition-delay:.18s' : '') + '}',
        '.b:hover{transform:translateY(-3px)}',
        '.b:hover::after{left:150%}',
        i === 4 ? '.b{background:linear-gradient(120deg,var(--c1,' + C1 + ') 0 60%,var(--c3,' + C3 + ') 60% 100%)}' : ''
      ]),
      cfg: [range('Width', '--padx', 12, 52, 1, 34, 'px'), range('Height', '--pad', 6, 28, 1, 16, 'px'),
        range('Corner', '--radius', 0, 40, 1, 14, 'px'), range('Text', '--fs', 11, 24, 1, 15, 'px'),
        col('Base', '--c1', C1), col('Shine tint', '--c2', C2)]
    });
  });

  /* ───────── 4. press / depth ───────── */
  [['press-classic', 'Chunky Press', C3, '#b03a60'], ['press-neon', 'Neon Press', '#22d3ee', '#0e7490'],
   ['press-paper', 'Paper Press', '#e8e8f5', '#9a9ab0'], ['press-glass', 'Glass Press', '#8c8cc8', '#14142a'],
   ['press-side', 'Side Depth', C1, '#3f2fa8'], ['press-rock', 'Rocking Press', '#34d399', '#0f766e']
  ].forEach(function (p) {
    push({
      family: 'btn:' + p[0], id: p[0], title: p[1], tags: ['button', 'click', '3d'],
      html: '<button class="b">' + (p[1].split(' ')[0]).toUpperCase() + '</button>',
      css: join([
        '.b{padding:var(--pad,16px) var(--padx,34px);border:0;border-radius:var(--radius,12px);background:var(--c1,' + p[2] + ');color:var(--ct,#fff);font:700 var(--fs,16px)/1 "Space Grotesk",sans-serif;letter-spacing:.06em;cursor:pointer;box-shadow:0 var(--d,7px) 0 var(--c2,' + p[3] + '),0 calc(var(--d,7px) + 8px) 20px -6px rgba(0,0,0,.55);transition:transform .1s ease,box-shadow .1s ease}',
        '.b:hover{filter:brightness(1.07)}',
        '.b:active{transform:translateY(var(--d,7px));box-shadow:0 0 0 var(--c2,' + p[3] + '),0 3px 8px -4px rgba(0,0,0,.5)}',
        p[0] === 'press-rock' ? '.b{transition:transform .16s cubic-bezier(.3,1.5,.4,1),box-shadow .1s}.b:active{transform:translateY(var(--d,7px)) rotate(-2deg)}' : ''
      ]),
      cfg: [range('Depth', '--d', 2, 16, 1, 7, 'px'), range('Width', '--padx', 12, 52, 1, 34, 'px'),
        range('Height', '--pad', 6, 28, 1, 16, 'px'), range('Corner', '--radius', 0, 34, 1, 12, 'px'),
        range('Text', '--fs', 11, 26, 1, 16, 'px'), col('Face', '--c1', p[2]), col('Edge', '--c2', p[3])]
    });
  });

  /* ───────── 5. icon motion ───────── */
  var icons = {
    arrow: ['\u2192', 'translateX(6px)', 'arrow'],
    plus: ['+', 'rotate(90deg)', 'plus'],
    download: ['\u2193', 'translateY(4px) scaleY(1.2)', 'download'],
    chevron: ['\u203A', 'rotate(90deg) translateX(3px)', 'chevron'],
    star: ['\u2605', 'scale(1.35) rotate(20deg)', 'star'],
    play: ['\u25B6', 'scale(1.18)', 'play'],
    send: ['\u27A4', 'translate(8px,-6px) rotate(12deg)', 'send']
  };
  Object.keys(icons).forEach(function (k) {
    var ic = icons[k];
    push({
      family: 'btn:icon', id: 'btn-icon-' + ic[2], title: 'Icon ' + ic[2][0].toUpperCase() + ic[2].slice(1) + ' Motion',
      tags: ['button', 'hover', 'css'],
      html: '<button class="b"><span>' + (ic[2] === 'plus' ? 'Add' : ic[2]) + '</span><i>' + ic[0] + '</i></button>',
      css: join([
        '.b{display:inline-flex;align-items:center;gap:10px;padding:var(--pad,14px) var(--padx,24px);border:var(--bw,1px) solid color-mix(in srgb,var(--c1,' + C1 + ') 55%,transparent);border-radius:var(--radius,99px);background:color-mix(in srgb,var(--c1,' + C1 + ') 16%,transparent);color:var(--ct,#e8e8f5);font:600 var(--fs,15px)/1 "Space Grotesk",sans-serif;cursor:pointer;transition:background .3s,border-color .3s,transform var(--tt,.3s) cubic-bezier(.2,.9,.2,1)}',
        '.b i{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--c1,' + C1 + ');color:#fff;font-style:normal;font-size:13px;transition:transform .34s cubic-bezier(.3,1.5,.4,1),background .3s}',
        '.b:hover{background:var(--c1,' + C1 + ');border-color:var(--c1,' + C1 + ')}',
        '.b:hover i{transform:' + ic[1] + ';background:var(--c2,' + C2 + ')}',
        '.b:active{transform:scale(.97)}'
      ]),
      cfg: [range('Width', '--padx', 10, 44, 1, 24, 'px'), range('Height', '--pad', 6, 26, 1, 14, 'px'),
        range('Corner', '--radius', 0, 120, 1, 99, 'px'), range('Ring', '--bw', 0, 5, .5, 1, 'px'),
        range('Text', '--fs', 11, 24, 1, 15, 'px'), col('Base', '--c1', C1), col('Icon', '--c2', C2)]
    });
  });

  /* ───────── 6. text swaps ───────── */
  [['swap-slide', 'Text Slides Up'], ['swap-flip', 'Flip The Label'], ['swap-blur', 'Blur Swap'],
   ['swap-scale', 'Scale Out / In'], ['swap-letters', 'Letter Cascade'], ['swap-slide-right', 'Text Slides Right']
  ].forEach(function (t) {
    var two = '<span class="a">Send it</span><span class="b2">' + (t[0] === 'swap-letters' ? letters('Sent!') : 'Sent!') + '</span>';
    push({
      family: 'btn:' + t[0], id: t[0], title: t[1], tags: ['button', 'hover', 'css'],
      html: '<button class="b"><span class="in">' + two + '</span></button>',
      css: join([
        '.b{position:relative;padding:var(--pad,15px) var(--padx,32px);border:0;border-radius:var(--radius,12px);background:var(--c1,' + C1 + ');color:var(--ct,#fff);font:600 var(--fs,15px)/1 "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden}',
        '.b .in{display:block;position:relative;height:1em;overflow:hidden}',
        '.b .a,.b .b2{display:block;transition:transform var(--tt,.42s) cubic-bezier(.6,0,.25,1),opacity .3s}',
        '.b .b2{position:absolute;inset:0;color:var(--c2,' + C2 + ')}',
        t[0] === 'swap-letters' ? '.b .b2 i{display:inline-block;transform:translateY(-100%);transition:transform .3s cubic-bezier(.2,.9,.2,1) calc(var(--i) * .04s)}' : '',
        t[0] === 'swap-blur' ? '.b .a,.b .b2{filter:blur(0)}' : '',
        t[0] === 'swap-slide-right' ? '.b .a{transform:translateX(0)}.b .b2{transform:translateX(120%)}.b:hover .a{transform:translateX(-120%);opacity:0}.b:hover .b2{transform:translateX(0)}'
          : t[0] === 'swap-flip' ? '.b .a{transform:rotateX(0)}.b .b2{transform:rotateX(-90deg);transform-origin:50% 0}.b:hover .a{transform:rotateX(90deg);opacity:0}.b:hover .b2{transform:rotateX(0)}'
            : t[0] === 'swap-blur' ? '.b:hover .a{transform:translateY(-100%);filter:blur(6px);opacity:0}.b:hover .b2{transform:translateY(0);filter:blur(0)}.b .b2{transform:translateY(100%);filter:blur(6px);opacity:0}'
              : t[0] === 'swap-scale' ? '.b:hover .a{transform:scale(.4);opacity:0}.b .b2{transform:scale(1.6);opacity:0}.b:hover .b2{transform:scale(1);opacity:1}'
                : t[0] === 'swap-letters' ? '.b .a{transform:translateY(-100%)}.b:hover .a{transform:translateY(100%);opacity:0}.b:hover .b2{transform:translateY(0)}.b .b2{transform:translateY(0)}'
                  : '.b .a{transform:translateY(0)}.b .b2{transform:translateY(100%)}.b:hover .a{transform:translateY(-100%);opacity:0}.b:hover .b2{transform:translateY(0)}',
        t[0] === 'swap-letters' ? '.b:hover .b2 i{transform:translateY(0)}' : ''
      ]),
      cfg: [range('Width', '--padx', 12, 52, 1, 32, 'px'), range('Height', '--pad', 6, 28, 1, 15, 'px'),
        range('Corner', '--radius', 0, 40, 1, 12, 'px'), range('Text', '--fs', 11, 24, 1, 15, 'px'),
        range('Speed', '--tt', .1, 1, .02, .42, 's'), col('Base', '--c1', C1), col('Reveal', '--c2', C2)]
    });
  });

  /* ───────── 7. glow & neon ───────── */
  [['neon-pulse', 'Neon Pulse', 'nnp', '0%,100%{box-shadow:0 0 6px color-mix(in srgb,var(--c1) 60%,transparent),inset 0 0 6px color-mix(in srgb,var(--c1) 30%,transparent)}50%{box-shadow:0 0 26px color-mix(in srgb,var(--c1) 85%,transparent),inset 0 0 16px color-mix(in srgb,var(--c1) 45%,transparent)}', 2.2],
   ['neon-flicker', 'Neon Flicker', 'nnf', '0%,18%,22%,54%,58%,100%{opacity:1;filter:brightness(1)}20%,56%{opacity:.35;filter:brightness(2)}', 3.4],
   ['neon-halo', 'Halo Expand', 'nnh', '0%,100%{box-shadow:0 0 0 0 color-mix(in srgb,var(--c2) 55%,transparent)}60%{box-shadow:0 0 0 var(--ring,18px) transparent}', 1.8],
   ['neon-text', 'Tube Text', 'nnt', '0%,100%{text-shadow:0 0 4px var(--c1),0 0 12px var(--c1)}50%{text-shadow:0 0 10px var(--c1),0 0 30px var(--c1),0 0 60px color-mix(in srgb,var(--c1) 60%,transparent)}', 2.8],
   ['glow-border', 'Border Glow Sweep', 'ngb', '0%{--a:0deg}100%{--a:360deg}', 3]
  ].forEach(function (g) {
    push({
      family: 'btn:' + g[0], id: g[0], title: g[1] + ' Button', tags: ['button', 'glow', 'css'],
      html: '<button class="b">' + g[1].toUpperCase() + '</button>',
      css: join([
        '@property --a{syntax:"<angle>";inherits:false;initial-value:0deg}',
        '.b{position:relative;padding:var(--pad,16px) var(--padx,34px);border:var(--bw,2px) solid var(--c1,' + C1 + ');border-radius:var(--radius,12px);background:' + (g[0] === 'glow-border' ? 'transparent' : 'rgba(10,10,20,.6)') + ';color:var(--c1,' + C1 + ');font:700 var(--fs,15px)/1 "Space Grotesk",sans-serif;letter-spacing:.14em;cursor:pointer;transition:color .3s,transform var(--tt,.3s) cubic-bezier(.2,.9,.2,1);animation:' + g[2] + ' var(--dur,' + g[4] + 's) ease-in-out infinite}',
        g[0] === 'glow-border' ? '.b::before{content:"";position:absolute;inset:calc(var(--bw,2px) * -1);border-radius:inherit;background:conic-gradient(from var(--a),transparent 0 62%,var(--c1,' + C1 + ') 78%,var(--c2,' + C2 + ') 92%,transparent 100%);z-index:-1;filter:blur(1px);animation:' + g[2] + ' var(--dur,3s) linear infinite}' : '',
        '.b:hover{color:var(--ct,#fff);background:color-mix(in srgb,var(--c1) 26%,transparent);text-shadow:0 0 10px var(--c1,' + C1 + ')}',
        kf(g[2], g[3])
      ]),
      cfg: [range('Cycle', '--dur', .6, 6, .1, g[4], 's'), range('Ring', '--ring', 4, 40, 1, 18, 'px'),
        range('Border', '--bw', 1, 8, .5, 2, 'px'), range('Width', '--padx', 12, 52, 1, 34, 'px'),
        range('Height', '--pad', 6, 28, 1, 16, 'px'), col('Neon', '--c1', C2), col('Neon B', '--c2', C1)]
    });
  });

  /* ───────── 8. gradient & hue ───────── */
  [['grad-shift', 'Gradient Slide', 'to{background-position:var(--span,300%) 0}', 6],
   ['grad-hue', 'Hue Spin', 'to{filter:hue-rotate(360deg)}', 7],
   ['grad-border', 'Gradient Border Spin', 'to{--a:360deg}', 4],
   ['grad-animated-duo', 'Two Tone Swap', 'to{background-position:100% 0}', 3]
  ].forEach(function (g) {
    push({
      family: 'btn:' + g[0], id: g[0], title: g[1] + ' Button', tags: ['button', 'gradient', 'css'],
      html: '<button class="b">Gradient</button>',
      css: join([
        '@property --a{syntax:"<angle>";inherits:false;initial-value:0deg}',
        '.b{position:relative;padding:var(--pad,16px) var(--padx,34px);border:0;border-radius:var(--radius,14px);color:#fff;font:700 var(--fs,15px)/1 "Space Grotesk",sans-serif;cursor:pointer;background:' + (g[0] === 'grad-border' ? 'transparent' : 'linear-gradient(110deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '),var(--c3,' + C3 + '),var(--c1,' + C1 + ')) 0 0/var(--span,300%) 100%') + ';transition:transform var(--tt,.3s) cubic-bezier(.2,.9,.2,1),box-shadow .3s;box-shadow:0 12px 30px -14px var(--c1,' + C1 + ')}',
        g[0] === 'grad-border' ? '.b::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:var(--bw,3px);background:conic-gradient(from var(--a),var(--c1,' + C1 + '),var(--c2,' + C2 + '),var(--c3,' + C3 + '),var(--c1,' + C1 + '));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:gdb var(--dur,4s) linear infinite}' : '',
        g[0] === 'grad-border' ? '.b span{color:var(--ct,#e8e8f5)}' : '',
        g[0] === 'grad-animated-duo' ? '.b{background:linear-gradient(90deg,var(--c1,' + C1 + ') 0 50%,var(--c2,' + C2 + ') 50%) 0 0/200% 100%;color:var(--ct,#fff)}' : '',
        '.b:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 20px 40px -16px var(--c1,' + C1 + ')}',
        '.b{animation:' + (g[0] === 'grad-border' ? 'gdc' : g[0] === 'grad-animated-duo' ? 'gda' : 'gsx') + ' var(--dur,' + g[3] + 's) ' + (g[0] === 'grad-hue' ? 'linear infinite' : 'ease-in-out infinite alternate') + '}',
        kf('gsx', g[2]), kf('gdb', 'to{--a:360deg}'), kf('gdc', 'to{--a:360deg}'), kf('gda', 'to{background-position:100% 0}')
      ]),
      cfg: [range('Span', '--span', 140, 500, 5, 300, '%'), range('Cycle', '--dur', 1, 14, .2, g[3], 's'),
        range('Border', '--bw', 1, 8, .5, 3, 'px'), range('Width', '--padx', 12, 52, 1, 34, 'px'),
        range('Height', '--pad', 6, 28, 1, 16, 'px'), range('Corner', '--radius', 0, 40, 1, 14, 'px'),
        col('Colour', '--c1', C1), col('Colour B', '--c2', C2), col('Colour C', '--c3', C3)]
    });
  });

  /* ───────── 9. JS buttons: ripples, magnets, state machines ───────── */
  var jsBtns = [
    ['js-ripple-classic', 'Ripple From Click',
      '.b{position:relative;padding:var(--pad,16px) var(--padx,34px);border:0;border-radius:var(--radius,12px);background:var(--c1,' + C1 + ');color:#fff;font:600 var(--fs,15px)/1 "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;box-shadow:0 10px 24px -12px var(--c1,' + C1 + ')}\n.b i{position:absolute;border-radius:50%;background:rgba(255,255,255,.6);transform:scale(0);animation:brp var(--dur,.66s) ease-out forwards;pointer-events:none}\n' + kf('brp', 'to{transform:scale(2.8);opacity:0}'),
      'var b=root.querySelector(".b");\nb.addEventListener("click",function(e){var r=b.getBoundingClientRect(),d=Math.max(r.width,r.height)*1.4,i=document.createElement("i");\n  i.style.width=i.style.height=d+"px";i.style.left=(e.clientX-r.left-d/2)+"px";i.style.top=(e.clientY-r.top-d/2)+"px";\n  b.appendChild(i);setTimeout(function(){i.remove()},700);});',
      []],
    ['js-ripple-centre', 'Centred Ripple',
      '.b{position:relative;padding:var(--pad,16px) var(--padx,34px);border:var(--bw,2px) solid var(--c1,' + C1 + ');border-radius:var(--radius,99px);background:transparent;color:var(--c1,' + C1 + ');font:600 var(--fs,15px)/1 "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;transition:color .3s}\n.b i{position:absolute;left:50%;top:50%;width:8px;height:8px;margin:-4px;border-radius:50%;background:var(--c1,' + C1 + ');animation:brc var(--dur,.7s) cubic-bezier(.2,.7,.2,1) forwards;pointer-events:none;z-index:-1}\n.b:hover{color:#fff}\n' + kf('brc', 'to{transform:scale(34);opacity:.001}'),
      'var b=root.querySelector(".b");\nb.addEventListener("click",function(){var i=document.createElement("i");b.appendChild(i);setTimeout(function(){i.remove()},750);});',
      []],
    ['js-magnetic', 'Magnetic Follow',
      '.b{padding:var(--pad,16px) var(--padx,34px);border:1px solid color-mix(in srgb,var(--c1,' + C1 + ') 50%,transparent);border-radius:var(--radius,99px);background:color-mix(in srgb,var(--c1,' + C1 + ') 12%,transparent);color:var(--ct,#e8e8f5);font:600 var(--fs,15px)/1 "Space Grotesk",sans-serif;cursor:pointer;transition:transform .28s cubic-bezier(.2,1,.3,1),background .3s;will-change:transform}\n.b span{display:inline-block;transition:transform .28s cubic-bezier(.2,1,.3,1)}',
      'var b=root.querySelector(".b"),s=b.querySelector("span");\nfunction pull(){var v=getComputedStyle(b).getPropertyValue("--pull");return parseFloat(v)||.42}\nvar mv=function(e){var r=b.getBoundingClientRect(),k=pull(),x=(e.clientX-r.left-r.width/2)*k,y=(e.clientY-r.top-r.height/2)*(k*1.3);\nb.style.transform="translate("+x+"px,"+y+"px)";s.style.transform="translate("+(x*.4)+"px,"+(y*.5)+"px)"};\nb.addEventListener("mousemove",mv);\nb.addEventListener("mouseleave",function(){b.style.transform="";s.style.transform=""});',
      [range('Pull', '--pull', 0, 1.2, .02, .42)] ],
    ['js-magnetic-tilt', 'Magnetic Tilt 3D',
      '.b{padding:var(--pad,18px) var(--padx,36px);border:0;border-radius:var(--radius,16px);background:linear-gradient(140deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));color:#fff;font:700 var(--fs,15px)/1 "Space Grotesk",sans-serif;cursor:pointer;transition:transform .2s ease,box-shadow .3s;transform-style:preserve-3d;box-shadow:0 16px 34px -18px #000}',
      'var b=root.querySelector(".b");\nvar mx=function(){return parseFloat(getComputedStyle(b).getPropertyValue("--max"))||22};\nb.addEventListener("mousemove",function(e){var r=b.getBoundingClientRect();\n  var dx=(e.clientX-r.left)/r.width-.5,dy=(e.clientY-r.top)/r.height-.5,m=mx();\n  b.style.transform="perspective(500px) rotateY("+(dx*m).toFixed(2)+"deg) rotateX("+(-dy*m).toFixed(2)+"deg) translateZ(12px)";});\nb.addEventListener("mouseleave",function(){b.style.transform=""});',
      []],
    ['js-copy', 'Copy Feedback Button',
      '.b{display:inline-flex;align-items:center;gap:9px;padding:var(--pad,13px) var(--padx,22px);border:1px solid color-mix(in srgb,var(--c1,' + C1 + ') 45%,transparent);border-radius:var(--radius,10px);background:rgba(140,140,180,.1);color:var(--ct,#e8e8f5);font:600 var(--fs,14px)/1 "Space Grotesk",sans-serif;cursor:pointer;transition:all .28s cubic-bezier(.2,.9,.2,1)}\n.b i{width:15px;height:15px;border:2px solid currentColor;border-radius:4px;position:relative;transition:transform .28s}\n.b i::after{content:"";position:absolute;inset:-5px 5px 5px -5px;border:2px solid currentColor;border-radius:4px;z-index:-1}\n.b.done{background:color-mix(in srgb,#34d399 22%,transparent);border-color:#34d399;color:#a7f3d0}\n.b.done i{transform:rotate(-45deg) translate(1px,-2px);border-top:0;border-right:0;border-radius:2px}',
      'var b=root.querySelector(".b"),lab=b.querySelector("span"),t;\nb.addEventListener("click",function(){if(b.classList.contains("done"))return;b.classList.add("done");lab.textContent="Copied";\n  clearTimeout(t);t=setTimeout(function(){b.classList.remove("done");lab.textContent="Copy"},1800)});',
      []],
    ['js-download', 'Download With Progress',
      '.b{position:relative;min-width:var(--w,168px);padding:var(--pad,14px) var(--padx,22px);border:1px solid var(--c1,' + C1 + ');border-radius:var(--radius,10px);background:transparent;color:var(--c1,' + C1 + ');font:600 var(--fs,14px)/1 "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;transition:color .2s}\n.b::before{content:"";position:absolute;inset:0 auto 0 0;width:var(--p,0%);background:var(--c1,' + C1 + ');opacity:.28;transition:width .2s linear}\n.b span{position:relative}\n.b.done{border-color:#34d399;color:#34d399}\n.b.done::before{background:#34d399;opacity:.22}',
      'var b=root.querySelector(".b"),s=b.querySelector("span"),p=0,on=false,iv;\nb.addEventListener("click",function(){if(on||b.classList.contains("done"))return;on=true;p=0;\n  iv=setInterval(function(){p+=Math.random()*9;if(p>=100){p=100;clearInterval(iv);on=false;b.classList.add("done");s.textContent="Done \\u2713";\n    setTimeout(function(){b.classList.remove("done");s.textContent="Download";b.style.setProperty("--p","0%")},1900)}\n    s.textContent="Downloading "+Math.floor(p)+"%";b.style.setProperty("--p",p+"%")},220);});',
      []],
    ['js-follow', 'Follow → Following',
      '.b{position:relative;padding:var(--pad,12px) var(--padx,26px);border:0;border-radius:var(--radius,99px);background:var(--c1,' + C1 + ');color:#fff;font:700 var(--fs,14px)/1 "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;transition:background .3s,color .3s}\n.b.on{background:rgba(140,140,180,.2);color:var(--ct,#e8e8f5)}\n.b span{display:block;transition:transform .35s cubic-bezier(.6,0,.25,1),opacity .25s}\n.b .b2{position:absolute;inset:0;display:grid;place-items:center;transform:translateY(110%)}\n.b.on span:first-child{transform:translateY(-110%);opacity:0}\n.b.on .b2{transform:translateY(0)}',
      'var b=root.querySelector(".b");\nb.addEventListener("click",function(){b.classList.toggle("on")});',
      []],
    ['js-like-burst', 'Like With Burst',
      '.b{position:relative;display:inline-grid;place-items:center;width:var(--size,64px);height:var(--size,64px);border:1px solid color-mix(in srgb,var(--c3,' + C3 + ') 45%,transparent);border-radius:50%;background:rgba(140,140,180,.08);color:var(--c3,' + C3 + ');font-size:24px;cursor:pointer;transition:transform .2s cubic-bezier(.3,1.6,.4,1),background .3s}\n.b:hover{transform:scale(1.08)}\n.b.on{background:color-mix(in srgb,var(--c3,' + C3 + ') 22%,transparent);transform:scale(1.16)}\n.b i{position:absolute;left:50%;top:50%;width:5px;height:5px;margin:-2.5px;border-radius:50%;background:var(--c3,' + C3 + ');opacity:0}\n.b.on i{animation:lb var(--dur,.7s) cubic-bezier(.2,.7,.2,1) forwards}\n' + kf('lb', '0%{opacity:1;transform:translate(0,0) scale(1)}100%{opacity:0;transform:translate(var(--dx,0),var(--dy,-30px)) scale(.2)}'),
      'var b=root.querySelector(".b");\nfor(var i=0;i<10;i++){var d=document.createElement("i"),a=i/10*6.283;\n  d.style.setProperty("--dx",(Math.cos(a)*34).toFixed(1)+"px");d.style.setProperty("--dy",(Math.sin(a)*34).toFixed(1)+"px");\n  d.style.animationDelay=(i%3*.04)+"s";b.appendChild(d);}\nb.addEventListener("click",function(){var was=b.classList.contains("on");b.classList.remove("on");void b.offsetWidth;if(!was)b.classList.add("on")});',
      []],
    ['js-load-morph', 'Morph Into Spinner',
      '.b{position:relative;min-width:var(--w,132px);height:var(--h,46px);padding:0 var(--padx,24px);border:0;border-radius:var(--radius,99px);background:var(--c1,' + C1 + ');color:#fff;font:600 var(--fs,14px)/1 "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;transition:min-width .3s cubic-bezier(.6,0,.25,1),border-radius .3s,background .3s}\n.b.wait{min-width:var(--h,46px);padding:0}\n.b.wait span{opacity:0}\n.b.wait::after{content:"";position:absolute;left:50%;top:50%;width:22px;height:22px;margin:-11px;border-radius:50%;border:3px solid rgba(255,255,255,.35);border-top-color:#fff;animation:bld var(--dur,.8s) linear infinite}\n.b span{transition:opacity .2s}\n' + kf('bld', 'to{transform:rotate(1turn)}'),
      'var b=root.querySelector(".b");\nb.addEventListener("click",function(){if(b.classList.contains("wait"))return;b.classList.add("wait");\n  setTimeout(function(){b.classList.remove("wait")},2100)});',
      []],
    ['js-long-press', 'Hold To Confirm',
      '.b{position:relative;padding:var(--pad,14px) var(--padx,28px);border:1px solid var(--c3,' + C3 + ');border-radius:var(--radius,12px);background:transparent;color:var(--c3,' + C3 + ');font:600 var(--fs,14px)/1 "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;-webkit-user-select:none;user-select:none}\n.b::before{content:"";position:absolute;inset:0;background:var(--c3,' + C3 + ');transform:scaleX(var(--p,0));transform-origin:left;transition:transform .06s linear;z-index:-1}\n.b:hover{color:#fff}',
      'var b=root.querySelector(".b"),p=0,on=false,iv;\nvar start=function(){if(on)return;on=true;p=0;iv=setInterval(function(){p+=.04;b.style.setProperty("--p",p);\n  if(p>=1){clearInterval(iv);on=false;b.textContent="Confirmed";b.style.setProperty("--p",1);\n    setTimeout(function(){b.textContent="Hold to delete";b.style.setProperty("--p",0)},1500)}},40)};\nvar stop=function(){if(!on)return;on=false;clearInterval(iv);p=0;b.style.setProperty("--p",0)};\nb.addEventListener("pointerdown",start);b.addEventListener("pointerup",stop);b.addEventListener("pointerleave",stop);',
      []],
    ['js-swipe-unlock', 'Swipe To Unlock',
      '.b{position:relative;width:var(--w,220px);height:var(--h,54px);border:1px solid color-mix(in srgb,var(--c2,' + C2 + ') 45%,transparent);border-radius:99px;background:rgba(140,140,180,.1);color:var(--muted,#9a9ab0);font:600 var(--fs,13px)/1 "Space Grotesk",sans-serif;cursor:grab;overflow:hidden;padding:0;letter-spacing:.1em}\n.b i{position:absolute;top:3px;left:3px;width:calc(var(--h,54px) - 6px);height:calc(var(--h,54px) - 6px);border-radius:50%;background:var(--c2,' + C2 + ');display:grid;place-items:center;color:#04121a;transform:translateX(var(--x,0));transition:transform .3s cubic-bezier(.2,.9,.2,1)}\n.b.open{color:#0b0b12}\n.b.open i{background:#34d399}',
      'var b=root.querySelector(".b"),k=b.querySelector("i"),x=0,down=false,sx=0,max=function(){return b.clientWidth-k.offsetWidth-6};\nb.innerHTML="<i>\u2192</i><span>slide to unlock</span>";k=b.querySelector("i");\nvar lab=b.querySelector("span");\nb.addEventListener("pointerdown",function(e){down=true;sx=e.clientX;b.setPointerCapture(e.pointerId);k.style.transition="none"});\nb.addEventListener("pointermove",function(e){if(!down)return;x=Math.max(0,Math.min(max(),e.clientX-sx));k.style.transform="translateX("+x+"px)";lab.style.opacity=1-x/max()*.8});\nb.addEventListener("pointerup",function(){down=false;k.style.transition="";\n  if(x>max()*.82){b.classList.add("open");lab.textContent="unlocked";k.style.transform="translateX("+max()+"px)";x=max()}\n  else{k.style.transform="translateX(0)";lab.style.opacity=1;x=0}});',
      []],
    ['js-confetti', 'Click Confetti',
      '.b{padding:var(--pad,14px) var(--padx,30px);border:0;border-radius:var(--radius,12px);background:linear-gradient(120deg,var(--c1,' + C1 + '),var(--c3,' + C3 + '));color:#fff;font:700 var(--fs,15px)/1 "Space Grotesk",sans-serif;cursor:pointer;overflow:visible}\n.b i{position:absolute;width:7px;height:12px;border-radius:2px;animation:cf var(--dur,1s) cubic-bezier(.2,.6,.4,1) forwards;pointer-events:none}\n' + kf('cf', '0%{opacity:1;transform:translate(0,0) rotate(0)}100%{opacity:0;transform:translate(var(--dx,0),var(--dy,80px)) rotate(var(--rot,540deg))}'),
      'var b=root.querySelector(".b"),cols=["#7c5cff","#22d3ee","#ff5c8a","#ffd479","#34d399"];\nb.addEventListener("click",function(e){var r=b.getBoundingClientRect();\n  for(var i=0;i<16;i++){var p=document.createElement("i"),a=(i/16)*6.283,d=40+Math.random()*60;\n    p.style.left=(e.clientX-r.left)+"px";p.style.top=(e.clientY-r.top)+"px";\n    p.style.background=cols[i%cols.length];\n    p.style.setProperty("--dx",(Math.cos(a)*d).toFixed(1)+"px");\n    p.style.setProperty("--dy",(Math.sin(a)*d+70).toFixed(1)+"px");\n    p.style.setProperty("--rot",(Math.random()*900-450).toFixed(0)+"deg");\n    b.appendChild(p);(function(n){setTimeout(function(){n.remove()},1100)})(p);}});',
      []]
  ];
  jsBtns.forEach(function (j) {
    var inner = j[0] === 'js-swipe-unlock' ? '<i>\u2192</i>'
      : j[0] === 'js-follow' ? '<span>Follow</span><span class="b2">Following</span>'
        : j[0] === 'js-copy' ? '<i></i><span>Copy</span>'
          : j[0] === 'js-download' ? '<span>Download</span>'
            : j[0] === 'js-load-morph' ? '<span>Save</span>'
              : j[0] === 'js-like-burst' ? '\u2665'
                : '<span>' + ({ 'js-ripple-classic': 'Click anywhere', 'js-ripple-centre': 'Ripple me', 'js-magnetic': 'Magnetic', 'js-magnetic-tilt': 'Tilt me', 'js-long-press': 'Hold to delete', 'js-confetti': 'Celebrate \u2726' }[j[0]] || 'Click me') + '</span>';
    push({
      family: 'btn:js', id: j[0], title: j[1], tags: ['button', 'js', 'click'],
      html: '<button class="b">' + inner + '</button>', css: j[2], js: j[3],
      cfg: [range('Width', '--padx', 10, 46, 1, 30, 'px'), range('Height', '--pad', 6, 26, 1, 15, 'px'),
        range('Corner', '--radius', 0, 40, 1, 12, 'px'), range('Text', '--fs', 11, 22, 1, 15, 'px'),
        range('Border', '--bw', 0, 5, .5, 2, 'px'), col('Base', '--c1', C1), col('Accent', '--c2', C2), col('Accent C', '--c3', C3)].concat(j[5] || [])
    });
  });

  /* ───────── 10. odds & ends ───────── */
  [['skew-squash', 'Skew Squash', ';transform:skewX(-8deg)\n.b span{display:inline-block;transform:skewX(8deg)}\n.b:hover{transform:skewX(-2deg) scale(1.04)}'],
   ['duotone-invert', 'Duotone Invert', ';background:var(--c1,' + C1 + ');color:var(--c2,' + C2 + ');mix-blend-mode:normal;filter:contrast(1.05)\n.b:hover{filter:invert(1) contrast(1.15)}'],
   ['lift-shadow', 'Hover Lift', ';box-shadow:0 0 0 rgba(0,0,0,0)\n.b:hover{box-shadow:0 22px 34px -18px rgba(0,0,0,.7),0 2px 0 color-mix(in srgb,var(--c1) 40%,transparent);background:var(--c1,' + C1 + ')}'],
   ['shadow-echo', 'Shadow Echo', ';box-shadow:none\n.b::after{content:"";position:absolute;inset:0;border-radius:inherit;background:var(--c1,' + C1 + ');z-index:-1;opacity:.4;transform:translate(0,0);transition:transform .34s cubic-bezier(.2,.9,.2,1),opacity .34s}\n.b:hover::after{transform:translate(9px,9px);opacity:.85}', '.b{z-index:0}'],
   ['underline-grow', 'Underline Expands', ';background:transparent;color:var(--c1,' + C1 + ');padding-inline:var(--padx,6px)\n.b::after{content:"";position:absolute;left:0;bottom:6px;width:100%;height:2px;background:var(--c2,' + C2 + ');transform:scaleX(0);transform-origin:right;transition:transform .38s cubic-bezier(.6,0,.3,1)}\n.b:hover::after{transform:scaleX(1);transform-origin:left}'],
   ['liquid-blob', 'Liquid Corner Morph', ';background:var(--c1,' + C1 + ')\n.b{border-radius:38% 62% 62% 38%/52% 46% 54% 48%}\n.b:hover{border-radius:14px;transform:rotate(-1deg) scale(1.04)}', ''],
   ['cursor-fill', 'Cursor Spot Fill', ';--bg:rgba(140,140,180,.12);color:var(--ct,#e8e8f5);border:1px solid color-mix(in srgb,var(--c1) 40%,transparent)\n.b::before{content:"";position:absolute;inset:-40%;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),var(--c1,' + C1 + ') 0 22%,transparent 46%);opacity:0;transition:opacity .3s;z-index:-1}\n.b:hover::before{opacity:1}', ''],
   ['split-flap', 'Split Flap', ';--bg:rgba(140,140,180,.14);color:var(--ct,#e8e8f5)\n.b::before{content:"";position:absolute;inset:50% 0 auto;height:1px;background:rgba(0,0,0,.35)}\n.b:hover{transform:rotateX(8deg)}\n.b{transform-style:preserve-3d;transition:transform .3s}', ''],
   ['kbd-key', 'Keyboard Cap', ';background:linear-gradient(180deg,#26263a,#14141f);color:#e8e8f5;border:1px solid rgba(255,255,255,.14);border-bottom-width:var(--bw,5px);border-radius:var(--radius,10px);font:700 var(--fs,15px)/1 "JetBrains Mono",monospace;box-shadow:0 8px 18px -10px #000\n.b:hover{border-bottom-color:var(--c1,' + C1 + ');color:var(--c1,' + C1 + ')}\n.b:active{transform:translateY(3px);border-bottom-width:2px}'],
   ['ticker-btn', 'Inside Ticker', ';background:var(--c1,' + C1 + ');overflow:hidden;padding-inline:0;width:var(--w,150px);text-align:center\n.b span{display:inline-block;padding-inline:var(--padx,24px);animation:tb var(--dur,4s) linear infinite}\n.b:hover span{animation-play-state:paused}\n' + kf('tb', 'to{transform:translateX(-50%)}')],
   ['badge-count', 'Badge Counter', ';background:var(--c1,' + C1 + ')\n.b i{position:absolute;top:-9px;right:-9px;min-width:20px;height:20px;padding:0 5px;border-radius:99px;background:var(--c3,' + C3 + ');color:#fff;font:700 11px/20px "JetBrains Mono",monospace;animation:bg 1.6s ease-in-out infinite}\n' + kf('bg', '0%,100%{transform:scale(1)}50%{transform:scale(1.18)}')],
   ['flip-card-btn', 'Flip Card Button', ';background:transparent;border:0;padding:0;min-width:var(--w,150px);height:var(--h,50px);overflow:visible\n.b .f{position:absolute;inset:0;display:grid;place-items:center;backface-visibility:hidden;border-radius:var(--radius,12px);transition:transform .5s cubic-bezier(.6,0,.25,1)}\n.b .f.a{background:var(--c1,' + C1 + ')}\n.b .f.b2{transform:rotateY(180deg);background:var(--c2,' + C2 + ');color:#04121a}\n.b{transform-style:preserve-3d;transition:transform .5s cubic-bezier(.6,0,.25,1)}\n.b:hover{transform:rotateY(180deg)}'],
   ['icon-only-orbit', 'Orbiting Icon Dot', ';background:transparent;border:1px solid color-mix(in srgb,var(--c1) 45%,transparent);width:var(--size,56px);height:var(--size,56px);border-radius:50%;padding:0;color:var(--c1,' + C1 + ')\n.b::after{content:"";position:absolute;inset:-7px;border-radius:50%;border:2px solid transparent;border-top-color:var(--c2,' + C2 + ');animation:bo var(--dur,1.6s) linear infinite}\n.b:hover::after{animation-duration:calc(var(--dur,1.6s) / 2)}\n' + kf('bo', 'to{transform:rotate(1turn)}')],
   ['swatch-row', 'Colour Picker Button', ';background:conic-gradient(var(--c1,' + C1 + '),var(--c2,' + C2 + '),var(--c3,' + C3 + '),var(--c1,' + C1 + '));color:#fff\n.b:hover{filter:saturate(1.4) brightness(1.1)}']
  ].forEach(function (s) {
    var html;
    if (s[0] === 'flip-card-btn') html = '<button class="b"><span class="f a">Hover to flip</span><span class="f b2">Boo</span></button>';
    else if (s[0] === 'kbd-key') html = '<button class="b">SPACE</button>';
    else if (s[0] === 'ticker-btn') html = '<button class="b"><span>NEW DROP&nbsp;&nbsp;\u2022&nbsp;&nbsp;NEW DROP&nbsp;&nbsp;\u2022&nbsp;&nbsp;</span></button>';
    else if (s[0] === 'badge-count') html = '<button class="b">Inbox<i>3</i></button>';
    else if (s[0] === 'icon-only-orbit') html = '<button class="b">\u2726</button>';
    else html = '<button class="b"><span>' + s[1] + '</span></button>';
    push({
      family: 'btn:' + s[0], id: s[0], title: s[1] + ' Button', tags: ['button', 'hover', 'css'],
      html: html,
      css: join([
        withBase('.b{position:relative;padding:var(--pad,15px) var(--padx,28px);border:0;border-radius:var(--radius,12px);background:var(--c1,' + C1 + ');color:var(--ct,#fff);font:600 var(--fs,15px)/1 "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;transition:all var(--tt,.32s) cubic-bezier(.2,.9,.2,1);display:inline-flex;align-items:center;justify-content:center;gap:8px}', s[2]),
        (s[3] || '')
      ]),
      cfg: [range('Width', '--padx', 6, 46, 1, 28, 'px'), range('Height', '--pad', 6, 26, 1, 15, 'px'),
        range('Corner', '--radius', 0, 40, 1, 12, 'px'), range('Text', '--fs', 11, 24, 1, 15, 'px'),
        range('Border', '--bw', 1, 8, 1, 5, 'px'), range('Size', '--size', 36, 90, 2, 56, 'px'),
        range('Width', '--w', 110, 220, 2, 160, 'px'), range('Height', '--h', 36, 80, 2, 54, 'px'),
        range('Cycle', '--dur', .6, 8, .1, 2.4, 's'), range('Speed', '--tt', .05, .9, .01, .32, 's'),
        col('Base', '--c1', C1), col('Hover', '--c2', C2), col('Pop', '--c3', C3)]
    });
  });

  /* ───────── 11. two more fill directions ───────── */
  [['fill-top-left', 'Wipe Fill \u00b7 Corner', 'transform:scale(0);transform-origin:top left'],
   ['fill-curtain-open', 'Curtain Open Fill', 'transform:scaleX(.02);transform-origin:center']
  ].forEach(function (f) {
    push(btn({
      name: f[0], title: f[1],
      base: ';--bg:transparent;color:var(--c1,' + C1 + ');border-width:2px;border-color:var(--c1,' + C1 + ')',
      ink: '.b::before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,var(--c1,' + C1 + '),var(--c2,' + C2 + '));z-index:-1;' + f[2] + ';transition:transform .45s cubic-bezier(.65,0,.35,1)}\n.b:hover{color:#fff}.b:hover::before{transform:scale(1)}',
      skip: ['--bw']
    }));
  });

  K.add('buttons', pool);
})(window);
