// GET /api/auth/me · devuelve el usuario de la sesión actual, o null
import { getDb } from '../_lib/mongo.js';
import { getSessionUser, publicUser } from '../_lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Método no permitido.' });
  }
  try {
    const user = await getSessionUser(req, await getDb());
    return res.status(200).json({ user: user ? publicUser(user) : null });
  } catch (err) {
    console.error('me: error:', err.message);
    return res.status(500).json({ error: 'No se pudo comprobar la sesión.' });
  }
}
