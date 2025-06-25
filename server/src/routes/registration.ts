import { Router } from 'express';
import * as registrationController from '../controllers/registration.controller';

const router = Router();

router.post('/tripId/:tripId', registrationController.registerToTrip);
router.patch('/tripId/:tripId/registrationId/:registrationId/cancel', registrationController.cancelRegistration);
router.patch('/tripId/:tripId/registrationId/:registrationId/reregister', registrationController.redoRegistration);

export default router;
