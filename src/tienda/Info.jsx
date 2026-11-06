import { Link, useParams } from 'react-router-dom';
import NotFound from '../pages/NotFound.jsx';
import './tienda.css';

const Pagina = ({ titulo, children }) => (<div className="container tw" style={{ maxWidth: 860 }}><h1 className="tw-h1">{titulo}</h1>{children}</div>);

export function Sobre() {
  return (
    <Pagina titulo="Sobre Mosik">
      <p style={{ fontSize: 18 }}>Mosik Beads nace de las ganas de convertir las cuentas para planchar en colecciones que dan gusto exponer. Diseños propios, patrones cuidados y una herramienta para que crees los tuyos.</p>
      <div className="tw-grid tw-grid--2">
        {[['Cuidado', 'Pocas piezas, bien hechas.'], ['Comunidad', 'Crea, publica y comparte.'], ['Claridad', 'Patrones fáciles de seguir.']].map(([t, d]) => <div key={t} className="tw-pad"><h3>{t}</h3><p className="muted">{d}</p></div>)}
      </div>
    </Pagina>
  );
}

export function Como() {
  return (
    <Pagina titulo="Cómo funciona">
      <div className="tw-grid tw-grid--2">
        {[['1 · Elige o crea', 'Un kit de colección o un diseño tuyo desde la herramienta.'], ['2 · Monta', 'Sigue el patrón con las cuentas justas de cada color.'], ['3 · Plancha y expón', 'Fija, deja enfriar y cuélgalo.']].map(([t, d]) => <div key={t} className="tw-pad"><h3>{t}</h3><p className="muted">{d}</p></div>)}
      </div>
      <div className="tw-fila"><Link className="btn" to="/herramienta">Crea tu diseño</Link></div>
    </Pagina>
  );
}

export function Novedades() {
  return (
    <Pagina titulo="Novedades">
      <div className="tw-grid tw-grid--2">
        {[['Street Fighter II', 'Los retratos de pixel art ya tienen su colección.'], ['Super Mario y Bowser', 'Tres poses de cada uno para colgar juntos.'], ['La tienda se prepara', 'Pulsa «Avísame» en los kits que te interesen.']].map(([t, d]) => <div key={t} className="tw-pad"><span className="tw-chip">Novedad</span><h3 style={{ marginTop: 8 }}>{t}</h3><p className="muted">{d}</p></div>)}
      </div>
    </Pagina>
  );
}

const FAQ = [
  ['¿Puedo comprar ya?', 'Todavía no: la compra se activará más adelante. Pulsa «Avísame» en el kit que te guste.'],
  ['¿Qué incluye el plan free?', '1 proyecto, 5 diseños y la herramienta con restricciones.'],
  ['¿Cómo funciona la prueba de 14 días?', 'Te registras y tienes el plan paid completo. La tarjeta solo se pide si decides quedarte.'],
  ['¿Quién revisa los diseños publicados?', 'Todos pasan por una revisión antes de aparecer en la galería.'],
];
export function Ayuda() {
  return (
    <Pagina titulo="Ayuda y contacto">
      {FAQ.map(([q, a]) => <details key={q} className="tw-faq"><summary>{q}</summary><p className="muted" style={{ marginTop: 8 }}>{a}</p></details>)}
      <div className="tw-callout">El formulario de contacto se activará con el lanzamiento.</div>
    </Pagina>
  );
}

const LEGAL = { 'aviso-legal': 'Aviso legal', privacidad: 'Política de privacidad', cookies: 'Política de cookies', condiciones: 'Condiciones de uso' };
export function Legal() {
  const { k } = useParams();
  if (!LEGAL[k]) return <NotFound />;
  return (
    <Pagina titulo={LEGAL[k]}>
      <div className="tw-callout">Texto pendiente de redactar y revisar con un gestor o abogado antes de recoger correos o descargar patrones.</div>
    </Pagina>
  );
}
