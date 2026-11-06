import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import './tienda.css';

export default function Carrito() {
  return (
    <div className="container tw" style={{ textAlign: 'center', maxWidth: 560 }}>
      <span className="tw-ico"><Icon name="carrito" size={22} /></span>
      <h1 className="tw-h1">Pronto estará disponible este servicio</h1>
      <p className="muted">Estamos preparando la tienda. Pulsa «Avísame» en los kits que te interesen y te escribimos en cuanto se pueda comprar.</p>
      <Link className="btn" to="/tienda">Volver a la tienda</Link>
    </div>
  );
}
