import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const bookingsJsonPath = path.join(__dirname, '..', 'data', 'bookings.json');

export class BookingsDao {
  async readAll() {
    let raw = '[]';
    try {
      raw = await fs.readFile(bookingsJsonPath, 'utf-8');
    } catch {
      raw = '[]';
    }

    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  async writeAll(data) {
    await fs.mkdir(path.dirname(bookingsJsonPath), { recursive: true });
    await fs.writeFile(bookingsJsonPath, JSON.stringify(data, null, 2), 'utf-8');
  }
}
