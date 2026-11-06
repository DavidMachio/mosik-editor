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
import { SimProvider, SimBar } from './sim/SimContext.jsx';
import { Protegida } from './sim/Acceso.jsx';
import Tienda from './tienda/Tienda.jsx';
import ColeccionesLista from './tienda/ColeccionesLista.jsx';
import ColeccionProducto from './tienda/ColeccionProducto.jsx';
import Producto from './tienda/Producto.jsx';
import Carrito from './tienda/Carrito.jsx';
import Buscar from './tienda/Buscar.jsx';
import Planes from './tienda/Planes.jsx';
import { Tutoriales, Tutorial } from './tienda/Tutoriales.jsx';
import { Sobre, Como, Novedades, Ayuda, Legal } from './tienda/Info.jsx';
import Cuenta from './tienda/Cuenta.jsx';

// La herramienta pesa bastante más que el resto: se descarga solo al entrar en ella.
const Herramienta = lazy(() => import('./pages/Herramienta.jsx'));

export default function App() {
  return (
    <SimProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="herramienta"
          element={
            <Suspense fallback={<p className="container muted">Cargando la herramienta…</p>}>
              <Protegida tipo="herramienta"><Herramienta /></Protegida>
            </Suspense>
          }
        />
        <Route path="entrar" element={<Entrar />} />
        <Route path="registro" element={<Registro />} />
        <Route path="perfil" element={<Protegida tipo="cuenta"><Perfil /></Protegida>} />
        <Route path="grupo/:slug" element={<Grupo />} />
        <Route path="luchador/:id" element={<Luchador />} />
        <Route path="colecciones/:slug" element={<Coleccion />} />
        <Route path="usuario/:handle" element={<Protegida tipo="cuenta"><Usuario /></Protegida>} />
        <Route path="montaje" element={<Montaje />} />
        <Route path="galeria" element={<Galeria />} />
        <Route path="diseno/:id" element={<Protegida tipo="diseno"><Diseno /></Protegida>} />
        <Route path="tienda" element={<Tienda />} />
        <Route path="colecciones" element={<ColeccionesLista />} />
        <Route path="coleccion/:slug" element={<ColeccionProducto />} />
        <Route path="producto/:slug/:dis" element={<Producto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="buscar" element={<Buscar />} />
        <Route path="planes" element={<Planes />} />
        <Route path="tutoriales" element={<Tutoriales />} />
        <Route path="tutoriales/:id" element={<Tutorial />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="como-funciona" element={<Como />} />
        <Route path="novedades" element={<Novedades />} />
        <Route path="ayuda" element={<Ayuda />} />
        <Route path="legal/:k" element={<Legal />} />
        <Route path="cuenta" element={<Protegida tipo="cuenta"><Cuenta /></Protegida>} />
        <Route path="cuenta/:sec" element={<Protegida tipo="cuenta"><Cuenta /></Protegida>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    <SimBar />
    </SimProvider>
  );
}
