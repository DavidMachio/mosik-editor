import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource/outfit/600.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './styles/tokens.css';
import './styles/global.css';

import App from './App.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';

// Nota: sin <React.StrictMode> a propósito. El editor (initEditor) engancha eventos sobre el DOM
// y StrictMode ejecutaría su inicio dos veces en desarrollo.
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
