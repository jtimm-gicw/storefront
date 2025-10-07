// src/components/storefront/Storefront.js
import React from 'react';

// -----------------------
// Component Imports
// -----------------------
import CurrentCategory from './current-category';
import Categories from './categories';
import Products from './products';
import SimpleCart from '../cart/simple-cart';

// -----------------------
// Storefront Component
// -----------------------
// ✅ This is the main "shop view" displayed on the Home route ('/')
// It shows categories, the active category details, product listings,
// and a simple cart preview.
const Storefront = () => {
  return (
    <section className="store">
      {/* ✅ Category list — lets users select a category */}
      <Categories />

      {/* ✅ Displays details of the currently active category */}
      <CurrentCategory />

      {/* ✅ Displays products for the selected category */}
      <Products />

      {/* ✅ SimpleCart — small summary/cart sidebar */}
      <SimpleCart />
    </section>
  );
};

export default Storefront;
