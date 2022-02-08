import React from 'react';
import ReactDOM from 'react-dom';

import './utils/style/index.css';

import App from './App';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { theme } from './utils/style/themeConfig';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);