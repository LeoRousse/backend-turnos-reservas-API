# Backend de turnos y reservas con Node.js, Express y MongoDB

## Descripción

API REST para gestionar servicios, reservas y mensajes usando Express y MongoDB/Mongoose.

La aplicación se organiza en capas para separar responsabilidades:

- `src/routes`: define los routers y endpoints.
- `src/controllers`: procesa las solicitudes y prepara respuestas.
- `src/services`: contiene la lógica de negocio y validaciones.
- `src/repositories`: abstrae el acceso a datos.
- `src/dao`: implementa la persistencia con Mongoose.
- `src/models`: define los esquemas de MongoDB.

## Tecnologías

- Node.js
- Express
- MongoDB con Mongoose
- dotenv
- Módulos ES (`type: module`)

## Requisitos

- Node.js 18+ instalado
- MongoDB accesible (Atlas o instancia local)

## Instalación

1. Clona el repositorio:

```bash
git clone <repositorio>
cd backend-turnos-reservas-API
```

2. Instala dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz con estas variables:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=mongodb+srv://usuario:clave@cluster.mongodb.net/tu-base?retryWrites=true&w=majority
```

4. Inicia la aplicación:

```bash
npm start
```

5. Para desarrollo con recarga automática:

```bash
npm run dev
```

## Configuración

- `src/config/env.config.js`: carga variables de entorno.
- `src/config/database.config.js`: conecta a MongoDB usando Mongoose.

## Endpoints

### Servicios

Base: `/api/services`

- `GET /api/services`
  - Obtiene todos los servicios.
  - Query opcionales:
    - `category`: filtra por categoría.
    - `available`: filtra por disponibilidad (`true` o `false`).

- `GET /api/services/:sid`
  - Obtiene un servicio por su id.

- `POST /api/services`
  - Crea un servicio.
  - Body JSON obligatorio:

```json
{
  "name": "Corte de pelo",
  "description": "Corte de cabello completo",
  "duration": 45,
  "price": 2500,
  "category": "peluqueria",
  "available": true
}
```

- `PUT /api/services/:sid`
  - Actualiza los campos de un servicio existente.

- `DELETE /api/services/:sid`
  - Elimina un servicio por su id.

### Reservas

Base: `/api/bookings`

- `POST /api/bookings`
  - Crea una reserva.
  - Body JSON obligatorio:

```json
{
  "clientName": "Juan Pérez",
  "clientEmail": "juan@example.com",
  "date": "2026-08-01",
  "time": "14:30",
  "status": "pending",
  "services": []
}
```

- `GET /api/bookings/:bid`
  - Obtiene una reserva por su id.

- `POST /api/bookings/:bid/services/:sid`
  - Agrega un servicio existente a una reserva.
  - Si el servicio ya está en la reserva, incrementa su `quantity`.

### Mensajes

Base: `/api/messages`

- `GET /api/messages`
  - Obtiene todos los mensajes.

- `GET /api/messages/:mid`
  - Obtiene un mensaje por su id.

- `POST /api/messages`
  - Crea un mensaje.
  - Body JSON obligatorio:

```json
{
  "sender": "Remitente",
  "recipient": "Destinatario",
  "subject": "Asunto opcional",
  "content": "Contenido del mensaje"
}
```

- `DELETE /api/messages/:mid`
  - Elimina un mensaje por su id.

## Validaciones principales

### Servicios

- `name`: cadena no vacía.
- `description`: cadena no vacía.
- `duration`: número positivo.
- `price`: número mayor o igual a cero.
- `category`: cadena no vacía.
- `available`: booleano.

### Reservas

- `clientName`: cadena no vacía.
- `clientEmail`: email válido.
- `date`: cadena no vacía.
- `time`: cadena no vacía.
- `status`: cadena no vacía.
- `services`: arreglo opcional de objetos `{ service, quantity }`.
- `quantity`: entero positivo.

### Mensajes

- `sender`: cadena no vacía.
- `recipient`: cadena no vacía.
- `content`: cadena no vacía.
- `subject`: opcional.

## Códigos de respuesta

- `201`: recurso creado.
- `200`: operación exitosa.
- `400`: error de validación o body inválido.
- `404`: recurso no encontrado.

## Notas

- El `id` se genera internamente y no debe enviarse en los `POST`.
- La aplicación usa MongoDB vía Mongoose; no hay persistencia en archivos JSON en la versión actual.
- El servidor escucha en el puerto definido por `PORT`.
