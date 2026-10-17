import { notificationsRepository } from './notifications.repository.js';

export const notificationsService = {
  getAll: async () => await notificationsRepository.findAll(),
  markAsRead: async (id) => {
    const updated = await notificationsRepository.markAsRead(id);
    if (!updated) {
      const err = new Error(`Notification '${id}' not found`);
      err.statusCode = 404;
      err.code = 'NOTIFICATION_NOT_FOUND';
      throw err;
    }
    return updated;
  },
};
