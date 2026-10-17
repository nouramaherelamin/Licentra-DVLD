import { newsRepository } from './news.repository.js';

export const newsService = {
  getAll: async () => await newsRepository.findAll(),
  getById: async (id) => {
    const item = await newsRepository.findById(id);
    if (!item) {
      const err = new Error(`News item '${id}' not found`);
      err.statusCode = 404;
      err.code = 'NEWS_NOT_FOUND';
      throw err;
    }
    return item;
  },
};
