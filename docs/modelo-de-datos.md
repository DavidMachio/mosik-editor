# Modelo de datos · base de datos `mosik` (MongoDB Atlas)

MongoDB no obliga a una estructura fija: se pueden añadir campos nuevos cuando haga falta.
Lo único delicado es **cambiar el significado de un campo que ya tiene datos**.
Estado: `users` está hecho; el resto es el diseño acordado, todavía sin programar.

## users (hecho)

| Campo | Notas |
|---|---|
| `email`, `emailLower` | Único (índice sobre `emailLower`). |
| `username`, `usernameLower` | Único, 3–20 caracteres (letras, números, `.` y `_`). Nombres reservados: admin, mosik, etc. |
| `passwordHash` | scrypt con sal. Nunca se devuelve al navegador. |
| `role` | `admin`, `userFree` (gratuito) o `userPaid` (de pago). Nuevos usuarios: `userFree`. El paso a `userPaid` es manual mientras no haya cobro. Las primeras cuentas pueden tener `free`/`paid`: la API las trata como `userFree`/`userPaid`. |
| `favoritos` | Marcador personal: lista de ids de diseños que la persona guarda en su perfil para tenerlos de referencia, hacerlos más adelante o tenerlos a mano. Para pintarlos se buscan esos ids en `designs` (`_id: { $in: favoritos }`). Se añaden con `$addToSet` y se quitan con `$pull`. No tiene nada que ver con los me gusta. |
| `createdAt` | Fecha de alta. |
| (futuro) | Nombre visible, avatar, descripción, consentimiento de boletín. |

## sessions (hecho)
`tokenHash` (único), `userId`, `createdAt`, `expiresAt` (se borra sola al caducar, 30 días). En la cookie va solo el token; en la base de datos, su hash.

## authAttempts (hecho)
Intentos fallidos de entrada por correo o usuario. Se borran solos a los 15 minutos. Con 8 fallos se bloquea temporalmente.

## designs (hecho)
| Campo | Notas |
|---|---|
| `ownerId`, `ownerUsername`, `ownerUsernameLower` | Quién lo creó (el nombre se copia para listar sin consultar usuarios). |
| `title`, `description` | Título de 3 a 80 caracteres; descripción de hasta 500. |
| `tags` | Hasta 10 etiquetas en minúsculas (2 a 24 caracteres, sin espacios: se convierten en guiones). |
| `isPublic` | `false` por defecto: solo lo ve su dueño (y los administradores). Si es `true`, sale en la galería. |
| `collectionId` | Reservado (`null`): lo usarán las colecciones. |
| `cols`, `rows`, `beads`, `colors`, `gama` | Tamaño, número de cuentas, de colores y gama (`mini`, `midi` o `mixta`), calculados por el servidor. |
| `data` | La cuadrícula en formato compacto: `{ v, cols, rows, pw, ph, pr, pc, palette, rle }` (ver `shared/designCodec.js`). Un diseño de 200 × 200 pasa de unos 210 KB a unos 10 KB. |
| `preview` | Imagen PNG pequeña (data URL, máximo 150 KB). Se sirve como imagen en `/api/designs/ID?preview=1`. |
| `likesCount` | Contador del corazón (todavía sin usar). |
| `createdAt`, `updatedAt` | Fechas. |

Índices: (`ownerId`, `createdAt`), (`isPublic`, `createdAt`), `tags` y un índice de texto sobre título (peso 5), etiquetas (peso 8) y descripción, en español, para la búsqueda por palabras clave.
Límite: 100 diseños por persona (los administradores no tienen límite).

### Rutas de la API
- `GET /api/designs` · lista pública. Filtros: `q` (palabras), `tag`, `owner`, `page`, `limit` (máx. 48). `mine=1` devuelve los diseños de la persona con sesión, incluidos los privados.
- `POST /api/designs` · crea un diseño (hace falta sesión).
- `GET /api/designs/ID` · ficha con la cuadrícula. Si es privado, solo para su dueño o un administrador (para el resto, 404).
- `GET /api/designs/ID?preview=1` · la imagen de vista previa.
- `PATCH /api/designs/ID` · edita título, descripción, etiquetas, visibilidad o el propio diseño (solo el dueño o un administrador).
- `DELETE /api/designs/ID` · borra el diseño (solo el dueño o un administrador).

### Límite de funciones en Vercel
El plan gratuito (Hobby) admite **12 funciones** por despliegue. Ahora hay 7 (`health`, 4 de usuarios y 2 de diseños). Las rutas de diseños se agrupan en dos archivos a propósito. Para las próximas (me gusta, avisos, colecciones, favoritos) conviene seguir agrupando con un parámetro (`?accion=`) en vez de crear un archivo por ruta.

## collections (pendiente)
`name`, `year`, `color`, `tags`, `designIds` o relación inversa desde `designs.collectionId`.

## Favoritos
Van dentro de cada usuario (campo `favoritos`, ver arriba). Son privados y no cuentan para nadie más.

## Me gusta (pendiente)
El corazón de un diseño. Es público: suma 1 al contador del diseño.
- `designs.likesCount`: contador del diseño.
- Colección `likes`: `designId`, `userId` (quien lo da), `ownerId` (creador del diseño), `createdAt`. Índice único (`designId`, `userId`): una persona, un me gusta por diseño. Índice por `ownerId` para ver los me gusta de mis diseños.
- Dar me gusta: se inserta la fila y, solo si se ha insertado, `likesCount` +1. Quitarlo: se borra la fila y, solo si se ha borrado, `likesCount` −1. Así el contador no se descuadra aunque se pulse dos veces seguidas.

## Notificaciones (pendiente)
Colección `notifications`: `userId` (destinatario), `type` (`like`; más tipos después), `designId`, `fromUserId`, `createdAt`, `readAt` (vacío si no se ha leído).
- Al dar me gusta se avisa al creador del diseño, salvo que sea la misma persona.
- Un único aviso por persona y diseño (índice único `userId`, `type`, `designId`, `fromUserId`), para que dar y quitar el corazón no llene la bandeja.
- El aviso enseña quién fue y enlaza a su perfil. El creador también podrá ver la lista de quién ha dado me gusta a cada diseño.
- Por decidir: cuánto tiempo se conservan los avisos antiguos (por ejemplo 90 días).

## products y stock (pendiente)
- `products`: código (`MSK-DISEÑO-TAMAÑO-FORMATO`), tipo (patrón, kit, pack, material), precio, diseño asociado. La compra sigue sin activarse.
- `stock`: cantidad de cuentas por color y gama, con umbral de aviso.

## Pendiente de decidir
- Servicio de correo (restablecer contraseña, enviar patrones gratis).
- Registro rápido al pedir un patrón gratis (contraseña aleatoria + sesión automática), cuando existan los patrones.
