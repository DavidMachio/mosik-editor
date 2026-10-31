import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

// La herramienta pesa bastante más que el resto: se descarga solo al entrar en ella.
const Herramienta = lazy(() => import('./pages/Herramienta.jsx'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="herramienta"
          element={
            <Suspense fallback={<p className="container muted">Cargando la herramienta…</p>}>
              <Herramienta />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
