import { Router } from 'express';
import {
  addServiceToBooking,
  createBooking,
  getBookingById,
} from '../controllers/bookings.controller.js';

export function createBookingsRouter(bookingsService, servicesService) {
  const router = Router();

  router.post('/', createBooking(bookingsService));
  router.get('/:bid', getBookingById(bookingsService));
  router.post('/:bid/services/:sid', addServiceToBooking(bookingsService, servicesService));

  return router;
}
