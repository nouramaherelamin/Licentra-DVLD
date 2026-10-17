const mockSettings = {
  departmentName: 'Licentra Driving & Vehicle License Department',
  country: 'Egypt',
  currency: 'EGP',
  autoLockAppointmentsHours: 24,
  defaultVisionTestFee: 50,
  defaultTheoryTestFee: 100,
  defaultPracticalTestFee: 150,
  supportHotline: '+20 123 456 7890',
  systemStatus: 'Operational',
};

export const settingsRepository = {
  getSettings: async () => ({ ...mockSettings }),
  updateSettings: async (updates) => {
    Object.assign(mockSettings, updates);
    return { ...mockSettings };
  },
};
