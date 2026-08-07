import test from 'node:test';
import assert from 'node:assert/strict';

import { ServicesRepository } from '../src/repositories/services.repository.js';
import { BookingsRepository } from '../src/repositories/bookings.repository.js';

test('services repository exposes the expected data access methods', async () => {
  const dao = {
    getAll: async () => [{ id: '1', name: 'Corte' }],
    getById: async (id) => ({ id, name: 'Corte' }),
    create: async (item) => item,
    update: async (item) => item,
    delete: async (id) => ({ id }),
  };

  const repository = new ServicesRepository(dao);

  assert.equal(typeof repository.getAll, 'function');
  assert.equal(typeof repository.getById, 'function');
  assert.equal(typeof repository.create, 'function');
  assert.equal(typeof repository.update, 'function');
  assert.equal(typeof repository.delete, 'function');

  const result = await repository.getById('1');
  assert.deepEqual(result, { id: '1', name: 'Corte' });
});

test('bookings repository exposes the expected data access methods', async () => {
  const dao = {
    create: async (item) => item,
    getById: async (id) => ({ id, clientName: 'Ana' }),
    update: async (item) => item,
  };

  const repository = new BookingsRepository(dao);

  assert.equal(typeof repository.create, 'function');
  assert.equal(typeof repository.getById, 'function');
  assert.equal(typeof repository.update, 'function');

  const booking = await repository.getById('b1');
  assert.deepEqual(booking, { id: 'b1', clientName: 'Ana' });
});
