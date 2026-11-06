import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';
import { SIMULADOR_ACTIVO, NIVEL_INICIAL } from './config.js';
import './Sim.css';

const SimCtx = createContext(null);
const CLAVE = 'mosik:sim-nivel';
const NIVELES = [['sin', 'Sin cuenta'], ['free', 'Free'], ['paid', 'Paid']];

function leer() {
  try { const v = window.localStorage.getItem(CLAVE); if (NIVELES.some(([k]) => k === v)) return v; } catch { /* sin almacenamiento */ }
  return NIVEL_INICIAL;
}

export function SimProvider({ children }) {
  const [nivel, setNivelState] = useState(leer);
  const setNivel = useCallback((n) => {
    setNivelState(n);
    try { window.localStorage.setItem(CLAVE, n); } catch { /* sin almacenamiento */ }
  }, []);
  const value = useMemo(() => ({ nivel, setNivel }), [nivel, setNivel]);
  return <SimCtx.Provider value={value}>{children}</SimCtx.Provider>;
}

// Nivel de acceso efectivo: 'sin' | 'free' | 'paid'. Con el simulador activo manda el simulado; si no, la sesión real.
export function useAcceso() {
  const sim = useContext(SimCtx);
  const { user } = useAuth();
  if (SIMULADOR_ACTIVO && sim) return sim.nivel;
  if (!user) return 'sin';
  return user.role === 'userFree' ? 'free' : 'paid';
}

export function SimBar() {
  const sim = useContext(SimCtx);
  if (!SIMULADOR_ACTIVO || !sim) return null;
  return (
    <div className="simbar" role="group" aria-label="Simulador de tipo de cuenta (provisional)">
      <span className="simbar__t">Simular cuenta</span>
      {NIVELES.map(([k, t]) => (
        <button key={k} type="button" className="simbar__b" aria-pressed={sim.nivel === k} onClick={() => sim.setNivel(k)}>{t}</button>
      ))}
    </div>
  );
}
