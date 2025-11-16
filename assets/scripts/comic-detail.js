import { getComicById, getByPublisher } from "../data/comics.js";
import { addToCart, getCartCount } from "./cart.js";
import { renderCard, updateCartBadge } from "./ui.js";

// Initialize cart badge
updateCartBadge(getCartCount());

window.addEventListener("cart-updated", () => {
  updateCartBadge(getCartCount());
});

// Get comic ID from URL
const urlParams = new URLSearchParams(window.location.search);
const comicId = urlParams.get("id");

if (!comicId) {
  window.location.href = "browse.html";
}

const comic = getComicById(comicId);

if (!comic) {
  window.location.href = "browse.html";
}

// Render comic details
const detailRoot = document.querySelector("[data-detail-root]");
if (detailRoot && comic) {
  // Cover
  const coverImg = detailRoot.querySelector("[data-detail-cover]");
  if (coverImg) {
    coverImg.src = comic.coverImg;
    coverImg.alt = comic.title;
  }

  // Title
  const titleEl = detailRoot.querySelector("[data-detail-title]");
  if (titleEl) {
    titleEl.textContent = comic.title;
  }

  // Price
  const priceEl = detailRoot.querySelector("[data-detail-price]");
  if (priceEl) {
    priceEl.textContent = `$${comic.price.toFixed(2)}`;
  }

  // Description
  const descEl = detailRoot.querySelector("[data-detail-description]");
  if (descEl) {
    descEl.textContent = comic.description;
  }

  // Meta info
  const metaEl = detailRoot.querySelector("[data-detail-meta]");
  if (metaEl) {
    metaEl.innerHTML = `
      <div>
        <strong>Publisher</strong>
        <span>${comic.publisher}</span>
      </div>
      <div>
        <strong>Issue</strong>
        <span>${comic.issue}</span>
      </div>
      <div>
        <strong>Genre</strong>
        <span>${comic.genre}</span>
      </div>
      <div>
        <strong>Release Date</strong>
        <span>${new Date(comic.releaseDate).toLocaleDateString()}</span>
      </div>
      <div>
        <strong>Characters</strong>
        <span>${comic.characters.join(", ")}</span>
      </div>
    `;
  }

  // Add to cart button
  const addBtn = detailRoot.querySelector("[data-add-to-cart]");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      addToCart(comic.id);
      addBtn.textContent = "Added to cart!";
      addBtn.style.background = "var(--color-success)";

      setTimeout(() => {
        addBtn.textContent = "Add to cart";
        addBtn.style.background = "";
      }, 2000);
    });
  }
}

// Related comics
const relatedContainer = document.querySelector("[data-related]");
if (relatedContainer && comic) {
  const related = getByPublisher(comic.publisher)
    .filter((c) => c.id !== comic.id)
    .slice(0, 4);

  relatedContainer.innerHTML = related.map(renderCard).join("");
}
