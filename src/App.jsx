import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Entrar from './pages/Entrar.jsx';
import Registro from './pages/Registro.jsx';
import Perfil from './pages/Perfil.jsx';
import Coleccion from './pages/Coleccion.jsx';
import Grupo from './pages/Grupo.jsx';
import Luchador from './pages/Luchador.jsx';
import Usuario from './pages/Usuario.jsx';
import Montaje from './pages/Montaje.jsx';
import Galeria from './pages/Galeria.jsx';
import Diseno from './pages/Diseno.jsx';

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
        <Route path="entrar" element={<Entrar />} />
        <Route path="registro" element={<Registro />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="grupo/:slug" element={<Grupo />} />
        <Route path="luchador/:id" element={<Luchador />} />
        <Route path="colecciones/:slug" element={<Coleccion />} />
        <Route path="usuario/:handle" element={<Usuario />} />
        <Route path="montaje" element={<Montaje />} />
        <Route path="galeria" element={<Galeria />} />
        <Route path="diseno/:id" element={<Diseno />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
