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
}

  );
})();
