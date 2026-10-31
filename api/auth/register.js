// POST /api/auth/register · { email, username, password }
import { getDb } from '../_lib/mongo.js';
import {
  validateRegistration, hashPassword, ensureIndexes, createSession, publicUser, requireJsonPost, bodyOf,
} from '../_lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!requireJsonPost(req, res)) return;

  const { fields, clean } = validateRegistration(bodyOf(req));
  if (Object.keys(fields).length) return res.status(400).json({ error: 'Revisa los datos.', fields });

  try {
    const db = await getDb();
    await ensureIndexes(db);

    const user = {
      email: clean.email,
      emailLower: clean.emailLower,
      username: clean.username,
      usernameLower: clean.usernameLower,
      passwordHash: await hashPassword(clean.password),
      role: 'free',
      createdAt: new Date(),
    };

    try {
      const { insertedId } = await db.collection('users').insertOne(user);
      user._id = insertedId;
    } catch (err) {
      if (err?.code === 11000) {
        const key = err.keyPattern ? Object.keys(err.keyPattern)[0] : String(err.message);
        if (key.includes('username')) {
          return res.status(409).json({ error: 'Revisa los datos.', fields: { username: 'Ese nombre de usuario ya está en uso.' } });
        }
        return res.status(409).json({ error: 'Revisa los datos.', fields: { email: 'Ya existe una cuenta con ese correo. Prueba a iniciar sesión.' } });
      }
      throw err;
    }

    await createSession(res, db, user._id);
    return res.status(201).json({ user: publicUser(user) });
  } catch (err) {
    console.error('register: error:', err.message);
    return res.status(500).json({ error: 'No se pudo crear la cuenta. Inténtalo de nuevo.' });
  }
}
