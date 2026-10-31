import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import { request } from '../lib/api.js';
import { GAMA_LABELS, previewUrl } from '../lib/designs.js';
import usePageTitle from '../hooks/usePageTitle.js';
import DesignActions from '../components/DesignActions.jsx';
import './Diseno.css';

const withMargin = (n) => Math.ceil((n * 1.1) / 10) * 10; // +10 % redondeado a múltiplos de 10, como en la herramienta

function countByColor(data) {
  const totals = data.palette.map(() => 0);
  for (let i = 0; i < data.rle.length; i += 2) if (data.rle[i] >= 0) totals[data.rle[i]] += data.rle[i + 1];
  return data.palette.map((code, i) => ({ code, count: totals[i] })).sort((a, b) => b.count - a.count);
}

export default function Diseno() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState({ status: 'loading', design: null, error: '' });
  usePageTitle(state.design ? `${state.design.title} · Mosik Beads` : 'Diseño · Mosik Beads');

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading', design: null, error: '' });
    request(`/api/designs/${id}`)
      .then(({ design }) => !cancelled && setState({ status: 'ready', design, error: '' }))
      .catch((err) => !cancelled && setState({ status: 'error', design: null, error: err.message }));
    return () => { cancelled = true; };
  }, [id]);

  const design = state.design;
  const colors = useMemo(() => (design ? countByColor(design.data) : []), [design]);
  const isMine = Boolean(user && design && design.ownerId === user.id);

  if (state.status === 'loading') return <p className="container muted" style={{ paddingTop: 32 }}>Cargando…</p>;
  if (state.status === 'error') {
    return (
      <div className="container" style={{ paddingTop: 32 }}>
        <h1>No encontramos este diseño</h1>
        <p className="muted">{state.error} Puede que sea privado o que ya no exista.</p>
        <Link className="btn" to="/galeria">Ver la galería</Link>
      </div>
    );
  }

  const { data } = design;
  return (
    <div className="container diseno">
      <p className="diseno__back"><Link to="/galeria">← Galería</Link></p>
      <div className="diseno__layout">
        <div className="diseno__media">
          <img src={previewUrl(design)} alt={`Vista previa de «${design.title}»`} style={{ aspectRatio: `${design.cols} / ${design.rows}` }} />
        </div>

        <div className="diseno__info">
          <h1>{design.title}</h1>
          <p className="muted">
            por <Link to={`/galeria?autor=${encodeURIComponent(design.ownerUsername)}`}>@{design.ownerUsername}</Link>
            {!design.isPublic && <> · <span className="pill">Privado</span></>}
          </p>
          {design.description && <p>{design.description}</p>}

          {design.tags.length > 0 && (
            <ul className="design-card__tags" aria-label="Etiquetas">
              {design.tags.map((tag) => <li key={tag}><Link to={`/galeria?etiqueta=${encodeURIComponent(tag)}`}>#{tag}</Link></li>)}
            </ul>
          )}

          <dl className="diseno__facts">
            <div><dt>Tablero</dt><dd>{data.pr * data.pc} {data.pr * data.pc === 1 ? 'placa' : 'placas'} · {data.cols} × {data.rows} cuentas</dd></div>
            <div><dt>Cuentas</dt><dd>{design.beads.toLocaleString('es-ES')}</dd></div>
            <div><dt>Colores</dt><dd>{design.colors}</dd></div>
            <div><dt>Gama</dt><dd>{GAMA_LABELS[design.gama] || design.gama}</dd></div>
          </dl>

          <div className="diseno__actions">
            {isMine ? (
              <DesignActions design={design} onChanged={(updated) => setState((s) => ({ ...s, design: { ...s.design, ...updated } }))} onDeleted={() => navigate('/perfil')} />
            ) : (
              <Link className="btn" to={`/herramienta?diseno=${design.id}`}>Usar como base</Link>
            )}
          </div>
        </div>
      </div>

      <section className="card diseno__colors" aria-labelledby="cuentas-por-color">
        <h2 id="cuentas-por-color">Cuentas por color</h2>
        <table>
          <thead><tr><th scope="col">Color</th><th scope="col">Cuentas</th><th scope="col">Con 10 % de margen</th></tr></thead>
          <tbody>
            {colors.map((c) => <tr key={c.code}><th scope="row">{c.code}</th><td>{c.count.toLocaleString('es-ES')}</td><td>{withMargin(c.count).toLocaleString('es-ES')}</td></tr>)}
          </tbody>
        </table>
      </section>
    </div>
  );
}
