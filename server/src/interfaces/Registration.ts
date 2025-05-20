import { LineDirection, ILineSchedule } from './Line';
import User from './User';

export interface IRegistration {
    _id?: string;
    user: User;
    trip: {
        _id?: string;
        line: {
            _id?: string;
            name: string;
            direction: LineDirection;
            schedule: ILineSchedule;
            //    stops: LineStop[];
        };
    };
    registrationDate: Date;
    isCancelled: boolean;
    cancellationDate?: Date;
    isLateCancellation?: boolean;
}
