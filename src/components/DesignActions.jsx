import { Link } from 'react-router-dom';
import { useState } from 'react';
import { request } from '../lib/api.js';

// Acciones del dueño sobre un diseño: abrir en la herramienta, cambiar visibilidad y borrar.
export default function DesignActions({ design, onChanged, onDeleted }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function run(fn) {
    setBusy(true);
    setError('');
    try { await fn(); } catch (err) { setError(err.message); } finally { setBusy(false); }
  }

  const toggleVisibility = () => run(async () => {
    const { design: updated } = await request(`/api/designs/${design.id}`, { method: 'PATCH', body: { isPublic: !design.isPublic } });
    onChanged(updated);
  });

  const remove = () => {
    if (!window.confirm(`¿Borrar «${design.title}»? Esta acción no se puede deshacer.`)) return;
    run(async () => {
      await request(`/api/designs/${design.id}`, { method: 'DELETE' });
      onDeleted(design.id);
    });
  };

  return (
    <>
      <Link className="btn" to={`/herramienta?diseno=${design.id}`}>Editar</Link>
      <button type="button" className="btn btn--ghost" onClick={toggleVisibility} disabled={busy}>
        {design.isPublic ? 'Hacer privado' : 'Hacer público'}
      </button>
      <button type="button" className="btn btn--ghost" onClick={remove} disabled={busy}>Borrar</button>
      {error && <span role="alert" className="design-card__meta">{error}</span>}
    </>
  );
}
