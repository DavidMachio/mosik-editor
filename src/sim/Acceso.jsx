import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import ToolDemo from '../components/ToolDemo.jsx';
import { useAcceso } from './SimContext.jsx';
import '../tienda/tienda.css';

// Pantalla que sustituye a una página restringida cuando no hay cuenta.
// Sin cuenta se puede navegar y ver la tienda; lo bloqueado es la herramienta, los diseños de otras personas, los perfiles y la cuenta.
const TEXTOS = {
  herramienta: {
    titulo: 'Crea tus propios diseños',
    gancho: 'La herramienta de Mosik te deja dibujar cuenta a cuenta, ver el recuento de colores y montar tu pieza con calma.',
    puntos: ['Dibuja o convierte una imagen en patrón', 'Recuento exacto de cuentas por color', 'Guarda tus proyectos y publica en la galería'],
  },
  diseno: {
    titulo: 'Este diseño es de la comunidad',
    gancho: 'Con una cuenta gratuita puedes ver los diseños que publican otras personas, guardarlos y abrirlos para inspirarte.',
    puntos: ['Ver diseños y perfiles de la comunidad', 'Guardar favoritos y crear carpetas', 'Crear tu primer proyecto gratis'],
  },
  cuenta: {
    titulo: 'Necesitas una cuenta',
    gancho: 'Aquí viven tus proyectos, tus diseños, tus favoritos y tus avisos.',
    puntos: ['Es gratis y tarda un minuto', '14 días de plan paid de prueba al registrarte', 'La tarjeta solo se pide si eliges quedarte'],
  },
};

export function PuertaAcceso({ tipo = 'cuenta' }) {
  const t = TEXTOS[tipo] || TEXTOS.cuenta;
  return (
    <div className="container tw tw--puerta">
      <div className="puerta">
        <div>
          <span className="tw-ico"><Icon name="candado" size={22} /></span>
          <h1 className="tw-h1">{t.titulo}</h1>
          <p>{t.gancho}</p>
          <ul className="tw-lista">{t.puntos.map((x) => <li key={x}><Icon name="aceptar" size={18} /> {x}</li>)}</ul>
          <div className="tw-fila">
            <Link className="btn" to="/registro">Crear cuenta gratis</Link>
            <Link className="btn btn--ghost" to="/entrar">Ya tengo cuenta</Link>
          </div>
          <p className="muted tw-peq"><Link to="/planes">Ver más planes</Link></p>
        </div>
        {tipo === 'herramienta' && <div className="puerta__demo"><ToolDemo /></div>}
      </div>
    </div>
  );
}

export function Protegida({ tipo, children }) {
  const nivel = useAcceso();
  return nivel === 'sin' ? <PuertaAcceso tipo={tipo} /> : children;
}
