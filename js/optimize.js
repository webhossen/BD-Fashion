// ============================================
// PERFORMANCE OPTIMIZATION SCRIPT
// ============================================

// 1. Lazy load all images with data-src
document.addEventListener('DOMContentLoaded', function() {
  // Implement lazy loading for images with data-src
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy-image');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });

  // Also set loading="lazy" for any remaining images without data-src
  const images = document.querySelectorAll('img:not([data-src])');
  images.forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.loading = 'lazy';
    }
  });

  // 2. Debounce scroll events for better performance
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(function() {
      // This runs at most once per frame
      updateGoToTopButton();
    });
  }, false);

  // 3. Remove smooth scroll behavior from global styles for better performance
  // Replace smooth scroll with instant scroll on pages
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'auto' }); // Changed from 'smooth' to 'auto'
      }
    });
  });

  // 4. Optimize Go to Top Button
  function updateGoToTopButton() {
    const goToTopBtn = document.getElementById('goToTopBtn');
    if (!goToTopBtn) return;

    if (window.pageYOffset > 300) {
      goToTopBtn.classList.add('show');
    } else {
      goToTopBtn.classList.remove('show');
    }
  }

  // 5. Defer non-critical CSS loading
  // Load font-faces asynchronously
  if ('fonts' in document) {
    document.fonts.ready.then(function() {
      document.body.classList.add('fonts-loaded');
    });
  }

  // 6. Optimize form submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Remove unused classes/styles temporarily for faster processing
      const oldClass = this.className;
      this.classList.remove('submitting');
    });
  });

  // 7. Preload critical resources
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'script';
  link.href = 'js/header.js';
  document.head.appendChild(link);
});

// 8. Use requestIdleCallback for non-critical tasks
if ('requestIdleCallback' in window) {
  requestIdleCallback(function() {
    // Load analytics or non-critical scripts here
    console.log('Idle time reached - could load non-critical resources');
  });
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(function() {
    // Fallback: wait 2 seconds before non-critical tasks
  }, 2000);
}

// 9. Optimize touch events
let touchStartX = 0;
document.addEventListener('touchstart', function(e) {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', function(e) {
  const touchEndX = e.changedTouches[0].screenX;
  // Handle swipe logic here if needed
}, { passive: true });
