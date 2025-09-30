// App.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'; // lets us trigger actions from Redux

import CssBaseline from '@mui/material/CssBaseline';

import Header from './components/header/header.js';
import Footer from './components/footer/footer.js';
import Storefront from './components/storefront/storefront.js';

// Import the async actions (thunks) we created
import { fetchProducts } from './store/products';
import { fetchCart } from './store/cart';
// (If you also have categories in the store, import fetchCategories too)

const App = () => {
  const dispatch = useDispatch();

  // -----------------------
  // Load data on app start
  // -----------------------
  useEffect(() => {
    // On first render, fetch products and cart data from the backend
    dispatch(fetchProducts());
    dispatch(fetchCart());
    // If you have categories:
    // dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      {/* CssBaseline gives consistent styling across browsers */}
      <CssBaseline />
      <Header />
      <Storefront />
      <Footer />
    </>
  );
};

export default App;
