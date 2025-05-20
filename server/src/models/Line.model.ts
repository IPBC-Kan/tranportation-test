import mongoose, { Schema, Document, Types } from 'mongoose';
import { Weekday } from '../enums/Weekdays';
import { LineDirection } from '../interfaces/Line';

// LineStop Schema
const LineStopSchema = new Schema(
    {
        name: { type: String, required: true },
        isBase: { type: Boolean, required: true },
        index: { type: Number, required: true },
        estimatedArrivalTime: { type: Number, required: true }, // minutes
    },
    { _id: false }
);

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
export const LineScheduleSchema = new Schema(
    {
        weekday: { type: String, enum: Object.values(Weekday), required: true },
        isSpacial: { type: Boolean, required: true },
        cancellationTimeAllowed: { type: Number, required: true }, // minutes
        passengersNumberAllowed: { type: Number, required: true },
        driver: { type: DriverSchema, required: true },
        isActive: { type: Boolean, required: true },
    },
    { _id: false }
);

// Line Schema
const LineSchema = new Schema({
    name: { type: String, required: true },
    direction: { type: String, enum: ['pickup', 'dropoff'], required: true },
    stops: { type: [LineStopSchema], required: true },
    schedule: { type: [LineScheduleSchema], required: true },
    isActive: { type: Boolean, required: true },
});

export interface ILine extends Document {
    name: string;
    direction: LineDirection;
    stops: Types.DocumentArray<any>;
    schedule: Types.DocumentArray<any>;
    isActive: boolean;
}

export const Line = mongoose.model<ILine>('Line', LineSchema);
