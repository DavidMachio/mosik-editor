// POST /api/auth/login · { identifier (correo o nombre de usuario), password }
import { getDb } from '../_lib/mongo.js';
import {
  ensureIndexes, verifyPassword, burnPasswordCheck, createSession, publicUser,
  tooManyFailures, recordFailure, clearFailures, requireJsonPost, bodyOf,
} from '../_lib/auth.js';

const BAD_CREDENTIALS = 'Correo, usuario o contraseña incorrectos.';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!requireJsonPost(req, res)) return;

  const body = bodyOf(req);
  const identifier = String(body.identifier ?? '').trim().toLowerCase();
  const password = String(body.password ?? '');
  if (!identifier || !password || identifier.length > 254 || password.length > 128) {
    return res.status(400).json({ error: 'Escribe tu correo o usuario y tu contraseña.' });
  }

  try {
    const db = await getDb();
    await ensureIndexes(db);

    if (await tooManyFailures(db, identifier)) {
      return res.status(429).json({ error: 'Demasiados intentos. Espera unos 15 minutos y vuelve a probar.' });
    }

    const query = identifier.includes('@') ? { emailLower: identifier } : { usernameLower: identifier };
    const user = await db.collection('users').findOne(query);

    const valid = user ? await verifyPassword(password, user.passwordHash) : (await burnPasswordCheck(password), false);
    if (!valid) {
      await recordFailure(db, identifier);
      return res.status(401).json({ error: BAD_CREDENTIALS });
    }

    await clearFailures(db, identifier);
    await createSession(res, db, user._id);
    return res.status(200).json({ user: publicUser(user) });
  } catch (err) {
    console.error('login: error:', err.message);
    return res.status(500).json({ error: 'No se pudo iniciar sesión. Inténtalo de nuevo.' });
  }
}
