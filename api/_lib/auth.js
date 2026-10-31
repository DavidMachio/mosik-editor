// Utilidades de usuarios y sesiones. Solo usa módulos de Node (sin paquetes extra).
import { randomBytes, scrypt as scryptCb, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCb);

export const SESSION_COOKIE = 'mosik_session';
const SESSION_DAYS = 30;
const MAX_FAILED_ATTEMPTS = 8; // por correo o usuario, cada 15 minutos
export const ROLES = ['admin', 'userFree', 'userPaid'];
// Compatibilidad: las primeras cuentas se crearon con 'free' y 'paid'.
export const normalizeRole = (role) => ({ free: 'userFree', paid: 'userPaid' }[role] || role);

// ---------- Contraseñas ----------
const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 };

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, SCRYPT.keylen, { N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p });
  return ['scrypt', SCRYPT.N, SCRYPT.r, SCRYPT.p, salt.toString('base64'), key.toString('base64')].join('$');
}

export async function verifyPassword(password, stored) {
  const [alg, N, r, p, saltB64, keyB64] = String(stored || '').split('$');
  if (alg !== 'scrypt' || !saltB64 || !keyB64) return false;
  const expected = Buffer.from(keyB64, 'base64');
  const key = await scrypt(password, Buffer.from(saltB64, 'base64'), expected.length, {
    N: Number(N), r: Number(r), p: Number(p),
  });
  return key.length === expected.length && timingSafeEqual(key, expected);
}

// Hash falso para tardar lo mismo cuando el usuario no existe (evita adivinar qué cuentas existen por el tiempo).
let dummyHash;
export async function burnPasswordCheck(password) {
  dummyHash ??= await hashPassword('no-es-una-contraseña-real');
  await verifyPassword(password, dummyHash);
}

// ---------- Validación ----------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const USERNAME_RE = /^[a-z0-9][a-z0-9._]{2,19}$/; // 3 a 20, ya en minúsculas
const RESERVED_USERNAMES = new Set([
  'admin', 'administrador', 'administrator', 'root', 'mosik', 'mosikbeads', 'soporte', 'support',
  'ayuda', 'help', 'api', 'perfil', 'entrar', 'registro', 'herramienta', 'tienda', 'comunidad',
]);

export function validateRegistration(input) {
  const fields = {};
  const email = String(input?.email ?? '').trim();
  const username = String(input?.username ?? '').trim();
  const password = String(input?.password ?? '');

  if (!EMAIL_RE.test(email) || email.length > 254) fields.email = 'Escribe un correo válido.';
  if (!USERNAME_RE.test(username.toLowerCase())) {
    fields.username = 'Entre 3 y 20 caracteres: letras, números, punto o guion bajo.';
  } else if (RESERVED_USERNAMES.has(username.toLowerCase())) {
    fields.username = 'Ese nombre de usuario no está disponible.';
  }
  if (password.length < 10) fields.password = 'La contraseña debe tener al menos 10 caracteres.';
  else if (password.length > 128) fields.password = 'La contraseña es demasiado larga (máximo 128).';

  return { fields, clean: { email, emailLower: email.toLowerCase(), username, usernameLower: username.toLowerCase(), password } };
}

export function publicUser(user) {
  return {
    id: String(user._id),
    email: user.email,
    username: user.username,
    role: normalizeRole(user.role),
    createdAt: user.createdAt,
  };
}

// ---------- Índices ----------
export function ensureIndexes(db) {
  if (!globalThis.__mosikIndexes) {
    globalThis.__mosikIndexes = Promise.all([
      db.collection('users').createIndex({ emailLower: 1 }, { unique: true }),
      db.collection('users').createIndex({ usernameLower: 1 }, { unique: true }),
      db.collection('sessions').createIndex({ tokenHash: 1 }, { unique: true }),
      db.collection('sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
      db.collection('authAttempts').createIndex({ createdAt: 1 }, { expireAfterSeconds: 900 }),
    ]).catch((err) => {
      globalThis.__mosikIndexes = undefined;
      throw err;
    });
  }
  return globalThis.__mosikIndexes;
}

// ---------- Cookies y sesiones ----------
const sha256 = (text) => createHash('sha256').update(text).digest('hex');

function readCookie(req, name) {
  const header = req.headers?.cookie || '';
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i > -1 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

function writeCookie(res, value, maxAgeSeconds) {
  res.setHeader('Set-Cookie',
    `${SESSION_COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAgeSeconds}`);
}

export async function createSession(res, db, userId) {
  const token = randomBytes(32).toString('base64url');
  const now = new Date();
  await db.collection('sessions').insertOne({
    tokenHash: sha256(token),
    userId,
    createdAt: now,
    expiresAt: new Date(now.getTime() + SESSION_DAYS * 86400000),
  });
  writeCookie(res, token, SESSION_DAYS * 86400);
}

export async function getSessionUser(req, db) {
  const token = readCookie(req, SESSION_COOKIE);
  if (!token) return null;
  const session = await db.collection('sessions').findOne({ tokenHash: sha256(token), expiresAt: { $gt: new Date() } });
  if (!session) return null;
  return (await db.collection('users').findOne({ _id: session.userId })) || null;
}

export async function destroySession(req, res, db) {
  const token = readCookie(req, SESSION_COOKIE);
  if (token) await db.collection('sessions').deleteOne({ tokenHash: sha256(token) });
  writeCookie(res, '', 0);
}

// ---------- Límite de intentos fallidos ----------
export async function tooManyFailures(db, key) {
  return (await db.collection('authAttempts').countDocuments({ key })) >= MAX_FAILED_ATTEMPTS;
}
export const recordFailure = (db, key) => db.collection('authAttempts').insertOne({ key, createdAt: new Date() });
export const clearFailures = (db, key) => db.collection('authAttempts').deleteMany({ key });

// ---------- Peticiones ----------
// Solo POST con JSON: un formulario de otra web no puede enviar esto sin permiso del navegador.
export function requireJsonPost(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Método no permitido.' });
    return false;
  }
  if (!String(req.headers?.['content-type'] || '').toLowerCase().includes('application/json')) {
    res.status(415).json({ error: 'Formato no admitido.' });
    return false;
  }
  return true;
}

// Para PATCH y otros métodos con cuerpo: exige JSON.
export function requireJson(req, res) {
  if (!String(req.headers?.['content-type'] || '').toLowerCase().includes('application/json')) {
    res.status(415).json({ error: 'Formato no admitido.' });
    return false;
  }
  return true;
}

export const bodyOf = (req) => (req.body && typeof req.body === 'object' ? req.body : {});
