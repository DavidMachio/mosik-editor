import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import MosikLogo from './MosikLogo.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { useAuth } from '../auth/AuthContext.jsx';
import './Layout.css';

export default function Layout() {
  const { user, loading, logout } = useAuth();
  // En la herramienta la cabecera se reduce al logo y a una hamburguesa que despliega el menú (ver Layout.css).
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    const toggle = () => setMenuOpen((v) => !v);
    window.addEventListener('mosik:menu', toggle);
    return () => window.removeEventListener('mosik:menu', toggle);
  }, []);
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    const onDown = (e) => { if (!e.target.closest('.site-header') && !e.target.closest('#beadmenu')) setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, [menuOpen]);
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-header" data-menu={menuOpen ? 'open' : 'closed'}>
        <div className="container site-header__inner">
          <button type="button" className="site-header__menu" aria-label={menuOpen ? 'Cerrar el menú' : 'Abrir el menú'} aria-expanded={menuOpen} aria-controls="menu-web" onClick={() => setMenuOpen((v) => !v)}>
            <Icon name={menuOpen ? 'cerrar' : 'menu'} size={22} />
          </button>
          <Link to="/" className="site-header__brand" aria-label="Mosik Beads, ir al inicio">
            <MosikLogo />
            <span className="site-header__beads">Beads</span>
          </Link>
          <div className="site-header__panel" id="menu-web">
          <nav aria-label="Principal" className="site-nav">
            <NavLink to="/" end className="site-nav__home">Inicio</NavLink>
            <NavLink to="/herramienta">Herramienta</NavLink>
            <NavLink to="/galeria">Galería</NavLink>
            {!loading && (user ? (
              <>
                <NavLink to="/perfil">@{user.username}</NavLink>
                <button type="button" className="site-nav__link" onClick={logout}>Salir</button>
              </>
            ) : (
              <>
                <NavLink to="/entrar">Entrar</NavLink>
                <NavLink to="/registro" className="site-nav__cta">Crear cuenta</NavLink>
              </>
            ))}
          </nav>
          <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="contenido" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p className="muted">Mosik Beads · Web en construcción.</p>
          <nav aria-label="Pie" className="site-footer__nav">
            <Link to="/herramienta">Herramienta</Link>
            <Link to="/galeria">Galería</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
