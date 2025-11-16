# ComicVerse Hub - Marvel & DC Comics Store

A sleek, dark-themed comic store featuring Marvel and DC comics built with vanilla HTML, CSS, and JavaScript.

## Features

- **Hero Section** with featured comic carousel
- **Browse Page** with search, publisher filters, and genre filters  
- **Comic Detail Pages** with full descriptions
- **Shopping Cart** with localStorage persistence
- **Fully Responsive** design
- **No Backend Required** - runs entirely in the browser

## Comics Available

### Marvel Comics
- The Amazing Spider-Man
- Avengers United
- X-Men: Days of Future
- Black Panther: Wakanda Forever
- Doctor Strange: Multiverse of Madness
- Deadpool: Merc with a Mouth

### DC Comics
- Batman: Dark Knight Returns
- Superman: Man of Tomorrow
- Wonder Woman: Warrior Princess
- The Flash: Speed Force
- Justice League: United
- Aquaman: King of Atlantis
- Green Lantern: Corps

## How to Run

### Option 1: Using Vite Dev Server (Recommended)
\`\`\`bash
npm install
npm run dev
\`\`\`
Then open your browser to the URL shown (usually `http://localhost:5173`)

### Option 2: Using Any Web Server
You can use any static file server:

\`\`\`bash
# Using Python 3
python -m http.server 8000

# Using Node's http-server
npx http-server -p 8000

# Using PHP
php -S localhost:8000
\`\`\`

Then visit `http://localhost:8000` in your browser.

### Option 3: Direct File Access
Simply open `index.html` directly in your browser. Note: Some features may not work due to CORS restrictions.

## Project Structure

\`\`\`
├── index.html              # Homepage
├── browse.html            # Browse/catalog page
├── comic-detail.html      # Comic detail page
├── cart.html             # Shopping cart page
├── assets/
│   ├── data/
│   │   └── comics.js      # Comic data (13 Marvel & DC titles)
│   ├── scripts/
│   │   ├── index.js       # Homepage functionality
│   │   ├── browse.js      # Browse page functionality
│   │   ├── cart-page.js   # Cart page functionality
│   │   ├── cart.js        # Cart management
│   │   ├── storage.js     # localStorage utilities
│   │   └── ui.js          # UI helper functions
│   └── styles/
│       ├── base.css       # Base styles & variables
│       ├── components.css # Component styles
│       └── pages.css      # Page-specific styles
└── public/               # Comic cover images
\`\`\`

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Variables, Flexbox, Grid
- **JavaScript (ES6+)** - Vanilla JS with modules
- **Vite** - Development server (optional)
- **localStorage** - Cart persistence

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Testing & Manual QA
- Navigate through all four pages to confirm routing and shared header/footer styling
- On `browse.html`, combine publisher + genre chips, search for characters, and switch sorters to verify instant filtering
- Load `comic-detail.html?id=CV-001` (or any other ID) to check dynamic hydration and Add-to-Cart functionality
- On `cart.html`, add and remove multiple titles, tweak quantities, refresh the browser to confirm `localStorage` persistence

## License

Built for the Web Tech Hackathon. Free to use and modify.
