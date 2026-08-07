export class BookingsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async _readAll() {
    if (typeof this.dao.readAll === 'function') {
      return this.dao.readAll();
    }
    if (typeof this.dao.getAll === 'function') {
      return this.dao.getAll();
    }
    return [];
  }

  async _writeAll(items) {
    if (typeof this.dao.writeAll === 'function') {
      return this.dao.writeAll(items);
    }
    if (typeof this.dao.saveAll === 'function') {
      return this.dao.saveAll(items);
    }
    return items;
  }

  async create(item) {
    const items = await this._readAll();
    items.push(item);
    await this._writeAll(items);
    return item;
  }

  async getById(id) {
    if (typeof this.dao.getById === 'function') {
      return this.dao.getById(id);
    }
    const items = await this._readAll();
    return items.find((item) => item.id === id) ?? null;
  }

  async update(item) {
    const items = await this._readAll();
    const index = items.findIndex((existing) => existing.id === item.id);
    if (index === -1) return null;
    items[index] = item;
    await this._writeAll(items);
    return item;
  }
}
