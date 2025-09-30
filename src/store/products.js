// store/products.js

// ----------------------
// Initial state (empty at first)
// ----------------------
let initialState = [];

// ----------------------
// Reducer
// ----------------------
const productsReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'SET_PRODUCTS':
      // Replace current state with products fetched from the server
      return payload;

    case 'ADD_TO_CART':
      // Reduce stock count of the product that was added to cart
      return state.map((product) =>
        product.name === payload.name
          ? { ...product, inStock: product.inStock - 1 }
          : product
      );

    default:
      return state;
  }
};

export default productsReducer;

// ----------------------
// Action Creators
// ----------------------

// Action for setting products after fetching
export const setProducts = (products) => ({
  type: 'SET_PRODUCTS',
  payload: products,
});

// ----------------------
// Thunk Middleware Action
// ----------------------
// This requires redux-thunk to be applied in your store setup.
// It allows you to do async work before dispatching a normal action.
export const fetchProducts = () => async (dispatch) => {
  try {
    // Make a request to your JSON server (db.json running on localhost:3001)
    const response = await fetch('http://localhost:3001/products');
    const data = await response.json();

    // Dispatch action to set products into state
    dispatch(setProducts(data));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

