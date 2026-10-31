// Prueba local de la conexión: npm run db:check
// Lee MONGODB_URI del archivo .env (Node 20.6 o superior).
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Falta MONGODB_URI. Comprueba que existe el archivo .env en la raíz del proyecto.');
  process.exit(1);
}

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
try {
  await client.connect();
  await client.db('mosik').command({ ping: 1 });
  console.log('OK: conectado a MongoDB Atlas (base de datos "mosik").');
} catch (err) {
  console.error('ERROR de conexión:', err.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
