// Ilustración genérica de producto (caja, contenido, marco, librito) con los colores de la colección.
// NUNCA dibuja el patrón del diseño: las colecciones propias son producto de venta.
export default function Ilustracion({ tema, tipo = 'caja', etiqueta }) {
  const f = tema?.fondo || '#c62828';
  const c = tema?.circulo || '#ef5350';
  const a = tema?.acento || '#fbd22e';
  const B = 'rgba(255,255,255,.92)';
  const dots = [[34, 62], [46, 66], [58, 62], [70, 66], [40, 74], [52, 76], [64, 74]];
  let cuerpo;
  if (tipo === 'contenido') {
    cuerpo = (<>
      <rect x="14" y="52" width="72" height="34" rx="4" fill={B} />
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y - 8} r="4.2" fill={[a, c, f][i % 3]} stroke="rgba(21,7,2,.25)" />)}
      <rect x="22" y="20" width="26" height="22" rx="3" fill="rgba(255,255,255,.55)" />
      <rect x="54" y="26" width="24" height="16" rx="3" fill="rgba(255,255,255,.35)" />
    </>);
  } else if (tipo === 'marco') {
    cuerpo = (<>
      <rect x="18" y="18" width="64" height="64" rx="3" fill={B} />
      <rect x="26" y="26" width="48" height="48" rx="2" fill="rgba(21,7,2,.12)" />
      <circle cx="50" cy="50" r="10" fill={a} opacity=".9" />
    </>);
  } else if (tipo === 'librito') {
    cuerpo = (<>
      <rect x="26" y="16" width="48" height="66" rx="3" fill={B} />
      <rect x="34" y="26" width="32" height="5" rx="2" fill="rgba(21,7,2,.28)" />
      <rect x="34" y="38" width="32" height="3" rx="1.5" fill="rgba(21,7,2,.18)" />
      <rect x="34" y="46" width="24" height="3" rx="1.5" fill="rgba(21,7,2,.18)" />
      <circle cx="50" cy="66" r="6" fill={a} />
    </>);
  } else {
    cuerpo = (<>
      <rect x="16" y="38" width="68" height="44" rx="4" fill={B} />
      <path d="M16 38l8-14h52l8 14z" fill="rgba(255,255,255,.6)" />
      <circle cx="50" cy="60" r="9" fill={a} stroke="rgba(21,7,2,.25)" />
      <circle cx="50" cy="60" r="3.2" fill={f} />
    </>);
  }
  return (
    <div className="tw-ph" style={{ background: `linear-gradient(135deg, ${f}, ${c})` }}>
      <svg viewBox="0 0 100 100" role="img" aria-label={etiqueta || tipo}>{cuerpo}</svg>
    </div>
  );
}
