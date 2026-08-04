import { Router } from 'express';
import {
  addServiceToBooking,
  createBooking,
  getBookingById,
} from '../controllers/bookings.controller.js';

export function createBookingsRouter(bookingManager, serviceManager) {
  const router = Router();

  router.post('/', createBooking(bookingManager));
  router.get('/:bid', getBookingById(bookingManager));
  router.post('/:bid/services/:sid', addServiceToBooking(bookingManager, serviceManager));

  return router;
}
