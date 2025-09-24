import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store/';
import App from './app.js';

function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<Main />);
/* <Provider> comes from react-redux.
It connects your Redux store to the React app.
Without it, your components wouldn’t be able to use useSelector or useDispatch*/