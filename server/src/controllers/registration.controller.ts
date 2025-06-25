import { Request, Response } from 'express';
import * as registrationService from '../services/registrationService';

// Register a user to a trip
export const registerToTrip = async (req: Request, res: Response) => {
    const { tripId } = req.params;
    try {
        const trip = await registrationService.registerToTrip(tripId, req.body);
        res.status(201).json(trip);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
};

// Cancel a registration
export const cancelRegistration = async (req: Request, res: Response) => {
    const { tripId, registrationId } = req.params;
    try {
        const trip = await registrationService.cancelRegistrationByRegistrationId(tripId, registrationId, req.body.isLateCancellation);
        res.json(trip);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
};

// Redo (restore) a cancelled registration
export const redoRegistration = async (req: Request, res: Response) => {
    const { tripId, registrationId } = req.params;
    try {
        const trip = await registrationService.redoRegistrationByRegistrationId(tripId, registrationId);
        res.json(trip);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
};
