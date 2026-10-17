import { Router } from 'express';
import { analyticsController } from './analytics.controller.js';

const router = Router();

router.get('/overview', analyticsController.getOverview);

export default router;
