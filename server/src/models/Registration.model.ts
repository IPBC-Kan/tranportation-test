import mongoose, { Schema, Document } from 'mongoose';
import UserSchema from './User.model';
import { LineScheduleSchema } from './Line.model';
import { IRegistration } from '../interfaces/Registration';

// Registration Schema
export const RegistrationSchema = new Schema({
    user: { type: UserSchema, required: true },
    registrationDate: { type: Date, required: true },
    isCancelled: { type: Boolean, required: true },
    cancellationDate: { type: Date },
    isLateCancellation: { type: Boolean },
});

export const Registration = mongoose.model<IRegistration & Document>('Registration', RegistrationSchema);
