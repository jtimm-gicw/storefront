// store/cart.js

// ----------------------
// Initial State
// ----------------------
let initialState = [];

// ----------------------
// Reducer
// ----------------------
const cartReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'ADD_TO_CART':
      // Remove any duplicate product with same name, then add the new one
      // This ensures only one entry per product in the cart
      let cart = state.filter((product) => product.name !== payload.name);
      return [...cart, payload];

    case 'REMOVE_FROM_CART':
      // Remove a product completely from the cart
      return state.filter((product) => product.name !== payload.name);

    case 'SET_CART':
      // Replace current cart with data fetched from the server
      return payload;

    default:
      return state;
  }
};

export default cartReducer;

// ----------------------
// Action Creators (sync)
// ----------------------
export const add = (product) => ({
  type: 'ADD_TO_CART',
  payload: product,
});

export const remove = (product) => ({
  type: 'REMOVE_FROM_CART',
  payload: product,
});

export const setCart = (cart) => ({
  type: 'SET_CART',
  payload: cart,
});

// ----------------------
// Thunk Middleware Actions (async)
// ----------------------
// Requires redux-thunk in store setup

// Fetch cart from backend (fake db.json)
export const fetchCart = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/cart');
    const data = await response.json();
    dispatch(setCart(data));
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
};

// Add to cart on backend, then update store
export const addToCartAsync = (product) => async (dispatch) => {
  try {
    await fetch('http://localhost:3001/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    dispatch(add(product));
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

// Remove from cart on backend, then update store
export const removeFromCartAsync = (product) => async (dispatch) => {
  try {
    await fetch(`http://localhost:3001/cart/${product.id}`, {
      method: 'DELETE',
    });
    dispatch(remove(product));
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};
