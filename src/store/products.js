// creates a an initial state for the categories and products they hold

let initialState = {
  categories: [
    { name: 'electronics', displayName: 'Electronics', description: 'Cool gadgets and devices', _id: 1 },
    { name: 'food', displayName: 'Food', description: 'Deslicious food and drinks', _id: 2 },
    { name: 'clothing', displayName: 'Clothing', description: 'Find your style with these fashionable clothes', _id: 3 },
  ],
  products: [
    { name: 'TV', category: 'electronics', price: 699.00, inStock: 5 },
    { name: 'Computer', category: 'electronics', price: 255.00, inStock: 15 },
    { name: 'Microwave', category: 'electronics', price: 79.00, inStock: 10 },
    { name: 'Headphones', category: 'electronics', price: 58.00, inStock: 34 },
    { name: 'Shirt', category: 'clothing', price: 9.00, inStock: 25 },
    { name: 'Socks', category: 'clothing', price: 12.00, inStock: 10 },
    { name: 'Dress', category: 'clothing', price: 17.00, inStock: 22 },
    { name: 'Apples', category: 'food', price: .99, inStock: 500 },
    { name: 'Eggs', category: 'food', price: 1.99, inStock: 12 },
    { name: 'Bread', category: 'food', price: 2.39, inStock: 90 },
    { name: 'Milk', category: 'food', price: 2.73, inStock: 42 },
  ],
  activeCategory: ''
};

export default (state = initialState, action) => {
  let { type, payload } = action;

  // Instead of writing a bunch of if...else if...else, you can use switch to make it cleaner
  switch (type) {  // switch: menu of choices
    case 'CATEGORY': // case: one option inside that menu
      return { ...state, activeCategory: payload }

    case 'RESET':  // changes menu option to its "original" state
      return initialState;

    default:
      return state;
  }
};

export const category = (name) => {
  return {
    type: 'CATEGORY',
    payload: name
    /* type: 'CATEGORY' → this tells the reducer what kind of action this is.
      payload: name → this is the data you’re sending with the action (the chosen category). */
  };
};

export const reset = () => {
  return {
    type: 'RESET', /*type: 'RESET' → tells the reducer to reset the state back to default.  No payload here because you don’t need extra data. */
  };
};

