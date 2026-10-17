import { notificationsService } from './notifications.service.js';
import { sendSuccess } from '../../../shared/utils/response.js';

export const notificationsController = {
  getAll: async (req, res, next) => {
    try {
      const data = await notificationsService.getAll();
      return sendSuccess(res, data, 'Notifications retrieved');
    } catch (err) {
      next(err);
    }
  },

  markAsRead: async (req, res, next) => {
    try {
      const data = await notificationsService.markAsRead(req.params.id);
      return sendSuccess(res, data, 'Notification marked as read');
    } catch (err) {
      next(err);
    }
  },
};
