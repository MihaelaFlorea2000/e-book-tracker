import React from 'react';
import ReactDOM from 'react-dom';

import './utils/style/index.css';

import App from './App';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { theme } from './utils/style/themeConfig';

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);