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

  "hp-colosseum":      "layover_assets/hp-colosseum-sunset.jpg",
  "hp-baroque":        "layover_assets/hp-baroque-ceiling.jpg",
  "hp-capri-frags":    "layover_assets/hp-capri-faraglioni.jpg",
  "hp-como":           "layover_assets/hp-como.jpg",
  "hp-lisbon-arch":    "layover_assets/hp-lisbon-arch.jpg",
  "hp-lisbon-alley":   "layover_assets/hp-lisbon-alley.jpg",
  "hp-seville-plaza":  "layover_assets/hp-seville-plaza.jpg",
  "hp-beach-club":     "layover_assets/hp-beach-club.jpg",
  "hp-amalfi-market":  "layover_assets/hp-amalfi-market.jpg",
  "hp-elephant-touch": "layover_assets/hp-elephant-touch.jpg",
  "hp-elephant-smile": "layover_assets/hp-elephant-smile.jpg",
  "hp-cliffs-moher":   "layover_assets/hp-cliffs-moher.jpg",
  "hp-eiffel-night":   "layover_assets/hp-eiffel-night.jpg",
  "hp-oia-town":       "layover_assets/hp-oia-town.jpg",
  "hp-blue-lagoon":    "layover_assets/hp-blue-lagoon.jpg",
  "hp-fontelina":      "layover_assets/hp-fontelina.jpg",
  "hp-tulips":         "layover_assets/hp-tulips.jpg",
  "hp-lisbon-tram":    "layover_assets/hp-lisbon-tram.jpg",

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
  document.querySelectorAll('.has-dropdown.open').forEach(li => {
    li.classList.remove('open');
    const btn = li.querySelector('.drop-toggle');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
}

function toggleSubnav(btn) {
  const li = btn.closest('.has-dropdown');
  const opening = !li.classList.contains('open');
  document.querySelectorAll('.has-dropdown.open').forEach(el => {
    el.classList.remove('open');
    const b = el.querySelector('.drop-toggle');
    if (b) b.setAttribute('aria-expanded', 'false');
  });
  if (opening) {
    li.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
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
  document.getElementById('nav').classList.toggle('hero-mode', id === 'home');
  if (id === 'inspo') requestAnimationFrame(() => {
    initInspoMap();
    if (inspoMap) inspoMap.invalidateSize();
  });
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
    'milan':         'travel',
    'seville':       'travel',
    'city-guides':   'travel',
    'itineraries':   'travel',
    'experiences':   'travel',
    'weekend-plans': 'travel',
    'planning':      'strategy',
    'bucket':        'inspo',
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
    '.page.active .tool-cat, ' +
    '.page.active .about-style-card, ' +
    '.page.active .about-triptych-img, ' +
    '.page.active .about-mantra, ' +
    '.page.active .about-story-body, ' +
    '.page.active .about-mission-body'
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


/* ── Inspo Map ─────────────────────────────────────────────── */
const MAP_PINS = [
  // ── Pins with linked content ─────────────────────────────
  {
    name: 'Seville', country: 'Spain',
    desc: 'Three days of flamenco, tapas, and golden Andalusian light.',
    type: 'Weekend Plan', page: 'seville',
    lat: 37.3891, lng: -5.9845,
  },
  {
    name: 'Milan', country: 'Italy',
    desc: 'Fashion, aperitivo, and the world\'s greatest cathedral.',
    type: 'City Guide', page: 'milan',
    lat: 45.4642, lng: 9.1900,
  },

  // ── Visited — no guide yet ────────────────────────────────
  { name: 'Dublin',        country: 'Ireland',          lat: 53.3498, lng:  -6.2603 },
  { name: 'London',        country: 'England',          lat: 51.5074, lng:  -0.1278 },
  { name: 'Budapest',      country: 'Hungary',          lat: 47.4979, lng:  18.9705 },
  { name: 'Paris',         country: 'France',           lat: 48.8566, lng:   2.3522 },
  { name: 'Lisbon',        country: 'Portugal',         lat: 38.7223, lng:  -9.1393 },
  { name: 'Santorini',     country: 'Greece',           lat: 36.3932, lng:  25.4615 },
  { name: 'Monaco',        country: 'Monaco',           lat: 43.7384, lng:   7.4246 },
  { name: 'Vatican City',  country: 'Vatican',          lat: 41.9029, lng:  12.4534 },
  { name: 'Amsterdam',     country: 'Netherlands',      lat: 52.3676, lng:   4.9041 },
  { name: 'Valletta',      country: 'Malta',            lat: 35.8997, lng:  14.5147 },
  { name: 'Reykjavik',     country: 'Iceland',          lat: 64.1265, lng: -21.8174 },
  { name: 'Philipsburg',   country: 'St. Maarten',      lat: 18.0209, lng: -63.0510 },
  { name: 'Grand Cayman',  country: 'Cayman Islands',   lat: 19.3133, lng: -81.2546 },
  { name: 'Jamaica',       country: 'Jamaica',          lat: 18.1096, lng: -77.2975 },
  { name: 'Bangkok',       country: 'Thailand',         lat: 13.7563, lng: 100.5018 },
];

let inspoMap = null;

function initInspoMap() {
  if (inspoMap) return;

  inspoMap = L.map('inspo-map', {
    center: [35, 18],
    zoom: 2,
    minZoom: 2,
    maxZoom: 8,
    zoomControl: false,
    attributionControl: true,
    scrollWheelZoom: false,
    worldCopyJump: true,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(inspoMap);

  L.control.zoom({ position: 'bottomright' }).addTo(inspoMap);

  MAP_PINS.forEach(pin => {
    const hasContent = !!pin.page;
    const size = hasContent ? 12 : 9;
    const icon = L.divIcon({
      className: '',
      html: `<div class="map-pin${hasContent ? ' map-pin--content' : ''}"></div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });

    const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(inspoMap);

    const html = hasContent
      ? `<div class="map-popup">
           <span class="map-pop-type">${pin.type}</span>
           <strong class="map-pop-name">${pin.name}</strong>
           <span class="map-pop-country">${pin.country}</span>
           <p class="map-pop-desc">${pin.desc}</p>
           <a class="map-pop-cta" onclick="go('${pin.page}')">Read the Guide &rarr;</a>
         </div>`
      : `<div class="map-popup map-popup--simple">
           <strong class="map-pop-name">${pin.name}</strong>
           <span class="map-pop-country">${pin.country}</span>
         </div>`;

    const popupClass = hasContent
      ? 'map-leaflet-popup map-leaflet-popup--content'
      : 'map-leaflet-popup';

    marker.bindPopup(html, {
      closeButton: false,
      offset: [0, -5],
      maxWidth: 230,
      className: popupClass,
    });

    marker.on('click', () => marker.openPopup());
  });
}


/* ── Card 3D tilt (type-cards) ─────────────────────────────── */
function initCardTilt() {
  document.querySelectorAll('.type-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'background .3s, box-shadow .4s';
    });
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * 9}deg) rotateY(${x * 11}deg) translateZ(14px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .55s cubic-bezier(.25,.46,.45,.94), background .3s, box-shadow .4s';
      card.style.transform  = '';
    });
  });
}


/* ── Init on load ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildFooters();
  buildJustLanded();
  initCardTilt();
  document.getElementById('nav').classList.add('hero-mode');
  const homeEl = document.getElementById('home');
  initShimmer(homeEl);
  loadImages();
  addReadingTime(homeEl);
  buildTOC(homeEl);
  initLightbox(homeEl);
  initReveal();
  setActiveNav('home');
});
