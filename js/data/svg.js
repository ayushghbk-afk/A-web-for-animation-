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
},
{ id: 'morph-blob', title: 'Morphing Blob', cat: 'svg', tags: ['svg', 'motion'],
  html: '<svg class="mblob" viewBox="0 0 100 100"><defs><linearGradient id="mg3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7c5cff"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs><path fill="url(#mg3)"><animate attributeName="d" dur="4.6s" repeatCount="indefinite" values="M50,8 C76,8 93,27 93,52 C93,76 76,93 50,93 C25,93 8,76 8,52 C8,27 25,8 50,8 Z;M50,4 C84,5 100,34 91,63 C84,86 64,103 40,95 C15,87 -3,60 9,34 C18,14 33,3 50,4 Z;M50,8 C76,8 93,27 93,52 C93,76 76,93 50,93 C25,93 8,76 8,52 C8,27 25,8 50,8 Z"/></path><circle r="5" fill="#ff5c8a"><animate attributeName="cx" dur="4.6s" repeatCount="indefinite" values="30;72;30"/><animate attributeName="cy" dur="4.6s" repeatCount="indefinite" values="70;26;70"/></circle></svg>',
  css: '.mblob{width:150px;height:150px;filter:drop-shadow(0 0 20px rgba(124,92,255,.55))}'
},
{ id: 'bars-live', title: 'Live Bar Chart', cat: 'svg', tags: ['svg', 'chart'],
  html: '<svg class="lb3" viewBox="0 0 240 150"><defs><linearGradient id="bc3g" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#7c5cff"/></linearGradient></defs><g class="guides"><line x1="16" y1="30" x2="16" y2="126"/><line x1="16" y1="30" x2="226" y2="30"/><line x1="16" y1="78" x2="226" y2="78"/><line x1="16" y1="126" x2="226" y2="126"/></g><g class="bwrap"><rect x="34" y="42" width="20" height="84" rx="4"/><rect x="78" y="64" width="20" height="62" rx="4"/><rect x="122" y="30" width="20" height="96" rx="4"/><rect x="166" y="52" width="20" height="74" rx="4"/><rect x="210" y="70" width="20" height="56" rx="4"/></g><g class="xl3"><text x="44" y="140">Mon</text><text x="88" y="140">Tue</text><text x="132" y="140">Wed</text><text x="176" y="140">Thu</text><text x="220" y="140">Fri</text></g></svg>',
  css: '.lb3{width:252px}\n.guides line{stroke:rgba(160,160,210,.14);stroke-width:1;stroke-dasharray:3 6}\n.bwrap rect{fill:url(#bc3g);transform-box:fill-box;transform-origin:50% 100%;animation:bars3 1.5s ease-in-out infinite alternate;filter:drop-shadow(0 0 5px rgba(124,92,255,.45))}\n.bwrap rect:nth-child(1){animation-delay:0s}\n.bwrap rect:nth-child(2){animation-delay:.12s}\n.bwrap rect:nth-child(3){animation-delay:.24s}\n.bwrap rect:nth-child(4){animation-delay:.36s}\n.bwrap rect:nth-child(5){animation-delay:.48s}\n.xl3 text{font:600 10px "JetBrains Mono",monospace;fill:#8f8fa8;text-anchor:middle}\n@keyframes bars3{from{transform:scaleY(.5)}to{transform:scaleY(1)}}'
},

{ id: 'neon-heart', title: 'Neon Heart', cat: 'svg', tags: ['css', 'stroke'],
  html: '<svg class="nh6" viewBox="0 0 60 55"><path d="M30 51C15 40 2 30 2 17C2 9 8 3 16 3C22 3 27 6 30 11C33 6 38 3 44 3C52 3 58 9 58 17C58 30 45 40 30 51Z"/></svg>',
  css: '\n.nh6{width:70px;height:64px;overflow:visible}\n.nh6 path{fill:none;stroke:#ff5c8a;stroke-width:3;stroke-linecap:round;stroke-dasharray:8 220;stroke-dashoffset:228;filter:drop-shadow(0 0 8px #ff5c8a);animation:nh6 3s cubic-bezier(.6,.05,.3,1) infinite}\n.nh6:hover path{animation-play-state:running;animation-duration:.6s}\n@keyframes nh6{0%{stroke-dashoffset:228}45%{stroke-dashoffset:0}70%{transform-origin:30px 30px}85%{transform:scale(1)}92%{transform:scale(1.2)}100%{transform:scale(1)}}\n'
}
,

{ id: 'clock-tick', title: 'Analog Clock', cat: 'svg', tags: ['css', 'clock'],
  html: '<svg class="ck6" viewBox="0 0 100 100"><circle class="face6" cx="50" cy="50" r="46"/><g class="hands6"><line x1="50" y1="50" x2="50" y2="26"/><line class="min6" x1="50" y1="50" x2="50" y2="16"/></g><circle class="hub6" cx="50" cy="50" r="3"/></svg>',
  css: '\n.ck6{width:90px;height:90px;overflow:visible}\n.face6{fill:#101024;stroke:#7c5cff;stroke-width:2;filter:drop-shadow(0 0 6px rgba(124,92,255,.5))}\n.hands6 line{stroke:#22d3ee;stroke-width:3.5;stroke-linecap:round;transform-origin:50px 50px;animation:ck6h 6s linear infinite}\n.hands6 .min6{stroke:#ff5c8a;stroke-width:2.5;animation:ck6m 0.6s linear infinite}\n.hub6{fill:#fff}\n@keyframes ck6h{to{transform:rotate(360deg)}}\n@keyframes ck6m{to{transform:rotate(360deg)}}\n'
}
,

{ id: 'audio-wave', title: 'Pulse Bars', cat: 'svg', tags: ['css', 'wave'],
  html: '<svg class="aw6" viewBox="0 0 200 60"><rect x="4" y="20" width="6" height="20"/><rect x="16" y="8" width="6" height="44"/><rect x="28" y="16" width="6" height="28"/><rect x="40" y="4" width="6" height="52"/><rect x="52" y="22" width="6" height="16"/><rect x="64" y="10" width="6" height="40"/><rect x="76" y="18" width="6" height="24"/></svg>',
  css: '\n.aw6{width:140px;height:44px;overflow:visible}\n.aw6 rect{fill:#7c5cff;transform-origin:center bottom;animation:aw6 .9s ease-in-out infinite}\n.aw6 rect:nth-child(1){animation-delay:.1s}.aw6 rect:nth-child(2){animation-delay:.2s}.aw6 rect:nth-child(3){animation-delay:.05s}.aw6 rect:nth-child(4){animation-delay:.3s}.aw6 rect:nth-child(5){animation-delay:.4s}.aw6 rect:nth-child(6){animation-delay:.2s}.aw6 rect:nth-child(7){animation-delay:.3s}\n.aw6 rect:nth-child(2),.aw6 rect:nth-child(4){fill:#22d3ee}\n.aw6 rect:nth-child(6){fill:#ff5c8a}\n@keyframes aw6{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}\n'
}
,

{ id: 'dash-race', title: 'Dash Circuit', cat: 'svg', tags: ['css', 'path'],
  html: '<svg class="dc6" viewBox="0 0 200 60"><path d="M10 50 H70 L90 30 H150 L170 10"/></svg>',
  css: '\n.dc6{width:170px;height:52px;overflow:visible}\n.dc6 path{fill:none;stroke:#22d3ee;stroke-width:3;stroke-linecap:round;stroke-dasharray:6 6;animation:dc6 1s linear infinite;filter:drop-shadow(0 0 4px #22d3ee)}\n@keyframes dc6{to{stroke-dashoffset:-12}}\n'
}
,

{ id: 'orbit-satellite', title: 'Orbit Satellite', cat: 'svg', tags: ['css', 'orbit'],
  html: '<svg class="os6" viewBox="0 0 100 100"><circle cx="50" cy="50" r="16" class="planet6"/><g class="rings6"><ellipse cx="50" cy="50" rx="40" ry="15"/><ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(60 50 50)"/><circle class="sat6" cx="50" cy="8" r="4"/></g></svg>',
  css: '\n.os6{width:96px;height:96px;overflow:visible}\n.planet6{fill:url(#p6);fill:#7c5cff;stroke:#a78bfa;stroke-width:1}\n.rings6 ellipse{fill:none;stroke:#22d3ee;stroke-width:1.6;opacity:.7;stroke-dasharray:4 3;transform-origin:50px 50px;animation:os6r 8s linear infinite}\n.sat6{fill:#ff5c8a;transform-origin:50px 50px;animation:os6 4s linear infinite}\n@keyframes os6{to{transform:rotate(360deg)}}\n@keyframes os6r{to{transform:rotate(360deg)}}\n'
}
,

{ id: 'gauge-needle', title: 'Gauge Dial', cat: 'svg', tags: ['js', 'needle'],
  html: '<svg class="gn6" viewBox="0 0 120 120"><path class="arc6" d="M20 90 A50 50 0 0 1 100 90"/><g class="needle6"><line x1="60" y1="90" x2="60" y2="35"/></g><circle cx="60" cy="90" r="5"/><text x="60" y="112" class="t6">42</text></svg>',
  css: '\n.gn6{width:110px;height:110px;overflow:visible}\n.arc6{fill:none;stroke:rgba(160,160,210,.25);stroke-width:9;stroke-linecap:round}\n.needle6 line{stroke:#22d3ee;stroke-width:3;stroke-linecap:round;transform-origin:60px 90px;filter:drop-shadow(0 0 4px #22d3ee)}\n.needle6{transform-origin:60px 90px;transition:transform .4s cubic-bezier(.4,0,.2,1)}\ncircle{fill:#7c5cff}\n.t6{fill:#e8e8f5;font:700 13px \'JetBrains Mono\',monospace;text-anchor:middle}\n',
  js: 'var n=root.querySelector(\'.needle6\'),t=root.querySelector(\'.t6\'),v=0,target=42;setInterval(function(){target=20+Math.floor(Math.random()*70);},1600);api.raf(function(){v+=(target-v)*0.06;if(Math.abs(v-target)<0.4)v=target;n.style.transform=\'rotate(\'+(-40+v*(80/90))+\'deg)\';t.textContent=Math.round(v);});'
}
,

{ id: 'pulse-ping', title: 'Radar Ping', cat: 'svg', tags: ['css', 'ping'],
  html: '<svg class="pp6" viewBox="0 0 120 120"><circle cx="60" cy="60" r="6"/><g class="pings6"><circle class="p1" cx="60" cy="60" r="8"/><circle class="p2" cx="60" cy="60" r="8"/><circle class="p3" cx="60" cy="60" r="8"/></g></svg>',
  css: '.pp6{width:100px;height:100px;overflow:visible}\n.pp6>circle{fill:#22d3ee;box-shadow:0 0 10px #22d3ee}\n.pings6 circle{fill:none;stroke:#7c5cff;stroke-width:2;transform-box:fill-box;transform-origin:center;animation:pp6 2s ease-out infinite}\n.pings6 .p2{animation-delay:.66s}.pings6 .p3{animation-delay:1.32s}\n@keyframes pp6{0%{transform:scale(.2);opacity:.95}100%{transform:scale(5);opacity:0}}'
}
  );
})();
