import { submissionsService } from './submissions.service.js';
import { sendSuccess } from '../../../shared/utils/response.js';
import { HttpStatus } from '../../../shared/constants/httpStatus.js';

export const submissionsController = {
  getMyApplications: async (req, res, next) => {
    try {
      const data = await submissionsService.getMyApplications();
      return sendSuccess(res, data, 'User applications retrieved');
    } catch (err) {
      next(err);
    }
  },

  submit: async (req, res, next) => {
    try {
      const data = await submissionsService.submitApplication(req.body);
      return sendSuccess(res, data, 'Application submitted successfully', HttpStatus.CREATED);
    } catch (err) {
      next(err);
    }
  },
};
