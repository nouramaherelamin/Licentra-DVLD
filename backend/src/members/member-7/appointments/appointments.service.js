import { userAppointmentsRepository } from './appointments.repository.js';

export const userAppointmentsService = {
  getMyAppointments: async () => await userAppointmentsRepository.findMyAppointments(),
  bookAppointment: async (payload) => {
    if (!payload.testType || !payload.date) {
      const err = new Error('Test type and date are required to book an appointment.');
      err.statusCode = 400;
      err.code = 'VALIDATION_ERROR';
      throw err;
    }
    return await userAppointmentsRepository.bookAppointment(payload);
  },
};
