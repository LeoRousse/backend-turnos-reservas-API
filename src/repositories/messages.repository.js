export class MessagesRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getAll() {
    if (typeof this.dao.getAll === 'function') {
      return this.dao.getAll();
    }
    if (typeof this.dao.readAll === 'function') {
      return this.dao.readAll();
    }
    return [];
  }

  async getById(id) {
    if (typeof this.dao.getById === 'function') {
      return this.dao.getById(id);
    }
    const items = await this.getAll();
    return items.find((item) => item.id === id) ?? null;
  }

  async create(item) {
    if (typeof this.dao.create === 'function') {
      return this.dao.create(item);
    }
    throw new Error('DAO no implementa create.');
  }

  async delete(id) {
    if (typeof this.dao.delete === 'function') {
      return this.dao.delete(id);
    }
    throw new Error('DAO no implementa delete.');
  }
}
