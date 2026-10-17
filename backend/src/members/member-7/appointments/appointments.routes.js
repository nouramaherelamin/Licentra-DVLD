import { Router } from 'express';
import { userAppointmentsController } from './appointments.controller.js';

const router = Router();

router.get('/my-appointments', userAppointmentsController.getMyAppointments);
router.post('/book', userAppointmentsController.book);

export default router;
