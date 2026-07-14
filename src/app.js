import express from 'express';
import { ServiceManager } from './services/ServiceManager.js';
import { createServicesRouter } from './routes/services.router.js';

export const serviceManager = await ServiceManager.create();

export const expressApp = express();
expressApp.use(express.json());
expressApp.use('/api/services', createServicesRouter(serviceManager));

export const app = {
  name: 'Sistema Backend de Turnos y Reservas',
  version: '1.0.0',
  status: 'ready',
  serviceManager,
  expressApp,
};
