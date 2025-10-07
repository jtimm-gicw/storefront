// src/store/categoriesSlice.js
/**
 * Categories slice using Redux Toolkit
 * - Manages list of categories and currently selected category
 * - Exports setActiveCategory and setCategories actions for components
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints, apiFetch } from '../api/api';

// --------------------
// Async thunk to fetch categories
// --------------------
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiFetch(endpoints.categories); // GET /categories
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// --------------------
// Slice
// --------------------
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],            // Array of category objects
    activeCategory: null // Currently selected category
  },
  reducers: {
    // Set category list (static or API)
    setCategories(state, action) { state.list = action.payload; },
    // Set active category (for filtering products)
    setActiveCategory(state, action) { state.activeCategory = action.payload; },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.list = action.payload || [];
    });
  },
});

export const { setCategories, setActiveCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
