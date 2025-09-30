import React from 'react';
import { connect } from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Header = ({ cart }) => {
  return (
    <AppBar position="relative" sx={{ zIndex: 1000 }}>
      <Toolbar sx={{ background: '#f5f5f5', color: '#111' }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">Our Store</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Cart ({cart.length})</Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Header);
