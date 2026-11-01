import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';
import Icon from '../components/Icon.jsx';
import { EVOLUCIONES } from '../data/evoluciones.js';
import './Evoluciones.css';

// Vista previa del diseño: una cuenta (círculo con agujero) por cada píxel del sprite.
function Preview({ fase }) {
  const color = useMemo(() => Object.fromEntries(fase.colores.map((c) => [c.letra, c.hex])), [fase]);
  const beads = [];
  fase.filas.forEach((fila, y) => {
    for (let x = 0; x < fila.length; x += 1) {
      const ch = fila[x];
      if (ch === '.') continue;
      beads.push(<circle key={`${x}-${y}`} cx={x * 10 + 5} cy={y * 10 + 5} r="4.6" fill={color[ch]} />);
    }
  });
  const holes = [];
  fase.filas.forEach((fila, y) => {
    for (let x = 0; x < fila.length; x += 1) if (fila[x] !== '.') holes.push(<circle key={`h${x}-${y}`} cx={x * 10 + 5} cy={y * 10 + 5} r="1.7" className="evo-prev__hole" />);
  });
  return (
    <svg className="evo-prev__svg" viewBox={`-6 -6 ${fase.ancho * 10 + 12} ${fase.alto * 10 + 12}`} role="img"
      aria-label={`Vista previa en cuentas: ${fase.ancho} por ${fase.alto}, ${fase.cuentas} cuentas`}>
      {beads}{holes}
    </svg>
  );
}


// Los tres diseños juntos: composición en cuentas, totales y gama con la cantidad de cada color.
function Conjunto() {
  const [sel, setSel] = useState(null);
  const GAP = 5;
  const data = useMemo(() => {
    const total = EVOLUCIONES.reduce((a, f) => a + f.cuentas, 0);
    const mapa = {};
    EVOLUCIONES.forEach((f, i) => f.colores.forEach((c) => {
      const m = mapa[c.codigo] || (mapa[c.codigo] = { codigo: c.codigo, hex: c.hex, total: 0, por: EVOLUCIONES.map(() => 0) });
      m.total += c.cuentas;
      m.por[i] = c.cuentas;
    }));
    const colores = Object.values(mapa).sort((a, b) => b.total - a.total);
    const alto = Math.max(...EVOLUCIONES.map((f) => f.alto));
    let x = 0;
    const pos = EVOLUCIONES.map((f) => { const o = x; x += f.ancho + GAP; return o; });
    return { total, colores, alto, ancho: x - GAP, pos };
  }, []);
  const elegido = data.colores.find((c) => c.codigo === sel);

  const beads = [];
  EVOLUCIONES.forEach((f, i) => {
    const letraCodigo = Object.fromEntries(f.colores.map((c) => [c.letra, c]));
    const dy = data.alto - f.alto; // alineados por abajo
    f.filas.forEach((fila, y) => {
      for (let x = 0; x < fila.length; x += 1) {
        const ch = fila[x];
        if (ch === '.') continue;
        const c = letraCodigo[ch];
        const cx = (data.pos[i] + x) * 10 + 5;
        const cy = (y + dy) * 10 + 5;
        const dim = sel && c.codigo !== sel;
        beads.push(
          <g key={`${i}-${x}-${y}`} opacity={dim ? 0.14 : 1}>
            <circle cx={cx} cy={cy} r="4.6" fill={c.hex} />
            <circle cx={cx} cy={cy} r="1.7" className="evo-prev__hole" />
          </g>,
        );
      }
    });
  });

  return (
    <section className="evo-all" aria-labelledby="evo-all-t">
      <div className="evo-all__head">
        <h2 id="evo-all-t">Si haces los tres</h2>
        <p className="muted">La línea completa, una al lado de otra. Pulsa un color para verlo pintado en la composición.</p>
      </div>
      <ul className="evo-stats evo-stats--all" aria-label="Datos de los tres diseños juntos">
        <li className="evo-stat evo-stat--big"><span className="evo-stat__label">Total de cuentas</span><strong>{data.total.toLocaleString('es-ES')}</strong></li>
        <li className="evo-stat"><span className="evo-stat__label">Colores distintos</span><strong>{data.colores.length}</strong></li>
        <li className="evo-stat"><span className="evo-stat__label">Diseños</span><strong>{EVOLUCIONES.length}</strong><span className="evo-stat__sub">{EVOLUCIONES.map((f) => f.cuentas).join(' + ')}</span></li>
      </ul>
      <div className="evo-prev__stage evo-all__stage">
        <svg className="evo-prev__svg" viewBox={`-6 -6 ${data.ancho * 10 + 12} ${data.alto * 10 + 12}`} role="img"
          aria-label={`Los tres diseños juntos: ${data.total} cuentas y ${data.colores.length} colores`}>{beads}</svg>
      </div>
      <div className="evo-all__gama">
        <div className="evo-all__gamahead">
          <h3>Gama y cantidad por color</h3>
          {sel && <button type="button" className="evo-all__reset" onClick={() => setSel(null)}>Ver todos</button>}
        </div>
        <ul className="evo-colors__list">
          {data.colores.map((c) => (
            <li key={c.codigo}>
              <button type="button" className="evo-chip evo-chip--btn" aria-pressed={sel === c.codigo} onClick={() => setSel(sel === c.codigo ? null : c.codigo)}>
                <span className="evo-chip__sw" style={{ backgroundColor: c.hex }} aria-hidden="true" />
                <span className="evo-chip__code">{c.codigo}</span>
                <span className="evo-chip__n">{c.total} {c.total === 1 ? 'cuenta' : 'cuentas'}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="evo-all__detail" aria-live="polite">
          {elegido
            ? <>El color <strong>{elegido.codigo}</strong>: {elegido.total} cuentas en total ({EVOLUCIONES.map((f, i) => `${f.nombre} ${elegido.por[i]}`).join(' · ')}).</>
            : 'Pulsa un color para ver cuántas cuentas lleva cada diseño.'}
        </p>
      </div>
    </section>
  );
}

const num = (n) => `Nº ${String(n).padStart(3, '0')}`;

export default function Evoluciones() {
  usePageTitle('Evoluciones · Mosik Beads');
  const [params, setParams] = useSearchParams();
  const sel = Math.max(1, Math.min(EVOLUCIONES.length, Number(params.get('fase')) || 1));
  const fase = EVOLUCIONES[sel - 1];
  const pick = (i) => setParams({ fase: String(i + 1) }, { replace: true });

  function onKey(e, i) {
    let n = null;
    if (e.key === 'ArrowRight') n = (i + 1) % EVOLUCIONES.length;
    else if (e.key === 'ArrowLeft') n = (i - 1 + EVOLUCIONES.length) % EVOLUCIONES.length;
    if (n == null) return;
    e.preventDefault();
    pick(n);
    document.getElementById(`evo-tab-${n}`)?.focus();
  }

  return (
    <div className="container evo-page">
      <nav className="evo-page__crumbs" aria-label="Dónde estás"><Link to="/">Inicio</Link> <span aria-hidden="true">/</span> <span>Evoluciones</span></nav>

      <header className="evo-hero">
        <span className="evo-hero__circle" aria-hidden="true" />
        <p className="evo-hero__kicker"><Icon name="paleta" size={18} /> Colección · Entrega 1</p>
        <h1>Evoluciones</h1>
        <p className="evo-hero__lead">Una línea evolutiva completa en tres diseños. Elige una fase para ver su ficha.</p>
        <Conjunto />
        <p className="evo-hero__pick">O elige un diseño para ver su ficha:</p>
        <div className="evo-tabs" role="tablist" aria-label="Fases de la línea">
          {EVOLUCIONES.map((f, i) => (
            <button key={f.id} type="button" role="tab" id={`evo-tab-${i}`} aria-selected={i === sel - 1} aria-controls="evo-ficha"
              tabIndex={i === sel - 1 ? 0 : -1} className="evo-tab" onClick={() => pick(i)} onKeyDown={(e) => onKey(e, i)}>
              <span className="evo-tab__img"><img src={`/colecciones/evoluciones/${f.id}.png`} alt="" width={f.ancho} height={f.alto} /></span>
              <span className="evo-tab__txt"><span className="evo-tab__num">{num(f.numero)}</span><span className="evo-tab__name">{f.nombre}</span><span className="evo-tab__phase">{f.fase}</span></span>
            </button>
          ))}
        </div>
      </header>

      <section className="evo-ficha" id="evo-ficha" role="tabpanel" aria-labelledby={`evo-tab-${sel - 1}`}>
        <div className="evo-ficha__head">
          <p className="evo-ficha__num">{num(fase.numero)} · {fase.fase}</p>
          <h2>{fase.nombre}</h2>
        </div>

        <ul className="evo-stats" aria-label="Datos del diseño">
          <li className="evo-stat evo-stat--big"><span className="evo-stat__label">Total de cuentas</span><strong>{fase.cuentas.toLocaleString('es-ES')}</strong></li>
          <li className="evo-stat"><span className="evo-stat__label">Colores</span><strong>{fase.colores.length}</strong></li>
          <li className="evo-stat"><span className="evo-stat__label">Tamaño</span><strong>{fase.ancho} × {fase.alto}</strong><span className="evo-stat__sub">cuentas</span></li>
          <li className="evo-stat"><span className="evo-stat__label">Gama</span><strong>Mini</strong><span className="evo-stat__sub">Artkal M · sólidos</span></li>
        </ul>

        <div className="evo-ficha__body">
          <figure className="evo-prev">
            <div className="evo-prev__stage"><Preview fase={fase} /></div>
            <figcaption>Vista previa en cuentas</figcaption>
          </figure>
          <div className="evo-colors">
            <h3>Colores y cuentas</h3>
            <ul className="evo-colors__list">
              {fase.colores.map((c) => (
                <li key={c.codigo} className="evo-chip">
                  <span className="evo-chip__sw" style={{ backgroundColor: c.hex }} aria-hidden="true" />
                  <span className="evo-chip__code">{c.codigo}</span>
                  <span className="evo-chip__n">{c.cuentas} {c.cuentas === 1 ? 'cuenta' : 'cuentas'}</span>
                </li>
              ))}
            </ul>
            <p className="muted evo-colors__note">Las cuentas son una por píxel del diseño. Los códigos son los más cercanos de la gama Mini; revisa el recuento con un 10 % de margen.</p>
            <Link to="/herramienta" className="btn evo-colors__cta"><Icon name="pincel" size={18} /> Crear el mío en la herramienta</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
