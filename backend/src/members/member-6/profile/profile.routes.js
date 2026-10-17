import { Router } from 'express';
import { profileController } from './profile.controller.js';

const router = Router();

router.get('/me', profileController.getMe);
router.put('/me', profileController.updateMe);

export default router;
