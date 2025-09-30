let initialState = [];

const cartReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'ADD_TO_CART':
      let cart = state.filter((product) => product.name !== payload.name);
      return [...cart, payload];

    default:
      return state;
  }
};

export default cartReducer;

export const add = (product) => {
  return {
    type: 'ADD_TO_CART',
    payload: product,
  };
};
