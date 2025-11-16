import {
  COMICS,
  getPublishers,
  getGenres,
  searchComics,
} from "../data/comics.js";
import { renderCard, updateCartBadge } from "./ui.js";
import { getCartCount } from "./cart.js";

// Initialize cart badge
updateCartBadge(getCartCount());

window.addEventListener("cart-updated", () => {
  updateCartBadge(getCartCount());
});

// State
let filteredComics = [...COMICS];
let activePublishers = new Set();
let activeGenres = new Set();
let searchQuery = "";
let sortBy = "release-desc";

// DOM elements
const catalogContainer = document.querySelector("[data-catalog]");
const filterSummary = document.querySelector("[data-filter-summary]");
const searchInput = document.querySelector("[data-search]");
const sortSelect = document.querySelector("[data-sort]");
const publisherFilters = document.querySelector("[data-filter-publisher]");
const genreFilters = document.querySelector("[data-filter-genre]");

// Render filters
function renderFilters() {
  // Publishers
  publisherFilters.innerHTML = getPublishers()
    .map(
      (pub) => `
    <button class="filter-chip" data-publisher="${pub}">
      ${pub}
    </button>
  `
    )
    .join("");

  // Genres
  genreFilters.innerHTML = getGenres()
    .map(
      (genre) => `
    <button class="filter-chip" data-genre="${genre}">
      ${genre}
    </button>
  `
    )
    .join("");
}

// Apply filters and sorting
function updateCatalog() {
  let results = [...COMICS];

  // Apply search
  if (searchQuery) {
    results = searchComics(searchQuery);
  }

  // Apply publisher filter
  if (activePublishers.size > 0) {
    results = results.filter((comic) => activePublishers.has(comic.publisher));
  }

  // Apply genre filter
  if (activeGenres.size > 0) {
    results = results.filter((comic) => activeGenres.has(comic.genre));
  }

  // Apply sorting
  results.sort((a, b) => {
    switch (sortBy) {
      case "release-desc":
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      case "release-asc":
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      case "title-az":
        return a.title.localeCompare(b.title);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  filteredComics = results;
  renderCatalog();
  updateFilterSummary();
}

// Render catalog
function renderCatalog() {
  if (filteredComics.length === 0) {
    catalogContainer.innerHTML = `
      <div class="catalog-empty">
        <p>No comics found matching your criteria. Try adjusting your filters.</p>
      </div>
    `;
  } else {
    catalogContainer.innerHTML = filteredComics.map(renderCard).join("");
  }
}

// Update filter summary
function updateFilterSummary() {
  const parts = [];

  if (searchQuery) parts.push(`"${searchQuery}"`);
  if (activePublishers.size > 0)
    parts.push([...activePublishers].join(", "));
  if (activeGenres.size > 0) parts.push([...activeGenres].join(", "));

  filterSummary.textContent =
    parts.length > 0 ? parts.join(" • ") : "All titles";
}

// Event listeners
publisherFilters.addEventListener("click", (e) => {
  const publisher = e.target.dataset.publisher;
  if (publisher) {
    if (activePublishers.has(publisher)) {
      activePublishers.delete(publisher);
      e.target.classList.remove("active");
    } else {
      activePublishers.add(publisher);
      e.target.classList.add("active");
    }
    updateCatalog();
  }
});

genreFilters.addEventListener("click", (e) => {
  const genre = e.target.dataset.genre;
  if (genre) {
    if (activeGenres.has(genre)) {
      activeGenres.delete(genre);
      e.target.classList.remove("active");
    } else {
      activeGenres.add(genre);
      e.target.classList.add("active");
    }
    updateCatalog();
  }
});

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim();
  updateCatalog();
});

sortSelect.addEventListener("change", (e) => {
  sortBy = e.target.value;
  updateCatalog();
});

// Initialize
renderFilters();
updateCatalog();
