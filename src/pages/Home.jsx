import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../lib/api.js';
import usePageTitle from '../hooks/usePageTitle.js';
import useReveal from '../hooks/useReveal.js';
import ToolDemo from '../components/ToolDemo.jsx';
import Carrusel from '../components/Carrusel.jsx';
import HomeColecciones from '../components/home/HomeColecciones.jsx';
import HomeCascada from '../components/home/HomeCascada.jsx';
import { porSlug } from '../data/colecciones/index.js';
import { DISENOS_MUESTRA, autorPrincipal } from '../data/usuarios.js';
import DesignCard from '../components/DesignCard.jsx';
import Icon from '../components/Icon.jsx';
import '../components/DesignCard.css';
import './Home.css';

const PASOS = [
  {
    n: '01',
    icono: 'imagen-subir',
    titulo: 'Sube una imagen',
    texto: 'Elige tu dibujo, tu sprite o tu foto y colócala detrás de la rejilla de cuentas.',
  },
  {
    n: '02',
    icono: 'pincel',
    titulo: 'Crea tu diseño',
    texto: 'Rellena a mano o deja que la herramienta proponga los colores a partir de la imagen.',
  },
  {
    n: '03',
    icono: 'descargar',
    titulo: 'Descarga lo que necesitas',
    texto: 'Imagen, archivo del diseño y recuento de cuentas por color para preparar tu pedido.',
  },
];

const AYUDAS = [
  { icono: 'imagen-color', titulo: 'Colores a partir de tu imagen', texto: 'La herramienta propone una paleta de cuentas.' },
  { icono: 'csv', titulo: 'Recuento por color', texto: 'Sabrás cuántas cuentas necesitas antes de empezar.' },
  { icono: 'guardar-cuenta', titulo: 'Guarda y comparte', texto: 'Con una cuenta, tus diseños se quedan en «Mis diseños».' },
];

// Los diseños de muestra con su autor ficticio (ver data/usuarios.js), agrupados en páginas para el carrusel.
function recomendadosEnPaginas(porPagina) {
  const items = DISENOS_MUESTRA.map((m) => ({ ...m, usuario: autorPrincipal(m.clave) }));
  const pags = [];
  for (let i = 0; i < items.length; i += porPagina) pags.push(items.slice(i, i + porPagina));
  return pags;
}

export default function Home() {
  usePageTitle('Mosik Beads · Crea tu diseño de cuentas para planchar');

  // Últimos diseños públicos de la galería (si la API no responde, el bloque simplemente no aparece).
  const [designs, setDesigns] = useState([]);
  useEffect(() => {
    let cancelled = false;
    request('/api/designs?page=1')
      .then((data) => !cancelled && setDesigns((data.designs || []).slice(0, 4)))
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useReveal([designs.length]);
  // 3 tarjetas por página en pantallas anchas y 2 en móvil
  const [estrecho, setEstrecho] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 700px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)');
    const on = () => setEstrecho(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  const recPaginas = useMemo(() => recomendadosEnPaginas(estrecho ? 2 : 3), [estrecho]);

  return (
    <>
      {/* 1 · Colección de ejemplo a todo el ancho y tres tarjetas por afición */}
      <HomeColecciones />

      {/* 2 · «Entre todos…»: cascada de diseños con profundidad */}
      <HomeCascada />

      {/* Recomendados: diseños de muestra con usuarios ficticios */}
      <section className="container bento-wrap" aria-labelledby="recomendados" data-reveal>
        <div className="tile tile--light tile--section">
          <header className="section-head">
            <p className="section-head__row"><span className="pill">Recomendados</span></p>
            <h2 id="recomendados">Diseños de la comunidad</h2>
            <p className="muted">Diseños de muestra de usuarios ficticios. Ábrelos, entra en el perfil de su autor y edítalos o móntalos.</p>
          </header>
          <Carrusel key={estrecho ? 'rec2' : 'rec3'} etiqueta="Diseños recomendados" intervalo={8000}
            items={recPaginas.map((pag, n) => ({
              key: `rec-${n}`,
              node: (
                <ul className="rec__grid">
                  {pag.map(({ col, d, fase, usuario }) => (
                    <li key={`${col.slug}-${d.id}`} className="rec__card">
                      <Link to={`/colecciones/${col.slug}?fase=${fase}&autor=${usuario.handle}`} className="rec__art" style={{ background: `linear-gradient(135deg, ${col.tema.fondo}, ${col.tema.circulo})` }} aria-label={`Ver el diseño ${d.nombre}`}>
                        <img src={`/colecciones/${col.slug}/${d.id}.png`} alt="" width={d.ancho} height={d.alto} loading="lazy" />
                      </Link>
                      <div className="rec__body">
                        <h3>{d.nombre}</h3>
                        <p className="rec__by"><Link to={`/usuario/${usuario.handle}`} className="rec__user"><span className="rec__av" style={{ background: usuario.tono }} aria-hidden="true">{usuario.nombre[0]}</span>@{usuario.handle}</Link></p>
                        <p className="rec__meta">{d.cuentas.toLocaleString('es-ES')} cuentas · {d.gamas.m.colores.length} colores</p>
                        <Link to={`/colecciones/${col.slug}?fase=${fase}&autor=${usuario.handle}`} className="rec__link">Ver diseño <Icon name="flecha" size={16} /></Link>
                      </div>
                    </li>
                  ))}
                </ul>
              ),
            }))} />
        </div>
      </section>

      {/* Portada: la tarjeta de la herramienta ocupa todo el ancho y casi todo el alto; debajo, dos tarjetas */}
      <section className="container bento-wrap bento-wrap--wide" aria-labelledby="hero-titulo">
        <div className="tile tile--dark tile--glow hero hero--full">
          <div className="hero__inner">
            <p className="pill pill--ondark">Herramienta de diseño</p>
            <h2 id="hero-titulo" className="hero__h">Crea tu propio diseño de cuentas para planchar</h2>
            <p className="hero__lead">
              Sube una imagen, colócala sobre la rejilla y cuenta con la lista exacta de colores y
              cuentas que necesitas.
            </p>
            <div className="hero__actions">
              <Link to="/herramienta" className="btn btn--big">
                Abrir la herramienta <Icon name="flecha" size={18} />
              </Link>
              <Link to="/galeria" className="btn btn--big btn--ondark">Ver la galería</Link>
            </div>
            <ul className="hero__feats">
              {AYUDAS.map((a) => (
                <li key={a.titulo}>
                  <span className="icon-tile icon-tile--ondark"><Icon name={a.icono} size={22} /></span>
                  <span>
                    <b>{a.titulo}</b>
                    <small>{a.texto}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hero__demo"><ToolDemo /></div>
        </div>

        <div className="bento__row">
          <div className="tile tile--light">
            {designs[0] ? (
              <DesignCard design={designs[0]} />
            ) : (
              <div className="tile__empty">
                <span className="icon-tile"><Icon name="cuentas" size={24} /></span>
                <p className="muted">Tu primer diseño aparecerá aquí cuando lo compartas en la galería.</p>
              </div>
            )}
          </div>
          <div className="tile tile--warm">
            <span className="icon-tile icon-tile--warm"><Icon name="guardar-cuenta" size={22} /></span>
            <h2 className="tile__title">Guarda tus diseños</h2>
            <p>Crea una cuenta para guardar lo que hagas y compartirlo en la galería. Para descargar el archivo no hace falta.</p>
            <Link to="/registro" className="btn btn--ghost">Crear cuenta</Link>
          </div>
        </div>
      </section>

      {/* 01 · Cómo funciona */}
      <section className="container bento-wrap" aria-labelledby="como-funciona" data-reveal>
        <div className="tile tile--light tile--section">
          <header className="section-head">
            <p className="section-head__row"><span className="num">01</span><span className="pill">Cómo funciona</span></p>
            <h2 id="como-funciona">Del dibujo a la lista de colores</h2>
            <p className="muted">La herramienta cuenta las cuentas de cada color por ti, para que sepas qué necesitas antes de empezar a planchar.</p>
          </header>
          <ol className="steps">
            {PASOS.map((p, i) => (
              <li key={p.titulo} className="step" data-reveal style={{ '--i': i }}>
                <div className="step__top">
                  <span className="icon-tile"><Icon name={p.icono} size={22} /></span>
                  <span className="step__n" aria-hidden="true">{p.n}</span>
                </div>
                <h3>{p.titulo}</h3>
                <p className="muted">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 · Comunidad */}
      {designs.length > 0 && (
        <section className="container bento-wrap" aria-labelledby="comunidad" data-reveal>
          <div className="tile tile--light tile--section">
            <header className="section-head section-head--row">
              <div>
                <p className="section-head__row"><span className="num">03</span><span className="pill">Comunidad</span></p>
                <h2 id="comunidad">Creado por la comunidad</h2>
              </div>
              <Link to="/galeria" className="section__more">
                Ver la galería <Icon name="flecha" size={18} />
              </Link>
            </header>
            <ul className="design-grid">
              {designs.map((d, i) => (
                <li key={d.id} data-reveal style={{ '--i': i }}><DesignCard design={d} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Franja final con la invitación a crear cuenta */}
      <section className="container bento-wrap" aria-labelledby="cuenta" data-reveal>
        <div className="tile tile--dark tile--glow-warm cta">
          <p className="pill pill--ondark">Cuenta</p>
          <h2 id="cuenta">Guarda tus diseños y compártelos</h2>
          <p>Con una cuenta, tus diseños se quedan en «Mis diseños» y puedes publicarlos en la galería.</p>
          <div className="hero__actions">
            <Link to="/registro" className="btn btn--big">Crear cuenta <Icon name="flecha" size={18} /></Link>
            <Link to="/entrar" className="btn btn--big btn--ondark">Ya tengo cuenta</Link>
          </div>
        </div>
      </section>
    </>
  );
}
