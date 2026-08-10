export class ServicesService {
  constructor(repository) {
    this.repository = repository;
  }

  async getServices() {
    return this.repository.getAll();
  }

  async getServiceById(id) {
    if (!id || typeof id !== 'string') {
      throw new TypeError('El id del servicio debe ser una cadena no vacía.');
    }

    return this.repository.getById(id);
  }

  async addService(serviceData) {
    if (serviceData.id !== undefined) {
      throw new Error('No se permite enviar el id en el body de POST. El id se genera internamente.');
    }

    this._validateServicePayload(serviceData);

    const services = await this.repository.getAll();
    if (services.some((service) => service.name === serviceData.name)) {
      throw new Error(`El servicio "${serviceData.name}" ya está registrado.`);
    }

    const service = {
      name: serviceData.name,
      description: serviceData.description,
      duration: serviceData.duration,
      price: serviceData.price,
      category: serviceData.category,
      available: serviceData.available,
    };

    return this.repository.create(service);
  }

  async updateService(id, updatedData) {
    if (!id || typeof id !== 'string') {
      throw new TypeError('El id del servicio debe ser una cadena no vacía.');
    }

    const services = await this.repository.getAll();
    const existingService = services.find((service) => service.id === id);
    if (!existingService) return null;

    if (updatedData.id && updatedData.id !== id) {
      throw new Error('No se puede modificar el id del servicio.');
    }

    const updated = {
      ...existingService,
      ...updatedData,
      id,
    };

    this._validateServicePayload(updated);

    return this.repository.update(updated);
  }

  async deleteService(id) {
    if (!id || typeof id !== 'string') {
      throw new TypeError('El id del servicio debe ser una cadena no vacía.');
    }

    const existingService = await this.repository.getById(id);
    if (!existingService) return null;

    await this.repository.delete(id);
    return existingService;
  }

  _validateServicePayload(payload) {
    const required = ['name', 'description', 'duration', 'price', 'category', 'available'];

    for (const field of required) {
      if (
        payload[field] === undefined ||
        payload[field] === null ||
        (typeof payload[field] === 'string' && payload[field].trim() === '')
      ) {
        throw new TypeError(`El campo "${field}" es obligatorio para registrar un servicio.`);
      }
    }

    if (typeof payload.name !== 'string') throw new TypeError('El nombre del servicio debe ser una cadena.');
    if (typeof payload.description !== 'string') throw new TypeError('La descripción del servicio debe ser una cadena.');

    if (typeof payload.duration !== 'number' || Number.isNaN(payload.duration) || payload.duration <= 0) {
      throw new TypeError('La duración del servicio debe ser un número positivo.');
    }

    if (typeof payload.price !== 'number' || Number.isNaN(payload.price) || payload.price < 0) {
      throw new TypeError('El precio del servicio debe ser un número mayor o igual a cero.');
    }

    if (typeof payload.category !== 'string') throw new TypeError('La categoría del servicio debe ser una cadena.');

    if (typeof payload.available !== 'boolean') throw new TypeError('El campo available debe ser booleano.');
  }
}
