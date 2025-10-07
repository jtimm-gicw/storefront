// src/index.js 
import React from 'react';
import { createRoot } from 'react-dom/client'; // ✅ React 18 uses createRoot instead of ReactDOM.render
import { Provider } from 'react-redux';  
import { BrowserRouter } from 'react-router-dom'; // ✅ Added: import BrowserRouter for routing

import App from './app.js';
import store from './store';

function Main() {
  return (
    <Provider store={store}>
      {/* ✅ Added BrowserRouter to enable routing throughout the app */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

// ✅ React 18 change: use createRoot instead of ReactDOM.render
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<Main />);
