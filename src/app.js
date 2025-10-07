// src/app.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom'; // ✅ Added: import for routing
import Header from './components/header/Header'; // ✅ Keep: Header shown on all pages
import Footer from './components/footer/Footer'; // ✅ Keep: Footer shown on all pages
import Categories from './components/categories/Categories';
import Products from './components/products/Products';
import ShoppingCart from './components/shoppingCart/shoppingCart'; // 🛒 Import the ShoppingCart component for the /shoppingCart route
import { getProducts } from './store/products';
import { fetchCart } from './store/cart';

function App() {
  const dispatch = useDispatch();

  // -----------------------
  // Get the currently active category from Redux store
  // -----------------------
  const activeCategory = useSelector((state) => state.categories.activeCategory);

  // -----------------------
  // Load data when the app starts or category changes
  // -----------------------
  useEffect(() => {
    // ✅ Only fetch products when a category is selected
    if (activeCategory) {
      dispatch(getProducts(activeCategory));
    }

    // ✅ Always fetch the current cart (so it stays in sync)
    dispatch(fetchCart());
  }, [dispatch, activeCategory]);

  // -----------------------
  // App Layout and Routing
  // -----------------------
  return (
  <>
    {/* ✅ Header: always visible across all routes */}
    <Header />

    {/* ✅ Main content area — switches views based on route */}
    <main>
      <Routes>
        {/* ✅ Home route — displays categories and product list */}
        <Route path="/" element={<><Categories /><Products /></>} />

        {/* 🛒 UPDATED: Cart route now loads the new ShoppingCart component */}
        {/* When user clicks the cart link in the header, this page shows the full cart and checkout form */}
        <Route path="/cart" element={<ShoppingCart />} />

        {/* 🆕 (Optional) Product details route — placeholder for Phase 4 */}
        {/* This will display full product details when user clicks "View Details" */}
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </main>

    {/* ✅ Footer: always visible across all routes */}
    <Footer />
  </>
);
};

export default App;
