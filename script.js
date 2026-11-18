// Small enhancements only: the site works without JavaScript.
(function(){
  var root=document.documentElement;
  // Theme toggle (remembers choice where storage is available)
  try{var saved=localStorage.getItem('theme');if(saved)root.setAttribute('data-theme',saved);}catch(e){}
  var btn=document.getElementById('theme');
  function isDark(){var t=root.getAttribute('data-theme');return t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;}
  function label(){btn.textContent=isDark()?'Light mode':'Dark mode';btn.setAttribute('aria-pressed',String(isDark()));}
  if(btn){label();btn.addEventListener('click',function(){var n=isDark()?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n);}catch(e){}label();});}
  // Expand / collapse all case studies
  var cases=document.querySelectorAll('.case');
  var tog=document.getElementById('toggle-cases');
  if(tog){tog.addEventListener('click',function(){
    var open=Array.prototype.some.call(cases,function(c){return !c.open;});
    cases.forEach(function(c){c.open=open;});
    tog.textContent=open?'Collapse all':'Expand all';
  });}
  // Highlight current section in the nav
  var links=document.querySelectorAll('.nav ul a');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){links.forEach(function(a){
        var on=a.getAttribute('href')==='#'+e.target.id;
        a.classList.toggle('active',on);if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});}
    });},{rootMargin:'-40% 0px -55% 0px'});
    document.querySelectorAll('main section[id]').forEach(function(s){io.observe(s);});
  }
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
