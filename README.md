# Mosik Beads · Web y herramienta de diseño

Aplicación React (Vite) con dos páginas:

- `/` · Inicio
- `/herramienta` · Herramienta de diseño (editor de rejilla de cuentas)

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
    EditorMarkup.jsx          marcado del editor (JSX)
    initEditor.js             lógica del editor (se ejecuta al abrir la página)
    editor.css                estilos del editor, acotados a .mk-editor
  styles/tokens.css           colores, tipografías y esquinas de la marca (claro y oscuro)
  styles/global.css           base, botón principal, tarjetas
```

## Despliegue

Vercel construye el proyecto con `vercel.json` (Vite, salida en `dist/`, y todas las rutas apuntan a `index.html`).

## Notas

- El editor es el mismo código del test del 31 oct 2026; se ha movido a React sin cambiar su comportamiento.
  Siguiente paso previsto: ir partiéndolo en componentes y hooks.
- No se usa `React.StrictMode` a propósito: `initEditor` engancha eventos sobre el DOM.
- Colores y medidas de cuentas del editor: aproximados, pendientes de contrastar con el catálogo.
