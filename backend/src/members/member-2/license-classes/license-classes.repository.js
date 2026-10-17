const mockLicenseClasses = [
  { id: 1, code: 'Class 1', title: 'Light Motorcycle', minAge: 18, validityYears: 5, fees: 310, currency: 'EGP' },
  { id: 2, code: 'Class 2', title: 'Heavy Motorcycle', minAge: 21, validityYears: 10, fees: 450, currency: 'EGP' },
  { id: 3, code: 'Class 3', title: 'Private Vehicle', minAge: 18, validityYears: 10, fees: 630, currency: 'EGP' },
  { id: 4, code: 'Class 4', title: 'Taxi / Limousine', minAge: 21, validityYears: 10, fees: 520, currency: 'EGP' },
  { id: 5, code: 'Class 5', title: 'Agricultural Vehicle', minAge: 18, validityYears: 10, fees: 350, currency: 'EGP' },
  { id: 6, code: 'Class 6', title: 'Bus', minAge: 21, validityYears: 10, fees: 520, currency: 'EGP' },
  { id: 7, code: 'Class 7', title: 'Heavy Vehicle', minAge: 21, validityYears: 10, fees: 550, currency: 'EGP' },
];

export const licenseClassesRepository = {
  findAll: async () => {
    return [...mockLicenseClasses];
  },
  findById: async (id) => {
    const numId = Number(id);
    return (
      mockLicenseClasses.find(
        (c) =>
          (!isNaN(numId) && c.id === numId) ||
          c.code.toLowerCase() === String(id).toLowerCase() ||
          `class-${c.id}` === String(id).toLowerCase()
      ) || null
    );
  },
};
