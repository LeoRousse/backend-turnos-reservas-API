import { BookingModel } from '../models/booking.model.js';

function normalizeBooking(document) {
  if (!document) return null;
  return {
    id: String(document._id),
    clientName: document.clientName,
    clientEmail: document.clientEmail,
    date: document.date,
    time: document.time,
    status: document.status,
    services: Array.isArray(document.services)
      ? document.services.map((item) => ({
          service: String(item.service),
          quantity: item.quantity,
        }))
      : [],
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
}

export class BookingsDao {
  async getAll() {
    const bookings = await BookingModel.find().lean();
    return bookings.map(normalizeBooking);
  }

  async getById(id) {
    if (!id) return null;
    const booking = await BookingModel.findById(id).lean();
    return normalizeBooking(booking);
  }

  async create(data) {
    const { id, ...bookingData } = data;
    const booking = await BookingModel.create(bookingData);
    return normalizeBooking(booking.toObject());
  }

  async update(data) {
    const { id, ...bookingData } = data;
    if (!id) return null;
    const booking = await BookingModel.findByIdAndUpdate(id, bookingData, {
      new: true,
      runValidators: true,
    }).lean();
    return normalizeBooking(booking);
  }
}
