import { Router } from 'express';
import { submissionsController } from './submissions.controller.js';

const router = Router();

router.get('/my-applications', submissionsController.getMyApplications);
router.post('/submit', submissionsController.submit);

export default router;
