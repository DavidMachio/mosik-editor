// Luchadores con sus movimientos (generados por scripts/luchadores/construir.py: no editar a mano los JSON).
import ryu from './ryu.json';
import e_honda from './e-honda.json';
import blanka from './blanka.json';
import guile from './guile.json';
import ken from './ken.json';
import chun_li from './chun-li.json';
import zangief from './zangief.json';
import dhalsim from './dhalsim.json';
import t_hawk from './t-hawk.json';
import fei_long from './fei-long.json';
import dee_jay from './dee-jay.json';
import cammy from './cammy.json';
import balrog from './balrog.json';
import vega from './vega.json';
import sagat from './sagat.json';
import m_bison from './m-bison.json';

export const LUCHADORES = { 'ryu': ryu, 'e-honda': e_honda, 'blanka': blanka, 'guile': guile, 'ken': ken, 'chun-li': chun_li, 'zangief': zangief, 'dhalsim': dhalsim, 't-hawk': t_hawk, 'fei-long': fei_long, 'dee-jay': dee_jay, 'cammy': cammy, 'balrog': balrog, 'vega': vega, 'sagat': sagat, 'm-bison': m_bison };
// Movimientos que ya tienen colección con ficha: «luchador/movimiento» -> slug de la colección
export const FICHAS = { 'ryu/reposo': 'ryu-reposo' };
export const luchadorPorId = (id) => LUCHADORES[id];
