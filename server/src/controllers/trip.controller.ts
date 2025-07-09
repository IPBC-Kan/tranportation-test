import { Request, Response } from 'express';
import * as tripService from '../services/tripService';

// TRIP CRUD
export const getAllTrips = async (req: Request, res: Response) => {
    const trips = await tripService.getAllTrips();
    res.status(200).send(trips);
};

export const getTripById = async (req: Request, res: Response) => {
    const trip = await tripService.getTripById(req.params.tripId);
    res.status(200).send(trip);
};

export const getTripsByDayOfWeek = async (req: Request, res: Response) => {
    const trips = await tripService.getTripsByDayOfWeek(req.params.weekday);
    res.status(200).send(trips);
};

export const getTodayTrips = async (req: Request, res: Response) => {
    const trips = await tripService.getTodayTrips();
    res.status(200).send(trips);
};

export const getTripsBetweenDates = async (req: Request, res: Response) => {
    const { start, end } = req.query;
    const trips = await tripService.getTripsBetweenDates(new Date(start as string), new Date(end as string));
    res.status(200).send(trips);
};

export const createTrip = async (req: Request, res: Response) => {
    const trip = await tripService.createTrip(req.body);
    res.status(200).send(trip);
};

export const updateTrip = async (req: Request, res: Response) => {
    const trip = await tripService.updateTrip(req.params.tripId, req.body);
    res.status(200).send(trip);
};

export const deleteTrip = async (req: Request, res: Response) => {
    await tripService.deleteTrip(req.params.tripId);
    res.status(200).send({ message: 'Trip deleted successfully' });
};

export const enableTrip = async (req: Request, res: Response) => {
    const trip = await tripService.enableTrip(req.params.tripId);
    res.status(200).send(trip);
};

export const disableTrip = async (req: Request, res: Response) => {
    const trip = await tripService.disableTrip(req.params.tripId);
    res.status(200).send(trip);
};

// TRIP STOP CRUD
export const getAllTripStops = async (req: Request, res: Response) => {
    const stops = await tripService.getAllTripStops(req.params.tripId);
    res.status(200).send(stops);
};

export const createTripStop = async (req: Request, res: Response) => {
    const trip = await tripService.createTripStop(req.params.tripId, req.body);
    res.status(200).send(trip);
};

export const updateTripStop = async (req: Request, res: Response) => {
    const trip = await tripService.updateTripStop(req.params.tripId, req.params.stopId, req.body);
    res.status(200).send(trip);
};

export const deleteTripStop = async (req: Request, res: Response) => {
    const trip = await tripService.deleteTripStop(req.params.tripId, req.params.stopId);
    res.status(200).send(trip);
};

// TRIP CHAT MESSAGE

export const getAllTripChatMessages = async (req: Request, res: Response) => {
    const messages = await tripService.getAllTripChatMessages(req.params.tripId);
    res.status(200).send(messages);
};

export const createTripChatMessage = async (req: Request, res: Response) => {
    const trip = await tripService.createTripChatMessage(req.params.tripId, req.body);
    res.status(200).send(trip);
};
