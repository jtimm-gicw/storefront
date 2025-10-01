// src/__tests__/App.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import App from '../App';
import { addToCartAsync } from '../store/cart';

// ----------------------
// Setup mock store
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
      { id: '1', name: 'Laptop', description: 'High-end gaming laptop', category: 'electronics', inStock: 3 },
      { id: '2', name: 'Smartphone', description: 'Latest model smartphone', category: 'electronics', inStock: 8 },
      { id: '3', name: 'T-Shirt', description: 'Comfortable cotton t-shirt', category: 'clothing', inStock: 14 },
    ],
  },
  cart: [],
};

describe('App Integration Tests', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders header, products, and footer', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Check header text (replace with whatever text your Header has)
    expect(screen.getByText(/Storefront/i)).toBeInTheDocument();

    // Products in active category
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Smartphone')).toBeInTheDocument();

    // Product not in active category should not be visible
    expect(screen.queryByText('T-Shirt')).toBeNull();

    // Footer exists
    expect(screen.getByText(/©/i)).toBeInTheDocument();
  });

  test('clicking Add To Cart dispatches async action', async () => {
    // Mock addToCartAsync
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const addButton = screen.getAllByText('Add To Cart')[0];

    fireEvent.click(addButton);

    // Check that the thunk was called
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch.mock.calls[0][0]).toBeInstanceOf(Function);
  });

  test('products show correct in-stock info', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/In Stock: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/In Stock: 8/i)).toBeInTheDocument();
  });
});
