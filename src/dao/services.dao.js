import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const servicesJsonPath = path.join(__dirname, '..', 'data', 'services.json');

export class ServicesDao {
  async readAll() {
    let raw = '[]';
    try {
      raw = await fs.readFile(servicesJsonPath, 'utf-8');
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
    await fs.mkdir(path.dirname(servicesJsonPath), { recursive: true });
    await fs.writeFile(servicesJsonPath, JSON.stringify(data, null, 2), 'utf-8');
  }
}
