// src/components/storefront/products.js

import React from 'react';
import { connect } from 'react-redux';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

// Import the async thunk action for adding to cart
// This ensures we update both Redux and the backend (db.json)
import { addToCartAsync } from '../../store/cart.js';

const Products = (props) => {
  return (
    <Container sx={{ pt: 8, pb: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {props.products
          // ✅ Only show products in the active category
          // ✅ Also make sure we don’t show out-of-stock products
          .filter(
            (product) =>
              product.category === props.activeCategory && product.inStock > 0
          )
          .map((product) => (
            <Grid item key={product.id || product.name} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Random placeholder image */}
                <CardMedia
                  sx={{ pt: '56.25%' }} // 16:9 aspect ratio
                  image={`https://picsum.photos/600/400?random=${Math.random()}`}
                  title={product.name}
                />

                {/* Product info */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography>{product.description}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    In Stock: {product.inStock}
                  </Typography>
                </CardContent>

                {/* Actions */}
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    // ✅ Use async action to update backend + store
                    onClick={() => props.addToCartAsync(product)}
                  >
                    Add To Cart
                  </Button>
                  <Button size="small" color="primary">
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

// ---------------------------
// Map Redux state to props
// ---------------------------
const mapStateToProps = (state) => ({
  products: state.products.list, // ✅ assumes reducer shape is { list: [...] }
  activeCategory: state.categories.activeCategory,
});

// ---------------------------
// Map dispatch (actions) to props
// ---------------------------
const mapDispatchToProps = {
  addToCartAsync, // ✅ use async action instead of sync add()
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
