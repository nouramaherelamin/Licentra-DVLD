const mockAnalytics = {
  kpis: {
    totalApplications: 2583,
    applicationsTrend: '+12%',
    issuedLicenses: 1964,
    issuedLicensesTrend: '+8%',
    scheduledTests: 487,
    scheduledTestsTrend: '-4%',
    passedTests: 392,
    passedTestsTrend: '+15%',
    activeDrivers: 500000,
    activeDriversTrend: '+6%',
    overallPassRate: 81,
    failedTests: 95,
  },
  classesDistribution: [
    { label: 'Class 1 (Motorcycle)', percentage: 18 },
    { label: 'Class 2 (Heavy Motorcycle)', percentage: 12 },
    { label: 'Class 3 (Private Vehicle)', percentage: 28 },
    { label: 'Class 4 (Taxi/Limousine)', percentage: 15 },
    { label: 'Class 5 (Agricultural)', percentage: 7 },
    { label: 'Class 6 (Bus)', percentage: 10 },
    { label: 'Class 7 (Heavy Vehicle)', percentage: 10 },
  ],
};

export const analyticsRepository = {
  getOverviewMetrics: async () => ({ ...mockAnalytics }),
};
