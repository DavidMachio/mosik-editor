import { Link, useParams } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';
import FilaMovimiento from '../components/FilaMovimiento.jsx';
import { luchadorPorId } from '../data/luchadores/index.js';
import { porSlug } from '../data/colecciones/index.js';
import NotFound from './NotFound.jsx';
import './Luchador.css';

// Colores de las tarjetas: los de la colección de Street Fighter II
const TEMA = { fondo: '#b3261e', circulo: '#f2a21c', circulo2: '#7d1712', acento: '#ffd84a' };

// Los movimientos de un luchador, por categorías: reposo, movimiento, defensas, puños, patadas, especiales, golpes recibidos y extras.
export default function Luchador() {
  const { id } = useParams();
  const l = luchadorPorId(id);
  usePageTitle(`${l ? l.nombre : 'Luchador'} · Street Fighter · Mosik Beads`);
  if (!l) return <NotFound />;
  // colores de los fondos: los del jugador (si no tiene, los de la colección)
  const tema = l.tema || (porSlug('street-fighter-ii') || {}).tema || TEMA;
  return (
    <div className="container luch-pag">
      <nav className="luch-pag__crumbs" aria-label="Dónde estás">
        <Link to="/">Inicio</Link> <span aria-hidden="true">/</span> <Link to="/grupo/street-fighter">Street Fighter</Link> <span aria-hidden="true">/</span> <span>{l.nombre}</span>
      </nav>
      <header className="luch-pag__head">
        <img className="luch-pag__face" src={l.cara} alt="" width="94" height="124" />
        <div>
          <p className="luch-pag__who">{l.pais}</p>
          <h1>{l.nombre}</h1>
          <p className="muted">{l.total} movimientos para hacer en cuentas, ordenados de más tranquilo a más intenso.</p>
        </div>
      </header>
      <nav className="luch-pag__chips" aria-label="Ir a una categoría">
        {l.categorias.map((c) => <a key={c.id} href={`#cat-${c.id}`} className="luch-pag__chip">{c.titulo} <b>{c.movimientos.length}</b></a>)}
      </nav>
      {l.categorias.map((c) => (
        <section key={c.id} id={`cat-${c.id}`} className="luch-pag__cat" aria-labelledby={`cat-t-${c.id}`}>
          <h2 id={`cat-t-${c.id}`}>{c.titulo}</h2>
          <ul className="luch-pag__list">
            {c.movimientos.map((m) => (
              <li key={m.id}><FilaMovimiento luchador={l} mov={m} tema={tema} coleccion={`${l.id}-${m.id}`} /></li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
