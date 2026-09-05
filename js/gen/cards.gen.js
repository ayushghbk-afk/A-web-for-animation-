/* ============================================================
   Cards & hover — generated families
   A card shell (media + caption) plus a different hover mechanic per variant.
   Cursor tracking is free: the site card already publishes --mx/--my, and
   custom properties inherit through the shadow boundary.
   ============================================================ */
(function (global) {
  'use strict';
  var K = global.MLKit;
  var join = K.join, kf = K.keyframes, range = K.range, col = K.color, cells = K.cells;
  var C1 = '#7c5cff', C2 = '#22d3ee', C3 = '#ff5c8a';
  var pool = [];
  function push(o) { o.family = o.family || 'card'; pool.push(o); }

  var STD = [
    range('Width', '--w', 150, 300, 2, 214, 'px'),
    range('Media', '--img', 70, 190, 2, 118, 'px'),
    range('Corner', '--radius', 0, 40, 1, 18, 'px'),
    range('Lift', '--lift', 0, 26, 1, 8, 'px'),
    range('Speed', '--tt', .08, .9, .02, .38, 's'),
    col('Tint', '--c1', C1), col('Tint B', '--c2', C2)
  ];

  var shell = `.cd{position:relative;width:var(--w,214px);border-radius:var(--radius,18px);overflow:hidden;background:#141423;border:1px solid rgba(255,255,255,.1);transition:transform var(--tt,.38s) cubic-bezier(.2,.9,.2,1),box-shadow var(--tt,.38s),border-color .3s;transform-style:preserve-3d;display:flex;flex-direction:column}
.cd .im{position:relative;display:block;height:var(--img,118px);background:linear-gradient(140deg,var(--c1,${C1}),var(--c2,${C2}) 60%,#0e0e1a);overflow:hidden;flex:none}
.cd .im::after{content:"";position:absolute;inset:0;background:radial-gradient(120% 80% at 20% 0%,rgba(255,255,255,.28),transparent 60%),repeating-linear-gradient(115deg,rgba(255,255,255,.07) 0 6px,transparent 6px 14px)}
.cd figcaption{padding:12px 14px 14px;display:grid;gap:6px;flex:1}
.cd h4{margin:0;font-size:.98rem;font-weight:700;letter-spacing:-.01em;color:#f2f2fa}
.cd p{margin:0;font-size:.76rem;color:#9a9ab0;line-height:1.45}
.cd .row{display:flex;gap:6px;align-items:center;margin-top:2px}
.cd .row b{font:600 10px/1 "JetBrains Mono",monospace;letter-spacing:.08em;color:#cfcfe6;border:1px solid rgba(255,255,255,.14);border-radius:5px;padding:3px 6px;text-transform:uppercase}`;

  function cardFx(o) {
    push({
      family: 'card:' + o.name,
      id: 'card-' + o.name,
      title: o.title,
      tags: ['card', 'hover'].concat(o.tags || ['css']),
      html: '<figure class="cd' + (o.cls ? ' ' + o.cls : '') + '"><span class="im"></span><figcaption><h4>' +
        (o.head || 'Motion card') + '</h4><p>' + (o.body || 'Hover the card to see the effect.') + '</p>' +
        '<span class="row"><b>' + (o.badge || 'css') + '</b><b>' + (o.badge2 || 'hover') + '</b></span></figcaption>' + (o.extra || '') + '</figure>',
      css: join([shell, o.css, o.frames || '']),
      js: o.js,
      cfg: STD.concat(o.cfg || [])
    });
  }

  /* ─────────────── pure hover mechanics ─────────────── */
  var hoverMech = {
    lift: `.cd:hover{transform:translateY(calc(var(--lift,8px) * -1));box-shadow:0 calc(var(--lift,8px) * 2.4) 40px -18px rgba(0,0,0,.85);border-color:color-mix(in srgb,var(--c1,${C1}) 55%,transparent)}`,
    'img-zoom': `.cd .im{transition:transform var(--tt,.5s) cubic-bezier(.2,.9,.2,1)}\n.cd:hover .im{transform:scale(1.14) rotate(.6deg)}`,
    'caption-rise': `.cd figcaption{position:absolute;inset:auto 0 0;transform:translateY(38%);opacity:.2;transition:.4s cubic-bezier(.2,.9,.2,1);background:linear-gradient(0deg,#141423 60%,transparent)}\n.cd:hover figcaption{transform:translateY(0);opacity:1}`,
    'duotone': `.cd .im{filter:grayscale(1) contrast(1.25);transition:filter .5s}\n.cd:hover .im{filter:none}`,
    shine: `.cd::after{content:"";position:absolute;top:0;left:-60%;width:45%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.35),transparent);transform:skewX(-18deg);transition:left .6s cubic-bezier(.4,.1,.3,1);z-index:2;pointer-events:none}\n.cd:hover::after{left:130%}`,
    'foil-holo': `.cd .im{background:linear-gradient(140deg,#ff8ae2,#8ad0ff 40%,#b6ff8a 70%,#ffe08a)}\n.cd .im::before{content:"";position:absolute;inset:0;background:linear-gradient(calc(var(--mx,50px) / 2px),rgba(255,255,255,.5),transparent 40%,rgba(255,255,255,.35));mix-blend-mode:overlay;opacity:0;transition:opacity .3s}\n.cd:hover .im::before{opacity:1}\n.cd:hover .im{filter:hue-rotate(28deg) saturate(1.3)}`,
    'spot-mask': `.cd::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .35s;background:radial-gradient(180px circle at var(--mx,50%) var(--my,50%),color-mix(in srgb,var(--c1,${C1}) 55%,transparent),transparent 60%);mix-blend-mode:screen}\n.cd:hover::after{opacity:1}`,
    'border-conic': `.cd{background:#141423}\n.cd::before{content:"";position:absolute;inset:-40%;background:conic-gradient(from 0deg,transparent 0 60%,var(--c1,${C1}),var(--c2,${C2}),transparent 92%);opacity:0;transition:opacity .4s;z-index:-1;animation:cdspin 4s linear infinite}\n.cd>*,.cd figcaption{background:#141423;border-radius:inherit}\n.cd .im{border-radius:calc(var(--radius,18px) - 2px)}\n.cd:hover::before{opacity:1}\n` + kf('cdspin', 'to{transform:rotate(1turn)}'),
    'flip-y': `.cd{transform-style:preserve-3d}\n.cd .back{position:absolute;inset:0;padding:16px;display:grid;gap:8px;align-content:center;background:linear-gradient(140deg,var(--c1,${C1}),#1b1b30);transform:rotateY(180deg);backface-visibility:hidden;border-radius:inherit;color:#f2f2fa}\n.cd .front{display:flex;flex-direction:column;height:100%;backface-visibility:hidden}\n.cd:hover{transform:rotateY(180deg)}\n.cd figcaption,.cd .im{backface-visibility:hidden}`,
    'accordion': `.cd .more{max-height:0;opacity:0;overflow:hidden;transition:max-height .45s cubic-bezier(.2,.9,.2,1),opacity .3s}\n.cd:hover .more{max-height:90px;opacity:1}`,
    'stack-behind': `.cd::before,.cd::after{content:"";position:absolute;inset:0;border-radius:inherit;background:#1c1c2e;border:1px solid rgba(255,255,255,.1);z-index:-1;transition:transform .4s cubic-bezier(.2,.9,.2,1)}\n.cd::before{transform:translate(0,0) scale(1)}\n.cd::after{transform:translate(0,0) scale(1)}\n.cd:hover::before{transform:translate(9px,9px) scale(.98)}\n.cd:hover::after{transform:translate(17px,17px) scale(.96);opacity:.7}`,
    'notch-cut': `.cd{clip-path:polygon(0 0,calc(100% - var(--notch,20px)) 0,100% var(--notch,20px),100% 100%,0 100%)}\n.cd:hover{transform:translateY(calc(var(--lift,8px) * -1))}`,
    'peel': `.cd::after{content:"";position:absolute;right:0;bottom:0;width:0;height:0;border-style:solid;border-width:0 0 var(--notch,26px) var(--notch,26px);border-color:transparent transparent rgba(255,255,255,.16) transparent;transition:.4s cubic-bezier(.2,.9,.2,1)}\n.cd:hover::after{border-width:0 0 calc(var(--notch,26px) * 1.7) calc(var(--notch,26px) * 1.7)}` + kf('cdpeel', ''),
    'ken-burns': `.cd .im::before{content:"";position:absolute;inset:-18%;background:radial-gradient(closest-side,rgba(255,255,255,.4),transparent 70%);animation:cdkb 12s ease-in-out infinite alternate}\n` + kf('cdkb', '0%{transform:scale(1) translate(0,0)}100%{transform:scale(1.28) translate(-6%,4%)}'),
    'blob-radius': `.cd{border-radius:var(--radius,18px)}\n.cd:hover{border-radius:44% 56% 62% 38%/48% 42% 58% 52%;transform:scale(1.02)}`,
    'shadow-blob': `.cd::before{content:"";position:absolute;inset:auto 12% 8px;height:22px;background:radial-gradient(closest-side,rgba(0,0,0,.75),transparent);filter:blur(6px);opacity:.5;transition:.4s;z-index:-1}\n.cd:hover::before{transform:translateY(10px) scaleX(1.25);opacity:.85}`,
    'grain-scan': `.cd::after{content:"";position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0 1px,transparent 1px 3px);opacity:.5;animation:cdscan 6s linear infinite}\n` + kf('cdscan', 'to{background-position:0 60px}'),
    'neon-outline': `.cd:hover{border-color:var(--c1,${C1});box-shadow:0 0 0 1px var(--c1,${C1}),0 0 var(--glow,24px) color-mix(in srgb,var(--c1,${C1}) 55%,transparent),inset 0 0 24px color-mix(in srgb,var(--c1,${C1}) 22%,transparent)}`,
    'glass-sweep': `.cd .im::before{content:"";position:absolute;top:-60%;left:-30%;width:36%;height:220%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);transform:rotate(18deg);transition:transform .6s cubic-bezier(.4,0,.2,1),left .6s}\n.cd:hover .im::before{left:120%}`,
    'skew-hover': `.cd:hover{transform:skewY(-2deg) translateY(calc(var(--lift,8px) * -1))}\n.cd:hover .im{transform:skewY(2deg)}`,
    'expand-width': `.cd{width:var(--w,214px)}\n.cd figcaption{white-space:nowrap}\n.cd .more{display:inline-block;max-width:0;overflow:hidden;opacity:0;transition:.45s cubic-bezier(.2,.9,.2,1);vertical-align:bottom;font-size:.74rem;color:var(--c2,${C2})}\n.cd:hover .more{max-width:120px;opacity:1}`
  };
  Object.keys(hoverMech).forEach(function (m) {
    cardFx({
      name: m, title: {
        lift: 'Lift & Shadow', 'img-zoom': 'Image Zoom', 'caption-rise': 'Caption Rises', duotone: 'Duotone To Colour',
        shine: 'Gloss Sweep', 'foil-holo': 'Rainbow Foil', 'spot-mask': 'Spot Mask', 'border-conic': 'Conic Border Reveal',
        'flip-y': 'Flip To Back', accordion: 'Accordion Card', 'stack-behind': 'Stacked Deck', 'notch-cut': 'Notched Corner',
        peel: 'Peel Corner', 'ken-burns': 'Ken Burns Media', 'blob-radius': 'Blob Morph', 'shadow-blob': 'Ground Shadow',
        'grain-scan': 'Scanline Grain', 'neon-outline': 'Neon Outline', 'glass-sweep': 'Glass Sweep', 'skew-hover': 'Skew Lift',
        'expand-width': 'Expand On Hover'
      }[m],
      css: hoverMech[m],
      extra: m === 'accordion' || m === 'expand-width' ? '<div class="more">' + (m === 'accordion' ? '<p>Details you only see on hover — perfect for dense grids.</p>' : '<span>more</span>') + '</div>' : '',
      front: m === 'flip-y',
      cfg: m === 'notch-cut' || m === 'peel' ? [range('Notch', '--notch', 6, 48, 1, 24, 'px')] : m === 'neon-outline' ? [range('Glow', '--glow', 0, 60, 2, 24, 'px')] : []
    });
    if (m === 'flip-y') {
      pool[pool.length - 1].html = '<figure class="cd"><div class="front"><span class="im"></span><figcaption><h4>Flip To Back</h4><p>Hover to turn the card over.</p><span class="row"><b>3d</b><b>hover</b></span></figcaption></div><div class="back"><h4 style="margin:0">The back</h4><p style="margin:0;color:#d5d5ea">Any content can live here — specs, actions, a form.</p></div></figure>';
    }
  });

  /* ─────────────── JS: real tilt, parallax, glare ─────────────── */
  var tiltCode =
    'var cd=root.querySelector(".cd");\n' +
    'var mm=function(e){var r=cd.getBoundingClientRect(),dx=(e.clientX-r.left)/r.width-.5,dy=(e.clientY-r.top)/r.height-.5,m=parseFloat(getComputedStyle(cd).getPropertyValue("--max"))||10;\n' +
    '  cd.style.transform="perspective(700px) rotateY("+(dx*m).toFixed(2)+"deg) rotateX("+(-dy*m).toFixed(2)+"deg) translateZ(6px)";\n' +
    '  cd.style.setProperty("--gx",(dx*100+50).toFixed(1)+"%");cd.style.setProperty("--gy",(dy*100+50).toFixed(1)+"%")};\n' +
    'cd.addEventListener("pointermove",mm);\n' +
    'cd.addEventListener("pointerleave",function(){cd.style.transform=""});';

  [
    ['tilt-plain', '3D Tilt Track', 'var cd=root.querySelector(".cd");\nvar mm=function(e){var r=cd.getBoundingClientRect(),dx=(e.clientX-r.left)/r.width-.5,dy=(e.clientY-r.top)/r.height-.5;\n  cd.style.transform="perspective(700px) rotateY("+(dx*14).toFixed(2)+"deg) rotateX("+(-dy*14).toFixed(2)+"deg)";};\ncd.addEventListener("pointermove",mm);\ncd.addEventListener("pointerleave",function(){cd.style.transform=""});', '.cd{transition:transform .18s ease-out}'],
    ['tilt-glare', 'Tilt + Glare', tiltCode, '.cd{transition:transform .16s ease-out}\n.cd::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(320px circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,.28),transparent 55%);opacity:0;transition:opacity .3s}\n.cd:hover::after{opacity:1}', true],
    ['tilt-parallax', 'Tilt + Layer Parallax',
      'var cd=root.querySelector(".cd"),L=cd.querySelectorAll("[data-depth]");\nvar mm=function(e){var r=cd.getBoundingClientRect(),dx=(e.clientX-r.left)/r.width-.5,dy=(e.clientY-r.top)/r.height-.5;\n  cd.style.transform="perspective(800px) rotateY("+(dx*12).toFixed(2)+"deg) rotateX("+(-dy*12).toFixed(2)+"deg)";\n  for(var i=0;i<L.length;i++){var d=+L[i].dataset.depth;L[i].style.transform="translate3d("+(dx*d*-16).toFixed(1)+"px,"+(dy*d*-16).toFixed(1)+"px,"+(d*10)+"px)";}};\ncd.addEventListener("pointermove",mm);\ncd.addEventListener("pointerleave",function(){cd.style.transform="";for(var i=0;i<L.length;i++)L[i].style.transform=""});',
      '.cd{transition:transform .2s ease-out;transform-style:preserve-3d}\n.cd [data-depth]{transition:transform .2s ease-out}\n.cd .pop{position:absolute;right:14px;top:14px;width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.16);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.28);display:grid;place-items:center;color:#fff;font-size:18px}',
      false, '<span class="pop" data-depth="2">\u2726</span>'],
    ['tilt-magnetic', 'Magnetic Card Pull',
      'var cd=root.querySelector(".cd"),stage=cd.parentElement;\nvar mm=function(e){var r=cd.getBoundingClientRect(),x=e.clientX-(r.left+r.width/2),y=e.clientY-(r.top+r.height/2);\n  cd.style.transform="translate("+(x*.12).toFixed(1)+"px,"+(y*.16).toFixed(1)+"px) rotate("+(x*.01).toFixed(2)+"deg)"};\nstage.addEventListener("pointermove",mm);\nstage.addEventListener("pointerleave",function(){cd.style.transform=""});',
      '.cd{transition:transform .28s cubic-bezier(.2,.9,.2,1)}'],
    ['tilt-scroll', 'Scroll Tilt',
      'var cd=root.querySelector(".cd"),stage=cd.parentElement;\napi.raf(function(){var r=cd.getBoundingClientRect(),v=(window.innerHeight/2-(r.top+r.height/2))/window.innerHeight;\n  cd.style.transform="perspective(800px) rotateX("+(v*-16).toFixed(2)+"deg) translateY("+(v*-10).toFixed(1)+"px)";});',
      '.cd{transition:transform .1s linear}']
  ].forEach(function (t) {
    push({
      family: 'card:' + t[0], id: 'card-' + t[0], title: t[1], tags: ['card', 'js', '3d'],
      html: '<figure class="cd"><span class="im"></span><figcaption><h4>' + t[1] + '</h4><p>Move your cursor over the card.</p><span class="row"><b>js</b><b>pointer</b></span></figcaption>' + (t[4] || '') + '</figure>',
      css: join([shell, t[3]]), js: t[2],
      cfg: STD.concat(t[0] === 'tilt-glare' || t[0] === 'tilt-plain' ? [range('Tilt', '--max', 2, 30, 1, 12, 'deg')] : [])
    });
  });

  /* ─────────────── content cards: real UI, each a different product ─────────────── */
  var contentCards = [
    ['profile', 'User Profile Card', `<figure class="cd cd-profile"><span class="banner"></span><b class="av">AK</b><figcaption><h4>Astra Kim</h4><p>Motion designer · Seoul</p><span class="row"><b>128k followers</b><b class="btn">Follow</b></span></figcaption></figure>`,
      `.cd-profile .banner{display:block;height:var(--img,86px);background:linear-gradient(120deg,var(--c1,${C1}),var(--c2,${C2}),${C3});position:relative}
.cd-profile .banner::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(60deg,rgba(255,255,255,.12) 0 8px,transparent 8px 18px)}
.cd-profile .av{position:absolute;top:calc(var(--img,86px) - 26px);left:16px;width:58px;height:58px;border-radius:50%;display:grid;place-items:center;font:700 19px "Space Grotesk",sans-serif;color:#12121f;background:#fff;border:3px solid #141423;transition:transform .4s cubic-bezier(.3,1.5,.4,1)}
.cd-profile figcaption{padding-top:38px}
.cd-profile:hover .av{transform:translateY(-4px) rotate(-6deg) scale(1.06)}
.cd-profile .btn{cursor:pointer;border:0;background:var(--c1,${C1});color:#fff;border-radius:99px;padding:4px 10px;font:700 10px "Space Grotesk",sans-serif;letter-spacing:.06em}
.cd-profile .btn:hover{background:var(--c2,${C2})}`,
      'var b=root.querySelector(".btn");\nb.addEventListener("click",function(){var on=b.textContent==="Follow";b.textContent=on?"Following \u2713":"Follow";b.style.background=on?"#34d399":"";});' ],

    ['product', 'Product Card', `<figure class="cd cd-product"><span class="im"><b class="tag2">-30%</b><em class="shot"></em></span><figcaption><h4>Aero Runner</h4><p class="pr"><s>$180</s> <b>$126</b></p><span class="row"><i class="sw on"></i><i class="sw"></i><i class="sw"></i><b class="btn">Add</b></span></figcaption></figure>`,
      `.cd-product .shot{position:absolute;inset:14% 18%;border-radius:14px;background:linear-gradient(150deg,#fff,rgba(255,255,255,.35));box-shadow:0 18px 30px -14px rgba(0,0,0,.6);transition:.5s cubic-bezier(.2,.9,.2,1);transform:rotate(-12deg)}
.cd-product .tag2{position:absolute;left:10px;top:10px;z-index:2;font:700 10px "JetBrains Mono",monospace;background:${C3};color:#fff;padding:4px 8px;border-radius:99px}
.cd-product .pr{margin:0;font-size:.86rem;color:#f2f2fa}
.cd-product .pr s{color:#6d6d85}
.cd-product .pr b{color:#34d399}
.cd-product:hover .shot{transform:rotate(4deg) translateY(-8px) scale(1.06)}
.cd-product .sw{width:16px;height:16px;border-radius:50%;background:#7c5cff;border:2px solid rgba(255,255,255,.25);cursor:pointer;transition:transform .2s}
.cd-product .sw:nth-child(2){background:${C2}}.cd-product .sw:nth-child(3){background:${C3}}
.cd-product .sw.on,.cd-product .sw:hover{transform:scale(1.25);border-color:#fff}
.cd-product .btn{cursor:pointer;border:0;background:var(--c1,${C1});color:#fff;border-radius:99px;padding:4px 10px;font:700 10px "Space Grotesk",sans-serif;margin-left:auto}
.cd-product .row b:not(.btn){border:0;padding:0;font:inherit}`,
      'var sw=root.querySelectorAll(".sw"),shot=root.querySelector(".shot"),cols=["#7c5cff","#22d3ee","#ff5c8a"];\nfor(var i=0;i<sw.length;i++)sw[i].addEventListener("click",function(){for(var j=0;j<sw.length;j++)sw[j].classList.remove("on");this.classList.add("on");shot.style.background="linear-gradient(150deg,#fff,"+cols[i]+")"});' ],

    ['music', 'Now Playing Card', `<figure class="cd cd-music"><figcaption><span class="np"><i></i><i></i><i></i><i></i><i></i></span><h4>Night Driver</h4><p>Kavinsky-esque · 3:24</p><span class="bar"><b></b></span><span class="row"><button class="pl">\u25B6</button><b>1.2k likes</b></span></figcaption></figure>`,
      `.cd-music .np{display:flex;gap:3px;align-items:flex-end;height:34px;margin-bottom:6px}
.cd-music .np i{width:5px;height:30%;border-radius:3px;background:linear-gradient(var(--c1,${C1}),var(--c2,${C2}));animation:npm 1s ease-in-out infinite alternate;animation-delay:calc(var(--i) * -.14s);animation-play-state:paused}
.cd-music.play .np i{animation-play-state:running}
.cd-music .bar{display:block;height:4px;border-radius:99px;background:rgba(255,255,255,.14);overflow:hidden}
.cd-music .bar b{display:block;height:100%;width:var(--p,26%);background:var(--c2,${C2});border-radius:99px;transition:width .2s linear}
.cd-music .pl{width:26px;height:26px;border-radius:50%;border:0;background:var(--c1,${C1});color:#fff;cursor:pointer;display:grid;place-items:center;font-size:10px;padding:0}
.cd-music .row b{border:0;padding:0;font:600 10px "JetBrains Mono",monospace;color:#9a9ab0}
.cd-music:hover{transform:translateY(-4px)}
` + kf('npm', 'to{height:100%}') + '\n.cd-music .np i:nth-child(2){animation-duration:.7s}.cd-music .np i:nth-child(4){animation-duration:.85s}',
      'var cd=root.querySelector(".cd-music"),pl=root.querySelector(".pl"),b=root.querySelector(".bar b"),p=26,playing=false;\napi.raf(function(){if(!playing)return;p+=.12;if(p>100)p=0;b.style.width=p+"%"});\npl.addEventListener("click",function(){playing=!playing;cd.classList.toggle("play",playing);pl.textContent=playing?"\\u275A\\u275A":"\\u25B6"});' ],

    ['ticket', 'Ticket Stub', `<figure class="cd cd-tix"><figcaption><h4>AURORA FEST</h4><p>Sat 12 Oct · Gates 18:00</p></figcaption><span class="perf"></span><div class="half"><b>ROW F · SEAT 12</b><span class="qr"></span></div></figure>`,
      `.cd-tix{width:var(--w,220px);background:linear-gradient(160deg,#1b1b2c,#141423)}
.cd-tix .perf{position:absolute;left:0;right:0;top:calc(var(--img,86px) + 8px);height:1px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.35) 0 5px,transparent 5px 11px)}
.cd-tix figcaption{padding-bottom:26px}
.cd-tix .half{padding:14px;display:flex;align-items:center;justify-content:space-between;gap:8px}
.cd-tix .half b{font:700 10px/1.4 "JetBrains Mono",monospace;color:#cfcfe6;letter-spacing:.06em}
.cd-tix .qr{width:34px;height:34px;border-radius:6px;background:repeating-conic-gradient(#fff 0 25%,transparent 0 50%) 0 0/9px 9px;opacity:.85}
.cd-tix::before,.cd-tix::after{content:"";position:absolute;width:18px;height:18px;border-radius:50%;background:#0c0c16;top:calc(var(--img,86px) + 0px)}
.cd-tix::before{left:-9px}.cd-tix::after{right:-9px}
.cd-tix:hover{transform:rotate(-1.2deg) translateY(-6px);box-shadow:0 26px 44px -22px #000}`,
      '' ],

    ['weather', 'Weather Card', `<figure class="cd cd-wx"><figcaption><h4>22° <em>Partly cloudy</em></h4><p>Lisbon · feels like 24°</p><span class="row"><b>W 12km/h</b><b>58%</b><b>UV 4</b></span></figcaption><span class="sun"></span><span class="cl"></span><span class="cl c2"></span></figure>`,
      `.cd-wx{padding:14px 0 0;background:linear-gradient(160deg,#1a2a4a,#141423)}
.cd-wx h4{font-size:1.5rem;display:flex;align-items:baseline;gap:8px}
.cd-wx h4 em{font:500 .8rem "Space Grotesk",sans-serif;font-style:normal;color:#9a9ab0}
.cd-wx .sun{position:absolute;right:22px;top:18px;width:38px;height:38px;border-radius:50%;background:radial-gradient(circle,#ffe08a,#ffb703);box-shadow:0 0 26px rgba(255,183,3,.7);animation:wxp 4s ease-in-out infinite}
.cd-wx .cl{position:absolute;right:6px;top:44px;width:52px;height:18px;border-radius:99px;background:rgba(255,255,255,.8);animation:wxc 11s ease-in-out infinite}
.cd-wx .cl::after{content:"";position:absolute;left:12px;top:-10px;width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.8)}
.cd-wx .c2{right:auto;left:16px;top:60px;transform:scale(.7);opacity:.6;animation-duration:14s;animation-direction:reverse}
.cd-wx figcaption{position:relative;z-index:1;padding-top:6px}
` + kf('wxp', '0%,100%{transform:scale(1)}50%{transform:scale(1.1)}') + '\n' + kf('wxc', '0%,100%{transform:translateX(0)}50%{transform:translateX(-14px)}'),
      '' ],

    ['stat', 'Stat Card Count-Up', `<figure class="cd cd-stat"><figcaption><h4><b class="num">0</b></h4><p>Active users today</p><span class="spark"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="row"><b class="up">+18%</b><b>vs yesterday</b></span></figcaption></figure>`,
      `.cd-stat h4 b{font:700 1.9rem/1 "JetBrains Mono",monospace;color:#fff;font-variant-numeric:tabular-nums}
.cd-stat .spark{display:flex;gap:4px;align-items:flex-end;height:34px}
.cd-stat .spark i{flex:1;border-radius:3px;background:linear-gradient(var(--c2,${C2}),transparent);height:calc(24% + var(--i) * 11%);animation:stb 2.6s ease-in-out infinite alternate;animation-delay:calc(var(--i) * -.2s)}
.cd-stat .up{color:#34d399!important;border-color:rgba(52,211,153,.5)!important}
.cd-stat:hover{transform:translateY(calc(var(--lift,8px) * -1))}
` + kf('stb', 'to{height:100%}'),
      'var b=root.querySelector(".num"),t0=null;\napi.raf(function(){var n=performance.now();if(t0===null)t0=n;var p=Math.min((n-t0)/1800,1);\n  b.textContent=Math.round(18374*(1-Math.pow(1-p,3))).toLocaleString("en-US");if(p>=1)t0=null;});' ],

    ['quote', 'Quote Card', `<figure class="cd cd-q"><figcaption><b class="mark">\u201C</b><p class="qt">Animation is not about making things move — it is about making them mean something.</p><span class="row"><b>A. Ghosh</b></span></figcaption></figure>`,
      `.cd-q .qt{font:500 .98rem/1.5 "Space Grotesk",serif;color:#e6e6f4;margin:0}
.cd-q .mark{font:700 3.4rem/.4 "Space Grotesk",sans-serif;color:var(--c1,${C1});display:block;transform:translateY(18px);opacity:.9}
.cd-q{background:linear-gradient(150deg,rgba(124,92,255,.16),#141423 60%)}
.cd-q:hover .mark{animation:qm 1.4s ease-in-out infinite}
` + kf('qm', '0%,100%{transform:translateY(18px) scale(1)}50%{transform:translateY(10px) scale(1.14)}'),
      '' ],

    ['pricing', 'Pricing Card', `<figure class="cd cd-price"><figcaption><h4>Studio</h4><p class="amt"><b>$24</b><span>/mo</span></p><ul class="ft"><li>Unlimited exports</li><li>Lottie + CSS</li><li>Team seats</li></ul><span class="row"><b class="cta">Choose plan</b></span></figcaption></figure>`,
      `.cd-price{outline:2px solid transparent;outline-offset:0;transition:outline-color .3s,transform .35s cubic-bezier(.2,.9,.2,1)}
.cd-price .amt b{font:700 1.7rem "Space Grotesk",sans-serif;color:#fff}
.cd-price .amt span{color:#9a9ab0;font-size:.76rem}
.cd-price .amt{margin:0}
.cd-price .ft{list-style:none;margin:6px 0 0;padding:0;display:grid;gap:6px}
.cd-price .ft li{font-size:.78rem;color:#c8c8dd;display:flex;gap:7px;align-items:center;opacity:0;transform:translateX(-8px);transition:.35s cubic-bezier(.2,.9,.2,1) calc(var(--i,0) * .07s)}
.cd-price .ft li::before{content:"\\2713";color:var(--c2,${C2});font-size:.8rem}
.cd-price:hover .ft li{opacity:1;transform:none}
.cd-price .cta{cursor:pointer;border:0;background:var(--c1,${C1});color:#fff;border-radius:99px;padding:7px 12px;font:700 11px "Space Grotesk",sans-serif;flex:1;justify-content:center;display:flex}
.cd-price:hover{transform:translateY(calc(var(--lift,8px) * -1));outline-color:color-mix(in srgb,var(--c1,${C1}) 60%,transparent)}
.cd-price .ft li:nth-child(1){--i:0}.cd-price .ft li:nth-child(2){--i:1}.cd-price .ft li:nth-child(3){--i:2}`,
      'var c=root.querySelector(".cta");\nc.addEventListener("click",function(){c.textContent="Selected \\u2713";c.style.background="#34d399";setTimeout(function(){c.textContent="Choose plan";c.style.background=""},1500)});' ],

    ['photo', 'Polaroid', `<figure class="cd cd-pol"><span class="ph"></span><figcaption><h4>Lisbon, 2019</h4></figcaption></figure>`,
      `.cd-pol{background:#f6f6ef;padding:10px 10px 0;border-radius:6px;width:var(--w,190px);transform:rotate(-3deg);transition:transform .45s cubic-bezier(.2,.9,.2,1),box-shadow .4s}
.cd-pol .ph{display:block;height:calc(var(--img,118px) + 30px);background:linear-gradient(160deg,#ff9a62,#ff5c8a 45%,#7c5cff);border-radius:2px;position:relative;overflow:hidden}
.cd-pol .ph::after{content:"";position:absolute;inset:0;background:radial-gradient(60% 40% at 70% 20%,rgba(255,255,255,.5),transparent 60%),repeating-linear-gradient(0deg,rgba(0,0,0,.05) 0 2px,transparent 2px 4px)}
.cd-pol figcaption{padding:10px 2px 12px}
.cd-pol h4{color:#22222e;font:italic 500 .86rem/1 "Space Grotesk",cursive}
.cd-pol:hover{transform:rotate(0) scale(1.04);box-shadow:0 24px 44px -20px rgba(0,0,0,.8)}`,
      '' ],

    ['recipe', 'Recipe Card', `<figure class="cd cd-rec"><span class="im"></span><figcaption><h4>Chilli Oil Noodles</h4><p>20 min · serves 2</p><div class="more"><b>Ingredients</b><p>600g noodles · 4 tbsp chilli oil · 2 tbsp soy · spring onion · 1 tsp sugar · 2 cloves garlic</p></div><span class="row"><b>20 min</b><b>easy</b><button class="go">Cook</button></span></figcaption></figure>`,
      `.cd-rec .more{max-height:0;overflow:hidden;transition:max-height .5s cubic-bezier(.2,.9,.2,1),opacity .3s;opacity:0}
.cd-rec .more b{font:700 .7rem "JetBrains Mono",monospace;letter-spacing:.14em;color:var(--c2,${C2});text-transform:uppercase}
.cd-rec .more p{margin:4px 0 6px;font-size:.76rem;color:#bcbcd4;line-height:1.5}
.cd-rec:hover .more{max-height:88px;opacity:1}
.cd-rec .go{margin-left:auto;border:0;background:var(--c1,${C1});color:#fff;border-radius:99px;padding:5px 11px;font:700 10px "Space Grotesk",sans-serif;cursor:pointer}
.cd-rec .row b:not(.go){border:1px solid rgba(255,255,255,.14);border-radius:5px;padding:3px 6px}`,
      '' ],

    ['file', 'File Card', `<figure class="cd cd-file"><span class="doc"><i></i><i></i><i></i></span><figcaption><h4>brand-guide.pdf</h4><p>4.2 MB · updated 2h ago</p><span class="row"><b>PDF</b><b>shared</b></span></figcaption></figure>`,
      `.cd-file .doc{position:relative;display:block;height:var(--img,110px);background:linear-gradient(160deg,#25253c,#171728);padding:16px 18px;border-bottom:1px solid rgba(255,255,255,.08)}
.cd-file .doc i{display:block;height:6px;border-radius:99px;background:rgba(255,255,255,.22);margin-bottom:9px;width:78%;transform-origin:left;transition:transform .4s cubic-bezier(.2,.9,.2,1) calc(var(--i) * .07s),background .3s}
.cd-file .doc i:nth-child(2){width:92%}.cd-file .doc i:nth-child(3){width:58%}
.cd-file .doc::after{content:"";position:absolute;right:14px;bottom:14px;border:8px solid transparent;border-right-color:var(--c1,${C1});transform:rotate(45deg);transition:transform .4s}
.cd-file:hover .doc i{transform:scaleX(1.02);background:color-mix(in srgb,var(--c2,${C2}) 60%,rgba(255,255,255,.3))}
.cd-file:hover .doc::after{transform:rotate(225deg) translate(-6px,6px)}
.cd-file:hover{transform:translateY(calc(var(--lift,8px) * -1))}`,
      '' ],

    ['video', 'Video Card', `<figure class="cd cd-vid"><span class="im"><em class="ply"></em></span><figcaption><h4>Shadow DOM, why?</h4><p>12:04 · 84k views</p></figcaption><span class="prog"><i></i></span></figure>`,
      `.cd-vid .ply{position:absolute;left:50%;top:50%;width:44px;height:44px;margin:-22px;border-radius:50%;background:rgba(255,255,255,.9);display:grid;place-items:center;transition:transform .35s cubic-bezier(.3,1.5,.4,1)}
.cd-vid .ply::before{content:"";border:9px solid transparent;border-left-color:#141423;margin-left:4px}
.cd-vid .ply::after{content:"";position:absolute;inset:-8px;border-radius:50%;border:2px solid rgba(255,255,255,.55);animation:vpulse 2.2s ease-out infinite}
.cd-vid .prog{display:block;height:3px;background:rgba(255,255,255,.14)}
.cd-vid .prog i{display:block;height:100%;width:34%;background:var(--c3,${C3});transition:width .3s}
.cd-vid:hover .ply{transform:scale(1.16)}
.cd-vid:hover .prog i{width:64%}
` + kf('vpulse', '0%{transform:scale(.85);opacity:.9}100%{transform:scale(1.5);opacity:0}'),
      '' ],

    ['credit', 'Card Flip (Click)', `<figure class="cd cd-cc"><div class="front"><span class="chip"></span><b class="no">4242 4242 4242 4242</b><figcaption><h4>A GHAOSH</h4><p>12/28</p></figcaption></div><div class="back"><span class="mag"></span><span class="cvv">CVV 984</span></div></figure>`,
      `.cd-cc{width:var(--w,250px);height:150px;aspect-ratio:auto;padding:0;background:transparent;border:0;overflow:visible;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.5,.05,.2,1);cursor:pointer}
.cd-cc .front,.cd-cc .back{position:absolute;inset:0;border-radius:var(--radius,16px);backface-visibility:hidden;display:flex;flex-direction:column;justify-content:space-between;padding:16px;background:linear-gradient(140deg,var(--c1,${C1}),#2b1d63 60%,#0e0e1c);box-shadow:0 22px 40px -22px #000}
.cd-cc .back{transform:rotateY(180deg);background:linear-gradient(140deg,#1c1c30,#0e0e1c)}
.cd-cc .chip{width:38px;height:26px;border-radius:6px;background:linear-gradient(140deg,#ffe08a,#c99a2e);box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)}
.cd-cc .no{font:600 1rem/1 "JetBrains Mono",monospace;letter-spacing:.14em;color:#f6f6ff}
.cd-cc figcaption{padding:0}
.cd-cc .mag{display:block;height:34px;margin:-4px -16px 0;background:#000}
.cd-cc .cvv{align-self:flex-end;font:600 .72rem "JetBrains Mono",monospace;background:#fff;color:#111;padding:4px 8px;border-radius:4px}
.cd-cc.flipped{transform:rotateY(180deg)}
.cd-cc:hover .chip{animation:ccsh 1.2s ease-in-out infinite}
` + kf('ccsh', '0%,100%{filter:brightness(1)}50%{filter:brightness(1.5)}'),
      'var cc=root.querySelector(".cd-cc");\ncc.addEventListener("click",function(){cc.classList.toggle("flipped")});' ],

    ['book', 'Book Card (Spine)', `<figure class="cd cd-bk"><span class="cover"><b>THE MOVING PAGE</b></span><span class="pages"></span><figcaption><h4>Motion for the Web</h4><p>412 pages · hardback</p></figcaption></figure>`,
      `.cd-bk{width:var(--w,180px);flex-direction:row;align-items:stretch;background:transparent;border:0;overflow:visible;perspective:800px;padding:0}
.cd-bk .cover{position:relative;width:64%;height:calc(var(--img,118px) + 46px);border-radius:2px 8px 8px 2px;background:linear-gradient(150deg,var(--c1,${C1}),#2b1d63);display:grid;place-items:center;transform-origin:left center;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.4,.05,.2,1);box-shadow:14px 16px 30px -18px #000}
.cd-bk .cover b{font:700 .74rem/1.3 "Space Grotesk",sans-serif;letter-spacing:.12em;color:#fff;padding:0 10px;text-align:center}
.cd-bk .cover::before{content:"";position:absolute;left:0;top:0;bottom:0;width:7px;background:linear-gradient(90deg,rgba(0,0,0,.45),transparent)}
.cd-bk .pages{width:10px;background:repeating-linear-gradient(90deg,#f4f4ef 0 1px,#c9c9c0 1px 3px);border-radius:2px}
.cd-bk:hover .cover{transform:rotateY(-62deg)}
.cd-bk figcaption{padding:8px 0 0;display:none}
.cd-bk{flex-direction:column}
.cd-bk>span{flex:none}`,
      '' ],

    ['game', 'Rarity Card', `<figure class="cd cd-game"><span class="im"></span><figcaption><h4>Void Reaper</h4><p>Legendary · +42 crit</p><span class="row"><b>EQ</b><b>LVL 60</b></span></figcaption></figure>`,
      `.cd-game{border-color:color-mix(in srgb,#ffd479 65%,transparent);background:linear-gradient(150deg,#241d0d,#141423 55%)}
.cd-game .im{background:conic-gradient(from 210deg,#ffd479,#ff5c8a,#7c5cff,#22d3ee,#ffd479);filter:saturate(1.15)}
.cd-game .im::after{background:radial-gradient(80% 60% at 50% 120%,rgba(0,0,0,.75),transparent 60%)}
.cd-game h4{color:#ffe9a8}
.cd-game::before{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 0 0 1px rgba(255,212,121,.4),0 0 0 0 rgba(255,212,121,.55);animation:gg 2.6s ease-out infinite;pointer-events:none}
.cd-game:hover{transform:translateY(calc(var(--lift,8px) * -1)) rotate(-.6deg)}
` + kf('gg', '0%{box-shadow:inset 0 0 0 1px rgba(255,212,121,.4),0 0 0 0 rgba(255,212,121,.5)}70%,100%{box-shadow:inset 0 0 0 1px rgba(255,212,121,.4),0 0 0 16px rgba(255,212,121,0)}'),
      '' ],

    ['notif', 'Notification Card', `<figure class="cd cd-nt"><span class="ic">\u2709</span><figcaption><h4>3 new comments</h4><p>on "Shadow DOM isolation" · 2m ago</p></figcaption><button class="x">\u00D7</button><span class="prog"></span></figure>`,
      `.cd-nt{flex-direction:row;align-items:center;gap:12px;padding:12px 14px;width:var(--w,272px);animation:ntr .6s cubic-bezier(.2,.9,.2,1) both}
.cd-nt .ic{width:34px;height:34px;flex:none;border-radius:10px;display:grid;place-items:center;background:color-mix(in srgb,var(--c1,${C1}) 28%,transparent);color:var(--c2,${C2})}
.cd-nt figcaption{padding:0;flex:1;min-width:0}
.cd-nt h4{font-size:.86rem}
.cd-nt p{margin:0;font-size:.74rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cd-nt .x{border:0;background:none;color:#8a8aa2;font-size:16px;cursor:pointer;line-height:1;padding:2px 4px}
.cd-nt .prog{position:absolute;left:0;bottom:0;height:2px;background:var(--c1,${C1});animation:ntt 6s linear forwards;width:100%;transform-origin:left}
.cd-nt .x:hover{color:#fff}
` + kf('ntr', 'from{transform:translateX(26px) scale(.96);opacity:0}') + '\n' + kf('ntt', 'to{transform:scaleX(0)}'),
      'var cd=root.querySelector(".cd-nt");\ncd.querySelector(".x").addEventListener("click",function(){cd.style.transition="transform .3s,opacity .3s";cd.style.transform="translateX(30px) scale(.94)";cd.style.opacity="0";setTimeout(function(){cd.style.transform="";cd.style.opacity=""},900)});' ],

    ['art', 'Framed Art', `<figure class="cd cd-art"><span class="mat"><em class="pic"></em></span><figcaption><h4>Untitled (Rings)</h4><p>Archival print · 2 of 40</p></figcaption></figure>`,
      `.cd-art{background:#efece4;padding:12px;border:0}
.cd-art .mat{display:block;padding:16px;background:#fbfaf5;box-shadow:inset 0 0 0 1px rgba(0,0,0,.1)}
.cd-art .pic{display:block;height:calc(var(--img,118px) + 22px);background:conic-gradient(from 0deg at 50% 50%,#7c5cff,#22d3ee,#ff5c8a,#7c5cff);border-radius:50%;transition:transform .8s cubic-bezier(.2,.9,.2,1),filter .5s}
.cd-art h4{color:#22222e;font-size:.9rem}
.cd-art p{color:#6a6a7a}
.cd-art:hover .pic{transform:scale(1.08) rotate(90deg);filter:saturate(1.4)}
.cd-art:hover{transform:translateY(calc(var(--lift,8px) * -1));box-shadow:0 22px 40px -22px rgba(0,0,0,.6)}`,
      '' ]
  ];
  contentCards.forEach(function (c) {
    push({
      family: 'card:' + c[0], id: 'card-' + c[0], title: c[1], tags: ['card', 'ui'].concat(c[4] ? ['js'] : ['hover']),
      html: c[2], css: join([shell, c[3]]), js: c[4] || undefined,
      cfg: STD
    });
  });

  /* ─────────────── grid / collage variants of the shell ─────────────── */
  [['gallery-3', 'Collage Card', `<figure class="cd cd-col"><span class="a"></span><span class="b"></span><span class="c"></span><figcaption><h4>Studio set</h4><p>3 frames</p></figcaption></figure>`,
    `.cd-col{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:calc(var(--img,118px) * .62) calc(var(--img,118px) * .62) auto;gap:3px;padding:3px}
.cd-col span{border-radius:calc(var(--radius,18px) / 3);background:linear-gradient(140deg,var(--c1,${C1}),var(--c2,${C2}));transition:transform .5s cubic-bezier(.2,.9,.2,1),filter .4s;position:relative}
.cd-col .a{grid-row:span 2}
.cd-col .c{filter:hue-rotate(60deg)}
.cd-col figcaption{grid-column:1/-1;padding:8px 10px 10px}
.cd-col:hover .a{transform:scale(1.04);filter:saturate(1.4)}
.cd-col:hover .b{transform:scale(1.04) translateY(-2px)}
.cd-col:hover .c{transform:scale(1.04) translateY(2px)}`],
   ['list-rows', 'List Card', `<figure class="cd cd-lst"><figcaption><h4>Tonight</h4><ul><li><i></i>Ship the tuner</li><li><i></i>Review loaders</li><li><i></i>Push to Pages</li></ul></figcaption></figure>`,
    `.cd-lst ul{list-style:none;margin:6px 0 0;padding:0;display:grid;gap:7px}
.cd-lst li{display:flex;gap:9px;align-items:center;font-size:.8rem;color:#c8c8dd;transition:transform .3s cubic-bezier(.2,.9,.2,1),color .3s}
.cd-lst li i{width:14px;height:14px;flex:none;border-radius:5px;border:2px solid var(--c1,${C1});transition:background .3s,transform .3s}
.cd-lst li:hover{transform:translateX(5px);color:#fff}
.cd-lst li:hover i{background:var(--c1,${C1});transform:rotate(45deg) scale(1.1)}`],
   ['avatar-group', 'Team Card', `<figure class="cd cd-team"><figcaption><h4>Design guild</h4><p>7 contributors</p><span class="grp"><i>A</i><i>K</i><i>M</i><i>R</i><i>+3</i></span></figcaption></figure>`,
    `.cd-team .grp{display:flex;padding-left:8px}
.cd-team .grp i{width:30px;height:30px;margin-left:-10px;border-radius:50%;display:grid;place-items:center;font:700 11px "Space Grotesk",sans-serif;color:#12121f;background:linear-gradient(140deg,var(--c1,${C1}),var(--c2,${C2}));border:2px solid #141423;transition:transform .3s cubic-bezier(.3,1.5,.4,1),margin .3s}
.cd-team:hover .grp i{transform:translateY(-5px);margin-left:2px}
.cd-team .grp i:nth-child(2n){background:linear-gradient(140deg,${C3},#ffd479)}
.cd-team .grp i:nth-child(3n){background:linear-gradient(140deg,#34d399,var(--c2,${C2}))}`],
   ['progress-card', 'Goal Card', `<figure class="cd cd-goal"><figcaption><h4>Ship 100 loaders</h4><p><b class="pc">0%</b> complete</p><span class="track"><i></i></span><span class="row"><b>goal 100</b><b>73 done</b></span></figcaption></figure>`,
    `.cd-goal .track{display:block;height:10px;border-radius:99px;background:rgba(255,255,255,.12);overflow:hidden}
.cd-goal .track i{display:block;height:100%;width:73%;border-radius:99px;background:linear-gradient(90deg,var(--c1,${C1}),var(--c2,${C2}));box-shadow:0 0 14px color-mix(in srgb,var(--c2,${C2}) 70%,transparent);animation:goal 3.4s cubic-bezier(.2,.9,.2,1) infinite}
.cd-goal b.pc{color:#fff;font:700 .8rem "JetBrains Mono",monospace}
` + kf('goal', '0%{transform:translateX(-100%)}40%,100%{transform:translateX(0)}')],
   ['slider-card', 'Drag Slider Card', `<figure class="cd cd-sl"><figcaption><h4>Intensity</h4><p><b class="v">58</b>%</p><span class="rng"><i class="fill"></i><b class="knob"></b></span></figcaption></figure>`,
    `.cd-sl .rng{position:relative;display:block;height:8px;border-radius:99px;background:rgba(255,255,255,.14);cursor:pointer;touch-action:none}
.cd-sl .fill{position:absolute;inset:0 auto 0 0;width:var(--p,58%);border-radius:99px;background:linear-gradient(90deg,var(--c1,${C1}),var(--c2,${C2}))}
.cd-sl .knob{position:absolute;top:50%;left:var(--p,58%);width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%;background:#fff;box-shadow:0 3px 10px rgba(0,0,0,.5);transition:transform .18s}
.cd-sl .rng:hover .knob{transform:scale(1.2)}
.cd-sl .v{color:#fff;font:700 .82rem "JetBrains Mono",monospace}`,
    'var g=root.querySelector(".rng"),f=root.querySelector(".fill"),k=root.querySelector(".knob"),v=root.querySelector(".v");\nfunction set(e){var r=g.getBoundingClientRect(),p=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));\n  f.style.width=(p*100).toFixed(1)+"%";k.style.left=(p*100).toFixed(1)+"%";v.textContent=Math.round(p*100)}\nvar dn=false;\ng.addEventListener("pointerdown",function(e){dn=true;g.setPointerCapture(e.pointerId);set(e)});\ng.addEventListener("pointermove",function(e){if(dn)set(e)});\ng.addEventListener("pointerup",function(){dn=false});']]
  .forEach(function (s) {
    push({
      family: 'card:' + s[0], id: 'card-' + s[0], title: s[1], tags: ['card', s[4] ? 'js' : 'hover', 'ui'],
      html: s[2], css: join([shell, s[3]]), js: s[4], cfg: STD
    });
  });


  /* ─────────────── the same mechanics on different layouts ─────────────── */
  var layouts = {
    wide: { cls: ' cd-wide', css: `.cd-wide{flex-direction:row;align-items:stretch;width:calc(var(--w,214px) * 1.35)}
.cd-wide .im{width:44%;height:auto;flex:none}` },
    tall: { cls: ' cd-tall', css: `.cd-tall .im{height:calc(var(--img,118px) * 1.5)}` },
    mini: { cls: ' cd-mini', css: `.cd-mini{width:168px}
.cd-mini .im{height:74px}
.cd-mini figcaption{padding:9px 11px}` }
  };
  ['lift', 'img-zoom', 'duotone', 'shine', 'spot-mask', 'flip-y', 'neon-outline', 'ken-burns', 'peel', 'glass-sweep', 'notch-cut', 'blob-radius'].forEach(function (m) {
    Object.keys(layouts).forEach(function (L) {
      var lay = layouts[L];
      push({
        family: 'card:layout', id: 'card-' + m + '-' + L,
        title: { lift: 'Lift', 'img-zoom': 'Zoom', duotone: 'Duotone', shine: 'Gloss Sweep', 'spot-mask': 'Spotlight', 'flip-y': 'Flip', 'neon-outline': 'Neon Edge', 'ken-burns': 'Ken Burns', peel: 'Peel', 'glass-sweep': 'Glass Sweep', 'notch-cut': 'Notch', 'blob-radius': 'Blob' }[m] + ' · ' + ({ wide: 'Horizontal', tall: 'Tall', mini: 'Compact' }[L]),
        tags: ['card', 'hover', 'css'],
        html: '<figure class="cd' + lay.cls + '"><span class="im"></span><figcaption><h4>' + ({ wide: 'Horizontal', tall: 'Tall', mini: 'Compact' }[L]) + ' card</h4><p>Same mechanic, different shape.</p><span class="row"><b>css</b><b>hover</b></span></figcaption></figure>',
        css: join([shell, layouts[L].css, hoverMech[m] === hoverMech['flip-y'] ? '.cd .front{display:flex;flex-direction:column;height:100%;backface-visibility:hidden}' : hoverMech[m], m === 'flip-y' ? kf('cdspin', '') : '']),
        cfg: STD
      });
    });
  });

  /* ─────────────── more mechanics + interactive cards ─────────────── */
  var extras = [
    { name: 'fold-corner', title: 'Corner Fold Down',
      css: `.cd::after{content:"";position:absolute;right:0;top:0;width:0;height:0;border-style:solid;border-width:0 0 0 0;border-color:color-mix(in srgb,var(--c2,${C2}) 75%,transparent) transparent transparent transparent;transition:border-width .42s cubic-bezier(.2,.9,.2,1)}
.cd:hover::after{border-width:var(--notch,30px) var(--notch,30px) 0 0}`,
      cfg: [range('Fold', '--notch', 8, 54, 2, 30, 'px')] },
    { name: 'diagonal-wipe', title: 'Diagonal Wipe Reveal',
      css: `.cd .im::before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,var(--c1,${C1}),var(--c3,${C3}));clip-path:polygon(0 0,0 0,0 100%,0 100%);transition:clip-path .55s cubic-bezier(.6,0,.25,1)}
.cd:hover .im::before{clip-path:polygon(0 0,135% 0,100% 100%,0 100%)}` },
    { name: 'reflect', title: 'Wet Floor Reflection',
      css: `.cd{overflow:visible}
.cd::before{content:"";position:absolute;left:2%;right:2%;top:100%;height:52%;border-radius:inherit;background:linear-gradient(160deg,var(--c1,${C1}),var(--c2,${C2}));-webkit-mask:linear-gradient(180deg,rgba(0,0,0,.4),transparent 70%);mask:linear-gradient(180deg,rgba(0,0,0,.4),transparent 70%);transform:scaleY(-1);opacity:.5;pointer-events:none;transition:opacity .4s,height .4s}
.cd:hover::before{opacity:.8;height:64%}
.cd:hover{transform:translateY(calc(var(--lift,8px) * -1))}` },
    { name: 'reveal-cta', title: 'CTA Slides In',
      extra: '<button class="cta">Open project <i>\u2192</i></button>',
      css: `.cd .cta{position:absolute;left:12px;right:12px;bottom:12px;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:9px 12px;border-radius:calc(var(--radius,18px) / 2);background:rgba(10,10,20,.72);backdrop-filter:blur(8px);color:#fff;font:600 .78rem "Space Grotesk",sans-serif;transform:translateY(150%);opacity:0;transition:.42s cubic-bezier(.2,.9,.2,1);border:1px solid rgba(255,255,255,.16);cursor:pointer;z-index:3}
.cd:hover .cta{transform:none;opacity:1}
.cd .cta i{font-style:normal;transition:transform .3s}
.cd .cta:hover i{transform:translateX(5px)}` },
    { name: 'select-tick', title: 'Selectable Card',
      extra: '<span class="tick">\u2713</span>',
      css: `.cd{cursor:pointer}
.cd .tick{position:absolute;right:10px;top:10px;width:26px;height:26px;border-radius:50%;border:2px solid rgba(255,255,255,.4);display:grid;place-items:center;color:#12121f;font-size:14px;background:transparent;transition:.3s cubic-bezier(.3,1.5,.4,1);z-index:3;opacity:.75}
.cd.sel{border-color:var(--c1,${C1});box-shadow:0 0 0 2px color-mix(in srgb,var(--c1,${C1}) 45%,transparent)}
.cd.sel .tick{background:var(--c1,${C1});border-color:var(--c1,${C1});transform:scale(1.12);opacity:1}
.cd:hover{transform:translateY(-4px)}`,
      js: 'var cd=root.querySelector(".cd");\ncd.addEventListener("click",function(){cd.classList.toggle("sel")});' },
    { name: 'live-dot', title: 'Live Stream Card',
      body: 'Design crit · room opens now', live: true,
      css: `.cd .live{position:absolute;left:12px;top:12px;display:inline-flex;align-items:center;gap:6px;padding:5px 9px;border-radius:99px;background:rgba(10,10,20,.6);font:700 9px "JetBrains Mono",monospace;letter-spacing:.16em;color:#ff5c8a;z-index:3}
.cd .live i{width:7px;height:7px;border-radius:50%;background:#ff5c8a;animation:lv 1.6s ease-out infinite}
@keyframes lv{0%{box-shadow:0 0 0 0 rgba(255,92,138,.65)}70%,100%{box-shadow:0 0 0 9px rgba(255,92,138,0)}}
.cd:hover .im{filter:saturate(1.35)}` },
    { name: 'kanban', title: 'Kanban Card',
      head: 'Tune the ring', body: 'UI-81 · 2 of 3 done',
      extra: '<span class="who">AG</span>',
      css: `.cd{cursor:grab}
.cd .who{position:absolute;right:12px;bottom:12px;width:24px;height:24px;border-radius:50%;background:linear-gradient(140deg,var(--c2,${C2}),var(--c1,${C1}));display:grid;place-items:center;font:700 9px "Space Grotesk",sans-serif;color:#0d0d18}
.cd .bar{display:flex;gap:4px;margin-top:4px}
.cd .bar i{width:24px;height:4px;border-radius:99px;background:rgba(255,255,255,.2)}
.cd .bar i.on{background:var(--c2,${C2})}
.cd:hover{cursor:grabbing;transform:rotate(-1.4deg) translateY(-6px) scale(1.02);box-shadow:0 26px 40px -22px #000}`,
      extraHtml: '<div class="bar"><i class="on"></i><i class="on"></i><i></i></div>' },
    { name: 'todo-check', title: 'Todo Card',
      css: `.cd ul{list-style:none;margin:6px 0 0;padding:0;display:grid;gap:7px}
.cd li{display:flex;gap:9px;align-items:center;font-size:.78rem;color:#c8c8dd;cursor:pointer}
.cd li em{width:15px;height:15px;flex:none;border:2px solid var(--c1,${C1});border-radius:50%;transition:.25s}
.cd li.done{color:#6d6d85;text-decoration:line-through}
.cd li.done em{background:var(--c1,${C1});box-shadow:inset 0 0 0 3px #141423}`,
      list: ['100 loaders', 'Tuner copy', 'Deploy to Pages'],
      js: 'var L=root.querySelectorAll(".cd li");\nfor(var i=0;i<L.length;i++)L[i].addEventListener("click",function(){this.classList.toggle("done")});' },
    { name: 'rating', title: 'Star Rating Card',
      css: `.cd .stars{display:flex;gap:5px;font-size:20px;color:rgba(255,255,255,.22);cursor:pointer}
.cd .stars i{transition:transform .2s cubic-bezier(.3,1.6,.4,1),color .2s;font-style:normal}
.cd .stars i.on{color:#ffd479;transform:scale(1.2)}
.cd .stars i:hover{transform:scale(1.3)}
.cd .rate{font:600 .74rem "JetBrains Mono",monospace;color:#9a9ab0}`,
      stars: true,
      js: 'var S=root.querySelectorAll(".stars i"),lab=root.querySelector(".rate"),cur=0;\nfunction paint(n){for(var i=0;i<S.length;i++)S[i].classList.toggle("on",i<n)}\nfor(var i=0;i<S.length;i++)(function(idx){S[idx].addEventListener("click",function(){cur=idx+1;paint(cur);lab.textContent=cur+"/5"})})(i);' },
    { name: 'code-card', title: 'Copy Code Card',
      code: true,
      css: `.cd pre{margin:0;padding:12px 14px;font:500 .72rem/1.6 "JetBrains Mono",monospace;color:#c8c8dd;background:#0e0e1a;overflow:auto;border-bottom:1px solid rgba(255,255,255,.08);height:var(--img,118px)}
.cd .cp{position:absolute;right:10px;top:10px;border:0;border-radius:8px;background:rgba(140,140,180,.22);color:#e8e8f5;font:600 .68rem "Space Grotesk",sans-serif;padding:5px 9px;cursor:pointer;transition:.25s;z-index:3}
.cd .cp:hover{background:var(--c1,${C1})}
.cd .cp.ok{background:#34d399;color:#08251b}`,
      js: 'var b=root.querySelector(".cp");\nb.addEventListener("click",function(){b.classList.add("ok");b.textContent="Copied \u2713";setTimeout(function(){b.classList.remove("ok");b.textContent="Copy"},1400)});' },
    { name: 'spin-360', title: '360\u00b0 Product Spin',
      css: `.cd{cursor:ew-resize}
.cd .shot{position:absolute;inset:10% 16%;border-radius:14px;background:linear-gradient(150deg,#fff,rgba(255,255,255,.28));box-shadow:0 18px 30px -16px rgba(0,0,0,.6);transition:transform .1s linear}
.cd .hint{position:absolute;left:12px;bottom:12px;font:600 .66rem "JetBrains Mono",monospace;letter-spacing:.1em;color:rgba(255,255,255,.75);z-index:3}`,
      spin: true,
      js: 'var cd=root.querySelector(".cd"),sh=cd.querySelector(".shot"),x0=null,deg=0;\ncd.addEventListener("pointerdown",function(e){x0=e.clientX;cd.setPointerCapture(e.pointerId)});\ncd.addEventListener("pointermove",function(e){if(x0===null)return;deg+=(e.clientX-x0)*.9;x0=e.clientX;sh.style.transform="perspective(500px) rotateY("+deg.toFixed(1)+"deg)"});\ncd.addEventListener("pointerup",function(){x0=null});' },
    { name: 'tabs-card', title: 'Tabs In A Card',
      css: `.cd .tabs{display:flex;gap:4px;padding:10px 12px 0;border-bottom:1px solid rgba(255,255,255,.1)}
.cd .tabs button{flex:1;border:0;background:transparent;color:#9a9ab0;font:600 .74rem "Space Grotesk",sans-serif;padding:8px 4px;cursor:pointer;border-bottom:2px solid transparent;transition:.25s}
.cd .tabs button.on{color:#fff;border-bottom-color:var(--c1,${C1})}
.cd .pane{padding:12px 14px;font-size:.78rem;color:#c8c8dd;display:none;margin:0}
.cd .pane.on{display:block;animation:tabin .3s ease}
@keyframes tabin{from{opacity:0;transform:translateY(6px)}}
.cd .im{height:66px}`,
      tabs: ['Spec', 'Notes', 'Files'],
      js: 'var B=root.querySelectorAll(".tabs button"),P=root.querySelectorAll(".pane");\nfor(var i=0;i<B.length;i++)(function(idx){B[idx].addEventListener("click",function(){\n  for(var j=0;j<B.length;j++){B[j].classList.toggle("on",j===idx);P[j].classList.toggle("on",j===idx)}})})(i);' }
  ];
  extras.forEach(function (v) {
    var cap;
    if (v.list) cap = '<ul>' + v.list.map(function (x) { return '<li><em></em>' + x + '</li>'; }).join('') + '</ul>';
    else if (v.stars) cap = '<span class="stars">' + cells(5, 'i') + '</span><b class="rate">tap a star</b>';
    else if (v.tabs) cap = '<div class="tabs">' + v.tabs.map(function (t, i) { return '<button' + (i ? '' : ' class="on"') + '>' + t + '</button>'; }).join('') + '</div>' +
      ['1,800 effects, 9 categories, one shadow root each.', 'Tune colours, speed and size from any card.', 'MIT licensed — no attribution needed.'].map(function (p, i) { return '<p class="pane' + (i ? '' : ' on') + '">' + p + '</p>'; }).join('');
    else if (v.code) cap = null;
    else cap = '<h4>' + (v.head || v.title) + '</h4><p>' + (v.body || 'Hover or click the card.') + '</p>' + (v.extraHtml || '');

    var media = v.code ? '<pre>.fx{animation:spin 1s linear}\n@keyframes spin{to{rotate:1turn}}</pre><button class="cp">Copy</button>'
      : v.spin ? '<span class="im"><b class="shot"></b><span class="hint">DRAG TO SPIN</span></span>'
        : '<span class="im"></span>';
    var tail = v.extra || '';
    if (v.live || v.kanban) tail += '';
    push({
      family: 'card:' + v.name, id: 'card-' + v.name, title: v.title,
      tags: ['card', 'ui'].concat(v.js ? ['js'] : ['hover']),
      html: '<figure class="cd">' + media + (cap ? '<figcaption>' + cap + '</figcaption>' : '') +
        (v.live ? '<span class="live"><i></i>live now</span>' : '') + tail + '</figure>',
      css: join([shell, v.css]), js: v.js, cfg: STD.concat(v.cfg || [])
    });
  });

  K.add('cards', pool);
})(window);
