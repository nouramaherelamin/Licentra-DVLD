import { licensesRepository } from './licenses.repository.js';

export const licensesService = {
  getAll: async () => await licensesRepository.findAll(),
  getById: async (id) => {
    const lic = await licensesRepository.findById(id);
    if (!lic) {
      const err = new Error(`License '${id}' not found`);
      err.statusCode = 404;
      err.code = 'LICENSE_NOT_FOUND';
      throw err;
    }
    return lic;
  },
  detain: async (id, fineAmount) => {
    if (fineAmount !== undefined && (typeof fineAmount !== 'number' || fineAmount < 0 || isNaN(fineAmount))) {
      const err = new Error('Fine amount must be a non-negative number.');
      err.statusCode = 400;
      err.code = 'VALIDATION_ERROR';
      throw err;
    }
    const detained = await licensesRepository.detainLicense(id, fineAmount !== undefined ? fineAmount : 500);
    if (!detained) {
      const err = new Error(`License '${id}' not found`);
      err.statusCode = 404;
      err.code = 'LICENSE_NOT_FOUND';
      throw err;
    }
    return detained;
  },
};
