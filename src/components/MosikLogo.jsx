// Logo "Mosik" (opción B del libro de marca: la i lleva la cuenta hueca).
// Trazados tomados de 03_Marca/Logo-vectorial (Mosik_fondo-claro.svg).
// Las letras usan currentColor para seguir el tema claro/oscuro; la cuenta es siempre naranja de marca.
export default function MosikLogo({ className = '', height = 28 }) {
  return (
    <svg
      className={className}
      viewBox="72 -843 2484 854"
      height={height}
      width={(height * 2484) / 854}
      role="img"
      aria-label="Mosik"
      focusable="false"
    >
      <g fill="currentColor">
        <path d="M72 0V-703H168L425 -291L682 -703H778V0H643V-419L471 -144H379L208 -420V0Z" />
        <path d="M1115 10Q1042 10 983.5 -23.5Q925 -57 890.5 -114Q856 -171 856 -243Q856 -313 890 -370Q924 -427 982.5 -460.5Q1041 -494 1114 -494Q1187 -494 1246 -460.5Q1305 -427 1339 -370.5Q1373 -314 1373 -243Q1373 -171 1339 -113.5Q1305 -56 1246.5 -23Q1188 10 1115 10ZM1114 -112Q1170 -112 1204.5 -148.5Q1239 -185 1239 -242Q1239 -299 1204 -335Q1169 -371 1114 -371Q1060 -371 1025 -334.5Q990 -298 990 -242Q990 -185 1025 -148.5Q1060 -112 1114 -112Z" />
        <path d="M1603 11Q1540 11 1484.5 -12.5Q1429 -36 1393 -78L1471 -157Q1521 -101 1602 -101Q1667 -101 1667 -137Q1667 -157 1649.5 -168Q1632 -179 1604 -186.5Q1576 -194 1545 -203.5Q1514 -213 1486.5 -228.5Q1459 -244 1441.5 -271.5Q1424 -299 1424 -343Q1424 -412 1474 -453.5Q1524 -495 1610 -495Q1670 -495 1718.5 -474Q1767 -453 1799 -411L1720 -332Q1698 -359 1670.5 -371Q1643 -383 1611 -383Q1551 -383 1551 -349Q1551 -331 1568.5 -321Q1586 -311 1613.5 -303.5Q1641 -296 1672 -286.5Q1703 -277 1730.5 -260.5Q1758 -244 1775.5 -215.5Q1793 -187 1793 -143Q1793 -71 1742 -30Q1691 11 1603 11Z" />
        <path d="M1861 0V-483H1992V0Z" />
        <path d="M2088 0V-723H2219V-261L2395 -483H2546L2356 -253L2556 0H2396L2219 -235V0Z" />
      </g>
      <circle className="mosik-logo__bead" cx="1926.5" cy="-698" r="102.5" fill="none" stroke="#F67214" strokeWidth="85" />
    </svg>
  );
}
