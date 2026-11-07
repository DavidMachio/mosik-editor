import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { porSlug } from '../data/colecciones/index.js';
import { CONTENIDO, euros, precio, producto, productosDe } from '../data/tienda.js';
import Ilustracion from './Ilustracion.jsx';
import ProductoCard from './ProductoCard.jsx';
import Avisame from './Avisame.jsx';
import NotFound from '../pages/NotFound.jsx';
import './tienda.css';

const VISTAS = [['caja', 'Caja'], ['contenido', 'Contenido'], ['marco', 'Con marco'], ['librito', 'Librito']];

export default function Producto() {
  const { slug, dis } = useParams();
  const col = porSlug(slug);
  const p = producto(slug, dis);
  const [vista, setVista] = useState('caja');
  const [formato, setFormato] = useState('kit');
  const [tamano, setTamano] = useState('mini');
  if (!col || !p) return <NotFound />;
  const placas = Math.ceil(p.ancho / 29) * Math.ceil(p.alto / 29);
  const relacionados = productosDe(slug).filter((x) => x.id !== p.id);
  return (
    <div className="container tw">
      <nav className="tw-crumbs" aria-label="Migas"><Link to="/tienda">Tienda</Link> › <Link to={`/coleccion/${slug}`}>{col.titulo}</Link> › {p.nombre}</nav>
      <div className="tw-prod-pg">
        <div className="tw-galeria">
          <div style={{ borderRadius: 'var(--radius-card)', overflow: 'hidden' }}><Ilustracion tema={p.tema} tipo={vista} etiqueta={`${p.nombre}: ${vista}`} /></div>
          <div className="tw-galeria__min">
            {VISTAS.map(([k, t]) => (
              <button key={k} type="button" aria-pressed={vista === k} aria-label={t} onClick={() => setVista(k)}><Ilustracion tema={p.tema} tipo={k} etiqueta={t} /></button>
            ))}
          </div>
        </div>
        <div>
          <span className="tw-chip">{col.titulo} · {p.nivel}</span>
          <h1 className="tw-h1" style={{ marginTop: 8 }}>{p.nombre}</h1>
          <p>{p.gancho}</p>
          <h3 className="tw-peq">Formato</h3>
          <div className="tw-opc" role="group" aria-label="Formato">
            <button type="button" aria-pressed={formato === 'kit'} onClick={() => setFormato('kit')}>Kit</button>
            <button type="button" aria-pressed={formato === 'marco'} onClick={() => setFormato('marco')}>Pack con marco</button>
          </div>
          <h3 className="tw-peq">Cuenta</h3>
          <div className="tw-opc" role="group" aria-label="Tamaño de cuenta">
            <button type="button" aria-pressed={tamano === 'mini'} onClick={() => setTamano('mini')}>Mini</button>
            <button type="button" aria-pressed={tamano === 'midi'} onClick={() => setTamano('midi')}>Midi</button>
          </div>
          <div className="tw-precio-g">{euros(precio(p, formato, tamano))}</div>
          <p className="muted tw-peq">Precio provisional, IVA incluido por confirmar.</p>
          <div className="tw-fila">
            <Link className="btn" to="/carrito">Añadir al carrito</Link>
            <Avisame id={p.id} />
          </div>
          <h3 style={{ marginTop: 22 }}>Qué incluye</h3>
          <ul className="tw-lista">{[...CONTENIDO, ...(formato === 'marco' ? ['Marco para exponerlo'] : [])].map((x) => <li key={x}>{x}</li>)}</ul>
          <h3>Características</h3>
          <table className="tw-tabla"><tbody>
            <tr><th>Nivel</th><td>{p.nivel}</td></tr>
            <tr><th>Cuentas</th><td>{p.cuentas.toLocaleString('es-ES')}</td></tr>
            <tr><th>Tamaño</th><td>{p.ancho} × {p.alto} cuentas</td></tr>
            <tr><th>Placas necesarias</th><td>{placas}</td></tr>
          </tbody></table>
        </div>
      </div>
      {relacionados.length > 0 && (
        <section className="tw-sec">
          <h2>Más de {col.titulo}</h2>
          <div className="tw-rail">{relacionados.map((x) => <ProductoCard key={x.id} p={x} />)}</div>
        </section>
      )}
    </div>
  );
}
