// Convierte un diseño de una colección al formato que abre la herramienta (rejilla de códigos de cuentas sobre un tablero de placas).
import { cargarColeccion } from './cargar.js';

const GAP = 5; // cuentas entre diseños cuando se montan todos juntos
const LIMITE = 6; // la herramienta admite hasta 6 placas por lado, de hasta 100 cuentas

// faseId: «<id>» un diseño; «<id>-p» su versión pequeña; «todos» (o «todos-p») la colección entera, uno al lado de otro.
export function modeloDesdeColeccion(col, faseId, gamaParam, pinesParam) {
  if (!col) return null;
  const esPeq = /-p$/.test(faseId || '');
  const id = esPeq ? faseId.slice(0, -2) : faseId;
  const gama = gamaParam === 's' ? 's' : 'm';
  const variante = (d) => (esPeq && d.pequeno ? { ...d, ...d.pequeno } : d);
  let partes; // diseños a colocar, de izquierda a derecha
  let titulo;
  if (id === 'todos') {
    partes = col.disenos.map(variante);
    titulo = `${col.titulo} (diseño entero${esPeq ? ', pequeño' : ''})`;
  } else {
    const base = col.disenos.find((x) => x.id === id);
    if (!base) return null;
    partes = [variante(base)];
    titulo = base.nombre + (esPeq && base.pequeno ? ' (pequeña)' : '');
  }
  const ancho = partes.reduce((a, d) => a + d.ancho, 0) + (partes.length - 1) * GAP;
  const alto = Math.max(...partes.map((d) => d.alto));
  let pines = Number.isFinite(pinesParam) && pinesParam >= 5 && pinesParam <= 100 ? Math.round(pinesParam) : 29;
  pines = Math.max(pines, Math.ceil(ancho / LIMITE), Math.ceil(alto / LIMITE));
  if (pines > 100) return null; // no cabe en el tablero de la herramienta
  const pc = Math.max(1, Math.ceil(ancho / pines));
  const pr = Math.max(1, Math.ceil(alto / pines));
  const cols = pc * pines;
  const rows = pr * pines;
  const ox = Math.floor((cols - ancho) / 2);
  const oy = Math.floor((rows - alto) / 2);
  const grid = Array.from({ length: rows }, () => Array(cols).fill(null));
  const hex = {};
  let x0 = ox;
  partes.forEach((d) => {
    const g = d.gamas[gama];
    const porLetra = Object.fromEntries(g.colores.map((c) => [c.letra, c.codigo]));
    g.colores.forEach((c) => { hex[c.codigo] = c.hex; });
    const dy = alto - d.alto; // alineados por abajo
    g.filas.forEach((fila, y) => {
      for (let x = 0; x < fila.length; x += 1) if (fila[x] !== '.') grid[oy + dy + y][x0 + x] = porLetra[fila[x]];
    });
    x0 += d.ancho + GAP;
  });
  return { titulo, hex, data: { v: 2, gama, cols, rows, pw: pines, ph: pines, pr, pc, grid } };
}

// Igual, pidiendo antes la colección (las de los luchadores se cargan bajo demanda).
export async function modeloAEditor(slug, faseId, gamaParam, pinesParam) {
  try { return modeloDesdeColeccion(await cargarColeccion(slug), faseId, gamaParam, pinesParam); } catch { return null; }
}

// ¿Cabe la colección entera en el tablero de la herramienta? (solo mide, no construye la rejilla)
export function cabeEntera(col, esPeq, pinesParam) {
  const partes = col.disenos.map((d) => (esPeq && d.pequeno ? d.pequeno : d));
  const ancho = partes.reduce((a, d) => a + d.ancho, 0) + (partes.length - 1) * GAP;
  const alto = Math.max(...partes.map((d) => d.alto));
  const pines = Math.max(Number.isFinite(pinesParam) && pinesParam >= 5 ? pinesParam : 29, Math.ceil(ancho / LIMITE), Math.ceil(alto / LIMITE));
  return pines <= 100;
}
