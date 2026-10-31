import { Navigate, useLocation } from 'react-router-dom';
import { ROLE_LABELS, useAuth } from '../auth/AuthContext.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import './Perfil.css';

export default function Perfil() {
  usePageTitle('Mi perfil · Mosik Beads');
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="container muted" style={{ paddingTop: 32 }}>Cargando…</p>;
  if (!user) return <Navigate to="/entrar" replace state={{ from: location.pathname }} />;

  const desde = new Date(user.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });

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
        <p className="muted">Aquí aparecerán los diseños que crees con la herramienta.</p>
      </section>

      <section className="card" aria-labelledby="favoritos">
        <h2 id="favoritos">Favoritos</h2>
        <p className="muted">Aquí aparecerán los diseños que guardes como favoritos.</p>
      </section>
    </div>
  );
}
