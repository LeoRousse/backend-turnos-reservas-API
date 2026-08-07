import express from 'express';
import { ServicesDao } from './dao/services.dao.js';
import { BookingsDao } from './dao/bookings.dao.js';
import { ServicesRepository } from './repositories/services.repository.js';
import { BookingsRepository } from './repositories/bookings.repository.js';
import { ServicesService } from './services/services.service.js';
import { BookingsService } from './services/bookings.service.js';
import { createServicesRouter } from './routes/services.router.js';
import { createBookingsRouter } from './routes/bookings.router.js';

const servicesDao = new ServicesDao();
const bookingsDao = new BookingsDao();
const servicesRepository = new ServicesRepository(servicesDao);
const bookingsRepository = new BookingsRepository(bookingsDao);
const servicesService = new ServicesService(servicesRepository);
const bookingsService = new BookingsService(bookingsRepository, servicesService);

export const expressApp = express();
expressApp.use(express.json());
expressApp.use('/api/services', createServicesRouter(servicesService));
expressApp.use('/api/bookings', createBookingsRouter(bookingsService, servicesService));

export const app = {
  name: 'Sistema Backend de Turnos y Reservas',
  version: '1.0.0',
  status: 'ready',
  servicesService,
  bookingsService,
  expressApp,
};
