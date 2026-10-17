const mockServices = [
  {
    id: 'srv-001',
    title: 'First Driving License',
    description: 'Apply for your first driving license and start your journey.',
    category: 'Issuance',
    fees: 650,
    currency: 'EGP',
    estimatedDays: 7,
  },
  {
    id: 'srv-002',
    title: 'License Renewal',
    description: 'Renew your expired driving license quickly and easily.',
    category: 'Renewal',
    fees: 450,
    currency: 'EGP',
    estimatedDays: 2,
  },
  {
    id: 'srv-003',
    title: 'Replacement License',
    description: 'Get a replacement for a lost or damaged driving license.',
    category: 'Replacement',
    fees: 300,
    currency: 'EGP',
    estimatedDays: 3,
  },
  {
    id: 'srv-004',
    title: 'International License',
    description: 'Apply for an international driving license and drive abroad.',
    category: 'International',
    fees: 850,
    currency: 'EGP',
    estimatedDays: 5,
  },
  {
    id: 'srv-005',
    title: 'Release Detained License',
    description: 'Settle traffic fines and release your detained driving license.',
    category: 'Violations',
    fees: 200,
    currency: 'EGP',
    estimatedDays: 1,
  },
];

export const servicesRepository = {
  findAll: async () => {
    return [...mockServices];
  },
  findById: async (id) => {
    return mockServices.find((s) => s.id === id) || null;
  },
};
