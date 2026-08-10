import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    sender: { type: String, required: true, trim: true },
    recipient: { type: String, required: true, trim: true },
    subject: { type: String, trim: true, default: '' },
    content: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export const MessageModel = model('Message', messageSchema);
