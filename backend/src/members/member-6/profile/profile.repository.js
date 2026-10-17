const mockUserProfile = {
  id: 'usr-noura',
  fullName: 'Noura Mohamed Ahmed',
  nationalId: '2987654321',
  email: 'noura.m@gmail.com',
  phone: '+20 123 456 7890',
  alternatePhone: '+20 112 345 6789',
  address: 'Nasr City, Cairo, Egypt',
  dateOfBirth: '2000-01-12',
  gender: 'Female',
  nationality: 'Egyptian',
  activeApplicationsCount: 2,
  activeLicensesCount: 1,
  completedTestsCount: 3,
  status: 'Active Account',
};

export const profileRepository = {
  getProfile: async () => ({ ...mockUserProfile }),
  updateProfile: async (updates) => {
    Object.assign(mockUserProfile, updates);
    return { ...mockUserProfile };
  },
};
