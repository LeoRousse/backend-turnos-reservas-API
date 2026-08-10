import { MessageModel } from '../models/message.model.js';

function normalizeMessage(document) {
  if (!document) return null;
  return {
    id: String(document._id),
    sender: document.sender,
    recipient: document.recipient,
    subject: document.subject,
    content: document.content,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
}

export class MessageDao {
  async getAll() {
    const messages = await MessageModel.find().lean();
    return messages.map(normalizeMessage);
  }

  async getById(id) {
    if (!id) return null;
    const message = await MessageModel.findById(id).lean();
    return normalizeMessage(message);
  }

  async create(data) {
    const message = await MessageModel.create(data);
    return normalizeMessage(message.toObject());
  }

  async delete(id) {
    const message = await MessageModel.findByIdAndDelete(id).lean();
    return normalizeMessage(message);
  }
}
