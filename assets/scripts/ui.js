export function renderCard(comic) {
  return `
    <a href="comic-detail.html?id=${comic.id}" class="card">
      <img src="${comic.coverImg}" alt="${comic.title}" class="card-cover" />
      <div class="card-content">
        <h3 class="card-title">${comic.title}</h3>
        <p>${comic.issue} • ${comic.publisher}</p>
        <div class="card-meta">
          <span>${comic.genre}</span>
          <span class="card-price">$${comic.price.toFixed(2)}</span>
        </div>
      </div>
    </a>
  `;
}

export function renderPublisherSpotlight(publisher, comics) {
  const comicCards = comics.map((comic) => renderCard(comic)).join("");

  return `
    <div class="publisher-card">
      <div class="publisher-header">
        <h3>${publisher}</h3>
        <span class="badge">${comics.length} Issues</span>
      </div>
      <div class="card-grid">
        ${comicCards}
      </div>
    </div>
  `;
}

export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

export function updateCartBadge(count) {
  document.querySelectorAll("[data-cart-count]").forEach((badge) => {
    badge.textContent = count;
  });
}
