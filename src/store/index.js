// src/store/index.js

// ⬇️ CHANGED: Instead of createStore from 'redux',
// we now import configureStore from Redux Toolkit.
import { configureStore } from '@reduxjs/toolkit';

import products from './products.js';
import categories from './categories.js';
import cart from './cart.js';

// ⬇️ CHANGED: configureStore automatically sets up thunk middleware
// and Redux DevTools support, so we no longer need composeWithDevTools.
// ✅ Added/Important: configureStore also allows us to easily swap in slice reducers
// if we migrate products.js, cart.js, or categories.js to Redux Toolkit slices in the future.
const store = configureStore({
  reducer: {
    categories, // categories state handled by categories reducer
    products,   // products state handled by products reducer
    cart,       // cart state handled by cart reducer
  },
});

// ✅ Export store for use in <Provider> in index.js / main entry point
export default store;
