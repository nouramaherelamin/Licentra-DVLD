import { servicesRepository } from './services.repository.js';

export const servicesService = {
  getAllServices: async () => {
    return await servicesRepository.findAll();
  },
  getServiceById: async (id) => {
    const service = await servicesRepository.findById(id);
    if (!service) {
      const error = new Error(`Service with ID '${id}' not found`);
      error.statusCode = 404;
      error.code = 'SERVICE_NOT_FOUND';
      throw error;
    }
    return service;
  },
};
