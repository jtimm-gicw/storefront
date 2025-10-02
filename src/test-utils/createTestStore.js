// src/test-utils/createTestStore.js
// Helper used by tests to create a real configureStore (RTK) with thunk included.
// This ensures tests use the same middleware behavior as your app.

import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../store/products';
import cartReducer from '../store/cart';
import categoriesReducer from '../store/categories';

export default function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      products: productsReducer,
      cart: cartReducer,
      categories: categoriesReducer,
    },
    preloadedState,
    // configureStore includes thunk and devtools by default in test environment
  });
}
