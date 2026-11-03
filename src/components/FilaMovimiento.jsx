import { Link } from 'react-router-dom';
import useCargaProgresiva from '../hooks/useCargaProgresiva.js';
import './FilaMovimiento.css';

// «Más de N» redondeando hacia abajo (centenas si hay muchas cuentas, decenas si hay pocas)
const masDe = (n) => {
  const base = n >= 500 ? 100 : 10;
  return `+${(Math.floor(n / base) * base).toLocaleString('es-ES', { useGrouping: 'always' })}`;
};

// Tarjeta en fila de un movimiento: la viñeta con el GIF en bucle a la izquierda, el nombre (en una línea) y los fotogramas,
// y los datos en una línea abajo a la derecha. Sin botón: si el movimiento tiene ficha (slug de colección), pulsar la tarjeta entra en ella.
export default function FilaMovimiento({ luchador, mov, tema, coleccion, tituloH = 3 }) {
  const t = tema;
  const d = mov.datos;
  const [ref, src] = useCargaProgresiva(mov.gifPeq, mov.gif);
  const n = mov.frames.length;
  const escala = Math.max(0.8, Math.min(2.2, 120 / d.alto, (520 - 10 * (n - 1)) / n / d.ancho));
  const b = mov.bordes || {};
  const style = {
    '--l-bg': t.fondo, '--l-a': t.circulo, '--l-b': t.circulo2, '--l-acc': t.acento,
    '--gw': mov.gifAncho, '--gh': mov.gifAlto,
    // halo en los lados por los que el dibujo se acerca al borde recortado del GIF
    '--hl': b.l ? 0.5 : 0, '--hr': b.r ? 0.5 : 0, '--ht': b.t ? 0.5 : 0,
  };
  const Titulo = `h${tituloH}`;
  const cuerpo = (
    <>
      <span className="fila__circle" aria-hidden="true" />
      <div className="fila__vineta" ref={ref}>
        {src && <img className="fila__gif" src={src} alt={`${luchador.nombre}: ${mov.nombre}, animación`} width={mov.gifAncho} height={mov.gifAlto} decoding="async" />}
      </div>
      <div className="fila__body">
        <p className="fila__who">{luchador.nombre}</p>
        <Titulo className="fila__name">{mov.nombre}</Titulo>
        <ul className="fila__frames" aria-hidden="true">
          {mov.frames.map((f) => (
            <li key={f}><img src={f} alt="" loading="lazy" decoding="async" style={{ height: `${d.alto * escala}px` }} /></li>
          ))}
        </ul>
      </div>
      {!coleccion && <span className="fila__soon">Ficha próximamente</span>}
      <p className="fila__data" aria-label="Datos de cada diseño">
        <span><b>{masDe(d.cuentasMin)}</b> cuentas</span>
        <span><b>{d.colores}</b> colores</span>
        <span><b>{d.ancho} × {d.alto}</b></span>
      </p>
    </>
  );
  return coleccion
    ? <Link to={`/colecciones/${coleccion}`} className="fila" style={style} aria-label={`${luchador.nombre}, ${mov.nombre}: ver los ${n === 1 ? 'diseño' : `${n} diseños`}`}>{cuerpo}</Link>
    : <div className="fila fila--off" style={style}>{cuerpo}</div>;
}
