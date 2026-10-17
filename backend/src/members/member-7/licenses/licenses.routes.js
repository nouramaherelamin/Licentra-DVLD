import { Router } from 'express';
import { userLicensesController } from './licenses.controller.js';

const router = Router();

router.get('/my-licenses', userLicensesController.getMyLicenses);

export default router;
