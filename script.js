
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.character-content').forEach(content => {
    observer.observe(content);
  });
  
  const triviaButtons = document.querySelectorAll('.trivia-toggle');
  
  triviaButtons.forEach(button => {
    button.addEventListener('click', function() {
      const character = this.getAttribute('data-character');
      const triviaContent = document.getElementById(`${character}-trivia`);
      
      if (triviaContent.classList.contains('hidden')) {

        triviaContent.classList.remove('hidden');
        this.textContent = 'ESCONDER';
      } else {
     
        triviaContent.classList.add('hidden');
        this.textContent = 'REVELAR';
      }
    });
  });
  

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    });
  });
  
  let lastScrollPosition = window.scrollY;
  let ticking = false;
  
  function updateScroll() {
    const scrollPosition = lastScrollPosition;
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      heroContent.style.opacity = Math.max(0, 1 - (scrollPosition * 0.002));
    }
    
    ticking = false;
  }
  
  window.addEventListener('scroll', function() {
    lastScrollPosition = window.scrollY;
    
    if (!ticking) {
      window.requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });
});
