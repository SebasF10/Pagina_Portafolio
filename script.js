const phrases = ['Junior Software Developer', 'Scrum Master', 'Python Developer', 'Frontend Developer'];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const el = document.getElementById('typingText');
  const current = phrases[phraseIndex];
  let delay = deleting ? 40 : 85;

  if (!deleting) {
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      delay = 1800;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }
  }
  el.textContent = current.substring(0, charIndex);
  setTimeout(typeEffect, delay);
}

function setLang(lang) {
  document.documentElement.lang = lang;
  document.getElementById('btnEs').classList.toggle('active', lang === 'es');
  document.getElementById('btnEn').classList.toggle('active', lang === 'en');
  document.querySelectorAll('[data-es]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text && el.children.length === 0) el.textContent = text;
  });
  if (typeof updateThemeLabel === 'function') updateThemeLabel();
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light') root.setAttribute('data-theme', 'light');
  else root.removeAttribute('data-theme');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'light' ? '#f5f7fc' : '#0b1120');
  updateThemeLabel();
}

function updateThemeLabel() {
  const light = document.documentElement.getAttribute('data-theme') === 'light';
  const es = document.documentElement.lang === 'es';
  const label = light ? (es ? 'Cambiar a modo oscuro' : 'Switch to dark mode') : (es ? 'Cambiar a modo claro' : 'Switch to light mode');
  document.getElementById('themeBtn').setAttribute('aria-label', label);
}

document.getElementById('themeBtn').addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});
applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  backTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('section[id]').forEach(sec => sectionObserver.observe(sec));

document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

navLinks.forEach(link => link.addEventListener('click', () => {
  document.getElementById('navLinks').classList.remove('open');
}));

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

window.addEventListener('DOMContentLoaded', typeEffect);