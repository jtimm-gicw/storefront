let initialState = {
  activeCategory: '',
  categoryList: [
    { name: 'electronics', displayName: 'Electronics' },
    { name: 'food', displayName: 'Food' },
    { name: 'clothing', displayName: 'Clothing' },
  ],
};

const categoriesReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'CATEGORY':
      return { ...state, activeCategory: payload };
    default:
      return state;
  }
};

export default categoriesReducer;

export const category = (name) => {
  return {
    type: 'CATEGORY',
    payload: name,
  };
};
