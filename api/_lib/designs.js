// Validación y utilidades de los diseños.
import { ObjectId } from 'mongodb';
import { encodeGrid } from '../../shared/designCodec.js';

export const MAX_DESIGNS_PER_USER = 100; // los administradores no tienen límite
export const MAX_SIDE = 300; // cuentas por lado (igual que la herramienta)
const MAX_PREVIEW_BYTES = 150_000;
const CODE_RE = /^[A-Z]{1,2}\d{1,3}$/;
const PREVIEW_PREFIX = 'data:image/png;base64,';

export function toObjectId(id) {
  return typeof id === 'string' && /^[0-9a-f]{24}$/i.test(id) ? new ObjectId(id) : null;
}

// ---------- Etiquetas ----------
export function normalizeTags(input) {
  const raw = Array.isArray(input) ? input : String(input ?? '').split(',');
  const tags = [];
  for (const item of raw) {
    const tag = String(item).trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\p{L}\p{N}-]/gu, '').replace(/^-+|-+$/g, '');
    if (tag.length >= 2 && tag.length <= 24 && !tags.includes(tag)) tags.push(tag);
  }
  return tags.slice(0, 10);
}

// ---------- Cuadrícula ----------
function validateRaw(raw) {
  if (!raw || typeof raw !== 'object') return 'Faltan los datos del diseño.';
  const { cols, rows, pw, ph, pr, pc, grid } = raw;
  const isInt = (n, min, max) => Number.isInteger(n) && n >= min && n <= max;
  if (!isInt(cols, 5, MAX_SIDE) || !isInt(rows, 5, MAX_SIDE)) return 'El tamaño del tablero no es válido.';
  if (!isInt(pw, 5, 100) || !isInt(ph, 5, 100) || !isInt(pr, 1, 6) || !isInt(pc, 1, 6)) return 'La configuración de placas no es válida.';
  if (cols !== pw * pc || rows !== ph * pr) return 'El tamaño del tablero no coincide con las placas.';
  if (!Array.isArray(grid) || grid.length !== rows) return 'La cuadrícula no es válida.';
  for (const row of grid) {
    if (!Array.isArray(row) || row.length !== cols) return 'La cuadrícula no es válida.';
    for (const cell of row) if (cell !== null && !(typeof cell === 'string' && CODE_RE.test(cell))) return 'La cuadrícula contiene colores no válidos.';
  }
  return null;
}

// Devuelve los campos del diseño ya preparados para guardar, o { error }.
export function buildDesignData(raw) {
  const error = validateRaw(raw);
  if (error) return { error };
  const { palette, rle } = encodeGrid(raw.grid);
  let beads = 0;
  for (let i = 0; i < rle.length; i += 2) if (rle[i] !== -1) beads += rle[i + 1];
  if (!beads) return { error: 'El diseño está vacío: pinta alguna cuenta antes de guardarlo.' };
  const midi = palette.filter((c) => c.startsWith('S')).length;
  const gama = midi === 0 ? 'mini' : midi === palette.length ? 'midi' : 'mixta';
  return {
    cols: raw.cols,
    rows: raw.rows,
    beads,
    colors: palette.length,
    gama,
    data: { v: 2, cols: raw.cols, rows: raw.rows, pw: raw.pw, ph: raw.ph, pr: raw.pr, pc: raw.pc, palette, rle },
  };
}

export function validatePreview(preview) {
  if (typeof preview !== 'string' || !preview.startsWith(PREVIEW_PREFIX)) return 'Falta la vista previa del diseño.';
  if (preview.length > MAX_PREVIEW_BYTES) return 'La vista previa es demasiado grande.';
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(preview.slice(PREVIEW_PREFIX.length))) return 'La vista previa no es válida.';
  return null;
}

// ---------- Texto ----------
export function validateText({ title, description }, { partial = false } = {}) {
  const fields = {};
  if (!partial || title !== undefined) {
    const t = String(title ?? '').trim();
    if (t.length < 3 || t.length > 80) fields.title = 'El título debe tener entre 3 y 80 caracteres.';
  }
  if (description !== undefined && String(description).trim().length > 500) fields.description = 'La descripción no puede pasar de 500 caracteres.';
  return fields;
}

// ---------- Salida ----------
export function summary(doc) {
  return {
    id: String(doc._id),
    title: doc.title,
    description: doc.description,
    tags: doc.tags,
    isPublic: doc.isPublic,
    ownerId: String(doc.ownerId),
    ownerUsername: doc.ownerUsername,
    cols: doc.cols,
    rows: doc.rows,
    beads: doc.beads,
    colors: doc.colors,
    gama: doc.gama,
    likesCount: doc.likesCount ?? 0,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export const canSee = (doc, user) => doc.isPublic || (user && (String(doc.ownerId) === String(user._id) || user.role === 'admin'));
export const canEdit = (doc, user) => user && (String(doc.ownerId) === String(user._id) || user.role === 'admin');

// ---------- Índices ----------
export function ensureDesignIndexes(db) {
  if (!globalThis.__mosikDesignIndexes) {
    const c = db.collection('designs');
    globalThis.__mosikDesignIndexes = Promise.all([
      c.createIndex({ ownerId: 1, createdAt: -1 }),
      c.createIndex({ isPublic: 1, createdAt: -1 }),
      c.createIndex({ tags: 1 }),
      c.createIndex(
        { title: 'text', tags: 'text', description: 'text' },
        { weights: { title: 5, tags: 8, description: 1 }, default_language: 'spanish', name: 'busqueda_texto' },
      ),
    ]).catch((err) => {
      globalThis.__mosikDesignIndexes = undefined;
      throw err;
    });
  }
  return globalThis.__mosikDesignIndexes;
}
