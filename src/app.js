import express from 'express';
import { ServicesDao } from './dao/services.dao.js';
import { BookingsDao } from './dao/bookings.dao.js';
import { MessageDao } from './dao/message.dao.js';
import { ServicesRepository } from './repositories/services.repository.js';
import { BookingsRepository } from './repositories/bookings.repository.js';
import { MessagesRepository } from './repositories/messages.repository.js';
import { ServicesService } from './services/services.service.js';
import { BookingsService } from './services/bookings.service.js';
import { MessagesService } from './services/messages.service.js';
import { createServicesRouter } from './routes/services.router.js';
import { createBookingsRouter } from './routes/bookings.router.js';
import { createMessagesRouter } from './routes/messages.router.js';

const servicesDao = new ServicesDao();
const bookingsDao = new BookingsDao();
const messageDao = new MessageDao();
const servicesRepository = new ServicesRepository(servicesDao);
const bookingsRepository = new BookingsRepository(bookingsDao);
const messagesRepository = new MessagesRepository(messageDao);
const servicesService = new ServicesService(servicesRepository);
const bookingsService = new BookingsService(bookingsRepository, servicesService);
const messagesService = new MessagesService(messagesRepository);

export const expressApp = express();
expressApp.use(express.json());
expressApp.use('/api/services', createServicesRouter(servicesService));
expressApp.use('/api/bookings', createBookingsRouter(bookingsService, servicesService));
expressApp.use('/api/messages', createMessagesRouter(messagesService));

export const app = {
  name: 'Sistema Backend de Turnos y Reservas',
  version: '1.0.0',
  status: 'ready',
  servicesService,
  bookingsService,
  messagesService,
  expressApp,
};
