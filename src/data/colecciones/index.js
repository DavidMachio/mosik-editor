// Colecciones con ficha propia. Para añadir una: crea scripts/colecciones/<slug>/ (meta.json + PNG),
// ejecuta «python3 scripts/generar-coleccion.py <slug>» y añade aquí su import y su entrada.
import evoluciones from './evoluciones.js';

export const COLECCIONES_FICHA = [evoluciones];
export const porSlug = (slug) => COLECCIONES_FICHA.find((c) => c.slug === slug);
