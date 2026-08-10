import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bookingServiceSchema = new Schema(
  {
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const bookingSchema = new Schema(
  {
    clientName: { type: String, required: true, trim: true },
    clientEmail: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    services: { type: [bookingServiceSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export const BookingModel = model('Booking', bookingSchema);
