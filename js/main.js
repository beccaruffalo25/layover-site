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


/* ── Lightbox ──────────────────────────────────────────────── */
function openLightbox(src, alt) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  const cap = document.getElementById('lb-caption');
  img.src = src;
  img.alt = alt || '';
  cap.textContent = alt || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// Close on backdrop click
document.addEventListener('click', e => {
  if (e.target.id === 'lightbox') closeLightbox();
});
// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

function initLightbox(pageEl) {
  const imgs = pageEl.querySelectorAll(
    '.art-body img, .img-full img, .img-duo img, .img-trio img'
  );
  imgs.forEach(img => {
    // Remove any previously attached listener by cloning
    const fresh = img.cloneNode(true);
    img.replaceWith(fresh);
    fresh.addEventListener('click', () => {
      if (fresh.src) openLightbox(fresh.src, fresh.alt);
    });
  });
}


/* ── Image shimmer placeholders ────────────────────────────── */
function initShimmer(pageEl) {
  pageEl.querySelectorAll('img[data-k]').forEach(img => {
    if (img.complete && img.naturalWidth > 0) return; // already loaded
    img.classList.add('img-shimmer');
    const remove = () => img.classList.remove('img-shimmer');
    img.addEventListener('load',  remove, { once: true });
    img.addEventListener('error', remove, { once: true });
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
  // Explicitly reset nav state — scroll event may lag a frame behind scrollTo
  document.getElementById('nav').classList.remove('on');
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pageEl = document.getElementById(id);
  pageEl.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });
  initShimmer(pageEl);
  loadImages();
  addReadingTime(pageEl);
  buildTOC(pageEl);
  initLightbox(pageEl);
  initReveal();
  setActiveNav(id);
}


/* ── Sticky nav ────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('on', window.scrollY > 50);
});

/* ── Nav height → CSS variable (keeps hero/page offsets exact) ── */
function applyNavHeight() {
  const h = document.getElementById('nav').offsetHeight;
  document.documentElement.style.setProperty('--nav-h', h + 'px');
}
applyNavHeight();
window.addEventListener('resize', applyNavHeight);


/* ── Active nav link ───────────────────────────────────────── */
function setActiveNav(id) {
  const parentMap = {
    'milan':       'travel',
    'seville':     'travel',
    'city-guides': 'travel',
    'itineraries': 'travel',
    'planning':    'strategy',
    'bucket':      'inspo',
  };
  const activeId = parentMap[id] || id;
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('onclick') === `go('${activeId}')`) {
      a.classList.add('active');
    }
  });
}


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


/* ── Just Landed — dynamic featured grid ──────────────────── */
function buildJustLanded() {
  const grid = document.getElementById('just-landed-grid');
  if (!grid) return;

  // Collect destination pages with data-date
  const pages = Array.from(document.querySelectorAll('.page[data-date]'));
  if (!pages.length) return;

  // Sort newest first
  pages.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
  const recent = pages.slice(0, 2);

  grid.innerHTML = recent.map(p => `
    <div class="feat-card" onclick="go('${p.id}')">
      <img src="" data-k="${p.dataset.featImg}" alt="${p.dataset.featTitle}" />
      <div class="feat-card-veil"></div>
      <div class="feat-card-text">
        <span class="feat-tag">${p.dataset.featTag}</span>
        <span class="feat-title">${p.dataset.featTitle}</span>
        <span class="feat-cta">${p.dataset.featCta} &rarr;</span>
      </div>
    </div>`).join('');

  loadImages();
}


/* ── Footer builder (runs once on load) ───────────────────── */
function buildFooters() {
  document.querySelectorAll('footer').forEach(f => {
    f.innerHTML = `
      <div class="f-brand">
        <span class="f-logo" onclick="go('home')">LAYOVER</span>
        <span class="f-copy">&copy; 2025 Becca Ruffalo &middot; All Rights Reserved</span>
      </div>
      <nav class="f-nav" aria-label="Footer">
        <a onclick="go('travel')">Travel</a>
        <a onclick="go('strategy')">Strategy</a>
        <a onclick="go('inspo')">Inspo</a>
        <a onclick="go('about')">About</a>
      </nav>
      <div class="f-social">
        <a href="#" class="f-soc" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>
        <a href="#" class="f-soc" target="_blank" rel="noopener" aria-label="Pinterest">Pinterest</a>
      </div>`;
  });
}


/* ── Reading time ──────────────────────────────────────────── */
function addReadingTime(pageEl) {
  const body = pageEl.querySelector('.art-body');
  if (!body) return;
  const words = body.innerText.trim().split(/\s+/).length;
  const mins  = Math.max(1, Math.ceil(words / 200));
  const sub   = pageEl.querySelector('.art-hero-text .sub');
  if (!sub || sub.nextElementSibling?.classList.contains('read-time')) return;
  const badge = document.createElement('span');
  badge.className  = 'read-time';
  badge.textContent = `${mins} min read`;
  sub.insertAdjacentElement('afterend', badge);
}


/* ── Table of contents ─────────────────────────────────────── */
function buildTOC(pageEl) {
  // Remove any existing TOC first (re-navigation safety)
  pageEl.querySelectorAll('.toc').forEach(t => t.remove());

  const body = pageEl.querySelector('.art-body');
  if (!body) return;
  const headings = Array.from(body.querySelectorAll('h2'));
  if (headings.length < 3) return;  // Only worth a TOC for longer articles

  // Give each heading a stable ID for anchor links
  headings.forEach((h, i) => {
    if (!h.id) h.id = `sec-${i}-${h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  });

  const toc = document.createElement('div');
  toc.className = 'toc reveal';
  toc.innerHTML = `<span class="toc-label">In This Guide</span><ol>` +
    headings.map(h =>
      `<li><a onclick="document.getElementById('${h.id}').scrollIntoView({behavior:'smooth'})">${h.textContent}</a></li>`
    ).join('') +
    `</ol>`;

  // Insert after .lede paragraph or after .back link
  const lede = body.querySelector('.lede');
  const back  = body.querySelector('.back');
  const anchor = lede || back;
  if (anchor) anchor.insertAdjacentElement('afterend', toc);
  else body.prepend(toc);
}


/* ── Scroll reveal (IntersectionObserver) ──────────────────── */
let revealObserver = null;

function initReveal() {
  // Detach previous observer if any
  if (revealObserver) revealObserver.disconnect();

  // Remove stale classes from any previously revealed elements
  // so re-visiting a page re-animates cleanly
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('reveal', 'in-view');
  });

  const targets = document.querySelectorAll(
    '.page.active .card, ' +
    '.page.active .split, ' +
    '.page.active .intro, ' +
    '.page.active .nl, ' +
    '.page.active .art-body h2, ' +
    '.page.active .art-body h3, ' +
    '.page.active .img-full, ' +
    '.page.active .img-duo, ' +
    '.page.active .img-trio, ' +
    '.page.active .rec, ' +
    '.page.active .tool, ' +
    '.page.active .bucket-col, ' +
    '.page.active .b-item, ' +
    '.page.active .about-text > p, ' +
    '.page.active .mantra, ' +
    '.page.active .lede, ' +
    '.page.active .tool-cat'
  );

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}


/* ── Init on load ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildFooters();
  buildJustLanded();
  const homeEl = document.getElementById('home');
  initShimmer(homeEl);
  loadImages();
  addReadingTime(homeEl);
  buildTOC(homeEl);
  initLightbox(homeEl);
  initReveal();
  setActiveNav('home');
});
