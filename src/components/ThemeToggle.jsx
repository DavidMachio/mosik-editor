import { useEffect, useState } from 'react';
import './ThemeToggle.css';

const KEY = 'mosik-theme';
const OPTIONS = [
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Oscuro' },
  { value: 'system', label: 'Auto' },
];

function readSaved() {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch {
    return 'system';
  }
}

// Claro / Oscuro / Auto (sigue el sistema). La elección se guarda solo en este navegador.
export default function ThemeToggle() {
  const [mode, setMode] = useState(readSaved);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'system') delete root.dataset.theme;
    else root.dataset.theme = mode;
    try {
      if (mode === 'system') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, mode);
    } catch { /* sin almacenamiento: se aplica igualmente en esta visita */ }
  }, [mode]);

  return (
    <div className="theme-toggle" role="group" aria-label="Tema de color">
      {OPTIONS.map((o) => (
        <button key={o.value} type="button" aria-pressed={mode === o.value} onClick={() => setMode(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
