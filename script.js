// ── NAV SCROLL ────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── HAMBURGER ─────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
function closeMenu() { mobileNav.classList.remove('open'); }

// ── SCROLL REVEAL ─────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
}, { threshold: 0.12 });
reveals.forEach(el => ro.observe(el));

// ── TESTIMONIALS SLIDER ───────────────────────
const track = document.getElementById('testimonialsTrack');
let tCurrent = 0;
const tSlides = track.querySelectorAll('.testimonial-card').length;
document.getElementById('tNext').addEventListener('click', () => {
  tCurrent = (tCurrent + 1) % tSlides;
  track.style.transform = `translateX(-${tCurrent * 100}%)`;
});
document.getElementById('tPrev').addEventListener('click', () => {
  tCurrent = (tCurrent - 1 + tSlides) % tSlides;
  track.style.transform = `translateX(-${tCurrent * 100}%)`;
});

// ── LIGHTBOX ──────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
function openLightbox(el) {
  lightboxImg.src = el.querySelector('img').src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
