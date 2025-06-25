// import { Document } from 'mongoose';
// import { LineDirectionEnum } from '../enums/LineDirection';
// import { Weekday } from '../enums/Weekdays';

export interface ILineStop {
    _id?: string; // Optional, for mongoose documents
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
    _id?: string; // Optional, for mongoose documents
    weekday: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
    isSpacial: boolean;
    cancellationTimeAllowed: number; //minutes
    passengersNumberAllowed: number;
    driver: Driver;
    hour: number; // hour of the day
    minute: number; // minute of the hour
    status: 'new' | 'deployed' | 'cancelled'; // new, deployed, cancelled
    isActive: boolean;
}

export type LineDirection = 'pickup' | 'dropoff';

export interface ILine {
    _id?: string; // Optional, for mongoose documents
    name: string;
    direction: LineDirection;
    stops: ILineStop[];
    schedule: ILineSchedule[];
    isActive: boolean;
}
