import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { request } from '../lib/api.js';

const AuthContext = createContext(null);

export const ROLE_LABELS = { admin: 'Administrador', userFree: 'Gratuito', userPaid: 'De pago' };

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
