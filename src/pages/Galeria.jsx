import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { request } from '../lib/api.js';
import usePageTitle from '../hooks/usePageTitle.js';
import DesignCard from '../components/DesignCard.jsx';
import '../components/DesignCard.css';
import './Galeria.css';

export default function Galeria() {
  usePageTitle('Galería · Mosik Beads');
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const tag = params.get('etiqueta') || '';
  const owner = params.get('autor') || '';
  const page = Math.max(1, parseInt(params.get('pagina'), 10) || 1);

  const [text, setText] = useState(q);
  const [state, setState] = useState({ status: 'loading', designs: [], hasMore: false, error: '' });

  useEffect(() => setText(q), [q]);

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, status: 'loading' }));
    const query = new URLSearchParams({ page: String(page) });
    if (q) query.set('q', q);
    if (tag) query.set('tag', tag);
    if (owner) query.set('owner', owner);
    request(`/api/designs?${query}`)
      .then((data) => !cancelled && setState({ status: 'ready', designs: data.designs, hasMore: data.hasMore, error: '' }))
      .catch((err) => !cancelled && setState({ status: 'error', designs: [], hasMore: false, error: err.message }));
    return () => { cancelled = true; };
  }, [q, tag, owner, page]);

  const update = (changes) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(changes)) (v ? next.set(k, v) : next.delete(k));
    if (!('pagina' in changes)) next.delete('pagina');
    setParams(next);
  };

  const filters = [
    q && { label: `Búsqueda: ${q}`, clear: { q: '' } },
    tag && { label: `#${tag}`, clear: { etiqueta: '' } },
    owner && { label: `@${owner}`, clear: { autor: '' } },
  ].filter(Boolean);

  return (
    <div className="container galeria">
      <h1>Galería</h1>

      <form className="galeria__search" role="search" onSubmit={(e) => { e.preventDefault(); update({ q: text.trim() }); }}>
        <label htmlFor="galeria-q" className="visually-hidden">Buscar diseños</label>
        <input id="galeria-q" type="search" value={text} onChange={(e) => setText(e.target.value)} placeholder="Busca por palabras: calabaza, halloween, dragón…" maxLength={60} />
        <button type="submit" className="btn">Buscar</button>
      </form>

      {filters.length > 0 && (
        <ul className="galeria__filters" aria-label="Filtros activos">
          {filters.map((f) => (
            <li key={f.label}>
              <button type="button" className="chip-btn" onClick={() => update(f.clear)} aria-label={`Quitar filtro ${f.label}`}>{f.label} <span aria-hidden="true">×</span></button>
            </li>
          ))}
        </ul>
      )}

      <div aria-live="polite">
        {state.status === 'loading' && <p className="muted">Cargando diseños…</p>}
        {state.status === 'error' && <p role="alert">{state.error}</p>}
        {state.status === 'ready' && state.designs.length === 0 && (
          <p className="muted">
            {filters.length ? 'No hay diseños con esos filtros.' : 'Todavía no hay diseños públicos.'}{' '}
            <Link to="/herramienta">Crea el primero</Link>
          </p>
        )}
      </div>

      {state.designs.length > 0 && (
        <ul className="design-grid">
          {state.designs.map((d) => <li key={d.id}><DesignCard design={d} /></li>)}
        </ul>
      )}

      {(page > 1 || state.hasMore) && (
        <nav className="galeria__pager" aria-label="Paginación">
          <button type="button" className="btn btn--ghost" disabled={page <= 1} onClick={() => update({ pagina: String(page - 1) })}>Anteriores</button>
          <span className="muted">Página {page}</span>
          <button type="button" className="btn btn--ghost" disabled={!state.hasMore} onClick={() => update({ pagina: String(page + 1) })}>Siguientes</button>
        </nav>
      )}
    </div>
  );
}
