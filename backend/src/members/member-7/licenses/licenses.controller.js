import { userLicensesService } from './licenses.service.js';
import { sendSuccess } from '../../../shared/utils/response.js';

export const userLicensesController = {
  getMyLicenses: async (req, res, next) => {
    try {
      const data = await userLicensesService.getMyLicenses();
      return sendSuccess(res, data, 'User licenses retrieved');
    } catch (err) {
      next(err);
    }
  },
};
