import mongoose, { Schema, Document } from 'mongoose';
import { HolidayType } from '../enums/Holidays';

export interface IHoliday extends Document {
    date: Date;
    name: string;
    type: HolidayType;
}

const HolidaySchema = new Schema<IHoliday>({
    date: { type: Date, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: Number, enum: Object.values(HolidayType), required: true },
});

export const Holiday = mongoose.model<IHoliday>('Holiday', HolidaySchema);
