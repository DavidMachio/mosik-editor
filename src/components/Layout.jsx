import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import MosikLogo from './MosikLogo.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { useAuth } from '../auth/AuthContext.jsx';
import { useAcceso } from '../sim/SimContext.jsx';
import Campana from '../tienda/Campana.jsx';
import './Layout.css';

export default function Layout() {
  const { user, loading, logout } = useAuth();
  const acceso = useAcceso();
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
            <NavLink to="/tienda">Tienda</NavLink>
            <NavLink to="/colecciones" end>Colecciones</NavLink>
            <NavLink to="/galeria">Galería</NavLink>
            <NavLink to="/tutoriales">Tutoriales</NavLink>
            <NavLink to="/buscar" aria-label="Buscar"><Icon name="buscar" size={18} /></NavLink>
            <NavLink to="/carrito" aria-label="Carrito"><Icon name="carrito" size={18} /></NavLink>
            {acceso === 'sin' ? (
              <>
                {!loading && <NavLink to="/entrar">Entrar</NavLink>}
                <NavLink to="/herramienta" className="site-nav__cta">Crea tu diseño</NavLink>
              </>
            ) : (
              <>
                <Campana />
                <NavLink to="/cuenta/disenos">Mi cuenta</NavLink>
                {user && <button type="button" className="site-nav__link" onClick={logout}>Salir</button>}
                <NavLink to="/herramienta" className="site-nav__cta">Crea tu diseño</NavLink>
              </>
            )}
          </nav>
          <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="contenido" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container tw-pie">
          <div><h4>Mosik Beads</h4><Link to="/sobre">Sobre Mosik</Link><Link to="/como-funciona">Cómo funciona</Link><Link to="/novedades">Novedades</Link></div>
          <div><h4>Tienda</h4><Link to="/tienda">Kits</Link><Link to="/colecciones">Colecciones</Link><Link to="/planes">Planes</Link></div>
          <div><h4>Ayuda</h4><Link to="/ayuda">Ayuda y contacto</Link><Link to="/tutoriales">Tutoriales</Link></div>
          <div><h4>Legal</h4><Link to="/legal/aviso-legal">Aviso legal</Link><Link to="/legal/privacidad">Privacidad</Link><Link to="/legal/cookies">Cookies</Link><Link to="/legal/condiciones">Condiciones</Link></div>
        </div>
        <div className="container"><p className="muted" style={{ marginTop: 16 }}>Mosik Beads · Web en construcción.</p></div>
      </footer>
    </>
  );
}
