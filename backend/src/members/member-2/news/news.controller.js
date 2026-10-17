import { newsService } from './news.service.js';
import { sendSuccess } from '../../../shared/utils/response.js';

export const newsController = {
  getAll: async (req, res, next) => {
    try {
      const data = await newsService.getAll();
      return sendSuccess(res, data, 'News articles retrieved successfully');
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const data = await newsService.getById(req.params.id);
      return sendSuccess(res, data, 'News article details retrieved');
    } catch (err) {
      next(err);
    }
  },
};
