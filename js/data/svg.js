/* Category: SVG & Line Art */
(function () {
  var L = (window.MOTION_LAB = window.MOTION_LAB || []);
  L.push(

{ id: 'stroke-draw', title: 'Self-Drawing Path', cat: 'svg', tags: ['svg', 'stroke'],
  html: '<svg class="sd" viewBox="0 0 200 100"><path d="M10,80 C40,10 70,10 100,50 C130,90 160,90 190,20"/></svg>',
  css: '.sd{width:230px}\n.sd path{fill:none;stroke:#7c5cff;stroke-width:4;stroke-linecap:round;stroke-dasharray:300;stroke-dashoffset:300;filter:drop-shadow(0 0 6px rgba(124,92,255,.7));animation:draw 3s ease-in-out infinite}\n@keyframes draw{0%{stroke-dashoffset:300}45%,60%{stroke-dashoffset:0}100%{stroke-dashoffset:-300}}'
},

{ id: 'check-success', title: 'Success Check Pop', cat: 'svg', tags: ['svg', 'feedback'],
  html: '<svg class="ck" viewBox="0 0 80 80"><circle cx="40" cy="40" r="34"/><polyline points="24,42 35,53 57,29"/></svg>',
  css: '.ck{width:110px}\n.ck circle{fill:none;stroke:#22c55e;stroke-width:5;stroke-dasharray:214;stroke-dashoffset:214;animation:ckc 2.6s ease-in-out infinite}\n.ck polyline{fill:none;stroke:#22c55e;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:60;stroke-dashoffset:60;animation:ckp 2.6s ease-in-out infinite}\n@keyframes ckc{0%{stroke-dashoffset:214}35%,88%{stroke-dashoffset:0}100%{stroke-dashoffset:214}}\n@keyframes ckp{0%,32%{stroke-dashoffset:60}55%,88%{stroke-dashoffset:0}100%{stroke-dashoffset:60}}'
},

{ id: 'progress-ring', title: 'Animated Progress Ring', cat: 'svg', tags: ['svg', 'js'],
  html: '<div class="pr2"><svg viewBox="0 0 120 120"><circle class="bgc" cx="60" cy="60" r="52"/><circle class="fg" cx="60" cy="60" r="52"/></svg><b>0%</b></div>',
  css: '.pr2{position:relative;width:150px;height:150px;display:grid;place-items:center}\n.pr2 svg{position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)}\n.bgc{fill:none;stroke:rgba(140,140,190,.22);stroke-width:10}\n.fg{fill:none;stroke:#7c5cff;stroke-width:10;stroke-linecap:round;stroke-dasharray:327;stroke-dashoffset:327;transition:stroke-dashoffset .4s linear;filter:drop-shadow(0 0 6px rgba(124,92,255,.7))}\n.pr2 b{font:700 28px "JetBrains Mono",monospace;color:#e8e8f5;font-variant-numeric:tabular-nums}',
  js: 'var fg=root.querySelector(".fg"),lab=root.querySelector("b"),p=0,dir=1;\napi.raf(function(){p+=dir*.6;if(p>100){p=100;dir=-1;}if(p<0){p=0;dir=1;}fg.style.strokeDashoffset=327-327*p/100;lab.textContent=Math.round(p)+"%";});'
},

{ id: 'dash-line', title: 'Travelling Dash Line', cat: 'svg', tags: ['svg', 'stroke'],
  html: '<svg class="dl" viewBox="0 0 240 60"><path class="base" d="M10,30 H230"/><path class="run" d="M10,30 H230"/></svg>',
  css: '.dl{width:250px}\n.dl path{fill:none;stroke-width:6;stroke-linecap:round}\n.base{stroke:rgba(140,140,190,.22)}\n.run{stroke:#22d3ee;stroke-dasharray:30 190;animation:dashrun 2s linear infinite;filter:drop-shadow(0 0 6px #22d3ee)}\n@keyframes dashrun{to{stroke-dashoffset:-220}}'
},

{ id: 'hex-logo', title: 'Hexagon Logo Build', cat: 'svg', tags: ['svg', 'logo'],
  html: '<svg class="hx" viewBox="0 0 120 120"><polygon points="60,8 111,36 111,84 60,112 9,84 9,36"/><polygon class="in" points="60,32 88,48 88,72 60,88 32,72 32,48"/></svg>',
  css: '.hx{width:130px}\n.hx polygon{fill:none;stroke:#7c5cff;stroke-width:4;stroke-linejoin:round;stroke-dasharray:340;stroke-dashoffset:340;animation:hxd 3.4s ease-in-out infinite}\n.hx .in{stroke:#22d3ee;stroke-dasharray:180;stroke-dashoffset:180;animation:hxd2 3.4s ease-in-out infinite;transform-origin:center;animation-delay:.3s}\n@keyframes hxd{0%{stroke-dashoffset:340}40%,80%{stroke-dashoffset:0}100%{stroke-dashoffset:-340}}\n@keyframes hxd2{0%{stroke-dashoffset:180;transform:rotate(0)}40%,80%{stroke-dashoffset:0;transform:rotate(60deg)}100%{stroke-dashoffset:-180;transform:rotate(120deg)}}'
},

{ id: 'sine-wave', title: 'Sine Wave Line', cat: 'svg', tags: ['svg', 'js'],
  html: '<svg class="sn" viewBox="0 0 300 100" preserveAspectRatio="none"><path/></svg>',
  css: '.sn{width:100%;max-width:300px;height:110px}\n.sn path{fill:none;stroke:#ff5c8a;stroke-width:3;stroke-linecap:round;filter:drop-shadow(0 0 6px rgba(255,92,138,.6))}',
  js: 'var p=root.querySelector("path"),t=0;\napi.raf(function(){t+=.05;var d="M0,50";for(var x=0;x<=300;x+=6){var y=50+Math.sin(x*.035+t)*22*Math.sin(x*.006+t*.3);d+=" L"+x+","+y.toFixed(1);}p.setAttribute("d",d);});'
},

{ id: 'radar-ping', title: 'Radar Sweep', cat: 'svg', tags: ['css', 'radar'],
  html: '<div class="rd"><span class="sweep"></span><i class="p1"></i><i class="p2"></i></div>',
  css: '.rd{position:relative;width:170px;height:170px;border-radius:50%;background:radial-gradient(circle,rgba(34,211,238,.1),transparent 70%);border:2px solid rgba(34,211,238,.35);overflow:hidden}\n.rd::before,.rd::after{content:"";position:absolute;top:50%;left:50%;border:1px solid rgba(34,211,238,.25);border-radius:50%;transform:translate(-50%,-50%)}\n.rd::before{width:60%;height:60%}\n.rd::after{width:30%;height:30%}\n.sweep{position:absolute;inset:0;background:conic-gradient(from 0deg,rgba(34,211,238,.55),transparent 70deg);animation:spin 2.6s linear infinite;border-radius:50%}\n.rd i{position:absolute;width:9px;height:9px;border-radius:50%;background:#4ade80;box-shadow:0 0 12px #4ade80;animation:blip 2.6s linear infinite}\n.p1{top:32%;left:62%}\n.p2{top:66%;left:35%;animation-delay:1.1s}\n@keyframes spin{to{transform:rotate(1turn)}}\n@keyframes blip{0%{opacity:1;transform:scale(1.3)}45%,100%{opacity:0;transform:scale(.6)}}'
},

{ id: 'chart-draw', title: 'Line Chart Draw', cat: 'svg', tags: ['svg', 'data'],
  html: '<svg class="ch" viewBox="0 0 260 120"><path class="area" d="M10,100 L50,70 L90,84 L130,42 L170,58 L210,22 L250,40 L250,110 L10,110 Z"/><polyline class="ln" points="10,100 50,70 90,84 130,42 170,58 210,22 250,40"/><g class="dots"><circle cx="10" cy="100" r="4"/><circle cx="50" cy="70" r="4"/><circle cx="90" cy="84" r="4"/><circle cx="130" cy="42" r="4"/><circle cx="170" cy="58" r="4"/><circle cx="210" cy="22" r="4"/><circle cx="250" cy="40" r="4"/></g></svg>',
  css: '.ch{width:270px}\n.ln{fill:none;stroke:#22d3ee;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:300;stroke-dashoffset:300;animation:chl 4s ease-in-out infinite}\n.area{fill:rgba(34,211,238,.16);opacity:0;animation:cha 4s ease-in-out infinite}\n.dots circle{fill:#0d0d1c;stroke:#22d3ee;stroke-width:3;opacity:0;animation:chd 4s ease-in-out infinite}\n.dots circle:nth-child(2){animation-delay:.18s}\n.dots circle:nth-child(3){animation-delay:.36s}\n.dots circle:nth-child(4){animation-delay:.54s}\n.dots circle:nth-child(5){animation-delay:.72s}\n.dots circle:nth-child(6){animation-delay:.9s}\n.dots circle:nth-child(7){animation-delay:1.08s}\n@keyframes chl{0%{stroke-dashoffset:300}40%,85%{stroke-dashoffset:0}100%{stroke-dashoffset:300}}\n@keyframes cha{0%,25%{opacity:0}50%,85%{opacity:1}100%{opacity:0}}\n@keyframes chd{0%,20%{opacity:0;transform:translateY(6px)}45%,85%{opacity:1;transform:translateY(0)}100%{opacity:0}}'
},

{ id: 'signature', title: 'Signature Write-On', cat: 'svg', tags: ['svg', 'stroke'],
  html: '<svg class="sg" viewBox="0 0 260 90"><path d="M15,62 C30,18 42,18 46,44 C50,70 60,72 68,50 C74,32 82,34 84,52 C86,70 96,68 104,46 C110,28 120,30 122,50 C124,68 134,66 146,40 C154,22 168,24 166,46 C164,66 150,72 140,66 C130,60 148,52 176,54 C204,56 220,48 240,30"/></svg>',
  css: '.sg{width:270px}\n.sg path{fill:none;stroke:#e8e8f5;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:640;stroke-dashoffset:640;animation:sgw 4.5s ease-in-out infinite}\n@keyframes sgw{0%{stroke-dashoffset:640}55%,85%{stroke-dashoffset:0}100%{stroke-dashoffset:640}}'
},

{ id: 'liquid-blob-svg', title: 'Gooey Blob Merge', cat: 'svg', tags: ['svg', 'filter'],
  html: '<div class="gy"><svg width="0" height="0"><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b"/><feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"/></filter></svg><div class="blobs"><i></i><i></i><i></i></div></div>',
  css: '.gy{display:grid;place-items:center;width:100%;height:200px}\n.blobs{position:relative;width:220px;height:150px;filter:url(#goo)}\n.blobs i{position:absolute;top:50%;border-radius:50%;background:#7c5cff}\n.blobs i:nth-child(1){width:64px;height:64px;left:20px;margin-top:-32px;animation:gg1 4s ease-in-out infinite}\n.blobs i:nth-child(2){width:48px;height:48px;left:90px;margin-top:-24px;background:#a855f7;animation:gg2 4s ease-in-out infinite}\n.blobs i:nth-child(3){width:56px;height:56px;left:145px;margin-top:-28px;background:#ff5c8a;animation:gg1 5s ease-in-out infinite reverse}\n@keyframes gg1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(38px,-22px) scale(.8)}}\n@keyframes gg2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-30px,26px) scale(1.25)}}'
}

  );
})();
