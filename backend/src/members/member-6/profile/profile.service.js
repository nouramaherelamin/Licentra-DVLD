import { profileRepository } from './profile.repository.js';

export const profileService = {
  getProfile: async () => await profileRepository.getProfile(),
  updateProfile: async (updates) => {
    if (!updates || typeof updates !== 'object' || Array.isArray(updates) || Object.keys(updates).length === 0) {
      const err = new Error('Profile update payload must be a non-empty object.');
      err.statusCode = 400;
      err.code = 'VALIDATION_ERROR';
      throw err;
    }
    return await profileRepository.updateProfile(updates);
  },
};
