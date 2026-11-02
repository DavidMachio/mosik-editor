import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';
import Icon from '../components/Icon.jsx';
import NotFound from './NotFound.jsx';
import { usuarioPorHandle, carpetasDe } from '../data/usuarios.js';
import './Usuario.css';

// Perfil ficticio de muestra: cabecera, carpetas por colección y tablero de diseños estilo Instagram.
export default function Usuario() {
  const { handle } = useParams();
  const u = usuarioPorHandle(handle);
  if (!u) return <NotFound />;
  return <Perfil u={u} />;
}

function Perfil({ u }) {
  usePageTitle(`@${u.handle} · Mosik Beads`);
  const carpetas = carpetasDe(u);
  const [sel, setSel] = useState(null); // slug de la carpeta elegida; null = todos
  const lista = sel ? u.disenos.filter((m) => m.col.slug === sel) : u.disenos;
  const total = u.disenos.reduce((a, m) => a + m.d.cuentas, 0);

  return (
    <div className="container prf">
      <nav className="prf__crumbs" aria-label="Dónde estás"><Link to="/">Inicio</Link> <span aria-hidden="true">/</span> <span>@{u.handle}</span></nav>

      <header className="prf__head">
        <span className="prf__av" style={{ background: u.tono }} aria-hidden="true">{u.nombre[0]}</span>
        <div className="prf__id">
          <h1>@{u.handle}</h1>
          <p className="prf__name">{u.nombre}</p>
          <p className="prf__bio">{u.bio}</p>
          <p className="prf__demo">Perfil de muestra: usuario ficticio para probar la web.</p>
        </div>
        <ul className="prf__stats" aria-label="Resumen del perfil">
          <li><b>{u.disenos.length}</b><span>diseños</span></li>
          <li><b>{carpetas.length}</b><span>colecciones</span></li>
          <li><b>{total.toLocaleString('es-ES')}</b><span>cuentas</span></li>
        </ul>
      </header>

      <section aria-labelledby="prf-carpetas" className="prf__folders">
        <h2 id="prf-carpetas" className="prf__h">Colecciones</h2>
        <ul className="prf__folderlist">
          <li>
            <button type="button" className={`prf__folder${sel === null ? ' on' : ''}`} aria-pressed={sel === null} onClick={() => setSel(null)}>
              <span className="prf__folderart prf__folderart--all"><Icon name="galeria" size={28} /></span>
              <span className="prf__foldername">Todos</span><span className="prf__foldern">{u.disenos.length}</span>
            </button>
          </li>
          {carpetas.map((c) => (
            <li key={c.col.slug}>
              <button type="button" className={`prf__folder${sel === c.col.slug ? ' on' : ''}`} aria-pressed={sel === c.col.slug} onClick={() => setSel(sel === c.col.slug ? null : c.col.slug)}>
                <span className="prf__folderart" style={{ background: `linear-gradient(135deg, ${c.col.tema.fondo}, ${c.col.tema.circulo})` }}>
                  <img src={`/colecciones/${c.col.slug}/${c.disenos[0].d.id}.png`} alt="" loading="lazy" />
                </span>
                <span className="prf__foldername">{c.col.titulo}</span><span className="prf__foldern">{c.disenos.length}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="prf-diseños">
        <h2 id="prf-diseños" className="prf__h">{sel ? carpetas.find((c) => c.col.slug === sel).col.titulo : 'Todos los diseños'}</h2>
        <ul className="prf__grid">
          {lista.map((m) => (
            <li key={m.clave}>
              <Link to={`/colecciones/${m.col.slug}?fase=${m.fase}&autor=${u.handle}`} className="prf__tile"
                style={{ background: `linear-gradient(135deg, ${m.col.tema.fondo}, ${m.col.tema.circulo})` }} aria-label={`${m.d.nombre}, ${m.d.cuentas} cuentas`}>
                <img src={`/colecciones/${m.col.slug}/${m.d.id}.png`} alt="" loading="lazy" />
                <span className="prf__over"><b>{m.d.nombre}</b><span>{m.d.cuentas.toLocaleString('es-ES')} cuentas · {m.d.gamas.m.colores.length} colores</span></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
