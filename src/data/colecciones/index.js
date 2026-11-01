// Colecciones con ficha propia (de la más antigua a la más reciente; en Inicio la última sale la primera).
// Para añadir una: crea scripts/colecciones/<slug>/ (meta.json + PNG), ejecuta
// «python3 scripts/generar-coleccion.py <slug>» y añade aquí su import y su entrada. Ver scripts/colecciones/LEEME.md.
import evoluciones from './evoluciones.js';
import evolucionesPlanta from './evoluciones-planta.js';
import evolucionesFuego from './evoluciones-fuego.js';
import evolucionesAgua from './evoluciones-agua.js';

export const COLECCIONES_FICHA = [evoluciones, evolucionesPlanta, evolucionesFuego, evolucionesAgua];
export const porSlug = (slug) => COLECCIONES_FICHA.find((c) => c.slug === slug);
