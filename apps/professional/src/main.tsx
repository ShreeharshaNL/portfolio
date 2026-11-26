import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Initialize dark mode class from URL query or localStorage early
const urlParams = new URLSearchParams(window.location.search);
const queryTheme = urlParams.get('theme');
const storedTheme = (queryTheme === 'light' || queryTheme === 'dark') ? queryTheme : localStorage.getItem('shreeharsha-theme');

if (storedTheme === 'light') {
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.add('light');
  document.documentElement.dataset.theme = 'light';
} else {
  document.documentElement.classList.add('dark');
  document.documentElement.classList.remove('light');
  document.documentElement.dataset.theme = 'dark';
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
