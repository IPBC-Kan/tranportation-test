import { Trip } from '../models/Trip.model';
import { ITrip, ITripStop, ITripChatMessage } from '../interfaces/Trip';
import { Types } from 'mongoose';

// TRIP CRUD
export const getAllTrips = async () => {
    const threeHoursAgo = new Date();
    threeHoursAgo.setHours(threeHoursAgo.getHours() - 3); // Correctly subtract 3 hours from the current time
    console.log(threeHoursAgo);
    return Trip.find({ date: { $gte: threeHoursAgo } }).sort({ date: 1 }); // Sort by date in ascending order
};

export const getTripById = async (tripId: string) => {
    return Trip.findById(tripId);
};

export const getTripsByDayOfWeek = async (weekday: string) => {
    return Trip.find({ 'line.schedule.weekday': weekday }).sort({ date: 1 }); // Sort by date in ascending order
};

export const getTodayTrips = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return Trip.find({ date: { $gte: today, $lt: tomorrow } }).sort({ date: 1 }); // Sort by date in ascending order
};

export const getTripsBetweenDates = async (start: Date, end: Date) => {
    return Trip.find({ date: { $gte: start, $lte: end } }).sort({ date: 1 }); // Sort by date in ascending order
};

export const createTrip = async (tripData: ITrip) => {
    return Trip.create(tripData);
};

export const updateTrip = async (tripId: string, updateData: Partial<ITrip>) => {
    return Trip.findByIdAndUpdate(tripId, updateData, { new: true });
};

export const deleteTrip = async (tripId: string) => {
    return Trip.findByIdAndDelete(tripId);
};

export const enableTrip = async (tripId: string) => {
    return Trip.findByIdAndUpdate(tripId, { isActive: true }, { new: true });
};

export const disableTrip = async (tripId: string) => {
    return Trip.findByIdAndUpdate(tripId, { isActive: false }, { new: true });
};

// TRIP STOP CRUD
export const getAllTripStops = async (tripId: string) => {
    const trip = await Trip.findById(tripId);
    console.log('trip', trip);
    if (!trip) return null;

    return trip?.stops || [];
};

export const createTripStop = async (tripId: string, stop: ITripStop) => {
    return Trip.findByIdAndUpdate(tripId, { $push: { stops: stop } }, { new: true });
};

export const updateTripStop = async (tripId: string, stopId: string, updateData: Partial<ITripStop>) => {
    const trip = await Trip.findById(tripId);
    if (!trip) return null;
    const stop = trip.stops.find((stop: any) => stop._id?.toString() === stopId);
    if (!stop) return null;
    Object.assign(stop, updateData);
    await trip.save();
    return trip;
};

export const deleteTripStop = async (tripId: string, stopId: string) => {
    const trip = await Trip.findById(tripId);
    if (!trip) return null;
    const index = trip.stops.findIndex((stop: any) => stop._id?.toString() === stopId);
    if (index === -1) return null;
    trip.stops.splice(index, 1);
    await trip.save();
    return trip;
};

// TRIP CHAT MESSAGE

export const getAllTripChatMessages = async (tripId: string) => {
    const trip = await Trip.findById(tripId);
    if (!trip) return null;
    return trip.chatMessages || [];
};

export const createTripChatMessage = async (tripId: string, chatMessage: ITripChatMessage) => {
    const trip = await Trip.findById(tripId);
    if (!trip) return null;
    if (!trip.chatMessages) trip.chatMessages = [];
    trip.chatMessages.push(chatMessage);
    await trip.save();
    return trip;
};

export const getAllRegistrations = async (tripId: string) => {
    const trip = await Trip.findById(tripId);
    if (!trip) throw new Error('Trip not found');
    return trip.registrations || [];
};
