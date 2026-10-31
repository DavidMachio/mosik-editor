import { decodeGrid } from '../../shared/designCodec.js';

// Dirección de la imagen de vista previa. `v` cambia al editar el diseño para saltarse la caché del navegador.
export const previewUrl = (design) =>
  `/api/designs/${design.id}?preview=1&v=${new Date(design.updatedAt || design.createdAt).getTime()}`;

// Convierte lo que guarda el servidor (paleta + repeticiones) al formato que entiende la herramienta.
export function toEditorDesign(data) {
  return { v: 2, cols: data.cols, rows: data.rows, pw: data.pw, ph: data.ph, pr: data.pr, pc: data.pc, grid: decodeGrid(data, data.cols, data.rows) };
}

export const GAMA_LABELS = { mini: 'Mini', midi: 'Midi', mixta: 'Mixta' };
