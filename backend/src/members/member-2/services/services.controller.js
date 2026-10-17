import { servicesService } from './services.service.js';
import { sendSuccess } from '../../../shared/utils/response.js';

export const servicesController = {
  getAll: async (req, res, next) => {
    try {
      const data = await servicesService.getAllServices();
      return sendSuccess(res, data, 'Services retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const data = await servicesService.getServiceById(req.params.id);
      return sendSuccess(res, data, 'Service details retrieved');
    } catch (error) {
      next(error);
    }
  },
};
