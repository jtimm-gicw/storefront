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

import { add } from '../../store/cart.js';

const Products = (props) => {
  return (
    <Container sx={{ pt: 8, pb: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {props.products
          .filter((product) => product.category === props.activeCategory)
          .map((product) => (
            <Grid item key={product._id || product.name} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  sx={{ pt: '56.25%' }} // 16:9
                  image={`https://picsum.photos/600/400?random=${Math.random()}`}
                  title={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography>{product.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => props.add(product)}
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

const mapStateToProps = (state) => ({
  products: state.products,
  activeCategory: state.categories.activeCategory,
});

const mapDispatchToProps = { add };

export default connect(mapStateToProps, mapDispatchToProps)(Products);
