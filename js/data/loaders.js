/* Category: Loaders & Spinners */
(function () {
  var L = (window.MOTION_LAB = window.MOTION_LAB || []);
  L.push(

{ id: 'ring-spinner', title: 'Classic Ring', cat: 'loaders', tags: ['css', 'spinner'],
  html: '<div class="ring"></div>',
  css: '.ring{width:56px;height:56px;border-radius:50%;border:5px solid rgba(140,140,180,.25);border-top-color:#7c5cff;animation:spin 1s linear infinite}\n@keyframes spin{to{transform:rotate(1turn)}}'
},

{ id: 'dual-ring', title: 'Dual Counter Ring', cat: 'loaders', tags: ['css', 'spinner'],
  html: '<div class="dual"><span></span><span></span></div>',
  css: '.dual{position:relative;width:64px;height:64px}\n.dual span{position:absolute;inset:0;border-radius:50%;border:4px solid transparent}\n.dual span:nth-child(1){border-top-color:#7c5cff;border-bottom-color:#7c5cff;animation:d1 1.1s cubic-bezier(.6,.1,.4,.9) infinite}\n.dual span:nth-child(2){inset:10px;border-left-color:#22d3ee;border-right-color:#22d3ee;animation:d1 1.1s cubic-bezier(.6,.1,.4,.9) infinite reverse}\n@keyframes d1{to{transform:rotate(1turn)}}'
},

{ id: 'dots-bounce', title: 'Bouncing Dots', cat: 'loaders', tags: ['css', 'dots'],
  html: '<div class="db"><i></i><i></i><i></i></div>',
  css: '.db{display:flex;gap:10px}\n.db i{width:14px;height:14px;border-radius:50%;background:#7c5cff;animation:bnc .6s ease-in-out infinite alternate}\n.db i:nth-child(2){background:#a855f7;animation-delay:.15s}\n.db i:nth-child(3){background:#22d3ee;animation-delay:.3s}\n@keyframes bnc{to{transform:translateY(-18px) scale(1.1)}}'
},

{ id: 'pulse-circle', title: 'Pulse Beacon', cat: 'loaders', tags: ['css', 'pulse'],
  html: '<div class="pb"><span></span><span></span><span></span></div>',
  css: '.pb{position:relative;width:70px;height:70px;display:grid;place-items:center}\n.pb span{position:absolute;width:70px;height:70px;border-radius:50%;background:#22d3ee;opacity:0;animation:pl 2.1s cubic-bezier(.2,.6,.3,1) infinite}\n.pb span:nth-child(2){animation-delay:.7s}\n.pb span:nth-child(3){animation-delay:1.4s}\n@keyframes pl{0%{transform:scale(.25);opacity:.85}100%{transform:scale(1);opacity:0}}'
},

{ id: 'equalizer', title: 'Audio Equalizer', cat: 'loaders', tags: ['css', 'bars'],
  html: '<div class="eq"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>',
  css: '.eq{display:flex;align-items:flex-end;gap:5px;height:60px}\n.eq i{width:8px;border-radius:4px;background:linear-gradient(#22d3ee,#7c5cff);animation:eqb .9s ease-in-out infinite alternate}\n.eq i:nth-child(1){height:20%;animation-delay:0s}\n.eq i:nth-child(2){height:55%;animation-delay:.1s}\n.eq i:nth-child(3){height:85%;animation-delay:.2s}\n.eq i:nth-child(4){height:40%;animation-delay:.3s}\n.eq i:nth-child(5){height:70%;animation-delay:.4s}\n.eq i:nth-child(6){height:30%;animation-delay:.5s}\n.eq i:nth-child(7){height:60%;animation-delay:.6s}\n@keyframes eqb{to{height:100%}}'
},

{ id: 'square-flip', title: 'Flipping Square', cat: 'loaders', tags: ['css', '3d'],
  html: '<div class="sq"></div>',
  css: '.sq{width:48px;height:48px;background:linear-gradient(135deg,#7c5cff,#ff5c8a);border-radius:8px;animation:flipsq 2s ease-in-out infinite}\n@keyframes flipsq{0%{transform:perspective(160px) rotateX(0) rotateY(0)}50%{transform:perspective(160px) rotateX(-180deg) rotateY(0)}100%{transform:perspective(160px) rotateX(-180deg) rotateY(-180deg)}}'
},

{ id: 'orbit-loader', title: 'Orbiting Moons', cat: 'loaders', tags: ['css', 'orbit'],
  html: '<div class="orb"><i></i><i></i><i></i></div>',
  css: '.orb{position:relative;width:80px;height:80px}\n.orb i{position:absolute;inset:0;border-radius:50%;border:2px dashed rgba(140,140,180,.28);animation:ospin 3s linear infinite}\n.orb i::after{content:"";position:absolute;top:-7px;left:50%;margin-left:-7px;width:14px;height:14px;border-radius:50%;background:#7c5cff;box-shadow:0 0 14px #7c5cff}\n.orb i:nth-child(2){inset:14px;animation-duration:2s;animation-direction:reverse}\n.orb i:nth-child(2)::after{background:#22d3ee;box-shadow:0 0 14px #22d3ee}\n.orb i:nth-child(3){inset:28px;animation-duration:1.3s}\n.orb i:nth-child(3)::after{background:#ff5c8a;box-shadow:0 0 14px #ff5c8a}\n@keyframes ospin{to{transform:rotate(1turn)}}'
},

{ id: 'ripple-loader', title: 'Ripple Rings', cat: 'loaders', tags: ['css', 'ripple'],
  html: '<div class="rp"><span></span><span></span></div>',
  css: '.rp{position:relative;width:80px;height:80px}\n.rp span{position:absolute;top:50%;left:50%;border:4px solid #7c5cff;border-radius:50%;animation:rip 1.6s cubic-bezier(0,.2,.8,1) infinite}\n.rp span:nth-child(2){border-color:#22d3ee;animation-delay:-.8s}\n@keyframes rip{0%{width:0;height:0;margin:0;opacity:1}100%{width:80px;height:80px;margin:-40px 0 0 -40px;opacity:0}}'
},

{ id: 'conic-spinner', title: 'Conic Gradient Spin', cat: 'loaders', tags: ['css', 'gradient'],
  html: '<div class="cg"></div>',
  css: '.cg{width:62px;height:62px;border-radius:50%;background:conic-gradient(from 0deg,transparent 0deg,#7c5cff 90deg,#22d3ee 260deg,transparent 360deg);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 8px),#000 0);mask:radial-gradient(farthest-side,transparent calc(100% - 8px),#000 0);animation:spin 1s linear infinite}\n@keyframes spin{to{transform:rotate(1turn)}}'
},

{ id: 'typing-dots', title: 'Chat Typing Bubble', cat: 'loaders', tags: ['css', 'chat'],
  html: '<div class="bub"><i></i><i></i><i></i></div>',
  css: '.bub{display:flex;gap:6px;align-items:center;padding:16px 20px;border-radius:22px 22px 22px 6px;background:rgba(140,140,180,.16);border:1px solid rgba(160,160,200,.2)}\n.bub i{width:9px;height:9px;border-radius:50%;background:#9a9ab0;animation:td 1.3s ease-in-out infinite}\n.bub i:nth-child(2){animation-delay:.18s}\n.bub i:nth-child(3){animation-delay:.36s}\n@keyframes td{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-8px);opacity:1}}'
},

{ id: 'indeterminate-bar', title: 'Indeterminate Bar', cat: 'loaders', tags: ['css', 'progress'],
  html: '<div class="ib"><span></span></div>',
  css: '.ib{width:220px;height:8px;border-radius:99px;background:rgba(140,140,180,.2);overflow:hidden;position:relative}\n.ib span{position:absolute;inset:0 auto 0 0;width:40%;border-radius:99px;background:linear-gradient(90deg,#7c5cff,#22d3ee);animation:slide 1.5s cubic-bezier(.65,0,.35,1) infinite}\n@keyframes slide{0%{left:-40%}100%{left:100%}}'
},

{ id: 'hourglass', title: 'Hourglass Flip', cat: 'loaders', tags: ['css', 'shape'],
  html: '<div class="hg"></div>',
  css: '.hg{width:0;height:0;border:26px solid #7c5cff;border-color:#7c5cff transparent;animation:hgf 1.4s cubic-bezier(.7,0,.3,1) infinite}\n@keyframes hgf{0%{transform:rotate(0);border-width:26px 26px 0 26px}25%{border-width:0 26px 26px 26px}50%{transform:rotate(180deg);border-width:0 26px 26px 26px}75%{border-width:26px 26px 0 26px}100%{transform:rotate(180deg);border-width:26px 26px 0 26px}}'
},

{ id: 'cube-grid', title: 'Cube Grid Wave', cat: 'loaders', tags: ['css', 'grid'],
  html: '<div class="cgd"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>',
  css: '.cgd{display:grid;grid-template-columns:repeat(3,18px);gap:5px}\n.cgd i{width:18px;height:18px;border-radius:4px;background:#7c5cff;animation:cgs 1.3s ease-in-out infinite}\n.cgd i:nth-child(1),.cgd i:nth-child(5),.cgd i:nth-child(9){animation-delay:.2s}\n.cgd i:nth-child(2),.cgd i:nth-child(6){animation-delay:.3s}\n.cgd i:nth-child(3){animation-delay:.4s}\n.cgd i:nth-child(4),.cgd i:nth-child(8){animation-delay:.1s}\n.cgd i:nth-child(7){animation-delay:0s}\n@keyframes cgs{0%,70%,100%{transform:scale3d(1,1,1);background:#7c5cff}35%{transform:scale3d(0,0,1);background:#22d3ee}}'
},

{ id: 'heartbeat', title: 'Heartbeat', cat: 'loaders', tags: ['css', 'icon'],
  html: '<div class="hb">&#10084;</div>',
  css: '.hb{font-size:52px;color:#ff5c8a;line-height:1;filter:drop-shadow(0 0 14px rgba(255,92,138,.6));animation:beat 1.2s ease-in-out infinite}\n@keyframes beat{0%,100%{transform:scale(1)}14%{transform:scale(1.25)}28%{transform:scale(1)}42%{transform:scale(1.18)}70%{transform:scale(1)}}'
},

{ id: 'blade-spinner', title: 'Twelve Blades', cat: 'loaders', tags: ['css', 'ios'],
  html: '<div class="bl"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>',
  css: '.bl{position:relative;width:64px;height:64px}\n.bl i{position:absolute;top:0;left:50%;width:5px;height:16px;margin-left:-2.5px;border-radius:3px;background:#7c5cff;transform-origin:2.5px 32px;animation:blf 1.2s linear infinite}\n.bl i:nth-child(1){transform:rotate(0deg);animation-delay:-1.1s}\n.bl i:nth-child(2){transform:rotate(30deg);animation-delay:-1s}\n.bl i:nth-child(3){transform:rotate(60deg);animation-delay:-.9s}\n.bl i:nth-child(4){transform:rotate(90deg);animation-delay:-.8s}\n.bl i:nth-child(5){transform:rotate(120deg);animation-delay:-.7s}\n.bl i:nth-child(6){transform:rotate(150deg);animation-delay:-.6s}\n.bl i:nth-child(7){transform:rotate(180deg);animation-delay:-.5s}\n.bl i:nth-child(8){transform:rotate(210deg);animation-delay:-.4s}\n.bl i:nth-child(9){transform:rotate(240deg);animation-delay:-.3s}\n.bl i:nth-child(10){transform:rotate(270deg);animation-delay:-.2s}\n.bl i:nth-child(11){transform:rotate(300deg);animation-delay:-.1s}\n.bl i:nth-child(12){transform:rotate(330deg);animation-delay:0s}\n@keyframes blf{0%{opacity:1}100%{opacity:.15}}'
},

{ id: 'yin-yang', title: 'Yin Yang Spin', cat: 'loaders', tags: ['css', 'shape'],
  html: '<div class="yy"></div>',
  css: '.yy{width:64px;height:32px;border:3px solid #7c5cff;border-bottom-width:32px;border-radius:50%;position:relative;animation:spin 1.6s linear infinite}\n.yy::before,.yy::after{content:"";position:absolute;top:50%;width:6px;height:6px;border-radius:50%;border:13px solid #7c5cff}\n.yy::before{left:0;background:#22d3ee;border-color:#7c5cff}\n.yy::after{right:0;background:#7c5cff;border-color:#22d3ee}\n@keyframes spin{to{transform:rotate(1turn)}}'
},

{ id: 'infinity-dash', title: 'Infinity Trace', cat: 'loaders', tags: ['svg', 'stroke'],
  html: '<svg class="inf" viewBox="0 0 100 50"><path d="M25,25 C25,10 45,10 50,25 C55,40 75,40 75,25 C75,10 55,10 50,25 C45,40 25,40 25,25 Z"/></svg>',
  css: '.inf{width:150px;height:75px;overflow:visible}\n.inf path{fill:none;stroke:#7c5cff;stroke-width:4;stroke-linecap:round;stroke-dasharray:40 160;filter:drop-shadow(0 0 6px rgba(124,92,255,.8));animation:dashmove 2s linear infinite}\n@keyframes dashmove{to{stroke-dashoffset:-200}}'
},

{ id: 'atom-loader', title: 'Atom Orbitals', cat: 'loaders', tags: ['css', '3d'],
  html: '<div class="at"><i></i><i></i><i></i><b></b></div>',
  css: '.at{position:relative;width:90px;height:90px;display:grid;place-items:center}\n.at i{position:absolute;inset:0;border:2px solid #7c5cff;border-radius:50%;transform-style:preserve-3d}\n.at i:nth-child(1){animation:at1 2s linear infinite}\n.at i:nth-child(2){border-color:#22d3ee;animation:at2 2s linear infinite}\n.at i:nth-child(3){border-color:#ff5c8a;animation:at3 2s linear infinite}\n.at b{width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 0 18px #7c5cff}\n@keyframes at1{to{transform:rotateY(70deg) rotateZ(360deg)}}\n@keyframes at2{to{transform:rotateY(-70deg) rotateZ(360deg)}}\n@keyframes at3{to{transform:rotateX(70deg) rotateZ(360deg)}}'
},
{ id: 'metronome-tick', title: 'Metronome Tick', cat: 'loaders', tags: ['css', 'music'],
  html: '<div class="mt2"><b>&#9834; &nbsp;92 BPM</b><i></i></div>',
  css: '.mt2{position:relative;width:200px;height:150px;border-radius:18px;overflow:hidden;border:1px solid rgba(160,160,210,.2);background:linear-gradient(180deg,#272146,#131027 72%);box-shadow:inset 0 0 44px rgba(0,0,0,.45)}\n.mt2 b{position:absolute;top:12px;left:0;right:0;text-align:center;font:700 13px "JetBrains Mono",monospace;color:#8f89cf;letter-spacing:.14em;animation:tempo2 1.15s ease-in-out infinite}\n.mt2::before{content:"";position:absolute;left:0;right:0;bottom:34px;height:1px;background:linear-gradient(90deg,transparent,rgba(160,160,210,.35),transparent)}\n.mt2 i{position:absolute;left:50%;bottom:34px;width:6px;height:104px;margin-left:-3px;border-radius:99px;background:linear-gradient(#22d3ee,#7c5cff);transform-origin:center bottom;box-shadow:0 0 16px rgba(34,211,238,.45);animation:tick2 1.15s cubic-bezier(.5,.05,.5,.95) infinite alternate}\n.mt2 i::after{content:"";position:absolute;top:-10px;left:-10px;width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#22d3ee);box-shadow:0 0 20px rgba(34,211,238,.65),0 4px 10px rgba(0,0,0,.5)}\n.mt2 i::before{content:"";position:absolute;bottom:-8px;left:50%;width:46px;height:16px;margin-left:-23px;border-radius:7px;background:linear-gradient(#3a3560,#0f0c22);box-shadow:inset 0 2px 6px rgba(0,0,0,.9),0 2px 0 rgba(160,160,210,.25)}\n@keyframes tick2{from{transform:rotate(-36deg)}to{transform:rotate(36deg)}}\n@keyframes tempo2{0%,48%{transform:scale(1);color:#8f89cf}50%,96%{transform:scale(1.14);color:#22d3ee}100%{transform:scale(1);color:#8f89cf}}'
},
{ id: 'battery-charge', title: 'Charging Battery', cat: 'loaders', tags: ['css', 'power'],
  html: '<div class="btc2"><div class="cell"><i></i><b>&#9889;</b></div><p>CHARGING<b>.</b><b>.</b><b>.</b></p></div>',
  css: '.btc2{display:grid;gap:16px;justify-items:center}\n.cell{position:relative;width:132px;height:58px;border:3px solid rgba(160,160,210,.4);border-radius:12px;background:#0a0a17;overflow:hidden}\n.cell::after{content:"";position:absolute;right:-10px;top:50%;width:7px;height:24px;margin-top:-12px;border-radius:0 5px 5px 0;background:rgba(160,160,210,.4)}\n.cell i{position:absolute;top:3px;bottom:3px;left:3px;width:0;border-radius:8px;background:linear-gradient(90deg,#22c55e,#22d3ee 55%,#7c5cff);box-shadow:0 0 20px rgba(34,211,238,.5);animation:chg2 3s cubic-bezier(.6,.05,.3,1) infinite}\n.cell i::after{content:"";position:absolute;inset:0;background:linear-gradient(120deg,transparent 25%,rgba(255,255,255,.6) 50%,transparent 75%);transform:translateX(-120%);animation:chgshine 3s ease-in-out infinite}\n.cell b{position:absolute;inset:0;display:grid;place-items:center;font-size:20px;z-index:2;filter:drop-shadow(0 0 8px rgba(255,255,255,.9))}\n.btc2 p{margin:0;font:700 12px "Space Grotesk",sans-serif;letter-spacing:.3em;text-indent:.3em;color:#9a9ab0}\n.btc2 p b{color:#22d3ee;opacity:0;animation:dt2 1.2s infinite}\n.btc2 p b:nth-child(2){animation-delay:.2s}\n.btc2 p b:nth-child(3){animation-delay:.4s}\n@keyframes chg2{0%{width:2%}55%{width:97%}82%{width:97%}90%{width:66%}100%{width:97%}}\n@keyframes chgshine{0%{transform:translateX(-120%)}40%,100%{transform:translateX(220%)}}\n@keyframes dt2{0%{opacity:0}50%{opacity:1}100%{opacity:0}}'
},

{ id: 'square-grid', title: 'Bouncy Grid', cat: 'loaders', tags: ['css', 'grid'],
  html: '<div class="sg2"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>',
  css: '\n.sg2{display:grid;grid-template-columns:repeat(3,20px);grid-template-rows:repeat(3,20px);gap:6px}\n.sg2 i{background:linear-gradient(135deg,#7c5cff,#22d3ee);border-radius:3px;animation:sg2 .9s ease-in-out infinite}\n.sg2 i:nth-child(2){animation-delay:.1s}.sg2 i:nth-child(3){animation-delay:.2s}\n.sg2 i:nth-child(4){animation-delay:.3s}.sg2 i:nth-child(5){animation-delay:.4s}\n.sg2 i:nth-child(6){animation-delay:.5s}.sg2 i:nth-child(7){animation-delay:.6s}\n.sg2 i:nth-child(8){animation-delay:.7s}.sg2 i:nth-child(9){animation-delay:.8s}\n@keyframes sg2{0%,80%,100%{opacity:.12;transform:scale(.55)}40%{opacity:1;transform:scale(1)}}\n'
}
,

{ id: 'orbit-dot', title: 'Orbit Pulse', cat: 'loaders', tags: ['css', 'orbit'],
  html: '<div class="od1"><i></i></div>',
  css: '\n.od1{position:relative;width:78px;height:78px;border-radius:50%;border:2px dashed rgba(140,140,180,.3)}\n.od1::before{content:"";position:absolute;inset:-2px;border-radius:50%;border-top:3px solid #7c5cff;animation:od1s 1.1s linear infinite}\n.od1 i{position:absolute;left:50%;top:50%;width:15px;height:15px;margin:-8px 0 0 -8px;border-radius:50%;background:#22d3ee;box-shadow:0 0 16px #22d3ee;animation:od1p 1.1s ease-in-out infinite}\n@keyframes od1s{to{transform:rotate(1turn)}}\n@keyframes od1p{0%,100%{transform:scale(.75);box-shadow:0 0 6px #22d3ee}50%{transform:scale(1.25);box-shadow:0 0 22px #22d3ee}}\n'
}
,

{ id: 'hop-cube', title: 'Hop & Shadow', cat: 'loaders', tags: ['css', '3d'],
  html: '<div class="hop2"><i></i></div>',
  css: '\n.hop2{position:relative;width:70px;height:80px;display:flex;align-items:flex-end;justify-content:center}\n.hop2 i{width:26px;height:26px;border-radius:6px;background:linear-gradient(135deg,#ff5c8a,#7c5cff);transform-origin:center bottom;animation:hop2 .8s cubic-bezier(.35,0,.2,1) infinite}\n.hop2::after{content:"";position:absolute;bottom:4px;left:50%;width:40px;height:7px;margin-left:-20px;border-radius:50%;background:rgba(0,0,0,.45);filter:blur(2px);animation:hopsh2 .8s ease-in-out infinite}\n@keyframes hop2{0%{transform:translateY(0) scaleY(1)}18%{transform:translateY(0) scale(1.06,.8)}45%{transform:translateY(-38px) scaleY(1.05)}70%{transform:translateY(0) scale(.94,1.12)}100%{transform:translateY(0) scaleY(1)}}\n@keyframes hopsh2{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(.45);opacity:.25}}\n'
}
,

{ id: 'triple-race', title: 'Lane Racer', cat: 'loaders', tags: ['css', 'bars'],
  html: '<div class="tr2"><b></b><b></b><b></b></div>',
  css: '\n.tr2{width:200px;display:grid;gap:12px}\n.tr2 b{height:9px;border-radius:99px;background:linear-gradient(90deg,#22d3ee,#7c5cff);position:relative;overflow:hidden}\n.tr2 b::after{content:"";position:absolute;top:0;bottom:0;left:-40px;width:40px;border-radius:99px;background:rgba(255,255,255,.55);animation:race2 1.6s ease-in-out infinite}\n.tr2 b:nth-child(2){opacity:.85}.tr2 b:nth-child(2)::after{animation-delay:.25s}\n.tr2 b:nth-child(3){opacity:.7}.tr2 b:nth-child(3)::after{animation-delay:.5s}\n@keyframes race2{0%{left:-40px}100%{left:105%}}\n'
}
,

{ id: 'cycle-text', title: 'Cycling Words', cat: 'loaders', tags: ['css', 'text'],
  html: '<div class="cyc"><div class="cyc-track"><span>RENDERING</span><span>BUFFERING</span><span>SYNCING</span><span>OPTIMIZING</span><span>RENDERING</span></div></div>',
  css: '\n.cyc{height:32px;overflow:hidden;font:700 15px \'Space Grotesk\',sans-serif;letter-spacing:.18em}\n.cyc-track{animation:cycroll 8s steps(4) infinite}\n.cyc span{display:block;height:32px;line-height:32px;color:#22d3ee;text-shadow:0 0 12px rgba(34,211,238,.6)}\n.cyc span:nth-child(2){color:#7c5cff}.cyc span:nth-child(3){color:#ff5c8a}.cyc span:nth-child(4){color:#a855f7}\n.cyc span::after{content:"_";animation:cyc_blink .6s steps(2) infinite}\n@keyframes cycroll{to{transform:translateY(-128px)}}\n@keyframes cyc_blink{50%{opacity:0}}\n'
}
,

{ id: 'buffer-blob', title: 'Buffer Blob', cat: 'loaders', tags: ['css', 'morph'],
  html: '<div class="blob2"><i></i><b>BUFFERING</b></div>',
  css: '\n.blob2{display:grid;justify-items:center;gap:12px}\n.blob2 i{width:70px;height:70px;background:conic-gradient(#7c5cff,#ff5c8a,#22d3ee,#7c5cff);border-radius:50%;animation:bl2r 1.6s linear infinite}\n.blob2 i::before{content:"";position:absolute;width:70px;height:70px;border-radius:50%;background:#131027;transform:scale(.9);animation:bl2m 2.2s ease-in-out infinite;display:block}\n.blob2 b{font:700 12px \'JetBrains Mono\',monospace;color:#8f8fa8;letter-spacing:.3em;animation:cyc_blink 1.4s ease-in-out infinite}\n@keyframes bl2r{to{transform:rotate(1turn)}}\n@keyframes bl2m{0%,100%{border-radius:50%}33%{border-radius:38% 62% 55% 45%/45% 40% 60% 55%}66%{border-radius:60% 40% 38% 62%/55% 60% 40% 45%}}\n@keyframes cyc_blink{50%{opacity:.4}}\n'
}
,

{ id: 'ring-count', title: 'Ring Counter', cat: 'loaders', tags: ['js', 'percentage'],
  html: '<div class="rc2"><div class="track"><i></i><em>0%</em></div></div>',
  css: '\n.rc2 .track{position:relative;width:86px;height:86px;border-radius:50%;background:conic-gradient(#7c5cff var(--p,0%),rgba(160,160,210,.15) 0);display:grid;place-items:center;-webkit-mask:radial-gradient(circle,transparent 58%,#000 59%);mask:radial-gradient(circle,transparent 58%,#000 59%)}\n.rc2 em{font:700 18px \'JetBrains Mono\',monospace;color:#e8e8f5;font-style:normal}\n',
  js: 'var t=0;var el=root.querySelector(\'.rc2 .track\');var out=root.querySelector(\'em\');api.raf(function(){t=(t+1.6)%100;el.style.setProperty(\'--p\',t+\'%\');out.textContent=Math.floor(t)+\'%\';});'
}

  );
})();
