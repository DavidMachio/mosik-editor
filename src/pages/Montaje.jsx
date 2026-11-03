import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';
import Icon from '../components/Icon.jsx';
import { modeloAEditor } from '../data/colecciones/modelo.js';
import './Montaje.css';

const CLAVE_EDITOR = 'mosik-montaje-editor';
const leer = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };
const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin almacenamiento: el progreso no se conserva */ } };

// Canvas de montaje: el modelo en cuentas, los colores debajo y un contador de las cuentas que faltan.
export default function Montaje() {
  usePageTitle('Montaje · Mosik Beads');
  const [params] = useSearchParams();
  const origen = params.get('origen');
  const slug = params.get('modelo');
  const fase = params.get('fase');
  const gama = params.get('gama');
  const pines = Number(params.get('pines'));

  // Modelo: de una colección (?modelo=...) o enviado desde el editor (?origen=editor).
  const delEditor = useMemo(() => {
    if (origen !== 'editor') return null;
    const e = leer(CLAVE_EDITOR);
    return e && e.data ? { titulo: e.titulo, data: e.data, hex: e.hex, clave: `editor:${e.ts}` } : null;
  }, [origen]);
  const [deColeccion, setDeColeccion] = useState(null); // las colecciones de los luchadores se cargan al abrir esta página
  const [cargando, setCargando] = useState(origen !== 'editor' && !!slug);
  useEffect(() => {
    if (origen === 'editor' || !slug) { setCargando(false); return undefined; }
    let cancelled = false;
    setCargando(true);
    modeloAEditor(slug, fase, gama, pines).then((r) => {
      if (cancelled) return;
      setDeColeccion(r ? { ...r, clave: `modelo:${slug}:${fase}:${gama}:${pines}` } : null);
      setCargando(false);
    });
    return () => { cancelled = true; };
  }, [origen, slug, fase, gama, pines]);
  const modelo = origen === 'editor' ? delEditor : deColeccion;

  const claveProgreso = modelo ? `mosik-montaje-progreso:${modelo.clave}` : null;
  const [hechos, setHechos] = useState([]);
  const [sel, setSel] = useState(null);
  const [zoom, setZoom] = useState(1);
  useEffect(() => { setHechos(claveProgreso ? (leer(claveProgreso) || []) : []); setSel(null); }, [claveProgreso]);
  useEffect(() => { if (claveProgreso) guardar(claveProgreso, hechos); }, [claveProgreso, hechos]);

  const info = useMemo(() => {
    if (!modelo) return null;
    const { cols, rows, pw, ph, grid } = modelo.data;
    const cuenta = {};
    grid.forEach((fila) => fila.forEach((c) => { if (c) cuenta[c] = (cuenta[c] || 0) + 1; }));
    const colores = Object.keys(cuenta).sort((a, b) => cuenta[b] - cuenta[a]).map((c) => ({ codigo: c, hex: modelo.hex[c] || '#999', n: cuenta[c] }));
    return { cols, rows, pw: pw || cols, ph: ph || rows, grid, colores, total: colores.reduce((a, c) => a + c.n, 0) };
  }, [modelo]);

  if (cargando) return <div className="container mnt"><h1>Montaje</h1><p className="muted" role="status">Preparando el diseño…</p></div>;
  if (!modelo || !info) {
    return (
      <div className="container mnt">
        <h1>Montaje</h1>
        <p className="muted">No hay ningún diseño para montar. Abre un modelo desde una colección o envía tu diseño desde la herramienta.</p>
        <p><Link to="/herramienta" className="btn">Ir a la herramienta</Link></p>
      </div>
    );
  }

  const hechosSet = new Set(hechos);
  const montadas = info.colores.filter((c) => hechosSet.has(c.codigo)).reduce((a, c) => a + c.n, 0);
  const faltan = info.total - montadas;
  const pct = info.total ? Math.round((montadas / info.total) * 100) : 0;
  const alternar = (codigo) => setHechos((h) => (h.includes(codigo) ? h.filter((x) => x !== codigo) : [...h, codigo]));
  const W = info.cols * 10;
  const H = info.rows * 10;

  const cuentas = [];
  info.grid.forEach((fila, y) => fila.forEach((c, x) => {
    if (!c) return;
    const op = sel ? (c === sel ? 1 : 0.1) : hechosSet.has(c) ? 0.3 : 1;
    cuentas.push(
      <g key={`${x}-${y}`} opacity={op}>
        <circle cx={x * 10 + 5} cy={y * 10 + 5} r="4.6" fill={modelo.hex[c]} />
        <circle cx={x * 10 + 5} cy={y * 10 + 5} r="1.7" className="mnt-board__hole" />
      </g>,
    );
  }));
  const guias = [];
  for (let x = info.pw; x < info.cols; x += info.pw) guias.push(<line key={`x${x}`} x1={x * 10} y1="0" x2={x * 10} y2={H} className="mnt-board__guide" />);
  for (let y = info.ph; y < info.rows; y += info.ph) guias.push(<line key={`y${y}`} x1="0" y1={y * 10} x2={W} y2={y * 10} className="mnt-board__guide" />);

  const seleccionado = info.colores.find((c) => c.codigo === sel);

  return (
    <div className="container mnt">
      <header className="mnt-top" aria-label="Progreso del montaje">
        <div className="mnt-top__title">
          <p className="mnt-top__kicker"><Icon name="cuentas" size={18} /> Montaje</p>
          <h1>{modelo.titulo}</h1>
        </div>
        <div className="mnt-count" role="status" aria-live="polite">
          <span className="mnt-count__label">Te faltan</span>
          <strong className="mnt-count__n">{faltan.toLocaleString('es-ES')}</strong>
          <span className="mnt-count__of">de {info.total.toLocaleString('es-ES')} cuentas</span>
        </div>
        <div className="mnt-prog">
          <div className="mnt-prog__bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Cuentas montadas"><span style={{ width: `${pct}%` }} /></div>
          <p>{hechos.length} de {info.colores.length} colores terminados · {pct} %</p>
        </div>
        <div className="mnt-top__actions">
          {slug && <Link to={`/colecciones/${slug}?fase=${fase ? Number(String(fase).replace(/\D/g, '')) || 1 : 1}`} className="mnt-btn">Volver a la ficha</Link>}
          {origen === 'editor' && <Link to="/herramienta" className="mnt-btn">Volver al editor</Link>}
          <button type="button" className="mnt-btn" onClick={() => { setHechos([]); setSel(null); }} disabled={!hechos.length}>Reiniciar</button>
        </div>
      </header>

      <section className="mnt-stage" aria-label="Modelo">
        <div className="mnt-zoom" role="group" aria-label="Zoom">
          <button type="button" onClick={() => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(1)))} aria-label="Alejar" disabled={zoom <= 1}><Icon name="alejar" size={20} /></button>
          <span>{Math.round(zoom * 100)} %</span>
          <button type="button" onClick={() => setZoom((z) => Math.min(5, +(z + 0.5).toFixed(1)))} aria-label="Acercar" disabled={zoom >= 5}><Icon name="acercar" size={20} /></button>
        </div>
        <div className="mnt-board" tabIndex={0} aria-label="Tablero de montaje (desplázate si está ampliado)">
          <svg viewBox={`-4 -4 ${W + 8} ${H + 8}`} style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }} role="img" aria-label={`Modelo de ${info.cols} por ${info.rows} cuentas`}>
            <rect x="0" y="0" width={W} height={H} className="mnt-board__bg" />
            {cuentas}
            <g aria-hidden="true">{guias}</g>
          </svg>
        </div>
      </section>

      <section className="mnt-colors" aria-labelledby="mnt-colores">
        <div className="mnt-colors__head">
          <h2 id="mnt-colores">Colores</h2>
          <p className="muted" aria-live="polite">
            {seleccionado
              ? <>Resaltado <strong>{seleccionado.codigo}</strong>: {seleccionado.n} cuentas{hechosSet.has(seleccionado.codigo) ? ' (terminado)' : ''}.</>
              : 'Pulsa un color para resaltarlo en el modelo; marca ✓ cuando lo termines.'}
          </p>
        </div>
        <ul className="mnt-list">
          {info.colores.map((c) => {
            const hecho = hechosSet.has(c.codigo);
            return (
              <li key={c.codigo} className={`mnt-chip${sel === c.codigo ? ' mnt-chip--sel' : ''}${hecho ? ' mnt-chip--done' : ''}`}>
                <button type="button" className="mnt-chip__main" aria-pressed={sel === c.codigo} onClick={() => setSel(sel === c.codigo ? null : c.codigo)}>
                  <span className="mnt-chip__sw" style={{ backgroundColor: c.hex }} aria-hidden="true" />
                  <span className="mnt-chip__code">{c.codigo}</span>
                  <span className="mnt-chip__n">{c.n} {c.n === 1 ? 'cuenta' : 'cuentas'}</span>
                </button>
                <button type="button" className="mnt-chip__check" aria-pressed={hecho} aria-label={hecho ? `Desmarcar ${c.codigo} como terminado` : `Marcar ${c.codigo} como terminado`} onClick={() => alternar(c.codigo)}>
                  <Icon name="aceptar" size={18} />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
