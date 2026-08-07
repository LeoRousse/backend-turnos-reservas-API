// src/routes/services.router.js

import { Router } from 'express';
import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
} from '../controllers/services.controller.js';

export function createServicesRouter(servicesService) {
  const router = Router();

  router.get('/', getServices(servicesService));
  router.get('/:sid', getServiceById(servicesService));
  router.post('/', createService(servicesService));
  router.put('/:sid', updateService(servicesService));
  router.delete('/:sid', deleteService(servicesService));

  return router;
}
