import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // lets us trigger actions & read state
import CssBaseline from '@mui/material/CssBaseline';

import Header from './components/header/header.js';
import Footer from './components/footer/footer.js';
import Storefront from './components/storefront/storefront.js';

import { getProducts } from './store/products';
import { fetchCart } from './store/cart';

const App = () => {
  const dispatch = useDispatch();

  // Read activeCategory from Redux
  const activeCategory = useSelector((state) => state.categories.activeCategory);

  // -----------------------
  // Load data on app start
  // -----------------------
  useEffect(() => {
    // Only fetch products if an active category is set
    if (activeCategory) {
      dispatch(getProducts(activeCategory));
    }

    // Always fetch cart
    dispatch(fetchCart());
  }, [dispatch, activeCategory]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Storefront />
      <Footer />
    </>
  );
};

export default App;
