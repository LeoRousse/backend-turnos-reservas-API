# API inicial de servicios y reservas con FileSystem

## Objetivo

Crear una API REST simple con Express y persistencia en archivos JSON para gestionar servicios y reservas.

## Descripción

Esta aplicación ofrece una API básica para:

- gestionar servicios (`services`)
- gestionar reservas (`bookings`)
- almacenar datos en archivos JSON en `src/data`

La aplicación ahora sigue una arquitectura en capas para separar responsabilidades:

- `router` define los endpoints y delega en el controller.
- `controller` recibe `req`, llama al service y responde con `res`.
- `service` contiene la lógica de negocio.
- `repository` ofrece acceso a datos sin reglas de negocio.
- `dao` lee y escribe directamente en los archivos JSON.

## Tecnologías

- Node.js
- Express
- dotenv
- Módulos ES (`type: module`)

## Instalación

1. Clona el repositorio o descarga el proyecto.
2. Ejecuta:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz con estas variables:

```env
PORT=8080
NODE_ENV=development
```

4. Inicia el servidor:

```bash
npm start
```

## Estructura relevante

- `src/server.js`: arranca el servidor Express.
- `src/app.js`: configura Express y monta las rutas.
- `src/routes/services.router.js`: define los endpoints de `services`.
- `src/routes/bookings.router.js`: define los endpoints de `bookings`.
- `src/controllers/services.controller.js`: procesa `req` y responde para `services`.
- `src/controllers/bookings.controller.js`: procesa `req` y responde para `bookings`.
- `src/services/services.service.js`: contiene la lógica de negocio para servicios.
- `src/services/bookings.service.js`: contiene la lógica de negocio para reservas y la regla de `quantity`.
- `src/repositories/services.repository.js`: expone operaciones de acceso para servicios.
- `src/repositories/bookings.repository.js`: expone operaciones de acceso para reservas.
- `src/dao/services.dao.js`: lee y escribe `src/data/services.json`.
- `src/dao/bookings.dao.js`: lee y escribe `src/data/bookings.json`.

## Endpoints de `services`

Base: `/api/services`

### Obtener todos los servicios

- Método: `GET`
- Ruta: `/api/services`
- Query opcionales:
  - `category`: filtra por categoría.
  - `available`: filtra por disponibilidad (`true` o `false`).

Ejemplo:

```bash
curl "http://localhost:8080/api/services?category=peluqueria&available=true"
```

### Obtener un servicio por id

- Método: `GET`
- Ruta: `/api/services/:sid`

### Crear un servicio

- Método: `POST`
- Ruta: `/api/services`
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

Ejemplo:

```bash
curl -X POST http://localhost:8080/api/services \
  -H "Content-Type: application/json" \
  -d '{"name":"Corte de pelo","description":"Corte de cabello completo","duration":45,"price":2500,"category":"peluqueria","available":true}'
```

### Actualizar un servicio

- Método: `PUT`
- Ruta: `/api/services/:sid`
- Body JSON con los campos a actualizar:

```json
{
  "name": "Corte de pelo premium",
  "description": "Corte de cabello completo con styling",
  "duration": 60,
  "price": 3200,
  "category": "peluqueria",
  "available": true
}
```

### Eliminar un servicio

- Método: `DELETE`
- Ruta: `/api/services/:sid`

## Endpoints de `bookings`

Base: `/api/bookings`

### Crear una reserva

- Método: `POST`
- Ruta: `/api/bookings`
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

El campo `services` puede omitirse o enviarse como arreglo vacío.

### Obtener una reserva por id

- Método: `GET`
- Ruta: `/api/bookings/:bid`

### Agregar un servicio a una reserva

- Método: `POST`
- Ruta: `/api/bookings/:bid/services/:sid`

Si el servicio ya existe en la reserva, se incrementa su `quantity`.

## Códigos de respuesta

- `201` en `POST` cuando se crea un servicio o una reserva.
- `404` si no existe el `sid` en `GET`, `PUT` o `DELETE` de servicios, o si no existe `bid`/`sid` en reservas.
- `400` cuando falta el body o hay datos inválidos.

## Validaciones principales

- `name`: cadena no vacía.
- `description`: cadena no vacía.
- `duration`: número positivo.
- `price`: número mayor o igual a cero.
- `category`: cadena.
- `available`: booleano.

## Notas

- El `id` de los servicios se genera internamente y no debe enviarse en la solicitud `POST`.
- Los servicios se almacenan en `src/data/services.json`.
- El servidor usa el puerto configurado en `.env`.
