import { Weekday } from '../enums/Weekdays';

export interface ILineStop {
    _id?: string;
    name: string;
    isBase: boolean;
    index: number;
    estimatedArrivalTime: number; //minutes
}

export interface Driver {
    name: string;
    phone: string;
    email: string;
}

// export type LineScheduleStatus = 'new' | 'deployed' | 'cancelled'

export interface ILineSchedule {
    // name: string;
    weekday: Weekday;
    isSpacial: boolean;
    cancellationTimeAllowed: number; //minutes
    passengersNumberAllowed: number;
    driver: Driver;
    isActive: boolean;
}

export type LineDirection = 'pickup' | 'dropoff';

export interface ILine {
    _id?: string;
    name: string;
    direction: LineDirection;
    stops: ILineStop[];
    schedule: ILineSchedule[];
    isActive: boolean;
}
