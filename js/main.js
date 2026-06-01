/* =========================================================
   PORTFOLIO — main.js
   ========================================================= */

// ─── Scroll animations ───────────────────────────────────
const animatedEls = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

animatedEls.forEach((el) => observer.observe(el));


// ─── Nav scroll state ─────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


// ─── Mobile nav ───────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) {
    navLinks.classList.remove('open');
  }
});


// ─── Hero: trigger fade-ins on load ──────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hero .fade-in-up').forEach((el) => {
    setTimeout(() => el.classList.add('visible'), 100);
  });
});


// ─── Subtle parallax on hero name ────────────────────────
// The big pink name moves slightly slower than scroll for depth.
const heroNameBg = document.querySelector('.hero__name-bg');
if (heroNameBg) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroNameBg.style.transform = `translateY(${window.scrollY * 0.12}px)`;
    }
  }, { passive: true });
}


// ─── Research cards: dim siblings on hover ───────────────
const rCards = document.querySelectorAll('.research-card:not(.research-card--featured)');
rCards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    rCards.forEach((c) => { if (c !== card) c.style.opacity = '0.65'; });
  });
  card.addEventListener('mouseleave', () => {
    rCards.forEach((c) => { c.style.opacity = ''; });
  });
});


// ─── Active nav link highlight ───────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const secObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach((a) => a.style.color = '');
      const active = document.querySelector(`.nav__links a[href="#${id}"]`);
      if (active) active.style.color = 'var(--ink)';
    }
  });
}, { threshold: 0.4 });

sections.forEach((s) => secObserver.observe(s));
