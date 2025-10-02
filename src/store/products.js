// src/store/products.js

/**
 * Products reducer + thunks
 *
 * - State shape: { list: [ { id, name, description, category, inStock, ... }, ... ] }
 * - Exports:
 *    - default: products reducer
 *    - getProducts(category): thunk to load products for a category (GET /products)
 *    - getProductById(id): thunk to fetch a single product (GET /products/:id)
 *    - updateProductStock(id, newStock): thunk that PUTs updated product to server and updates store
 *
 * NOTE:
 * - This file expects an `src/api/api.js` that exports `endpoints` and `apiFetch`.
 *   If you named them differently, adjust imports below.
 */

import { endpoints, apiFetch } from '../api/api';

// --------------------
// Action types
// --------------------
const SET_PRODUCTS = 'products/SET_PRODUCTS'; // replaces product list
const UPDATE_PRODUCT = 'products/UPDATE_PRODUCT'; // replace a single product in list

// --------------------
// Action creators
// --------------------
export const setProducts = (products) => ({ type: SET_PRODUCTS, payload: products });
export const updateProduct = (product) => ({ type: UPDATE_PRODUCT, payload: product });

// --------------------
// Initial state
// --------------------
const initialState = {
  list: [], // array of product objects
};

// --------------------
// Reducer
// --------------------
// Handles loading products and updating a single product (e.g., after inventory change)
export default function productsReducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    // Replace the whole list with products from server
    case SET_PRODUCTS:
      return { ...state, list: payload };

    // Update a single product in the state (matching by id)
    case UPDATE_PRODUCT:
      return {
        ...state,
        list: state.list.map((p) => (p.id === payload.id ? payload : p)),
      };

    default:
      return state;
  }
}

// --------------------
// Thunks (async actions)
// --------------------

// getProducts(category)
// - Fetches all products from the API and filters by category on the client side.
// - Dispatches setProducts to update Redux state: state.products.list = filteredProducts
export const getProducts = (category) => async (dispatch) => {
  try {
    // GET /products
    const data = await apiFetch(endpoints.products);
    // Filter client-side by category (keeps API simple for json-server)
    const products = category ? data.filter((p) => p.category === category) : data;
    dispatch(setProducts(products));
  } catch (err) {
    // Centralized apiFetch throws on non-2xx; log error here and optionally dispatch an error action
    console.error('getProducts failed:', err);
    // Optionally: dispatch({ type: 'PRODUCTS_FETCH_FAILED', payload: err })
  }
};

// getProductById(id)
// - Fetch an individual product (GET /products/:id) and update it in the store via UPDATE_PRODUCT.
// - Useful when you want the freshest copy of a product (e.g., after cart changes).
export const getProductById = (id) => async (dispatch) => {
  try {
    const product = await apiFetch(`${endpoints.products}/${id}`);
    dispatch(updateProduct(product));
    return product;
  } catch (err) {
    console.error(`getProductById failed for id ${id}:`, err);
    throw err;
  }
};

// updateProductStock(id, newStock)
// - Updates the product on the server (PUT /products/:id) with the new inStock value.
// - json-server expects a full object on PUT, so this thunk first fetches the current product,
//   merges the new inStock value, then issues a PUT and dispatches UPDATE_PRODUCT with the response.
// - Returns the updated product.
export const updateProductStock = (id, newStock) => async (dispatch) => {
  try {
    // 1) Fetch current product (GET /products/:id)
    const current = await apiFetch(`${endpoints.products}/${id}`);

    // 2) Build updated payload (full object)
    const updatedPayload = { ...current, inStock: newStock };

    // 3) PUT updated product (json-server behavior)
    const updated = await apiFetch(`${endpoints.products}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPayload),
    });

    // 4) Update local Redux store so UI stays in sync
    dispatch(updateProduct(updated));
    return updated;
  } catch (err) {
    console.error(`updateProductStock failed for id ${id}:`, err);
    throw err;
  }
};
