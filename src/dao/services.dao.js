import { ServiceModel } from '../models/service.model.js';

function normalizeService(document) {
  if (!document) return null;
  return {
    id: String(document._id),
    name: document.name,
    description: document.description,
    duration: document.duration,
    price: document.price,
    category: document.category,
    available: document.available,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
}

export class ServicesDao {
  async getAll() {
    const services = await ServiceModel.find().lean();
    return services.map(normalizeService);
  }

  async getById(id) {
    if (!id) return null;
    const service = await ServiceModel.findById(id).lean();
    return normalizeService(service);
  }

  async create(data) {
    const { id, ...serviceData } = data;
    const service = await ServiceModel.create(serviceData);
    return normalizeService(service.toObject());
  }

  async update(data) {
    const { id, ...serviceData } = data;
    if (!id) return null;
    const service = await ServiceModel.findByIdAndUpdate(id, serviceData, {
      new: true,
      runValidators: true,
    }).lean();
    return normalizeService(service);
  }

  async delete(id) {
    if (!id) return null;
    const service = await ServiceModel.findByIdAndDelete(id).lean();
    return normalizeService(service);
  }
}
