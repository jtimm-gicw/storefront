// src/components/Header/index.jsx
import React from 'react';
import { connect } from 'react-redux';

// ✅ Added: import Link to navigate to /cart page
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Header = ({ cart }) => {
  return (
    <AppBar position="relative" sx={{ zIndex: 1000 }}>
      <Toolbar sx={{ background: '#f5f5f5', color: '#111' }}>
        <Grid container alignItems="center" justifyContent="space-between">
          {/* ✅ Store Title */}
          <Grid item>
            <Typography variant="h4">Our Store</Typography>
          </Grid>

          {/* ✅ Added: Make Cart summary clickable using React Router's Link */}
          {/* When clicked, it takes the user to the full ShoppingCart page (/cart) */}
          <Grid item>
            <Link
              to="/cart"
              style={{ textDecoration: 'none', color: 'inherit' }} // ✅ Keeps original color/styling
            >
              <Typography variant="h6">
                Cart ({cart.length})
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

// ✅ Connect Redux cart state so we can display the current item count
const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Header);
