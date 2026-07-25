import { Router } from 'express';

export function createBookingsRouter(bookingManager) {
  const router = Router();

  router.post('/', async (req, res) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Body requerido' });
      }

      const booking = await bookingManager.createBooking(req.body);
      return res.status(201).json(booking);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

  router.get('/:bid', (req, res) => {
    try {
      const booking = bookingManager.getBookingById(req.params.bid);
      if (!booking) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }
      return res.status(200).json(booking);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

  router.post('/:bid/services/:sid', async (req, res) => {
    try {
      const booking = await bookingManager.addServiceToBooking(req.params.bid, req.params.sid);
      if (!booking) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }
      return res.status(200).json(booking);
    } catch (error) {
      if (error.message === 'Servicio no encontrado') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  });

  return router;
}
