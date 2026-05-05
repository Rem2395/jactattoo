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

// ── GALLERY DOTS ──────────────────────────────
const strip = document.getElementById('galleryStrip');
const dotsContainer = document.getElementById('galleryDots');
const items = strip.querySelectorAll('.gallery-item');
const visibleCount = () => Math.floor(strip.clientWidth / items[0].offsetWidth);

function buildDots() {
  dotsContainer.innerHTML = '';
  const pages = Math.ceil(items.length / visibleCount());
  for (let i = 0; i < pages; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => {
      strip.scrollTo({ left: i * items[0].offsetWidth * visibleCount(), behavior: 'smooth' });
    });
    dotsContainer.appendChild(d);
  }
}
buildDots();

strip.addEventListener('scroll', () => {
  const page = Math.round(strip.scrollLeft / (items[0].offsetWidth * visibleCount()));
  dotsContainer.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === page));
});

window.addEventListener('resize', buildDots);

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
