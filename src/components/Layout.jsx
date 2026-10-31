import { Link, NavLink, Outlet } from 'react-router-dom';
import MosikLogo from './MosikLogo.jsx';
import './Layout.css';

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="site-header__brand" aria-label="Mosik Beads, ir al inicio">
            <MosikLogo />
            <span className="site-header__beads">Beads</span>
          </Link>
          <nav aria-label="Principal" className="site-nav">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/herramienta">Herramienta</NavLink>
          </nav>
        </div>
      </header>

      <main id="contenido" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <p className="muted">Mosik Beads · Web en construcción.</p>
        </div>
      </footer>
    </>
  );
}
