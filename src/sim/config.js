// SIMULADOR DE CUENTA — provisional mientras la base de datos esté congelada.
// Cuando se descongele: pon SIMULADOR_ACTIVO en false (la barra desaparece y el nivel sale de la sesión real)
// y, ya sin uso, borra la carpeta src/sim/ y sus importaciones (busca «sim/» en src/).
export const SIMULADOR_ACTIVO = true;
export const NIVEL_INICIAL = 'paid'; // 'sin' | 'free' | 'paid'
