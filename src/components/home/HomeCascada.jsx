import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon.jsx';
import { COLECCIONES_FICHA } from '../../data/colecciones/index.js';
import './HomeCascada.css';

// Todos los diseños de las colecciones (y sus versiones pequeñas) como imágenes sueltas
const POOL = COLECCIONES_FICHA.flatMap((c) => c.disenos.flatMap((d) => [
  { src: `/colecciones/${c.slug}/${d.id}.png`, ancho: d.ancho, alto: d.alto },
  ...(d.pequeno ? [{ src: `/colecciones/${c.slug}/${d.id}-p.png`, ancho: d.pequeno.ancho, alto: d.pequeno.alto }] : []),
]));

// Tres planos de profundidad: lejos (pequeños, muy desenfocados, lentos), medio y cerca (grandes, nítidos, rápidos)
// y, además, unas pocas piezas enormes y muy desenfocadas pasando por delante.
const CAPAS = [
  { n: 12, alto: [64, 104], blur: [3, 4.5], op: [0.5, 0.7], dur: [90, 120] },
  { n: 10, alto: [120, 180], blur: [1, 2], op: [0.8, 0.95], dur: [60, 80] },
  { n: 7, alto: [210, 300], blur: [0, 0], op: [1, 1], dur: [38, 52] },
  { n: 3, alto: [340, 460], blur: [9, 13], op: [0.4, 0.55], dur: [30, 40] },
];

function generador(semilla) { // mulberry32: mismas piezas para una misma semilla
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function piezas(semilla) {
  const rnd = generador(semilla);
  const entre = ([a, b]) => a + rnd() * (b - a);
  const out = [];
  CAPAS.forEach((c, capa) => {
    for (let i = 0; i < c.n; i += 1) {
      const p = POOL[Math.floor(rnd() * POOL.length)];
      const dur = entre(c.dur);
      out.push({
        key: `${capa}-${i}`, src: p.src, capa,
        x: ((i + rnd() * 0.8) / c.n) * 96 + 1, // repartidas a lo ancho de cada plano
        alto: Math.round(entre(c.alto)), blur: entre(c.blur), op: entre(c.op), dur, delay: rnd() * dur,
        giro: Math.round((rnd() - 0.5) * 20), y: Math.round(rnd() * 90),
      });
    }
  });
  return out.sort((a, b) => a.capa - b.capa); // los planos de atrás se pintan primero
}

export default function HomeCascada() {
  const [semilla] = useState(() => Math.floor(Math.random() * 1e9));
  const lista = piezas(semilla);
  return (
    <section className="casc" aria-labelledby="casc-titulo">
      <div className="casc__bg" aria-hidden="true">
        <ul className="casc__list">
          {lista.map((p) => (
            <li key={p.key} className="casc__item"
              style={{ '--x': `${p.x}%`, '--h': `${p.alto}px`, '--b': `${p.blur.toFixed(1)}px`, '--o': p.op.toFixed(2), '--dur': `${p.dur.toFixed(1)}s`, '--delay': `-${p.delay.toFixed(1)}s`, '--r': `${p.giro}deg`, '--y': p.y }}>
              <img src={p.src} alt="" loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>
      <div className="casc__veil" aria-hidden="true" />
      <div className="container casc__txt">
        <p className="pill pill--ondark">Comunidad</p>
        <h2 id="casc-titulo">Entre todos, las posibilidades son infinitas</h2>
        <p className="casc__lead">Hagamos de la comunidad un lugar donde perderte y encontrar lo que buscas.</p>
        <div className="hero__actions casc__actions">
          <Link to="/galeria" className="btn btn--big">Explorar la galería <Icon name="flecha" size={18} /></Link>
          <Link to="/herramienta" className="btn btn--big btn--ondark">Crear el mío</Link>
        </div>
      </div>
    </section>
  );
}
