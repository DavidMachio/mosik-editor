import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../lib/api.js';
import usePageTitle from '../hooks/usePageTitle.js';
import useReveal from '../hooks/useReveal.js';
import ColeccionBanner from '../components/ColeccionBanner.jsx';
import { COLECCIONES_FICHA } from '../data/colecciones/index.js';
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

// Colecciones previstas (Decisiones cerradas, 18 oct 2026). Todavía no tienen página: se muestran como «próximamente».
const COLECCIONES = [
  ...[...COLECCIONES_FICHA].reverse().map((c) => ({ nombre: c.titulo, texto: c.resumen, gradiente: `linear-gradient(135deg, ${c.tema.fondo}, ${c.tema.circulo})` })),
  { nombre: 'Temporada', texto: 'Halloween y Navidad, pieza a pieza.', gradiente: 'var(--grad-temporada)' },
  { nombre: 'Retratos', texto: 'Personas y personajes en cuentas.', gradiente: 'var(--grad-retratos)' },
  { nombre: 'Videojuegos', texto: 'Sprites y pantallas de juego.', gradiente: 'var(--grad-videojuegos)' },
];

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

  return (
    <>
      {/* Colecciones nuevas con ficha (la más reciente primero) */}
      {[...COLECCIONES_FICHA].reverse().map((c) => (
        <ColeccionBanner key={c.slug} col={c} titleId={`coleccion-${c.slug}`} />
      ))}

      {/* Portada: una tarjeta oscura grande y dos pequeñas */}
      <section className="container bento-wrap" aria-labelledby="hero-titulo">
        <div className="bento bento--hero">
          <div className="tile tile--dark tile--glow hero">
            <div className="hero__inner">
              <p className="pill pill--ondark">Herramienta de diseño</p>
              <h1 id="hero-titulo">Crea tu propio diseño de cuentas para planchar</h1>
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
          </div>

          <div className="bento__side">
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

      {/* 02 · Colecciones (próximamente) */}
      <section className="container bento-wrap" aria-labelledby="colecciones" data-reveal>
        <div className="tile tile--light tile--section tile--head">
          <header className="section-head">
            <p className="section-head__row"><span className="num">02</span><span className="pill">Colecciones</span></p>
            <h2 id="colecciones">Colecciones que vienen</h2>
            <p className="muted">
              Cada colección tendrá una medida común, para colgar todas las piezas juntas. Patrones gratis y kits, cuando
              abramos la tienda.
            </p>
          </header>
        </div>
        <div className="bento bento--collections">
          <div className="tile tile--dark tile--glow collection collection--feature" data-reveal>
            <p className="pill pill--ondark">Primera colección</p>
            <h3>Monumentos</h3>
            <p>Iconos del mundo en la misma medida, para colgarlos juntos.</p>
            <span className="pill pill--ondark">Próximamente</span>
          </div>
          <ul className="collections">
            {COLECCIONES.map((c, i) => (
              <li key={c.nombre} className="collection" data-reveal style={{ '--i': i }}>
                <div className="collection__art" style={{ backgroundColor: '#150702', backgroundImage: c.gradiente }} aria-hidden="true" />
                <div className="collection__body">
                  <h3>{c.nombre}</h3>
                  <p className="muted">{c.texto}</p>
                  <span className="pill">Próximamente</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Franja ancha: la herramienta, con una tarjeta flotante encima */}
      <section className="container bento-wrap" aria-labelledby="crea" data-reveal>
        <div className="tile tile--dark tile--glow band">
          <div className="band__text">
            <p className="pill pill--ondark">Herramienta de diseño</p>
            <h2 id="crea">Crea tu diseño</h2>
            <p>
              Dibuja con cuentas, mira tu lista de colores y descarga el archivo. Para guardar el diseño y compartirlo en
              la galería, necesitas una cuenta.
            </p>
            <div className="hero__actions">
              <Link to="/herramienta" className="btn btn--big">
                Abrir la herramienta <Icon name="flecha" size={18} />
              </Link>
            </div>
          </div>
          <div className="band__tool" aria-hidden="true">
            <div className="band__tools">
              {['mover', 'pincel', 'borrador', 'bote', 'cuentagotas'].map((n) => (
                <span key={n} className={n === 'pincel' ? 'on' : ''}><Icon name={n} size={22} /></span>
              ))}
            </div>
            <div className="band__beads">
              {Array.from({ length: 56 }, (_, i) => <i key={i} className={`c${(i * 3 + Math.floor(i / 8) * 2 + Math.floor(((i % 8) * Math.floor(i / 8)) / 3)) % 8}`} />)}
            </div>
            <div className="band__actions">
              <span><Icon name="descargar" size={18} /> PNG</span>
              <span className="on"><Icon name="guardar-cuenta" size={18} /> Guardar</span>
            </div>
          </div>
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
