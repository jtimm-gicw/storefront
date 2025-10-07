// src/store/productsSlice.js
/**
 * Products slice using Redux Toolkit
 * - Manages the list of products and updates to individual products
 * - Exports thunks for fetching all products, fetching by ID, and updating stock
 * - Compatible with existing components that use products state
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints, apiFetch } from '../api/api';

// --------------------
// Async thunks
// --------------------

// fetchProducts(category)
// - GET /products from API
// - Optionally filter by category on client side
// - Updates state.products.products when fulfilled
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (category, { rejectWithValue }) => {
    try {
      const data = await apiFetch(endpoints.products);
      const products = category ? data.filter((p) => p.category === category) : data;
      return products;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// fetchProductById(id)
// - GET /products/:id from API
// - Merge or add to products list in state
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const product = await apiFetch(`${endpoints.products}/${id}`);
      return product;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// updateProductStock({ id, newStock })
// - PUT /products/:id to update stock
// - Updates products list in state after success
export const updateProductStock = createAsyncThunk(
  'products/updateProductStock',
  async ({ id, newStock }, { rejectWithValue }) => {
    try {
      const current = await apiFetch(`${endpoints.products}/${id}`);
      const payload = { ...current, inStock: newStock };
      const updated = await apiFetch(`${endpoints.products}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return updated;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// --------------------
// Slice
// --------------------

// productsSlice
// - Contains state: products array, status, error
// - Extra reducers handle async thunk results
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],     // Array of product objects
    status: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,      // Stores any API errors
  },
  reducers: {},       // No synchronous reducers here; thunks handle updates
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload; // Replace product list
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const prod = action.payload;
        const idx = state.products.findIndex((p) => p.id === prod.id);
        if (idx >= 0) state.products[idx] = prod; // Update existing
        else state.products.push(prod);           // Add new
      })
      .addCase(updateProductStock.fulfilled, (state, action) => {
        const updated = action.payload;
        state.products = state.products.map((p) => (p.id === updated.id ? updated : p));
      });
  },
});

// --------------------
// Selectors
// --------------------
export const selectProducts = (state) => state.products.products;         // Get all products
export const selectProductById = (state, id) =>                           // Find product by ID
  state.products.products.find((p) => p.id === Number(id));

export default productsSlice.reducer; // Export reducer for store
