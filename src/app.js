import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Header from './components/header/header.js';
import Footer from './components/footer/footer.js';
import Storefront from './components/storefront/storefront.js';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Storefront />
      <Footer />
    </>
  );
};

export default App;
