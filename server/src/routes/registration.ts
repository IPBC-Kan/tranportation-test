import { Router } from 'express';
import * as registrationController from '../controllers/registration.controller';

const router = Router();

router.post('/tripId/:tripId', registrationController.registerToTrip);
router.put('/tripId/:tripId/registrationId/:registrationId/cancel', registrationController.cancelRegistration);
router.put('/tripId/:tripId/registrationId/:registrationId/reregister', registrationController.redoRegistration);
router.put('/tripId/:tripId/registrationId/:registrationId', registrationController.updateRegistration);

export default router;
