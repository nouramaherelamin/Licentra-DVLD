import { testsRepository } from './tests.repository.js';

export const testsService = {
  getAllAppointments: async () => await testsRepository.findAllAppointments(),
  recordResult: async (appointmentId, passed, notes) => {
    if (passed === undefined || typeof passed !== 'boolean') {
      const err = new Error("Field 'passed' is required and must be a boolean (true/false).");
      err.statusCode = 400;
      err.code = 'VALIDATION_ERROR';
      throw err;
    }
    const updated = await testsRepository.recordResult(appointmentId, passed, notes || '');
    if (!updated) {
      const err = new Error(`Appointment '${appointmentId}' not found`);
      err.statusCode = 404;
      err.code = 'APPOINTMENT_NOT_FOUND';
      throw err;
    }
    return updated;
  },
};
