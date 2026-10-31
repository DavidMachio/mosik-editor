// Codificación compacta de la cuadrícula de un diseño. La usan el servidor (api/) y la web (src/).
// Una cuadrícula de 240 × 240 con colores planos pasa de cientos de KB a unos pocos.
//
//   grid:    [[null, 'A10', 'A10', ...], ...]          (filas × columnas)
//   palette: ['A10', 'S56', ...]                        (códigos distintos)
//   rle:     [índice, repeticiones, índice, ...]        (-1 = casilla vacía), recorriendo fila a fila

export function encodeGrid(grid) {
  const palette = [];
  const index = new Map();
  const rle = [];
  let prev = null;
  let count = 0;
  for (const row of grid) {
    for (const cell of row) {
      let v = -1;
      if (cell) {
        if (!index.has(cell)) {
          index.set(cell, palette.length);
          palette.push(cell);
        }
        v = index.get(cell);
      }
      if (v === prev) count += 1;
      else {
        if (prev !== null) rle.push(prev, count);
        prev = v;
        count = 1;
      }
    }
  }
  if (prev !== null) rle.push(prev, count);
  return { palette, rle };
}

export function decodeGrid({ palette, rle }, cols, rows) {
  const flat = [];
  for (let i = 0; i < rle.length; i += 2) {
    const value = rle[i] === -1 ? null : palette[rle[i]];
    for (let k = 0; k < rle[i + 1]; k += 1) flat.push(value);
  }
  const grid = [];
  for (let y = 0; y < rows; y += 1) grid.push(flat.slice(y * cols, (y + 1) * cols));
  return grid;
}
