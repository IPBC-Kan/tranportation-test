import mongoose, { Schema, Document, Types } from 'mongoose';
import { Weekday } from '../enums/Weekdays';
import { ILine, LineDirection } from '../interfaces/Line';

// LineStop Schema
const LineStopSchema = new Schema({
    name: { type: String, required: true },
    isBase: { type: Boolean, required: true },
    index: { type: Number, required: true },
    estimatedArrivalTime: { type: Number, required: true }, // minutes
});

// Driver Schema
const DriverSchema = new Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
    },
    { _id: false }
);

// LineSchedule Schema
export const LineScheduleSchema = new Schema({
    weekday: {
        type: String,
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        required: true,
    },
    isSpacial: { type: Boolean, required: true },
    cancellationTimeAllowed: { type: Number, required: true }, // minutes
    passengersNumberAllowed: { type: Number, required: true },
    driver: { type: DriverSchema, required: true },
    hour: { type: Number, required: true }, // <--- חדש
    minute: { type: Number, required: true }, // <--- חדש
    status: { type: String, enum: ['new', 'deployed', 'cancelled'], default: 'new' }, // <--- חדש
    isActive: { type: Boolean, required: true },
});

// Line Schema
const LineSchema = new Schema({
    name: { type: String, required: true },
    direction: { type: String, enum: ['pickup', 'dropoff'], required: true },
    stops: { type: [LineStopSchema], required: true },
    schedule: { type: [LineScheduleSchema], required: true },
    isActive: { type: Boolean, required: true },
});

export const Line = mongoose.model<ILine>('Line', LineSchema);
