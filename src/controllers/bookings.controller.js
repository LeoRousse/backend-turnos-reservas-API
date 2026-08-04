export function createBooking(bookingManager) {
  return async (req, res) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Body requerido' });
      }

      const booking = await bookingManager.createBooking(req.body);
      return res.status(201).json(booking);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
}

export function getBookingById(bookingManager) {
  return (req, res) => {
    try {
      const booking = bookingManager.getBookingById(req.params.bid);
      if (!booking) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }
      return res.status(200).json(booking);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
}

export function addServiceToBooking(bookingManager, serviceManager) {
  return async (req, res) => {
    try {
      const service = serviceManager.getServiceById(req.params.sid);
      if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }

      const booking = await bookingManager.addServiceToBooking(req.params.bid, req.params.sid);
      if (!booking) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }
      return res.status(200).json(booking);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
}
