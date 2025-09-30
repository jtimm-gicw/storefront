import React from 'react';
import { connect } from 'react-redux';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';

import { category } from '../../store/categories.js';

const Categories = (props) => {
  return (
    <div style={{ margin: '24px' }}>
      <Typography variant="h5" gutterBottom>
        Browse our Categories
      </Typography>
      <ButtonGroup
        variant="text"
        color="primary"
        aria-label="text primary button group"
      >
        {props.categories.map((cat) => (
          <Button
            key={cat._id || cat.name} // fallback key if _id missing
            color="primary"
            onClick={() => props.category(cat.name)}
          >
            {cat.displayName || cat.name}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categories.categoryList,
});

const mapDispatchToProps = { category };

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
