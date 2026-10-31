import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import './Auth.css';

export default function Registro() {
  usePageTitle('Crear cuenta · Mosik Beads');
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.from || '/perfil';

  const [values, setValues] = useState({ email: '', username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [sending, setSending] = useState(false);

  if (user) return <Navigate to={destino} replace />;

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setErrors({});
    setFormError('');
    setSending(true);
    try {
      await register(values);
      navigate(destino, { replace: true });
    } catch (err) {
      setErrors(err.fields || {});
      setFormError(Object.keys(err.fields || {}).length ? '' : err.message);
      setSending(false);
    }
  }

  const field = (name, label, props = {}) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} required value={values[name]} onChange={set(name)}
        aria-invalid={errors[name] ? 'true' : undefined}
        aria-describedby={errors[name] ? `${name}-error` : props.hint ? `${name}-hint` : undefined}
        {...props.input} />
      {props.hint && !errors[name] && <p id={`${name}-hint`} className="field__hint">{props.hint}</p>}
      {errors[name] && <p id={`${name}-error`} className="field__error" role="alert">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="container auth">
      <h1>Crear cuenta</h1>
      {location.state?.draft && <p className="muted">Tu diseño está guardado en este navegador: al crear la cuenta lo recuperamos para que puedas guardarlo.</p>}
      <form className="card auth__form" onSubmit={onSubmit} noValidate>
        {field('email', 'Correo', { input: { type: 'email', autoComplete: 'email' } })}
        {field('username', 'Nombre de usuario', {
          input: { autoComplete: 'username', autoCapitalize: 'none', spellCheck: false },
          hint: 'Entre 3 y 20 caracteres: letras, números, punto o guion bajo. Será público.',
        })}
        {field('password', 'Contraseña', {
          input: { type: 'password', autoComplete: 'new-password' },
          hint: 'Al menos 10 caracteres.',
        })}
        <p className="auth__error" role="alert" aria-live="assertive">{formError}</p>
        <button className="btn" type="submit" disabled={sending}>{sending ? 'Creando…' : 'Crear cuenta'}</button>
        <p className="muted auth__alt">¿Ya tienes cuenta? <Link to="/entrar" state={location.state}>Entra</Link></p>
      </form>
    </div>
  );
}
