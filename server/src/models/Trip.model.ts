import mongoose, { Schema, Document, Types } from 'mongoose';
import { Weekday } from '../enums/Weekdays';
import UserSchema from './User.model';
import { LineScheduleSchema } from './Line.model';
import { ITrip } from '../interfaces';

// TripStop Schema
const TripStopSchema = new Schema(
    {
        name: { type: String, required: true },
        index: { type: Number, required: true },
        estimatedArrivalTime: { type: Date, required: true },
        passengers: [UserSchema], // array of passenger
    },
    { _id: false }
);

// TripDriver Schema
// const TripDriverSchema = new Schema({
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String, required: true },
// }, { _id: false });

// Chat Message Schema
const TripChatMessageSchema = new Schema(
    {
        sender: { type: UserSchema, required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, required: true },
    },
    { _id: false }
);

// Trip Schema
const TripSchema = new Schema({
    line: {
        name: { type: String, required: true },
        direction: { type: String, enum: Object.values(Weekday), required: true },
        schedule: { type: LineScheduleSchema, required: true },
    },
    date: { type: Date, required: true },
    stops: { type: [TripStopSchema], required: true },
    isActive: { type: Boolean, required: true },
});

export const Trip = mongoose.model<ITrip>('Trip', TripSchema);
