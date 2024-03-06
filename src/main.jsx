import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HelmetProvider } from 'react-helmet-async';
import 'modern-normalize';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(191, 144, 57)',
      contrastText: '#fff',
    },
    secondary: {
      main: '#43546a',
    },
    error: {
      main: '#c24f47',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <HelmetProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </HelmetProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
