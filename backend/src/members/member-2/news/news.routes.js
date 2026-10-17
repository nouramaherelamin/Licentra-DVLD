import { Router } from 'express';
import { newsController } from './news.controller.js';

const router = Router();

router.get('/', newsController.getAll);
router.get('/:id', newsController.getById);

export default router;
