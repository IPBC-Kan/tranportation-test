import { Weekday } from '../enums/Weekdays';
import { Driver, LineDirection, ILineSchedule } from './Line';
import User from './User';

export interface ITripStop {
    // _id?: string;
    name: string;
    index: number;
    passengers: User[];
    estimatedArrivalTime: Date;
}

export interface ITripChatMessage {
    _id?: string;
    sender: User;
    message: string;
    timestamp: Date;
}

export interface ITrip {
    _id?: string;
    line: {
        _id?: string;
        name: string;
        direction: LineDirection;
        schedule: ILineSchedule;
        //    stops: LineStop[];
    };
    date: Date;
    // name: string;
    stops: ITripStop[];
    isActive: boolean;
}
