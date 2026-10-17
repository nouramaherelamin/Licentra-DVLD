import { analyticsService } from './analytics.service.js';
import { sendSuccess } from '../../../shared/utils/response.js';

export const analyticsController = {
  getOverview: async (req, res, next) => {
    try {
      const data = await analyticsService.getOverviewMetrics();
      return sendSuccess(res, data, 'Analytics metrics retrieved successfully');
    } catch (err) {
      next(err);
    }
  },
};
