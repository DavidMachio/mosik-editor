import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(path, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'same-origin',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw Object.assign(new Error(data.error || 'Algo ha salido mal. Inténtalo de nuevo.'), {
      status: res.status,
      fields: data.fields || {},
    });
  }
  return data;
}

export const ROLE_LABELS = { admin: 'Administrador', free: 'Gratuito', paid: 'De pago' };

export function AuthProvider({ children }) {
  // undefined = comprobando la sesión, null = sin sesión, objeto = usuario
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    let cancelled = false;
    request('/api/auth/me')
      .then((data) => !cancelled && setUser(data.user))
      .catch(() => !cancelled && setUser(null));
    return () => { cancelled = true; };
  }, []);

  const register = useCallback(async (fields) => {
    const data = await request('/api/auth/register', { method: 'POST', body: fields });
    setUser(data.user);
    return data.user;
  }, []);

  const login = useCallback(async (fields) => {
    const data = await request('/api/auth/login', { method: 'POST', body: fields });
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    try { await request('/api/auth/logout', { method: 'POST', body: {} }); } finally { setUser(null); }
  }, []);

  const value = useMemo(() => ({ user, loading: user === undefined, register, login, logout }), [user, register, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
