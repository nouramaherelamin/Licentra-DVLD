import { userAppointmentsService } from './appointments.service.js';
import { sendSuccess } from '../../../shared/utils/response.js';
import { HttpStatus } from '../../../shared/constants/httpStatus.js';

export const userAppointmentsController = {
  getMyAppointments: async (req, res, next) => {
    try {
      const data = await userAppointmentsService.getMyAppointments();
      return sendSuccess(res, data, 'User appointments retrieved');
    } catch (err) {
      next(err);
    }
  },

  book: async (req, res, next) => {
    try {
      const data = await userAppointmentsService.bookAppointment(req.body);
      return sendSuccess(res, data, 'Appointment booked successfully', HttpStatus.CREATED);
    } catch (err) {
      next(err);
    }
  },
};
