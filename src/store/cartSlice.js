// src/store/cartSlice.js
/**
 * Cart slice using Redux Toolkit
 * - Manages shopping cart items
 * - State is an array to maintain compatibility with components expecting state.cart
 * - Includes actions to add, remove, update quantity, clear cart
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints, apiFetch } from '../api/api';

// --------------------
// Async thunk to fetch cart
// --------------------
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const data = await apiFetch(endpoints.cart); // GET /cart
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

// --------------------
// Slice
// --------------------
const cartSlice = createSlice({
  name: 'cart',
  initialState: [], // Array of items: { product, qty }
  reducers: {
    // Add product to cart or increment qty if already exists
    addToCart(state, action) {
      const { product, qty = 1 } = action.payload;
      const existing = state.find((it) => it.id === product.id || it.product?.id === product.id);
      if (existing) existing.qty = (existing.qty || 1) + qty;
      else state.push({ product, qty });
    },
    // Remove product from cart by ID
    removeFromCart(state, action) {
      const id = action.payload;
      return state.filter((it) => (it.product ? it.product.id !== id : it.id !== id));
    },
    // Update quantity of a cart item
    updateQty(state, action) {
      const { id, qty } = action.payload;
      const found = state.find((it) => (it.product ? it.product.id === id : it.id === id));
      if (found) found.qty = qty;
    },
    // Clear all items from cart
    clearCart() {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (_, action) => action.payload || []); // Replace cart items
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
