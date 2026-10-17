import { submissionsRepository } from './submissions.repository.js';

export const submissionsService = {
  getMyApplications: async () => await submissionsRepository.findMyApplications(),
  submitApplication: async (payload) => {
    if (!payload.licenseClassId && !payload.serviceTitle) {
      const err = new Error('Please select a license class or service to submit.');
      err.statusCode = 400;
      err.code = 'VALIDATION_ERROR';
      throw err;
    }
    return await submissionsRepository.createApplication(payload);
  },
};
