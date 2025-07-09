import mongoose, { Schema } from 'mongoose';
import UserSchema from './User.model';
import { ITrip } from '../interfaces';
import { RegistrationSchema } from './Registration.model';

// TripStop Schema
const TripStopSchema = new Schema({
    name: { type: String, required: true },
    index: { type: Number, required: false },
    estimatedArrivalTime: { type: Date, required: false },
    isBase: { type: Boolean, required: true }, // Indicates if this is the base stop
    // passengers: [UserSchema], // array of passenger
});

// Chat Message Schema
const TripChatMessageSchema = new Schema({
    sender: { type: UserSchema, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, required: true },
});

// Trip Schema
const TripSchema = new Schema({
    lineName: { type: String, required: true },
    lineDirection: { type: String, enum: ['pickup', 'dropoff'], required: true },
    date: { type: Date, required: true },
    isSpecial: { type: Boolean, required: true },
    chatMessages: { type: [TripChatMessageSchema], required: true },
    stops: { type: [TripStopSchema], required: true },
    registrations: { type: [RegistrationSchema], required: true }, // <-- תיקון כאן
    isActive: { type: Boolean, required: true },
});

export const Trip = mongoose.model<ITrip>('Trip', TripSchema);
