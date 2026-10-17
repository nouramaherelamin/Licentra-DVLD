import { contactService } from './contact.service.js';
import { sendSuccess } from '../../../shared/utils/response.js';
import { HttpStatus } from '../../../shared/constants/httpStatus.js';

export const contactController = {
  getAll: async (req, res, next) => {
    try {
      const inquiries = await contactService.getInquiries();
      return sendSuccess(res, inquiries, 'Inquiries retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  submit: async (req, res, next) => {
    try {
      const result = await contactService.submitInquiry(req.body);
      return sendSuccess(res, result, 'Inquiry submitted successfully', HttpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  },
};
