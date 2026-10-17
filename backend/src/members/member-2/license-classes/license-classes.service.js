import { licenseClassesRepository } from './license-classes.repository.js';

export const licenseClassesService = {
  getAll: async () => {
    return await licenseClassesRepository.findAll();
  },
  getById: async (id) => {
    const item = await licenseClassesRepository.findById(id);
    if (!item) {
      const error = new Error(`License class '${id}' not found`);
      error.statusCode = 404;
      error.code = 'CLASS_NOT_FOUND';
      throw error;
    }
    return item;
  },
};
