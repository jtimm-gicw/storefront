// src/__tests__/appAll.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import App from '../App';
import productsReducer from '../store/products';
import cartReducer, { add, remove, setCart, addToCartAsync, fetchCart } from '../store/cart';
import categoriesReducer, { category } from '../store/categories';

// ----------------------
// Setup Redux Mock Store
// ----------------------
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

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
    store = mockStore(initialState);
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

    expect(screen.getByText(/Storefront/i)).toBeInTheDocument(); // Header check
    expect(screen.getByText('Laptop')).toBeInTheDocument(); // Product in active category
    expect(screen.queryByText('T-Shirt')).toBeNull(); // Product not in active category
    expect(screen.getByText(/©/i)).toBeInTheDocument(); // Footer
  });

  // ----------------------
  // Add to Cart dispatch test
  // ----------------------
  test('clicking Add To Cart dispatches async action', async () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const addButton = screen.getAllByText('Add To Cart')[0];
    fireEvent.click(addButton);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch.mock.calls[0][0]).toBeInstanceOf(Function); // Thunk function
  });

  // ----------------------
  // Products Reducer Tests
  // ----------------------
  describe('productsReducer', () => {
    const productsState = initialState.products.list;

    test('LOAD_PRODUCTS updates state', () => {
      const action = { type: 'LOAD_PRODUCTS', payload: productsState };
      expect(productsReducer([], action)).toEqual(productsState);
    });

    test('ADD_TO_CART updates product stock', () => {
      const action = {
        type: 'ADD_TO_CART',
        payload: { id: '1', name: 'Laptop', category: 'electronics', inStock: 2 },
      };
      const stateAfter = productsReducer(productsState, action);
      expect(stateAfter.find(p => p.id === '1').inStock).toBe(2);
    });
  });

  // ----------------------
  // Cart Reducer Tests
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
  // Categories Reducer Tests
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
      global.fetch = jest.fn(() =>
        Promise.resolve({
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
