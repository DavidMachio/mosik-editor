import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';
import Icon from '../components/Icon.jsx';
import { porSlug } from '../data/colecciones/index.js';
import { usuarioPorHandle } from '../data/usuarios.js';
import NotFound from './NotFound.jsx';
import './Coleccion.css';

const PINES_PREDEFINIDOS = [20, 29, 40];
const GAMAS = { m: { nombre: 'Mini', sub: 'Artkal M · sólidos' }, s: { nombre: 'Midi', sub: 'Artkal S · sólidos' } };

// Un diseño en la gama elegida (los colores y las cuentas por color cambian; el tamaño no).
const enGama = (d, g) => ({ ...d, colores: d.gamas[g].colores, filas: d.gamas[g].filas });
const placasDe = (ancho, alto, pines) => { const c = Math.ceil(ancho / pines); const r = Math.ceil(alto / pines); return { c, r, n: c * r }; };

// Líneas de guía cada «pines» cuentas (límite de cada placa).
function Guias({ ancho, alto, pines }) {
  const out = [];
  for (let x = pines; x < ancho; x += pines) out.push(<line key={`x${x}`} x1={x * 10} y1="-6" x2={x * 10} y2={alto * 10 + 6} className="evo-prev__guide" />);
  for (let y = pines; y < alto; y += pines) out.push(<line key={`y${y}`} x1="-6" y1={y * 10} x2={ancho * 10 + 6} y2={y * 10} className="evo-prev__guide" />);
  return <g aria-hidden="true">{out}</g>;
}

// Ajustes comunes de la página: gama (Mini/Midi) y cuentas por placa. Recalculan colores y placas.
function Ajustes({ gama, setGama, pines, setPines }) {
  return (
    <div className="evo-set" role="group" aria-label="Ajustes del cálculo">
      <div className="evo-set__item">
        <span className="evo-set__label" id="evo-gama-l">Gama de cuentas</span>
        <div className="evo-seg" role="radiogroup" aria-labelledby="evo-gama-l">
          {Object.entries(GAMAS).map(([k, v]) => (
            <button key={k} type="button" role="radio" aria-checked={gama === k} className="evo-seg__btn" onClick={() => setGama(k)}>{v.nombre}</button>
          ))}
        </div>
      </div>
      <div className="evo-set__item">
        <span className="evo-set__label" id="evo-pines-l">Cuentas por placa (lado)</span>
        <div className="evo-seg" role="radiogroup" aria-labelledby="evo-pines-l">
          {PINES_PREDEFINIDOS.map((n) => (
            <button key={n} type="button" role="radio" aria-checked={pines === n} className="evo-seg__btn" onClick={() => setPines(n)}>{n} × {n}</button>
          ))}
          <label className="evo-seg__other">Otra
            <input type="number" min="5" max="100" inputMode="numeric" value={pines}
              onChange={(e) => { const v = Math.round(Number(e.target.value)); if (v >= 5 && v <= 100) setPines(v); }} />
          </label>
        </div>
      </div>
    </div>
  );
}

// Vista previa del diseño: una cuenta (círculo con agujero) por cada píxel del sprite.
function Preview({ fase, pines, resaltar }) {
  const color = useMemo(() => Object.fromEntries(fase.colores.map((c) => [c.letra, c.hex])), [fase]);
  const letraDe = useMemo(() => Object.fromEntries(fase.colores.map((c) => [c.codigo, c.letra])), [fase]);
  const beads = [];
  fase.filas.forEach((fila, y) => {
    for (let x = 0; x < fila.length; x += 1) {
      const ch = fila[x];
      if (ch === '.') continue;
      beads.push(<circle key={`${x}-${y}`} cx={x * 10 + 5} cy={y * 10 + 5} r="4.6" fill={color[ch]} opacity={resaltar && letraDe[resaltar] !== ch ? 0.1 : 1} />);
    }
  });
  const holes = [];
  fase.filas.forEach((fila, y) => {
    for (let x = 0; x < fila.length; x += 1) if (fila[x] !== '.') holes.push(<circle key={`h${x}-${y}`} cx={x * 10 + 5} cy={y * 10 + 5} r="1.7" className="evo-prev__hole" opacity={resaltar && letraDe[resaltar] !== fila[x] ? 0.1 : 1} />);
  });
  return (
    <svg className="evo-prev__svg" viewBox={`-6 -6 ${fase.ancho * 10 + 12} ${fase.alto * 10 + 12}`} role="img"
      aria-label={`Vista previa en cuentas: ${fase.ancho} por ${fase.alto}, ${fase.cuentas} cuentas`}>
      {beads}{holes}
      <Guias ancho={fase.ancho} alto={fase.alto} pines={pines} />
    </svg>
  );
}


// Los tres diseños juntos: composición en cuentas, totales y gama con la cantidad de cada color.
function Conjunto({ disenos: EVOLUCIONES, gama, setGama, pines, setPines }) {
  const [selRaw, setSel] = useState(null);
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
  }, [EVOLUCIONES]);
  const sel = data.colores.some((c) => c.codigo === selRaw) ? selRaw : null; // al cambiar de gama el código puede no existir
  const placas = placasDe(data.ancho, data.alto, pines);
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
        <h2 id="evo-all-t">Si haces {EVOLUCIONES.length === 2 ? 'los dos' : EVOLUCIONES.length === 3 ? 'los tres' : 'todos'}</h2>
        <p className="muted">La línea completa, una al lado de otra. Pulsa un color para verlo pintado en la composición.</p>
      </div>
      <Ajustes gama={gama} setGama={setGama} pines={pines} setPines={setPines} />
      <ul className="evo-stats evo-stats--all" aria-label="Datos de todos los diseños juntos">
        <li className="evo-stat evo-stat--big"><span className="evo-stat__label">Total de cuentas</span><strong>{data.total.toLocaleString('es-ES')}</strong></li>
        <li className="evo-stat"><span className="evo-stat__label">Colores distintos</span><strong>{data.colores.length}</strong></li>
        <li className="evo-stat"><span className="evo-stat__label">Diseños</span><strong>{EVOLUCIONES.length}</strong><span className="evo-stat__sub">{EVOLUCIONES.map((f) => f.cuentas).join(' + ')}</span></li>
        <li className="evo-stat"><span className="evo-stat__label">Placas</span><strong>{placas.n}</strong><span className="evo-stat__sub">{placas.c} × {placas.r} de {pines} × {pines} · tablero de {data.ancho} × {data.alto}</span></li>
      </ul>
      <div className="evo-prev__stage evo-all__stage">
        <svg className="evo-prev__svg" viewBox={`-6 -6 ${data.ancho * 10 + 12} ${data.alto * 10 + 12}`} role="img"
          aria-label={`Los diseños juntos: ${data.total} cuentas, ${data.colores.length} colores y ${placas.n} placas`}>{beads}<Guias ancho={data.ancho} alto={data.alto} pines={pines} /></svg>
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

const num = (n) => (n ? `Nº ${String(n).padStart(3, '0')}` : '');

export default function Coleccion() {
  const { slug } = useParams();
  const col = porSlug(slug);
  if (!col) return <NotFound />;
  return <ColeccionPagina col={col} />;
}

function ColeccionPagina({ col }) {
  const [gama, setGama] = useState('m');
  const [pines, setPines] = useState(29);
  const [selFicha, setSelFicha] = useState(null);
  const EVOLUCIONES = useMemo(() => col.disenos.map((d) => enGama(d, gama)), [col, gama]);
  usePageTitle(`${col.titulo} · Mosik Beads`);
  const [params, setParams] = useSearchParams();
  const sel = Math.max(1, Math.min(EVOLUCIONES.length, Number(params.get('fase')) || 1));
  const fase = EVOLUCIONES[sel - 1];
  const pick = (i) => setParams({ fase: String(i + 1) }, { replace: true });
  const resaltar = fase.colores.some((c) => c.codigo === selFicha) ? selFicha : null; // se limpia solo al cambiar de diseño o gama
  const autor = usuarioPorHandle(params.get('autor'));
  // Llegando desde el perfil o los recomendados: se baja directo a la ficha del diseño (la tarjeta del autor se queda pegada arriba)
  useEffect(() => {
    if (!params.get('autor')) return;
    const el = document.getElementById('evo-ficha');
    if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const t = col.tema;
  const style = { '--evo-bg': t.fondo, '--evo-a': t.circulo, '--evo-b': t.circulo2, '--evo-yellow': t.acento };

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
    <div className="container evo-page" style={style}>
      {autor && (
        <aside className="evo-author" aria-label="Autor del diseño">
          <span className="evo-author__av" style={{ background: autor.tono }} aria-hidden="true">{autor.nombre[0]}</span>
          <div className="evo-author__txt">
            <p className="evo-author__by">Diseño de</p>
            <p className="evo-author__name">@{autor.handle}</p>
            <p className="evo-author__bio">{autor.nombre} · {autor.bio}</p>
          </div>
          <div className="evo-author__stats"><b>{autor.disenos.length}</b><span>diseños</span></div>
          <Link to={`/usuario/${autor.handle}`} className="btn evo-author__btn"><Icon name="usuario" size={18} /> Ver perfil</Link>
        </aside>
      )}
      <nav className="evo-page__crumbs" aria-label="Dónde estás"><Link to="/">Inicio</Link> <span aria-hidden="true">/</span> <span>{col.titulo}</span></nav>

      <header className="evo-hero">
        <span className="evo-hero__circle" aria-hidden="true" />
        <p className="evo-hero__kicker"><Icon name="paleta" size={18} /> Colección{col.entrega ? ` · ${col.entrega}` : ''}</p>
        <h1>{col.titulo}</h1>
        <p className="evo-hero__lead">{col.intro}</p>
        {EVOLUCIONES.length > 1 && EVOLUCIONES.length <= 6 && <Conjunto disenos={EVOLUCIONES} gama={gama} setGama={setGama} pines={pines} setPines={setPines} />}
        <p className="evo-hero__pick">{EVOLUCIONES.length > 1 ? 'O elige un diseño para ver su ficha:' : 'Su ficha:'}</p>
        <div className="evo-tabs" role="tablist" aria-label="Diseños de la colección">
          {EVOLUCIONES.map((f, i) => (
            <button key={f.id} type="button" role="tab" id={`evo-tab-${i}`} aria-selected={i === sel - 1} aria-controls="evo-ficha"
              tabIndex={i === sel - 1 ? 0 : -1} className="evo-tab" onClick={() => pick(i)} onKeyDown={(e) => onKey(e, i)}>
              <span className="evo-tab__img"><img src={`/colecciones/${col.slug}/${f.id}.png`} alt="" width={f.ancho} height={f.alto} /></span>
              <span className="evo-tab__txt">{f.numero ? <span className="evo-tab__num">{num(f.numero)}</span> : null}<span className="evo-tab__name">{f.nombre}</span><span className="evo-tab__phase">{f.fase}</span></span>
            </button>
          ))}
        </div>
      </header>

      <section className="evo-ficha" id="evo-ficha" role="tabpanel" aria-labelledby={`evo-tab-${sel - 1}`}>
        <div className="evo-ficha__head">
          <p className="evo-ficha__num">{[num(fase.numero), fase.fase].filter(Boolean).join(' · ')}</p>
          <h2>{fase.nombre}</h2>
        </div>

        <ul className="evo-stats" aria-label="Datos del diseño">
          <li className="evo-stat evo-stat--big"><span className="evo-stat__label">Total de cuentas</span><strong>{fase.cuentas.toLocaleString('es-ES')}</strong></li>
          <li className="evo-stat"><span className="evo-stat__label">Colores</span><strong>{fase.colores.length}</strong></li>
          <li className="evo-stat"><span className="evo-stat__label">Tamaño</span><strong>{fase.ancho} × {fase.alto}</strong><span className="evo-stat__sub">cuentas</span></li>
          <li className="evo-stat"><span className="evo-stat__label">Placas</span><strong>{placasDe(fase.ancho, fase.alto, pines).n}</strong><span className="evo-stat__sub">{placasDe(fase.ancho, fase.alto, pines).c} × {placasDe(fase.ancho, fase.alto, pines).r} de {pines} × {pines}</span></li>
          <li className="evo-stat"><span className="evo-stat__label">Gama</span><strong>{GAMAS[gama].nombre}</strong><span className="evo-stat__sub">{GAMAS[gama].sub}</span></li>
        </ul>

        <div className="evo-ficha__body">
          <figure className="evo-prev">
            <div className="evo-prev__stage"><Preview fase={fase} pines={pines} resaltar={resaltar} /></div>
            <figcaption>Vista previa en cuentas</figcaption>
          </figure>
          <div className="evo-colors">
            <h3>Colores y cuentas</h3>
            <p className="muted evo-colors__hint">Pulsa un color para resaltarlo en la vista previa.</p>
            <ul className="evo-colors__list">
              {fase.colores.map((c) => (
                <li key={c.codigo}>
                  <button type="button" className="evo-chip evo-chip--btn" aria-pressed={resaltar === c.codigo} onClick={() => setSelFicha(resaltar === c.codigo ? null : c.codigo)}>
                    <span className="evo-chip__sw" style={{ backgroundColor: c.hex }} aria-hidden="true" />
                    <span className="evo-chip__code">{c.codigo}</span>
                    <span className="evo-chip__n">{c.cuentas} {c.cuentas === 1 ? 'cuenta' : 'cuentas'}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="muted evo-colors__note">Las cuentas son una por píxel del diseño. Los códigos son los más cercanos de la gama {GAMAS[gama].nombre}; revisa el recuento con un 10 % de margen.</p>
            <div className="evo-colors__cta">
              <Link to={`/herramienta?modelo=${col.slug}&fase=${fase.id}&gama=${gama}&pines=${pines}`} className="btn"><Icon name="pincel" size={18} /> Editar el mío</Link>
              <Link to={`/montaje?modelo=${col.slug}&fase=${fase.id}&gama=${gama}&pines=${pines}`} className="btn btn--outline"><Icon name="cuentas" size={18} /> Montar</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
