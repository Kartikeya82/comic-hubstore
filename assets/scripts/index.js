import {
  COMICS,
  getNewReleases,
  getPopular,
  getPublishers,
  getByPublisher,
} from "../data/comics.js";
import { renderCard, renderPublisherSpotlight, updateCartBadge } from "./ui.js";
import { getCartCount } from "./cart.js";

// Initialize cart badge
updateCartBadge(getCartCount());

// Listen for cart updates
window.addEventListener("cart-updated", () => {
  updateCartBadge(getCartCount());
});

// Hero Stats
const heroStats = document.querySelector("[data-hero-stats]");
if (heroStats) {
  heroStats.innerHTML = `
    <li>${COMICS.length} issues available</li>
    <li>${getPublishers().length} publishers</li>
    <li>Updated weekly</li>
  `;
}

// Carousel
const carousel = document.querySelector("[data-carousel]");
if (carousel) {
  const track = carousel.querySelector("[data-carousel-track]");
  const prevBtn = carousel.querySelector("[data-carousel-prev]");
  const nextBtn = carousel.querySelector("[data-carousel-next]");
  const dotsContainer = carousel.querySelector("[data-carousel-dots]");

  const featuredComics = COMICS.filter((c) => c.isPopular).slice(0, 5);
  let currentSlide = 0;

  // Render slides
  track.innerHTML = featuredComics
    .map(
      (comic) => `
    <div class="carousel-slide">
      <img src="${comic.coverImg}" alt="${comic.title}" />
    </div>
  `
    )
    .join("");

  // Render dots
  dotsContainer.innerHTML = featuredComics
    .map(
      (_, i) => `
    <button class="pagination-dot ${i === 0 ? "active" : ""}" data-dot="${i}"></button>
  `
    )
    .join("");

  function goToSlide(index) {
    currentSlide = (index + featuredComics.length) % featuredComics.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    document.querySelectorAll(".pagination-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  prevBtn.addEventListener("click", () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener("click", () => goToSlide(currentSlide + 1));

  dotsContainer.addEventListener("click", (e) => {
    if (e.target.dataset.dot) {
      goToSlide(Number(e.target.dataset.dot));
    }
  });

  // Auto-advance
  setInterval(() => goToSlide(currentSlide + 1), 5000);
}

// New Releases
const newReleasesContainer = document.querySelector("[data-new-releases]");
if (newReleasesContainer) {
  newReleasesContainer.innerHTML = getNewReleases().map(renderCard).join("");
}

// Popular Series
const popularContainer = document.querySelector("[data-popular]");
if (popularContainer) {
  popularContainer.innerHTML = getPopular().map(renderCard).join("");
}

// Publisher Spotlights
const spotlightsContainer = document.querySelector("[data-publisher-spotlights]");
if (spotlightsContainer) {
  const publishers = getPublishers();
  spotlightsContainer.innerHTML = publishers
    .map((pub) => renderPublisherSpotlight(pub, getByPublisher(pub).slice(0, 4)))
    .join("");
}
