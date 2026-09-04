/* Category: Text Effects */
(function () {
  var L = (window.MOTION_LAB = window.MOTION_LAB || []);
  L.push(

{ id: 'typewriter', title: 'Typewriter + Caret', cat: 'text', tags: ['css', 'steps'],
  html: '<div class="tw"><span>Hello, world.</span></div>',
  css: '.tw{font:700 26px "JetBrains Mono",monospace;color:#e8e8f5}\n.tw span{display:inline-block;overflow:hidden;white-space:nowrap;border-right:3px solid #7c5cff;width:0;animation:typing 3.2s steps(13) infinite,caret .7s step-end infinite}\n@keyframes typing{0%{width:0}45%,60%{width:13ch}100%{width:0}}\n@keyframes caret{50%{border-color:transparent}}'
},

{ id: 'gradient-text', title: 'Flowing Gradient Text', cat: 'text', tags: ['gradient', 'css'],
  html: '<h2 class="gt">Aurora</h2>',
  css: '.gt{margin:0;font:700 54px "Space Grotesk",sans-serif;background:linear-gradient(90deg,#7c5cff,#22d3ee,#ff5c8a,#ffd479,#7c5cff);background-size:400% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:flow 6s linear infinite}\n@keyframes flow{to{background-position:400% 0}}'
},

{ id: 'wave-letters', title: 'Wave Letters', cat: 'text', tags: ['css', 'letters'],
  html: '<div class="wv"><span>M</span><span>O</span><span>T</span><span>I</span><span>O</span><span>N</span></div>',
  css: '.wv{display:flex;gap:4px;font:700 40px "Space Grotesk",sans-serif;color:#22d3ee}\n.wv span{display:inline-block;animation:wvb 1.3s ease-in-out infinite}\n.wv span:nth-child(2){animation-delay:.1s;color:#7c5cff}\n.wv span:nth-child(3){animation-delay:.2s;color:#a855f7}\n.wv span:nth-child(4){animation-delay:.3s;color:#ff5c8a}\n.wv span:nth-child(5){animation-delay:.4s;color:#ffd479}\n.wv span:nth-child(6){animation-delay:.5s;color:#22d3ee}\n@keyframes wvb{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}'
},

{ id: 'glitch-text', title: 'Glitch', cat: 'text', tags: ['glitch', 'css'],
  html: '<div class="gl" data-t="GLITCH">GLITCH</div>',
  css: '.gl{position:relative;font:700 46px "JetBrains Mono",monospace;color:#e8e8f5;letter-spacing:.06em}\n.gl::before,.gl::after{content:attr(data-t);position:absolute;inset:0}\n.gl::before{color:#ff5c8a;animation:gA 2.4s infinite steps(1)}\n.gl::after{color:#22d3ee;animation:gB 3.1s infinite steps(1)}\n@keyframes gA{0%,92%,100%{clip-path:inset(0 0 100% 0);transform:none}93%{clip-path:inset(10% 0 60% 0);transform:translate(-4px,-2px)}95%{clip-path:inset(50% 0 20% 0);transform:translate(4px,2px)}97%{clip-path:inset(70% 0 10% 0);transform:translate(-3px,1px)}}\n@keyframes gB{0%,88%,100%{clip-path:inset(0 0 100% 0);transform:none}89%{clip-path:inset(30% 0 40% 0);transform:translate(5px,1px)}92%{clip-path:inset(65% 0 15% 0);transform:translate(-5px,-1px)}94%{clip-path:inset(5% 0 80% 0);transform:translate(3px,2px)}}'
},

{ id: 'neon-flicker', title: 'Neon Sign Flicker', cat: 'text', tags: ['glow', 'css'],
  html: '<div class="nf">OPEN</div>',
  css: '.nf{font:700 48px "Space Grotesk",sans-serif;letter-spacing:.1em;color:#fff;animation:flick 4s infinite}\n@keyframes flick{0%,19%,21%,23%,25%,54%,56%,100%{text-shadow:0 0 6px #ff5c8a,0 0 14px #ff5c8a,0 0 28px #ff2d6f,0 0 56px #ff2d6f;opacity:1}20%,24%,55%{text-shadow:none;opacity:.35}}'
},

{ id: 'mask-reveal', title: 'Mask Reveal Lines', cat: 'text', tags: ['reveal', 'css'],
  html: '<div class="mr"><div class="l"><span>Design</span></div><div class="l"><span>in motion</span></div></div>',
  css: '.mr{font:700 34px "Space Grotesk",sans-serif;color:#e8e8f5;text-align:center}\n.mr .l{overflow:hidden;padding:2px 0}\n.mr .l span{display:block;animation:up 3s cubic-bezier(.65,0,.35,1) infinite}\n.mr .l:nth-child(2) span{animation-delay:.15s;color:#7c5cff}\n@keyframes up{0%{transform:translateY(110%)}25%,70%{transform:translateY(0)}95%,100%{transform:translateY(-110%)}}'
},

{ id: 'shimmer-text', title: 'Metallic Shimmer', cat: 'text', tags: ['gradient', 'shine'],
  html: '<div class="sh">PREMIUM</div>',
  css: '.sh{font:700 42px "Space Grotesk",sans-serif;letter-spacing:.1em;background:linear-gradient(100deg,#5c5c78 30%,#fff 48%,#fff 52%,#5c5c78 70%);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shim 3s linear infinite}\n@keyframes shim{0%{background-position:150% 0}100%{background-position:-50% 0}}'
},

{ id: 'letter-drop', title: 'Letter Drop In', cat: 'text', tags: ['css', 'letters'],
  html: '<div class="ld"><span>F</span><span>A</span><span>L</span><span>L</span><span>I</span><span>N</span><span>G</span></div>',
  css: '.ld{display:flex;font:700 40px "Space Grotesk",sans-serif;color:#e8e8f5}\n.ld span{display:inline-block;animation:drp 2.6s cubic-bezier(.6,-0.4,.4,1.4) infinite}\n.ld span:nth-child(2){animation-delay:.08s}\n.ld span:nth-child(3){animation-delay:.16s}\n.ld span:nth-child(4){animation-delay:.24s}\n.ld span:nth-child(5){animation-delay:.32s}\n.ld span:nth-child(6){animation-delay:.4s}\n.ld span:nth-child(7){animation-delay:.48s}\n@keyframes drp{0%{transform:translateY(-70px) rotate(-25deg);opacity:0}22%,72%{transform:translateY(0) rotate(0);opacity:1}94%,100%{transform:translateY(70px) rotate(25deg);opacity:0}}'
},

{ id: 'marquee-text', title: 'Infinite Marquee', cat: 'text', tags: ['marquee', 'css'],
  html: '<div class="mq"><div class="track"><span>MOTION LAB &#9670; CSS ONLY &#9670; NO JS &#9670; </span><span>MOTION LAB &#9670; CSS ONLY &#9670; NO JS &#9670; </span></div></div>',
  css: '.mq{width:100%;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}\n.mq .track{display:flex;width:max-content;animation:mqs 14s linear infinite}\n.mq span{font:700 24px "JetBrains Mono",monospace;white-space:nowrap;color:#7c5cff;padding-right:8px}\n@keyframes mqs{to{transform:translateX(-50%)}}'
},

{ id: 'blur-in', title: 'Focus Blur In', cat: 'text', tags: ['blur', 'css'],
  html: '<div class="bi">focus</div>',
  css: '.bi{font:700 52px "Space Grotesk",sans-serif;color:#22d3ee;animation:blin 3s ease-in-out infinite}\n@keyframes blin{0%{filter:blur(14px);opacity:0;letter-spacing:.4em}35%,70%{filter:blur(0);opacity:1;letter-spacing:.02em}100%{filter:blur(14px);opacity:0;letter-spacing:.4em}}'
},

{ id: 'text-3d', title: 'Extruded 3D Text', cat: 'text', tags: ['3d', 'css'],
  html: '<div class="t3">DEPTH</div>',
  css: '.t3{font:700 46px "Space Grotesk",sans-serif;color:#fff;letter-spacing:.04em;text-shadow:1px 1px 0 #6b4ce0,2px 2px 0 #6248cf,3px 3px 0 #5a43be,4px 4px 0 #523cad,5px 5px 0 #49359c,6px 6px 12px rgba(0,0,0,.6);animation:tilt3 4s ease-in-out infinite}\n@keyframes tilt3{0%,100%{transform:perspective(400px) rotateY(-14deg) rotateX(6deg)}50%{transform:perspective(400px) rotateY(14deg) rotateX(-6deg)}}'
},

{ id: 'scramble', title: 'Scramble Decode', cat: 'text', tags: ['js', 'text'],
  html: '<div class="scr">DECRYPTING</div>',
  css: '.scr{font:700 30px "JetBrains Mono",monospace;color:#22d3ee;letter-spacing:.08em;min-height:38px}',
  js: 'var el=root.querySelector(".scr"),words=["DECRYPTING","MOTION LAB","SCRAMBLE FX"],chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&*",wi=0;\nfunction run(t){var f=0,steps=28;var id=setInterval(function(){var out="";for(var i=0;i<t.length;i++){if(i<f){out+=t[i];}else if(t[i]===" "){out+=" ";}else{out+=chars[Math.floor(Math.random()*chars.length)];}}el.textContent=out;f+=t.length/steps*1.2;if(f>=t.length){clearInterval(id);el.textContent=t;setTimeout(function(){wi=(wi+1)%words.length;run(words[wi]);},1500);}},45);}\nrun(words[0]);'
},

{ id: 'flip-letters', title: 'Split Flap Board', cat: 'text', tags: ['3d', 'js'],
  html: '<div class="sf"><b>M</b><b>O</b><b>T</b><b>I</b><b>O</b><b>N</b></div>',
  css: '.sf{display:flex;gap:5px}\n.sf b{display:grid;place-items:center;width:38px;height:52px;border-radius:6px;background:#1a1a2b;color:#ffd479;font:700 26px "JetBrains Mono",monospace;border:1px solid rgba(255,255,255,.12);box-shadow:inset 0 -1px 0 rgba(0,0,0,.6);position:relative;animation:flipin 4s ease-in-out infinite;transform-origin:center}\n.sf b::after{content:"";position:absolute;left:0;right:0;top:50%;height:1px;background:rgba(0,0,0,.7)}\n.sf b:nth-child(2){animation-delay:.12s}\n.sf b:nth-child(3){animation-delay:.24s}\n.sf b:nth-child(4){animation-delay:.36s}\n.sf b:nth-child(5){animation-delay:.48s}\n.sf b:nth-child(6){animation-delay:.6s}\n@keyframes flipin{0%,60%,100%{transform:perspective(300px) rotateX(0)}20%{transform:perspective(300px) rotateX(-90deg)}40%{transform:perspective(300px) rotateX(-180deg)}}'
},

{ id: 'underline-grow', title: 'Underline Reveal', cat: 'text', tags: ['hover', 'link'],
  html: '<div class="ul-wrap"><a href="#" class="ul">Hover this link</a><a href="#" class="ul ul2">And this one</a></div>',
  css: '.ul-wrap{display:grid;gap:16px;text-align:center}\n.ul{position:relative;font:600 22px "Space Grotesk",sans-serif;color:#e8e8f5;text-decoration:none;padding-bottom:4px}\n.ul::after{content:"";position:absolute;left:0;bottom:0;width:100%;height:2px;background:#7c5cff;transform:scaleX(0);transform-origin:right;transition:transform .42s cubic-bezier(.65,0,.35,1)}\n.ul:hover::after{transform:scaleX(1);transform-origin:left}\n.ul2::after{background:#22d3ee;height:3px;border-radius:2px;transform-origin:center;transition-duration:.5s}\n.ul2:hover{color:#22d3ee}'
}

  );
})();
