import { useEffect, useState } from 'react';
import { porSlug } from './index.js';

// Colecciones con ficha: las que están en index.js salen al instante; las demás (los movimientos de los luchadores)
// se piden a /fichas/<slug>.json solo cuando se abre su página. Es un prototipo: más adelante saldrán de la base de datos.
const cache = new Map();
const SLUG = /^[a-z0-9-]+$/;

export async function cargarColeccion(slug) {
  const s = porSlug(slug);
  if (s) return s;
  if (!slug || !SLUG.test(slug)) throw new Error('Colección no encontrada');
  if (!cache.has(slug)) {
    cache.set(slug, fetch(`/fichas/${slug}.json`).then((r) => {
      if (!r.ok) throw new Error('Colección no encontrada');
      return r.json();
    }).catch((e) => { cache.delete(slug); throw e; }));
  }
  return cache.get(slug);
}

// { col, estado }: estado = 'cargando' | 'ok' | 'error'
export function useColeccion(slug) {
  const [st, setSt] = useState(() => { const c = porSlug(slug); return c ? { slug, col: c, estado: 'ok' } : { slug, col: null, estado: 'cargando' }; });
  useEffect(() => {
    let cancelled = false;
    const c = porSlug(slug);
    if (c) { setSt({ slug, col: c, estado: 'ok' }); return undefined; }
    setSt({ slug, col: null, estado: 'cargando' });
    cargarColeccion(slug).then((col) => !cancelled && setSt({ slug, col, estado: 'ok' })).catch(() => !cancelled && setSt({ slug, col: null, estado: 'error' }));
    return () => { cancelled = true; };
  }, [slug]);
  return st.slug === slug ? st : { slug, col: null, estado: 'cargando' };
}
