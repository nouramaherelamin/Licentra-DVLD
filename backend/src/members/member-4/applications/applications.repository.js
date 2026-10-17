const mockApplications = [
  {
    id: 'app-1258',
    applicantName: 'Ahmed Mohamed',
    nationalId: '29876543210123',
    licenseClass: 'Class 3 - Private Vehicle',
    applicationType: 'New License',
    status: 'Under Review',
    date: '15 Oct 2024',
    paidFees: 630,
  },
  {
    id: 'app-1257',
    applicantName: 'Sara Ali',
    nationalId: '29901121234567',
    licenseClass: 'Class 1 - Motorcycle',
    applicationType: 'Renewal',
    status: 'Approved',
    date: '15 Oct 2024',
    paidFees: 450,
  },
  {
    id: 'app-1256',
    applicantName: 'Omar Khaled',
    nationalId: '29505051234567',
    licenseClass: 'Class 6 - Bus',
    applicationType: 'New License',
    status: 'Pending Payment',
    date: '14 Oct 2024',
    paidFees: 0,
  },
  {
    id: 'app-1255',
    applicantName: 'Nourhan Mostafa',
    nationalId: '29802021234567',
    licenseClass: 'Class 3 - Private Vehicle',
    applicationType: 'Replacement',
    status: 'Approved',
    date: '14 Oct 2024',
    paidFees: 300,
  },
  {
    id: 'app-1254',
    applicantName: 'Mohamed Hassan',
    nationalId: '29403031234567',
    licenseClass: 'Class 7 - Heavy Vehicle',
    applicationType: 'New License',
    status: 'Under Review',
    date: '14 Oct 2024',
    paidFees: 550,
  },
];

export const applicationsRepository = {
  findAll: async () => [...mockApplications],
  findById: async (id) => mockApplications.find((a) => a.id === id) || null,
  updateStatus: async (id, status) => {
    const item = mockApplications.find((a) => a.id === id);
    if (!item) return null;
    item.status = status;
    return { ...item };
  },
};
