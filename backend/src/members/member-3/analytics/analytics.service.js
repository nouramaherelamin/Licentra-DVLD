import { analyticsRepository } from './analytics.repository.js';

export const analyticsService = {
  getOverviewMetrics: async () => {
    return await analyticsRepository.getOverviewMetrics();
  },
};
