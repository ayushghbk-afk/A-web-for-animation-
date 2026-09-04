/* Category: Controls, Toggles & Inputs */
(function () {
  var L = (window.MOTION_LAB = window.MOTION_LAB || []);
  L.push(

{ id: 'day-night', title: 'Day / Night Toggle', cat: 'controls', tags: ['toggle', 'css'],
  html: '<label class="dn"><input type="checkbox"><span class="tr"><i class="knob"></i><b class="star s1"></b><b class="star s2"></b><b class="star s3"></b><b class="cloud"></b></span></label>',
  css: '.dn input{position:absolute;opacity:0}\n.tr{position:relative;display:block;width:104px;height:50px;border-radius:99px;background:linear-gradient(#4fb6ff,#1e7fd4);cursor:pointer;overflow:hidden;transition:background .6s;box-shadow:inset 0 2px 8px rgba(0,0,0,.35)}\n.knob{position:absolute;top:5px;left:5px;width:40px;height:40px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff3b0,#ffcf3f);box-shadow:0 0 18px rgba(255,207,63,.85);transition:all .55s cubic-bezier(.5,1.6,.4,1)}\n.star{position:absolute;background:#fff;border-radius:50%;opacity:0;transition:opacity .5s}\n.s1{width:4px;height:4px;top:12px;left:20px}\n.s2{width:3px;height:3px;top:30px;left:34px}\n.s3{width:5px;height:5px;top:18px;left:44px}\n.cloud{position:absolute;right:14px;top:16px;width:34px;height:12px;border-radius:99px;background:rgba(255,255,255,.85);box-shadow:-10px -4px 0 -2px rgba(255,255,255,.8);transition:transform .55s,opacity .4s}\n.dn input:checked + .tr{background:linear-gradient(#182a55,#070d22)}\n.dn input:checked + .tr .knob{left:59px;background:radial-gradient(circle at 65% 35%,#e9edf7,#b8c0d6);box-shadow:0 0 18px rgba(220,230,255,.6),inset -6px -3px 0 0 #97a0bb}\n.dn input:checked + .tr .star{opacity:1}\n.dn input:checked + .tr .cloud{transform:translateY(26px);opacity:0}'
},

{ id: 'ios-switch', title: 'Springy Switch', cat: 'controls', tags: ['toggle', 'css'],
  html: '<label class="sw"><input type="checkbox" checked><span></span></label>',
  css: '.sw input{position:absolute;opacity:0}\n.sw span{display:block;width:72px;height:40px;border-radius:99px;background:#3a3a55;cursor:pointer;position:relative;transition:background .35s}\n.sw span::after{content:"";position:absolute;top:4px;left:4px;width:32px;height:32px;border-radius:99px;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.4);transition:all .4s cubic-bezier(.4,1.8,.4,1)}\n.sw input:checked + span{background:#22c55e}\n.sw input:checked + span::after{left:36px;width:32px}\n.sw span:active::after{width:40px}'
},

{ id: 'check-draw', title: 'Checkbox Tick Draw', cat: 'controls', tags: ['svg', 'toggle'],
  html: '<label class="cd"><input type="checkbox"><span class="bx"><svg viewBox="0 0 24 24"><polyline points="4,13 9,18 20,6"/></svg></span><em>Ship it</em></label>',
  css: '.cd{display:inline-flex;align-items:center;gap:12px;cursor:pointer;color:#e8e8f5;font:600 17px "Space Grotesk",sans-serif}\n.cd input{position:absolute;opacity:0}\n.bx{width:34px;height:34px;border-radius:9px;border:2px solid #6b6b8a;display:grid;place-items:center;transition:all .35s cubic-bezier(.4,1.6,.4,1)}\n.bx svg{width:22px;height:22px;fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:26;stroke-dashoffset:26;transition:stroke-dashoffset .4s .1s}\n.cd input:checked + .bx{background:#7c5cff;border-color:#7c5cff;transform:scale(1.1)}\n.cd input:checked + .bx svg{stroke-dashoffset:0}\n.cd input:checked ~ em{color:#7c5cff}\n.cd em{font-style:normal;transition:color .3s}'
},

{ id: 'pill-radio', title: 'Sliding Pill Radio', cat: 'controls', tags: ['js', 'toggle'],
  html: '<div class="pr"><i class="ind"></i><button class="active">Day</button><button>Week</button><button>Month</button></div>',
  css: '.pr{position:relative;display:flex;padding:5px;border-radius:99px;background:rgba(140,140,190,.16);border:1px solid rgba(160,160,210,.2)}\n.pr button{position:relative;z-index:2;padding:9px 20px;border:0;background:transparent;color:#9a9ab0;font:600 14px "Space Grotesk",sans-serif;cursor:pointer;transition:color .3s;border-radius:99px}\n.pr button.active{color:#fff}\n.ind{position:absolute;top:5px;left:5px;height:calc(100% - 10px);border-radius:99px;background:linear-gradient(120deg,#7c5cff,#a855f7);transition:transform .45s cubic-bezier(.4,1.4,.4,1),width .45s cubic-bezier(.4,1.4,.4,1);box-shadow:0 6px 16px -6px #7c5cff}',
  js: 'var w=root.querySelector(".pr"),ind=root.querySelector(".ind"),bs=root.querySelectorAll(".pr button");\nfunction move(b){ind.style.width=b.offsetWidth+"px";ind.style.transform="translateX("+(b.offsetLeft-5)+"px)";}\nbs.forEach(function(b){b.addEventListener("click",function(){bs.forEach(function(x){x.classList.remove("active");});b.classList.add("active");move(b);});});\nsetTimeout(function(){move(bs[0]);},30);'
},

{ id: 'float-label', title: 'Floating Label Field', cat: 'controls', tags: ['input', 'css'],
  html: '<div class="fl"><input id="fl1" type="text" placeholder=" " required><label for="fl1">Email address</label><i class="bar"></i></div>',
  css: '.fl{position:relative;width:230px}\n.fl input{width:100%;padding:18px 14px 8px;border:1px solid rgba(160,160,210,.3);border-radius:10px;background:rgba(140,140,190,.08);color:#e8e8f5;font:400 15px "Space Grotesk",sans-serif;outline:none;transition:border-color .3s}\n.fl label{position:absolute;left:14px;top:15px;color:#9a9ab0;font:400 15px "Space Grotesk",sans-serif;pointer-events:none;transform-origin:left;transition:all .28s cubic-bezier(.4,1.3,.4,1)}\n.fl input:focus{border-color:#7c5cff}\n.fl input:focus + label,.fl input:not(:placeholder-shown) + label{transform:translateY(-10px) scale(.75);color:#7c5cff}\n.bar{position:absolute;left:50%;bottom:0;height:2px;width:0;background:#7c5cff;border-radius:2px;transition:all .35s}\n.fl input:focus ~ .bar{left:0;width:100%}'
},

{ id: 'search-expand', title: 'Expanding Search', cat: 'controls', tags: ['input', 'css'],
  html: '<div class="se"><input type="text" placeholder="Search\u2026"><button><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg></button></div>',
  css: '.se{position:relative;display:flex;align-items:center;justify-content:flex-end;height:50px;width:50px;border-radius:99px;background:rgba(140,140,190,.16);border:1px solid rgba(160,160,210,.25);transition:width .5s cubic-bezier(.65,0,.35,1),background .3s;overflow:hidden}\n.se input{position:absolute;left:0;width:100%;height:100%;padding:0 52px 0 20px;border:0;background:transparent;color:#e8e8f5;font:400 15px "Space Grotesk",sans-serif;outline:none;opacity:0;transition:opacity .3s}\n.se button{position:relative;z-index:2;flex:none;width:50px;height:50px;display:grid;place-items:center;border:0;background:transparent;color:#e8e8f5;cursor:pointer}\n.se button svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}\n.se:hover,.se:focus-within{width:250px;background:rgba(124,92,255,.18)}\n.se:hover input,.se:focus-within input{opacity:1}'
},

{ id: 'range-slider', title: 'Glowing Range Slider', cat: 'controls', tags: ['input', 'js'],
  html: '<div class="rs"><input type="range" min="0" max="100" value="45"><output>45</output></div>',
  css: '.rs{display:grid;gap:14px;justify-items:center;width:240px}\n.rs input{-webkit-appearance:none;appearance:none;width:100%;height:8px;border-radius:99px;background:linear-gradient(90deg,#7c5cff 45%,rgba(140,140,190,.25) 45%);outline:none}\n.rs input::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;background:#fff;border:4px solid #7c5cff;cursor:grab;box-shadow:0 0 0 0 rgba(124,92,255,.45);transition:box-shadow .3s,transform .2s}\n.rs input::-webkit-slider-thumb:hover{transform:scale(1.15);box-shadow:0 0 0 10px rgba(124,92,255,.28)}\n.rs input::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:#fff;border:4px solid #7c5cff;cursor:grab}\n.rs output{font:700 22px "JetBrains Mono",monospace;color:#7c5cff;font-variant-numeric:tabular-nums}',
  js: 'var r=root.querySelector("input"),o=root.querySelector("output");\nfunction up(){var v=r.value;o.textContent=v;r.style.background="linear-gradient(90deg,#7c5cff "+v+"%,rgba(140,140,190,.25) "+v+"%)";}\nr.addEventListener("input",up);up();'
},

{ id: 'hamburger', title: 'Burger to Cross', cat: 'controls', tags: ['js', 'nav'],
  html: '<button class="bg" aria-label="Menu"><i></i><i></i><i></i></button>',
  css: '.bg{display:grid;gap:7px;padding:16px;border-radius:14px;border:1px solid rgba(160,160,210,.25);background:rgba(140,140,190,.12);cursor:pointer}\n.bg i{display:block;width:34px;height:4px;border-radius:3px;background:#e8e8f5;transition:transform .45s cubic-bezier(.6,0,.3,1.4),opacity .25s,width .35s}\n.bg.on i:nth-child(1){transform:translateY(11px) rotate(45deg);background:#ff5c8a}\n.bg.on i:nth-child(2){opacity:0;width:0}\n.bg.on i:nth-child(3){transform:translateY(-11px) rotate(-45deg);background:#ff5c8a}',
  js: 'var b=root.querySelector(".bg");b.addEventListener("click",function(){b.classList.toggle("on");});'
},

{ id: 'heart-particles', title: 'Heart Burst Particles', cat: 'controls', tags: ['js', 'fun'],
  html: '<button class="hp" aria-pressed="false"><span class="ic">&#9825;</span></button>',
  css: '.hp{position:relative;width:78px;height:78px;border-radius:50%;border:1px solid rgba(160,160,210,.25);background:rgba(140,140,190,.1);cursor:pointer;display:grid;place-items:center}\n.ic{font-size:36px;color:#9a9ab0;transition:transform .35s cubic-bezier(.3,1.7,.4,1),color .3s}\n.hp[aria-pressed="true"] .ic{color:#ff5c8a;transform:scale(1.15)}\n.hp em{position:absolute;top:50%;left:50%;width:7px;height:7px;border-radius:50%;background:#ff5c8a;pointer-events:none;animation:burst .8s ease-out forwards}\n@keyframes burst{0%{transform:translate(-50%,-50%) scale(1)}100%{transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(0);opacity:0}}',
  js: 'var b=root.querySelector(".hp"),ic=b.querySelector(".ic");\nb.addEventListener("click",function(){var on=b.getAttribute("aria-pressed")==="true";b.setAttribute("aria-pressed",String(!on));ic.innerHTML=on?"&#9825;":"&#9829;";if(on)return;for(var i=0;i<12;i++){var e=document.createElement("em"),a=i/12*6.283,d=38+Math.random()*22;e.style.setProperty("--dx",Math.cos(a)*d+"px");e.style.setProperty("--dy",Math.sin(a)*d+"px");b.appendChild(e);}setTimeout(function(){b.querySelectorAll("em").forEach(function(x){x.remove();});},850);});'
},

{ id: 'star-rating', title: 'Star Rating', cat: 'controls', tags: ['css', 'hover'],
  html: '<div class="sr"><i>&#9733;</i><i>&#9733;</i><i>&#9733;</i><i>&#9733;</i><i>&#9733;</i></div>',
  css: '.sr{display:flex;gap:6px;direction:rtl;font-size:34px;line-height:1}\n.sr i{color:#4a4a68;cursor:pointer;transition:transform .25s cubic-bezier(.3,1.7,.4,1),color .2s,text-shadow .3s;font-style:normal}\n.sr i:hover,.sr i:hover ~ i{color:#ffd479;text-shadow:0 0 14px rgba(255,212,121,.8)}\n.sr i:hover{transform:scale(1.3) rotate(-10deg)}'
},

{ id: 'segmented-morph', title: 'Icon Tab Bar', cat: 'controls', tags: ['js', 'nav'],
  html: '<nav class="tb"><button class="on"><svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg><b>Home</b></button><button><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><b>Search</b></button><button><svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.7-9.5-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.5 6c-2 4.3-9.5 9-9.5 9z"/></svg><b>Saved</b></button></nav>',
  css: '.tb{display:flex;gap:6px;padding:8px;border-radius:99px;background:rgba(140,140,190,.14);border:1px solid rgba(160,160,210,.2)}\n.tb button{display:flex;align-items:center;gap:0;padding:11px;border:0;border-radius:99px;background:transparent;color:#9a9ab0;cursor:pointer;overflow:hidden;transition:all .45s cubic-bezier(.5,1.3,.4,1)}\n.tb svg{width:21px;height:21px;flex:none;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\n.tb b{max-width:0;opacity:0;white-space:nowrap;font:600 14px "Space Grotesk",sans-serif;transition:all .45s cubic-bezier(.5,1.3,.4,1)}\n.tb button.on{background:#7c5cff;color:#fff;padding-right:18px;gap:8px}\n.tb button.on b{max-width:90px;opacity:1}',
  js: 'var bs=root.querySelectorAll(".tb button");bs.forEach(function(b){b.addEventListener("click",function(){bs.forEach(function(x){x.classList.remove("on");});b.classList.add("on");});});'
},

{ id: 'copy-morph', title: 'Copy → Copied', cat: 'controls', tags: ['js', 'state'],
  html: '<button class="cp"><span class="i1"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>Copy</span><span class="i2"><svg viewBox="0 0 24 24"><polyline points="4,13 9,18 20,6"/></svg>Copied</span></button>',
  css: '.cp{position:relative;width:150px;height:48px;border-radius:12px;border:1px solid rgba(160,160,210,.3);background:rgba(140,140,190,.12);color:#e8e8f5;font:600 14px "Space Grotesk",sans-serif;cursor:pointer;overflow:hidden;transition:background .35s,border-color .35s}\n.cp span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:8px;transition:transform .45s cubic-bezier(.5,1.4,.4,1),opacity .3s}\n.cp svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\n.cp .i2{transform:translateY(100%);opacity:0}\n.cp.done{background:rgba(34,197,94,.2);border-color:#22c55e;color:#4ade80}\n.cp.done .i1{transform:translateY(-100%);opacity:0}\n.cp.done .i2{transform:translateY(0);opacity:1}',
  js: 'var b=root.querySelector(".cp");b.addEventListener("click",function(){b.classList.add("done");setTimeout(function(){b.classList.remove("done");},1800);});'
}

  );
})();
