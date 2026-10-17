const mockLicenses = [
  {
    id: 'lic-9001',
    licenseNumber: 'EG-2987654321',
    driverName: 'Noura Mohamed',
    nationalId: '29876543219999',
    licenseClass: 'Class 3 - Private Vehicle',
    issueDate: '2023-03-15',
    expirationDate: '2033-03-15',
    isActive: true,
    isDetained: false,
    fineAmount: 0,
  },
  {
    id: 'lic-9002',
    licenseNumber: 'EG-2990112123',
    driverName: 'Sara Ali',
    nationalId: '29901121234567',
    licenseClass: 'Class 1 - Motorcycle',
    issueDate: '2021-08-10',
    expirationDate: '2026-08-10',
    isActive: true,
    isDetained: false,
    fineAmount: 0,
  },
  {
    id: 'lic-9003',
    licenseNumber: 'EG-2950505123',
    driverName: 'Tarek Mahmoud',
    nationalId: '29101011234567',
    licenseClass: 'Class 4 - Taxi',
    issueDate: '2022-01-20',
    expirationDate: '2032-01-20',
    isActive: false,
    isDetained: true,
    fineAmount: 750,
  },
];

export const licensesRepository = {
  findAll: async () => [...mockLicenses],
  findById: async (id) => mockLicenses.find((l) => l.id === id || l.licenseNumber === id) || null,
  detainLicense: async (id, fineAmount) => {
    const lic = mockLicenses.find((l) => l.id === id || l.licenseNumber === id);
    if (!lic) return null;
    lic.isDetained = true;
    lic.isActive = false;
    lic.fineAmount = fineAmount;
    return { ...lic };
  },
};
