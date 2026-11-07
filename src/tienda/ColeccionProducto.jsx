import { Link, useParams } from 'react-router-dom';
import { porSlug } from '../data/colecciones/index.js';
import { coleccionesTienda, productosDe } from '../data/tienda.js';
import ProductoCard, { ColeccionTarjeta } from './ProductoCard.jsx';
import NotFound from '../pages/NotFound.jsx';
import './tienda.css';

// Página de una colección como producto: información, sus kits en carrusel y más colecciones. No muestra ningún patrón.
export default function ColeccionProducto() {
  const { slug } = useParams();
  const col = porSlug(slug);
  if (!col) return <NotFound />;
  const prods = productosDe(slug);
  const otras = coleccionesTienda().filter((c) => c.slug !== slug);
  return (
    <div className="container tw">
      <nav className="tw-crumbs" aria-label="Migas"><Link to="/tienda">Tienda</Link> › <Link to="/colecciones">Colecciones</Link> › {col.titulo}</nav>
      <section className="tw-hero" style={{ background: `linear-gradient(135deg, ${col.tema.fondo}, ${col.tema.circulo2})` }}>
        <div>
          <h1>{col.titulo}</h1>
          <p>{col.texto}</p>
          <p className="tw-peq">{prods.length} kits · desde {Math.min(...prods.map((p) => p.cuentas)).toLocaleString('es-ES')} cuentas</p>
        </div>
      </section>
      <section className="tw-sec">
        <h2>Kits de esta colección</h2>
        <div className="tw-rail">{prods.map((p) => <ProductoCard key={p.id} p={p} />)}</div>
      </section>
      <section className="tw-sec">
        <div className="tw-sec__h"><h2>Más colecciones</h2><Link to="/colecciones">Ver todas las colecciones</Link></div>
        <div className="tw-grid tw-grid--2">{otras.slice(0, 4).map((c) => <ColeccionTarjeta key={c.slug} col={c} />)}</div>
      </section>
    </div>
  );
}
