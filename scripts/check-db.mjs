// Prueba local de la conexión: npm run db:check
// Lee MONGODB_URI del archivo .env (funciona con cualquier versión de Node 18 o superior).
import { readFileSync, existsSync } from 'node:fs';
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI && existsSync('.env')) {
  for (const line of readFileSync('.env', 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !line.trim().startsWith('#')) process.env[m[1]] ??= m[2].replace(/^["']|["']$/g, '');
  }
}

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
