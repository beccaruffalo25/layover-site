# LAYOVER — by Becca Ruffalo

A personal travel blog and guide site.

---

## File Structure

```
layover/
├── index.html          ← Main file (all pages live here as sections)
├── css/
│   └── styles.css      ← All styles — edit this to change colors, fonts, layout
├── js/
│   └── main.js         ← Navigation logic + image map
├── layover_assets/     ← All photos go in here
│   ├── embedded-01-...jpg
│   └── ...
└── README.md
```

---

## How to Add a New Destination Page

### Step 1 — Add your images
Drop your new photos into `layover_assets/` and give them clean names like `barcelona-beach.jpg`.

### Step 2 — Register images in `js/main.js`
Open `js/main.js` and add your image keys to the `IMAGES` object:
```js
"barcelona-beach": "layover_assets/barcelona-beach.jpg",
"barcelona-sagrada": "layover_assets/barcelona-sagrada.jpg",
```

### Step 3 — Add a nav link in `index.html`
Find the `<nav>` section and add:
```html
<li><a onclick="go('barcelona')">Barcelona</a></li>
```

### Step 4 — Add a card on the homepage
Find the `<!-- ADD NEW CARDS HERE -->` comment in the `#home` section and copy/paste a card block.

### Step 5 — Add the page
Find the `<!-- ADD A NEW PAGE -->` comment at the bottom of `index.html` and copy the template. Change:
- The `id="barcelona"` on the outer div
- The hero image `data-k` key
- The title, subtitle, and all content

---

## How to Edit an Existing Page

| What to change | Where |
|---|---|
| Colors / fonts | `css/styles.css` → Section 1 (`:root` variables) |
| Nav links | `index.html` → `<nav>` block |
| Homepage intro text | `index.html` → `#home` → `.intro` section |
| Milan content | `index.html` → `#milan` section |
| Bucket list items | `index.html` → `#bucket` section |
| Planning tools | `index.html` → `#planning` section |
| About text | `index.html` → `#about` section |
| Image paths | `js/main.js` → `IMAGES` object |

---

## Color Palette (easy to update in `css/styles.css`)

```css
--cream:     #f7f2e8   /* page background */
--parchment: #ede5d0   /* card / band backgrounds */
--tan:       #c9b592   /* secondary accent */
--terra:     #b8654a   /* tags, hover states */
--brown:     #352317   /* headings */
--mid:       #6b4f38   /* body text */
--ink:       #291a10   /* dark text / footer bg */
--gold:      #a8843a   /* links, ornaments */
```

---

## Deploying on GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Your site will be live at `https://yourusername.github.io/layover`
