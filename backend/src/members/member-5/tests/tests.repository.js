const mockTestAppointments = [
  {
    id: 'apt-T458',
    applicantName: 'Ahmed Samir',
    nationalId: '29606061234567',
    testType: 'Practical Street Test',
    date: '15 Oct 2024',
    time: '10:00 AM',
    center: 'Nasr City Center',
    status: 'Scheduled',
    fee: 150,
  },
  {
    id: 'apt-T457',
    applicantName: 'Laila Hassan',
    nationalId: '29707071234567',
    testType: 'Theory Test',
    date: '15 Oct 2024',
    time: '11:30 AM',
    center: 'Nasr City Center',
    status: 'Scheduled',
    fee: 100,
  },
  {
    id: 'apt-T456',
    applicantName: 'Youssef Ali',
    nationalId: '29808081234567',
    testType: 'Practical Street Test',
    date: '15 Oct 2024',
    time: '01:00 PM',
    center: 'Giza Center',
    status: 'Scheduled',
    fee: 150,
  },
  {
    id: 'apt-T455',
    applicantName: 'Menna Khaled',
    nationalId: '29909091234567',
    testType: 'Vision Test',
    date: '16 Oct 2024',
    time: '09:00 AM',
    center: 'Nasr City Center',
    status: 'Scheduled',
    fee: 50,
  },
  {
    id: 'apt-T454',
    applicantName: 'Karim Mostafa',
    nationalId: '29505051234567',
    testType: 'Theory Test',
    date: '16 Oct 2024',
    time: '11:00 AM',
    center: 'Heliopolis Center',
    status: 'Scheduled',
    fee: 100,
  },
];

export const testsRepository = {
  findAllAppointments: async () => [...mockTestAppointments],
  recordResult: async (appointmentId, passed, notes) => {
    const apt = mockTestAppointments.find((a) => a.id === appointmentId);
    if (!apt) return null;
    apt.status = passed ? 'Passed' : 'Failed';
    apt.resultNotes = notes;
    return { ...apt };
  },
};
