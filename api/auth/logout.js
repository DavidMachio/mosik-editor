// POST /api/auth/logout
import { getDb } from '../_lib/mongo.js';
import { destroySession, requireJsonPost } from '../_lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!requireJsonPost(req, res)) return;
  try {
    await destroySession(req, res, await getDb());
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('logout: error:', err.message);
    return res.status(500).json({ error: 'No se pudo cerrar la sesión.' });
  }
}
