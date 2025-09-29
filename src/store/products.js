// creates a an initial state for the categories and products they hold
let initialState = [
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
];

export default (state = initialState, action) => {
  let { type, payload } = action;
// Instead of writing a bunch of if...else if...else, you can use switch to make it cleaner
  switch (type) {// switch: menu of choices
    case 'ADD_TO_CART':
      return state.map(product => product.name === payload.name ? { ...product, inStock: product.inStock - 1 } : product);

    default:
      return state
  }
};


