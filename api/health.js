// GET /api/health · comprueba que la web llega a la base de datos.
// No devuelve datos sensibles: solo si funciona y el nombre de la base de datos.
import { getDb } from './_lib/mongo.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    res.status(200).json({ ok: true, database: db.databaseName });
  } catch (err) {
    console.error('health: fallo de conexión con la base de datos:', err.message);
    res.status(503).json({ ok: false, error: 'No se pudo conectar con la base de datos' });
  }
}
