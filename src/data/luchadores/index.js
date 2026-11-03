// Luchadores con sus movimientos (generados por scripts/luchadores/construir.py: no editar a mano los JSON).
import ryu from './ryu.json';

export const LUCHADORES = { ryu };
// Movimientos que ya tienen colección con ficha: «luchador/movimiento» -> slug de la colección
export const FICHAS = { 'ryu/reposo': 'ryu-reposo' };
export const luchadorPorId = (id) => LUCHADORES[id];
