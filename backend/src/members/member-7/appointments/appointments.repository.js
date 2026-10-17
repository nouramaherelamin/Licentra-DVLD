const mockUserAppointments = [
  {
    id: 'usr-apt-01',
    testType: 'Practical Driving Test',
    date: '20 Oct 2024',
    time: '10:00 AM',
    center: 'Nasr City Traffic & Licensing Center',
    status: 'Confirmed',
    fee: 150,
    appointmentNumber: 'APT-78921',
  },
  {
    id: 'usr-apt-02',
    testType: 'Theory / Knowledge Exam',
    date: '10 Oct 2024',
    time: '11:30 AM',
    center: 'Nasr City Traffic & Licensing Center',
    status: 'Completed (Passed)',
    fee: 100,
    appointmentNumber: 'APT-74112',
  },
];

export const userAppointmentsRepository = {
  findMyAppointments: async () => [...mockUserAppointments],
  bookAppointment: async (payload) => {
    const newAppointment = {
      id: `usr-apt-${Date.now()}`,
      testType: payload.testType || 'Vision Test',
      date: payload.date || '2024-11-01',
      time: payload.time || '09:00 AM',
      center: payload.center || 'Nasr City Center',
      status: 'Confirmed',
      fee: payload.fee || 100,
      appointmentNumber: `APT-${Math.floor(10000 + Math.random() * 90000)}`,
    };
    mockUserAppointments.unshift(newAppointment);
    return newAppointment;
  },
};
