// In-memory mock data for Member 1 Contact module
const mockInquiries = [
  {
    id: 'inq-001',
    fullName: 'Sara Mohamed',
    email: 'sara@example.com',
    phone: '+20 100 123 4567',
    subject: 'International License Inquiries',
    message: 'Can I apply for an international driving license online?',
    createdAt: '2024-10-14T10:00:00Z',
    status: 'Pending',
  },
];

export const contactRepository = {
  findAll: async () => {
    return [...mockInquiries];
  },
  create: async (inquiryData) => {
    const newInquiry = {
      id: `inq-${Date.now()}`,
      ...inquiryData,
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };
    mockInquiries.push(newInquiry);
    return newInquiry;
  },
};
