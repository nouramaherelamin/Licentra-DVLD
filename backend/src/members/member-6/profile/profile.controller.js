import { profileService } from './profile.service.js';
import { sendSuccess } from '../../../shared/utils/response.js';

export const profileController = {
  getMe: async (req, res, next) => {
    try {
      const data = await profileService.getProfile();
      return sendSuccess(res, data, 'User profile retrieved successfully');
    } catch (err) {
      next(err);
    }
  },

  updateMe: async (req, res, next) => {
    try {
      const data = await profileService.updateProfile(req.body);
      return sendSuccess(res, data, 'User profile updated successfully');
    } catch (err) {
      next(err);
    }
  },
};
