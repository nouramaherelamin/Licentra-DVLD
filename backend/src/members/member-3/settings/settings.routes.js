import { Router } from 'express';
import { settingsController } from './settings.controller.js';

const router = Router();

router.get('/', settingsController.get);
router.put('/', settingsController.update);

export default router;
