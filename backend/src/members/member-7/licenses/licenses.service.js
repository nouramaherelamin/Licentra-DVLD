import { userLicensesRepository } from './licenses.repository.js';

export const userLicensesService = {
  getMyLicenses: async () => await userLicensesRepository.findMyLicenses(),
};
