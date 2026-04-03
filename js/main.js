/* ============================================================
   LAYOVER — by Becca Ruffalo
   main.js — Navigation, image loading, photo upload
   ============================================================ */


/* ── Image map ─────────────────────────────────────────────────
   Maps short keys used in data-k="" attributes to actual
   file paths. Update these paths when adding new images.
   All images live in the layover_assets/ folder.
   ──────────────────────────────────────────────────────────── */
const IMAGES = {
  "hero":             "layover_assets/embedded-01-d5886b9ae6.jpg",
  "duomo":            "layover_assets/embedded-02-d17a10edc6.jpg",
  "santorini-sunset": "layover_assets/embedded-03-54e38b2fe4.jpg",
  "positano":         "layover_assets/embedded-04-bd525f6b5e.jpg",
  "santorini-pool":   "layover_assets/embedded-05-37c0e20e17.jpg",
  "santorini-arch":   "layover_assets/embedded-06-2f79faa990.jpg",
  "capri":            "layover_assets/embedded-07-fc395f63a0.jpg",
  "positano-town":    "layover_assets/embedded-08-9ef47c2ffd.jpg",
  "positano-art":     "layover_assets/embedded-09-1259eb7bd7.jpg",
  "becca-spain":      "layover_assets/embedded-10-f91dbc4772.jpg",

  /* ── Milan food photos ─────────────────────────────────────
     3 HEIC files still need manual conversion (see README):
     "milan-pizza":     "layover_assets/milan-pizza.jpg",
     "milan-flowers":   "layover_assets/milan-flowers.jpg",
     "milan-carbonara": "layover_assets/milan-carbonara.jpg",
  ─────────────────────────────────────────────────────────── */
  "milan-tiramisu":  "layover_assets/milan-tiramisu.jpg",
  "milan-burrata":   "layover_assets/milan-burrata.jpg",
  "milan-food-1":    "layover_assets/milan-food-1.jpg",
  "milan-food-2":    "layover_assets/milan-food-2.jpg",
  "milan-food-3":    "layover_assets/milan-food-3.jpg",

  /* ── Seville photos ────────────────────────────────────────
     Upload all files below to your layover_assets/ folder.
  ─────────────────────────────────────────────────────────── */
  "seville-hero":              "layover_assets/seville-08-carriages.jpg",
  "seville-plaza":             "layover_assets/seville-02-plaza.jpg",
  "seville-03-alcazar":        "layover_assets/seville-03-alcazar.jpg",
  "seville-04-setas":          "layover_assets/seville-04-setas.jpg",
  "seville-oranges":           "layover_assets/seville-05-oranges.jpg",
  "seville-06-plaza-fountain": "layover_assets/seville-06-plaza-fountain.jpg",
  "seville-07-plaza-becca":    "layover_assets/seville-07-plaza-becca.jpg",
  "seville-08-carriages":      "layover_assets/seville-08-carriages.jpg",
  "seville-09-alcazar-inside": "layover_assets/seville-09-alcazar-inside.jpg",
  "seville-10-torre-night":    "layover_assets/seville-10-torre-night.jpg",
  "seville-11-cathedral-altar":"layover_assets/seville-11-cathedral-altar.jpg",
  "seville-12-columbus-tomb":  "layover_assets/seville-12-columbus-tomb.jpg",
  "seville-13-park-sign":      "layover_assets/seville-13-park-sign.jpg",
  "seville-flamenco":          "layover_assets/seville-01-flamenco.jpg",

  /* ── ADD NEW IMAGES HERE ───────────────────────────────────
     Example:
     "barcelona-beach": "layover_assets/barcelona-beach.jpg",
     "paris-eiffel":    "layover_assets/paris-eiffel.jpg",
  ─────────────────────────────────────────────────────────── */
};


/* ── Load images ───────────────────────────────────────────── */
function loadImages() {
  document.querySelectorAll('img[data-k]').forEach(img => {
    const key = img.getAttribute('data-k');
    if (!IMAGES[key]) return;
    // Hero images (inside .hero or .art-hero) load eagerly; all others lazy
    const isHero = img.closest('.hero, .art-hero');
    if (!isHero) img.loading = 'lazy';
    img.decoding = 'async';
    img.src = IMAGES[key];
  });
}


/* ── Mobile menu toggle ────────────────────────────────────── */
function toggleMenu() {
  const nav    = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const open   = nav.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

function closeMenu() {
  const nav    = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  nav.classList.remove('open');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}


/* ── Page navigation (SPA) ─────────────────────────────────── */
function go(id) {
  closeMenu();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  loadImages();
}


/* ── Sticky nav ────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('on', window.scrollY > 50);
});


/* ── Photo upload (homepage gallery) ──────────────────────── */
function addPhotos(e) {
  Array.from(e.target.files).forEach(file => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = document.createElement('img');
      img.src = ev.target.result;
      document.getElementById('gallery').appendChild(img);
    };
    reader.readAsDataURL(file);
  });
  e.target.value = '';
}


/* ── Init on load ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', loadImages);
