import { settingsRepository } from './settings.repository.js';

export const settingsService = {
  getSettings: async () => await settingsRepository.getSettings(),
  updateSettings: async (updates) => {
    if (!updates || typeof updates !== 'object' || Array.isArray(updates) || Object.keys(updates).length === 0) {
      const err = new Error('Settings update payload must be a non-empty object.');
      err.statusCode = 400;
      err.code = 'VALIDATION_ERROR';
      throw err;
    }
    return await settingsRepository.updateSettings(updates);
  },
};
