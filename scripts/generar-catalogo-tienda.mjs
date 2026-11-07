// Genera src/data/tienda-catalogo.js: versión ligera de las colecciones (sin rejillas ni gamas) para la tienda y el Inicio.
// Ejecutar tras añadir o cambiar una colección:  node scripts/generar-catalogo-tienda.mjs
import { writeFileSync } from 'node:fs';
import { COLECCIONES_FICHA } from '../src/data/colecciones/index.js';

const cat = COLECCIONES_FICHA.map((c) => ({
  slug: c.slug, titulo: c.titulo, texto: c.texto, resumen: c.resumen, tema: c.tema,
  disenos: c.disenos.map((d) => ({ id: d.id, nombre: d.nombre, fase: d.fase, ancho: d.ancho, alto: d.alto, cuentas: d.cuentas })),
}));
writeFileSync(new URL('../src/data/tienda-catalogo.js', import.meta.url), `// Generado por scripts/generar-catalogo-tienda.mjs (no editar a mano).\nexport const CATALOGO = ${JSON.stringify(cat)};\n`);
console.log('Catálogo:', cat.length, 'colecciones');
