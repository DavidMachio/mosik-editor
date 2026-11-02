// Perfiles ficticios de muestra (prueba: sin base de datos). Cada usuario tiene sus diseños, mezclados de todas las colecciones.
// Un mismo diseño de muestra puede aparecer en varios perfiles: es solo para probar la experiencia.
import { COLECCIONES_FICHA } from './colecciones/index.js';

const BASE = [
  ['lucia_cuentas', 'Lucía', 'Cuentas, planchas y mucha paciencia.', '#d35a33'],
  ['marcos.pixel', 'Marcos', 'Pixel art de los 90 hecho con cuentas.', '#2f6fb5'],
  ['nuria_hama', 'Nuria', 'Empecé por un posavasos y ya no paro.', '#3f8f4f'],
  ['pablo_planchado', 'Pablo', 'Plancho los domingos por la tarde.', '#7b3fc4'],
  ['irene_beads', 'Irene', 'Colores vivos y cero prisa.', '#b3362b'],
  ['tomas_pixel', 'Tomás', 'Colecciono sprites y los paso a cuentas.', '#1f5f25'],
  ['carla_mosaicos', 'Carla', 'Mosaicos grandes en varias placas.', '#c62828'],
  ['dani_8bits', 'Dani', '8 bits, café y una plancha.', '#a61e1e'],
  ['sara_retro', 'Sara', 'Retro, pixelado y bien alineado.', '#2f6fb5'],
  ['hugo_cuentas', 'Hugo', 'Diseños para colgar juntos.', '#d35a33'],
  ['alba_planchas', 'Alba', 'Siempre me falta un color.', '#3f8f4f'],
  ['jorge_pix', 'Jorge', 'Del píxel a la cuenta, sin trampa.', '#7b3fc4'],
  ['marta_micro', 'Marta', 'Cuentas mini y mucho detalle.', '#b3362b'],
  ['andres_hama', 'Andrés', 'Probando todas las gamas de color.', '#1f5f25'],
  ['noa_beads', 'Noa', 'Cada diseño, una historia.', '#c62828'],
  ['pau_arcade', 'Pau', 'Salón recreativo en cuentas.', '#a61e1e'],
];

// Los diseños de muestra de todas las colecciones, mezclados entre colecciones
function mezclados() {
  const listas = COLECCIONES_FICHA.map((c) => c.disenos.map((d, i) => ({ col: c, d, fase: i + 1, clave: `${c.slug}:${i + 1}` })));
  const out = [];
  for (let i = 0; i < 6; i += 1) listas.forEach((l) => { if (l[i]) out.push(l[i]); });
  return out;
}

export const DISENOS_MUESTRA = mezclados();
const N = BASE.length;

// Cada diseño tiene un autor principal; los perfiles se completan con otros diseños (paso 7, primo con 18) hasta 6-9.
const principal = {};
DISENOS_MUESTRA.forEach((m, j) => { principal[m.clave] = BASE[j % N][0]; });

export const USUARIOS = BASE.map(([handle, nombre, bio, tono], i) => {
  const propios = DISENOS_MUESTRA.filter((m) => principal[m.clave] === handle);
  const meta = 6 + (i % 4);
  const lista = [...propios];
  for (let k = 0; lista.length < meta && k < DISENOS_MUESTRA.length; k += 1) {
    const m = DISENOS_MUESTRA[(i * 3 + k * 7) % DISENOS_MUESTRA.length];
    if (!lista.some((x) => x.clave === m.clave)) lista.push(m);
  }
  return { handle, nombre, bio, tono, disenos: lista };
});

export const usuarioPorHandle = (h) => USUARIOS.find((u) => u.handle === h);
export const autorPrincipal = (clave) => usuarioPorHandle(principal[clave]);

// Carpetas del perfil: un grupo por colección
export function carpetasDe(usuario) {
  const mapa = new Map();
  usuario.disenos.forEach((m) => {
    if (!mapa.has(m.col.slug)) mapa.set(m.col.slug, { col: m.col, disenos: [] });
    mapa.get(m.col.slug).disenos.push(m);
  });
  return [...mapa.values()];
}
