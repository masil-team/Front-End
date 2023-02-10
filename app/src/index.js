import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { CookiesProvider } from 'react-cookie';
import ScrollToTop from './components/ScrollTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <ScrollToTop />
      <App />
    </Provider>
  </CookiesProvider>,
);

reportWebVitals();
