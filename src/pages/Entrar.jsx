import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import './Auth.css';

export default function Entrar() {
  usePageTitle('Entrar · Mosik Beads');
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.from || '/perfil';

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  if (user) return <Navigate to={destino} replace />;

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      await login({ identifier, password });
      navigate(destino, { replace: true });
    } catch (err) {
      setError(err.message);
      setSending(false);
    }
  }

  return (
    <div className="container auth">
      <h1>Entrar</h1>
      {location.state?.draft && <p className="muted">Tu diseño está guardado en este navegador: al entrar lo recuperamos para que puedas guardarlo.</p>}
      <form className="card auth__form" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="identifier">Correo o nombre de usuario</label>
          <input id="identifier" name="identifier" autoComplete="username" required
            value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">Contraseña</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <p className="auth__error" role="alert" aria-live="assertive">{error}</p>
        <button className="btn" type="submit" disabled={sending}>{sending ? 'Entrando…' : 'Entrar'}</button>
        <p className="muted auth__alt">¿No tienes cuenta? <Link to="/registro" state={location.state}>Crea una</Link></p>
      </form>
    </div>
  );
}
