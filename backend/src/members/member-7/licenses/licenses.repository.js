const mockUserLicenses = [
  {
    id: 'usr-lic-01',
    licenseNumber: 'EG-2987654321',
    holderName: 'Noura Mohamed Ahmed',
    nationalId: '2987654321',
    licenseClass: 'Class 3 - Private Vehicle',
    issueDate: '15 Mar 2023',
    expiryDate: '15 Mar 2033',
    status: 'Active',
    donorStatus: 'Organ Donor (Yes)',
    bloodType: 'O+',
    qrVerificationCode: 'LIC-EG-2987654321-VERIFIED',
  },
];

export const userLicensesRepository = {
  findMyLicenses: async () => [...mockUserLicenses],
};
