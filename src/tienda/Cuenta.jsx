import { NavLink, Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import { useAcceso } from '../sim/SimContext.jsx';
import { AVISOS_MUESTRA } from './Campana.jsx';
import './tienda.css';

// Mi cuenta (provisional): los datos son de muestra hasta que la base de datos esté descongelada.
const SEC = [['disenos', 'Mis diseños'], ['proyectos', 'Proyectos'], ['favoritos', 'Favoritos'], ['avisos', 'Mis avisos'], ['plan', 'Mi plan'], ['perfil', 'Perfil público'], ['ajustes', 'Ajustes']];

export default function Cuenta() {
  const { sec } = useParams();
  const nivel = useAcceso();
  const { user } = useAuth();
  const free = nivel === 'free';
  if (!sec) return <Navigate to="/cuenta/disenos" replace />;
  if (!SEC.some(([k]) => k === sec)) return <Navigate to="/cuenta/disenos" replace />;
  const aviso = <div className="tw-callout">Datos de muestra: se conectarán a tu cuenta real cuando se active la base de datos.</div>;
  let cuerpo;
  if (sec === 'disenos') cuerpo = (<><h2>Mis diseños</h2><p className="muted">Cada diseño es una copia congelada de un proyecto. Si lo editas y vuelves a publicar, se crea un diseño nuevo. Límite: {free ? '5' : 'sin límite'}.</p>{aviso}<p className="muted">Aquí aparecerán tus diseños guardados y publicados.</p></>);
  else if (sec === 'proyectos') cuerpo = (<><h2>Proyectos</h2><p className="muted">Tu archivo de trabajo, siempre privado. Límite: {free ? '1 proyecto' : '20 proyectos'}.</p>{aviso}<Link className="btn" to="/herramienta">Abrir la herramienta</Link></>);
  else if (sec === 'favoritos') cuerpo = (<><h2>Favoritos</h2><p className="muted">Guarda diseños de la comunidad y organízalos en carpetas.</p>{aviso}</>);
  else if (sec === 'avisos') cuerpo = (<><h2>Mis avisos</h2><p className="muted">La campana de la cabecera es el acceso rápido.</p>{aviso}{AVISOS_MUESTRA.map((a) => <div key={a.txt} className="tw-aviso"><div>{a.txt}<br /><span className="muted tw-peq">{a.cuando}</span></div></div>)}</>);
  else if (sec === 'plan') cuerpo = (<><h2>Mi plan</h2><div className="tw-pad"><span className="tw-chip">{free ? 'Free' : 'Paid'}</span><h3 style={{ marginTop: 8 }}>{free ? 'Plan free' : 'Plan paid'}</h3><p className="muted">{free ? '1 proyecto · 5 diseños · herramienta con restricciones.' : '20 proyectos · diseños ilimitados · herramienta completa.'}</p><Link className="btn" to="/planes">{free ? 'Probar paid 14 días' : 'Ver planes'}</Link></div><p className="muted tw-peq" style={{ marginTop: 10 }}>Si bajas de paid a free no se borra nada: lo que supere el límite queda bloqueado y eliges qué diseños siguen públicos.</p></>);
  else if (sec === 'perfil') cuerpo = (<><h2>Perfil público</h2><p className="muted">Público (se ve tu perfil y tus diseños públicos) o privado (eliges qué diseños salen solo en la galería). Vendrá preseleccionado en público.</p>{aviso}</>);
  else cuerpo = (<><h2>Ajustes</h2><p className="muted">Sesión: {user ? `@${user.username}` : 'cuenta simulada'}.</p>{aviso}</>);
  return (
    <div className="container tw">
      <h1 className="tw-h1">Mi cuenta</h1>
      <div className="tw-cuenta">
        <nav className="tw-cuenta__nav" aria-label="Secciones de la cuenta">{SEC.map(([k, t]) => <NavLink key={k} to={`/cuenta/${k}`}>{t}</NavLink>)}</nav>
        <div>{cuerpo}</div>
      </div>
    </div>
  );
}
