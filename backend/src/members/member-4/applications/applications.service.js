import { applicationsRepository } from './applications.repository.js';

export const applicationsService = {
  getAll: async () => await applicationsRepository.findAll(),
  getById: async (id) => {
    const app = await applicationsRepository.findById(id);
    if (!app) {
      const err = new Error(`Application '${id}' not found`);
      err.statusCode = 404;
      err.code = 'APPLICATION_NOT_FOUND';
      throw err;
    }
    return app;
  },
  updateStatus: async (id, status) => {
    if (!status) {
      const err = new Error('Status field is required.');
      err.statusCode = 400;
      err.code = 'VALIDATION_ERROR';
      throw err;
    }
    const updated = await applicationsRepository.updateStatus(id, status);
    if (!updated) {
      const err = new Error(`Application '${id}' not found`);
      err.statusCode = 404;
      err.code = 'APPLICATION_NOT_FOUND';
      throw err;
    }
    return updated;
  },
};
