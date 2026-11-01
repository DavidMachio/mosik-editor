import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../lib/api.js';
import usePageTitle from '../hooks/usePageTitle.js';
import useReveal from '../hooks/useReveal.js';
import DesignCard from '../components/DesignCard.jsx';
import '../components/DesignCard.css';
import './Home.css';

const PASOS = [
  {
    titulo: 'Sube una imagen',
    texto: 'Elige tu dibujo, tu sprite o tu foto y colócala detrás de la rejilla de cuentas.',
  },
  {
    titulo: 'Crea tu diseño',
    texto: 'Rellena a mano o deja que la herramienta proponga los colores a partir de la imagen.',
  },
  {
    titulo: 'Descarga lo que necesitas',
    texto: 'Imagen, archivo del diseño y recuento de cuentas por color para preparar tu pedido.',
  },
];

// Colecciones previstas (Decisiones cerradas, 18 oct 2026). Todavía no tienen página: se muestran como «próximamente».
const COLECCIONES = [
  { nombre: 'Monumentos', texto: 'Iconos del mundo para colgar juntos.', gradiente: 'var(--grad-monumentos)' },
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
      <section className="container hero" aria-labelledby="hero-titulo">
        <div className="hero__panel">
          <div className="hero__inner">
            <p className="hero__label">Herramienta de diseño</p>
            <h1 id="hero-titulo">Crea tu propio diseño de cuentas para planchar</h1>
            <p className="hero__lead">
              Sube una imagen, colócala sobre la rejilla y cuenta con la lista exacta de colores y
              cuentas que necesitas.
            </p>
            <div className="hero__actions">
              <Link to="/herramienta" className="btn">Abrir la herramienta</Link>
              <Link to="/galeria" className="btn btn--ondark">Ver la galería</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container section" aria-labelledby="como-funciona" data-reveal>
        <h2 id="como-funciona">Cómo funciona</h2>
        <ol className="steps">
          {PASOS.map((p, i) => (
            <li key={p.titulo} className="card steps__item" data-reveal style={{ '--i': i }}>
              <span className="steps__num" aria-hidden="true">{i + 1}</span>
              <h3>{p.titulo}</h3>
              <p className="muted">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container section" aria-labelledby="colecciones" data-reveal>
        <h2 id="colecciones">Colecciones que vienen</h2>
        <p className="muted section__lead">
          Cada colección tendrá una medida común, para colgar todas las piezas juntas. Patrones gratis
          y kits, cuando abramos la tienda.
        </p>
        <ul className="collections">
          {COLECCIONES.map((c, i) => (
            <li key={c.nombre} className="collection" data-reveal style={{ '--i': i }}>
              <div className="collection__art" style={{ background: c.gradiente }} aria-hidden="true" />
              <div className="collection__body">
                <h3>{c.nombre}</h3>
                <p className="muted">{c.texto}</p>
                <span className="pill">Próximamente</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {designs.length > 0 && (
        <section className="container section" aria-labelledby="comunidad" data-reveal>
          <div className="section__head">
            <h2 id="comunidad">Creado por la comunidad</h2>
            <Link to="/galeria" className="section__more">Ver la galería</Link>
          </div>
          <ul className="design-grid">
            {designs.map((d, i) => (
              <li key={d.id} data-reveal style={{ '--i': i }}><DesignCard design={d} /></li>
            ))}
          </ul>
        </section>
      )}

      <section className="container section" aria-labelledby="crea" data-reveal>
        <div className="band">
          <div>
            <h2 id="crea">Tu diseño, tu lista de colores</h2>
            <p className="muted">
              La herramienta cuenta las cuentas de cada color por ti, para que sepas qué necesitas
              antes de empezar a planchar.
            </p>
          </div>
          <Link to="/herramienta" className="btn">Crear mi diseño</Link>
        </div>
      </section>
    </>
  );
}
