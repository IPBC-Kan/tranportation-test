// import { Document } from 'mongoose';
import User from './User';
import { IRegistration } from './Registration';

export interface ITrip {
    _id?: string; // Optional, for mongoose documents
    lineName: string;
    date: Date;
    chatMessages: ITripChatMessage[];
    stops: ITripStop[];
    registrations: IRegistration[];
    isActive: boolean;
}

export interface ITripStop {
    _id?: string; // Optional, for mongoose documents
    name: string;
    index?: number;
    // passengers: User[];
    estimatedArrivalTime?: Date;
    isBase: boolean; // Indicates if this is the base stop
}

export interface ITripChatMessage {
    _id?: string; // Optional, for mongoose documents
    sender: User;
    message: string;
    timestamp: Date;
}
