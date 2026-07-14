# Backend de Turnos y Reservas

## Objetivo

Construir una API REST con Express que exponga endpoints para gestionar el recurso `services`, conectando las rutas con el `ServiceManager` de la entrega anterior.

## Descripción

Esta aplicación ofrece una API para crear, leer, actualizar y eliminar servicios. El almacenamiento se realiza en el archivo JSON real del repositorio en `src/data/services.json` y la lógica de negocio está centralizada en `src/managers/ServiceManager.js`.

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
- `src/managers/ServiceManager.js`: gestiona la lógica de servicios y persiste en `src/data/services.json`.

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

## Códigos de respuesta

- `201` en `POST` cuando se crea un servicio.
- `404` si no existe el `sid` en `GET`, `PUT` o `DELETE`.
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
