document.documentElement.classList.add("js");const o=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");o.unobserve(x.target)}}),{threshold:.1});document.querySelectorAll(".rv").forEach(e=>o.observe(e));
/* ===== Visual extras (icons, count-up, progress bar, back-to-top) ===== */
(function(){
var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;

/* 1. Icons in the nav */
var nav={"HOME":"🏠","EV/AV":"⚡","IMPACT":"📊","ISSUES":"⚠️","SOLUTIONS":"💡","SOURCES":"📚"};
document.querySelectorAll("nav .links a").forEach(function(a){var e=nav[a.textContent.trim()];if(e)a.insertAdjacentHTML("afterbegin","<span class='ni' aria-hidden='true'>"+e+"</span>")});

/* 2. Icons in the round tile badges (keeps the step number as a small badge) */
var ic={"sensors":"📡","processing":"🧠","actuators":"⚙️","platooning":"🚚","longer trips":"🛣️","less parking":"🅿️","empty vehicles":"🚗","awareness":"📢","critical evaluation":"⚖️","ethical dialogue":"💬","home":"🏠","ev/av":"⚡","impact":"📊","issues":"⚠️","solutions":"💡","sources":"📚"};
document.querySelectorAll(".tile .ic").forEach(function(el){var h=el.parentNode.querySelector("h3");if(!h)return;var e=ic[h.textContent.trim().toLowerCase()];if(e){el.setAttribute("data-n",el.textContent.trim());el.textContent=e;el.classList.add("emo")}});

/* 3. Icons on the small info chips */
var ch={"lower emissions":"🌱","cleaner air":"🍃","energy efficiency":"🔋","less oil":"🛢️","quieter streets":"🔇","second life":"♻️","high upfront cost":"💰","limited charging":"🔌","range anxiety":"📉","longer refueling":"⏱️","battery replacement":"🔧","public awareness":"📣","fewer moving parts":"⚙️","six levels of automation":"🎚️","15–20% fuel savings":"⛽","cost":"💰","safety and ethics":"🛡️","regulations":"📜","weather":"🌧️","trust":"🤝","fairness":"⚖️"};
document.querySelectorAll(".chip b").forEach(function(b){var e=ch[b.textContent.trim().toLowerCase()];if(e)b.insertAdjacentHTML("afterbegin","<span class='ce' aria-hidden='true'>"+e+"</span>")});

/* 4. Floating icons in the hero */
var hero=document.querySelector(".hero");
if(hero){var f=document.createElement("div");f.className="float";f.setAttribute("aria-hidden","true");f.innerHTML="<i>🔋</i><i>⚡</i><i>🚗</i><i>🌍</i><i>🍃</i>";hero.appendChild(f)}

/* 5. Count-up for big numbers (only plain numbers like 38,286 / 29.5% / 1.2 TWh) */
function count(el){
  var t=el.textContent.trim(),m=t.match(/^(\d[\d,]*\.?\d*)(.*)$/);
  if(!m||/[–-]/.test(t))return;
  var raw=m[1],dec=(raw.split(".")[1]||"").length,end=parseFloat(raw.replace(/,/g,"")),suf=m[2];
  if(end>=1900&&end<=2100&&!suf)return; /* skip years like 2027 */
  if(end<=5&&!dec&&!suf)return;          /* skip small level numbers */
  var t0=null,dur=1200;
  function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1),v=end*(1-Math.pow(1-p,3));
    el.textContent=v.toLocaleString("en-US",{minimumFractionDigits:dec,maximumFractionDigits:dec})+suf;
    if(p<1)requestAnimationFrame(step)}
  requestAnimationFrame(step);
}
if(!reduce){
  var co=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){count(x.target);co.unobserve(x.target)}})},{threshold:.6});
  document.querySelectorAll(".stat b,.cs b").forEach(function(e){co.observe(e)});
}

/* 6. Reading-progress bar + back-to-top button */
var bar=document.createElement("div");bar.id="pbar";document.body.appendChild(bar);
var up=document.createElement("button");up.id="toTop";up.type="button";up.setAttribute("aria-label","Back to top");up.textContent="↑";
up.onclick=function(){window.scrollTo({top:0,behavior:reduce?"auto":"smooth"})};document.body.appendChild(up);
function onScroll(){var d=document.documentElement,h=d.scrollHeight-d.clientHeight,y=window.scrollY||d.scrollTop;
  bar.style.width=(h>0?y/h*100:0)+"%";up.classList.toggle("show",y>400)}
addEventListener("scroll",onScroll,{passive:true});onScroll();
})();
