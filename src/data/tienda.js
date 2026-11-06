// Productos de la tienda, derivados de las colecciones reales (src/data/colecciones). Precios y textos PROVISIONALES.
// Una colección propia de Mosik es un PRODUCTO DE VENTA: la web nunca muestra su patrón/diseño (de momento).
import { COLECCIONES_FICHA } from './colecciones/index.js';

export const PRECIO_BASE = { 'Fácil': 12.9, 'Media': 14.9, 'Avanzado': 17.9 };
export const EXTRA_MIDI = 2;
export const EXTRA_MARCO = 9;

export const nivelDe = (cuentas) => (cuentas < 700 ? 'Fácil' : cuentas < 2000 ? 'Media' : 'Avanzado');
export const euros = (n) => `${n.toFixed(2).replace('.', ',')} €`;

// formato: 'kit' | 'marco'; tamano: 'mini' | 'midi'
export const precio = (p, formato = 'kit', tamano = 'mini') =>
  PRECIO_BASE[p.nivel] + (tamano === 'midi' ? EXTRA_MIDI : 0) + (formato === 'marco' ? EXTRA_MARCO : 0);

export const CONTENIDO = ['Caja de Mosik', 'Cuentas de cada color, contadas', 'Placas (las que haga falta)', 'Librito con las instrucciones'];

export const PRODUCTOS = COLECCIONES_FICHA.flatMap((col) =>
  col.disenos.map((d) => ({
    id: `${col.slug}/${d.id}`,
    coleccion: col.slug,
    dis: d.id,
    nombre: d.nombre,
    fase: d.fase,
    cuentas: d.cuentas,
    ancho: d.ancho,
    alto: d.alto,
    nivel: nivelDe(d.cuentas),
    tema: col.tema,
    gancho: `Kit para montar ${d.nombre}, de la colección ${col.titulo}. Todo lo necesario en una caja, con el librito paso a paso.`,
  })),
);

export const productosDe = (slug) => PRODUCTOS.filter((p) => p.coleccion === slug);
export const producto = (slug, dis) => PRODUCTOS.find((p) => p.coleccion === slug && p.dis === dis);
export const coleccionesTienda = () => COLECCIONES_FICHA;
export const destacada = () => COLECCIONES_FICHA[COLECCIONES_FICHA.length - 1];
