// Convierte un diseño de una colección al formato que abre la herramienta (rejilla de códigos de cuentas sobre un tablero de placas).
import { porSlug } from './index.js';

export function modeloAEditor(slug, faseId, gamaParam, pinesParam) {
  const col = porSlug(slug);
  const d = col && col.disenos.find((x) => x.id === faseId);
  if (!d) return null;
  const gama = gamaParam === 's' ? 's' : 'm';
  const g = d.gamas[gama];
  let pines = Number.isFinite(pinesParam) && pinesParam >= 5 && pinesParam <= 100 ? Math.round(pinesParam) : 29;
  // la herramienta admite hasta 6 placas por lado
  pines = Math.max(pines, Math.ceil(d.ancho / 6), Math.ceil(d.alto / 6));
  const pc = Math.max(1, Math.ceil(d.ancho / pines));
  const pr = Math.max(1, Math.ceil(d.alto / pines));
  const cols = pc * pines;
  const rows = pr * pines;
  const porLetra = Object.fromEntries(g.colores.map((c) => [c.letra, c.codigo]));
  const ox = Math.floor((cols - d.ancho) / 2);
  const oy = Math.floor((rows - d.alto) / 2);
  const grid = Array.from({ length: rows }, () => Array(cols).fill(null));
  g.filas.forEach((fila, y) => {
    for (let x = 0; x < fila.length; x += 1) if (fila[x] !== '.') grid[oy + y][ox + x] = porLetra[fila[x]];
  });
  const hex = Object.fromEntries(g.colores.map((c) => [c.codigo, c.hex]));
  return { titulo: d.nombre, hex, data: { v: 2, gama, cols, rows, pw: pines, ph: pines, pr, pc, grid } };
}
