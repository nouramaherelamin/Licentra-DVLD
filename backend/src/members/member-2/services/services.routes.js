import { Router } from 'express';
import { servicesController } from './services.controller.js';

const router = Router();

router.get('/', servicesController.getAll);
router.get('/:id', servicesController.getById);

export default router;
