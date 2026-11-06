import { coleccionesTienda } from '../data/tienda.js';
import { ColeccionTarjeta } from './ProductoCard.jsx';
import './tienda.css';

export default function ColeccionesLista() {
  return (
    <div className="container tw">
      <h1 className="tw-h1">Colecciones</h1>
      <p className="muted">Todas las colecciones de Mosik. Entra en una para ver sus kits.</p>
      <div className="tw-grid tw-grid--2">{[...coleccionesTienda()].reverse().map((c) => <ColeccionTarjeta key={c.slug} col={c} />)}</div>
    </div>
  );
}
