# Mosik Beads · Web y herramienta de diseño

Aplicación React (Vite) con dos páginas:

- `/` · Inicio
- `/herramienta` · Herramienta de diseño (editor de rejilla de cuentas)
- `/registro`, `/entrar`, `/perfil` · Cuentas de usuario (en el perfil, «Mis diseños»)
- `/galeria` · Diseños públicos, con búsqueda por palabras y etiquetas
- `/diseno/:id` · Ficha de un diseño
- `/herramienta?diseno=ID` · Abre un diseño guardado en la herramienta

## Cómo trabajar en local

```
npm install
npm run dev        # servidor local con recarga automática
npm run build      # genera la carpeta dist/
npm run preview    # prueba la versión de producción
```

## Estructura

```
src/
  main.jsx, App.jsx           arranque y rutas
  components/                 Layout (cabecera, pie), MosikLogo
  pages/Home.jsx              inicio
  pages/Herramienta.jsx       página de la herramienta
  pages/herramienta/
    EditorMarkup.jsx          marcado de la herramienta: barra, lienzo y panel con pestañas (los ids no deben cambiarse)
    initEditor.js             lógica del editor (se ejecuta al abrir la página)
    initTabs.js               pestañas del panel y hoja inferior en móvil
    editor.css                estilos de los controles del editor, acotados a .mk-editor
    editor-layout.css         maquetación: escritorio en tres columnas y móvil con hoja inferior
  styles/tokens.css           colores, tipografías y esquinas de la marca (claro y oscuro)
  styles/global.css           base, botón principal, tarjetas
```

## Base de datos (MongoDB Atlas)

1. Copia `.env.example` como `.env` y pon tu cadena de conexión en `MONGODB_URI`. El `.env` no se sube a GitHub.
2. `npm install` y luego `npm run db:check` para probar la conexión desde tu ordenador.
3. En Vercel, `MONGODB_URI` va en Settings → Environment Variables.
4. Una vez desplegado, `/api/health` responde `{"ok":true,...}` si la web llega a la base de datos.

El código del servidor vive en `api/` (funciones de Vercel). La base de datos se llama `mosik`.
Modelo de datos y estado de cada colección: `docs/modelo-de-datos.md`.

Rutas de diseños: `GET/POST /api/designs`, `GET/PATCH/DELETE /api/designs/:id` (detalle en `docs/modelo-de-datos.md`).
Rutas de usuarios: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`.
Las rutas `/api` solo funcionan una vez desplegadas en Vercel (`npm run dev` no las sirve).

## Despliegue

Vercel construye el proyecto con `vercel.json` (Vite, salida en `dist/`, y todas las rutas apuntan a `index.html`).

## Notas

- El editor es el mismo código del test del 31 oct 2026; se ha movido a React sin cambiar su comportamiento.
  Siguiente paso previsto: ir partiéndolo en componentes y hooks.
- No se usa `React.StrictMode` a propósito: `initEditor` engancha eventos sobre el DOM.
- Colores y medidas de cuentas del editor: aproximados, pendientes de contrastar con el catálogo.

## Tienda y simulador de cuenta (provisional)

- Tienda, colecciones como producto, planes, tutoriales y Mi cuenta viven en `src/tienda/`; los productos salen de `src/data/colecciones` (`src/data/tienda.js`). Precios y textos son provisionales.
- La herramienta (`src/pages/Herramienta.jsx` y `src/pages/herramienta/`) no se ha modificado.
- `src/sim/`: simulador de tipo de cuenta (sin cuenta / free / paid). Se quita poniendo `SIMULADOR_ACTIVO = false` en `src/sim/config.js` cuando se descongele la base de datos.
- Los diseños y perfiles de muestra (usuarios ficticios) se han eliminado. La tienda usa `src/data/tienda-catalogo.js`, una versión ligera de las colecciones: regenerarla con `node scripts/generar-catalogo-tienda.mjs` al añadir o cambiar una colección. Las páginas pesadas (colección, grupo, luchador, montaje, herramienta) se cargan solo al entrar en ellas.
