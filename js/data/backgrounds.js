/* Category: Backgrounds & Ambience */
(function () {
  var L = (window.MOTION_LAB = window.MOTION_LAB || []);
  L.push(

{ id: 'gradient-mesh', title: 'Animated Mesh Gradient', cat: 'backgrounds', tags: ['gradient', 'css'],
  html: '<div class="mesh"></div>',
  css: '.mesh{width:100%;height:210px;background:linear-gradient(-45deg,#7c5cff,#ff5c8a,#22d3ee,#ffd479);background-size:400% 400%;animation:meshmove 12s ease infinite}\n@keyframes meshmove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}'
},

{ id: 'floating-bubbles', title: 'Floating Bubbles', cat: 'backgrounds', tags: ['css', 'particles'],
  html: '<div class="bb"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>',
  css: '.bb{position:relative;width:100%;height:210px;overflow:hidden;background:linear-gradient(#0b1020,#161a3a)}\n.bb i{position:absolute;bottom:-60px;border-radius:50%;background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.7),rgba(124,92,255,.25));animation:rise linear infinite}\n.bb i:nth-child(1){left:8%;width:22px;height:22px;animation-duration:7s}\n.bb i:nth-child(2){left:20%;width:12px;height:12px;animation-duration:5s;animation-delay:1s}\n.bb i:nth-child(3){left:34%;width:30px;height:30px;animation-duration:9s;animation-delay:.5s}\n.bb i:nth-child(4){left:48%;width:16px;height:16px;animation-duration:6s;animation-delay:2s}\n.bb i:nth-child(5){left:62%;width:26px;height:26px;animation-duration:8s;animation-delay:.2s}\n.bb i:nth-child(6){left:74%;width:10px;height:10px;animation-duration:4.5s;animation-delay:1.5s}\n.bb i:nth-child(7){left:86%;width:20px;height:20px;animation-duration:7.5s;animation-delay:2.5s}\n.bb i:nth-child(8){left:94%;width:14px;height:14px;animation-duration:6.5s;animation-delay:3s}\n@keyframes rise{0%{transform:translateY(0) scale(.6);opacity:0}12%{opacity:1}100%{transform:translateY(-270px) scale(1.1);opacity:0}}'
},

{ id: 'starfield', title: 'CSS Starfield', cat: 'backgrounds', tags: ['css', 'space'],
  html: '<div class="sf2"><i class="s1"></i><i class="s2"></i><i class="s3"></i></div>',
  css: '.sf2{position:relative;width:100%;height:210px;overflow:hidden;background:radial-gradient(ellipse at 50% 100%,#241b47,#05050f 70%)}\n.sf2 i{position:absolute;top:0;left:0;width:2px;height:2px;border-radius:50%;background:transparent}\n.s1{box-shadow:14px 20px #fff,60px 90px #fff,120px 40px #fff,190px 150px #fff,240px 30px #fff,300px 110px #fff,60px 170px #fff,270px 190px #fff;animation:starfall 6s linear infinite}\n.s2{width:3px;height:3px;box-shadow:40px 60px #cfe8ff,150px 120px #cfe8ff,220px 10px #cfe8ff,90px 200px #cfe8ff,310px 80px #cfe8ff;animation:starfall 9s linear infinite}\n.s3{width:1px;height:1px;box-shadow:20px 140px #fff,110px 70px #fff,200px 180px #fff,260px 130px #fff,330px 40px #fff,20px 40px #fff;animation:starfall 13s linear infinite}\n@keyframes starfall{to{transform:translateY(210px)}}'
},

{ id: 'aurora', title: 'Aurora Curtains', cat: 'backgrounds', tags: ['blur', 'css'],
  html: '<div class="au"><i></i><i></i><i></i></div>',
  css: '.au{position:relative;width:100%;height:210px;overflow:hidden;background:#04040d}\n.au i{position:absolute;width:60%;height:180%;top:-40%;filter:blur(42px);opacity:.6;border-radius:50%}\n.au i:nth-child(1){left:-10%;background:#7c5cff;animation:aur 9s ease-in-out infinite}\n.au i:nth-child(2){left:30%;background:#22d3ee;animation:aur 11s ease-in-out infinite reverse}\n.au i:nth-child(3){left:60%;background:#34d399;animation:aur 13s ease-in-out infinite}\n@keyframes aur{0%,100%{transform:translateX(-12%) scaleY(.9) skewX(-8deg)}50%{transform:translateX(18%) scaleY(1.2) skewX(10deg)}}'
},

{ id: 'synthwave-grid', title: 'Synthwave Grid', cat: 'backgrounds', tags: ['3d', 'retro'],
  html: '<div class="sw"><div class="sun"></div><div class="floor"></div></div>',
  css: '.sw{position:relative;width:100%;height:210px;overflow:hidden;background:linear-gradient(#150a2e 0%,#3b1055 55%,#7b1e5c 100%);perspective:220px}\n.sun{position:absolute;top:34px;left:50%;width:110px;height:110px;margin-left:-55px;border-radius:50%;background:linear-gradient(#ffd479,#ff5c8a 60%,#7c1e6b);box-shadow:0 0 60px rgba(255,92,138,.7)}\n.floor{position:absolute;left:-50%;right:-50%;bottom:-40px;height:170px;transform:rotateX(72deg);background-image:linear-gradient(rgba(255,92,220,.85) 2px,transparent 2px),linear-gradient(90deg,rgba(255,92,220,.85) 2px,transparent 2px);background-size:40px 40px;animation:gridrun 1.6s linear infinite}\n@keyframes gridrun{to{background-position:0 40px}}'
},

{ id: 'particle-net', title: 'Particle Network', cat: 'backgrounds', tags: ['canvas', 'js'],
  html: '<canvas class="pn"></canvas>',
  css: '.pn{display:block;width:100%;height:210px;background:#07071a}',
  js: 'var cv=root.querySelector(".pn"),ctx=cv.getContext&&cv.getContext("2d"),ps=[],W=0,H=0;\nif(!ctx)return;\nfunction size(){var d=window.devicePixelRatio||1;W=cv.clientWidth;H=210;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);}\nsize();\nfor(var i=0;i<46;i++){ps.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.6,vy:(Math.random()-.5)*.6});}\napi.raf(function(){if(cv.clientWidth!==W)size();ctx.clearRect(0,0,W,H);for(var i=0;i<ps.length;i++){var p=ps[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,1.8,0,6.283);ctx.fillStyle="#7c5cff";ctx.fill();for(var j=i+1;j<ps.length;j++){var q=ps[j],dx=p.x-q.x,dy=p.y-q.y,d2=dx*dx+dy*dy;if(d2<7000){ctx.globalAlpha=1-d2/7000;ctx.strokeStyle="#22d3ee";ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();ctx.globalAlpha=1;}}}});'
},

{ id: 'svg-waves', title: 'Layered SVG Waves', cat: 'backgrounds', tags: ['svg', 'css'],
  html: '<div class="wvz"><svg viewBox="0 0 1440 200" preserveAspectRatio="none"><path class="w1" d="M0,120 C240,180 480,60 720,110 C960,160 1200,80 1440,120 L1440,200 L0,200 Z"/><path class="w2" d="M0,140 C240,90 480,180 720,130 C960,80 1200,170 1440,130 L1440,200 L0,200 Z"/><path class="w3" d="M0,160 C240,200 480,120 720,160 C960,200 1200,130 1440,165 L1440,200 L0,200 Z"/></svg></div>',
  css: '.wvz{position:relative;width:100%;height:210px;overflow:hidden;background:linear-gradient(#0b1020,#141a3d)}\n.wvz svg{position:absolute;bottom:0;left:0;width:200%;height:150px}\n.w1{fill:rgba(124,92,255,.55);animation:wslide 7s linear infinite}\n.w2{fill:rgba(34,211,238,.45);animation:wslide 11s linear infinite reverse}\n.w3{fill:rgba(255,92,138,.4);animation:wslide 15s linear infinite}\n@keyframes wslide{to{transform:translateX(-50%)}}'
},

{ id: 'confetti-fall', title: 'Confetti Rain', cat: 'backgrounds', tags: ['css', 'fun'],
  html: '<div class="cf"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>',
  css: '.cf{position:relative;width:100%;height:210px;overflow:hidden;background:#0d0d1c}\n.cf i{position:absolute;top:-20px;width:9px;height:14px;border-radius:2px;animation:fall linear infinite}\n.cf i:nth-child(1){left:5%;background:#7c5cff;animation-duration:3.2s}\n.cf i:nth-child(2){left:14%;background:#22d3ee;animation-duration:4.1s;animation-delay:.4s}\n.cf i:nth-child(3){left:23%;background:#ff5c8a;animation-duration:2.8s;animation-delay:.9s}\n.cf i:nth-child(4){left:32%;background:#ffd479;animation-duration:3.7s;animation-delay:.2s}\n.cf i:nth-child(5){left:41%;background:#34d399;animation-duration:4.4s;animation-delay:1.2s}\n.cf i:nth-child(6){left:50%;background:#7c5cff;animation-duration:3s;animation-delay:.7s}\n.cf i:nth-child(7){left:59%;background:#22d3ee;animation-duration:3.9s;animation-delay:1.6s}\n.cf i:nth-child(8){left:68%;background:#ff5c8a;animation-duration:3.4s;animation-delay:.1s}\n.cf i:nth-child(9){left:77%;background:#ffd479;animation-duration:4.6s;animation-delay:1s}\n.cf i:nth-child(10){left:86%;background:#34d399;animation-duration:2.9s;animation-delay:2s}\n.cf i:nth-child(11){left:93%;background:#7c5cff;animation-duration:3.6s;animation-delay:.5s}\n.cf i:nth-child(12){left:98%;background:#22d3ee;animation-duration:4.2s;animation-delay:1.4s}\n@keyframes fall{0%{transform:translateY(0) rotate(0) scale(1);opacity:1}100%{transform:translateY(240px) rotate(720deg) scale(.8);opacity:.2}}'
},

{ id: 'crt-scanlines', title: 'CRT Scanlines', cat: 'backgrounds', tags: ['retro', 'css'],
  html: '<div class="crt"><span>SYSTEM READY_</span></div>',
  css: '.crt{position:relative;display:grid;place-items:center;width:100%;height:210px;overflow:hidden;background:radial-gradient(ellipse at center,#0d2b16,#030a05 80%)}\n.crt span{font:700 20px "JetBrains Mono",monospace;color:#4ade80;text-shadow:0 0 10px #4ade80;animation:crtflick 3s infinite}\n.crt::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(transparent 0 2px,rgba(0,0,0,.45) 2px 4px);pointer-events:none}\n.crt::after{content:"";position:absolute;left:0;right:0;height:38%;background:linear-gradient(rgba(74,222,128,.09),transparent);animation:scan 4s linear infinite}\n@keyframes scan{0%{top:-40%}100%{top:100%}}\n@keyframes crtflick{0%,96%,100%{opacity:1}97%{opacity:.5}98%{opacity:.85}}'
},

{ id: 'matrix-rain', title: 'Matrix Rain', cat: 'backgrounds', tags: ['canvas', 'js'],
  html: '<canvas class="mx"></canvas>',
  css: '.mx{display:block;width:100%;height:210px;background:#000}',
  js: 'var cv=root.querySelector(".mx"),ctx=cv.getContext&&cv.getContext("2d"),cols=[],W=0,H=210,fs=14,t=0;\nif(!ctx)return;\nfunction size(){var d=window.devicePixelRatio||1;W=cv.clientWidth;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);cols=[];for(var i=0;i<Math.floor(W/fs);i++)cols.push(Math.random()*-20);}\nsize();\nvar glyphs="01\u30A2\u30AB\u30B5\u30BF\u30CA\u30CF\u30DE\u30E4\u30E9\u30EF\u30F3ABCDEF";\napi.raf(function(){if(cv.clientWidth!==W)size();t++;if(t%2)return;ctx.fillStyle="rgba(0,0,0,.09)";ctx.fillRect(0,0,W,H);ctx.font=fs+"px monospace";for(var i=0;i<cols.length;i++){var ch=glyphs[Math.floor(Math.random()*glyphs.length)],y=cols[i]*fs;ctx.fillStyle=Math.random()>.96?"#d6ffe4":"#22c55e";ctx.fillText(ch,i*fs,y);if(y>H&&Math.random()>.975)cols[i]=0;cols[i]++;}});'
},

{ id: 'lava-lamp', title: 'Lava Lamp Blobs', cat: 'backgrounds', tags: ['blur', 'css'],
  html: '<div class="lv"><i></i><i></i><i></i><i></i></div>',
  css: '.lv{position:relative;width:100%;height:210px;overflow:hidden;background:#120a20;filter:contrast(18) blur(0)}\n.lv i{position:absolute;border-radius:50%;background:#ff5c8a;filter:blur(16px)}\n.lv i:nth-child(1){width:70px;height:70px;left:12%;animation:lv1 8s ease-in-out infinite}\n.lv i:nth-child(2){width:52px;height:52px;left:38%;background:#7c5cff;animation:lv2 11s ease-in-out infinite}\n.lv i:nth-child(3){width:84px;height:84px;left:62%;background:#ffd479;animation:lv1 9.5s ease-in-out infinite reverse}\n.lv i:nth-child(4){width:44px;height:44px;left:82%;background:#22d3ee;animation:lv2 7s ease-in-out infinite}\n@keyframes lv1{0%,100%{top:150px;transform:scale(1)}50%{top:-20px;transform:scale(1.35)}}\n@keyframes lv2{0%,100%{top:-10px;transform:scale(1.2)}50%{top:140px;transform:scale(.85)}}'
},

{ id: 'conic-rays', title: 'Rotating Light Rays', cat: 'backgrounds', tags: ['css', 'gradient'],
  html: '<div class="ry"><span></span></div>',
  css: '.ry{position:relative;width:100%;height:210px;overflow:hidden;background:#08081a;display:grid;place-items:center}\n.ry span{position:absolute;width:420px;height:420px;background:repeating-conic-gradient(from 0deg,rgba(124,92,255,.55) 0deg 8deg,transparent 8deg 22deg);animation:spin 18s linear infinite;-webkit-mask:radial-gradient(circle,#000 25%,transparent 72%);mask:radial-gradient(circle,#000 25%,transparent 72%)}\n.ry::after{content:"";width:70px;height:70px;border-radius:50%;background:radial-gradient(circle,#fff,#7c5cff 55%,transparent 70%);filter:blur(2px);animation:corepulse 3s ease-in-out infinite}\n@keyframes spin{to{transform:rotate(1turn)}}\n@keyframes corepulse{50%{transform:scale(1.2);filter:blur(5px)}}'
}

  );
})();
