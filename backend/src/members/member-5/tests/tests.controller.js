import { testsService } from './tests.service.js';
import { sendSuccess } from '../../../shared/utils/response.js';

export const testsController = {
  getAppointments: async (req, res, next) => {
    try {
      const data = await testsService.getAllAppointments();
      return sendSuccess(res, data, 'Test appointments retrieved');
    } catch (err) {
      next(err);
    }
  },

  recordResult: async (req, res, next) => {
    try {
      const { passed, notes } = req.body || {};
      const data = await testsService.recordResult(req.params.id, passed, notes);
      return sendSuccess(res, data, 'Test result recorded successfully');
    } catch (err) {
      next(err);
    }
  },
};
