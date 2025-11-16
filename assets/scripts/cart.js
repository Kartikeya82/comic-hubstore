import { loadCart, saveCart } from "./storage.js";
import { getComicById } from "../data/comics.js";

export function getCart() {
  return loadCart();
}

export function addToCart(comicId, quantity = 1) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === comicId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: comicId, quantity });
  }

  saveCart(cart);
  return cart;
}

export function removeFromCart(comicId) {
  const cart = getCart().filter((item) => item.id !== comicId);
  saveCart(cart);
  return cart;
}

export function updateQuantity(comicId, quantity) {
  const cart = getCart();
  const item = cart.find((item) => item.id === comicId);

  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCart(cart);
  }

  return cart;
}

export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => {
    const comic = getComicById(item.id);
    return total + (comic ? comic.price * item.quantity : 0);
  }, 0);
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

export function clearCartData() {
  saveCart([]);
}
