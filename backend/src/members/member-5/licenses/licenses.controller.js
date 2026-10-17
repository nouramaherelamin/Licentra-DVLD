import { licensesService } from './licenses.service.js';
import { sendSuccess } from '../../../shared/utils/response.js';

export const licensesController = {
  getAll: async (req, res, next) => {
    try {
      const data = await licensesService.getAll();
      return sendSuccess(res, data, 'Licenses retrieved successfully');
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const data = await licensesService.getById(req.params.id);
      return sendSuccess(res, data, 'License details retrieved');
    } catch (err) {
      next(err);
    }
  },

  detain: async (req, res, next) => {
    try {
      const data = await licensesService.detain(req.params.id, req.body.fineAmount || 500);
      return sendSuccess(res, data, 'License detained successfully');
    } catch (err) {
      next(err);
    }
  },
};
