// src/store/categories.js

// ----------------------
// Initial State
// ----------------------
// - activeCategory: tracks which category user has selected
// - categoryList: hardcoded list of available categories
let initialState = {
  activeCategory: '',
   categoryList: [
    { name: 'electronics', displayName: 'Electronics' },
    { name: 'food', displayName: 'Food' },
    { name: 'clothing', displayName: 'Clothing' },
    { name: 'books', displayName: 'Books' },       // ✅ new category
    { name: 'sports', displayName: 'Sports' },     // ✅ new category
  ],
};

// ----------------------
// Reducer
// ----------------------
// Handles category-related actions
const categoriesReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'CATEGORY':
      // ✅ Set the currently active category
      return { ...state, activeCategory: payload };

    default:
      // ✅ Return unchanged state if no relevant action
      return state;
  }
};

export default categoriesReducer;

// ----------------------
// Action Creator
// ----------------------
// Creates an action to set the active category
export const category = (name) => {
  return {
    type: 'CATEGORY',
    payload: name,
  };
};
