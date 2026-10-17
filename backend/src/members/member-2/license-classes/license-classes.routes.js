import { Router } from 'express';
import { licenseClassesController } from './license-classes.controller.js';

const router = Router();

router.get('/', licenseClassesController.getAll);
router.get('/:id', licenseClassesController.getById);

export default router;
