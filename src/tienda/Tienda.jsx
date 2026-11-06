import { Link } from 'react-router-dom';
import { PRODUCTOS, coleccionesTienda, destacada } from '../data/tienda.js';
import ProductoCard, { ColeccionTarjeta } from './ProductoCard.jsx';
import Ilustracion from './Ilustracion.jsx';
import './tienda.css';

export default function Tienda() {
  const dest = destacada();
  return (
    <div className="container tw">
      <h1 className="tw-h1">Tienda</h1>
      <p className="muted">Kits de colecciones Mosik: caja, cuentas, placas y librito con las instrucciones.</p>
      <section className="tw-hero" style={{ background: `linear-gradient(135deg, ${dest.tema.fondo}, ${dest.tema.circulo2})` }}>
        <div>
          <span className="tw-chip">Colección destacada</span>
          <h2 style={{ color: '#fff' }}>{dest.titulo}</h2>
          <p>{dest.texto}</p>
          <div className="tw-fila">
            <Link className="btn" to={`/coleccion/${dest.slug}`}>Ver los kits</Link>
            <Link className="btn btn--ghost" to="/colecciones">Todas las colecciones</Link>
          </div>
        </div>
        <div className="tw-hero__ph"><Ilustracion tema={dest.tema} tipo="caja" etiqueta={`Kits ${dest.titulo}`} /></div>
      </section>
      <section className="tw-sec">
        <div className="tw-sec__h"><h2>Todos los kits</h2><Link to="/colecciones">Ver colecciones</Link></div>
        <div className="tw-grid">{PRODUCTOS.map((p) => <ProductoCard key={p.id} p={p} />)}</div>
      </section>
      <section className="tw-sec">
        <h2>Colecciones</h2>
        <div className="tw-grid tw-grid--2">{coleccionesTienda().map((c) => <ColeccionTarjeta key={c.slug} col={c} />)}</div>
      </section>
    </div>
  );
}
