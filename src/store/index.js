// src/store/index.js

// ⬇️ CHANGED: Instead of createStore from 'redux',
// we now import configureStore from Redux Toolkit.
import { configureStore } from '@reduxjs/toolkit';

import products from './products.js';
import categories from './categories.js';
import cart from './cart.js';

// ⬇️ CHANGED: configureStore automatically sets up thunk middleware
// and Redux DevTools support, so we no longer need composeWithDevTools.
const store = configureStore({
  reducer: {
    categories,
    products,
    cart,
  },
});

export default store;
