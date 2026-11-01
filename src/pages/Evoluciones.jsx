import { useMemo } from 'react';
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
