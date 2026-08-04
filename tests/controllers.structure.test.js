import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../src/controllers/services.controller.js';

import {
  createBooking,
  getBookingById,
  addServiceToBooking,
} from '../src/controllers/bookings.controller.js';

test('services controller exports the expected handlers', () => {
  assert.equal(typeof getServices, 'function');
  assert.equal(typeof getServiceById, 'function');
  assert.equal(typeof createService, 'function');
  assert.equal(typeof updateService, 'function');
  assert.equal(typeof deleteService, 'function');
});

test('bookings controller exports the expected handlers', () => {
  assert.equal(typeof createBooking, 'function');
  assert.equal(typeof getBookingById, 'function');
  assert.equal(typeof addServiceToBooking, 'function');
});

test('addServiceToBooking validates service existence before updating a booking', async () => {
  const serviceManager = {
    getServiceById: () => null,
  };

  let bookingManagerCalled = false;
  const bookingManager = {
    addServiceToBooking: async () => {
      bookingManagerCalled = true;
      return { id: 'booking-1' };
    },
  };

  const req = {
    params: { bid: 'booking-1', sid: 'service-1' },
  };

  const res = {
    status(code) {
      this.code = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };

  const handler = addServiceToBooking(bookingManager, serviceManager);
  await handler(req, res);

  assert.equal(res.code, 404);
  assert.equal(bookingManagerCalled, false);
  assert.deepEqual(res.payload, { error: 'Servicio no encontrado' });
});
