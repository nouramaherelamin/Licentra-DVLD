import { contactRepository } from './contact.repository.js';

export const contactService = {
  getInquiries: async () => {
    return await contactRepository.findAll();
  },
  submitInquiry: async (payload) => {
    if (!payload.fullName || !payload.email || !payload.message) {
      const error = new Error('Full name, email, and message are required fields.');
      error.statusCode = 400;
      error.code = 'VALIDATION_ERROR';
      throw error;
    }
    return await contactRepository.create(payload);
  },
};
