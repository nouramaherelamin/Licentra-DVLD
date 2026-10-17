import { Router } from 'express';
import { applicationsController } from './applications.controller.js';

const router = Router();

router.get('/', applicationsController.getAll);
router.get('/:id', applicationsController.getById);
router.patch('/:id/status', applicationsController.updateStatus);

export default router;
