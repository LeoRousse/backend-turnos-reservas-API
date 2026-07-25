import { randomUUID } from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const bookingsJsonPath = path.join(__dirname, '..', 'data', 'bookings.json');

function isValidEmail(email) {
  return typeof email === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export class BookingManager {
  constructor(bookingsMap, serviceManager) {
    this.bookings = bookingsMap ?? new Map();
    this.serviceManager = serviceManager;
  }

  static async create(serviceManager) {
    let raw = '[]';
    try {
      raw = await fs.readFile(bookingsJsonPath, 'utf-8');
    } catch {
      raw = '[]';
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = [];
    }

    const map = new Map();
    if (Array.isArray(parsed)) {
      for (const booking of parsed) {
        if (booking && typeof booking.id === 'string') {
          map.set(booking.id, booking);
        }
      }
    }

    return new BookingManager(map, serviceManager);
  }

  async _persist() {
    const list = [...this.bookings.values()];
    await fs.mkdir(path.dirname(bookingsJsonPath), { recursive: true });
    await fs.writeFile(bookingsJsonPath, JSON.stringify(list, null, 2), 'utf-8');
  }

  _validateBookingPayload(payload) {
    const required = ['clientName', 'clientEmail', 'date', 'time', 'status'];

    for (const field of required) {
      if (
        payload[field] === undefined ||
        payload[field] === null ||
        (typeof payload[field] === 'string' && payload[field].trim() === '')
      ) {
        throw new TypeError(`El campo "${field}" es obligatorio para registrar una reserva.`);
      }
    }

    if (typeof payload.clientName !== 'string') {
      throw new TypeError('El nombre del cliente debe ser una cadena.');
    }

    if (!isValidEmail(payload.clientEmail)) {
      throw new TypeError('El correo del cliente debe ser un email válido.');
    }

    if (typeof payload.date !== 'string') {
      throw new TypeError('La fecha de la reserva debe ser una cadena.');
    }

    if (typeof payload.time !== 'string') {
      throw new TypeError('La hora de la reserva debe ser una cadena.');
    }

    if (typeof payload.status !== 'string') {
      throw new TypeError('El estado de la reserva debe ser una cadena.');
    }

    if (payload.services !== undefined) {
      if (!Array.isArray(payload.services)) {
        throw new TypeError('El campo services debe ser un arreglo.');
      }

      for (const item of payload.services) {
        if (!item || typeof item !== 'object') {
          throw new TypeError('Cada elemento de services debe ser un objeto.');
        }

        if (typeof item.service !== 'string' || item.service.trim() === '') {
          throw new TypeError('Cada servicio en services debe tener un service válido.');
        }

        if (
          typeof item.quantity !== 'number' ||
          Number.isNaN(item.quantity) ||
          item.quantity <= 0 ||
          !Number.isInteger(item.quantity)
        ) {
          throw new TypeError('Cada servicio en services debe tener quantity como entero positivo.');
        }
      }
    }
  }

  getBookings() {
    return [...this.bookings.values()];
  }

  getBookingById(id) {
    if (!id || typeof id !== 'string') {
      throw new TypeError('El id de la reserva debe ser una cadena no vacía.');
    }
    return this.bookings.get(id) ?? null;
  }

  async createBooking(bookingData) {
    if (bookingData.id !== undefined) {
      throw new Error('No se permite enviar el id en el body de POST. El id se genera internamente.');
    }

    this._validateBookingPayload(bookingData);

    const services = Array.isArray(bookingData.services) ? bookingData.services : [];
    const normalizedServices = services.map((item) => ({
      service: item.service,
      quantity: item.quantity,
    }));

    const booking = {
      id: randomUUID(),
      clientName: bookingData.clientName,
      clientEmail: bookingData.clientEmail,
      date: bookingData.date,
      time: bookingData.time,
      status: bookingData.status,
      services: normalizedServices,
    };

    this.bookings.set(booking.id, booking);
    await this._persist();
    return booking;
  }

  async addServiceToBooking(bookingId, serviceId) {
    if (!bookingId || typeof bookingId !== 'string') {
      throw new TypeError('El id de la reserva debe ser una cadena no vacía.');
    }

    if (!serviceId || typeof serviceId !== 'string') {
      throw new TypeError('El id del servicio debe ser una cadena no vacía.');
    }

    const booking = this.getBookingById(bookingId);
    if (!booking) {
      return null;
    }

    const service = this.serviceManager.getServiceById(serviceId);
    if (!service) {
      throw new Error('Servicio no encontrado');
    }

    const existingItem = booking.services.find((item) => item.service === serviceId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      booking.services.push({ service: serviceId, quantity: 1 });
    }

    this.bookings.set(bookingId, booking);
    await this._persist();
    return booking;
  }
}
