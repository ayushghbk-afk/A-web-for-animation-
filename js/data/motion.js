/* Category: Interaction & Scroll */
(function () {
  var L = (window.MOTION_LAB = window.MOTION_LAB || []);
  L.push(

{ id: 'scroll-reveal', title: 'Scroll Reveal (IO)', cat: 'motion', tags: ['js', 'scroll'],
  html: '<div class="sr2"><p class="hint">scroll inside \u2193</p><div class="items"><i>Fades up</i><i>One</i><i>By</i><i>One</i><i>As you scroll</i><i>Reversible</i></div></div>',
  css: '.sr2{width:210px;height:190px;overflow-y:auto;border-radius:12px;border:1px solid rgba(160,160,210,.25);background:rgba(140,140,190,.07);padding:10px;scrollbar-width:thin}\n.hint{margin:0 0 8px;font:600 11px "JetBrains Mono",monospace;color:#9a9ab0;text-align:center}\n.items{display:grid;gap:10px;padding-bottom:120px}\n.items i{display:block;padding:14px;border-radius:10px;background:linear-gradient(120deg,#7c5cff,#a855f7);color:#fff;font:600 14px "Space Grotesk",sans-serif;font-style:normal;opacity:0;transform:translateY(26px) scale(.94);transition:all .55s cubic-bezier(.2,1,.3,1)}\n.items i.in{opacity:1;transform:none}',
  js: 'var box=root.querySelector(".sr2");\nvar io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle("in",e.isIntersecting);});},{root:box,threshold:.5});\nroot.querySelectorAll(".items i").forEach(function(el){io.observe(el);});\napi.onCleanup(function(){io.disconnect();});'
},

{ id: 'scroll-progress', title: 'Scroll Progress Bar', cat: 'motion', tags: ['js', 'scroll'],
  html: '<div class="spw"><div class="bar"><i></i></div><div class="sbox"><p>Scroll this panel and watch the bar above fill up. It maps scrollTop to a percentage.</p><p>Any scroll container works \u2014 window, div, iframe.</p><p>Keep going\u2026</p><p>Almost there.</p><p>Done!</p></div></div>',
  css: '.spw{width:220px}\n.bar{height:6px;border-radius:99px;background:rgba(140,140,190,.25);overflow:hidden;margin-bottom:8px}\n.bar i{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#7c5cff,#22d3ee)}\n.sbox{height:150px;overflow-y:auto;border-radius:12px;border:1px solid rgba(160,160,210,.25);padding:12px;scrollbar-width:thin}\n.sbox p{margin:0 0 26px;font:400 13px "Space Grotesk",sans-serif;color:#c9c9dd}',
  js: 'var b=root.querySelector(".sbox"),f=root.querySelector(".bar i");\nb.addEventListener("scroll",function(){var p=b.scrollTop/(b.scrollHeight-b.clientHeight)*100;f.style.width=p+"%";});'
},

{ id: 'count-up', title: 'Odometer Count Up', cat: 'motion', tags: ['js', 'numbers'],
  html: '<div class="cu"><b>0</b><span>projects shipped</span></div>',
  css: '.cu{display:grid;justify-items:center;gap:4px}\n.cu b{font:700 52px "JetBrains Mono",monospace;font-variant-numeric:tabular-nums;background:linear-gradient(120deg,#7c5cff,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent}\n.cu span{font:500 12px "Space Grotesk",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#9a9ab0}',
  js: 'var el=root.querySelector("b"),target=2847,t=0;\napi.raf(function(){t+=1/90;var p=t%2.6;var e=p>=1?1:1-Math.pow(1-p,3);el.textContent=Math.round(target*e).toLocaleString();});'
},

{ id: 'logo-marquee', title: 'Seamless Logo Belt', cat: 'motion', tags: ['marquee', 'css'],
  html: '<div class="lm"><div class="tk"><i>ACME</i><i>NOVA</i><i>ORBIT</i><i>PIXEL</i><i>ZEN</i><i>ACME</i><i>NOVA</i><i>ORBIT</i><i>PIXEL</i><i>ZEN</i></div></div>',
  css: '.lm{width:100%;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent);mask-image:linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent)}\n.tk{display:flex;gap:14px;width:max-content;animation:beltrun 16s linear infinite}\n.tk i{flex:none;padding:12px 22px;border-radius:10px;border:1px solid rgba(160,160,210,.25);background:rgba(140,140,190,.1);color:#c9c9dd;font:700 15px "Space Grotesk",sans-serif;font-style:normal;letter-spacing:.1em;transition:all .3s}\n.tk i:hover{color:#7c5cff;border-color:#7c5cff;transform:translateY(-3px)}\n@keyframes beltrun{to{transform:translateX(-50%)}}'
},

{ id: 'skeleton', title: 'Skeleton Shimmer', cat: 'motion', tags: ['loading', 'css'],
  html: '<div class="sk"><div class="row"><i class="av"></i><div class="col"><i class="l1"></i><i class="l2"></i></div></div><i class="blk"></i><i class="l3"></i><i class="l4"></i></div>',
  css: '.sk{width:220px;display:grid;gap:11px}\n.sk .row{display:flex;gap:11px;align-items:center}\n.sk .col{flex:1;display:grid;gap:7px}\n.sk i{display:block;border-radius:7px;background:linear-gradient(90deg,rgba(150,150,190,.14) 25%,rgba(180,180,220,.32) 37%,rgba(150,150,190,.14) 63%);background-size:400% 100%;animation:shimmer 1.4s linear infinite}\n.av{width:46px;height:46px;border-radius:50%}\n.l1{height:12px;width:70%}\n.l2{height:10px;width:45%}\n.blk{height:70px}\n.l3{height:10px}\n.l4{height:10px;width:60%}\n@keyframes shimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}'
},

{ id: 'toast-pop', title: 'Toast Notification', cat: 'motion', tags: ['js', 'ui'],
  html: '<div class="tw2"><button class="trig">Show toast</button><div class="tst"><span class="ic">&#10003;</span><div><b>Saved!</b><p>Your changes are live.</p></div><i class="tl"></i></div></div>',
  css: '.tw2{position:relative;display:grid;place-items:center;width:250px;height:180px}\n.trig{padding:12px 22px;border:0;border-radius:10px;background:#7c5cff;color:#fff;font:600 14px "Space Grotesk",sans-serif;cursor:pointer}\n.tst{position:absolute;bottom:10px;left:8px;right:8px;display:flex;align-items:center;gap:11px;padding:13px;border-radius:12px;background:#191930;border:1px solid rgba(160,160,210,.25);box-shadow:0 18px 34px -18px #000;transform:translateY(130%);opacity:0;transition:all .5s cubic-bezier(.2,1.2,.3,1);overflow:hidden}\n.tst.on{transform:translateY(0);opacity:1}\n.ic{display:grid;place-items:center;flex:none;width:30px;height:30px;border-radius:50%;background:#22c55e;color:#04140a;font-weight:700}\n.tst b{display:block;font:700 14px "Space Grotesk",sans-serif;color:#e8e8f5}\n.tst p{margin:1px 0 0;font:400 12px "Space Grotesk",sans-serif;color:#9a9ab0}\n.tl{position:absolute;left:0;bottom:0;height:3px;width:100%;background:#22c55e;transform-origin:left;transform:scaleX(0)}\n.tst.on .tl{animation:tlrun 2.6s linear forwards}\n@keyframes tlrun{from{transform:scaleX(1)}to{transform:scaleX(0)}}',
  js: 'var b=root.querySelector(".trig"),t=root.querySelector(".tst"),id;\nb.addEventListener("click",function(){t.classList.remove("on");void t.offsetWidth;t.classList.add("on");clearTimeout(id);id=setTimeout(function(){t.classList.remove("on");},2600);});'
},

{ id: 'modal-pop', title: 'Modal Spring In', cat: 'motion', tags: ['js', 'ui'],
  html: '<div class="mw"><button class="open">Open dialog</button><div class="ov"><div class="dlg"><b>Nice spring</b><p>Backdrop fades, panel scales in with a soft overshoot.</p><button class="close">Got it</button></div></div></div>',
  css: '.mw{position:relative;display:grid;place-items:center;width:250px;height:190px;border-radius:14px;overflow:hidden;border:1px solid rgba(160,160,210,.2)}\n.open,.close{padding:11px 20px;border:0;border-radius:10px;background:#7c5cff;color:#fff;font:600 14px "Space Grotesk",sans-serif;cursor:pointer}\n.ov{position:absolute;inset:0;display:grid;place-items:center;background:rgba(5,5,15,.7);backdrop-filter:blur(3px);opacity:0;pointer-events:none;transition:opacity .3s}\n.ov.on{opacity:1;pointer-events:auto}\n.dlg{width:78%;padding:18px;border-radius:14px;background:#191930;border:1px solid rgba(160,160,210,.25);text-align:center;transform:scale(.7) translateY(20px);opacity:0;transition:all .45s cubic-bezier(.2,1.5,.4,1)}\n.ov.on .dlg{transform:none;opacity:1}\n.dlg b{font:700 16px "Space Grotesk",sans-serif;color:#e8e8f5}\n.dlg p{margin:6px 0 14px;font:400 12px "Space Grotesk",sans-serif;color:#9a9ab0}',
  js: 'var ov=root.querySelector(".ov");\nroot.querySelector(".open").addEventListener("click",function(){ov.classList.add("on");});\nroot.querySelector(".close").addEventListener("click",function(){ov.classList.remove("on");});\nov.addEventListener("click",function(e){if(e.target===ov)ov.classList.remove("on");});'
},

{ id: 'tabs-indicator', title: 'Tabs + Sliding Ink', cat: 'motion', tags: ['js', 'nav'],
  html: '<div class="tbs"><div class="hd"><button class="on">Overview</button><button>Stats</button><button>Team</button><i class="ink"></i></div><div class="pn"><div class="on">A quick overview of everything.</div><div>Numbers went up and to the right.</div><div>Six humans and one very good dog.</div></div></div>',
  css: '.tbs{width:230px}\n.hd{position:relative;display:flex;border-bottom:1px solid rgba(160,160,210,.22)}\n.hd button{flex:1;padding:11px 4px;border:0;background:transparent;color:#9a9ab0;font:600 13px "Space Grotesk",sans-serif;cursor:pointer;transition:color .3s}\n.hd button.on{color:#22d3ee}\n.ink{position:absolute;bottom:-1px;left:0;height:2px;background:#22d3ee;border-radius:2px;transition:all .42s cubic-bezier(.5,1.3,.4,1);box-shadow:0 0 10px #22d3ee}\n.pn{position:relative;padding:14px 2px;min-height:74px}\n.pn div{position:absolute;inset:14px 2px;font:400 13px "Space Grotesk",sans-serif;color:#c9c9dd;opacity:0;transform:translateY(8px);transition:all .35s;pointer-events:none}\n.pn div.on{opacity:1;transform:none}',
  js: 'var bs=root.querySelectorAll(".hd button"),ps=root.querySelectorAll(".pn div"),ink=root.querySelector(".ink");\nfunction sel(i){bs.forEach(function(b,n){b.classList.toggle("on",n===i);});ps.forEach(function(p,n){p.classList.toggle("on",n===i);});ink.style.width=bs[i].offsetWidth+"px";ink.style.transform="translateX("+bs[i].offsetLeft+"px)";}\nbs.forEach(function(b,i){b.addEventListener("click",function(){sel(i);});});\nsetTimeout(function(){sel(0);},30);'
},

{ id: 'accordion-grid', title: 'Smooth Accordion', cat: 'motion', tags: ['js', 'grid'],
  html: '<div class="ac"><div class="it on"><button>What is Motion Lab? <em>+</em></button><div class="bd"><p>A gallery of copy-paste web animations built with plain CSS and JavaScript.</p></div></div><div class="it"><button>Is it free? <em>+</em></button><div class="bd"><p>Completely. Take anything you like, no attribution required.</p></div></div><div class="it"><button>How does it animate? <em>+</em></button><div class="bd"><p>grid-template-rows animates from 0fr to 1fr \u2014 no fixed heights needed.</p></div></div></div>',
  css: '.ac{width:230px;display:grid;gap:8px}\n.it{border:1px solid rgba(160,160,210,.22);border-radius:11px;overflow:hidden;background:rgba(140,140,190,.07)}\n.it button{width:100%;display:flex;justify-content:space-between;gap:8px;padding:12px;border:0;background:transparent;color:#e8e8f5;font:600 13px "Space Grotesk",sans-serif;text-align:left;cursor:pointer}\n.it em{font-style:normal;color:#7c5cff;transition:transform .4s cubic-bezier(.5,1.4,.4,1)}\n.it.on em{transform:rotate(135deg)}\n.bd{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.65,0,.35,1)}\n.it.on .bd{grid-template-rows:1fr}\n.bd>p{overflow:hidden;margin:0;padding:0 12px;font:400 12.5px "Space Grotesk",sans-serif;color:#9a9ab0;transition:padding .45s}\n.it.on .bd>p{padding:0 12px 12px}',
  js: 'root.querySelectorAll(".it button").forEach(function(b){b.addEventListener("click",function(){var it=b.parentElement,open=it.classList.contains("on");root.querySelectorAll(".it").forEach(function(x){x.classList.remove("on");});if(!open)it.classList.add("on");});});'
},

{ id: 'ticker-vertical', title: 'Vertical Word Ticker', cat: 'motion', tags: ['css', 'text'],
  html: '<div class="vt"><span>Build</span><div class="rl"><b>faster.</b><b>bolder.</b><b>smoother.</b><b>weirder.</b><b>faster.</b></div></div>',
  css: '.vt{display:flex;align-items:center;gap:10px;font:700 28px "Space Grotesk",sans-serif;color:#e8e8f5}\n.rl{height:36px;overflow:hidden}\n.rl b{display:block;height:36px;line-height:36px;color:#7c5cff;animation:roll 8s cubic-bezier(.7,0,.3,1) infinite}\n@keyframes roll{0%,14%{transform:translateY(0)}20%,34%{transform:translateY(-36px)}40%,54%{transform:translateY(-72px)}60%,74%{transform:translateY(-108px)}80%,100%{transform:translateY(-144px)}}'
}

  );
})();
