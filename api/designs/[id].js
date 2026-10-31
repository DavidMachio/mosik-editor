// GET    /api/designs/:id             · ficha completa (con la cuadrícula)
// GET    /api/designs/:id?preview=1   · imagen de vista previa (PNG)
// PATCH  /api/designs/:id             · edita título, descripción, etiquetas, visibilidad o el propio diseño
// DELETE /api/designs/:id             · borra el diseño
import { getDb } from '../_lib/mongo.js';
import { getSessionUser, requireJson, bodyOf } from '../_lib/auth.js';
import {
  toObjectId, normalizeTags, buildDesignData, validatePreview, validateText, summary, canSee, canEdit,
} from '../_lib/designs.js';

const NOT_FOUND = { error: 'No encontramos este diseño.' };

function sendPreview(res, doc) {
  const buf = Buffer.from(String(doc.preview).split(',')[1] || '', 'base64');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', doc.isPublic ? 'public, max-age=3600' : 'private, max-age=300');
  return res.status(200).send(buf);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const id = toObjectId(String(req.query?.id ?? ''));
  if (!id) return res.status(404).json(NOT_FOUND);

  try {
    const db = await getDb();
    const designs = db.collection('designs');
    const user = await getSessionUser(req, db);
    const doc = await designs.findOne({ _id: id });
    if (!doc || !canSee(doc, user)) return res.status(404).json(NOT_FOUND);

    if (req.method === 'GET') {
      if (req.query?.preview) return sendPreview(res, doc);
      return res.status(200).json({ design: { ...summary(doc), data: doc.data } });
    }

    if (req.method === 'PATCH') {
      if (!canEdit(doc, user)) return res.status(403).json({ error: 'Solo quien creó el diseño puede cambiarlo.' });
      if (!requireJson(req, res)) return;
      const body = bodyOf(req);
      const set = {};

      const fields = validateText(body, { partial: true });
      if (Object.keys(fields).length) return res.status(400).json({ error: 'Revisa los datos.', fields });
      if (body.title !== undefined) set.title = String(body.title).trim();
      if (body.description !== undefined) set.description = String(body.description).trim();
      if (body.tags !== undefined) set.tags = normalizeTags(body.tags);
      if (body.isPublic !== undefined) set.isPublic = body.isPublic === true;

      if (body.data !== undefined || body.preview !== undefined) {
        const built = buildDesignData(body.data);
        const previewError = validatePreview(body.preview);
        if (built.error) return res.status(400).json({ error: built.error });
        if (previewError) return res.status(400).json({ error: previewError });
        Object.assign(set, {
          cols: built.cols, rows: built.rows, beads: built.beads, colors: built.colors, gama: built.gama,
          data: built.data, preview: body.preview,
        });
      }
      if (!Object.keys(set).length) return res.status(400).json({ error: 'No hay nada que cambiar.' });

      set.updatedAt = new Date();
      await designs.updateOne({ _id: id }, { $set: set });
      return res.status(200).json({ design: summary({ ...doc, ...set }) });
    }

    if (req.method === 'DELETE') {
      if (!canEdit(doc, user)) return res.status(403).json({ error: 'Solo quien creó el diseño puede borrarlo.' });
      await designs.deleteOne({ _id: id });
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, PATCH, DELETE');
    return res.status(405).json({ error: 'Método no permitido.' });
  } catch (err) {
    console.error('designs/[id]: error:', err.message);
    return res.status(500).json({ error: 'No se pudo completar la operación. Inténtalo de nuevo.' });
  }
}
