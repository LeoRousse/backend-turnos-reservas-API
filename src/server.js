// src/server.js
import { env } from './config/env.config.js';
import { app } from './app.js';

console.log('Aplicación inicializada');
console.log(`Nombre de la app: ${app.name}`);
console.log(`Versión: ${app.version}`);
console.log(`Estado inicial: ${app.status}`);
console.log(`Entorno: ${env.nodeEnv}`);
console.log(`Puerto configurado: ${env.port}`);

app.expressApp.listen(env.port, () => {
  console.log(`Servidor escuchando en el puerto ${env.port}`);
});
