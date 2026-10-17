import { Router } from 'express';
import { testsController } from './tests.controller.js';

const router = Router();

router.get('/appointments', testsController.getAppointments);
router.post('/appointments/:id/result', testsController.recordResult);

export default router;
