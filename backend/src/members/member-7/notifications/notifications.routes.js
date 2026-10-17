import { Router } from 'express';
import { notificationsController } from './notifications.controller.js';

const router = Router();

router.get('/', notificationsController.getAll);
router.patch('/:id/read', notificationsController.markAsRead);

export default router;
