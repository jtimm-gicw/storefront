// src/__tests__/appAll.test.jsx
/**
 * All-in-one integration + unit test file for the app.
 *
 * CHANGED: This file used to use `redux-mock-store`. That was replaced with
 * a real `configureStore` (Redux Toolkit) test store so thunks run exactly
 * the same way they do in the app (thunk middleware included by default).
 *
 * - createTestStore builds a real store with your reducers and optional preloadedState.
 * - Tests render <App /> inside Provider using that store.
 * - Async thunks are tested by calling the thunk with a mocked dispatch where appropriate.
 *
 * Why this change:
 * - redux-mock-store does not execute thunk middleware the same way as the real store,
 *   causing false negatives for async behavior. Using configureStore ensures parity.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

// NEW: helper that creates a real configureStore with your reducers (thunk included)
import createTestStore from '../test-utils/createTestStore';

import App from '../App';
import productsReducer from '../store/products';
import cartReducer, { add, remove, setCart, addToCartAsync, fetchCart } from '../store/cart';
import categoriesReducer, { category } from '../store/categories';

// ----------------------
// Sample initial state used to seed the test store
// ----------------------
const initialState = {
  categories: {
    activeCategory: 'electronics',
    categoryList: [
      { name: 'electronics', displayName: 'Electronics' },
      { name: 'food', displayName: 'Food' },
      { name: 'clothing', displayName: 'Fashion' },
      { name: 'books', displayName: 'Books & Literature' },
      { name: 'sports', displayName: 'Sports & Games' },
    ],
  },
  products: {
    list: [
      { id: '1', name: 'Laptop', category: 'electronics', description: 'High-end gaming laptop', inStock: 3 },
      { id: '2', name: 'Smartphone', category: 'electronics', description: 'Latest model smartphone', inStock: 8 },
      { id: '3', name: 'T-Shirt', category: 'clothing', description: 'Comfortable cotton t-shirt', inStock: 14 },
    ],
  },
  cart: [],
};

describe('💻 App Integration & Redux Tests', () => {
  let store;

  beforeEach(() => {
    // NEW: create a fresh configureStore-based test store for each test,
    // seeded with the sample initialState so thunks and selectors behave the same as app.
    store = createTestStore(initialState);
  });

  // ----------------------
  // Component Rendering Test
  // ----------------------
  test('renders header, products, and footer', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // These text queries assume your Header/Footer include similar text — adjust as needed.
    expect(screen.getByText(/Storefront/i)).toBeInTheDocument(); // Header check
    expect(screen.getByText('Laptop')).toBeInTheDocument(); // Product in active category
    expect(screen.queryByText('T-Shirt')).toBeNull(); // Product not in active category
    expect(screen.getByText(/©/i)).toBeInTheDocument(); // Footer
  });

  // ----------------------
  // Add to Cart dispatch test (component triggers thunk)
  // ----------------------
  test('clicking Add To Cart dispatches async action', async () => {
    // Spy on store.dispatch to see what is dispatched when clicking the button
    const origDispatch = store.dispatch;
    store.dispatch = jest.fn(origDispatch);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Wait for buttons to appear (Products may render after initial selectors)
    const addButtons = await screen.findAllByText(/Add To Cart/i);
    fireEvent.click(addButtons[0]);

    // We expect at least one dispatch; the first thunk will be a function (thunk)
    expect(store.dispatch).toHaveBeenCalled();
    const firstCallArg = store.dispatch.mock.calls[0][0];
    // Thunk creators dispatch functions, so the dispatched value should be a function
    expect(typeof firstCallArg === 'function').toBe(true);

    // Restore original dispatch to avoid interfering with other tests
    store.dispatch = origDispatch;
  });

  // ----------------------
  // Products Reducer Tests (unit)
  // ----------------------
  describe('productsReducer', () => {
    const productsState = initialState.products.list;

    test('LOAD_PRODUCTS updates state', () => {
      const action = { type: 'products/SET_PRODUCTS', payload: productsState };
      const result = productsReducer(undefined, action);
      // reducer shape: { list: [...] }
      expect(result.list).toEqual(productsState);
    });

    test('UPDATE_PRODUCT updates product stock', () => {
      // Build a state object with list to feed reducer
      const stateWithList = { list: productsState };
      const action = {
        type: 'products/UPDATE_PRODUCT',
        payload: { id: '1', name: 'Laptop', inStock: 2 },
      };
      const stateAfter = productsReducer(stateWithList, action);
      expect(stateAfter.list.find((p) => p.id === '1').inStock).toBe(2);
    });
  });

  // ----------------------
  // Cart Reducer Tests (unit)
  // ----------------------
  describe('cartReducer', () => {
    const product = { id: '1', name: 'Laptop', category: 'electronics', inStock: 3 };

    test('ADD_TO_CART adds product', () => {
      expect(cartReducer([], add(product))).toEqual([product]);
    });

    test('REMOVE_FROM_CART removes product', () => {
      const state = [product];
      expect(cartReducer(state, remove(product))).toEqual([]);
    });

    test('SET_CART replaces cart', () => {
      expect(cartReducer([], setCart([product]))).toEqual([product]);
    });
  });

  // ----------------------
  // Categories Reducer Tests (unit)
  // ----------------------
  describe('categoriesReducer', () => {
    const categoriesState = initialState.categories;

    test('CATEGORY sets active category', () => {
      const action = category('books');
      const state = categoriesReducer(categoriesState, action);
      expect(state.activeCategory).toBe('books');
    });
  });

  // ----------------------
  // Async Thunks (mock fetch)
  // ----------------------
  describe('Async Thunks', () => {
    beforeAll(() => {
      // Mock fetch globally for thunk tests. The mock responses should line up
      // with the sequence of network calls your thunks make.
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([{ id: '1', name: 'Laptop' }]),
        })
      );
    });

    afterAll(() => {
      global.fetch.mockClear();
      delete global.fetch;
    });

    test('fetchCart dispatches SET_CART', async () => {
      const dispatch = jest.fn();
      await fetchCart()(dispatch);
      expect(dispatch).toHaveBeenCalledWith(setCart([{ id: '1', name: 'Laptop' }]));
    });

    test('addToCartAsync dispatches ADD_TO_CART', async () => {
      const dispatch = jest.fn();
      await addToCartAsync({ id: '1', name: 'Laptop' })(dispatch);
      expect(dispatch).toHaveBeenCalledWith(add({ id: '1', name: 'Laptop' }));
    });
  });
});
