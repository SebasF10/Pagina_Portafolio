/* ══════════════════════════════════════════
   PORTFOLIO — script.js
   Sebastián Feo Murillo
══════════════════════════════════════════ */

// ── TYPING EFFECT ──
const typingPhrases = {
  es: [
    'Junior Software Developer',
    'Scrum Master',
    'Python Developer',
    'Frontend Developer'
  ],
  en: [
    'Junior Software Developer',
    'Scrum Master',
    'Python Developer',
    'Frontend Developer'
  ]
};

let currentLang = 'es';
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
let typingPaused = false;

function typeEffect() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = typingPhrases[currentLang];
  const current = phrases[phraseIndex];

  if (!deleting) {
    el.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      typingPaused = true;
      setTimeout(() => { typingPaused = false; }, 1800);
    }
  } else {
    el.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = deleting ? 45 : (typingPaused ? 1800 : 80);
  if (!typingPaused || !deleting) {
    setTimeout(typeEffect, speed);
  } else {
    setTimeout(typeEffect, speed);
  }
}

// ── LANGUAGE ──
function setLang(lang) {
  currentLang = lang;

  document.documentElement.lang = lang;

  // Toggle active button
  document.getElementById('btnEs').classList.toggle('active', lang === 'es');
  document.getElementById('btnEn').classList.toggle('active', lang === 'en');

  // Update all [data-es] / [data-en] elements
  document.querySelectorAll('[data-es], [data-en]').forEach(el => {
    const txt = el.getAttribute(`data-${lang}`);
    if (!txt) return;
    // Don't overwrite elements that are typed (the typing target)
    if (el.id === 'typingText') return;
    // For elements that are links or buttons, update text content
    if (el.children.length === 0) {
      el.textContent = txt;
    }
  });
}

// ── NAVBAR SCROLL + ACTIVE ──
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function onScroll() {
  // Scrolled class
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top button
  const btn = document.getElementById('backTop');
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

// ── SMOOTH SCROLL for all anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu if open
      document.getElementById('navLinks').classList.remove('open');
    }
  });
});

// ── MOBILE NAV TOGGLE ──
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// ── REVEAL ON SCROLL ──
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── HERO CODE BLOCK: staggered fade-in ──
function animateCodeBlock() {
  const lines = document.querySelectorAll('.code-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateX(-8px)';
    line.style.transition = `opacity 0.4s ${0.8 + i * 0.12}s ease, transform 0.4s ${0.8 + i * 0.12}s ease`;
    requestAnimationFrame(() => {
      setTimeout(() => {
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
      }, 50);
    });
  });
}

// ── INIT ──
window.addEventListener('DOMContentLoaded', () => {
  typeEffect();
  animateCodeBlock();
  onScroll();

  // Fade in hero content
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    heroContent.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 100);
  }
});
