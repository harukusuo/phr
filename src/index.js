import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// monkey patch window.fetch to change base URL
const originalFetch = window.fetch;
window.fetch = (url, options) => {
  return originalFetch('https://pethelpapi.vercel.app' + url, options);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
