import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import './Carrusel.css';

// Carrusel de diapositivas con desplazamiento suave, flechas, puntos y paso automático (con botón de pausa).
// Respeta «reducir movimiento»: sin paso automático y sin animación de desplazamiento.
export default function Carrusel({ items, etiqueta, intervalo = 7000 }) {
  const pista = useRef(null);
  const [idx, setIdx] = useState(0);
  const [pausa, setPausa] = useState(false); // pausa elegida por la persona
  const encima = useRef(false); // ratón o foco encima (sin re-render, para no interferir con los clics)
  const idxRef = useRef(0);
  const reducir = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const n = items.length;

  const ir = useCallback((i) => {
    const el = pista.current;
    if (!el) return;
    const k = (i + n) % n;
    el.scrollTo({ left: k * el.clientWidth, behavior: reducir ? 'auto' : 'smooth' });
  }, [n, reducir]);

  // Qué diapositiva se ve (al arrastrar con el dedo, con flechas, con puntos o solo)
  useEffect(() => {
    const el = pista.current;
    if (!el) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { const k = Math.round(el.scrollLeft / Math.max(1, el.clientWidth)); idxRef.current = k; setIdx(k); });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => { el.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Paso automático
  useEffect(() => {
    if (reducir || pausa || n < 2) return undefined;
    const id = window.setInterval(() => { if (!encima.current) ir(idxRef.current + 1); }, intervalo);
    return () => window.clearInterval(id);
  }, [reducir, pausa, n, intervalo, ir]);

  if (!n) return null;
  return (
    <div className="carr" role="region" aria-roledescription="carrusel" aria-label={etiqueta}
      onMouseEnter={() => { encima.current = true; }} onMouseLeave={() => { encima.current = false; }} onFocus={() => { encima.current = true; }} onBlur={() => { encima.current = false; }}>
      <div className="carr__frame">
        <ul className="carr__track" ref={pista} aria-live={pausa || reducir ? 'polite' : 'off'}>
          {items.map((it, i) => (
            <li key={it.key} className="carr__slide" role="group" aria-roledescription="diapositiva" aria-label={`${i + 1} de ${n}`}>{it.node}</li>
          ))}
        </ul>
        {n > 1 && (
          <>
            <button type="button" className="carr__arrow carr__arrow--prev" onClick={() => ir(idxRef.current - 1)} aria-label="Anterior"><Icon name="flecha" size={22} className="carr__flip" /></button>
            <button type="button" className="carr__arrow carr__arrow--next" onClick={() => ir(idxRef.current + 1)} aria-label="Siguiente"><Icon name="flecha" size={22} /></button>
          </>
        )}
      </div>
      {n > 1 && (
        <div className="carr__nav">
          <div className="carr__dots" role="group" aria-label="Elegir diapositiva">
            {items.map((it, i) => (
              <button key={it.key} type="button" className="carr__dot" aria-label={`Ir a la diapositiva ${i + 1}`} aria-current={i === idx ? 'true' : undefined} onClick={() => ir(i)} />
            ))}
          </div>
          {!reducir && (
            <button type="button" className="carr__pause" onClick={() => setPausa((p) => !p)} aria-pressed={pausa}>{pausa ? 'Reanudar' : 'Pausar'}</button>
          )}
        </div>
      )}
    </div>
  );
}
