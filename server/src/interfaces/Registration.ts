import { LineDirection, ILineSchedule } from './Line';
import User from './User';

export interface IRegistration extends Document {
    user: User;
    // later, add boardingStop and dropoffStop
    boardingStop: string;
    dropoffStop: string;
    registrationDate: Date;
    isCancelled: boolean;
    cancellationDate?: Date;
    isLateCancellation?: boolean;
}
