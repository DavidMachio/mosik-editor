import { Link, useParams } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';
import Icon from '../components/Icon.jsx';
import { GRUPOS } from '../data/colecciones/grupos.js';
import { porSlug } from '../data/colecciones/index.js';
import NotFound from './NotFound.jsx';
import './Grupo.css';

// Página de un grupo con luchadores (Street Fighter): una tarjeta en fila por luchador.
// De izquierda a derecha: el GIF en bucle, el nombre y los fotogramas del movimiento. Pulsarla abre la ficha de esa colección.
export default function Grupo() {
  const { slug } = useParams();
  const g = GRUPOS.find((x) => x.slug === slug);
  usePageTitle(`${g ? g.titulo : 'Grupo'} · Mosik Beads`);
  if (!g || !g.luchadores) return <NotFound />;
  return (
    <div className="container grupo-pag">
      <nav className="grupo-pag__crumbs" aria-label="Dónde estás"><Link to="/">Inicio</Link> <span aria-hidden="true">/</span> <span>{g.titulo}</span></nav>
      <header className="grupo-pag__head">
        {g.logo && <img className="grupo-pag__logo" src={g.logo} alt={g.logoAlt} />}
        <h1>Luchadores</h1>
        <p className="muted">Elige un luchador para ver su movimiento y los diseños para hacerlo en cuentas. De momento, la prueba con Ryu en reposo.</p>
      </header>
      <ul className="luch">
        {g.luchadores.map((l) => {
          const col = porSlug(l.coleccion);
          if (!col) return null;
          const t = col.tema;
          const alto = Math.max(...col.disenos.map((d) => d.alto));
          const escala = Math.min(2.6, 150 / alto);
          const style = { '--l-bg': t.fondo, '--l-a': t.circulo, '--l-b': t.circulo2, '--l-acc': t.acento };
          return (
            <li key={l.id}>
              <Link to={`/colecciones/${col.slug}`} className="luch__card" style={style} aria-label={`${l.nombre}, ${l.movimiento}: ver los diseños`}>
                <span className="luch__circle" aria-hidden="true" />
                <img className="luch__gif" src={l.gif} alt={`${l.nombre} en ${l.movimiento.toLowerCase()}, animación`} width="172" height="328" />
                <div className="luch__body">
                  <p className="luch__mov">{l.movimiento}</p>
                  <h2 className="luch__name">{l.nombre}</h2>
                  <ul className="luch__frames" aria-hidden="true">
                    {col.disenos.map((d) => (
                      <li key={d.id}><img src={`/colecciones/${col.slug}/${d.id}.png`} alt="" width={d.ancho} height={d.alto} style={{ width: `${d.ancho * escala}px` }} /></li>
                    ))}
                  </ul>
                  <span className="luch__cta">Ver los {col.disenos.length} diseños <Icon name="flecha" size={18} /></span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
