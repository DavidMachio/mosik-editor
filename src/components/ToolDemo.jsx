import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import './ToolDemo.css';

// Animación de uso de la herramienta (decorativa): se pinta un diseño cuenta a cuenta con varios colores,
// se añade una segunda capa, se mueve y aparece el recuento. Con «reducir movimiento» se ve el resultado final fijo.
const COLORES = { R: '#E8431F', P: '#F4A6B8', D: '#8E1F1F', Y: '#FBE56E' };
const NOMBRES = { R: 'Rojo', P: 'Rosa', D: 'Granate', Y: 'Amarillo' };
const CORAZON = [
  '..RRR...RRR..',
  '.RRRRR.RRRRR.',
  'RRPPRRRRRRRRR',
  'RRPRRRRRRRRRR',
  'RRRRRRRRRRRRR',
  '.RRRRRRRRRRR.',
  '..RDRRRRRDD..',
  '...DRRRRDD...',
  '....DRRDD....',
  '.....DDD.....',
  '......D......',
];
const ESTRELLA = [
  '...Y...',
  '...Y...',
  'YYYYYYY',
  '.YYYYY.',
  '..YYY..',
  '.YY.YY.',
  '.Y...Y.',
];
const COLS = 17;
const ROWS = 14;
const CICLO = 15500;

function celdas(mapa, ox, oy) {
  const out = [];
  mapa.forEach((fila, y) => [...fila].forEach((c, x) => { if (c !== '.') out.push({ x: x + ox, y: y + oy, c }); }));
  return out;
}

// Línea de tiempo: cada celda tiene el instante (ms) en que aparece
function guion() {
  const corazon = celdas(CORAZON, 1, 0);
  const orden = ['R', 'P', 'D'];
  const tramos = { R: [900, 4300], P: [4700, 5500], D: [5900, 7000] };
  const cuerpo = [];
  orden.forEach((col) => {
    const lista = corazon.filter((q) => q.c === col);
    const [a, b] = tramos[col];
    lista.forEach((q, i) => cuerpo.push({ ...q, t: a + ((b - a) * i) / Math.max(1, lista.length - 1) }));
  });
  const estrella = celdas(ESTRELLA, 9, 0).map((q, i, arr) => ({ ...q, t: 8300 + (1500 * i) / Math.max(1, arr.length - 1) }));
  return { cuerpo, estrella };
}

const HERRAMIENTAS = [['pincel', 'Pincel'], ['borrador', 'Borrador'], ['bote', 'Bote'], ['cuentagotas', 'Cuentagotas'], ['mover', 'Mano']];

export default function ToolDemo() {
  const { cuerpo, estrella } = useMemo(guion, []);
  const reducir = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [t, setT] = useState(reducir ? 13000 : 0);
  const caja = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = caja.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reducir || !visible) return undefined;
    let ini = performance.now() - t;
    const id = window.setInterval(() => setT((performance.now() - ini) % CICLO), 45);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducir, visible]);

  // Estado derivado del instante t
  const pintadas = cuerpo.filter((q) => t >= q.t);
  const ultima = pintadas[pintadas.length - 1];
  const colorActivo = t < 4500 ? 'R' : t < 5800 ? 'P' : t < 8000 ? 'D' : 'Y';
  const capa2 = t >= 7600;
  const estrellaVista = estrella.filter((q) => t >= q.t);
  const mueve = t >= 10300 && t < 11300; // la capa 2 se desplaza
  const desp = t < 10300 ? [0, 0] : t < 10800 ? [1, 0] : t < 11300 ? [1, 1] : [2, 1];
  const ultimaE = estrellaVista[estrellaVista.length - 1];
  const herr = t < 7600 ? 'pincel' : t < 10300 ? 'pincel' : t < 11500 ? 'mover' : 'cuentagotas';
  const recuento = t >= 11800;
  const fin = t > 14600;

  // Cuentas visibles (la capa de arriba tapa a la de abajo)
  const ocupadas = new Map();
  pintadas.forEach((q) => ocupadas.set(`${q.x},${q.y}`, q.c));
  estrellaVista.forEach((q) => ocupadas.set(`${q.x + desp[0]},${q.y + desp[1]}`, q.c));
  const total = ocupadas.size;
  const porColor = {};
  ocupadas.forEach((c) => { porColor[c] = (porColor[c] || 0) + 1; });

  // Cursor: sigue la última cuenta puesta (o se queda quieto entre fases)
  let cur = null;
  if (t < 900) cur = { x: 0, y: 0 };
  else if (t < 7100) cur = ultima || { x: 6, y: 5 };
  else if (t < 8300) cur = { x: 13, y: 1 };
  else if (t < 9900) cur = ultimaE ? { x: ultimaE.x, y: ultimaE.y } : { x: 12, y: 1 };
  else if (t < 11400) cur = { x: 12 + desp[0], y: 3 + desp[1] };
  else cur = { x: 6, y: 5 };

  const beads = [];
  pintadas.forEach((q) => {
    if (ocupadas.get(`${q.x},${q.y}`) !== q.c) return; // tapada por la capa de arriba
    beads.push(<g key={`a${q.x}-${q.y}`}><circle cx={q.x * 10 + 5} cy={q.y * 10 + 5} r="4.5" fill={COLORES[q.c]} /><circle cx={q.x * 10 + 5} cy={q.y * 10 + 5} r="1.6" className="tdemo__hole" /></g>);
  });
  estrellaVista.forEach((q) => {
    const x = q.x + desp[0];
    const y = q.y + desp[1];
    if (x >= COLS || y >= ROWS) return;
    beads.push(<g key={`b${q.x}-${q.y}`}><circle cx={x * 10 + 5} cy={y * 10 + 5} r="4.5" fill={COLORES[q.c]} /><circle cx={x * 10 + 5} cy={y * 10 + 5} r="1.6" className="tdemo__hole" /></g>);
  });
  const rejilla = [];
  for (let y = 0; y < ROWS; y += 1) for (let x = 0; x < COLS; x += 1) rejilla.push(<circle key={`${x}-${y}`} cx={x * 10 + 5} cy={y * 10 + 5} r="4" className="tdemo__empty" />);

  return (
    <div className={`tdemo${fin ? ' tdemo--fin' : ''}`} ref={caja} role="img"
      aria-label="Animación de la herramienta: se dibuja un corazón con cuentas de varios colores, se añade una segunda capa con una estrella, se mueve y aparece el recuento de cuentas.">
      <div className="tdemo__bar" aria-hidden="true">
        {HERRAMIENTAS.map(([n, l]) => (
          <span key={n} className={`tdemo__tool${herr === n ? ' on' : ''}`} title={l}><Icon name={n} size={20} /></span>
        ))}
        <span className="tdemo__sp" />
        <span className="tdemo__count"><b>{total}</b> cuentas</span>
      </div>

      <div className="tdemo__main" aria-hidden="true">
        <div className="tdemo__board">
          <svg viewBox={`-3 -3 ${COLS * 10 + 6} ${ROWS * 10 + 6}`}>
            <rect x="0" y="0" width={COLS * 10} height={ROWS * 10} className="tdemo__bg" />
            <g>{rejilla}</g>
            <g>{beads}</g>
            <g className="tdemo__cursor" style={{ transform: `translate(${cur.x * 10 + 8}px, ${cur.y * 10 + 8}px)` }}>
              <circle r="7" className="tdemo__ring" />
              <circle r="2" className="tdemo__dot" />
            </g>
          </svg>
        </div>
        <aside className="tdemo__layers">
          <p className="tdemo__h">Capas</p>
          <ul>
            <li className={capa2 ? 'tdemo__ly tdemo__ly--in' : 'tdemo__ly tdemo__ly--hide'}>
              <span className={capa2 && !mueve && t < 10300 ? 'tdemo__ly__dot on' : 'tdemo__ly__dot'} />Capa 2 · estrella
            </li>
            <li className={`tdemo__ly${capa2 ? '' : ' sel'}`}><span className="tdemo__ly__dot on" />Capa 1 · corazón</li>
          </ul>
          <div className={`tdemo__list${recuento ? ' tdemo__list--in' : ''}`}>
            <p className="tdemo__h">Recuento</p>
            {Object.keys(COLORES).map((k) => (
              <p key={k} className="tdemo__row"><i style={{ background: COLORES[k] }} />{NOMBRES[k]}<b>{porColor[k] || 0}</b></p>
            ))}
          </div>
        </aside>
      </div>

      <div className="tdemo__pal" aria-hidden="true">
        {Object.keys(COLORES).map((k) => (
          <span key={k} className={`tdemo__sw${colorActivo === k ? ' on' : ''}`} style={{ background: COLORES[k] }} />
        ))}
      </div>
    </div>
  );
}
