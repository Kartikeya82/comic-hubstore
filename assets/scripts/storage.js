const STORAGE_KEY = "comicverse-cart-v1";

export function loadCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load cart:", error);
    return [];
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: cart }));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
}

export function clearCart() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: [] }));
  } catch (error) {
    console.error("Failed to clear cart:", error);
  }
}
