# Mosik Beads · Herramienta de diseño

Prueba de la herramienta de diseño propio (fase 08 del proyecto Negocio Hamas).

## Qué hace (versión de prueba)
- La persona sube una imagen y elige el tamaño del tablero.
- Se muestra una rejilla de cuentas con la imagen detrás (opacidad ajustable).
- Se rellenan los colores a mano.

## Cómo probarla en local
Abre `index.html` en el navegador, o usa la extensión Live Server de Visual Studio Code.

## Despliegue
Proyecto estático: Vercel lo publica tal cual, sin configuración (Framework Preset: Other).

## Plan
Este repositorio es provisional. Cuando exista la web (06_Web/web-hama), la herramienta se integrará
como una ruta de la misma web para compartir dominio, cuentas y sistema de diseño.
Por eso el código vive en `herramienta/` y no depende de la página que lo contiene.

## Estructura
- `index.html`: página de prueba que carga la herramienta.
- `herramienta/`: código de la herramienta (módulo independiente).
