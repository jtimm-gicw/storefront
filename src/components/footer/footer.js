import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#eee',
        p: 6,
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        &copy; 2025 Javascript 401
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        React + Redux + Material UI
      </Typography>
    </Box>
  );
};

export default Footer;
