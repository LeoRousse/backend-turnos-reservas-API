// src/services/ServiceManager.js
import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicesJsonPath = path.join(__dirname, "..", "data", "services.json");

export class ServiceManager {
  constructor(servicesMap) {
    this.services = servicesMap ?? new Map();
  }

  static async create() {
    // Lee services.json e inicializa el Map
    let raw = "[]";
    try {
      raw = await fs.readFile(servicesJsonPath, "utf-8");
    } catch (e) {
      // Si no existe, asumimos vacío y lo creamos al primer guardado
      raw = "[]";
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = [];
    }

    const map = new Map();
    if (Array.isArray(parsed)) {
      for (const s of parsed) {
        if (s && typeof s.id === "string") map.set(s.id, s);
      }
    }

    return new ServiceManager(map);
  }

  async _persist() {
    const list = [...this.services.values()];
    await fs.mkdir(path.dirname(servicesJsonPath), { recursive: true });
    await fs.writeFile(servicesJsonPath, JSON.stringify(list, null, 2), "utf-8");
  }

  _validateServicePayload(payload) {
    const required = ["name", "description", "duration", "price", "category", "available"];

    for (const field of required) {
      if (
        payload[field] === undefined ||
        payload[field] === null ||
        (typeof payload[field] === "string" && payload[field].trim() === "")
      ) {
        throw new TypeError(`El campo "${field}" es obligatorio para registrar un servicio.`);
      }
    }

    if (typeof payload.name !== "string") throw new TypeError("El nombre del servicio debe ser una cadena.");
    if (typeof payload.description !== "string") throw new TypeError("La descripción del servicio debe ser una cadena.");

    if (typeof payload.duration !== "number" || Number.isNaN(payload.duration) || payload.duration <= 0) {
      throw new TypeError("La duración del servicio debe ser un número positivo.");
    }

    if (typeof payload.price !== "number" || Number.isNaN(payload.price) || payload.price < 0) {
      throw new TypeError("El precio del servicio debe ser un número mayor o igual a cero.");
    }

    if (typeof payload.category !== "string") throw new TypeError("La categoría del servicio debe ser una cadena.");

    if (typeof payload.available !== "boolean") throw new TypeError("El campo available debe ser booleano.");
  }

  getServices() {
    return [...this.services.values()];
  }

  getServiceById(id) {
    if (!id || typeof id !== "string") {
      throw new TypeError("El id del servicio debe ser una cadena no vacía.");
    }
    return this.services.get(id) ?? null;
  }

  async addService(serviceData) {
    if (serviceData.id !== undefined) {
      throw new Error('No se permite enviar el id en el body de POST. El id se genera internamente.');
    }

    this._validateServicePayload(serviceData);

    if ([...this.services.values()].some((service) => service.name === serviceData.name)) {
      throw new Error(`El servicio "${serviceData.name}" ya está registrado.`);
    }

    const service = {
      id: randomUUID(),
      name: serviceData.name,
      description: serviceData.description,
      duration: serviceData.duration,
      price: serviceData.price,
      category: serviceData.category,
      available: serviceData.available,
    };

    this.services.set(service.id, service);
    await this._persist();
    return service;
  }

  async updateService(id, updatedData) {
    if (!id || typeof id !== "string") {
      throw new TypeError("El id del servicio debe ser una cadena no vacía.");
    }

    const existingService = this.getServiceById(id);
    if (!existingService) return null;

    if (updatedData.id && updatedData.id !== id) {
      throw new Error("No se puede modificar el id del servicio.");
    }

    const updated = {
      ...existingService,
      ...updatedData,
      id,
    };

    this._validateServicePayload(updated);
    this.services.set(id, updated);
    await this._persist();
    return updated;
  }

  async deleteService(id) {
    if (!id || typeof id !== "string") {
      throw new TypeError("El id del servicio debe ser una cadena no vacía.");
    }

    const existingService = this.getServiceById(id);
    if (!existingService) return null;

    this.services.delete(id);
    await this._persist();
    return existingService;
  }

  countServices() {
    return this.services.size;
  }
}
