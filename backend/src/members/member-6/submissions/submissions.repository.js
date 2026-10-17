const mockSubmissions = [
  {
    id: 'user-app-01',
    serviceTitle: 'Private Vehicle Driving License (Class 3)',
    applicationNumber: 'APP-2024-10-098',
    status: 'Under Review',
    submittedAt: '15 Oct 2024',
    feePaid: 630,
    stepsCompleted: 2,
    totalSteps: 4,
  },
  {
    id: 'user-app-02',
    serviceTitle: 'International Driving Permit',
    applicationNumber: 'APP-2024-09-041',
    status: 'Approved - Ready for Pickup',
    submittedAt: '28 Sep 2024',
    feePaid: 850,
    stepsCompleted: 4,
    totalSteps: 4,
  },
];

export const submissionsRepository = {
  findMyApplications: async () => [...mockSubmissions],
  createApplication: async (payload) => {
    const newApp = {
      id: `user-app-${Date.now()}`,
      serviceTitle: payload.serviceTitle || 'Driving License Application',
      applicationNumber: `APP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Submitted',
      submittedAt: new Date().toLocaleDateString('en-GB'),
      feePaid: payload.fee || 630,
      stepsCompleted: 1,
      totalSteps: 4,
      ...payload,
    };
    mockSubmissions.unshift(newApp);
    return newApp;
  },
};
