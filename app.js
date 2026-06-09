document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initParticles();
  initScrollEffects();
  initCounters();
});

/* =========================================================================
   1. CUSTOM PHYSICS-BASED CURSOR
   ========================================================================= */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  const bgLogo = document.getElementById('heroBgLogo');
  
  if (!cursor || !cursorRing) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  
  // Background logo parallax coordinates
  let bgTargetX = 0;
  let bgTargetY = 0;
  let bgCurrentX = 0;
  let bgCurrentY = 0;
  
  // Track mouse movement
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediately position the inner dot
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    
    // Calculate parallax offset for background logo (move opposite to cursor for depth)
    if (bgLogo) {
      bgTargetX = (e.clientX - window.innerWidth / 2) * -0.04;
      bgTargetY = (e.clientY - window.innerHeight / 2) * -0.04;
    }
  });

  // Spring physics interpolation loop for the outer ring and background parallax
  function tick() {
    // 0.15 is the easing factor, creating the smooth lag effect
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    
    // Smoothly interpolate background logo position
    if (bgLogo) {
      bgCurrentX += (bgTargetX - bgCurrentX) * 0.06;
      bgCurrentY += (bgTargetY - bgCurrentY) * 0.06;
      bgLogo.style.transform = `translate(-50%, -50%) translate(${bgCurrentX}px, ${bgCurrentY}px)`;
    }
    
    requestAnimationFrame(tick);
  }
  tick();

  // Add scale/expand states when hovering over interactive elements
  const interactives = document.querySelectorAll('a, button, .gi, .pcard, input, textarea');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)';
      cursorRing.style.borderColor = 'rgba(255, 255, 255, 1)';
      cursorRing.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.borderColor = 'rgba(255, 255, 255, 0.5)';
      cursorRing.style.backgroundColor = 'transparent';
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });
}

/* =========================================================================
   2. FLOATING BACKGROUND PARTICLES
   ========================================================================= */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const particleCount = 40;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    
    // Distribute randomly across the screen width
    p.style.left = `${Math.random() * 100}vw`;
    
    // Randomize initial vertical position to stagger entry
    p.style.top = `${Math.random() * 100}vh`;
    
    // Stagger sizes slightly
    const size = Math.random() * 2.5 + 0.5;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    
    // Vary animations speeds and delays
    const duration = Math.random() * 15 + 15; // 15s - 30s
    const delay = Math.random() * -30; // Negative delay starts animation midway
    
    p.style.animationDuration = `${duration}s`;
    p.style.animationDelay = `${delay}s`;
    p.style.opacity = (Math.random() * 0.4 + 0.1).toString();
    
    fragment.appendChild(p);
  }

  container.appendChild(fragment);
}

/* =========================================================================
   3. SCROLL EFFECTS (NAVBAR, FLOATING CTA, SCROLL-REVEAL)
   ========================================================================= */
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  const floatCta = document.getElementById('floatCta');
  const revealElements = document.querySelectorAll('.ag');

  // Handle Navbar and Floating CTA visibility on scroll
  const handleScroll = () => {
    const scrollPos = window.scrollY;

    // Navbar scrolled class
    if (navbar) {
      if (scrollPos > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Floating CTA show class
    if (floatCta) {
      if (scrollPos > 300) {
        floatCta.classList.add('show');
      } else {
        floatCta.classList.remove('show');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger once on mount

  // Scroll Reveal using IntersectionObserver
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.12 // Trigger when 12% of element is in view
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* =========================================================================
   4. STATS COUNT-UP ANIMATION
   ========================================================================= */
function initCounters() {
  const countElements = document.querySelectorAll('.hero-counter .count');
  
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-target') || '250', 10);
    const duration = 2000; // 2 seconds
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const countUp = () => {
      currentFrame++;
      // Ease out cubic function: f(t) = 1 - (1 - t)^3
      const progress = currentFrame / totalFrames;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(easeProgress * target);
      
      el.textContent = `${currentVal}+`;

      if (currentFrame < totalFrames) {
        requestAnimationFrame(countUp);
      } else {
        el.textContent = `${target}+`;
      }
    };
    
    countUp();
  };

  // Observe the counters to trigger when scrolled into view
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  countElements.forEach(el => observer.observe(el));
}
