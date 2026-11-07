import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { PRODUCTOS, coleccionesTienda, destacada, euros, precio, productosDe } from '../data/tienda.js';
import Ilustracion from './Ilustracion.jsx';
import ProductoCard, { ColeccionTarjeta } from './ProductoCard.jsx';
import './tienda.css';

// Primeras secciones de Inicio: colección destacada (lleva a sus kits), colecciones y novedades del escaparate.
// Las colecciones propias son producto de venta: aquí nunca se pinta su patrón.
export default function HomeTienda() {
  const dest = destacada();
  const kits = productosDe(dest.slug);
  const lider = kits[0];
  const desde = Math.min(...kits.map((p) => precio(p)));
  const novedades = [...PRODUCTOS].reverse().slice(0, 4);
  return (
    <div className="container tw">
      <Link to={`/coleccion/${dest.slug}`} className="tw-hero" style={{ background: `linear-gradient(135deg, ${dest.tema.fondo}, ${dest.tema.circulo2})`, textDecoration: 'none' }} aria-label={`Ver los kits de la colección ${dest.titulo}`}>
        <div>
          <span className="tw-chip" style={{ color: 'var(--mk-ink)' }}>Colección destacada</span>
          <h1 style={{ marginTop: 14 }}>{dest.titulo}</h1>
          <p style={{ fontSize: 19 }}>{dest.texto}</p>
          <p style={{ fontSize: 15 }}>{kits.length} kits · desde {euros(desde)} · empieza por {lider.nombre}</p>
          <span className="btn" style={{ marginTop: 10 }}>Ver los kits de {dest.titulo} <Icon name="flecha" size={18} /></span>
        </div>
        <div className="tw-hero__ph"><Ilustracion tema={dest.tema} tipo="caja" etiqueta={`Kits ${dest.titulo}`} /></div>
      </Link>
      <section className="tw-sec">
        <div className="tw-sec__h"><h2>Colecciones</h2><Link to="/colecciones">Ver todas</Link></div>
        <div className="tw-grid tw-grid--2">{[...coleccionesTienda()].reverse().map((c) => <ColeccionTarjeta key={c.slug} col={c} />)}</div>
      </section>
      <section className="tw-sec">
        <div className="tw-sec__h"><h2>Novedades en el escaparate</h2><Link to="/tienda">Ir a la tienda</Link></div>
        <div className="tw-grid">{novedades.map((p) => <ProductoCard key={p.id} p={p} />)}</div>
      </section>
    </div>
  );
}
