export function getServices(servicesService) {
  return async (req, res) => {
    let services = await servicesService.getServices();

    const { category, available } = req.query;
    if (category) {
      services = services.filter((service) => service.category === category);
    }

    if (available !== undefined) {
      const availableBool = available === 'true';
      services = services.filter((service) => service.available === availableBool);
    }

    return res.status(200).json(services);
  };
}

export function getServiceById(servicesService) {
  return async (req, res) => {
    try {
      const service = await servicesService.getServiceById(req.params.sid);
      if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }
      return res.status(200).json(service);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
}

export function createService(servicesService) {
  return async (req, res) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Body requerido' });
      }

      const service = await servicesService.addService(req.body);
      return res.status(201).json(service);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
}

export function updateService(servicesService) {
  return async (req, res) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Body requerido' });
      }

      const updatedService = await servicesService.updateService(req.params.sid, req.body);
      if (!updatedService) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }
      return res.status(200).json(updatedService);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
}

export function deleteService(servicesService) {
  return async (req, res) => {
    try {
      const deletedService = await servicesService.deleteService(req.params.sid);
      if (!deletedService) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }
      return res.status(200).json(deletedService);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
}
