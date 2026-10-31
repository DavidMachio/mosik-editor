// Conexión compartida a MongoDB Atlas para las funciones de /api.
// La carpeta _lib empieza por guion bajo: Vercel no la publica como ruta.
import { MongoClient } from 'mongodb';

export const DB_NAME = 'mosik';

// Se guarda en globalThis para reutilizar la conexión entre llamadas mientras la función sigue "caliente".
export async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Falta la variable de entorno MONGODB_URI');

  if (!globalThis.__mosikMongo) {
    const client = new MongoClient(uri, { maxPoolSize: 5, serverSelectionTimeoutMS: 8000 });
    globalThis.__mosikMongo = client.connect().catch((err) => {
      globalThis.__mosikMongo = undefined; // permite reintentar en la siguiente llamada
      throw err;
    });
  }
  const client = await globalThis.__mosikMongo;
  return client.db(DB_NAME);
}
