/* Category: Cards & Hover */
(function () {
  var L = (window.MOTION_LAB = window.MOTION_LAB || []);
  L.push(

{ id: 'tilt-card', title: '3D Tilt Card', cat: 'cards', tags: ['js', '3d'],
  html: '<div class="tilt"><div class="inner"><h4>Tilt me</h4><p>Follow the cursor</p></div></div>',
  css: '.tilt{perspective:800px}\n.inner{width:190px;padding:26px 22px;border-radius:16px;background:linear-gradient(140deg,#7c5cff,#4c2fd6);color:#fff;box-shadow:0 18px 40px -18px rgba(0,0,0,.9);transition:transform .18s ease-out;transform-style:preserve-3d}\n.inner h4{margin:0 0 6px;font:700 20px "Space Grotesk",sans-serif;transform:translateZ(34px)}\n.inner p{margin:0;font:400 13px "Space Grotesk",sans-serif;opacity:.85;transform:translateZ(18px)}',
  js: 'var w=root.querySelector(".tilt"),c=w.querySelector(".inner");\nw.addEventListener("mousemove",function(e){var r=w.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform="rotateY("+x*24+"deg) rotateX("+(-y*24)+"deg) scale(1.05)";});\nw.addEventListener("mouseleave",function(){c.style.transform="";});'
},

{ id: 'flip-card', title: 'Flip Card', cat: 'cards', tags: ['3d', 'hover'],
  html: '<div class="fc"><div class="fci"><div class="f">Front</div><div class="b">Back &#10024;</div></div></div>',
  css: '.fc{width:190px;height:130px;perspective:900px}\n.fci{position:relative;width:100%;height:100%;transition:transform .7s cubic-bezier(.65,0,.35,1);transform-style:preserve-3d}\n.fc:hover .fci{transform:rotateY(180deg)}\n.f,.b{position:absolute;inset:0;display:grid;place-items:center;border-radius:14px;backface-visibility:hidden;font:700 20px "Space Grotesk",sans-serif;color:#fff}\n.f{background:linear-gradient(135deg,#7c5cff,#a855f7)}\n.b{background:linear-gradient(135deg,#22d3ee,#0ea5b7);transform:rotateY(180deg)}'
},

{ id: 'zoom-overlay', title: 'Zoom + Overlay', cat: 'cards', tags: ['hover', 'image'],
  html: '<figure class="zo"><div class="img"></div><figcaption><b>Mountain</b><span>Explore &#8594;</span></figcaption></figure>',
  css: '.zo{position:relative;margin:0;width:200px;height:150px;border-radius:14px;overflow:hidden;cursor:pointer}\n.zo .img{position:absolute;inset:0;background:linear-gradient(160deg,#ff5c8a,#7c5cff 60%,#22d3ee);transition:transform .7s cubic-bezier(.2,1,.3,1)}\n.zo:hover .img{transform:scale(1.18)}\n.zo figcaption{position:absolute;inset:auto 0 0 0;padding:14px;background:linear-gradient(transparent,rgba(0,0,0,.85));color:#fff;display:grid;gap:2px}\n.zo b{font:700 17px "Space Grotesk",sans-serif}\n.zo span{font:500 12px "Space Grotesk",sans-serif;opacity:0;transform:translateY(8px);transition:all .4s}\n.zo:hover span{opacity:1;transform:translateY(0)}'
},

{ id: 'slide-caption', title: 'Slide-Up Caption', cat: 'cards', tags: ['hover', 'reveal'],
  html: '<div class="sc"><div class="bgc">CARD</div><div class="cap"><b>Details</b><p>Extra content slides up from below on hover.</p></div></div>',
  css: '.sc{position:relative;width:200px;height:150px;border-radius:14px;overflow:hidden;cursor:pointer}\n.bgc{position:absolute;inset:0;display:grid;place-items:center;background:linear-gradient(135deg,#1f1f38,#3a2a72);color:rgba(255,255,255,.35);font:700 34px "Space Grotesk",sans-serif}\n.cap{position:absolute;inset:0;padding:18px;background:rgba(124,92,255,.94);color:#fff;transform:translateY(100%);transition:transform .45s cubic-bezier(.65,0,.35,1)}\n.sc:hover .cap{transform:translateY(0)}\n.cap b{font:700 16px "Space Grotesk",sans-serif}\n.cap p{margin:6px 0 0;font:400 12px "Space Grotesk",sans-serif;opacity:.9}'
},

{ id: 'conic-border', title: 'Rotating Conic Border', cat: 'cards', tags: ['gradient', 'css'],
  html: '<div class="cb"><div class="cbi">Gradient ring</div></div>',
  css: '.cb{position:relative;width:200px;height:130px;border-radius:16px;padding:2px;overflow:hidden}\n.cb::before{content:"";position:absolute;top:50%;left:50%;width:300px;height:300px;margin:-150px 0 0 -150px;background:conic-gradient(#7c5cff,#22d3ee,#ff5c8a,#7c5cff);animation:spin 4s linear infinite}\n.cbi{position:relative;display:grid;place-items:center;height:100%;border-radius:14px;background:#12121e;color:#e8e8f5;font:600 16px "Space Grotesk",sans-serif}\n@keyframes spin{to{transform:rotate(1turn)}}'
},

{ id: 'spotlight-card', title: 'Cursor Spotlight', cat: 'cards', tags: ['js', 'hover'],
  html: '<div class="sp"><b>Spotlight</b><p>Move your cursor across the card.</p></div>',
  css: '.sp{position:relative;width:210px;padding:24px;border-radius:16px;background:#12121e;border:1px solid rgba(160,160,210,.2);color:#e8e8f5;overflow:hidden;cursor:crosshair}\n.sp::before{content:"";position:absolute;inset:0;background:radial-gradient(220px circle at var(--x,50%) var(--y,50%),rgba(124,92,255,.45),transparent 70%);opacity:0;transition:opacity .3s}\n.sp:hover::before{opacity:1}\n.sp b{position:relative;font:700 18px "Space Grotesk",sans-serif}\n.sp p{position:relative;margin:8px 0 0;font:400 13px "Space Grotesk",sans-serif;color:#9a9ab0}',
  js: 'var c=root.querySelector(".sp");\nc.addEventListener("mousemove",function(e){var r=c.getBoundingClientRect();c.style.setProperty("--x",(e.clientX-r.left)+"px");c.style.setProperty("--y",(e.clientY-r.top)+"px");});'
},

{ id: 'holo-card', title: 'Holographic Foil', cat: 'cards', tags: ['js', 'shine'],
  html: '<div class="ho"><span class="foil"></span><b>HOLO</b></div>',
  css: '.ho{position:relative;width:150px;height:200px;border-radius:14px;background:linear-gradient(150deg,#2a1a4d,#131327);display:grid;place-items:center;overflow:hidden;border:1px solid rgba(255,255,255,.16);transition:transform .2s}\n.ho b{position:relative;z-index:2;font:700 22px "Space Grotesk",sans-serif;color:#fff;letter-spacing:.15em}\n.foil{position:absolute;inset:-40%;background:conic-gradient(from 0deg,#ff5c8a,#ffd479,#22d3ee,#7c5cff,#ff5c8a);opacity:.55;mix-blend-mode:color-dodge;filter:blur(14px);transition:transform .2s}',
  js: 'var c=root.querySelector(".ho"),f=root.querySelector(".foil");\nc.addEventListener("mousemove",function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform="perspective(700px) rotateY("+x*22+"deg) rotateX("+(-y*22)+"deg)";f.style.transform="translate("+x*60+"px,"+y*60+"px) rotate("+x*90+"deg)";});\nc.addEventListener("mouseleave",function(){c.style.transform="";f.style.transform="";});'
},

{ id: 'accordion-panels', title: 'Expanding Panels', cat: 'cards', tags: ['hover', 'flex'],
  html: '<div class="ep"><i style="--c:#7c5cff"><b>01</b></i><i style="--c:#a855f7"><b>02</b></i><i style="--c:#22d3ee"><b>03</b></i><i style="--c:#ff5c8a"><b>04</b></i></div>',
  css: '.ep{display:flex;gap:6px;height:150px}\n.ep i{flex:1;border-radius:12px;background:var(--c);display:grid;place-items:end center;padding-bottom:12px;cursor:pointer;transition:flex .5s cubic-bezier(.65,0,.35,1),filter .3s;filter:saturate(.6) brightness(.75)}\n.ep i:hover{flex:3.2;filter:none}\n.ep b{font:700 16px "JetBrains Mono",monospace;color:#fff}'
},

{ id: 'stack-fan', title: 'Fanning Card Stack', cat: 'cards', tags: ['hover', '3d'],
  html: '<div class="st"><i class="c1"></i><i class="c2"></i><i class="c3"></i></div>',
  css: '.st{position:relative;width:130px;height:170px;cursor:pointer}\n.st i{position:absolute;inset:0;border-radius:14px;border:1px solid rgba(255,255,255,.2);transition:transform .55s cubic-bezier(.2,1,.3,1),box-shadow .4s;transform-origin:bottom center}\n.c1{background:linear-gradient(150deg,#ff5c8a,#c02c58)}\n.c2{background:linear-gradient(150deg,#7c5cff,#4c2fd6)}\n.c3{background:linear-gradient(150deg,#22d3ee,#0e8fa3)}\n.st:hover .c1{transform:rotate(-18deg) translate(-38px,-8px)}\n.st:hover .c3{transform:rotate(18deg) translate(38px,-8px)}\n.st:hover .c2{transform:translateY(-14px) scale(1.04);box-shadow:0 22px 40px -18px #000}'
},

{ id: 'peel-corner', title: 'Peeling Corner', cat: 'cards', tags: ['hover', 'css'],
  html: '<div class="pc"><span>Peek the corner</span><i></i></div>',
  css: '.pc{position:relative;width:200px;height:140px;border-radius:14px;background:linear-gradient(135deg,#1f1f38,#2c2350);display:grid;place-items:center;overflow:hidden;color:#e8e8f5;font:600 15px "Space Grotesk",sans-serif;cursor:pointer}\n.pc i{position:absolute;top:0;right:0;width:0;height:0;border-style:solid;border-width:0 0 0 0;border-color:transparent transparent transparent transparent;background:linear-gradient(225deg,#22d3ee 50%,rgba(0,0,0,.4) 50%);width:0;height:0;transition:width .45s cubic-bezier(.65,0,.35,1),height .45s cubic-bezier(.65,0,.35,1);border-bottom-left-radius:12px}\n.pc:hover i{width:66px;height:66px}'
},

{ id: 'book-open', title: 'Opening Book', cat: 'cards', tags: ['3d', 'hover'],
  html: '<div class="bk"><div class="cover">Open me</div><div class="page">Inside &#128214;</div></div>',
  css: '.bk{position:relative;width:130px;height:175px;perspective:1000px;cursor:pointer}\n.page{position:absolute;inset:0;border-radius:6px 12px 12px 6px;background:#f3f0ea;color:#2a2a3a;display:grid;place-items:center;font:600 15px "Space Grotesk",sans-serif}\n.cover{position:absolute;inset:0;border-radius:6px 12px 12px 6px;background:linear-gradient(120deg,#7c5cff,#4c2fd6);color:#fff;display:grid;place-items:center;font:700 16px "Space Grotesk",sans-serif;transform-origin:left center;transition:transform .8s cubic-bezier(.65,0,.35,1);box-shadow:6px 6px 22px -8px rgba(0,0,0,.8)}\n.bk:hover .cover{transform:rotateY(-155deg)}'
},

{ id: 'grid-spotlight', title: 'Grid Tile Wave', cat: 'cards', tags: ['css', 'grid'],
  html: '<div class="gw"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>',
  css: '.gw{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;width:180px}\n.gw i{aspect-ratio:1;border-radius:7px;background:#7c5cff;animation:gww 2.4s ease-in-out infinite}\n.gw i:nth-child(1),.gw i:nth-child(6),.gw i:nth-child(11),.gw i:nth-child(16){animation-delay:.15s}\n.gw i:nth-child(2),.gw i:nth-child(5),.gw i:nth-child(7),.gw i:nth-child(10),.gw i:nth-child(12),.gw i:nth-child(15){animation-delay:.3s}\n.gw i:nth-child(3),.gw i:nth-child(8),.gw i:nth-child(9),.gw i:nth-child(14){animation-delay:.45s}\n.gw i:nth-child(4),.gw i:nth-child(13){animation-delay:.6s}\n@keyframes gww{0%,100%{transform:scale(.55);background:#22d3ee;border-radius:50%}50%{transform:scale(1);background:#7c5cff;border-radius:7px}}'
},

{ id: 'blob-morph-card', title: 'Morphing Blob Card', cat: 'cards', tags: ['css', 'blob'],
  html: '<div class="bm"><span>blob</span></div>',
  css: '.bm{display:grid;place-items:center;width:160px;height:160px;background:linear-gradient(140deg,#7c5cff,#ff5c8a);color:#fff;font:700 20px "Space Grotesk",sans-serif;border-radius:60% 40% 55% 45%/45% 55% 40% 60%;animation:morph 8s ease-in-out infinite;box-shadow:0 20px 50px -22px #7c5cff}\n@keyframes morph{0%,100%{border-radius:60% 40% 55% 45%/45% 55% 40% 60%;transform:rotate(0)}33%{border-radius:40% 60% 35% 65%/60% 35% 65% 40%;transform:rotate(6deg)}66%{border-radius:52% 48% 62% 38%/38% 62% 48% 52%;transform:rotate(-6deg)}}'
},

{ id: 'lift-shadow', title: 'Lift &amp; Long Shadow', cat: 'cards', tags: ['hover', 'shadow'],
  html: '<div class="lf"><b>Hover</b><p>Soft lift with a colour-matched shadow.</p></div>',
  css: '.lf{width:200px;padding:22px;border-radius:16px;background:#16162a;border:1px solid rgba(160,160,210,.18);color:#e8e8f5;cursor:pointer;transition:transform .4s cubic-bezier(.2,1,.3,1),box-shadow .4s,border-color .4s}\n.lf b{font:700 18px "Space Grotesk",sans-serif}\n.lf p{margin:8px 0 0;font:400 13px "Space Grotesk",sans-serif;color:#9a9ab0}\n.lf:hover{transform:translateY(-12px) rotate(-1.5deg);border-color:#7c5cff;box-shadow:0 30px 45px -22px #7c5cff,0 0 0 1px rgba(124,92,255,.4)}'
},
{ id: 'ticket-perf', title: 'Concert Ticket', cat: 'cards', tags: ['hover', 'ui'],
  html: '<div class="tkt2"><div class="info"><em>LOOP</em><b>FEST 2026</b><span>Sat 21:00 &#183; Gate B</span></div><i class="div2"></i><div class="stub2"><em>ADMIT</em><b>ONE</b><i class="code"></i></div></div>',
  css: '.tkt2{display:flex;width:262px;height:116px;border-radius:15px;overflow:hidden;background:linear-gradient(115deg,#35207a,#7c5cff 55%,#a855f7);color:#fff;box-shadow:0 16px 34px -18px rgba(0,0,0,.85);cursor:pointer;transition:transform .35s cubic-bezier(.2,1,.3,1),box-shadow .35s}\n.tkt2:hover{transform:translateY(-6px) rotate(-1.4deg);box-shadow:0 26px 48px -20px rgba(0,0,0,.95)}\n.info{flex:1;display:flex;flex-direction:column;justify-content:center;gap:3px;padding:0 8px 0 20px;min-width:0}\n.info em{font:700 11px "JetBrains Mono",monospace;letter-spacing:.42em;color:#ffd479}\n.info b{font:700 22px "Space Grotesk",sans-serif;letter-spacing:.05em;white-space:nowrap}\n.info span{font:500 11.5px;opacity:.85}\n.div2{width:2px;align-self:stretch;margin:11px 0;background:repeating-linear-gradient(#fff 0 3px,transparent 3px 7px);opacity:.75}\n.stub2{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;width:86px;padding:0 8px}\n.stub2 em{font:700 9px "JetBrains Mono",monospace;letter-spacing:.22em;opacity:.9}\n.stub2 b{font:700 24px "Space Grotesk",sans-serif}\n.code{width:52px;height:15px;border-radius:2px;background:repeating-linear-gradient(90deg,#fff 0 2px,transparent 2px 4px,#fff 4px 6px,transparent 6px 9px);opacity:.9}\n.tkt2::after{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(105deg,transparent,rgba(255,255,255,.28),transparent);transform:skewX(-18deg);transition:left .7s ease}\n.tkt2:hover::after{left:130%}\n.tkt2{position:relative}'
},
{ id: 'profile-card', title: 'Profile Card', cat: 'cards', tags: ['js', 'ui'],
  html: '<div class="pf3"><div class="top"><i class="av3">AK<i class="dot3"></i></i><div class="nm"><b>Ada Kim</b><span>Product designer</span></div></div><p class="bio3">Small experiments, big interfaces. Currently shipping motion for the web.</p><div class="act3"><button class="fol3" aria-pressed="false">Follow</button><button class="msg3">Message</button></div></div>',
  css: '.pf3{position:relative;width:238px;padding:16px;border-radius:18px;overflow:hidden;border:1px solid rgba(160,160,210,.16);background:linear-gradient(160deg,#19192c,#10101f);box-shadow:0 18px 36px -20px #000;transition:transform .3s cubic-bezier(.2,1,.3,1),border-color .3s;display:grid;gap:11px}\n.pf3::before{content:"";position:absolute;top:-70px;right:-50px;width:190px;height:130px;background:radial-gradient(circle,rgba(124,92,255,.55),rgba(34,211,238,.25) 60%,transparent 75%);opacity:0;transition:opacity .4s;pointer-events:none}\n.pf3:hover{transform:translateY(-5px);border-color:rgba(124,92,255,.55)}\n.pf3:hover::before{opacity:1}\n.top{display:flex;align-items:center;gap:12px}\n.av3{position:relative;display:grid;place-items:center;width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,#22d3ee,#7c5cff);color:#fff;font:700 17px "Space Grotesk",sans-serif;font-style:normal;box-shadow:0 0 0 3px #19192c,0 8px 18px -8px rgba(124,92,255,.9)}\n.dot3{position:absolute;right:-1px;bottom:-1px;width:14px;height:14px;border-radius:50%;background:#22c55e;border:3px solid #19192c;box-shadow:0 0 0 0 rgba(34,197,94,.55);animation:onl3 2.2s infinite}\n.nm{display:grid}\n.nm b{font:700 16px "Space Grotesk",sans-serif;color:#ececf5}\n.nm span{font:400 12px;color:#9a9ab0}\n.bio3{margin:0;font:400 12.5px;line-height:1.5;color:#b9b9cf}\n.act3{display:flex;gap:8px}\n.act3 button{flex:1;padding:9px 10px;border-radius:11px;font:600 13px "Space Grotesk",sans-serif;cursor:pointer;transition:all .25s}\n.act3 .fol3{border:0;background:#7c5cff;color:#fff}\n.act3 .fol3:hover{filter:brightness(1.15)}\n.act3 .fol3[aria-pressed="true"]{background:rgba(34,197,94,.16);color:#4ade80}\n.act3 .fol3[aria-pressed="true"]::after{content:" \u2713"}\n.act3 .msg3{background:rgba(140,140,190,.13);color:#e8e8f5}\n.act3 .msg3:hover{background:rgba(140,140,190,.24);border-color:#7c5cff}\n.msg3{border:1px solid rgba(160,160,210,.25)}\n@keyframes onl3{70%{box-shadow:0 0 0 8px rgba(34,197,94,0)}100%{box-shadow:0 0 0 0 rgba(34,197,94,0)}}',
  js: 'var f=root.querySelector(".fol3");\nf.addEventListener("click",function(){var on=f.getAttribute("aria-pressed")==="true";f.setAttribute("aria-pressed",String(!on));f.textContent=on?"Follow":"Following";});'
},

{ id: 'icon-flip', title: 'Icon Flip Card', cat: 'cards', tags: ['css', 'hover'],
  html: '<div class="flipc4"><div class="fc4"><div class="front4"><svg viewBox="0 0 24 24" fill="none" stroke="#7c5cff" stroke-width="1.6"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div><div class="back4">&#9733; Layers</div></div></div>',
  css: '\n.flipc4{width:170px;height:120px;perspective:800px}\n.fc4{position:relative;width:100%;height:100%;transition:transform .8s cubic-bezier(.3,1.1,.3,1);transform-style:preserve-3d}\n.flipc4:hover .fc4{transform:rotateY(180deg)}\n.front4,.back4{position:absolute;inset:0;border-radius:16px;display:grid;place-items:center;backface-visibility:hidden;box-shadow:0 18px 30px -18px #000}\n.front4{background:linear-gradient(150deg,#17172c,#1e1440);border:1px solid rgba(124,92,255,.3)}\n.front4 svg{width:44px;height:44px}\n.back4{background:linear-gradient(150deg,#7c5cff,#a855f7);color:#fff;font:700 15px \'Space Grotesk\',sans-serif;transform:rotateY(180deg)}\n'
}
,

{ id: 'card-doors', title: 'Door Reveal', cat: 'cards', tags: ['css', 'hover'],
  html: '<div class="doors4"><i></i><b></b></div>',
  css: '\n.doors4{position:relative;width:200px;height:130px;cursor:pointer}\n.doors4 i,.doors4 b{position:absolute;top:0;bottom:0;width:50%;background:linear-gradient(#8a7bff,#5b3fd6);border:3px solid #1a1440;transition:transform .5s cubic-bezier(.6,.05,.3,1)}\n.doors4 i{left:0;border-radius:12px 0 0 12px;transform-origin:left}\n.doors4 b{right:0;border-radius:0 12px 12px 0;transform-origin:right}\n.doors4::after{content:"&#128273;";position:absolute;inset:0;display:grid;place-items:center;font-size:34px;opacity:0;transition:opacity .3s .15s}\n.doors4:hover i{transform:perspective(500px) rotateY(-55deg)}\n.doors4:hover b{transform:perspective(500px) rotateY(55deg)}\n.doors4:hover::after{opacity:1}\n'
}
,

{ id: 'card-scan', title: 'Scanline Card', cat: 'cards', tags: ['css', 'scan'],
  html: '<div class="sc4"><div class="ring4"></div><p>ACCESS</p><b></b></div>',
  css: '\n.sc4{position:relative;width:200px;height:120px;border-radius:16px;border:1px solid rgba(34,211,238,.3);background:linear-gradient(160deg,#071620,#0a0f1c 60%);overflow:hidden;display:grid;place-items:center;color:#9ae6ff;font:700 14px \'Space Grotesk\',sans-serif;letter-spacing:.3em}\n.sc4 b{position:absolute;left:0;right:0;height:2px;top:-2px;background:linear-gradient(90deg,transparent,#22d3ee,transparent);box-shadow:0 0 14px #22d3ee;animation:sc4 .8s linear infinite}\n.sc4 .ring4{position:absolute;right:12px;top:12px;width:22px;height:22px;border:2px solid #22d3ee;border-top-color:transparent;border-radius:50%;animation:sc4r 1.2s linear infinite}\n.sc4 p{margin:0;text-shadow:0 0 12px rgba(34,211,238,.7)}\n@keyframes sc4{0%{top:-4px;opacity:0}15%{opacity:1}85%{opacity:1}100%{top:120px;opacity:0}}\n@keyframes sc4r{to{transform:rotate(1turn)}}\n'
}
,

{ id: 'card-swap', title: 'Swap Info', cat: 'cards', tags: ['js', 'hover'],
  html: '<div class="sw4"><div class="s4front"><h4>Design</h4><p>&#9998;</p></div><div class="s4back"><p>Wireframe, polish and prototype. Everything spins up fast.</p></div></div>',
  css: '\n.sw4{position:relative;width:200px;height:150px;perspective:700px}\n.s4front,.s4back{position:absolute;inset:0;border-radius:16px;padding:18px;transition:opacity .45s ease,transform .45s ease}\n.s4front{background:linear-gradient(150deg,#1a1a32,#251b4a);display:grid;place-items:center;border:1px solid rgba(168,85,247,.3);color:#fff;text-align:center}\n.s4front h4{margin:0 0 6px;font:700 16px \'Space Grotesk\',sans-serif}\n.s4front p{margin:0;font-size:20px}\n.s4back{background:linear-gradient(150deg,#7c5cff,#a855f7);color:#fff;display:grid;place-items:center;opacity:0;transform:translateY(20px) scale(.9)}\n.s4back p{margin:0;font:600 13px \'Space Grotesk\',sans-serif;line-height:1.5}\n.sw4:hover .s4front{opacity:0;transform:translateY(-20px) scale(.9)}\n.sw4:hover .s4back{opacity:1;transform:none}\n'
}
,

{ id: 'cover-pan', title: 'Panning Cover', cat: 'cards', tags: ['css', 'hover'],
  html: '<div class="cp4"><h4>Open Studio</h4></div>',
  css: '\n.cp4{position:relative;width:210px;height:150px;border-radius:16px;overflow:hidden;background:linear-gradient(200deg,rgba(34,211,238,.25),rgba(124,92,255,.35)) ,radial-gradient(circle at 70% 30%,#ff5c8a 0 12px,transparent 13px),radial-gradient(circle at 40% 70%,#7c5cff 0 18px,transparent 19px),#0b0b14;background-size:100% 100%,90px 90px,90px 90px,100% 100%;background-position:0 0,0 0,0 0,0 0;transition:background-position 2s ease}\n.cp4 h4{position:absolute;left:0;right:0;bottom:0;margin:0;padding:34px 14px 12px;background:linear-gradient(transparent,#000 70%);color:#fff;font:700 15px \'Space Grotesk\',sans-serif}\n.cp4:hover{background-position:-20px -30px,-60px -40px,-40px -30px,-20px -30px}\n'
}
,

{ id: 'corner-bracket', title: 'Corner Bracket Frame', cat: 'cards', tags: ['css', 'hover'],
  html: '<div class="cb4"><h4>Hover me</h4></div>',
  css: '\n.cb4{position:relative;width:190px;height:120px;border-radius:8px;display:grid;place-items:center;background:rgba(140,140,190,.06)}\n.cb4::before,.cb4::after{content:"";position:absolute;width:22px;height:22px;border:2px solid #22d3ee;transition:all .3s}\n.cb4::before{top:8px;left:8px;border-right:0;border-bottom:0}\n.cb4::after{bottom:8px;right:8px;border-left:0;border-top:0}\n.cb4 h4{margin:0;font:700 14px \'Space Grotesk\',sans-serif;color:#e8e8f5}\n.cb4:hover::before{top:-2px;left:-2px;width:34px;height:34px}\n.cb4:hover::after{bottom:-2px;right:-2px;width:34px;height:34px}\n.cb4:hover{background:rgba(34,211,238,.08)}\n'
}
,

{ id: 'text-reveal-card', title: 'Caption Wipe', cat: 'cards', tags: ['css', 'hover'],
  html: '<div class="tc4"><div class="art4"></div><p>Ship the vision &#8599;</p></div>',
  css: '\n.tc4{position:relative;width:210px;height:130px;overflow:hidden;border-radius:16px;box-shadow:0 18px 34px -20px #000;cursor:pointer}\n.art4{position:absolute;inset:0;background:conic-gradient(from 180deg,#7c5cff,#ff5c8a,#22d3ee,#7c5cff);animation:hue4 6s linear infinite;opacity:.5;filter:saturate(1.4)}\n.art4::after{content:"";position:absolute;inset:0;background:linear-gradient(135deg,#1a1a32 0 42%,transparent 42%)}\n.tc4 p{position:absolute;left:0;right:0;bottom:0;margin:0;padding:8px 12px;color:#fff;font:600 13px \'Space Grotesk\',sans-serif;background:rgba(10,10,20,.55);backdrop-filter:blur(4px);transform:translateY(100%);transition:transform .4s ease}\n.tc4:hover p{transform:translateY(0)}\n@keyframes hue4{to{filter:hue-rotate(360deg) saturate(1.4)}}\n'
}

  );
})();
