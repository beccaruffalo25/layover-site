(function(){
  // nav background on scroll
  var nav=document.getElementById('nav');
  if(nav){
    window.addEventListener('scroll',function(){
      nav.classList.toggle('on',window.scrollY>50);
    });
  }
})();