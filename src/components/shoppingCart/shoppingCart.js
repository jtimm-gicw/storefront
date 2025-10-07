// src/components/ShoppingCart/index.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// ✅ MUI components for clean layout and styling
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from '@mui/material';

// -----------------------------
// ShoppingCart Component
// -----------------------------
// ✅ Displays all items in the user's cart, shows a total, and provides
// a simple checkout form (no payment processing yet).
const ShoppingCart = () => {
  // ✅ Pulls cart items from Redux store
  const cart = useSelector((state) => state.cart);

  // ✅ Local state for form fields
  const [form, setForm] = useState({
    name: '',
    address: '',
    card: '',
  });

  // ✅ Calculates total cost by summing item prices
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // ✅ Handles input changes in the checkout form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Thank you for your purchase!');
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 🛒 Header section */}
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {/* 🧾 Cart Items Table */}
      {/* Displays a table of all items currently in the cart */}
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            {/* ✅ Displays total order cost */}
            <TableRow>
              <TableCell><strong>Total</strong></TableCell>
              <TableCell align="right"><strong>${total.toFixed(2)}</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/*🧍‍♂️ Checkout Form Section */}
      {/* Collects user’s name, address, and payment info (mock only) */}
      <Typography variant="h5" gutterBottom>
        Checkout
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* ✅ Customer name input */}
        <TextField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        {/* ✅ Shipping address input */}
        <TextField
          label="Shipping Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        {/* ✅ Credit card info input */}
        <TextField
          label="Credit Card Number"
          name="card"
          value={form.card}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        {/* ✅ Submit button — triggers thank-you alert */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Complete Purchase
        </Button>
      </form>
    </Container>
  );
};

export default ShoppingCart;
