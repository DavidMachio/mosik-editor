import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { useAcceso } from '../sim/SimContext.jsx';
import './tienda.css';

const li = (a) => <ul className="tw-lista">{a.map((x) => <li key={x}><Icon name="aceptar" size={18} /> {x}</li>)}</ul>;

export default function Planes() {
  const nivel = useAcceso();
  return (
    <div className="container tw">
      <div style={{ textAlign: 'center' }}>
        <h1 className="tw-h1">Planes</h1>
        <p className="muted">Empieza con 14 días de plan paid gratis. La tarjeta solo se pide si eliges quedarte.</p>
      </div>
      <div className="tw-grid tw-grid--2" style={{ maxWidth: 860, margin: '24px auto 0' }}>
        <div className="tw-pad">
          <h2>Free</h2><p className="muted">Para probar y crear tus primeras piezas.</p>
          <b style={{ font: '600 30px var(--font-display)' }}>0 €</b>
          {li(['1 proyecto', '5 diseños guardados', 'Herramienta con restricciones', 'Ver perfiles y galería'])}
          <Link className="btn btn--ghost" to={nivel === 'sin' ? '/registro' : '/herramienta'}>{nivel === 'sin' ? 'Crear cuenta gratis' : 'Seguir en free'}</Link>
        </div>
        <div className="tw-pad" style={{ borderColor: 'var(--mk-action-border)' }}>
          <span className="tw-chip">Recomendado</span>
          <h2 style={{ marginTop: 8 }}>Paid</h2><p className="muted">Todas las herramientas, sin límite de diseños.</p>
          <b style={{ font: '600 30px var(--font-display)' }}>2,99 €</b> <span className="muted">/mes · 24,99 €/año</span>
          {li(['20 proyectos', 'Diseños ilimitados (máximo 10 publicaciones al día, todas revisadas)', 'Herramienta completa', 'PDF y «Abrir como nuevo proyecto»'])}
          <Link className="btn" to={nivel === 'sin' ? '/registro' : '/cuenta/plan'}>Empezar 14 días gratis</Link>
        </div>
      </div>
      <p className="muted tw-peq" style={{ textAlign: 'center', marginTop: 18 }}>Precios provisionales, por validar con el mercado. El cobro con tarjeta aún no está activo.</p>
    </div>
  );
}
