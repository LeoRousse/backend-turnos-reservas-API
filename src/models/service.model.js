import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const serviceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    available: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

export const ServiceModel = model('Service', serviceSchema);
