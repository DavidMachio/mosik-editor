// Iconos propios de Mosik Beads (galería: «Iconos de la herramienta»).
// Rejilla 24 × 24, trazo de 1,75, extremos redondeados y sin color propio: heredan el color del texto (currentColor),
// así funcionan igual en el tema claro y en el oscuro. Los iconos solo con icono deben llevar aria-label o título.
const PATHS = {
  "mover": "<path d=\"M12 3v18M3 12h18\"/><path d=\"M9.5 5.5L12 3l2.5 2.5M9.5 18.5L12 21l2.5-2.5M5.5 9.5L3 12l2.5 2.5M18.5 9.5L21 12l-2.5 2.5\"/>",
  "pincel": "<path d=\"M20 4l-8.5 8.5\"/><path d=\"M14.5 7.5l2 2\"/><path d=\"M10.2 11.2c-2.4-.4-4.4 1-4.6 3.4-.1 1.4-.8 2.6-2.1 3.4 3.6.9 7.3-.1 8.4-3.3.5-1.4.2-2.7-.8-3.5\"/>",
  "borrador": "<path d=\"M4.6 14.4l8-8a2 2 0 0 1 2.8 0l3.2 3.2a2 2 0 0 1 0 2.8l-7 7H7.5l-2.9-2.9a2 2 0 0 1 0-2.9z\"/><path d=\"M9.5 9.5l5 5M11.5 19.5H20\"/>",
  "bote": "<path d=\"M5.5 11.5l6-6 7 7-5.8 5.8a2 2 0 01-2.8 0l-4.4-4.4a2 2 0 010-2.9z\"/><path d=\"M5.5 11.5h13M9.5 5.5L8 4\"/><path d=\"M20.5 15.5c.9 1.3 1.5 2.1 1.5 2.9a1.5 1.5 0 01-3 0c0-.8.6-1.6 1.5-2.9z\"/>",
  "cuentagotas": "<path d=\"M17.8 2.8a2.1 2.1 0 013 3l-1.6 1.6-3-3 1.6-1.6z\"/><path d=\"M14.7 6.9l3 3\"/><path d=\"M16.5 8.8l-9.4 9.4V21h2.8l9.4-9.4\"/>",
  "imagen-color": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"8\" cy=\"8.5\" r=\"1.5\"/><path d=\"M3 17l5.5-4.5 4 3.5\"/><path d=\"M16.5 8l.9 1.9 1.9.9-1.9.9-.9 1.9-.9-1.9-1.9-.9 1.9-.9z\"/>",
  "deshacer": "<path d=\"M9 14L4 9l5-5\"/><path d=\"M4 9h10a6 6 0 010 12h-3\"/>",
  "rehacer": "<path d=\"M15 14l5-5-5-5\"/><path d=\"M20 9H10a6 6 0 000 12h3\"/>",
  "vaciar": "<path d=\"M4 7h16M9 7V4.5h6V7\"/><path d=\"M6 7l1 13h10l1-13\"/><path d=\"M10 11v6M14 11v6\"/>",
  "acercar": "<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M16.2 16.2L21 21M11 8v6M8 11h6\"/>",
  "alejar": "<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M16.2 16.2L21 21M8 11h6\"/>",
  "tablero": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 9h18M3 15h18M9 3v18M15 3v18\"/>",
  "capas": "<path d=\"M12 3L3 8l9 5 9-5-9-5z\"/><path d=\"M3 12.5l9 5 9-5\"/><path d=\"M3 17l9 5 9-5\"/>",
  "guias": "<path d=\"M3 9h18M3 15h18M9 3v18M15 3v18\" stroke-dasharray=\"2 2.6\"/><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/>",
  "tamano": "<path d=\"M15 4h5v5M9 20H4v-5M20 4l-6.5 6.5M4 20l6.5-6.5\"/>",
  "imagen": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/><circle cx=\"9\" cy=\"9.5\" r=\"1.6\"/><path d=\"M3 17l5.5-4.5 4 3 3-2.5L21 17\"/>",
  "imagen-subir": "<path d=\"M13 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-6\"/><circle cx=\"8.5\" cy=\"9.5\" r=\"1.5\"/><path d=\"M3 17l5-4 4 3 3-2.5\"/><path d=\"M19 2v6M16 5h6\"/>",
  "imagen-quitar": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/><circle cx=\"9\" cy=\"9.5\" r=\"1.6\"/><path d=\"M3 17l5.5-4.5 2.5 2M4.5 4.5l15 15\"/>",
  "opacidad": "<path d=\"M12 3.5c3.2 4 6.5 6.7 6.5 10.4a6.5 6.5 0 11-13 0C5.5 10.2 8.8 7.5 12 3.5z\"/><path d=\"M5.8 14h12.4\"/>",
  "ver": "<path d=\"M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>",
  "ocultar": "<path d=\"M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M4 4l16 16\"/>",
  "bloquear": "<rect x=\"5\" y=\"11\" width=\"14\" height=\"10\" rx=\"2\"/><path d=\"M8 11V8a4 4 0 018 0v3\"/>",
  "desbloquear": "<rect x=\"5\" y=\"11\" width=\"14\" height=\"10\" rx=\"2\"/><path d=\"M8 11V8a4 4 0 017.6-1.7\"/>",
  "girar-izq": "<path d=\"M4 12a8 8 0 108-8 8 8 0 00-5.7 2.4L4 9\"/><path d=\"M4 4v5h5\"/>",
  "girar-der": "<path d=\"M20 12a8 8 0 11-8-8 8 8 0 015.7 2.4L20 9\"/><path d=\"M20 4v5h-5\"/>",
  "voltear": "<path d=\"M12 3v18\" stroke-dasharray=\"2 2.6\"/><path d=\"M8.5 7L3.5 17h5V7z\"/><path d=\"M15.5 7l5 10h-5V7z\"/>",
  "vista-cuentas": "<circle cx=\"12\" cy=\"12\" r=\"8\"/><circle cx=\"12\" cy=\"12\" r=\"2.8\"/>",
  "vista-pixeles": "<rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"1.5\"/><path d=\"M4 12h16M12 4v16\"/>",
  "leer": "<path d=\"M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3\"/><path d=\"M7.5 12h9\"/>",
  "paleta": "<path d=\"M12 3a9 9 0 100 18c1.2 0 2-.8 2-1.8 0-.5-.2-.9-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1 .8-1.6 1.8-1.6H17a4 4 0 004-4c0-4.4-4-8-9-8z\"/><circle cx=\"7.5\" cy=\"11.5\" r=\".9\"/><circle cx=\"10\" cy=\"7.5\" r=\".9\"/><circle cx=\"15\" cy=\"7.5\" r=\".9\"/>",
  "gamas": "<rect x=\"3\" y=\"5.5\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M9 5.5v13M15 5.5v13\"/>",
  "rellenar": "<path d=\"M4.5 19.5l10-10\"/><path d=\"M13 8l3 3\"/><path d=\"M17 3v4M15 5h4M20 12v3M18.5 13.5h3\"/>",
  "reducir": "<path d=\"M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7\"/>",
  "grises": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 3a9 9 0 000 18z\" fill=\"currentColor\"/>",
  "cambiar-gama": "<path d=\"M4 8h14M14 4l4 4-4 4M20 16H6M10 12l-4 4 4 4\"/>",
  "mas": "<path d=\"M12 5v14M5 12h14\"/>",
  "menos": "<path d=\"M5 12h14\"/>",
  "recalcular": "<path d=\"M20 11a8 8 0 00-14-4.5L4 9M4 4v5h5M4 13a8 8 0 0014 4.5L20 15M20 20v-5h-5\"/>",
  "descargar": "<path d=\"M12 4v11M7.5 11L12 15.5 16.5 11M5 20h14\"/>",
  "png": "<path d=\"M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z\"/><path d=\"M14 3v5h5\"/><circle cx=\"10\" cy=\"13\" r=\"1.3\"/><path d=\"M7.5 18.5l3-3 2 1.5 2-2 2 2.5\"/>",
  "guardar-json": "<path d=\"M5 3h11l4 4v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z\"/><path d=\"M7 3v5h8V3M7 21v-7h10v7\"/>",
  "cargar-json": "<path d=\"M3 6.5A1.5 1.5 0 014.5 5H9l2 2.5h8.5A1.5 1.5 0 0121 9v8.5a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.5v-11z\"/><path d=\"M12 17v-6M9.5 13.5L12 11l2.5 2.5\"/>",
  "csv": "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"M3 10h18M3 14.5h18M9 5v14\"/>",
  "guardar-cuenta": "<path d=\"M7 18a4.5 4.5 0 01-.5-9A6 6 0 0118 10.5 3.8 3.8 0 0117 18H7z\"/><path d=\"M12 15v-4M10 13l2-2 2 2\"/>",
  "cuentas": "<circle cx=\"7\" cy=\"7\" r=\"3\"/><circle cx=\"17\" cy=\"7\" r=\"3\"/><circle cx=\"7\" cy=\"17\" r=\"3\"/><circle cx=\"17\" cy=\"17\" r=\"3\"/>",
  "galeria": "<rect x=\"3\" y=\"3\" width=\"8\" height=\"8\" rx=\"1.5\"/><rect x=\"13\" y=\"3\" width=\"8\" height=\"8\" rx=\"1.5\"/><rect x=\"3\" y=\"13\" width=\"8\" height=\"8\" rx=\"1.5\"/><rect x=\"13\" y=\"13\" width=\"8\" height=\"8\" rx=\"1.5\"/>",
  "usuario": "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21c0-4 3.6-6 8-6s8 2 8 6\"/>",
  "salir": "<path d=\"M9 4H5a1 1 0 00-1 1v14a1 1 0 001 1h4M16 8l4 4-4 4M20 12H9\"/>",
  "sol": "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8\"/>",
  "luna": "<path d=\"M20 14.5A8.5 8.5 0 119.5 4a7 7 0 0010.5 10.5z\"/>",
  "buscar": "<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M16.2 16.2L21 21\"/>",
  "favorito": "<path d=\"M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z\"/>",
  "menu": "<path d=\"M4 7h16M4 12h16M4 17h16\"/>",
  "flecha": "<path d=\"M5 12h14M13 6l6 6-6 6\"/>",
  "cerrar": "<path d=\"M6 6l12 12M18 6L6 18\"/>",
  "aceptar": "<path d=\"M5 12.5l4.5 4.5L19 7.5\"/>",
  "ayuda": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M9.5 9.5a2.5 2.5 0 115 .5c0 1.5-2.5 2-2.5 3.5\"/><path d=\"M12 17h.01\"/>",
  "editar": "<path d=\"M4 20l1-4L16.5 4.5a2 2 0 013 3L8 19l-4 1z\"/><path d=\"M14.5 6.5l3 3\"/>",
};

export default function Icon({ name, size = 20, className = '' }) {
  const paths = PATHS[name];
  if (!paths) return null;
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}
