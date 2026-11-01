import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';

// Banner de una colección con ficha (datos en src/data/colecciones). Los sprites crecen con la misma escala de píxel.
export default function ColeccionBanner({ col, titleId }) {
  const t = col.tema;
  const GAP = 5;
  const suma = col.disenos.reduce((a, d) => a + d.ancho, 0) + (col.disenos.length - 1) * GAP;
  const escala = Math.max(1.2, Math.min(4, 520 / suma)); // cabe en la mitad del banner
  const style = { '--evo-bg': t.fondo, '--evo-a': t.circulo, '--evo-b': t.circulo2, '--evo-yellow': t.acento, '--s': escala };
  const [marca, resto] = col.lema;
  return (
    <section className="container bento-wrap" aria-labelledby={titleId} data-reveal>
      <div className="evo" style={style}>
        <span className="evo__circle evo__circle--a" aria-hidden="true" />
        <span className="evo__circle evo__circle--b" aria-hidden="true" />
        <div className="evo__text">
          <p className="evo__kicker"><Icon name="paleta" size={18} /> Nueva colección</p>
          <h2 id={titleId}>{col.titulo}<br /><span className="evo__mark">{marca}</span>{resto}</h2>
          <p className="evo__lead">{col.texto}</p>
          <div className="evo__actions">
            <Link to={`/colecciones/${col.slug}`} className="evo__btn evo__btn--main"><Icon name="imagen" size={20} /> Ver diseño</Link>
            <Link to="/herramienta" className="evo__btn evo__btn--ghost">Crear el mío</Link>
          </div>
        </div>
        <div className="evo__art" aria-hidden="true">
          {col.disenos.map((d, i) => (
            <img key={d.id} className="evo__sprite" style={{ '--w': d.ancho, animationDelay: `${i * 0.35}s` }}
              src={`/colecciones/${col.slug}/${d.id}.png`} width={d.ancho} height={d.alto} alt="" />
          ))}
        </div>
        <a className="evo__down" href="#como-funciona" aria-label="Seguir bajando"><Icon name="flecha" size={20} className="evo__chev" /></a>
      </div>
    </section>
  );
}
