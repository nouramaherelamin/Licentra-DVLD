import { peopleService } from './people.service.js';
import { sendSuccess } from '../../../shared/utils/response.js';
import { HttpStatus } from '../../../shared/constants/httpStatus.js';

export const peopleController = {
  getAll: async (req, res, next) => {
    try {
      const data = await peopleService.getAllPeople();
      return sendSuccess(res, data, 'People records retrieved');
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const data = await peopleService.getPersonById(req.params.id);
      return sendSuccess(res, data, 'Person details retrieved');
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const data = await peopleService.createPerson(req.body);
      return sendSuccess(res, data, 'Person record created', HttpStatus.CREATED);
    } catch (err) {
      next(err);
    }
  },
};
