# Cómo añadir una colección con ficha

1. Crea `scripts/colecciones/<slug>/` con los PNG de los diseños (1 píxel = 1 cuenta, fondo transparente, máx. 26 colores cada uno) y un `meta.json` como el de `evoluciones/`.
2. Ejecuta `python3 scripts/generar-coleccion.py <slug>`. Genera `src/data/colecciones/<slug>.js` y los PNG recortados en `public/colecciones/<slug>/`.
3. Añade el import y la entrada en `src/data/colecciones/index.js`.

El banner de Inicio (el más reciente arriba), la entrada en «Colecciones que vienen» y la página `/colecciones/<slug>` salen solos de esos datos.
