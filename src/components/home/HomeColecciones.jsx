import { Link } from 'react-router-dom';
import Icon from '../Icon.jsx';
import { porSlug } from '../../data/colecciones/index.js';
import { GRUPOS } from '../../data/colecciones/grupos.js';
import './HomeColecciones.css';

// Primera sección de Inicio: una colección de ejemplo con un solo modelo, a todo el ancho de la pantalla.
const EJEMPLO = { coleccion: 'evoluciones', diseno: 'fase-2', fase: 2 }; // Evoluciones · Pikachu

// Tarjetas por afición: el texto va aquí; el logo, los colores y los sprites salen de los datos de cada grupo.
const AFICIONES = [
  { grupo: 'pokemon', titulo: 'Para los amantes de Pokémon', texto: 'Líneas evolutivas completas en cuentas, de la cría a la forma final.', cta: 'Ver las colecciones' },
  { grupo: 'super-mario', titulo: 'Para los locos por Mario', texto: 'Mario y Bowser en tres poses cada uno, listos para colgar juntos.', cta: 'Ver las colecciones' },
  { grupo: 'street-fighter', titulo: 'Para los nostálgicos de la lucha', texto: 'Los doce luchadores de Street Fighter II en retratos de pixel art.', cta: 'Ver la colección' },
];

function Aficion({ a }) {
  const g = GRUPOS.find((x) => x.slug === a.grupo);
  const col = g && porSlug(g.colecciones[0]);
  if (!g || !col) return null;
  const t = col.tema;
  // hasta tres sprites de la primera colección del grupo (si tiene «banner», los de ahí)
  const ids = col.banner || col.disenos.map((d) => d.id);
  const sprites = ids.map((id) => col.disenos.find((d) => d.id === id)).filter(Boolean).slice(0, 3);
  const escala = Math.max(1.5, Math.min(5, 120 / Math.max(...sprites.map((d) => d.alto))));
  const style = { '--hc-bg': t.fondo, '--hc-a': t.circulo, '--hc-b': t.circulo2, '--hc-acc': t.acento, '--s': escala };
  return (
    <li className="hg__item">
      <article className="hg" style={style}>
        <span className="hg__circle" aria-hidden="true" />
        <img className="hg__logo" src={g.logo} alt={g.logoAlt} />
        <h3 className="hg__title"><Link to={`/colecciones/${col.slug}`} className="hg__link">{a.titulo}</Link></h3>
        <p className="hg__text">{a.texto}</p>
        <div className="hg__art" aria-hidden="true">
          {sprites.map((d) => (
            <img key={d.id} src={`/colecciones/${col.slug}/${d.id}.png`} width={d.ancho} height={d.alto} alt="" loading="lazy"
              style={{ width: `${d.ancho * escala}px` }} />
          ))}
        </div>
        <span className="hg__cta">{a.cta} <Icon name="flecha" size={18} /></span>
      </article>
    </li>
  );
}

export default function HomeColecciones() {
  const col = porSlug(EJEMPLO.coleccion);
  const d = col && col.disenos.find((x) => x.id === EJEMPLO.diseno);
  if (!col || !d) return null;
  const t = col.tema;
  const style = { '--evo-bg': t.fondo, '--evo-a': t.circulo, '--evo-b': t.circulo2, '--evo-yellow': t.acento, '--s': 10 };
  return (
    <>
      <section className="hc" aria-labelledby="home-titulo">
        <div className="evo hc__evo" style={style}>
          <span className="evo__circle evo__circle--a" aria-hidden="true" />
          <span className="evo__circle evo__circle--b" aria-hidden="true" />
          <div className="evo__text hc__text">
            <p className="evo__kicker"><Icon name="paleta" size={18} /> Colecciones</p>
            <h1 id="home-titulo" className="hc__title">Descubre <span className="evo__mark">todas nuestras colecciones</span></h1>
            <p className="evo__lead">Retratos, sprites y figuras en cuentas para planchar, con una medida común para colgar cada colección entera. Aquí, una muestra: {d.nombre}, de la colección {col.titulo}.</p>
            <div className="evo__actions">
              <Link to={`/colecciones/${col.slug}?fase=${EJEMPLO.fase}`} className="evo__btn evo__btn--main"><Icon name="imagen" size={20} /> Ver el diseño</Link>
              <Link to="/herramienta" className="evo__btn evo__btn--ghost">Crear el mío</Link>
            </div>
          </div>
          <div className="evo__art hc__art" aria-hidden="true">
            <img className="evo__sprite" style={{ '--w': d.ancho }} src={`/colecciones/${col.slug}/${d.id}.png`} width={d.ancho} height={d.alto} alt="" />
          </div>
        </div>
      </section>

      <section className="container hg__wrap" aria-labelledby="home-aficiones">
        <h2 id="home-aficiones" className="sr-only">Colecciones por afición</h2>
        <ul className="hg__grid">
          {AFICIONES.map((a) => <Aficion key={a.grupo} a={a} />)}
        </ul>
      </section>
    </>
  );
}
