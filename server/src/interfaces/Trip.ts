import { Document } from 'mongoose';
import User from './User';
import { IRegistration } from './Registration';

export interface ITrip extends Document {
    lineName: string;
    date: Date;
    chatMessages: ITripChatMessage[];
    stops: ITripStop[];
    registrations: IRegistration[];
    isActive: boolean;
}

export interface ITripStop extends Document {
    name: string;
    index?: number;
    // passengers: User[];
    estimatedArrivalTime?: Date;
    isBase: boolean; // Indicates if this is the base stop
}

export interface ITripChatMessage extends Document {
    sender: User;
    message: string;
    timestamp: Date;
}
