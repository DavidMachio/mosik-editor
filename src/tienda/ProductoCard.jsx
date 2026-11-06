import { Link } from 'react-router-dom';
import Ilustracion from './Ilustracion.jsx';
import { euros, precio } from '../data/tienda.js';

export default function ProductoCard({ p }) {
  return (
    <Link to={`/producto/${p.coleccion}/${p.dis}`} className="tw-card tw-prod">
      <Ilustracion tema={p.tema} tipo="caja" etiqueta={`Kit ${p.nombre}`} />
      <div className="tw-card__b">
        <h3>{p.nombre}</h3>
        <p className="muted tw-peq">Kit · {p.nivel} · {p.cuentas.toLocaleString('es-ES')} cuentas</p>
        <p className="tw-precio">Desde {euros(precio(p))}</p>
      </div>
    </Link>
  );
}

export function ColeccionTarjeta({ col }) {
  return (
    <Link to={`/coleccion/${col.slug}`} className="tw-card tw-col">
      <div className="tw-col__f" style={{ background: `linear-gradient(135deg, ${col.tema.fondo}, ${col.tema.circulo})` }}>
        <span>{col.titulo}</span>
      </div>
      <div className="tw-card__b">
        <p className="muted tw-peq">{col.resumen}</p>
        <p className="tw-precio">{col.disenos.length} kits</p>
      </div>
    </Link>
  );
}
