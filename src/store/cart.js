// src/store/cart.js

/**
 * Cart reducer + thunks
 *
 * - State shape: array of product objects in cart
 * - Exports:
 *    - default: cartReducer
 *    - fetchCart(): thunk to load cart from backend
 *    - addToCartAsync(product): thunk to add product to backend + update Redux + decrement inventory
 *    - removeFromCartAsync(product): thunk to remove product + increment inventory
 *
 * Depends on:
 *    - src/api/api.js for endpoints & apiFetch
 *    - updateProductStock() from store/products.js to sync inventory
 */

import { endpoints, apiFetch } from '../api/api';
import { updateProductStock } from './products';

// ----------------------
// Initial State
// ----------------------
let initialState = [];

// ----------------------
// Reducer
// ----------------------
const cartReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'ADD_TO_CART': {
      // Remove any duplicate product with same id, then add the new one
      const cart = state.filter((p) => p.id !== payload.id);
      return [...cart, payload];
    }

    case 'REMOVE_FROM_CART':
      return state.filter((p) => p.id !== payload.id);

    case 'SET_CART':
      return payload;

    default:
      return state;
  }
};

export default cartReducer;

// ----------------------
// Action Creators (sync)
// ----------------------
export const add = (product) => ({ type: 'ADD_TO_CART', payload: product });
export const remove = (product) => ({ type: 'REMOVE_FROM_CART', payload: product });
export const setCart = (cart) => ({ type: 'SET_CART', payload: cart });

// ----------------------
// Thunks (async)
// ----------------------

// Fetch cart from backend (GET /cart)
export const fetchCart = () => async (dispatch) => {
  try {
    const data = await apiFetch(endpoints.cart);
    dispatch(setCart(data));
  } catch (err) {
    console.error('Error fetching cart:', err);
  }
};

// Add to cart on backend, update store, and decrement product stock
export const addToCartAsync = (product) => async (dispatch) => {
  try {
    // 1) POST to /cart
    await apiFetch(endpoints.cart, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    // 2) Update local cart state
    dispatch(add(product));

    // 3) Decrement stock in products store
    if (product.inStock > 0) {
      dispatch(updateProductStock(product.id, product.inStock - 1));
    }
  } catch (err) {
    console.error('Error adding to cart:', err);
  }
};

// Remove from cart on backend, update store, and increment product stock
export const removeFromCartAsync = (product) => async (dispatch) => {
  try {
    // 1) DELETE from /cart/:id
    await apiFetch(`${endpoints.cart}/${product.id}`, { method: 'DELETE' });

    // 2) Update local cart state
    dispatch(remove(product));

    // 3) Increment stock in products store
    dispatch(updateProductStock(product.id, product.inStock + 1));
  } catch (err) {
    console.error('Error removing from cart:', err);
  }
};
