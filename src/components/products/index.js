// src/Components/Products/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';

export default function Products(){
  const products = useSelector(state => state.products.items); // from productsSlice
  const dispatch = useDispatch();

  return (
    <div className="product-grid">
      {products.map(p => (
        <div key={p.id} className="product-card">
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price.toFixed(2)}</p>

          {/* Link to product details page */}
          <Link to={`/products/${p.id}`}>
            <button>Product Details</button>
          </Link>

          {/* Add straight to cart */}
          <button onClick={() => dispatch(addToCart({ product: p, qty: 1 }))}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
