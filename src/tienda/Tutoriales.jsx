import { Link, useParams } from 'react-router-dom';
import NotFound from '../pages/NotFound.jsx';
import './tienda.css';

// Textos provisionales: se redactarán con calma antes del lanzamiento.
export const TUTS = [
  { id: 'primer-diseno', t: 'Tu primer diseño paso a paso', d: 'De la idea a la placa, sin agobios.', pasos: ['Elige un tamaño pequeño para empezar.', 'Dibuja la silueta con un solo color.', 'Añade dos o tres colores más y revisa el recuento.', 'Guarda el proyecto y móntalo con calma.'] },
  { id: 'planchar', t: 'Cómo planchar sin que se deforme', d: 'Temperatura, papel y paciencia.', pasos: ['Cubre la pieza con papel de horno.', 'Plancha con calor medio y movimientos circulares.', 'Gira la pieza y repite por detrás.', 'Déjala enfriar bajo un libro para que quede plana.'] },
  { id: 'colores', t: 'Elegir una paleta que funcione', d: 'Pocos colores, mucho carácter.', pasos: ['Empieza con cuatro o cinco colores.', 'Asegura contraste entre fondo y figura.', 'Usa un color de acento solo en detalles.'] },
  { id: 'imagen-a-patron', t: 'Convertir una imagen en patrón', d: 'Para quien parte de una foto o un dibujo.', pasos: ['Elige una imagen sencilla y con buen contraste.', 'Impórtala en la herramienta y ajusta el tamaño.', 'Reduce los colores y retoca a mano lo que haga falta.'] },
  { id: 'montar-kit', t: 'Montar un kit de colección', d: 'Orden, placas y colores a mano.', pasos: ['Separa las cuentas por color antes de empezar.', 'Sigue el librito de arriba abajo, placa a placa.', 'Revisa cada fila antes de pasar a la siguiente.'] },
  { id: 'exponer', t: 'Marcos y formas de exponer tus piezas', d: 'Ideas para colgarlas todas iguales.', pasos: ['Usa marcos del mismo tamaño para una pared ordenada.', 'Deja un margen alrededor de la pieza.', 'Prueba la composición en el suelo antes de colgar.'] },
];

export function Tutoriales() {
  return (
    <div className="container tw">
      <h1 className="tw-h1">Tutoriales</h1>
      <p className="muted">Guías cortas para montar, planchar y exponer.</p>
      <div className="tw-grid tw-grid--2">
        {TUTS.map((t) => (
          <Link key={t.id} to={`/tutoriales/${t.id}`} className="tw-card"><div className="tw-card__b"><h3>{t.t}</h3><p className="muted">{t.d}</p></div></Link>
        ))}
      </div>
    </div>
  );
}

export function Tutorial() {
  const { id } = useParams();
  const t = TUTS.find((x) => x.id === id);
  if (!t) return <NotFound />;
  return (
    <div className="container tw" style={{ maxWidth: 760 }}>
      <nav className="tw-crumbs" aria-label="Migas"><Link to="/tutoriales">Tutoriales</Link> › {t.t}</nav>
      <h1 className="tw-h1">{t.t}</h1>
      <p className="muted">{t.d}</p>
      <ol>{t.pasos.map((p) => <li key={p} style={{ margin: '8px 0' }}>{p}</li>)}</ol>
      <div className="tw-callout">Guía provisional: el texto definitivo llegará antes del lanzamiento.</div>
    </div>
  );
}
