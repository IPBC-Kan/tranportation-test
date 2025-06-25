import User from './User';

export interface IRegistration {
    _id?: string; // Optional, for mongoose documents
    user: User;
    // later, add boardingStop and dropoffStop
    // boardingStop: string;
    // dropoffStop: string;
    registrationDate: Date;
    isCancelled: boolean;
    cancellationDate?: Date;
    isLateCancellation?: boolean;
}
