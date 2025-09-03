document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const navbarToggle = document.querySelector('.mobile-toggle');
  const navbarMenu = document.querySelector('.nav-menu');
  
  function toggleMobileMenu() {
    const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
    const newState = !isExpanded;
    
    navbarToggle.setAttribute('aria-expanded', String(newState));
    navbarMenu.classList.toggle('open', newState);
    
    // Animate toggle lines
    const toggleLines = navbarToggle.querySelectorAll('.hamburger-line');
    if (newState) {
      toggleLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      toggleLines[1].style.opacity = '0';
      toggleLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      toggleLines[0].style.transform = 'none';
      toggleLines[1].style.opacity = '1';
      toggleLines[2].style.transform = 'none';
    }
  }
  
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when nav link is clicked (mobile)
    navbarMenu.addEventListener('click', (e) => {
      if ((e.target.classList.contains('nav-link') || e.target.classList.contains('dropdown-link')) && window.innerWidth <= 768) {
        toggleMobileMenu();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navbarToggle.setAttribute('aria-expanded', 'false');
        navbarMenu.classList.remove('open');
        // Reset toggle lines
        const toggleLines = navbarToggle.querySelectorAll('.hamburger-line');
        toggleLines.forEach(line => {
          line.style.transform = 'none';
          line.style.opacity = '1';
        });
      }
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Keyboard navigation improvement
  document.body.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('user-is-tabbing');
    }
  });
  
  document.body.addEventListener('click', () => {
    document.documentElement.classList.remove('user-is-tabbing');
  });
  
  // Newsletter form handling
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input[type="email"]').value;
      const submitButton = this.querySelector('button[type="submit"]');
      const originalContent = submitButton.innerHTML;
      
      // Show loading state
      submitButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2v4l-1.5-1.5L12 2z"><animateTransform attributeName="transform" type="rotate" dur="1s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>';
      submitButton.disabled = true;
      
      // Simulate API call (replace with actual implementation)
      setTimeout(() => {
        // Success state
        submitButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.7 5.3l-9 9-4.7-4.7 1.4-1.4L12 11.8l7.6-7.6z"/></svg>';
        
        // Show success message
        const inputGroup = this.querySelector('.input-group');
        const successMsg = document.createElement('p');
        successMsg.textContent = 'Thank you! You\'ve been subscribed to our newsletter.';
        successMsg.style.cssText = 'color: #10B981; font-size: 0.85rem; margin-top: 0.5rem; text-align: center;';
        inputGroup.parentNode.insertBefore(successMsg, inputGroup.nextSibling);
        
        // Clear form
        this.querySelector('input[type="email"]').value = '';
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitButton.innerHTML = originalContent;
          submitButton.disabled = false;
          if (successMsg) successMsg.remove();
        }, 3000);
        
      }, 1500);
    });
  }
  
  // Enhanced Header scroll effects
  let lastScrollTop = 0;
  let ticking = false;
  const header = document.querySelector('.header');
  const headerTop = document.querySelector('.header-top');
  
  function updateHeader() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
    
    // Add/remove scrolled class for styling
    if (scrollTop > 50) {
      header.classList.add('scrolled');
      
      // Hide header-top on scroll down, show on scroll up
      if (scrollDirection === 'down' && scrollTop > 200) {
        headerTop.style.transform = 'translateY(-100%)';
        headerTop.style.opacity = '0';
      } else if (scrollDirection === 'up' || scrollTop <= 200) {
        headerTop.style.transform = 'translateY(0)';
        headerTop.style.opacity = '1';
      }
      
    } else {
      header.classList.remove('scrolled');
      headerTop.style.transform = 'translateY(0)';
      headerTop.style.opacity = '1';
    }
    
    // Add parallax effect to brand logo
    const brandLogo = document.querySelector('.brand-logo svg');
    if (brandLogo) {
      const offset = scrollTop * 0.1;
      brandLogo.style.transform = `translateY(${offset}px) rotate(${offset * 0.5}deg)`;
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
  }
  
  function requestUpdateHeader() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestUpdateHeader, { passive: true });
  
  // Add entrance animations for navigation items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.style.animation = 'slideInDown 0.6s ease forwards';
  });
  
  // Social media tracking (optional)
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
      // Add analytics tracking here if needed
      const platform = this.getAttribute('aria-label')?.toLowerCase() || 'social';
      console.log(`Social media click: ${platform}`);
    });
  });
  
  // Add loading states for forms
  const forms = document.querySelectorAll('form:not(.newsletter-form)');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
      }
    });
  });
  
  // Footer scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        footerObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe footer elements
  document.querySelectorAll('.footer-nav-column, .footer-brand').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    footerObserver.observe(el);
  });
  
  // Enhanced mobile navigation
  const handleMobileNavFocus = () => {
    if (window.innerWidth <= 768) {
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.05}s`;
        link.addEventListener('mouseenter', function() {
          this.style.transform = 'translateX(8px)';
        });
        link.addEventListener('mouseleave', function() {
          this.style.transform = 'translateX(0)';
        });
      });
    }
  };
  
  handleMobileNavFocus();
  window.addEventListener('resize', handleMobileNavFocus);
  
  // Add texture animation to header top
  const headerTopShimmer = () => {
    if (headerTop) {
      setTimeout(() => {
        headerTop.style.setProperty('--shimmer-delay', '3s');
        headerTop.classList.add('animate-shimmer');
      }, 2000);
    }
  };
  
  headerTopShimmer();
  
  // Homepage enhancements
  initHomepageFeatures();
  
  // Initialize dropdown functionality
  initDropdowns();
  
  // Hero Slideshow Functionality
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-nav-btn.prev');
  const nextBtn = document.querySelector('.hero-nav-btn.next');
  const totalSlides = heroSlides.length;
  let currentSlide = 0;
  let slideshowInterval;

  function showSlide(index) {
    // Remove active class from all slides and dots
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    heroSlides[index].classList.add('active');
    heroDots[index].classList.add('active');
    
    currentSlide = index;
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
  }

  function startSlideshow() {
    slideshowInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  function stopSlideshow() {
    clearInterval(slideshowInterval);
  }

  // Initialize slideshow
  if (heroSlides.length > 0) {
    showSlide(0); // Show first slide
    startSlideshow();

    // Navigation button event listeners
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideshow();
        startSlideshow();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideshow();
        startSlideshow();
      });
    }

    // Dot navigation event listeners
    heroDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        stopSlideshow();
        startSlideshow();
      });
    });

    // Pause slideshow on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', stopSlideshow);
      heroSection.addEventListener('mouseleave', startSlideshow);
    }

    // Add keyboard navigation for slideshow
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
        stopSlideshow();
        startSlideshow();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
        stopSlideshow();
        startSlideshow();
      }
    });
  }
});

// Homepage specific functionality
function initHomepageFeatures() {
  // Countdown timer
  initCountdownTimer();
  
  // Stats animation
  initStatsAnimation();
  
  // Hero animations
  initHeroAnimations();
}

function initCountdownTimer() {
  const conferenceDate = new Date('2026-07-30T00:00:00');
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = conferenceDate.getTime() - now;
    
    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      
      const daysEl = document.getElementById('days');
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      
      if (daysEl) daysEl.textContent = days.toString().padStart(3, '0');
      if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
      if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    }
  }
  
  // Update immediately and then every minute
  updateCountdown();
  setInterval(updateCountdown, 60000);
}

function initStatsAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateNumber(entry.target, 0, target, 2000);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
  const range = end - start;
  const startTime = performance.now();
  
  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Use easing function for smooth animation
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (range * easeOutCubic));
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = end; // Ensure final value is exact
    }
  }
  
  requestAnimationFrame(updateNumber);
}

function initHeroAnimations() {
  // Add entrance animations to hero elements
  const heroElements = document.querySelectorAll('.hero-content > *');
  
  heroElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    element.style.transitionDelay = `${index * 0.2}s`;
    
    // Trigger animation after a short delay
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 100);
  });
}

// Dropdown Navigation Functionality
function initDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    if (toggle) {
      // Handle click events
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close all other dropdowns
        dropdowns.forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('active');
            const otherToggle = otherDropdown.querySelector('.dropdown-toggle');
            if (otherToggle) {
              otherToggle.setAttribute('aria-expanded', 'false');
            }
          }
        });
        
        // Toggle current dropdown
        const isActive = dropdown.classList.contains('active');
        dropdown.classList.toggle('active');
        toggle.setAttribute('aria-expanded', !isActive);
      });
      
      // Handle keyboard navigation
      toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle.click();
        } else if (e.key === 'Escape') {
          dropdown.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.focus();
        }
      });
    }
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
  
  // Close dropdowns on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
}
