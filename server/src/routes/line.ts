import { Router } from 'express';
import * as lineController from '../controllers/line.controller';

const router = Router();

// LINE CRUD
router.get('/', lineController.getAllLines);
router.post('/', lineController.createLine);
router.put('/:lineId', lineController.updateLine);
router.delete('/:lineId', lineController.deleteLine);
router.patch('/:lineId/enable', lineController.enableLine);
router.patch('/:lineId/disable', lineController.disableLine);

// LINE SCHEDULE CRUD
router.get('/:lineId/schedules', lineController.getAllLineSchedules);
router.post('/:lineId/schedules', lineController.createLineSchedule);
router.put('/:lineId/schedules/:scheduleId', lineController.updateLineSchedule);
router.delete('/:lineId/schedules/:scheduleId', lineController.deleteLineSchedule);
router.patch('/:lineId/schedules/:scheduleId/enable', lineController.enableLineSchedule);
router.patch('/:lineId/schedules/:scheduleId/disable', lineController.disableLineSchedule);

// LINE STOP CRUD
router.get('/:lineId/stops', lineController.getAllLineStops);
router.post('/:lineId/stops', lineController.createLineStop);
router.put('/:lineId/stops/:stopId', lineController.updateLineStop);
router.delete('/:lineId/stops/:stopId', lineController.deleteLineStop);

export default router;
