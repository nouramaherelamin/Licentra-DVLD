import { licenseClassesService } from './license-classes.service.js';
import { sendSuccess } from '../../../shared/utils/response.js';

export const licenseClassesController = {
  getAll: async (req, res, next) => {
    try {
      const data = await licenseClassesService.getAll();
      return sendSuccess(res, data, 'License classes retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const data = await licenseClassesService.getById(req.params.id);
      return sendSuccess(res, data, 'License class details retrieved');
    } catch (error) {
      next(error);
    }
  },
};
