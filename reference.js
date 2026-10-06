/* ═══════════════════════════════════════════════════
   AJAY PORTFOLIO — JAVASCRIPT ENGINE
   All interactions, animations, and effects
═══════════════════════════════════════════════════ */

'use strict';

// ────────────────────────────────────────────────
// LOADER
// ────────────────────────────────────────────────
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
const loaderPercent = document.getElementById('loaderPercent');
const loaderLines = document.querySelectorAll('.loader-line');

let progress = 0;
let dynamicDataLoaded = false;

// Trigger parallel API fetches immediately
loadDynamicData().finally(() => {
  dynamicDataLoaded = true;
});

const loaderMessages = [
  { id: 'l1', delay: 0 },
  { id: 'l2', delay: 600 },
  { id: 'l3', delay: 1200 },
  { id: 'l4', delay: 1800 },
];

loaderMessages.forEach(({ id, delay }) => {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.classList.add('show');
  }, delay);
});

const loaderInterval = setInterval(() => {
  // Cap the loader at 95% if dynamic content is still loading
  if (!dynamicDataLoaded) {
    progress = Math.min(progress + Math.random() * 6, 95);
  } else {
    progress += Math.random() * 12 + 4;
  }

  if (progress >= 100 && dynamicDataLoaded) {
    progress = 100;
    clearInterval(loaderInterval);
    setTimeout(() => {
      loader.classList.add('done');
      document.body.style.overflow = '';
      initAll();
    }, 300);
  }
  loaderBar.style.width = progress + '%';
  loaderPercent.textContent = Math.floor(progress) + '%';
}, 100);

document.body.style.overflow = 'hidden';

// ────────────────────────────────────────────────
// INIT ALL
// ────────────────────────────────────────────────
function initAll() {
  initCursor();
  initParticles();
  initTypewriter();
  initNavbar();
  initReveal();
  initSkillBars();
  initCounters();
  initProjectFilter();
  initTestimonials();
  initContactForm();
  initOrbitCSS();
  initFooterYear();
  initMobileNav();
  initTheme();
  initCardTilt();
  initCardGlow();
}

// ────────────────────────────────────────────────
// CUSTOM CURSOR
// ────────────────────────────────────────────────
function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  let mx = 0, my = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';

    // Trailing effect with slight delay
    setTimeout(() => {
      trail.style.left = mx + 'px';
      trail.style.top = my + 'px';
    }, 80);
  });

  document.addEventListener('mousedown', () => cursor.classList.add('click'));
  document.addEventListener('mouseup', () => cursor.classList.remove('click'));

  // Hover detection
  const hoverTargets = document.querySelectorAll(
    'a, button, .skill-card, .project-card, .contact-channel, .filter-btn, .name-char, .timeline-content'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Hide on leave
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; trail.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; trail.style.opacity = '1'; });
}

// ────────────────────────────────────────────────
// PARTICLE CANVAS
// ────────────────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -999, y: -999 };

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); createParticles(); });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.size = Math.random() * 1.5 + 0.3;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.hue = (window._particleHue || 190) + (Math.random() > 0.8 ? 30 : 0);
    }
    update() {
      // Mouse repulsion
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x -= dx * force * 0.04;
        this.y -= dy * force * 0.04;
      }

      // Drift back
      this.x += (this.baseX - this.x) * 0.01 + this.vx;
      this.y += (this.baseY - this.y) * 0.01 + this.vy;
      this.baseX += this.vx;
      this.baseY += this.vy;

      if (this.baseX < 0 || this.baseX > W) this.vx *= -1;
      if (this.baseY < 0 || this.baseY > H) this.vy *= -1;
    }
    draw() {
      const h = window._particleHue || 190;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${h + (Math.random() > 0.8 ? 20 : 0)}, 80%, 70%, ${this.opacity})`;
      ctx.fill();
    }
  }

  function createParticles() {
    const count = Math.min(120, Math.floor((W * H) / 8000));
    particles = Array.from({ length: count }, () => new Particle());
  }
  createParticles();

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  function drawConnections() {
    const h = window._particleHue || 190;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `hsla(${h}, 80%, 65%, ${(1 - d / 100) * 0.1})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
}

// ────────────────────────────────────────────────
// TYPEWRITER EFFECT
// ────────────────────────────────────────────────
function initTypewriter() {
  const roleText = document.getElementById('roleText');
  if (!roleText) return;

  const roles = [
    'Full Stack Developer',
    'React Architect',
    'Node.js Engineer',
    'Python Developer',
    'Database Designer',
    'API Builder',
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      roleText.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isPaused = true;
        setTimeout(() => { isPaused = false; isDeleting = true; }, 2200);
        return;
      }
    } else {
      roleText.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    if (!isPaused) {
      const speed = isDeleting ? 45 : 90;
      setTimeout(type, speed);
    }
  }

  setTimeout(type, 800);
}

// ────────────────────────────────────────────────
// NAVBAR
// ────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    updateActiveNav();
  });

  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === id) link.classList.add('active');
        });
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      scrollToSection(section);
    });
  });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  closeMobileNav();
}

// ────────────────────────────────────────────────
// MOBILE NAV
// ────────────────────────────────────────────────
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('mobileOverlay');

  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    hamburger.classList.toggle('open', isOpen);
    overlay.classList.toggle('show', isOpen);
  });

  overlay?.addEventListener('click', closeMobileNav);
}

function closeMobileNav() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileOverlay');
  navLinks?.classList.remove('mobile-open');
  hamburger?.classList.remove('open');
  overlay?.classList.remove('show');
}

// ────────────────────────────────────────────────
// REVEAL ON SCROLL (Intersection Observer)
// ────────────────────────────────────────────────
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) : 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
          // Trigger skill bars when skills section reveals
          if (entry.target.closest('#skills')) activateSkillBars();
          // Trigger counters when hero stats reveal
          if (entry.target.classList.contains('hero-stats') || entry.target.closest('.hero-stats')) activateCounters();
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// ────────────────────────────────────────────────
// SKILL BARS
// ────────────────────────────────────────────────
let skillBarsActivated = false;
function initSkillBars() {
  // Will be triggered by reveal
}
function activateSkillBars() {
  if (skillBarsActivated) return;
  skillBarsActivated = true;
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const width = bar.dataset.width;
    setTimeout(() => { bar.style.width = width + '%'; }, 100);
  });
}

// Also activate when skills section enters viewport
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { activateSkillBars(); skillObserver.disconnect(); }
    });
  }, { threshold: 0.2 });
  skillObserver.observe(skillsSection);
}

// ────────────────────────────────────────────────
// COUNTER ANIMATION
// ────────────────────────────────────────────────
let countersActivated = false;
function initCounters() {
  // Will be triggered by reveal or intersection
  const heroSection = document.getElementById('home');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { activateCounters(); observer.disconnect(); }
    });
  }, { threshold: 0.5 });
  if (heroSection) observer.observe(heroSection);
}
function activateCounters() {
  if (countersActivated) return;
  countersActivated = true;
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 40);
  });
}

// ────────────────────────────────────────────────
// PROJECT FILTER
// ────────────────────────────────────────────────
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach((card, i) => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = `fade-in 0.4s ease ${i * 0.05}s both`;
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ────────────────────────────────────────────────
// TESTIMONIALS SLIDER
// ────────────────────────────────────────────────
function initTestimonials() {
  const track = document.getElementById('testimonialTrack');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (!track) return;

  let current = 0;
  const total = track.children.length;
  let autoTimer;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }
  function stopAuto() { clearInterval(autoTimer); }

  prevBtn?.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
  dots.forEach(dot => {
    dot.addEventListener('click', () => { stopAuto(); goTo(parseInt(dot.dataset.index)); startAuto(); });
  });

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; stopAuto(); }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
    startAuto();
  }, { passive: true });

  startAuto();
}

// ────────────────────────────────────────────────
// CONTACT FORM
// ────────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    name: { el: document.getElementById('contactName'), error: document.getElementById('nameError'), validate: v => v.trim().length >= 2 ? '' : 'Please enter your name (min 2 chars)' },
    email: { el: document.getElementById('contactEmail'), error: document.getElementById('emailError'), validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email' },
    subject: { el: document.getElementById('contactSubject'), error: document.getElementById('subjectError'), validate: v => v.trim().length >= 3 ? '' : 'Subject too short' },
    message: { el: document.getElementById('contactMessage'), error: document.getElementById('messageError'), validate: v => v.trim().length >= 10 ? '' : 'Message too short (min 10 chars)' },
  };

  // Real-time validation
  Object.values(fields).forEach(({ el, error, validate }) => {
    el?.addEventListener('blur', () => {
      const msg = validate(el.value);
      error.textContent = msg;
      el.classList.toggle('error', !!msg);
    });
    el?.addEventListener('input', () => {
      if (el.classList.contains('error')) {
        const msg = validate(el.value);
        error.textContent = msg;
        el.classList.toggle('error', !!msg);
      }
    });
  });

  const submitBtn = document.getElementById('formSubmitBtn');
  const submitText = submitBtn?.querySelector('.submit-text');
  const submitIcon = submitBtn?.querySelector('.submit-icon');
  const submitLoading = submitBtn?.querySelector('.submit-loading');
  const formSuccess = document.getElementById('formSuccess');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all
    let hasError = false;
    Object.values(fields).forEach(({ el, error, validate }) => {
      const msg = validate(el.value);
      error.textContent = msg;
      el.classList.toggle('error', !!msg);
      if (msg) hasError = true;
    });
    if (hasError) return;

    // Show loading
    submitText.style.display = 'none';
    submitIcon.style.display = 'none';
    submitLoading.style.display = 'flex';
    submitBtn.disabled = true;

    // Send form data to real API endpoint
    try {
      const response = await fetch('api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(new FormData(form)).toString()
      });
      const data = await response.json();
      
      if (data.success) {
        // Show success
        submitLoading.style.display = 'none';
        submitText.style.display = '';
        submitIcon.style.display = '';
        submitBtn.disabled = false;
        form.reset();
        formSuccess.style.display = 'flex';
        setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      alert('⚠️ Failed to send message: ' + err.message);
      submitLoading.style.display = 'none';
      submitText.style.display = '';
      submitIcon.style.display = '';
      submitBtn.disabled = false;
    }
  });
}

// ────────────────────────────────────────────────
// ORBIT CSS FIX (Counter-rotate text)
// ────────────────────────────────────────────────
function initOrbitCSS() {
  // Fix orbit item counter-rotation to read correctly
  document.querySelectorAll('.orbit-item').forEach(item => {
    const angle = item.style.getPropertyValue('--angle');
    const dot = item.querySelector('.orbit-dot');
    if (dot) {
      dot.style.setProperty('--angle', angle);
    }
  });
}

// ────────────────────────────────────────────────
// FOOTER YEAR
// ────────────────────────────────────────────────
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

// ────────────────────────────────────────────────
// DOWNLOAD CV
// ────────────────────────────────────────────────
function downloadCV(e) {
  e.preventDefault();
  // Create a simple text file as placeholder CV
  const cvContent = `AJAY
Full Stack Developer
Email: ajay@example.com
LinkedIn: linkedin.com/in/ajay
GitHub: github.com/ajay

SKILLS
Frontend: React.js, Next.js, TypeScript, HTML5/CSS3
Backend: Node.js, Express.js, Python, FastAPI
Database: PostgreSQL, MongoDB, MySQL, Redis
DevOps: Docker, AWS, CI/CD, Linux

EXPERIENCE
Full Stack Developer | Freelance | 2023–Present
Backend Developer | Digital Agency | 2022–2023
Junior Developer | Software Company | 2021–2022

PROJECTS
• SaaS Analytics Dashboard (React, Node.js, PostgreSQL, Redis)
• E-Commerce Platform (Next.js, Python, MongoDB, Stripe)
• Microservices API Gateway (Node.js, Docker, Redis)
• Real-time Social App (React, TypeScript, Socket.io, Firebase)
`;
  const blob = new Blob([cvContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Ajay_Resume.txt';
  a.click();
  URL.revokeObjectURL(url);
}

// ────────────────────────────────────────────────
// PARALLAX on hero name chars
// ────────────────────────────────────────────────
document.addEventListener('mousemove', (e) => {
  const chars = document.querySelectorAll('.name-char');
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  chars.forEach((char, i) => {
    const factor = (i + 1) * 2.5;
    char.style.textShadow = `${dx * factor}px ${dy * factor}px 0 rgba(0,212,255,0.3)`;
  });

  // Parallax floating code
  document.querySelectorAll('.floating-code').forEach((fc, i) => {
    const f = (i + 1) * 8;
    fc.style.transform = `translate(${dx * f}px, ${dy * f}px) rotate(${i === 0 ? -1 : 1}deg)`;
  });
});

// ────────────────────────────────────────────────
// MAGNETIC EFFECT on buttons
// ────────────────────────────────────────────────
document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.2;
    const dy = (e.clientY - cy) * 0.2;
    btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px) scale(1.02)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ────────────────────────────────────────────────
// GLITCH EFFECT on hero name hover
// ────────────────────────────────────────────────
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.addEventListener('mouseenter', () => {
    heroName.style.animation = 'none';
    heroName.offsetHeight;
    // Brief glitch
    let count = 0;
    const glitch = setInterval(() => {
      const randomX = (Math.random() - 0.5) * 4;
      heroName.style.textShadow = `${randomX}px 0 var(--accent), ${-randomX}px 0 rgba(168,85,247,0.5)`;
      count++;
      if (count > 6) {
        clearInterval(glitch);
        heroName.style.textShadow = '';
      }
    }, 60);
  });
}

// ────────────────────────────────────────────────
// BACK TO TOP visibility
// ────────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (backToTop) {
    backToTop.style.opacity = window.scrollY > 600 ? '1' : '0';
    backToTop.style.pointerEvents = window.scrollY > 600 ? 'all' : 'none';
  }
});
if (backToTop) { backToTop.style.opacity = '0'; backToTop.style.transition = 'opacity 0.3s'; }

// ────────────────────────────────────────────────
// TILT EFFECT on project cards
// ────────────────────────────────────────────────
function initCardTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * 4;
      const ry = -((e.clientX - cx) / (rect.width / 2)) * 4;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1), border-color 0.4s, box-shadow 0.4s';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}

// ────────────────────────────────────────────────
// SKILL CARD GLOW on hover
// ────────────────────────────────────────────────
function initCardGlow() {
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });
}

// ────────────────────────────────────────────────
// THEME TOGGLE SYSTEM — 4 Themes Cycler
// ────────────────────────────────────────────────
const THEMES = [
  {
    id: 'cyber-blue',
    label: 'Cyber Blue',
    accent: '#00d4ff',
    glow: 'rgba(0,212,255,0.5)',
    particleHue: 190,
    emoji: '💙',
  },
  {
    id: 'neon-purple',
    label: 'Neon Purple',
    accent: '#a855f7',
    glow: 'rgba(168,85,247,0.5)',
    particleHue: 270,
    emoji: '💜',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    accent: '#10b981',
    glow: 'rgba(16,185,129,0.5)',
    particleHue: 160,
    emoji: '💚',
  },
  {
    id: 'amber',
    label: 'Amber Gold',
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.5)',
    particleHue: 38,
    emoji: '🟡',
  },
  {
    id: 'light',
    label: 'Clean Light',
    accent: '#4f46e5',
    glow: 'rgba(79,70,229,0.5)',
    particleHue: 240,
    emoji: '☀️',
  },
];

let currentThemeIndex = 0;
let toastTimer = null;
// Store current particle hue so the canvas can pick it up
window._particleHue = THEMES[0].particleHue;

function initTheme() {
  // Restore saved theme
  const saved = localStorage.getItem('portfolio-theme');
  if (saved) {
    const idx = THEMES.findIndex(t => t.id === saved);
    if (idx !== -1) {
      currentThemeIndex = idx;
      applyTheme(THEMES[idx], false); // silent on load
    }
  } else {
    updateToggleUI(THEMES[0]);
  }

  const btn = document.getElementById('themeToggle');
  btn?.addEventListener('click', cycleTheme);
}

function cycleTheme() {
  currentThemeIndex = (currentThemeIndex + 1) % THEMES.length;
  const theme = THEMES[currentThemeIndex];
  applyTheme(theme, true);
  localStorage.setItem('portfolio-theme', theme.id);
}

function applyTheme(theme, animate) {
  // 1. Set data-theme on html element
  document.documentElement.setAttribute('data-theme', theme.id);

  // 2. Update particle hue
  window._particleHue = theme.particleHue;

  // 3. Update toggle button UI
  updateToggleUI(theme);

  if (!animate) return;

  // 4. Ripple animation from button
  const btn = document.getElementById('themeToggle');
  if (btn) {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const size = Math.max(window.innerWidth, window.innerHeight) * 2;

    const ripple = document.createElement('div');
    ripple.className = 'theme-ripple';
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${cx - size / 2}px;
      top: ${cy - size / 2}px;
      background: ${theme.accent};
    `;
    document.body.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  // 5. Spin the icon
  const icon = document.querySelector('.theme-toggle-icon');
  if (icon) {
    icon.classList.remove('spinning');
    void icon.offsetWidth; // reflow
    icon.classList.add('spinning');
    icon.addEventListener('animationend', () => icon.classList.remove('spinning'), { once: true });
  }

  // 6. Show toast
  showThemeToast(theme);
}

function updateToggleUI(theme) {
  const label = document.getElementById('themeLabel');
  const swatch = document.getElementById('themeSwatch');
  if (label) label.textContent = theme.label;
  if (swatch) {
    swatch.style.background = theme.accent;
    swatch.style.boxShadow = `0 0 8px ${theme.glow}`;
  }
}

function showThemeToast(theme) {
  // Remove existing toast
  const existing = document.getElementById('themeToast');
  if (existing) existing.remove();
  clearTimeout(toastTimer);

  const toast = document.createElement('div');
  toast.className = 'theme-toast';
  toast.id = 'themeToast';
  toast.innerHTML = `
    <span class="theme-toast-dot" style="background:${theme.accent};box-shadow:0 0 8px ${theme.glow}"></span>
    <span>${theme.emoji} Theme switched to <strong>${theme.label}</strong></span>
  `;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  // Auto-dismiss
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}

// ────────────────────────────────────────────────
// DYNAMIC PORTFOLIO DATA RENDERER
// ────────────────────────────────────────────────

async function loadDynamicData() {
  try {
    const urls = {
      settings: 'api/settings.php',
      hero: 'api/hero.php',
      about: 'api/about.php',
      skills: 'api/skills.php',
      projects: 'api/projects.php',
      experience: 'api/experience.php',
      testimonials: 'api/testimonials.php'
    };

    // Fetch all concurrently
    const [settings, hero, about, skills, projects, experience, testimonials] = await Promise.all(
      Object.entries(urls).map(([key, url]) => fetch(url).then(res => res.json()))
    );

    // 1. POPULATE GLOBAL SETTINGS & SOCIAL LINKS
    applySettings(settings);

    // 2. POPULATE HERO SECTION
    applyHero(hero, settings);

    // 3. POPULATE ABOUT SECTION
    applyAbout(about, settings);

    // 4. POPULATE SKILLS SECTION
    applySkills(skills);

    // 5. POPULATE PROJECTS SECTION
    applyProjects(projects);

    // 6. POPULATE EXPERIENCE SECTION
    applyExperience(experience);

    // 7. POPULATE TESTIMONIALS SECTION
    applyTestimonials(testimonials);

  } catch (err) {
    console.error('Failed to load dynamic portfolio data:', err);
    // Silent fail so page falls back to static content if network is down
  }
}

function applySettings(settings) {
  if (!settings) return;
  
  // Social Links
  const githubs = document.querySelectorAll('.github-link, #githubLink, #footerGithub');
  githubs.forEach(el => el.href = settings.github_url || 'https://github.com');

  const linkedins = document.querySelectorAll('.linkedin-link, #linkedinLink, #footerLinkedin');
  linkedins.forEach(el => el.href = settings.linkedin_url || 'https://linkedin.com/in/ajay');

  const emails = document.querySelectorAll('.email-link, #emailLink, #footerEmail');
  emails.forEach(el => {
    el.href = `mailto:${settings.email || 'ajay@example.com'}`;
    const span = el.querySelector('span');
    if (span && span.textContent.includes('@')) {
      span.textContent = settings.email;
    }
  });

  // Footer Tagline
  const footerTagline = document.getElementById('footerTagline');
  if (footerTagline) {
    footerTagline.innerHTML = settings.footer_tagline || 'Full Stack Developer · Building the web, one component at a time.';
  }

  // Availability Badge status
  const availText = document.getElementById('heroAvailabilityText');
  const contactAvailText = document.getElementById('contactAvailabilityText');
  const contactAvailCard = document.getElementById('contactAvailabilityCard');
  const heroAvailTag = document.getElementById('heroAvailabilityTag');

  const isAvailable = settings.available === true || settings.available === '1' || settings.available === 1;
  const availMsg = settings.available_text || 'Currently available for freelance & full-time roles';

  if (isAvailable) {
    if (heroAvailTag) heroAvailTag.style.display = 'inline-flex';
    if (contactAvailCard) contactAvailCard.style.display = 'flex';
    if (availText) availText.textContent = 'Available for work';
    if (contactAvailText) contactAvailText.textContent = availMsg;
  } else {
    if (heroAvailTag) heroAvailTag.style.display = 'none';
    if (contactAvailCard) contactAvailCard.style.display = 'none';
  }
}

function applyHero(hero, settings) {
  if (!hero) return;

  // Greeting
  const greetingEl = document.getElementById('heroGreeting');
  if (greetingEl) {
    greetingEl.textContent = hero.greeting || "Hello, I'm";
  }

  // Dynamic Name Characters
  const nameEl = document.getElementById('heroName');
  if (nameEl) {
    const name = hero.name || 'AJAY';
    nameEl.innerHTML = name.split('').map(char => 
      `<span class="name-char" data-char="${char}">${char}</span>`
    ).join('');
  }

  // Description
  const descEl = document.getElementById('heroDesc');
  if (descEl) {
    descEl.innerHTML = hero.description || 'I architect <span class="accent">full-stack experiences</span> that scale...';
  }

  // CV Url
  const cvBtn = document.getElementById('downloadCV');
  if (cvBtn) {
    if (hero.cv_url) {
      cvBtn.href = hero.cv_url;
      cvBtn.removeAttribute('onclick'); // remove placeholder CV download script
      cvBtn.setAttribute('target', '_blank');
    }
  }

  // Hero Stats
  const statYears = document.getElementById('heroStatYears');
  const statProjects = document.getElementById('heroStatProjects');
  const statTech = document.getElementById('heroStatTech');

  if (statYears) statYears.setAttribute('data-target', (hero.stats && hero.stats.years) || hero.stats_years || '3');
  if (statProjects) statProjects.setAttribute('data-target', (hero.stats && hero.stats.projects) || hero.stats_projects || '20');
  if (statTech) statTech.setAttribute('data-target', (hero.stats && hero.stats.tech) || hero.stats_tech || '10');
}

function applyAbout(about, settings) {
  if (!about) return;

  const leadEl = document.getElementById('aboutLead');
  if (leadEl) {
    leadEl.innerHTML = about.lead || "I'm a <span class='accent'>Full Stack Developer</span> who bridges the gap...";
  }

  const parasEl = document.getElementById('aboutParagraphs');
  if (parasEl && about.paragraphs) {
    parasEl.innerHTML = about.paragraphs.map(para => 
      `<p class="about-body">${para}</p>`
    ).join('');
  }

  const photoEl = document.getElementById('aboutPhotoPlaceholder');
  if (photoEl && about.avatar_url) {
    photoEl.innerHTML = `
      <img src="${about.avatar_url}" alt="Ajay" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; z-index: 5; position: relative; border: 2px solid rgba(255,255,255,0.1);">
      <div class="avatar-ring"></div>
      <div class="avatar-ring ring2"></div>
      <div class="avatar-ring ring3"></div>
    `;
  }

  const highlightsEl = document.getElementById('aboutHighlights');
  if (highlightsEl) {
    // Generate highlights dynamically
    let hls = about.highlights || [];
    if (hls.length === 0) {
      hls = [
        { icon: '⚡', title: 'Performance-first', desc: 'Every millisecond counts in user experience' },
        { icon: '🧩', title: 'Systems thinker', desc: 'Architecture that scales with your ambitions' },
        { icon: '🎨', title: 'Design-aware', desc: 'Code that respects the craft of design' }
      ];
    }

    highlightsEl.innerHTML = hls.map(hl => `
      <div class="highlight-item">
        <span class="highlight-icon">${escapeHTML(hl.icon)}</span>
        <div>
          <strong>${escapeHTML(hl.title)}</strong>
          <span>${escapeHTML(hl.desc)}</span>
        </div>
      </div>
    `).join('');
  }
}

function applySkills(skills) {
  const gridEl = document.getElementById('skillsGrid');
  if (!gridEl || !skills || skills.length === 0) return;

  const FEATHER_ICONS = {
    layers: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    monitor: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    database: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0018 0V5"/><path d="M3 12a9 3 0 0018 0"/></svg>`,
    'bar-chart': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`,
    code: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
  };

  gridEl.innerHTML = skills.map((sk, index) => {
    const delay = index * 100;
    const svgIcon = FEATHER_ICONS[sk.icon_id] || FEATHER_ICONS['code'];
    const tagsHTML = sk.tags.map(t => `<span class="skill-tag">${escapeHTML(t)}</span>`).join('');

    return `
      <div class="skill-card reveal-up" data-delay="${delay}">
        <div class="skill-card-icon">
          ${svgIcon}
        </div>
        <h3>${escapeHTML(sk.title)}</h3>
        <div class="skill-tags">
          ${tagsHTML}
        </div>
        <div class="skill-bar-wrap">
          <div class="skill-bar-label"><span>Proficiency</span><span>${sk.proficiency}%</span></div>
          <div class="skill-bar"><div class="skill-bar-fill" data-width="${sk.proficiency}"></div></div>
        </div>
      </div>
    `;
  }).join('');
}

function applyProjects(projects) {
  const gridEl = document.getElementById('projectsGrid');
  if (!gridEl || !projects || projects.length === 0) return;

  gridEl.innerHTML = projects.map((p, index) => {
    const isFeatured = index === 0 ? 'featured' : '';
    const delay = index * 100;
    
    // Mockup content based on type
    let mockupHTML = '';
    if (p.mockup_type === 'dashboard') {
      mockupHTML = `
        <div class="project-mockup mockup-dashboard">
          <div class="mock-bar"><span></span><span></span><span></span></div>
          <div class="mock-content">
            <div class="mock-sidebar"></div>
            <div class="mock-main">
              <div class="mock-card"></div>
              <div class="mock-card"></div>
              <div class="mock-chart">
                <div class="chart-bar" style="height:60%"></div>
                <div class="chart-bar" style="height:80%"></div>
                <div class="chart-bar" style="height:45%"></div>
                <div class="chart-bar" style="height:95%"></div>
                <div class="chart-bar" style="height:70%"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (p.mockup_type === 'ecom') {
      mockupHTML = `
        <div class="project-mockup mockup-ecom">
          <div class="mock-bar"><span></span><span></span><span></span></div>
          <div class="mock-content ecom-layout">
            <div class="mock-product-card"></div>
            <div class="mock-product-card"></div>
            <div class="mock-product-card"></div>
          </div>
        </div>
      `;
    } else if (p.mockup_type === 'api') {
      mockupHTML = `
        <div class="project-mockup mockup-api">
          <div class="mock-bar"><span></span><span></span><span></span></div>
          <div class="mock-content api-layout">
            <div class="api-endpoint"><span class="http-method get">GET</span><span class="endpoint-path">/api/v1/users</span></div>
            <div class="api-endpoint"><span class="http-method post">POST</span><span class="endpoint-path">/api/v1/auth</span></div>
            <div class="api-endpoint"><span class="http-method put">PUT</span><span class="endpoint-path">/api/v1/data</span></div>
            <div class="api-response"><span class="response-status">200 OK</span></div>
          </div>
        </div>
      `;
    } else if (p.mockup_type === 'social') {
      mockupHTML = `
        <div class="project-mockup mockup-social">
          <div class="mock-bar"><span></span><span></span><span></span></div>
          <div class="mock-content social-layout">
            <div class="mock-avatar-row">
              <div class="mock-avatar"></div>
              <div class="mock-avatar-text"></div>
            </div>
            <div class="mock-post-img"></div>
            <div class="mock-actions"><span>♥</span><span>💬</span><span>↗</span></div>
          </div>
        </div>
      `;
    }

    const techHTML = p.tech.map(t => `<span>${escapeHTML(t)}</span>`).join('');
    const liveLinkHTML = p.live_url && p.live_url !== '#' ? `
      <a href="${p.live_url}" target="_blank" class="project-link" aria-label="View live demo">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
        Live Demo
      </a>
    ` : '';
    
    const gitLinkHTML = p.github_url && p.github_url !== '#' ? `
      <a href="${p.github_url}" target="_blank" class="project-link ghost" aria-label="View source code">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
        GitHub
      </a>
    ` : '';

    const hasCreds = p.demo_username || p.demo_password;
    const credsHTML = hasCreds ? `
      <div class="project-credentials">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="cred-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <span class="cred-label">Demo Login:</span>
        <span class="cred-values">
          ${p.demo_username ? `<code>${escapeHTML(p.demo_username)}</code>` : ''}
          ${p.demo_username && p.demo_password ? ' / ' : ''}
          ${p.demo_password ? `<code>${escapeHTML(p.demo_password)}</code>` : ''}
        </span>
      </div>
    ` : '';

    return `
      <article class="project-card ${isFeatured} reveal-up" data-category="${p.category}" data-delay="${delay}">
        <div class="project-card-inner">
          <div class="project-visual">
            <div class="project-bg" style="--p-color: ${p.accent_color};"></div>
            ${mockupHTML}
          </div>
          <div class="project-info">
            <div class="project-meta">
              <span class="project-num">${escapeHTML(p.number)}</span>
              <span class="project-type">${escapeHTML(p.category.charAt(0).toUpperCase() + p.category.slice(1))}</span>
            </div>
            <h3 class="project-title">${escapeHTML(p.title)}</h3>
            <p class="project-desc">${escapeHTML(p.description)}</p>
            <div class="project-tech">
              ${techHTML}
            </div>
            <div class="project-links">
              ${liveLinkHTML}
              ${gitLinkHTML}
            </div>
            ${credsHTML}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function applyExperience(experience) {
  const timelineEl = document.getElementById('experienceTimeline');
  if (!timelineEl || !experience || experience.length === 0) return;

  timelineEl.innerHTML = experience.map((exp, index) => {
    const revealClass = index % 2 === 0 ? 'reveal-left' : 'reveal-right';
    const delay = index * 100;
    const skillsHTML = exp.skills.map(s => `<span>${escapeHTML(s)}</span>`).join('');

    return `
      <div class="timeline-item ${revealClass}" data-delay="${delay}">
        <div class="timeline-dot"></div>
        <div class="timeline-connector"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <div>
              <h3 class="timeline-role">${escapeHTML(exp.role)}</h3>
              <span class="timeline-company">${escapeHTML(exp.company)}</span>
            </div>
            <span class="timeline-period">${escapeHTML(exp.period)}</span>
          </div>
          <p class="timeline-desc">${escapeHTML(exp.description)}</p>
          <div class="timeline-skills">
            ${skillsHTML}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function applyTestimonials(testimonials) {
  const trackEl = document.getElementById('testimonialTrack');
  const dotsEl = document.getElementById('sliderDots');
  if (!trackEl || !testimonials || testimonials.length === 0) return;

  trackEl.innerHTML = testimonials.map(t => {
    const starsHTML = '★'.repeat(t.stars) + '☆'.repeat(5 - t.stars);
    return `
      <div class="testimonial-card">
        <div class="testimonial-quote">"</div>
        <p class="testimonial-text">${escapeHTML(t.text || t.text_content)}</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${escapeHTML(t.avatar_initials)}</div>
          <div>
            <strong>${escapeHTML(t.author_name)}</strong>
            <span>${escapeHTML(t.author_role)}</span>
          </div>
          <div class="testimonial-stars">${starsHTML}</div>
        </div>
      </div>
    `;
  }).join('');

  if (dotsEl) {
    dotsEl.innerHTML = testimonials.map((t, idx) => `
      <button class="slider-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Testimonial ${idx + 1}"></button>
    `).join('');
  }
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
