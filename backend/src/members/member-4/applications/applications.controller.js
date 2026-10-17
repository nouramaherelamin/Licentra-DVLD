import { applicationsService } from './applications.service.js';
import { sendSuccess } from '../../../shared/utils/response.js';

export const applicationsController = {
  getAll: async (req, res, next) => {
    try {
      const data = await applicationsService.getAll();
      return sendSuccess(res, data, 'Applications retrieved');
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const data = await applicationsService.getById(req.params.id);
      return sendSuccess(res, data, 'Application details retrieved');
    } catch (err) {
      next(err);
    }
  },

  updateStatus: async (req, res, next) => {
    try {
      const data = await applicationsService.updateStatus(req.params.id, req.body.status);
      return sendSuccess(res, data, 'Application status updated');
    } catch (err) {
      next(err);
    }
  },
};
