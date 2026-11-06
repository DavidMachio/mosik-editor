import { useState } from 'react';

// «Avísame» provisional: guarda el correo solo en este navegador. Con la base de datos descongelada pasará a la API.
const CLAVE = 'mosik:avisame';
function leer() { try { return JSON.parse(window.localStorage.getItem(CLAVE) || '{}'); } catch { return {}; } }

export default function Avisame({ id }) {
  const [abierto, setAbierto] = useState(false);
  const [correo, setCorreo] = useState('');
  const [hecho, setHecho] = useState(() => Boolean(leer()[id]));
  const guardar = (e) => {
    e.preventDefault();
    const todos = leer(); todos[id] = correo;
    try { window.localStorage.setItem(CLAVE, JSON.stringify(todos)); } catch { /* sin almacenamiento */ }
    setHecho(true); setAbierto(false);
  };
  if (hecho) return <span className="tw-chip">Te avisaremos</span>;
  if (!abierto) return <button type="button" className="btn btn--ghost" onClick={() => setAbierto(true)}>Avísame</button>;
  return (
    <form className="tw-buscar" onSubmit={guardar} style={{ margin: 0 }}>
      <input type="email" required placeholder="tu@correo.com" aria-label="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      <button className="btn" type="submit">Avisarme</button>
    </form>
  );
}
