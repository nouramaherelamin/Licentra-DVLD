const mockNotifications = [
  {
    id: 'notif-001',
    title: 'Test Appointment Confirmed',
    message: 'Your Practical Driving Test is scheduled for 20 Oct 2024 at 10:00 AM at Nasr City Center.',
    date: '14 Oct 2024 02:15 PM',
    isRead: false,
    type: 'appointment',
  },
  {
    id: 'notif-002',
    title: 'Application Received',
    message: 'Your application for Private Vehicle Driving License has been received and is under review.',
    date: '15 Oct 2024 10:30 AM',
    isRead: false,
    type: 'application',
  },
  {
    id: 'notif-003',
    title: 'Payment Receipt Confirmed',
    message: 'Receipt #EGP-350 for application fees has been processed successfully.',
    date: '15 Oct 2024 10:25 AM',
    isRead: true,
    type: 'payment',
  },
];

export const notificationsRepository = {
  findAll: async () => [...mockNotifications],
  markAsRead: async (id) => {
    const notif = mockNotifications.find((n) => n.id === id);
    if (!notif) return null;
    notif.isRead = true;
    return { ...notif };
  },
};
