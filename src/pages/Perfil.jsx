import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ROLE_LABELS, useAuth } from '../auth/AuthContext.jsx';
import { request } from '../lib/api.js';
import usePageTitle from '../hooks/usePageTitle.js';
import DesignCard from '../components/DesignCard.jsx';
import DesignActions from '../components/DesignActions.jsx';
import '../components/DesignCard.css';
import './Perfil.css';

export default function Perfil() {
  usePageTitle('Mi perfil · Mosik Beads');
  const { user, loading } = useAuth();
  const location = useLocation();
  const [designs, setDesigns] = useState({ status: 'loading', list: [], error: '' });

  useEffect(() => {
    if (!user) return undefined;
    let cancelled = false;
    request('/api/designs?mine=1&limit=48')
      .then((data) => !cancelled && setDesigns({ status: 'ready', list: data.designs, error: '' }))
      .catch((err) => !cancelled && setDesigns({ status: 'error', list: [], error: err.message }));
    return () => { cancelled = true; };
  }, [user]);

  if (loading) return <p className="container muted" style={{ paddingTop: 32 }}>Cargando…</p>;
  if (!user) return <Navigate to="/entrar" replace state={{ from: location.pathname }} />;

  const desde = new Date(user.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  const replace = (updated) => setDesigns((d) => ({ ...d, list: d.list.map((x) => (x.id === updated.id ? { ...x, ...updated } : x)) }));
  const remove = (id) => setDesigns((d) => ({ ...d, list: d.list.filter((x) => x.id !== id) }));

  return (
    <div className="container perfil">
      <header className="perfil__head">
        <h1>@{user.username}</h1>
        <p className="muted">
          <span className="perfil__role">{ROLE_LABELS[user.role] || user.role}</span> · Miembro desde {desde}
        </p>
      </header>

      <section className="card" aria-labelledby="mis-disenos">
        <h2 id="mis-disenos">Mis diseños</h2>
        {designs.status === 'loading' && <p className="muted">Cargando tus diseños…</p>}
        {designs.status === 'error' && <p role="alert">{designs.error}</p>}
        {designs.status === 'ready' && designs.list.length === 0 && (
          <p className="muted">Todavía no has guardado ningún diseño. <Link to="/herramienta">Crea el primero</Link> y pulsa «Guardar en mi perfil».</p>
        )}
        {designs.list.length > 0 && (
          <ul className="design-grid perfil__designs">
            {designs.list.map((d) => (
              <li key={d.id}>
                <DesignCard design={d} showOwner={false} showVisibility>
                  <DesignActions design={d} onChanged={replace} onDeleted={remove} />
                </DesignCard>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card" aria-labelledby="favoritos">
        <h2 id="favoritos">Favoritos</h2>
        <p className="muted">Aquí aparecerán los diseños que guardes como favoritos.</p>
      </section>
    </div>
  );
}
