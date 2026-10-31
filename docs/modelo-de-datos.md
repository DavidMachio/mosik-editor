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
| `role` | `admin`, `free` (gratuito) o `paid` (de pago). Nuevos usuarios: `free`. El paso a `paid` es manual mientras no haya cobro. |
| `createdAt` | Fecha de alta. |
| (futuro) | Nombre visible, avatar, descripción, consentimiento de boletín. |

## sessions (hecho)
`tokenHash` (único), `userId`, `createdAt`, `expiresAt` (se borra sola al caducar, 30 días). En la cookie va solo el token; en la base de datos, su hash.

## authAttempts (hecho)
Intentos fallidos de entrada por correo o usuario. Se borran solos a los 15 minutos. Con 8 fallos se bloquea temporalmente.

## designs (pendiente)
- `creatorId` (usuario que lo creó) y `collectionId` (opcional: hay diseños sueltos de usuarios).
- `title`, `description`, **`tags`** (lista de palabras en minúsculas para buscar), `public`.
- Tablero: tipo de placa y número de placas; gama (`midi` o `mini`); cuadrícula de colores; imagen de vista previa.
- Índice de texto sobre `title`, `tags` y `description` para la búsqueda por palabras clave.

## collections (pendiente)
`name`, `year`, `color`, `tags`, `designIds` o relación inversa desde `designs.collectionId`.

## favorites (pendiente)
Una fila por favorito: `userId`, `designId`, `createdAt`. Índice único sobre (`userId`, `designId`).
Va aparte (y no dentro del usuario) para poder contar "me gusta" y construir la comunidad sin rehacer nada.

## products y stock (pendiente)
- `products`: código (`MSK-DISEÑO-TAMAÑO-FORMATO`), tipo (patrón, kit, pack, material), precio, diseño asociado. La compra sigue sin activarse.
- `stock`: cantidad de cuentas por color y gama, con umbral de aviso.

## Pendiente de decidir
- Servicio de correo (restablecer contraseña, enviar patrones gratis).
- Registro rápido al pedir un patrón gratis (contraseña aleatoria + sesión automática), cuando existan los patrones.
