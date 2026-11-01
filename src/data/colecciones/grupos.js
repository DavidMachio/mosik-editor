// Grupos de colecciones que se muestran juntos en Inicio, cada uno con su logo en la esquina.
// «colecciones» son slugs de index.js (de la más antigua a la más reciente; en Inicio la última sale la primera).
// Un grupo sin colecciones no se muestra. Para el siguiente (p. ej. Super Mario) basta con añadirlo aquí.
export const GRUPOS = [
  {
    slug: 'pokemon',
    titulo: 'Pokémon',
    texto: 'Líneas evolutivas completas en cuentas. Una colección nueva cada cierto tiempo.',
    logo: '/colecciones/pokemon/logo.png',
    logoAlt: 'Pokémon',
    colecciones: ['evoluciones', 'evoluciones-planta', 'evoluciones-fuego', 'evoluciones-agua'],
  },
  {
    slug: 'super-mario',
    titulo: 'Super Mario',
    texto: 'Mario y Bowser en cuentas: tres diseños de cada uno.',
    logo: '/colecciones/super-mario/logo.png',
    logoAlt: 'Super Mario',
    colecciones: ['mario', 'bowser'],
  },
];
