// GET  /api/designs  · lista y búsqueda
//        ?q=palabras  busca en título, etiquetas y descripción
//        ?tag=etiqueta  ?owner=usuario  ?mine=1 (mis diseños, incluye privados)  ?page=1  ?limit=24
// POST /api/designs  · crea un diseño (hace falta sesión)
import { getDb } from '../_lib/mongo.js';
import { getSessionUser, requireJson, bodyOf } from '../_lib/auth.js';
import {
  MAX_DESIGNS_PER_USER, normalizeTags, buildDesignData, validatePreview, validateText, summary, ensureDesignIndexes,
} from '../_lib/designs.js';

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

async function list(req, res, db, user) {
  const query = req.query || {};
  const page = clamp(parseInt(query.page, 10) || 1, 1, 1000);
  const limit = clamp(parseInt(query.limit, 10) || 24, 1, 48);
  const q = String(query.q ?? '').trim().slice(0, 60);
  const tag = normalizeTags(query.tag)[0];
  const owner = String(query.owner ?? '').trim().toLowerCase();

  let filter;
  if (query.mine === '1') {
    if (!user) return res.status(401).json({ error: 'Inicia sesión para ver tus diseños.' });
    filter = { ownerId: user._id };
  } else {
    filter = { isPublic: true };
    if (owner) filter.ownerUsernameLower = owner;
  }
  if (tag) filter.tags = tag;
  if (q) filter.$text = { $search: q };

  let cursor = db.collection('designs').find(filter);
  if (q) cursor = cursor.project({ data: 0, preview: 0, score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } });
  else cursor = cursor.project({ data: 0, preview: 0 }).sort({ createdAt: -1 });

  const docs = await cursor.skip((page - 1) * limit).limit(limit + 1).toArray();
  return res.status(200).json({ designs: docs.slice(0, limit).map(summary), page, hasMore: docs.length > limit });
}

async function create(req, res, db, user) {
  if (!user) return res.status(401).json({ error: 'Inicia sesión para guardar el diseño.' });
  if (!requireJson(req, res)) return;
  const body = bodyOf(req);

  const fields = validateText(body);
  const built = buildDesignData(body.data);
  const previewError = validatePreview(body.preview);
  if (Object.keys(fields).length) return res.status(400).json({ error: 'Revisa los datos.', fields });
  if (built.error) return res.status(400).json({ error: built.error });
  if (previewError) return res.status(400).json({ error: previewError });

  if (user.role !== 'admin' && (await db.collection('designs').countDocuments({ ownerId: user._id })) >= MAX_DESIGNS_PER_USER) {
    return res.status(403).json({ error: `Has llegado al máximo de ${MAX_DESIGNS_PER_USER} diseños guardados. Borra alguno para guardar otro.` });
  }

  const now = new Date();
  const doc = {
    ownerId: user._id,
    ownerUsername: user.username,
    ownerUsernameLower: user.usernameLower,
    title: String(body.title).trim(),
    description: String(body.description ?? '').trim(),
    tags: normalizeTags(body.tags),
    isPublic: body.isPublic === true,
    collectionId: null,
    cols: built.cols,
    rows: built.rows,
    beads: built.beads,
    colors: built.colors,
    gama: built.gama,
    data: built.data,
    preview: body.preview,
    likesCount: 0,
    createdAt: now,
    updatedAt: now,
  };
  const { insertedId } = await db.collection('designs').insertOne(doc);
  doc._id = insertedId;
  return res.status(201).json({ design: summary(doc) });
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const db = await getDb();
    await ensureDesignIndexes(db);
    const user = await getSessionUser(req, db);
    if (req.method === 'GET') return await list(req, res, db, user);
    if (req.method === 'POST') return await create(req, res, db, user);
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Método no permitido.' });
  } catch (err) {
    console.error('designs: error:', err.message);
    return res.status(500).json({ error: 'No se pudo completar la operación. Inténtalo de nuevo.' });
  }
}
