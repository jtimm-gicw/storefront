import React from 'react';
import { connect } from 'react-redux';
import { When } from 'react-if';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const CurrentCategory = ({ activeCategory }) => {
  return (
    <When condition={!!activeCategory}>
      <div style={{ padding: '64px 0 48px' }}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
            sx={{ textTransform: 'uppercase' }}
          >
            {activeCategory}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Category Description Goes Here
          </Typography>
        </Container>
      </div>
    </When>
  );
};

const mapStateToProps = (state) => ({
  activeCategory: state.categories.activeCategory,
});

export default connect(mapStateToProps)(CurrentCategory);
