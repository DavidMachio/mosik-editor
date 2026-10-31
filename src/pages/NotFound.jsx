import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';

export default function NotFound() {
  usePageTitle('Página no encontrada · Mosik Beads');
  return (
    <div className="container" style={{ paddingTop: 48 }}>
      <h1>No encontramos esta página</h1>
      <p className="muted">Puede que la dirección esté mal escrita o que la página ya no exista.</p>
      <Link to="/" className="btn">Volver al inicio</Link>
    </div>
  );
}
