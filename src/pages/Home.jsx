import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';
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

const PROXIMAMENTE = [
  'Colecciones de diseños para montar, exponer y regalar',
  'Patrones gratis con toda la información',
  'Comunidad para compartir tus creaciones',
];

export default function Home() {
  usePageTitle('Mosik Beads · Crea tu diseño de cuentas para planchar');

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <h1>Crea tu propio diseño de cuentas para planchar</h1>
          <p className="hero__lead">
            Sube una imagen, colócala sobre la rejilla y cuenta con la lista exacta de colores y
            cuentas que necesitas.
          </p>
          <Link to="/herramienta" className="btn">Abrir la herramienta</Link>
        </div>
      </section>

      <section className="container section" aria-labelledby="como-funciona">
        <h2 id="como-funciona">Cómo funciona</h2>
        <ol className="steps">
          {PASOS.map((p, i) => (
            <li key={p.titulo} className="card steps__item">
              <span className="steps__num" aria-hidden="true">{i + 1}</span>
              <h3>{p.titulo}</h3>
              <p className="muted">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container section" aria-labelledby="proximamente">
        <h2 id="proximamente">Próximamente</h2>
        <ul className="soon">
          {PROXIMAMENTE.map((t) => (
            <li key={t} className="card">{t}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
