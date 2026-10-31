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

## designs (pendiente)
- `creatorId` (usuario que lo creó) y `collectionId` (opcional: hay diseños sueltos de usuarios).
- `title`, `description`, **`tags`** (lista de palabras en minúsculas para buscar), `public`, `likesCount`.
- Tablero: tipo de placa y número de placas; gama (`midi` o `mini`); cuadrícula de colores; imagen de vista previa.
- Índice de texto sobre `title`, `tags` y `description` para la búsqueda por palabras clave.

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
