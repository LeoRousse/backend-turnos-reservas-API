import express from 'express';
import { ServiceManager } from './services/ServiceManager.js';
import { BookingManager } from './services/BookingManager.js';
import { createServicesRouter } from './routes/services.router.js';
import { createBookingsRouter } from './routes/bookings.router.js';

export const serviceManager = await ServiceManager.create();
export const bookingManager = await BookingManager.create(serviceManager);

export const expressApp = express();
expressApp.use(express.json());
expressApp.use('/api/services', createServicesRouter(serviceManager));
expressApp.use('/api/bookings', createBookingsRouter(bookingManager));

export const app = {
  name: 'Sistema Backend de Turnos y Reservas',
  version: '1.0.0',
  status: 'ready',
  serviceManager,
  bookingManager,
  expressApp,
};
