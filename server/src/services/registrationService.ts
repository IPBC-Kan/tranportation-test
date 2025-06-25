import { Trip } from '../models/Trip.model';
import { IRegistration } from '../interfaces/Registration';

// Register a user to a trip
export const registerToTrip = async (tripId: string, registrationData: IRegistration) => {
    const trip = await Trip.findById(tripId);
    if (!trip) throw new Error('Trip not found');
    // אפשר למנוע כפילויות לפי user.id אם צריך
    trip.registrations.push({
        ...registrationData,
        registrationDate: new Date(),
        isCancelled: false,
        cancellationDate: undefined,
        isLateCancellation: false,
    });
    await trip.save();
    return trip;
};

// Cancel a registration
export const cancelRegistration = async (tripId: string, userId: string, isLateCancellation = false) => {
    const trip = await Trip.findById(tripId);
    if (!trip) throw new Error('Trip not found');
    const reg = trip.registrations.find((r: any) => r.user._id?.toString() === userId || r.user.id?.toString() === userId);
    if (!reg) throw new Error('Registration not found');
    reg.isCancelled = true;
    reg.cancellationDate = new Date();
    reg.isLateCancellation = isLateCancellation;
    await trip.save();
    return trip;
};

// Cancel a registration by registrationId
export const cancelRegistrationByRegistrationId = async (tripId: string, registrationId: string, isLateCancellation = false) => {
    const trip = await Trip.findById(tripId);
    if (!trip) throw new Error('Trip not found');
    const reg = trip.registrations.find(
        (r: any) => r._id?.toString() === registrationId
    );
    if (!reg) throw new Error('Registration not found');
    reg.isCancelled = true;
    reg.cancellationDate = new Date();
    reg.isLateCancellation = isLateCancellation;
    await trip.save();
    return trip;
};

// Redo (restore) a cancelled registration
export const redoRegistration = async (tripId: string, userId: string) => {
    const trip = await Trip.findById(tripId);
    if (!trip) throw new Error('Trip not found');
    const reg = trip.registrations.find((r: any) => r.user._id?.toString() === userId || r.user.id?.toString() === userId);
    if (!reg) throw new Error('Registration not found');
    reg.isCancelled = false;
    reg.cancellationDate = undefined;
    reg.isLateCancellation = false;
    await trip.save();
    return trip;
};

// Redo (restore) a cancelled registration by registrationId
export const redoRegistrationByRegistrationId = async (tripId: string, registrationId: string) => {
    const trip = await Trip.findById(tripId);
    if (!trip) throw new Error('Trip not found');
    const reg = trip.registrations.find(
        (r: any) => r._id?.toString() === registrationId
    );
    if (!reg) throw new Error('Registration not found');
    reg.isCancelled = false;
    reg.cancellationDate = undefined;
    reg.isLateCancellation = false;
    await trip.save();
    return trip;
};
