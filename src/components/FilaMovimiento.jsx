import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import './FilaMovimiento.css';

// Redondea «hacia abajo» para decir «más de N» (centenas si hay muchas cuentas, decenas si hay pocas)
const masDe = (n) => {
  const base = n >= 500 ? 100 : 10;
  return `+${(Math.floor(n / base) * base).toLocaleString('es-ES', { useGrouping: 'always' })}`;
};

// Tarjeta en fila de un movimiento: el GIF en bucle a la izquierda, el nombre y los fotogramas en el centro y, a la derecha,
// tarjetas pequeñas de datos con el botón. Si el movimiento ya tiene colección con ficha (slug), toda la tarjeta lleva a ella.
export default function FilaMovimiento({ luchador, mov, tema, coleccion, tituloH = 3 }) {
  const t = tema;
  const style = { '--l-bg': t.fondo, '--l-a': t.circulo, '--l-b': t.circulo2, '--l-acc': t.acento };
  const d = mov.datos;
  // los fotogramas caben en una sola línea siempre que se pueda: la escala baja cuando hay muchos
  const n = mov.frames.length;
  const escala = Math.max(0.8, Math.min(2.2, 130 / d.alto, (300 - 10 * (n - 1)) / n / d.ancho));
  const stats = [
    { v: masDe(d.cuentasMin), t: mov.frames.length > 1 ? 'cuentas por diseño' : 'cuentas' },
    { v: String(d.colores), t: 'colores' },
    { v: `${d.ancho} × ${d.alto}`, t: 'cuentas de tamaño' },
  ];
  const H = `h${tituloH}`;
  const cuerpo = (
    <>
      <span className="fila__circle" aria-hidden="true" />
      <img className="fila__gif" src={mov.gif} alt={`${luchador.nombre}: ${mov.nombre}, animación`} loading="lazy" decoding="async" />
      <div className="fila__body">
        <p className="fila__who">{luchador.nombre}</p>
        {H === 'h2' ? <h2 className="fila__name">{mov.nombre}</h2> : <h3 className="fila__name">{mov.nombre}</h3>}
        <ul className="fila__frames" aria-hidden="true">
          {mov.frames.map((src) => (
            <li key={src}><img src={src} alt="" loading="lazy" style={{ height: `${d.alto * escala}px` }} /></li>
          ))}
        </ul>
      </div>
      <div className="fila__side">
        <ul className="fila__stats" aria-label="Datos de cada diseño">
          {stats.map((x) => <li key={x.t} className="fila__stat"><strong>{x.v}</strong><span>{x.t}</span></li>)}
        </ul>
        {coleccion
          ? <span className="fila__cta">Ver {mov.frames.length === 1 ? 'el diseño' : `los ${mov.frames.length} diseños`} <Icon name="flecha" size={18} /></span>
          : <span className="fila__cta fila__cta--off" aria-disabled="true">Ficha próximamente</span>}
      </div>
    </>
  );
  return coleccion
    ? <Link to={`/colecciones/${coleccion}`} className="fila" style={style} aria-label={`${luchador.nombre}, ${mov.nombre}: ver los diseños`}>{cuerpo}</Link>
    : <div className="fila fila--off" style={style}>{cuerpo}</div>;
}
