import { Router } from 'express';
import { licensesController } from './licenses.controller.js';

const router = Router();

router.get('/', licensesController.getAll);
router.get('/:id', licensesController.getById);
router.post('/:id/detain', licensesController.detain);

export default router;
