/* Category: Buttons */
(function () {
  var L = (window.MOTION_LAB = window.MOTION_LAB || []);
  L.push(

{ id: 'btn-fill', title: 'Fill From Left', cat: 'buttons', tags: ['hover', 'css'],
  html: '<button class="fillbtn">Hover me</button>',
  css: '.fillbtn{position:relative;padding:14px 30px;border:2px solid #7c5cff;border-radius:99px;background:transparent;color:#7c5cff;font:600 15px/1 "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;transition:color .4s;z-index:0}\n.fillbtn::before{content:"";position:absolute;inset:0;background:#7c5cff;transform:scaleX(0);transform-origin:left;transition:transform .45s cubic-bezier(.65,0,.35,1);z-index:-1}\n.fillbtn:hover{color:#fff}\n.fillbtn:hover::before{transform:scaleX(1)}'
},

{ id: 'btn-border-draw', title: 'Border Draw', cat: 'buttons', tags: ['svg', 'hover'],
  html: '<button class="bd">Draw border<svg viewBox="0 0 200 60" preserveAspectRatio="none"><rect x="2" y="2" width="196" height="56" rx="28"/></svg></button>',
  css: '.bd{position:relative;width:200px;height:60px;background:none;border:0;color:#e8e8f5;font:600 15px "Space Grotesk",sans-serif;cursor:pointer}\n.bd svg{position:absolute;inset:0;width:100%;height:100%;stroke:#22d3ee;stroke-width:3;fill:none;stroke-dasharray:80 420;stroke-dashoffset:0;transition:stroke-dasharray .6s cubic-bezier(.65,0,.35,1),stroke-dashoffset .6s cubic-bezier(.65,0,.35,1)}\n.bd:hover svg{stroke-dasharray:500 0;stroke-dashoffset:-80}'
},

{ id: 'btn-neon', title: 'Neon Glow', cat: 'buttons', tags: ['glow', 'css'],
  html: '<button class="neon">NEON</button>',
  css: '.neon{padding:15px 34px;border:2px solid #22d3ee;border-radius:8px;background:transparent;color:#22d3ee;font:700 15px/1 "Space Grotesk",sans-serif;letter-spacing:.18em;cursor:pointer;text-shadow:0 0 8px rgba(34,211,238,.8);box-shadow:0 0 12px rgba(34,211,238,.35),inset 0 0 12px rgba(34,211,238,.2);animation:neonpulse 2.4s ease-in-out infinite;transition:all .3s}\n.neon:hover{background:#22d3ee;color:#04121a;box-shadow:0 0 30px rgba(34,211,238,.9),0 0 60px rgba(34,211,238,.5);text-shadow:none}\n@keyframes neonpulse{50%{box-shadow:0 0 22px rgba(34,211,238,.6),inset 0 0 18px rgba(34,211,238,.3)}}'
},

{ id: 'btn-shine', title: 'Shine Sweep', cat: 'buttons', tags: ['hover', 'gradient'],
  html: '<button class="shine">Get started</button>',
  css: '.shine{position:relative;padding:15px 34px;border:0;border-radius:12px;background:linear-gradient(120deg,#7c5cff,#a855f7,#ff5c8a);color:#fff;font:600 15px "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;box-shadow:0 10px 26px -10px #7c5cff}\n.shine::after{content:"";position:absolute;top:0;left:-120%;width:60%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-22deg);animation:sweep 2.6s ease-in-out infinite}\n@keyframes sweep{0%{left:-120%}55%,100%{left:180%}}'
},

{ id: 'btn-3d-press', title: '3D Press', cat: 'buttons', tags: ['3d', 'click'],
  html: '<button class="press">PUSH</button>',
  css: '.press{padding:15px 34px;border:0;border-radius:12px;background:#ff5c8a;color:#fff;font:700 15px "Space Grotesk",sans-serif;letter-spacing:.06em;cursor:pointer;box-shadow:0 7px 0 #b03a60,0 12px 22px -6px rgba(0,0,0,.5);transition:transform .09s ease,box-shadow .09s ease}\n.press:hover{filter:brightness(1.06)}\n.press:active{transform:translateY(7px);box-shadow:0 0 0 #b03a60,0 4px 10px -4px rgba(0,0,0,.5)}'
},

{ id: 'btn-magnetic', title: 'Magnetic Pull', cat: 'buttons', tags: ['js', 'hover'],
  html: '<button class="mag"><span>Magnetic</span></button>',
  css: '.mag{padding:16px 36px;border:1px solid rgba(160,160,210,.35);border-radius:99px;background:rgba(140,140,200,.12);color:#e8e8f5;font:600 15px "Space Grotesk",sans-serif;cursor:pointer;transition:transform .25s cubic-bezier(.2,1,.3,1),background .3s;will-change:transform}\n.mag span{display:inline-block;transition:transform .25s cubic-bezier(.2,1,.3,1)}\n.mag:hover{background:rgba(124,92,255,.3)}',
  js: 'var b=root.querySelector(".mag"),s=b.querySelector("span");\nb.addEventListener("mousemove",function(e){var r=b.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;b.style.transform="translate("+x*.35+"px,"+y*.45+"px)";s.style.transform="translate("+x*.18+"px,"+y*.22+"px)";});\nb.addEventListener("mouseleave",function(){b.style.transform="";s.style.transform="";});'
},

{ id: 'btn-ripple', title: 'Material Ripple', cat: 'buttons', tags: ['js', 'click'],
  html: '<button class="rip">Click anywhere</button>',
  css: '.rip{position:relative;padding:16px 34px;border:0;border-radius:12px;background:#7c5cff;color:#fff;font:600 15px "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;box-shadow:0 8px 22px -10px #7c5cff}\n.rip i{position:absolute;border-radius:50%;background:rgba(255,255,255,.55);transform:scale(0);animation:rippleout .65s ease-out forwards;pointer-events:none}\n@keyframes rippleout{to{transform:scale(2.6);opacity:0}}',
  js: 'var b=root.querySelector(".rip");\nb.addEventListener("click",function(e){var r=b.getBoundingClientRect(),d=Math.max(r.width,r.height),i=document.createElement("i");i.style.width=i.style.height=d+"px";i.style.left=(e.clientX-r.left-d/2)+"px";i.style.top=(e.clientY-r.top-d/2)+"px";b.appendChild(i);setTimeout(function(){i.remove();},700);});'
},

{ id: 'btn-gradient-shift', title: 'Animated Gradient', cat: 'buttons', tags: ['gradient', 'css'],
  html: '<button class="gshift">Infinite colours</button>',
  css: '.gshift{padding:15px 34px;border:0;border-radius:99px;color:#fff;font:600 15px "Space Grotesk",sans-serif;cursor:pointer;background:linear-gradient(90deg,#7c5cff,#22d3ee,#ff5c8a,#7c5cff);background-size:300% 100%;animation:gsl 4s linear infinite;transition:transform .25s,filter .25s}\n.gshift:hover{transform:scale(1.06);filter:brightness(1.12)}\n@keyframes gsl{to{background-position:300% 0}}'
},

{ id: 'btn-arrow-slide', title: 'Arrow Slide', cat: 'buttons', tags: ['hover', 'icon'],
  html: '<button class="arw"><span>Continue</span><b>&#8594;</b></button>',
  css: '.arw{display:inline-flex;align-items:center;gap:0;padding:14px 26px;border:1px solid rgba(160,160,210,.4);border-radius:99px;background:transparent;color:#e8e8f5;font:600 15px "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;transition:gap .35s cubic-bezier(.2,1,.3,1),background .35s,border-color .35s}\n.arw b{width:0;opacity:0;transform:translateX(-8px);transition:all .35s cubic-bezier(.2,1,.3,1)}\n.arw:hover{gap:10px;background:rgba(124,92,255,.2);border-color:#7c5cff}\n.arw:hover b{width:18px;opacity:1;transform:translateX(0)}'
},

{ id: 'btn-like', title: 'Like Burst', cat: 'buttons', tags: ['js', 'icon'],
  html: '<button class="like" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.7-9.5-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.5 6c-2 4.3-9.5 9-9.5 9z"/></svg><em>128</em></button>',
  css: '.like{display:inline-flex;align-items:center;gap:9px;padding:12px 22px;border:1px solid rgba(160,160,210,.35);border-radius:99px;background:transparent;color:#9a9ab0;font:600 15px "Space Grotesk",sans-serif;cursor:pointer;transition:all .3s}\n.like svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2;transition:transform .35s cubic-bezier(.2,1.6,.4,1)}\n.like em{font-style:normal;font-variant-numeric:tabular-nums}\n.like[aria-pressed="true"]{color:#ff5c8a;border-color:#ff5c8a;background:rgba(255,92,138,.12)}\n.like[aria-pressed="true"] svg{fill:#ff5c8a;animation:pop2 .5s cubic-bezier(.2,1.8,.4,1)}\n@keyframes pop2{0%{transform:scale(.6)}55%{transform:scale(1.35)}100%{transform:scale(1)}}',
  js: 'var b=root.querySelector(".like"),n=b.querySelector("em"),c=128;\nb.addEventListener("click",function(){var on=b.getAttribute("aria-pressed")==="true";b.setAttribute("aria-pressed",String(!on));n.textContent=on?c:c+1;});'
},

{ id: 'btn-liquid', title: 'Liquid Blob', cat: 'buttons', tags: ['hover', 'css'],
  html: '<button class="liq"><span>Liquid</span></button>',
  css: '.liq{position:relative;padding:16px 38px;border:0;border-radius:14px;background:#12121e;color:#fff;font:600 15px "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;isolation:isolate;border:1px solid rgba(160,160,210,.25)}\n.liq span{position:relative;z-index:2}\n.liq::before,.liq::after{content:"";position:absolute;width:130%;height:200%;left:-15%;border-radius:42%;background:#7c5cff;top:100%;transition:top .7s cubic-bezier(.65,0,.35,1),transform 4s linear;animation:blobspin 6s linear infinite}\n.liq::after{background:#22d3ee;opacity:.75;animation-duration:8s;animation-direction:reverse}\n.liq:hover::before{top:-60%}\n.liq:hover::after{top:-55%}\n@keyframes blobspin{to{transform:rotate(1turn)}}'
},

{ id: 'btn-corners', title: 'Corner Brackets', cat: 'buttons', tags: ['hover', 'css'],
  html: '<button class="cor">Expand<i class="tl"></i><i class="tr"></i><i class="bl"></i><i class="br"></i></button>',
  css: '.cor{position:relative;padding:16px 40px;border:0;background:transparent;color:#e8e8f5;font:600 15px "Space Grotesk",sans-serif;letter-spacing:.1em;cursor:pointer}\n.cor i{position:absolute;width:14px;height:14px;border:2px solid #22d3ee;transition:all .4s cubic-bezier(.65,0,.35,1)}\n.cor .tl{top:0;left:0;border-right:0;border-bottom:0}\n.cor .tr{top:0;right:0;border-left:0;border-bottom:0}\n.cor .bl{bottom:0;left:0;border-right:0;border-top:0}\n.cor .br{bottom:0;right:0;border-left:0;border-top:0}\n.cor:hover i{width:calc(50% - 2px);height:calc(50% - 2px)}\n.cor:hover{color:#22d3ee}'
},

{ id: 'btn-text-swap', title: 'Text Roll Swap', cat: 'buttons', tags: ['hover', 'text'],
  html: '<button class="swp"><span class="a">Download</span><span class="b">Let\u2019s go</span></button>',
  css: '.swp{position:relative;padding:15px 32px;border:0;border-radius:10px;background:#7c5cff;color:#fff;font:600 15px "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;height:50px;min-width:170px}\n.swp span{position:absolute;inset:0;display:grid;place-items:center;transition:transform .42s cubic-bezier(.65,0,.35,1)}\n.swp .b{transform:translateY(100%)}\n.swp:hover .a{transform:translateY(-100%)}\n.swp:hover .b{transform:translateY(0)}'
},

{ id: 'btn-loading', title: 'Loading State', cat: 'buttons', tags: ['js', 'state'],
  html: '<button class="lb"><span class="t">Save changes</span><span class="sp"></span><span class="ok">&#10003;</span></button>',
  css: '.lb{position:relative;min-width:190px;height:52px;border:0;border-radius:12px;background:#7c5cff;color:#fff;font:600 15px "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;transition:min-width .45s cubic-bezier(.65,0,.35,1),background .3s}\n.lb span{position:absolute;inset:0;display:grid;place-items:center;transition:opacity .25s}\n.lb .sp,.lb .ok{opacity:0}\n.lb .sp::before{content:"";width:22px;height:22px;border-radius:50%;border:3px solid rgba(255,255,255,.35);border-top-color:#fff;animation:spin .8s linear infinite}\n.lb .ok{font-size:24px}\n.lb.loading{min-width:52px}\n.lb.loading .t{opacity:0}\n.lb.loading .sp{opacity:1}\n.lb.done{min-width:52px;background:#22c55e}\n.lb.done .t,.lb.done .sp{opacity:0}\n.lb.done .ok{opacity:1;animation:pop2 .45s cubic-bezier(.2,1.8,.4,1)}\n@keyframes spin{to{transform:rotate(1turn)}}\n@keyframes pop2{0%{transform:scale(.4)}60%{transform:scale(1.25)}100%{transform:scale(1)}}',
  js: 'var b=root.querySelector(".lb");\nb.addEventListener("click",function(){if(b.className!=="lb")return;b.className="lb loading";setTimeout(function(){b.className="lb done";},1600);setTimeout(function(){b.className="lb";},3200);});'
},

{ id: 'btn-cyber', title: 'Cyber Clip', cat: 'buttons', tags: ['hover', 'clip-path'],
  html: '<button class="cyb">ACCESS<span class="gl">ACCESS</span></button>',
  css: '.cyb{position:relative;padding:16px 42px;border:0;background:#7c5cff;color:#0b0b14;font:700 14px "JetBrains Mono",monospace;letter-spacing:.22em;cursor:pointer;clip-path:polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px);transition:background .25s,color .25s}\n.cyb .gl{position:absolute;inset:0;display:grid;place-items:center;color:#22d3ee;clip-path:inset(0 0 60% 0);opacity:0;mix-blend-mode:screen}\n.cyb:hover{background:#22d3ee}\n.cyb:hover .gl{opacity:1;animation:glitchmove .4s steps(2) infinite}\n@keyframes glitchmove{0%{transform:translate(0)}25%{transform:translate(-3px,1px)}50%{transform:translate(3px,-1px)}75%{transform:translate(-2px,-2px)}100%{transform:translate(0)}}'
},

{ id: 'btn-glass', title: 'Glass Hover', cat: 'buttons', tags: ['glass', 'hover'],
  html: '<div class="gwrap"><button class="glassb">Glassmorphic</button></div>',
  css: '.gwrap{padding:22px 12px;border-radius:20px;background:linear-gradient(120deg,#ff5c8a,#7c5cff 50%,#22d3ee)}\n.glassb{padding:15px 32px;border:1px solid rgba(255,255,255,.4);border-radius:14px;background:rgba(255,255,255,.16);backdrop-filter:blur(10px);color:#fff;font:600 15px "Space Grotesk",sans-serif;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 8px 24px -10px rgba(0,0,0,.6);transition:all .35s cubic-bezier(.2,1,.3,1)}\n.glassb:hover{background:rgba(255,255,255,.32);transform:translateY(-3px) scale(1.03);letter-spacing:.04em}'
},
{ id: 'btn-3d-flip', title: '3D Flip Button', cat: 'buttons', tags: ['3d', 'hover'],
  html: '<button class="flip3"><span class="a">Hover me</span><span class="b">Flipped!</span></button>',
  css: '.flip3{position:relative;width:176px;height:54px;border:0;background:none;cursor:pointer;perspective:500px}\n.flip3 span{position:absolute;inset:0;display:grid;place-items:center;border-radius:13px;font:600 15px "Space Grotesk",sans-serif;backface-visibility:hidden;transition:transform .55s cubic-bezier(.6,.1,.3,1)}\n.flip3 .a{background:linear-gradient(120deg,#7c5cff,#a855f7);color:#fff;box-shadow:0 10px 24px -10px rgba(124,92,255,.9)}\n.flip3 .b{background:linear-gradient(120deg,#22d3ee,#0ea5b7);color:#04303a;transform:rotateX(180deg)}\n.flip3:hover .a{transform:rotateX(180deg)}\n.flip3:hover .b{transform:rotateX(360deg)}'
},
{ id: 'btn-cursor-fill', title: 'Cursor Fill', cat: 'buttons', tags: ['js', 'hover'],
  html: '<button class="cuf">Cursor follows me</button>',
  css: '.cuf{position:relative;overflow:hidden;padding:15px 36px;border-radius:99px;border:1px solid rgba(160,160,210,.32);background:#12121e;color:#c9c9dd;font:600 15px "Space Grotesk",sans-serif;cursor:pointer;transition:color .3s,border-color .3s,box-shadow .3s}\n.cuf::before{content:"";position:absolute;top:var(--fy,50%);left:var(--fx,50%);width:190px;height:190px;border-radius:50%;background:radial-gradient(circle,#7c5cff 0%,#22d3ee 55%,transparent 74%);transform:translate(-50%,-50%) scale(0);transition:transform .5s cubic-bezier(.2,1.3,.4,1);z-index:-1}\n.cuf:hover::before{transform:translate(-50%,-50%) scale(1)}\n.cuf:hover{color:#fff;border-color:transparent;box-shadow:0 8px 26px -12px rgba(124,92,255,.9)}',
  js: 'var b=root.querySelector(".cuf");\nb.addEventListener("mousemove",function(e){var r=b.getBoundingClientRect();b.style.setProperty("--fx",(e.clientX-r.left)+"px");b.style.setProperty("--fy",(e.clientY-r.top)+"px");});\nb.addEventListener("mouseleave",function(){b.style.setProperty("--fx","50%");b.style.setProperty("--fy","50%");});'
},
{ id: 'btn-aura', title: 'Aura Glow', cat: 'buttons', tags: ['gradient', 'hover'],
  html: '<button class="au3"><span>Join premium</span><b class="st">&#10022;</b></button>',
  css: '.au3{position:relative;display:inline-flex;align-items:center;gap:9px;padding:16px 40px;border-radius:14px;border:1px solid rgba(160,160,210,.3);background:#141424;color:#dcdcf0;font:600 15px "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;transition:transform .3s,color .3s,border-color .3s,box-shadow .3s}\n.au3::before{content:"";position:absolute;top:-65%;left:-65%;width:230%;height:230%;background:conic-gradient(from 0deg,#7c5cff,#22d3ee,#ff5c8a,#ffd479,#7c5cff);opacity:0;animation:aurago 3.2s linear infinite;transition:opacity .4s;z-index:0}\n.au3 span,.au3 b{position:relative;z-index:1}\n.au3 .st{color:#ffd479;font-weight:700;transition:transform .4s cubic-bezier(.3,1.5,.5,1)}\n.au3:hover{color:#fff;border-color:rgba(255,255,255,.35);transform:translateY(-2px)}\n.au3:hover::before{opacity:1}\n.au3:hover .st{transform:rotate(180deg) scale(1.3)}\n@keyframes aurago{to{transform:rotate(1turn)}}'
}

  );
})();
