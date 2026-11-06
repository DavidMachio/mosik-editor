import { useSearchParams } from 'react-router-dom';
import { PRODUCTOS, coleccionesTienda } from '../data/tienda.js';
import ProductoCard, { ColeccionTarjeta } from './ProductoCard.jsx';
import './tienda.css';

const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function Buscar() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get('q') || '';
  const n = norm(q);
  const prods = n ? PRODUCTOS.filter((p) => norm(`${p.nombre} ${p.coleccion} ${p.fase}`).includes(n)) : [];
  const cols = n ? coleccionesTienda().filter((c) => norm(`${c.titulo} ${c.texto}`).includes(n)) : [];
  return (
    <div className="container tw">
      <h1 className="tw-h1">Buscar</h1>
      <form className="tw-buscar" role="search" onSubmit={(e) => e.preventDefault()}>
        <input type="search" aria-label="Buscar kits y colecciones" placeholder="Kits y colecciones" value={q} onChange={(e) => setSp(e.target.value ? { q: e.target.value } : {})} />
      </form>
      {n && !prods.length && !cols.length && <p className="muted">Sin resultados para «{q}».</p>}
      {cols.length > 0 && <div className="tw-grid tw-grid--2">{cols.map((c) => <ColeccionTarjeta key={c.slug} col={c} />)}</div>}
      {prods.length > 0 && <div className="tw-sec tw-grid">{prods.map((p) => <ProductoCard key={p.id} p={p} />)}</div>}
    </div>
  );
}
