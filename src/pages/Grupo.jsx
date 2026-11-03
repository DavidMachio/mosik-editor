import { Link, useParams } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';
import Icon from '../components/Icon.jsx';
import { GRUPOS } from '../data/colecciones/grupos.js';
import { porSlug } from '../data/colecciones/index.js';
import { luchadorPorId } from '../data/luchadores/index.js';
import NotFound from './NotFound.jsx';
import './Grupo.css';

// Página de un grupo con luchadores (Street Fighter): una tarjeta con la cara de cada luchador.
// «Ver todos» abre la lista de sus movimientos (/luchador/<id>), ordenados por categorías.
export default function Grupo() {
  const { slug } = useParams();
  const g = GRUPOS.find((x) => x.slug === slug);
  usePageTitle(`${g ? g.titulo : 'Grupo'} · Mosik Beads`);
  if (!g || !g.luchadores) return <NotFound />;
  const t = (porSlug(g.colecciones[0]) || {}).tema || { fondo: '#b3261e', circulo: '#f2a21c', circulo2: '#7d1712', acento: '#ffd84a' };
  const style = { '--c-bg': t.fondo, '--c-a': t.circulo, '--c-b': t.circulo2, '--c-acc': t.acento };
  return (
    <div className="container grupo-pag" style={style}>
      <nav className="grupo-pag__crumbs" aria-label="Dónde estás"><Link to="/">Inicio</Link> <span aria-hidden="true">/</span> <span>{g.titulo}</span></nav>
      <header className="grupo-pag__head">
        {g.logo && <img className="grupo-pag__logo" src={g.logo} alt={g.logoAlt} />}
        <h1>Elige tu luchador</h1>
        <p className="muted">Cada luchador tiene sus movimientos para hacer en cuentas: reposo, defensas, puños, patadas y especiales.</p>
      </header>
      <ul className="cara-grid">
        {g.luchadores.map(luchadorPorId).filter(Boolean).map((l) => (
          <li key={l.id}>
            <article className="cara">
              <span className="cara__circle" aria-hidden="true" />
              <img className="cara__img" src={l.cara} alt={`Cara de ${l.nombre}`} width="94" height="124" />
              <div className="cara__body">
                <p className="cara__pais">{l.pais}</p>
                <h2 className="cara__name"><Link to={`/luchador/${l.id}`} className="cara__link">{l.nombre}</Link></h2>
                <p className="cara__n">{l.total} movimientos</p>
              </div>
              <span className="cara__cta">Ver todos <Icon name="flecha" size={18} /></span>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
