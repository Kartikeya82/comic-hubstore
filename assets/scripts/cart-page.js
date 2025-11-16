import { getComicById } from "../data/comics.js";
import {
  getCart,
  removeFromCart,
  updateQuantity,
  getCartTotal,
  getCartCount,
  clearCartData,
} from "./cart.js";
import { updateCartBadge } from "./ui.js";

// Initialize cart badge
updateCartBadge(getCartCount());

window.addEventListener("cart-updated", () => {
  updateCartBadge(getCartCount());
  renderCart();
});

const cartBody = document.querySelector("[data-cart-body]");
const cartEmpty = document.querySelector("[data-cart-empty]");
const cartTotals = document.querySelector("[data-cart-totals]");
const checkoutBtn = document.querySelector("[data-checkout]");
const checkoutMessage = document.querySelector("[data-checkout-message]");

function renderCart() {
  const cart = getCart();

  if (cart.length === 0) {
    cartBody.innerHTML = "";
    cartEmpty.removeAttribute("hidden");
    cartTotals.setAttribute("hidden", "");
    return;
  }

  cartEmpty.setAttribute("hidden", "");
  cartTotals.removeAttribute("hidden");

  // Render cart items
  cartBody.innerHTML = cart
    .map((item) => {
      const comic = getComicById(item.id);
      if (!comic) return "";

      const subtotal = comic.price * item.quantity;

      return `
      <tr>
        <td>
          <div class="cart-item">
            <img src="${comic.coverImg}" alt="${comic.title}" class="cart-item-cover" />
            <div>
              <strong>${comic.title}</strong>
              <p style="color: var(--color-text-muted); font-size: 0.875rem;">
                ${comic.issue} • ${comic.publisher}
              </p>
            </div>
          </div>
        </td>
        <td>$${comic.price.toFixed(2)}</td>
        <td>
          <div class="qty-controls">
            <button class="qty-btn" data-decrease="${item.id}">−</button>
            <span class="qty-display">${item.quantity}</span>
            <button class="qty-btn" data-increase="${item.id}">+</button>
          </div>
        </td>
        <td><strong>$${subtotal.toFixed(2)}</strong></td>
        <td>
          <button class="remove-btn" data-remove="${item.id}">Remove</button>
        </td>
      </tr>
    `;
    })
    .join("");

  // Render totals
  const total = getCartTotal();
  const tax = total * 0.1;
  const grandTotal = total + tax;

  cartTotals.innerHTML = `
    <div class="cart-totals-row">
      <span>Subtotal:</span>
      <span>$${total.toFixed(2)}</span>
    </div>
    <div class="cart-totals-row">
      <span>Tax (10%):</span>
      <span>$${tax.toFixed(2)}</span>
    </div>
    <div class="cart-totals-row">
      <span>Total:</span>
      <span>$${grandTotal.toFixed(2)}</span>
    </div>
  `;

  // Attach event listeners
  attachCartEvents();
}

function attachCartEvents() {
  // Quantity controls
  cartBody.querySelectorAll("[data-increase]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.increase;
      const cart = getCart();
      const item = cart.find((i) => i.id === id);
      if (item) {
        updateQuantity(id, item.quantity + 1);
      }
    });
  });

  cartBody.querySelectorAll("[data-decrease]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.decrease;
      const cart = getCart();
      const item = cart.find((i) => i.id === id);
      if (item && item.quantity > 1) {
        updateQuantity(id, item.quantity - 1);
      }
    });
  });

  // Remove buttons
  cartBody.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.remove;
      removeFromCart(id);
    });
  });
}

// Checkout
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    const cart = getCart();
    if (cart.length === 0) return;

    checkoutMessage.textContent = `Order placed! Total: $${(getCartTotal() * 1.1).toFixed(2)}`;
    checkoutMessage.style.display = "block";

    setTimeout(() => {
      clearCartData();
      checkoutMessage.style.display = "none";
      renderCart();
    }, 3000);
  });
}

// Initialize
renderCart();
