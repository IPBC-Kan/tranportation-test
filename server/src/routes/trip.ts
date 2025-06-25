import { Router } from 'express';
import * as tripController from '../controllers/trip.controller';

const router = Router();

// TRIP CRUD
router.get('/', tripController.getAllTrips);
router.get('/:tripId', tripController.getTripById);
router.get('/weekday/:weekday', tripController.getTripsByDayOfWeek);
router.get('/today', tripController.getTodayTrips);
router.get('/between', tripController.getTripsBetweenDates);
router.post('/', tripController.createTrip);
router.put('/:tripId', tripController.updateTrip);
router.delete('/:tripId', tripController.deleteTrip);
router.patch('/:tripId/enable', tripController.enableTrip);
router.patch('/:tripId/disable', tripController.disableTrip);

// TRIP STOP CRUD
router.get('/:tripId/stops', tripController.getAllTripStops);
router.post('/:tripId/stops', tripController.createTripStop);
router.put('/:tripId/stops/:stopId', tripController.updateTripStop);
router.delete('/:tripId/stops/:stopId', tripController.deleteTripStop);

// TRIP CHAT MESSAGE
router.get('/:tripId/chatMessages', tripController.getAllTripChatMessages);
router.post('/:tripId/chatMessages', tripController.createTripChatMessage);

export default router;
