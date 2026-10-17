import { Router } from 'express';
import { contactController } from './contact.controller.js';

const router = Router();

router.get('/', contactController.getAll);
router.post('/', contactController.submit);

export default router;
