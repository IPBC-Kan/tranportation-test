import { Router } from 'express';
import * as deploymentController from '../controllers/deployment.controller';

const router = Router();

// POST /api/deployment/schedule/:scheduleId
router.post('/schedule/:scheduleId', deploymentController.deployLineSchedule);

// POST /api/deployment/by-date?date=YYYY-MM-DD (login required)
router.post('/by-date', deploymentController.deployByDate);

export default router;
