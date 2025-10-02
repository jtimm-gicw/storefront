// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // ✅ React 18 uses createRoot instead of ReactDOM.render
import { Provider } from 'react-redux';

import App from './app.js';
import store from './store';

function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

// ✅ React 18 change: use createRoot instead of ReactDOM.render
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<Main />);

