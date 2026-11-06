import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import './tienda.css';

export const AVISOS_MUESTRA = [
  { txt: 'Tu kit favorito ya está disponible (aviso de muestra).', cuando: 'hoy' },
  { txt: 'A 12 personas les gusta uno de tus diseños (aviso de muestra).', cuando: 'hace 2 h' },
  { txt: 'Tu diseño ha sido aprobado y ya es público (aviso de muestra).', cuando: 'hace 3 días' },
];

export default function Campana() {
  const [abierta, setAbierta] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!abierta) return undefined;
    const fuera = (e) => { if (ref.current && !ref.current.contains(e.target)) setAbierta(false); };
    const esc = (e) => { if (e.key === 'Escape') setAbierta(false); };
    document.addEventListener('pointerdown', fuera); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', fuera); document.removeEventListener('keydown', esc); };
  }, [abierta]);
  return (
    <div className="tw-campana" ref={ref} style={{ position: 'relative' }}>
      <button type="button" className="site-nav__link" aria-label="Avisos" aria-expanded={abierta} onClick={() => setAbierta((v) => !v)}>
        <Icon name="campana" size={20} /><span className="tw-campana__dot" aria-hidden="true" />
      </button>
      {abierta && (
        <div className="tw-menu" role="dialog" aria-label="Avisos">
          {AVISOS_MUESTRA.map((a) => <div key={a.txt} className="tw-aviso"><div>{a.txt}<br /><span className="muted tw-peq">{a.cuando}</span></div></div>)}
          <p style={{ margin: '8px 0 4px' }}><Link to="/cuenta/avisos" onClick={() => setAbierta(false)}>Mis avisos</Link></p>
        </div>
      )}
    </div>
  );
}
