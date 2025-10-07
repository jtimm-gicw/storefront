// src/components/ProductDetails/index.jsx
import React from 'react';
import { useParams } from 'react-router-dom'; // ✅ Used to read the product ID from the URL
import { useSelector } from 'react-redux';   // ✅ Used to read product data from Redux state

// -----------------------------
// ProductDetails Component
// -----------------------------
// ✅ This page shows the full details for a single product
// When the user clicks "View Details" on a product card,
// React Router takes them to /products/:id and this component loads.
const ProductDetails = () => {
  // ✅ useParams() gives us access to dynamic URL parts like ":id"
  const { id } = useParams();

  // ✅ useSelector() lets us access data from Redux.
  // We find the product that matches the ID from the URL.
  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === parseInt(id))
  );

  // ✅ Handle case where the product ID isn't found
  if (!product) return <p>Product not found</p>;

  // ✅ Render full product details
  return (
    <section className="product-details">
      {/* Product Name */}
      <h2>{product.name}</h2>

      {/* Product Image (optional placeholder if missing) */}
      <img
        src={product.image || 'https://via.placeholder.com/300'}
        alt={product.name}
        width="300"
      />

      {/* Product Description and Price */}
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>

      {/* Placeholder area for future features */}
      <hr />
      <p><em>Customer Reviews coming soon...</em></p>
      <p><em>Related Products coming soon...</em></p>
    </section>
  );
};

export default ProductDetails;
