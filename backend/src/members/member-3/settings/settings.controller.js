import { settingsService } from './settings.service.js';
import { sendSuccess } from '../../../shared/utils/response.js';

export const settingsController = {
  get: async (req, res, next) => {
    try {
      const data = await settingsService.getSettings();
      return sendSuccess(res, data, 'Settings retrieved successfully');
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const data = await settingsService.updateSettings(req.body);
      return sendSuccess(res, data, 'Settings updated successfully');
    } catch (err) {
      next(err);
    }
  },
};
